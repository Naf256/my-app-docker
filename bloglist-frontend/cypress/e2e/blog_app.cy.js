describe('blog_app', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    const user = {
      username: 'tokyoRamen',
      name: 'fahim',
      password: 'thisiscs50',
    }
    cy.request('POST', 'http://localhost:3003/api/users', user)
    cy.visit('http://localhost:3000')
  })

  it('a blog can be deleted', function() {
    cy.get('#username').type('tokyoRamen')
    cy.get('#password').type('thisiscs50')
    cy.contains('login').click()

    cy.contains('create new blog').click()
    cy.get('.title').type('first blog')
    cy.get('.author').type('kareem')
    cy.get('.url').type('https://wtf.com')
    cy.get('#create').click()

    cy.contains('show').click()
    cy.contains('DELETE').click()
    cy.visit('http://localhost:3000')
    cy.get('#main')
      .should('not.contain', 'first blog')
  })

  it('login form is shown', function() {
    cy.get('#username')
    cy.get('#password')
    cy.contains('login')
  })

  describe('Login', function() {
    it('succeeds with correct credentials', function() {
      cy.login({ username: 'tokyoRamen', password: 'thisiscs50' })
      cy.contains('fahim is watching')
    })

    it('fails with wrong credentials', function() {
      cy.get('#username').type('iamhere')
      cy.get('#password').type('wtf am i')
      cy.contains('login').click()
      cy.contains('wrong credentials')
    })
  })
  
  describe('when logged in', function() {
    beforeEach(function() {
      cy.login({ username: 'tokyoRamen', password: 'thisiscs50' })
    })

    describe('when there are multiple blogs', function() {
      beforeEach(function() {
      cy.createBlog({
        title: 'second most liked blog',
        url: 'https://wtf.com',
        author: 'kareem',
        likes: 5,
      })
      cy.createBlog({
        title: 'most liked blog',
        url: 'https://wtf.com',
        author: 'kareem',
        likes: 7,
      })
      cy.createBlog({
        title: 'third most liked blog',
        url: 'https://wtf.com',
        author: 'kareem',
        likes: 3,
      })
      })

      it('blogs are ordered by likes', function() {
        cy.get('.blog')
          .eq(0)
          .should('contain', 'most liked blog')
        cy.get('.blog')
          .eq(1)
          .should('contain', 'second most liked blog')
      })
    })
    it('A blog can be created', function() {
      cy.createBlog({
        title: 'first blog',
        url: 'https://wtf.com',
        author: 'kareem',
        likes: 0,
      })

    })

    describe('when there is a blog', function() {
      beforeEach(function() {
      cy.createBlog({
        title: 'first blog',
        url: 'https://wtf.com',
        author: 'kareem',
        likes: 0,
      })
      })
      it('a blog can be liked', function() {
        cy.contains('show').click()
        cy.contains('like').click()
        cy.contains('1')
      })

    })
  })
})
