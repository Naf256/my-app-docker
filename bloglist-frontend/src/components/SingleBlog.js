import { useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
//import { likeBlog } from './../reducers/blogsReducer'

const SingleBlog = ({ blogs, handleLiking }) => {
  const id = useParams().id
  const blog = blogs.find(b => b.id === id)
  console.log(blog)
  const comments = useSelector(state =>
    state.comments.filter(c => c.blog === blog.id)
  )

  console.log(comments)

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
      </div>
    </div>
  )

}

export default SingleBlog
