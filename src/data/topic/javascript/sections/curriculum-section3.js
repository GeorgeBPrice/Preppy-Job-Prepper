// curriculum-section3.js - Functional Programming

const functionalProgramming = {
  title: 'Functional Programming',
  description: 'Explore higher-order functions, closures, and functional programming concepts.',
  lessons: [
    {
      title: 'Higher-Order Functions',
      description: 'Learn about functions that can accept or return other functions.',
      sections: [
        {
          title: 'Functions as First-Class Citizens',
          explanation: `
        <p>In JavaScript, functions are first-class citizens, which means they can be treated like any other value in the language.</p>
        
        <h4>Functions as Values</h4>
        <p>As first-class citizens, JavaScript functions can be assigned to variables, stored in data structures, and passed as arguments to other functions.</p>

        <p>This fundamental capability enables several powerful patterns:</p>
        <ul>
          <li><strong>Function references</strong> - Storing functions in variables for later execution</li>
          <li><strong>Callback patterns</strong> - Passing functions as arguments to be executed later</li>
          <li><strong>Function collections</strong> - Storing related functions in objects or arrays</li>
          <li><strong>Dynamic dispatch</strong> - Selecting different functions at runtime</li>
          <li><strong>Higher-order functions</strong> - Creating functions that operate on other functions</li>
        </ul>
        
        <div class="code-example">
          <pre><code>// Assigning functions to variables
function greet(name) {
  return \`Hello, \${name}!\`;
}

const sayHello = greet;
console.log(sayHello("Alice")); // "Hello, Alice!"

// Storing functions in objects
const mathOperations = {
  add: (a, b) => a + b,
  subtract: (a, b) => a - b,
  multiply: (a, b) => a * b
};

console.log(mathOperations.add(5, 3));       // 8
console.log(mathOperations['multiply'](4, 2)); // 8

// Storing functions in arrays
const transforms = [
  x => x * 2,
  x => x + 10,
  x => x ** 2
];

// Using functions from an array
console.log(transforms[0](5)); // 10</code></pre>
        </div>
        
        <h4>Functions with Properties</h4>
        <p>Since JavaScript functions are objects, they can have their own properties, methods, and be extended just like any other object.</p>

        <p>This object-like nature allows for creative patterns such as:</p>
        <ul>
          <li>Functions that maintain state between calls</li>
          <li>Self-memoizing functions that remember previous results</li>
          <li>Functions with additional utility methods</li>
          <li>Configuration information stored directly on functions</li>
          <li>Methods for modifying function behavior</li>
        </ul>
        
        <div class="code-example">
          <pre><code>// Functions with properties
function counter() {
  counter.count = (counter.count || 0) + 1;
  return counter.count;
}

console.log(counter()); // 1
console.log(counter()); // 2
console.log(counter.count); // 2

// Adding methods to functions
function formatter(str) {
  return str.trim();
}

formatter.capitalize = function(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
};

formatter.reverse = function(str) {
  return str.split('').reverse().join('');
};

console.log(formatter("  hello  ")); // "hello"
console.log(formatter.capitalize("hello")); // "Hello"</code></pre>
        </div>
        
        <div class="interview-tip">
          <p><span class="interview-icon">🎯</span> <strong>Interview Focus:</strong> Be prepared to discuss how treating functions as first-class citizens enables more flexible and reusable code.</p>
          <p>Key areas to understand:</p>
          <ul>
            <li>How to create higher-order functions that accept function arguments</li>
            <li>Using function references vs. function calls in your code</li>
            <li>Creating function collections for strategy patterns</li>
            <li>Attaching properties to functions for stateful operations</li>
            <li>The difference between function declarations and function expressions</li>
          </ul>
        </div>
      `,
          codeExample: `// Text processing utility using functions as first-class citizens
const TextUtils = {
  // Core processing functions
  functions: {
    trim: str => str.trim(),
    capitalize: str => str.charAt(0).toUpperCase() + str.slice(1).toLowerCase(),
    reverse: str => str.split('').reverse().join(''),
    removeSpecialChars: str => str.replace(/[^\\w\\s]/g, ''),
    slugify: str => str.toLowerCase().replace(/\\s+/g, '-'),
    countWords: str => str.trim().split(/\\s+/).length
  },
  
  // Process text with a single function
  process(text, functionName) {
    if (typeof this.functions[functionName] !== 'function') {
      throw new Error(\`Processing function "\${functionName}" not found\`);
    }
    return this.functions[functionName](text);
  },
  
  // Process text with a sequence of functions
  pipeline(text, ...functionNames) {
    return functionNames.reduce((result, funcName) => {
      return this.process(result, funcName);
    }, text);
  },
  
  // Apply all transformations and return the results
  applyAll(text) {
    const results = {};
    
    for (const [name, func] of Object.entries(this.functions)) {
      results[name] = func(text);
    }
    
    return results;
  },
  
  // Create a custom processor with specified functions
  createProcessor(...functionNames) {
    const selectedFunctions = functionNames.map(name => {
      if (typeof this.functions[name] !== 'function') {
        throw new Error(\`Processing function "\${name}" not found\`);
      }
      return this.functions[name];
    });
    
    return function(text) {
      return selectedFunctions.reduce((result, func) => func(result), text);
    };
  },
  
  // Add a new processing function
  addFunction(name, func) {
    if (typeof func !== 'function') {
      throw new Error('Second argument must be a function');
    }
    this.functions[name] = func;
    return this; // For method chaining
  }
};

// Usage examples
console.log(TextUtils.process("  hello WORLD!  ", "trim")); // "hello WORLD!"

// Process a string through multiple transformations
const cleanAndSlugify = TextUtils.pipeline(
  "  Hello, World! Special chars & spaces  ",
  "trim",
  "removeSpecialChars",
  "slugify"
); 
console.log(cleanAndSlugify); // "hello-world-special-chars-spaces"

// Create a reusable processor
const headlineFormatter = TextUtils.createProcessor("trim", "capitalize");
console.log(headlineFormatter("  this will be a NICE headline  ")); // "This will be a nice headline"

// Add a custom function
TextUtils.addFunction("exclaim", str => \`\${str}!\`);
console.log(TextUtils.process("Wow", "exclaim")); // "Wow!"

// Apply all transformations to a text
const allTransforms = TextUtils.applyAll("The quick brown fox");
console.log(allTransforms.slugify); // "the-quick-brown-fox"
console.log(allTransforms.countWords); // 4`,
          exercise: {
            instructions:
              'Create a collection of text processing functions that can be composed together. Implement functions for: trimming, capitalizing, removing special characters, counting words, and formatting text as slug. Store these functions in both an object and an array. Create a higher-order function that can apply a series of these transformations to a text input in sequence.',
          },
        },
        {
          title: 'Passing Functions as Arguments',
          explanation: `
        <p>Higher-order functions can accept other functions as arguments, enabling powerful patterns for code reuse and abstraction.</p>
        
        <h4>Callback Functions</h4>
        <p>Callbacks are functions passed to another function to be executed later, often used for handling asynchronous operations or customizing behavior.</p>

        <p>Callbacks enable several important patterns in JavaScript:</p>
        <ul>
          <li><strong>Event handling</strong> - Functions executed when events occur</li>
          <li><strong>Asynchronous operations</strong> - Code that runs after operations complete</li>
          <li><strong>Iteration</strong> - Custom processing for collection elements</li>
          <li><strong>Customization</strong> - Adapting generic functions for specific needs</li>
          <li><strong>Middleware</strong> - Processing pipelines where each step can be customized</li>
        </ul>
        
        <div class="code-example">
          <pre><code>// Basic callback pattern
function processArray(array, callback) {
  const result = [];
  for (let i = 0; i < array.length; i++) {
    result.push(callback(array[i], i, array));
  }
  return result;
}

const numbers = [1, 2, 3, 4, 5];
const doubled = processArray(numbers, num => num * 2);
console.log(doubled); // [2, 4, 6, 8, 10]

// Built-in array methods with callbacks
const squares = numbers.map(num => num ** 2);     // [1, 4, 9, 16, 25]
const evens = numbers.filter(num => num % 2 === 0); // [2, 4]
const sum = numbers.reduce((total, num) => total + num, 0); // 15</code></pre>
        </div>
        
        <h4>Function Adapters and Decorators</h4>
        <p>Function adapters take a function and return a new function with enhanced or modified behavior, while preserving the original function's core purpose.</p>

        <p>Common function adapter patterns include:</p>
        <ul>
          <li><strong>Debouncing</strong> - Limiting how often a function can be called</li>
          <li><strong>Throttling</strong> - Ensuring a function runs at a steady rate</li>
          <li><strong>Memoization</strong> - Caching results for better performance</li>
          <li><strong>Logging/debugging</strong> - Adding diagnostic behavior</li>
          <li><strong>Error handling</strong> - Adding consistent error management</li>
        </ul>
        
        <div class="code-example">
          <pre><code>// Function adapter: debounce
function debounce(func, delay) {
  let timeoutId;
  
  return function(...args) {
    clearTimeout(timeoutId);
    
    timeoutId = setTimeout(() => {
      func.apply(this, args);
    }, delay);
  };
}

// Usage
const debouncedSearch = debounce((query) => {
  console.log(\`Searching for: \${query}\`);
  // API call or search operation here
}, 300);

// Strategy pattern with functions
const paymentMethods = {
  creditCard: (amount) => {
    console.log(\`Processing credit card payment of $\${amount}\`);
    // Credit card processing logic
  },
  
  paypal: (amount) => {
    console.log(\`Processing PayPal payment of $\${amount}\`);
    // PayPal processing logic
  }
};

function processPayment(amount, method) {
  const paymentProcessor = paymentMethods[method];
  
  if (!paymentProcessor) {
    throw new Error(\`Payment method \${method} is not supported.\`);
  }
  
  return paymentProcessor(amount);
}</code></pre>
        </div>
        
        <div class="interview-tip">
          <p><span class="interview-icon">🎯</span> <strong>Interview Focus:</strong> Be prepared to discuss common patterns that use functions as arguments and how to implement them.</p>
          <p>Key points to understand:</p>
          <ul>
            <li>How to implement common adapters like debounce and throttle</li>
            <li>Using the strategy pattern with function arguments</li>
            <li>Creating middleware systems like those in Express.js</li>
            <li>How to safely handle errors in callback-based systems</li>
            <li>Performance implications of higher-order functions</li>
          </ul>
        </div>
      `,
          codeExample: `// Event system using higher-order functions
class EventEmitter {
  constructor() {
    this.events = {};
  }
  
  // Register an event handler
  on(event, callback) {
    if (!this.events[event]) {
      this.events[event] = [];
    }
    
    this.events[event].push(callback);
    return this; // For method chaining
  }
  
  // Remove an event handler
  off(event, callback) {
    if (!this.events[event]) return this;
    
    // Remove specific callback if provided
    if (callback) {
      this.events[event] = this.events[event].filter(cb => cb !== callback);
    } else {
      // Otherwise, remove all callbacks for this event
      delete this.events[event];
    }
    
    return this;
  }
  
  // Trigger an event
  emit(event, ...args) {
    if (!this.events[event]) return false;
    
    this.events[event].forEach(callback => {
      try {
        callback(...args);
      } catch (error) {
        console.error(\`Error in event handler for \${event}:\`, error);
      }
    });
    
    return true;
  }
  
  // Execute event handler only once
  once(event, callback) {
    const wrapper = (...args) => {
      this.off(event, wrapper);
      callback(...args);
    };
    
    return this.on(event, wrapper);
  }
}

// Middleware system inspired by Express.js
function createApp() {
  const middlewares = [];
  
  return {
    // Add middleware
    use(middleware) {
      if (typeof middleware !== 'function') {
        throw new Error('Middleware must be a function');
      }
      
      middlewares.push(middleware);
      return this; // For method chaining
    },
    
    // Process request through middleware chain
    handleRequest(request, response) {
      let index = 0;
      
      // Function to move to next middleware
      const next = (error) => {
        // Handle error if provided
        if (error) {
          return this.handleError(error, request, response);
        }
        
        const middleware = middlewares[index++];
        
        if (!middleware) {
          return; // End of middleware chain
        }
        
        try {
          // Call middleware with request, response, and next
          middleware(request, response, next);
        } catch (error) {
          next(error);
        }
      };
      
      // Start middleware chain
      next();
    },
    
    // Basic error handler
    handleError(error, request, response) {
      console.error('Request error:', error);
      response.status = 500;
      response.body = { error: 'Internal Server Error' };
    }
  };
}

// Usage examples
const emitter = new EventEmitter();

// Register event handlers
emitter.on('data', data => console.log('Data received:', data));
emitter.on('data', data => console.log('Data length:', data.length));

// Trigger the event
emitter.emit('data', 'Hello world'); // Both handlers execute

// Create web application with middleware
const app = createApp();

// Add middleware
app.use((req, res, next) => {
  console.log(\`\${req.method} \${req.path}\`);
  next(); // Continue to next middleware
});

app.use((req, res, next) => {
  // Add timestamp to request
  req.timestamp = Date.now();
  next();
});

app.use((req, res) => {
  // Send response
  res.status = 200;
  res.body = { 
    message: 'Hello world',
    timestamp: req.timestamp
  };
});

// Simulate a request
const request = { method: 'GET', path: '/hello' };
const response = {};
app.handleRequest(request, response);
console.log('Response:', response);`,
          exercise: {
            instructions:
              'Implement a simple event system with on(), off(), and trigger() methods using callbacks. Create a data validation system that accepts different validation strategies as function arguments. Build a middleware system similar to Express.js that processes requests through a series of functions, with the ability to break the chain when needed.',
          },
        },
        {
          title: 'Returning Functions from Functions',
          explanation: `
        <p>Higher-order functions can create and return new functions, enabling powerful patterns for creating specialized and reusable code.</p>
        
        <h4>Function Factories</h4>
        <p>Function factories are higher-order functions that generate and return custom functions configured for specific use cases.</p>

        <p>Function factories provide several important benefits:</p>
        <ul>
          <li><strong>Parameterized behavior</strong> - Creating functions with built-in configuration</li>
          <li><strong>Encapsulation</strong> - Hiding implementation details</li>
          <li><strong>Specialized functions</strong> - Creating focused functions for specific tasks</li>
          <li><strong>Code reuse</strong> - Avoiding repetition of common patterns</li>
          <li><strong>Closure-based privacy</strong> - Maintaining private data accessible only to the returned function</li>
        </ul>
        
        <div class="code-example">
          <pre><code>// Function factory - creates specialized functions
function createMultiplier(factor) {
  return function(number) {
    return number * factor;
  };
}

const double = createMultiplier(2);
const triple = createMultiplier(3);

console.log(double(5)); // 10
console.log(triple(5)); // 15

// Creating a family of validation functions
function createValidator(validationRule, errorMessage) {
  return function(value) {
    if (validationRule(value)) {
      return { valid: true, value };
    } else {
      return { valid: false, error: errorMessage };
    }
  };
}

const isRequired = createValidator(
  value => value !== null && value !== undefined && value !== '',
  'This field is required'
);

const isEmail = createValidator(
  value => /^\\S+@\\S+\\.\\S+$/.test(value),
  'Invalid email format'
);</code></pre>
        </div>
        
        <h4>Partial Application and Currying</h4>
        <p>Partial application fixes some arguments of a function, returning a new function that accepts the remaining arguments. Currying transforms a multi-argument function into a sequence of single-argument functions.</p>

        <p>These techniques enable several advanced patterns:</p>
        <ul>
          <li><strong>Specialized functions</strong> - Creating focused variants of general functions</li>
          <li><strong>Function composition</strong> - Making functions more composable</li>
          <li><strong>Reuse with different configurations</strong> - Applying common operations with different settings</li>
          <li><strong>Point-free programming</strong> - Writing code without explicitly mentioning arguments</li>
          <li><strong>Better type inference</strong> - Helping type systems in typed languages</li>
        </ul>
        
        <div class="code-example">
          <pre><code>// Partial application
function partial(fn, ...args) {
  return function(...moreArgs) {
    return fn(...args, ...moreArgs);
  };
}

function add(a, b, c) {
  return a + b + c;
}

const add5 = partial(add, 5);
const add5and10 = partial(add, 5, 10);

console.log(add5(10, 20));  // 35
console.log(add5and10(20)); // 35

// Currying - transforming a function with multiple args into a sequence of functions
function curry(fn) {
  return function curried(...args) {
    if (args.length >= fn.length) {
      return fn.apply(this, args);
    } else {
      return function(...moreArgs) {
        return curried.apply(this, args.concat(moreArgs));
      };
    }
  };
}

// Example with curried function
const curriedAdd = curry((a, b, c) => a + b + c);

console.log(curriedAdd(1)(2)(3)); // 6
console.log(curriedAdd(1, 2)(3)); // 6
console.log(curriedAdd(1)(2, 3)); // 6</code></pre>
        </div>
        
        <h4>Function Composition</h4>
        <p>Function composition combines multiple functions to create a new function where the output of one function becomes the input of the next, enabling clean data transformation pipelines.</p>

        <p>Function composition provides several key advantages:</p>
        <ul>
          <li><strong>Code reuse</strong> - Building complex operations from simple ones</li>
          <li><strong>Readability</strong> - Expressing sequences of operations clearly</li>
          <li><strong>Testability</strong> - Testing small functions independently</li>
          <li><strong>Maintainability</strong> - Modifying individual steps without changing the whole pipeline</li>
          <li><strong>Data transformation</strong> - Creating clean processing workflows</li>
        </ul>
        
        <div class="code-example">
          <pre><code>// Function composition - combining functions
function compose(...fns) {
  return function(x) {
    return fns.reduceRight((value, fn) => fn(value), x);
  };
}

function addOne(x) { return x + 1; }
function double(x) { return x * 2; }
function square(x) { return x * x; }

// Creates a new function that runs right to left: square(double(addOne(x)))
const transform = compose(square, double, addOne);
console.log(transform(5)); // square(double(addOne(5))) = square(double(6)) = square(12) = 144

// Pipe - like compose but runs from left to right
function pipe(...fns) {
  return function(x) {
    return fns.reduce((value, fn) => fn(value), x);
  };
}

// Creates a function that runs left to right: square(double(addOne(x)))
const transform2 = pipe(addOne, double, square);
console.log(transform2(5)); // 144</code></pre>
        </div>
        
        <div class="interview-tip">
          <p><span class="interview-icon">🎯</span> <strong>Interview Focus:</strong> Be prepared to discuss how returning functions creates powerful abstractions and how to implement common functional programming utilities.</p>
          <p>Key concepts to understand:</p>
          <ul>
            <li>Implementing currying and partial application</li>
            <li>Creating function composition utilities</li>
            <li>Using these patterns to create reusable, testable code</li>
            <li>The difference between compose (right-to-left) and pipe (left-to-right)</li>
            <li>Managing function arity and argument order for composability</li>
          </ul>
        </div>
      `,
          codeExample: `// Functional programming utility library
const FP = {
  // Basic function composition (right to left)
  compose(...fns) {
    return function(x) {
      return fns.reduceRight((value, fn) => fn(value), x);
    };
  },
  
  // Function pipeline (left to right)
  pipe(...fns) {
    return function(x) {
      return fns.reduce((value, fn) => fn(value), x);
    };
  },
  
  // Curry a function of any arity
  curry(fn) {
    const arity = fn.length;
    
    return function curried(...args) {
      if (args.length >= arity) {
        return fn.apply(this, args);
      }
      
      return function(...moreArgs) {
        return curried.apply(this, args.concat(moreArgs));
      };
    };
  },
  
  // Partial application
  partial(fn, ...args) {
    return function(...moreArgs) {
      return fn(...args, ...moreArgs);
    };
  },
  
  // Partial application with placeholders
  partialWithPlaceholders(fn, ...args) {
    // Use a symbol as a placeholder
    const placeholder = Symbol('placeholder');
    
    return function(...moreArgs) {
      // Replace placeholders with values from moreArgs
      const finalArgs = args.map(arg => 
        arg === placeholder ? moreArgs.shift() : arg
      ).concat(moreArgs);
      
      return fn(...finalArgs);
    };
  },
  
  // Memoize a function (cache results)
  memoize(fn) {
    const cache = new Map();
    
    return function(...args) {
      // Use stringified args as cache key
      const key = JSON.stringify(args);
      
      if (cache.has(key)) {
        return cache.get(key);
      }
      
      const result = fn(...args);
      cache.set(key, result);
      return result;
    };
  }
};

// Usage examples

// Currying example
const add = (a, b, c) => a + b + c;
const curriedAdd = FP.curry(add);

console.log(curriedAdd(1)(2)(3)); // 6
console.log(curriedAdd(1, 2)(3)); // 6

// Function composition example
const addOne = x => x + 1;
const double = x => x * 2;
const square = x => x * x;

const doMath = FP.compose(square, double, addOne);
console.log(doMath(5)); // 144

// Partial application example
const greet = (greeting, name) => \`\${greeting}, \${name}!\`;
const sayHello = FP.partial(greet, 'Hello');

console.log(sayHello('World')); // "Hello, World!"

// Placeholder example
const divide = (a, b) => a / b;
// We use null as a placeholder here for demonstration
const divideBy = FP.partialWithPlaceholders(divide, null, 2);
console.log(divideBy(10)); // 5 (10/2)

// Memoization example
function fibonacci(n) {
  if (n <= 1) return n;
  return fibonacci(n - 1) + fibonacci(n - 2);
}

// Without memoization, this would be very slow
const fastFibonacci = FP.memoize(function(n) {
  if (n <= 1) return n;
  return fastFibonacci(n - 1) + fastFibonacci(n - 2);
});

console.log(fastFibonacci(40)); // Quick result due to memoization`,
          exercise: {
            instructions:
              'Create a utility library with: 1) A currying function that works with functions of any arity, 2) A partial application function that can bind arguments at specific positions, 3) A function composition utility that can handle both synchronous and asynchronous functions, and 4) A memoization function that caches results of expensive function calls. Demonstrate each utility with practical examples.',
          },
        },
      ],
      prepperSummary: `
    <div class="prepper-summary">
      <h3>🔑 Key Interview Takeaways</h3>
      <ul>
        <li><strong>Functions as First-Class Citizens:</strong> Understand how to treat functions as values, storing them in data structures and passing them around to build flexible, composable systems.</li>
        
        <li><strong>Callback Patterns:</strong> Master the use of callback functions for customizing behavior, handling asynchronous operations, and implementing common patterns like event handling and middleware.</li>
        
        <li><strong>Function Factories:</strong> Learn how to create specialized functions dynamically, using closures to capture and remember the factory parameters.</li>
        
        <li><strong>Currying and Partial Application:</strong> Know the difference between these techniques and how to implement them to create more reusable, composable functions.</li>
        
        <li><strong>Function Composition:</strong> Understand how to combine multiple functions into data transformation pipelines that are easier to understand, test, and maintain.</li>
      </ul>
      
      <h4>📝 Common Interview Questions</h4>
      <ol>
        <li>"What is a higher-order function and why is it useful?"</li>
        <li>"Implement a debounce function that limits how often a function can be called"</li>
        <li>"Create a function that curries any function of n arguments"</li>
        <li>"How would you compose multiple functions together?"</li>
        <li>"Explain the difference between map, filter, and reduce"</li>
      </ol>
    </div>
  `,
    }, // end of lesson 1
    {
      title: 'Closures and Lexical Scope',
      description: "Master closures and understand JavaScript's lexical scoping.",
      sections: [
        {
          title: 'Understanding Closures',
          explanation: `
        <p>Closures are a powerful JavaScript concept where a function retains access to its lexical scope even when executed outside that scope.</p>
        
        <h4>Closure Basics</h4>
        <p>A closure forms when a function "remembers" the variables from its outer scope, even after that outer scope has finished executing.</p>

        <p>Key aspects of closures that make them powerful:</p>
        <ul>
          <li><strong>Data encapsulation</strong> - Creating private variables</li>
          <li><strong>State preservation</strong> - Maintaining values between function calls</li> 
          <li><strong>Function factories</strong> - Creating specialized functions</li>
          <li><strong>Module pattern</strong> - Encapsulating implementation details</li>
          <li><strong>Callback environments</strong> - Preserving scope for later execution</li>
        </ul>
        
        <div class="code-example">
          <pre><code>// Basic closure example
function outer() {
  const outerVar = "I'm from outer function";
  
  function inner() {
    console.log(outerVar); // Can access outerVar
  }
  
  return inner;
}

const closureFunc = outer();
closureFunc(); // "I'm from outer function"

// Closures with parameters
function createGreeter(greeting) {
  return function(name) {
    console.log(\`\${greeting}, \${name}!\`);
  };
}

const sayHello = createGreeter("Hello");
const sayHi = createGreeter("Hi");

sayHello("John"); // "Hello, John!"
sayHi("Jane");    // "Hi, Jane!"</code></pre>
        </div>
        
        <h4>Data Privacy with Closures</h4>
        <p>Closures provide a way to create private variables and methods that can't be accessed directly from outside, similar to encapsulation in other languages.</p>

        <p>Common patterns using closure-based privacy include:</p>
        <ul>
          <li><strong>Module pattern</strong> - Creating encapsulated modules with private state</li>
          <li><strong>Factory functions</strong> - Creating objects with private data</li>
          <li><strong>Stateful functions</strong> - Functions that maintain internal state</li>
          <li><strong>Information hiding</strong> - Protecting implementation details</li>
          <li><strong>Secure data access</strong> - Controlling how data can be modified</li>
        </ul>
        
        <div class="code-example">
          <pre><code>// Closures for data privacy (module pattern)
function createCounter() {
  // Private variable
  let count = 0;
  
  return {
    increment() {
      return ++count;
    },
    decrement() {
      return --count;
    },
    getCount() {
      return count;
    }
  };
}

const counter = createCounter();
console.log(counter.increment()); // 1
console.log(counter.increment()); // 2
console.log(counter.getCount());  // 2
// console.log(counter.count);    // undefined - can't access private variable

// Each closure has its own environment
const counter2 = createCounter();
console.log(counter2.getCount()); // 0 (independent from counter)</code></pre>
        </div>
        
        <h4>Closure Pitfalls</h4>
        <p>Closures can lead to unexpected behavior, particularly in loops, when variables are shared across multiple closures.</p>

        <p>Common issues and solutions include:</p>
        <ul>
          <li><strong>Loop variable capture</strong> - Creating multiple closures in a loop that all reference the same variable</li>
          <li><strong>Memory considerations</strong> - Closures keep references to their outer scope which can lead to memory leaks</li>
          <li><strong>Performance impacts</strong> - Creating many closures can impact memory usage</li>
          <li><strong>Context binding</strong> - Issues with 'this' value in closures</li>
          <li><strong>Closure scope misunderstandings</strong> - Not recognizing which variables are captured</li>
        </ul>
        
        <div class="code-example">
          <pre><code>// Problem with closures in loops
function createFunctions() {
  const functions = [];
  
  for (var i = 0; i < 3; i++) {
    functions.push(function() {
      console.log(i);
    });
  }
  
  return functions;
}

const functions = createFunctions();
functions[0](); // 3 (not 0 as you might expect)
functions[1](); // 3
functions[2](); // 3

// Solution 1: Use let instead of var (block scope)
function createFunctionsFix1() {
  const functions = [];
  
  for (let i = 0; i < 3; i++) { // let creates a new binding for each iteration
    functions.push(function() {
      console.log(i);
    });
  }
  
  return functions;
}

const functionsFix1 = createFunctionsFix1();
functionsFix1[0](); // 0
functionsFix1[1](); // 1

// Solution 2: Use an IIFE
function createFunctionsFix2() {
  const functions = [];
  
  for (var i = 0; i < 3; i++) {
    (function(closureI) {
      functions.push(function() {
        console.log(closureI);
      });
    })(i);
  }
  
  return functions;
}</code></pre>
        </div>
        
        <div class="interview-tip">
          <p><span class="interview-icon">🎯</span> <strong>Interview Focus:</strong> Be prepared to discuss how closures work under the hood, common closure pitfalls, and practical applications of closures.</p>
          <p>Key points to understand:</p>
          <ul>
            <li>How JavaScript's lexical environment and scope chain enable closures</li>
            <li>Using closures to create private variables and methods</li>
            <li>Identifying and fixing common closure-related bugs (like the loop issue)</li>
            <li>Memory implications of closures (potential memory leaks)</li>
            <li>Implementing the module pattern using closures</li>
          </ul>
        </div>
      `,
          codeExample: `// Banking system with private data using closures
function createBankingSystem() {
  // Private data store
  const accounts = new Map();
  let nextAccountId = 1000;
  
  // Transaction history (private)
  const transactions = [];
  
  // Private helper functions
  function generateAccountId() {
    return \`ACC\${nextAccountId++}\`;
  }
  
  function recordTransaction(type, accountId, amount, success = true) {
    const transaction = {
      id: \`TXN\${transactions.length + 1}\`,
      type,
      accountId,
      amount,
      timestamp: new Date(),
      success
    };
    
    transactions.push(transaction);
    return transaction;
  }
  
  // Check if account exists
  function accountExists(accountId) {
    return accounts.has(accountId);
  }
  
  // Validate an amount is positive
  function isValidAmount(amount) {
    return typeof amount === 'number' && amount > 0 && isFinite(amount);
  }
  
  // Public API
  return {
    // Create a new account
    createAccount(initialDeposit = 0) {
      const accountId = generateAccountId();
      
      if (initialDeposit < 0) {
        throw new Error("Initial deposit cannot be negative");
      }
      
      accounts.set(accountId, {
        balance: initialDeposit,
        createdAt: new Date()
      });
      
      if (initialDeposit > 0) {
        recordTransaction('deposit', accountId, initialDeposit);
      }
      
      // Return an account interface with closure over the accountId
      return {
        accountId,
        
        // Get account info
        getInfo() {
          if (!accountExists(accountId)) {
            throw new Error("Account no longer exists");
          }
          
          const account = accounts.get(accountId);
          
          return {
            accountId,
            balance: account.balance,
            createdAt: account.createdAt
          };
        },
        
        // Deposit funds
        deposit(amount) {
          if (!accountExists(accountId)) {
            throw new Error("Account no longer exists");
          }
          
          if (!isValidAmount(amount)) {
            const error = new Error("Invalid deposit amount");
            recordTransaction('deposit', accountId, amount, false);
            throw error;
          }
          
          const account = accounts.get(accountId);
          account.balance += amount;
          
          const transaction = recordTransaction('deposit', accountId, amount);
          
          return {
            success: true,
            newBalance: account.balance,
            transaction
          };
        },
        
        // Withdraw funds
        withdraw(amount) {
          if (!accountExists(accountId)) {
            throw new Error("Account no longer exists");
          }
          
          if (!isValidAmount(amount)) {
            const error = new Error("Invalid withdrawal amount");
            recordTransaction('withdrawal', accountId, amount, false);
            throw error;
          }
          
          const account = accounts.get(accountId);
          
          if (account.balance < amount) {
            const error = new Error("Insufficient funds");
            recordTransaction('withdrawal', accountId, amount, false);
            throw error;
          }
          
          account.balance -= amount;
          
          const transaction = recordTransaction('withdrawal', accountId, amount);
          
          return {
            success: true,
            newBalance: account.balance,
            transaction
          };
        }
      };
    },
    
    // Admin functions
    admin: {
      // Get total number of accounts
      getAccountCount() {
        return accounts.size;
      },
      
      // Get total balance across all accounts
      getTotalBalance() {
        let total = 0;
        for (const account of accounts.values()) {
          total += account.balance;
        }
        return total;
      },
      
      // Get all transaction history
      getTransactionHistory() {
        return [...transactions];
      }
    }
  };
}

// Usage example
const bankingSystem = createBankingSystem();

// Create accounts
const alice = bankingSystem.createAccount(1000);
const bob = bankingSystem.createAccount(500);

console.log(alice.getInfo().balance); // 1000
console.log(bob.getInfo().balance);   // 500

// Perform transactions
alice.deposit(300);
bob.withdraw(200);

// Try to access private data (won't work)
console.log(alice.balance); // undefined

// Use admin interface
console.log(bankingSystem.admin.getAccountCount());    // 2
console.log(bankingSystem.admin.getTotalBalance());    // 1600
console.log(bankingSystem.admin.getTransactionHistory().length); // 4`,
          exercise: {
            instructions:
              'Create a banking system that uses closures for data privacy and security. Implement functions for creating accounts with private balances, making deposits and withdrawals with validation, and generating statements. Then, create a task manager that maintains a private list of tasks with methods to add, remove, and list tasks. Fix the classic closure-in-loop issue using at least two different approaches.',
          },
        },
        {
          title: 'Pure Functions and Immutability',
          explanation: `
        <p>Pure functions and immutability are key concepts in functional programming that lead to more predictable, testable, and maintainable code.</p>
        
        <h4>Pure Functions</h4>
        <p>A pure function always produces the same output for the same input and has no side effects, making it easier to understand, test, and debug.</p>

        <p>Characteristics and benefits of pure functions include:</p>
        <ul>
          <li><strong>Deterministic</strong> - Same inputs always produce same outputs</li>
          <li><strong>No side effects</strong> - Don't modify external state or perform I/O</li>
          <li><strong>Referential transparency</strong> - Can be replaced with their output values</li>
          <li><strong>Easy testing</strong> - Simple input/output validation without mocks</li>
          <li><strong>Parallelization</strong> - Can be run in parallel safely</li>
          <li><strong>Memoization</strong> - Results can be cached for performance</li>
        </ul>
        
        <div class="code-example">
          <pre><code>// Pure function example
function add(a, b) {
  return a + b;
}

console.log(add(2, 3)); // 5
console.log(add(2, 3)); // Always 5, no matter when or how many times called

// Pure function for array transformation
function addElement(arr, element) {
  // Create a new array instead of modifying the original
  return [...arr, element];
}

const numbers = [1, 2, 3];
const newNumbers = addElement(numbers, 4);
console.log(numbers);     // [1, 2, 3] - original unchanged
console.log(newNumbers);  // [1, 2, 3, 4]</code></pre>
        </div>
        
        <h4>Impure Functions and Side Effects</h4>
        <p>Impure functions have side effects like modifying external state, making I/O operations, or generating random values, which makes them harder to predict and test.</p>

        <p>Common side effects that make functions impure:</p>
        <ul>
          <li><strong>Modifying global variables</strong> or parameters</li>
          <li><strong>I/O operations</strong> (file, network, database access)</li>
          <li><strong>DOM manipulation</strong> or other external API calls</li>
          <li><strong>Generating random values</strong> or depending on the current time</li>
          <li><strong>Throwing exceptions</strong> or affecting program flow in unexpected ways</li>
        </ul>
        
        <div class="code-example">
          <pre><code>// Impure function examples
let counter = 0;

// Impure - modifies external state
function impureIncrement() {
  counter++;
  return counter;
}

console.log(impureIncrement()); // 1
console.log(impureIncrement()); // 2 - different result for same inputs

// Impure - modifies input arguments
function impureAddElement(arr, element) {
  arr.push(element); // Modifies the original array
  return arr;
}

// Impure - depends on external state
function getCurrentTime() {
  return new Date().toLocaleTimeString(); // Depends on current time
}</code></pre>
        </div>
        
        <h4>Immutable Data Patterns</h4>
        <p>Working with immutable data means creating new copies instead of modifying existing data structures, which helps prevent bugs and makes changes easier to track.</p>

        <p>Common immutability patterns include:</p>
        <ul>
          <li><strong>Object spread operator</strong> - Creating new objects with modified properties</li>
          <li><strong>Array methods</strong> like map, filter, reduce instead of mutating operations</li>
          <li><strong>Persistent data structures</strong> - Specialized data structures that efficiently create "changed" versions</li>
          <li><strong>Immutability libraries</strong> like Immutable.js or Immer</li>
          <li><strong>Treating data as immutable</strong> by convention, even in languages without enforced immutability</li>
        </ul>
        
        <div class="code-example">
          <pre><code>// Refactoring impure functions to pure ones

// Impure
function calculateTotal(products) {
  let total = 0;
  
  for (const product of products) {
    product.subtotal = product.price * product.quantity; // Side effect
    total += product.subtotal;
  }
  
  return total;
}

// Pure version
function calculateTotalPure(products) {
  return products.reduce((total, product) => {
    return total + (product.price * product.quantity);
  }, 0);
}

// If we need the subtotals, return a new array with calculated values
function calculateTotalWithSubtotals(products) {
  const productsWithSubtotals = products.map(product => ({
    ...product,
    subtotal: product.price * product.quantity
  }));
  
  const total = productsWithSubtotals.reduce(
    (sum, product) => sum + product.subtotal, 0
  );
  
  return { total, products: productsWithSubtotals };
}</code></pre>
        </div>
        
        <div class="interview-tip">
          <p><span class="interview-icon">🎯</span> <strong>Interview Focus:</strong> Be prepared to identify and write pure functions, recognize side effects, and refactor impure code.</p>
          <p>Key points to understand:</p>
          <ul>
            <li>Benefits of pure functions for testing, debugging, and parallelization</li>
            <li>Techniques for making impure operations pure (e.g., dependency injection)</li>
            <li>Working with immutable data structures efficiently</li>
            <li>Performance considerations when using immutable patterns</li>
            <li>Using pure functions to enable memoization and other optimizations</li>
          </ul>
        </div>
      `,
          codeExample: `// Shopping cart with pure functions and immutability
const ShoppingCart = {
  // Create a new empty cart
  createCart() {
    return {
      items: [],
      discounts: []
    };
  },
  
  // Add an item to the cart (pure)
  addItem(cart, item) {
    // Validate item
    if (!item.id || !item.name || typeof item.price !== 'number') {
      throw new Error('Invalid item format');
    }
    
    // Add quantity if not specified
    const newItem = {
      ...item,
      quantity: item.quantity || 1
    };
    
    // Check if item already exists
    const existingItemIndex = cart.items.findIndex(i => i.id === newItem.id);
    
    if (existingItemIndex >= 0) {
      // Create new array with updated item
      const newItems = [...cart.items];
      newItems[existingItemIndex] = {
        ...newItems[existingItemIndex],
        quantity: newItems[existingItemIndex].quantity + newItem.quantity
      };
      
      return {
        ...cart,
        items: newItems
      };
    }
    
    // Item doesn't exist, add to cart
    return {
      ...cart,
      items: [...cart.items, newItem]
    };
  },
  
  // Remove an item from the cart (pure)
  removeItem(cart, itemId) {
    return {
      ...cart,
      items: cart.items.filter(item => item.id !== itemId)
    };
  },
  
  // Update item quantity (pure)
  updateQuantity(cart, itemId, quantity) {
    if (quantity <= 0) {
      // If quantity is zero or negative, remove the item
      return this.removeItem(cart, itemId);
    }
    
    return {
      ...cart,
      items: cart.items.map(item => 
        item.id === itemId
          ? { ...item, quantity }
          : item
      )
    };
  },
  
  // Add a discount to the cart (pure)
  addDiscount(cart, discount) {
    // Validate discount
    if (!discount.code || typeof discount.percentage !== 'number') {
      throw new Error('Invalid discount format');
    }
    
    // Check if discount already exists
    if (cart.discounts.some(d => d.code === discount.code)) {
      return cart; // No change needed
    }
    
    return {
      ...cart,
      discounts: [...cart.discounts, discount]
    };
  },
  
  // Calculate totals (pure)
  calculateTotals(cart) {
    // Calculate subtotals for each item
    const itemsWithSubtotals = cart.items.map(item => ({
      ...item,
      subtotal: item.price * item.quantity
    }));
    
    // Calculate cart subtotal
    const subtotal = itemsWithSubtotals.reduce(
      (sum, item) => sum + item.subtotal, 0
    );
    
    // Apply discounts
    let discountAmount = 0;
    const appliedDiscounts = [];
    
    for (const discount of cart.discounts) {
      const amount = subtotal * (discount.percentage / 100);
      discountAmount += amount;
      
      appliedDiscounts.push({
        ...discount,
        amount
      });
    }
    
    // Calculate final total
    const total = Math.max(0, subtotal - discountAmount);
    
    return {
      items: itemsWithSubtotals,
      subtotal,
      discounts: appliedDiscounts,
      discountAmount,
      total
    };
  }
};

// Usage example
let cart = ShoppingCart.createCart();

// Add items (each operation returns a new cart)
cart = ShoppingCart.addItem(cart, { id: 'p1', name: 'Product 1', price: 20 });
cart = ShoppingCart.addItem(cart, { id: 'p2', name: 'Product 2', price: 30, quantity: 2 });

// Add a discount
cart = ShoppingCart.addDiscount(cart, { code: 'SUMMER10', percentage: 10 });

// Calculate totals
const totals = ShoppingCart.calculateTotals(cart);
console.log(totals.subtotal); // 80
console.log(totals.discountAmount); // 8
console.log(totals.total); // 72

// Update quantity
cart = ShoppingCart.updateQuantity(cart, 'p1', 3);
const updatedTotals = ShoppingCart.calculateTotals(cart);
console.log(updatedTotals.total); // 96 (after discount)`,
          exercise: {
            instructions:
              'Identify and refactor several impure functions into pure ones. Create pure alternatives for: 1) A shopping cart utility that calculates totals and applies discounts, 2) A user profile updater that modifies user properties, and 3) A data transformer that sorts and filters a collection. Implement a memoization function that can cache the results of pure functions to improve performance.',
          },
        },
        {
          title: 'Functional Programming Patterns',
          explanation: `
        <p>Functional programming patterns leverage higher-order functions, immutability, and composition to create cleaner, more maintainable code.</p>
        
        <h4>Array Transformation Methods</h4>
        <p>JavaScript's built-in array methods like map, filter, and reduce allow for declarative data transformations that focus on what to do rather than how to do it.</p>

        <p>Core array transformation methods include:</p>
        <ul>
          <li><strong>map()</strong> - Transform each element into something new</li>
          <li><strong>filter()</strong> - Keep only elements that pass a test</li>
          <li><strong>reduce()</strong> - Combine all elements into a single result</li>
          <li><strong>flatMap()</strong> - Map and then flatten results</li>
          <li><strong>every()/some()</strong> - Test if all/any elements pass a condition</li>
        </ul>
        
        <div class="code-example">
          <pre><code>// Array transformation methods
const numbers = [1, 2, 3, 4, 5];

// map - transform each element
const doubled = numbers.map(n => n * 2);
console.log(doubled); // [2, 4, 6, 8, 10]

// filter - keep elements that pass a test
const evens = numbers.filter(n => n % 2 === 0);
console.log(evens); // [2, 4]

// reduce - accumulate a result
const sum = numbers.reduce((total, n) => total + n, 0);
console.log(sum); // 15

// Combining array methods
const sumOfSquaresOfEvens = numbers
  .filter(n => n % 2 === 0)
  .map(n => n * n)
  .reduce((total, n) => total + n, 0);

console.log(sumOfSquaresOfEvens); // 20 (4 + 16)</code></pre>
        </div>
        
        <h4>Function Composition</h4>
        <p>Function composition creates new functions by combining existing ones, enabling the creation of clean data transformation pipelines.</p>

        <p>Key aspects of function composition include:</p>
        <ul>
          <li><strong>Building complex operations</strong> from simple ones</li>
          <li><strong>Creating reusable pipelines</strong> of operations</li>
          <li><strong>Point-free style</strong> programming (tacit programming)</li>
          <li><strong>Better readability</strong> by focusing on transformations, not implementation</li>
          <li><strong>Improved testability</strong> by testing small functions individually</li>
        </ul>
        
        <div class="code-example">
          <pre><code>// Function composition
function compose(...fns) {
  return x => fns.reduceRight((y, f) => f(y), x);
}

const double = x => x * 2;
const square = x => x * x;
const addOne = x => x + 1;

const doubleSquareAddOne = compose(addOne, square, double);
console.log(doubleSquareAddOne(3)); // 37 (3*2=6, 6^2=36, 36+1=37)

// Point-free style (tacit programming)
// Instead of:
const incrementAll = array => array.map(x => x + 1);

// Point-free version:
const increment = x => x + 1;
const map = fn => array => array.map(fn);
const incrementAllPointFree = map(increment);</code></pre>
        </div>
        
        <h4>Immutable Data Operations</h4>
        <p>Working with data immutably involves creating new copies with modifications rather than changing existing structures, leading to more predictable state management.</p>

        <p>Common immutable update patterns:</p>
        <ul>
          <li><strong>Object spread</strong> for updating properties: <code>{ ...obj, prop: newValue }</code></li>
          <li><strong>Array spread</strong> for adding elements: <code>[...arr, newItem]</code></li>
          <li><strong>Array methods</strong> like map, filter, concat instead of push, splice, etc.</li>
          <li><strong>Structured cloning</strong> for complex nested updates</li>
          <li><strong>Lenses or selectors</strong> for deep, targeted updates</li>
        </ul>
        
        <div class="code-example">
          <pre><code>// Immutable data manipulation
const user = { name: "John", age: 30 };

// Updating a property immutably
const olderUser = { ...user, age: 31 };
console.log(user);       // { name: "John", age: 30 }
console.log(olderUser);  // { name: "John", age: 31 }

// Immutable array operations
const addItem = (array, item) => [...array, item];
const removeItem = (array, index) => [
  ...array.slice(0, index),
  ...array.slice(index + 1)
];
const updateItem = (array, index, newItem) => [
  ...array.slice(0, index),
  newItem,
  ...array.slice(index + 1)
];</code></pre>
        </div>
        
        <div class="interview-tip">
          <p><span class="interview-icon">🎯</span> <strong>Interview Focus:</strong> Be prepared to discuss functional patterns for solving common programming problems and their benefits over imperative approaches.</p>
          <p>Key points to understand:</p>
          <ul>
            <li>Using map, filter, and reduce to replace imperative loops</li>
            <li>Creating data transformation pipelines with function composition</li>
            <li>Managing state changes immutably</li>
            <li>Advantages of declarative vs imperative programming styles</li>
            <li>Performance considerations when using functional patterns</li>
          </ul>
        </div>
      `,
          codeExample: `// Data processing library using functional programming
const DataProcessor = {
  // Transform a collection with a series of operations
  process(data, ...operations) {
    return operations.reduce((result, operation) => operation(result), data);
  },
  
  // Filter operation creator
  where(predicate) {
    return data => data.filter(predicate);
  },
  
  // Map operation creator
  select(mapping) {
    return data => data.map(mapping);
  },
  
  // Sort operation creator
  orderBy(property, direction = 'asc') {
    return data => {
      const multiplier = direction.toLowerCase() === 'desc' ? -1 : 1;
      
      return [...data].sort((a, b) => {
        const valueA = typeof property === 'function' ? property(a) : a[property];
        const valueB = typeof property === 'function' ? property(b) : b[property];
        
        if (typeof valueA === 'string' && typeof valueB === 'string') {
          return multiplier * valueA.localeCompare(valueB);
        }
        
        return multiplier * (valueA - valueB);
      });
    };
  },
  
  // Group by operation creator
  groupBy(keySelector) {
    return data => {
      return data.reduce((groups, item) => {
        const key = typeof keySelector === 'function' 
          ? keySelector(item) 
          : item[keySelector];
          
        if (!groups[key]) {
          groups[key] = [];
        }
        
        groups[key].push(item);
        return groups;
      }, {});
    };
  },
  
  // Take first n elements
  take(n) {
    return data => data.slice(0, n);
  },
  
  // Skip first n elements
  skip(n) {
    return data => data.slice(n);
  },
  
  // Get distinct elements by property or full object
  distinct(property) {
    return data => {
      if (!property) {
        return [...new Set(data)];
      }
      
      const seen = new Set();
      return data.filter(item => {
        const value = typeof property === 'function' 
          ? property(item) 
          : item[property];
          
        if (seen.has(value)) {
          return false;
        }
        
        seen.add(value);
        return true;
      });
    };
  },
  
  // Combine multiple datasets
  union(...datasets) {
    return data => {
      return [...data, ...datasets.flat()];
    };
  },
  
  // Create a query builder for chaining operations
  query(initialData) {
    const operations = [];
    
    const builder = {
      // Add operations to the chain
      where(predicate) {
        operations.push(DataProcessor.where(predicate));
        return builder;
      },
      
      select(mapping) {
        operations.push(DataProcessor.select(mapping));
        return builder;
      },
      
      orderBy(property, direction) {
        operations.push(DataProcessor.orderBy(property, direction));
        return builder;
      },
      
      groupBy(keySelector) {
        operations.push(DataProcessor.groupBy(keySelector));
        return builder;
      },
      
      take(n) {
        operations.push(DataProcessor.take(n));
        return builder;
      },
      
      skip(n) {
        operations.push(DataProcessor.skip(n));
        return builder;
      },
      
      distinct(property) {
        operations.push(DataProcessor.distinct(property));
        return builder;
      },
      
      // Execute the query and return results
      toArray() {
        return DataProcessor.process(initialData, ...operations);
      },
      
      // Get the first result or undefined
      first() {
        const results = this.take(1).toArray();
        return results.length > 0 ? results[0] : undefined;
      },
      
      // Count results
      count() {
        return this.toArray().length;
      }
    };
    
    return builder;
  }
};

// Example usage
const products = [
  { id: 1, name: "Laptop", price: 1200, category: "Electronics" },
  { id: 2, name: "Phone", price: 800, category: "Electronics" },
  { id: 3, name: "Desk Chair", price: 250, category: "Furniture" },
  { id: 4, name: "Desk", price: 350, category: "Furniture" },
  { id: 5, name: "Headphones", price: 100, category: "Electronics" },
  { id: 6, name: "Monitor", price: 400, category: "Electronics" }
];

// Using individual operations
const expensiveElectronics = DataProcessor.process(
  products,
  DataProcessor.where(p => p.category === "Electronics"),
  DataProcessor.where(p => p.price > 500),
  DataProcessor.orderBy("price", "desc")
);

console.log(expensiveElectronics); // [Laptop, Phone]

// Using the query builder
const affordableProductsByCategory = DataProcessor.query(products)
  .where(p => p.price < 500)
  .orderBy("name")
  .groupBy("category")
  .toArray();

console.log(affordableProductsByCategory);
/*
{
  "Electronics": [Headphones, Monitor],
  "Furniture": [Desk, Desk Chair]
}
*/

// Find the most expensive product
const mostExpensive = DataProcessor.query(products)
  .orderBy("price", "desc")
  .first();

console.log(mostExpensive.name); // "Laptop"`,
          exercise: {
            instructions:
              'Create a data processing library using functional programming principles to: 1) Transform a dataset of products with operations for filtering, mapping, and reducing, 2) Implement a simple state management system that maintains immutability, 3) Create a validator that composes multiple validation functions, and 4) Build a query system for filtering and sorting collections based on multiple criteria.',
          },
        },
      ],
      prepperSummary: `
    <div class="prepper-summary">
      <h3>🔑 Key Interview Takeaways</h3>
      <ul>
        <li><strong>Closures:</strong> Understand how closures provide a way to create private variables and remember their lexical environment, enabling advanced patterns like modules and data encapsulation.</li>
        
        <li><strong>Closure Pitfalls:</strong> Be able to identify and fix common closure-related bugs, especially in loops, by using block scoping (let) or IIFEs.</li>
        
        <li><strong>Pure Functions:</strong> Know the characteristics of pure functions (same output for same input, no side effects) and their benefits for testing, debugging, and code maintenance.</li>
        
        <li><strong>Immutability:</strong> Master patterns for working with data immutably to avoid bugs from unexpected mutations and enable features like time-travel debugging.</li>
        
        <li><strong>Functional Programming:</strong> Leverage functional programming techniques like map/filter/reduce and function composition to create cleaner, more maintainable code.</li>
      </ul>
      
      <h4>📝 Common Interview Questions</h4>
      <ol>
        <li>"Explain how closures work in JavaScript and give a practical example"</li>
        <li>"What's wrong with this code: for(var i=0; i<3; i++) { setTimeout(() => console.log(i), 1000); }"</li>
        <li>"What is a pure function and what are its benefits?"</li>
        <li>"How would you update a deeply nested property immutably?"</li>
        <li>"Explain map, filter, and reduce with examples of when you'd use each"</li>
      </ol>
    </div>
  `,
    }, // end of lesson 2
    {
      title: 'Pure Functions and Side Effects',
      description: 'Understand pure functions, side effects, and their impact on code quality.',
      sections: [
        {
          title: 'Pure Functions',
          explanation: `
        <p>Pure functions are a cornerstone of functional programming that lead to more predictable and testable code.</p>
        
        <h4>What Makes a Function Pure</h4>
        <p>A pure function always returns the same output for the same input and produces no side effects, making code easier to reason about and test.</p>

        <p>For a function to be considered pure, it must meet two key criteria:</p>
        <ul>
          <li><strong>Deterministic output</strong> - Given the same inputs, it always returns the same output, regardless of when or how many times it's called</li>
          <li><strong>No side effects</strong> - It doesn't modify any state outside its scope or interact with the external world (no I/O, DOM modifications, etc.)</li>
          <li><strong>Relies only on inputs</strong> - The function's output depends only on its input parameters, not on external state</li>
          <li><strong>Doesn't modify inputs</strong> - It treats arguments as immutable, creating new values instead of modifying inputs</li>
          <li><strong>No observable effects</strong> beyond returning a value - It doesn't trigger changes elsewhere in the system</li>
        </ul>
        
        <div class="code-example">
          <pre><code>// Pure function examples
function add(a, b) {
  return a + b;
}

function calculateCircleArea(radius) {
  return Math.PI * radius * radius;
}

function formatName(firstName, lastName) {
  return \`\${firstName} \${lastName}\`;
}

// Pure array transformation
function addToArray(arr, item) {
  return [...arr, item]; // Returns new array, doesn't modify original
}

// Pure object transformation
function updateProperty(obj, key, value) {
  return { ...obj, [key]: value }; // Returns new object
}</code></pre>
        </div>
        
        <h4>Benefits of Pure Functions</h4>
        <p>Pure functions provide several advantages that make them valuable for building robust applications.</p>

        <p>Key benefits that make pure functions powerful:</p>
        <ul>
          <li><strong>Predictability</strong> - Behavior is consistent and depends only on inputs</li>
          <li><strong>Testability</strong> - Easy to test without mocks or complex setup</li>
          <li><strong>Memoization</strong> - Results can be cached for performance optimization</li>
          <li><strong>Parallelization</strong> - Can safely run in parallel without race conditions</li>
          <li><strong>Reasoning</strong> - Simpler to understand and debug without side effects</li>
          <li><strong>Composition</strong> - Easily combined to build more complex functions</li>
        </ul>
        
        <div class="code-example">
          <pre><code>// 1. Predictable - always same output for same input
function multiply(a, b) {
  return a * b;
}
console.log(multiply(2, 3)); // Always 6, no matter when called

// 2. Testable - easy to verify with simple assertions
function sum(numbers) {
  return numbers.reduce((total, n) => total + n, 0);
}
// Test: sum([1, 2, 3]) should always return 6

// 3. Cacheable/Memoizable - results can be cached
const memoize = (fn) => {
  const cache = new Map();
  return (...args) => {
    const key = JSON.stringify(args);
    if (cache.has(key)) return cache.get(key);
    const result = fn(...args);
    cache.set(key, result);
    return result;
  };
};

const memoizedCalculation = memoize((n) => {
  console.log('Calculating...');
  return n * n;
});

memoizedCalculation(4); // Logs "Calculating..." and returns 16
memoizedCalculation(4); // Directly returns 16 (no calculation)</code></pre>
        </div>
        
        <div class="interview-tip">
          <p><span class="interview-icon">🎯</span> <strong>Interview Focus:</strong> Be prepared to identify pure vs. impure functions and refactor impure functions to make them pure.</p>
          <p>Key points to understand:</p>
          <ul>
            <li>The definition of referential transparency (replacing a function with its result doesn't change the program)</li>
            <li>How to identify side effects in existing code</li>
            <li>Techniques for making impure operations pure through function parameters</li>
            <li>The relationship between pure functions and testing</li>
            <li>When pure functions might not be the best approach (I/O, UIs, etc.)</li>
          </ul>
        </div>
      `,
          codeExample: `// Pure function examples and refactoring

// Example 1: Simple pure math utility
const MathUtils = {
  // Pure - always returns same output for same input
  square: x => x * x,
  sum: arr => arr.reduce((total, n) => total + n, 0),
  average: arr => arr.length ? arr.reduce((total, n) => total + n, 0) / arr.length : 0,
  
  // Stats function that returns multiple values
  stats: arr => {
    if (!arr.length) return { min: null, max: null, sum: 0, avg: 0 };
    
    const min = Math.min(...arr);
    const max = Math.max(...arr);
    const sum = arr.reduce((total, n) => total + n, 0);
    const avg = sum / arr.length;
    
    return { min, max, sum, avg };
  }
};

// Example 2: Refactoring an impure function to a pure function

// Impure version - modifies input and uses external state
let total = 0;
function impureProcessCart(cart) {
  for (let i = 0; i < cart.items.length; i++) {
    cart.items[i].total = cart.items[i].price * cart.items[i].quantity;
    total += cart.items[i].total;
  }
  return total;
}

// Pure version - doesn't modify input or use external state
function pureProcessCart(cart) {
  return {
    items: cart.items.map(item => ({
      ...item,
      total: item.price * item.quantity
    })),
    grandTotal: cart.items.reduce(
      (sum, item) => sum + (item.price * item.quantity), 
      0
    )
  };
}

// Example 3: Handling side effects with dependency injection
// Impure: Directly uses console.log
function impureLogTotal(total) {
  console.log(\`Total: $\${total.toFixed(2)}\`);
  return total;
}

// Pure: Takes the logger as a parameter
function pureLogTotal(total, logger) {
  logger(\`Total: $\${total.toFixed(2)}\`);
  return total;
}

// Usage with real side effect
pureLogTotal(42.5, console.log);

// Usage for testing (no actual side effect)
const testLogger = message => {
  // For testing: assert that message is correct
  return message;
};
pureLogTotal(42.5, testLogger);`,
          exercise: {
            instructions:
              'Identify whether each function is pure or impure and explain why. Then, refactor the impure functions to make them pure: 1) A function that calculates the total price of items in a shopping cart while modifying the items, 2) A function that formats a user\'s name while also updating a "lastAccessed" field, 3) A function that filters an array based on the current date, and 4) A function that validates form data and directly updates the UI with error messages.',
          },
        },
        {
          title: 'Side Effects',
          explanation: `
        <p>Side effects are any changes to state outside a function's scope, or interactions with the external world.</p>
        
        <h4>Common Side Effects</h4>
        <p>Understanding what constitutes a side effect helps identify potential issues in your code and areas that need special attention for testing.</p>

        <p>Common types of side effects in JavaScript include:</p>
        <ul>
          <li><strong>Modifying external variables</strong> - Changing global or parent scope variables</li>
          <li><strong>Modifying input arguments</strong> - Altering the objects or arrays passed into a function</li>
          <li><strong>File I/O</strong> - Reading from or writing to the file system</li>
          <li><strong>Network requests</strong> - Making API calls or other network operations</li>
          <li><strong>DOM manipulation</strong> - Changing elements on the page</li>
          <li><strong>Database operations</strong> - Queries or updates to a database</li>
          <li><strong>Logging</strong> - Writing to console or logs</li>
          <li><strong>State updates</strong> - Changing application state</li>
        </ul>
        
        <div class="code-example">
          <pre><code>// 1. Modifying external variables
let counter = 0;
function incrementCounter() {
  counter++; // Side effect: modifies external variable
  return counter;
}

// 2. Modifying input parameters
function addToCart(cart, item) {
  cart.items.push(item); // Side effect: modifies input object
  return cart;
}

// 3. I/O operations
function saveToLocalStorage(key, data) {
  localStorage.setItem(key, JSON.stringify(data)); // Side effect: I/O
}

// 4. API calls
async function fetchUserData(userId) {
  const response = await fetch(\`/api/users/\${userId}\`); // Side effect: network request
  return response.json();
}

// 5. DOM manipulation
function updateUI(message) {
  document.getElementById('result').textContent = message; // Side effect: DOM change
}</code></pre>
        </div>
        
        <h4>Managing Side Effects</h4>
        <p>While side effects can't always be avoided, they can be managed to make code more maintainable and testable.</p>

        <p>Strategies for managing side effects effectively:</p>
        <ul>
          <li><strong>Isolation</strong> - Separate pure business logic from code with side effects</li>
          <li><strong>Dependency injection</strong> - Pass in services that perform side effects</li>
          <li><strong>Return descriptions</strong> - Return what should happen rather than doing it directly</li>
          <li><strong>Middleware</strong> - Use dedicated layers to handle side effects</li>
          <li><strong>Effect hooks</strong> - In React and similar frameworks, use specific tools for side effects</li>
          <li><strong>Functional structures</strong> - Use monads or similar patterns to manage effects</li>
        </ul>
        
        <div class="code-example">
          <pre><code>// 1. Isolate side effects from pure logic
function calculateTotal(items) {
  // Pure calculation logic
  return items.reduce((sum, item) => sum + item.price * item.quantity, 0);
}

function displayTotal(total) {
  // Side effect isolated in dedicated function
  document.getElementById('total').textContent = \`$\${total.toFixed(2)}\`;
}

// 2. Dependency injection for testability
function processPayment(payment, paymentGateway) {
  // Business logic
  const { amount, currency, customer } = payment;
  
  // Side effect injected as dependency
  return paymentGateway.charge(amount, currency, customer);
}

// 3. Return side effect results instead of performing them
function createEmailMessage(user, template) {
  // Returns the message to send rather than sending it directly
  return {
    to: user.email,
    subject: template.subject,
    body: template.body.replace('{{name}}', user.name)
  };
}

// The caller decides when to perform the side effect
function sendEmail(message, emailService) {
  return emailService.send(message);
}</code></pre>
        </div>
        
        <div class="interview-tip">
          <p><span class="interview-icon">🎯</span> <strong>Interview Focus:</strong> Be prepared to discuss strategies for managing side effects in a functional programming context.</p>
          <p>Key concepts to understand:</p>
          <ul>
            <li>Identifying different types of side effects in code</li>
            <li>Separating pure business logic from side effects</li>
            <li>Using functional programming techniques like monads for handling side effects</li>
            <li>Testing strategies for code with side effects</li>
            <li>When side effects are necessary and appropriate</li>
          </ul>
        </div>
      `,
          codeExample: `// Example: User Authentication System
// Separating pure logic from side effects

// Pure Functions
const AuthLogic = {
  // Validate credentials (pure)
  validateCredentials(email, password) {
    const errors = {};
    
    if (!email || !email.includes('@')) {
      errors.email = 'Valid email is required';
    }
    
    if (!password || password.length < 8) {
      errors.password = 'Password must be at least 8 characters';
    }
    
    return {
      isValid: Object.keys(errors).length === 0,
      errors
    };
  },
  
  // Generate auth token (pure)
  generateToken(userId, role, expiresIn = '1h') {
    // In a real app, this would use a library like JWT
    // This is a simplified example
    const expiration = Date.now() + (expiresIn === '1h' ? 3600000 : 86400000);
    
    return {
      token: \`AUTH_\${userId}_\${role}_\${expiration}\`,
      expiresAt: new Date(expiration)
    };
  },
  
  // Parse token (pure)
  parseToken(token) {
    if (!token || !token.startsWith('AUTH_')) {
      return { isValid: false };
    }
    
    const parts = token.split('_');
    if (parts.length !== 4) {
      return { isValid: false };
    }
    
    const [, userId, role, expiration] = parts;
    const expiresAt = Number(expiration);
    
    return {
      isValid: Date.now() < expiresAt,
      userId,
      role,
      expiresAt: new Date(expiresAt)
    };
  }
};

// Side Effects Layer
const AuthService = {
  // Database interaction
  async findUser(email, dbClient) {
    // Side effect: database query
    return dbClient.users.findOne({ email });
  },
  
  // Password verification
  async verifyPassword(plainPassword, hashedPassword, crypto) {
    // Side effect: using crypto library
    return crypto.compare(plainPassword, hashedPassword);
  },
  
  // Save token to storage
  saveToken(token, storage) {
    // Side effect: storage I/O
    storage.setItem('auth_token', token);
  },
  
  // Get token from storage
  getToken(storage) {
    // Side effect: storage I/O
    return storage.getItem('auth_token');
  }
};

// Usage: Login Process
async function login(email, password, dependencies) {
  const { dbClient, crypto, storage } = dependencies;
  
  // 1. Pure validation
  const validation = AuthLogic.validateCredentials(email, password);
  if (!validation.isValid) {
    return { success: false, errors: validation.errors };
  }
  
  // 2. Side effect: Find user in database
  const user = await AuthService.findUser(email, dbClient);
  if (!user) {
    return { success: false, errors: { email: 'User not found' } };
  }
  
  // 3. Side effect: Verify password
  const passwordValid = await AuthService.verifyPassword(
    password, 
    user.hashedPassword,
    crypto
  );
  
  if (!passwordValid) {
    return { success: false, errors: { password: 'Incorrect password' } };
  }
  
  // 4. Pure logic: Generate token
  const { token } = AuthLogic.generateToken(user.id, user.role);
  
  // 5. Side effect: Save token
  AuthService.saveToken(token, storage);
  
  return {
    success: true,
    user: {
      id: user.id,
      email: user.email,
      role: user.role
    }
  };
}`,
          exercise: {
            instructions:
              'Create a user profile manager that: 1) Separates pure logic (validation, data transformation) from side effects (API calls, storage), 2) Uses dependency injection for testing, 3) Implements functions to update user profiles with proper error handling, and 4) Demonstrates both the pure logic and side effect handling in action. Include comments explaining where each side effect occurs.',
          },
        },
      ],
      prepperSummary: `
    <div class="prepper-summary">
      <h3>🔑 Key Interview Takeaways</h3>
      <ul>
        <li><strong>Pure Function Definition:</strong> Functions that always return the same output for the same input and have no side effects, making them predictable and easy to test.</li>
        
        <li><strong>Benefits of Pure Functions:</strong> Increased testability, predictability, reusability, and the ability to optimize through techniques like memoization.</li>
        
        <li><strong>Side Effects:</strong> Understand what constitutes a side effect (modifying external state, I/O operations, API calls, DOM manipulation) and how to identify them.</li>
        
        <li><strong>Managing Side Effects:</strong> Techniques for isolating, injecting, and testing code with side effects through dependency injection and separation of concerns.</li>
        
        <li><strong>Refactoring:</strong> How to transform impure functions into pure ones by moving side effects to the boundaries of your application.</li>
      </ul>
      
      <h4>📝 Common Interview Questions</h4>
      <ol>
        <li>"What makes a function pure, and why is that beneficial?"</li>
        <li>"How would you refactor this impure function to make it pure?" (followed by code example)</li>
        <li>"What are the common types of side effects, and how would you manage them?"</li>
        <li>"How would you test code that has side effects?"</li>
        <li>"When might you prefer impure functions over pure ones?"</li>
      </ol>
    </div>
  `,
    }, // end of lesson 3
    {
      title: 'Function Composition',
      description:
        'Learn how to create new functions by combining existing ones to build clean, reusable pipelines.',
      sections: [
        {
          title: 'Basic Function Composition',
          explanation: `
        <p>Function composition is a powerful technique that combines multiple functions to create new ones, enabling clean data transformation pipelines.</p>
        
        <h4>Composition Fundamentals</h4>
        <p>Function composition takes the output of one function and passes it as input to another, creating a chain of operations that can be reused as a single unit.</p>

        <p>Key concepts in function composition:</p>
        <ul>
          <li><strong>Mathematical origin</strong> - Based on mathematical composition where (f ∘ g)(x) = f(g(x))</li>
          <li><strong>Data flow</strong> - Output from one function becomes input to the next</li>
          <li><strong>Order matters</strong> - The sequence of functions affects the result</li>
          <li><strong>Single responsibility</strong> - Each function performs one specific task</li>
          <li><strong>Reusability</strong> - Composed functions can be reused in different contexts</li>
        </ul>
        
        <div class="code-example">
          <pre><code>// Basic function composition by hand
function compose2(f, g) {
  return function(x) {
    return f(g(x));
  };
}

// Some simple functions
const double = x => x * 2;
const addOne = x => x + 1;
const square = x => x * x;

// Compose them
const doubleAndAddOne = compose2(addOne, double);
console.log(doubleAndAddOne(3)); // 7 (double 3 → 6, then add 1)

// More complex composition
const doubleThenSquare = compose2(square, double);
console.log(doubleThenSquare(3)); // 36 (double 3 → 6, then square → 36)

// Composition order matters!
const squareThenDouble = compose2(double, square);
console.log(squareThenDouble(3)); // 18 (square 3 → 9, then double → 18)</code></pre>
        </div>
        
        <h4>Multi-Function Composition</h4>
        <p>Real-world composition often involves more than two functions and can be implemented in different directions.</p>

        <p>Two main approaches to multi-function composition:</p>
        <ul>
          <li><strong>Right-to-left composition (compose)</strong> - Traditional mathematical order, functions are applied from right to left</li>
          <li><strong>Left-to-right composition (pipe)</strong> - More intuitive for many developers, with functions applied in the order they're listed</li>
          <li><strong>Variadic implementation</strong> - Accepting any number of functions as arguments</li>
          <li><strong>Handling edge cases</strong> - Empty compositions, single function compositions</li>
          <li><strong>Error propagation</strong> - How errors flow through composed functions</li>
        </ul>
        
        <div class="code-example">
          <pre><code>// Right-to-left composition (traditional mathematical composition)
function compose(...fns) {
  return function(x) {
    return fns.reduceRight((acc, fn) => fn(acc), x);
  };
}

// Left-to-right composition (pipeline)
function pipe(...fns) {
  return function(x) {
    return fns.reduce((acc, fn) => fn(acc), x);
  };
}

// Create a composition of multiple operations
const processData = compose(
  square,
  addOne,
  double
);

// x → double → addOne → square
console.log(processData(3)); // 49 (double 3 → 6, add 1 → 7, square → 49)

// Same operations but in pipeline order (left-to-right)
const processDataPipe = pipe(
  double,
  addOne,
  square
);

// x → double → addOne → square
console.log(processDataPipe(3)); // 49 (same result, more intuitive order)</code></pre>
        </div>
        
        <div class="interview-tip">
          <p><span class="interview-icon">🎯</span> <strong>Interview Focus:</strong> Be prepared to implement composition functions and explain how they enable functional programming patterns.</p>
          <p>Key points to understand:</p>
          <ul>
            <li>The difference between compose (right-to-left) and pipe (left-to-right)</li>
            <li>How function composition enables point-free style programming</li>
            <li>Using composition for building data transformation pipelines</li>
            <li>Handling edge cases like error propagation in compositions</li>
            <li>Composition with functions that take multiple arguments (using currying)</li>
          </ul>
        </div>
      `,
          codeExample: `// Advanced function composition utilities

// Compose with support for multiple arguments and async functions
const compose = (...fns) => {
  // Handle the empty case
  if (fns.length === 0) return (x) => x;
  
  // Handle single function case
  if (fns.length === 1) return fns[0];
  
  // Compose multiple functions (right to left)
  return fns.reduceRight(
    (f, g) => (...args) => {
      const result = g(...args);
      // Handle promises/async functions
      return result instanceof Promise
        ? result.then(f)
        : f(result);
    }
  );
};

// Left-to-right composition (pipeline)
const pipe = (...fns) => {
  // Handle edge cases
  if (fns.length === 0) return (x) => x;
  if (fns.length === 1) return fns[0];
  
  // Compose left to right
  return fns.reduce(
    (f, g) => (...args) => {
      const result = f(...args);
      return result instanceof Promise
        ? result.then(g)
        : g(result);
    }
  );
};

// Utilities for partial application and currying
const partial = (fn, ...presetArgs) => {
  return (...laterArgs) => fn(...presetArgs, ...laterArgs);
};

const curry = (fn, arity = fn.length) => {
  return function curried(...args) {
    if (args.length >= arity) return fn(...args);
    return (...moreArgs) => curried(...args, ...moreArgs);
  };
};

// Example: Data transformation pipeline
// Functions for the pipeline
const parseDate = dateStr => new Date(dateStr);
const getYear = date => date.getFullYear();
const convertToString = num => num.toString();
const padZero = str => str.padStart(2, '0');
const appendPrefix = str => \`YR-\${str}\`;

// Create a composed function
const formatYear = pipe(
  parseDate,
  getYear,
  convertToString,
  padZero,
  appendPrefix
);

console.log(formatYear('2021-01-15')); // "YR-21"
console.log(formatYear('1999-12-31')); // "YR-99"

// Example: User data transformation pipeline
const users = [
  { id: 1, name: 'John Doe', email: 'john@example.com', role: 'admin' },
  { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'user' },
  { id: 3, name: 'Bob Johnson', email: 'bob@example.com', role: 'user' }
];

// Step 1: Create specialized functions
const filterByRole = role => users => users.filter(user => user.role === role);
const extractEmails = users => users.map(user => user.email);
const formatList = separator => list => list.join(separator);
const wrapInHtml = list => \`<ul>\${list.map(item => \`<li>\${item}</li>\`).join('')}</ul>\`;

// Step 2: Compose them for different purposes
const getUserEmails = pipe(
  filterByRole('user'),
  extractEmails
);

const getEmailList = pipe(
  getUserEmails,
  formatList(', ')
);

const getEmailHtml = pipe(
  getUserEmails,
  wrapInHtml
);

console.log(getUserEmails(users)); // ['jane@example.com', 'bob@example.com']
console.log(getEmailList(users));  // 'jane@example.com, bob@example.com'
console.log(getEmailHtml(users));  // '<ul><li>jane@example.com</li><li>bob@example.com</li></ul>'`,
          exercise: {
            instructions:
              'Create a text processing library using function composition. Implement individual functions for: 1) Converting text to lowercase, 2) Removing special characters, 3) Trimming whitespace, 4) Capitalizing the first letter of each word, and 5) Limiting text to a certain length with ellipsis. Then compose these functions to create specialized text formatters for: a URL slug generator, a title formatter, and a text snippet generator. Use both compose and pipe approaches to demonstrate the difference.',
          },
        },
        {
          title: 'Point-Free Programming',
          explanation: `
        <p>Point-free (or tacit) programming is a style where function definitions don't explicitly identify the arguments, making code more concise and focused on transformations.</p>
        
        <h4>Point-Free Style</h4>
        <p>Point-free programming eliminates unnecessary parameter references, making code more declarative by focusing on the operations rather than data flow.</p>

        <p>Key aspects of point-free programming:</p>
        <ul>
          <li><strong>No explicit arguments</strong> - Functions are defined without naming their parameters</li>
          <li><strong>Function composition</strong> - Heavy reliance on composing specialized functions</li>
          <li><strong>Higher-order functions</strong> - Creating functions that transform other functions</li>
          <li><strong>First-class functions</strong> - Treating functions as values, enabling composition</li>
          <li><strong>Currying and partial application</strong> - Essential techniques for enabling point-free style</li>
          <li><strong>Focus on transformations</strong> - Emphasizing what operations happen, not how data flows</li>
        </ul>
        
        <div class="code-example">
          <pre><code>// Regular style (with points/parameters explicitly mentioned)
const isEven = num => num % 2 === 0;
const getLength = str => str.length;
const getFirstChar = str => str.charAt(0);

// Converting to point-free style
const prop = key => obj => obj[key];
const map = fn => array => array.map(fn);
const filter = predicate => array => array.filter(predicate);

// Regular version
const getNames = users => users.map(user => user.name);

// Point-free version
const getName = prop('name');
const getNames_pointFree = map(getName);

// Another example
// Regular version
const filterEvenNumbers = numbers => numbers.filter(n => n % 2 === 0);

// Point-free version
const isEven = n => n % 2 === 0;
const filterEvenNumbers_pointFree = filter(isEven);</code></pre>
        </div>
        
        <h4>Combining with Composition</h4>
        <p>Point-free programming shines when combined with function composition, making data transformation pipelines clean and declarative.</p>

        <p>Benefits of combining point-free style with composition:</p>
        <ul>
          <li><strong>Improved readability</strong> - Focus on operations, not parameter plumbing</li>
          <li><strong>Reusable building blocks</strong> - Small functions combined in different ways</li>
          <li><strong>Self-documenting code</strong> - Function names describe transformations</li>
          <li><strong>Reduced boilerplate</strong> - Fewer temporary variables and explicit parameters</li>
          <li><strong>Testable units</strong> - Small functions are easier to test in isolation</li>
        </ul>
        
        <div class="code-example">
          <pre><code>// Building blocks
const prop = key => obj => obj[key];
const map = fn => array => array.map(fn);
const filter = predicate => array => array.filter(predicate);
const reduce = (fn, initial) => array => array.reduce(fn, initial);
const pipe = (...fns) => x => fns.reduce((acc, fn) => fn(acc), x);

// Point-free data transformation
const getAges = map(prop('age'));
const sumAll = reduce((acc, val) => acc + val, 0);
const calcAverage = arr => sumAll(arr) / arr.length;

// Combining with composition
const getAverageAge = pipe(
  getAges,
  calcAverage
);

// Without point-free & composition:
function getAverageAge_verbose(users) {
  const ages = users.map(user => user.age);
  const sum = ages.reduce((acc, age) => acc + age, 0);
  return sum / ages.length;
}

// Usage
const users = [
  { name: 'Alice', age: 25 },
  { name: 'Bob', age: 30 },
  { name: 'Charlie', age: 35 }
];

console.log(getAverageAge(users)); // 30</code></pre>
        </div>
        
        <div class="interview-tip">
          <p><span class="interview-icon">🎯</span> <strong>Interview Focus:</strong> Be prepared to discuss the benefits and limitations of point-free style, and when to use it.</p>
          <p>Key points to understand:</p>
          <ul>
            <li>How point-free style increases declarative clarity for some operations</li>
            <li>The relationship between point-free style and higher-order functions</li>
            <li>When point-free becomes too complex and reduces readability</li>
            <li>Using currying and partial application to enable point-free style</li>
            <li>Debugging challenges with point-free code and how to address them</li>
          </ul>
        </div>
      `,
          codeExample: `// Advanced point-free data processing

// Utility functions
const prop = key => obj => obj[key];
const propEq = (key, value) => obj => obj[key] === value;
const map = fn => array => array.map(fn);
const filter = predicate => array => array.filter(predicate);
const sort = (fn) => array => [...array].sort(fn);
const pipe = (...fns) => x => fns.reduce((y, f) => f(y), x);
const groupBy = key => array => {
  return array.reduce((result, item) => {
    const groupKey = typeof key === 'function' ? key(item) : item[key];
    result[groupKey] = result[groupKey] || [];
    result[groupKey].push(item);
    return result;
  }, {});
};

// Sample data
const products = [
  { id: 1, name: 'Laptop', price: 1200, category: 'Electronics', stock: 15 },
  { id: 2, name: 'Headphones', price: 100, category: 'Electronics', stock: 50 },
  { id: 3, name: 'Desk Chair', price: 250, category: 'Furniture', stock: 8 },
  { id: 4, name: 'Coffee Maker', price: 80, category: 'Appliances', stock: 22 },
  { id: 5, name: 'Monitor', price: 350, category: 'Electronics', stock: 5 }
];

// Point-free functions
const getCategory = prop('category');
const getPrice = prop('price');
const getStock = prop('stock');
const getName = prop('name');

const isElectronics = propEq('category', 'Electronics');
const isInStock = product => getStock(product) > 0;
const isExpensive = product => getPrice(product) > 200;

const sortByPrice = sort((a, b) => getPrice(a) - getPrice(b));
const sortByPriceDesc = sort((a, b) => getPrice(b) - getPrice(a));

const calculateTotal = products => 
  products.reduce((sum, product) => sum + getPrice(product), 0);

// Complex point-free pipelines
const getExpensiveElectronics = pipe(
  filter(product => isElectronics(product) && isExpensive(product)),
  sortByPriceDesc
);

const groupByCategory = pipe(
  filter(isInStock),
  groupBy('category')
);

const getProductSummary = pipe(
  map(product => ({
    name: getName(product),
    price: getPrice(product)
  }))
);

const getExpensiveElectronicsSummary = pipe(
  getExpensiveElectronics,
  getProductSummary
);

// Using the point-free functions
console.log('Expensive Electronics:');
console.log(getExpensiveElectronicsSummary(products));

console.log('\\nProducts by Category:');
console.log(groupByCategory(products));

// Specialized report generators
const createInventoryReport = pipe(
  filter(isInStock),
  sortByPrice,
  map(product => ({
    name: getName(product),
    price: \`$\${getPrice(product)}\`,
    stock: getStock(product),
    value: \`$\${getPrice(product) * getStock(product)}\`
  }))
);

console.log('\\nInventory Report:');
console.log(createInventoryReport(products));

// Benefits of this approach:
// 1. Highly reusable components (filter, sort, map functions)
// 2. Easy to compose new workflows from existing pieces
// 3. Declarative code that describes what happens, not how
// 4. Testable individual units`,
          exercise: {
            instructions:
              'Create a point-free data processing library for analyzing sales data. Implement utility functions for: 1) Filtering sales by date range, product, or customer, 2) Grouping sales by various dimensions, 3) Calculating summaries like total revenue and average order value, 4) Identifying top products and customers. Then create composed functions that combine these operations to generate different reports. Make sure your implementation is fully point-free and leverages function composition.',
          },
        },
      ],
      prepperSummary: `
    <div class="prepper-summary">
      <h3>🔑 Key Interview Takeaways</h3>
      <ul>
        <li><strong>Function Composition:</strong> Understand how to combine functions to create reusable pipelines where the output of one function becomes the input of another.</li>
        
        <li><strong>Compose vs Pipe:</strong> Know the difference between compose (right-to-left) and pipe (left-to-right) and when each is more appropriate.</li>
        
        <li><strong>Point-Free Style:</strong> Learn to write more declarative code by eliminating unnecessary parameter references and focusing on function transformations.</li>
        
        <li><strong>Practical Applications:</strong> Recognize scenarios where composition improves code clarity, such as data transformation pipelines and UI event handling.</li>
        
        <li><strong>Code Organization:</strong> Appreciate how composition encourages small, reusable functions that can be combined in different ways to solve complex problems.</li>
      </ul>
      
      <h4>📝 Common Interview Questions</h4>
      <ol>
        <li>"Implement a compose function that works with any number of functions"</li>
        <li>"What's the difference between compose and pipe, and when would you use each?"</li>
        <li>"Convert this code to point-free style" (followed by example)</li>
        <li>"How would you handle asynchronous functions in a composition chain?"</li>
        <li>"What are the benefits and drawbacks of point-free programming?"</li>
      </ol>
    </div>
  `,
    }, // end of lesson 4
  ],
  challenge: {
    description:
      "You're building a data processing system for a small e-commerce startup. The founders, who are big fans of functional programming, have asked you to create a pure, functional utility library to handle their product data and customer information. They want clean, predictable code that the whole team can understand and maintain.",
    requirements: [
      'Implement compose and pipe functions for transforming product data through multiple steps',
      'Create a set of pure array transformation utilities (map, filter, reduce) without using native methods',
      'Build a data validation system using function composition to verify customer information',
      'Implement an immutable state container to track shopping carts using pure functions',
      'Ensure all functions are pure and handle side effects appropriately',
    ],
    starterCode: `// E-Commerce Functional Programming Library
// The startup's entire business logic will depend on this library,
// so make it robust and maintainable!

const FP = {
  // Function composition (implement both)
  compose(...fns) {
    // Implement function composition (right to left)
    // For transforming product data through multiple steps
  },
  
  pipe(...fns) {
    // Implement function pipeline (left to right)
    // For more readable transformations
  },
  
  // Pure array utilities (implement without using native methods)
  map(fn) {
    return arr => {
      // Transform each item in the array
    };
  },
  
  filter(predicate) {
    return arr => {
      // Keep only items that match the predicate
    };
  },
  
  reduce(reducer, initial) {
    return arr => {
      // Accumulate a single value from the array
    };
  },
  
  // Data validation (use composition)
  validator: {
    // Build validators that can be composed together
    // Example: isRequired, isEmail, isValidPassword, etc.
  },
  
  // Immutable state management for shopping carts
  createStore(initialState = {}) {
    // Implement a simple store with get/update methods
    // All updates should return new objects, not mutate
  }
};

// Export your library - the startup's future depends on your code!
export default FP;`,
  },
}

export default functionalProgramming
