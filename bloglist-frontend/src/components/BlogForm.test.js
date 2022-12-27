import React from 'react'
import { screen, render } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import userEvent from '@testing-library/user-event'
import BlogForm from './BlogForm'

describe('<BlogForm />', () => {
  let container, handleCreation
  beforeEach(() => {
    handleCreation = jest.fn()
    container = render(
      <BlogForm
        handleCreation={handleCreation}
      />
    ).container
  })

  test('creating a blogs works', async () => {
    const createButton = screen.getByDisplayValue('create')
    const title = container.querySelector('.title')
    const url = container.querySelector('.url')
    const author = container.querySelector('.author')
    const user = userEvent.setup()

    await user.type(title, 'khub sundor')
    await user.type(url, 'https://abc.com')
    await user.type(author, 'kaba bhi')
    await user.click(createButton)

    console.log(handleCreation.mock.calls)
    expect(handleCreation.mock.calls).toHaveLength(1)
    expect(handleCreation.mock.calls[0][0].title).toBe('khub sundor')
    expect(handleCreation.mock.calls[0][0].url).toBe('https://abc.com')
    expect(handleCreation.mock.calls[0][0].author).toBe('kaba bhi')
  })
})
