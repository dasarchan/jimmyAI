import os
from google import genai
import json
import re
from typing import Dict, List
from modules.paper import Paper

"""
Module for generating literature review outlines using Google's Gemini AI.
"""

# Configure the Gemini API
from modules.ai_analyzer import client

def clean_json(json_str):
    """
    Clean JSON string to remove trailing commas and other common issues.
    
    Args:
        json_str (str): Potentially invalid JSON string
        
    Returns:
        str: Cleaned JSON string
    """
    # Remove trailing commas in objects
    json_str = re.sub(r',\s*}', '}', json_str)
    # Remove trailing commas in arrays
    json_str = re.sub(r',\s*]', ']', json_str)
    return json_str

def generate_outline(research_question: str, papers: List[Paper], max_sections=5):
    """
    Generate a structured outline for a literature review based on relevant papers.
    
    Args:
        research_question (str): The main research question
        papers (List[Paper]): List of Paper objects
        max_sections (int): Maximum number of main sections to include
        
    Returns:
        dict: JSON structured outline for the literature review
    """
    # Prepare sources list for the prompt
    sources_list = "\n".join([f"- {paper.title}: {paper.authors[0] if paper.authors else 'Unknown'} et al., \"{paper.abstract[:100]}...\""
                             for paper in papers])
    
    prompt = f"""
    You are an expert academic researcher tasked with organizing a literature review outline.
    
    Research Question: "{research_question}"
    
    Available Sources:
    {sources_list}
    
    Create a structured outline for a literature review addressing this research question.
    Organize the literature into logical sections (maximum {max_sections} main sections).
    For each section, suggest which sources should be discussed.

    Each layer should have a title. If there is meant to be top-level text for a layer, include a question.
    If there are subsections, include them in the sections field. Do not include any other fields, such as
    the actual sources to be included in each section.
    
    Return your response as a valid JSON object with this structure:
    {{
        "title": "Literature Review on [topic]",
        "sections": [
            {{
                "title": "Section Title",
                "question": "Question encapsulating what this section is supposed to cover.",
                "sections": [
                    {{
                        "title": "Subsection Title",
                        "question": "Question encapsulating what this section is supposed to cover."
                    }}
                ]
            }}
        ]
    }}
    
    IMPORTANT: Ensure your JSON is valid with no trailing commas.
    """
    
    try:
        # Generate content with the prompt
        response = client.models.generate_content(
            model="gemini-2.0-flash",
            contents=[{"text": prompt}]
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
        
        # Clean the JSON before parsing
        cleaned_json = clean_json(json_content)
            
        # Parse the JSON
        try:
            outline = json.loads(cleaned_json)
        except json.JSONDecodeError as e:
            print(f"Error parsing JSON: {e}")
            print(f"Cleaned JSON was: {cleaned_json}")
            # Fallback to a simple structure
            outline = {
                "title": f"Literature Review on {research_question}",
                "sections": []
            }
        
        return outline
    
    except Exception as e:
        print(f"Error generating outline: {e}")
        return {
            "error": str(e),
            "title": f"Literature Review on {research_question}",
            "sections": [],
            "conclusion": "Error generating outline"
        }

def generate_literature_review_outline(research_question: str, relevant_papers: List[Paper], topic_keywords: List[str] = None):
    """
    Generate a literature review outline given a research question and relevant papers.
    
    Args:
        research_question (str): The main research question
        relevant_papers (List[Paper]): List of Paper objects
        topic_keywords (List[str]): Optional list of keywords to emphasize
        
    Returns:
        dict: JSON structured outline for the literature review
    """
    print(f"Generating literature review outline for: {research_question}")
    print(f"Using {len(relevant_papers)} relevant papers")
    
    # Filter to only include papers marked as relevant
    filtered_papers = [paper for paper in relevant_papers if paper.is_relevant == True]
    
    if not filtered_papers:
        print("Warning: No relevant papers found. Using all provided papers.")
        filtered_papers = relevant_papers
    
    # Generate the outline
    try:
        outline = generate_outline(research_question, filtered_papers)
    except Exception as e:
        print(f"Error generating outline: {e}, trying again")
        outline = generate_outline(research_question, relevant_papers)
    
    return outline


def test_generate_outline():
    """
    Test the generate_outline function with a sample research question and sources.
    """
    from datetime import datetime

    # Create sample Paper objects
    paper1 = Paper(
        id="paper1",
        title="Climate Change and Marine Life",
        authors=["Jane Smith", "John Doe"],
        abstract="Analysis of climate change impacts on marine ecosystems and biodiversity.",
        published_date=datetime.now(),
        pdf_url="https://example.com/paper1.pdf",
        entry_id="paper1",
        categories=["Climate", "Marine Biology"],
        is_relevant=True
    )
    
    paper2 = Paper(
        id="paper2",
        title="Biodiversity in a Changing World",
        authors=["Alice Johnson", "Bob Brown"],
        abstract="Study on how biodiversity is affected by global environmental changes.",
        published_date=datetime.now(),
        pdf_url="https://example.com/paper2.pdf",
        entry_id="paper2",
        categories=["Ecology", "Climate Change"],
        is_relevant=True
    )
    
    paper3 = Paper(
        id="paper3",
        title="Marine Ecosystems and Climate",
        authors=["Carol White", "David Green"],
        abstract="Examining the resilience of marine ecosystems to climate variability.",
        published_date=datetime.now(),
        pdf_url="https://example.com/paper3.pdf",
        entry_id="paper3",
        categories=["Oceanography", "Ecology"],
        is_relevant=True
    )
    
    research_question = "What are the effects of climate change on marine biodiversity?"
    papers = [paper1, paper2, paper3]
    
    outline = generate_outline(research_question, papers)
    print(json.dumps(outline, indent=2))

if __name__ == "__main__":
    test_generate_outline()