import { useState  } from 'react'
import React from 'react'
import PropTypes from 'prop-types'

const BlogForm = ({ handleCreation }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const addBlog = (e) => {
    e.preventDefault()

    handleCreation({
      title: title,
      author: author,
      url: url,
    })

    setTitle('')
    setAuthor('')
    setUrl('')
  }

  return (
    <div>
      <form onSubmit={addBlog}>
        Title:
        <input
          value={title}
          name='Title'
          type='text'
          onChange={({ target }) => setTitle(target.value)}
          className="title"
        />
        Author:
        <input
          value={author}
          name='Author'
          type='text'
          onChange={({ target }) => setAuthor(target.value)}
          className="author"
        />
        Url:
        <input
          value={url}
          name='Url'
          type='text'
          onChange={({ target }) => setUrl(target.value)}
          className="url"
        />
        <input type="submit" value="create" />
      </form>
    </div>
  )
}

BlogForm.propTypes = {
  handleCreation: PropTypes.func.isRequired
}

export default BlogForm
