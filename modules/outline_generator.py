import os
from google import genai
import json

"""
Module for generating literature review outlines using Google's Gemini AI.
"""

# Configure the Gemini API
api_key = os.getenv("GOOGLE_API_KEY")
if not api_key:
    raise ValueError("GOOGLE_API_KEY environment variable not set. Please add it to your .env file.")
    
client = genai.Client(api_key=api_key)

def generate_outline(research_question, sources, max_sections=5):
    """
    Generate a structured outline for a literature review based on relevant papers.
    
    Args:
        research_question (str): The main research question
        sources (dict): Dictionary of paper titles mapped to their metadata and content
        max_sections (int): Maximum number of main sections to include
        
    Returns:
        dict: JSON structured outline for the literature review
    """
    # Prepare sources list for the prompt
    sources_list = "\n".join([f"- {title}" for title in sources.keys()])
    
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
                        "question": "Question encapsulating what this section is supposed to cover.",
                    }}
                ]
            }}
        ],
    }}
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
            
        # Parse the JSON
        outline = json.loads(json_content)
        return outline
    
    except Exception as e:
        print(f"Error generating outline: {e}")
        return {
            "error": str(e),
            "title": f"Literature Review on {research_question}",
            "sections": [],
            "conclusion": "Error generating outline"
        }

def generate_literature_review_outline(research_question, relevant_papers, topic_keywords=None):
    """
    Generate a literature review outline given a research question and relevant papers.
    
    Args:
        research_question (str): The main research question
        relevant_papers (dict): Dictionary of relevant papers (title -> metadata)
        topic_keywords (list): Optional list of keywords to emphasize
        
    Returns:
        dict: JSON structured outline for the literature review
    """
    print(f"Generating literature review outline for: {research_question}")
    print(f"Using {len(relevant_papers)} relevant papers")
    
    # Filter to only include papers marked as relevant
    filtered_papers = {title: data for title, data in relevant_papers.items() 
                      if isinstance(data, dict) and data.get("is_relevant", "no") == "yes"}
    
    if not filtered_papers:
        print("Warning: No relevant papers found. Using all provided papers.")
        filtered_papers = relevant_papers
    
    # Generate the outline
    outline = generate_outline(research_question, filtered_papers)
    
    return outline


def test_generate_outline():
    """
    Test the generate_outline function with a sample research question and sources.
    """
    research_question = "What are the effects of climate change on marine biodiversity?"
    sources = {
        "Paper 1": {"title": "Climate Change and Marine Life", "content": "..."},
        "Paper 2": {"title": "Biodiversity in a Changing World", "content": "..."},
        "Paper 3": {"title": "Marine Ecosystems and Climate", "content": "..."}
    }
    
    outline = generate_outline(research_question, sources)
    print(json.dumps(outline, indent=2))

if __name__ == "__main__":
    test_generate_outline()