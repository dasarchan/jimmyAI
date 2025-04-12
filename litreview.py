#!/usr/bin/env python3
"""
LitReviewAI: An AI-powered tool for conducting thorough literature reviews.
"""

import os
import click
import dotenv
# Load environment variables
dotenv.load_dotenv()

from modules.arxiv_search import fetch_papers
from modules.paper_processor import upload_papers
from modules.ai_analyzer import analyze_papers, client, generate_queries_gemini, get_inclusion_exclusion_criteria

@click.group()
def cli():
    """LitReviewAI: AI-powered literature review tool."""
    pass

@cli.command()
@click.option('--topic', required=True, help='Main research topic')
@click.option('--max-papers', default=int(os.getenv('MAX_PAPERS', 10)), 
              help='Maximum number of papers to retrieve')
def search(topic, max_papers):
    """Run a literature review with the given parameters."""
    click.echo(f"Starting literature review on: {topic}")
    
    # Step 1: Generate search query
    click.echo("Generating optimized search query...")
    include, exclude = get_inclusion_exclusion_criteria(topic, num_criteria=5)
    queries = generate_queries_gemini(topic, num_queries=5)

    query = " OR ".join([f"({q})" for q in queries])

    click.echo(f"Search query: {query}")

    # Step 2: Fetch paper metadata from arXiv
    click.echo(f"Fetching up to {max_papers} papers from arXiv...")
    papers = fetch_papers(query, max_results=max_papers)
    click.echo(f"Found {len(papers)} papers matching criteria")
    
    # Step 3: Upload papers to Google AI
    click.echo("Uploading papers to Google AI...")
    paper_uris = upload_papers(papers, client)
    click.echo(f"Uploaded {len(paper_uris)} papers")
    
    # Step 4: Analyze relevance with AI
    click.echo("Analyzing papers with Gemini...")
    results = analyze_papers(paper_uris, topic, include, exclude)
    
    # Step 5: Report results
    click.echo("\nResults:")
    for title, relevance in results.items():
        relevance_text = "Relevant" if relevance == "yes" else "Not relevant"
        click.echo(f"- {title}: {relevance_text}")
    
    click.echo("\nLiterature review complete!")

if __name__ == '__main__':
    cli() 