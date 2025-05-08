export default [
  {
    id: 'csharp-fundamentals',
    title: 'C# Fundamentals',
    questions: [
      {
        text: "What's the difference between value types and reference types in C#?",
        answer:
          "Value types (int, float, struct, enum) store their data directly and are kept on the stack. Reference types (classes, interfaces, delegates, objects) store a reference to their data on the heap. Value types are copied when assigned, while reference types share the same instance when assigned to multiple variables. Value types cannot be null unless they're nullable types (int?, double?).",
      },
      {
        text: "What is the 'using' statement in C# and how is it used?",
        answer:
          'The using statement in C# provides a convenient syntax that ensures proper disposal of IDisposable objects. It automatically calls the Dispose() method when the object goes out of scope, even if exceptions occur. This is essential for managing resources like file handles, database connections, and network resources. It can be used as a statement block or, in C# 8.0+, as a declaration.',
      },
      {
        text: 'What are extension methods in C#?',
        answer:
          'Extension methods allow you to add methods to existing types without modifying or inheriting from them. They are defined as static methods in static classes, with the first parameter using the "this" keyword followed by the type being extended. They\'re particularly useful for adding functionality to sealed classes, primitive types, or interfaces, and are the foundation of LINQ\'s fluent syntax.',
      },
      {
        text: "Explain the purpose of 'async' and 'await' keywords in C#",
        answer:
          'The async and await keywords simplify asynchronous programming in C#. The async modifier indicates that a method contains await expressions and can be executed asynchronously. The await operator suspends execution of the method until the awaited task completes, without blocking the thread. This enables efficient resource usage for I/O-bound operations (database, file, network) and UI responsiveness in client applications.',
      },
      {
        text: 'What are LINQ and Lambda expressions?',
        answer:
          'LINQ (Language Integrated Query) is a set of features that add query capabilities to C#, allowing you to query various data sources with a unified syntax. Lambda expressions are anonymous functions written in a concise syntax (x => x.Property) that are commonly used with LINQ. Together, they enable a declarative, SQL-like approach to data manipulation that works with in-memory collections, databases, XML, and other sources.',
      },
      {
        text: "Explain the difference between 'ref', 'out', and 'in' parameters",
        answer:
          "These are parameter modifiers that affect how arguments are passed to methods: <br>- <code>ref</code>: The parameter is passed by reference, allowing the method to modify its value. The argument must be initialized before passing.<br>- <code>out</code>: Similar to ref, but the argument doesn't need to be initialized before passing, and the method must assign a value to it.<br>- <code>in</code>: The parameter is passed by reference but is read-only within the method, preventing modifications. Improves performance for large value types without copying.",
      },
      {
        text: "What's the difference between 'const' and 'readonly' in C#?",
        answer:
          '<code>const</code> is for compile-time constants that must be assigned at declaration and cannot be changed. Only primitive types and strings can be const, and they are implicitly static.<br><code>readonly</code> fields can be assigned at declaration or in a constructor, allowing runtime values. They can be instance members or static, and can hold any type including reference types. Once assigned, they cannot be modified except in a constructor.',
      },
      {
        text: 'What is the purpose of the "nameof" operator?',
        answer:
          "The <code>nameof</code> operator returns the name of a variable, type, or member as a string. It's useful for generating error messages, logging, and binding scenarios. Since it's evaluated at compile-time, it provides compile-time safety (when a name changes, references to it through nameof will be updated), unlike string literals which would need manual updates.",
      },
    ],
  },
  {
    id: 'csharp-oop',
    title: 'Object-Oriented Programming',
    questions: [
      {
        text: 'What is the difference between interface and abstract class in C#?',
        answer:
          'Interfaces define contracts with no implementation (C# 8.0+ allows default implementations). Abstract classes can have both abstract methods and implemented methods. A class can implement multiple interfaces but inherit from only one abstract class. Abstract classes can have constructors, fields, and access modifiers, while interfaces traditionally cannot. Use interfaces for unrelated class functionality and abstract classes for base class functionality in a class hierarchy.',
      },
      {
        text: 'What are the access modifiers in C# and their scope?',
        answer:
          'C# provides several access modifiers: <br>1) <code>public</code>: Accessible from anywhere<br>2) <code>private</code>: Accessible only within the same class<br>3) <code>protected</code>: Accessible within the same class and derived classes<br>4) <code>internal</code>: Accessible within the same assembly<br>5) <code>protected internal</code>: Accessible within the same assembly or derived classes<br>6) <code>private protected</code> (C# 7.2+): Accessible within the same class or derived classes within the same assembly.',
      },
      {
        text: 'What is method overloading and method overriding?',
        answer:
          'Method overloading allows multiple methods with the same name but different parameters (different count, order, or types) in the same class. It\'s resolved at compile time. Method overriding allows a derived class to provide a specific implementation of a method already defined in the base class using the "override" keyword. The base class method must be marked as "virtual", "abstract", or "override". Overriding is resolved at runtime based on object\'s actual type.',
      },
      {
        text: 'What are delegates and events in C#?',
        answer:
          'Delegates are type-safe function pointers that encapsulate a method with a specific signature. They enable callback functionality and form the basis for events.<br>Events are a way to implement the Observer pattern using delegates, allowing classes to notify other classes when something happens. An event is a wrapper around a delegate that restricts operations to subscribe/unsubscribe (+=/-=), preventing external code from directly invoking or reassigning the delegate.',
      },
      {
        text: 'What is the purpose of the "sealed" keyword?',
        answer:
          'The <code>sealed</code> keyword prevents inheritance from a class or prevents overriding of a method or property. When applied to a class, no other class can inherit from it. When applied to a method or property that overrides a base class member, it prevents further overriding in derived classes. Sealing improves performance by enabling runtime optimizations and explicitly communicates design intent.',
      },
      {
        text: 'What are generics in C# and why are they useful?',
        answer:
          'Generics allow you to define type-safe data structures and methods without committing to a specific data type. They provide type safety at compile time and eliminate the need for casting and boxing/unboxing operations, improving performance and reducing runtime errors. Generic types in C# can have constraints that restrict what types can be used, and they support covariance and contravariance for more flexible type relationships.',
      },
    ],
  },
  {
    id: 'advanced-features',
    title: 'Advanced C# Features',
    questions: [
      {
        text: 'What are attributes in C# and how are they used?',
        answer:
          'Attributes are declarative tags that add metadata to code elements (classes, methods, properties, etc.). They provide information to the runtime or development tools about how code elements behave or should be treated. Attributes are defined by classes that inherit from <code>System.Attribute</code> and are applied using square brackets []. Common uses include serialization configuration, compiler behavior control, and providing runtime information through reflection.',
      },
      {
        text: 'Explain reflection in C# and give examples of when to use it',
        answer:
          'Reflection is the ability to inspect, access, and manipulate code at runtime. It allows programs to discover information about types, methods, properties, etc., and to create instances, invoke methods, and access properties dynamically. Reflection is useful for scenarios like plugin architectures, serialization/deserialization, mapping frameworks (like ORMs), dependency injection containers, and creating dynamic proxies. It comes with performance costs, so it should be used judiciously.',
      },
      {
        text: 'What are Expression Trees in C# and what are they used for?',
        answer:
          "Expression Trees represent code as data structures that can be examined and modified at runtime. They convert lambda expressions or method bodies into a tree of objects that represent the code's structure. Expression Trees are primarily used for:<br>- LINQ providers that translate expressions to other forms (like SQL)<br>- Dynamic query construction<br>- Code generation and compilation at runtime<br>- Enabling remote execution of code by translating C# expressions to other languages or protocols",
      },
      {
        text: 'What are tuples in C# and when should you use them?',
        answer:
          'Tuples are lightweight data structures that group multiple values into a single unit without having to define a separate type. In C# 7+, tuples can have named elements for better readability. Tuples are best used for:<br>- Returning multiple values from a method without using out parameters<br>- Temporary grouping of related values<br>- Pattern matching against multiple values<br>They should be avoided for complex data structures or public APIs where a proper class or record would be more maintainable.',
      },
      {
        text: 'What are records in C# and how do they differ from classes?',
        answer:
          'Records (introduced in C# 9) are reference types designed for immutable data. Key differences from classes:<br>- Records use value-based equality (two records with identical values are equal)<br>- They provide built-in functionality for value equality, GetHashCode, and ToString<br>- They support positional syntax for concise initialization and deconstruction<br>- They offer with-expressions for non-destructive mutation<br>- They facilitate inheritance patterns specific to immutable data<br>Records are ideal for DTOs, immutable domain models, and value objects.',
      },
      {
        text: 'What are nullable reference types in C# and why were they introduced?',
        answer:
          'Nullable reference types (introduced in C# 8.0) help prevent the null reference exception by distinguishing between nullable and non-nullable reference types. When enabled, reference types are non-nullable by default, and you must use the ? suffix (e.g., <code>string?</code>) to declare a nullable reference type. This feature helps catch potential null reference errors at compile time rather than runtime, improving code quality and safety without changing the runtime behavior of the program.',
      },
      {
        text: 'Explain pattern matching in C# and provide examples',
        answer:
          'Pattern matching allows testing a value against a pattern and conditional execution based on the match. C# supports several patterns:<br>- Type patterns: <code>if (obj is string s) { /* use s */ }</code><br>- Constant patterns: <code>if (value is 0) { /* zero */ }</code><br>- Property patterns: <code>if (person is { Age: > 18 })</code><br>- Tuple patterns: <code>if (point is (0, 0)) { /* origin */ }</code><br>- Switch expressions: <code>string result = shape switch { Circle c => $"Circle r={c.Radius}", _ => "Unknown" };</code><br>Pattern matching simplifies code that would otherwise require type checking and casting.',
      },
    ],
  },
  {
    id: 'core-programming',
    title: 'Core Programming Patterns',
    questions: [
      {
        text: 'What is the Task-based Asynchronous Pattern (TAP) in C#?',
        answer:
          'TAP is the recommended pattern for asynchronous operations in .NET using <code>Task</code> and <code>Task<T></code> objects with async/await keywords. Key principles include:<br>- Async methods return Task or Task<T> for operations that return values<br>- Naming async methods with the "Async" suffix<br>- Providing cancellation support via CancellationToken parameters<br>- Using Task.WhenAll/WhenAny for parallel operations<br>- Using ConfigureAwait(false) in library code to avoid context capturing<br>- Properly propagating exceptions through the task object',
      },
      {
        text: 'Explain exception handling best practices in C#',
        answer:
          'Exception handling best practices include:<br>- Catch only exceptions you can handle meaningfully<br>- Use specific exception types before more general ones<br>- Throw exceptions that maintain the stack trace (use "throw;" not "throw ex;")<br>- Create custom exceptions for your domain-specific errors<br>- Use finally blocks or using statements to ensure resources are cleaned up<br>- Avoid catching System.Exception except at application boundaries<br>- Log detailed exception information including inner exceptions<br>- Consider using exception filters (when clause) for conditional catching',
      },
      {
        text: 'What are the different collection types in C# and when should each be used?',
        answer:
          'Common collection types and their use cases:<br>- <code>List<T></code>: General-purpose list with dynamic size, good for sequential access<br>- <code>Dictionary<TKey, TValue></code>: Fast key-based lookups<br>- <code>HashSet<T></code>: Unique values with fast lookups and set operations<br>- <code>Queue<T></code>: FIFO (First-In-First-Out) operations<br>- <code>Stack<T></code>: LIFO (Last-In-First-Out) operations<br>- <code>LinkedList<T></code>: Fast insertions/removals anywhere in the list<br>- <code>SortedList<TKey, TValue></code>, <code>SortedDictionary<TKey, TValue></code>: Sorted key-value pairs<br>- <code>ConcurrentDictionary<TKey, TValue></code>, etc.: Thread-safe collections for concurrent access',
      },
      {
        text: 'What is the IDisposable pattern and why is it important?',
        answer:
          "The IDisposable pattern provides a standardized way to release unmanaged resources (file handles, database connections, network resources, etc.) that aren't automatically cleaned up by the garbage collector. Implementing IDisposable involves:<br>1. A public Dispose() method that releases resources<br>2. A protected virtual Dispose(bool) method for cleaning up (true=called from Dispose, false=called from finalizer)<br>3. A finalizer as a fallback (only for classes with unmanaged resources)<br>4. Suppressing the finalizer in Dispose()<br>This pattern ensures timely resource cleanup, prevents resource leaks, and follows a consistent approach across the .NET ecosystem.",
      },
      {
        text: 'What are the different ways to implement cancellation in asynchronous operations?',
        answer:
          'Cancellation in asynchronous operations is typically implemented using:<br>1. <code>CancellationTokenSource</code> to create and trigger cancellation<br>2. <code>CancellationToken</code> passed to async methods to support cancellation<br>3. Methods checking for cancellation using <code>token.IsCancellationRequested</code> or <code>token.ThrowIfCancellationRequested()</code><br>4. Registering cleanup actions with <code>token.Register()</code> to handle resource cleanup on cancellation<br>5. Linked tokens to combine multiple cancellation sources<br>6. Timeout-based cancellation using <code>CancellationTokenSource.CancelAfter()</code><br>Proper cancellation avoids wasted resources and provides responsive user experiences.',
      },
    ],
  },
  {
    id: 'linq-orm',
    title: 'LINQ and ORM',
    questions: [
      {
        text: 'What is LINQ and what are its key components?',
        answer:
          'LINQ (Language Integrated Query) is a set of features in C# that provides query capabilities across different data sources. Key components include:<br>1. <strong>Query syntax</strong>: SQL-like syntax (from x in collection where x.Property...)<br>2. <strong>Method syntax</strong>: Chainable extension methods (collection.Where().Select()...)<br>3. <strong>Lambda expressions</strong>: Shorthand for delegates used in query predicates<br>4. <strong>Expression trees</strong>: Represent code as data structure for translation to other forms<br>5. <strong>LINQ providers</strong>: Implementations for specific data sources (LINQ to Objects, LINQ to SQL, LINQ to XML, Entity Framework)<br>LINQ enables a consistent query approach regardless of the data source, improving code readability and maintainability.',
      },
      {
        text: 'Explain the difference between deferred and immediate execution in LINQ',
        answer:
          'LINQ execution strategies:<br><strong>Deferred (lazy) execution</strong>:<br>- Query is not executed when defined, only when enumerated<br>- Occurs with methods returning IEnumerable, IQueryable<br>- Examples: Where, Select, OrderBy, GroupBy, Join<br>- Benefits include composability and efficiency with large datasets<br>- Can cause unexpected results if the data source changes between definition and execution<br><br><strong>Immediate execution</strong>:<br>- Query executes at the point of definition<br>- Occurs with methods that must process all elements or return a single value<br>- Examples: ToList, ToArray, Count, Sum, Average, First, Any<br>- Creates a snapshot of data at execution time<br>- Useful when you need fixed results or when executing against volatile data',
      },
      {
        text: 'What is the difference between IEnumerable<T> and IQueryable<T> in LINQ?',
        answer:
          '<code>IEnumerable&lt;T&gt;</code> and <code>IQueryable&lt;T&gt;</code> differences:<br>1. <strong>Query execution</strong>:<br>   - IEnumerable: Queries execute in memory (LINQ to Objects)<br>   - IQueryable: Queries can be translated to the data source (SQL, etc.)<br>2. <strong>Expression handling</strong>:<br>   - IEnumerable: Uses delegates (compiled code)<br>   - IQueryable: Uses expression trees (can be analyzed and transformed)<br>3. <strong>Performance implications</strong>:<br>   - IEnumerable: Retrieves all data then filters in application<br>   - IQueryable: Filters at the data source, retrieving only necessary data<br>4. <strong>When to use</strong>:<br>   - IEnumerable: In-memory collections, after data is retrieved<br>   - IQueryable: Database queries, remote services where minimizing data transfer is important',
      },
      {
        text: 'What are the key differences between various ORM frameworks in .NET?',
        answer:
          "Key differences between .NET ORM frameworks:<br><strong>Entity Framework Core</strong>:<br>- Microsoft's official ORM with tight Visual Studio integration<br>- Code-first, database-first, and model-first approaches<br>- LINQ provider with strong type safety<br>- Built-in migration system<br>- Broad database provider support<br><br><strong>Dapper</strong>:<br>- Micro-ORM focused on performance<br>- Uses direct SQL queries with parameter mapping<br>- Minimal overhead and configuration<br>- Simple object mapping without change tracking<br>- Best for read-heavy applications<br><br><strong>NHibernate</strong>:<br>- Mature ORM with rich feature set<br>- Sophisticated caching mechanisms<br>- Advanced mapping capabilities<br>- Strong support for domain-driven design<br>- Steeper learning curve<br><br>Consider performance requirements, project complexity, team expertise, and specific features when choosing an ORM.",
      },
      {
        text: 'What are some performance best practices when using LINQ with Entity Framework?',
        answer:
          'LINQ with Entity Framework performance best practices:<br>1. <strong>Use <code>AsNoTracking()</code></strong> for read-only queries to reduce memory usage<br>2. <strong>Select only needed columns</strong> with projection (<code>Select()</code>) instead of retrieving entire entities<br>3. <strong>Filter data at the database</strong> (<code>Where()</code>) before retrieving<br>4. <strong>Use <code>Include()</code> judiciously</strong> and only load related data when needed<br>5. <strong>Understand execution timing</strong> - use ToList() or similar at appropriate points<br>6. <strong>Avoid N+1 query problems</strong> by properly including related entities<br>7. <strong>Use pagination</strong> with Skip/Take for large result sets<br>8. <strong>Consider raw SQL</strong> for complex queries via FromSqlRaw or ExecuteSqlCommand<br>9. <strong>Analyze generated SQL</strong> with logging or profiling tools<br>10. <strong>Use appropriate indexes</strong> on database columns used in queries',
      },
      {
        text: 'How would you implement a repository pattern with Entity Framework Core?',
        answer:
          'Repository pattern implementation with Entity Framework Core:<br><br><strong>1. Define interfaces</strong>:<br><code>public interface IRepository&lt;T&gt; where T : class<br>{<br>    Task&lt;T&gt; GetByIdAsync(int id);<br>    Task&lt;IEnumerable&lt;T&gt;&gt; GetAllAsync();<br>    Task&lt;IEnumerable&lt;T&gt;&gt; FindAsync(Expression&lt;Func&lt;T, bool&gt;&gt; predicate);<br>    Task AddAsync(T entity);<br>    Task UpdateAsync(T entity);<br>    Task DeleteAsync(T entity);<br>}</code><br><br><strong>2. Implement generic repository</strong>:<br><code>public class Repository&lt;T&gt; : IRepository&lt;T&gt; where T : class<br>{<br>    protected readonly DbContext Context;<br>    public Repository(DbContext context) => Context = context;<br>    <br>    public async Task&lt;T&gt; GetByIdAsync(int id) => await Context.Set&lt;T&gt;().FindAsync(id);<br>    public async Task&lt;IEnumerable&lt;T&gt;&gt; GetAllAsync() => await Context.Set&lt;T&gt;().ToListAsync();<br>    public async Task&lt;IEnumerable&lt;T&gt;&gt; FindAsync(Expression&lt;Func&lt;T, bool&gt;&gt; predicate) => <br>        await Context.Set&lt;T&gt;().Where(predicate).ToListAsync();<br>    public async Task AddAsync(T entity) => await Context.Set&lt;T&gt;().AddAsync(entity);<br>    public Task UpdateAsync(T entity) { Context.Set&lt;T&gt;().Update(entity); return Task.CompletedTask; }<br>    public Task DeleteAsync(T entity) { Context.Set&lt;T&gt;().Remove(entity); return Task.CompletedTask; }<br>}</code><br><br><strong>3. Add Unit of Work (optional)</strong> to manage transaction scope and coordinate multiple repositories.',
      },
    ],
  },
  {
    id: 'classes-ef-migrations',
    title: 'Classes and EF Migrations',
    questions: [
      {
        text: 'What are the best practices for designing entity classes in Entity Framework Core?',
        answer:
          'Best practices for EF Core entity design:<br>1. <strong>Use proper property types</strong> that match database column types<br>2. <strong>Define a key property</strong> (conventionally Id or EntityNameId)<br>3. <strong>Use navigation properties</strong> to represent relationships<br>4. <strong>Include foreign key properties</strong> alongside navigation properties<br>5. <strong>Consider using shadow properties</strong> for fields not needed in the domain model<br>6. <strong>Use data annotations or fluent API</strong> for configuration beyond conventions<br>7. <strong>Implement validation</strong> with data annotations or fluent validation<br>8. <strong>Use value objects</strong> with owned entity types for domain concepts<br>9. <strong>Consider table splitting</strong> for large entities that map to multiple tables<br>10. <strong>Add appropriate indexes</strong> through the fluent API<br>11. <strong>Avoid lazy loading</strong> in web applications due to potential performance issues<br>12. <strong>Consider implementing audit fields</strong> (CreatedDate, ModifiedBy, etc.)',
      },
      {
        text: 'Explain the different mapping strategies in Entity Framework Core',
        answer:
          'Entity Framework Core mapping strategies:<br>1. <strong>Convention-based mapping</strong>:<br>   - Uses naming conventions (Id for primary key, ClassNameId for foreign key)<br>   - Property types mapped to appropriate database types<br>   - Navigation properties indicate relationships<br><br>2. <strong>Data Annotations</strong>:<br>   - Attributes applied to classes/properties (<code>[Table], [Key], [Column], [ForeignKey], etc.</code>)<br>   - Good for simple customizations and validation<br><br>3. <strong>Fluent API</strong> (most powerful):<br>   - Configuration in <code>OnModelCreating</code> method<br>   - Comprehensive control over mapping (<code>HasKey, HasOne, HasMany, Property, etc.</code>)<br>   - Can be externalized to separate configuration classes with <code>IEntityTypeConfiguration&lt;T&gt;</code><br><br>4. <strong>Special mapping types</strong>:<br>   - <code>Owned Entity Types</code> for value objects<br>   - <code>Table-per-Hierarchy (TPH)</code> for inheritance (default)<br>   - <code>Table-per-Type (TPT)</code> for inheritance with separate tables<br>   - <code>Many-to-many</code> with join entities or pure many-to-many relationships',
      },
      {
        text: 'What are database migrations and how do they work in Entity Framework Core?',
        answer:
          'Database migrations in EF Core are a way to evolve the database schema alongside your model changes while preserving existing data. The migration process:<br><br>1. <strong>Creating migrations</strong>:<br>   - <code>Add-Migration MigrationName</code> command compares the current model to a snapshot<br>   - Generates C# code with <code>Up()</code> and <code>Down()</code> methods containing migration operations<br>   - Each migration has a unique identifier and is tracked in the migrations history table<br><br>2. <strong>Applying migrations</strong>:<br>   - <code>Update-Database</code> command or <code>context.Database.Migrate()</code> applies pending migrations<br>   - Executes the <code>Up()</code> method of each pending migration in order<br>   - Updates the migrations history table to track which migrations have been applied<br><br>3. <strong>Reverting migrations</strong>:<br>   - <code>Update-Database MigrationName</code> reverts to a specific migration<br>   - Executes the <code>Down()</code> method of migrations in reverse order<br><br>4. <strong>Customizing migrations</strong>:<br>   - Migrations are code files that can be edited to handle complex schema changes<br>   - Can include raw SQL for operations not supported by the migrations API',
      },
      {
        text: 'How would you handle complex database schema changes with EF Core migrations?',
        answer:
          'Handling complex schema changes with EF Core migrations:<br>1. <strong>Data preservation strategies</strong>:<br>   - Use temporary columns for data transformation<br>   - Manually add SQL commands to move data between structures<br>   - Implement custom migration operations<br><br>2. <strong>Custom migration code</strong>:<br>   - Edit the generated migration file to add custom logic<br>   - Use <code>migrationBuilder.Sql(\\"SQL STATEMENT\\")</code> for raw SQL operations<br>   - Break complex changes into multiple smaller migrations<br><br>3. <strong>Handling challenging scenarios</strong>:<br>   - Renaming tables/columns: Use <code>RenameColumn/RenameTable</code> instead of drop and create<br>   - Splitting tables: Create new table, copy data, then drop original<br>   - Changing column types: Create new column, transform data, drop old column, rename new column<br><br>4. <strong>Testing migrations</strong>:<br>   - Create a test database with production-like data<br>   - Script migrations and review before applying<br>   - Practice rollback procedures<br>   - Measure migration execution time for production planning',
      },
      {
        text: 'What is the difference between Code-First and Database-First approaches in Entity Framework?',
        answer:
          '<strong>Code-First approach</strong>:<br>- Define entity classes in code, then generate database schema<br>- Use migrations to evolve the database schema over time<br>- Better for new projects or when the domain model drives the design<br>- Supports fine-grained control through fluent API or attributes<br>- Enables source control of database schema changes<br>- Works well with domain-driven design<br><br><strong>Database-First approach</strong>:<br>- Start with existing database, scaffold entity classes<br>- Use <code>Scaffold-DbContext</code> command to generate models<br>- Better for existing databases or when database schema is primary<br>- Changes to database require re-scaffolding of models<br>- More challenging to use with sophisticated domain models<br>- Limited control over generated code<br><br>EF Core emphasizes Code-First, though Database-First is supported. A hybrid approach is also possible using manual adjustments to scaffolded models.',
      },
      {
        text: 'How would you handle database seeding with EF Core migrations?',
        answer:
          'Database seeding strategies with EF Core:<br>1. <strong>Using model seed data</strong> (recommended):<br>   - Configure in ModelBuilder:<br>   <code>modelBuilder.Entity&lt;Category&gt;().HasData(<br>      new Category { Id = 1, Name = "Electronics" },<br>      new Category { Id = 2, Name = "Books" }<br>   );</code><br>   - Changes tracked and applied through migrations<br>   - Requires explicit ID values for all seeded entities<br><br>2. <strong>Custom migration code</strong>:<br>   - Add SQL insert statements in migration\'s Up method:<br>   <code>migrationBuilder.Sql("INSERT INTO Categories VALUES (1, \'Electronics\');")</code><br>   - Add corresponding DELETE statements in Down method<br>   - Useful for complex data or conditional seeding<br><br>3. <strong>Programmatic seeding in app startup</strong>:<br>   - Check and seed data on application start<br>   - Useful for development environments or reference data<br>   - Can leverage business logic for entity creation<br>   <code>if (!context.Users.Any()) { context.Users.Add(new User {...}); context.SaveChanges(); }</code>',
      },
    ],
  },
  {
    id: 'aspnet-core',
    title: 'ASP.NET Core',
    questions: [
      {
        text: 'Explain the middleware pipeline in ASP.NET Core',
        answer:
          'The ASP.NET Core middleware pipeline is a series of components that handle HTTP requests and responses. Each middleware performs a specific function and can either:<br>1. Process the request and pass it to the next middleware<br>2. Short-circuit the pipeline by not calling the next middleware<br>3. Process the response after the next middleware has processed it<br>Middleware is added in the Configure method using app.UseXxx methods, and the order is important. Common middleware includes routing, authentication, authorization, exception handling, static files, and endpoint execution.',
      },
      {
        text: 'What is dependency injection in ASP.NET Core and how is it implemented?',
        answer:
          "Dependency Injection (DI) is a built-in feature in ASP.NET Core that supports the Inversion of Control principle. It allows services to be registered and resolved throughout the application. The three main service lifetimes are:<br>1. <code>Singleton</code>: Same instance for the entire application<br>2. <code>Scoped</code>: Same instance within a request scope<br>3. <code>Transient</code>: New instance every time it's requested<br>Services are registered in the ConfigureServices method using <code>services.AddXxx</code> methods and are injected via constructor, method, or property injection. The built-in container can be replaced with third-party containers for advanced scenarios.",
      },
      {
        text: 'What is the difference between MVC and Razor Pages in ASP.NET Core?',
        answer:
          'MVC (Model-View-Controller) and Razor Pages are two programming models in ASP.NET Core:<br>- MVC separates concerns into Models (data), Views (UI), and Controllers (handling requests/logic)<br>- Razor Pages uses a page-based model with the code and UI more closely coupled in Page Model classes<br><br>Key differences:<br>- Razor Pages are simpler for page-focused scenarios<br>- MVC offers more separation of concerns and is better for complex applications<br>- Razor Pages use a file-based routing approach (@page directive)<br>- MVC uses controller/action based routing<br>Both can coexist in the same application and share many features like tag helpers and view components.',
      },
      {
        text: 'How would you implement authentication and authorization in an ASP.NET Core application?',
        answer:
          'Authentication and authorization in ASP.NET Core:<br>1. <strong>Authentication</strong>: Add the authentication services and middleware:<br>   - <code>services.AddAuthentication()</code> with scheme configuration (JWT, Cookie, etc.)<br>   - <code>app.UseAuthentication()</code> in the middleware pipeline<br>   - Configure Identity (<code>services.AddIdentity<>()</code>) or custom authentication<br><br>2. <strong>Authorization</strong>: Configure authorization policies and apply them:<br>   - <code>services.AddAuthorization(options => { options.AddPolicy(...); })</code><br>   - <code>app.UseAuthorization()</code> in the middleware pipeline<br>   - Apply [Authorize] attributes to controllers, actions, or Razor Pages<br>   - Use policy-based authorization with requirements and handlers for complex scenarios<br>   - Implement resource-based authorization where needed',
      },
      {
        text: 'What is Minimal API in ASP.NET Core and when would you use it?',
        answer:
          'Minimal API is a simplified approach to building HTTP APIs in ASP.NET Core with reduced ceremony. It allows defining endpoints directly in Program.cs without controllers using lambda expressions. Features include:<br>- Concise syntax for defining routes and handlers<br>- Easy access to dependency injection<br>- Support for OpenAPI/Swagger documentation<br>- Parameter binding from route, query, body, etc.<br><br>Use Minimal API for:<br>- Microservices with straightforward endpoints<br>- Simple APIs with few endpoints<br>- Prototyping and learning scenarios<br>For complex APIs with many endpoints, advanced authorization, or extensive filters, traditional controller-based APIs may be more maintainable.',
      },
      {
        text: 'What are Tag Helpers in ASP.NET Core and how do they improve Razor views?',
        answer:
          'Tag Helpers are C# classes that enhance HTML elements in Razor views with server-side processing. They provide an HTML-friendly way to add server-side logic to views. Benefits include:<br>1. More natural, HTML-like syntax compared to HTML Helpers<br>2. IntelliSense support in the IDE<br>3. Better separation of concerns between markup and server code<br>4. Easier for front-end developers to understand and work with<br><br>Common tag helpers include form-related helpers (form, input, validation), anchor tags, cache-related helpers, and environment-specific rendering. Custom tag helpers can be created by inheriting from TagHelper class and implementing the Process or ProcessAsync method.',
      },
    ],
  },
  {
    id: 'entity-framework',
    title: 'Entity Framework Core',
    questions: [
      {
        text: 'What is Entity Framework Core and how does it differ from traditional ADO.NET?',
        answer:
          'Entity Framework Core (EF Core) is an object-relational mapper (ORM) that enables .NET developers to work with databases using .NET objects. Compared to traditional ADO.NET:<br>- EF Core works with domain objects, eliminating the need for most data access code<br>- It automatically generates SQL based on LINQ queries<br>- It tracks changes to objects and manages updates<br>- It handles relationships between entities<br>- It provides migration capabilities for database schema evolution<br>- It abstracts database provider details, allowing switching between databases<br>ADO.NET provides more direct control and potentially better performance for specific optimized scenarios, while EF Core offers greater productivity and maintainability.',
      },
      {
        text: 'Explain the different ways to configure entity relationships in EF Core',
        answer:
          'Entity relationships in EF Core can be configured using:<br>1. <strong>Convention-based configuration</strong>: Using naming conventions (e.g., Id or ClassId for foreign keys)<br>2. <strong>Data Annotations</strong>: Using attributes like [ForeignKey], [InverseProperty], etc.<br>3. <strong>Fluent API</strong> in OnModelCreating: Most powerful approach with methods like:<br>   - <code>HasOne/HasMany</code> to define the relationship type<br>   - <code>WithOne/WithMany</code> to define the inverse relationship<br>   - <code>HasForeignKey</code> to specify the foreign key property<br>   - <code>IsRequired</code> to make relationships required<br>   - <code>OnDelete</code> to configure delete behavior<br>The Fluent API offers the most control and is preferred for complex relationships.',
      },
      {
        text: 'What are migrations in EF Core and how do you use them?',
        answer:
          "Migrations in EF Core are a way to incrementally update the database schema to keep it in sync with the application's data model. Key migration commands:<br>1. <code>Add-Migration [MigrationName]</code>: Create a new migration based on model changes<br>2. <code>Update-Database</code>: Apply pending migrations to the database<br>3. <code>Remove-Migration</code>: Remove the last migration if not applied<br>4. <code>Script-Migration</code>: Generate SQL script for migrations<br><br>Migration best practices include:<br>- Using meaningful names for migrations<br>- Review generated code before applying<br>- Testing migrations before applying to production<br>- Managing migrations with source control<br>- Considering customizing the migration code for complex changes",
      },
      {
        text: 'What are the different approaches to loading related data in EF Core?',
        answer:
          'EF Core provides several approaches to load related data:<br>1. <strong>Eager loading</strong>: Using <code>Include()</code> and <code>ThenInclude()</code> to load related entities in the same query<br>2. <strong>Explicit loading</strong>: Loading related entities explicitly using <code>Entry().Collection().Load()</code> or <code>Entry().Reference().Load()</code><br>3. <strong>Lazy loading</strong>: Automatically loading related entities when the navigation property is accessed (requires proxies)<br>4. <strong>Select loading</strong>: Using projection (<code>Select()</code>) to load specific properties including from related entities<br>5. <strong>Split queries</strong>: Using <code>AsSplitQuery()</code> to split a query with multiple includes into multiple database queries<br>Each approach has performance implications and should be chosen based on the specific scenario.',
      },
      {
        text: 'What is the DbContext in EF Core and what are its responsibilities?',
        answer:
          'DbContext is the primary class that coordinates Entity Framework functionality for a data model. Its responsibilities include:<br>1. Acting as a session with the database<br>2. Providing DbSet<T> properties for querying and manipulating entity sets<br>3. Managing change tracking for entity instances<br>4. Converting LINQ queries to database commands<br>5. Caching queries and saving changes to the database<br>6. Managing database transactions<br>7. Configuring the model and relationships through OnModelCreating<br>8. Acting as a Unit of Work pattern implementation<br>DbContext is typically scoped to a single unit of work and should be disposed after use to release resources.',
      },
    ],
  },
  {
    id: 'performance-memory',
    title: 'Performance and Memory Management',
    questions: [
      {
        text: 'Explain how garbage collection works in .NET',
        answer:
          'Garbage collection in .NET automatically manages memory by reclaiming objects that are no longer reachable. Key aspects include:<br>1. <strong>Generational collection</strong>: Objects are divided into 3 generations (0, 1, 2) based on their lifetime<br>2. <strong>Mark-and-compact</strong>: GC identifies live objects and compacts memory to eliminate fragmentation<br>3. <strong>Background collection</strong>: The newer GC can run concurrently with app execution<br>4. <strong>Finalization</strong>: Cleanup operations for objects with finalizers before memory reclamation<br>5. <strong>Large object heap (LOH)</strong>: Special area for objects >= 85KB that are collected less frequently<br>Understanding GC helps write memory-efficient code and anticipate performance characteristics.',
      },
      {
        text: 'What are Span<T> and Memory<T> in C# and how do they improve performance?',
        answer:
          "<code>Span&lt;T&gt;</code> and <code>Memory&lt;T&gt;</code> are types that represent contiguous regions of memory without creating copies of the data. Performance benefits include:<br>1. Reducing allocations by providing a view over existing memory (arrays, strings, etc.)<br>2. Enabling safe direct memory manipulation without unsafe code<br>3. Slicing memory without copying data<br>4. Working efficiently with unmanaged memory<br><br>Key differences: <code>Span&lt;T&gt;</code> is a stack-only type that can't be used across async boundaries, while <code>Memory&lt;T&gt;</code> is heap-based and can be used with async code. These types are widely used in high-performance scenarios like parsers, formatters, and network processing.",
      },
      {
        text: 'What are common memory leaks in .NET applications and how can you prevent them?',
        answer:
          'Common memory leaks in .NET applications include:<br>1. <strong>Event handler leaks</strong>: Forgetting to unsubscribe from long-lived events<br>2. <strong>Captured object references in closures</strong>: Lambda expressions capturing variables with longer lifetimes<br>3. <strong>Static fields storing object references</strong>: Static collections or caches that grow indefinitely<br>4. <strong>Unmanaged resources not properly disposed</strong>: Not implementing IDisposable correctly<br>5. <strong>Circular references involving disposable objects</strong>: Objects that reference each other without proper cleanup<br><br>Prevention includes using weak references, implementing IDisposable correctly, being careful with static collections, unsubscribing from events, and using memory profiling tools to detect leaks.',
      },
      {
        text: 'What are some strategies for optimizing LINQ queries?',
        answer:
          'Strategies for optimizing LINQ queries include:<br>1. Using <code>Where()</code> early to reduce the data set before other operations<br>2. Preferring <code>FirstOrDefault()</code> over <code>Where().First()</code> for finding single items<br>3. Using <code>Any()</code> instead of <code>Count() > 0</code> to check existence<br>4. Avoiding multiple enumeration of the same query with <code>ToList()</code> or <code>ToArray()</code> when needed<br>5. Being cautious with <code>Select()</code> projections that create new objects for each item<br>6. Understanding deferred vs. immediate execution to control when database queries execute<br>7. Using <code>AsNoTracking()</code> for read-only Entity Framework queries<br>8. Applying database indexing strategies aligned with common query patterns',
      },
      {
        text: 'Explain caching strategies in .NET and when to use each',
        answer:
          'Common caching strategies in .NET include:<br>1. <strong>In-memory caching</strong> (<code>IMemoryCache</code>): Fast local cache for single server applications<br>2. <strong>Distributed caching</strong> (<code>IDistributedCache</code>): For multi-server scenarios using Redis, SQL Server, etc.<br>3. <strong>Response caching</strong>: For caching HTTP responses in ASP.NET Core<br>4. <strong>Output caching</strong>: For caching the rendered output of pages or endpoints<br>5. <strong>Entity Framework query caching</strong>: First-level (DbContext) and second-level caching<br><br>Consider cache expiration policies (absolute, sliding, custom), memory pressure handling, cache invalidation, and concurrency. Choose based on data characteristics (change frequency, size), consistency requirements, and deployment architecture.',
      },
    ],
  },
  {
    id: 'testing-debugging',
    title: 'Testing and Debugging',
    questions: [
      {
        text: 'What are the different types of testing in .NET applications?',
        answer:
          'Common testing types in .NET applications include:<br>1. <strong>Unit testing</strong>: Testing individual components in isolation using MSTest, xUnit, or NUnit<br>2. <strong>Integration testing</strong>: Testing component interactions, often using TestServer or WebApplicationFactory in ASP.NET Core<br>3. <strong>Functional/UI testing</strong>: Testing the application from the user\'s perspective using tools like Selenium<br>4. <strong>Performance testing</strong>: Measuring application performance under load using tools like NBench or JMeter<br>5. <strong>Mutation testing</strong>: Evaluating test quality by introducing bugs (mutations) to see if tests catch them<br>6. <strong>Snapshot testing</strong>: Comparing current outputs with previously approved "snapshots"<br>7. <strong>Property-based testing</strong>: Generating test cases to verify properties of the code',
      },
      {
        text: 'What is the AAA (Arrange-Act-Assert) pattern in unit testing?',
        answer:
          'The AAA (Arrange-Act-Assert) pattern is a structure for organizing unit tests that improves readability and maintainability:<br>1. <strong>Arrange</strong>: Set up the test context and prerequisites, create objects, prepare inputs, and set expectations<br>2. <strong>Act</strong>: Perform the operation being tested, typically a single method call<br>3. <strong>Assert</strong>: Verify the outcome meets expectations, checking return values, object state, or interactions<br><br>Example in xUnit:<br><code>[Fact]<br>public void Add_TwoNumbers_ReturnsCorrectSum()<br>{<br>    // Arrange<br>    var calculator = new Calculator();<br>    var a = 5;<br>    var b = 7;<br>    <br>    // Act<br>    var result = calculator.Add(a, b);<br>    <br>    // Assert<br>    Assert.Equal(12, result);<br>}</code>',
      },
      {
        text: 'What are mocking frameworks and how are they used in unit testing?',
        answer:
          'Mocking frameworks (like Moq, NSubstitute, FakeItEasy) create substitutes for dependencies to isolate the code being tested. They allow:<br>1. Defining behaviors and return values for methods/properties<br>2. Verifying interactions (e.g., checking if a method was called)<br>3. Simulating exceptions and specific scenarios<br><br>Example with Moq:<br><code>// Arrange<br>var mockRepository = new Mock&lt;IUserRepository&gt;();<br>mockRepository.Setup(r => r.GetById(1)).Returns(new User { Id = 1, Name = "Test" });<br><br>var service = new UserService(mockRepository.Object);<br><br>// Act<br>var user = service.GetUser(1);<br><br>// Assert<br>Assert.Equal("Test", user.Name);<br>mockRepository.Verify(r => r.GetById(1), Times.Once());</code>',
      },
      {
        text: 'How would you debug a memory leak in a .NET application?',
        answer:
          "To debug a memory leak in a .NET application:<br>1. <strong>Use memory profilers</strong> like Visual Studio Diagnostics Tools, dotMemory, or ANTS Memory Profiler<br>2. <strong>Take memory snapshots</strong> at different points to compare and identify growing objects<br>3. <strong>Analyze object retention paths</strong> to understand why objects aren't being garbage collected<br>4. <strong>Look for common culprits</strong>: event handlers, static collections, caching, disposable objects<br>5. <strong>Use memory dumps</strong> if issues only occur in production, analyzed with tools like WinDbg<br>6. <strong>Enable GC logging</strong> to understand collection behavior<br>7. <strong>Add instrumentation</strong> to track object lifetimes in problematic areas<br>8. <strong>Implement IDisposable</strong> correctly for classes with managed or unmanaged resources",
      },
      {
        text: 'What tools and techniques would you use to measure the performance of a .NET application?',
        answer:
          'Tools and techniques for measuring .NET application performance include:<br>1. <strong>Profiling tools</strong>: Visual Studio Profiler, dotTrace, ANTS Performance Profiler<br>2. <strong>BenchmarkDotNet</strong>: Precise micro-benchmarking for code performance<br>3. <strong>Application Insights</strong>: End-to-end telemetry and monitoring<br>4. <strong>PerfView</strong>: Low-level performance analysis from the .NET team<br>5. <strong>dotnet-trace</strong>: Command-line tracing for .NET Core apps<br>6. <strong>ETW (Event Tracing for Windows)</strong>: Kernel-level event tracing<br>7. <strong>Performance counters</strong>: OS and runtime metrics<br>8. <strong>Load testing</strong> with tools like k6, JMeter, or Azure Load Testing<br>9. <strong>Distributed tracing</strong> with OpenTelemetry for microservices<br>10. <strong>Memory dumps and analysis</strong> for detailed investigations',
      },
    ],
  },
  {
    id: 'configuration-deployment',
    title: 'Configuration and Deployment',
    questions: [
      {
        text: 'How would you manage configuration for different environments in a .NET Core application?',
        answer:
          'Managing configuration across environments in .NET Core involves:<br>1. <strong>Using the configuration system</strong> built on IConfiguration<br>2. <strong>Layering configuration sources</strong> with precedence:<br>   - Base settings in appsettings.json<br>   - Environment-specific in appsettings.{Environment}.json<br>   - User secrets for development secrets<br>   - Environment variables for production secrets<br>   - Command-line arguments for overrides<br>3. <strong>Using the Options pattern</strong> with IOptions&lt;T&gt; for strongly-typed settings<br>4. <strong>Securing sensitive values</strong> using Azure Key Vault, Secret Manager, etc.<br>5. <strong>Environment variable prefixing</strong> for containerized applications<br>6. <strong>Configuration validation</strong> to ensure required settings are present<br>7. <strong>Reloading configuration</strong> with IOptionsSnapshot/IOptionsMonitor when needed',
      },
      {
        text: 'What is the Options pattern in ASP.NET Core and why is it used?',
        answer:
          'The Options pattern in ASP.NET Core provides a strongly-typed access to configuration settings. Benefits include:<br>1. <strong>Type safety</strong>: Catching configuration errors at compile time<br>2. <strong>Dependency injection</strong>: Configuration is injected where needed<br>3. <strong>Separation of concerns</strong>: Configuration details abstracted from business logic<br>4. <strong>Validation</strong>: Configuration can be validated at startup<br><br>The pattern uses:<br>- <code>IOptions&lt;T&gt;</code>: Singleton, cached when first accessed<br>- <code>IOptionsSnapshot&lt;T&gt;</code>: Scoped, reloaded each request if changed<br>- <code>IOptionsMonitor&lt;T&gt;</code>: Singleton with change notification<br><br>This approach makes applications more maintainable and testable compared to accessing configuration directly.',
      },
      {
        text: 'What are the deployment options for ASP.NET Core applications?',
        answer:
          'ASP.NET Core applications can be deployed as:<br>1. <strong>Self-contained deployment</strong>: Includes the .NET runtime, no dependencies on the server<br>2. <strong>Framework-dependent deployment</strong>: Requires .NET runtime on the server<br>3. <strong>Container-based deployment</strong>: Using Docker images for consistent environments<br><br>Hosting options include:<br>- <strong>IIS</strong> on Windows Server with the ASP.NET Core Module<br>- <strong>Kestrel</strong> as a standalone web server, often behind a reverse proxy<br>- <strong>HTTP.sys</strong> for Windows-specific scenarios<br>- <strong>Azure App Service</strong> for managed PaaS hosting<br>- <strong>Kubernetes</strong> for orchestrating containerized applications<br>- <strong>Azure Container Apps</strong> for serverless container hosting<br>- <strong>Linux servers</strong> using Nginx or Apache as reverse proxies',
      },
      {
        text: 'What is the difference between development, staging, and production environments in ASP.NET Core?',
        answer:
          'ASP.NET Core environment differences:<br><strong>Development environment</strong>:<br>- Detailed error pages with stack traces<br>- Developer exception page<br>- Hot reload and other development tools<br>- Local database connections<br>- User secrets for sensitive configuration<br><br><strong>Staging environment</strong>:<br>- Production-like configuration<br>- Error pages without sensitive details<br>- Production data (or copy) for testing<br>- Pre-release testing of deployment process<br>- Performance testing and final validation<br><br><strong>Production environment</strong>:<br>- Optimized for performance and security<br>- Custom error pages for users<br>- Logging focused on important events<br>- Connection strings to production databases<br>- Credentials stored in secure services (Key Vault, etc.)',
      },
      {
        text: 'How would you handle database migrations during deployment of an EF Core application?',
        answer:
          'Strategies for handling EF Core migrations during deployment:<br>1. <strong>Apply migrations during startup</strong>: Using <code>context.Database.Migrate()</code> for simple scenarios<br>2. <strong>Out-of-process migrations</strong>: Separate migration tool/step before application deployment<br>3. <strong>Script-based migrations</strong>: Generate SQL scripts with <code>Script-Migration</code> for DBA review<br>4. <strong>CI/CD pipeline integration</strong>: Automated migration as part of the deployment process<br>5. <strong>Blue-green deployment</strong>: Apply migrations to a new database instance before switching traffic<br><br>Considerations:<br>- Backup the database before migrations<br>- Test migrations in non-production environments first<br>- Plan for rollback scenarios<br>- Handle breaking schema changes with multiple steps<br>- Consider downtime requirements when choosing strategy',
      },
    ],
  },
]
