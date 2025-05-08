// curriculum-section4.js - Asynchronous JavaScript

const asynchronousJavaScript = {
  title: 'Asynchronous JavaScript',
  description: 'Master callbacks, promises, async/await, and handling asynchronous operations.',
  lessons: [
    {
      title: 'Understanding Asynchronous Programming',
      description: 'Learn the fundamentals of asynchronous execution in JavaScript.',
      sections: [
        {
          title: 'Synchronous vs. Asynchronous Code',
          explanation: `
        <p>JavaScript's single-threaded nature combined with its asynchronous capabilities is what makes it so powerful for web applications. Understanding this core concept is essential for writing efficient code.</p>
        
        <h4>Execution Models</h4>
        <p>JavaScript code can run in two fundamental ways: synchronously (blocking) or asynchronously (non-blocking).</p>
        
        <p><strong>Synchronous execution</strong> runs code in sequence, with each statement completing before the next begins. This is intuitive but can lead to performance problems when operations take time to complete.</p>
        
        <p><strong>Asynchronous execution</strong> allows JavaScript to initiate an operation, continue running other code, and then handle the result of the original operation when it completes. This prevents blocking and keeps applications responsive.</p>
        
        <p>The key difference is that synchronous code waits for operations to complete, while asynchronous code continues execution and handles the results later through callbacks, promises, or async/await syntax.</p>
        
        <div class="code-example">
          <pre><code>// Synchronous execution (blocking)
console.log("First");
console.log("Second");
console.log("Third");
// Output appears in order: First, Second, Third

// Asynchronous execution (non-blocking)
console.log("Start");

setTimeout(() => {
  console.log("This runs later");
}, 1000);

console.log("End");
// Output: Start, End, (after 1 second) This runs later</code></pre>
        </div>
        
        <h4>The JavaScript Event Loop</h4>
        <p>The event loop is the mechanism that enables JavaScript's asynchronous behavior despite being single-threaded. It's what allows JavaScript to perform non-blocking operations even though it has only one main thread of execution.</p>
        
        <p>Here's how it works:</p>
        <ol>
          <li>The call stack executes synchronous code in order</li>
          <li>Asynchronous operations are delegated to browser/Node.js APIs</li>
          <li>When these operations complete, their callbacks enter a task queue</li>
          <li>The event loop checks if the call stack is empty, and if so, moves callbacks from the queue to the stack</li>
          <li>This process continues indefinitely, allowing JavaScript to handle asynchronous operations</li>
        </ol>
        
        <p>Understanding the priority between the callback queue (macrotasks like setTimeout) and microtask queue (Promises) is crucial for predicting execution order in complex applications.</p>
        
        <div class="code-example">
          <pre><code>console.log("Script start");

// Macrotask (pushed to task queue)
setTimeout(() => {
  console.log("setTimeout callback");
}, 0);

// Microtask (pushed to microtask queue)
Promise.resolve().then(() => {
  console.log("Promise resolved");
});

console.log("Script end");

// Output:
// Script start
// Script end
// Promise resolved
// setTimeout callback</code></pre>
        </div>
        
        <div class="interview-tip">
          <p><span class="interview-icon">🎯</span> <strong>Interview Focus:</strong> You'll often be asked to explain how JavaScript handles asynchronous operations.</p>
          <p>Key points to understand:</p>
          <ul>
            <li>Call stack, event loop, callback queue, and how they work together</li>
            <li>The difference between microtasks (Promise callbacks) and macrotasks (setTimeout, setInterval)</li>
            <li>How to predict the execution order of mixed synchronous and asynchronous code</li>
            <li>How to avoid blocking the main thread with long-running operations</li>
            <li>Why JavaScript doesn't pause execution while waiting for asynchronous operations</li>
          </ul>
        </div>
      `,
          codeExample: `// Detailed event loop demonstration with explanations

// This example demonstrates how JavaScript handles different types
// of tasks in the event loop

console.log("1. Script start"); // Synchronous - runs immediately

// Scheduling a macrotask with setTimeout (0ms delay)
setTimeout(() => {
  console.log("4. setTimeout callback (macrotask)");
  
  // Nested promises inside a macrotask
  Promise.resolve().then(() => {
    console.log("5. Nested promise in setTimeout (microtask)");
  });
}, 0);

// Creating a promise that resolves immediately
Promise.resolve().then(() => {
  console.log("3. First promise callback (microtask)");
  
  // Nested promise (chained) - stays in the microtask queue
  Promise.resolve().then(() => {
    console.log("6. Nested promise chain (microtask)");
  });
});

// Another macrotask, scheduled after the first one
setTimeout(() => {
  console.log("7. Second setTimeout callback (macrotask)");
}, 0);

// Synchronous code executes immediately
console.log("2. Script end");

// Output sequence with explanation:
// 1. Script start       - Synchronous code runs first
// 2. Script end         - Synchronous code continues
// 3. First promise      - Microtasks run after all synchronous code
// 6. Nested promise     - All microtasks complete before any macrotasks
// 4. setTimeout callback - Macrotasks run after microtasks are empty
// 5. Nested promise     - New microtasks created during macrotask execution
//                        run before the next macrotask
// 7. Second setTimeout  - The next macrotask runs after microtasks are empty

// Additional event loop examples:

// Simulating a CPU-intensive task (blocking)
function blockFor(ms) {
  const start = Date.now();
  while (Date.now() - start < ms) {
    // Blocking the main thread
  }
}

// Simulating an asynchronous operation (non-blocking)
function simulateAsyncOperation(callback, ms) {
  setTimeout(callback, ms);
}

console.log("Starting operations...");

// This blocks the main thread for 1 second
console.log("Starting blocking operation");
blockFor(1000);
console.log("Blocking operation complete");

// This doesn't block the main thread
console.log("Starting async operation");
simulateAsyncOperation(() => {
  console.log("Async operation complete");
}, 1000);
console.log("Async operation initiated");`,
          exercise: {
            instructions:
              'Analyze and predict the execution order of a mixed synchronous and asynchronous code snippet. Create a series of nested setTimeout and Promise callbacks, then explain the exact order they will execute in and why. Implement a function that demonstrates how a CPU-intensive task can block the main thread, contrasted with an asynchronous approach to the same problem.',
          },
        },
        {
          title: 'Callbacks and Callback Patterns',
          explanation: `
        <p>Callbacks are functions passed to other functions to be executed later, forming the foundation of asynchronous JavaScript. They allow you to specify what happens after an operation completes.</p>
        
        <h4>Basic Callback Structure</h4>
        <p>At its core, a callback is just a function passed as an argument to another function. The receiving function decides when to call it, typically after completing an asynchronous operation.</p>
        
        <p>Callbacks provide a way to handle the results of asynchronous operations, but they come with several challenges:</p>
        <ul>
          <li><strong>Inversion of control</strong> - You're trusting the receiving function to call your callback correctly</li>
          <li><strong>Callback timing</strong> - It's not always clear when callbacks will execute</li>
          <li><strong>Error propagation</strong> - Traditional try/catch doesn't work across asynchronous boundaries</li>
          <li><strong>Debugging complexity</strong> - Stack traces can be harder to understand with callbacks</li>
        </ul>
        
        <div class="code-example">
          <pre><code>// Basic callback example
function fetchData(callback) {
  // Simulate network request
  setTimeout(() => {
    const data = { name: "John", age: 30 };
    callback(data);
  }, 1000);
}

fetchData(function(data) {
  console.log("Data received:", data);
});

// Using arrow functions
fetchData(data => console.log("Data received:", data));</code></pre>
        </div>
        
        <h4>Error-First Pattern</h4>
        <p>The error-first callback pattern (also called Node.js style callbacks) has become a standard for handling errors in asynchronous operations. This pattern places the error as the first parameter of the callback, making error handling explicit and consistent.</p>
        
        <p>When using error-first callbacks:</p>
        <ol>
          <li>The first parameter is reserved for an error object (null if no error occurred)</li>
          <li>Subsequent parameters contain successful results</li>
          <li>Callbacks should always check the error parameter first</li>
          <li>Functions should either pass an error or a result, but never both</li>
        </ol>
        
        <div class="code-example">
          <pre><code>// Error-first callback pattern
function readFile(path, callback) {
  // Simulate file reading
  setTimeout(() => {
    if (!path || path.length === 0) {
      callback(new Error("Invalid file path"));
      return;
    }
    
    const content = "File content for " + path;
    callback(null, content);
  }, 500);
}

// Using the error-first pattern
readFile("/path/to/file", (error, content) => {
  if (error) {
    console.error("Error reading file:", error);
    return;
  }
  
  console.log("File content:", content);
});</code></pre>
        </div>
        
        <h4>Callback Hell</h4>
        <p>Also known as the "pyramid of doom," callback hell occurs when multiple asynchronous operations need to be nested within each other, creating deeply indented code that's difficult to read and maintain.</p>
        
        <p>The challenges of callback hell include:</p>
        <ul>
          <li><strong>Readability</strong> - Deeply nested code becomes harder to understand</li>
          <li><strong>Error handling</strong> - Each level needs its own error handling</li>
          <li><strong>Variable scope</strong> - Managing variable scope across multiple levels</li>
          <li><strong>Sequential reasoning</strong> - It's harder to follow the flow of execution</li>
          <li><strong>Maintainability</strong> - Making changes becomes more error-prone</li>
        </ul>
        
        <div class="code-example">
          <pre><code>// Callback hell example
getUserData(userId, (userError, user) => {
  if (userError) {
    console.error(userError);
    return;
  }
  
  getOrderHistory(user.id, (orderError, orders) => {
    if (orderError) {
      console.error(orderError);
      return;
    }
    
    getProductDetails(orders[0].productId, (productError, product) => {
      if (productError) {
        console.error(productError);
        return;
      }
      
      // Deeply nested, hard to follow
      console.log(\`\${user.name} ordered \${product.name}\`);
    });
  });
});</code></pre>
        </div>
        
        <div class="interview-tip">
          <p><span class="interview-icon">🎯</span> <strong>Interview Focus:</strong> You should be able to recognize and refactor callback hell code.</p>
          <p>Key points to understand:</p>
          <ul>
            <li>The error-first callback pattern and why it's used in Node.js</li>
            <li>Techniques for avoiding callback hell (named functions, promises, async/await)</li>
            <li>Proper error handling in callback-based code</li>
            <li>How to implement your own functions that accept callbacks</li>
            <li>Identifying the problems with deeply nested callbacks</li>
          </ul>
        </div>
      `,
          codeExample: `// Callback patterns and solutions for callback hell

// 1. Simple error-first callback example (Node.js pattern)
function fetchUserData(userId, callback) {
  // Validate input
  if (!userId) {
    process.nextTick(() => callback(new Error("UserId is required")));
    return;
  }
  
  // Simulate API request
  setTimeout(() => {
    // Simulate occasional errors
    if (userId === 999) {
      callback(new Error("User not found"));
      return;
    }
    
    const userData = {
      id: userId,
      name: \`User \${userId}\`,
      email: \`user\${userId}@example.com\`
    };
    
    callback(null, userData);
  }, 300);
}

// 2. Function that implements a retry mechanism with callbacks
function fetchWithRetry(operation, maxRetries, delay, callback) {
  let retries = 0;
  
  function attempt() {
    operation((error, result) => {
      // If successful or we've hit max retries, return the result
      if (!error || retries >= maxRetries) {
        callback(error, result);
        return;
      }
      
      // Increment retries and try again after delay
      retries++;
      console.log(\`Retry \${retries} after \${delay}ms\`);
      
      setTimeout(attempt, delay);
    });
  }
  
  // Start the first attempt
  attempt();
}

// 3. Multiple callbacks solution - named functions
function getUserDetails(userId, finalCallback) {
  // Breaking callback hell into named functions
  function handleUserData(error, user) {
    if (error) {
      finalCallback(error);
      return;
    }
    
    console.log("User data received:", user.name);
    getOrderHistory(user.id, handleOrderHistory);
  }
  
  function handleOrderHistory(error, orders) {
    if (error) {
      finalCallback(error);
      return;
    }
    
    console.log("Order history received:", orders.length, "orders");
    
    if (orders.length === 0) {
      finalCallback(null, { user, orders: [] });
      return;
    }
    
    getProductDetails(orders[0].productId, handleProductDetails);
  }
  
  function handleProductDetails(error, product) {
    if (error) {
      finalCallback(error);
      return;
    }
    
    console.log("Product details received:", product.name);
    finalCallback(null, { user, orders, product });
  }
  
  // Start the sequence
  fetchUserData(userId, handleUserData);
}

// 4. Control flow with parallel operations
function getMultipleUserData(userIds, callback) {
  const results = [];
  let completed = 0;
  let hasError = false;
  
  // Handle empty array
  if (userIds.length === 0) {
    process.nextTick(() => callback(null, []));
    return;
  }
  
  // Process each userId in parallel
  userIds.forEach((userId, index) => {
    fetchUserData(userId, (error, userData) => {
      // If we already had an error, don't process further
      if (hasError) return;
      
      if (error) {
        hasError = true;
        callback(error);
        return;
      }
      
      // Store result at correct index to maintain order
      results[index] = userData;
      completed++;
      
      // When all operations complete, return the results
      if (completed === userIds.length) {
        callback(null, results);
      }
    });
  });
}

// 5. Limited concurrency with callbacks
function fetchAllWithConcurrency(items, operation, concurrency, callback) {
  let running = 0;
  let completed = 0;
  let index = 0;
  const results = [];
  
  // Handle empty array
  if (items.length === 0) {
    process.nextTick(() => callback(null, []));
    return;
  }
  
  // Start initial batch of operations up to concurrency limit
  function startNext() {
    while (running < concurrency && index < items.length) {
      const currentIndex = index++;
      running++;
      
      // Start operation for this item
      operation(items[currentIndex], (error, result) => {
        // Store the result
        results[currentIndex] = error || result;
        
        // Update counters
        running--;
        completed++;
        
        // If all done, call the final callback
        if (completed === items.length) {
          callback(null, results);
        } else {
          // Otherwise start more operations
          startNext();
        }
      });
    }
  }
  
  // Begin processing
  startNext();
}

// Sample data and usage examples
const userIds = [1, 2, 3, 4, 5];

// Using fetchWithRetry
fetchWithRetry(
  callback => fetchUserData(999, callback), // This will fail
  3, // max retries
  500, // delay between retries
  (error, result) => {
    if (error) {
      console.log("All retries failed:", error.message);
    } else {
      console.log("Operation succeeded after retries:", result);
    }
  }
);

// Using getMultipleUserData for parallel operations
getMultipleUserData(userIds, (error, users) => {
  if (error) {
    console.error("Error fetching users:", error);
    return;
  }
  
  console.log("All users fetched:", users.length);
});

// Using fetchAllWithConcurrency to limit parallel operations
fetchAllWithConcurrency(
  userIds,
  (userId, callback) => fetchUserData(userId, callback),
  2, // Only 2 operations run in parallel
  (error, results) => {
    if (error) {
      console.error("Error in concurrent operations:", error);
      return;
    }
    
    console.log("All operations completed with concurrency limit");
  }
);`,
          exercise: {
            instructions:
              'Implement a robust error-first callback pattern for loading user data from a server. Create a flow control utility that processes an array of items in sequence with callbacks. Implement a parallel processing utility that limits the number of concurrent operations. Create a retry mechanism that attempts an operation multiple times with exponential backoff before giving up.',
          },
        },
      ],
      prepperSummary: `
    <div class="prepper-summary">
      <h3>🔑 Key Interview Takeaways</h3>
      <ul>
        <li><strong>Execution Model:</strong> JavaScript is single-threaded, but uses the event loop to handle asynchronous operations without blocking execution.</li>
        
        <li><strong>Event Loop:</strong> Understand the order of operations in the event loop: synchronous code, microtasks (Promises), then macrotasks (setTimeout, I/O operations).</li>
        
        <li><strong>Callbacks:</strong> Callbacks are the foundation of asynchronous JavaScript, allowing functions to be executed after operations complete.</li>
        
        <li><strong>Error-First Pattern:</strong> The standard pattern for handling errors in asynchronous operations, especially in Node.js.</li>
        
        <li><strong>Callback Hell:</strong> The challenge of deeply nested callbacks and techniques to avoid it through refactoring, named functions, and modern asynchronous patterns.</li>
      </ul>
      
      <h4>📝 Common Interview Questions</h4>
      <ol>
        <li>"Explain the event loop in JavaScript and how it handles asynchronous operations."</li>
        <li>"What's the difference between synchronous and asynchronous code execution?"</li>
        <li>"How do microtasks and macrotasks differ in the event loop?"</li>
        <li>"How would you implement the error-first callback pattern?"</li>
        <li>"What techniques can you use to avoid callback hell?"</li>
      </ol>
    </div>
  `,
    }, // end of lesson 1
    {
      title: 'Promises',
      description: 'Master JavaScript Promises for better async code organization.',
      sections: [
        {
          title: 'Promise Basics',
          explanation: `
        <p>Promises provide a cleaner way to handle asynchronous operations and avoid callback hell. They represent a value that may not be available yet but will be resolved at some point in the future.</p>
        
        <h4>Promise States and Structure</h4>
        <p>A Promise is an object representing an asynchronous operation's eventual completion or failure. Promises provide better composability and error handling than traditional callbacks.</p>
        
        <p>Every Promise exists in one of three states:</p>
        <ul>
          <li><strong>Pending</strong> - Initial state, the operation has not completed yet</li>
          <li><strong>Fulfilled</strong> - The operation completed successfully, yielding a value</li>
          <li><strong>Rejected</strong> - The operation failed, yielding an error reason</li>
        </ul>
        
        <p>Once a Promise is fulfilled or rejected, it's considered "settled" and its state can never change again. This immutability is crucial for reliable asynchronous programming.</p>
        
        <p>Promise objects have these key methods:</p>
        <ul>
          <li><strong>then()</strong> - Attaches callbacks for fulfillment and/or rejection</li>
          <li><strong>catch()</strong> - Shorthand for then(null, onRejected)</li>
          <li><strong>finally()</strong> - Attaches a callback regardless of outcome</li>
        </ul>
        
        <div class="code-example">
          <pre><code>// Creating a Promise
const promise = new Promise((resolve, reject) => {
  // Asynchronous operation
  if (/* operation successful */) {
    resolve('Success!'); // Fulfilled state
  } else {
    reject(new Error('Failed!')); // Rejected state
  }
  // While executing: Pending state
});

// Consuming a Promise
promise
  .then(result => {
    console.log(result); // Handle success
  })
  .catch(error => {
    console.error(error); // Handle error
  })
  .finally(() => {
    // Clean up (executed regardless of outcome)
  });</code></pre>
        </div>
        
        <h4>Chaining Promises</h4>
        <p>One of the most powerful features of Promises is their chainability. Each call to .then() creates and returns a new Promise, enabling elegant sequential asynchronous operations without nested callbacks.</p>
        
        <p>When chaining Promises:</p>
        <ol>
          <li>Each .then() returns a new Promise that resolves with the return value of its callback</li>
          <li>Return values are automatically wrapped in Promises if they aren't already</li>
          <li>Returning a Promise inside .then() will cause the next .then() to wait for that Promise</li>
          <li>Errors propagate down the chain until caught by a .catch() handler</li>
        </ol>
        
        <div class="code-example">
          <pre><code>// Promise chain example
fetchUserData(userId)
  .then(user => {
    console.log(user.name);
    return fetchUserOrders(user.id); // Return another promise
  })
  .then(orders => {
    console.log(\`Found \${orders.length} orders\`);
    return fetchOrderDetails(orders[0].id); // Return yet another promise
  })
  .then(details => {
    console.log('Order details:', details);
  })
  .catch(error => {
    // A single catch for any error in the chain
    console.error('Error:', error);
  });</code></pre>
        </div>
        
        <h4>Converting Callbacks to Promises</h4>
        <p>"Promisification" is the process of converting callback-based functions to return Promises. This technique is essential for integrating legacy code with modern Promise-based or async/await code.</p>
        
        <p>When promisifying a function:</p>
        <ul>
          <li>Create and return a new Promise</li>
          <li>Inside the executor function, call the original function with a callback</li>
          <li>The callback should resolve or reject the Promise based on results</li>
          <li>For error-first callbacks, reject on error and resolve with the result</li>
        </ul>
        
        <div class="code-example">
          <pre><code>// Callback version
function readFileCallback(path, callback) {
  fs.readFile(path, 'utf8', callback);
}

// Promisified version
function readFilePromise(path) {
  return new Promise((resolve, reject) => {
    fs.readFile(path, 'utf8', (err, data) => {
      if (err) reject(err);
      else resolve(data);
    });
  });
}

// Using the Promise version
readFilePromise('config.json')
  .then(data => JSON.parse(data))
  .then(config => console.log('Config loaded:', config))
  .catch(error => console.error('Error loading config:', error));</code></pre>
        </div>
        
        <div class="interview-tip">
          <p><span class="interview-icon">🎯</span> <strong>Interview Focus:</strong> Understanding Promise states, chaining, and error handling is crucial.</p>
          <p>Key points to understand:</p>
          <ul>
            <li>The three states of a Promise: pending, fulfilled, rejected</li>
            <li>How to properly chain promises and avoid common mistakes</li>
            <li>Error propagation through Promise chains</li>
            <li>Converting callback-based functions to Promise-based ones</li>
            <li>The difference between .then(success, error) and .then(success).catch(error)</li>
          </ul>
        </div>
      `,
          codeExample: `// Comprehensive Promise Examples

// 1. Creating promises and handling states
function fetchUserData(userId) {
  return new Promise((resolve, reject) => {
    // Simulating an API request
    setTimeout(() => {
      if (userId && typeof userId === 'number') {
        // Success case
        resolve({
          id: userId,
          name: \`User \${userId}\`,
          email: \`user\${userId}@example.com\`,
          lastLogin: new Date()
        });
      } else {
        // Error case
        reject(new Error('Invalid user ID'));
      }
    }, 300);
  });
}

// Usage: success case
fetchUserData(123)
  .then(user => {
    console.log('User data:', user);
  })
  .catch(error => {
    console.error('Error fetching user:', error.message);
  })
  .finally(() => {
    console.log('User data fetch operation complete');
  });

// Usage: error case
fetchUserData('invalid')
  .then(user => {
    console.log('User data:', user); // This won't execute
  })
  .catch(error => {
    console.error('Error fetching user:', error.message); // This will execute
  });

// 2. Converting callback-based API to Promise-based
function readFile(filename, encoding = 'utf8') {
  return new Promise((resolve, reject) => {
    // Simulate the Node.js fs.readFile function
    setTimeout(() => {
      if (!filename || typeof filename !== 'string') {
        reject(new Error('Invalid filename'));
        return;
      }
      
      if (filename.includes('nonexistent')) {
        reject(new Error('File not found'));
        return;
      }
      
      resolve(\`Content of \${filename}\`);
    }, 200);
  });
}

// 3. Promise chaining with data transformation
function validateAndProcessUser(userId) {
  return fetchUserData(userId)
    .then(user => {
      // Transform the user data
      return {
        ...user,
        formattedName: user.name.toUpperCase(),
        isActive: user.lastLogin > new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)
      };
    })
    .then(enhancedUser => {
      // Do something with the enhanced user
      console.log('Enhanced user:', enhancedUser);
      
      // Return a different result for the next chain
      return {
        userId: enhancedUser.id,
        status: enhancedUser.isActive ? 'active' : 'inactive'
      };
    });
}

// 4. Error handling in Promise chains
function processUserWithErrorHandling(userId) {
  return fetchUserData(userId)
    .then(user => {
      console.log('Processing user:', user.name);
      
      // Simulate an error in processing
      if (user.id === 500) {
        throw new Error('User requires special processing');
      }
      
      return user;
    })
    .then(
      user => {
        // Success handler for the previous step
        console.log('User processed successfully');
        return { success: true, user };
      }
    )
    .catch(error => {
      // Handle any error in the chain
      console.error('Error in processing:', error.message);
      
      // You can recover from errors
      return { success: false, error: error.message };
    })
    .finally(() => {
      // This always runs
      console.log('Processing complete');
    });
}

// 5. Common mistake: not returning in Promise chains
function incorrectChaining() {
  return fetchUserData(123)
    .then(user => {
      // MISTAKE: Missing return, creating a broken chain
      validateUser(user); // This returns a promise that gets ignored
    })
    .then(result => {
      // result will be undefined, not the result of validateUser
      console.log('Validation result:', result);
    });
}

function correctChaining() {
  return fetchUserData(123)
    .then(user => {
      // CORRECT: Return the promise to continue the chain
      return validateUser(user);
    })
    .then(result => {
      // result will be the resolved value from validateUser
      console.log('Validation result:', result);
    });
}

// 6. Promise utility methods
// Create a rejected promise
Promise.reject(new Error('Immediately rejected'))
  .catch(error => console.error('Caught rejection:', error.message));

// Create a resolved promise
Promise.resolve('Immediately resolved')
  .then(value => console.log('Resolved value:', value));

// Helper for simulating promise-based validation
function validateUser(user) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ isValid: true, user });
    }, 100);
  });
}

// 7. Returning values from catch blocks
function recoverFromError() {
  return Promise.reject(new Error('Something went wrong'))
    .catch(error => {
      console.error('Error occurred:', error.message);
      // Return a fallback value
      return 'Fallback value';
    })
    .then(result => {
      // result will be 'Fallback value'
      console.log('Final result:', result);
    });
}

// 8. Demonstrating Promise execution order vs. callbacks
console.log('Script start');

setTimeout(() => {
  console.log('setTimeout (macrotask)');
}, 0);

Promise.resolve()
  .then(() => console.log('Promise 1 (microtask)'))
  .then(() => console.log('Promise 2 (microtask)'));

console.log('Script end');

// Output order:
// 1. Script start
// 2. Script end
// 3. Promise 1 (microtask)
// 4. Promise 2 (microtask)
// 5. setTimeout (macrotask)`,
          exercise: {
            instructions:
              'Create a user authentication system using Promises for async operations. Implement the following functionality: 1) A function to validate credentials, 2) A function to fetch user data if validation succeeds, 3) A function to retrieve user permissions, and 4) Proper error handling at each step with appropriate error messages. Then chain these operations together in a login process that returns a user session object if successful.',
          },
        },
        {
          title: 'Promise Composition',
          explanation: `
        <p>When dealing with multiple promises, JavaScript provides several methods to compose them in powerful ways. These composition techniques allow for complex asynchronous workflows.</p>
        
        <h4>Promise.all()</h4>
        <p>Promise.all() takes an iterable of Promises and returns a new Promise that fulfills when all input Promises fulfill or rejects when any of them reject.</p>
        
        <p>Key characteristics of Promise.all():</p>
        <ul>
          <li>Parallel execution - all Promises run concurrently</li>
          <li>Order preservation - results array maintains the same order as the input Promises</li>
          <li>Fail-fast behavior - rejects immediately if any Promise rejects</li>
          <li>All-or-nothing results - either all results or an error</li>
        </ul>
        
        <p>This method is ideal for operations that are independent but all required, like loading multiple resources that are all needed for the next step.</p>
        
        <div class="code-example">
          <pre><code>// Execute multiple promises in parallel
const promiseA = fetchUserProfile(userId);
const promiseB = fetchUserPosts(userId);
const promiseC = fetchUserFollowers(userId);

Promise.all([promiseA, promiseB, promiseC])
  .then(([profile, posts, followers]) => {
    // All promises are fulfilled
    console.log(\`\${profile.name} has \${posts.length} posts and \${followers.length} followers\`);
  })
  .catch(error => {
    // If ANY promise rejects, catch will be triggered
    console.error('An error occurred:', error);
  });</code></pre>
        </div>
        
        <h4>Promise.race()</h4>
        <p>Promise.race() takes an iterable of Promises and returns a new Promise that settles with the same outcome as the first Promise to settle, whether fulfilled or rejected.</p>
        
        <p>Common uses for Promise.race():</p>
        <ul>
          <li>Implementing timeouts for operations that might take too long</li>
          <li>Taking the result from whichever source responds first</li>
          <li>Fallback mechanisms where multiple alternatives are tried simultaneously</li>
          <li>Cancellation patterns when combined with a user-triggered cancel Promise</li>
        </ul>
        
        <p>Promise.race() is valuable when you need the fastest result or want to limit the time an operation can take.</p>
        
        <div class="code-example">
          <pre><code>// Setting up a timeout for a fetch operation
function fetchWithTimeout(url, timeout = 5000) {
  const fetchPromise = fetch(url);
  
  const timeoutPromise = new Promise((_, reject) => {
    setTimeout(() => {
      reject(new Error(\`Request timed out after \${timeout}ms\`));
    }, timeout);
  });
  
  return Promise.race([fetchPromise, timeoutPromise]);
}

fetchWithTimeout('https://api.example.com/data', 3000)
  .then(response => response.json())
  .then(data => console.log('Data:', data))
  .catch(error => console.error('Error:', error.message));</code></pre>
        </div>
        
        <h4>Promise.allSettled()</h4>
        <p>Introduced in ES2020, Promise.allSettled() waits for all Promises to settle regardless of whether they fulfill or reject, providing a detailed outcome for each.</p>
        
        <p>Benefits of Promise.allSettled():</p>
        <ul>
          <li>Complete results - get outcomes from all operations, even if some fail</li>
          <li>Detailed reporting - each result includes status and value/reason</li>
          <li>Non-failing - the allSettled Promise itself never rejects</li>
          <li>Batch processing - ideal for processing sets where partial success is acceptable</li>
        </ul>
        
        <p>This method is perfect for scenarios where you want to attempt multiple operations and handle their individual successes or failures.</p>
        
        <div class="code-example">
          <pre><code>// Getting results from multiple operations, even if some fail
const promises = [
  fetchUserData(1),  // Succeeds
  fetchUserData(2),  // Succeeds
  fetchUserData(999) // Fails
];

Promise.allSettled(promises)
  .then(results => {
    results.forEach((result, index) => {
      if (result.status === 'fulfilled') {
        console.log(\`Promise \${index} succeeded with value:\`, result.value);
      } else if (result.status === 'rejected') {
        console.log(\`Promise \${index} failed with error:\`, result.reason);
      }
    });
  });</code></pre>
        </div>
        
        <h4>Promise.any()</h4>
        <p>Added in ES2021, Promise.any() returns a Promise that fulfills when any of the input Promises fulfills, or rejects if all Promises reject.</p>
        
        <p>Promise.any() is useful for:</p>
        <ul>
          <li>Fallback scenarios - try multiple sources and use the first successful one</li>
          <li>Race conditions where only success matters, not failures</li>
          <li>Redundancy patterns where multiple equivalent alternatives are available</li>
          <li>Optimistic operations where any success is sufficient</li>
        </ul>
        
        <p>Unlike Promise.race(), Promise.any() ignores rejections unless all Promises reject, making it more resilient when you only care about successful outcomes.</p>
        
        <div class="code-example">
          <pre><code>// Try multiple API mirrors and use the first one that responds
const mirrors = [
  fetch('https://mirror1.api.example.com/data'),
  fetch('https://mirror2.api.example.com/data'),
  fetch('https://mirror3.api.example.com/data')
];

Promise.any(mirrors)
  .then(response => response.json())
  .then(data => console.log('Data from first successful mirror:', data))
  .catch(error => {
    // AggregateError if all promises fail
    console.error('All mirrors failed:', error.errors);
  });</code></pre>
        </div>
        
        <div class="interview-tip">
          <p><span class="interview-icon">🎯</span> <strong>Interview Focus:</strong> Understanding when to use each Promise composition method is crucial.</p>
          <p>Key points to understand:</p>
          <ul>
            <li>Promise.all() - When you need all promises to succeed</li>
            <li>Promise.race() - When you need a timeout or want the fastest result</li>
            <li>Promise.allSettled() - When you need results from all promises regardless of success/failure</li>
            <li>Promise.any() - When you need the first successful result from multiple options</li>
            <li>Handling errors appropriately in each composition pattern</li>
          </ul>
        </div>
      `,
          codeExample: `// Advanced Promise Composition Examples

// 1. Parallel data fetching with Promise.all()
async function loadUserDashboard(userId) {
  try {
    console.time('dashboard-load');
    
    // Start all requests in parallel
    const [user, posts, followers, settings] = await Promise.all([
      fetchUser(userId),
      fetchPosts(userId),
      fetchFollowers(userId),
      fetchUserSettings(userId)
    ]);
    
    console.timeEnd('dashboard-load');
    
    return {
      user,
      recentPosts: posts.slice(0, 5),
      followerCount: followers.length,
      settings
    };
  } catch (error) {
    console.error('Dashboard loading failed:', error);
    // Important: re-throw to allow caller to handle
    throw new Error(\`Failed to load dashboard: \${error.message}\`);
  }
}

// 2. Timeout pattern with Promise.race()
function fetchWithTimeout(url, options = {}, timeoutMs = 5000) {
  // Create abort controller for cleanup
  const controller = new AbortController();
  const { signal } = controller;
  
  // Create a timeout promise that rejects
  const timeoutPromise = new Promise((_, reject) => {
    const timeoutId = setTimeout(() => {
      clearTimeout(timeoutId);
      controller.abort(); // Abort the fetch request
      reject(new Error(\`Request timed out after \${timeoutMs}ms\`));
    }, timeoutMs);
  });
  
  // Create the fetch promise with abort signal
  const fetchPromise = fetch(url, {
    ...options,
    signal
  }).then(response => {
    if (!response.ok) {
      throw new Error(\`HTTP error \${response.status}: \${response.statusText}\`);
    }
    return response.json();
  });
  
  // Race the fetch against the timeout
  return Promise.race([fetchPromise, timeoutPromise]);
}

// 3. Handling partial failures with Promise.allSettled()
async function fetchUserNetwork(userId) {
  const userPromises = [
    fetchUser(userId),                     // User data
    fetchFollowers(userId),                // Followers
    fetchFollowing(userId),                // Following
    fetchBlockedUsers(userId),             // Blocked users
    fetchSuggestedFriends(userId)          // Friend suggestions
  ];
  
  // Get results whether they succeed or fail
  const results = await Promise.allSettled(userPromises);
  
  // Parse the results
  const networkData = {
    user: null,
    followers: [],
    following: [],
    blocked: [],
    suggestions: [],
    errors: []
  };
  
  // Extract data or track errors from each result
  results.forEach((result, index) => {
    if (result.status === 'fulfilled') {
      // Store successful results in appropriate place
      const data = result.value;
      
      switch (index) {
        case 0: networkData.user = data; break;
        case 1: networkData.followers = data; break;
        case 2: networkData.following = data; break;
        case 3: networkData.blocked = data; break;
        case 4: networkData.suggestions = data; break;
      }
    } else {
      // Store error information
      networkData.errors.push({
        type: ['user', 'followers', 'following', 'blocked', 'suggestions'][index],
        error: result.reason.message
      });
    }
  });
  
  // Dashboard can still render with partial data
  return networkData;
}

// 4. Finding the fastest source with Promise.any()
async function fetchFromFastestMirror(path) {
  const mirrors = [
    'https://api-us-east.example.com',
    'https://api-us-west.example.com',
    'https://api-eu-central.example.com'
  ];
  
  try {
    // Create fetch promises for each mirror
    const fetchPromises = mirrors.map(baseUrl => 
      fetch(\`\${baseUrl}\${path}\`).then(response => {
        if (!response.ok) {
          throw new Error(\`HTTP error \${response.status}\`);
        }
        return response.json();
      })
    );
    
    // Use the first successful response
    const data = await Promise.any(fetchPromises);
    return data;
  } catch (error) {
    // If all mirrors fail, handle the AggregateError
    console.error('All mirrors failed:', error);
    throw new Error('Unable to fetch data from any mirror');
  }
}

// 5. Sequential vs. Parallel Promise execution
async function demonstratePromisePerformance(userIds) {
  // Sequential execution (slower)
  console.time('sequential');
  const sequentialResults = [];
  
  for (const id of userIds) {
    const user = await fetchUser(id);
    sequentialResults.push(user);
  }
  
  console.timeEnd('sequential');
  
  // Parallel execution with Promise.all (faster)
  console.time('parallel');
  const promises = userIds.map(id => fetchUser(id));
  const parallelResults = await Promise.all(promises);
  console.timeEnd('parallel');
  
  return {
    sequential: sequentialResults,
    parallel: parallelResults
  };
}

// 6. Controlling concurrency with batch processing
async function fetchWithConcurrency(userIds, batchSize = 5) {
  const results = [];
  
  // Process in batches to control concurrency
  for (let i = 0; i < userIds.length; i += batchSize) {
    const batch = userIds.slice(i, i + batchSize);
    console.log(\`Processing batch of \${batch.length} items\`);
    
    // Process current batch in parallel
    const batchPromises = batch.map(id => fetchUser(id));
    const batchResults = await Promise.all(batchPromises);
    
    // Accumulate results
    results.push(...batchResults);
  }
  
  return results;
}

// Helper functions (mocked implementations)
function fetchUser(id) {
  return new Promise(resolve => {
    setTimeout(() => resolve({ id, name: \`User \${id}\` }), 300);
  });
}

function fetchPosts(userId) {
  return new Promise(resolve => {
    setTimeout(() => resolve(
      Array.from({ length: 10 }, (_, i) => ({ id: i, title: \`Post \${i} by user \${userId}\` }))
    ), 300);
  });
}

function fetchFollowers(userId) {
  return new Promise(resolve => {
    setTimeout(() => resolve(
      Array.from({ length: 5 }, (_, i) => ({ id: i, name: \`Follower \${i}\` }))
    ), 200);
  });
}

function fetchFollowing(userId) {
  return new Promise(resolve => {
    setTimeout(() => resolve(
      Array.from({ length: 7 }, (_, i) => ({ id: i, name: \`Following \${i}\` }))
    ), 200);
  });
}

function fetchBlockedUsers(userId) {
  return new Promise(resolve => {
    setTimeout(() => resolve(
      Array.from({ length: 2 }, (_, i) => ({ id: i, name: \`Blocked \${i}\` }))
    ), 150);
  });
}

function fetchSuggestedFriends(userId) {
  return new Promise(resolve => {
    setTimeout(() => resolve(
      Array.from({ length: 3 }, (_, i) => ({ id: i, name: \`Suggestion \${i}\` }))
    ), 350);
  });
}

function fetchUserSettings(userId) {
  return new Promise(resolve => {
    setTimeout(() => resolve({ theme: 'dark', notifications: true }), 200);
  });
}`,
          exercise: {
            instructions:
              'Implement a robust data loading system for a social media application dashboard using Promise composition. Use Promise.all() to load the essential data (user profile, recent posts), Promise.allSettled() for non-critical data (friend suggestions, trending topics), and implement a timeout mechanism using Promise.race(). Create a fallback system that tries multiple data sources using Promise.any() and implement a system for batch processing multiple requests with controlled concurrency.',
          },
        },
      ],
      prepperSummary: `
    <div class="prepper-summary">
      <h3>🔑 Key Interview Takeaways</h3>
      <ul>
        <li><strong>Promise States:</strong> Understand the three states of a Promise: pending, fulfilled, and rejected, and how they transition.</li>
        
        <li><strong>Promise Chaining:</strong> Master how to create clean, readable chains of asynchronous operations with proper error handling.</li>
        
        <li><strong>Error Handling:</strong> Know how errors propagate through Promise chains and the difference between error handling strategies.</li>
        
        <li><strong>Promise Composition:</strong> Understand the different composition methods (all, race, allSettled, any) and when to use each one.</li>
        
        <li><strong>Performance Patterns:</strong> Recognize when to use parallel vs. sequential execution, and how to control concurrency for optimal performance.</li>
      </ul>
      
      <h4>📝 Common Interview Questions</h4>
      <ol>
        <li>"What are the three states of a Promise and how do they transition?"</li>
        <li>"How would you implement a timeout for a fetch request using Promises?"</li>
        <li>"Explain the difference between Promise.all() and Promise.allSettled()"</li>
        <li>"What's the advantage of Promise chaining over nested callbacks?"</li>
        <li>"How would you handle errors in a complex Promise chain?"</li>
      </ol>
    </div>
  `,
    }, // end of lesson 2
    {
      title: 'Async/Await',
      description: 'Learn the modern syntax for working with promises in a more synchronous style.',
      sections: [
        {
          title: 'Async/Await Basics',
          explanation: `
        <p>Async/await is syntactic sugar built on top of Promises that makes asynchronous code look and behave more like synchronous code. It significantly improves code readability and maintainability.</p>
        
        <h4>Fundamentals</h4>
        <p>The async keyword defines a function that automatically returns a Promise, while await pauses execution until a Promise resolves. This powerful combination allows for cleaner, more intuitive asynchronous code.</p>
        
        <p>Key concepts of async/await:</p>
        <ul>
          <li><strong>async functions</strong> always return Promises, wrapping non-Promise return values automatically</li>
          <li><strong>await</strong> can only be used inside async functions (or top-level modules in modern JavaScript)</li>
          <li><strong>await</strong> pauses execution of the current function, not the entire program</li>
          <li>You can await any "thenable" object, not just built-in Promises</li>
          <li>Variables maintain scope and context in a way that's more intuitive than Promise chains</li>
        </ul>
        
        <div class="code-example">
          <pre><code>// Traditional Promise approach
function getUserData(userId) {
  return fetch(\`/api/users/\${userId}\`)
    .then(response => response.json())
    .then(data => {
      console.log(data);
      return data;
    });
}

// Async/await approach - cleaner and more readable
async function getUserData(userId) {
  const response = await fetch(\`/api/users/\${userId}\`);
  const data = await response.json();
  console.log(data);
  return data;
}</code></pre>
        </div>
        
        <h4>Error Handling</h4>
        <p>With async/await, you can use familiar try/catch blocks for error handling, which is a significant improvement over Promise chains for complex logic.</p>
        
        <p>Benefits of async/await error handling:</p>
        <ul>
          <li>Unified error handling for both synchronous and asynchronous errors</li>
          <li>Familiar try/catch syntax that most developers already understand</li>
          <li>Ability to catch errors from multiple await expressions in a single catch block</li>
          <li>Better stack traces that make debugging easier</li>
          <li>Support for finally blocks to ensure cleanup code always runs</li>
        </ul>
        
        <div class="code-example">
          <pre><code>// Error handling with Promises
function processUser(userId) {
  return fetchUser(userId)
    .then(user => {
      return processUserData(user);
    })
    .catch(error => {
      console.error('Failed to process user:', error);
      return { error: true, message: error.message };
    });
}

// Error handling with async/await
async function processUser(userId) {
  try {
    const user = await fetchUser(userId);
    return await processUserData(user);
  } catch (error) {
    console.error('Failed to process user:', error);
    return { error: true, message: error.message };
  }
}</code></pre>
        </div>
        
        <h4>Sequential vs Parallel Execution</h4>
        <p>Understanding how to control execution flow is critical for performance. The linear appearance of async/await code can hide potentially significant performance differences.</p>
        
        <p>Important patterns to understand:</p>
        <ul>
          <li><strong>Sequential execution</strong> - await expressions one after another when operations depend on each other</li>
          <li><strong>Parallel execution</strong> - start all operations before awaiting any of them when operations are independent</li>
          <li><strong>Mixed approach</strong> - sometimes operations have partial dependencies requiring careful orchestration</li>
          <li><strong>Promise.all</strong> - the cleaner way to await multiple independent operations</li>
          <li><strong>Batching</strong> - processing items in controlled batches for optimal performance</li>
        </ul>
        
        <div class="code-example">
          <pre><code>// Sequential execution - one after another
async function getSequentialData() {
  const user = await fetchUser(123);      // Wait for this to complete
  const posts = await fetchPosts(user.id); // Then wait for this
  const comments = await fetchComments(posts[0].id); // Then this
  return { user, posts, comments };
}

// Parallel execution - all at once
async function getParallelData() {
  // Start all fetches in parallel
  const userPromise = fetchUser(123);
  const postsPromise = fetchPosts(123);
  const commentsPromise = fetchComments(789);
  
  // Wait for all to complete
  const user = await userPromise;
  const posts = await postsPromise;
  const comments = await commentsPromise;
  
  return { user, posts, comments };
}

// Using Promise.all for cleaner parallel execution
async function getParallelDataWithPromiseAll() {
  const [user, posts, comments] = await Promise.all([
    fetchUser(123),
    fetchPosts(123),
    fetchComments(789)
  ]);
  
  return { user, posts, comments };
}</code></pre>
        </div>
        
        <div class="interview-tip">
          <p><span class="interview-icon">🎯</span> <strong>Interview Focus:</strong> Understanding async/await mechanics and performance implications.</p>
          <p>Key points to understand:</p>
          <ul>
            <li>Every async function returns a Promise implicitly</li>
            <li>await can only be used inside async functions</li>
            <li>How to properly handle errors with try/catch blocks</li>
            <li>Techniques for running operations in parallel for better performance</li>
            <li>Common pitfalls and mistakes when using async/await</li>
          </ul>
        </div>
      `,
          codeExample: `// Comprehensive Async/Await Examples

// 1. Basic async/await usage
async function getUserData(userId) {
  try {
    // await pauses execution until the promise resolves
    const response = await fetch(\`https://api.example.com/users/\${userId}\`);
    
    // Check for HTTP errors
    if (!response.ok) {
      throw new Error(\`HTTP error! Status: \${response.status}\`);
    }
    
    // Parse JSON data (another promise)
    const userData = await response.json();
    console.log('User data:', userData);
    
    // The return value is automatically wrapped in a promise
    return userData;
  } catch (error) {
    console.error('Error fetching user data:', error);
    throw error; // Re-throw to allow caller to handle
  }
}

// 2. Converting Promise chains to async/await
// Promise chain version
function getCompleteUserData(userId) {
  return fetchUser(userId)
    .then(user => {
      return fetchPosts(user.id)
        .then(posts => {
          user.posts = posts;
          return fetchFollowers(user.id);
        })
        .then(followers => {
          user.followers = followers;
          return user;
        });
    });
}

// Refactored with async/await for better readability
async function getCompleteUserData(userId) {
  const user = await fetchUser(userId);
  user.posts = await fetchPosts(user.id);
  user.followers = await fetchFollowers(user.id);
  return user;
}

// 3. Sequential vs parallel execution
// Sequential execution (slower - each awaits completion before starting next)
async function loadDataSequentially(userId) {
  console.time('sequential');
  
  const user = await fetchUser(userId);
  const posts = await fetchPosts(user.id);
  const followers = await fetchFollowers(user.id);
  
  console.timeEnd('sequential'); // ~900ms (300+300+300)
  return { user, posts, followers };
}

// Parallel execution (faster - all requests start at the same time)
async function loadDataInParallel(userId) {
  console.time('parallel');
  
  // Start all promises in parallel
  const userPromise = fetchUser(userId);
  const postsPromise = fetchPosts(userId);
  const followersPromise = fetchFollowers(userId);
  
  // Wait for all to complete
  const user = await userPromise;
  const posts = await postsPromise;
  const followers = await followersPromise;
  
  console.timeEnd('parallel'); // ~300ms (all running concurrently)
  return { user, posts, followers };
}

// Even cleaner with Promise.all
async function loadDataWithPromiseAll(userId) {
  console.time('promise.all');
  
  const [user, posts, followers] = await Promise.all([
    fetchUser(userId),
    fetchPosts(userId),
    fetchFollowers(userId)
  ]);
  
  console.timeEnd('promise.all'); // ~300ms (same as parallel)
  return { user, posts, followers };
}

// 4. Error handling with try/catch
async function processUserWithErrorHandling(userId) {
  try {
    const user = await fetchUser(userId);
    
    try {
      // Nested try/catch for more granular error handling
      const posts = await fetchPosts(userId);
      return { user, posts, success: true };
    } catch (postError) {
      // Handle posts error but still return user
      console.error('Error fetching posts:', postError);
      return { user, posts: [], success: partial };
    }
  } catch (userError) {
    // Handle user error
    console.error('Error fetching user:', userError);
    return { success: false, error: userError.message };
  } finally {
    // This always runs
    console.log('User processing complete');
  }
}

// 5. Common mistakes and pitfalls

// MISTAKE: Forgetting to await
async function forgettingAwait() {
  try {
    // Missing await - fetchUser returns a Promise but we don't wait for it
    const user = fetchUser(123);
    console.log(user); // Logs a pending Promise, not the user data
    
    // This will fail because user is a Promise, not the resolved data
    return user.name; 
  } catch (error) {
    // This won't catch the error since we didn't await the promise
    console.error('This catch block wont run for the missing await');
  }
}

// CORRECT: Using await properly
async function usingAwaitCorrectly() {
  try {
    // With await - waits for the Promise to resolve
    const user = await fetchUser(123);
    console.log(user); // Logs the actual user data
    return user.name; // Works correctly
  } catch (error) {
    // This will catch any errors from fetchUser
    console.error('Error caught properly:', error);
  }
}

// MISTAKE: Unnecessary sequential execution
async function inefficientSequentialFetch(userIds) {
  const users = [];
  
  // Inefficient - processes one user at a time
  for (const id of userIds) {
    const user = await fetchUser(id);
    users.push(user);
  }
  
  return users;
}

// CORRECT: Efficient parallel execution
async function efficientParallelFetch(userIds) {
  // Creates an array of promises that all run in parallel
  const userPromises = userIds.map(id => fetchUser(id));
  
  // Wait for all promises to resolve
  return await Promise.all(userPromises);
}

// 6. Using async/await with higher-order functions
function withRetry(fn, maxRetries = 3) {
  return async function(...args) {
    let lastError;
    
    for (let attempt = 1; attempt <= maxRetries; attempt++) {
      try {
        return await fn(...args);
      } catch (error) {
        console.error(\`Attempt \${attempt} failed: \${error.message}\`);
        lastError = error;
        
        if (attempt < maxRetries) {
          // Wait before retrying with exponential backoff
          const delay = Math.pow(2, attempt) * 100;
          await new Promise(resolve => setTimeout(resolve, delay));
        }
      }
    }
    
    throw new Error(\`All \${maxRetries} attempts failed. Last error: \${lastError.message}\`);
  };
}

// Usage of the retry wrapper
const fetchUserWithRetry = withRetry(fetchUser);

// Helper function implementations for examples
function fetchUser(id) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (id === 999) {
        reject(new Error('User not found'));
      } else {
        resolve({ id, name: \`User \${id}\` });
      }
    }, 300);
  });
}

function fetchPosts(userId) {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve([
        { id: 1, title: 'First post' },
        { id: 2, title: 'Second post' }
      ]);
    }, 300);
  });
}

function fetchFollowers(userId) {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve([
        { id: 101, name: 'Follower 1' },
        { id: 102, name: 'Follower 2' }
      ]);
    }, 300);
  });
  }`,
          exercise: {
            instructions:
              'Refactor a complex Promise-based authentication flow to use async/await, improving readability while maintaining proper error handling. Create a function that efficiently loads user data in parallel, handling partial failures gracefully. Implement a retry mechanism using async/await that includes exponential backoff between attempts. Build a function that processes a collection of items asynchronously with controlled concurrency, avoiding exhaustion of system resources.',
          },
        },
        {
          title: 'Advanced Async Patterns',
          explanation: `
        <p>Modern JavaScript applications often require sophisticated async patterns to handle complex workflows. These advanced patterns help manage concurrency, cancellation, and resource constraints.</p>
        
        <h4>Async Iteration</h4>
        <p>Processing data asynchronously in loops with proper control flow is a common challenge. JavaScript provides dedicated syntax for working with asynchronous iterables.</p>
        
        <p>Async iteration capabilities include:</p>
        <ul>
          <li><strong>for-await-of</strong> loops for processing async iterables in sequence</li>
          <li><strong>Async generators</strong> that yield values asynchronously using the yield keyword</li>
          <li><strong>Symbol.asyncIterator</strong> protocol for creating custom async iterable objects</li>
          <li>Built-in support for asynchronous iteration over network resources, databases, and stream data</li>
        </ul>
        
        <div class="code-example">
          <pre><code>// Processing a collection with async operations
async function processItems(items) {
  const results = [];
  
  for (const item of items) {
    // Await inside a loop - sequential processing
    const result = await processItem(item);
    results.push(result);
  }
  
  return results;
}

// Using for-await-of with async iterables
async function processPaginatedData() {
  const results = [];
  
  // pageIterator is an async iterable that fetches pages on demand
  for await (const page of pageIterator) {
    for (const item of page.items) {
      results.push(item);
    }
  }
  
  return results;
}</code></pre>
        </div>
        
        <h4>Cancellation and Timeout</h4>
        <p>Controlling long-running or potentially stuck async operations is crucial for responsive applications. Unlike some other languages, JavaScript doesn't have built-in cancellation for Promises, but there are effective patterns.</p>
        
        <p>Modern cancellation approaches:</p>
        <ul>
          <li><strong>AbortController</strong> - the standard way to signal cancellation to fetch and other operations</li>
          <li><strong>Race with timeout</strong> - using Promise.race to implement timeouts</li>
          <li><strong>Cancellation tokens</strong> - passed to functions to check if operation should abort</li>
          <li><strong>Cooperative cancellation</strong> - functions checking for cancellation at safe points</li>
          <li><strong>Cleanup handlers</strong> - ensuring resources are freed when operations are cancelled</li>
        </ul>
        
        <div class="code-example">
          <pre><code>// Cancellable fetch using AbortController
async function fetchWithCancellation(url) {
  const controller = new AbortController();
  const { signal } = controller;
  
  // Allow cancellation from outside the function
  const cancel = () => controller.abort();
  
  try {
    const response = await fetch(url, { signal });
    const data = await response.json();
    return data;
  } catch (error) {
    if (error.name === 'AbortError') {
      console.log('Fetch was cancelled');
    } else {
      throw error; // Re-throw other errors
    }
  }
  
  return { cancel };
}

// Using it
const { cancel } = fetchWithCancellation('https://api.example.com/data');

// Later, if needed:
cancel(); // Abort the request</code></pre>
        </div>
        
        <h4>Controlling Concurrency</h4>
        <p>Managing the number of simultaneous async operations to avoid overwhelming resources is an important pattern for robust applications.</p>
        
        <p>Concurrency control techniques:</p>
        <ul>
          <li><strong>Semaphores</strong> - limiting the number of concurrent operations</li>
          <li><strong>Queue processing</strong> - maintaining a queue of tasks processed at controlled rates</li>
          <li><strong>Batching</strong> - processing items in batches rather than all at once</li>
          <li><strong>Rate limiting</strong> - ensuring operations don't exceed a maximum frequency</li>
          <li><strong>Prioritization</strong> - handling important tasks before less critical ones</li>
        </ul>
        
        <div class="code-example">
          <pre><code>// Process items with limited concurrency
async function processWithConcurrencyLimit(items, concurrency = 3) {
  const results = [];
  const inProgress = new Set();
  
  for (const [index, item] of items.entries()) {
    // Create a promise for this item's processing
    const promise = (async () => {
      const result = await processItem(item);
      // Store result at correct index
      results[index] = result;
      // Remove from in-progress set
      inProgress.delete(promise);
    })();
    
    // Add to in-progress set
    inProgress.add(promise);
    
    // If we hit the concurrency limit, wait for one to finish
    if (inProgress.size >= concurrency) {
      await Promise.race(inProgress);
    }
  }
  
  // Wait for remaining operations to complete
  await Promise.all(inProgress);
  
  return results;
}</code></pre>
        </div>
        
        <div class="interview-tip">
          <p><span class="interview-icon">🎯</span> <strong>Interview Focus:</strong> Understanding advanced patterns shows you can handle complex real-world scenarios.</p>
          <p>Key points to understand:</p>
          <ul>
            <li>How to implement cancellation for long-running async operations</li>
            <li>Techniques for controlling concurrency in async operations</li>
            <li>Working with async iterators and generators</li>
            <li>Implementing retry and circuit breaker patterns</li>
            <li>Handling complex error scenarios in async workflows</li>
          </ul>
        </div>
      `,
          codeExample: `// Advanced Async Patterns Implementation

// 1. Async Generators & Iterators
// Async generator for paginated API
async function* fetchPaginatedData(endpoint, pageSize = 10) {
  let page = 1;
  let hasMore = true;
  
  while (hasMore) {
    // Fetch the current page
    const response = await fetch(
      \`\${endpoint}?page=\${page}&pageSize=\${pageSize}\`
    );
    
    if (!response.ok) {
      throw new Error(\`HTTP error \${response.status}\`);
    }
    
    const data = await response.json();
    
    // Check if we've reached the end
    if (!data.items || data.items.length === 0) {
      hasMore = false;
    } else {
      // Yield the current page of items
      yield data.items;
      page++;
    }
  }
}

// Using the async generator
async function processAllPages() {
  const allItems = [];
  
  try {
    const pageIterator = fetchPaginatedData('/api/products');
    
    for await (const items of pageIterator) {
      console.log(\`Processing page with \${items.length} items\`);
      
      for (const item of items) {
        // Process each item
        const processed = await processItem(item);
        allItems.push(processed);
      }
    }
    
    return allItems;
  } catch (error) {
    console.error('Error processing paginated data:', error);
    throw error;
  }
}

// 2. Cancellation with AbortController
function createCancellableOperation() {
  // Create abort controller
  const controller = new AbortController();
  const { signal } = controller;
  
  // Operation function
  async function operation() {
    // Check if already cancelled
    if (signal.aborted) {
      throw new Error('Operation was cancelled');
    }
    
    // Create a promise that completes when signal is aborted
    const abortPromise = new Promise((_, reject) => {
      signal.addEventListener('abort', () => {
        reject(new Error('Operation was cancelled'));
      });
    });
    
    try {
      // Race the operation against abort signal
      return await Promise.race([
        performLongOperation(signal),
        abortPromise
      ]);
    } catch (error) {
      if (error.name === 'AbortError' || signal.aborted) {
        console.log('Operation was cancelled');
        throw new Error('Operation was cancelled');
      }
      throw error;
    }
  }
  
  // Cancel function
  function cancel() {
    controller.abort();
  }
  
  // Return both the operation and cancel function
  return { operation, cancel };
}

// Sample long operation that checks for cancellation
async function performLongOperation(signal) {
  // Break work into chunks and check for cancellation between chunks
  for (let i = 0; i < 10; i++) {
    // Check if cancelled
    if (signal.aborted) {
      throw new Error('Operation was cancelled');
    }
    
    // Do some work
    await new Promise(resolve => setTimeout(resolve, 500));
    console.log(\`Completed chunk \${i + 1}/10\`);
  }
  
  return 'Operation completed successfully';
}

// Using the cancellable operation
async function demoWithCancellation() {
  const { operation, cancel } = createCancellableOperation();
  
  // Set a timeout to cancel after 2 seconds
  setTimeout(() => {
    console.log('Cancelling operation...');
    cancel();
  }, 2000);
  
  try {
    const result = await operation();
    console.log('Result:', result);
  } catch (error) {
    console.error('Operation failed:', error.message);
  }
}

// 3. Limiting Concurrency
async function processWithConcurrencyLimit(items, processFunction, concurrencyLimit = 3) {
  const results = new Array(items.length);
  let currentIndex = 0;
  
  // Process next item function
  async function processNext() {
    const itemIndex = currentIndex++;
    
    // Check if we've processed all items
    if (itemIndex >= items.length) {
      return;
    }
    
    try {
      // Process this item
      results[itemIndex] = await processFunction(items[itemIndex]);
    } catch (error) {
      // Store error in results
      results[itemIndex] = { error };
    }
    
    // Process next item recursively
    return processNext();
  }
  
  // Start initial batch of processors up to concurrency limit
  const processors = Array.from(
    { length: Math.min(concurrencyLimit, items.length) },
    () => processNext()
  );
  
  // Wait for all processors to complete
  await Promise.all(processors);
  
  return results;
}

// 4. Retry pattern with exponential backoff
async function withRetry(fn, options = {}) {
  const {
    maxRetries = 3,
    initialDelay = 1000,
    maxDelay = 30000,
    backoffFactor = 2,
    shouldRetry = error => true  // Default: retry all errors
  } = options;
  
  let retries = 0;
  let delay = initialDelay;
  
  while (true) {
    try {
      return await fn();
    } catch (error) {
      retries++;
      
      // Check if we should retry
      if (retries > maxRetries || !shouldRetry(error)) {
        throw error;
      }
      
      console.log(\`Retry \${retries}/\${maxRetries} after \${delay}ms\`);
      
      // Wait before retrying
      await new Promise(resolve => setTimeout(resolve, delay));
      
      // Increase delay with backoff and jitter
      delay = Math.min(
        delay * backoffFactor + Math.random() * 100,
        maxDelay
      );
    }
  }
}

// 5. Circuit Breaker Pattern
class CircuitBreaker {
  constructor(fn, options = {}) {
    this.fn = fn;
    this.state = 'CLOSED'; // CLOSED, OPEN, HALF_OPEN
    this.failureThreshold = options.failureThreshold || 3;
    this.resetTimeout = options.resetTimeout || 10000;
    this.failureCount = 0;
    this.lastFailureTime = null;
    this.onStateChange = options.onStateChange || (() => {});
  }
  
  async exec(...args) {
    // Check circuit state
    if (this.state === 'OPEN') {
      // Check if reset timeout has elapsed
      if (Date.now() - this.lastFailureTime >= this.resetTimeout) {
        this.state = 'HALF_OPEN';
        this.onStateChange('HALF_OPEN');
        console.log('Circuit breaker: HALF_OPEN state');
      } else {
        throw new Error('Circuit breaker: OPEN state - operation rejected');
      }
    }
    
    try {
      // Execute the function
      const result = await this.fn(...args);
      
      // Success - reset circuit if it was half-open
      if (this.state === 'HALF_OPEN') {
        this.state = 'CLOSED';
        this.failureCount = 0;
        this.onStateChange('CLOSED');
        console.log('Circuit breaker: CLOSED state (reset)');
      }
      
      return result;
    } catch (error) {
      // Track failure
      this.failureCount++;
      this.lastFailureTime = Date.now();
      
      // Trip circuit if too many failures
      if (this.state === 'CLOSED' && this.failureCount >= this.failureThreshold) {
        this.state = 'OPEN';
        this.onStateChange('OPEN');
        console.log('Circuit breaker: OPEN state (tripped)');
      }
      
      throw error;
    }
  }
}

// Using the circuit breaker
function createDataService(baseUrl) {
  // Regular function to fetch data
  async function fetchData(endpoint) {
    const response = await fetch(\`\${baseUrl}\${endpoint}\`);
    
    if (!response.ok) {
      throw new Error(\`HTTP error \${response.status}\`);
    }
    
    return response.json();
  }
  
  // Wrap with circuit breaker
  const circuitBreaker = new CircuitBreaker(fetchData, {
    failureThreshold: 3,
    resetTimeout: 10000,
    onStateChange: (state) => console.log(\`Service circuit state: \${state}\`)
  });
  
  // Return wrapped function
  return async function(endpoint) {
    try {
      return await circuitBreaker.exec(endpoint);
    } catch (error) {
      if (error.message.includes('circuit breaker')) {
        // Provide fallback data if available
        return { fallback: true, message: 'Using cached data' };
      }
      throw error;
    }
  };
}

// Helper function simulation
async function processItem(item) {
  await new Promise(resolve => setTimeout(resolve, 300));
  return { ...item, processed: true };
}`,
          exercise: {
            instructions:
              'Implement a robust data loading system using advanced async patterns. Create an async generator that fetches paginated data with proper error handling and cancellation support. Implement a circuit breaker that prevents repeated calls to failing services and automatically recovers when the service is reliable again. Build a concurrency control system that processes items with a maximum number of parallel operations. Implement a retry mechanism with exponential backoff that intelligently decides whether an error is retriable.',
          },
        },
      ],
      prepperSummary: `
    <div class="prepper-summary">
      <h3>🔑 Key Interview Takeaways</h3>
      <ul>
        <li><strong>Async/Await Syntax:</strong> Understand how async/await simplifies asynchronous code, making it more readable and maintainable.</li>
        
        <li><strong>Under the Hood:</strong> Recognize that async/await is syntactic sugar built on top of Promises, not a replacement for understanding Promises.</li>
        
        <li><strong>Error Handling:</strong> Use try/catch blocks with async/await for cleaner error handling compared to Promise chains.</li>
        
        <li><strong>Parallel Execution:</strong> Know how to maintain parallel execution for better performance when using async/await.</li>
        
        <li><strong>Advanced Patterns:</strong> Master techniques like cancellation, retry logic, concurrency control, and circuit breakers for robust async code.</li>
      </ul>
      
      <h4>📝 Common Interview Questions</h4>
      <ol>
        <li>"How does async/await work under the hood?"</li>
        <li>"What are the advantages of async/await over Promise chains?"</li>
        <li>"How would you handle errors properly with async/await?"</li>
        <li>"How can you execute multiple async operations in parallel with async/await?"</li>
        <li>"Implement a function that limits the concurrency of async operations"</li>
      </ol>
    </div>
  `,
    }, // end of lesson 3
    {
      title: 'Fetch API and AJAX',
      description: 'Master techniques for making HTTP requests and handling responses.',
      sections: [
        {
          title: 'Fetch API Basics',
          explanation: `
        <p>The Fetch API is the modern standard for making HTTP requests in JavaScript applications. It provides a cleaner, more powerful interface than XMLHttpRequest.</p>
        
        <h4>Making Requests</h4>
        <p>The fetch() function provides a simple and powerful way to make network requests. It returns a Promise that resolves to the Response object representing the server's response.</p>
        
        <p>Key aspects of the fetch API:</p>
        <ul>
          <li><strong>Promise-based</strong> - integrates seamlessly with modern JavaScript async patterns</li>
          <li><strong>Two-stage process</strong> - first Promise resolves to a Response, then extract data</li>
          <li><strong>Configurable</strong> - supports various HTTP methods, headers, credentials, etc.</li>
          <li><strong>Streaming support</strong> - can work with data streams for large responses</li>
          <li><strong>Cross-origin support</strong> - handles CORS with proper configuration</li>
        </ul>
        
        <div class="code-example">
          <pre><code>// Basic GET request
fetch('https://api.example.com/data')
  .then(response => {
    if (!response.ok) {
      throw new Error(\`HTTP error! Status: \${response.status}\`);
    }
    return response.json(); // Parse JSON response
  })
  .then(data => {
    console.log('Data received:', data);
  })
  .catch(error => {
    console.error('Fetch error:', error);
  });

// POST request with JSON data
fetch('https://api.example.com/users', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': 'Bearer token123'
  },
  body: JSON.stringify({
    name: 'John Doe',
    email: 'john@example.com'
  })
})
  .then(response => response.json())
  .then(data => console.log('User created:', data))
  .catch(error => console.error('Error creating user:', error));</code></pre>
        </div>
        
        <h4>Response Handling</h4>
        <p>The Response object provides methods for handling different types of data. Understanding these methods is key to properly processing API responses.</p>
        
        <p>Response methods for different data types:</p>
        <ul>
          <li><strong>json()</strong> - Parse body as JSON (returns a Promise)</li>
          <li><strong>text()</strong> - Get body as text (returns a Promise)</li>
          <li><strong>blob()</strong> - Handle binary data like images (returns a Promise)</li>
          <li><strong>formData()</strong> - Process form data (returns a Promise)</li>
          <li><strong>arrayBuffer()</strong> - Handle raw binary data (returns a Promise)</li>
        </ul>
        
        <div class="code-example">
          <pre><code>// Different response types
async function fetchData(url) {
  const response = await fetch(url);
  
  if (!response.ok) {
    throw new Error(\`HTTP error! Status: \${response.status}\`);
  }
  
  // Choose the appropriate method for the data type
  if (url.endsWith('.json')) {
    return response.json(); // Parse JSON
  } else if (url.endsWith('.txt')) {
    return response.text(); // Get text
  } else if (url.endsWith('.blob')) {
    return response.blob(); // Get binary data
  } else {
    return response.formData(); // Parse form data
  }
}</code></pre>
        </div>
        
        <h4>Common Fetch Challenges</h4>
        <p>Understanding common patterns and issues with fetch requests helps avoid common pitfalls in web applications.</p>
        
        <p>Important gotchas and solutions:</p>
        <ul>
          <li><strong>Error handling</strong> - fetch only rejects on network errors, not HTTP error codes</li>
          <li><strong>Timeouts</strong> - fetch doesn't support timeouts natively; requires AbortController</li>
          <li><strong>Credential handling</strong> - understanding the credentials option for cookies and auth</li>
          <li><strong>CORS limitations</strong> - how to handle cross-origin restrictions</li>
          <li><strong>Request cancellation</strong> - using AbortController to cancel in-flight requests</li>
        </ul>
        
        <div class="code-example">
          <pre><code>// CORS errors
fetch('https://different-origin.com/api/data')
  .catch(error => {
    if (error instanceof TypeError) {
      console.error('CORS error: The request was blocked by the browser');
    }
  });

// Fetch only rejects on network errors, not HTTP errors
fetch('https://api.example.com/nonexistent')
  .then(response => {
    // This still executes even with 404 status
    if (!response.ok) {
      throw new Error(\`HTTP error! Status: \${response.status}\`);
    }
    return response.json();
  })
  .catch(error => console.error('Error:', error));</code></pre>
        </div>
        
        <div class="interview-tip">
          <p><span class="interview-icon">🎯</span> <strong>Interview Focus:</strong> Understanding the Fetch API, its limitations, and best practices.</p>
          <p>Key points to understand:</p>
          <ul>
            <li>Fetch uses promises and is the modern replacement for XMLHttpRequest</li>
            <li>Handling different response types (.json(), .text(), .blob())</li>
            <li>Common fetch gotchas like manual error handling for HTTP status codes</li>
            <li>Setting request headers and handling credentials</li>
            <li>Implementing timeouts, cancellation, and retry logic with fetch</li>
          </ul>
        </div>
      `,
          codeExample: `// Comprehensive fetch API examples

// 1. Fetch API Client with error handling, timeouts, retries
class ApiClient {
  constructor(baseUrl, defaultOptions = {}) {
    this.baseUrl = baseUrl;
    this.defaultOptions = {
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      credentials: 'same-origin',
      timeout: 10000, // 10 seconds
      retries: 3,
      ...defaultOptions
    };
  }
  
  // Set auth token
  setAuthToken(token) {
    this.defaultOptions.headers.Authorization = \`Bearer \${token}\`;
  }
  
  // Main request method
  async request(endpoint, options = {}) {
    const url = \`\${this.baseUrl}\${endpoint}\`;
    
    // Merge default options with request options
    const fetchOptions = {
      ...this.defaultOptions,
      ...options,
      headers: {
        ...this.defaultOptions.headers,
        ...options.headers
      }
    };
    
    // Handle timeout
    const { timeout, retries } = fetchOptions;
    
    // Remove non-fetch options
    delete fetchOptions.timeout;
    delete fetchOptions.retries;
    
    // Handle request body
    if (fetchOptions.body && typeof fetchOptions.body === 'object') {
      fetchOptions.body = JSON.stringify(fetchOptions.body);
    }
    
    let attempt = 0;
    let lastError;
    
    // Retry loop
    while (attempt < retries) {
      attempt++;
      try {
        // Create abort controller for timeout
        const controller = new AbortController();
        fetchOptions.signal = controller.signal;
        
        // Set timeout if specified
        const timeoutId = timeout && setTimeout(() => controller.abort(), timeout);
        
        try {
          // Make the fetch request
          const response = await fetch(url, fetchOptions);
          
          // Clear timeout if it was set
          if (timeoutId) clearTimeout(timeoutId);
          
          // Handle responses
          if (!response.ok) {
            // Get error information from response
            let errorMessage;
            try {
              const errorData = await response.json();
              errorMessage = errorData.message || \`HTTP error \${response.status}\`;
            } catch (e) {
              errorMessage = \`HTTP error \${response.status}\`;
            }
            
            throw new Error(errorMessage);
          }
          
          // Check if response is empty
          const contentType = response.headers.get('content-type');
          if (!contentType || response.status === 204) {
            return null; // No content
          }
          
          // Parse response based on content type
          if (contentType.includes('application/json')) {
            return await response.json();
          } else if (contentType.includes('text/')) {
            return await response.text();
          } else if (contentType.includes('multipart/form-data')) {
            return await response.formData();
          } else {
            return await response.blob();
          }
        } finally {
          // Ensure timeout is cleared
          if (timeoutId) clearTimeout(timeoutId);
        }
      } catch (error) {
        lastError = error;
        
        // Check if the request was aborted
        if (error.name === 'AbortError') {
          throw new Error(\`Request timed out after \${timeout}ms\`);
        }
        
        // Check if this is a network error (worth retrying)
        const isNetworkError = error.message.includes('network') || 
                              error.message.includes('failed') ||
                              error instanceof TypeError;
                              
        // Check if we should retry
        if (attempt >= retries || !isNetworkError) {
          break;
        }
        
        // Wait before retrying with exponential backoff
        const delay = Math.min(1000 * Math.pow(2, attempt) + Math.random() * 1000, 10000);
        console.log(\`Retry \${attempt}/\${retries} after \${delay}ms\`);
        await new Promise(resolve => setTimeout(resolve, delay));
      }
    }
    
    // All retries failed
    throw lastError || new Error('Request failed');
  }
  
  // Convenience methods
  async get(endpoint, options = {}) {
    return this.request(endpoint, { method: 'GET', ...options });
  }
  
  async post(endpoint, data, options = {}) {
    return this.request(endpoint, { 
      method: 'POST', 
      body: data,
      ...options 
    });
  }
  
  async put(endpoint, data, options = {}) {
    return this.request(endpoint, { 
      method: 'PUT', 
      body: data,
      ...options 
    });
  }
  
  async patch(endpoint, data, options = {}) {
    return this.request(endpoint, { 
      method: 'PATCH', 
      body: data,
      ...options 
    });
  }
  
  async delete(endpoint, options = {}) {
    return this.request(endpoint, { method: 'DELETE', ...options });
  }
}

// 2. Using the API client
async function demoApiClient() {
  const api = new ApiClient('https://api.example.com');
  
  // Set authentication
  api.setAuthToken('user-token-123');
  
  try {
    // GET request
    const users = await api.get('/users');
    console.log('Users:', users);
    
    // POST request with data
    const newUser = await api.post('/users', {
      name: 'John Doe',
      email: 'john@example.com'
    });
    console.log('Created user:', newUser);
    
    // GET with query parameters
    const filteredUsers = await api.get('/users?role=admin&active=true');
    console.log('Admin users:', filteredUsers);
    
  } catch (error) {
    console.error('API error:', error.message);
  }
}

// 3. Upload with progress tracking
async function uploadFileWithProgress(file, url, progressCallback) {
  return new Promise((resolve, reject) => {
    // Create form data
    const formData = new FormData();
    formData.append('file', file);
    
    // Create XHR (needed for progress tracking)
    const xhr = new XMLHttpRequest();
    
    // Set up progress handler
    xhr.upload.addEventListener('progress', (event) => {
      if (event.lengthComputable) {
        const progress = Math.round((event.loaded / event.total) * 100);
        progressCallback(progress);
      }
    });
    
    // Set up completion handler
    xhr.addEventListener('load', () => {
      if (xhr.status >= 200 && xhr.status < 300) {
        try {
          const response = JSON.parse(xhr.responseText);
          resolve(response);
        } catch (e) {
          resolve(xhr.responseText);
        }
      } else {
        reject(new Error(\`HTTP error \${xhr.status}\`));
      }
    });
    
    // Set up error handler
    xhr.addEventListener('error', () => {
      reject(new Error('Network error during upload'));
    });
    
    // Set up abort handler
    xhr.addEventListener('abort', () => {
      reject(new Error('Upload aborted'));
    });
    
    // Start the upload
    xhr.open('POST', url);
    xhr.send(formData);
    
    // Return the XHR object to allow abortion
    return xhr;
  });
}

// 4. Fetch with cancelable promise pattern
function createCancelablePromise(promise) {
  let isCanceled = false;
  
  // Create a wrapper promise
  const wrappedPromise = new Promise((resolve, reject) => {
    promise.then(
      value => isCanceled ? reject({ isCanceled: true }) : resolve(value),
      error => isCanceled ? reject({ isCanceled: true }) : reject(error)
    );
  });
  
  // Add cancel method
  wrappedPromise.cancel = () => {
    isCanceled = true;
  };
  
  return wrappedPromise;
}

// Using the cancelable pattern
function fetchWithCancel(url) {
  const controller = new AbortController();
  const { signal } = controller;
  
  // Create the fetch promise
  const fetchPromise = fetch(url, { signal })
    .then(response => response.json());
  
  // Create a cancelable wrapper
  const cancelable = createCancelablePromise(fetchPromise);
  
  // Override cancel to also abort the fetch
  const originalCancel = cancelable.cancel;
  cancelable.cancel = () => {
    controller.abort();
    originalCancel();
  };
  
  return cancelable;
}

// 5. Handling CORS and credentials
async function fetchWithCredentials(url, options = {}) {
  // Include credentials (cookies) with the request
  const response = await fetch(url, {
    credentials: 'include', // Send cookies, even for cross-origin requests
    ...options
  });
  
  if (!response.ok) {
    if (response.status === 0) {
      throw new Error('CORS error or network failure');
    }
    throw new Error(\`HTTP error \${response.status}\`);
  }
  
  return response.json();
}`,
          exercise: {
            instructions:
              'Create a robust API client class using the Fetch API that handles: 1) Authentication and authorization headers, 2) Automatic retries for network failures, 3) Request timeouts and cancellation, 4) Response parsing based on content type, and 5) Comprehensive error handling with custom error types. Then, use your client to implement a user management system with CRUD operations.',
          },
        },
        {
          title: 'Real-world Asynchronous Patterns',
          explanation: `
        <p>Production applications require sophisticated patterns to handle complex asynchronous workflows. These patterns address common challenges in real-world applications.</p>
        
        <h4>Caching and Deduplication</h4>
        <p>Optimize network requests by caching responses and avoiding duplicate requests. These techniques improve performance and reduce server load.</p>
        
        <p>Effective caching strategies include:</p>
        <ul>
          <li><strong>Memory caching</strong> - storing responses in memory for quick access</li>
          <li><strong>TTL-based expiration</strong> - automatically invalidating old cache entries</li>
          <li><strong>Cache invalidation</strong> - clearing specific entries when data changes</li>
          <li><strong>Cache hierarchies</strong> - using multiple cache layers with different lifetimes</li>
          <li><strong>Stale-while-revalidate</strong> - serving cached data while refreshing in background</li>
        </ul>
        
        <div class="code-example">
          <pre><code>// Implement a request cache
const cache = new Map();

async function fetchWithCache(url, expireMs = 60000) {
  const now = Date.now();
  const cachedResponse = cache.get(url);
  
  // Return cached data if valid
  if (cachedResponse && (now - cachedResponse.timestamp < expireMs)) {
    console.log('Using cached data for:', url);
    return cachedResponse.data;
  }
  
  // Fetch fresh data
  console.log('Fetching fresh data for:', url);
  const response = await fetch(url);
  const data = await response.json();
  
  // Cache the response
  cache.set(url, {
    data,
    timestamp: now
  });
  
  return data;
}</code></pre>
        </div>
        
        <h4>Request Deduplication</h4>
        <p>Prevent multiple identical requests from being triggered simultaneously. This is particularly important in UI applications where multiple components might request the same data.</p>
        
        <p>Deduplication benefits include:</p>
        <ul>
          <li><strong>Reduced network traffic</strong> - fewer redundant requests</li>
          <li><strong>Server load reduction</strong> - important for rate-limited APIs</li>
          <li><strong>Consistent data</strong> - all components get exactly the same response</li>
          <li><strong>Improved performance</strong> - only one request latency instead of many</li>
          <li><strong>Simplified application state</strong> - fewer race conditions between requests</li>
        </ul>
        
        <div class="code-example">
          <pre><code>// Track in-flight requests
const inflightRequests = new Map();

async function fetchWithDeduplication(url) {
  // If this request is already in progress, reuse it
  if (inflightRequests.has(url)) {
    console.log('Reusing in-flight request for:', url);
    return inflightRequests.get(url);
  }
  
  // Create and store the new request promise
  const promise = fetch(url)
    .then(response => response.json())
    .finally(() => {
      // Clean up after request completes
      inflightRequests.delete(url);
    });
  
  inflightRequests.set(url, promise);
  return promise;
}</code></pre>
        </div>
        
        <h4>Retry and Circuit Breaker</h4>
        <p>Create resilient systems that handle temporary failures but prevent cascading failures. These patterns are essential for applications that need to work reliably in unreliable network environments.</p>
        
        <p>Key reliability patterns:</p>
        <ul>
          <li><strong>Retry with backoff</strong> - automatically retry failed operations with increasing delays</li>
          <li><strong>Circuit breakers</strong> - temporarily stop operations after repeated failures</li>
          <li><strong>Fallback mechanisms</strong> - provide alternative data sources when primary fails</li>
          <li><strong>Partial response handling</strong> - gracefully handle incomplete or degraded responses</li>
          <li><strong>Health checks</strong> - proactively monitor service availability</li>
        </ul>
        
        <div class="code-example">
          <pre><code>// Retry with exponential backoff
async function fetchWithRetry(url, options = {}, maxRetries = 3) {
  let retryCount = 0;
  
  while (true) {
    try {
      return await fetch(url, options);
    } catch (error) {
      retryCount++;
      
      // If we've reached max retries, throw the error
      if (retryCount > maxRetries) {
        throw error;
      }
      
      // Calculate delay with exponential backoff and jitter
      const delay = Math.min(
        1000 * Math.pow(2, retryCount) + Math.random() * 1000,
        10000
      );
      
      console.log(\`Retry \${retryCount} after \${delay}ms\`);
      await new Promise(resolve => setTimeout(resolve, delay));
    }
  }
}</code></pre>
        </div>
        
        <div class="interview-tip">
          <p><span class="interview-icon">🎯</span> <strong>Interview Focus:</strong> Production-grade asynchronous patterns show your ability to build robust systems.</p>
          <p>Key patterns to understand:</p>
          <ul>
            <li>Caching strategies (client-side caching, memoization)</li>
            <li>Request deduplication to prevent duplicate network calls</li>
            <li>Retry mechanisms with exponential backoff</li>
            <li>Circuit breakers to prevent cascading failures</li>
            <li>Request prioritization and cancellation for better UX</li>
          </ul>
        </div>
      `,
          codeExample: `// Advanced Real-World Asynchronous Patterns

// 1. Comprehensive API Client with all production patterns
class AdvancedApiClient {
  constructor(baseUrl, options = {}) {
    this.baseUrl = baseUrl;
    this.options = {
      // Default options
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      timeout: 10000,
      retries: 3,
      useCache: true,
      cacheTTL: 60000, // 1 minute
      deduplicate: true,
      useCircuitBreaker: true,
      ...options
    };
    
    // Initialize caches and tracking
    this.cache = new Map();
    this.inflightRequests = new Map();
    this.circuitBreakers = new Map();
  }
  
  // Main request method with all advanced patterns
  async request(endpoint, options = {}) {
    const url = \`\${this.baseUrl}\${endpoint}\`;
    const requestOptions = { ...this.options, ...options };
    const cacheKey = this._getCacheKey(url, requestOptions);
    
    // Check circuit breaker before proceeding
    if (requestOptions.useCircuitBreaker) {
      const circuitBreaker = this._getCircuitBreaker(cacheKey);
      if (circuitBreaker.state === 'OPEN') {
        throw new Error(\`Circuit breaker open for \${endpoint}\`);
      }
    }
    
    // Try to return cached response if applicable
    if (requestOptions.useCache) {
      const cachedResponse = this._getCachedResponse(cacheKey, requestOptions.cacheTTL);
      if (cachedResponse) {
        return cachedResponse;
      }
    }
    
    // Check for in-flight requests to deduplicate
    if (requestOptions.deduplicate && this.inflightRequests.has(cacheKey)) {
      return this.inflightRequests.get(cacheKey);
    }
    
    // Create the actual request function
    const doRequest = async () => {
      // Set up controller for timeouts
      const controller = new AbortController();
      const { signal } = controller;
      
      // Set up the timeout if specified
      let timeoutId;
      if (requestOptions.timeout) {
        timeoutId = setTimeout(() => controller.abort(), requestOptions.timeout);
      }
      
      try {
        // Transform request body if needed
        const fetchOptions = { ...requestOptions, signal };
        if (fetchOptions.body && typeof fetchOptions.body === 'object') {
          fetchOptions.body = JSON.stringify(fetchOptions.body);
        }
        
        // Make the fetch request
        const response = await fetch(url, fetchOptions);
        
        // Clear timeout
        if (timeoutId) clearTimeout(timeoutId);
        
        // Process response
        if (!response.ok) {
          // Try to get error details from response
          let errorDetails = {};
          try {
            errorDetails = await response.json();
          } catch (e) {
            // JSON parsing failed, use status text
            errorDetails = { message: response.statusText };
          }
          
          // Throw detailed error
          throw new Error(JSON.stringify({
            status: response.status,
            message: errorDetails.message || \`HTTP error \${response.status}\`,
            details: errorDetails
          }));
        }
        
        // Check for empty response
        if (response.status === 204) {
          return null;
        }
        
        // Parse the response based on content type
        const contentType = response.headers.get('content-type') || '';
        let data;
        
        if (contentType.includes('application/json')) {
          data = await response.json();
        } else if (contentType.includes('text/')) {
          data = await response.text();
        } else {
          data = await response.blob();
        }
        
        // Store in cache if applicable
        if (requestOptions.useCache) {
          this._cacheResponse(cacheKey, data);
        }
        
        // Reset circuit breaker on success
        if (requestOptions.useCircuitBreaker) {
          this._getCircuitBreaker(cacheKey).onSuccess();
        }
        
        return data;
      } catch (error) {
        // Clear timeout to prevent memory leaks
        if (timeoutId) clearTimeout(timeoutId);
        
        // Handle abort errors specially
        if (error.name === 'AbortError') {
          throw new Error(\`Request timed out after \${requestOptions.timeout}ms\`);
        }
        
        // Track failure in circuit breaker
        if (requestOptions.useCircuitBreaker) {
          this._getCircuitBreaker(cacheKey).onFailure();
        }
        
        throw error;
      }
    };
    
    // Implement retry logic with backoff
    const executeWithRetry = async () => {
      let lastError;
      
      for (let attempt = 0; attempt <= requestOptions.retries; attempt++) {
        try {
          // Try the request
          return await doRequest();
        } catch (error) {
          lastError = error;
          
          // Check if we should retry
          if (attempt >= requestOptions.retries) {
            break; // No more retries
          }
          
          // Check if error is retriable
          if (this._isRetriableError(error)) {
            // Calculate delay with exponential backoff and jitter
            const delay = Math.min(
              Math.pow(2, attempt) * 1000 + Math.random() * 1000,
              10000
            );
            
            // Wait before retrying
            await new Promise(resolve => setTimeout(resolve, delay));
          } else {
            break; // Non-retriable error
          }
        }
      }
      
      // If we got here, all retries failed
      throw lastError;
    };
    
    // Create the final promise that includes deduplication
    const requestPromise = executeWithRetry().finally(() => {
      // Clean up inflight request tracking
      if (requestOptions.deduplicate) {
        this.inflightRequests.delete(cacheKey);
      }
    });
    
    // Track the promise for deduplication
    if (requestOptions.deduplicate) {
      this.inflightRequests.set(cacheKey, requestPromise);
    }
    
    return requestPromise;
  }
  
  // Helper method to create cache key
  _getCacheKey(url, options) {
    // Include relevant request options in cache key
    const { method = 'GET', body } = options;
    return \`\${method}:\${url}:\${body ? JSON.stringify(body) : ''}\`;
  }
  
  // Helper to check cache for valid response
  _getCachedResponse(key, ttl) {
    const cached = this.cache.get(key);
    if (cached && Date.now() - cached.timestamp < ttl) {
      return cached.data;
    }
    return null;
  }
  
  // Helper to cache a response
  _cacheResponse(key, data) {
    this.cache.set(key, {
      data,
      timestamp: Date.now()
    });
  }
  
  // Helper to determine if an error is retriable
  _isRetriableError(error) {
    // Retry network errors and 5xx responses
    if (error.name === 'TypeError') {
      return true; // Network error
    }
    
    try {
      // Check if it's an HTTP error we should retry
      const errorDetails = JSON.parse(error.message);
      return errorDetails.status >= 500;
    } catch (e) {
      // Not a JSON error, default to true
      return true;
    }
  }
  
  // Get or create circuit breaker for a specific endpoint
  _getCircuitBreaker(key) {
    if (!this.circuitBreakers.has(key)) {
      this.circuitBreakers.set(key, new CircuitBreaker());
    }
    return this.circuitBreakers.get(key);
  }
  
  // Convenience methods
  async get(endpoint, options = {}) {
    return this.request(endpoint, { ...options, method: 'GET' });
  }
  
  async post(endpoint, data, options = {}) {
    return this.request(endpoint, { ...options, method: 'POST', body: data });
  }
  
  async put(endpoint, data, options = {}) {
    return this.request(endpoint, { ...options, method: 'PUT', body: data });
  }
  
  async delete(endpoint, options = {}) {
    return this.request(endpoint, { ...options, method: 'DELETE' });
  }
}

// Simple circuit breaker implementation
class CircuitBreaker {
  constructor(options = {}) {
    this.failureThreshold = options.failureThreshold || 5;
    this.resetTimeout = options.resetTimeout || 30000;
    this.state = 'CLOSED'; // CLOSED, OPEN, HALF-OPEN
    this.failureCount = 0;
    this.lastFailureTime = null;
  }
  
  onSuccess() {
    // Reset on success, especially important in HALF-OPEN state
    if (this.state === 'HALF-OPEN') {
      this.state = 'CLOSED';
    }
    this.failureCount = 0;
  }
  
  onFailure() {
    this.failureCount++;
    this.lastFailureTime = Date.now();
    
    if (this.state === 'CLOSED' && this.failureCount >= this.failureThreshold) {
      this.state = 'OPEN';
    }
  }
  
  get state() {
    // Auto-transition from OPEN to HALF-OPEN after reset timeout
    if (this._state === 'OPEN' && 
        this.lastFailureTime &&
        Date.now() - this.lastFailureTime > this.resetTimeout) {
      this._state = 'HALF-OPEN';
    }
    return this._state;
  }
  
  set state(newState) {
    this._state = newState;
  }
}

// 2. Batch Processing with Priority Queue
class RequestQueue {
  constructor(options = {}) {
    this.maxConcurrent = options.maxConcurrent || 5;
    this.retryFailed = options.retryFailed || true;
    this.maxRetries = options.maxRetries || 3;
    
    this.highPriorityQueue = [];
    this.normalPriorityQueue = [];
    this.lowPriorityQueue = [];
    this.activeRequests = 0;
    this.paused = false;
  }
  
  // Add a request to the queue with priority
  enqueue(requestFn, priority = 'normal') {
    return new Promise((resolve, reject) => {
      const queueItem = {
        requestFn,
        resolve,
        reject,
        retries: 0
      };
      
      // Add to appropriate queue based on priority
      if (priority === 'high') {
        this.highPriorityQueue.push(queueItem);
      } else if (priority === 'low') {
        this.lowPriorityQueue.push(queueItem);
      } else {
        this.normalPriorityQueue.push(queueItem);
      }
      
      // Try to process queue
      this._processQueue();
    });
  }
  
  // Pause queue processing
  pause() {
    this.paused = true;
  }
  
  // Resume queue processing
  resume() {
    this.paused = false;
    this._processQueue();
  }
  
  // Clear all queues
  clear() {
    for (const item of [...this.highPriorityQueue, ...this.normalPriorityQueue, ...this.lowPriorityQueue]) {
      item.reject(new Error('Request cancelled - queue cleared'));
    }
    
    this.highPriorityQueue = [];
    this.normalPriorityQueue = [];
    this.lowPriorityQueue = [];
  }
  
  // Internal: process the next item in queue
  async _processQueue() {
    if (this.paused || this.activeRequests >= this.maxConcurrent) {
      return;
    }
    
    // Get next item from highest priority non-empty queue
    const nextItem = this.highPriorityQueue.shift() || 
                   this.normalPriorityQueue.shift() || 
                   this.lowPriorityQueue.shift();
                   
    if (!nextItem) {
      return; // No items in queue
    }
    
    // Process this item
    this.activeRequests++;
    
    try {
      const result = await nextItem.requestFn();
      nextItem.resolve(result);
    } catch (error) {
      // Retry logic
      if (this.retryFailed && nextItem.retries < this.maxRetries) {
        nextItem.retries++;
        // Put back in queue (with same priority)
        this.normalPriorityQueue.push(nextItem);
      } else {
        // Max retries reached or retries disabled
        nextItem.reject(error);
      }
    } finally {
      this.activeRequests--;
      // Continue processing queue
      this._processQueue();
    }
  }
}`,
          exercise: {
            instructions:
              "Create a comprehensive API client that implements all the production-grade patterns we've discussed: caching, deduplication, retry logic, circuit breaking, and request queueing with prioritization. Implement a data prefetching system that loads resources before they're needed. Build a background synchronization system that continues to work when the user goes offline and syncs when they return online. Create an optimistic UI update system that immediately updates the UI and then confirms with the server.",
          },
        },
      ],
      prepperSummary: `
    <div class="prepper-summary">
      <h3>🔑 Key Interview Takeaways</h3>
      <ul>
        <li><strong>Fetch API:</strong> Master the modern standard for making HTTP requests in JavaScript, understanding its promise-based interface and the Response object.</li>
        
        <li><strong>Error Handling:</strong> Recognize that fetch only rejects on network errors, not HTTP errors, and implement proper error handling patterns.</li>
        
        <li><strong>Performance Optimization:</strong> Use techniques like caching, request deduplication, and batch processing to optimize network requests.</li>
        
        <li><strong>Reliability Patterns:</strong> Implement timeout handling, retry logic, and circuit breakers to create resilient applications.</li>
        
        <li><strong>Advanced Features:</strong> Understand cancellation, progress tracking, and background synchronization for enhanced user experiences.</li>
      </ul>
      
      <h4>📝 Common Interview Questions</h4>
      <ol>
        <li>"What are the key differences between fetch() and XMLHttpRequest?"</li>
        <li>"How would you handle errors properly with the Fetch API?"</li>
        <li>"Implement a caching system for API requests with expiration"</li>
        <li>"How would you implement a retry mechanism with exponential backoff?"</li>
        <li>"Explain how to implement request cancellation with the Fetch API"</li>
      </ol>
    </div>
  `,
    }, // end of lesson 4
  ],
  challenge: {
    description:
      "Build an asynchronous data fetching library that demonstrates your understanding of JavaScript's async capabilities.",
    requirements: [
      'Create a flexible API client with configurable request/response handling',
      'Implement caching, deduplication, and retry mechanisms',
      'Support both Promise-based and async/await usage',
      'Handle errors properly with custom error types',
      'Add timeout and cancellation capabilities',
    ],
    starterCode: `// Asynchronous JavaScript Challenge
// Create a data fetching library called "AsyncFetch"

const AsyncFetch = {
  // Core request function
  request(url, options = {}) {
    // Implement a flexible fetch wrapper
  },
  
  // Implement caching
  withCache(expiryTime = 60000) {
    // Create a cached version of request
  },
  
  // Implement retries
  withRetry(maxRetries = 3, backoff = true) {
    // Create a version with retry capability
  },
  
  // Add more features like:
  // - Request deduplication
  // - Timeouts
  // - Cancellation
  // - Error handling
};

// Export your library
export default AsyncFetch;`,
  },
}

export default asynchronousJavaScript
