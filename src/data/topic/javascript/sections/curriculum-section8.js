// #Testing and Debugging

const testingAndDebugging = {
  title: 'Testing and Debugging',
  description: 'Master essential skills for writing robust, bug-free JavaScript code.',
  lessons: [
    {
      title: 'Unit Testing Basics',
      description: 'Learn how to implement effective automated tests for your JavaScript code.',
      sections: [
        {
          title: 'Understanding Unit Testing',
          explanation: `
        <p>Unit testing is the practice of testing individual units of code in isolation to ensure they work as expected. In JavaScript, a unit is typically a function, method, or class.</p>
        
        <h4>Why Unit Testing Matters</h4>
        <p>Unit testing is a critical part of professional JavaScript development, offering numerous benefits that contribute to higher quality code and more efficient development processes.</p>
        
        <p>Effective unit testing provides both immediate and long-term benefits for your codebase:</p>
        
        <ul>
          <li><strong>Finds bugs early:</strong> Tests can catch issues before they reach production, saving time and resources on fixing problems that would be more expensive to resolve later</li>
          <li><strong>Enables refactoring:</strong> Tests provide confidence when changing code, allowing you to improve the internal structure without changing the external behavior</li>
          <li><strong>Documents code:</strong> Tests demonstrate how functions should be used, serving as executable documentation that stays up-to-date with the code</li>
          <li><strong>Improves design:</strong> Writing testable code encourages better architecture with looser coupling, clearer interfaces, and more focused components</li>
          <li><strong>Facilitates collaboration:</strong> Tests help teams understand code behavior and provide a safety net when multiple developers work on the same codebase</li>
          <li><strong>Reduces debugging time:</strong> When tests fail, they point directly to where the problem is, making it easier to identify the source of issues</li>
          <li><strong>Prevents regression:</strong> Tests ensure that fixed bugs don't return and that existing functionality doesn't break as new features are added</li>
        </ul>
        
        <h4>Testing Frameworks</h4>
        <p>JavaScript has several popular testing frameworks, each with its own approach and features. The most widely used include Jest, Mocha, and Jasmine.</p>
        
        <p>When selecting a testing framework, consider these key features:</p>
        
        <ul>
          <li><strong>Test runner:</strong> Executes your tests and reports results</li>
          <li><strong>Assertion library:</strong> Provides methods to verify expected outcomes</li>
          <li><strong>Mocking capabilities:</strong> Allows creation of test doubles to isolate code</li>
          <li><strong>Code coverage:</strong> Reports how much of your code is covered by tests</li>
          <li><strong>Asynchronous testing:</strong> Supports testing promises, async/await, and callbacks</li>
          <li><strong>Browser vs. Node:</strong> Determines where tests can run (some frameworks support both)</li>
        </ul>
        
        <div class="code-example">
          <pre><code>// Example using Jest - the most popular framework
// Function to test
function sum(a, b) {
  return a + b;
}

// Test suite
describe('sum function', () => {
  // Individual test case
  test('adds 1 + 2 to equal 3', () => {
    // Assertion
    expect(sum(1, 2)).toBe(3);
  });
  
  test('adds negative numbers correctly', () => {
    expect(sum(-1, -2)).toBe(-3);
  });
});</code></pre>
        </div>
        
        <h4>Anatomy of a Test</h4>
        <p>Regardless of the framework, most unit tests follow a similar structure often referred to as the AAA pattern: Arrange, Act, Assert.</p>
        
        <p>The AAA pattern provides a clear structure for organizing your tests:</p>
        
        <ul>
          <li><strong>Arrange:</strong> Set up the test conditions, initialize objects, prepare inputs, and define expected outputs</li>
          <li><strong>Act:</strong> Execute the code being tested, typically calling a function or method with the arranged inputs</li>
          <li><strong>Assert:</strong> Verify that the actual results match the expected outcomes</li>
        </ul>
        
        <p>Following this pattern makes tests easier to read, understand, and maintain.</p>
        
        <div class="code-example">
          <pre><code>test('should calculate total with tax', () => {
  // Arrange: Set up the test data
  const cartItems = [
    { name: 'Item 1', price: 10 },
    { name: 'Item 2', price: 20 }
  ];
  const taxRate = 0.1; // 10% tax
  
  // Act: Call the function being tested
  const total = calculateTotal(cartItems, taxRate);
  
  // Assert: Verify the result
  expect(total).toBe(33); // 30 + 10% tax = 33
});</code></pre>
        </div>
        
        <div class="interview-tip">
          <p><span class="interview-icon">🎯</span> <strong>Interview Focus:</strong> Demonstrating knowledge of testing fundamentals shows that you understand professional development practices.</p>
          <p>Key points to understand:</p>
          <ul>
            <li>The different types of tests (unit, integration, end-to-end)</li>
            <li>The benefits of test-driven development (TDD)</li>
            <li>How to structure effective test cases</li>
            <li>How to use assertions correctly</li>
            <li>How to test asynchronous code</li>
          </ul>
        </div>
      `,
          codeExample: `// Unit Testing Approaches in JavaScript

// 1. Testing a synchronous function with Jest
function calculateDiscount(price, discountPercentage) {
  if (price <= 0 || discountPercentage < 0 || discountPercentage > 100) {
    throw new Error('Invalid input parameters');
  }
  
  const discount = price * (discountPercentage / 100);
  return parseFloat((price - discount).toFixed(2));
}

// Test suite for calculateDiscount
describe('calculateDiscount', () => {
  // Test cases
  test('applies discount correctly', () => {
    expect(calculateDiscount(100, 10)).toBe(90);
    expect(calculateDiscount(75.50, 25)).toBe(56.63);
  });
  
  test('handles zero discount', () => {
    expect(calculateDiscount(100, 0)).toBe(100);
  });
  
  test('throws error for invalid inputs', () => {
    // Testing that the function throws errors properly
    expect(() => calculateDiscount(-50, 10)).toThrow();
    expect(() => calculateDiscount(100, -10)).toThrow();
    expect(() => calculateDiscount(100, 110)).toThrow();
  });
});

// 2. Testing asynchronous code
async function fetchUserData(userId) {
  const response = await fetch(\`https://api.example.com/users/\${userId}\`);
  
  if (!response.ok) {
    throw new Error(\`Failed to fetch user: \${response.status}\`);
  }
  
  return response.json();
}

// Testing async functions
describe('fetchUserData', () => {
  // Using Jest's mock functionality
  beforeEach(() => {
    global.fetch = jest.fn();
  });
  
  test('returns user data when fetch succeeds', async () => {
    // Mock the fetch response
    global.fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({ id: '123', name: 'Test User' })
    });
    
    const user = await fetchUserData('123');
    
    expect(user.id).toBe('123');
    expect(user.name).toBe('Test User');
    expect(global.fetch).toHaveBeenCalledWith('https://api.example.com/users/123');
  });
  
  test('throws error when fetch fails', async () => {
    // Mock a failed response
    global.fetch.mockResolvedValueOnce({
      ok: false,
      status: 404
    });
    
    await expect(fetchUserData('456')).rejects.toThrow('Failed to fetch user');
  });
});

// 3. Using spies and mocks
function notifyUser(userId, message, notificationService) {
  const formattedMessage = \`Message for \${userId}: \${message}\`;
  return notificationService.send(userId, formattedMessage);
}

describe('notifyUser', () => {
  test('formats message and calls notification service', () => {
    // Create a mock notification service
    const mockService = {
      send: jest.fn().mockReturnValue(true)
    };
    
    // Call the function with our mock
    const result = notifyUser('user123', 'Hello!', mockService);
    
    // Verify the mock was called correctly
    expect(mockService.send).toHaveBeenCalledWith(
      'user123', 
      'Message for user123: Hello!'
    );
    
    // Verify the return value
    expect(result).toBe(true);
  });
});

// 4. Testing with setup and teardown
describe('UserManager', () => {
  let userManager;
  let mockDatabase;
  
  // Setup - runs before each test
  beforeEach(() => {
    // Create mocks and initialize the component
    mockDatabase = {
      query: jest.fn(),
      close: jest.fn()
    };
    
    userManager = new UserManager(mockDatabase);
  });
  
  // Teardown - runs after each test
  afterEach(() => {
    // Clean up
    userManager = null;
    jest.clearAllMocks();
  });
  
  test('creates user correctly', async () => {
    mockDatabase.query.mockResolvedValueOnce({ insertId: 123 });
    
    await userManager.createUser({ name: 'John', email: 'john@example.com' });
    
    expect(mockDatabase.query).toHaveBeenCalledWith(
      expect.stringContaining('INSERT INTO users'),
      expect.arrayContaining(['John', 'john@example.com'])
    );
  });
});`,
          exercise: {
            instructions:
              'Create a comprehensive test suite for a user authentication module. Write tests for: user registration with validation, login functionality with proper error handling, password reset flow, and session management. Use mocks to avoid actual API calls and focus on pure unit testing. Include tests for edge cases and error conditions.',
          },
        },
        {
          title: 'Test-Driven Development',
          explanation: `
        <p>Test-Driven Development (TDD) is a development methodology where tests are written before implementing the actual functionality, leading to more focused and reliable code.</p>
        
        <h4>The TDD Cycle</h4>
        <p>TDD follows a "Red-Green-Refactor" cycle that guides the development process step by step.</p>
        
        <p>This iterative cycle is the heart of TDD and consists of three distinct phases:</p>
        
        <ol>
          <li><strong>Red:</strong> Write a failing test that defines the expected functionality
            <ul>
              <li>Begin by writing a test for a small piece of functionality</li>
              <li>The test should fail initially because the functionality doesn't exist yet</li>
              <li>This step clarifies what you're trying to build before writing any implementation code</li>
            </ul>
          </li>
          <li><strong>Green:</strong> Implement the minimal code needed to make the test pass
            <ul>
              <li>Write just enough code to make the test pass—nothing more</li>
              <li>Don't worry about code quality or optimization at this stage</li>
              <li>Focus solely on making the test pass as quickly as possible</li>
            </ul>
          </li>
          <li><strong>Refactor:</strong> Clean up and optimize the code while keeping tests passing
            <ul>
              <li>Improve the implementation without changing its behavior</li>
              <li>Eliminate duplication, clarify intent, and optimize performance</li>
              <li>Run tests after each change to ensure you haven't broken anything</li>
            </ul>
          </li>
        </ol>
        
        <p>This cycle typically repeats many times during development, with each iteration adding a small piece of functionality.</p>
        
        <h4>Benefits of TDD</h4>
        <p>TDD offers several advantages beyond just having tests for your code:</p>
        
        <ul>
          <li><strong>Forces clear thinking:</strong> Writing tests first requires you to define requirements and expected behavior precisely before implementation</li>
          <li><strong>Leads to better design:</strong> TDD naturally encourages more modular, loosely coupled code with cleaner interfaces</li>
          <li><strong>Provides immediate feedback:</strong> You know right away if your changes break existing functionality</li>
          <li><strong>Creates a safety net:</strong> A comprehensive test suite gives confidence for future changes and refactoring</li>
          <li><strong>Prevents scope creep:</strong> The focus on one test at a time helps maintain a clear development path and prevents unnecessary features</li>
          <li><strong>Improves documentation:</strong> Tests serve as executable specifications that show how components should behave</li>
          <li><strong>Reduces debugging time:</strong> Problems are caught early when the context is still fresh in your mind</li>
        </ul>
        
        <h4>TDD Example</h4>
        <div class="code-example">
          <pre><code>// Red: Write a failing test
test('validateEmail should accept valid email addresses', () => {
  expect(validateEmail('user@example.com')).toBe(true);
  expect(validateEmail('name.surname@company.co.uk')).toBe(true);
});

test('validateEmail should reject invalid email addresses', () => {
  expect(validateEmail('not-an-email')).toBe(false);
  expect(validateEmail('missing@domain')).toBe(false);
  expect(validateEmail('@missinguser.com')).toBe(false);
  expect(validateEmail('')).toBe(false);
});

// Green: Implement minimal code to pass tests
function validateEmail(email) {
  if (!email) return false;
  
  // Simple regex to validate email format
  const emailRegex = /^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/;
  return emailRegex.test(email);
}

// Refactor: Improve implementation while tests still pass
function validateEmail(email) {
  if (!email) return false;
  
  // More comprehensive regex
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$/;
  return emailRegex.test(email);
}</code></pre>
        </div>
        
        <div class="interview-tip">
          <p><span class="interview-icon">🎯</span> <strong>Interview Focus:</strong> Understanding TDD demonstrates a methodical approach to software development that many employers value.</p>
          <p>Key points to understand:</p>
          <ul>
            <li>How TDD influences code design</li>
            <li>When TDD is most beneficial (and when it's not)</li>
            <li>Balancing test coverage with development speed</li>
            <li>Managing TDD in a team environment</li>
            <li>Applying TDD to legacy code</li>
          </ul>
        </div>
      `,
          codeExample: `// Test-Driven Development Process Example

// Let's implement a shopping cart with TDD
// We'll focus on the addItem and calculateTotal functions

// Step 1: Red - Write failing tests first
describe('ShoppingCart', () => {
  // Test for addItem functionality
  describe('addItem', () => {
    test('should add an item to an empty cart', () => {
      const cart = new ShoppingCart();
      const item = { id: 1, name: 'Product', price: 10 };
      
      cart.addItem(item);
      
      expect(cart.items.length).toBe(1);
      expect(cart.items[0]).toEqual(item);
    });
    
    test('should increase quantity if item already exists', () => {
      const cart = new ShoppingCart();
      const item = { id: 1, name: 'Product', price: 10 };
      
      cart.addItem(item);
      cart.addItem(item);
      
      expect(cart.items.length).toBe(1);
      expect(cart.items[0].quantity).toBe(2);
    });
    
    test('should throw error if item has no id or price', () => {
      const cart = new ShoppingCart();
      const invalidItem1 = { name: 'No ID' };
      const invalidItem2 = { id: 1, name: 'No Price' };
      
      expect(() => cart.addItem(invalidItem1)).toThrow();
      expect(() => cart.addItem(invalidItem2)).toThrow();
    });
  });
  
  // Test for calculateTotal functionality
  describe('calculateTotal', () => {
    test('should return 0 for empty cart', () => {
      const cart = new ShoppingCart();
      expect(cart.calculateTotal()).toBe(0);
    });
    
    test('should calculate total for single item', () => {
      const cart = new ShoppingCart();
      cart.addItem({ id: 1, name: 'Product', price: 10 });
      
      expect(cart.calculateTotal()).toBe(10);
    });
    
    test('should calculate total for multiple items', () => {
      const cart = new ShoppingCart();
      cart.addItem({ id: 1, name: 'Product 1', price: 10 });
      cart.addItem({ id: 2, name: 'Product 2', price: 20 });
      
      expect(cart.calculateTotal()).toBe(30);
    });
    
    test('should apply quantity when calculating total', () => {
      const cart = new ShoppingCart();
      const item = { id: 1, name: 'Product', price: 10 };
      
      cart.addItem(item);
      cart.addItem(item); // Adds another of the same item
      
      expect(cart.calculateTotal()).toBe(20);
    });
  });
});

// Step 2: Green - Implement minimal code to pass the tests
class ShoppingCart {
  constructor() {
    this.items = [];
  }
  
  addItem(item) {
    // Validate the item
    if (!item.id || item.price === undefined) {
      throw new Error('Invalid item: must have id and price');
    }
    
    // Check if item already exists
    const existingItem = this.items.find(i => i.id === item.id);
    
    if (existingItem) {
      // Increase quantity if item exists
      existingItem.quantity = (existingItem.quantity || 1) + 1;
    } else {
      // Add as new item with quantity 1
      this.items.push({
        ...item,
        quantity: 1
      });
    }
  }
  
  calculateTotal() {
    return this.items.reduce((total, item) => {
      return total + (item.price * (item.quantity || 1));
    }, 0);
  }
}

// Step 3: Refactor - Improve the code while keeping tests passing
class ShoppingCart {
  constructor() {
    this.items = [];
  }
  
  addItem(item) {
    this.validateItem(item);
    
    const existingItem = this.findItem(item.id);
    
    if (existingItem) {
      this.incrementQuantity(existingItem);
    } else {
      this.addNewItem(item);
    }
  }
  
  calculateTotal() {
    return this.items.reduce((total, item) => {
      return total + this.getItemTotal(item);
    }, 0);
  }
  
  // Helper methods (refactored for clarity)
  validateItem(item) {
    if (!item.id || item.price === undefined) {
      throw new Error('Invalid item: must have id and price');
    }
  }
  
  findItem(id) {
    return this.items.find(item => item.id === id);
  }
  
  incrementQuantity(item) {
    item.quantity = (item.quantity || 1) + 1;
  }
  
  addNewItem(item) {
    this.items.push({
      ...item,
      quantity: 1
    });
  }
  
  getItemTotal(item) {
    return item.price * (item.quantity || 1);
  }
}`,
          exercise: {
            instructions:
              'Apply Test-Driven Development to create a user registration system. Start by writing tests for: email validation, password strength checking, username uniqueness verification, and account creation. Then implement the code to make the tests pass, following the Red-Green-Refactor cycle. Finally, refactor your code to improve its structure while maintaining passing tests.',
          },
        },
      ],
      prepperSummary: `
    <div class="prepper-summary">
      <h3>🔑 Key Interview Takeaways</h3>
      <ul>
        <li><strong>Testing Purpose:</strong> Unit tests verify that individual components work correctly, providing a safety net for code changes and documenting expected behavior.</li>
        
        <li><strong>Test Structure:</strong> Well-written tests follow the Arrange-Act-Assert pattern, clearly separating setup, execution, and verification.</li>
        
        <li><strong>Testing Frameworks:</strong> Tools like Jest, Mocha, and Jasmine provide utilities for structuring tests, creating assertions, and mocking dependencies.</li>
        
        <li><strong>Test-Driven Development:</strong> TDD follows a Red-Green-Refactor cycle, focusing on writing tests before implementing functionality to ensure all code is testable and requirements-focused.</li>
        
        <li><strong>Testing Best Practices:</strong> Write focused tests, use descriptive names, test edge cases, and maintain test independence for a robust test suite.</li>
      </ul>
      
      <h4>📝 Common Interview Questions</h4>
      <ol>
        <li>"What's the difference between unit testing, integration testing, and end-to-end testing?"</li>
        <li>"How would you approach testing asynchronous JavaScript code?"</li>
        <li>"Explain the Test-Driven Development process and its benefits"</li>
        <li>"How do you mock dependencies in your unit tests?"</li>
        <li>"What metrics would you use to evaluate test quality?"</li>
      </ol>
    </div>
  `,
    }, // end of lesson 1

    {
      title: 'Debugging Techniques',
      description: 'Learn effective methods to identify and fix bugs in JavaScript code.',
      sections: [
        {
          title: 'Browser Developer Tools',
          explanation: `
        <p>Browser developer tools are the primary resource for debugging JavaScript in web applications, offering powerful features to inspect code execution and identify issues.</p>
        
        <h4>Console Methods</h4>
        <p>The <code>console</code> object provides various methods beyond simple logging to help with debugging complex applications.</p>
        
        <p>Modern browsers offer a rich set of console methods that can make debugging more efficient:</p>
        
        <ul>
          <li><strong>Basic logging:</strong> <code>console.log()</code>, <code>console.info()</code>, <code>console.warn()</code>, and <code>console.error()</code> provide different visual styles for different types of information</li>
          <li><strong>Structured data:</strong> <code>console.table()</code> displays arrays or objects in a tabular format for easier analysis</li>
          <li><strong>Grouping:</strong> <code>console.group()</code> and <code>console.groupEnd()</code> visually group related log messages together</li>
          <li><strong>Timing:</strong> <code>console.time()</code> and <code>console.timeEnd()</code> measure how long operations take to execute</li>
          <li><strong>Conditional logging:</strong> <code>console.assert()</code> logs messages only when a condition is false</li>
          <li><strong>Stack traces:</strong> <code>console.trace()</code> shows the call stack at the point where it's called</li>
          <li><strong>Counting:</strong> <code>console.count()</code> tracks how many times a piece of code is executed</li>
        </ul>
        
        <div class="code-example">
          <pre><code>// Basic logging
console.log('Simple message');

// Different log levels
console.info('Informational message');
console.warn('Warning message');
console.error('Error message');

// Grouping related logs
console.group('User Data');
console.log('Name: John');
console.log('Role: Admin');
console.groupEnd();

// Tabular data
console.table([
  { name: 'John', age: 30 },
  { name: 'Jane', age: 25 }
]);

// Time tracking
console.time('Operation');
// ... code to measure ...
console.timeEnd('Operation'); // "Operation: 1234ms"

// Conditional logging
console.assert(1 === 2, 'This will log because the assertion failed');

// Stack traces
console.trace('Execution path');</code></pre>
        </div>
        
        <h4>Breakpoints and Stepping</h4>
        <p>Breakpoints allow you to pause code execution and inspect the application state at specific points, providing insights into the program flow.</p>
        
        <p>There are several ways to set breakpoints in browser developer tools:</p>
        
        <ul>
          <li><strong>Line breakpoints:</strong> Set directly in the Sources panel by clicking on line numbers</li>
          <li><strong>Conditional breakpoints:</strong> Only pause execution when a specified condition is true</li>
          <li><strong>DOM breakpoints:</strong> Pause when the DOM structure or attribute changes</li>
          <li><strong>XHR/Fetch breakpoints:</strong> Pause when a network request is made</li>
          <li><strong>Event listener breakpoints:</strong> Pause when specific events occur</li>
          <li><strong>Programmatic breakpoints:</strong> Set using the <code>debugger</code> statement in your code</li>
        </ul>
        
        <p>Once execution is paused, you can:</p>
        
        <ul>
          <li><strong>Step over:</strong> Execute the current line and move to the next one</li>
          <li><strong>Step into:</strong> Move into the function being called</li>
          <li><strong>Step out:</strong> Complete the current function and return to the caller</li>
          <li><strong>Continue:</strong> Resume execution until the next breakpoint</li>
          <li><strong>Watch expressions:</strong> Monitor the values of variables or expressions as you step through code</li>
          <li><strong>Call stack:</strong> See the sequence of function calls that led to the current point</li>
        </ul>
        
        <div class="code-example">
          <pre><code>// Programmatic breakpoint
function processUserData(user) {
  debugger; // Execution will pause here when dev tools are open
  if (!user) {
    return null;
  }
  
  const result = {
    displayName: user.name || 'Anonymous',
    isAdmin: user.role === 'admin'
  };
  
  return result;
}</code></pre>
        </div>
        
        <h4>Source Maps and Error Tracking</h4>
        <p>Source maps map transpiled/minified code back to the original source, making debugging modern JavaScript applications much easier.</p>
        
        <p>Source maps solve several challenges in modern JavaScript development:</p>
        
        <ul>
          <li><strong>Transpiled code:</strong> Map from ES6+, TypeScript, or other languages back to the original source</li>
          <li><strong>Minified code:</strong> Trace errors in production builds back to readable source code</li>
          <li><strong>Bundled code:</strong> Identify which original file an error comes from in bundled applications</li>
          <li><strong>Line numbers:</strong> Preserve accurate line numbers and file names for stack traces</li>
        </ul>
        
        <p>Modern build tools like Webpack, Vite, and Parcel support source maps out of the box.</p>
        
        <div class="code-example">
          <pre><code>// Webpack config example for source maps
module.exports = {
  mode: 'development',
  devtool: 'source-map', // Generates source maps
  // ... other config options
};</code></pre>
        </div>
        
        <div class="interview-tip">
          <p><span class="interview-icon">🎯</span> <strong>Interview Focus:</strong> Effective debugging skills demonstrate your ability to solve problems efficiently.</p>
          <p>Key points to understand:</p>
          <ul>
            <li>Systematic debugging approaches vs. random changes</li>
            <li>Using advanced console techniques for complex debugging</li>
            <li>Working with breakpoints, watch expressions, and call stacks</li>
            <li>Debugging asynchronous code and network requests</li>
            <li>Root cause analysis vs. fixing symptoms</li>
          </ul>
        </div>
      `,
          codeExample: `// Advanced Debugging Techniques

// 1. Strategic console.log placement
function processPayment(order) {
  console.log('Processing payment for order:', order);
  
  // Log specific properties we're concerned about
  console.log('Payment method:', order.paymentMethod);
  console.log('Amount:', order.amount);
  
  if (!validatePayment(order)) {
    console.warn('Payment validation failed');
    return false;
  }
  
  try {
    const result = submitPayment(order);
    console.log('Payment result:', result);
    return result.success;
  } catch (error) {
    console.error('Payment submission error:', error);
    return false;
  }
}

// 2. Using console.table for structured data
function analyzeUserActivity(users) {
  // Transform data for analysis
  const userActivity = users.map(user => ({
    id: user.id,
    name: user.name,
    loginCount: user.logins,
    lastActive: new Date(user.lastActive).toLocaleDateString(),
    isActive: user.lastActive > Date.now() - 7 * 24 * 60 * 60 * 1000
  }));
  
  // Display in table format for easy analysis
  console.table(userActivity, ['name', 'loginCount', 'lastActive', 'isActive']);
  
  return userActivity.filter(user => user.isActive);
}

// 3. Conditional debugging with custom debug function
const debug = (function() {
  const DEBUG_MODE = localStorage.getItem('debug') === 'true';
  
  return function(area, ...args) {
    if (DEBUG_MODE) {
      console.log(\`[DEBUG][\${area}]\`, ...args);
    }
  };
})();

// Continuing with Advanced Debugging Techniques

function complexFunction() {
  debug('initialization', 'Starting complex operation');
  
  // Only logs in debug mode
  for (let i = 0; i < 10; i++) {
    debug('loop', \`Iteration \${i}\`);
    // Process logic here
  }
  
  debug('completion', 'Operation completed');
}

// 4. Error handling with custom error classes
class ValidationError extends Error {
  constructor(message, field) {
    super(message);
    this.name = 'ValidationError';
    this.field = field;
  }
}

class ApiError extends Error {
  constructor(message, statusCode, endpoint) {
    super(message);
    this.name = 'ApiError';
    this.statusCode = statusCode;
    this.endpoint = endpoint;
  }
}

// Using custom errors for better debugging
function submitForm(formData) {
  try {
    validateForm(formData);
    submitToApi(formData);
  } catch (error) {
    if (error instanceof ValidationError) {
      console.error(\`Validation error in field "\${error.field}": \${error.message}\`);
      highlightField(error.field);
    } else if (error instanceof ApiError) {
      console.error(\`API error (\${error.statusCode}) for \${error.endpoint}: \${error.message}\`);
      showRetryDialog();
    } else {
      console.error('Unexpected error:', error);
      showGenericErrorMessage();
    }
  }
}

// 5. Debugging asynchronous code
async function loadUserProfile(userId) {
  console.log(\`Loading profile for user \${userId}...\`);
  console.time('Profile load time');
  
  try {
    const user = await fetchUser(userId);
    console.log('User data received:', user);
    
    const [posts, friends] = await Promise.all([
      fetchPosts(userId),
      fetchFriends(userId)
    ]);
    
    console.log(\`Loaded \${posts.length} posts and \${friends.length} friends\`);
    console.timeEnd('Profile load time');
    
    return { user, posts, friends };
  } catch (error) {
    console.error('Profile loading failed:', error);
    console.timeEnd('Profile load time');
    throw error;
  }
}

// 6. Debugging memory issues
function analyzeMemoryUsage() {
  // Take heap snapshot before operation (in Chrome DevTools)
  
  const elements = [];
  for (let i = 0; i < 10000; i++) {
    const element = document.createElement('div');
    element.textContent = \`Element \${i}\`;
    elements.push(element);
    document.body.appendChild(element);
  }
  
  // Take another heap snapshot to compare
  
  // Clean up (proper memory management)
  elements.forEach(element => {
    document.body.removeChild(element);
  });
  
  // Take final heap snapshot to ensure cleanup worked
}`,
          exercise: {
            instructions:
              'Create a debugging plan for a complex shopping cart system. Implement strategic console logs, proper error handling, and breakpoints to diagnose common issues. Develop a custom debugging utility that helps track the flow of data through the application. Implement error classes for different types of problems (validation, API, calculation) to make debugging easier.',
          },
        },
        {
          title: 'Common Debugging Scenarios',
          explanation: `
        <p>Certain types of bugs appear frequently in JavaScript applications. Understanding these common scenarios can help you diagnose and fix issues more efficiently.</p>
        
        <h4>Asynchronous Bugs</h4>
        <p>Asynchronous code is often a source of hard-to-find bugs due to its non-linear execution and potential race conditions.</p>
        
        <p>Common asynchronous pitfalls include:</p>
        
        <ul>
          <li><strong>Not awaiting promises:</strong> Forgetting to use <code>await</code> or <code>.then()</code> when working with promises</li>
          <li><strong>Race conditions:</strong> When the order of asynchronous operations affects the outcome in unexpected ways</li>
          <li><strong>Unhandled promise rejections:</strong> Errors in promises that aren't caught and handled properly</li>
          <li><strong>Callback hell:</strong> Deeply nested callbacks that make code hard to follow and debug</li>
          <li><strong>Event timing issues:</strong> When events fire in an unexpected order or timing</li>
          <li><strong>Missing error handling:</strong> Not properly handling errors in asynchronous operations</li>
        </ul>
        
        <div class="code-example">
          <pre><code>// Problem: Not waiting for async result
function getUserData() {
  let userData;
  
  // This happens asynchronously
  fetchUserFromAPI().then(data => {
    userData = data;
  });
  
  // Bug: This runs before the data is fetched
  return userData; // Returns undefined
}

// Solution: Make the function async and use await
async function getUserData() {
  const userData = await fetchUserFromAPI();
  return userData; // Properly waits for the result
}</code></pre>
        </div>
        
        <h4>Scope and Closure Issues</h4>
        <p>JavaScript's handling of scope and closures can lead to unexpected behavior when variables are not bound as expected.</p>
        
        <p>Typical scope and closure problems include:</p>
        
        <ul>
          <li><strong>Variable hoisting:</strong> Unexpected behavior when variables are used before declaration</li>
          <li><strong>Closure capture in loops:</strong> When all iterations of a loop share the same closure</li>
          <li><strong>This context confusion:</strong> When <code>this</code> doesn't refer to what you expect</li>
          <li><strong>Shadow variables:</strong> Using the same variable name in different scopes</li>
          <li><strong>Temporal dead zone:</strong> Accessing <code>let</code> and <code>const</code> variables before declaration</li>
          <li><strong>Global scope leakage:</strong> Accidentally creating or modifying global variables</li>
        </ul>
        
        <div class="code-example">
          <pre><code>// Problem: Loop variable in closure
function createButtons() {
  for (var i = 0; i < 3; i++) {
    var button = document.createElement('button');
    button.textContent = 'Button ' + i;
    
    button.addEventListener('click', function() {
      console.log('Button ' + i + ' clicked');
    });
    
    document.body.appendChild(button);
  }
  // Bug: All buttons log "Button 3 clicked" because they close over the same variable
}

// Solution: Use let for block scoping or create a new closure
function createButtons() {
  for (let i = 0; i < 3; i++) { // 'let' creates a new binding for each iteration
    const button = document.createElement('button');
    button.textContent = 'Button ' + i;
    
    button.addEventListener('click', function() {
      console.log('Button ' + i + ' clicked');
    });
    
    document.body.appendChild(button);
  }
}</code></pre>
        </div>
        
        <h4>Type Coercion Surprises</h4>
        <p>JavaScript's type coercion can lead to subtle bugs when values are implicitly converted from one type to another.</p>
        
        <p>JavaScript's loose typing system can cause several issues:</p>
        
        <ul>
          <li><strong>Equality comparisons:</strong> <code>==</code> performs type coercion, leading to unexpected equality results</li>
          <li><strong>Numeric operations:</strong> Strings can be implicitly converted to numbers, or vice versa</li>
          <li><strong>Boolean coercion:</strong> Non-boolean values are converted to booleans in conditional contexts</li>
          <li><strong>Implicit toString:</strong> Objects are converted to strings when used in string concatenation</li>
          <li><strong>NaN propagation:</strong> NaN (Not a Number) in calculations produces unexpected results</li>
          <li><strong>Undefined vs. null:</strong> Different behavior when these types are coerced</li>
        </ul>
        
        <div class="code-example">
          <pre><code>// Problem: Unexpected type coercion
function checkValue(value) {
  if (value == '0') {
    console.log('Value is zero');
  }
}

checkValue(0);      // Logs "Value is zero" (number 0 == string '0')
checkValue('0');    // Logs "Value is zero" (expected)
checkValue('');     // Does nothing
checkValue(false);  // Does nothing

// Solution: Use strict equality
function checkValue(value) {
  if (value === '0') { // Strict equality, no type coercion
    console.log('Value is zero string');
  } else if (value === 0) {
    console.log('Value is zero number');
  }
}</code></pre>
        </div>
        
        <div class="interview-tip">
          <p><span class="interview-icon">🎯</span> <strong>Interview Focus:</strong> Being able to identify and fix common JavaScript bugs demonstrates practical experience.</p>
          <p>Key debugging scenarios to understand:</p>
          <ul>
            <li>Debugging this binding issues in different contexts</li>
            <li>Tracking down memory leaks and performance bottlenecks</li>
            <li>Handling promise rejection and error propagation</li>
            <li>Diagnosing event handling and propagation problems</li>
            <li>Resolving cross-browser compatibility issues</li>
          </ul>
        </div>
      `,
          codeExample: `// Common Debugging Scenarios and Solutions

// 1. "this" context issues
const user = {
  name: 'John',
  greet: function() {
    console.log(\`Hello, my name is \${this.name}\`);
  },
  
  // Problem: 'this' is lost in callback
  delayedGreeting: function() {
    setTimeout(function() {
      // 'this' refers to the global object (window) in the callback
      console.log(\`Hello, my name is \${this.name}\`); // "Hello, my name is undefined"
    }, 1000);
  }
};

// Solutions:
// 1. Arrow function (lexical this)
const userFixed1 = {
  name: 'John',
  delayedGreeting: function() {
    setTimeout(() => {
      // Arrow function preserves 'this' from the surrounding context
      console.log(\`Hello, my name is \${this.name}\`);
    }, 1000);
  }
};

// 2. Store reference to 'this'
const userFixed2 = {
  name: 'John',
  delayedGreeting: function() {
    const self = this;
    setTimeout(function() {
      console.log(\`Hello, my name is \${self.name}\`);
    }, 1000);
  }
};

// 3. Bind method
const userFixed3 = {
  name: 'John',
  delayedGreeting: function() {
    setTimeout(function() {
      console.log(\`Hello, my name is \${this.name}\`);
    }.bind(this), 1000);
  }
};

// 2. Race conditions with async operations
// Problem: Race condition when updating data
function updateUserProfile() {
  let userData = null;
  
  // These fetch operations might complete in any order
  fetchUserBasicInfo().then(data => {
    userData = { ...userData, ...data };
  });
  
  fetchUserPreferences().then(data => {
    userData = { ...userData, preferences: data };
  });
  
  // Then we save - but the fetches might not be complete
  setTimeout(() => {
    saveUserData(userData); // May have incomplete data
  }, 1000);
}

// Solution: Use Promise.all to ensure all operations complete
async function updateUserProfileFixed() {
  try {
    const [basicInfo, preferences] = await Promise.all([
      fetchUserBasicInfo(),
      fetchUserPreferences()
    ]);
    
    const userData = {
      ...basicInfo,
      preferences
    };
    
    await saveUserData(userData);
    return true;
  } catch (error) {
    console.error('Failed to update profile:', error);
    return false;
  }
}

// 3. Closure loop problem in a less obvious context
// Problem: All event handlers share the same closure
function setupTabs() {
  const tabs = document.querySelectorAll('.tab');
  const panels = document.querySelectorAll('.panel');
  
  for (var i = 0; i < tabs.length; i++) {
    tabs[i].addEventListener('click', function() {
      // Hide all panels
      for (var j = 0; j < panels.length; j++) {
        panels[j].style.display = 'none';
      }
      
      // Show the panel at index i
      panels[i].style.display = 'block'; // Bug: i will be tabs.length here
    });
  }
}

// Solution: Create a new closure for each iteration
function setupTabsFixed() {
  const tabs = document.querySelectorAll('.tab');
  const panels = document.querySelectorAll('.panel');
  
  for (let i = 0; i < tabs.length; i++) {
    // Using let creates a new binding for each iteration
    tabs[i].addEventListener('click', function() {
      // Hide all panels
      for (let j = 0; j < panels.length; j++) {
        panels[j].style.display = 'none';
      }
      
      // Show the correct panel
      panels[i].style.display = 'block';
    });
  }
}

// 4. Type coercion in conditionals
// Problem: Unexpected behavior with loose equality checks
function verifyInput(value) {
  // Intended to check if value is empty
  if (value == false) {
    return 'Please provide a value';
  }
  return 'Valid input: ' + value;
}

// This function has surprising behavior:
verifyInput('0');     // "Please provide a value" - '0' == false is true!
verifyInput(0);       // "Please provide a value" - 0 == false is true
verifyInput('false'); // "Valid input: false" - 'false' == false is false!
verifyInput('');      // "Please provide a value" - '' == false is true

// Solution: Be explicit about what you're checking
function verifyInputFixed(value) {
  // Check specifically for empty string or null/undefined
  if (value === '' || value === null || value === undefined) {
    return 'Please provide a value';
  }
  return 'Valid input: ' + value;
}

// 5. Event propagation issues
function setupClickHandlers() {
  document.querySelector('#outer').addEventListener('click', function() {
    console.log('Outer div clicked');
  });
  
  document.querySelector('#inner').addEventListener('click', function() {
    console.log('Inner div clicked');
  });
  
  // When inner div is clicked, both logs fire due to event bubbling
}

// Solution: Stop propagation if needed
function setupClickHandlersFixed() {
  document.querySelector('#outer').addEventListener('click', function() {
    console.log('Outer div clicked');
  });
  
  document.querySelector('#inner').addEventListener('click', function(event) {
    event.stopPropagation(); // Prevents bubbling to parent elements
    console.log('Inner div clicked');
  });
}

// 6. Reference vs. value confusion
// Problem: Unintended mutation of objects
function processUserData(user) {
  // Attempt to create a processed copy
  const processedUser = user;
  
  // Modify the "copy"
  processedUser.name = processedUser.name.toUpperCase();
  processedUser.lastAccessed = new Date();
  
  // Original data is also modified because objects are passed by reference
  return processedUser;
}

// Solution: Create a proper copy
function processUserDataFixed(user) {
  // Create a real copy
  const processedUser = { ...user };
  
  // Now modifications only affect the copy
  processedUser.name = processedUser.name.toUpperCase();
  processedUser.lastAccessed = new Date();
  
  return processedUser;
}`,
          exercise: {
            instructions:
              'Debug a complex JavaScript application that contains common issues. Identify and fix: 1) A race condition where async operations are not properly awaited, 2) A closure issue with event handlers bound in a loop, 3) A "this" context problem in a callback, and 4) A type coercion bug in a comparison. Document your debugging process, including tools and techniques used to identify the problems.',
          },
        },
      ],
      prepperSummary: `
    <div class="prepper-summary">
      <h3>🔑 Key Interview Takeaways</h3>
      <ul>
        <li><strong>Browser Tools:</strong> Modern browsers provide powerful developer tools with console methods, breakpoints, watch expressions, and performance profiling capabilities.</li>
        
        <li><strong>Debugging Process:</strong> A systematic approach to debugging involves reproducing the issue, isolating the problem, testing hypotheses, and verifying the solution.</li>
        
        <li><strong>Common JavaScript Bugs:</strong> Understanding typical issues like "this" binding problems, async execution flow, closure gotchas, and type coercion surprises makes debugging more efficient.</li>
        
        <li><strong>Console Methods:</strong> Beyond console.log(), use specialized methods like console.table(), console.time(), console.assert(), and console.trace() for more effective debugging.</li>
        
        <li><strong>Error Handling:</strong> Proper error handling with try/catch blocks and custom error classes makes debugging easier by providing more context about failures.</li>
      </ul>
      
      <h4>📝 Common Interview Questions</h4>
      <ol>
        <li>"How would you debug a performance issue in a JavaScript application?"</li>
        <li>"What tools and methods do you use to debug asynchronous JavaScript code?"</li>
        <li>"Explain how you would track down a memory leak in a web application"</li>
        <li>"How do you debug issues that only appear in production environments?"</li>
        <li>"What strategies do you use when dealing with hard-to-reproduce bugs?"</li>
      </ol>
    </div>
  `,
    }, // end of lesson 2

    {
      title: 'Common Pitfalls',
      description: 'Learn to recognize and avoid common JavaScript mistakes and anti-patterns.',
      sections: [
        {
          title: 'Variable and Scope Issues',
          explanation: `
        <p>JavaScript's variable behavior and scope rules can lead to several common pitfalls that cause bugs and unexpected behavior.</p>
        
        <h4>Hoisting Surprises</h4>
        <p>Variable and function declarations are hoisted (moved to the top of their scope), which can cause unexpected behavior if not understood properly.</p>
        
        <p>JavaScript's hoisting mechanism has several nuances that can trip up developers:</p>
        
        <ul>
          <li><strong>Variable declaration hoisting:</strong> <code>var</code> declarations (but not assignments) are hoisted to the top of their scope</li>
          <li><strong>Function declaration hoisting:</strong> Complete function declarations are hoisted and can be used before their actual definition</li>
          <li><strong>Function expressions:</strong> Function expressions using <code>var</code> have only their variable declaration hoisted, not the function assignment</li>
          <li><strong>let/const temporal dead zone:</strong> <code>let</code> and <code>const</code> are hoisted but cannot be accessed before declaration (temporal dead zone)</li>
          <li><strong>Hoisting within blocks:</strong> <code>var</code> hoists to function scope, not block scope, while <code>let</code>/<code>const</code> respect block scope</li>
        </ul>
        
        <div class="code-example">
          <pre><code>// Problem: Using variables before declaration
console.log(x); // undefined (not an error!)
var x = 5;

// What's really happening:
// var x; // hoisted declaration
// console.log(x); // undefined
// x = 5; // original assignment stays in place

// Problem: Hoisting with let/const
console.log(y); // ReferenceError: y is not defined
let y = 10;

// Function hoisting can also surprise
foo(); // Works because function declarations are fully hoisted
function foo() {
  console.log('foo');
}

bar(); // TypeError: bar is not a function
var bar = function() {
  console.log('bar');
};</code></pre>
        </div>
        
        <h4>Closure Gotchas</h4>
        <p>Closures are powerful but can lead to memory leaks and unexpected variable capture if not used carefully.</p>
        
        <p>Common closure-related issues include:</p>
        
        <ul>
          <li><strong>Loop closures:</strong> Creating functions inside loops that reference the loop counter</li>
          <li><strong>Unintended references:</strong> Closures capturing more variables than needed, causing memory retention</li>
          <li><strong>Mutating closed-over variables:</strong> When multiple closures share and modify the same variable</li>
          <li><strong>Circular references:</strong> Functions in closures referencing objects that reference the function</li>
          <li><strong>Event handler leaks:</strong> Closures in event handlers that prevent garbage collection when they reference DOM elements</li>
        </ul>
        
        <div class="code-example">
          <pre><code>// Problem: Creating functions in a loop with var
function createFunctions() {
  var functions = [];
  
  for (var i = 0; i < 3; i++) {
    functions.push(function() {
      console.log(i);
    });
  }
  
  return functions;
}

var fs = createFunctions();
fs[0](); // 3 (not 0 as might be expected)
fs[1](); // 3
fs[2](); // 3

// Solution: Use let for block scoping
function createFunctions() {
  var functions = [];
  
  for (let i = 0; i < 3; i++) {
    functions.push(function() {
      console.log(i);
    });
  }
  
  return functions;
}</code></pre>
        </div>
        
        <h4>Global Variables</h4>
        <p>Accidental global variables can cause conflicts, memory leaks, and make code harder to maintain and test.</p>
        
        <p>Global variables create several problems in applications:</p>
        
        <ul>
          <li><strong>Name collisions:</strong> Different parts of code or external libraries can overwrite each other's variables</li>
          <li><strong>Tight coupling:</strong> Code depending on globals is harder to test and reuse</li>
          <li><strong>State persistence:</strong> Globals retain state between function calls, creating hard-to-track bugs</li>
          <li><strong>Memory consumption:</strong> Globals stay in memory for the lifetime of the application</li>
          <li><strong>Security issues:</strong> Global variables can be modified by any code, including malicious scripts</li>
        </ul>
        
        <div class="code-example">
          <pre><code>// Problem: Accidental global variables
function updateUser() {
  username = 'John'; // Missing 'var', 'let', or 'const'
  // Now 'username' is a global variable
}

// Problem: Implicit globals via window
function storePreferences() {
  window.darkMode = true; // Explicitly creating a global
}

// Solution: Use strict mode
'use strict';
function updateUser() {
  username = 'John'; // ReferenceError in strict mode
}

// Solution: Explicitly declare variables with appropriate scope
function updateUser() {
  const username = 'John'; // Block-scoped to the function
}</code></pre>
        </div>
        
        <div class="interview-tip">
          <p><span class="interview-icon">🎯</span> <strong>Interview Focus:</strong> Understanding common variable pitfalls shows your depth of JavaScript knowledge and attention to detail.</p>
          <p>Key pitfalls to understand:</p>
          <ul>
            <li>Hoisting behavior of var, let, const, and functions</li>
            <li>Closure pitfalls in loops and event handlers</li>
            <li>The dangers of global variables and implicit globals</li>
            <li>Variable shadowing and naming conflicts</li>
            <li>The benefits of 'use strict' for catching common errors</li>
          </ul>
        </div>
      `,
          codeExample: `// Common JavaScript Pitfalls and Solutions

// 1. Hoisting Issues
function demonstrateHoisting() {
  // Example 1: Variable hoisting
  function hoistingExample1() {
    console.log(x); // undefined, not ReferenceError
    var x = 5;
    console.log(x); // 5
  }
  
  // Example 2: Function declaration vs. expression
  function hoistingExample2() {
    // This works - function declarations are fully hoisted
    declarationFunc();
    
    // This fails - only the variable is hoisted, not the assignment
    try {
      expressionFunc(); // TypeError: expressionFunc is not a function
    } catch (e) {
      console.error('Error:', e.message);
    }
    
    function declarationFunc() {
      console.log('Declaration function works!');
    }
    
    var expressionFunc = function() {
      console.log('Expression function');
    };
  }
  
  // Example 3: let/const temporal dead zone
  function hoistingExample3() {
    try {
      console.log(z); // ReferenceError
    } catch (e) {
      console.error('Error:', e.message);
    }
    
    let z = 10;
    console.log(z); // 10
  }
  
  // Solutions
  function hoistingSolutions() {
    // 1. Declare variables at the top of function scope
    let x; // Declare first
    console.log(x); // undefined, but no surprise
    x = 5; // Then assign
    
    // 2. Use let/const instead of var
    // They still hoist but remain in the "temporal dead zone" until declaration
    
    // 3. Always declare functions before using them
    // 4. Use function declarations over expressions when hoisting is desired
  }
}

// 2. Closure Pitfalls
function demonstrateClosurePitfalls() {
  // Example 1: The classic loop problem
  function closureInLoop() {
    const buttons = [];
    
    // Problem: All click handlers share the same 'i'
    for (var i = 0; i < 3; i++) {
      const button = document.createElement('button');
      button.textContent = 'Button ' + i;
      
      button.addEventListener('click', function() {
        console.log('Button ' + i + ' clicked'); // Always "Button 3 clicked"
      });
      
      buttons.push(button);
    }
    
    return buttons;
  }
  
  // Solution 1: Use let for block scope
  function closureInLoopFixed1() {
    const buttons = [];
    
    for (let i = 0; i < 3; i++) { // let creates a new binding per iteration
      const button = document.createElement('button');
      button.textContent = 'Button ' + i;
      
      button.addEventListener('click', function() {
        console.log('Button ' + i + ' clicked'); // Correct i for each button
      });
      
      buttons.push(button);
    }
    
    return buttons;
  }
  
  // Solution 2: Use an IIFE to create a new scope
  function closureInLoopFixed2() {
    const buttons = [];
    
    for (var i = 0; i < 3; i++) {
      const button = document.createElement('button');
      button.textContent = 'Button ' + i;
      
      // IIFE creates a new scope and captures the current value of i
      (function(index) {
        button.addEventListener('click', function() {
          console.log('Button ' + index + ' clicked');
        });
      })(i);
      
      buttons.push(button);
    }
    
    return buttons;
  }
  
  // Example 2: Memory leaks with closures
  function memoryLeakExample() {
    let largeData = new Array(10000000).fill('potentially large data');
    
    const smallObject = {
      processSomeData: function() {
        // Closure captures the largeData variable
        return largeData[0];
      }
    };
    
    return smallObject; // largeData is still referenced in the closure
  }
  
  // Solution: Clean up references
  function memoryLeakFixed() {
    let largeData = new Array(10000000).fill('potentially large data');
    
    const result = largeData[0]; // Extract just what we need
    
    const smallObject = {
      data: result,
      processSomeData: function() {
        return this.data;
      }
    };
    
    largeData = null; // Allow garbage collection
    return smallObject;
  }
}

// 3. "this" Context Issues
function demonstrateThisContextIssues() {
  // Example 1: Losing 'this' in callbacks
  const user = {
    name: 'John',
    greet: function() {
      console.log('Hello, my name is ' + this.name);
    },
    greetLater: function() {
      setTimeout(function() {
        // 'this' refers to the global object, not 'user'
        console.log('Hello, my name is ' + this.name); // "Hello, my name is undefined"
      }, 1000);
    }
  };
  
  // Solutions
  const userFixed = {
    name: 'John',
    
    // Solution 1: Arrow function preserves 'this'
    greetLater1: function() {
      setTimeout(() => {
        console.log('Hello, my name is ' + this.name); // Works correctly
      }, 1000);
    },
    
    // Solution 2: Store 'this' in a variable
    greetLater2: function() {
      const self = this;
      setTimeout(function() {
        console.log('Hello, my name is ' + self.name);
      }, 1000);
    },
    
    // Solution 3: Use bind
    greetLater3: function() {
      setTimeout(function() {
        console.log('Hello, my name is ' + this.name);
      }.bind(this), 1000);
    }
  };
  
  // Example 2: Method extraction changes context
  function contextChange() {
    const user = {
      name: 'Alice',
      greet: function() {
        console.log('Hello, I am ' + this.name);
      }
    };
    
    // Works as expected
    user.greet(); // "Hello, I am Alice"
    
    // Problem: Extracting method loses context
    const greet = user.greet;
    greet(); // "Hello, I am undefined"
    
    // Solutions
    const boundGreet = user.greet.bind(user);
    boundGreet(); // "Hello, I am Alice"
  }
}

// Continuing with Type Coercion Pitfalls

function demonstrateTypeCoercionPitfalls() {
  // Example 1: Unexpected loose equality results
  function looseEqualityIssues() {
    console.log(0 == '0');         // true
    console.log(false == '0');     // true
    console.log(null == undefined);// true
    console.log('' == 0);          // true
    console.log([1, 2] == '1,2');  // true
  }
  
  // Solution: Use strict equality
  function strictEqualitySolution() {
    console.log(0 === '0');         // false
    console.log(false === '0');     // false
    console.log(null === undefined);// false
    console.log('' === 0);          // false
    console.log([1, 2] === '1,2');  // false
  }
  
  // Example 2: Implicit type conversion in operations
  function implicitConversionIssues() {
    console.log(5 + '5');          // '55' (string concatenation)
    console.log('5' - 2);          // 3 (numeric subtraction)
    console.log('5' * '3');        // 15 (numeric multiplication)
    console.log(true + true);      // 2 (true coerces to 1)
    
    // Particularly problematic examples
    const value = 0;
    if (value == false) {          // true
      console.log('Zero is falsey and equals false with ==');
    }
    
    function add(a, b) {
      return a + b;                // Might be addition or concatenation
    }
    
    console.log(add(5, 10));       // 15
    console.log(add(5, '10'));     // '510'
  }
  
  // Solutions
  function typeSafeSolutions() {
    // Use explicit conversions
    function add(a, b) {
      return Number(a) + Number(b); // Ensure numeric addition
    }
    
    // Use type checking
    function safeAdd(a, b) {
      if (typeof a !== 'number' || typeof b !== 'number') {
        throw new TypeError('Both arguments must be numbers');
      }
      return a + b;
    }
    
    // Use strict equality for comparisons
    const value = 0;
    if (value === false) {
      // This won't execute
      console.log('Zero is exactly false');
    }
  }
}

// 5. Error Handling Pitfalls
function demonstrateErrorHandlingPitfalls() {
  // Example 1: Swallowing errors
  function silentFail() {
    try {
      riskyOperation();
    } catch (e) {
      // Error silently ignored
    }
  }
  
  // Example 2: Inconsistent error handling
  function getUser(id) {
    if (!id) {
      // Sometimes return null
      return null;
    }
    
    try {
      const user = fetchUser(id);
      return user;
    } catch (e) {
      // Sometimes throw
      throw new Error('Could not fetch user: ' + e.message);
    }
  }
  
  // Solution: Consistent error handling
  function getUserFixed(id) {
    try {
      if (!id) {
        throw new Error('Invalid user ID');
      }
      
      const user = fetchUser(id);
      
      if (!user) {
        throw new Error('User not found');
      }
      
      return user;
    } catch (e) {
      // Log all errors
      console.error('Error in getUserFixed:', e);
      
      // Rethrow with consistent error structure
      throw new Error('User fetch failed: ' + e.message);
    }
  }
  
  // Example 3: Asynchronous error handling
  function asyncErrorMishandling() {
    // Problem: try/catch won't catch async errors
    try {
      setTimeout(() => {
        throw new Error('Async error');
      }, 100);
    } catch (e) {
      // This will never execute
      console.error('Caught error:', e);
    }
  }
  
  // Solution: Use promises or async/await
  async function asyncErrorHandlingFixed() {
    try {
      await new Promise((resolve, reject) => {
        setTimeout(() => {
          reject(new Error('Async error'));
        }, 100);
      });
    } catch (e) {
      // This will catch the error
      console.error('Caught async error:', e);
    }
  }
}`,
          exercise: {
            instructions:
              'Review and fix a complex JavaScript application that contains common pitfalls and anti-patterns. Identify and resolve: 1) Variable scope and hoisting issues, 2) Closure bugs in event handlers, 3) "this" context problems, 4) Type coercion issues, and 5) Inconsistent error handling. For each issue, explain the problem, why it occurs, and implement a best-practice solution.',
          },
        },
        {
          title: 'Logic and Algorithm Pitfalls',
          explanation: `
        <p>Even with proper JavaScript syntax, logical errors and inefficient algorithms can still plague your code.</p>
        
        <h4>Off-by-One Errors</h4>
        <p>Off-by-one errors occur when loops or array operations incorrectly handle boundaries, often causing subtle bugs.</p>
        
        <p>These common boundary errors appear in many forms:</p>
        
        <ul>
          <li><strong>Loop boundaries:</strong> Using <= instead of < with array length, or starting from 1 instead of 0</li>
          <li><strong>Array indexing:</strong> Accessing index arr.length when the valid indices are 0 to arr.length-1</li>
          <li><strong>String operations:</strong> Incorrect substring or slice boundary calculations</li>
          <li><strong>Fencepost errors:</strong> Miscounting the number of elements or intervals needed</li>
          <li><strong>Buffer operations:</strong> Reading or writing beyond buffer boundaries</li>
          <li><strong>Boundary condition handling:</strong> Not properly handling the first or last element in a collection</li>
        </ul>
        
        <div class="code-example">
          <pre><code>// Problem: Off-by-one in a loop
function sumArray(arr) {
  let sum = 0;
  
  // Mistake: <= instead of <
  for (let i = 0; i <= arr.length; i++) {
    sum += arr[i]; // arr[arr.length] is undefined
  }
  
  return sum;
}

// Problem: Off-by-one in array slicing
function getFirstNItems(arr, n) {
  // Mistake: Wrong slice boundary
  return arr.slice(0, n - 1); // Should be slice(0, n)
}

// Solution: Carefully check boundaries
function sumArrayFixed(arr) {
  let sum = 0;
  
  for (let i = 0; i < arr.length; i++) {
    sum += arr[i];
  }
  
  return sum;
}</code></pre>
        </div>
        
        <h4>Mutation Side Effects</h4>
        <p>Unexpected object and array mutations can lead to difficult-to-track bugs, especially with shared references.</p>
        
        <p>JavaScript's reference behavior creates several mutation-related challenges:</p>
        
        <ul>
          <li><strong>Object reference passing:</strong> Objects are passed by reference, so changes to parameters affect the original object</li>
          <li><strong>Array mutation methods:</strong> Methods like <code>push()</code>, <code>splice()</code>, and <code>sort()</code> modify the original array</li>
          <li><strong>Shared references:</strong> Multiple variables can reference the same object, causing unintended updates</li>
          <li><strong>Nested object mutation:</strong> Deep properties can be changed while shallow copies remain the same</li>
          <li><strong>State corruption:</strong> Mutable state can lead to inconsistent application behavior</li>
        </ul>
        
        <div class="code-example">
          <pre><code>// Problem: Unintended mutation
function addItem(cart, item) {
  cart.items.push(item);
  return cart;
  // Original cart object is modified
}

const cart = { items: [{ id: 1, name: 'Apple' }] };
const updatedCart = addItem(cart, { id: 2, name: 'Banana' });

console.log(cart === updatedCart); // true, same object reference

// Solution: Create copies to avoid mutation
function addItemImmutable(cart, item) {
  return {
    ...cart,
    items: [...cart.items, item]
  };
  // Creates a new cart object with updated items
}</code></pre>
        </div>
        
        <h4>Infinite Loops and Recursion</h4>
        <p>Missing or incorrect termination conditions can cause infinite loops or recursion, leading to crashes or browser freezes.</p>
        
        <p>Common causes of infinite loops and recursion include:</p>
        
        <ul>
          <li><strong>Missing exit conditions:</strong> Not having a way to break out of loops or recursive calls</li>
          <li><strong>Incorrect increment/decrement:</strong> Not properly updating loop counters or recursion parameters</li>
          <li><strong>Logic errors in termination checks:</strong> Conditions that never evaluate to false</li>
          <li><strong>Recursive functions without base cases:</strong> Recursion that doesn't terminate for certain inputs</li>
          <li><strong>Complex loop conditions:</strong> Multiple conditions that interact in unexpected ways</li>
          <li><strong>Circular dependencies:</strong> Objects with circular references causing infinite recursion</li>
        </ul>
        
        <div class="code-example">
          <pre><code>// Problem: Missing termination condition
function findItem(arr, predicate) {
  let i = 0;
  
  // Missing check for array bounds
  while (predicate(arr[i]) === false) {
    i++;
    // If no item matches, this loops forever
  }
  
  return arr[i];
}

// Problem: Infinite recursion
function factorial(n) {
  // Missing base case
  return n * factorial(n - 1);
  // Will run until stack overflow
}

// Solution: Proper termination conditions
function findItemFixed(arr, predicate) {
  let i = 0;
  
  while (i < arr.length && predicate(arr[i]) === false) {
    i++;
  }
  
  return i < arr.length ? arr[i] : undefined;
}

function factorialFixed(n) {
  if (n <= 1) {
    return 1; // Base case
  }
  return n * factorialFixed(n - 1);
}</code></pre>
        </div>
        
        <div class="interview-tip">
          <p><span class="interview-icon">🎯</span> <strong>Interview Focus:</strong> Identifying and fixing logic bugs demonstrates your debugging and programming fundamentals.</p>
          <p>Key logic pitfalls to understand:</p>
          <ul>
            <li>Handling edge cases in algorithms</li>
            <li>Mutation vs. immutable approaches</li>
            <li>Proper loop termination conditions</li>
            <li>Array and string boundary checks</li>
            <li>Recursion safety with proper base cases</li>
          </ul>
        </div>
      `,
          codeExample: `
          // Common Logic and Algorithm Pitfalls in JavaScript

// 1. Off-by-one errors
function demonstrateOffByOneErrors() {
  // Example 1: Array iteration bounds
  function processList(items) {
    const results = [];
    
    // Problem: i <= items.length goes one element too far
    for (let i = 0; i <= items.length; i++) {
      results.push(processItem(items[i])); // items[items.length] is undefined
    }
    
    return results;
  }
  
  // Fixed version
  function processListFixed(items) {
    const results = [];
    
    // Correct bounds: i < items.length
    for (let i = 0; i < items.length; i++) {
      results.push(processItem(items[i]));
    }
    
    return results;
  }
  
  // Example 2: String substring errors
  function getExtension(filename) {
    const dotIndex = filename.lastIndexOf('.');
    
    // Problem: Wrong index calculation
    return filename.substring(dotIndex, filename.length); // Includes the dot
  }
  
  // Fixed version
  function getExtensionFixed(filename) {
    const dotIndex = filename.lastIndexOf('.');
    
    if (dotIndex === -1) {
      return ''; // Handle case with no extension
    }
    
    // Correct index: dotIndex + 1 to exclude the dot
    return filename.substring(dotIndex + 1);
  }
  
  // Example 3: Fencepost error in range generation
  function createRange(start, end) {
    const range = [];
    
    // Problem: Doesn't include the end value
    for (let i = start; i < end; i++) {
      range.push(i);
    }
    
    return range;
  }
  
  // Solution depends on intended behavior
  function createInclusiveRange(start, end) {
    const range = [];
    
    // Include both start and end
    for (let i = start; i <= end; i++) {
      range.push(i);
    }
    
    return range;
  }
}

// 2. Mutation side effects
function demonstrateMutationIssues() {
  // Example 1: Unintentional array mutation
  function addItemsBad(cart, newItems) {
    // Directly modifies the original cart
    cart.items.push(...newItems);
    return cart;
  }
  
  // Solution: Create a new copy
  function addItemsGood(cart, newItems) {
    // Create a new cart object with a new items array
    return {
      ...cart,
      items: [...cart.items, ...newItems]
    };
  }
  
  // Example 2: Nested object mutation
  function updateAddressBad(user, addressUpdates) {
    // This modifies properties of the original address object
    Object.assign(user.address, addressUpdates);
    return user;
  }
  
  // Solution: Deep copy with nested spread
  function updateAddressGood(user, addressUpdates) {
    return {
      ...user,
      address: {
        ...user.address,
        ...addressUpdates
      }
    };
  }
  
  // Example 3: Array sorting mutation
  function getSortedItemsBad(items) {
    // This sorts the original array
    return items.sort((a, b) => a.price - b.price);
  }
  
  // Solution: Create a copy before sorting
  function getSortedItemsGood(items) {
    // Make a copy first, then sort
    return [...items].sort((a, b) => a.price - b.price);
  }
}

// 3. Infinite loops and recursion
function demonstrateInfiniteLoops() {
  // Example 1: Missing exit condition in while loop
  function findElementBad(array, condition) {
    let index = 0;
    
    // Problem: No bounds check
    while (!condition(array[index])) {
      index++;
      // If condition is never true, this never terminates
    }
    
    return array[index];
  }
  
  // Solution: Add bounds check
  function findElementGood(array, condition) {
    let index = 0;
    
    while (index < array.length && !condition(array[index])) {
      index++;
    }
    
    // Return undefined if not found
    return index < array.length ? array[index] : undefined;
  }
  
  // Example 2: Infinite recursion
  function countDownBad(n) {
    console.log(n);
    // Problem: Missing base case
    return countDownBad(n - 1);
  }
  
  // Solution: Add base case
  function countDownGood(n) {
    console.log(n);
    
    if (n <= 0) {
      return; // Base case
    }
    
    return countDownGood(n - 1);
  }
  
  // Example 3: Loop with incorrect increment
  function processItemsBad(items) {
    let i = 0;
    
    while (i < items.length) {
      processItem(items[i]);
      
      // Problem: Increment in conditional branch might be skipped
      if (shouldSkipNext(items[i])) {
        // Missing increment here
      } else {
        i++;
      }
    }
  }
  
  // Solution: Ensure increment always happens
  function processItemsGood(items) {
    let i = 0;
    
    while (i < items.length) {
      processItem(items[i]);
      
      // Always increment, but maybe by 2 in special cases
      if (shouldSkipNext(items[i])) {
        i += 2; // Skip next item
      } else {
        i++;
      }
    }
  }
}

// 4. Logic boundary and edge cases
function demonstrateLogicBoundaryIssues() {
  // Example 1: Division by zero
  function calculateAverage(numbers) {
    // Problem: No check for empty array
    return numbers.reduce((sum, num) => sum + num, 0) / numbers.length;
    // Division by zero if numbers is empty
  }
  
  // Solution: Handle edge case
  function calculateAverageFixed(numbers) {
    if (numbers.length === 0) {
      return 0; // Or throw error, or return null, depending on requirements
    }
    
    return numbers.reduce((sum, num) => sum + num, 0) / numbers.length;
  }
  
  // Example 2: Incorrect handling of negative numbers
  function countElements(n) {
    // Problem: Doesn't handle negative input
    const result = [];
    for (let i = 0; i < n; i++) {
      result.push(i);
    }
    return result;
  }
  
  // Solution: Handle negative case
  function countElementsFixed(n) {
   if (n < 0) {
      throw new Error('Input must be non-negative');
      // Or return an empty array, depending on requirements
    }
    
    const result = [];
    for (let i = 0; i < n; i++) {
      result.push(i);
    }
    return result;
  }
  
  // Example 3: String parsing without validation
  function parseUserInfo(infoString) {
    // Problem: Assumes specific format without validation
    const [name, ageStr] = infoString.split(':');
    const age = parseInt(ageStr);
    
    return { name, age };
  }
  
  // Solution: Add validation
  function parseUserInfoFixed(infoString) {
    if (!infoString || typeof infoString !== 'string') {
      throw new Error('Input must be a non-empty string');
    }
    
    const parts = infoString.split(':');
    
    if (parts.length !== 2) {
      throw new Error('Input must be in format "name:age"');
    }
    
    const [name, ageStr] = parts;
    const age = parseInt(ageStr);
    
    if (isNaN(age)) {
      throw new Error('Age must be a valid number');
    }
    
    return { name, age };
  }
}`,
          exercise: {
            instructions:
              'Identify and fix logic and algorithm pitfalls in a shopping cart implementation. Find and address: 1) Off-by-one errors in item iteration, 2) Mutation issues that cause unintended side effects, 3) Boundary cases like empty cart handling, 4) Input validation gaps, and 5) Inefficient algorithms that could be optimized. Document each issue you find, explain why its problematic, and implement a proper solution.',
          },
        },
      ],
      prepperSummary: `
    <div class="prepper-summary">
      <h3>🔑 Key Interview Takeaways</h3>
      <ul>
        <li><strong>Variable Pitfalls:</strong> Watch for hoisting issues, closure problems in loops, and accidental global variables that can lead to unexpected behavior.</li>
        
        <li><strong>Context Issues:</strong> Be aware of "this" binding changes in callbacks, event handlers, and method references, and know how to maintain the correct context.</li>
        
        <li><strong>Type Coercion:</strong> Understand the implications of JavaScript's type conversion, especially with loose equality (==) vs. strict equality (===), and how it affects comparisons.</li>
        
        <li><strong>Logic Errors:</strong> Pay attention to off-by-one errors, missing termination conditions, boundary cases, and edge scenarios in your algorithms.</li>
        
        <li><strong>Mutation Problems:</strong> Recognize when mutation of objects and arrays leads to bugs, and know how to implement safer immutable approaches.</li>
      </ul>
      
      <h4>📝 Common Interview Questions</h4>
      <ol>
        <li>"Explain the difference between var, let, and const regarding scope and hoisting"</li>
        <li>"How would you fix 'this' context issues in event handlers or callbacks?"</li>
        <li>"What's the problem with using == instead of === in comparisons?"</li>
        <li>"How do you avoid common array iteration pitfalls?"</li>
        <li>"What strategies do you use to prevent bugs from object mutations?"</li>
      </ol>
    </div>
    `,
    },
  ],
  // #Testing and Debugging - Enhanced Challenge Section

  challenge: {
    description:
      "You're joining a team that has been struggling with bug reports and performance issues in their e-commerce web application. Your task is to implement a suite of testing, debugging, and optimization tools that will help the team identify and fix problems more effectively.",

    contextAndBackground: `
    This e-commerce application has grown organically over time, with multiple developers contributing to the codebase. It now suffers from:
    
    - Inconsistent error handling strategies
    - Performance bottlenecks during checkout and catalog browsing
    - Compatibility issues across different browsers
    - Intermittent bugs that are difficult to reproduce
    - Memory leaks affecting long browsing sessions
    
    Your toolkit needs to address these issues systematically, providing both diagnostic capabilities and preventive measures for future development.
  `,

    technicalConsiderations: `
    When building your testing and debugging toolkit, consider these technical aspects:
    
    - The application uses a component-based architecture
    - Multiple asynchronous operations occur during critical user flows
    - There's a mix of modern and legacy code
    - The app handles sensitive user data during checkout
    - Performance is especially critical on mobile devices
    - The team needs both developer tools and user-facing error reporting
  `,

    requirements: [
      'Create a test framework for the shopping cart functionality with edge case handling',
      'Implement a debugging utility that captures and logs errors with contextual information',
      'Add performance measurement tools to identify bottlenecks in page loading and interaction',
      'Build a code analyzer that detects common JavaScript pitfalls and anti-patterns',
      'Document best practices for avoiding common bugs in the application',
    ],

    detailedRequirements: {
      testing: `
      The test framework should:
      - Verify cart calculations for different product types (physical, digital, subscription)
      - Test edge cases like empty carts, maximum quantity limits, and discount application
      - Handle asynchronous operations like inventory checks and price calculations
      - Provide clear reporting on test failures with expected vs. actual values
      - Support both automated test runs and interactive debugging sessions
    `,

      debugging: `
      The error tracking utility should:
      - Capture error stack traces with source maps for better debugging
      - Add contextual information like user actions, app state, and environment details
      - Group similar errors to identify patterns and prioritize fixes
      - Handle both synchronous and asynchronous errors consistently
      - Provide mechanisms for graceful degradation when errors occur
    `,

      performance: `
      The performance tools should:
      - Measure key metrics like Time to Interactive, First Contentful Paint, and interaction latency
      - Identify DOM operations that cause layout thrashing
      - Track memory usage patterns to detect potential leaks
      - Monitor network request performance and cache effectiveness
      - Generate visualizations and reports that highlight bottlenecks
    `,

      codeAnalysis: `
      The code analyzer should detect:
      - Improper error handling patterns
      - Potential memory leaks in event handlers and closures
      - Inefficient DOM manipulation practices
      - Type coercion issues and inconsistent comparisons
      - "this" context problems in callbacks and event handlers
      - Inconsistent async/await usage and promise handling
    `,
    },

    implementationGuidance: `
    As you implement your solution:
    
    1. Focus on modularity so each tool can be used independently
    2. Consider both development-time and runtime diagnostics
    3. Balance comprehensive features with performance overhead
    4. Provide clear documentation with examples for each tool
    5. Include mechanisms to enable/disable tools in production environments
  `,

    starterCode: `// TestingDebuggingKit - Testing and Debugging Challenge

class TestingDebuggingKit {
  constructor(appContext) {
    this.appContext = appContext;
    
    // TODO: Initialize testing framework for the shopping cart
    this.testRunner = null;
    
    // TODO: Create error tracking utility
    this.errorTracker = null;
    
    // TODO: Setup performance monitoring tools
    this.performanceMonitor = null;
    
    // TODO: Implement code quality analyzer
    this.codeAnalyzer = null;
  }
  
  // TODO: Create test suite for shopping cart
  testShoppingCart() {
    // Implement tests for various cart scenarios
  }
  
  // TODO: Implement error tracking that provides context
  trackErrors() {
    // Set up global error handling
  }
  
  // TODO: Add performance measurement tools
  measurePerformance() {
    // Track and report performance metrics
  }
  
  // TODO: Build code analyzer to identify potential issues
  analyzeCode() {
    // Detect common anti-patterns
  }
}

// Export the kit
export default TestingDebuggingKit;`,

    evaluation: `
    Your solution will be evaluated based on:
    
    - Completeness: Does it address all the requirements?
    - Effectiveness: How well do the tools identify and help fix real issues?
    - Usability: How easy is it for developers to understand and use the tools?
    - Performance: Do the tools themselves have minimal impact on application performance?
    - Extensibility: Can the toolkit be easily expanded to cover new scenarios?
  `,
  },
}

export default testingAndDebugging
