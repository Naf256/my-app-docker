import { useState, useEffect, useRef } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import React from 'react'
import Blog from './components/Blog'
import Togglable from './components/Togglable'
import BlogForm from './components/BlogForm'
import blogService from './services/blogs'
import loginService from './services/login'
import Notification from './components/Notification'
import LoginForm from './components/LoginForm'
import { initialBlogs, createBlog, deleteBlog } from './reducers/blogsReducer'
import { setUser } from './reducers/userReducer'
import { setNotify } from './reducers/notifyReducer'

const App = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [errorMessage, setErrorMessage] = useState(null)
  const blogForm = useRef()
  const notify = useSelector(state => state.notify)
  const blogs = useSelector(state => state.blogs)
  const user = useSelector(state => state.user)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(initialBlogs())
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      blogService.setToken(user.token)
      dispatch(setUser(user))
    }
  }, [])

  const handleUsernameChange = (name) => {
    setUsername(name)
  }

  const handlePasswordChange = (pass) => {
    setPassword(pass)
  }

  const handleLiking = (blog, callback) => {
    dispatch(callback(blog))
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
      dispatch(setUser(user))
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
      dispatch(deleteBlog(blog))
      dispatch(setNotify(`${blog.title} by ${blog.author} was deleted`))
    }
    return
  }

  const handleLogout = () => {
    window.localStorage.clear()
    dispatch(setUser(null))
  }

  const handleCreation = async (blogObj) => {
    try {
      blogForm.current.toggleVisibility()
      dispatch(createBlog(blogObj))
      dispatch(setNotify(`a new blog ${blogObj.title} by ${blogObj.author} was added`))

    } catch(exeption) {
      console.log('could not create the blog')
    }
  }

  const blogform = () => {
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
        {blogs ?
          blogs.map(blog =>
            <Blog
              key={blog.id}
              blog={blog}
              handleDeleting={handleDeleting}
              handleLiking={handleLiking}
            />
          )
          : null
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
