from tts import read_guided_meditation

def main():
    # Read the meditation text from the file
    with open("data/sample_meditation.txt", "r") as file:
        meditation_text = file.read()

    # Call the function to read the guided meditation
    read_guided_meditation(meditation_text)

if __name__ == "__main__":
    main()
