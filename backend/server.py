from flask import Flask, request, jsonify
from flask_cors import CORS
import datetime
import webbrowser
import urllib.parse

# Import AI functions
from main import get_ai_response, wikipedia_available, wikipedia

app = Flask(__name__)
# Allow CORS for the Vite dev server and Vercel frontend
CORS(app, origins=["http://localhost:5173", "http://localhost:5174", "https://rune-frontend.vercel.app", "*"])

def process_command(query, query_lower):
    # Time query
    if "the time" in query_lower or "what time" in query_lower:
        now = datetime.datetime.now()
        return f"The time is {now.strftime('%H:%M')}"

    # Wikipedia query
    if "wikipedia" in query_lower:
        if not wikipedia_available:
            return "Wikipedia support is not installed on the server."
        try:
            topic = query_lower.replace("wikipedia", "").replace("search", "").replace("about", "").strip()
            if not topic:
                return "What should I search on Wikipedia?"
            summary = wikipedia.summary(topic, sentences=2, auto_suggest=False)
            return f"According to Wikipedia, {summary}"
        except Exception as e:
            return "I couldn't fetch that information from Wikipedia right now."
    #Who's your creator query
    if any(x in query_lower for x in [
        "creator",
        "who created you",
        "who made you",
        "who built you",
        "who is your creator"
    ]):
        return "My creators are pair of Devansh, My Goats and Gods."
    
    # Best teacher query
    if any(x in query_lower for x in [
        "best teacher in jss",
        "best teacher of jss",
        "best teacher"
    ]):
        return "Mayank Raj Sir is the best Teacher of JSS , He is loved by every student"

    # Open website command using browser module
    if "open " in query_lower or query_lower.startswith("open"):
        sites = {
            "youtube": ("https://www.youtube.com", "YouTube"),
            "spotify": ("https://open.spotify.com", "Spotify"),
            "linkedin": ("https://www.linkedin.com", "LinkedIn"),
            "linkdin": ("https://www.linkedin.com", "LinkedIn"),
            "github": ("https://github.com", "GitHub"),
            "google": ("https://www.google.com", "Google"),
            "instagram": ("https://www.instagram.com", "Instagram"),
            "twitter": ("https://x.com", "Twitter"),
            "reddit": ("https://www.reddit.com", "Reddit"),
            "netflix": ("https://www.netflix.com", "Netflix"),
            "whatsapp": ("https://web.whatsapp.com", "WhatsApp"),
            "gmail": ("https://mail.google.com", "Gmail"),
            "chatgpt": ("https://chatgpt.com", "ChatGPT"),
            "leetcode": ("https://leetcode.com", "LeetCode"),
            "amazon": ("https://www.amazon.com", "Amazon"),
        }

        matched_url = None
        matched_name = None
        for key, (url, name) in sites.items():
            if key in query_lower:
                matched_url = url
                matched_name = name
                break

        if not matched_url:
            parts = query_lower.split("open ", 1)
            raw_target = parts[1].strip().rstrip(".?!") if len(parts) > 1 else ""
            if raw_target:
                if "." in raw_target and " " not in raw_target:
                    matched_url = f"https://{raw_target}" if not raw_target.startswith("http") else raw_target
                    matched_name = raw_target
                else:
                    matched_url = f"https://www.google.com/search?q={urllib.parse.quote(raw_target)}"
                    matched_name = raw_target
            else:
                matched_url = "https://www.google.com"
                matched_name = "browser"

        try:
            webbrowser.open_new_tab(matched_url)
        except Exception as e:
            print(f"Error opening browser: {e}")

        return {
            "response": f"Opening {matched_name} in a new tab.",
            "url": matched_url
        }

    # Fallback to AI
    return get_ai_response(query)

@app.route('/api/query', methods=['POST'])
def handle_query():
    data = request.json
   
    if not data:
        return jsonify({'error': 'No data provided'}), 400
        
    query = data.get('query', '')
    if not query:
        return jsonify({'error': 'No query provided'}), 400
    query_lower = query.lower().strip()
    result = process_command(query, query_lower)
    if isinstance(result, dict):
        return jsonify(result)
    return jsonify({'response': result})

@app.route('/', methods=['GET'])
def health_check():
    return jsonify({'status': 'Rune Backend is running!'})

if __name__ == '__main__':
    import os
    port = int(os.environ.get("PORT", 5000))
    app.run(host='0.0.0.0', port=port, debug=True)