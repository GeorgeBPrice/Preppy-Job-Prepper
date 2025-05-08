// curriculum-section-shortlist.js - 20 x JS Shortlist Review

const shortlistPrepper = {
  title: 'Minicourse JS Recapper',
  description: '',
  lessons: [
    {
      title: '20 Essential JavaScript Concepts',
      description:
        'A comprehensive review of the most critical JavaScript concepts for interviews, covering fundamentals, core programming patterns, and front-end development techniques.',
      sections: [
        {
          title: 'JavaScript Fundamentals (3 Key Concepts)',
          explanation: `
        <p>These three fundamental concepts form the foundation of JavaScript and are essential for understanding how the language works:</p>

        <h4>1. Variable Types and Scope</h4>
        <p>Understanding variable declarations and JavaScript's type system is crucial for writing reliable code:</p>

        <p><strong>Variable Declarations:</strong> JavaScript offers three ways to declare variables, each with different behaviors:</p>
        <ul>
          <li><code>var</code> - Function-scoped, hoisted, and can be redeclared</li>
          <li><code>let</code> - Block-scoped, not hoisted (exists in temporal dead zone), can be reassigned</li>
          <li><code>const</code> - Block-scoped, not hoisted, cannot be reassigned (though object contents can be modified)</li>
        </ul>

        <p><strong>Types in JavaScript:</strong> JavaScript has 7 primitive types and object references:</p>
        <ul>
          <li>Primitives: string, number, boolean, null, undefined, symbol, bigint</li>
          <li>Reference types: objects, arrays, functions, dates, RegExp, etc.</li>
        </ul>

        <p><strong>Type Coercion:</strong> JavaScript will automatically convert types in certain operations:</p>
        <ul>
          <li>Loose equality (==) performs type coercion, while strict equality (===) does not</li>
          <li>The + operator concatenates if either operand is a string, otherwise performs addition</li>
          <li>Most other operators (-, *, /) convert operands to numbers</li>
        </ul>

        <p><strong>Pass by Value vs. Reference:</strong> Primitive types are passed by value, while objects are passed by reference.</p>
        
        <div class="code-example">
          <pre><code>// Variable declarations and scope
function scopeExample() {
  if (true) {
    var varVariable = "I'm function-scoped";
    let letVariable = "I'm block-scoped";
    const constVariable = "I'm also block-scoped";
  }
  console.log(varVariable); // Accessible
  // console.log(letVariable); // ReferenceError
}

// Type coercion examples
console.log(1 + "2"); // "12" (number converted to string)
console.log("5" - 1); // 4 (string converted to number)
console.log([] == false); // true (coercion rules)
console.log([] === false); // false (strict equality)

// Pass by value vs reference
let primitive = 42;
let reference = { value: 42 };

function updateValues(p, r) {
  p = 100;
  r.value = 100;
}

updateValues(primitive, reference);
console.log(primitive); // Still 42 (passed by value)
console.log(reference.value); // 100 (passed by reference)</code></pre>
        </div>

        <h4>2. Functions and Closures</h4>
        <p>Functions are first-class citizens in JavaScript, and closures create powerful patterns for managing state and scope:</p>

        <p><strong>Function Types:</strong> JavaScript offers multiple ways to define functions:</p>
        <ul>
          <li>Function declarations: <code>function doSomething() {}</code></li>
          <li>Function expressions: <code>const doSomething = function() {}</code></li>
          <li>Arrow functions: <code>const doSomething = () => {}</code></li>
        </ul>

        <p><strong>Closures:</strong> A closure is a function that remembers and can access its lexical scope even when invoked outside that scope.</p>
        <p>Closures are used for:</p>
        <ul>
          <li>Data privacy and encapsulation</li>
          <li>Creating factory functions</li>
          <li>Maintaining state between function calls</li>
          <li>Implementing the module pattern</li>
        </ul>

        <p><strong>this Binding:</strong> How <code>this</code> is determined depends on the function type and how it's called:</p>
        <ul>
          <li>Regular functions: <code>this</code> depends on how the function is called</li>
          <li>Arrow functions: <code>this</code> is lexically bound (inherits from parent scope)</li>
          <li>Methods: <code>this</code> refers to the object the method is called on</li>
          <li>Explicit binding: <code>call()</code>, <code>apply()</code>, and <code>bind()</code> can explicitly set <code>this</code></li>
        </ul>
        
        <div class="code-example">
          <pre><code>// Function types
function declaration() {
  return "I'm a function declaration";
}

const expression = function() {
  return "I'm a function expression";
};

const arrow = () => "I'm an arrow function";

// Closures for data privacy
function createCounter() {
  let count = 0; // Private variable
  
  return {
    increment() { return ++count; },
    decrement() { return --count; },
    getCount() { return count; }
  };
}

const counter = createCounter();
console.log(counter.increment()); // 1
console.log(counter.increment()); // 2
console.log(counter.getCount()); // 2
// console.log(count); // ReferenceError: count is not defined

// this binding
const user = {
  name: "Alice",
  greetRegular: function() {
    return \`Hello, I'm \${this.name}\`;
  },
  greetArrow: () => {
    return \`Hello, I'm \${this.name}\`; // this is not user!
  }
};

console.log(user.greetRegular()); // "Hello, I'm Alice"
console.log(user.greetArrow()); // "Hello, I'm undefined"</code></pre>
        </div>

        <h4>3. Asynchronous JavaScript</h4>
        <p>Understanding asynchronous programming is critical for modern JavaScript applications:</p>

        <p><strong>Call Stack and Event Loop:</strong> JavaScript is single-threaded, using an event loop to handle asynchronous operations.</p>

        <p><strong>Callbacks:</strong> Traditional way to handle asynchronous operations, but can lead to "callback hell."</p>

        <p><strong>Promises:</strong> Objects representing the eventual completion or failure of an asynchronous operation.</p>
        <ul>
          <li>States: pending, fulfilled, rejected</li>
          <li>Methods: <code>.then()</code>, <code>.catch()</code>, <code>.finally()</code></li>
          <li>Creating promises: <code>new Promise((resolve, reject) => {})</code></li>
          <li>Combining promises: <code>Promise.all()</code>, <code>Promise.race()</code>, <code>Promise.allSettled()</code></li>
        </ul>

        <p><strong>Async/Await:</strong> Syntactic sugar over promises that allows asynchronous code to be written in a more synchronous style.</p>
        <ul>
          <li>async functions always return promises</li>
          <li>await pauses execution until the promise resolves</li>
          <li>Error handling using try/catch blocks</li>
        </ul>
        
        <div class="code-example">
          <pre><code>// Callbacks
function fetchDataWithCallback(callback) {
  setTimeout(() => {
    callback(null, { data: 'Some data' });
  }, 1000);
}

fetchDataWithCallback((error, result) => {
  if (error) {
    console.error(error);
  } else {
    console.log(result);
  }
});

// Promises
function fetchDataWithPromise() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve({ data: 'Some data' });
      // reject(new Error('Failed to fetch data'));
    }, 1000);
  });
}

fetchDataWithPromise()
  .then(result => console.log(result))
  .catch(error => console.error(error));

// Multiple promises
Promise.all([
  fetchDataWithPromise(),
  fetchDataWithPromise()
])
  .then(results => console.log(results))
  .catch(error => console.error(error));

// Async/await
async function fetchData() {
  try {
    const result = await fetchDataWithPromise();
    console.log(result);
    return result;
  } catch (error) {
    console.error(error);
    throw error;
  }
}</code></pre>
        </div>
        
        <div class="interview-tip">
          <p><span class="interview-icon">🎯</span> <strong>Interview Focus:</strong> These fundamentals underpin all JavaScript code. Be prepared to explain scope differences between var, let, and const, demonstrate closures with practical examples, and show your understanding of how promises work under the hood.</p>
          <p>Common interview questions include:</p>
          <ul>
            <li>"What is a closure and how would you use it?"</li>
            <li>"Explain the difference between == and ==="</li>
            <li>"How do promises work and why are they better than callbacks?"</li>
            <li>"What's the difference between arrow functions and regular functions?"</li>
            <li>"Explain how 'this' works in different contexts"</li>
          </ul>
        </div>
      `,
          codeExample: `// Implementing a complex counter with closures and promises
function createAdvancedCounter(startValue = 0) {
  // Private state
  let count = startValue;
  let operations = [];
  let listeners = [];
  
  // Notify all listeners
  function notifyChange() {
    listeners.forEach(listener => listener(count));
  }
  
  // Record operation in history
  function recordOperation(operation, value) {
    operations.push({
      operation,
      value,
      timestamp: new Date()
    });
  }
  
  // Asynchronous operations
  function asyncOperation(operation, value) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        try {
          const result = operation(value);
          resolve(result);
        } catch (error) {
          reject(error);
        }
      }, 100);
    });
  }
  
  return {
    // Synchronous operations
    increment(value = 1) {
      count += value;
      recordOperation('increment', value);
      notifyChange();
      return count;
    },
    
    decrement(value = 1) {
      count -= value;
      recordOperation('decrement', value);
      notifyChange();
      return count;
    },
    
    // Asynchronous operations
    async asyncIncrement(value = 1) {
      return asyncOperation(() => {
        count += value;
        recordOperation('asyncIncrement', value);
        notifyChange();
        return count;
      });
    },
    
    async asyncDecrement(value = 1) {
      return asyncOperation(() => {
        count -= value;
        recordOperation('asyncDecrement', value);
        notifyChange();
        return count;
      });
    },
    
    // Subscribe to changes
    subscribe(callback) {
      listeners.push(callback);
      return () => {
        listeners = listeners.filter(listener => listener !== callback);
      };
    },
    
    // Get current count
    getCount() {
      return count;
    },
    
    // Get operation history
    getHistory() {
      return [...operations]; // Return copy to prevent modification
    },
    
    // Reset counter
    reset() {
      count = startValue;
      recordOperation('reset', startValue);
      notifyChange();
      return count;
    }
  };
}`,
          exercise: {
            instructions:
              'Create a user profile system that implements: (1) Private data using closures, (2) Different function types (declaration, expression, arrow), (3) Asynchronous operations using promises, (4) Proper this binding. The system should allow creating users, updating their information, and retrieving their profile details.',
          },
        },
        {
          title: 'Core JavaScript Programming Concepts (10 Key Concepts)',
          explanation: `
        <p>These ten concepts form the backbone of practical JavaScript programming and are critical for app development and data handling:</p>

        <h4>4. Array Methods</h4>
        <p>Modern JavaScript development heavily relies on array methods for data transformation:</p>

        <p><strong>Key Methods:</strong></p>
        <ul>
          <li><code>map()</code>: Transforms each element in an array, returning a new array</li>
          <li><code>filter()</code>: Returns a new array with elements that pass a test function</li>
          <li><code>reduce()</code>: Accumulates array elements into a single value</li>
          <li><code>forEach()</code>: Executes a function for each array element (no return value)</li>
          <li><code>find()</code>: Returns the first element that satisfies a test function</li>
          <li><code>some()</code>: Tests if at least one element passes a test function</li>
          <li><code>every()</code>: Tests if all elements pass a test function</li>
          <li><code>sort()</code>: Sorts array elements (with optional comparator function)</li>
        </ul>

        <p><strong>Method Chaining:</strong> Combining array methods for complex data transformations.</p>
        
        <div class="code-example">
          <pre><code>const users = [
  { id: 1, name: "Alice", age: 30, active: true },
  { id: 2, name: "Bob", age: 25, active: false },
  { id: 3, name: "Charlie", age: 35, active: true },
  { id: 4, name: "Dave", age: 40, active: true }
];

// Using map
const names = users.map(user => user.name);
console.log(names); // ["Alice", "Bob", "Charlie", "Dave"]

// Using filter
const activeUsers = users.filter(user => user.active);
console.log(activeUsers.length); // 3

// Using reduce
const totalAge = users.reduce((sum, user) => sum + user.age, 0);
console.log(totalAge); // 130

// Chaining methods
const activeUserNames = users
  .filter(user => user.active)
  .map(user => user.name);
console.log(activeUserNames); // ["Alice", "Charlie", "Dave"]

// Using sort (with comparator)
const sortedByAge = [...users].sort((a, b) => a.age - b.age);
console.log(sortedByAge[0].name); // "Bob" (youngest)</code></pre>
        </div>

        <h4>5. Object Manipulation</h4>
        <p>Effective object handling is essential for working with data structures in JavaScript:</p>

        <p><strong>Object Creation and Manipulation:</strong></p>
        <ul>
          <li>Object literals: <code>{ key: value }</code></li>
          <li>Property access: dot notation vs bracket notation</li>
          <li>Computed property names: <code>{ [dynamicKey]: value }</code></li>
          <li>Property shorthand: <code>{ x, y }</code> instead of <code>{ x: x, y: y }</code></li>
        </ul>

        <p><strong>Object Methods:</strong></p>
        <ul>
          <li><code>Object.keys()</code>: Returns an array of a given object's property names</li>
          <li><code>Object.values()</code>: Returns an array of a given object's property values</li>
          <li><code>Object.entries()</code>: Returns an array of key-value pairs</li>
          <li><code>Object.assign()</code>: Copies properties from source objects to a target object</li>
          <li><code>Object.freeze()</code>: Makes an object immutable</li>
        </ul>

        <p><strong>Spread and Rest Operators:</strong></p>
        <ul>
          <li>Spread operator (...): Used to create a shallow copy of an object or merge objects</li>
          <li>Rest operator (...): Collects remaining properties into a new object</li>
        </ul>
        
        <div class="code-example">
          <pre><code>// Object creation and access
const user = {
  name: "Alice",
  age: 30,
  "user-id": 12345 // Property with special characters
};

console.log(user.name); // Dot notation
console.log(user["user-id"]); // Bracket notation (required for special characters)

// Computed property names
const propName = "email";
const userWithEmail = {
  ...user,
  [propName]: "alice@example.com"
};

// Object methods
console.log(Object.keys(user)); // ["name", "age", "user-id"]
console.log(Object.values(user)); // ["Alice", 30, 12345]
console.log(Object.entries(user)); // [["name", "Alice"], ["age", 30], ["user-id", 12345]]

// Merging objects
const defaultSettings = { theme: "light", notifications: true };
const userSettings = { theme: "dark" };
const mergedSettings = { ...defaultSettings, ...userSettings };
console.log(mergedSettings); // { theme: "dark", notifications: true }

// Destructuring
const { name, age, ...rest } = user;
console.log(name); // "Alice"
console.log(rest); // { "user-id": 12345 }</code></pre>
        </div>

        <h4>6. ES6+ Features</h4>
        <p>Modern JavaScript features that improve code readability, maintainability, and functionality:</p>

        <p><strong>Destructuring:</strong></p>
        <ul>
          <li>Array destructuring: <code>const [first, second] = array;</code></li>
          <li>Object destructuring: <code>const { prop1, prop2 } = object;</code></li>
          <li>Default values: <code>const { prop = 'default' } = object;</code></li>
          <li>Renaming properties: <code>const { prop: newName } = object;</code></li>
        </ul>

        <p><strong>Template Literals:</strong> String interpolation with <code>\`\${expression}\`</code></p>

        <p><strong>Default Parameters:</strong> <code>function fn(param = defaultValue) {}</code></p>

        <p><strong>Spread/Rest Operators:</strong> Spread elements (...) or collect them</p>

        <p><strong>Optional Chaining:</strong> <code>object?.property?.nestedProperty</code></p>

        <p><strong>Nullish Coalescing:</strong> <code>value ?? defaultValue</code></p>
        
        <div class="code-example">
          <pre><code>// Destructuring
const [first, second, ...rest] = [1, 2, 3, 4, 5];
console.log(first, second, rest); // 1, 2, [3, 4, 5]

const { name, age = 25, role: position = "Member" } = { name: "Alice", role: "Admin" };
console.log(name, age, position); // "Alice", 25, "Admin"

// Template literals
const greeting = \`Hello, \${name}! You are \${age} years old.\`;
console.log(greeting); // "Hello, Alice! You are 25 years old."

// Function with default parameters
function createUser({ name, age = 18, role = "User" } = {}) {
  return { name, age, role };
}

// Optional chaining and nullish coalescing
const user = { 
  profile: { 
    address: null 
  } 
};

const city = user?.profile?.address?.city ?? "Unknown";
console.log(city); // "Unknown"</code></pre>
        </div>

        <h4>7. Error Handling</h4>
        <p>Effective error handling is critical for building robust JavaScript applications:</p>

        <p><strong>try...catch...finally:</strong> Basic error-handling structure</p>

        <p><strong>Error Types:</strong></p>
        <ul>
          <li>Error: Base error type</li>
          <li>SyntaxError: Invalid syntax</li>
          <li>ReferenceError: Invalid reference</li>
          <li>TypeError: Invalid operation for a value's type</li>
          <li>RangeError: Value outside of allowed range</li>
        </ul>

        <p><strong>Custom Error Types:</strong> Creating specialized error classes</p>

        <p><strong>Async Error Handling:</strong> Using try/catch with async/await and .catch() with promises</p>
        
        <div class="code-example">
          <pre><code>// Basic try/catch
try {
  const result = nonExistentFunction();
  console.log(result);
} catch (error) {
  console.error(error.name, error.message);
} finally {
  console.log("This always runs");
}

// Custom error types
class ValidationError extends Error {
  constructor(message) {
    super(message);
    this.name = "ValidationError";
    this.status = 400;
  }
}

function validateUser(user) {
  if (!user.name) {
    throw new ValidationError("Name is required");
  }
  
  if (user.age < 18) {
    throw new ValidationError("User must be at least 18 years old");
  }
  
  return true;
}

// Error handling with promises
fetchData()
  .then(processData)
  .catch(error => {
    if (error instanceof ValidationError) {
      console.error("Validation failed:", error.message);
    } else {
      console.error("Unknown error:", error);
    }
  });

// Async/await error handling
async function getUserData() {
  try {
    const user = await fetchUser(userId);
    validateUser(user);
    return user;
  } catch (error) {
    console.error("Error fetching user:", error);
    throw error; // Re-throw or handle
  }
}</code></pre>
        </div>

        <h4>8. Functional Programming Concepts</h4>
        <p>Functional programming approaches improve code predictability and testability:</p>

        <p><strong>Pure Functions:</strong> Functions without side effects that return consistent results for the same inputs</p>

        <p><strong>Immutability:</strong> Not modifying existing data, but creating new copies with changes</p>

        <p><strong>Higher-Order Functions:</strong> Functions that take or return other functions</p>

        <p><strong>Function Composition:</strong> Building complex functions by combining simpler ones</p>

        <p><strong>Currying:</strong> Converting a function that takes multiple arguments into a sequence of functions that each take a single argument</p>
        
        <div class="code-example">
          <pre><code>// Pure function
function add(a, b) {
  return a + b;
}

// Impure function (has side effects)
let total = 0;
function addToTotal(value) {
  total += value; // Side effect: modifies external state
  return total;
}

// Immutability with arrays
const numbers = [1, 2, 3];
const doubled = numbers.map(n => n * 2); // Creates new array
console.log(numbers); // Still [1, 2, 3]
console.log(doubled); // [2, 4, 6]

// Higher-order function
function createMultiplier(factor) {
  return function(number) {
    return number * factor;
  };
}

const double = createMultiplier(2);
const triple = createMultiplier(3);
console.log(double(5)); // 10
console.log(triple(5)); // 15

// Function composition
const compose = (f, g) => x => f(g(x));
const add5 = x => x + 5;
const multiply2 = x => x * 2;
const add5ThenMultiply2 = compose(multiply2, add5);
console.log(add5ThenMultiply2(10)); // (10 + 5) * 2 = 30

// Currying
const curriedAdd = a => b => a + b;
const add10 = curriedAdd(10);
console.log(add10(5)); // 15</code></pre>
        </div>

        <h4>9. JSON Handling</h4>
        <p>JSON is the standard data interchange format for JavaScript applications:</p>

        <p><strong>JSON.stringify():</strong> Converts JavaScript value to JSON string</p>

        <p><strong>JSON.parse():</strong> Parses JSON string into JavaScript value</p>

        <p><strong>Handling Circular References:</strong> Using replacer functions or libraries</p>

        <p><strong>Serializing Special Values:</strong> Handling dates, undefined, etc.</p>
        
        <div class="code-example">
          <pre><code>// Basic JSON conversion
const user = { 
  name: "Alice", 
  age: 30,
  active: true,
  skills: ["JavaScript", "React", "Node.js"]
};

// Convert to JSON string
const jsonString = JSON.stringify(user);
console.log(jsonString);
// {"name":"Alice","age":30,"active":true,"skills":["JavaScript","React","Node.js"]}

// Parse JSON string back to object
const parsedUser = JSON.parse(jsonString);
console.log(parsedUser.name); // "Alice"

// Using replacer and space parameters
const prettyJson = JSON.stringify(user, null, 2); // Formatted with 2-space indentation
console.log(prettyJson);

// Custom replacer function
const userWithDate = {
  ...user,
  lastLogin: new Date()
};

const jsonWithCustomDate = JSON.stringify(userWithDate, (key, value) => {
  if (key === 'lastLogin') {
    return value.toISOString();
  }
  return value;
});

// Custom reviver function
const revived = JSON.parse(jsonWithCustomDate, (key, value) => {
  if (key === 'lastLogin') {
    return new Date(value);
  }
  return value;
});</code></pre>
        </div>

        <h4>10. Modules and Imports</h4>
        <p>Modern JavaScript uses modules to organize and share code:</p>

        <p><strong>ES Modules Syntax:</strong></p>
        <ul>
          <li>Named exports: <code>export const name = value;</code></li>
          <li>Default exports: <code>export default value;</code></li>
          <li>Named imports: <code>import { name } from 'module';</code></li>
          <li>Default imports: <code>import name from 'module';</code></li>
          <li>Namespace imports: <code>import * as name from 'module';</code></li>
        </ul>

        <p><strong>Dynamic Imports:</strong> <code>import('./module.js').then(module => {})</code></p>

        <p><strong>CommonJS:</strong> Used primarily in Node.js with require()/module.exports</p>
        
        <div class="code-example">
          <pre><code>// Named exports (math.js)
export const add = (a, b) => a + b;
export const subtract = (a, b) => a - b;
export const PI = 3.14159;

// Default export (user.js)
export default class User {
  constructor(name) {
    this.name = name;
  }
}

// Importing in another file
import { add, subtract, PI } from './math.js';
import User from './user.js';
import * as mathUtils from './math.js';

console.log(add(2, 3)); // 5
console.log(mathUtils.PI); // 3.14159

const user = new User("Alice");
console.log(user.name); // "Alice"

// Dynamic imports
async function loadModule() {
  if (someCondition) {
    const module = await import('./conditionally-loaded.js');
    module.doSomething();
  }
}</code></pre>
        </div>

        <h4>11. Promises and Async Programming Patterns</h4>
        <p>Advanced asynchronous programming patterns beyond basic promises:</p>

        <p><strong>Promise Methods:</strong></p>
        <ul>
          <li><code>Promise.all()</code>: Waits for all promises to resolve</li>
          <li><code>Promise.race()</code>: Resolves/rejects when the first promise does</li>
          <li><code>Promise.allSettled()</code>: Waits for all promises to settle (resolve or reject)</li>
          <li><code>Promise.any()</code>: Resolves when any promise resolves, rejects only if all reject</li>
        </ul>

        <p><strong>Error Handling with Promises:</strong> Proper error propagation and recovery</p>

        <p><strong>Cancelable Operations:</strong> Using AbortController for cancelable operations</p>

        <p><strong>Async Patterns:</strong> Parallel, sequential, and limited concurrency</p>
        
        <div class="code-example">
          <pre><code>// Promise.all - run promises in parallel
async function fetchAllUsers(ids) {
  try {
    const promises = ids.map(id => fetchUser(id));
    const users = await Promise.all(promises);
    return users;
  } catch (error) {
    // If any promise rejects, this catch block will run
    console.error("Failed to fetch users:", error);
    throw error;
  }
}

// Promise.race - timeout example
function fetchWithTimeout(url, timeout = 5000) {
  const fetchPromise = fetch(url);
  const timeoutPromise = new Promise((_, reject) => {
    setTimeout(() => reject(new Error("Request timed out")), timeout);
  });
  
  return Promise.race([fetchPromise, timeoutPromise]);
}

// Promise.allSettled - handling mixed success/failure
async function fetchAllUsersSafely(ids) {
  const promises = ids.map(id => fetchUser(id).catch(err => err));
  const results = await Promise.allSettled(promises);
  
  return {
    successful: results
      .filter(result => result.status === 'fulfilled')
      .map(result => result.value),
    failed: results
      .filter(result => result.status === 'rejected')
      .map(result => result.reason)
  };
}

// Cancelable fetch with AbortController
function fetchWithCancel(url) {
  const controller = new AbortController();
  const { signal } = controller;
  
  const promise = fetch(url, { signal })
    .then(response => response.json());
  
  return {
    promise,
    cancel: () => controller.abort()
  };
}

// Sequential vs parallel execution
async function sequential(items, asyncFunc) {
  const results = [];
  for (const item of items) {
    results.push(await asyncFunc(item)); // Wait for each before continuing
  }
  return results;
}

async function parallel(items, asyncFunc, concurrency = Infinity) {
  const chunks = [];
  for (let i = 0; i < items.length; i += concurrency) {
    chunks.push(items.slice(i, i + concurrency));
  }
  
  const results = [];
  for (const chunk of chunks) {
    const chunkPromises = chunk.map(item => asyncFunc(item));
    results.push(...await Promise.all(chunkPromises));
  }
  
  return results;
}</code></pre>
        </div>

        <h4>12. Data Structures and Algorithms in JavaScript</h4>
        <p>Common data structures and algorithmic patterns essential for interviews:</p>

        <p><strong>Built-in Data Structures:</strong></p>
        <ul>
          <li>Arrays: Ordered collections with numeric indices</li>
          <li>Objects: Key-value pairs (hash maps)</li>
          <li>Sets: Collections of unique values</li>
          <li>Maps: Key-value collections with any type of key</li>
        </ul>

        <p><strong>Custom Data Structures:</strong> Implementations of stacks, queues, linked lists, trees, graphs</p>

        <p><strong>Algorithm Patterns:</strong> Two pointers, sliding window, breadth/depth-first search</p>
        
        <div class="code-example">
          <pre><code>// Using built-in Map and Set
const userMap = new Map();
userMap.set('u123', { name: 'Alice', role: 'admin' });
userMap.set('u456', { name: 'Bob', role: 'user' });

console.log(userMap.get('u123')); // {name: 'Alice', role: 'admin'}
console.log(userMap.has('u789')); // false

const uniqueValues = new Set([1, 2, 3, 1, 2]); // Stores only unique values
console.log([...uniqueValues]); // [1, 2, 3]

// Stack implementation
class Stack {
  constructor() {
    this.items = [];
  }
  
  push(item) {
    this.items.push(item);
  }
  
  pop() {
    if (this.isEmpty()) return null;
    return this.items.pop();
  }
  
  peek() {
    if (this.isEmpty()) return null;
    return this.items[this.items.length - 1];
  }
  
  isEmpty() {
    return this.items.length === 0;
  }
  
  size() {
    return this.items.length;
  }
}

// Queue implementation
class Queue {
  constructor() {
    this.items = [];
  }
  
  enqueue(item) {
    this.items.push(item);
  }
  
  dequeue() {
    if (this.isEmpty()) return null;
    return this.items.shift();
  }
  
  front() {
    if (this.isEmpty()) return null;
    return this.items[0];
  }
  
  isEmpty() {
    return this.items.length === 0;
  }
  
  size() {
    return this.items.length;
  }
}

// Two-pointer algorithm (finding a pair that sums to target)
function findPairWithSum(arr, target) {
  let left = 0;
  let right = arr.length - 1;
  
  while (left < right) {
    const sum = arr[left] + arr[right];
    
    if (sum === target) {
      return [left, right];
    } else if (sum < target) {
      left++;
    } else {
      right--;
    }
  }
  
  return null; // No pair found
}</code></pre>
        </div>

        <h4>13. Performance Optimization</h4>
        <p>Techniques for optimizing JavaScript code performance:</p>

        <p><strong>Memoization:</strong> Caching function results for repeated calls with the same inputs</p>

        <p><strong>Throttling and Debouncing:</strong> Limiting the frequency of function execution</p>

        <p><strong>Lazy Loading:</strong> Loading resources or code only when needed</p>

        <p><strong>Web Workers:</strong> Running CPU-intensive tasks in background threads</p>
        
        <div class="code-example">
          <pre><code>// Memoization
function memoize(fn) {
  const cache = new Map();
  
  return function(...args) {
    const key = JSON.stringify(args);
    
    if (cache.has(key)) {
      return cache.get(key);
    }
    
    const result = fn.apply(this, args);
    cache.set(key, result);
    return result;
  };
}

// Expensive function
function fibonacci(n) {
  if (n <= 1) return n;
  return fibonacci(n - 1) + fibonacci(n - 2);
}

// Memoized version
const memoizedFibonacci = memoize(function(n) {
  if (n <= 1) return n;
  return memoizedFibonacci(n - 1) + memoizedFibonacci(n - 2);
});

// Debouncing
function debounce(func, delay) {
  let timeoutId;
  
  return function(...args) {
    clearTimeout(timeoutId);
    
    timeoutId = setTimeout(() => {
      func.apply(this, args);
    }, delay);
  };
}

// Throttling
function throttle(func, limit) {
  let inThrottle = false;
  
  return function(...args) {
    if (!inThrottle) {
      func.apply(this, args);
      inThrottle = true;
      
      setTimeout(() => {
        inThrottle = false;
      }, limit);
    }
  };
}

// Usage
const debouncedSearch = debounce(searchAPI, 300);
const throttledScroll = throttle(handleScroll, 100);</code></pre>
        </div>
        
        <div class="interview-tip">
          <p><span class="interview-icon">🎯</span> <strong>Interview Focus:</strong> These core programming concepts are frequently tested in coding interviews. Be prepared to use array methods functionally with map/filter/reduce, implement common data structures, and handle complex asynchronous flows.</p>
          <p>Common interview questions include:</p>
          <ul>
            <li>"Implement a function that flattens nested arrays"</li>
            <li>"Create a debounce or throttle function"</li>
            <li>"Implement a memoization function for caching results"</li>
            <li>"Use array methods to transform complex data structures"</li>
            <li>"Create a function that makes parallel API calls with limited concurrency"</li>
          </ul>
        </div>
      `,
          codeExample: `// Advanced data transformation utility
function transform(data, options = {}) {
  const {
    filters = [],
    sorts = [],
    groupBy = null,
    aggregates = {},
    limit = Infinity,
    skip = 0
  } = options;
  
  // Start with a copy of the data
  let result = [...data];
  
  // Apply filters
  if (filters.length > 0) {
    result = result.filter(item => 
      filters.every(filter => {
        const { field, operator, value } = filter;
        
        switch (operator) {
          case 'eq': return item[field] === value;
          case 'neq': return item[field] !== value;
          case 'gt': return item[field] > value;
          case 'gte': return item[field] >= value;
          case 'lt': return item[field] < value;
          case 'lte': return item[field] <= value;
          case 'contains': return String(item[field]).includes(value);
          case 'startsWith': return String(item[field]).startsWith(value);
          case 'endsWith': return String(item[field]).endsWith(value);
          case 'in': return Array.isArray(value) && value.includes(item[field]);
          default: return true;
        }
      })
    );
  }
  
  // Apply sorting
  if (sorts.length > 0) {
    result.sort((a, b) => {
      for (const sort of sorts) {
        const { field, direction = 'asc' } = sort;
        const modifier = direction.toLowerCase() === 'desc' ? -1 : 1;
        
        if (a[field] < b[field]) return -1 * modifier;
        if (a[field] > b[field]) return 1 * modifier;
      }
      return 0;
    });
  }
  
  // Apply pagination
  if (skip > 0) {
    result = result.slice(skip);
  }
  
  if (result.length > limit) {
    result = result.slice(0, limit);
  }
  
  // Apply grouping if specified
  if (groupBy) {
    const groups = result.reduce((acc, item) => {
      const key = item[groupBy];
      if (!acc[key]) {
        acc[key] = [];
      }
      acc[key].push(item);
      return acc;
    }, {});
    
    // Apply aggregations to each group
    if (Object.keys(aggregates).length > 0) {
      return Object.entries(groups).map(([key, items]) => {
        const group = { [groupBy]: key };
        
        for (const [name, aggregateFn] of Object.entries(aggregates)) {
          if (aggregateFn === 'count') {
            group[name] = items.length;
          } else if (aggregateFn === 'sum' && name.includes(':')) {
            const [_, field] = name.split(':');
            group[name] = items.reduce((sum, item) => sum + (item[field] || 0), 0);
          } else if (aggregateFn === 'avg' && name.includes(':')) {
            const [_, field] = name.split(':');
            const sum = items.reduce((sum, item) => sum + (item[field] || 0), 0);
            group[name] = items.length ? sum / items.length : 0;
          } else if (aggregateFn === 'min' && name.includes(':')) {
            const [_, field] = name.split(':');
            group[name] = Math.min(...items.map(item => item[field] || 0));
          } else if (aggregateFn === 'max' && name.includes(':')) {
            const [_, field] = name.split(':');
            group[name] = Math.max(...items.map(item => item[field] || 0));
          }
        }
        
        return group;
      });
    }
    
    return groups;
  }
  
  return result;
}

// Example usage:
const data = [
  { id: 1, name: "Product A", category: "Electronics", price: 100, inStock: true },
  { id: 2, name: "Product B", category: "Clothing", price: 50, inStock: true },
  { id: 3, name: "Product C", category: "Electronics", price: 200, inStock: false },
  { id: 4, name: "Product D", category: "Clothing", price: 75, inStock: true },
  { id: 5, name: "Product E", category: "Electronics", price: 150, inStock: true }
];

const result = transform(data, {
  filters: [
    { field: 'inStock', operator: 'eq', value: true },
    { field: 'price', operator: 'gte', value: 50 }
  ],
  sorts: [
    { field: 'category', direction: 'asc' },
    { field: 'price', direction: 'desc' }
  ],
  groupBy: 'category',
  aggregates: {
    count: 'count',
    'sum:price': 'sum',
    'avg:price': 'avg'
  }
});

// Result would be:
// [
//   {
//     category: "Clothing",
//     count: 2,
//     "sum:price": 125,
//     "avg:price": 62.5
//   },
//   {
//     category: "Electronics",
//     count: 2,
//     "sum:price": 250,
//     "avg:price": 125
//   }
// ]`,
          exercise: {
            instructions:
              'Create a utility library that demonstrates the core JavaScript programming concepts. Your library should include: (1) Array transformation methods for filtering, sorting, and grouping data, (2) A caching/memoization function, (3) Throttle and debounce functions, (4) Promise utilities for handling parallel and sequential operations.',
          },
        },
        {
          title: 'Front-End JavaScript Development (7 Key Concepts)',
          explanation: `
        <p>These seven concepts focus on JavaScript's interaction with the browser and user interface:</p>

        <h4>14. DOM Manipulation</h4>
        <p>Efficient Document Object Model (DOM) manipulation is fundamental for front-end development:</p>

        <p><strong>Selecting Elements:</strong></p>
        <ul>
          <li><code>document.getElementById()</code>: Gets a single element by ID</li>
          <li><code>document.querySelector()</code>: Gets the first element matching a CSS selector</li>
          <li><code>document.querySelectorAll()</code>: Gets all elements matching a CSS selector</li>
        </ul>

        <p><strong>Modifying Elements:</strong></p>
        <ul>
          <li>Changing content: <code>innerHTML</code>, <code>textContent</code>, <code>innerText</code></li>
          <li>Modifying attributes: <code>setAttribute()</code>, <code>getAttribute()</code></li>
          <li>Manipulating classes: <code>classList.add()</code>, <code>classList.remove()</code>, <code>classList.toggle()</code></li>
          <li>Changing styles: <code>style.property</code></li>
        </ul>

        <p><strong>Creating and Removing Elements:</strong></p>
        <ul>
          <li>Creating: <code>document.createElement()</code></li>
          <li>Appending: <code>appendChild()</code>, <code>append()</code>, <code>prepend()</code>, <code>insertBefore()</code></li>
          <li>Removing: <code>removeChild()</code>, <code>remove()</code></li>
        </ul>

        <p><strong>Traversing the DOM:</strong> Navigating parent, child, and sibling relationships</p>
        
        <div class="code-example">
          <pre><code>// Selecting elements
const container = document.getElementById('container');
const button = document.querySelector('.btn-primary');
const paragraphs = document.querySelectorAll('p');

// Modifying elements
button.textContent = 'Click Me';
button.setAttribute('disabled', 'true');
button.classList.add('active');
button.style.backgroundColor = '#3498db';

// Creating and adding elements
const newDiv = document.createElement('div');
newDiv.className = 'alert';
newDiv.textContent = 'New message';
container.appendChild(newDiv);

// Removing elements
const oldElement = document.querySelector('.old-element');
if (oldElement) {
  oldElement.remove(); // Modern approach
  // OR
  // oldElement.parentNode.removeChild(oldElement); // Older approach
}

// Traversing the DOM
const parent = button.parentElement;
const firstChild = container.firstElementChild;
const nextSibling = button.nextElementSibling;</code></pre>
        </div>

        <h4>15. Event Handling</h4>
        <p>Responding to user interactions through events is essential for interactive applications:</p>

        <p><strong>Event Listeners:</strong></p>
        <ul>
          <li>Adding: <code>addEventListener()</code></li>
          <li>Removing: <code>removeEventListener()</code></li>
          <li>Common events: click, submit, keydown, load, DOMContentLoaded</li>
        </ul>

        <p><strong>Event Object:</strong> Accessing information about the event</p>

        <p><strong>Event Propagation:</strong> Capturing and bubbling phases</p>

        <p><strong>Event Delegation:</strong> Handling events for multiple elements with a single listener</p>

        <p><strong>Custom Events:</strong> Creating and dispatching custom events</p>
        
        <div class="code-example">
          <pre><code>// Adding event listeners
const button = document.querySelector('#submitBtn');
button.addEventListener('click', handleClick);

function handleClick(event) {
  // Access event properties
  console.log(event.target); // Element that triggered the event
  console.log(event.type);   // "click"
  
  // Prevent default behavior
  event.preventDefault();
  
  // Stop propagation
  event.stopPropagation();
}

// Removing event listeners
button.removeEventListener('click', handleClick);

// Event delegation for multiple elements
const list = document.querySelector('#itemList');
list.addEventListener('click', function(event) {
  // Check if the clicked element is a list item
  if (event.target.matches('li')) {
    console.log('List item clicked:', event.target.textContent);
  }
});

// Custom events
const customEvent = new CustomEvent('userLoggedIn', {
  detail: { userId: 123, username: 'alice' },
  bubbles: true,
  cancelable: true
});

document.dispatchEvent(customEvent);

// Listening for custom events
document.addEventListener('userLoggedIn', function(event) {
  console.log('User logged in:', event.detail.username);
});</code></pre>
        </div>

        <h4>16. Web APIs and Browser Integration</h4>
        <p>Modern browsers provide powerful APIs for building rich web applications:</p>

        <p><strong>Common Web APIs:</strong></p>
        <ul>
          <li>Fetch API: For making HTTP requests</li>
          <li>localStorage/sessionStorage: For client-side data storage</li>
          <li>Geolocation API: For accessing user location</li>
          <li>History API: For manipulating browser history</li>
          <li>FormData: For working with form data</li>
          <li>Canvas API: For drawing graphics</li>
          <li>Web Workers: For running scripts in background threads</li>
        </ul>

        <p><strong>Feature Detection:</strong> Checking for API support before using it</p>
        
        <div class="code-example">
          <pre><code>// Fetch API
async function fetchData(url) {
  try {
    const response = await fetch(url);
    
    if (!response.ok) {
      throw new Error(\`HTTP error: \${response.status}\`);
    }
    
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Fetch error:', error);
    throw error;
  }
}

// LocalStorage
// Saving data
localStorage.setItem('user', JSON.stringify({ name: 'Alice', id: 123 }));

// Retrieving data
const user = JSON.parse(localStorage.getItem('user'));

// Removing data
localStorage.removeItem('user');

// Clearing all data
localStorage.clear();

// Geolocation API
function getLocation() {
  if ('geolocation' in navigator) {
    navigator.geolocation.getCurrentPosition(
      position => {
        console.log(\`Latitude: \${position.coords.latitude}, Longitude: \${position.coords.longitude}\`);
      },
      error => {
        console.error('Geolocation error:', error.message);
      }
    );
  } else {
    console.log('Geolocation is not supported by this browser');
  }
}

// History API
// Navigate without page reload
function navigateTo(path) {
  history.pushState({ page: path }, "", path);
  loadContent(path);
}

// Listening for navigation
window.addEventListener('popstate', event => {
  if (event.state) {
    loadContent(event.state.page);
  }
});</code></pre>
        </div>

        <h4>17. Network Requests and API Integration</h4>
        <p>Interacting with back-end services and third-party APIs:</p>

        <p><strong>Fetch API:</strong> Modern approach to making HTTP requests</p>

        <p><strong>Request/Response Handling:</strong> Working with headers, body, status codes</p>

        <p><strong>Authentication:</strong> Token-based auth, OAuth, API keys</p>

        <p><strong>Cross-Origin Requests:</strong> Understanding CORS and handling restrictions</p>

        <p><strong>Error Handling:</strong> Handling network failures and API errors</p>
        
        <div class="code-example">
          <pre><code>// Basic GET request
fetch('https://api.example.com/data')
  .then(response => {
    if (!response.ok) {
      throw new Error(\`HTTP error: \${response.status}\`);
    }
    return response.json();
  })
  .then(data => console.log(data))
  .catch(error => console.error('Fetch error:', error));

// POST request with JSON data
async function createUser(userData) {
  try {
    const response = await fetch('https://api.example.com/users', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': \`Bearer \${getAuthToken()}\`
      },
      body: JSON.stringify(userData)
    });
    
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || \`HTTP error: \${response.status}\`);
    }
    
    return await response.json();
  } catch (error) {
    console.error('Failed to create user:', error);
    throw error;
  }
}

// Handling file uploads
async function uploadFile(file) {
  const formData = new FormData();
  formData.append('file', file);
  
  const response = await fetch('https://api.example.com/upload', {
    method: 'POST',
    body: formData
  });
  
  return await response.json();
}

// Cancellable fetch requests
function fetchWithTimeout(url, options, timeout = 5000) {
  const controller = new AbortController();
  const { signal } = controller;
  
  // Set timeout to abort request
  const timeoutId = setTimeout(() => controller.abort(), timeout);
  
  return fetch(url, { ...options, signal })
    .then(response => {
      clearTimeout(timeoutId);
      return response;
    })
    .catch(error => {
      clearTimeout(timeoutId);
      if (error.name === 'AbortError') {
        throw new Error('Request timed out');
      }
      throw error;
    });
}</code></pre>
        </div>

        <h4>18. Client-Side Form Handling and Validation</h4>
        <p>Creating interactive and user-friendly forms with proper validation:</p>

        <p><strong>Form Submission:</strong> Handling form submission via JavaScript</p>

        <p><strong>Input Validation:</strong> Validating user input before submission</p>

        <p><strong>Form Data Handling:</strong> Collecting and processing form input</p>

        <p><strong>Error Handling and Feedback:</strong> Displaying validation errors to users</p>
        
        <div class="code-example">
          <pre><code>// Form submission
const form = document.querySelector('#registrationForm');
form.addEventListener('submit', handleSubmit);

async function handleSubmit(event) {
  event.preventDefault();
  
  // Reset previous errors
  clearErrors();
  
  // Get form data
  const formData = new FormData(form);
  const userData = {
    name: formData.get('name'),
    email: formData.get('email'),
    password: formData.get('password'),
    confirmPassword: formData.get('confirmPassword')
  };
  
  // Validate form data
  const errors = validateForm(userData);
  
  if (Object.keys(errors).length > 0) {
    // Display errors
    displayErrors(errors);
    return;
  }
  
  try {
    // Submit data to server
    const response = await fetch('/api/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(userData)
    });
    
    const result = await response.json();
    
    if (!response.ok) {
      throw new Error(result.message || 'Registration failed');
    }
    
    // Success - redirect or show success message
    showSuccessMessage('Registration successful!');
    form.reset();
    
  } catch (error) {
    displayServerError(error.message);
  }
}

function validateForm(data) {
  const errors = {};
  
  // Name validation
  if (!data.name.trim()) {
    errors.name = 'Name is required';
  }
  
  // Email validation
  if (!data.email.trim()) {
    errors.email = 'Email is required';
  } else if (!/^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/.test(data.email)) {
    errors.email = 'Valid email is required';
  }
  
  // Password validation
  if (!data.password) {
    errors.password = 'Password is required';
  } else if (data.password.length < 8) {
    errors.password = 'Password must be at least 8 characters';
  }
  
  // Confirm password
  if (data.password !== data.confirmPassword) {
    errors.confirmPassword = 'Passwords do not match';
  }
  
  return errors;
}

function displayErrors(errors) {
  for (const [field, message] of Object.entries(errors)) {
    const errorElement = document.querySelector(\`#\${field}Error\`);
    if (errorElement) {
      errorElement.textContent = message;
    }
  }
}

function clearErrors() {
  const errorElements = document.querySelectorAll('.error-message');
  errorElements.forEach(element => {
    element.textContent = '';
  });
}</code></pre>
        </div>

        <h4>19. Browser Storage</h4>
        <p>Managing client-side data storage for persistent application state:</p>

        <p><strong>Storage Types:</strong></p>
        <ul>
          <li>Cookies: Small text files stored on the client</li>
          <li>localStorage: Persistent storage with no expiration</li>
          <li>sessionStorage: Storage that lasts for a single session</li>
          <li>IndexedDB: Client-side database for larger amounts of structured data</li>
          <li>Cache API: Part of Service Workers for offline capabilities</li>
        </ul>

        <p><strong>Data Management:</strong> Saving, retrieving, and deleting data</p>
        
        <div class="code-example">
          <pre><code>// Cookies
function setCookie(name, value, days) {
  const expires = days 
    ? \`; expires=\${new Date(Date.now() + days * 864e5).toUTCString()}\` 
    : '';
  document.cookie = \`\${name}=\${encodeURIComponent(value)}\${expires}; path=/\`;
}

function getCookie(name) {
  const value = \`; \${document.cookie}\`;
  const parts = value.split(\`; \${name}=\`);
  if (parts.length === 2) return decodeURIComponent(parts.pop().split(';').shift());
}

function deleteCookie(name) {
  setCookie(name, '', -1);
}

// localStorage and sessionStorage
// localStorage - persists after browser close
localStorage.setItem('theme', 'dark');
const theme = localStorage.getItem('theme');
localStorage.removeItem('theme');

// sessionStorage - cleared on browser close
sessionStorage.setItem('sessionId', '12345');
const sessionId = sessionStorage.getItem('sessionId');
sessionStorage.removeItem('sessionId');

// Storage wrapper (with expiration)
const storage = {
  set(key, value, expiry = null) {
    const item = {
      value: value,
      expiry: expiry ? Date.now() + expiry * 1000 : null
    };
    localStorage.setItem(key, JSON.stringify(item));
  },
  
  get(key) {
    const itemStr = localStorage.getItem(key);
    if (!itemStr) return null;
    
    const item = JSON.parse(itemStr);
    
    // Check if item has expired
    if (item.expiry && Date.now() > item.expiry) {
      localStorage.removeItem(key);
      return null;
    }
    
    return item.value;
  },
  
  remove(key) {
    localStorage.removeItem(key);
  },
  
  clear() {
    localStorage.clear();
  }
};</code></pre>
        </div>

        <h4>20. Performance and Debugging</h4>
        <p>Optimizing JavaScript performance and effectively debugging applications:</p>

        <p><strong>Performance Optimization:</strong></p>
        <ul>
          <li>Minimizing DOM manipulations</li>
          <li>Reducing re-renders</li>
          <li>Efficient event handling</li>
          <li>Lazy loading resources</li>
          <li>Web Workers for CPU-intensive tasks</li>
        </ul>

        <p><strong>Debugging Techniques:</strong></p>
        <ul>
          <li>Console methods: log, error, warn, table, time</li>
          <li>Breakpoints and stepping through code</li>
          <li>Network monitoring</li>
          <li>Performance profiling</li>
          <li>Memory leak detection</li>
        </ul>
        
        <div class="code-example">
          <pre><code>// Console debugging
console.log('Basic logging');
console.warn('Warning message');
console.error('Error message');

// Grouping logs
console.group('User Details');
console.log('Name: Alice');
console.log('Role: Admin');
console.groupEnd();

// Timing operations
console.time('operation');
// ... some code to measure
console.timeEnd('operation');

// Tabular data
console.table([
  { name: 'Alice', role: 'Admin' },
  { name: 'Bob', role: 'User' }
]);

// Performance monitoring
function measurePerformance(fn, iterations = 100) {
  console.time('Performance Test');
  for (let i = 0; i < iterations; i++) {
    fn();
  }
  console.timeEnd('Performance Test');
}

// Optimizing DOM operations
function optimizedDOMUpdate(items) {
  // Bad approach (multiple DOM manipulations)
  // items.forEach(item => {
  //   document.getElementById('list').innerHTML += \`<li>\${item}</li>\`;
  // });
  
  // Better approach (single DOM manipulation)
  const fragment = document.createDocumentFragment();
  
  items.forEach(item => {
    const li = document.createElement('li');
    li.textContent = item;
    fragment.appendChild(li);
  });
  
  document.getElementById('list').appendChild(fragment);
}

// Debouncing for performance
function debounce(fn, delay) {
  let timeoutId;
  return function(...args) {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => fn.apply(this, args), delay);
  };
}

// Optimize scroll or resize handlers
const debouncedResize = debounce(() => {
  // Handle resize logic
  console.log('Window resized');
}, 250);

window.addEventListener('resize', debouncedResize);</code></pre>
        </div>
        
        <div class="interview-tip">
          <p><span class="interview-icon">🎯</span> <strong>Interview Focus:</strong> Front-end focused interviews often test DOM manipulation, event handling, and API integration skills. Be prepared to demonstrate efficient DOM manipulation, proper event handling with delegation, and effective use of browser APIs.</p>
          <p>Common interview questions include:</p>
          <ul>
            <li>"Explain event delegation and when you would use it"</li>
            <li>"How would you optimize a webpage that has performance issues?"</li>
            <li>"Implement form validation for an email field"</li>
            <li>"How would you persist user settings in a web application?"</li>
            <li>"Describe how you would debug a JavaScript error in production"</li>
          </ul>
        </div>
      `,
          codeExample: `// Interactive form validation system
class FormValidator {
  constructor(formId, options = {}) {
    this.form = document.getElementById(formId);
    if (!this.form) {
      throw new Error(\`Form with ID "\${formId}" not found\`);
    }
    
    this.options = {
      errorClass: 'error',
      successClass: 'success',
      errorPlacement: 'after', // 'after', 'before', or 'append'
      validateOnBlur: true,
      validateOnInput: false,
      submitHandler: null,
      ...options
    };
    
    this.validators = {};
    this.errors = {};
    
    this.init();
  }
  
  init() {
    // Add form submit handler
    this.form.addEventListener('submit', this.handleSubmit.bind(this));
    
    if (this.options.validateOnBlur) {
      this.form.addEventListener('blur', this.handleBlur.bind(this), true);
    }
    
    if (this.options.validateOnInput) {
      this.form.addEventListener('input', this.handleInput.bind(this), true);
    }
  }
  
  // Add validation rules for a field
  addField(fieldName, rules) {
    this.validators[fieldName] = rules;
    return this;
  }
  
  // Default validation handlers
  static validators = {
    required: (value) => {
      return value !== '' ? true : 'This field is required';
    },
    
    email: (value) => {
      if (value === '') return true; // Skip if empty (use required for required fields)
      return /^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/.test(value) ? 
        true : 'Please enter a valid email address';
    },
    
    minLength: (value, length) => {
      if (value === '') return true;
      return value.length >= length ? 
        true : \`Please enter at least \${length} characters\`;
    },
    
    maxLength: (value, length) => {
      if (value === '') return true;
      return value.length <= length ? 
        true : \`Please enter no more than \${length} characters\`;
    },
    
    pattern: (value, pattern) => {
      if (value === '') return true;
      return pattern.test(value) ? 
        true : 'Please enter a value in the required format';
    },
    
    match: (value, fieldName, formValues) => {
      if (value === '') return true;
      return value === formValues[fieldName] ? 
        true : \`This field must match \${fieldName}\`;
    }
  };
  
  // Handle form submission
  handleSubmit(event) {
    event.preventDefault();
    
    // Get all form values
    const formData = new FormData(this.form);
    const values = {};
    
    for (const [key, value] of formData.entries()) {
      values[key] = value;
    }
    
    // Validate all fields
    const isValid = this.validateAll(values);
    
    if (isValid) {
      if (typeof this.options.submitHandler === 'function') {
        this.options.submitHandler(values, this.form);
      } else {
        this.form.submit();
      }
    }
  }
  
  // Handle blur events for individual field validation
  handleBlur(event) {
    if (event.target.name && this.validators[event.target.name]) {
      this.validateField(event.target.name, event.target.value);
    }
  }
  
  // Handle input events for real-time validation
  handleInput(event) {
    if (event.target.name && this.validators[event.target.name]) {
      // Debounce validation during typing
      clearTimeout(event.target._validationTimeout);
      event.target._validationTimeout = setTimeout(() => {
        this.validateField(event.target.name, event.target.value);
      }, 300);
    }
  }
  
  // Validate a single field
  validateField(fieldName, value, allValues = null) {
    if (!this.validators[fieldName]) return true;
    
    // Get form values if not provided
    if (!allValues) {
      const formData = new FormData(this.form);
      allValues = {};
      for (const [key, val] of formData.entries()) {
        allValues[key] = val;
      }
    }
    
    // Get the field element
    const field = this.form.elements[fieldName];
    if (!field) return true;
    
    // Clear existing error
    this.clearError(fieldName);
    
    // Run all validations for this field
    const rules = this.validators[fieldName];
    
    for (const [rule, param] of Object.entries(rules)) {
      if (typeof FormValidator.validators[rule] === 'function') {
        const result = FormValidator.validators[rule](value, param, allValues);
        
        if (result !== true) {
          this.showError(fieldName, result);
          return false;
        }
      }
    }
    
    // If we got here, field is valid
    this.markFieldSuccess(fieldName);
    return true;
  }
  
  // Validate all fields
  validateAll(values) {
    let isValid = true;
    this.clearAllErrors();
    
    // Validate each field
    for (const fieldName in this.validators) {
      const fieldIsValid = this.validateField(fieldName, values[fieldName], values);
      isValid = isValid && fieldIsValid;
    }
    
    return isValid;
  }
  
  // Show error message for a field
  showError(fieldName, message) {
    const field = this.form.elements[fieldName];
    if (!field) return;
    
    // Store the error
    this.errors[fieldName] = message;
    
    // Add error class to field
    field.classList.add(this.options.errorClass);
    field.classList.remove(this.options.successClass);
    
    // Create error element if it doesn't exist
    let errorElement = document.getElementById(\`\${fieldName}-error\`);
    
    if (!errorElement) {
      errorElement = document.createElement('div');
      errorElement.id = \`\${fieldName}-error\`;
      errorElement.className = \`\${this.options.errorClass}-message\`;
      
      // Insert the error element
      const parent = field.parentElement;
      
      switch (this.options.errorPlacement) {
        case 'before':
          parent.insertBefore(errorElement, field);
          break;
        case 'after':
          if (field.nextSibling) {
            parent.insertBefore(errorElement, field.nextSibling);
          } else {
            parent.appendChild(errorElement);
          }
          break;
        case 'append':
          parent.appendChild(errorElement);
          break;
      }
    }
    
    errorElement.textContent = message;
  }
  
  // Clear error for a field
  clearError(fieldName) {
    const field = this.form.elements[fieldName];
    if (!field) return;
    
    // Remove the error
    delete this.errors[fieldName];
    
    // Remove error class
    field.classList.remove(this.options.errorClass);
    
    // Remove error element
    const errorElement = document.getElementById(\`\${fieldName}-error\`);
    if (errorElement) {
      errorElement.remove();
    }
  }
  
  // Clear all errors
  clearAllErrors() {
    for (const fieldName in this.errors) {
      this.clearError(fieldName);
    }
    this.errors = {};
  }
  
  // Mark field as valid
  markFieldSuccess(fieldName) {
    const field = this.form.elements[fieldName];
    if (field) {
      field.classList.add(this.options.successClass);
    }
  }
  
  // Add custom validator
  static addValidator(name, validatorFn) {
    FormValidator.validators[name] = validatorFn;
  }
}

// Example usage:
// const validator = new FormValidator('registrationForm', {
//   submitHandler: (values) => {
//     console.log('Form submitted with values:', values);
//     // Send to server, etc.
//   }
// });
// 
// validator
//   .addField('username', {
//     required: true,
//     minLength: 3,
//     maxLength: 20
//   })
//   .addField('email', {
//     required: true,
//     email: true
//   })
//   .addField('password', {
//     required: true,
//     minLength: 8,
//     pattern: /^(?=.*[A-Za-z])(?=.*\\d)[A-Za-z\\d@$!%*#?&]{8,}$/
//   })
//   .addField('confirmPassword', {
//     required: true,
//     match: 'password'
//   });`,
          exercise: {
            instructions:
              'Create a front-end module that demonstrates DOM manipulation, event handling, and form validation. Your module should include: (1) Dynamic creation and manipulation of DOM elements, (2) Event delegation for efficient handling of multiple elements, (3) Client-side form validation with error messaging, (4) Persisting form data to localStorage.',
          },
        },
      ],
      prepperSummary: `
    <div class="prepper-summary">
      <h3>🔑 Key Interview Takeaways</h3>
      <ul>
        <li><strong>JavaScript Fundamentals:</strong> Master scope, closures, and asynchronous programming to demonstrate your understanding of core language mechanics. These concepts are the foundation for all JavaScript development.</li>
        
        <li><strong>Programming Patterns:</strong> Be proficient with array methods, object manipulation, and functional programming approaches. These skills show you can write clean, maintainable code that handles data effectively.</li>
        
        <li><strong>Front-End Skills:</strong> Know how to manipulate the DOM efficiently, handle events properly, and integrate with browser APIs. These practical skills demonstrate your ability to build responsive, interactive web applications.</li>
        
        <li><strong>Performance and Error Handling:</strong> Understand how to optimize JavaScript performance and implement robust error handling. These skills show you can build reliable applications that perform well.</li>
      </ul>
      
      <h4>📝 Common Interview Questions</h4>
      <ol>
        <li>"What is a closure and how would you use it?"</li>
        <li>"Explain how promises work and the advantages over callbacks"</li>
        <li>"How would you use array methods to transform data from one format to another?"</li>
        <li>"Implement a debounce or throttle function and explain when to use each"</li>
        <li>"How would you optimize the performance of a JavaScript application?"</li>
        <li>"Explain event delegation and when you would use it"</li>
        <li>"How do you handle asynchronous operations in JavaScript?"</li>
        <li>"What's the difference between == and === in JavaScript?"</li>
        <li>"How would you implement form validation for a registration form?"</li>
        <li>"Describe your approach to debugging a JavaScript error in production"</li>
      </ol>
    </div>
  `,
    },
  ],
  challenge: {
    description:
      'You\'re tasked with building a "JavaScript Developer\'s Toolkit" that demonstrates mastery of the 20 essential JavaScript concepts. Create functions and utilities that could be used in a real-world application, showcasing your understanding of JavaScript fundamentals, core programming patterns, and front-end development techniques.',
    requirements: [
      'Implement at least 3 utilities that demonstrate JavaScript fundamentals (closures, scope, asynchronous patterns)',
      'Create data manipulation functions using at least 4 different array methods',
      'Build an object manipulation utility with methods for deep cloning, merging, and transforming objects',
      'Develop a client-side form validation module with error handling and feedback',
      'Implement a data persistence layer using browser storage',
      'Create a simple event system with publish/subscribe pattern',
      'Add comprehensive documentation with examples for each utility',
    ],
    starterCode: `// JavaScript Developer's Toolkit
// Demonstrate your mastery of essential JavaScript concepts

const JSToolkit = {
  // === CORE UTILITIES ===
  
  /**
   * Creates a debounced function that delays invoking func until after wait milliseconds
   * have elapsed since the last time the debounced function was invoked.
   */
  debounce(func, wait) {
    // Your implementation here
  },
  
  /**
   * Creates a throttled function that only invokes func at most once per every wait milliseconds.
   */
  throttle(func, wait) {
    // Your implementation here
  },
  
  /**
   * Creates a memoized (cached) version of a function to optimize performance.
   */
  memoize(func) {
    // Your implementation here
  },
  
  // === DATA MANIPULATION ===
  
  /**
   * Data transformation utilities for arrays and collections
   */
  data: {
    /**
     * Transforms an array of objects based on the provided mapping.
     */
    transform(array, mapping) {
      // Your implementation here
    },
    
    /**
     * Groups array items by a specified key or function.
     */
    groupBy(array, keyOrFunction) {
      // Your implementation here
    },
    
    /**
     * Filters and sorts an array based on provided criteria.
     */
    filterAndSort(array, filterCriteria, sortCriteria) {
      // Your implementation here
    },
    
    /**
     * Finds unique values in an array based on a specified key for objects,
     * or the elements themselves for primitives.
     */
    unique(array, key) {
      // Your implementation here
    }
  },
  
  // === OBJECT UTILITIES ===
  
  /**
   * Object manipulation utilities
   */
  object: {
    /**
     * Creates a deep clone of an object, breaking all references.
     */
    deepClone(obj) {
      // Your implementation here
    },
    
    /**
     * Deeply merges two or more objects.
     */
    deepMerge(target, ...sources) {
      // Your implementation here
    },
    
    /**
     * Creates a flattened version of an object with dot notation for nested properties.
     */
    flatten(obj) {
      // Your implementation here
    },
    
    /**
     * Creates an object from a flattened object (reverses flatten).
     */
    unflatten(flatObj) {
      // Your implementation here
    }
  },
  
  // === DOM & BROWSER UTILITIES ===
  
  /**
   * DOM manipulation and browser utilities
   */
  dom: {
    /**
     * Finds element(s) in the DOM using a selector and returns an enhanced array-like object
     * with utility methods for DOM manipulation.
     */
    $(selector, context = document) {
      // Your implementation here
    },
    
    /**
     * Adds an event listener with support for delegation.
     */
    addEvent(element, event, selector, handler) {
      // Your implementation here
    },
    
    /**
     * Creates DOM elements from an HTML string.
     */
    createFromHTML(htmlString) {
      // Your implementation here
    }
  },
  
  // === FORM HANDLING ===
  
  /**
   * Form handling utilities
   */
  form: {
    /**
     * Validates a form against specified rules.
     */
    validate(formElement, rules) {
      // Your implementation here
    },
    
    /**
     * Serializes form data to a JavaScript object.
     */
    serialize(formElement) {
      // Your implementation here
    },
    
    /**
     * Populates a form with data from an object.
     */
    populate(formElement, data) {
      // Your implementation here
    }
  },
  
  // === STORAGE UTILITIES ===
  
  /**
   * Storage utilities for working with localStorage, sessionStorage, and cookies
   */
  storage: {
    /**
     * Gets an item from storage with support for expiration.
     */
    get(key, storageType = 'local') {
      // Your implementation here
    },
    
    /**
     * Sets an item in storage with optional expiration.
     */
    set(key, value, options = {}) {
      // Your implementation here
    },
    
    /**
     * Removes an item from storage.
     */
    remove(key, storageType = 'local') {
      // Your implementation here
    }
  },
  
  // === EVENT SYSTEM ===
  
  /**
   * Simple event system (publish/subscribe pattern)
   */
  events: {
    /**
     * Subscribe to an event.
     */
    on(event, callback) {
      // Your implementation here
    },
    
    /**
     * Unsubscribe from an event.
     */
    off(event, callback) {
      // Your implementation here
    },
    
    /**
     * Emit an event with data.
     */
    emit(event, data) {
      // Your implementation here
    }
  }
};

export default JSToolkit;`,
  },
}

export default shortlistPrepper
