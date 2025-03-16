// #Modern JavaScript Frameworks

const modernJavascriptFrameworks = {
  title: 'Modern JavaScript Frameworks',
  description:
    'Master key concepts that apply across React, Vue, Angular, and other popular frameworks.',
  lessons: [
    {
      title: 'Component-Based Architecture',
      description: 'Learn how components form the building blocks of modern web applications.',
      sections: [
        {
          title: 'Understanding Components',
          explanation: `
        <p>Component-based architecture is a design approach where the user interface is broken down into independent, reusable building blocks called components, each managing its own state, markup, and behavior.</p>
        
        <h4>Component Philosophy</h4>
        <p>Components are the fundamental building blocks of modern front-end frameworks, offering numerous benefits over traditional approaches to web development.</p>
        
        <p>The component philosophy represents a significant shift from older web development paradigms:</p>
        <ul>
          <li><strong>Reusability:</strong> Components can be reused throughout an application, reducing code duplication and ensuring consistency across the UI</li>
          <li><strong>Maintainability:</strong> Components make code more maintainable by separating concerns and encapsulating related functionality</li>
          <li><strong>Testability:</strong> Well-designed components are easier to test in isolation, leading to more robust applications</li>
          <li><strong>Composability:</strong> Complex UIs are built by composing simpler components, following the "building block" approach</li>
          <li><strong>Encapsulation:</strong> Components encapsulate their own state and behavior, reducing side effects and unpredictable behavior</li>
        </ul>
        
        <h4>Component Structure</h4>
        <p>While the exact syntax varies across frameworks, all components typically include similar elements:</p>
        
        <p>Most modern components share these key structural elements:</p>
        <ul>
          <li><strong>Template/Markup:</strong> The visual representation of the component (JSX in React, templates in Vue/Angular)</li>
          <li><strong>State:</strong> Internal data that can change over time and affects the component's behavior</li>
          <li><strong>Props:</strong> External data passed to the component from its parent</li>
          <li><strong>Event Handlers:</strong> Functions that respond to user interactions or other events</li>
          <li><strong>Lifecycle Methods:</strong> Special functions that run at specific points in a component's existence</li>
        </ul>
        
        <div class="code-example">
          <pre><code>// React component
function UserProfile({ user }) {
  // Component state (if needed)
  const [isExpanded, setIsExpanded] = useState(false);
  
  // Event handlers
  const toggleExpand = () => setIsExpanded(!isExpanded);
  
  // Rendering logic (UI)
  return (
    &lt;div className="user-profile"&gt;
      &lt;h2&gt;{user.name}&lt;/h2&gt;
      &lt;button onClick={toggleExpand}&gt;
        {isExpanded ? 'Show Less' : 'Show More'}
      &lt;/button&gt;
      
      {isExpanded && (
        &lt;div className="details"&gt;
          &lt;p&gt;Email: {user.email}&lt;/p&gt;
          &lt;p&gt;Role: {user.role}&lt;/p&gt;
        &lt;/div&gt;
      )}
    &lt;/div&gt;
  );
}</code></pre>
        </div>
        
        <h4>Props and Data Flow</h4>
        <p>Components receive data through "props" (properties) and maintain a unidirectional data flow from parent to child components.</p>
        
        <p>This unidirectional data flow provides several important benefits:</p>
        <ul>
          <li><strong>Predictability:</strong> Data flows in one direction, making it easier to track state changes</li>
          <li><strong>Debugging:</strong> When issues occur, you can trace the data path to find where problems originate</li>
          <li><strong>Maintainability:</strong> Components can rely on receiving data through clearly defined interfaces</li>
          <li><strong>Performance:</strong> Frameworks can optimize rendering by tracking which props have changed</li>
          <li><strong>Testability:</strong> Components with clear inputs (props) and outputs (UI/events) are easier to test</li>
        </ul>
        
        <div class="code-example">
          <pre><code>// Parent component passing props to child components
function UserList({ users }) {
  return (
    &lt;div className="user-list"&gt;
      &lt;h1&gt;User Directory&lt;/h1&gt;
      {users.map(user => (
        &lt;UserProfile 
          key={user.id} 
          user={user} 
          onSelect={() => console.log('Selected:', user.name)} 
        /&gt;
      ))}
    &lt;/div&gt;
  );
}</code></pre>
        </div>
        
        <div class="interview-tip">
          <p><span class="interview-icon">🎯</span> <strong>Interview Focus:</strong> Understanding components demonstrates your grasp of modern web development principles.</p>
          <p>Key points to understand:</p>
          <ul>
            <li>How components promote reusability and separation of concerns</li>
            <li>The difference between presentational and container components</li>
            <li>Patterns for component composition and communication</li>
            <li>How to design components with the right level of granularity</li>
            <li>Framework differences in component implementation (React, Vue, Angular)</li>
          </ul>
        </div>
      `,
          codeExample: `// Component Implementation Across Frameworks

// 1. React Component
// ------------------
// Using functional component with hooks
import React, { useState } from 'react';

function Counter({ initialCount = 0, step = 1 }) {
  // State using React Hooks
  const [count, setCount] = useState(initialCount);
  
  // Event handlers
  const increment = () => setCount(count + step);
  const decrement = () => setCount(count - step);
  const reset = () => setCount(initialCount);
  
  // UI rendering (JSX)
  return (
    <div className="counter">
      <h2>Count: {count}</h2>
      <div className="controls">
        <button onClick={decrement}>-</button>
        <button onClick={reset}>Reset</button>
        <button onClick={increment}>+</button>
      </div>
    </div>
  );
}

// 2. Vue Component
// ---------------
<template>
  <div class="counter">
    <h2>Count: {{ count }}</h2>
    <div class="controls">
      <button @click="decrement">-</button>
      <button @click="reset">Reset</button>
      <button @click="increment">+</button>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    initialCount: {
      type: Number,
      default: 0
    },
    step: {
      type: Number,
      default: 1
    }
  },
  data() {
    return {
      count: this.initialCount
    };
  },
  methods: {
    increment() {
      this.count += this.step;
    },
    decrement() {
      this.count -= this.step;
    },
    reset() {
      this.count = this.initialCount;
    }
  }
};
</script>

// 3. Angular Component
// -------------------

// counter.component.ts
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-counter',
  template: \`
    <div class="counter">
      <h2>Count: {{ count }}</h2>
      <div class="controls">
        <button (click)="decrement()">-</button>
        <button (click)="reset()">Reset</button>
        <button (click)="increment()">+</button>
      </div>
    </div>
  \`
})
export class CounterComponent {
  @Input() initialCount = 0;
  @Input() step = 1;
  
  count = 0;
  
  ngOnInit() {
    this.count = this.initialCount;
  }
  
  increment() {
    this.count += this.step;
  }
  
  decrement() {
    this.count -= this.step;
  }
  
  reset() {
    this.count = this.initialCount;
  }
}


// 4. Component Composition Example (React)
// ---------------------------------------
// A flexible Card component that composes other components
function Card({ title, children, footer, className = '' }) {
  return (
    <div className={\`card \${className}\`}>
      {title && <div className="card-header">{title}</div>}
      <div className="card-body">{children}</div>
      {footer && <div className="card-footer">{footer}</div>}
    </div>
  );
}

// Using the Card component to create different variations
function UserCard({ user }) {
  return (
    <Card 
      title={user.name}
      footer={<button>View Profile</button>}
      className="user-card"
    >
      <p>Email: {user.email}</p>
      <p>Role: {user.role}</p>
    </Card>
  );
}

function ProductCard({ product }) {
  return (
    <Card 
      title={product.name}
      footer={<PriceDisplay price={product.price} />}
    >
      <p>{product.description}</p>
      <div className="rating">
        Rating: {product.rating}/5
      </div>
    </Card>
  );
}

// 5. Presentational vs Container Components
// -----------------------------------------
// Presentational component (concerned with how things look)
function TodoItem({ todo, onToggle, onDelete }) {
  return (
    <li className={todo.completed ? 'completed' : ''}>
      <input 
        type="checkbox" 
        checked={todo.completed} 
        onChange={() => onToggle(todo.id)} 
      />
      <span>{todo.text}</span>
      <button onClick={() => onDelete(todo.id)}>Delete</button>
    </li>
  );
}

// Container component (concerned with how things work)
function TodoListContainer() {
  // State and data fetching logic
  const [todos, setTodos] = useState([]);
  
  useEffect(() => {
    // Fetch todos from API
    fetchTodos().then(data => setTodos(data));
  }, []);
  
  const toggleTodo = (id) => {
    setTodos(todos.map(todo => 
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ));
  };
  
  const deleteTodo = (id) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };
  
  // Render using the presentational component
  return (
    <div className="todo-list-container">
      <h2>Todos</h2>
      <ul>
        {todos.map(todo => (
          <TodoItem 
            key={todo.id}
            todo={todo}
            onToggle={toggleTodo}
            onDelete={deleteTodo}
          />
        ))}
      </ul>
    </div>
  );
}`,
          exercise: {
            instructions:
              'Design and implement a component-based UI for a blog application. Create components for: 1) ArticleList for showing multiple article summaries, 2) ArticleDetail for displaying a full article with comments, 3) CommentForm for submitting new comments, and 4) UserProfile for displaying author information. Ensure your components are properly composed, with clear props interfaces and appropriate separation of concerns between presentational and container components.',
          },
        },
        {
          title: 'Component Communication',
          explanation: `
        <p>Modern front-end applications require clear patterns for components to communicate with each other. Different frameworks implement these patterns in various ways, but they follow similar principles.</p>
        
        <h4>Parent-Child Communication</h4>
        <p>The most direct form of component communication happens between parent and child components through props (downward) and callbacks (upward).</p>
        
        <p>This two-way communication pattern follows these principles:</p>
        <ul>
          <li><strong>Props Down:</strong> Parents pass data to children through props, providing the data they need to render</li>
          <li><strong>Events Up:</strong> Children communicate back to parents through callbacks/events when something happens</li>
          <li><strong>Single Source of Truth:</strong> The parent typically owns and manages the state that's shared with children</li>
          <li><strong>Explicit API:</strong> This creates a clear contract between components with well-defined inputs and outputs</li>
          <li><strong>Predictable Flow:</strong> Changes follow a clear path - parent state → child props → child events → parent state update</li>
        </ul>
        
        <div class="code-example">
          <pre><code>// Parent component passing props and callback
function Parent() {
  const [message, setMessage] = useState('Hello from parent');
  
  // Callback to be passed to child
  const handleChildAction = (data) => {
    console.log('Child sent:', data);
    setMessage(data);
  };
  
  return (
    &lt;div className="parent"&gt;
      &lt;h2&gt;Parent Component: {message}&lt;/h2&gt;
      
      {/* Pass data down and callback up */}
      &lt;Child 
        message={message} 
        onAction={handleChildAction} 
      /&gt;
    &lt;/div&gt;
  );
}

// Child component receiving props and using callback
function Child({ message, onAction }) {
  const sendToParent = () => {
    onAction('Hello from child');
  };
  
  return (
    &lt;div className="child"&gt;
      &lt;p&gt;Received: {message}&lt;/p&gt;
      &lt;button onClick={sendToParent}&gt;Send to Parent&lt;/button&gt;
    &lt;/div&gt;
  );
}</code></pre>
        </div>
        
        <h4>Sibling Communication</h4>
        <p>Sibling components don't communicate directly but rather through their shared parent or through application state management.</p>
        
        <p>This pattern is important because:</p>
        <ul>
          <li><strong>Component Independence:</strong> Components remain isolated and reusable, without direct dependencies on siblings</li>
          <li><strong>Centralized State:</strong> The parent becomes the "source of truth" for data shared between siblings</li>
          <li><strong>Controlled Updates:</strong> The parent can process or validate data before passing it between siblings</li>
          <li><strong>Consistent Pattern:</strong> This follows the same unidirectional data flow pattern used throughout the application</li>
          <li><strong>Easier Debugging:</strong> When issues occur, the data flow path is clear and traceable</li>
        </ul>
        
        <div class="code-example">
          <pre><code>// Parent coordinating communication between siblings
function Parent() {
  // Shared state used by both children
  const [sharedData, setSharedData] = useState('');
  
  return (
    &lt;div className="parent"&gt;
      &lt;SiblingA onSend={setSharedData} /&gt;
      &lt;SiblingB receivedData={sharedData} /&gt;
    &lt;/div&gt;
  );
}

// First sibling sends data
function SiblingA({ onSend }) {
  const sendData = () => {
    onSend('Hello from Sibling A');
  };
  
  return &lt;button onClick={sendData}&gt;Send to Sibling B&lt;/button&gt;;
}

// Second sibling receives data
function SiblingB({ receivedData }) {
  return &lt;p&gt;Received: {receivedData || 'Nothing yet'}&lt;/p&gt;;
}</code></pre>
        </div>
        
        <h4>Cross-Component Communication</h4>
        <p>For communication between components that aren't closely related, frameworks typically use state management solutions or event systems.</p>
        
        <p>These mechanisms solve specific challenges in larger applications:</p>
        <ul>
          <li><strong>Prop Drilling Prevention:</strong> Avoids passing props through multiple layers of components</li>
          <li><strong>Distant Component Communication:</strong> Allows components far apart in the tree to share data</li>
          <li><strong>Application-Wide Events:</strong> Enables components to respond to events regardless of their position</li>
          <li><strong>Decoupled Architecture:</strong> Components can communicate without direct knowledge of each other</li>
          <li><strong>Global State Access:</strong> Provides a way to access shared state from anywhere in the application</li>
        </ul>
        
        <div class="code-example">
          <pre><code>// Example using a simple event bus (pub/sub pattern)
const EventBus = {
  events: {},
  
  subscribe(event, callback) {
    if (!this.events[event]) {
      this.events[event] = [];
    }
    this.events[event].push(callback);
    
    // Return unsubscribe function
    return () => this.unsubscribe(event, callback);
  },
  
  unsubscribe(event, callback) {
    if (this.events[event]) {
      this.events[event] = this.events[event]
        .filter(cb => cb !== callback);
    }
  },
  
  publish(event, data) {
    if (this.events[event]) {
      this.events[event].forEach(callback => callback(data));
    }
  }
};

// Components can now communicate across the component tree
function ComponentA() {
  const sendMessage = () => {
    EventBus.publish('message', 'Hello from Component A');
  };
  
  return &lt;button onClick={sendMessage}&gt;Send Global Message&lt;/button&gt;;
}

function ComponentB() {
  const [message, setMessage] = useState('');
  
  useEffect(() => {
    // Subscribe to event
    const unsubscribe = EventBus.subscribe('message', setMessage);
    
    // Cleanup on unmount
    return unsubscribe;
  }, []);
  
  return &lt;p&gt;Received: {message || 'No message'}&lt;/p&gt;;
}</code></pre>
        </div>
        
        <div class="interview-tip">
          <p><span class="interview-icon">🎯</span> <strong>Interview Focus:</strong> Understanding component communication patterns is crucial for building maintainable applications.</p>
          <p>Key points to understand:</p>
          <ul>
            <li>Uni-directional data flow and its benefits</li>
            <li>When to use props vs. application state</li>
            <li>Patterns for handling communication between distant components</li>
            <li>Performance implications of different communication approaches</li>
            <li>Framework-specific solutions (Context API, Provide/Inject, Services)</li>
          </ul>
        </div>
      `,
          codeExample: `// Advanced Component Communication Patterns

// 1. React Context API for cross-component communication
// -----------------------------------------------------
import React, { createContext, useContext, useState } from 'react';

// Create context with default value
const UserContext = createContext({
  user: null,
  updateUser: () => {}
});

// Provider component that wraps the application
function UserProvider({ children }) {
  const [user, setUser] = useState(null);
  
  const updateUser = (newUserData) => {
    setUser(prevUser => ({
      ...prevUser,
      ...newUserData
    }));
  };
  
  // Provide value to all children
  return (
    <UserContext.Provider value={{ user, updateUser }}>
      {children}
    </UserContext.Provider>
  );
}

// Components can now access user data without prop drilling
function UserProfile() {
  // Consume the context value
  const { user } = useContext(UserContext);
  
  if (!user) return <p>Please log in</p>;
  
  return (
    <div className="profile">
      <h2>{user.name}</h2>
      <p>Email: {user.email}</p>
    </div>
  );
}

function UserSettings() {
  const { user, updateUser } = useContext(UserContext);
  
  const updateEmail = (e) => {
    updateUser({ email: e.target.value });
  };
  
  return (
    <div className="settings">
      <h2>User Settings</h2>
      <input 
        type="email" 
        value={user?.email || ''} 
        onChange={updateEmail} 
        placeholder="Email"
      />
    </div>
  );
}

// App using the context
function App() {
  return (
    <UserProvider>
      <div className="app">
        <header>
          <UserProfile />
        </header>
        <main>
          <UserSettings />
        </main>
      </div>
    </UserProvider>
  );
}

// 2. Component Communication in Vue with Props and Events
// ------------------------------------------------------

// Parent component
<template>
  <div class="parent">
    <child-component 
      :message="parentMessage"
      @update="handleUpdate"
    />
    <p>Updated message: {{ updatedMessage }}</p>
  </div>
</template>

<script>
export default {
  data() {
    return {
      parentMessage: 'Hello from parent',
      updatedMessage: ''
    };
  },
  methods: {
    handleUpdate(newMessage) {
      this.updatedMessage = newMessage;
    }
  }
};
</script>

// Child component
<template>
  <div class="child">
    <p>{{ message }}</p>
    <button @click="sendUpdate">Update Parent</button>
  </div>
</template>

<script>
export default {
  props: {
    message: {
      type: String,
      required: true
    }
  },
  methods: {
    sendUpdate() {
      this.$emit('update', 'New message from child');
    }
  }
};
</script>


// 3. Component Communication in Angular with Input/Output
// -----------------------------------------------------

// Parent component
@Component({
  selector: 'app-parent',
  template: \`
    <div class="parent">
      <app-child 
        [message]="parentMessage"
        (update)="handleUpdate($event)"
      ></app-child>
      <p>Updated message: {{ updatedMessage }}</p>
    </div>
  \`
})
export class ParentComponent {
  parentMessage = 'Hello from parent';
  updatedMessage = '';
  
  handleUpdate(newMessage: string) {
    this.updatedMessage = newMessage;
  }
}

// Child component
@Component({
  selector: 'app-child',
  template: \`
    <div class="child">
      <p>{{ message }}</p>
      <button (click)="sendUpdate()">Update Parent</button>
    </div>
  \`
})
export class ChildComponent {
  @Input() message: string;
  @Output() update = new EventEmitter<string>();
  
  sendUpdate() {
    this.update.emit('New message from child');
  }
}


// 4. Compound Components Pattern (React)
// -------------------------------------
// This pattern allows component composition with shared state
function Tab({ children, value }) {
  return (
    <div className="tab" role="tab">
      {children}
    </div>
  );
}

function TabPanel({ children, value }) {
  return (
    <div className="tab-panel" role="tabpanel">
      {children}
    </div>
  );
}

function Tabs({ children, value, onChange }) {
  // Create the shared context
  const context = { value, onChange };
  
  // Clone children with additional props
  return (
    <div className="tabs-container">
      {React.Children.map(children, child => 
        React.cloneElement(child, { ...context })
      )}
    </div>
  );
}

// Usage
function TabsExample() {
  const [activeTab, setActiveTab] = useState('tab1');
  
  return (
    <Tabs value={activeTab} onChange={setActiveTab}>
      <div className="tabs-header">
        <Tab value="tab1">Tab 1</Tab>
        <Tab value="tab2">Tab 2</Tab>
      </div>
      <div className="tabs-content">
        <TabPanel value="tab1">Content for Tab 1</TabPanel>
        <TabPanel value="tab2">Content for Tab 2</TabPanel>
      </div>
    </Tabs>
  );
}

// 5. Render Props Pattern (Advanced Component Composition)
// ------------------------------------------------------
function DataFetcher({ url, render }) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  useEffect(() => {
    setLoading(true);
    fetch(url)
      .then(res => res.json())
      .then(data => {
        setData(data);
        setLoading(false);
      })
      .catch(err => {
        setError(err);
        setLoading(false);
      });
  }, [url]);
  
  // Let the consumer decide how to render
  return render({ data, loading, error });
}

// Usage
function UserList() {
  return (
    <DataFetcher
      url="/api/users"
      render={({ data, loading, error }) => {
        if (loading) return <p>Loading users...</p>;
        if (error) return <p>Error: {error.message}</p>;
        if (!data) return <p>No users found</p>;
        
        return (
          <ul>
            {data.map(user => (
              <li key={user.id}>{user.name}</li>
            ))}
          </ul>
        );
      }}
    />
  );
}`,
          exercise: {
            instructions:
              'Create an e-commerce product page with multiple related components that communicate effectively. Implement: 1) A ProductDetails component that displays product information, 2) A ProductVariants component that lets users select different options (color, size), 3) A ProductReviews component for displaying and adding reviews, and 4) A ShoppingCart component that updates when items are added. Ensure these components communicate appropriately using props, callbacks, context, or a state manager.',
          },
        },
      ],
      prepperSummary: `
    <div class="prepper-summary">
      <h3>🔑 Key Interview Takeaways</h3>
      <ul>
        <li><strong>Component Structure:</strong> Components are reusable building blocks containing UI elements, logic, and state, designed to be composable and maintainable.</li>
        
        <li><strong>Props and Data Flow:</strong> Data flows down from parent to child components through props, creating a unidirectional data flow that makes applications easier to reason about.</li>
        
        <li><strong>Component Composition:</strong> Complex UIs are built by composing simpler components, allowing for code reuse and better separation of concerns.</li>
        
        <li><strong>Communication Patterns:</strong> Components communicate through props/callbacks (parent-child), shared state (siblings), or global state systems (distant components).</li>
        
        <li><strong>Architecture Patterns:</strong> Common patterns like presentational/container components, compound components, and render props provide solutions for different component design scenarios.</li>
      </ul>
      
      <h4>📝 Common Interview Questions</h4>
      <ol>
        <li>"What principles guide your approach to breaking a UI into components?"</li>
        <li>"How would you handle communication between components that are far apart in the component tree?"</li>
        <li>"Explain the difference between presentational and container components"</li>
        <li>"What strategies would you use to make components reusable across multiple projects?"</li>
        <li>"How would you optimize component performance in a complex application?"</li>
      </ol>
    </div>
  `,
    },

    {
      title: 'State Management',
      description: 'Learn approaches for managing application state across components.',
      sections: [
        {
          title: 'Understanding Application State',
          explanation: `
        <p>Application state represents all the dynamic data that an application needs to track, from simple UI toggles to complex data fetched from APIs.</p>
        
        <h4>Types of State</h4>
        <p>Different types of state require different management approaches based on their scope and purpose.</p>
        
        <p>Understanding these distinct types of state helps organize applications more effectively:</p>
        <ul>
          <li><strong>UI State:</strong> Controls UI elements (open/closed dropdowns, active tabs, input values, form field values)</li>
          <li><strong>Application State:</strong> Core data needed across multiple components (user profile, permissions, theme settings)</li>
          <li><strong>Server State:</strong> Data from external sources (API responses, cached data, loading/error statuses)</li>
          <li><strong>URL State:</strong> State reflected in the URL (current page, search filters, pagination parameters)</li>
          <li><strong>Form State:</strong> Values, validation status, and submission state of forms (errors, touched fields, dirty status)</li>
        </ul>
        
        <h4>Local Component State</h4>
        <p>Each framework provides a way to manage state within individual components. This is suitable for state that doesn't need to be shared.</p>
        
        <p>Local component state is ideal for:</p>
        <ul>
          <li><strong>UI-Specific State:</strong> State that only affects a single component's presentation</li>
          <li><strong>Temporary Values:</strong> Data that doesn't need to persist beyond the component's lifecycle</li>
          <li><strong>Implementation Details:</strong> Internal mechanisms that other components don't need to know about</li>
          <li><strong>Performance Optimization:</strong> Keeping state local can prevent unnecessary renders elsewhere</li>
          <li><strong>Component Isolation:</strong> Encapsulating state makes components more portable and testable</li>
        </ul>
        
        <div class="code-example">
          <pre><code>// React local state with useState hook
function Counter() {
  // Local state for this component only
  const [count, setCount] = useState(0);
  
  return (
    &lt;div&gt;
      &lt;p&gt;Count: {count}&lt;/p&gt;
      &lt;button onClick={() => setCount(count + 1)}&gt;Increment&lt;/button&gt;
    &lt;/div&gt;
  );
}</code></pre>
        </div>
        
        <h4>Lifting State Up</h4>
        <p>When multiple components need to share state, it can be "lifted" to their nearest common ancestor.</p>
        
        <p>This pattern follows these key principles:</p>
        <ul>
          <li><strong>Single Source of Truth:</strong> The parent becomes the authoritative source for shared data</li>
          <li><strong>Controlled Components:</strong> Child components become "controlled" by the parent's state</li>
          <li><strong>Data Flows Down:</strong> The shared state is passed down to children through props</li>
          <li><strong>Events Flow Up:</strong> Children request state changes by calling parent callbacks</li>
          <li><strong>Centralized Logic:</strong> State manipulation logic lives with the state itself in the parent</li>
        </ul>
        
        <div class="code-example">
          <pre><code>// Parent component with shared state
function FilterableList() {
  // State lifted to parent component
  const [searchTerm, setSearchTerm] = useState('');
  const [items, setItems] = useState([
    { id: 1, name: 'Apple' },
    { id: 2, name: 'Banana' },
    { id: 3, name: 'Cherry' }
  ]);
  
  // Derived state (filtered items)
  const filteredItems = items.filter(item =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  return (
    &lt;div&gt;
      &lt;SearchBar 
        value={searchTerm} 
        onChange={setSearchTerm} 
      /&gt;
      &lt;ItemList items={filteredItems} /&gt;
    &lt;/div&gt;
  );
}</code></pre>
        </div>
        
<div class="interview-tip">
          <p><span class="interview-icon">🎯</span> <strong>Interview Focus:</strong> Demonstrating an understanding of state management approaches shows your ability to design scalable applications.</p>
          <p>Key points to understand:</p>
          <ul>
            <li>How to determine the appropriate level for each piece of state</li>
            <li>The tradeoffs between local and global state management</li>
            <li>How to handle derived state and side effects</li>
            <li>Common pitfalls like prop drilling and state duplication</li>
            <li>Framework-specific state handling approaches</li>
          </ul>
        </div>
      `,
          codeExample: `
          // State Management Patterns in Modern Frameworks

// 1. Local Component State in React
// ---------------------------------
function TodoApp() {
  // Local state for todos
  const [todos, setTodos] = useState([
    { id: 1, text: 'Learn React', completed: false },
    { id: 2, text: 'Build todo app', completed: false }
  ]);
  
  // Event handlers to update state
  const toggleTodo = (id) => {
    setTodos(todos.map(todo => 
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ));
  };
  
  const addTodo = (text) => {
    const newTodo = {
      id: Date.now(),
      text,
      completed: false
    };
    setTodos([...todos, newTodo]);
  };
  
  const deleteTodo = (id) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };
  
  return (
    return (
      &lt;div className="todo-app"&gt;
        &lt;h1&gt;Todo App&lt;/h1&gt;
        &lt;TodoForm onSubmit={addTodo} /&gt;
        &lt;TodoList 
          todos={todos}
          onToggle={toggleTodo}
          onDelete={deleteTodo}
        /&gt;
      &lt;/div&gt;
    );
  );
}

// Supporting components
function TodoForm({ onSubmit }) {
  const [text, setText] = useState('');
  
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!text.trim()) return;
    onSubmit(text);
    setText('');
  };
  
  return (
    <form onSubmit={handleSubmit}>
      <input
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Add todo"
      />
      <button type="submit">Add</button>
    </form>
  );
}

function TodoList({ todos, onToggle, onDelete }) {
  return (
    <ul className="todo-list">
      {todos.map(todo => (
        <li key={todo.id}>
          <input
            type="checkbox"
            checked={todo.completed}
            onChange={() => onToggle(todo.id)}
          />
          <span className={todo.completed ? 'completed' : ''}>
            {todo.text}
          </span>
          <button onClick={() => onDelete(todo.id)}>Delete</button>
        </li>
      ))}
    </ul>
  );
}

// 2. Global State Management with Redux (Simplified Example)
// ---------------------------------------------------------
// Actions
const ADD_TODO = 'ADD_TODO';
const TOGGLE_TODO = 'TOGGLE_TODO';
const DELETE_TODO = 'DELETE_TODO';

// Action creators
const addTodo = (text) => ({
  type: ADD_TODO,
  payload: {
    id: Date.now(),
    text,
    completed: false
  }
});

const toggleTodo = (id) => ({
  type: TOGGLE_TODO,
  payload: { id }
});

const deleteTodo = (id) => ({
  type: DELETE_TODO,
  payload: { id }
});

// Reducer
const initialState = {
  todos: []
};

function todoReducer(state = initialState, action) {
  switch (action.type) {
    case ADD_TODO:
      return {
        ...state,
        todos: [...state.todos, action.payload]
      };
    case TOGGLE_TODO:
      return {
        ...state,
        todos: state.todos.map(todo =>
          todo.id === action.payload.id
            // Continuing from the previous part of section9.js

// In the reducer for TOGGLE_TODO:
            ? { ...todo, completed: !todo.completed }
            : todo
        )
      };
    case DELETE_TODO:
      return {
        ...state,
        todos: state.todos.filter(todo => todo.id !== action.payload.id)
      };
    default:
      return state;
  }
}

// Connected component (conceptual, not actual syntax)
function ConnectedTodoApp({ todos, addTodo, toggleTodo, deleteTodo }) {
  return (
    <div className="todo-app">
      <h1>Todo App</h1>
      <TodoForm onSubmit={addTodo} />
      <TodoList 
        todos={todos}
        onToggle={toggleTodo}
        onDelete={deleteTodo}
      />
    </div>
  );
}

// 3. Context API for Simpler State Management in React
// --------------------------------------------------
// Create context
const TodoContext = createContext();

// Context provider
function TodoProvider({ children }) {
  const [todos, setTodos] = useState([]);
  
  // State operations
  const addTodo = (text) => {
    setTodos([...todos, {
      id: Date.now(),
      text,
      completed: false
    }]);
  };
  
  const toggleTodo = (id) => {
    setTodos(todos.map(todo => 
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ));
  };
  
  const deleteTodo = (id) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };
  
  // Context value contains both state and updater functions
  const contextValue = {
    todos,
    addTodo,
    toggleTodo,
    deleteTodo
  };
  
  return (
    <TodoContext.Provider value={contextValue}>
      {children}
    </TodoContext.Provider>
  );
}

// Hook to use todo context
function useTodo() {
  const context = useContext(TodoContext);
  if (!context) {
    throw new Error('useTodo must be used within a TodoProvider');
  }
  return context;
}

// Components using the context
function TodoApp() {
  return (
    <TodoProvider>
      <div className="todo-app">
        <h1>Todo App</h1>
        <TodoForm />
        <TodoList />
      </div>
    </TodoProvider>
  );
}

function TodoForm() {
  const { addTodo } = useTodo();
  const [text, setText] = useState('');
  
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!text.trim()) return;
    addTodo(text);
    setText('');
  };
  
  return (
    <form onSubmit={handleSubmit}>
      <input
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Add todo"
      />
      <button type="submit">Add</button>
    </form>
  );
}

function TodoList() {
  const { todos, toggleTodo, deleteTodo } = useTodo();
  
  return (
    <ul className="todo-list">
      {todos.map(todo => (
        <li key={todo.id}>
          <input
            type="checkbox"
            checked={todo.completed}
            onChange={() => toggleTodo(todo.id)}
          />
          <span className={todo.completed ? 'completed' : ''}>
            {todo.text}
          </span>
          <button onClick={() => deleteTodo(todo.id)}>Delete</button>
        </li>
      ))}
    </ul>
  );
}

// 4. State Management in Vue with Vuex (Conceptual Example)

// store.js
export default new Vuex.Store({
  state: {
    todos: []
  },
  mutations: {
    ADD_TODO(state, todo) {
      state.todos.push(todo);
    },
    TOGGLE_TODO(state, id) {
      const todo = state.todos.find(todo => todo.id === id);
      if (todo) {
        todo.completed = !todo.completed;
      }
    },
    DELETE_TODO(state, id) {
      state.todos = state.todos.filter(todo => todo.id !== id);
    }
  },
  actions: {
    addTodo({ commit }, text) {
      const todo = {
        id: Date.now(),
        text,
        completed: false
      };
      commit('ADD_TODO', todo);
    },
    toggleTodo({ commit }, id) {
      commit('TOGGLE_TODO', id);
    },
    deleteTodo({ commit }, id) {
      commit('DELETE_TODO', id);
    }
  },
  getters: {
    allTodos: state => state.todos,
    completedTodos: state => state.todos.filter(todo => todo.completed),
    incompleteTodos: state => state.todos.filter(todo => !todo.completed)
  }
});

// Component using Vuex
export default {
  computed: {
    ...mapGetters(['allTodos'])
  },
  methods: {
    ...mapActions(['addTodo', 'toggleTodo', 'deleteTodo'])
  }
}


// 5. Custom State Manager with React Hooks
// ---------------------------------------
function useStore(reducer, initialState) {
  const [state, dispatch] = useReducer(reducer, initialState);
  
  // Create a store object that can be easily consumed
  const store = {
    state,
    dispatch,
    // Add selectors as needed
    getState: () => state,
    select: (selector) => selector(state)
  };
  
  return store;
}

// Usage example
function TodoAppWithCustomStore() {
  const store = useStore(todoReducer, { todos: [] });
  
  // Create action dispatchers
  const actions = {
    addTodo: (text) => store.dispatch(addTodo(text)),
    toggleTodo: (id) => store.dispatch(toggleTodo(id)),
    deleteTodo: (id) => store.dispatch(deleteTodo(id))
  };
  
  return (
    <div className="todo-app">
      <h1>Todo App</h1>
      <TodoForm onSubmit={actions.addTodo} />
      <TodoList 
        todos={store.state.todos}
        onToggle={actions.toggleTodo}
        onDelete={actions.deleteTodo}
      />
    </div>
  );
}`,
          exercise: {
            instructions:
              'Implement a shopping cart system with appropriate state management. The system should: 1) Allow adding and removing products from the cart, 2) Update quantities and calculate totals, 3) Persist the cart state across page refreshes using localStorage, 4) Provide a checkout process with order summary. Compare and implement two different state management approaches: one using local state with lifting state up, and another using a global state management solution like Context API or Redux.',
          },
        },
        {
          title: 'Advanced State Management',
          explanation: `
        <p>As applications grow more complex, more sophisticated state management approaches become necessary to handle interactions, asynchronous operations, and performance concerns.</p>
        
        <h4>Immutability in State Updates</h4>
        <p>Immutable state updates are fundamental to most state management systems, as they enable predictable state changes, easier debugging, and optimized rendering.</p>
        
        <p>The principles of immutability bring several key benefits:</p>
        <ul>
          <li><strong>Predictable Changes:</strong> Every update creates a new state object rather than modifying existing one</li>
          <li><strong>History Tracking:</strong> Previous states can be preserved for time-travel debugging</li>
          <li><strong>Change Detection:</strong> Frameworks can easily check if state changed by comparing references</li>
          <li><strong>Concurrency Safety:</strong> Prevents race conditions and unexpected side effects</li>
          <li><strong>Pure Functions:</strong> Encourages pure update functions that are easier to test and reason about</li>
        </ul>
        
        <div class="code-example">
          <pre><code>// Incorrect: Mutating state directly
function updateUserBad(user, updates) {
  // Direct mutation - hard to track changes
  user.name = updates.name;
  user.email = updates.email;
  return user; // Same reference, components might not re-render
}

// Correct: Immutable update
function updateUserGood(user, updates) {
  // Create new object with spread
  return {
    ...user,
    ...updates
  };
}

// Immutable update for nested objects
function updateAddressGood(user, address) {
  return {
    ...user,
    address: {
      ...user.address,
      ...address
    }
  };
}</code></pre>
        </div>
        
        <h4>State Normalization</h4>
        <p>Complex applications often benefit from normalizing state (similar to a database), which can improve performance and simplify updates.</p>
        
        <p>State normalization offers these advantages:</p>
        <ul>
          <li><strong>Efficient Updates:</strong> Update entities in one place without duplication</li>
          <li><strong>Consistent References:</strong> Each entity exists in only one place in state</li>
          <li><strong>Reduced Data Size:</strong> Avoids duplicating entity data across the state tree</li>
          <li><strong>Simplified Queries:</strong> Makes it easier to find and filter data based on IDs</li>
          <li><strong>Relational Modeling:</strong> Better represents relationships between entities</li>
        </ul>
        
        <div class="code-example">
          <pre><code>// Normalized state structure
const normalizedState = {
  users: {
    byId: {
      'user1': { id: 'user1', name: 'Alice', teamId: 'team1' },
      'user2': { id: 'user2', name: 'Bob', teamId: 'team1' },
      'user3': { id: 'user3', name: 'Charlie', teamId: 'team2' }
    },
    allIds: ['user1', 'user2', 'user3']
  },
  teams: {
    byId: {
      'team1': { id: 'team1', name: 'Engineering' },
      'team2': { id: 'team2', name: 'Design' }
    },
    allIds: ['team1', 'team2']
  }
};

// Easier to update a specific user
function updateUser(state, userId, updates) {
  return {
    ...state,
    users: {
      ...state.users,
      byId: {
        ...state.users.byId,
        [userId]: {
          ...state.users.byId[userId],
          ...updates
        }
      }
    }
  };
}</code></pre>
        </div>
        
        <h4>Managing Side Effects</h4>
        <p>Frameworks offer various approaches to handle side effects like API calls, which shouldn't be mixed directly with state updates.</p>
        
        <p>Separating side effects from state management provides these benefits:</p>
        <ul>
          <li><strong>Pure Reducers:</strong> State update logic remains pure and predictable</li>
          <li><strong>Testability:</strong> Side effects can be tested separately from state transitions</li>
          <li><strong>Centralized Logic:</strong> Side effect code is organized in specific places</li>
          <li><strong>Cancellation:</strong> Long-running operations can be cancelled when needed</li>
          <li><strong>Error Handling:</strong> Errors in side effects can be caught and processed appropriately</li>
        </ul>
        
        <div class="code-example">
          <pre><code>// React: useEffect for side effects
function UserProfile({ userId }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  useEffect(() => {
    // Reset state when userId changes
    setLoading(true);
    setError(null);
    
    // Fetch user data
    fetchUser(userId)
      .then(data => {
        setUser(data);
        setLoading(false);
      })
      .catch(err => {
        setError(err);
        setLoading(false);
      });
  }, [userId]); // Re-run effect when userId changes
  
  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;
  if (!user) return <div>No user found</div>;
  
  return (
    &lt;div&gt;
      &lt;h2&gt;{user.name}&lt;/h2&gt;
      &lt;p&gt;Email: {user.email}&lt;/p&gt;
    &lt;/div&gt;
  );
}</code></pre>
        </div>
        
        <div class="interview-tip">
          <p><span class="interview-icon">🎯</span> <strong>Interview Focus:</strong> Advanced state management showcases your ability to handle complex application needs.</p>
          <p>Key points to understand:</p>
          <ul>
            <li>The importance of immutability in modern frameworks</li>
            <li>How to structure state for performance and maintainability</li>
            <li>Techniques for handling async operations within state management</li>
            <li>The role of middleware and other enhancers</li>
            <li>Performance optimization for state-heavy applications</li>
          </ul>
        </div>
      `,
          codeExample: `// Advanced State Management Techniques

// 1. State Normalization and Selectors
// -----------------------------------
// Initial state for a recipe app
const initialState = {
  recipes: {
    byId: {},
    allIds: [],
    loading: false,
    error: null
  },
  ingredients: {
    byId: {},
    allIds: []
  },
  users: {
    byId: {},
    currentUserId: null
  },
  ui: {
    selectedRecipeId: null,
    searchTerm: '',
    filters: {
      vegetarian: false,
      glutenFree: false
    }
  }
};

// Selectors to derive data from normalized state
const selectors = {
  // Get all recipes as an array
  getRecipes: state => 
    state.recipes.allIds.map(id => state.recipes.byId[id]),
  
  // Get a specific recipe with its ingredients
  getRecipeWithIngredients: state => recipeId => {
    const recipe = state.recipes.byId[recipeId];
    if (!recipe) return null;
    
    // Add ingredient details to recipe
    return {
      ...recipe,
      ingredients: recipe.ingredientIds.map(id => 
        state.ingredients.byId[id]
      )
    };
  },
  
  // Get current user
  getCurrentUser: state => 
    state.users.currentUserId ? state.users.byId[state.users.currentUserId] : null,
  
  // Get filtered recipes
  getFilteredRecipes: state => {
    const { searchTerm, filters } = state.ui;
    const recipes = selectors.getRecipes(state);
    
    return recipes.filter(recipe => {
      // Filter by search term
      if (searchTerm && !recipe.title.toLowerCase().includes(searchTerm.toLowerCase())) {
        return false;
      }
      
      // Filter by dietary restrictions
      if (filters.vegetarian && !recipe.vegetarian) {
        return false;
      }
      
      if (filters.glutenFree && !recipe.glutenFree) {
        return false;
      }
      
      return true;
    });
  }
};

// 2. Handling Side Effects with Redux Thunk (Conceptual Example)
// ------------------------------------------------------------
// Action creators
const actionCreators = {
  // Synchronous actions
  setLoading: (loading) => ({
    type: 'SET_LOADING',
    payload: loading
  }),
  
  setError: (error) => ({
    type: 'SET_ERROR',
    payload: error
  }),
  
  setRecipes: (recipes) => ({
    type: 'SET_RECIPES',
    payload: recipes
  }),
  
  // Asynchronous action creator (thunk)
  fetchRecipes: () => async (dispatch, getState) => {
    try {
      dispatch(actionCreators.setLoading(true));
      
      // API call
      const response = await fetch('/api/recipes');
      
      if (!response.ok) {
        throw new Error('Failed to fetch recipes');
      }
      
      const recipes = await response.json();
      
      // Normalize the recipes
      const normalized = normalizeRecipes(recipes);
      
      dispatch(actionCreators.setRecipes(normalized));
    } catch (error) {
      dispatch(actionCreators.setError(error.message));
    } finally {
      dispatch(actionCreators.setLoading(false));
    }
  },
  
  // Another thunk for adding a recipe with optimistic update
  addRecipe: (recipe) => async (dispatch, getState) => {
    // Generate temporary ID
    const tempId = 'temp_' + Date.now();
    
    // Optimistic update
    dispatch({
      type: 'ADD_RECIPE',
      payload: {
        ...recipe,
        id: tempId,
        status: 'pending'
      }
    });
    
    try {
      // API call
      const response = await fetch('/api/recipes', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(recipe)
      });
      
      if (!response.ok) {
        throw new Error('Failed to add recipe');
      }
      
      const savedRecipe = await response.json();
      
      // Update with real data
      dispatch({
        type: 'UPDATE_RECIPE',
        payload: {
          tempId,
          recipe: {
            ...savedRecipe,
            status: 'saved'
          }
        }
      });
    } catch (error) {
      // Mark as failed
      dispatch({
        type: 'UPDATE_RECIPE',
        payload: {
          id: tempId,
          recipe: {
            ...recipe,
            status: 'failed',
            error: error.message
          }
        }
      });
      
      // Show error to user
      dispatch(actionCreators.setError(error.message));
    }
  }
};

// Helper to normalize recipes
function normalizeRecipes(recipes) {
  const byId = {};
  const allIds = [];
  
  recipes.forEach(recipe => {
    allIds.push(recipe.id);
    byId[recipe.id] = recipe;
  });
  
  return { byId, allIds };
}

// 3. Custom Hooks for State Management in React
// -------------------------------------------
// Creating a custom hook for form state
function useForm(initialValues, validate) {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Reset form
  const reset = () => {
    setValues(initialValues);
    setErrors({});
    setTouched({});
    setIsSubmitting(false);
  };
  
  // Update specific field
  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues({
      ...values,
      [name]: value
    });
  };
  
  // Mark field as touched on blur
  const handleBlur = (e) => {
    const { name } = e.target;
    setTouched({
      ...touched,
      [name]: true
    });
    
    // Validate field on blur
    if (validate) {
      const validationErrors = validate(values);
      setErrors(validationErrors);
    }
  };
  
  // Handle form submission
  const handleSubmit = async (onSubmit) => {
    try {
      setIsSubmitting(true);
      
      // Validate all fields
      if (validate) {
        const validationErrors = validate(values);
        setErrors(validationErrors);
        
        // Mark all fields as touched
        const allTouched = Object.keys(values).reduce((acc, key) => {
          acc[key] = true;
          return acc;
        }, {});
        setTouched(allTouched);
        
        // Stop if there are errors
        if (Object.keys(validationErrors).length > 0) {
          setIsSubmitting(false);
          return;
        }
      }
      
      // Call submission handler
      await onSubmit(values);
      reset();
    } catch (error) {
      setErrors({ form: error.message });
      setIsSubmitting(false);
    }
  };
  
  return {
    values,
    errors,
    touched,
    isSubmitting,
    handleChange,
    handleBlur,
    handleSubmit,
    reset
  };
}

// Using the form hook
function RecipeForm({ onSubmit }) {
  const { 
    values, 
    errors, 
    touched, 
    isSubmitting, 
    handleChange, 
    handleBlur, 
    handleSubmit 
  } = useForm(
    // Initial values
    { title: '', description: '', ingredients: '' },
    // Validation function
    (values) => {
      const errors = {};
      if (!values.title) errors.title = 'Title is required';
      if (!values.ingredients) errors.ingredients = 'Ingredients are required';
      return errors;
    }
  );
  
  return (
    <form onSubmit={(e) => {
      e.preventDefault();
      handleSubmit(onSubmit);
    }}>
      <div>
        <label htmlFor="title">Title</label>
        <input
          id="title"
          name="title"
          value={values.title}
          onChange={handleChange}
          onBlur={handleBlur}
        />
        {touched.title && errors.title && (
          <div className="error">{errors.title}</div>
        )}
      </div>
      
      {/* Other form fields */}
      
      <button type="submit" disabled={isSubmitting}>
        {isSubmitting ? 'Submitting...' : 'Submit Recipe'}
      </button>
    </form>
  );
}

// 4. State Machines for Complex UI State
// ------------------------------------
// Simple state machine for a checkout process
const checkoutMachine = {
  initial: 'cart',
  states: {
    cart: {
      on: {
        CHECKOUT: 'information'
      }
    },
    information: {
      on: {
        BACK: 'cart',
        CONTINUE: 'shipping'
      }
    },
    shipping: {
      on: {
        BACK: 'information',
        CONTINUE: 'payment'
      }
    },
    payment: {
      on: {
        BACK: 'shipping',
        COMPLETE: 'confirmation'
      }
    },
    confirmation: {
      on: {
        NEW_ORDER: 'cart'
      }
    }
  }
};

// Hook for using the state machine
function useCheckout() {
  const [state, setState] = useState(checkoutMachine.initial);
  
  const send = (event) => {
    const currentState = checkoutMachine.states[state];
    const nextState = currentState.on[event];
    
    if (nextState) {
      setState(nextState);
      return true;
    }
    return false;
  };
  
  return { state, send };
}

// Component using the checkout state machine
function CheckoutProcess() {
  const { state, send } = useCheckout();
  
  return (
    <div className="checkout">
      <div className="checkout-steps">
        <div className={\`step \${state === 'cart' ? 'active' : ''}\`}>Cart</div>
        <div className={\`step \${state === 'information' ? 'active' : ''}\`}>Information</div>
        <div className={\`step \${state === 'confirmation' ? 'active' : ''}\`}>Confirmation</div>
        <div className={\`step \${state === 'shipping' ? 'active' : ''}\`}>Shipping</div>
        <div className={\`step \${state === 'payment' ? 'active' : ''}\`}>Payment</div>
      </div>
      
      {state === 'cart' && (
        <CartScreen onCheckout={() => send('CHECKOUT')} />
      )}
      
      {state === 'information' && (
        <InformationScreen 
          onBack={() => send('BACK')}
          onContinue={() => send('CONTINUE')}
        />
      )}
      
      {/* Other screens based on state */}
    </div>
  );
}`,
          exercise: {
            instructions:
              'Create an advanced state management system for a media player application. Implement: 1) A normalized state structure for the media library with albums, artists, and tracks, 2) Selectors to derive various views of the data (e.g., tracks by artist, albums by year), 3) Side effect handling for fetching media and controlling playback, 4) Optimistic UI updates when adding ratings or favorites, and 5) A state machine to manage the player states (loading, playing, paused, stopped, buffering).',
          },
        },
      ],
      prepperSummary: `
    <div class="prepper-summary">
      <h3>🔑 Key Interview Takeaways</h3>
      <ul>
        <li><strong>State Types:</strong> Understand the different types of state (UI state, application state, server state) and appropriate management strategies for each.</li>
        
        <li><strong>Local vs. Global:</strong> Know when to use component-local state versus application-wide state management solutions based on sharing needs and complexity.</li>
        
        <li><strong>Unidirectional Flow:</strong> State flows down the component tree while events flow up, creating a predictable data flow that makes applications easier to reason about.</li>
        
        <li><strong>Immutability:</strong> State should be treated as immutable by creating new objects/arrays rather than modifying existing ones, enabling better change detection and debugging.</li>
        
        <li><strong>Performance:</strong> Normalize complex state, use memoization, and implement selective rendering to maintain performance in state-heavy applications.</li>
      </ul>
      
      <h4>📝 Common Interview Questions</h4>
      <ol>
        <li>"How do you decide when to use local component state versus a global state management solution?"</li>
        <li>"Explain your approach to managing asynchronous operations within state management"</li>
        <li>"How would you handle form state in a complex application?"</li>
        <li>"What strategies would you use to optimize performance in an application with a lot of state?"</li>
        <li>"How would you structure state to represent a complex domain model with relationships?"</li>
      </ol>
    </div>
  `,
    },

    {
      title: 'Routing',
      description: 'Learn how to implement client-side routing in single-page applications.',
      sections: [
        {
          title: 'Client-Side Routing Basics',
          explanation: `
        <p>Client-side routing allows single-page applications (SPAs) to navigate between different views without full page reloads, providing a smoother user experience.</p>
        
<h4>How Client-Side Routing Works</h4>
        <p>Unlike traditional web applications where the server handles routing, SPAs manage navigation on the client-side using browser history APIs.</p>
        
        <p>Client-side routing offers significant advantages over traditional server routing:</p>
        <ul>
          <li><strong>Faster Navigation:</strong> Only data changes without full page reloads, resulting in snappier transitions</li>
          <li><strong>Preserved State:</strong> Application state can be maintained across route changes</li>
          <li><strong>Reduced Server Load:</strong> Server only needs to provide data (often as JSON) rather than complete HTML pages</li>
          <li><strong>Animation Support:</strong> Smooth transitions between views can be implemented</li>
          <li><strong>Offline Capability:</strong> Some routes can work without server connectivity</li>
        </ul>
        
        <div class="code-example">
          <pre><code>// Core browser history API
// Navigate to a new URL without reloading the page
window.history.pushState({}, 'Page Title', '/new-url');

// Replace current URL (no new history entry)
window.history.replaceState({}, 'Page Title', '/replaced-url');

// Go back in history
window.history.back();

// Go forward in history
window.history.forward();

// Listen for navigation changes
window.addEventListener('popstate', (event) => {
  // Handle navigation
  console.log('Current URL:', window.location.pathname);
  console.log('State:', event.state);
});</code></pre>
        </div>
        
        <h4>Basic Router Implementation</h4>
        <p>Most frameworks provide routing libraries, but understanding the core concepts helps with customization and troubleshooting.</p>
        
        <p>A basic router needs to handle these key responsibilities:</p>
        <ul>
          <li><strong>URL Parsing:</strong> Extract path and query parameters from the current URL</li>
          <li><strong>Route Matching:</strong> Determine which component/view should be rendered based on the URL</li>
          <li><strong>History Management:</strong> Update the browser history when navigation occurs</li>
          <li><strong>Navigation Listening:</strong> React to browser back/forward button usage</li>
          <li><strong>Link Interception:</strong> Prevent default link behavior to handle navigation in JavaScript</li>
        </ul>
        
        <div class="code-example">
          <pre><code>// Simple router implementation
class Router {
  constructor() {
    this.routes = [];
    
    // Listen for navigation events
    window.addEventListener('popstate', this.handlePopState.bind(this));
  }
  
  // Register a route
  addRoute(path, component) {
    this.routes.push({ path, component });
  }
  
  // Navigate to route
  navigate(path) {
    window.history.pushState({}, '', path);
    this.handlePopState();
  }
  
  // Handle navigation event
  handlePopState() {
    const path = window.location.pathname;
    
    // Find matching route
    const route = this.routes.find(route => route.path === path);
    
    if (route) {
      this.renderComponent(route.component);
    } else {
      this.renderComponent(() => '&lt;h1&gt;Page Not Found&lt;/h1&gt;');
    }
  }
  
  // Render the matching component
  renderComponent(component) {
    document.getElementById('app').innerHTML = component();
  }
}</code></pre>
        </div>
        
        <h4>Route Parameters</h4>
        <p>Routes often need to capture dynamic segments to display specific data based on the URL.</p>
        
        <p>Dynamic route parameters enable several important capabilities:</p>
        <ul>
          <li><strong>Resource Identification:</strong> Identify specific items (e.g., <code>/products/:productId</code>)</li>
          <li><strong>Shareable Deep Links:</strong> Create URLs that point to specific application states</li>
          <li><strong>SEO Benefits:</strong> Search engines can index specific content pages</li>
          <li><strong>Bookmarking:</strong> Users can bookmark specific views or resources</li>
          <li><strong>Analytics Tracking:</strong> Paths with parameters help track user navigation patterns</li>
        </ul>
        
        <div class="code-example">
          <pre><code>// Route with parameters
// Example URL: /users/123/profile

// Route pattern
const routePattern = '/users/:userId/profile';

// Function to match URL and extract params
function matchRoute(pattern, pathname) {
  // Convert pattern to regex
  const regexPattern = pattern
    .replace(/:[^\\/]+/g, '([^/]+)')
    .replace(/\\//g, '\\/');
  
  const regex = new RegExp('^' + regexPattern + '$');
  const match = pathname.match(regex);
  
  if (!match) {
    return null;
  }
  
  // Extract parameter names
  const paramNames = (pattern.match(/:[^\\/]+/g) || [])
    .map(param => param.substr(1));
  
  // Create params object
  const params = {};
  paramNames.forEach((name, index) => {
    params[name] = match[index + 1];
  });
  
  return params;
}

// Example
const params = matchRoute('/users/:userId/profile', '/users/123/profile');
console.log(params); // { userId: '123' }</code></pre>
        </div>
        
        <div class="interview-tip">
          <p><span class="interview-icon">🎯</span> <strong>Interview Focus:</strong> Understanding client-side routing demonstrates your ability to build modern single-page applications.</p>
          <p>Key points to understand:</p>
          <ul>
            <li>The difference between server-side and client-side routing</li>
            <li>How the browser history API enables SPA navigation</li>
            <li>Common routing patterns and their implementations</li>
            <li>Handling route parameters and query strings</li>
            <li>Route-based code splitting for performance</li>
          </ul>
        </div>
      `,
          codeExample: `// Routing Implementation in Modern Frameworks

// 1. Basic Routing in React Router
// -------------------------------
import React from 'react';
import { BrowserRouter, Routes, Route, Link, useParams, Navigate } from 'react-router-dom';

// Simple components for different routes
const Home = () => <h1>Home Page</h1>;
const About = () => <h1>About Us</h1>;

// Component with route parameters
const UserProfile = () => {
  // Get route parameters
  const { userId } = useParams();
  
  return (
    <div>
      <h1>User Profile</h1>
      <p>User ID: {userId}</p>
    </div>
  );
  return (
    <div>
      <SearchBar
        value={searchTerm}
        onChange={setSearchTerm}
      />
      <ItemList items={filteredItems} />
    </div>
  );

// Component with nested routes
const Products = () => {
  return (
    <div>
      <h1>Products</h1>
      <nav>
        <Link to="featured">Featured</Link>
        <Link to="new">New Arrivals</Link>
      </nav>
      <Routes>
        <Route path="/" element={<p>Select a category</p>} />
        <Route path="featured" element={<p>Featured Products</p>} />
        <Route path="new" element={<p>New Arrivals</p>} />
      </Routes>
    </div>
  );
};

// Not found page
const NotFound = () => <h1>404 - Page Not Found</h1>;

// Protected route
const ProtectedRoute = ({ element }) => {
  const isAuthenticated = checkIfUserIsAuthenticated();
  
  return isAuthenticated ? element : <Navigate to="/login" />;
};

// Main app with routes
function App() {
  return (
    <BrowserRouter>
      <nav>
        <Link to="/">Home</Link>
        <Link to="/about">About</Link>
        <Link to="/products">Products</Link>
        <Link to="/users/123">User Profile</Link>
      </nav>
      
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/products/*" element={<Products />} />
        <Route path="/users/:userId" element={<UserProfile />} />
        <Route path="/admin" element={<ProtectedRoute element={<AdminDashboard />} />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

// 2. Route Guards and Navigation
// -----------------------------
// Function to check authentication
function checkIfUserIsAuthenticated() {
  // In a real app, check for a valid token in localStorage or cookies
  return localStorage.getItem('authToken') !== null;
}

// Custom hook for protected routes
function useAuth() {
  const [isAuthenticated, setIsAuthenticated] = useState(
    checkIfUserIsAuthenticated()
  );
  
  const login = (token) => {
    localStorage.setItem('authToken', token);
    setIsAuthenticated(true);
  };
  
  const logout = () => {
    localStorage.removeItem('authToken');
    setIsAuthenticated(false);
  };
  
  return { isAuthenticated, login, logout };
}

// Login component with programmatic navigation
function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [credentials, setCredentials] = useState({ username: '', password: '' });
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials({ ...credentials, [name]: value });
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      // In a real app, call an API
      const response = await fakeLoginApi(credentials);
      
      // Save token and update auth state
      login(response.token);
      
      // Redirect to intended destination or dashboard
      const from = new URLSearchParams(location.search).get('from') || '/dashboard';
      navigate(from, { replace: true });
    } catch (error) {
      alert('Login failed: ' + error.message);
    }
  };
  
  return (
    <form onSubmit={handleSubmit}>
      <h1>Login</h1>
      <input 
        name="username" 
        value={credentials.username}
        onChange={handleChange}
        placeholder="Username"
      />
      <input 
        name="password" 
        type="password"
        value={credentials.password}
        onChange={handleChange}
        placeholder="Password"
      />
      <button type="submit">Login</button>
    </form>
  );
}

// 3. Handling URL Parameters and Query Strings
// ------------------------------------------
function SearchPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [results, setResults] = useState([]);
  
  // Get query parameters
  const query = searchParams.get('q') || '';
  const category = searchParams.get('category') || 'all';
  const page = parseInt(searchParams.get('page') || '1');
  
  // Fetch results when parameters change
  useEffect(() => {
    if (query) {
      fetchSearchResults(query, category, page)
        .then(data => setResults(data));
    }
  }, [query, category, page]);
  
  // Update search parameters
  const handleSearch = (newQuery) => {
    setSearchParams({ 
      q: newQuery, 
      category, 
      page: 1 // Reset to first page on new search
    });
  };
  
  const handleCategoryChange = (newCategory) => {
    setSearchParams({ q: query, category: newCategory, page: 1 });
  };
  
  const handleNextPage = () => {
    setSearchParams({ q: query, category, page: page + 1 });
  };
  
  return (
    <div>
      <h1>Search Results</h1>
      <input 
        value={query}
        onChange={(e) => handleSearch(e.target.value)}
        placeholder="Search..."
      />
      
      <select 
        value={category}
        onChange={(e) => handleCategoryChange(e.target.value)}
      >
        <option value="all">All Categories</option>
        <option value="products">Products</option>
        <option value="articles">Articles</option>
      </select>
      
      <div className="results">
        {results.map(result => (
          <div key={result.id} className="result-item">
            {result.title}
          </div>
        ))}
      </div>
      
      <div className="pagination">
        <span>Page {page}</span>
        <button onClick={handleNextPage}>Next Page</button>
      </div>
    </div>
  );
}`,
          exercise: {
            instructions:
              'Create a client-side routing system for a content management application. Implement: 1) A main navigation with routes for Dashboard, Articles, Media, and Settings, 2) Nested routes for article management (List, Create, Edit, Preview), 3) URL parameters for editing specific articles by ID, 4) Query string handling for filtering and pagination, 5) Route guards to protect admin-only sections, and 6) Loading states for routes that require data fetching.',
          },
        },
        {
          title: 'Advanced Routing Patterns',
          explanation: `
        <p>Beyond basic routing, modern applications require more sophisticated routing patterns to handle complex navigation scenarios.</p>
        
        <h4>Nested Routes</h4>
        <p>Nested routes allow for hierarchical UI structures where child components can have their own routing.</p>
        
        <p>Nested routing provides several powerful capabilities:</p>
        <ul>
          <li><strong>UI Hierarchy:</strong> Creates a visual hierarchy that matches the URL structure</li>
          <li><strong>Shared Context:</strong> Parent routes can provide context for their children</li>
          <li><strong>Partial Updates:</strong> Only portions of the screen update when child routes change</li>
          <li><strong>Composition:</strong> Complex UIs can be built from independent routing modules</li>
          <li><strong>Code Organization:</strong> Routes can be organized in a structure mirroring the application's features</li>
        </ul>
        
        <div class="code-example">
          <pre><code>// Nested routes in React Router
function Products() {
  return (
    <div>
      &lt;h1&gt;Products&lt;/h1&gt;
      
      &lt;nav&gt;
        &lt;Link to=""&gt;All Products&lt;/Link&gt;
        &lt;Link to="featured"&gt;Featured&lt;/Link&gt;
        &lt;Link to="categories"&gt;Categories&lt;/Link&gt;
      &lt;/nav&gt;
      
      &lt;!-- Nested routes --&gt;
      &lt;Routes&gt;
        &lt;Route path="/" element={&lt;AllProducts /&gt;} /&gt;
        &lt;Route path="featured" element={&lt;FeaturedProducts /&gt;} /&gt;
        &lt;Route path="categories" element={&lt;Categories /&gt;} /&gt;
      &lt;/Routes&gt;
    &lt;/div&gt;
  );
}

// Further nesting
function Categories() {
  return (
    <div>
      &lt;h2&gt;Categories&lt;/h2&gt;
      &lt;nav&gt;
        &lt;Link to="electronics"&gt;Electronics&lt;/Link&gt;
        &lt;Link to="clothing"&gt;Clothing&lt;/Link&gt;
      &lt;/nav&gt;
      
      &lt;!-- Even more nested routes --&gt;
      &lt;Routes&gt;
        &lt;Route path="/" element={&lt;CategoryList /&gt;} /&gt;
        &lt;Route path=":category" element={&lt;CategoryDetail /&gt;} /&gt;
      &lt;/Routes&gt;
    &lt;/div&gt;
  );
}</code></pre>
        </div>
        
        <h4>Route Guards</h4>
        <p>Route guards control access to certain routes based on conditions like authentication status.</p>
        
        <p>Implementing route guards helps with:</p>
        <ul>
          <li><strong>Access Control:</strong> Restrict access to sensitive areas based on permissions</li>
          <li><strong>Authentication Flow:</strong> Redirect unauthenticated users to login pages</li>
          <li><strong>User Experience:</strong> Prevent users from accessing routes they don't have permission for</li>
          <li><strong>State Preservation:</strong> Store intended destinations for post-authentication redirects</li>
          <li><strong>Progressive Disclosure:</strong> Show different navigation options based on user status</li>
        </ul>
        
        <div class="code-example">
          <pre><code>// Route guard implementation
function PrivateRoute({ element, redirectTo = '/login' }) {
  const isAuthenticated = checkAuth();
  
  // Redirect if not authenticated
  if (!isAuthenticated) {
    // Store the attempted URL for post-login redirect
    const currentPath = window.location.pathname;
    const loginUrl = \`\${redirectTo}?redirect=\${encodeURIComponent(currentPath)}\`;
    
    return <Navigate to={loginUrl} />;
  }
  
  // Render the protected component if authenticated
  return element;
}

// Usage in routes
<Route 
  path="/admin" 
  element={<PrivateRoute element={<AdminDashboard />} />} 
/></code></pre>
        </div>
        
        <h4>Route-Based Code Splitting</h4>
        <p>Route-based code splitting improves performance by loading only the code needed for the current route.</p>
        
        <p>This approach offers significant performance benefits:</p>
        <ul>
          <li><strong>Reduced Initial Load Time:</strong> Only the core application and current route code is loaded first</li>
          <li><strong>Smaller Bundle Sizes:</strong> Each route's code is split into separate chunks</li>
          <li><strong>Progressive Loading:</strong> Additional routes load on demand as users navigate</li>
          <li><strong>Caching Benefits:</strong> Browsers can cache individual route bundles</li>
          <li><strong>Prioritized Resources:</strong> Critical path rendering happens faster with focused loading</li>
        </ul>
        
        <div class="code-example">
          <pre><code>// React lazy loading
import React, { lazy, Suspense } from 'react';

// Lazily load components
const Home = lazy(() => import('./pages/Home'));
const About = lazy(() => import('./pages/About'));
const UserProfile = lazy(() => import('./pages/UserProfile'));

function App() {
  return (
    &lt;BrowserRouter&gt;
      &lt;Suspense fallback={&lt;div&gt;Loading...&lt;/div&gt;}&gt;
        &lt;Routes&gt;
          &lt;Route path="/" element={&lt;Home /&gt;} /&gt;
          &lt;Route path="/about" element={&lt;About /&gt;} /&gt;
          &lt;Route path="/users/:id" element={&lt;UserProfile /&gt;} /&gt;
        &lt;/Routes&gt;
      &lt;/Suspense&gt;
    &lt;/BrowserRouter&gt;
  );
}</code></pre>
        </div>
        
        <div class="interview-tip">
          <p><span class="interview-icon">🎯</span> <strong>Interview Focus:</strong> Advanced routing demonstrates your ability to build sophisticated navigation systems.</p>
          <p>Key points to understand:</p>
          <ul>
            <li>How to implement nested routes and why they're useful</li>
            <li>Setting up route guards for protected content</li>
            <li>Performance optimization with route-based code splitting</li>
            <li>Handling route transitions and animations</li>
            <li>Design patterns for complex routing scenarios</li>
          </ul>
        </div>
      `,
          codeExample: `// Advanced Routing Patterns in Modern Applications

// 1. Nested Routes with Breadcrumbs
// --------------------------------
function ProductsModule() {
  return (
    <div className="products-module">
      <BreadcrumbTrail />
      
      <Routes>
        <Route path="/" element={<ProductList />} />
        <Route path="categories" element={<Categories />}>
          <Route path=":categoryId" element={<CategoryDetail />}>
            <Route path="products/:productId" element={<ProductDetail />} />
          </Route>
        </Route>
      </Routes>
    </div>
  );
}

// Breadcrumb component that dynamically shows the current route hierarchy
function BreadcrumbTrail() {
  const location = useLocation();
  const navigate = useNavigate();
  
  // Helper to convert paths to readable names
  const formatPathSegment = (segment) => {
    if (segment.startsWith(':')) return '';
    return segment.charAt(0).toUpperCase() + segment.slice(1);
  };
  
  // Generate breadcrumb items
  const generateBreadcrumbs = () => {
    const pathSegments = location.pathname.split('/').filter(Boolean);
    let currentPath = '';
    
    return pathSegments.map((segment, index) => {
      currentPath += \`/\${segment}\`;
      
      // Skip dynamic segments
      if (segment.match(/^\\d+$/)) return null;
      
      return {
        label: formatPathSegment(segment),
        path: currentPath,
        isLast: index === pathSegments.length - 1
      };
    }).filter(Boolean);
  };
  
  const breadcrumbs = generateBreadcrumbs();
  
  if (breadcrumbs.length <= 1) return null;
  
  return (
    <nav className="breadcrumbs">
      <Link to="/">Home</Link>
      {breadcrumbs.map((crumb, index) => (
        <span key={crumb.path}>
          <span className="separator">/</span>
          {crumb.isLast ? (
            <span className="current">{crumb.label}</span>
          ) : (
            <Link to={crumb.path}>{crumb.label}</Link>
          )}
        </span>
      ))}
    </nav>
  );
}

// 2. Advanced Route Guards
// -----------------------
// Permission-based route guard
function PermissionGuard({ element, requiredPermission }) {
  const { user } = useAuth();
  
  // Check if user has required permission
  const hasPermission = user && user.permissions && 
    user.permissions.includes(requiredPermission);
  
  if (!user) {
    // Not logged in
    return <Navigate to="/login" state={{ from: location.pathname }} />;
  }
  
  if (!hasPermission) {
    // Logged in but doesn't have permission
    return <Navigate to="/unauthorized" />;
  }
  
  // User has permission
  return element;
}

// Role-based route guard
function RoleGuard({ element, allowedRoles }) {
  const { user } = useAuth();
  
  // Check if user has an allowed role
  const hasAllowedRole = user && allowedRoles.includes(user.role);
  
  if (!user) {
    // Not logged in
    return <Navigate to="/login" state={{ from: location.pathname }} />;
  }
  
  if (!hasAllowedRole) {
    // Logged in but doesn't have required role
    return <Navigate to="/unauthorized" />;
  }
  
  // User has allowed role
  return element;
}

// Usage in routes
function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      
      {/* Permission-based protection */}
      <Route 
        path="/admin/users" 
        element={
          <PermissionGuard 
            element={<UserAdmin />} 
            requiredPermission="manage_users" 
          />
        } 
      />
      
      {/* Role-based protection */}
      <Route 
        path="/admin/settings" 
        element={
          <RoleGuard 
            element={<SystemSettings />} 
            allowedRoles={['admin', 'system_admin']} 
          />
        } 
      />
    </Routes>
  );
}`,
          exercise: {
            instructions:
              'Implement an e-commerce product browsing system with advanced routing features. Create: 1) A hierarchical category navigation with nested routes (Home → Category → Subcategory → Product), 2) URL parameter handling for product filtering (by price range, rating, features), 3) Route-based transitions and animations for a polished user experience, 4) Breadcrumb navigation that reflects the current route hierarchy, 5) Route-based code splitting to improve performance, and 6) Route guards for admin sections that control product inventory.',
          },
        },
      ],
      prepperSummary: `
    <div class="prepper-summary">
      <h3>🔑 Key Interview Takeaways</h3>
      <ul>
        <li><strong>Client-Side Routing:</strong> Understand how modern SPAs handle navigation without page refreshes using the browser history API and route matching.</li>
        
        <li><strong>Route Configuration:</strong> Know how to define routes with patterns, parameters, and nested structures to build hierarchical navigation systems.</li>
        
        <li><strong>Route Guards:</strong> Implement protection for routes based on authentication, permissions, or other conditions to control access to specific parts of the application.</li>
        
        <li><strong>Performance Optimization:</strong> Use route-based code splitting to load components on demand, improving initial load times and overall performance.</li>
        
        <li><strong>Advanced Patterns:</strong> Apply techniques like route transitions, data prefetching, scroll restoration, and deep linking to create polished user experiences.</li>
      </ul>
      
      <h4>📝 Common Interview Questions</h4>
      <ol>
        <li>"How does client-side routing differ from traditional server-side routing?"</li>
        <li>"How would you implement a route guard to protect authenticated content?"</li>
        <li>"What techniques would you use to optimize performance in routing?"</li>
        <li>"Explain how you would handle nested routes in a complex application"</li>
        <li>"How would you manage URL parameters and query strings for filtering and pagination?"</li>
      </ol>
    </div>
  `,
    },

    {
      title: 'Lifecycle Methods',
      description:
        'Understand how components initialize, update, and clean up in modern frameworks.',
      sections: [
        {
          title: 'Component Lifecycle Fundamentals',
          explanation: `
        <p>The component lifecycle refers to the different stages a component goes through from creation to destruction. Understanding this lifecycle is crucial for managing side effects and optimizing performance.</p>
        
        <h4>Core Lifecycle Phases</h4>
        <p>All modern frameworks implement similar component lifecycle concepts, though the specific implementation details vary.</p>
        
        <p>The fundamental lifecycle phases include:</p>
        <ul>
          <li><strong>Mounting:</strong> Component is created and inserted into the DOM (initialization, first render)</li>
          <li><strong>Updating:</strong> Component re-renders due to changes in props or state (new data processing, UI updates)</li>
          <li><strong>Unmounting:</strong> Component is removed from the DOM (cleanup, resource release)</li>
          <li><strong>Error Handling:</strong> Some frameworks add lifecycle hooks for error handling (error boundaries)</li>
          <li><strong>Suspense/Async:</strong> Modern frameworks support phases for async loading states</li>
        </ul>
        
        <h4>React Class Component Lifecycle</h4>
        <p>While modern React uses hooks, understanding the traditional lifecycle methods provides valuable context.</p>
        
        <p>These methods execute in a specific order, forming a predictable lifecycle flow:</p>
        <ul>
          <li><strong>Constructor:</strong> Initialize state and bind methods</li>
          <li><strong>getDerivedStateFromProps:</strong> Update state based on props before rendering</li>
          <li><strong>render:</strong> Create the virtual DOM representation</li>
          <li><strong>componentDidMount:</strong> Run after first render when DOM is available</li>
          <li><strong>shouldComponentUpdate:</strong> Optimize rendering by controlling updates</li>
          <li><strong>getSnapshotBeforeUpdate:</strong> Capture DOM information before updates</li>
          <li><strong>componentDidUpdate:</strong> Run after re-renders with access to previous props/state</li>
          <li><strong>componentWillUnmount:</strong> Clean up resources before destruction</li>
        </ul>
        
        <div class="code-example">
          <pre><code>// React class component lifecycle methods
class MyComponent extends React.Component {
  // Mounting phase
  constructor(props) {
    super(props);
    this.state = { count: 0 };
    console.log('Constructor: Component is being initialized');
  }
  
  static getDerivedStateFromProps(props, state) {
    console.log('getDerivedStateFromProps: Derive state from props');
    return null; // Return updated state or null
  }
  
  componentDidMount() {
    console.log('componentDidMount: Component is now in the DOM');
    // Good place for API calls, subscriptions, etc.
  }
  
  // Updating phase
  shouldComponentUpdate(nextProps, nextState) {
    console.log('shouldComponentUpdate: Should component re-render?');
    return true; // Return false to prevent update
  }
  
  getSnapshotBeforeUpdate(prevProps, prevState) {
    console.log('getSnapshotBeforeUpdate: Get DOM state before update');
    return null; // Return value passed to componentDidUpdate
  }
  
  componentDidUpdate(prevProps, prevState, snapshot) {
    console.log('componentDidUpdate: Component was updated');
    // Good place for side effects based on prop/state changes
  }
  
  // Unmounting phase
  componentWillUnmount() {
    console.log('componentWillUnmount: Component is about to be removed');
    // Clean up subscriptions, timers, etc.
  }
  
  // Error handling
  componentDidCatch(error, info) {
    console.log('componentDidCatch: Caught an error in a child component');
    // Handle errors in child components
  }
  
  // Render method (required)
  render() {
    console.log('render: Rendering component');
    return &lt;div&gt;{this.state.count}&lt;/div&gt;;
  }
}</code></pre>
        </div>
        
        <h4>Modern React Hooks</h4>
        <p>Hooks provide a more functional approach to lifecycle management in React, focusing on when effects should run rather than specific lifecycle events.</p>
        
        <p>Hooks align with specific use cases rather than predefined lifecycle phases:</p>
        <ul>
          <li><strong>useState:</strong> Replaces constructor state initialization</li>
          <li><strong>useEffect:</strong> Combines componentDidMount, componentDidUpdate, and componentWillUnmount functionality</li>
          <li><strong>useLayoutEffect:</strong> Runs synchronously after all DOM mutations</li>
          <li><strong>useRef:</strong> Stores mutable values that persist across renders</li>
          <li><strong>useMemo/useCallback:</strong> Optimize performance by memoizing values and functions</li>
        </ul>
        
        <div class="code-example">
          <pre><code>// React functional component with hooks
function MyComponent({ initialCount }) {
  // State initialization (similar to constructor)
  const [count, setCount] = useState(initialCount);
  
  // Run once on mount (similar to componentDidMount)
  useEffect(() => {
    console.log('Component mounted');
    
    // Clean up on unmount (similar to componentWillUnmount)
    return () => {
      console.log('Component will unmount');
    };
  }, []); // Empty dependency array = run once on mount
  
  // Run when count changes (similar to componentDidUpdate)
  useEffect(() => {
    console.log('Count changed to', count);
    
    // Clean up previous effect before running again
    return () => {
      console.log('Cleaning up previous count effect');
    };
  }, [count]); // Dependency array with count
  
  return  &lt;div&gt;{count}&lt;/div&gt;;
}</code></pre>
        </div>
        
        <div class="interview-tip">
          <p><span class="interview-icon">🎯</span> <strong>Interview Focus:</strong> Understanding component lifecycle is fundamental to building bug-free, performant applications.</p>
          <p>Key points to understand:</p>
          <ul>
           <li>When to use different lifecycle hooks or effects</li>
            <li>How to manage side effects and cleanup properly</li>
            <li>The performance implications of lifecycle methods</li>
            <li>Common pitfalls like infinite render loops</li>
            <li>Lifecycle differences across frameworks</li>
          </ul>
        </div>
      `,
          codeExample: `// Component Lifecycle Patterns Across Frameworks

// 1. React Hooks Lifecycle Implementation
// --------------------------------------
function UserProfile({ userId }) {
  // State initialization
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // Refs persist across renders
  const isMounted = useRef(true);
  const previousUserId = useRef(userId);
  
  // componentDidMount + componentDidUpdate (for userId changes)
  useEffect(() => {
    // Show loading state
    setLoading(true);
    setError(null);
    
    // Fetch user data
    fetchUser(userId)
      .then(data => {
        // Only update state if component is still mounted
        if (isMounted.current) {
          setUser(data);
          setLoading(false);
        }
      })
      .catch(error => {
        if (isMounted.current) {
          setError(error);
          setLoading(false);
        }
      });
    
    // Track previous props (similar to prevProps in class components)
    previousUserId.current = userId;
    
    // componentWillUnmount - clean up
    return () => {
      // Mark as unmounted to prevent state updates
      isMounted.current = false;
    };
  }, [userId]); // Only re-run effect if userId changes
  
  // getDerivedStateFromProps equivalent
  useEffect(() => {
    if (userId !== previousUserId.current && !loading) {
      console.log('UserId changed, resetting state');
      setUser(null);
    }
  }, [userId, loading]);
  
  // Render
  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;
  if (!user) return <div>No user found</div>;
  
  return (
    <div className="user-profile">
      <h2>{user.name}</h2>
      <p>Email: {user.email}</p>
    </div>
  );
}

// 2. Lifecycle with Custom Hooks
// ----------------------------
// Custom hook for API data fetching
function useApi(url, initialData = null) {
  const [data, setData] = useState(initialData);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isRefreshing, setIsRefreshing] = useState(false);
  
  // Function to fetch data
  const fetchData = useCallback(async (skipLoading = false) => {
    if (!skipLoading) setLoading(true);
    setError(null);
    
    if (skipLoading) setIsRefreshing(true);
    
    try {
      const response = await fetch(url);
      
      if (!response.ok) {
        throw new Error(\`API error: \${response.status}\`);
      }
      
      const result = await response.json();
      setData(result);
      return result;
    } catch (error) {
      setError(error);
      throw error;
    } finally {
      setLoading(false);
      setIsRefreshing(false);
    }
  }, [url]);
  
  // componentDidMount effect
  useEffect(() => {
    fetchData().catch(err => console.error(err));
  }, [fetchData]);
  
  // Refresh data function
  const refresh = () => fetchData(true);
  
  return { data, loading, error, isRefreshing, refresh };
}

// Using the custom hook
function ProductList() {
  const { data: products, loading, error, refresh } = useApi('/api/products');
  
  if (loading) return <div>Loading products...</div>;
  if (error) return <div>Error: {error.message}</div>;
  
  return (
    <div className="product-list">
      <button onClick={refresh}>Refresh</button>
      
      {products && products.map(product => (
        <div key={product.id} className="product-card">
          <h3>{product.name}</h3>
          <p>\${product.price}</p>
        </div>
      ))}
    </div>
  );
}

// 3. Class Component with Full Lifecycle
// ------------------------------------
class Counter extends React.Component {
  constructor(props) {
    super(props);
    console.log('1. Constructor - Initializing component');
    
    // Initialize state
    this.state = {
      count: props.initialCount || 0,
      lastUpdated: null
    };
  }
  
  static getDerivedStateFromProps(props, state) {
    console.log('2. getDerivedStateFromProps - Derive state from new props');
    
    // If initialCount prop changes, update state
    if (props.initialCount !== undefined && props.initialCount !== state.count) {
      return {
        count: props.initialCount
      };
    }
    
    // No state update needed
    return null;
  }
  
  componentDidMount() {
    console.log('4. componentDidMount - Component is now in the DOM');
    
    // Set up any subscriptions or timers
    this.intervalId = setInterval(() => {
      this.setState({ lastUpdated: new Date() });
    }, 10000);
    
    // Could fetch initial data here
    if (this.props.fetchInitialCount) {
      fetch('/api/initial-count')
        .then(res => res.json())
        .then(data => {
          this.setState({ count: data.count });
        });
    }
  }
  
  shouldComponentUpdate(nextProps, nextState) {
    console.log('5. shouldComponentUpdate - Decide if update is needed');
    
    // Only update if count or step changed
    const countChanged = this.state.count !== nextState.count;
    const stepChanged = this.props.step !== nextProps.step;
    return countChanged || stepChanged;
  }
  
  getSnapshotBeforeUpdate(prevProps, prevState) {
    console.log('7. getSnapshotBeforeUpdate - Capture before DOM updates');
    
    // Capture information from the DOM before it's potentially changed
    const counterHeight = this.counterRef?.offsetHeight;
    return { counterHeight };
  }
  
  componentDidUpdate(prevProps, prevState, snapshot) {
    console.log('8. componentDidUpdate - Component was updated');
    console.log('Previous height was:', snapshot.counterHeight);
    
    // React to props/state changes
    if (prevState.count !== this.state.count) {
      // Count changed, could trigger side effect
      this.props.onCountChange?.(this.state.count);
    }
    
    if (prevProps.theme !== this.props.theme) {
      // Theme changed, update styles
      this.updateThemeStyles(this.props.theme);
    }
  }
  
  componentWillUnmount() {
    console.log('9. componentWillUnmount - Component is being removed');
    
    // Clean up any subscriptions, timers, etc.
    clearInterval(this.intervalId);
    
    // Remove any event listeners
    document.removeEventListener('keydown', this.handleKeyDown);
  }
  
  componentDidCatch(error, info) {
    console.log('Error boundary caught an error');
    
    // Log the error
    console.error(error, info);
    
    // Update state to show fallback UI
    this.setState({ hasError: true });
  }
  
  // Event handlers
  increment = () => {
    const { step = 1 } = this.props;
    
    // Functional state update to ensure correct value
    this.setState(prevState => ({
      count: prevState.count + step,
      lastUpdated: new Date()
    }));
  };
  
  decrement = () => {
    const { step = 1 } = this.props;
    
    this.setState(prevState => ({
      count: prevState.count - step,
      lastUpdated: new Date()
    }));
  };
  
  updateThemeStyles(theme) {
    // Implementation to update styles based on theme
  }
  
  handleKeyDown = (e) => {
    if (e.key === 'ArrowUp') this.increment();
    if (e.key === 'ArrowDown') this.decrement();
  };
  
  // Required render method
  render() {
    console.log('3/6. Render - Rendering component');
    
    if (this.state.hasError) {
      return &lt;div&gt;Something went wrong!&lt;/div&gt;;
    }
    
    return (
      &lt;div 
        className={\`counter \${this.props.theme || 'light'}\`}
        ref={el => this.counterRef = el}
      &gt;
        &lt;h2&gt;Count: {this.state.count}&lt;/h2&gt;
        
        &lt;div className="controls"&gt;
          &lt;button onClick={this.decrement}&gt;-&lt;/button&gt;
          &lt;button onClick={this.increment}&gt;+&lt;/button&gt;
        &lt;/div&gt;
        
        {this.state.lastUpdated && (
          &lt;p&gt;Last updated: {this.state.lastUpdated.toLocaleTimeString()}&lt;/p&gt;
        )}
      &lt;/div&gt;
    );
  }
}

// 4. Vue Component Lifecycle (Conceptual)

<template>
  <div class="user-profile">
    <div v-if="loading">Loading...</div>
    <div v-else-if="error">Error: {{ error.message }}</div>
    <div v-else-if="user">
      <h2>{{ user.name }}</h2>
      <p>Email: {{ user.email }}</p>
    </div>
    <div v-else>No user found</div>
  </div>
</template>

<script>
export default {
  props: {
    userId: {
      type: [Number, String],
      required: true
    }
  },
  
  data() {
    return {
      user: null,
      loading: true,
      error: null
    };
  },
  
  // Called before creating the component
  beforeCreate() {
    console.log('beforeCreate - Component is initializing');
  },
  
  // Called after the component is created
  created() {
    console.log('created - Component instance created');
    // Good place for API calls
  },
  
  // Called before mounting to the DOM
  beforeMount() {
    console.log('beforeMount - About to mount DOM');
  },
  
  // Called after mounting (like componentDidMount)
  mounted() {
    console.log('mounted - Component is in the DOM');
    this.fetchUser();
        },
 // Watch for changes to userId prop
  watch: {
    userId: {
      handler: 'fetchUser',
      immediate: true
    }
  },
  
  // Called before updating (like shouldComponentUpdate)
  beforeUpdate() {
    console.log('beforeUpdate - Component is about to update');
  },
  
  // Called after updating (like componentDidUpdate)
  updated() {
    console.log('updated - Component was updated');
  },
  
  // Called before destroying (like componentWillUnmount)
  beforeUnmount() {
    console.log('beforeUnmount - Component is about to be destroyed');
  },
  
  // Called after destroying
  unmounted() {
    console.log('unmounted - Component was destroyed');
  },
  
  methods: {
    async fetchUser() {
      this.loading = true;
      this.error = null;
      
      try {
        const response = await fetch(\`/api/users/\${this.userId}\`);
        if (!response.ok) {
          throw new Error(\`API error: \${response.status}\`);
        }
        this.user = await response.json();
      } catch (error) {
        this.error = error;
      } finally {
        this.loading = false;
      }
    }
  }
};
</script>


// 5. Angular Component Lifecycle (Conceptual)

import { Component, Input, OnInit, OnChanges, OnDestroy,
         AfterViewInit, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-user-profile',
  template: 
    <div class="user-profile">
      <div *ngIf="loading">Loading...</div>
      <div *ngIf="error">Error: {{ error.message }}</div>
      <div *ngIf="user">
        <h2>{{ user.name }}</h2>
        <p>Email: {{ user.email }}</p>
      </div>
      <div *ngIf="!loading && !error && !user">No user found</div>
    </div>
  
})
export class UserProfileComponent implements OnInit, OnChanges, AfterViewInit, OnDestroy {
  @Input() userId: string;
  
  user: any = null;
  loading = true;
  error: any = null;
  
  // Called once on initialization
  ngOnInit() {
    console.log('ngOnInit - Component initialized');
    this.fetchUser();
  }
  
  // Called when input properties change
  ngOnChanges(changes: SimpleChanges) {
    console.log('ngOnChanges - Input properties changed');
    
    if (changes.userId && !changes.userId.firstChange) {
      // userId changed, fetch new user data
      this.fetchUser();
    }
  }
  
  // Called after the view is initialized
  ngAfterViewInit() {
    console.log('ngAfterViewInit - View initialized');
  }
  
  // Called before the component is destroyed
  ngOnDestroy() {
    console.log('ngOnDestroy - Component is being destroyed');
    // Clean up subscriptions, etc.
  }
  
  async fetchUser() {
    this.loading = true;
    this.error = null;
    
    try {
      const response = await fetch(\`/api/users/\${this.userId}\`);
      if (!response.ok) {
        throw new Error(\`API error: \${response.status}\`);
      }
      this.user = await response.json();
    } catch (error) {
      this.error = error;
    } finally {
      this.loading = false;
    }
  }
}

`,
          exercise: {
            instructions:
              'Create a component that demonstrates proper lifecycle management in a framework of your choice. The component should: 1) Fetch data from an API during initialization, 2) Implement proper loading and error states, 3) Update properly when receiving new props, 4) Clean up resources when unmounting, and 5) Optimize performance by preventing unnecessary renders. Explain the lifecycle methods/hooks you used and why they were appropriate for each task.',
          },
        },
        {
          title: 'Managing Side Effects',
          explanation: `
        <p>Side effects are operations that affect something outside a component's scope, such as API calls, DOM manipulations, or subscriptions. Managing them properly is essential for predictable component behavior.</p>
        
        <h4>Types of Side Effects</h4>
        <p>Different side effects may need to be handled at different points in the component lifecycle.</p>
        
        <p>Understanding the various types of side effects helps with proper management:</p>
        <ul>
          <li><strong>One-time setup:</strong> Initial data fetching, establishing connections, initializing third-party libraries</li>
          <li><strong>Prop/state-dependent:</strong> Effects that need to run when specific data changes, like fetching new data when IDs change</li>
          <li><strong>Cleanup operations:</strong> Canceling requests, removing event listeners, closing connections, clearing timers</li>
          <li><strong>DOM manipulations:</strong> Focusing elements, measuring sizes, scrolling to positions, integrating third-party libraries</li>
          <li><strong>Subscription management:</strong> Setting up and tearing down subscriptions to external data sources</li>
        </ul>
        
        <h4>useEffect in React</h4>
        <p>React's <code>useEffect</code> hook provides a unified way to handle side effects in functional components.</p>
        
        <p>The <code>useEffect</code> hook has several important characteristics:</p>
        <ul>
          <li><strong>Dependency Array:</strong> Controls when effects run by specifying dependencies</li>
          <li><strong>Cleanup Function:</strong> Optional return function that runs before the effect runs again or when unmounting</li>
          <li><strong>Timing:</strong> Runs after render is committed to the screen (asynchronously)</li>
          <li><strong>Multiple Effects:</strong> Can use multiple useEffect calls to separate concerns</li>
          <li><strong>Conditional Execution:</strong> Can be skipped based on dependencies or conditions</li>
        </ul>
        
        <div class="code-example">
          <pre><code>// Different useEffect patterns
function SearchComponent({ query }) {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  
  // One-time setup (empty dependency array)
  useEffect(() => {
    console.log('Component mounted');
    
    // Attach global event listener
    window.addEventListener('resize', handleResize);
    
    // Cleanup when unmounted
    return () => {
      console.log('Component will unmount');
      window.removeEventListener('resize', handleResize);
    };
  }, []);
  
  // Run when query changes (dependency array with query)
  useEffect(() => {
    if (!query) return; // Don't search on empty query
    
    // Track for cancellation
    let isCancelled = false;
    
    // Show loading state
    setLoading(true);
    
    // Fetch search results
    fetchSearchResults(query)
      .then(data => {
        // Only update state if not cancelled
        if (!isCancelled) {
          setResults(data);
          setLoading(false);
        }
      })
      .catch(error => {
        if (!isCancelled) {
          console.error('Search error:', error);
          setResults([]);
          setLoading(false);
        }
      });
    
    // Cleanup if component unmounts or query changes before request completes
    return () => {
      isCancelled = true;
    };
  }, [query]);
  
  const handleResize = () => {
    console.log('Window resized');
  };
  
  return (
    return (
      &lt;div&gt;
        &lt;h2&gt;Search Results for: {query}&lt;/h2&gt;
        {loading ? (
          &lt;p&gt;Loading...&lt;/p&gt;
        ) : (
          &lt;ul&gt;
            {results.map(item => (
              &lt;li key={item.id}&gt;{item.title}&lt;/li&gt;
            ))}
          &lt;/ul&gt;
        )}
      &lt;/div&gt;
    );
  );
}</code></pre>
        </div>
        
        <h4>Managing Side Effects in Class Components</h4>
        <p>Class components handle side effects using lifecycle methods, which requires careful tracking of changes.</p>
        
        <p>Key considerations for class component side effects:</p>
        <ul>
          <li><strong>Initialization:</strong> Set up in <code>componentDidMount</code></li>
          <li><strong>Updates:</strong> Compare props/state in <code>componentDidUpdate</code> to avoid infinite loops</li>
          <li><strong>Cleanup:</strong> Remove listeners and cancel operations in <code>componentWillUnmount</code></li>
          <li><strong>Cancellation:</strong> Track in-flight requests to prevent race conditions</li>
          <li><strong>Error Handling:</strong> Catch and process errors from side effects</li>
        </ul>
        
        <div class="code-example">
          <pre><code>// Side effects in class components
class SearchComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      results: [],
      loading: false
    };
    this.handleResize = this.handleResize.bind(this);
  }
  
  // Setup on mount
  componentDidMount() {
    console.log('Component mounted');
    window.addEventListener('resize', this.handleResize);
    
    // Initial data fetch if query exists
    this.fetchResults();
  }
  
  // Cleanup on unmount
  componentWillUnmount() {
    console.log('Component will unmount');
    window.removeEventListener('resize', this.handleResize);
    
    // Cancel pending requests
    if (this.currentRequest) {
      this.currentRequest.cancel();
    }
  }
  
  // Handle prop changes
  componentDidUpdate(prevProps) {
    // Only fetch if query changed
    if (prevProps.query !== this.props.query) {
      this.fetchResults();
    }
  }
  
  fetchResults() {
    const { query } = this.props;
    if (!query) return;
    
    // Cancel previous request
    if (this.currentRequest) {
      this.currentRequest.cancel();
    }
    
    // Show loading state
    this.setState({ loading: true });
    
    // Store request for potential cancellation
    this.currentRequest = fetchSearchResults(query);
    
    this.currentRequest.promise
      .then(data => {
        this.setState({
          results: data,
          loading: false
        });
      })
      .catch(error => {
        if (!error.cancelled) {
          console.error('Search error:', error);
          this.setState({
            results: [],
            loading: false
          });
        }
      });
  }
  
  handleResize() {
    console.log('Window resized');
  }
  
  render() {
    const { query } = this.props;
    const { results, loading } = this.state;
    
    return (
      return (
        &lt;div&gt;
          &lt;h2&gt;Search Results for: {query}&lt;/h2&gt;
          {loading ? (
            &lt;p&gt;Loading...&lt;/p&gt;
          ) : (
            &lt;ul&gt;
              {results.map(item => (
                &lt;li key={item.id}&gt;{item.title}&lt;/li&gt;
              ))}
            &lt;/ul&gt;
          )}
        &lt;/div&gt;
      );
    );
  }
}</code></pre>
        </div>
        
        <div class="interview-tip">
          <p><span class="interview-icon">🎯</span> <strong>Interview Focus:</strong> Proper side effect management demonstrates your ability to create robust, bug-free components.</p>
          <p>Key points to understand:</p>
          <ul>
            <li>How to handle asynchronous operations safely</li>
            <li>Proper cleanup to prevent memory leaks</li>
            <li>When to use different dependency arrays in useEffect</li>
            <li>Avoiding common pitfalls like infinite loops</li>
            <li>Strategies for canceling or ignoring stale requests</li>
          </ul>
        </div>
      `,
          codeExample: `// Advanced Side Effect Management Patterns

// 1. Custom Hook for API Requests with Cancellation
// -----------------------------------------------
function useApiRequest(url, options = {}) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  
  // Store the latest request's AbortController
  const abortControllerRef = useRef(null);
  
  // Function to execute the request
  const executeRequest = useCallback(async (requestUrl = url, requestOptions = {}) => {
    // Cancel any in-flight request
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }
    
    // Create new AbortController for this request
    const abortController = new AbortController();
    abortControllerRef.current = abortController;
    
    // Show loading state
    setLoading(true);
    setError(null);
    
    try {
      // Make the API request with signal for cancellation
      const response = await fetch(requestUrl, {
        ...requestOptions,
        ...options,
        signal: abortController.signal
      });
      
      if (!response.ok) {
        throw new Error(\`API error: \${response.status}\`);
      }
      
      const responseData = await response.json();
      setData(responseData);
      return responseData;
    } catch (err) {
      // Don't update state if the request was aborted
      if (err.name === 'AbortError') {
        console.log('Request was aborted');
        return;
      }
      
      setError(err);
      throw err;
    } finally {
      // Only clear loading if this is still the current request
      if (abortControllerRef.current === abortController) {
        setLoading(false);
      }
    }
  }, [url, options]);
  
  // Execute request when URL changes
  useEffect(() => {
    if (url) {
      executeRequest().catch(err => {
        console.error('Request failed:', err);
      });
    }
    
    // Cleanup - abort request if component unmounts or URL changes
    return () => {
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
    };
  }, [url, executeRequest]);
  
  return { data, loading, error, executeRequest };
}

// Using the custom hook
function ProductDetails({ productId }) {
  const { 
    data: product, 
    loading, 
    error, 
    executeRequest: refetch 
  } = useApiRequest(productId ? \`/api/products/\${productId}\` : null);
  
  return (
    <div className="product-details">
      {loading && <div className="loading">Loading...</div>}
      {error && <div className="error">Error: {error.message}</div>}
      
      {product && (
        <>
          <h1>{product.name}</h1>
          <p>{product.description}</p>
          <p className="price">\${product.price}</p>
          
          <button onClick={refetch}>Refresh</button>
        </>
      )}
    </div>
  );
}

// 2. Debounced Side Effects
// ----------------------
// Custom hook for debounced values
function useDebounce(value, delay) {
  const [debouncedValue, setDebouncedValue] = useState(value);
  
  useEffect(() => {
    // Set up the timeout to update the debounced value
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);
    
    // Cleanup function will clear the timeout if value changes
    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);
  
  return debouncedValue;
}

// Using the debounce hook for search
function SearchBar() {
  const [searchTerm, setSearchTerm] = useState('');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  
  // Debounce the search term to avoid excessive API calls
  const debouncedSearchTerm = useDebounce(searchTerm, 500);
  
  // Effect only runs when debounced search term changes
  useEffect(() => {
    if (!debouncedSearchTerm) {
      setResults([]);
      return;
    }
    
    setLoading(true);
    
    fetch(\`/api/search?q=\${debouncedSearchTerm}\`)
      .then(response => response.json())
      .then(data => {
        setResults(data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Search error:', error);
        setLoading(false);
      });
  }, [debouncedSearchTerm]);
  
  return (
    <div className="search-bar">
      <input
        type="text"
        value={searchTerm}
        onChange={e => setSearchTerm(e.target.value)}
        placeholder="Search..."
      />
      
      {loading && <div className="spinner" />}
      
      <ul className="results">
        {results.map(item => (
          <li key={item.id}>{item.title}</li>
        ))}
      </ul>
    </div>
  );
}

// 3. Using Refs for DOM Manipulations
// --------------------------------
function AutoFocusInput({ initialValue = '' }) {
  // Create ref to store input element
  const inputRef = useRef(null);
  const [value, setValue] = useState(initialValue);
  
  // Focus input when component mounts
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);
  
  return (
    <input
      ref={inputRef}
      value={value}
      onChange={e => setValue(e.target.value)}
    />
  );
}

// 4. Managing Multiple Effects
// -------------------------
function UserDashboard({ userId }) {
  const [user, setUser] = useState(null);
  const [preferences, setPreferences] = useState(null);
  const [activities, setActivities] = useState([]);
  const [metrics, setMetrics] = useState(null);
  
  // Fetch user data on mount
  useEffect(() => {
    let isMounted = true;
    
    fetch(\`/api/users/\${userId}\`)
      .then(res => res.json())
      .then(data => {
        if (isMounted) setUser(data);
      });
    
    return () => {
      isMounted = false;
    };
  }, [userId]);
  
  // Fetch user preferences only when user data is loaded
  useEffect(() => {
    if (!user) return;
    
    let isMounted = true;
    
    fetch(\`/api/users/\${userId}/preferences\`)
      .then(res => res.json())
      .then(data => {
        if (isMounted) setPreferences(data);
      });
    
    return () => {
      isMounted = false;
    };
  }, [userId, user]);
  
  // Set up real-time updates for activities
  useEffect(() => {
    if (!user) return;
    
    // Connect to WebSocket for real-time updates
    const socket = new WebSocket(\`wss://api.example.com/activities?userId=\${userId}\`);
    
    socket.onmessage = (event) => {
      const newActivity = JSON.parse(event.data);
      setActivities(prev => [newActivity, ...prev].slice(0, 10));
    };
    
    // Clean up WebSocket connection
    return () => {
      socket.close();
    };
  }, [userId, user]);
  
  // Polling for metrics every 30 seconds
  useEffect(() => {
    if (!user) return;
    
    let isMounted = true;
    
    // Immediate fetch
    fetchMetrics();
    
    // Set up polling interval
    const intervalId = setInterval(fetchMetrics, 30000);
    
    function fetchMetrics() {
      fetch(\`/api/users/\${userId}/metrics\`)
        .then(res => res.json())
        .then(data => {
          if (isMounted) setMetrics(data);
        });
    }
    
    // Clean up interval
    return () => {
      isMounted = false;
      clearInterval(intervalId);
    };
  }, [userId, user]);
  
  if (!user) return <div>Loading user...</div>;
  
  return (
    <div className="dashboard">
      <header>
        <h1>Welcome, {user.name}</h1>
      </header>
      
      <div className="dashboard-grid">
        <div className="preferences-panel">
          {preferences ? (
            <UserPreferences data={preferences} />
          ) : (
            <div>Loading preferences...</div>
            <div className="preferences-panel">
          {preferences ? (
            <UserPreferences data={preferences} />
          ) : (
            <div>Loading preferences...</div>
          )}
        </div>
        
        <div className="activity-feed">
          <h2>Recent Activity</h2>
          {activities.length > 0 ? (
            <ActivityList activities={activities} />
          ) : (
            <p>No recent activities</p>
          )}
        </div>
        
        <div className="metrics-panel">
          {metrics ? (
            <UserMetrics data={metrics} />
          ) : (
            <div>Loading metrics...</div>
          )}
        </div>
      </div>
    </div>
  );
}

// 5. Working with Third-party DOM Libraries
// --------------------------------------
function ChartComponent({ data }) {
  const chartRef = useRef(null);
  const chartInstanceRef = useRef(null);
  
  // Initialize chart after component mounts
  useEffect(() => {
    if (!chartRef.current) return;
    
    // Initialize chart library with the DOM node
    chartInstanceRef.current = new FancyChart(chartRef.current, {
      title: 'Sales Data',
      animate: true
    });
    
    // Set initial data
    chartInstanceRef.current.setData(data);
    
    // Clean up when component unmounts
    return () => {
      if (chartInstanceRef.current) {
        chartInstanceRef.current.destroy();
        chartInstanceRef.current = null;
      }
    };
  }, []); // Empty dependency array - only run on mount/unmount
  
  // Update chart data when props change
  useEffect(() => {
    if (chartInstanceRef.current) {
      chartInstanceRef.current.setData(data);
    }
  }, [data]); // Run when data changes
  
  return <div className="chart-container" ref={chartRef} />;
}`,
          exercise: {
            instructions:
              'Implement a complex form component with proper side effect management. The form should: 1) Load initial data from an API when mounted, 2) Save in-progress work to localStorage periodically as the user types, 3) Submit form data to an API with proper loading states and error handling, 4) Validate fields in real-time with debouncing to avoid excessive validation calls, and 5) Prompt the user before navigating away if there are unsaved changes. Focus on properly implementing cleanup functions and handling asynchronous operations safely.',
          },
        },
      ],
      prepperSummary: `
    <div class="prepper-summary">
      <h3>🔑 Key Interview Takeaways</h3>
      <ul>
        <li><strong>Lifecycle Phases:</strong> Components go through mounting, updating, and unmounting phases with specific hooks/methods for each phase.</li>
        
        <li><strong>Hook-based Lifecycle:</strong> Modern React uses hooks like useState and useEffect to replace traditional lifecycle methods, providing a more flexible way to manage component behavior.</li>
        
        <li><strong>Side Effect Management:</strong> Properly handle side effects like API calls, DOM manipulations, and subscriptions to prevent memory leaks and stale updates.</li>
        
        <li><strong>Cleanup Functions:</strong> Implement cleanup in useEffect return functions or componentWillUnmount to cancel requests, remove event listeners, and close connections.</li>
        
        <li><strong>Performance Optimization:</strong> Use appropriate dependency arrays, memoization techniques, and careful side effect management to avoid unnecessary renders and expensive operations.</li>
      </ul>
      
      <h4>📝 Common Interview Questions</h4>
      <ol>
        <li>"Explain the component lifecycle and when you would use different lifecycle methods or hooks"</li>
        <li>"How would you handle cleanup in a component that sets up subscriptions or timers?"</li>
        <li>"What's the difference between componentDidUpdate and useEffect with dependencies?"</li>
        <li>"How would you optimize a component that fetches data based on props?"</li>
        <li>"How would you handle race conditions in asynchronous operations when props change rapidly?"</li>
      </ol>
    </div>
  `,
    },
  ],
  challenge: {
    description:
      'Build a feature-rich task management application that showcases your understanding of modern JavaScript frameworks. The application should allow users to create, categorize, filter, and prioritize tasks with an intuitive and responsive interface.',
    requirements: [
      'Implement a component-based architecture with proper separation of concerns',
      'Create a global state management system that maintains task data and user preferences',
      'Implement client-side routing with dynamic routes for task categories and individual tasks',
      'Use proper lifecycle management to fetch data, handle subscriptions, and clean up resources',
      'Add features like drag-and-drop task reordering, due date reminders, and task filtering/sorting',
      'Implement proper error handling and loading states for asynchronous operations',
    ],
    starterCode: `// Task Management Application Challenge

// Component architecture outline
// - App (main container)
//   - Header (with navigation and user info)
//   - Sidebar (with category list)
//   - TaskBoard (main task view)
//     - TaskList (filtered list of tasks)
//       - TaskItem (individual task)
//     - TaskDetails (expanded view of selected task)
//   - AddTaskForm (for creating new tasks)

// 1. Define your component structure
// Example component:
function TaskItem({ task, onStatusChange, onSelect }) {
  // Implement component with proper lifecycle management
  
  return (
    <div className="task-item">
      {/* Implement component UI */}
    </div>
  );
}

// 2. Set up your state management
// Create stores, contexts, or other state management

// 3. Implement routing
// Set up your routes and navigation

// 4. Define data models and service functions
// Example service function:
async function fetchTasks(category) {
  // Implement data fetching with proper error handling
}

// 5. Main application component
function TaskManagementApp() {
  // Implement your application
  
  return (
    <div className="task-management-app">
      {/* Implement application UI and routing */}
    </div>
  );
}

export default TaskManagementApp;`,
  },
}

export default modernJavascriptFrameworks
