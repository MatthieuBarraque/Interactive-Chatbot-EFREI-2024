from flask import Flask, render_template, request, jsonify
import openai

app = Flask(__name__)

# Fonction pour obtenir la clé API d'OpenAI depuis un fichier
def get_api_key_from_file():
    with open('C:\\Users\\matth\\OneDrive\\Cours-EFREI\\Challenge_Web\\Web_Project-EFREI\\chatbot\\key.txt', 'r') as file:
        api_key = file.read().strip()
    return api_key

# Initialisation de la clé API d'OpenAI
openai.api_key = get_api_key_from_file()

# Page d'accueil avec le formulaire
@app.route('/ma-page')
def index():
    return render_template('index.html')

# Route pour gérer les interactions avec le chatbot
@app.route('/chatbot', methods=['POST'])
def chat_with_gpt4():
    data = request.get_json()
    user_input = data.get('user_input')

    if user_input is None:
        return jsonify({'response': "Erreur : aucune entrée utilisateur fournie."})

    if user_input.lower() == 'exit':
        return jsonify({'response': "Au revoir!"})

    with open('C:\\Users\\matth\\OneDrive\\Cours-EFREI\\Challenge_Web\\Web_Project-EFREI\\chatbot\\prompt.txt', 'r') as file:
        personality_prompt = file.read().strip()

    response = openai.Completion.create(
        engine="text-davinci-003",
        prompt=f"{personality_prompt}\n\nUtilisateur: {user_input}\nD3sir3:",
        max_tokens=500,
    )
    chatbot_response = response.choices[0].text.strip()

    return jsonify({'response': chatbot_response})

if __name__ == '__main__':
    app.run(debug=True)
