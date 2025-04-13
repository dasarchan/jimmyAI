"""
Module for generating optimized arXiv search queries and fetching paper metadata.
"""
import arxiv
from modules.paper import Paper

def generate_search_query(topic, include_terms=None, exclude_terms=None):
    """
    Generate an optimized arXiv search query based on topic and inclusion/exclusion criteria.
    
    Args:
        topic (str): The main research topic
        include_terms (list): Terms that should be included in results
        exclude_terms (list): Terms that should be excluded from results
        
    Returns:
        str: A formatted arXiv search query
    """
    # Base query with the main topic in title and abstract
    query = f'(ti:{topic} OR abs:{topic})'
    
    # Add inclusion terms
    if include_terms:
        inclusion_parts = []
        for term in include_terms:
            inclusion_parts.append(f'(ti:{term} OR abs:{term})')
        if inclusion_parts:
            query += ' AND (' + ' OR '.join(inclusion_parts) + ')'
    
    # Add exclusion terms
    if exclude_terms:
        for term in exclude_terms:
            query += f' ANDNOT (ti:{term} OR abs:{term})'
 
    return query

def fetch_papers(query, max_results=50, sort_by=arxiv.SortCriterion.SubmittedDate):
    """
    Fetch papers from arXiv based on the search query.
    
    Args:
        query (str): The formatted arXiv search query
        max_results (int): Maximum number of results to return
        sort_by: Sorting criteria for results
        
    Returns:
        list: List of arxiv.Result objects containing paper metadata
    """
    client = arxiv.Client()
    search = arxiv.Search(
        query=query,
        max_results=max_results,
        sort_by=sort_by
    )
    
    results = list(client.results(search))
    # Convert arxiv.Result objects to Paper objects

    results = [Paper.from_arxiv_result(paper) for paper in results]
    for paper in results:
        paper.bibtex = populate_bibtex(paper)
        print(paper.bibtex)

    return results

def populate_bibtex(paper):
    """
    Populate BibTeX entry for a given paper.
    
    Args:
        paper (Paper): Paper object containing metadata
        
    Returns:
        str: BibTeX entry as a string
    """    
    # Format authors properly
    author_str = " and ".join(paper.authors) if paper.authors else "Unknown"
    
    # Build BibTeX entry with proper indentation
    bibtex = f"""@article{{{paper.id},
        title = {{{paper.title}}},
        author = {{{author_str}}},
        year = {{{paper.published_date.year}}},
        eprint = {{{paper.entry_id.split('/')[-1]}}},
        archivePrefix = {{arXiv}},
        primaryClass = {{{paper.categories[0] if paper.categories else 'Unknown'}}},
        url = {{{paper.pdf_url}}}
        }}"""
    
    return bibtex