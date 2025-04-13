import os
from modules.paper import Paper
import dotenv
dotenv.load_dotenv()

from llama_index.core import VectorStoreIndex, Document
from llama_index.core.query_engine import RetrieverQueryEngine
from llama_index.core.retrievers import VectorIndexRetriever

from modules.ai_analyzer import client

llama_index_api_key = os.getenv("LLAMA_INDEX_API_KEY")
api_key = os.getenv("GOOGLE_API_KEY")


def create_index(papers: list[Paper]) -> VectorStoreIndex:
    """Create a vector index from a list of text strings"""
    # Store the original papers with their IDs for later retrieval
    paper_dict = {str(i): paper for i, paper in enumerate(papers)}
    
    # Create documents with metadata containing the paper index
    documents = [
        Document(
            text=paper.relevant_content, 
            metadata={"paper_id": str(i)}
        ) for i, paper in enumerate(papers)
    ]
    
    # Create the index with the documents
    index = VectorStoreIndex.from_documents(documents)
    
    # Store the paper dictionary in the index's extra_info
    index.extra_info = {"papers": paper_dict}
    
    return index

def query_papers(index: VectorStoreIndex, query: str, top_k: int = 3):
    """Get top k most relevant papers for a query"""
    retriever = VectorIndexRetriever(index=index, similarity_top_k=top_k)
    
    # Retrieve the relevant document nodes
    retrieved_nodes = retriever.retrieve(query)
    
    # Get the papers from the stored dictionary using the metadata paper_id
    paper_dict = index.extra_info.get("papers", {})
    retrieved_papers = [paper_dict[node.metadata["paper_id"]] for node in retrieved_nodes]
    
    # Return both the papers and a formatted response
    return retrieved_papers

def write_lit_review_section(index, query, top_k=10):
    top_papers = query_papers(index, query, top_k=top_k)
    top_papers_formatted = "\n".join(
        [f"- {paper.title} by {', '.join(paper.authors)}{f'\n: BibTeX entry: {paper.bibtex}' if hasattr(paper, 'bibtex') and paper.bibtex else ''}: {paper.relevant_content}" for paper in top_papers]
    )
    print(f"Top {top_k} papers for query '{query}':")
    prompt = f"""
    Write a comprehensive literature review section formatted in Markdown based on the following relevant papers:

    {top_papers_formatted}

    Follow these guidelines:
    1. Synthesize the key findings and arguments from the papers, don't just summarize them individually
    2. Identify common themes, agreements, and disagreements between the papers
    3. Critically analyze the methodologies and results
    4. Highlight any research gaps or areas needing further investigation
    5. Use proper academic tone and style
    6. Include in-text citations when discussing specific papers
    7. Ensure logical flow and transitions between ideas
    8. Focus on how the papers relate to and help answer the research question: {query}
    9. Add inline citations where necessary in a reasonable format.

    Structure the review section with:
    - Clear topic sentences for each paragraph
    - Supporting evidence from the papers
    - Critical analysis and synthesis
    - Smooth transitions between ideas
    - A concluding paragraph that ties the findings together

    Write the literature review section in a scholarly style while maintaining readability.
    """

    contents = [{"text": prompt}]
        
    # Generate content with the prompt and PDF
    response = client.models.generate_content(
        model="gemini-2.0-flash", 
        contents=contents
    )

    print(f"Response: {response.text}")
    return response.text



def main():
    # Example texts about different topics
    texts = [
        "Machine learning is a subset of artificial intelligence that focuses on developing systems that can learn from data.",
        "Natural language processing (NLP) deals with the interaction between computers and human language.",
        "Computer vision enables computers to understand and process visual information from the world.",
        "Deep learning uses neural networks with multiple layers to automatically learn representations of data.",
        "Reinforcement learning is about training agents to make sequences of decisions through trial and error."
    ]
    
    # Create index from texts
    index = create_index(texts)
    
    # Example queries
    queries = [
        "What is machine learning?",
        "How does NLP work?",
        "Tell me about neural networks"
    ]
    
    # Run queries and print results
    for query in queries:
        print(f"\nQuery: {query}")
        response = query_papers(index, query)
        print(f"Response: {response}")

if __name__ == "__main__":
    main()
