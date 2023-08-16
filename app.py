from flask import Flask, request, render_template, jsonify
from src.main import generate_meditation_text

app = Flask(__name__)

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/test', methods=['GET'])
def test_route():
    return "Test route is working!"


@app.route('/generate_meditation', methods=['POST'])
def generate_meditation():
    try:
        # Print the received data
        print("Received data: ")
        print(request.form)

        length_choice = request.form['length_choice']
        focus_choice = request.form['focus_choice']
        method_choice = request.form['method_choice']
        
        meditation_text = generate_meditation_text(length_choice, focus_choice, method_choice)
        print(meditation_text)  
        
        return jsonify({"success": True, "meditation_text": meditation_text})

    except Exception as e:
        return jsonify({"success": False, "error": str(e)})


if __name__ == '__main__':
    app.run(debug=True)
