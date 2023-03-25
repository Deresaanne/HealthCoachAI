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
      {"role": "system", "content": "You should answer a workout plan based on the user's goals and health conditions."},
      {"role": "system", "content": "The user health conditions are: is 1.7m tall, weighs 55kg, has 23 years old, has a BMI of 19.1"},
      {"role": "system", "content": "You should deatail the workout plan and explain the benefits of each exercise."},
      {"role": "user", "content": text},
    ]
  )

  return jsonify(chat_gpt_response.choices[0].message)

@app.route('/')
@app.route('/index')
def index():
  return "Hello, World!"
