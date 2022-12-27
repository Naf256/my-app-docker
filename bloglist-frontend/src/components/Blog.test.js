import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'

describe('<Blog />', () => {
  let container, handleDeleting, handleLiking
  const blog = {
    title: 'life',
    author: 'carl jung',
    url: 'https://google.com',
    likes: 4,
  }
  beforeEach(() => {
    handleDeleting = jest.fn()
    handleLiking = jest.fn()
    container = render(
      <Blog blog={blog}
      handleDeleting={handleDeleting}
      handleLiking={handleLiking}
      />).container
  })

  test('blog does not render likes and url at first', async () => {

    const titles = screen.getAllByText('life')
    expect(titles[0]).not.toHaveStyle('display: none')

    const likes = container.querySelector('.hiding')
    expect(likes).toHaveStyle('display: none')
  })
  
  test('clicking the button shows details', async () => {
    const hiding = container.querySelector('.hiding')
    expect(hiding).toHaveStyle('display: none')

    const showButton = screen.getByText('show')
    const user = userEvent.setup()
    await user.click(showButton)
    expect(hiding).not.toHaveStyle('display: none')
  })

  test('clicking like button works', async () => {
    const likeButton = screen.getByText('like')
    const user = userEvent.setup()
    await user.click(likeButton)

    expect(handleLiking.mock.calls).toHaveLength(1)

  })
})

