import axios from 'axios'

// Middleware to enable CORS
const allowCors = (fn) => async (req, res) => {
  res.setHeader('Access-Control-Allow-Credentials', true)
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT')
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version, Authorization, x-api-key, anthropic-version',
  )

  if (req.method === 'OPTIONS') {
    res.status(200).end()
    return
  }

  return await fn(req, res)
}

// Handler function for the proxy
const handler = async (req, res) => {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const { target, data, headers } = req.body

  if (!target) {
    return res.status(400).json({ error: 'Target URL is required' })
  }

  try {
    const response = await axios({
      method: 'post',
      url: target,
      data: data,
      headers: headers,
    })

    return res.status(response.status).json(response.data)
  } catch (error) {
    const statusCode = error.response?.status || 500
    const errorData = error.response?.data || { error: error.message }

    return res.status(statusCode).json(errorData)
  }
}

export default allowCors(handler)
