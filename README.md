# LitReviewAI

A Gemini and LlamaIndex powered tool for conducting thorough literature reviews compliant with PRISMA Literature Review Guidelines.

## Features

- Generate optimized search queries for arXiv based on research topics and inclusion/exclusion criteria
- Automatically download relevant papers as PDFs
- Analyze paper relevance using Google's Gemini 2.5 Pro AI model
- Filter and rank papers according to specified criteria

## Installation

```bash
# Clone the repository
git clone [your-repo-url]
cd LitReviewAI

# Install dependencies
pip install -r requirements.txt

# Set up your environment variables
cp .env.example .env
# Edit .env with your Gemini API key
```

## Usage

```bash
# Run a literature review
python litreview.py search --topic "quantum computing" --include "optimization algorithms" --exclude "financial applications"

# Get help
python litreview.py --help
```

## Requirements

- Python 3.8+
- Google AI API key for Gemini 2.5 Pro 
