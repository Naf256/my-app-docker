import { useState } from 'react'

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
					onChange={({target}) => setTitle(target.value)}
				/>
				Author:
				<input
					value={author}
					name='Author'	
					type='text'
					onChange={({target}) => setAuthor(target.value)}
				/>
				Url:
				<input
					value={url}
					name='Url'	
					type='text'
					onChange={({target}) => setUrl(target.value)}
				/>
				<input type="submit" value="create" />
			</form>
		</div>
	)
}

export default BlogForm
