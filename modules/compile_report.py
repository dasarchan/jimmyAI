import os
from google import genai
import json
from typing import Dict, Any, List
import dotenv
from modules.paper import Paper
from modules.ai_analyzer import client

"""
Module for compiling the final report in Markdown format using Google's Gemini AI.
"""

# Load environment variables
dotenv.load_dotenv()

def compile_markdown_report(report_data: Dict[str, Any]) -> str:
    """
    Convert the generated report data into a complete Markdown document.
    
    Args:
        report_data (Dict[str, Any]): The enhanced outline with generated text content
        
    Returns:
        str: Complete Markdown document
    """
    # Convert the report_data to a JSON string for the prompt
    report_json = json.dumps(report_data, indent=2)
    
    prompt = f"""
    You are a scientific document preparation expert. Convert the following JSON structured literature review 
    into a complete, well-formatted Markdown document. The JSON contains a hierarchical outline with title, 
    sections, subsections, and generated text content.

    Each section in the JSON may contain:
    - title: The section heading
    - text: The content for that section
    - sections: An array of subsections with the same structure

    Create a professionally formatted Markdown document that:
    1. Has a proper title at the top with the main title
    2. Includes a table of contents
    3. Contains all sections and subsections with proper Markdown heading levels (# for main title, ## for sections, ### for subsections, etc.)
    4. Keeps any inline citations in the text (like [Author, Year])
    5. Includes a references section at the end
    
    Here is the JSON structure of the document:
    
    {report_json}
    
    Return only the complete Markdown content without any explanations.
    """

    try:
        response = client.models.generate_content(
            model="gemini-2.0-flash",
            contents=[{"text": prompt}]
        )
        
        content = response.text
        
        # Clean up possible markdown formatting
        if "```markdown" in content:
            markdown_content = content.split("```markdown")[1].split("```")[0].strip()
        elif "```md" in content:
            markdown_content = content.split("```md")[1].split("```")[0].strip()
        elif "```" in content:
            markdown_content = content.split("```")[1].strip()
        else:
            markdown_content = content.strip()
            
        return markdown_content
        
    except Exception as e:
        print(f"Error generating Markdown document: {e}")
        return f"Error generating Markdown document: {str(e)}"

def save_markdown_to_file(markdown_content: str, output_path: str) -> None:
    """
    Save the generated Markdown content to a file.
    
    Args:
        markdown_content (str): The Markdown document content
        output_path (str): Path to save the output file
    """
    with open(output_path, 'w') as f:
        f.write(markdown_content)
    print(f"Markdown report saved to: {output_path}")

def generate_pdf_report(enhanced_outline: Dict[str, Any], output_dir: str = "output/", filename: str = "literature_review") -> str:
    """
    Generate a full Markdown report from the enhanced outline and save it to a file.
    
    Args:
        enhanced_outline (Dict[str, Any]): The enhanced outline with generated text content
        output_dir (str): Directory to save the output file
        filename (str): Base name for the output file (without extension)
        
    Returns:
        str: Markdown content
    """
    # Ensure output directory exists
    os.makedirs(output_dir, exist_ok=True)
    
    # Generate Markdown content
    markdown_content = compile_markdown_report(enhanced_outline)
    
    # Construct output path
    output_path = os.path.join(output_dir, f"{filename}.md")
    
    # Save to file
    save_markdown_to_file(markdown_content, output_path)
    
    return markdown_content
