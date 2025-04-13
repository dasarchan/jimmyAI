import os
from modules.paper import Paper
import dotenv
dotenv.load_dotenv()

from llama_index.core import VectorStoreIndex, Document
from llama_index.core.query_engine import RetrieverQueryEngine
from llama_index.core.retrievers import VectorIndexRetriever


llama_index_api_key = os.getenv("LLAMA_INDEX_API_KEY")
api_key = os.getenv("GOOGLE_API_KEY")
 

def create_index(papers: list[Paper]) -> VectorStoreIndex:
    """Create a vector index from a list of text strings"""
    documents = [Document(text=paper.relevant_content) for paper in papers]
    index = VectorStoreIndex.from_documents(documents)
    return index

def query_papers(index: VectorStoreIndex, query: str, top_k: int = 3):
    """Get top k most relevant papers for a query"""
    retriever = VectorIndexRetriever(index=index, similarity_top_k=top_k)
    query_engine = RetrieverQueryEngine(retriever=retriever)
    response = query_engine.query(query)
    return response

def write_lit_review_section(index, query):
    pass



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
