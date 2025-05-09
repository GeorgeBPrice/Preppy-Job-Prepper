// curriculum-section2.js - Objects and Data Structures

const objectsAndDataStructures = {
  title: 'Objects and Data Structures',
  description: 'Explore object creation, manipulation, arrays, and collections.',
  lessons: [
    {
      title: 'Object Creation and Manipulation',
      description: 'Learn different ways to create and modify objects.',
      sections: [
        {
          title: 'Object Literals and Properties',
          explanation: `
        <p>JavaScript objects are collections of key-value pairs that store data and functionality together. They form the foundation of JavaScript's object-oriented programming capabilities.</p>
        
        <h4>Creating and Accessing Objects</h4>
        <p>Objects can be created using literal notation (the most common way) or constructors. Their properties can be accessed using dot notation or bracket notation, with bracket notation being essential for properties with special characters or spaces.</p>

        <p>Properties can be added, modified, or deleted at runtime, making JavaScript objects highly dynamic. This flexibility allows for adaptable code structures but requires careful management to avoid unexpected behavior.</p>
        
        <div class="code-example">
          <pre><code>// Object literal
const person = {
  name: "John",
  age: 30,
  "full address": "123 Main St", // Properties with spaces need quotes
  greet() {
    return \`Hello, my name is \${this.name}\`;
  }
};

// Property access
console.log(person.name);          // "John"
console.log(person["age"]);        // 30
console.log(person["full address"]); // "123 Main St"

// Adding, modifying and deleting properties
person.job = "Developer";          // Add new property
person.age = 31;                   // Modify existing property
delete person.job;                 // Delete property

// Checking if property exists
console.log("name" in person);     // true
console.log(person.hasOwnProperty("name")); // true (own property)
console.log("toString" in person); // true (inherited)
console.log(person.hasOwnProperty("toString")); // false</code></pre>
        </div>
        
        <h4>Advanced Object Features</h4>
        <p>JavaScript provides powerful features for fine-tuning object behavior, including computed property names, property descriptors for controlling property behavior, and getters/setters for implementing computed properties with validation.</p>

        <p>Property descriptors allow for creating read-only properties, hiding properties from enumeration (loops), and preventing property reconfiguration, enabling more robust object designs.</p>
        
        <div class="code-example">
          <pre><code>// Computed property names
const key = "favoriteColor";
const user = {
  [key]: "blue",
  [\`user_\${Date.now()}\`]: "unique id"
};

// Property descriptors
const product = {};
Object.defineProperty(product, "name", {
  value: "Laptop",
  writable: true,     // Can change value
  enumerable: true,   // Shows in loops/Object.keys
  configurable: true  // Can be deleted/redefined
});

Object.defineProperty(product, "id", {
  value: "p12345",
  writable: false,    // Read-only
  enumerable: false   // Not visible in loops
});

// Getters and setters
const circle = {
  radius: 5,
  
  get diameter() {
    return this.radius * 2;
  },
  
  set diameter(value) {
    this.radius = value / 2;
  }
};

console.log(circle.diameter); // 10
circle.diameter = 20;
console.log(circle.radius);   // 10</code></pre>
        </div>
        
        <div class="interview-tip">
          <p><span class="interview-icon">🎯</span> <strong>Interview Focus:</strong> Be prepared to discuss object manipulation, property descriptors, and scenarios where different property access methods are preferred.</p>
          <p>Key areas to master:</p>
          <ul>
            <li>Dot notation vs bracket notation for property access</li>
            <li>Using property descriptors to control object behavior</li>
            <li>Implementing getters and setters for computed properties</li>
            <li>The difference between 'in' operator and hasOwnProperty</li>
            <li>Implementing validation in setters</li>
          </ul>
        </div>
      `,
          codeExample: `// Product catalog with property descriptors and validation
function createProduct(id, name, price) {
  const product = {};
  
  // Private data stored in closure
  let _price = price;
  let _inventory = 0;
  
  // Read-only ID
  Object.defineProperty(product, 'id', {
    value: id,
    writable: false,
    enumerable: true,
    configurable: false
  });
  
  // Regular property with validation
  Object.defineProperty(product, 'name', {
    value: name,
    writable: true,
    enumerable: true,
    configurable: true
  });
  
  // Price with getter/setter + validation
  Object.defineProperty(product, 'price', {
    get() {
      return _price;
    },
    set(newPrice) {
      if (typeof newPrice !== 'number' || newPrice <= 0) {
        throw new Error('Price must be a positive number');
      }
      _price = newPrice;
    },
    enumerable: true,
    configurable: true
  });
  
  // Inventory management with validation
  Object.defineProperty(product, 'inventory', {
    get() {
      return _inventory;
    },
    set(count) {
      if (!Number.isInteger(count) || count < 0) {
        throw new Error('Inventory must be a non-negative integer');
      }
      _inventory = count;
    },
    enumerable: true,
    configurable: true
  });
  
  // Computed property
  Object.defineProperty(product, 'inStock', {
    get() {
      return _inventory > 0;
    },
    enumerable: true
  });
  
  // Computed property
  Object.defineProperty(product, 'value', {
    get() {
      return _price * _inventory;
    },
    enumerable: true
  });
  
  return product;
}

// Usage
const laptop = createProduct('p1', 'Laptop', 999.99);
console.log(laptop.id);        // p1
console.log(laptop.inStock);   // false

laptop.inventory = 10;
console.log(laptop.inStock);   // true
console.log(laptop.value);     // 9999.9

try {
  laptop.id = 'p2';           // Error: Cannot modify read-only property
} catch (e) {
  console.log(e.message);
}

try {
  laptop.price = -100;        // Error: Price must be a positive number
} catch (e) {
  console.log(e.message);
}`,
          exercise: {
            instructions:
              'Create a shopping cart system using objects with proper property validation. Implement properties for items, quantities, price calculations, and discounts. Use property descriptors to make certain properties read-only (like the cart ID and total), and implement getters/setters with validation to ensure items have valid prices and quantities.',
          },
        },
        {
          title: 'Object Creation Patterns',
          explanation: `
        <p>JavaScript offers multiple strategies for creating objects, each with specific advantages for different scenarios.</p>
        
        <h4>Constructor Functions vs Classes</h4>
        <p>Constructor functions were JavaScript's original object creation pattern, using <code>new</code> to create instances. ES6 classes provide more familiar syntax but work on the same prototype-based inheritance model underneath.</p>

        <p>Classes offer cleaner syntax, built-in constructor methods, and better support for inheritance, making them preferred for complex object hierarchies in modern code.</p>
        
        <div class="code-example">
          <pre><code>// Constructor function
function Person(name, age) {
  this.name = name;
  this.age = age;
  
  // Method defined on each instance (memory inefficient)
  this.greet = function() {
    return \`Hello, my name is \${this.name}\`;
  };
}

// Add to prototype (more efficient)
Person.prototype.sayHi = function() {
  return \`Hi, I'm \${this.name}\`;
};

const john = new Person("John", 30);

// ES6 Class syntax (same prototype behavior, better syntax)
class User {
  constructor(name, email) {
    this.name = name;
    this.email = email;
  }
  
  // Methods added to prototype automatically
  greet() {
    return \`Hello, my name is \${this.name}\`;
  }
  
  // Static method (on the class itself)
  static createGuest() {
    return new User("Guest", "guest@example.com");
  }
}</code></pre>
        </div>
        
        <h4>Factory Functions and Object.create</h4>
        <p>Factory functions provide object creation without <code>new</code> keywords and enable closure-based private variables. <code>Object.create</code> allows direct prototype assignment, offering more control over property descriptors and inheritance.</p>

        <p>Factory functions excel at encapsulation and private data, making them ideal for modules and services where data privacy is important.</p>
        
        <div class="code-example">
          <pre><code>// Factory function pattern
function createPerson(name, age) {
  return {
    name,
    age,
    greet() {
      return \`Hello, my name is \${name}\`;
    }
  };
}

const bob = createPerson("Bob", 25);

// Object.create
const personProto = {
  greet() {
    return \`Hello, my name is \${this.name}\`;
  },
  sayBye() {
    return "Goodbye!";
  }
};

const charlie = Object.create(personProto);
charlie.name = "Charlie";
charlie.age = 35;

// Object.create with property descriptors
const dave = Object.create(personProto, {
  name: { value: "Dave", writable: true, enumerable: true },
  age: { value: 40, writable: true, enumerable: true }
});</code></pre>
        </div>
        
        <div class="interview-tip">
          <p><span class="interview-icon">🎯</span> <strong>Interview Focus:</strong> Be prepared to discuss the pros and cons of different object creation patterns and when to use each approach.</p>
          <p>Key considerations:</p>
          <ul>
            <li>Constructor functions vs classes (syntax, hoisting, inheritance)</li>
            <li>Factory functions vs constructors (closure access, no 'new' required)</li>
            <li>Prototype performance for methods used by many instances</li>
            <li>Memory usage and inheritance patterns</li>
            <li>Privacy and encapsulation in each pattern</li>
          </ul>
        </div>
      `,
          codeExample: `// Comparing object creation patterns by implementing the same functionality
// 1. Constructor Function Pattern
function ProductConstructor(id, name, price) {
  this.id = id;
  this.name = name;
  this.price = price;
  this.createdAt = new Date();
}

ProductConstructor.prototype.getDiscount = function(percent) {
  return this.price * (percent / 100);
};

ProductConstructor.prototype.applyDiscount = function(percent) {
  this.price -= this.getDiscount(percent);
  return this.price;
};

// 2. ES6 Class Pattern
class ProductClass {
  constructor(id, name, price) {
    this.id = id;
    this.name = name;
    this.price = price;
    this.createdAt = new Date();
  }
  
  getDiscount(percent) {
    return this.price * (percent / 100);
  }
  
  applyDiscount(percent) {
    this.price -= this.getDiscount(percent);
    return this.price;
  }
  
  // Static method for creating products with validation
  static create(id, name, price) {
    if (!id || !name || typeof price !== 'number') {
      throw new Error('Invalid product data');
    }
    return new ProductClass(id, name, price);
  }
}

// 3. Factory Function Pattern
function createProduct(id, name, price) {
  // Private data using closures
  let _price = price;
  let _discount = 0;
  
  return {
    id,
    name,
    get price() { return _price; },
    set price(newPrice) {
      if (typeof newPrice !== 'number' || newPrice < 0) {
        throw new Error('Invalid price');
      }
      _price = newPrice;
    },
    get discount() { return _discount; },
    getDiscount(percent) {
      return _price * (percent / 100);
    },
    applyDiscount(percent) {
      _discount = percent;
      _price -= this.getDiscount(percent);
      return _price;
    }
  };
}

// 4. Object.create Pattern
const productProto = {
  getDiscount(percent) {
    return this.price * (percent / 100);
  },
  applyDiscount(percent) {
    this.price -= this.getDiscount(percent);
    return this.price;
  }
};

function createProductViaProto(id, name, price) {
  const product = Object.create(productProto);
  product.id = id;
  product.name = name;
  product.price = price;
  product.createdAt = new Date();
  return product;
}

// Usage comparison
const product1 = new ProductConstructor('p1', 'Laptop', 1000);
const product2 = new ProductClass('p2', 'Phone', 500);
const product3 = createProduct('p3', 'Tablet', 300);
const product4 = createProductViaProto('p4', 'Monitor', 200);

console.log(product1.applyDiscount(10)); // 900
console.log(product2.applyDiscount(10)); // 450
console.log(product3.applyDiscount(10)); // 270
console.log(product4.applyDiscount(10)); // 180`,
          exercise: {
            instructions:
              'Implement a "Shape" system using all four object creation patterns (constructor, class, factory function, and Object.create). Each shape should have properties for its dimensions and methods to calculate area and perimeter. Create Circle, Rectangle, and Triangle shapes. Compare the memory usage and flexibility of each approach. Add one unique feature to each implementation to highlight its strengths.',
          },
        },
        {
          title: 'Object Methods and Properties',
          explanation: `
        <p>JavaScript provides a rich set of built-in methods for working with objects that simplify common operations.</p>
        
        <h4>Essential Object Operations</h4>
        <p>The Object static methods like <code>keys</code>, <code>values</code>, and <code>entries</code> transform objects into arrays for easier manipulation, enabling powerful functional programming approaches when working with object data.</p>

        <p>These methods provide consistent ways to iterate over object properties, which is essential for data transformation and collection operations on objects.</p>
        
        <div class="code-example">
          <pre><code>// Object property enumeration
const user = {
  name: "John",
  age: 30,
  job: "Developer"
};

// Get keys, values, and entries
const keys = Object.keys(user);       // ["name", "age", "job"]
const values = Object.values(user);   // ["John", 30, "Developer"]
const entries = Object.entries(user); // [["name", "John"], ["age", 30], ["job", "Developer"]]

// Iterate through properties
for (const key in user) {
  console.log(\`\${key}: \${user[key]}\`);
}

// Modern iteration using entries and destructuring
Object.entries(user).forEach(([key, value]) => {
  console.log(\`\${key}: \${value}\`);
});</code></pre>
        </div>
        
        <h4>Merging, Freezing, and Sealing</h4>
        <p>JavaScript offers methods to control object mutability and combine objects. <code>Object.assign</code> and the spread operator facilitate object merging, while <code>Object.freeze</code> and <code>Object.seal</code> restrict modifications to objects.</p>

        <p>These immutability helpers prevent accidental modifications and create more predictable code, especially in complex applications where maintaining data integrity is crucial.</p>
        
        <div class="code-example">
          <pre><code>// Merging objects
const defaultSettings = { theme: "light", fontSize: 12 };
const userSettings = { theme: "dark" };

// Merge with Object.assign
const mergedSettings = Object.assign({}, defaultSettings, userSettings);
// { theme: "dark", fontSize: 12 }

// Merge with spread operator (...)
const mergedViaSpread = { ...defaultSettings, ...userSettings };

// Control object mutability
const frozenObj = Object.freeze({ name: "Immutable" });
frozenObj.name = "New Name"; // Fails silently (error in strict mode)
console.log(frozenObj.name); // Still "Immutable"

// Object.seal - prevents adding/removing properties
const sealedObj = Object.seal({ name: "Alice", age: 25 });
sealedObj.age = 26;          // This works (can modify existing)
sealedObj.job = "Developer"; // Fails (can't add new properties)
delete sealedObj.age;        // Fails (can't remove properties)

// Check status
console.log(Object.isFrozen(frozenObj)); // true
console.log(Object.isSealed(sealedObj)); // true</code></pre>
        </div>
        
        <div class="interview-tip">
          <p><span class="interview-icon">🎯</span> <strong>Interview Focus:</strong> Be prepared to discuss efficient object manipulation, creating immutable data structures, and using object methods for data transformation.</p>
          <p>Key topics to understand:</p>
          <ul>
            <li>Converting objects to different formats with Object.entries/keys/values</li>
            <li>Deep vs. shallow copying of objects</li>
            <li>When and why to use Object.freeze or Object.seal</li>
            <li>Performance implications of different object operations</li>
            <li>Creating immutable data patterns</li>
          </ul>
        </div>
      `,
          codeExample: `// Object transformation utility library
const ObjectUtils = {
  // Deep clone an object
  deepClone(obj) {
    if (obj === null || typeof obj !== 'object') {
      return obj;
    }
    
    // Handle Date
    if (obj instanceof Date) {
      return new Date(obj.getTime());
    }
    
    // Handle Array
    if (Array.isArray(obj)) {
      return obj.map(item => this.deepClone(item));
    }
    
    // Handle Object
    const copy = {};
    Object.keys(obj).forEach(key => {
      copy[key] = this.deepClone(obj[key]);
    });
    
    return copy;
  },
  
  // Deep merge objects (recursive)
  deepMerge(target, ...sources) {
    if (!sources.length) return target;
    
    const source = sources.shift();
    
    if (source === undefined) {
      return this.deepMerge(target, ...sources);
    }
    
    if (typeof target === 'object' && typeof source === 'object') {
      Object.keys(source).forEach(key => {
        if (typeof source[key] === 'object' && source[key] !== null) {
          if (!target[key]) {
            target[key] = {};
          }
          this.deepMerge(target[key], source[key]);
        } else {
          target[key] = source[key];
        }
      });
    }
    
    return this.deepMerge(target, ...sources);
  },
  
  // Filter object properties based on a predicate
  filterObject(obj, predicate) {
    return Object.fromEntries(
      Object.entries(obj).filter(([key, value]) => predicate(key, value))
    );
  },
  
  // Map object values (like Array.map but for objects)
  mapValues(obj, mapper) {
    return Object.fromEntries(
      Object.entries(obj).map(([key, value]) => [key, mapper(value, key)])
    );
  },
  
  // Flatten a nested object structure
  flatten(obj, prefix = '') {
    return Object.keys(obj).reduce((acc, key) => {
      const pre = prefix.length ? \`\${prefix}.\` : '';
      
      if (typeof obj[key] === 'object' && obj[key] !== null && !Array.isArray(obj[key])) {
        Object.assign(acc, this.flatten(obj[key], \`\${pre}\${key}\`));
      } else {
        acc[\`\${pre}\${key}\`] = obj[key];
      }
      
      return acc;
    }, {});
  },
  
  // Convert a flat object with dot notation back to nested
  unflatten(obj) {
    const result = {};
    
    Object.keys(obj).forEach(key => {
      const parts = key.split('.');
      let current = result;
      
      for (let i = 0; i < parts.length - 1; i++) {
        const part = parts[i];
        if (!current[part]) {
          current[part] = {};
        }
        current = current[part];
      }
      
      current[parts[parts.length - 1]] = obj[key];
    });
    
    return result;
  }
};

// Usage examples
const original = {
  user: {
    name: "John",
    address: {
      city: "New York",
      zipcode: "10001"
    }
  },
  settings: {
    theme: "dark"
  }
};

// Deep clone
const cloned = ObjectUtils.deepClone(original);
cloned.user.name = "Alice";
console.log(original.user.name); // Still "John"

// Filter object
const noZipcode = ObjectUtils.filterObject(original.user.address, 
  (key) => key !== 'zipcode');
console.log(noZipcode); // { city: "New York" }

// Flatten nested object
const flat = ObjectUtils.flatten(original);
console.log(flat); 
// { 'user.name': 'John', 'user.address.city': 'New York', ... }

// Unflatten back to nested
const nested = ObjectUtils.unflatten(flat);
console.log(nested.user.address.city); // "New York"`,
          exercise: {
            instructions:
              'Create an object transformation library with functions for: 1) Deep cloning objects with circular reference handling, 2) Comparing objects for deep equality, 3) Creating immutable objects with a proxy-based approach, 4) Transforming object structures by adding/removing/renaming properties, and 5) Converting between different object formats (e.g., flat vs. nested).',
          },
        },
      ],
      prepperSummary: `
    <div class="prepper-summary">
      <h3>🔑 Key Interview Takeaways</h3>
      <ul>
        <li><strong>Object Basics:</strong> Master creating and modifying objects, understanding property descriptors, and using different property access methods effectively.</li>
        
        <li><strong>Creation Patterns:</strong> Know the trade-offs between constructor functions, ES6 classes, factory functions, and Object.create for different scenarios.</li>
        
        <li><strong>Object Methods:</strong> Understand how to use Object.keys, Object.values, Object.entries, Object.assign, and other built-in methods for manipulation.</li>
        
        <li><strong>Immutability:</strong> Be familiar with different patterns for creating immutable objects with Object.freeze or through custom approaches.</li>
        
        <li><strong>Performance:</strong> Consider memory usage, property lookup efficiency, and inheritance patterns when choosing object approaches.</li>
      </ul>
      
      <h4>📝 Common Interview Questions</h4>
      <ol>
        <li>"What's the difference between Object.freeze and Object.seal?"</li>
        <li>"Compare ES6 classes with constructor functions and factory functions"</li>
        <li>"How would you implement private properties in JavaScript objects?"</li>
        <li>"What's the purpose of Object.create, and when would you use it?"</li>
        <li>"How would you perform a deep copy of an object with nested properties?"</li>
      </ol>
    </div>
  `,
    }, // end of lesson 1
    {
      title: 'Arrays and Array Methods',
      description: 'Master JavaScript arrays and their powerful built-in methods.',
      sections: [
        {
          title: 'Array Basics and Creation',
          explanation: `
        <p>Arrays in JavaScript are versatile ordered collections that can store any type of data.</p>
        
        <h4>Creating and Initializing Arrays</h4>
        <p>JavaScript offers multiple ways to create arrays, from literals to constructors to specialized methods like <code>Array.from</code> and <code>Array.of</code>. Each approach has advantages for different scenarios.</p>

        <p>Creating arrays with the right initial values is crucial for many algorithms. Methods like <code>Array.from</code> are especially powerful as they can transform array-like objects and create arrays with computed values in a single step.</p>
        
        <div class="code-example">
          <pre><code>// Array literal notation
const numbers = [1, 2, 3, 4, 5];
const empty = [];
const mixed = [1, "two", { three: 3 }, [4]];

// Array constructor
const digits = new Array(1, 2, 3, 4, 5);  // [1, 2, 3, 4, 5]
const zeros = new Array(5);               // Array with 5 empty slots!

// Creating from other sources
const arrayLike = { 0: 'a', 1: 'b', 2: 'c', length: 3 };
const fromLike = Array.from(arrayLike);   // ['a', 'b', 'c']

const set = new Set([1, 2, 3, 1, 2]);     // Set removes duplicates
const uniqueArr = Array.from(set);        // [1, 2, 3]

const filled = Array(5).fill(0);          // [0, 0, 0, 0, 0]
const squares = Array.from({length: 5}, (_, i) => i * i); // [0, 1, 4, 9, 16]</code></pre>
        </div>
        
        <h4>Accessing and Modifying Arrays</h4>
        <p>Arrays are accessed using zero-based indices, and JavaScript provides ways to access from both the beginning and end of the array. The <code>length</code> property can both read and modify the array size.</p>

        <p>Understanding array mutability is essential - many array operations modify the original array rather than returning a new one, which can lead to unexpected behavior if not properly managed.</p>
        
        <div class="code-example">
          <pre><code>// Accessing elements
console.log(numbers[0]);                 // 1
console.log(numbers[numbers.length - 1]); // 5
console.log(numbers.at(-1));             // 5 (ES2022)

// Modifying elements
numbers[0] = 10;                         // [10, 2, 3, 4, 5]

// Length property
console.log(numbers.length);             // 5
numbers.length = 3;                      // Truncates to [10, 2, 3]

// Sparse arrays
const sparse = [1, , 3, 4];              // [1, empty, 3, 4]
console.log(0 in sparse);                // true
console.log(1 in sparse);                // false (empty slot)

// Multi-dimensional arrays
const matrix = [
  [1, 2, 3],
  [4, 5, 6],
  [7, 8, 9]
];
console.log(matrix[1][2]);               // 6</code></pre>
        </div>
        
        <div class="interview-tip">
          <p><span class="interview-icon">🎯</span> <strong>Interview Focus:</strong> Be prepared to discuss the different ways to create arrays, how to handle sparse arrays, and common array operations.</p>
          <p>Key areas to understand:</p>
          <ul>
            <li>The difference between Array() constructor with one vs. multiple arguments</li>
            <li>Converting array-like objects to true arrays</li>
            <li>Efficiently creating and initializing arrays of specific values</li>
            <li>How sparse arrays behave differently from dense arrays</li>
            <li>Memory considerations for large arrays and multidimensional structures</li>
          </ul>
        </div>
      `,
          codeExample: `// Matrix utility functions
const MatrixUtils = {
  // Create a matrix of given dimensions with custom values
  create(rows, cols, generator = () => 0) {
    return Array.from({ length: rows }, (_, i) => 
      Array.from({ length: cols }, (_, j) => 
        typeof generator === 'function' ? generator(i, j) : generator
      )
    );
  },
  
  // Print a matrix in a readable format
  print(matrix) {
    return matrix.map(row => row.join(' ')).join('\\n');
  },
  
  // Transpose a matrix (convert rows to columns)
  transpose(matrix) {
    if (!matrix.length) return [];
    
    const rows = matrix.length;
    const cols = matrix[0].length;
    
    return Array.from({ length: cols }, (_, col) => 
      Array.from({ length: rows }, (_, row) => matrix[row][col])
    );
  },
  
  // Multiply two matrices
  multiply(a, b) {
    if (!a.length || !b.length || a[0].length !== b.length) {
      throw new Error('Invalid matrix dimensions for multiplication');
    }
    
    const aRows = a.length;
    const aCols = a[0].length;
    const bCols = b[0].length;
    
    const result = this.create(aRows, bCols);
    
    for (let i = 0; i < aRows; i++) {
      for (let j = 0; j < bCols; j++) {
        let sum = 0;
        for (let k = 0; k < aCols; k++) {
          sum += a[i][k] * b[k][j];
        }
        result[i][j] = sum;
      }
    }
    
    return result;
  },
  
  // Rotate matrix 90 degrees clockwise
  rotateClockwise(matrix) {
    if (!matrix.length) return [];
    
    const rows = matrix.length;
    const cols = matrix[0].length;
    
    // Create a new matrix with swapped dimensions
    const result = this.create(cols, rows);
    
    for (let i = 0; i < rows; i++) {
      for (let j = 0; j < cols)
      ) {
        // i, j in original becomes j, (rows-1-i) in rotated
        result[j][rows - 1 - i] = matrix[i][j];
      }
    }
    
    return result;
  },
  
  // Add two matrices
  add(a, b) {
    if (!a.length || !b.length || 
        a.length !== b.length || 
        a[0].length !== b[0].length) {
      throw new Error('Matrices must have the same dimensions');
    }
    
    return a.map((row, i) => 
      row.map((val, j) => val + b[i][j])
    );
  }
};

// Usage examples
const identityMatrix = MatrixUtils.create(3, 3, (i, j) => i === j ? 1 : 0);
console.log('Identity matrix:');
console.log(MatrixUtils.print(identityMatrix));
// 1 0 0
// 0 1 0
// 0 0 1

const matrixA = MatrixUtils.create(2, 3, (i, j) => i + j);
console.log('\\nMatrix A:');
console.log(MatrixUtils.print(matrixA));
// 0 1 2
// 1 2 3

const matrixB = MatrixUtils.create(3, 2, (i, j) => i * j + 1);
console.log('\\nMatrix B:');
console.log(MatrixUtils.print(matrixB));
// 1 1
// 1 2
// 1 3

console.log('\\nA × B:');
const product = MatrixUtils.multiply(matrixA, matrixB);
console.log(MatrixUtils.print(product));
// 5 11
// 8 17

console.log('\\nTranspose of A:');
const transposed = MatrixUtils.transpose(matrixA);
console.log(MatrixUtils.print(transposed));
// 0 1
// 1 2
// 2 3`,
          exercise: {
            instructions:
              'Implement a matrix library with additional functions for determinant calculation, matrix inversion, and finding eigenvalues. Add functions to check if a matrix is symmetric, diagonal, or invertible. Create a method to solve systems of linear equations represented as matrices. Demonstrate your library with examples of solving real-world problems like transformations in computer graphics.',
          },
        },
        {
          title: 'Array Methods for Transformation',
          explanation: `
        <p>JavaScript arrays include a comprehensive set of methods for transforming data, enabling powerful functional programming patterns.</p>
        
        <h4>Map, Filter and Reduce</h4>
        <p>These three methods form the cornerstone of functional array processing in JavaScript. They allow you to transform arrays, select elements based on criteria, and accumulate values without mutating the original array.</p>

        <p>What makes these methods so powerful is their declarative nature - they express what you want to achieve rather than how to achieve it. This leads to code that's:</p>
        <ul>
          <li><strong>More readable</strong> - The intent is clearer with map/filter/reduce than with loops</li>
          <li><strong>Less error-prone</strong> - No loop counters to manage or boundary conditions to check</li>
          <li><strong>More maintainable</strong> - Each operation is isolated and can be understood independently</li>
          <li><strong>Chainable</strong> - Operations can be composed in sequence for complex transformations</li>
        </ul>
        
        <div class="code-example">
          <pre><code>// map - transform each element
const numbers = [1, 2, 3, 4, 5];
const doubled = numbers.map(num => num * 2);     // [2, 4, 6, 8, 10]

// filter - keep elements that pass a test
const evens = numbers.filter(num => num % 2 === 0); // [2, 4]

// reduce - accumulate a single result
const sum = numbers.reduce((total, num) => total + num, 0); // 15

// Advanced reduce example
const fruits = ['apple', 'banana', 'apple', 'orange', 'banana', 'apple'];
const fruitCount = fruits.reduce((counts, fruit) => {
  counts[fruit] = (counts[fruit] || 0) + 1;
  return counts;
}, {});
// { apple: 3, banana: 2, orange: 1 }</code></pre>
        </div>
        
        <h4>Slicing, Splicing and Combining</h4>
        <p>JavaScript provides both mutating and non-mutating methods for working with array segments. Understanding which methods modify the original array is crucial for writing predictable code.</p>

        <p>Key distinctions to keep in mind:</p>
        <ul>
          <li><strong>Non-mutating methods</strong> like <code>slice</code> and <code>concat</code> return new arrays, preserving the original</li>
          <li><strong>Mutating methods</strong> like <code>splice</code> modify the array in place, which can be efficient but potentially dangerous</li>
          <li>The spread operator (<code>...</code>) provides a concise syntax for combining arrays without mutation</li>
          <li>When working with large arrays, consider the performance implications of creating new arrays versus modifying existing ones</li>
        </ul>
        
        <div class="code-example">
          <pre><code>// slice - non-mutating subset
const arr = [1, 2, 3, 4, 5];
const sliced = arr.slice(1, 4);          // [2, 3, 4]
console.log(arr);                        // [1, 2, 3, 4, 5] (unchanged)

// splice - mutating operation to add/remove
const letters = ['a', 'b', 'c', 'd', 'e'];
const removed = letters.splice(1, 2, 'X', 'Y'); // ['b', 'c']
console.log(letters);                    // ['a', 'X', 'Y', 'd', 'e']

// concat and spread for combining
const combined = [1, 2].concat([3, 4], [5]); // [1, 2, 3, 4, 5]
const withSpread = [...[1, 2], ...[3, 4]];   // [1, 2, 3, 4]</code></pre>
        </div>
        
        <h4>Flattening, Sorting, and Chaining</h4>
        <p>Modern JavaScript includes advanced array methods for flattening nested structures, sorting elements, and combining operations into processing pipelines.</p>

        <p>These methods are particularly valuable when working with:</p>
        <ul>
          <li><strong>Complex data structures</strong> - nested arrays from API responses or tree-like data</li>
          <li><strong>Data processing</strong> - transforming raw data into structured formats for display or analysis</li>
          <li><strong>Functional programming patterns</strong> - creating data transformation pipelines with method chaining</li>
          <li><strong>Custom sorting logic</strong> - ordering elements based on complex criteria or multiple properties</li>
        </ul>
        
        <div class="code-example">
          <pre><code>// Flattening nested arrays
const nested = [1, [2, 3], [4, [5, 6]]];
const flat1 = nested.flat();             // [1, 2, 3, 4, [5, 6]]
const flatAll = nested.flat(Infinity);   // [1, 2, 3, 4, 5, 6]

// flatMap - map and then flatten
const sentences = ['Hello world', 'JS arrays'];
const words = sentences.flatMap(s => s.split(' ')); // ['Hello', 'world', 'JS', 'arrays']

// sort - mutating operation
const unsorted = [5, 3, 1, 4, 2];
unsorted.sort();                         // [1, 2, 3, 4, 5]

// Custom sort comparator
const users = [
  { name: 'John', age: 30 },
  { name: 'Alice', age: 25 }
];
users.sort((a, b) => a.age - b.age);     // sorts by age ascending

// Method chaining for complex transformations
const result = [1, 2, 3, 4, 5, 6, 7, 8]
  .filter(n => n % 2 === 0)    // [2, 4, 6, 8]
  .map(n => n * n)             // [4, 16, 36, 64]
  .reduce((sum, n) => sum + n, 0); // 120</code></pre>
        </div>
        
        <div class="interview-tip">
          <p><span class="interview-icon">🎯</span> <strong>Interview Focus:</strong> Be prepared to discuss functional programming patterns, method chaining, and the differences between mutating and non-mutating array methods.</p>
          <p>Key concepts to master:</p>
          <ul>
            <li>Using map, filter, and reduce for complex data transformations</li>
            <li>Performance implications of chaining multiple array methods</li>
            <li>Creating non-mutating alternatives to mutating methods like sort</li>
            <li>How flatMap can be more efficient than map().flat()</li>
            <li>Common interview questions involving array transformations</li>
          </ul>
        </div>
      `,
          codeExample: `// Product catalog data transformation utilities
function createProductUtils(products) {
  return {
    // Filter products by one or more conditions
    filter(filters) {
      return products.filter(product => {
        for (const [key, value] of Object.entries(filters)) {
          // Handle price ranges
          if (key === 'minPrice' && product.price < value) return false;
          if (key === 'maxPrice' && product.price > value) return false;
          
          // Handle exact matching
          if (key !== 'minPrice' && key !== 'maxPrice' && 
              product[key] !== value) return false;
        }
        return true;
      });
    },
    
    // Transform products for display
    formatForDisplay() {
      return products.map(product => ({
        id: product.id,
        title: product.name,
        price: \`$\${product.price.toFixed(2)}\`,
        category: product.category,
        isInStock: product.stock > 0 ? 'Yes' : 'No',
        rating: '★'.repeat(Math.round(product.rating)) + 
                '☆'.repeat(5 - Math.round(product.rating))
      }));
    },
    
    // Sort products by different criteria
    sort(field, direction = 'asc') {
      const multiplier = direction.toLowerCase() === 'desc' ? -1 : 1;
      
      return [...products].sort((a, b) => {
        let valueA = a[field];
        let valueB = b[field];
        
        // Handle string comparison
        if (typeof valueA === 'string' && typeof valueB === 'string') {
          return multiplier * valueA.localeCompare(valueB);
        }
        
        // Handle numeric comparison
        return multiplier * (valueA - valueB);
      });
    },
    
    // Group products by a field
    groupBy(field) {
      return products.reduce((groups, product) => {
        const key = product[field];
        if (!groups[key]) {
          groups[key] = [];
        }
        groups[key].push(product);
        return groups;
      }, {});
    },
    
    // Calculate statistics across products
    getStats() {
      if (!products.length) {
        return { count: 0 };
      }
      
      const priceSum = products.reduce((sum, p) => sum + p.price, 0);
      const stockSum = products.reduce((sum, p) => sum + p.stock, 0);
      
      return {
        count: products.length,
        totalValue: products.reduce((sum, p) => sum + p.price * p.stock, 0),
        averagePrice: priceSum / products.length,
        totalStock: stockSum,
        categories: [...new Set(products.map(p => p.category))].length,
        highestRated: [...products].sort((a, b) => b.rating - a.rating)[0]
      };
    },
    
    // Chain multiple operations
    chain() {
      let currentProducts = [...products];
      
      return {
        filter(filters) {
          const utils = createProductUtils(currentProducts);
          currentProducts = utils.filter(filters);
          return this;
        },
        
        sort(field, direction) {
          const utils = createProductUtils(currentProducts);
          currentProducts = utils.sort(field, direction);
          return this;
        },
        
        formatForDisplay() {
          const utils = createProductUtils(currentProducts);
          return utils.formatForDisplay();
        },
        
        getStats() {
          const utils = createProductUtils(currentProducts);
          return utils.getStats();
        },
        
        result() {
          return currentProducts;
        }
      };
    }
  };
}

// Sample products for demonstration
const products = [
  { id: 1, name: 'Laptop', price: 999.99, category: 'Electronics', stock: 45, rating: 4.5 },
  { id: 2, name: 'Phone', price: 699.99, category: 'Electronics', stock: 123, rating: 4.8 },
  { id: 3, name: 'Desk Chair', price: 249.50, category: 'Furniture', stock: 12, rating: 3.9 },
  { id: 4, name: 'Coffee Maker', price: 89.99, category: 'Appliances', stock: 42, rating: 4.2 },
  { id: 5, name: 'Headphones', price: 199.99, category: 'Electronics', stock: 89, rating: 4.7 }
];

const productUtils = createProductUtils(products);

// Filter electronics under $500
const cheapElectronics = productUtils.filter({
  category: 'Electronics', 
  maxPrice: 500
});
console.log(cheapElectronics);

// Get formatted products sorted by price
const formattedProducts = productUtils
  .chain()
  .sort('price', 'asc')
  .formatForDisplay();
console.log(formattedProducts);

// Group by category and get stats
const groupedByCategory = productUtils.groupBy('category');
console.log(groupedByCategory.Electronics.length); // 3

const stats = productUtils.getStats();
console.log(\`Average price: $\${stats.averagePrice.toFixed(2)}\`);
console.log(\`Total inventory value: $\${stats.totalValue.toFixed(2)}\`);`,
          exercise: {
            instructions:
              'Create a data analysis pipeline for an e-commerce dataset using array methods. Implement functions to: 1) Filter products by multiple criteria including price range, category, and availability, 2) Calculate key metrics like revenue by category and average product ratings, 3) Transform the data for different visualizations, 4) Identify top-selling products and trending categories, and 5) Generate periodic reports comparing performance across time periods. Use method chaining to create flexible queries against the data.',
          },
        },
        {
          title: 'Array Methods for Searching and Iteration',
          explanation: `
        <p>JavaScript provides specialized methods for finding elements and iterating through arrays efficiently.</p>
        
        <h4>Finding Elements</h4>
        <p>Array search methods allow for finding elements or their positions based on values or custom conditions. These methods make searching arrays more straightforward than manual loops.</p>

        <p>The search methods fall into distinct categories with different use cases:</p>
        <ul>
          <li><strong>Value-based methods</strong> (<code>includes</code>, <code>indexOf</code>, <code>lastIndexOf</code>) search for exact values and are most efficient for primitive types</li>
          <li><strong>Predicate-based methods</strong> (<code>find</code>, <code>findIndex</code>) search using custom test functions for more complex criteria</li>
          <li><strong>Index access</strong> - direct indexing or the newer <code>at()</code> method which handles negative indices naturally</li>
          <li><strong>Performance considerations</strong> - for large arrays or frequent searches, consider alternative data structures like Set or Map</li>
        </ul>
        
        <div class="code-example">
          <pre><code>// Basic array for examples
const numbers = [10, 20, 30, 40, 50];

// find - returns first matching element
const found = numbers.find(num => num > 25);           // 30

// findIndex - returns index of first match
const foundIndex = numbers.findIndex(num => num > 25); // 2

// includes - checks if array includes a value
console.log(numbers.includes(30));                     // true
console.log(numbers.includes(60));                     // false

// indexOf - returns first index of value
console.log(numbers.indexOf(30));                      // 2
console.log(numbers.lastIndexOf(30));                  // 2 (searches from end)</code></pre>
        </div>
        
        <h4>Array Iteration Methods</h4>
        <p>JavaScript offers many ways to iterate through arrays, from traditional loops to more specialized methods that improve code readability and reduce common errors.</p>

        <p>Each iteration approach has distinctive characteristics:</p>
        <ul>
          <li><strong>forEach</strong> - Simple iteration with side effects, no return value</li>
          <li><strong>every/some</strong> - Testing all/any elements against a condition</li>
          <li><strong>for...of</strong> - Clean syntax for accessing values directly, supports break/continue</li>
          <li><strong>Classic for loops</strong> - Maximum control, access to both index and value</li>
          <li><strong>Declarative methods</strong> (map, filter, reduce) - Functional approach for transformations</li>
        </ul>
        
        <div class="code-example">
          <pre><code>// forEach - perform action on each item
numbers.forEach((num, index) => {
  console.log(\`\${index}: \${num}\`);
});

// every - test if all elements pass
const allPositive = numbers.every(num => num > 0);     // true

// some - test if at least one element passes
const hasEven = numbers.some(num => num % 2 === 0);    // true

// Different iteration approaches
// 1. for...of loop
for (const num of numbers) {
  // Access each element directly
}

// 2. Classic for loop
for (let i = 0; i < numbers.length; i++) {
  // Can access both index (i) and value (numbers[i])
}

// 3. Optimized for loop (caches length)
for (let i = 0, len = numbers.length; i < len; i++) {
  // More efficient for large arrays
}</code></pre>
        </div>
        
        <h4>Custom Iterators and Search Algorithms</h4>
        <p>For specialized needs, JavaScript allows implementing custom iteration behavior and search algorithms that go beyond built-in methods.</p>

        <p>Advanced iteration and searching techniques include:</p>
        <ul>
          <li><strong>Custom iterators</strong> with the <code>Symbol.iterator</code> protocol</li>
          <li><strong>Generator functions</strong> for creating iterables with minimal code</li>
          <li><strong>Binary search</strong> and other efficient algorithms for sorted collections</li>
          <li><strong>Specialized iteration patterns</strong> like pagination, lazy evaluation, and limited iteration</li>
          <li><strong>Performance optimization</strong> for large datasets where built-in methods might be inefficient</li>
        </ul>
        
        <div class="code-example">
          <pre><code>// Custom iterable object
const customIterable = {
  data: [1, 2, 3, 4, 5],
  [Symbol.iterator]() {
    let index = 0;
    const data = this.data;
    
    return {
      next() {
        if (index < data.length) {
          return { value: data[index++], done: false };
        } else {
          return { done: true };
        }
      }
    };
  }
};

// Generators for iteration
function* fibonacci(n) {
  let current = 0, next = 1;
  for (let i = 0; i < n; i++) {
    yield current;
    [current, next] = [next, current + next];
  }
}

// Using the generator
for (const fib of fibonacci(10)) {
  console.log(fib); // 0, 1, 1, 2, 3, 5, 8, 13, 21, 34
}

// Binary search implementation (for sorted arrays)
function binarySearch(arr, target) {
  let left = 0;
  let right = arr.length - 1;
  
  while (left <= right) {
    const mid = Math.floor((left + right) / 2);
    
    if (arr[mid] === target) return mid;
    if (arr[mid] < target) left = mid + 1;
    else right = mid - 1;
  }
  
  return -1; // Not found
}</code></pre>
        </div>
        
        <div class="interview-tip">
          <p><span class="interview-icon">🎯</span> <strong>Interview Focus:</strong> Be prepared to discuss search algorithms, iteration performance, and implementing custom iterators.</p>
          <p>Key points to understand:</p>
          <ul>
            <li>Differences between find, findIndex, includes, and indexOf</li>
            <li>Performance considerations for different iteration methods</li>
            <li>Implementing and using binary search for sorted arrays</li>
            <li>Creating custom iterators and generators</li>
            <li>Handling large datasets efficiently with pagination and virtualization</li>
          </ul>
        </div>
      `,
          codeExample: `// Advanced search utility library
const SearchUtils = {
  // Binary search for sorted arrays
  binarySearch(array, target, compareFn = (a, b) => a - b) {
    let left = 0;
    let right = array.length - 1;
    
    while (left <= right) {
      const mid = Math.floor((left + right) / 2);
      const comparison = compareFn(array[mid], target);
      
      if (comparison === 0) return mid;
      if (comparison < 0) left = mid + 1;
      else right = mid - 1;
    }
    
    return -1;
  },
  
  // Binary search for objects by property
  binarySearchBy(array, property, target) {
    return this.binarySearch(array, target, (item, target) => {
      return item[property] - target;
    });
  },
  
  // Fuzzy search for strings (returns items with similarity score)
  fuzzySearch(array, query, property = null) {
    query = query.toLowerCase();
    const matches = [];
    
    for (let i = 0; i < array.length; i++) {
      const item = array[i];
      const text = property ? item[property].toLowerCase() : item.toLowerCase();
      
      // Simple matching algorithm: count matched characters in sequence
      let score = 0;
      let queryIndex = 0;
      
      for (let j = 0; j < text.length; j++) {
        if (queryIndex < query.length && text[j] === query[queryIndex]) {
          score++;
          queryIndex++;
        }
      }
      
      // Match quality: percentage of query that matched
      const matchQuality = queryIndex / query.length;
      
      if (matchQuality > 0.5) { // Threshold for considering it a match
        matches.push({
          item,
          index: i,
          score: matchQuality
        });
      }
    }
    
    // Sort matches by score (best matches first)
    return matches.sort((a, b) => b.score - a.score);
  },
  
  // Deep search in nested objects and arrays
  deepSearch(data, searchFn) {
    const results = [];
    
    function search(item, path = []) {
      // Check if current item matches
      if (searchFn(item)) {
        results.push({ item, path: [...path] });
      }
      
      // Search within arrays
      if (Array.isArray(item)) {
        for (let i = 0; i < item.length; i++) {
          search(item[i], [...path, i]);
        }
      } 
      // Search within objects
      else if (item && typeof item === 'object') {
        for (const key of Object.keys(item)) {
          search(item[key], [...path, key]);
        }
      }
    }
    
    search(data);
    return results;
  },
  
  // Create paginated iterator for large arrays
  createPaginator(array, pageSize = 10) {
    return {
      *[Symbol.iterator]() {
        for (let i = 0; i < array.length; i += pageSize) {
          yield array.slice(i, i + pageSize);
        }
      },
      
      // Helper to get specific page
      getPage(pageNumber) {
        const start = (pageNumber - 1) * pageSize;
        return array.slice(start, start + pageSize);
      },
      
      totalPages: Math.ceil(array.length / pageSize),
      totalItems: array.length
    };
  },
  
  // Performance test for different search methods
  performanceTest(array, target, iterations = 1000) {
    // Linear search timing
    const startLinear = performance.now();
    for (let i = 0; i < iterations; i++) {
      array.indexOf(target);
    }
    const linearTime = performance.now() - startLinear;
    
    // Binary search timing
    const sorted = [...array].sort((a, b) => a - b);
    const startBinary = performance.now();
    for (let i = 0; i < iterations; i++) {
      this.binarySearch(sorted, target);
    }
    const binaryTime = performance.now() - startBinary;
    
    return {
      linearSearch: linearTime,
      binarySearch: binaryTime,
      improvement: linearTime / binaryTime,
      message: \`Binary search was \${(linearTime / binaryTime).toFixed(2)}x faster\`
    };
  }
};

// Usage examples
const users = [
  { id: 1, name: 'Alice', email: 'alice@example.com' },
  { id: 2, name: 'Bob', email: 'bob@example.com' },
  { id: 3, name: 'Charlie', email: 'charlie@example.com' }
];

// Binary search by ID
const sortedUsers = [...users].sort((a, b) => a.id - b.id);
const foundIndex = SearchUtils.binarySearchBy(sortedUsers, 'id', 2);
console.log(sortedUsers[foundIndex]); // Bob's user object

// Fuzzy search
const names = ['John', 'Jonathan', 'Jane', 'Jack', 'Joseph'];
const fuzzyResults = SearchUtils.fuzzySearch(names, 'jon');
console.log(fuzzyResults);
// Matches 'Jonathan' and 'John' with scores

// Deep search in nested structure
const nestedData = {
  users: [
    { id: 1, name: 'Alice', preferences: { theme: 'dark' } },
    { id: 2, name: 'Bob', preferences: { theme: 'light' } }
  ],
  settings: { version: '1.0.0' }
};

const darkThemeUsers = SearchUtils.deepSearch(nestedData, (item) => 
  item && item.theme === 'dark'
);
console.log(darkThemeUsers); // Finds Alice's preferences

// Pagination
const largeArray = Array.from({ length: 100 }, (_, i) => i + 1);
const paginator = SearchUtils.createPaginator(largeArray, 10);

console.log(paginator.totalPages); // 10
console.log(paginator.getPage(2)); // [11, 12, 13, ..., 20]

// Iterate through pages
for (const page of paginator) {
  // Each page is an array of 10 items
  console.log(\`Page with \${page.length} items\`);
}`,
          exercise: {
            instructions:
              'Implement an advanced search library for a music streaming application. Create functions that can: 1) Search songs by title, artist, or album with fuzzy matching, 2) Implement a binary search for quickly finding songs in a sorted playlist, 3) Create a deep search function that can find matching metadata in nested song objects, 4) Build a generator that can yield songs by genre or year, and 5) Implement pagination for browsing large music libraries efficiently. Add performance benchmarks to compare the efficiency of different search methods.',
          },
        },
      ],
      prepperSummary: `
    <div class="prepper-summary">
      <h3>🔑 Key Interview Takeaways</h3>
      <ul>
        <li><strong>Array Creation:</strong> Be familiar with different ways to create arrays (literals, constructors, Array.from, Array.of), and understand edge cases like the Array constructor single argument behavior.</li>
        
        <li><strong>Array Transformation:</strong> Master functional programming methods like map, filter, reduce, and method chaining for efficient data transformation.</li>
        
        <li><strong>Mutating vs. Non-mutating:</strong> Know which methods modify the original array (splice, sort, reverse) and which return new arrays (slice, map, filter).</li>
        
        <li><strong>Search & Iteration:</strong> Understand the performance implications of different search methods (indexOf vs. binary search) and know when to use specific iteration methods.</li>
        
        <li><strong>Advanced Patterns:</strong> Implement custom iterators, generators, and specialized search algorithms for optimizing array operations.</li>
      </ul>
      
      <h4>📝 Common Interview Questions</h4>
      <ol>
        <li>"What's the difference between map and forEach, and when would you use each?"</li>
        <li>"How would you implement a deep flatten function for nested arrays?"</li>
        <li>"Write a function to find duplicates in an array efficiently"</li>
        <li>"Implement a binary search algorithm for a sorted array"</li>
        <li>"How would you sort an array of objects by a specific property?"</li>
      </ol>
    </div>
  `,
    }, // end of lesson 2
    {
      title: 'Maps, Sets, and Other Collections',
      description: 'Learn about specialized collection types in JavaScript.',
      sections: [
        {
          title: 'Map and WeakMap',
          explanation: `
        <p>Maps are key-value collections with significant advantages over plain objects for many use cases in modern JavaScript.</p>
        
        <h4>Map Basics</h4>
        <p>The Map collection type improves on plain objects by supporting any type of key, maintaining insertion order, and providing convenient iteration methods.</p>

        <p>Key advantages of Map over plain objects include:</p>
        <ul>
          <li><strong>Any value as keys</strong> - unlike objects which only support strings and symbols as keys, Maps can use objects, functions, or any other type as keys</li>
          <li><strong>Size property</strong> - Maps have a built-in size property, unlike objects which require manual counting of keys</li>
          <li><strong>Predictable iteration</strong> - Maps guarantee that iteration will follow insertion order</li>
          <li><strong>Better performance</strong> - for frequent additions and removals, Maps can be more efficient</li>
          <li><strong>No accidental collisions</strong> - Maps won't have key collisions with built-in methods like an object might (e.g., a key named "toString")</li>
        </ul>
        
        <div class="code-example">
          <pre><code>// Creating and using Maps
const userMap = new Map();

// Setting key-value pairs
userMap.set('id1', { name: 'John', age: 30 });
userMap.set('id2', { name: 'Alice', age: 25 });

// Using objects as keys (not possible with regular objects)
const user1 = { id: 1 };
userMap.set(user1, "John's data");

// Getting values
console.log(userMap.get('id1'));     // { name: 'John', age: 30 }
console.log(userMap.has('id3'));     // false
console.log(userMap.size);           // 3

// Deleting entries
userMap.delete('id1');
console.log(userMap.size);           // 2</code></pre>
        </div>
        
        <h4>Map Iteration</h4>
        <p>Maps provide multiple methods for iteration and maintain predictable insertion order, making them superior to objects when order matters or when you need to frequently iterate over all entries.</p>

        <p>Map's iteration methods make it easy to:</p>
        <ul>
          <li>Process all entries in order with <code>forEach</code> or <code>for...of</code> loops</li>
          <li>Iterate only keys or only values when needed</li>
          <li>Convert to and from arrays for using array methods</li>
          <li>Create new Maps from existing data structures</li>
          <li>Implement algorithms that require ordered key-value processing</li>
        </ul>
        
        <div class="code-example">
          <pre><code>// Iterating through a Map
userMap.forEach((value, key) => {
  console.log(\`\${key}: \${JSON.stringify(value)}\`);
});

// Using for...of with entries()
for (const [key, value] of userMap.entries()) {
  console.log(\`\${key}: \${JSON.stringify(value)}\`);
}

// Iterating only keys or values
for (const key of userMap.keys()) { 
  console.log(key); 
}

for (const value of userMap.values()) { 
  console.log(value); 
}

// Converting Map to Array
const entries = Array.from(userMap.entries());
console.log(entries); // [[key1, value1], [key2, value2]]

// Converting Array to Map
const array = [['key1', 'value1'], ['key2', 'value2']];
const newMap = new Map(array);</code></pre>
        </div>
        
        <h4>WeakMap</h4>
        <p>WeakMaps are special Maps that allow their keys to be garbage collected when no other references to them exist. This prevents memory leaks when associating data with objects that might be removed elsewhere.</p>

        <p>WeakMaps are particularly useful for:</p>
        <ul>
          <li><strong>Private data storage</strong> - associating data with objects without extending them</li>
          <li><strong>Managing DOM node metadata</strong> - storing data for DOM elements that might be removed</li>
          <li><strong>Caching object calculations</strong> - without preventing object garbage collection</li>
          <li><strong>Implementing symbol-like unique keys</strong> - that won't create memory leaks</li>
          <li><strong>Memory-efficient object extensions</strong> - in long-running applications</li>
        </ul>
        
        <div class="code-example">
          <pre><code>// WeakMap - keys must be objects
const weakMap = new WeakMap();

// Adding entries
const obj1 = {};
const obj2 = {};

weakMap.set(obj1, 'value1');
weakMap.set(obj2, 'value2');

console.log(weakMap.get(obj1)); // "value1"

// WeakMap limitations:
// 1. Keys must be objects
// 2. Cannot enumerate keys (no .keys(), .values(), or .entries())
// 3. No .size property 
// 4. Cannot be cleared entirely</code></pre>
        </div>
        
        <div class="interview-tip">
          <p><span class="interview-icon">🎯</span> <strong>Interview Focus:</strong> Be prepared to discuss when to use Map vs Object, WeakMap use cases, and performance considerations.</p>
          <p>Key points to understand:</p>
          <ul>
            <li>Performance differences between Map and Object for frequent additions/deletions</li>
            <li>WeakMap's memory management benefits for managing metadata</li>
            <li>Implementing private data patterns with WeakMap</li>
            <li>Using Maps for caching and memoization</li>
            <li>How Maps preserve insertion order, unlike objects in older JavaScript versions</li>
          </ul>
        </div>
      `,
          codeExample: `// Caching system using Map and WeakMap
class CacheSystem {
  constructor(options = {}) {
    // Default options
    this.options = {
      ttl: 60000, // Default time-to-live: 60 seconds
      maxSize: 1000, // Maximum number of entries
      ...options
    };
    
    // Main cache storage
    this.cache = new Map();
    
    // For tracking expiration times
    this.expirations = new Map();
    
    // For object key caching (memory efficient)
    this.objectCache = new WeakMap();
    
    // Statistics
    this.stats = {
      hits: 0,
      misses: 0,
      objectHits: 0,
      objectMisses: 0
    };
  }
  
  // Set a value in the cache
  set(key, value, ttl = this.options.ttl) {
    // Handle object keys specially
    if (typeof key === 'object' && key !== null) {
      this.objectCache.set(key, {
        value,
        expires: ttl ? Date.now() + ttl : null
      });
      return value;
    }
    
    // Enforce cache size limit
    if (this.cache.size >= this.options.maxSize && !this.cache.has(key)) {
      this.evictOldest();
    }
    
    // Set the value
    this.cache.set(key, value);
    
    // Set expiration time if ttl is provided
    if (ttl) {
      const expiresAt = Date.now() + ttl;
      this.expirations.set(key, expiresAt);
      
      // Optional: Set up automatic cleanup
      setTimeout(() => {
        if (this.expirations.get(key) === expiresAt) {
          this.delete(key);
        }
      }, ttl);
    }
    
    return value;
  }
  
  // Get a value from the cache
  get(key) {
    // Handle object keys specially
    if (typeof key === 'object' && key !== null) {
      const entry = this.objectCache.get(key);
      
      if (!entry) {
        this.stats.objectMisses++;
        return undefined;
      }
      
      // Check if expired
      if (entry.expires && entry.expires < Date.now()) {
        this.objectCache.delete(key);
        this.stats.objectMisses++;
        return undefined;
      }
      
      this.stats.objectHits++;
      return entry.value;
    }
    
    // Check if key exists
    if (!this.cache.has(key)) {
      this.stats.misses++;
      return undefined;
    }
    
    // Check if expired
    const expires = this.expirations.get(key);
    if (expires && expires < Date.now()) {
      this.delete(key);
      this.stats.misses++;
      return undefined;
    }
    
    this.stats.hits++;
    return this.cache.get(key);
  }
  
  // Additional methods like delete, clear, getStats, etc.
  // ...
  
  // Evict the oldest entry from the cache
  evictOldest() {
    // Find the oldest entry
    let oldestKey = null;
    let oldestTime = Infinity;
    
    for (const [key, expires] of this.expirations.entries()) {
      if (expires < oldestTime) {
        oldestKey = key;
        oldestTime = expires;
      }
    }
    
    // If we found an expiring entry, delete it
    if (oldestKey) {
      this.delete(oldestKey);
      return;
    }
    
    // Otherwise, delete the first entry (least recently set)
    const firstKey = this.cache.keys().next().value;
    if (firstKey) {
      this.delete(firstKey);
    }
  }
}`,
          exercise: {
            instructions:
              'Implement a versatile caching system using both Map and WeakMap. Your solution should include: 1) Time-based expiration for cached entries, 2) Size limits with least-recently-used eviction, 3) Support for primitive and object keys, 4) Performance metrics tracking (hit rate, miss rate), and 5) Methods to invalidate cache entries based on patterns or prefixes. Compare the performance of Map vs Object for different operations with a benchmarking function.',
          },
        },
        {
          title: 'Set and WeakSet',
          explanation: `
        <p>Sets are specialized collections designed to store unique values, making them perfect for eliminating duplicates and performing set operations.</p>
        
        <h4>Set Fundamentals</h4>
        <p>Sets automatically enforce uniqueness, providing a cleaner alternative to arrays when you need to ensure each value appears only once.</p>

        <p>Key features that make Sets useful include:</p>
        <ul>
          <li><strong>Automatic uniqueness</strong> - duplicates are automatically ignored</li>
          <li><strong>Fast lookup</strong> - checking if a value exists is more efficient than with arrays</li>
          <li><strong>Value equality</strong> - uses the same algorithm as === for primitives and reference equality for objects</li>
          <li><strong>Iteration order</strong> - like Map, Sets maintain insertion order</li>
          <li><strong>Easy conversion</strong> - converting between Sets and Arrays is straightforward</li>
        </ul>
        
        <div class="code-example">
          <pre><code>// Creating and using Sets
const uniqueNumbers = new Set([1, 2, 3, 4, 5]);

// Adding values (duplicates are ignored)
uniqueNumbers.add(5); // No effect (already exists)
uniqueNumbers.add(6);

console.log(uniqueNumbers.size);   // 6
console.log(uniqueNumbers.has(3)); // true
console.log(uniqueNumbers.has(10)); // false

// Removing values
uniqueNumbers.delete(4);
console.log(uniqueNumbers.size);   // 5

// Iterating through a Set
uniqueNumbers.forEach(num => {
  console.log(num);
});

// Converting between Set and Array
const numbersArray = Array.from(uniqueNumbers);
console.log(numbersArray); // [1, 2, 3, 5, 6]

// Remove duplicates from array (common use case)
const duplicatesArray = [1, 2, 2, 3, 4, 4, 5];
const uniqueSet = new Set(duplicatesArray);
console.log([...uniqueSet]); // [1, 2, 3, 4, 5]</code></pre>
        </div>
        
        <h4>Set Operations</h4>
        <p>With Sets, you can implement classical set operations like union, intersection, and difference to work with collections in a mathematical way.</p>

        <p>Common set operations and their applications:</p>
        <ul>
          <li><strong>Union</strong> - combine two sets without duplicates (e.g., merging user permissions)</li>
          <li><strong>Intersection</strong> - find elements common to both sets (e.g., matching criteria)</li>
          <li><strong>Difference</strong> - find elements in one set but not another (e.g., finding new items)</li>
          <li><strong>Symmetric difference</strong> - elements in either set but not both (e.g., exclusive changes)</li>
          <li><strong>Subset/superset</strong> - testing if one set contains or is contained by another</li>
        </ul>
        
        <div class="code-example">
          <pre><code>// Set operations implementation
function union(setA, setB) {
  return new Set([...setA, ...setB]);
}

function intersection(setA, setB) {
  return new Set([...setA].filter(x => setB.has(x)));
}

function difference(setA, setB) {
  return new Set([...setA].filter(x => !setB.has(x)));
}

function symmetricDifference(setA, setB) {
  return new Set(
    [...setA].filter(x => !setB.has(x)).concat(
      [...setB].filter(x => !setA.has(x))
    )
  );
}

function isSuperset(setA, setB) {
  for (const elem of setB) {
    if (!setA.has(elem)) return false;
  }
  return true;
}

// Example usage
const setA = new Set([1, 2, 3, 4]);
const setB = new Set([3, 4, 5, 6]);

console.log([...union(setA, setB)]);              // [1, 2, 3, 4, 5, 6]
console.log([...intersection(setA, setB)]);       // [3, 4]
console.log([...difference(setA, setB)]);         // [1, 2]</code></pre>
        </div>
        
        <h4>WeakSet</h4>
        <p>WeakSets provide a memory-efficient way to track object existence without preventing garbage collection, making them useful for tracking object states without creating memory leaks.</p>

        <p>Typical use cases for WeakSet include:</p>
        <ul>
          <li><strong>DOM element tracking</strong> - marking elements that have been processed</li>
          <li><strong>Object tagging</strong> - flagging objects without modifying them</li>
          <li><strong>Tracking visited objects</strong> - in algorithms that need to avoid cycles</li>
          <li><strong>Permission or capability marking</strong> - tracking which objects have access</li>
          <li><strong>Memory-efficient object grouping</strong> - in long-running applications</li>
        </ul>
        
        <div class="code-example">
          <pre><code>// WeakSet - can only contain objects
const weakSet = new WeakSet();

const obj1 = {};
const obj2 = {};

weakSet.add(obj1);
weakSet.add(obj2);

console.log(weakSet.has(obj1)); // true

// WeakSet limitations:
// 1. Can only contain objects
// 2. Cannot iterate over contents (no forEach)
// 3. No size property
// 4. No clear method

// WeakSet use case: DOM element tracking
const visitedElements = new WeakSet();

function markVisited(element) {
  visitedElements.add(element);
}

function isVisited(element) {
  return visitedElements.has(element);
}

// WeakSet for authorization
const authenticatedUsers = new WeakSet();

function grantAccess(user) {
  authenticatedUsers.add(user);
}

function checkAccess(user) {
  return authenticatedUsers.has(user);
}</code></pre>
        </div>
        
        <div class="interview-tip">
          <p><span class="interview-icon">🎯</span> <strong>Interview Focus:</strong> Be prepared to discuss implementing set operations, using Set for deduplication, and WeakSet applications.</p>
          <p>Key points to understand:</p>
          <ul>
            <li>Time complexity advantages of Set over arrays for uniqueness checking</li>
            <li>Implementing efficient set operations and understanding their algorithms</li>
            <li>Using WeakSet to prevent memory leaks in long-running applications</li>
            <li>Performance considerations for large data sets</li>
            <li>Practical use cases like tracking visited elements, permissions, or object capabilities</li>
          </ul>
        </div>
      `,
          codeExample: `// Social network connections manager using Set
class SocialNetwork {
  constructor() {
    // Store user connections as a map of user ID to set of connections
    this.connections = new Map();
    
    // Track online users
    this.onlineUsers = new Set();
    
    // Track seen content (using WeakSet to avoid memory leaks)
    this.seenContent = new WeakSet();
  }
  
  // Add a new user to the network
  addUser(userId) {
    if (!this.connections.has(userId)) {
      this.connections.set(userId, new Set());
      return true;
    }
    return false;
  }
  
  // Connect two users (bidirectional)
  connect(userId1, userId2) {
    // Ensure both users exist
    this.addUser(userId1);
    this.addUser(userId2);
    
    // Create bidirectional connection
    this.connections.get(userId1).add(userId2);
    this.connections.get(userId2).add(userId1);
  }
  
  // Find mutual connections between two users
  getMutualConnections(userId1, userId2) {
    if (!this.connections.has(userId1) || !this.connections.has(userId2)) {
      return [];
    }
    
    const connections1 = this.connections.get(userId1);
    const connections2 = this.connections.get(userId2);
    
    // Use Set intersection
    return [...connections1].filter(id => connections2.has(id));
  }
  
  // Suggest new connections based on mutual friends
  suggestConnections(userId, maxSuggestions = 5) {
    if (!this.connections.has(userId)) {
      return [];
    }
    
    const userConnections = this.connections.get(userId);
    const suggestions = new Map();
    
    // Check connections of connections (2nd degree)
    for (const connectedId of userConnections) {
      const secondDegree = this.connections.get(connectedId);
      
      for (const potentialId of secondDegree) {
        // Skip if it's the original user or already connected
        if (potentialId === userId || userConnections.has(potentialId)) {
          continue;
        }
        
        // Count mutual friends
        suggestions.set(
          potentialId, 
          (suggestions.get(potentialId) || 0) + 1
        );
      }
    }
    
    // Convert to array and sort by mutual friend count (descending)
    return [...suggestions.entries()]
      .sort((a, b) => b[1] - a[1])
      .slice(0, maxSuggestions)
      .map(([id, mutualCount]) => ({ id, mutualCount }));
  }
  
  // Track user online status
  setUserOnline(userId) {
    this.addUser(userId);
    this.onlineUsers.add(userId);
  }
  
  setUserOffline(userId) {
    this.onlineUsers.delete(userId);
  }
  
  // Track seen content with WeakSet (memory efficient)
  markContentAsSeen(userId, contentObject) {
    // Create user-specific entries in the WeakSet
    const key = { userId, content: contentObject };
    this.seenContent.add(key);
  }
  
  hasUserSeenContent(userId, contentObject) {
    const key = { userId, content: contentObject };
    return this.seenContent.has(key);
  }
}`,
          exercise: {
            instructions:
              "Implement a social network application using Set and WeakSet. Create functions for: 1) Managing user connections (add/remove friends), 2) Finding mutual connections between users, 3) Suggesting new connections based on relationship graphs, 4) Tracking user activity with memory-efficient structures, and 5) Generating analytics about the network's structure. Create a visualization of the user connection graph using arrays of nodes and edges.",
          },
        },
        {
          title: 'JSON and Serialization',
          explanation: `
        <p>JSON (JavaScript Object Notation) is a lightweight data-interchange format that's become the standard for API communication and data storage in web applications.</p>
        
        <h4>Basic JSON Serialization and Parsing</h4>
        <p>JavaScript provides built-in methods to convert between JavaScript objects and JSON strings, making it easy to send data to servers or store it in a standardized format.</p>

        <p>Understanding JSON has several practical benefits:</p>
        <ul>
          <li><strong>API integration</strong> - most web APIs use JSON for data exchange</li>
          <li><strong>Data persistence</strong> - JSON is commonly used for localStorage and sessionStorage</li>
          <li><strong>Configuration</strong> - many tools use JSON for configuration files</li>
          <li><strong>Data transfer</strong> - JSON is more compact than XML and human-readable</li>
          <li><strong>Cross-language compatibility</strong> - JSON is supported by virtually all programming languages</li>
        </ul>
        
        <div class="code-example">
          <pre><code>// Converting JavaScript objects to JSON strings
const user = {
  name: "John",
  age: 30,
  isAdmin: false,
  skills: ["JavaScript", "HTML", "CSS"],
  address: {
    city: "New York",
    zipcode: "10001"
  }
};

// Convert to JSON string
const jsonString = JSON.stringify(user);
console.log(jsonString);
// {"name":"John","age":30,"isAdmin":false,"skills":["JavaScript","HTML","CSS"],"address":{"city":"New York","zipcode":"10001"}}

// Convert back to object
const parsedUser = JSON.parse(jsonString);
console.log(parsedUser.name); // "John"</code></pre>
        </div>
        
        <h4>Advanced JSON Customization</h4>
        <p>Both JSON.stringify() and JSON.parse() accept additional parameters that give you fine-grained control over the serialization and parsing process.</p>

        <p>The customization options allow you to:</p>
        <ul>
          <li><strong>Filter properties</strong> - include only certain properties in the output</li>
          <li><strong>Transform values</strong> - modify how values are serialized or parsed</li>
          <li><strong>Format output</strong> - make JSON more readable with whitespace</li>
          <li><strong>Handle special types</strong> - convert dates, sets, maps, and other non-JSON types</li>
          <li><strong>Implement custom serialization</strong> - with toJSON methods on objects</li>
        </ul>
        
        <div class="code-example">
          <pre><code>// JSON.stringify with parameters (value, replacer, space)
// Pretty-printing with spaces
const prettyJson = JSON.stringify(user, null, 2);
console.log(prettyJson);
/*
{
  "name": "John",
  "age": 30,
  "isAdmin": false,
  ...
}
*/

// Using a replacer function for custom serialization
const jsonWithReplacer = JSON.stringify(user, (key, value) => {
  // Censor the zipcode
  if (key === 'zipcode') return "XXXXX";
  
  // Convert skills array to a string
  if (key === 'skills') return value.join(', ');
  
  return value;
}, 2);

// Using a replacer array to filter properties
const jsonWithFilter = JSON.stringify(user, ['name', 'age', 'skills'], 2);
// Only includes specified properties</code></pre>
        </div>
        
        <h4>Handling Special Cases and Limitations</h4>
        <p>JSON has important limitations to be aware of, such as not supporting circular references, functions, or specialized object types by default.</p>

        <p>Common JSON limitations and solutions:</p>
        <ul>
          <li><strong>Circular references</strong> - objects that reference themselves cause errors</li>
          <li><strong>Date objects</strong> - serialized as strings, losing their Date methods</li>
          <li><strong>Functions</strong> - completely ignored during serialization</li>
          <li><strong>Maps, Sets, etc.</strong> - not directly supported in JSON</li>
          <li><strong>Undefined values</strong> - ignored in objects, converted to null in arrays</li>
        </ul>
        
        <div class="code-example">
          <pre><code>// JSON.parse with reviver function
const dateString = '{"name":"John","birthDate":"1990-05-15"}';
const userWithDate = JSON.parse(dateString, (key, value) => {
  // Convert ISO date strings to Date objects
  if (key === 'birthDate' && typeof value === 'string') {
    return new Date(value);
  }
  return value;
});

console.log(userWithDate.birthDate instanceof Date); // true

// Handling circular references
const circular = {
  name: "Circular Object"
};
circular.self = circular; // Creates a circular reference

try {
  JSON.stringify(circular);
} catch (error) {
  console.log(error.message); // "Converting circular structure to JSON"
}

// Solution: Custom replacer for circular references
function stringifyWithCircular() {
  const visited = new WeakSet();
  
  return function(key, value) {
    if (typeof value !== 'object' || value === null) {
      return value;
    }
    
    // Check for circular reference
    if (visited.has(value)) {
      return '[Circular Reference]';
    }
    
    visited.add(value);
    return value;
  };
}

const safeJsonString = JSON.stringify(circular, stringifyWithCircular(), 2);</code></pre>
        </div>
        
        <div class="interview-tip">
          <p><span class="interview-icon">🎯</span> <strong>Interview Focus:</strong> Be prepared to discuss safe JSON handling, handling edge cases, and performance optimization.</p>
          <p>Key points to understand:</p>
          <ul>
            <li>Handling circular references in complex objects</li>
            <li>Custom serialization for non-JSON-compatible types like Date, Map, Set</li>
            <li>Security concerns with JSON.parse and untrusted data</li>
            <li>Performance implications for large JSON structures</li>
            <li>Schema validation and transformation techniques</li>
          </ul>
        </div>
      `,
          codeExample: `// Advanced JSON handling library
const JSONUtils = {
  // Safely stringify with circular reference handling
  safeStringify(obj, space = 0) {
    const seen = new WeakSet();
    
    return JSON.stringify(obj, (key, value) => {
      if (key === '') return value; // root object
      
      if (typeof value === 'object' && value !== null) {
        if (seen.has(value)) {
          return '[Circular Reference]';
        }
        seen.add(value);
      }
      
      // Handle special types
      if (value instanceof Date) {
        return { __type: 'Date', iso: value.toISOString() };
      }
      
      if (value instanceof RegExp) {
        return { __type: 'RegExp', source: value.source, flags: value.flags };
      }
      
      if (value instanceof Map) {
        return { 
          __type: 'Map', 
          entries: Array.from(value.entries())
        };
      }
      
      if (value instanceof Set) {
        return {
          __type: 'Set',
          values: Array.from(value.values())
        };
      }
      
      if (typeof value === 'function') {
        return { __type: 'Function', name: value.name || 'anonymous' };
      }
      
      return value;
    }, space);
  },
  
  // Parse JSON with reviver for special types
  safeParse(jsonString) {
    return JSON.parse(jsonString, (key, value) => {
      // Skip non-objects or null
      if (typeof value !== 'object' || value === null) {
        return value;
      }
      
      // Handle special type markers
      if (value.__type === 'Date' && value.iso) {
        return new Date(value.iso);
      }
      
      if (value.__type === 'RegExp' && value.source) {
        return new RegExp(value.source, value.flags || '');
      }
      
      if (value.__type === 'Map' && Array.isArray(value.entries)) {
        return new Map(value.entries);
      }
      
      if (value.__type === 'Set' && Array.isArray(value.values)) {
        return new Set(value.values);
      }
      
      return value;
    });
  },
  
  // Flatten a nested object structure
  flatten(obj, delimiter = '.', prefix = '') {
    const result = {};
    
    for (const key in obj) {
      if (Object.prototype.hasOwnProperty.call(obj, key)) {
        const newKey = prefix ? \`\${prefix}\${delimiter}\${key}\` : key;
        
        if (typeof obj[key] === 'object' && obj[key] !== null && 
            !(obj[key] instanceof Date) && 
            !(obj[key] instanceof RegExp)) {
          Object.assign(result, this.flatten(obj[key], delimiter, newKey));
        } else {
          result[newKey] = obj[key];
        }
      }
    }
    
    return result;
  },
  
  // Unflatten an object
  unflatten(obj, delimiter = '.') {
    const result = {};
    
    for (const key in obj) {
      if (Object.prototype.hasOwnProperty.call(obj, key)) {
        const parts = key.split(delimiter);
        let current = result;
        
        for (let i = 0; i < parts.length - 1; i++) {
          const part = parts[i];
          current[part] = current[part] || {};
          current = current[part];
        }
        
        current[parts[parts.length - 1]] = obj[key];
      }
    }
    
    return result;
  }
}`,
          exercise: {
            instructions:
              'Create a robust JSON handling library with functions for: 1) Safely handling circular references during serialization, 2) Automatically converting date strings to Date objects during parsing, 3) Flattening and unflattening nested JSON structures, and 4) Applying schema validation to JSON objects. 5) Implement support for serializing and deserializing Maps and Sets.',
          },
        },
      ],
      prepperSummary: `
    <div class="prepper-summary">
      <h3>🔑 Key Interview Takeaways</h3>
      <ul>
        <li><strong>Maps vs Objects:</strong> Understand when to use Maps over objects (any key type, easy size tracking, predictable iteration order) and the memory benefits of WeakMap for object keys.</li>
        
        <li><strong>Sets for Uniqueness:</strong> Master Set operations (union, intersection, difference) and leverage Sets for efficiently managing unique values and membership testing.</li>
        
        <li><strong>JSON Handling:</strong> Know how to handle complex serialization cases including circular references, custom object types, and schema validation.</li>
        
        <li><strong>Memory Management:</strong> Understand how WeakMap and WeakSet help prevent memory leaks by allowing garbage collection of keys that are no longer referenced elsewhere.</li>
        
        <li><strong>Collection Performance:</strong> Be able to compare performance characteristics of different collection types and choose the most efficient structure for specific use cases.</li>
      </ul>
      
      <h4>📝 Common Interview Questions</h4>
      <ol>
        <li>"What's the difference between Map and Object, and when would you use each?"</li>
        <li>"How would you implement a caching system with expiring entries?"</li>
        <li>"Explain how you would handle circular references when serializing objects to JSON"</li>
        <li>"How would you efficiently find common elements between two arrays?"</li>
        <li>"What are WeakMap and WeakSet, and what problems do they solve?"</li>
      </ol>
    </div>
  `,
    },
    // end of lesson 3
  ],
  challenge: {
    description:
      'Create a data manipulation utility library that demonstrates your understanding of objects and data structures.',
    requirements: [
      'Create functions to manipulate objects (deep clone, merge, filter, transform)',
      'Implement at least two array utility functions (find, sort, filter)',
      'Create a simple cache using Map or WeakMap',
      'Implement basic Set operations (union, intersection, difference)',
      'Write a JSON serialization utility that handles circular references',
    ],
    starterCode: `// Objects and Data Structures Challenge
// Create a utility library called "DataUtils"

const DataUtils = {
  // Object utilities
  deepClone(obj) {
    // Implement a deep clone function
  },
  
  // Array utilities
  findBy(array, key, value) {
    // Find objects in an array that match criteria
  },
  
  // Map/Cache utilities
  createCache(ttl = 0) {
    // Create a caching system with optional time-to-live
  },
  
  // Set utilities
  setOperations: {
    union(setA, setB) {
      // Implement union of two sets
    }
    // Add more set operations
  },
  
  // JSON utilities
  safeStringify(obj) {
    // Safely stringify objects with circular references
  }
};

// Export your library
export default DataUtils;`,
  },
}

export default objectsAndDataStructures
