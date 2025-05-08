// curriculum-section1.js - JavaScript Fundamentals

const javascriptFundamentals = {
  title: 'JavaScript Fundamentals',
  description:
    'Master the building blocks of JavaScript, including variables, data types, operators, and control flow.',
  lessons: [
    {
      title: 'Variables and Data Types',
      description:
        "Review JavaScript's variable declarations and core data types for interview preparation.",
      sections: [
        {
          title: 'Variable Declarations',
          explanation: `
        <p>JavaScript offers three ways to declare variables, each with different scoping rules and behaviors that are critical to understand for modern development:</p>
        
        <h4>var, let, and const</h4>
        <p><code>var</code> is function-scoped and hoisted to the top of its scope during execution, which can lead to unexpected behavior. It was the original way to declare variables before ES6.</p>

        <p><code>let</code> and <code>const</code> are block-scoped (limited to the nearest curly braces) and exist in a "temporal dead zone" from the start of the block until declaration, meaning you can't access them before declaration. This helps catch potential bugs.</p>

        <p><code>const</code> creates variables that cannot be reassigned after initialization, enforcing immutability of the binding (though not of the value itself for objects and arrays). This is preferred in modern JavaScript for better code predictability.</p>

        <p>In practice, most modern codebases use <code>const</code> by default, <code>let</code> when reassignment is needed, and avoid <code>var</code> entirely to prevent scope-related bugs.</p>
        
        <div class="code-example">
          <pre><code>// Basic declarations
var oldStyle = "Function-scoped, can be redeclared";
let changeable = "Block-scoped, can be reassigned";
const fixed = "Block-scoped, cannot be reassigned";</code></pre>
        </div>
        
        <p>The key differences appear in scoping and reassignment:</p>
        
        <div class="code-example">
          <pre><code>// Scope differences
function scopeDemo() {
  if (true) {
    var x = 10;  // Available in entire function
    let y = 20;  // Only available in this block
  }
  
  console.log(x);  // 10
  // console.log(y);  // ReferenceError
  
  // Hoisting behavior
  console.log(hoisted);  // undefined (no error)
  var hoisted = "I'm hoisted";
  
  // console.log(notHoisted);  // ReferenceError
  let notHoisted = "I'm not hoisted";
}</code></pre>
        </div>
        
        <div class="interview-tip">
          <p><span class="interview-icon">🎯</span> <strong>Interview Focus:</strong> Be prepared to discuss hoisting, temporal dead zone, and block vs. function scope.</p>
          <p>Interviewers often ask candidates to explain the difference between <code>var</code>, <code>let</code>, and <code>const</code> and to identify bugs in code that misuses these declarations. You might be asked to convert legacy code using <code>var</code> to modern JavaScript using <code>let</code> and <code>const</code>.</p>
          <p>Common interview scenarios include:</p>
          <ul>
            <li>Explaining why <code>const</code> objects can be modified but not reassigned</li>
            <li>Identifying scoping issues in loops or closures</li>
            <li>Debugging problems caused by hoisting</li>
          </ul>
        </div>
      `,
          codeExample: `// Modern best practices
// 1. Use const by default
const API_KEY = "abc123";
const CONFIG = { baseUrl: "https://api.example.com" };

// 2. Use let when reassignment is needed
let count = 0;
count++;

// 3. Avoid var in modern code, modern developers prefet let
var status = "active"; // Not always recommended

// Closure and variable examples
function createCounter() {
  // This works because of closures and block scope
  let count = 0;
  
  return function() {
    return ++count;
  };
}

const counter = createCounter();
console.log(counter()); // 1
console.log(counter()); // 2`,
          exercise: {
            instructions:
              'Create a simple shopping cart system that tracks items and total cost. Use const for the tax rate (which should never change), let for the cart items array and total (which will change as items are added), and demonstrate how block scoping affects your variables in a checkout function. Add item, remove item, and calculate total functions should show your understanding of proper variable usage.',
          },
        },
        {
          title: 'Primitive Data Types',
          explanation: `
        <p>JavaScript has 7 primitive data types that represent the simplest, immutable data values. Understanding these is fundamental to mastering JavaScript:</p>
        
        <h4>The 7 Primitive Types</h4>
        <p>Primitives are immutable values - once created, they cannot be changed. When you "modify" a primitive, you're actually creating a new value.</p>

        <p><strong>String:</strong> Text data enclosed in quotes (single, double, or backticks). Strings created with backticks are template literals that allow embedded expressions using \${expression} syntax.</p>

        <p><strong>Number:</strong> Both integers and floating-point numbers. JavaScript uses a single number type based on the IEEE 754 standard (64-bit floating-point). This causes precision issues with decimal operations that developers must handle carefully.</p>

        <p><strong>Boolean:</strong> Logical values - true or false. Used extensively in conditional operations and control flow.</p>

        <p><strong>Undefined:</strong> Represents variables that have been declared but not assigned a value. It's the default value of uninitialized variables.</p>

        <p><strong>Null:</strong> Represents the intentional absence of any object value. Unlike undefined, null is typically set explicitly to indicate "no value".</p>

        <p><strong>Symbol:</strong> Added in ES6, symbols are unique and immutable primitive values used mainly as object property identifiers to avoid name collisions.</p>

        <p><strong>BigInt:</strong> Added in ES2020, allows representation of integers larger than the Number type can safely handle. Created by appending 'n' to an integer or using the BigInt() function.</p>
        
        <div class="code-example">
          <pre><code>// Examples of each primitive type
const name = "John";              // String: text data
const age = 30;                   // Number: integers and floating-point
const isActive = true;            // Boolean: true/false
let address;                      // Undefined: declared but not assigned
const userData = null;            // Null: intentional absence of value
const id = Symbol("id");          // Symbol: unique identifier
const bigNum = 9007199254740991n; // BigInt: large integers</code></pre>
        </div>
        
        <p>Type checking with <code>typeof</code> helps identify primitive types, but has some quirks:</p>
        
        <div class="code-example">
          <pre><code>// Type checking with typeof
console.log(typeof "hello");     // "string"
console.log(typeof 42);          // "number"
console.log(typeof true);        // "boolean"
console.log(typeof undefined);   // "undefined"
console.log(typeof null);        // "object" (this is a bug in JavaScript)
console.log(typeof Symbol());    // "symbol"
console.log(typeof 42n);         // "bigint"</code></pre>
        </div>
        
        <div class="interview-tip">
          <p><span class="interview-icon">🎯</span> <strong>Interview Focus:</strong> Be prepared to discuss type coercion rules, <code>typeof</code> operator oddities, and primitive vs reference type behavior.</p>
          <p>Interviewers often ask about JavaScript's type system weaknesses and how to handle them. They may ask you to predict the output of expressions with mixed types or to write utility functions for type checking.</p>
          <p>Key areas to understand include:</p>
          <ul>
            <li>Why <code>typeof null === "object"</code> and how to properly check for null</li>
            <li>The difference between <code>==</code> and <code>===</code> in type coercion</li>
            <li>How to reliably detect arrays, since <code>typeof []</code> returns "object"</li>
            <li>Common pitfalls with numeric precision in JavaScript</li>
          </ul>
        </div>
      `,
          codeExample: `// Type coercion examples - a major source of bugs
// 1. String conversions
console.log(5 + "5");          // "55" (number + string = string)
console.log("5" - 2);          // 3 (string - number = number)

// 2. Boolean conversions
const falsyValues = [0, "", null, undefined, NaN, false];
const truthyValues = ["0", [], {}, 42, "false", new Date()];

// 3. Common edge cases in type checking
console.log(typeof NaN);       // "number" (despite meaning "Not a Number")
console.log(Array.isArray([])); // true (reliable array checking)
console.log([] == false);      // true (empty array coerces to 0)

// 4. Reliable type checking pattern
function getType(value) {
  if (value === null) return "null";
  if (Array.isArray(value)) return "array";
  return typeof value;
}`,
          exercise: {
            instructions:
              'Create a type validation function for a user registration form. The function should validate that a username is a string, an age is a number, an email matches a basic email pattern, and a list of interests is an array of strings. Your solution should demonstrate understanding of JavaScript primitive types, type checking, and basic validation techniques while handling edge cases like null or undefined inputs.',
          },
        },
        {
          title: 'Objects and Reference Types',
          explanation: `
        <p>Unlike primitives, reference types in JavaScript store references to values in memory, leading to fundamentally different behavior when copying or comparing:</p>
        
        <h4>Understanding Reference Types</h4>
        <p>Reference types include objects, arrays, functions, dates, RegExp, and more. When you create a reference type, JavaScript allocates memory for the value and stores a reference to that memory location in the variable.</p>

        <p>This reference-based model has profound implications:</p>

        <p><strong>Assignment creates references, not copies:</strong> When you assign a reference value to another variable, both variables point to the same underlying data. Modifying through one variable affects what you see through the other.</p>

        <p><strong>Equality checks compare references, not contents:</strong> Two objects with identical properties will not be considered equal (===) because they reference different memory locations.</p>

        <p><strong>Passing to functions:</strong> When passing reference types to functions, you're passing the reference itself, allowing the function to modify the original object (unlike primitives, which pass a copy of the value).</p>

        <p><strong>Mutability:</strong> Unlike primitives, reference types can be modified after creation. This mutability is powerful but requires careful handling to prevent unintended side effects in complex applications.</p>

        <p>Mastering the distinction between passing by reference versus passing by value is essential for debugging and writing predictable JavaScript code.</p>
        
        <div class="code-example">
          <pre><code>// Basic reference types
const user = { name: "Alice", age: 30 };   // Object
const colors = ["red", "green", "blue"];   // Array
const greet = (name) => \`Hello, \${name}\`; // Function
const today = new Date();                  // Date object</code></pre>
        </div>
        
        <p>The key difference between primitive and reference types is how they're copied and compared:</p>
        
        <div class="code-example">
          <pre><code>// Primitive vs Reference comparison
// Primitives are copied by value
let a = 5;
let b = a;
a = 10;
console.log(b); // Still 5

// Objects are copied by reference
let obj1 = { x: 5 };
let obj2 = obj1;
obj1.x = 10;
console.log(obj2.x); // 10 - changed!</code></pre>
        </div>
        
        <div class="interview-tip">
          <p><span class="interview-icon">🎯</span> <strong>Interview Focus:</strong> Be prepared to discuss passing by reference vs value, object mutation, and creating deep copies.</p>
          <p>Interviewers frequently ask questions about object references and mutations. This is a common source of bugs and misunderstandings in JavaScript code.</p>
          <p>You should be able to:</p>
          <ul>
            <li>Explain the difference between shallow and deep copying</li>
            <li>Implement a deep clone function (a popular coding challenge)</li>
            <li>Discuss strategies for preventing unintended mutations in JavaScript applications</li>
            <li>Explain cases where immutability is important (like React state)</li>
          </ul>
        </div>
      `,
          codeExample: `// Copying reference types
// 1. Shallow copy with spread operator
const original = { name: "John", profile: { age: 25 } };
const shallowCopy = { ...original };

shallowCopy.name = "Jane"; // Only affects shallowCopy
shallowCopy.profile.age = 30; // Affects BOTH objects!

// 2. Deep copying with JSON (with limitations)
const deepCopy = JSON.parse(JSON.stringify(original));
deepCopy.profile.age = 35; // Only affects deepCopy

// 3. Simple deep clone for objects and arrays
function simpleDeepClone(obj) {
  if (obj === null || typeof obj !== 'object') return obj;
  
  const copy = Array.isArray(obj) ? [] : {};
  
  for (const key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      copy[key] = simpleDeepClone(obj[key]);
    }
  }
  
  return copy;
}`,
          exercise: {
            instructions:
              'You\'re building a user profile manager for a web application. Create a function called "updateUserProfile" that takes a user object and updates to be applied. The function should modify a copy of the user object (not the original) and handle nested properties like contact information and preferences. Your solution should demonstrate understanding of object references, shallow vs. deep copying, and preventing unintended mutations of the original data.',
          },
        },
      ],
      prepperSummary: `
    <div class="prepper-summary">
      <h3>🔑 Key Interview Takeaways</h3>
      <ul>
        <li><strong>Variable Declarations:</strong> Use <code>const</code> by default, <code>let</code> when reassignment is needed, and avoid <code>var</code>. Understand hoisting, scoping differences, and the temporal dead zone.</li>
        
        <li><strong>Primitive Types:</strong> Master all 7 primitive types (string, number, boolean, null, undefined, symbol, and bigint). Know how <code>typeof</code> works and its limitations, especially with <code>null</code> and arrays.</li>
        
        <li><strong>Reference Types:</strong> Objects, arrays, and functions are passed by reference. Be able to explain shallow vs. deep copying and implement proper object cloning to prevent unintended mutations.</li>
        
        <li><strong>Type Coercion:</strong> Understand automatic type conversion rules, especially with the <code>+</code> operator and comparisons. Know when to use <code>===</code> vs <code>==</code> and the common pitfalls of both.</li>
      </ul>
      
      <h4>📝 Common Interview Questions</h4>
      <ol>
        <li>"What's the difference between <code>let</code>, <code>const</code>, and <code>var</code>?"</li>
        <li>"Explain why <code>typeof null</code> returns 'object'"</li>
        <li>"How do you clone an object in JavaScript?"</li>
        <li>"What's the output of <code>console.log(0 == '0')</code> and why?"</li>
        <li>"Explain the difference between primitive and reference types in JavaScript"</li>
      </ol>
    </div>
  `,
    }, // End of Lesson 1
    {
      title: 'Operators and Expressions',
      description:
        "Understand JavaScript's operators for arithmetic, comparison, logical operations, and more.",
      sections: [
        {
          title: 'Arithmetic and Assignment Operators',
          explanation: `
        <p>JavaScript provides comprehensive support for mathematical operations and efficient syntax for common assignment patterns:</p>
        
        <h4>Arithmetic Operations Beyond the Basics</h4>
        <p>Besides standard operations, JavaScript includes:</p>

        <p><strong>Exponentiation operator (**)</strong>: Introduced in ES2016, it's a more concise alternative to Math.pow(). For example, 2 ** 3 calculates 2 to the power of 3.</p>

        <p><strong>Modulo operator (%)</strong>: Returns the remainder after division, widely used for cycling through ranges (like generating values between 0-359 for degrees).</p>

        <p><strong>Increment/decrement (++/--)</strong>: These unary operators increment or decrement a value by 1, with different behavior depending on their position (prefix vs. postfix).</p>

        <h4>Floating-Point Precision Challenges</h4>
        <p>JavaScript's use of IEEE-754 floating-point arithmetic leads to precision errors that can surprise developers. For example, 0.1 + 0.2 equals 0.30000000000000004, not 0.3 as expected.</p>

        <p>This behavior affects financial calculations, percentages, and any decimal math. Common solutions include:</p>
        <ul>
          <li>Multiplying by a power of 10 to convert to integers before operations</li>
          <li>Using libraries like decimal.js or big.js for precision-critical applications</li>
          <li>Using toFixed() or Math.round() when displaying results</li>
        </ul>

        <p>Understanding these limitations is essential for building reliable applications.</p>
        
        <div class="code-example">
          <pre><code>// Basic arithmetic
const sum = 10 + 3;        // 13
const product = 10 * 3;    // 30
const quotient = 10 / 3;   // 3.3333...
const remainder = 10 % 3;  // 1
const power = 2 ** 3;      // 8 (2 cubed)

// Assignment operators
let value = 10;
value += 5;   // value = value + 5, result: 15
value *= 2;   // value = value * 2, result: 30</code></pre>
        </div>
        
        <h4>Increment/Decrement and Precision</h4>
        <div class="code-example">
          <pre><code>// Prefix vs postfix increment
let a = 5;
console.log(a++);  // 5 (returns, then increments)
console.log(++a);  // 7 (increments, then returns)

// Floating-point precision issues
console.log(0.1 + 0.2);         // 0.30000000000000004
console.log(0.1 + 0.2 === 0.3);  // false

// Solution: Use toFixed or rounding
console.log((0.1 + 0.2).toFixed(1)); // "0.3"</code></pre>
        </div>
        
        <div class="interview-tip">
          <p><span class="interview-icon">🎯</span> <strong>Interview Focus:</strong> Be prepared to discuss operator precedence, prefix vs. postfix behavior, and floating-point precision issues.</p>
          <p>Common interview questions include:</p>
          <ul>
            <li>Explaining why 0.1 + 0.2 !== 0.3 and how to handle it</li>
            <li>The difference between prefix and postfix increment operators</li>
            <li>Implementing a calculator with proper operator precedence</li>
            <li>Handling floating-point precision in financial calculations</li>
          </ul>
        </div>
      `,
          codeExample: `// Creating a simple calculator with proper precision handling
function Calculator() {
  let result = 0;
  
  return {
    // Addition with handling for floating-point
    add(value) {
      result = (result * 1000 + value * 1000) / 1000;
      return this;
    },
    
    subtract(value) {
      result = (result * 1000 - value * 1000) / 1000;
      return this;
    },
    
    multiply(value) {
      result *= value;
      return this;
    },
    
    divide(value) {
      if (value === 0) {
        throw new Error("Division by zero is not allowed");
      }
      result /= value;
      return this;
    },
    
    clear() {
      result = 0;
      return this;
    },
    
    getResult() {
      return result;
    }
  };
}

// Usage
const calc = Calculator();
calc.add(0.1).add(0.2);
console.log(calc.getResult()); // 0.3, not 0.30000000000000004`,
          exercise: {
            instructions:
              'Create a simple calculator function that handles basic operations (+, -, *, /) and correctly handles floating-point precision issues. Add validation to prevent division by zero.',
          },
        },
        {
          title: 'Comparison and Equality Operators',
          explanation: `
        <p>JavaScript's equality operations have nuances that can lead to unexpected behavior if not properly understood:</p>
        
        <h4>Equality: Beyond == and ===</h4>
        <p>The distinction between loose (==) and strict (===) equality is one of JavaScript's most important concepts:</p>

        <p><strong>Loose equality (==)</strong> compares values after type conversion. This can lead to surprising results like 0 == false (true) or '' == 0 (true). It follows complex coercion rules that are difficult to memorize and often lead to bugs.</p>

        <p><strong>Strict equality (===)</strong> compares both value and type without conversion. It's more predictable and is the preferred choice in modern JavaScript to avoid subtle bugs. Most style guides and linters encourage using strict equality exclusively.</p>

        <h4>Object Equality Challenges</h4>
        <p>Even strict equality (===) only checks if two object references point to the same memory location, not if they contain the same values. This means:</p>

        <p>{ a: 1 } === { a: 1 } is false, despite having identical content.</p>

        <p>For content-based comparison ("deep equality"), you must either:</p>
        <ul>
          <li>Write a custom comparison function that recursively compares properties</li>
          <li>Use a library function like Lodash's _.isEqual()</li>
          <li>Convert to JSON strings (with JSON.stringify) and compare (with limitations for cyclic objects)</li>
        </ul>

        <p>Handling object equality correctly is crucial for state comparison in frameworks like React and for properly implementing caching or memoization.</p>
        
        <div class="code-example">
          <pre><code>// Loose equality (==) with type coercion
console.log(5 == "5");     // true (string → number)
console.log(0 == false);   // true (boolean → number)
console.log(null == undefined); // true (special case)

// Strict equality (===) without coercion
console.log(5 === "5");    // false
console.log(0 === false);  // false
console.log(null === undefined); // false</code></pre>
        </div>
        
        <h4>Comparison and Object Equality</h4>
        <div class="code-example">
          <pre><code>// Comparison operators
console.log(5 < 10);       // true
console.log(5 >= 5);       // true

// Object equality checks references, not content
const obj1 = { a: 1 };
const obj2 = { a: 1 };
console.log(obj1 === obj2); // false (different references)

// Deep equality requires custom implementation
function isEqual(a, b) {
  // Check reference equality first
  if (a === b) return true;
  
  // Check if both are objects and not null
  if (typeof a !== 'object' || a === null || 
      typeof b !== 'object' || b === null) {
    return false;
  }
  
  // Compare keys and values
  const keysA = Object.keys(a);
  return keysA.length === Object.keys(b).length &&
    keysA.every(key => b.hasOwnProperty(key) && a[key] === b[key]);
}</code></pre>
        </div>
        
        <div class="interview-tip">
          <p><span class="interview-icon">🎯</span> <strong>Interview Focus:</strong> Be prepared to discuss coercion rules in equality comparisons, NaN behavior, and implementing deep equality checks.</p>
          <p>Key areas to master:</p>
          <ul>
            <li>The difference between <code>==</code> and <code>===</code> with concrete examples</li>
            <li>Explaining the comparison algorithm that JavaScript uses</li>
            <li>Implementing a deep equality function that handles nested objects</li>
            <li>Identifying edge cases like <code>NaN</code> comparisons</li>
          </ul>
        </div>
      `,
          codeExample: `// Implementing a more robust deep equality function
function isDeepEqual(obj1, obj2) {
  // Check if both are the same reference
  if (obj1 === obj2) return true;
  
  // Handle non-object types and null
  if (obj1 == null || obj2 == null || 
      typeof obj1 !== 'object' || typeof obj2 !== 'object') {
    return obj1 === obj2;
  }
  
  // Handle special object types
  if (obj1.constructor !== obj2.constructor) return false;
  
  // Handle Date objects
  if (obj1 instanceof Date) {
    return obj1.getTime() === obj2.getTime();
  }
  
  // Handle Array objects
  if (Array.isArray(obj1)) {
    if (obj1.length !== obj2.length) return false;
    
    for (let i = 0; i < obj1.length; i++) {
      if (!isDeepEqual(obj1[i], obj2[i])) return false;
    }
    
    return true;
  }
  
  // Handle plain objects
  const keys1 = Object.keys(obj1);
  const keys2 = Object.keys(obj2);
  
  if (keys1.length !== keys2.length) return false;
  
  return keys1.every(key => 
    keys2.includes(key) && isDeepEqual(obj1[key], obj2[key])
  );
}

// Test cases
console.log(isDeepEqual({a: 1}, {a: 1}));           // true
console.log(isDeepEqual({a: 1}, {a: 2}));           // false
console.log(isDeepEqual([1, [2, 3]], [1, [2, 3]])); // true`,
          exercise: {
            instructions:
              'Create examples that demonstrate the difference between == and === when comparing different types. Implement a simple object comparison function that can handle nested objects.',
          },
        },
        {
          title: 'Logical Operators and Short-Circuit Evaluation',
          explanation: `
        <p>JavaScript's logical operators work on any value type and offer powerful patterns beyond simple boolean logic:</p>
        
        <h4>Short-Circuit Evaluation as a Programming Pattern</h4>
        <p>The && and || operators evaluate only as many operands as needed to determine the result (short-circuit evaluation). This behavior enables several powerful patterns:</p>

        <p><strong>Default values:</strong> value || defaultValue returns the first value if truthy, otherwise the default. This pattern predates the nullish coalescing operator and remains common in codebases.</p>

        <p><strong>Conditional execution:</strong> condition && executeFn() runs the function only if the condition is truthy, providing a concise alternative to if statements for simple cases.</p>

        <p><strong>Early returns:</strong> Chains like return a || b || c || defaultValue allow "fallthrough" logic where the first truthy value is returned.</p>

        <h4>Modern Logical Operators</h4>
        <p>ES2020 introduced two operators that solve common problems:</p>

        <p><strong>Nullish coalescing (??):</strong> Similar to ||, but only considers null and undefined as falsy. This preserves intentional falsy values like 0 or empty strings, which || would skip.</p>

        <p><strong>Optional chaining (?.):</strong> Allows safely accessing nested properties without checking each level for existence. It returns undefined instead of throwing an error if any part of the chain is null or undefined.</p>

        <p>These operators significantly reduce boilerplate code for defensive programming and error handling, especially when working with APIs or user input.</p>
        
        <h4>Logical AND, OR, and NOT</h4>
        <div class="code-example">
          <pre><code>// Logical AND (&&) - returns first falsy value or last truthy value
// if both sides are truthy, returns the last truthy value
// if either side is falsy, returns the first falsy value
console.log(true && false);    // false
console.log('hello' && 42);    // 42 (last value, all truthy)

// Logical OR (||) - returns first truthy value or last falsy value
// if either side is truthy, returns the first truthy value
// if both sides are falsy, returns the last falsy value
console.log(false || true);    // true
console.log(null || 'default'); // 'default' (first truthy)

// Logical NOT (!) - converts to boolean and negates
console.log(!true);      // false
console.log(!0);         // true (0 is falsy)
console.log(!!'hello');  // true (double negation → boolean)</code></pre>
        </div>
        
        <h4>Nullish Coalescing and Optional Chaining</h4>
        <div class="code-example">
          <pre><code>// Nullish coalescing (??) - considers only null/undefined falsy
console.log(0 || 'default');     // 'default' (0 is falsy)
console.log(0 ?? 'default');     // 0 (0 is not null/undefined, so it's returned as it is)
console.log(null ?? "default"); // 'default' (null is falsy)
console.log(undefined ?? "default"); // 'default' (undefined is falsy)

// Optional chaining (?.) - safe property access
const user = { profile: { name: 'Alice' } };
console.log(user?.profile?.age); // undefined, no error
console.log(user?.settings?.theme); // undefined, no error</code></pre>
        </div>
        
        <div class="interview-tip">
          <p><span class="interview-icon">🎯</span> <strong>Interview Focus:</strong> Be prepared to discuss short-circuit evaluation, nullish coalescing vs logical OR, and practical examples.</p>
          <p>Interviewers often look for:</p>
          <ul>
            <li>Your understanding of how && and || operate on non-boolean values</li>
            <li>The practical difference between ?? and || when handling default values</li>
            <li>Using logical operators to write cleaner, more concise code</li>
            <li>Combining optional chaining with nullish coalescing for safe nested access</li>
          </ul>
        </div>
      `,
          codeExample: `// Building a user profile with logical operators
function createUserProfile(userData) {
  // Default options with nullish coalescing
  const { 
    name = 'Guest',
    email = 'not provided',
    preferences = {}
  } = userData || {};
  
  // Get preferences with optional chaining and defaults
  const theme = preferences?.theme ?? 'light';
  const language = preferences?.language ?? 'en';
  const notifications = preferences?.notifications ?? true;
  
  // Use && to conditionally include subscription info
  const subscriptionInfo = userData?.subscription?.active && {
    plan: userData?.subscription?.plan ?? 'free',
    expiresAt: userData?.subscription?.expiresAt
  };
  
  // Build and return user profile
  return {
    name,
    email,
    settings: {
      theme,
      language,
      notifications
    },
    // Conditionally include subscription info
    ...(subscriptionInfo && { subscription: subscriptionInfo })
  };
}

// Usage
const user = createUserProfile({
  name: 'John',
  preferences: {
    theme: 'dark'
  },
  subscription: {
    active: true,
    plan: 'premium'
  }
});

console.log(user);`,
          exercise: {
            instructions:
              'Create a function that builds a user profile using both || and ?? operators. Demonstrate the difference between them when handling values like 0, empty string, and false. Use optional chaining to safely access nested properties.',
          },
        },
      ],
      prepperSummary: `
    <div class="prepper-summary">
      <h3>🔑 Key Interview Takeaways</h3>
      <ul>
        <li><strong>Arithmetic & Assignment:</strong> Master operator precedence, understand floating-point precision issues, and know how to handle them in real-world scenarios.</li>
        
        <li><strong>Comparison & Equality:</strong> Understand the difference between == and === and their coercion rules. Be able to implement deep equality for comparing objects.</li>
        
        <li><strong>Logical Operators:</strong> Know how to use &&, ||, and ?? for default values, conditional execution, and optional access. Understand short-circuit evaluation for optimizing code.</li>
        
        <li><strong>Common Pitfalls:</strong> Be aware of NaN comparisons, floating-point arithmetic issues, and truthy/falsy values that can lead to unexpected behavior.</li>
      </ul>
      
      <h4>📝 Common Interview Questions</h4>
      <ol>
        <li>"What's the difference between == and === with examples?"</li>
        <li>"Why does 0.1 + 0.2 !== 0.3 in JavaScript and how do you fix it?"</li>
        <li>"Explain the difference between || and ?? operators"</li>
        <li>"How would you implement a deep equality function?"</li>
        <li>"What's the difference between i++ and ++i in JavaScript?"</li>
      </ol>
    </div>
  `,
    }, // End of Lesson 2
    {
      title: 'Control Flow',
      description: 'Master conditionals, loops, and flow control structures.',
      sections: [
        {
          title: 'Conditional Statements',
          explanation: `
        <p>JavaScript offers several approaches to implementing conditional logic, each with specific advantages and use cases:</p>
        
        <h4>Beyond Basic if/else Statements</h4>
        <p>While if/else statements form the foundation of conditional logic, understanding their nuances is essential:</p>

        <p><strong>Condition evaluation:</strong> Any expression in JavaScript can be a condition. Non-boolean values are automatically converted to booleans through "truthy"/"falsy" evaluation. Falsy values include false, 0, "", null, undefined, and NaN; everything else is truthy.</p>

        <p><strong>Multiple conditions:</strong> Complex logical conditions can be created using AND (&&), OR (||), and NOT (!) operators, but they should be kept readable with appropriate grouping using parentheses.</p>

        <h4>Switch Statements vs Object Lookups</h4>
        <p>Switch statements offer multi-branch control flow but come with subtleties:</p>

        <p><strong>Fall-through behavior:</strong> Without a break statement, execution "falls through" to the next case, which can be either an intentional pattern or a source of bugs.</p>

        <p><strong>Case evaluation:</strong> Switch uses strict equality (===) for comparison, meaning type must match.</p>

        <p>For multiple fixed values mapping to different behaviors, object lookup tables often provide a more maintainable alternative:</p>

        <code>const actions = { add: (a,b) => a+b, subtract: (a,b) => a-b };</code>
        <code>const result = actions[operation](x, y);</code>

        <p>This pattern is particularly valuable in reducing cyclomatic complexity and improving code clarity for complex conditional logic.</p>
        
        <div class="code-example">
          <pre><code>// Basic if/else
const age = 19;
if (age >= 18) {
  console.log("You can vote!");
} else {
  console.log("You cannot vote yet.");
}

// Multiple conditions with else if
const score = 85;
if (score >= 90) {
  console.log("Grade: A");
} else if (score >= 80) {
  console.log("Grade: B");
} else {
  console.log("Grade: C or below");
}

// Switch statement
const day = new Date().getDay(); // 0-6
let dayName;

switch (day) {
  case 0:
    dayName = "Sunday";
    break;
  case 1:
    dayName = "Monday";
    break;
  // Cases without break will fall through
  case 5:
    dayName = "Friday";
    console.log("Weekend is coming!");
    // Fall-through (no break)
  case 6:
    console.log("It's the weekend!");
    break;
  default:
    dayName = "Weekday";
}</code></pre>
        </div>
        
        <h4>Ternary and Shorthand Conditionals</h4>
        <div class="code-example">
          <pre><code>// Ternary operator
const canVote = age >= 18 ? "Yes" : "No";

// Logical operators as conditionals
const isLoggedIn = true;
isLoggedIn && console.log("Welcome back!"); // Runs if isLoggedIn is true

// Object property lookup (alternative to switch)
const statusMessages = {
  active: "Your account is active",
  pending: "Please verify your email",
  suspended: "Your account has been suspended"
};

const status = "active";
console.log(statusMessages[status] || "Unknown status");</code></pre>
        </div>
        
        <div class="interview-tip">
          <p><span class="interview-icon">🎯</span> <strong>Interview Focus:</strong> Be prepared to discuss handling complex conditions, conditional statement performance, and writing clean, maintainable code.</p>
          <p>Interviewers often look for:</p>
          <ul>
            <li>Your ability to choose the right conditional statement for different scenarios</li>
            <li>Understanding of switch statement fall-through behavior</li>
            <li>Using object literals to replace complex if/else chains (a pattern commonly seen in production code)</li>
            <li>Avoiding nested ternary operators that reduce readability</li>
          </ul>
        </div>
      `,
          codeExample: `// Role-based authorization system with various conditional patterns
function authorize(user, action, resource) {
  // Early return if user doesn't exist
  if (!user) {
    return { success: false, message: "Authentication required" };
  }
  
  // Check user status using object pattern
  const statusChecks = {
    active: () => true,
    pending: () => false,
    suspended: () => false,
    deleted: () => false
  };
  
  // Get and execute the appropriate status check
  const statusCheck = statusChecks[user.status] || (() => false);
  if (!statusCheck()) {
    return {
      success: false,
      message: \`Account is \${user.status}. Cannot perform actions.\`
    };
  }
  
  // Role-based permissions using object map
  const rolePermissions = {
    admin: ['read', 'write', 'delete', 'manage'],
    editor: ['read', 'write'],
    viewer: ['read'],
    guest: []
  };
  
  // Get allowed actions for user's role
  const allowedActions = rolePermissions[user.role] || [];
  
  // Check if action is permitted
  if (!allowedActions.includes(action)) {
    return {
      success: false,
      message: \`Your role (\${user.role}) cannot perform '\${action}' actions\`
    };
  }
  
  // Resource-specific rules using switch
  switch(resource) {
    case 'users':
      // Only admins can access user data
      return {
        success: user.role === 'admin',
        message: user.role === 'admin' ? 
          "Access granted" : "Only admins can access user data"
      };
      
    case 'articles':
      // Special case for editors deleting articles
      if (action === 'delete' && user.role === 'editor') {
        return {
          success: user.approvedForDeletion === true,
          message: user.approvedForDeletion === true ?
            "Access granted" : "Special approval required for deletion"
        };
      }
      break;
  }
  
  // If we got here, permission is granted
  return { success: true, message: "Access granted" };
}`,
          exercise: {
            instructions:
              'Create a simple user role-based authorization function that checks if a user can perform an action on a resource. Implement using if/else statements first, then refactor to use an object literal pattern for permission mapping.',
          },
        },
        {
          title: 'Loops and Iterations',
          explanation: `
        <p>JavaScript provides a comprehensive toolkit for iteration, from traditional loops to modern functional approaches:</p>
        
        <h4>The Evolution of Looping in JavaScript</h4>
        <p>As JavaScript has evolved, so have its iteration mechanisms:</p>

        <p><strong>Traditional loops (for, while):</strong> Offer complete control over iteration behavior, including the ability to skip iterations (continue) or exit early (break). These remain essential for performance-critical code and certain algorithms.</p>

        <p><strong>for...in loops:</strong> Designed specifically for enumerating object properties, including those inherited through the prototype chain. Be cautious as they iterate over all enumerable properties, which may include prototype methods unless filtered with hasOwnProperty().</p>

        <p><strong>for...of loops (ES6):</strong> Work with any iterable object (arrays, strings, maps, sets, etc.), providing a cleaner syntax for common iteration needs without the index-related errors of traditional for loops.</p>

        <h4>Declarative Iteration with Array Methods</h4>
        <p>Modern JavaScript favors array methods that provide a more declarative, functional approach:</p>

        <p><strong>forEach():</strong> Executes a function for each element without creating a new array. Useful for side effects like DOM updates or logging.</p>

        <p><strong>map():</strong> Creates a new array by transforming each element through a callback function. The cornerstone of functional data transformation.</p>

        <p><strong>filter():</strong> Creates a new array with elements that pass a test function, ideal for data refinement.</p>

        <p><strong>reduce():</strong> Accumulates a single result from array elements. Powerful but sometimes harder to read; excellent for summing, grouping, or transforming arrays into different structures.</p>

        <p>The choice between imperative loops and declarative array methods significantly impacts code readability and maintainability. Modern codebases tend to favor array methods for their clarity and reduced potential for off-by-one errors.</p>
        
        <div class="code-example">
          <pre><code>// For loop
for (let i = 0; i < 5; i++) {
  console.log(i); // 0, 1, 2, 3, 4
}

// While loop
let counter = 0;
while (counter < 3) {
  console.log(counter++); // 0, 1, 2
}

// Do-while loop (always executes at least once)
let x = 10;
do {
  console.log("This runs once even though condition is false");
} while (x < 10);</code></pre>
        </div>
        
        <h4>Iterating Over Objects and Arrays</h4>
        <div class="code-example">
          <pre><code>// For...in loop (objects)
const person = {
  name: "Alice",
  age: 30,
  job: "developer"
};

for (const key in person) {
  console.log(\`\${key}: \${person[key]}\`);
}

// For...of loop (arrays and other iterables)
const colors = ["red", "green", "blue"];
for (const color of colors) {
  console.log(color);
}

// Array methods (forEach, map, filter, etc.)
colors.forEach((color, index) => {
  console.log(\`\${index}: \${color}\`);
});</code></pre>
        </div>
        
        <h4>Control Flow in Loops</h4>
        <div class="code-example">
          <pre><code>// Break to exit a loop
for (let i = 0; i < 10; i++) {
  if (i === 5) break; // Exit the loop
  console.log(i); // 0, 1, 2, 3, 4
}

// Continue to skip an iteration
for (let i = 0; i < 5; i++) {
  if (i === 2) continue; // Skip this iteration
  console.log(i); // 0, 1, 3, 4
}

// Labeled statements for nested loops
outerLoop: for (let i = 0; i < 3; i++) {
  for (let j = 0; j < 3; j++) {
    if (i === 1 && j === 1) {
      break outerLoop; // Breaks from both loops
    }
    console.log(\`\${i}, \${j}\`);
  }
}</code></pre>
        </div>
        
        <div class="interview-tip">
          <p><span class="interview-icon">🎯</span> <strong>Interview Focus:</strong> Be prepared to discuss choosing the appropriate loop type, performance considerations, and avoiding infinite loops.</p>
          <p>Key loop-related interview topics:</p>
          <ul>
            <li>When to use each type of loop (for vs. while vs. for...of)</li>
            <li>Performance implications of different looping constructs</li>
            <li>Common pitfalls like infinite loops and off-by-one errors</li>
            <li>Using array methods like <code>forEach</code>, <code>map</code>, <code>filter</code> instead of traditional loops</li>
            <li>Breaking out of nested loops efficiently</li>
          </ul>
        </div>
      `,
          codeExample: `// Processing nested data with different loop types
function processOrders(users) {
  const totals = {};
  let highestOrder = { amount: 0, user: null, product: null };
  
  // Using for...of (modern, readable approach)
  for (const user of users) {
    totals[user.id] = 0;
    
    // Process each order
    for (const order of user.orders) {
      // Add to user total
      totals[user.id] += order.amount;
      
      // Track highest order
      if (order.amount > highestOrder.amount) {
        highestOrder = {
          amount: order.amount,
          user: user.name,
          product: order.product
        };
      }
    }
  }
  
  // Find users with no orders using array methods
  const inactiveUsers = users
    .filter(user => user.orders.length === 0)
    .map(user => user.name);
  
  // Calculate total revenue using reduce
  const totalRevenue = Object.values(totals)
    .reduce((sum, userTotal) => sum + userTotal, 0);
  
  return {
    userTotals: totals,
    highestOrder,
    inactiveUsers,
    totalRevenue
  };
}

// Example data
const users = [
  {
    id: 1,
    name: "Alice",
    orders: [
      { product: "Laptop", amount: 1200 },
      { product: "Headphones", amount: 100 }
    ]
  },
  {
    id: 2,
    name: "Bob",
    orders: [
      { product: "Monitor", amount: 300 },
      { product: "Keyboard", amount: 80 },
      { product: "Mouse", amount: 25 }
    ]
  },
  {
    id: 3,
    name: "Charlie",
    orders: []
  }
];

console.log(processOrders(users));`,
          exercise: {
            instructions:
              'Using the provided code sample with users and orders as a starting point, implement functions to: 1) Find all users who have ordered a specific product, 2) Calculate the total spent by each user, 3) Find users who have not placed orders in the last 30 days. Use at least three different loop types in your solution.',
          },
        },
        {
          title: 'Exception Handling',
          explanation: `
        <p>JavaScript's exception handling system provides tools for gracefully handling runtime errors and building robust applications:</p>
        
        <h4>Strategic Error Management</h4>
        <p>Effective error handling goes beyond basic try-catch blocks:</p>

        <p><strong>Selective catching:</strong> Catch specific error types to handle different exceptions differently. This allows for more granular error recovery strategies.</p>

        <p><strong>Error propagation:</strong> Not all errors should be caught immediately. Sometimes it's better to let errors propagate up the call stack to be handled by more context-aware code.</p>

        <p><strong>finally clause:</strong> Ensures certain code runs regardless of whether an error occurs, essential for resource cleanup (closing files, releasing locks, completing transactions).</p>

        <h4>Building a Robust Error Hierarchy</h4>
        <p>Creating custom error types with inheritance enables more sophisticated error handling:</p>

        <p><strong>Error classification:</strong> Group related errors (ValidationError, DatabaseError, NetworkError, etc.) to simplify catching and handling.</p>

        <p><strong>Additional properties:</strong> Custom errors can include context-specific properties (like failed field name in validation) that help with recovery or logging.</p>

        <h4>Asynchronous Error Handling</h4>
        <p>Error handling differs between synchronous and asynchronous code:</p>

        <p><strong>Promise rejection:</strong> Use .catch() with promises or try-catch with async/await to handle asynchronous errors.</p>

        <p><strong>Unhandled rejections:</strong> Always provide rejection handlers for promises to prevent unhandled promise rejection warnings/errors.</p>

        <p>Proper error handling is a mark of production-quality code, distinguishing professional applications from amateur projects by gracefully managing failures.</p>
        
        <div class="code-example">
          <pre><code>// Basic try-catch
try {
  // Code that might throw an error
  const result = nonExistentVariable + 5;
} catch (error) {
  console.error("An error occurred:", error.message);
}

// Try-catch-finally
try {
  throw new Error("Something went wrong");
} catch (error) {
  console.error("Error caught:", error.message);
} finally {
  console.log("This always executes");
}</code></pre>
        </div>
        
        <h4>Error Types and Custom Errors</h4>
        <div class="code-example">
          <pre><code>// Built-in error types
try {
  console.log(undefinedVar); // ReferenceError
} catch (e) {
  console.log(e instanceof ReferenceError); // true
}

try {
  null.toString(); // TypeError
} catch (e) {
  console.log(e instanceof TypeError); // true
}

// Custom error types
class ValidationError extends Error {
  constructor(message) {
    super(message);
    this.name = "ValidationError";
  }
}

function validateUsername(username) {
  if (username.length < 3) {
    throw new ValidationError("Username too short");
  }
  return true;
}</code></pre>
        </div>
        
        <h4>Error Handling Patterns</h4>
        <div class="code-example">
          <pre><code>// Conditional catching by error type
try {
  // Code that might throw different errors
  validateUsername("a");
} catch (error) {
  if (error instanceof ValidationError) {
    console.log("Validation issue:", error.message);
  } else if (error instanceof TypeError) {
    console.log("Type issue:", error.message);
  } else {
    console.log("Unknown error:", error.message);
    throw error; // Re-throw unknown errors
  }
}

// Promise rejection handling
function fetchUser(id) {
  return new Promise((resolve, reject) => {
    if (id <= 0) {
      reject(new Error("Invalid user ID"));
    } else {
      resolve({ id, name: "User " + id });
    }
  });
}

// Using async/await with try/catch
async function getUser(id) {
  try {
    const user = await fetchUser(id);
    return user;
  } catch (error) {
    console.error("Error fetching user:", error.message);
    return null;
  }
}</code></pre>
        </div>
        
        <div class="interview-tip">
          <p><span class="interview-icon">🎯</span> <strong>Interview Focus:</strong> Be prepared to discuss creating robust error handling, custom error types, and graceful degradation.</p>
          <p>Key areas interviewers focus on:</p>
          <ul>
            <li>Creating custom error hierarchies for your application</li>
            <li>Implementing effective error recovery strategies</li>
            <li>Using try-catch blocks efficiently (not too broadly, not too narrowly)</li>
            <li>Understanding the performance implications of exceptions</li>
            <li>Handling errors in asynchronous code</li>
          </ul>
        </div>
      `,
          codeExample: `// Form validation with custom error types
// Define error hierarchy
class ValidationError extends Error {
  constructor(message) {
    super(message);
    this.name = "ValidationError";
    this.field = null;
  }
}

class RequiredFieldError extends ValidationError {
  constructor(field) {
    super(\`\${field} is required\`);
    this.name = "RequiredFieldError";
    this.field = field;
  }
}

class InvalidFormatError extends ValidationError {
  constructor(field, format) {
    super(\`\${field} has invalid format, expected \${format}\`);
    this.name = "InvalidFormatError";
    this.field = field;
    this.expectedFormat = format;
  }
}

// Form processing function
function processRegistrationForm(formData) {
  const errors = [];
  const result = {
    success: false,
    user: null,
    errors: []
  };
  
  try {
    // Clean up input
    const email = (formData.email || "").trim().toLowerCase();
    const password = formData.password || "";
    const name = (formData.name || "").trim();
    
    // Validate inputs
    try {
      if (!email) throw new RequiredFieldError("Email");
      
      const emailRegex = /^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/;
      if (!emailRegex.test(email)) {
        throw new InvalidFormatError("Email", "name@example.com");
      }
    } catch (error) {
      if (error instanceof ValidationError) {
        errors.push({
          field: error.field || "email",
          message: error.message
        });
      } else {
        throw error; // Re-throw non-validation errors
      }
    }
    
    // More validation (password, name, etc.)
    // ...
    
    // If there are any errors, fail validation
    if (errors.length > 0) {
      result.errors = errors;
      return result;
    }
    
    // All validations passed
    result.success = true;
    result.user = {
      email,
      name,
      createdAt: new Date()
    };
    
    return result;
  } catch (unexpectedError) {
    // Handle any unexpected errors
    console.error("Unexpected error:", unexpectedError);
    result.errors.push({
      field: "general",
      message: "An unexpected error occurred. Please try again."
    });
    return result;
  } finally {
    // Log attempt (would be logged to server in real app)
    console.log(\`Registration attempt: \${result.success ? 'SUCCESS' : 'FAILED'}\`);
  }
}`,
          exercise: {
            instructions:
              'Create a function that validates user input for a login form with email and password fields. Implement at least two custom error types. Use try/catch blocks to handle and report different kinds of validation errors.',
          },
        },
      ],
      prepperSummary: `
    <div class="prepper-summary">
      <h3>🔑 Key Interview Takeaways</h3>
      <ul>
        <li><strong>Conditional Logic:</strong> Know when to use if/else versus switch versus object lookups. Understand how to structure conditionals for readability and performance.</li>
        
        <li><strong>Looping Constructs:</strong> Master various loop types and their use cases. Understand the benefits of array methods over traditional loops and how to handle nested iterations efficiently.</li>
        
        <li><strong>Exception Handling:</strong> Create proper error hierarchies, catch specific error types, and implement graceful fallbacks. Know how to handle errors in both synchronous and asynchronous code.</li>
        
        <li><strong>Code Optimization:</strong> Be able to refactor control flow for better performance, readability, and maintainability.</li>
      </ul>
      
      <h4>📝 Common Interview Questions</h4>
      <ol>
        <li>"What's the difference between for...in and for...of loops?"</li>
        <li>"How would you implement a role-based access control system?"</li>
        <li>"Explain error handling in asynchronous JavaScript code"</li>
        <li>"How would you refactor nested if statements for better readability?"</li>
        <li>"How can you break out of nested loops efficiently?"</li>
      </ol>
    </div>
  `,
    }, // end of Lesson 3
    {
      title: 'Functions and Scope',
      description: 'Understand function declarations, expressions, scope, and closures.',
      sections: [
        {
          title: 'Function Declarations vs Expressions',
          explanation: `
        <p>JavaScript offers multiple ways to define functions, each with distinct characteristics that affect how and when you should use them:</p>
        
        <h4>Function Declaration vs Expression: More Than Syntax</h4>
        <p>The differences between function declarations and expressions extend beyond mere syntax:</p>

        <p><strong>Hoisting behavior:</strong> Function declarations are fully hoisted, meaning both the declaration and definition are moved to the top of their scope. This allows calling them before they appear in the code. Function expressions only hoist the variable declaration (if using var), not the definition.</p>

        <p><strong>Use in conditional blocks:</strong> Function declarations inside conditional blocks are handled inconsistently across browsers and should be avoided. Function expressions work predictably in all situations.</p>

        <p><strong>Recursion and references:</strong> Named function expressions (like const factorial = function fact(n) {...}) allow reliable self-reference for recursion even if the variable is reassigned.</p>

        <h4>Arrow Functions: Beyond Conciseness</h4>
        <p>Arrow functions aren't just syntactic sugar - they have fundamental behavioral differences:</p>

        <p><strong>Lexical 'this':</strong> Arrow functions inherit 'this' from their surrounding scope, solving a common pain point with callbacks and event handlers.</p>

        <p><strong>No 'arguments' object:</strong> Arrow functions don't have their own 'arguments' object. They access the arguments of their containing function instead.</p>

        <p><strong>Can't be constructors:</strong> Arrow functions cannot be used with 'new' as they lack a prototype property.</p>

        <p><strong>No 'super' or 'new.target':</strong> These keywords are not available in arrow functions.</p>

        <p>The choice between function types affects code behavior, not just style. Modern JavaScript often uses declarations for main functions and arrow functions for callbacks to avoid 'this' binding issues.</p>
        
        <h4>Function Syntax Types</h4>
        <div class="code-example">
          <pre><code>// Function declaration (hoisted)
function greet(name) {
  return \`Hello, \${name}!\`;
}

// Function expression (not hoisted)
const sayHello = function(name) {
  return \`Hello, \${name}!\`;
};

// Arrow function (concise, lexical this)
const greetArrow = (name) => \`Hello, \${name}!\`;

// Method definition in objects
const user = {
  name: "Alice",
  // Method shorthand
  greet() {
    return \`Hi, I'm \${this.name}!\`;
  },
  // Arrow function (doesn't bind this to user)
  greetArrow: () => {
    return \`Hi, I'm \${this.name}!\`; // this is not user
  }
};</code></pre>
        </div>
        
        <h4>Function Hoisting and 'this' Binding</h4>
        <div class="code-example">
          <pre><code>// Function declaration hoisting
console.log(hoistedFunc("JavaScript")); // Works!
function hoistedFunc(language) {
  return \`Hello, \${language}!\`;
}

// Function expressions are not hoisted
// console.log(notHoisted("JavaScript")); // Error!
const notHoisted = function(language) {
  return \`Hello, \${language}!\`;
};

// 'this' binding differences
function regularFunction() {
  console.log(this); // Depends on how it's called
}

const arrowFunction = () => {
  console.log(this); // Inherits 'this' from surrounding scope
};

const obj = { method: regularFunction };
obj.method(); // 'this' is obj

const detached = obj.method;
detached(); // 'this' is window/global/undefined</code></pre>
        </div>
        
        <div class="interview-tip">
          <p><span class="interview-icon">🎯</span> <strong>Interview Focus:</strong> Be prepared to discuss hoisting behavior, differences between function types, and when to use each approach.</p>
          <p>Key areas to focus on:</p>
          <ul>
            <li>Understanding how 'this' works differently in regular vs. arrow functions</li>
            <li>Explaining the benefits of function expressions vs. declarations</li>
            <li>Knowing when IIFEs are useful (like creating private scope)</li>
            <li>Recognizing the practical implications of hoisting</li>
            <li>Solving problems with 'this' binding in event handlers and callbacks</li>
          </ul>
        </div>
        `,
          codeExample: `// Counter module with different function types
const createCounter = function() {
  // Private state using closure
  let count = 0;
  
  // Return object with methods
  return {
    // Method shorthand
    increment() {
      count++;
      return count;
    },
    
    // Regular function as method
    decrement: function() {
      count--;
      return count;
    },
    
    // Arrow function maintains 'this'
    reset: () => {
      count = 0;
      return count;
    },
    
    // Creating detachable methods that preserve 'this'
    createDetachable() {
      // Method 1: Using arrow function
      return () => {
        count++;
        return count;
      };
      
      // Method 2: Using bind
      // return this.increment.bind(this);
      
      // Method 3: Using closure with 'self'
      // const self = this;
      // return function() {
      //   return self.increment();
      // };
    }
  };
};

// Usage
const counter = createCounter();
console.log(counter.increment()); // 1
console.log(counter.increment()); // 2
console.log(counter.decrement()); // 1
console.log(counter.reset()); // 0

// Detachable method keeps context
const incrementFunc = counter.createDetachable();
console.log(incrementFunc()); // 1

// IIFE for creating a module with private state
const Calculator = (function() {
  // Private variables
  let result = 0;
  
  // Private functions
  function validate(n) {
    return typeof n === 'number' && !isNaN(n);
  }
  
  // Public API
  return {
    add(n) {
      if (validate(n)) result += n;
      return this;
    },
    
    getResult() {
      return result;
    }
  };
})();`,
          exercise: {
            instructions:
              'Create a counter object with methods for increment, decrement, and reset. Implement each method using a different function type (declaration, expression, arrow). Add a method that allows the counter to be used independently from the object while still accessing the count.',
          },
        },
        {
          title: 'Function Parameters and Return Values',
          explanation: `
        <p>JavaScript provides flexible ways to handle function parameters and return values that can dramatically improve code clarity and robustness:</p>
        
        <h4>Advanced Parameter Handling</h4>
        <p>ES6 significantly improved JavaScript's parameter handling capabilities:</p>

        <p><strong>Default parameters:</strong> Go beyond simple defaults by using expressions or functions as default values. They're evaluated at call time, so each call with defaults gets a fresh evaluation.</p>

        <p><strong>Rest parameters:</strong> Collect remaining arguments into a proper array with complete array methods, unlike the array-like 'arguments' object. This enables using array methods directly on collected parameters.</p>

        <p><strong>Destructuring:</strong> Extract values from objects and arrays directly in the parameter list, making function signatures more declarative and reducing boilerplate assignment code.</p>

        <h4>Flexible Return Patterns</h4>
        <p>JavaScript's flexible return system enables powerful design patterns:</p>

        <p><strong>Early returns:</strong> Using multiple return statements for different conditions improves readability by eliminating deep nesting in conditional statements.</p>

        <p><strong>Returning objects:</strong> When returning multiple values, returning objects with named properties provides self-documenting code that's less prone to errors than returning arrays where position matters.</p>

        <p><strong>Method chaining:</strong> Returning 'this' from methods enables fluent interfaces with method chaining, as seen in libraries like jQuery or in builder patterns.</p>

        <p><strong>Return functions:</strong> Returning functions creates closures that maintain access to the original function's scope, enabling function factories, currying, and partial application.</p>

        <p>These parameter and return techniques are hallmarks of modern JavaScript code that distinguish advanced developers.</p>
        
        <h4>Parameter Handling Techniques</h4>
        <div class="code-example">
          <pre><code>// Default parameters
function greet(name = "Guest", greeting = "Hello") {
  return \`\${greeting}, \${name}!\`;
}
console.log(greet()); // "Hello, Guest!"

// Rest parameters
function sum(...numbers) {
  return numbers.reduce((total, num) => total + num, 0);
}
console.log(sum(1, 2, 3, 4)); // 10

// Destructuring parameters
function displayUser({ name, age, email = "N/A" }) {
  return \`\${name} is \${age} years old. Email: \${email}\`;
}
console.log(displayUser({ name: "Alice", age: 30 }));</code></pre>
        </div>
        
        <h4>Returning Values</h4>
        <div class="code-example">
          <pre><code>// Returning single values
function isAdult(age) {
  return age >= 18;
}

// Returning multiple values with arrays
function getMinMax(numbers) {
  return [Math.min(...numbers), Math.max(...numbers)];
}
const [min, max] = getMinMax([5, 1, 9, 3]);

// Returning multiple values with objects
function getStats(numbers) {
  return {
    count: numbers.length,
    sum: numbers.reduce((a, b) => a + b, 0),
    average: numbers.reduce((a, b) => a + b, 0) / numbers.length
  };
}
const { count, average } = getStats([1, 2, 3, 4]);</code></pre>
        </div>
        
        <h4>Function Overloading Simulation</h4>
        <div class="code-example">
          <pre><code>// Simulating function overloading
function process(arg) {
  // Different behavior based on input type
  if (Array.isArray(arg)) {
    return arg.map(x => x * 2);
  } else if (typeof arg === 'object' && arg !== null) {
    return Object.keys(arg);
  } else if (typeof arg === 'string') {
    return arg.toUpperCase();
  } else {
    return "Unsupported type";
  }
}

console.log(process([1, 2, 3]));      // [2, 4, 6]
console.log(process({a: 1, b: 2}));   // ["a", "b"]
console.log(process("hello"));        // "HELLO"</code></pre>
        </div>
        
        <div class="interview-tip">
          <p><span class="interview-icon">🎯</span> <strong>Interview Focus:</strong> Be prepared to discuss parameter handling techniques, returning multiple values, and function overloading patterns.</p>
          <p>Interviewers often look for:</p>
          <ul>
            <li>Creative use of destructuring to simplify parameter handling</li>
            <li>Effective use of default parameters for flexibility</li>
            <li>Knowledge of different ways to return multiple values</li>
            <li>Understanding the limitations of JavaScript's parameter system</li>
            <li>Techniques for simulating function overloading</li>
          </ul>
        </div>
      `,
          codeExample: `// Flexible data processing function with multiple parameter patterns
function processUserData() {
  let data, options;
  
  // Handle different parameter patterns
  if (arguments.length === 0) {
    data = {};
    options = {};
  }
  else if (arguments.length === 1) {
    if (arguments[0].hasOwnProperty('data') && arguments[0].hasOwnProperty('options')) {
      // Single object with { data, options } structure
      data = arguments[0].data;
      options = arguments[0].options;
    } else {
      // Just data object
      data = arguments[0];
      options = {};
    }
  }
  else if (arguments.length === 2) {
    // Two separate parameters: data, options
    data = arguments[0];
    options = arguments[1];
  }
  else {
    throw new Error("Invalid arguments");
  }
  
  // Default options
  const defaultOptions = {
    trim: true,
    uppercase: false,
    maxLength: Infinity,
    required: []
  };
  
  // Merge with provided options
  const finalOptions = { ...defaultOptions, ...options };
  
  // Process the data
  const result = {
    valid: true,
    processed: {},
    errors: []
  };
  
  // Process each field
  for (const [key, value] of Object.entries(data)) {
    let processedValue = value;
    
    // Check required fields
    if (finalOptions.required.includes(key) && 
        (value === undefined || value === null || value === '')) {
      result.errors.push(\`Field '\${key}' is required\`);
      result.valid = false;
      continue;
    }
    
    // Skip null/undefined non-required values
    if (processedValue === undefined || processedValue === null) {
      continue;
    }
    
    // Convert to string if not already
    if (typeof processedValue !== 'string') {
      processedValue = String(processedValue);
    }
    
    // Apply transforms based on options
    if (finalOptions.trim) {
      processedValue = processedValue.trim();
    }
    
    if (finalOptions.uppercase) {
      processedValue = processedValue.toUpperCase();
    }
    
    if (processedValue.length > finalOptions.maxLength) {
      processedValue = processedValue.substring(0, finalOptions.maxLength);
    }
    
    // Store processed value
    result.processed[key] = processedValue;
  }
  
  return result;
}

// Usage examples
console.log(processUserData({ 
  name: " John Doe ", 
  email: "john@example.com" 
}));

console.log(processUserData(
  { name: "Jane Smith" }, 
  { uppercase: true, required: ['email'] }
));

console.log(processUserData({
  data: { name: "Bob Jones" },
  options: { trim: false }
}));`,
          exercise: {
            instructions:
              'Create a function that processes user data with flexible parameters. It should accept different calling patterns (single object, separate parameters, etc.) and apply transformations based on options. Add parameter validation and return a result object with processed data and any validation errors.',
          },
        },
        {
          title: 'Scope and Closures',
          explanation: `
        <p>Scope and closures are among JavaScript's most powerful yet frequently misunderstood concepts:</p>
        
        <h4>Scope: JavaScript's Memory Organization System</h4>
        <p>Scope is more than just variable accessibility - it's how JavaScript organizes memory and manages variable lifetimes:</p>

        <p><strong>Lexical scope:</strong> JavaScript uses lexical (static) scoping, meaning variable access is determined by where variables and blocks of code are authored, not where functions are called from.</p>

        <p><strong>Scope chain:</strong> When JavaScript can't find a variable in the current scope, it looks up the scope chain to parent scopes, all the way to the global scope. This one-way traversal is why inner scopes can access outer variables but not vice versa.</p>

        <p><strong>Temporal Dead Zone (TDZ):</strong> Variables declared with let and const exist in a "temporal dead zone" from the start of their scope until the declaration is executed, causing reference errors if accessed too early.</p>

        <h4>Closures: Functions With Memory</h4>
        <p>Closures are a direct consequence of lexical scoping and are fundamental to JavaScript's expressiveness:</p>

        <p><strong>Definition:</strong> A closure is a function that remembers and can access its lexical scope even when executed outside that scope. In simpler terms, closures "remember" the environment they were created in.</p>

        <p><strong>Key applications:</strong> Closures enable data privacy (through module patterns), state persistence between function calls, and partial application of functions.</p>

        <p><strong>Memory implications:</strong> Variables captured in closures aren't garbage-collected as long as the closure exists, which can lead to memory leaks if not managed carefully.</p>

        <p><strong>Common patterns:</strong> Immediate Invoked Function Expressions (IIFEs), factory functions, and the module pattern all leverage closures to create private state and encapsulation.</p>

        <p>Mastering closures separates intermediate from advanced JavaScript developers and is essential for understanding many JavaScript patterns and frameworks.</p>
        
        <h4>Scope Types</h4>
        <div class="code-example">
          <pre><code>// Global scope
const globalVar = "I'm global";

// Function scope
function outer() {
  const functionScopedVar = "I'm function-scoped";
  var alsoFunctionScoped = "Also function-scoped";
  
  if (true) {
    // Block scope
    const blockScopedVar = "I'm block-scoped";
    let alsoBlockScoped = "Also block-scoped";
    var notBlockScoped = "Function-scoped, not block-scoped";
    
    console.log(blockScopedVar); // Accessible
    console.log(functionScopedVar); // Accessible (outer scope)
    console.log(globalVar); // Accessible (global scope)
  }
  
  // console.log(blockScopedVar); // Error: not defined
  console.log(notBlockScoped); // Accessible (var is function-scoped)
}

outer();
// console.log(functionScopedVar); // Error: not defined</code></pre>
        </div>
        
        <h4>Closures: Functions with Persistent Memory</h4>
        <div class="code-example">
          <pre><code>// Basic closure
function createGreeter(greeting) {
  // greeting is part of closure
  return function(name) {
    return \`\${greeting}, \${name}!\`;
  };
}

const sayHello = createGreeter("Hello");
console.log(sayHello("Alice")); // "Hello, Alice!"

// Closures for data privacy
function createCounter() {
  let count = 0; // Private variable
  
  return {
    increment() { return ++count; },
    decrement() { return --count; },
    getValue() { return count; }
  };
}

const counter = createCounter();
console.log(counter.increment()); // 1
console.log(counter.increment()); // 2
console.log(counter.getValue()); // 2
// console.log(counter.count); // undefined (private)</code></pre>
        </div>
        
        <h4>Common Closure Patterns</h4>
        <div class="code-example">
          <pre><code>// Module pattern with IIFE
const Calculator = (function() {
  // Private variables and functions
  let result = 0;
  
  function validate(n) {
    return typeof n === 'number' && !isNaN(n);
  }
  
  // Public API
  return {
    add(n) {
      if (validate(n)) result += n;
      return this;
    },
    subtract(n) {
      if (validate(n)) result -= n;
      return this;
    },
    getResult() {
      return result;
    }
  };
})();

// Closure pitfall in loops
function createFunctions() {
  const funcs = [];
  
  // Problem: all functions share the same 'i'
  for (var i = 0; i < 3; i++) {
    funcs.push(function() { return i; });
  }
  
  return funcs;
}

const functions = createFunctions();
console.log(functions[0]()); // 3, not 0 (expected)

// Solution: use let (block scope) or an IIFE</code></pre>
        </div>
        
        <div class="interview-tip">
          <p><span class="interview-icon">🎯</span> <strong>Interview Focus:</strong> Be prepared to discuss recognizing and creating closures, using closures for data privacy, and avoiding common scope-related bugs.</p>
          <p>Key areas to focus on:</p>
          <ul>
            <li>Explaining what a closure is in simple terms</li>
            <li>Using closures to create private variables in objects</li>
            <li>Understanding common closure-related bugs (like in loops)</li>
            <li>Implementing the module pattern correctly</li>
            <li>Balancing the benefits of closures against memory considerations</li>
          </ul>
        </div>
      `,
          codeExample: `// Banking system using closures for data privacy
function createBankAccount(initialBalance = 0, accountName = "Default Account") {
  // Private variables
  let balance = initialBalance;
  const transactions = [];
  const accountId = Date.now() + Math.floor(Math.random() * 1000);
  let status = "active";
  
  // Private functions
  function recordTransaction(type, amount, successful, newBalance) {
    const transaction = {
      id: Date.now(),
      type,
      amount,
      successful,
      timestamp: new Date(),
      resultingBalance: successful ? newBalance : balance
    };
    
    transactions.push(transaction);
    return transaction;
  }
  
  function validateAmount(amount) {
    return typeof amount === 'number' && amount > 0 && !isNaN(amount);
  }
  
  function checkStatus() {
    if (status !== "active") {
      throw new Error(\`Account is \${status}. No operations allowed.\`);
    }
  }
  
  // Public API
  return {
    // Get account information
    getInfo() {
      return {
        name: accountName,
        id: accountId,
        status,
        balance
      };
    },
    
    // Deposit money
    deposit(amount) {
      try {
        checkStatus();
        
        if (!validateAmount(amount)) {
          const error = new Error("Invalid deposit amount");
          recordTransaction("deposit", amount, false);
          throw error;
        }
        
        balance += amount;
        const transaction = recordTransaction("deposit", amount, true, balance);
        
        return {
          success: true,
          newBalance: balance,
          transaction
        };
      } catch (error) {
        return {
          success: false,
          error: error.message
        };
      }
    },
    
    // Withdraw money
    withdraw(amount) {
      try {
        checkStatus();
        
        if (!validateAmount(amount)) {
          const error = new Error("Invalid withdrawal amount");
          recordTransaction("withdrawal", amount, false);
          throw error;
        }
        
        if (balance < amount) {
          const error = new Error("Insufficient funds");
          recordTransaction("withdrawal", amount, false);
          throw error;
        }
        
        balance -= amount;
        const transaction = recordTransaction("withdrawal", amount, true, balance);
        
        return {
          success: true,
          newBalance: balance,
          transaction
        };
      } catch (error) {
        return {
          success: false,
          error: error.message
        };
      }
    },
    
    // Get transaction history
    getTransactionHistory() {
      // Return a copy to prevent modification
      return [...transactions];
    }
  };
}

// Example usage
const account = createBankAccount(1000, "Savings Account");
console.log(account.getInfo());
console.log(account.deposit(500));
console.log(account.withdraw(200));
console.log(account.getInfo());`,
          exercise: {
            instructions:
              'Create a simple banking system with accounts that maintain private balances using closures. Implement deposit, withdraw, and transfer methods. Add validation to prevent invalid operations like negative deposits or withdrawals exceeding the balance.',
          },
        },
      ],
      prepperSummary: `
    <div class="prepper-summary">
      <h3>🔑 Key Interview Takeaways</h3>
      <ul>
        <li><strong>Function Types:</strong> Understand the differences between function declarations, expressions, and arrow functions, especially regarding hoisting and 'this' binding.</li>
        
        <li><strong>Parameter Handling:</strong> Master techniques like default parameters, rest parameters, and destructuring to create flexible, powerful functions. Know how to handle multiple return values.</li>
        
        <li><strong>Scope:</strong> Understand global, function, and block scope, and how different variable declarations (var, let, const) interact with scope.</li>
        
        <li><strong>Closures:</strong> Be able to explain and implement closures for data privacy, module patterns, and maintaining state between function calls.</li>
      </ul>
      
      <h4>📝 Common Interview Questions</h4>
      <ol>
        <li>"What's the difference between arrow functions and regular functions?"</li>
        <li>"Explain how closures work and provide a practical example"</li>
        <li>"How do you handle default parameters in JavaScript?"</li>
        <li>"What's the module pattern and why is it useful?"</li>
        <li>"How do you handle loss of 'this' context in event handlers or callbacks?"</li>
      </ol>
    </div>
  `,
    }, // end of lesson 4
    {
      title: 'Working with Types and Type Conversion',
      description: "Master JavaScript's type system and understand type coercion.",
      sections: [
        {
          title: 'Type Detection and Checking',
          explanation: `
        <p>JavaScript's dynamic typing system offers flexibility but requires careful type checking strategies for robust applications:</p>
        
        <h4>Beyond typeof: Comprehensive Type Detection</h4>
        <p>While typeof is the primary type checking operator, it has significant limitations:</p>

        <p><strong>The null anomaly:</strong> typeof null returns "object", a historical bug that can't be fixed without breaking the web. Always use explicit null checks (value === null).</p>

        <p><strong>Arrays as objects:</strong> typeof [] returns "object", failing to distinguish arrays from plain objects. Use Array.isArray() for reliable array detection.</p>

        <p><strong>Primitive wrappers:</strong> typeof new String("text") returns "object", not "string", which can cause confusion with boxed primitives.</p>

        <p>For comprehensive type checking, use a combination of techniques:</p>

        <p><strong>Object.prototype.toString:</strong> Returns "[object Type]", revealing the internal [[Class]] property. This correctly identifies Date, RegExp, and other built-in types.</p>

        <p><strong>instanceof:</strong> Checks the prototype chain but is unreliable across different execution contexts (e.g., iframes) and doesn't work for primitives.</p>

        <h4>Practical Type Checking in Applications</h4>
        <p>Production-quality applications often implement robust type checking systems:</p>

        <p><strong>Type guard functions:</strong> Create specialized functions for commonly checked types (isString, isNumber, isPlainObject) to encapsulate logic and improve readability.</p>

        <p><strong>Duck typing:</strong> When interface matters more than concrete type, check for the presence of expected methods or properties rather than exact types.</p>

        <p><strong>Schema validation:</strong> For complex objects like API responses, use schema validation libraries rather than hand-coding type checks.</p>

        <p>Effective type checking is a cornerstone of defensive programming in JavaScript's loosely-typed environment.</p>
        
        <h4>Basic Type Checking</h4>
        <div class="code-example">
          <pre><code>// typeof operator
console.log(typeof 42);          // "number"
console.log(typeof "hello");     // "string"
console.log(typeof true);        // "boolean"
console.log(typeof undefined);   // "undefined"
console.log(typeof null);        // "object" (⚠️ JavaScript bug)
console.log(typeof {});          // "object"
console.log(typeof []);          // "object" (⚠️ Not "array")
console.log(typeof function(){}); // "function"

// instanceof operator (checks prototype chain)
console.log([] instanceof Array);        // true
console.log({} instanceof Object);       // true
console.log(new Date() instanceof Date); // true
console.log("string" instanceof String); // false (primitive)</code></pre>
        </div>
        
        <h4>Reliable Type Checking</h4>
        <div class="code-example">
          <pre><code>// Array.isArray() for arrays
console.log(Array.isArray([]));         // true
console.log(Array.isArray({}));         // false

// Object.prototype.toString for all types
function getType(value) {
  return Object.prototype.toString.call(value).slice(8, -1);
}

console.log(getType(42));          // "Number"
console.log(getType("hello"));     // "String"
console.log(getType([]));          // "Array"
console.log(getType(null));        // "Null"
console.log(getType(new Date()));  // "Date"

// Checking for null/undefined
console.log(value === null);       // Check for null
console.log(value === undefined);  // Check for undefined
console.log(value == null);        // Check for either</code></pre>
        </div>
        
        <div class="interview-tip">
          <p><span class="interview-icon">🎯</span> <strong>Interview Focus:</strong> Be prepared to discuss overcoming limitations of built-in type checking, handling edge cases, and implementing robust type checking utilities.</p>
          <p>Key areas to focus on:</p>
          <ul>
            <li>Working around the limitations of <code>typeof</code> for null, arrays, and other types</li>
            <li>Creating type utilities that handle edge cases like <code>NaN</code></li>
            <li>Implementing a comprehensive type checking system for validation</li>
            <li>Handling complex scenarios like distinguishing between arrays and plain objects</li>
          </ul>
        </div>
      `,
          codeExample: `// Comprehensive type checking utility
const TypeChecker = {
  // Get precise type information
  getType(value) {
    if (value === null) return 'null';
    if (value === undefined) return 'undefined';
    
    // Handle special cases
    if (Number.isNaN(value)) return 'nan';
    
    // Use toString for accuracy with built-in types
    const typeString = Object.prototype.toString.call(value);
    return typeString.slice(8, -1).toLowerCase();
  },
  
  // Check if value is a specific type
  is(value, type) {
    return this.getType(value) === type.toLowerCase();
  },
  
  // Basic type checkers
  isString(value) {
    return typeof value === 'string';
  },
  
  isNumber(value) {
    return typeof value === 'number' && !isNaN(value);
  },
  
  isBoolean(value) {
    return typeof value === 'boolean';
  },
  
  isObject(value) {
    return value !== null && typeof value === 'object';
  },
  
  isArray(value) {
    return Array.isArray(value);
  },
  
  // More specialized checkers
  isPlainObject(value) {
    if (this.getType(value) !== 'object') return false;
    
    // Check if it's a direct instance of Object
    const prototype = Object.getPrototypeOf(value);
    return prototype === null || prototype === Object.prototype;
  },
  
  isDate(value) {
    return value instanceof Date && !isNaN(value.getTime());
  },
  
  isPrimitive(value) {
    return value === null || 
           value === undefined || 
           typeof value === 'string' || 
           typeof value === 'number' || 
           typeof value === 'boolean' || 
           typeof value === 'symbol' || 
           typeof value === 'bigint';
  },
  
  // Validation helpers
  isEmail(value) {
    if (!this.isString(value)) return false;
    
    // Basic email validation regex
    const emailRegex = /^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/;
    return emailRegex.test(value);
  },
  
  isURL(value) {
    if (!this.isString(value)) return false;
    
    try {
      new URL(value);
      return true;
    } catch {
      return false;
    }
  }
};

// Using the type checker
function validateUserInput(input) {
  const errors = {};
  
  // Name validation
  if (!input.name) {
    errors.name = 'Name is required';
  } else if (!TypeChecker.isString(input.name) || input.name.length < 2) {
    errors.name = 'Name must be a string with at least 2 characters';
  }
  
  // Email validation
  if (!input.email) {
    errors.email = 'Email is required';
  } else if (!TypeChecker.isEmail(input.email)) {
    errors.email = 'Invalid email format';
  }
  
  // Age validation (optional)
  if (input.age !== undefined) {
    if (!TypeChecker.isNumber(input.age) || input.age < 0) {
      errors.age = 'Age must be a positive number';
    }
  }
  
  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
}`,
          exercise: {
            instructions:
              'Create a type checking utility that can validate user input for a registration form. Include validators for email, URL, and numeric fields. Use your utility to validate a form with name, email, age, and website fields.',
          },
        },
        {
          title: 'Type Conversion and Coercion',
          explanation: `
        <p>JavaScript's type conversion system is a double-edged sword, enabling concise code but also introducing subtle bugs if misunderstood:</p>
        
        <h4>Implicit vs Explicit Conversion</h4>
        <p>JavaScript performs two kinds of type conversion:</p>

        <p><strong>Implicit conversion (coercion):</strong> Automatic type conversion performed by JavaScript when operations involve different types. This includes string concatenation with +, numeric conversion with comparison operators, and boolean conversion in logical contexts.</p>

        <p><strong>Explicit conversion:</strong> Deliberate conversion using functions like String(), Number(), Boolean(), or methods like toString() and valueOf().</p>

        <p>Best practices generally favor explicit conversion for clarity and predictability, though there are idiomatic uses of coercion that experienced developers recognize.</p>

        <h4>The Conversion Hierarchy</h4>
        <p>When converting between types, JavaScript follows specific rules:</p>

        <p><strong>To string:</strong> Almost everything has a reasonable string representation. Objects convert by calling their toString() method, with a fallback to "[object Object]".</p>

        <p><strong>To number:</strong> Strings are parsed as numeric literals, true becomes 1, false becomes 0, null becomes 0, undefined becomes NaN, and objects first call valueOf() then toString().</p>

        <p><strong>To boolean:</strong> The falsy values (false, 0, "", null, undefined, NaN) convert to false; everything else converts to true.</p>

        <h4>Common Coercion Pitfalls</h4>
        <p>Several coercion scenarios regularly trip up developers:</p>

        <p><strong>Addition vs other operators:</strong> The + operator performs string concatenation if either operand is a string, while -, *, /, etc. always convert to numbers.</p>

        <p><strong>Loose equality traps:</strong> The == operator performs type coercion, leading to surprises like [] == false (true) and '' == 0 (true).</p>

        <p><strong>Object conversion:</strong> Objects can define custom valueOf() and toString() methods that affect how they behave in coercion contexts, which can be both powerful and confusing.</p>

        <p>Understanding these conversion rules is essential for debugging and writing predictable JavaScript code.</p>
        
        <h4>Implicit Type Conversion</h4>
        <div class="code-example">
          <pre><code>// String conversion
console.log(1 + "2");        // "12" (number → string)
console.log([1, 2] + [3, 4]); // "1,23,4" (arrays → strings)

// Numeric conversion
console.log("5" - 1);        // 4 (string → number)
console.log("5" * 2);        // 10 (string → number)
console.log(true + 1);       // 2 (boolean → number)

// Boolean conversion
console.log(Boolean(1));     // true
console.log(Boolean(""));    // false
console.log(Boolean(0));     // false
console.log(Boolean([]));    // true
console.log(Boolean(null));  // false</code></pre>
        </div>
        
        <h4>Explicit Type Conversion</h4>
        <div class="code-example">
          <pre><code>// String conversion
console.log(String(123));     // "123"
console.log(String(true));    // "true"
console.log(String(null));    // "null"
console.log(String([1, 2]));  // "1,2"

// Number conversion
console.log(Number("123"));   // 123
console.log(Number(""));      // 0
console.log(Number(true));    // 1
console.log(Number(null));    // 0
console.log(Number("abc"));   // NaN

// Using parseInt/parseFloat
console.log(parseInt("123.45"));   // 123 (integer only)
console.log(parseFloat("123.45")); // 123.45
console.log(parseInt("123abc"));   // 123 (stops at non-digit)
console.log(parseInt("10", 2));    // 2 (binary, base 2)</code></pre>
        </div>
        
        <h4>Equality Comparison and Coercion</h4>
        <div class="code-example">
          <pre><code>// Loose equality (==) with coercion
console.log(1 == "1");        // true (string → number)
console.log(0 == false);      // true (boolean → number)
console.log(null == undefined); // true (special case)

// Strict equality (===) without coercion
console.log(1 === "1");       // false (different types)
console.log(0 === false);     // false (different types)

// Object to primitive conversion
const obj = {
  valueOf() { return 42; },
  toString() { return "Object string"; }
};

console.log(obj + 1);         // 43 (calls valueOf)
console.log(\`\${obj}\`);         // "Object string" (calls toString)</code></pre>
        </div>
        
        <div class="interview-tip">
          <p><span class="interview-icon">🎯</span> <strong>Interview Focus:</strong> Be prepared to discuss the rules of type coercion, handling unexpected behavior, and controlling type conversion.</p>
          <p>Key areas to master:</p>
          <ul>
            <li>The rules for implicit type conversion in different operators</li>
            <li>When to use strict (===) vs. loose (==) equality</li>
            <li>Common gotchas in type coercion, like <code>[] == false</code> being true</li>
            <li>Best practices for avoiding unexpected type conversion</li>
            <li>Safe parsing techniques for user input</li>
          </ul>
        </div>
      `,
          codeExample: `// Safe data parsing utility
function safeParse(value, type) {
  // Handle null/undefined
  if (value === null || value === undefined) {
    return { 
      success: false, 
      value: null, 
      error: "Value is null or undefined" 
    };
  }
  
  try {
    switch (type) {
      case 'string':
        return {
          success: true,
          value: String(value)
        };
        
      case 'number':
        // Convert to number and check if it's valid
        const num = Number(value);
        if (isNaN(num)) {
          return { 
            success: false, 
            value: null, 
            error: \`"\${value}" is not a valid number\` 
          };
        }
        return { success: true, value: num };
        
      case 'integer':
        // For integers, parse and validate
        const int = parseInt(value, 10);
        if (isNaN(int) || String(int) !== String(value)) {
          return { 
            success: false, 
            value: null, 
            error: \`"\${value}" is not a valid integer\` 
          };
        }
        return { success: true, value: int };
        
      case 'boolean':
        // Handle truthy/falsy string conversion
        if (typeof value === 'string') {
          const lowered = value.toLowerCase().trim();
          if (['true', 'yes', '1'].includes(lowered)) {
            return { success: true, value: true };
          }
          if (['false', 'no', '0'].includes(lowered)) {
            return { success: true, value: false };
          }
        }
        return { success: true, value: Boolean(value) };
        
      case 'date':
        // Try to parse as a date
        const date = new Date(value);
        if (isNaN(date.getTime())) {
          return { 
            success: false, 
            value: null, 
            error: \`"\${value}" is not a valid date\` 
          };
        }
        return { success: true, value: date };
        
      default:
        return { 
          success: false, 
          value: null, 
          error: \`Unknown type "\${type}"\` 
        };
    }
  } catch (error) {
    return { 
      success: false, 
      value: null, 
      error: error.message 
    };
  }
}

// Process form data with type conversion
function processForm(formData) {
  const result = {
    success: true,
    values: {},
    errors: {}
  };
  
  // Parse name (string)
  const nameResult = safeParse(formData.name, "string");
  if (nameResult.success) {
    result.values.name = nameResult.value;
  } else {
    result.success = false;
    result.errors.name = nameResult.error;
  }
  
  // Parse age (integer)
  const ageResult = safeParse(formData.age, "integer");
  if (ageResult.success) {
    result.values.age = ageResult.value;
  } else {
    result.success = false;
    result.errors.age = ageResult.error;
  }
  
  // Parse email (validate as string first)
  if (formData.email) {
    const emailResult = safeParse(formData.email, "string");
    if (emailResult.success) {
      // Additional email validation
      const emailRegex = /^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/;
      if (emailRegex.test(emailResult.value)) {
        result.values.email = emailResult.value;
      } else {
        result.success = false;
        result.errors.email = "Invalid email format";
      }
    } else {
      result.success = false;
      result.errors.email = emailResult.error;
    }
  }
  
  return result;
}

// Example usage
const formData = {
  name: "John Smith",
  age: "30",   // String that should be converted to integer
  email: "john@example.com"
};

console.log(processForm(formData));`,
          exercise: {
            instructions:
              'Create a function that safely converts user input to appropriate types. Implement validation for strings, numbers, booleans, and dates. Return both the converted value and any validation errors that occur.',
          },
        },
      ],
      prepperSummary: `
    <div class="prepper-summary">
      <h3>🔑 Key Interview Takeaways</h3>
      <ul>
        <li><strong>Type Detection:</strong> Know the limitations of <code>typeof</code> and how to overcome them with <code>instanceof</code>, <code>Array.isArray()</code>, and <code>Object.prototype.toString</code>.</li>
        
        <li><strong>Type Coercion:</strong> Understand the rules for implicit type conversion in JavaScript, especially for the + operator and equality comparisons.</li>
        
        <li><strong>Explicit Conversion:</strong> Master the different methods for explicitly converting between types, including their edge cases and limitations.</li>
        
        <li><strong>Equality Comparisons:</strong> Know when to use strict (===) vs loose (==) equality and the coercion rules that apply to loose equality.</li>
        
        <li><strong>User Input Validation:</strong> Apply type checking and conversion techniques to safely handle and validate user input.</li>
      </ul>
      
      <h4>📝 Common Interview Questions</h4>
      <ol>
        <li>"Why does <code>typeof null</code> return 'object' and how do you check for null?"</li>
        <li>"Explain the difference between == and === with examples"</li>
        <li>"What happens when you add a string and a number in JavaScript?"</li>
        <li>"How would you implement a function to detect the exact type of a JavaScript value?"</li>
        <li>"What's the result of <code>[] == false</code> and why?"</li>
      </ol>
    </div>
  `,
    }, // End of JavaScript Fundamentals lessons
  ],
  challenge: {
    description:
      'You\'re building a "Text Adventure Game Engine" that uses JavaScript fundamentals to create an interactive story experience. Your engine needs to handle player input, track game state, and tell an engaging story.',
    requirements: [
      'Create a game state manager using closures to keep track of player progress',
      'Build a command parser that handles different types of player input',
      'Implement a simple inventory system with items that have different properties',
      'Add a validation system to prevent invalid player actions',
      'Use error handling to provide helpful feedback to the player',
    ],
    starterCode: `// Text Adventure Game Engine
// Demonstrate your JavaScript fundamentals by building a mini game engine

const TextAdventure = {
  /**
   * Creates a new game with a private state
   * Returns methods to interact with the game
   */
  createGame(title, startingRoom = "start") {
    // Use closures to create private game state
    const gameState = {
      title,
      currentRoom: startingRoom,
      inventory: [],
      rooms: {},
      flags: {}  // Track game progress/events
    };
    
    // Return an object with methods to interact with the game
    return {
      // Add a room to the game
      addRoom(roomId, description, exits = {}) {
        // Your code here
      },
      
      // Add an item that can be picked up
      addItem(roomId, itemId, name, description, properties = {}) {
        // Your code here
      },
      
      // Process player commands (like "go north", "take key", etc.)
      processCommand(commandString) {
        // Your code here
        // Should handle different command types and validate input
      },
      
      // Get the current game state for display
      getStatus() {
        // Return current room, description, exits, and inventory
      },
      
      // Check if a game condition is true (for puzzles/progression)
      checkCondition(condition) {
        // Your code here - handle complex condition checks
      }
    };
  },
  
  // Create and return a sample game
  createSampleGame() {
    const game = this.createGame("The Haunted Mansion");
    
    // Add rooms
    game.addRoom("start", "You're standing in front of a spooky mansion. The door is slightly ajar.", {
      "north": "foyer"
    });
    
    game.addRoom("foyer", "You're in a dusty foyer. A grand staircase leads upstairs, and there are doors to the east and west.", {
      "south": "start",
      "east": "living_room",
      "west": "dining_room",
      "up": "upstairs"
    });
    
    // Add some items
    game.addItem("foyer", "key", "Rusty Key", "An old rusty key with strange markings.", {
      canTake: true,
      unlocks: "cabinet"
    });
    
    // Add more rooms and items as needed
    
    return game;
  }
};

export default TextAdventure;`,
  },
}

export default javascriptFundamentals
