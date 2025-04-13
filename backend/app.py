from flask import Flask, request, jsonify
from flask_cors import CORS
import subprocess
import json
import time
import os
import sys
import traceback

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

@app.route('/api/search', methods=['POST'])
def search():
    # Get search query from request
    data = request.json
    query = data.get('query', '')
    
    if not query.strip():
        return jsonify({"error": "Please provide a search query"}), 400
    
    # Track execution time
    start_time = time.time()
    
    try:
        # Print debugging information
        print(f"Received search query: {query}")
        print(f"Current working directory: {os.getcwd()}")
        
        # First, check if litreview.py exists
        script_path = 'litreview.py'
        if not os.path.exists(script_path):
            script_path = '../litreview.py'
            if not os.path.exists(script_path):
                raise FileNotFoundError(f"Could not find litreview.py in current or parent directory")
        
        print(f"Using script at: {script_path}")
        
        # Safe query formatting
        safe_query = query.replace('"', '\\"')
        cmd = f'python {script_path} search --topic "{safe_query}"'
        
        print(f"Executing command: {cmd}")
        
        # Run the script
        process = subprocess.Popen(
            cmd,
            shell=True,
            stdout=subprocess.PIPE,
            stderr=subprocess.PIPE,
            text=True,
            bufsize=1,
            universal_newlines=True
        )

        output = []
        while True:
            line = process.stdout.readline()
            if not line and process.poll() is not None:
                break
            if line:
                print(line.rstrip())
                output.append(line)
        
        stderr = process.stderr.read()
        result_code = process.poll()
        result = type('Result', (), {
            'returncode': result_code,
            'stdout': ''.join(output),
            'stderr': stderr
        })()
        
        # Check if there was an error
        if result.returncode != 0:
            print(f"Script returned error code: {result.returncode}")
            print(f"STDERR: {result.stderr}")
            return jsonify({
                "error": f"Script execution failed: {result.stderr}",
                "query": query,
                "queryTime": round(time.time() - start_time, 1),
                "totalResults": 0,
                "results": []
            }), 500
        
        # Calculate execution time
        execution_time = round(time.time() - start_time, 1)
        
        # Print the output for debugging
        print(f"Script output: {result.stdout[:200]}...")  # Print first 200 chars
        results = result.stdout
        # Parse the output to JSON
        try:
            final_report = results.split("<final_report>")[1].split("</final_report>")[0]
            papers = json.loads(results.split("<papers>")[1].split("</papers>")[0])
            print(f"Successfully parsed JSON with {len(papers['papers'])} papers")
        except json.JSONDecodeError as e:
            print(f"JSON parsing error: {str(e)}")
            print(f"Raw output: {result.stdout}")
            # If not JSON, wrap the text output in a basic structure
            results = {
                "results": [
                    {
                        "id": 1,
                        "title": "Search Results",
                        "abstract": result.stdout,
                        "authors": "System",
                        "journal": "Terminal Output",
                        "year": 2023,
                        "relevanceScore": 100,
                        "keyFindings": ["Output from script"],
                        "methodology": "Command line execution",
                        "prismaElements": []
                    }
                ]
            }
        
        # Build formatted query for display
        formatted_query = f'(("{query}"))'
        
        # Create response
        response = {
            "query": query,
            "formattedQuery": formatted_query,
            "queryTime": execution_time,
            "totalResults": len(papers['papers']),
            "final_report": final_report,
            "papers": papers['papers']
        }
        
        return jsonify(response)
    
    except subprocess.CalledProcessError as e:
        print(f"Subprocess error: {str(e)}")
        print(f"STDERR: {e.stderr}")
        return jsonify({
            "error": f"Script execution failed: {e.stderr}",
            "query": query,
            "queryTime": round(time.time() - start_time, 1),
            "totalResults": 0,
            "final_report": "",
            "papers": []
        }), 500
    except Exception as e:
        print(f"Unexpected error: {str(e)}")
        print(traceback.format_exc())
        return jsonify({
            "error": f"An error occurred: {str(e)}",
            "query": query,
            "queryTime": round(time.time() - start_time, 1),
            "totalResults": 0,
            "final_report": "",
            "papers": []
        }), 500

@app.route('/api/filters', methods=['POST'])
def apply_filters():
    # Get filter parameters
    data = request.json
    query = data.get('query', '')
    
    # This endpoint would normally apply filters to existing results
    # For now, we'll just pass the filters to the search script if possible
    
    try:
        # Construct filter options for the script
        safe_query = query.replace('"', '\\"')
        cmd = f'python3 litreview.py search --topic "{safe_query}"'
        
        # Add year filter if provided
        if 'yearFrom' in data and 'yearTo' in data:
            cmd += f' --year-range {data["yearFrom"]}-{data["yearTo"]}'
        
        # Run the command
        result = subprocess.run(
            cmd, 
            shell=True, 
            check=True,
            capture_output=True, 
            text=True
        )
        
        # Parse results as in the search endpoint
        try:
            results = json.loads(result.stdout)
        except json.JSONDecodeError:
            # Fallback for non-JSON output
            results = {
                "results": [
                    {
                        "id": 1,
                        "title": "Filtered Results",
                        "abstract": result.stdout,
                        "authors": "System",
                        "journal": "Terminal Output",
                        "year": 2023,
                        "relevanceScore": 100,
                        "keyFindings": ["Output from script with filters"],
                        "methodology": "Command line execution with filters",
                        "prismaElements": []
                    }
                ]
            }
            
        return jsonify({
            "totalResults": len(results.get("results", [])),
            "results": results.get("results", [])
        })
    
    except Exception as e:
        return jsonify({
            "error": f"Failed to apply filters: {str(e)}",
            "totalResults": 0,
            "results": []
        }), 500

# Create a test endpoint to verify basic Flask functionality
@app.route('/api/test', methods=['GET'])
def test():
    return jsonify({"status": "ok", "message": "Flask server is running"})

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=8000) 