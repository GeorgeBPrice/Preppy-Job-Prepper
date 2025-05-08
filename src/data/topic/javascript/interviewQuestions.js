// JavaScript Interview Questions
export default [
  {
    id: 'javascript-fundamentals',
    title: 'JavaScript Fundamentals',
    questions: [
      {
        text: "What's the difference between var, let, and const?",
        answer:
          'var is function-scoped and can be redeclared. let is block-scoped and can be reassigned but not redeclared. const is block-scoped and cannot be reassigned or redeclared. Both let and const were introduced in ES6 and are generally preferred over var for better scoping rules and predictability.',
      },
      {
        text: 'How does hoisting work in JavaScript?',
        answer:
          "Hoisting is JavaScript's default behavior of moving all declarations to the top of their scope. Variables declared with var are hoisted and initialized with undefined, while let and const are hoisted but not initialized (creating a 'temporal dead zone'). Function declarations are hoisted completely, but function expressions are not.",
      },
      {
        text: 'Explain the event loop in JavaScript',
        answer:
          "The event loop is JavaScript's mechanism for handling asynchronous operations. It continuously checks if the call stack is empty, and if so, takes the first task from the callback queue and pushes it onto the call stack for execution. This allows JavaScript to be non-blocking despite being single-threaded. Promises and microtasks have priority over regular tasks in the queue.",
      },
      {
        text: 'What is closure and how is it useful?',
        answer:
          "A closure is a function that has access to variables from its outer (enclosing) scope, even after the outer function has returned. Closures are useful for data privacy/encapsulation, creating function factories, and maintaining state in asynchronous operations. They're a core concept enabling many JavaScript patterns like modules and callbacks.",
      },
      {
        text: 'How would you handle errors in JavaScript?',
        answer:
          'JavaScript errors can be handled using try/catch/finally blocks for synchronous code, and through .catch() for Promises or try/catch with async/await for asynchronous code. You can create custom errors by extending the Error class. For production applications, implement global error handlers and consider using error monitoring services for tracking.',
      },
    ],
  },
  {
    id: 'objects-data-structures',
    title: 'Objects and Data Structures',
    questions: [
      {
        text: 'What are the different ways to create objects in JavaScript?',
        answer:
          'Objects can be created through: <br>1) Object literals: <code>{}</code>, <br>2) Constructor functions with <code>new</code>, <br>3) <code>Object.create()</code> method, <br>4) ES6 classes with <code>new</code>, and <br>5) Factory functions that return object instances. Each approach has different implications for inheritance and property configuration.',
      },
      {
        text: 'How do you iterate through object properties?',
        answer:
          'You can iterate through object properties using: <br>1) <code>for...in</code> loop (includes inherited properties), <br>2) <code>Object.keys()</code> (own enumerable properties), <br>3) <code>Object.values()</code> (values of own enumerable properties), <br>4) <code>Object.entries()</code> (key-value pairs as arrays), and <br>5) <code>Object.getOwnPropertyNames()</code> (all own properties including non-enumerable ones).',
      },
      {
        text: "What's the difference between Map and Object?",
        answer:
          "Maps are designed specifically for frequent additions/removals of key-value pairs. Unlike Objects, Maps: <br>1) Allow any value as keys (including objects), <br>2) Maintain insertion order when iterating, <br>3) Have built-in size property, <br>4) Don't have default keys that could conflict, and <br>5) Are directly iterable without extracting keys first. Maps also have better performance for frequent changes.",
      },
      {
        text: 'Explain shallow vs. deep copying of objects',
        answer:
          "A shallow copy duplicates the top-level properties but references the same nested objects. Create shallow copies with <code>Object.assign()</code> or spread syntax <code>{...obj}</code>. A deep copy duplicates everything, including nested objects. Create deep copies with <code>JSON.parse(JSON.stringify())</code> (with limitations) or libraries like lodash's <code>cloneDeep</code>. Shallow copies are faster but can cause unintended side effects with nested objects.",
      },
      {
        text: 'How would you check if a value is an array?',
        answer:
          "The most reliable way to check if a value is an array is using <code>Array.isArray(value)</code>. Other methods like <code>instanceof Array</code> or <code>value.constructor === Array</code> can fail in cross-window/iframe scenarios. The <code>typeof</code> operator returns 'object' for arrays, so it can't distinguish arrays from other objects.",
      },
    ],
  },
  {
    id: 'functional-programming',
    title: 'Functional Programming',
    questions: [
      {
        text: 'What are the core principles of functional programming?',
        answer:
          'Core functional programming principles include: <br>1) Pure functions (same output for same input, no side effects), <br>2) Immutability (not modifying data), <br>3) Function composition (combining functions), <br>4) First-class functions (functions as values), and <br>5) Higher-order functions (functions that take/return other functions). These principles lead to more predictable, testable, and maintainable code.',
      },
      {
        text: 'Explain higher-order functions with examples',
        answer:
          'Higher-order functions are functions that take other functions as arguments or return functions. Examples include: <code>map()</code> (transform array elements), <code>filter()</code> (select elements meeting criteria), <code>reduce()</code> (accumulate values), <code>forEach()</code> (perform action on each element), and function factories that return specialized functions. They enable powerful abstractions and code reuse.',
      },
      {
        text: 'What is function composition and why is it useful?',
        answer:
          "Function composition is combining two or more functions to create a new function, where the output of one function becomes the input of the next. For example: <code>compose(f, g)(x) = f(g(x))</code>. It's useful for creating data transformation pipelines, building complex behaviors from simple functions, reducing intermediate variables, and improving code readability and maintainability.",
      },
      {
        text: 'How does currying work in JavaScript?',
        answer:
          'Currying transforms a function with multiple arguments into a sequence of functions, each taking a single argument. For example, <code>add(a, b, c)</code> becomes <code>add(a)(b)(c)</code>. This enables partial application (pre-filling some arguments), creating specialized functions, and building more flexible APIs. Implement currying with closures that capture arguments until all are provided.',
      },
      {
        text: "What's the difference between imperative and declarative programming?",
        answer:
          'Imperative programming focuses on how to achieve results with step-by-step instructions and mutable state. Declarative programming focuses on what results you want, abstracting away the implementation details. Functional programming is declarative. Compare: imperative <code>for</code> loop with mutable counter vs. declarative <code>map()</code> function that describes the transformation. Declarative code is often more concise and self-documenting.',
      },
    ],
  },
  {
    id: 'asynchronous-javascript',
    title: 'Asynchronous JavaScript',
    questions: [
      {
        text: 'What are the differences between callbacks, promises, and async/await?',
        answer:
          "Callbacks are functions passed as arguments and executed later, but can lead to 'callback hell' with complex nesting. Promises provide a cleaner way to handle async operations with chaining (.then/.catch) and better error handling. Async/await (built on promises) offers the most readable syntax that resembles synchronous code, with try/catch for error handling, while still being non-blocking.",
      },
      {
        text: 'How does Promise.all() differ from Promise.race()?',
        answer:
          'Promise.all() takes an array of promises and returns a new promise that resolves when all input promises resolve (with an array of results) or rejects when any input promise rejects. Promise.race() also takes an array of promises but returns a promise that resolves or rejects as soon as the first promise in the array resolves or rejects. Use Promise.all() when you need all operations to complete, and Promise.race() when you need the result of the fastest operation.',
      },
      {
        text: 'Explain how to handle errors in asynchronous code',
        answer:
          'For callbacks, use error-first pattern (first parameter is error). For promises, use .catch() method or second argument to .then(). For async/await, use try/catch blocks. Consider finally for cleanup. For global error handling with promises, use window.onunhandledrejection. Always handle rejections to prevent silent failures, and consider retries for transient errors like network issues.',
      },
      {
        text: 'How would you implement a timeout for a fetch request?',
        answer:
          "Use Promise.race() to race between the fetch request and a timeout promise: <code>Promise.race([fetch(url), new Promise((_, reject) => setTimeout(() => reject(new Error('Timeout')), 5000))])</code>. This returns whichever promise resolves/rejects first. If the timeout wins, the fetch is effectively canceled from the application's perspective (though it continues in the background).",
      },
      {
        text: 'What are microtasks and how do they relate to the event loop?',
        answer:
          'Microtasks are a special queue in the JavaScript event loop that has higher priority than the regular task queue. They execute after the current task finishes and before the next task begins. Promise callbacks (.then, .catch, .finally) and queueMicrotask() go into the microtask queue. This ensures promise chains execute without interruption from other events, maintaining state consistency between asynchronous operations.',
      },
    ],
  },
  {
    id: 'dom-events',
    title: 'DOM Manipulation and Events',
    questions: [
      {
        text: "What's the difference between event bubbling and capturing?",
        answer:
          'Event propagation has two phases: capturing (down from document to target) and bubbling (up from target to document). By default, event handlers are executed during the bubbling phase. To handle events during the capturing phase, add a third parameter <code>true</code> to addEventListener: <code>element.addEventListener(event, handler, true)</code>. Event bubbling is useful for event delegation, while capturing can intercept events before the target receives them.',
      },
      {
        text: 'Explain event delegation and its benefits',
        answer:
          "Event delegation is attaching a single event listener to a parent element to handle events for multiple child elements, using event.target to determine the actual clicked element. Benefits include: <br>1) Better performance with fewer event listeners, <br>2) Automatically handling dynamically added elements, <br>3) Less memory usage, and <br>4) Cleaner code with centralized event handling. It's especially useful for lists, tables, and other repeated elements.",
      },
      {
        text: 'How would you optimize DOM manipulation for performance?',
        answer:
          'Optimize DOM manipulation by: <br>1) Minimizing reflows/repaints by batching updates, <br>2) Using document fragments for multiple insertions, <br>3) Modifying elements while detached from DOM, <br>4) Caching DOM queries instead of repeated selections, <br>5) Using CSS classes over inline styles, <br>6) Preferring requestAnimationFrame for visual updates, <br>7) Virtualizing long lists, and <br>8) Using event delegation for multiple similar elements.',
      },
      {
        text: 'What are Web Components and how do they work?',
        answer:
          'Web Components are a set of standardized APIs for creating reusable custom HTML elements with encapsulated functionality. They consist of: <br>1) Custom Elements API for defining new HTML elements, <br>2) Shadow DOM for encapsulated styling and DOM, <br>3) HTML Templates for reusable markup, and <br>4) ES Modules for script organization. They work by extending HTMLElement and using lifecycle callbacks like connectedCallback and attributeChangedCallback.',
      },
      {
        text: 'How would you create a responsive design without using a framework?',
        answer:
          'Create responsive designs without frameworks using: <br>1) CSS media queries to apply different styles at various breakpoints, <br>2) Flexible layouts with percentage widths and max/min widths, <br>3) CSS Grid and Flexbox for adaptive layouts, <br>4) Fluid typography using viewport units (vw) or calc(), <br>5) Responsive images with srcset and sizes attributes, and <br>6) Feature detection with @supports for progressive enhancement.',
      },
    ],
  },
  {
    id: 'es6-features',
    title: 'ES6+ Features',
    questions: [
      {
        text: 'Explain destructuring and its benefits',
        answer:
          'Destructuring is an ES6 feature that extracts values from arrays or properties from objects into distinct variables. Benefits include: <br>1) More concise code when working with complex objects/arrays, <br>2) Easy extraction of multiple properties in one statement, <br>3) Setting default values for missing properties, <br>4) Convenient function parameter handling, and <br>5) Swapping variables without a temporary variable. It greatly enhances code readability.',
      },
      {
        text: 'How do you use the spread and rest operators?',
        answer:
          'The spread operator (<code>...</code>) expands an iterable into individual elements. Use it to: combine arrays <code>[...arr1, ...arr2]</code>, clone arrays/objects <code>{...obj}</code>, convert strings to arrays <code>[...string]</code>, and pass array elements as function arguments <code>func(...arr)</code>. The rest operator (also <code>...</code>) collects multiple elements into an array. Use it in function parameters <code>function(a, b, ...rest)</code> or destructuring <code>const [first, ...others] = array</code>.',
      },
      {
        text: 'What are template literals and tagged templates?',
        answer:
          'Template literals are string literals with embedded expressions using backticks (`). They support multi-line strings and expression interpolation with ${expression}. Tagged templates are a more advanced feature where a function (tag) processes the template literal, receiving the string parts and evaluated expressions as separate arguments. Tags can manipulate these to create DSLs, escape HTML, format values, or implement localization.',
      },
      {
        text: 'Explain how arrow functions differ from regular functions',
        answer:
          "Arrow functions differ from regular functions in several ways: <br>1) They have lexical <code>this</code> binding (inherit <code>this</code> from the surrounding scope), <br>2) Cannot be used as constructors (no <code>new</code>), <br>3) No <code>arguments</code> object (use rest parameters instead), <br>4) Cannot be used as generators, <br>5) No <code>prototype</code> property, and <br>6) Cannot change their <code>this</code> value (methods like <code>call()</code>/<code>apply()</code>/<code>bind()</code> work but don't change <code>this</code>).",
      },
      {
        text: 'What is the nullish coalescing operator (??) and how does it differ from logical OR (||)?',
        answer:
          "The nullish coalescing operator (??) returns the right-hand operand when the left-hand operand is null or undefined, otherwise it returns the left-hand operand. It differs from logical OR (||) which returns the right-hand operand for any falsy value (including empty string, 0, false). This makes ?? better for providing default values when distinguishing between 'no value' and intentional falsy values like empty strings or zero.",
      },
    ],
  },
  {
    id: 'design-patterns',
    title: 'JavaScript Design Patterns',
    questions: [
      {
        text: 'Explain the prototype chain in JavaScript and how property lookup works',
        answer:
          "The prototype chain is JavaScript's inheritance mechanism where objects can inherit properties from other objects. When accessing a property, JavaScript first looks on the object itself. If not found, it checks the object's prototype (__proto__), then that object's prototype, continuing until it finds the property or reaches the end of the chain (null). This enables property sharing between instances and inheritance hierarchies without duplicating code.",
      },
      {
        text: 'What is the difference between __proto__ and prototype?',
        answer:
          'prototype is a property on constructor functions that becomes the __proto__ of objects created with that constructor. __proto__ is an internal property on objects that references their prototype object. In other words: function.prototype will become object.__proto__ when created with new function(). While prototype defines what will be inherited, __proto__ is the actual link in the prototype chain used during property lookups.',
      },
      {
        text: 'How do ES6 classes work under the hood in JavaScript?',
        answer:
          "ES6 classes are primarily syntactic sugar over JavaScript's prototype-based inheritance. When you define a class, JavaScript creates a constructor function with methods defined on its prototype. Extends sets up the prototype chain. Static methods go on the constructor itself. The class syntax handles proper inheritance chainings and constructor behavior automatically. Under the hood, it's still using prototypes, not true class-based inheritance like in languages such as Java or C#.",
      },
      {
        text: 'Explain different ways to implement inheritance in JavaScript',
        answer:
          "Inheritance in JavaScript can be implemented through: <br>1) Prototype chaining - setting one object's prototype to another, <br>2) Constructor inheritance - calling a parent constructor with call/apply, <br>3) Combination inheritance - using both prototype and constructor techniques, <br>4) Object.create() - creating objects with specific prototypes, <br>5) ES6 classes with extends (cleanest syntax), and <br>6) Composition - delegating to contained objects ('favor composition over inheritance').",
      },
      {
        text: 'How would you implement private variables and methods in JavaScript?',
        answer:
          "Private variables/methods can be implemented using: <br>1) Closures in factory functions or module pattern to encapsulate private state, <br>2) ES2022 private class fields with # prefix (class C { #privateField; }), <br>3) WeakMaps to associate private data with instances, <br>4) Symbol keys for properties that aren't easily discoverable, or <br>5) Naming conventions (e.g., _privateName) with documentation (no true privacy). Modern code should prefer private class fields when possible.",
      },
    ],
  },
  {
    id: 'testing-debugging',
    title: 'Testing and Debugging',
    questions: [
      {
        text: "What's the difference between unit, integration, and end-to-end testing?",
        answer:
          'Unit tests verify individual components in isolation, usually mocking dependencies. Integration tests check interactions between components, testing multiple units together. End-to-end tests validate complete flows from user perspective, testing the entire application. Unit tests are fast and precise but miss integration issues; E2E tests catch real-world problems but are slower and more brittle. A balanced testing strategy includes all three types in a testing pyramid.',
      },
      {
        text: 'How would you debug a memory leak in JavaScript?',
        answer:
          "Debug memory leaks by: <br>1) Using Chrome DevTools Memory panel to take heap snapshots, <br>2) Comparing snapshots to identify growing objects, <br>3) Recording allocation timelines during actions, <br>4) Looking for detached DOM elements, <br>5) Checking for forgotten event listeners, closures holding references, timers, or global references, <br>6) Using the 'Detached elements' filter in Memory panel, and <br>7) Adding instrumentation to track object lifecycles in suspicious areas.",
      },
      {
        text: 'What is Test-Driven Development and what are its benefits?',
        answer:
          'Test-Driven Development (TDD) follows the Red-Green-Refactor cycle: write a failing test first (red), implement just enough code to pass the test (green), then improve the code while maintaining passing tests (refactor). Benefits include: <br>1) Clearer requirements and design, <br>2) Higher test coverage by design, <br>3) Less debugging time, <br>4) Faster feedback cycles, <br>5) More maintainable code, and <br>6) Confidence when refactoring or adding features.',
      },
      {
        text: 'Explain mocking in unit tests and when to use it',
        answer:
          "Mocking replaces real dependencies with controlled test doubles. Use mocks to: <br>1) Isolate the code under test from external systems like databases, APIs, or services, <br>2) Simulate edge cases, errors, or rare conditions, <br>3) Speed up tests by avoiding slow operations, <br>4) Verify interactions with dependencies (e.g., checking if a function was called with correct arguments). However, excessive mocking can create tests that pass but don't reflect real-world behavior.",
      },
      {
        text: 'What tools would you use to ensure code quality?',
        answer:
          'Tools for code quality include: <br>1) Linters (ESLint) to enforce style and catch potential errors, <br>2) Type checkers (TypeScript/Flow) for type safety, <br>3) Test frameworks (Jest, Mocha) for automated testing, <br>4) Coverage tools to measure test completeness, <br>5) Continuous Integration to run tests automatically, <br>6) Static analysis tools (SonarQube) to identify complexity and vulnerabilities, <br>7) Code formatters (Prettier) for consistent style, and <br>8) Documentation generators for API clarity.',
      },
    ],
  },
  {
    id: 'modern-frameworks',
    title: 'Modern JavaScript Frameworks',
    questions: [
      {
        text: 'What principles guide your approach to breaking a UI into components?',
        answer:
          'Break UIs into components based on: <br>1) Single Responsibility Principle - each component should do one thing well, <br>2) Reusability - identify repeated patterns that can be abstracted, <br>3) Data flow - group elements that share the same data, <br>4) Maintainability - keep components small enough to understand easily, <br>5) UI/UX design boundaries - break at natural visual divisions, and <br>6) State management needs - separate container components (with logic) from presentational components (display only).',
      },
      {
        text: 'How would you handle communication between components that are far apart in the component tree?',
        answer:
          'For distant component communication, use: <br>1) State management libraries (Redux, Vuex, MobX) for complex apps, <br>2) Context API (React) or Provide/Inject (Vue) for simpler scenarios, <br>3) Event bus systems for decoupled communication, <br>4) URL/route parameters for navigation-related state, <br>5) Custom hooks or composables that share functionality, or <br>6) Service/singleton classes in Angular. The best approach depends on application size, update frequency, and how many components need the data.',
      },
      {
        text: 'Explain the difference between presentational and container components',
        answer:
          'Presentational components focus on how things look: they receive data via props, contain minimal logic, are often function components, and are reusable. Container components focus on how things work: they manage state, handle data fetching/mutations, contain business logic, and connect to stores/services. This separation improves component reusability, testability, and maintenance by decoupling presentation from business logic.',
      },
      {
        text: 'How do you decide when to use local component state versus a global state management solution?',
        answer:
          "Use local component state for: <br>1) UI-specific state like form inputs, toggles, or animations, <br>2) Data only needed by one component or a small subtree, and <br>3) Temporary data that doesn't need to persist. <br><br>Use global state management for: <br>1) Data needed in many places, <br>2) State that persists across routes/views, <br>3) Shared data that must stay synchronized, <br>4) Complex state interactions, or <br>5) When prop drilling becomes excessive (passing props through many layers).",
      },
      {
        text: 'How does client-side routing differ from traditional server-side routing?',
        answer:
          'In server-side routing, each URL request fetches a complete HTML page from the server, causing full page reloads. In client-side routing, the initial page load gets the application shell, then JavaScript intercepts navigation, updates the URL (using History API), and renders the appropriate view without page reloads. Client-side routing provides faster transitions, preserves state between views, enables animations, and reduces server load, but requires proper SEO handling and initial load optimization.',
      },
    ],
  },
  {
    id: 'advanced-concepts',
    title: 'Advanced JavaScript Concepts',
    questions: [
      {
        text: "How does JavaScript's garbage collection work?",
        answer:
          "JavaScript's garbage collection automatically frees memory when objects become unreachable. The main algorithm is mark-and-sweep: starting from global objects ('roots'), the engine marks all reachable objects and sweeps away unmarked ones. Modern browsers use generational collection (separate handling for new vs. old objects) and incremental/concurrent collection to reduce performance impacts. Developers don't directly control GC but can help by removing references to unused objects.",
      },
      {
        text: 'What are common causes of memory leaks in JavaScript applications?',
        answer:
          'Common memory leaks include: <br>1) Forgotten event listeners not properly removed when elements are deleted, <br>2) Closures capturing and holding references to large objects, <br>3) Out-of-DOM references - storing DOM elements in data structures even after removal from DOM, <br>4) Circular references between objects, <br>5) Timers/intervals not cleared, <br>6) Global variables accumulating data, and <br>7) Improper cache implementations without size limits or expiration policies.',
      },
      {
        text: 'When would you use Web Workers in a web application?',
        answer:
          'Use Web Workers for: <br>1) CPU-intensive calculations that would block the main thread (parsing large files, complex data processing), <br>2) Processing large datasets (sorting, filtering large arrays), <br>3) Polling operations that run periodically, <br>4) Image/video processing and manipulation, <br>5) Cryptographic operations, <br>6) Data compression/decompression, and <br>7) Complex animations or physics simulations. Workers improve responsiveness by keeping the main thread free for UI updates and user interactions.',
      },
      {
        text: 'What are the benefits of using TypeScript over plain JavaScript?',
        answer:
          "TypeScript benefits include: <br>1) Static type checking to catch errors during development rather than runtime, <br>2) Better IDE support with autocompletion and inline documentation, <br>3) Explicit interfaces for clearer code contracts, <br>4) Easier refactoring with confidence, <br>5) Enhanced code readability and self-documentation, <br>6) Early access to future JavaScript features, and <br>7) Improved team collaboration with explicit type definitions. It's particularly valuable for large codebases and teams.",
      },
      {
        text: 'How would you implement generics in TypeScript and why are they useful?',
        answer:
          "Implement generics with type parameters in angle brackets: <code>function identity&lt;T&gt;(arg: T): T { return arg; }</code>. They're useful for: <br>1) Creating reusable components that work with different types while maintaining type safety, <br>2) Building type-safe collections and data structures, <br>3) Expressing relationships between input and output types, <br>4) Type-safe function factories, and <br>5) Writing utilities that preserve the original type information. They enable flexibility without sacrificing type checking.",
      },
    ],
  },
]
