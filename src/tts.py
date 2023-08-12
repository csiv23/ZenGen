from gtts import gTTS
import time
from playsound import playsound
import os
import glob


class MeditationPlayer:
    def __init__(self):
        self.last_timestamp = 0
        self.start_time = None
        self.file_counter = 0

    def _cleanup_audio_files(self):
        """Remove temporary audio files."""
        existing_files = glob.glob("temp_*.mp3")
        for audio_file in existing_files:
            try:
                os.remove(audio_file)
            except OSError as e:
                print(f"Error deleting {audio_file}: {e}")

    def _split_lines(self, meditation_text):
        """Split the meditation text into actionable lines."""
        return [line for line in meditation_text.strip().split("\n") if " - " in line]

    def _get_timestamp(self, line):
        """Extract the timestamp from a line."""
        timestamp_str, _ = line.split(" - ")
        minutes, seconds = map(int, timestamp_str.split(":"))
        return minutes * 60 + seconds

    def _generate_audio(self, content):
        """Generate audio file from text."""
        filename = f"temp_{self.file_counter}.mp3"
        gTTS(text=content, lang='en').save(filename)
        self.file_counter += 1
        return filename

    def play_meditation(self, meditation_text):
        self._cleanup_audio_files()
        meditation_lines = self._split_lines(meditation_text)

        # Pre-generate the first line
        _, content = meditation_lines[0].split(" - ")
        filename_next = self._generate_audio(content)

        for i in range(len(meditation_lines)):
            line = meditation_lines[i]
            timestamp = self._get_timestamp(line)
            _, content = line.split(" - ")

            filename_current = filename_next

            # Generate next line if it exists
            if i + 1 < len(meditation_lines):
                _, next_content = meditation_lines[i + 1].split(" - ")
                filename_next = self._generate_audio(next_content)

            # Start the timer if not started
            if not self.start_time:
                self.start_time = time.time()

            # Check internal timer against timestamp
            elapsed_time = time.time() - self.start_time
            while elapsed_time < timestamp:
                time.sleep(0.1)
                elapsed_time = time.time() - self.start_time

            print(f"Internal Timer: {elapsed_time:.2f} seconds")

            # Play the sound
            playsound(filename_current)
            os.remove(filename_current)

            self.last_timestamp = timestamp

        end_time = time.time()
        duration = end_time - self.start_time
        print(f"Meditation took {duration:.2f} seconds.")



