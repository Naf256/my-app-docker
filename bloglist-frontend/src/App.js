import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import Togglable from './components/Togglable'
import BlogForm from './components/BlogForm'
import blogService from './services/blogs'
import loginService from './services/login'
import Notification from './components/Notification'

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

	const loginform = () => {
		return (
			<div>
				<h2>Login to application</h2>
				<form onSubmit={handleLogin}>
					username
					<input 
						value={username} 
						type="text"
						name="Username"
						onChange={({ target }) => setUsername(target.value)} 
					/>

					password 
					<input 
						value={password} 
						name="Password"
						type="password"
						onChange={({ target }) => setPassword(target.value)} 
					/>
					<button type="submit">login</button>
				</form>
			</div>
		)
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
			<div>
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
					/>
				)}
			</div>
		)
	}

  return (
    <div>
			<Notification message={errorMessage} />

		  {user === null
			? loginform()
			: blogform()}

    </div>
  )
}

export default App
