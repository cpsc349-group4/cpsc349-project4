import './tailwind.css'
import './magnifying-glass.png'
import './twotter.png'

import * as mockroblog from './mockroblog.js'
import { data } from 'autoprefixer'
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

async function getCurrentUserId (url = 'http://localhost:5000/users/') {
  await fetch(url)
    .then(response => response.json())
    .then(data => {
      for (const key in data.resources) {
        if (data.resources[key].username === window.sessionStorage.getItem('user')) {
          window.sessionStorage.setItem('user_id', data.resources[key].id)
        }
      }
    })
}

// const homeTimeline = mockroblog.getHomeTimeline(window.sessionStorage.getItem('user'))
// const userTimeline = mockroblog.getUserTimeline(window.sessionStorage.getItem('user'))
// const curTimeLine = mockroblog.getUserTimeline(window.sessionStorage.getItem('usersearch'))

const publicDisplay = document.querySelector('#publicTimeline-json')
const curDisplay = document.querySelector('#curatedTimeline-json')

async function displayCrPosts(userid){
  const response = await fetch(`http://localhost:5000/posts/`, { method: 'get' })
  const data = await response.json()
   console.log(JSON.stringify(data))
  const dataObj = data.resources
   console.log(data.resources)
  for (const key in dataObj) {
    if (dataObj[key].user_id == userid)
      curDisplay.innerHTML += `<article class="post"><div class="userId">User: ${dataObj[key].user_id}</div><div class="postText">${dataObj[key].text}</div><div class="postTimestamp">${dataObj[key].timestamp}</div></article>`
  }
}
// display public timeline from api
async function displayPublicPosts (url = 'http://localhost:5000/posts/') {
  const response = await fetch(url)
  const data = await response.json()
  // console.log(JSON.stringify(data))
  const dataObj = data.resources
  // console.log(data.resources)
  for (const key in dataObj) {
    publicDisplay.innerHTML += `<article class="post"><div class="userId">User: ${dataObj[key].user_id}</div><div class="postText">${dataObj[key].text}</div><div class="postTimestamp">${dataObj[key].timestamp}</div></article>`
  }
}

if (curDisplay != null){
  displayCrPosts(window.sessionStorage.getItem('usersearch'));
}
// Display public timline if the page is up
if (publicDisplay != null) {
  displayPublicPosts()
}

/*
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
*/
export function authenticateUser (username, password) {
  return fetch(`http://localhost:5000/users/?username=${username}&password=${password}`, { method: 'get' })
    .then((res) => res.text())
    .then((text) => {
      if (!text.includes('username')) {
        return null
      } else {
        return text
      }
    }).catch((error) => {
      throw error
    })
}

export function CreateUser(user, pass, em){
  const data = { username: user, email: em, password: pass};
  return fetch(`http://localhost:5000/users/`, { method: 'POST' ,
  body: JSON.stringify(data),
  })
  .then(response => response.json())
  .then(data => {
    console.log('Success:', data);
    return username;
  })
  .catch((error) => {
    console.error('Error:', error);
    return null;
  });
}

// authenticate user data from login form on login button click
if (document.getElementById('createButton')) {
  const loginButton = document.getElementById('createButton')
  loginButton.addEventListener('click', async event => {
    event.preventDefault()
    const email = document.getElementById('email').value
    const username = document.getElementById('username').value
    const password = document.getElementById('password').value
    if (await CreateUser(username, password, email) != null) {
      // console.log(username)
      window.location.href = 'index.html'
    }
  })
}

// authenticate user data from login form on login button click
if (document.getElementById('loginButton')) {
  const loginButton = document.getElementById('loginButton')
  loginButton.addEventListener('click', async event => {
    event.preventDefault()
    const username = document.getElementById('username').value
    const password = document.getElementById('password').value
    if (await authenticateUser(username, password) != null) {
      // console.log(username)
      window.sessionStorage.setItem('user', username)
      getCurrentUserId()
      window.location.href = 'myPosts.html'
    }
  })
}

// delete session data when clicking logout button
if (document.getElementById('logoutButton')) {
  const logoutButton = document.getElementById('logoutButton')
  logoutButton.addEventListener('click', async event => {
    event.preventDefault()
    window.sessionStorage.clear()
    window.location.href = 'index.html'
  })
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
  newPostButton.addEventListener('click', async event => {
    event.preventDefault()
    const now = new Date()
    const timestamp =
      now.getUTCFullYear() + '-' +
      String(now.getUTCMonth() + 1).padStart(2, '0') + '-' +
      String(now.getUTCDate()).padStart(2, '0') + ' ' +
      String(now.getUTCHours()).padStart(2, '0') + ':' +
      String(now.getUTCMinutes()).padStart(2, '0') + ':' +
      String(now.getUTCSeconds()).padStart(2, '0')

    const postText = document.getElementById('postText').value

    fetch('http://localhost:5000/posts/', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        user_id: window.sessionStorage.getItem('user_id'),
        text: postText,
        timestamp: timestamp
      })
    })
    .then(res => res.json())
    .then(data => console.log(data))
    .catch(err => console.log(err))

    window.location.href = 'myPosts.html'
  })
}
