import { useParams } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { createComment } from '../reducers/commentsReducer'
import { useState } from 'react'

const SingleBlog = ({ blogs, handleLiking }) => {
  const [input, setInput] = useState(null)
  const dispatch = useDispatch()
  const id = useParams().id
  const blog = blogs.find(b => b.id === id)
  const comments = useSelector(state =>
    state.comments.filter(c => c.blog === blog.id)
  )

  const handleSubmit = async (e) => {
    e.preventDefault()
    await dispatch(createComment(id, input))
    setInput('')
  }

  return (
    <div>
      <div>
        <h2>{blog.title}</h2>
        <p>{blog.url}</p>
        <p>{blog.likes} <button onClick={() => handleLiking(blog)}>like</button></p>
      </div>
      <div>
        <h2>Comments</h2>
        {
          comments ?
            <ul>
              {
                comments.map((c, i) => <li key={i}>{c.comment}</li>)
              }
            </ul> :
            null
        }
        <form onSubmit={handleSubmit}>
          <input value={input} onChange={(e) => setInput(e.target.value)} />
          <button>comment</button>
        </form>
      </div>
    </div>
  )

}

export default SingleBlog
