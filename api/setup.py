from langchain_groq import ChatGroq
from dotenv import load_dotenv
import os

load_dotenv()

def interact(query):

    print("Received query:", query)  # Debug print
    api_key = os.getenv("GROQ_API_KEY")
    print("API Key:", api_key)  # Debug print to confirm API key

    if not api_key:
        raise ValueError("API Key is missing.")

    # Use ChatGroq model only if the API Key is confirmed loaded
    chat_model = ChatGroq(
        model="llama-3.1-70b-versatile",
        temperature=0,
        max_tokens=None,
        timeout=None,
        max_retries=2,
    )

    # Try interacting with the model and return response
    try:
        resp = chat_model.invoke(query)
        print("Model response:", resp.content)  # Debug print response
        return resp.content
    except Exception as e:
        print("Error while invoking ChatGroq model:", str(e))  # Error handling
        raise e  # Re-raise the exception to propagate error message
