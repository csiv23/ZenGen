from tts import MeditationPlayer
from gpt_api import generate_meditation_prompt

def get_multiple_choices(category, max_choices=3):
    print(f"\nSelect up to {max_choices} {category}s for the meditation (e.g., 1,2,3):")
    choices = []

    if category == "focus":
        choices = [
            "stress",
            "relationships",
            "stoicism",
            "buddhism",
            "college stress",
            "career transitions",
            "parenting",
            "digital detox",
            "existentialism",
            "other"   # Added "other" option
        ]
    elif category == "method":
        choices = ["body scan", "visualization", "breathing", "guided journey", "none"]

    for i, choice in enumerate(choices, 1):
        print(f"{i}. {choice}")

    user_choices = input("Enter your choices: ").split(",")[:max_choices]
    selected = [choices[int(ch) - 1] for ch in user_choices]

    # If user selects "other" for focus, get the custom focus input
    if "other" in selected:
        custom_focus = input("Please specify your other focus: ")
        selected[selected.index("other")] = custom_focus

    # If user selects "none" for method, just leave it empty
    if "none" in selected:
        return ", ".join(selected[:-1]), ""

    return ", ".join(selected)


def get_user_input():
    # Get meditation length
    length_minutes = int(input("Enter the desired length of meditation (in minutes): "))
    length_seconds = length_minutes * 60

    # Get user's selected focus and methods
    focus, method = get_multiple_choices("focus"), get_multiple_choices("method")

    return length_seconds, focus, method


def main():
    # Create an instance of the MeditationPlayer class
    player = MeditationPlayer()

    length_seconds, focus, method = get_user_input()

    # Check if a method was selected
    method_str = f"using the {method} method, " if method else ""

    # Generate the meditation prompt using your function
    meditation_text = generate_meditation_prompt(
        f"Generate a concise guided meditation script that STRICTLY lasts for {length_seconds} seconds {method_str}"
        f"focusing on {focus}. Start from 00:00. Each line should follow this format: '00:00 - txt'. No square brackets"
    )

    print(meditation_text)

    # Call the method to play the guided meditation
    player.play_meditation(meditation_text)


if __name__ == "__main__":
    main()
