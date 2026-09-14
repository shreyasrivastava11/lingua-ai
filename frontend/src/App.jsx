import { useState, useRef, useEffect } from 'react'
import ReactMarkdown from 'react-markdown'
import './App.css'

function App() {
  const [messages, setMessages] = useState([])
  const messagesEndRef = useRef(null)
  const [input, setInput] = useState('')
  const [isThinking, setIsThinking] = useState(false)
  const [selectedLanguage, setSelectedLanguage] = useState('Auto')

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({
      behavior: 'smooth'
    })
  }, [messages])

  const languages = [
  'English',
  'हिन्दी',
  'தமிழ்',
  'తెలుగు',
  'मराठी',
  'ਪੰਜਾਬੀ',
  'Español',
  'Français',
  'Deutsch',
  '日本語'
  ]

  const getAIResponse = () => {
    if (selectedLanguage === 'हिन्दी') {
      return 'यह एक अस्थायी AI प्रतिक्रिया है।'
    }

    if (selectedLanguage === 'தமிழ்') {
      return 'இது ஒரு தற்காலிக AI பதில்.'
    }

    if (selectedLanguage === 'తెలుగు') {
      return 'ఇది తాత్కాలిక AI ప్రతిస్పందన.'
    }

    if (selectedLanguage === 'मराठी') {
      return 'हा एक तात्पुरता AI प्रतिसाद आहे.'
    }

    if (selectedLanguage === 'ਪੰਜਾਬੀ') {
      return 'ਇਹ ਇੱਕ ਅਸਥਾਈ AI ਜਵਾਬ ਹੈ।'
    }

    if (selectedLanguage === 'Español') {
      return 'Esta es una respuesta temporal de IA.'
    }

    if (selectedLanguage === 'Français') {
      return 'Ceci est une réponse temporaire de l’IA.'
    }

    if (selectedLanguage === 'Deutsch') {
      return 'Dies ist eine vorübergehende KI-Antwort.'
    }

    if (selectedLanguage === '日本語') {
      return 'これは一時的なAIの回答です。'
    }

    return 'This is a temporary AI response.'
  }

  const sendMessage = async () => {
    if (input.trim() === '') return

    const userMessage = {
      role: 'user',
      content: input
    }

    setMessages((prevMessages) => [...prevMessages, userMessage])
    setInput('')
    setIsThinking(true)

    try {
      const response = await fetch('http://localhost:8080/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          message: input,
          language: selectedLanguage,
          conversation: messages.map((message) => ({
            role: message.role,
            content: message.content
          }))
        })
      })

      const aiResponse = await response.text()

      const aiMessage = {
        role: 'ai',
        content: aiResponse
      }

      setMessages((prevMessages) => [...prevMessages, aiMessage])
    } catch (error) {
      console.error(error)

      const aiMessage = {
        role: 'ai',
        content: 'Unable to connect to the backend.'
      }

      setMessages((prevMessages) => [...prevMessages, aiMessage])
    }

    setIsThinking(false)
  }

  return (
    <div className="app">

      {/* Header */}
      <header className="chat-header">

        <div className="logo">
          <span>✦</span>
          <h1>LinguaAI</h1>
        </div>

        <button
          className="new-chat"
          onClick={() => {
            setMessages([])
            setInput('')
            setSelectedLanguage('Auto')
          }}
        >
          + New Chat
        </button>

      </header>


      <div className="app-body">

        {/* Left Language Panel */}
        <aside className="language-panel">

          <div className="ai-core">

            <div className="core-ring">
              <span>✦</span>
            </div>

            <h2>AI CORE</h2>

            <p>Language intelligence</p>

          </div>


          <div className="language-section">

            <div className="section-title">
              <span>🌐</span>
              <span>Language Mode</span>
            </div>


            {/* Auto Mode */}
            <button
              className={`language-option ${
                selectedLanguage === 'Auto' ? 'active' : ''
              }`}
              onClick={() => setSelectedLanguage('Auto')}
            >

              <div>
                <strong>Auto</strong>
                <span>Follow my language</span>
              </div>

              {selectedLanguage === 'Auto' && (
                <span className="active-dot"></span>
              )}

            </button>


            {/* Languages */}
            <div className="languages">

              {languages.map((language) => (
                <button
                  key={language}
                  className={`language-option ${
                    selectedLanguage === language ? 'active' : ''
                  }`}
                  onClick={() => setSelectedLanguage(language)}
                >

                  <span>{language}</span>

                  {selectedLanguage === language && (
                    <span className="active-dot"></span>
                  )}

                </button>
              ))}

            </div>

          </div>


          {/* Current Mode */}
          <div className="current-mode">

              <span className="status-dot"></span>

            <div>
              <strong>
                {selectedLanguage === 'Auto'
                  ? 'Auto mode'
                  : `${selectedLanguage} locked`}
              </strong>

              <p>
                {selectedLanguage === 'Auto'
                  ? 'Following your language'
                  : `Responding in ${selectedLanguage}`}
              </p>
            </div>

          </div>

        </aside>


        {/* Main Chat */}
        <main className="chat-area">

          {/* Welcome Screen */}
          {messages.length === 0 && (
            <section className="welcome">

              <div className="welcome-core">
                <span>✦</span>
              </div>

              <p className="welcome-label">
                MULTILINGUAL AI
              </p>

              <h2>
                Speak your language.
                <br />
                <span>I'll follow.</span>
              </h2>

              <p className="welcome-description">
                A conversational AI that adapts to the language
                you use, naturally.
              </p>

            </section>
          )}


          {/* Messages */}
          <div className="messages">

            {messages.map((message, index) => (
              <div
                key={index}
                className={`message ${message.role}-message`}
              >

                {message.role === 'ai' && (
                  <div className="message-header">
                    <span>✦</span>
                    <span>LinguaAI</span>
                  </div>
                )}

                <ReactMarkdown>{message.content}</ReactMarkdown>

              </div>
            ))}


            {/* Thinking */}
            {isThinking && (
              <div className="message ai-message thinking">
                <div className="message-header">
                  <span>✦</span>
                  <span>LinguaAI</span>
                </div>

                <div className="thinking-content">
                  <span>Thinking</span>
                  <div className="thinking-dots">
                    <span></span>
                    <span></span>
                    <span></span>
                  </div>
                </div>
              </div>
            )}

            <div ref={messagesEndRef}></div>

          </div>

        </main>

      </div>


      {/* Input */}
      <footer className="input-area">

        <div className="input-container">

          <input
            type="text"
            placeholder="Message LinguaAI..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !isThinking) {
                sendMessage()
              }
            }}
          />

          <button
            className="send-button"
            onClick={sendMessage}
            disabled={isThinking}
          >
            ↑
          </button>

        </div>

        <p className="input-hint">
          LinguaAI can make mistakes. Check important information.
        </p>

      </footer>

    </div>
  )
}

export default App