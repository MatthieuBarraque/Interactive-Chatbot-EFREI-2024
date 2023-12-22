import sys
import time

from loading import loading_animation
from header import print_header
from gpt import chat_with_gpt4

def user_choice_menu():
    while True:
        print("Menu de sélection:")
        print("1. Chatbot Mod")
        user_input = input("Faites votre choix (1): ")

        if user_input == "1":
            print("Vous avez choisi Chatbot Mod.")
            chat_with_gpt4()
        else:
            print("Choix invalide. Veuillez entrer 1.")