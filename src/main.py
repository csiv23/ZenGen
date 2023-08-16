from .tts import MeditationPlayer
from .gpt_api import generate_meditation_prompt


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
            "other",  # Added "other" option
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
    length_choice = input("Enter the desired length of meditation (in minutes): ")

    # Get user's selected focus and methods
    focus, method = get_multiple_choices("focus"), get_multiple_choices("method")

    return length_choice, focus, method


def generate_meditation_text(length_choice, focus, method):
    """
    Generate a meditation text based on user inputs.
    """
    meditation_text = generate_meditation_prompt(length_choice, focus, method)
    return meditation_text
