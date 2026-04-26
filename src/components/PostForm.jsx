import { useState } from 'react'
import { supabase } from '../lib/supabaseClient'

const MAX_CHARS = 280

export default function PostForm({ session, onPostCreated }) {
  const [content, setContent] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  async function handleSubmit(e) {
    e.preventDefault()
    if (!content.trim()) return
    setLoading(true)
    setError(null)

    const { error } = await supabase.from('posts').insert({
      content: content.trim(),
      user_id: session.user.id,
    })

    if (error) {
      setError(error.message)
    } else {
      setContent('')
      onPostCreated()
    }
    setLoading(false)
  }

  const remaining = MAX_CHARS - content.length

  return (
    <form onSubmit={handleSubmit} style={{ marginBottom: 24, borderBottom: '1px solid #ccc', paddingBottom: 16 }}>
      <textarea
        value={content}
        onChange={e => setContent(e.target.value)}
        placeholder="What's happening?"
        maxLength={MAX_CHARS}
        rows={3}
        style={{ width: '100%', padding: 8, fontSize: 16, boxSizing: 'border-box', resize: 'vertical' }}
      />
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 8 }}>
        <span style={{ color: remaining < 20 ? 'red' : '#666', fontSize: 13 }}>{remaining}</span>
        <button type="submit" disabled={loading || !content.trim()} style={{ padding: '8px 20px', cursor: 'pointer' }}>
          {loading ? 'Posting...' : 'Post'}
        </button>
      </div>
      {error && <p style={{ color: 'red', margin: '4px 0', fontSize: 13 }}>{error}</p>}
    </form>
  )
}
