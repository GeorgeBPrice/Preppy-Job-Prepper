// #JavaScript Design Patterns

// curriculum-section7.js - JavaScript Design Patterns

const javaScriptDesignPatterns = {
  title: 'JavaScript Design Patterns',
  description:
    'Master essential design patterns to create maintainable and scalable JavaScript applications.',
  lessons: [
    {
      title: 'Module Pattern',
      description: 'Learn to create encapsulated code with private and public methods.',
      sections: [
        {
          title: 'Understanding the Module Pattern',
          explanation: `
        <p>The Module pattern is one of the most commonly used design patterns in JavaScript. It provides a way to encapsulate related methods and data to create privacy and avoid polluting the global namespace.</p>
        
        <h4>The Need for Modules</h4>
        <p>JavaScript traditionally lacked a formal module system, causing developers to create variables and functions in the global scope, which could lead to naming conflicts and unintended side effects. The Module pattern emerged as a solution to these problems.</p>
        
        <p>Without modules, JavaScript code suffers from several issues:</p>
        <ul>
          <li><strong>Name collisions</strong> - Different scripts using the same variable names can overwrite each other</li>
          <li><strong>Unclear dependencies</strong> - It's difficult to determine what code depends on what</li>
          <li><strong>No encapsulation</strong> - All code is exposed globally, making it impossible to truly hide implementation details</li>
          <li><strong>Maintenance challenges</strong> - As applications grow, global variables make debugging and refactoring increasingly difficult</li>
        </ul>
        
        <div class="code-example">
          <pre><code>// Problem: Global namespace pollution
var name = 'John';
function sayHello() {
  console.log('Hello, ' + name);
}

// Later in another file/script
var name = 'Jane'; // Overwrites the previous 'name'
sayHello(); // Outputs: "Hello, Jane" (not what the first script expected)</code></pre>
        </div>
        
        <h4>Basic Module Pattern Structure</h4>
        <p>The Module pattern uses an immediately invoked function expression (IIFE) that returns an object containing only the methods and properties you want to expose publicly, while keeping everything else private within the closure.</p>
        
        <p>Key components of the Module pattern include:</p>
        <ul>
          <li><strong>IIFE</strong> - Creates a private scope that's immediately executed</li>
          <li><strong>Private variables/functions</strong> - Defined inside the IIFE but not returned</li>
          <li><strong>Public API</strong> - The returned object with methods that can access the private scope</li>
          <li><strong>Closure</strong> - The mechanism that allows the public methods to maintain access to private variables</li>
        </ul>
        
        <div class="code-example">
          <pre><code>// Basic module pattern
var Calculator = (function() {
  // Private variables and functions
  var result = 0;
  
  function add(a, b) {
    return a + b;
  }
  
  function subtract(a, b) {
    return a - b;
  }
  
  // Public API
  return {
    // Public methods can access private variables and functions
    addNumbers: function(a, b) {
      result = add(a, b);
      return result;
    },
    subtractNumbers: function(a, b) {
      result = subtract(a, b);
      return result;
    },
    getResult: function() {
      return result;
    }
  };
})();</code></pre>
        </div>
        
        <h4>Advantages of the Module Pattern</h4>
        <p>The Module pattern provides encapsulation, allowing you to hide implementation details and expose only a public API, leading to code that's easier to maintain and less prone to conflicts.</p>
        
        <p>Specific benefits include:</p>
        <ul>
          <li><strong>Reduced global scope pollution</strong> - Only your public API is exposed globally</li>
          <li><strong>Information hiding</strong> - Internal details remain private and protected</li>
          <li><strong>Controlled access</strong> - Public methods can validate inputs and control how private data is accessed</li>
          <li><strong>Better organization</strong> - Related code is bundled together in a cohesive unit</li>
          <li><strong>Clearer dependencies</strong> - Dependencies can be imported into the module scope</li>
        </ul>
        
        <div class="code-example">
          <pre><code>// Using the module
Calculator.addNumbers(5, 3); // 8
Calculator.getResult(); // 8

// Private functions and variables are not accessible
// Calculator.add; // undefined
// Calculator.result; // undefined</code></pre>
        </div>
        
        <div class="interview-tip">
          <p><span class="interview-icon">🎯</span> <strong>Interview Focus:</strong> Understanding the Module pattern demonstrates your ability to structure maintainable JavaScript code and shows awareness of encapsulation principles.</p>
          <p>Key points to understand:</p>
          <ul>
            <li>How closures enable data privacy in JavaScript</li>
            <li>The difference between module pattern implementations (IIFE, AMD, CommonJS, ES modules)</li>
            <li>Trade-offs between different module approaches</li>
            <li>How to structure modules for testability</li>
            <li>Modern alternatives like ES6 modules and their advantages</li>
          </ul>
        </div>
      `,
          codeExample: `// Comprehensive Module Pattern Examples

// 1. Classic Module Pattern with Private Data
var UserModule = (function() {
  // Private data
  var users = [];
  var userIdCounter = 1;
  
  // Private functions
  function validateUser(user) {
    return user.name && user.email;
  }
  
  function findUserById(id) {
    return users.find(user => user.id === id);
  }
  
  // Public API
  return {
    addUser: function(user) {
      if (!validateUser(user)) {
        throw new Error('Invalid user object');
      }
      
      const newUser = {
        ...user,
        id: userIdCounter++,
        createdAt: new Date()
      };
      
      users.push(newUser);
      return newUser.id;
    },
    
    getUserById: function(id) {
      const user = findUserById(id);
      
      if (!user) {
        return null;
      }
      
      // Return a copy to prevent external modification
      return { ...user };
    },
    
    updateUser: function(id, updates) {
      const userIndex = users.findIndex(user => user.id === id);
      
      if (userIndex === -1) {
        return false;
      }
      
      // Create a new user object with updates
      users[userIndex] = { 
        ...users[userIndex],
        ...updates,
        updatedAt: new Date()
      };
      
      return true;
    },
    
    removeUser: function(id) {
      const initialLength = users.length;
      users = users.filter(user => user.id !== id);
      return users.length !== initialLength;
    },
    
    getUserCount: function() {
      return users.length;
    }
  };
})();

// 2. Module Pattern with Initialization
var ConfigModule = (function() {
  // Private data
  var config = {
    apiUrl: 'https://api.example.com',
    timeout: 5000,
    retryCount: 3
  };
  
  // Private functions
  function validateConfig(configUpdates) {
    if (configUpdates.timeout && typeof configUpdates.timeout !== 'number') {
      return false;
    }
    
    if (configUpdates.retryCount && 
        (typeof configUpdates.retryCount !== 'number' || configUpdates.retryCount < 0)) {
      return false;
    }
    
    return true;
  }
  
  // Public API
  return {
    init: function(initialConfig) {
      if (initialConfig && validateConfig(initialConfig)) {
        config = { ...config, ...initialConfig };
        console.log('Configuration initialized');
      }
    },
    
    getConfig: function() {
      // Return a copy to prevent external modification
      return { ...config };
    },
    
    updateConfig: function(updates) {
      if (!validateConfig(updates)) {
        throw new Error('Invalid configuration updates');
      }
      
      config = { ...config, ...updates };
      return true;
    },
    
    getConfigValue: function(key) {
      return config[key];
    }
  };
})();

// 3. Module with Revealing Module Pattern
var DataService = (function() {
  // Private data
  var data = [];
  var isInitialized = false;
  
  // Private functions
  function initialize() {
    // Simulate loading initial data
    data = [
      { id: 1, name: 'Item 1' },
      { id: 2, name: 'Item 2' }
    ];
    isInitialized = true;
  }
  
  function validateItem(item) {
    return item && item.name && item.name.length > 0;
  }
  
  function addItem(item) {
    if (!isInitialized) {
      initialize();
    }
    
    if (!validateItem(item)) {
      throw new Error('Invalid item');
    }
    
    const newItem = {
      ...item,
      id: Date.now()
    };
    
    data.push(newItem);
    return newItem;
  }
  
  function getAllItems() {
    if (!isInitialized) {
      initialize();
    }
    
    // Return a copy of the data
    return [...data];
  }
  
  function clearItems() {
    data = [];
  }
  
  // Revealing module pattern - reveal only what you want to be public
  return {
    addItem: addItem,
    getAllItems: getAllItems,
    clearItems: clearItems
  };
})();

// 4. Augmenting Modules
var MathModule = (function() {
  return {
    add: function(a, b) {
      return a + b;
    },
    subtract: function(a, b) {
      return a - b;
    }
  };
})();

// Augment the module with additional functionality
var MathModule = (function(module) {
  module.multiply = function(a, b) {
    return a * b;
  };
  
  module.divide = function(a, b) {
    if (b === 0) {
      throw new Error('Division by zero');
    }
    return a / b;
  };
  
  return module;
})(MathModule || {});

// 5. Modern module pattern with ES6
const TodoModule = (() => {
  // Private variables
  let todos = [];
  let nextId = 1;
  
  // Private methods
  const findById = (id) => todos.find(todo => todo.id === id);
  
  // Return public API
  return {
    addTodo(text) {
      const newTodo = {
        id: nextId++,
        text,
        completed: false,
        createdAt: new Date()
      };
      
      todos.push(newTodo);
      return newTodo;
    },
    
    toggleTodo(id) {
      const todo = findById(id);
      if (todo) {
        todo.completed = !todo.completed;
        return true;
      }
      return false;
    },
    
    getTodos() {
      return [...todos];
    },
    
    removeTodo(id) {
      const count = todos.length;
      todos = todos.filter(todo => todo.id !== id);
      return todos.length !== count;
    }
  };
})();
`,
          exercise: {
            instructions:
              'Create a module for a shopping cart that maintains a private list of items and provides methods to add, remove, and calculate totals. Implement a module for user authentication that securely stores credentials and provides login/logout functionality. Build a module that manages application state and provides methods to update and subscribe to state changes.',
          },
        },
        {
          title: 'ES6 Modules',
          explanation: `
        <p>ES6 introduced a standardized module system directly into JavaScript, providing a more elegant solution for code organization and encapsulation.</p>
        
        <h4>Import and Export Syntax</h4>
        <p>ES6 modules use import and export statements to share functionality between files, with explicit syntax for what gets exported and imported.</p>
        
        <p>The ES6 module system offers several key capabilities:</p>
        <ul>
          <li><strong>Named exports</strong> - Export multiple variables, functions, or classes from a single module</li>
          <li><strong>Default exports</strong> - Designate one main export per module</li>
          <li><strong>Selective imports</strong> - Import only what you need, reducing memory usage</li>
          <li><strong>Namespace imports</strong> - Import everything from a module under a single object</li>
          <li><strong>Dynamic imports</strong> - Load modules conditionally or on-demand using <code>import()</code></li>
        </ul>
        
        <div class="code-example">
          <pre><code>// math.js - exporting functionality
// Named exports
export const PI = 3.14159;
export function add(a, b) {
  return a + b;
}

// Default export
export default function multiply(a, b) {
  return a * b;
}

// main.js - importing functionality
// Named imports
import { PI, add } from './math.js';
console.log(PI); // 3.14159
console.log(add(2, 3)); // 5

// Default import
import multiply from './math.js';
console.log(multiply(2, 3)); // 6

// Importing everything into a namespace
import * as Math from './math.js';
console.log(Math.PI); // 3.14159
console.log(Math.add(2, 3)); // 5
console.log(Math.default(2, 3)); // 6 (default export)</code></pre>
        </div>
        
        <h4>Module Scoping</h4>
        <p>ES6 modules have their own scope, making variables and functions private by default unless explicitly exported, eliminating the need for IIFEs to create private scope.</p>
        
        <p>Important scoping characteristics of ES6 modules:</p>
        <ul>
          <li><strong>Implicit strict mode</strong> - All modules run in strict mode without requiring the directive</li>
          <li><strong>Lexical top-level scope</strong> - Variables aren't added to the global scope</li>
          <li><strong>File-based modules</strong> - Each file is its own module with isolated scope</li>
          <li><strong>Single instance</strong> - Modules are singletons; importing the same module multiple times gives the same instance</li>
          <li><strong>Immutable bindings</strong> - Imported values are read-only references to the exported bindings</li>
        </ul>
        
        <div class="code-example">
          <pre><code>// userService.js
// Private (not exported)
const users = [];
let nextId = 1;

function validateUser(user) {
  return user.name && user.email;
}

// Public (exported)
export function addUser(user) {
  if (!validateUser(user)) {
    throw new Error('Invalid user');
  }
  
  const newUser = { ...user, id: nextId++ };
  users.push(newUser);
  return newUser;
}

export function getUser(id) {
  return users.find(user => user.id === id);
}</code></pre>
        </div>
        
        <h4>Benefits of ES6 Modules</h4>
        <p>ES6 modules offer static analysis (errors at compile time), better dependency management, and explicit imports/exports for improved code clarity, all while maintaining encapsulation.</p>
        
        <p>Specific advantages over older module systems include:</p>
        <ul>
          <li><strong>Static structure</strong> - Imports and exports are static, allowing for better tooling and optimization</li>
          <li><strong>Tree shaking</strong> - Bundlers can eliminate unused code for smaller production builds</li>
          <li><strong>Asynchronous loading</strong> - Modules can be loaded on-demand via dynamic imports</li>
          <li><strong>Better error messages</strong> - Static analysis enables more helpful errors at build time</li>
          <li><strong>Native browser support</strong> - Modern browsers support ES modules directly</li>
          <li><strong>Consistency</strong> - One standard module system across both browser and Node.js environments</li>
        </ul>
        
        <div class="code-example">
          <pre><code>// Before ES6 modules - order of script tags matters
&lt;script src="dependency1.js"&gt;&lt;/script&gt;
&lt;script src="dependency2.js"&gt;&lt;/script&gt;
&lt;script src="main.js"&gt;&lt;/script&gt;

// With ES6 modules - dependencies are explicit in the code
// main.js
import { feature1 } from './dependency1.js';
import { feature2 } from './dependency2.js';

// Can be included with a single script tag
&lt;script type="module" src="main.js"&gt;&lt;/script&gt;</code></pre>
        </div>
        
        <div class="interview-tip">
          <p><span class="interview-icon">🎯</span> <strong>Interview Focus:</strong> Understanding ES6 modules demonstrates knowledge of modern JavaScript practices and application architecture.</p>
          <p>Key points to understand:</p>
          <ul>
            <li>Differences between CommonJS, AMD, and ES6 modules</li>
            <li>How module bundlers like Webpack interact with ES6 modules</li>
            <li>Browser support and the role of transpilers</li>
            <li>Module loading strategies and performance implications</li>
            <li>Circular dependency issues and how to resolve them</li>
          </ul>
        </div>
      `,
          codeExample: `// ES6 Modules Examples

// 1. Multiple Export Styles
// -------------------------
// api.js - Various export styles
// Named exports
export const API_URL = 'https://api.example.com/v1';
export const API_KEY = 'abc123';

// Export a function
export function fetchData(endpoint) {
  const url = \`\${API_URL}/\${endpoint}?key=\${API_KEY}\`;
  return fetch(url).then(response => {
    if (!response.ok) {
      throw new Error(\`HTTP error! Status: \${response.status}\`);
    }
    return response.json();
  });
}

// Export a class
export class ApiClient {
  constructor(config = {}) {
    this.baseUrl = config.baseUrl || API_URL;
    this.apiKey = config.apiKey || API_KEY;
  }
  
  async get(endpoint) {
    const response = await fetch(\`\${this.baseUrl}/\${endpoint}?key=\${this.apiKey}\`);
    if (!response.ok) {
      throw new Error(\`HTTP error! Status: \${response.status}\`);
    }
    return response.json();
  }
  
  // Additional methods...
}

// Default export - typically used for the main functionality of a module
export default class AdvancedApiClient extends ApiClient {
  async post(endpoint, data) {
    const response = await fetch(\`\${this.baseUrl}/\${endpoint}?key=\${this.apiKey}\`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    });
    
    if (!response.ok) {
      throw new Error(\`HTTP error! Status: \${response.status}\`);
    }
    
    return response.json();
  }
}

// 2. Multiple Import Styles
// -------------------------
// app.js - Various import styles
// Named imports
import { API_URL, fetchData } from './api.js';

// Default import
import AdvancedApiClient from './api.js';

// Combining named and default imports
import AdvancedApiClient, { API_URL, fetchData } from './api.js';

// Rename imports to avoid naming conflicts
import { API_URL as API_ENDPOINT, fetchData as fetchApiData } from './api.js';

// Import all exports into a namespace object
import * as Api from './api.js';
// Usage: Api.API_URL, Api.fetchData(), new Api.ApiClient(), new Api.default()

// 3. Module Organization Example
// -----------------------------
// userService.js
import { fetchData } from './api.js';

// Private variables and functions
const USERS_ENDPOINT = 'users';
const userCache = new Map();

function normalizeUser(userData) {
  return {
    id: userData.id,
    name: userData.name || 'Unknown',
    email: userData.email,
    isActive: Boolean(userData.active)
  };
}

// Public exports
export async function getUser(id) {
  // Check cache first
  if (userCache.has(id)) {
    return userCache.get(id);
  }
  
  const userData = await fetchData(\`\${USERS_ENDPOINT}/\${id}\`);
  const normalizedUser = normalizeUser(userData);
  
  // Update cache
  userCache.set(id, normalizedUser);
  
  return normalizedUser;
}

export async function searchUsers(query) {
  const users = await fetchData(\`\${USERS_ENDPOINT}?q=\${encodeURIComponent(query)}\`);
  return users.map(normalizeUser);
}

// 4. Re-exporting Modules
// ----------------------
// services/index.js - Re-exporting multiple services into a single import
export { default as authService } from './authService.js';
export { default as userService } from './userService.js';
export { default as productService } from './productService.js';

// Then in app.js
import { authService, userService, productService } from './services/index.js';

// 5. Dynamic Imports
// ----------------
// app.js - Lazy loading modules
async function loadAdminPanel() {
  // Only load admin module when needed
  const { AdminPanel } = await import('./adminModule.js');
  
  // Initialize the dynamically loaded module
  const adminPanel = new AdminPanel();
  adminPanel.initialize();
  
  return adminPanel;
}

// Load when admin button is clicked
document.getElementById('admin-btn').addEventListener('click', async () => {
  const adminPanel = await loadAdminPanel();
  adminPanel.show();
});`,
          exercise: {
            instructions:
              'Create a modular application with separate ES6 modules for: 1) A data service that fetches and processes API data, 2) A UI component that renders data from the service, and 3) A main application module that coordinates between them. Implement proper error handling and demonstrate different import/export patterns. Create a dynamic loading system that only loads certain modules when needed.',
          },
        },
      ],
      prepperSummary: `
    <div class="prepper-summary">
      <h3>🔑 Key Interview Takeaways</h3>
      <ul>
        <li><strong>Module Pattern Purpose:</strong> Encapsulates related code, provides privacy for implementation details, and avoids global namespace pollution.</li>
        
        <li><strong>IIFE Implementation:</strong> Uses an immediately invoked function expression to create private scope, returning only what should be public.</li>
        
        <li><strong>Revealing Module Pattern:</strong> A variation where you define all functions privately, then expose selected ones in the return object for better organization.</li>
        
        <li><strong>ES6 Modules:</strong> The standardized module system that uses import/export syntax, providing cleaner, more maintainable code organization with static analysis benefits.</li>
        
        <li><strong>Module Best Practices:</strong> Single responsibility, clear public API, careful management of dependencies, and proper error handling.</li>
      </ul>
      
      <h4>📝 Common Interview Questions</h4>
      <ol>
        <li>"How does the module pattern achieve encapsulation in JavaScript?"</li>
        <li>"What's the difference between the module pattern and revealing module pattern?"</li>
        <li>"Compare CommonJS modules with ES6 modules"</li>
        <li>"How would you handle circular dependencies in modules?"</li>
        <li>"What are the performance implications of different module systems?"</li>
      </ol>
    </div>
  `,
    },

    {
      title: 'Singleton Pattern',
      description: 'Learn to create exactly one instance of a class that is globally accessible.',
      sections: [
        {
          title: 'Understanding the Singleton Pattern',
          explanation: `
        <p>The Singleton pattern ensures a class has only one instance while providing a global point of access to it, making it ideal for managing shared resources.</p>
        
        <h4>The Singleton Concept</h4>
        <p>A Singleton class restricts instantiation to a single object, ensuring all components work with the same instance, which is especially useful for configuration managers, connection pools, or state stores.</p>
        
        <p>Key characteristics of the Singleton pattern:</p>
        <ul>
          <li><strong>Single instance</strong> - Guarantees that a class has only one instance throughout the application lifecycle</li>
          <li><strong>Global access</strong> - Provides a global point of access to that instance</li>
          <li><strong>Lazy initialization</strong> - Often creates the instance only when first requested</li>
          <li><strong>No parameters</strong> - The constructor is typically private or controlled to prevent multiple instantiations</li>
          <li><strong>State persistence</strong> - The instance maintains its state across the entire application</li>
        </ul>
        
        <div class="code-example">
          <pre><code>// Basic Singleton using an object literal
const ConfigManager = {
  config: {
    apiUrl: 'https://api.example.com',
    timeout: 5000
  },
  
  getConfig() {
    return this.config;
  },
  
  updateConfig(updates) {
    this.config = { ...this.config, ...updates };
  }
};

// Usage
ConfigManager.updateConfig({ timeout: 10000 });
const config = ConfigManager.getConfig();
// There's only one config object shared throughout the application</code></pre>
        </div>
        
        <h4>Implementing Singletons in JavaScript</h4>
        <p>JavaScript offers several ways to implement the Singleton pattern, from simple object literals to more sophisticated class-based implementations that enforce the single instance constraint.</p>
        
        <p>Common implementation approaches include:</p>
        <ul>
          <li><strong>Object literals</strong> - JavaScript objects are singletons by default</li>
          <li><strong>Module pattern</strong> - Using closures to maintain private state with public methods</li>
          <li><strong>Constructor functions</strong> - Using a static property to store and return the instance</li>
          <li><strong>ES6 classes</strong> - Implementing instance checking in the constructor</li>
          <li><strong>ES modules</strong> - Leveraging the fact that modules are only evaluated once</li>
        </ul>
        
        <div class="code-example">
          <pre><code>// Singleton with a class (ES6)
class DatabaseConnection {
  constructor() {
    if (DatabaseConnection.instance) {
      return DatabaseConnection.instance;
    }
    
    // Initialize the instance
    this.connected = false;
    this.connectionString = '';
    DatabaseConnection.instance = this;
  }
  
  connect(connectionString) {
    if (this.connected) {
      console.log('Already connected');
      return;
    }
    
    // Simulate connection
    this.connectionString = connectionString;
    this.connected = true;
    console.log(\`Connected to \${connectionString}\`);
  }
  
  query(sql) {
    if (!this.connected) {
      throw new Error('Not connected to database');
    }
    
    console.log(\`Executing query: \${sql}\`);
    // Actual query logic would go here
  }
  
  disconnect() {
    if (!this.connected) {
      return;
    }
    
    this.connected = false;
    console.log('Disconnected from database');
  }
}

// Usage
const db1 = new DatabaseConnection();
const db2 = new DatabaseConnection();
console.log(db1 === db2); // true - both are the same instance</code></pre>
        </div>
        
        <div class="interview-tip">
          <p><span class="interview-icon">🎯</span> <strong>Interview Focus:</strong> Understanding the Singleton pattern shows your ability to manage shared resources and establish controlled access points.</p>
          <p>Key points to understand:</p>
          <ul>
            <li>When to use Singletons (and when to avoid them)</li>
            <li>How Singletons impact unit testing and code coupling</li>
            <li>Implementation techniques in JavaScript</li>
            <li>Handling initialization and lazy loading</li>
            <li>Thread safety considerations in concurrent environments</li>
          </ul>
        </div>
      `,
          codeExample: `// Singleton Pattern Implementations

// 1. Classic Module-based Singleton
const UserStore = (function() {
  // Private instance variable
  let instance;
  
  // Private data
  let users = [];
  let currentUserId = null;
  
  // Singleton constructor
  function createInstance() {
    return {
      addUser(user) {
        // Ensure user has an ID
        if (!user.id) {
          user.id = Date.now().toString();
        }
        
        // Don't add duplicate users
        if (users.some(u => u.id === user.id)) {
          return false;
        }
        
        users.push(user);
        return true;
      },
      
      removeUser(userId) {
        const initialCount = users.length;
        users = users.filter(user => user.id !== userId);
        
        // If current user was removed, reset currentUserId
        if (userId === currentUserId) {
          currentUserId = null;
        }
        
        return users.length < initialCount;
      },
      
      getUsers() {
        return [...users]; // Return a copy to prevent external modifications
      },
      
      setCurrentUser(userId) {
        if (userId === null) {
          currentUserId = null;
          return true;
        }
        
        const userExists = users.some(user => user.id === userId);
        if (userExists) {
          currentUserId = userId;
          return true;
        }
        return false;
      },
      
      getCurrentUser() {
        if (!currentUserId) return null;
        const user = users.find(u => u.id === currentUserId);
        return user ? { ...user } : null;
      },
      
      clearAllUsers() {
        users = [];
        currentUserId = null;
      }
    };
  }
  
  // Return the Singleton interface
  return {
    // Get the Singleton instance
    getInstance: function() {
      if (!instance) {
        instance = createInstance();
      }
      return instance;
    }
  };
})();

// Usage
const userStore1 = UserStore.getInstance();
const userStore2 = UserStore.getInstance();

console.log(userStore1 === userStore2); // true - same instance

// 2. ES6 Class-based Singleton with Private Fields
class AppState {
  // Static instance property
  static #instance;
  
  // Private data using # (requires modern JS support)
  #state;
  #listeners;
  
constructor() {
    // Return existing instance if it exists
    if (AppState.#instance) {
      return AppState.#instance;
    }
    
    // Initialize the instance
    this.#state = {};
    this.#listeners = new Map();
    AppState.#instance = this;
  }
  
  // Get state
  getState(key) {
    if (key) {
      return this.#state[key];
    }
    return { ...this.#state }; // Return copy of entire state
  }
  
  // Set state
  setState(updates) {
    // Update state
    this.#state = { ...this.#state, ...updates };
    
    // Notify listeners
    for (const [key, listeners] of this.#listeners.entries()) {
      if (key in updates) {
        const newValue = updates[key];
        listeners.forEach(listener => listener(newValue, key));
      }
    }
    
    return this.#state;
  }
  
  // Subscribe to state changes
  subscribe(key, listener) {
    if (!this.#listeners.has(key)) {
      this.#listeners.set(key, new Set());
    }
    
    this.#listeners.get(key).add(listener);
    
    // Return unsubscribe function
    return () => {
      if (this.#listeners.has(key)) {
        this.#listeners.get(key).delete(listener);
      }
    };
  }
  
  // Reset state
  resetState() {
    this.#state = {};
    // Note: We don't reset listeners
  }
}

// 3. Singleton with Lazy Initialization
class DatabaseManager {
  constructor() {
    if (DatabaseManager._instance) {
      return DatabaseManager._instance;
    }
    
    this._connectionPool = null;
    this._config = {
      host: 'localhost',
      maxConnections: 5
    };
    
    DatabaseManager._instance = this;
  }
  
  initialize(config) {
    this._config = { ...this._config, ...config };
    console.log('Database manager initialized with config:', this._config);
    // In a real implementation, setup would happen here
  }
  
  getConnection() {
    // Lazy initialization - only create connection pool when first needed
    if (!this._connectionPool) {
      console.log('Creating new connection pool with config:', this._config);
      this._connectionPool = {
        connections: [],
        maxSize: this._config.maxConnections
      };
      
      // Initialize the pool with connections
      for (let i = 0; i < this._config.maxConnections; i++) {
        this._connectionPool.connections.push({
          id: i,
          inUse: false
        });
      }
    }
    
    // Find available connection
    const availableConnection = this._connectionPool.connections.find(conn => !conn.inUse);
    
    if (availableConnection) {
      availableConnection.inUse = true;
      return availableConnection;
    }
    
    throw new Error('No available connections in the pool');
  }
  
  releaseConnection(connection) {
    if (this._connectionPool && this._connectionPool.connections) {
      const conn = this._connectionPool.connections.find(c => c.id === connection.id);
      if (conn) {
        conn.inUse = false;
        return true;
      }
    }
    return false;
  }
}

// 4. Exporting a Singleton as an ES Module
// -----------------------------------------
// logger.js
class Logger {
  constructor() {
    this.logs = [];
    this.levels = {
      ERROR: 0,
      WARN: 1,
      INFO: 2,
      DEBUG: 3
    };
    this.level = this.levels.INFO;
  }
  
  setLevel(level) {
    if (level in this.levels) {
      this.level = this.levels[level];
    }
  }
  
  log(message, level = 'INFO') {
    const messageLevel = this.levels[level] || this.levels.INFO;
    
    // Only log if the message level is less than or equal to current log level
    if (messageLevel <= this.level) {
      const logEntry = {
        timestamp: new Date(),
        message,
        level
      };
      
      this.logs.push(logEntry);
      console.log(\`[\${level}] \${message}\`);
      
      return logEntry;
    }
    
    return null;
  }
  
  error(message) { return this.log(message, 'ERROR'); }
  warn(message) { return this.log(message, 'WARN'); }
  info(message) { return this.log(message, 'INFO'); }
  debug(message) { return this.log(message, 'DEBUG'); }
  
  getLogs(level) {
    if (level) {
      return this.logs.filter(log => log.level === level);
    }
    return [...this.logs]; // Return a copy
  }
}

// Create and export a singleton instance
const logger = new Logger();
export default logger;

// For CommonJS environments
// module.exports = logger;

// Then import in other files:
// import logger from './logger.js';
// logger.info('Application started');`,
          exercise: {
            instructions:
              'Implement a configuration manager singleton that loads settings from localStorage and provides a clean API for accessing and updating application configuration. Create a user session singleton that manages authentication state and user information. Implement a connection pool singleton that manages a fixed number of reusable database connections for optimal resource usage.',
          },
        },
      ],
      prepperSummary: `
    <div class="prepper-summary">
      <h3>🔑 Key Interview Takeaways</h3>
      <ul>
        <li><strong>Singleton Purpose:</strong> Ensure a class has only one instance and provide a global access point to it, useful for managing shared resources and configuration.</li>
        
        <li><strong>Implementation Techniques:</strong> JavaScript offers multiple ways to implement singletons, from object literals to ES6 classes with static instances and module patterns.</li>
        
        <li><strong>Lazy Initialization:</strong> Create the singleton instance only when first requested to improve performance and resource usage.</li>
        
        <li><strong>Appropriate Use Cases:</strong> Configuration managers, connection pools, state stores, and loggers are ideal candidates for singletons.</li>
        
        <li><strong>Testing Considerations:</strong> Understand how singletons impact testability and techniques to make singleton-based code more testable.</li>
      </ul>
      
      <h4>📝 Common Interview Questions</h4>
      <ol>
        <li>"When is the Singleton pattern appropriate, and when should it be avoided?"</li>
        <li>"How would you implement a thread-safe Singleton in JavaScript?"</li>
        <li>"How do Singletons affect unit testing, and how can you mitigate these issues?"</li>
        <li>"Implement a Singleton that's also lazily initialized"</li>
        <li>"How do ES6 modules relate to the Singleton pattern?"</li>
      </ol>
    </div>
  `,
    },

    {
      title: 'Observer Pattern',
      description:
        'Learn to establish one-to-many dependencies between objects for event handling.',
      sections: [
        {
          title: 'Understanding the Observer Pattern',
          explanation: `
        <p>The Observer pattern defines a one-to-many dependency between objects where, when one object changes state, all its dependents are notified and updated automatically, enabling loose coupling between components.</p>
        
        <h4>The Observer Concept</h4>
        <p>This pattern involves two main roles: the Subject (observable) that maintains a list of dependents (observers) and notifies them of state changes, and the Observers that register with the Subject and receive updates.</p>
        
        <p>The Observer pattern consists of these key components:</p>
        <ul>
          <li><strong>Subject</strong> - The object being observed that maintains a list of observers and provides methods to add/remove them</li>
          <li><strong>Observer</strong> - The interface or contract that defines how objects will receive notifications</li>
          <li><strong>ConcreteSubject</strong> - Implements the Subject interface, keeps track of its observers, and notifies them of changes</li>
          <li><strong>ConcreteObserver</strong> - Implements the Observer interface, defines how it responds to notifications</li>
          <li><strong>Client</strong> - Creates and configures the subjects and observers</li>
        </ul>
        
        <div class="code-example">
          <pre><code>// Basic Observer pattern terminology
const subject = {
  // The list of observers
  observers: [],
  
  // Method to add observers
  addObserver(observer) {
    this.observers.push(observer);
  },
  
  // Method to remove observers
  removeObserver(observer) {
    this.observers = this.observers.filter(obs => obs !== observer);
  },
  
  // Method to notify all observers
  notify(data) {
    this.observers.forEach(observer => observer.update(data));
  }
};

// An observer
const observer = {
  update(data) {
    console.log('Observer received update:', data);
  }
};</code></pre>
        </div>
        
        <h4>Implementation in JavaScript</h4>
        <p>JavaScript makes implementing the Observer pattern straightforward through function references, method binding, and built-in event systems.</p>
        
        <p>There are several approaches to implementing observers in JavaScript:</p>
        <ul>
          <li><strong>Object-oriented approach</strong> - Using classes for subjects and observers</li>
          <li><strong>Functional approach</strong> - Using functions as observers</li>
          <li><strong>Event-based approach</strong> - Using event emitters and listeners</li>
          <li><strong>Reactive approach</strong> - Using Observables from libraries like RxJS</li>
          <li><strong>Callback approach</strong> - Passing callback functions to be executed on changes</li>
        </ul>
        
        <div class="code-example">
          <pre><code>// Simple implementation using classes
class Subject {
  constructor() {
    this.observers = [];
  }
  
  addObserver(observer) {
    // Don't add the same observer twice
    if (!this.observers.includes(observer)) {
      this.observers.push(observer);
    }
  }
  
  removeObserver(observer) {
    this.observers = this.observers.filter(obs => obs !== observer);
  }
  
  notify(data) {
    this.observers.forEach(observer => observer.update(data));
  }
}

class Observer {
  constructor(name) {
    this.name = name;
  }
  
  update(data) {
    console.log(\`\${this.name} received: \${data}\`);
  }
}

// Usage
const subject = new Subject();
const observer1 = new Observer('Observer 1');
const observer2 = new Observer('Observer 2');

subject.addObserver(observer1);
subject.addObserver(observer2);
subject.notify('Hello, observers!');
// Observer 1 received: Hello, observers!
// Observer 2 received: Hello, observers!</code></pre>
        </div>
        
        <h4>Event Emitters</h4>
        <p>Node.js and many JavaScript libraries implement the Observer pattern through event emitters, which allow subscription to named events.</p>
        
        <p>Event emitters enhance the basic Observer pattern with these features:</p>
        <ul>
          <li><strong>Named events</strong> - Multiple event types can be observed independently</li>
          <li><strong>Multiple listeners</strong> - Many observers can listen to the same event</li>
          <li><strong>One-time listeners</strong> - Observers can listen only for the first occurrence</li>
          <li><strong>Prioritization</strong> - Some implementations allow setting listener priority</li>
          <li><strong>Error handling</strong> - Special error events can be used to handle failures</li>
        </ul>
        
        <div class="code-example">
          <pre><code>// EventEmitter style (similar to Node.js)
class EventEmitter {
  constructor() {
    this.events = {};
  }
  
  on(event, listener) {
    if (!this.events[event]) {
      this.events[event] = [];
    }
    this.events[event].push(listener);
  }
  
  off(event, listener) {
    if (!this.events[event]) return;
    
    this.events[event] = this.events[event]
      .filter(l => l !== listener);
  }
  
  emit(event, ...args) {
    if (!this.events[event]) return;
    
    this.events[event].forEach(listener => {
      listener(...args);
    });
  }
}

// Usage
const emitter = new EventEmitter();

function handleUserLogin(user) {
  console.log(\`User logged in: \${user.name}\`);
}

emitter.on('userLogin', handleUserLogin);
emitter.emit('userLogin', { name: 'John', id: 123 });</code></pre>
        </div>
        
        <div class="interview-tip">
          <p><span class="interview-icon">🎯</span> <strong>Interview Focus:</strong> Understanding the Observer pattern demonstrates your ability to design loosely coupled, event-driven systems.</p>
          <p>Key points to understand:</p>
          <ul>
            <li>How the Observer pattern enables loose coupling between components</li>
            <li>When to use Observers vs. other patterns like Pub/Sub</li>
            <li>Performance considerations with many observers</li>
            <li>Implementation variations (push vs. pull models)</li>
            <li>Memory management and preventing observer leaks</li>
          </ul>
        </div>
      `,
          codeExample: `// Observer Pattern Implementations

// 1. Advanced EventEmitter
class EventEmitter {
  constructor() {
    this.events = new Map();
  }
  
  // Subscribe to events
  on(event, listener) {
    if (!this.events.has(event)) {
      this.events.set(event, new Set());
    }
    this.events.get(event).add(listener);
    
    // Return an unsubscribe function
    return () => this.off(event, listener);
  }
  
  // Subscribe once
  once(event, listener) {
    const onceWrapper = (...args) => {
      listener(...args);
      this.off(event, onceWrapper);
    };
    return this.on(event, onceWrapper);
  }
  
  // Unsubscribe from events
  off(event, listener) {
    if (!this.events.has(event)) return false;
    
    const listeners = this.events.get(event);
    const result = listeners.delete(listener);
    
    // Clean up if no more listeners
    if (listeners.size === 0) {
      this.events.delete(event);
    }
    
    return result;
  }
  
  // Emit an event
  emit(event, ...args) {
    if (!this.events.has(event)) return false;
    
    const listeners = this.events.get(event);
    listeners.forEach(listener => {
      try {
        listener(...args);
      } catch (error) {
        console.error(\`Error in listener for event "\${event}":\`, error);
      }
    });
    
    return true;
  }
  
  // Remove all listeners
  removeAllListeners(event) {
    if (event) {
      this.events.delete(event);
    } else {
      this.events.clear();
    }
  }
  
  // Get listener count
  listenerCount(event) {
    return this.events.has(event) ? this.events.get(event).size : 0;
  }
}

// 2. Observable Class
class Observable {
  constructor() {
    this.observers = new Set();
  }
  
  // Add an observer
  subscribe(observer) {
    this.observers.add(observer);
    
    // Return an unsubscribe function
    return {
      unsubscribe: () => {
        this.observers.delete(observer);
      }
    };
  }
  
  // Remove an observer
  unsubscribe(observer) {
    this.observers.delete(observer);
  }
  
  // Notify all observers
  notify(data) {
    this.observers.forEach(observer => {
      if (typeof observer === 'function') {
        observer(data);
      } else if (observer && typeof observer.update === 'function') {
        observer.update(data);
      }
    });
  }
}

// 3. User Authentication System with Observer Pattern
class AuthService extends EventEmitter {
  constructor() {
    super();
    this.currentUser = null;
    this.isAuthenticated = false;
  }
  
  login(username, password) {
    // Simulate authentication
    if (username && password) {
      // Authentication succeeded
      this.currentUser = {
        id: Date.now(),
        username,
        lastLogin: new Date()
      };
      this.isAuthenticated = true;
      
      // Notify listeners
      this.emit('login', this.currentUser);
      this.emit('authChange', true);
      
      return true;
    }
    
    // Authentication failed
    this.emit('loginFailed', { username });
    return false;
  }
  
  logout() {
    if (this.isAuthenticated) {
      const user = this.currentUser;
      this.currentUser = null;
      this.isAuthenticated = false;
      
      // Notify listeners
      this.emit('logout', user);
      this.emit('authChange', false);
    }
  }
  
  getCurrentUser() {
    return this.currentUser;
  }
  
  isUserAuthenticated() {
    return this.isAuthenticated;
  }
}

// 4. Form Validation with Observer
class FormValidator extends Observable {
  constructor(form) {
    super();
    this.form = form;
    this.errors = new Map();
    this.validations = new Map();
    
    // Set up form submission
    form.addEventListener('submit', this.handleSubmit.bind(this));
  }
  
  // Add validation rule
  addValidation(fieldName, validationFn, errorMessage) {
    if (!this.validations.has(fieldName)) {
      this.validations.set(fieldName, []);
      
      // Set up input event listener for real-time validation
      const field = this.form.querySelector(\`[name="\${fieldName}"]\`);
      if (field) {
        field.addEventListener('input', () => this.validateField(fieldName));
      }
    }
    
    this.validations.get(fieldName).push({
      validate: validationFn,
      message: errorMessage
    });
  }
  
  // Validate a single field
  validateField(fieldName) {
    const field = this.form.querySelector(\`[name="\${fieldName}"]\`);
    if (!field) return false;
    
    const value = field.value;
    const rules = this.validations.get(fieldName) || [];
    
    // Clear previous errors for this field
    this.errors.delete(fieldName);
    
    // Check all validations
    for (const rule of rules) {
      if (!rule.validate(value)) {
        this.errors.set(fieldName, rule.message);
        
        // Notify observers about the error
        this.notify({
          event: 'validation-error',
          field: fieldName,
          message: rule.message,
          value
        });
        
        return false;
      }
    }
    
    // Field is valid
    this.notify({
      event: 'validation-success',
      field: fieldName,
      value
    });
    
    return true;
  }
  
  // Validate all fields
  validateAll() {
    let isValid = true;
    
    // Clear all errors
    this.errors.clear();
    
    // Validate each field
    for (const fieldName of this.validations.keys()) {
      if (!this.validateField(fieldName)) {
        isValid = false;
      }
    }
    
    // Notify about overall validation result
    this.notify({
      event: isValid ? 'form-valid' : 'form-invalid',
      errors: Object.fromEntries(this.errors)
    });
    
    return isValid;
  }
  
  // Handle form submission
  handleSubmit(event) {
    if (!this.validateAll()) {
      event.preventDefault();
      
      // Notify about prevented submission
      this.notify({
        event: 'submit-prevented',
        errors: Object.fromEntries(this.errors)
      });
    } else {
      // Form is valid, about to submit
      this.notify({
        event: 'submitting',
        formData: new FormData(this.form)
      });
      
      // If you want to prevent default and handle submission manually:
      // event.preventDefault();
    }
  }
  
  // Get all errors
  getErrors() {
    return Object.fromEntries(this.errors);
  }
}

// 5. Simple State Management with Observer
class Store extends Observable {
  constructor(initialState = {}) {
    super();
    this.state = initialState;
  }
  
  // Get current state
  getState() {
    // Return copy to prevent direct mutations
    return JSON.parse(JSON.stringify(this.state));
  }
  
  // Update state
  setState(updates) {
    // Track which properties changed
    const changedProps = [];
    
    // Update state
    for (const [key, value] of Object.entries(updates)) {
      if (this.state[key] !== value) {
        changedProps.push(key);
        this.state[key] = value;
      }
    }
    
    // Only notify if something changed
    if (changedProps.length > 0) {
      this.notify({
        newState: this.getState(),
        changedProps,
        timestamp: new Date()
      });
    }
    
    return this.state;
  }
  
  // Reset state
  resetState(newState = {}) {
    this.state = newState;
    this.notify({
      newState: this.getState(),
      changedProps: Object.keys(newState),
      reset: true,
      timestamp: new Date()
    });
  }
}`,
          exercise: {
            instructions:
              'Create an inventory system that uses the Observer pattern to notify different parts of an application (UI, logging, analytics) when items are added, removed, or quantities change. Implement a form validation system that observes input fields and provides real-time validation feedback based on configurable rules. Build a custom event system that allows components to communicate without direct dependencies.',
          },
        },
      ],
      prepperSummary: `
    <div class="prepper-summary">
      <h3>🔑 Key Interview Takeaways</h3>
      <ul>
        <li><strong>Observer Purpose:</strong> Defines a one-to-many dependency between objects where, when one object changes state, all its dependents are notified automatically.</li>
        
        <li><strong>Core Components:</strong> The Subject (Observable) maintains a list of Observers and notifies them of state changes, while Observers register with the Subject to receive updates.</li>
        
        <li><strong>Loose Coupling:</strong> Observers and Subjects are loosely coupled, as Subjects only know that Observers implement a specific interface, not their concrete classes.</li>
        
        <li><strong>Implementation Styles:</strong> JavaScript supports multiple Observer implementations, from custom classes to EventEmitter patterns similar to Node.js.</li>
        
        <li><strong>Common Applications:</strong> Event handling, user interface updates, state management, and real-time notifications are all ideal use cases for the Observer pattern.</li>
      </ul>
      
      <h4>📝 Common Interview Questions</h4>
      <ol>
        <li>"What's the difference between Observer pattern and Pub/Sub pattern?"</li>
        <li>"How would you implement an Observable that supports multiple event types?"</li>
        <li>"How do you prevent memory leaks when using the Observer pattern?"</li>
        <li>"Explain how the Observer pattern enables loose coupling between components"</li>
        <li>"How would you implement the Observer pattern in a modern JavaScript application?"</li>
      </ol>
    </div>
  `,
    },

    {
      title: 'Factory Pattern',
      description: 'Learn to create objects without specifying the exact class to instantiate.',
      sections: [
        {
          title: 'Understanding the Factory Pattern',
          explanation: `
        <p>The Factory pattern is a creational pattern that provides an interface for creating objects in a superclass but allows subclasses to alter the type of objects that will be created.</p>
        
        <h4>The Factory Concept</h4>
        <p>Factory methods encapsulate object creation logic, allowing for flexibility in what objects are created and how they're initialized, without modifying client code.</p>
        
        <p>Key benefits of the Factory pattern include:</p>
        <ul>
          <li><strong>Centralized object creation</strong> - Object creation logic is consolidated in one place</li>
          <li><strong>Loose coupling</strong> - Client code depends on interfaces, not concrete implementations</li>
          <li><strong>Encapsulation</strong> - Implementation details of object creation are hidden</li>
          <li><strong>Flexibility</strong> - New object types can be added without changing client code</li>
          <li><strong>Consistent creation</strong> - Objects are created with a standardized process</li>
          <li><strong>Dynamic creation</strong> - Objects can be created based on runtime conditions</li>
        </ul>
        
        <div class="code-example">
          <pre><code>// Simple factory function
function createUser(type) {
  if (type === 'admin') {
    return {
      name: '',
      permissions: ['read', 'write', 'delete', 'admin'],
      access: 'full',
      isAdmin: true
    };
  } else if (type === 'editor') {
    return {
      name: '',
      permissions: ['read', 'write', 'delete'],
      access: 'content-only',
      isAdmin: false
    };
  } else {
    // default to basic user
    return {
      name: '',
      permissions: ['read'],
      access: 'read-only',
      isAdmin: false
    };
  }
}

// Usage
const adminUser = createUser('admin');
const regularUser = createUser('user');</code></pre>
        </div>
        
        <h4>Factory Methods vs. Factory Classes</h4>
        <p>JavaScript supports both simple factory functions and more complex factory classes, each with their own use cases and benefits.</p>
        
        <p>There are several variations of the Factory pattern:</p>
        <ul>
          <li><strong>Simple Factory</strong> - A basic function that creates different object types</li>
          <li><strong>Factory Method</strong> - A method in a class that subclasses can override to create specific objects</li>
          <li><strong>Abstract Factory</strong> - A higher-level factory that returns other factories</li>
          <li><strong>Static Factory</strong> - A class with static methods for object creation</li>
          <li><strong>Parametric Factory</strong> - A factory that creates objects based on parameters</li>
        </ul>
        
        <div class="code-example">
          <pre><code>// Factory class with factory methods
class UserFactory {
  createAdmin(data) {
    return {
      type: 'admin',
      name: data.name || 'Admin',
      permissions: ['read', 'write', 'delete', 'admin'],
      created: new Date()
    };
  }
  
  createEditor(data) {
    return {
      type: 'editor',
      name: data.name || 'Editor',
      permissions: ['read', 'write', 'delete'],
      created: new Date()
    };
  }
  
  createUser(data) {
    return {
      type: 'user',
      name: data.name || 'User',
      permissions: ['read'],
      created: new Date()
    };
  }
  
  // Main factory method
  create(type, data = {}) {
    switch (type) {
      case 'admin':
        return this.createAdmin(data);
      case 'editor':
        return this.createEditor(data);
      default:
        return this.createUser(data);
    }
  }
}

// Usage
const factory = new UserFactory();
const admin = factory.create('admin', { name: 'John' });</code></pre>
        </div>
        
        <div class="interview-tip">
          <p><span class="interview-icon">🎯</span> <strong>Interview Focus:</strong> Understanding the Factory pattern demonstrates your ability to design flexible and maintainable object creation systems.</p>
          <p>Key points to understand:</p>
          <ul>
            <li>When to use factories instead of direct instantiation</li>
            <li>How factories promote loose coupling between creators and consumers</li>
            <li>The difference between Factory Method and Abstract Factory patterns</li>
            <li>How factories can be used to implement cross-cutting concerns</li>
            <li>Factory patterns in popular JavaScript frameworks</li>
          </ul>
        </div>
      `,
          codeExample: `// Factory Pattern Implementations

// 1. Simple Factory Function
function createVehicle(type, options) {
  const defaults = {
    color: 'white',
    doors: 4,
    manufactureYear: new Date().getFullYear()
  };
  
  const config = { ...defaults, ...options };
  
  // Create different types of vehicles
  switch (type.toLowerCase()) {
    case 'car':
      return {
        type: 'Car',
        wheels: 4,
        doors: config.doors,
        color: config.color,
        manufactureYear: config.manufactureYear,
        start() {
          return \`Car engine started\`;
        },
        drive(speed) {
          return \`Driving at \${speed} mph\`;
        }
      };
      
    case 'motorcycle':
      return {
        type: 'Motorcycle',
        wheels: 2,
        color: config.color,
        manufactureYear: config.manufactureYear,
        start() {
          return \`Motorcycle engine started\`;
        },
        wheelie() {
          return \`Doing a wheelie!\`;
        }
      };
      
    case 'truck':
      return {
        type: 'Truck',
        wheels: config.wheels || 6,
        doors: config.doors,
        color: config.color,
        manufactureYear: config.manufactureYear,
        maxLoad: config.maxLoad || '2000kg',
        start() {
          return \`Truck engine started\`;
        },
        load(cargo) {
          return \`Loaded \${cargo} onto truck\`;
        }
      };
      
    default:
      throw new Error(\`Unknown vehicle type: \${type}\`);
  }
}

// 2. Factory Class Hierarchy
// Base/abstract product class
class UIComponent {
  constructor(props) {
    this.props = props || {};
  }
  
  render() {
    throw new Error('UIComponent subclasses must implement render()');
  }
}

// Concrete product classes
class Button extends UIComponent {
  constructor(props) {
    super(props);
    this.type = 'button';
  }
  
  render() {
    return \`<button class="\${this.props.className || ''}" \${this.props.disabled ? 'disabled' : ''}>\${this.props.label || 'Button'}</button>\`;
  }
  
  onClick(handler) {
    this.clickHandler = handler;
    return this;
  }
}

class TextField extends UIComponent {
  constructor(props) {
    super(props);
    this.type = 'textfield';
  }
  
  render() {
    return \`<input type="text" placeholder="\${this.props.placeholder || ''}" class="\${this.props.className || ''}" value="\${this.props.value || ''}" />\`;
  }
  
  onInput(handler) {
    this.inputHandler = handler;
    return this;
  }
}

class Checkbox extends UIComponent {
  constructor(props) {
    super(props);
    this.type = 'checkbox';
  }
  
  render() {
    return \`<label>
      <input type="checkbox" \${this.props.checked ? 'checked' : ''} />
      \${this.props.label || ''}
    </label>\`;
  }
  
  onToggle(handler) {
    this.toggleHandler = handler;
    return this;
  }
}

// Factory class
class UIFactory {
  createComponent(type, props) {
    switch (type.toLowerCase()) {
      case 'button':
        return new Button(props);
      case 'textfield':
        return new TextField(props);
      case 'checkbox':
        return new Checkbox(props);
      default:
        throw new Error(\`Unknown component type: \${type}\`);
    }
  }
}

// 3. Factory Method Pattern with Base Creator
// Abstract creator class with factory method
class FormBuilder {
  constructor(formName) {
    this.formName = formName;
    this.elements = [];
  }
  
  // Factory method that subclasses will override
  createFormElement(type, config) {
    throw new Error('FormBuilder subclasses must implement createFormElement()');
  }
  
  // Common methods shared by all form builders
  addElement(type, config) {
    const element = this.createFormElement(type, config);
    this.elements.push(element);
    return this;
  }
  
  build() {
    const formElements = this.elements.map(element => 
      \`<div class="form-group">\${element}</div>\`
    ).join('\n');
    
    return \`<form name="{this.formName}">\n\${formElements}\n</form>\`;
  }
}

// Concrete creator with factory method implementation
class HTMLFormBuilder extends FormBuilder {
  createFormElement(type, config) {
    // Factory method implementation
    switch (type.toLowerCase()) {
      case 'text':
        return \`<input type="text" name="\${config.name}" \${config.required ? 'required' : ''} placeholder="\${config.placeholder || ''}" />\`;
      case 'email':
        return \`<input type="email" name="\${config.name}" \${config.required ? 'required' : ''} placeholder="\${config.placeholder || ''}" />\`;
      case 'password':
        return \`<input type="password" name="\${config.name}" \${config.required ? 'required' : ''} placeholder="\${config.placeholder || ''}" />\`;
      case 'select':
        const options = (config.options || [])
          .map(opt => \`<option value="\${opt.value}">\${opt.label}</option>\`)
          .join('\n    ');
        return \`<select name="\${config.name}" \${config.required ? 'required' : ''}>\n    \${options}\n  </select>\`;
      case 'button':
        return \`<button type="\${config.buttonType || 'button'}">\${config.label || 'Button'}</button>\`;
      default:
        throw new Error(\`Unknown form element type: \${type}\`);
    }
  }
}

// 4. Abstract Factory Pattern
// Abstract factory interface (just using comments in JavaScript)
// interface ComponentFactory {
//   createButton(props): UIComponent;
//   createTextField(props): UIComponent;
//   createCheckbox(props): UIComponent;
// }

// Concrete factories for different design systems
class MaterialComponentFactory {
  createButton(props) {
    const buttonProps = {
      className: \`material-button \${props.variant || 'contained'}\`,
      ...props
    };
    return new Button(buttonProps);
  }
  
  createTextField(props) {
    const textFieldProps = {
      className: 'material-textfield',
      ...props
    };
    return new TextField(textFieldProps);
  }
  
  createCheckbox(props) {
    const checkboxProps = {
      className: 'material-checkbox',
      ...props
    };
    return new Checkbox(checkboxProps);
  }
}

class BootstrapComponentFactory {
  createButton(props) {
    const buttonProps = {
      className: \`btn \${props.variant ? 'btn-' + props.variant : 'btn-primary'}\`,
      ...props
    };
    return new Button(buttonProps);
  }
  
  createTextField(props) {
    const textFieldProps = {
      className: 'form-control',
      ...props
    };
    return new TextField(textFieldProps);
  }
  
  createCheckbox(props) {
    const checkboxProps = {
      className: 'form-check-input',
      ...props
    };
    return new Checkbox(checkboxProps);
  }
}

// Usage of the abstract factory
function createForm(componentFactory) {
  const loginButton = componentFactory.createButton({
    label: 'Log In',
    variant: 'primary'
  });
  
  const usernameField = componentFactory.createTextField({
    placeholder: 'Username'
  });
  
  const rememberMe = componentFactory.createCheckbox({
    label: 'Remember me'
  });
  
  // Return composite component
  return {
    render() {
      return \`
        <form>
          <div class="form-field">\${usernameField.render()}</div>
          <div class="form-field">\${rememberMe.render()}</div>
          <div class="form-actions">\${loginButton.render()}</div>
        </form>
     ;\`
    }
  };
}`,
          exercise: {
            instructions:
              'Implement a UI component factory that creates different styled buttons, inputs, and modals based on the chosen design system (e.g., material, bootstrap). Create a notification system factory that generates different types of notifications (email, SMS, push) while hiding the implementation details. Build a factory that creates appropriate form validator objects based on the type of data being validated.',
          },
        },
      ],
      prepperSummary: `
    <div class="prepper-summary">
      <h3>🔑 Key Interview Takeaways</h3>
      <ul>
        <li><strong>Factory Purpose:</strong> Provide an interface for creating objects without specifying their concrete classes, allowing for flexibility in object creation.</li>
        
        <li><strong>Implementation Styles:</strong> JavaScript supports various factory implementations, from simple factory functions to more complex Factory Method and Abstract Factory patterns.</li>
        
        <li><strong>Encapsulation Benefits:</strong> Factories encapsulate object creation logic, making it easier to change implementation details without affecting client code.</li>
        
        <li><strong>Dynamic Object Creation:</strong> Factories enable creating different objects based on runtime conditions, configuration, or parameters.</li>
        
        <li><strong>Common Use Cases:</strong> UI component libraries, configuration-driven object creation, and plugin systems all benefit from factory patterns.</li>
      </ul>
      
      <h4>📝 Common Interview Questions</h4>
      <ol>
        <li>"When would you use the Factory pattern instead of direct instantiation with 'new'?"</li>
        <li>"What's the difference between Factory Method and Abstract Factory patterns?"</li>
        <li>"How do factories promote loose coupling in your code?"</li>
        <li>"Implement a simple factory function that creates different types of user objects"</li>
        <li>"How would you refactor a large if/else or switch statement into a factory pattern?"</li>
      </ol>
    </div>
  `,
    },
  ],
  challenge: {
    description:
      "You've been tasked with building a flexible document management system for a company that handles various document types (invoices, contracts, reports, etc.). Each document type has its own properties, behaviors, and workflows. The system needs to be easily extendable for new document types and must integrate with different storage backends.",
    requirements: [
      'Create a document factory that produces different document types with appropriate properties and methods',
      'Implement a module to handle document validation, storage, and retrieval',
      'Build an observer system that notifies relevant parties when documents change status',
      'Design a singleton configuration manager to store system settings',
      'Ensure the system is easily extendable for new document types without modifying existing code',
    ],
    starterCode: `// DocumentManagementSystem - JavaScript Design Patterns Challenge

// TODO: Create Document Factory (Factory Pattern)
class DocumentFactory {
  // Factory method to create document objects
  createDocument(type, data) {
    // Implement factory logic that returns appropriate document objects
  }
}

// TODO: Implement a Document Storage Module (Module Pattern)
const DocumentStorage = (function() {
  // Private state and methods
  
  // Public API
  return {
    saveDocument(document) {
      // Save document to storage
    },
    
    getDocument(id) {
      // Retrieve document from storage
    },
    
    deleteDocument(id) {
      // Delete document from storage
    }
  };
})();

// TODO: Build Document Observer (Observer Pattern)
class DocumentObserver {
  // Implement observer pattern for document status changes
}

// TODO: Create Configuration Manager (Singleton Pattern)
class ConfigManager {
  // Implement singleton pattern for managing configuration
}

// Export your implementation
export {
  DocumentFactory,
  DocumentStorage,
  DocumentObserver,
  ConfigManager
};`,
  },
}

export default javaScriptDesignPatterns
