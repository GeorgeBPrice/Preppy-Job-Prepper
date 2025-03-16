// #Advanced JavaScript Concepts

const advancedJavaScriptConcepts = {
  title: 'Advanced JavaScript Concepts',
  description:
    'Master sophisticated JavaScript techniques and modern features needed for complex applications.',
  lessons: [
    {
      title: 'Prototypes and Inheritance',
      description:
        "Understand JavaScript's prototype-based inheritance model and object-oriented patterns.",
      sections: [
        {
          title: 'Prototype Chain',
          explanation: `
        <p>JavaScript's inheritance model is based on prototypes rather than classes, forming a chain of object references that enables property and method lookup.</p>
        
        <h4>Prototype Chain Basics</h4>
        <p>When you access a property on an object, JavaScript first looks for the property on the object itself. If not found, it looks up the prototype chain.</p>
        <div class="code-example">
          <pre><code>// Create an object with a prototype
const animal = {
  eats: true,
  walk() {
    console.log('Animal walking');
  }
};

// Use animal as prototype for rabbit
const rabbit = Object.create(animal);
rabbit.jumps = true;

// Property lookups
console.log(rabbit.jumps); // true (own property)
console.log(rabbit.eats);  // true (inherited from animal)
rabbit.walk();            // "Animal walking" (method from animal)

// Check property ownership
console.log(rabbit.hasOwnProperty('jumps')); // true
console.log(rabbit.hasOwnProperty('eats'));  // false</code></pre>
        </div>
        
        <h4>Constructor Functions and Prototypes</h4>
        <p>Constructor functions provide a way to create multiple objects with the same structure and behavior.</p>
        <div class="code-example">
          <pre><code>// Constructor function
function Animal(name) {
  this.name = name;
}

// Adding methods to prototype (shared by all instances)
Animal.prototype.eat = function() {
  console.log(\`\${this.name} is eating\`);
};

// Create instances
const dog = new Animal('Rex');
const cat = new Animal('Whiskers');

dog.eat(); // "Rex is eating"
cat.eat(); // "Whiskers is eating"

// Verify prototype relationship
console.log(dog.__proto__ === Animal.prototype); // true
console.log(dog instanceof Animal); // true</code></pre>
        </div>
        
        <h4>Prototype Inheritance</h4>
        <p>JavaScript allows for inheritance chains by connecting constructor prototypes.</p>
        <div class="code-example">
          <pre><code>// Base constructor
function Animal(name) {
  this.name = name;
}

Animal.prototype.eat = function() {
  console.log(\`\${this.name} is eating\`);
};

// Child constructor
function Dog(name, breed) {
  // Call parent constructor
  Animal.call(this, name);
  this.breed = breed;
}

// Set up inheritance
Dog.prototype = Object.create(Animal.prototype);
Dog.prototype.constructor = Dog;  // Fix constructor reference

// Add dog-specific methods
Dog.prototype.bark = function() {
  console.log(\`\${this.name} is barking\`);
};

// Create dog instance
const rex = new Dog('Rex', 'German Shepherd');
rex.eat();  // "Rex is eating" (inherited from Animal)
rex.bark(); // "Rex is barking" (from Dog)</code></pre>
        </div>
        
        <div class="interview-tip">
          <p><span class="interview-icon">🎯</span> <strong>Interview Focus:</strong> Understanding prototypes demonstrates your grasp of JavaScript's core inheritance mechanism.</p>
          <p>Key points to understand:</p>
          <ul>
            <li>The difference between prototype inheritance and classical inheritance</li>
            <li>How the prototype chain affects property lookup</li>
            <li>The relationship between constructors, __proto__, and prototype</li>
            <li>Common inheritance patterns and their tradeoffs</li>
            <li>How ES6 classes work under the hood with prototypes</li>
          </ul>
        </div>
      `,
          codeExample: `// Prototype and Inheritance Patterns

// 1. ES6 Classes (syntactic sugar over prototypes)
class Animal {
  constructor(name) {
    this.name = name;
  }
  
  speak() {
    console.log(\`\${this.name} makes a noise\`);
  }
}

class Dog extends Animal {
  constructor(name, breed) {
    super(name);
    this.breed = breed;
  }
  
  speak() {
    console.log(\`\${this.name} barks\`);
  }
  
  fetch() {
    console.log(\`\${this.name} fetches the ball\`);
  }
}

const rex = new Dog('Rex', 'German Shepherd');
rex.speak(); // "Rex barks"
rex.fetch(); // "Rex fetches the ball"

// 2. Prototypal Inheritance with Object.create()
const vehiclePrototype = {
  init(make, model) {
    this.make = make;
    this.model = model;
    return this;
  },
  
  drive() {
    console.log(\`Driving \${this.make} \${this.model}\`);
  },
  
  park() {
    console.log(\`Parking \${this.make} \${this.model}\`);
  }
};

// Create car from vehicle prototype
const car = Object.create(vehiclePrototype).init('Toyota', 'Camry');
car.drive(); // "Driving Toyota Camry"

// Create truck with additional features
const truckPrototype = Object.create(vehiclePrototype);

truckPrototype.init = function(make, model, capacity) {
  vehiclePrototype.init.call(this, make, model);
  this.capacity = capacity;
  return this;
};

truckPrototype.load = function(weight) {
  if (weight > this.capacity) {
    console.log('Overloaded!');
    return false;
  }
  console.log(\`Loaded \${weight} tons\`);
  return true;
};

const truck = Object.create(truckPrototype).init('Ford', 'F150', 2);
truck.drive(); // "Driving Ford F150"
truck.load(1.5); // "Loaded 1.5 tons"

// 3. Mixins Pattern
// Creating behavior mixins
const swimmingMixin = {
  swim() {
    console.log(\`\${this.name} is swimming\`);
  }
};

const flyingMixin = {
  fly() {
    console.log(\`\${this.name} is flying\`);
  }
};

// Class to enhance with mixins
class Bird {
  constructor(name) {
    this.name = name;
  }
  
  eat() {
    console.log(\`\${this.name} is eating\`);
  }
}

// Apply mixins
Object.assign(Bird.prototype, flyingMixin);

const sparrow = new Bird('Sparrow');
sparrow.eat(); // "Sparrow is eating"
sparrow.fly(); // "Sparrow is flying"

// Create duck with multiple mixins
class Duck extends Bird {}
Object.assign(Duck.prototype, swimmingMixin);

const donald = new Duck('Donald');
donald.eat();  // "Donald is eating"
donald.fly();  // "Donald is flying"
donald.swim(); // "Donald is swimming"`,
          exercise: {
            instructions:
              'Implement a prototype-based inheritance system for a library management application. Create a base Publication class, then extend it to create Book and Magazine classes with appropriate properties and methods. Then implement a Library class that manages multiple publication types and supports operations like borrowing, returning, and searching for publications by various criteria.',
          },
        },
        {
          title: 'ES6 Classes',
          explanation: `
        <p>ES6 classes provide a cleaner, more familiar syntax for creating objects and implementing inheritance, though they work on top of JavaScript's prototype system.</p>
        
        <h4>Class Syntax</h4>
        <p>Classes offer a more structured way to define object blueprints, making code more readable and maintainable.</p>
        <div class="code-example">
          <pre><code>// Class declaration
class User {
  // Constructor method
  constructor(name, email) {
    this.name = name;
    this.email = email;
  }
  
  // Instance methods
  greet() {
    return \`Hello, my name is \${this.name}\`;
  }
  
  // Getters and setters
  get emailAddress() {
    return this.email;
  }
  
  set emailAddress(newEmail) {
    if (!newEmail.includes('@')) {
      throw new Error('Invalid email format');
    }
    this.email = newEmail;
  }
  
  // Static methods (called on the class itself)
  static createAnonymous() {
    return new User('Anonymous', 'anon@example.com');
  }
}

// Creating instances
const user1 = new User('John', 'john@example.com');
console.log(user1.greet()); // "Hello, my name is John"

// Using getter
console.log(user1.emailAddress); // "john@example.com"

// Using static method
const anonymous = User.createAnonymous();
console.log(anonymous.name); // "Anonymous"</code></pre>
        </div>
        
        <h4>Class Inheritance</h4>
        <p>Classes can extend other classes, creating an inheritance hierarchy that's easier to understand than prototype chains.</p>
        <div class="code-example">
          <pre><code>// Base class
class Person {
  constructor(name, age) {
    this.name = name;
    this.age = age;
  }
  
  describe() {
    return \`\${this.name}, \${this.age} years old\`;
  }
}

// Child class extending base class
class Employee extends Person {
  constructor(name, age, jobTitle, salary) {
    // Call parent constructor
    super(name, age);
    
    // Add own properties
    this.jobTitle = jobTitle;
    this.salary = salary;
  }
  
  // Override parent method
  describe() {
    // Use parent method as part of new implementation
    return \`\${super.describe()} working as \${this.jobTitle}\`;
  }
  
  // Add new methods
  promote(newTitle) {
    this.jobTitle = newTitle;
    this.salary *= 1.1; // 10% raise
  }
}

const employee = new Employee('Alice', 30, 'Developer', 80000);
console.log(employee.describe()); // "Alice, 30 years old working as Developer"

employee.promote('Senior Developer');
console.log(employee.jobTitle); // "Senior Developer"
console.log(employee.salary);   // 88000</code></pre>
        </div>
        
        <h4>Private Class Fields</h4>
        <p>Modern JavaScript allows for true private class fields, enhancing encapsulation.</p>
        <div class="code-example">
          <pre><code>// Class with private fields (modern JS)
class BankAccount {
  // Private fields (with # prefix)
  #balance = 0;
  #transactions = [];
  
  constructor(owner, initialDeposit = 0) {
    this.owner = owner;
    if (initialDeposit > 0) {
      this.deposit(initialDeposit);
    }
  }
  
  deposit(amount) {
    if (amount <= 0) throw new Error('Deposit amount must be positive');
    
    this.#balance += amount;
    this.#transactions.push({ type: 'deposit', amount, date: new Date() });
    return this.#balance;
  }
  
  withdraw(amount) {
    if (amount <= 0) throw new Error('Withdrawal amount must be positive');
    if (amount > this.#balance) throw new Error('Insufficient funds');
    
    this.#balance -= amount;
    this.#transactions.push({ type: 'withdrawal', amount, date: new Date() });
    return this.#balance;
  }
  
  getBalance() {
    return this.#balance;
  }
  
  getTransactionHistory() {
    // Return a copy to prevent modification
    return [...this.#transactions];
  }
}

const account = new BankAccount('John', 1000);
account.deposit(500);
account.withdraw(200);
console.log(account.getBalance()); // 1300

// Private fields can't be accessed directly
// console.log(account.#balance); // SyntaxError
// account.#transactions = []; // SyntaxError</code></pre>
        </div>
        
        <div class="interview-tip">
          <p><span class="interview-icon">🎯</span> <strong>Interview Focus:</strong> Understanding ES6 classes demonstrates your ability to write modern, maintainable JavaScript code.</p>
          <p>Key points to understand:</p>
          <ul>
            <li>How classes work under the hood with prototypes</li>
            <li>The significance of the 'super' keyword in inheritance</li>
            <li>The difference between instance methods and static methods</li>
            <li>Encapsulation techniques with private fields</li>
            <li>Limitations of classes compared to other OOP languages</li>
          </ul>
        </div>
      `,
          codeExample: `// Advanced ES6 Class Patterns

// 1. Abstract Base Class Pattern
class Shape {
  constructor() {
    // Prevent direct instantiation of abstract class
    if (this.constructor === Shape) {
      throw new Error('Cannot instantiate abstract class');
    }
  }
  
  // Abstract method - must be implemented by subclasses
  calculate_area() {
    throw new Error('Abstract method must be implemented');
  }
  
  // Concrete method available to all subclasses
  toString() {
    return \`Shape with area: \${this.calculate_area()}\`;
  }
}

class Circle extends Shape {
  constructor(radius) {
    super();
    this.radius = radius;
  }
  
  calculate_area() {
    return Math.PI * this.radius * this.radius;
  }
}

class Rectangle extends Shape {
  constructor(width, height) {
    super();
    this.width = width;
    this.height = height;
  }
  
  calculate_area() {
    return this.width * this.height;
  }
}

// Usage
// const shape = new Shape(); // Error: Cannot instantiate abstract class
const circle = new Circle(5);
console.log(circle.toString()); // "Shape with area: 78.53981633974483"

// 2. Singleton Pattern with Classes
class Logger {
  constructor() {
    if (Logger.instance) {
      return Logger.instance;
    }
    
    this.logs = [];
    Logger.instance = this;
  }
  
  log(message) {
    this.logs.push({
      message,
      timestamp: new Date().toISOString()
    });
    console.log(\`LOG: \${message}\`);
  }
  
  printLogCount() {
    console.log(\`Total logs: \${this.logs.length}\`);
  }
}

// Usage
const logger1 = new Logger();
const logger2 = new Logger();

logger1.log('First message');
logger2.log('Second message');

logger1.printLogCount(); // "Total logs: 2"
console.log(logger1 === logger2); // true - same instance

// 3. Factory Pattern with Classes
class User {
  constructor(data) {
    this.id = data.id;
    this.name = data.name;
    this.email = data.email;
    this.role = data.role;
  }
}

class AdminUser extends User {
  constructor(data) {
    super(data);
    this.permissions = data.permissions || ['read', 'write', 'delete'];
  }
  
  hasPermission(permission) {
    return this.permissions.includes(permission);
  }
}

class RegularUser extends User {
  constructor(data) {
    super(data);
    this.subscriptionTier = data.subscriptionTier || 'free';
  }
  
  upgradeSubscription(newTier) {
    this.subscriptionTier = newTier;
    console.log(\`Upgraded to \${newTier} tier\`);
  }
}

// User factory
class UserFactory {
  static createUser(data) {
    switch(data.role) {
      case 'admin':
        return new AdminUser(data);
      case 'user':
        return new RegularUser(data);
      default:
        throw new Error(\`Invalid user role: \${data.role}\`);
    }
  }
}

// Usage
const adminUser = UserFactory.createUser({
  id: 1,
  name: 'Admin',
  email: 'admin@example.com',
  role: 'admin'
});

const regularUser = UserFactory.createUser({
  id: 2,
  name: 'User',
  email: 'user@example.com',
  role: 'user',
  subscriptionTier: 'basic'
});

console.log(adminUser.hasPermission('delete')); // true
regularUser.upgradeSubscription('premium'); // "Upgraded to premium tier"`,
          exercise: {
            instructions:
              'Create a class hierarchy for an e-commerce system. Implement a base Product class, then create specialized subclasses like PhysicalProduct (with shipping details), DigitalProduct (with download information), and SubscriptionProduct (with recurring billing). Add appropriate methods for calculating prices, taxes, and handling the purchase process for each product type. Use private fields to encapsulate sensitive information and implement inheritance appropriately.',
          },
        },
      ],
      prepperSummary: `
    <div class="prepper-summary">
      <h3>🔑 Key Interview Takeaways</h3>
      <ul>
        <li><strong>Prototype Chain:</strong> JavaScript's inheritance is based on a chain of object prototypes, with property lookups traversing this chain until a match is found or null is reached.</li>
        
        <li><strong>Constructor Functions:</strong> Used with the 'new' keyword to create objects, with shared methods placed on the constructor's prototype for memory efficiency.</li>
        
        <li><strong>ES6 Classes:</strong> Provide cleaner syntax over the prototype system, with support for constructors, instance methods, static methods, getters/setters, and inheritance.</li>
        
        <li><strong>Inheritance Patterns:</strong> Include prototypal inheritance (Object.create), constructor inheritance, class inheritance (extends), and mixins for composition.</li>
        
        <li><strong>Encapsulation:</strong> Modern JavaScript supports private fields with the # prefix, enabling true encapsulation within classes.</li>
      </ul>
      
      <h4>📝 Common Interview Questions</h4>
      <ol>
        <li>"Explain the prototype chain in JavaScript and how property lookup works"</li>
        <li>"What is the difference between __proto__ and prototype?"</li>
        <li>"How do ES6 classes work under the hood in JavaScript?"</li>
        <li>"Explain different ways to implement inheritance in JavaScript"</li>
        <li>"How would you implement private variables and methods in JavaScript?"</li>
      </ol>
    </div>
  `,
    },

    {
      title: 'Web Workers',
      description:
        'Learn how to use Web Workers to run JavaScript code in background threads for improved performance.',
      sections: [
        {
          title: 'Web Workers Fundamentals',
          explanation: `
        <p>Web Workers provide a way to run JavaScript in background threads, separate from the main execution thread, enabling true parallel processing for web applications.</p>
        
        <h4>Why Use Web Workers?</h4>
        <p>JavaScript is single-threaded by default, which means heavy computations can block the UI and make applications unresponsive.</p>
        <ul>
          <li><strong>Performance:</strong> Execute CPU-intensive tasks without freezing the interface</li>
          <li><strong>Responsiveness:</strong> Keep the main thread free for user interactions</li>
          <li><strong>Concurrency:</strong> Utilize multi-core processors for parallel execution</li>
          <li><strong>Isolation:</strong> Separate concerns with code running in different contexts</li>
        </ul>
        
        <h4>Types of Web Workers</h4>
        <p>There are different types of Web Workers for different use cases:</p>
        <ul>
          <li><strong>Dedicated Workers:</strong> Linked to their creator, used by a single script</li>
          <li><strong>Shared Workers:</strong> Can be shared between multiple scripts or windows</li>
          <li><strong>Service Workers:</strong> Act as network proxies, enabling offline experiences</li>
        </ul>
        
        <h4>Creating and Using Dedicated Workers</h4>
        <p>Dedicated Workers are the most common type, allowing scripts to offload processing to a separate thread.</p>
        <div class="code-example">
          <pre><code>// Main script (main.js)
// Create a new worker
const worker = new Worker('worker.js');

// Send message to worker
worker.postMessage({
  command: 'calculate',
  data: { numbers: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10] }
});

// Listen for messages from worker
worker.onmessage = function(event) {
  console.log('Result from worker:', event.data);
};

// Handle errors
worker.onerror = function(error) {
  console.error('Worker error:', error.message);
};

// Terminate worker when done
function stopWorker() {
  worker.terminate();
  console.log('Worker terminated');
}

// Worker script (worker.js)
// Listen for messages from main thread
self.onmessage = function(event) {
  const { command, data } = event.data;
  
  if (command === 'calculate') {
    // Perform CPU-intensive calculation
    const result = performComplexCalculation(data.numbers);
    
    // Send result back to main thread
    self.postMessage({ result });
  }
};

function performComplexCalculation(numbers) {
  // Simulate complex calculation
  let result = 0;
  for (let i = 0; i < 10000000; i++) {
    result += numbers.reduce((sum, num) => sum + Math.sqrt(num), 0);
  }
  return result;
}</code></pre>
        </div>
        
        <div class="interview-tip">
          <p><span class="interview-icon">🎯</span> <strong>Interview Focus:</strong> Understanding Web Workers demonstrates your ability to build high-performance web applications.</p>
          <p>Key points to understand:</p>
          <ul>
            <li>When to use Workers vs. the main thread</li>
            <li>Communication patterns between threads</li>
            <li>Worker limitations and memory considerations</li>
            <li>Performance implications and measurement</li>
            <li>Error handling strategies for worker threads</li>
          </ul>
        </div>
      `,
          codeExample: `// Web Worker Implementation Examples

// 1. Basic Worker with Data Processing
// ----------------------------------
// main.js
function startImageProcessingWorker() {
  // Create worker instance
  const imageWorker = new Worker('image-processor.js');
  
  // Prepare image data (simplified for example)
  const imageData = {
    width: 1200,
    height: 800,
    pixels: new Uint8ClampedArray(1200 * 800 * 4) // RGBA data
  };
  
  // Fill with some example data
  for (let i = 0; i < imageData.pixels.length; i += 4) {
    imageData.pixels[i] = 255;   // R
    imageData.pixels[i+1] = 100; // G
    imageData.pixels[i+2] = 50;  // B
    imageData.pixels[i+3] = 255; // A (opacity)
  }
  
  // Set up message handler
  imageWorker.onmessage = function(e) {
    const { status, processedPixels, timeElapsed } = e.data;
    
    if (status === 'complete') {
      // Update the image with processed data
      updateImageDisplay(processedPixels);
      console.log(\`Image processing completed in \${timeElapsed}ms\`);
    } else if (status === 'progress') {
      // Update progress indicator
      updateProgressBar(e.data.percentComplete);
    }
  };
  
  // Start the processing
  imageWorker.postMessage({
    command: 'process',
    imageData: imageData,
    filter: 'grayscale'
  });
  
  // Optional: cleanup function
  return function cleanup() {
    imageWorker.terminate();
  };
}

// image-processor.js (Worker file)
self.onmessage = function(e) {
  const { command, imageData, filter } = e.data;
  
  if (command === 'process') {
    const startTime = performance.now();
    
    // Get the pixel data
    const { width, height, pixels } = imageData;
    
    // Create a copy to work with
    const processedPixels = new Uint8ClampedArray(pixels.length);
    
    // Process the image
    if (filter === 'grayscale') {
      for (let i = 0; i < pixels.length; i += 4) {
        // Report progress at regular intervals
        if (i % (pixels.length / 10) === 0) {
          self.postMessage({
            status: 'progress',
            percentComplete: Math.round((i / pixels.length) * 100)
          });
        }
        
        // Apply grayscale algorithm
        const r = pixels[i];
        const g = pixels[i+1];
        const b = pixels[i+2];
        
        // Convert to grayscale
        const gray = 0.3 * r + 0.59 * g + 0.11 * b;
        
        processedPixels[i] = gray;
        processedPixels[i+1] = gray;
        processedPixels[i+2] = gray;
        processedPixels[i+3] = pixels[i+3]; // Keep original alpha
      }
    }
    
    // Calculate elapsed time
    const timeElapsed = performance.now() - startTime;
    
    // Send the processed data back
    self.postMessage({
      status: 'complete',
      processedPixels,
      timeElapsed
    });
  }
};

// 2. Worker with Transferable Objects
// ---------------------------------
// main.js
function processLargeArrayWithTransfer() {
  const worker = new Worker('array-processor.js');
  
  // Create large array
  const largeArray = new Float64Array(10000000); // 80MB
  
  // Fill with data
  for (let i = 0; i < largeArray.length; i++) {
    largeArray[i] = Math.random();
  }
  
  console.log('Original array size:', largeArray.byteLength);
  
  worker.onmessage = function(e) {
    console.log('Received result from worker:', e.data.resultStats);
    console.log('Original array after transfer:', 
                (largeArray.length === 0) ? 'Empty (transferred)' : 'Still available');
  };
  
  // Transfer ownership of the array buffer to the worker
  // This is faster and more memory efficient than copying
  worker.postMessage({ array: largeArray }, [largeArray.buffer]);
}

// array-processor.js
self.onmessage = function(e) {
  const { array } = e.data;
  
  console.log('Array received in worker:', array.length);
  
  // Perform calculations
  const sum = array.reduce((acc, val) => acc + val, 0);
  const average = sum / array.length;
  const min = Math.min(...array);
  const max = Math.max(...array);
  
  // Send results back
  self.postMessage({
    resultStats: {
      sum,
      average,
      min,
      max
    }
  });
};

// 3. Error Handling in Workers
// --------------------------
// main.js
function createWorkerWithErrorHandling() {
  const worker = new Worker('error-prone-worker.js');
  
  worker.onmessage = function(e) {
    console.log('Worker result:', e.data);
  };
  
  worker.onerror = function(error) {
    console.error('Worker error:', error.message);
    console.error('Line:', error.lineno);
    console.error('Filename:', error.filename);
    
    // Clean up the failed worker
    worker.terminate();
    
    // Start a new worker or handle the error
    handleWorkerFailure();
  };
  
  return worker;
}

// error-prone-worker.js
self.onmessage = function(e) {
  try {
    // Potentially problematic code
    const result = processData(e.data);
    self.postMessage(result);
  } catch (error) {
    // Log error in worker
    console.error('Error in worker:', error);
    
    // Send error to main thread
    self.postMessage({ error: error.message });
  }
};

function processData(data) {
  // This will throw if data.x doesn't exist
  return data.x.process();
}`,
          exercise: {
            instructions:
              'Create a web application that uses Web Workers to analyze large datasets without blocking the UI. Implement: 1) A main script that allows users to upload or generate large arrays of numbers, 2) A worker that performs statistical analysis (mean, median, mode, standard deviation), 3) Progress updates during processing, 4) Proper error handling, and 5) A visualization of the results using canvas or a charting library after the worker completes. Focus on implementing efficient data transfer between the main thread and worker.',
          },
        },
        {
          title: 'Advanced Worker Patterns',
          explanation: `
        <p>Beyond basic usage, Web Workers can be employed in sophisticated ways to solve complex performance and concurrency challenges.</p>
        
        <h4>Worker Pools</h4>
        <p>For applications that need to process multiple tasks concurrently, a worker pool can efficiently distribute work across multiple background threads.</p>
        <div class="code-example">
          <pre><code>// Worker Pool implementation
class WorkerPool {
  constructor(workerScript, numWorkers = navigator.hardwareConcurrency || 4) {
    this.workerScript = workerScript;
    this.numWorkers = numWorkers;
    this.workers = [];
    this.queue = [];
    this.activeWorkers = 0;
    
    // Create workers
    this.initialize();
  }
  
  initialize() {
    for (let i = 0; i < this.numWorkers; i++) {
      const worker = new Worker(this.workerScript);
      
      worker.onmessage = (event) => {
        // Handle response from worker
        const { taskId, result } = event.data;
        const task = this.queue.find(t => t.id === taskId);
        
        if (task && task.resolve) {
          task.resolve(result);
        }
        
        // Mark worker as free
        worker.busy = false;
        this.activeWorkers--;
        
        // Process next task in queue if any
        this.processQueue();
      };
      
      worker.onerror = (error) => {
        console.error(\`Worker error: \${error.message}\`);
        worker.busy = false;
        this.activeWorkers--;
        this.processQueue();
      };
      
      worker.busy = false;
      this.workers.push(worker);
    }
  }
  
  processQueue() {
    // Check if there are pending tasks and available workers
    if (this.queue.length === 0 || this.activeWorkers >= this.numWorkers) {
      return;
    }
    
    // Find a free worker
    const availableWorker = this.workers.find(w => !w.busy);
    if (!availableWorker) {
      return;
    }
    
    // Get next task
    const task = this.queue.shift();
    
    // Mark worker as busy
    availableWorker.busy = true;
    this.activeWorkers++;
    
    // Send task to worker
    availableWorker.postMessage({
      taskId: task.id,
      command: task.command,
      data: task.data
    });
  }
  
  addTask(command, data) {
    return new Promise((resolve, reject) => {
      const task = {
        id: Date.now() + Math.random(),
        command,
        data,
        resolve,
        reject
      };
      
      this.queue.push(task);
      this.processQueue();
    });
  }
  
  terminate() {
    this.workers.forEach(worker => worker.terminate());
    this.workers = [];
    this.queue = [];
    this.activeWorkers = 0;
  }
}

// Usage example
const pool = new WorkerPool('math-worker.js', 4);

// Add multiple tasks to the pool
for (let i = 0; i < 10; i++) {
  pool.addTask('factorize', { number: 1299827 * 1299821 + i })
    .then(result => console.log(\`Factorization result \${i}:\`, result))
    .catch(err => console.error(\`Task \${i} failed:\`, err));
}</code></pre>
        </div>
        
        <h4>Shared Workers</h4>
        <p>Shared Workers allow multiple browser contexts (windows, tabs, iframes) to communicate with the same worker instance, enabling efficient resource sharing.</p>
        <div class="code-example">
          <pre><code>// Main script in multiple tabs/windows
const sharedWorker = new SharedWorker('shared-counter.js');

// Set up communication port
sharedWorker.port.start();

// Send message to shared worker
function incrementCounter() {
  sharedWorker.port.postMessage({ command: 'increment' });
}

// Listen for messages
sharedWorker.port.onmessage = function(event) {
  document.getElementById('counter').textContent = event.data.count;
};

// Shared worker script (shared-counter.js)
let count = 0;
const ports = new Set();

// Connection event fires when a new client connects
self.onconnect = function(e) {
  const port = e.ports[0];
  ports.add(port);
  
  // Start the port
  port.start();
  
  // Send initial count
  port.postMessage({ count });
  
  // Handle messages from this port
  port.onmessage = function(event) {
    if (event.data.command === 'increment') {
      count++;
      
      // Broadcast to all connected ports
      broadcastCount();
    }
  };
  
  // Handle disconnection
  port.onclose = function() {
    ports.delete(port);
  };
};

function broadcastCount() {
  for (const port of ports) {
    port.postMessage({ count });
  }
}</code></pre>
        </div>
        
        <h4>Module Workers</h4>
        <p>Modern browsers support creating workers from JavaScript modules, allowing for better code organization and the use of ES modules in worker contexts.</p>
        <div class="code-example">
          <pre><code>// Creating a module worker
const moduleWorker = new Worker('./worker.js', {
  type: 'module'
});

// Module worker script (worker.js)
import { calculatePi } from './math-utils.js';
import { formatResult } from './formatting.js';

self.onmessage = async function(e) {
  const { precision } = e.data;
  
  // Use imported functions
  const piValue = calculatePi(precision);
  const formattedResult = formatResult(piValue, precision);
  
  self.postMessage({ result: formattedResult });
};</code></pre>
        </div>
        
        <div class="interview-tip">
          <p><span class="interview-icon">🎯</span> <strong>Interview Focus:</strong> Advanced worker patterns demonstrate your ability to build sophisticated concurrent applications.</p>
          <p>Key points to understand:</p>
          <ul>
            <li>How to implement worker pools for task distribution</li>
            <li>Communication patterns between multiple workers</li>
            <li>Shared state management in Web Worker contexts</li>
            <li>Performance considerations for different worker types</li>
            <li>Modern approaches like module workers and worker threads</li>
          </ul>
        </div>
      `,
          codeExample: `// Advanced Web Worker Patterns

// 1. Inline Worker Creation (No External Files)
// ------------------------------------------
function createInlineWorker(fn) {
  // Convert the function to a string
  const fnString = fn.toString();
  
  // Create a blob with worker code
  const blob = new Blob(
    [\`self.onmessage = \${fnString}\`], 
    { type: 'application/javascript' }
  );
  
  // Create URL for the blob
  const blobURL = URL.createObjectURL(blob);
  
  // Create worker from the blob URL
  const worker = new Worker(blobURL);
  
  // Clean up the URL when done
  worker.onerror = () => URL.revokeObjectURL(blobURL);
  worker._terminate = worker.terminate;
  worker.terminate = () => {
    URL.revokeObjectURL(blobURL);
    worker._terminate();
  };
  
  return worker;
}

// Usage
const worker = createInlineWorker(function(e) {
  const { numbers } = e.data;
  const sum = numbers.reduce((a, b) => a + b, 0);
  self.postMessage({ result: sum });
});

worker.postMessage({ numbers: [1, 2, 3, 4, 5] });
worker.onmessage = (e) => console.log('Result:', e.data.result);

// 2. Parallel Task Runner with Promises
// ----------------------------------
class ParallelTaskRunner {
  constructor(maxWorkers = navigator.hardwareConcurrency || 4) {
    this.maxWorkers = maxWorkers;
    this.taskQueue = [];
    this.activeWorkers = 0;
  }
  
  run(taskFn, data) {
    return new Promise((resolve, reject) => {
      // Add task to queue
      this.taskQueue.push({
        taskFn,
        data,
        resolve,
        reject
      });
      
      this.processQueue();
    });
  }
  
  processQueue() {
    if (this.taskQueue.length === 0 || this.activeWorkers >= this.maxWorkers) {
      return;
    }
    
    // Get next task
    const task = this.taskQueue.shift();
    this.activeWorkers++;
    
    // Create inline worker for this task
    const worker = this.createWorkerFromFunction(task.taskFn);
    
    // Set up handlers
    worker.onmessage = (e) => {
      task.resolve(e.data);
      worker.terminate();
      this.activeWorkers--;
      this.processQueue();
    };
    
    worker.onerror = (error) => {
      task.reject(new Error(\`Worker error: \${error.message}\`));
      worker.terminate();
      this.activeWorkers--;
      this.processQueue();
    };
    
    // Start task
    worker.postMessage(task.data);
  }
  
  createWorkerFromFunction(fn) {
    const fnString = fn.toString();
    const blob = new Blob(
      [\`self.onmessage = \${fnString}\`],
      { type: 'application/javascript' }
    );
    const blobURL = URL.createObjectURL(blob);
    const worker = new Worker(blobURL);
    
    worker._terminate = worker.terminate;
    worker.terminate = () => {
      URL.revokeObjectURL(blobURL);
      worker._terminate();
    };
    
    return worker;
  }
}

// Usage
const runner = new ParallelTaskRunner();

// Define a computation to be executed in workers
function computeTask(e) {
  const { array, operation } = e.data;
  
  let result;
  switch (operation) {
    case 'sum':
      result = array.reduce((sum, val) => sum + val, 0);
      break;
    case 'average':
      result = array.reduce((sum, val) => sum + val, 0) / array.length;
      break;
    case 'max':
      result = Math.max(...array);
      break;
    default:
      throw new Error(\`Unknown operation: \${operation}\`);
  }
  
  self.postMessage(result);
}

// Create some large arrays
const arrays = Array.from({ length: 8 }, () =>
  Array.from({ length: 1000000 }, () => Math.random() * 100)
);

// Process arrays in parallel
Promise.all([
  runner.run(computeTask, { array: arrays[0], operation: 'sum' }),
  runner.run(computeTask, { array: arrays[1], operation: 'average' }),
  runner.run(computeTask, { array: arrays[2], operation: 'max' }),
  runner.run(computeTask, { array: arrays[3], operation: 'sum' }),
  runner.run(computeTask, { array: arrays[4], operation: 'average' }),
  runner.run(computeTask, { array: arrays[5], operation: 'max' }),
  runner.run(computeTask, { array: arrays[6], operation: 'sum' }),
  runner.run(computeTask, { array: arrays[7], operation: 'average' })
])
.then(results => {
  console.log('All parallel tasks completed:', results);
})
.catch(error => {
  console.error('One or more tasks failed:', error);
});

// 3. Worker with Streaming Data
// --------------------------
function createStreamingWorker() {
  const workerCode = \`
    // Track chunks received
    let chunks = [];
    let totalSize = 0;
    
    self.onmessage = function(e) {
      const { type, data } = e.data;
      
      if (type === 'chunk') {
        // Add new chunk to our collection
        chunks.push(data);
        totalSize += data.length;
        
        // Report progress
        self.postMessage({
          type: 'progress',
          processed: chunks.length,
          totalSize
        });
      }
      else if (type === 'complete') {
        // Process all chunks together
        const fullArray = new Uint8Array(totalSize);
        let offset = 0;
        
        for (const chunk of chunks) {
          fullArray.set(chunk, offset);
          offset += chunk.length;
        }
        
        // Process the full data (e.g., parse JSON)
        const jsonString = new TextDecoder().decode(fullArray);
        const parsedData = JSON.parse(jsonString);
        
        // Perform analysis on the complete data
        const analysis = analyzeData(parsedData);
        
        // Send result back to main thread
        self.postMessage({
          type: 'result',
          analysis
        });
        
        // Clean up
        chunks = [];
        totalSize = 0;
      }
    };
    
    function analyzeData(data) {
      // Perform CPU-intensive analysis
      const result = {
        count: data.length,
        categories: {},
        summary: {}
      };
      
      // Group and analyze data
      for (const item of data) {
        // Group by category
        if (!result.categories[item.category]) {
          result.categories[item.category] = 0;
        }
        result.categories[item.category]++;
        
        // Calculate totals
        if (!result.summary.total) {
          result.summary.total = 0;
        }
        result.summary.total += item.value;
      }
      
      return result;
    }
  \`;
  
  const blob = new Blob([workerCode], { type: 'application/javascript' });
  const blobURL = URL.createObjectURL(blob);
  return new Worker(blobURL);
}

// Usage
async function processLargeJSONFile(file) {
  const worker = createStreamingWorker();
  const chunkSize = 1024 * 1024; // 1MB chunks
  
  worker.onmessage = function(e) {
    const { type, processed, totalSize, analysis } = e.data;
    
    if (type === 'progress') {
      updateProgressBar(processed, Math.ceil(file.size / chunkSize));
    }
    else if (type === 'result') {
      displayResults(analysis);
      worker.terminate();
    }
  };
  
  // Read and send file in chunks
  const reader = file.stream().getReader();
  let done, value;
  let chunkCounter = 0;
  
  while (true) {
    ({ done, value } = await reader.read());
    
    if (done) {
      worker.postMessage({ type: 'complete' });
      break;
    }
    
    worker.postMessage({ 
      type: 'chunk', 
      data: value
    });
    
    chunkCounter++;
  }
}`,
          exercise: {
            instructions:
              'Implement a distributed image processing application using advanced worker patterns. Create: 1) A worker pool that distributes image chunks to multiple workers for parallel processing, 2) A system for applying different filters (grayscale, blur, sharpen, etc.) to images, 3) A mechanism to recombine the processed chunks into a complete image, 4) Progress tracking and visualization, and 5) Error handling with worker replacement if a worker fails. Focus on maximizing performance through proper parallel processing.',
          },
        },
      ],
      prepperSummary: `
    <div class="prepper-summary">
      <h3>🔑 Key Interview Takeaways</h3>
      <ul>
        <li><strong>Background Processing:</strong> Web Workers enable running JavaScript code in background threads, keeping the main UI thread responsive during heavy computations.</li>
        
        <li><strong>Worker Types:</strong> Dedicated Workers are tied to their creator, Shared Workers can connect to multiple scripts, and Service Workers act as network proxies for offline capabilities.</li>
        
        <li><strong>Message Passing:</strong> Workers communicate with the main thread through a messaging system (postMessage/onmessage) for sending data, commands, and results.</li>
        
        <li><strong>Transferable Objects:</strong> Large data structures can be transferred between threads without copying using Transferable Objects, improving performance for large datasets.</li>
        
        <li><strong>Advanced Patterns:</strong> Worker pools, inline workers, and streaming data patterns can be implemented for sophisticated concurrent processing needs.</li>
      </ul>
      
      <h4>📝 Common Interview Questions</h4>
      <ol>
        <li>"When would you use Web Workers in a web application?"</li>
        <li>"How do Web Workers communicate with the main thread?"</li>
        <li>"What are the limitations of Web Workers?"</li>
        <li>"How would you implement a worker pool for processing multiple tasks?"</li>
        <li>"What's the difference between Dedicated Workers and Shared Workers?"</li>
      </ol>
    </div>
  `,
    },

    {
      title: 'Memory Management',
      description:
        'Learn how JavaScript manages memory and techniques to prevent memory leaks in applications.',
      sections: [
        {
          title: 'JavaScript Memory Model',
          explanation: `
        <p>Understanding how JavaScript allocates and manages memory is essential for building efficient and stable applications, especially for long-running apps and complex SPAs.</p>
        
        <h4>Memory Allocation in JavaScript</h4>
        <p>JavaScript automatically allocates memory when objects are created and frees it when they're no longer needed through a process called garbage collection.</p>
        <div class="code-example">
          <pre><code>// Memory allocation happens automatically
let number = 123;         // Allocates memory for a number
let string = 'Hello';     // Allocates memory for a string
let object = { a: 1 };    // Allocates memory for an object and its contents
let array = [1, 2, 3];    // Allocates memory for an array and its contents

// Functions also allocate memory
function createObject() {
  return { value: Math.random() };  // New object allocated on each call
}

// The result of the function gets allocated memory
let result = createObject();</code></pre>
        </div>
        
        <h4>Garbage Collection</h4>
        <p>JavaScript's garbage collector automatically reclaims memory that's no longer reachable through the application's object graph.</p>
        <div class="code-example">
          <pre><code>// Example of how garbage collection works
function process() {
  // tempObj is created
  const tempObj = { data: 'some data', size: 1024 };
  
  // Use tempObj
  doSomething(tempObj);
  
  // No explicit deletion needed
  // tempObj will be garbage collected after process() completes
  // because it's no longer reachable
}

// Objects can become eligible for garbage collection when:
// 1. They go out of scope
// 2. References are explicitly nullified
// 3. They're no longer reachable from root objects</code></pre>
        </div>
        
        <h4>Memory Life Cycle</h4>
        <p>Memory in JavaScript programs follows a predictable life cycle of allocation, use, and release.</p>
        <ol>
          <li><strong>Allocation:</strong> JavaScript allocates memory for new values</li>
          <li><strong>Use:</strong> Program reads from and writes to allocated memory</li>
          <li><strong>Release:</strong> Memory is freed when no longer needed</li>
        </ol>
        
        <div class="interview-tip">
          <p><span class="interview-icon">🎯</span> <strong>Interview Focus:</strong> Understanding memory management demonstrates your ability to build performant, stable applications.</p>
          <p>Key points to understand:</p>
          <ul>
            <li>How JavaScript's automatic memory management works</li>
            <li>The difference between stack and heap memory</li>
            <li>What makes an object eligible for garbage collection</li>
            <li>Common garbage collection algorithms (mark-and-sweep, reference counting)</li>
            <li>The performance implications of garbage collection</li>
          </ul>
        </div>
      `,
          codeExample: `// JavaScript Memory Model Examples

// 1. Stack vs. Heap Memory
// ----------------------
// Stack memory: primitive types and references
function stackExample() {
  // These are stored on the stack
  let number = 42;         // Number - primitive
  let string = 'hello';    // String - primitive
  let boolean = true;      // Boolean - primitive
  let nullValue = null;    // Null - primitive
  let undefinedValue;      // Undefined - primitive
  
  // The variable is on the stack, but the object itself is on the heap
  let obj = { name: 'John' };  // Only the reference is on the stack
  
  function innerFunction() {
    // Local variables are also stored on the stack
    let innerVariable = 100;
    
    // Once this function returns, innerVariable is popped off the stack
    return innerVariable;
  }
  
  return innerFunction();
  // After this function returns, all its local variables are removed from the stack
}

// 2. Object References and Garbage Collection
// ----------------------------------------
function createObjects() {
  // This object will be garbage collected after the function ends
  let tempObject = { name: 'Temporary' };
  
  // This object will survive garbage collection
  window.globalObject = { name: 'Global' };
  
  // This object has a closure reference and will be retained
  let value = 'Captured';
  function closure() {
    return value;
  }
  
  return closure;
}

let returnedClosure = createObjects();

// At this point:
// - tempObject is eligible for garbage collection
// - globalObject is reachable through window and won't be collected
// - 'value' is still referenced by the returned closure and won't be collected

// 3. Memory Lifecycle with Objects
// -----------------------------
function memoryLifecycle() {
  // 1. Allocation
  const person = {
    name: 'Alice',
    age: 30,
    hobbies: ['reading', 'cycling']
  };
  
  // 2. Use
  console.log(person.name);
  person.age += 1;
  person.hobbies.push('swimming');
  
  // 3. Release (automatic when no longer reachable)
  // This happens automatically when the function exits and 'person' goes out of scope
}

// 4. Reference Graph and Reachability
// --------------------------------
function createObjectGraph() {
  // Create object network
  const root = {
    name: 'Root Object',
    children: []
  };
  
  // Create connected objects
  for (let i = 0; i < 3; i++) {
    const child = {
      name: \`Child \${i}\`,
      parent: root
    };
    root.children.push(child);
  }
  
  // Create detached objects that will be garbage collected
  for (let i = 0; i < 3; i++) {
    const orphan = {
      name: \`Orphan \${i}\`
    };
    // No references kept to these objects
  }
  
  return root;
}

const objectGraph = createObjectGraph();

// At this point:
// - The root object and its children are reachable and won't be collected
// - The orphan objects are unreachable and will be garbage collected

// 5. Generational Garbage Collection (Conceptual)
// -------------------------------------------
// Modern JS engines use generational garbage collection
// based on the observation that most objects die young

function generationalExample() {
  // Young generation (nursery)
  function createTemporaryObjects() {
    // These short-lived objects are allocated in the young generation
    const array = [];
    for (let i = 0; i < 1000; i++) {
      array.push({ index: i, data: \`Item \${i}\` });
    }
    
    // Process the array
    const filtered = array.filter(item => item.index % 2 === 0);
    
    // Return only a small subset
    return filtered.slice(0, 10);
  }
  
  // The returned objects survive and may be promoted to the old generation
  const survivors = createTemporaryObjects();
  
  // These long-lived objects may be directly allocated in the old generation
  const applicationState = {
    user: { id: 1, name: 'User' },
    preferences: { theme: 'dark', fontSize: 14 },
    cache: new Map()
  };
  
  return { survivors, applicationState };
}`,
          exercise: {
            instructions:
              'Create a memory-intensive application and implement proper memory management techniques. The application should: 1) Generate and process large arrays of data, 2) Implement a cache with size limits and eviction policies, 3) Properly clean up event listeners and timers, 4) Include utilities to monitor memory usage, and 5) Demonstrate techniques to minimize memory consumption for long-running operations. Include comments explaining your memory management decisions.',
          },
        },
        {
          title: 'Memory Leaks',
          explanation: `
        <p>Memory leaks occur when memory that is no longer needed is not released, causing an application to consume more and more resources over time.</p>
        
        <h4>Common Causes of Memory Leaks</h4>
        <p>Several JavaScript programming patterns can inadvertently cause memory leaks if not handled properly.</p>
        <div class="code-example">
          <pre><code>// 1. Accidental global variables
function leakyFunction() {
  // Missing 'let', 'const', or 'var' creates a global variable
  oops = { data: 'large object' };
}

// 2. Forgotten timers
function startTimer() {
  // This timer keeps references to the function and potentially its scope
  const timer = setInterval(() => {
    // Process data
    console.log('Processing...');
  }, 1000);
  
  // ❌ No way to clear the timer
  // ✅ Should store timer ID and clear it when done:
  // return timer; // So it can be cleared with clearInterval(timer)
}

// 3. Closures holding references
function createLargeClosure() {
  const largeData = new Array(10000).fill('data');
  
  // Function retains reference to largeData even if it's not used
  return function() {
    console.log('Closure function');
    // largeData is still referenced here, preventing garbage collection
  };
}

// 4. Detached DOM references
function setupUI() {
  // Store reference to DOM node
  const button = document.getElementById('myButton');
  
  // Reference to the node still exists even if removed from DOM
  button.addEventListener('click', () => {
    document.body.removeChild(button);
    // ❌ button reference is still kept in this closure
    // and the event handler is still attached
  });
}</code></pre>
        </div>
        
        <h4>Detecting Memory Leaks</h4>
        <p>Modern browsers provide tools to help identify and diagnose memory issues in web applications.</p>
        <ul>
          <li><strong>Chrome DevTools:</strong> Memory and Performance tabs</li>
          <li><strong>Heap Snapshots:</strong> Capture and compare memory state over time</li>
          <li><strong>Performance Monitoring:</strong> Observe memory growth during usage</li>
          <li><strong>Memory Allocation Profiling:</strong> Track where objects are created</li>
        </ul>
        
        <h4>Preventing Memory Leaks</h4>
        <p>Adopting good practices can help prevent most common memory leak scenarios.</p>
        <div class="code-example">
          <pre><code>// 1. Always declare variables properly
function properDeclaration() {
  // Use let or const for local variables
  const localData = { value: 'data' };
}

// 2. Clear timers when they're no longer needed
function managedTimer() {
  const data = { value: 'data' };
  
  const timerId = setInterval(() => {
    console.log(data.value);
  }, 1000);
  
  // Return function to stop the timer
  return function stopTimer() {
    clearInterval(timerId);
  };
}

// 3. Be mindful of closures
function efficientClosure() {
  const necessaryData = 'small data';
  const largeData = new Array(10000).fill('data');
  
  // Process large data inside function
  processData(largeData);
  
  // Only capture what's needed in closure
  return function() {
    return necessaryData;
  };
  // largeData will be garbage collected
}

// 4. Properly handle DOM elements and events
function cleanupDOM() {
  const button = document.getElementById('myButton');
  
  // Store handler function separately to be able to remove it
  const clickHandler = () => {
    console.log('Button clicked');
  };
  
  button.addEventListener('click', clickHandler);
  
  // Cleanup function
  return function removeListeners() {
    button.removeEventListener('click', clickHandler);
  };
}</code></pre>
        </div>
        
        <div class="interview-tip">
          <p><span class="interview-icon">🎯</span> <strong>Interview Focus:</strong> Understanding memory leaks demonstrates your ability to build reliable long-running applications.</p>
          <p>Key points to understand:</p>
          <ul>
            <li>Common causes of memory leaks in JavaScript</li>
            <li>How to detect memory leaks using browser tools</li>
            <li>Techniques to prevent leaks in different scenarios</li>
            <li>The impact of leaks on application performance</li>
            <li>Memory optimization for single-page applications</li>
          </ul>
        </div>
      `,
          codeExample: `// Memory Leak Prevention Patterns

// 1. Event Listener Cleanup
// -----------------------
class ComponentWithEvents {
  constructor(elementId) {
    this.element = document.getElementById(elementId);
    this.data = new Array(10000).fill('large data');
    
    // Store handler references to be able to remove them
    this.clickHandler = this.handleClick.bind(this);
    this.scrollHandler = this.handleScroll.bind(this);
    
    // Add event listeners
    this.element.addEventListener('click', this.clickHandler);
    window.addEventListener('scroll', this.scrollHandler);
  }
  
  handleClick() {
    console.log('Element clicked', this.data.length);
  }
  
  handleScroll() {
    console.log('Window scrolled', this.data.length);
  }
  
  // Cleanup method to prevent memory leaks
  destroy() {
    // Remove event listeners
    this.element.removeEventListener('click', this.clickHandler);
    window.addEventListener('scroll', this.scrollHandler);
    
    // Clear references
    this.element = null;
    this.data = null;
  }
}

// Usage
const component = new ComponentWithEvents('myElement');

// Later when component is no longer needed
component.destroy();

// 2. Managing Timers
// ---------------
class DataPoller {
  constructor(url, interval = 5000) {
    this.url = url;
    this.interval = interval;
    this.isPolling = false;
    this.timerId = null;
    this.cache = new Map();
  }
  
  start() {
    if (this.isPolling) return;
    
    this.isPolling = true;
    this.poll();
    
    // Store timer ID for cleanup
    this.timerId = setInterval(() => {
      this.poll();
    }, this.interval);
  }
  
  async poll() {
    try {
      const response = await fetch(this.url);
      const data = await response.json();
      this.cache.set('lastResponse', data);
    } catch (error) {
      console.error('Polling error:', error);
    }
  }
  
  stop() {
    if (!this.isPolling) return;
    
    // Clear timer
    clearInterval(this.timerId);
    this.timerId = null;
    this.isPolling = false;
    
    // Clear cache to free memory
    this.cache.clear();
  }
}

// 3. Weak References
// ---------------
// Use WeakMap and WeakSet for caches when references should not prevent garbage collection
class DOMCache {
  constructor() {
    // Use WeakMap to allow element references to be garbage collected
    // when they're removed from the DOM
    this.elementData = new WeakMap();
    
    // WeakSet doesn't prevent its elements from being garbage collected
    this.processedElements = new WeakSet();
  }
  
  // Store data for a DOM element
  setData(element, data) {
    this.elementData.set(element, data);
    this.processedElements.add(element);
  }
  
  // Get data for a DOM element
  getData(element) {
    return this.elementData.get(element);
  }
  
  // Check if element was processed
  wasProcessed(element) {
    return this.processedElements.has(element);
  }
  
  // No explicit cleanup needed - when elements are removed from DOM
  // and have no other references, they'll be garbage collected
  // along with their associated data in the WeakMap
}

// 4. Avoiding Closure Memory Leaks
// -----------------------------
// Factory that avoids capturing unnecessary references
function createProcessor(config) {
  // Destructure only what's needed to avoid capturing the entire config object
  const { processorName, maxItems } = config;
  
  // Create a new closure that only captures what it needs
  return function processItems(items) {
    // Create a local copy rather than referencing the input array
    const workingSet = items.slice(0, maxItems);
    
    console.log(\`\${processorName} processing \${workingSet.length} items\`);
    
    // Process items
    return workingSet.map(item => ({
      id: item.id,
      processed: true,
      timestamp: Date.now()
    }));
  };
}

// Usage
const hugeConfig = {
  processorName: 'ItemProcessor',
  maxItems: 100,
  // Imagine lots of other properties with large data
  hugeData: new Array(10000).fill('large configuration data')
};

// This function only captures processorName and maxItems, not hugeData
const processor = createProcessor(hugeConfig);

// 5. Memory-conscious Collection Handling
// ------------------------------------
class MemoryEfficientList {
  constructor(maxSize = 1000) {
    this.maxSize = maxSize;
    this.items = [];
  }
  
  addItem(item) {
    // Add new item
    this.items.push(item);
    
    // If we exceed max size, remove oldest items
    if (this.items.length > this.maxSize) {
      this.items.splice(0, this.items.length - this.maxSize);
    }
    
    return this.items.length;
  }
  
  // Process items in chunks to avoid memory spikes
  processItems(chunkSize = 100, processFn) {
    const results = [];
    
    for (let i = 0; i < this.items.length; i += chunkSize) {
      // Process one chunk at a time
      const chunk = this.items.slice(i, i + chunkSize);
      const chunkResults = chunk.map(processFn);
      
      // Collect results
      results.push(...chunkResults);
      
      // Allow garbage collection between chunks by waiting for next tick
      if (i + chunkSize < this.items.length) {
        setTimeout(() => {
          this.processItems(chunkSize, processFn, i + chunkSize, results);
        }, 0);
        
        // Return partial results for this invocation
        return 'Processing in chunks...';
      }
    }
    
    return results;
  }
  
  clear() {
    // Release all references
    this.items = [];
  }
}`,
          exercise: {
            instructions:
              'Create a single-page application component that demonstrates advanced memory management techniques. Implement: 1) A data grid that efficiently renders large datasets using virtualization, 2) A caching system using WeakMap for DOM elements that automatically cleans up when elements are removed, 3) An image carousel that properly disposes of resources when images are no longer visible, 4) Event handlers that use efficient delegation patterns and proper cleanup, and 5) A memory leak detection utility that can warn developers about potential issues.',
          },
        },
      ],
      prepperSummary: `
    <div class="prepper-summary">
      <h3>🔑 Key Interview Takeaways</h3>
      <ul>
        <li><strong>Memory Model:</strong> JavaScript uses automatic memory management with garbage collection to reclaim memory from objects that are no longer reachable.</li>
        
        <li><strong>Memory Life Cycle:</strong> Memory follows an allocation, use, and release pattern, with garbage collection handling the release phase automatically.</li>
        
        <li><strong>Common Leaks:</strong> Memory leaks typically result from accidental global variables, forgotten timers, closures holding references, and detached DOM elements.</li>
        
        <li><strong>Prevention:</strong> Proper variable declarations, clearing timers and event listeners, mindful closure usage, and weak references help prevent memory leaks.</li>
        
        <li><strong>Detection:</strong> Modern browsers provide tools like heap snapshots and performance profiles to identify memory issues in JavaScript applications.</li>
      </ul>
      
      <h4>📝 Common Interview Questions</h4>
      <ol>
        <li>"How does JavaScript's garbage collection work?"</li>
        <li>"What are common causes of memory leaks in JavaScript applications?"</li>
        <li>"How would you detect and fix a memory leak in a single-page application?"</li>
        <li>"When would you use WeakMap or WeakSet instead of Map or Set?"</li>
        <li>"How can closures lead to memory leaks and how can you prevent them?"</li>
      </ol>
    </div>
  `,
    },

    {
      title: 'TypeScript Basics',
      description:
        'Learn the fundamentals of TypeScript to add static typing to your JavaScript applications.',
      sections: [
        {
          title: 'TypeScript Fundamentals',
          explanation: `
        <p>TypeScript is a superset of JavaScript that adds static typing and additional features to help build more robust applications, especially at scale.</p>
        
        <h4>Basic Types</h4>
        <p>TypeScript introduces a type system that helps catch errors during development rather than at runtime.</p>
        <div class="code-example">
          <pre><code>// Basic type annotations
let isDone: boolean = false;
let decimal: number = 6;
let color: string = "blue";
let list: number[] = [1, 2, 3];
let tuple: [string, number] = ["hello", 10];

// Enums
enum Color {Red, Green, Blue}
let c: Color = Color.Green;

// Any type (for dynamic values)
let notSure: any = 4;
notSure = "maybe a string";
notSure = false;

// Void (for functions with no return value)
function warnUser(): void {
  console.log("Warning message");
}

// Null and undefined
let u: undefined = undefined;
let n: null = null;

// Never (for functions that never return)
function error(message: string): never {
  throw new Error(message);
}

// Type assertions (type casting)
let someValue: any = "this is a string";
let strLength: number = (someValue as string).length;</code></pre>
        </div>
        
        <h4>Interfaces</h4>
        <p>Interfaces define contracts for object shapes in TypeScript, making code more predictable and self-documenting.</p>
        <div class="code-example">
          <pre><code>// Interface definition
interface User {
  id: number;
  name: string;
  email: string;
  age?: number; // Optional property
  readonly createdAt: Date; // Can't be modified after creation
}

// Using an interface
function createUser(userData: User): User {
  return {
    ...userData,
    createdAt: new Date()
  };
}

// Implementing interfaces with classes
interface Printable {
  print(): void;
}

class Invoice implements Printable {
  constructor(private amount: number) {}
  
  print(): void {
    console.log(\`Invoice amount: $\${this.amount}\`);
  }
}

// Interface extending other interfaces
interface Employee extends User {
  department: string;
  salary: number;
}</code></pre>
        </div>
        
        <h4>Functions in TypeScript</h4>
        <p>TypeScript enables precise typing for function parameters and return values.</p>
        <div class="code-example">
          <pre><code>// Function with type annotations
function add(a: number, b: number): number {
  return a + b;
}

// Function with optional parameters
function buildName(firstName: string, lastName?: string): string {
  return lastName ? \`\${firstName} \${lastName}\` : firstName;
}

// Function with default parameters
function greeting(name: string = "Anonymous"): string {
  return \`Hello, \${name}\`;
}

// Rest parameters
function sum(...numbers: number[]): number {
  return numbers.reduce((total, n) => total + n, 0);
}

// Function types
type MathOperation = (x: number, y: number) => number;
const multiply: MathOperation = (a, b) => a * b;

// Function overloads
function process(x: number): number;
function process(x: string): string;
function process(x: any): any {
  if (typeof x === "number") {
    return x * x;
  } else {
    return x.toUpperCase();
  }
}</code></pre>
        </div>
        
        <div class="interview-tip">
          <p><span class="interview-icon">🎯</span> <strong>Interview Focus:</strong> Understanding TypeScript demonstrates your ability to write more robust and maintainable code.</p>
          <p>Key points to understand:</p>
          <ul>
            <li>The benefits of static typing over dynamic typing</li>
            <li>How to define and use interfaces for object shapes</li>
            <li>Function types and type annotations</li>
            <li>TypeScript's type inference capabilities</li>
            <li>How TypeScript integrates with JavaScript ecosystems</li>
          </ul>
        </div>
      `,
          codeExample: `// TypeScript Fundamentals

// 1. Basic Types and Type Inference
// -------------------------------
// Explicit type annotations
const id: number = 123;
const username: string = 'johndoe';
const isActive: boolean = true;
const values: number[] = [1, 2, 3, 4];
const coordinates: [number, number] = [10, 20]; // Tuple

// Type inference (TypeScript can infer types automatically)
let counter = 0; // inferred as number
let message = 'Hello'; // inferred as string
let items = [1, 2, 3]; // inferred as number[]

// Union types
let userId: string | number = 123;
userId = 'user-123'; // Also valid

// Literal types
let direction: 'north' | 'south' | 'east' | 'west';
direction = 'north'; // Valid
// direction = 'up'; // Error: Type '"up"' is not assignable to type...

// Type aliases
type Point = {
  x: number;
  y: number;
};

type ID = string | number;

// Using type aliases
const point: Point = { x: 10, y: 20 };
const productId: ID = 'prod-123';

// 2. Interfaces
// -----------
// Basic interface
interface User {
  id: ID;
  name: string;
  email: string;
  age?: number; // Optional property
  readonly createdAt: Date; // Can only be set during creation
}

// Interface with method definitions
interface Repository<T> {
  getAll(): T[];
  getById(id: ID): T | undefined;
  save(item: T): void;
  delete(id: ID): boolean;
}

// Implementing an interface
class UserRepository implements Repository<User> {
  private users: User[] = [];
  
  getAll(): User[] {
    return [...this.users]; // Return copy to prevent modification
  }
  
  getById(id: ID): User | undefined {
    return this.users.find(user => user.id === id);
  }
  
  save(user: User): void {
    const index = this.users.findIndex(u => u.id === user.id);
    if (index >= 0) {
      this.users[index] = { ...user };
    } else {
      this.users.push({ ...user });
    }
  }
  
  delete(id: ID): boolean {
    const initialLength = this.users.length;
    this.users = this.users.filter(user => user.id !== id);
    return initialLength !== this.users.length;
  }
}

// Interface extension
interface Employee extends User {
  department: string;
  hireDate: Date;
  salary: number;
}

// 3. Functions
// ----------
// Function with parameter and return type annotations
function calculateTax(income: number, taxRate: number): number {
  return income * taxRate;
}

// Arrow function with type annotations
const formatCurrency = (amount: number, currency: string = 'USD'): string => {
  return \`\${amount.toFixed(2)} \${currency}\`;
};

// Function type definition
type MathOperation = (a: number, b: number) => number;

// Functions that implement the type
const add: MathOperation = (a, b) => a + b;
const subtract: MathOperation = (a, b) => a - b;

// Generic function
function firstElement<T>(array: T[]): T | undefined {
  return array.length > 0 ? array[0] : undefined;
}

const first = firstElement([1, 2, 3]); // Type inferred as number
const firstStr = firstElement(['a', 'b', 'c']); // Type inferred as string

// Function overloads
function parseValue(value: string): string[];
function parseValue(value: number): number;
function parseValue(value: boolean): string;
function parseValue(value: string | number | boolean): string[] | number | string {
  if (typeof value === 'string') {
    return value.split('');
  } else if (typeof value === 'number') {
    return value * 2;
  } else {
    return value ? 'true' : 'false';
  }
}

// 4. Classes with TypeScript
// -----------------------
class Product {
  // Property declarations with access modifiers
  readonly id: string;
  name: string;
  private _price: number;
  protected category: string;
  
  // Constructor with parameter properties
  constructor(
    id: string,
    name: string,
    price: number,
    category: string = 'Uncategorized'
  ) {
    this.id = id;
    this.name = name;
    this._price = price;
    this.category = category;
  }
  
  // Getter and setter
  get price(): number {
    return this._price;
  }
  
  set price(newPrice: number) {
    if (newPrice < 0) {
      throw new Error('Price cannot be negative');
    }
    this._price = newPrice;
  }
  
  // Method
  applyDiscount(percentage: number): void {
    const discount = this._price * (percentage / 100);
    this._price -= discount;
  }
  
  // Static method
  static createEmpty(): Product {
    return new Product('0', 'Empty Product', 0);
  }
}

// Class inheritance
class DigitalProduct extends Product {
  downloadLink: string;
  
  constructor(
    id: string,
    name: string,
    price: number,
    downloadLink: string
  ) {
    super(id, name, price, 'Digital');
    this.downloadLink = downloadLink;
  }
  
  // Override parent method
  applyDiscount(percentage: number): void {
    // Digital products get an extra 5% off
    super.applyDiscount(percentage + 5);
  }
}`,
          exercise: {
            instructions:
              'Create a TypeScript-based task management application that demonstrates strong typing. Implement: 1) Interfaces for Task, User, and Project entities with appropriate properties and methods, 2) Classes that implement these interfaces with proper access modifiers, 3) Generic types for collections and repositories, 4) Function types for callbacks and event handlers, 5) Union and intersection types for complex scenarios. Include type guards and type assertions where appropriate.',
          },
        },
        {
          title: 'Advanced TypeScript Features',
          explanation: `
        <p>TypeScript offers advanced typing features that enable more powerful static analysis and code generation.</p>
        
        <h4>Generics</h4>
        <p>Generics allow the creation of reusable components that can work with a variety of types rather than a single one.</p>
        <div class="code-example">
          <pre><code>// Generic function
function identity<T>(arg: T): T {
  return arg;
}

// Using the generic function
let output1 = identity<string>("myString");
let output2 = identity(123); // Type inference works here

// Generic interface
interface GenericResponse<T> {
  data: T;
  status: number;
  message: string;
  timestamp: Date;
}

// Using generic interface
type User = { id: number, name: string };
const response: GenericResponse<User> = {
  data: { id: 1, name: "John" },
  status: 200,
  message: "Success",
  timestamp: new Date()
};

// Generic classes
class Queue<T> {
  private items: T[] = [];
  
  enqueue(item: T): void {
    this.items.push(item);
  }
  
  dequeue(): T | undefined {
    return this.items.shift();
  }
  
  peek(): T | undefined {
    return this.items[0];
  }
}

// Using generic class
const numberQueue = new Queue<number>();
numberQueue.enqueue(1);

const stringQueue = new Queue<string>();
stringQueue.enqueue("hello");</code></pre>
        </div>
        
        <h4>Type Guards and Type Assertions</h4>
        <p>TypeScript provides ways to narrow types within conditional blocks and assert types when needed.</p>
        <div class="code-example">
          <pre><code>// Type guards with typeof
function processValue(value: string | number) {
  if (typeof value === "string") {
    // TypeScript knows value is a string here
    return value.toUpperCase();
  } else {
    // TypeScript knows value is a number here
    return value.toFixed(2);
  }
}

// Type guards with instanceof
class Animal {
  move() { console.log("Moving..."); }
}

class Dog extends Animal {
  bark() { console.log("Woof!"); }
}

function makeSound(animal: Animal) {
  animal.move();
  
  if (animal instanceof Dog) {
    // TypeScript knows animal is Dog here
    animal.bark();
  }
}

// User-defined type guards
interface Car {
  make: string;
  model: string;
  year: number;
}

interface Boat {
  make: string;
  model: string;
  year: number;
  knots: number;
}

// Type guard function
function isCar(vehicle: Car | Boat): vehicle is Car {
  return (vehicle as Boat).knots === undefined;
}

// Using type guard
function getVehicleInfo(vehicle: Car | Boat) {
  const info = \`\${vehicle.make} \${vehicle.model} (\${vehicle.year})\`;
  
  if (isCar(vehicle)) {
    // TypeScript knows vehicle is Car here
    return \`Car: \${info}\`;
  } else {
    // TypeScript knows vehicle is Boat here
    return \`Boat: \${info}, \${vehicle.knots} knots\`;
  }
}</code></pre>
        </div>
        
        <h4>Utility Types</h4>
        <p>TypeScript includes utility types that facilitate common type transformations.</p>
        <div class="code-example">
          <pre><code>interface User {
  id: number;
  name: string;
  email: string;
  address: {
    street: string;
    city: string;
    zipCode: string;
  };
  role: 'admin' | 'user' | 'guest';
}

// Partial<T> - Makes all properties optional
type PartialUser = Partial<User>;
const userUpdate: PartialUser = {
  name: "Jane Doe"
};

// Required<T> - Makes all properties required
type StrictUser = Required<User>;

// Readonly<T> - Makes all properties readonly
type ReadonlyUser = Readonly<User>;

// Pick<T, K> - Creates a type with only the specified properties
type UserCredentials = Pick<User, 'id' | 'email'>;

// Omit<T, K> - Creates a type without the specified properties
type PublicUser = Omit<User, 'email' | 'address'>;

// Record<K, T> - Creates a type with properties of K type and T values
type UserRoles = Record<string, 'admin' | 'user' | 'guest'>;

// ReturnType<T> - Extracts the return type of a function
function createUser(name: string, email: string): User {
  return { /* user object */ } as User;
}
type NewUser = ReturnType<typeof createUser>;</code></pre>
        </div>
        
        <div class="interview-tip">
          <p><span class="interview-icon">🎯</span> <strong>Interview Focus:</strong> Advanced TypeScript features demonstrate your ability to create robust, type-safe applications.</p>
          <p>Key points to understand:</p>
          <ul>
            <li>How to use generics for reusable, type-safe code</li>
            <li>The role of type guards in narrowing types</li>
            <li>When and how to use utility types</li>
            <li>TypeScript's configuration options and compiler flags</li>
            <li>Performance implications of TypeScript features</li>
          </ul>
        </div>
      `,
          codeExample: `// Advanced TypeScript Features

// 1. Conditional Types
// -----------------
// A type that depends on a condition
type NonNullable<T> = T extends null | undefined ? never : T;

// Using conditional types
type StringOrNumber = string | number | null | undefined;
type NonNullStringOrNumber = NonNullable<StringOrNumber>; // string | number

// More complex conditional type
type ExtractPropertyType<T, K extends keyof T> = T[K];

interface Product {
  id: number;
  name: string;
  price: number;
  inStock: boolean;
}

type ProductNameType = ExtractPropertyType<Product, 'name'>; // string
type ProductPriceType = ExtractPropertyType<Product, 'price'>; // number

// 2. Mapped Types
// ------------
// Creating new types by mapping over properties of existing types
type Nullable<T> = { [P in keyof T]: T[P] | null };

// Using mapped types
interface User {
  id: number;
  name: string;
  email: string;
}

type NullableUser = Nullable<User>;
// Equivalent to:
// {
//   id: number | null;
//   name: string | null;
//   email: string | null;
// }

// Mapped type with modifiers
type ReadonlyPartial<T> = {
  readonly [P in keyof T]?: T[P];
};

const config: ReadonlyPartial<User> = {
  name: 'Guest'
}; 
// config.name = 'Admin'; // Error: Cannot assign to 'name' because it is a read-only property

// 3. Advanced Generics
// -----------------
// Generic constraints
interface HasLength {
  length: number;
}

function logLength<T extends HasLength>(arg: T): T {
  console.log(arg.length);
  return arg;
}

// Works with strings, arrays, or any type with a length property
logLength('Hello'); // 5
logLength([1, 2, 3]); // 3
logLength({ length: 10, value: 'test' }); // 10
// logLength(123); // Error: number doesn't have a length property

// Generic defaults
interface ApiResponse<T = any> {
  data: T;
  status: number;
}

// Default is 'any'
const response1: ApiResponse = {
  data: 'any data works here',
  status: 200
};

// Specific type
const response2: ApiResponse<string[]> = {
  data: ['specific', 'type', 'here'],
  status: 200
};

// 4. Type Guards and Narrowing
// -------------------------
// User-defined type guard functions
interface Admin {
  id: number;
  name: string;
  privileges: string[];
}

interface Employee {
  id: number;
  name: string;
  startDate: Date;
}

// Union type
type Staff = Admin | Employee;

// Type guard function
function isAdmin(staff: Staff): staff is Admin {
  return 'privileges' in staff;
}

function isEmployee(staff: Staff): staff is Employee {
  return 'startDate' in staff;
}

// Using type guards
function displayDetails(staff: Staff) {
  console.log(\`ID: \${staff.id}, Name: \${staff.name}\`);
  
  if (isAdmin(staff)) {
    console.log(\`Admin privileges: \${staff.privileges.join(', ')}\`);
  }
  
  if (isEmployee(staff)) {
    console.log(\`Employee start date: \${staff.startDate.toLocaleDateString()}\`);
  }
}

// Discriminated unions for more reliable type narrowing
interface Circle {
  kind: 'circle';
  radius: number;
}

interface Rectangle {
  kind: 'rectangle';
  width: number;
  height: number;
}

interface Triangle {
  kind: 'triangle';
  base: number;
  height: number;
}

type Shape = Circle | Rectangle | Triangle;

// No need for custom type guards with discriminated unions
function calculateArea(shape: Shape): number {
  switch (shape.kind) {
    case 'circle':
      return Math.PI * shape.radius ** 2;
    case 'rectangle':
      return shape.width * shape.height;
    case 'triangle':
      return (shape.base * shape.height) / 2;
    default:
      // Exhaustiveness check - will error if we add a new shape type
      // and don't handle it here
      const _exhaustiveCheck: never = shape;
      throw new Error(\`Unhandled shape kind: \${_exhaustiveCheck}\`);
  }
}

// 5. Advanced Utility Types
// ----------------------
// Custom utility types
// Extract properties of a certain type
type ExtractByType<T, U> = {
  [K in keyof T as T[K] extends U ? K : never]: T[K]
};

interface FormData {
  name: string;
  email: string;
  age: number;
  isSubscribed: boolean;
  lastLogin: Date;
}

// Extract only string properties
type StringProperties = ExtractByType<FormData, string>;
// Equivalent to: { name: string; email: string; }

// Convert union to intersection
type UnionToIntersection<U> = 
  (U extends any ? (k: U) => void : never) extends
  ((k: infer I) => void) ? I : never;

type Union = { a: string } | { b: number };
type Intersection = UnionToIntersection<Union>;
// Equivalent to: { a: string } & { b: number }

// Deep partial type (makes nested objects partial too)
type DeepPartial<T> = {
  [P in keyof T]?: T[P] extends object ? DeepPartial<T[P]> : T[P];
};

interface NestedObject {
  name: string;
  address: {
    street: string;
    city: string;
    zip: number;
  };
  contacts: {
    email: string;
    phone: string;
  };
}

// Regular Partial only makes top-level properties optional
const partialUpdate: Partial<NestedObject> = {
  name: 'John'
  // address: { city: 'New York' } // Error: 'street' is required
};

// DeepPartial makes all nested properties optional too
const deepPartialUpdate: DeepPartial<NestedObject> = {
  address: {
    city: 'New York'
    // street and zip are optional
  }
};`,
          exercise: {
            instructions:
              'Create a TypeScript library for handling form validation with advanced type features. Implement: 1) Generic validator functions that can work with different form types, 2) A type-safe schema definition system using conditional and mapped types, 3) Type guards to handle different validation scenarios, 4) Higher-order functions with proper typing, and 5) Custom utility types for common form operations like parsing, validation, and error handling. Focus on creating a type-safe API that provides excellent editor support and compile-time checking.',
          },
        },
      ],
      prepperSummary: `
    <div class="prepper-summary">
      <h3>🔑 Key Interview Takeaways</h3>
      <ul>
        <li><strong>Static Typing:</strong> TypeScript adds optional static typing to JavaScript, enabling better tooling, error detection, and code documentation.</li>
        
        <li><strong>Type System:</strong> TypeScript offers primitive types, interfaces, type aliases, unions, generics, and utility types to express complex type relationships.</li>
        
        <li><strong>Type Safety:</strong> Features like type guards, assertions, and discriminated unions help create type-safe code that narrows types appropriately in different contexts.</li>
        
        <li><strong>Interfaces vs. Types:</strong> Interfaces are primarily for defining object shapes and can be extended, while type aliases can represent any type and allow more complex type operations.</li>
        
        <li><strong>JavaScript Integration:</strong> TypeScript is a superset of JavaScript that compiles to plain JavaScript, meaning it can gradually be adopted in existing projects.</li>
      </ul>
      
      <h4>📝 Common Interview Questions</h4>
      <ol>
        <li>"What are the benefits of using TypeScript over plain JavaScript?"</li>
        <li>"Explain the difference between interfaces and type aliases in TypeScript"</li>
        <li>"How would you implement generics in TypeScript and why are they useful?"</li>
        <li>"What are type guards and when would you use them?"</li>
        <li>"How does TypeScript's type inference work and when might you need explicit type annotations?"</li>
      </ol>
    </div>
  `,
    },
  ],
  challenge: {
    description:
      'Create a comprehensive JavaScript application that demonstrates your understanding of advanced JavaScript concepts. The application should showcase your ability to work with prototypes, Web Workers, memory management, and TypeScript in a practical context.',
    requirements: [
      'Implement a class hierarchy using prototypes and ES6 classes with proper inheritance and encapsulation',
      'Create a Web Worker system for handling computationally intensive tasks without blocking the main thread',
      'Implement efficient memory management, including handling potential memory leaks',
      'Define TypeScript interfaces and types for your application components',
      'Include proper error handling, performance optimizations, and clean code practices',
      'Document your implementation choices and design patterns used in the application',
    ],
    starterCode: `// Advanced JavaScript Concepts Challenge

// Create a task processing system with the following components:
// 1. A Task class hierarchy (Task, ComputeTask, IOTask, etc.)
// 2. A TaskProcessor that uses Web Workers to perform tasks in the background
// 3. A TaskManager that handles scheduling and memory management
// 4. TypeScript definitions for all components

// 1. Define the Task class hierarchy

/**
 * Base Task class
 */
class Task {
  constructor(id, priority = 'normal') {
    this.id = id;
    this.priority = priority;
    this.status = 'pending';
    this.result = null;
    this.error = null;
    this.createdAt = new Date();
    this.startedAt = null;
    this.completedAt = null;
  }
  
  execute() {
    throw new Error('Task.execute() must be implemented by subclass');
  }
  
  start() {
    this.status = 'running';
    this.startedAt = new Date();
  }
  
  complete(result) {
    this.status = 'completed';
    this.result = result;
    this.completedAt = new Date();
  }
  
  fail(error) {
    this.status = 'failed';
    this.error = error;
    this.completedAt = new Date();
  }
  
  cancel() {
    this.status = 'cancelled';
    this.completedAt = new Date();
  }
  
  getExecutionTime() {
    if (!this.startedAt) return 0;
    const endTime = this.completedAt || new Date();
    return endTime - this.startedAt;
  }
}

/**
 * Task that performs CPU-intensive calculations
 */
class ComputeTask extends Task {
  constructor(id, computeFn, data, priority) {
    super(id, priority);
    this.computeFn = computeFn;
    this.data = data;
  }
  
  execute() {
    try {
      this.start();
      const result = this.computeFn(this.data);
      this.complete(result);
      return result;
    } catch (error) {
      this.fail(error);
      throw error;
    }
  }
  
  // Serialize for Web Worker transfer
  serialize() {
    return {
      id: this.id,
      type: 'compute',
      functionBody: this.computeFn.toString(),
      data: this.data,
      priority: this.priority
    };
  }
  
  // Create from serialized data
  static deserialize(serialized) {
    const computeFn = new Function('return ' + serialized.functionBody)();
    return new ComputeTask(
      serialized.id,
      computeFn,
      serialized.data,
      serialized.priority
    );
  }
}

/**
 * Task for I/O operations (simulated)
 */
class IOTask extends Task {
  constructor(id, url, method = 'GET', data = null, priority) {
    super(id, priority);
    this.url = url;
    this.method = method;
    this.data = data;
  }
  
  async execute() {
    try {
      this.start();
      // Simulate network request
      const result = await this.fetchData();
      this.complete(result);
      return result;
    } catch (error) {
      this.fail(error);
      throw error;
    }
  }
  
  async fetchData() {
    // Simulate network latency
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (Math.random() < 0.9) {
          resolve({
            url: this.url,
            data: this.data,
            responseData: { success: true, timestamp: Date.now() }
          });
        } else {
          reject(new Error(\`Failed to fetch \${this.url}\`));
        }
      }, 500 + Math.random() * 1000); // Random delay
    });
  }
}

// 2. Create the TaskProcessor with Web Worker support

/**
 * Processes tasks using Web Workers for CPU-intensive operations
 */
class TaskProcessor {
  constructor(workerPoolSize = 4) {
    this.workers = [];
    this.taskQueue = [];
    this.activeWorkers = 0;
    this.workerPoolSize = workerPoolSize;
    this.initialize();
  }
  
  initialize() {
    // Create Web Worker pool
    for (let i = 0; i < this.workerPoolSize; i++) {
      this.createWorker();
    }
  }
  
  createWorker() {
    // Create worker from inline function
    const workerScript = 
      self.onmessage = function(e) {
        const { taskData } = e.data;
        
        try {
          // Execute the task
          const fn = new Function('return ' + taskData.functionBody)();
          const result = fn(taskData.data);
          
          // Send back the result
          self.postMessage({
            taskId: taskData.id,
            result: result,
            success: true
          });
        } catch (error) {
          // Send back the error
          self.postMessage({
            taskId: taskData.id,
            error: error.message,
            success: false
          });
        }
      };
    
    
    // Create blob from script
    const blob = new Blob([workerScript], { type: 'application/javascript' });
    const blobUrl = URL.createObjectURL(blob);
    
    // Create worker
    const worker = new Worker(blobUrl);
    
    // Set up message handler
    worker.onmessage = this.handleWorkerMessage.bind(this);
    worker.onerror = this.handleWorkerError.bind(this);
    
    // Store worker with metadata
    this.workers.push({
      worker: worker,
      busy: false,
      blobUrl: blobUrl,
      currentTaskId: null
    });
    
    return worker;
  }
  
  handleWorkerMessage(event) {
    const { taskId, result, error, success } = event.data;
    const workerInfo = this.workers.find(w => w.currentTaskId === taskId);
    
    if (workerInfo) {
      // Mark worker as free
      workerInfo.busy = false;
      workerInfo.currentTaskId = null;
      this.activeWorkers--;
      
      // Find the task
      const taskIndex = this.taskQueue.findIndex(t => t.id === taskId);
      if (taskIndex >= 0) {
        const task = this.taskQueue[taskIndex];
        
        // Update task status
        if (success) {
          task.resolve(result);
        } else {
          task.reject(new Error(error));
        }
        
        // Remove task from queue
        this.taskQueue.splice(taskIndex, 1);
      }
      
      // Process next task
      this.processNextTask();
    }
  }
  
  handleWorkerError(error) {
    console.error('Worker error:', error);
    
    // Find the worker that errored
    const workerInfo = this.workers.find(w => w.worker === error.target);
    
    if (workerInfo && workerInfo.currentTaskId) {
      // Find the task
      const taskIndex = this.taskQueue.findIndex(t => t.id === workerInfo.currentTaskId);
      if (taskIndex >= 0) {
        // Fail the task
        this.taskQueue[taskIndex].reject(error);
        this.taskQueue.splice(taskIndex, 1);
      }
      
      // Reset worker
      this.terminateWorker(workerInfo);
      this.createWorker();
      this.activeWorkers--;
      
      // Process next task
      this.processNextTask();
    }
  }
  
  terminateWorker(workerInfo) {
    workerInfo.worker.terminate();
    URL.revokeObjectURL(workerInfo.blobUrl);
    const index = this.workers.indexOf(workerInfo);
    if (index >= 0) {
      this.workers.splice(index, 1);
    }
  }
  
  async processTask(task) {
    if (task instanceof IOTask) {
      // Process I/O tasks directly (no worker needed)
      return task.execute();
    } else if (task instanceof ComputeTask) {
      // Process compute tasks in a worker
      return new Promise((resolve, reject) => {
        this.taskQueue.push({
          id: task.id,
          task: task,
          resolve,
          reject
        });
        
        this.processNextTask();
      });
    } else {
      throw new Error(\`Unsupported task type: \${task.constructor.name}\`);
    }
  }
  
  processNextTask() {
    if (this.taskQueue.length === 0 || this.activeWorkers >= this.workerPoolSize) {
      return;
    }
    
    // Find waiting compute tasks
    const pendingTaskIndex = this.taskQueue.findIndex(
      t => !t.processing && t.task instanceof ComputeTask
    );
    
    if (pendingTaskIndex === -1) {
      return;
    }
    
    // Find available worker
    const availableWorker = this.workers.find(w => !w.busy);
    
    if (!availableWorker) {
      return;
    }
    
    // Get task
    const taskInfo = this.taskQueue[pendingTaskIndex];
    taskInfo.processing = true;
    
    // Assign task to worker
    availableWorker.busy = true;
    availableWorker.currentTaskId = taskInfo.id;
    this.activeWorkers++;
    
    // Send task to worker
    const serializedTask = taskInfo.task.serialize();
    availableWorker.worker.postMessage({ taskData: serializedTask });
  }
  
  terminate() {
    // Clean up all workers
    this.workers.forEach(workerInfo => {
      this.terminateWorker(workerInfo);
    });
    
    this.workers = [];
    this.activeWorkers = 0;
    
    // Fail any pending tasks
    this.taskQueue.forEach(taskInfo => {
      if (taskInfo.reject) {
        taskInfo.reject(new Error('TaskProcessor terminated'));
      }
    });
    
    this.taskQueue = [];
  }
}

// 3. Create the TaskManager for scheduling and memory management

/**
 * Manages task execution, scheduling, and memory
 */
class TaskManager {
  constructor(options = {}) {
    this.options = {
      maxConcurrent: options.maxConcurrent || 8,
      maxQueueSize: options.maxQueueSize || 100,
      defaultPriority: options.defaultPriority || 'normal',
      workerPoolSize: options.workerPoolSize || 4,
      autoCleanup: options.autoCleanup !== false
    };
    
    this.taskProcessor = new TaskProcessor(this.options.workerPoolSize);
    this.taskHistory = new Map();
    this.taskQueue = [];
    this.runningTasks = new Set();
    this.taskCounter = 0;
    
    // Set up auto cleanup
    if (this.options.autoCleanup) {
      this.cleanupInterval = setInterval(() => {
        this.cleanupCompletedTasks();
      }, 60000);
    }
  }
  
  createId() {
    return \`task_\${++this.taskCounter}\`;
  }
  
  async addTask(task) {
    if (!(task instanceof Task)) {
      throw new Error('Not a valid Task instance');
    }
    
    // Store task in history
    this.taskHistory.set(task.id, task);
    
    // Queue or execute task depending on running count
    if (this.runningTasks.size >= this.options.maxConcurrent) {
      // Check queue size limit
      if (this.taskQueue.length >= this.options.maxQueueSize) {
        throw new Error('Task queue is full');
      }
      
      // Add to queue based on priority
      this.addToQueue(task);
      
      // Return promise that will resolve when task is eventually executed
      return new Promise((resolve, reject) => {
        task._queuePromise = { resolve, reject };
      });
    } else {
      // Execute immediately
      return this.executeTask(task);
    }
  }
  
  addToQueue(task) {
    // Sort by priority: high, normal, low
    const priorityMap = { high: 0, normal: 1, low: 2 };
    const priority = priorityMap[task.priority] ?? priorityMap.normal;
    
    // Find insertion point
    let insertAt = this.taskQueue.length;
    for (let i = 0; i < this.taskQueue.length; i++) {
      const queuedPriority = priorityMap[this.taskQueue[i].priority] ?? priorityMap.normal;
      if (priority < queuedPriority) {
        insertAt = i;
        break;
      }
    }
    
    // Insert task at the right position
    this.taskQueue.splice(insertAt, 0, task);
  }
  
  async executeTask(task) {
    // Mark as running
    this.runningTasks.add(task.id);
    
    try {
      // Process through the task processor
      const result = await this.taskProcessor.processTask(task);
      return result;
    } catch (error) {
      // Re-throw errors
      throw error;
    } finally {
      // Mark as no longer running
      this.runningTasks.delete(task.id);
      
      // Process next task from queue
      this.processNextTask();
    }
  }
  
  processNextTask() {
    if (this.taskQueue.length === 0) {
      return;
    }
    
    if (this.runningTasks.size < this.options.maxConcurrent) {
      // Take next task from queue
      const task = this.taskQueue.shift();
      
      // Extract promise callbacks
      const { resolve, reject } = task._queuePromise || {};
      delete task._queuePromise;
      
      // Execute task
      this.executeTask(task)
        .then(result => resolve && resolve(result))
        .catch(error => reject && reject(error));
    }
  }
  
  createComputeTask(computeFn, data, priority = this.options.defaultPriority) {
    const task = new ComputeTask(this.createId(), computeFn, data, priority);
    return task;
  }
  
  createIOTask(url, method = 'GET', data = null, priority = this.options.defaultPriority) {
    const task = new IOTask(this.createId(), url, method, data, priority);
    return task;
  }
  
  async executeCompute(computeFn, data, priority) {
    const task = this.createComputeTask(computeFn, data, priority);
    return this.addTask(task);
  }
  
  async executeIO(url, method, data, priority) {
    const task = this.createIOTask(url, method, data, priority);
    return this.addTask(task);
  }
  
  getTaskById(id) {
    return this.taskHistory.get(id);
  }
  
  getAllTasks() {
    return Array.from(this.taskHistory.values());
  }
  
  getTasksByStatus(status) {
    return this.getAllTasks().filter(task => task.status === status);
  }
  
  cleanupCompletedTasks(maxAge = 3600000) {
    const now = Date.now();
    let removedCount = 0;
    
    // Remove tasks that are completed/failed/cancelled and older than maxAge
    for (const [id, task] of this.taskHistory.entries()) {
      if (['completed', 'failed', 'cancelled'].includes(task.status)) {
        if (task.completedAt && (now - task.completedAt) > maxAge) {
          this.taskHistory.delete(id);
          removedCount++;
        }
      }
    }
    
    return removedCount;
  }
  
  cancelTask(id) {
    // Cancel task if it's in the queue
    const queueIndex = this.taskQueue.findIndex(task => task.id === id);
    if (queueIndex >= 0) {
      const task = this.taskQueue[queueIndex];
      this.taskQueue.splice(queueIndex, 1);
      task.cancel();
      
      // Reject the queue promise
      if (task._queuePromise && task._queuePromise.reject) {
        task._queuePromise.reject(new Error('Task cancelled'));
      }
      
      return true;
    }
    
    // Task already running, cannot cancel
    return false;
  }
  
  shutdown() {
    // Cancel all queued tasks
    this.taskQueue.forEach(task => {
      task.cancel();
      if (task._queuePromise && task._queuePromise.reject) {
        task._queuePromise.reject(new Error('TaskManager shutdown'));
      }
    });
    
    this.taskQueue = [];
    
    // Clean up task processor
    this.taskProcessor.terminate();
    
    // Clear cleanup interval
    if (this.cleanupInterval) {
      clearInterval(this.cleanupInterval);
    }
  }
}

// 4. TypeScript definitions

/*
// task.d.ts - Type definitions for the Task system

// Task priority levels
type TaskPriority = 'high' | 'normal' | 'low';

// Task status values
type TaskStatus = 'pending' | 'running' | 'completed' | 'failed' | 'cancelled';

// Base Task interface
interface ITask {
  id: string;
  priority: TaskPriority;
  status: TaskStatus;
  result: any | null;
  error: Error | null;
  createdAt: Date;
  startedAt: Date | null;
  completedAt: Date | null;
  
  execute(): any;
  start(): void;
  complete(result: any): void;
  fail(error: Error): void;
  cancel(): void;
  getExecutionTime(): number;
}

// Compute Task interface
interface IComputeTask extends ITask {
  computeFn: Function;
  data: any;
  serialize(): SerializedComputeTask;
}

// IO Task interface
interface IIOTask extends ITask {
  url: string;
  method: string;
  data: any;
  fetchData(): Promise<any>;
}

// Serialized task for worker transfer
interface SerializedComputeTask {
  id: string;
  type: 'compute';
  functionBody: string;
  data: any;
  priority: TaskPriority;
}

// Task Processor configuration
interface TaskProcessorOptions {
  workerPoolSize?: number;
}

// Task Manager configuration
interface TaskManagerOptions {
  maxConcurrent?: number;
  maxQueueSize?: number;
  defaultPriority?: TaskPriority;
  workerPoolSize?: number;
  autoCleanup?: boolean;
}

// Task Manager interface
interface ITaskManager {
  addTask(task: ITask): Promise<any>;
  createComputeTask(computeFn: Function, data: any, priority?: TaskPriority): IComputeTask;
  createIOTask(url: string, method?: string, data?: any, priority?: TaskPriority): IIOTask;
  executeCompute(computeFn: Function, data: any, priority?: TaskPriority): Promise<any>;
  executeIO(url: string, method?: string, data?: any, priority?: TaskPriority): Promise<any>;
  getTaskById(id: string): ITask | undefined;
  getAllTasks(): ITask[];
  getTasksByStatus(status: TaskStatus): ITask[];
  cleanupCompletedTasks(maxAge?: number): number;
  cancelTask(id: string): boolean;
  shutdown(): void;
}
*/

// Example usage:

// Implement your solution using these components
function runExample() {
  const taskManager = new TaskManager({
    maxConcurrent: 4,
    workerPoolSize: 2
  });
  
  // Run compute tasks
  for (let i = 0; i < 10; i++) {
    const priority = i % 3 === 0 ? 'high' : i % 3 === 1 ? 'normal' : 'low';
    
    taskManager.executeCompute(
      (data) => {
        // Expensive calculation
        let result = 0;
        for (let j = 0; j < data.iterations; j++) {
          result += Math.sqrt(j * data.multiplier);
        }
        return result;
      },
      { iterations: 10000000, multiplier: i + 1 },
      priority
    )
    .then(result => console.log(\`Task \${i} completed with result: \${result}\`))
    .catch(error => console.error(\`Task \${i} failed: \${error.message}\`));
  }
  
  // Run IO tasks
  for (let i = 0; i < 5; i++) {
    taskManager.executeIO(
      \`https://api.example.com/data/\${i}\`,
      'GET',
      null,
      i % 2 === 0 ? 'high' : 'normal'
    )
    .then(result => console.log(\`IO Task \${i} completed with result:\`, result))
    .catch(error => console.error(\`IO Task \${i} failed: \${error.message}\`));
  }
  
  // Clean up when done with all tasks
  setTimeout(() => {
    console.log('Tasks completed, shutting down...');
    taskManager.shutdown();
  }, 10000);
}

// Your solution should implement functionality beyond this starter code
export { Task, ComputeTask, IOTask, TaskProcessor, TaskManager };`,
  },
}

export default advancedJavaScriptConcepts
