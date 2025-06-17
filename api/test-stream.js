// Test streaming endpoint to verify Vercel streaming support
const allowCors = (fn) => async (req, res) => {
  res.setHeader('Access-Control-Allow-Credentials', true)
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,POST')
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version',
  )

  if (req.method === 'OPTIONS') {
    res.status(200).end()
    return
  }

  return await fn(req, res)
}

const handler = async (req, res) => {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  console.log('Test streaming endpoint called')

  // Set up streaming response headers
  res.setHeader('Content-Type', 'text/plain; charset=utf-8')
  res.setHeader('Cache-Control', 'no-cache')
  res.setHeader('Connection', 'keep-alive')
  res.setHeader('Transfer-Encoding', 'chunked')

  // Simulate streaming response
  const messages = [
    'Hello',
    ' from',
    ' the',
    ' streaming',
    ' test',
    ' endpoint!',
    ' This',
    ' should',
    ' appear',
    ' gradually.',
  ]

  for (let i = 0; i < messages.length; i++) {
    await new Promise((resolve) => setTimeout(resolve, 200)) // 200ms delay between chunks
    res.write(messages[i])
    console.log(`Sent chunk ${i + 1}: "${messages[i]}"`)
  }

  res.end()
  console.log('Test streaming completed')
}

export default allowCors(handler)
