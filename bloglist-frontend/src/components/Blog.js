import { useState } from 'react'
import React from 'react'
import PropTypes from 'prop-types'
import { likeBlog } from '../reducers/blogsReducer'

const Blog = ({ blog, handleDeleting, handleLiking }) => {

  const [visible, setVisible] = useState(false)

  const hideWhenVisible = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
    display: visible ? 'none' : ''
  }

  const showWhenVisible = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
    display: visible ? '' : 'none'
  }

  const toggleVisibility = () => {
    setVisible(!visible)
  }


  return (
    <div className="blog">
      <div style={hideWhenVisible}>
        {blog.title} {blog.author}
        <button onClick={toggleVisibility} className="show">show</button>
      </div>
      <div style={showWhenVisible} className="hiding">
        <p>{blog.title} <button onClick={toggleVisibility}>hide</button></p>
        <p>{blog.url}</p>
        <div>
          <p>Likes: {blog.likes}</p>
          <button onClick={() => handleLiking(blog, likeBlog)}>like</button>
        </div>
        <p>{blog.author}</p>
        <div>
          <button onClick={() => handleDeleting(blog)}
            style={{ backgroundColor: 'lightblue' }}>
          DELETE
          </button>
        </div>
      </div>
    </div>
  )

}

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
  handleDeleting: PropTypes.func.isRequired
}
export default Blog
