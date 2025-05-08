// curriculum-section-shortlist.js - 20 x TypeScript with React Shortlist Review

const shortlistPrepper = {
  title: 'Minicourse TypeScript with React Recapper',
  description: '',
  lessons: [
    {
      title: '20 Essential TypeScript Concepts for React',
      description:
        'A comprehensive review of the most critical TypeScript concepts for React development, covering fundamentals, component typing, hooks, and advanced patterns.',
      sections: [
        {
          title: 'TypeScript Fundamentals for React (5 Key Concepts)',
          explanation: `
        <p>These five fundamental concepts form the foundation of TypeScript when working with React applications:</p>

        <h4>1. Basic Types and Type Annotations</h4>
        <p>TypeScript provides static types to help catch errors during development before runtime:</p>

        <p><strong>Primitive Types:</strong></p>
        <ul>
          <li><code>boolean</code>: true/false values</li>
          <li><code>number</code>: numeric values</li>
          <li><code>string</code>: text values</li>
          <li><code>null</code> and <code>undefined</code>: represent absence of value</li>
          <li><code>any</code>: opt out of type checking (avoid when possible)</li>
          <li><code>unknown</code>: type-safe alternative to any (requires type checking)</li>
          <li><code>void</code>: absence of return value (used for functions)</li>
          <li><code>never</code>: represents values that never occur</li>
        </ul>

        <p><strong>Object Types:</strong></p>
        <ul>
          <li><code>Array&lt;T&gt;</code> or <code>T[]</code>: arrays of type T</li>
          <li><code>object</code>: non-primitive types</li>
          <li><code>interface</code> and <code>type</code>: ways to define custom object shapes</li>
        </ul>

        <p><strong>Type Annotations:</strong> Define the expected type of a variable.</p>
        
        <div class="code-example">
          <pre><code>// Basic type annotations
const isActive: boolean = true;
const count: number = 42;
const name: string = "Alice";

// Array types
const numbers: number[] = [1, 2, 3];
const names: Array&lt;string&gt; = ["Alice", "Bob"];

// Object type
const user: { id: number; name: string } = {
  id: 1,
  name: "Alice"
};

// Function type annotations
function add(a: number, b: number): number {
  return a + b;
}

// Union types
let id: string | number = 101; // Can be string or number
id = "U-101"; // Valid

// Type inference
let message = "Hello"; // TypeScript infers string
// message = 42; // Error: Type 'number' is not assignable to type 'string'

// Type assertions
const inputValue = document.getElementById("input") as HTMLInputElement;
// Or
const inputValue2 = &lt;HTMLInputElement&gt;document.getElementById("input");
</code></pre>
        </div>

        <h4>2. Interfaces and Type Aliases</h4>
        <p>Interfaces and type aliases allow you to create reusable, named type definitions that are essential for React components:</p>

        <p><strong>Interfaces:</strong> Define contract-like structures for objects.</p>
        <p><strong>Type Aliases:</strong> Create named types that can represent more complex types.</p>

        <p><strong>Key differences:</strong></p>
        <ul>
          <li>Interfaces can be extended and merged; type aliases cannot be reopened</li>
          <li>Type aliases can represent primitives, unions, and more complex types</li>
          <li>Interfaces are generally preferred for public API definitions</li>
        </ul>
        
        <div class="code-example">
          <pre><code>// Interface declaration
interface User {
  id: number;
  name: string;
  email: string;
  isActive?: boolean; // Optional property
  readonly createdAt: Date; // Can't be modified after creation
}

// Interface extension
interface Employee extends User {
  department: string;
  role: string;
}

// Interface merging (declaration merging)
interface User {
  avatar: string; // Adds to existing User interface
}

// Type alias
type UserRole = "admin" | "editor" | "viewer";

// Complex type aliases
type Callback = (data: string) => void;

type UserWithRole = User & { role: UserRole };

// Indexed types
interface Dictionary {
  [key: string]: string;
}

// Function interfaces
interface SearchFunction {
  (source: string, subString: string): boolean;
}

// Implementing interfaces with classes
class UserAccount implements User {
  id: number;
  name: string;
  email: string;
  readonly createdAt: Date;
  
  constructor(id: number, name: string, email: string) {
    this.id = id;
    this.name = name;
    this.email = email;
    this.createdAt = new Date();
  }
}
</code></pre>
        </div>

        <h4>3. Function Types and Event Handlers</h4>
        <p>TypeScript provides various ways to type functions, which is crucial for event handlers in React:</p>

        <p><strong>Function Type Expressions:</strong> Define the shape of functions.</p>
        <p><strong>Call Signatures:</strong> Define functions within an object type.</p>
        <p><strong>React Event Types:</strong> Specific types for React events.</p>
        
        <div class="code-example">
          <pre><code>// Function type expression
type GreetFunction = (name: string) => string;

const greet: GreetFunction = (name) => \`Hello, \${name}!\`;

// Function with optional parameters
function createUser(name: string, age?: number): User {
  return {
    id: Date.now(),
    name,
    age: age || 0
  };
}

// Function with default parameters
function createPost(title: string, content: string, published: boolean = false) {
  // ...
}

// Rest parameters
function sum(...numbers: number[]): number {
  return numbers.reduce((total, n) => total + n, 0);
}

// React event handlers
import React, { ChangeEvent, MouseEvent } from 'react';

function InputComponent() {
  // Typed event handler for input changes
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    console.log(event.target.value);
  };
  
  // Typed event handler for button clicks
  const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    console.log('Button clicked');
  };
  
  return (
    &lt;div&gt;
      &lt;input type="text" onChange={handleChange} /&gt;
      &lt;button onClick={handleClick}&gt;Click me&lt;/button&gt;
    &lt;/div&gt;
  );
}

// Common React event types:
// - ChangeEvent<T>: For input/form changes
// - FormEvent<T>: For form submissions
// - MouseEvent<T>: For mouse interactions
// - KeyboardEvent<T>: For keyboard interactions
// - DragEvent<T>: For drag and drop
// - FocusEvent<T>: For focus/blur events

// Function as props in React components
interface ButtonProps {
  onClick: (event: MouseEvent<HTMLButtonElement>) => void;
  label: string;
}

function Button({ onClick, label }: ButtonProps) {
  return &lt;button onClick={onClick}&gt;{label}&lt;/button&gt;;
}
</code></pre>
        </div>

        <h4>4. Generics</h4>
        <p>Generics allow you to create reusable components and functions that work with a variety of types while maintaining type safety:</p>

        <p><strong>Generic Functions:</strong> Functions that work with multiple types.</p>
        <p><strong>Generic Interfaces:</strong> Type definitions that can work with different types.</p>
        <p><strong>Generic Classes:</strong> Classes that can work with different types.</p>
        <p><strong>Generic Constraints:</strong> Limit the types that can be used with generics.</p>
        
        <div class="code-example">
          <pre><code>// Generic function
function identity<T>(arg: T): T {
  return arg;
}

const num = identity<number>(42); // num is number
const str = identity("hello"); // Type inference works, str is string

// Generic interface
interface Box<T> {
  value: T;
}

const numberBox: Box<number> = { value: 42 };
const stringBox: Box<string> = { value: "hello" };

// Generic with multiple types
function pair<T, U>(first: T, second: U): [T, U] {
  return [first, second];
}

const result = pair("hello", 42); // [string, number]

// Generic constraints (limit allowed types)
interface HasLength {
  length: number;
}

function logLength<T extends HasLength>(arg: T): T {
  console.log(arg.length); // Safe because of constraint
  return arg;
}

logLength("hello"); // Works, strings have length
logLength([1, 2, 3]); // Works, arrays have length
// logLength(123); // Error, numbers don't have length

// Generic React component
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

// Usage of generic component
interface User {
  id: number;
  name: string;
}

function App() {
  const users: User[] = [
    { id: 1, name: "Alice" },
    { id: 2, name: "Bob" }
  ];
  
  return (
    &lt;List 
      items={users}
      renderItem={(user) =&gt; &lt;span&gt;{user.name}&lt;/span&gt;}
    /&gt;
  );
}

// Generic type with default
interface ApiResponse<T = any> {
  data: T;
  status: number;
  message: string;
}

// Response with specific data type
type UserResponse = ApiResponse<User>;
</code></pre>
        </div>

        <h4>5. Union and Intersection Types</h4>
        <p>Union and intersection types allow you to combine types to express complex data structures:</p>

        <p><strong>Union Types:</strong> A value can be one of several types (OR).</p>
        <p><strong>Intersection Types:</strong> A value has all the properties of combined types (AND).</p>
        <p><strong>Type Narrowing:</strong> Techniques to work with union types safely.</p>
        
        <div class="code-example">
          <pre><code>// Union types
type ID = string | number;

function printID(id: ID) {
  console.log(id);
}

printID(101);    // Valid
printID("U101"); // Valid

// Union with complex types
type UserStatus = "active" | "inactive" | "pending";

interface UserBase {
  id: ID;
  name: string;
}

// AdminUser OR RegularUser
type User = AdminUser | RegularUser;

interface AdminUser extends UserBase {
  role: "admin";
  permissions: string[];
}

interface RegularUser extends UserBase {
  role: "user";
  favoriteItems: number[];
}

// Type narrowing with discriminated unions
function processUser(user: User) {
  console.log(user.name); // Common property, always safe
  
  // Type narrowing with discriminated property
  if (user.role === "admin") {
    console.log(user.permissions); // TypeScript knows this is AdminUser
  } else {
    console.log(user.favoriteItems); // TypeScript knows this is RegularUser
  }
}

// Intersection types
type Employee = UserBase & { 
  department: string;
  startDate: Date;
};

const newEmployee: Employee = {
  id: 1,
  name: "John",
  department: "Engineering",
  startDate: new Date()
};

// Type narrowing with type guards
function isAdminUser(user: User): user is AdminUser {
  return user.role === "admin";
}

function processUserWithGuard(user: User) {
  if (isAdminUser(user)) {
    console.log(user.permissions); // Safe
  }
}

// Union types in React props
interface ButtonProps {
  variant: "primary" | "secondary" | "danger";
  size?: "small" | "medium" | "large";
  onClick: () => void;
}

// Null or undefined handling with union types
type Nullable<T> = T | null | undefined;

function processValue(value: Nullable<string>) {
  if (value === null || value === undefined) {
    return "No value";
  }
  return value.toUpperCase();
}
</code></pre>
        </div>
        
        <div class="interview-tip">
          <p><span class="interview-icon">🎯</span> <strong>Interview Focus:</strong> When interviewing for TypeScript-React positions, be prepared to explain how TypeScript improves development experience and reduces runtime errors. Know how to properly type React components, props, and events.</p>
          <p>Common interview questions include:</p>
          <ul>
            <li>"What are the benefits of using TypeScript with React?"</li>
            <li>"Explain the difference between interface and type in TypeScript"</li>
            <li>"How would you type a form event handler in React?"</li>
            <li>"When would you use generics in a React component?"</li>
            <li>"How do you handle discriminated unions in TypeScript?"</li>
          </ul>
        </div>
      `,
          codeExample: `// TypeScript utility for building a type-safe form system
import React, { useState, ChangeEvent, FormEvent } from 'react';

// Form field configuration types
interface FieldConfig<T> {
  value: T;
  validate?: (value: T) => string | null;
  required?: boolean;
}

type FormConfig<T> = {
  [K in keyof T]: FieldConfig<T[K]>;
};

interface FormState<T> {
  values: T;
  errors: Partial<Record<keyof T, string>>;
  touched: Partial<Record<keyof T, boolean>>;
  isValid: boolean;
}

// Custom hook for form handling with TypeScript
function useForm<T extends Record<string, any>>(config: FormConfig<T>) {
  // Initialize state based on config
  const initialValues = Object.entries(config).reduce(
    (values, [key, field]) => ({
      ...values,
      [key]: field.value
    }),
    {}
  ) as T;

  const [formState, setFormState] = useState<FormState<T>>({
    values: initialValues,
    errors: {},
    touched: {},
    isValid: false
  });

  // Validate single field
  const validateField = (name: keyof T, value: any): string | null => {
    const field = config[name];

    if (field.required && (value === '' || value === null || value === undefined)) {
      return 'This field is required';
    }

    if (field.validate) {
      return field.validate(value);
    }

    return null;
  };

  // Validate all fields
  const validateForm = (formValues: T): Partial<Record<keyof T, string>> => {
    const newErrors: Partial<Record<keyof T, string>> = {};
    let isValid = true;

    for (const key in config) {
      const error = validateField(key, formValues[key]);
      if (error) {
        newErrors[key] = error;
        isValid = false;
      }
    }

    return newErrors;
  };

  // Handle field change
  const handleChange = <K extends keyof T>(
    name: K,
    event: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const value = event.target.type === 'checkbox'
      ? (event.target as HTMLInputElement).checked
      : event.target.value;

    const newValues = { ...formState.values, [name]: value };
    const error = validateField(name, value);
    const newErrors = { ...formState.errors, [name]: error };
    const newTouched = { ...formState.touched, [name]: true };

    setFormState({
      values: newValues,
      errors: newErrors,
      touched: newTouched,
      isValid: !Object.values(newErrors).some(error => error !== null && error !== undefined)
    });
  };

  // Handle form submission
  const handleSubmit = (
    onSubmit: (values: T) => void
  ) => (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    // Mark all fields as touched
    const newTouched = Object.keys(config).reduce(
      (touched, key) => ({ ...touched, [key]: true }),
      {}
    ) as Record<keyof T, boolean>;

    // Validate all fields
    const newErrors = validateForm(formState.values);
    const isValid = Object.values(newErrors).every(error => !error);

    setFormState({
      ...formState,
      errors: newErrors,
      touched: newTouched,
      isValid
    });

    if (isValid) {
      onSubmit(formState.values);
    }
  };

  // Reset form to initial values
  const resetForm = () => {
    setFormState({
      values: initialValues,
      errors: {},
      touched: {},
      isValid: false
    });
  };

  return {
    values: formState.values,
    errors: formState.errors,
    touched: formState.touched,
    isValid: formState.isValid,
    handleChange,
    handleSubmit,
    resetForm
  };
}

// Usage example
interface SignupFormData {
  username: string;
  email: string;
  password: string;
  agreeToTerms: boolean;
}

function SignupForm() {
  const formConfig: FormConfig<SignupFormData> = {
    username: {
      value: '',
      required: true,
      validate: (value) => 
        value.length < 3 ? 'Username must be at least 3 characters' : null
    },
    email: {
      value: '',
      required: true,
      validate: (value) => 
        !/^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/.test(value) ? 'Invalid email format' : null
    },
    password: {
      value: '',
      required: true,
      validate: (value) => 
        value.length < 8 ? 'Password must be at least 8 characters' : null
    },
    agreeToTerms: {
      value: false,
      required: true,
      validate: (value) => 
        !value ? 'You must agree to the terms and conditions' : null
    }
  };

  const {
    values,
    errors,
    touched,
    handleChange,
    handleSubmit,
    resetForm
  } = useForm<SignupFormData>(formConfig);

  const onSubmit = (data: SignupFormData) => {
    console.log('Form submitted:', data);
    // Submit to API, etc.
    resetForm();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="form-group">
        <label htmlFor="username">Username</label>
        <input
          id="username"
          type="text"
          value={values.username}
          onChange={(e) => handleChange('username', e)}
          className={touched.username && errors.username ? 'error' : ''}
        />
        {touched.username && errors.username && (
          <div className="error-message">{errors.username}</div>
        )}
      </div>

      <div className="form-group">
        <label htmlFor="email">Email</label>
        <input
          id="email"
          type="email"
          value={values.email}
          onChange={(e) => handleChange('email', e)}
          className={touched.email && errors.email ? 'error' : ''}
        />
        {touched.email && errors.email && (
          <div className="error-message">{errors.email}</div>
        )}
      </div>

      <div className="form-group">
        <label htmlFor="password">Password</label>
        <input
          id="password"
          type="password"
          value={values.password}
          onChange={(e) => handleChange('password', e)}
          className={touched.password && errors.password ? 'error' : ''}
        />
        {touched.password && errors.password && (
          <div className="error-message">{errors.password}</div>
        )}
      </div>

      <div className="form-group checkbox">
        <input
          id="agreeToTerms"
          type="checkbox"
          checked={values.agreeToTerms}
          onChange={(e) => handleChange('agreeToTerms', e)}
        />
        <label htmlFor="agreeToTerms">I agree to the terms and conditions</label>
        {touched.agreeToTerms && errors.agreeToTerms && (
          <div className="error-message">{errors.agreeToTerms}</div>
        )}
      </div>

      <div className="form-buttons">
        <button type="submit">Sign Up</button>
        <button type="button" onClick={resetForm}>Reset</button>
      </div>
    </form>
  );
}

export { useForm, SignupForm };
export type { FormConfig, FormState };`,
          exercise: {
            instructions:
              'Create a TypeScript utility that builds upon the concepts of Generics, Function Types, and Interfaces to implement a flexible data fetching hook. Your hook should: (1) Support different data types with TypeScript generics, (2) Handle loading, error, and success states, (3) Include proper TypeScript types for all states, (4) Support request cancellation, (5) Include retry functionality with configurable options.',
          },
        },
        {
          title: 'TypeScript with React Components (5 Key Concepts)',
          explanation: `
        <p>These five concepts focus on how to effectively type React components and their props:</p>

        <h4>6. Typing Component Props</h4>
        <p>Properly typed component props provide clear contracts and self-documenting code:</p>

        <p><strong>Props Interface:</strong> Define the shape of component props.</p>
        <p><strong>Optional and Required Props:</strong> Control which props must be provided.</p>
        <p><strong>Prop Types Best Practices:</strong> Techniques for maintainable component APIs.</p>
        
        <div class="code-example">
          <pre><code>import React from 'react';

// Basic props interface
interface ButtonProps {
  label: string;              // Required prop
  onClick: () => void;        // Required function prop
  disabled?: boolean;         // Optional prop with ? modifier
  variant?: 'primary' | 'secondary' | 'danger'; // Optional with specific values
  size?: 'small' | 'medium' | 'large'; // Optional union type
}

// Component with typed props
const Button: React.FC<ButtonProps> = ({
  label,
  onClick,
  disabled = false,  // Default value for optional prop
  variant = 'primary',
  size = 'medium'
}) => {
  return (
    &lt;button
      onClick={onClick}
      disabled={disabled}
      className={\`btn btn-\${variant} btn-\${size}\`}
    &gt;
      {label}
    &lt;/button&gt;
  );
};

// Using the component
function App() {
  return (
    &lt;div&gt;
      {/* All required props provided */}
      &lt;Button
        label="Click Me"
        onClick={() => console.log('Button clicked')}
      /&gt;
      
      {/* With optional props */}
      &lt;Button
        label="Danger Button"
        onClick={() => console.log('Danger button clicked')}
        variant="danger"
        disabled={true}
      /&gt;
      
      {/* TypeScript would error on this: */}
      {/* &lt;Button onClick={() => {}} /&gt; */}
      {/* Error: Property 'label' is missing */}
      
      {/* TypeScript would error on this: */}
      {/* &lt;Button label="Invalid" onClick={() => {}} variant="invalid" /&gt; */}
      {/* Error: Type '"invalid"' is not assignable to type... */}
    &lt;/div&gt;
  );
}

// Props with children
interface CardProps {
  title: string;
  children: React.ReactNode; // Accepts any valid JSX as children
}

const Card: React.FC<CardProps> = ({ title, children }) => {
  return (
    &lt;div className="card"&gt;
      &lt;div className="card-header"&gt;{title}&lt;/div&gt;
      &lt;div className="card-body"&gt;{children}&lt;/div&gt;
    &lt;/div&gt;
  );
};

// Props with render prop pattern
interface ListProps<T> {
  items: T[];
  renderItem: (item: T, index: number) => React.ReactNode;
}

function List<T>({ items, renderItem }: ListProps<T>) {
  return (
    &lt;ul&gt;
      {items.map((item, index) => (
        &lt;li key={index}&gt;{renderItem(item, index)}&lt;/li&gt;
      ))}
    &lt;/ul&gt;
  );
}

// Props extending from another interface
interface BaseProps {
  className?: string;
  style?: React.CSSProperties;
  id?: string;
}

interface InputProps extends BaseProps {
  value: string;
  onChange: (value: string) => void;
  type?: 'text' | 'password' | 'email';
  placeholder?: string;
}

const Input: React.FC<InputProps> = ({
  value,
  onChange,
  type = 'text',
  placeholder,
  ...restProps // Get the rest of the BaseProps
}) => {
  return (
    &lt;input
      type={type}
      value={value}
      onChange={(e) =&gt; onChange(e.target.value)}
      placeholder={placeholder}
      {...restProps}
    /&gt;
  );
};
</code></pre>
        </div>

        <h4>7. Typing Functional Components</h4>
        <p>TypeScript offers multiple approaches to typing functional React components:</p>

        <p><strong>Function Component Types:</strong> Different ways to define component types.</p>
        <p><strong>Return Types:</strong> Define what a component renders.</p>
        <p><strong>Type Inference:</strong> Understanding when TypeScript can infer types for you.</p>
        
        <div class="code-example">
          <pre><code>import React, { ReactElement, ReactNode } from 'react';

// Approach 1: React.FC / React.FunctionComponent (older style)
// Includes children automatically, but discouraged in modern TS-React
interface GreetingProps {
  name: string;
}

const Greeting: React.FC<GreetingProps> = ({ name }) => {
  return &lt;h1&gt;Hello, &lt;span&gt;{name}&lt;/span&gt;!&lt;/h1&gt;;
};

// Approach 2: Function declaration with explicit props and return type (recommended)
interface ButtonProps {
  label: string;
  onClick: () => void;
}

function Button({ label, onClick }: ButtonProps): ReactElement {
  return &lt;button onClick={onClick}&gt;{label}&lt;/button&gt;;
}

// Approach 3: Arrow function with inline props type
const Card = ({ 
  title, 
  children 
}: { 
  title: string; 
  children: ReactNode 
}): ReactElement => {
  return (
    &lt;div className="card"&gt;
      &lt;h2&gt;{title}&lt;/h2&gt;
      &lt;div&gt;{children}&lt;/div&gt;
    &lt;/div&gt;
  );
};

// Approach 4: Generic function component
interface ListProps<T> {
  items: T[];
  renderItem: (item: T) => ReactNode;
}

function List<T>({ items, renderItem }: ListProps<T>): ReactElement {
  return (
    &lt;ul&gt;
      {items.map((item, index) => (
        &lt;li key={index}&gt;{renderItem(item)}&lt;/li&gt;
      ))}
    &lt;/ul&gt;
  );
}

// Typing components that return different element types
// Using JSX.Element as return type
const TextOrNumber = ({ 
  isNumber, 
  value 
}: { 
  isNumber: boolean; 
  value: string | number 
}): JSX.Element => {
  return isNumber ? "&lt;span&gt;{Number(value)}&lt;/span&gt;" : "&lt;span&gt;{String(value)}&lt;/span&gt;";
};

// Component with type inference
// No explicit return type, TypeScript infers JSX.Element
const SimpleComponent = ({ text = "Default" }) => {
  return <p>{\`&lt;p&gt;\${text}&lt;/p&gt;\`}</p>;
};

// Component that may return null
const ConditionalComponent = ({ 
  condition, 
  children 
}: { 
  condition: boolean; 
  children: ReactNode 
}): ReactElement | null => {
  if (!condition) {
    return null;
  }
  
  return <div>&lt;p&gt;{children}&lt;/p&gt;</div>;
};

// Component with union type return
function LoadingOrData({ 
  isLoading, 
  data 
}: { 
  isLoading: boolean; 
  data?: string[] 
}): JSX.Element {
  if (isLoading) {
    return &lt;div&gt;Loading...&lt;/div&gt;;
  }
  
  if (!data || data.length === 0) {
    return &lt;p&gt;No data available&lt;/p&gt;;
  }
  
  return (
    &lt;ul&gt;
      {data.map((item, index) => (
        &lt;li key={index}&gt;{item}&lt;/li&gt;
      ))}
    &lt;/ul&gt;
  );
}
</code></pre>
        </div>

        <h4>8. Typing Class Components</h4>
        <p>While less common in new React applications, class components still exist in many codebases:</p>

        <p><strong>Class Component with Props and State:</strong> Typing both props and state.</p>
        <p><strong>Lifecycle Methods:</strong> Properly typing lifecycle method parameters.</p>
        <p><strong>Event Handling in Class Components:</strong> Binding and typing events.</p>
        
        <div class="code-example">
          <pre><code>import React, { Component } from 'react';

// Basic class component with props
interface CounterProps {
  initialValue?: number;
  step?: number;
}

interface CounterState {
  count: number;
}

class Counter extends Component<CounterProps, CounterState> {
  // Default props
  static defaultProps: Partial<CounterProps> = {
    initialValue: 0,
    step: 1
  };

  constructor(props: CounterProps) {
    super(props);
    
    // Initialize state
    this.state = {
      count: props.initialValue || 0
    };
    
    // Binding methods
    this.increment = this.increment.bind(this);
    this.decrement = this.decrement.bind(this);
  }
  
  // Method with binding in constructor
  increment(): void {
    this.setState(prevState => ({
      count: prevState.count + (this.props.step || 1)
    }));
  }
  
  // Method as arrow function (auto-binding)
  decrement = (): void => {
    this.setState(prevState => ({
      count: prevState.count - (this.props.step || 1)
    }));
  };
  
  // Lifecycle method with typed parameters
  componentDidUpdate(prevProps: CounterProps, prevState: CounterState): void {
    if (prevState.count !== this.state.count) {
      console.log('Count changed to:', this.state.count);
    }
  }
  
  // Typed event handler
  handleInputChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const newValue = parseInt(e.target.value, 10) || 0;
    this.setState({ count: newValue });
  };
  
  render() {
    return (
      &lt;div&gt;
        &lt;h2&gt;Counter: {this.state.count}&lt;/h2&gt;
        &lt;button onClick={() => this.setState({ count: this.state.count - 1 })}&gt;
          -
        &lt;/button&gt;
        &lt;button onClick={() => this.setState({ count: this.state.count + 1 })}&gt;
          +
        &lt;/button&gt;
        &lt;div&gt;
          &lt;input 
            type="number" 
            value={this.state.count} 
            onChange={this.handleInputChange} 
          /&gt;
        &lt;/div&gt;
      &lt;/div&gt;
    );
  }
}

// Generic class component
interface DataListProps<T> {
  items: T[];
  renderItem: (item: T) => React.ReactNode;
  title: string;
}

interface DataListState {
  isCollapsed: boolean;
}

class DataList<T> extends Component<DataListProps<T>, DataListState> {
  constructor(props: DataListProps<T>) {
    super(props);
    this.state = {
      isCollapsed: false
    };
  }
  
  toggleCollapse = (): void => {
    this.setState(prevState => ({
      isCollapsed: !prevState.isCollapsed
    }));
  };
  
  render() {
    const { items, renderItem, title } = this.props;
    const { isCollapsed } = this.state;
    
    return (
      &lt;div&gt;
        &lt;h3 onClick={this.toggleCollapse}&gt;
          {title} {isCollapsed ? '▸' : '▾'}
        &lt;/h3&gt;
        
        {!isCollapsed && (
          &lt;ul&gt;
            {items.map((item, index) => (
              &lt;li key={index}&gt;{renderItem(item)}&lt;/li&gt;
            ))}
          &lt;/ul&gt;
        )}
      &lt;/div&gt;
    );
  }
}

// Usage of generic class component
type User = {
  id: number;
  name: string;
};

function App() {
  const users: User[] = [
    { id: 1, name: 'Alice' },
    { id: 2, name: 'Bob' }
  ];
  
  return (
    &lt;div&gt;
      &lt;Counter initialValue={10} step={5} /&gt;
      
      &lt;DataList&lt;User&gt;
        items={users}
        renderItem={(user) =&gt; &lt;span&gt;{user.name}&lt;/span&gt;}
        title="User List"
      /&gt;
    &lt;/div&gt;
  );
}
</code></pre>
        </div>

        <h4>9. Children and Render Props Typing</h4>
        <p>TypeScript helps ensure correct usage of React patterns like children and render props:</p>

        <p><strong>Children Types:</strong> Different ways to type component children.</p>
        <p><strong>Render Props:</strong> Typing function props that return components.</p>
        <p><strong>Slots Pattern:</strong> Typed component composition techniques.</p>
        
        <div class="code-example">
          <pre><code>import React, { ReactNode, ReactElement } from 'react';

// Basic children typing
interface ContainerProps {
  children: ReactNode; // Can be any valid JSX
}

const Container: React.FC<ContainerProps> = ({ children }) => {
  return &lt;div className="container"&gt;{children}&lt;/div&gt;;
};

// Constraining children to specific types
interface ButtonGroupProps {
  children: ReactElement | ReactElement[]; // Must be ReactElement(s)
}

const ButtonGroup: React.FC<ButtonGroupProps> = ({ children }) => {
  // We can use React.Children.map to safely iterate
  return (
    &lt;div className="btn-group"&gt;
      {React.Children.map(children, child =&gt; {
        // Additional type checking or cloning could happen here
        return child;
      })}
    &lt;/div&gt;
  );
};

// Typing render props
interface RenderProps<T> {
  data: T[];
  render: (item: T) => ReactNode;
}

function DataRenderer<T>({ data, render }: RenderProps<T>) {
  return (
    &lt;div&gt;
      {data.map((item, index) => (
        &lt;div key={index}&gt;{render(item)}&lt;/div&gt;
      ))}
    &lt;/div&gt;
  );
}

// Children as a function (another render prop pattern)
interface ToggleProps {
  children: (state: { isOn: boolean; toggle: () => void }) => ReactNode;
}

const Toggle: React.FC<ToggleProps> = ({ children }) => {
  const [isOn, setIsOn] = React.useState(false);
  const toggle = () => setIsOn(prev => !prev);
  
  return &lt;>{children({ isOn, toggle })}&lt;/&gt;;
};

// Component with specific children constraint
interface FormProps {
  children: ReactElement<typeof FormField> | ReactElement<typeof FormField>[];
  onSubmit: (data: Record<string, any>) => void;
}

const FormField = ({ 
  name, 
  label 
}: { 
  name: string; 
  label: string 
}) => (
  &lt;div&gt;
    &lt;label&gt;{label}&lt;/label&gt;
    &lt;input name={name} /&gt;
  &lt;/div&gt;
);

const Form: React.FC<FormProps> = ({ children, onSubmit }) => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const data: Record<string, any> = {};
    
    formData.forEach((value, key) => {
      data[key] = value;
    });
    
    onSubmit(data);
  };
  
  return (
    &lt;form onSubmit={handleSubmit}&gt;
      {children}
      &lt;button type="submit"&gt;Submit&lt;/button&gt;
    &lt;/form&gt;
  );
};

// Compound components with TypeScript
interface TabsProps {
  children: ReactNode;
  defaultTab?: string;
}

interface TabProps {
  label: string;
  tabId: string;
  children: ReactNode;
}

const Tab: React.FC<TabProps> = ({ children }) => {
  // Actual rendering happens in the Tabs component
  return <>{children}</>;
};

const Tabs: React.FC<TabsProps> = ({ children, defaultTab }) => {
  return <>{children.replace(/[&<>]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;' }[c]))}</>;
  const [activeTab, setActiveTab] = React.useState(defaultTab);
  
  // Get all child tabs
  const tabs = React.Children.toArray(children)
    .filter((child): child is ReactElement<TabProps> => 
      React.isValidElement(child) && 
      (child.type as any).displayName === 'Tab'
    );
  
  return (
    &lt;div&gt;
      &lt;div className="tabs-header"&gt;
        {tabs.map((tab) =&gt; (
          &lt;button 
            key={tab.props.tabId}
            onClick={() =&gt; setActiveTab(tab.props.tabId)}
            className={activeTab === tab.props.tabId ? 'active' : ''}
          &gt;
            {tab.props.label}
          &lt;/button&gt;
        ))}
      &lt;/div&gt;
      &lt;div className="tabs-content"&gt;
        {tabs.find(tab =&gt; tab.props.tabId === activeTab)?.props.children}
      &lt;/div&gt;
    &lt;/div&gt;
  );
};

// Set displayName to make the child type check work
Tab.displayName = 'Tab';

// Usage examples
function App() {
  return (
    &lt;div&gt;
      &lt;Container&gt;
        &lt;h1&gt;Basic Container&lt;/h1&gt;
        &lt;p&gt;With mixed content&lt;/p&gt;
      &lt;/Container&gt;

      &lt;ButtonGroup&gt;
        &lt;button&gt;One&lt;/button&gt;
        &lt;button&gt;Two&lt;/button&gt;
      &lt;/ButtonGroup&gt;

      &lt;DataRenderer
        data={[1, 2, 3]}
        render={(num) => &lt;span&gt;Number: {num}&lt;/span&gt;}
      /&gt;

      &lt;Toggle&gt;
        {({ isOn, toggle }) => (
          &lt;button onClick={toggle}&gt;
            {isOn ? 'ON' : 'OFF'}
          &lt;/button&gt;
        )}
      &lt;/Toggle&gt;

      &lt;Form onSubmit={data => console.log(data)}&gt;
        &lt;FormField name="username" label="Username" /&gt;
        &lt;FormField name="password" label="Password" /&gt;
      &lt;/Form&gt;

      &lt;Tabs defaultTab="tab1"&gt;
        &lt;Tab tabId="tab1" label="First Tab"&gt;
          &lt;p&gt;Content for first tab&lt;/p&gt;
        &lt;/Tab&gt;
        &lt;Tab tabId="tab2" label="Second Tab"&gt;
          &lt;p&gt;Content for second tab&lt;/p&gt;
        &lt;/Tab&gt;
      &lt;/Tabs&gt;
    &lt;/div&gt;
  );
}
</code></pre>
        </div>

        <h4>10. DefaultProps and PropTypes with TypeScript</h4>
        <p>TypeScript provides several ways to handle default props and prop validation:</p>

        <p><strong>Default Props:</strong> Setting default values for optional props.</p>
        <p><strong>Required vs Optional Props:</strong> Controlling prop requirements with TypeScript.</p>
        <p><strong>TypeScript vs PropTypes:</strong> Modern approach to prop validation.</p>
        
        <div class="code-example">
          <pre><code>import React from 'react';

// Approach 1: Default parameter values (recommended for functional components)
interface ButtonProps {
  label: string;
  variant?: 'primary' | 'secondary' | 'danger';
  size?: 'small' | 'medium' | 'large';
  onClick: () => void;
}

function Button({ 
  label, 
  variant = 'primary', // Default value in destructuring
  size = 'medium', 
  onClick 
}: ButtonProps) {
  return (
    &lt;button 
      className={\`btn btn-\${variant} btn-\${size}\`}
      onClick={onClick}
    &gt;
      {label}
    &lt;/button&gt;
  );
}

// Approach 2: Using defaultProps (older style, used with class components)
interface CardProps {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
  bordered?: boolean;
  cardStyle?: React.CSSProperties;
}

class Card extends React.Component<CardProps> {
  // Static defaultProps
  static defaultProps: Partial<CardProps> = {
    subtitle: '',
    bordered: true
  };
  
  render() {
    const { title, subtitle, children, bordered, cardStyle } = this.props;
    
    return (
      &lt;div 
        className={\`card \${bordered ? 'bordered' : ''}\`} 
        style={cardStyle}
      &gt;
        &lt;div className="card-header"&gt;
          &lt;h2&gt;{title}&lt;/h2&gt;
          {subtitle && &lt;h3&gt;{subtitle}&lt;/h3&gt;}
        &lt;/div&gt;
        &lt;div className="card-body"&gt;
          {children}
        &lt;/div&gt;
      &lt;/div&gt;
    );
  }
}

// Approach 3: Helper function for default props (advanced)
function withDefaultProps&lt;P extends object, DP extends Partial&lt;P&gt;&gt;(
  defaultProps: DP,
  Component: React.ComponentType&lt;P & DP&gt;
): React.ComponentType&lt;P&gt; {
  Component.defaultProps = defaultProps;
  return Component;
}

interface AvatarProps {
  src: string;
  alt: string;
  size: 'small' | 'medium' | 'large';
  shape: 'circle' | 'square';
}

const Avatar = ({ src, alt, size, shape }: AvatarProps) => {
  return (
    &lt;img
      src={src}
      alt={alt}
      className={\`avatar avatar-\${size} avatar-\${shape}\`}
    /&gt;
  );
};

// Apply default props
const AvatarWithDefaults = withDefaultProps<AvatarProps, Partial<AvatarProps>>(
  {
    size: 'medium',
    shape: 'circle'
  },
  Avatar
);

// Approach 4: Required vs Optional Pattern
// A common pattern to separate required from optional props
interface RequiredInputProps {
  value: string;
  onChange: (value: string) => void;
}

interface OptionalInputProps {
  label?: string;
  placeholder?: string;
  disabled?: boolean;
  maxLength?: number;
}

// Combined props type
type InputProps = RequiredInputProps & OptionalInputProps;

// Default values for optional props
const defaultInputProps: OptionalInputProps = {
  label: '',
  placeholder: '',
  disabled: false,
  maxLength: undefined
};

const Input: React.FC<InputProps> = (props) => {
  // Merge defaults with provided props
  const { 
    value, 
    onChange, 
    label, 
    placeholder, 
    disabled, 
    maxLength 
  } = { ...defaultInputProps, ...props };
  
  return (
    &lt;div className="input-group"&gt;
      {label && &lt;label&gt;{label}&lt;/label&gt;}
      &lt;input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        disabled={disabled}
        maxLength={maxLength}
      /&gt;
    &lt;/div&gt;
  );
};

// Usage examples
function App() {
  return (
    &lt;div&gt;
      &lt;!-- Default parameter approach --&gt;
      &lt;Button 
        label="Click Me" 
        onClick={() => alert('Clicked')}
        // variant defaults to 'primary'
        // size defaults to 'medium'
      /&gt;
      
      &lt;!-- Static defaultProps approach --&gt;
      &lt;Card title="My Card"&gt;
        &lt;p&gt;Card content here&lt;/p&gt;
      &lt;/Card&gt;
      
      &lt;!-- Helper function approach --&gt;
      &lt;AvatarWithDefaults
        src="https://example.com/avatar.jpg"
        alt="User Avatar"
        // size defaults to 'medium'
        // shape defaults to 'circle'
      /&gt;
      
      &lt;!-- Required vs Optional pattern --&gt;
      &lt;Input
        value="Hello World"
        onChange={(newValue) => console.log(newValue)}
        // All other props are optional with defaults
      /&gt;
    &lt;/div&gt;
  );
}
</code></pre>
        </div>
        
        <div class="interview-tip">
          <p><span class="interview-icon">🎯</span> <strong>Interview Focus:</strong> When discussing React components with TypeScript, be prepared to explain how to properly type components for different use cases. Know the pros and cons of different component typing approaches.</p>
          <p>Common interview questions include:</p>
          <ul>
            <li>"What's the difference between React.FC and function declaration for typing components?"</li>
            <li>"How would you type a component that renders different elements conditionally?"</li>
            <li>"What are the different ways to type children in React components?"</li>
            <li>"How would you implement and type a compound component pattern in TypeScript?"</li>
            <li>"What's the best way to handle default props in TypeScript React components?"</li>
          </ul>
        </div>
      `,
          codeExample: `// Advanced TypeScript Component Library Example
import React, { 
  useState, 
  useEffect, 
  ReactNode, 
  ReactElement, 
  ComponentPropsWithoutRef, 
  ElementType 
} from 'react';

// ---------------------------------------------------
// Utility Types
// ---------------------------------------------------

// Polymorphic component type (allows 'as' prop)
type PolymorphicRef<C extends ElementType> = React.ComponentPropsWithRef<C>['ref'];

type PolymorphicComponentProps<C extends ElementType, Props = {}> = {
  as?: C;
  ref?: PolymorphicRef<C>;
} & ComponentPropsWithoutRef<C> & Props;

// Component with 'as' prop and custom props
export type PolymorphicComponent<
  DefaultElement extends ElementType,
  Props = {}
> = <C extends ElementType = DefaultElement>(
  props: PolymorphicComponentProps<C, Props>
) => ReactElement | null;

// Base props for all form elements
interface FormControlBaseProps {
  id?: string;
  label?: string;
  error?: string;
  disabled?: boolean;
  required?: boolean;
  className?: string;
}

// ---------------------------------------------------
// Box Component (Polymorphic)
// ---------------------------------------------------

type BoxOwnProps = {
  children: ReactNode;
};

// Box component - allows changing the underlying HTML element
export const Box: PolymorphicComponent<'div', BoxOwnProps> = ({
  as,
  children,
  ...rest
}) => {
  const Component = as || 'div';
  return <Component {...rest}>{children}</Component>;
};

// ---------------------------------------------------
// Text Component
// ---------------------------------------------------

type TextVariants = 'body' | 'heading' | 'caption';
type TextSizes = 'sm' | 'md' | 'lg' | 'xl';

interface TextOwnProps {
  variant?: TextVariants;
  size?: TextSizes;
  weight?: 'normal' | 'bold';
  italic?: boolean;
}

export const Text: PolymorphicComponent<'p', TextOwnProps> = ({
  as,
  children,
  variant = 'body',
  size = 'md',
  weight = 'normal',
  italic = false,
  className = '',
  ...rest
}) => {
  const Component = as || 'p';
  
  // Create class based on props
  const classes = [
    \`text-\${variant}\`, 
    \`text-\${size}\`, 
    \`font-\${weight}\`,
    italic ? 'italic' : '',
    className
  ].filter(Boolean).join(' ');
  
  return (
    <Component className={classes} {...rest}>
      {children}
    </Component>
  );
};

// ---------------------------------------------------
// Button Component
// ---------------------------------------------------

interface ButtonProps extends ComponentPropsWithoutRef<'button'> {
  variant?: 'primary' | 'secondary' | 'danger' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  fullWidth?: boolean;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  isLoading = false,
  disabled = false,
  leftIcon,
  rightIcon,
  fullWidth = false,
  className = '',
  ...rest
}) => {
  const classes = [
    'btn',
    \`btn-\${variant}\`,
    \`btn-\${size}\`,
    fullWidth ? 'w-full' : '',
    isLoading ? 'loading' : '',
    className
  ].filter(Boolean).join(' ');
  
  return (
    <button 
      className={classes} 
      disabled={disabled || isLoading}
      {...rest}
    >
      {leftIcon && <span className="btn-icon-left">{leftIcon}</span>}
      {children}
      {rightIcon && <span className="btn-icon-right">{rightIcon}</span>}
    </button>
  );
};

// ---------------------------------------------------
// Input Components
// ---------------------------------------------------

interface InputProps extends ComponentPropsWithoutRef<'input'>, FormControlBaseProps {
  onChange?: (value: string) => void;
}

export const Input: React.FC<InputProps> = ({
  id,
  label,
  error,
  disabled = false,
  required = false,
  className = '',
  onChange,
  ...rest
}) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (onChange) {
      onChange(e.target.value);
    }
  };
  
  const inputId = id || \`input-\${Math.random().toString(36).substr(2, 9)}\`;
  
  return (
    <div className="form-control">
      {label && (
        <label htmlFor={inputId} className="form-label">
          {label}
          {required && <span className="required-mark">*</span>}
        </label>
      )}
      <input
        id={inputId}
        className={\`form-input \${error ? 'has-error' : ''} \${className}\`}
        disabled={disabled}
        required={required}
        onChange={handleChange}
        {...rest}
      />
      {error && <div className="error-message">{error}</div>}
    </div>
  );
};

// ---------------------------------------------------
// Select Component
// ---------------------------------------------------

interface SelectOption {
  value: string;
  label: string;
  disabled?: boolean;
}

interface SelectProps extends Omit<ComponentPropsWithoutRef<'select'>, 'onChange'>, FormControlBaseProps {
  options: SelectOption[];
  onChange?: (value: string) => void;
  placeholder?: string;
}

export const Select: React.FC<SelectProps> = ({
  id,
  label,
  options,
  error,
  disabled = false,
  required = false,
  className = '',
  placeholder,
  onChange,
  ...rest
}) => {
  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    if (onChange) {
      onChange(e.target.value);
    }
  };
  
  const selectId = id || \`select-\${Math.random().toString(36).substr(2, 9)}\`;
  
  return (
    <div className="form-control">
      {label && (
        <label htmlFor={selectId} className="form-label">
          {label}
          {required && <span className="required-mark">*</span>}
        </label>
      )}
      <select
        id={selectId}
        className={\`form-select \${error ? 'has-error' : ''} \${className}\`}
        disabled={disabled}
        required={required}
        onChange={handleChange}
        {...rest}
      >
        {placeholder && (
          <option value="" disabled>
            {placeholder}
          </option>
        )}
        {options.map((option) => (
          <option
            key={option.value}
            value={option.value}
            disabled={option.disabled}
          >
            {option.label}
          </option>
        ))}
      </select>
      {error && <div className="error-message">{error}</div>}
    </div>
  );
};

// ---------------------------------------------------
// Card Component with compound pattern
// ---------------------------------------------------

interface CardProps extends ComponentPropsWithoutRef<'div'> {
  children: ReactNode;
}

interface CardHeaderProps extends ComponentPropsWithoutRef<'div'> {
  children: ReactNode;
}

interface CardBodyProps extends ComponentPropsWithoutRef<'div'> {
  children: ReactNode;
}

interface CardFooterProps extends ComponentPropsWithoutRef<'div'> {
  children: ReactNode;
}

const CardHeader: React.FC<CardHeaderProps> = ({ 
  children, 
  className = '', 
  ...rest 
}) => (
  <div className={\`card-header \${className}\`} {...rest}>
    {children}
  </div>
);

const CardBody: React.FC<CardBodyProps> = ({ 
  children, 
  className = '', 
  ...rest 
}) => (
  <div className={\`card-body \${className}\`} {...rest}>
    {children}
  </div>
);

const CardFooter: React.FC<CardFooterProps> = ({ 
  children, 
  className = '', 
  ...rest 
}) => (
  <div className={\`card-footer \${className}\`} {...rest}>
    {children}
  </div>
);

export const Card: React.FC<CardProps> & {
  Header: typeof CardHeader;
  Body: typeof CardBody;
  Footer: typeof CardFooter;
} = ({ children, className = '', ...rest }) => (
  <div className={\`card \${className}\`} {...rest}>
    {children}
  </div>
);

// Attach compound components
Card.Header = CardHeader;
Card.Body = CardBody;
Card.Footer = CardFooter;

// ---------------------------------------------------
// Usage Example
// ---------------------------------------------------

interface User {
  id: number;
  name: string;
  email: string;
  role: string;
}

const UserForm: React.FC = () => {
  const [formData, setFormData] = useState<Partial<User>>({});
  const [errors, setErrors] = useState<Partial<Record<keyof User, string>>>({});
  const [isLoading, setIsLoading] = useState(false);
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate API call
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      console.log('Form submitted:', formData);
      // Reset form
      setFormData({});
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setIsLoading(false);
    }
  };
  
  const handleChange = (field: keyof User) => (value: string) => {
    setFormData({
      ...formData,
      [field]: value
    });
    
    // Clear error when field is changed
    if (errors[field]) {
      setErrors({
        ...errors,
        [field]: ''
      });
    }
  };
  
  return (
    <Card>
      <Card.Header>
        <Text as="h2" variant="heading" size="lg">
          User Information
        </Text>
      </Card.Header>
      
      <Card.Body>
        <form onSubmit={handleSubmit}>
          <Box as="div" className="form-grid">
            <Input
              label="Name"
              value={formData.name || ''}
              onChange={handleChange('name')}
              error={errors.name}
              required
            />
            
            <Input
              label="Email"
              type="email"
              value={formData.email || ''}
              onChange={handleChange('email')}
              error={errors.email}
              required
            />
            
            <Select
              label="Role"
              value={formData.role || ''}
              onChange={handleChange('role')}
              options={[
                { value: 'admin', label: 'Administrator' },
                { value: 'editor', label: 'Editor' },
                { value: 'viewer', label: 'Viewer' }
              ]}
              placeholder="Select a role"
              error={errors.role}
              required
            />
          </Box>
          
          <Card.Footer>
            <Button
              type="submit"
              variant="primary"
              isLoading={isLoading}
              rightIcon={<span>➔</span>}
            >
              Save Changes
            </Button>
          </Card.Footer>
        </form>
      </Card.Body>
    </Card>
  );
};

export { UserForm };`,
          exercise: {
            instructions:
              'Create a fully typed form component library in TypeScript that includes: (1) A base FormField component with proper TypeScript interfaces, (2) Specialized input components (TextInput, NumberInput, Select) that extend the base type, (3) A Form component that can validate fields based on a schema, (4) Proper typing for all form events and state, (5) A flexible, type-safe API that developers can easily extend.',
          },
        },
        {
          title: 'TypeScript with React Hooks and State Management (5 Key Concepts)',
          explanation: `
        <p>These five concepts focus on effectively typing React hooks and state management:</p>

        <h4>11. Typing useState and useReducer</h4>
        <p>State management hooks require proper typing to ensure type safety of state updates:</p>

        <p><strong>Typed useState:</strong> Properly typing the state and setState function.</p>
        <p><strong>Typed useReducer:</strong> Creating type-safe reducers with action types.</p>
        <p><strong>Discriminated Union Actions:</strong> Type-safe actions with TypeScript.</p>
        
        <div class="code-example">
          <pre><code>import React, { useState, useReducer } from 'react';

// Basic useState with type inference
function Counter() {
  // TypeScript infers number type
  const [count, setCount] = useState(0);
  
  return (
    &lt;div&gt;
      &lt;p&gt;Count: {count}&lt;/p&gt;
      &lt;button onClick={() => setCount(count + 1)}&gt;
        Increment
      &lt;/button&gt;
    &lt;/div&gt;
  );
}

// useState with explicit typing
function UserProfile() {
  // Explicitly define the type
  interface User {
    id: number;
    name: string;
    email: string;
  }
  
  const [user, setUser] = useState<User | null>(null);
  
  const fetchUser = () => {
    // Simulated API call
    setUser({
      id: 1,
      name: 'John Doe',
      email: 'john@example.com'
    });
  };
  
  // Reset user
  const clearUser = () => {
    setUser(null);
  };
  
  return (
    &lt;div&gt;
      &lt;button onClick={fetchUser}&gt;Fetch User&lt;/button&gt;
      &lt;button onClick={clearUser}&gt;Clear&lt;/button&gt;
      
      {user ? (
        &lt;div&gt;
          &lt;h2&gt;{user.name}&lt;/h2&gt;
          &lt;p&gt;{user.email}&lt;/p&gt;
        &lt;/div&gt;
      ) : (
        &lt;p&gt;No user loaded&lt;/p&gt;
      )}
    &lt;/div&gt;
  );
}

// useState with complex object and partial updates
function TaskManager() {
  interface Task {
    id: number;
    title: string;
    description: string;
    status: 'todo' | 'inProgress' | 'done';
    priority: 'low' | 'medium' | 'high';
    dueDate?: Date;
  }
  
  const [task, setTask] = useState<Task>({
    id: 1,
    title: 'Complete project',
    description: 'Finish the TypeScript React project',
    status: 'todo',
    priority: 'high'
  });
  
  // Update a single field
  const updateStatus = (newStatus: Task['status']) => {
    setTask(prevTask => ({
      ...prevTask,
      status: newStatus
    }));
  };
  
  return (
    &lt;div&gt;
      &lt;h2&gt;{task.title}&lt;/h2&gt;
      &lt;p&gt;Status: {task.status}&lt;/p&gt;
      &lt;button onClick={() =&gt; updateStatus('inProgress')}&gt;Start Task&lt;/button&gt;
      &lt;button onClick={() =&gt; updateStatus('done')}&gt;Complete Task&lt;/button&gt;
    &lt;/div&gt;
  );
}

// useReducer with type-safe actions
function TodoApp() {
  // Define the state type
  interface Todo {
    id: number;
    text: string;
    completed: boolean;
  }
  
  interface TodoState {
    todos: Todo[];
    filter: 'all' | 'active' | 'completed';
  }
  
  // Define action types with discriminated union
  type TodoAction =
    | { type: 'ADD_TODO'; text: string }
    | { type: 'TOGGLE_TODO'; id: number }
    | { type: 'REMOVE_TODO'; id: number }
    | { type: 'SET_FILTER'; filter: TodoState['filter'] };
  
  // Initial state
  const initialState: TodoState = {
    todos: [],
    filter: 'all'
  };
  
  // Reducer function
  function todoReducer(state: TodoState, action: TodoAction): TodoState {
    switch (action.type) {
      case 'ADD_TODO':
        return {
          ...state,
          todos: [
            ...state.todos,
            {
              id: Date.now(),
              text: action.text,
              completed: false
            }
          ]
        };
      case 'TOGGLE_TODO':
        return {
          ...state,
          todos: state.todos.map(todo =>
            todo.id === action.id
              ? { ...todo, completed: !todo.completed }
              : todo
          )
        };
      case 'REMOVE_TODO':
        return {
          ...state,
          todos: state.todos.filter(todo => todo.id !== action.id)
        };
      case 'SET_FILTER':
        return {
          ...state,
          filter: action.filter
        };
      default:
        // This ensures exhaustive checking of all action types
        const _exhaustiveCheck: never = action;
        return state;
    }
  }
  
  // Use the reducer
  const [state, dispatch] = useReducer(todoReducer, initialState);
  
  // Add a new todo
  const addTodo = (text: string) => {
    dispatch({ type: 'ADD_TODO', text });
  };
  
  // Toggle a todo
  const toggleTodo = (id: number) => {
    dispatch({ type: 'TOGGLE_TODO', id });
  };
  
  // Remove a todo
  const removeTodo = (id: number) => {
    dispatch({ type: 'REMOVE_TODO', id });
  };
  
  // Set filter
  const setFilter = (filter: TodoState['filter']) => {
    dispatch({ type: 'SET_FILTER', filter });
  };
  
  // Filter todos based on current filter
  const filteredTodos = state.todos.filter(todo => {
    if (state.filter === 'active') return !todo.completed;
    if (state.filter === 'completed') return todo.completed;
    return true;
  });
  
  return (
    &lt;div&gt;
      &lt;input
        type="text"
        placeholder="Add a todo"
        onKeyDown={(e) => {
          if (e.key === 'Enter' &amp;&amp; e.currentTarget.value.trim()) {
            addTodo(e.currentTarget.value.trim());
            e.currentTarget.value = '';
          }
        }}
      /&gt;
      
      &lt;div&gt;
        &lt;button onClick={() => setFilter('all')}&gt;All&lt;/button&gt;
        &lt;button onClick={() => setFilter('active')}&gt;Active&lt;/button&gt;
        &lt;button onClick={() => setFilter('completed')}&gt;Completed&lt;/button&gt;
      &lt;/div&gt;
      
      &lt;ul&gt;
        {filteredTodos.map(todo => (
          &lt;li key={todo.id}&gt;
            &lt;input
              type="checkbox"
              checked={todo.completed}
              onChange={() => toggleTodo(todo.id)}
            /&gt;
            &lt;span style={{ textDecoration: todo.completed ? 'line-through' : 'none' }}&gt;
              {todo.text}
            &lt;/span&gt;
            &lt;button onClick={() => removeTodo(todo.id)}&gt;❌&lt;/button&gt;
          &lt;/li&gt;
        ))}
      &lt;/ul&gt;
    &lt;/div&gt;
  );
}
</code></pre>
        </div>

        <h4>12. Typing useEffect, useCallback, and useMemo</h4>
        <p>Effect hooks require careful typing for dependencies and return values:</p>

        <p><strong>Typed useEffect:</strong> Proper typing for cleanup functions and dependencies.</p>
        <p><strong>Typed useCallback:</strong> Type-safe memoized callback functions.</p>
        <p><strong>Typed useMemo:</strong> Type-safe memoized values.</p>
        
        <div class="code-example">
          <pre><code>import React, { useState, useEffect, useCallback, useMemo, useRef } from 'react';

// Basic useEffect
function Timer() {
  const [count, setCount] = useState(0);
  
  // useEffect with no return type needed (inferred as void)
  useEffect(() => {
    const interval = setInterval(() => {
      setCount(prev => prev + 1);
    }, 1000);
    
    // Cleanup function
    return () => {
      clearInterval(interval);
    };
  }, []); // Empty dependencies array
  
  return &lt;div&gt;Count: {count}&lt;/div&gt;;
}

// useEffect with typed event listener
function WindowWidth() {
  const [width, setWidth] = useState(window.innerWidth);
  
  useEffect(() => {
    // Explicitly typed event handler
    const handleResize = (event: UIEvent) => {
      setWidth(window.innerWidth);
    };
    
    window.addEventListener('resize', handleResize);
    
    // Cleanup function
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);
  
  return &lt;div&gt;Window width: {width}px&lt;/div&gt;;
}

// useEffect with API calls
function UserData() {
  interface User {
    id: number;
    name: string;
    email: string;
  }
  
  const [userId, setUserId] = useState<number | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  // Effect depends on userId
  useEffect(() => {
    // Skip if no userId is provided
    if (userId === null) return;
    
    // Create AbortController for cleanup
    const controller = new AbortController();
    const signal = controller.signal;
    
    const fetchUser = async () => {
      setLoading(true);
      setError(null);
      
      try {
        // Type the fetch response
        const response = await fetch(\`/api/users/\${userId}\`, { signal });
        
        if (!response.ok) {
          throw new Error(\`HTTP error: \${response.status}\`);
        }
        
        const data: User = await response.json();
        setUser(data);
      } catch (err) {
        // Type guard to check if err is Error object
        if (err instanceof Error) {
          // Don't set error if it was aborted
          if (err.name !== 'AbortError') {
            setError(err.message);
          }
        } else {
          setError('An unknown error occurred');
        }
      } finally {
        setLoading(false);
      }
    };
    
    fetchUser();
    
    // Cleanup function
    return () => {
      controller.abort();
    };
  }, [userId]); // userId dependency
  
  return (
    &lt;div&gt;
      &lt;button onClick={() => setUserId(1)}&gt;Load User 1&lt;/button&gt;
      {loading &amp;&amp; &lt;p&gt;Loading...&lt;/p&gt;}
      {error &amp;&amp; &lt;p&gt;Error: {error}&lt;/p&gt;}
      {user &amp;&amp; (
        &lt;div&gt;
          &lt;h2&gt;{user.name}&lt;/h2&gt;
          &lt;p&gt;{user.email}&lt;/p&gt;
        &lt;/div&gt;
      )}
    &lt;/div&gt;
  );
}

// useCallback with typed parameters and return value
function SearchComponent() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<string[]>([]);
  
  // Explicitly typed callback function
  const handleSearch = useCallback((searchQuery: string): void => {
    console.log(\`Searching for: \${searchQuery}\`);
    // Simulated search
    const searchResults = ['result1', 'result2'].filter(item => 
      item.includes(searchQuery)
    );
    setResults(searchResults);
  }, []); // No dependencies
  
  // Another typed callback with dependencies
  const handleQueryChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const newQuery = e.target.value;
    setQuery(newQuery);
    
    if (newQuery.length > 2) {
      handleSearch(newQuery);
    } else {
      setResults([]);
    }
  }, [handleSearch]); // handleSearch dependency
  
  return (
    &lt;div&gt;
      &lt;input
        type="text"
        value={query}
        onChange={handleQueryChange}
        placeholder="Search..."
      /&gt;
      &lt;ul&gt;
        {results.map((result, index) => (
          &lt;li key={index}&gt;{result}&lt;/li&gt;
        ))}
      &lt;/ul&gt;
    &lt;/div&gt;
  );
}

// useMemo with explicitly typed return value
function ExpensiveCalculation() {
  const [count, setCount] = useState(0);
  const [otherState, setOtherState] = useState(0);
  
  // Explicitly typed return value
  const factorial: number = useMemo(() => {
    console.log('Computing factorial');
    let result = 1;
    for (let i = 1; i <= count; i++) {
      result *= i;
    }
    return result;
  }, [count]); // count dependency
  
  // Complex object with explicit typing
  interface CalculationResult {
    factorial: number;
    isEven: boolean;
    squareRoot: number;
  }
  
  const calculations: CalculationResult = useMemo(() => {
    return {
      factorial: factorial,
      isEven: count % 2 === 0,
      squareRoot: Math.sqrt(count)
    };
  }, [count, factorial]); // Dependencies include factorial
  
  return (
    &lt;div&gt;
      &lt;p&gt;Count: {count}&lt;/p&gt;
      &lt;p&gt;Factorial: {calculations.factorial}&lt;/p&gt;
      &lt;p&gt;Is Even: {calculations.isEven ? 'Yes' : 'No'}&lt;/p&gt;
      &lt;p&gt;Square Root: {calculations.squareRoot}&lt;/p&gt;
      &lt;button onClick={() => setCount(prev => prev + 1)}&gt;Increment&lt;/button&gt;
      &lt;button onClick={() => setOtherState(prev => prev + 1)}&gt;
        Update Other State: {otherState}
      &lt;/button&gt;
    &lt;/div&gt;
  );
}

// useRef with TypeScript
function TextInputWithFocus() {
  // Explicitly type the ref
  const inputRef = useRef<HTMLInputElement>(null);
  
  const focusInput = () => {
    // Need to check for null since initial value is null
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };
  
  return (
    &lt;div&gt;
      &lt;input ref={inputRef} type="text" /&gt;
      &lt;button onClick={focusInput}&gt;Focus Input&lt;/button&gt;
    &lt;/div&gt;
  );
}

// useRef for values that don't trigger re-renders
function PreviousValue() {
  const [count, setCount] = useState(0);
  
  // Type for ref that will store a number and might be null initially
  const prevCountRef = useRef<number | null>(null);
  
  useEffect(() => {
    // Store current value for next render
    prevCountRef.current = count;
  }, [count]);
  
  const prevCount = prevCountRef.current;
  
  return (
    &lt;div&gt;
      &lt;p&gt;Current: {count}, Previous: {prevCount ?? 'None'}&lt;/p&gt;
      &lt;button onClick={() => setCount(prev => prev + 1)}&gt;Increment&lt;/button&gt;
    &lt;/div&gt;
  );
}
</code></pre>
        </div>

        <h4>13. Typing Custom Hooks</h4>
        <p>Creating reusable custom hooks with proper TypeScript typing:</p>

        <p><strong>Return Type of Hooks:</strong> Typing multiple return values.</p>
        <p><strong>Generic Custom Hooks:</strong> Creating flexible hooks that work with different types.</p>
        <p><strong>Typing Parameters:</strong> Ensuring hook parameters are correctly typed.</p>
        
        <div class="code-example">
          <pre><code>import React, { useState, useEffect, useCallback, useRef } from 'react';

// Basic custom hook
function useToggle(initialValue: boolean = false) {
  const [value, setValue] = useState(initialValue);
  
  const toggle = useCallback(() => {
    setValue(v => !v);
  }, []);
  
  return [value, toggle] as const; // Use const assertion for tuple
}

// Usage:
function ToggleExample() {
  const [isOn, toggle] = useToggle();
  
  return (
    &lt;button onClick={toggle}&gt;
      {isOn ? 'ON' : 'OFF'}
    &lt;/button&gt;
  );
}

// Custom hook with multiple return values
function useCounter(initialValue: number = 0, step: number = 1) {
  const [count, setCount] = useState(initialValue);
  
  const increment = useCallback(() => {
    setCount(c => c + step);
  }, [step]);
  
  const decrement = useCallback(() => {
    setCount(c => c - step);
  }, [step]);
  
  const reset = useCallback(() => {
    setCount(initialValue);
  }, [initialValue]);
  
  // Return object instead of tuple for named values
  return {
    count,
    increment,
    decrement,
    reset
  };
}

// Usage:
function CounterExample() {
  const { count, increment, decrement, reset } = useCounter(10, 2);
  
  return (
    &lt;div&gt;
      &lt;p&gt;Count: {count}&lt;/p&gt;
      &lt;button onClick={decrement}&gt;-&lt;/button&gt;
      &lt;button onClick={increment}&gt;+&lt;/button&gt;
      &lt;button onClick={reset}&gt;Reset&lt;/button&gt;
    &lt;/div&gt;
  );
}

// Generic custom hook for async operations
interface AsyncState<T> {
  data: T | null;
  loading: boolean;
  error: Error | null;
}

interface UseAsyncOptions {
  immediate?: boolean;
}

function useAsync<T, Args extends any[]>(
  asyncFunction: (...args: Args) => Promise<T>,
  options: UseAsyncOptions = {}
) {
  const [state, setState] = useState<AsyncState<T>>({
    data: null,
    loading: false,
    error: null
  });
  
  // Store the mounted state to prevent state updates after unmount
  const mountedRef = useRef(true);
  
  // useEffect cleanup
  useEffect(() => {
    return () => {
      mountedRef.current = false;
    };
  }, []);
  
  const execute = useCallback(
    async (...args: Args) => {
      setState(prevState => ({
        ...prevState,
        loading: true,
        error: null
      }));
      
      try {
        const data = await asyncFunction(...args);
        
        // Only update state if component is still mounted
        if (mountedRef.current) {
          setState({
            data,
            loading: false,
            error: null
          });
        }
        
        return data;
      } catch (error) {
        // Only update state if component is still mounted
        if (mountedRef.current) {
          setState({
            data: null,
            loading: false,
            error: error instanceof Error ? error : new Error(String(error))
          });
        }
        
        throw error;
      }
    },
    [asyncFunction]
  );
  
  // Execute immediately if option is set
  useEffect(() => {
    if (options.immediate) {
      execute();
    }
  }, [execute, options.immediate]);
  
  return {
    ...state,
    execute
  };
}

// Usage:
function AsyncExample() {
  // Typed async function
  const fetchUser = async (id: number): Promise<{ id: number; name: string }> => {
    const response = await fetch(\`/api/users/\${id}\`);
    
    if (!response.ok) {
      throw new Error('Failed to fetch user');
    }
    
    return response.json();
  };
  
  const { 
    data: user, 
    loading, 
    error, 
    execute 
  } = useAsync(fetchUser);
  
  return (
    &lt;div&gt;
      {loading &amp;&amp; &lt;p&gt;Loading...&lt;/p&gt;}
      {error &amp;&amp; &lt;p&gt;Error: {error.message}&lt;/p&gt;}
      {user &amp;&amp; &lt;p&gt;User: {user.name}&lt;/p&gt;}
      &lt;button onClick={() =&gt; execute(1)} disabled={loading}&gt;
        Fetch User 1
      &lt;/button&gt;
    &lt;/div&gt;
  );
}

// Custom hook with dynamic dependencies
function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);
  
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);
    
    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);
  
  return debouncedValue;
}

// Usage:
function SearchInput() {
  const [searchTerm, setSearchTerm] = useState('');
  const debouncedSearchTerm = useDebounce(searchTerm, 500);
  
  useEffect(() => {
    if (debouncedSearchTerm) {
      console.log('Searching for:', debouncedSearchTerm);
      // Perform search operation
    }
  }, [debouncedSearchTerm]);
  
  return (
    &lt;input
      type="text"
      value={searchTerm}
      onChange={e => setSearchTerm(e.target.value)}
      placeholder="Search..."
    /&gt;
  );
}

// Custom hook with clean-up and event listeners
function useEventListener<K extends keyof WindowEventMap>(
  eventType: K,
  listener: (event: WindowEventMap[K]) => void,
  element: Window | HTMLElement | null = window,
  options?: boolean | AddEventListenerOptions
) {
  // Create ref for the listener
  const savedListener = useRef(listener);
  
  // Update ref when listener changes
  useEffect(() => {
    savedListener.current = listener;
  }, [listener]);
  
  useEffect(() => {
    // Guard against null element
    if (!element) return;
    
    // Create event listener that calls saved listener
    const eventListener: typeof listener = event => savedListener.current(event);
    
    // Add event listener
    element.addEventListener(eventType, eventListener as EventListener, options);
    
    // Remove event listener on cleanup
    return () => {
      element.removeEventListener(eventType, eventListener as EventListener, options);
    };
  }, [eventType, element, options]);
}

// Usage:
function KeyPressLogger() {
  const [keys, setKeys] = useState<string[]>([]);
  
  useEventListener('keydown', (event) => {
    setKeys(prev => [...prev, event.key].slice(-5));
  });
  
  return (
    &lt;div&gt;
      &lt;p&gt;Last 5 keys pressed:&lt;/p&gt;
      &lt;ul&gt;
        {keys.map((key, index) =&gt; (
          &lt;li key={index}&gt;{key}&lt;/li&gt;
        ))}
      &lt;/ul&gt;
    &lt;/div&gt;
  );
}
</code></pre>
        </div>

        <h4>14. TypeScript with Context API</h4>
        <p>TypeScript enhances the type safety of React's Context API:</p>

        <p><strong>Typing Context:</strong> Creating type-safe context with defaults.</p>
        <p><strong>Context Provider:</strong> Typing providers and consumers.</p>
        <p><strong>Combined Contexts:</strong> Organizing and combining multiple contexts.</p>
        
        <div class="code-example">
          <pre><code>import React, { createContext, useContext, useState, ReactNode } from 'react';

// Basic theme context
// 1. Define the context type
interface ThemeContextType {
  theme: 'light' | 'dark';
  toggleTheme: () => void;
}

// 2. Create context with default value
// Use assertion to prevent null value usage
const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

// 3. Create provider component
interface ThemeProviderProps {
  children: ReactNode;
  initialTheme?: 'light' | 'dark';
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ 
  children, 
  initialTheme = 'light' 
}) => {
  const [theme, setTheme] = useState<'light' | 'dark'>(initialTheme);
  
  const toggleTheme = () => {
    setTheme(prevTheme => (prevTheme === 'light' ? 'dark' : 'light'));
  };
  
  // Create value object
  const value: ThemeContextType = {
    theme,
    toggleTheme
  };
  
  return (
    &lt;ThemeContext.Provider value={value}&gt;
      {children}
    &lt;/ThemeContext.Provider&gt;
  );
};

// 4. Create custom hook for using the context
export function useTheme(): ThemeContextType {
  const context = useContext(ThemeContext);
  
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  
  return context;
}

// Usage:
function ThemedButton() {
  const { theme, toggleTheme } = useTheme();
  
  return (
    &lt;button
      onClick={toggleTheme}
      style={{
        backgroundColor: theme === 'light' ? '#fff' : '#333',
        color: theme === 'light' ? '#333' : '#fff',
        border: \`&lt;span style="color:#666"&gt;1px solid \${theme === 'light' ? '#333' : '#fff'}&lt;/span&gt;\`,
        padding: '&lt;span style="color:#666"&gt;8px 16px&lt;/span&gt;',
        borderRadius: '&lt;span style="color:#666"&gt;4px&lt;/span&gt;'
      }}
    &gt;
      Toggle Theme
    &lt;/button&gt;
  );
}

// More complex context with user authentication
// 1. Define types
interface User {
  id: number;
  name: string;
  email: string;
  role: 'admin' | 'user';
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
}

// 2. Create context with meaningful default value
const AuthContext = createContext<AuthContextType>({
  user: null,
  isAuthenticated: false,
  isLoading: false,
  error: null,
  login: async () => { throw new Error('Not implemented'); },
  logout: () => { throw new Error('Not implemented'); }
});

// 3. Create provider
interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  // Check for existing auth on mount
  React.useEffect(() => {
    // Check for saved auth token
    const checkAuth = async () => {
      const token = localStorage.getItem('authToken');
      
      if (token) {
        setIsLoading(true);
        try {
          // Call API to validate token and get user
          // For demo purposes, we'll simulate a successful response
          const userData: User = {
            id: 1,
            name: 'John Doe',
            email: 'john@example.com',
            role: 'user'
          };
          
          setUser(userData);
          setError(null);
        } catch (err) {
          setUser(null);
          setError('Failed to validate authentication');
          localStorage.removeItem('authToken');
        } finally {
          setIsLoading(false);
        }
      }
    };
    
    checkAuth();
  }, []);
  
  // Login function
  const login = async (email: string, password: string) => {
    setIsLoading(true);
    setError(null);
    
    try {
      // Call API to authenticate
      // For demo, we'll simulate a successful login
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Validate credentials (demo)
      if (email !== 'user@example.com' || password !== 'password') {
        throw new Error('Invalid credentials');
      }
      
      // Save token
      localStorage.setItem('authToken', 'demo-token');
      
      // Set user data
      const userData: User = {
        id: 1,
        name: 'John Doe',
        email: email,
        role: 'user'
      };
      
      setUser(userData);
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('An unknown error occurred');
      }
      setUser(null);
    } finally {
      setIsLoading(false);
    }
  };
  
  // Logout function
  const logout = () => {
    localStorage.removeItem('authToken');
    setUser(null);
  };
  
  // Create value object
  const value: AuthContextType = {
    user,
    isAuthenticated: !!user,
    isLoading,
    error,
    login,
    logout
  };
  
  return (
    &lt;AuthContext.Provider value={value}&gt;
      {children}
    &lt;/AuthContext.Provider&gt;
  );
};

// 4. Create custom hook
export function useAuth() {
  const context = useContext(AuthContext);
  
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  
  return context;
}

// Using multiple contexts together
// 1. Create an app provider that combines multiple contexts
interface AppProviderProps {
  children: ReactNode;
}

export const AppProvider: React.FC<AppProviderProps> = ({ children }) => {
  return (
    &lt;AuthProvider&gt;
      &lt;ThemeProvider&gt;
        {children}
      &lt;/ThemeProvider&gt;
    &lt;/AuthProvider&gt;
  );
};

// Usage:
function LoginForm() {
  const { login, isLoading, error } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await login(email, password);
  };
  
  return (
    &lt;form onSubmit={handleSubmit}&gt;
      {error &amp;&amp; &lt;div className="error"&gt;{error}&lt;/div&gt;}
      &lt;div&gt;
        &lt;label htmlFor="email"&gt;Email:&lt;/label&gt;
        &lt;input
          id="email"
          type="email"
          value={email}
          onChange={e =&gt; setEmail(e.target.value)}
          required
        /&gt;
      &lt;/div&gt;
      &lt;div&gt;
        &lt;label htmlFor="password"&gt;Password:&lt;/label&gt;
        &lt;input
          id="password"
          type="password"
          value={password}
          onChange={e =&gt; setPassword(e.target.value)}
          required
        /&gt;
      &lt;/div&gt;
      &lt;button type="submit" disabled={isLoading}&gt;
        {isLoading ? 'Logging in...' : 'Login'}
      &lt;/button&gt;
    &lt;/form&gt;
  );
}

function UserProfile() {
  const { user, isAuthenticated, logout } = useAuth();
  const { theme } = useTheme();
  
  if (!isAuthenticated) {
    return &lt;p&gt;Please log in to view your profile&lt;/p&gt;;
  }
  
  return (
    &lt;div className=\`profile profile-\${theme}\`&gt;
      &lt;h2&gt;Welcome, {user?.name}&lt;/h2&gt;
      &lt;p&gt;Email: {user?.email}&lt;/p&gt;
      &lt;p&gt;Role: {user?.role}&lt;/p&gt;
      &lt;button onClick={logout}&gt;Logout&lt;/button&gt;
    &lt;/div&gt;
  );
}

// Application root with providers
function App() {
  return (
    &lt;AppProvider&gt;
      &lt;div className="app"&gt;
        &lt;header&gt;
          &lt;ThemedButton /&gt;
        &lt;/header&gt;
        &lt;main&gt;
          &lt;LoginForm /&gt;
          &lt;UserProfile /&gt;
        &lt;/main&gt;
      &lt;/div&gt;
    &lt;/AppProvider&gt;
  );
}
</code></pre>
        </div>

        <h4>15. TypeScript with Redux/State Management</h4>
        <p>TypeScript provides strong typing for state management libraries like Redux:</p>

        <p><strong>Typed Actions and Reducers:</strong> Creating type-safe action creators and reducers.</p>
        <p><strong>Store Configuration:</strong> Typing Redux store and middleware.</p>
        <p><strong>Typed Selectors:</strong> Ensuring type safety when selecting from state.</p>
        
        <div class="code-example">
          <pre><code>import { 
  createStore, 
  applyMiddleware, 
  combineReducers, 
  Action, 
  Middleware 
} from 'redux';
import { useSelector, useDispatch, Provider } from 'react-redux';
import thunk, { ThunkAction } from 'redux-thunk';
import React from 'react';

// Modern approach with Redux Toolkit
import { 
  configureStore, 
  createSlice, 
  PayloadAction,
  createAsyncThunk 
} from '@reduxjs/toolkit';

// 1. Basic Redux with TypeScript
// Define state type
interface CounterState {
  value: number;
  status: 'idle' | 'loading' | 'failed';
}

// Define action types using discriminated unions
interface IncrementAction extends Action<'counter/increment'> {
  payload: number;
}

interface DecrementAction extends Action<'counter/decrement'> {
  payload: number;
}

interface ResetAction extends Action<'counter/reset'> {}

// Union of all action types
type CounterActionTypes = IncrementAction | DecrementAction | ResetAction;

// Action creators
const increment = (amount: number): IncrementAction => ({
  type: 'counter/increment',
  payload: amount
});

const decrement = (amount: number): DecrementAction => ({
  type: 'counter/decrement',
  payload: amount
});

const reset = (): ResetAction => ({
  type: 'counter/reset'
});

// Initial state
const initialState: CounterState = {
  value: 0,
  status: 'idle'
};

// Reducer with type safety
const counterReducer = (
  state = initialState,
  action: CounterActionTypes
): CounterState => {
  switch (action.type) {
    case 'counter/increment':
      return {
        ...state,
        value: state.value + action.payload
      };
    case 'counter/decrement':
      return {
        ...state,
        value: state.value - action.payload
      };
    case 'counter/reset':
      return {
        ...state,
        value: 0
      };
    default:
      return state;
  }
};

// Root state type
interface RootState {
  counter: CounterState;
}

// 2. Async action with Thunks
// Define thunk action type
type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  CounterActionTypes
>;

// Async action creator
const incrementAsync = (amount: number): AppThunk => async dispatch => {
  try {
    // Simulated API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    dispatch(increment(amount));
  } catch (err) {
    console.error('Failed to increment:', err);
  }
};

// 3. Creating the store
const rootReducer = combineReducers({
  counter: counterReducer
});

const store = createStore(
  rootReducer,
  applyMiddleware(thunk)
);

// 4. Type-safe hooks for React-Redux
// Type-safe useSelector hook
function useTypedSelector<TSelected>(
  selector: (state: RootState) => TSelected
): TSelected {
  return useSelector&lt;RootState, TSelected&gt;(selector);
}

// Type-safe useDispatch hook
type AppDispatch = typeof store.dispatch;
const useAppDispatch = () => useDispatch<AppDispatch>();

// 5. Usage in a React component
const Counter: React.FC = () => {
  const count = useTypedSelector(state => state.counter.value);
  const status = useTypedSelector(state => state.counter.status);
  const dispatch = useAppDispatch();
  
  return (
    &lt;div&gt;
      &lt;p&gt;Count: {count}&lt;/p&gt;
      &lt;p&gt;Status: {status}&lt;/p&gt;
      &lt;button onClick={() => dispatch(increment(1))}&gt;+ 1&lt;/button&gt;
      &lt;button onClick={() => dispatch(decrement(1))}&gt;- 1&lt;/button&gt;
      &lt;button onClick={() => dispatch(incrementAsync(1))}&gt;+ 1 Async&lt;/button&gt;
      &lt;button onClick={() => dispatch(reset())}&gt;Reset&lt;/button&gt;
    &lt;/div&gt;
  );
};

// 6. Provider setup
const App: React.FC = () => {
  return (
    &lt;Provider store={store}&gt;
      &lt;Counter /&gt;
    &lt;/Provider&gt;
  );
};

// 7. Redux Toolkit approach (modern recommended approach)
// Define a slice
const counterSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    // Type-safe action creators and reducers in one
    increment: (state, action: PayloadAction<number>) => {
      state.value += action.payload;
    },
    decrement: (state, action: PayloadAction<number>) => {
      state.value -= action.payload;
    },
    reset: state => {
      state.value = 0;
    }
  },
  extraReducers: builder => {
    // Handle async actions
    builder
      .addCase(fetchCount.pending, state => {
        state.status = 'loading';
      })
      .addCase(fetchCount.fulfilled, (state, action) => {
        state.status = 'idle';
        state.value = action.payload;
      })
      .addCase(fetchCount.rejected, state => {
        state.status = 'failed';
      });
  }
});

// Export action creators
export const { increment: rtIncrement, decrement: rtDecrement, reset: rtReset } = counterSlice.actions;

// Async thunk with Redux Toolkit
export const fetchCount = createAsyncThunk<
  number, // Return type
  void,   // First argument type (none in this case)
  { rejectValue: string } // ThunkAPI configuration
>('counter/fetchCount', async (_, { rejectWithValue }) => {
  try {
    // Simulated API call
    const response = await fetch('/api/counter');
    
    if (!response.ok) {
      throw new Error('Server error!');
    }
    
    const data = await response.json();
    return data.value;
  } catch (err) {
    let error: string = 'Unknown error occurred';
    if (err instanceof Error) error = err.message;
    return rejectWithValue(error);
  }
});

// Store with Redux Toolkit
const rtStore = configureStore({
  reducer: {
    counter: counterSlice.reducer
  }
});

// Infer the \`RootState\` and \`AppDispatch\` types from the store itself
type RtRootState = ReturnType<typeof rtStore.getState>;
type RtAppDispatch = typeof rtStore.dispatch;

// Type-safe hooks for Redux Toolkit
export const useRtSelector = <T extends unknown>(selector: (state: RtRootState) => T): T => 
  useSelector<RtRootState, T>(selector);

export const useRtDispatch = () => useDispatch<RtAppDispatch>();

// Redux Toolkit component usage
const RtCounter: React.FC = () => {
  const count = useRtSelector(state => state.counter.value);
  const status = useRtSelector(state => state.counter.status);
  const dispatch = useRtDispatch();
  
  return (
    &lt;div&gt;
      &lt;p&gt;Count: {count}&lt;/p&gt;
      &lt;p&gt;Status: {status}&lt;/p&gt;
      &lt;button onClick={() =&gt; dispatch(rtIncrement(1))}&gt;+ 1&lt;/button&gt;
      &lt;button onClick={() =&gt; dispatch(rtDecrement(1))}&gt;- 1&lt;/button&gt;
      &lt;button onClick={() =&gt; dispatch(fetchCount())}&gt;Fetch Count&lt;/button&gt;
      &lt;button onClick={() =&gt; dispatch(rtReset())}&gt;Reset&lt;/button&gt;
    &lt;/div&gt;
  );
};

// Redux Toolkit app with provider
const RtApp: React.FC = () => {
  return (
    &lt;Provider store={rtStore}&gt;
      &lt;RtCounter /&gt;
    &lt;/Provider&gt;
  );
};
</code></pre>
        </div>
        
        <div class="interview-tip">
          <p><span class="interview-icon">🎯</span> <strong>Interview Focus:</strong> Understanding how to properly type React hooks and state management is crucial for building maintainable TypeScript React applications. Be prepared to explain type safety benefits and implementation details.</p>
          <p>Common interview questions include:</p>
          <ul>
            <li>"How do you ensure type safety with useState when the state might have different types?"</li>
            <li>"Explain how to properly type useReducer actions using discriminated unions"</li>
            <li>"How would you implement and type a custom hook that fetches data from an API?"</li>
            <li>"What are the benefits of typing your Redux store and actions?"</li>
            <li>"How do you handle async operations in a type-safe way with TypeScript and React?"</li>
          </ul>
        </div>
      `,
          codeExample: `// Custom hook for data fetching with TypeScript
import { useState, useEffect, useCallback, useRef } from 'react';

// Request states as a discriminated union
type RequestState<T> =
  | { status: 'idle' }
  | { status: 'loading' }
  | { status: 'success'; data: T }
  | { status: 'error'; error: Error };

interface UseFetchOptions {
  initialFetch?: boolean;
  deps?: React.DependencyList;
  onSuccess?: (data: any) => void;
  onError?: (error: Error) => void;
}

interface FetchControls<T> {
  execute: (overrideUrl?: string, overrideOptions?: RequestInit) => Promise<T | undefined>;
  cancel: () => void;
  reset: () => void;
}

export function useFetch<T = any>(
  url: string,
  options?: RequestInit & UseFetchOptions
): [RequestState<T>, FetchControls<T>] {
  // Extract custom options
  const {
    initialFetch = true,
    deps = [],
    onSuccess,
    onError,
    ...fetchOptions
  } = options || {};
  
  // Request state using discriminated union
  const [state, setState] = useState<RequestState<T>>({ status: 'idle' });
  
  // For cancellation
  const abortControllerRef = useRef<AbortController | null>(null);
  
  // Track if component is mounted
  const isMountedRef = useRef(true);
  
  useEffect(() => {
    isMountedRef.current = true;
    return () => {
      isMountedRef.current = false;
    };
  }, []);
  
  // Reset state
  const reset = useCallback(() => {
    if (isMountedRef.current) {
      setState({ status: 'idle' });
    }
  }, []);
  
  // Cancel request
  const cancel = useCallback(() => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
      abortControllerRef.current = null;
    }
  }, []);
  
  // Execute fetch with type safety
  const execute = useCallback(
    async (
      overrideUrl?: string,
      overrideOptions?: RequestInit
    ): Promise<T | undefined> => {
      // Cancel any in-flight request
      cancel();
      
      // Create new AbortController
      abortControllerRef.current = new AbortController();
      const { signal } = abortControllerRef.current;
      
      // Set loading state
      if (isMountedRef.current) {
        setState({ status: 'loading' });
      }
      
      try {
        // Make fetch request
        const response = await fetch(overrideUrl || url, {
          ...fetchOptions,
          ...overrideOptions,
          signal
        });
        
        // Handle HTTP errors
        if (!response.ok) {
          throw new Error(\`HTTP error! Status: \${response.status}\`);
        }
        
        // Parse response
        const data = await response.json();
        
        // Update state if component is still mounted
        if (isMountedRef.current) {
          setState({ status: 'success', data });
          if (onSuccess) onSuccess(data);
        }
        
        return data;
      } catch (error) {
        // Don't update state if request was aborted
        if (error instanceof Error && error.name === 'AbortError') {
          return undefined;
        }
        
        // Update state for other errors if component is mounted
        if (isMountedRef.current) {
          const errorObject = error instanceof Error ? error : new Error(String(error));
          setState({ status: 'error', error: errorObject });
          if (onError) onError(errorObject);
        }
        
        return undefined;
      }
    },
    [url, fetchOptions, cancel, onSuccess, onError]
  );
  
  // Initial fetch on mount or when dependencies change
  useEffect(() => {
    if (initialFetch) {
      execute();
    }
    
    // Clean up on unmount or deps change
    return () => {
      cancel();
    };
  }, [initialFetch, execute, cancel, ...deps]);
  
  return [state, { execute, cancel, reset }];
}

// Type-safe selector hook for extracting data state
export function useData<T, R = T>(
  state: RequestState<T>,
  selector?: (data: T) => R
): R | undefined {
  if (state.status === 'success') {
    return selector ? selector(state.data) : (state.data as unknown as R);
  }
  return undefined;
}

// Helper hooks for common use cases
export function useLoading(state: RequestState<any>): boolean {
  return state.status === 'loading';
}

export function useError(state: RequestState<any>): Error | undefined {
  return state.status === 'error' ? state.error : undefined;
}

// Usage example
import React from 'react';

interface User {
  id: number;
  name: string;
  email: string;
}

interface Post {
  id: number;
  userId: number;
  title: string;
  body: string;
}

const UserProfile: React.FC<{ userId: number }> = ({ userId }) => {
  // Fetch user data
  const [userState, { execute: refetchUser }] = useFetch<User>(
    \`https://jsonplaceholder.typicode.com/users/\${userId}\`
  );
  
  // Fetch user's posts with dependent query
  const [postsState, { execute: refetchPosts }] = useFetch<Post[]>(
    \`https://jsonplaceholder.typicode.com/posts?userId=\${userId}\`,
    { initialFetch: userState.status === 'success' }
  );
  
  // Derived state using selector
  const userEmail = useData(userState, user => user.email);
  const postCount = useData(postsState, posts => posts.length);
  
  // Loading and error states
  const isLoading = useLoading(userState) || useLoading(postsState);
  const userError = useError(userState);
  const postsError = useError(postsState);
  
  // Refresh all data
  const handleRefresh = () => {
    refetchUser();
    refetchPosts();
  };
  
  if (isLoading) {
    return <div>Loading user data...</div>;
  }
  
  if (userError) {
    return (
      <div>
        <p>Error loading user: {userError.message}</p>
        <button onClick={refetchUser}>Retry</button>
      </div>
    );
  }
  
  return (
    <div>
      {userState.status === 'success' && (
        <div className="user-profile">
          <h2>{userState.data.name}</h2>
          <p>Email: {userEmail}</p>
          
          <div className="posts-section">
            <h3>Posts ({postCount || 0})</h3>
            
            {postsError && (
              <p>Error loading posts: {postsError.message}</p>
            )}
            
            {postsState.status === 'success' && (
              <ul>
                {postsState.data.map(post => (
                  <li key={post.id}>{post.title}</li>
                ))}
              </ul>
            )}
          </div>
          
          <button onClick={handleRefresh}>Refresh Data</button>
        </div>
      )}
    </div>
  );
};

export { UserProfile };`,
          exercise: {
            instructions:
              'Create a type-safe state management solution using TypeScript and React hooks for a shopping cart application. Your implementation should: (1) Use useReducer with properly typed actions and state, (2) Create a custom hook for cart operations, (3) Implement a Context API for global state access, (4) Include TypeScript interfaces for all data models, (5) Handle loading, error, and success states properly.',
          },
        },
        {
          title: 'Advanced TypeScript Patterns for React (5 Key Concepts)',
          explanation: `
        <p>These five concepts cover advanced TypeScript patterns specifically for React applications:</p>

        <h4>16. Polymorphic Components</h4>
        <p>Creating flexible components that can render as different HTML elements:</p>

        <p><strong>Polymorphic 'as' Prop:</strong> Allow components to render as different elements.</p>
        <p><strong>Type-Safe Polymorphic Components:</strong> Proper typing for props and refs.</p>
        <p><strong>Forwarding Attributes:</strong> Typing HTML attributes based on element type.</p>
        
        <div class="code-example">
          <pre><code>import React, { ComponentProps, ElementType, ReactNode, ComponentPropsWithRef, forwardRef } from 'react';

// Basic polymorphic component
type AsProp<C extends ElementType> = {
  as?: C;
};

type PropsToOmit<C extends ElementType, P> = keyof (AsProp<C> & P);

// Properly typed polymorphic component props
type PolymorphicComponentProp<
  C extends ElementType,
  Props = {}
> = PropsToOmit<C, Props> extends infer O
  ? O extends keyof ComponentProps<C>
    ? Omit<ComponentProps<C>, O> & Props & AsProp<C>
    : Props & AsProp<C>
  : never;

// Basic implementation without ref
function TextBasic<C extends ElementType = 'span'>({
  as,
  children,
  ...props
}: PolymorphicComponentProp<C, { children: ReactNode }>) {
  const Component = as || 'span';
  return &lt;Component {...props}&gt;{children}&lt;/Component&gt;;
}

// Usage of basic polymorphic component
function BasicExample() {
  return (
    &lt;div&gt;
      &lt;TextBasic&gt;Default is span&lt;/TextBasic&gt;
      &lt;TextBasic as="h1"&gt;This is a heading&lt;/TextBasic&gt;
      &lt;TextBasic as="p"&gt;This is a paragraph&lt;/TextBasic&gt;
      &lt;TextBasic as="button" onClick={() => alert('Clicked')}&gt;
        This is a button
      &lt;/TextBasic&gt;
      &lt;TextBasic as="a" href="https://example.com"&gt;
        This is a link
      &lt;/TextBasic&gt;
    &lt;/div&gt;
  );
}

// Advanced implementation with ref support
type PolymorphicRef<C extends ElementType> = ComponentPropsWithRef<C>['ref'];

type PolymorphicComponentPropWithRef<
  C extends ElementType,
  Props = {}
> = PolymorphicComponentProp<C, Props> & { ref?: PolymorphicRef<C> };

// For the forwardRef typing
type PolymorphicForwardRefComponent<
  DefaultElementType extends ElementType,
  Props = {}
> = <C extends ElementType = DefaultElementType>(
  props: PolymorphicComponentPropWithRef<C, Props>
) => React.ReactElement | null;

// Advanced polymorphic component with ref forwarding
const Text = forwardRef(function Text<C extends ElementType = 'span'>(
  { as, children, ...props }: PolymorphicComponentProp<C, { children: ReactNode }>,
  ref?: PolymorphicRef<C>
) {
  const Component = as || 'span';
  return (
    &lt;Component ref={ref} {...props}&gt;
      {children}
    &lt;/Component&gt;
  );
}) as PolymorphicForwardRefComponent<'span', { children: ReactNode }>;

// Usage with ref
function AdvancedExample() {
  // Refs are properly typed based on the 'as' prop
  const divRef = React.useRef<HTMLDivElement>(null);
  const buttonRef = React.useRef<HTMLButtonElement>(null);
  
  React.useEffect(() => {
    if (buttonRef.current) {
      buttonRef.current.focus();
    }
  }, []);
  
  return (
    &lt;div&gt;
      &lt;Text as="div" ref={divRef}&gt;
        This is a div with a ref
      &lt;/Text&gt;
      &lt;Text as="button" ref={buttonRef}&gt;
        This is a button with a ref
      &lt;/Text&gt;
    &lt;/div&gt;
  );
}

// Real-world example: Button component with polymorphic capabilities
type ButtonVariant = 'primary' | 'secondary' | 'danger';
type ButtonSize = 'small' | 'medium' | 'large';

interface ButtonProps {
  variant?: ButtonVariant;
  size?: ButtonSize;
  isFullWidth?: boolean;
  isDisabled?: boolean;
  isLoading?: boolean;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  children: ReactNode;
}

const Button = forwardRef(function Button<C extends ElementType = 'button'>(
  {
    as,
    variant = 'primary',
    size = 'medium',
    isFullWidth = false,
    isDisabled = false,
    isLoading = false,
    leftIcon,
    rightIcon,
    children,
    ...props
  }: PolymorphicComponentProp<C, ButtonProps>,
  ref?: PolymorphicRef<C>
) {
  const Component = as || 'button';
  
  const baseClass = 'btn';
  const classes = [
    baseClass,
    \`\${baseClass}-\${variant}\`,
    \`\${baseClass}-\${size}\`,
    isFullWidth ? \`\${baseClass}-full-width\` : '',
    isLoading ? \`\${baseClass}-loading\` : ''
  ].filter(Boolean).join(' ');
  
  return (
    &lt;Component
      ref={ref}
      className={classes}
      disabled={isDisabled || isLoading}
      {...props}
    &gt;
      {leftIcon && &lt;span className="btn-icon-left"&gt;{leftIcon}&lt;/span&gt;}
      {children}
      {rightIcon && &lt;span className="btn-icon-right"&gt;{rightIcon}&lt;/span&gt;}
    &lt;/Component&gt;
  );
}) as PolymorphicForwardRefComponent<'button', ButtonProps>;

// Using the polymorphic Button
function ButtonExample() {
  return (
    &lt;div&gt;
      &lt;Button variant="primary" size="large"&gt;
        Standard Button
      &lt;/Button&gt;
      
      &lt;Button
        as="a"
        href="https://example.com"
        variant="secondary"
        leftIcon={&lt;span&gt;&rarr;&lt;/span&gt;}
      &gt;
        Link Button
      &lt;/Button&gt;
      
      &lt;Button as="div" variant="danger" isFullWidth&gt;
        Div Button
      &lt;/Button&gt;
    &lt;/div&gt;
  );
}
</code></pre>
        </div>

        <h4>17. Type Guards and Narrowing</h4>
        <p>TypeScript provides ways to narrow types for more precise type checking:</p>

        <p><strong>User-Defined Type Guards:</strong> Functions that help TypeScript narrow types.</p>
        <p><strong>typeof and instanceof:</strong> Built-in type guards.</p>
        <p><strong>Narrowing with Conditional Checks:</strong> Using conditions to narrow types.</p>
        <p><strong>Discriminated Unions:</strong> Using specific properties to narrow union types.</p>
        
        <div class="code-example">
          <pre><code>import React, { useState, useEffect } from 'react';

// Basic type guards
interface User {
  id: number;
  name: string;
  email: string;
}

interface Admin extends User {
  role: 'admin';
  permissions: string[];
}

interface Customer extends User {
  role: 'customer';
  subscriptionTier: 'free' | 'basic' | 'premium';
}

// Union type for users
type AppUser = Admin | Customer;

// Type guard using typeof
function isPrimitive(value: unknown): value is string | number | boolean {
  return typeof value === 'string' || 
         typeof value === 'number' || 
         typeof value === 'boolean';
}

// Type guard using instanceof
function isError(value: unknown): value is Error {
  return value instanceof Error;
}

// User-defined type guard for Admin
function isAdmin(user: AppUser): user is Admin {
  return user.role === 'admin';
}

// User-defined type guard for Customer
function isCustomer(user: AppUser): user is Customer {
  return user.role === 'customer';
}

// Component using type guards
function UserProfile({ user }: { user: AppUser | null }) {
  if (!user) {
    return &lt;div&gt;No user loaded&lt;/div&gt;;
  }
  
  // Common properties are always accessible
  const baseInfo = (
    &lt;div&gt;
      &lt;h2&gt;{user.name}&lt;/h2&gt;
      &lt;p&gt;ID: {user.id}&lt;/p&gt;
      &lt;p&gt;Email: {user.email}&lt;/p&gt;
    &lt;/div&gt;
  );
  
  // Using type guards to render conditional content
  if (isAdmin(user)) {
    // TypeScript knows user is Admin here
    return (
      &lt;div&gt;
        {baseInfo}
        &lt;div className="admin-section"&gt;
          &lt;h3&gt;Admin Dashboard&lt;/h3&gt;
          &lt;p&gt;Permissions: {user.permissions.join(', ') || 'None'}&lt;/p&gt;
        &lt;/div&gt;
      &lt;/div&gt;
    );
  }
  
  if (isCustomer(user)) {
    // TypeScript knows user is Customer here
    return (
      &lt;div&gt;
        {baseInfo}
        &lt;div className="customer-section"&gt;
          &lt;h3&gt;Customer Details&lt;/h3&gt;
          &lt;p&gt;Subscription: {user.subscriptionTier}&lt;/p&gt;
        &lt;/div&gt;
      &lt;/div&gt;
    );
  }
  
  // This should never happen if all types are covered
  return &lt;div&gt;Unknown user type&lt;/div&gt;;
}

// Error handling with type guards
function ErrorHandler({ error }: { error: unknown }) {
  if (isError(error)) {
    // TypeScript knows error is Error here
    return (
      &lt;div className="error"&gt;
        &lt;h3&gt;Error Details&lt;/h3&gt;
        &lt;p&gt;Name: {error.name}&lt;/p&gt;
        &lt;p&gt;Message: {error.message}&lt;/p&gt;
        &lt;p&gt;Stack: {error.stack}&lt;/p&gt;
      &lt;/div&gt;
    );
  }
  
  if (typeof error === 'string') {
    // TypeScript knows error is string here
    return &lt;div className="error"&gt;Error: &amp;{error}&lt;/div&gt;;
  }
  
  // Fallback for other error types
  return &lt;div className="error"&gt;An unknown error occurred&lt;/div&gt;;
}

// API response type guards
type ApiResponse<T> = 
  | { status: 'success'; data: T }
  | { status: 'error'; error: string }
  | { status: 'loading' };

function isSuccessResponse<T>(response: ApiResponse<T>): response is { status: 'success'; data: T } {
  return response.status === 'success';
}

function isErrorResponse<T>(response: ApiResponse<T>): response is { status: 'error'; error: string } {
  return response.status === 'error';
}

function isLoadingResponse<T>(response: ApiResponse<T>): response is { status: 'loading' } {
  return response.status === 'loading';
}

// Component using API response type guards
function DataDisplay<T>({ response }: { response: ApiResponse<T> }) {
  // Method 1: Type narrowing with discriminated union and switch
  switch (response.status) {
    case 'loading':
      return &lt;div&gt;Loading...&lt;/div&gt;;
    case 'error':
      return &lt;div&gt;Error: &amp;{response.error}&lt;/div&gt;;
    case 'success':
      return &lt;div&gt;Data loaded successfully!&lt;/div&gt;;
    default:
      // TypeScript will warn if we miss any possible types
      const _exhaustiveCheck: never = response;
      return null;
  }
  
  // Method 2: Using custom type guards
  /*
  if (isLoadingResponse(response)) {
    return &lt;div&gt;Loading...&lt;/div&gt;;
  }
  
  if (isErrorResponse(response)) {
    return &lt;div&gt;Error: &amp;{response.error}&lt;/div&gt;;
  }
  
  if (isSuccessResponse(response)) {
    return &lt;div&gt;Data loaded successfully!&lt;/div&gt;;
  }
  
  // This should never execute if all types are covered
  return null;
  */
}

// Example with type guards for null/undefined (non-nullish assertion)
function SafeDisplay({ data }: { data: string | null | undefined }) {
  // Method 1: Type guard with if statement
  if (data !== null && data !== undefined) {
    // TypeScript knows data is string here
    return &lt;div&gt;&amp;lt;p&amp;gt;Count: {data.toUpperCase()}&amp;lt;/p&amp;gt;&lt;/div&gt;;
  }
  
  // Method 2: Nullish coalescing operator
  return &lt;div&gt;&amp;{data ? data : 'No data available'}&lt;/div&gt;;
}

// Using type guards with event handlers
function EventExample() {
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    // Target is typed as EventTarget
    const { target } = event;
    
    // Type guard with instanceof
    if (target instanceof HTMLButtonElement) {
      // TypeScript knows target is HTMLButtonElement here
      console.log('Button clicked:', target.textContent);
    } else if (target instanceof HTMLAnchorElement) {
      // TypeScript knows target is HTMLAnchorElement here
      console.log('Link clicked:', target.href);
    }
  };
  
  return (
    &lt;div onClick={handleClick}&gt;
      &lt;button&gt;Click me&lt;/button&gt;
      &lt;a href=&quot;#&quot;&gt;Click link&lt;/a&gt;
    &lt;/div&gt;
  );
}

// Type guard for complex nested structures
interface NestedData {
  user?: {
    profile?: {
      address?: {
        city?: string;
      };
    };
  };
}

function getCityName(data: NestedData): string {
  // Option 1: Nested type guards
  if (data.user && data.user.profile && data.user.profile.address && data.user.profile.address.city) {
    return data.user.profile.address.city;
  }
  
  // Option 2: Optional chaining (simpler but doesn't narrow types in the same way)
  return data.user?.profile?.address?.city ?? 'Unknown city';
}
</code></pre>
        </div>

        <h4>18. Mapped and Conditional Types</h4>
        <p>Advanced TypeScript features for transforming and manipulating types:</p>

        <p><strong>Mapped Types:</strong> Create new types by mapping over properties of existing types.</p>
        <p><strong>Conditional Types:</strong> Types that resolve based on conditions.</p>
        <p><strong>Utility Types:</strong> Built-in TypeScript types for common transformations.</p>
        <p><strong>Template Literal Types:</strong> Create types from string literals.</p>
        
        <div class="code-example">
          <pre><code>import React, { useState } from 'react';

// 1. Mapped Types

// Make all properties optional
type Partial<T> = {
  [P in keyof T]?: T[P];
};

// Make all properties required
type Required<T> = {
  [P in keyof T]-?: T[P];
};

// Make all properties readonly
type Readonly<T> = {
  readonly [P in keyof T]: T[P];
};

// Pick specific properties
type Pick<T, K extends keyof T> = {
  [P in K]: T[P];
};

// Omit specific properties
type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;

// Basic user type
interface User {
  id: number;
  name: string;
  email: string;
  age?: number;
  address?: string;
}

// Type transformations
type PartialUser = Partial<User>; // All fields optional
type RequiredUser = Required<User>; // All fields required (no optional fields)
type ReadonlyUser = Readonly<User>; // All fields readonly
type UserBasicInfo = Pick<User, 'id' | 'name'>; // Only id and name
type UserWithoutId = Omit<User, 'id'>; // All fields except id

// Custom mapped types

// Create a type with all properties as getters
type Getters<T> = {
  [P in keyof T as \`get\${Capitalize<string & P>}\`]: () => T[P];
};

// Example: User getters
type UserGetters = Getters<User>;
// Results in:
// {
//   getId: () => number;
//   getName: () => string;
//   getEmail: () => string;
//   getAge: () => number | undefined;
//   getAddress: () => string | undefined;
// }

// Create a form state type with values, errors, and touched fields
type FormState<T> = {
  values: T;
  errors: Partial<Record<keyof T, string>>;
  touched: Partial<Record<keyof T, boolean>>;
};

// Usage in a component
function UserForm() {
  // Type-safe form state
  const [formState, setFormState] = useState<FormState<User>>({
    values: {
      id: 0,
      name: '',
      email: ''
    },
    errors: {},
    touched: {}
  });
  
  // Rest of component...
  return "&lt;div&gt;User Form&lt;/div&gt;";
}

// 2. Conditional Types

// Basic conditional type
type IsString<T> = T extends string ? true : false;

// Check if type extends string
type CheckString = IsString<'hello'>; // true
type CheckNumber = IsString<42>; // false

// Extract types from a union that are assignable to a type
type Extract<T, U> = T extends U ? T : never;

// Exclude types from a union that are assignable to a type
type Exclude<T, U> = T extends U ? never : T;

// Examples
type StringOrNumber = string | number;
type JustStrings = Extract<StringOrNumber, string>; // string
type JustNumbers = Exclude<StringOrNumber, string>; // number

// Extract return type of a function
type ReturnType<T extends (...args: any) => any> = 
  T extends (...args: any) => infer R ? R : any;

// Example
function fetchUser() {
  return { id: 1, name: 'John' };
}

type FetchUserReturn = ReturnType<typeof fetchUser>; // { id: number; name: string; }

// Extract component props type
type ComponentProps<T extends React.ComponentType<any>> = 
  T extends React.ComponentType<infer P> ? P : never;

// Example
const Button: React.FC<{ label: string; onClick: () => void }> = ({ label, onClick }) => {
  return &lt;button onClick={onClick}&gt;{label}&lt;/button&gt;;
};

type ButtonProps = ComponentProps<typeof Button>; // { label: string; onClick: () => void; }

// 3. React-specific utility types

// RecordOf - Create a record type with specific properties
type RecordOf<T, K extends keyof T> = Record<string, Pick<T, K>>;

// Example: Dictionary of users with only name and email
type UserDict = RecordOf<User, 'name' | 'email'>;
// Equivalent to: Record<string, { name: string; email: string }>

// WithRequired - Make specific properties required
type WithRequired<T, K extends keyof T> = T & Required<Pick<T, K>>;

// Example: User with required address
type UserWithAddress = WithRequired<User, 'address'>;

// ConditionalProps - Conditional component props
type ConditionalProps<Condition extends boolean, TrueProps, FalseProps = {}> = 
  Condition extends true ? TrueProps : FalseProps;

// Example: Button props based on variant
type ButtonBaseProps = {
  label: string;
  onClick: () => void;
};

type PrimaryButtonProps = ButtonBaseProps & {
  variant: 'primary';
  color: 'blue' | 'green';
};

type SecondaryButtonProps = ButtonBaseProps & {
  variant: 'secondary';
  outline: boolean;
};

// Usage with discriminated union
type ButtonProps2 = PrimaryButtonProps | SecondaryButtonProps;

// 4. Template Literal Types

// Create event handler props
type EventHandler<K extends string> = \`on\${Capitalize<K>}\`;

// Example
type MouseEvents = EventHandler<'click' | 'mousedown' | 'mouseup'>;
// 'onClick' | 'onMousedown' | 'onMouseup'

// Create CSS properties type
type CSSProperties = {
  [P in 'margin' | 'padding' | 'border' as \`\${P}\${Capitalize<'top' | 'right' | 'bottom' | 'left'>}\`]?: string;
};
// Results in:
// {
//   marginTop?: string;
//   marginRight?: string;
//   marginBottom?: string;
//   marginLeft?: string;
//   paddingTop?: string;
//   ...and so on
// }

// Create route params type
type Route<T extends string> = T extends \`\${infer Start}/:\${infer Param}/\${infer Rest}\`
  ? { [K in Param]: string } & Route<\`\${Start}/\${Rest}\`>
  : T extends \`\${infer Start}/:\${infer Param}\`
    ? { [K in Param]: string }
    : {};

// Example
type UserRouteParams = Route<'/users/:userId/posts/:postId'>;
// Results in: { userId: string; postId: string; }

// Using mapped and conditional types in a component
interface FormFieldProps<T> {
  name: keyof T;
  label?: string;
  value: T[keyof T];
  onChange: (name: keyof T, value: any) => void;
  error?: string;
}

function FormField<T>({ name, label, value, onChange, error }: FormFieldProps<T>) {
  return (
    &lt;div&gt;
      {label && &lt;label htmlFor={name as string}&gt;{label}&lt;/label&gt;}
      &lt;input
        id={name as string}
        name={name as string}
        value={value as string} // Assume string values for simplicity
        onChange={(e) =&gt; onChange(name, e.target.value)}
      /&gt;
      {error && &lt;div className="error"&gt;{error}&lt;/div&gt;}
    &lt;/div&gt;
  );
}

// Using the FormField component
function MappedTypesForm() {
  interface FormData {
    name: string;
    email: string;
    password: string;
  }
  
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    password: ''
  });
  
  const [errors, setErrors] = useState<Partial<Record<keyof FormData, string>>>({});
  
  const handleChange = (name: keyof FormData, value: string) => {
    setFormData({
      ...formData,
      [name]: value
    });
  };
  
  return (
    &lt;form&gt;
      &lt;FormField&lt;FormData&gt;
        name="name"
        label="Name"
        value={formData.name}
        onChange={handleChange}
        error={errors.name}
      /&gt;
      &lt;FormField&lt;FormData&gt;
        name="email"
        label="Email"
        value={formData.email}
        onChange={handleChange}
        error={errors.email}
      /&gt;
      &lt;FormField&lt;FormData&gt;
        name="password"
        label="Password"
        value={formData.password}
        onChange={handleChange}
        error={errors.password}
      /&gt;
      &lt;button type="submit"&gt;Submit&lt;/button&gt;
    &lt;/form&gt;
  );
}
</code></pre>
        </div>

        <h4>19. Advanced Type Inference</h4>
        <p>Leveraging TypeScript's powerful type inference capabilities:</p>

        <p><strong>Contextual Typing:</strong> How TypeScript infers types from context.</p>
        <p><strong>Inference with Generic Functions:</strong> Type inference with generics.</p>
        <p><strong>ReturnType and Parameters:</strong> Extracting types from functions.</p>
        <p><strong>Inferring Component Props:</strong> Working with React component type inference.</p>
        
        <div class="code-example">
          <pre><code>import React, { useState, useCallback, useMemo } from 'react';

// 1. Basic Type Inference
// TypeScript automatically infers types when possible
const inferredString = 'hello'; // Type: string
const inferredNumber = 42; // Type: number
const inferredBoolean = true; // Type: boolean
const inferredArray = [1, 2, 3]; // Type: number[]

// Object literal with inferred types
const user = {
  id: 1,
  name: 'John',
  isActive: true,
  tags: ['admin', 'user']
};
// Type: { id: number; name: string; isActive: boolean; tags: string[] }

// Object type with inferred property types
interface User {
  id: number;
  name: string;
  settings: {
    theme: string;
    notifications: boolean;
  };
}

// 2. Infer types from context
// Function parameter types are inferred from usage
function processUser(user: User) {
  return user.name.toUpperCase();
}

// TypeScript knows user is User type here
const processedName = processUser(user as User);

// 3. Function return type inference
// Return type is inferred as string
function getUserName(user: User) {
  return user.name;
}

// 4. Generic type inference
// TypeScript infers the generic type from the argument
function identity<T>(value: T): T {
  return value;
}

const numberValue = identity(42); // Type: number
const stringValue = identity('hello'); // Type: string
const userValue = identity(user); // Type: typeof user

// 5. Array method inference
// TypeScript infers the callback parameter types
const numbers = [1, 2, 3, 4, 5];

const doubled = numbers.map(num => num * 2);
// TypeScript knows num is number, and doubled is number[]

const evenNumbers = numbers.filter(num => num % 2 === 0);
// TypeScript knows evenNumbers is number[]

// 6. Advanced inference with utility types

// Extract type from function return
type GetUserReturn = ReturnType<typeof getUserName>; // string

// Get parameters type of a function
type ProcessUserParams = Parameters<typeof processUser>; // [User]

// Infer the instance type of a class
class UserManager {
  private users: User[] = [];
  
  addUser(user: User) {
    this.users.push(user);
  }
  
  getUser(id: number) {
    return this.users.find(user => user.id === id);
  }
}

type UserManagerInstance = InstanceType<typeof UserManager>;

// 7. Inference with React hooks
function useCounter(initialValue: number = 0) {
  const [count, setCount] = useState(initialValue);
  
  const increment = useCallback(() => {
    setCount(c => c + 1);
  }, []);
  
  const decrement = useCallback(() => {
    setCount(c => c - 1);
  }, []);
  
  return { count, increment, decrement };
}

// Infer the return type of a custom hook
type UseCounterReturn = ReturnType<typeof useCounter>;
// { count: number; increment: () => void; decrement: () => void; }

// Inference with useReducer
interface CounterState {
  count: number;
  lastAction: string | null;
}

type CounterAction = 
  | { type: 'increment'; payload?: number }
  | { type: 'decrement'; payload?: number }
  | { type: 'reset' };

function counterReducer(state: CounterState, action: CounterAction): CounterState {
  switch (action.type) {
    case 'increment':
      return {
        count: state.count + (action.payload || 1),
        lastAction: 'increment'
      };
    case 'decrement':
      return {
        count: state.count - (action.payload || 1),
        lastAction: 'decrement'
      };
    case 'reset':
      return {
        count: 0,
        lastAction: 'reset'
      };
    default:
      // Exhaustive type checking
      const _exhaustiveCheck: never = action;
      return state;
  }
}

// 8. Inference with component props
interface ButtonProps {
  label: string;
  onClick: () => void;
  variant?: 'primary' | 'secondary';
}

// Creating a component with strongly typed props
const Button: React.FC<ButtonProps> = ({ label, onClick, variant = 'primary' }) => {
  return (
    &lt;button
      className={\`btn btn-\${variant}\`}
      onClick={onClick}
    &gt;
      {label}
    &lt;/button&gt;
  );
};

// Infer the props type from the component
type InferredButtonProps = React.ComponentProps<typeof Button>;
// Equivalent to ButtonProps

// Extracting a specific prop type
type ButtonVariants = InferredButtonProps['variant']; // 'primary' | 'secondary' | undefined

// 9. Infer types from object structure
const config = {
  api: {
    baseUrl: 'https://api.example.com',
    timeout: 5000,
    retries: 3,
    endpoints: {
      users: '/users',
      posts: '/posts'
    }
  },
  ui: {
    theme: 'light',
    animations: true
  }
} as const; // Use 'as const' for literal types

// Get strongly typed config values
type ApiBaseUrl = typeof config.api.baseUrl; // 'https://api.example.com'
type Endpoints = typeof config.api.endpoints; // { readonly users: '/users'; readonly posts: '/posts' }

// 10. Practical React example: strongly typed component with inferred props
function createStyledComponent<T extends keyof JSX.IntrinsicElements>(
  element: T,
  styles: React.CSSProperties
) {
  // Return component with inferred props based on element type
  return (props: JSX.IntrinsicElements[T]) => {
    return React.createElement(element, {
      ...props,
      style: {
        ...styles,
        ...props.style
      }
    });
  };
}

// Create styled components
const StyledButton = createStyledComponent('button', {
  padding: '8px 16px',
  borderRadius: '4px',
  backgroundColor: 'blue',
  color: 'white'
});

const StyledInput = createStyledComponent('input', {
  padding: '8px',
  borderRadius: '4px',
  border: '1px solid #ccc'
});

// Usage with inferred props
function StyledComponentExample() {
  return (
    &lt;div&gt;
      &lt;StyledButton onClick={() =&gt; alert('Clicked!')}&gt;
        Click Me
      &lt;/StyledButton&gt;
      &lt;StyledInput
        type="text"
        placeholder="Enter text"
        onChange={(e) =&gt; console.log(e.target.value)}
      /&gt;
    &lt;/div&gt;
  );
}

// 11. Using advanced type inference to create a type-safe event system
type EventMap = {
  'user:login': { userId: string; timestamp: number };
  'user:logout': { userId: string; timestamp: number };
  'notification:new': { message: string; type: 'info' | 'warning' | 'error' };
};

class EventEmitter<T extends Record<string, any>> {
  private listeners: {
    [K in keyof T]?: Array<(data: T[K]) => void>;
  } = {};
  
  // Add event listener with type-safe event name and data
  on<K extends keyof T>(event: K, listener: (data: T[K]) => void) {
    if (!this.listeners[event]) {
      this.listeners[event] = [];
    }
    
    this.listeners[event]!.push(listener);
    
    return () => this.off(event, listener);
  }
  
  // Remove event listener
  off<K extends keyof T>(event: K, listener: (data: T[K]) => void) {
    if (!this.listeners[event]) return;
    
    this.listeners[event] = this.listeners[event]!.filter(l => l !== listener);
  }
  
  // Emit event with type-safe data
  emit<K extends keyof T>(event: K, data: T[K]) {
    if (!this.listeners[event]) return;
    
    this.listeners[event]!.forEach(listener => listener(data));
  }
}

// Application event emitter with strongly typed events
const appEvents = new EventEmitter<EventMap>();

// Type-safe event handlers
appEvents.on('user:login', data => {
  console.log(\`User \${data.userId} logged in at \${new Date(data.timestamp).toISOString()}\`);
});

appEvents.on('notification:new', data => {
  if (data.type === 'error') {
    console.error(data.message);
  } else {
    console.log(data.message);
  }
});

// Type-safe event emission
appEvents.emit('user:login', { 
  userId: '123', 
  timestamp: Date.now() 
});
</code></pre>
        </div>

        <h4>20. Performance Optimization with TypeScript</h4>
        <p>TypeScript can help optimize React applications through better typing and analysis:</p>

        <p><strong>Optimizing Component Re-renders:</strong> Using TypeScript with memoization.</p>
        <p><strong>Typed React.memo:</strong> Proper typing for memoized components.</p>
        <p><strong>Type-Safe Event Optimization:</strong> Typing debounce and throttle functions.</p>
        <p><strong>Analysis and Profiling:</strong> Using TypeScript for performance patterns.</p>
        
        <div class="code-example">
          <pre><code>import React, { 
  useState, 
  useEffect, 
  useCallback, 
  useMemo, 
  memo, 
  ReactNode,
  ComponentType
} from 'react';

// 1. Typed React.memo
// Create type-safe memo HOC
function typedMemo<T extends ComponentType<any>>(
  component: T,
  areEqual?: (prevProps: React.ComponentProps<T>, nextProps: React.ComponentProps<T>) => boolean
) {
  return memo(component, areEqual) as T;
}

// Regular component with props
interface UserCardProps {
  id: number;
  name: string;
  email: string;
  onSelect: (id: number) => void;
}

// Using typed memo with standard equality check
const UserCard = typedMemo<React.FC<UserCardProps>>(({ id, name, email, onSelect }) => {
  console.log(\`Rendering UserCard for \${name}\`);
  
  return (
    &lt;div className="user-card" onClick={() => onSelect(id)}&gt;
      &lt;h3&gt;{name}&lt;/h3&gt;
      &lt;p&gt;{email}&lt;/p&gt;
    &lt;/div&gt;
  );
});

// Using typed memo with custom equality check
const OptimizedUserCard = typedMemo<React.FC<UserCardProps>>(
  ({ id, name, email, onSelect }) => {
    console.log(\`Rendering OptimizedUserCard for \${name}\`);
    
    return (
      &lt;div className="user-card" onClick={() =&gt; onSelect(id)}&gt;
        &lt;h3&gt;{name}&lt;/h3&gt;
        &lt;p&gt;{email}&lt;/p&gt;
      &lt;/div&gt;
    );
  },
  (prev, next) => {
    // Only re-render if ID or name changes
    return prev.id === next.id && prev.name === next.name;
  }
);

// 2. Typed event handlers and useCallback
interface SearchProps {
  onSearch: (query: string) => void;
  initialQuery?: string;
  placeholder?: string;
}

const SearchBox = typedMemo<React.FC<SearchProps>>(
  ({ onSearch, initialQuery = '', placeholder = 'Search...' }) => {
    const [query, setQuery] = useState(initialQuery);
    
    // Type-safe debounced search function
    const debouncedSearch = useDebounce(onSearch, 300);
    
    // Memoized callback that only changes when dependencies change
    const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
      const newQuery = e.target.value;
      setQuery(newQuery);
      debouncedSearch(newQuery);
    }, [debouncedSearch]);
    
    return (
      &lt;input
        type="text"
        value={query}
        onChange={handleChange}
        placeholder={placeholder}
      /&gt;
    );
  }
);

// 3. Typed useMemo with dependencies
interface DataTableProps<T> {
  data: T[];
  columns: Array<{
    key: keyof T;
    label: string;
    render?: (value: T[keyof T], item: T) => ReactNode;
  }>;
  sortBy?: keyof T;
  sortDirection?: 'asc' | 'desc';
  filter?: (item: T) => boolean;
}

function DataTable<T extends Record<string, any>>({
  data,
  columns,
  sortBy,
  sortDirection = 'asc',
  filter
}: DataTableProps<T>) {
  // Type-safe filtered and sorted data with memoization
  const processedData = useMemo(() => {
    console.log('Processing data...');
    
    // Apply filter if provided
    let result = filter ? data.filter(filter) : [...data];
    
    // Apply sorting if sortBy is provided
    if (sortBy) {
      result.sort((a, b) => {
        const valueA = a[sortBy];
        const valueB = b[sortBy];
        
        if (valueA === valueB) return 0;
        
        const comparison = valueA < valueB ? -1 : 1;
        return sortDirection === 'asc' ? comparison : -comparison;
      });
    }
    
    return result;
  }, [data, filter, sortBy, sortDirection]); // Memoization dependencies
  
  return (
    &lt;table&gt;
      &lt;thead&gt;
        &lt;tr&gt;
          {columns.map(column =&gt; (
            &lt;th key={column.key as string}&gt;{column.label}&lt;/th&gt;
          ))}
        &lt;/tr&gt;
      &lt;/thead&gt;
      &lt;tbody&gt;
        {processedData.map((item, index) =&gt; (
          &lt;tr key={index}&gt;
            {columns.map(column =&gt; (
              &lt;td key={column.key as string}&gt;
                {column.render 
                  ? column.render(item[column.key], item)
                  : String(item[column.key])}
              &lt;/td&gt;
            ))}
          &lt;/tr&gt;
        ))}
      &lt;/tbody&gt;
    &lt;/table&gt;
  );
}

// 4. Utility: Type-safe debounce function
function useDebounce<T extends (...args: any[]) => any>(
  callback: T,
  delay: number
): (...args: Parameters<T>) => void {
  const callbackRef = React.useRef(callback);
  
  // Update the callback ref when callback changes
  useEffect(() => {
    callbackRef.current = callback;
  }, [callback]);
  
  return useCallback(
    (...args: Parameters<T>) => {
      const timeoutId = setTimeout(() => {
        callbackRef.current(...args);
      }, delay);
      
      return () => clearTimeout(timeoutId);
    },
    [delay] // Only recreate if delay changes
  );
}

// 5. Utility: Type-safe throttle function
function useThrottle<T extends (...args: any[]) => any>(
  callback: T,
  delay: number
): (...args: Parameters<T>) => void {
  const callbackRef = React.useRef(callback);
  const lastExecuted = React.useRef<number>(0);
  
  // Update the callback ref when callback changes
  useEffect(() => {
    callbackRef.current = callback;
  }, [callback]);
  
  return useCallback(
    (...args: Parameters<T>) => {
      const now = Date.now();
      
      if (now - lastExecuted.current >= delay) {
        callbackRef.current(...args);
        lastExecuted.current = now;
      }
    },
    [delay] // Only recreate if delay changes
  );
}

// 6. Performance optimization: memoized selectors
interface AppState {
  users: {
    byId: Record<string, { id: string; name: string; email: string }>;
    allIds: string[];
    loading: boolean;
  };
  settings: {
    theme: 'light' | 'dark';
    language: string;
  };
}

// Create a type-safe createSelector function
function createSelector<State, Selected, Result>(
  selector: (state: State) => Selected,
  resultFn: (selected: Selected) => Result
): (state: State) => Result {
  let lastSelected: Selected | undefined;
  let lastResult: Result | undefined;
  
  return (state: State) => {
    const selected = selector(state);
    
    // Only recompute if the selected state changed
    if (lastSelected !== selected) {
      lastResult = resultFn(selected);
      lastSelected = selected;
    }
    
    return lastResult as Result;
  };
}

// Example selectors
const selectUserIds = (state: AppState) => state.users.allIds;
const selectUsersById = (state: AppState) => state.users.byId;

// Memoized selector that only recomputes when dependencies change
const selectUserList = createSelector(
  (state: AppState) => ({
    byId: state.users.byId,
    allIds: state.users.allIds
  }),
  ({ byId, allIds }) => allIds.map(id => byId[id])
);

// 7. Performance optimization: React.lazy with TypeScript
const LazyComponent = React.lazy(() => import('./SomeComponent'));

interface LazyProps {
  fallback?: ReactNode;
  children?: ReactNode;
}

const LazyLoader: React.FC<LazyProps> = ({ fallback = <div>Loading...</div>, children }) => {
  return (
    &lt;React.Suspense fallback={fallback}&gt;
      {children}
    &lt;/React.Suspense&gt;
  );
};

// 8. Example app showing all optimizations together
function OptimizedApp() {
  const [users, setUsers] = useState<Array<{ id: number; name: string; email: string }>>([
    { id: 1, name: 'John Doe', email: 'john@example.com' },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com' },
    { id: 3, name: 'Bob Johnson', email: 'bob@example.com' }
  ]);
  
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedUserId, setSelectedUserId] = useState<number | null>(null);
  
  // Memoized filter function
  const filterUsers = useCallback((query: string) => {
    if (!query) return users;
    
    const lowerQuery = query.toLowerCase();
    return users.filter(user => 
      user.name.toLowerCase().includes(lowerQuery) || 
      user.email.toLowerCase().includes(lowerQuery)
    );
  }, [users]);
  
  // Memoized filtered users
  const filteredUsers = useMemo(() => {
    console.log('Filtering users...');
    return filterUsers(searchQuery);
  }, [filterUsers, searchQuery]);
  
  // Type-safe event handlers
  const handleSearch = useCallback((query: string) => {
    console.log('Search query:', query);
    setSearchQuery(query);
  }, []);
  
  const handleSelectUser = useCallback((id: number) => {
    console.log('Selected user:', id);
    setSelectedUserId(id);
  }, []);
  
  return (
    &lt;div className="app"&gt;
      &lt;h1&gt;Optimized React TypeScript App&lt;/h1&gt;
      
      &lt;SearchBox
        onSearch={handleSearch}
        initialQuery={searchQuery}
        placeholder="Search users..."
      /&gt;
      
      &lt;div className="user-list"&gt;
        {filteredUsers.map(user =&gt; (
          &lt;OptimizedUserCard
            key={user.id}
            id={user.id}
            name={user.name}
            email={user.email}
            onSelect={handleSelectUser}
          /&gt;
        ))}
      &lt;/div&gt;
      
      {selectedUserId &amp;&amp; (
        &lt;div className="selected-user"&gt;
          &lt;h2&gt;Selected User&lt;/h2&gt;
          &lt;p&gt;ID: {selectedUserId}&lt;/p&gt;
        &lt;/div&gt;
      )}
    &lt;/div&gt;
  );
}
</code></pre>
        </div>
        
        <div class="interview-tip">
          <p><span class="interview-icon">🎯</span> <strong>Interview Focus:</strong> Advanced TypeScript patterns demonstrate your expertise beyond the basics. Be prepared to explain complex type transformations, performance optimization strategies, and type safety benefits.</p>
          <p>Common interview questions include:</p>
          <ul>
            <li>"How would you implement a polymorphic component in TypeScript?"</li>
            <li>"What are mapped types and when would you use them?"</li>
            <li>"How do you narrow types with user-defined type guards?"</li>
            <li>"Explain how you would optimize React component performance with TypeScript"</li>
            <li>"What advanced TypeScript features do you use to improve type safety in React applications?"</li>
          </ul>
        </div>
      `,
          codeExample: `// Advanced TypeScript utility for creating a type-safe data fetching toolkit
import { useRef, useState, useCallback, useEffect } from 'react';

// ---------------------------------------------------------
// Type Definitions
// ---------------------------------------------------------

// Fetch states with discriminated union
export type FetchState<TData, TError = Error> =
  | { status: 'idle' }
  | { status: 'loading' }
  | { status: 'success'; data: TData }
  | { status: 'error'; error: TError };

// Generic fetch function type
export type FetchFn<TParams extends any[], TData> = (
  ...params: TParams
) => Promise<TData>;

// Options for fetch hooks
export interface FetchOptions<TData, TError> {
  // Initial data before fetch completes
  initialData?: TData;
  
  // Function to be called on successful fetch
  onSuccess?: (data: TData) => void;
  
  // Function to be called on fetch error
  onError?: (error: TError) => void;
  
  // Whether to fetch on mount
  autoFetch?: boolean;
  
  // Dependencies that trigger refetch when changed
  dependencies?: React.DependencyList;
  
  // Cancel fetch on unmount
  abortOnUnmount?: boolean;
  
  // Retry configuration
  retry?: {
    attempts: number;
    interval: number;
    exponential?: boolean;
  };
  
  // Cache configuration
  cache?: {
    enabled: boolean;
    ttl?: number; // Time to live in ms
    key?: string;
  };
  
  // Optimistic update handlers
  optimistic?: {
    update: (currentData: TData | undefined, ...params: any[]) => TData;
    revert: (currentData: TData | undefined, error: TError) => void;
  };
}

// Hook return type
export interface UseFetchResult<TParams extends any[], TData, TError> {
  // Current state of the fetch operation
  state: FetchState<TData, TError>;
  
  // Function to trigger the fetch operation
  execute: (...params: TParams) => Promise<TData | undefined>;
  
  // Function to reset state to idle
  reset: () => void;
  
  // Function to cancel in-progress fetch
  cancel: () => void;
  
  // Helper getters
  data: TData | undefined;
  error: TError | undefined;
  isIdle: boolean;
  isLoading: boolean;
  isSuccess: boolean;
  isError: boolean;
}

// Type for the cache mechanism
interface CacheEntry<T> {
  data: T;
  timestamp: number;
  ttl: number;
}

// ---------------------------------------------------------
// Internal Cache Implementation
// ---------------------------------------------------------

// Simple in-memory cache
class FetchCache {
  private static instance: FetchCache;
  private cache: Map<string, CacheEntry<any>> = new Map();
  
  private constructor() {}
  
  // Singleton pattern
  static getInstance(): FetchCache {
    if (!FetchCache.instance) {
      FetchCache.instance = new FetchCache();
    }
    return FetchCache.instance;
  }
  
  // Store data in cache
  set<T>(key: string, data: T, ttl: number = 5 * 60 * 1000): void {
    this.cache.set(key, {
      data,
      timestamp: Date.now(),
      ttl
    });
  }
  
  // Get data from cache if not expired
  get<T>(key: string): T | undefined {
    const entry = this.cache.get(key);
    
    if (!entry) return undefined;
    
    // Check if entry has expired
    if (Date.now() - entry.timestamp > entry.ttl) {
      this.cache.delete(key);
      return undefined;
    }
    
    return entry.data as T;
  }
  
  // Remove entry from cache
  delete(key: string): void {
    this.cache.delete(key);
  }
  
  // Clear all cache
  clear(): void {
    this.cache.clear();
  }
}

// ---------------------------------------------------------
// Custom Hook Implementation
// ---------------------------------------------------------

// Main hook for data fetching
export function useFetch<TParams extends any[], TData, TError = Error>(
  fetchFn: FetchFn<TParams, TData>,
  options: FetchOptions<TData, TError> = {}
): UseFetchResult<TParams, TData, TError> {
  // Get cache instance
  const cache = FetchCache.getInstance();
  
  // Extract options with defaults
  const {
    initialData,
    onSuccess,
    onError,
    autoFetch = false,
    dependencies = [],
    abortOnUnmount = true,
    retry = { attempts: 0, interval: 1000, exponential: true },
    cache: cacheOptions = { enabled: false, ttl: 5 * 60 * 1000 },
    optimistic
  } = options;
  
  // Create initial state based on initialData
  const initialState: FetchState<TData, TError> = initialData
    ? { status: 'success', data: initialData }
    : { status: 'idle' };
  
  // State for fetch operation
  const [state, setState] = useState<FetchState<TData, TError>>(initialState);
  
  // Refs to handle race conditions and cleanup
  const abortControllerRef = useRef<AbortController | null>(null);
  const isMountedRef = useRef(true);
  const fetchFnRef = useRef(fetchFn);
  const retryCountRef = useRef(0);
  const paramsRef = useRef<TParams | null>(null);
  
  // Update fetchFn ref when it changes
  useEffect(() => {
    fetchFnRef.current = fetchFn;
  }, [fetchFn]);
  
  // Track component mount status
  useEffect(() => {
    isMountedRef.current = true;
    return () => {
      isMountedRef.current = false;
      if (abortOnUnmount) {
        cancel();
      }
    };
  }, []);
  
  // Cancel current request
  const cancel = useCallback(() => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
      abortControllerRef.current = null;
    }
  }, []);
  
  // Reset state to idle
  const reset = useCallback(() => {
    if (isMountedRef.current) {
      setState({ status: 'idle' });
      retryCountRef.current = 0;
    }
  }, []);
  
  // Generate cache key from function and params
  const getCacheKey = useCallback(
    (params: TParams): string => {
      const fnName = fetchFnRef.current.name || 'anonymousFetch';
      const paramsString = JSON.stringify(params);
      return cacheOptions.key || \`\${fnName}:\${paramsString}\`;
    },
    [cacheOptions.key]
  );
  
  // Main execute function
  const execute = useCallback(
    async (...params: TParams): Promise<TData | undefined> => {
      // Cancel any in-progress request
      cancel();
      
      // Store params for potential retry
      paramsRef.current = params;
      
      // Check cache first if enabled
      if (cacheOptions.enabled) {
        const cacheKey = getCacheKey(params);
        const cachedData = cache.get<TData>(cacheKey);
        
        if (cachedData) {
          if (isMountedRef.current) {
            setState({ status: 'success', data: cachedData });
          }
          return cachedData;
        }
      }
      
      // Create new AbortController for this request
      abortControllerRef.current = new AbortController();
      const { signal } = abortControllerRef.current;
      
      // Apply optimistic update if configured
      if (optimistic && state.status === 'success') {
        const optimisticData = optimistic.update(
          'data' in state ? state.data : undefined,
          ...params
        );
        
        if (isMountedRef.current) {
          setState({ status: 'loading' });
          // Apply optimistic update right after setting loading state
          setState({ status: 'success', data: optimisticData });
        }
      } else if (isMountedRef.current) {
        setState({ status: 'loading' });
      }
      
      try {
        // Execute the fetch function
        const data = await fetchFnRef.current(...params);
        
        // Handle successful response
        if (isMountedRef.current && !signal.aborted) {
          setState({ status: 'success', data });
          
          // Cache the result if caching is enabled
          if (cacheOptions.enabled) {
            const cacheKey = getCacheKey(params);
            cache.set(cacheKey, data, cacheOptions.ttl);
          }
          
          // Reset retry counter
          retryCountRef.current = 0;
          
          // Call success callback if provided
          if (onSuccess) {
            onSuccess(data);
          }
        }
        
        return data;
      } catch (err) {
        // Handle errors
        const error = err instanceof Error ? err : new Error(String(err));
        const typedError = error as TError;
        
        // Don't update state if request was aborted or component unmounted
        if (error.name === 'AbortError' || !isMountedRef.current) {
          return undefined;
        }
        
        // Handle optimistic update reversion
        if (optimistic && state.status === 'success') {
          optimistic.revert('data' in state ? state.data : undefined, typedError);
        }
        
        // Try to retry if configured
        if (
          retry.attempts > 0 && 
          retryCountRef.current < retry.attempts && 
          paramsRef.current
        ) {
          retryCountRef.current++;
          
          // Calculate retry delay with exponential backoff if enabled
          const delay = retry.exponential
            ? retry.interval * Math.pow(2, retryCountRef.current - 1)
            : retry.interval;
          
          setTimeout(() => {
            if (isMountedRef.current && paramsRef.current) {
              execute(...paramsRef.current);
            }
          }, delay);
          
          return undefined;
        }
        
        // Update error state if retries exhausted or not configured
        if (isMountedRef.current) {
          setState({ status: 'error', error: typedError });
        }
        
        // Call error callback if provided
        if (onError) {
          onError(typedError);
        }
        
        return undefined;
      }
    },
    [
      state,
      cancel,
      getCacheKey,
      cacheOptions.enabled,
      cacheOptions.ttl,
      onSuccess,
      onError,
      optimistic,
      retry.attempts,
      retry.interval,
      retry.exponential
    ]
  );
  
  // Auto-fetch on mount or when dependencies change
  useEffect(() => {
    if (autoFetch && paramsRef.current) {
      execute(...paramsRef.current);
    }
  }, dependencies);
  
  // Extract data and error for convenience
  const data = state.status === 'success' ? state.data : undefined;
  const error = state.status === 'error' ? state.error : undefined;
  
  // Helper status flags
  const isIdle = state.status === 'idle';
  const isLoading = state.status === 'loading';
  const isSuccess = state.status === 'success';
  const isError = state.status === 'error';
  
  return {
    state,
    execute,
    reset,
    cancel,
    data,
    error,
    isIdle,
    isLoading,
    isSuccess,
    isError
  };
}

// ---------------------------------------------------------
// Utility Hooks
// ---------------------------------------------------------

// Simpler hook for basic GET requests
export function useGet<TData, TError = Error>(
  url: string,
  options: Omit<FetchOptions<TData, TError>, 'autoFetch'> & {
    autoFetch?: boolean;
    headers?: Record<string, string>;
  } = {}
): UseFetchResult<[], TData, TError> {
  const { headers, ...restOptions } = options;
  
  const fetchFn = useCallback(async () => {
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        ...headers
      }
    });
    
    if (!response.ok) {
      throw new Error(\`HTTP error! Status: \${response.status}\`);
    }
    
    return response.json() as Promise<TData>;
  }, [url, headers]);
  
  return useFetch<[], TData, TError>(fetchFn, {
    ...restOptions,
    autoFetch: options.autoFetch !== false, // Default to true for GET
    dependencies: [url, headers]
  });
}

// Hook for POST requests
export function usePost<TBody, TData, TError = Error>(
  url: string,
  options: Omit<FetchOptions<TData, TError>, 'autoFetch'> & {
    headers?: Record<string, string>;
  } = {}
): UseFetchResult<[TBody], TData, TError> {
  const { headers, ...restOptions } = options;
  
  const fetchFn = useCallback(
    async (body: TBody) => {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...headers
        },
        body: JSON.stringify(body)
      });
      
      if (!response.ok) {
        throw new Error(\`HTTP error! Status: \${response.status}\`);
      }
      
      return response.json() as Promise<TData>;
    },
    [url, headers]
  );
  
  return useFetch<[TBody], TData, TError>(fetchFn, {
    ...restOptions,
    autoFetch: false, // Default to false for POST
    dependencies: [url, headers]
  });
}

// Hook for mutation operations (POST, PUT, DELETE)
export function useMutation<TVariables, TData, TError = Error>(
  mutationFn: (variables: TVariables) => Promise<TData>,
  options: FetchOptions<TData, TError> = {}
): UseFetchResult<[TVariables], TData, TError> {
  return useFetch<[TVariables], TData, TError>(
    async (variables: TVariables) => mutationFn(variables),
    {
      ...options,
      autoFetch: false // Mutations should not run automatically
    }
  );
}

// ---------------------------------------------------------
// Usage Examples
// ---------------------------------------------------------

// User interface for examples
interface User {
  id: number;
  name: string;
  email: string;
}

// Example: Fetching a user
function UserProfile({ userId }: { userId: number }) {
  const {
    data: user,
    isLoading,
    isError,
    error,
    execute: fetchUser
  } = useGet<User>(\`/api/users/\${userId}\`, {
    onSuccess: (data) => console.log('User loaded:', data.name),
    onError: (err) => console.error('Failed to load user:', err),
    cache: {
      enabled: true,
      ttl: 60000 // 1 minute
    }
  });

  return (
    <div>
      {isLoading && <p>Loading user...</p>}
      {isError && <p>Error: {error?.message}</p>}
      {user && (
        <div>
          <h2>{user.name}</h2>
          <p>Email: {user.email}</p>
          <button onClick={() => fetchUser()}>Refresh</button>
        </div>
      )}
    </div>
  );
}

// Example: Creating a user
function CreateUserForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: ''
  });

  const {
    execute: createUser,
    isLoading,
    isSuccess,
    isError,
    error
  } = usePost<Omit<User, 'id'>, User>('/api/users', {
    onSuccess: (user) => {
      console.log('User created:', user);
      setFormData({ name: '', email: '' });
    }
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    createUser(formData);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="name">Name:</label>
        <input
          id="name"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          required
        />
      </div>
      
      <div>
        <label htmlFor="email">Email:</label>
        <input
          id="email"
          type="email"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          required
        />
      </div>
      
      <button type="submit" disabled={isLoading}>
        {isLoading ? 'Creating...' : 'Create User'}
      </button>
      
      {isSuccess && <p>User created successfully!</p>}
      {isError && <p>Error: {error?.message}</p>}
    </form>
  );
}

export { FetchCache };`,
          exercise: {
            instructions:
              'Create a type-safe React component library with TypeScript that implements: (1) A polymorphic Button component that can render as different elements, (2) A Form component with proper TypeScript validation, (3) A DataTable component with typed columns and row data, (4) Custom hooks for form state management using TypeScript generics, (5) Properly typed context for theme and localization.',
          },
        },
      ],
      prepperSummary: `
    <div class="prepper-summary">
      <h3>🔑 Key Interview Takeaways</h3>
      <ul>
        <li><strong>TypeScript Fundamentals in React:</strong> Master essential TypeScript concepts like interfaces, unions, generics, and function types to create strongly-typed React components. These form the foundation for type-safe React development.</li>
        
        <li><strong>Component Typing:</strong> Understand different approaches to typing React components and their props. This ensures consistency in your component APIs and catches errors before runtime.</li>
        
        <li><strong>Hooks and State Management:</strong> Be comfortable with typing React hooks and state management solutions. Properly typed state updates and side effects lead to more maintainable applications.</li>
        
        <li><strong>Advanced TypeScript Patterns:</strong> Learn polymorphic components, type guards, and mapped types to solve complex problems in React applications with type safety. These patterns elevate your TypeScript expertise.</li>
        
        <li><strong>Performance Optimization:</strong> Apply TypeScript knowledge to optimize React performance through proper typing of memoization techniques and other performance patterns.</li>
      </ul>
      
      <h4>📝 Common Interview Questions</h4>
      <ol>
        <li>"What are the benefits of using TypeScript with React?"</li>
        <li>"How would you type a component that accepts different props based on a discriminator property?"</li>
        <li>"Explain the difference between interface and type alias in the context of React components"</li>
        <li>"How do you properly type useState and useReducer with complex state?"</li>
        <li>"How would you implement and type a custom hook for form validation?"</li>
        <li>"What are type guards and how can they improve safety in React components?"</li>
        <li>"How would you type a higher-order component in TypeScript?"</li>
        <li>"What are some strategies for typing asynchronous operations in React?"</li>
        <li>"How would you implement a type-safe context provider and consumer?"</li>
        <li>"What TypeScript features help with optimizing React application performance?"</li>
      </ol>
    </div>
  `,
    },
  ],
  challenge: {
    description:
      'You\'re tasked with building a "TypeScript React Developer\'s Toolkit" that demonstrates mastery of the 20 essential TypeScript and React concepts. Create a comprehensive library of type-safe components, hooks, and utilities that could be used in real-world React applications.',
    requirements: [
      'Implement a flexible, type-safe component system with proper prop typing',
      'Create generic, reusable custom hooks with TypeScript',
      'Develop a type-safe state management solution',
      'Build form validation with strong TypeScript integration',
      'Implement type-safe routing utilities',
      'Create context providers with proper TypeScript typing',
      'Develop utilities for handling asynchronous operations',
      'Use advanced TypeScript features (mapped types, conditional types, etc.)',
      'Implement performance optimizations with proper typing',
      'Include comprehensive TypeScript documentation for all parts of the toolkit',
    ],
    starterCode: `// TypeScript React Developer's Toolkit
// Demonstrate your mastery of TypeScript with React

// You can structure your solution as you see fit, but it should cover all required concepts
// Here's a possible starting point:

import React, { useState, useEffect, useCallback, useReducer, useRef, ReactNode } from 'react';

// ========================================================
// Type Definitions
// ========================================================

// Add your core type definitions here

// ========================================================
// Component System
// ========================================================

// Implement flexible, type-safe components here

// ========================================================
// Custom Hooks
// ========================================================

// Create reusable, generic custom hooks here

// ========================================================
// State Management
// ========================================================

// Implement type-safe state management here

// ========================================================
// Form System
// ========================================================

// Build a type-safe form validation system here

// ========================================================
// Utilities
// ========================================================

// Create various utilities with proper TypeScript typing

// ========================================================
// Context Providers
// ========================================================

// Implement type-safe context providers here

// ========================================================
// Advanced TypeScript Features
// ========================================================

// Demonstrate mastery of advanced TypeScript concepts

// ========================================================
// Performance Optimizations
// ========================================================

// Show TypeScript-based performance optimizations

export {
  // Export your toolkit components and utilities here
};`,
  },
}

export default shortlistPrepper
