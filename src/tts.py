from gtts import gTTS
import time
from playsound import playsound
import os
import glob

def read_guided_meditation(meditation_text):
    
    # Clean up any existing .mp3 files from previous runs
    existing_files = glob.glob("temp_*.mp3")
    for audio_file in existing_files:
        try:
            os.remove(audio_file)
        except OSError as e:
            print(f"Error deleting {audio_file}: {e}")

    # Split the input by lines
    meditation_lines = [line for line in meditation_text.strip().split("\n") if " - " in line]

    last_timestamp = 0
    start_time = None  # To track the start of the meditation

    file_counter = 0

    # Pre-generate the first line
    _, content = meditation_lines[0].split(" - ")
    filename_next = f"temp_{file_counter}.mp3"
    gTTS(text=content, lang='en').save(filename_next)

    for i in range(len(meditation_lines)):
        line = meditation_lines[i]
        
        timestamp_str, content = line.split(" - ")
        minutes, seconds = map(int, timestamp_str.split(":"))
        timestamp = minutes * 60 + seconds
        
        filename_current = filename_next
        file_counter += 1

        # Generate next line if it exists
        if i + 1 < len(meditation_lines):
            _, next_content = meditation_lines[i + 1].split(" - ")
            filename_next = f"temp_{file_counter}.mp3"
            gTTS(text=next_content, lang='en').save(filename_next)

        # Start the timer if not started
        if not start_time:
            start_time = time.time()

        # Check internal timer against timestamp
        elapsed_time = time.time() - start_time
        while elapsed_time < timestamp:
            time.sleep(0.1)
            elapsed_time = time.time() - start_time

        print(f"Internal Timer: {elapsed_time:.2f} seconds")

        # Play the sound
        playsound(filename_current)
        os.remove(filename_current)

        last_timestamp = timestamp

    end_time = time.time()
    duration = end_time - start_time
    print(f"Meditation took {duration:.2f} seconds.")


