from flask import Flask, render_template, request, jsonify
import openai

app = Flask(__name__)

def get_api_key_from_file():
    with open('key.txt', 'r') as file:
        openai.api_key = file.read().strip()
    return openai.api_key

openai.api_key = get_api_key_from_file()

@app.route('/ma-page')
def index():
    return render_template('index.html')

@app.route('/chatbot', methods=['POST'])
def chat_with_gpt4():
    data = request.get_json()
    user_input = data.get('user_input')

    if user_input is None:
        return jsonify({'response': "Erreur : aucune entrée utilisateur fournie."})

    if user_input.lower() == 'exit':
        return jsonify({'response': "Au revoir!"})

    with open('prompt.txt', 'r') as file:
        personality_prompt = file.read().strip()

    response = openai.ChatCompletion.create(
        model="gpt-3.5-turbo",
        messages=[
            {"role": "system", "content": personality_prompt},
            {"role": "user", "content": user_input}
        ],
        max_tokens=500
    )
    chatbot_response = response['choices'][0]['message']['content']

    return jsonify({'response': chatbot_response})

if __name__ == '__main__':
    app.run(debug=True)
