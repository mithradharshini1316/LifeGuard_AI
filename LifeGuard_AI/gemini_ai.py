from groq import Groq
import os
from dotenv import load_dotenv

load_dotenv()

client = Groq(
    api_key=os.getenv("GROQ_API_KEY")
)


def ask_gemini(message):

    response = client.chat.completions.create(
        model="llama-3.1-8b-instant",
        messages=[
            {
                "role": "system",
                "content": "You are LifeGuard AI, a helpful health assistant. Give simple and safe health information."
            },
            {
                "role": "user",
                "content": message
            }
        ]
    )

    return response.choices[0].message.content