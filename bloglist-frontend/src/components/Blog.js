import { useState } from 'react'

const Blog = ({blog}) => {

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
  <div>
    <div style={hideWhenVisible}>
			{blog.title} {blog.author}
			<button onClick={toggleVisibility}>show</button>
		</div>
		<div style={showWhenVisible}>
			<p>{blog.title} <button onClick={toggleVisibility}>hide</button></p>
			<p>{blog.url}</p>
			<p>Likes {blog.likes}</p>
			<p>{blog.author}</p>
		</div>
  </div>  
)

}
export default Blog
