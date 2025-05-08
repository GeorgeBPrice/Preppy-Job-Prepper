// curriculum-section-csharp-shortlist.js - C# Minicourse with 20 Essential Concepts

const csharpShortlistReview = {
  title: 'Minicourse C# Recapper',
  description: '',
  lessons: [
    {
      title: '20 Essential C# Concepts',
      description:
        'A comprehensive review of the most critical C# concepts, covering language fundamentals, core programming patterns, application development, and configuration best practices.',
      sections: [
        {
          title: 'C# Language Fundamentals (3 Key Concepts)',
          explanation: `
        <p>These three fundamental concepts form the foundation of C# programming and are essential for understanding how the language works:</p>

        <h4>1. Type System and Language Basics</h4>
        <p>C# is a statically-typed, object-oriented language with several key features that differentiate it from other languages:</p>

        <p><strong>Type System:</strong> C# has a unified type system where all types, including primitives, inherit from System.Object.</p>
        <ul>
          <li><strong>Value Types:</strong> Stored on the stack (int, float, double, bool, struct, enum)</li>
          <li><strong>Reference Types:</strong> Stored on the heap (classes, interfaces, delegates, arrays, strings)</li>
          <li><strong>Nullable Types:</strong> Allow value types to represent null (int?, double?)</li>
          <li><strong>Type Inference:</strong> Use var keyword for implicit typing when the type is obvious</li>
          <li><strong>Boxing/Unboxing:</strong> Converting between value types and reference types</li>
        </ul>

        <p><strong>Language Syntax:</strong> C# syntax features that every developer must know:</p>
        <ul>
          <li>Statements end with semicolons</li>
          <li>Code blocks use curly braces</li>
          <li>Case sensitivity for all identifiers</li>
          <li>Strong typing with static type checking at compile time</li>
          <li>Namespace organization for code management</li>
        </ul>

        <p><strong>Using Directives:</strong> Import namespaces to use classes without fully qualifying their names:</p>
        <ul>
          <li>Standard namespaces (System, System.Collections.Generic, etc.)</li>
          <li>Global using directives (C# 10+) to avoid repetition</li>
          <li>Static using directives to import static members</li>
        </ul>
        
        <div class="code-example">
          <pre><code>// Basic C# Program Structure
using System;                        // Using directive to import namespace
using System.Collections.Generic;    // Using directive for collections
using static System.Math;            // Static using directive

namespace MyApplication
{
    class Program
    {
        static void Main(string[] args)
        {
            // Value types
            int number = 42;
            double pi = 3.14159;
            bool isActive = true;
            
            // Reference types
            string message = "Hello, C#!";
            List<int> numbers = new List<int> { 1, 2, 3, 4, 5 };
            
            // Type inference with var
            var inferredInt = 10;        // Compiler infers int
            var inferredString = "test"; // Compiler infers string
            
            // Nullable types
            int? nullableInt = null;
            
            // Boxing (value type to reference type)
            object boxedInt = number;
            
            // Unboxing (reference type to value type)
            int unboxedInt = (int)boxedInt;
            
            // Using Math functions via static using directive
            double squareRoot = Sqrt(16); // Instead of Math.Sqrt
            
            Console.WriteLine(message);
        }
    }
}</code></pre>
        </div>

        <h4>2. Object-Oriented Programming Features</h4>
        <p>C# provides robust support for OOP principles, making it ideal for building maintainable applications:</p>

        <p><strong>Classes and Objects:</strong> The building blocks of C# applications:</p>
        <ul>
          <li>Class definition with fields, properties, methods, and events</li>
          <li>Object instantiation with the new keyword</li>
          <li>Constructors for object initialization</li>
          <li>Object initializer syntax for concise instantiation</li>
          <li>Static vs. instance members</li>
        </ul>

        <p><strong>Inheritance and Polymorphism:</strong> Creating class hierarchies and behaviors:</p>
        <ul>
          <li>Inheritance with base and derived classes</li>
          <li>Abstract classes for partial implementation</li>
          <li>Sealed classes to prevent inheritance</li>
          <li>Method overriding with the virtual and override keywords</li>
          <li>Method hiding with the new keyword</li>
          <li>Polymorphism for dynamic method invocation</li>
        </ul>

        <p><strong>Interfaces and Composition:</strong> Building flexible, decoupled systems:</p>
        <ul>
          <li>Interface definition and implementation</li>
          <li>Implementing multiple interfaces</li>
          <li>Default interface methods (C# 8+)</li>
          <li>Composition over inheritance for code reuse</li>
          <li>Explicit interface implementation for resolving conflicts</li>
        </ul>
        
        <div class="code-example">
          <pre><code>// Classes and Inheritance
public class Person
{
    // Fields
    private int _id;
    
    // Properties
    public string FirstName { get; set; }
    public string LastName { get; set; }
    public DateTime BirthDate { get; private set; }
    
    // Full property with backing field
    public int Id
    {
        get { return _id; }
        set { _id = value; }
    }
    
    // Calculated property
    public int Age => DateTime.Today.Year - BirthDate.Year - 
        (DateTime.Today < BirthDate.AddYears(DateTime.Today.Year - BirthDate.Year) ? 1 : 0);
    
    // Constructors
    public Person() { } // Default constructor
    
    public Person(string firstName, string lastName, DateTime birthDate)
    {
        FirstName = firstName;
        LastName = lastName;
        BirthDate = birthDate;
    }
    
    // Methods
    public virtual string GetFullName()
    {
        return $"{FirstName} {LastName}";
    }
    
    // Static method
    public static Person CreateDefault()
    {
        return new Person("John", "Doe", new DateTime(1980, 1, 1));
    }
}

// Inheritance
public class Employee : Person
{
    public string Department { get; set; }
    public decimal Salary { get; set; }
    
    // Constructor calling base constructor
    public Employee(string firstName, string lastName, DateTime birthDate, 
                    string department, decimal salary)
        : base(firstName, lastName, birthDate)
    {
        Department = department;
        Salary = salary;
    }
    
    // Override method
    public override string GetFullName()
    {
        return $"{FirstName} {LastName}, {Department}";
    }
}

// Interfaces
public interface ILogger
{
    void LogInfo(string message);
    void LogError(string message);
    
    // Default interface method (C# 8+)
    void LogWarning(string message) => Console.WriteLine($"WARNING: {message}");
}

public interface IEmailSender
{
    void SendEmail(string to, string subject, string body);
}

// Implementing multiple interfaces
public class EmailLogger : ILogger, IEmailSender
{
    public void LogInfo(string message)
    {
        Console.WriteLine($"INFO: {message}");
    }
    
    public void LogError(string message)
    {
        Console.WriteLine($"ERROR: {message}");
        SendEmail("admin@example.com", "Error Occurred", message);
    }
    
    public void SendEmail(string to, string subject, string body)
    {
        // Implementation
        Console.WriteLine($"Email sent to {to}: {subject}");
    }
}</code></pre>
        </div>

        <h4>3. Advanced C# Language Features</h4>
        <p>Modern C# includes several advanced features that make the language more expressive and powerful:</p>

        <p><strong>Delegates and Events:</strong> For implementing callbacks and the observer pattern:</p>
        <ul>
          <li>Delegate declaration and instantiation</li>
          <li>Multicast delegates for multiple method subscribers</li>
          <li>Event declaration and subscription</li>
          <li>Anonymous methods and lambda expressions</li>
          <li>Action and Func delegate types</li>
        </ul>

        <p><strong>Generics:</strong> Creating reusable, type-safe code:</p>
        <ul>
          <li>Generic classes and methods</li>
          <li>Type constraints (where clauses)</li>
          <li>Generic collections (List<T>, Dictionary<TKey, TValue>, etc.)</li>
          <li>Generic interfaces and their implementation</li>
          <li>Covariance and contravariance</li>
        </ul>

        <p><strong>LINQ and Functional Programming:</strong> Querying and transforming data:</p>
        <ul>
          <li>Query syntax vs. method syntax</li>
          <li>Deferred execution and immediate execution</li>
          <li>Standard query operators (Where, Select, OrderBy, GroupBy, etc.)</li>
          <li>Lambda expressions for compact predicates</li>
          <li>Extension methods for adding functionality to existing types</li>
        </ul>
        
        <div class="code-example">
          <pre><code>// Delegates, Events, and Lambdas
// Delegate declaration
public delegate void MessageHandler(string message);

public class Messenger
{
    // Event declaration
    public event MessageHandler MessageReceived;
    
    // Method to raise the event
    public void ReceiveMessage(string message)
    {
        Console.WriteLine($"Message received: {message}");
        // Safely invoking the event
        MessageReceived?.Invoke(message);
    }
}

// Using the delegate and event
public void DelegatesExample()
{
    var messenger = new Messenger();
    
    // Subscribe to event with named method
    messenger.MessageReceived += HandleMessage;
    
    // Subscribe with anonymous method
    messenger.MessageReceived += delegate(string msg) 
    {
        Console.WriteLine($"Anonymous method: {msg}");
    };
    
    // Subscribe with lambda expression
    messenger.MessageReceived += (msg) => Console.WriteLine($"Lambda: {msg}");
    
    // Trigger the event
    messenger.ReceiveMessage("Hello, Events!");
}

public void HandleMessage(string message)
{
    Console.WriteLine($"Handled: {message}");
}

// Generics
public class Repository<T> where T : class, new()
{
    private List<T> _items = new List<T>();
    
    public void Add(T item)
    {
        _items.Add(item);
    }
    
    public IEnumerable<T> GetAll()
    {
        return _items;
    }
    
    public T GetById<TId>(TId id, Func<T, TId, bool> matcher)
    {
        return _items.FirstOrDefault(item => matcher(item, id));
    }
}

// LINQ
public void LinqExamples()
{
    List<int> numbers = new List<int> { 1, 2, 3, 4, 5, 6, 7, 8, 9, 10 };
    
    // Query syntax
    var evenNumbers = from num in numbers
                      where num % 2 == 0
                      orderby num descending
                      select num;
    
    // Method syntax with lambda
    var evenNumbersMethod = numbers.Where(n => n % 2 == 0)
                                  .OrderByDescending(n => n)
                                  .ToList();
    
    // Complex LINQ with multiple data sources
    var persons = new List<Person>
    {
        new Person("John", "Doe", new DateTime(1985, 3, 15)),
        new Person("Jane", "Smith", new DateTime(1990, 7, 22))
    };
    
    var employees = new List<Employee>
    {
        new Employee("John", "Doe", new DateTime(1985, 3, 15), "IT", 75000),
        new Employee("Alice", "Johnson", new DateTime(1982, 9, 8), "HR", 65000)
    };
    
    var personEmployeeJoin = from p in persons
                             join e in employees on p.GetFullName() equals e.GetFullName()
                             select new { Name = p.GetFullName(), Department = e.Department };
    
    // Extension method definition
    public static class StringExtensions
    {
        public static bool IsValidEmail(this string email)
        {
            // Simple validation
            return email != null && email.Contains("@") && email.Contains(".");
        }
    }
    
    // Using extension method
    string email = "user@example.com";
    bool isValid = email.IsValidEmail();
}</code></pre>
        </div>
        
        <div class="interview-tip">
          <p><span class="interview-icon">🎯</span> <strong>Interview Focus:</strong> For C# language fundamentals, be prepared to discuss value vs. reference types, inheritance mechanisms, and how generics work. Interviewers often ask about the differences between abstract classes and interfaces, or how events work under the hood in the .NET runtime.</p>
          <p>Common interview questions include:</p>
          <ul>
            <li>"What's the difference between value types and reference types in C#?"</li>
            <li>"Explain the difference between method overriding and method hiding"</li>
            <li>"How do delegates and events work in C#, and what are they used for?"</li>
            <li>"Explain deferred execution in LINQ and when it might cause unexpected results"</li>
            <li>"What are generic type constraints and why would you use them?"</li>
          </ul>
        </div>
      `,
          codeExample: `// A Comprehensive C# Class Library Demonstrating Fundamentals
using System;
using System.Collections.Generic;
using System.Linq;

namespace CSharpFundamentals
{
    // Base entity interface
    public interface IEntity
    {
        int Id { get; set; }
        DateTime CreatedDate { get; }
        bool IsValid();
    }

    // DTO interface for data transfer objects
    public interface IDto<T> where T : IEntity
    {
        T ToEntity();
        void UpdateFrom(T entity);
    }

    // Abstract base class implementing common entity behavior
    public abstract class EntityBase : IEntity
    {
        public int Id { get; set; }
        public DateTime CreatedDate { get; } = DateTime.Now;
        
        // Virtual method that derived classes can override
        public virtual bool IsValid()
        {
            return Id > 0;
        }
        
        // Abstract method that derived classes must implement
        public abstract string GetDisplayName();
        
        // This method can't be overridden by derived classes
        public sealed override string ToString()
        {
            return $"{GetType().Name}: {GetDisplayName()} (ID: {Id})";
        }
    }
    
    // A concrete entity class deriving from the base class
    public class Product : EntityBase
    {
        // Properties
        public string Name { get; set; }
        public decimal Price { get; set; }
        public int StockQuantity { get; set; }
        public bool IsAvailable => StockQuantity > 0;
        
        // Event for inventory changes
        public delegate void StockChangeHandler(int oldQuantity, int newQuantity);
        public event StockChangeHandler StockChanged;
        
        // Constructor
        public Product(string name, decimal price, int stockQuantity)
        {
            Name = name;
            Price = price;
            StockQuantity = stockQuantity;
        }
        
        // Implementing abstract method
        public override string GetDisplayName()
        {
            return $"{Name} (\${Price})";
        }
        
        // Overriding virtual method
        public override bool IsValid()
        {
            return base.IsValid() && !string.IsNullOrEmpty(Name) && Price >= 0;
        }
        
        // Method to update stock quantity
        public void UpdateStock(int newQuantity)
        {
            if (newQuantity < 0)
                throw new ArgumentException("Stock quantity cannot be negative");
                
            int oldQuantity = StockQuantity;
            StockQuantity = newQuantity;
            
            // Trigger the event
            StockChanged?.Invoke(oldQuantity, newQuantity);
        }
    }
    
    // Generic repository for entity management
    public class Repository<T> where T : IEntity
    {
        private readonly List<T> _entities = new List<T>();
        
        public void Add(T entity)
        {
            if (!entity.IsValid())
                throw new ArgumentException("Entity is not valid");
                
            _entities.Add(entity);
        }
        
        public void Remove(T entity)
        {
            _entities.Remove(entity);
        }
        
        public T GetById(int id)
        {
            return _entities.FirstOrDefault(e => e.Id == id);
        }
        
        public IEnumerable<T> GetAll(Func<T, bool> predicate = null)
        {
            return predicate == null ? _entities : _entities.Where(predicate);
        }
    }
    
    // A DTO implementation for the Product entity
    public class ProductDto : IDto<Product>
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public decimal Price { get; set; }
        public int AvailableStock { get; set; }
        
        public Product ToEntity()
        {
            var product = new Product(Name, Price, AvailableStock)
            {
                Id = this.Id
            };
            return product;
        }
        
        public void UpdateFrom(Product entity)
        {
            Id = entity.Id;
            Name = entity.Name;
            Price = entity.Price;
            AvailableStock = entity.StockQuantity;
        }
    }
    
    // Usage example
    public class Program
    {
        public static void Main()
        {
            // Create a product repository
            var productRepo = new Repository<Product>();
            
            // Create and add products
            var laptop = new Product("Laptop", 999.99m, 10) { Id = 1 };
            var phone = new Product("Smartphone", 499.99m, 20) { Id = 2 };
            
            // Subscribe to stock change event
            laptop.StockChanged += (oldQty, newQty) => 
            {
                Console.WriteLine($"Stock changed from {oldQty} to {newQty}");
                if (newQty < 5)
                    Console.WriteLine("Low stock alert!");
            };
            
            productRepo.Add(laptop);
            productRepo.Add(phone);
            
            // LINQ query to find expensive products
            var expensiveProducts = productRepo.GetAll(p => p.Price > 500)
                                             .OrderByDescending(p => p.Price)
                                             .ToList();
            
            foreach (var product in expensiveProducts)
            {
                Console.WriteLine(product.ToString());
            }
            
            // Update stock quantity to trigger event
            laptop.UpdateStock(3);
            
            // Create DTO from entity
            var laptopDto = new ProductDto();
            laptopDto.UpdateFrom(laptop);
            
            Console.WriteLine($"DTO: {laptopDto.Name}, Price: \${laptopDto.Price}, Stock: {laptopDto.AvailableStock}");
        }
    }
}`,
          exercise: {
            instructions:
              'Create a simple C# class library for a banking system that demonstrates OOP principles, delegates, generics, and LINQ. Implement: (1) An abstract Account class with derived CheckingAccount and SavingsAccount classes, (2) An interface for transaction processing, (3) A delegate and event for balance changes, (4) A generic repository for accounts, and (5) LINQ queries to find accounts meeting specific criteria.',
          },
        },
        {
          title: 'C# Core Programming Patterns (5 Key Concepts)',
          explanation: `
        <p>These five patterns represent the core programming approaches that every C# developer should master for building robust applications:</p>

        <h4>4. Asynchronous Programming</h4>
        <p>Modern C# applications rely heavily on asynchronous programming for responsiveness and scalability:</p>

        <p><strong>Task-based Asynchronous Pattern (TAP):</strong> The standard approach to async programming in C#:</p>
        <ul>
          <li>async and await keywords for asynchronous operations</li>
          <li>Task and Task<T> for representing asynchronous operations</li>
          <li>Task.Run for CPU-bound work</li>
          <li>ConfigureAwait for context control</li>
          <li>Task.WhenAll and Task.WhenAny for parallel operations</li>
        </ul>

        <p><strong>Exception Handling in Async Code:</strong> Special considerations for async exceptions:</p>
        <ul>
          <li>Try/catch blocks in async methods</li>
          <li>Task.Exception property and AggregateException</li>
          <li>Exception propagation in async methods</li>
          <li>Using await in catch blocks (C# 6+)</li>
        </ul>

        <p><strong>Cancellation:</strong> Managing cancellable operations:</p>
        <ul>
          <li>CancellationTokenSource and CancellationToken</li>
          <li>Passing tokens to async methods</li>
          <li>Checking for cancellation with ThrowIfCancellationRequested</li>
          <li>Registering cleanup actions with token.Register</li>
        </ul>
        
        <div class="code-example">
          <pre><code>// Asynchronous Programming
// Basic async/await pattern
public async Task<string> DownloadDataAsync(string url)
{
    // Create HttpClient (ideally should be reused rather than created per request)
    using (var client = new HttpClient())
    {
        // The await keyword allows the method to return to the caller
        // and resume execution when the HTTP request completes
        var response = await client.GetAsync(url);
        
        // Throw an exception if not successful
        response.EnsureSuccessStatusCode();
        
        // Another await to get the content
        return await response.Content.ReadAsStringAsync();
    }
}

// Handling multiple async operations in parallel
public async Task<List<Product>> GetMultipleProductsAsync(List<int> productIds)
{
    // Create a list to hold all the tasks
    var tasks = new List<Task<Product>>();
    
    foreach (var id in productIds)
    {
        // Start all requests without awaiting them immediately
        tasks.Add(GetProductAsync(id));
    }
    
    // Wait for all tasks to complete and get results
    var products = await Task.WhenAll(tasks);
    
    // Convert array to list and return
    return products.ToList();
}

// Using async with LINQ (careful with execution order)
public async Task<List<Product>> GetAvailableProductsAsync(List<int> productIds)
{
    // Start all tasks and filter with LINQ afterward
    var productTasks = productIds.Select(id => GetProductAsync(id));
    var products = await Task.WhenAll(productTasks);
    
    // Filter the results after they're all complete
    return products.Where(p => p.IsAvailable).ToList();
}

// Cancellation support in async methods
public async Task ProcessLargeFileAsync(string filePath, CancellationToken cancellationToken)
{
    // Check for cancellation before starting
    cancellationToken.ThrowIfCancellationRequested();
    
    try
    {
        using (var stream = new FileStream(filePath, FileMode.Open))
        using (var reader = new StreamReader(stream))
        {
            string line;
            while ((line = await reader.ReadLineAsync()) != null)
            {
                // Process each line
                await ProcessLineAsync(line);
                
                // Periodically check for cancellation
                cancellationToken.ThrowIfCancellationRequested();
            }
        }
    }
    catch (OperationCanceledException)
    {
        // Handle cancellation gracefully
        Console.WriteLine("Operation was canceled");
        throw;
    }
}

// Example of using async with exception handling
public async Task<Result> TryOperationWithRetryAsync()
{
    int retryCount = 3;
    int delay = 1000; // Start with 1 second delay
    
    for (int i = 0; i < retryCount; i++)
    {
        try
        {
            // Try the operation
            return await PerformOperationAsync();
        }
        catch (HttpRequestException ex)
        {
            // Only retry on certain exceptions
            if (i == retryCount - 1 || !IsTransientError(ex))
            {
                // Don't retry anymore, rethrow
                throw;
            }
            
            // Exponential backoff
            await Task.Delay(delay);
            delay *= 2; // Double the delay for next retry
        }
    }
    
    // Should never reach here due to throw above, but compiler doesn't know that
    throw new InvalidOperationException("Unexpected code path");
}</code></pre>
        </div>

        <h4>5. Exception Handling and Debugging</h4>
        <p>Proper exception handling is crucial for building robust applications and diagnosing issues:</p>

        <p><strong>Exception Types and Hierarchies:</strong> Understanding the exception model:</p>
        <ul>
          <li>System.Exception as the base class</li>
          <li>Checked vs. unchecked exceptions (unlike Java, C# doesn't enforce checked exceptions)</li>
          <li>Common exception types (ArgumentException, NullReferenceException, etc.)</li>
          <li>Creating custom exception classes</li>
        </ul>

        <p><strong>Exception Handling Strategies:</strong> Best practices for handling exceptions:</p>
        <ul>
          <li>Try/catch/finally blocks</li>
          <li>Exception filters (when clause in C# 6+)</li>
          <li>Using multiple catch blocks for different exception types</li>
          <li>Rethrowing exceptions properly (throw vs. throw ex)</li>
          <li>Using IDisposable and using blocks for resource cleanup</li>
        </ul>

        <p><strong>Debugging Techniques:</strong> Tools and approaches for finding and fixing bugs:</p>
        <ul>
          <li>Debug vs. Release configuration</li>
          <li>Breakpoints and watch windows</li>
          <li>Conditional compilation with #if DEBUG</li>
          <li>Diagnostic tools (Debug and Trace classes)</li>
          <li>Logging frameworks integration</li>
        </ul>
        
        <div class="code-example">
          <pre><code>// Exception Handling and Debugging
// Custom exception
public class ProductNotFoundException : Exception
{
    public int ProductId { get; }
    
    public ProductNotFoundException(int productId)
        : base($"Product with ID {productId} was not found")
    {
        ProductId = productId;
    }
    
    public ProductNotFoundException(int productId, Exception innerException)
        : base($"Product with ID {productId} was not found", innerException)
    {
        ProductId = productId;
    }
}

// Basic exception handling
public Product GetProduct(int id)
{
    try
    {
        // Attempt to get the product
        var product = _repository.GetById(id);
        
        if (product == null)
        {
            throw new ProductNotFoundException(id);
        }
        
        return product;
    }
    catch (ProductNotFoundException ex)
    {
        // Log the specific exception
        _logger.LogWarning(ex, "Product retrieval failed");
        throw; // Rethrow to preserve stack trace
    }
    catch (Exception ex) when (IsTransientError(ex))
    {
        // Use exception filter (C# 6+) for conditional catch
        _logger.LogError(ex, "Transient error occurred");
        
        // Return a default product as fallback
        return new Product("Unavailable", 0, 0) { Id = id };
    }
    catch (Exception ex)
    {
        // Handle any other exception
        _logger.LogError(ex, "Unexpected error getting product {ProductId}", id);
        throw; // Rethrow
    }
    finally
    {
        // Always runs, even if there's an exception
        _metrics.IncrementProductRequests();
    }
}

// Using IDisposable with using statement
public void SaveProductImage(Product product, Stream imageStream)
{
    // using statement ensures Dispose() is called even if an exception occurs
    using (var fileStream = new FileStream($"images/{product.Id}.jpg", FileMode.Create))
    {
        imageStream.CopyTo(fileStream);
    } // fileStream.Dispose() is automatically called here
    
    // C# 8 using declaration (no braces needed)
    using var connection = new SqlConnection(_connectionString);
    connection.Open();
    
    // Code here...
    
} // connection.Dispose() is called at the end of the method

// Debugging helpers
public void ProcessOrder(Order order)
{
    #if DEBUG
    // This code only compiles in Debug configuration
    Console.WriteLine($"Processing order {order.Id} in debug mode");
    System.Diagnostics.Debug.WriteLine($"Order details: {order}");
    #endif
    
    try
    {
        // Normal processing code...
        
        // Add trace information in all builds
        System.Diagnostics.Trace.TraceInformation($"Order {order.Id} processed successfully");
    }
    catch (Exception ex)
    {
        System.Diagnostics.Debug.Assert(false, $"Error in ProcessOrder: {ex.Message}");
        throw;
    }
}

// Using conditional attributes for debug methods
[System.Diagnostics.Conditional("DEBUG")]
private void ValidateInternalState()
{
    // This method will only be called in Debug builds
    if (_repository == null)
        throw new InvalidOperationException("Repository is null");
        
    // Other validation...
}</code></pre>
        </div>

        <h4>6. File I/O and Serialization</h4>
        <p>C# provides robust tools for handling file operations and serializing data to various formats:</p>

        <p><strong>File and Directory Operations:</strong> Working with the file system:</p>
        <ul>
          <li>File and Directory classes for CRUD operations</li>
          <li>Path class for safe path manipulation</li>
          <li>FileInfo and DirectoryInfo for object-oriented approach</li>
          <li>File permissions and security considerations</li>
        </ul>

        <p><strong>Stream-based I/O:</strong> Working with different data streams:</p>
        <ul>
          <li>Stream as the base class for all streams</li>
          <li>FileStream, MemoryStream, NetworkStream</li>
          <li>StreamReader and StreamWriter for text</li>
          <li>BinaryReader and BinaryWriter for binary data</li>
          <li>Async I/O operations with streams</li>
        </ul>

        <p><strong>Serialization and Deserialization:</strong> Converting objects to storable/transmittable formats:</p>
        <ul>
          <li>JSON serialization with System.Text.Json or Newtonsoft.Json</li>
          <li>XML serialization with XmlSerializer</li>
          <li>Binary serialization with BinaryFormatter (deprecated in newer versions)</li>
          <li>Custom serialization with ISerializable</li>
          <li>Data Contract serialization for WCF services</li>
        </ul>
        
        <div class="code-example">
          <pre><code>// File I/O and Serialization
// Basic file operations
public class FileManager
{
    // Writing text to a file
    public void WriteTextFile(string filePath, string content)
    {
        // File.WriteAllText overwrites existing content
        File.WriteAllText(filePath, content);
    }
    
    // Appending text to a file
    public void AppendTextFile(string filePath, string content)
    {
        File.AppendAllText(filePath, content);
    }
    
    // Reading text from a file
    public string ReadTextFile(string filePath)
    {
        // Check if file exists first
        if (!File.Exists(filePath))
        {
            throw new FileNotFoundException("The specified file was not found.", filePath);
        }
        
        return File.ReadAllText(filePath);
    }
    
    // Reading file line by line
    public IEnumerable<string> ReadFileLines(string filePath)
    {
        return File.ReadLines(filePath); // Lazy loading
    }
    
    // Reading file line by line (all at once)
    public string[] ReadAllFileLines(string filePath)
    {
        return File.ReadAllLines(filePath); // Loads all into memory
    }
    
    // Copy file with overwrite protection
    public void CopyFile(string sourcePath, string destinationPath, bool overwrite = false)
    {
        File.Copy(sourcePath, destinationPath, overwrite);
    }
    
    // Async file read
    public async Task<string> ReadTextFileAsync(string filePath)
    {
        using (var reader = new StreamReader(filePath))
        {
            return await reader.ReadToEndAsync();
        }
    }
    
    // Create directory if it doesn't exist
    public void EnsureDirectoryExists(string directoryPath)
    {
        if (!Directory.Exists(directoryPath))
        {
            Directory.CreateDirectory(directoryPath);
        }
    }
    
    // List all files in a directory with specific extension
    public IEnumerable<string> GetFilesWithExtension(string directoryPath, string extension)
    {
        return Directory
            .GetFiles(directoryPath, $"*.{extension.TrimStart('.')}")
            .Select(Path.GetFileName);
    }
    
    // Safely combine paths
    public string CombinePaths(params string[] paths)
    {
        return Path.Combine(paths);
    }
    
    // Get file info
    public FileInfo GetFileInfo(string filePath)
    {
        var fileInfo = new FileInfo(filePath);
        return fileInfo;
    }
}

// JSON Serialization with System.Text.Json
public class JsonHelper
{
    private static JsonSerializerOptions _options = new JsonSerializerOptions
    {
        WriteIndented = true,
        PropertyNamingPolicy = JsonNamingPolicy.CamelCase
    };
    
    public static string Serialize<T>(T obj)
    {
        return JsonSerializer.Serialize(obj, _options);
    }
    
    public static T Deserialize<T>(string json)
    {
        return JsonSerializer.Deserialize<T>(json, _options);
    }
    
    public static async Task SerializeToFileAsync<T>(T obj, string filePath)
    {
        using (var stream = File.Create(filePath))
        {
            await JsonSerializer.SerializeAsync(stream, obj, _options);
        }
    }
    
    public static async Task<T> DeserializeFromFileAsync<T>(string filePath)
    {
        using (var stream = File.OpenRead(filePath))
        {
            return await JsonSerializer.DeserializeAsync<T>(stream, _options);
        }
    }
}

// XML Serialization example
public class XmlHelper
{
    public static string Serialize<T>(T obj)
    {
        var serializer = new XmlSerializer(typeof(T));
        using (var writer = new StringWriter())
        {
            serializer.Serialize(writer, obj);
            return writer.ToString();
        }
    }
    
    public static T Deserialize<T>(string xml)
    {
        var serializer = new XmlSerializer(typeof(T));
        using (var reader = new StringReader(xml))
        {
            return (T)serializer.Deserialize(reader);
        }
    }
    
    public static void SerializeToFile<T>(T obj, string filePath)
    {
        var serializer = new XmlSerializer(typeof(T));
        using (var writer = new StreamWriter(filePath))
        {
            serializer.Serialize(writer, obj);
        }
    }
    
    public static T DeserializeFromFile<T>(string filePath)
    {
        var serializer = new XmlSerializer(typeof(T));
        using (var reader = new StreamReader(filePath))
        {
            return (T)serializer.Deserialize(reader);
        }
    }
}</code></pre>
        </div>

        <h4>7. Collections and Data Structures</h4>
        <p>C# provides a rich set of collection types to represent groups of data efficiently:</p>

        <p><strong>Collection Interfaces:</strong> Understanding the collection hierarchy:</p>
        <ul>
          <li>IEnumerable<T> for iteration</li>
          <li>ICollection<T> for size, reading, and modification</li>
          <li>IList<T> for indexed collections</li>
          <li>IDictionary<TKey, TValue> for key-value collections</li>
          <li>IReadOnlyCollection<T> and IReadOnlyList<T> for immutable view</li>
        </ul>

        <p><strong>Common Collection Types:</strong> Essential collections for different scenarios:</p>
        <ul>
          <li>List<T> for dynamic arrays</li>
          <li>Dictionary<TKey, TValue> for key-value lookups</li>
          <li>HashSet<T> for unique collections</li>
          <li>Queue<T> and Stack<T> for FIFO/LIFO scenarios</li>
          <li>LinkedList<T> for efficient insertion/removal</li>
          <li>SortedDictionary<TKey, TValue> and SortedList<TKey, TValue> for sorted collections</li>
          <li>ConcurrentDictionary<TKey, TValue> and other concurrent collections</li>
        </ul>

        <p><strong>Collection Operations:</strong> Common algorithms and patterns:</p>
        <ul>
          <li>Filtering, mapping, and reducing with LINQ</li>
          <li>Sorting with OrderBy, OrderByDescending, etc.</li>
          <li>Grouping with GroupBy</li>
          <li>Set operations (Union, Intersect, Except)</li>
          <li>Performance considerations for different operations</li>
        </ul>
        
        <div class="code-example">
          <pre><code>// Collections and Data Structures
public class CollectionsExample
{
    public void ListExamples()
    {
        // Creating and initializing a List
        List<string> names = new List<string> { "Alice", "Bob", "Charlie" };
        
        // Adding elements
        names.Add("Dave");
        names.AddRange(new[] { "Eve", "Frank" });
        names.Insert(2, "Grace"); // Insert at index 2
        
        // Accessing elements
        string first = names[0]; // Alice
        string last = names[names.Count - 1]; // Frank
        
        // Checking existence
        bool containsBob = names.Contains("Bob"); // true
        
        // Finding elements
        int index = names.IndexOf("Charlie");
        string found = names.Find(n => n.StartsWith("D")); // Dave
        
        // Removing elements
        names.Remove("Bob");
        names.RemoveAt(0); // Removes first element
        names.RemoveAll(n => n.Length < 4); // Removes names shorter than 4 chars
        
        // Sorting
        names.Sort();
        
        // Conversion
        string[] nameArray = names.ToArray();
    }
    
    public void DictionaryExamples()
    {
        // Creating a Dictionary
        Dictionary<string, int> ages = new Dictionary<string, int>
        {
            ["Alice"] = 30,
            ["Bob"] = 25,
            ["Charlie"] = 35
        };
        
        // Alternative initialization
        Dictionary<string, int> scores = new Dictionary<string, int>
        {
            { "Alice", 95 },
            { "Bob", 87 },
            { "Charlie", 92 }
        };
        
        // Adding entries
        ages.Add("Dave", 40);
        ages["Eve"] = 28; // Add or update
        
        // Checking keys
        bool containsKey = ages.ContainsKey("Bob"); // true
        
        // Safe access with TryGetValue
        if (ages.TryGetValue("Frank", out int frankAge))
        {
            Console.WriteLine($"Frank's age: {frankAge}");
        }
        else
        {
            Console.WriteLine("Frank not found");
        }
        
        // Iterating over a dictionary
        foreach (var pair in ages)
        {
            Console.WriteLine($"{pair.Key}: {pair.Value}");
        }
        
        // Accessing just keys or values
        foreach (string name in ages.Keys) { }
        foreach (int age in ages.Values) { }
    }
    
    public void SetExamples()
    {
        // Creating a HashSet
        HashSet<string> fruits = new HashSet<string> { "Apple", "Banana", "Cherry" };
        
        // Adding elements (duplicates are ignored)
        fruits.Add("Apple"); // Will not add duplicate
        fruits.Add("Orange");
        
        // Checking existence
        bool hasApple = fruits.Contains("Apple"); // true
        
        // Set operations
        HashSet<string> moreFruits = new HashSet<string> { "Cherry", "Durian", "Elderberry" };
        
        // Create a new set with elements from both sets
        HashSet<string> allFruits = new HashSet<string>(fruits);
        allFruits.UnionWith(moreFruits);
        
        // Create a new set with only common elements
        HashSet<string> commonFruits = new HashSet<string>(fruits);
        commonFruits.IntersectWith(moreFruits);
        
        // Create a new set with elements only in the first set
        HashSet<string> uniqueFruits = new HashSet<string>(fruits);
        uniqueFruits.ExceptWith(moreFruits);
        
        // Check if set is a subset/superset of another
        bool isSubset = fruits.IsSubsetOf(allFruits); // true
    }
    
    public void StackAndQueueExamples()
    {
        // Stack (LIFO - Last In, First Out)
        Stack<string> stack = new Stack<string>();
        stack.Push("First");
        stack.Push("Second");
        stack.Push("Third");
        
        string top = stack.Peek(); // "Third" (peek without removing)
        string popped = stack.Pop(); // "Third" (remove and return)
        
        // Queue (FIFO - First In, First Out)
        Queue<string> queue = new Queue<string>();
        queue.Enqueue("First");
        queue.Enqueue("Second");
        queue.Enqueue("Third");
        
        string front = queue.Peek(); // "First" (peek without removing)
        string dequeued = queue.Dequeue(); // "First" (remove and return)
    }
    
    public void SpecializedCollectionsExamples()
    {
        // Linked List
        LinkedList<string> linkedList = new LinkedList<string>();
        linkedList.AddLast("End");
        linkedList.AddFirst("Start");
        var node = linkedList.Find("End");
        linkedList.AddBefore(node, "Middle");
        
        // Sorted Collections
        SortedDictionary<string, int> sortedDict = new SortedDictionary<string, int>
        {
            ["Charlie"] = 35,
            ["Alice"] = 30,
            ["Bob"] = 25
        };
        // Keys will be iterated in sorted order: Alice, Bob, Charlie
        
        // Concurrent Collections for thread safety
        ConcurrentDictionary<string, int> concurrentDict = new ConcurrentDictionary<string, int>();
        concurrentDict.TryAdd("item", 1);
        
        // Atomic operations
        concurrentDict.AddOrUpdate(
            "counter", 
            key => 1, // Add function if key doesn't exist
            (key, oldValue) => oldValue + 1 // Update function if key exists
        );
    }
    
    public void ImmutableCollectionsExamples()
    {
        // Requires System.Collections.Immutable NuGet package
        
        // Creating immutable collections
        ImmutableList<int> immutableList = ImmutableList.Create<int>(1, 2, 3);
        
        // All operations return a new collection and don't modify the original
        ImmutableList<int> newList = immutableList.Add(4);
        
        // The original remains unchanged
        Console.WriteLine(immutableList.Count); // 3
        Console.WriteLine(newList.Count); // 4
        
        // Builder pattern for multiple operations
        var builder = immutableList.ToBuilder();
        builder.Add(4);
        builder.Add(5);
        ImmutableList<int> updatedList = builder.ToImmutable();
    }
}</code></pre>
        </div>

        <h4>8. Reflection and Attributes</h4>
        <p>C# provides powerful tools for inspecting and manipulating code at runtime through reflection and metadata:</p>

        <p><strong>Reflection Basics:</strong> Inspecting code at runtime:</p>
        <ul>
          <li>Type, MethodInfo, PropertyInfo, and other reflection classes</li>
          <li>Getting type information with typeof and GetType()</li>
          <li>Loading assemblies dynamically</li>
          <li>Creating instances and invoking methods dynamically</li>
          <li>Performance considerations with reflection</li>
        </ul>

        <p><strong>Attributes:</strong> Adding metadata to code elements:</p>
        <ul>
          <li>Creating custom attributes</li>
          <li>Common built-in attributes (Obsolete, Serializable, etc.)</li>
          <li>Attribute targets (Assembly, Class, Method, Property, etc.)</li>
          <li>Reading attributes at runtime</li>
          <li>Using attributes for AOP-like patterns</li>
        </ul>

        <p><strong>Expression Trees:</strong> Code as data structures:</p>
        <ul>
          <li>Building and compiling expressions at runtime</li>
          <li>Converting lambda expressions to expression trees</li>
          <li>Using expressions for dynamic queries</li>
          <li>Applications in ORMs and LINQ providers</li>
        </ul>
        
        <div class="code-example">
          <pre><code>// Reflection and Attributes
// Custom attribute
[AttributeUsage(AttributeTargets.Class | AttributeTargets.Method, 
                AllowMultiple = false, Inherited = true)]
public class AuditableAttribute : Attribute
{
    public string Owner { get; }
    public DateTime LastReviewed { get; }
    
    public AuditableAttribute(string owner, string lastReviewed)
    {
        Owner = owner;
        LastReviewed = DateTime.Parse(lastReviewed);
    }
}

// Required attribute for properties (C# 11+)
public class User
{
    public required string Username { get; set; }
    public required string Email { get; set; }
}

// Using attributes
[Auditable("John Doe", "2023-01-15")]
[Serializable]
public class ProductService
{
    [Obsolete("Use GetProductAsync instead")]
    public Product GetProduct(int id)
    {
        // Old implementation
        return new Product("Legacy", 0, 0);
    }
    
    [Auditable("Jane Smith", "2023-03-20")]
    public async Task<Product> GetProductAsync(int id)
    {
        // New implementation
        return await Task.FromResult(new Product("New", 0, 0));
    }
}

// Reflection examples
public class ReflectionExamples
{
    public void BasicReflection()
    {
        // Get type information
        Type productType = typeof(Product);
        
        // Or from an instance
        Product product = new Product("Test", 10, 5);
        Type productType2 = product.GetType();
        
        // Get information about type
        string typeName = productType.Name; // "Product"
        string fullName = productType.FullName; // "Namespace.Product"
        bool isClass = productType.IsClass; // true
        
        // Get properties
        PropertyInfo[] properties = productType.GetProperties();
        foreach (var prop in properties)
        {
            Console.WriteLine($"Property: {prop.Name}, Type: {prop.PropertyType.Name}");
        }
        
        // Get methods
        MethodInfo[] methods = productType.GetMethods();
        foreach (var method in methods)
        {
            Console.WriteLine($"Method: {method.Name}");
        }
        
        // Get specific method
        MethodInfo getDisplayMethod = productType.GetMethod("GetDisplayName");
        
        // Getting attribute information
        var attributes = productType.GetCustomAttributes(typeof(AuditableAttribute), true);
        if (attributes.Length > 0)
        {
            var audit = (AuditableAttribute)attributes[0];
            Console.WriteLine($"Audited by {audit.Owner} on {audit.LastReviewed}");
        }
    }
    
    public void DynamicObjectCreation()
    {
        // Create an instance dynamically
        Type productType = typeof(Product);
        
        // Using Activator (requires public constructor)
        Product product1 = (Product)Activator.CreateInstance(
            productType, 
            new object[] { "Dynamic", 20, 10 }
        );
        
        // Get and invoke method
        MethodInfo displayMethod = productType.GetMethod("GetDisplayName");
        string result = (string)displayMethod.Invoke(product1, null);
        
        // Get and set property
        PropertyInfo priceProperty = productType.GetProperty("Price");
        priceProperty.SetValue(product1, 25.99m);
        decimal price = (decimal)priceProperty.GetValue(product1);
    }
    
    public void ExpressionTrees()
    {
        // Expression tree for simple lambda x => x > 5
        Expression<Func<int, bool>> expr = x => x > 5;
        
        // Compile and use the expression
        Func<int, bool> func = expr.Compile();
        bool result = func(10); // true
        
        // Create expression tree programmatically
        ParameterExpression param = Expression.Parameter(typeof(int), "x");
        ConstantExpression constant = Expression.Constant(5, typeof(int));
        BinaryExpression operation = Expression.GreaterThan(param, constant);
        
        var lambda = Expression.Lambda<Func<int, bool>>(operation, param);
        var compiled = lambda.Compile();
        
        bool result2 = compiled(10); // true
    }
    
    // Dynamic invocation with performance optimization
    private static Dictionary<string, MethodInfo> _methodCache = new Dictionary<string, MethodInfo>();
    
    public object InvokeMethodOptimized(object target, string methodName, params object[] parameters)
    {
        Type type = target.GetType();
        string cacheKey = $"{type.FullName}.{methodName}";
        
        // Try to get from cache first
        if (!_methodCache.TryGetValue(cacheKey, out MethodInfo method))
        {
            // Not in cache, look it up
            method = type.GetMethod(methodName);
            if (method == null)
            {
                throw new MissingMethodException(type.FullName, methodName);
            }
            
            // Add to cache for future use
            _methodCache[cacheKey] = method;
        }
        
        // Invoke the method
        return method.Invoke(target, parameters);
    }
}</code></pre>
        </div>
        
        <div class="interview-tip">
          <p><span class="interview-icon">🎯</span> <strong>Interview Focus:</strong> For programming patterns, expect questions about asynchronous patterns, error handling strategies, and when to use specific collection types. Interviewers often ask about the performance implications of different approaches.</p>
          <p>Common interview questions include:</p>
          <ul>
            <li>"What's the difference between async/await and Task.Run?"</li>
            <li>"How would you handle exceptions in asynchronous methods?"</li>
            <li>"When would you use a Dictionary vs. a ConcurrentDictionary?"</li>
            <li>"Explain the IDisposable pattern and how the 'using' statement works"</li>
            <li>"How would you use attributes and reflection to implement a simple validation framework?"</li>
          </ul>
        </div>
      `,
          codeExample: `// Advanced C# Programming Patterns Demo
using System;
using System.Collections.Concurrent;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text.Json;
using System.Threading;
using System.Threading.Tasks;

namespace CSharpAdvancedPatterns
{
    // Custom attribute for configuration parameters
    [AttributeUsage(AttributeTargets.Property)]
    public class ConfigParamAttribute : Attribute
    {
        public string Section { get; }
        public string Key { get; }
        public bool Required { get; }

        public ConfigParamAttribute(string section, string key, bool required = false)
        {
            Section = section;
            Key = key;
            Required = required;
        }
    }

    // Configuration class that will be populated using reflection
    public class AppConfig
    {
        [ConfigParam("Database", "ConnectionString", true)]
        public string DbConnectionString { get; set; }

        [ConfigParam("Api", "BaseUrl")]
        public string ApiBaseUrl { get; set; } = "https://api.default.com"; // Default value

        [ConfigParam("Cache", "TimeoutMinutes")]
        public int CacheTimeoutMinutes { get; set; } = 10; // Default value

        [ConfigParam("Logging", "Enabled")]
        public bool LoggingEnabled { get; set; } = true; // Default value
    }

    // Service for async repository operations
    public interface IDataRepository<T> where T : class
    {
        Task<T> GetByIdAsync(int id, CancellationToken cancellationToken = default);
        Task<IEnumerable<T>> GetAllAsync(CancellationToken cancellationToken = default);
        Task<int> AddAsync(T entity, CancellationToken cancellationToken = default);
        Task UpdateAsync(T entity, CancellationToken cancellationToken = default);
        Task DeleteAsync(int id, CancellationToken cancellationToken = default);
    }

    // Product entity
    public class Product
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public decimal Price { get; set; }
        public bool IsAvailable { get; set; }
    }

    // Implementation of the repository interface
    public class ProductRepository : IDataRepository<Product>, IDisposable
    {
        private readonly ConcurrentDictionary<int, Product> _products = new ConcurrentDictionary<int, Product>();
        private bool _disposed = false;
        private int _nextId = 1;

        // Simulates database latency
        private async Task SimulateLatencyAsync()
        {
            await Task.Delay(200); // 200ms latency
        }

        public async Task<Product> GetByIdAsync(int id, CancellationToken cancellationToken = default)
        {
            // Check cancellation before operation
            cancellationToken.ThrowIfCancellationRequested();

            await SimulateLatencyAsync();

            _products.TryGetValue(id, out var product);
            return product;
        }

        public async Task<IEnumerable<Product>> GetAllAsync(CancellationToken cancellationToken = default)
        {
            cancellationToken.ThrowIfCancellationRequested();
            await SimulateLatencyAsync();
            return _products.Values.ToList();
        }

        public async Task<int> AddAsync(Product entity, CancellationToken cancellationToken = default)
        {
            cancellationToken.ThrowIfCancellationRequested();
            await SimulateLatencyAsync();

            // Validation
            if (string.IsNullOrEmpty(entity.Name))
                throw new ArgumentException("Product name cannot be empty", nameof(entity));

            if (entity.Price < 0)
                throw new ArgumentException("Product price cannot be negative", nameof(entity));

            // Assign ID and add to dictionary
            entity.Id = Interlocked.Increment(ref _nextId) - 1;
            _products[entity.Id] = entity;
            return entity.Id;
        }

        public async Task UpdateAsync(Product entity, CancellationToken cancellationToken = default)
        {
            cancellationToken.ThrowIfCancellationRequested();
            await SimulateLatencyAsync();

            // Validation
            if (entity.Id <= 0)
                throw new ArgumentException("Invalid product ID", nameof(entity));

            if (string.IsNullOrEmpty(entity.Name))
                throw new ArgumentException("Product name cannot be empty", nameof(entity));

            if (entity.Price < 0)
                throw new ArgumentException("Product price cannot be negative", nameof(entity));

            // Update if exists
            if (!_products.ContainsKey(entity.Id))
                throw new KeyNotFoundException($"Product with ID {entity.Id} not found");

            _products[entity.Id] = entity;
        }

        public async Task DeleteAsync(int id, CancellationToken cancellationToken = default)
        {
            cancellationToken.ThrowIfCancellationRequested();
            await SimulateLatencyAsync();

            if (!_products.TryRemove(id, out _))
                throw new KeyNotFoundException($"Product with ID {id} not found");
        }

        // IDisposable implementation
        public void Dispose()
        {
            Dispose(true);
            GC.SuppressFinalize(this);
        }

        protected virtual void Dispose(bool disposing)
        {
            if (!_disposed)
            {
                if (disposing)
                {
                    // Clean up managed resources
                    _products.Clear();
                }

                // Clean up unmanaged resources (if any)

                _disposed = true;
            }
        }

        ~ProductRepository()
        {
            Dispose(false);
        }
    }

    // Service that uses the repository and handles business logic
    public class ProductService
    {
        private readonly IDataRepository<Product> _repository;
        private readonly ILogger _logger;

        public ProductService(IDataRepository<Product> repository, ILogger logger)
        {
            _repository = repository ?? throw new ArgumentNullException(nameof(repository));
            _logger = logger ?? throw new ArgumentNullException(nameof(logger));
        }

        public async Task<Product> GetProductByIdAsync(int id)
        {
            try
            {
                _logger.Log($"Getting product with ID {id}");
                
                var product = await _repository.GetByIdAsync(id);
                
                if (product == null)
                    _logger.Log($"Product with ID {id} not found");
                
                return product;
            }
            catch (Exception ex)
            {
                _logger.LogError($"Error retrieving product: {ex.Message}");
                throw; // Re-throw to let the caller handle it
            }
        }

        public async Task<IEnumerable<Product>> GetAvailableProductsAsync()
        {
            try
            {
                var allProducts = await _repository.GetAllAsync();
                return allProducts.Where(p => p.IsAvailable);
            }
            catch (Exception ex)
            {
                _logger.LogError($"Error retrieving available products: {ex.Message}");
                throw;
            }
        }

        public async Task<int> AddProductAsync(Product product)
        {
            try
            {
                // Business validation
                if (product.Price <= 0)
                {
                    throw new ArgumentException("Product price must be greater than zero");
                }

                _logger.Log($"Adding new product: {product.Name}");
                return await _repository.AddAsync(product);
            }
            catch (Exception ex)
            {
                _logger.LogError($"Error adding product: {ex.Message}");
                throw;
            }
        }

        public async Task<IEnumerable<Product>> SearchProductsAsync(string searchTerm)
        {
            if (string.IsNullOrWhiteSpace(searchTerm))
                throw new ArgumentException("Search term cannot be empty", nameof(searchTerm));

            try
            {
                var allProducts = await _repository.GetAllAsync();
                
                return allProducts.Where(p => 
                    p.Name.Contains(searchTerm, StringComparison.OrdinalIgnoreCase));
            }
            catch (Exception ex)
            {
                _logger.LogError($"Error searching products: {ex.Message}");
                throw;
            }
        }

        // Export products to JSON file asynchronously
        public async Task ExportProductsToJsonAsync(string filePath)
        {
            try
            {
                var products = await _repository.GetAllAsync();
                
                var options = new JsonSerializerOptions
                {
                    WriteIndented = true
                };
                
                string json = JsonSerializer.Serialize(products, options);
                
                await File.WriteAllTextAsync(filePath, json);
                _logger.Log($"Exported {products.Count()} products to {filePath}");
            }
            catch (Exception ex)
            {
                _logger.LogError($"Error exporting products: {ex.Message}");
                throw;
            }
        }

        // Import products from JSON file with cancellation support
        public async Task<int> ImportProductsFromJsonAsync(string filePath, CancellationToken cancellationToken = default)
        {
            if (!File.Exists(filePath))
                throw new FileNotFoundException("Import file not found", filePath);

            try
            {
                string json = await File.ReadAllTextAsync(filePath, cancellationToken);
                var products = JsonSerializer.Deserialize<List<Product>>(json);
                
                if (products == null)
                return 0;

            int importedCount = 0;
            
            // Process each product
            foreach (var product in products)
            {
                cancellationToken.ThrowIfCancellationRequested();
                
                // Reset ID to let repository assign new IDs
                product.Id = 0;
                
                await _repository.AddAsync(product, cancellationToken);
                importedCount++;
            }
            
            _logger.Log($"Imported {importedCount} products from {filePath}");
            return importedCount;
        }
        catch (OperationCanceledException)
        {
            _logger.Log("Import operation was canceled");
            throw;
        }
        catch (Exception ex)
        {
            _logger.LogError($"Error importing products: {ex.Message}");
            throw;
        }
    }
}

// Simple logger interface
public interface ILogger
{
    void Log(string message);
    void LogError(string message);
}

// File logger implementation
public class FileLogger : ILogger, IDisposable
{
    private readonly string _logFilePath;
    private readonly StreamWriter _writer;
    private bool _disposed = false;

    public FileLogger(string logFilePath)
    {
        _logFilePath = logFilePath ?? throw new ArgumentNullException(nameof(logFilePath));
        _writer = new StreamWriter(logFilePath, true);
    }

    public void Log(string message)
    {
        if (_disposed) throw new ObjectDisposedException(nameof(FileLogger));
        
        _writer.WriteLine($"{DateTime.Now:yyyy-MM-dd HH:mm:ss} [INFO] {message}");
        _writer.Flush();
    }

    public void LogError(string message)
    {
        if (_disposed) throw new ObjectDisposedException(nameof(FileLogger));
        
        _writer.WriteLine($"{DateTime.Now:yyyy-MM-dd HH:mm:ss} [ERROR] {message}");
        _writer.Flush();
    }

    public void Dispose()
    {
        Dispose(true);
        GC.SuppressFinalize(this);
    }

    protected virtual void Dispose(bool disposing)
    {
        if (!_disposed)
        {
            if (disposing)
            {
                _writer?.Dispose();
            }

            _disposed = true;
        }
    }

    ~FileLogger()
    {
        Dispose(false);
    }
}

// Configuration manager that uses reflection and attributes
public class ConfigurationManager
{
    private readonly Dictionary<string, Dictionary<string, string>> _configData;

    public ConfigurationManager(string configFilePath)
    {
        if (string.IsNullOrEmpty(configFilePath))
            throw new ArgumentNullException(nameof(configFilePath));

        if (!File.Exists(configFilePath))
            throw new FileNotFoundException("Configuration file not found", configFilePath);

        try
        {
            // Load configuration from JSON file
            string json = File.ReadAllText(configFilePath);
            _configData = JsonSerializer.Deserialize<Dictionary<string, Dictionary<string, string>>>(json);
        }
        catch (Exception ex)
        {
            throw new InvalidOperationException("Failed to load configuration", ex);
        }
    }

    public T LoadConfiguration<T>() where T : class, new()
    {
        T config = new T();
        Type type = typeof(T);

        // Get all properties with ConfigParam attribute
        var properties = type.GetProperties()
            .Where(p => p.IsDefined(typeof(ConfigParamAttribute), false));

        foreach (var property in properties)
        {
            // Get attribute
            var attribute = (ConfigParamAttribute)property.GetCustomAttributes(typeof(ConfigParamAttribute), false).First();

            // Check if section exists
            if (!_configData.TryGetValue(attribute.Section, out var sectionData))
            {
                if (attribute.Required)
                    throw new InvalidOperationException($"Required configuration section '{attribute.Section}' not found");
                
                continue;
            }

            // Check if key exists
            if (!sectionData.TryGetValue(attribute.Key, out var value))
            {
                if (attribute.Required)
                    throw new InvalidOperationException($"Required configuration key '{attribute.Key}' not found in section '{attribute.Section}'");
                
                continue;
            }

            // Convert value to property type and set
            object convertedValue = ConvertValue(value, property.PropertyType);
            property.SetValue(config, convertedValue);
        }

        return config;
    }

    private object ConvertValue(string value, Type targetType)
    {
        if (targetType == typeof(string))
            return value;
        
        if (targetType == typeof(int) || targetType == typeof(int?))
            return int.Parse(value);
        
        if (targetType == typeof(decimal) || targetType == typeof(decimal?))
            return decimal.Parse(value);
        
        if (targetType == typeof(bool) || targetType == typeof(bool?))
            return bool.Parse(value);
        
        if (targetType == typeof(DateTime) || targetType == typeof(DateTime?))
            return DateTime.Parse(value);
        
        throw new NotSupportedException($"Conversion to type {targetType.Name} is not supported");
    }
}

// Program demonstrating usage
public class Program
{
    public static async Task Main()
    {
        // Set up configuration
        var configManager = new ConfigurationManager("appsettings.json");
        var appConfig = configManager.LoadConfiguration<AppConfig>();

        // Set up logger
        using var logger = new FileLogger("app.log");

        // Set up repository and service
        using var repository = new ProductRepository();
        var productService = new ProductService(repository, logger);

        // Set up cancellation token for demo purposes
        using var cts = new CancellationTokenSource();
        cts.CancelAfter(TimeSpan.FromSeconds(30)); // Cancel after 30 seconds

        try
        {
            // Add some products
            await productService.AddProductAsync(new Product
            {
                Name = "Laptop",
                Price = 1200.00m,
                IsAvailable = true
            });

            await productService.AddProductAsync(new Product
            {
                Name = "Smartphone",
                Price = 800.00m,
                IsAvailable = true
            });

            await productService.AddProductAsync(new Product
            {
                Name = "Headphones",
                Price = 150.00m,
                IsAvailable = false
            });

            // Get all available products
            var availableProducts = await productService.GetAvailableProductsAsync();
            Console.WriteLine($"Available products: {availableProducts.Count()}");

            // Search for products
            var searchResults = await productService.SearchProductsAsync("phone");
            Console.WriteLine($"Search results: {searchResults.Count()}");

            // Export products to JSON
            await productService.ExportProductsToJsonAsync("products.json");

            // Import products with cancellation token
            try
            {
                int imported = await productService.ImportProductsFromJsonAsync(
                    "import.json", 
                    cts.Token
                );
                Console.WriteLine($"Imported {imported} products");
            }
            catch (OperationCanceledException)
            {
                Console.WriteLine("Import operation was canceled");
            }
        }
        catch (Exception ex)
        {
            logger.LogError($"Application error: {ex.Message}");
            Console.WriteLine($"Error: {ex.Message}");
        }
    }
}`,
          exercise: {
            instructions:
              'Implement a file processing system that demonstrates asynchronous programming, exception handling, and collection manipulation. Create: (1) An IFileProcessor interface with methods for processing files asynchronously, (2) A CsvFileProcessor implementation that reads, processes, and writes CSV files, (3) Exception handling with custom exceptions, (4) A caching mechanism using appropriate collection types, and (5) Support for cancellation in long-running operations.',
          },
        },
        {
          title: '.NET Application Development (10 Key Concepts)',
          explanation: `
        <p>These ten concepts focus on building real-world .NET applications with modern, maintainable architecture and practices:</p>

        <h4>9. ASP.NET Core Web Application Framework</h4>
        <p>ASP.NET Core is a cross-platform, high-performance framework for building modern cloud-based internet-connected applications:</p>

        <p><strong>ASP.NET Core Fundamentals:</strong> Core framework concepts:</p>
        <ul>
          <li>Middleware pipeline for request processing</li>
          <li>Configuration system (appsettings.json, environment variables, etc.)</li>
          <li>Logging and diagnostics</li>
          <li>Hosting environments (Development, Staging, Production)</li>
          <li>Static files and file providers</li>
        </ul>

        <p><strong>MVC Pattern:</strong> Core architectural pattern for web applications:</p>
        <ul>
          <li>Controllers and actions</li>
          <li>Models for data representation</li>
          <li>Views for rendering HTML</li>
          <li>Razor syntax for server-side rendering</li>
          <li>View components and partial views</li>
        </ul>

        <p><strong>Routing:</strong> Directing requests to controllers and actions:</p>
        <ul>
          <li>Convention-based routing</li>
          <li>Attribute routing</li>
          <li>Route constraints and templates</li>
          <li>Route parameters and values</li>
          <li>URL generation</li>
        </ul>
        
        <div class="code-example">
          <pre><code>// ASP.NET Core Application Setup
// Program.cs (minimal API approach in .NET 6+)
var builder = WebApplication.CreateBuilder(args);

// Add services to the container
builder.Services.AddControllersWithViews();
builder.Services.AddRazorPages();

// Add logging
builder.Logging.AddConsole();
builder.Logging.AddDebug();

// Add database context
builder.Services.AddDbContext<ApplicationDbContext>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection")));

// Add custom services
builder.Services.AddScoped<IProductRepository, ProductRepository>();
builder.Services.AddScoped<IProductService, ProductService>();

// Configure CORS
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowSpecificOrigin",
        builder => builder.WithOrigins("https://example.com")
                         .AllowAnyHeader()
                         .AllowAnyMethod());
});

var app = builder.Build();

// Configure the HTTP request pipeline
if (app.Environment.IsDevelopment())
{
    app.UseDeveloperExceptionPage();
}
else
{
    app.UseExceptionHandler("/Home/Error");
    app.UseHsts();
}

app.UseHttpsRedirection();
app.UseStaticFiles();

// Enable CORS
app.UseCors("AllowSpecificOrigin");

app.UseRouting();

app.UseAuthentication();
app.UseAuthorization();

// Configure endpoints
app.MapControllerRoute(
    name: "default",
    pattern: "{controller=Home}/{action=Index}/{id?}");
app.MapRazorPages();

// Minimal API example
app.MapGet("/api/version", () => new { Version = "1.0.0" });

app.Run();

// MVC Controller Example
[Route("api/[controller]")]
[ApiController]
public class ProductsController : ControllerBase
{
    private readonly IProductService _productService;
    private readonly ILogger<ProductsController> _logger;

    public ProductsController(IProductService productService, ILogger<ProductsController> logger)
    {
        _productService = productService;
        _logger = logger;
    }

    // GET: api/Products
    [HttpGet]
    public async Task<ActionResult<IEnumerable<ProductDto>>> GetProducts()
    {
        try
        {
            var products = await _productService.GetAllProductsAsync();
            return Ok(products);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error retrieving products");
            return StatusCode(500, "Internal server error");
        }
    }

    // GET: api/Products/5
    [HttpGet("{id}")]
    public async Task<ActionResult<ProductDto>> GetProduct(int id)
    {
        try
        {
            var product = await _productService.GetProductByIdAsync(id);

            if (product == null)
            {
                return NotFound();
            }

            return Ok(product);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error retrieving product {ProductId}", id);
            return StatusCode(500, "Internal server error");
        }
    }

    // POST: api/Products
    [HttpPost]
    public async Task<ActionResult<ProductDto>> CreateProduct(ProductCreateDto productDto)
    {
        try
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var createdProduct = await _productService.CreateProductAsync(productDto);
            
            return CreatedAtAction(
                nameof(GetProduct), 
                new { id = createdProduct.Id }, 
                createdProduct
            );
        }
        catch (ValidationException ex)
        {
            return BadRequest(ex.Message);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error creating product");
            return StatusCode(500, "Internal server error");
        }
    }
}

// MVC Razor View Example
@model List<ProductViewModel>
@{
    ViewData["Title"] = "Products";
}

&lt;h1&gt;Products&lt;/h1&gt;

&lt;p&gt;
    &lt;a asp-action="Create" class="btn btn-primary"&gt;Create New&lt;/a&gt;
&lt;/p&gt;

&lt;div class="row"&gt;
    @foreach (var product in Model)
    {
        &lt;div class="col-md-4 mb-4"&gt;
            &lt;div class="card"&gt;
                &lt;div class="card-body"&gt;
                    &lt;h5 class="card-title"&gt;@product.Name&lt;/h5&gt;
                    &lt;p class="card-text"&gt;@product.Description&lt;/p&gt;
                    &lt;p class="card-text"&gt;
                        &lt;strong&gt;Price:&lt;/strong&gt; @product.Price.ToString("C")
                    &lt;/p&gt;
                    &lt;a asp-action="Details" asp-route-id="@product.Id" class="btn btn-info"&gt;Details&lt;/a&gt;
                    &lt;a asp-action="Edit" asp-route-id="@product.Id" class="btn btn-warning"&gt;Edit&lt;/a&gt;
                &lt;/div&gt;
            &lt;/div&gt;
        &lt;/div&gt;
    }
&lt;/div&gt;

@if (!Model.Any())
{
    &lt;div class="alert alert-info"&gt;
        No products found. Click the &lt;a asp-action="Create"&gt;Create New&lt;/a&gt; button to add products.
    &lt;/div&gt;
}</code></pre>
        </div>

        <h4>10. Web API Development</h4>
        <p>Web APIs enable communication between different systems across a network, typically using HTTP protocol:</p>

        <p><strong>RESTful API Design:</strong> Principles and practices for API design:</p>
        <ul>
          <li>HTTP methods (GET, POST, PUT, DELETE, etc.)</li>
          <li>Resource-based routing</li>
          <li>Status codes and response types</li>
          <li>Request and response formats (JSON, XML)</li>
          <li>Content negotiation</li>
        </ul>

        <p><strong>API Controllers:</strong> Specialized controllers for APIs:</p>
        <ul>
          <li>ApiController attribute</li>
          <li>Action method return types (ActionResult<T>, IActionResult)</li>
          <li>FromBody, FromQuery, and other binding attributes</li>
          <li>Route attributes and constraints</li>
          <li>ModelBinding and validation</li>
        </ul>

        <p><strong>API Documentation:</strong> Making APIs discoverable and usable:</p>
        <ul>
          <li>Swagger/OpenAPI integration</li>
          <li>API versioning strategies</li>
          <li>XML comments for documentation</li>
          <li>API response examples</li>
        </ul>
        
        <div class="code-example">
          <pre><code>// Web API Development
// RESTful API Controller
[Route("api/v{version:apiVersion}/[controller]")]
[ApiController]
[ApiVersion("1.0")]
public class ProductsController : ControllerBase
{
    private readonly IProductService _productService;
    private readonly ILogger<ProductsController> _logger;

    public ProductsController(IProductService productService, ILogger<ProductsController> logger)
    {
        _productService = productService;
        _logger = logger;
    }

    /// &lt;summary&gt;
    /// Gets all products
    /// &lt;/summary&gt;
    /// &lt;remarks&gt;
    /// Sample request:
    ///     GET /api/v1/products
    /// &lt;/remarks&gt;
    /// &lt;returns&gt;A list of product DTOs&lt;/returns&gt;
    /// &lt;response code="200"&gt;Returns the list of products&lt;/response&gt;
    /// &lt;response code="500"&gt;If there was an internal server error&lt;/response&gt;
    [HttpGet]
    [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(IEnumerable<ProductDto>))]
    [ProducesResponseType(StatusCodes.Status500InternalServerError)]
    public async Task<ActionResult<IEnumerable<ProductDto>>> GetProducts()
    {
        try
        {
            var products = await _productService.GetAllProductsAsync();
            return Ok(products);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error retrieving products");
            return StatusCode(500, new { message = "Internal server error" });
        }
    }

    /// &lt;summary&gt;
    /// Gets a product by ID
    /// &lt;/summary&gt;
    /// &lt;param name="id"&gt;The product ID&lt;/param&gt;
    /// &lt;returns&gt;A product DTO&lt;/returns&gt;
    /// &lt;response code="200"&gt;Returns the product&lt;/response&gt;
    /// &lt;response code="404"&gt;If the product is not found&lt;/response&gt;
    /// &lt;response code="500"&gt;If there was an internal server error&lt;/response&gt;
    [HttpGet("{id}")]
    [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(ProductDto))]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    [ProducesResponseType(StatusCodes.Status500InternalServerError)]
    public async Task<ActionResult<ProductDto>> GetProduct(int id)
    {
        try
        {
            var product = await _productService.GetProductByIdAsync(id);

            if (product == null)
            {
                return NotFound(new { message = $"Product with ID {id} not found" });
            }

            return Ok(product);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error retrieving product {ProductId}", id);
            return StatusCode(500, new { message = "Internal server error" });
        }
    }

    /// &lt;summary&gt;
    /// Creates a new product
    /// &lt;/summary&gt;
    /// &lt;param name="productDto"&gt;The product data&lt;/param&gt;
    /// &lt;returns&gt;The created product&lt;/returns&gt;
    /// &lt;response code="201"&gt;Returns the newly created product&lt;/response&gt;
    /// &lt;response code="400"&gt;If the product data is invalid&lt;/response&gt;
    /// &lt;response code="500"&gt;If there was an internal server error&lt;/response&gt;
    [HttpPost]
    [Consumes("application/json")]
    [ProducesResponseType(StatusCodes.Status201Created, Type = typeof(ProductDto))]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    [ProducesResponseType(StatusCodes.Status500InternalServerError)]
    public async Task<ActionResult<ProductDto>> CreateProduct([FromBody] ProductCreateDto productDto)
    {
        try
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var createdProduct = await _productService.CreateProductAsync(productDto);
            
            return CreatedAtAction(
                nameof(GetProduct), 
                new { id = createdProduct.Id, version = "1.0" }, 
                createdProduct
            );
        }
        catch (ValidationException ex)
        {
            return BadRequest(new { message = ex.Message });
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error creating product");
            return StatusCode(500, new { message = "Internal server error" });
        }
    }

    /// &lt;summary&gt;
    /// Updates an existing product
    /// &lt;/summary&gt;
    /// &lt;param name="id"&gt;The product ID&lt;/param&gt;
    /// &lt;param name="productDto"&gt;The updated product data&lt;/param&gt;
    /// &lt;returns&gt;No content&lt;/returns&gt;
    /// &lt;response code="204"&gt;If the product was successfully updated&lt;/response&gt;
    /// &lt;response code="400"&gt;If the product data is invalid&lt;/response&gt;
    /// &lt;response code="404"&gt;If the product is not found&lt;/response&gt;
    /// &lt;response code="500"&gt;If there was an internal server error&lt;/response&gt;
    [HttpPut("{id}")]
    [ProducesResponseType(StatusCodes.Status204NoContent)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    [ProducesResponseType(StatusCodes.Status500InternalServerError)]
    public async Task<IActionResult> UpdateProduct(int id, [FromBody] ProductUpdateDto productDto)
    {
        try
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != productDto.Id)
            {
                return BadRequest(new { message = "ID mismatch" });
            }

            var exists = await _productService.ProductExistsAsync(id);
            if (!exists)
            {
                return NotFound(new { message = $"Product with ID {id} not found" });
            }

            await _productService.UpdateProductAsync(productDto);
            
            return NoContent();
        }
        catch (ValidationException ex)
        {
            return BadRequest(new { message = ex.Message });
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error updating product {ProductId}", id);
            return StatusCode(500, new { message = "Internal server error" });
        }
    }

    /// &lt;summary&gt;
    /// Deletes a product
    /// &lt;/summary&gt;
    /// &lt;param name="id"&gt;The product ID&lt;/param&gt;
    /// &lt;returns&gt;No content&lt;/returns&gt;
    /// &lt;response code="204"&gt;If the product was successfully deleted&lt;/response&gt;
    /// &lt;response code="404"&gt;If the product is not found&lt;/response&gt;
    /// &lt;response code="500"&gt;If there was an internal server error&lt;/response&gt;
    [HttpDelete("{id}")]
    [ProducesResponseType(StatusCodes.Status204NoContent)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    [ProducesResponseType(StatusCodes.Status500InternalServerError)]
    public async Task<IActionResult> DeleteProduct(int id)
    {
        try
        {
            var exists = await _productService.ProductExistsAsync(id);
            if (!exists)
            {
                return NotFound(new { message = $"Product with ID {id} not found" });
            }

            await _productService.DeleteProductAsync(id);
            
            return NoContent();
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error deleting product {ProductId}", id);
            return StatusCode(500, new { message = "Internal server error" });
        }
    }
}

// Configuring Swagger/OpenAPI
public void ConfigureServices(IServiceCollection services)
{
    // Add swagger documentation
    services.AddSwaggerGen(c =>
    {
        c.SwaggerDoc("v1", new OpenApiInfo
        {
            Title = "Products API",
            Version = "v1",
            Description = "A simple API for managing products",
            Contact = new OpenApiContact
            {
                Name = "API Support",
                Email = "support@example.com",
                Url = new Uri("https://example.com/support")
            }
        });
        
        // Add XML comments
        var xmlFile = $"{Assembly.GetExecutingAssembly().GetName().Name}.xml";
        var xmlPath = Path.Combine(AppContext.BaseDirectory, xmlFile);
        c.IncludeXmlComments(xmlPath);
        
        // Add JWT authentication support in Swagger UI
        c.AddSecurityDefinition("Bearer", new OpenApiSecurityScheme
        {
            Description = "JWT Authorization header using the Bearer scheme. Example: \\"Authorization: Bearer {token}\\"",
            Name = "Authorization",
            In = ParameterLocation.Header,
            Type = SecuritySchemeType.ApiKey,
            Scheme = "Bearer"
        });
        
        c.AddSecurityRequirement(new OpenApiSecurityRequirement
        {
            {
                new OpenApiSecurityScheme
                {
                    Reference = new OpenApiReference
                    {
                        Type = ReferenceType.SecurityScheme,
                        Id = "Bearer"
                    }
                },
                Array.Empty<string>()
            }
        });
    });
    
    // Configure API versioning
    services.AddApiVersioning(options =>
    {
        options.ReportApiVersions = true;
        options.AssumeDefaultVersionWhenUnspecified = true;
        options.DefaultApiVersion = new ApiVersion(1, 0);
    });
    
    services.AddVersionedApiExplorer(options =>
    {
        options.GroupNameFormat = "'v'VVV";
        options.SubstituteApiVersionInUrl = true;
    });
}</code></pre>
        </div>

        <h4>11. Entity Framework Core and Data Access</h4>
        <p>Entity Framework Core is an object-relational mapper (ORM) that enables developers to work with a database using .NET objects:</p>

        <p><strong>DbContext and Models:</strong> Core EF concepts:</p>
        <ul>
          <li>DbContext configuration and lifetime</li>
          <li>Entity models and relationships</li>
          <li>Fluent API for model configuration</li>
          <li>Data annotations for model validation</li>
          <li>DbSet<T> for entity collections</li>
        </ul>

        <p><strong>Migrations:</strong> Managing database schema changes:</p>
        <ul>
          <li>Creating and applying migrations</li>
          <li>Migration customization</li>
          <li>Seed data during migrations</li>
          <li>Migration strategies for different environments</li>
        </ul>

        <p><strong>LINQ to Entities:</strong> Querying the database:</p>
        <ul>
          <li>Building efficient queries</li>
          <li>Eager loading with Include and ThenInclude</li>
          <li>Projections with Select</li>
          <li>Execution methods (ToList, FirstOrDefault, etc.)</li>
          <li>Raw SQL when needed</li>
        </ul>
        
        <div class="code-example">
          <pre><code>// Entity Framework Core
// DbContext configuration
public class ApplicationDbContext : DbContext
{
    public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
        : base(options)
    {
    }
    
    // DbSets for entities
    public DbSet<Product> Products { get; set; }
    public DbSet<Category> Categories { get; set; }
    public DbSet<Order> Orders { get; set; }
    public DbSet<OrderItem> OrderItems { get; set; }
    
    // Override OnModelCreating to use Fluent API
    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);
        
        // Configure Product entity
        modelBuilder.Entity<Product>(entity =>
        {
            entity.ToTable("Products");
            entity.HasKey(e => e.Id);
            
            entity.Property(e => e.Name)
                .IsRequired()
                .HasMaxLength(100);
                
            entity.Property(e => e.Description)
                .HasMaxLength(500);
                
            entity.Property(e => e.Price)
                .IsRequired()
                .HasColumnType("decimal(18, 2)");
                
            entity.HasOne(e => e.Category)
                .WithMany(c => c.Products)
                .HasForeignKey(e => e.CategoryId)
                .OnDelete(DeleteBehavior.Restrict);
                
            // Add a unique index
            entity.HasIndex(e => e.Sku).IsUnique();
        });
        
        // Configure Category entity
        modelBuilder.Entity<Category>(entity =>
        {
            entity.ToTable("Categories");
            entity.HasKey(e => e.Id);
            
            entity.Property(e => e.Name)
                .IsRequired()
                .HasMaxLength(50);
        });
        
        // Configure many-to-many relationship with join entity
        modelBuilder.Entity<OrderItem>(entity =>
        {
            entity.ToTable("OrderItems");
            entity.HasKey(e => e.Id);
            
            entity.HasOne(e => e.Order)
                .WithMany(o => o.OrderItems)
                .HasForeignKey(e => e.OrderId);
                
            entity.HasOne(e => e.Product)
                .WithMany()
                .HasForeignKey(e => e.ProductId);
                
            entity.Property(e => e.Quantity)
                .IsRequired();
                
            entity.Property(e => e.UnitPrice)
                .IsRequired()
                .HasColumnType("decimal(18, 2)");
        });
        
        // Seed data
        modelBuilder.Entity<Category>().HasData(
            new Category { Id = 1, Name = "Electronics" },
            new Category { Id = 2, Name = "Clothing" },
            new Category { Id = 3, Name = "Home & Kitchen" }
        );
    }
    
    // Override SaveChanges to add audit information
    public override int SaveChanges()
    {
        AddAuditInfo();
        return base.SaveChanges();
    }
    
    public override Task<int> SaveChangesAsync(CancellationToken cancellationToken = default)
    {
        AddAuditInfo();
        return base.SaveChangesAsync(cancellationToken);
    }
    
    private void AddAuditInfo()
    {
        var entries = ChangeTracker.Entries()
            .Where(e => e.Entity is BaseEntity && 
                  (e.State == EntityState.Added || e.State == EntityState.Modified));
                  
        foreach (var entry in entries)
        {
            var entity = (BaseEntity)entry.Entity;
            
            if (entry.State == EntityState.Added)
            {
                entity.CreatedDate = DateTime.UtcNow;
            }
            
            entity.LastModifiedDate = DateTime.UtcNow;
        }
    }
}

// Entity models
public abstract class BaseEntity
{
    public int Id { get; set; }
    public DateTime CreatedDate { get; set; }
    public DateTime LastModifiedDate { get; set; }
}

public class Product : BaseEntity
{
    public string Name { get; set; }
    public string Description { get; set; }
    public decimal Price { get; set; }
    public string Sku { get; set; }
    public bool IsAvailable { get; set; }
    
    public int CategoryId { get; set; }
    public Category Category { get; set; }
}

public class Category : BaseEntity
{
    public string Name { get; set; }
    
    public ICollection<Product> Products { get; set; } = new List<Product>();
}

public class Order : BaseEntity
{
    public string OrderNumber { get; set; }
    public DateTime OrderDate { get; set; }
    public decimal TotalAmount { get; set; }
    public OrderStatus Status { get; set; }
    
    public string CustomerId { get; set; }
    
    public ICollection<OrderItem> OrderItems { get; set; } = new List<OrderItem>();
}

public class OrderItem : BaseEntity
{
    public int Quantity { get; set; }
    public decimal UnitPrice { get; set; }
    
    public int OrderId { get; set; }
    public Order Order { get; set; }
    
    public int ProductId { get; set; }
    public Product Product { get; set; }
}

public enum OrderStatus
{
    Pending,
    Processing,
    Shipped,
    Delivered,
    Cancelled
}

// Repository implementation using EF Core
public class ProductRepository : IProductRepository
{
    private readonly ApplicationDbContext _context;
    
    public ProductRepository(ApplicationDbContext context)
    {
        _context = context;
    }
    
    public async Task<IEnumerable<Product>> GetAllAsync()
    {
        return await _context.Products
            .Include(p => p.Category)
            .AsNoTracking()
            .ToListAsync();
    }
    
    public async Task<Product> GetByIdAsync(int id)
    {
        return await _context.Products
            .Include(p => p.Category)
            .FirstOrDefaultAsync(p => p.Id == id);
    }
    
    public async Task<IEnumerable<Product>> GetByCategoryAsync(int categoryId)
    {
        return await _context.Products
            .Where(p => p.CategoryId == categoryId)
            .Include(p => p.Category)
            .AsNoTracking()
            .ToListAsync();
    }
    
    public async Task<IEnumerable<Product>> SearchAsync(string searchTerm)
    {
        return await _context.Products
            .Where(p => p.Name.Contains(searchTerm) || p.Description.Contains(searchTerm))
            .Include(p => p.Category)
            .AsNoTracking()
            .ToListAsync();
    }
    
    public async Task<int> AddAsync(Product product)
    {
        _context.Products.Add(product);
        await _context.SaveChangesAsync();
        return product.Id;
    }
    
    public async Task UpdateAsync(Product product)
    {
        // Attach and mark as modified
        _context.Entry(product).State = EntityState.Modified;
        
        try
        {
            await _context.SaveChangesAsync();
        }
        catch (DbUpdateConcurrencyException)
        {
            if (!await ProductExistsAsync(product.Id))
            {
                throw new KeyNotFoundException($"Product with ID {product.Id} not found");
            }
            throw;
        }
    }
    
    public async Task DeleteAsync(int id)
    {
        var product = await _context.Products.FindAsync(id);
        if (product == null)
        {
            throw new KeyNotFoundException($"Product with ID {id} not found");
        }
        
        _context.Products.Remove(product);
        await _context.SaveChangesAsync();
    }
    
    public async Task<bool> ProductExistsAsync(int id)
    {
        return await _context.Products.AnyAsync(p => p.Id == id);
    }
    
    // Raw SQL example for complex queries
    public async Task<IEnumerable<Product>> GetTopSellingProductsAsync(int count)
    {
        return await _context.Products
            .FromSqlRaw(@"
                SELECT p.* 
                FROM Products p
                JOIN OrderItems oi ON p.Id = oi.ProductId
                GROUP BY p.Id, p.Name, p.Description, p.Price, p.Sku, p.IsAvailable, p.CategoryId, p.CreatedDate, p.LastModifiedDate
                ORDER BY SUM(oi.Quantity) DESC
                LIMIT {0}", count)
            .Include(p => p.Category)
            .AsNoTracking()
            .ToListAsync();
    }
}

// Migrations CLI commands
// Create a migration: dotnet ef migrations add InitialCreate
// Apply migrations: dotnet ef database update
// Remove last migration: dotnet ef migrations remove
// Generate SQL script: dotnet ef migrations script</code></pre>
        </div>

        <h4>12. Dependency Injection and Services</h4>
        <p>Dependency Injection (DI) is a design pattern that implements Inversion of Control for resolving dependencies:</p>

        <p><strong>DI Fundamentals:</strong> Core concepts of dependency injection:</p>
        <ul>
          <li>Service registration with lifetimes (Singleton, Scoped, Transient)</li>
          <li>Constructor injection</li>
          <li>Service provider and resolution</li>
          <li>Service descriptors and configuration</li>
        </ul>

        <p><strong>Service Implementation Patterns:</strong> Common service design patterns:</p>
        <ul>
          <li>Repository pattern for data access</li>
          <li>Unit of Work pattern for transaction management</li>
          <li>Service layer for business logic</li>
          <li>Mediator pattern for handling requests</li>
          <li>Factory pattern for object creation</li>
        </ul>

        <p><strong>Service Composition:</strong> Building services from smaller components:</p>
        <ul>
          <li>Decorator pattern for extending behavior</li>
          <li>Adapter pattern for integration</li>
          <li>Proxy pattern for intercept operations</li>
          <li>Composite pattern for hierarchical services</li>
        </ul>
        
        <div class="code-example">
          <pre><code>// Dependency Injection and Services
// Service registration in Program.cs
var builder = WebApplication.CreateBuilder(args);

// Register services with different lifetimes
// Singleton - one instance for the entire application
builder.Services.AddSingleton<IConfigurationService, ConfigurationService>();

// Scoped - one instance per HTTP request
builder.Services.AddScoped<IProductRepository, ProductRepository>();
builder.Services.AddScoped<IProductService, ProductService>();
builder.Services.AddScoped<IOrderRepository, OrderRepository>();
builder.Services.AddScoped<IOrderService, OrderService>();

// Transient - new instance every time it's requested
builder.Services.AddTransient<IEmailService, EmailService>();
builder.Services.AddTransient<IValidator<ProductCreateDto>, ProductValidator>();

// Register multiple implementations of the same interface
builder.Services.AddSingleton<IPaymentProcessor, CreditCardProcessor>();
builder.Services.AddSingleton<IPaymentProcessor, PayPalProcessor>();
builder.Services.AddSingleton<IPaymentProcessorFactory, PaymentProcessorFactory>();

// Register generic service
builder.Services.AddScoped(typeof(IRepository<>), typeof(Repository<>));

// Interface definitions
public interface IProductService
{
    Task<IEnumerable<ProductDto>> GetAllProductsAsync();
    Task<ProductDto> GetProductByIdAsync(int id);
    Task<ProductDto> CreateProductAsync(ProductCreateDto productDto);
    Task UpdateProductAsync(ProductUpdateDto productDto);
    Task DeleteProductAsync(int id);
    Task<bool> ProductExistsAsync(int id);
    Task<IEnumerable<ProductDto>> SearchProductsAsync(string searchTerm);
}

public interface IProductRepository
{
    Task<IEnumerable<Product>> GetAllAsync();
    Task<Product> GetByIdAsync(int id);
    Task<IEnumerable<Product>> GetByCategoryAsync(int categoryId);
    Task<IEnumerable<Product>> SearchAsync(string searchTerm);
    Task<int> AddAsync(Product product);
    Task UpdateAsync(Product product);
    Task DeleteAsync(int id);
    Task<bool> ProductExistsAsync(int id);
}

// Service implementation
public class ProductService : IProductService
{
    private readonly IProductRepository _productRepository;
    private readonly ILogger<ProductService> _logger;
    private readonly IValidator<ProductCreateDto> _createValidator;
    private readonly IValidator<ProductUpdateDto> _updateValidator;
    
    // Constructor injection
    public ProductService(
        IProductRepository productRepository,
        ILogger<ProductService> logger,
        IValidator<ProductCreateDto> createValidator,
        IValidator<ProductUpdateDto> updateValidator)
    {
        _productRepository = productRepository;
        _logger = logger;
        _createValidator = createValidator;
        _updateValidator = updateValidator;
    }
    
    public async Task<IEnumerable<ProductDto>> GetAllProductsAsync()
    {
        var products = await _productRepository.GetAllAsync();
        return products.Select(p => MapToDto(p));
    }
    
    public async Task<ProductDto> GetProductByIdAsync(int id)
    {
        var product = await _productRepository.GetByIdAsync(id);
        
        if (product == null)
        {
            _logger.LogWarning("Product with ID {ProductId} not found", id);
            return null;
        }
        
        return MapToDto(product);
    }
    
    public async Task<ProductDto> CreateProductAsync(ProductCreateDto productDto)
    {
        // Validate the DTO
        var validationResult = await _createValidator.ValidateAsync(productDto);
        
        if (!validationResult.IsValid)
        {
            var errors = string.Join("; ", validationResult.Errors.Select(e => e.ErrorMessage));
            throw new ValidationException(errors);
        }
        
        // Map DTO to entity
        var product = new Product
        {
            Name = productDto.Name,
            Description = productDto.Description,
            Price = productDto.Price,
            Sku = productDto.Sku,
            IsAvailable = productDto.IsAvailable,
            CategoryId = productDto.CategoryId
        };
        
        // Save to database
        await _productRepository.AddAsync(product);
        
        _logger.LogInformation("Created new product: {ProductName} (ID: {ProductId})", 
            product.Name, product.Id);
            
        // Return the created product as DTO
        return MapToDto(product);
    }
    
    public async Task UpdateProductAsync(ProductUpdateDto productDto)
    {
        // Validate the DTO
        var validationResult = await _updateValidator.ValidateAsync(productDto);
        
        if (!validationResult.IsValid)
        {
            var errors = string.Join("; ", validationResult.Errors.Select(e => e.ErrorMessage));
            throw new ValidationException(errors);
        }
        
        // Check if product exists
        var existingProduct = await _productRepository.GetByIdAsync(productDto.Id);
        
        if (existingProduct == null)
        {
            throw new KeyNotFoundException($"Product with ID {productDto.Id} not found");
        }
        
        // Update properties
        existingProduct.Name = productDto.Name;
        existingProduct.Description = productDto.Description;
        existingProduct.Price = productDto.Price;
        existingProduct.Sku = productDto.Sku;
        existingProduct.IsAvailable = productDto.IsAvailable;
        existingProduct.CategoryId = productDto.CategoryId;
        
        // Save changes
        await _productRepository.UpdateAsync(existingProduct);
        
        _logger.LogInformation("Updated product: {ProductName} (ID: {ProductId})", 
            existingProduct.Name, existingProduct.Id);
    }
    
    public async Task DeleteProductAsync(int id)
    {
        await _productRepository.DeleteAsync(id);
        
        _logger.LogInformation("Deleted product with ID: {ProductId}", id);
    }
    
    public async Task<bool> ProductExistsAsync(int id)
    {
        return await _productRepository.ProductExistsAsync(id);
    }
    
    public async Task<IEnumerable<ProductDto>> SearchProductsAsync(string searchTerm)
    {
        var products = await _productRepository.SearchAsync(searchTerm);
        return products.Select(p => MapToDto(p));
    }
    
    // Helper method to map entity to DTO
    private ProductDto MapToDto(Product product)
    {
        return new ProductDto
        {
            Id = product.Id,
            Name = product.Name,
            Description = product.Description,
            Price = product.Price,
            Sku = product.Sku,
            IsAvailable = product.IsAvailable,
            CategoryId = product.CategoryId,
            CategoryName = product.Category?.Name
        };
    }
}

// Service factory pattern example
public interface IPaymentProcessor
{
    string Name { get; }
    Task<bool> ProcessPaymentAsync(decimal amount, string currency, string reference);
}

public class CreditCardProcessor : IPaymentProcessor
{
    public string Name => "CreditCard";
    
    public async Task<bool> ProcessPaymentAsync(decimal amount, string currency, string reference)
    {
        // Implementation for credit card processing
        return await Task.FromResult(true);
    }
}

public class PayPalProcessor : IPaymentProcessor
{
    public string Name => "PayPal";
    
    public async Task<bool> ProcessPaymentAsync(decimal amount, string currency, string reference)
    {
        // Implementation for PayPal processing
        return await Task.FromResult(true);
    }
}

public interface IPaymentProcessorFactory
{
    IPaymentProcessor GetProcessor(string processorName);
}

public class PaymentProcessorFactory : IPaymentProcessorFactory
{
    private readonly IEnumerable<IPaymentProcessor> _processors;
    
    public PaymentProcessorFactory(IEnumerable<IPaymentProcessor> processors)
    {
        _processors = processors;
    }
    
    public IPaymentProcessor GetProcessor(string processorName)
    {
        var processor = _processors.FirstOrDefault(p => 
            p.Name.Equals(processorName, StringComparison.OrdinalIgnoreCase));
            
        if (processor == null)
        {
            throw new ArgumentException($"Payment processor '{processorName}' not found");
        }
        
        return processor;
    }
}

// Example of decorator pattern
public interface ILoggingService
{
    void LogInformation(string message);
    void LogWarning(string message);
    void LogError(string message, Exception exception = null);
}

public class LoggingService : ILoggingService
{
    public void LogInformation(string message)
    {
        // Basic implementation
        Console.WriteLine($"INFO: {message}");
    }
    
    public void LogWarning(string message)
    {
        Console.WriteLine($"WARNING: {message}");
    }
    
    public void LogError(string message, Exception exception = null)
    {
        Console.WriteLine($"ERROR: {message}");
        if (exception != null)
        {
            Console.WriteLine($"Exception: {exception.Message}");
        }
    }
}

// Decorator that adds database logging
public class DatabaseLoggingDecorator : ILoggingService
{
    private readonly ILoggingService _innerLogger;
    private readonly ApplicationDbContext _dbContext;
    
    public DatabaseLoggingDecorator(
        ILoggingService innerLogger,
        ApplicationDbContext dbContext)
    {
        _innerLogger = innerLogger;
        _dbContext = dbContext;
    }
    
    public void LogInformation(string message)
    {
        // Call the inner implementation first
        _innerLogger.LogInformation(message);
        
        // Then add our extended behavior
        _dbContext.Logs.Add(new LogEntry
        {
            Level = "Information",
            Message = message,
            Timestamp = DateTime.UtcNow
        });
        _dbContext.SaveChanges();
    }
    
    public void LogWarning(string message)
    {
        _innerLogger.LogWarning(message);
        
        _dbContext.Logs.Add(new LogEntry
        {
            Level = "Warning",
            Message = message,
            Timestamp = DateTime.UtcNow
        });
        _dbContext.SaveChanges();
    }
    
    public void LogError(string message, Exception exception = null)
    {
        _innerLogger.LogError(message, exception);
        
        _dbContext.Logs.Add(new LogEntry
        {
            Level = "Error",
            Message = message,
            ExceptionDetails = exception?.ToString(),
            Timestamp = DateTime.UtcNow
        });
        _dbContext.SaveChanges();
    }
}</code></pre>
        </div>

        <h4>13. Authentication and Authorization</h4>
        <p>Authentication verifies user identity, while authorization determines what actions authenticated users can perform:</p>

        <p><strong>Authentication Mechanisms:</strong> Various ways to authenticate users:</p>
        <ul>
          <li>Cookie authentication</li>
          <li>JWT (JSON Web Token) authentication</li>
          <li>OAuth and OpenID Connect</li>
          <li>Identity providers and social login</li>
          <li>Multi-factor authentication</li>
        </ul>

        <p><strong>Authorization Approaches:</strong> Controlling access to resources:</p>
        <ul>
          <li>Role-based authorization</li>
          <li>Policy-based authorization</li>
          <li>Claims-based authorization</li>
          <li>Resource-based authorization</li>
          <li>Custom authorization requirements</li>
        </ul>

        <p><strong>ASP.NET Core Identity:</strong> Framework for user management:</p>
        <ul>
          <li>User and role management</li>
          <li>Password hashing and validation</li>
          <li>Account confirmation and recovery</li>
          <li>Two-factor authentication</li>
          <li>External provider integration</li>
        </ul>
        
        <div class="code-example">
          <pre><code>// Authentication and Authorization
// Configure authentication in Program.cs
var builder = WebApplication.CreateBuilder(args);

// Add Identity services
builder.Services.AddIdentity<ApplicationUser, IdentityRole>(options =>
{
    // Password requirements
    options.Password.RequireDigit = true;
    options.Password.RequireLowercase = true;
    options.Password.RequireUppercase = true;
    options.Password.RequireNonAlphanumeric = true;
    options.Password.RequiredLength = 8;
    
    // Lockout settings
    options.Lockout.DefaultLockoutTimeSpan = TimeSpan.FromMinutes(15);
    options.Lockout.MaxFailedAccessAttempts = 5;
    
    // User settings
    options.User.RequireUniqueEmail = true;
})
.AddEntityFrameworkStores<ApplicationDbContext>()
.AddDefaultTokenProviders();

// Configure cookie settings
builder.Services.ConfigureApplicationCookie(options =>
{
    options.Cookie.HttpOnly = true;
    options.ExpireTimeSpan = TimeSpan.FromMinutes(60);
    options.LoginPath = "/Account/Login";
    options.AccessDeniedPath = "/Account/AccessDenied";
    options.SlidingExpiration = true;
});

// Add JWT authentication
builder.Services.AddAuthentication(options =>
{
    options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
    options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
})
.AddJwtBearer(options =>
{
    options.TokenValidationParameters = new TokenValidationParameters
    {
        ValidateIssuer = true,
        ValidateAudience = true,
        ValidateLifetime = true,
        ValidateIssuerSigningKey = true,
        ValidIssuer = builder.Configuration["Jwt:Issuer"],
        ValidAudience = builder.Configuration["Jwt:Audience"],
        IssuerSigningKey = new SymmetricSecurityKey(
            Encoding.UTF8.GetBytes(builder.Configuration["Jwt:Key"]))
    };
});

// Add authorization policies
builder.Services.AddAuthorization(options =>
{
    // Simple role-based policy
    options.AddPolicy("RequireAdminRole", policy => 
        policy.RequireRole("Admin"));
    
    // Policy with multiple requirements
    options.AddPolicy("OrderCreator", policy =>
        policy.RequireAuthenticatedUser()
              .RequireClaim("Permission", "Orders.Create"));
              
    // Complex policy with custom requirements
    options.AddPolicy("CanManageProducts", policy =>
        policy.RequireAuthenticatedUser()
              .AddRequirements(new ProductManagementRequirement()));
});

// Register authorization handlers
builder.Services.AddSingleton<IAuthorizationHandler, ProductManagementHandler>();

var app = builder.Build();

// Configure the middleware pipeline
// ...

// Add authentication and authorization middleware
app.UseAuthentication();
app.UseAuthorization();

// Custom requirement and handler for authorization
public class ProductManagementRequirement : IAuthorizationRequirement
{
    // Can include properties for more complex requirements
}

public class ProductManagementHandler : AuthorizationHandler<ProductManagementRequirement>
{
    protected override Task HandleRequirementAsync(
        AuthorizationHandlerContext context,
        ProductManagementRequirement requirement)
    {
        // Check if user has admin role
        if (context.User.IsInRole("Admin"))
        {
            context.Succeed(requirement);
            return Task.CompletedTask;
        }
        
        // Check if user has specific product management claims
        if (context.User.HasClaim(c => c.Type == "Permission" && 
            (c.Value == "Products.Manage" || c.Value == "Products.Create")))
        {
            context.Succeed(requirement);
            return Task.CompletedTask;
        }
        
        return Task.CompletedTask;
    }
}

// Sample authenticated controller
[Authorize]
public class AccountController : Controller
{
    private readonly UserManager<ApplicationUser> _userManager;
    private readonly SignInManager<ApplicationUser> _signInManager;
    private readonly IEmailSender _emailSender;
    private readonly ILogger<AccountController> _logger;
    
    public AccountController(
        UserManager<ApplicationUser> userManager,
        SignInManager<ApplicationUser> signInManager,
        IEmailSender emailSender,
        ILogger<AccountController> logger)
    {
        _userManager = userManager;
        _signInManager = signInManager;
        _emailSender = emailSender;
        _logger = logger;
    }
    
    [AllowAnonymous]
    [HttpGet]
    public IActionResult Login(string returnUrl = null)
    {
        ViewData["ReturnUrl"] = returnUrl;
        return View();
    }
    
    [AllowAnonymous]
    [HttpPost]
    [ValidateAntiForgeryToken]
    public async Task<IActionResult> Login(LoginViewModel model, string returnUrl = null)
    {
        ViewData["ReturnUrl"] = returnUrl;
        
        if (ModelState.IsValid)
        {
            // Attempt to sign in
            var result = await _signInManager.PasswordSignInAsync(
                model.Email, 
                model.Password, 
                model.RememberMe, 
                lockoutOnFailure: true);
                
            if (result.Succeeded)
            {
                _logger.LogInformation("User logged in.");
                return RedirectToLocal(returnUrl);
            }
            
            if (result.RequiresTwoFactor)
            {
                return RedirectToAction(nameof(TwoFactorLogin), 
                    new { returnUrl, model.RememberMe });
            }
            
            if (result.IsLockedOut)
            {
                _logger.LogWarning("User account locked out.");
                return RedirectToAction(nameof(Lockout));
            }
            else
            {
                ModelState.AddModelError(string.Empty, "Invalid login attempt.");
                return View(model);
            }
        }
        
        return View(model);
    }
    
    [HttpPost]
    [ValidateAntiForgeryToken]
    public async Task<IActionResult> Logout()
    {
        await _signInManager.SignOutAsync();
        _logger.LogInformation("User logged out.");
        return RedirectToAction(nameof(HomeController.Index), "Home");
    }
    
    [AllowAnonymous]
    [HttpGet]
    public IActionResult Register(string returnUrl = null)
    {
        ViewData["ReturnUrl"] = returnUrl;
        return View();
    }
    
    [AllowAnonymous]
    [HttpPost]
    [ValidateAntiForgeryToken]
    public async Task<IActionResult> Register(RegisterViewModel model, string returnUrl = null)
    {
        ViewData["ReturnUrl"] = returnUrl;
        
        if (ModelState.IsValid)
        {
            var user = new ApplicationUser { UserName = model.Email, Email = model.Email };
            var result = await _userManager.CreateAsync(user, model.Password);
            
            if (result.Succeeded)
            {
                _logger.LogInformation("User created a new account with password.");

                // Add to default role
                await _userManager.AddToRoleAsync(user, "Customer");
                
                // Generate email confirmation token
                var code = await _userManager.GenerateEmailConfirmationTokenAsync(user);
                var callbackUrl = Url.EmailConfirmationLink(user.Id, code, Request.Scheme);
                
                await _emailSender.SendEmailConfirmationAsync(model.Email, callbackUrl);
                
                await _signInManager.SignInAsync(user, isPersistent: false);
                return RedirectToLocal(returnUrl);
            }
            
            foreach (var error in result.Errors)
            {
                ModelState.AddModelError(string.Empty, error.Description);
            }
        }
        
        return View(model);
    }
}

// API controller with JWT authentication
[Route("api/[controller]")]
[ApiController]
public class AuthController : ControllerBase
{
    private readonly UserManager<ApplicationUser> _userManager;
    private readonly IConfiguration _configuration;
    
    public AuthController(
        UserManager<ApplicationUser> userManager,
        IConfiguration configuration)
    {
        _userManager = userManager;
        _configuration = configuration;
    }
    
    [HttpPost("token")]
    public async Task<IActionResult> GetToken([FromBody] LoginModel login)
    {
        var user = await _userManager.FindByNameAsync(login.Username);
        
        if (user == null || !await _userManager.CheckPasswordAsync(user, login.Password))
        {
            return Unauthorized();
        }
        
        var userRoles = await _userManager.GetRolesAsync(user);
        
        var claims = new List<Claim>
        {
            new Claim(JwtRegisteredClaimNames.Sub, user.UserName),
            new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),
            new Claim(ClaimTypes.NameIdentifier, user.Id)
        };
        
        // Add roles as claims
        foreach (var role in userRoles)
        {
            claims.Add(new Claim(ClaimTypes.Role, role));
        }
        
        var key = new SymmetricSecurityKey(
            Encoding.UTF8.GetBytes(_configuration["Jwt:Key"]));
        var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);
        var expires = DateTime.Now.AddMinutes(Convert.ToDouble(
            _configuration["Jwt:ExpireMinutes"]));
        
        var token = new JwtSecurityToken(
            issuer: _configuration["Jwt:Issuer"],
            audience: _configuration["Jwt:Audience"],
            claims: claims,
            expires: expires,
            signingCredentials: creds
        );
        
        return Ok(new
        {
            token = new JwtSecurityTokenHandler().WriteToken(token),
            expiration = expires
        });
    }
}</code></pre>
        </div>

        <h4>14. Razor Pages and View Components</h4>
        <p>Razor Pages provide a simpler page-based programming model for creating server-rendered web UI compared to MVC:</p>

        <p><strong>Razor Page Basics:</strong> Core concepts of the Razor Pages model:</p>
        <ul>
          <li>Page models and handlers</li>
          <li>Razor syntax (@directives, @code blocks, etc.)</li>
          <li>Page routing and navigation</li>
          <li>Form handling and validation</li>
          <li>PageModel properties and methods</li>
        </ul>

        <p><strong>View Components:</strong> Reusable UI components:</p>
        <ul>
          <li>Creating and invoking view components</li>
          <li>Component models and views</li>
          <li>Passing parameters to components</li>
          <li>Asynchronous component initialization</li>
          <li>Component caching</li>
        </ul>

        <p><strong>Layouts and Partial Views:</strong> Building consistent UI:</p>
        <ul>
          <li>Layout pages and sections</li>
          <li>Partial views for reuse</li>
          <li>ViewData and ViewBag for passing data</li>
          <li>Tag Helpers for UI generation</li>
          <li>HTML Helper methods</li>
        </ul>
        
        <div class="code-example">
          <pre><code>// Razor Pages and View Components
// Simple Razor Page model
public class IndexModel : PageModel
{
    private readonly IProductService _productService;
    
    public IndexModel(IProductService productService)
    {
        _productService = productService;
    }
    
    public List<ProductViewModel> FeaturedProducts { get; set; }
    
    public async Task OnGetAsync()
    {
        var products = await _productService.GetFeaturedProductsAsync();
        FeaturedProducts = products.Select(p => new ProductViewModel
        {
            Id = p.Id,
            Name = p.Name,
            Description = p.Description,
            Price = p.Price,
            ImageUrl = p.ImageUrl
        }).ToList();
    }
}

// Corresponding Razor Page (Index.cshtml)
@page
@model IndexModel
@{
    ViewData["Title"] = "Home Page";
}

&lt;div class="text-center"&gt;
    &lt;h1 class="display-4"&gt;Welcome to Our Store&lt;/h1&gt;
    &lt;p&gt;Learn more about our &lt;a href="/Products"&gt;products&lt;/a&gt;.&lt;/p&gt;
&lt;/div&gt;

&lt;div class="row mt-4"&gt;
    &lt;div class="col-md-12"&gt;
        &lt;h2&gt;Featured Products&lt;/h2&gt;
    &lt;/div&gt;
&lt;/div&gt;

&lt;div class="row"&gt;
    @foreach (var product in Model.FeaturedProducts)
    {
        &lt;div class="col-md-4 mb-4"&gt;
            &lt;div class="card"&gt;
                &lt;img src="@product.ImageUrl" class="card-img-top" alt="@product.Name"&gt;
                &lt;div class="card-body"&gt;
                    &lt;h5 class="card-title"&gt;@product.Name&lt;/h5&gt;
                    &lt;p class="card-text"&gt;@product.Description&lt;/p&gt;
                    &lt;p class="card-text"&gt;
                        &lt;strong&gt;Price:&lt;/strong&gt; @product.Price.ToString("C")
                    &lt;/p&gt;
                    &lt;a asp-page="/Products/Details" asp-route-id="@product.Id" class="btn btn-primary"&gt;View Details&lt;/a&gt;
                &lt;/div&gt;
            &lt;/div&gt;
        &lt;/div&gt;
    }
&lt;/div&gt;

// Razor Page with Form Handling
public class ContactModel : PageModel
{
    private readonly IEmailService _emailService;
    private readonly ILogger<ContactModel> _logger;
    
    [BindProperty]
    public ContactFormViewModel Contact { get; set; }
    
    public string SuccessMessage { get; set; }
    
    public ContactModel(IEmailService emailService, ILogger<ContactModel> logger)
    {
        _emailService = emailService;
        _logger = logger;
    }
    
    public void OnGet()
    {
        // Initialize the form if needed
        Contact = new ContactFormViewModel();
    }
    
    public async Task<IActionResult> OnPostAsync()
    {
        if (!ModelState.IsValid)
        {
            return Page();
        }
        
        try
        {
            // Send email
            await _emailService.SendContactEmailAsync(
                Contact.Email,
                Contact.Name,
                Contact.Subject,
                Contact.Message);
                
            _logger.LogInformation("Contact form submitted by {Name} ({Email})",
                Contact.Name, Contact.Email);
                
            // Clear form and show success message
            SuccessMessage = "Thank you for your message. We'll get back to you soon!";
            Contact = new ContactFormViewModel();
            
            return Page();
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error processing contact form");
            ModelState.AddModelError(string.Empty, "There was an error sending your message. Please try again later.");
            return Page();
        }
    }
}

// View Component
public class CartSummaryViewComponent : ViewComponent
{
    private readonly IShoppingCartService _cartService;
    
    public CartSummaryViewComponent(IShoppingCartService cartService)
    {
        _cartService = cartService;
    }
    
    public async Task<IViewComponentResult> InvokeAsync()
    {
        var userId = UserClaimsPrincipal.FindFirstValue(ClaimTypes.NameIdentifier);
        
        if (string.IsNullOrEmpty(userId))
        {
            // Anonymous user - get cart from session
            return View(new CartSummaryViewModel
            {
                ItemCount = 0,
                TotalAmount = 0
            });
        }
        
        var cart = await _cartService.GetCartAsync(userId);
        
        var viewModel = new CartSummaryViewModel
        {
            ItemCount = cart.Items.Sum(i => i.Quantity),
            TotalAmount = cart.Items.Sum(i => i.Quantity * i.UnitPrice)
        };
        
        return View(viewModel);
    }
}

// View Component cshtml file (Default.cshtml in Views/Shared/Components/CartSummary)
@model CartSummaryViewModel

&lt;div class="cart-summary"&gt;
    &lt;a asp-page="/Cart/Index" class="cart-icon"&gt;
        &lt;i class="fa fa-shopping-cart"&gt;&lt;/i&gt;
        @if (Model.ItemCount &gt; 0)
        {
            &lt;span class="badge badge-pill badge-primary"&gt;@Model.ItemCount&lt;/span&gt;
        }
    &lt;/a&gt;
    @if (Model.ItemCount &gt; 0)
    {
        &lt;span class="cart-total"&gt;@Model.TotalAmount.ToString("C")&lt;/span&gt;
    }
&lt;/div&gt;

// Using the view component in a layout
&lt;div class="navbar-nav ml-auto"&gt;
    @await Component.InvokeAsync("CartSummary")
&lt;/div&gt;

// Partial view example (used for repeated content)
// _ProductCard.cshtml
@model ProductViewModel

&lt;div class="card product-card"&gt;
    &lt;img src="@Model.ImageUrl" class="card-img-top" alt="@Model.Name"&gt;
    &lt;div class="card-body"&gt;
        &lt;h5 class="card-title"&gt;@Model.Name&lt;/h5&gt;
        &lt;p class="card-text"&gt;@Model.Description&lt;/p&gt;
        &lt;p class="card-text"&gt;
            &lt;strong&gt;Price:&lt;/strong&gt; @Model.Price.ToString("C")
        &lt;/p&gt;
        &lt;div class="card-actions"&gt;
            &lt;a asp-page="/Products/Details" asp-route-id="@Model.Id" class="btn btn-info btn-sm"&gt;
                Details
            &lt;/a&gt;
            &lt;form asp-page="/Cart/AddItem" method="post"&gt;
                &lt;input type="hidden" name="productId" value="@Model.Id" /&gt;
                &lt;input type="hidden" name="quantity" value="1" /&gt;
                &lt;button type="submit" class="btn btn-primary btn-sm"&gt;
                    Add to Cart
                &lt;/button&gt;
            &lt;/form&gt;
        &lt;/div&gt;
    &lt;/div&gt;
&lt;/div&gt;

&lt;div class="row"&gt;
    @foreach (var product in Model.Products)
    {
        &lt;div class="col-md-4 mb-4"&gt;
            &lt;partial name="_ProductCard" model="product" /&gt;
        &lt;/div&gt;
    }
&lt;/div&gt;

// Tag Helper example
public class PaginationTagHelper : TagHelper
{
    public int PageIndex { get; set; }
    public int TotalPages { get; set; }
    public string PageAction { get; set; }
    public Dictionary<string, string> RouteData { get; set; }
    
    [HtmlAttributeNotBound]
    [ViewContext]
    public ViewContext ViewContext { get; set; }
    
    public override void Process(TagHelperContext context, TagHelperOutput output)
    {
        output.TagName = "div";
        output.Attributes.Add("class", "pagination-container");
        
        // Create pagination UI
        var ul = new TagBuilder("ul");
        ul.AddCssClass("pagination");
        
        // Previous button
        ul.InnerHtml.AppendHtml(CreatePaginationItem(PageIndex - 1, "Previous", PageIndex <= 1));
        
        // Page numbers
        for (int i = 1; i <= TotalPages; i++)
        {
            ul.InnerHtml.AppendHtml(CreatePaginationItem(i, i.ToString(), false, i == PageIndex));
        }
        
        // Next button
        ul.InnerHtml.AppendHtml(CreatePaginationItem(PageIndex + 1, "Next", PageIndex >= TotalPages));
        
        output.Content.AppendHtml(ul);
    }
    
    private TagBuilder CreatePaginationItem(int pageNumber, string text, bool disabled, bool active = false)
    {
        var li = new TagBuilder("li");
        li.AddCssClass("page-item");
        
        if (disabled)
        {
            li.AddCssClass("disabled");
        }
        
        if (active)
        {
            li.AddCssClass("active");
        }
        
        var a = new TagBuilder("a");
        a.AddCssClass("page-link");
        
        if (!disabled)
        {
            a.Attributes["href"] = CreatePageUrl(pageNumber);
        }
        else
        {
            a.Attributes["tabindex"] = "-1";
        }
        
        a.InnerHtml.Append(text);
        
        li.InnerHtml.AppendHtml(a);
        return li;
    }
    
    private string CreatePageUrl(int pageNumber)
    {
        var urlHelper = new UrlHelper(ViewContext);
        
        var routeValues = new RouteValueDictionary(RouteData)
        {
            { "pageIndex", pageNumber }
        };
        
        return urlHelper.Page(PageAction, routeValues);
    }
}</code></pre>
        </div>

        <h4>15. Data Validation and Model Binding</h4>
        <p>Data validation ensures data integrity, while model binding simplifies mapping HTTP request data to C# objects:</p>

        <p><strong>Data Annotations:</strong> Declarative validation attributes:</p>
        <ul>
          <li>Required, StringLength, Range, RegularExpression</li>
          <li>Custom validation attributes</li>
          <li>Validation groups and contexts</li>
          <li>Error messages and localization</li>
        </ul>

        <p><strong>Model Binding:</strong> Mapping request data to model objects:</p>
        <ul>
          <li>Default model binding mechanisms</li>
          <li>Binding sources (Body, Form, Query, Route, etc.)</li>
          <li>Custom model binders</li>
          <li>Complex type and collection binding</li>
        </ul>

        <p><strong>FluentValidation:</strong> Alternative approach to validation:</p>
        <ul>
          <li>Validation rules in code</li>
          <li>Complex conditional validation</li>
          <li>Custom validators</li>
          <li>Integration with ASP.NET Core</li>
        </ul>
        
        <div class="code-example">
          <pre><code>// Data Validation and Model Binding
// Model with Data Annotations
public class ProductCreateDto
{
    [Required(ErrorMessage = "Product name is required")]
    [StringLength(100, MinimumLength = 3, ErrorMessage = "Name must be between 3 and 100 characters")]
    public string Name { get; set; }
    
    [StringLength(500, ErrorMessage = "Description cannot exceed 500 characters")]
    public string Description { get; set; }
    
    [Required(ErrorMessage = "Price is required")]
    [Range(0.01, 10000, ErrorMessage = "Price must be between {1} and {2}")]
    public decimal Price { get; set; }
    
    [Required(ErrorMessage = "SKU is required")]
    [RegularExpression(@"^[A-Z]{2}\\d{4}$", ErrorMessage = "SKU must be in format: XX0000")]
    public string Sku { get; set; }
    
    [Display(Name = "Available")]
    public bool IsAvailable { get; set; }
    
    [Required(ErrorMessage = "Category is required")]
    [Range(1, int.MaxValue, ErrorMessage = "Please select a valid category")]
    public int CategoryId { get; set; }
}

// Custom Validation Attribute
public class FutureDateAttribute : ValidationAttribute
{
    public FutureDateAttribute()
    {
        ErrorMessage = "Date must be in the future";
    }
    
    public override bool IsValid(object value)
    {
        if (value == null)
            return true;
            
        if (value is DateTime date)
        {
            return date > DateTime.Now;
        }
        
        return false;
    }
}

// Using the custom attribute
public class EventDto
{
    [Required]
    public string Title { get; set; }
    
    [Required]
    [FutureDate]
    public DateTime EventDate { get; set; }
}

// Fluent Validation
public class ProductValidator : AbstractValidator<ProductCreateDto>
{
    public ProductValidator(IProductRepository productRepository)
    {
        RuleFor(p => p.Name)
            .NotEmpty().WithMessage("Product name is required")
            .Length(3, 100).WithMessage("Name must be between 3 and 100 characters")
            .MustAsync(async (name, cancellation) => 
            {
                // Check if name is unique
                var exists = await productRepository.ProductExistsByNameAsync(name);
                return !exists;
            }).WithMessage("A product with this name already exists");
            
        RuleFor(p => p.Description)
            .MaximumLength(500).WithMessage("Description cannot exceed 500 characters");
            
        RuleFor(p => p.Price)
            .NotEmpty().WithMessage("Price is required")
            .GreaterThan(0).WithMessage("Price must be greater than 0")
            .LessThanOrEqualTo(10000).WithMessage("Price cannot exceed 10,000");
            
        RuleFor(p => p.Sku)
            .NotEmpty().WithMessage("SKU is required")
            .Matches(@"^[A-Z]{2}\\d{4}$").WithMessage("SKU must be in format: XX0000")
            .MustAsync(async (sku, cancellation) => 
            {
                // Check if SKU is unique
                var exists = await productRepository.ProductExistsBySkuAsync(sku);
                return !exists;
            }).WithMessage("A product with this SKU already exists");
            
        RuleFor(p => p.CategoryId)
            .NotEmpty().WithMessage("Category is required")
            .MustAsync(async (id, cancellation) => 
            {
                // Check if category exists
                var exists = await productRepository.CategoryExistsAsync(id);
                return exists;
            }).WithMessage("Selected category does not exist");
    }
}

// Registering FluentValidation
public void ConfigureServices(IServiceCollection services)
{
    // Register validator
    services.AddScoped<IValidator<ProductCreateDto>, ProductValidator>();
    
    // Add FluentValidation to MVC
    services.AddControllers()
        .AddFluentValidation(fv => 
        {
            fv.RegisterValidatorsFromAssemblyContaining<ProductValidator>();
            fv.ImplicitlyValidateChildProperties = true;
        });
}

// Model Binding Example
[Route("api/[controller]")]
[ApiController]
public class ProductsController : ControllerBase
{
    // Basic model binding from request body
    [HttpPost]
    public async Task<IActionResult> Create([FromBody] ProductCreateDto product)
    {
        // ModelState.IsValid is checked automatically with [ApiController]
        // ...
    }
    
    // Complex model binding from multiple sources
    [HttpPut("{id}")]
    public async Task<IActionResult> Update(
        [FromRoute] int id,               // From route parameter
        [FromBody] ProductUpdateDto product, // From request body
        [FromHeader(Name = "X-Version")] string version) // From header
    {
        if (id != product.Id)
        {
            return BadRequest("ID mismatch");
        }
        
        // ...
    }
    
    // Model binding for arrays and collections
    [HttpPost("batch")]
    public async Task<IActionResult> CreateBatch(
        [FromBody] List<ProductCreateDto> products)
    {
        // ...
    }
    
    // Form data with file upload
    [HttpPost("withimage")]
    public async Task<IActionResult> CreateWithImage(
        [FromForm] ProductCreateDto product,
        [FromForm] IFormFile image)
    {
        if (image != null && image.Length > 0)
        {
            // Process image
            // ...
        }
        
        // ...
    }
    
    // Query string parameters
    [HttpGet("search")]
    public async Task<IActionResult> Search(
        [FromQuery] string term,
        [FromQuery] int? categoryId,
        [FromQuery] decimal? minPrice,
        [FromQuery] decimal? maxPrice,
        [FromQuery] bool? inStock,
        [FromQuery] int page = 1,
        [FromQuery] int pageSize = 10)
    {
        // ...
    }
}

// Custom Model Binder
public class CommaSeparatedArrayModelBinder : IModelBinder
{
    public Task BindModelAsync(ModelBindingContext bindingContext)
    {
        if (bindingContext == null)
            throw new ArgumentNullException(nameof(bindingContext));
            
        // Get the value from value provider
        var valueProviderResult = bindingContext.ValueProvider.GetValue(bindingContext.ModelName);
        
        if (valueProviderResult == ValueProviderResult.None)
            return Task.CompletedTask;
            
        bindingContext.ModelState.SetModelValue(bindingContext.ModelName, valueProviderResult);
        
        var value = valueProviderResult.FirstValue;
        
        if (string.IsNullOrEmpty(value))
            return Task.CompletedTask;
            
        // Split the comma-separated string
        var elementType = bindingContext.ModelType.GetElementType() ?? 
                         bindingContext.ModelType.GetGenericArguments()[0];
        var values = value.Split(',', StringSplitOptions.RemoveEmptyEntries);
        
        try
        {
            var typedValues = Array.CreateInstance(elementType, values.Length);
            var converter = TypeDescriptor.GetConverter(elementType);
            
            for (int i = 0; i < values.Length; i++)
            {
                var typedValue = converter.ConvertFromString(values[i].Trim());
                typedValues.SetValue(typedValue, i);
            }
            
            bindingContext.Result = ModelBindingResult.Success(typedValues);
        }
        catch (Exception ex)
        {
            bindingContext.ModelState.TryAddModelError(
                bindingContext.ModelName,
                $"Could not convert comma-separated string to array. {ex.Message}"
            );
        }
        
        return Task.CompletedTask;
    }
}

// Using the custom model binder
[HttpGet("filter")]
public async Task<IActionResult> Filter(
    [ModelBinder(BinderType = typeof(CommaSeparatedArrayModelBinder))]
    int[] categoryIds)
{
    // Handles requests like: /api/products/filter?categoryIds=1,2,3
}</code></pre>
        </div>

        <h4>16. Background Services and Scheduled Tasks</h4>
        <p>Background services perform work that doesn't need to be part of the HTTP request-response cycle:</p>

        <p><strong>Hosted Services:</strong> Services that run in the background:</p>
        <ul>
          <li>IHostedService and BackgroundService</li>
          <li>Startup and shutdown events</li>
          <li>Scoped services in hosted services</li>
          <li>Long-running operations</li>
        </ul>

        <p><strong>Task Scheduling:</strong> Running jobs on a schedule:</p>
        <ul>
          <li>Cron-based scheduling</li>
          <li>Interval-based execution</li>
          <li>Fire-and-forget tasks</li>
          <li>Integration with third-party schedulers (Quartz.NET, Hangfire)</li>
        </ul>

        <p><strong>Message Queues:</strong> Background processing with queues:</p>
        <ul>
          <li>Message producers and consumers</li>
          <li>Queue-based processing</li>
          <li>Retry strategies</li>
          <li>Distributed processing</li>
        </ul>
        
        <div class="code-example">
          <pre><code>// Background Services and Scheduled Tasks
// Basic Hosted Service
public class DataSyncService : BackgroundService
{
    private readonly ILogger<DataSyncService> _logger;
    private readonly IServiceProvider _serviceProvider;
    private readonly TimeSpan _interval = TimeSpan.FromMinutes(15);
    
    public DataSyncService(
        ILogger<DataSyncService> logger,
        IServiceProvider serviceProvider)
    {
        _logger = logger;
        _serviceProvider = serviceProvider;
    }
    
    protected override async Task ExecuteAsync(CancellationToken stoppingToken)
    {
        _logger.LogInformation("Data Sync Service is starting");
        
        while (!stoppingToken.IsCancellationRequested)
        {
            _logger.LogInformation("Data Sync Service is running");
            
            try
            {
                await SyncDataAsync(stoppingToken);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error occurred while syncing data");
            }
            
            _logger.LogInformation("Data Sync completed. Waiting for next interval");
            
            // Wait for the next interval or until the app stops
            await Task.Delay(_interval, stoppingToken);
        }
        
        _logger.LogInformation("Data Sync Service is stopping");
    }
    
    private async Task SyncDataAsync(CancellationToken stoppingToken)
    {
        // Create a scope to resolve scoped services
        using (var scope = _serviceProvider.CreateScope())
        {
            // Get required services
            var syncService = scope.ServiceProvider.GetRequiredService<IDataSyncService>();
            var dbContext = scope.ServiceProvider.GetRequiredService<ApplicationDbContext>();
            
            // Perform the sync operation
            await syncService.SyncExternalDataAsync(stoppingToken);
        }
    }
}

// Cron-based Scheduled Task (using Quartz.NET)
[DisallowConcurrentExecution]
public class DatabaseBackupJob : IJob
{
    private readonly ILogger<DatabaseBackupJob> _logger;
    private readonly IBackupService _backupService;
    
    public DatabaseBackupJob(
        ILogger<DatabaseBackupJob> logger,
        IBackupService backupService)
    {
        _logger = logger;
        _backupService = backupService;
    }
    
    public async Task Execute(IJobExecutionContext context)
    {
        _logger.LogInformation("Starting database backup job at {time}", DateTime.Now);
        
        try
        {
            await _backupService.CreateBackupAsync();
            _logger.LogInformation("Database backup completed successfully");
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error during database backup");
            
            // Log to monitoring system or notify admin
            throw;
        }
    }
}

// Quartz.NET Configuration
public static class QuartzExtensions
{
    public static IServiceCollection AddQuartzJobs(this IServiceCollection services)
    {
        services.AddQuartz(q =>
        {
            // Register job
            q.AddJob<DatabaseBackupJob>(j => j
                .WithIdentity("DatabaseBackupJob"));
                
            // Create a trigger for the job
            q.AddTrigger(t => t
                .ForJob("DatabaseBackupJob")
                .WithIdentity("DatabaseBackupTrigger")
                .WithCronSchedule("0 0 2 * * ?")); // Run at 2:00 AM every day
                
            // Configure queues, persistence, etc.
            q.UseMicrosoftDependencyInjectionJobFactory();
        });
        
        // Add Quartz.NET hosted service
        services.AddQuartzHostedService(q => q.WaitForJobsToComplete = true);
        
        return services;
    }
}

// Queue-based Background Worker (using IHostedService)
public class EmailQueueWorker : BackgroundService
{
    private readonly ILogger<EmailQueueWorker> _logger;
    private readonly IServiceProvider _serviceProvider;
    private readonly IEmailQueue _emailQueue;
    
    public EmailQueueWorker(
        ILogger<EmailQueueWorker> logger,
        IServiceProvider serviceProvider,
        IEmailQueue emailQueue)
    {
        _logger = logger;
        _serviceProvider = serviceProvider;
        _emailQueue = emailQueue;
    }
    
    protected override async Task ExecuteAsync(CancellationToken stoppingToken)
    {
        _logger.LogInformation("Email Queue Worker started");
        
        while (!stoppingToken.IsCancellationRequested)
        {
            EmailMessage email = null;
            
            try
            {
                // Dequeue email message (wait if queue is empty)
                email = await _emailQueue.DequeueAsync(stoppingToken);
                
                if (email != null)
                {
                    // Process the message
                    _logger.LogInformation("Processing email to {recipient}", email.To);
                    
                    using (var scope = _serviceProvider.CreateScope())
                    {
                        var emailSender = scope.ServiceProvider.GetRequiredService<IEmailSender>();
                        await emailSender.SendEmailAsync(
                            email.To,
                            email.Subject,
                            email.Body,
                            email.IsHtml);
                    }
                    
                    _logger.LogInformation("Email to {recipient} sent successfully", email.To);
                }
            }
            catch (OperationCanceledException)
            {
                // Cancellation requested, exit gracefully
                break;
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error processing email message");
                
                if (email != null)
                {
                    // Handle failure (retry or move to dead letter queue)
                    if (email.RetryCount < 3)
                    {
                        email.RetryCount++;
                        await _emailQueue.EnqueueAsync(email);
                        _logger.LogWarning("Email requeued for retry ({retryCount}/3)", email.RetryCount);
                    }
                    else
                    {
                        _logger.LogError("Email to {recipient} failed after 3 retries", email.To);
                        // Move to dead letter queue or log for manual processing
                    }
                }
            }
        }
        
        _logger.LogInformation("Email Queue Worker stopped");
    }
}

// Queue Service Implementation
public interface IEmailQueue
{
    Task EnqueueAsync(EmailMessage email);
    Task<EmailMessage> DequeueAsync(CancellationToken cancellationToken);
}

public class InMemoryEmailQueue : IEmailQueue
{
    private readonly Channel<EmailMessage> _channel;
    
    public InMemoryEmailQueue()
    {
        // Create unbounded channel for email messages
        _channel = Channel.CreateUnbounded<EmailMessage>();
    }
    
    public async Task EnqueueAsync(EmailMessage email)
    {
        if (email == null) throw new ArgumentNullException(nameof(email));
        
        await _channel.Writer.WriteAsync(email);
    }
    
    public async Task<EmailMessage> DequeueAsync(CancellationToken cancellationToken)
    {
        try
        {
            return await _channel.Reader.ReadAsync(cancellationToken);
        }
        catch (ChannelClosedException)
        {
            return null;
        }
    }
}</code></pre>
        </div>

        <h4>17. Logging and Monitoring</h4>
        <p>Effective logging and monitoring are essential for diagnosing issues and understanding application behavior:</p>

        <p><strong>Logging Framework:</strong> Core logging concepts:</p>
        <ul>
          <li>ILogger and LoggerFactory</li>
          <li>Log levels and filtering</li>
          <li>Structured logging</li>
          <li>Log providers (Console, Debug, File, etc.)</li>
          <li>Third-party integrations (Serilog, NLog, etc.)</li>
        </ul>

        <p><strong>Application Insights:</strong> Telemetry and monitoring:</p>
        <ul>
          <li>Dependency tracking</li>
          <li>Performance monitoring</li>
          <li>Exception tracking</li>
          <li>Custom telemetry</li>
          <li>Live metrics and dashboards</li>
        </ul>

        <p><strong>Health Checks:</strong> Monitoring application health:</p>
        <ul>
          <li>Basic health checks</li>
          <li>Database health checks</li>
          <li>Custom health checks</li>
          <li>Health check UI</li>
        </ul>
        
        <div class="code-example">
          <pre><code>// Logging and Monitoring
// Configure logging in Program.cs
public static IHostBuilder CreateHostBuilder(string[] args) =>
    Host.CreateDefaultBuilder(args)
        .ConfigureLogging((hostContext, logging) =>
        {
            logging.ClearProviders();
            logging.AddConsole();
            logging.AddDebug();
            
            // Add Application Insights logging
            if (!hostContext.HostingEnvironment.IsDevelopment())
            {
                logging.AddApplicationInsights(hostContext.Configuration["ApplicationInsights:InstrumentationKey"]);
            }
            
            // Configure log levels
            logging.AddFilter("Microsoft", LogLevel.Warning)
                   .AddFilter("System", LogLevel.Warning)
                   .AddFilter("MyApp", LogLevel.Information);
        })
        .ConfigureWebHostDefaults(webBuilder =>
        {
            webBuilder.UseStartup<Startup>();
        });

// Using Serilog
public static IHostBuilder CreateHostBuilder(string[] args) =>
    Host.CreateDefaultBuilder(args)
        .UseSerilog((hostingContext, loggerConfiguration) =>
        {
            loggerConfiguration
                .ReadFrom.Configuration(hostingContext.Configuration)
                .Enrich.FromLogContext()
                .Enrich.WithProperty("Environment", hostingContext.HostingEnvironment.EnvironmentName)
                .Enrich.WithMachineName()
                .WriteTo.Console()
                .WriteTo.File(
                    "logs/log-.txt", 
                    rollingInterval: RollingInterval.Day,
                    rollOnFileSizeLimit: true)
                .WriteTo.ApplicationInsights(
                    hostingContext.Configuration["ApplicationInsights:InstrumentationKey"], 
                    TelemetryConverter.Traces);
        })
        .ConfigureWebHostDefaults(webBuilder =>
        {
            webBuilder.UseStartup<Startup>();
        });

// Using ILogger in a service
public class ProductService
{
    private readonly ILogger<ProductService> _logger;
    private readonly IProductRepository _repository;
    
    public ProductService(
        ILogger<ProductService> logger,
        IProductRepository repository)
    {
        _logger = logger;
        _repository = repository;
    }
    
    public async Task<ProductDto> GetProductByIdAsync(int id)
    {
        _logger.LogInformation("Getting product with ID {ProductId}", id);
        
        try
        {
            var product = await _repository.GetByIdAsync(id);
            
            if (product == null)
            {
                _logger.LogWarning("Product with ID {ProductId} not found", id);
                return null;
            }
            
            _logger.LogDebug("Retrieved product {ProductName} (ID: {ProductId})", 
                product.Name, product.Id);
                
            return new ProductDto
            {
                Id = product.Id,
                Name = product.Name,
                // other properties...
            };
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error retrieving product with ID {ProductId}", id);
            throw;
        }
    }
}

// Structured logging with scopes
public async Task<IEnumerable<ProductDto>> GetProductsByCategoryAsync(int categoryId)
{
    using (_logger.BeginScope("Category processing {CategoryId}", categoryId))
    {
        _logger.LogInformation("Retrieving products for category");
        
        try
        {
            var products = await _repository.GetByCategoryAsync(categoryId);
            
            _logger.LogInformation("Found {ProductCount} products in category {CategoryId}", 
                products.Count(), categoryId);
                
            return products.Select(p => new ProductDto
            {
                Id = p.Id,
                Name = p.Name,
                // other properties...
            });
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error retrieving products for category {CategoryId}", 
                categoryId);
            throw;
        }
    }
}

// Application Insights Integration
public void ConfigureServices(IServiceCollection services)
{
    // Add Application Insights
    services.AddApplicationInsightsTelemetry(Configuration["ApplicationInsights:InstrumentationKey"]);
    
    // Other services...
}

// Custom Application Insights Telemetry
public async Task ProcessOrderAsync(Order order)
{
    var startTime = DateTime.UtcNow;
    var stopwatch = Stopwatch.StartNew();
    var success = false;
    
    // Get the telemetry client
    var telemetry = _serviceProvider.GetService<TelemetryClient>();
    
    try
    {
        // Process the order
        await _orderProcessor.ProcessAsync(order);
        success = true;
    }
    catch (Exception ex)
    {
        _logger.LogError(ex, "Error processing order {OrderId}", order.Id);
        throw;
    }
    finally
    {
        stopwatch.Stop();
        
        // Track custom event with properties and metrics
        telemetry.TrackEvent("OrderProcessed", 
            new Dictionary<string, string>
            {
                { "OrderId", order.Id.ToString() },
                { "CustomerId", order.CustomerId },
                { "Success", success.ToString() }
            },
            new Dictionary<string, double>
            {
                { "OrderAmount", order.TotalAmount },
                { "ProcessingTime", stopwatch.ElapsedMilliseconds }
            });
    }
}

// Health Checks
public void ConfigureServices(IServiceCollection services)
{
    // Add health checks
    services.AddHealthChecks()
        // Basic check (just reports if the app is running)
        .AddCheck("self", () => HealthCheckResult.Healthy())
        
        // Database check
        .AddDbContextCheck<ApplicationDbContext>(
            name: "database",
            failureStatus: HealthStatus.Degraded)
            
        // External API check
        .AddUrlCheck(
            "https://api.external-service.com/health",
            name: "external-api",
            failureStatus: HealthStatus.Degraded)
            
        // Custom check
        .AddCheck<StorageHealthCheck>(
            "storage-check",
            failureStatus: HealthStatus.Unhealthy,
            tags: new[] { "storage" });
            
    // Add health check UI
    services.AddHealthChecksUI()
        .AddInMemoryStorage();
}

public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
{
    // Other middleware...
    
    // Map health check endpoints
    app.UseHealthChecks("/health", new HealthCheckOptions
    {
        ResponseWriter = UIResponseWriter.WriteHealthCheckUIResponse
    });
    
    app.UseHealthChecks("/health/live", new HealthCheckOptions
    {
        Predicate = _ => true,
        ResponseWriter = UIResponseWriter.WriteHealthCheckUIResponse
    });
    
    app.UseHealthChecks("/health/ready", new HealthCheckOptions
    {
        Predicate = reg => reg.Tags.Contains("ready"),
        ResponseWriter = UIResponseWriter.WriteHealthCheckUIResponse
    });
    
    // Map health check UI
    app.UseHealthChecksUI(options =>
    {
        options.UIPath = "/health-ui";
    });
}

// Custom health check
public class StorageHealthCheck : IHealthCheck
{
    private readonly IStorageService _storageService;
    
    public StorageHealthCheck(IStorageService storageService)
    {
        _storageService = storageService;
    }
    
    public async Task<HealthCheckResult> CheckHealthAsync(
        HealthCheckContext context, 
        CancellationToken cancellationToken = default)
    {
        try
        {
            // Try to access storage
            var isAvailable = await _storageService.IsAvailableAsync();
            
            if (isAvailable)
            {
                return HealthCheckResult.Healthy("Storage is accessible");
            }
            
            return HealthCheckResult.Degraded("Storage is slow or partially available");
        }
        catch (Exception ex)
        {
            return HealthCheckResult.Unhealthy("Storage is not accessible", ex);
        }
    }
}</code></pre>
        </div>

        <h4>18. Testing in .NET</h4>
        <p>Testing ensures that code works as expected and catches regressions before they reach production:</p>

        <p><strong>Unit Testing:</strong> Testing individual components in isolation:</p>
        <ul>
          <li>Test frameworks (MSTest, xUnit, NUnit)</li>
          <li>Assertions and test organization</li>
          <li>Mocking frameworks (Moq, NSubstitute)</li>
          <li>Test setup and teardown</li>
          <li>Code coverage analysis</li>
        </ul>

        <p><strong>Integration Testing:</strong> Testing component interactions:</p>
        <ul>
          <li>TestServer and WebApplicationFactory</li>
          <li>In-memory database testing</li>
          <li>API testing</li>
          <li>Dependency configuration</li>
        </ul>

        <p><strong>Other Testing Types:</strong> Additional testing approaches:</p>
        <ul>
          <li>Behavior-Driven Development (BDD)</li>
          <li>End-to-end testing</li>
          <li>Performance testing</li>
          <li>Load testing</li>
        </ul>
        
        <div class="code-example">
          <pre><code>// Testing in .NET
// Unit Testing Example (xUnit)
public class ProductServiceTests
{
    private readonly Mock<IProductRepository> _mockRepository;
    private readonly Mock<ILogger<ProductService>> _mockLogger;
    private readonly ProductService _service;
    
    public ProductServiceTests()
    {
        // Setup mocks
        _mockRepository = new Mock<IProductRepository>();
        _mockLogger = new Mock<ILogger<ProductService>>();
        
        // Create instance of the service with mocked dependencies
        _service = new ProductService(_mockRepository.Object, _mockLogger.Object);
    }
    
    [Fact]
    public async Task GetProductByIdAsync_ExistingProduct_ReturnsProduct()
    {
        // Arrange
        int productId = 1;
        var product = new Product 
        { 
            Id = productId, 
            Name = "Test Product", 
            Price = 19.99m,
            IsAvailable = true
        };
        
        _mockRepository.Setup(repo => repo.GetByIdAsync(productId))
            .ReturnsAsync(product);
        
        // Act
        var result = await _service.GetProductByIdAsync(productId);
        
        // Assert
        Assert.NotNull(result);
        Assert.Equal(productId, result.Id);
        Assert.Equal("Test Product", result.Name);
        Assert.Equal(19.99m, result.Price);
        Assert.True(result.IsAvailable);
        
        // Verify repository was called with correct ID
        _mockRepository.Verify(repo => repo.GetByIdAsync(productId), Times.Once);
    }
    
    [Fact]
    public async Task GetProductByIdAsync_NonExistingProduct_ReturnsNull()
    {
        // Arrange
        int productId = 99;
        
        _mockRepository.Setup(repo => repo.GetByIdAsync(productId))
            .ReturnsAsync((Product)null);
        
        // Act
        var result = await _service.GetProductByIdAsync(productId);
        
        // Assert
        Assert.Null(result);
        
        // Verify repository was called with correct ID
        _mockRepository.Verify(repo => repo.GetByIdAsync(productId), Times.Once);
        
        // Verify that warning was logged
        _mockLogger.Verify(
            x => x.Log(
                LogLevel.Warning,
                It.IsAny<EventId>(),
                It.Is<It.IsAnyType>((o, t) => o.ToString().Contains("not found")),
                null,
                It.IsAny<Func<It.IsAnyType, Exception, string>>()),
            Times.Once);
    }
    
    [Theory]
    [InlineData(0)]
    [InlineData(-1)]
    [InlineData(-100)]
    public async Task GetProductByIdAsync_InvalidId_ThrowsArgumentException(int invalidId)
    {
        // Act & Assert
        await Assert.ThrowsAsync<ArgumentException>(() => 
            _service.GetProductByIdAsync(invalidId));
    }
    
    [Fact]
    public async Task CreateProductAsync_ValidProduct_ReturnsCreatedProduct()
    {
        // Arrange
        var createDto = new ProductCreateDto
        {
            Name = "New Product",
            Price = 29.99m,
            CategoryId = 1
        };
        
        var createdProduct = new Product
        {
            Id = 1,
            Name = createDto.Name,
            Price = createDto.Price,
            CategoryId = createDto.CategoryId
        };
        
        _mockRepository.Setup(repo => repo.AddAsync(It.IsAny<Product>()))
            .ReturnsAsync(1)
            .Callback<Product>(p => {
                p.Id = 1; // Simulate database setting the ID
            });
        
        // Act
        var result = await _service.CreateProductAsync(createDto);
        
        // Assert
        Assert.NotNull(result);
        Assert.Equal(1, result.Id);
        Assert.Equal(createDto.Name, result.Name);
        Assert.Equal(createDto.Price, result.Price);
        
        _mockRepository.Verify(repo => repo.AddAsync(It.IsAny<Product>()), Times.Once);
    }
}

// Integration Testing with TestServer
public class ProductControllerIntegrationTests : IClassFixture<WebApplicationFactory<Startup>>
{
    private readonly WebApplicationFactory<Startup> _factory;
    private readonly HttpClient _client;
    
    public ProductControllerIntegrationTests(WebApplicationFactory<Startup> factory)
    {
        _factory = factory.WithWebHostBuilder(builder =>
        {
            builder.ConfigureServices(services =>
            {
                // Remove the real DbContext
                var descriptor = services.SingleOrDefault(
                    d => d.ServiceType == typeof(DbContextOptions<ApplicationDbContext>));
                
                if (descriptor != null)
                {
                    services.Remove(descriptor);
                }
                
                // Add in-memory database
                services.AddDbContext<ApplicationDbContext>(options =>
                {
                    options.UseInMemoryDatabase("TestDatabase");
                });
                
                // Build the service provider
                var sp = services.BuildServiceProvider();
                
                // Create a scope to get scoped services
                using (var scope = sp.CreateScope())
                {
                    var scopedServices = scope.ServiceProvider;
                    var db = scopedServices.GetRequiredService<ApplicationDbContext>();
                    
                    // Ensure database is created
                    db.Database.EnsureCreated();
                    
                    // Seed test data
                    SeedTestData(db);
                }
            });
        });
        
        _client = _factory.CreateClient();
    }
    
    private void SeedTestData(ApplicationDbContext db)
    {
        // Add test categories
        db.Categories.Add(new Category { Id = 1, Name = "Electronics" });
        db.Categories.Add(new Category { Id = 2, Name = "Clothing" });
        
        // Add test products
        db.Products.Add(new Product 
        { 
            Id = 1, 
            Name = "Laptop", 
            Description = "Powerful laptop", 
            Price = 999.99m, 
            CategoryId = 1,
            IsAvailable = true
        });
        
        db.Products.Add(new Product 
        { 
            Id = 2, 
            Name = "T-Shirt", 
            Description = "Cotton t-shirt", 
            Price = 19.99m, 
            CategoryId = 2,
            IsAvailable = true
        });
        
        db.SaveChanges();
    }
    
    [Fact]
    public async Task GetProducts_ReturnsSuccessStatusCode()
    {
        // Arrange & Act
        var response = await _client.GetAsync("/api/products");
        
        // Assert
        response.EnsureSuccessStatusCode();
        Assert.Equal("application/json; charset=utf-8", 
            response.Content.Headers.ContentType.ToString());
    }
    
    [Fact]
    public async Task GetProducts_ReturnsExpectedProducts()
    {
        // Arrange & Act
        var response = await _client.GetAsync("/api/products");
        
        // Assert
        response.EnsureSuccessStatusCode();
        
        var content = await response.Content.ReadAsStringAsync();
        var products = JsonSerializer.Deserialize<List<ProductDto>>(content, 
            new JsonSerializerOptions { PropertyNameCaseInsensitive = true });
        
        Assert.NotNull(products);
        Assert.Equal(2, products.Count);
        Assert.Contains(products, p => p.Name == "Laptop");
        Assert.Contains(products, p => p.Name == "T-Shirt");
    }
    
    [Fact]
    public async Task GetProduct_WithValidId_ReturnsProduct()
    {
        // Arrange & Act
        var response = await _client.GetAsync("/api/products/1");
        
        // Assert
        response.EnsureSuccessStatusCode();
        
        var content = await response.Content.ReadAsStringAsync();
        var product = JsonSerializer.Deserialize<ProductDto>(content, 
            new JsonSerializerOptions { PropertyNameCaseInsensitive = true });
        
        Assert.NotNull(product);
        Assert.Equal(1, product.Id);
        Assert.Equal("Laptop", product.Name);
        Assert.Equal(999.99m, product.Price);
    }
    
    [Fact]
    public async Task GetProduct_WithInvalidId_Returns404()
    {
        // Arrange & Act
        var response = await _client.GetAsync("/api/products/999");
        
        // Assert
        Assert.Equal(HttpStatusCode.NotFound, response.StatusCode);
    }
    
    [Fact]
    public async Task CreateProduct_WithValidData_ReturnsCreatedProduct()
    {
        // Arrange
        var newProduct = new ProductCreateDto
        {
            Name = "Smartphone",
            Description = "Latest model",
            Price = 699.99m,
            CategoryId = 1,
            IsAvailable = true
        };
        
        var content = new StringContent(
            JsonSerializer.Serialize(newProduct),
            Encoding.UTF8,
            "application/json");
        
        // Act
        var response = await _client.PostAsync("/api/products", content);
        
        // Assert
        response.EnsureSuccessStatusCode();
        Assert.Equal(HttpStatusCode.Created, response.StatusCode);
        
        var responseContent = await response.Content.ReadAsStringAsync();
        var createdProduct = JsonSerializer.Deserialize<ProductDto>(responseContent, 
            new JsonSerializerOptions { PropertyNameCaseInsensitive = true });
        
        Assert.NotNull(createdProduct);
        Assert.NotEqual(0, createdProduct.Id);
        Assert.Equal("Smartphone", createdProduct.Name);
        Assert.Equal(699.99m, createdProduct.Price);
        
        // Verify Location header
        Assert.NotNull(response.Headers.Location);
        Assert.Contains($"/api/products/{createdProduct.Id}", 
            response.Headers.Location.ToString());
    }
}</code></pre>
        </div>
        
        <div class="interview-tip">
          <p><span class="interview-icon">🎯</span> <strong>Interview Focus:</strong> For application development, expect questions about architectural patterns, middleware configuration, and best practices for MVC and Web API development. Interviewers often ask about dependency injection, authentication mechanisms, and how to structure an application for maintainability.</p>
          <p>Common interview questions include:</p>
          <ul>
            <li>"Explain the middleware pipeline in ASP.NET Core and the order of middleware components"</li>
            <li>"How would you implement role-based authorization in an ASP.NET Core application?"</li>
            <li>"Explain Entity Framework Core's DbContext lifecycle and potential issues with its usage"</li>
            <li>"What's the difference between Razor Pages and MVC?"</li>
            <li>"How would you design a RESTful API for a complex domain?"</li>
          </ul>
        </div>
      `,
          codeExample: `// ASP.NET Core Web API Project Structure
// Example of a well-organized Web API project

// Program.cs - Application entry point
public class Program
{
    public static void Main(string[] args)
    {
        CreateHostBuilder(args).Build().Run();
    }

    public static IHostBuilder CreateHostBuilder(string[] args) =>
        Host.CreateDefaultBuilder(args)
            .ConfigureWebHostDefaults(webBuilder =>
            {
                webBuilder.UseStartup<Startup>();
            })
            .ConfigureLogging((hostingContext, logging) =>
            {
                logging.ClearProviders();
                logging.AddConsole();
                logging.AddDebug();
                logging.AddEventSourceLogger();
                
                if (!hostingContext.HostingEnvironment.IsDevelopment())
                {
                    logging.AddEventLog();
                }
            })
            .UseSerilog((hostingContext, loggerConfiguration) =>
            {
                loggerConfiguration
                    .ReadFrom.Configuration(hostingContext.Configuration)
                    .Enrich.FromLogContext()
                    .WriteTo.Console()
                    .WriteTo.File("logs/log-.txt", rollingInterval: RollingInterval.Day);
            });
}

// Startup.cs - Configure services and middleware
public class Startup
{
    public Startup(IConfiguration configuration, IWebHostEnvironment environment)
    {
        Configuration = configuration;
        Environment = environment;
    }

    public IConfiguration Configuration { get; }
    public IWebHostEnvironment Environment { get; }

    // Register services for dependency injection
    public void ConfigureServices(IServiceCollection services)
    {
        // Add database context
        services.AddDbContext<ApplicationDbContext>(options =>
        {
            options.UseSqlServer(
                Configuration.GetConnectionString("DefaultConnection"),
                sqlOptions =>
                {
                    sqlOptions.EnableRetryOnFailure(
                        maxRetryCount: 5,
                        maxRetryDelay: TimeSpan.FromSeconds(30),
                        errorNumbersToAdd: null);
                });
        });
        
        // Add Identity
        services.AddIdentity<ApplicationUser, IdentityRole>()
            .AddEntityFrameworkStores<ApplicationDbContext>()
            .AddDefaultTokenProviders();
        
        // Configure JWT authentication
        services.AddAuthentication(options =>
        {
            options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
            options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
        })
        .AddJwtBearer(options =>
        {
            options.TokenValidationParameters = new TokenValidationParameters
            {
                ValidateIssuer = true,
                ValidateAudience = true,
                ValidateLifetime = true,
                ValidateIssuerSigningKey = true,
                ValidIssuer = Configuration["Jwt:Issuer"],
                ValidAudience = Configuration["Jwt:Audience"],
                IssuerSigningKey = new SymmetricSecurityKey(
                    Encoding.UTF8.GetBytes(Configuration["Jwt:Key"]))
            };
        });
        
        // Add authorization policies
        services.AddAuthorization(options =>
        {
            options.AddPolicy("RequireAdminRole", policy => policy.RequireRole("Admin"));
            options.AddPolicy("RequireManagerRole", policy => policy.RequireRole("Manager", "Admin"));
        });
        
        // Add API controllers
        services.AddControllers(options =>
        {
            // Add global filters
            options.Filters.Add(new ProducesResponseTypeAttribute(StatusCodes.Status400BadRequest));
            options.Filters.Add(new ProducesResponseTypeAttribute(StatusCodes.Status500InternalServerError));
            options.Filters.Add(new ConsumesAttribute("application/json"));
            options.Filters.Add(new ProducesAttribute("application/json"));
        })
        .AddJsonOptions(options =>
        {
            // Configure JSON serialization
            options.JsonSerializerOptions.PropertyNamingPolicy = JsonNamingPolicy.CamelCase;
            options.JsonSerializerOptions.WriteIndented = Environment.IsDevelopment();
        })
        .AddFluentValidation(fv =>
        {
            // Register validators
            fv.RegisterValidatorsFromAssemblyContaining<Startup>();
            fv.ImplicitlyValidateChildProperties = true;
        });
        
        // Configure API versioning
        services.AddApiVersioning(options =>
        {
            options.DefaultApiVersion = new ApiVersion(1, 0);
            options.AssumeDefaultVersionWhenUnspecified = true;
            options.ReportApiVersions = true;
            options.ApiVersionReader = ApiVersionReader.Combine(
                new UrlSegmentApiVersionReader(),
                new HeaderApiVersionReader("X-Api-Version"));
        });
        
        // Configure Swagger/OpenAPI
        services.AddSwaggerGen(c =>
        {
            c.SwaggerDoc("v1", new OpenApiInfo
            {
                Title = "My API",
                Version = "v1",
                Description = "A simple example ASP.NET Core Web API",
                Contact = new OpenApiContact
                {
                    Name = "John Doe",
                    Email = "john.doe@example.com",
                    Url = new Uri("https://example.com/contact")
                }
            });
            
            // Include XML comments
            var xmlFile = $"{Assembly.GetExecutingAssembly().GetName().Name}.xml";
            var xmlPath = Path.Combine(AppContext.BaseDirectory, xmlFile);
            c.IncludeXmlComments(xmlPath);
            
            // Add JWT authentication support to Swagger UI
            c.AddSecurityDefinition("Bearer", new OpenApiSecurityScheme
            {
                Description = "JWT Authorization header using the Bearer scheme",
                Name = "Authorization",
                In = ParameterLocation.Header,
                Type = SecuritySchemeType.ApiKey,
                Scheme = "Bearer"
            });
            
            c.AddSecurityRequirement(new OpenApiSecurityRequirement
            {
                {
                    new OpenApiSecurityScheme
                    {
                        Reference = new OpenApiReference
                        {
                            Type = ReferenceType.SecurityScheme,
                            Id = "Bearer"
                        }
                    },
                    Array.Empty<string>()
                }
            });
        });
        
        // Add health checks
        services.AddHealthChecks()
            .AddDbContextCheck<ApplicationDbContext>(tags: new[] { "ready" })
            .AddCheck<CustomHealthCheck>("custom", tags: new[] { "ready" });
        
        // Add AutoMapper
        services.AddAutoMapper(typeof(Startup));
        
        // Register services and repositories
        services.AddScoped<IProductRepository, ProductRepository>();
        services.AddScoped<IProductService, ProductService>();
        services.AddScoped<IOrderRepository, OrderRepository>();
        services.AddScoped<IOrderService, OrderService>();
        
        // Register HTTP clients
        services.AddHttpClient<IExternalApiService, ExternalApiService>(client =>
        {
            client.BaseAddress = new Uri(Configuration["ExternalApi:BaseUrl"]);
            client.DefaultRequestHeaders.Add("ApiKey", Configuration["ExternalApi:ApiKey"]);
        })
        .AddPolicyHandler(GetRetryPolicy())
        .AddPolicyHandler(GetCircuitBreakerPolicy());
        
        // Add CORS
        services.AddCors(options =>
        {
            options.AddPolicy("AllowSpecificOrigins",
                builder => builder
                    .WithOrigins("https://example.com", "https://www.example.com")
                    .AllowAnyMethod()
                    .AllowAnyHeader()
                    .AllowCredentials());
        });
        
        // Add response caching and compression
        services.AddResponseCaching();
        services.AddResponseCompression(options =>
        {
            options.Providers.Add<GzipCompressionProvider>();
            options.EnableForHttps = true;
        });
        
        // Add background services
        services.AddHostedService<DataSyncService>();
    }
    
    // Configure middleware pipeline
    public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
    {
        if (env.IsDevelopment())
        {
            app.UseDeveloperExceptionPage();
            app.UseSwagger();
            app.UseSwaggerUI(c =>
            {
                c.SwaggerEndpoint("/swagger/v1/swagger.json", "My API v1");
                c.RoutePrefix = "api-docs";
            });
        }
        else
        {
            app.UseExceptionHandler("/error");
            app.UseHsts();
        }
        
        // Custom error handling middleware
        app.UseMiddleware<ErrorHandlingMiddleware>();
        
        // HTTP to HTTPS redirection
        app.UseHttpsRedirection();
        
        // Compression and caching
        app.UseResponseCompression();
        app.UseResponseCaching();
        
        // Static files
        app.UseStaticFiles();
        
        // Routing
        app.UseRouting();
        
        // CORS
        app.UseCors("AllowSpecificOrigins");
        
        // Authentication and authorization
        app.UseAuthentication();
        app.UseAuthorization();
        
        // Health checks
        app.UseHealthChecks("/health", new HealthCheckOptions
        {
            ResponseWriter = UIResponseWriter.WriteHealthCheckUIResponse
        });
        
        // Endpoints
        app.UseEndpoints(endpoints =>
        {
            endpoints.MapControllers();
            endpoints.MapHealthChecks("/health/ready", new HealthCheckOptions
            {
                Predicate = check => check.Tags.Contains("ready"),
                ResponseWriter = UIResponseWriter.WriteHealthCheckUIResponse
            });
            endpoints.MapHealthChecks("/health/live", new HealthCheckOptions
            {
                Predicate = _ => true,
                ResponseWriter = UIResponseWriter.WriteHealthCheckUIResponse
            });
        });
    }
    
    // Polly policies for HTTP client resilience
    private IAsyncPolicy<HttpResponseMessage> GetRetryPolicy()
    {
        return HttpPolicyExtensions
            .HandleTransientHttpError()
            .OrResult(msg => msg.StatusCode == HttpStatusCode.NotFound)
            .WaitAndRetryAsync(3, retryAttempt => TimeSpan.FromSeconds(Math.Pow(2, retryAttempt)));
    }
    
    private IAsyncPolicy<HttpResponseMessage> GetCircuitBreakerPolicy()
    {
        return HttpPolicyExtensions
            .HandleTransientHttpError()
            .CircuitBreakerAsync(5, TimeSpan.FromMinutes(1));
    }
}

// Custom error handling middleware
public class ErrorHandlingMiddleware
{
    private readonly RequestDelegate _next;
    private readonly ILogger<ErrorHandlingMiddleware> _logger;
    private readonly IWebHostEnvironment _env;
    
    public ErrorHandlingMiddleware(
        RequestDelegate next,
        ILogger<ErrorHandlingMiddleware> logger,
        IWebHostEnvironment env)
    {
        _next = next;
        _logger = logger;
        _env = env;
    }
    
    public async Task Invoke(HttpContext context)
    {
        try
        {
            await _next(context);
        }
        catch (Exception ex)
        {
            await HandleExceptionAsync(context, ex);
        }
    }
    
    private Task HandleExceptionAsync(HttpContext context, Exception ex)
    {
        _logger.LogError(ex, "Unhandled exception occurred");
        
        context.Response.ContentType = "application/json";
        
        var response = new ErrorResponse
        {
            TraceId = Activity.Current?.Id ?? context.TraceIdentifier
        };
        
        if (ex is ValidationException validationEx)
        {
            context.Response.StatusCode = StatusCodes.Status400BadRequest;
            response.Message = "Validation error";
            response.Details = validationEx.Errors;
        }
        else if (ex is NotFoundException notFoundEx)
        {
            context.Response.StatusCode = StatusCodes.Status404NotFound;
            response.Message = notFoundEx.Message;
        }
        else if (ex is UnauthorizedAccessException)
        {
            context.Response.StatusCode = StatusCodes.Status403Forbidden;
            response.Message = "Forbidden";
        }
        else if (ex is ApiException apiEx)
        {
            context.Response.StatusCode = (int)apiEx.StatusCode;
            response.Message = apiEx.Message;
        }
        else
        {
            context.Response.StatusCode = StatusCodes.Status500InternalServerError;
            response.Message = "An unexpected error occurred";
            
            if (_env.IsDevelopment())
            {
                response.Details = ex.ToString();
            }
        }
        
        return context.Response.WriteAsJsonAsync(response);
    }
}

public class ErrorResponse
{
    public string Message { get; set; }
    public string TraceId { get; set; }
    public object Details { get; set; }
}`,
          exercise: {
            instructions:
              'Create a simple ASP.NET Core Web API project for an e-commerce system. Implement the following components: (1) Entity models for Products, Categories, and Orders, (2) A DbContext for data access, (3) Repository classes for data access, (4) Service classes with business logic, (5) API controllers for RESTful endpoints, (6) Authentication with JWT, (7) Basic validation using data annotations or FluentValidation, and (8) Proper error handling middleware.',
          },
        },
        {
          title: '.NET Core Configuration and Performance (2 Key Concepts)',
          explanation: `
        <p>These two concepts cover the essential configuration and performance optimizations for production-ready .NET applications:</p>

        <h4>19. Application Configuration and Environment Management</h4>
        <p>Managing configuration across different environments is critical for application deployment and maintenance:</p>

        <p><strong>Configuration Sources:</strong> Loading configuration from various sources:</p>
        <ul>
          <li>JSON files (appsettings.json, appsettings.{Environment}.json)</li>
          <li>Environment variables</li>
          <li>Command-line arguments</li>
          <li>User secrets (for development)</li>
          <li>Azure Key Vault and other secure stores</li>
        </ul>

        <p><strong>Environment-Specific Configuration:</strong> Tailoring configuration for different environments:</p>
        <ul>
                    <li>Development vs. Production settings</li>
          <li>Configuration transforms</li>
          <li>Environment variable prefixes</li>
          <li>Configuration providers order</li>
        </ul>

        <p><strong>Options Pattern:</strong> Strongly-typed access to configuration:</p>
        <ul>
          <li>IOptions<T>, IOptionsSnapshot<T>, and IOptionsMonitor<T></li>
          <li>Named options</li>
          <li>Options validation</li>
          <li>Post-configuration and options setup</li>
        </ul>
        
        <div class="code-example">
          <pre><code>// Application Configuration
// appsettings.json
{
  "ConnectionStrings": {
    "DefaultConnection": "Server=(localdb)\\MSSQLLocalDB;Database=MyDatabase;Integrated Security=True"
  },
  "Logging": {
    "LogLevel": {
      "Default": "Information",
      "Microsoft": "Warning",
      "Microsoft.Hosting.Lifetime": "Information"
    }
  },
  "AllowedHosts": "*",
  "AppSettings": {
    "SiteTitle": "My Application",
    "SiteUrl": "https://example.com",
    "AdminEmail": "admin@example.com",
    "EnableCache": true,
    "CacheTimeout": 3600
  },
  "EmailSettings": {
    "SmtpServer": "smtp.example.com",
    "SmtpPort": 587,
    "SmtpUsername": "user@example.com",
    "SmtpPassword": "password",
    "FromEmail": "noreply@example.com",
    "FromName": "My Application"
  },
  "Authentication": {
    "Jwt": {
      "Key": "your-secret-key-here",
      "Issuer": "https://example.com",
      "Audience": "https://example.com",
      "ExpiryMinutes": 60
    }
  }
}

// appsettings.Development.json
{
  "Logging": {
    "LogLevel": {
      "Default": "Debug",
      "Microsoft": "Information"
    }
  },
  "ConnectionStrings": {
    "DefaultConnection": "Server=(localdb)\\MSSQLLocalDB;Database=MyDatabase_Dev;Integrated Security=True"
  },
  "AppSettings": {
    "SiteUrl": "https://localhost:5001",
    "EnableCache": false
  },
  "EmailSettings": {
    "SmtpServer": "localhost",
    "SmtpPort": 25,
    "FromEmail": "dev@example.com"
  }
}

// Program.cs - Configuration setup
public static IHostBuilder CreateHostBuilder(string[] args) =>
    Host.CreateDefaultBuilder(args)
        .ConfigureAppConfiguration((hostingContext, config) =>
        {
            var env = hostingContext.HostingEnvironment;
            
            // Clear default configuration providers
            config.Sources.Clear();
            
            // Add configuration in order (later sources override earlier ones)
            config
                .AddJsonFile("appsettings.json", optional: false, reloadOnChange: true)
                .AddJsonFile($"appsettings.{env.EnvironmentName}.json", optional: true, reloadOnChange: true)
                .AddJsonFile("config/logging.json", optional: true, reloadOnChange: true);
                
            // Add environment variables with a specific prefix
            config.AddEnvironmentVariables("MYAPP_");
            
            // Add command line arguments
            if (args != null)
                config.AddCommandLine(args);
                
            // Add user secrets in development
            if (env.IsDevelopment())
            {
                config.AddUserSecrets<Program>();
            }
            
            // Add Azure Key Vault if available
            var builtConfig = config.Build();
            var keyVaultUrl = builtConfig["KeyVault:Url"];
            
            if (!string.IsNullOrEmpty(keyVaultUrl))
            {
                config.AddAzureKeyVault(
                    new Uri(keyVaultUrl),
                    new DefaultAzureCredential());
            }
        })
        .ConfigureWebHostDefaults(webBuilder =>
        {
            webBuilder.UseStartup<Startup>();
        });

// Options pattern for strongly typed configuration
// Define options class
public class AppSettings
{
    public string SiteTitle { get; set; }
    public string SiteUrl { get; set; }
    public string AdminEmail { get; set; }
    public bool EnableCache { get; set; }
    public int CacheTimeout { get; set; } = 3600; // Default value
}

public class EmailSettings
{
    [Required]
    public string SmtpServer { get; set; }
    
    [Range(1, 65535)]
    public int SmtpPort { get; set; }
    
    public string SmtpUsername { get; set; }
    public string SmtpPassword { get; set; }
    
    [Required, EmailAddress]
    public string FromEmail { get; set; }
    
    public string FromName { get; set; }
}

// Configure options in Startup.cs
public void ConfigureServices(IServiceCollection services)
{
    // Basic options binding
    services.Configure<AppSettings>(Configuration.GetSection("AppSettings"));
    
    // Options with validation
    services.AddOptions<EmailSettings>()
        .Bind(Configuration.GetSection("EmailSettings"))
        .ValidateDataAnnotations() // Validate using data annotations
        .ValidateOnStart(); // Validate when the application starts
    
    // Options pattern with custom validation
    services.AddOptions<JwtSettings>()
        .Bind(Configuration.GetSection("Authentication:Jwt"))
        .Validate(options =>
        {
            return !string.IsNullOrEmpty(options.Key) &&
                   options.ExpiryMinutes > 0 &&
                   !string.IsNullOrEmpty(options.Issuer) &&
                   !string.IsNullOrEmpty(options.Audience);
        }, "JWT settings are not valid");
    
    // Adding custom post-configuration
    services.Configure<AppSettings>(options =>
    {
        // Ensure site URL ends with '/'
        if (!options.SiteUrl.EndsWith('/'))
        {
            options.SiteUrl += '/';
        }
    });
    
    // Register named options
    services.Configure<SmtpClientOptions>("Primary", Configuration.GetSection("EmailSettings"));
    services.Configure<SmtpClientOptions>("Backup", Configuration.GetSection("BackupEmailSettings"));
    
    // Other services...
}

// Using options in a service
public class EmailService : IEmailService
{
    private readonly EmailSettings _emailSettings;
    private readonly ILogger<EmailService> _logger;
    
    // IOptions - Singleton, doesn't change after app starts
    public EmailService(
        IOptions<EmailSettings> emailSettings,
        ILogger<EmailService> logger)
    {
        _emailSettings = emailSettings.Value;
        _logger = logger;
    }
    
    // Alternative: IOptionsSnapshot - Scoped, reloaded when config changes
    public EmailService(
        IOptionsSnapshot<EmailSettings> emailSettings,
        ILogger<EmailService> logger)
    {
        _emailSettings = emailSettings.Value;
        _logger = logger;
    }
    
    // Alternative: IOptionsMonitor - Singleton with change notifications
    private readonly IOptionsMonitor<EmailSettings> _emailSettingsMonitor;
    
    public EmailService(
        IOptionsMonitor<EmailSettings> emailSettings,
        ILogger<EmailService> logger)
    {
        _emailSettingsMonitor = emailSettings;
        _emailSettingsMonitor.OnChange(settings =>
        {
            _logger.LogInformation("Email settings have changed");
            // React to changes
        });
        _logger = logger;
    }
    
    public Task SendEmailAsync(string to, string subject, string body, bool isHtml = false)
    {
        // Use current settings value
        var settings = _emailSettingsMonitor.CurrentValue;
        
        // Implementation...
    }
    
    // Using named options
    public class SmtpClientFactory
    {
        private readonly IOptionsMonitor<SmtpClientOptions> _optionsMonitor;
        
        public SmtpClientFactory(IOptionsMonitor<SmtpClientOptions> optionsMonitor)
        {
            _optionsMonitor = optionsMonitor;
        }
        
        public SmtpClient CreateClient(string name = "Primary")
        {
            var options = _optionsMonitor.Get(name);
            
            return new SmtpClient
            {
                Host = options.SmtpServer,
                Port = options.SmtpPort,
                Credentials = new NetworkCredential(options.SmtpUsername, options.SmtpPassword),
                EnableSsl = true
            };
        }
    }
}</code></pre>
        </div>

        <h4>20. Performance Optimization and Memory Management</h4>
        <p>Optimizing application performance and managing memory efficiently are critical for scalable .NET applications:</p>

        <p><strong>Memory Management:</strong> Understanding and optimizing memory usage:</p>
        <ul>
          <li>Value types vs. reference types</li>
          <li>Garbage collection generations</li>
          <li>IDisposable pattern implementation</li>
          <li>Memory leaks and how to avoid them</li>
          <li>Span<T> and Memory<T> for high-performance operations</li>
        </ul>

        <p><strong>Performance Best Practices:</strong> Common optimization techniques:</p>
        <ul>
          <li>Efficient LINQ usage</li>
          <li>Async/await best practices</li>
          <li>Connection and resource pooling</li>
          <li>Caching strategies</li>
          <li>Database query optimization</li>
        </ul>

        <p><strong>Profiling and Benchmarking:</strong> Measuring and improving performance:</p>
        <ul>
          <li>Performance counters</li>
          <li>Profiling tools</li>
          <li>Benchmarking with BenchmarkDotNet</li>
          <li>Memory dump analysis</li>
          <li>Tracing and diagnostics</li>
        </ul>
        
        <div class="code-example">
          <pre><code>// Performance Optimization and Memory Management
// IDisposable implementation pattern
public class ResourceManager : IDisposable
{
    private bool _disposed = false;
    private readonly SqlConnection _connection;
    private readonly FileStream _fileStream;
    
    public ResourceManager(string connectionString, string filePath)
    {
        _connection = new SqlConnection(connectionString);
        _connection.Open();
        
        _fileStream = new FileStream(filePath, FileMode.Open);
    }
    
    // Public method to release resources
    public void Dispose()
    {
        Dispose(true);
        GC.SuppressFinalize(this);
    }
    
    // Protected virtual method to allow derived classes to release resources
    protected virtual void Dispose(bool disposing)
    {
        if (_disposed)
            return;
            
        if (disposing)
        {
            // Free managed resources
            _connection?.Dispose();
            _fileStream?.Dispose();
        }
        
        // Free unmanaged resources (if any)
        // Set large fields to null
        
        _disposed = true;
    }
    
    // Finalizer as a backup to clean up resources
    ~ResourceManager()
    {
        Dispose(false);
    }
    
    // Method that requires the object not to be disposed
    public void DoWork()
    {
        if (_disposed)
            throw new ObjectDisposedException(nameof(ResourceManager));
            
        // Implementation...
    }
}

// Using IDisposable with 'using' statement
public void ProcessFile(string filePath)
{
    using (var stream = new FileStream(filePath, FileMode.Open))
    {
        // Use the resource...
    } // Dispose() is called automatically
    
    // C# 8 using declaration
    using var connection = new SqlConnection(_connectionString);
    connection.Open();
    
    // Resource is disposed at the end of the scope
}

// Connection Pooling
public async Task<IEnumerable<Product>> GetProductsAsync()
{
    // ADO.NET uses connection pooling automatically
    using var connection = new SqlConnection(_connectionString);
    await connection.OpenAsync();
    
    using var command = new SqlCommand("SELECT * FROM Products", connection);
    using var reader = await command.ExecuteReaderAsync();
    
    var products = new List<Product>();
    
    while (await reader.ReadAsync())
    {
        products.Add(new Product
        {
            Id = reader.GetInt32(0),
            Name = reader.GetString(1),
            Price = reader.GetDecimal(2)
        });
    }
    
    return products;
}

// ObjectPool for frequently used objects
public class ConnectionFactory
{
    private readonly ObjectPool<SqlConnection> _connectionPool;
    private readonly string _connectionString;
    
    public ConnectionFactory(string connectionString)
    {
        _connectionString = connectionString;
        
        _connectionPool = new DefaultObjectPool<SqlConnection>(
            new SqlConnectionPoolPolicy(_connectionString), 
            Environment.ProcessorCount * 2);
    }
    
    public SqlConnection GetConnection()
    {
        return _connectionPool.Get();
    }
    
    public void ReturnConnection(SqlConnection connection)
    {
        _connectionPool.Return(connection);
    }
    
    private class SqlConnectionPoolPolicy : IPooledObjectPolicy<SqlConnection>
    {
        private readonly string _connectionString;
        
        public SqlConnectionPoolPolicy(string connectionString)
        {
            _connectionString = connectionString;
        }
        
        public SqlConnection Create()
        {
            return new SqlConnection(_connectionString);
        }
        
        public bool Return(SqlConnection obj)
        {
            if (obj.State != ConnectionState.Open)
            {
                obj.Open();
            }
            
            return true;
        }
    }
}

// Using a memory-efficient Span<T>
public int SumArray(byte[] array)
{
    Span<byte> span = array; // No allocation, just a view
    
    int sum = 0;
    for (int i = 0; i < span.Length; i++)
    {
        sum += span[i];
    }
    
    return sum;
}

// Avoiding unnecessary allocations with Span<T>
public ReadOnlySpan<char> GetSubstring(string text, int start, int length)
{
    // No allocation compared to text.Substring(start, length)
    return text.AsSpan(start, length);
}

// Parsing without allocations using Span<T>
public bool TryParseName(string input, out string firstName, out string lastName)
{
    firstName = lastName = null;
    
    ReadOnlySpan<char> span = input;
    int spaceIndex = span.IndexOf(' ');
    
    if (spaceIndex <= 0 || spaceIndex >= span.Length - 1)
        return false;
        
    firstName = new string(span.Slice(0, spaceIndex));
    lastName = new string(span.Slice(spaceIndex + 1));
    
    return true;
}

// Caching with MemoryCache
public class ProductService
{
    private readonly IProductRepository _repository;
    private readonly IMemoryCache _cache;
    private readonly MemoryCacheEntryOptions _cacheOptions;
    
    public ProductService(
        IProductRepository repository,
        IMemoryCache cache,
        IOptions<AppSettings> settings)
    {
        _repository = repository;
        _cache = cache;
        
        // Configure cache options
        _cacheOptions = new MemoryCacheEntryOptions()
            .SetAbsoluteExpiration(TimeSpan.FromSeconds(settings.Value.CacheTimeout))
            .SetPriority(CacheItemPriority.High)
            .RegisterPostEvictionCallback(OnProductCacheRemoval);
    }
    
    public async Task<Product> GetProductByIdAsync(int id)
    {
        string cacheKey = $"Product_{id}";
        
        // Try to get from cache
        if (!_cache.TryGetValue(cacheKey, out Product product))
        {
            // Cache miss - get from repository
            product = await _repository.GetByIdAsync(id);
            
            if (product != null)
            {
                // Add to cache
                _cache.Set(cacheKey, product, _cacheOptions);
            }
        }
        
        return product;
    }
    
    private void OnProductCacheRemoval(object key, object value, EvictionReason reason, object state)
    {
        // Log cache eviction or take other actions
        Console.WriteLine($"Product removed from cache. Reason: {reason}");
    }
}

// Efficient LINQ usage
public async Task<IEnumerable<ProductDto>> GetProductsByCategoryAsync(int categoryId)
{
    // Inefficient: Multiple queries and loads all products
    // var products = await _repository.GetAllAsync();
    // var filteredProducts = products
    //     .Where(p => p.CategoryId == categoryId)
    //     .Select(p => new ProductDto { /* mapping */ });
    
    // Better: Single filtered query with projection
    var products = await _repository.GetByCategoryAsync(categoryId);
    
    // Use efficient projection directly in the query
    return products.Select(p => new ProductDto
    {
        Id = p.Id,
        Name = p.Name,
        Price = p.Price,
        IsAvailable = p.IsAvailable,
        CategoryName = p.Category?.Name
    });
}

// Async/await best practices
public async Task<IActionResult> GetProductsAsync()
{
    try
    {
        // Use ConfigureAwait(false) for non-UI context operations
        var products = await _productService.GetAllProductsAsync()
            .ConfigureAwait(false);
            
        return Ok(products);
    }
    catch (Exception ex)
    {
        _logger.LogError(ex, "Error getting products");
        return StatusCode(500, "Internal server error");
    }
}

// Avoid async void (except for event handlers)
// BAD: async void MethodAsync() { await Task.Delay(100); }
// GOOD: async Task MethodAsync() { await Task.Delay(100); }

// Benchmark with BenchmarkDotNet
[MemoryDiagnoser]
[Orderer(BenchmarkDotNet.Order.SummaryOrderPolicy.FastestToSlowest)]
public class StringConcatenationBenchmark
{
    private const int Iterations = 1000;
    private readonly string[] _items = Enumerable.Range(1, 100)
        .Select(i => $"Item {i}")
        .ToArray();
    
    [Benchmark(Baseline = true)]
    public string Concatenation()
    {
        string result = string.Empty;
        
        for (int i = 0; i < Iterations; i++)
        {
            for (int j = 0; j < _items.Length; j++)
            {
                result += _items[j];
            }
        }
        
        return result;
    }
    
    [Benchmark]
    public string StringBuilder()
    {
        var builder = new StringBuilder();
        
        for (int i = 0; i < Iterations; i++)
        {
            for (int j = 0; j < _items.Length; j++)
            {
                builder.Append(_items[j]);
            }
        }
        
        return builder.ToString();
    }
    
    [Benchmark]
    public string StringJoin()
    {
        string result = string.Empty;
        
        for (int i = 0; i < Iterations; i++)
        {
            result = string.Join(string.Empty, _items);
        }
        
        return result;
    }
}</code></pre>
        </div>
        
        <div class="interview-tip">
          <p><span class="interview-icon">🎯</span> <strong>Interview Focus:</strong> For configuration and performance questions, be prepared to discuss environment-specific configuration strategies, security best practices for sensitive configuration, and common performance pitfalls in .NET applications.</p>
          <p>Common interview questions include:</p>
          <ul>
            <li>"How would you manage configuration for different environments (development, staging, production)?"</li>
            <li>"Explain the differences between IOptions, IOptionsSnapshot, and IOptionsMonitor"</li>
            <li>"What are some common memory leaks in .NET applications and how would you detect and fix them?"</li>
            <li>"How would you optimize LINQ queries for better performance?"</li>
            <li>"Explain the benefits of using Span<T> and when you would use it"</li>
          </ul>
        </div>
      `,
          codeExample: `// Comprehensive Performance-Optimized Service Example
using System;
using System.Collections.Concurrent;
using System.Collections.Generic;
using System.Diagnostics;
using System.IO;
using System.Linq;
using System.Net.Http;
using System.Threading;
using System.Threading.Tasks;
using Microsoft.Extensions.Caching.Memory;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;

namespace PerformanceOptimizedApp
{
    // Configuration settings
    public class DataServiceOptions
    {
        public string ApiBaseUrl { get; set; }
        public string ApiKey { get; set; }
        public int CacheTimeoutSeconds { get; set; } = 300;
        public int RetryCount { get; set; } = 3;
        public int RetryDelayMilliseconds { get; set; } = 500;
        public int MaxConcurrentOperations { get; set; } = 10;
        public int BatchSize { get; set; } = 100;
    }

    // Service interface
    public interface IDataService
    {
        Task<DataItem> GetByIdAsync(int id, CancellationToken cancellationToken = default);
        Task<IReadOnlyList<DataItem>> GetByCategoryAsync(string category, CancellationToken cancellationToken = default);
        Task<IReadOnlyList<DataItem>> SearchAsync(string query, CancellationToken cancellationToken = default);
        Task<int> ImportDataAsync(Stream dataStream, bool validateOnly = false, CancellationToken cancellationToken = default);
        Task<OperationResult<int>> ExportDataAsync(string category, Stream outputStream, CancellationToken cancellationToken = default);
        void ClearCache(string category = null);
    }

    public class DataItem
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Category { get; set; }
        public decimal Value { get; set; }
        public DateTime LastUpdated { get; set; }
        public bool IsActive { get; set; }
    }

    public class OperationResult<T>
    {
        public bool Success { get; set; }
        public T Result { get; set; }
        public string ErrorMessage { get; set; }
        public TimeSpan ElapsedTime { get; set; }
        public int ItemsProcessed { get; set; }
    }

    // Exception types
    public class DataServiceException : Exception
    {
        public DataServiceException(string message) : base(message) { }
        public DataServiceException(string message, Exception innerException) : base(message, innerException) { }
    }

    public class DataNotFoundException : DataServiceException
    {
        public DataNotFoundException(string message) : base(message) { }
    }

    // Implementation with performance optimizations
    public class DataService : IDataService, IDisposable
    {
        private readonly HttpClient _httpClient;
        private readonly IMemoryCache _cache;
        private readonly ILogger<DataService> _logger;
        private readonly DataServiceOptions _options;
        private readonly SemaphoreSlim _concurrencyLimiter;
        private readonly ConcurrentDictionary<string, SemaphoreSlim> _categoryLocks = new();
        private bool _disposed;

        public DataService(
            HttpClient httpClient,
            IMemoryCache cache,
            IOptions<DataServiceOptions> options,
            ILogger<DataService> logger)
        {
            _httpClient = httpClient ?? throw new ArgumentNullException(nameof(httpClient));
            _cache = cache ?? throw new ArgumentNullException(nameof(cache));
            _logger = logger ?? throw new ArgumentNullException(nameof(logger));
            _options = options?.Value ?? throw new ArgumentNullException(nameof(options));

            // Configure HttpClient
            _httpClient.BaseAddress = new Uri(_options.ApiBaseUrl);
            _httpClient.DefaultRequestHeaders.Add("X-API-Key", _options.ApiKey);
            _httpClient.Timeout = TimeSpan.FromSeconds(30);

            // Initialize concurrency limiter
            _concurrencyLimiter = new SemaphoreSlim(_options.MaxConcurrentOperations);
        }

        public async Task<DataItem> GetByIdAsync(int id, CancellationToken cancellationToken = default)
        {
            if (id <= 0)
                throw new ArgumentOutOfRangeException(nameof(id), "ID must be greater than zero");

            // Check cache first
            string cacheKey = $"data_item_{id}";
            if (_cache.TryGetValue(cacheKey, out DataItem cachedItem))
            {
                _logger.LogDebug("Cache hit for item {ItemId}", id);
                return cachedItem;
            }

            try
            {
                // Limit concurrent operations
                await _concurrencyLimiter.WaitAsync(cancellationToken);

                // Perform API request with retry logic
                DataItem item = null;
                await RetryAsync(async () =>
                {
                    _logger.LogDebug("Fetching item {ItemId} from API", id);

                    var response = await _httpClient.GetAsync($"api/data/{id}", cancellationToken)
                        .ConfigureAwait(false);

                    if (response.StatusCode == System.Net.HttpStatusCode.NotFound)
                        throw new DataNotFoundException($"Item with ID {id} not found");

                    response.EnsureSuccessStatusCode();

                    item = await response.Content.ReadFromJsonAsync<DataItem>(cancellationToken: cancellationToken)
                        .ConfigureAwait(false);
                });

                if (item != null)
                {
                    // Cache the result
                    var cacheOptions = new MemoryCacheEntryOptions()
                        .SetAbsoluteExpiration(TimeSpan.FromSeconds(_options.CacheTimeoutSeconds))
                        .SetPriority(CacheItemPriority.Normal)
                        .RegisterPostEvictionCallback((key, value, reason, state) =>
                        {
                            _logger.LogDebug("Item {ItemId} evicted from cache. Reason: {Reason}", id, reason);
                        });

                    _cache.Set(cacheKey, item, cacheOptions);
                }

                return item;
            }
            catch (DataNotFoundException)
            {
                throw; // Pass through the not found exception
            }
            catch (Exception ex) when (ex is not OperationCanceledException)
            {
                _logger.LogError(ex, "Error fetching item {ItemId}", id);
                throw new DataServiceException($"Failed to retrieve item {id}", ex);
            }
            finally
            {
                _concurrencyLimiter.Release();
            }
        }

        public async Task<IReadOnlyList<DataItem>> GetByCategoryAsync(string category, CancellationToken cancellationToken = default)
        {
            if (string.IsNullOrWhiteSpace(category))
                throw new ArgumentException("Category cannot be empty", nameof(category));

            // Check cache first
            string cacheKey = $"data_category_{category}";
            if (_cache.TryGetValue(cacheKey, out IReadOnlyList<DataItem> cachedItems))
            {
                _logger.LogDebug("Cache hit for category {Category} with {Count} items", category, cachedItems.Count);
                return cachedItems;
            }

            // Get or create a lock for this category to prevent duplicate requests
            var categoryLock = _categoryLocks.GetOrAdd(category, _ => new SemaphoreSlim(1, 1));

            try
            {
                // Try once more after acquiring lock (double-check pattern)
                if (_cache.TryGetValue(cacheKey, out cachedItems))
                {
                    return cachedItems;
                }

                // Acquire category-specific lock
                await categoryLock.WaitAsync(cancellationToken);

                // Limit concurrent operations
                await _concurrencyLimiter.WaitAsync(cancellationToken);

                // Perform API request with retry logic
                List<DataItem> items = null;
                await RetryAsync(async () =>
                {
                    _logger.LogDebug("Fetching items for category {Category} from API", category);

                    var response = await _httpClient.GetAsync($"api/data?category={Uri.EscapeDataString(category)}", cancellationToken)
                        .ConfigureAwait(false);

                    response.EnsureSuccessStatusCode();

                    items = await response.Content.ReadFromJsonAsync<List<DataItem>>(cancellationToken: cancellationToken)
                        .ConfigureAwait(false);
                });

                if (items != null)
                {
                    // Cache the results
                    var cacheOptions = new MemoryCacheEntryOptions()
                        .SetAbsoluteExpiration(TimeSpan.FromSeconds(_options.CacheTimeoutSeconds))
                        .SetPriority(CacheItemPriority.Normal);

                    _cache.Set(cacheKey, items, cacheOptions);
                }

                return items ?? Array.Empty<DataItem>();
            }
            catch (Exception ex) when (ex is not OperationCanceledException)
            {
                _logger.LogError(ex, "Error fetching items for category {Category}", category);
                throw new DataServiceException($"Failed to retrieve items for category {category}", ex);
            }
            finally
            {
                if (_concurrencyLimiter.CurrentCount < _options.MaxConcurrentOperations)
                    _concurrencyLimiter.Release();

                if (categoryLock.CurrentCount == 0)
                    categoryLock.Release();
            }
        }

        public async Task<IReadOnlyList<DataItem>> SearchAsync(string query, CancellationToken cancellationToken = default)
        {
            if (string.IsNullOrWhiteSpace(query))
                throw new ArgumentException("Search query cannot be empty", nameof(query));

            // Don't cache search results as they can vary widely

            try
            {
                // Limit concurrent operations
                await _concurrencyLimiter.WaitAsync(cancellationToken);

                // Perform API request with retry logic
                List<DataItem> items = null;
                await RetryAsync(async () =>
                {
                    _logger.LogDebug("Searching for '{Query}'", query);

                    var response = await _httpClient.GetAsync($"api/data/search?q={Uri.EscapeDataString(query)}", cancellationToken)
                        .ConfigureAwait(false);

                    response.EnsureSuccessStatusCode();

                    items = await response.Content.ReadFromJsonAsync<List<DataItem>>(cancellationToken: cancellationToken)
                        .ConfigureAwait(false);
                });

                return items ?? Array.Empty<DataItem>();
            }
            catch (Exception ex) when (ex is not OperationCanceledException)
            {
                _logger.LogError(ex, "Error searching for '{Query}'", query);
                throw new DataServiceException($"Failed to search for '{query}'", ex);
            }
            finally
            {
                _concurrencyLimiter.Release();
            }
        }

        public async Task<int> ImportDataAsync(Stream dataStream, bool validateOnly = false, CancellationToken cancellationToken = default)
        {
            if (dataStream == null)
                throw new ArgumentNullException(nameof(dataStream));

            if (!dataStream.CanRead)
                throw new ArgumentException("Data stream must be readable", nameof(dataStream));

            try
            {
                // Limit concurrent operations
                await _concurrencyLimiter.WaitAsync(cancellationToken);

                _logger.LogInformation("Starting data import, validate only: {ValidateOnly}", validateOnly);
                var stopwatch = Stopwatch.StartNew();

                // Process data in batches to avoid excessive memory usage
                int totalItemsProcessed = 0;
                var buffer = new byte[8192]; // 8KB buffer
                var tempFile = Path.GetTempFileName();

                try
                {
                    // Save stream to temporary file to avoid keeping it all in memory
                    using (var fileStream = new FileStream(tempFile, FileMode.Create, FileAccess.ReadWrite))
                    {
                        await dataStream.CopyToAsync(fileStream, buffer.Length, cancellationToken);
                    }

                    // Process the file in batches
                    using (var fileStream = new FileStream(tempFile, FileMode.Open, FileAccess.Read))
                    using (var reader = new StreamReader(fileStream))
                    {
                        var items = new List<DataItem>(_options.BatchSize);
                        string line;
                        
                        while ((line = await reader.ReadLineAsync()) != null)
                        {
                            cancellationToken.ThrowIfCancellationRequested();

                            if (string.IsNullOrWhiteSpace(line))
                                continue;

                            try
                            {
                                var item = ParseDataItem(line);
                                items.Add(item);

                                // When batch size reached, process the batch
                                if (items.Count >= _options.BatchSize)
                                {
                                    int processed = await ProcessBatchAsync(items, validateOnly, cancellationToken);
                                    totalItemsProcessed += processed;
                                    items.Clear();
                                }
                            }
                            catch (Exception ex)
                            {
                                _logger.LogWarning(ex, "Error parsing line: {Line}", line);
                                // Continue with next line
                            }
                        }

                        // Process any remaining items
                        if (items.Count > 0)
                        {
                            int processed = await ProcessBatchAsync(items, validateOnly, cancellationToken);
                            totalItemsProcessed += processed;
                        }
                    }
                }
                finally
                {
                    // Clean up temporary file
                    try
                    {
                        if (File.Exists(tempFile))
                            File.Delete(tempFile);
                    }
                    catch (Exception ex)
                    {
                        _logger.LogWarning(ex, "Error deleting temporary file: {FilePath}", tempFile);
                    }
                }

                stopwatch.Stop();
                _logger.LogInformation("Import completed. {ItemCount} items processed in {ElapsedTime}", 
                    totalItemsProcessed, stopwatch.Elapsed);

                return totalItemsProcessed;
            }
            catch (OperationCanceledException)
            {
                _logger.LogWarning("Import operation was canceled");
                throw;
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error during data import");
                throw new DataServiceException("Failed to import data", ex);
            }
            finally
            {
                _concurrencyLimiter.Release();
            }
        }

        public async Task<OperationResult<int>> ExportDataAsync(string category, Stream outputStream, CancellationToken cancellationToken = default)
        {
            if (string.IsNullOrWhiteSpace(category))
                throw new ArgumentException("Category cannot be empty", nameof(category));

            if (outputStream == null)
                throw new ArgumentNullException(nameof(outputStream));

            if (!outputStream.CanWrite)
                throw new ArgumentException("Output stream must be writable", nameof(outputStream));

            var result = new OperationResult<int>
            {
                Success = false,
                Result = 0
            };

            var stopwatch = Stopwatch.StartNew();

            try
            {
                // Get data (will use cache if available)
                var items = await GetByCategoryAsync(category, cancellationToken);

                if (items.Count == 0)
                {
                    result.Success = true;
                    result.ItemsProcessed = 0;
                    return result;
                }

                // Write to output stream
                using (var writer = new StreamWriter(outputStream, leaveOpen: true))
                {
                    // Write header
                    await writer.WriteLineAsync("Id,Name,Category,Value,LastUpdated,IsActive");

                    // Write data
                    foreach (var item in items)
                    {
                        cancellationToken.ThrowIfCancellationRequested();

                        await writer.WriteLineAsync(FormatCsvLine(item));
                        result.ItemsProcessed++;
                    }

                    await writer.FlushAsync();
                }

                result.Success = true;
                result.Result = result.ItemsProcessed;
            }
            catch (OperationCanceledException)
            {
                _logger.LogWarning("Export operation was canceled");
                throw;
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error during data export for category {Category}", category);
                result.Success = false;
                result.ErrorMessage = $"Export failed: {ex.Message}";
            }
            finally
            {
                stopwatch.Stop();
                result.ElapsedTime = stopwatch.Elapsed;
                
                _logger.LogInformation("Export for category {Category} completed in {ElapsedTime}. Success: {Success}, Items: {ItemCount}", 
                    category, result.ElapsedTime, result.Success, result.ItemsProcessed);
            }

            return result;
        }

        public void ClearCache(string category = null)
        {
            if (string.IsNullOrWhiteSpace(category))
            {
                _logger.LogInformation("Clearing all cache entries");
                
                // No direct way to clear all entries of a specific pattern in IMemoryCache
                // In a real application, consider using a distributed cache with pattern support
            }
            else
            {
                _logger.LogInformation("Clearing cache for category {Category}", category);
                
                _cache.Remove($"data_category_{category}");
                
                // Also consider removing individual items by category
                // This would require tracking which items belong to which category
            }
        }

        private DataItem ParseDataItem(string line)
        {
            // In a real app, use a proper CSV parser or serialization library
            var parts = line.Split(',');
            
            return new DataItem
            {
                Id = int.Parse(parts[0]),
                Name = parts[1],
                Category = parts[2],
                Value = decimal.Parse(parts[3]),
                LastUpdated = DateTime.Parse(parts[4]),
                IsActive = bool.Parse(parts[5])
            };
        }

        private string FormatCsvLine(DataItem item)
        {
            // In a real app, use a proper CSV formatter with escaping
            return $"{item.Id},{EscapeCsvField(item.Name)},{EscapeCsvField(item.Category)}," +
                   $"{item.Value},{item.LastUpdated:s},{item.IsActive}";
        }

        private string EscapeCsvField(string field)
        {
            if (string.IsNullOrEmpty(field))
                return string.Empty;

            if (field.Contains(",") || field.Contains("\\"") || field.Contains("\n"))
            {
                return $"\\"{field.Replace("\\"", "\\"\\"")}\\"";
            }

            return field;
        }

        private async Task<int> ProcessBatchAsync(List<DataItem> items, bool validateOnly, CancellationToken cancellationToken)
        {
            if (items.Count == 0)
                return 0;

            if (validateOnly)
            {
                // In validate-only mode, just return the count
                return items.Count;
            }

            try
            {
                // In a real app, this would send the batch to an API or database
                _logger.LogDebug("Processing batch of {Count} items", items.Count);
                
                await Task.Delay(100, cancellationToken); // Simulate processing time
                
                return items.Count;
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error processing batch of {Count} items", items.Count);
                throw;
            }
        }

        private async Task RetryAsync(Func<Task> action)
        {
            int attempt = 0;
            int delayMs = _options.RetryDelayMilliseconds;
            
            while (true)
            {
                attempt++;
                
                try
                {
                    await action();
                    break; // Success, exit the loop
                }
                catch (Exception ex) when (
                    attempt < _options.RetryCount && 
                    (ex is HttpRequestException || ex is TimeoutException))
                {
                    _logger.LogWarning(ex, "Operation failed on attempt {Attempt}, retrying after {Delay}ms", 
                        attempt, delayMs);
                    
                    await Task.Delay(delayMs);
                    
                    // Exponential backoff with jitter
                    delayMs = (int)(delayMs * 1.5 + new Random().Next(50, 150));
                }
            }
        }

        // IDisposable implementation
        public void Dispose()
        {
            Dispose(true);
            GC.SuppressFinalize(this);
        }

        protected virtual void Dispose(bool disposing)
        {
            if (_disposed) return;

            if (disposing)
            {
                _concurrencyLimiter?.Dispose();
                
                // Dispose all category locks
                foreach (var lockObj in _categoryLocks.Values)
                {
                    lockObj.Dispose();
                }
                
                _categoryLocks.Clear();
            }
            
            _disposed = true;
        }

        ~DataService()
        {
            Dispose(false);
        }
    }
}`,
          exercise: {
            instructions:
              'Create a performance-optimized caching system for an application that needs to retrieve product information. Implement configuration options for different caching strategies, use memory-efficient techniques, and provide methods to clear or refresh specific cache entries. Include proper memory management with the IDisposable pattern.',
          },
        },
      ],
      prepperSummary: `
    <div class="prepper-summary">
      <h3>🔑 Key Interview Takeaways</h3>
      <ul>
        <li><strong>C# Language Fundamentals:</strong> Master the type system, object-oriented features, and advanced language concepts like generics, LINQ, and delegates. A deep understanding of these fundamentals will serve as a solid foundation for all other C# development.</li>
        
        <li><strong>Core Programming Patterns:</strong> Understand asynchronous programming with async/await, implement proper exception handling, and utilize appropriate collection types for different scenarios. These patterns are essential for writing efficient, maintainable code.</li>
        
        <li><strong>Application Development:</strong> Learn the ASP.NET Core framework including MVC, Web API, and Entity Framework Core. Become familiar with dependency injection, authentication mechanisms, and service patterns for building modern web applications.</li>
        
        <li><strong>Configuration and Performance:</strong> Know how to manage configuration across environments and optimize application performance through efficient memory management and caching strategies. These skills are critical for production-ready applications.</li>
      </ul>
      
      <h4>📝 Common Interview Questions</h4>
      <ol>
        <li>"What's the difference between value types and reference types in C#?"</li>
        <li>"Explain how async/await works under the hood"</li>
        <li>"How would you implement dependency injection in an ASP.NET Core application?"</li>
        <li>"Describe the Entity Framework Core lifecycle and potential issues"</li>
        <li>"What are some ways to optimize LINQ queries for better performance?"</li>
        <li>"How would you secure an ASP.NET Core Web API?"</li>
        <li>"Explain the middleware pipeline in ASP.NET Core"</li>
        <li>"How would you handle configuration for different environments?"</li>
        <li>"What are some common memory management pitfalls in C# applications?"</li>
        <li>"Describe how you would structure a complex web application using C# and .NET"</li>
      </ol>
    </div>
  `,
    },
  ],
  challenge: {
    description:
      'You\'re tasked with building a "Task Management API" that demonstrates your mastery of C# and .NET Core concepts. Create a Web API that allows users to manage projects and tasks, with features for user authentication, data persistence, and performance optimization.',
    requirements: [
      'Implement a Web API with endpoints for CRUD operations on projects and tasks',
      'Use Entity Framework Core for data access and migrations',
      'Implement proper authentication and authorization',
      'Create a service layer with dependency injection',
      'Include proper exception handling and logging',
      'Implement caching for frequently accessed data',
      'Add support for asynchronous operations',
      'Create unit and integration tests for key functionality',
      'Use appropriate design patterns (Repository, Unit of Work, etc.)',
      'Include documentation with Swagger/OpenAPI',
    ],
    starterCode: `// This is a starter template for the Task Management API
// You can expand on this structure with your implementation

using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.OpenApi.Models;

namespace TaskManagement.API
{
    public class Program
    {
        public static void Main(string[] args)
        {
            CreateHostBuilder(args).Build().Run();
        }

        public static IHostBuilder CreateHostBuilder(string[] args) =>
            Host.CreateDefaultBuilder(args)
                .ConfigureWebHostDefaults(webBuilder =>
                {
                    webBuilder.UseStartup<Startup>();
                });
    }

    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        public void ConfigureServices(IServiceCollection services)
        {
            // Add DbContext
            services.AddDbContext<ApplicationDbContext>(options =>
                options.UseSqlServer(Configuration.GetConnectionString("DefaultConnection")));
            
            // Add services
            services.AddScoped<IProjectRepository, ProjectRepository>();
            services.AddScoped<ITaskRepository, TaskRepository>();
            services.AddScoped<IProjectService, ProjectService>();
            services.AddScoped<ITaskService, TaskService>();
            
            // Add authentication
            services.AddAuthentication(/* Configure authentication here */);
            
            // Add controllers and API Explorer
            services.AddControllers();
            services.AddEndpointsApiExplorer();
            
            // Add Swagger
            services.AddSwaggerGen(c =>
            {
                c.SwaggerDoc("v1", new OpenApiInfo { Title = "Task Management API", Version = "v1" });
            });
        }

        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
                app.UseSwagger();
                app.UseSwaggerUI(c => c.SwaggerEndpoint("/swagger/v1/swagger.json", "Task Management API v1"));
            }
            else
            {
                app.UseExceptionHandler("/error");
                app.UseHsts();
            }

            app.UseHttpsRedirection();
            app.UseRouting();
            app.UseAuthentication();
            app.UseAuthorization();
            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
            });
        }
    }

    // DbContext
    public class ApplicationDbContext : DbContext
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
            : base(options)
        {
        }
        
        public DbSet<Project> Projects { get; set; }
        public DbSet<TaskItem> Tasks { get; set; }
        public DbSet<User> Users { get; set; }
        
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            // Configure entity relationships and constraints
            
            base.OnModelCreating(modelBuilder);
        }
    }

    // Models
    public class Project
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public DateTime CreatedDate { get; set; }
        public string OwnerId { get; set; }
        
        public virtual ICollection<TaskItem> Tasks { get; set; }
    }

    public class TaskItem
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
        public TaskStatus Status { get; set; }
        public Priority Priority { get; set; }
        public DateTime? DueDate { get; set; }
        public DateTime CreatedDate { get; set; }
        public DateTime? CompletedDate { get; set; }
        
        public int ProjectId { get; set; }
        public virtual Project Project { get; set; }
        
        public string AssignedToId { get; set; }
    }

    public enum TaskStatus
    {
        ToDo,
        InProgress,
        Testing,
        Done
    }

    public enum Priority
    {
        Low,
        Medium,
        High,
        Critical
    }

    public class User
    {
        public string Id { get; set; }
        public string UserName { get; set; }
        public string Email { get; set; }
    }

    // Repositories
    public interface IProjectRepository
    {
        Task<IEnumerable<Project>> GetAllAsync();
        Task<Project> GetByIdAsync(int id);
        Task<Project> AddAsync(Project project);
        Task UpdateAsync(Project project);
        Task DeleteAsync(int id);
    }

    public interface ITaskRepository
    {
        Task<IEnumerable<TaskItem>> GetAllAsync();
        Task<IEnumerable<TaskItem>> GetByProjectIdAsync(int projectId);
        Task<TaskItem> GetByIdAsync(int id);
        Task<TaskItem> AddAsync(TaskItem task);
        Task UpdateAsync(TaskItem task);
        Task DeleteAsync(int id);
    }

    // Services
    public interface IProjectService
    {
        Task<IEnumerable<ProjectDto>> GetAllProjectsAsync();
        Task<ProjectDto> GetProjectByIdAsync(int id);
        Task<ProjectDto> CreateProjectAsync(CreateProjectDto projectDto);
        Task UpdateProjectAsync(UpdateProjectDto projectDto);
        Task DeleteProjectAsync(int id);
    }

    public interface ITaskService
    {
        Task<IEnumerable<TaskDto>> GetAllTasksAsync();
        Task<IEnumerable<TaskDto>> GetTasksByProjectIdAsync(int projectId);
        Task<TaskDto> GetTaskByIdAsync(int id);
        Task<TaskDto> CreateTaskAsync(CreateTaskDto taskDto);
        Task UpdateTaskAsync(UpdateTaskDto taskDto);
        Task DeleteTaskAsync(int id);
    }

    // DTOs
    public class ProjectDto
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public DateTime CreatedDate { get; set; }
        public string OwnerId { get; set; }
    }

    public class CreateProjectDto
    {
        public string Name { get; set; }
        public string Description { get; set; }
    }

    public class UpdateProjectDto
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
    }

    public class TaskDto
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
        public TaskStatus Status { get; set; }
        public Priority Priority { get; set; }
        public DateTime? DueDate { get; set; }
        public DateTime CreatedDate { get; set; }
        public DateTime? CompletedDate { get; set; }
        public int ProjectId { get; set; }
        public string AssignedToId { get; set; }
    }

    public class CreateTaskDto
    {
        public string Title { get; set; }
        public string Description { get; set; }
        public TaskStatus Status { get; set; }
        public Priority Priority { get; set; }
        public DateTime? DueDate { get; set; }
        public int ProjectId { get; set; }
        public string AssignedToId { get; set; }
    }

    public class UpdateTaskDto
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
        public TaskStatus Status { get; set; }
        public Priority Priority { get; set; }
        public DateTime? DueDate { get; set; }
        public string AssignedToId { get; set; }
    }

    // Controllers
    [ApiController]
    [Route("api/[controller]")]
    public class ProjectsController : ControllerBase
    {
        private readonly IProjectService _projectService;
        
        public ProjectsController(IProjectService projectService)
        {
            _projectService = projectService;
        }
        
        [HttpGet]
        public async Task<ActionResult<IEnumerable<ProjectDto>>> GetProjects()
        {
            // Implement method
            throw new NotImplementedException();
        }
        
        [HttpGet("{id}")]
        public async Task<ActionResult<ProjectDto>> GetProject(int id)
        {
            // Implement method
            throw new NotImplementedException();
        }
        
        [HttpPost]
        public async Task<ActionResult<ProjectDto>> CreateProject(CreateProjectDto projectDto)
        {
            // Implement method
            throw new NotImplementedException();
        }
        
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateProject(int id, UpdateProjectDto projectDto)
        {
            // Implement method
            throw new NotImplementedException();
        }
        
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteProject(int id)
        {
            // Implement method
            throw new NotImplementedException();
        }
    }

    [ApiController]
    [Route("api/[controller]")]
    public class TasksController : ControllerBase
    {
        private readonly ITaskService _taskService;
        
        public TasksController(ITaskService taskService)
        {
            _taskService = taskService;
        }
        
        [HttpGet]
        public async Task<ActionResult<IEnumerable<TaskDto>>> GetTasks()
        {
            // Implement method
            throw new NotImplementedException();
        }
        
        [HttpGet("{id}")]
        public async Task<ActionResult<TaskDto>> GetTask(int id)
        {
            // Implement method
            throw new NotImplementedException();
        }
        
        [HttpGet("project/{projectId}")]
        public async Task<ActionResult<IEnumerable<TaskDto>>> GetTasksByProject(int projectId)
        {
            // Implement method
            throw new NotImplementedException();
        }
        
        [HttpPost]
        public async Task<ActionResult<TaskDto>> CreateTask(CreateTaskDto taskDto)
        {
            // Implement method
            throw new NotImplementedException();
        }
        
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateTask(int id, UpdateTaskDto taskDto)
        {
            // Implement method
            throw new NotImplementedException();
        }
        
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteTask(int id)
        {
            // Implement method
            throw new NotImplementedException();
        }
    }
}`,
  },
}

export default csharpShortlistReview
