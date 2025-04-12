"""
Module for analyzing paper relevance using Google's Gemini AI.
"""
import os
from google import genai
import json

# Configure the Gemini API
api_key = os.getenv("GOOGLE_API_KEY")
if not api_key:
    raise ValueError("GOOGLE_API_KEY environment variable not set. Please add it to your .env file.")
    
client = genai.Client(api_key=api_key)

def analyze_relevance_with_pdf(file_data, paper_id, topic, include_terms, exclude_terms):
    """
    Analyze the relevance of a paper using Gemini 2.5 Pro with direct PDF access.
    
    Args:
        file_data (dict): Paper file data with URI
        paper_id (str): The paper's ID
        topic (str): The main research topic
        include_terms (list): Terms that should be included
        exclude_terms (list): Terms that should be excluded
        
    Returns:
        str: "yes" if relevant, "no" if not
    """
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
    
    The paper ID is: {paper_id}
    
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
                "mime_type": file_data["mime_type"],
                "file_uri": file_data["uri"]
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
        return result["is_relevant"]
    
    except Exception as e:
        print(f"Error analyzing paper {paper_id}: {e}")
        return "no"  # Return "no" on error

def analyze_papers(paper_uris, topic, include_terms, exclude_terms):
    """
    Analyze multiple papers for relevance using their uploaded URIs.
    
    Args:
        paper_uris (dict): Mapping of paper IDs to file URI data
        topic (str): The main research topic
        include_terms (list): Terms that should be included
        exclude_terms (list): Terms that should be excluded
        
    Returns:
        dict: Mapping of paper titles to relevance results ("yes" or "no")
    """
    results = {}
    
    for paper_id, file_data in paper_uris.items():
        print(f"Analyzing {paper_id}...")
        
        # Analyze with Gemini using the file URI
        relevance = analyze_relevance_with_pdf(file_data, paper_id, topic, include_terms, exclude_terms)
        
        # Use the paper title as the key for better user readability
        results[file_data["title"]] = relevance
        
        print(f"  Relevant: {relevance}")
        
    return results
