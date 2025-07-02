// curriculum-section3.js - Advanced C# Features

const advancedCSharpFeatures = {
  title: 'Advanced C# Features',
  description:
    'Explore powerful advanced features of C# that enhance code efficiency, readability, and functionality.',
  lessons: [
    {
      title: 'Generics',
      description:
        'Learn how to write reusable, type-safe code using generics for collections, methods, and classes.',
      sections: [
        {
          title: 'Introduction to Generics',
          explanation: `
        <p>Generics are one of the most powerful features in C#, allowing you to write type-safe, reusable code that works with any data type. They eliminate the need for casting and boxing/unboxing operations, which improves both performance and type safety.</p>
        
        <h4>Why Use Generics?</h4>
        <p>Before generics, developers had to use <code>object</code> types for reusable collections and algorithms, which led to several problems:</p>
        <ul>
          <li><strong>Type Safety:</strong> No compile-time checking for correct types</li>
          <li><strong>Performance:</strong> Boxing/unboxing overhead for value types</li>
          <li><strong>Code Clarity:</strong> Explicit casting required everywhere</li>
        </ul>

        <p>Generics solve these issues by providing compile-time type checking and eliminating the need for casting.</p>

        <h4>Generic Constraints</h4>
        <p>Constraints allow you to specify what types can be used with your generic code:</p>
        <ul>
          <li><code>where T : class</code> - T must be a reference type</li>
          <li><code>where T : struct</code> - T must be a value type</li>
          <li><code>where T : new()</code> - T must have a parameterless constructor</li>
          <li><code>where T : IComparable</code> - T must implement IComparable</li>
        </ul>
        
        <div class="code-example">
          <pre><code>// Generic List example
List<int> numbers = new List<int> { 1, 2, 3 };
List<string> names = new List<string> { "Alice", "Bob" };

// Generic method with constraint
public T Max<T>(T a, T b) where T : IComparable<T>
{
    return a.CompareTo(b) > 0 ? a : b;
}

// Generic class with multiple constraints
public class Repository<T> where T : class, new()
{
    private List<T> _items = new List<T>();
    
    public void Add(T item) => _items.Add(item);
    public T Get(int index) => _items[index];
    public T Create() => new T();
}

// Using the generic method
int maxInt = Max(5, 10);           // 10
string maxString = Max("A", "Z");  // "Z"
</code></pre>
        </div>
        
        <div class="interview-tip">
          <p><span class="interview-icon">🎯</span> <strong>Interview Focus:</strong> Be prepared to discuss the benefits of generics and how constraints work.</p>
          <p>Common questions: "What are the benefits of generics over using object types?", "How do generic constraints work?", "When would you use different types of constraints?"</p>
        </div>
      `,
          codeExample: `// Generic Stack implementation
public class Stack<T>
{
    private List<T> _items = new List<T>();
    public void Push(T item) => _items.Add(item);
    public T Pop() { var val = _items[^1]; _items.RemoveAt(_items.Count - 1); return val; }
    public int Count => _items.Count;
}`,
        },
      ],
      exercise: {
        instructions:
          'Implement a generic Queue<T> class with Enqueue, Dequeue, and Count methods. Demonstrate usage with both int and string types.',
      },
    },
    {
      title: 'Extension Methods',
      description: 'Add new methods to existing types without modifying their source code.',
      sections: [
        {
          title: 'How Extension Methods Work',
          explanation: `
        <p>Extension methods are a powerful feature that allows you to add new functionality to existing types without modifying their source code or using inheritance. They provide a clean way to extend the functionality of classes you don't own, such as framework classes.</p>
        
        <h4>How Extension Methods Work</h4>
        <p>Extension methods are static methods in static classes, but they appear to be instance methods on the extended type. The first parameter is preceded by the <code>this</code> keyword, which tells the compiler this is an extension method.</p>

        <p><strong>Key characteristics:</strong></p>
        <ul>
          <li>Must be in a static class</li>
          <li>Must be static methods</li>
          <li>First parameter must be preceded by <code>this</code></li>
          <li>Cannot override existing methods</li>
          <li>Are resolved at compile time</li>
        </ul>

        <h4>When to Use Extension Methods</h4>
        <p>Extension methods are ideal for:</p>
        <ul>
          <li>Adding utility methods to framework types</li>
          <li>Creating fluent APIs</li>
          <li>Adding domain-specific functionality</li>
          <li>Improving code readability</li>
        </ul>
        
        <div class="code-example">
          <pre><code>// Extension method for string
public static class StringExtensions
{
    public static bool IsCapitalized(this string s)
    {
        return !string.IsNullOrEmpty(s) && char.IsUpper(s[0]);
    }
    
    public static string Reverse(this string s)
    {
        return new string(s.Reverse().ToArray());
    }
    
    public static int WordCount(this string s)
    {
        return s.Split(new[] { ' ' }, StringSplitOptions.RemoveEmptyEntries).Length;
    }
}

// Extension method for collections
public static class CollectionExtensions
{
    public static void ForEach<T>(this IEnumerable<T> source, Action<T> action)
    {
        foreach (var item in source)
            action(item);
    }
    
    public static bool IsEmpty<T>(this IEnumerable<T> source)
    {
        return !source.Any();
    }
}

// Usage examples
string name = "Alice";
bool isCap = name.IsCapitalized();  // true
string reversed = name.Reverse();   // "ecilA"
int words = "Hello world".WordCount(); // 2

var numbers = new List<int> { 1, 2, 3 };
numbers.ForEach(n => Console.WriteLine(n));
bool isEmpty = numbers.IsEmpty(); // false
</code></pre>
        </div>
        
        <div class="interview-tip">
          <p><span class="interview-icon">🎯</span> <strong>Interview Focus:</strong> Understand how extension methods work and their limitations.</p>
          <p>Common questions: "How do extension methods work under the hood?", "What are the limitations of extension methods?", "When would you use extension methods vs. inheritance?"</p>
        </div>
      `,
          codeExample: `// Extension method for IEnumerable<T>
public static class EnumerableExtensions
{
    public static int CountEven<T>(this IEnumerable<T> source) where T : struct, IConvertible
    {
        return source.Count(x => Convert.ToInt32(x) % 2 == 0);
    }
}`,
        },
      ],
      exercise: {
        instructions:
          'Write an extension method for List<string> that returns the longest string in the list.',
      },
    },
    {
      title: 'Lambda Expressions and Delegates',
      description: 'Use anonymous functions and delegates for flexible, concise code.',
      sections: [
        {
          title: 'Delegates and Lambdas',
          explanation: `
        <p>Delegates and lambda expressions are fundamental to modern C# programming, enabling functional programming concepts and providing a clean way to pass methods as parameters.</p>
        
        <h4>Understanding Delegates</h4>
        <p>Delegates are type-safe function pointers that can reference methods with a specific signature. They enable you to pass methods as parameters, store them in variables, and invoke them dynamically.</p>

        <p><strong>Delegate types:</strong></p>
        <ul>
          <li><code>Action</code> - for methods that don't return a value</li>
          <li><code>Func</code> - for methods that return a value</li>
          <li><code>Predicate</code> - for methods that return a boolean</li>
          <li>Custom delegates - for specific method signatures</li>
        </ul>

        <h4>Lambda Expressions</h4>
        <p>Lambda expressions provide a concise way to write anonymous methods. They are especially useful with LINQ and event handling.</p>

        <p><strong>Lambda syntax:</strong></p>
        <ul>
          <li><code>(parameters) => expression</code> - expression lambda</li>
          <li><code>(parameters) => { statements }</code> - statement lambda</li>
        </ul>
        
        <div class="code-example">
          <pre><code>// Custom delegate declaration
public delegate int MathOp(int x, int y);

// Using custom delegate with lambda
MathOp add = (a, b) => a + b;
MathOp multiply = (a, b) => a * b;
int result = add(2, 3); // 5

// Built-in delegate types
Action<string> greet = name => Console.WriteLine($"Hello, {name}");
Action<int, int> printSum = (a, b) => Console.WriteLine($"Sum: {a + b}");

Func<int, int, int> multiplyFunc = (x, y) => x * y;
Func<string, int> getLength = s => s.Length;

Predicate<int> isEven = n => n % 2 == 0;

// Lambda with multiple parameters
Func<int, int, int, int> sum3 = (a, b, c) => a + b + c;

// Statement lambda
Action<int> printNumber = n => 
{
    if (n > 0)
        Console.WriteLine($"Positive: {n}");
    else
        Console.WriteLine($"Non-positive: {n}");
};

// Using delegates in practice
var numbers = new List<int> { 1, 2, 3, 4, 5 };
var evenNumbers = numbers.FindAll(isEven); // [2, 4]

// Lambda with LINQ
var doubled = numbers.Select(n => n * 2).ToList(); // [2, 4, 6, 8, 10]
var filtered = numbers.Where(n => n > 3).ToList(); // [4, 5]

// Event handling with lambda
button.Clicked += (sender, e) => Console.WriteLine("Button clicked!");
</code></pre>
        </div>
        
        <div class="interview-tip">
          <p><span class="interview-icon">🎯</span> <strong>Interview Focus:</strong> Understand the different delegate types and when to use lambdas.</p>
          <p>Common questions: "What's the difference between Action and Func?", "When would you use a custom delegate vs. built-in types?", "How do lambda expressions work under the hood?"</p>
        </div>
      `,
          codeExample: `// Using lambdas with LINQ
var numbers = new List<int> { 1, 2, 3, 4, 5 };
var evens = numbers.Where(n => n % 2 == 0).ToList(); // [2, 4]`,
        },
      ],
      exercise: {
        instructions:
          'Create a delegate that takes a string and returns its length. Use a lambda to assign the implementation.',
      },
    },
    {
      title: 'Events and Event Handling',
      description: 'Implement the observer pattern using events and delegates.',
      sections: [
        {
          title: 'Events in C#',
          explanation: `
        <p>Events are a fundamental mechanism in C# for implementing the observer pattern, allowing objects to notify other objects when something happens. They provide loose coupling between publishers and subscribers.</p>
        
        <h4>Understanding Events</h4>
        <p>Events are based on delegates and provide a standardized way for objects to communicate. They consist of:</p>
        <ul>
          <li><strong>Event declaration:</strong> Defines the event and its signature</li>
          <li><strong>Event subscription:</strong> Other objects subscribe to the event</li>
          <li><strong>Event invocation:</strong> The publisher raises the event</li>
        </ul>

        <h4>Event Patterns</h4>
        <p>C# provides several event patterns:</p>
        <ul>
          <li><strong>Standard events:</strong> Use <code>EventHandler</code> delegate</li>
          <li><strong>Custom event args:</strong> Pass additional data with events</li>
          <li><strong>Generic events:</strong> Use <code>EventHandler<T></code> for custom event args</li>
        </ul>

        <h4>Best Practices</h4>
        <p>When working with events:</p>
        <ul>
          <li>Always check for null before invoking events</li>
          <li>Use the null-conditional operator (<code>?.Invoke</code>)</li>
          <li>Consider thread safety for multi-threaded scenarios</li>
          <li>Unsubscribe from events to prevent memory leaks</li>
        </ul>
        
        <div class="code-example">
          <pre><code>// Basic event example
public class Button
{
    public event EventHandler Clicked;
    
    public void Click()
    {
        // Safe event invocation
        Clicked?.Invoke(this, EventArgs.Empty);
    }
}

// Custom event args
public class MessageEventArgs : EventArgs
{
    public string Message { get; set; }
    public DateTime Timestamp { get; set; }
    
    public MessageEventArgs(string message)
    {
        Message = message;
        Timestamp = DateTime.Now;
    }
}

// Class with custom event
public class Messenger
{
    public event EventHandler<MessageEventArgs> MessageSent;
    
    public void SendMessage(string message)
    {
        var args = new MessageEventArgs(message);
        MessageSent?.Invoke(this, args);
    }
}

// Publisher-Subscriber pattern
public class Publisher
{
    public event EventHandler<string> DataChanged;
    
    private string _data;
    public string Data
    {
        get => _data;
        set
        {
            if (_data != value)
            {
                _data = value;
                DataChanged?.Invoke(this, value);
            }
        }
    }
}

// Usage examples
var button = new Button();
button.Clicked += (sender, e) => Console.WriteLine("Button clicked!");

var messenger = new Messenger();
messenger.MessageSent += (sender, e) => 
    Console.WriteLine($"Message sent at {e.Timestamp}: {e.Message}");

var publisher = new Publisher();
publisher.DataChanged += (sender, data) => 
    Console.WriteLine($"Data changed to: {data}");

// Trigger events
button.Click();
messenger.SendMessage("Hello, World!");
publisher.Data = "New Value";

// Event with multiple subscribers
var multiButton = new Button();
multiButton.Clicked += (s, e) => Console.WriteLine("First handler");
multiButton.Clicked += (s, e) => Console.WriteLine("Second handler");
multiButton.Click(); // Both handlers execute
</code></pre>
        </div>
        
        <div class="interview-tip">
          <p><span class="interview-icon">🎯</span> <strong>Interview Focus:</strong> Understand event patterns and the observer design pattern.</p>
          <p>Common questions: "How do events work under the hood?", "What's the difference between events and delegates?", "How do you prevent memory leaks with events?"</p>
        </div>
      `,
          codeExample: `// Custom event args
public class MessageEventArgs : EventArgs
{
    public string Message { get; set; }
}

public class Messenger
{
    public event EventHandler<MessageEventArgs> MessageSent;
    public void Send(string msg)
    {
        MessageSent?.Invoke(this, new MessageEventArgs { Message = msg });
    }
}`,
        },
      ],
      exercise: {
        instructions:
          'Create a class with an event that is triggered when a value changes. Demonstrate subscribing and handling the event.',
      },
    },
    {
      title: 'LINQ Basics',
      description: 'Query collections in a declarative, SQL-like way using LINQ.',
      sections: [
        {
          title: 'LINQ Overview',
          explanation: `
        <p>LINQ (Language Integrated Query) is a powerful feature that brings query capabilities to C#. It provides a unified way to query data from different sources including collections, databases, XML, and more.</p>
        
        <h4>LINQ Syntax Options</h4>
        <p>LINQ offers two syntax styles:</p>
        <ul>
          <li><strong>Query syntax:</strong> SQL-like declarative syntax that's very readable</li>
          <li><strong>Method syntax:</strong> Fluent API using extension methods</li>
        </ul>

        <h4>Common LINQ Operators</h4>
        <p>LINQ provides many operators for different operations:</p>
        <ul>
          <li><strong>Filtering:</strong> Where, OfType</li>
          <li><strong>Projection:</strong> Select, SelectMany</li>
          <li><strong>Ordering:</strong> OrderBy, OrderByDescending, ThenBy</li>
          <li><strong>Grouping:</strong> GroupBy</li>
          <li><strong>Aggregation:</strong> Count, Sum, Average, Min, Max</li>
          <li><strong>Set operations:</strong> Distinct, Union, Intersect, Except</li>
        </ul>

        <h4>Deferred vs. Immediate Execution</h4>
        <p>LINQ queries can be:</p>
        <ul>
          <li><strong>Deferred:</strong> Execution is postponed until the result is actually needed</li>
          <li><strong>Immediate:</strong> Execution happens immediately (e.g., ToList(), ToArray())</li>
        </ul>
        
        <div class="code-example">
          <pre><code>// LINQ query syntax
var numbers = new List<int> { 1, 2, 3, 4, 5, 6, 7, 8, 9, 10 };

// Filtering and projection
var evenNumbers = from n in numbers 
                  where n % 2 == 0 
                  select n;

var squares = from n in numbers 
              select n * n;

// Method syntax equivalents
var evenNumbersMethod = numbers.Where(n => n % 2 == 0);
var squaresMethod = numbers.Select(n => n * n);

// Complex queries
var people = new List<Person> 
{
    new Person { Name = "Alice", Age = 30, City = "New York" },
    new Person { Name = "Bob", Age = 25, City = "Boston" },
    new Person { Name = "Charlie", Age = 35, City = "New York" },
    new Person { Name = "Diana", Age = 28, City = "Chicago" }
};

// Query syntax with multiple operations
var query = from p in people
            where p.Age > 25
            orderby p.Name
            select new { p.Name, p.City };

// Method syntax equivalent
var methodQuery = people
    .Where(p => p.Age > 25)
    .OrderBy(p => p.Name)
    .Select(p => new { p.Name, p.City });

// Grouping
var groupedByCity = from p in people
                    group p by p.City into g
                    select new { City = g.Key, Count = g.Count() };

// Aggregation
var averageAge = people.Average(p => p.Age);
var oldestPerson = people.Max(p => p.Age);
var totalPeople = people.Count(p => p.Age > 30);

// Deferred execution example
var deferredQuery = numbers.Where(n => n > 5); // Query not executed yet
numbers.Add(15); // This will affect the query result
var result = deferredQuery.ToList(); // Query executed here

// Immediate execution
var immediateResult = numbers.Where(n => n > 5).ToList(); // Executed immediately
</code></pre>
        </div>
        
        <div class="interview-tip">
          <p><span class="interview-icon">🎯</span> <strong>Interview Focus:</strong> Understand LINQ syntax options and execution behavior.</p>
          <p>Common questions: "What's the difference between query and method syntax?", "How does deferred execution work?", "When would you use GroupBy vs. Select?"</p>
        </div>
      `,
          codeExample: `// LINQ with objects
public class Person { public string Name; public int Age; }
var people = new List<Person> {
    new Person { Name = "Alice", Age = 30 },
    new Person { Name = "Bob", Age = 25 }
};
var names = people.Where(p => p.Age > 26).Select(p => p.Name).ToList(); // ["Alice"]`,
        },
      ],
      exercise: {
        instructions:
          'Write a LINQ query to find all strings in a list that start with the letter "A".',
      },
    },
    {
      title: 'Asynchronous Programming (async/await)',
      description: 'Write responsive, non-blocking code using async and await.',
      sections: [
        {
          title: 'Async and Await',
          explanation: `
        <p>Asynchronous programming is essential for building responsive applications. The <code>async</code> and <code>await</code> keywords provide a clean, readable way to write asynchronous code without the complexity of callbacks or manual thread management.</p>
        
        <h4>Understanding Async/Await</h4>
        <p>Asynchronous programming allows you to perform time-consuming operations without blocking the main thread:</p>
        <ul>
          <li><strong>async:</strong> Marks a method as asynchronous</li>
          <li><strong>await:</strong> Pauses execution until the awaited task completes</li>
          <li><strong>Task:</strong> Represents an asynchronous operation</li>
        </ul>

        <h4>When to Use Async/Await</h4>
        <p>Use async/await for operations that involve:</p>
        <ul>
          <li>I/O operations (file, network, database)</li>
          <li>Web API calls</li>
          <li>Long-running computations</li>
          <li>UI operations that shouldn't block the UI thread</li>
        </ul>

        <h4>Best Practices</h4>
        <p>Follow these guidelines for effective async programming:</p>
        <ul>
          <li>Use <code>async void</code> only for event handlers</li>
          <li>Always await async methods or return the Task</li>
          <li>Use <code>ConfigureAwait(false)</code> for library code</li>
          <li>Handle exceptions properly in async methods</li>
        </ul>
        
        <div class="code-example">
          <pre><code>// Basic async method
public async Task<int> GetDataAsync()
{
    await Task.Delay(1000); // Simulate async work
    return 42;
}

// Async method with exception handling
public async Task<string> ReadFileAsync(string path)
{
    try
    {
        using (var reader = new StreamReader(path))
        {
            return await reader.ReadToEndAsync();
        }
    }
    catch (FileNotFoundException)
    {
        return "File not found";
    }
}

// Async method that calls other async methods
public async Task<List<string>> ProcessFilesAsync(string[] paths)
{
    var tasks = paths.Select(path => ReadFileAsync(path));
    var results = await Task.WhenAll(tasks);
    return results.ToList();
}

// Async event handler (async void is acceptable)
public async void Button_Click(object sender, EventArgs e)
{
    try
    {
        var data = await GetDataAsync();
        MessageBox.Show($"Data: {data}");
    }
    catch (Exception ex)
    {
        MessageBox.Show($"Error: {ex.Message}");
    }
}

// Async method with cancellation
public async Task<string> DownloadWithTimeoutAsync(string url, int timeoutMs)
{
    using (var cts = new CancellationTokenSource(timeoutMs))
    {
        try
        {
            using (var client = new HttpClient())
            {
                return await client.GetStringAsync(url, cts.Token);
            }
        }
        catch (OperationCanceledException)
        {
            return "Download timed out";
        }
    }
}

// Parallel async operations
public async Task<int[]> ProcessNumbersAsync(int[] numbers)
{
    var tasks = numbers.Select(async n => 
    {
        await Task.Delay(100); // Simulate work
        return n * 2;
    });
    
    return await Task.WhenAll(tasks);
}

// Usage examples
var result = await GetDataAsync();
var fileContent = await ReadFileAsync("data.txt");
var processedFiles = await ProcessFilesAsync(new[] { "file1.txt", "file2.txt" });
var downloadResult = await DownloadWithTimeoutAsync("https://api.example.com/data", 5000);
</code></pre>
        </div>
        
        <div class="interview-tip">
          <p><span class="interview-icon">🎯</span> <strong>Interview Focus:</strong> Understand async/await patterns and best practices.</p>
          <p>Common questions: "What's the difference between async/await and threading?", "When should you use async void?", "How do you handle exceptions in async methods?"</p>
        </div>
      `,
          codeExample: `// Async file read
public async Task<string> ReadFileAsync(string path)
{
    using (var reader = new StreamReader(path))
    {
        return await reader.ReadToEndAsync();
    }
}`,
        },
      ],
      exercise: {
        instructions:
          'Write an async method that fetches data from a web API and returns the result as a string.',
      },
    },
    {
      title: 'Attributes and Reflection',
      description: 'Add metadata to code and inspect it at runtime using reflection.',
      sections: [
        {
          title: 'Attributes and Reflection',
          explanation: `
        <p>Attributes and reflection are powerful features that enable metadata-driven programming. Attributes allow you to add declarative information to your code, while reflection lets you inspect and interact with this metadata at runtime.</p>
        
        <h4>Understanding Attributes</h4>
        <p>Attributes are declarative tags that add metadata to code elements:</p>
        <ul>
          <li><strong>Built-in attributes:</strong> [Obsolete], [Serializable], [DllImport]</li>
          <li><strong>Custom attributes:</strong> User-defined metadata</li>
          <li><strong>Target elements:</strong> Classes, methods, properties, parameters</li>
        </ul>

        <h4>Reflection Capabilities</h4>
        <p>Reflection allows you to:</p>
        <ul>
          <li>Inspect types and their members at runtime</li>
          <li>Create instances of types dynamically</li>
          <li>Invoke methods and access properties</li>
          <li>Read and write attribute metadata</li>
        </ul>

        <h4>Common Use Cases</h4>
        <p>Attributes and reflection are used for:</p>
        <ul>
          <li>Serialization frameworks</li>
          <li>Dependency injection containers</li>
          <li>Unit testing frameworks</li>
          <li>Configuration systems</li>
          <li>Validation frameworks</li>
        </ul>
        
        <div class="code-example">
          <pre><code>// Custom attribute with multiple targets
[AttributeUsage(AttributeTargets.Class | AttributeTargets.Method, AllowMultiple = true)]
public class AuthorAttribute : Attribute
{
    public string Name { get; }
    public string Version { get; set; }
    
    public AuthorAttribute(string name)
    {
        Name = name;
    }
}

// Validation attribute
[AttributeUsage(AttributeTargets.Property)]
public class RequiredAttribute : Attribute
{
    public string ErrorMessage { get; set; } = "This field is required.";
}

// Using attributes
[Author("Jane Doe", Version = "1.0")]
[Author("John Smith", Version = "2.0")]
public class User
{
    [Required(ErrorMessage = "Name is required")]
    public string Name { get; set; }
    
    [Required]
    public string Email { get; set; }
    
    public int Age { get; set; }
}

// Reflection to inspect attributes
public class AttributeInspector
{
    public static void InspectType(Type type)
    {
        Console.WriteLine($"Inspecting type: {type.Name}");
        
        // Get class attributes
        var classAttributes = type.GetCustomAttributes(typeof(AuthorAttribute), false);
        foreach (AuthorAttribute attr in classAttributes)
        {
            Console.WriteLine($"Author: {attr.Name}, Version: {attr.Version}");
        }
        
        // Get property attributes
        var properties = type.GetProperties();
        foreach (var prop in properties)
        {
            var requiredAttr = prop.GetCustomAttribute<RequiredAttribute>();
            if (requiredAttr != null)
            {
                Console.WriteLine($"Property {prop.Name} is required: {requiredAttr.ErrorMessage}");
            }
        }
    }
    
    public static bool ValidateObject(object obj)
    {
        var type = obj.GetType();
        var properties = type.GetProperties();
        
        foreach (var prop in properties)
        {
            var requiredAttr = prop.GetCustomAttribute<RequiredAttribute>();
            if (requiredAttr != null)
            {
                var value = prop.GetValue(obj);
                if (value == null || (value is string str && string.IsNullOrEmpty(str)))
                {
                    Console.WriteLine($"Validation failed: {requiredAttr.ErrorMessage}");
                    return false;
                }
            }
        }
        
        return true;
    }
}

// Dynamic object creation and method invocation
public class DynamicExample
{
    public static object CreateInstance(string typeName)
    {
        var type = Type.GetType(typeName);
        return type != null ? Activator.CreateInstance(type) : null;
    }
    
    public static void InvokeMethod(object obj, string methodName, params object[] parameters)
    {
        var method = obj.GetType().GetMethod(methodName);
        if (method != null)
        {
            method.Invoke(obj, parameters);
        }
    }
}

// Usage examples
var user = new User { Name = "Alice", Email = "alice@example.com" };
AttributeInspector.InspectType(typeof(User));
bool isValid = AttributeInspector.ValidateObject(user);

// Dynamic creation
var dynamicUser = DynamicExample.CreateInstance("User");
DynamicExample.InvokeMethod(dynamicUser, "set_Name", "Bob");
</code></pre>
        </div>
        
        <div class="interview-tip">
          <p><span class="interview-icon">🎯</span> <strong>Interview Focus:</strong> Understand attribute design and reflection usage.</p>
          <p>Common questions: "How do you create custom attributes?", "What are the performance implications of reflection?", "When would you use reflection vs. other approaches?"</p>
        </div>
      `,
          codeExample: `// Reflection to list all properties
var props = typeof(MyClass).GetProperties();
foreach (var prop in props)
    Console.WriteLine(prop.Name);`,
        },
      ],
      exercise: {
        instructions:
          'Create a custom attribute called [Required] and use reflection to find all properties in a class that have this attribute.',
      },
    },
    {
      title: 'Pattern Matching and Expression Bodied Members',
      description: 'Write concise, readable code using modern C# features.',
      sections: [
        {
          title: 'Pattern Matching & Expression Bodied Members',
          explanation: `
        <p>Pattern matching and expression-bodied members are modern C# features that make code more concise, readable, and expressive. They reduce boilerplate code and improve the overall developer experience.</p>
        
        <h4>Pattern Matching Features</h4>
        <p>C# provides several pattern matching capabilities:</p>
        <ul>
          <li><strong>Type patterns:</strong> Check and cast in one operation</li>
          <li><strong>Constant patterns:</strong> Match against specific values</li>
          <li><strong>Property patterns:</strong> Match based on object properties</li>
          <li><strong>Tuple patterns:</strong> Match tuple structures</li>
          <li><strong>Switch expressions:</strong> Concise switch statements</li>
        </ul>

        <h4>Expression-Bodied Members</h4>
        <p>Expression-bodied members allow you to write concise implementations for:</p>
        <ul>
          <li>Methods with simple logic</li>
          <li>Properties (get-only or computed)</li>
          <li>Constructors</li>
          <li>Finalizers</li>
          <li>Indexers</li>
        </ul>

        <h4>Benefits</h4>
        <p>These features provide:</p>
        <ul>
          <li>More readable and concise code</li>
          <li>Reduced boilerplate</li>
          <li>Better functional programming support</li>
          <li>Improved type safety</li>
        </ul>
        
        <div class="code-example">
          <pre><code>// Pattern matching examples
public class Shape { }
public class Circle : Shape { public double Radius { get; set; } }
public class Rectangle : Shape { public double Width { get; set; } public double Height { get; set; } }

public class PatternMatchingExample
{
    // Type pattern with property access
    public double GetArea(Shape shape) => shape switch
    {
        Circle c => Math.PI * c.Radius * c.Radius,
        Rectangle r => r.Width * r.Height,
        _ => throw new ArgumentException("Unknown shape")
    };
    
    // Property pattern
    public string GetStatus(Person person) => person switch
    {
        { Age: < 18 } => "Minor",
        { Age: >= 18 and < 65 } => "Adult",
        { Age: >= 65 } => "Senior",
        _ => "Unknown"
    };
    
    // Tuple pattern
    public string GetDirection(int x, int y) => (x, y) switch
    {
        (0, 0) => "Origin",
        (_, 0) => "On X-axis",
        (0, _) => "On Y-axis",
        (var a, var b) when a > 0 && b > 0 => "First quadrant",
        (var a, var b) when a < 0 && b > 0 => "Second quadrant",
        (var a, var b) when a < 0 && b < 0 => "Third quadrant",
        (var a, var b) when a > 0 && b < 0 => "Fourth quadrant",
        _ => "Unknown"
    };
    
    // Type pattern with when clause
    public string ProcessValue(object value) => value switch
    {
        int n when n > 0 => $"Positive integer: {n}",
        int n when n < 0 => $"Negative integer: {n}",
        int => "Zero",
        string s when s.Length > 10 => "Long string",
        string s => $"Short string: {s}",
        null => "Null value",
        _ => $"Other type: {value.GetType().Name}"
    };
}

// Expression-bodied members
public class ExpressionBodiedExample
{
    // Expression-bodied property
    public string FullName => $"{FirstName} {LastName}";
    
    // Expression-bodied method
    public int Add(int a, int b) => a + b;
    
    // Expression-bodied constructor
    public ExpressionBodiedExample(string name) => Name = name;
    
    // Expression-bodied property with backing field
    private string _name;
    public string Name
    {
        get => _name;
        set => _name = value ?? throw new ArgumentNullException(nameof(value));
    }
    
    // Expression-bodied indexer
    public int this[int index] => index * 2;
    
    // Expression-bodied finalizer
    ~ExpressionBodiedExample() => Console.WriteLine("Finalized");
}

// Combining pattern matching with expression-bodied members
public class ModernCSharpExample
{
    public string ProcessShape(Shape shape) => shape switch
    {
        Circle { Radius: > 0 } c => $"Circle with radius {c.Radius}",
        Rectangle { Width: > 0, Height: > 0 } r => $"Rectangle {r.Width}x{r.Height}",
        _ => "Invalid shape"
    };
    
    public bool IsValid(Person person) => person switch
    {
        { Name: not null, Age: >= 0 } => true,
        _ => false
    };
}

// Usage examples
var shapes = new Shape[] 
{
    new Circle { Radius = 5 },
    new Rectangle { Width = 3, Height = 4 }
};

var example = new PatternMatchingExample();
foreach (var shape in shapes)
{
    Console.WriteLine($"Area: {example.GetArea(shape)}");
}

var modernExample = new ModernCSharpExample();
Console.WriteLine(modernExample.ProcessShape(shapes[0]));
</code></pre>
        </div>
        
        <div class="interview-tip">
          <p><span class="interview-icon">🎯</span> <strong>Interview Focus:</strong> Understand modern C# features for cleaner code.</p>
          <p>Common questions: "What are the different pattern matching types?", "When would you use expression-bodied members?", "How do switch expressions differ from switch statements?"</p>
        </div>
      `,
          codeExample: `// Expression-bodied property
public string Name { get; } = "Alice";
public int Age => 30;`,
        },
      ],
      exercise: {
        instructions:
          'Write a method that uses a switch expression to return a string description for different enum values.',
      },
    },
  ],
  prepperSummary: `
    <div class="prepper-summary">
      <h3>🔑 Key Interview Takeaways</h3>
      <ul>
        <li><strong>Generics:</strong> Write reusable, type-safe code for collections and algorithms.</li>
        <li><strong>Extension Methods:</strong> Add functionality to existing types without inheritance.</li>
        <li><strong>Delegates & Lambdas:</strong> Use anonymous functions for flexible, concise code.</li>
        <li><strong>Events:</strong> Implement the observer pattern and decouple components.</li>
        <li><strong>LINQ:</strong> Query data in a readable, declarative way.</li>
        <li><strong>Async/Await:</strong> Write responsive, non-blocking code.</li>
        <li><strong>Attributes & Reflection:</strong> Add and inspect metadata at runtime.</li>
        <li><strong>Pattern Matching:</strong> Write concise, expressive code for type and value checks.</li>
      </ul>
      <h4>📝 Common Interview Questions</h4>
      <ol>
        <li>"What are the benefits of generics?"</li>
        <li>"How do extension methods work?"</li>
        <li>"What is the difference between a delegate and an event?"</li>
        <li>"How does async/await improve responsiveness?"</li>
        <li>"How do you use reflection to inspect attributes?"</li>
      </ol>
    </div>
  `,
  challenge: {
    description:
      'Build a mini task manager. Use generics for a TaskList<T>, extension methods for filtering tasks, events for notifying when a task is completed, and async/await for simulating task execution. Include LINQ queries to summarize tasks.',
    requirements: [
      'Generic TaskList<T> with Add/Remove/Find methods',
      'Extension method to filter completed tasks',
      'Event for task completion',
      'Async method to simulate task execution',
      'LINQ to summarize tasks (e.g., count by status)',
    ],
    starterCode: `// Mini Task Manager
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

public class TaskItem
{
    public string Name { get; set; }
    public bool IsCompleted { get; set; }
}

public class TaskList<T>
{
    private List<T> _items = new List<T>();
    public void Add(T item) => _items.Add(item);
    public void Remove(T item) => _items.Remove(item);
    public IEnumerable<T> Find(Func<T, bool> predicate) => _items.Where(predicate);
}

public static class TaskExtensions
{
    public static IEnumerable<TaskItem> Completed(this IEnumerable<TaskItem> tasks)
        => tasks.Where(t => t.IsCompleted);
}

public class TaskManager
{
    public event EventHandler<TaskItem> TaskCompleted;
    public async Task CompleteTaskAsync(TaskItem task)
    {
        await Task.Delay(500); // Simulate work
        task.IsCompleted = true;
        TaskCompleted?.Invoke(this, task);
    }
}

// Usage example
var tasks = new TaskList<TaskItem>();
tasks.Add(new TaskItem { Name = "Write report" });
tasks.Add(new TaskItem { Name = "Email client" });

var manager = new TaskManager();
manager.TaskCompleted += (s, t) => Console.WriteLine($"Task completed: {t.Name}");

await manager.CompleteTaskAsync(tasks.Find(t => t.Name == "Write report").First());
var completed = tasks.Find(t => t.IsCompleted);
Console.WriteLine($"Completed: {completed.Count()} tasks");
var summary = tasks.Find(_ => true).GroupBy(t => t.IsCompleted).Select(g => $"{g.Key}: {g.Count()} tasks");
foreach (var line in summary) Console.WriteLine(line);
`,
  },
}

export default advancedCSharpFeatures
