import { useState, useEffect } from 'react'
import { supabase } from '../lib/supabaseClient'
import PostForm from '../components/PostForm'
import PostList from '../components/PostList'

export default function HomePage({ session }) {
  const [posts, setPosts] = useState([])

  useEffect(() => {
    fetchPosts()
  }, [])

  async function fetchPosts() {
    const { data, error } = await supabase
      .from('posts')
      .select('*, profiles(username)')
      .order('created_at', { ascending: false })
      .limit(50)

    if (!error) setPosts(data)
  }

  async function handleSignOut() {
    await supabase.auth.signOut()
  }

  return (
    <div style={{ maxWidth: 600, margin: '0 auto', padding: 20 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
        <h1 style={{ margin: 0 }}>Home</h1>
        <button onClick={handleSignOut} style={{ padding: '6px 12px', cursor: 'pointer' }}>Sign Out</button>
      </div>
      <PostForm session={session} onPostCreated={fetchPosts} />
      <PostList posts={posts} />
    </div>
  )
}
