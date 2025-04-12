"""
Module for analyzing paper relevance using Google's Gemini AI.
"""
import os
from google import genai
import json
from modules.paper import Paper
from typing import Dict, List, Optional, Any

# Configure the Gemini API
api_key = os.getenv("GOOGLE_API_KEY")
if not api_key:
    raise ValueError("GOOGLE_API_KEY environment variable not set. Please add it to your .env file.")
    
client = genai.Client(api_key=api_key)

def get_inclusion_exclusion_criteria(topic, num_criteria=5):
    """
    Ask Gemini to provide lists of inclusion and exclusion criteria for a given research topic.

    Args:
        topic (str): The main research topic

    Returns:
        tuple: (inclusion_terms, exclusion_terms), both as lists of strings
    """

    prompt = f"""
    You are a research assistant preparing a literature review according to PRISMA guidelines.

    For the topic "{topic}", generate two lists of length {num_criteria}:
    1. Inclusion criteria, that qualifies a paper to be included in a literature review
    2. Exclusion criteria, that disqualifies a paper to be included in a literature review

    Come up with a reasonable set of inclusion/exclusion criteria similar to what would be seen in a professionally done literature review.

    Respond as a JSON object with two fields:
    - "include": a list of terms to include
    - "exclude": a list of terms to exclude
    """

    try:
        response = client.models.generate_content(
            model="gemini-2.0-flash",
            contents=[{"text": prompt}]
        )
        content = response.text.strip()

        # Handle optional markdown formatting
        if "```json" in content:
            json_content = content.split("```json")[1].split("```")[0].strip()
        elif "```" in content:
            json_content = content.split("```")[1].strip()
        else:
            json_content = content

        result = json.loads(json_content)
        return result.get("include", []), result.get("exclude", [])

    except Exception as e:
        print(f"Error retrieving inclusion/exclusion terms: {e}")
        return [], []


def generate_queries_gemini(topic, num_queries=5):
    """
    Use Gemini 2.0 Flash to generate multiple arXiv-compatible search queries as a JSON list.

    Args:
        topic (str): The main topic of interest
        num_queries (int): Number of query variations to generate

    Returns:
        list: A list of arXiv search query strings (parsed from JSON)
    """
    prompt = f"""
    You are an expert at creating arXiv API-compatible search queries.

    Generate {num_queries} different arXiv-compatible search query strings for the topic "{topic}".

    Each query should:
    - Use fields like ti: (title) and abs: (abstract)
    - Use boolean logic (AND, OR, ANDNOT)
    - Be formatted correctly for use with the arXiv API

    Return your result as a JSON array of strings.
    Do not include markdown formatting or extra commentary.
    """

    try:
        response = client.models.generate_content(
            model="gemini-2.0-flash",
            contents=[{"text": prompt}]
        )
        content = response.text.strip()

        # Clean up possible markdown formatting
        if "```json" in content:
            json_content = content.split("```json")[1].split("```")[0].strip()
        elif "```" in content:
            json_content = content.split("```")[1].strip()
        else:
            json_content = content

        return json.loads(json_content)

    except Exception as e:
        print(f"Error generating JSON-formatted queries: {e}")
        return []
    

def analyze_paper_relevance(paper: Paper, topic: str, include_terms: List[str], exclude_terms: List[str]) -> Dict[str, Any]:
    """
    Analyze the relevance of a paper using Gemini with direct PDF access.
    
    Args:
        paper (Paper): Paper object containing metadata and file URI
        topic (str): The main research topic
        include_terms (list): Terms that should be included
        exclude_terms (list): Terms that should be excluded
        
    Returns:
        dict: Analysis results containing summary, relevance, and reasoning
    """
    if not paper.uploaded or not paper.file_uri:
        raise ValueError("Paper must be uploaded with a valid file URI")
        
    # Format inclusion and exclusion terms
    include_str = ", ".join([f'"{term}"' for term in include_terms]) if include_terms else "none specified"
    exclude_str = ", ".join([f'"{term}"' for term in exclude_terms]) if exclude_terms else "none specified"
    
    # Construct the prompt with file reference
    prompt = f"""
    You are a research assistant conducting a literature review on the topic: "{topic}".
    
    You need to evaluate the attached research paper for its relevance to a literature review on this topic.
    
    Inclusion criteria: {include_str}
    Exclusion criteria: {exclude_str}

    Indicate if this paper should be cited as part of a literature review on the topic.
    
    The paper ID is: {paper.id}
    
    First, provide a very brief summary of the paper.
    Then, carefully assess if the paper is relevant to the topic, considering the inclusion and exclusion criteria.
    
    Respond with a JSON object having the following fields:
    - summary: A short summary of the paper (100 words max)
    - is_relevant: "yes" or "no" indicating whether the paper is relevant
    - reasoning: Brief explanation for your decision (50 words max)
    """
    
    try:
        # Create content parts with both the text prompt and the PDF file
        contents = [
            {"file_data": {
                "mime_type": paper.mime_type,
                "file_uri": paper.file_uri
            }},
            {"text": prompt}
        ]
        
        # Generate content with the prompt and PDF
        response = client.models.generate_content(
            model="gemini-2.0-flash", 
            contents=contents
        )
        
        # Extract the JSON response
        content = response.text
        
        # Find JSON block if it's embedded in markdown
        if "```json" in content:
            json_content = content.split("```json")[1].split("```")[0].strip()
        elif "```" in content:
            json_content = content.split("```")[1].strip()
        else:
            json_content = content
            
        # Parse the JSON
        result = json.loads(json_content)
        
        # Update the paper object with analysis results
        paper.is_relevant = True if result.get("is_relevant", "no").lower() == "yes" else False
        paper.relevance_reasoning = result.get("reasoning")
        paper.summary = result.get("summary")
        
        return result
    
    except Exception as e:
        print(f"Error analyzing paper {paper.id}: {e}")
        return {"is_relevant": "no", "reasoning": f"Error: {str(e)}", "summary": None}


def extract_paper_content(paper: Paper, topic: str, model="gemini-2.0-flash") -> Optional[str]:
    """
    Extract relevant content from a paper.
    
    Args:
        paper (Paper): Paper object containing metadata and file URI
        topic (str): The main research topic
        model (str): Gemini model to use
        
    Returns:
        str: Extracted content or None if error
    """
    if not paper.uploaded or not paper.file_uri:
        raise ValueError("Paper must be uploaded with a valid file URI")
        
    prompt = f"""
You are a research assistant conducting a literature review on the topic: "{topic}".

Extract relevant parts from the attached research paper. Only include key findings and contributions that are relevant to the overall literature review.

The paper ID is: {paper.id}
    """
    try:
        # Create content parts with both the text prompt and the PDF file
        contents = [
            {"file_data": {
                "mime_type": paper.mime_type,
                "file_uri": paper.file_uri
            }},
            {"text": prompt}
        ]
        
        # Generate content with the prompt and PDF
        response = client.models.generate_content(
            model=model, 
            contents=contents
        )
        
        content = response.text 
        return content

    except Exception as e:
        print(f"Error extracting content from paper {paper.id}: {e}")
        return None


def analyze_papers(papers: List[Paper], topic: str, include_terms: List[str], exclude_terms: List[str]) -> Dict[str, Dict]:
    """
    Analyze multiple papers for relevance.
    
    Args:
        papers (List[Paper]): List of Paper objects to analyze
        topic (str): The main research topic
        include_terms (list): Terms that should be included
        exclude_terms (list): Terms that should be excluded
        
    Returns:
        dict: Mapping of paper titles to relevance results
    """
    results = {}
    
    for paper in papers:
        if not paper.uploaded or not paper.file_uri:
            print(f"Skipping {paper.id} - not uploaded or missing file URI")
            continue
            
        print(f"Analyzing {paper.id}...")
        
        # Analyze with Gemini using the Paper object
        result = analyze_paper_relevance(paper, topic, include_terms, exclude_terms)
        
        # Use the paper title as the key for better user readability
        results[paper.title] = result 
        
        print(f"  Relevant: {result.get('is_relevant', 'unknown')}")
        
    return results
