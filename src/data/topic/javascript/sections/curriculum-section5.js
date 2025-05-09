// #DOM Manipulation and Events

const domManipulationAndEvents = {
  title: 'DOM Manipulation and Events',
  description: 'Master selecting DOM elements, handling events, and working with browser APIs.',
  lessons: [
    {
      title: 'Selecting and Modifying DOM Elements',
      description: 'Learn the essential techniques for accessing and modifying DOM elements.',
      sections: [
        {
          title: 'DOM Selection Methods',
          explanation: `
        <p>Efficiently selecting DOM elements is fundamental to web development and a common interview focus. Understanding the different selection methods and their performance implications is essential for writing efficient code.</p>
        
        <h4>Core Selection Methods</h4>
        <p>Modern browsers provide several powerful methods for accessing elements in the DOM, each with specific use cases and performance characteristics.</p>
        
        <p>When selecting a single element by ID, <code>getElementById()</code> is the most efficient method:</p>
        <ul>
          <li><code>getElementById()</code> returns a direct reference to the element with a matching ID attribute</li>
          <li>It's faster than other selection methods because browsers optimize ID lookups</li>
          <li>Returns <code>null</code> if no matching element is found</li>
          <li>Only works with IDs - cannot select by class or other attributes</li>
        </ul>
        
        <p>For more flexible selection using CSS selectors, use <code>querySelector()</code> and <code>querySelectorAll()</code>:</p>
        <ul>
          <li><code>querySelector()</code> returns the first element matching the CSS selector</li>
          <li><code>querySelectorAll()</code> returns all matching elements as a NodeList</li>
          <li>Both allow complex CSS selectors like <code>'#header .nav-item:not(.disabled)'</code></li>
          <li>While powerful, these methods are generally slower than the more specific selection methods</li>
        </ul>
        
        <p>For class and tag selection, specialized methods provide better performance for certain use cases:</p>
        <ul>
          <li><code>getElementsByClassName()</code> returns a live HTMLCollection of elements with the specified class name</li>
          <li><code>getElementsByTagName()</code> returns a live HTMLCollection of elements with the specified tag name</li>
          <li>The "live" nature means the collection updates automatically when the DOM changes</li>
        </ul>
        
        <div class="code-example">
          <pre><code>// Select by ID (returns a single element)
const header = document.getElementById('header');

// Select by CSS selector (returns first matching element)
const firstButton = document.querySelector('.btn-primary');

// Select all matching elements (returns NodeList)
const allButtons = document.querySelectorAll('.btn');

// Select by class name (returns HTMLCollection)
const navItems = document.getElementsByClassName('nav-item');

// Select by tag name (returns HTMLCollection)
const paragraphs = document.getElementsByTagName('p');

// Finding elements within a specific context
const form = document.getElementById('user-form');
const formInputs = form.querySelectorAll('input');</code></pre>
        </div>
        
        <h4>Working with Selection Results</h4>
        <p>Understanding the difference between various return types is essential for proper manipulation. Selection methods return different collection types with distinct behaviors.</p>
        
        <p>The key differences between <code>NodeList</code> and <code>HTMLCollection</code> are:</p>
        <ul>
          <li><code>NodeList</code> (from <code>querySelectorAll</code>) is static - it won't update when the DOM changes</li>
          <li><code>HTMLCollection</code> (from <code>getElementsBy*</code> methods) is live - it automatically updates when the DOM changes</li>
          <li><code>NodeList</code> has a <code>forEach()</code> method built in, while <code>HTMLCollection</code> doesn't</li>
          <li>Neither has all Array methods like <code>map()</code>, <code>filter()</code>, or <code>reduce()</code></li>
        </ul>
        
        <p>To access the full power of Array methods, convert these collections to arrays:</p>
        <ul>
          <li>Use <code>Array.from()</code> to create a true array from a collection</li>
          <li>Alternatively, use the spread operator <code>[...collection]</code> for conversion</li>
          <li>Converting to an array is a common pattern for more complex DOM manipulations</li>
        </ul>
        
        <div class="code-example">
          <pre><code>// NodeList vs HTMLCollection
const nodeList = document.querySelectorAll('div'); // NodeList - static
const htmlCollection = document.getElementsByTagName('div'); // HTMLCollection - live

// Converting to arrays for more methods
const buttonArray = Array.from(document.querySelectorAll('.btn'));
// Alternative approach
const navArray = [...document.getElementsByClassName('nav-item')];

// NodeList has forEach
document.querySelectorAll('.item').forEach(item => {
  console.log(item.textContent);
});

// HTMLCollection requires conversion for iteration methods
const items = document.getElementsByClassName('item');
Array.from(items).map(item => item.classList.add('active'));</code></pre>
        </div>
        
        <div class="interview-tip">
          <p><span class="interview-icon">🎯</span> <strong>Interview Focus:</strong> Interviewers want to see clear understanding of efficient DOM selection and manipulation.</p>
          <p>Key points to understand:</p>
          <ul>
            <li>When to use <code>getElementById</code> vs <code>querySelector</code></li>
            <li>The performance implications of different selection methods</li>
            <li>The difference between <code>NodeList</code> and <code>HTMLCollection</code> (static vs live)</li>
            <li>Converting collection types to arrays for manipulation</li>
            <li>Using appropriate context to narrow down selections for better performance</li>
          </ul>
        </div>
      `,
          codeExample: `// DOM Selection and Manipulation Examples

// 1. Efficiently selecting elements
function getDOMElements() {
  // Most efficient when you know the ID
  const container = document.getElementById('main-container');
  
  // Versatile but slightly less performant
  const header = document.querySelector('header.main-header');
  
  // Working with multiple elements
  const listItems = document.querySelectorAll('#main-list .item');
  
  // Using context for better performance in large DOMs
  const menuItems = header.querySelectorAll('.menu-item');
  
  return {
    container,
    header,
    listItems,
    menuItems
  };
}

// 2. Creating and modifying elements
function createUserCard(user) {
  // Create elements
  const card = document.createElement('div');
  const avatar = document.createElement('img');
  const info = document.createElement('div');
  const name = document.createElement('h3');
  const email = document.createElement('p');
  
  // Set attributes and content
  card.className = 'user-card';
  card.dataset.userId = user.id;
  
  avatar.src = user.avatar || 'default-avatar.jpg';
  avatar.alt = \`\${user.name}'s avatar\`;
  avatar.className = 'user-avatar';
  
  info.className = 'user-info';
  
  name.textContent = user.name;
  email.textContent = user.email;
  email.className = 'user-email';
  
  // Build the structure
  info.appendChild(name);
  info.appendChild(email);
  
  card.appendChild(avatar);
  card.appendChild(info);
  
  return card;
}

// 3. Manipulating DOM elements
function updateUserList(users) {
  const userList = document.getElementById('user-list');
  
  // Clear existing content
  userList.innerHTML = '';
  
  // Create document fragment for better performance
  const fragment = document.createDocumentFragment();
  
  // Add all user cards to fragment
  users.forEach(user => {
    const card = createUserCard(user);
    fragment.appendChild(card);
  });
  
  // Add fragment to DOM (only one reflow)
  userList.appendChild(fragment);
}

// 4. Manipulating element properties and styles
function highlightElement(element, duration = 2000) {
  // Save original background
  const originalBackground = getComputedStyle(element).backgroundColor;
  
  // Modify classes
  element.classList.add('highlight');
  
  // Direct style manipulation
  element.style.backgroundColor = '#ffff99';
  element.style.transition = 'background-color 0.5s ease';
  
  // Using data attributes
  element.dataset.highlighted = 'true';
  
  // Reset after duration
  setTimeout(() => {
    element.classList.remove('highlight');
    element.style.backgroundColor = originalBackground;
    delete element.dataset.highlighted;
  }, duration);
}

// 5. Efficiently modifying multiple elements
function updateStatusIndicators(status) {
  // Select all indicators at once
  const indicators = document.querySelectorAll('.status-indicator');
  
  // Update classes based on status
  indicators.forEach(indicator => {
    // Remove all status classes
    indicator.classList.remove('status-online', 'status-away', 'status-offline');
    
    // Add appropriate class
    indicator.classList.add(\`status-\${status}\`);
    
    // Update text content
    indicator.textContent = status.charAt(0).toUpperCase() + status.slice(1);
  });
}

// 6. Working with forms and inputs
function initializeForm() {
  const form = document.getElementById('user-form');
  const nameInput = form.querySelector('input[name="name"]');
  const emailInput = form.querySelector('input[name="email"]');
  
  // Set or get values
  nameInput.value = 'John Doe';
  console.log(emailInput.value);
  
  // Check/set attributes
  if (nameInput.hasAttribute('required')) {
    console.log('Name is required');
  }
  
  emailInput.setAttribute('placeholder', 'Enter your email');
  
  // Focus an element
  nameInput.focus();
}

// 7. Measuring and positioning elements
function getElementMetrics(element) {
  // Get the element's dimensions
  const rect = element.getBoundingClientRect();
  
  // Get the computed style
  const style = getComputedStyle(element);
  
  return {
    // Position relative to viewport
    top: rect.top,
    left: rect.left,
    
    // Size including borders and padding (getBoundingClientRect)
    width: rect.width,
    height: rect.height,
    
    // Content size excluding padding and border
    contentWidth: parseInt(style.width),
    contentHeight: parseInt(style.height),
    
    // Check visibility
    isVisible: style.display !== 'none' && style.visibility !== 'hidden'
  };
}`,
          exercise: {
            instructions:
              'Create a function that efficiently finds all elements on a page with a given attribute, regardless of element type. Implement a function that builds a dynamic navigation menu from a nested data structure, correctly setting attributes and content. Write a utility that finds the deepest nested element in the DOM and returns its depth.',
          },
        },
        {
          title: 'DOM Modification Techniques',
          explanation: `
        <p>Efficiently modifying the DOM is crucial for building performant web applications. Understanding how browser rendering works can help you optimize your DOM modifications to minimize layout reflows and repaints.</p>
        
        <h4>Creating and Adding Elements</h4>
        <p>There are multiple ways to create and add elements to the DOM, each with different performance implications and use cases.</p>
        
        <p>To create single elements programmatically:</p>
        <ul>
          <li>Use <code>document.createElement()</code> to create new DOM elements</li>
          <li>Set properties like <code>className</code>, <code>id</code>, and <code>textContent</code> to configure the element</li>
          <li>Use <code>appendChild()</code>, <code>insertBefore()</code>, or other insertion methods to add the element to the DOM</li>
        </ul>
        
        <p>For bulk operations with better performance:</p>
        <ul>
          <li><code>DocumentFragment</code> acts as a lightweight container for multiple elements</li>
          <li>Add multiple elements to the fragment first, then insert the entire fragment at once</li>
          <li>This approach triggers only one reflow instead of multiple reflows for each element addition</li>
        </ul>
        
        <p>The <code>innerHTML</code> property offers a quicker way to insert content, but with caveats:</p>
        <ul>
          <li>Using <code>innerHTML</code> is convenient but can create security vulnerabilities if not sanitized properly</li>
          <li>It's less efficient for repeated modifications as it rebuilds the entire content</li>
          <li>Event listeners on replaced elements are lost, unlike with DOM manipulation methods</li>
        </ul>
        
        <div class="code-example">
          <pre><code>// Creating new elements
const newDiv = document.createElement('div');
newDiv.className = 'container';
newDiv.id = 'main-container';
newDiv.textContent = 'Hello, world!';

// Adding to the DOM
document.body.appendChild(newDiv);

// Creating and adding in one step
document.body.innerHTML += '<p>New paragraph</p>'; // Less efficient

// Using DocumentFragment for batch operations
const fragment = document.createDocumentFragment();
for (let i = 0; i < 10; i++) {
  const li = document.createElement('li');
  li.textContent = \`Item \${i}\`;
  fragment.appendChild(li);
}
document.getElementById('list').appendChild(fragment); // Only one reflow</code></pre>
        </div>
        
        <h4>Modifying Elements</h4>
        <p>Various techniques for modifying existing elements have different performance implications and security considerations.</p>
        
        <p>For text content modification, you have several options:</p>
        <ul>
          <li><code>textContent</code> - Updates text only, faster and safer as it doesn't parse HTML</li>
          <li><code>innerHTML</code> - Updates with HTML parsing, slower and potential security risk with untrusted content</li>
          <li><code>innerText</code> - Similar to textContent but respects CSS styling, triggers reflow to determine visibility</li>
        </ul>
        
        <p>For working with attributes, use these methods:</p>
        <ul>
          <li><code>setAttribute()</code>, <code>getAttribute()</code>, and <code>removeAttribute()</code> - Standard methods for attribute manipulation</li>
          <li>The <code>dataset</code> property provides direct access to custom <code>data-*</code> attributes with camelCase conversion</li>
        </ul>
        
        <p>For class manipulation, the <code>classList</code> API is preferred:</p>
        <ul>
          <li><code>classList.add()</code>, <code>classList.remove()</code>, <code>classList.toggle()</code> - Manipulate individual classes</li>
          <li><code>classList.contains()</code> - Check if an element has a specific class</li>
          <li>More efficient than manipulating the <code>className</code> string property directly</li>
        </ul>
        
        <div class="code-example">
          <pre><code>// Modifying content
element.textContent = 'New text'; // Simple text (safer, faster)
element.innerHTML = '<span>Formatted text</span>'; // HTML parsing (slower)
element.innerText = 'Visible text only'; // Respects CSS (slower)

// Working with attributes
element.setAttribute('data-id', '123');
const value = element.getAttribute('data-id');
element.removeAttribute('hidden');

// Modern dataset API for data attributes
element.dataset.userId = '456';
const userId = element.dataset.userId;

// Working with classes
element.className = 'btn btn-primary'; // Replaces all classes
element.classList.add('active'); // Adds a class
element.classList.remove('disabled'); // Removes a class
element.classList.toggle('selected'); // Toggles a class
element.classList.replace('old-class', 'new-class'); // Replaces a class
if (element.classList.contains('active')) { // Checks for a class
  // Element has 'active' class
}</code></pre>
        </div>
        
        <div class="interview-tip">
          <p><span class="interview-icon">🎯</span> <strong>Interview Focus:</strong> DOM manipulation performance and best practices are common interview topics.</p>
          <p>Key points to understand:</p>
          <ul>
            <li>The performance impact of <code>innerHTML</code> vs <code>textContent</code></li>
            <li>Using <code>DocumentFragment</code> to batch DOM operations</li>
            <li>Understanding when and why to use <code>classList</code> vs <code>className</code></li>
            <li>Properly handling attributes, especially <code>data-*</code> attributes</li>
            <li>Minimizing DOM reflows and repaints for performance</li>
          </ul>
        </div>
      `,
          codeExample: `// Efficient DOM Manipulation

// 1. Building complex elements efficiently
function buildProductCard(product) {
  // Create wrapper
  const card = document.createElement('div');
  card.className = 'product-card';
  
  // Set content directly when no child elements are needed
  const title = document.createElement('h2');
  title.textContent = product.name;
  
  const price = document.createElement('p');
  price.className = 'price';
  price.textContent = \`$\${product.price.toFixed(2)}\`;
  
  // Use template literals for simple HTML
  const description = document.createElement('div');
  description.className = 'description';
  description.innerHTML = \`
    <p>\${product.description}</p>
    <span class="stock \${product.inStock ? 'in-stock' : 'out-of-stock'}">
      \${product.inStock ? 'In Stock' : 'Out of Stock'}
    </span>
  \`;
  
  // Create button with event attachment
  const button = document.createElement('button');
  button.className = 'buy-button';
  button.textContent = 'Add to Cart';
  button.disabled = !product.inStock;
  
  // Append all elements to card
  card.appendChild(title);
  card.appendChild(price);
  card.appendChild(description);
  card.appendChild(button);
  
  return card;
}

// 2. Efficient batch updates
function updateProductList(products) {
  const productList = document.getElementById('product-list');
  
  // Method 1: Clear and rebuild (good for complete replacement)
  productList.innerHTML = ''; // Clear existing
  
  // Use fragment to batch DOM operations
  const fragment = document.createDocumentFragment();
  
  products.forEach(product => {
    const card = buildProductCard(product);
    fragment.appendChild(card);
  });
  
  // Single DOM operation
  productList.appendChild(fragment);
}

// 3. Partial list updates (more efficient for large lists)
function updateProductPrices(products) {
  products.forEach(product => {
    // Find the specific element to update
    const priceElement = document.querySelector(
      \`.product-card[data-product-id="\${product.id}"] .price\`
    );
    
    if (priceElement) {
      // Only update what changed
      priceElement.textContent = \`$\${product.price.toFixed(2)}\`;
      
      // Highlight changes
      priceElement.classList.add('updated');
      setTimeout(() => priceElement.classList.remove('updated'), 2000);
    }
  });
}

// 4. Working with tables
function buildDataTable(columns, data) {
  const table = document.createElement('table');
  table.className = 'data-table';
  
  // Create header row
  const thead = document.createElement('thead');
  const headerRow = document.createElement('tr');
  
  columns.forEach(column => {
    const th = document.createElement('th');
    th.textContent = column.title;
    if (column.sortable) {
      th.className = 'sortable';
      th.dataset.field = column.field;
    }
    headerRow.appendChild(th);
  });
  
  thead.appendChild(headerRow);
  table.appendChild(thead);
  
  // Create table body
  const tbody = document.createElement('tbody');
  
  // Add row data
  data.forEach(item => {
    const row = document.createElement('tr');
    
    columns.forEach(column => {
      const cell = document.createElement('td');
      cell.textContent = item[column.field] || '';
      if (column.className) {
        cell.className = column.className;
      }
      row.appendChild(cell);
    });
    
    tbody.appendChild(row);
  });
  
  table.appendChild(tbody);
  return table;
}

// 5. Performing animations with DOM and CSS
function animateElement(element, animation) {
  // Reset any existing animations
  element.classList.remove(
    'fadeIn', 'fadeOut', 'slideIn', 'slideOut', 'pulse'
  );
  
  // Force reflow to ensure animation plays
  void element.offsetWidth;
  
  // Add the requested animation class
  element.classList.add(animation);
  
  // Remove after animation completes
  element.addEventListener('animationend', function handler() {
    element.classList.remove(animation);
    element.removeEventListener('animationend', handler);
  });
}

// 6. Safely setting HTML content (avoiding innerHTML pitfalls)
function safelySetHTML(element, htmlContent) {
  // Option 1: Using DOMPurify (in a real application)
  // element.innerHTML = DOMPurify.sanitize(htmlContent);
  
  // Option 2: Manual parse and sanitize (simplified example)
  const tempDiv = document.createElement('div');
  tempDiv.textContent = htmlContent; // Set as text first (escapes HTML)
  
  // Then extract specific allowed tags (simplified example)
  const allowedTags = ['b', 'i', 'em', 'strong'];
  
  allowedTags.forEach(tag => {
    const regex = new RegExp(\`&lt;\${tag}&gt;(.+?)&lt;/\${tag}&gt;\`, 'g');
    tempDiv.innerHTML = tempDiv.innerHTML.replace(
      regex, \`<\${tag}>$1</\${tag}>\`
    );
  });
  
  element.innerHTML = tempDiv.innerHTML;
}`,
          exercise: {
            instructions:
              'Implement a function that efficiently creates and populates a large table with sorting capabilities, without causing performance issues. Create a utility that allows for batch updates to multiple DOM elements, tracking which ones have changed and updating only those elements. Implement a tab interface component that dynamically generates the tab structure from a configuration object.',
          },
        },
      ],
      prepperSummary: `
    <div class="prepper-summary">
      <h3>🔑 Key Interview Takeaways</h3>
      <ul>
        <li><strong>Selection Methods:</strong> Understand the differences between various DOM selection methods (<code>getElementById</code>, <code>querySelector</code>, <code>getElementsByClassName</code>) and when to use each for optimal performance.</li>
        
        <li><strong>Collection Types:</strong> Know the difference between <code>NodeList</code> (static) and <code>HTMLCollection</code> (live), and when to convert them to arrays for manipulation.</li>
        
        <li><strong>Efficient Creation:</strong> Create multiple elements efficiently using <code>DocumentFragment</code> to minimize reflows and repaints.</li>
        
        <li><strong>Content Modification:</strong> Choose the appropriate method to modify content (<code>textContent</code> vs <code>innerHTML</code> vs <code>innerText</code>) based on security and performance requirements.</li>
        
        <li><strong>Performance:</strong> Understand DOM performance implications and demonstrate knowledge of best practices for efficient DOM manipulation.</li>
      </ul>
      
      <h4>📝 Common Interview Questions</h4>
      <ol>
        <li>"What's the difference between <code>innerHTML</code> and <code>textContent</code>?"</li>
        <li>"How would you efficiently add 100 list items to a page?"</li>
        <li>"Explain the difference between <code>NodeList</code> and <code>HTMLCollection</code>"</li>
        <li>"How can you minimize reflows when updating multiple DOM elements?"</li>
        <li>"What are data attributes and how do you access them with JavaScript?"</li>
      </ol>
    </div>
  `,
    },

    {
      title: 'Event Handling',
      description: 'Master event handling in JavaScript to create interactive web applications.',
      sections: [
        {
          title: 'Event Basics',
          explanation: `
        <p>Understanding how events work in JavaScript is essential for creating interactive applications. The event-driven programming model allows your application to respond to user interactions and other changes in the environment.</p>
        
        <h4>Adding Event Listeners</h4>
        <p>Modern JavaScript uses the <code>addEventListener</code> method to register event handlers. This approach offers several advantages over older methods like inline event handlers or assigning to <code>onevent</code> properties.</p>
        
        <p>Key benefits of <code>addEventListener</code>:</p>
        <ul>
          <li>Multiple listeners can be added to the same event on the same element</li>
          <li>More granular control through options like <code>capture</code>, <code>once</code>, and <code>passive</code></li>
          <li>Clear separation of HTML and JavaScript following best practices</li>
          <li>Ability to remove specific listeners when they're no longer needed</li>
        </ul>
        
        <p>When adding event listeners, be aware of these patterns:</p>
        <ul>
          <li>Use named functions when you need to remove the listener later</li>
          <li>Arrow functions maintain the lexical <code>this</code> context, useful for class methods</li>
          <li>The <code>once: true</code> option automatically removes the listener after it fires once</li>
          <li>Use <code>passive: true</code> for scroll or touch events to improve performance</li>
        </ul>
        
        <div class="code-example">
          <pre><code>// Basic event listener
const button = document.getElementById('submit-button');
button.addEventListener('click', function(event) {
  console.log('Button clicked!');
  console.log('Event object:', event);
});

// Using arrow functions
button.addEventListener('click', (event) => {
  console.log('Clicked with arrow function');
});

// Using named function references
function handleClick(event) {
  console.log('Clicked with named function');
}
button.addEventListener('click', handleClick);

// Removing event listeners
button.removeEventListener('click', handleClick); // Named function can be removed
// Anonymous functions can't be removed directly</code></pre>
        </div>
        
        <h4>Event Object</h4>
        <p>The <code>event</code> object contains crucial information about the triggered event. Understanding its properties allows you to create responsive and context-aware event handlers.</p>
        
        <p>Important event object properties include:</p>
        <ul>
          <li><code>event.type</code> - The name of the event (e.g., "click", "keydown")</li>
          <li><code>event.target</code> - The element that triggered the event (where the event originated)</li>
          <li><code>event.currentTarget</code> - The element that the listener is attached to (might be different in event bubbling)</li>
          <li><code>event.preventDefault()</code> - Stops the default browser behavior for the event</li>
          <li><code>event.stopPropagation()</code> - Prevents the event from bubbling up to parent elements</li>
        </ul>
        
        <p>Specialized events have additional properties:</p>
        <ul>
          <li>Mouse events: <code>clientX</code>/<code>clientY</code>, <code>pageX</code>/<code>pageY</code>, <code>button</code></li>
          <li>Keyboard events: <code>key</code>, <code>code</code>, <code>keyCode</code> (deprecated), <code>ctrlKey</code>/<code>shiftKey</code>/<code>altKey</code></li>
          <li>Form events: <code>submit</code> events need <code>preventDefault()</code> to handle form submissions programmatically</li>
        </ul>
        
        <div class="code-example">
          <pre><code>// Working with the event object
document.querySelector('a').addEventListener('click', function(event) {
  // Prevent default behavior
  event.preventDefault(); // Stops link navigation
  
  // Event information
  console.log('Event type:', event.type);
  console.log('Target element:', event.target);
  console.log('Current target:', event.currentTarget);
  
  // Mouse coordinates (for mouse events)
  console.log('Coordinates:', event.clientX, event.clientY);
  
  // Keyboard information (for keyboard events)
  document.addEventListener('keydown', function(event) {
    console.log('Key pressed:', event.key);
    console.log('Key code:', event.keyCode); // Deprecated but still used
    console.log('Modifiers:', event.ctrlKey, event.shiftKey);
  });
});</code></pre>
        </div>
        
        <div class="interview-tip">
          <p><span class="interview-icon">🎯</span> <strong>Interview Focus:</strong> Demonstrating proper event handling is critical in front-end interviews.</p>
          <p>Key points to understand:</p>
          <ul>
            <li>Using <code>addEventListener</code> vs older methods (<code>onclick</code>)</li>
            <li>Understanding the event object and its properties</li>
            <li>Properly managing event listeners (adding/removing)</li>
            <li>Using <code>event.preventDefault()</code> and <code>event.stopPropagation()</code></li>
            <li>Common event types and their use cases</li>
          </ul>
        </div>
      `,
          codeExample: `// Comprehensive Event Handling Example

// 1. Setting up multiple event listeners
function initializeEventListeners() {
  // Click events
  const button = document.getElementById('action-button');
  button.addEventListener('click', handleButtonClick);
  
  // Form events
  const form = document.getElementById('user-form');
  form.addEventListener('submit', handleFormSubmit);
  
  // Input events
  const searchInput = document.getElementById('search');
  searchInput.addEventListener('input', handleSearchInput);
  searchInput.addEventListener('focus', () => console.log('Search focused'));
  searchInput.addEventListener('blur', () => console.log('Search blurred'));
  
  // Keyboard events
  document.addEventListener('keydown', handleKeyDown);
  
  // Mouse events
  const hoverElement = document.getElementById('hover-element');
  hoverElement.addEventListener('mouseenter', handleMouseEnter);
  hoverElement.addEventListener('mouseleave', handleMouseLeave);
  
  // Window events
  window.addEventListener('resize', handleWindowResize);
  window.addEventListener('scroll', handleWindowScroll);
  
  // Custom event
  document.addEventListener('app:notification', handleCustomNotification);
}

// 2. Event handler implementations
function handleButtonClick(event) {
  // Get data from the clicked element
  const button = event.currentTarget;
  const action = button.dataset.action || 'default';
  
  console.log(\`Button clicked with action: \${action}\`);
  
  // Update button state
  button.classList.add('clicked');
  button.disabled = true;
  
  // Re-enable after delay
  setTimeout(() => {
    button.classList.remove('clicked');
    button.disabled = false;
  }, 1000);
}

function handleFormSubmit(event) {
  // Prevent default form submission
  event.preventDefault();
  
  // Get form data
  const form = event.currentTarget;
  const formData = new FormData(form);
  
  // Convert FormData to object
  const data = {};
  for (const [key, value] of formData.entries()) {
    data[key] = value;
  }
  
  console.log('Form submitted with data:', data);
  
  // Example validation
  const errors = validateFormData(data);
  
  if (Object.keys(errors).length === 0) {
    // Success - submit data
    submitFormData(data);
    form.reset();
  } else {
    // Show errors
    displayFormErrors(form, errors);
  }
}

function handleSearchInput(event) {
  const searchTerm = event.target.value.trim();
  
  // Debounce search to avoid excessive processing
  clearTimeout(this.searchTimeout);
  
  this.searchTimeout = setTimeout(() => {
    if (searchTerm.length >= 3) {
      console.log(\`Searching for: \${searchTerm}\`);
      performSearch(searchTerm);
    }
  }, 300);
}

function handleKeyDown(event) {
  // Check for keyboard shortcuts
  if (event.ctrlKey && event.key === 'f') {
    event.preventDefault(); // Prevent browser's find dialog
    document.getElementById('search').focus();
    console.log('Search shortcut activated');
  }
  
  // Escape key handler
  if (event.key === 'Escape') {
    const modal = document.querySelector('.modal.active');
    if (modal) {
      closeModal(modal);
    }
  }
}

function handleMouseEnter(event) {
  const element = event.currentTarget;
  element.classList.add('hovered');
  
  // Show tooltip if available
  const tooltipText = element.dataset.tooltip;
  if (tooltipText) {
    showTooltip(element, tooltipText);
  }
}

function handleMouseLeave(event) {
  const element = event.currentTarget;
  element.classList.remove('hovered');
  
  // Hide tooltip if shown
  hideTooltip();
}

function handleWindowResize(event) {
  // Throttle resize handling
  if (this.resizeTimeout) {
    clearTimeout(this.resizeTimeout);
  }
  
  this.resizeTimeout = setTimeout(() => {
    const width = window.innerWidth;
    const height = window.innerHeight;
    
    console.log(\`Window resized to: \${width}x\${height}\`);
    
    // Update responsive elements
    updateResponsiveLayout(width);
  }, 200);
}

function handleWindowScroll(event) {
  // Throttle scroll handling
  if (!this.ticking) {
    window.requestAnimationFrame(() => {
      const scrollTop = window.scrollY;
      
      // Show/hide scroll-to-top button
      const scrollButton = document.getElementById('scroll-top');
      if (scrollButton) {
        if (scrollTop > 500) {
          scrollButton.classList.add('visible');
        } else {
          scrollButton.classList.remove('visible');
        }
      }
      
      // Handle lazy loading
      checkLazyLoadElements();
      
      this.ticking = false;
    });
    
    this.ticking = true;
  }
}

// 3. Custom events
function triggerCustomNotification(message, type) {
  // Create a custom event
  const event = new CustomEvent('app:notification', {
    detail: {
      message,
      type,
      timestamp: new Date()
    },
    bubbles: true
  });
  
  // Dispatch the event
  document.dispatchEvent(event);
}

function handleCustomNotification(event) {
  const { message, type, timestamp } = event.detail;
  
  console.log(\`Notification [\${type}] at \${timestamp}: \${message}\`);
  
  // Show notification UI
  showNotification(message, type);
}

// 4. Helper functions (simplified implementations)
function validateFormData(data) {
  const errors = {};
  
  if (!data.name || data.name.length < 2) {
    errors.name = 'Name is required and must be at least 2 characters';
  }
  
  if (!data.email || !data.email.includes('@')) {
    errors.email = 'Valid email is required';
  }
  
  return errors;
}

function displayFormErrors(form, errors) {
  // Clear previous errors
  form.querySelectorAll('.error-message').forEach(el => el.remove());
  
  // Display new errors
  for (const [field, message] of Object.entries(errors)) {
    const input = form.querySelector(\`[name="\${field}"]\`);
    if (input) {
      const errorElement = document.createElement('div');
      errorElement.className = 'error-message';
      errorElement.textContent = message;
      input.parentNode.insertBefore(errorElement, input.nextSibling);
      input.classList.add('error');
    }
  }
}

function showTooltip(element, text) {
  const tooltip = document.createElement('div');
  tooltip.className = 'tooltip';
  tooltip.textContent = text;
  
  // Position the tooltip
  const rect = element.getBoundingClientRect();
  tooltip.style.top = \`\${rect.bottom + 10}px\`;
  tooltip.style.left = \`\${rect.left + rect.width / 2}px\`;
  
  document.body.appendChild(tooltip);
}

function hideTooltip() {
  const tooltip = document.querySelector('.tooltip');
  if (tooltip) {
    tooltip.remove();
  }
}

// 5. Event cleanup function
function removeAllEventListeners() {
  const button = document.getElementById('action-button');
  if (button) {
    button.removeEventListener('click', handleButtonClick);
  }
  
  const form = document.getElementById('user-form');
  if (form) {
    form.removeEventListener('submit', handleFormSubmit);
  }
  
  // Other event cleanup...
  
  // Note: Anonymous functions cannot be removed directly
}

// Placeholder implementations
function submitFormData(data) { console.log('Submitting data...', data); }
function performSearch(term) { console.log('Searching for', term); }
function updateResponsiveLayout(width) { console.log('Updating layout for', width); }
function checkLazyLoadElements() { console.log('Checking lazy load elements'); }
function showNotification(message, type) { console.log('Showing notification', message, type); }
function closeModal(modal) { console.log('Closing modal', modal); }`,
          exercise: {
            instructions:
              'Create a form validation system that validates inputs in real-time as the user types, using appropriate event listeners. Implement a drag-and-drop interface that allows users to reorder items in a list, using the appropriate mouse events. Build a keyboard accessibility module that provides keyboard shortcuts for common actions in your application.',
          },
        },
        {
          title: 'Event Propagation and Delegation',
          explanation: `
        <p>Understanding the event flow and delegation patterns is crucial for efficient event handling. These concepts allow you to write more maintainable and performant code, especially for complex or dynamic interfaces.</p>
        
        <h4>Event Propagation</h4>
        <p>Events in JavaScript propagate in two phases: capturing (down) and bubbling (up). This propagation model determines the order in which event handlers execute when an event occurs.</p>
        
        <p>The complete event flow follows three phases:</p>
        <ol>
          <li><strong>Capture Phase</strong>: The event travels from the <code>window</code> down through the DOM tree to the target element</li>
          <li><strong>Target Phase</strong>: The event reaches the target element that triggered it</li>
          <li><strong>Bubbling Phase</strong>: The event bubbles up from the target back through the DOM tree to the <code>window</code></li>
        </ol>
        
        <p>Key points about event propagation:</p>
        <ul>
          <li>By default, event handlers are executed during the bubbling phase</li>
          <li>Setting the third parameter of <code>addEventListener</code> to <code>true</code> makes the handler execute during the capture phase</li>
          <li><code>event.stopPropagation()</code> prevents the event from continuing its path in either direction</li>
          <li><code>event.stopImmediatePropagation()</code> stops propagation and prevents other handlers on the same element from executing</li>
        </ul>
        
        <div class="code-example">
          <pre><code>// Event bubbling (default)
// Child to parent propagation
document.querySelector('#child').addEventListener('click', function(e) {
  console.log('Child clicked');
  // e.stopPropagation(); // Uncomment to stop bubbling
});

document.querySelector('#parent').addEventListener('click', function(e) {
  console.log('Parent clicked - event bubbled up');
});

// Event capturing (parent to child)
document.querySelector('#parent').addEventListener('click', function(e) {
  console.log('Parent - capture phase');
}, true); // true enables capture phase

document.querySelector('#child').addEventListener('click', function(e) {
  console.log('Child - capture phase');
}, true);

// Event flow: parent capture → child capture → child bubble → parent bubble</code></pre>
        </div>
        
        <h4>Event Delegation</h4>
        <p>Event delegation leverages event bubbling to handle events for multiple elements with a single listener. Instead of attaching events to each individual element, you attach a single event listener to a parent element and determine which child was clicked.</p>
        
        <p>Benefits of event delegation:</p>
        <ul>
          <li><strong>Dynamic Elements</strong>: Automatically works for elements added to the DOM after the initial setup</li>
          <li><strong>Memory Efficiency</strong>: Reduces the number of event listeners, improving performance</li>
          <li><strong>Code Simplicity</strong>: Less code to maintain and no need to track individual event listeners</li>
          <li><strong>DOM Mutations</strong>: No need to add/remove event listeners when the DOM structure changes</li>
        </ul>
        
        <p>The key methods for implementing event delegation:</p>
        <ul>
          <li><code>event.target</code> - Identifies the specific element that triggered the event</li>
          <li><code>element.matches(selector)</code> - Tests if the element matches a CSS selector</li>
          <li><code>element.closest(selector)</code> - Finds the nearest ancestor (including itself) matching a selector</li>
        </ul>
        
        <div class="code-example">
          <pre><code>// Without event delegation - inefficient for many elements
document.querySelectorAll('.item').forEach(item => {
  item.addEventListener('click', handleItemClick);
});

// With event delegation - single listener for all items
document.querySelector('.items-container').addEventListener('click', function(event) {
  // Check if clicked element has the target class
  if (event.target.matches('.item')) {
    handleItemClick(event);
  }
  
  // Or handle based on different elements within the container
  if (event.target.matches('.item-delete')) {
    handleItemDelete(event);
  } else if (event.target.matches('.item-edit')) {
    handleItemEdit(event);
  }
});

// Benefits of delegation:
// 1. Works for dynamically added elements
// 2. Fewer event listeners = better performance
// 3. Less memory usage
// 4. No need to add/remove listeners when elements change</code></pre>
        </div>
        
        <div class="interview-tip">
          <p><span class="interview-icon">🎯</span> <strong>Interview Focus:</strong> Event delegation is a critical pattern for front-end interviews.</p>
          <p>Key points to understand:</p>
          <ul>
            <li>The event flow: capturing and bubbling phases</li>
            <li>Using <code>event.stopPropagation()</code> to control bubbling</li>
            <li>Implementing event delegation for dynamic content</li>
            <li>Performance benefits of delegation vs individual listeners</li>
            <li>Using <code>event.target</code> vs <code>event.currentTarget</code></li>
          </ul>
        </div>
      `,
          codeExample: `// Event Propagation and Delegation Examples

// 1. Event Propagation Demonstration
function setupEventPropagationDemo() {
  // Select elements
  const grandparent = document.querySelector('.grandparent');
  const parent = document.querySelector('.parent');
  const child = document.querySelector('.child');
  
  // Capture phase listeners (top down)
  grandparent.addEventListener('click', e => {
    console.log('Grandparent capture');
    // Uncomment to stop propagation entirely
    // e.stopPropagation();
  }, true);
  
  parent.addEventListener('click', e => {
    console.log('Parent capture');
  }, true);
  
  child.addEventListener('click', e => {
    console.log('Child capture');
  }, true);
  
  // Bubbling phase listeners (bottom up)
  child.addEventListener('click', e => {
    console.log('Child bubble');
    
    // Prevent event from continuing to bubble up
    // Uncomment to see effect
    // e.stopPropagation();
  });
  
  parent.addEventListener('click', e => {
    console.log('Parent bubble');
  });
  
  grandparent.addEventListener('click', e => {
    console.log('Grandparent bubble');
  });
  
  // Expected output when child is clicked (without stopPropagation):
  // 1. Grandparent capture
  // 2. Parent capture
  // 3. Child capture
  // 4. Child bubble
  // 5. Parent bubble
  // 6. Grandparent bubble
}

// 2. Event Delegation - Interactive List Example
function setupInteractiveList() {
  const list = document.getElementById('item-list');
  
  // Single event listener for all items and buttons
  list.addEventListener('click', function(event) {
    const target = event.target;
    
    // Handle different elements within the list
    if (target.matches('.delete-btn')) {
      // Delete button clicked
      const item = target.closest('li');
      deleteItem(item);
    } 
    else if (target.matches('.edit-btn')) {
      // Edit button clicked
      const item = target.closest('li');
      editItem(item);
    }
    else if (target.matches('.item-text')) {
      // Item text clicked
      target.classList.toggle('highlighted');
    }
    else if (target.matches('li')) {
      // Entire list item clicked
      selectItem(target);
    }
  });
  
  // Add new item handler
  document.getElementById('add-item-btn').addEventListener('click', function() {
    const input = document.getElementById('new-item-input');
    if (input.value.trim()) {
      addItem(input.value);
      input.value = '';
    }
  });
  
  // Implementation of actions
  function addItem(text) {
    const newItem = document.createElement('li');
    newItem.innerHTML = \`
      <span class="item-text">\${text}</span>
      <button class="edit-btn">Edit</button>
      <button class="delete-btn">Delete</button>
    \`;
    list.appendChild(newItem);
  }
  
  function deleteItem(item) {
    // Animate removal
    item.classList.add('removing');
    item.addEventListener('transitionend', function() {
      item.remove();
    });
  }
  
  function editItem(item) {
    const textElement = item.querySelector('.item-text');
    const currentText = textElement.textContent;
    
    // Replace with input field
    const input = document.createElement('input');
    input.type = 'text';
    input.value = currentText;
    input.className = 'edit-input';
    
    // Replace text with input
    textElement.replaceWith(input);
    input.focus();
    
    // Handle save on enter or blur
    function saveEdit() {
      const newText = document.createElement('span');
      newText.className = 'item-text';
      newText.textContent = input.value;
      input.replaceWith(newText);
      input.removeEventListener('blur', saveEdit);
    }
    
    input.addEventListener('blur', saveEdit);
    input.addEventListener('keydown', function(e) {
      if (e.key === 'Enter') {
        saveEdit();
      }
    });
  }
  
  function selectItem(item) {
    // Toggle selection (avoiding buttons and edit field)
    if (!event.target.matches('.edit-btn') && 
        !event.target.matches('.delete-btn') &&
        !event.target.matches('.edit-input')) {
      // Deselect others
      list.querySelectorAll('li.selected').forEach(selected => {
        if (selected !== item) {
          selected.classList.remove('selected');
        }
      });
      
      // Toggle this item
      item.classList.toggle('selected');
    }
  }
}

// 3. Custom Right-Click Menu using Event Delegation
function setupCustomContextMenu() {
  const container = document.getElementById('contextmenu-container');
  const menu = document.getElementById('custom-context-menu');
  
  // Show custom context menu
  container.addEventListener('contextmenu', function(e) {
    // Prevent default browser context menu
    e.preventDefault();
    
    // Position menu at cursor
    menu.style.left = \`\${e.clientX}px\`;
    menu.style.top = \`\${e.clientY}px\`;
    menu.classList.add('visible');
    
    // Store target information (for menu actions)
    menu.dataset.targetId = e.target.id || '';
    menu.dataset.targetType = e.target.dataset.type || '';
  });
  
  // Handle menu item clicks with delegation
  menu.addEventListener('click', function(e) {
    if (e.target.matches('.menu-item')) {
      const action = e.target.dataset.action;
      const targetId = menu.dataset.targetId;
      const targetType = menu.dataset.targetType;
      
      // Execute the requested action
      handleContextMenuAction(action, targetId, targetType);
      
      // Hide menu
      hideContextMenu();
    }
  });
  
  // Hide menu when clicking elsewhere
  document.addEventListener('click', hideContextMenu);
  
  // Also hide when pressing Escape
  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape' && menu.classList.contains('visible')) {
      hideContextMenu();
    }
  });
  
  function hideContextMenu() {
    menu.classList.remove('visible');
  }
  
  function handleContextMenuAction(action, targetId, targetType) {
    console.log(\`Executing \${action} on \${targetType} with ID \${targetId}\`);
    // Implementation would depend on the application
  }
}

// 4. Form input delegation for validation
function setupFormValidation() {
  const form = document.getElementById('user-form');
  
  // Validation rules by input name
  const validationRules = {
    username: {
      required: true,
      minLength: 3,
      pattern: /^[a-z0-9_]+$/i
    },
    email: {
      required: true,
      pattern: /^[^@]+@[^@]+\\.[^@]+$/
    },
    password: {
      required: true,
      minLength: 8
    }
  };
  
  // Generic validation messages
  const errorMessages = {
    required: 'This field is required',
    minLength: min => \`Must be at least \${min} characters\`,
    pattern: 'Invalid format'
  };
  
  // Use event delegation for all form inputs
  form.addEventListener('input', function(e) {
    const input = e.target;
    
    // Only validate fields with rules
    if (input.name && validationRules[input.name]) {
      validateInput(input);
    }
  });
  
  function validateInput(input) {
    const rules = validationRules[input.name];
    const value = input.value.trim();
    
    let errorMessage = '';
    
    // Check rules in priority order
    if (rules.required && value === '') {
      errorMessage = errorMessages.required;
    } else if (rules.minLength && value.length < rules.minLength) {
      errorMessage = errorMessages.minLength(rules.minLength);
    } else if (rules.pattern && !rules.pattern.test(value)) {
      errorMessage = errorMessages.pattern;
    }
    
    // Update UI with validation result
    setInputValidationState(input, errorMessage);
  }
  
  function setInputValidationState(input, errorMessage) {
    // Find or create error element
    let errorElement = input.nextElementSibling;
    if (!errorElement || !errorElement.classList.contains('error-message')) {
      errorElement = document.createElement('div');
      errorElement.className = 'error-message';
      input.parentNode.insertBefore(errorElement, input.nextSibling);
    }
    
    // Update validation state
    if (errorMessage) {
      input.classList.add('invalid');
      input.classList.remove('valid');
      errorElement.textContent = errorMessage;
      errorElement.style.display = 'block';
    } else {
      input.classList.add('valid');
      input.classList.remove('invalid');
      errorElement.style.display = 'none';
    }
  }
}

// 5. Drag and drop with event delegation
function setupDragAndDrop() {
  const container = document.getElementById('sortable-list');
  
  // Delegation for all draggable items
  container.addEventListener('mousedown', function(e) {
    // Only handle draggable items
    if (!e.target.matches('.draggable-item')) return;
    
    const item = e.target;
    
    // Store original position data
    const rect = item.getBoundingClientRect();
    const offsetX = e.clientX - rect.left;
    const offsetY = e.clientY - rect.top;
    
    // Create clone for dragging visual
    const clone = item.cloneNode(true);
    clone.classList.add('dragging');
    document.body.appendChild(clone);
    
    // Position clone at cursor
    positionClone(e);
    
    // Create placeholder
    const placeholder = document.createElement('div');
    placeholder.className = 'drag-placeholder';
    placeholder.style.height = \`\${rect.height}px\`;
    item.parentNode.insertBefore(placeholder, item);
    
    // Hide original during drag
    item.style.display = 'none';
    
    // Move clone with mouse
    function handleMouseMove(e) {
      positionClone(e);
      
      // Find position for placeholder
      const elementsUnderCursor = document.elementsFromPoint(e.clientX, e.clientY);
      
      // Find valid drop targets
      for (const el of elementsUnderCursor) {
        if (el.matches('.draggable-item') && el !== item && el !== clone) {
          // Determine if we should place before or after this item
          const targetRect = el.getBoundingClientRect();
          const midpoint = targetRect.top + targetRect.height / 2;
          
          if (e.clientY < midpoint) {
            // Place before
            container.insertBefore(placeholder, el);
          } else {
            // Place after
            container.insertBefore(placeholder, el.nextSibling);
          }
          break;
        }
      }
    }
    
    // Position clone at cursor position
    function positionClone(e) {
      clone.style.left = \`\${e.clientX - offsetX}px\`;
      clone.style.top = \`\${e.clientY - offsetY}px\`;
    }
    
    // Handle drop
    function handleMouseUp(e) {
      // Remove listeners
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
      
      // Move original item to placeholder position
      placeholder.replaceWith(item);
      
      // Clean up
      clone.remove();
      item.style.display = '';
      
      // Trigger change event
      container.dispatchEvent(new CustomEvent('reorder', {
        detail: { item, newIndex: getItemIndex(item) }
      }));
    }
    
    // Add document-level event listeners
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
  });
  
  function getItemIndex(item) {
    return Array.from(container.children).indexOf(item);
  }
}`,
          exercise: {
            instructions:
              "Create a sortable table implementation using event delegation that allows users to sort by clicking column headers. Implement a custom event system that uses event bubbling to track user interactions across the application. Build a nested menu system that properly handles event propagation to ensure clicks on submenu items don't trigger parent menu actions.",
          },
        },
      ],
      prepperSummary: `
    <div class="prepper-summary">
      <h3>🔑 Key Interview Takeaways</h3>
      <ul>
        <li><strong>Event Listeners:</strong> Understand how to properly add, use, and remove event listeners with <code>addEventListener</code> and <code>removeEventListener</code>.</li>
        
        <li><strong>Event Object:</strong> Know the essential properties of the event object like <code>target</code>, <code>currentTarget</code>, <code>preventDefault</code>, and <code>stopPropagation</code>.</li>
        
        <li><strong>Event Flow:</strong> Understand the capturing and bubbling phases of event propagation and how to control them.</li>
        
        <li><strong>Event Delegation:</strong> Master the pattern of using a single event listener on a parent element to handle events for multiple child elements.</li>
        
        <li><strong>Performance:</strong> Implement efficient event handling strategies to minimize memory usage and optimize performance, especially for dynamic content.</li>
      </ul>
      
      <h4>📝 Common Interview Questions</h4>
      <ol>
        <li>"What is event delegation and why is it useful?"</li>
        <li>"What's the difference between <code>event.target</code> and <code>event.currentTarget</code>?"</li>
        <li>"Explain the event propagation flow in JavaScript"</li>
        <li>"How would you handle events for elements that don't exist yet?"</li>
        <li>"What performance issues might arise from adding too many event listeners?"</li>
      </ol>
    </div>
  `,
    },

    {
      title: 'Browser APIs',
      description: 'Explore common browser APIs for enhancing web applications.',
      sections: [
        {
          title: 'Essential Browser APIs',
          explanation: `
        <p>Modern browsers provide powerful APIs for building rich web applications. These APIs extend JavaScript's capabilities to interact with the user's device, handle data persistence, communicate with servers, and more.</p>
        
        <h4>Local and Session Storage</h4>
        <p>The Web Storage API provides mechanisms for client-side data storage that's more intuitive and flexible than cookies.</p>
        
        <p>Key features of <code>localStorage</code>:</p>
        <ul>
          <li>Persistent storage that remains until explicitly cleared</li>
          <li>Approximately 5-10MB storage limit (varies by browser)</li>
          <li>Data is stored in key-value pairs (strings only)</li>
          <li>Available across browser sessions and windows/tabs</li>
          <li>Not sent to the server with each request (unlike cookies)</li>
        </ul>
        
        <p>Key features of <code>sessionStorage</code>:</p>
        <ul>
          <li>Temporary storage that clears when the browser session ends</li>
          <li>Only available within the same browser tab or window that created it</li>
          <li>Otherwise similar to localStorage in API and size limits</li>
          <li>Useful for per-tab state that shouldn't persist between sessions</li>
        </ul>
        
        <p>Both storage types share the same API methods:</p>
        <ul>
          <li><code>setItem(key, value)</code> - Stores a string value</li>
          <li><code>getItem(key)</code> - Retrieves a previously stored value</li>
          <li><code>removeItem(key)</code> - Deletes a specific item</li>
          <li><code>clear()</code> - Removes all stored items</li>
          <li><code>key(index)</code> - Gets the key at the specified index</li>
        </ul>
        
        <div class="code-example">
          <pre><code>// Local Storage (persists until explicitly cleared)
localStorage.setItem('username', 'john_doe');
const username = localStorage.getItem('username');
localStorage.removeItem('username');
localStorage.clear(); // Remove all items

// Session Storage (cleared when window/tab closes)
sessionStorage.setItem('sessionId', '123456');
const sessionId = sessionStorage.getItem('sessionId');
sessionStorage.removeItem('sessionId');
sessionStorage.clear();

// Storage event (triggered when storage changes in other tabs)
window.addEventListener('storage', function(event) {
  console.log('Storage changed:', event.key, event.newValue, event.oldValue);
});</code></pre>
        </div>
        
        <h4>Fetch and XMLHttpRequest</h4>
        <p>These APIs enable communication with servers, allowing web applications to request and receive data without requiring a full page reload.</p>
        
        <p>The modern <code>Fetch API</code> offers several advantages:</p>
        <ul>
          <li>Promise-based for better async handling with <code>then()</code>, <code>catch()</code>, and async/await</li>
          <li>Cleaner, more flexible interface than XMLHttpRequest</li>
          <li>Built-in support for request/response headers and bodies</li>
          <li>Streamlined error handling (though with some gotchas)</li>
          <li>Support for CORS, credentials, and various content types</li>
        </ul>
        
        <p>The legacy <code>XMLHttpRequest</code> API still has some specific use cases:</p>
        <ul>
          <li>Better browser compatibility with older systems</li>
          <li>Progress event support for file uploads (monitoring upload progress)</li>
          <li>Ability to abort requests (Fetch also supports this with AbortController)</li>
          <li>Synchronous requests (though these are rarely recommended)</li>
        </ul>
        
        <div class="code-example">
          <pre><code>// Modern approach: Fetch API
fetch('https://api.example.com/data')
  .then(response => {
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json();
  })
  .then(data => console.log('Success:', data))
  .catch(error => console.error('Error:', error));

// Legacy approach: XMLHttpRequest
const xhr = new XMLHttpRequest();
xhr.open('GET', 'https://api.example.com/data');
xhr.responseType = 'json';

xhr.onload = function() {
  if (xhr.status === 200) {
    console.log('Success:', xhr.response);
  } else {
    console.error('Error:', xhr.statusText);
  }
};

xhr.onerror = function() {
  console.error('Request failed');
};

xhr.send();</code></pre>
        </div>
        
        <div class="interview-tip">
          <p><span class="interview-icon">🎯</span> <strong>Interview Focus:</strong> Understanding browser APIs demonstrates your ability to build modern web applications.</p>
          <p>Key APIs to understand:</p>
          <ul>
            <li>Storage APIs: <code>localStorage</code> and <code>sessionStorage</code></li>
            <li>Network APIs: <code>Fetch</code> and <code>XMLHttpRequest</code></li>
            <li>Geolocation, History, and Navigator APIs</li>
            <li>DOM APIs: Canvas, Intersection Observer, and Mutation Observer</li>
            <li>Performance considerations and browser compatibility</li>
          </ul>
        </div>
      `,
          codeExample: `// Essential Browser APIs Examples

// 1. Storage APIs - Enhanced Usage
function storageManager() {
  // Check for Storage support
  const storageAvailable = (type) => {
    try {
      const storage = window[type];
      const testKey = '__storage_test__';
      storage.setItem(testKey, testKey);
      storage.removeItem(testKey);
      return true;
    } catch (e) {
      return false;
    }
  };
  
  // Handle JSON objects
  const saveObject = (key, object, useSession = false) => {
    const storage = useSession ? sessionStorage : localStorage;
    try {
      const serialized = JSON.stringify(object);
      storage.setItem(key, serialized);
      return true;
    } catch (e) {
      console.error('Error saving to storage:', e);
      return false;
    }
  };
  
  const getObject = (key, useSession = false) => {
    const storage = useSession ? sessionStorage : localStorage;
    try {
      const serialized = storage.getItem(key);
      if (serialized === null) return null;
      return JSON.parse(serialized);
    } catch (e) {
      console.error('Error reading from storage:', e);
      return null;
    }
  };
  
  // Working with expiration
  const saveWithExpiry = (key, value, expiryInSeconds) => {
    const item = {
      value,
      expiry: Date.now() + (expiryInSeconds * 1000)
    };
    localStorage.setItem(key, JSON.stringify(item));
  };
  
  const getWithExpiry = (key) => {
    const itemStr = localStorage.getItem(key);
    if (!itemStr) return null;
    
    const item = JSON.parse(itemStr);
    if (Date.now() > item.expiry) {
      localStorage.removeItem(key);
      return null;
    }
    return item.value;
  };
  
  // Get storage usage
  const getStorageUsage = (useSession = false) => {
    const storage = useSession ? sessionStorage : localStorage;
    let total = 0;
    const items = {};
    
    for (let i = 0; i < storage.length; i++) {
      const key = storage.key(i);
      const value = storage.getItem(key);
      const size = (key.length + value.length) * 2; // UTF-16 uses 2 bytes per char
      
      items[key] = {
        size,
        sizeKB: (size / 1024).toFixed(2) + ' KB'
      };
      
      total += size;
    }
    
    return {
      items,
      total,
      totalKB: (total / 1024).toFixed(2) + ' KB',
      totalMB: (total / (1024 * 1024)).toFixed(2) + ' MB',
      limit: '5-10 MB (varies by browser)'
    };
  };
  
  return {
    isLocalStorageAvailable: storageAvailable('localStorage'),
    isSessionStorageAvailable: storageAvailable('sessionStorage'),
    saveObject,
    getObject,
    saveWithExpiry,
    getWithExpiry,
    getStorageUsage
  };
}

// 2. Enhanced Fetch API with timeout, retry, and caching
function createFetchClient() {
  const cache = new Map();
  
  // Default options
  const defaultOptions = {
    timeout: 5000,    // 5 seconds
    retries: 2,       // 3 total attempts (original + 2 retries)
    useCache: false,  // Cache by default
    cacheTTL: 60000   // 1 minute cache TTL
  };
  
  // Fetch with timeout
  const fetchWithTimeout = (url, options = {}) => {
    const controller = new AbortController();
    const { signal } = controller;
    
    // Set timeout to abort fetch
    const timeoutId = setTimeout(() => controller.abort(), options.timeout || defaultOptions.timeout);
    
    return fetch(url, { ...options, signal })
      .finally(() => clearTimeout(timeoutId));
  };
  
  // Fetch with retries
  const fetchWithRetry = async (url, options = {}) => {
    const maxRetries = options.retries || defaultOptions.retries;
    let retries = 0;
    let lastError;
    
    while (retries <= maxRetries) {
      try {
        return await fetchWithTimeout(url, options);
      } catch (error) {
        lastError = error;
        retries++;
        
        // If we've used all retries, throw the error
        if (retries > maxRetries) break;
        
        console.log(\`Fetch attempt \${retries} failed, retrying...\`);
        
        // Wait before retrying (exponential backoff)
        await new Promise(resolve => setTimeout(resolve, 1000 * Math.pow(2, retries)));
      }
    }
    
    throw lastError;
  };
  
  // Fetch with caching
  const fetchWithCache = async (url, options = {}) => {
    const useCache = options.useCache ?? defaultOptions.useCache;
    const cacheTTL = options.cacheTTL || defaultOptions.cacheTTL;
    
    // Generate cache key based on URL and any body content
    const cacheKey = \`\${url}_\${options.body || ''}\`;
    
    // Check cache for valid entry
    if (useCache && cache.has(cacheKey)) {
      const cachedResponse = cache.get(cacheKey);
      if (Date.now() - cachedResponse.timestamp < cacheTTL) {
        console.log('Using cached response for:', url);
        return Promise.resolve(cachedResponse.clone());
      } else {
        // Expired cache entry
        cache.delete(cacheKey);
      }
    }
    
    // Get fresh response
    const response = await fetchWithRetry(url, options);
    
    // Cache the response if successful
    if (useCache && response.ok) {
      // We need to clone the response as it can only be consumed once
      const clonedResponse = response.clone();
      clonedResponse.timestamp = Date.now();
      cache.set(cacheKey, clonedResponse);
    }
    
    return response;
  };
  
  // Main fetch method with all enhancements
  const fetch = async (url, options = {}) => {
    const combinedOptions = { ...defaultOptions, ...options };
    
    try {
      const response = await fetchWithCache(url, combinedOptions);
      
      // Check status
      if (!response.ok) {
        throw new Error(\`HTTP error: \${response.status} \${response.statusText}\`);
      }
      
      // Parse response based on content-type
      const contentType = response.headers.get('content-type') || '';
      
      if (contentType.includes('application/json')) {
        return await response.json();
      } else if (contentType.includes('text/')) {
        return await response.text();
      } else {
        return await response.blob();
      }
    } catch (error) {
      console.error(\`Fetch error for \${url}:\`, error);
      throw error;
    }
  };
  
  // Clear cache
  const clearCache = () => cache.clear();
  
  return {
    fetch,
    clearCache
  };
}

// 3. Geolocation API with error handling
function locationService() {
  // Check for support
  const isSupported = 'geolocation' in navigator;
  
  // Get current position with error handling
  const getCurrentPosition = (options = {}) => {
    return new Promise((resolve, reject) => {
      if (!isSupported) {
        reject(new Error('Geolocation is not supported by this browser'));
        return;
      }
      
      // Default options
      const defaultOptions = {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 0
      };
      
      navigator.geolocation.getCurrentPosition(
        // Success handler
        position => {
          resolve({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
            accuracy: position.coords.accuracy,
            timestamp: position.timestamp
          });
        },
        // Error handler
        error => {
          let message;
          
          switch (error.code) {
            case error.PERMISSION_DENIED:
              message = 'User denied the request for geolocation';
              break;
            case error.POSITION_UNAVAILABLE:
              message = 'Location information is unavailable';
              break;
            case error.TIMEOUT:
              message = 'The request to get user location timed out';
              break;
            default:
              message = 'An unknown error occurred';
          }
          
          reject(new Error(message));
        },
        { ...defaultOptions, ...options }
      );
    });
  };
  
  // Watch position with cleanup
  const watchPosition = (successCallback, errorCallback, options = {}) => {
    if (!isSupported) {
      errorCallback(new Error('Geolocation is not supported'));
      return null;
    }
    
    const defaultOptions = {
      enableHighAccuracy: true,
      timeout: 10000,
      maximumAge: 0
    };
    
    const watchId = navigator.geolocation.watchPosition(
      position => {
        successCallback({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          accuracy: position.coords.accuracy,
          timestamp: position.timestamp
        });
      },
      error => {
        errorCallback(error);
      },
      { ...defaultOptions, ...options }
    );
    
    // Return function to clear watch
    return {
      clear: () => navigator.geolocation.clearWatch(watchId)
    };
  };
  
  return {
    isSupported,
    getCurrentPosition,
    watchPosition
  };
}

// 4. History API for single-page applications
function routerService() {
  const routes = new Map();
  let notFoundHandler = () => console.error('Route not found');
  
  // Register routes
  const addRoute = (path, handler) => {
    routes.set(path, handler);
  };
  
  // Set 404 handler
  const setNotFoundHandler = (handler) => {
    notFoundHandler = handler;
  };
  
  // Navigate to route
  const navigateTo = (path, state = {}) => {
    // Add to browser history
    history.pushState(state, '', path);
    // Handle the new route
    handleRouteChange();
  };
  
  // Replace current history entry
  const replaceTo = (path, state = {}) => {
    history.replaceState(state, '', path);
    handleRouteChange();
  };
  
  // Handle route change
  const handleRouteChange = () => {
    const path = window.location.pathname;
    
    // Find route handler
    if (routes.has(path)) {
      routes.get(path)(history.state);
    } else {
      // Check for pattern matches
      let matched = false;
      
      for (const [routePath, handler] of routes.entries()) {
        // Simple pattern matching
        if (routePath.includes(':')) {
          const routeParts = routePath.split('/');
          const pathParts = path.split('/');
          
          if (routeParts.length === pathParts.length) {
            const params = {};
            let match = true;
            
            for (let i = 0; i < routeParts.length; i++) {
              if (routeParts[i].startsWith(':')) {
                // Extract parameter
                const paramName = routeParts[i].slice(1);
                params[paramName] = pathParts[i];
              } else if (routeParts[i] !== pathParts[i]) {
                match = false;
                break;
              }
            }
            
            if (match) {
              handler({ ...history.state, params });
              matched = true;
              break;
            }
          }
        }
      }
      
      if (!matched) {
        notFoundHandler();
      }
    }
  };
  
  // Initialize
  const init = () => {
    // Handle browser back/forward buttons
    window.addEventListener('popstate', handleRouteChange);
    
    // Handle initial route
    handleRouteChange();
  };
  
  return {
    addRoute,
    setNotFoundHandler,
    navigateTo,
    replaceTo,
    init
  };
}

// 5. Intersection Observer for lazy loading and scroll effects
function createIntersectionObserver() {
  // Check for support
  const isSupported = 'IntersectionObserver' in window;
  
  // Create lazy loading observer for images
  const createLazyLoader = (options = {}) => {
    if (!isSupported) {
      console.warn('IntersectionObserver not supported');
      return null;
    }
    
    const defaultOptions = {
      root: null, // viewport
      rootMargin: '0px',
      threshold: 0.1 // 10% of element visible
    };
    
    const observer = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const element = entry.target;
          
          if (element.tagName === 'IMG') {
            // Load image from data-src
            const src = element.getAttribute('data-src');
            if (src) {
              element.src = src;
              element.removeAttribute('data-src');
              element.classList.add('loaded');
            }
          } else if (element.tagName === 'VIDEO') {
            // Start video playback
            element.play();
          } else {
            // General elements - add class and fire event
            element.classList.add('in-viewport');
            element.dispatchEvent(new CustomEvent('entered-viewport'));
          }
          
          // Stop observing once loaded
          observer.unobserve(element);
        }
      });
    }, { ...defaultOptions, ...options });
    
    // Function to start observing elements
    const observe = (elements) => {
      if (!Array.isArray(elements)) {
        elements = [elements];
      }
      
      elements.forEach(element => observer.observe(element));
    };
    
    // Function to stop observing elements
    const unobserve = (elements) => {
      if (!Array.isArray(elements)) {
        elements = [elements];
      }
      
      elements.forEach(element => observer.unobserve(element));
    };
    
    return {
      observe,
      unobserve,
      disconnect: () => observer.disconnect()
    };
  };
  
  // Create scrollspy for navigation
  const createScrollSpy = (options = {}) => {
    if (!isSupported) {
      console.warn('IntersectionObserver not supported');
      return null;
    }
    
    const defaultOptions = {
      root: null,
      rootMargin: '-100px 0px -80% 0px', // Top area of viewport with offset
      threshold: 0
    };
    
    let activeSection = null;
    let navLinks = [];
    
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        // Store section id if it's entering viewport
        if (entry.isIntersecting) {
          activeSection = entry.target.id;
          
          // Update nav links
          navLinks.forEach(link => {
            if (link.getAttribute('href') === \`#\${activeSection}\`) {
              link.classList.add('active');
            } else {
              link.classList.remove('active');
            }
          });
        }
      });
    }, { ...defaultOptions, ...options });
    
    // Observe all sections
    const init = (sectionsSelector, navLinksSelector) => {
      const sections = document.querySelectorAll(sectionsSelector);
      navLinks = Array.from(document.querySelectorAll(navLinksSelector));
      
      sections.forEach(section => {
        observer.observe(section);
      });
    };
    
    return {
      init,
      disconnect: () => observer.disconnect(),
      getActiveSection: () => activeSection
    };
  };
  
  return {
    isSupported,
    createLazyLoader,
    createScrollSpy
  };
}`,
          exercise: {
            instructions:
              "Implement a client-side data persistence layer that intelligently stores data using localStorage with fallback mechanisms. Create a location-based feature that detects a user's position and finds nearby points of interest. Build a scroll-based animation system using the Intersection Observer API that triggers different animations as elements enter the viewport.",
          },
        },
        {
          title: 'Advanced Browser APIs',
          explanation: `
        <p>More specialized browser APIs enable advanced features in modern web applications. These powerful interfaces allow developers to create sophisticated experiences that go beyond basic web functionality.</p>
        
        <h4>Canvas and WebGL</h4>
        <p>The <code>Canvas API</code> provides a drawing surface for 2D graphics, while <code>WebGL</code> offers hardware-accelerated 3D rendering within the browser.</p>
        
        <p>Key Canvas capabilities include:</p>
        <ul>
          <li>Drawing shapes, text, and images on a bitmap surface</li>
          <li>Pixel-level manipulation for image processing</li>
          <li>Creating animations and visualizations</li>
          <li>Compositing with various blend modes and transformations</li>
          <li>Exporting drawn content as images</li>
        </ul>
        
        <p>The Canvas workflow follows these general steps:</p>
        <ol>
          <li>Get a reference to the canvas element with <code>getElementById</code> or another selector</li>
          <li>Get the drawing context with <code>getContext('2d')</code></li>
          <li>Set styles and drawing parameters on the context object</li>
          <li>Call drawing methods like <code>fillRect()</code>, <code>arc()</code>, or <code>stroke()</code></li>
          <li>For animations, use <code>requestAnimationFrame()</code> to update and redraw</li>
        </ol>
        
        <div class="code-example">
          <pre><code>// Basic Canvas drawing
const canvas = document.getElementById('myCanvas');
const ctx = canvas.getContext('2d');

// Set styles
ctx.fillStyle = 'blue';
ctx.strokeStyle = 'red';
ctx.lineWidth = 5;

// Draw shapes
ctx.fillRect(25, 25, 100, 100); // filled rectangle
ctx.strokeRect(50, 50, 150, 80); // outlined rectangle

// Draw path
ctx.beginPath();
ctx.moveTo(75, 50);
ctx.lineTo(100, 75);
ctx.lineTo(100, 25);
ctx.closePath(); // Closes path (connects last point to first)
ctx.fill(); // Fill the path</code></pre>
        </div>
        
        <h4>Web Storage and IndexedDB</h4>
        <p>For more robust client-side data storage beyond <code>localStorage</code>, browsers provide <code>IndexedDB</code> - a full-featured, transactional database system.</p>
        
        <p>IndexedDB advantages over localStorage:</p>
        <ul>
          <li>Stores complex JavaScript objects, not just strings</li>
          <li>Significantly larger storage limits</li>
          <li>Indexed queries for efficient data retrieval</li>
          <li>Transactional model to ensure data integrity</li>
          <li>Asynchronous API that doesn't block the main thread</li>
        </ul>
        
        <p>The IndexedDB workflow involves:</p>
        <ol>
          <li>Opening a database connection with <code>indexedDB.open()</code></li>
          <li>Creating object stores (similar to tables) in the <code>onupgradeneeded</code> event</li>
          <li>Defining indexes for efficient querying</li>
          <li>Performing operations within transactions</li>
          <li>Using cursor objects to iterate through data sets</li>
        </ol>
        
        <div class="code-example">
          <pre><code>// IndexedDB for structured data storage
const dbRequest = indexedDB.open('MyDatabase', 1);

dbRequest.onupgradeneeded = function(event) {
  const db = event.target.result;
  
  // Create object store (table)
  const store = db.createObjectStore('users', { keyPath: 'id' });
  store.createIndex('name', 'name', { unique: false });
};

dbRequest.onsuccess = function(event) {
  const db = event.target.result;
  
  // Add data
  const transaction = db.transaction(['users'], 'readwrite');
  const store = transaction.objectStore('users');
  
  store.add({ id: 1, name: 'John', email: 'john@example.com' });
  
  // Read data
  const getRequest = store.get(1);
  getRequest.onsuccess = function() {
    console.log('User:', getRequest.result);
  };
};</code></pre>
        </div>
        
        <div class="interview-tip">
          <p><span class="interview-icon">🎯</span> <strong>Interview Focus:</strong> Advanced browser APIs showcase your depth of knowledge.</p>
          <p>Key points to understand:</p>
          <ul>
            <li>When to use <code>IndexedDB</code> vs <code>localStorage</code>/<code>sessionStorage</code></li>
            <li>Basic Canvas drawing and animation techniques</li>
            <li>Service Workers for offline functionality</li>
            <li>Web Workers for multi-threading in JavaScript</li>
            <li>Application security considerations with browser APIs</li>
          </ul>
        </div>
      `,
          codeExample: `// Advanced Browser APIs Examples

// 1. Canvas Drawing and Animation
function canvasGraphics() {
  const canvas = document.getElementById('myCanvas');
  const ctx = canvas.getContext('2d');
  
  // Set canvas to full window size
  function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }
  
  // Basic shape drawing
  function drawShapes() {
    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Rectangle
    ctx.fillStyle = '#3498db';
    ctx.fillRect(100, 100, 150, 100);
    
    // Circle
    ctx.beginPath();
    ctx.arc(300, 150, 50, 0, Math.PI * 2);
    ctx.fillStyle = '#e74c3c';
    ctx.fill();
    
    // Triangle
    ctx.beginPath();
    ctx.moveTo(400, 100);
    ctx.lineTo(450, 200);
    ctx.lineTo(350, 200);
    ctx.closePath();
    ctx.fillStyle = '#2ecc71';
    ctx.fill();
    ctx.strokeStyle = '#27ae60';
    ctx.lineWidth = 3;
    ctx.stroke();
    
    // Text
    ctx.font = '24px Arial';
    ctx.fillStyle = '#333';
    ctx.fillText('Canvas Drawing', 200, 50);
  }
  
  // Draw line chart
  function drawLineChart(data, options = {}) {
    const {
      xPadding = 40,
      yPadding = 40,
      color = '#2980b9',
      axisColor = '#666',
      textColor = '#333',
      gridColor = '#eee'
    } = options;
    
    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Find min/max values
    const max = Math.max(...data.map(point => point.y));
    const min = Math.min(...data.map(point => point.y));
    
    // Determine chart dimensions
    const chartWidth = canvas.width - 2 * xPadding;
    const chartHeight = canvas.height - 2 * yPadding;
    
    // Draw grid and axes
    ctx.lineWidth = 1;
    ctx.strokeStyle = axisColor;
    
    // Y-axis
    ctx.beginPath();
    ctx.moveTo(xPadding, yPadding);
    ctx.lineTo(xPadding, chartHeight + yPadding);
    ctx.stroke();
    
    // X-axis
    ctx.beginPath();
    ctx.moveTo(xPadding, chartHeight + yPadding);
    ctx.lineTo(chartWidth + xPadding, chartHeight + yPadding);
    ctx.stroke();
    
    // Calculate point positions
    const points = data.map((point, i) => {
      const x = xPadding + (chartWidth / (data.length - 1)) * i;
      const y = chartHeight - ((point.y - min) / (max - min)) * chartHeight + yPadding;
      return { x, y };
    });
    
    // Draw connecting lines
    ctx.beginPath();
    ctx.moveTo(points[0].x, points[0].y);
    
    for (let i = 1; i < points.length; i++) {
      ctx.lineTo(points[i].x, points[i].y);
    }
    
    ctx.strokeStyle = color;
    ctx.lineWidth = 2;
    ctx.stroke();
    
    // Draw points
    points.forEach((point, i) => {
      ctx.beginPath();
      ctx.arc(point.x, point.y, 5, 0, Math.PI * 2);
      ctx.fillStyle = color;
      ctx.fill();
      
      // Draw labels
      ctx.font = '12px Arial';
      ctx.fillStyle = textColor;
      ctx.fillText(data[i].y.toString(), point.x - 10, point.y - 10);
      ctx.fillText(data[i].x, point.x - 10, chartHeight + yPadding + 20);
    });
  }
  
  // Animation function
  let animationId;
  function startAnimation() {
    let angle = 0;
    const particles = [];
    
    for (let i = 0; i < 50; i++) {
      particles.push({
        x: canvas.width / 2,
        y: canvas.height / 2,
        size: Math.random() * 5 + 1,
        speed: Math.random() * 3 + 1,
        angle: Math.random() * Math.PI * 2,
        color: \`hsl(\${Math.random() * 360}, 70%, 60%)\`
      });
    }
    
    function animate() {
      // Clear with semi-transparency for trail effect
      ctx.fillStyle = 'rgba(255, 255, 255, 0.1)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      angle += 0.01;
      
      particles.forEach(particle => {
        // Update position
        particle.x += Math.cos(particle.angle) * particle.speed;
        particle.y += Math.sin(particle.angle) * particle.speed;
        
        // Slightly change angle
        particle.angle += Math.sin(angle) * 0.05;
        
        // Draw particle
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fillStyle = particle.color;
        ctx.fill();
        
        // Boundary check
        if (particle.x < 0 || particle.x > canvas.width ||
            particle.y < 0 || particle.y > canvas.height) {
          // Reset to center
          particle.x = canvas.width / 2;
          particle.y = canvas.height / 2;
          particle.angle = Math.random() * Math.PI * 2;
        }
      });
      
      animationId = requestAnimationFrame(animate);
    }
    
    animate();
  }
  
  function stopAnimation() {
    if (animationId) {
      cancelAnimationFrame(animationId);
    }
  }
  
  return {
    init: () => {
      resizeCanvas();
      window.addEventListener('resize', resizeCanvas);
    },
    drawShapes,
    drawLineChart,
    startAnimation,
    stopAnimation
  };
}

// 2. IndexedDB Database Management
function indexedDBManager() {
  const DB_NAME = 'AppDatabase';
  const DB_VERSION = 1;
  let db;
  
  // Open database
  function openDatabase() {
    return new Promise((resolve, reject) => {
      const request = indexedDB.open(DB_NAME, DB_VERSION);
      
      request.onerror = event => {
        reject('Error opening database');
      };
      
      request.onsuccess = event => {
        db = event.target.result;
        resolve(db);
      };
      
      // Create schema
      request.onupgradeneeded = event => {
        const db = event.target.result;
        
        // Create stores for different data types
        if (!db.objectStoreNames.contains('users')) {
          const userStore = db.createObjectStore('users', { keyPath: 'id', autoIncrement: true });
          userStore.createIndex('email', 'email', { unique: true });
          userStore.createIndex('name', 'name', { unique: false });
        }
        
        if (!db.objectStoreNames.contains('tasks')) {
          const taskStore = db.createObjectStore('tasks', { keyPath: 'id', autoIncrement: true });
          taskStore.createIndex('userId', 'userId', { unique: false });
          taskStore.createIndex('completed', 'completed', { unique: false });
          taskStore.createIndex('dueDate', 'dueDate', { unique: false });
        }
      };
    });
  }
  
  // Generic get all items from store
  function getAll(storeName) {
    return new Promise((resolve, reject) => {
      if (!db) {
        reject('Database not initialized');
        return;
      }
      
      const transaction = db.transaction([storeName], 'readonly');
      const store = transaction.objectStore(storeName);
      const request = store.getAll();
      
      request.onsuccess = () => {
        resolve(request.result);
      };
      
      request.onerror = () => {
        reject(\`Error fetching from \${storeName}\`);
      };
    });
  }
  
  // Get item by id
  function getById(storeName, id) {
    return new Promise((resolve, reject) => {
      if (!db) {
        reject('Database not initialized');
        return;
      }
      
      const transaction = db.transaction([storeName], 'readonly');
      const store = transaction.objectStore(storeName);
      const request = store.get(id);
      
      request.onsuccess = () => {
        resolve(request.result);
      };
      
      request.onerror = () => {
        reject(\`Error fetching \${storeName} with id \${id}\`);
      };
    });
  }
  
  // Add item to store
  function add(storeName, item) {
    return new Promise((resolve, reject) => {
      if (!db) {
        reject('Database not initialized');
        return;
      }
      
      const transaction = db.transaction([storeName], 'readwrite');
      const store = transaction.objectStore(storeName);
      const request = store.add(item);
      
      request.onsuccess = () => {
        resolve(request.result); // Returns generated id
      };
      
      request.onerror = (event) => {
        if (event.target.error.name === 'ConstraintError') {
          reject('Item with this unique key already exists');
        } else {
          reject(\`Error adding to \${storeName}\`);
        }
      };
    });
  }
  
  // Update item
  function update(storeName, item) {
    return new Promise((resolve, reject) => {
      if (!db) {
        reject('Database not initialized');
        return;
      }
      
      if (!item.id) {
        reject('Item must have an id');
        return;
      }
      
      const transaction = db.transaction([storeName], 'readwrite');
      const store = transaction.objectStore(storeName);
      const request = store.put(item);
      
      request.onsuccess = () => {
        resolve(request.result);
      };
      
      request.onerror = () => {
        reject(\`Error updating \${storeName}\`);
      };
    });
  }
  
  // Delete item
  function remove(storeName, id) {
    return new Promise((resolve, reject) => {
      if (!db) {
        reject('Database not initialized');
        return;
      }
      
      const transaction = db.transaction([storeName], 'readwrite');
      const store = transaction.objectStore(storeName);
      const request = store.delete(id);
      
      request.onsuccess = () => {
        resolve(true);
      };
      
      request.onerror = () => {
        reject(\`Error deleting from \${storeName}\`);
      };
    });
  }
  
  // Query by index
  function queryByIndex(storeName, indexName, value) {
    return new Promise((resolve, reject) => {
      if (!db) {
        reject('Database not initialized');
        return;
      }
      
      const transaction = db.transaction([storeName], 'readonly');
      const store = transaction.objectStore(storeName);
      const index = store.index(indexName);
      const request = index.getAll(value);
      
      request.onsuccess = () => {
        resolve(request.result);
      };
      
      request.onerror = () => {
        reject(\`Error querying \${storeName} by \${indexName}\`);
      };
    });
  }
  
  // Clear store
  function clearStore(storeName) {
    return new Promise((resolve, reject) => {
      if (!db) {
        reject('Database not initialized');
        return;
      }
      
      const transaction = db.transaction([storeName], 'readwrite');
      const store = transaction.objectStore(storeName);
      const request = store.clear();
      
      request.onsuccess = () => {
        resolve(true);
      };
      
      request.onerror = () => {
        reject(\`Error clearing \${storeName}\`);
      };
    });
  }
  
  // Close database
  function closeDatabase() {
    if (db) {
      db.close();
      db = null;
    }
  }
  
  return {
    init: openDatabase,
    getAll,
    getById,
    add,
    update,
    remove,
    queryByIndex,
    clearStore,
    closeDatabase
  };
}

// 3. Web Workers for CPU-intensive tasks
function webWorkerManager() {
  // Check support
  const isSupported = 'Worker' in window;
  
  // Create worker from inline script
  function createInlineWorker(scriptText) {
    if (!isSupported) {
      throw new Error('Web Workers not supported');
    }
    
    const blob = new Blob([scriptText], { type: 'application/javascript' });
    const url = URL.createObjectURL(blob);
    const worker = new Worker(url);
    
    // Clean up URL when done
    worker.addEventListener('terminate', () => {
      URL.revokeObjectURL(url);
    });
    
    return worker;
  }
  
  // Example worker for image processing
  function createImageProcessor() {
    const workerScript = \`
      self.onmessage = function(e) {
        const { imageData, filter } = e.data;
        const width = imageData.width;
        const height = imageData.height;
        const pixels = imageData.data;
        
        // Apply specified filter
        switch (filter) {
          case 'grayscale':
            for (let i = 0; i < pixels.length; i += 4) {
              const avg = (pixels[i] + pixels[i + 1] + pixels[i + 2]) / 3;
              pixels[i] = avg;     // Red
              pixels[i + 1] = avg; // Green
              pixels[i + 2] = avg; // Blue
            }
            break;
            
          case 'invert':
            for (let i = 0; i < pixels.length; i += 4) {
              pixels[i] = 255 - pixels[i];       // Red
              pixels[i + 1] = 255 - pixels[i + 1]; // Green
              pixels[i + 2] = 255 - pixels[i + 2]; // Blue
            }
            break;
            
          case 'sepia':
            for (let i = 0; i < pixels.length; i += 4) {
              const r = pixels[i];
              const g = pixels[i + 1];
              const b = pixels[i + 2];
              
              pixels[i] = Math.min(255, (r * 0.393) + (g * 0.769) + (b * 0.189));
              pixels[i + 1] = Math.min(255, (r * 0.349) + (g * 0.686) + (b * 0.168));
              pixels[i + 2] = Math.min(255, (r * 0.272) + (g * 0.534) + (b * 0.131));
            }
            break;
        }
        
        self.postMessage({ imageData, filter });
      };
    \`;
    
    const worker = createInlineWorker(workerScript);
    
    // Process an image with a filter
    function processImage(imageData, filter) {
      return new Promise((resolve, reject) => {
        worker.onmessage = function(e) {
          resolve(e.data.imageData);
        };
        
        worker.onerror = function(error) {
          reject(error);
        };
        
        worker.postMessage({ imageData, filter });
      });
    }
    
    // Cleanup
    function terminate() {
      worker.terminate();
    }
    
    return {
      processImage,
      terminate
    };
  }
  
  return {
    isSupported,
    createInlineWorker,
    createImageProcessor
  };
}`,
          exercise: {
            instructions:
              'Create a drawing application using the Canvas API that allows users to sketch with different colors and brush sizes. Implement an offline-capable notes application that uses IndexedDB to store user notes with search and filter capabilities. Build a background data processing system using Web Workers to perform complex calculations without freezing the UI.',
          },
        },
      ],
      prepperSummary: `
    <div class="prepper-summary">
      <h3>🔑 Key Interview Takeaways</h3>
      <ul>
        <li><strong>Storage APIs:</strong> Understand the differences between <code>localStorage</code>, <code>sessionStorage</code>, and <code>IndexedDB</code> and the appropriate use cases for each.</li>
        
        <li><strong>Network APIs:</strong> Master the <code>Fetch API</code> and understand its advantages over <code>XMLHttpRequest</code>, including how to handle errors, timeouts, and response types.</li>
        
        <li><strong>Observer APIs:</strong> Know how to use <code>Intersection Observer</code> for performance-efficient handling of elements entering and leaving the viewport.</li>
        
        <li><strong>Canvas/Graphics:</strong> Demonstrate basic understanding of canvas drawing and animation techniques for creating dynamic visuals.</li>
        
        <li><strong>Performance:</strong> Implement best practices around browser APIs to ensure efficient resource usage, like preventing memory leaks with event listeners.</li>
      </ul>
      
      <h4>📝 Common Interview Questions</h4>
      <ol>
        <li>"What's the difference between <code>localStorage</code> and <code>IndexedDB</code>?"</li>
        <li>"How would you implement a reliable caching mechanism for API responses?"</li>
        <li>"Explain how you would create an efficient lazy loading system for images"</li>
        <li>"How would you create a responsive application that persists data offline?"</li>
        <li>"What browser APIs would you use to improve performance in a complex web application?"</li>
      </ol>
    </div>
  `,
    },
  ],
  challenge: {
    description:
      "You're building a collaborative drawing application that allows multiple users to draw on a shared canvas in real-time. Your task is to create the front-end components that handle canvas drawing, user interactions, and synchronization of drawing actions between users.",
    requirements: [
      'Create a canvas-based drawing interface with different tools (pen, eraser, shapes)',
      'Implement user interaction events for drawing, including mouse and touch support',
      'Build a color palette and brush size selector that updates the drawing context',
      'Create an event system to capture drawing actions for synchronization',
      'Implement efficient DOM updates for the UI controls and status indicators',
    ],
    starterCode: `// CollaborativeDrawing - DOM Manipulation and Events Challenge

class DrawingApp {
  constructor(canvasId) {
    this.canvas = document.getElementById(canvasId);
    this.ctx = this.canvas.getContext('2d');
    
    // TODO: Set up canvas and drawing context
    
    // TODO: Initialize drawing state (tool, color, brush size)
    
    // TODO: Set up event listeners for drawing actions
    
    // TODO: Create UI control event handlers
  }
  
  // Drawing tools implementation
  setTool(toolName) {
    // TODO: Implement changing between pen, eraser, rectangle, circle, etc.
  }
  
  setColor(color) {
    // TODO: Implement color changing
  }
  
  setBrushSize(size) {
    // TODO: Implement brush size changing
  }
  
  // Drawing event handlers
  handleDrawStart(event) {
    // TODO: Implement starting a drawing action
  }
  
  handleDrawMove(event) {
    // TODO: Implement continuing a drawing action
  }
  
  handleDrawEnd(event) {
    // TODO: Implement completing a drawing action
  }
  
  // Drawing synchronization
  captureDrawingAction(actionType, data) {
    // TODO: Implement event capture for synchronization
  }
}

// Export the DrawingApp
export default DrawingApp;`,
  },
}

export default domManipulationAndEvents
