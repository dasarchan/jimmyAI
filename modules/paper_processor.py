"""
Module for downloading and processing arXiv papers.
"""
import os
import requests
from urllib.parse import urlparse
import time

def download_papers(papers, output_dir):
    """
    Download PDF files for the given papers.
    
    Args:
        papers (list): List of arxiv.Result objects
        output_dir (str): Directory to save downloaded PDFs
        
    Returns:
        dict: Mapping of paper IDs to local file paths
    """
    paper_paths = {}
    os.makedirs(output_dir, exist_ok=True)
    
    for i, paper in enumerate(papers):
        paper_id = paper.get_short_id()
        filename = f"{paper_id}.pdf"
        filepath = os.path.join(output_dir, filename)
        
        # Check if file already exists
        if os.path.exists(filepath):
            print(f"Paper {paper_id} already downloaded, skipping")
            paper_paths[paper_id] = filepath
            continue
        
        # Download the PDF
        try:
            pdf_url = paper.pdf_url
            print(f"Downloading {i+1}/{len(papers)}: {paper_id} - {paper.title}")
            
            response = requests.get(pdf_url, stream=True)
            response.raise_for_status()
            
            with open(filepath, 'wb') as f:
                for chunk in response.iter_content(chunk_size=8192):
                    f.write(chunk)
                    
            paper_paths[paper_id] = filepath
            
            # Be nice to the arXiv API - don't make too many requests too quickly
            time.sleep(1)
            
        except Exception as e:
            print(f"Error downloading {paper_id}: {e}")
    
    return paper_paths

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