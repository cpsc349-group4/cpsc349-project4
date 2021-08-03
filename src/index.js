import './tailwind.css'
import './magnifying-glass.png'

import * as mockroblog from './mockroblog.js'
window.mockroblog = mockroblog

const searchForm = document.querySelector('#search')
const keyword = document.querySelector('#keyword')

const resultDiv = document.querySelector('#results')
const result = document.querySelector('#result-value')

async function search (term = '') {
  const query = encodeURIComponent(`%%${term}%%`)
  const response = await fetch(`http://localhost:5000/posts/?text=${query}`)
  const data = await response.json()

  result.textContent = JSON.stringify(data.resources, null, 2)
  resultDiv.hidden = !term
}
if (searchForm != null) {
  searchForm.addEventListener('submit', (event) => {
    event.preventDefault()
  })
}

if (keyword != null) {
  keyword.addEventListener('input', (event) => {
    search(keyword.value)
  })
}

// display public timeline
const publicTimeline = mockroblog.getPublicTimeline()
const homeTimeline = mockroblog.getHomeTimeline(window.sessionStorage.getItem('user'))
const userTimeline = mockroblog.getUserTimeline(window.sessionStorage.getItem('user'))
const curTimeLine = mockroblog.getUserTimeline(window.sessionStorage.getItem('usersearch'))

const publicDisplay = document.querySelector('#publicTimeline-json')
if (publicDisplay != null) {
  publicTimeline.forEach(post => {
    publicDisplay.innerHTML += `<article class="post"><div class="userId">User: ${mockroblog.GetUserFromId(post.user_id)}</div><div class="postText">${post.text}</div><div class="postTimestamp">${post.timestamp}</div></article>`
  })
}
const userpubDisplay = document.querySelector('#myPostsTimeline-json')
if (userpubDisplay != null) {
  userTimeline.forEach(post => {
    userpubDisplay.innerHTML += `<article class="post"><div class="userId">User: ${mockroblog.GetUserFromId(post.user_id)}</div><div class="postText">${post.text}</div><div class="postTimestamp">${post.timestamp}</div></article>`
  })
}
const homeDisplay = document.querySelector('#homeTimeline-json')
if (homeDisplay != null) {
  homeTimeline.forEach(post => {
    homeDisplay.innerHTML += `<article class="post"><div class="userId">User: ${mockroblog.GetUserFromId(post.user_id)}</div><div class="postText">${post.text}</div><div class="postTimestamp">${post.timestamp}</div></article>`
  })
}
const curDisplay = document.querySelector('#curatedTimeline-json')
if (curDisplay != null) {
  curTimeLine.forEach(post => {
    curDisplay.innerHTML += `<article class="post"><div class="userId">User: ${mockroblog.GetUserFromId(post.user_id)}</div><div class="postText">${post.text}</div><div class="postTimestamp">${post.timestamp}</div></article>`
  })
}

// authenticate user data from login form on login button click
if (document.getElementById('loginButton')) {
  const loginButton = document.getElementById('loginButton')
  loginButton.onclick = () => {
    const username = document.getElementById('username').value
    const password = document.getElementById('password').value
    const data = mockroblog.authenticateUser(username, password)
    if (data != null) {
      window.sessionStorage.setItem('userid', data.id)
      window.sessionStorage.setItem('user', data.username)
      // window.location.href = 'http://localhost:8080/myPosts.html'
    }
  }
}

// SearchUser
if (document.getElementById('Search')) {
  const loginButton = document.getElementById('Search')
  loginButton.onclick = () => {
    const username = document.getElementById('User').value
    if (username != null) {
      console.log(username)
      window.sessionStorage.setItem('usersearch', username)
      location.reload()
    }
  }
}

// create a new post
if (document.getElementById('newPostButton')) {
  const newPostButton = document.getElementById('newPostButton')
  newPostButton.onclick = () => {
    const postText = document.getElementById('postText').value
    const data = mockroblog.postMessage(window.sessionStorage.getItem('userid'), postText)
    console.log(data)
  }
}
