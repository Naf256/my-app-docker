import { useSelector } from 'react-redux'
import BlogForm from './BlogForm'
import { useNavigate } from 'react-router-dom'
import Togglable from './Togglable'
import { Link } from 'react-router-dom'

const BlogList = ({ handleCreation, blogForm }) => {
  const hideWhenVisible = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
  }
  const blogs = useSelector(state => state.blogs)
  const user = useSelector(state => state.user)
  const navigate = useNavigate()

  if (!user) {
    return navigate('/login')
  } else {
    return (
      <div>
        <Togglable buttonLable='create new blog' ref={blogForm}>
          <BlogForm handleCreation={handleCreation} />
        </Togglable>
        {blogs ?
          blogs.map((blog, i) =>
            <div key={i} style={hideWhenVisible}>
              <Link to={`/blogs/${blog.id}`}>{blog.title} {blog.author}</Link>
            </div>
          )
          : null
        }
      </div>
    )

  }

}

export default BlogList
