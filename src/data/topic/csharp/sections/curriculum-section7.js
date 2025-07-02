// curriculum-section7.js - Data Access with Entity Framework Core

const dataAccessWithEFCore = {
  title: 'Data Access with Entity Framework Core',
  description:
    'Master data access in .NET applications using Entity Framework Core, an ORM that enables developers to work with databases using .NET objects.',
  lessons: [
    {
      title: 'Object-Relational Mapping Concepts',
      description:
        'Understand the fundamental concepts of Object-Relational Mapping and how Entity Framework Core bridges the gap between object-oriented programming and relational databases.',
      sections: [
        {
          title: 'Understanding ORM and the Impedance Mismatch',
          explanation: `
        <p>Object-Relational Mapping (ORM) is a programming technique that creates a bridge between object-oriented programming languages and relational databases. Entity Framework Core is Microsoft's modern, lightweight, and cross-platform ORM that solves the fundamental problem known as the "impedance mismatch."</p>
        
        <h4>The Object-Relational Impedance Mismatch</h4>
        
        <p>The impedance mismatch refers to the conceptual differences between object-oriented programming and relational database models:</p>
        
        <p><strong>Object-Oriented Model:</strong></p>
        <ul>
          <li><strong>Encapsulation:</strong> Data and behavior are bundled together in objects</li>
          <li><strong>Inheritance:</strong> Objects can inherit properties and methods from parent classes</li>
          <li><strong>Polymorphism:</strong> Objects can take multiple forms and respond differently to the same message</li>
          <li><strong>Identity:</strong> Objects have unique identity independent of their state</li>
          <li><strong>Complex Types:</strong> Objects can contain other objects and collections</li>
        </ul>

        <p><strong>Relational Model:</strong></p>
        <ul>
          <li><strong>Tables and Rows:</strong> Data is stored in flat, tabular structures</li>
          <li><strong>Primary Keys:</strong> Rows are identified by unique key values</li>
          <li><strong>Foreign Keys:</strong> Relationships are expressed through key references</li>
          <li><strong>Normalization:</strong> Data is organized to eliminate redundancy</li>
          <li><strong>Set-Based Operations:</strong> Data is manipulated using SQL set operations</li>
        </ul>

        <h4>How Entity Framework Core Bridges the Gap</h4>
        
        <p><strong>Automatic Translation:</strong> EF Core automatically translates LINQ expressions into SQL queries, allowing you to work with objects while the ORM handles database communication.</p>

        <p><strong>Object Materialization:</strong> Database rows are automatically converted into .NET objects with proper type mapping and relationship loading.</p>

        <p><strong>Change Tracking:</strong> EF Core monitors changes to objects and generates appropriate INSERT, UPDATE, or DELETE statements when you save changes.</p>

        <p><strong>Relationship Mapping:</strong> Complex object relationships (one-to-many, many-to-many) are mapped to foreign key relationships in the database.</p>

        <div class="code-example">
          <pre><code>// Working with objects instead of SQL
var activeUsers = await context.Users
    .Where(u => u.IsActive)
    .Include(u => u.Orders)
    .ToListAsync();

// EF Core translates this to SQL:
// SELECT * FROM Users u 
// LEFT JOIN Orders o ON u.Id = o.UserId 
// WHERE u.IsActive = 1
</code></pre>
        </div>

        <h4>Benefits and Trade-offs of Using an ORM</h4>
        
        <p><strong>Benefits:</strong></p>
        <ul>
          <li><strong>Productivity:</strong> Faster development with less boilerplate code</li>
          <li><strong>Type Safety:</strong> Compile-time checking of database operations</li>
          <li><strong>Database Independence:</strong> Switch between database providers with minimal code changes</li>
          <li><strong>Automatic Optimizations:</strong> EF Core applies query optimizations and caching</li>
          <li><strong>Migration Support:</strong> Schema changes are managed through code-first migrations</li>
        </ul>

        <p><strong>Trade-offs:</strong></p>
        <ul>
          <li><strong>Performance Overhead:</strong> Additional abstraction layer can impact performance</li>
          <li><strong>Complex Queries:</strong> Some advanced SQL features may be difficult to express in LINQ</li>
          <li><strong>Learning Curve:</strong> Understanding ORM behavior is crucial for effective use</li>
          <li><strong>Hidden Complexity:</strong> Generated SQL may not always be optimal</li>
        </ul>

        <div class="interview-tip">
          <p><span class="interview-icon">🎯</span> <strong>Interview Focus:</strong> Demonstrate understanding of ORM concepts and when to use them.</p>
          <p>Key interview questions include:</p>
          <ul>
            <li>"What is the impedance mismatch and how do ORMs solve it?"</li>
            <li>"When would you choose an ORM over raw SQL?"</li>
            <li>"What are the performance implications of using Entity Framework?"</li>
            <li>"How does change tracking work in Entity Framework Core?"</li>
          </ul>
        </div>
      `,
          codeExample: `// Demonstrating ORM vs Raw SQL approaches

// Traditional ADO.NET approach (more control, more code)
using (var connection = new SqlConnection(connectionString))
{
    await connection.OpenAsync();
    var command = new SqlCommand(@"
        SELECT u.Id, u.Name, u.Email, o.Id, o.Total 
        FROM Users u 
        LEFT JOIN Orders o ON u.Id = o.UserId 
        WHERE u.IsActive = 1", connection);
    
    var reader = await command.ExecuteReaderAsync();
    // Manual mapping to objects...
}

// Entity Framework Core approach (less control, less code)
var usersWithOrders = await context.Users
    .Where(u => u.IsActive)
    .Include(u => u.Orders)
    .ToListAsync();`,
        },
      ],
      exercise: {
        instructions:
          'Research and compare different ORM approaches (EF Core, Dapper, Raw ADO.NET). Create a simple console application that demonstrates the same data access operation using each approach. Compare the code complexity, performance, and maintainability of each solution.',
      },
    },
    {
      title: 'DbContext and Models',
      description:
        'Learn to define and configure Entity Framework models, understand the DbContext lifecycle, and implement proper data access patterns.',
      sections: [
        {
          title: 'Entity Models and Data Annotations',
          explanation: `
        <p>Entity models are the foundation of Entity Framework Core, representing your domain objects that map to database tables. Understanding how to properly define and configure these models is crucial for building robust data access layers.</p>
        
        <h4>Entity Class Design Principles</h4>
        
        <p><strong>Plain Old CLR Objects (POCOs):</strong> EF Core works with simple C# classes that don't require inheritance from any base class. This keeps your domain models clean and testable.</p>

        <p><strong>Convention over Configuration:</strong> EF Core uses intelligent naming conventions to infer database schema. Properties named "Id" or "{ClassName}Id" become primary keys, and class names become table names.</p>

        <p><strong>Data Annotations:</strong> Attributes provide metadata about how properties should be mapped to database columns, validation rules, and relationship configurations.</p>

        <div class="code-example">
          <pre><code>// Basic entity with conventions and annotations
public class User
{
    public int Id { get; set; }  // Primary key by convention
    
    [Required]
    [MaxLength(100)]
    public string Name { get; set; }
    
    [EmailAddress]
    public string Email { get; set; }
    
    [Column(TypeName = "decimal(18,2)")]
    public decimal Salary { get; set; }
    
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    
    // Navigation properties
    public List<Order> Orders { get; set; } = new List<Order>();
}

public class Order
{
    public int Id { get; set; }
    
    [Required]
    public string OrderNumber { get; set; }
    
    public decimal Total { get; set; }
    
    // Foreign key
    public int UserId { get; set; }
    public User User { get; set; }  // Navigation property
}
</code></pre>
        </div>

        <h4>Key Data Annotations</h4>
        
        <p><strong>Validation Annotations:</strong></p>
        <ul>
          <li><strong>[Required]:</strong> Makes the property non-nullable in the database</li>
          <li><strong>[MaxLength(n)]:</strong> Sets maximum length for string properties</li>
          <li><strong>[Range(min, max)]:</strong> Validates numeric ranges</li>
          <li><strong>[EmailAddress], [Phone], [Url]:</strong> Format validation</li>
        </ul>

        <p><strong>Mapping Annotations:</strong></p>
        <ul>
          <li><strong>[Table("TableName")]:</strong> Specifies table name</li>
          <li><strong>[Column("ColumnName")]:</strong> Specifies column name and type</li>
          <li><strong>[Key]:</strong> Explicitly marks primary key</li>
          <li><strong>[DatabaseGenerated]:</strong> Controls value generation (Identity, Computed, None)</li>
        </ul>

        <div class="code-example">
          <pre><code>// Advanced entity configuration
[Table("Products")]
public class Product
{
    [Key]
    public Guid Id { get; set; } = Guid.NewGuid();
    
    [Column("ProductName")]
    [MaxLength(200)]
    [Index(IsUnique = true)]  // Unique constraint
    public string Name { get; set; }
    
    [Column(TypeName = "decimal(10,2)")]
    public decimal Price { get; set; }
    
    [DatabaseGenerated(DatabaseGeneratedOption.Computed)]
    public DateTime LastModified { get; set; }
    
    // Complex property
    [NotMapped]  // Exclude from database
    public string DisplayName => $"{Name} - {Price:F2}";
}
</code></pre>
        </div>

        <h4>DbContext: The Heart of Entity Framework</h4>
        
        <p>DbContext represents a session with the database and serves as the primary class for interacting with your data. It combines the Unit of Work and Repository patterns, managing entity instances and their changes.</p>

        <p><strong>Key Responsibilities:</strong></p>
        <ul>
          <li><strong>Entity Tracking:</strong> Monitors changes to loaded entities</li>
          <li><strong>Query Translation:</strong> Converts LINQ to SQL</li>
          <li><strong>Change Detection:</strong> Identifies what needs to be saved</li>
          <li><strong>Transaction Management:</strong> Coordinates database transactions</li>
          <li><strong>Caching:</strong> First-level caching of entities</li>
        </ul>

        <div class="code-example">
          <pre><code>// DbContext configuration
public class ApplicationDbContext : DbContext
{
    public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
        : base(options) { }
    
    // DbSet properties for each entity
    public DbSet<User> Users { get; set; }
    public DbSet<Order> Orders { get; set; }
    public DbSet<Product> Products { get; set; }
    
    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        // Fluent API configuration
        modelBuilder.Entity<User>(entity =>
        {
            entity.HasKey(u => u.Id);
            entity.Property(u => u.Email).IsRequired().HasMaxLength(255);
            entity.HasIndex(u => u.Email).IsUnique();
        });
        
        // Configure relationships
        modelBuilder.Entity<Order>()
            .HasOne(o => o.User)
            .WithMany(u => u.Orders)
            .HasForeignKey(o => o.UserId);
    }
}

// Registration in Program.cs
builder.Services.AddDbContext<ApplicationDbContext>(options =>
    options.UseSqlServer(connectionString));
</code></pre>
        </div>

        <div class="interview-tip">
          <p><span class="interview-icon">🎯</span> <strong>Interview Focus:</strong> Show understanding of entity design and DbContext lifecycle.</p>
          <p>Key interview questions include:</p>
          <ul>
            <li>"How do you design entity models for complex business domains?"</li>
            <li>"What's the difference between Data Annotations and Fluent API?"</li>
            <li>"How does DbContext change tracking work?"</li>
            <li>"When should you use scoped vs transient DbContext?"</li>
          </ul>
        </div>
      `,
          codeExample: `// Complete DbContext setup with best practices
public class ApplicationDbContext : DbContext
{
    public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
        : base(options) { }
    
    public DbSet<User> Users { get; set; }
    public DbSet<Order> Orders { get; set; }
    
    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        // Apply all configurations from assembly
        modelBuilder.ApplyConfigurationsFromAssembly(typeof(ApplicationDbContext).Assembly);
        
        // Global query filters
        modelBuilder.Entity<User>().HasQueryFilter(u => !u.IsDeleted);
        
        // Seed data
        modelBuilder.Entity<User>().HasData(
            new User { Id = 1, Name = "Admin", Email = "admin@example.com" }
        );
    }
    
    public override async Task<int> SaveChangesAsync(CancellationToken cancellationToken = default)
    {
        // Automatic audit fields
        foreach (var entry in ChangeTracker.Entries<IAuditable>())
        {
            if (entry.State == EntityState.Added)
                entry.Entity.CreatedAt = DateTime.UtcNow;
            if (entry.State == EntityState.Modified)
                entry.Entity.UpdatedAt = DateTime.UtcNow;
        }
        
        return await base.SaveChangesAsync(cancellationToken);
    }
}`,
        },
      ],
      exercise: {
        instructions:
          'Create a comprehensive entity model for a blog system with Users, Posts, Comments, and Tags. Implement proper relationships, validation attributes, and a DbContext. Include audit fields and soft delete functionality. Test your model with sample data operations.',
      },
    },
    {
      title: 'LINQ to Entities',
      description:
        'Master querying data using LINQ expressions that translate to efficient SQL queries, understanding query execution, and optimizing database operations.',
      sections: [
        {
          title: 'LINQ Query Fundamentals and Query Execution',
          explanation: `
        <p>LINQ to Entities is the cornerstone of data querying in Entity Framework Core. It provides a strongly-typed, IntelliSense-enabled way to query your database using familiar C# syntax that gets translated into optimized SQL queries.</p>
        
        <h4>Deferred vs Immediate Execution</h4>
        
        <p><strong>Deferred Execution:</strong> Most LINQ operations use deferred execution, meaning the query is not executed until the results are enumerated. This allows for query composition and optimization.</p>

        <p><strong>Immediate Execution:</strong> Some operations like <code>ToList()</code>, <code>Count()</code>, <code>First()</code>, and <code>Any()</code> force immediate execution, sending the query to the database right away.</p>

        <div class="code-example">
          <pre><code>// Deferred execution - no database query yet
var query = context.Users.Where(u => u.IsActive);

// Still deferred - query is being composed
query = query.OrderBy(u => u.Name);

// NOW the query executes and hits the database
var users = await query.ToListAsync();

// Immediate execution examples
var count = await context.Users.CountAsync();           // Executes immediately
var exists = await context.Users.AnyAsync(u => u.IsActive);  // Executes immediately
var user = await context.Users.FirstAsync(u => u.Id == 1);   // Executes immediately
</code></pre>
        </div>

        <h4>Essential LINQ Operations</h4>
        
        <p><strong>Filtering and Searching:</strong></p>
        <ul>
          <li><strong>Where:</strong> Filter records based on conditions</li>
          <li><strong>Contains:</strong> Search for partial matches (translates to SQL LIKE)</li>
          <li><strong>StartsWith/EndsWith:</strong> Pattern matching operations</li>
        </ul>

        <div class="code-example">
          <pre><code>// Basic filtering
var activeUsers = await context.Users
    .Where(u => u.IsActive)
    .ToListAsync();

// Multiple conditions
var recentOrders = await context.Orders
    .Where(o => o.CreatedAt >= DateTime.Today.AddDays(-30) && o.Total > 100)
    .ToListAsync();

// String operations
var searchResults = await context.Products
    .Where(p => p.Name.Contains(searchTerm) || p.Description.Contains(searchTerm))
    .ToListAsync();
</code></pre>
        </div>

        <p><strong>Sorting and Ordering:</strong></p>
        <ul>
          <li><strong>OrderBy/OrderByDescending:</strong> Primary sort</li>
          <li><strong>ThenBy/ThenByDescending:</strong> Secondary sort</li>
        </ul>

        <div class="code-example">
          <pre><code>// Sorting
var sortedUsers = await context.Users
    .OrderBy(u => u.LastName)
    .ThenBy(u => u.FirstName)
    .ToListAsync();

// Dynamic sorting
var query = context.Products.AsQueryable();
if (sortDirection == "desc")
    query = query.OrderByDescending(p => p.Price);
else
    query = query.OrderBy(p => p.Price);
</code></pre>
        </div>

        <p><strong>Projections and Transformations:</strong></p>
        <ul>
          <li><strong>Select:</strong> Transform or project data into new shapes</li>
          <li><strong>SelectMany:</strong> Flatten collections</li>
          <li><strong>GroupBy:</strong> Group data for aggregations</li>
        </ul>

        <div class="code-example">
          <pre><code>// Projections - only select needed fields
var userSummary = await context.Users
    .Select(u => new UserSummaryDto
    {
        Id = u.Id,
        Name = u.Name,
        OrderCount = u.Orders.Count(),
        TotalSpent = u.Orders.Sum(o => o.Total)
    })
    .ToListAsync();

// Grouping and aggregation
var salesByMonth = await context.Orders
    .GroupBy(o => new { o.CreatedAt.Year, o.CreatedAt.Month })
    .Select(g => new
    {
        Year = g.Key.Year,
        Month = g.Key.Month,
        TotalSales = g.Sum(o => o.Total),
        OrderCount = g.Count()
    })
    .ToListAsync();
</code></pre>
        </div>

        <h4>Advanced Querying Techniques</h4>
        
        <p><strong>Conditional Queries:</strong> Build dynamic queries based on runtime conditions.</p>

        <div class="code-example">
          <pre><code>// Building dynamic queries
public async Task<List<Product>> SearchProductsAsync(ProductSearchCriteria criteria)
{
    var query = context.Products.AsQueryable();
    
    if (!string.IsNullOrEmpty(criteria.Name))
        query = query.Where(p => p.Name.Contains(criteria.Name));
    
    if (criteria.MinPrice.HasValue)
        query = query.Where(p => p.Price >= criteria.MinPrice);
    
    if (criteria.CategoryId.HasValue)
        query = query.Where(p => p.CategoryId == criteria.CategoryId);
    
    return await query
        .OrderBy(p => p.Name)
        .Skip(criteria.Skip)
        .Take(criteria.Take)
        .ToListAsync();
}
</code></pre>
        </div>

        <p><strong>Complex Joins and Subqueries:</strong></p>

        <div class="code-example">
          <pre><code>// Explicit joins
var userOrderData = await context.Users
    .Join(context.Orders,
          user => user.Id,
          order => order.UserId,
          (user, order) => new { User = user, Order = order })
    .Where(x => x.Order.Total > 1000)
    .ToListAsync();

// Subquery patterns
var usersWithRecentOrders = await context.Users
    .Where(u => context.Orders
        .Any(o => o.UserId == u.Id && o.CreatedAt >= DateTime.Today.AddDays(-30)))
    .ToListAsync();
</code></pre>
        </div>

        <div class="interview-tip">
          <p><span class="interview-icon">🎯</span> <strong>Interview Focus:</strong> Demonstrate LINQ proficiency and query optimization awareness.</p>
          <p>Key interview questions include:</p>
          <ul>
            <li>"Explain the difference between deferred and immediate execution in LINQ."</li>
            <li>"How do you optimize LINQ queries for performance?"</li>
            <li>"When would you use raw SQL instead of LINQ?"</li>
            <li>"How do you handle dynamic query building in Entity Framework?"</li>
          </ul>
        </div>
      `,
          codeExample: `// Comprehensive LINQ query example
public async Task<PagedResult<OrderSummaryDto>> GetOrderSummaryAsync(OrderFilter filter)
{
    var query = context.Orders
        .Include(o => o.User)
        .Include(o => o.OrderItems)
        .ThenInclude(oi => oi.Product)
        .AsQueryable();
    
    // Apply filters
    if (filter.StartDate.HasValue)
        query = query.Where(o => o.CreatedAt >= filter.StartDate);
    
    if (filter.EndDate.HasValue)
        query = query.Where(o => o.CreatedAt <= filter.EndDate);
    
    if (!string.IsNullOrEmpty(filter.CustomerName))
        query = query.Where(o => o.User.Name.Contains(filter.CustomerName));
    
    // Get total count for pagination
    var totalCount = await query.CountAsync();
    
    // Apply sorting and pagination
    var orders = await query
        .OrderByDescending(o => o.CreatedAt)
        .Skip(filter.Skip)
        .Take(filter.Take)
        .Select(o => new OrderSummaryDto
        {
            Id = o.Id,
            OrderNumber = o.OrderNumber,
            CustomerName = o.User.Name,
            Total = o.Total,
            ItemCount = o.OrderItems.Count,
            CreatedAt = o.CreatedAt
        })
        .ToListAsync();
    
    return new PagedResult<OrderSummaryDto>
    {
        Items = orders,
        TotalCount = totalCount,
        PageSize = filter.Take,
        CurrentPage = filter.Skip / filter.Take + 1
    };
}`,
        },
      ],
      exercise: {
        instructions:
          'Create a comprehensive product search and filtering system using LINQ. Implement dynamic query building based on multiple criteria (name, price range, category, rating), sorting options, and pagination. Include aggregation queries for statistics and performance optimization techniques.',
      },
    },
    {
      title: 'Relationships and Navigation Properties',
      description:
        'Configure complex entity relationships including one-to-one, one-to-many, and many-to-many associations with proper navigation properties and foreign key management.',
      sections: [
        {
          title: 'Configuring Entity Relationships',
          explanation: `
        <p>Relationships are the cornerstone of relational database design, and Entity Framework Core provides powerful tools to map these relationships to your object model. Understanding how to properly configure and work with relationships is essential for building maintainable data access layers.</p>
        
        <h4>One-to-Many Relationships</h4>
        
        <p>One-to-many is the most common relationship type, where one entity can be associated with multiple entities of another type. Examples include User → Orders, Category → Products, or Department → Employees.</p>

        <p><strong>Key Components:</strong></p>
        <ul>
          <li><strong>Principal Entity:</strong> The entity containing the primary key (User)</li>
          <li><strong>Dependent Entity:</strong> The entity containing the foreign key (Order)</li>
          <li><strong>Foreign Key Property:</strong> The property that references the principal key</li>
          <li><strong>Navigation Properties:</strong> Properties that allow navigation between entities</li>
        </ul>

        <div class="code-example">
          <pre><code>// One-to-Many: User → Orders
public class User
{
    public int Id { get; set; }
    public string Name { get; set; }
    
    // Collection navigation property
    public List<Order> Orders { get; set; } = new List<Order>();
}

public class Order
{
    public int Id { get; set; }
    public decimal Total { get; set; }
    
    // Foreign key property
    public int UserId { get; set; }
    
    // Reference navigation property
    public User User { get; set; }
}

// Fluent API configuration
modelBuilder.Entity<Order>()
    .HasOne(o => o.User)
    .WithMany(u => u.Orders)
    .HasForeignKey(o => o.UserId);
</code></pre>
        </div>

        <h4>One-to-One Relationships</h4>
        
        <p>One-to-one relationships link two entities where each instance of one entity corresponds to exactly one instance of another entity. Examples include User → UserProfile or Employee → EmployeeDetails.</p>

        <div class="code-example">
          <pre><code>// One-to-One: User → UserProfile
public class User
{
    public int Id { get; set; }
    public string Email { get; set; }
    
    // Reference navigation property
    public UserProfile Profile { get; set; }
}

public class UserProfile
{
    public int Id { get; set; }  // Shared primary key
    public string FirstName { get; set; }
    public string LastName { get; set; }
    public DateTime DateOfBirth { get; set; }
    
    // Reference navigation property
    public User User { get; set; }
}

// Fluent API configuration
modelBuilder.Entity<UserProfile>()
    .HasOne(p => p.User)
    .WithOne(u => u.Profile)
    .HasForeignKey<UserProfile>(p => p.Id);  // Shared primary key
</code></pre>
        </div>

        <h4>Many-to-Many Relationships</h4>
        
        <p>Many-to-many relationships allow multiple entities of one type to be associated with multiple entities of another type. EF Core 5.0+ supports many-to-many relationships without explicitly defining join entities.</p>

        <div class="code-example">
          <pre><code>// Many-to-Many: Products ↔ Categories
public class Product
{
    public int Id { get; set; }
    public string Name { get; set; }
    
    // Collection navigation property
    public List<Category> Categories { get; set; } = new List<Category>();
}

public class Category
{
    public int Id { get; set; }
    public string Name { get; set; }
    
    // Collection navigation property
    public List<Product> Products { get; set; } = new List<Product>();
}

// Fluent API configuration (EF Core 5.0+)
modelBuilder.Entity<Product>()
    .HasMany(p => p.Categories)
    .WithMany(c => c.Products)
    .UsingEntity(j => j.ToTable("ProductCategories"));

// Or with explicit join entity for additional properties
public class ProductCategory
{
    public int ProductId { get; set; }
    public int CategoryId { get; set; }
    public DateTime AssignedAt { get; set; }
    
    public Product Product { get; set; }
    public Category Category { get; set; }
}
</code></pre>
        </div>

        <h4>Navigation Property Best Practices</h4>
        
        <p><strong>Lazy Loading vs Explicit Loading:</strong></p>
        <ul>
          <li><strong>Virtual Properties:</strong> Enable lazy loading (load related data on first access)</li>
          <li><strong>Include() Method:</strong> Explicit eager loading for better performance control</li>
          <li><strong>Load() Method:</strong> Explicit loading for specific scenarios</li>
        </ul>

        <div class="code-example">
          <pre><code>// Eager loading with Include
var usersWithOrders = await context.Users
    .Include(u => u.Orders)
    .ThenInclude(o => o.OrderItems)
    .ToListAsync();

// Explicit loading
var user = await context.Users.FirstAsync(u => u.Id == 1);
await context.Entry(user)
    .Collection(u => u.Orders)
    .LoadAsync();

// Conditional loading
await context.Entry(user)
    .Collection(u => u.Orders)
    .Query()
    .Where(o => o.CreatedAt >= DateTime.Today.AddMonths(-1))
    .LoadAsync();
</code></pre>
        </div>

        <h4>Working with Related Data</h4>
        
        <p><strong>Adding Related Entities:</strong></p>

        <div class="code-example">
          <pre><code>// Adding related entities
var user = new User { Name = "John Doe" };
user.Orders.Add(new Order { Total = 100.00m });
user.Orders.Add(new Order { Total = 200.00m });

context.Users.Add(user);
await context.SaveChangesAsync();  // Saves user and orders

// Adding to existing entity
var existingUser = await context.Users
    .Include(u => u.Orders)
    .FirstAsync(u => u.Id == 1);

existingUser.Orders.Add(new Order { Total = 150.00m });
await context.SaveChangesAsync();
</code></pre>
        </div>

        <div class="interview-tip">
          <p><span class="interview-icon">🎯</span> <strong>Interview Focus:</strong> Demonstrate understanding of relationship configuration and navigation.</p>
          <p>Key interview questions include:</p>
          <ul>
            <li>"How do you configure different types of relationships in EF Core?"</li>
            <li>"What's the difference between lazy loading and eager loading?"</li>
            <li>"How do you handle many-to-many relationships with additional properties?"</li>
            <li>"When would you use explicit loading over eager loading?"</li>
          </ul>
        </div>
      `,
          codeExample: `// Complex relationship example - E-commerce domain
public class Customer
{
    public int Id { get; set; }
    public string Name { get; set; }
    
    // One-to-many
    public List<Order> Orders { get; set; } = new();
    
    // One-to-one
    public CustomerProfile Profile { get; set; }
    
    // Many-to-many
    public List<Product> FavoriteProducts { get; set; } = new();
}

public class Order
{
    public int Id { get; set; }
    public DateTime OrderDate { get; set; }
    
    public int CustomerId { get; set; }
    public Customer Customer { get; set; }
    
    // One-to-many
    public List<OrderItem> Items { get; set; } = new();
}

public class OrderItem
{
    public int Id { get; set; }
    public int Quantity { get; set; }
    public decimal UnitPrice { get; set; }
    
    public int OrderId { get; set; }
    public Order Order { get; set; }
    
    public int ProductId { get; set; }
    public Product Product { get; set; }
}

// Configuration in OnModelCreating
protected override void OnModelCreating(ModelBuilder modelBuilder)
{
    // One-to-many: Customer → Orders
    modelBuilder.Entity<Order>()
        .HasOne(o => o.Customer)
        .WithMany(c => c.Orders)
        .HasForeignKey(o => o.CustomerId);
    
    // One-to-one: Customer → CustomerProfile
    modelBuilder.Entity<CustomerProfile>()
        .HasOne(p => p.Customer)
        .WithOne(c => c.Profile)
        .HasForeignKey<CustomerProfile>(p => p.CustomerId);
    
    // Many-to-many: Customer ↔ Product (Favorites)
    modelBuilder.Entity<Customer>()
        .HasMany(c => c.FavoriteProducts)
        .WithMany()
        .UsingEntity(j => j.ToTable("CustomerFavorites"));
}`,
        },
      ],
      exercise: {
        instructions:
          'Design and implement a comprehensive relationship model for a social media platform. Include Users, Posts, Comments, Likes, Follows, and Groups with appropriate one-to-one, one-to-many, and many-to-many relationships. Implement proper navigation properties and test various loading strategies.',
      },
    },
    {
      title: 'Migrations and Database Updates',
      description:
        'Master database schema versioning and deployment using Entity Framework Core migrations for reliable database evolution.',
      sections: [
        {
          title: 'Code-First Migrations and Schema Management',
          explanation: `
        <p>Migrations in Entity Framework Core provide a systematic way to evolve your database schema over time while preserving existing data. They bridge the gap between your code changes and database updates, ensuring consistent deployment across different environments.</p>
        
        <h4>Understanding Code-First Development</h4>
        
        <p>Code-First development means your C# entity classes are the single source of truth for your database schema. When you modify your entities, you create migrations to update the database structure accordingly.</p>

        <p><strong>Migration Workflow:</strong></p>
        <ul>
          <li><strong>Model Changes:</strong> Modify entity classes or configurations</li>
          <li><strong>Add Migration:</strong> Generate migration files with <code>Add-Migration</code></li>
          <li><strong>Review Migration:</strong> Examine the generated Up/Down methods</li>
          <li><strong>Update Database:</strong> Apply migrations with <code>Update-Database</code></li>
        </ul>

        <div class="code-example">
          <pre><code>// Creating and applying migrations
// 1. Add initial migration
dotnet ef migrations add InitialCreate

// 2. Update database
dotnet ef database update

// 3. Add new migration for model changes
dotnet ef migrations add AddUserEmail

// 4. Update to specific migration
dotnet ef database update AddUserEmail

// 5. Rollback to previous migration
dotnet ef database update InitialCreate</code></pre>
        </div>

        <h4>Migration File Structure</h4>
        
        <p>Each migration consists of two main methods:</p>
        <ul>
          <li><strong>Up() Method:</strong> Applies the changes (forward migration)</li>
          <li><strong>Down() Method:</strong> Reverts the changes (rollback)</li>
        </ul>

        <div class="code-example">
          <pre><code>// Example migration file
public partial class AddUserEmail : Migration
{
    protected override void Up(MigrationBuilder migrationBuilder)
    {
        migrationBuilder.AddColumn<string>(
            name: "Email",
            table: "Users",
            type: "nvarchar(255)",
            maxLength: 255,
            nullable: false,
            defaultValue: "");

        migrationBuilder.CreateIndex(
            name: "IX_Users_Email",
            table: "Users",
            column: "Email",
            unique: true);
    }

    protected override void Down(MigrationBuilder migrationBuilder)
    {
        migrationBuilder.DropIndex(
            name: "IX_Users_Email",
            table: "Users");

        migrationBuilder.DropColumn(
            name: "Email",
            table: "Users");
    }
}</code></pre>
        </div>

        <div class="interview-tip">
          <p><span class="interview-icon">🎯</span> <strong>Interview Focus:</strong> Demonstrate understanding of database evolution strategies.</p>
          <p>Key questions include: "How do you handle database schema changes in production?" and "What's your strategy for zero-downtime deployments?"</p>
        </div>
      `,
          codeExample: `// Production-ready migration strategy
public class ProductionMigrationService
{
    private readonly ApplicationDbContext _context;
    private readonly ILogger<ProductionMigrationService> _logger;

    public async Task MigrateAsync()
    {
        try
        {
            // Check for pending migrations
            var pendingMigrations = await _context.Database.GetPendingMigrationsAsync();
            
            if (pendingMigrations.Any())
            {
                _logger.LogInformation($"Applying {pendingMigrations.Count()} pending migrations");
                
                // Apply migrations with timeout
                await _context.Database.SetCommandTimeoutAsync(300);
                await _context.Database.MigrateAsync();
                
                _logger.LogInformation("Migrations applied successfully");
            }
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Migration failed");
            throw;
        }
    }
}`,
        },
      ],
      exercise: {
        instructions:
          'Create a comprehensive migration strategy for a multi-tenant application. Include initial schema creation, adding new features, modifying existing tables, and handling data transformations. Implement automated migration testing and rollback procedures.',
      },
    },
    {
      title: 'Query Optimization',
      description:
        'Optimize Entity Framework queries for maximum performance using profiling, indexing strategies, and advanced query techniques.',
      sections: [
        {
          title: 'Performance Optimization and Query Analysis',
          explanation: `
        <p>Query optimization in Entity Framework Core is crucial for building scalable applications. Understanding how LINQ translates to SQL and identifying performance bottlenecks helps you write efficient data access code.</p>
        
        <h4>Query Execution Analysis</h4>
        
        <p><strong>SQL Query Logging:</strong> Enable detailed logging to see exactly what SQL queries EF Core generates.</p>

        <div class="code-example">
          <pre><code>// Enable query logging in development
builder.Services.AddDbContext<ApplicationDbContext>(options =>
{
    options.UseSqlServer(connectionString);
    options.EnableSensitiveDataLogging();
    options.EnableDetailedErrors();
    options.LogTo(Console.WriteLine, LogLevel.Information);
});

// Using logging in queries
var expensiveQuery = context.Users
    .Include(u => u.Orders)
    .ThenInclude(o => o.OrderItems)
    .Where(u => u.IsActive)
    .ToListAsync();
// Check console output for generated SQL</code></pre>
        </div>

        <h4>Common Performance Anti-Patterns</h4>
        
        <p><strong>N+1 Query Problem:</strong> Loading related data in loops instead of using proper includes.</p>

        <div class="code-example">
          <pre><code>// BAD: N+1 queries
var users = await context.Users.ToListAsync();
foreach (var user in users)
{
    // This executes a separate query for each user!
    user.Orders = await context.Orders
        .Where(o => o.UserId == user.Id)
        .ToListAsync();
}

// GOOD: Single query with Include
var users = await context.Users
    .Include(u => u.Orders)
    .ToListAsync();</code></pre>
        </div>

        <p><strong>Over-fetching Data:</strong> Loading more data than needed.</p>

        <div class="code-example">
          <pre><code>// BAD: Loading full entities when only names needed
var userNames = (await context.Users.ToListAsync())
    .Select(u => u.Name)
    .ToList();

// GOOD: Project only needed data
var userNames = await context.Users
    .Select(u => u.Name)
    .ToListAsync();</code></pre>
        </div>

        <h4>Optimization Techniques</h4>
        
        <p><strong>Projection for Performance:</strong> Use Select() to fetch only required fields.</p>
        <p><strong>Split Queries:</strong> Handle cartesian explosion in multi-include scenarios.</p>
        <p><strong>Compiled Queries:</strong> Cache LINQ expression trees for repeated queries.</p>

        <div class="code-example">
          <pre><code>// Split queries for multiple includes
var users = await context.Users
    .AsSplitQuery()  // Generates separate SQL queries
    .Include(u => u.Orders)
    .Include(u => u.Profile)
    .ToListAsync();

// Compiled queries for frequently used patterns
private static readonly Func<ApplicationDbContext, int, Task<User>> GetUserById =
    EF.CompileAsyncQuery((ApplicationDbContext context, int id) =>
        context.Users.Include(u => u.Profile).First(u => u.Id == id));</code></pre>
        </div>

        <div class="interview-tip">
          <p><span class="interview-icon">🎯</span> <strong>Interview Focus:</strong> Show understanding of performance optimization strategies.</p>
          <p>Key questions include: "How do you identify and fix slow queries?" and "What tools do you use for EF Core performance monitoring?"</p>
        </div>
      `,
          codeExample: `// Comprehensive query optimization example
public class OptimizedUserService
{
    private readonly ApplicationDbContext _context;
    
    // Compiled query for frequent operations
    private static readonly Func<ApplicationDbContext, string, IAsyncEnumerable<UserSummaryDto>> 
        SearchUsersCompiled = EF.CompileAsyncQuery(
            (ApplicationDbContext ctx, string term) =>
                ctx.Users
                    .Where(u => u.Name.Contains(term) || u.Email.Contains(term))
                    .Select(u => new UserSummaryDto
                    {
                        Id = u.Id,
                        Name = u.Name,
                        Email = u.Email,
                        OrderCount = u.Orders.Count(),
                        LastOrderDate = u.Orders.Max(o => o.CreatedAt)
                    }));

    public async Task<List<UserSummaryDto>> SearchUsersAsync(string searchTerm)
    {
        var results = new List<UserSummaryDto>();
        
        await foreach (var user in SearchUsersCompiled(_context, searchTerm))
        {
            results.Add(user);
        }
        
        return results;
    }
}`,
        },
      ],
      exercise: {
        instructions:
          'Build a performance monitoring system for EF Core queries. Implement query logging, slow query detection, and optimization recommendations. Create before/after performance comparisons for common query patterns.',
      },
    },
    {
      title: 'Transactions and Concurrency',
      description:
        'Handle database transactions and concurrent access scenarios with proper isolation levels and conflict resolution strategies.',
      sections: [
        {
          title: 'Transaction Management and Concurrency Control',
          explanation: `
        <p>Transactions ensure data consistency and integrity in multi-user environments. Entity Framework Core provides robust transaction support and concurrency control mechanisms to handle concurrent access scenarios safely.</p>
        
        <h4>Understanding Database Transactions</h4>
        
        <p>Transactions follow ACID principles:</p>
        <ul>
          <li><strong>Atomicity:</strong> All operations succeed or all fail</li>
          <li><strong>Consistency:</strong> Database remains in valid state</li>
          <li><strong>Isolation:</strong> Concurrent transactions don't interfere</li>
          <li><strong>Durability:</strong> Committed changes persist</li>
        </ul>

        <div class="code-example">
          <pre><code>// Explicit transaction management
using var transaction = await context.Database.BeginTransactionAsync();
try
{
    // Multiple operations in single transaction
    var order = new Order { Total = 100.00m };
    context.Orders.Add(order);
    
    var user = await context.Users.FindAsync(1);
    user.LastOrderDate = DateTime.UtcNow;
    
    await context.SaveChangesAsync();
    await transaction.CommitAsync();
}
catch
{
    await transaction.RollbackAsync();
    throw;
}</code></pre>
        </div>

        <h4>Optimistic vs Pessimistic Concurrency</h4>
        
        <p><strong>Optimistic Concurrency:</strong> Assumes conflicts are rare, checks for conflicts when saving.</p>
        <p><strong>Pessimistic Concurrency:</strong> Locks data to prevent conflicts, but can cause blocking.</p>

        <div class="code-example">
          <pre><code>// Optimistic concurrency with RowVersion
public class Product
{
    public int Id { get; set; }
    public string Name { get; set; }
    public decimal Price { get; set; }
    
    [Timestamp]  // Optimistic concurrency token
    public byte[] RowVersion { get; set; }
}

// Handling concurrency conflicts
try
{
    product.Price = newPrice;
    await context.SaveChangesAsync();
}
catch (DbUpdateConcurrencyException ex)
{
    // Handle conflict - reload and retry
    var entry = ex.Entries.Single();
    var currentValues = entry.CurrentValues;
    var databaseValues = await entry.GetDatabaseValuesAsync();
    
    // Implement conflict resolution strategy
    entry.OriginalValues.SetValues(databaseValues);
    await context.SaveChangesAsync();
}</code></pre>
        </div>

        <div class="interview-tip">
          <p><span class="interview-icon">🎯</span> <strong>Interview Focus:</strong> Demonstrate understanding of concurrent data access patterns.</p>
          <p>Key questions include: "How do you handle concurrent updates?" and "What's your approach to transaction boundaries in microservices?"</p>
        </div>
      `,
          codeExample: `// Comprehensive transaction service
public class TransactionService
{
    private readonly ApplicationDbContext _context;
    
    public async Task<OrderResult> ProcessOrderAsync(OrderRequest request)
    {
        using var transaction = await _context.Database.BeginTransactionAsync(
            IsolationLevel.ReadCommitted);
        
        try
        {
            // 1. Validate inventory with pessimistic locking
            var product = await _context.Products
                .FromSqlRaw("SELECT * FROM Products WITH (XLOCK) WHERE Id = {0}", 
                           request.ProductId)
                .FirstOrDefaultAsync();
            
            if (product.Stock < request.Quantity)
                throw new InsufficientStockException();
            
            // 2. Create order
            var order = new Order
            {
                UserId = request.UserId,
                ProductId = request.ProductId,
                Quantity = request.Quantity,
                Total = product.Price * request.Quantity
            };
            
            // 3. Update inventory
            product.Stock -= request.Quantity;
            
            // 4. Save all changes atomically
            _context.Orders.Add(order);
            await _context.SaveChangesAsync();
            
            await transaction.CommitAsync();
            return new OrderResult { Success = true, OrderId = order.Id };
        }
        catch
        {
            await transaction.RollbackAsync();
            throw;
        }
    }
}`,
        },
      ],
      exercise: {
        instructions:
          'Implement a comprehensive transaction management system for an e-commerce platform. Handle inventory updates, payment processing, and order creation with proper concurrency control. Include retry logic and conflict resolution strategies.',
      },
    },
    {
      title: 'Repository Pattern',
      description:
        'Implement the Repository pattern to abstract data access logic and create testable, maintainable data access layers.',
      sections: [
        {
          title: 'Repository Pattern Implementation and Best Practices',
          explanation: `
        <p>The Repository pattern abstracts the data access logic and provides a more object-oriented view of the persistence layer. While Entity Framework Core already implements Unit of Work and Repository patterns internally, explicit repository implementation can provide additional benefits for testing and architecture.</p>
        
        <h4>Benefits of Repository Pattern</h4>
        
        <ul>
          <li><strong>Testability:</strong> Easy to mock for unit testing</li>
          <li><strong>Centralized Logic:</strong> Common queries in one place</li>
          <li><strong>Abstraction:</strong> Hide EF Core details from business logic</li>
          <li><strong>Flexibility:</strong> Switch data access technologies</li>
        </ul>

        <h4>Generic Repository Implementation</h4>

        <div class="code-example">
          <pre><code>// Generic repository interface
public interface IRepository<T> where T : class
{
    Task<T> GetByIdAsync(int id);
    Task<IEnumerable<T>> GetAllAsync();
    Task<IEnumerable<T>> FindAsync(Expression<Func<T, bool>> predicate);
    Task AddAsync(T entity);
    Task UpdateAsync(T entity);
    Task DeleteAsync(int id);
}

// Generic repository implementation
public class Repository<T> : IRepository<T> where T : class
{
    protected readonly ApplicationDbContext _context;
    protected readonly DbSet<T> _dbSet;

    public Repository(ApplicationDbContext context)
    {
        _context = context;
        _dbSet = context.Set<T>();
    }

    public async Task<T> GetByIdAsync(int id)
    {
        return await _dbSet.FindAsync(id);
    }

    public async Task<IEnumerable<T>> FindAsync(Expression<Func<T, bool>> predicate)
    {
        return await _dbSet.Where(predicate).ToListAsync();
    }
}</code></pre>
        </div>

        <h4>Specific Repository with Business Logic</h4>

        <div class="code-example">
          <pre><code>// Specific repository interface
public interface IUserRepository : IRepository<User>
{
    Task<User> GetUserWithOrdersAsync(int userId);
    Task<IEnumerable<User>> GetActiveUsersAsync();
    Task<bool> EmailExistsAsync(string email);
}

// Specific repository implementation
public class UserRepository : Repository<User>, IUserRepository
{
    public UserRepository(ApplicationDbContext context) : base(context) { }

    public async Task<User> GetUserWithOrdersAsync(int userId)
    {
        return await _dbSet
            .Include(u => u.Orders)
            .ThenInclude(o => o.OrderItems)
            .FirstOrDefaultAsync(u => u.Id == userId);
    }

    public async Task<IEnumerable<User>> GetActiveUsersAsync()
    {
        return await _dbSet
            .Where(u => u.IsActive)
            .OrderBy(u => u.Name)
            .ToListAsync();
    }

    public async Task<bool> EmailExistsAsync(string email)
    {
        return await _dbSet.AnyAsync(u => u.Email == email);
    }
}</code></pre>
        </div>

        <h4>Unit of Work Pattern</h4>
        
        <p>Unit of Work coordinates multiple repositories and ensures all changes are committed together.</p>

        <div class="code-example">
          <pre><code>public interface IUnitOfWork : IDisposable
{
    IUserRepository Users { get; }
    IOrderRepository Orders { get; }
    Task<int> SaveChangesAsync();
    Task BeginTransactionAsync();
    Task CommitTransactionAsync();
    Task RollbackTransactionAsync();
}

public class UnitOfWork : IUnitOfWork
{
    private readonly ApplicationDbContext _context;
    private IDbContextTransaction _transaction;

    public UnitOfWork(ApplicationDbContext context)
    {
        _context = context;
        Users = new UserRepository(_context);
        Orders = new OrderRepository(_context);
    }

    public IUserRepository Users { get; }
    public IOrderRepository Orders { get; }

    public async Task<int> SaveChangesAsync()
    {
        return await _context.SaveChangesAsync();
    }
}</code></pre>
        </div>

        <div class="interview-tip">
          <p><span class="interview-icon">🎯</span> <strong>Interview Focus:</strong> Discuss architecture patterns and when to use Repository vs direct EF Core.</p>
          <p>Key questions include: "When would you use Repository pattern with EF Core?" and "How do you balance abstraction with EF Core features?"</p>
        </div>
      `,
          codeExample: `// Complete Repository pattern with dependency injection
// Service registration
services.AddScoped<IUnitOfWork, UnitOfWork>();
services.AddScoped<IUserRepository, UserRepository>();
services.AddScoped<IOrderRepository, OrderRepository>();

// Service layer using repositories
public class UserService
{
    private readonly IUnitOfWork _unitOfWork;

    public UserService(IUnitOfWork unitOfWork)
    {
        _unitOfWork = unitOfWork;
    }

    public async Task<UserDto> CreateUserAsync(CreateUserRequest request)
    {
        // Business logic validation
        if (await _unitOfWork.Users.EmailExistsAsync(request.Email))
            throw new DuplicateEmailException();

        var user = new User
        {
            Name = request.Name,
            Email = request.Email,
            CreatedAt = DateTime.UtcNow
        };

        await _unitOfWork.Users.AddAsync(user);
        await _unitOfWork.SaveChangesAsync();

        return MapToDto(user);
    }
}`,
        },
      ],
      exercise: {
        instructions:
          'Design and implement a complete Repository pattern architecture for a library management system. Include generic and specific repositories, Unit of Work, and comprehensive testing strategy. Compare performance and maintainability with direct EF Core usage.',
      },
    },
  ],
  prepperSummary: `
    <h3>Entity Framework Core Mastery - Interview Preparation Summary</h3>
    
    <p>This comprehensive section covered the essential aspects of data access using Entity Framework Core, from fundamental ORM concepts to advanced patterns and optimization techniques. Here's what you've mastered:</p>
    
    <h4>Core Concepts Mastered</h4>
    <ul>
      <li><strong>ORM Fundamentals:</strong> Understanding object-relational impedance mismatch and how EF Core bridges the gap</li>
      <li><strong>Entity Modeling:</strong> Creating robust entity classes with proper validation and mapping</li>
      <li><strong>DbContext Management:</strong> Configuring and managing database contexts with proper lifecycle</li>
      <li><strong>LINQ to Entities:</strong> Writing efficient queries with deferred vs immediate execution</li>
      <li><strong>Relationships:</strong> Configuring one-to-one, one-to-many, and many-to-many relationships</li>
      <li><strong>Migrations:</strong> Managing database schema evolution with code-first migrations</li>
      <li><strong>Performance:</strong> Optimizing queries and avoiding common anti-patterns</li>
      <li><strong>Transactions:</strong> Handling concurrency and maintaining data consistency</li>
      <li><strong>Patterns:</strong> Implementing Repository and Unit of Work patterns appropriately</li>
    </ul>
    
    <h4>Key Interview Topics</h4>
    
    <p><strong>Architecture and Design:</strong></p>
    <ul>
      <li>When to use EF Core vs other data access technologies</li>
      <li>Repository pattern implementation and trade-offs</li>
      <li>DbContext lifecycle and dependency injection strategies</li>
      <li>Code-first vs database-first approaches</li>
    </ul>
    
    <p><strong>Performance and Optimization:</strong></p>
    <ul>
      <li>Identifying and resolving N+1 query problems</li>
      <li>Using projections and compiled queries for performance</li>
      <li>Understanding query execution plans and SQL generation</li>
      <li>Implementing proper indexing strategies</li>
    </ul>
    
    <p><strong>Concurrency and Transactions:</strong></p>
    <ul>
      <li>Optimistic vs pessimistic concurrency control</li>
      <li>Transaction isolation levels and their implications</li>
      <li>Handling concurrent updates and conflict resolution</li>
      <li>Implementing retry policies and circuit breakers</li>
    </ul>
    
    <h4>Common Interview Questions and Answers</h4>
    
    <p><strong>Q: "How do you handle database migrations in production environments?"</strong></p>
    <p>A: Implement automated migration scripts with proper testing, rollback procedures, and zero-downtime deployment strategies. Use feature flags for gradual rollouts and monitoring.</p>
    
    <p><strong>Q: "What's your approach to optimizing slow EF Core queries?"</strong></p>
    <p>A: Enable query logging, use SQL profilers, implement projections instead of full entity loading, leverage compiled queries for frequent operations, and consider raw SQL for complex scenarios.</p>
    
    <p><strong>Q: "When would you use Repository pattern with EF Core?"</strong></p>
    <p>A: For improved testability, when business logic requires specific data access patterns, for consistent API across different storage technologies, or when additional abstraction layer provides architectural benefits.</p>
    
    <p><strong>Q: "How do you handle concurrency conflicts in multi-user applications?"</strong></p>
    <p>A: Implement optimistic concurrency with row versioning, provide conflict resolution strategies (last-write-wins vs user-merge), use appropriate isolation levels, and implement retry mechanisms with exponential backoff.</p>
    
    <h4>Best Practices for Production</h4>
    <ul>
      <li><strong>Connection Management:</strong> Use connection pooling and proper disposal patterns</li>
      <li><strong>Query Optimization:</strong> Monitor query performance and implement caching strategies</li>
      <li><strong>Security:</strong> Use parameterized queries and implement proper authorization</li>
      <li><strong>Monitoring:</strong> Implement comprehensive logging and performance metrics</li>
      <li><strong>Testing:</strong> Use in-memory databases for unit tests and integration tests for validation</li>
    </ul>
    
    <h4>Advanced Topics to Explore Further</h4>
    <ul>
      <li>EF Core interceptors for cross-cutting concerns</li>
      <li>Global query filters for multi-tenancy</li>
      <li>Custom value converters and property builders</li>
      <li>Bulk operations and performance optimization</li>
      <li>Integration with domain-driven design patterns</li>
    </ul>
    
    <p>Master these concepts and you'll be well-prepared to discuss Entity Framework Core in technical interviews and implement robust data access solutions in production applications.</p>
  `,
  challenge: {
    description:
      'Build a comprehensive e-commerce data access layer using Entity Framework Core. This challenge integrates all the concepts covered in this section and simulates real-world development scenarios you might encounter in technical interviews.',
    requirements: [
      'Design and implement a complete entity model with proper relationships',
      'Create efficient repositories with business-specific query methods',
      'Implement proper transaction handling and concurrency control',
      'Build a migration strategy with seed data and constraints',
      'Create performance-optimized queries with projection and caching',
      'Implement comprehensive error handling and logging',
      'Write unit tests with proper mocking strategies',
      'Document the architecture and design decisions',
    ],
    starterCode: `// E-commerce Data Access Layer Challenge
// Implement a complete EF Core solution for an e-commerce platform

// 1. Entity Models
public class Customer
{
    // TODO: Implement customer entity with proper validation
    // Include: Id, Name, Email, Phone, RegisteredDate
    // Relationships: Orders, Addresses, Reviews
}

public class Product
{
    // TODO: Implement product entity
    // Include: Id, Name, Description, Price, Stock, CategoryId
    // Relationships: Category, OrderItems, Reviews, Images
}

public class Order
{
    // TODO: Implement order entity with proper status tracking
    // Include: Id, OrderNumber, CustomerId, OrderDate, Status, TotalAmount
    // Relationships: Customer, OrderItems, Payments
}

// 2. DbContext Configuration
public class ECommerceDbContext : DbContext
{
    // TODO: Configure DbSets and relationships
    // Implement: OnModelCreating with Fluent API
    // Include: Indexes, constraints, seed data
}

// 3. Repository Pattern
public interface ICustomerRepository : IRepository<Customer>
{
    // TODO: Define customer-specific methods
    // Include: GetCustomerWithOrdersAsync, GetTopCustomersAsync
}

public class CustomerRepository : Repository<Customer>, ICustomerRepository
{
    // TODO: Implement efficient customer queries
    // Focus on: Performance optimization, proper includes
}

// 4. Business Service Layer
public class OrderService
{
    private readonly IUnitOfWork _unitOfWork;
    
    public async Task<OrderResult> CreateOrderAsync(CreateOrderRequest request)
    {
        // TODO: Implement order creation with transaction handling
        // Include: Inventory validation, payment processing, concurrency handling
        // Consider: Optimistic concurrency, error handling, logging
    }
}

// 5. Performance Optimization
public class ProductSearchService
{
    // TODO: Implement advanced product search with:
    // - Dynamic query building
    // - Efficient pagination
    // - Caching strategies
    // - Full-text search capabilities
}

// 6. Testing Strategy
public class CustomerRepositoryTests
{
    // TODO: Implement comprehensive unit tests
    // Include: In-memory database setup, mock data, assertion patterns
}

// Requirements to fulfill:
// □ All entities properly configured with relationships
// □ Migrations created and tested
// □ Repository pattern with Unit of Work implemented
// □ Transaction handling for complex operations
// □ Query optimization with projections and includes
// □ Concurrency handling with proper conflict resolution
// □ Comprehensive error handling and logging
// □ Unit tests with high coverage
// □ Performance benchmarking and optimization
// □ Documentation of architectural decisions
`,
  },
}

export default dataAccessWithEFCore
