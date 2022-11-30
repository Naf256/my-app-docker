import { useState } from 'react'
import React from 'react'
import blogService from '../services/blogs'
import PropTypes from 'prop-types'

const Blog = ({ blog, handleDeleting }) => {

  const [visible, setVisible] = useState(false)
  const [likes, setLikes] = useState(blog.likes)


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

  const handleLiking = async (blogObj) => {
    try {
      setLikes(likes + 1)
      console.log(`counting likes ${likes}`)
      const newBlog = {
        ...blogObj,
        user: blogObj.user.id,
        likes: likes + 1,
      }

      await blogService.like(newBlog)
    } catch(exeption) {
      console.log('cannot like the blog for some reason')
    }
    return
  }


  return (
    <div>
      <div style={hideWhenVisible}>
        {blog.title} {blog.author}
        <button onClick={toggleVisibility}>show</button>
      </div>
      <div style={showWhenVisible}>
        <p>{blog.title} <button onClick={toggleVisibility}>hide</button></p>
        <p>{blog.url}</p>
        <div>
          <p>Likes: {likes}</p>
          <button onClick={() => handleLiking(blog)}>like</button>
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
