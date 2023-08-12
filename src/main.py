from tts import MeditationPlayer
from gpt_api import generate_meditation_prompt

def main():
    # Create an instance of the MeditationPlayer class
    player = MeditationPlayer()

    # Generate the meditation prompt using your function
    meditation_text = generate_meditation_prompt("Generate a guided meditation script with timestamps starting from 00:00. The meditation should last for 30 seconds. Each line should follow this format: '00:00 - txt'")

    print(meditation_text)
    
    # Call the method to play the guided meditation
    player.play_meditation(meditation_text)

if __name__ == "__main__":
    main()
