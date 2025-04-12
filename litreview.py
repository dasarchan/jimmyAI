#!/usr/bin/env python3
"""
LitReviewAI: An AI-powered tool for conducting thorough literature reviews.
"""

import os
import click
import dotenv

# Load environment variables
dotenv.load_dotenv()

from modules.arxiv_search import generate_search_query, fetch_papers
from modules.paper_processor import download_papers
from modules.ai_analyzer import analyze_papers

@click.group()
def cli():
    """LitReviewAI: AI-powered literature review tool."""
    pass

@cli.command()
@click.option('--topic', required=True, help='Main research topic')
@click.option('--include', multiple=True, help='Terms that should be included (can be used multiple times)')
@click.option('--exclude', multiple=True, help='Terms that should be excluded (can be used multiple times)')
@click.option('--max-papers', default=int(os.getenv('MAX_PAPERS', 5)), 
              help='Maximum number of papers to retrieve')
@click.option('--output-dir', default=os.getenv('OUTPUT_DIR', './papers'),
              help='Directory to save downloaded papers')
def search(topic, include, exclude, max_papers, output_dir):
    """Run a literature review with the given parameters."""
    click.echo(f"Starting literature review on: {topic}")
    
    # Step 1: Generate search query
    click.echo("Generating optimized search query...")
    query = generate_search_query(topic, include, exclude)
    click.echo(f"Search query: {query}")
    
    # Step 2: Fetch paper metadata from arXiv
    click.echo(f"Fetching up to {max_papers} papers from arXiv...")
    papers = fetch_papers(query, max_results=max_papers)
    click.echo(f"Found {len(papers)} papers matching criteria")
    
    # Step 3: Download PDFs
    click.echo("Downloading papers...")
    os.makedirs(output_dir, exist_ok=True)
    paper_paths = download_papers(papers, output_dir)
    
    # Step 4: Analyze relevance with AI
    click.echo("Analyzing papers with Gemini 2.5 Pro...")
    results = analyze_papers(paper_paths, topic, include, exclude)
    
    # Step 5: Report results
    click.echo("\nResults:")
    for paper, score in sorted(results.items(), key=lambda x: x[1], reverse=True):
        relevance = "High" if score > 0.7 else "Medium" if score > 0.4 else "Low"
        click.echo(f"- {os.path.basename(paper)}: {relevance} relevance ({score:.2f})")
    
    click.echo("\nLiterature review complete!")

if __name__ == '__main__':
    cli() 