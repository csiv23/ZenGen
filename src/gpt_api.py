import openai
from decouple import config

def generate_meditation_prompt(prompt):
    openai.api_key = config("OPENAI_API_KEY")
    
    model="text-davinci-003"

    response = openai.Completion.create(engine=model, prompt=prompt, max_tokens=250)
    
    return response.choices[0].text.strip()
