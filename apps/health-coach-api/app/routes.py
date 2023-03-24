from flask import request, jsonify
from os import environ
import openai

from app import app

@app.route('/api/v1/openai-bridge', methods=['GET'])
def openai_bridge():
  text = request.args.get('text')

  chat_gpt_response = openai.ChatCompletion.create(
    model="gpt-3.5-turbo",
    messages=[
      {"role": "system", "content": "Respond with only wrong answers"},
      {"role": "user", "content": text},
    ]
  )

  return jsonify(chat_gpt_response.choices[0].message.content)

@app.route('/')
@app.route('/index')
def index():
  return environ.get("OPENAI_API_KEY")
