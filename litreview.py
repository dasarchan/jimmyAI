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
from modules.ai_analyzer import filter_papers, client, generate_queries_gemini, get_inclusion_exclusion_criteria
from modules.outline_generator import generate_literature_review_outline
from modules.paper import Paper
from modules.rag import create_index, write_lit_review_section
from modules.generate_report import generate_full_report
from modules.compile_report import compile_markdown_report
import json

@click.group()
def cli():
    """LitReviewAI: AI-powered literature review tool."""
    pass

@cli.command()
@click.option('--topic', required=True, help='Main research topic')
@click.option('--max-papers', default=int(os.getenv('MAX_PAPERS', 1)), 
              help='Maximum number of papers to retrieve')
def search(topic, max_papers):
    """Run a literature review with the given parameters."""
    # click.echo(f"Starting literature review on: {topic}")
    
    # # Step 1: Generate search query
    # click.echo("Generating optimized search query...")
    # include, exclude = get_inclusion_exclusion_criteria(topic, num_criteria=5)
    # queries = generate_queries_gemini(topic, num_queries=5)

    # query = " OR ".join([f"({q})" for q in queries])
    query = ""

    click.echo(f"Search query: {query}")

    # Step 2: Fetch paper metadata from arXiv
    click.echo(f"Fetching up to {max_papers} papers from arXiv...")
    papers = fetch_papers(query, max_results=max_papers)
    click.echo(f"Found {len(papers)} papers matching criteria")
    
    # Step 3: Upload papers to Google AI
    # click.echo("Uploading papers to Google AI...")
    # papers = upload_papers(papers, client)
    # click.echo(f"Uploaded {len(papers)} papers")
    
    # # Step 4: Analyze relevance with AI and extract relevant content
    # click.echo("Analyzing and filtering papers with Gemini...")
    # results = filter_papers(papers, topic, include, exclude)
    # click.echo("\nFiltered papers")
    # for paper in papers:
    #     if paper.is_relevant:
    #         print(paper.relevant_content)

    # Step 5: Generate outline
    click.echo("Generating outline...")
    print(f"<papers>")
    relevant_papers = []
    for paper in papers:
        if paper.is_relevant:
            paper_data = {
                "title": paper.title,
                "authors": paper.authors,
                "abstract": paper.abstract,
                "year": paper.published_date.year if paper.published_date else None,
                "url": paper.pdf_url
            }
            relevant_papers.append(paper_data)
    print(json.dumps(relevant_papers, indent=2))
    print(f"</papers>")
    # outline = generate_literature_review_outline(topic, papers)
    # print(outline)
    # click.echo("Outline generated successfully!")

    # For each section, write it
    # index = create_index(papers)

    # full_outline = generate_full_report(outline, index)

    print("<final_report>")
    print("### Lit Review\nThis is the body of the lit review")
    # print(compile_markdown_report(full_outline))
    print("</final_report>")


    click.echo("Full report generated successfully!")

    click.echo("\nLiterature review complete!")

if __name__ == '__main__':
    cli() 