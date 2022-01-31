const express = require('express')
const router = express.Router()
const axios = require('axios')
const jwt = require('jsonwebtoken')
require('dotenv').config()

const payload = {
  iss: process.env.API_KEY,
  exp: ((new Date()).getTime() + 10000)
}

router.post('/addMeeting', async (req, res, next) => {
  const token = jwt.sign(payload, process.env.API_SECRET)
  console.log(req.get('host'))
  // Make Zoom API call
  const meetingTitle = req.body.meetingTitle
  const startTime = req.body.startTime
  const endTime = req.body.endTime
  const email = 'aaggarwal2025@gmail.com'
  const startDate = new Date(startTime)
  const data = {
    topic: meetingTitle,
    type: 2,
    start_time: (new Date(startTime - 5 * 3600000)).toISOString(),
    timezone: "America/New_York",
    duration: (endTime - startTime) / 60000,
  }
  console.log(data.start_time)
  axios({
    method: 'post',
    url: 'https://api.zoom.us/v2/users/' + 'me' + '/meetings',
    data: data,
    headers: {
      Authorization: `Bearer ${token}`,
      'User-Agent': 'Zoom-api-Jwt-Request',
      'content-type': 'application/json'
    }
  })
    .then(function (response) {
      // handle success
      console.log(response.data.join_url)
      res.json({join_url: response.data.join_url})
})
    .catch(function (response) {
      // handle error
      console.log(response.message)
      res.send('invalid response')
    })
})

module.exports = router
