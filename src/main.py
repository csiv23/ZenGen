from tts import MeditationPlayer

def main():
    # Create an instance of the MeditationPlayer class
    player = MeditationPlayer()

    # Read the meditation text from the file
    with open("data/sample_meditation.txt", "r") as file:
        meditation_text = file.read()

    # Call the method to play the guided meditation
    player.play_meditation(meditation_text)

if __name__ == "__main__":
    main()
