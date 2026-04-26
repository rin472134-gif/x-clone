export default function PostList({ posts }) {
  if (posts.length === 0) {
    return <p style={{ color: '#888' }}>No posts yet. Be the first!</p>
  }

  return (
    <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
      {posts.map(post => (
        <li key={post.id} style={{ borderBottom: '1px solid #eee', paddingBottom: 12, marginBottom: 12 }}>
          <strong style={{ marginRight: 8 }}>@{post.profiles?.username ?? 'unknown'}</strong>
          <span style={{ color: '#888', fontSize: 12 }}>
            {new Date(post.created_at).toLocaleString()}
          </span>
          <p style={{ margin: '6px 0 0', whiteSpace: 'pre-wrap' }}>{post.content}</p>
        </li>
      ))}
    </ul>
  )
}
