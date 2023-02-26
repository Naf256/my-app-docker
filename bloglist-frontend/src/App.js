import BlogList from './components/BlogList'
import {
  Routes,
  Route,
  Link,
  useNavigate
} from 'react-router-dom'
import User from './components/User'
import userService from './services/users'
import { useState, useEffect, useRef } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import React from 'react'
import Users from './components/Users'
import blogService from './services/blogs'
import loginService from './services/login'
import Notification from './components/Notification'
import LoginForm from './components/LoginForm'
import { initialBlogs, createBlog, likeBlog } from './reducers/blogsReducer'
import { initialComments } from './reducers/commentsReducer'
import { setUser } from './reducers/userReducer'
import { setNotify } from './reducers/notifyReducer'
import SingleBlog from './components/SingleBlog'

const App = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [users, setUsers] = useState(null)
  const blogForm = useRef()
  const notify = useSelector(state => state.notify)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  useEffect(() => {
    console.log('printing from effect')
    dispatch(initialBlogs())
    dispatch(initialComments())
    userService
      .getAll()
      .then(data => setUsers(data))
      .catch(err => {
        console.log(`could not get users from api ${err}`)
      })
    const loggedUserJSON = window.localStorage.getItem('loggedUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      blogService.setToken(user.token)
      dispatch(setUser(user))
    }
  }, [])


  const user = useSelector(state => state.user)
  const blogs = useSelector(state => state.blogs)

  const handleUsernameChange = (name) => {
    setUsername(name)
  }

  const handlePasswordChange = (pass) => {
    setPassword(pass)
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
      navigate('/')

    } catch(exeption) {
      setUsername('')
      setPassword('')
      console.log('wrong credentials')
    }
  }

  const handleLiking = (blog) => {
    dispatch(setNotify(`${blog.title} by ${blog.author} was liked`))
    dispatch(likeBlog(blog))
  }

  const handleLogout = () => {
    window.localStorage.clear()
    dispatch(setUser(null))
    navigate('/login')
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

  return (
    <div>
      <Notification message={notify} />
      {user ?
        <div>
          <p>
            <Link to='/users'>users</Link>
            <Link to='/'>blogs</Link>
            <b>{user.name} is watching</b>
            <button onClick={handleLogout}>logout</button>
          </p>
        </div>
        : null
      }
      <h2>blogs app</h2>
      <Routes>
        <Route path='/' element={<BlogList handleCreation={handleCreation} blogForm={blogForm} />} />
        <Route path='/users/:id' element={<User users={users} />} />
        <Route path='/blogs/:id' element={<SingleBlog blogs={blogs} handleLiking={handleLiking} />} />
        <Route path='/login'
          element={
            <LoginForm
              username={username}
              password={password}
              handleLogin={handleLogin}
              handleUsernameChange={handleUsernameChange}
              handlePasswordChange={handlePasswordChange}
            />
          }
        />
        <Route path='/users' element={<Users users={users} />} />
      </Routes>
    </div>
  )
}

export default App
