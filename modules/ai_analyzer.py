"""
Module for analyzing paper relevance using Google's Gemini AI.
"""
import os
from google import genai
from pypdf import PdfReader
import json

# Configure the Gemini API
client = genai.Client(api_key=os.getenv("GOOGLE_API_KEY"))

def extract_text_from_pdf(pdf_path, max_pages=None):
    """
    Extract text from a PDF file.
    
    Args:
        pdf_path (str): Path to the PDF file
        max_pages (int, optional): Maximum number of pages to extract
        
    Returns:
        str: Extracted text content
    """
    try:
        reader = PdfReader(pdf_path)
        pages = reader.pages[:max_pages] if max_pages else reader.pages
        
        text = ""
        for page in pages:
            text += page.extract_text() + "\n\n"
            
        return text
    except Exception as e:
        print(f"Error extracting text from {pdf_path}: {e}")
        return ""

def analyze_relevance(paper_text, paper_id, topic, include_terms, exclude_terms):
    """
    Analyze the relevance of a paper using Gemini 2.5 Pro.
    
    Args:
        paper_text (str): The text content of the paper
        paper_id (str): The paper's ID
        topic (str): The main research topic
        include_terms (list): Terms that should be included
        exclude_terms (list): Terms that should be excluded
        
    Returns:
        str: "yes" if relevant, "no" if not
    """
    # Truncate paper text if too long (to fit within context window)
    max_chars = 100000  # Approximate limit for Gemini
    if len(paper_text) > max_chars:
        paper_text = paper_text[:max_chars] + "... [truncated]"
    
    # Format inclusion and exclusion terms
    include_str = ", ".join([f'"{term}"' for term in include_terms]) if include_terms else "none specified"
    exclude_str = ", ".join([f'"{term}"' for term in exclude_terms]) if exclude_terms else "none specified"
    
    # Construct the prompt
    prompt = f"""
    You are a research assistant conducting a literature review on the topic: "{topic}".
    
    You need to evaluate the following research paper for its relevance to a literature review on this topic.
    
    Inclusion criteria: {include_str}
    Exclusion criteria: {exclude_str}

    Indicate if this paper should be cited as part of a literature review on the topic.
    
    Please analyze the following paper:
    
    PAPER ID: {paper_id}
    ===== PAPER CONTENT =====
    {paper_text}
    ======= END PAPER =======
    
    First, provide a very brief summary of the paper.
    Then, carefully assess if the paper is relevant to the topic, considering the inclusion and exclusion criteria.
    
    Respond with a JSON object having the following fields:
    - summary: A short summary of the paper (100 words max)
    - is_relevant: "yes" or "no" indicating whether the paper is relevant
    - reasoning: Brief explanation for your decision (50 words max)
    """
    
    try:
        response = client.models.generate_content(
            model="gemini-2.0-flash", contents=prompt
        )
        
        # Extract the JSON response
        content = response.text
        print(content)
        
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

def analyze_papers(paper_paths, topic, include_terms, exclude_terms, max_pages=10):
    """
    Analyze multiple papers for relevance.
    
    Args:
        paper_paths (dict): Mapping of paper IDs to file paths
        topic (str): The main research topic
        include_terms (list): Terms that should be included
        exclude_terms (list): Terms that should be excluded
        max_pages (int): Maximum number of pages to analyze per paper
        
    Returns:
        dict: Mapping of paper paths to relevance results ("yes" or "no")
    """
    results = {}
    
    for paper_id, pdf_path in paper_paths.items():
        print(f"Analyzing {paper_id}...")
        
        # Extract text from PDF (limited to max_pages to save time)
        paper_text = extract_text_from_pdf(pdf_path, max_pages)
        
        if not paper_text:
            print(f"  Warning: Couldn't extract text from {paper_id}")
            results[pdf_path] = "no"
            continue
            
        # Analyze with Gemini
        relevance = analyze_relevance(paper_text, paper_id, topic, include_terms, exclude_terms)
        results[pdf_path] = relevance
        
        print(f"  Relevant: {relevance}")
        
    return results
