import { useState, useEffect, useRef } from 'react'
import React from 'react'
import Blog from './components/Blog'
import Togglable from './components/Togglable'
import BlogForm from './components/BlogForm'
import blogService from './services/blogs'
import loginService from './services/login'
import Notification from './components/Notification'
import LoginForm from './components/LoginForm'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)
  const [notify, setNotify] = useState('')
  const blogForm = useRef()

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs(blogs)
    )
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
    }
  }, [])

  const handleUsernameChange = (name) => {
    setUsername(name)
  }

  const handlePasswordChange = (pass) => {
    setPassword(pass)
  }

  const handleLiking = (blog, callback) => {
    callback(blog)
  }

  const handleLogin = async (e) => {
    e.preventDefault()
    try {
      const user = await loginService.login({
        username, password,
      })
      window.localStorage.setItem(
        'loggedUser', JSON.stringify(user)
      )
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')

    } catch(exeption) {
      setUsername('')
      setPassword('')
      setErrorMessage('wrong credentials')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const handleDeleting = async (blog) => {
    if (window.confirm(`Remove blog ${blog.title}`)) {
      try {
        await blogService.deleteBlog(blog.id)
        const newBlogs = blogs.filter(b => b.id !== blog.id)
        setBlogs(newBlogs)
        console.log('successfully deleted the blog')
      } catch(exeption) {
        console.log('couldnot delete the blog')
      }
    }
    return
  }

  const handleLogout = () => {
    window.localStorage.clear()
    setUser(null)
  }

  const handleCreation = async (blogObj) => {
    try {
      blogForm.current.toggleVisibility()
      const blog = await blogService.create(blogObj)
      setBlogs(blogs.concat(blog))
      setNotify(`a new blog ${blog.title} by ${blog.author} was added`)

    } catch(exeption) {
      console.log('could not create the blog')
    }
  }

  const compareBlogs = (first, second) => {
    return second.likes - first.likes
  }

  const blogform = () => {
    blogs.sort(compareBlogs)
    return (
      <div id="main">
        <h2>blogs</h2>
        <Notification message={notify} />
        <h3>{user.name} is watching
          <button onClick={handleLogout}>logout</button>
        </h3>
        <Togglable buttonLable='create new blog' ref={blogForm}>
          <BlogForm handleCreation={handleCreation} />
        </Togglable>
        {
          blogs.map(blog =>
            <Blog
              key={blog.id}
              blog={blog}
              handleDeleting={handleDeleting}
              handleLiking={handleLiking}
            />
          )
        }
      </div>
    )
  }


  return (
    <div>
      <Notification message={errorMessage} />

      {user === null
        ? <LoginForm
          username={username}
          password={password}
          handleLogin={handleLogin}
          handleUsernameChange={handleUsernameChange}
          handlePasswordChange={handlePasswordChange}
        />
        : blogform()}

    </div>
  )
}

export default App
