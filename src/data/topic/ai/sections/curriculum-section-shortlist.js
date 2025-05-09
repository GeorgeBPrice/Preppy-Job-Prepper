// ai-fundamentals-shortlist.js - AI Fundamentals for Developers

const shortlistPrepper = {
  title: 'Minicourse AI Fundamentals for Developers',
  description:
    'A concise course covering essential AI concepts, technologies, and practical skills for aspiring developers preparing for interviews at AI-driven companies.',
  lessons: [
    {
      title: '10 Essential AI Concepts for Developers',
      description:
        'A comprehensive overview of AI fundamentals, current technologies, and practical applications, designed to equip you with interview-ready knowledge.',
      sections: [
        {
          title: 'What is AI? (Core Definition and Scope)',
          explanation: `
            <p>Artificial Intelligence (AI) is a broad field of computer science focused on creating systems capable of performing tasks that typically require human intelligence. These tasks include learning from experience, understanding natural language, recognizing patterns, solving problems, and making decisions.</p>

            <h5>Historical Context</h5>
            <p>The concept of AI emerged in the 1950s with Alan Turing's Turing Test, a thought experiment to evaluate machine intelligence. Early efforts relied on symbolic AI—hand-crafted rules and logic to mimic reasoning—but struggled with complex, unstructured data. The rise of machine learning, fueled by big data and powerful hardware in the 21st century, shifted AI toward data-driven approaches, with deep learning driving recent breakthroughs.</p>

            <h5>Key Aspects of AI</h5>
            <ul>
              <li><strong>Learning:</strong> AI systems improve by analyzing data, using algorithms like neural networks to identify patterns.</li>
              <li><strong>Reasoning:</strong> Drawing conclusions from data or rules, as seen in expert systems for medical diagnosis or chess.</li>
              <li><strong>Perception:</strong> Interpreting sensory inputs like images or speech via computer vision and natural language processing (NLP).</li>
              <li><strong>Interaction:</strong> Engaging with humans or environments, powering chatbots, virtual assistants, and robotics.</li>
            </ul>

            <h5>AI vs. Traditional Programming</h5>
            <table>
              <thead>
                <tr>
                  <th>Aspect</th>
                  <th>Traditional Programming</th>
                  <th>AI</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Approach</td>
                  <td>Explicit rules defined by humans</td>
                  <td>Data-driven learning</td>
                </tr>
                <tr>
                  <td>Output</td>
                  <td>Deterministic and predictable</td>
                  <td>Probabilistic and adaptive</td>
                </tr>
                <tr>
                  <td>Flexibility</td>
                  <td>Requires code changes for new scenarios</td>
                  <td>Generalizes to new situations</td>
                </tr>
                <tr>
                  <td>Example</td>
                  <td>Sorting algorithm</td>
                  <td>Image classification</td>
                </tr>
              </tbody>
            </table>

            <h5>Current Trends</h5>
            <ul>
              <li><strong>Multimodal AI:</strong> Models that can process and generate multiple types of content (text, images, audio, video) simultaneously.</li>
              <li><strong>Generative AI:</strong> Systems like GPT-4, Claude, and Midjourney create high-quality content from simple prompts.</li>
              <li><strong>AI Agents:</strong> Autonomous systems that can plan and execute complex tasks by using tools and reasoning.</li>
              <li><strong>Retrieval-Augmented Generation (RAG):</strong> Enhancing AI outputs by retrieving relevant information from external knowledge sources.</li>
              <li><strong>AI Ethics & Alignment:</strong> Ensuring AI systems behave according to human values and avoid harmful outcomes.</li>
            </ul>

            <p><strong>Interview Tip:</strong> Discuss AI's evolution, its data-driven nature vs. traditional coding, and how recent developments like multimodal models and agents are expanding AI capabilities.</p>

            <graphic type="nested-circles" title="AI, ML, DL Relationship">
              <item label="AI" color="#4f46e5" size="100%"/>
              <item label="Machine Learning" color="#10b981" size="70%"/>
              <item label="Deep Learning" color="#f59e0b" size="40%"/>
            </graphic>
          `,
          codeExample: `
// Simple AI-like decision-making example
function predictWeather(temperature, humidity) {
  // Basic rule-based "AI" (simplified)
  if (temperature > 25 && humidity < 60) {
    return "Sunny";
  } else if (humidity > 80) {
    return "Rainy";
  }
  return "Cloudy";
}

console.log(predictWeather(28, 50)); // "Sunny"
console.log(predictWeather(20, 85)); // "Rainy"
          `,
          exercise: {
            instructions:
              "Create a function that mimics a simple AI decision system, predicting a student's grade based on study hours and attendance percentage.",
          },
        },
        {
          title: 'Chat Prompts and API Prompting',
          explanation: `
            <p>Chat prompts are structured inputs designed to elicit specific responses from AI models like chatbots. A well-crafted prompt is clear, context-rich, and tailored to the task, improving the accuracy and relevance of the AI's output.</p>

            <h5>Types of Prompts</h5>
            <ul>
              <li><strong>Instructional:</strong> Direct commands, e.g., "Write a Python function to sort an array."</li>
              <li><strong>Conversational:</strong> Dialogue-based, e.g., "Explain neural networks like I'm 5."</li>
              <li><strong>Role-based:</strong> Assigning a persona, e.g., "Act as a senior developer and review this code."</li>
              <li><strong>Few-shot:</strong> Providing examples, e.g., "Translate English to French: 'Hello' → 'Bonjour', 'Goodbye' → ?"</li>
            </ul>

            <p>API prompting involves interacting with AI models programmatically via APIs (e.g., OpenAI API). This allows developers to integrate AI capabilities into applications seamlessly.</p>

            <h5>Best Practices for Prompting</h5>
            <ul>
              <li>Be specific and concise in your intent.</li>
              <li>Provide context or examples to guide the AI.</li>
              <li>Handle response variability with error checking and retries.</li>
              <li>Iterate on prompts to refine outputs.</li>
            </ul>

            <h5>Prompt-Response Flow</h5>
            <graphic type="bar-diagram" title="Prompt-Response Flow">
              <item label="User Prompt" color="#4f46e5" width="25%"/>
              <item label="API Request" color="#10b981" width="25%"/>
              <item label="AI Processing" color="#f59e0b" width="25%"/>
              <item label="Response" color="#ef4444" width="25%"/>
            </graphic>

            <p><strong>Interview Tip:</strong> Demonstrate how to craft effective prompts and integrate AI APIs into applications, highlighting error handling and prompt iteration.</p>
          `,
          codeExample: `
// Using OpenAI API (Node.js example)
import axios from 'axios';

async function getAIResponse(prompt) {
  const apiKey = 'your-api-key';
  const url = 'https://api.openai.com/v1/chat/completions';

  try {
    const response = await axios.post(url, {
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: prompt }],
      max_tokens: 100
    }, {
      headers: {
        'Authorization': \`Bearer \${apiKey}\`,
        'Content-Type': 'application/json'
      }
    });

    return response.data.choices[0].message.content;
  } catch (error) {
    console.error('API Error:', error);
    return "Error processing request";
  }
}

// Example usage
getAIResponse("Explain what a neural network is in one sentence.")
  .then(console.log);
          `,
          exercise: {
            instructions:
              'Write a function that uses an API to fetch AI-generated advice for a given coding problem.',
          },
        },
        {
          title: 'Large Language Models (LLMs) and Model Types',
          explanation: `
            <p>Large Language Models (LLMs) are advanced AI models trained on vast text datasets to understand and generate human-like language. Examples include GPT-3, BERT, and T5.</p>

            <h5>Key Characteristics of LLMs</h5>
            <ul>
              <li><strong>Pre-training:</strong> Models are trained on massive corpora to learn general language patterns.</li>
              <li><strong>Fine-tuning:</strong> Adapted to specific tasks with smaller, task-specific datasets.</li>
              <li><strong>Context Handling:</strong> Use attention mechanisms to manage long-range dependencies in text.</li>
              <li><strong>Scalability:</strong> Larger models (e.g., billions of parameters) often perform better but require more computation.</li>
            </ul>

            <h5>Common Model Types in AI</h5>
            <table>
              <thead>
                <tr>
                  <th>Type</th>
                  <th>Description</th>
                  <th>Example Use Case</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Transformer</td>
                  <td>Uses self-attention for sequence processing</td>
                  <td>Text generation (GPT)</td>
                </tr>
                <tr>
                  <td>CNN</td>
                  <td>Convolutional Neural Networks for spatial data</td>
                  <td>Image recognition</td>
                </tr>
                <tr>
                  <td>RNN</td>
                  <td>Recurrent Neural Networks for sequential data</td>
                  <td>Speech processing</td>
                </tr>
                <tr>
                  <td>GAN</td>
                  <td>Generative Adversarial Networks for generation</td>
                  <td>Image synthesis</td>
                </tr>
              </tbody>
            </table>

            <h5>Why Transformers Dominate NLP</h5>
            <p>Transformers excel in NLP due to their ability to handle long-range dependencies, parallelize training, and scale effectively with more data and parameters.</p>

            <graphic type="circle-diagram" title="Model Types">
              <item label="Transformer" color="#4f46e5" size="33%"/>
              <item label="CNN" color="#10b981" size="33%"/>
              <item label="RNN" color="#f59e0b" size="33%"/>
            </graphic>

            <p><strong>Interview Tip:</strong> Explain the differences between model types and why transformers are preferred for language tasks.</p>
          `,
          codeExample: `
// Pseudo-code for a simple transformer-like attention mechanism
function simpleAttention(query, keys, values) {
  const scores = keys.map(k => dotProduct(query, k));
  const weights = softmax(scores);
  return weights.reduce((sum, w, i) => sum + w * values[i], 0);
}

function dotProduct(a, b) {
  return a.reduce((sum, val, i) => sum + val * b[i], 0);
}

function softmax(scores) {
  const expScores = scores.map(Math.exp);
  const sumExp = expScores.reduce((a, b) => a + b);
  return expScores.map(s => s / sumExp);
}
          `,
          exercise: {
            instructions:
              'Implement a simplified attention mechanism to weight words in a sentence based on relevance.',
          },
        },
        {
          title: 'Masters and Agents',
          explanation: `
            <p>In AI systems, <strong>masters</strong> are centralized controllers that oversee or orchestrate multiple tasks or models, while <strong>agents</strong> are autonomous entities that perform specific tasks, often collaborating or interacting with each other.</p>

            <h5>Multi-Agent Systems</h5>
            <p>Multi-agent systems involve multiple agents working together to achieve a common goal. Agents can be cooperative (e.g., swarm robotics) or competitive (e.g., game AI). Coordination methods include centralized control (master-agent) or decentralized communication.</p>

            <h5>Real-World Examples</h5>
            <ul>
              <li><strong>Customer Service AI:</strong> A master system routes queries to specialized agents for chat, email, or analytics.</li>
              <li><strong>Autonomous Vehicles:</strong> A master controller manages navigation, while agents handle sensors and actuators.</li>
              <li><strong>Simulations:</strong> Agents model individual behaviors in traffic or economic systems.</li>
            </ul>

            <h5>Comparison</h5>
            <table>
              <thead>
                <tr>
                  <th>Concept</th>
                  <th>Masters</th>
                  <th>Agents</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Role</td>
                  <td>Coordinator</td>
                  <td>Executor</td>
                </tr>
                <tr>
                  <td>Scope</td>
                  <td>High-level control</td>
                  <td>Task-specific</td>
                </tr>
                <tr>
                  <td>Interaction</td>
                  <td>Directs agents</td>
                  <td>Performs actions</td>
                </tr>
              </tbody>
            </table>

            <p><strong>Interview Tip:</strong> Discuss how masters and agents can be used in a product, emphasizing coordination and task delegation.</p>
          `,
          codeExample: `
// Simple master-agent system
class Master {
  constructor() {
    this.agents = [];
  }

  addAgent(agent) {
    this.agents.push(agent);
  }

  delegateTask(task) {
    const agent = this.agents.find(a => a.canHandle(task));
    return agent ? agent.execute(task) : "No suitable agent";
  }
}

class ChatAgent {
  canHandle(task) { return task.type === "chat"; }
  execute(task) { return "Responding to: " + task.message; }
}

const master = new Master();
master.addAgent(new ChatAgent());
console.log(master.delegateTask({ type: "chat", message: "Hello!" }));
          `,
          exercise: {
            instructions:
              "Design a master-agent system where a master delegates tasks like 'email' and 'search' to specialized agents.",
          },
        },
        {
          title: 'Context in AI (Multi-Conversation Context)',
          explanation: `
            <p>Context refers to the information an AI model uses to interpret inputs and generate relevant outputs. In multi-conversation contexts, AI retains and leverages prior dialogue to maintain coherence.</p>

            <h5>How Context Works</h5>
            <ul>
              <li><strong>Memory:</strong> Models store past interactions, often as a sequence of messages.</li>
              <li><strong>Attention Mechanisms:</strong> Focus on relevant parts of the context using techniques like transformers.</li>
              <li><strong>Windowing:</strong> Limit context size (e.g., last 4096 tokens in GPT) to manage computation.</li>
            </ul>

            <h5>Context Management Techniques</h5>
            <ul>
              <li><strong>Sliding Window:</strong> Retain the most recent interactions, discarding older ones.</li>
              <li><strong>Summarization:</strong> Condense past dialogue into a summary to preserve key information.</li>
              <li><strong>Hierarchical Context:</strong> Organize context into levels (e.g., session, topic) for better relevance.</li>
            </ul>

            <h5>Challenges</h5>
            <ul>
              <li><strong>Forgetting:</strong> Older context may be lost, affecting long-term coherence.</li>
              <li><strong>Irrelevance:</strong> Including too much context can dilute focus on current queries.</li>
              <li><strong>Computation:</strong> Larger contexts increase processing time and resource usage.</li>
            </ul>

            <graphic type="bar-diagram" title="Context Window">
              <item label="Turn 1: User" color="#4f46e5" width="15%"/>
              <item label="Turn 1: AI" color="#10b981" width="15%"/>
              <item label="Turn 2: User" color="#4f46e5" width="15%"/>
              <item label="Turn 2: AI" color="#10b981" width="15%"/>
              <item label="..." color="#d1d5db" width="10%"/>
              <item label="Turn N" color="#f59e0b" width="30%"/>
            </graphic>

            <p><strong>Interview Tip:</strong> Explain how context improves chatbot coherence and discuss trade-offs in context management.</p>
          `,
          codeExample: `
// Simple context management
class ChatBot {
  constructor() {
    this.context = [];
  }

  addToContext(role, message) {
    this.context.push({ role, message });
    if (this.context.length > 4) this.context.shift(); // Sliding window
  }

  respond(message) {
    this.addToContext("user", message);
    const response = "I remember: " + this.context.map(c => c.message).join(", ");
    this.addToContext("ai", response);
    return response;
  }
}

const bot = new ChatBot();
console.log(bot.respond("Hi"));
console.log(bot.respond("How are you?"));
          `,
          exercise: {
            instructions:
              'Create a chatbot class that maintains a conversation context and responds based on prior messages.',
          },
        },
        {
          title: 'Image Generation in AI',
          explanation: `
            <p>Image generation involves using AI to create images from text prompts or other inputs. This is often achieved through generative models like GANs, VAEs, or diffusion models.</p>

            <h5>Key Technologies</h5>
            <ul>
              <li><strong>GANs (Generative Adversarial Networks):</strong> A generator creates images, and a discriminator evaluates them, leading to realistic outputs.</li>
              <li><strong>Diffusion Models:</strong> Gradually refine noise into images through a series of denoising steps (e.g., DALL-E 2, Stable Diffusion).</li>
              <li><strong>VAEs (Variational Autoencoders):</strong> Encode inputs into a latent space and decode to generate new images.</li>
            </ul>

            <h5>Diffusion Process</h5>
            <p>Diffusion models start with random noise and iteratively denoise it based on the input prompt, producing high-quality images.</p>
            <graphic type="bar-diagram" title="Diffusion Process">
              <item label="Noise" color="#4f46e5" width="20%"/>
              <item label="Step 1" color="#10b981" width="20%"/>
              <item label="Step 2" color="#f59e0b" width="20%"/>
              <item label="..." color="#d1d5db" width="10%"/>
              <item label="Image" color="#ef4444" width="20%"/>
            </graphic>

            <h5>Applications Beyond Art</h5>
            <ul>
              <li><strong>Medical Imaging:</strong> Generating synthetic data for training.</li>
              <li><strong>Design:</strong> Creating prototypes or mockups.</li>
              <li><strong>Entertainment:</strong> Generating assets for games or movies.</li>
            </ul>

            <p><strong>Interview Tip:</strong> Describe how diffusion models work and their advantages over GANs, such as stability and quality.</p>
          `,
          codeExample: `
// Pseudo-code for a simplified diffusion-like process
function generateImage(prompt, steps = 10) {
  let image = Array(64 * 64).fill(0); // Noise
  for (let i = 0; i < steps; i++) {
    image = image.map(pixel => {
      // Simulate denoising based on prompt
      return pixel + (prompt.includes("blue") ? 0.1 : -0.1);
    });
  }
  return image.map(p => Math.min(Math.max(p, 0), 1)); // Normalize
}

console.log(generateImage("blue sky"));
          `,
          exercise: {
            instructions:
              'Simulate a basic image generation process that adjusts pixel values based on a text prompt.',
          },
        },
        {
          title: 'Tokens and GPU/Computation',
          explanation: `
            <p>Tokens are the basic units of data processed by AI models, especially in NLP. Text is tokenized into words, subwords, or characters before being fed into models.</p>

            <h5>Tokenization</h5>
            <p>Subword tokenization (e.g., Byte Pair Encoding) is common in LLMs, balancing vocabulary size and meaning. For example, "unhappiness" might be split into "un", "happiness".</p>
            <graphic type="bar-diagram" title="Tokenization">
              <item label="Hello" color="#4f46e5" width="20%"/>
              <item label="world" color="#10b981" width="20%"/>
              <item label="," color="#f59e0b" width="10%"/>
              <item label="this" color="#ef4444" width="20%"/>
              <item label="is" color="#8b5cf6" width="15%"/>
              <item label="AI" color="#ec4899" width="15%"/>
            </graphic>

            <h5>GPU and Computation</h5>
            <p>AI models, especially deep learning, rely on GPUs for parallel processing of matrix operations. GPUs have thousands of cores, making them ideal for training and inference.</p>
            <ul>
              <li><strong>Parallelism:</strong> GPUs process multiple operations simultaneously.</li>
              <li><strong>Tensor Operations:</strong> Optimized for matrix multiplications in neural networks.</li>
              <li><strong>Speed:</strong> Significantly faster than CPUs for large-scale AI tasks.</li>
            </ul>

            <p><strong>Interview Tip:</strong> Explain token limits (e.g., GPT's 4096-token context) and why GPUs are critical for AI workloads.</p>
          `,
          codeExample: `
// Simple tokenization
function tokenize(text) {
  return text.toLowerCase().split(/\\s+/).filter(t => t.length > 0);
}

// Simulate GPU-like parallel processing
function processTokens(tokens) {
  return Promise.all(tokens.map(t => {
    return new Promise(resolve => {
      setTimeout(() => resolve(t.length), 10); // Simulate computation
    });
  }));
}

const tokens = tokenize("Hello world AI");
processTokens(tokens).then(console.log); // [5, 5, 2]
          `,
          exercise: {
            instructions:
              'Write a tokenization function and simulate parallel processing of tokens using async operations.',
          },
        },
        {
          title: 'Basics of Training Models (PyTorch, TensorFlow)',
          explanation: `
            <p>Model training involves teaching an AI model to make predictions by optimizing its parameters using data. This process includes data preparation, model definition, loss calculation, and optimization.</p>

            <h5>Steps in Training</h5>
            <ol>
              <li><strong>Data Preparation:</strong> Collect, clean, and preprocess data (e.g., normalization, splitting into train/test sets).</li>
              <li><strong>Model Definition:</strong> Define the architecture (e.g., neural network layers).</li>
              <li><strong>Loss Function:</strong> Measure prediction error (e.g., MSE for regression, cross-entropy for classification).</li>
              <li><strong>Optimization:</strong> Use algorithms like gradient descent to adjust weights.</li>
              <li><strong>Iteration:</strong> Train over multiple epochs, monitoring performance.</li>
            </ol>

            <h5>Training Loop</h5>
            <graphic type="bar-diagram" title="Training Loop">
              <item label="Data" color="#4f46e5" width="20%"/>
              <item label="Forward Pass" color="#10b981" width="20%"/>
              <item label="Loss Calculation" color="#f59e0b" width="20%"/>
              <item label="Backward Pass" color="#ef4444" width="20%"/>
              <item label="Update Weights" color="#8b5cf6" width="20%"/>
            </graphic>

            <h5>Key Concepts</h5>
            <ul>
              <li><strong>Backpropagation:</strong> Computes gradients to update weights.</li>
              <li><strong>Hyperparameters:</strong> Settings like learning rate, batch size, and epochs.</li>
              <li><strong>Overfitting:</strong> When a model performs well on training data but poorly on new data.</li>
            </ul>

            <p><strong>Interview Tip:</strong> Be able to outline the training process and mention popular frameworks like PyTorch and TensorFlow.</p>
          `,
          codeExample: `
# PyTorch example: Simple linear regression
import torch
import torch.nn as nn

# Data
X = torch.tensor([[1.0], [2.0], [3.0]])
y = torch.tensor([[2.0], [4.0], [6.0]])

# Model
model = nn.Linear(1, 1)
criterion = nn.MSELoss()
optimizer = torch.optim.SGD(model.parameters(), lr=0.01)

# Training loop
for epoch in range(100):
  y_pred = model(X)
  loss = criterion(y_pred, y)
  optimizer.zero_grad()
  loss.backward()
  optimizer.step()

print(model.weight.item())  # Should be close to 2
          `,
          exercise: {
            instructions:
              'Implement a simple PyTorch model to predict a linear relationship (e.g., y = 3x + 1).',
          },
        },
        {
          title: 'AI SDKs and Libraries',
          explanation: `
            <p>AI SDKs and libraries provide pre-built tools and models to simplify AI development. They abstract complex algorithms, allowing developers to focus on application logic.</p>

            <h5>Popular Libraries</h5>
            <table>
              <thead>
                <tr>
                  <th>Library</th>
                  <th>Purpose</th>
                  <th>Example Use Case</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>PyTorch</td>
                  <td>Dynamic neural networks</td>
                  <td>Research, custom model training</td>
                </tr>
                <tr>
                  <td>TensorFlow</td>
                  <td>Scalable ML models</td>
                  <td>Production deployment</td>
                </tr>
                <tr>
                  <td>Hugging Face</td>
                  <td>NLP and transformers</td>
                  <td>Text generation, sentiment analysis</td>
                </tr>
                <tr>
                  <td>Scikit-learn</td>
                  <td>Traditional ML algorithms</td>
                  <td>Classification, clustering</td>
                </tr>
              </tbody>
            </table>

            <h5>Ecosystem and Tools</h5>
            <ul>
              <li><strong>Model Hubs:</strong> Repositories like Hugging Face Hub for sharing pre-trained models.</li>
              <li><strong>AutoML:</strong> Tools like Google AutoML for automated model selection and tuning.</li>
              <li><strong>Deployment:</strong> Libraries like TensorFlow Serving for serving models in production.</li>
            </ul>

            <graphic type="circle-diagram" title="AI Libraries">
              <item label="PyTorch" color="#4f46e5" size="25%"/>
              <item label="TensorFlow" color="#10b981" size="25%"/>
              <item label="Hugging Face" color="#f59e0b" size="25%"/>
              <item label="Scikit-learn" color="#ef4444" size="25%"/>
            </graphic>

            <p><strong>Interview Tip:</strong> Highlight experience with a specific library and its practical application in a project.</p>
          `,
          codeExample: `
// Using Hugging Face Transformers in Python
from transformers import pipeline

# Load a pre-trained model
classifier = pipeline("sentiment-analysis")

# Use it
result = classifier("I love coding with AI!")
print(result)  # [{'label': 'POSITIVE', 'score': 0.99...}]
          `,
          exercise: {
            instructions:
              'Use the Hugging Face pipeline to classify the sentiment of a list of sentences.',
          },
        },
        {
          title: 'Practical AI Integration in Applications',
          explanation: `
            <p>Integrating AI into applications involves embedding AI models or services into software products like web apps, mobile apps, or backend services.</p>

            <h5>Steps for Integration</h5>
            <ul>
              <li><strong>Model Selection:</strong> Choose pre-trained models or train custom ones.</li>
              <li><strong>API Setup:</strong> Connect to AI services via REST APIs or SDKs.</li>
              <li><strong>UI/UX Design:</strong> Create interfaces for user interaction with AI outputs.</li>
              <li><strong>Performance Optimization:</strong> Manage latency, caching, and resource usage.</li>
              <li><strong>Monitoring and Maintenance:</strong> Track model performance and update as needed.</li>
            </ul>

            <h5>Deployment Challenges</h5>
            <ul>
              <li><strong>Scalability:</strong> Handling large user bases and data volumes.</li>
              <li><strong>Latency:</strong> Ensuring real-time responses for user-facing applications.</li>
              <li><strong>Security:</strong> Protecting sensitive data and models.</li>
              <li><strong>Versioning:</strong> Managing updates to models and APIs.</li>
            </ul>

            <graphic type="bar-diagram" title="AI Integration">
              <item label="Frontend" color="#4f46e5" width="20%"/>
              <item label="API" color="#10b981" width="20%"/>
              <item label="Model" color="#f59e0b" width="20%"/>
              <item label="Database" color="#ef4444" width="20%"/>
              <item label="Monitoring" color="#8b5cf6" width="20%"/>
            </graphic>

            <p><strong>Interview Tip:</strong> Describe a scenario where you'd integrate AI (e.g., a Vue.js app with a chatbot feature), emphasizing deployment considerations.</p>
          `,
          codeExample: `
// Vue.js component integrating AI via API
<template>
  <div>
    <input v-model="prompt" @keyup.enter="getResponse" placeholder="Ask AI...">
    <p>{{ response }}</p>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      prompt: '',
      response: ''
    };
  },
  methods: {
    async getResponse() {
      const res = await axios.post('http://localhost:3000/ai', { prompt: this.prompt });
      this.response = res.data.answer;
    }
  }
}
</script>
          `,
          exercise: {
            instructions:
              'Create a Vue.js component that fetches and displays AI-generated text from a mock API endpoint.',
          },
        },
        {
          title: 'Retrieval-Augmented Generation (RAG)',
          explanation: `
            <p>Retrieval-Augmented Generation (RAG) is an AI architecture that enhances large language models by retrieving relevant information from external knowledge sources before generating responses. This approach significantly improves factual accuracy and reduces hallucinations.</p>

            <h5>How RAG Works</h5>
            <ol>
              <li><strong>Document Indexing:</strong> External knowledge (documents, databases, websites) is processed and stored in a vector database with semantic embeddings.</li>
              <li><strong>Query Processing:</strong> When a user query arrives, the system generates an embedding for the query.</li>
              <li><strong>Retrieval:</strong> The system finds the most relevant documents using similarity search between the query embedding and document embeddings.</li>
              <li><strong>Augmentation:</strong> Retrieved information is added to the prompt sent to the language model.</li>
              <li><strong>Generation:</strong> The LLM generates a response using both the original query and the retrieved context.</li>
            </ol>

            <h5>Key Components</h5>
            <ul>
              <li><strong>Vector Database:</strong> Stores document embeddings for efficient similarity search (e.g., Pinecone, Weaviate, Chroma).</li>
              <li><strong>Embedding Model:</strong> Converts text to vector representations (e.g., OpenAI's text-embedding-ada-002).</li>
              <li><strong>Retriever:</strong> Finds relevant documents using techniques like BM25 or vector similarity.</li>
              <li><strong>LLM:</strong> Generates responses using the augmented context (e.g., GPT-4, Claude, Llama).</li>
            </ul>

            <graphic type="bar-diagram" title="RAG Architecture">
              <item label="User Query" color="#4f46e5" width="15%"/>
              <item label="Retrieval" color="#10b981" width="25%"/>
              <item label="Augmentation" color="#f59e0b" width="25%"/>
              <item label="Generation" color="#ef4444" width="20%"/>
              <item label="Response" color="#8b5cf6" width="15%"/>
            </graphic>

            <h5>Benefits of RAG</h5>
            <ul>
              <li><strong>Improved Accuracy:</strong> Grounds responses in factual information rather than model parameters.</li>
              <li><strong>Reduced Hallucinations:</strong> Minimizes the model's tendency to generate plausible but false information.</li>
              <li><strong>Knowledge Updating:</strong> External knowledge can be updated without retraining the entire model.</li>
              <li><strong>Domain Adaptation:</strong> Easily adapted to specialized domains by indexing relevant documentation.</li>
              <li><strong>Transparency:</strong> Sources can be cited, making the AI's information more verifiable.</li>
            </ul>

            <p><strong>Interview Tip:</strong> Discuss how RAG systems provide a balance between the flexibility of LLMs and the reliability of traditional information retrieval systems. Mention specific implementation challenges like optimizing retrieval quality and managing context window limitations.</p>
          `,
          codeExample: `
// Simple RAG implementation using pseudocode
async function ragResponse(query, documents) {
  // 1. Create embeddings
  const queryEmbedding = await createEmbedding(query);
  
  // 2. Retrieve relevant documents
  const relevantDocs = documents
    .map(doc => ({
      text: doc.text,
      similarity: cosineSimilarity(queryEmbedding, doc.embedding)
    }))
    .sort((a, b) => b.similarity - a.similarity)
    .slice(0, 3); // Top 3 most relevant docs
  
  // 3. Construct augmented prompt
  const context = relevantDocs.map(doc => doc.text).join("\\n\\n");
  const augmentedPrompt = \`
    Context information:
    \${context}
    
    Given the context information and not prior knowledge, answer the question:
    \${query}
  \`;
  
  // 4. Generate response using LLM
  return await llmGenerate(augmentedPrompt);
}
          `,
          exercise: {
            instructions:
              'Design a simple RAG system that retrieves relevant definitions from a programming glossary before answering coding questions.',
          },
        },
        {
          title: 'Multimodal AI Systems',
          explanation: `
            <p>Multimodal AI systems can process and generate multiple types of data (text, images, audio, video) simultaneously, enabling more human-like interaction with information across different formats.</p>

            <h5>Key Capabilities</h5>
            <ul>
              <li><strong>Cross-Modal Understanding:</strong> Interpreting relationships between different data types (e.g., connecting image content with textual descriptions).</li>
              <li><strong>Unified Representation:</strong> Creating embeddings that capture information across modalities in a shared latent space.</li>
              <li><strong>Multi-Modal Generation:</strong> Producing content in different formats from varied inputs (e.g., generating images from text or describing images in words).</li>
              <li><strong>Synchronized Processing:</strong> Analyzing multiple streams of information together (e.g., understanding both speech audio and facial expressions in video).</li>
            </ul>

            <h5>Advanced Multimodal Models</h5>
            <table>
              <thead>
                <tr>
                  <th>Model</th>
                  <th>Modalities</th>
                  <th>Key Features</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>GPT-4 Vision</td>
                  <td>Text + Images</td>
                  <td>Can analyze images and respond to questions about them</td>
                </tr>
                <tr>
                  <td>DALL-E 3</td>
                  <td>Text → Images</td>
                  <td>Generates detailed images from text descriptions</td>
                </tr>
                <tr>
                  <td>Claude 3</td>
                  <td>Text + Images</td>
                  <td>Processes visual information alongside text</td>
                </tr>
                <tr>
                  <td>Gemini</td>
                  <td>Text + Images + Audio + Video</td>
                  <td>Trained on multiple modalities from the ground up</td>
                </tr>
                <tr>
                  <td>Whisper</td>
                  <td>Audio → Text</td>
                  <td>Transcribes speech across many languages and conditions</td>
                </tr>
              </tbody>
            </table>

            <h5>Architectures for Multimodal AI</h5>
            <ul>
              <li><strong>Early Fusion:</strong> Different modalities are combined at the input level before processing.</li>
              <li><strong>Late Fusion:</strong> Each modality is processed separately, and outputs are combined.</li>
              <li><strong>Hybrid Approaches:</strong> Some layers process individual modalities while others handle combined representations.</li>
              <li><strong>Transformer-Based:</strong> Most modern systems use transformer architectures with specialized encoding for different input types.</li>
            </ul>

            <graphic type="circle-diagram" title="Multimodal Interaction">
              <item label="Text" color="#4f46e5" size="25%"/>
              <item label="Image" color="#10b981" size="25%"/>
              <item label="Audio" color="#f59e0b" size="25%"/>
              <item label="Video" color="#ef4444" size="25%"/>
            </graphic>

            <p><strong>Interview Tip:</strong> Discuss the challenges of aligning information across modalities and how models like CLIP (Contrastive Language-Image Pre-training) create unified representations that connect visual and textual concepts.</p>
          `,
          codeExample: `
// Using a multimodal model API (pseudocode)
async function analyzeImageWithText(imageUrl, question) {
  // Create a request with both image and text inputs
  const response = await fetch('https://api.multimodal-ai.com/analyze', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      image: imageUrl,
      text: question,
      model: 'vision-language-model-v1'
    })
  });
  
  const result = await response.json();
  
  // The model processes both the image and question together
  console.log(\`Question: \${question}\`);
  console.log(\`Answer: \${result.answer}\`);
  
  // The model might also return attention maps showing
  // which parts of the image it focused on
  if (result.attention_map) {
    visualizeAttention(imageUrl, result.attention_map);
  }
}

// Example usage
analyzeImageWithText(
  'https://example.com/chart.jpg',
  'What was the company's revenue growth in Q2?'
);
          `,
          exercise: {
            instructions:
              'Design a function that uses a multimodal AI to analyze a product image and generate both a product description and detect any quality issues.',
          },
        },
        {
          title: 'AI Agents and Autonomous Systems',
          explanation: `
            <p>AI agents are software entities that can perceive their environment, make decisions, and execute actions to achieve specific goals with varying degrees of autonomy. Modern AI agents combine LLMs with tools, planning capabilities, and memory systems.</p>

            <h5>Core Components of AI Agents</h5>
            <ul>
              <li><strong>Perception:</strong> Processing inputs from the environment (text, API data, tool outputs).</li>
              <li><strong>Memory:</strong> Storing information across interactions (short-term context and long-term knowledge).</li>
              <li><strong>Reasoning:</strong> Analyzing situations and determining appropriate actions.</li>
              <li><strong>Planning:</strong> Breaking down complex tasks into sequences of steps.</li>
              <li><strong>Tool Use:</strong> Interacting with external systems through APIs, code execution, etc.</li>
              <li><strong>Learning:</strong> Improving performance based on feedback and experience.</li>
            </ul>

            <h5>Agent Architectures</h5>
            <ul>
              <li><strong>ReAct:</strong> Interleaves reasoning and acting to handle complex tasks.</li>
              <li><strong>Reflexion:</strong> Incorporates self-reflection to learn from mistakes.</li>
              <li><strong>MRKL/FLARE:</strong> Combines neural and symbolic modules for different capabilities.</li>
              <li><strong>Multi-Agent Systems:</strong> Multiple specialized agents collaborating on complex tasks.</li>
            </ul>

            <h5>Advanced Agent Capabilities</h5>
            <table>
              <thead>
                <tr>
                  <th>Capability</th>
                  <th>Description</th>
                  <th>Example</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Tool Integration</td>
                  <td>Using external tools and APIs</td>
                  <td>Web search, code execution, database queries</td>
                </tr>
                <tr>
                  <td>Autonomous Planning</td>
                  <td>Breaking down complex tasks</td>
                  <td>Planning research steps for a complex topic</td>
                </tr>
                <tr>
                  <td>Multi-Agent Collaboration</td>
                  <td>Agents with different roles working together</td>
                  <td>Critic, researcher, and writer agents co-creating content</td>
                </tr>
                <tr>
                  <td>Self-Improvement</td>
                  <td>Learning from feedback and past performance</td>
                  <td>Refining code generation based on execution results</td>
                </tr>
              </tbody>
            </table>

            <p><strong>Interview Tip:</strong> Discuss the balance between agent autonomy and human supervision, highlighting how techniques like tool use verification and human feedback loops help maintain control while enabling powerful automation.</p>
          `,
          codeExample: `
// Simplified AI agent framework
class Agent {
  constructor(llm) {
    this.llm = llm;
    this.memory = { shortTerm: [], longTerm: {} };
    this.tools = {};
  }

  registerTool(name, toolFunction) {
    this.tools[name] = toolFunction;
  }

  async think(input) {
    // Add input to short-term memory
    this.memory.shortTerm.push({ role: 'user', content: input });
    
    // Generate reasoning about how to handle the input
    const reasoning = await this.llm.generate(
      \`Given the user input: "\${input}", think step by step about how to respond.\`
    );
    return reasoning;
  }

  async decideTool(reasoning) {
    // Decide which tool to use based on reasoning
    const toolDecision = await this.llm.generate(
      \`Based on this reasoning: "\${reasoning}", which tool should I use? 
       Available tools: \${Object.keys(this.tools).join(', ')}. 
       Respond with just the tool name and parameters in JSON format.\`
    );
    
    // Parse the tool name and parameters
    const { tool, parameters } = JSON.parse(toolDecision);
    return { tool, parameters };
  }

  async execute({ tool, parameters }) {
    if (!this.tools[tool]) {
      return \`Error: Tool "\${tool}" not found\`;
    }
    
    // Execute the selected tool with parameters
    const result = await this.tools[tool](parameters);
    
    // Add tool execution to memory
    this.memory.shortTerm.push({ 
      role: 'agent', 
      action: { tool, parameters, result } 
    });
    
    return result;
  }

  async respond(toolResult) {
    // Generate a response based on the tool result
    const response = await this.llm.generate(
      \`Given the tool result: "\${toolResult}", craft a helpful response to the user.\`
    );
    
    // Add response to memory
    this.memory.shortTerm.push({ role: 'assistant', content: response });
    return response;
  }

  async processInput(input) {
    const reasoning = await this.think(input);
    const toolDecision = await this.decideTool(reasoning);
    const toolResult = await this.execute(toolDecision);
    return this.respond(toolResult);
  }
}

// Usage example
const agent = new Agent(llmService);
agent.registerTool('weather', async ({ location }) => {
  return \`It's 72°F and sunny in \${location}\`;
});
agent.processInput("What's the weather in San Francisco?")
  .then(console.log);
          `,
          exercise: {
            instructions:
              'Design an AI agent that can help users plan a trip by breaking down the task into steps, using tools to search for flights, hotels, and attractions.',
          },
        },
        {
          title: 'LLM Fine-tuning and Customization',
          explanation: `
            <p>Fine-tuning adapts pre-trained language models to specific tasks, domains, or styles by further training them on specialized datasets. This process creates custom AI models that outperform prompt-based approaches for targeted applications.</p>

            <h5>Fine-tuning Approaches</h5>
            <ul>
              <li><strong>Full Fine-tuning:</strong> Updating all model parameters, requiring significant computational resources but potentially yielding the best performance.</li>
              <li><strong>Parameter-Efficient Fine-tuning (PEFT):</strong> Modifying only a small subset of parameters, dramatically reducing computational requirements.</li>
              <li><strong>LoRA (Low-Rank Adaptation):</strong> Adding small trainable rank decomposition matrices to existing weights, reducing parameters by 10,000x.</li>
              <li><strong>QLoRA:</strong> Combining quantization with LoRA to enable fine-tuning on consumer hardware.</li>
              <li><strong>Prompt Tuning:</strong> Learning continuous prompt embeddings while keeping the model frozen.</li>
            </ul>

            <h5>Fine-tuning Use Cases</h5>
            <table>
              <thead>
                <tr>
                  <th>Use Case</th>
                  <th>Description</th>
                  <th>Example</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Domain Adaptation</td>
                  <td>Specializing for industry-specific knowledge</td>
                  <td>Medical LLM that understands healthcare terminology</td>
                </tr>
                <tr>
                  <td>Style Alignment</td>
                  <td>Matching a specific tone or writing style</td>
                  <td>Customer service AI with company-specific voice</td>
                </tr>
                <tr>
                  <td>Task Specialization</td>
                  <td>Optimizing for particular tasks</td>
                  <td>Code completion model for a specific programming language</td>
                </tr>
                <tr>
                  <td>Behavior Alignment</td>
                  <td>Ensuring model follows specific guidelines</td>
                  <td>Content moderation AI trained to identify policy violations</td>
                </tr>
              </tbody>
            </table>

            <h5>Fine-tuning Process</h5>
            <ol>
              <li><strong>Data Collection:</strong> Gathering high-quality examples that represent desired outputs.</li>
              <li><strong>Data Formatting:</strong> Converting to prompt-completion pairs in the proper format.</li>
              <li><strong>Training Configuration:</strong> Setting hyperparameters (learning rate, epochs, batch size).</li>
              <li><strong>Fine-tuning Execution:</strong> Running the training process.</li>
              <li><strong>Evaluation:</strong> Testing the model against evaluation metrics.</li>
              <li><strong>Iteration:</strong> Refining the dataset and parameters based on results.</li>
            </ol>

            <graphic type="bar-diagram" title="Fine-tuning Process">
              <item label="Base Model" color="#4f46e5" width="15%"/>
              <item label="Training Data" color="#10b981" width="20%"/>
              <item label="Fine-tuning" color="#f59e0b" width="30%"/>
              <item label="Evaluation" color="#ef4444" width="20%"/>
              <item label="Deployment" color="#8b5cf6" width="15%"/>
            </graphic>

            <p><strong>Interview Tip:</strong> Discuss the trade-offs between different fine-tuning approaches, emphasizing that the choice depends on computational resources, amount of training data, and degree of specialization needed.</p>
          `,
          codeExample: `
// LoRA fine-tuning example using Transformers library (pseudocode)
import { Trainer, TrainingArguments } from 'transformers';
import { PeftConfig, LoraConfig, get_peft_model } from 'peft';

async function fineTuneLLM() {
  // 1. Load base model
  const model = await AutoModelForCausalLM.from_pretrained(
    "mistralai/Mistral-7B-v0.1",
    { 
      device_map: "auto",
      load_in_8bit: true
    }
  );
  
  // 2. Configure LoRA adaptation
  const loraConfig = new LoraConfig({
    r: 16,                // Rank of update matrices
    lora_alpha: 32,       // Parameter for scaling
    target_modules: ["q_proj", "v_proj"],  // Which layers to fine-tune
    bias: "none",
    task_type: "CAUSAL_LM"
  });
  
  // 3. Apply LoRA configuration
  const modelToFineTune = get_peft_model(model, loraConfig);
  
  // 4. Prepare training arguments
  const trainingArgs = new TrainingArguments({
    output_dir: "./fine-tuned-model",
    num_train_epochs: 3,
    per_device_train_batch_size: 4,
    gradient_accumulation_steps: 4,
    learning_rate: 2e-4,
    weight_decay: 0.001,
    save_steps: 500,
    logging_steps: 100,
  });
  
  // 5. Create trainer
  const trainer = new Trainer({
    model: modelToFineTune,
    train_dataset: trainDataset,
    args: trainingArgs,
  });
  
  // 6. Train model
  await trainer.train();
  
  // 7. Save fine-tuned model
  await modelToFineTune.save_pretrained("./fine-tuned-model");
  
  return "./fine-tuned-model";
}
          `,
          exercise: {
            instructions:
              "Design a script for fine-tuning a language model to generate customer service responses in a specific company's style and tone, using a small dataset of example interactions.",
          },
        },
      ],
      prepperSummary: `
        <div class="prepper-summary">
          <h3>🔑 Key Interview Takeaways</h3>
          <ul>
            <li><strong>AI Basics:</strong> Understand AI's definition, scope, and how it differs from traditional programming.</li>
            <li><strong>Technologies:</strong> Master prompts, LLMs, tokens, and GPU usage for practical AI applications.</li>
            <li><strong>Development:</strong> Be proficient with training (PyTorch/TensorFlow) and integrating AI into apps.</li>
            <li><strong>Context & Generation:</strong> Explain how context works in conversations and how images are generated.</li>
          </ul>

          <h4>📝 Common Interview Questions</h4>
          <ol>
            <li>"What is AI, and how does it differ from traditional software?"</li>
            <li>"How would you craft a prompt for a chatbot to get accurate responses?"</li>
            <li>"Explain how transformers work in LLMs."</li>
            <li>"What's the role of GPUs in AI computation?"</li>
            <li>"How does context improve AI conversations?"</li>
            <li>"Describe how diffusion models generate images."</li>
            <li>"Walk me through training a simple neural network."</li>
            <li>"How would you integrate an AI feature into a web application?"</li>
            <li>"What AI libraries have you used, and for what purpose?"</li>
            <li>"How do masters and agents work in an AI system?"</li>
          </ol>
        </div>
      `,
    },
  ],
  challenge: {
    description:
      "Build an 'AI Developer Toolkit' app that demonstrates your mastery of AI concepts for an interview scenario.",
    requirements: [
      'Create a Vue.js app with a chatbot feature using a mock API.',
      'Implement context retention for multi-turn conversations.',
      'Add a simple image generation simulator based on text input.',
      'Use tokenization to process user inputs.',
      'Include a PyTorch-like pseudo-code example for training a model.',
      'Optimize performance with memoization or async handling.',
      'Provide a clean UI with graphical representations of AI concepts.',
    ],
    starterCode: `
// App.vue - AI Developer Toolkit Challenge
<template>
  <div class="ai-toolkit">
    <h1>AI Developer Toolkit</h1>
    <ChatBot />
    <ImageGenerator />
  </div>
</template>

<script>
import ChatBot from './components/ChatBot.vue';
import ImageGenerator from './components/ImageGenerator.vue';

export default {
  components: { ChatBot, ImageGenerator }
}
</script>

// components/ChatBot.vue
<template>
  <div>
    <input v-model="message" @keyup.enter="sendMessage" placeholder="Chat with AI...">
    <div v-for="(msg, i) in history" :key="i" :class="msg.role">
      {{ msg.content }}
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data: () => ({
    message: '',
    history: []
  }),
  methods: {
    async sendMessage() {
      this.history.push({ role: 'user', content: this.message });
      const res = await axios.post('/api/chat', { messages: this.history });
      this.history.push({ role: 'ai', content: res.data.response });
      this.message = '';
    }
  }
}
</script>

// components/ImageGenerator.vue
// Your implementation here
    `,
  },
}

export default shortlistPrepper
