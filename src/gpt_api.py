import openai
from decouple import config


def generate_meditation_prompt(length_minutes, focus, method):
    openai.api_key = config("OPENAI_API_KEY")

    model = "text-davinci-003"

    tokens_per_minute = 70
    max_tokens = length_minutes * tokens_per_minute

    instructions_count = length_minutes * 2  # This ensures 2 instructions every minute

    # Reformulating the prompt for more clarity
    if not method:
        prompt_text = (
            f"Craft a meditation script for exactly {length_minutes} minute(s) focusing on {focus}. "
            f"Provide {instructions_count} main instructions at 30-second intervals, starting from 00:00. "
            f"Ensure timestamps progress correctly from 00:00, 00:30, 01:00... and so on. "
            f"Conclude the meditation by instructing to open the eyes. "
            f"Format: '00:00 - txt'. No square brackets or extraneous content or spaces btwn lines."
        )
    else:
        prompt_text = (
            f"Craft a meditation script for exactly {length_minutes} minute(s) employing the {method} technique. "
            f"Offer {instructions_count} key directives at 30-second intervals, starting from 00:00. "
            f"Ensure timestamps progress correctly from 00:00, 00:30, 01:00... and so on. "
            f"Finish the meditation by directing to open the eyes. "
            f"Format: '00:00 - txt'. Exclude any square brackets or superfluous content or spaces btwn lines."
        )

    response = openai.Completion.create(
        engine=model, prompt=prompt_text, max_tokens=max_tokens
    )

    return response.choices[0].text.strip()
