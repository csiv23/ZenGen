import pyttsx3
import time

def read_guided_meditation(meditation_text):
    # Initialize the TTS engine
    engine = pyttsx3.init()
    
    # Split the input by lines
    meditation_lines = meditation_text.strip().split("\n")

    last_timestamp = 0
    start_time = None  # To track the start of the meditation

    # Iterate through the meditation lines two at a time (timestamp + content)
    for i in range(0, len(meditation_lines), 2):

        # If the current line has a timestamp format
        if ":" in meditation_lines[i]:
            timestamp_str = meditation_lines[i]
            content = meditation_lines[i + 1]

            minutes, seconds = map(int, timestamp_str.split(":"))
            timestamp = minutes * 60 + seconds

            # Calculate delay
            sleep_time = timestamp - last_timestamp
            if sleep_time > 0:
                time.sleep(sleep_time)

            # Start the timer just before reading the first line
            if start_time is None:
                start_time = time.time()

            # Print the internal timer time right before the TTS voice speaks
            elapsed_time = time.time() - start_time
            print(f"Internal Timer: {elapsed_time:.2f} seconds")

            # Read out the content
            time.sleep(0.2)  # Introducing a small delay here
            engine.say(content)
            engine.runAndWait()

            # Update last_timestamp
            last_timestamp = timestamp

        # Read any lines without a timestamp (concluding lines or other instructions)
        else:
            content = meditation_lines[i]
            # Print the internal timer time right before the TTS voice speaks
            elapsed_time = time.time() - start_time
            print(f"Internal Timer: {elapsed_time:.2f} seconds")
            
            time.sleep(0.2)  # Introducing a small delay here
            engine.say(content)
            engine.runAndWait()

    # Calculate and print the total duration
    end_time = time.time()
    duration = end_time - start_time
    print(f"Meditation took {duration:.2f} seconds.")
