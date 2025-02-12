require('dotenv').config() // loads .env vars
const express = require('express')
const cors = require('cors')
const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()
const app = express()

// Middleware
app.use(cors())
app.use(express.json())

// Route: create a new Test row
app.post('/test', async (req, res) => {
  try {
    const newRow = await prisma.test.create({
      data: {}
      // we’re not inserting any fields since we only have id & createdAt
    })
    return res.json(newRow)
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Failed to create row in Test table.' })
  }
})

// Route: get all Test rows
app.get('/test', async (req, res) => {
  try {
    const rows = await prisma.test.findMany()
    return res.json(rows)
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Failed to fetch rows from Test table.' })
  }
})

// Start the server
const port = process.env.PORT || 3000
app.listen(port, () => {
  console.log(`Server is listening on port ${port}`)
})
