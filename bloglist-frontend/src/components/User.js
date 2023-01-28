import { useParams } from 'react-router-dom'

const User = ({ users }) => {
  const id = useParams().id
  const user = users.find(u => u.id === id)
  if (!user) {
    return null
  }
  return (
    <>
      <h2>{}</h2>
      <h3>added blogs</h3>
      <ul>
        {user.blogs.map((blog, i) =>
          <li key={i}>{blog.title}</li>
        )}
      </ul>
    </>
  )
}

export default User
