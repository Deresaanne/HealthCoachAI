import { useState, FormEvent } from 'react'

import { getHealthCoach } from './services/healthcoach.services'

import './App.css'

function App() {
  const [content, setContent] = useState('')
  const [message, setMessage] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setLoading(true)
    getHealthCoach(message).then((response) => {
      setLoading(false)
      setContent(response)
      setMessage('')
    }).catch(() => {
      setLoading(false)
      setContent('Oopss, something went wrong. Please try again later.')
    });
  }

  return (
    <main>
      <h1>Healt Coach Advice</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="message">Your goal:</label>
        <input
          type="text"
          id="message"
          name="message"
          value={message}
          onChange={(event) => setMessage(event.target.value)}
        />
        <br />

        <button type="submit" disabled={!message || loading}>
          Send
        </button>
      </form>

      {(loading || content) && (
        <p>{loading ? (
          <span className="loader"></span>
        ): content}</p>
      )}
    </main>
  )
}

export default App
