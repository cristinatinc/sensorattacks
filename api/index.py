from flask import Flask, request, jsonify
from flask_cors import CORS
from dotenv import load_dotenv
import os
from setup import interact

load_dotenv()

app = Flask(__name__, static_folder='frontend/build', static_url_path='/')
CORS(app)


@app.route('/')
def home():
    return app.send_static_file('')

@app.route('/api/chat', methods=['POST'])
def chat():
    if not os.getenv("GROQ_API_KEY"):
        return jsonify({"error": "Groq API Key not loaded"}), 500
    query = request.json['message']
    try:
        print("Received /api/chat request with message:", query)  # Debug print
        response = interact(query)
        print("Response from interact function:", response)  # Debug print
        return jsonify({"reply": str(response)})
    except Exception as e:
        print("Error in /api/chat:", str(e))  # Debug print
        return jsonify({"error": str(e)}), 500

@app.route('/api/analyze', methods=['POST'])
def analyze():
    if not os.getenv("GROQ_API_KEY"):
        return jsonify({"error": "Groq API Key not loaded"}), 500
    first_value = request.json['input1']
    second_value = request.json['input2']
    query = f"Analyze these two values: {first_value} and {second_value}."
    try:
        print("Received /api/analyze request with values:", first_value, second_value)  # Debug print
        response = interact(query)
        print("Response from interact function:", response)  # Debug print
        return jsonify({"reply": str(response)})
    except Exception as e:
        print("Error in /api/analyze:", str(e))  # Debug print
        return jsonify({"error": str(e)}), 500

    
@app.route('/api/test-key', methods=['GET'])
def test_key():
    api_key = os.getenv("GROQ_API_KEY")
    if api_key:
        return jsonify({"status": "API Key loaded successfully"})
    else:
        return jsonify({"error": "API Key not loaded"}), 500


if __name__ == '__main__':
    app.run(debug=True)
