import os
from dotenv import load_dotenv
from mistralai.client import Mistral

# Load environment variables from .env file
load_dotenv()

# ── Mistral client ──────────────────────────────────────────────────────────
mistral_client = None
try:
    api_key = os.environ.get("MISTRAL_API_KEY")
    if api_key:
        mistral_client = Mistral(api_key=api_key)
        print("Mistral AI initialized successfully")
    else:
        print("Warning: MISTRAL_API_KEY not found in .env file")
except Exception as e:
    print(f"Warning: Could not initialize Mistral: {e}")

# ── Wikipedia ──────────────────────────────────────────────────────────
try:
    import wikipedia
    wikipedia.set_lang("en")
    wikipedia_available = True
except ImportError:
    wikipedia = None
    wikipedia_available = False

def get_ai_response(query):
    """Get AI response using Mistral API"""
    if mistral_client is None:
        return "Mistral AI is not available. Please check your API key in the .env file."

    preferred_model = os.environ.get("MISTRAL_MODEL", "ministral-3b-latest")
    candidate_models = [preferred_model]
    for fallback in ["ministral-3b-latest", "ministral-8b-latest", "codestral-latest", "mistral-small-latest"]:
        if fallback not in candidate_models:
            candidate_models.append(fallback)

    messages = [
        {
            "role": "system",
            "content": (
                "You are a voice assistant. Reply in concise, plain conversational spoken English without markdown, bullet points, or special characters. Keep replies under 2 sentences unless asked for detail."
            ),
        },
        {"role": "user", "content": query},
    ]

    last_error = None
    for model_name in candidate_models:
        try:
            response = mistral_client.chat.complete(
                model=model_name,
                messages=messages,
            )
            return response.choices[0].message.content.strip()
        except Exception as e:
            last_error = e
            print(f"Mistral attempt with model '{model_name}' failed: {e}")
            continue

    print(f"All Mistral models failed. Last error: {last_error}")
    return "Sorry, I couldn't process that right now. Please try again."

if __name__ == "__main__":
    print("This module is now used as a library for server.py. Please run server.py instead.")