import time
import sys
import os

#PierreLouis

from loading import loading_animation
from header import print_header
from choice import user_choice_menu

print("Chargement en cours...")
loading_animation()
print("\nChargement terminé!")
time.sleep(1)
if os.name == 'posix':
    os.system('clear')
elif os.name == 'nt':
    os.system('cls')

print_header()
user_choice_menu()