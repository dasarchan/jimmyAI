from dataclasses import dataclass
from datetime import datetime
from typing import List, Optional, Dict, Any

"""
Module for defining data structures for paper metadata and content.
"""


@dataclass
class Paper:
    """
    Data class representing a research paper with its metadata and processing information.
    """
    # Basic metadata
    id: str
    title: str
    authors: List[str]
    abstract: str
    published_date: datetime
    pdf_url: str
    entry_id: str  # arXiv entry ID
    
    # Classification metadata
    categories: List[str]
    
    # Processing status
    uploaded: bool = False
    file_uri: Optional[str] = None
    mime_type: str = "application/pdf"
    
    # AI analysis results
    is_relevant: Optional[bool] = None
    relevance_reasoning: Optional[str] = None
    summary: Optional[str] = None
    relevant_content: Optional[str] = None
    
    # Additional metadata that might be useful
    citation_count: Optional[int] = None
    references: Optional[List[str]] = None
    tags: Optional[List[str]] = None

    bibtex: Optional[str] = None
    
    @classmethod
    def from_arxiv_result(cls, paper):
        """
        Create a Paper object from an arxiv.Result object.
        
        Args:
            paper: An arxiv.Result object
            
        Returns:
            Paper: A Paper object with metadata from the arxiv.Result
        """
        # Print the available attributes and values from the arxiv Result object
        return cls(
            id=paper.get_short_id(),
            title=paper.title,
            authors=[author.name for author in paper.authors],
            abstract=paper.summary,
            published_date=paper.published,
            pdf_url=paper.pdf_url,
            entry_id=paper.entry_id,
            categories=paper.categories
        )
    
    def to_dict(self) -> Dict[str, Any]:
        """
        Convert the Paper object to a dictionary.
        
        Returns:
            Dict[str, Any]: Dictionary representation of the Paper
        """
        result = {k: v for k, v in self.__dict__.items()}
        # Convert datetime to string for JSON serialization
        if isinstance(result["published_date"], datetime):
            result["published_date"] = result["published_date"].isoformat()
        return result