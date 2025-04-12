"""
Module for processing arXiv papers using Google's file API.
"""
import os
import requests
import tempfile
from google import genai
import time

def upload_papers(papers, client):
    """
    Download PDFs temporarily and upload them to Google AI Platform.
    
    Args:
        papers (list): List of arxiv.Result objects
        client: The Google Generative AI client
        
    Returns:
        dict: Mapping of paper IDs to file URIs
    """
    paper_uris = {}
    
    # Create a temporary directory to store downloads
    with tempfile.TemporaryDirectory() as temp_dir:
        for i, paper in enumerate(papers):
            paper_id = paper.get_short_id()
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
                
                # Store the file URI for later use with Gemini
                paper_uris[paper_id] = {
                    "uri": uploaded_file.uri,
                    "mime_type": "application/pdf",
                    "title": paper.title
                }
                
                time.sleep(1)
                
            except Exception as e:
                print(f"Error processing {paper_id}: {e}")
    
    return paper_uris

def extract_metadata(paper):
    """
    Extract relevant metadata from an arxiv.Result object.
    
    Args:
        paper: An arxiv.Result object
        
    Returns:
        dict: Metadata extracted from the paper
    """
    return {
        "id": paper.get_short_id(),
        "title": paper.title,
        "authors": [author.name for author in paper.authors],
        "abstract": paper.summary,
        "categories": paper.categories,
        "published": paper.published.strftime("%Y-%m-%d"),
        "url": paper.entry_id
    } 