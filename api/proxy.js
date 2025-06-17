import axios from 'axios'

// Middleware to enable CORS
const allowCors = (fn) => async (req, res) => {
  res.setHeader('Access-Control-Allow-Credentials', true)
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT')
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version, Authorization, x-api-key, anthropic-version, Cache-Control, Connection, Transfer-Encoding',
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

  const { target, data, headers, stream } = req.body

  if (!target) {
    return res.status(400).json({ error: 'Target URL is required' })
  }

  console.log(`Proxy request: ${stream ? 'STREAMING' : 'NON-STREAMING'} to ${target}`)

  try {
    // Handle streaming responses
    if (stream) {
      console.log('Starting streaming request...')

      // Use fetch for streaming support
      const response = await fetch(target, {
        method: 'POST',
        headers: headers,
        body: JSON.stringify(data),
      })

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}))
        console.error('Streaming request failed:', response.status, errorData)
        return res.status(response.status).json(errorData)
      }

      console.log('Streaming response received, setting up stream...')

      // Set up streaming response headers
      res.setHeader('Content-Type', 'text/plain; charset=utf-8')
      res.setHeader('Cache-Control', 'no-cache')
      res.setHeader('Connection', 'keep-alive')
      res.setHeader('Transfer-Encoding', 'chunked')
      res.setHeader('X-Accel-Buffering', 'no') // Disable nginx buffering if present

      // Get the readable stream from the response
      const reader = response.body.getReader()
      const decoder = new TextDecoder()
      let chunkCount = 0

      try {
        while (true) {
          const { done, value } = await reader.read()
          if (done) {
            console.log(`Streaming completed after ${chunkCount} chunks`)
            break
          }

          // Decode the chunk and send it to the client
          const chunk = decoder.decode(value, { stream: true })
          if (chunk) {
            chunkCount++
            console.debug(
              `Sending chunk ${chunkCount}: ${chunk.substring(0, 50)}${chunk.length > 50 ? '...' : ''}`,
            )

            // Write the chunk to the response
            res.write(chunk)

            // Flush the response to ensure chunks are sent immediately
            if (res.flush) {
              res.flush()
            }
          }
        }

        // Ensure the response is properly ended
        res.end()
      } catch (streamError) {
        console.error('Stream processing error:', streamError)
        // Try to end the response gracefully
        try {
          res.end()
        } catch (e) {
          console.error('Error ending response:', e)
        }
      }
    } else {
      console.log('Starting non-streaming request...')

      // Handle non-streaming responses with axios
      const response = await axios({
        method: 'post',
        url: target,
        data: data,
        headers: headers,
        timeout: 30000, // 30 second timeout
      })

      console.log('Non-streaming response received')
      return res.status(response.status).json(response.data)
    }
  } catch (error) {
    console.error('Proxy error:', error.message)

    // If we're in the middle of streaming and encounter an error, try to end gracefully
    if (stream && !res.headersSent) {
      try {
        res.status(500).json({ error: error.message })
      } catch (e) {
        console.error('Error sending error response:', e)
      }
    } else if (!res.headersSent) {
      const statusCode = error.response?.status || 500
      const errorData = error.response?.data || { error: error.message }
      return res.status(statusCode).json(errorData)
    }
  }
}

export default allowCors(handler)
