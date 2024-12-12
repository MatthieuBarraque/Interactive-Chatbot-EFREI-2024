import openai

def get_api_key_from_file():
    with open('chatbot\\key.txt', 'r') as file:
        #remplacer le chemin par le votre
        api_key = file.read().strip()
    return api_key

def chat_with_gpt4():

    openai.api_key = get_api_key_from_file()

    print("Tapez 'exit' pour quitter.\n")

    with open('chatbot\\prompt.txt', 'r') as file:
        #remplacer le chemin par le votre
        personality_prompt = file.read().strip()

    while True:
        user_input = input("Vous: ")
        if user_input.lower() == 'exit':
            print("D3sir3: Au revoir!")
            break

        response = openai.Completion.create(
            engine="text-davinci-003",  # Using text-davinci-002 
            prompt=f"{personality_prompt}\n\nUtilisateur: {user_input}\nD3sir3:",
            max_tokens=500,
        )
        chatbot_response = response.choices[0].text.strip()

        print("D3sir3:", chatbot_response)
