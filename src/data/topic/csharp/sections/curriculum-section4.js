// curriculum-section4.js - C# Memory Management and Performance

const memoryManagementAndPerformance = {
  title: 'C# Memory Management and Performance',
  description:
    'Learn how to optimize C# applications by understanding memory management, improving performance, and employing best practices.',
  lessons: [
    {
      title: 'Value Types vs Reference Types',
      description:
        'Master the fundamental differences in memory allocation, performance characteristics, and behavioral patterns between value and reference types.',
      sections: [
        {
          title: 'The Foundation of C# Memory Management',
          explanation: `
        <p>Understanding how C# manages memory is crucial for writing high-performance applications. The distinction between value types and reference types forms the foundation of C#'s memory model and directly impacts both performance and behavior.</p>
        
        <h4>Memory Regions: Stack vs Heap</h4>
        <p>C# uses two primary memory regions, each optimized for different purposes:</p>

        <p><strong>The Stack:</strong> A fast, automatically managed memory region that operates on a Last-In-First-Out (LIFO) principle. Think of it like a stack of plates - you can only add or remove from the top. This region is used for:</p>
        <ul>
          <li>Local variables of value types</li>
          <li>Method parameters and return addresses</li>
          <li>References to objects on the heap</li>
        </ul>

        <p><strong>The Heap:</strong> A larger, more flexible memory region managed by the garbage collector. Unlike the stack, objects can be allocated anywhere in the heap, and the GC handles cleanup. This region stores:</p>
        <ul>
          <li>All reference type instances (objects)</li>
          <li>Large value types when boxed</li>
          <li>Static variables and type metadata</li>
        </ul>

        <h4>Value Types: Direct Storage and Copying</h4>
        <p>Value types store their data directly in the memory location where they're declared. When you assign a value type to another variable, the entire value is copied bit-by-bit. This creates completely independent variables.</p>

        <p><strong>Common value types include:</strong></p>
        <ul>
          <li>Primitive types: <code>int</code>, <code>double</code>, <code>bool</code>, <code>char</code></li>
          <li>Structs: Custom value types like <code>DateTime</code>, <code>Point</code></li>
          <li>Enums: Named constants with underlying numeric values</li>
          <li>Nullable types: <code>int?</code>, <code>DateTime?</code></li>
        </ul>

        <h4>Reference Types: Indirect Access and Sharing</h4>
        <p>Reference types store a reference (memory address) to their actual data on the heap. When you assign a reference type to another variable, only the reference is copied, not the underlying object. This means multiple variables can point to the same object.</p>

        <p><strong>Common reference types include:</strong></p>
        <ul>
          <li>Classes: Custom reference types and built-in types like <code>string</code></li>
          <li>Arrays: Even arrays of value types are reference types</li>
          <li>Delegates and interfaces</li>
          <li>Object and dynamic types</li>
        </ul>

        <div class="code-example">
          <pre><code>// Value type behavior - independent copies
struct Point
{
    public int X, Y;
    public Point(int x, int y) { X = x; Y = y; }
    public override string ToString() => $"({X}, {Y})";
}

Point original = new Point(1, 2);
Point copy = original;  // Entire struct is copied
copy.X = 10;           // Only affects the copy
Console.WriteLine($"Original: {original}");  // (1, 2)
Console.WriteLine($"Copy: {copy}");          // (10, 2)

// Reference type behavior - shared instances
class Person
{
    public string Name { get; set; }
    public int Age { get; set; }
}

Person person1 = new Person { Name = "Alice", Age = 30 };
Person person2 = person1;  // Only reference is copied
person2.Name = "Bob";      // Modifies the same object
Console.WriteLine($"person1.Name: {person1.Name}");  // "Bob"
Console.WriteLine($"person2.Name: {person2.Name}");  // "Bob"
</code></pre>
        </div>

        <h4>Performance Implications and Trade-offs</h4>
        <p>The choice between value and reference types has significant performance implications:</p>

        <p><strong>Value types advantages:</strong></p>
        <ul>
          <li>Faster allocation and deallocation (no GC pressure)</li>
          <li>Better cache locality when stored in arrays</li>
          <li>No reference indirection overhead</li>
          <li>Thread-safe copying (immutable by copy)</li>
        </ul>

        <p><strong>Reference types advantages:</strong></p>
        <ul>
          <li>Efficient for large objects (no copying overhead)</li>
          <li>Enable polymorphism and inheritance</li>
          <li>Support null values naturally</li>
          <li>Shared instances reduce memory usage</li>
        </ul>

        <h4>Boxing and Unboxing: The Performance Trap</h4>
        <p>Boxing occurs when a value type is implicitly converted to a reference type (like <code>object</code>). This creates a heap-allocated wrapper around the value type, which can significantly impact performance in loops or frequently called methods.</p>

        <div class="code-example">
          <pre><code>// Boxing example - performance concern
int number = 42;
object boxed = number;        // Boxing: int -> object (heap allocation)
int unboxed = (int)boxed;     // Unboxing: object -> int (type check + copy)

// Avoiding boxing with generics
List&lt;int&gt; numbers = new List&lt;int&gt;();  // No boxing
numbers.Add(42);                     // Direct storage

// vs. non-generic collections (avoid these)
ArrayList list = new ArrayList();
list.Add(42);  // Boxing occurs here!
</code></pre>
        </div>

        <div class="interview-tip">
          <p><span class="interview-icon">🎯</span> <strong>Interview Focus:</strong> Demonstrate deep understanding of memory allocation and performance implications.</p>
          <p>Key questions interviewers ask:</p>
          <ul>
            <li>"Explain what happens in memory when you assign a struct vs a class to another variable"</li>
            <li>"Why might boxing be a performance concern and how would you avoid it?"</li>
            <li>"When would you choose a struct over a class, and vice versa?"</li>
            <li>"How does the garbage collector impact reference types but not value types?"</li>
            <li>"What are the implications of having large structs in your application?"</li>
          </ul>
        </div>
      `,
          codeExample: `// Comprehensive demonstration of value vs reference type behavior

public struct Money  // Value type for financial calculations
{
    public decimal Amount { get; }
    public string Currency { get; }
    
    public Money(decimal amount, string currency)
    {
        Amount = amount;
        Currency = currency ?? throw new ArgumentNullException(nameof(currency));
    }
    
    // Value types should be immutable for best practices
    public Money Add(Money other)
    {
        if (Currency != other.Currency)
            throw new InvalidOperationException("Cannot add different currencies");
        
        return new Money(Amount + other.Amount, Currency);
    }
    
    public override string ToString() => $"{Amount:C} {Currency}";
}

public class BankAccount  // Reference type for complex entities
{
    public string AccountNumber { get; }
    public string Owner { get; set; }
    public Money Balance { get; private set; }
    
    public BankAccount(string accountNumber, string owner, Money initialBalance)
    {
        AccountNumber = accountNumber ?? throw new ArgumentNullException(nameof(accountNumber));
        Owner = owner ?? throw new ArgumentNullException(nameof(owner));
        Balance = initialBalance;
    }
    
    public void Deposit(Money amount)
    {
        Balance = Balance.Add(amount);
    }
    
    public override string ToString() => 
        $"Account {AccountNumber} ({Owner}): {Balance}";
}

public static void DemonstrateTypesBehavior()
{
    Console.WriteLine("=== Value Type Behavior (Money struct) ===");
    
    // Value types are copied entirely
    Money salary = new Money(5000, "USD");
    Money bonus = salary;  // Complete copy of the struct
    
    // Since Money is immutable, we create a new instance
    bonus = new Money(1000, "USD");
    
    Console.WriteLine($"Salary: {salary}");   // Still $5,000.00 USD
    Console.WriteLine($"Bonus: {bonus}");     // $1,000.00 USD
    
    Console.WriteLine("\\n=== Reference Type Behavior (BankAccount class) ===");
    
    // Reference types share the same instance
    BankAccount account1 = new BankAccount("12345", "Alice", salary);
    BankAccount account2 = account1;  // Both variables point to same object
    
    account2.Owner = "Alice Smith";    // Changes the shared object
    account2.Deposit(bonus);           // Modifies the shared balance
    
    Console.WriteLine($"account1: {account1}");  // Shows "Alice Smith" and updated balance
    Console.WriteLine($"account2: {account2}");  // Same object, same values
    Console.WriteLine($"Same object? {ReferenceEquals(account1, account2)}");  // True
    
    Console.WriteLine("\\n=== Boxing/Unboxing Performance Impact ===");
    
    // Demonstrate boxing performance impact
    var stopwatch = System.Diagnostics.Stopwatch.StartNew();
    
    // Bad: Boxing in non-generic collection
    ArrayList boxingList = new ArrayList();
    for (int i = 0; i < 100000; i++)
    {
        boxingList.Add(i);  // Boxing occurs here!
    }
    stopwatch.Stop();
    Console.WriteLine($"Boxing approach: {stopwatch.ElapsedMilliseconds}ms");
    
    stopwatch.Restart();
    
    // Good: No boxing with generic collection
    List<int> genericList = new List<int>();
    for (int i = 0; i < 100000; i++)
    {
        genericList.Add(i);  // No boxing!
    }
    stopwatch.Stop();
    Console.WriteLine($"Generic approach: {stopwatch.ElapsedMilliseconds}ms");
    
    Console.WriteLine("\\n=== Memory Allocation Patterns ===");
    
    // Stack allocation (value types)
    int stackInt = 42;           // Allocated on stack
    DateTime stackDate = DateTime.Now;  // Struct on stack
    
    // Heap allocation (reference types)
    string heapString = "Hello";        // String on heap
    int[] heapArray = new int[10];      // Array on heap
    
    // Mixed: Array of value types
    Point[] points = new Point[1000];   // Array itself on heap
    // But Point structs are stored directly in the array (good cache locality)
    
    Console.WriteLine("Value types provide better cache locality in arrays");
    Console.WriteLine("Reference types enable polymorphism and shared state");
}`,
        },
      ],
      exercise: {
        instructions:
          'Create a comprehensive demonstration comparing value and reference types. Implement a Money struct (immutable value type) and a BankAccount class (mutable reference type). Write code that shows the behavioral differences when assigning, copying, and modifying instances. Include a performance test comparing boxing vs non-boxing scenarios with 100,000 iterations.',
      },
    },
    {
      title: ".NET's Garbage Collection",
      description:
        'Deep dive into how the .NET garbage collector works, its generational algorithm, and strategies for writing GC-friendly, high-performance code.',
      sections: [
        {
          title: 'The Garbage Collection Architecture',
          explanation: `
        <p>The .NET garbage collector is one of the most sophisticated automatic memory management systems available, designed to balance performance with ease of use. Understanding its inner workings is essential for writing high-performance C# applications.</p>
        
        <h4>Why Automatic Memory Management?</h4>
        <p>Before diving into how the GC works, it's important to understand why it exists. Manual memory management (like in C/C++) is error-prone and leads to common issues:</p>
        <ul>
          <li><strong>Memory leaks:</strong> Forgetting to deallocate memory</li>
          <li><strong>Dangling pointers:</strong> Using freed memory</li>
          <li><strong>Double-free errors:</strong> Deallocating the same memory twice</li>
          <li><strong>Fragmentation:</strong> Inefficient memory layout over time</li>
        </ul>

        <p>The .NET garbage collector solves these problems by automatically tracking object references and reclaiming memory when objects are no longer reachable.</p>

        <h4>The Generational Hypothesis</h4>
        <p>The GC's design is based on two key observations about program behavior:</p>
        <ol>
          <li><strong>Most objects die young:</strong> Objects allocated recently are more likely to become unreachable soon</li>
          <li><strong>Older objects tend to live longer:</strong> Objects that survive several collections tend to live much longer</li>
        </ol>

        <p>This leads to the generational design with three generations:</p>

        <p><strong>Generation 0 (Gen 0):</strong> The nursery for new objects. Most allocations start here, and most objects die here. Collections are frequent but fast because the generation is small.</p>

        <p><strong>Generation 1 (Gen 1):</strong> A buffer between Gen 0 and Gen 2. Objects that survive one Gen 0 collection are promoted here. This acts as a filter to prevent short-lived objects from reaching Gen 2.</p>

        <p><strong>Generation 2 (Gen 2):</strong> Long-lived objects live here. Collections are infrequent but more expensive because they can examine the entire heap. Large objects (≥85KB) go directly to a special Large Object Heap (LOH) which is collected with Gen 2.</p>

        <h4>Collection Triggers and Process</h4>
        <p>The GC triggers collections based on several factors:</p>
        <ul>
          <li>Generation size thresholds (each generation has a budget)</li>
          <li>System memory pressure</li>
          <li>Explicit calls to <code>GC.Collect()</code> (rarely needed)</li>
          <li>Application domain unloading</li>
        </ul>

        <p>The collection process follows these steps:</p>
        <ol>
          <li><strong>Mark phase:</strong> Starting from roots (static variables, local variables, CPU registers), trace all reachable objects</li>
          <li><strong>Sweep phase:</strong> Identify unreachable objects as garbage</li>
          <li><strong>Compact phase:</strong> Move surviving objects together to eliminate fragmentation</li>
          <li><strong>Update references:</strong> Fix all references to point to new object locations</li>
        </ol>

        <div class="code-example">
          <pre><code>// Monitoring GC behavior
public static void MonitorGCBehavior()
{
    Console.WriteLine("Initial state:");
    PrintGCInfo();
    
    // Create many short-lived objects
    for (int i = 0; i < 100000; i++)
    {
        var temp = new string('*', 100);  // Creates pressure on Gen 0
        
        if (i % 10000 == 0)
        {
            Console.WriteLine($"\\nAfter {i} allocations:");
            PrintGCInfo();
        }
    }
    
    Console.WriteLine("\\nAfter all allocations:");
    PrintGCInfo();
}

private static void PrintGCInfo()
{
    Console.WriteLine($"Gen 0 collections: {GC.CollectionCount(0)}");
    Console.WriteLine($"Gen 1 collections: {GC.CollectionCount(1)}");
    Console.WriteLine($"Gen 2 collections: {GC.CollectionCount(2)}");
    Console.WriteLine($"Total memory: {GC.GetTotalMemory(false):N0} bytes");
}
</code></pre>
        </div>

        <h4>Writing GC-Friendly Code</h4>
        <p>Understanding the GC helps you write more efficient code:</p>

        <p><strong>Minimize allocations in hot paths:</strong> Every object allocation has a cost. Reuse objects when possible, especially in frequently called methods.</p>

        <p><strong>Avoid large object allocations:</strong> Objects ≥85KB go to the LOH, which is collected less frequently and not compacted (until .NET 4.5.1+ with opt-in compaction).</p>

        <p><strong>Be mindful of object lifetimes:</strong> Avoid accidentally keeping short-lived objects alive (e.g., through event handlers, static collections).</p>

        <p><strong>Use weak references for caches:</strong> Allow the GC to collect cached objects when memory is needed.</p>

        <div class="code-example">
          <pre><code>// Weak reference pattern for caching
public class ImageCache
{
    private Dictionary&lt;string, WeakReference&gt; _cache = new();
    
    public Image GetImage(string path)
    {
        if (_cache.TryGetValue(path, out var weakRef) && 
            weakRef.Target is Image cachedImage)
        {
            return cachedImage;  // Cache hit
        }
        
        // Cache miss - load and cache with weak reference
        var image = Image.LoadFromFile(path);
        _cache[path] = new WeakReference(image);
        return image;
    }
}
</code></pre>
        </div>

        <h4>Advanced GC Concepts</h4>
        <p><strong>Finalizers:</strong> Allow cleanup of unmanaged resources but delay GC of objects by at least one collection cycle. Use IDisposable instead when possible.</p>

        <p><strong>GC modes:</strong> Workstation vs Server GC, Concurrent vs Non-concurrent, each optimized for different scenarios.</p>

        <p><strong>GC pressure:</strong> Too many allocations can cause frequent collections, hurting performance. Monitor using performance counters or ETW events.</p>

        <div class="interview-tip">
          <p><span class="interview-icon">🎯</span> <strong>Interview Focus:</strong> Demonstrate comprehensive understanding of GC internals and practical optimization strategies.</p>
          <p>Critical interview topics include:</p>
          <ul>
            <li>"Explain the generational hypothesis and how it influences .NET GC design"</li>
            <li>"What happens during a Gen 2 collection vs a Gen 0 collection?"</li>
            <li>"How would you identify and fix GC pressure in an application?"</li>
            <li>"When should you call GC.Collect() and when should you avoid it?"</li>
            <li>"Explain the difference between IDisposable and finalizers"</li>
            <li>"How does the Large Object Heap behave differently from regular generations?"</li>
          </ul>
        </div>
      `,
          codeExample: `// Comprehensive GC behavior demonstration

public class GCOptimizationDemo
{
    private static readonly Random _random = new Random();
    
    public static void DemonstrateGCPatterns()
    {
        Console.WriteLine("=== GC Generation Demonstration ===\\n");
        
        // Show initial state
        PrintDetailedGCInfo("Initial state");
        
        // Create objects with different lifetimes
        CreateShortLivedObjects();
        CreateMediumLivedObjects();
        CreateLongLivedObjects();
        
        // Force full collection to see final state
        Console.WriteLine("\\nForcing full garbage collection...");
        GC.Collect();
        GC.WaitForPendingFinalizers();
        GC.Collect();
        
        PrintDetailedGCInfo("After full GC");
    }
    
    private static void CreateShortLivedObjects()
    {
        Console.WriteLine("Creating 50,000 short-lived objects...");
        
        for (int i = 0; i < 50000; i++)
        {
            // These objects will likely die in Gen 0
            var temp = new StringBuilder();
            temp.Append($"Temporary string {i}");
            temp.Append(" with some additional content");
            
            if (i % 10000 == 0)
            {
                PrintDetailedGCInfo($"After {i} short-lived objects");
            }
        }
    }
    
    private static List&lt;string&gt; _mediumLivedCache = new();
    
    private static void CreateMediumLivedObjects()
    {
        Console.WriteLine("\\nCreating medium-lived objects (cached temporarily)...");
        
        for (int i = 0; i < 1000; i++)
        {
            // These will survive to Gen 1, maybe Gen 2
            _mediumLivedCache.Add($"Cached item {i}: {GenerateRandomData()}");
        }
        
        PrintDetailedGCInfo("After creating medium-lived objects");
        
        // Clear half the cache (simulating cache eviction)
        _mediumLivedCache.RemoveRange(0, _mediumLivedCache.Count / 2);
        
        PrintDetailedGCInfo("After cache eviction");
    }
    
    private static List&lt;byte[]&gt; _longLivedData = new();
    
    private static void CreateLongLivedObjects()
    {
        Console.WriteLine("\\nCreating long-lived objects...");
        
        for (int i = 0; i < 10; i++)
        {
            // These will reach Gen 2 and stay there
            _longLivedData.Add(new byte[1024 * 1024]); // 1MB each
        }
        
        PrintDetailedGCInfo("After creating long-lived objects");
    }
    
    private static string GenerateRandomData()
    {
        var buffer = new char[100];
        for (int i = 0; i < buffer.Length; i++)
        {
            buffer[i] = (char)('A' + _random.Next(26));
        }
        return new string(buffer);
    }
    
    private static void PrintDetailedGCInfo(string phase)
    {
        Console.WriteLine($"\\n--- {phase} ---");
        Console.WriteLine($"Gen 0 collections: {GC.CollectionCount(0)}");
        Console.WriteLine($"Gen 1 collections: {GC.CollectionCount(1)}");
        Console.WriteLine($"Gen 2 collections: {GC.CollectionCount(2)}");
        Console.WriteLine($"Total memory: {GC.GetTotalMemory(false):N0} bytes");
        Console.WriteLine($"Allocated bytes for current thread: {GC.GetAllocatedBytesForCurrentThread():N0}");
        
        // Check memory pressure
        var memoryInfo = GC.GetGCMemoryInfo();
        Console.WriteLine($"High memory load threshold: {memoryInfo.HighMemoryLoadThresholdBytes:N0} bytes");
        Console.WriteLine($"Memory load: {memoryInfo.MemoryLoadBytes:N0} bytes");
    }
    
    // Demonstrate weak references for memory-sensitive caching
    public class MemoryEfficientCache&lt;TKey, TValue&gt; where TValue : class
    {
        private readonly Dictionary&lt;TKey, WeakReference&gt; _cache = new();
        private readonly Func&lt;TKey, TValue&gt; _valueFactory;
        
        public MemoryEfficientCache(Func&lt;TKey, TValue&gt; valueFactory)
        {
            _valueFactory = valueFactory ?? throw new ArgumentNullException(nameof(valueFactory));
        }
        
        public TValue GetOrCreate(TKey key)
        {
            // Try to get from cache
            if (_cache.TryGetValue(key, out var weakRef) && 
                weakRef.Target is TValue cachedValue)
            {
                return cachedValue;
            }
            
            // Create new value
            var newValue = _valueFactory(key);
            _cache[key] = new WeakReference(newValue);
            
            // Periodically clean up dead weak references
            if (_cache.Count % 100 == 0)
            {
                CleanupDeadReferences();
            }
            
            return newValue;
        }
        
        private void CleanupDeadReferences()
        {
            var deadKeys = _cache
                .Where(kvp => !kvp.Value.IsAlive)
                .Select(kvp => kvp.Key)
                .ToList();
                
            foreach (var key in deadKeys)
            {
                _cache.Remove(key);
            }
            
            Console.WriteLine($"Cleaned up {deadKeys.Count} dead cache entries");
        }
    }
}`,
        },
      ],
      exercise: {
        instructions:
          'Build a comprehensive GC monitoring application that creates objects with different lifetimes and tracks GC behavior. Implement a memory-efficient cache using WeakReference that automatically cleans up when objects are garbage collected. Include detailed logging of GC collections, memory usage, and object lifetime patterns. Test with at least 100,000 short-lived objects, 10,000 medium-lived objects, and 100 long-lived objects.',
      },
    },
    {
      title: 'Advanced Memory Optimization Strategies',
      description:
        'Master techniques for reducing memory allocations, improving cache performance, and building high-throughput applications.',
      sections: [
        {
          title: 'Understanding Memory Allocation Patterns',
          explanation: `
        <p>Effective memory optimization requires understanding how different allocation patterns affect performance. Every allocation has a cost - not just in terms of memory usage, but also GC pressure, CPU cache misses, and overall throughput.</p>
        
        <h4>The Cost of Allocations</h4>
        <p>Memory allocations are more expensive than they appear because they involve:</p>
        <ul>
          <li><strong>Heap traversal:</strong> Finding available memory space</li>
          <li><strong>Object initialization:</strong> Zeroing memory and setting up object headers</li>
          <li><strong>GC pressure:</strong> Every allocation brings the next collection closer</li>
          <li><strong>Cache pollution:</strong> New objects can evict useful data from CPU caches</li>
        </ul>

        <h4>Object Pooling: Reusing Instead of Allocating</h4>
        <p>Object pooling is a technique where you maintain a pool of reusable objects instead of constantly creating and destroying them. This is particularly effective for:</p>
        <ul>
          <li>Expensive-to-create objects (database connections, StringBuilder instances)</li>
          <li>Short-lived objects used frequently (temporary buffers, parsers)</li>
          <li>Objects with predictable usage patterns</li>
        </ul>

        <p>The .NET Core library includes several built-in pools:</p>
        <ul>
          <li><code>ArrayPool&lt;T&gt;</code>: For temporary arrays</li>
          <li><code>MemoryPool&lt;T&gt;</code>: For Memory&lt;T&gt; instances</li>
          <li><code>ObjectPool&lt;T&gt;</code>: Generic object pooling (in Microsoft.Extensions.ObjectPool)</li>
        </ul>

        <div class="code-example">
          <pre><code>// Custom StringBuilder pool
public class StringBuilderPool
{
    private readonly ConcurrentQueue&lt;StringBuilder&gt; _pool = new();
    private readonly int _maxCapacity;
    
    public StringBuilderPool(int maxCapacity = 1024)
    {
        _maxCapacity = maxCapacity;
    }
    
    public StringBuilder Rent()
    {
        if (_pool.TryDequeue(out var sb))
        {
            sb.Clear();  // Reset for reuse
            return sb;
        }
        
        return new StringBuilder();
    }
    
    public void Return(StringBuilder sb)
    {
        if (sb.Capacity <= _maxCapacity)
        {
            _pool.Enqueue(sb);
        }
        // Large StringBuilders are not returned to prevent memory bloat
    }
}

// Usage pattern
using var sbPool = new StringBuilderPool();
var sb = sbPool.Rent();
try
{
    sb.Append("Build your string here...");
    return sb.ToString();
}
finally
{
    sbPool.Return(sb);
}
</code></pre>
        </div>

        <h4>Cache Locality and Data Structure Design</h4>
        <p>Modern CPUs are much faster than RAM, so they rely heavily on caches. Understanding cache behavior can lead to significant performance improvements:</p>

        <p><strong>Spatial locality:</strong> Accessing memory locations close to recently accessed ones. Arrays provide excellent spatial locality.</p>

        <p><strong>Temporal locality:</strong> Accessing the same memory location multiple times. Keeping frequently used data together improves cache hit rates.</p>

        <p><strong>Structure of Arrays vs Array of Structures:</strong> Depending on access patterns, different data layouts can dramatically affect performance.</p>

        <div class="code-example">
          <pre><code>// Array of Structures (AoS) - good when processing entire objects
public struct Particle
{
    public float X, Y, Z;
    public float VelocityX, VelocityY, VelocityZ;
    public float Mass;
}

Particle[] particles = new Particle[1000000];

// Structure of Arrays (SoA) - better for processing specific fields
public class ParticleSystem
{
    public float[] PositionsX = new float[1000000];
    public float[] PositionsY = new float[1000000];
    public float[] PositionsZ = new float[1000000];
    public float[] VelocitiesX = new float[1000000];
    // ... etc
    
    // When updating only positions, we get better cache locality
    public void UpdatePositions()
    {
        for (int i = 0; i < PositionsX.Length; i++)
        {
            PositionsX[i] += VelocitiesX[i];  // Sequential memory access
            PositionsY[i] += VelocitiesY[i];  // Good cache locality
            PositionsZ[i] += VelocitiesZ[i];
        }
    }
}
</code></pre>
        </div>

        <h4>Avoiding Large Object Heap (LOH) Allocations</h4>
        <p>Objects 85KB or larger are allocated on the Large Object Heap, which has different characteristics:</p>
        <ul>
          <li>Collected only during Gen 2 collections (less frequent)</li>
          <li>Not compacted by default (can lead to fragmentation)</li>
          <li>Can cause performance issues in allocation-heavy scenarios</li>
        </ul>

        <p>Strategies to avoid LOH issues:</p>
        <ul>
          <li>Use streaming for large data instead of loading everything into memory</li>
          <li>Split large arrays into smaller chunks</li>
          <li>Use <code>ArrayPool&lt;T&gt;</code> for temporary large arrays</li>
          <li>Consider Memory-Mapped Files for very large datasets</li>
        </ul>

        <div class="interview-tip">
          <p><span class="interview-icon">🎯</span> <strong>Interview Focus:</strong> Demonstrate understanding of memory optimization techniques and their trade-offs.</p>
          <p>Key interview questions include:</p>
          <ul>
            <li>"How would you optimize an application that allocates many temporary objects?"</li>
            <li>"Explain the difference between spatial and temporal locality"</li>
            <li>"When would you use Structure of Arrays vs Array of Structures?"</li>
            <li>"How does the Large Object Heap behave differently from regular heap?"</li>
            <li>"What are the benefits and potential drawbacks of object pooling?"</li>
          </ul>
        </div>
      `,
          codeExample: `// Comprehensive memory optimization example

public class HighPerformanceTextProcessor
{
    private readonly ArrayPool&lt;char&gt; _charPool = ArrayPool&lt;char&gt;.Shared;
    private readonly ArrayPool&lt;byte&gt; _bytePool = ArrayPool&lt;byte&gt;.Shared;
    private readonly StringBuilderPool _stringBuilderPool = new();
    
    // Process large text files efficiently
    public async Task&lt;ProcessingResult&gt; ProcessTextFileAsync(string filePath)
    {
        const int bufferSize = 64 * 1024; // 64KB buffer
        
        // Rent buffers from pools instead of allocating
        char[] charBuffer = _charPool.Rent(bufferSize);
        byte[] byteBuffer = _bytePool.Rent(bufferSize);
        StringBuilder result = _stringBuilderPool.Rent();
        
        try
        {
            using var fileStream = new FileStream(filePath, FileMode.Open, FileAccess.Read);
            using var reader = new StreamReader(fileStream, Encoding.UTF8, false, bufferSize);
            
            var stats = new ProcessingStats();
            
            // Process in chunks to avoid large allocations
            while (!reader.EndOfStream)
            {
                int charsRead = await reader.ReadAsync(charBuffer, 0, bufferSize);
                if (charsRead == 0) break;
                
                // Use Span<char> for efficient processing without additional allocations
                var span = charBuffer.AsSpan(0, charsRead);
                ProcessTextSpan(span, result, ref stats);
            }
            
            return new ProcessingResult 
            { 
                ProcessedText = result.ToString(), 
                Statistics = stats 
            };
        }
        finally
        {
            // Always return rented objects to pools
            _charPool.Return(charBuffer);
            _bytePool.Return(byteBuffer);
            _stringBuilderPool.Return(result);
        }
    }
    
    private void ProcessTextSpan(ReadOnlySpan&lt;char&gt; text, StringBuilder output, ref ProcessingStats stats)
    {
        int wordCount = 0;
        int lineCount = 0;
        
        // Efficient span-based processing
        for (int i = 0; i < text.Length; i++)
        {
            char c = text[i];
            
            if (char.IsWhiteSpace(c))
            {
                if (i > 0 && !char.IsWhiteSpace(text[i - 1]))
                {
                    wordCount++;
                }
                
                if (c == '\\n')
                {
                    lineCount++;
                }
            }
            
            // Example transformation: uppercase first letter of words
            if (i == 0 || (i > 0 && char.IsWhiteSpace(text[i - 1])))
            {
                output.Append(char.ToUpper(c));
            }
            else
            {
                output.Append(c);
            }
        }
        
        stats.WordCount += wordCount;
        stats.LineCount += lineCount;
    }
}

public struct ProcessingStats  // Value type for small, frequently passed data
{
    public int WordCount;
    public int LineCount;
    public TimeSpan ProcessingTime;
}

public class ProcessingResult
{
    public string ProcessedText { get; init; }
    public ProcessingStats Statistics { get; init; }
}

// Demonstration of cache-friendly data access patterns
public class CacheFriendlyDemo
{
    public static void DemonstrateAccessPatterns()
    {
        const int size = 1000000;
        
        // Test 1: Cache-friendly sequential access
        int[] data = new int[size];
        var sw = Stopwatch.StartNew();
        
        for (int i = 0; i < size; i++)
        {
            data[i] = i * 2;  // Sequential access - cache friendly
        }
        
        sw.Stop();
        Console.WriteLine($"Sequential access: {sw.ElapsedMilliseconds}ms");
        
        // Test 2: Cache-unfriendly random access
        var random = new Random(42);
        sw.Restart();
        
        for (int i = 0; i < size; i++)
        {
            int randomIndex = random.Next(size);
            data[randomIndex] = i * 2;  // Random access - cache unfriendly
        }
        
        sw.Stop();
        Console.WriteLine($"Random access: {sw.ElapsedMilliseconds}ms");
        
        // Test 3: Structure of Arrays vs Array of Structures
        TestDataAccessPatterns();
    }
    
    private static void TestDataAccessPatterns()
    {
        const int count = 1000000;
        
        // Array of Structures
        var aos = new Point3D[count];
        for (int i = 0; i < count; i++)
        {
            aos[i] = new Point3D { X = i, Y = i, Z = i };
        }
        
        // Structure of Arrays
        var soa = new Points3D(count);
        for (int i = 0; i < count; i++)
        {
            soa.X[i] = i;
            soa.Y[i] = i;
            soa.Z[i] = i;
        }
        
        // Benchmark: Update only X coordinates
        var sw = Stopwatch.StartNew();
        for (int i = 0; i < count; i++)
        {
            aos[i].X *= 2;  // Loads entire Point3D struct
        }
        sw.Stop();
        Console.WriteLine($"AoS X update: {sw.ElapsedMilliseconds}ms");
        
        sw.Restart();
        for (int i = 0; i < count; i++)
        {
            soa.X[i] *= 2;  // Only accesses X array - better cache locality
        }
        sw.Stop();
        Console.WriteLine($"SoA X update: {sw.ElapsedMilliseconds}ms");
    }
}

public struct Point3D
{
    public float X, Y, Z;
}

public class Points3D
{
    public float[] X, Y, Z;
    
    public Points3D(int capacity)
    {
        X = new float[capacity];
        Y = new float[capacity];
        Z = new float[capacity];
    }
}`,
        },
      ],
      exercise: {
        instructions:
          'Build a high-performance text processing system that uses object pooling for StringBuilder and char arrays, implements cache-friendly data access patterns, and avoids Large Object Heap allocations. Include benchmarks comparing pooled vs non-pooled approaches, and demonstrate both Array of Structures and Structure of Arrays patterns with performance measurements.',
      },
    },
    {
      title: 'IDisposable Pattern and using Statements',
      description:
        'Master deterministic resource management, implement the disposable pattern correctly, and understand the relationship between disposal and garbage collection.',
      sections: [
        {
          title: 'Understanding Resource Management in .NET',
          explanation: `
        <p>Resource management in .NET involves two types of resources: managed resources (handled by GC) and unmanaged resources (require manual cleanup). The IDisposable pattern provides deterministic cleanup for both types.</p>
        
        <h4>Why IDisposable Exists</h4>
        <p>While the garbage collector handles memory management, it cannot manage resources that exist outside the .NET runtime:</p>
        <ul>
          <li><strong>File handles:</strong> Open files must be closed to prevent handle exhaustion</li>
          <li><strong>Network connections:</strong> Sockets and HTTP connections consume system resources</li>
          <li><strong>Database connections:</strong> Connection pools have limited capacity</li>
          <li><strong>Graphics resources:</strong> Bitmaps, fonts, and drawing objects use unmanaged memory</li>
          <li><strong>Mutex and semaphores:</strong> Synchronization primitives need explicit release</li>
        </ul>

        <p>The garbage collector is non-deterministic - you can't predict when finalizers will run. For resources that need prompt cleanup, IDisposable provides deterministic disposal.</p>

        <h4>The using Statement: Guaranteed Cleanup</h4>
        <p>The <code>using</code> statement ensures that Dispose() is called even if exceptions occur. It's syntactic sugar for a try-finally block:</p>

        <div class="code-example">
          <pre><code>// These two approaches are equivalent:

// Using statement (preferred)
using (var file = new FileStream("data.txt", FileMode.Open))
{
    // Use the file
    // Dispose() is automatically called at the end of the block
}

// Equivalent try-finally block
FileStream file = null;
try
{
    file = new FileStream("data.txt", FileMode.Open);
    // Use the file
}
finally
{
    file?.Dispose();  // Always called, even if exception occurs
}

// C# 8.0+ using declaration (scoped to method)
using var file = new FileStream("data.txt", FileMode.Open);
// Dispose() called at end of method
</code></pre>
        </div>

        <h4>The Full Dispose Pattern</h4>
        <p>For classes that own unmanaged resources directly (rare) or need finalizers, implement the full dispose pattern:</p>

        <div class="code-example">
          <pre><code>public class UnmanagedResourceHolder : IDisposable
{
    private IntPtr _unmanagedResource;
    private FileStream _managedResource;
    private bool _disposed = false;
    
    public UnmanagedResourceHolder(string filename)
    {
        _unmanagedResource = AllocateUnmanagedMemory();
        _managedResource = new FileStream(filename, FileMode.Create);
    }
    
    // Public dispose method
    public void Dispose()
    {
        Dispose(disposing: true);
        GC.SuppressFinalize(this);  // Don't call finalizer
    }
    
    // Protected virtual dispose method
    protected virtual void Dispose(bool disposing)
    {
        if (!_disposed)
        {
            if (disposing)
            {
                // Dispose managed resources
                _managedResource?.Dispose();
            }
            
            // Dispose unmanaged resources
            if (_unmanagedResource != IntPtr.Zero)
            {
                FreeUnmanagedMemory(_unmanagedResource);
                _unmanagedResource = IntPtr.Zero;
            }
            
            _disposed = true;
        }
    }
    
    // Finalizer (only if you have unmanaged resources)
    ~UnmanagedResourceHolder()
    {
        Dispose(disposing: false);
    }
    
    // Helper method to ensure object hasn't been disposed
    private void ThrowIfDisposed()
    {
        if (_disposed)
            throw new ObjectDisposedException(nameof(UnmanagedResourceHolder));
    }
    
    public void DoSomething()
    {
        ThrowIfDisposed();
        // Use resources...
    }
}
</code></pre>
        </div>

        <h4>Common IDisposable Implementation Patterns</h4>
        <p>Most classes only need a simple implementation:</p>

        <div class="code-example">
          <pre><code>// Simple pattern for classes that only hold managed resources
public class DatabaseManager : IDisposable
{
    private SqlConnection _connection;
    private bool _disposed;
    
    public DatabaseManager(string connectionString)
    {
        _connection = new SqlConnection(connectionString);
        _connection.Open();
    }
    
    public void Dispose()
    {
        if (!_disposed)
        {
            _connection?.Close();
            _connection?.Dispose();
            _disposed = true;
        }
    }
    
    public void ExecuteQuery(string sql)
    {
        if (_disposed)
            throw new ObjectDisposedException(nameof(DatabaseManager));
            
        using var command = new SqlCommand(sql, _connection);
        command.ExecuteNonQuery();
    }
}

// Implementing IAsyncDisposable for async cleanup (C# 8.0+)
public class AsyncResourceManager : IAsyncDisposable
{
    private HttpClient _httpClient = new HttpClient();
    
    public async ValueTask DisposeAsync()
    {
        if (_httpClient != null)
        {
            // Perform async cleanup
            await _httpClient.GetAsync("http://api.example.com/logout");
            _httpClient.Dispose();
            _httpClient = null;
        }
    }
}
</code></pre>
        </div>

        <h4>Common Pitfalls and Best Practices</h4>
        <p><strong>Memory leaks through event handlers:</strong> Objects can be kept alive by event subscriptions. Always unsubscribe in Dispose:</p>

        <div class="code-example">
          <pre><code>public class EventSubscriber : IDisposable
{
    private readonly SomeEventSource _eventSource;
    
    public EventSubscriber(SomeEventSource eventSource)
    {
        _eventSource = eventSource;
        _eventSource.SomeEvent += HandleEvent;  // Creates reference
    }
    
    public void Dispose()
    {
        _eventSource.SomeEvent -= HandleEvent;  // Remove reference
    }
    
    private void HandleEvent(object sender, EventArgs e) { }
}
</code></pre>
        </div>

        <p><strong>Disposal safety:</strong> Make classes safe to use even after disposal by throwing ObjectDisposedException.</p>

        <p><strong>Idempotent disposal:</strong> Ensure calling Dispose() multiple times is safe.</p>

        <p><strong>Consider finalizer necessity:</strong> Only add finalizers if you directly hold unmanaged resources (rare).</p>

        <div class="interview-tip">
          <p><span class="interview-icon">🎯</span> <strong>Interview Focus:</strong> Demonstrate deep understanding of resource management and disposal patterns.</p>
          <p>Key interview questions include:</p>
          <ul>
            <li>"When would you implement IDisposable vs just relying on garbage collection?"</li>
            <li>"Explain the difference between Dispose() and finalizers"</li>
            <li>"What is the purpose of GC.SuppressFinalize()?"</li>
            <li>"How can event handlers cause memory leaks and how do you prevent them?"</li>
            <li>"What's the difference between IDisposable and IAsyncDisposable?"</li>
            <li>"Why is the disposing parameter important in the dispose pattern?"</li>
          </ul>
        </div>
      `,
          codeExample: `// Comprehensive resource management example

// A class that manages multiple types of resources
public class ResourceManagerExample : IDisposable, IAsyncDisposable
{
    private readonly FileStream _logFile;
    private readonly Timer _timer;
    private readonly HttpClient _httpClient;
    private readonly List<IDisposable> _childResources;
    private bool _disposed;
    
    public ResourceManagerExample(string logPath)
    {
        _logFile = new FileStream(logPath, FileMode.Append);
        _timer = new Timer(OnTimer, null, TimeSpan.Zero, TimeSpan.FromMinutes(1));
        _httpClient = new HttpClient();
        _childResources = new List<IDisposable>();
        
        // Subscribe to events
        AppDomain.CurrentDomain.ProcessExit += OnProcessExit;
    }
    
    public IDisposable CreateChildResource(string name)
    {
        ThrowIfDisposed();
        
        var child = new ChildResource(name, _logFile);
        _childResources.Add(child);
        return child;
    }
    
    public async Task<string> FetchDataAsync(string url)
    {
        ThrowIfDisposed();
        
        try
        {
            var response = await _httpClient.GetStringAsync(url);
            await LogAsync($"Fetched data from {url}");
            return response;
        }
        catch (Exception ex)
        {
            await LogAsync($"Error fetching {url}: {ex.Message}");
            throw;
        }
    }
    
    private async Task LogAsync(string message)
    {
        if (_disposed) return;
        
        var logEntry = $"[{DateTime.Now:yyyy-MM-dd HH:mm:ss}] {message}\\n";
        var bytes = Encoding.UTF8.GetBytes(logEntry);
        
        await _logFile.WriteAsync(bytes, 0, bytes.Length);
        await _logFile.FlushAsync();
    }
    
    private void OnTimer(object state)
    {
        if (!_disposed)
        {
            _ = LogAsync("Timer tick - system still alive");
        }
    }
    
    private void OnProcessExit(object sender, EventArgs e)
    {
        // Cleanup when process exits
        Dispose();
    }
    
    private void ThrowIfDisposed()
    {
        if (_disposed)
            throw new ObjectDisposedException(nameof(ResourceManagerExample));
    }
    
    // Synchronous disposal
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
                // Dispose managed resources
                
                // Unsubscribe from events to prevent memory leaks
                AppDomain.CurrentDomain.ProcessExit -= OnProcessExit;
                
                // Dispose child resources first
                foreach (var child in _childResources)
                {
                    try
                    {
                        child?.Dispose();
                    }
                    catch (Exception ex)
                    {
                        // Log but don't throw in Dispose
                        Debug.WriteLine($"Error disposing child resource: {ex.Message}");
                    }
                }
                _childResources.Clear();
                
                // Dispose own resources
                _timer?.Dispose();
                _httpClient?.Dispose();
                _logFile?.Dispose();
            }
            
            _disposed = true;
        }
    }
    
    // Asynchronous disposal (C# 8.0+)
    public async ValueTask DisposeAsync()
    {
        if (!_disposed)
        {
            // Perform async cleanup first
            try
            {
                await LogAsync("Starting async disposal");
                
                // Send final HTTP request
                if (_httpClient != null)
                {
                    await _httpClient.PostAsync("https://api.example.com/logout", null);
                }
                
                await LogAsync("Async disposal completed");
            }
            catch (Exception ex)
            {
                Debug.WriteLine($"Error during async disposal: {ex.Message}");
            }
            
            // Then perform synchronous cleanup
            Dispose();
        }
    }
}

// Example child resource
public class ChildResource : IDisposable
{
    private readonly string _name;
    private readonly FileStream _sharedLogFile;
    private bool _disposed;
    
    public ChildResource(string name, FileStream sharedLogFile)
    {
        _name = name;
        _sharedLogFile = sharedLogFile;  // Shared resource - don't dispose
    }
    
    public void DoWork()
    {
        if (_disposed)
            throw new ObjectDisposedException(nameof(ChildResource));
            
        // Do work...
        var message = $"[{_name}] Doing work\\n";
        var bytes = Encoding.UTF8.GetBytes(message);
        _sharedLogFile.Write(bytes, 0, bytes.Length);
    }
    
    public void Dispose()
    {
        if (!_disposed)
        {
            // Clean up only resources this class owns
            // Don't dispose shared resources like _sharedLogFile
            
            _disposed = true;
        }
    }
}

// Usage example with proper resource management
public static class ResourceManagementDemo
{
    public static async Task DemonstrateProperUsageAsync()
    {
        // Method 1: using statement
        using (var manager = new ResourceManagerExample("app.log"))
        {
            using var child1 = manager.CreateChildResource("Worker1");
            using var child2 = manager.CreateChildResource("Worker2");
            
            var data = await manager.FetchDataAsync("https://api.example.com/data");
            // All resources automatically disposed at end of block
        }
        
        // Method 2: using declaration (C# 8.0+)
        using var manager2 = new ResourceManagerExample("app2.log");
        var data2 = await manager2.FetchDataAsync("https://api.example.com/data");
        // Disposed at end of method
        
        // Method 3: async disposal
        await using var asyncManager = new ResourceManagerExample("app3.log");
        var data3 = await asyncManager.FetchDataAsync("https://api.example.com/data");
        // DisposeAsync() called automatically
    }
}`,
        },
      ],
      exercise: {
        instructions:
          'Build a comprehensive resource management system that handles file I/O, network connections, and timers. Implement both IDisposable and IAsyncDisposable patterns. Include proper event unsubscription, child resource management, and exception handling in disposal methods. Create a demo that shows proper usage with using statements and measures resource cleanup timing.',
      },
    },
    {
      title: 'Span<T>, Memory<T>, and Unsafe Code',
      description:
        'Memory manipulation techniques for maximum performance, including safe span-based operations and unsafe pointer manipulation.',
      sections: [
        {
          title: 'Modern Safe High-Performance Types: Span<T> and Memory<T>',
          explanation: `
        <p>Span&lt;T&gt; and Memory&lt;T&gt; represent a major evolution in .NET's approach to high-performance programming. They provide safe, zero-allocation ways to work with slices of memory, eliminating the need for many traditional allocation-heavy operations.</p>
        
        <h4>Understanding Span&lt;T&gt;: Stack-Only Performance</h4>
        <p>Span&lt;T&gt; is a ref struct that provides a type-safe view over a contiguous region of memory. Key characteristics:</p>
        <ul>
          <li><strong>Zero allocation:</strong> No heap allocations when slicing arrays or strings</li>
          <li><strong>Stack-only:</strong> Cannot be stored in fields, used in async methods, or stored as array elements</li>
          <li><strong>Memory safe:</strong> Bounds checking prevents buffer overflows</li>
          <li><strong>Universal:</strong> Can view arrays, strings, stack memory, or unmanaged memory</li>
        </ul>

        <p>Common use cases for Span&lt;T&gt;:</p>
        <ul>
          <li>String parsing without substring allocations</li>
          <li>Array slicing without copying data</li>
          <li>High-performance text processing</li>
          <li>Binary data manipulation</li>
        </ul>

        <div class="code-example">
          <pre><code>// Traditional approach - lots of allocations
string text = "The quick brown fox jumps over the lazy dog";
string[] words = text.Split(' ');  // Allocates array + strings
foreach (string word in words)     // Each iteration uses heap strings
{
    if (word.StartsWith("q"))      // More string operations
        Console.WriteLine(word.ToUpper());  // More allocations
}

// Span-based approach - zero allocations
ReadOnlySpan&lt;char&gt; text = "The quick brown fox jumps over the lazy dog";
SpanSplitEnumerator enumerator = text.Split(' ');
while (enumerator.MoveNext())
{
    ReadOnlySpan&lt;char&gt; word = enumerator.Current;  // No allocation
    if (word.StartsWith("q"))
    {
        // Process without creating strings
        for (int i = 0; i < word.Length; i++)
            Console.Write(char.ToUpper(word[i]));
        Console.WriteLine();
    }
}
</code></pre>
        </div>

        <h4>Memory&lt;T&gt;: Async-Compatible Memory Views</h4>
        <p>Memory&lt;T&gt; provides similar functionality to Span&lt;T&gt; but can be stored on the heap, making it compatible with async operations:</p>

        <div class="code-example">
          <pre><code>// Async-compatible memory operations
public async Task ProcessDataAsync(Memory&lt;byte&gt; buffer)
{
    // Memory&lt;T&gt; can be used in async methods
    await SomeAsyncOperation(buffer.Slice(0, 1024));
    
    // Convert to span when doing synchronous processing
    Span&lt;byte&gt; span = buffer.Span;
    ProcessSynchronously(span);
}

// High-performance file processing
public async Task ProcessLargeFileAsync(string filePath)
{
    using var file = File.OpenRead(filePath);
    var buffer = new byte[64 * 1024];  // 64KB buffer
    Memory&lt;byte&gt; memory = buffer;
    
    int bytesRead;
    while ((bytesRead = await file.ReadAsync(memory)) > 0)
    {
        // Process the slice that contains actual data
        ProcessChunk(memory.Slice(0, bytesRead).Span);
    }
}
</code></pre>
        </div>

        <h4>Advanced Span Operations and Performance Patterns</h4>
        <p>Span&lt;T&gt; provides many high-performance operations that eliminate common allocation patterns:</p>

        <div class="code-example">
          <pre><code>// High-performance string parsing
public static bool TryParseIPAddress(ReadOnlySpan&lt;char&gt; input, out (byte a, byte b, byte c, byte d) result)
{
    result = default;
    
    int dotCount = 0;
    int segmentStart = 0;
    var segments = new byte[4];
    
    for (int i = 0; i <= input.Length; i++)
    {
        if (i == input.Length || input[i] == '.')
        {
            if (dotCount >= 4) return false;
            
            var segment = input.Slice(segmentStart, i - segmentStart);
            if (!byte.TryParse(segment, out segments[dotCount]))
                return false;
                
            dotCount++;
            segmentStart = i + 1;
        }
    }
    
    if (dotCount == 4)
    {
        result = (segments[0], segments[1], segments[2], segments[3]);
        return true;
    }
    
    return false;
}

// Binary data manipulation
public static void ReverseBytes(Span&lt;byte&gt; data)
{
    for (int i = 0; i < data.Length / 2; i++)
    {
        (data[i], data[data.Length - 1 - i]) = (data[data.Length - 1 - i], data[i]);
    }
}
</code></pre>
        </div>

        <h4>When to Use Unsafe Code: Beyond Managed Boundaries</h4>
        <p>While Span&lt;T&gt; handles most high-performance scenarios safely, sometimes you need to go beyond managed code boundaries. Unsafe code is necessary for:</p>
        <ul>
          <li>Interoperating with native libraries</li>
          <li>Implementing low-level algorithms (cryptography, compression)</li>
          <li>Working with memory-mapped files or hardware interfaces</li>
          <li>Extreme performance optimizations where every cycle counts</li>
        </ul>

        <div class="code-example">
          <pre><code>// Unsafe code for maximum performance
public static unsafe void FastMemoryCopy(byte* source, byte* destination, int length)
{
    // Copy 8 bytes at a time for better performance
    long* srcLong = (long*)source;
    long* dstLong = (long*)destination;
    int longCount = length / 8;
    
    for (int i = 0; i < longCount; i++)
    {
        dstLong[i] = srcLong[i];
    }
    
    // Handle remaining bytes
    int remaining = length % 8;
    if (remaining > 0)
    {
        byte* srcByte = source + (longCount * 8);
        byte* dstByte = destination + (longCount * 8);
        
        for (int i = 0; i < remaining; i++)
        {
            dstByte[i] = srcByte[i];
        }
    }
}

// Stack allocation for temporary buffers
public static unsafe int ProcessData(ReadOnlySpan&lt;int&gt; input)
{
    const int maxStackAlloc = 1024;
    
    // Use stack allocation for small buffers
    int* buffer = input.Length <= maxStackAlloc 
        ? stackalloc int[input.Length]
        : null;
        
    if (buffer != null)
    {
        // Fast stack-based processing
        for (int i = 0; i < input.Length; i++)
        {
            buffer[i] = input[i] * 2;
        }
        
        int sum = 0;
        for (int i = 0; i < input.Length; i++)
        {
            sum += buffer[i];
        }
        return sum;
    }
    else
    {
        // Fall back to heap allocation for large inputs
        var heapBuffer = new int[input.Length];
        input.CopyTo(heapBuffer);
        
        for (int i = 0; i < heapBuffer.Length; i++)
        {
            heapBuffer[i] *= 2;
        }
        
        return heapBuffer.Sum();
    }
}
</code></pre>
        </div>

        <h4>Safety Considerations and Best Practices</h4>
        <p><strong>Span&lt;T&gt; safety:</strong> While much safer than pointers, be aware of lifetime restrictions and stack-only nature.</p>

        <p><strong>Unsafe code safety:</strong> Always validate inputs, check bounds manually, and consider using SafeHandle for unmanaged resources.</p>

        <p><strong>Performance vs maintainability:</strong> Use these advanced techniques only when profiling shows they're necessary.</p>

        <div class="interview-tip">
          <p><span class="interview-icon">🎯</span> <strong>Interview Focus:</strong> Demonstrate understanding of when and how to use advanced memory access techniques safely.</p>
          <p>Key interview questions include:</p>
          <ul>
            <li>"When would you choose Span&lt;T&gt; over Memory&lt;T&gt; and vice versa?"</li>
            <li>"Why can't Span&lt;T&gt; be used in async methods?"</li>
            <li>"What are the safety trade-offs when using unsafe code?"</li>
            <li>"How do Span&lt;T&gt; operations avoid allocations?"</li>
            <li>"When would you use stackalloc instead of heap allocation?"</li>
            <li>"How do you ensure bounds safety in unsafe code?"</li>
          </ul>
        </div>
      `,
          codeExample: `// Comprehensive high-performance memory access example

public static class HighPerformanceTextProcessor
{
    // Safe, high-performance string processing with Span<T>
    public static int CountWordsWithSpan(ReadOnlySpan&lt;char&gt; text)
    {
        int wordCount = 0;
        bool inWord = false;
        
        foreach (char c in text)
        {
            if (char.IsWhiteSpace(c))
            {
                inWord = false;
            }
            else if (!inWord)
            {
                wordCount++;
                inWord = true;
            }
        }
        
        return wordCount;
    }
    
    // Memory<T> for async operations
    public static async Task&lt;string&gt; ProcessFileAsync(string filePath)
    {
        using var file = File.OpenRead(filePath);
        var buffer = new byte[4096];
        Memory&lt;byte&gt; memory = buffer;
        var result = new StringBuilder();
        
        int bytesRead;
        while ((bytesRead = await file.ReadAsync(memory)) > 0)
        {
            // Convert bytes to chars and process
            var chars = Encoding.UTF8.GetChars(memory.Slice(0, bytesRead).Span);
            ProcessTextSpan(chars, result);
        }
        
        return result.ToString();
    }
    
    private static void ProcessTextSpan(ReadOnlySpan&lt;char&gt; text, StringBuilder output)
    {
        // Process text without allocations
        for (int i = 0; i < text.Length; i++)
        {
            char c = text[i];
            if (char.IsLetter(c))
            {
                output.Append(char.ToUpper(c));
            }
            else
            {
                output.Append(c);
            }
        }
    }
    
    // Unsafe code for extreme performance scenarios
    public static unsafe void XorEncryptDecrypt(byte* data, int length, byte key)
    {
        // Process 8 bytes at a time using long operations
        long keyLong = 0;
        for (int i = 0; i < 8; i++)
        {
            keyLong |= ((long)key) << (i * 8);
        }
        
        long* dataLong = (long*)data;
        int longCount = length / 8;
        
        for (int i = 0; i < longCount; i++)
        {
            dataLong[i] ^= keyLong;
        }
        
        // Handle remaining bytes
        int remaining = length % 8;
        byte* remainingBytes = data + (longCount * 8);
        for (int i = 0; i < remaining; i++)
        {
            remainingBytes[i] ^= key;
        }
    }
    
    // Demonstrate stackalloc for temporary buffers
    public static unsafe bool IsValidUtf8(ReadOnlySpan&lt;byte&gt; data)
    {
        const int bufferSize = 256;
        
        // Use stack allocation for small temporary buffer
        byte* buffer = stackalloc byte[bufferSize];
        Span&lt;byte&gt; stackBuffer = new Span&lt;byte&gt;(buffer, bufferSize);
        
        try
        {
            // Attempt to decode as UTF-8
            var decoder = Encoding.UTF8.GetDecoder();
            int charCount = decoder.GetCharCount(data, flush: true);
            
            // If we need more space than our stack buffer, fall back to heap
            if (charCount > bufferSize / 2)  // 2 bytes per char worst case
            {
                var heapBuffer = new char[charCount];
                decoder.GetChars(data, heapBuffer, flush: true);
            }
            else
            {
                // Use our stack buffer for small strings
                char* charBuffer = (char*)buffer;
                var charSpan = new Span&lt;char&gt;(charBuffer, bufferSize / 2);
                decoder.GetChars(data, charSpan.Slice(0, charCount), flush: true);
            }
            
            return true;
        }
        catch (DecoderFallbackException)
        {
            return false;
        }
    }
}

// Performance comparison demonstration
public static class PerformanceComparison
{
    public static void CompareStringOperations()
    {
        string text = "The quick brown fox jumps over the lazy dog " * 1000;  // Large text
        var sw = Stopwatch.StartNew();
        
        // Traditional approach with allocations
        sw.Restart();
        int wordCount1 = 0;
        string[] words = text.Split(' ');
        foreach (string word in words)
        {
            if (!string.IsNullOrEmpty(word))
                wordCount1++;
        }
        sw.Stop();
        Console.WriteLine($"Traditional approach: {sw.ElapsedMilliseconds}ms, Words: {wordCount1}");
        
        // Span-based approach without allocations
        sw.Restart();
        int wordCount2 = HighPerformanceTextProcessor.CountWordsWithSpan(text);
        sw.Stop();
        Console.WriteLine($"Span-based approach: {sw.ElapsedMilliseconds}ms, Words: {wordCount2}");
    }
    
    public static unsafe void CompareMemoryCopy()
    {
        const int dataSize = 1000000;
        byte[] source = new byte[dataSize];
        byte[] dest1 = new byte[dataSize];
        byte[] dest2 = new byte[dataSize];
        
        new Random().NextBytes(source);
        
        var sw = Stopwatch.StartNew();
        
        // Standard Array.Copy
        sw.Restart();
        Array.Copy(source, dest1, dataSize);
        sw.Stop();
        Console.WriteLine($"Array.Copy: {sw.ElapsedMilliseconds}ms");
        
        // Unsafe pointer-based copy
        sw.Restart();
        fixed (byte* srcPtr = source, dstPtr = dest2)
        {
            HighPerformanceTextProcessor.XorEncryptDecrypt(srcPtr, dataSize, 0);  // XOR with 0 = copy
        }
        sw.Stop();
        Console.WriteLine($"Unsafe copy: {sw.ElapsedMilliseconds}ms");
    }
}`,
        },
      ],
      exercise: {
        instructions:
          'Build a high-performance text analyzer that uses Span<char> for parsing, Memory<byte> for async file I/O, and unsafe code for a custom fast hash function. Include benchmarks comparing span-based operations vs traditional string operations, and implement a safe wrapper around unsafe pointer operations. The analyzer should count words, find palindromes, and compute a custom hash of the text content.',
      },
    },
    {
      title: 'Optimization Strategies and Measurement',
      description:
        'Master systematic approaches to performance optimization, including best practices, profiling techniques, and reliable benchmarking methodologies.',
      sections: [
        {
          title: 'Performance Optimization Principles and Techniques',
          explanation: `
        <p>High-performance C# development requires a systematic approach combining understanding of the runtime, careful measurement, and targeted optimizations. Performance work should always be guided by data, not assumptions.</p>
        
        <h4>The Performance Optimization Methodology</h4>
        <p>Effective performance optimization follows a disciplined process:</p>
        <ol>
          <li><strong>Measure first:</strong> Establish baseline performance with realistic data and workloads</li>
          <li><strong>Profile to identify bottlenecks:</strong> Find the actual performance constraints</li>
          <li><strong>Optimize strategically:</strong> Focus on the highest-impact changes first</li>
          <li><strong>Measure again:</strong> Validate that optimizations actually improved performance</li>
          <li><strong>Repeat:</strong> Continue the cycle until performance goals are met</li>
        </ol>

        <h4>Core Performance Principles</h4>
        <p><strong>Minimize allocations:</strong> Every allocation has costs - creation time, GC pressure, and cache pollution. Reduce allocations in hot paths through object pooling, value types, and span-based operations.</p>

        <p><strong>Optimize data structures and algorithms:</strong> Choose the right algorithm and data structure. An O(n²) algorithm will always lose to O(n log n) at scale, regardless of micro-optimizations.</p>

        <p><strong>Improve cache locality:</strong> Modern CPUs are limited by memory bandwidth. Sequential access patterns, smaller data structures, and better layout can provide dramatic improvements.</p>

        <p><strong>Reduce virtual dispatch overhead:</strong> Virtual method calls prevent inlining and add indirection. Use sealed classes, avoid interfaces in hot paths, and consider struct implementations.</p>

        <div class="code-example">
          <pre><code>// Performance-optimized data structures
public readonly struct Point2D  // Value type avoids heap allocation
{
    public readonly float X, Y;  // Readonly prevents defensive copying
    
    public Point2D(float x, float y) => (X, Y) = (x, y);
    
    // Operators avoid method call overhead
    public static Point2D operator +(Point2D a, Point2D b) 
        => new Point2D(a.X + b.X, a.Y + b.Y);
}

// Avoiding virtual calls in performance-critical code
public sealed class FastProcessor  // Sealed enables devirtualization
{
    private readonly int[] _data;
    
    public FastProcessor(int[] data) => _data = data;
    
    // Hot path optimized for arrays (better than IEnumerable)
    public long Sum()
    {
        long sum = 0;
        for (int i = 0; i < _data.Length; i++)  // for loop faster than foreach for arrays
        {
            sum += _data[i];
        }
        return sum;
    }
    
    // Using aggressive inlining for hot methods
    [MethodImpl(MethodImplOptions.AggressiveInlining)]
    public bool IsValidIndex(int index) => (uint)index < (uint)_data.Length;
}
</code></pre>
        </div>

        <h4>Advanced Optimization Techniques</h4>
        <p><strong>Loop optimizations:</strong> Reduce bounds checking, hoist invariant computations, and vectorize when possible.</p>

        <p><strong>Branch prediction optimization:</strong> Arrange code so common paths are more predictable. Use profile-guided optimization hints.</p>

        <p><strong>SIMD operations:</strong> Use System.Numerics.Vector&lt;T&gt; for data-parallel operations on arrays.</p>

        <div class="code-example">
          <pre><code>// SIMD optimization example
public static void AddArraysSimd(float[] a, float[] b, float[] result)
{
    int vectorSize = Vector&lt;float&gt;.Count;
    int vectorizedLength = a.Length - (a.Length % vectorSize);
    
    // Process vectors
    for (int i = 0; i < vectorizedLength; i += vectorSize)
    {
        var vectorA = new Vector&lt;float&gt;(a, i);
        var vectorB = new Vector&lt;float&gt;(b, i);
        (vectorA + vectorB).CopyTo(result, i);
    }
    
    // Handle remaining elements
    for (int i = vectorizedLength; i < a.Length; i++)
    {
        result[i] = a[i] + b[i];
    }
}
</code></pre>
        </div>

        <h4>Measurement and Benchmarking Best Practices</h4>
        <p>Accurate performance measurement is crucial for effective optimization:</p>

        <p><strong>Use proper benchmarking tools:</strong> BenchmarkDotNet provides statistical analysis, warmup, and eliminates many measurement pitfalls.</p>

        <p><strong>Understand measurement overhead:</strong> Simple Stopwatch measurements can be misleading for micro-benchmarks.</p>

        <p><strong>Control for external factors:</strong> CPU throttling, background processes, and GC can skew results.</p>

        <div class="code-example">
          <pre><code>// Professional benchmarking with BenchmarkDotNet
[MemoryDiagnoser]
[SimpleJob(RuntimeMoniker.Net60)]
[SimpleJob(RuntimeMoniker.Net70)]
public class StringProcessingBenchmarks
{
    private string[] _testData;
    
    [GlobalSetup]
    public void Setup()
    {
        _testData = Enumerable.Range(0, 1000)
            .Select(i => $"Test string {i} with some content")
            .ToArray();
    }
    
    [Benchmark(Baseline = true)]
    public string StringConcatenation()
    {
        string result = "";
        foreach (var item in _testData)
        {
            result += item + " ";
        }
        return result;
    }
    
    [Benchmark]
    public string StringBuilderApproach()
    {
        var sb = new StringBuilder();
        foreach (var item in _testData)
        {
            sb.Append(item).Append(' ');
        }
        return sb.ToString();
    }
    
    [Benchmark]
    public string StringJoin()
    {
        return string.Join(" ", _testData);
    }
    
    [Benchmark]
    public string SpanBasedApproach()
    {
        // Calculate total length first
        int totalLength = _testData.Sum(s => s.Length) + _testData.Length;
        
        // Use string.Create for zero-copy construction
        return string.Create(totalLength, _testData, (span, data) =>
        {
            int position = 0;
            foreach (var item in data)
            {
                item.AsSpan().CopyTo(span.Slice(position));
                position += item.Length;
                span[position++] = ' ';
            }
        });
    }
}
</code></pre>
        </div>

        <h4>Profiling and Performance Analysis</h4>
        <p>Different profiling tools serve different purposes:</p>

        <p><strong>CPU profilers:</strong> Identify hot paths and method-level bottlenecks (Visual Studio Diagnostic Tools, JetBrains dotTrace)</p>

        <p><strong>Memory profilers:</strong> Find allocation sources and memory leaks (JetBrains dotMemory, ANTS Memory Profiler)</p>

        <p><strong>ETW/PerfView:</strong> System-level analysis including GC behavior and kernel interactions</p>

        <p><strong>Application Insights:</strong> Production performance monitoring and telemetry</p>

        <div class="interview-tip">
          <p><span class="interview-icon">🎯</span> <strong>Interview Focus:</strong> Demonstrate systematic approach to performance optimization and measurement.</p>
          <p>Critical interview topics include:</p>
          <ul>
            <li>"Walk me through your process for optimizing a slow application"</li>
            <li>"How do you identify performance bottlenecks in production?"</li>
            <li>"What are common performance anti-patterns in C# and how do you fix them?"</li>
            <li>"How do you ensure performance optimizations are actually beneficial?"</li>
            <li>"When would you choose performance over code readability?"</li>
            <li>"How do you benchmark micro-operations reliably?"</li>
            <li>"What's the difference between latency and throughput optimization?"</li>
          </ul>
        </div>
      `,
          codeExample: `// Comprehensive performance optimization and measurement example

public class PerformanceOptimizationDemo
{
    // Demonstrate systematic optimization of a real-world scenario
    public static void DemonstrateOptimizationProcess()
    {
        const int dataSize = 1000000;
        var random = new Random(42);
        var data = Enumerable.Range(0, dataSize)
            .Select(_ => random.Next(1, 1000))
            .ToArray();
        
        Console.WriteLine("=== Performance Optimization Demo ===\\n");
        
        // Baseline: Naive approach
        MeasurePerformance("Naive approach", () => NaiveSum(data));
        
        // Optimization 1: Better algorithm
        MeasurePerformance("Optimized algorithm", () => OptimizedSum(data));
        
        // Optimization 2: SIMD operations
        MeasurePerformance("SIMD approach", () => SimdSum(data));
        
        // Optimization 3: Unsafe approach
        MeasurePerformance("Unsafe approach", () => UnsafeSum(data));
        
        Console.WriteLine("\\n=== Memory Allocation Analysis ===");
        AnalyzeMemoryAllocations();
    }
    
    // Baseline implementation
    private static long NaiveSum(int[] data)
    {
        return data.Where(x => x % 2 == 0).Sum(x => (long)x);
    }
    
    // Optimized: Avoid LINQ overhead
    private static long OptimizedSum(int[] data)
    {
        long sum = 0;
        for (int i = 0; i < data.Length; i++)
        {
            if (data[i] % 2 == 0)
                sum += data[i];
        }
        return sum;
    }
    
    // SIMD optimization for large datasets
    private static long SimdSum(int[] data)
    {
        long sum = 0;
        int vectorSize = Vector&lt;int&gt;.Count;
        int vectorizedLength = data.Length - (data.Length % vectorSize);
        
        // Process vectors
        for (int i = 0; i < vectorizedLength; i += vectorSize)
        {
            var vector = new Vector&lt;int&gt;(data, i);
            var evenMask = Vector.Equals(vector & Vector&lt;int&gt;.One, Vector&lt;int&gt;.Zero);
            var filteredVector = Vector.ConditionalSelect(evenMask, vector, Vector&lt;int&gt;.Zero);
            
            for (int j = 0; j < vectorSize; j++)
            {
                sum += filteredVector[j];
            }
        }
        
        // Handle remaining elements
        for (int i = vectorizedLength; i < data.Length; i++)
        {
            if (data[i] % 2 == 0)
                sum += data[i];
        }
        
        return sum;
    }
    
    // Unsafe optimization for maximum performance
    private static unsafe long UnsafeSum(int[] data)
    {
        long sum = 0;
        fixed (int* ptr = data)
        {
            int* current = ptr;
            int* end = ptr + data.Length;
            
            while (current < end)
            {
                if ((*current & 1) == 0)  // Even check using bitwise operation
                    sum += *current;
                current++;
            }
        }
        return sum;
    }
    
    private static void MeasurePerformance(string name, Func&lt;long&gt; operation)
    {
        // Warmup
        for (int i = 0; i < 5; i++)
            operation();
        
        // Measure
        var sw = Stopwatch.StartNew();
        long result = operation();
        sw.Stop();
        
        Console.WriteLine($"{name,-20}: {sw.ElapsedMilliseconds,4}ms (Result: {result})");
    }
    
    private static void AnalyzeMemoryAllocations()
    {
        long initialMemory = GC.GetTotalMemory(true);
        
        // Test allocation-heavy operation
        var strings = new List&lt;string&gt;();
        for (int i = 0; i < 10000; i++)
        {
            strings.Add($"String {i} with content");
        }
        
        long afterAllocations = GC.GetTotalMemory(false);
        Console.WriteLine($"Memory allocated: {afterAllocations - initialMemory:N0} bytes");
        Console.WriteLine($"Gen 0 collections: {GC.CollectionCount(0)}");
        Console.WriteLine($"Gen 1 collections: {GC.CollectionCount(1)}");
        Console.WriteLine($"Gen 2 collections: {GC.CollectionCount(2)}");
    }
}

// Professional benchmarking example
[MemoryDiagnoser]
[HardwareCounters(HardwareCounter.CacheMisses, HardwareCounter.BranchMispredictions)]
public class CollectionBenchmarks
{
    private int[] _data;
    private List&lt;int&gt; _list;
    
    [Params(1000, 10000, 100000)]
    public int Size { get; set; }
    
    [GlobalSetup]
    public void Setup()
    {
        _data = Enumerable.Range(0, Size).ToArray();
        _list = new List&lt;int&gt;(_data);
    }
    
    [Benchmark(Baseline = true)]
    public long SumArray()
    {
        long sum = 0;
        for (int i = 0; i < _data.Length; i++)
            sum += _data[i];
        return sum;
    }
    
    [Benchmark]
    public long SumList()
    {
        long sum = 0;
        for (int i = 0; i < _list.Count; i++)
            sum += _list[i];
        return sum;
    }
    
    [Benchmark]
    public long SumArrayLinq() => _data.Sum(x => (long)x);
    
    [Benchmark]
    public long SumListLinq() => _list.Sum(x => (long)x);
    
    [Benchmark]
    public long SumArrayForeach()
    {
        long sum = 0;
        foreach (int value in _data)
            sum += value;
        return sum;
    }
    
    [Benchmark]
    public long SumListForeach()
    {
        long sum = 0;
        foreach (int value in _list)
            sum += value;
        return sum;
    }
}`,
        },
      ],
      exercise: {
        instructions:
          'Create a comprehensive performance analysis system that demonstrates optimization techniques across multiple dimensions. Implement baseline and optimized versions of common operations (string processing, collection manipulation, mathematical calculations). Use BenchmarkDotNet to measure performance differences, include memory allocation analysis, and demonstrate SIMD optimizations where applicable. Create both micro-benchmarks and realistic workload tests.',
      },
    },
  ],
  prepperSummary: `
    <div class="prepper-summary">
      <h3>🔑 Key Interview Takeaways</h3>
      <ul>
        <li><strong>Value vs Reference Types:</strong> Know memory allocation, copying, and performance implications.</li>
        <li><strong>Garbage Collection:</strong> Understand GC generations, triggers, and best practices.</li>
        <li><strong>Memory Optimization:</strong> Reduce allocations, use pools, and improve data locality.</li>
        <li><strong>IDisposable:</strong> Properly manage unmanaged resources and use using blocks.</li>
        <li><strong>Span<T> & Memory<T>:</strong> Use for high-performance, low-allocation memory access.</li>
        <li><strong>Unsafe Code:</strong> Know when and how to use pointers safely.</li>
        <li><strong>Performance Best Practices:</strong> Minimize allocations, avoid virtual calls, and profile before optimizing.</li>
        <li><strong>Benchmarking:</strong> Measure and analyze performance with the right tools.</li>
      </ul>
      <h4>📝 Common Interview Questions</h4>
      <ol>
        <li>"What is the difference between value and reference types?"</li>
        <li>"How does the .NET garbage collector work?"</li>
        <li>"How do you reduce memory allocations in C#?"</li>
        <li>"What is the IDisposable pattern and why is it important?"</li>
        <li>"When would you use Span<T> or unsafe code?"</li>
        <li>"How do you benchmark and profile C# code?"</li>
      </ol>
    </div>
  `,
  challenge: {
    description:
      'Build a high-performance log processor. Use value types for log entries, object pooling for buffers, implement IDisposable for file management, and benchmark the performance of different parsing strategies. Include a method that uses Span<char> for parsing lines.',
    requirements: [
      'Value type for log entry',
      'Object pool for reusable buffers',
      'IDisposable for file management',
      'Span<char> for parsing',
      'Benchmarking of parsing strategies',
    ],
    starterCode: `// High-Performance Log Processor
using System;
using System.Buffers;
using System.Diagnostics;
using System.IO;
using System.Text;

public struct LogEntry
{
    public DateTime Timestamp;
    public string Level;
    public string Message;
}

public class BufferPool
{
    private ArrayPool<byte> _pool = ArrayPool<byte>.Shared;
    public byte[] Rent(int size) => _pool.Rent(size);
    public void Return(byte[] buffer) => _pool.Return(buffer);
}

public class LogFileReader : IDisposable
{
    private FileStream _file;
    public LogFileReader(string path) { _file = File.OpenRead(path); }
    public void Dispose() { _file?.Dispose(); }
}

public static class LogParser
{
    public static LogEntry ParseLine(ReadOnlySpan<char> line)
    {
        // TODO: Parse log line using Span<char>
        return new LogEntry();
    }
}

// Benchmarking example
var sw = Stopwatch.StartNew();
// ... parse logs ...
sw.Stop();
Console.WriteLine($"Elapsed: {sw.ElapsedMilliseconds} ms");
`,
  },
}

export default memoryManagementAndPerformance
