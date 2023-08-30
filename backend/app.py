import os
from dotenv import load_dotenv
from flask import Flask, request, render_template, jsonify, send_from_directory
from flask_cors import CORS
from main import generate_meditation_text

# Load environment variables from .env file
load_dotenv()

app = Flask(__name__)

FRONTEND_URL = os.environ.get("FRONTEND_URL", "http://localhost:3000")

# Configure CORS for the app
ALLOWED_ORIGINS = [FRONTEND_URL, "http://localhost:3000"]
CORS(app, resources={r"/*": {"origins": ALLOWED_ORIGINS}})


@app.route("/")
def index():
    return render_template("index.html")


@app.route("/test", methods=["GET"])
def test_route():
    return "Test route is working!"


@app.route("/generate_meditation", methods=["POST"])
def generate_meditation():
    try:
        print("Received data: ")
        print(request.form)

        length_choice = request.form["length_choice"]
        focus_choice = request.form["focus_choice"]
        method_choice = request.form["method_choice"]

        meditation_text = generate_meditation_text(
            length_choice, focus_choice, method_choice
        )
        print(meditation_text)

        return jsonify({"success": True, "meditation_text": meditation_text})

    except Exception as e:
        return jsonify({"success": False, "error": str(e)})


@app.route("/", defaults={"path": ""})
@app.route("/<path:path>")
def catch_all(path):
    return send_from_directory("frontend/build", "index.html")


@app.route("/<path:filename>")
def serve_static(filename):
    return send_from_directory("frontend/build", filename)


if __name__ == "__main__":
    app.run(debug=True)
