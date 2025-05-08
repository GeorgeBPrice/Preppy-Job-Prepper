// #ES6+ Features

const es6Features = {
  title: 'ES6+ Features',
  description: 'Master modern JavaScript syntax and features for cleaner, more expressive code.',
  lessons: [
    {
      title: 'Destructuring',
      description: 'Learn powerful ways to extract values from objects and arrays.',
      sections: [
        {
          title: 'Object Destructuring',
          explanation: `
        <p>Object destructuring provides an elegant and concise way to extract multiple properties from objects into distinct variables, reducing repetition and improving code readability.</p>
        
        <h4>Basic Object Destructuring</h4>
        <p>At its core, object destructuring allows you to unpack object properties by matching property names. Instead of accessing properties with dot notation multiple times, you can extract them in a single, readable statement.</p>
        
        <p>The key concept is that destructuring creates variables with the same names as the object's properties. This creates a clear, visual mapping between the object structure and the variables you're creating.</p>
        
        <div class="code-example">
          <pre><code>// Without destructuring
const user = { name: 'John', age: 30, role: 'Developer' };
const name = user.name;
const age = user.age;

// With destructuring - cleaner and more concise
const { name, age } = user;</code></pre>
        </div>
        
        <h4>Assigning to Different Variable Names</h4>
        <p>Sometimes you want to extract a property but assign it to a variable with a different name. This is particularly useful when working with multiple objects that might have conflicting property names, or when the property name isn't a valid or desirable variable name.</p>
        
        <p>Using the syntax <code>{ originalName: newName }</code>, you can rename properties as you destructure them:</p>
        
        <div class="code-example">
          <pre><code>// Renaming variables during destructuring
const { name: userName, age: userAge } = user;
console.log(userName); // 'John'
console.log(userAge);  // 30</code></pre>
        </div>
        
        <h4>Default Values</h4>
        <p>Destructuring can provide default values for properties that might be <code>undefined</code>, creating more robust code that handles missing data gracefully. This is particularly valuable when working with APIs or user input where certain fields might be optional.</p>
        
        <p>Using the syntax <code>{ propertyName = defaultValue }</code>, you can specify fallback values:</p>
        
        <div class="code-example">
          <pre><code>// Setting defaults for missing properties
const { name, age, location = 'Unknown' } = user;
console.log(location); // 'Unknown' if not in user object</code></pre>
        </div>
        
        <h4>Nested Destructuring</h4>
        <p>For complex objects with nested structures, you can use nested destructuring patterns to extract deeply embedded properties in a single statement. This is extremely valuable when working with complex API responses or state management systems like Redux.</p>
        
        <p>Nested destructuring follows the structure of the object itself, allowing you to reach into nested objects to extract specific properties:</p>
        
        <div class="code-example">
          <pre><code>// Extracting nested properties
const employee = {
  id: 1001,
  personalInfo: {
    name: 'Sarah',
    contact: { email: 'sarah@example.com', phone: '123-456-7890' }
  }
};

const { personalInfo: { name, contact: { email } } } = employee;
console.log(name);  // 'Sarah'
console.log(email); // 'sarah@example.com'</code></pre>
        </div>
        
        <div class="interview-tip">
          <p><span class="interview-icon">🎯</span> <strong>Interview Focus:</strong> Object destructuring is frequently used in modern JavaScript codebases, and interviewers look for fluency with this syntax.</p>
          <p>Key points to understand:</p>
          <ul>
            <li>How destructuring enhances code readability and reduces repetition</li>
            <li>Handling missing properties with default values</li>
            <li>Combining destructuring with renaming for cleaner function parameters</li>
            <li>Using nested destructuring for complex data structures</li>
            <li>How destructuring is commonly used in React components and modern frameworks</li>
          </ul>
        </div>
      `,
          codeExample: `// Practical Object Destructuring Examples

// 1. Function parameters with destructuring
function displayUserProfile({ name, age, role = 'User', location = 'Unknown' }) {
  console.log(\`Name: \${name}, Age: \${age}, Role: \${role}, Location: \${location}\`);
}

// Using the function - only need to pass an object
displayUserProfile({ name: 'Alex', age: 28, role: 'Designer' });
// Output: "Name: Alex, Age: 28, Role: Designer, Location: Unknown"

// 2. Destructuring in loops
const users = [
  { id: 1, name: 'John', email: 'john@example.com' },
  { id: 2, name: 'Sarah', email: 'sarah@example.com' }
];

for (const { id, name } of users) {
  console.log(\`User \${id}: \${name}\`);
}

// 3. Combining with rest operator
const { name, age, ...otherInfo } = { 
  name: 'Emily', 
  age: 32, 
  role: 'Manager',
  department: 'Marketing',
  location: 'New York'
};

console.log(otherInfo); 
// { role: 'Manager', department: 'Marketing', location: 'New York' }

// 4. Destructuring returned objects from functions
function getUserInfo() {
  return {
    id: 123,
    name: 'Michael',
    stats: {
      followers: 452,
      following: 261
    }
  };
}

// Extract only what we need
const { id, stats: { followers } } = getUserInfo();
console.log(\`User \${id} has \${followers} followers\`);
// "User 123 has 452 followers"

// 5. Destructuring with complex default values
function fetchConfig(options) {
  const { 
    endpoint, 
    headers = { 'Content-Type': 'application/json' }, 
    timeout = 5000 
  } = options || {};
  
  // Use the extracted values
  console.log(endpoint, headers, timeout);
}

// 6. Conditional property destructuring
function processResponse(response) {
  const { 
    status,
    data,
    error = status >= 400 ? 'Something went wrong' : null
  } = response;
  
  if (error) {
    console.error(error);
    return;
  }
  
  // Process successful response
  console.log(data);
}`,
          exercise: {
            instructions:
              "Create a function that takes a complex user object and extracts specific information based on the user's role. Implement a data transformation function that uses nested destructuring to convert API responses into a standardized format. Write a component configuration function that uses destructuring with default values to create robust configurations with minimal input.",
          },
        },
        {
          title: 'Array Destructuring',
          explanation: `
        <p>Array destructuring extracts values from arrays and assigns them to variables based on their position, enabling more elegant handling of array data and reducing the need for temporary variables and multiple array access operations.</p>
        
        <h4>Basic Array Destructuring</h4>
        <p>Unlike object destructuring which uses property names, array destructuring uses <em>position-based assignment</em> to extract elements into variables. This makes it ideal for working with ordered collections and function returns that use arrays.</p>
        
        <p>The key concept is that variables are assigned in the same order as the array elements, creating an intuitive mapping between array positions and variable names:</p>
        
        <div class="code-example">
          <pre><code>// Without destructuring
const colors = ['red', 'green', 'blue'];
const first = colors[0];
const second = colors[1];

// With destructuring
const [first, second] = colors;
console.log(first);  // 'red'
console.log(second); // 'green'</code></pre>
        </div>
        
        <h4>Skipping Elements</h4>
        <p>You can skip elements in the array by leaving empty slots (commas with no variable name) in the destructuring pattern. This provides a concise way to extract only the elements you need without creating unnecessary variables for items you don't care about.</p>
        
        <p>This technique is particularly useful when dealing with functions that return arrays with known positions for different types of data:</p>
        
        <div class="code-example">
          <pre><code>// Skip the second element
const [first, , third] = ['red', 'green', 'blue'];
console.log(first);  // 'red'
console.log(third);  // 'blue'</code></pre>
        </div>
        
        <h4>Rest Operator in Array Destructuring</h4>
        <p>The rest operator (<code>...</code>) can collect remaining elements into a new array, providing a clean way to split arrays or extract specific elements while keeping the rest together. This is particularly useful for extracting the "head" and "tail" of an array, or getting the first few items separately while gathering the rest.</p>
        
        <p>The rest element must come last in the destructuring pattern and will collect all remaining items:</p>
        
        <div class="code-example">
          <pre><code>// Collecting remaining elements
const [head, ...tail] = [1, 2, 3, 4, 5];
console.log(head); // 1
console.log(tail); // [2, 3, 4, 5]</code></pre>
        </div>
        
        <h4>Default Values</h4>
        <p>Similar to object destructuring, you can provide default values for array elements that might be <code>undefined</code>. This is especially useful when working with functions that might return arrays with optional elements, making your code more resilient to incomplete data.</p>
        
        <p>Using the syntax <code>[variable = defaultValue]</code>, you can specify fallbacks for missing values:</p>
        
        <div class="code-example">
          <pre><code>// Default values for missing elements
const [name, age, role = 'User'] = ['John', 30];
console.log(role); // 'User'</code></pre>
        </div>
        
        <div class="interview-tip">
          <p><span class="interview-icon">🎯</span> <strong>Interview Focus:</strong> Array destructuring shows your familiarity with modern JS patterns that produce cleaner, more maintainable code.</p>
          <p>Key points to understand:</p>
          <ul>
            <li>Using array destructuring to handle function returns with multiple values</li>
            <li>Swapping values without temporary variables</li>
            <li>Combining with rest/spread operators for flexible array manipulation</li>
            <li>Performance considerations versus traditional array access</li>
            <li>Common patterns like extracting the first few items while collecting the rest</li>
          </ul>
        </div>
      `,
          codeExample: `// Array Destructuring in Practice

// 1. Function that returns multiple values
function getCoordinates() {
  // Calculate or retrieve values
  return [33.7490, -84.3880, 'Atlanta'];
}

// Extract values directly when calling the function
const [latitude, longitude, city] = getCoordinates();
console.log(\`\${city}: \${latitude}, \${longitude}\`);
// "Atlanta: 33.749, -84.388"

// 2. Swapping variables without a temporary variable
let a = 5, b = 10;
[a, b] = [b, a];
console.log(a, b); // 10 5

// 3. Extracting values from a complex array structure
const data = ['John Smith', 'Developer', ['JavaScript', 'React', 'Node.js']];
const [fullName, position, [primarySkill, ...otherSkills]] = data;

console.log(\`\${fullName} is a \${position}\`);
console.log(\`Primary skill: \${primarySkill}\`);
console.log(\`Other skills: \${otherSkills.join(', ')}\`);

// 4. Combining with functions that return arrays
const str = 'first_name=John&last_name=Doe&age=35';

function parseQueryString(queryString) {
  const pairs = queryString.split('&');
  return pairs.map(pair => pair.split('='));
}

const parsedData = parseQueryString(str);
// Results in: [['first_name', 'John'], ['last_name', 'Doe'], ['age', '35']]

// Convert to object using array destructuring in a loop
const queryParams = {};
for (const [key, value] of parsedData) {
  queryParams[key] = value;
}

console.log(queryParams); 
// { first_name: 'John', last_name: 'Doe', age: '35' }

// 5. Using with Promise.all()
async function fetchUserAndPosts(userId) {
  const [user, posts] = await Promise.all([
    fetchUser(userId),     // Returns user data
    fetchPosts(userId)     // Returns user's posts
  ]);
  
  return { user, posts };
}

// 6. Function with flexible arguments using default values
function processValues([first = 0, second = 0, third = 0] = []) {
  return first + second + third;
}

console.log(processValues([1, 2, 3]));   // 6
console.log(processValues([1, 2]));      // 3
console.log(processValues([10]));        // 10
console.log(processValues([]));          // 0
console.log(processValues());            // 0 (uses empty array default)`,
          exercise: {
            instructions:
              'Write a function that parses CSV data using array destructuring to extract and process each row. Implement a task scheduler that returns progress updates as arrays, and use destructuring to handle these updates elegantly. Create a function that uses nested array destructuring to transform complex data structures into a simplified format.',
          },
        },
      ],
      prepperSummary: `
    <div class="prepper-summary">
      <h3>🔑 Key Interview Takeaways</h3>
      <ul>
        <li><strong>Object Destructuring:</strong> Extract multiple properties from objects in a single statement, with the ability to rename variables, assign default values, and handle nested structures.</li>
        
        <li><strong>Array Destructuring:</strong> Extract values from arrays by position, with support for skipping elements, collecting remaining items with rest operators, and providing default values.</li>
        
        <li><strong>Practical Applications:</strong> Destructuring shines in function parameters, handling API responses, working with module imports, and extracting specific data from complex structures.</li>
        
        <li><strong>Default Values:</strong> Both object and array destructuring support default values, making code more resilient to missing or undefined data.</li>
        
        <li><strong>Destructuring Patterns:</strong> Become familiar with common patterns like extracting specific properties while collecting others with rest operators, nested destructuring, and using destructuring in loops.</li>
      </ul>
      
      <h4>📝 Common Interview Questions</h4>
      <ol>
        <li>"How does object destructuring differ from array destructuring?"</li>
        <li>"How would you extract nested properties from a complex object?"</li>
        <li>"How would you use destructuring to swap two variables?"</li>
        <li>"Explain how to use default values with destructuring"</li>
        <li>"How would you combine destructuring with the rest operator?"</li>
      </ol>
    </div>
  `,
    },

    {
      title: 'Template Literals',
      description: 'Learn how to create more readable strings with embedded expressions.',
      sections: [
        {
          title: 'Basic Template Literals',
          explanation: `
        <p>Template literals provide a more powerful and readable way to work with strings in JavaScript, solving many frustrations developers faced with traditional string concatenation and offering new capabilities like multi-line strings and expression embedding.</p>
        
        <h4>String Interpolation</h4>
        <p>Template literals use backticks (<code>\`\`</code>) instead of quotes and allow you to embed expressions directly in your strings using the <code>\${...}</code> syntax. This eliminates the need for messy string concatenation with <code>+</code> operators, making code cleaner and easier to read.</p>
        
        <p>Key advantages of string interpolation include:</p>
        <ul>
          <li>More readable code with embedded values directly where they belong in the string</li>
          <li>Fewer errors from forgetting to concatenate spaces between strings</li>
          <li>Better syntax highlighting in code editors, making string boundaries clearer</li>
          <li>The ability to embed any valid JavaScript expression, not just variables</li>
        </ul>
        
        <div class="code-example">
          <pre><code>// String concatenation (old way)
const name = 'John';
const greeting = 'Hello ' + name + ', welcome to our site!';

// Template literals (modern way)
const betterGreeting = \`Hello \${name}, welcome to our site!\`;

// Expressions can be complex
const price = 19.99;
const quantity = 2;
const total = \`Total: $\${(price * quantity).toFixed(2)}\`;</code></pre>
        </div>
        
        <h4>Multi-line Strings</h4>
        <p>Template literals preserve line breaks and indentation, making it much easier to create multi-line strings without explicit <code>\\n</code> newline characters or concatenation. This is particularly valuable for creating HTML templates, SQL queries, or any text that has a natural multi-line structure.</p>
        
        <p>Before template literals, creating multi-line strings was awkward and error-prone:</p>
        <ul>
          <li>String concatenation with <code>+</code> and <code>\\n</code> was verbose and hard to read</li>
          <li>Array joining was a workaround but added unnecessary complexity</li>
          <li>Maintaining proper indentation was difficult and often inconsistent</li>
        </ul>
        
        <div class="code-example">
          <pre><code>// Multi-line with concatenation (old way)
const message = 'This is line one.\\n' +
  'This is line two.\\n' +
  'This is line three.';

// Multi-line with template literals
const betterMessage = \`This is line one.
This is line two.
This is line three.\`;

// Great for HTML templates
const htmlTemplate = \`
  &lt;div class="user-card">
    &lt;h2>\${user.name}&lt;/h2>
    &lt;p>\${user.bio}&lt;/p>
  &lt;/div>
\`;</code></pre>
        </div>
        
        <div class="interview-tip">
          <p><span class="interview-icon">🎯</span> <strong>Interview Focus:</strong> Template literals show your familiarity with modern JavaScript and ability to write cleaner, more maintainable code.</p>
          <p>Key points to understand:</p>
          <ul>
            <li>When to use template literals over traditional string concatenation</li>
            <li>How template literals improve code readability, especially for complex strings</li>
            <li>Use cases for multi-line strings, such as SQL queries or HTML templates</li>
            <li>Performance considerations compared to traditional strings</li>
            <li>How template literals form the foundation for tagged template literals</li>
          </ul>
        </div>
      `,
          codeExample: `// Template Literals in Real-world Scenarios

// 1. Creating dynamic HTML templates
function createUserCard(user) {
  return \`
    <div class="user-card" id="user-\${user.id}">
      <img src="\${user.avatar || 'default-avatar.png'}" alt="\${user.name}'s avatar">
      <div class="user-info">
        <h3>\${user.name}</h3>
        <p class="title">\${user.title || 'No title'}</p>
        <p class="email">\${user.email}</p>
        <div class="stats">
          <span>\${user.followers} followers</span>
          <span>\${user.following} following</span>
        </div>
      </div>
    </div>
  \`;
}

// 2. Constructing complex URLs
function buildApiUrl(baseUrl, endpoint, params) {
  const queryString = Object.entries(params)
    .map(([key, value]) => \`\${encodeURIComponent(key)}=\${encodeURIComponent(value)}\`)
    .join('&');
  
  return \`\${baseUrl}/\${endpoint}?\${queryString}\`;
}

const url = buildApiUrl(
  'https://api.example.com', 
  'users/search', 
  { query: 'john', limit: 10, sort: 'name' }
);

// 3. Building SQL queries
function createSelectQuery(table, fields, conditions) {
  const whereClause = conditions 
    ? \` WHERE \${Object.entries(conditions)
        .map(([field, value]) => \`\${field} = '\${value}'\`)
        .join(' AND ')}\` 
    : '';
  
  return \`
    SELECT \${fields.join(', ')}
    FROM \${table}\${whereClause};
  \`;
}

const query = createSelectQuery(
  'users',
  ['id', 'name', 'email'],
  { active: true, role: 'admin' }
);

// 4. Error messages with context
function validateUserInput(data) {
  if (!data.email) {
    throw new Error(\`Invalid user data: missing required field 'email' in \${JSON.stringify(data)}\`);
  }
  
  // Other validations...
}

// 5. Console debugging with context
function debug(component, ...messages) {
  console.log(
    \`[\${new Date().toISOString()}] [\${component}]:\`,
    ...messages
  );
}

debug('UserService', 'Fetching user data', { userId: 123 });`,
          exercise: {
            instructions:
              'Create a template function that generates dynamic email content based on user actions. Implement a logging utility that uses template literals to format log messages with timestamps, log levels, and contextual data. Build an SQL query builder that uses template literals to construct complex queries with proper escaping of values.',
          },
        },
        {
          title: 'Tagged Template Literals',
          explanation: `
        <p>Tagged template literals are an advanced feature that allows you to process template literals with a function, enabling powerful string manipulation and the creation of domain-specific languages (DSLs). They represent one of the most flexible and powerful features in modern JavaScript.</p>
        
        <h4>Basic Tag Functions</h4>
        <p>A tag function receives the static parts and evaluated expressions of a template literal as separate arguments, allowing for fine-grained control over how the string is constructed. This separation is crucial as it lets you process static content and dynamic values differently.</p>
        
        <p>The tag function format has a specific signature:</p>
        <ul>
          <li>First parameter: An array of the template's string literals (the static parts)</li>
          <li>Remaining parameters: The evaluated values of the expressions embedded in the template</li>
          <li>Alternatively, you can use rest parameters to collect all expressions: <code>function tag(strings, ...values)</code></li>
        </ul>
        
        <div class="code-example">
          <pre><code>// Simple tag function
function highlight(strings, ...values) {
  return strings.reduce((result, str, i) => {
    return result + str + (values[i] ? \`<span class="highlight">\${values[i]}</span>\` : '');
  }, '');
}

const name = 'John';
const result = highlight\`Hello \${name}, welcome to our site!\`;
// Returns: "Hello <span class="highlight">John</span>, welcome to our site!"</code></pre>
        </div>
        
        <h4>Practical Applications</h4>
        <p>Tagged template literals have diverse practical applications, from security enhancements like HTML escaping to advanced features in modern libraries and frameworks. They are particularly powerful for creating domain-specific languages within JavaScript.</p>
        
        <p>Common use cases include:</p>
        <ul>
          <li><strong>Security:</strong> Automatic escaping of user input to prevent XSS attacks</li>
          <li><strong>Internationalization (i18n):</strong> Processing strings for translation while keeping expressions intact</li>
          <li><strong>Styled Components:</strong> Creating CSS-in-JS solutions (like in React)</li>
          <li><strong>Database Queries:</strong> Building parameterized SQL to prevent injections</li>
          <li><strong>GraphQL:</strong> Creating structured query documents</li>
        </ul>
        
        <div class="code-example">
          <pre><code>// HTML escaping to prevent XSS
function safeHTML(strings, ...values) {
  const escaped = values.map(value => 
    String(value)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;')
  );
  
  return strings.reduce((result, str, i) => 
    result + str + (escaped[i] || ''), '');
}

const userInput = '<script>alert("XSS")</script>';
const safeMessage = safeHTML\`User message: \${userInput}\`;
// Safely escapes the HTML</code></pre>
        </div>
        
        <div class="interview-tip">
          <p><span class="interview-icon">🎯</span> <strong>Interview Focus:</strong> Tagged template literals demonstrate advanced JavaScript knowledge and the ability to create elegant, secure solutions.</p>
          <p>Key points to understand:</p>
          <ul>
            <li>How tag functions receive and process the template parts</li>
            <li>Security benefits like automatic escaping for preventing XSS</li>
            <li>Use cases in libraries like styled-components or GraphQL</li>
            <li>Creating domain-specific languages with tagged templates</li>
            <li>Performance implications of using tagged templates</li>
          </ul>
        </div>
      `,
          codeExample: `// Advanced Tagged Template Literals

// 1. Simple styled-components like implementation
function css(strings, ...values) {
  return strings.reduce((result, str, i) => {
    return result + str + (values[i] !== undefined ? values[i] : '');
  }, '');
}

function styled(element) {
  return (strings, ...values) => {
    const style = css(strings, ...values);
    return function(props) {
      const el = document.createElement(element);
      el.style.cssText = style;
      
      // Apply props to element
      Object.entries(props || {}).forEach(([key, value]) => {
        if (key === 'className') {
          el.className = value;
        } else if (key === 'children') {
          if (Array.isArray(value)) {
            value.forEach(child => {
              if (typeof child === 'string') {
                el.appendChild(document.createTextNode(child));
              } else if (child instanceof Node) {
                el.appendChild(child);
              }
            });
          } else if (typeof value === 'string') {
            el.textContent = value;
          }
        } else {
          el.setAttribute(key, value);
        }
      });
      
      return el;
    };
  };
}

// Usage
const Button = styled('button')\`
  background-color: \${props => props.primary ? 'blue' : 'gray'};
  color: white;
  padding: 8px 16px;
  border-radius: 4px;
  border: none;
  cursor: pointer;
\`;

// 2. SQL template tag for safe queries
function sql(strings, ...values) {
  // In a real implementation, this would use proper SQL escaping
  const escaped = values.map(value => {
    if (value === null) return 'NULL';
    if (typeof value === 'number') return value.toString();
    if (typeof value === 'boolean') return value ? '1' : '0';
    // Escape strings to prevent SQL injection
    return \`'\${String(value).replace(/'/g, "''")}'}\`;
  });
  
  return strings.reduce((result, str, i) => 
    result + str + (escaped[i] !== undefined ? escaped[i] : ''), '');
}

// Usage
const userId = 42;
const userInput = "O'Reilly";  // Note the problematic apostrophe
const query = sql\`
  SELECT * FROM users 
  WHERE id = \${userId} 
  AND name LIKE \${userInput + '%'}
\`;

// 3. Internationalization tag
function i18n(strings, ...values) {
  // This would typically look up translations from a language file
  const translate = str => {
    const translations = {
      'en': {
        'Hello': 'Hello',
        'Welcome to': 'Welcome to',
        'My name is': 'My name is'
      },
      'es': {
        'Hello': 'Hola',
        'Welcome to': 'Bienvenido a',
        'My name is': 'Me llamo'
      }
    };
    
    const lang = 'es'; // Would be determined by user preference
    return translations[lang][str] || str;
  };
  
  // Translate the static parts (the strings)
  const translatedStrings = strings.map(str => 
    // Translate each word/phrase in the string
    str.replace(/\\b(?:Hello|Welcome to|My name is)\\b/g, match => 
      translate(match)
    )
  );
  
  // Reconstruct with values
  return translatedStrings.reduce((result, str, i) => 
    result + str + (values[i] !== undefined ? values[i] : ''), '');
}

// Usage
const name = 'John';
const site = 'Example.com';
const greeting = i18n\`Hello \${name}! Welcome to \${site}. My name is \${name}.\`;

// 4. Debug tag for enhanced logging
function debug(strings, ...values) {
  const output = strings.reduce((result, str, i) => {
    const value = values[i];
    const formattedValue = value !== undefined 
      ? typeof value === 'object' 
        ? JSON.stringify(value, null, 2)
        : String(value)
      : '';
    
    return result + str + formattedValue;
  }, '');
  
  console.log(\`[DEBUG \${new Date().toISOString()}] \${output}\`);
  return output;
}

// Usage
const user = { id: 1, name: 'Alice' };
debug\`Processing user \${user} at priority level \${user.priority || 'normal'}\`;`,
          exercise: {
            instructions:
              'Create a tagged template function that formats currency values based on locale and currency type. Implement a GraphQL-like query builder using tagged templates that converts template strings into valid query objects. Build a template tag for generating HTML that safely escapes user input to prevent XSS attacks while allowing specified safe HTML elements.',
          },
        },
      ],
      prepperSummary: `
    <div class="prepper-summary">
      <h3>🔑 Key Interview Takeaways</h3>
      <ul>
        <li><strong>String Interpolation:</strong> Template literals allow embedding expressions directly in strings with <code>\${...}</code> syntax, creating more readable code than traditional concatenation.</li>
        
        <li><strong>Multi-line Support:</strong> Template literals preserve line breaks and whitespace, making them perfect for HTML templates, SQL queries, and other multi-line text.</li>
        
        <li><strong>Tagged Templates:</strong> Functions can process template literals, enabling powerful features like automatic escaping, internationalization, and domain-specific languages.</li>
        
        <li><strong>Practical Applications:</strong> Template literals shine in generating dynamic HTML, building queries, creating error messages with context, and constructing complex strings.</li>
        
        <li><strong>Modern Libraries:</strong> Understanding how libraries like styled-components, GraphQL, and others leverage tagged templates demonstrates advanced JavaScript knowledge.</li>
      </ul>
      
      <h4>📝 Common Interview Questions</h4>
      <ol>
        <li>"What advantages do template literals offer over traditional string concatenation?"</li>
        <li>"How would you create a tag function that sanitizes user input in HTML?"</li>
        <li>"Explain how template literals handle expressions that evaluate to different types"</li>
        <li>"How would you implement a simple version of a styled-components tag?"</li>
        <li>"What are the performance implications of using template literals vs. string concatenation?"</li>
      </ol>
    </div>
  `,
    },

    {
      title: 'Spread and Rest Operators',
      description:
        'Learn to use the versatile ... operator for arrays, objects, and function parameters.',
      sections: [
        {
          title: 'Spread Operator',
          explanation: `
        <p>The spread operator (<code>...</code>) expands iterables like arrays and objects into individual elements, enabling elegant solutions for common programming tasks without mutating the original data structures.</p>
        
        <h4>Array Spreading</h4>
        <p>The spread operator unpacks array elements, making it simple to combine arrays, create copies, and insert elements at specific positions without mutating the original arrays. This is a cornerstone of functional programming in JavaScript and immutable data patterns.</p>
        
        <p>Key use cases for array spreading include:</p>
        <ul>
          <li><strong>Combining arrays</strong> - Merge multiple arrays into a new array</li>
          <li><strong>Creating copies</strong> - Make shallow copies of arrays without reference issues</li>
          <li><strong>Adding elements</strong> - Add elements to specific positions without <code>splice()</code></li>
          <li><strong>Converting iterables</strong> - Transform array-like objects or other iterables into arrays</li>
          <li><strong>Passing arguments</strong> - Pass array elements as individual arguments to functions</li>
        </ul>
        
        <div class="code-example">
          <pre><code>// Combining arrays
const fruits = ['apple', 'banana'];
const moreFruits = ['orange', 'grape'];
const allFruits = [...fruits, ...moreFruits];
// ['apple', 'banana', 'orange', 'grape']

// Creating a new array with additional elements
const updatedFruits = [...fruits, 'cherry'];
// ['apple', 'banana', 'cherry']

// Copying an array (shallow copy)
const fruitsCopy = [...fruits];

// Inserting elements at a specific position
const inserted = [...fruits.slice(0, 1), 'strawberry', ...fruits.slice(1)];
// ['apple', 'strawberry', 'banana']</code></pre>
        </div>
        
        <h4>Object Spreading</h4>
        <p>Object spreading was introduced in ES2018 and works similarly to array spreading, allowing for easy object cloning and property merging. This is particularly valuable for working with immutable data patterns in frameworks like React and Redux.</p>
        
        <p>Important aspects of object spreading:</p>
        <ul>
          <li><strong>Property merging</strong> - Later properties override earlier ones with the same name</li>
          <li><strong>Shallow copying</strong> - Only creates a new top-level object; nested objects maintain their references</li>
          <li><strong>Immutable updates</strong> - Create new objects rather than modifying existing ones</li>
          <li><strong>Cleaner syntax</strong> - More readable than <code>Object.assign()</code> for creating object copies with modifications</li>
        </ul>
        
        <div class="code-example">
          <pre><code>// Merging objects
const person = { name: 'John', age: 30 };
const details = { job: 'Developer', age: 32 };
const combined = { ...person, ...details };
// { name: 'John', job: 'Developer', age: 32 }
// Note: later properties override earlier ones with the same name

// Adding properties to a new object
const updated = { ...person, email: 'john@example.com' };
// { name: 'John', age: 30, email: 'john@example.com' }

// Creating a shallow copy
const personCopy = { ...person };</code></pre>
        </div>
        
        <h4>Function Arguments</h4>
        <p>Spread can be used to pass multiple arguments to a function in a cleaner, more flexible way, especially for variadic functions that accept any number of arguments. This replaces the older <code>apply()</code> method with more readable syntax.</p>
        
        <p>Common scenarios for spreading function arguments:</p>
        <ul>
          <li><strong>Math operations</strong> - Passing arrays to functions like <code>Math.max()</code></li>
          <li><strong>Function composition</strong> - Forwarding arguments from one function to another</li>
          <li><strong>API compatibility</strong> - Working with functions that expect individual arguments</li>
          <li><strong>Combining with rest parameters</strong> - Creating flexible function interfaces</li>
        </ul>
        
        <div class="code-example">
          <pre><code>// Using spread with function arguments
const numbers = [1, 2, 3, 4, 5];

// Instead of apply
Math.max.apply(null, numbers); // 5

// With spread operator
Math.max(...numbers); // 5

// Combining with regular arguments
function process(first, second, ...others) {
  console.log(\`First: \${first}, Second: \${second}, Others: \${others.length}\`);
}

process(...['a', 'b', 'c', 'd', 'e']);
// "First: a, Second: b, Others: 3"</code></pre>
        </div>
        
        <div class="interview-tip">
          <p><span class="interview-icon">🎯</span> <strong>Interview Focus:</strong> The spread operator is essential for writing clean, immutable code—a key skill for modern JavaScript development.</p>
          <p>Key points to understand:</p>
          <ul>
            <li>How spread enables immutable operations on arrays and objects</li>
            <li>Performance implications of spread vs. older methods like <code>Object.assign</code></li>
            <li>Shallow vs. deep copying implications when using spread</li>
            <li>Common patterns for using spread in React and other modern frameworks</li>
            <li>The relationship between spread syntax and destructuring</li>
          </ul>
        </div>
      `,
          codeExample: `// Practical Spread Operator Examples

// 1. Immutable state updates (common in Redux/React)
function updateUserState(state, userId, updates) {
  return {
    ...state,
    users: state.users.map(user => 
      user.id === userId 
        ? { ...user, ...updates } 
        : user
    )
  };
}

const appState = {
  users: [
    { id: 1, name: 'Alice', role: 'Admin' },
    { id: 2, name: 'Bob', role: 'User' }
  ],
  settings: { darkMode: true }
};

const newState = updateUserState(appState, 2, { role: 'Editor' });
// Now Bob's role is 'Editor' without mutating original state

// 2. Function arguments with default parameters
function createConfig(defaults, userConfig) {
  return {
    ...defaults,
    ...userConfig
  };
}

const defaultSettings = {
  theme: 'light',
  fontSize: 14,
  showSidebar: true,
  notifications: {
    email: true,
    push: false
  }
};

const userSettings = {
  theme: 'dark',
  notifications: {
    push: true
  }
};

const finalSettings = createConfig(defaultSettings, userSettings);
// Note: notifications is a shallow merge, email: true is preserved

// 3. Conditional object properties
function buildRequestObject(options) {
  return {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      ...options.auth && {
        'Authorization': \`Bearer \${options.auth.token}\`
      }
    },
    ...options.body && { body: JSON.stringify(options.body) },
    mode: 'cors',
    ...options.cache && { cache: options.cache }
  };
}

// 4. Array manipulations without mutations
function addItemIfNotExists(array, item) {
  return array.includes(item) ? array : [...array, item];
}

function removeItem(array, item) {
  const index = array.indexOf(item);
  return index >= 0 
    ? [...array.slice(0, index), ...array.slice(index + 1)]
    : array;
}

function updateItemAtIndex(array, index, newValue) {
  return [
    ...array.slice(0, index),
    newValue,
    ...array.slice(index + 1)
  ];
}

// 5. Clone and modify pattern for nested objects
function updateNestedProperty(obj, path, value) {
  if (path.length === 0) return value;
  
  const [head, ...rest] = path;
  
  return {
    ...obj,
    [head]: updateNestedProperty(obj[head] || {}, rest, value)
  };
}

const user = {
  id: 123,
  name: 'John',
  address: {
    city: 'New York',
    street: {
      name: 'Broadway',
      number: 123
    }
  }
};

const updatedUser = updateNestedProperty(
  user, 
  ['address', 'street', 'number'], 
  456
);`,
          exercise: {
            instructions:
              'Implement a deep merge utility function using the spread operator that combines nested objects properly. Create a set of immutable array helper functions (add, remove, update, insert) that use the spread operator to avoid mutations. Implement a state management function for a Redux-like store that uses spread to handle nested state updates without mutations.',
          },
        },
        {
          title: 'Rest Parameter',
          explanation: `
        <p>The rest parameter syntax (<code>...</code>) collects multiple function arguments into a single array, providing a cleaner alternative to working with the legacy <code>arguments</code> object and enabling more flexible function definitions.</p>
        
        <h4>Basic Rest Parameters</h4>
        <p>Rest parameters gather "the rest" of the function arguments into an array, enabling functions to accept a variable number of arguments in a more structured and intuitive way. This creates more readable and maintainable variadic functions (functions that accept any number of arguments).</p>
        
        <p>Key benefits of rest parameters include:</p>
        <ul>
          <li><strong>True array access</strong> - Rest parameters are real arrays with all array methods</li>
          <li><strong>Clear function signatures</strong> - The function declaration clearly shows which parameters are "gathered"</li>
          <li><strong>Compatibility with arrow functions</strong> - Unlike <code>arguments</code>, rest parameters work correctly in arrow functions</li>
          <li><strong>Partial gathering</strong> - Can gather only "the rest" after named parameters</li>
        </ul>
        
        <div class="code-example">
          <pre><code>// Rest parameters for variable arguments
function sum(...numbers) {
  return numbers.reduce((total, num) => total + num, 0);
}

sum(1, 2);            // 3
sum(1, 2, 3, 4, 5);   // 15

// Combining regular parameters with rest
function formatName(title, ...names) {
  const nameStr = names.join(' ');
  return \`\${title}. \${nameStr}\`;
}

formatName('Dr', 'John', 'Smith');         // "Dr. John Smith"
formatName('Ms', 'Jane', 'Marie', 'Doe');  // "Ms. Jane Marie Doe"</code></pre>
        </div>
        
        <h4>Rest vs. Arguments Object</h4>
        <p>The rest parameter has several advantages over the legacy <code>arguments</code> object, making it the preferred choice in modern JavaScript. Understanding these differences is important for writing effective modern code and for refactoring legacy applications.</p>
        
        <p>Key advantages over <code>arguments</code>:</p>
        <ul>
          <li><strong>Array methods</strong> - Rest parameters are real arrays with built-in methods like <code>map()</code>, <code>filter()</code>, and <code>reduce()</code></li>
          <li><strong>Clearer intent</strong> - The function signature clearly shows which parameters are collected</li>
          <li><strong>Partial collection</strong> - Only collects arguments that haven't been assigned to named parameters</li>
          <li><strong>Arrow function compatibility</strong> - Works correctly in arrow functions, unlike <code>arguments</code></li>
          <li><strong>Optimization</strong> - Allows JavaScript engines to optimize better than with <code>arguments</code></li>
        </ul>
        
        <div class="code-example">
          <pre><code>// Old way with arguments object
function oldSum() {
  // arguments is not a real array
  const args = Array.prototype.slice.call(arguments);
  return args.reduce((sum, num) => sum + num, 0);
}

// Modern way with rest parameters
function newSum(...numbers) {
  // numbers is a real array with all array methods
  return numbers.reduce((sum, num) => sum + num, 0);
}

// Works well with arrow functions
const multiply = (...factors) => 
  factors.reduce((product, factor) => product * factor, 1);</code></pre>
        </div>
        
        <h4>Rest in Destructuring</h4>
        <p>Rest parameters can be used in destructuring assignments to collect "the rest" of array elements or object properties, complementing the spread operator's functionality. This pattern is extremely useful for separating specific items from collections while keeping the remaining elements together.</p>
        
        <p>Common patterns with rest in destructuring:</p>
        <ul>
          <li><strong>Head/tail pattern</strong> - Extracting the first item(s) and collecting the rest</li>
          <li><strong>Extracting specific properties</strong> - Pulling out named properties while keeping others together</li>
          <li><strong>Omitting properties</strong> - Creating a new object without specific properties</li>
          <li><strong>Parameter destructuring</strong> - Combining object destructuring with rest in function parameters</li>
        </ul>
        
        <div class="code-example">
          <pre><code>// Rest in array destructuring
const [first, second, ...others] = [1, 2, 3, 4, 5];
console.log(others); // [3, 4, 5]

// Rest in object destructuring
const { name, age, ...rest } = {
  name: 'Alice',
  age: 30,
  occupation: 'Engineer',
  location: 'New York'
};
console.log(rest); // { occupation: 'Engineer', location: 'New York' }</code></pre>
        </div>
        
        <div class="interview-tip">
          <p><span class="interview-icon">🎯</span> <strong>Interview Focus:</strong> Understanding rest parameters shows your grasp of modern function design and variable argument handling.</p>
          <p>Key points to understand:</p>
          <ul>
            <li>Advantages of rest parameters over the <code>arguments</code> object</li>
            <li>Performance considerations when collecting and working with rest parameters</li>
            <li>Using rest in combination with destructuring for elegant code</li>
            <li>How rest parameters can simplify variadic function definitions</li>
            <li>When to use default parameters vs. rest parameters</li>
          </ul>
        </div>
      `,
          codeExample: `// Advanced Rest Parameter Usage

// 1. Function overloading with rest parameters
function createElement(type, ...args) {
  // Check what kind of arguments we received
  if (args.length === 1 && typeof args[0] === 'object') {
    // Called like: createElement('div', { className: 'container' })
    const [props] = args;
    return createElementWithProps(type, props);
  } else {
    // Called like: createElement('div', 'Hello World')
    const children = args;
    return createElementWithChildren(type, children);
  }
}

// 2. Event handlers with rest parameters
function createEventHub() {
  const hub = {};
  const events = {};

  hub.on = (event, ...handlers) => {
    events[event] = events[event] || [];
    handlers.forEach(handler => events[event].push(handler));
  };

  hub.emit = (event, ...args) => {
    const handlers = events[event] || [];
    handlers.forEach(handler => handler(...args));
  };

  return hub;
}

// Usage
const hub = createEventHub();
hub.on('user:login', 
  user => console.log(\`\${user.name} logged in\`),
  user => updateUI(user)
);
hub.emit('user:login', { name: 'John', id: 123 });

// 3. Combining rest with parameter defaults
function fetchData(endpoint, { 
  method = 'GET',
  headers = {},
  ...otherOptions
} = {}) {
  // Build request options
  const options = {
    method,
    headers: {
      'Content-Type': 'application/json',
      ...headers
    },
    ...otherOptions
  };
  
  return fetch(endpoint, options);
}

// 4. Flexible logging with rest
function logger(level, ...messages) {
  const timestamp = new Date().toISOString();
  const formattedMessages = messages.map(msg => 
    typeof msg === 'object' ? JSON.stringify(msg) : msg
  );
  
  console.log(\`[\${timestamp}] [\${level.toUpperCase()}]:\`, ...formattedMessages);
}

logger('info', 'User logged in', { userId: 123 });
logger('error', 'Failed to process payment', { orderId: 456 }, 'Retry scheduled');

// 5. Middleware pattern with rest parameters
function createMiddlewareStack() {
  const middlewares = [];
  
  return {
    use(...fns) {
      middlewares.push(...fns);
      return this;
    },
    
    execute(context) {
      let index = 0;
      
      function next() {
        const middleware = middlewares[index++];
        if (middleware) {
          return middleware(context, next);
        }
      }
      
      return next();
    }
  };
}

// Usage
const stack = createMiddlewareStack();
stack.use(
  (ctx, next) => {
    console.log('Middleware 1: start');
    next();
    console.log('Middleware 1: end');
  },
  (ctx, next) => {
    console.log('Middleware 2');
    ctx.value = 'processed';
    next();
  }
);

// 6. Data filtering with rest and object destructuring
function getUserDisplayData({ password, token, ...safeData }) {
  // Remove sensitive data, return only safe fields
  return safeData;
}

const userData = {
  id: 123,
  name: 'John Doe',
  email: 'john@example.com',
  password: 'secret123', // Sensitive
  token: 'jwt-token-here' // Sensitive
};

const safeUserData = getUserDisplayData(userData);
// { id: 123, name: 'John Doe', email: 'john@example.com' }`,
          exercise: {
            instructions:
              'Create a flexible API client function that uses rest parameters to handle different call signatures for convenience. Implement a currying function that uses rest parameters to support partial application with any number of arguments. Build a middleware system that can accept multiple middleware functions as rest parameters and execute them in sequence with proper error handling.',
          },
        },
      ],
      prepperSummary: `
    <div class="prepper-summary">
      <h3>🔑 Key Interview Takeaways</h3>
      <ul>
        <li><strong>Spread Operator:</strong> Used to expand iterables (arrays, objects) into individual elements, enabling clean copying, merging, and immutable operations.</li>
        
        <li><strong>Array Spreading:</strong> Perfect for creating new arrays with added elements, combining arrays, and passing multiple arguments to functions without mutations.</li>
        
        <li><strong>Object Spreading:</strong> Enables clean object cloning, property merging, and immutable state updates, crucial for modern frameworks like React/Redux.</li>
        
        <li><strong>Rest Parameters:</strong> Collects multiple function arguments into an array, providing a cleaner alternative to the <code>arguments</code> object for variable-argument functions.</li>
        
        <li><strong>Combined Usage:</strong> Spread and rest are often used together, especially in destructuring assignments, creating powerful patterns for data manipulation.</li>
      </ul>
      
      <h4>📝 Common Interview Questions</h4>
      <ol>
        <li>"What's the difference between the spread operator and the rest parameter?"</li>
        <li>"How would you create a deep clone of a nested object using spread?"</li>
        <li>"How would you use rest parameters to create a function that accepts any number of arguments?"</li>
        <li>"Explain how to use spread for immutable state updates in Redux reducers"</li>
        <li>"What are the limitations of using spread for copying complex objects?"</li>
      </ol>
    </div>
  `,
    },

    {
      title: 'Optional Chaining and Nullish Coalescing',
      description: 'Master modern techniques for safer property access and default values.',
      sections: [
        {
          title: 'Optional Chaining Operator',
          explanation: `
        <p>The optional chaining operator (<code>?.</code>) provides a concise and safe way to access nested object properties, even when an intermediate property doesn't exist. This greatly simplifies code that needs to access potentially undefined values in nested structures.</p>
        
        <h4>The Problem with Deep Property Access</h4>
        <p>Before optional chaining, accessing deeply nested properties required verbose checks to avoid "Cannot read property of undefined" errors. This defensive coding approach led to cumbersome, hard-to-read code that obscured the actual intent.</p>
        
        <p>Traditional approaches to safe property access include:</p>
        <ul>
          <li><strong>Nested if statements</strong> - Checking each level of the object hierarchy</li>
          <li><strong>AND operator chaining</strong> - Using <code>&&</code> for short-circuit evaluation</li>
          <li><strong>Try/catch blocks</strong> - Wrapping property access in error handling</li>
          <li><strong>Helper functions</strong> - Creating utilities like <code>get(obj, 'path.to.property')</code></li>
        </ul>
        
        <div class="code-example">
          <pre><code>// Without optional chaining (verbose and error-prone)
function getUserCity(user) {
  if (user && user.address && user.address.city) {
    return user.address.city;
  }
  return undefined;
}

// Or using the && operator for short-circuiting
const city = user && user.address && user.address.city;</code></pre>
        </div>
        
        <h4>Using Optional Chaining</h4>
        <p>The optional chaining operator provides a cleaner, more readable solution by short-circuiting the expression and returning <code>undefined</code> if any reference in the chain is nullish (<code>null</code> or <code>undefined</code>). This syntax significantly reduces code verbosity while maintaining safety.</p>
        
        <p>Key characteristics of optional chaining:</p>
        <ul>
          <li><strong>Short-circuit evaluation</strong> - Returns <code>undefined</code> if any part of the chain is nullish</li>
          <li><strong>Only checks for null/undefined</strong> - Other falsy values like <code>0</code> or <code>''</code> are considered valid</li>
          <li><strong>Returns undefined</strong> - The expression evaluates to <code>undefined</code> when short-circuited</li>
          <li><strong>Can be chained</strong> - Multiple optional chaining operators can be used in a single expression</li>
        </ul>
        
        <div class="code-example">
          <pre><code>// With optional chaining (clean and safe)
function getUserCity(user) {
  return user?.address?.city;
}

// Short-circuits if any part is null/undefined
const city = user?.address?.city;

// Can safely navigate deep structures
const zipCode = user?.address?.zipCode?.toString();</code></pre>
        </div>
        
        <h4>Beyond Object Properties</h4>
        <p>Optional chaining works with more than just object properties—it can also be used with function calls, array indices, and other operations where a nullish check is needed. This versatility makes it a powerful tool for defensive programming.</p>
        
        <p>Optional chaining can be used with:</p>
        <ul>
          <li><strong>Function calls</strong> - <code>obj.method?.()</code> only calls if the method exists</li>
          <li><strong>Array elements</strong> - <code>arr?.[0]</code> safely accesses array elements</li>
          <li><strong>Object properties</strong> - <code>obj?.prop</code> safely accesses properties</li>
          <li><strong>Nested structures</strong> - <code>a?.b?.c?.d</code> for deep property chains</li>
          <li><strong>Dynamic properties</strong> - <code>obj?.[propertyName]</code> for computed property access</li>
        </ul>
        
        <div class="code-example">
          <pre><code>// Optional function calls
// Only calls if obj.method exists
const result = obj.method?.();

// Optional array element access
// Returns undefined if array is null/undefined or index doesn't exist
const firstItem = arr?.[0];

// Combining with other operators
// Does obj exist? If yes, does it have a key property? If yes, 
// does key have a length property? If yes, return that, otherwise undefined
const keyLength = obj?.key?.length;</code></pre>
        </div>
        
        <div class="interview-tip">
          <p><span class="interview-icon">🎯</span> <strong>Interview Focus:</strong> Optional chaining demonstrates familiarity with modern JavaScript and defensive programming techniques.</p>
          <p>Key points to understand:</p>
          <ul>
            <li>How optional chaining differs from the <code>&&</code> operator for property access</li>
            <li>Performance implications of optional chaining vs. traditional checks</li>
            <li>Browser/environment compatibility considerations</li>
            <li>Using optional chaining with different JavaScript features (functions, arrays)</li>
            <li>Common patterns like combining with nullish coalescing for default values</li>
          </ul>
        </div>
      `,
          codeExample: `// Practical Optional Chaining Examples

// 1. API response handling
function processUserResponse(response) {
  // Safely access nested API response data
  const userId = response?.data?.user?.id;
  
  if (!userId) {
    return { error: 'Invalid user data' };
  }
  
  // Multiple nested optional chains
  const userDetails = {
    name: response?.data?.user?.profile?.name ?? 'Unknown User',
    email: response?.data?.user?.contact?.email,
    role: response?.data?.user?.permissions?.role ?? 'Guest',
    lastActive: new Date(response?.data?.user?.activity?.lastLogin ?? Date.now())
  };
  
  return userDetails;
}

// 2. Event handling with optional handlers
function setupEventHandlers(config) {
  document.getElementById('submit-button')?.addEventListener('click', event => {
    // Only call the handler if it exists
    config?.handlers?.onSubmit?.(collectFormData());
  });
  
  document.getElementById('cancel-button')?.addEventListener('click', event => {
    config?.handlers?.onCancel?.();
  });
}

// 3. Safe method calls on potentially undefined objects
function processData(data) {
  // Only calls if data exists and has a process method
  const result = data?.process?.();
  
  // Safely call methods with parameters
  const filtered = data?.filter?.(['invalid', 'duplicate']);
  
  // Check for method existence before calling with many parameters
  if (data?.validate) {
    return data.validate(true, 'strict', { timeout: 1000 });
  }
  
  return result;
}

// 4. Navigating complex DOM structures
function getNestedElementText(parentId) {
  return document
    .getElementById(parentId)              // might not exist
    ?.querySelector('.container')           // might not exist
    ?.getElementsByClassName('content')[0]  // might be empty array
    ?.textContent                           // might not have text content
    ?.trim();                               // safe method call
}

// 5. Working with arrays and object collections
function findUserById(users, id) {
  // Safely access array methods and elements
  const user = users?.find(user => user?.id === id);
  
  // Access potential nested arrays
  const friends = user?.friendIds?.map(friendId => 
    users?.find(u => u?.id === friendId)
  );
  
  // Check for array length safely
  if (friends?.length > 0) {
    return { user, friends };
  }
  
  return { user, friends: [] };
}

// 6. Safely destructuring potentially undefined objects
function displayUserActivity(user) {
  // Use optional chaining before destructuring to avoid errors
  const { recent, popular } = user?.activities ?? {};
  
  // Now safely work with these properties
  const recentActivities = recent?.filter(a => a.timestamp > Date.now() - 86400000);
  const popularActivities = popular?.sort((a, b) => b.views - a.views);
  
  return {
    recent: recentActivities ?? [],
    popular: popularActivities ?? []
  };
}`,
          exercise: {
            instructions:
              'Implement a function that safely extracts data from a complex, nested API response using optional chaining. Create a DOM traversal utility that uses optional chaining to safely navigate the DOM tree without causing errors. Build a configuration processor that can handle incomplete or partial configuration objects by using optional chaining to access nested properties.',
          },
        },
        {
          title: 'Nullish Coalescing Operator',
          explanation: `
        <p>The nullish coalescing operator (<code>??</code>) provides a cleaner way to specify default values when dealing with <code>null</code> or <code>undefined</code>, solving problems with the logical OR operator that treats all falsy values as missing.</p>
        
        <h4>The Problem with Logical OR for Defaults</h4>
        <p>Traditionally, the logical OR operator (<code>||</code>) was used to provide default values in JavaScript. However, it has a significant drawback: it treats all falsy values (<code>0</code>, <code>''</code>, <code>false</code>, <code>null</code>, <code>undefined</code>, <code>NaN</code>) as missing, which can lead to unexpected results when legitimate values like <code>0</code> or empty strings are intentionally provided.</p>
        
        <p>This behavior creates problems in many common scenarios:</p>
        <ul>
          <li><strong>Numeric values</strong> - When <code>0</code> is a valid input but gets replaced with a default</li>
          <li><strong>Empty strings</strong> - When <code>''</code> is intentional but gets overridden</li>
          <li><strong>Boolean flags</strong> - When <code>false</code> is a legitimate value but gets ignored</li>
          <li><strong>Form inputs</strong> - When user inputs falsy values that should be preserved</li>
        </ul>
        
        <div class="code-example">
          <pre><code>// The problem with || for defaults
function getCount(count) {
  // If count is 0, this still uses the default because 0 is falsy
  return count || 10;
}

getCount(0);    // Returns 10, not 0!
getCount('');   // Returns 10, not empty string!
getCount(null); // Returns 10 (expected)

// This requires verbose checks
function betterGetCount(count) {
  // Have to explicitly check for null/undefined
  return count !== null && count !== undefined ? count : 10;
}</code></pre>
        </div>
        
        <h4>Using Nullish Coalescing</h4>
        <p>The nullish coalescing operator provides default values only when the left operand is <code>null</code> or <code>undefined</code>, preserving other falsy values like <code>0</code> or empty strings when they're intentional. This makes it much more suitable for providing default values in most real-world scenarios.</p>
        
        <p>Key characteristics of nullish coalescing:</p>
        <ul>
          <li><strong>Targeted defaults</strong> - Only provides defaults for <code>null</code> and <code>undefined</code></li>
          <li><strong>Preserves falsy values</strong> - Retains intentional values like <code>0</code>, <code>''</code>, and <code>false</code></li>
          <li><strong>Short-circuit evaluation</strong> - Evaluates the right side only when needed</li>
          <li><strong>Chainable</strong> - Can be chained to create fallback sequences</li>
          <li><strong>Cleaner code</strong> - More concise than explicit null checks</li>
        </ul>
        
        <div class="code-example">
          <pre><code>// With nullish coalescing
function getCount(count) {
  // Only falls back to default if count is null or undefined
  return count ?? 10;
}

getCount(0);    // Returns 0 (preserves the meaningful value)
getCount('');   // Returns '' (preserves the meaningful value)
getCount(false); // Returns false (preserves the meaningful value)
getCount(null); // Returns 10 (falls back to default)
getCount(undefined); // Returns 10 (falls back to default)</code></pre>
        </div>
        
        <h4>Combining with Optional Chaining</h4>
        <p>Nullish coalescing works perfectly with optional chaining to provide default values for potentially deep nested properties that might not exist. This combination creates a powerful pattern for safely accessing and using nested data with appropriate fallbacks.</p>
        
        <p>Common uses for this combination include:</p>
        <ul>
          <li><strong>API responses</strong> - Handling potentially missing nested data</li>
          <li><strong>Configuration objects</strong> - Providing defaults for missing configuration</li>
          <li><strong>User preferences</strong> - Creating fallback hierarchies for settings</li>
          <li><strong>Form data</strong> - Processing potentially incomplete user input</li>
        </ul>
        
        <div class="code-example">
          <pre><code>// Combining optional chaining with nullish coalescing
function getUserDisplayName(user) {
  // Try to use display name, then full name, then username, or fall back to "Guest"
  return user?.preferences?.displayName ?? user?.profile?.fullName ?? user?.username ?? 'Guest';
}

// Handles these cases elegantly:
// - user is undefined/null: returns "Guest"
// - user exists, but has no preferences: tries profile.fullName
// - user and preferences exist, but displayName is null: tries profile.fullName
// - user and preferences.displayName is empty string: uses the empty string (it's valid)</code></pre>
        </div>
        
        <div class="interview-tip">
          <p><span class="interview-icon">🎯</span> <strong>Interview Focus:</strong> Understanding nullish coalescing shows your awareness of JavaScript's subtleties and how to write more predictable code.</p>
          <p>Key points to understand:</p>
          <ul>
            <li>The crucial difference between <code>??</code> and <code>||</code> for default values</li>
            <li>When to use each operator based on whether you want to treat falsy values as defaults</li>
            <li>How nullish coalescing simplifies handling of missing data in APIs</li>
            <li>Combining with optional chaining for powerful default value patterns</li>
            <li>Browser/environment compatibility considerations</li>
          </ul>
        </div>
      `,
          codeExample: `// Practical Nullish Coalescing Examples

// 1. Handling configuration options
function initializeApp(config) {
  const settings = {
    // Only use defaults if property is null/undefined
    debug: config?.debug ?? false,
    timeout: config?.timeout ?? 5000,
    retries: config?.retries ?? 3,
    
    // This treats 0 as a valid user choice
    maxConnections: config?.maxConnections ?? 10,
    
    // Use empty array instead of null/undefined
    allowedOrigins: config?.allowedOrigins ?? [],
    
    // Can have complex expressions on either side
    theme: config?.theme ?? (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'),
    
    // Nested object with mixed defaults
    http: {
      baseUrl: config?.http?.baseUrl ?? 'https://api.example.com',
      headers: config?.http?.headers ?? { 'Content-Type': 'application/json' },
      version: config?.http?.version ?? 'v1'
    }
  };
  
  return settings;
}

// 2. Form input processing
function processFormInput(formData) {
  // Extract form values with appropriate defaults
  const username = formData.get('username') ?? '';
  const email = formData.get('email') ?? '';
  
  // Treats 0 as valid, but null as invalid
  const age = Number(formData.get('age')) ?? null;
  
  // Checkboxes might be absent (undefined) rather than null
  const subscribed = formData.get('subscribe') ?? false;
  
  // Handle multi-value fields
  const interests = formData.getAll('interests') ?? [];
  
  return { username, email, age, subscribed, interests };
}

// 3. API response handling with potential missing fields
function normalizeUserData(apiUser) {
  return {
    id: apiUser?.id,
    name: apiUser?.name ?? 'Anonymous User',
    // Empty string is valid display name, only use placeholder if null/undefined
    displayName: apiUser?.displayName ?? apiUser?.name ?? 'User',
    // If age is 0 or any number, keep it; only use null for missing data
    age: apiUser?.age ?? null,
    // Empty array is valid for missing data
    roles: apiUser?.roles ?? [],
    // 0 is valid count, only use default for null/undefined
    postCount: apiUser?.postCount ?? 0,
    // Empty string is valid
    bio: apiUser?.bio ?? '',
    // Default object for nested properties
    settings: apiUser?.settings ?? { notifications: true, theme: 'default' },
    // Computed property with fallback
    isAdmin: apiUser?.roles?.includes('admin') ?? false
  };
}

// 4. Nullish coalescing chain for fallbacks
function getUserDisplayInfo(user) {
  // Try each option in sequence, falling back to the next
  const displayName = 
    user?.nickname ?? 
    user?.profile?.displayName ?? 
    user?.fullName ?? 
    user?.email?.split('@')[0] ??
    'Guest' + Math.floor(Math.random() * 1000);
  
  // The avatar URL has the same cascade pattern
  const avatarUrl = 
    user?.profile?.avatarUrl ?? 
    user?.avatarUrl ?? 
    \`https://ui-avatars.com/api/?name=\${encodeURIComponent(displayName)}\`;
  
  return { displayName, avatarUrl };
}

// 5. Combining with logical operators for complex conditions
function getUserAccess(user, context) {
  // Check if user has explicit permissions OR is an admin
  // Only fall back to context setting if user permissions are null/undefined
  const canEdit = 
    user?.permissions?.canEdit ?? 
    user?.roles?.includes('admin') ?? 
    context?.defaultPermissions?.edit ?? 
    false;
  
  // Returns: true if explicitly allowed, false if explicitly forbidden,
  // or falls back to defaults if null/undefined
  const permissions = {
    canView: user?.permissions?.canView ?? true,
    canEdit,
    canDelete: user?.permissions?.canDelete ?? false,
    canShare: user?.permissions?.canShare ?? context?.sharing?.enabled ?? false
  };
  
  return permissions;
}`,
          exercise: {
            instructions:
              'Implement a form validation function that processes user input and applies appropriate defaults using nullish coalescing. Create a function that merges user preferences with application defaults, preserving user choices of 0, false, or empty string while falling back to defaults for null or undefined values. Build a data transformation utility that normalizes inconsistent API responses by providing appropriate defaults with nullish coalescing.',
          },
        },
      ],
      prepperSummary: `
    <div class="prepper-summary">
      <h3>🔑 Key Interview Takeaways</h3>
      <ul>
        <li><strong>Optional Chaining (<code>?.</code>):</strong> Provides a safe way to access nested properties without explicit null/undefined checks, short-circuiting when a property doesn't exist.</li>
        
        <li><strong>Beyond Objects:</strong> Optional chaining works with function calls (<code>method?.()</code>), array indices (<code>arr?.[0]</code>), and other operations where null/undefined checks are needed.</li>
        
        <li><strong>Nullish Coalescing (<code>??</code>):</strong> Provides default values only when the left operand is <code>null</code> or <code>undefined</code>, preserving other falsy values (<code>0</code>, <code>''</code>, <code>false</code>) unlike the <code>||</code> operator.</li>
        
        <li><strong>Powerful Combinations:</strong> Optional chaining and nullish coalescing work perfectly together for handling deeply nested properties with appropriate defaults.</li>
        
        <li><strong>Modern JavaScript:</strong> These operators demonstrate modern, defensive programming techniques that make code more readable and robust.</li>
      </ul>
      
      <h4>📝 Common Interview Questions</h4>
      <ol>
        <li>"What's the difference between optional chaining and using the <code>&&</code> operator for property access?"</li>
        <li>"When would you use nullish coalescing (<code>??</code>) instead of logical OR (<code>||</code>) for default values?"</li>
        <li>"How would you handle accessing properties in a deeply nested object that might not exist?"</li>
        <li>"Explain how optional chaining works with function calls and array indices"</li>
        <li>"How would you implement fallbacks for missing values in an API response?"</li>
      </ol>
    </div>
  `,
    },
  ],
  challenge: {
    description:
      "You're working on a web application that processes and displays data from an unreliable third-party API. The API sometimes returns incomplete or malformed data, and your job is to create a robust data processing module that can handle these inconsistencies gracefully using modern JavaScript features.",
    requirements: [
      'Create a data normalization function that handles missing or nested properties safely',
      'Implement a configuration system that merges user preferences with application defaults',
      'Build a function that extracts and transforms specific fields from complex API responses',
      'Design a utility that combines multiple API results with proper error handling',
      'Ensure your solution is resilient to API changes and structure variations',
    ],
    starterCode: `// DataProcessor - ES6+ Features Challenge

class DataProcessor {
  constructor(defaultConfig = {}) {
    // TODO: Initialize with default configuration
    this.config = defaultConfig;
  }
  
  // TODO: Implement configuration merging with user preferences
  updateConfig(userConfig) {
    // Merge configurations, preserving specific user choices
  }
  
  // TODO: Implement safe data extraction from API response
  normalizeUserData(apiResponse) {
    // Extract and transform user data
  }
  
  // TODO: Implement safe nested property access
  extractNestedData(data, path) {
    // Access nested properties safely
  }
  
  // TODO: Implement API error handling
  processApiResponse(response) {
    // Handle potential errors and inconsistencies in API response
  }
  
  // TODO: Combine multiple API responses
  mergeData(responses) {
    // Combine multiple API responses into a coherent data structure
  }
}

// Export the DataProcessor
export default DataProcessor;`,
  },
}

export default es6Features
