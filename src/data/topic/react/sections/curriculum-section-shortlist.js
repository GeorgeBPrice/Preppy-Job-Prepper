// curriculum-section-shortlist.js - 20 x React Shortlist Review

const shortlistPrepper = {
  title: 'Minicourse React Recapper',
  description: '',
  lessons: [
    {
      title: '20 Essential React Concepts',
      description:
        'A comprehensive review of the most critical React concepts for interviews, covering fundamentals, state management, advanced patterns, and ecosystem considerations.',
      sections: [
        {
          title: 'React Fundamentals (5 Key Concepts)',
          explanation: `
        <p>These five fundamental concepts form the foundation of React development and are essential for understanding how the library works:</p>

        <h4>1. Components and JSX</h4>
        <p>Components are the building blocks of React applications, allowing you to split the UI into independent, reusable pieces:</p>

        <p><strong>Component Types:</strong> React offers two ways to define components:</p>
        <ul>
          <li><code>Class Components</code>: ES6 classes that extend React.Component</li>
          <li><code>Functional Components</code>: JavaScript functions that accept props and return React elements</li>
        </ul>

        <p><strong>JSX:</strong> JSX is a syntax extension that allows you to write HTML-like elements in JavaScript.</p>
        <ul>
          <li>JSX compiles to <code>React.createElement()</code> calls</li>
          <li>Curly braces <code>{}</code> are used to embed JavaScript expressions</li>
          <li>HTML attributes use camelCase naming (e.g., <code>className</code> instead of class)</li>
        </ul>

        <p><strong>Component Composition:</strong> React encourages building complex UIs by composing smaller components.</p>
        
        <div class="code-example">
          <pre><code>// Functional Component
function Greeting({ name }) {
  return &lt;h1&gt;Hello, {name}!&lt;/h1&gt;;
}

// Class Component
class Counter extends React.Component {
  constructor(props) {
    super(props);
    this.state = { count: 0 };
  }
  
  render() {
    return (
      &lt;div&gt;
        &lt;p&gt;Count: {this.state.count}&lt;/p&gt;
        &lt;button onClick={() => this.setState({ count: this.state.count + 1 })}&gt;
          Increment
        &lt;/button&gt;
      &lt;/div&gt;
    );
  }
}

// Component Composition
function App() {
  return (
    &lt;div&gt;
      &lt;Greeting name="React Developer" /&gt;
      &lt;Counter /&gt;
    &lt;/div&gt;
  );
}</code></pre>
        </div>

        <h4>2. Props and PropTypes</h4>
        <p>Props (short for properties) allow components to communicate with each other:</p>

        <p><strong>Props Basics:</strong></p>
        <ul>
          <li>Pass data from parent to child components</li>
          <li>Props are read-only (immutable)</li>
          <li>Can include any JavaScript value: primitives, objects, arrays, functions</li>
        </ul>

        <p><strong>Props Destructuring:</strong> ES6 destructuring provides a cleaner way to access props.</p>

        <p><strong>PropTypes:</strong> Runtime type checking for React props.</p>
        <ul>
          <li>Improves component documentation</li>
          <li>Helps catch bugs with warnings during development</li>
          <li>Defines required vs optional props</li>
        </ul>

        <p><strong>Default Props:</strong> Specify default values for props when not provided.</p>
        
        <div class="code-example">
          <pre><code>import PropTypes from 'prop-types';

// Props with destructuring
function UserProfile({ name, age, isAdmin = false }) {
  return (
    &lt;div&gt;
      &lt;h2&gt;{name}&lt;/h2&gt;
      &lt;p&gt;Age: {age}&lt;/p&gt;
      {isAdmin &amp;&amp; &lt;p&gt;Admin User&lt;/p&gt;}
    &lt;/div&gt;
  );
}

// PropTypes validation
UserProfile.propTypes = {
  name: PropTypes.string.isRequired,
  age: PropTypes.number,
  isAdmin: PropTypes.bool
};

// Default props
UserProfile.defaultProps = {
  age: 0,
  isAdmin: false
};

// Usage
function App() {
  return (
    &lt;div&gt;
      &lt;UserProfile name="Alice" age={28} isAdmin={true} /&gt;
      &lt;UserProfile name="Bob" age={32} /&gt;
    &lt;/div&gt;
  );
}</code></pre>
        </div>

        <h4>3. State and Lifecycle</h4>
        <p>State allows React components to create and manage their own data:</p>

        <p><strong>State in Class Components:</strong></p>
        <ul>
          <li>Initialized in the constructor with <code>this.state</code></li>
          <li>Updated with <code>this.setState()</code> (never modify state directly)</li>
          <li>State updates may be asynchronous</li>
        </ul>

        <p><strong>Lifecycle Methods:</strong> Class components have methods that run at particular times:</p>
        <ul>
          <li><code>componentDidMount()</code>: After component output has been rendered to the DOM</li>
          <li><code>componentDidUpdate(prevProps, prevState)</code>: After updating</li>
          <li><code>componentWillUnmount()</code>: Before component is removed from the DOM</li>
        </ul>

        <p><strong>State in Functional Components:</strong> With the introduction of Hooks, functional components can use state.</p>
        
        <div class="code-example">
          <pre><code>// State in Class Component
class Timer extends React.Component {
  constructor(props) {
    super(props);
    this.state = { seconds: 0 };
  }
  
  componentDidMount() {
    this.interval = setInterval(() => {
      this.setState(state => ({
        seconds: state.seconds + 1
      }));
    }, 1000);
  }
  
  componentWillUnmount() {
    clearInterval(this.interval);
  }
  
  render() {
    return &lt;div&gt;Seconds: {this.state.seconds}&lt;/div&gt;;
  }
}

// State in Functional Component (with Hooks)
import React, { useState, useEffect } from 'react';

function FunctionalTimer() {
  const [seconds, setSeconds] = useState(0);
  
  useEffect(() => {
    const interval = setInterval(() => {
      setSeconds(seconds => seconds + 1);
    }, 1000);
    
    // Cleanup function (equivalent to componentWillUnmount)
    return () => clearInterval(interval);
  }, []); // Empty dependency array means this runs once on mount
  
  return &lt;div&gt;Seconds: {seconds}&lt;/div&gt;;
}</code></pre>
        </div>

        <h4>4. Event Handling in React</h4>
        <p>React provides a system for handling user interactions like clicks, form submissions, etc.:</p>

        <p><strong>Event Naming:</strong> React events use camelCase naming (e.g., <code>onClick</code> instead of onclick).</p>

        <p><strong>Event Handlers:</strong> Functions that respond to events.</p>
        <ul>
          <li>In class components: Methods defined on the class</li>
          <li>In functional components: Functions defined within the component</li>
        </ul>

        <p><strong>Binding:</strong> In class components, handlers need to be bound to the component instance.</p>

        <p><strong>Synthetic Events:</strong> React's cross-browser wrapper around the browser's native event.</p>
        
        <div class="code-example">
          <pre><code>// Event handling in Class Component
class Toggle extends React.Component {
  constructor(props) {
    super(props);
    this.state = { isOn: false };
    
    // Binding necessary to make 'this' work in the callback
    this.handleClick = this.handleClick.bind(this);
  }
  
  handleClick(event) {
    this.setState(state => ({
      isOn: !state.isOn
    }));
  }
  
  render() {
    return (
      &lt;button onClick={this.handleClick}&gt;
        {this.state.isOn ? 'ON' : 'OFF'}
      &lt;/button&gt;
    );
  }
}

// Alternative binding approach with class fields syntax
class ModernToggle extends React.Component {
  state = { isOn: false };
  
  // Arrow function automatically binds 'this'
  handleClick = (event) => {
    this.setState(state => ({
      isOn: !state.isOn
    }));
  }
  
  render() {
    return (
      &lt;button onClick={this.handleClick}&gt;
        {this.state.isOn ? 'ON' : 'OFF'}
      &lt;/button&gt;
    );
  }
}

// Event handling in Functional Component
function FunctionalToggle() {
  const [isOn, setIsOn] = useState(false);
  
  const handleClick = () => {
    setIsOn(!isOn);
  };
  
  return (
    &lt;button onClick={handleClick}&gt;
      {isOn ? 'ON' : 'OFF'}
    &lt;/button&gt;
  );
}</code></pre>
        </div>

        <h4>5. Conditional Rendering and Lists</h4>
        <p>React enables dynamic UI rendering based on conditions and data:</p>

        <p><strong>Conditional Rendering Approaches:</strong></p>
        <ul>
          <li>If/else statements</li>
          <li>Ternary expressions <code>condition ? true : false</code></li>
          <li>Logical AND operator <code>condition && expression</code></li>
          <li>Switch statements for multiple conditions</li>
          <li>Immediately-invoked function expressions (IIFEs)</li>
        </ul>

        <p><strong>Rendering Lists:</strong></p>
        <ul>
          <li>Use <code>Array.map()</code> to transform data into JSX elements</li>
          <li>Each item in a list should have a unique <code>key</code> prop</li>
          <li>Keys help React identify which items have changed, been added, or removed</li>
        </ul>
        
        <div class="code-example">
          <pre><code>// Conditional Rendering
function UserGreeting({ user, isLoggedIn }) {
  // Approach 1: If/else
  if (!isLoggedIn) {
    return &lt;p&gt;Please log in to continue.&lt;/p&gt;;
  }
  
  // Approach 2: Ternary operator
  return (
    &lt;div&gt;
      &lt;h1&gt;{isLoggedIn ? \`&lt;Welcome back, \${user.name}!&gt;\` : '&lt;Welcome, Guest!&gt;' }&lt;/h1&gt;
      
      {/* Approach 3: Logical AND */}
      {user.isAdmin &amp;&amp; &lt;p&gt;Admin dashboard access&lt;/p&gt;}
    &lt;/div&gt;
  );
}

// Rendering Lists
function TodoList({ todos }) {
  return (
    &lt;ul&gt;
      {todos.map(todo =&gt; (
        &lt;li key={todo.id}&gt;
          {todo.title}
          {todo.isCompleted &amp;&amp; ' ✓'}
        &lt;/li&gt;
      ))}
    &lt;/ul&gt;
  );
}

// Usage
function App() {
  const todos = [
    { id: 1, title: 'Learn React', isCompleted: true },
    { id: 2, title: 'Build a project', isCompleted: false },
    { id: 3, title: 'Deploy to production', isCompleted: false }
  ];
  
  return (
    &lt;div&gt;
      &lt;UserGreeting 
        user={{ name: 'Alice', isAdmin: true }} 
        isLoggedIn={true} 
      /&gt;
      &lt;TodoList todos={todos} /&gt;
    &lt;/div&gt;
  );
}</code></pre>
        </div>
        
        <div class="interview-tip">
          <p><span class="interview-icon">🎯</span> <strong>Interview Focus:</strong> These fundamentals are essential for any React interview. Be prepared to explain the component lifecycle, the difference between props and state, and how to efficiently render lists with keys.</p>
          <p>Common interview questions include:</p>
          <ul>
            <li>"What is the difference between state and props?"</li>
            <li>"Explain the component lifecycle in React"</li>
            <li>"Why is it important to use keys when rendering lists?"</li>
            <li>"How do you handle events in React?"</li>
            <li>"What is JSX and how does it work?"</li>
          </ul>
        </div>
      `,
          codeExample: `// Advanced React Component with Props, State, and Events
import React, { Component } from 'react';
import PropTypes from 'prop-types';

class ProductCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      quantity: 1,
      inCart: false,
      expanded: false
    };
  }
  
  handleQuantityChange = (e) => {
    const value = parseInt(e.target.value, 10);
    if (!isNaN(value) && value > 0) {
      this.setState({ quantity: value });
    }
  }
  
  addToCart = () => {
    const { product, onAddToCart } = this.props;
    const { quantity } = this.state;
    
    // Call parent handler with product and quantity
    onAddToCart(product.id, quantity);
    
    this.setState({ 
      inCart: true,
      expanded: false
    });
    
    // Reset cart status after 3 seconds
    setTimeout(() => {
      this.setState({ inCart: false });
    }, 3000);
  }
  
  toggleDetails = () => {
    this.setState(prevState => ({
      expanded: !prevState.expanded
    }));
  }
  
  render() {
    const { product, currency } = this.props;
    const { quantity, inCart, expanded } = this.state;
    
    return (
      <div className="product-card">
        <img 
          src={product.imageUrl} 
          alt={product.name} 
          className="product-image"
        />
        
        <div className="product-info">
          <h3>{product.name}</h3>
          <p className="price">
            {currency}{product.price.toFixed(2)}
            {product.discounted && <span className="discount-badge">SALE</span>}
          </p>
          
          {/* Conditional rendering for expanded details */}
          {expanded && (
            <div className="product-details">
              <p>{product.description}</p>
              <ul>
                {product.features.map((feature, index) => (
                  <li key={index}>{feature}</li>
                ))}
              </ul>
            </div>
          )}
          
          <button 
            className="details-button"
            onClick={this.toggleDetails}
          >
            {expanded ? 'Hide Details' : 'Show Details'}
          </button>
        </div>
        
        <div className="product-actions">
          <input
            type="number"
            min="1"
            value={quantity}
            onChange={this.handleQuantityChange}
            disabled={inCart}
          />
          
          <button
            className={inCart ? 'in-cart' : 'add-to-cart'}
            onClick={this.addToCart}
            disabled={!product.inStock || inCart}
          >
            {!product.inStock 
              ? 'Out of Stock' 
              : inCart 
                ? 'Added to Cart!' 
                : 'Add to Cart'
            }
          </button>
        </div>
      </div>
    );
  }
}

ProductCard.propTypes = {
  product: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    imageUrl: PropTypes.string.isRequired,
    inStock: PropTypes.bool.isRequired,
    discounted: PropTypes.bool,
    features: PropTypes.arrayOf(PropTypes.string)
  }).isRequired,
  currency: PropTypes.string,
  onAddToCart: PropTypes.func.isRequired
};

ProductCard.defaultProps = {
  currency: '$',
};

export default ProductCard;`,
          exercise: {
            instructions:
              'Create a React Task List component that demonstrates: (1) Component structure with functional components, (2) Props for passing data, (3) State for tracking task completion, (4) Event handling for adding/completing tasks, (5) Conditional rendering for completed vs pending tasks.',
          },
        },
        {
          title: 'State Management and Data Flow (5 Key Concepts)',
          explanation: `
        <p>These five concepts focus on managing data and state across your React application:</p>

        <h4>6. React Hooks</h4>
        <p>Hooks allow functional components to use state and other React features previously only available in class components:</p>

        <p><strong>Core Hooks:</strong></p>
        <ul>
          <li><code>useState</code>: Adds state to functional components</li>
          <li><code>useEffect</code>: Performs side effects (similar to lifecycle methods)</li>
          <li><code>useContext</code>: Subscribes to React context</li>
          <li><code>useReducer</code>: Alternative to useState for complex state logic</li>
          <li><code>useRef</code>: Creates a mutable reference that persists across renders</li>
        </ul>

        <p><strong>Rules of Hooks:</strong></p>
        <ul>
          <li>Only call hooks at the top level (not inside loops, conditions, or nested functions)</li>
          <li>Only call hooks from React function components or custom hooks</li>
        </ul>

        <p><strong>Hooks with Dependencies:</strong> Some hooks accept a dependency array to control when they run.</p>
        
        <div class="code-example">
          <pre><code>import React, { useState, useEffect, useRef } from 'react';

function UserProfile({ userId }) {
  // State hook
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  
  // Ref hook
  const prevUserIdRef = useRef();
  
  // Effect hook with dependencies
  useEffect(() => {
    // Only fetch if userId changed
    if (prevUserIdRef.current !== userId) {
      setLoading(true);
      
      fetch(\`/api/users/\${userId}\`)
        .then(response => response.json())
        .then(data => {
          setUser(data);
          setLoading(false);
        });
    }
    
    // Update the ref
    prevUserIdRef.current = userId;
  }, [userId]); // This effect depends on userId
  
  // Cleanup effect (equivalent to componentWillUnmount)
  useEffect(() => {
    return () => {
      console.log('Component unmounting, cleanup here');
    };
  }, []);
  
  if (loading) return &lt;div&gt;Loading...&lt;/div&gt;;
  if (!user) return &lt;div&gt;User not found&lt;/div&gt;;
  
  return (
    &lt;div&gt;
      &lt;h2&gt;{user.name}&lt;/h2&gt;
      &lt;p&gt;Email: {user.email}&lt;/p&gt;
    &lt;/div&gt;
  );
}</code></pre>
        </div>

        <h4>7. Custom Hooks</h4>
        <p>Custom Hooks allow you to extract component logic into reusable functions:</p>

        <p><strong>Creating Custom Hooks:</strong></p>
        <ul>
          <li>Start function name with "use" (e.g., <code>useCustomHook</code>)</li>
          <li>Can call other hooks inside</li>
          <li>Return values that components can use</li>
        </ul>

        <p><strong>Benefits:</strong></p>
        <ul>
          <li>Reuse stateful logic between components</li>
          <li>Separate concerns for cleaner components</li>
          <li>Create composable and specialized tools</li>
        </ul>
        
        <div class="code-example">
          <pre><code>// Custom hook for form handling
function useForm(initialValues = {}) {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues({
      ...values,
      [name]: value
    });
  };
  
  // Reset form to initial values
  const resetForm = () => {
    setValues(initialValues);
    setErrors({});
  };
  
  // Validate form fields
  const validate = (validationSchema) => {
    const newErrors = {};
    Object.keys(validationSchema).forEach(field => {
      const value = values[field] || '';
      const fieldErrors = validationSchema[field]
        .filter(rule => !rule.test(value))
        .map(rule => rule.message);
      
      if (fieldErrors.length > 0) {
        newErrors[field] = fieldErrors[0];
      }
    });
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  return {
    values,
    errors,
    isSubmitting,
    setIsSubmitting,
    handleChange,
    resetForm,
    validate
  };
}

// Using the custom hook
function SignupForm() {
  const {
    values,
    errors,
    isSubmitting,
    setIsSubmitting,
    handleChange,
    resetForm,
    validate
  } = useForm({
    username: '',
    email: '',
    password: ''
  });
  
  const validationSchema = {
    username: [
      { test: value => value.length > 0, message: 'Username is required' }
    ],
    email: [
      { test: value => value.length > 0, message: 'Email is required' },
      { test: value => /^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/.test(value), message: 'Email is invalid' }
    ],
    password: [
      { test: value => value.length >= 8, message: 'Password must be at least 8 characters' }
    ]
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (validate(validationSchema)) {
      setIsSubmitting(true);
      try {
        // API call to sign up user
        await signupUser(values);
        resetForm();
        alert('Signup successful!');
      } catch (error) {
        console.error('Signup failed', error);
      } finally {
        setIsSubmitting(false);
      }
    }
  };
  
  return (
    &lt;form onSubmit={handleSubmit}&gt;
      &lt;div&gt;
        &lt;label&gt;Username&lt;/label&gt;
        &lt;input
          type="text"
          name="username"
          value={values.username}
          onChange={handleChange}
        /&gt;
        {errors.username && &lt;p className="error"&gt;{errors.username}&lt;/p&gt;}
      &lt;/div&gt;
      
      { /* Other fields similar to above */ }
      
      &lt;button type="submit" disabled={isSubmitting}&gt;
        {isSubmitting ? 'Submitting...' : 'Sign Up'}
      &lt;/button&gt;
    &lt;/form&gt;
  );
}</code></pre>
        </div>

        <h4>8. Context API</h4>
        <p>Context provides a way to pass data through the component tree without having to pass props down manually at every level:</p>

        <p><strong>Creating Context:</strong></p>
        <ul>
          <li><code>React.createContext(defaultValue)</code> creates a new context</li>
          <li>Returns <code>{ Provider, Consumer }</code> components</li>
        </ul>

        <p><strong>Provider and Consumer:</strong></p>
        <ul>
          <li><code>Provider</code> component makes data available to all nested components</li>
          <li><code>Consumer</code> component lets components subscribe to context changes</li>
          <li>The <code>useContext</code> hook simplifies consuming context in functional components</li>
        </ul>

        <p><strong>Common Use Cases:</strong></p>
        <ul>
          <li>User authentication/authorization</li>
          <li>Theme settings</li>
          <li>Language/localization preferences</li>
          <li>Global application state</li>
        </ul>
        
        <div class="code-example">
          <pre><code>// Creating a theme context
const ThemeContext = React.createContext({
  theme: 'light',
  toggleTheme: () => {}
});

// Provider component
function ThemeProvider({ children }) {
  const [theme, setTheme] = useState('light');
  
  const toggleTheme = () => {
    setTheme(prevTheme => prevTheme === 'light' ? 'dark' : 'light');
  };
  
  const value = {
    theme,
    toggleTheme
  };
  
  return (
    &lt;ThemeContext.Provider value={value}&gt;
      {children}
    &lt;/ThemeContext.Provider&gt;
  );
}

// Consumer with useContext hook
function ThemedButton() {
  const { theme, toggleTheme } = useContext(ThemeContext);
  
  return (
    &lt;button
      onClick={toggleTheme}
      style={{
        backgroundColor: theme === 'light' ? '#fff' : '#333',
        color: theme === 'light' ? '#333' : '#fff',
      }}
    &gt;
      Toggle Theme
    &lt;/button&gt;
  );
}

// Consumer with render props (older approach)
function ThemedHeader() {
  return (
    &lt;ThemeContext.Consumer&gt;
      {({ theme }) => (
        &lt;header className={\`header-\${theme}\`}&gt;
          &lt;h1&gt;My App&lt;/h1&gt;
        &lt;/header&gt;
      )}
    &lt;/ThemeContext.Consumer&gt;
  );
}

// App with provider
function App() {
  return (
    &lt;ThemeProvider&gt;
      &lt;div className="app"&gt;
        &lt;ThemedHeader /&gt;
        &lt;main&gt;
          &lt;p&gt;Some content&lt;/p&gt;
          &lt;ThemedButton /&gt;
        &lt;/main&gt;
      &lt;/div&gt;
    &lt;/ThemeProvider&gt;
  );
}</code></pre>
        </div>

        <h4>9. Redux and State Management Libraries</h4>
        <p>Redux is a predictable state container for JavaScript apps, commonly used with React:</p>

        <p><strong>Core Redux Concepts:</strong></p>
        <ul>
          <li><code>Store</code>: Holds the application state</li>
          <li><code>Actions</code>: Plain objects describing what happened</li>
          <li><code>Reducers</code>: Pure functions that specify how state changes in response to actions</li>
          <li><code>Dispatch</code>: Method to send actions to the store</li>
          <li><code>Selectors</code>: Functions that extract specific pieces of state</li>
        </ul>

        <p><strong>Redux Toolkit:</strong> Official recommended approach for writing Redux logic, simplifying standard Redux patterns.</p>

        <p><strong>Alternative State Management:</strong></p>
        <ul>
          <li>MobX: Reactive state management</li>
          <li>Recoil: Facebook's experimental state management library</li>
          <li>Zustand: Simplified state management</li>
          <li>Jotai: Primitive and flexible state management</li>
        </ul>
        
        <div class="code-example">
          <pre><code>// Redux basics with Redux Toolkit
import { createSlice, configureStore } from '@reduxjs/toolkit';
import { Provider, useSelector, useDispatch } from 'react-redux';

// Create a slice (combines actions and reducers)
const counterSlice = createSlice({
  name: 'counter',
  initialState: {
    value: 0
  },
  reducers: {
    increment: state => {
      state.value += 1;
    },
    decrement: state => {
      state.value -= 1;
    },
    incrementByAmount: (state, action) => {
      state.value += action.payload;
    }
  }
});

// Extract action creators
const { increment, decrement, incrementByAmount } = counterSlice.actions;

// Create store
const store = configureStore({
  reducer: {
    counter: counterSlice.reducer
  }
});

// React component using Redux
function Counter() {
  // Access state with useSelector
  const count = useSelector(state => state.counter.value);
  // Get dispatch function
  const dispatch = useDispatch();
  
  return (
    &lt;div&gt;
      &lt;button onClick={() => dispatch(decrement())}&gt;-&lt;/button&gt;
      &lt;span&gt;{count}&lt;/span&gt;
      &lt;button onClick={() => dispatch(increment())}&gt;+&lt;/button&gt;
      &lt;button onClick={() => dispatch(incrementByAmount(5))}&gt;+5&lt;/button&gt;
    &lt;/div&gt;
  );
}

// Wrap app with Provider
function App() {
  return (
    &lt;Provider store={store}&gt;
      &lt;Counter /&gt;
    &lt;/Provider&gt;
  );
}</code></pre>
        </div>

        <h4>10. Prop Drilling and State Lifting</h4>
        <p>Understanding data flow patterns in React is crucial for effective component design:</p>

        <p><strong>Prop Drilling:</strong> Passing props through multiple levels of components that don't need the data but only pass it down.</p>
        <ul>
          <li>Problem: Makes components tightly coupled</li>
          <li>Can lead to maintenance issues</li>
          <li>Solutions: Context API, state management libraries, composition</li>
        </ul>

        <p><strong>Lifting State Up:</strong> Moving shared state to the closest common ancestor.</p>
        <ul>
          <li>Centralizes state management</li>
          <li>Enables multiple components to share and update the same data</li>
          <li>Maintains single source of truth</li>
        </ul>

        <p><strong>Component Composition:</strong> Using children props or render props to avoid prop drilling.</p>
        
        <div class="code-example">
          <pre><code>// Problem: Prop Drilling
function App() {
  const [user, setUser] = useState({ name: 'Alice', theme: 'dark' });
  
  return (
    &lt;div&gt;
      &lt;Header user={user} /&gt;
      &lt;Main user={user} /&gt;
      &lt;Footer user={user} /&gt;
    &lt;/div&gt;
  );
}

function Header({ user }) {
  // Only needs user.name, but receives entire user object
  return &lt;header&gt;Welcome, {user.name}&lt;/header&gt;;
}

function Main({ user }) {
  // Only passing user to Profile
  return (
    &lt;main&gt;
      &lt;Sidebar /&gt;
      &lt;Content&gt;
        &lt;Profile user={user} /&gt;
      &lt;/Content&gt;
    &lt;/main&gt;
  );
}

function Profile({ user }) {
  // Finally uses user.theme
  return &lt;div className={user.theme}&gt;Profile content&lt;/div&gt;;
}

// Solution 1: Context API
const UserContext = React.createContext(null);

function ImprovedApp() {
  const [user, setUser] = useState({ name: 'Alice', theme: 'dark' });
  
  return (
    &lt;UserContext.Provider value={user}&gt;
      &lt;div&gt;
        &lt;ImprovedHeader /&gt;
        &lt;ImprovedMain /&gt;
        &lt;ImprovedFooter /&gt;
      &lt;/div&gt;
    &lt;/UserContext.Provider&gt;
  );
}

function ImprovedProfile() {
  const user = useContext(UserContext);
  return &lt;div className={user.theme}&gt;Profile content&lt;/div&gt;;
}

// Solution 2: Lifting State Up
function ParentForm() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  
  const handleNameChange = (newName) => {
    setName(newName);
  };
  
  const handleEmailChange = (newEmail) => {
    setEmail(newEmail);
  };
  
  return (
    &lt;form&gt;
      &lt;NameInput name={name} onNameChange={handleNameChange} /&gt;
      &lt;EmailInput email={email} onEmailChange={handleEmailChange} /&gt;
      &lt;Summary name={name} email={email} /&gt;
    &lt;/form&gt;
  );
}

function NameInput({ name, onNameChange }) {
  return (
    &lt;div&gt;
      &lt;label&gt;Name:&lt;/label&gt;
      &lt;input
        type="text"
        value={name}
        onChange={(e) => onNameChange(e.target.value)}
      /&gt;
    &lt;/div&gt;
  );
}</code></pre>
        </div>
        
        <div class="interview-tip">
          <p><span class="interview-icon">🎯</span> <strong>Interview Focus:</strong> State management is a critical area in React interviews. Be prepared to discuss when to use local component state versus global state solutions, and demonstrate understanding of data flow in React.</p>
          <p>Common interview questions include:</p>
          <ul>
            <li>"When would you use Context API versus Redux?"</li>
            <li>"How do React Hooks work and what problems do they solve?"</li>
            <li>"What are custom hooks and how do you create one?"</li>
            <li>"Explain the concept of lifting state up in React"</li>
            <li>"How would you solve prop drilling issues in a deeply nested component tree?"</li>
          </ul>
        </div>
      `,
          codeExample: `// Theme and Authentication Context with Custom Hooks
import React, { createContext, useState, useContext, useEffect } from 'react';

// Create contexts
const ThemeContext = createContext();
const AuthContext = createContext();

// Custom hooks for using the contexts
function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}

function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

// Theme Provider component
function ThemeProvider({ children }) {
  const [theme, setTheme] = useState(() => {
    // Try to get theme from localStorage
    const savedTheme = localStorage.getItem('theme');
    return savedTheme || 'light';
  });
  
  // Update localStorage when theme changes
  useEffect(() => {
    localStorage.setItem('theme', theme);
  }, [theme]);
  
  // Toggle between light and dark themes
  const toggleTheme = () => {
    setTheme(prevTheme => prevTheme === 'light' ? 'dark' : 'light');
  };
  
  const value = { theme, toggleTheme };
  
  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
}

// Auth Provider component
function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  
  // Check for existing session on mount
  useEffect(() => {
    async function loadUserFromSession() {
      try {
        const token = localStorage.getItem('authToken');
        if (token) {
          // Fetch user data with the token
          const userData = await fetchUserData(token);
          setUser(userData);
        }
      } catch (error) {
        console.error('Failed to load user session', error);
        localStorage.removeItem('authToken');
      } finally {
        setLoading(false);
      }
    }
    
    loadUserFromSession();
  }, []);
  
  // Login function
  const login = async (credentials) => {
    setLoading(true);
    try {
      const { token, user } = await loginApi(credentials);
      localStorage.setItem('authToken', token);
      setUser(user);
      return user;
    } catch (error) {
      throw error;
    } finally {
      setLoading(false);
    }
  };
  
  // Logout function
  const logout = () => {
    localStorage.removeItem('authToken');
    setUser(null);
  };
  
  const value = {
    user,
    loading,
    login,
    logout,
    isAuthenticated: !!user
  };
  
  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

// Combined providers
function AppProviders({ children }) {
  return (
    <AuthProvider>
      <ThemeProvider>
        {children}
      </ThemeProvider>
    </AuthProvider>
  );
}

// Mock API functions
async function loginApi(credentials) {
  // Simulate API call
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        token: 'mock-jwt-token',
        user: {
          id: 1,
          name: 'John Doe',
          email: credentials.email,
          role: 'user'
        }
      });
    }, 1000);
  });
}

async function fetchUserData(token) {
  // Simulate API call with token
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        id: 1,
        name: 'John Doe',
        email: 'john@example.com',
        role: 'user'
      });
    }, 1000);
  });
}

// Example usage in components
function ThemedButton() {
  const { theme, toggleTheme } = useTheme();
  return (
    <button 
      onClick={toggleTheme}
      className={\`btn btn-\${theme}\`}
    >
      Toggle to {theme === 'light' ? 'Dark' : 'Light'} Mode
    </button>
  );
}

function UserProfile() {
  const { user, logout } = useAuth();
  const { theme } = useTheme();
  
  if (!user) return <div>Please log in</div>;
  
  return (
    <div className={\`profile profile-\${theme}\`}>
      <h2>{user.name}</h2>
      <p>{user.email}</p>
      <button onClick={logout}>Logout</button>
    </div>
  );
}

// App with providers
function App() {
  return (
    <AppProviders>
      <div className="app">
        <ThemedButton />
        <UserProfile />
      </div>
    </AppProviders>
  );
}

export { App, useAuth, useTheme };`,
          exercise: {
            instructions:
              'Create a shopping cart system with React context that demonstrates: (1) Using Context API to manage cart state, (2) Custom hook for cart operations (add/remove/update), (3) Persisting cart data in localStorage, (4) Displaying cart items and total amount in different components without prop drilling.',
          },
        },
        {
          title: 'Advanced React Patterns and TypeScript (5 Key Concepts)',
          explanation: `
        <p>These five concepts focus on advanced React patterns and TypeScript integration for robust applications:</p>

        <h4>11. TypeScript with React</h4>
        <p>TypeScript adds static typing to JavaScript, enhancing React development with better tooling and type safety:</p>

        <p><strong>Typing Props and State:</strong></p>
        <ul>
          <li>Defining interfaces/types for props</li>
          <li>Generic types for state</li>
          <li>Type definitions for event handlers</li>
        </ul>

        <p><strong>React.FC vs. Function Components:</strong></p>
        <ul>
          <li><code>React.FC</code> implicitly includes children prop</li>
          <li>Function declaration with explicit return type often preferred</li>
        </ul>

        <p><strong>Generic Components:</strong> Creating reusable components that work with various data types.</p>

        <p><strong>Type Assertions:</strong> Sometimes necessary when TypeScript can't infer types.</p>
        
        <div class="code-example">
          <pre><code>import React, { useState, ChangeEvent, FormEvent } from 'react';

// Interface for props
interface UserProfileProps {
  user: User;
  onUpdate: (user: User) => void;
  isEditable?: boolean;
}

// Interface for a data model
interface User {
  id: number;
  name: string;
  email: string;
  role: 'admin' | 'user' | 'guest'; // Union type for limited options
  settings?: UserSettings; // Optional property
}

interface UserSettings {
  theme: 'light' | 'dark';
  notifications: boolean;
}

// Function component with TypeScript
const UserProfile: React.FC<UserProfileProps> = ({ 
  user, 
  onUpdate, 
  isEditable = false // Default value
}) => {
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [formData, setFormData] = useState<User>(user);
  
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };
  
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onUpdate(formData);
    setIsEditing(false);
  };
  
  if (!isEditable || !isEditing) {
    return (
      &lt;div className="user-profile"&gt;
        &lt;h2&gt;{user.name}&lt;/h2&gt;
        &lt;p&gt;Email: {user.email}&lt;/p&gt;
        &lt;p&gt;Role: {user.role}&lt;/p&gt;
        {isEditable &amp;&amp; (
          &lt;button onClick={() =&gt; setIsEditing(true)}&gt;Edit Profile&lt;/button&gt;
        )}
      &lt;/div&gt;
    );
  }
  
  return (
    &lt;form onSubmit={handleSubmit}&gt;
      &lt;div&gt;
        &lt;label htmlFor="name"&gt;Name:&lt;/label&gt;
        &lt;input
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
        /&gt;
      &lt;/div&gt;
      &lt;div&gt;
        &lt;label htmlFor="email"&gt;Email:&lt;/label&gt;
        &lt;input
          id="email"
          name="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
          required
        /&gt;
      &lt;/div&gt;
      &lt;button type="submit"&gt;Save Changes&lt;/button&gt;
      &lt;button type="button" onClick={() =&gt; setIsEditing(false)}&gt;
        Cancel
      &lt;/button&gt;
    &lt;/form&gt;
  );
};

// Generic component example
interface ListProps<T> {
  items: T[];
  renderItem: (item: T) => React.ReactNode;
}

function List<T>({ items, renderItem }: ListProps<T>) {
  return (
    &lt;ul&gt;
      {items.map((item, index) => (
        &lt;li key={index}&gt;{renderItem(item)}&lt;/li&gt;
      ))}
    &lt;/ul&gt;
  );
}

// Usage of the generic component
const UserList = () => {
  const users: User[] = [
    { id: 1, name: 'Alice', email: 'alice@example.com', role: 'admin' },
    { id: 2, name: 'Bob', email: 'bob@example.com', role: 'user' }
  ];
  
  return (
    &lt;List
      items={users}
      renderItem={(user) => &lt;span&gt;{user.name} ({user.email})&lt;/span&gt;}
    /&gt;
  );
};</code></pre>
        </div>

        <h4>12. Higher-Order Components (HOCs)</h4>
        <p>Higher-Order Components are functions that take a component and return a new component with enhanced functionality:</p>

        <p><strong>HOC Pattern:</strong></p>
        <ul>
          <li>Function that accepts a component and returns a new enhanced component</li>
          <li>Useful for cross-cutting concerns (e.g., logging, authentication)</li>
          <li>Follows the principle of composition</li>
        </ul>

        <p><strong>Common Uses:</strong></p>
        <ul>
          <li>Authentication/authorization checks</li>
          <li>Data fetching and loading states</li>
          <li>Code reuse across components</li>
          <li>Tracking analytics</li>
        </ul>

        <p><strong>Downsides:</strong></p>
        <ul>
          <li>Can lead to "wrapper hell" if overused</li>
          <li>May obscure component props</li>
        </ul>
        
        <div class="code-example">
          <pre><code>// Higher-Order Component for authentication
import React from 'react';
import { Redirect } from 'react-router-dom';

// HOC function
function withAuth<P>(WrappedComponent: React.ComponentType<P>) {
  // Return a new component
  return function WithAuth(props: P & JSX.IntrinsicAttributes) {
    const isAuthenticated = checkAuth(); // Function to check authentication status
    
    if (!isAuthenticated) {
      // Redirect if not authenticated
      return &lt;Redirect to=&quot;/login&quot; /&gt;;
    }
    
    // Render the wrapped component with all props
    return &lt;WrappedComponent {...props} /&gt;;
  };
}

// HOC for adding loading state
function withLoader<P>(WrappedComponent: React.ComponentType<P>, loadingMessage: string = 'Loading...') {
  return function WithLoader({ isLoading, ...props }: { isLoading: boolean } & P) {
    return (
      <div>
        {isLoading ? (
          &lt;div className=&quot;loader&quot;&gt;
            &lt;p&gt;{loadingMessage}&lt;/p&gt;
          &lt;/div&gt;
        ) : (
          <WrappedComponent {...props} />
        )}
      </div>
    );
  };
}

// Using multiple HOCs
function UserDashboard(props: { userData: any }) {
  return (
    &lt;div className="dashboard"&gt;
      &lt;h1&gt;Welcome, {props.userData.name}&lt;/h1&gt;
      &lt;!-- Dashboard content --&gt;
    &lt;/div&gt;
  );
}

// Compose HOCs
const AuthenticatedUserDashboard = withAuth(
  withLoader(UserDashboard)
);

// Usage
function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [userData, setUserData] = useState(null);
  
  useEffect(() => {
    fetchUserData()
      .then(data => {
        setUserData(data);
        setIsLoading(false);
      });
  }, []);
  
  return (
    &lt;AuthenticatedUserDashboard 
      isLoading={isLoading}
      userData={userData}
    /&gt;
  );
}</code></pre>
        </div>

        <h4>13. Render Props Pattern</h4>
        <p>Render Props is a technique where a component accepts a function prop that returns a React element, giving control over what is rendered:</p>

        <p><strong>Render Props Pattern:</strong></p>
        <ul>
          <li>Component accepts a function as a prop</li>
          <li>Function is called inside the component's render method</li>
          <li>Pass dynamic data to the function</li>
        </ul>

        <p><strong>Variants:</strong></p>
        <ul>
          <li>Using a prop named <code>render</code></li>
          <li>Using <code>children</code> as a function</li>
        </ul>

        <p><strong>Benefits:</strong></p>
        <ul>
          <li>Shares stateful logic between components</li>
          <li>More explicit than HOCs</li>
          <li>Avoids prop name collisions</li>
        </ul>
        
        <div class="code-example">
          <pre><code>// Render props pattern for mouse position tracking
import React, { useState, useEffect } from 'react';

interface MousePosition {
  x: number;
  y: number;
}

interface MouseTrackerProps {
  render: (mousePosition: MousePosition) => React.ReactNode;
}

function MouseTracker({ render }: MouseTrackerProps) {
  const [mousePosition, setMousePosition] = useState<MousePosition>({ x: 0, y: 0 });
  
  const handleMouseMove = (event: MouseEvent) => {
    setMousePosition({
      x: event.clientX,
      y: event.clientY
    });
  };
  
  useEffect(() => {
    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);
  
  // Call the render prop function with current state
  return &lt;&gt;{render(mousePosition)}&lt;/&gt;;
}

// Variant with children as a function
interface MouseTrackerChildrenProps {
  children: (mousePosition: MousePosition) => React.ReactNode;
}

function MouseTrackerWithChildren({ children }: MouseTrackerChildrenProps) {
  const [mousePosition, setMousePosition] = useState<MousePosition>({ x: 0, y: 0 });
  
  // ... same implementation as above
  
  // Call children as a function
  return &lt;&gt;{children(mousePosition)}&lt;/&gt;;
}

// Usage with render prop
function App() {
  return (
    &lt;div&gt;
      &lt;h1&gt;Mouse Tracker&lt;/h1&gt;
      &lt;MouseTracker
        render={mouse =&gt; (
          &lt;p&gt;
            The mouse position is ({mouse.x}, {mouse.y})
          &lt;/p&gt;
        )}
      /&gt;
      
      &lt;!-- Alternative with children as function --&gt;
      &lt;MouseTrackerWithChildren&gt;
        {mouse =&gt; (
          &lt;div style={{ 
            position: 'absolute', 
            left: mouse.x, 
            top: mouse.y,
            width: 10,
            height: 10,
            background: 'red',
            borderRadius: '50%'
          }} /&gt;
        )}
      &lt;/MouseTrackerWithChildren&gt;
    &lt;/div&gt;
  );
}</code></pre>
        </div>

        <h4>14. Error Boundaries</h4>
        <p>Error Boundaries are React components that catch JavaScript errors in their child component tree and display fallback UI:</p>

        <p><strong>Key Features:</strong></p>
        <ul>
          <li>Catch errors during rendering, in lifecycle methods, and in constructors</li>
          <li>Do not catch errors in event handlers, async code, or server-side rendering</li>
          <li>Only class components can be error boundaries</li>
        </ul>

        <p><strong>Required Methods:</strong></p>
        <ul>
          <li><code>static getDerivedStateFromError()</code>: Update state to render fallback UI</li>
          <li><code>componentDidCatch()</code>: Log error information</li>
        </ul>

        <p><strong>Best Practices:</strong></p>
        <ul>
          <li>Place boundaries strategically to avoid entire app crashes</li>
          <li>Provide meaningful error messages</li>
          <li>Consider recovery options</li>
        </ul>
        
        <div class="code-example">
          <pre><code>import React, { Component, ErrorInfo } from 'react';

interface ErrorBoundaryProps {
  fallback?: React.ReactNode;
  onError?: (error: Error, errorInfo: ErrorInfo) => void;
  children: React.ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
}

class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = {
      hasError: false,
      error: null
    };
  }
  
  // Update state when error occurs
  static getDerivedStateFromError(error: Error) {
    return {
      hasError: true,
      error
    };
  }
  
  // Log error details
  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Error caught by boundary:', error, errorInfo);
    
    // Call optional onError handler
    if (this.props.onError) {
      this.props.onError(error, errorInfo);
    }
    
    // In production, you might log to an error reporting service
    // logErrorToService(error, errorInfo);
  }
  
  render() {
    if (this.state.hasError) {
      // Render fallback UI if provided
      if (this.props.fallback) {
        return this.props.fallback;
      }
      
      // Default fallback UI
      return (
        &lt;div className=&quot;error-boundary&quot;&gt;
          &lt;h2&gt;Something went wrong.&lt;/h2&gt;
          &lt;details&gt;
            &lt;summary&gt;Error Details&lt;/summary&gt;
            &lt;p&gt;{this.state.error?.toString()}&lt;/p&gt;
          &lt;/details&gt;
          &lt;button onClick={() =&gt; this.setState({ hasError: false, error: null })}&gt;
            Try Again
          &lt;/button&gt;
        &lt;/div&gt;
      );
    }
    
    // When no error, render children normally
    return this.props.children;
  }
}

// Component that might throw an error
function BuggyCounter() {
  const [counter, setCounter] = useState(0);
  
  const handleClick = () => {
    setCounter(prevCounter => prevCounter + 1);
  };
  
  // This will cause an error when counter reaches 5
  if (counter === 5) {
    throw new Error('I crashed when counter reached 5!');
  }
  
  return (
    &lt;div&gt;
      &lt;p&gt;Counter: {counter}&lt;/p&gt;
      &lt;button onClick={handleClick}&gt;Increment&lt;/button&gt;
    &lt;/div&gt;
  );
}

// Usage
function App() {
  return (
    &lt;div&gt;
      &lt;h1&gt;Error Boundary Demo&lt;/h1&gt;
      
      &lt;ErrorBoundary 
        onError={(error, info) =&gt; {
          // Send to error tracking service
          console.log('Logging error to service:', error);
        }}
      &gt;
        &lt;BuggyCounter /&gt;
      &lt;/ErrorBoundary&gt;
      
      &lt;ErrorBoundary
        fallback=&lt;div&gt;Custom fallback UI for this section&lt;/div&gt;
      &gt;
        &lt;h2&gt;Another Section&lt;/h2&gt;
        &lt;p&gt;This section has a different error fallback&lt;/p&gt;
      &lt;/ErrorBoundary&gt;
    &lt;/div&gt;
  );
}</code></pre>
        </div>

        <h4>15. React Patterns</h4>
        <p>Advanced React patterns enable flexible and maintainable component design:</p>

        <p><strong>Compound Components:</strong> Multiple components that work together to form a cohesive API.</p>
        <ul>
          <li>Parent component manages shared state</li>
          <li>Child components use context to access state</li>
          <li>Creates more intuitive and flexible composition</li>
        </ul>

        <p><strong>Provider Pattern:</strong> Makes data available to a tree of components.</p>
        <ul>
          <li>Separates data management from presentation</li>
          <li>Reduces prop drilling</li>
        </ul>

        <p><strong>Controlled vs. Uncontrolled Components:</strong></p>
        <ul>
          <li>Controlled: State managed by parent component</li>
          <li>Uncontrolled: State managed internally (often with refs)</li>
        </ul>

        <p><strong>State Initializer Pattern:</strong> Allow users to initialize and reset component state.</p>
        
        <div class="code-example">
          <pre><code>// Compound Components Pattern
import React, { createContext, useContext, useState } from 'react';

// Create context for the tabs
const TabsContext = createContext(null);

// Main container component
function Tabs({ children, defaultIndex = 0 }) {
  const [activeIndex, setActiveIndex] = useState(defaultIndex);
  
  // Context value
  const value = {
    activeIndex,
    setActiveIndex
  };
  
  return (
    &lt;TabsContext.Provider value={value}&gt;
      &lt;div className="tabs-container"&gt;
        {children}
      &lt;/div&gt;
    &lt;/TabsContext.Provider&gt;
  );
}

// Tab List component
function TabList({ children }) {
  return &lt;div className="tabs-list"&gt;{children}&lt;/div&gt;;
}

// Individual Tab component
function Tab({ children, index }) {
  const { activeIndex, setActiveIndex } = useContext(TabsContext);
  const isActive = activeIndex === index;
  
  return (
    &lt;button
      className={\`tab \${isActive ? 'active' : ''}\`}
      onClick={() => setActiveIndex(index)}
    &gt;
      {children}
    &lt;/button&gt;
  );
}

// Tab Panel component
function TabPanel({ children, index }) {
  const { activeIndex } = useContext(TabsContext);
  
  if (activeIndex !== index) {
    return null;
  }
  
  return &lt;div className="tab-panel"&gt;{children}&lt;/div&gt;;
}

// Compose the Tabs components
Tabs.TabList = TabList;
Tabs.Tab = Tab;
Tabs.TabPanel = TabPanel;

// Usage
function App() {
  return (
    &lt;Tabs defaultIndex={0}&gt;
      &lt;Tabs.TabList&gt;
        &lt;Tabs.Tab index={0}&gt;Profile&lt;/Tabs.Tab&gt;
        &lt;Tabs.Tab index={1}&gt;Settings&lt;/Tabs.Tab&gt;
        &lt;Tabs.Tab index={2}&gt;Notifications&lt;/Tabs.Tab&gt;
      &lt;/Tabs.TabList&gt;
      
      &lt;Tabs.TabPanel index={0}&gt;
        &lt;h2&gt;User Profile&lt;/h2&gt;
        &lt;p&gt;Profile content goes here...&lt;/p&gt;
      &lt;/Tabs.TabPanel&gt;
      
      &lt;Tabs.TabPanel index={1}&gt;
        &lt;h2&gt;Settings&lt;/h2&gt;
        &lt;p&gt;Settings content goes here...&lt;/p&gt;
      &lt;/Tabs.TabPanel&gt;
      
      &lt;Tabs.TabPanel index={2}&gt;
        &lt;h2&gt;Notifications&lt;/h2&gt;
        &lt;p&gt;Notifications content goes here...&lt;/p&gt;
      &lt;/Tabs.TabPanel&gt;
    &lt;/Tabs&gt;
  );
}

// State Initializer Pattern
function useStateWithReset(initialState) {
  const [state, setState] = useState(initialState);
  
  const reset = () => {
    setState(initialState);
  };
  
  return [state, setState, reset];
}

// Controlled vs Uncontrolled Components
// Uncontrolled component with ref
function UncontrolledForm() {
  const inputRef = useRef();
  
  const handleSubmit = (e) => {
    e.preventDefault();
    const value = inputRef.current.value;
    console.log('Input value:', value);
  };
  
  return (
    &lt;form onSubmit={handleSubmit}&gt;
      &lt;input ref={inputRef} defaultValue="Default value" /&gt;
      &lt;button type="submit"&gt;Submit&lt;/button&gt;
    &lt;/form&gt;
  );
}

// Controlled component
function ControlledForm() {
  const [value, setValue] = useState('');
  
  const handleChange = (e) => {
    setValue(e.target.value);
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Input value:', value);
  };
  
  return (
    &lt;form onSubmit={handleSubmit}&gt;
      &lt;input value={value} onChange={handleChange} /&gt;
      &lt;button type="submit"&gt;Submit&lt;/button&gt;
    &lt;/form&gt;
  );
}</code></pre>
        </div>
        
        <div class="interview-tip">
          <p><span class="interview-icon">🎯</span> <strong>Interview Focus:</strong> Advanced patterns demonstrate your expertise beyond basic React concepts. Be prepared to discuss TypeScript integration, component composition patterns, and error handling strategies.</p>
          <p>Common interview questions include:</p>
          <ul>
            <li>"What are the benefits of using TypeScript with React?"</li>
            <li>"Explain Higher-Order Components and when you would use them"</li>
            <li>"How do Error Boundaries work in React?"</li>
            <li>"What is the Render Props pattern and how does it compare to HOCs?"</li>
            <li>"Explain the Compound Components pattern with an example"</li>
          </ul>
        </div>
      `,
          codeExample: `// TypeScript Form with Custom Hooks and Error Handling
import React, { useState, useEffect, FormEvent } from 'react';

// Form field type definitions
interface Field<T> {
  value: T;
  error: string | null;
  touched: boolean;
  validators: Array<(value: T) => string | null>;
}

type FormFields<T> = {
  [K in keyof T]: Field<T[K]>;
};

// Form hook that manages form state and validation
function useForm<T extends Record<string, any>>(initialValues: T) {
  // Create initial form state with validators
  const createFormState = (values: T, validators: Partial<Record<keyof T, Array<(value: any) => string | null>>> = {}): FormFields<T> => {
    return Object.keys(values).reduce((acc, key) => {
      const typedKey = key as keyof T;
      return {
        ...acc,
        [key]: {
          value: values[typedKey],
          error: null,
          touched: false,
          validators: validators[typedKey] || []
        }
      };
    }, {}) as FormFields<T>;
  };

  const [formState, setFormState] = useState<FormFields<T>>(createFormState(initialValues));
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isValid, setIsValid] = useState(false);
  
  // Validate a single field
  const validateField = <K extends keyof T>(fieldName: K, value: T[K]): string | null => {
    const field = formState[fieldName];
    
    for (const validator of field.validators) {
      const error = validator(value);
      if (error) {
        return error;
      }
    }
    
    return null;
  };
  
  // Update a field value
  const setFieldValue = <K extends keyof T>(fieldName: K, value: T[K], touch = true) => {
    setFormState(prevState => {
      const error = validateField(fieldName, value);
      
      return {
        ...prevState,
        [fieldName]: {
          ...prevState[fieldName],
          value,
          error,
          touched: touch ? true : prevState[fieldName].touched
        }
      };
    });
  };
  
  // Set field validators
  const setFieldValidators = <K extends keyof T>(
    fieldName: K, 
    validators: Array<(value: T[K]) => string | null>
  ) => {
    setFormState(prevState => {
      const field = prevState[fieldName];
      let error = null;
      
      // Run validators on current value
      for (const validator of validators) {
        error = validator(field.value);
        if (error) break;
      }
      
      return {
        ...prevState,
        [fieldName]: {
          ...field,
          validators,
          error: field.touched ? error : field.error
        }
      };
    });
  };
  
  // Mark field as touched and validate
  const touchField = <K extends keyof T>(fieldName: K) => {
    setFormState(prevState => {
      const field = prevState[fieldName];
      const error = validateField(fieldName, field.value);
      
      return {
        ...prevState,
        [fieldName]: {
          ...field,
          touched: true,
          error
        }
      };
    });
  };
  
  // Validate all fields
  const validateForm = (): boolean => {
    let isValid = true;
    const newFormState = { ...formState };
    
    for (const fieldName in formState) {
      const field = formState[fieldName as keyof T];
      const error = validateField(fieldName as keyof T, field.value);
      
      newFormState[fieldName as keyof T] = {
        ...field,
        error,
        touched: true
      };
      
      if (error) {
        isValid = false;
      }
    }
    
    setFormState(newFormState);
    return isValid;
  };
  
  // Extract values from form state
  const getValues = (): T => {
    return Object.keys(formState).reduce((values, fieldName) => {
      return {
        ...values,
        [fieldName]: formState[fieldName as keyof T].value
      };
    }, {}) as T;
  };
  
  // Reset the form to initial values
  const resetForm = () => {
    setFormState(createFormState(initialValues));
    setIsSubmitting(false);
  };
  
  // Check form validity
  useEffect(() => {
    const valid = Object.values(formState).every(
      field => !field.error && (field.touched || field.validators.length === 0)
    );
    setIsValid(valid);
  }, [formState]);
  
  return {
    formState,
    isValid,
    isSubmitting,
    setIsSubmitting,
    setFieldValue,
    setFieldValidators,
    touchField,
    validateForm,
    getValues,
    resetForm
  };
}

// Common validators
const createValidators = {
  required: (message = 'This field is required') => (value: any) => {
    if (value === undefined || value === null || value === '') {
      return message;
    }
    return null;
  },
  
  minLength: (length: number, message?: string) => (value: string) => {
    if (value && value.length < length) {
      return message || \`Must be at least \${length} characters\`;
    }
    return null;
  },
  
  email: (message = 'Invalid email address') => (value: string) => {
    if (value && !/^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/.test(value)) {
      return message;
    }
    return null;
  },
  
  matches: (pattern: RegExp, message: string) => (value: string) => {
    if (value && !pattern.test(value)) {
      return message;
    }
    return null;
  }
};

// Example usage of the form hook
interface SignupFormData {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
}

const SignupForm: React.FC = () => {
  const initialValues: SignupFormData = {
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
  };
  
  const {
    formState,
    isValid,
    isSubmitting,
    setIsSubmitting,
    setFieldValue,
    setFieldValidators,
    touchField,
    validateForm,
    getValues,
    resetForm
  } = useForm<SignupFormData>(initialValues);
  
  // Set validators
  useEffect(() => {
    setFieldValidators('username', [
      createValidators.required(),
      createValidators.minLength(3)
    ]);
    
    setFieldValidators('email', [
      createValidators.required(),
      createValidators.email()
    ]);
    
    setFieldValidators('password', [
      createValidators.required(),
      createValidators.minLength(8, 'Password must be at least 8 characters'),
      createValidators.matches(
        /^(?=.*[A-Za-z])(?=.*\\d)[A-Za-z\\d@$!%*#?&]{8,}$/,
        'Password must contain at least one letter and one number'
      )
    ]);
    
    setFieldValidators('confirmPassword', [
      createValidators.required('Please confirm your password'),
      (value) => value !== formState.password.value ? 'Passwords do not match' : null
    ]);
  }, [formState.password.value]);
  
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      const values = getValues();
      console.log('Form submitted:', values);
      resetForm();
      alert('Signup successful!');
    } catch (error) {
      console.error('Signup failed:', error);
      alert('Signup failed. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };
  
  return (
    <form onSubmit={handleSubmit} className="signup-form">
      <div className="form-group">
        <label htmlFor="username">Username</label>
        <input
          id="username"
          type="text"
          value={formState.username.value}
          onChange={(e) => setFieldValue('username', e.target.value)}
          onBlur={() => touchField('username')}
          disabled={isSubmitting}
          className={formState.username.error && formState.username.touched ? 'error' : ''}
        />
        {formState.username.error && formState.username.touched && (
          <div className="error-message">{formState.username.error}</div>
        )}
      </div>
      
      <div className="form-group">
        <label htmlFor="email">Email</label>
        <input
          id="email"
          type="email"
          value={formState.email.value}
          onChange={(e) => setFieldValue('email', e.target.value)}
          onBlur={() => touchField('email')}
          disabled={isSubmitting}
          className={formState.email.error && formState.email.touched ? 'error' : ''}
        />
        {formState.email.error && formState.email.touched && (
          <div className="error-message">{formState.email.error}</div>
        )}
      </div>
      
      <div className="form-group">
        <label htmlFor="password">Password</label>
        <input
          id="password"
          type="password"
          value={formState.password.value}
          onChange={(e) => setFieldValue('password', e.target.value)}
          onBlur={() => touchField('password')}
          disabled={isSubmitting}
          className={formState.password.error && formState.password.touched ? 'error' : ''}
        />
        {formState.password.error && formState.password.touched && (
          <div className="error-message">{formState.password.error}</div>
        )}
      </div>
      
      <div className="form-group">
        <label htmlFor="confirmPassword">Confirm Password</label>
        <input
          id="confirmPassword"
          type="password"
          value={formState.confirmPassword.value}
          onChange={(e) => setFieldValue('confirmPassword', e.target.value)}
          onBlur={() => touchField('confirmPassword')}
          disabled={isSubmitting}
          className={formState.confirmPassword.error && formState.confirmPassword.touched ? 'error' : ''}
        />
        {formState.confirmPassword.error && formState.confirmPassword.touched && (
          <div className="error-message">{formState.confirmPassword.error}</div>
        )}
      </div>
      
      <div className="form-actions">
        <button 
          type="submit" 
          disabled={!isValid || isSubmitting}
          className="submit-button"
        >
          {isSubmitting ? 'Signing up...' : 'Sign Up'}
        </button>
        <button
          type="button"
          onClick={resetForm}
          disabled={isSubmitting}
          className="reset-button"
        >
          Reset
        </button>
      </div>
    </form>
  );
};

export default SignupForm;`,
          exercise: {
            instructions:
              'Create a TypeScript React component that implements: (1) A reusable dropdown component using compound components pattern, (2) TypeScript interfaces for component props, (3) Error boundary for catching potential issues, (4) Using React Context to manage dropdown state, (5) Supporting both controlled and uncontrolled usage.',
          },
        },
        {
          title: 'React Ecosystem and Performance (5 Key Concepts)',
          explanation: `
        <p>These five concepts focus on integrating React with the broader ecosystem and optimizing performance:</p>

        <h4>16. Routing with React Router</h4>
        <p>React Router enables navigation between different components in a React application, simulating multi-page functionality:</p>

        <p><strong>Core Components:</strong></p>
        <ul>
          <li><code>BrowserRouter</code>: Uses HTML5 history API for clean URLs</li>
          <li><code>Routes/Route</code>: Defines which component to render for a specific path</li>
          <li><code>Link/NavLink</code>: Creates navigation links without page reloads</li>
          <li><code>Outlet</code>: Renders child routes in nested route configurations</li>
          <li><code>Navigate</code>: Programmatic navigation</li>
        </ul>

        <p><strong>Route Parameters:</strong> Dynamic parts of a URL used to pass data between routes.</p>

        <p><strong>Navigation Hooks:</strong></p>
        <ul>
          <li><code>useNavigate</code>: Programmatic navigation</li>
          <li><code>useParams</code>: Access route parameters</li>
          <li><code>useLocation</code>: Access the current location object</li>
          <li><code>useSearchParams</code>: Read and modify query parameters</li>
        </ul>

        <p><strong>Protected Routes:</strong> Routes that require authentication or authorization.</p>
        
        <div class="code-example">
          <pre><code>import React from 'react';
import { 
  BrowserRouter, 
  Routes, 
  Route, 
  Link, 
  NavLink, 
  Outlet, 
  useParams, 
  useNavigate, 
  useLocation 
} from 'react-router-dom';

// Basic app with routing
function App() {
  return (
    &lt;BrowserRouter&gt;
      &lt;div className="app"&gt;
        &lt;nav&gt;
          &lt;ul&gt;
            &lt;li&gt;&lt;Link to="/"&gt;Home&lt;/Link&gt;&lt;/li&gt;
            &lt;li&gt;&lt;Link to="/about"&gt;About&lt;/Link&gt;&lt;/li&gt;
            &lt;li&gt;
              &lt;NavLink 
                to="/products" 
                className={({ isActive }) =&gt; isActive ? 'active-link' : ''}
              &gt;
                Products
              &lt;/NavLink&gt;
            &lt;/li&gt;
            &lt;li&gt;&lt;Link to="/profile"&gt;Profile&lt;/Link&gt;&lt;/li&gt;
          &lt;/ul&gt;
        &lt;/nav&gt;

        &lt;Routes&gt;
          &lt;Route path="/" element=&lt;Home /&gt;
          &lt;Route path="/about" element=&lt;About /&gt;
          &lt;Route path="/products" element=&lt;Products /&gt;
            &lt;Route index element=&lt;ProductsList /&gt;
            &lt;Route path=":id" element=&lt;ProductDetail /&gt;
          &lt;/Route&gt;
          &lt;Route path="/profile" element=&lt;
            &lt;ProtectedRoute&gt;
              &lt;Profile /&gt;
            &lt;/ProtectedRoute&gt;
          /&gt; /&gt;
          &lt;Route path="*" element=&lt;NotFound /&gt;
        &lt;/Routes&gt;
      &lt;/div&gt;
    &lt;/BrowserRouter&gt;
  );
}

// Home page component
function Home() {
  return &lt;h1&gt;Home Page&lt;/h1&gt;;
}

// About page component
function About() {
  return &lt;h1&gt;About Page&lt;/h1&gt;;
}

// Products page with nested routes
function Products() {
  return (
    &lt;div&gt;
      &lt;h1&gt;Products&lt;/h1&gt;
      &lt;!-- The &lt;Outlet&gt; renders the matching child route --&gt;
      &lt;Outlet /&gt;
    &lt;/div&gt;
  );
}

// List of products
function ProductsList() {
  return (
    &lt;div&gt;
      &lt;h2&gt;Products List&lt;/h2&gt;
      &lt;ul&gt;
        &lt;li&gt;&lt;Link to=&quot;/products/1&quot;&gt;Product 1&lt;/Link&gt;&lt;/li&gt;
        &lt;li&gt;&lt;Link to=&quot;/products/2&quot;&gt;Product 2&lt;/Link&gt;&lt;/li&gt;
        &lt;li&gt;&lt;Link to=&quot;/products/3&quot;&gt;Product 3&lt;/Link&gt;&lt;/li&gt;
      &lt;/ul&gt;
    &lt;/div&gt;
  );
}

// Product detail with route parameter
function ProductDetail() {
  // Access route parameters
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  
  const goBack = () => {
    navigate(-1); // Go back to previous page
  };
  
  const goToProduct = (productId) => {
    navigate(\`/products/\${productId}\`);
  };
  
  return (
    &lt;div&gt;
      &lt;h2&gt;Product Detail for Product {id}&lt;/h2&gt;
      &lt;p&gt;Current path: {location.pathname}&lt;/p&gt;
      &lt;button onClick={goBack}&gt;Go Back&lt;/button&gt;
      &lt;button onClick={() =&gt; goToProduct(Number(id) + 1)}&gt;Next Product&lt;/button&gt;
    &lt;/div&gt;
  );
}

// Protected route component
function ProtectedRoute({ children }) {
  const isAuthenticated = useAuth(); // Custom hook to check auth status
  const navigate = useNavigate();
  
  if (!isAuthenticated) {
    // Redirect to login page with return URL
    return "&lt;Navigate to="/login" state={{ from: location }} replace /&gt;";
  }
  
  return children;
}

// Custom auth hook (simplified)
function useAuth() {
  // In a real app, this would check for auth tokens, user context, etc.
  return localStorage.getItem('authToken') !== null;
}

// Profile page (requires authentication)
function Profile() {
  return "&lt;h1&gt;User Profile&lt;/h1&gt;";
}

// 404 page
function NotFound() {
  return "&lt;h1&gt;404 - Page Not Found&lt;/h1&gt;";
}</code></pre>
        </div>

        <h4>17. Server-Side Rendering vs Client-Side Rendering</h4>
        <p>Understanding different rendering approaches for React applications:</p>

        <p><strong>Client-Side Rendering (CSR):</strong></p>
        <ul>
          <li>Browser receives minimal HTML and loads React via JavaScript</li>
          <li>React builds the UI in the browser</li>
          <li>Initial load may be slower, but subsequent navigation is faster</li>
          <li>Good for highly interactive applications</li>
        </ul>

        <p><strong>Server-Side Rendering (SSR):</strong></p>
        <ul>
          <li>Server renders the React components to HTML and sends complete markup</li>
          <li>Browser displays content immediately, then React "hydrates" for interactivity</li>
          <li>Faster initial loading and better SEO</li>
          <li>Frameworks: Next.js, Remix</li>
        </ul>

        <p><strong>Static Site Generation (SSG):</strong></p>
        <ul>
          <li>Pages are pre-rendered at build time (not request time)</li>
          <li>Extremely fast loading</li>
          <li>Good for content that doesn't change frequently</li>
        </ul>

        <p><strong>Incremental Static Regeneration (ISR):</strong> Combines SSG with selective server-side rendering for updated content.</p>
        
        <div class="code-example">
          <pre><code>// CLIENT-SIDE RENDERING (Create React App)
// index.js
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

ReactDOM.render(
  &lt;React.StrictMode&gt;
    &lt;App /&gt;
  &lt;/React.StrictMode&gt;,
  document.getElementById('root')
);

// SERVER-SIDE RENDERING (Next.js example)
// pages/index.js
import React from 'react';

// This function runs on the server
export async function getServerSideProps() {
  // Fetch data from an API
  const res = await fetch('https://api.example.com/data');
  const data = await res.json();
  
  // Pass data to the page via props
  return { props: { data } };
}

// Page component receives props from server
function HomePage({ data }) {
  return (
    &lt;div&gt;
      &lt;h1&gt;Server-side Rendered Page&lt;/h1&gt;
      &lt;ul&gt;
        {data.map(item =&gt; (
          &lt;li key={item.id}&gt;{item.name}&lt;/li&gt;
        ))}
      &lt;/ul&gt;
    &lt;/div&gt;
  );
}

export default HomePage;

// STATIC SITE GENERATION (Next.js example)
// pages/blog/[slug].js
import React from 'react';

// This function runs at build time
export async function getStaticPaths() {
  // Fetch list of possible blog posts
  const res = await fetch('https://api.example.com/posts');
  const posts = await res.json();
  
  // Generate paths for each post
  const paths = posts.map(post => ({
    params: { slug: post.slug }
  }));
  
  return { 
    paths,
    fallback: false // 404 for paths not returned by getStaticPaths
  };
}

// This also runs at build time
export async function getStaticProps({ params }) {
  // Fetch data for a single blog post
  const res = await fetch(\`https://api.example.com/posts/\${params.slug}\`);
  const post = await res.json();
  
  return { 
    props: { post },
    // Enable ISR - page regenerates after 1 hour
    revalidate: 3600
  };
}

function BlogPost({ post }) {
  return (
    &lt;article&gt;
      &lt;h1&gt;{post.title}&lt;/h1&gt;
      &lt;div dangerouslySetInnerHTML={{ __html: post.content }} /&gt;
    &lt;/article&gt;
  );
}

export default BlogPost;</code></pre>
        </div>

        <h4>18. API Calls and Data Fetching</h4>
        <p>Techniques for retrieving data from external APIs in React applications:</p>

        <p><strong>Fetching Methods:</strong></p>
        <ul>
          <li><code>fetch</code>: Browser's built-in API</li>
          <li><code>axios</code>: Popular HTTP client with more features</li>
          <li><code>SWR</code>: React hooks library for data fetching</li>
          <li><code>React Query</code>: Complete data fetching and caching solution</li>
          <li><code>Apollo Client</code>: For GraphQL APIs</li>
        </ul>

        <p><strong>Fetching in Class Components:</strong> Using lifecycle methods (e.g., <code>componentDidMount</code>).</p>

        <p><strong>Fetching in Functional Components:</strong> Using the <code>useEffect</code> hook.</p>

        <p><strong>Advanced Patterns:</strong></p>
        <ul>
          <li>Loading and error states</li>
          <li>Pagination and infinite scrolling</li>
          <li>Caching and invalidation</li>
          <li>Optimistic updates</li>
        </ul>
        
        <div class="code-example">
          <pre><code>// Basic fetch with useEffect
import React, { useState, useEffect } from 'react';

function UserList() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  useEffect(() => {
    // Function to fetch users
    async function fetchUsers() {
      try {
        const response = await fetch('https://api.example.com/users');
        
        if (!response.ok) {
          throw new Error(\`API error: \${response.status}\`);
        }
        
        const data = await response.json();
        setUsers(data);
        setError(null);
      } catch (err) {
        setError(err.message);
        setUsers([]);
      } finally {
        setLoading(false);
      }
    }
    
    fetchUsers();
  }, []); // Empty dependency array means this runs once on mount
  
  if (loading) return &lt;div&gt;Loading...&lt;/div&gt;;
  if (error) return &lt;div&gt;Error: {error}&lt;/div&gt;;
  
  return (
    &lt;ul&gt;
      {users.map(user => (
        &lt;li key={user.id}&gt;{user.name}&lt;/li&gt;
      ))}
    &lt;/ul&gt;
  );
}

// Fetch with Axios
import axios from 'axios';

function ProductList() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  useEffect(() => {
    // Create a cancellation token for cleanup
    const cancelToken = axios.CancelToken.source();
    
    async function fetchProducts() {
      try {
        const response = await axios.get('https://api.example.com/products', {
          cancelToken: cancelToken.token
        });
        
        setProducts(response.data);
        setError(null);
      } catch (err) {
        if (!axios.isCancel(err)) {
          setError(err.message);
          setProducts([]);
        }
      } finally {
        setLoading(false);
      }
    }
    
    fetchProducts();
    
    // Cleanup function to cancel request if component unmounts
    return () => {
      cancelToken.cancel('Component unmounted');
    };
  }, []);
  
  // Rest of component...
}

// Using React Query
import { useQuery, useMutation, useQueryClient } from 'react-query';

// API functions
const fetchTodos = async () => {
  const response = await fetch('https://api.example.com/todos');
  if (!response.ok) throw new Error('Network response was not ok');
  return response.json();
};

const addTodo = async (todo) => {
  const response = await fetch('https://api.example.com/todos', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(todo)
  });
  
  if (!response.ok) throw new Error('Failed to add todo');
  return response.json();
};

function TodoApp() {
  const queryClient = useQueryClient();
  const [newTodo, setNewTodo] = useState('');
  
  // Query for fetching todos
  const { 
    data: todos = [], 
    isLoading, 
    error 
  } = useQuery('todos', fetchTodos, {
    staleTime: 60000, // Data is considered fresh for 1 minute
    cacheTime: 300000 // Cache data for 5 minutes
  });
  
  // Mutation for adding a todo
  const addTodoMutation = useMutation(addTodo, {
    // When successful, invalidate todos query to refetch
    onSuccess: () => {
      queryClient.invalidateQueries('todos');
      setNewTodo('');
    }
  });
  
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!newTodo.trim()) return;
    
    addTodoMutation.mutate({ title: newTodo, completed: false });
  };
  
  if (isLoading) return <div>Loading todos...</div>;
  if (error) return <div>Error loading todos: {error.message}</div>;
  
  return (
    &lt;div&gt;
      &lt;h1&gt;Todos&lt;/h1&gt;
      
      &lt;form onSubmit={handleSubmit}&gt;
        &lt;input
          type="text"
          value={newTodo}
          onChange={(e) =&gt; setNewTodo(e.target.value)}
          placeholder="Add a new todo"
        /&gt;
        &lt;button type="submit" disabled={addTodoMutation.isLoading}&gt;
          {addTodoMutation.isLoading ? 'Adding...' : 'Add Todo'}
        &lt;/button&gt;
      &lt;/form&gt;
      
      {addTodoMutation.isError && (
        &lt;div&gt;Error adding todo: {addTodoMutation.error.message}&lt;/div&gt;
      )}
      
      &lt;ul&gt;
        {todos.map(todo =&gt; (
          &lt;li key={todo.id}&gt;{todo.title}&lt;/li&gt;
        ))}
      &lt;/ul&gt;
    &lt;/div&gt;
  );
}</code></pre>
        </div>

        <h4>19. React Performance Optimization</h4>
        <p>Techniques to improve React application performance:</p>

        <p><strong>Component Optimization:</strong></p>
        <ul>
          <li><code>React.memo</code>: Prevents unnecessary re-renders of functional components</li>
          <li><code>PureComponent</code>: Class component with shallow prop and state comparison</li>
          <li><code>shouldComponentUpdate</code>: Manual control over when a component should re-render</li>
        </ul>

        <p><strong>Hook Optimization:</strong></p>
        <ul>
          <li><code>useMemo</code>: Memoizes expensive calculations</li>
          <li><code>useCallback</code>: Memoizes function references</li>
          <li>Dependency arrays: Controlling when effects and callbacks run</li>
        </ul>

        <p><strong>Rendering Optimization:</strong></p>
        <ul>
          <li>List virtualization: Only render visible items in long lists</li>
          <li>Code splitting: Load code only when needed</li>
          <li>Lazy loading: Defer loading of non-critical components</li>
        </ul>

        <p><strong>State Management Optimization:</strong></p>
        <ul>
          <li>Minimize state updates</li>
          <li>Use appropriate state structure</li>
          <li>Avoid prop drilling with Context or state management libraries</li>
        </ul>
        
        <div class="code-example">
          <pre><code>// React.memo for functional components
import React, { memo } from 'react';

// Without memo, this component would re-render on every parent render,
// even if the props haven't changed
const ExpensiveComponent = memo(function ExpensiveComponent({ data }) {
  console.log('ExpensiveComponent rendering');
  
  // Expensive calculation or rendering
  const processedData = data.map(item => {
    // Simulate expensive operation
    for (let i = 0; i < 10000; i++) {
      // Do nothing, just waste CPU cycles
    }
    return item * 2;
  });
  
  return (
    &lt;ul&gt;
      {processedData.map((item, index) => (
        &lt;li key={index}&gt;{item}&lt;/li&gt;
      ))}
    &lt;/ul&gt;
  );
});

// PureComponent for class components
class PureCounter extends React.PureComponent {
  render() {
    console.log('PureCounter rendering');
    
    return (
      &lt;div&gt;
        &lt;h2&gt;Count: {this.props.count}&lt;/h2&gt;
        &lt;button onClick={this.props.onIncrement}&gt;Increment&lt;/button&gt;
      &lt;/div&gt;
    );
  }
}

// Manual shouldComponentUpdate implementation
class OptimizedList extends React.Component {
  shouldComponentUpdate(nextProps) {
    // Only update if the items array reference has changed
    // AND the length is different (meaning items were added/removed)
    return (
      nextProps.items !== this.props.items &&
      nextProps.items.length !== this.props.items.length
    );
  }
  
  render() {
    return (
      &lt;ul&gt;
        {this.props.items.map(item => (
          &lt;li key={item.id}&gt;{item.name}&lt;/li&gt;
        ))}
      &lt;/ul&gt;
    );
  }
}

// useMemo for expensive calculations
function DataProcessor({ data, filter }) {
  // This calculation will only run when data or filter changes
  const processedData = useMemo(() => {
    console.log('Processing data...');
    
    return data.filter(item => item.name.includes(filter))
      .sort((a, b) => a.name.localeCompare(b.name))
      .map(item => ({
        ...item,
        nameLength: item.name.length
      }));
  }, [data, filter]); // Dependencies array
  
  return (
    &lt;ul&gt;
      {processedData.map(item =&gt; (
        &lt;li key={item.id}&gt;
          {item.name} (length: {item.nameLength})
        &lt;/li&gt;
      ))}
    &lt;/ul&gt;
  );
}

// useCallback for stable function references
function ParentComponent() {
  const [count, setCount] = useState(0);
  const [otherState, setOtherState] = useState(0);
  
  // Without useCallback, this function would get a new reference on every render
  // causing ChildComponent to re-render unnecessarily
  const handleClick = useCallback(() => {
    setCount(c => c + 1);
  }, []); // Empty dependencies means this function reference is stable
  
  return (
    &lt;div&gt;
      &lt;button onClick={() => setOtherState(s => s + 1)}&gt;
        Update Other State ({otherState})
      &lt;/button&gt;
      
      &lt;ChildComponent count={count} onClick={handleClick} /&gt;
    &lt;/div&gt;
  );
}

const ChildComponent = memo(function ChildComponent({ count, onClick }) {
  console.log('ChildComponent rendering');
  
  return (
    &lt;div&gt;
      &lt;p&gt;Count: {count}&lt;/p&gt;
      &lt;button onClick={onClick}&gt;
        Increment
      &lt;/button&gt;
    &lt;/div&gt;
  );
});

// Code splitting with React.lazy and Suspense
import React, { Suspense, lazy } from 'react';

// Lazy load components
const HeavyComponent = lazy(() => import('./HeavyComponent'));
const Settings = lazy(() => import('./Settings'));

function App() {
  const [showSettings, setShowSettings] = useState(false);
  
  return (
    &lt;div&gt;
      &lt;button onClick={() =&gt; setShowSettings(!showSettings)}&gt;
        {showSettings ? 'Hide' : 'Show'} Settings
      &lt;/button&gt;
      
      &lt;Suspense fallback=&lt;div&gt;Loading...&lt;/div&gt;&gt;
        {/* HeavyComponent is only loaded when rendered */}
        &lt;HeavyComponent /&gt;
        
        {/* Settings is only loaded when showSettings is true */}
        {showSettings &amp;&amp; &lt;Settings /&gt;}
      &lt;/Suspense&gt;
    &lt;/div&gt;
  );
}

// List virtualization with react-window
import { FixedSizeList } from 'react-window';

function VirtualizedList({ items }) {
  // Render function for each item
  const Row = ({ index, style }) => (
    &lt;div style={style} className="row"&gt;
      {items[index].name}
    &lt;/div&gt;
  );
  
  return (
    &lt;FixedSizeList
      height={400}
      width={300}
      itemCount={items.length}
      itemSize={35} // Height of each item
    &gt;
      {Row}
    &lt;/FixedSizeList&gt;
  );
}</code></pre>
        </div>

        <h4>20. Testing React Applications</h4>
        <p>Approaches and tools for testing React components and applications:</p>

        <p><strong>Testing Types:</strong></p>
        <ul>
          <li>Unit Testing: Testing individual components in isolation</li>
          <li>Integration Testing: Testing how components work together</li>
          <li>End-to-End Testing: Testing complete user flows</li>
        </ul>

        <p><strong>Testing Libraries:</strong></p>
        <ul>
          <li>Jest: JavaScript testing framework</li>
          <li>React Testing Library: For testing React components</li>
          <li>Enzyme: Component testing utility (alternative to RTL)</li>
          <li>Cypress: End-to-end testing framework</li>
        </ul>

        <p><strong>Testing Approaches:</strong></p>
        <ul>
          <li>Component rendering tests</li>
          <li>Event handling tests</li>
          <li>Asynchronous tests (API calls, etc.)</li>
          <li>Snapshot testing</li>
          <li>Mocking dependencies</li>
        </ul>
        
        <div class="code-example">
          <pre><code>// Unit Testing with Jest and React Testing Library
import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event';
import Counter from './Counter';
import UserProfile from './UserProfile';
import { fetchUserData } from './api';

// Mock API module
jest.mock('./api');

// Basic component test
test('Counter displays initial count', () => {
  render(<Counter initialCount={5} />);
  
  // Use screen queries to find elements
  const countDisplay = screen.getByText(/count: 5/i);
  expect(countDisplay).toBeInTheDocument();
});

// Testing user interactions
test('Counter increments when button is clicked', () => {
  render(<Counter initialCount={5} />);
  
  // Find elements
  const incrementButton = screen.getByRole('button', { name: /increment/i });
  
  // Simulate click
  fireEvent.click(incrementButton);
  
  // Check updated state
  expect(screen.getByText(/count: 6/i)).toBeInTheDocument();
});

// Asynchronous test with mocks
test('UserProfile loads and displays user data', async () => {
  // Set up mock API response
  fetchUserData.mockResolvedValueOnce({
    id: 1,
    name: 'John Doe',
    email: 'john@example.com'
  });
  
  render(<UserProfile userId={1} />);
  
  // Initially shows loading state
  expect(screen.getByText(/loading/i)).toBeInTheDocument();
  
  // Wait for user data to load
  await waitFor(() => {
    expect(screen.getByText('John Doe')).toBeInTheDocument();
  });
  
  // Verify API was called correctly
  expect(fetchUserData).toHaveBeenCalledWith(1);
  expect(screen.getByText('john@example.com')).toBeInTheDocument();
});

// Testing form submission
test('Form submits with user input', async () => {
  const handleSubmit = jest.fn();
  
  render(<LoginForm onSubmit={handleSubmit} />);
  
  // Fill out form
  userEvent.type(screen.getByLabelText(/username/i), 'testuser');
  userEvent.type(screen.getByLabelText(/password/i), 'secret123');
  
  // Submit form
  fireEvent.click(screen.getByRole('button', { name: /login/i }));
  
  // Check that form submission handler was called with correct data
  expect(handleSubmit).toHaveBeenCalledWith({
    username: 'testuser',
    password: 'secret123'
  });
});

// Snapshot testing
test('Button component matches snapshot', () => {
  const { container } = render(&lt;Button label="Click Me" primary /&gt;);
  expect(container).toMatchSnapshot();
});

// Testing with Context
test('ThemeButton uses theme from context', () => {
  render(
    &lt;ThemeProvider initialTheme="dark"&gt;
      &lt;ThemeButton&gt;Theme Button&lt;/ThemeButton&gt;
    &lt;/ThemeProvider&gt;
  );
  
  const button = screen.getByRole('button');
  expect(button).toHaveClass('dark-theme');
});</code></pre>
        </div>
        
        <div class="interview-tip">
          <p><span class="interview-icon">🎯</span> <strong>Interview Focus:</strong> The React ecosystem questions assess your practical experience with modern React applications. Be prepared to discuss routing strategies, data fetching approaches, and performance optimization techniques.</p>
          <p>Common interview questions include:</p>
          <ul>
            <li>"What are the advantages of server-side rendering over client-side rendering?"</li>
            <li>"How would you implement protected routes in React Router?"</li>
            <li>"What strategies would you use to optimize the performance of a React application?"</li>
            <li>"How do you handle API calls in React and manage loading/error states?"</li>
            <li>"What testing strategies do you use for React components?"</li>
          </ul>
        </div>
      `,
          codeExample: `// Optimized Data Grid with React Query, Virtualization and Memoization
import React, { useState, useMemo, useCallback } from 'react';
import { useQuery } from 'react-query';
import { FixedSizeList as List } from 'react-window';
import AutoSizer from 'react-virtualized-auto-sizer';

// API client and type definitions
interface User {
  id: number;
  name: string;
  email: string;
  role: string;
  status: 'active' | 'inactive';
  lastLogin: string;
}

interface FetchUsersParams {
  page: number;
  limit: number;
  sortBy?: string;
  sortDirection?: 'asc' | 'desc';
  filter?: string;
}

const fetchUsers = async ({
  page = 1,
  limit = 50,
  sortBy = 'name',
  sortDirection = 'asc',
  filter = ''
}: FetchUsersParams): Promise<{ users: User[]; totalCount: number }> => {
  // Build query string
  const queryParams = new URLSearchParams({
    page: page.toString(),
    limit: limit.toString(),
    sortBy,
    sortDirection,
    filter
  });
  
  const response = await fetch(\`/api/users?\${queryParams.toString()}\`);
  
  if (!response.ok) {
    throw new Error('Failed to fetch users');
  }
  
  return response.json();
};

// Column definition
interface Column {
  key: keyof User;
  header: string;
  width: number;
  sortable?: boolean;
  render?: (value: any, user: User) => React.ReactNode;
}

// Components
const UserDataGrid: React.FC = () => {
  // State for sorting and filtering
  const [sortConfig, setSortConfig] = useState({
    key: 'name' as keyof User,
    direction: 'asc' as 'asc' | 'desc'
  });
  const [filter, setFilter] = useState('');
  const [page, setPage] = useState(1);
  const [pageSize] = useState(50);
  
  // Column definitions
  const columns = useMemo<Column[]>(() => [
    {
      key: 'name',
      header: 'Name',
      width: 200,
      sortable: true
    },
    {
      key: 'email',
      header: 'Email',
      width: 250,
      sortable: true
    },
    {
      key: 'role',
      header: 'Role',
      width: 120,
      sortable: true
    },
    {
      key: 'status',
      header: 'Status',
      width: 100,
      sortable: true,
      render: (value) => (
        <span className={value === 'active' ? 'status-active' : 'status-inactive'}>
          {value}
        </span>
      )
    },
    {
      key: 'lastLogin',
      header: 'Last Login',
      width: 180,
      sortable: true,
      render: (value) => new Date(value).toLocaleString()
    }
  ], []);
  
  // Calculate total width
  const totalWidth = useMemo(() => 
    columns.reduce((total, col) => total + col.width, 0), 
    [columns]
  );
  
  // Fetch users with React Query
  const {
    data,
    isLoading,
    isError,
    error
  } = useQuery(
    ['users', page, pageSize, sortConfig.key, sortConfig.direction, filter],
    () => fetchUsers({
      page,
      limit: pageSize,
      sortBy: sortConfig.key,
      sortDirection: sortConfig.direction,
      filter
    }),
    {
      keepPreviousData: true,
      staleTime: 5 * 60 * 1000, // 5 minutes
    }
  );
  
  // Handle sort
  const handleSort = useCallback((key: keyof User) => {
    setSortConfig(prevConfig => {
      if (prevConfig.key === key) {
        // Toggle direction if same key
        return {
          key,
          direction: prevConfig.direction === 'asc' ? 'desc' : 'asc'
        };
      }
      return { key, direction: 'asc' };
    });
  }, []);
  
  // Handle filter change
  const handleFilterChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setFilter(e.target.value);
    setPage(1); // Reset to first page when filtering
  }, []);
  
  // Memoized row renderer for virtualized list
  const Row = useCallback(({ index, style }: { index: number; style: React.CSSProperties }) => {
    if (!data || !data.users[index]) return null;
    
    const user = data.users[index];
    
    return (
      <div className="row" style={style}>
        {columns.map(column => (
          <div 
            key={column.key} 
            className="cell" 
            style={{ width: column.width }}
          >
            {column.render 
              ? column.render(user[column.key], user)
              : user[column.key]}
          </div>
        ))}
      </div>
    );
  }, [data, columns]);
  
  // Render header
  const Header = useMemo(() => (
    <div className="header">
      {columns.map(column => (
        <div 
          key={column.key}
          className={\`header-cell \${sortConfig.key === column.key ? 'sorted' : ''}\`}
          style={{ width: column.width }}
          onClick={() => column.sortable && handleSort(column.key)}
        >
          {column.header}
          {sortConfig.key === column.key && (
            <span className="sort-indicator">
              {sortConfig.direction === 'asc' ? ' ↑' : ' ↓'}
            </span>
          )}
        </div>
      ))}
    </div>
  ), [columns, sortConfig, handleSort]);
  
  // Pagination UI
  const Pagination = useMemo(() => {
    if (!data) return null;
    
    const totalPages = Math.ceil(data.totalCount / pageSize);
    
    return (
      <div className="pagination">
        <button 
          onClick={() => setPage(p => Math.max(1, p - 1))}
          disabled={page === 1 || isLoading}
        >
          Previous
        </button>
        
        <span>
          Page {page} of {totalPages}
        </span>
        
        <button 
          onClick={() => setPage(p => Math.min(totalPages, p + 1))}
          disabled={page === totalPages || isLoading}
        >
          Next
        </button>
      </div>
    );
  }, [data, page, pageSize, isLoading]);
  
  // Loading, error states
  if (isLoading && !data) {
    return <div className="loading">Loading users...</div>;
  }
  
  if (isError) {
    return <div className="error">Error: {(error as Error).message}</div>;
  }
  
  return (
    <div className="data-grid-container">
      <div className="toolbar">
        <input
          type="text"
          placeholder="Filter users..."
          value={filter}
          onChange={handleFilterChange}
          className="filter-input"
        />
      </div>
      
      {Header}
      
      <div className="grid-content">
        <AutoSizer>
          {({ height, width }) => (
            <List
              height={height}
              width={Math.min(width, totalWidth)}
              itemCount={data?.users.length || 0}
              itemSize={50}
            >
              {Row}
            </List>
          )}
        </AutoSizer>
      </div>
      
      {Pagination}
    </div>
  );
};

export default React.memo(UserDataGrid);`,
          exercise: {
            instructions:
              'Create a React application that demonstrates performance optimization techniques: (1) React Query for data fetching with caching, (2) List virtualization for rendering large datasets, (3) Memoization with React.memo, useMemo, and useCallback, (4) Lazy loading with React.lazy and Suspense, (5) Implementation of proper testing with React Testing Library.',
          },
        },
      ],
      prepperSummary: `
    <div class="prepper-summary">
      <h3>🔑 Key Interview Takeaways</h3>
      <ul>
        <li><strong>React Fundamentals:</strong> Master components, props, state, and lifecycle to demonstrate your understanding of React's core concepts. These fundamentals are essential for all React development.</li>
        
        <li><strong>State Management:</strong> Be proficient with both local component state (useState, useReducer) and global state solutions (Context API, Redux). Show you understand when to use each approach based on application needs.</li>
        
        <li><strong>Modern React Patterns:</strong> Understand hooks, custom hooks, TypeScript integration, and advanced composition patterns. These demonstrate your ability to write clean, maintainable React code.</li>
        
        <li><strong>Performance and Ecosystem:</strong> Know how to optimize React applications and integrate with the broader ecosystem (routing, data fetching, testing). These skills show you can build production-ready applications.</li>
      </ul>
      
      <h4>📝 Common Interview Questions</h4>
      <ol>
        <li>"What is the difference between state and props?"</li>
        <li>"Explain React hooks and their advantages over class components"</li>
        <li>"How would you implement state management in a large React application?"</li>
        <li>"Describe how to optimize performance in a React application"</li>
        <li>"What are the benefits of using TypeScript with React?"</li>
        <li>"How do you handle data fetching and loading states in React?"</li>
        <li>"Explain the concept of component composition in React"</li>
        <li>"What testing strategies would you implement for a React application?"</li>
        <li>"How do you handle routing in React applications?"</li>
        <li>"Compare server-side rendering to client-side rendering in React"</li>
      </ol>
    </div>
  `,
    },
  ],
  challenge: {
    description:
      'You\'re tasked with building a "React Developer\'s Toolkit" that demonstrates mastery of the 20 essential React concepts. Create a complete application that showcases your understanding of React fundamentals, state management, advanced patterns, and ecosystem considerations.',
    requirements: [
      'Build a task management application with CRUD operations',
      'Implement proper component structure with both functional and class components',
      'Use React hooks for state management and side effects',
      'Create custom hooks for reusable logic',
      'Implement Context API for global state',
      'Add TypeScript for type safety',
      'Incorporate React Router for navigation',
      'Implement performance optimizations (memoization, code splitting)',
      'Add proper form validation and error handling',
      'Include comprehensive tests for key components',
    ],
    starterCode: `// React Developer's Toolkit Challenge
// Demonstrate your mastery of essential React concepts

// App.tsx - Main application component
import React, { Suspense } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { TaskProvider } from './context/TaskContext';
import { AuthProvider } from './context/AuthContext';
import { ThemeProvider } from './context/ThemeContext';
import ProtectedRoute from './components/common/ProtectedRoute';
import Header from './components/layout/Header';
import ErrorBoundary from './components/common/ErrorBoundary';

// Lazy-loaded components
const Dashboard = React.lazy(() => import('./pages/Dashboard'));
const TaskDetail = React.lazy(() => import('./pages/TaskDetail'));
const Login = React.lazy(() => import('./pages/Login'));
const Settings = React.lazy(() => import('./pages/Settings'));
const NotFound = React.lazy(() => import('./pages/NotFound'));

const App: React.FC = () => {
  return (
    &lt;ErrorBoundary&gt;
      &lt;AuthProvider&gt;
        &lt;ThemeProvider&gt;
          &lt;TaskProvider&gt;
            &lt;BrowserRouter&gt;
              &lt;div className="app"&gt;
                &lt;Header /&gt;
                &lt;main&gt;
                  &lt;Suspense fallback=&lt;div&gt;Loading...&lt;/div&gt;&gt;
                    &lt;Routes&gt;
                      &lt;Route path="/login" element=&lt;Login /&gt; /&gt;
                      &lt;Route 
                        path="/" 
                        element={
                          &lt;ProtectedRoute&gt;
                            &lt;Dashboard /&gt;
                          &lt;/ProtectedRoute&gt;
                        } 
                      /&gt;
                      &lt;Route 
                        path="/task/:id" 
                        element={
                          &lt;ProtectedRoute&gt;
                            &lt;TaskDetail /&gt;
                          &lt;/ProtectedRoute&gt;
                        } 
                      /&gt;
                      &lt;Route 
                        path="/settings" 
                        element={
                          &lt;ProtectedRoute&gt;
                            &lt;Settings /&gt;
                          &lt;/ProtectedRoute&gt;
                        } 
                      /&gt;
                      &lt;Route path="*" element=&lt;NotFound /&gt; /&gt;
                    &lt;/Routes&gt;
                  &lt;/Suspense&gt;
                &lt;/main&gt;
              &lt;/div&gt;
            &lt;/BrowserRouter&gt;
          &lt;/TaskProvider&gt;
        &lt;/ThemeProvider&gt;
      &lt;/AuthProvider&gt;
    &lt;/ErrorBoundary&gt;
  );
};

export default App;

// TaskContext.tsx - Context for task management
// Your implementation here

// AuthContext.tsx - Context for authentication
// Your implementation here

// ThemeContext.tsx - Context for theme switching
// Your implementation here

// Task.ts - Task model interface
// Your implementation here

// TaskList.tsx - Component to display list of tasks
// Your implementation here

// TaskForm.tsx - Component for creating/editing tasks
// Your implementation here

// useLocalStorage.ts - Custom hook for localStorage
// Your implementation here

// useFetch.ts - Custom hook for API calls
// Your implementation here

// Higher-order component for analytics tracking
// Your implementation here
`,
  },
}

export default shortlistPrepper
