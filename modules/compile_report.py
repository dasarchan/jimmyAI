import os
from google import genai
import json
from typing import Dict, Any, List
import dotenv
from modules.paper import Paper
from modules.ai_analyzer import client

"""
Module for compiling the final report in LaTeX format using Google's Gemini AI.
"""



# Load environment variables
dotenv.load_dotenv()

def compile_latex_report(report_data: Dict[str, Any]) -> str:
    """
    Convert the generated report data into a complete LaTeX document.
    
    Args:
        report_data (Dict[str, Any]): The enhanced outline with generated text content
        
    Returns:
        str: Complete LaTeX document ready to be compiled
    """
    # Convert the report_data to a JSON string for the prompt
    report_json = json.dumps(report_data, indent=2)
    
    prompt = f"""
    You are a scientific document preparation expert. Convert the following JSON structured literature review 
    into a complete, well-formatted LaTeX document. The JSON contains a hierarchical outline with title, 
    sections, subsections, and generated text content.

    Each section in the JSON may contain:
    - title: The section heading
    - text: The content for that section
    - sections: An array of subsections with the same structure

    Create a professionally formatted LaTeX document that:
    1. Includes appropriate preamble with necessary packages
    2. Has a proper title page with the main title
    3. Includes a table of contents
    4. Contains all sections and subsections with proper LaTeX sectioning commands
    5. Properly formats any citations if they appear in the text content
    6. Includes a references section at the end
    7. Uses appropriate LaTeX document class and formatting for a literature review
    
    Here is the JSON structure of the document:
    
    {report_json}
    
    Return only the complete LaTeX code without any explanations or markdown formatting.
    """

    try:
        response = client.models.generate_content(
            model="gemini-2.0-flash",
            contents=[{"text": prompt}]
        )
        
        content = response.text
        
        # Clean up possible markdown formatting
        if "```latex" in content:
            latex_content = content.split("```latex")[1].split("```")[0].strip()
        elif "```" in content:
            latex_content = content.split("```")[1].strip()
        else:
            latex_content = content.strip()
            
        return latex_content
        
    except Exception as e:
        print(f"Error generating LaTeX document: {e}")
        return f"% Error generating LaTeX document: {str(e)}"

def save_latex_to_file(latex_content: str, output_path: str) -> None:
    """
    Save the generated LaTeX content to a file.
    
    Args:
        latex_content (str): The LaTeX document content
        output_path (str): Path to save the output file
    """
    with open(output_path, 'w') as f:
        f.write(latex_content)
    print(f"LaTeX report saved to: {output_path}")

def generate_pdf_report(enhanced_outline: Dict[str, Any], output_dir: str = "output/", filename: str = "literature_review") -> str:
    """
    Generate a full LaTeX report from the enhanced outline and save it to a file.
    
    Args:
        enhanced_outline (Dict[str, Any]): The enhanced outline with generated text content
        output_dir (str): Directory to save the output file
        filename (str): Base name for the output file (without extension)
        
    Returns:
        str: Path to the saved LaTeX file
    """
    # Ensure output directory exists
    os.makedirs(output_dir, exist_ok=True)
    
    # Generate LaTeX content
    latex_content = compile_latex_report(enhanced_outline)
    
    # Construct output path
    output_path = os.path.join(output_dir, f"{filename}.tex")
    
    # Save to file
    save_latex_to_file(latex_content, output_path)
    
    return output_path