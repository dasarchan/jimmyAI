"""
Module for processing arXiv papers using Google's file API.
"""
import os
import requests
import tempfile
from google import genai
import time
from typing import List, Dict, Any

from modules.paper import Paper

def upload_papers(papers: List[Paper], client) -> Dict[str, Dict[str, Any]]:
    """
    Download PDFs temporarily and upload them to Google AI Platform.
    
    Args:
        papers (List[Paper]): List of Paper objects
        client: The Google Generative AI client
        
    Returns:
        dict: Mapping of paper IDs to file URIs
    """
    paper_uris = {}
    
    # Create a temporary directory to store downloads
    with tempfile.TemporaryDirectory() as temp_dir:
        for i, paper in enumerate(papers):
            paper_id = paper.id
            pdf_url = paper.pdf_url
            
            print(f"Processing {i+1}/{len(papers)}: {paper_id} - {paper.title}")
            
            # Create a temporary file path
            temp_file_path = os.path.join(temp_dir, f"{paper_id}.pdf")
            
            try:
                # First download the PDF
                print(f"  Downloading from {pdf_url}")
                response = requests.get(pdf_url, stream=True)
                response.raise_for_status()
                
                with open(temp_file_path, 'wb') as f:
                    for chunk in response.iter_content(chunk_size=8192):
                        f.write(chunk)
                
                # Then upload to Google AI
                print(f"  Uploading to Google AI")
                uploaded_file = client.files.upload(file=temp_file_path)
                
                # Update the paper object with upload info
                paper.uploaded = True
                paper.file_uri = uploaded_file.uri
                
                # Store the file URI for later use with Gemini
                paper_uris[paper_id] = {
                    "uri": uploaded_file.uri,
                    "mime_type": paper.mime_type,
                    "title": paper.title
                }
                
                time.sleep(1)
                
            except Exception as e:
                print(f"Error processing {paper_id}: {e}")
    
    return paper_uris

# The extract_metadata function is no longer needed since we have the Paper class
# with proper conversion methods like from_arxiv_result and to_dict
