import time
import pyttsx3


class MeditationPlayer:
    def __init__(self):
        self.last_timestamp = 0
        self.start_time = None
        self.engine = pyttsx3.init()
        self.adjust_rate_volume()
    
    def adjust_rate_volume(self):
        # Adjust rate
        rate = self.engine.getProperty('rate')
        new_rate = rate - 50  
        self.engine.setProperty('rate', new_rate)

        # Adjust volume
        volume = self.engine.getProperty('volume')
        new_volume = volume - 0.2 
        self.engine.setProperty('volume', new_volume)

    def _split_lines(self, meditation_text):
        """Split the meditation text into actionable lines."""
        return [line for line in meditation_text.strip().split("\n") if " - " in line]

    def _get_timestamp(self, line):
        """Extract the timestamp from a line."""
        timestamp_str, _ = line.split(" - ")
        minutes, seconds = map(int, timestamp_str.split(":"))
        return minutes * 60 + seconds

    def play_meditation(self, meditation_text):
        meditation_lines = self._split_lines(meditation_text)

        for i in range(len(meditation_lines)):
            line = meditation_lines[i]
            timestamp = self._get_timestamp(line)
            _, content = line.split(" - ")

            # Start the timer if not started
            if not self.start_time:
                self.start_time = time.time()

            # Check internal timer against timestamp
            elapsed_time = time.time() - self.start_time
            while elapsed_time < timestamp:
                time.sleep(0.1)
                elapsed_time = time.time() - self.start_time

            print(f"Internal Timer: {elapsed_time:.2f} seconds")

            # Use pyttsx3 to say the content
            self.engine.say(content)
            self.engine.runAndWait()

            self.last_timestamp = timestamp

        end_time = time.time()
        duration = end_time - self.start_time
        print(f"Meditation took {duration:.2f} seconds.")

