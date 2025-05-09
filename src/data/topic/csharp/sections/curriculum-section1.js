// curriculum-section1.js - C# Fundamentals

const csharpFundamentals = {
  title: 'C# Fundamentals',
  description:
    'Master the building blocks of C#, including variables, data types, control flow, and basic object-oriented concepts.',
  lessons: [
    {
      title: 'Variables, Data Types, and Type System',
      description:
        "Explore C#'s type system, learn about value and reference types, and understand variable declarations.",
      sections: [
        {
          title: 'C# Type System Overview',
          explanation: `
        <p>C# is a strongly-typed language with a rich type system that combines safety and flexibility. Understanding the type system is foundational to writing effective C# code:</p>
        
        <h4>The Type Hierarchy</h4>
        <p>C# has a unified type system where all types, whether predefined or user-defined, ultimately derive from the <code>System.Object</code> class. This enables common functionality across all types.</p>

        <p>Types in C# fall into two main categories:</p>

        <p><strong>Value types:</strong> These store their data directly in memory allocated on the stack. When assigned to another variable, their value is copied. Common value types include numeric types (<code>int</code>, <code>double</code>), <code>bool</code>, <code>char</code>, <code>struct</code>, and <code>enum</code>.</p>

        <p><strong>Reference types:</strong> These store a reference to their data, which is allocated on the heap. When assigned to another variable, only the reference is copied, not the underlying data. Common reference types include <code>class</code>, <code>interface</code>, <code>delegate</code>, <code>array</code>, and <code>string</code>.</p>

        <p>Understanding this distinction is critical for managing memory and behavior in C# applications.</p>
        
        <div class="code-example">
          <pre><code>// Value type example
int a = 10;
int b = a;  // Value is copied
b = 20;     // Modifying b doesn't affect a
Console.WriteLine(a);  // Output: 10

// Reference type example
List&lt;int&gt; list1 = new List&lt;int&gt; { 1, 2, 3 };
List&lt;int&gt; list2 = list1;  // Reference is copied
list2.Add(4);  // Modifies the same object
Console.WriteLine(list1.Count);  // Output: 4</code></pre>
        </div>
        
        <h4>Common Types in C#</h4>
        <p>C# provides a rich set of predefined types that can be categorized as:</p>

        <p><strong>Simple types:</strong></p>
        <ul>
          <li>Integer types: <code>byte</code>, <code>sbyte</code>, <code>short</code>, <code>ushort</code>, <code>int</code>, <code>uint</code>, <code>long</code>, <code>ulong</code></li>
          <li>Floating-point types: <code>float</code>, <code>double</code></li>
          <li>Decimal type: <code>decimal</code> (high-precision)</li>
          <li>Boolean type: <code>bool</code></li>
          <li>Character type: <code>char</code> (Unicode)</li>
        </ul>

        <p><strong>Composite types:</strong></p>
        <ul>
          <li>Reference types: <code>class</code>, <code>interface</code></li>
          <li>Value types: <code>struct</code>, <code>enum</code></li>
          <li>Arrays: Single and multi-dimensional</li>
          <li>Delegates and events</li>
          <li>Advanced types: <code>dynamic</code>, <code>object</code>, <code>string</code>, nullable types</li>
        </ul>
        
        <div class="interview-tip">
          <p><span class="interview-icon">🎯</span> <strong>Interview Focus:</strong> Be prepared to discuss the differences between value and reference types, including memory allocation and behavior in assignment operations.</p>
          <p>Common interview questions include:</p>
          <ul>
            <li>"What's the difference between a struct and a class in C#?"</li>
            <li>"What happens when you pass a value type vs. a reference type to a method?"</li>
            <li>"Explain boxing and unboxing in C#"</li>
            <li>"Why is string a reference type that behaves like a value type?"</li>
          </ul>
        </div>
      `,
          codeExample: `// Exploring C# types and type behavior

// Value types
int number = 42;                  // Integer type
double pi = 3.14159;              // Double-precision floating point
decimal price = 19.99m;           // Decimal (high-precision)
bool isActive = true;             // Boolean
char letter = 'A';                // Character (Unicode)
DateTime today = DateTime.Now;    // Value type date and time
int? nullableInt = null;          // Nullable value type

// Value type: struct
struct Point
{
    public int X;
    public int Y;
    
    public Point(int x, int y)
    {
        X = x;
        Y = y;
    }
    
    public override string ToString() => $"({X}, {Y})";
}

// Value type: enum
enum Status
{
    Inactive,
    Active,
    Suspended,
    Deleted
}

// Reference types
string name = "John";             // String (immutable reference type)
object obj = new object();        // Base type for all types
dynamic dynamicVar = 100;         // Type resolved at runtime
int[] numbers = { 1, 2, 3, 4 };   // Array (reference type)

// User-defined reference type: class
class Person
{
    public string Name { get; set; }
    public int Age { get; set; }
    
    public Person(string name, int age)
    {
        Name = name;
        Age = age;
    }
}

// Type behavior demonstration
void DemonstrateTypesBehavior()
{
    Console.WriteLine("=== Value Type Behavior ===");
    
    // Value types are copied
    int a = 10;
    int b = a;
    b = 20;
    Console.WriteLine($"a: {a}, b: {b}");  // a: 10, b: 20
    
    // Struct behavior (value type)
    Point p1 = new Point(1, 2);
    Point p2 = p1;
    p2.X = 3;
    Console.WriteLine($"p1: {p1}, p2: {p2}");  // p1: (1, 2), p2: (3, 2)
    
    Console.WriteLine("=== Reference Type Behavior ===");
    
    // Reference types share the same instance
    Person person1 = new Person("Alice", 30);
    Person person2 = person1;
    person2.Name = "Bob";
    Console.WriteLine($"person1.Name: {person1.Name}, person2.Name: {person2.Name}");
    // Both names are "Bob"
    
    // Arrays are reference types
    int[] arr1 = { 1, 2, 3 };
    int[] arr2 = arr1;
    arr2[0] = 99;
    Console.WriteLine($"arr1[0]: {arr1[0]}, arr2[0]: {arr2[0]}");
    // Both will be 99
    
    Console.WriteLine("=== Boxing and Unboxing ===");
    
    // Boxing (value type to reference type)
    int num = 42;
    object boxed = num;  // Boxing
    
    // Unboxing (reference type to value type)
    int unboxed = (int)boxed;  // Unboxing
    
    Console.WriteLine($"Original: {num}, Boxed: {boxed}, Unboxed: {unboxed}");
}`,
          exercise: {
            instructions:
              'Create a program that demonstrates the behavior of both value types and reference types. Implement a struct for representing a point in 2D space and a class for a circle. Show how modifications affect copied variables for both types. Include examples of boxing/unboxing and explain the memory implications of each operation in comments.',
          },
        },
        {
          title: 'Variable Declarations and Type Inference',
          explanation: `
        <p>C# offers several ways to declare and initialize variables, with features to make code both safe and concise:</p>
        
        <h4>Variable Declaration Styles</h4>
        <p>C# provides multiple ways to declare variables with different scoping rules and behaviors:</p>

        <p><strong>Explicit typing:</strong> The traditional approach where you specify the exact type of variable. This offers clarity and is especially useful when the type isn't obvious.</p>

        <p><strong>Type inference with var:</strong> Introduced in C# 3.0, the <code>var</code> keyword lets the compiler infer the type from the initializer. This reduces redundancy but requires initialization at declaration.</p>

        <p><strong>Implicitly typed arrays:</strong> Using <code>var</code> with array initialization expressions provides cleaner syntax for complex array types.</p>

        <h4>Constants and Readonly Fields</h4>
        <p>C# provides two main approaches to declare values that shouldn't change:</p>

        <p><strong>Constants (const):</strong> Values that are fixed at compile time and can never change. They can only be primitive types, enums, or strings.</p>

        <p><strong>Read-only fields (readonly):</strong> Values that can be set only at declaration or in a constructor, providing runtime immutability. These can be any type, including complex objects.</p>

        <h4>Nullable Types</h4>
        <p>Value types normally can't be null, but C# provides nullable types for scenarios where a value might be absent:</p>

        <p><strong>Nullable value types:</strong> Using <code>?</code> suffix or <code>Nullable&lt;T&gt;</code> to create value types that can hold null.</p>

        <p><strong>Null-conditional operators (?., ?[]):</strong> For safe navigation through potentially null objects without throwing exceptions.</p>

        <p><strong>Null-coalescing operator (??):</strong> Providing default values when expressions evaluate to null.</p>
        
        <div class="code-example">
          <pre><code>// Explicit typing
int counter = 0;
string name = "Alice";
List&lt;string&gt; items = new List&lt;string&gt;();

// Type inference with var
var age = 30;               // Inferred as int
var title = "Developer";    // Inferred as string
var now = DateTime.Now;     // Inferred as DateTime
var numbers = new[] { 1, 2, 3 };  // Inferred as int[]

// Constants
const double Pi = 3.14159;
const string AppName = "MyApp";

// Readonly fields
readonly DateTime StartTime = DateTime.Now;
readonly List&lt;string&gt; ValidOptions = new List&lt;string&gt; { "Option1", "Option2" };

// Nullable types
int? nullableInt = null;
DateTime? maybeDate = null;
if (maybeDate.HasValue)
{
    Console.WriteLine(maybeDate.Value);
}</code></pre>
        </div>
        
        <h4>Default Values and Initialization</h4>
        <div class="code-example">
          <pre><code>// Default values
int number;           // Must be assigned before use
int initialized = 0;  // Explicitly initialized

// Default literal
var defaultInt = default(int);    // 0
var defaultBool = default(bool);  // false
var defaultString = default(string);  // null
string str = default;  // C# 7.1+ simplified syntax

// Object initializers
var person = new Person
{
    Name = "John",
    Age = 30,
    Email = "john@example.com"
};

// Collection initializers
var fruits = new List&lt;string&gt; { "Apple", "Orange", "Banana" };</code></pre>
        </div>
        
        <div class="interview-tip">
          <p><span class="interview-icon">🎯</span> <strong>Interview Focus:</strong> Be prepared to discuss when to use var versus explicit typing, and understand the performance implications of nullable types.</p>
          <p>Interviewers often ask about:</p>
          <ul>
            <li>"What are the benefits and drawbacks of using var?"</li>
            <li>"When would you use readonly instead of const?"</li>
            <li>"How does nullable reference types change C# programming? (C# 8.0+)"</li>
            <li>"Explain the difference between default(T) and new T()"</li>
          </ul>
        </div>
      `,
          codeExample: `// Demonstrating variable declarations in C#

public class VariablesDemo
{
    // Constants - compile-time constants
    public const int MaxRetries = 3;
    public const string Separator = ",";
    
    // Readonly fields - runtime constants
    public readonly DateTime ApplicationStartTime;
    public readonly List<string> SupportedFormats;
    
    // Constructor initializes readonly fields
    public VariablesDemo()
    {
        ApplicationStartTime = DateTime.Now;
        SupportedFormats = new List<string> { "json", "xml", "csv" };
    }
    
    public void DemonstrateVariables()
    {
        // Local variable declaration with explicit types
        int count = 10;
        string message = "Hello C#";
        bool isActive = true;
        
        // Type inference with var
        var total = 1250;  // int
        var name = "Alice";  // string
        var items = new Dictionary<string, int>();  // Dictionary<string, int>
        
        // Cannot use var without initializer
        // var uninitializedVar;  // Error!
        
        // Nullable types
        int? nullableInt = null;
        DateTime? nullableDate = null;
        
        // Working with nullable types
        if (nullableInt.HasValue)
        {
            Console.WriteLine($"Value is: {nullableInt.Value}");
        }
        
        // Null coalescing operator
        int definitelyInt = nullableInt ?? 0;
        
        // Null conditional operators
        string firstName = null;
        int? length = firstName?.Length;  // null, no exception
        Console.WriteLine($"Length: {length ?? 0}");
        
        // Implicitly typed arrays
        var fibNumbers = new[] { 1, 1, 2, 3, 5, 8 };
        var matrix = new[,] { { 1, 2, 3 }, { 4, 5, 6 } };
        
        // Default values
        int defaultInt = default;  // 0
        string defaultString = default;  // null
        DateTime defaultDateTime = default;  // 01/01/0001 00:00:00
        
        Console.WriteLine($"Default int: {defaultInt}");
        Console.WriteLine($"Default string: {defaultString ?? "null"}");
        Console.WriteLine($"Default DateTime: {defaultDateTime}");
        
        // Object and collection initializers
        var person = new Person
        {
            FirstName = "John",
            LastName = "Doe",
            Age = 30
        };
        
        var colors = new List<string> { "Red", "Green", "Blue" };
        
        // Anonymous types
        var anonymousObj = new { Id = 1, Name = "Product" };
        Console.WriteLine($"ID: {anonymousObj.Id}, Name: {anonymousObj.Name}");
        
        // Tuple types
        (string Name, int Age) personInfo = ("Bob", 25);
        Console.WriteLine($"{personInfo.Name} is {personInfo.Age} years old");
        
        // Discards
        var (_, age) = personInfo;  // Discard name
        Console.WriteLine($"Age only: {age}");
    }
}

// Helper class for demonstrations
public class Person
{
    public string FirstName { get; set; }
    public string LastName { get; set; }
    public int Age { get; set; }
}`,
          exercise: {
            instructions:
              'Create a program that demonstrates different ways to declare and initialize variables in C#. Include examples of explicit typing, type inference, constants, readonly fields, and nullable types. Create a class that manages a collection of items with proper variable declarations for different scenarios. Ensure your implementation demonstrates initializing objects using object initializers and working with nullable types.',
          },
        },
        {
          title: 'Control Flow (if, switch, loops)',
          explanation: `
        <p>C# provides comprehensive control flow structures for conditional logic and iteration:</p>
        
        <h4>Conditional Statements</h4>
        <p>C# offers several ways to implement conditional logic in your programs:</p>

        <p><strong>if/else statements:</strong> The most basic form of conditional execution, evaluating a boolean expression to determine which code path to follow.</p>

        <p><strong>switch statement:</strong> Allows selecting one of many code blocks to execute based on a pattern match against a given expression. Modern C# has significantly enhanced switch statements with pattern matching capabilities.</p>

        <p><strong>Conditional operator (?:):</strong> A compact form for simple conditional assignments, returning one of two values depending on a condition.</p>

        <p><strong>Null-coalescing operator (??):</strong> Specifically for providing a fallback value when an expression evaluates to null.</p>

        <h4>Iteration Statements</h4>
        <p>C# provides multiple loop constructs for different iteration scenarios:</p>

        <p><strong>for loop:</strong> Best for scenarios with a known number of iterations and a simple increment pattern.</p>

        <p><strong>while loop:</strong> Executes a block of code as long as a condition remains true, checking the condition before each iteration.</p>

        <p><strong>do-while loop:</strong> Similar to the while loop, but guarantees at least one execution of the code block, as it checks the condition after execution.</p>

        <p><strong>foreach loop:</strong> Specifically designed for iterating over collections, arrays, or any object that implements IEnumerable.</p>

        <h4>Jump Statements</h4>
        <p>C# provides several statements to alter the control flow within loops and methods:</p>

        <p><strong>break:</strong> Exits the nearest enclosing loop or switch statement.</p>

        <p><strong>continue:</strong> Skips to the next iteration of the nearest enclosing loop.</p>

        <p><strong>return:</strong> Exits the current method and optionally returns a value.</p>

        <p><strong>goto:</strong> Transfers control to a labeled statement (rarely used in modern code).</p>
        
        <div class="code-example">
          <pre><code>// Conditional statements
int age = 20;

if (age >= 18)
{
    Console.WriteLine("Adult");
}
else if (age >= 13)
{
    Console.WriteLine("Teenager");
}
else
{
    Console.WriteLine("Child");
}

// Switch statement
string dayOfWeek = "Monday";
switch (dayOfWeek)
{
    case "Saturday":
    case "Sunday":
        Console.WriteLine("Weekend");
        break;
    default:
        Console.WriteLine("Weekday");
        break;
}

// Modern switch expression (C# 8.0+)
string typeOfDay = dayOfWeek switch
{
    "Saturday" => "Weekend",
    "Sunday" => "Weekend",
    _ => "Weekday"  // Default case
};</code></pre>
        </div>
        
        <h4>Loops and Iteration</h4>
        <div class="code-example">
          <pre><code>// For loop
for (int i = 0; i < 5; i++)
{
    Console.WriteLine(i);
}

// While loop
int count = 0;
while (count < 3)
{
    Console.WriteLine(count);
    count++;
}

// Do-while loop (executes at least once)
int x = 0;
do
{
    Console.WriteLine(x);
    x++;
} while (x < 3);

// Foreach loop
string[] colors = { "red", "green", "blue" };
foreach (string color in colors)
{
    Console.WriteLine(color);
}

// Break and continue
for (int i = 0; i < 10; i++)
{
    if (i == 3) continue;  // Skip 3
    if (i == 7) break;     // Exit at 7
    Console.WriteLine(i);
}</code></pre>
        </div>
        
        <div class="interview-tip">
          <p><span class="interview-icon">🎯</span> <strong>Interview Focus:</strong> Be prepared to discuss pattern matching in switch statements and when to choose different loop types for various scenarios.</p>
          <p>Key areas to focus on:</p>
          <ul>
            <li>Pattern matching with switch expressions in C# 8.0+</li>
            <li>Performance considerations when choosing loop types</li>
            <li>Using foreach with custom collections</li>
            <li>Guard clauses and early returns in conditional logic</li>
          </ul>
        </div>
      `,
          codeExample: `// Control flow demonstrations in C#

public class ControlFlowDemo
{
    public void DemonstrateConditionals()
    {
        // Basic if/else
        int score = 85;
        
        if (score >= 90)
        {
            Console.WriteLine("Grade: A");
        }
        else if (score >= 80)
        {
            Console.WriteLine("Grade: B");
        }
        else if (score >= 70)
        {
            Console.WriteLine("Grade: C");
        }
        else
        {
            Console.WriteLine("Grade: F");
        }
        
        // Conditional (ternary) operator
        bool isHighScore = score > 80 ? true : false;
        string result = score > 70 ? "Pass" : "Fail";
        
        // Null-coalescing operator
        string username = null;
        string displayName = username ?? "Guest";
        
        // Null-conditional operator with null-coalescing
        string[] names = null;
        int? firstNameLength = names?[0]?.Length ?? 0;
        
        // Switch statement
        char grade = 'B';
        
        switch (grade)
        {
            case 'A':
                Console.WriteLine("Excellent!");
                break;
            case 'B':
                Console.WriteLine("Good job!");
                break;
            case 'C':
                Console.WriteLine("Average");
                break;
            case 'D':
            case 'F':
                Console.WriteLine("Need improvement");
                break;
            default:
                Console.WriteLine("Invalid grade");
                break;
        }
        
        // Pattern matching with switch (C# 7.0+)
        object item = "Hello";
        
        switch (item)
        {
            case int i:
                Console.WriteLine($"It's an integer: {i}");
                break;
            case string s when s.Length > 10:
                Console.WriteLine($"It's a long string: {s}");
                break;
            case string s:
                Console.WriteLine($"It's a string: {s}");
                break;
            case null:
                Console.WriteLine("It's null");
                break;
            default:
                Console.WriteLine("Unknown type");
                break;
        }
        
        // Switch expression (C# 8.0+)
        string message = item switch
        {
            int i => $"It's an integer: {i}",
            string s when s.Length > 10 => $"It's a long string: {s}",
            string s => $"It's a string: {s}",
            null => "It's null",
            _ => "Unknown type"  // Discard pattern (default)
        };
        
        Console.WriteLine(message);
    }
    
    public void DemonstrateLoops()
    {
        // For loop
        Console.WriteLine("For loop:");
        for (int i = 0; i < 5; i++)
        {
            Console.Write($"{i} ");
        }
        Console.WriteLine();
        
        // Nested for loop
        Console.WriteLine("Multiplication table:");
        for (int i = 1; i <= 3; i++)
        {
            for (int j = 1; j <= 3; j++)
            {
                Console.Write($"{i}x{j}={i * j}\t");
            }
            Console.WriteLine();
        }
        
        // While loop
        Console.WriteLine("While loop:");
        int counter = 0;
        while (counter < 5)
        {
            Console.Write($"{counter} ");
            counter++;
        }
        Console.WriteLine();
        
        // Do-while loop
        Console.WriteLine("Do-while loop:");
        int x = 0;
        do
        {
            Console.Write($"{x} ");
            x++;
        } while (x < 5);
        Console.WriteLine();
        
        // Foreach loop
        Console.WriteLine("Foreach loop:");
        string[] colors = { "Red", "Green", "Blue" };
        foreach (string color in colors)
        {
            Console.Write($"{color} ");
        }
        Console.WriteLine();
        
        // Break, continue, and return
        Console.WriteLine("Loop with break and continue:");
        for (int i = 0; i < 10; i++)
        {
            if (i == 3)
            {
                continue; // Skip 3
            }
            
            if (i == 7)
            {
                break; // Stop at 7
            }
            
            Console.Write($"{i} ");
        }
        Console.WriteLine();
        
        // Iterator methods with yield
        Console.WriteLine("Custom iterator:");
        foreach (int num in GetEvenNumbers(10))
        {
            Console.Write($"{num} ");
        }
        Console.WriteLine();
    }
    
    // Iterator method using yield
    public IEnumerable<int> GetEvenNumbers(int max)
    {
        for (int i = 0; i <= max; i += 2)
        {
            yield return i;
        }
    }
}`,
          exercise: {
            instructions:
              'Create a program that demonstrates control flow in C#. Implement a menu-driven application that provides options for: 1) Determining if a number is prime, 2) Generating a Fibonacci sequence up to n terms, 3) Converting temperatures between Celsius and Fahrenheit, 4) Exiting the program. Use appropriate conditional statements and loops for each operation. Implement pattern matching with switch expressions and demonstrate proper use of break and continue statements where applicable.',
          },
        },
        {
          title: 'Methods and Parameters',
          explanation: `
        <p>Methods in C# are the building blocks that encapsulate operations, define behavior, and promote code reusability:</p>
        
        <h4>Method Declarations</h4>
        <p>C# provides a flexible syntax for declaring methods:</p>

        <p><strong>Basic method signature:</strong> A method's name, return type, and parameters define its contract. Methods can be instance methods (called on an object) or static methods (called on a class).</p>

        <p><strong>Access modifiers:</strong> Control the visibility of methods (public, private, protected, internal, etc.).</p>

        <p><strong>Expression-bodied methods:</strong> A concise syntax for one-line methods introduced in C# 6.0, using the => operator.</p>

        <p><strong>Local functions:</strong> Methods defined inside other methods, introduced in C# 7.0, for operations that are only relevant to a specific method.</p>

        <h4>Parameter Types</h4>
        <p>C# supports multiple ways to pass parameters to methods:</p>

        <p><strong>Value parameters:</strong> By default, parameters are passed by value, meaning a copy of the value is passed to the method.</p>

        <p><strong>Reference parameters (ref):</strong> Pass a reference to the variable, allowing the method to modify the original value. Requires explicit use of the ref keyword both in method declaration and when calling.</p>

        <p><strong>Output parameters (out):</strong> Similar to ref, but doesn't require the variable to be initialized before the method call. Used primarily to return multiple values.</p>

        <p><strong>In parameters (in):</strong> Passes a reference for efficiency but prevents the method from modifying the value. Introduced in C# 7.2.</p>

        <p><strong>Optional parameters:</strong> Parameters with default values that can be omitted when calling the method.</p>

        <p><strong>Named arguments:</strong> Specify parameter values by name rather than position, improving readability, especially with many or optional parameters.</p>

        <p><strong>Parameter arrays (params):</strong> Accept a variable number of arguments of the same type.</p>

        <h4>Return Types</h4>
        <p>Methods can return various types of values:</p>

        <p><strong>Single values:</strong> Return any valid type including primitive types, objects, and collections.</p>

        <p><strong>Void:</strong> Methods that don't return a value.</p>

        <p><strong>Tuples:</strong> Return multiple values as a single unit. Named tuple members improve code readability.</p>

        <p><strong>Task/Task&lt;T&gt;:</strong> Return types for asynchronous methods.</p>
        
        <div class="code-example">
          <pre><code>// Basic method declaration
public int Add(int a, int b)
{
    return a + b;
}

// Expression-bodied method (C# 6.0+)
public int Multiply(int a, int b) => a * b;

// Method with optional parameters
public void Greet(string name, string greeting = "Hello")
{
    Console.WriteLine($"{greeting}, {name}!");
}

// Method with a params array
public int Sum(params int[] numbers)
{
    int total = 0;
    foreach (int num in numbers)
    {
        total += num;
    }
    return total;
}</code></pre>
        </div>
        
        <h4>Parameter Modifiers</h4>
        <div class="code-example">
          <pre><code>// Ref parameter - pass by reference
public void Swap(ref int a, ref int b)
{
    int temp = a;
    a = b;
    b = temp;
}

// Usage:
int x = 10, y = 20;
Swap(ref x, ref y);  // Must use 'ref' when calling

// Out parameter - for returning multiple values
public bool TryParse(string input, out int result)
{
    return int.TryParse(input, out result);
}

// Usage:
bool success = TryParse("123", out int value);

// In parameter - pass by reference, but read-only
public void Process(in Customer customer)
{
    // Cannot modify customer
    Console.WriteLine(customer.Name);
}

// Named arguments
Greet(greeting: "Hi", name: "Alice");</code></pre>
        </div>
        
        <div class="interview-tip">
          <p><span class="interview-icon">🎯</span> <strong>Interview Focus:</strong> Be prepared to discuss method parameter passing in detail, including the memory implications of different parameter types.</p>
          <p>Common interview questions include:</p>
          <ul>
            <li>"What's the difference between ref and out parameters?"</li>
            <li>"When would you use in parameters versus regular parameters?"</li>
            <li>"How does the params keyword work, and when should it be used?"</li>
            <li>"How can you return multiple values from a method in C#?"</li>
            <li>"What are the advantages and limitations of expression-bodied methods?"</li>
          </ul>
        </div>
      `,
          codeExample: `// Demonstrating methods and parameters in C#

public class MethodDemo
{
    // Basic method with simple return type
    public int Add(int a, int b)
    {
        return a + b;
    }
    
    // Expression-bodied method (C# 6.0+)
    public int Subtract(int a, int b) => a - b;
    
    // Method with optional parameters
    public void DisplayInfo(string name, int age = 30, string department = "IT")
    {
        Console.WriteLine($"Name: {name}, Age: {age}, Department: {department}");
    }
    
    // Method with params array
    public double CalculateAverage(params int[] numbers)
    {
        if (numbers.Length == 0)
            return 0;
            
        int sum = 0;
        foreach (int num in numbers)
        {
            sum += num;
        }
        
        return (double)sum / numbers.Length;
    }
    
    // Method with ref parameter
    public void Swap(ref int a, ref int b)
    {
        int temp = a;
        a = b;
        b = temp;
    }
    
    // Method with out parameter
    public bool DivideIfPossible(int dividend, int divisor, out int result, out string errorMessage)
    {
        errorMessage = string.Empty;
        result = 0;
        
        if (divisor == 0)
        {
            errorMessage = "Cannot divide by zero";
            return false;
        }
        
        result = dividend / divisor;
        return true;
    }
    
    // Method with in parameter (C# 7.2+)
    public double CalculateDistance(in Point p1, in Point p2)
    {
        // Using local function (C# 7.0+)
        double Square(double num) => num * num;
        
        // Points are passed by reference but can't be modified
        return Math.Sqrt(Square(p2.X - p1.X) + Square(p2.Y - p1.Y));
    }
    
    // Method that returns a tuple (C# 7.0+)
    public (string Name, int Count, double Average) GetStats(List<int> numbers)
    {
        if (numbers == null || numbers.Count == 0)
            return ("Empty", 0, 0);
            
        return (
            Name: "Stats",
            Count: numbers.Count,
            Average: numbers.Average()
        );
    }
    
    // Method overloading
    public void Print(int value) => Console.WriteLine($"Integer: {value}");
    public void Print(double value) => Console.WriteLine($"Double: {value}");
    public void Print(string value) => Console.WriteLine($"String: {value}");
    
    // Recursive method
    public int Factorial(int n)
    {
        if (n <= 1)
            return 1;
            
        return n * Factorial(n - 1);
    }
    
    // Generic method
    public T First<T>(List<T> items)
    {
        if (items == null || items.Count == 0)
            throw new ArgumentException("Collection is empty");
            
        return items[0];
    }
    
    // Async method
    public async Task<string> FetchDataAsync(string url)
    {
        using (var client = new HttpClient())
        {
            return await client.GetStringAsync(url);
        }
    }
    
    // Method with named arguments demonstration
    public void DemonstrateNamedArguments()
    {
        // Regular call with positional arguments
        DisplayInfo("John", 25, "Finance");
        
        // Using named arguments - can be in any order
        DisplayInfo(
            department: "HR",
            name: "Alice",
            age: 35
        );
        
        // Mixing positional and named arguments
        DisplayInfo("Bob", department: "Sales");
    }
    
    // Extension method demonstration (defined outside this class)
    public void DemonstrateExtensionMethod()
    {
        string text = "Hello, World!";
        bool containsHello = text.ContainsIgnoreCase("hello");
        Console.WriteLine($"Contains 'hello': {containsHello}");
    }
}

// Simple structure for the in parameter example
public struct Point
{
    public double X { get; }
    public double Y { get; }
    
    public Point(double x, double y)
    {
        X = x;
        Y = y;
    }
}

// Extension method definition
public static class StringExtensions
{
    public static bool ContainsIgnoreCase(this string source, string value)
    {
        return source?.IndexOf(value, StringComparison.OrdinalIgnoreCase) >= 0;
    }
}`,
          exercise: {
            instructions:
              'Create a Calculator class that demonstrates various method parameter types and return values. Implement methods for basic arithmetic operations, a TryParse method that uses out parameters, overloaded methods that handle different numeric types, a params array for calculating sum and average, and a method that returns multiple values using tuples. Create a test program that demonstrates calling these methods with both positional and named arguments.',
          },
        },
        {
          title: 'Exception Handling',
          explanation: `
        <p>Exception handling in C# provides a structured approach to dealing with errors and unexpected situations during program execution:</p>
        
        <h4>The Exception Model</h4>
        <p>C# implements a comprehensive exception-handling model based on the try-catch-finally pattern:</p>

        <p><strong>Try block:</strong> Contains the code that might throw an exception.</p>

        <p><strong>Catch block:</strong> Handles exceptions that occur in the try block. Multiple catch blocks can be used to handle different exception types.</p>

        <p><strong>Finally block:</strong> Contains code that always executes, regardless of whether an exception occurred. Used for cleanup operations like closing files or releasing resources.</p>

        <h4>Exception Hierarchy</h4>
        <p>C# has a rich hierarchy of exception types, all deriving from <code>System.Exception</code>:</p>

        <p><strong>System exceptions:</strong> Predefined exceptions provided by the .NET Framework, like <code>NullReferenceException</code>, <code>ArgumentException</code>, and <code>IOException</code>.</p>

        <p><strong>Application exceptions:</strong> Custom exceptions defined by application developers to represent specific error scenarios.</p>

        <h4>Advanced Exception Handling</h4>
        <p>C# provides additional features for more sophisticated exception handling:</p>

        <p><strong>Exception filters:</strong> Added in C# 6.0, they allow specifying a condition for when a catch block should execute using the when keyword.</p>

        <p><strong>Inner exceptions:</strong> Preserve the original exception when throwing a new one, providing a complete error trail.</p>

        <p><strong>Exception data:</strong> Store additional information about an exception using the Data property, a dictionary that can hold custom key-value pairs.</p>

        <h4>Best Practices</h4>
        <p>Effective exception handling follows several key principles:</p>

        <p><strong>Handle specific exceptions:</strong> Catch the most specific exception type that addresses your error scenario.</p>

        <p><strong>Don't swallow exceptions:</strong> Always take appropriate action, like logging or providing user feedback, rather than catching exceptions and doing nothing.</p>

        <p><strong>Clean up resources:</strong> Use finally blocks or the using statement to ensure proper resource cleanup.</p>

        <p><strong>Custom exceptions:</strong> Create custom exception classes for application-specific error scenarios to make error handling more meaningful.</p>
        
        <div class="code-example">
          <pre><code>// Basic try-catch-finally
try
{
    int result = 10 / 0;  // Will throw DivideByZeroException
}
catch (DivideByZeroException ex)
{
    Console.WriteLine($"Division error: {ex.Message}");
}
catch (Exception ex)  // Catches any other exception
{
    Console.WriteLine($"General error: {ex.Message}");
}
finally
{
    Console.WriteLine("This always executes");
}

// Multiple catches with exception filters (C# 6.0+)
try
{
    string text = File.ReadAllText("data.txt");
}
catch (FileNotFoundException ex) when (ex.FileName.Contains("data"))
{
    Console.WriteLine($"Data file not found: {ex.FileName}");
}
catch (IOException ex)
{
    Console.WriteLine($"IO error: {ex.Message}");
}</code></pre>
        </div>
        
        <h4>Creating Custom Exceptions and Using the Using Statement</h4>
        <div class="code-example">
          <pre><code>// Custom exception class
public class InvalidOrderException : Exception
{
    public int OrderId { get; }
    
    public InvalidOrderException(int orderId, string message)
        : base(message)
    {
        OrderId = orderId;
    }
    
    public InvalidOrderException(int orderId, string message, Exception inner)
        : base(message, inner)
    {
        OrderId = orderId;
    }
}

// Using statement for automatic resource cleanup
public void ProcessFile(string path)
{
    using (StreamReader reader = new StreamReader(path))
    {
        string content = reader.ReadToEnd();
        // Process content
    }  // reader.Dispose() is automatically called here
    
    // C# 8.0+ using declaration
    using FileStream file = File.OpenRead(path);
    // file is disposed at the end of the containing scope
}</code></pre>
        </div>
        
        <div class="interview-tip">
          <p><span class="interview-icon">🎯</span> <strong>Interview Focus:</strong> Be prepared to discuss exception handling strategies, when to create custom exceptions, and performance implications of exceptions.</p>
          <p>Key areas to focus on:</p>
          <ul>
            <li>Difference between throw and throw ex (preserving the stack trace)</li>
            <li>When to use exception filters</li>
            <li>Performance considerations with exceptions</li>
            <li>Implementing IDisposable with the using statement</li>
            <li>Error handling in asynchronous code</li>
          </ul>
        </div>
      `,
          codeExample: `// Exception handling demonstrations in C#

using System;
using System.IO;
using System.Threading.Tasks;
using System.Collections;

// Custom exception
public class UserNotFoundException : Exception
{
    public string Username { get; }
    
    public UserNotFoundException(string username)
        : base($"User '{username}' was not found")
    {
        Username = username;
    }
    
    public UserNotFoundException(string username, Exception innerException)
        : base($"User '{username}' was not found", innerException)
    {
        Username = username;
    }
}

public class ExceptionHandlingDemo
{
    public void BasicTryCatchFinally()
    {
        Console.WriteLine("=== Basic Try-Catch-Finally Example ===");
        
        try
        {
            Console.WriteLine("Attempting division...");
            int result = 10 / 0; // This will throw a DivideByZeroException
            Console.WriteLine($"Result: {result}"); // This line won't execute
        }
        catch (DivideByZeroException ex)
        {
            Console.WriteLine($"Division error: {ex.Message}");
            
            // Optionally re-throw if you can't handle it here
            // throw;
        }
        catch (Exception ex) // Catches any other exception
        {
            Console.WriteLine($"General error: {ex.Message}");
        }
        finally
        {
            // This always executes, regardless of whether an exception occurred
            Console.WriteLine("Cleanup code in finally block");
        }
        
        Console.WriteLine("Execution continues after try-catch-finally");
    }
    
    public void MultipleExceptionTypes()
    {
        Console.WriteLine("=== Multiple Exception Types Example ===");
        
        string filePath = "nonexistent.txt";
        
        try
        {
            // Could throw multiple types of exceptions
            string[] lines = File.ReadAllLines(filePath);
            int value = int.Parse(lines[0]);
            Console.WriteLine($"Value from file: {value}");
        }
        catch (FileNotFoundException ex)
        {
            Console.WriteLine($"File not found: {ex.FileName}");
        }
        catch (DirectoryNotFoundException ex)
        {
            Console.WriteLine($"Directory not found: {ex.Message}");
        }
        catch (IOException ex)
        {
            Console.WriteLine($"IO error: {ex.Message}");
        }
        catch (FormatException ex)
        {
            Console.WriteLine($"Invalid format: {ex.Message}");
        }
        catch (Exception ex) when (ex.Message.Contains("specific"))
        {
            // C# 6.0+ exception filter
            Console.WriteLine($"Specific error condition: {ex.Message}");
        }
        catch (Exception ex)
        {
            Console.WriteLine($"Unexpected error: {ex.Message}");
            
            // Add custom data to the exception
            ex.Data.Add("FilePath", filePath);
            ex.Data.Add("TimeStamp", DateTime.Now);
            
            // Log the exception with its data
            LogException(ex);
            
            // Optionally re-throw the enriched exception
            // throw;
        }
    }
    
    private void LogException(Exception ex)
    {
        Console.WriteLine($"LOGGING: {ex.GetType().Name}: {ex.Message}");
        
        // Log exception data
        if (ex.Data.Count > 0)
        {
            Console.WriteLine("Exception Data:");
            foreach (DictionaryEntry entry in ex.Data)
            {
                Console.WriteLine($"  {entry.Key}: {entry.Value}");
            }
        }
        
        // Log inner exception if present
        if (ex.InnerException != null)
        {
            Console.WriteLine($"Inner Exception: {ex.InnerException.Message}");
        }
        
        // Log stack trace in a real application
        // Console.WriteLine(ex.StackTrace);
    }
    
    public void ThrowingExceptions()
    {
        Console.WriteLine("=== Throwing Exceptions Example ===");
        
        try
        {
            FindUser("admin");
        }
        catch (UserNotFoundException ex)
        {
            Console.WriteLine($"Error: {ex.Message}");
            Console.WriteLine($"Username: {ex.Username}");
        }
    }
    
    private void FindUser(string username)
    {
        // Simulation of user lookup
        if (username != "admin" && username != "guest")
        {
            throw new UserNotFoundException(username);
        }
        
        Console.WriteLine($"User found: {username}");
    }
    
    public void UsingStatementDemo()
    {
        Console.WriteLine("=== Using Statement Example ===");
        
        string tempFile = Path.GetTempFileName();
        
        try
        {
            // Write some data
            using (StreamWriter writer = new StreamWriter(tempFile))
            {
                writer.WriteLine("Line 1");
                writer.WriteLine("Line 2");
                writer.WriteLine("Line 3");
                
                Console.WriteLine($"Data written to {tempFile}");
                // writer.Dispose() called automatically at the end of this block
            }
            
            // Read the data back
            // C# 8.0+ using declaration
            using StreamReader reader = new StreamReader(tempFile);
            string line;
            while ((line = reader.ReadLine()) != null)
            {
                Console.WriteLine($"Read: {line}");
            }
            // reader.Dispose() called at the end of the method
        }
        catch (IOException ex)
        {
            Console.WriteLine($"IO operation failed: {ex.Message}");
        }
        finally
        {
            // Clean up the temp file
            if (File.Exists(tempFile))
            {
                File.Delete(tempFile);
                Console.WriteLine($"Deleted temp file: {tempFile}");
            }
        }
    }
    
    public async Task AsyncExceptionHandlingAsync()
    {
        Console.WriteLine("=== Async Exception Handling Example ===");
        
        try
        {
            await ProcessDataAsync();
        }
        catch (Exception ex)
        {
            Console.WriteLine($"Async operation failed: {ex.Message}");
        }
    }
    
    private async Task ProcessDataAsync()
    {
        // Simulate async work that fails
        await Task.Delay(100); // Simulate some async work
        
        // Create a task that will fail
        Task failingTask = Task.Run(() => {
            throw new InvalidOperationException("Async operation error");
        });
        
        try
        {
            await failingTask;
        }
        catch (InvalidOperationException ex)
        {
            // Wrap the original exception with additional context
            throw new ApplicationException("Failed during data processing", ex);
        }
    }
    
    public void TryFinallyResourceCleanup()
    {
        Console.WriteLine("=== Try-Finally Resource Cleanup Example ===");
        
        StreamWriter writer = null;
        
        try
        {
            writer = new StreamWriter("temp.txt");
            writer.WriteLine("This is a test");
        }
        finally
        {
            // Safe cleanup, checking for null
            writer?.Dispose();
        }
    }
    
    // Main demo method that calls all examples
    public async Task RunAllDemos()
    {
        BasicTryCatchFinally();
        Console.WriteLine();
        
        MultipleExceptionTypes();
        Console.WriteLine();
        
        ThrowingExceptions();
        Console.WriteLine();
        
        UsingStatementDemo();
        Console.WriteLine();
        
        await AsyncExceptionHandlingAsync();
        Console.WriteLine();
        
        TryFinallyResourceCleanup();
    }
}`,
          exercise: {
            instructions:
              'Create a program that simulates a banking application with appropriate exception handling. Implement custom exceptions for scenarios like insufficient funds, invalid account, and invalid transaction amount. Include proper resource management with the using statement for any file or database operations. Demonstrate exception filters, inner exceptions, and adding custom data to exceptions for logging purposes. Use finally blocks to ensure proper cleanup in all scenarios.',
          },
        },
      ],
      prepperSummary: `
    <div class="prepper-summary">
      <h3>🔑 Key Interview Takeaways</h3>
      <ul>
        <li><strong>Type System:</strong> Understand the difference between value types and reference types, and how they behave in memory allocation and parameter passing.</li>
        
        <li><strong>Variable Declarations:</strong> Know when to use var, const, and readonly, and understand the implications of nullable types in C# 8 and later.</li>
        
        <li><strong>Control Flow:</strong> Master conditional statements, loops, and pattern matching with switch expressions. Know when to use each type of loop for different scenarios.</li>
        
        <li><strong>Methods and Parameters:</strong> Understand the different parameter modifiers (ref, out, in, params) and their use cases. Be able to use expression-bodied methods and local functions appropriately.</li>
        
        <li><strong>Exception Handling:</strong> Implement proper try-catch-finally patterns, know when to create custom exceptions, and understand how to preserve stack traces when re-throwing exceptions.</li>
      </ul>
      
      <h4>📝 Common Interview Questions</h4>
      <ol>
        <li>"What's the difference between value types and reference types in C#?"</li>
        <li>"Explain the difference between ref and out parameters"</li>
        <li>"When would you use a switch expression instead of a regular switch statement?"</li>
        <li>"How do exception filters work in C#, and when would you use them?"</li>
        <li>"What's the difference between const and readonly in C#?"</li>
      </ol>
    </div>
  `,
    }, // End of Lesson 1
    {
      title: 'Arrays and Collections',
      description:
        'Learn how to work with arrays and the various collection types in the .NET Framework.',
      sections: [
        {
          title: 'Arrays',
          explanation: `
        <p>Arrays in C# provide a fundamental way to store and access collections of items with the same type:</p>
        
        <h4>Array Fundamentals</h4>
        <p>Arrays in C# have several key characteristics that distinguish them from other collection types:</p>

        <p><strong>Fixed size:</strong> Once created, an array's size cannot be changed. This provides performance benefits but reduced flexibility compared to resizable collections.</p>

        <p><strong>Zero-based indexing:</strong> The first element is at index 0, the second at index 1, and so on.</p>

        <p><strong>Reference type:</strong> All arrays are reference types, even if they contain value types. When an array is passed to a method, changes to its elements affect the original array.</p>

        <p><strong>Type safety:</strong> Arrays are strongly typed, containing elements of a specific type or derived types. This ensures type safety at compile time.</p>

        <h4>Array Types</h4>
        <p>C# supports several types of arrays:</p>

        <p><strong>Single-dimensional arrays:</strong> The simplest form, a linear sequence of elements.</p>

        <p><strong>Multi-dimensional arrays:</strong> Rectangular arrays with a fixed number of rows and columns, accessed using comma-separated indices.</p>

        <p><strong>Jagged arrays:</strong> Arrays of arrays, where each "row" can have a different length. Accessed using multiple bracket notations.</p>

        <h4>Array Operations</h4>
        <p>Common operations on arrays include:</p>

        <p><strong>Initialization:</strong> Arrays can be initialized at declaration using initializer lists.</p>

        <p><strong>Iteration:</strong> Use loops (foreach, for) to process all elements in an array.</p>

        <p><strong>Sorting and searching:</strong> Arrays can be sorted using Array.Sort and searched using methods like Array.Find or Array.BinarySearch.</p>

        <p><strong>Transformation:</strong> Convert between arrays and other collection types, or create new arrays with modified elements.</p>
        
        <div class="code-example">
          <pre><code>// Single-dimensional array
int[] numbers = new int[5];  // Create array of 5 integers
numbers[0] = 10;             // Set first element
int first = numbers[0];      // Get first element

// Array initialization
int[] values = new int[] { 1, 2, 3, 4, 5 };
string[] names = { "Alice", "Bob", "Charlie" };  // Short syntax

// Multiple-dimensional array
int[,] matrix = new int[3, 4];  // 3 rows, 4 columns
matrix[0, 0] = 1;               // Set element at row 0, column 0

// Jagged array (array of arrays)
int[][] jaggedArray = new int[3][];
jaggedArray[0] = new int[] { 1, 2, 3 };
jaggedArray[1] = new int[] { 4, 5 };
jaggedArray[2] = new int[] { 6, 7, 8, 9 };</code></pre>
        </div>
        
        <h4>Array Methods and Iteration</h4>
        <div class="code-example">
          <pre><code>// Array iteration
foreach (int num in numbers)
{
    Console.WriteLine(num);
}

// For loop with array
for (int i = 0; i < names.Length; i++)
{
    Console.WriteLine($"Index {i}: {names[i]}");
}

// Array methods
Array.Sort(numbers);          // Sort the array
int index = Array.IndexOf(names, "Bob");  // Find element index
Array.Reverse(values);        // Reverse the array
Array.Fill(numbers, 0);       // Fill array with value
bool exists = Array.Exists(numbers, x => x > 10);  // Check condition

// Copying arrays
int[] numbersCopy = new int[numbers.Length];
Array.Copy(numbers, numbersCopy, numbers.Length);

// Using LINQ with arrays
var evenNumbers = numbers.Where(n => n % 2 == 0).ToArray();</code></pre>
        </div>
        
        <div class="interview-tip">
          <p><span class="interview-icon">🎯</span> <strong>Interview Focus:</strong> Be prepared to discuss the performance characteristics of arrays, when to use different array types, and common array manipulation algorithms.</p>
          <p>Key areas to focus on:</p>
          <ul>
            <li>Memory allocation of different array types</li>
            <li>Choosing between multi-dimensional and jagged arrays</li>
            <li>Common array algorithms (searching, sorting, filtering)</li>
            <li>Performance implications of array operations</li>
          </ul>
        </div>
      `,
          codeExample: `// Comprehensive array examples in C#

public class ArraysDemo
{
    public void BasicArrayOperations()
    {
        Console.WriteLine("=== Basic Array Operations ===");
        
        // Creating and initializing arrays
        int[] numbers = new int[5];  // Array with default values (all 0)
        
        // Initialize with values
        int[] scores = new int[] { 85, 92, 78, 95, 88 };
        
        // Shortened initialization syntax
        string[] days = { "Monday", "Tuesday", "Wednesday", "Thursday", "Friday" };
        
        // Accessing array elements
        Console.WriteLine($"First day: {days[0]}");
        Console.WriteLine($"Third score: {scores[2]}");
        
        // Modifying array elements
        days[4] = "FRIDAY";
        scores[0] += 5;
        
        // Getting array length
        Console.WriteLine($"Number of days: {days.Length}");
        
        // Looping through arrays with for
        Console.WriteLine("\nScores using for loop:");
        for (int i = 0; i < scores.Length; i++)
        {
            Console.WriteLine($"Score {i+1}: {scores[i]}");
        }
        
        // Looping with foreach
        Console.WriteLine("\nDays using foreach loop:");
        foreach (string day in days)
        {
            Console.WriteLine(day);
        }
    }
    
    public void MultiDimensionalArrays()
    {
        Console.WriteLine("\n=== Multi-Dimensional Arrays ===");
        
        // 2D rectangular array (matrix)
        int[,] matrix = new int[3, 4];  // 3 rows, 4 columns
        
        // Initialize with nested loops
        for (int i = 0; i < 3; i++)
        {
            for (int j = 0; j < 4; j++)
            {
                matrix[i, j] = i * 4 + j + 1;
            }
        }
        
        // Initialize with values
        int[,] grid = {
            { 1, 2, 3 },
            { 4, 5, 6 },
            { 7, 8, 9 }
        };
        
        // Access dimensions
        int rows = grid.GetLength(0);
        int columns = grid.GetLength(1);
        Console.WriteLine($"Grid size: {rows} x {columns}");
        
        // Display matrix
        Console.WriteLine("\nMatrix:");
        for (int i = 0; i < 3; i++)
        {
            for (int j = 0; j < 4; j++)
            {
                Console.Write($"{matrix[i, j]}\t");
            }
            Console.WriteLine();
        }
        
        // 3D array
        int[,,] cube = new int[2, 2, 2];
        cube[0, 0, 0] = 1;
        cube[1, 1, 1] = 8;
    }
    
    public void JaggedArrays()
    {
        Console.WriteLine("\n=== Jagged Arrays ===");
        
        // Jagged array (array of arrays)
        int[][] jaggedArray = new int[3][];
        
        // Initialize sub-arrays with different lengths
        jaggedArray[0] = new int[] { 1, 2, 3, 4, 5 };
        jaggedArray[1] = new int[] { 10, 20 };
        jaggedArray[2] = new int[] { 100, 200, 300 };
        
        // Accessing elements
        Console.WriteLine($"jaggedArray[0][3]: {jaggedArray[0][3]}");
        Console.WriteLine($"jaggedArray[2][0]: {jaggedArray[2][0]}");
        
        // Display jagged array
        Console.WriteLine("\nJagged array contents:");
        for (int i = 0; i < jaggedArray.Length; i++)
        {
            Console.Write($"Row {i}: ");
            foreach (int item in jaggedArray[i])
            {
                Console.Write($"{item} ");
            }
            Console.WriteLine();
        }
        
        // Create and initialize in one step
        int[][] numberGrid = new int[][]
        {
            new int[] { 1, 2 },
            new int[] { 3, 4, 5, 6 },
            new int[] { 7 }
        };
    }
    
    public void ArrayMethods()
    {
        Console.WriteLine("\n=== Array Methods ===");
        
        // Sample array
        int[] numbers = { 5, 10, 3, 8, 2, 7, 4 };
        Console.WriteLine("Original array: " + string.Join(", ", numbers));
        
        // Sort
        Array.Sort(numbers);
        Console.WriteLine("Sorted: " + string.Join(", ", numbers));
        
        // Binary search (requires sorted array)
        int index = Array.BinarySearch(numbers, 8);
        Console.WriteLine($"Index of 8: {index}");
        
        // Reverse
        Array.Reverse(numbers);
        Console.WriteLine("Reversed: " + string.Join(", ", numbers));
        
        // Copy
        int[] numbersCopy = new int[numbers.Length];
        Array.Copy(numbers, numbersCopy, numbers.Length);
        Console.WriteLine("Copy: " + string.Join(", ", numbersCopy));
        
        // Clone (shallow copy)
        int[] clone = (int[])numbers.Clone();
        Console.WriteLine("Clone: " + string.Join(", ", clone));
        
        // IndexOf
        int firstIndex = Array.IndexOf(numbers, 7);
        Console.WriteLine($"Index of 7: {firstIndex}");
        
        // Find and FindIndex
        int evenNumber = Array.Find(numbers, n => n % 2 == 0);
        int evenIndex = Array.FindIndex(numbers, n => n % 2 == 0);
        Console.WriteLine($"First even number: {evenNumber} at index: {evenIndex}");
        
        // FindAll
        int[] evenNumbers = Array.FindAll(numbers, n => n % 2 == 0);
        Console.WriteLine("All even numbers: " + string.Join(", ", evenNumbers));
        
        // Fill
        Array.Fill(clone, 0, 0, 3);  // Fill first 3 elements with 0
        Console.WriteLine("After Fill: " + string.Join(", ", clone));
        
        // Resize (creates a new array)
        Array.Resize(ref clone, 10);  // Expand to 10 elements
        Console.WriteLine("After Resize: " + string.Join(", ", clone));
        
        // Clear range
        Array.Clear(clone, 3, 2);  // Clear 2 elements starting at index 3
        Console.WriteLine("After Clear: " + string.Join(", ", clone));
    }
    
    public void ArrayConversionsAndLINQ()
    {
        Console.WriteLine("\n=== Array Conversions and LINQ ===");
        
        // Original array
        int[] numbers = { 1, 2, 3, 4, 5, 6, 7, 8, 9, 10 };
        
        // LINQ with arrays
        // Filter
        var evenNumbers = numbers.Where(n => n % 2 == 0);
        Console.WriteLine("Even numbers: " + string.Join(", ", evenNumbers));
        
        // Transform
        var doubled = numbers.Select(n => n * 2);
        Console.WriteLine("Doubled: " + string.Join(", ", doubled));
        
        // Multiple operations
        var processedNumbers = numbers
            .Where(n => n > 3)
            .Select(n => n * n)
            .OrderByDescending(n => n)
            .Take(3);
        Console.WriteLine("Processed: " + string.Join(", ", processedNumbers));
        
        // Aggregate functions
        int sum = numbers.Sum();
        double average = numbers.Average();
        int max = numbers.Max();
        int min = numbers.Min();
        
        Console.WriteLine($"Sum: {sum}, Average: {average}, Max: {max}, Min: {min}");
        
        // Convert List to Array
        List<string> nameList = new List<string> { "Alice", "Bob", "Charlie" };
        string[] nameArray = nameList.ToArray();
        
        // Convert Array to List
        List<int> numberList = numbers.ToList();
        
        // Convert to Dictionary
        var dictionary = nameArray.Select((name, index) => new { name, index })
                                 .ToDictionary(item => item.index, item => item.name);
        
        foreach (var kvp in dictionary)
        {
            Console.WriteLine($"Key: {kvp.Key}, Value: {kvp.Value}");
        }
    }
    
    public void ArrayPerformanceConsiderations()
    {
        Console.WriteLine("\n=== Array Performance Considerations ===");
        
        // Demonstrate allocation patterns
        
        // Preallocate for known size (more efficient)
        int size = 1000000;
        int[] largeArray = new int[size];
        
        // Time an operation on the array
        var stopwatch = System.Diagnostics.Stopwatch.StartNew();
        
        for (int i = 0; i < size; i++)
        {
            largeArray[i] = i * 2;
        }
        
        stopwatch.Stop();
        Console.WriteLine($"Time to fill array: {stopwatch.ElapsedMilliseconds}ms");
        
        // Jagged vs Multidimensional
        // Jagged arrays are generally more efficient for irregular data
        // and can have better performance for iteration
        const int dim = 1000;
        
        // Compare allocation
        stopwatch.Restart();
        int[,] multiDim = new int[dim, dim];
        stopwatch.Stop();
        Console.WriteLine($"Multidimensional allocation: {stopwatch.ElapsedMilliseconds}ms");
        
        stopwatch.Restart();
        int[][] jagged = new int[dim][];
        for (int i = 0; i < dim; i++)
        {
            jagged[i] = new int[dim];
        }
        stopwatch.Stop();
        Console.WriteLine($"Jagged allocation: {stopwatch.ElapsedMilliseconds}ms");
        
        // Compare access
        stopwatch.Restart();
        for (int i = 0; i < dim; i++)
        {
            for (int j = 0; j < dim; j++)
            {
                multiDim[i, j] = i + j;
            }
        }
        stopwatch.Stop();
        Console.WriteLine($"Multidimensional access: {stopwatch.ElapsedMilliseconds}ms");
        
        stopwatch.Restart();
        for (int i = 0; i < dim; i++)
        {
            for (int j = 0; j < dim; j++)
            {
                jagged[i][j] = i + j;
            }
        }
        stopwatch.Stop();
        Console.WriteLine($"Jagged access: {stopwatch.ElapsedMilliseconds}ms");
    }
}`,
          exercise: {
            instructions:
              "Create a program that demonstrates operations on arrays. Implement functions to create, manipulate, and search arrays. Include examples of single-dimensional, multi-dimensional, and jagged arrays. Implement an algorithm to find the maximum sum subarray (Kadane's algorithm). Create a matrix multiplication function for 2D arrays. Demonstrate the performance differences between different array types.",
          },
        },
        {
          title: 'Lists and Collections',
          explanation: `
        <p>The .NET Framework provides a rich set of collection classes that offer more flexibility and functionality than basic arrays:</p>
        
        <h4>Collection Types Overview</h4>
        <p>C# offers various collection types for different scenarios:</p>

        <p><strong>List&lt;T&gt;:</strong> The most common collection type, a dynamic array that can grow or shrink as needed.</p>

        <p><strong>Dictionary&lt;TKey, TValue&gt;:</strong> Stores key-value pairs for fast lookup by key.</p>

        <p><strong>HashSet&lt;T&gt;:</strong> Stores unique elements with fast lookup, ideal for set operations like union and intersection.</p>

        <p><strong>Queue&lt;T&gt;:</strong> Represents a first-in, first-out (FIFO) collection of elements.</p>

        <p><strong>Stack&lt;T&gt;:</strong> Represents a last-in, first-out (LIFO) collection of elements.</p>

        <p><strong>LinkedList&lt;T&gt;:</strong> A doubly-linked list offering efficient insertions and removals anywhere in the list.</p>

        <h4>List&lt;T&gt;</h4>
        <p>The List&lt;T&gt; class is one of the most widely used collections in C# and offers several advantages over arrays:</p>

        <p><strong>Dynamic sizing:</strong> Lists automatically grow as needed when elements are added.</p>

        <p><strong>Rich API:</strong> Lists provide methods for searching, sorting, filtering, and transforming data.</p>

        <p><strong>Type safety:</strong> Generic Lists provide compile-time type checking.</p>

        <p><strong>Range operations:</strong> Insert, remove, or access ranges of elements.</p>

        <h4>Specialized Collections</h4>
        <p>Beyond the standard collections, .NET provides specialized collections for specific scenarios:</p>

        <p><strong>Concurrent collections:</strong> Thread-safe versions like ConcurrentDictionary for multi-threaded scenarios.</p>

        <p><strong>Immutable collections:</strong> Collections that cannot be modified after creation, ideal for thread safety.</p>

        <p><strong>ReadOnly collections:</strong> Wrappers that provide read-only access to underlying collections.</p>

        <p><strong>Specialized collections:</strong> Like SortedList, SortedDictionary, and SortedSet for maintaining sorted data.</p>
        
        <div class="code-example">
          <pre><code>// List<T> examples
List<int> numbers = new List<int>();  // Empty list
numbers.Add(1);                       // Add elements
numbers.Add(2);
numbers.Add(3);

List<string> names = new List<string> { "Alice", "Bob", "Charlie" };  // With initializer

// List operations
names.Insert(1, "David");             // Insert at index 1
names.RemoveAt(0);                    // Remove at index 0
names.Remove("Charlie");              // Remove specific element
bool contains = names.Contains("Bob"); // Check if contains
int count = names.Count;              // Get count
names.Sort();                         // Sort the list
names.Clear();                        // Remove all elements

// Finding elements
int index = numbers.IndexOf(2);       // Find first occurrence
int last = numbers.LastIndexOf(3);    // Find last occurrence
bool any = numbers.Any(n => n > 2);   // LINQ: any match?
int found = numbers.Find(n => n % 2 == 0); // Find first match</code></pre>
        </div>
        
        <h4>Other Collection Types</h4>
        <div class="code-example">
          <pre><code>// Dictionary<TKey, TValue>
Dictionary<string, int> ages = new Dictionary<string, int>();
ages["Alice"] = 30;  // Add or update
ages.Add("Bob", 25); // Add (throws if key exists)
int aliceAge = ages["Alice"];  // Lookup
bool exists = ages.ContainsKey("Charlie");  // Check key
ages.Remove("Bob");  // Remove by key

// HashSet<T>
HashSet<int> uniqueNumbers = new HashSet<int> { 1, 2, 3 };
uniqueNumbers.Add(2);  // No effect (already exists)
uniqueNumbers.Add(4);  // Added
bool contains = uniqueNumbers.Contains(3);  // Fast lookup
uniqueNumbers.Remove(1);  // Remove element

// Queue<T>
Queue<string> queue = new Queue<string>();
queue.Enqueue("First");  // Add to end
queue.Enqueue("Second");
string next = queue.Peek();  // View next (without removing)
string item = queue.Dequeue();  // Remove and return first

// Stack<T>
Stack<string> stack = new Stack<string>();
stack.Push("First");  // Add to top
stack.Push("Second");
string top = stack.Peek();  // View top (without removing)
string popped = stack.Pop();  // Remove and return top</code></pre>
        </div>
        
        <div class="interview-tip">
          <p><span class="interview-icon">🎯</span> <strong>Interview Focus:</strong> Be prepared to discuss collection selection criteria, performance characteristics, and common usage patterns.</p>
          <p>Interviewers often ask:</p>
          <ul>
            <li>"When would you use a List vs. a LinkedList?"</li>
            <li>"What's the performance of Dictionary operations (add, lookup, remove)?"</li>
            <li>"How would you choose between HashSet and List for a specific scenario?"</li>
            <li>"What collection would you use for implementing a cache system?"</li>
            <li>"How do concurrent collections ensure thread safety?"</li>
          </ul>
        </div>
      `,
          codeExample: `// Comprehensive demonstration of collections in C#

using System;
using System.Collections.Generic;
using System.Linq;
using System.Collections.Concurrent;
using System.Collections.ObjectModel;
using System.Collections.Immutable;

public class CollectionsDemo
{
    public void ListExamples()
    {
        Console.WriteLine("=== List<T> Examples ===");
        
        // Creating Lists
        List<int> numbers = new List<int>();  // Empty list
        List<string> names = new List<string> { "Alice", "Bob", "Charlie" };  // With initializer
        List<double> values = new List<double>(100);  // With initial capacity
        List<int> copied = new List<int>(numbers);  // From another collection
        
        // Adding elements
        numbers.Add(10);
        numbers.Add(20);
        numbers.AddRange(new[] { 30, 40, 50 });  // Add multiple elements
        
        // Inserting elements
        names.Insert(1, "David");  // Insert at index 1
        names.InsertRange(2, new[] { "Eva", "Frank" });  // Insert multiple at index
        
        // Accessing elements
        Console.WriteLine($"First name: {names[0]}");
        Console.WriteLine($"Last number: {numbers[numbers.Count - 1]}");
        
        // Iterating
        Console.WriteLine("\nAll names:");
        foreach (string name in names)
        {
            Console.WriteLine(name);
        }
        
        // Removing elements
        names.Remove("Charlie");  // Remove specific element
        names.RemoveAt(0);  // Remove at index
        names.RemoveAll(n => n.StartsWith("F"));  // Remove all matching
        
        // Removing range
        if (numbers.Count > 2)
        {
            numbers.RemoveRange(0, 2);  // Remove 2 elements starting at index 0
        }
        
        // Finding elements
        bool containsBob = names.Contains("Bob");
        int indexOfDavid = names.IndexOf("David");
        string found = names.Find(n => n.Length > 3);  // First matching
        List<string> longNames = names.FindAll(n => n.Length > 3);  // All matching
        
        // Sorting and reversing
        names.Sort();  // Default sort
        names.Reverse();  // Reverse order
        
        // Custom sorting
        names.Sort((a, b) => b.CompareTo(a));  // Descending sort
        
        // Converting to array
        string[] nameArray = names.ToArray();
        
        // Capacity vs Count
        Console.WriteLine($"Count: {names.Count}, Capacity: {names.Capacity}");
        names.TrimExcess();  // Trim unused space
        Console.WriteLine($"After TrimExcess - Count: {names.Count}, Capacity: {names.Capacity}");
        
        // Clearing
        names.Clear();  // Remove all elements
        Console.WriteLine($"After Clear - Count: {names.Count}");
    }
    
    public void DictionaryExamples()
    {
        Console.WriteLine("\n=== Dictionary<TKey, TValue> Examples ===");
        
        // Creating dictionaries
        Dictionary<string, int> ages = new Dictionary<string, int>();
        Dictionary<int, string> idToName = new Dictionary<int, string>
        {
            { 1, "Apple" },
            { 2, "Banana" },
            { 3, "Cherry" }
        };
        
        // Alternative initializer syntax
        Dictionary<string, bool> settings = new Dictionary<string, bool>
        {
            ["DarkMode"] = true,
            ["Notifications"] = false,
            ["AutoSave"] = true
        };
        
        // Adding entries
        ages.Add("Alice", 30);
        ages["Bob"] = 25;  // Also works for adding
        
        // Updating values
        ages["Alice"] = 31;  // Update
        
        // Safe access with TryGetValue
        if (ages.TryGetValue("Charlie", out int charlieAge))
        {
            Console.WriteLine($"Charlie's age: {charlieAge}");
        }
        else
        {
            Console.WriteLine("Charlie not found");
        }
        
        // Check if key exists
        if (ages.ContainsKey("Bob"))
        {
            Console.WriteLine($"Bob's age: {ages["Bob"]}");
        }
        
        // Iterating
        Console.WriteLine("\nAll entries:");
        foreach (KeyValuePair<string, int> kvp in ages)
        {
            Console.WriteLine($"{kvp.Key}: {kvp.Value}");
        }
        
        // Iterating over just keys or values
        Console.WriteLine("\nAll keys:");
        foreach (string key in ages.Keys)
        {
            Console.WriteLine(key);
        }
        
        Console.WriteLine("\nAll values:");
        foreach (int value in ages.Values)
        {
            Console.WriteLine(value);
        }
        
        // Removing entries
        ages.Remove("Bob");
        
        // Converting to other collections
        List<string> namesList = ages.Keys.ToList();
        
        // Getting entry count
        Console.WriteLine($"Number of entries: {ages.Count}");
        
        // Clearing
        ages.Clear();
    }
    
    public void SetExamples()
    {
        Console.WriteLine("\n=== HashSet<T> and SortedSet<T> Examples ===");
        
        // Creating sets
        HashSet<int> numbers = new HashSet<int> { 1, 2, 3, 1, 2 };  // Duplicates ignored
        Console.WriteLine($"Unique count: {numbers.Count}");  // 3
        
        // Adding elements
        numbers.Add(4);  // Add new
        bool added = numbers.Add(1);  // Try to add existing (returns false)
        Console.WriteLine($"Was 1 added: {added}");  // False
        
        // Checking membership
        bool contains3 = numbers.Contains(3);
        
        // Removing elements
        numbers.Remove(2);
        
        // Set operations
        HashSet<int> setA = new HashSet<int> { 1, 2, 3, 4, 5 };
        HashSet<int> setB = new HashSet<int> { 4, 5, 6, 7, 8 };
        
        // Union: A ∪ B (all elements in either A or B)
        setA.UnionWith(setB);
        Console.WriteLine($"Union: {string.Join(", ", setA)}");  // 1, 2, 3, 4, 5, 6, 7, 8
        
        setA = new HashSet<int> { 1, 2, 3, 4, 5 };  // Reset
        
        // Intersection: A ∩ B (elements in both A and B)
        setA.IntersectWith(setB);
        Console.WriteLine($"Intersection: {string.Join(", ", setA)}");  // 4, 5
        
        setA = new HashSet<int> { 1, 2, 3, 4, 5 };  // Reset
        
        // Difference: A - B (elements in A but not in B)
        setA.ExceptWith(setB);
        Console.WriteLine($"Difference A-B: {string.Join(", ", setA)}");  // 1, 2, 3
        
        // Symmetric Difference: A ∆ B (elements in A or B but not both)
        setA = new HashSet<int> { 1, 2, 3, 4, 5 };  // Reset
        setA.SymmetricExceptWith(setB);
        Console.WriteLine($"Symmetric Difference: {string.Join(", ", setA)}");  // 1, 2, 3, 6, 7, 8
        
        // Check subset/superset
        setA = new HashSet<int> { 1, 2, 3 };
        setB = new HashSet<int> { 1, 2, 3, 4, 5 };
        bool isSubset = setA.IsSubsetOf(setB);
        bool isProperSubset = setA.IsProperSubsetOf(setB);
        bool isSuperset = setB.IsSupersetOf(setA);
        
        Console.WriteLine($"A is subset of B: {isSubset}");  // True
        Console.WriteLine($"A is proper subset of B: {isProperSubset}");  // True
        Console.WriteLine($"B is superset of A: {isSuperset}");  // True
        
        // Sorted set
        SortedSet<string> sortedNames = new SortedSet<string> { "Charlie", "Alice", "Bob" };
        Console.WriteLine($"Sorted names: {string.Join(", ", sortedNames)}");  // Alice, Bob, Charlie
    }
    
    public void QueueStackExamples()
    {
        Console.WriteLine("\n=== Queue<T> and Stack<T> Examples ===");
        
        // Queue (First-In-First-Out)
        Queue<string> queue = new Queue<string>();
        
        // Adding items
        queue.Enqueue("First");
        queue.Enqueue("Second");
        queue.Enqueue("Third");
        
        Console.WriteLine($"Queue count: {queue.Count}");
        
        // Peeking (view next item without removing)
        string next = queue.Peek();
        Console.WriteLine($"Next item: {next}");  // First
        
        // Dequeuing (removing and getting items)
        string first = queue.Dequeue();
        Console.WriteLine($"Dequeued: {first}");  // First
        
        // See what's next now
        next = queue.Peek();
        Console.WriteLine($"Next item now: {next}");  // Second
        
        // Process all items
        Console.WriteLine("\nProcessing queue:");
        while (queue.Count > 0)
        {
            Console.WriteLine(queue.Dequeue());
        }
        
        // Stack (Last-In-First-Out)
        Stack<int> stack = new Stack<int>();
        
        // Pushing items
        stack.Push(1);
        stack.Push(2);
        stack.Push(3);
        
        Console.WriteLine($"Stack count: {stack.Count}");
        
        // Peeking (view top item without removing)
        int top = stack.Peek();
        Console.WriteLine($"Top item: {top}");  // 3
        
        // Popping (removing and getting items)
        int popped = stack.Pop();
        Console.WriteLine($"Popped: {popped}");  // 3
        
        // See what's on top now
        top = stack.Peek();
        Console.WriteLine($"Top item now: {top}");  // 2
        
        // Process all items
        Console.WriteLine("\nProcessing stack:");
        while (stack.Count > 0)
        {
            Console.WriteLine(stack.Pop());
        }
    }
    
    public void LinkedListExamples()
    {
        Console.WriteLine("\n=== LinkedList<T> Examples ===");
        
        // Creating a linked list
        LinkedList<string> linkedList = new LinkedList<string>();
        
        // Adding nodes
        linkedList.AddFirst("First");  // Add to start
        linkedList.AddLast("Last");    // Add to end
        
        // Get references to nodes
        LinkedListNode<string> firstNode = linkedList.First;
        LinkedListNode<string> lastNode = linkedList.Last;
        
        // Insert between nodes
        linkedList.AddAfter(firstNode, "Second");
        linkedList.AddBefore(lastNode, "BeforeLast");
        
        // Traversing forward
        Console.WriteLine("Forward traversal:");
        LinkedListNode<string> current = linkedList.First;
        while (current != null)
        {
            Console.WriteLine(current.Value);
            current = current.Next;
        }
        
        // Traversing backward
        Console.WriteLine("\nBackward traversal:");
        current = linkedList.Last;
        while (current != null)
        {
            Console.WriteLine(current.Value);
            current = current.Previous;
        }
        
        // Find a node
        LinkedListNode<string> node = linkedList.Find("Second");
        if (node != null)
        {
            Console.WriteLine($"Found: {node.Value}");
            
            // Remove node
            linkedList.Remove(node);
        }
        
        // Clear the list
        linkedList.Clear();
    }
    
    public void SpecializedCollections()
    {
        Console.WriteLine("\n=== Specialized Collections ===");
        
        // Sorted collections
        SortedList<int, string> sortedList = new SortedList<int, string>
        {
            { 3, "Three" },
            { 1, "One" },
            { 2, "Two" }
        };
        
        Console.WriteLine("SortedList (by key):");
        foreach (var kvp in sortedList)
        {
            Console.WriteLine($"{kvp.Key}: {kvp.Value}");
        }
        
        SortedDictionary<string, int> sortedDict = new SortedDictionary<string, int>
        {
            { "Charlie", 3 },
            { "Alice", 1 },
            { "Bob", 2 }
        };
        
        Console.WriteLine("\nSortedDictionary (by key):");
        foreach (var kvp in sortedDict)
        {
            Console.WriteLine($"{kvp.Key}: {kvp.Value}");
        }
        
        // Read-only collections
        List<int> originalList = new List<int> { 1, 2, 3 };
        ReadOnlyCollection<int> readOnly = originalList.AsReadOnly();
        
        // originalList.Add(4);  // This affects readOnly too
        Console.WriteLine($"\nReadOnly count: {readOnly.Count}");
        
        // Immutable collections
        ImmutableList<string> immutableList = ImmutableList.Create<string>("One", "Two", "Three");
        
        // Creating a new list with modifications
        ImmutableList<string> newList = immutableList.Add("Four").Remove("One");
        
        Console.WriteLine("\nOriginal immutable list:");
        foreach (var item in immutableList)
        {
            Console.WriteLine(item);
        }
        
        Console.WriteLine("\nNew immutable list:");
        foreach (var item in newList)
        {
            Console.WriteLine(item);
        }
        
// Concurrent collections
        ConcurrentDictionary<string, int> concurrentDict = new ConcurrentDictionary<string, int>();
        
        // Thread-safe operations
        concurrentDict.TryAdd("One", 1);
        
        // Update with factory functions
        concurrentDict.AddOrUpdate(
            "Two", 
            2,                           // Add value if key doesn't exist
            (key, oldValue) => oldValue * 2  // Update function if it does
        );
        
        // Get or add atomically
        int value = concurrentDict.GetOrAdd("Three", 3);
        
        Console.WriteLine("\nConcurrent Dictionary:");
        foreach (var kvp in concurrentDict)
        {
            Console.WriteLine($"{kvp.Key}: {kvp.Value}");
        }
    }
    
    public void CollectionPerformance()
    {
        Console.WriteLine("\n=== Collection Performance Considerations ===");
        
        // Setup for comparison
        const int itemCount = 100000;
        var rand = new Random(42);  // Seed for reproducibility
        
        // Generate test data
        int[] testData = new int[itemCount];
        for (int i = 0; i < itemCount; i++)
        {
            testData[i] = rand.Next(1000000);
        }
        
        // List vs HashSet for lookups
        List<int> list = new List<int>(testData);
        HashSet<int> hashSet = new HashSet<int>(testData);
        
        var sw = System.Diagnostics.Stopwatch.StartNew();
        
        // List lookup (linear time)
        int lookupCount = 1000;
        int foundInList = 0;
        
        sw.Restart();
        for (int i = 0; i < lookupCount; i++)
        {
            int item = rand.Next(1000000);
            if (list.Contains(item))
            {
                foundInList++;
            }
        }
        sw.Stop();
        Console.WriteLine($"List lookups: {sw.ElapsedMilliseconds}ms, Found: {foundInList}/{lookupCount}");
        
        // HashSet lookup (constant time)
        int foundInHashSet = 0;
        
        sw.Restart();
        for (int i = 0; i < lookupCount; i++)
        {
            int item = rand.Next(1000000);
            if (hashSet.Contains(item))
            {
                foundInHashSet++;
            }
        }
        sw.Stop();
        Console.WriteLine($"HashSet lookups: {sw.ElapsedMilliseconds}ms, Found: {foundInHashSet}/{lookupCount}");
        
        // Dictionary vs List for key-value operations
        Dictionary<int, string> dict = new Dictionary<int, string>();
        List<KeyValuePair<int, string>> kvpList = new List<KeyValuePair<int, string>>();
        
        // Prepare data
        for (int i = 0; i < 10000; i++)
        {
            int key = i;
            string value = $"Value-{i}";
            
            dict.Add(key, value);
            kvpList.Add(new KeyValuePair<int, string>(key, value));
        }
        
        // Dictionary lookup
        sw.Restart();
        string result1 = null;
        for (int i = 0; i < 1000; i++)
        {
            int key = rand.Next(10000);
            if (dict.TryGetValue(key, out string value))
            {
                result1 = value;
            }
        }
        sw.Stop();
        Console.WriteLine($"Dictionary lookup: {sw.ElapsedMilliseconds}ms");
        
        // List lookup
        sw.Restart();
        string result2 = null;
        for (int i = 0; i < 1000; i++)
        {
            int key = rand.Next(10000);
            var item = kvpList.FirstOrDefault(kvp => kvp.Key == key);
            if (item.Key == key)  // Found
            {
                result2 = item.Value;
            }
        }
        sw.Stop();
        Console.WriteLine($"List key lookup: {sw.ElapsedMilliseconds}ms");
        
        // LinkedList vs List for insertions/removals in middle
        List<int> insertList = new List<int>();
        LinkedList<int> linkedList = new LinkedList<int>();
        
        // Add initial data
        for (int i = 0; i < 10000; i++)
        {
            insertList.Add(i);
            linkedList.AddLast(i);
        }
        
        // Insert in middle of List
        sw.Restart();
        for (int i = 0; i < 100; i++)
        {
            int position = insertList.Count / 2;
            insertList.Insert(position, 999);
        }
        sw.Stop();
        Console.WriteLine($"List middle insertion: {sw.ElapsedMilliseconds}ms");
        
        // Insert in middle of LinkedList
        sw.Restart();
        for (int i = 0; i < 100; i++)
        {
            // Find middle node (not efficient, but for demo)
            LinkedListNode<int> middle = linkedList.First;
            for (int j = 0; j < linkedList.Count / 2; j++)
            {
                middle = middle.Next;
            }
            
            linkedList.AddBefore(middle, 999);
        }
        sw.Stop();
        Console.WriteLine($"LinkedList middle insertion: {sw.ElapsedMilliseconds}ms");
    }
    
    public void RunAllDemos()
    {
        ListExamples();
        DictionaryExamples();
        SetExamples();
        QueueStackExamples();
        LinkedListExamples();
        SpecializedCollections();
        CollectionPerformance();
    }
}`,
          exercise: {
            instructions:
              'Create a contacts management system that demonstrates the use of different collection types. Implement a Contact class with properties like name, email, and phone number. Create a ContactManager class that allows adding, removing, and searching for contacts. Use appropriate collections for different operations: a List for storing all contacts, a Dictionary for quick lookup by email, and a SortedList for displaying contacts in alphabetical order. Add functionality to organize contacts into groups using a Dictionary of Lists. Ensure your implementation is efficient for the intended operations.',
          },
        },
        {
          title: 'LINQ Basics',
          explanation: `
        <p>Language Integrated Query (LINQ) is a powerful C# feature for working with collections of data using query expressions:</p>
        
        <h4>LINQ Fundamentals</h4>
        <p>LINQ brings database-like query capabilities directly into C#, allowing you to express selection, filtering, and transformation operations declaratively:</p>

        <p><strong>Query syntax:</strong> A SQL-like syntax that uses keywords like from, where, select to define queries. This is often more readable for complex queries.</p>

        <p><strong>Method syntax:</strong> A fluent API approach using extension methods like Where(), Select(), and OrderBy(). This offers more flexibility and is generally preferred for simpler queries.</p>

        <p><strong>Deferred execution:</strong> Most LINQ queries don't execute immediately when defined, but rather when the results are enumerated, allowing for efficient composition of operations.</p>

        <h4>Core LINQ Operations</h4>
        <p>LINQ provides a comprehensive set of operators for working with collections:</p>

        <p><strong>Filtering:</strong> Where() selects elements that meet a specific condition.</p>

        <p><strong>Projection:</strong> Select() transforms each element to a new form.</p>

        <p><strong>Sorting:</strong> OrderBy(), OrderByDescending(), ThenBy() sort elements based on specific criteria.</p>

        <p><strong>Grouping:</strong> GroupBy() organizes elements into groups based on a key.</p>

        <p><strong>Joining:</strong> Join(), GroupJoin() combine elements from multiple collections based on matching keys.</p>

        <p><strong>Set operations:</strong> Distinct(), Union(), Intersect(), Except() perform set-based operations.</p>

        <p><strong>Aggregation:</strong> Count(), Sum(), Average(), Min(), Max() compute scalar values from collections.</p>

        <h4>LINQ Providers</h4>
        <p>LINQ works with different data sources through providers:</p>

        <p><strong>LINQ to Objects:</strong> Works with in-memory collections that implement IEnumerable&lt;T&gt;.</p>

        <p><strong>LINQ to XML:</strong> Works with XML data using the XDocument and XElement classes.</p>

        <p><strong>LINQ to Entities:</strong> Part of Entity Framework for querying databases.</p>

        <p><strong>Custom providers:</strong> Third-party providers for other data sources.</p>
        
        <div class="code-example">
          <pre><code>// Sample data for queries
List<int> numbers = new List<int> { 1, 2, 3, 4, 5, 6, 7, 8, 9, 10 };
List<string> names = new List<string> { "Alice", "Bob", "Charlie", "David", "Emma" };

// LINQ query syntax
var evenNumbers = from n in numbers
                  where n % 2 == 0
                  select n;

// LINQ method syntax
var oddNumbers = numbers.Where(n => n % 2 != 0);

// Projection: transform data
var squares = numbers.Select(n => n * n);

// Multiple operations
var evenSquares = numbers.Where(n => n % 2 == 0)
                          .Select(n => n * n);

// Sorting
var sortedNames = names.OrderBy(name => name.Length)
                        .ThenBy(name => name);

// Aggregation
int sum = numbers.Sum();
double average = numbers.Average();
int max = numbers.Max();</code></pre>
        </div>
        
        <h4>Advanced LINQ Operations</h4>
        <div class="code-example">
          <pre><code>// Grouping
var nameGroups = names.GroupBy(name => name.Length);
foreach (var group in nameGroups)
{
    Console.WriteLine($"Names with {group.Key} characters:");
    foreach (var name in group)
    {
        Console.WriteLine($"  {name}");
    }
}

// Joining collections
List<Student> students = GetStudents();
List<Course> courses = GetCourses();

var studentCourses =
    from student in students
    join course in courses
    on student.CourseId equals course.Id
    select new { StudentName = student.Name, CourseName = course.Name };

// Set operations
List<int> setA = new List<int> { 1, 2, 3, 4, 5 };
List<int> setB = new List<int> { 4, 5, 6, 7, 8 };

var union = setA.Union(setB);               // {1, 2, 3, 4, 5, 6, 7, 8}
var intersection = setA.Intersect(setB);    // {4, 5}
var except = setA.Except(setB);             // {1, 2, 3}</code></pre>
        </div>
        
        <div class="interview-tip">
          <p><span class="interview-icon">🎯</span> <strong>Interview Focus:</strong> Be prepared to discuss deferred vs. immediate execution, query optimization, and when to use LINQ vs. traditional loops.</p>
          <p>Key areas to focus on:</p>
          <ul>
            <li>Understanding how and when LINQ queries are executed</li>
            <li>Performance implications of chaining multiple operations</li>
            <li>Writing complex queries using both query and method syntax</li>
            <li>Transforming data between different structures using LINQ</li>
            <li>Common LINQ debugging techniques</li>
          </ul>
        </div>
      `,
          codeExample: `// Comprehensive LINQ examples in C#

using System;
using System.Collections.Generic;
using System.Linq;

public class LinqDemo
{
    // Sample data classes
    public class Product
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Category { get; set; }
        public decimal Price { get; set; }
        public int Stock { get; set; }
        public bool Discontinued { get; set; }
        
        public override string ToString() => $"{Name} (\${Price:F2})";
    }
    
    public class Customer
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Country { get; set; }
        public List<Order> Orders { get; set; } = new List<Order>();
        
        public override string ToString() => $"{Name} ({Country})";
    }
    
    public class Order
    {
        public int Id { get; set; }
        public int CustomerId { get; set; }
        public DateTime OrderDate { get; set; }
        public decimal TotalAmount { get; set; }
        public List<OrderDetail> Details { get; set; } = new List<OrderDetail>();
        
        public override string ToString() => $"Order #{Id} (\${TotalAmount:F2})";
    }
    
    public class OrderDetail
    {
        public int OrderId { get; set; }
        public int ProductId { get; set; }
        public int Quantity { get; set; }
        public decimal UnitPrice { get; set; }
        
        public decimal Total => Quantity * UnitPrice;
    }
    
    // Sample data
    private List<Product> GetProducts()
    {
        return new List<Product>
        {
            new Product { Id = 1, Name = "Laptop", Category = "Electronics", Price = 1200, Stock = 15, Discontinued = false },
            new Product { Id = 2, Name = "Smartphone", Category = "Electronics", Price = 800, Stock = 25, Discontinued = false },
            new Product { Id = 3, Name = "Headphones", Category = "Electronics", Price = 100, Stock = 30, Discontinued = false },
            new Product { Id = 4, Name = "Mouse", Category = "Electronics", Price = 25, Stock = 50, Discontinued = false },
            new Product { Id = 5, Name = "Keyboard", Category = "Electronics", Price = 50, Stock = 35, Discontinued = false },
            new Product { Id = 6, Name = "Monitor", Category = "Electronics", Price = 300, Stock = 10, Discontinued = false },
            new Product { Id = 7, Name = "T-Shirt", Category = "Clothing", Price = 20, Stock = 100, Discontinued = false },
            new Product { Id = 8, Name = "Jeans", Category = "Clothing", Price = 60, Stock = 40, Discontinued = false },
            new Product { Id = 9, Name = "Socks", Category = "Clothing", Price = 10, Stock = 200, Discontinued = false },
            new Product { Id = 10, Name = "Hat", Category = "Clothing", Price = 15, Stock = 60, Discontinued = false },
            new Product { Id = 11, Name = "Book", Category = "Books", Price = 30, Stock = 75, Discontinued = false },
            new Product { Id = 12, Name = "Desk", Category = "Furniture", Price = 250, Stock = 5, Discontinued = false },
            new Product { Id = 13, Name = "Chair", Category = "Furniture", Price = 150, Stock = 8, Discontinued = false },
            new Product { Id = 14, Name = "Lamp", Category = "Furniture", Price = 40, Stock = 20, Discontinued = false },
            new Product { Id = 15, Name = "Tablet", Category = "Electronics", Price = 350, Stock = 0, Discontinued = true }
        };
    }
    
    private List<Customer> GetCustomers()
    {
        List<Customer> customers = new List<Customer>
        {
            new Customer { Id = 1, Name = "John Smith", Country = "USA" },
            new Customer { Id = 2, Name = "Jane Doe", Country = "USA" },
            new Customer { Id = 3, Name = "Michael Brown", Country = "Canada" },
            new Customer { Id = 4, Name = "Emma Wilson", Country = "UK" },
            new Customer { Id = 5, Name = "Luis Rodriguez", Country = "Mexico" }
        };
        
        List<Order> orders = new List<Order>
        {
            new Order { Id = 1, CustomerId = 1, OrderDate = new DateTime(2023, 1, 15), TotalAmount = 1250 },
            new Order { Id = 2, CustomerId = 1, OrderDate = new DateTime(2023, 2, 10), TotalAmount = 150 },
            new Order { Id = 3, CustomerId = 2, OrderDate = new DateTime(2023, 1, 5), TotalAmount = 550 },
            new Order { Id = 4, CustomerId = 3, OrderDate = new DateTime(2023, 2, 20), TotalAmount = 800 },
            new Order { Id = 5, CustomerId = 4, OrderDate = new DateTime(2023, 2, 25), TotalAmount = 240 },
            new Order { Id = 6, CustomerId = 4, OrderDate = new DateTime(2023, 3, 10), TotalAmount = 475 },
            new Order { Id = 7, CustomerId = 5, OrderDate = new DateTime(2023, 3, 5), TotalAmount = 120 }
        };
        
        // Add orders to customers
        foreach (var order in orders)
        {
            var customer = customers.FirstOrDefault(c => c.Id == order.CustomerId);
            if (customer != null)
            {
                customer.Orders.Add(order);
            }
        }
        
        return customers;
    }
    
    public void BasicQuerying()
    {
        Console.WriteLine("=== Basic Querying Examples ===\n");
        
        // Get sample data
        var products = GetProducts();
        
        // 1. Simple filtering (Query syntax)
        Console.WriteLine("Electronics products (Query syntax):");
        var electronicsQuery = from p in products
                              where p.Category == "Electronics"
                              select p;
        
        foreach (var p in electronicsQuery)
        {
            Console.WriteLine($"- {p}");
        }
        
        // 2. Same query using method syntax
        Console.WriteLine("\nElectronics products (Method syntax):");
        var electronicsMethod = products.Where(p => p.Category == "Electronics");
        
        foreach (var p in electronicsMethod)
        {
            Console.WriteLine($"- {p}");
        }
        
        // 3. Basic projection (select specific properties)
        Console.WriteLine("\nProduct names and prices:");
        var productInfos = products
            .Select(p => new { p.Name, p.Price })
            .ToList();
            
        foreach (var info in productInfos)
        {
            Console.WriteLine($"- {info.Name}: \${info.Price:F2}");
        }
        
        // 4. Sorting
        Console.WriteLine("\nProducts by price (ascending):");
        var sortedByPrice = products
            .OrderBy(p => p.Price)
            .ToList();
            
        foreach (var p in sortedByPrice.Take(5))  // Just show first 5
        {
            Console.WriteLine($"- {p}");
        }
        
        // 5. Multiple sorting criteria
        Console.WriteLine("\nProducts sorted by category, then by price descending:");
        var sortedByMultiple = products
            .OrderBy(p => p.Category)
            .ThenByDescending(p => p.Price)
            .ToList();
            
        foreach (var p in sortedByMultiple)
        {
            Console.WriteLine($"- [{p.Category}] {p.Name} (\${p.Price:F2})");
        }
        
        // 6. Basic aggregation
        decimal averagePrice = products.Average(p => p.Price);
        decimal totalInventoryValue = products.Sum(p => p.Price * p.Stock);
        int productCount = products.Count();
        int electronicsCount = products.Count(p => p.Category == "Electronics");
        
        Console.WriteLine("\nAggregation results:");
        Console.WriteLine($"- Average product price: \${averagePrice:F2}");
        Console.WriteLine($"- Total inventory value: \${totalInventoryValue:F2}");
        Console.WriteLine($"- Product count: {productCount}");
        Console.WriteLine($"- Electronics product count: {electronicsCount}");
    }
    
    public void FilteringOperations()
    {
        Console.WriteLine("\n=== Filtering Operations ===\n");
        
        var products = GetProducts();
        
        // 1. Basic Where
        Console.WriteLine("Products over $100:");
        var expensiveProducts = products.Where(p => p.Price > 100);
        
        foreach (var p in expensiveProducts)
        {
            Console.WriteLine($"- {p}");
        }
        
        // 2. Multiple conditions
        Console.WriteLine("\nAvailable electronics under $100:");
        var availableElectronics = products.Where(p => 
            p.Category == "Electronics" && 
            p.Price < 100 &&
            p.Stock > 0 &&
            !p.Discontinued);
            
        foreach (var p in availableElectronics)
        {
            Console.WriteLine($"- {p}");
        }
        
        // 3. Take and Skip for pagination
        Console.WriteLine("\nPagination (Page 1, 5 items per page):");
        var page1 = products.OrderBy(p => p.Id).Take(5);
        
        foreach (var p in page1)
        {
            Console.WriteLine($"- {p}");
        }
        
        Console.WriteLine("\nPagination (Page 2, 5 items per page):");
        var page2 = products.OrderBy(p => p.Id).Skip(5).Take(5);
        
        foreach (var p in page2)
        {
            Console.WriteLine($"- {p}");
        }
        
        // 4. First, Last, Single, and Default variants
        try
        {
            // First: returns the first element or throws exception
            var firstProduct = products.First();
            var firstExpensive = products.First(p => p.Price > 1000);
            
            // FirstOrDefault: returns the first element or default value
            var firstClothing = products.FirstOrDefault(p => p.Category == "Clothing");
            var firstFood = products.FirstOrDefault(p => p.Category == "Food"); // null
            
            Console.WriteLine("\nFirst and FirstOrDefault:");
            Console.WriteLine($"- First product: {firstProduct}");
            Console.WriteLine($"- First expensive product: {firstExpensive}");
            Console.WriteLine($"- First clothing product: {firstClothing}");
            Console.WriteLine($"- First food product: {firstFood ?? (Product)null}");
            
            // Last and LastOrDefault
            var lastProduct = products.Last();
            var lastCheap = products.LastOrDefault(p => p.Price < 20);
            
            Console.WriteLine("\nLast and LastOrDefault:");
            Console.WriteLine($"- Last product: {lastProduct}");
            Console.WriteLine($"- Last cheap product: {lastCheap}");
            
            // Single and SingleOrDefault (throws if more than one match)
            var discontinuedTablet = products.Single(p => 
                p.Name == "Tablet" && p.Discontinued);
                
            var food = products.SingleOrDefault(p => p.Category == "Food"); // null
            
            Console.WriteLine("\nSingle and SingleOrDefault:");
            Console.WriteLine($"- Discontinued tablet: {discontinuedTablet}");
            Console.WriteLine($"- Food product: {food ?? (Product)null}");
        }
        catch (Exception ex)
        {
            Console.WriteLine($"Error: {ex.Message}");
        }
        
        // 5. ElementAt and ElementAtOrDefault
        try
        {
            var thirdProduct = products.ElementAt(2);
            var tenthProduct = products.ElementAt(9);
            var twentiethProduct = products.ElementAtOrDefault(19); // null/default
            
            Console.WriteLine("\nElementAt and ElementAtOrDefault:");
            Console.WriteLine($"- Third product: {thirdProduct}");
            Console.WriteLine($"- Tenth product: {tenthProduct}");
            Console.WriteLine($"- Twentieth product: {twentiethProduct ?? (Product)null}");
        }
        catch (Exception ex)
        {
            Console.WriteLine($"Error: {ex.Message}");
        }
    }
    
    public void ProjectionOperations()
    {
        Console.WriteLine("\n=== Projection Operations ===\n");
        
        var products = GetProducts();
        
        // 1. Basic Select
        Console.WriteLine("Product names only:");
        var productNames = products.Select(p => p.Name);
        
        foreach (var name in productNames)
        {
            Console.WriteLine($"- {name}");
        }
        
        // 2. Select with transformation
        Console.WriteLine("\nProducts with discount applied:");
        var discountedProducts = products.Select(p => new
        {
            Name = p.Name,
            Category = p.Category,
            OriginalPrice = p.Price,
            DiscountedPrice = p.Price * 0.9m
        });
        
        foreach (var p in discountedProducts)
        {
            Console.WriteLine($"- {p.Name}: \${p.OriginalPrice:F2} -> \${p.DiscountedPrice:F2}");
        }
        
        // 3. Select with index
        Console.WriteLine("\nProducts with ranking:");
        var rankedProducts = products
            .OrderByDescending(p => p.Price)
            .Select((p, index) => new
            {
                Rank = index + 1,
                p.Name,
                p.Price
            });
            
        foreach (var p in rankedProducts)
        {
            Console.WriteLine($"- #{p.Rank}: {p.Name} (\${p.Price:F2})");
        }
        
        // 4. SelectMany (flatten nested collections)
        var customers = GetCustomers();
        
        Console.WriteLine("\nAll orders across all customers:");
        var allOrders = customers.SelectMany(c => c.Orders);
        
        foreach (var order in allOrders)
        {
            Console.WriteLine($"- Order #{order.Id}: \${order.TotalAmount:F2} ({order.OrderDate.ToShortDateString()})");
        }
        
        // 5. SelectMany with result selector
        Console.WriteLine("\nCustomers and their orders:");
        var customerOrders = customers.SelectMany(
            c => c.Orders,
            (customer, order) => new 
            { 
                CustomerName = customer.Name, 
                OrderId = order.Id,
                Amount = order.TotalAmount,
                Date = order.OrderDate
            });
            
        foreach (var co in customerOrders)
        {
            Console.WriteLine($"- {co.CustomerName}: Order #{co.OrderId}, \${co.Amount:F2} ({co.Date.ToShortDateString()})");
        }
    }
    
    public void GroupingOperations()
    {
        Console.WriteLine("\n=== Grouping Operations ===\n");
        
        var products = GetProducts();
        
        // 1. Basic GroupBy
        Console.WriteLine("Products grouped by category:");
        var productsByCategory = products.GroupBy(p => p.Category);
        
        foreach (var group in productsByCategory)
        {
            Console.WriteLine($"\nCategory: {group.Key} ({group.Count()} products)");
            foreach (var product in group)
            {
                Console.WriteLine($"- {product}");
            }
        }
        
        // 2. GroupBy with element selection
        Console.WriteLine("\nProduct names by category:");
        var namesByCategory = products.GroupBy(
            p => p.Category,
            p => p.Name);
            
        foreach (var group in namesByCategory)
        {
            Console.WriteLine($"{group.Key}: {string.Join(", ", group)}");
        }
        
        // 3. GroupBy with result selection
        Console.WriteLine("\nCategory statistics:");
        var categoryStats = products.GroupBy(
            p => p.Category,
            (key, g) => new
            {
                Category = key,
                Count = g.Count(),
                AveragePrice = g.Average(p => p.Price),
                TotalValue = g.Sum(p => p.Price * p.Stock)
            });
            
        foreach (var stat in categoryStats)
        {
            Console.WriteLine($"- {stat.Category}: {stat.Count} products, Avg: \${stat.AveragePrice:F2}, Total value: \${stat.TotalValue:F2}");
        }
        
        // 4. Nested GroupBy
        var customers = GetCustomers();
        
        Console.WriteLine("\nCustomers by country and month of order:");
        var nestedGroups = customers
            .GroupBy(c => c.Country)
            .Select(countryGroup => new
            {
                Country = countryGroup.Key,
                CustomerCount = countryGroup.Count(),
                OrdersByMonth = countryGroup
                    .SelectMany(c => c.Orders)
                    .GroupBy(o => o.OrderDate.Month)
                    .Select(monthGroup => new
                    {
                        Month = monthGroup.Key,
                        OrderCount = monthGroup.Count(),
                        TotalAmount = monthGroup.Sum(o => o.TotalAmount)
                    })
                    .OrderBy(m => m.Month)
            });
            
        foreach (var countryGroup in nestedGroups)
        {
            Console.WriteLine($"\n{countryGroup.Country} ({countryGroup.CustomerCount} customers)");
            
            foreach (var monthGroup in countryGroup.OrdersByMonth)
            {
                string monthName = new DateTime(2023, monthGroup.Month, 1).ToString("MMMM");
                Console.WriteLine($"- {monthName}: {monthGroup.OrderCount} orders, \${monthGroup.TotalAmount:F2}");
            }
        }
    }
    
    public void JoinOperations()
    {
        Console.WriteLine("\n=== Join Operations ===\n");
        
        var products = GetProducts();
        var customers = GetCustomers();
        var orders = customers.SelectMany(c => c.Orders).ToList();
        
        // Create order details for the example
        var orderDetails = new List<OrderDetail>
        {
            new OrderDetail { OrderId = 1, ProductId = 1, Quantity = 1, UnitPrice = 1200 },
            new OrderDetail { OrderId = 1, ProductId = 5, Quantity = 1, UnitPrice = 50 },
            new OrderDetail { OrderId = 2, ProductId = 3, Quantity = 1, UnitPrice = 100 },
            new OrderDetail { OrderId = 2, ProductId = 9, Quantity = 5, UnitPrice = 10 },
            new OrderDetail { OrderId = 3, ProductId = 2, Quantity = 1, UnitPrice = 800 },
            new OrderDetail { OrderId = 4, ProductId = 6, Quantity = 2, UnitPrice = 300 },
            new OrderDetail { OrderId = 4, ProductId = 14, Quantity = 5, UnitPrice = 40 },
            new OrderDetail { OrderId = 5, ProductId = 7, Quantity = 3, UnitPrice = 20 },
            new OrderDetail { OrderId = 5, ProductId = 10, Quantity = 2, UnitPrice = 15 },
            new OrderDetail { OrderId = 5, ProductId = 11, Quantity = 5, UnitPrice = 30 },
            new OrderDetail { OrderId = 6, ProductId = 7, Quantity = 5, UnitPrice = 95 },
            new OrderDetail { OrderId = 7, ProductId = 9, Quantity = 12, UnitPrice = 10 }
        };
        
        // Assign details to corresponding orders
        foreach (var detail in orderDetails)
        {
            var order = orders.FirstOrDefault(o => o.Id == detail.OrderId);
            if (order != null)
            {
                order.Details.Add(detail);
            }
        }
        
        // 1. Inner Join
        Console.WriteLine("Order details with product names (Inner Join):");
        var orderProductDetails = orderDetails.Join(
            products,
            od => od.ProductId,
            p => p.Id,
            (orderDetail, product) => new
            {
                OrderId = orderDetail.OrderId,
                ProductName = product.Name,
                Quantity = orderDetail.Quantity,
                UnitPrice = orderDetail.UnitPrice,
                TotalPrice = orderDetail.Quantity * orderDetail.UnitPrice
            });
            
        foreach (var detail in orderProductDetails)
        {
            Console.WriteLine($"- Order #{detail.OrderId}: {detail.Quantity} x {detail.ProductName} = \${detail.TotalPrice:F2}");
        }
        
        // 2. Group Join (similar to LEFT OUTER JOIN)
        Console.WriteLine("\nOrders with their details (Group Join):");
        var ordersWithDetails = orders.Take(3).GroupJoin(
            orderDetails,
            o => o.Id,
            od => od.OrderId,
            (order, details) => new
            {
                OrderId = order.Id,
                CustomerName = customers.First(c => c.Id == order.CustomerId).Name,
                OrderDate = order.OrderDate,
                TotalAmount = order.TotalAmount,
                DetailCount = details.Count(),
                Details = details.Join(
                    products,
                    d => d.ProductId,
                    p => p.Id,
                    (detail, product) => new
                    {
                        product.Name,
                        detail.Quantity,
                        LineTotal = detail.Quantity * detail.UnitPrice
                    })
            });
            
        foreach (var order in ordersWithDetails)
        {
            Console.WriteLine($"\nOrder #{order.OrderId} - {order.CustomerName} - {order.OrderDate.ToShortDateString()} - \${order.TotalAmount:F2}");
            Console.WriteLine($"Items ({order.DetailCount}):");
            
            foreach (var item in order.Details)
            {
                Console.WriteLine($"- {item.Quantity} x {item.Name} = \${item.LineTotal:F2}");
            }
        }
        
        // 3. Left Outer Join (using GroupJoin + SelectMany)
        Console.WriteLine("\nCustomers with orders (including those with no orders):");
        var customersWithOrders = customers.GroupJoin(
            orders,
            c => c.Id,
            o => o.CustomerId,
            (customer, custOrders) => new 
            { 
                Customer = customer, 
                Orders = custOrders.DefaultIfEmpty()
            })
            .SelectMany(
                co => co.Orders,
                (co, order) => new 
                { 
                    CustomerName = co.Customer.Name, 
                    CustomerCountry = co.Customer.Country,
                    OrderId = order?.Id,
                    OrderAmount = order?.TotalAmount ?? 0,
                    HasOrders = order != null
                });
                
        foreach (var co in customersWithOrders)
        {
            if (co.HasOrders)
            {
                Console.WriteLine($"- {co.CustomerName} ({co.CustomerCountry}): Order #{co.OrderId}, \${co.OrderAmount:F2}");
            }
            else
            {
                Console.WriteLine($"- {co.CustomerName} ({co.CustomerCountry}): No orders");
            }
        }
        
        // 4. Composite key join
        Console.WriteLine("\nJoin with composite keys (multiple conditions):");
        var compositeJoin = products.Join(
            orderDetails.Where(od => od.Quantity > 3),
            p => new { ProductId = p.Id, Category = p.Category },
            od => new { ProductId = od.ProductId, Category = GetProductCategory(products, od.ProductId) },
            (product, detail) => new
            {
                product.Name,
                product.Category,
                OrderId = detail.OrderId,
                detail.Quantity
            });
            
        foreach (var item in compositeJoin)
        {
            Console.WriteLine($"- Order #{item.OrderId}: {item.Quantity} x {item.Name} ({item.Category})");
        }
    }
    
    // Helper for the composite key join example
    private string GetProductCategory(List<Product> products, int productId)
    {
        var product = products.FirstOrDefault(p => p.Id == productId);
        return product?.Category ?? "";
    }
    
    public void SetOperations()
    {
        Console.WriteLine("\n=== Set Operations ===\n");
        
        var products = GetProducts();
        
        // Sample data for set operations
        var popularProductIds = new List<int> { 1, 2, 3, 7, 11 };
        var discountedProductIds = new List<int> { 3, 7, 8, 9, 10 };
        var discontinuedProductIds = new List<int> { 15 };
        
        // Get the actual product sets
        var popularProducts = products.Where(p => popularProductIds.Contains(p.Id));
        var discountedProducts = products.Where(p => discountedProductIds.Contains(p.Id));
        var discontinuedProducts = products.Where(p => discontinuedProductIds.Contains(p.Id));
        
        // 1. Distinct
        Console.WriteLine("Categories (distinct):");
        var categories = products.Select(p => p.Category).Distinct();
        
        foreach (var category in categories)
        {
            Console.WriteLine($"- {category}");
        }
        
        // 2. Union (with distinct elements)
        Console.WriteLine("\nPopular OR discounted products (Union):");
        var popularOrDiscounted = popularProducts
            .Union(discountedProducts)
            .OrderBy(p => p.Id);
            
        foreach (var product in popularOrDiscounted)
        {
            Console.WriteLine($"- {product}");
        }
        
        // 3. Intersect (elements in both sets)
        Console.WriteLine("\nBoth popular AND discounted products (Intersect):");
        var popularAndDiscounted = popularProducts
            .Intersect(discountedProducts)
            .OrderBy(p => p.Id);
            
        foreach (var product in popularAndDiscounted)
        {
            Console.WriteLine($"- {product}");
        }
        
        // 4. Except (elements in first set but not in second)
        Console.WriteLine("\nPopular but NOT discounted (Except):");
        var popularButNotDiscounted = popularProducts
            .Except(discountedProducts)
            .OrderBy(p => p.Id);
            
        foreach (var product in popularButNotDiscounted)
        {
            Console.WriteLine($"- {product}");
        }
        
        // 5. Concat (with duplicates, not a true set operation)
        Console.WriteLine("\nPopular products + Discounted products (Concat):");
        var allPromotionalProducts = popularProducts
            .Concat(discountedProducts)
            .OrderBy(p => p.Id);
            
        foreach (var product in allPromotionalProducts)
        {
            Console.WriteLine($"- {product}");
        }
        
        // 6. SequenceEqual
        var discontinuedProductsCopy = products.Where(p => p.Discontinued);
        bool sequencesEqual = discontinuedProducts.SequenceEqual(discontinuedProductsCopy);
        
        Console.WriteLine($"\nAre the discontinued product sequences equal? {sequencesEqual}");
    }
    
    public void AggregateOperations()
    {
        Console.WriteLine("\n=== Aggregate Operations ===\n");
        
        var products = GetProducts();
        var customers = GetCustomers();
        
        // Basic aggregations
        int totalProducts = products.Count();
        int inStockCount = products.Count(p => p.Stock > 0);
        decimal totalValue = products.Sum(p => p.Price * p.Stock);
        decimal avgPrice = products.Average(p => p.Price);
        decimal minPrice = products.Min(p => p.Price);
        decimal maxPrice = products.Max(p => p.Price);
        
        Console.WriteLine("Basic aggregation results:");
        Console.WriteLine($"- Total products: {totalProducts}");
        Console.WriteLine($"- Products in stock: {inStockCount}");
        Console.WriteLine($"- Total inventory value: \${totalValue:F2}");
        Console.WriteLine($"- Average price: \${avgPrice:F2}");
        Console.WriteLine($"- Price range: \${minPrice:F2} - \${maxPrice:F2}");
        
        // Aggregate by category
        Console.WriteLine("\nAggregate results by category:");
        var categoryStats = products
            .GroupBy(p => p.Category)
            .Select(g => new
            {
                Category = g.Key,
                Count = g.Count(),
                InStock = g.Count(p => p.Stock > 0),
                TotalValue = g.Sum(p => p.Price * p.Stock),
                AveragePrice = g.Average(p => p.Price),
                MinPrice = g.Min(p => p.Price),
                MaxPrice = g.Max(p => p.Price)
            })
            .OrderByDescending(g => g.TotalValue);
            
        foreach (var stat in categoryStats)
        {
            Console.WriteLine($"\n{stat.Category}:");
            Console.WriteLine($"- Products: {stat.Count} (In stock: {stat.InStock})");
            Console.WriteLine($"- Total value: \${stat.TotalValue:F2}");
            Console.WriteLine($"- Average price: \${stat.AveragePrice:F2}");
            Console.WriteLine($"- Price range: \${stat.MinPrice:F2} - \${stat.MaxPrice:F2}");
        }
        
        // Aggregate across multiple collections
        Console.WriteLine("\nCustomer order statistics:");
        var customerStats = customers
            .Select(c => new
            {
                c.Name,
                c.Country,
                OrderCount = c.Orders.Count,
                TotalSpent = c.Orders.Sum(o => o.TotalAmount),
                AverageOrderValue = c.Orders.Any() 
                    ? c.Orders.Average(o => o.TotalAmount) 
                    : 0,
                LargestOrder = c.Orders.Any() 
                    ? c.Orders.Max(o => o.TotalAmount) 
                    : 0
            })
            .OrderByDescending(c => c.TotalSpent);
            
        foreach (var customer in customerStats)
        {
            Console.WriteLine($"\n{customer.Name} ({customer.Country}):");
            Console.WriteLine($"- Orders: {customer.OrderCount}");
            Console.WriteLine($"- Total spent: \${customer.TotalSpent:F2}");
            
            if (customer.OrderCount > 0)
            {
                Console.WriteLine($"- Average order: \${customer.AverageOrderValue:F2}");
                Console.WriteLine($"- Largest order: \${customer.LargestOrder:F2}");
            }
        }
        
        // Custom aggregation with Aggregate method
        Console.WriteLine("\nCustom aggregate examples:");
        
        // 1. Computing a sum manually
        decimal totalInventory = products.Aggregate(0m, 
            (total, product) => total + (product.Price * product.Stock));
            
        Console.WriteLine($"- Total inventory value: \${totalInventory:F2}");
        
        // 2. Finding most expensive product
        Product mostExpensive = products.Aggregate((p1, p2) => p1.Price > p2.Price ? p1 : p2);
        Console.WriteLine($"- Most expensive product: {mostExpensive}");
        
        // 3. Building a string (comma-separated categories)
        string allCategories = products
            .Select(p => p.Category)
            .Distinct()
            .OrderBy(c => c)
            .Aggregate((c1, c2) => c1 + ", " + c2);
            
        Console.WriteLine($"- All categories: {allCategories}");
        
        // 4. Computing multiple values in one pass
        var productStats = products.Aggregate(
            // Seed value (tuple with initial values)
            (Count: 0, InStock: 0, TotalValue: 0m, MinPrice: decimal.MaxValue, MaxPrice: decimal.MinValue),
            
            // Accumulation function
            (stats, product) => (
                Count: stats.Count + 1,
                InStock: stats.InStock + (product.Stock > 0 ? 1 : 0),
                TotalValue: stats.TotalValue + (product.Price * product.Stock),
                MinPrice: Math.Min(stats.MinPrice, product.Price),
                MaxPrice: Math.Max(stats.MaxPrice, product.Price)
            ),
            
            // Result selector (optional)
            stats => stats
        );
        
        Console.WriteLine("\nProduct statistics (calculated in one pass):");
        Console.WriteLine($"- Total products: {productStats.Count}");
        Console.WriteLine($"- Products in stock: {productStats.InStock}");
        Console.WriteLine($"- Total inventory value: \${productStats.TotalValue:F2}");
        Console.WriteLine($"- Price range: \${productStats.MinPrice:F2} - \${productStats.MaxPrice:F2}");
    }
    
    public void QueryExecution()
    {
        Console.WriteLine("\n=== Query Execution Examples ===\n");
        
        var products = GetProducts();
        
        // 1. Deferred execution example
        Console.WriteLine("Deferred Execution Demonstration:");
        
        Console.WriteLine("\nDefining query...");
        // Query is defined but not executed yet
        var expensiveProducts = products.Where(p => {
            Console.WriteLine($"Evaluating: {p.Name}");
            return p.Price > 100;
        });
        
        Console.WriteLine("\nQuery defined but not executed yet.");
        
        // First execution happens here
        Console.WriteLine("\nExecuting query first time (Count):");
        int count = expensiveProducts.Count();
        Console.WriteLine($"Found {count} expensive products");
        
        // Second execution - the query runs again
        Console.WriteLine("\nExecuting query second time (Foreach):");
        foreach (var p in expensiveProducts.Take(3))
        {
            Console.WriteLine($"- {p}");
        }
        
        // 2. Immediate execution with ToList, ToArray, ToDictionary
        Console.WriteLine("\nImmediate Execution Examples:");
        
        Console.WriteLine("\nExecuting with ToList()...");
        var electronicsList = products
            .Where(p => {
                Console.WriteLine($"Filtering: {p.Name}");
                return p.Category == "Electronics";
            })
            .ToList(); // Executes the query immediately
        
        Console.WriteLine("\nQuery has been executed and results stored.");
        Console.WriteLine($"Found {electronicsList.Count} electronics products");
        
        // Using the cached results - no filtering happens
        Console.WriteLine("\nUsing cached results (no filtering calls):");
        foreach (var p in electronicsList.Take(3))
        {
            Console.WriteLine($"- {p}");
        }
        
        // 3. Modifying source data after query definition
        Console.WriteLine("\nModifying Source Data After Query Definition:");
        
        var cheapProducts = products.Where(p => p.Price < 50);
        
        Console.WriteLine($"Before modification: {cheapProducts.Count()} cheap products");
        
        // Modify source data
        foreach (var product in products.Where(p => p.Price < 50).ToList())
        {
            product.Price *= 1.5m; // 50% price increase
        }
        
        // Query re-evaluates against modified data
        Console.WriteLine($"After modification: {cheapProducts.Count()} cheap products");
        
        // 4. Query composition
        Console.WriteLine("\nQuery Composition Example:");
        
        // Base query
        var inStockQuery = products.Where(p => {
            Console.WriteLine($"Checking stock for: {p.Name}");
            return p.Stock > 0;
        });
        
        Console.WriteLine("\nBuilding on base query...");
        
        // Derived query 1
        var inStockElectronics = inStockQuery.Where(p => {
            Console.WriteLine($"Checking category for: {p.Name}");
            return p.Category == "Electronics";
        });
        
        // Derived query 2
        var inStockClothing = inStockQuery.Where(p => {
            Console.WriteLine($"Checking category for: {p.Name}");
            return p.Category == "Clothing";
        });
        
        Console.WriteLine("\nExecuting first derived query:");
        Console.WriteLine($"In-stock electronics count: {inStockElectronics.Count()}");
        
        Console.WriteLine("\nExecuting second derived query:");
        Console.WriteLine($"In-stock clothing count: {inStockClothing.Count()}");
    }
    
    public void LinqPerformanceConsiderations()
    {
        Console.WriteLine("\n=== LINQ Performance Considerations ===\n");
        
        // Generate large test data
        const int Count = 1000000;
        Console.WriteLine($"Generating test data with {Count:N0} elements...");
        
        var random = new Random(42); // Seed for reproducibility
        var largeList = Enumerable.Range(1, Count)
            .Select(i => new 
            {
                Id = i,
                Value = random.Next(1, 1000),
                Text = $"Item {i}",
                Category = (i % 10) switch
                {
                    0 => "A",
                    1 => "B",
                    2 => "C",
                    _ => "D"
                }
            })
            .ToList();
            
        var stopwatch = new System.Diagnostics.Stopwatch();
        
        // 1. Filter early vs. filter late
        Console.WriteLine("\nFilter Early vs. Filter Late:");
        
        // Filter late (inefficient)
        stopwatch.Restart();
        var filterLateCount = largeList
            .Select(item => new { item.Id, item.Text, item.Category })
            .Where(item => item.Category == "A")
            .Count();
        stopwatch.Stop();
        
        Console.WriteLine($"- Filter late: {stopwatch.ElapsedMilliseconds}ms ({filterLateCount:N0} items)");
        
        // Filter early (efficient)
        stopwatch.Restart();
        var filterEarlyCount = largeList
            .Where(item => item.Category == "A")
            .Select(item => new { item.Id, item.Text, item.Category })
            .Count();
        stopwatch.Stop();
        
        Console.WriteLine($"- Filter early: {stopwatch.ElapsedMilliseconds}ms ({filterEarlyCount:N0} items)");
        
        // 2. Multiple iterations vs. storing results
        Console.WriteLine("\nMultiple Iterations vs. Storing Results:");
        
        var categoryA = largeList.Where(item => item.Category == "A");
        
        // Multiple iterations (inefficient)
        stopwatch.Restart();
        var avgValue = categoryA.Average(item => item.Value);
        var minValue = categoryA.Min(item => item.Value);
        var maxValue = categoryA.Max(item => item.Value);
        stopwatch.Stop();
        
        Console.WriteLine($"- Multiple iterations: {stopwatch.ElapsedMilliseconds}ms");
        Console.WriteLine($"  Avg: {avgValue:F2}, Min: {minValue}, Max: {maxValue}");
        
        // Store results (efficient)
        stopwatch.Restart();
        var categoryAList = categoryA.ToList(); // Store once
        avgValue = categoryAList.Average(item => item.Value);
        minValue = categoryAList.Min(item => item.Value);
        maxValue = categoryAList.Max(item => item.Value);
        stopwatch.Stop();
        
        Console.WriteLine($"- Store results first: {stopwatch.ElapsedMilliseconds}ms");
        Console.WriteLine($"  Avg: {avgValue:F2}, Min: {minValue}, Max: {maxValue}");
        
        // 3. LINQ method selection (specialized vs. general)
        Console.WriteLine("\nSpecialized vs. General Methods:");
        
        // General method (Any with predicate)
        stopwatch.Restart();
        bool anyAbove500General = largeList.Any(item => item.Value > 500);
        stopwatch.Stop();
        
        Console.WriteLine($"- Any with predicate: {stopwatch.ElapsedMilliseconds}ms");
        
        // More specialized (Where + Any without predicate)
        stopwatch.Restart();
        bool anyAbove500Specialized = largeList
            .Where(item => item.Value > 500)
            .Any();
        stopwatch.Stop();
        
        Console.WriteLine($"- Where + Any: {stopwatch.ElapsedMilliseconds}ms");
        
        // 4. Using appropriate methods for early termination
        Console.WriteLine("\nEarly Termination Optimization:");
        
        // Count all elements (inefficient if we just need to know if > 100)
        stopwatch.Restart();
        bool moreThan100Inefficient = largeList.Count(item => item.Value > 800) > 100;
        stopwatch.Stop();
        
        Console.WriteLine($"- Using Count: {stopwatch.ElapsedMilliseconds}ms");
        
        // Take + Count (more efficient)
        stopwatch.Restart();
        bool moreThan100Efficient = largeList.Where(item => item.Value > 800).Take(101).Count() > 100;
        stopwatch.Stop();
        
        Console.WriteLine($"- Using Take + Count: {stopwatch.ElapsedMilliseconds}ms");
        
        // 5. Parallel LINQ for CPU-intensive operations
        Console.WriteLine("\nSequential vs. Parallel LINQ:");
        
        // CPU-intensive operation
        Func<int, int> expensiveOperation = x => {
            // Simulate expensive calculation
            double result = x;
            for (int i = 0; i < 1000; i++)
            {
                result = Math.Sqrt(result + i);
            }
            return (int)result;
        };
        
        // Sequential
        stopwatch.Restart();
        var sequentialResult = largeList.Take(10000)
            .Select(item => expensiveOperation(item.Value))
            .Sum();
        stopwatch.Stop();
        
        Console.WriteLine($"- Sequential processing: {stopwatch.ElapsedMilliseconds}ms");
        
        // Parallel
        stopwatch.Restart();
        var parallelResult = largeList.Take(10000).AsParallel()
            .Select(item => expensiveOperation(item.Value))
            .Sum();
        stopwatch.Stop();
        
        Console.WriteLine($"- Parallel processing: {stopwatch.ElapsedMilliseconds}ms");
    }
    
    public void RunAllDemos()
    {
        BasicQuerying();
        FilteringOperations();
        ProjectionOperations();
        GroupingOperations();
        JoinOperations();
        SetOperations();
        AggregateOperations();
        QueryExecution();
        LinqPerformanceConsiderations();
    }
}`,
          exercise: {
            instructions:
              'Create a comprehensive LINQ demonstration program using a small database of books and authors. Implement queries that showcase filtering, projection, sorting, grouping, joining, and aggregation. Include both query syntax and method syntax examples. Demonstrate how to work with related collections and perform complex operations like finding the most prolific author, categorizing books by decade, and generating statistical summaries of the book collection.',
          },
        },
      ],
      prepperSummary: `
    <div class="prepper-summary">
      <h3>🔑 Key Interview Takeaways</h3>
      <ul>
        <li><strong>Arrays:</strong> Understand the performance characteristics and limitations of arrays, including how to work with multi-dimensional and jagged arrays.</li>
        
        <li><strong>Collections:</strong> Know which collection type to use for different scenarios, and understand the trade-offs between performance, flexibility, and memory usage.</li>
        
        <li><strong>LINQ:</strong> Master both query syntax and method syntax, understand deferred vs. immediate execution, and know how to optimize LINQ queries for performance.</li>
        
        <li><strong>Collection Selection:</strong> Be able to justify when to use specific collection types based on their performance characteristics for different operations (insertion, lookup, deletion).</li>
      </ul>
      
      <h4>📝 Common Interview Questions</h4>
      <ol>
        <li>"When would you use a List vs. a Dictionary vs. a HashSet?"</li>
        <li>"Explain the difference between multi-dimensional arrays and jagged arrays"</li>
        <li>"What's the difference between deferred and immediate execution in LINQ?"</li>
        <li>"How would you optimize a LINQ query that's performing poorly?"</li>
        <li>"What collection would you use to implement a cache and why?"</li>
      </ol>
    </div>
  `,
    }, // End of Lesson 2
    {
      title: 'Object-Oriented Basics',
      description: 'Introduction to object-oriented programming concepts in C#.',
      sections: [
        {
          title: 'Classes and Objects',
          explanation: `
        <p>Classes and objects form the foundation of object-oriented programming in C#, enabling the creation of custom types that model real-world entities:</p>
        
        <h4>Classes as Blueprints</h4>
        <p>A class in C# is a blueprint that defines the data and behavior of a type. Key components of a class include:</p>

        <p><strong>Fields:</strong> Variables that store the data of the class. They represent the state or attributes of objects.</p>

        <p><strong>Properties:</strong> Member types that provide a flexible mechanism to read, write, or compute the values of private fields. They expose fields to the outside world through accessors (get and set).</p>

        <p><strong>Methods:</strong> Define the behaviors or actions that objects of the class can perform. They operate on the data stored in the class fields.</p>

        <p><strong>Constructors:</strong> Special methods that initialize new instances of the class. They ensure objects are properly set up when created.</p>

        <h4>Objects as Instances</h4>
        <p>An object is an instance of a class created at runtime. When you create an object:</p>

        <p><strong>Memory allocation:</strong> The system allocates memory for the object's fields.</p>

        <p><strong>Initialization:</strong> The constructor runs to initialize the object's state.</p>

        <p><strong>Reference assignment:</strong> A reference to the object is returned, which you can use to access its members.</p>

        <h4>Object Lifetime</h4>
        <p>Understanding how objects are created, used, and disposed of is essential for effective C# programming:</p>

        <p><strong>Creation:</strong> Objects are created using the 'new' keyword, which allocates memory and calls the constructor.</p>

        <p><strong>Usage:</strong> Objects are used through references, which can be passed to methods, stored in collections, etc.</p>

        <p><strong>Garbage collection:</strong> When no references to an object remain, it becomes eligible for garbage collection, and its memory is eventually reclaimed.</p>

        <p><strong>Disposal:</strong> Objects that use unmanaged resources should implement IDisposable to ensure timely cleanup.</p>
        
        <div class="code-example">
          <pre><code>// Basic class definition
public class Person
{
    // Fields
    private string _name;
    private int _age;
    
    // Properties
    public string Name
    {
        get { return _name; }
        set { _name = value; }
    }
    
    public int Age
    {
        get { return _age; }
        set { _age = value; }
    }
    
    // Auto-implemented property (C# 3.0+)
    public string Address { get; set; }
    
    // Constructor
    public Person(string name, int age)
    {
        _name = name;
        _age = age;
    }
    
    // Method
    public void Greet()
    {
        Console.WriteLine($"Hello, my name is {_name} and I'm {_age} years old.");
    }
}</code></pre>
        </div>
        
        <h4>Creating and Using Objects</h4>
        <div class="code-example">
          <pre><code>// Creating objects
Person person1 = new Person("Alice", 30);
var person2 = new Person("Bob", 25);  // Type inference

// Accessing properties
Console.WriteLine(person1.Name);  // Alice
person2.Age = 26;                 // Modify property

// Using methods
person1.Greet();  // Hello, my name is Alice and I'm 30 years old.

// Object initialization syntax (C# 3.0+)
var person3 = new Person("Charlie", 35)
{
    Address = "123 Main St"
};

// Anonymous types (when you don't need a named class)
var anonymousPerson = new { Name = "David", Age = 40 };</code></pre>
        </div>
        
        <div class="interview-tip">
          <p><span class="interview-icon">🎯</span> <strong>Interview Focus:</strong> Be prepared to discuss class design principles, property patterns, and best practices for object creation and lifetime management.</p>
          <p>Key areas to focus on:</p>
          <ul>
            <li>Understanding the difference between reference types and value types</li>
            <li>Implementing properties with appropriate access control</li>
            <li>Creating well-designed constructors for object initialization</li>
            <li>Understanding when and how to use object initialization syntax</li>
            <li>Proper implementation of IDisposable for resource management</li>
          </ul>
        </div>
      `,
          codeExample: `// Comprehensive demonstration of classes and objects in C#

using System;
using System.Collections.Generic;

namespace ClassesAndObjectsDemo
{
    // A simple class representing a Person
    public class Person
    {
        // Fields - typically private
        private string _firstName;
        private string _lastName;
        private DateTime _birthDate;
        private List<string> _hobbies;
        
        // Public properties with validation
        public string FirstName
        {
            get { return _firstName; }
            set
            {
                if (string.IsNullOrWhiteSpace(value))
                    throw new ArgumentException("First name cannot be empty");
                _firstName = value;
            }
        }
        
        public string LastName
        {
            get { return _lastName; }
            set
            {
                if (string.IsNullOrWhiteSpace(value))
                    throw new ArgumentException("Last name cannot be empty");
                _lastName = value;
            }
        }
        
        // Read-only property with calculation
        public string FullName
        {
            get { return $"{_firstName} {_lastName}"; }
        }
        
        // Property with private setter
        public DateTime BirthDate
        {
            get { return _birthDate; }
            private set { _birthDate = value; }
        }
        
        // Auto-implemented property (C# 3.0+)
        public string Email { get; set; }
        
        // Auto-implemented property with private setter
        public int Age { get; private set; }
        
        // Read-only auto-property (C# 6.0+)
        public bool IsAdult { get; } = false;
        
        // Expression-bodied property (C# 6.0+)
        public bool HasEmail => !string.IsNullOrEmpty(Email);
        
        // Custom indexed property
        public string this[int index]
        {
            get
            {
                if (_hobbies == null || index < 0 || index >= _hobbies.Count)
                    return null;
                return _hobbies[index];
            }
        }
        
        // Constructors
        
        // Default constructor
        public Person()
        {
            _firstName = "Unknown";
            _lastName = "Unknown";
            _birthDate = DateTime.Today;
            _hobbies = new List<string>();
            CalculateAge();
        }
        
        // Parameterized constructor
        public Person(string firstName, string lastName, DateTime birthDate)
        {
            FirstName = firstName;  // Using property for validation
            LastName = lastName;    // Using property for validation
            _birthDate = birthDate; // Direct field assignment
            _hobbies = new List<string>();
            CalculateAge();
            IsAdult = Age >= 18;
        }
        
        // Constructor chaining with this
        public Person(string firstName, string lastName) 
            : this(firstName, lastName, DateTime.Today)
        {
            // No additional initialization needed
        }
        
        // Methods
        
        // Instance method that updates state
        public void AddHobby(string hobby)
        {
            if (!string.IsNullOrWhiteSpace(hobby))
            {
                _hobbies.Add(hobby);
            }
        }
        
        // Instance method that returns a value
        public List<string> GetHobbies()
        {
            return new List<string>(_hobbies); // Return a copy to protect encapsulation
        }
        
        // Method with optional parameters (C# 4.0+)
        public string Introduce(bool includeAge = false)
        {
            string introduction = $"Hello, my name is {FullName}";
            
            if (includeAge)
                introduction += $" and I am {Age} years old";
                
            return introduction;
        }
        
        // Private helper method
        private void CalculateAge()
        {
            Age = CalculateAgeFromBirthDate(_birthDate);
        }
        
        // Static method (belongs to the class, not to instances)
        public static int CalculateAgeFromBirthDate(DateTime birthDate)
        {
            var today = DateTime.Today;
            int age = today.Year - birthDate.Year;
            
            // Adjust age if birthday hasn't occurred yet this year
            if (birthDate.Date > today.AddYears(-age))
                age--;
                
            return age;
        }
        
        // Override method from Object class
        public override string ToString()
        {
            return $"{FullName}, Age: {Age}, Email: {Email ?? "N/A"}";
        }
        
        // Expression-bodied method (C# 6.0+)
        public bool HasHobby(string hobby) => 
            _hobbies.Contains(hobby);
    }
    
    // Class that implements IDisposable for resource management
    public class ResourceManager : IDisposable
    {
        private bool _disposed = false;
        private System.IO.FileStream _fileStream;
        
        public ResourceManager(string filePath)
        {
            Console.WriteLine("Opening resource...");
            _fileStream = System.IO.File.Open(filePath, System.IO.FileMode.OpenOrCreate);
        }
        
        // Implement IDisposable pattern
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
                    // Free managed resources
                    if (_fileStream != null)
                    {
                        _fileStream.Close();
                        _fileStream.Dispose();
                        Console.WriteLine("Disposed managed resources.");
                    }
                }
                
                // Free unmanaged resources
                // (none in this example)
                
                _disposed = true;
                Console.WriteLine("ResourceManager disposed.");
            }
        }
        
        // Finalizer as backup for resource cleanup
        ~ResourceManager()
        {
            Dispose(false);
        }
        
        // Method that requires the object not to be disposed
        public void WriteData(string data)
        {
            if (_disposed)
                throw new ObjectDisposedException("ResourceManager");
                
            var bytes = System.Text.Encoding.UTF8.GetBytes(data);
            _fileStream.Write(bytes, 0, bytes.Length);
            Console.WriteLine($"Wrote {bytes.Length} bytes to file.");
        }
    }
    
    // Demo class to show all the features
    public class ClassesAndObjectsDemo
    {
        public static void RunDemo()
        {
            Console.WriteLine("*** Demonstrating Classes and Objects ***\n");
            
            // Creating objects with different constructors
            Console.WriteLine("Creating objects:");
            var person1 = new Person();
            var person2 = new Person("John", "Doe");
            var person3 = new Person("Jane", "Smith", new DateTime(1990, 5, 15));
            
            Console.WriteLine($"Person 1: {person1}");
            Console.WriteLine($"Person 2: {person2}");
            Console.WriteLine($"Person 3: {person3}");
            
            // Using properties
            Console.WriteLine("\nUsing properties:");
            person1.FirstName = "Alice";
            person1.LastName = "Johnson";
            person1.Email = "alice@example.com";
            
            Console.WriteLine($"Updated Person 1: {person1}");
            Console.WriteLine($"Full name: {person1.FullName}");
            Console.WriteLine($"Has email: {person1.HasEmail}");
            
            // Using methods
            Console.WriteLine("\nUsing methods:");
            person1.AddHobby("Reading");
            person1.AddHobby("Swimming");
            person1.AddHobby("Painting");
            
            Console.WriteLine(person1.Introduce());
            Console.WriteLine(person1.Introduce(true));
            
            Console.WriteLine($"Hobbies: {string.Join(", ", person1.GetHobbies())}");
            Console.WriteLine($"Has hobby 'Reading': {person1.HasHobby("Reading")}");
            Console.WriteLine($"Has hobby 'Running': {person1.HasHobby("Running")}");
            
            // Using indexed property
            Console.WriteLine("\nUsing indexed property:");
            Console.WriteLine($"First hobby: {person1[0]}");
            Console.WriteLine($"Second hobby: {person1[1]}");
            
            // Using object initializer syntax
            Console.WriteLine("\nObject initializer syntax:");
            var person4 = new Person
            {
                FirstName = "Bob",
                LastName = "Williams",
                Email = "bob@example.com"
            };
            
            Console.WriteLine($"Person 4: {person4}");
            
            // Using static methods
            Console.WriteLine("\nStatic methods:");
            int age = Person.CalculateAgeFromBirthDate(new DateTime(1985, 3, 10));
            Console.WriteLine($"Age for birthdate 1985-03-10: {age}");
            
            // Anonymous objects
            Console.WriteLine("\nAnonymous objects:");
            var anonymousPerson = new { Name = "Michael Brown", Age = 45, Email = "michael@example.com" };
            Console.WriteLine($"Anonymous person: {anonymousPerson.Name}, {anonymousPerson.Age}, {anonymousPerson.Email}");
            
            // Using IDisposable with using statement
            Console.WriteLine("\nResource management with IDisposable:");
            try
            {
                using (var resource = new ResourceManager("temp.txt"))
                {
                    resource.WriteData("Hello, world!");
                    // Resource.Dispose() automatically called at the end of this block
                }
                
                Console.WriteLine("After using block, resource has been disposed.");
                
                // C# 8.0+ using declaration
                // using var resource2 = new ResourceManager("temp2.txt");
                // resource2.WriteData("Hello again!");
                // resource2 disposed at the end of the containing scope
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Error: {ex.Message}");
            }
        }
    }
}`,
          exercise: {
            instructions:
              'Create a bank account management system that demonstrates classes and objects in C#. Implement an Account class with properties for account number, owner name, and balance. Include methods for deposit, withdrawal, and transfer between accounts. Ensure proper validation (e.g., insufficient funds, invalid amounts). Create a specialized SavingsAccount class that adds interest calculation functionality. Implement proper constructors and override ToString() for meaningful string representation. Use properties with appropriate access control and demonstrate object creation and method usage in a test program.',
          },
        },
        {
          title: 'Encapsulation and Access Modifiers',
          explanation: `
        <p>Encapsulation is a fundamental principle of object-oriented programming that controls access to an object's internal state:</p>
        
        <h4>Understanding Encapsulation</h4>
        <p>Encapsulation serves several key purposes in object-oriented design:</p>

        <p><strong>Information hiding:</strong> Concealing the internal details of how an object works, exposing only what's necessary through a well-defined interface.</p>

        <p><strong>Data protection:</strong> Preventing direct access to an object's state, ensuring it can only be modified in controlled ways that maintain its integrity.</p>

        <p><strong>Reduced coupling:</strong> Minimizing dependencies between components by hiding implementation details, making the system more maintainable.</p>

        <p><strong>Controlled access:</strong> Providing specific ways to access and modify an object's state through properties and methods with appropriate visibility.</p>

        <h4>Access Modifiers</h4>
        <p>C# provides a rich set of access modifiers to control the visibility of types and their members:</p>

        <p><strong>public:</strong> Accessible from any code in the same assembly or another assembly that references it.</p>

        <p><strong>private:</strong> Accessible only within the same class or struct.</p>

        <p><strong>protected:</strong> Accessible within the same class or derived classes.</p>

        <p><strong>internal:</strong> Accessible within the same assembly, but not from outside the assembly.</p>

        <p><strong>protected internal:</strong> Accessible within the same assembly or by types derived from the containing class.</p>

        <p><strong>private protected:</strong> (C# 7.2+) Accessible within the same class or by derived classes within the same assembly.</p>

        <h4>Properties as Encapsulation Tools</h4>
        <p>Properties are the primary mechanism for implementing encapsulation in C#, providing controlled access to private fields:</p>

        <p><strong>Full properties:</strong> With custom get and set accessors that can include validation and side effects.</p>

        <p><strong>Auto-implemented properties:</strong> Concise syntax where the compiler generates the backing field.</p>

        <p><strong>Read-only properties:</strong> Properties with only a get accessor, or with a private set accessor.</p>

        <p><strong>Write-only properties:</strong> Properties with only a set accessor (rarely used).</p>

        <p><strong>Computed properties:</strong> Properties that calculate their value from other fields rather than storing it directly.</p>
        
        <div class="code-example">
          <pre><code>// Class demonstrating access modifiers
public class BankAccount
{
    // Private fields - not accessible outside the class
    private string _accountNumber;
    private decimal _balance;
    
    // Protected field - accessible in derived classes
    protected string _accountType;
    
    // Internal field - accessible within the assembly
    internal DateTime _lastAccessed;
    
    // Public properties - accessible from anywhere
    public string AccountNumber
    {
        get { return _accountNumber; }
        private set { _accountNumber = value; }  // Private setter
    }
    
    public decimal Balance
    {
        get { return _balance; }
        private set { _balance = value; }  // Private setter
    }
    
    // Auto-implemented property with default access levels
    public string OwnerName { get; set; }
    
    // Constructor
    public BankAccount(string accountNumber, string ownerName, decimal initialBalance)
    {
        _accountNumber = accountNumber;
        OwnerName = ownerName;
        _balance = initialBalance;
        _accountType = "Standard";
        _lastAccessed = DateTime.Now;
    }
    
    // Public method - accessible from anywhere
    public void Deposit(decimal amount)
    {
        if (amount <= 0)
            throw new ArgumentException("Amount must be positive");
            
        Balance += amount;  // Using property
        UpdateLastAccessed();
    }
    
    // Private method - only accessible within this class
    private void UpdateLastAccessed()
    {
        _lastAccessed = DateTime.Now;
    }
}</code></pre>
        </div>
        
        <h4>Property Patterns for Encapsulation</h4>
        <div class="code-example">
          <pre><code>public class Student
{
    // Private backing field
    private string _name;
    
    // Full property with validation
    public string Name
    {
        get { return _name; }
        set
        {
            if (string.IsNullOrWhiteSpace(value))
                throw new ArgumentException("Name cannot be empty");
                
            _name = value;
        }
    }
    
    // Auto-implemented property
    public int Id { get; set; }
    
    // Read-only property with private setter
    public DateTime EnrollmentDate { get; private set; }
    
    // Computed property (no backing field)
    public bool IsEnrolled
    {
        get { return EnrollmentDate > DateTime.MinValue; }
    }
    
    // Property with different accessor levels
    public DateTime? GraduationDate { get; protected set; }
    
    // Init-only property (C# 9.0+)
    // public string StudentNumber { get; init; }
    
    // Expression-bodied property (C# 6.0+)
    public string Status => IsEnrolled ? "Active" : "Inactive";
}</code></pre>
        </div>
        
        <div class="interview-tip">
          <p><span class="interview-icon">🎯</span> <strong>Interview Focus:</strong> Be prepared to discuss why encapsulation is important, when to use different access modifiers, and how to implement effective property patterns.</p>
          <p>Key areas to focus on:</p>
          <ul>
            <li>Choosing appropriate access modifiers for different scenarios</li>
            <li>Implementing validation in property setters for data integrity</li>
            <li>Understanding how encapsulation supports maintainability and reduces bugs</li>
            <li>Using property patterns for immutability and thread safety</li>
            <li>Balancing encapsulation with testability</li>
          </ul>
        </div>
      `,
          codeExample: `// Comprehensive demonstration of encapsulation and access modifiers

using System;
using System.Collections.Generic;

namespace EncapsulationDemo
{
    // Public class - accessible from anywhere
    public class Employee
    {
        // Private fields - only accessible within this class
        private string _firstName;
        private string _lastName;
        private decimal _salary;
        private readonly string _employeeId; // Read-only field, can only be set in constructor or initializer
        private List<string> _skills = new List<string>();
        
        // Protected field - accessible in this class and derived classes
        protected DateTime _hireDate;
        
        // Internal field - accessible within the same assembly
        internal string _department;
        
        // Protected internal field - accessible within assembly and derived classes
        protected internal int _vacationDays;
        
        // Private protected field - accessible only in this class and derived classes in same assembly
        private protected string _managerId;
        
        // Public properties with different encapsulation patterns
        
        // Full property with validation in setter
        public string FirstName
        {
            get { return _firstName; }
            set
            {
                if (string.IsNullOrWhiteSpace(value))
                    throw new ArgumentException("First name cannot be empty");
                _firstName = value;
            }
        }
        
        public string LastName
        {
            get { return _lastName; }
            set
            {
                if (string.IsNullOrWhiteSpace(value))
                    throw new ArgumentException("Last name cannot be empty");
                _lastName = value;
            }
        }
        
        // Computed property (no backing field)
        public string FullName
        {
            get { return $"{_firstName} {_lastName}"; }
        }
        
        // Property with private setter - can be read from anywhere but set only within this class
        public decimal Salary
        {
            get { return _salary; }
            private set { _salary = value; }
        }
        
        // Read-only property (only getter)
        public string EmployeeId
        {
            get { return _employeeId; }
        }
        
        // Auto-implemented property
        public string Email { get; set; }
        
        // Auto-implemented property with private setter
        public string JobTitle { get; private set; }
        
        // Expression-bodied property (C# 6.0+)
        public bool IsManager => JobTitle?.Contains("Manager") ?? false;
        
        // Property with protected setter
        public DateTime LastPromotionDate { get; protected set; }
        
        // Property that exposes a collection safely (returns a copy)
        public IReadOnlyList<string> Skills
        {
            get { return _skills.AsReadOnly(); }
        }
        
        // Constructors
        public Employee(string employeeId, string firstName, string lastName)
        {
            _employeeId = employeeId;
            FirstName = firstName; // Using property for validation
            LastName = lastName;   // Using property for validation
            _hireDate = DateTime.Today;
            _vacationDays = 14;
        }
        
        // Constructor that chains to the primary constructor
        public Employee(string employeeId, string firstName, string lastName, string jobTitle)
            : this(employeeId, firstName, lastName)
        {
            JobTitle = jobTitle;
        }
        
        // Public methods - part of the class's public interface
        
        // Method that validates and updates private state
        public void GiveRaise(decimal amount)
        {
            if (amount <= 0)
                throw new ArgumentException("Raise amount must be positive");
                
            _salary += amount;
            Console.WriteLine($"{FullName} received a raise of \${amount}");
        }
        
        // Method to update a property with private setter
        public void Promote(string newJobTitle)
        {
            JobTitle = newJobTitle;
            LastPromotionDate = DateTime.Today;
            Console.WriteLine($"{FullName} promoted to {newJobTitle}");
        }
        
        // Method for controlled modification of a collection
        public void AddSkill(string skill)
        {
            if (string.IsNullOrWhiteSpace(skill))
                throw new ArgumentException("Skill cannot be empty");
                
            if (!_skills.Contains(skill))
                _skills.Add(skill);
        }
        
        // Method that conditionally updates state
        public bool RequestVacation(int days)
        {
            if (days <= 0)
                throw new ArgumentException("Days must be positive");
                
            if (days > _vacationDays)
            {
                Console.WriteLine($"Request denied: {FullName} only has {_vacationDays} vacation days available");
                return false;
            }
            
            _vacationDays -= days;
            Console.WriteLine($"{FullName} took {days} days of vacation. {_vacationDays} days remaining");
            return true;
        }
        
        // Protected method - only accessible in this class and derived classes
        protected void UpdateHireDate(DateTime newHireDate)
        {
            if (newHireDate > DateTime.Today)
                throw new ArgumentException("Hire date cannot be in the future");
                
            _hireDate = newHireDate;
        }
        
        // Private method - only accessible within this class
        private bool HasRequiredSkills(List<string> requiredSkills)
        {
            foreach (var skill in requiredSkills)
            {
                if (!_skills.Contains(skill))
                    return false;
            }
            return true;
        }
        
        // Private method that maintains encapsulation by validating before update
        private void SetSalary(decimal newSalary)
        {
            if (newSalary < 0)
                throw new ArgumentException("Salary cannot be negative");
                
            _salary = newSalary;
        }
        
        // Public method that uses a private method after validation
        public bool IsEligibleForPromotion(string targetPosition, List<string> requiredSkills)
        {
            if (string.IsNullOrEmpty(targetPosition))
                return false;
                
            return HasRequiredSkills(requiredSkills);
        }
        
        // Override ToString for a meaningful string representation
        public override string ToString()
        {
            return $"{FullName} ({_employeeId}) - {JobTitle ?? "No title"}, Hired: {_hireDate.ToShortDateString()}";
        }
    }
    
    // Derived class demonstration
    public class Manager : Employee
    {
        // Private field specific to Manager
        private List<string> _directReports = new List<string>();
        
        // Constructor that calls base constructor
        public Manager(string employeeId, string firstName, string lastName)
            : base(employeeId, firstName, lastName, "Manager")
        {
            // Access protected field from base class
            _hireDate = DateTime.Today;
            
            // Access protected internal field from base class
            _vacationDays = 20;
            
            // Access private protected field from base class (same assembly)
            _managerId = "None"; // Self-managed
        }
        
        // Public property with protected setter
        public int TeamSize { get; protected set; }
        
        // Public method that accesses protected members
        public void AdjustServiceRecord(DateTime actualHireDate)
        {
            // Call protected method from base class
            UpdateHireDate(actualHireDate);
            
            // Calculate years of service using protected field
            int yearsOfService = DateTime.Today.Year - _hireDate.Year;
            Console.WriteLine($"Adjusted service record. Years of service: {yearsOfService}");
        }
        
        // Method to add direct reports
        public void AddDirectReport(string employeeId)
        {
            if (!_directReports.Contains(employeeId))
            {
                _directReports.Add(employeeId);
                TeamSize = _directReports.Count;
            }
        }
        
        // Override ToString to include manager-specific info
        public override string ToString()
        {
            return $"{base.ToString()}, Team Size: {TeamSize}";
        }
    }
    
    // Demonstration of a class with immutable properties
    public class ImmutablePerson
    {
        // These properties can only be set during initialization
        public string FirstName { get; }
        public string LastName { get; }
        public DateTime BirthDate { get; }
        
        // Computed property based on immutable data
        public int Age 
        {
            get
            {
                var today = DateTime.Today;
                var age = today.Year - BirthDate.Year;
                if (BirthDate > today.AddYears(-age)) age--;
                return age;
            }
        }
        
        public ImmutablePerson(string firstName, string lastName, DateTime birthDate)
        {
            FirstName = firstName;
            LastName = lastName;
            BirthDate = birthDate;
        }
        
        // C# 9.0+ would enable init-only setters:
        // public string FirstName { get; init; }
    }
    
    // Demonstration class for different property patterns
    public class Product
    {
        // Backing field for a property
        private decimal _price;
        
        // Property with validation and transformation
        public decimal Price
        {
            get { return _price; }
            set
            {
                if (value < 0)
                    throw new ArgumentException("Price cannot be negative");
                
                // Round to two decimal places
                _price = Math.Round(value, 2);
            }
        }
        
        // Auto-property with default value (C# 6.0+)
        public bool IsAvailable { get; set; } = true;
        
        // Property with backing field and lazy initialization
        private List<string> _categories;
        public List<string> Categories
        {
            get
            {
                if (_categories == null)
                    _categories = new List<string>();
                return _categories;
            }
        }
        
        // Property with field-like syntax but with side effects
        private string _name;
        public string Name
        {
            get => _name;
            set
            {
                if (_name != value)
                {
                    _name = value;
                    OnNameChanged();
                }
            }
        }
        
        private void OnNameChanged()
        {
            Console.WriteLine($"Product name changed to {_name}");
        }
    }
    
    // Main demo class
    public class EncapsulationDemo
    {
        public static void RunDemo()
        {
            Console.WriteLine("*** Encapsulation and Access Modifiers Demo ***");
            
            // Creating and using an Employee object
            Console.WriteLine("\nEmployee example:");
            var employee = new Employee("E12345", "John", "Doe");
            employee.Email = "john.doe@company.com";
            employee.Promote("Software Developer");
            employee.GiveRaise(5000);
            
            // These would not compile - private/protected access:
            // employee._firstName = "Jane";      // Error: '_firstName' is inaccessible
            // employee._salary = 50000;          // Error: '_salary' is inaccessible
            // employee.Salary = 60000;           // Error: Property setter is private
            // employee.UpdateHireDate(DateTime.Today);  // Error: Method is protected
            
            employee.AddSkill("C#");
            employee.AddSkill("ASP.NET");
            employee.AddSkill("SQL");
            
            Console.WriteLine($"Employee: {employee}");
            Console.WriteLine($"Is manager: {employee.IsManager}");
            Console.WriteLine($"Skills: {string.Join(", ", employee.Skills)}");
            
            // Try to directly modify the skills (won't work due to encapsulation)
            try
            {
                // This won't compile:
                // employee.Skills.Add("JavaScript");  // Error: Skills is read-only
                
                // But this would get past compile time, but still won't modify the collection:
                var skills = employee.Skills as List<string>;
                if (skills != null)
                    skills.Add("JavaScript");
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Exception: {ex.Message}");
            }
            
            // Skills remain unchanged due to proper encapsulation
            Console.WriteLine($"Skills after attempted modification: {string.Join(", ", employee.Skills)}");
            
            // Vacation request
            employee.RequestVacation(5);
            employee.RequestVacation(10);
            
            // Manager example
            Console.WriteLine("\nManager example:");
            var manager = new Manager("M54321", "Jane", "Smith");
            manager.Promote("Senior Manager");
            manager.GiveRaise(10000);
            manager.AddDirectReport("E12345");
            manager.AddSkill("Leadership");
            manager.AddSkill("Project Management");
            
            // Access protected method from derived class
            manager.AdjustServiceRecord(new DateTime(2018, 5, 10));
            
            Console.WriteLine($"Manager: {manager}");
            Console.WriteLine($"Is manager: {manager.IsManager}");
            
            // Immutable object example
            Console.WriteLine("\nImmutable object example:");
            var person = new ImmutablePerson("Alice", "Johnson", new DateTime(1985, 3, 15));
            
            // These would not compile - properties are read-only:
            // person.FirstName = "Alicia";  // Error: Property has no setter
            
            Console.WriteLine($"Person: {person.FirstName} {person.LastName}");
            Console.WriteLine($"Age: {person.Age}");
            
            // Property patterns example
            Console.WriteLine("\nProperty patterns example:");
            var product = new Product();
            product.Name = "Laptop";
            product.Price = 999.999m;  // Will be rounded to 1000.00
            
            // Try invalid value
            try
            {
                product.Price = -50;
            }
            catch (ArgumentException ex)
            {
                Console.WriteLine($"Expected error: {ex.Message}");
            }
            
            // Lazy initialization
            Console.WriteLine($"Categories initialized: {(product.Categories != null)}");
            product.Categories.Add("Electronics");
            Console.WriteLine($"Categories: {string.Join(", ", product.Categories)}");
            
            Console.WriteLine($"Product: {product.Name}, Price: {product.Price:C}, Available: {product.IsAvailable}");
        }
    }
}`,
          exercise: {
            instructions:
              "Create a library management system that demonstrates proper encapsulation. Implement a Book class with private fields for ISBN, title, author, and availability status. Provide public properties with appropriate validation (e.g., ISBN format, non-empty title). Include methods for checking out and returning books that properly encapsulate the status changes. Then create a Library class that manages a collection of books, ensuring proper encapsulation of the collection while providing methods to add books, find books by various criteria, and generate reports about the library's contents. Use appropriate access modifiers throughout.",
          },
        },
        {
          title: 'Constructors and Destructors',
          explanation: `
<p>Constructors and destructors control the creation and cleanup of objects, ensuring proper initialization and resource management:</p>
        
        <h4>Constructors: Creating Well-Formed Objects</h4>
        <p>Constructors are special methods that initialize new instances of a class. They play a crucial role in ensuring objects begin their lifecycle in a valid state:</p>

        <p><strong>Default constructor:</strong> A parameterless constructor that provides default values. If you don't create any constructors, the compiler provides a default constructor automatically (unless the class is static or sealed).</p>

        <p><strong>Parameterized constructors:</strong> Constructors that accept parameters, allowing clients to specify initial values for an object.</p>

        <p><strong>Constructor overloading:</strong> Defining multiple constructors with different parameter lists to provide various ways of initializing objects.</p>

        <p><strong>Constructor chaining:</strong> Calling one constructor from another using the this keyword, allowing you to reuse initialization code.</p>

        <p><strong>Static constructors:</strong> Special constructors invoked once before any instances are created or static members are accessed, used for initializing static data.</p>

        <h4>Object Initialization</h4>
        <p>C# provides multiple approaches for object initialization:</p>

        <p><strong>Constructor initialization:</strong> The traditional approach, using constructor parameters to set initial values.</p>

        <p><strong>Object initializer syntax:</strong> A concise way to set property values after instantiation, introduced in C# 3.0.</p>

        <p><strong>Static factory methods:</strong> Public static methods that return instances of the class, providing an alternative to constructors with more descriptive names or special behavior.</p>

        <h4>Destructors and IDisposable</h4>
        <p>C# provides mechanisms for cleanup when objects are no longer needed:</p>

        <p><strong>Destructors (finalizers):</strong> Methods that are called when an object is garbage collected, used for cleaning up unmanaged resources. However, their execution time is non-deterministic.</p>

        <p><strong>IDisposable interface:</strong> The recommended pattern for deterministic cleanup, allowing clients to explicitly release resources when they're done with an object.</p>

        <p><strong>The using statement:</strong> Ensures Dispose is called automatically when execution leaves the block, even if an exception occurs.</p>
        
        <div class="code-example">
          <pre><code>// Constructor examples
public class Person
{
    private string _name;
    private int _age;
    
    // Default constructor
    public Person()
    {
        _name = "Unknown";
        _age = 0;
        Console.WriteLine("Default constructor called");
    }
    
    // Parameterized constructor
    public Person(string name, int age)
    {
        _name = name;
        _age = age;
        Console.WriteLine("Parameterized constructor called");
    }
    
    // Constructor chaining
    public Person(string name) : this(name, 0)
    {
        Console.WriteLine("Name-only constructor called");
    }
    
    // Static constructor
    static Person()
    {
        Console.WriteLine("Static constructor called before first use");
        // Initialize static fields here
    }
    
    // Properties
    public string Name { get => _name; set => _name = value; }
    public int Age { get => _age; set => _age = value; }
}</code></pre>
        </div>
        
        <h4>Object Initialization Syntax</h4>
        <div class="code-example">
          <pre><code>// Different ways to initialize objects
// Using constructors
Person person1 = new Person();
Person person2 = new Person("John", 30);
Person person3 = new Person("Alice");

// Using object initializer syntax
Person person4 = new Person
{
    Name = "Bob",
    Age = 25
};

// Combining constructor and initializer
Person person5 = new Person("Charlie")
{
    Age = 35
};</code></pre>
        </div>
        
        <h4>Destructors and Resource Management</h4>
        <div class="code-example">
          <pre><code>// Class with a destructor
public class ResourceHolder
{
    private bool _disposed = false;
    
    // Constructor allocates resources
    public ResourceHolder()
    {
        Console.WriteLine("Resource acquired");
    }
    
    // Destructor/finalizer
    ~ResourceHolder()
    {
        Cleanup();
        Console.WriteLine("Finalizer called");
    }
    
    private void Cleanup()
    {
        if (!_disposed)
        {
            // Release unmanaged resources
            Console.WriteLine("Resources released");
            _disposed = true;
        }
    }
}

// Class implementing IDisposable for deterministic cleanup
public class ManagedResource : IDisposable
{
    private bool _disposed = false;
    private FileStream _fileStream;
    
    public ManagedResource(string filePath)
    {
        _fileStream = File.OpenWrite(filePath);
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
                // Dispose managed resources
                _fileStream?.Dispose();
            }
            
            // Free unmanaged resources
            
            _disposed = true;
        }
    }
    
    // Finalizer as a backup
    ~ManagedResource()
    {
        Dispose(false);
    }
}

// Using the IDisposable pattern with the using statement
using (var resource = new ManagedResource("data.txt"))
{
    // Use the resource
} // Dispose() is called automatically here, even if an exception occurs</code></pre>
        </div>
        
        <div class="interview-tip">
          <p><span class="interview-icon">🎯</span> <strong>Interview Focus:</strong> Be prepared to discuss constructors, object initialization patterns, and proper resource cleanup using IDisposable.</p>
          <p>Key areas to focus on:</p>
          <ul>
            <li>Constructor chaining and its benefits</li>
            <li>When to use static constructors</li>
            <li>The disposal pattern for proper resource management</li>
            <li>Differences between finalizers and the Dispose method</li>
            <li>Best practices for handling unmanaged resources</li>
          </ul>
        </div>
      `,
          codeExample: `// Demonstration of constructors and destructors in C#

using System;
using System.IO;

namespace ConstructorsDemo
{
    // Basic class with different constructor types
    public class Person
    {
        // Fields
        private string _firstName;
        private string _lastName;
        private int _age;
        private DateTime _created;
        
        // Static field
        private static int _personCount;
        
        // Properties
        public string FirstName { get => _firstName; set => _firstName = value; }
        public string LastName { get => _lastName; set => _lastName = value; }
        public int Age { get => _age; set => _age = value; }
        public string FullName => $"{_firstName} {_lastName}";
        
        // Static property
        public static int PersonCount => _personCount;
        
        // Static constructor - called once before first use of the class
        static Person()
        {
            _personCount = 0;
            Console.WriteLine("Static constructor: Person class initialized");
        }
        
        // Default constructor
        public Person()
        {
            _firstName = "Unknown";
            _lastName = "Unknown";
            _age = 0;
            _created = DateTime.Now;
            _personCount++;
            Console.WriteLine("Default constructor: Created unnamed person");
        }
        
        // Parameterized constructor
        public Person(string firstName, string lastName, int age)
        {
            _firstName = firstName;
            _lastName = lastName;
            _age = age;
            _created = DateTime.Now;
            _personCount++;
            Console.WriteLine($"Parameterized constructor: Created {firstName} {lastName}, age {age}");
        }
        
        // Constructor chaining with this
        public Person(string firstName, string lastName) : this(firstName, lastName, 0)
        {
            Console.WriteLine("Name-only constructor: Age defaulted to 0");
        }
        
        // Constructor with optional parameter
        public Person(string fullName, int age = 0)
        {
            string[] parts = fullName.Split(' ');
            _firstName = parts[0];
            _lastName = parts.Length > 1 ? parts[1] : "";
            _age = age;
            _created = DateTime.Now;
            _personCount++;
            Console.WriteLine($"Full name constructor: Created {fullName}, age {age}");
        }
        
        // Method to display person info
        public void DisplayInfo()
        {
            Console.WriteLine($"Person: {FullName}, Age: {Age}, Created: {_created}");
        }
        
        // Destructor/finalizer
        ~Person()
        {
            _personCount--;
            Console.WriteLine($"Finalizer: {FullName} is being finalized");
            
            // Note: In real applications, avoid expensive operations in finalizers
            // as they run on the finalizer thread and can affect performance
        }
    }
    
    // Class demonstrating IDisposable pattern for resource management
    public class DatabaseConnection : IDisposable
    {
        private bool _disposed = false;
        private string _connectionString;
        private FileStream _logFile;
        
        // Constructor - acquire resources
        public DatabaseConnection(string server, string database, string logPath)
        {
            _connectionString = $"Server={server};Database={database};Trusted_Connection=True;";
            
            try
            {
                _logFile = File.OpenWrite(logPath);
                byte[] data = System.Text.Encoding.UTF8.GetBytes($"Connection opened to {database} on {server} at {DateTime.Now}\n");
                _logFile.Write(data, 0, data.Length);
                
                Console.WriteLine($"Opened connection to {database} on {server}");
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Error creating log file: {ex.Message}");
                // Cleanup any resources that were successfully acquired
            }
        }
        
        // Public method
        public void ExecuteQuery(string query)
        {
            // Check if already disposed
            if (_disposed)
                throw new ObjectDisposedException(nameof(DatabaseConnection));
                
            Console.WriteLine($"Executing query: {query}");
            
            // Log the query
            if (_logFile != null)
            {
                byte[] data = System.Text.Encoding.UTF8.GetBytes($"Query executed: {query} at {DateTime.Now}\n");
                _logFile.Write(data, 0, data.Length);
                _logFile.Flush();
            }
        }
        
        // Implement IDisposable
        public void Dispose()
        {
            Dispose(true);
            GC.SuppressFinalize(this);
        }
        
        // Protected virtual method for derived classes
        protected virtual void Dispose(bool disposing)
        {
            if (!_disposed)
            {
                if (disposing)
                {
                    // Dispose managed resources
                    if (_logFile != null)
                    {
                        byte[] data = System.Text.Encoding.UTF8.GetBytes($"Connection closed at {DateTime.Now}\n");
                        _logFile.Write(data, 0, data.Length);
                        _logFile.Flush();
                        _logFile.Close();
                        _logFile.Dispose();
                        _logFile = null;
                    }
                }
                
                // Free unmanaged resources
                // (none in this example, but in real code might release handles, etc.)
                
                _disposed = true;
                Console.WriteLine("Database connection disposed");
            }
        }
        
        // Finalizer as a safety net
        ~DatabaseConnection()
        {
            Console.WriteLine("Warning: DatabaseConnection finalized without calling Dispose!");
            Dispose(false);
        }
    }
    
    // Class demonstrating object initializer syntax
    public class Product
    {
        // Auto-implemented properties
        public int Id { get; set; }
        public string Name { get; set; }
        public decimal Price { get; set; }
        public string Category { get; set; }
        public bool InStock { get; set; } = true;  // Default value
        
        // Default constructor
        public Product()
        {
            Console.WriteLine("Product: Default constructor called");
        }
        
        // Parameterized constructor
        public Product(int id, string name)
        {
            Id = id;
            Name = name;
            Console.WriteLine($"Product: Created {name} with ID {id}");
        }
        
        public override string ToString()
        {
            return $"{Name} (ID: {Id}), Price: \${Price}, Category: {Category}, In Stock: {InStock}";
        }
    }
    
    // Class demonstrating static factory methods as constructor alternatives
    public class Logger
    {
        private string _name;
        private LogLevel _level;
        
        public enum LogLevel { Debug, Info, Warning, Error, Fatal }
        
        // Private constructor - force use of factory methods
        private Logger(string name, LogLevel level)
        {
            _name = name;
            _level = level;
        }
        
        // Static factory methods
        public static Logger CreateDebugLogger(string name)
        {
            return new Logger(name, LogLevel.Debug);
        }
        
        public static Logger CreateProductionLogger(string name)
        {
            return new Logger(name, LogLevel.Warning);
        }
        
        public static Logger Create(string name, LogLevel level)
        {
            return new Logger(name, level);
        }
        
        public void Log(LogLevel level, string message)
        {
            if (level >= _level)
            {
                Console.WriteLine($"[{level}] {_name}: {message}");
            }
        }
        
        public override string ToString()
        {
            return $"Logger: {_name} (Level: {_level})";
        }
    }
    
    // Main demo class
    public class ConstructorsAndDestructorsDemo
    {
        public static void RunDemo()
        {
            Console.WriteLine("*** Constructors and Destructors Demo ***");
            
            // Person constructor examples
            Console.WriteLine("\n--- Person Constructors ---");
            
            var person1 = new Person();
            person1.DisplayInfo();
            
            var person2 = new Person("John", "Doe", 30);
            person2.DisplayInfo();
            
            var person3 = new Person("Jane", "Smith");
            person3.DisplayInfo();
            
            var person4 = new Person("Bob Johnson");
            person4.DisplayInfo();
            
            Console.WriteLine($"Total persons created: {Person.PersonCount}");
            
            // Object initializer examples
            Console.WriteLine("\n--- Object Initializers ---");
            
            // Using default constructor with object initializer
            var product1 = new Product
            {
                Id = 101,
                Name = "Smartphone",
                Price = 499.99m,
                Category = "Electronics"
            };
            
            Console.WriteLine(product1);
            
            // Using parameterized constructor with object initializer
            var product2 = new Product(102, "Laptop")
            {
                Price = 899.99m,
                Category = "Electronics",
                InStock = false
            };
            
            Console.WriteLine(product2);
            
            // Static factory methods
            Console.WriteLine("\n--- Static Factory Methods ---");
            
            var debugLogger = Logger.CreateDebugLogger("DebugModule");
            debugLogger.Log(Logger.LogLevel.Debug, "This is a debug message");
            
            var prodLogger = Logger.CreateProductionLogger("ProductionModule");
            prodLogger.Log(Logger.LogLevel.Debug, "This debug message won't show");
            prodLogger.Log(Logger.LogLevel.Error, "This error will show");
            
            var customLogger = Logger.Create("CustomModule", Logger.LogLevel.Info);
            Console.WriteLine(customLogger);
            
            // IDisposable and resource management
            Console.WriteLine("\n--- Resource Management with IDisposable ---");
            
            // Proper usage with using statement
            try
            {
                using (var connection = new DatabaseConnection("localhost", "testdb", "log.txt"))
                {
                    connection.ExecuteQuery("SELECT * FROM Users");
                    connection.ExecuteQuery("UPDATE Statistics SET LastAccess = GETDATE()");
                    // Dispose() automatically called at the end of using block
                }
                
                Console.WriteLine("After using block - connection disposed automatically");
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Error: {ex.Message}");
            }
            
            // Improper usage without using statement - relies on finalizer
            Console.WriteLine("\nCreating a connection without proper disposal (bad practice):");
            var badConnection = new DatabaseConnection("localhost", "testdb", "badlog.txt");
            badConnection.ExecuteQuery("SELECT * FROM BadPractice");
            
            // Set it to null, it will eventually be garbage collected but timing is non-deterministic
            badConnection = null;
            
            // Force garbage collection for demo purposes
            // Note: Explicitly calling GC.Collect() is generally not recommended in production code
            Console.WriteLine("\nForcing garbage collection for demo purposes...");
            GC.Collect();
            GC.WaitForPendingFinalizers();
            
            Console.WriteLine("\nConstructors and Destructors Demo Completed");
        }
    }
}`,
          exercise: {
            instructions:
              'Create a program that demonstrates different types of constructors and proper resource management. Implement a class called "DataProcessor" with a default constructor, parameterized constructors, and a static constructor. Include constructor chaining and object initializer examples. Make DataProcessor implement IDisposable for proper resource management. Create a second class that holds unmanaged resources and show proper cleanup using finalizers. Demonstrate both proper resource disposal with using statements and improper disposal relying on garbage collection. Include a static factory method that returns different specialized implementations of the DataProcessor.',
          },
        },
        {
          title: 'Inheritance and Polymorphism',
          explanation: `
        <p>Inheritance and polymorphism are powerful object-oriented principles that enable code reuse and extensibility:</p>
        
        <h4>Inheritance: Building Type Hierarchies</h4>
        <p>Inheritance allows a class to inherit fields, properties, and methods from another class, forming an "is-a" relationship:</p>

        <p><strong>Base and derived classes:</strong> A derived class (child) inherits from a base class (parent), extending or specializing its behavior.</p>

        <p><strong>The : operator:</strong> C# uses a colon to specify inheritance, allowing a class to inherit from exactly one base class.</p>

        <p><strong>Access to base members:</strong> Derived classes can access protected and public members of the base class, and can use the base keyword to explicitly access base class members.</p>

        <p><strong>Constructor inheritance:</strong> Derived class constructors must call a base class constructor, either implicitly or explicitly using the base keyword.</p>

        <p><strong>Sealed classes:</strong> Classes marked with the sealed keyword cannot be inherited from, preventing further specialization.</p>

        <h4>Polymorphism: One Interface, Many Implementations</h4>
        <p>Polymorphism allows different classes to be treated through a common interface, with behavior determined at runtime:</p>

        <p><strong>Method overriding:</strong> A derived class can provide a new implementation of a base class method using the override keyword, changing behavior while maintaining the same signature.</p>

        <p><strong>Virtual methods:</strong> Base class methods must be marked as virtual to allow derived classes to override them.</p>

        <p><strong>Abstract methods:</strong> Methods declared with the abstract keyword have no implementation in the base class and must be overridden by non-abstract derived classes.</p>

        <p><strong>Abstract classes:</strong> Classes declared with the abstract keyword cannot be instantiated directly and may contain abstract methods, serving as templates for derived classes.</p>

        <p><strong>Hiding methods:</strong> Using the new keyword allows a derived class to hide a base class member rather than override it, but this approach is generally discouraged.</p>

        <h4>The Object Class</h4>
        <p>All classes in C# ultimately derive from the Object class (System.Object), which provides fundamental methods:</p>

        <p><strong>ToString():</strong> Returns a string representation of the object, commonly overridden to provide meaningful output.</p>

        <p><strong>Equals():</strong> Determines whether two objects are equal, often overridden to define custom equality semantics.</p>

        <p><strong>GetHashCode():</strong> Returns a numeric hash code, which should be overridden whenever Equals() is overridden.</p>

        <p><strong>GetType():</strong> Returns the Type object for the current instance (cannot be overridden).</p>
        
        <div class="code-example">
          <pre><code>// Base class
public class Animal
{
    public string Name { get; set; }
    public int Age { get; set; }
    
    public Animal(string name, int age)
    {
        Name = name;
        Age = age;
    }
    
    // Virtual method (can be overridden)
    public virtual void MakeSound()
    {
        Console.WriteLine("Animal makes a sound");
    }
    
    // Non-virtual method (cannot be overridden)
    public void Sleep()
    {
        Console.WriteLine($"{Name} is sleeping...");
    }
}

// Derived class
public class Dog : Animal
{
    public string Breed { get; set; }
    
    public Dog(string name, int age, string breed) 
        : base(name, age)  // Calling base constructor
    {
        Breed = breed;
    }
    
    // Override base class method
    public override void MakeSound()
    {
        Console.WriteLine($"{Name} barks: Woof! Woof!");
    }
    
    // Dog-specific method
    public void Fetch()
    {
        Console.WriteLine($"{Name} is fetching the ball!");
    }
}</code></pre>
        </div>
        
        <h4>Abstract Classes and Methods</h4>
        <div class="code-example">
          <pre><code>// Abstract base class
public abstract class Shape
{
    // Properties
    public string Color { get; set; }
    
    // Constructor
    public Shape(string color)
    {
        Color = color;
    }
    
    // Abstract method (must be implemented by derived classes)
    public abstract double CalculateArea();
    
    // Virtual method (can be overridden)
    public virtual void Display()
    {
        Console.WriteLine($"A {Color} shape");
    }
    
    // Concrete method (shared by all shapes)
    public void SetColor(string color)
    {
        Color = color;
        Console.WriteLine($"Color changed to {Color}");
    }
}

// Concrete derived class
public class Circle : Shape
{
    public double Radius { get; set; }
    
    public Circle(double radius, string color) : base(color)
    {
        Radius = radius;
    }
    
    // Implementation of abstract method
    public override double CalculateArea()
    {
        return Math.PI * Radius * Radius;
    }
    
    // Override of virtual method
    public override void Display()
    {
        Console.WriteLine($"A {Color} circle with radius {Radius}");
    }
}</code></pre>
        </div>
        
        <div class="interview-tip">
          <p><span class="interview-icon">🎯</span> <strong>Interview Focus:</strong> Be prepared to discuss when to use inheritance versus other design patterns, and understand the implications of method overriding.</p>
          <p>Key areas to focus on:</p>
          <ul>
            <li>When to use abstract classes versus interfaces</li>
            <li>The Liskov Substitution Principle and its importance</li>
            <li>Properly implementing ToString(), Equals(), and GetHashCode()</li>
            <li>The "composition over inheritance" principle and when to apply it</li>
            <li>Virtual method call mechanics and runtime polymorphism</li>
          </ul>
        </div>
      `,
          codeExample: `// Comprehensive demonstration of inheritance and polymorphism in C#

using System;
using System.Collections.Generic;

namespace InheritanceDemo
{
    // Base class for all employees
    public class Employee
    {
        // Properties
        public string Name { get; set; }
        public int Id { get; set; }
        public DateTime HireDate { get; set; }
        
        // Protected property - accessible by derived classes
        protected decimal BaseSalary { get; set; }
        
        // Constructor
        public Employee(string name, int id, DateTime hireDate)
        {
            Name = name;
            Id = id;
            HireDate = hireDate;
            BaseSalary = 50000;  // Default base salary
        }
        
        // Virtual method - can be overridden by derived classes
        public virtual decimal CalculateMonthlySalary()
        {
            return BaseSalary / 12;
        }
        
        // Non-virtual method - cannot be overridden (but can be hidden)
        public void DisplayEmployeeInfo()
        {
            Console.WriteLine($"Employee: {Name} (ID: {Id})");
            Console.WriteLine($"Hired: {HireDate.ToShortDateString()}");
            Console.WriteLine($"Monthly Salary: \${CalculateMonthlySalary():F2}");
        }
        
        // Virtual method with implementation
        public virtual void GiveRaise(decimal percentage)
        {
            if (percentage <= 0)
                throw new ArgumentException("Percentage must be positive");
                
            BaseSalary += BaseSalary * percentage / 100;
            Console.WriteLine($"{Name} received a {percentage}% raise. New base salary: \${BaseSalary:F2}");
        }
        
        // Overridden method from Object class
        public override string ToString()
        {
            return $"{Name} (ID: {Id}), Hired: {HireDate.ToShortDateString()}";
        }
    }
    
    // Derived class: Manager
    public class Manager : Employee
    {
        // Additional property
        public int TeamSize { get; set; }
        public decimal Bonus { get; private set; }
        
        // Constructor calls base constructor
        public Manager(string name, int id, DateTime hireDate, int teamSize)
            : base(name, id, hireDate)
        {
            TeamSize = teamSize;
            BaseSalary = 80000;  // Managers get a higher base salary
            Bonus = 10000;       // Annual bonus
        }
        
        // Override CalculateMonthlySalary to include monthly bonus
        public override decimal CalculateMonthlySalary()
        {
            // Call base class method and add manager-specific logic
            decimal baseMonthlySalary = base.CalculateMonthlySalary();
            decimal monthlyBonus = Bonus / 12;
            return baseMonthlySalary + monthlyBonus;
        }
        
        // Manager-specific method
        public void AssignProject(string project)
        {
            Console.WriteLine($"Manager {Name} assigned to project: {project}");
        }
        
        // Override GiveRaise to include bonus increase
        public override void GiveRaise(decimal percentage)
        {
            // Call base implementation to increase base salary
            base.GiveRaise(percentage);
            
            // Also increase bonus
            Bonus += Bonus * percentage / 100;
            Console.WriteLine($"Bonus also increased to \${Bonus:F2}");
        }
        
        // Override ToString for Manager-specific info
        public override string ToString()
        {
            return $"Manager: {base.ToString()}, Team Size: {TeamSize}";
        }
    }
    
    // Derived class: Developer
    public class Developer : Employee
    {
        // Additional properties
        public string ProgrammingLanguage { get; set; }
        public int ProjectsCompleted { get; set; }
        
        // Constructor
        public Developer(string name, int id, DateTime hireDate, string language)
            : base(name, id, hireDate)
        {
            ProgrammingLanguage = language;
            ProjectsCompleted = 0;
        }
        
        // Override with completely new implementation
        public override decimal CalculateMonthlySalary()
        {
            // Developers get bonus based on projects completed
            decimal projectBonus = ProjectsCompleted * 1000 / 12;
            return (BaseSalary / 12) + projectBonus;
        }
        
        // Developer-specific method
        public void CompleteProject()
        {
            ProjectsCompleted++;
            Console.WriteLine($"{Name} completed a project. Total projects: {ProjectsCompleted}");
        }
        
        // Override ToString
        public override string ToString()
        {
            return $"Developer: {base.ToString()}, Language: {ProgrammingLanguage}, Projects: {ProjectsCompleted}";
        }
    }
    
    // Abstract base class example
    public abstract class Shape
    {
        // Property
        public string Color { get; set; }
        
        // Constructor
        public Shape(string color)
        {
            Color = color;
        }
        
        // Abstract method - must be implemented by derived classes
        public abstract double CalculateArea();
        
        // Virtual method with implementation
        public virtual void DisplayInfo()
        {
            Console.WriteLine($"A {Color} shape");
        }
        
        // Non-virtual concrete method
        public void SetColor(string color)
        {
            Color = color;
        }
    }
    
    // Concrete implementation of abstract class
    public class Circle : Shape
    {
        // Property
        public double Radius { get; set; }
        
        // Constructor
        public Circle(double radius, string color) : base(color)
        {
            Radius = radius;
        }
        
        // Implementation of abstract method
        public override double CalculateArea()
        {
            return Math.PI * Radius * Radius;
        }
        
        // Override of virtual method
        public override void DisplayInfo()
        {
            Console.WriteLine($"A {Color} circle with radius {Radius}");
            Console.WriteLine($"Area: {CalculateArea():F2}");
        }
    }
    
    // Another implementation of abstract class
    public class Rectangle : Shape
    {
        // Properties
        public double Width { get; set; }
        public double Height { get; set; }
        
        // Constructor
        public Rectangle(double width, double height, string color) : base(color)
        {
            Width = width;
            Height = height;
        }
        
        // Implementation of abstract method
        public override double CalculateArea()
        {
            return Width * Height;
        }
        
        // Override of virtual method
        public override void DisplayInfo()
        {
            Console.WriteLine($"A {Color} rectangle with width {Width} and height {Height}");
            Console.WriteLine($"Area: {CalculateArea():F2}");
        }
    }
    
    // Sealed class - cannot be inherited from
    public sealed class FinalProduct
    {
        public string Name { get; set; }
        public decimal Price { get; set; }
        
        public FinalProduct(string name, decimal price)
        {
            Name = name;
            Price = price;
        }
        
        public override string ToString()
        {
            return $"{Name}: \${Price:F2}";
        }
        
        // This class cannot be inherited from because it's sealed
    }
    
    // Class with method hiding example
    public class BaseClass
    {
        public void Show()
        {
            Console.WriteLine("BaseClass.Show()");
        }
    }
    
    public class DerivedClass : BaseClass
    {
        // Hides the base class method (not recommended approach)
        public new void Show()
        {
            Console.WriteLine("DerivedClass.Show()");
        }
    }
    
    // Main demo class
    public class InheritanceDemo
    {
        public static void RunDemo()
        {
            Console.WriteLine("*** Inheritance and Polymorphism Demo ***");
            
            // Creating base and derived class instances
            Console.WriteLine("\n--- Employee Hierarchy ---");
            
            var employee = new Employee("John Smith", 1001, new DateTime(2020, 5, 15));
            var manager = new Manager("Jane Doe", 2001, new DateTime(2018, 3, 10), 5);
            var developer = new Developer("Bob Johnson", 3001, new DateTime(2021, 2, 20), "C#");
            
            // Using base class methods
            Console.WriteLine("\nBase Employee Info:");
            employee.DisplayEmployeeInfo();
            
            Console.WriteLine("\nManager Info:");
            manager.DisplayEmployeeInfo();
            
            Console.WriteLine("\nDeveloper Info:");
            developer.DisplayEmployeeInfo();
            
            // Using derived class specific methods
            Console.WriteLine("\nDerived class specific operations:");
            manager.AssignProject("New Website");
            developer.CompleteProject();
            developer.CompleteProject();
            
            // Display updated info after operations
            Console.WriteLine("\nUpdated Developer Info:");
            developer.DisplayEmployeeInfo();
            
            // Polymorphism with override
            Console.WriteLine("\n--- Polymorphism Example ---");
            
            // Give raises to all employees
            Console.WriteLine("\nGiving raises:");
            employee.GiveRaise(5);
            manager.GiveRaise(7);
            developer.GiveRaise(6);
            
            // Using ToString() override
            Console.WriteLine("\nToString() results:");
            Console.WriteLine(employee);
            Console.WriteLine(manager);
            Console.WriteLine(developer);
            
            // Using inheritance for polymorphic collections
            Console.WriteLine("\n--- Polymorphic Collection ---");
            
            List<Employee> employees = new List<Employee>
            {
                employee,
                manager,
                developer,
                new Manager("Alex Wilson", 2002, new DateTime(2019, 7, 12), 3),
                new Developer("Emma Davis", 3002, new DateTime(2020, 9, 5), "Java")
            };
            
            // Process all employees polymorphically
            Console.WriteLine("\nProcessing employees polymorphically:");
            decimal totalMonthlySalary = 0;
            
            foreach (var emp in employees)
            {
                // The correct implementation of CalculateMonthlySalary is called
                // based on the actual type of each object (runtime polymorphism)
                decimal salary = emp.CalculateMonthlySalary();
                Console.WriteLine($"{emp.Name}: \${salary:F2}/month");
                totalMonthlySalary += salary;
            }
            
            Console.WriteLine($"Total monthly salary budget: \${totalMonthlySalary:F2}");
            
            // Abstract class example
            Console.WriteLine("\n--- Abstract Class Example ---");
            
            // Cannot instantiate abstract class
            // var shape = new Shape("Red"); // Error!
            
            var circle = new Circle(5, "Blue");
            var rectangle = new Rectangle(4, 6, "Green");
            
            circle.DisplayInfo();
            rectangle.DisplayInfo();
            
            // Change properties
            circle.SetColor("Purple");
            rectangle.Width = 5;
            
            circle.DisplayInfo();
            rectangle.DisplayInfo();
            
            // Polymorphic collection of shapes
            List<Shape> shapes = new List<Shape> { circle, rectangle, new Circle(3, "Yellow") };
            
            double totalArea = 0;
            foreach (var shape in shapes)
            {
                totalArea += shape.CalculateArea();
            }
            
            Console.WriteLine($"Total area of all shapes: {totalArea:F2}");
            
            // Sealed class example
            Console.WriteLine("\n--- Sealed Class Example ---");
            
            var product = new FinalProduct("Laptop", 999.99m);
            Console.WriteLine(product);
            
            // Cannot inherit from sealed class
            // public class DiscountProduct : FinalProduct { } // Error!
            
            // Method hiding example
            Console.WriteLine("\n--- Method Hiding Example ---");
            
            BaseClass baseObj = new BaseClass();
            DerivedClass derivedObj = new DerivedClass();
            BaseClass polymorphicObj = new DerivedClass();
            
            // Each calls its own implementation
            baseObj.Show();      // BaseClass.Show()
            derivedObj.Show();   // DerivedClass.Show()
            
            // This calls BaseClass.Show() because the method is hidden, not overridden
            polymorphicObj.Show(); // BaseClass.Show()
            
            Console.WriteLine("\nInheritance and Polymorphism Demo Completed");
        }
    }
}`,
          exercise: {
            instructions:
              'Create a vehicle hierarchy to demonstrate inheritance and polymorphism. Start with an abstract Vehicle base class with properties for Make, Model, Year, and abstract methods for CalculateFuelEfficiency() and DisplayInfo(). Implement derived classes for Car, Motorcycle, and Truck, each with appropriate specialized properties and method implementations. Override ToString() for meaningful string representation. Add a virtual ApplyDiscount() method in the base class and override it in at least one derived class. Create a class called VehicleManager with a method that accepts a collection of vehicles and performs operations on them polymorphically (e.g., calculating average fuel efficiency, displaying all vehicle info). Demonstrate method hiding with a new method in one of the classes.',
          },
        },
        {
          title: 'Interfaces',
          explanation: `
        <p>Interfaces define contracts that classes can implement, providing a powerful tool for creating flexible, decoupled systems:</p>
        
        <h4>Interfaces as Contracts</h4>
        <p>An interface is a type that defines a contract consisting of members that implementing classes must provide:</p>

        <p><strong>Method signatures:</strong> Interfaces can declare methods without implementations that implementing classes must define.</p>

        <p><strong>Properties:</strong> Interfaces can declare properties (with getters and/or setters) that implementing classes must implement.</p>

        <p><strong>Events:</strong> Interfaces can declare events that implementing classes must provide.</p>

        <p><strong>Indexers:</strong> Interfaces can declare indexers that implementing classes must implement.</p>

        <h4>Implementing Interfaces</h4>
        <p>Classes and structs can implement one or more interfaces, adhering to their contracts:</p>

        <p><strong>The : operator:</strong> Used to specify that a class implements an interface, similar to inheritance syntax.</p>

        <p><strong>Multiple interfaces:</strong> A class can implement any number of interfaces, unlike inheritance which is limited to a single base class.</p>

        <p><strong>Explicit implementation:</strong> When a class implements multiple interfaces with the same method names, explicit implementation allows disambiguation by specifying which interface a method belongs to.</p>

        <h4>Interface Features in Modern C#</h4>
        <p>Recent versions of C# have added new capabilities to interfaces:</p>

        <p><strong>Default implementations:</strong> Starting with C# 8.0, interfaces can provide default implementations for methods, allowing evolution of interfaces without breaking existing implementations.</p>

        <p><strong>Static members:</strong> C# 8.0 allows static members in interfaces, enabling utility methods related to the interface concept.</p>

        <p><strong>Private members:</strong> Interfaces can now have private members to support default implementations without exposing them as part of the public contract.</p>

        <h4>Interfaces vs. Abstract Classes</h4>
        <p>While both interfaces and abstract classes enable polymorphism, they serve different purposes:</p>

        <p><strong>Multiple implementation:</strong> A class can implement multiple interfaces but can inherit from only one abstract class.</p>

        <p><strong>State:</strong> Interfaces traditionally cannot contain fields (state), while abstract classes can.</p>

        <p><strong>Implementation:</strong> Abstract classes can provide partial implementations, while interfaces (prior to C# 8.0) could only declare members without implementation.</p>

        <p><strong>Access modifiers:</strong> Abstract class members can have different access modifiers, while interface members are implicitly public.</p>
        
        <div class="code-example">
          <pre><code>// Interface declaration
public interface ILogger
{
    // Method declaration
    void Log(string message);
    
    // Property declaration
    bool IsEnabled { get; set; }
    
    // Event declaration
    event EventHandler LogChanged;
    
    // Indexer declaration
    string this[int logIndex] { get; }
    
    // C# 8.0 default implementation
    void LogError(string message)
    {
        Log($"ERROR: {message}");
    }
}

// Class implementing the interface
public class ConsoleLogger : ILogger
{
    private bool _isEnabled = true;
    private List<string> _logs = new List<string>();
    
    // Implement Log method
    public void Log(string message)
    {
        if (_isEnabled)
        {
            string log = $"[{DateTime.Now}] {message}";
            _logs.Add(log);
            Console.WriteLine(log);
            OnLogChanged();
        }
    }
    
    // Implement IsEnabled property
    public bool IsEnabled
    {
        get { return _isEnabled; }
        set { _isEnabled = value; }
    }
    
    // Implement LogChanged event
    public event EventHandler LogChanged;
    
    // Implement indexer
    public string this[int logIndex]
    {
        get { return logIndex < _logs.Count ? _logs[logIndex] : null; }
    }
    
    // Helper method to raise the event
    protected virtual void OnLogChanged()
    {
        LogChanged?.Invoke(this, EventArgs.Empty);
    }
}</code></pre>
        </div>
        
        <h4>Multiple Interface Implementation and Explicit Implementation</h4>
        <div class="code-example">
          <pre><code>// Another interface
public interface IFileWriter
{
    void Write(string message);
    bool IsEnabled { get; set; }
}

// Class implementing multiple interfaces
public class FileLogger : ILogger, IFileWriter
{
    private bool _isEnabled = true;
    private List<string> _logs = new List<string>();
    private string _filePath;
    
    public FileLogger(string filePath)
    {
        _filePath = filePath;
    }
    
    // Explicit implementation of ILogger.Log
    void ILogger.Log(string message)
    {
        if (_isEnabled)
        {
            string log = $"[{DateTime.Now}] {message}";
            _logs.Add(log);
            File.AppendAllText(_filePath, log + Environment.NewLine);
            OnLogChanged();
        }
    }
    
    // Explicit implementation of IFileWriter.Write
    void IFileWriter.Write(string message)
    {
        File.AppendAllText(_filePath, message + Environment.NewLine);
    }
    
    // Shared implementation for IsEnabled
    public bool IsEnabled
    {
        get { return _isEnabled; }
        set { _isEnabled = value; }
    }
    
    public event EventHandler LogChanged;
    
    public string this[int logIndex]
    {
        get { return logIndex < _logs.Count ? _logs[logIndex] : null; }
    }
    
    protected virtual void OnLogChanged()
    {
        LogChanged?.Invoke(this, EventArgs.Empty);
    }
}</code></pre>
        </div>
        
        <div class="interview-tip">
          <p><span class="interview-icon">🎯</span> <strong>Interview Focus:</strong> Be prepared to discuss when to use interfaces versus abstract classes, and how to design effective interfaces.</p>
          <p>Key areas to focus on:</p>
          <ul>
            <li>Interface segregation principle (ISP) and how it influences interface design</li>
            <li>Explicit interface implementation and when to use it</li>
            <li>Advantages of dependency injection with interfaces</li>
            <li>Impact of default interface methods on backward compatibility</li>
            <li>Common interface patterns like IDisposable, IEnumerable, and IComparable</li>
          </ul>
        </div>
      `,
          codeExample: `// Comprehensive demonstration of interfaces in C#

using System;
using System.Collections.Generic;
using System.IO;

namespace InterfacesDemo
{
    // Basic interface definition
    public interface IStorable
    {
        // Method declaration
        void Save(string filename);
        void Load(string filename);
        
        // Property declaration
        bool IsDirty { get; set; }
        DateTime LastSaved { get; }
    }
    
    // Interface with event
    public interface INotifiable
    {
        // Event declaration
        event EventHandler<StatusChangedEventArgs> StatusChanged;
        
        // Method declaration
        void Notify(string message);
    }
    
    // Custom event args
    public class StatusChangedEventArgs : EventArgs
    {
        public string Status { get; }
        public DateTime Timestamp { get; }
        
        public StatusChangedEventArgs(string status)
        {
            Status = status;
            Timestamp = DateTime.Now;
        }
    }
    
    // Interface with indexer
    public interface IDataCollection
    {
        // Indexer declaration
        string this[int index] { get; set; }
        
        // Properties
        int Count { get; }
        bool IsReadOnly { get; }
        
        // Methods
        void Add(string item);
        bool Remove(string item);
        void Clear();
    }
    
    // Interface with generic method
    public interface IConverter
    {
        // Generic method declaration
        T ConvertTo<T>(object input);
        
        // Regular method
        bool CanConvert(Type targetType);
    }
    
    // Interface with default implementation (C# 8.0+)
    public interface ILogger
    {
        // Regular method declaration
        void Log(string message);
        
        // Property
        LogLevel MinimumLevel { get; set; }
        
        // Default implementation
        void LogInformation(string message)
        {
            if (MinimumLevel <= LogLevel.Information)
                Log($"[INFO] {message}");
        }
        
        void LogWarning(string message)
        {
            if (MinimumLevel <= LogLevel.Warning)
                Log($"[WARNING] {message}");
        }
        
        void LogError(string message)
        {
            if (MinimumLevel <= LogLevel.Error)
                Log($"[ERROR] {message}");
        }
        
        // Static method in interface (C# 8.0+)
        static string FormatMessage(string message, LogLevel level)
        {
            return $"[{level}] [{DateTime.Now}] {message}";
        }
    }
    
    // Enum for ILogger
    public enum LogLevel
    {
        Debug = 0,
        Information = 1,
        Warning = 2,
        Error = 3,
        Critical = 4
    }
    
    // Class implementing a single interface
    public class Document : IStorable
    {
        private string _content;
        private bool _isDirty;
        private DateTime _lastSaved;
        
        public string Title { get; set; }
        public string Author { get; set; }
        public string Content
        {
            get { return _content; }
            set
            {
                if (_content != value)
                {
                    _content = value;
                    IsDirty = true;
                }
            }
        }
        
        // Implementing interface property
        public bool IsDirty
        {
            get { return _isDirty; }
            set { _isDirty = value; }
        }
        
        public DateTime LastSaved
        {
            get { return _lastSaved; }
            private set { _lastSaved = value; }
        }
        
        public Document(string title, string author)
        {
            Title = title;
            Author = author;
            _content = string.Empty;
            _isDirty = false;
            _lastSaved = DateTime.MinValue;
        }
        
        // Implementing interface methods
        public void Save(string filename)
        {
            Console.WriteLine($"Saving document '{Title}' to {filename}");
            
            try
            {
                // Create a formatted version of the document to save
                string documentText = $"Title: {Title}\r\nAuthor: {Author}\r\n\r\n{Content}";
                File.WriteAllText(filename, documentText);
                
                IsDirty = false;
                LastSaved = DateTime.Now;
                
                Console.WriteLine("Document saved successfully");
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Error saving document: {ex.Message}");
                throw; // Re-throw to let caller handle it
            }
        }
        
        public void Load(string filename)
        {
            Console.WriteLine($"Loading document from {filename}");
            
            try
            {
                if (!File.Exists(filename))
                {
                    Console.WriteLine("File not found");
                    return;
                }
                
                string[] lines = File.ReadAllLines(filename);
                
                if (lines.Length >= 2)
                {
                    Title = lines[0].Replace("Title: ", "");
                    Author = lines[1].Replace("Author: ", "");
                    
                    // Join remaining lines as content
                    Content = string.Join(Environment.NewLine, 
                        lines, 3, lines.Length - 3);
                    
                    IsDirty = false;
                    Console.WriteLine("Document loaded successfully");
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Error loading document: {ex.Message}");
                throw; // Re-throw to let caller handle it
            }
        }
        
        // Method to add content without making document dirty
        public void AppendWithoutDirty(string text)
        {
            bool currentIsDirty = IsDirty;
            _content += text;
            IsDirty = currentIsDirty;
        }
    }
    
    // Class implementing multiple interfaces
    public class DataManager : IStorable, INotifiable, IDataCollection
    {
        private List<string> _data = new List<string>();
        private bool _isDirty;
        private DateTime _lastSaved;
        private bool _isReadOnly;
        
        // Implement IStorable
        public bool IsDirty
        {
            get { return _isDirty; }
            set { _isDirty = value; }
        }
        
        public DateTime LastSaved
        {
            get { return _lastSaved; }
            private set { _lastSaved = value; }
        }
        
        public void Save(string filename)
        {
            OnStatusChanged(new StatusChangedEventArgs("Saving data..."));
            File.WriteAllLines(filename, _data);
            LastSaved = DateTime.Now;
            IsDirty = false;
            OnStatusChanged(new StatusChangedEventArgs("Data saved successfully"));
        }
        
        public void Load(string filename)
        {
            OnStatusChanged(new StatusChangedEventArgs("Loading data..."));
            _data.Clear();
            _data.AddRange(File.ReadAllLines(filename));
            IsDirty = false;
            OnStatusChanged(new StatusChangedEventArgs("Data loaded successfully"));
        }
        
        // Implement INotifiable
        public event EventHandler<StatusChangedEventArgs> StatusChanged;
        
        public void Notify(string message)
        {
            OnStatusChanged(new StatusChangedEventArgs(message));
        }
        
        protected virtual void OnStatusChanged(StatusChangedEventArgs e)
        {
            StatusChanged?.Invoke(this, e);
        }
        
        // Implement IDataCollection
        public string this[int index]
        {
            get
            {
                if (index < 0 || index >= _data.Count)
                    throw new IndexOutOfRangeException("Index is out of range");
                return _data[index];
            }
            set
            {
                if (_isReadOnly)
                    throw new InvalidOperationException("Collection is read-only");
                    
                if (index < 0 || index >= _data.Count)
                    throw new IndexOutOfRangeException("Index is out of range");
                    
                _data[index] = value;
                IsDirty = true;
                OnStatusChanged(new StatusChangedEventArgs("Data item updated"));
            }
        }
        
        public int Count => _data.Count;
        
        public bool IsReadOnly
        {
            get { return _isReadOnly; }
            private set { _isReadOnly = value; }
        }
        
        public void Add(string item)
        {
            if (_isReadOnly)
                throw new InvalidOperationException("Collection is read-only");
                
            _data.Add(item);
            IsDirty = true;
            OnStatusChanged(new StatusChangedEventArgs("Item added"));
        }
        
        public bool Remove(string item)
        {
            if (_isReadOnly)
                throw new InvalidOperationException("Collection is read-only");
                
            bool result = _data.Remove(item);
            if (result)
            {
                IsDirty = true;
                OnStatusChanged(new StatusChangedEventArgs("Item removed"));
            }
            return result;
        }
        
        public void Clear()
        {
            if (_isReadOnly)
                throw new InvalidOperationException("Collection is read-only");
                
            _data.Clear();
            IsDirty = true;
            OnStatusChanged(new StatusChangedEventArgs("Collection cleared"));
        }
        
        // Method to set read-only status
        public void SetReadOnly(bool readOnly)
        {
            IsReadOnly = readOnly;
            OnStatusChanged(new StatusChangedEventArgs(
                readOnly ? "Collection is now read-only" : "Collection is now writable"));
        }
    }
    
    // Class with explicit interface implementation
    public class MultiLogger : ILogger, INotifiable
    {
        private LogLevel _minimumLevel = LogLevel.Information;
        private List<string> _logs = new List<string>();
        
        // Explicit implementation of ILogger interface
        void ILogger.Log(string message)
        {
            string formattedMessage = $"[{DateTime.Now}] {message}";
            _logs.Add(formattedMessage);
            Console.WriteLine($"Logger: {formattedMessage}");
        }
        
        LogLevel ILogger.MinimumLevel
        {
            get { return _minimumLevel; }
            set { _minimumLevel = value; }
        }
        
        // Explicit implementation of INotifiable interface
        event EventHandler<StatusChangedEventArgs> INotifiable.StatusChanged
        {
            add { _statusChanged += value; }
            remove { _statusChanged -= value; }
        }
        
        private event EventHandler<StatusChangedEventArgs> _statusChanged;
        
        void INotifiable.Notify(string message)
        {
            OnStatusChanged(new StatusChangedEventArgs(message));
        }
        
        // Helper method for raising the event
        private void OnStatusChanged(StatusChangedEventArgs e)
        {
            _statusChanged?.Invoke(this, e);
        }
        
        // Public method that uses the interfaces internally
        public void LogMessage(string message, LogLevel level)
        {
            // Cast this to ILogger to call the explicit implementation
            if (level >= _minimumLevel)
            {
                ((ILogger)this).Log($"[{level}] {message}");
                OnStatusChanged(new StatusChangedEventArgs($"Logged: {message}"));
            }
        }
        
        public void SetMinimumLevel(LogLevel level)
        {
            ((ILogger)this).MinimumLevel = level;
            OnStatusChanged(new StatusChangedEventArgs($"Minimum log level set to {level}"));
        }
        
        public void DisplayAllLogs()
        {
            Console.WriteLine("\nAll logs:");
            foreach (var log in _logs)
            {
                Console.WriteLine(log);
            }
        }
    }
    
    // Generic interface
    public interface IRepository<T>
    {
        void Add(T item);
        bool Remove(T item);
        T GetById(int id);
        IEnumerable<T> GetAll();
        int Count { get; }
    }
    
    // Simple entity class for the generic interface
    public class Product
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public decimal Price { get; set; }
        
        public override string ToString()
        {
            return $"Product {Id}: {Name}, Price: \${Price:F2}";
        }
    }
    
    // Implementation of the generic interface
    public class ProductRepository : IRepository<Product>
    {
        private List<Product> _products = new List<Product>();
        private int _nextId = 1;
        
        public void Add(Product item)
        {
            if (item.Id == 0)
            {
                item.Id = _nextId++;
            }
            
            _products.Add(item);
            Console.WriteLine($"Added: {item}");
        }
        
        public bool Remove(Product item)
        {
            var productToRemove = _products.Find(p => p.Id == item.Id);
            if (productToRemove != null)
            {
                _products.Remove(productToRemove);
                Console.WriteLine($"Removed: {productToRemove}");
                return true;
            }
            
            return false;
        }
        
        public Product GetById(int id)
        {
            return _products.Find(p => p.Id == id);
        }
        
        public IEnumerable<Product> GetAll()
        {
            return _products.AsReadOnly();
        }
        
        public int Count => _products.Count;
    }
    
    // Class that uses interfaces for dependency injection
    public class StoreManager
    {
        private readonly IRepository<Product> _productRepository;
        private readonly ILogger _logger;
        
        // Constructor injection of dependencies
        public StoreManager(IRepository<Product> productRepository, ILogger logger)
        {
            _productRepository = productRepository;
            _logger = logger;
        }
        
        public void AddProduct(string name, decimal price)
        {
            var product = new Product { Name = name, Price = price };
            _productRepository.Add(product);
            _logger.LogInformation($"Product added: {name} at \${price:F2}");
        }
        
        public void ListAllProducts()
        {
            _logger.LogInformation("Listing all products");
            
            var products = _productRepository.GetAll();
            foreach (var product in products)
            {
                Console.WriteLine(product);
            }
            
            Console.WriteLine($"Total products: {_productRepository.Count}");
        }
        
        public bool DeleteProduct(int id)
        {
            var product = _productRepository.GetById(id);
            if (product != null)
            {
                bool result = _productRepository.Remove(product);
                _logger.LogInformation($"Product deleted: {product.Name}");
                return result;
            }
            
            _logger.LogWarning($"Product with ID {id} not found");
            return false;
        }
    }
    
    // Demo class
    public class InterfacesDemo
    {
        public static void RunDemo()
        {
            Console.WriteLine("*** Interfaces Demo ***");
            
            // Basic interface implementation demo
            Console.WriteLine("\n--- Basic Interface Implementation ---");
            
            var document = new Document("My Document", "John Doe");
            document.Content = "This is the content of my document.";
            Console.WriteLine($"Document: {document.Title} by {document.Author}");
            Console.WriteLine($"IsDirty: {document.IsDirty}");
            
            try
            {
                document.Save("document.txt");
                Console.WriteLine($"Last saved: {document.LastSaved}");
                Console.WriteLine($"IsDirty after save: {document.IsDirty}");
                
                var loadedDoc = new Document("", "");
                loadedDoc.Load("document.txt");
                Console.WriteLine($"Loaded: {loadedDoc.Title} by {loadedDoc.Author}");
                Console.WriteLine($"Content: {loadedDoc.Content}");
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Error: {ex.Message}");
            }
            
            // Multiple interfaces implementation demo
            Console.WriteLine("\n--- Multiple Interfaces Implementation ---");
            
            var dataManager = new DataManager();
            
            // Handle the status changed event
            dataManager.StatusChanged += (sender, e) => {
                Console.WriteLine($"Status: {e.Status} at {e.Timestamp:HH:mm:ss}");
            };
            
            // Use IDataCollection interface methods
            dataManager.Add("Item 1");
            dataManager.Add("Item 2");
            dataManager.Add("Item 3");
            
            Console.WriteLine($"Count: {dataManager.Count}");
            
            // Use indexer
            Console.WriteLine($"Item at index 1: {dataManager[1]}");
            dataManager[1] = "Updated Item 2";
            Console.WriteLine($"Updated item: {dataManager[1]}");
            
            // Use INotifiable interface
            dataManager.Notify("Custom notification");
            
            // Use IStorable interface
            try
            {
                dataManager.Save("data.txt");
                dataManager.Clear();
                Console.WriteLine($"After clear, count: {dataManager.Count}");
                dataManager.Load("data.txt");
                Console.WriteLine($"After load, count: {dataManager.Count}");
                
                for (int i = 0; i < dataManager.Count; i++)
                {
                    Console.WriteLine($"Item {i}: {dataManager[i]}");
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Error: {ex.Message}");
            }
            
            // Explicit interface implementation demo
            Console.WriteLine("\n--- Explicit Interface Implementation ---");
            
            var multiLogger = new MultiLogger();
            
            // Subscribe to status changed event using explicit implementation
            ((INotifiable)multiLogger).StatusChanged += (sender, e) => {
                Console.WriteLine($"MultiLogger status: {e.Status}");
            };
            
            // Set minimum log level
            multiLogger.SetMinimumLevel(LogLevel.Warning);
            
            // These won't show because they're below the minimum level
            multiLogger.LogMessage("This is an information message", LogLevel.Information);
            
            // These will show
            multiLogger.LogMessage("This is a warning", LogLevel.Warning);
            multiLogger.LogMessage("This is an error", LogLevel.Error);
            
            // Display all logs
            multiLogger.DisplayAllLogs();
            
            // Accessing the interface methods directly
            ILogger loggerInterface = multiLogger;
            loggerInterface.LogError("Direct error through interface");
            
            INotifiable notifiableInterface = multiLogger;
            notifiableInterface.Notify("Direct notification through interface");
            
            // Generic interface and dependency injection demo
            Console.WriteLine("\n--- Generic Interface and DI Demo ---");
            
            // Create implementations
            var productRepo = new ProductRepository();
            var logger = new MultiLogger();
            ((ILogger)logger).MinimumLevel = LogLevel.Debug;
            
            // Create manager that depends on interfaces
            var storeManager = new StoreManager(productRepo, (ILogger)logger);
            
            // Use the manager to work with products
            storeManager.AddProduct("Laptop", 999.99m);
            storeManager.AddProduct("Smartphone", 699.99m);
            storeManager.AddProduct("Tablet", 349.99m);
            
            storeManager.ListAllProducts();
            
            storeManager.DeleteProduct(2);
            
            storeManager.ListAllProducts();
            
            // Display logs
            Console.WriteLine("\nFinal logs:");
            multiLogger.DisplayAllLogs();
        }
    }
}`,
          exercise: {
            instructions:
              'Create a content management system that demonstrates interfaces. Define an IContent interface with methods for Display() and GetSummary(), and properties for Title and CreationDate. Define an ISearchable interface with methods for MatchesQuery(string query) and GetSearchableText(). Create an IVersionable interface with methods for SaveVersion() and RevertToVersion(int version). Implement concrete classes for different content types (e.g., TextDocument, Image, Video) that implement appropriate interfaces. Create a ContentManager class that works with collections of IContent objects. Demonstrate using interfaces polymorphically, including explicit interface implementation when there are naming conflicts. Show how to use interfaces for dependency injection in a SearchEngine class that accepts an ISearchable collection.',
          },
        },
      ],
      prepperSummary: `
    <div class="prepper-summary">
      <h3>🔑 Key Interview Takeaways</h3>
      <ul>
        <li><strong>Classes and Objects:</strong> Understand the difference between classes (blueprints) and objects (instances), and how to design effective classes with appropriate encapsulation.</li>
        
        <li><strong>Encapsulation:</strong> Know how to use access modifiers and properties to control access to class data, ensuring data integrity and reducing dependencies.</li>
        
        <li><strong>Constructors and Destructors:</strong> Implement proper initialization with constructors and resource cleanup with finalizers or the IDisposable pattern.</li>
        
        <li><strong>Inheritance and Polymorphism:</strong> Create type hierarchies using inheritance, understand when to use virtual/abstract/override, and how polymorphism enables more flexible code.</li>
        
        <li><strong>Interfaces:</strong> Design contracts with interfaces to enable loose coupling, dependency injection, and greater flexibility than inheritance alone can provide.</li>
      </ul>
      
      <h4>📝 Common Interview Questions</h4>
      <ol>
        <li>"What is the difference between abstract classes and interfaces? When would you use each?"</li>
        <li>"Explain the concept of encapsulation and how it's implemented in C#"</li>
        <li>"How does method overriding work in C#? What's the difference between override and new?"</li>
        <li>"Explain the IDisposable pattern and when to use it"</li>
        <li>"What are the benefits of programming to interfaces rather than concrete implementations?"</li>
      </ol>
    </div>
  `,
    }, // End of Lesson 3
    {
      title: 'Strings and Text Handling',
      description: 'Learn how to work with strings, text, and regular expressions in C#.',
      sections: [
        {
          title: 'String Basics',
          explanation: `
        <p>Strings in C# are immutable sequences of characters with rich functionality for text manipulation:</p>
        
        <h4>String Characteristics</h4>
        <p>The string type in C# has several important characteristics:</p>

        <p><strong>Immutability:</strong> Once created, a string's value cannot be changed. Operations that appear to modify a string actually create a new string instance.</p>

        <p><strong>Reference type:</strong> string is a reference type, but it has value-like semantics for equality comparisons.</p>

        <p><strong>Unicode support:</strong> Strings store characters as UTF-16 code units, allowing representation of virtually any character from any language.</p>

        <p><strong>String literals:</strong> Created using double quotes, with support for escape sequences (\\, \\n, \\t, etc.) and special formats like verbatim strings (@"...").</p>

        <h4>String Creation and Manipulation</h4>
        <p>C# offers multiple ways to create and manipulate strings:</p>

        <p><strong>Concatenation:</strong> Using the + operator or string.Concat method to join strings together.</p>

        <p><strong>Interpolation:</strong> Using $"..." syntax to embed expressions directly in string literals (C# 6.0+).</p>

        <p><strong>StringBuilder:</strong> For building strings through multiple operations, avoiding the performance overhead of creating many intermediate string objects.</p>

        <p><strong>Common operations:</strong> Methods for searching (IndexOf, Contains), extracting (Substring), modifying (Replace, Trim), and analyzing (StartsWith, EndsWith) strings.</p>

        <h4>String Comparisons</h4>
        <p>String comparisons require careful consideration of culture and case sensitivity:</p>

        <p><strong>Default comparison:</strong> String comparisons are case-sensitive by default.</p>

        <p><strong>StringComparison enum:</strong> Controls how strings are compared, allowing for case-insensitive and culture-specific comparisons.</p>

        <p><strong>Ordinal vs cultural:</strong> Ordinal comparisons are faster but culturally unaware, while culture-sensitive comparisons respect language rules.</p>

        <p><strong>Equality methods:</strong> string.Equals and == operator can be used for equality checks, with appropriate StringComparison settings.</p>
        
        <div class="code-example">
          <pre><code>// String creation
string s1 = "Hello";
string s2 = "World";
char[] letters = { 'H', 'e', 'l', 'l', 'o' };
string s3 = new string(letters);

// String concatenation
string combined = s1 + ", " + s2 + "!";  // "Hello, World!"
string concat = string.Concat(s1, ", ", s2, "!");

// String interpolation (C# 6.0+)
string name = "Alice";
int age = 30;
string message = $"{name} is {age} years old.";

// Verbatim string literal (preserves whitespace and line breaks)
string path = @"C:\\Program Files\\App\\Data";  // No need to escape backslashes
string multiLine = @"This is line 1
This is line 2";

// String escape sequences
string escaped = "Tab: \t Newline: \n Quote: \\"";

// String with Unicode characters
string heart = "I \u2764 C#";  // "I ❤ C#"</code></pre>
        </div>
        
        <h4>Common String Operations</h4>
        <div class="code-example">
          <pre><code>// String length and access
string text = "Hello, World!";
int length = text.Length;  // 13
char firstChar = text[0];  // 'H'

// Substring
string sub = text.Substring(7, 5);  // "World"

// Searching
int index = text.IndexOf("World");  // 7
int lastIndex = text.LastIndexOf("o");  // 8
bool contains = text.Contains("Hello");  // true

// Case conversion
string upper = text.ToUpper();  // "HELLO, WORLD!"
string lower = text.ToLower();  // "hello, world!"

// Trimming
string padded = "  Hello  ";
string trimmed = padded.Trim();  // "Hello"
string trimStart = padded.TrimStart();  // "Hello  "
string trimEnd = padded.TrimEnd();  // "  Hello"

// Replacing
string newText = text.Replace("World", "C#");  // "Hello, C#!"

// Splitting
string csv = "apple,banana,orange";
string[] fruits = csv.Split(',');  // ["apple", "banana", "orange"]

// Joining
string[] colors = { "red", "green", "blue" };
string joined = string.Join(", ", colors);  // "red, green, blue"</code></pre>
        </div>
        
        <div class="interview-tip">
          <p><span class="interview-icon">🎯</span> <strong>Interview Focus:</strong> Be prepared to discuss string immutability, performance considerations, and proper string comparison techniques.</p>
          <p>Key areas to focus on:</p>
          <ul>
            <li>Understanding the performance implications of string concatenation</li>
            <li>Knowing when to use StringBuilder instead of string concatenation</li>
            <li>Correct handling of string comparisons with appropriate StringComparison options</li>
            <li>Understanding the memory implications of string interning</li>
            <li>Proper techniques for parsing and formatting strings</li>
          </ul>
        </div>
      `,
          codeExample: `// Comprehensive string handling examples in C#

using System;
using System.Globalization;
using System.Text;
using System.Linq;

namespace StringExamples
{
    public class StringBasicsDemo
    {
        public void BasicStringOperations()
        {
            Console.WriteLine("=== Basic String Operations ===\n");
            
            // String creation
            string s1 = "Hello";
            string s2 = "World";
            
            // String concatenation
            string combined = s1 + " " + s2;
            Console.WriteLine($"Concatenation: {combined}");
            
            // String.Format
            string formatted = string.Format("The value is {0} and {1}.", s1, s2);
            Console.WriteLine($"Formatted: {formatted}");
            
            // String interpolation (C# 6.0+)
            string interpolated = $"{s1}, {s2}!";
            Console.WriteLine($"Interpolated: {interpolated}");
            
            // Multi-line string using verbatim literal
            string multiLine = @"This is line 1
This is line 2
This is line 3";
            Console.WriteLine("\nMulti-line string:");
            Console.WriteLine(multiLine);
            
            // String with escape sequences
            string escaped = "Column1\tColumn2\tColumn3\nValue1\tValue2\tValue3";
            Console.WriteLine("\nEscaped string:");
            Console.WriteLine(escaped);
            
            // String with Unicode characters
            string unicode = "Unicode symbols: \u03C0 (pi), \u2665 (heart), \u2022 (bullet)";
            Console.WriteLine("\nUnicode: " + unicode);
            
            // Creating a string from a character array
            char[] chars = { 'H', 'e', 'l', 'l', 'o' };
            string fromChars = new string(chars);
            Console.WriteLine($"From char array: {fromChars}");
            
            // Repeating a character
            string repeated = new string('*', 20);
            Console.WriteLine($"Repeated: {repeated}");
        }
        
        public void StringProperties()
        {
            Console.WriteLine("\n=== String Properties ===\n");
            
            string text = "Hello, World!";
            
            // Length
            Console.WriteLine($"Length: {text.Length}");
            
            // Accessing individual characters
            Console.WriteLine($"First character: {text[0]}");
            Console.WriteLine($"Last character: {text[text.Length - 1]}");
            
            // Checking emptiness
            string empty = "";
            string nullString = null;
            string whitespace = "    ";
            
            Console.WriteLine($"Is empty string empty? {string.IsNullOrEmpty(empty)}");
            Console.WriteLine($"Is null string empty? {string.IsNullOrEmpty(nullString)}");
            Console.WriteLine($"Is whitespace string empty? {string.IsNullOrEmpty(whitespace)}");
            Console.WriteLine($"Is whitespace string whitespace? {string.IsNullOrWhiteSpace(whitespace)}");
            
            // String interning
            string s1 = "Hello";
            string s2 = "Hello";
            string s3 = new string(new char[] { 'H', 'e', 'l', 'l', 'o' });
            string s4 = string.Intern(s3);
            
            Console.WriteLine($"s1 and s2 same reference? {object.ReferenceEquals(s1, s2)}");
            Console.WriteLine($"s1 and s3 same reference? {object.ReferenceEquals(s1, s3)}");
            Console.WriteLine($"s1 and s4 same reference? {object.ReferenceEquals(s1, s4)}");
        }
        
        public void StringModification()
        {
            Console.WriteLine("\n=== String Modification ===\n");
            
            string original = "  Hello, World!  ";
            
            // Trimming whitespace
            string trimmed = original.Trim();
            string trimStart = original.TrimStart();
            string trimEnd = original.TrimEnd();
            
            Console.WriteLine($"Original: '{original}'");
            Console.WriteLine($"Trimmed: '{trimmed}'");
            Console.WriteLine($"TrimStart: '{trimStart}'");
            Console.WriteLine($"TrimEnd: '{trimEnd}'");
            
            // Case conversion
            string lower = original.ToLower();
            string upper = original.ToUpper();
            
            Console.WriteLine($"ToLower: '{lower}'");
            Console.WriteLine($"ToUpper: '{upper}'");
            
            // Culture-specific case conversion
            string turkishI = "istanbul";
            string turkishUpperI = turkishI.ToUpper(CultureInfo.GetCultureInfo("tr-TR"));
            string invariantUpperI = turkishI.ToUpper(CultureInfo.InvariantCulture);
            
            Console.WriteLine($"Turkish ToUpper: '{turkishUpperI}'");
            Console.WriteLine($"Invariant ToUpper: '{invariantUpperI}'");
            
            // Replacing
            string replaced = original.Replace("Hello", "Hi");
            string replacedChar = original.Replace(',', ':');
            
            Console.WriteLine($"Replace 'Hello' with 'Hi': '{replaced}'");
            Console.WriteLine($"Replace ',' with ':': '{replacedChar}'");
            
            // Remove
            string removed = "Hello, World!".Remove(5, 2);  // Remove ", "
            Console.WriteLine($"Remove 2 chars at position 5: '{removed}'");
            
            // Insert
            string inserted = "Hello World!".Insert(5, ", beautiful");
            Console.WriteLine($"Insert at position 5: '{inserted}'");
            
            // PadLeft and PadRight
            string number = "42";
            string padded = number.PadLeft(5, '0');
            string rightPadded = number.PadRight(5, '-');
            
            Console.WriteLine($"PadLeft: '{padded}'");
            Console.WriteLine($"PadRight: '{rightPadded}'");
        }
        
        public void StringSearching()
        {
            Console.WriteLine("\n=== String Searching ===\n");
            
            string text = "The quick brown fox jumps over the lazy dog.";
            
            // IndexOf - find first occurrence
            int index = text.IndexOf("fox");
            Console.WriteLine($"IndexOf 'fox': {index}");
            
            // LastIndexOf - find last occurrence
            int lastIndex = text.LastIndexOf("the");
            Console.WriteLine($"LastIndexOf 'the': {lastIndex}");
            
            // IndexOf with start position
            int indexFrom = text.IndexOf("the", 10);
            Console.WriteLine($"IndexOf 'the' from position 10: {indexFrom}");
            
            // IndexOfAny - find any of the specified characters
            char[] chars = { 'q', 'z', 'x' };
            int anyIndex = text.IndexOfAny(chars);
            Console.WriteLine($"IndexOfAny ['q','z','x']: {anyIndex} ('{text[anyIndex]}')");
            
            // Contains
            bool contains = text.Contains("brown");
            Console.WriteLine($"Contains 'brown': {contains}");
            
            // Case-insensitive Contains (C# 8.0+)
            // bool containsInsensitive = text.Contains("BROWN", StringComparison.OrdinalIgnoreCase);
            // Previous versions:
            bool containsInsensitive = text.IndexOf("BROWN", StringComparison.OrdinalIgnoreCase) >= 0;
            Console.WriteLine($"Contains 'BROWN' (case insensitive): {containsInsensitive}");
            
            // StartsWith and EndsWith
            bool startsWith = text.StartsWith("The");
            bool endsWith = text.EndsWith("dog.");
            
            Console.WriteLine($"StartsWith 'The': {startsWith}");
            Console.WriteLine($"EndsWith 'dog.': {endsWith}");
            
            // StartsWith and EndsWith with StringComparison
            bool startsWithInsensitive = text.StartsWith("the", StringComparison.OrdinalIgnoreCase);
            Console.WriteLine($"StartsWith 'the' (case insensitive): {startsWithInsensitive}");
        }
        
        public void StringExtraction()
        {
            Console.WriteLine("\n=== String Extraction ===\n");
            
            string text = "The quick brown fox jumps over the lazy dog.";
            
            // Substring with position
            string sub1 = text.Substring(16);  // from position 16 to end
            Console.WriteLine($"Substring from 16: '{sub1}'");
            
            // Substring with position and length
            string sub2 = text.Substring(4, 5);  // 5 characters starting at position 4
            Console.WriteLine($"Substring from 4, length 5: '{sub2}'");
            
            // Using Span for zero-allocation substrings (C# 7.2+)
            // ReadOnlySpan<char> span = text.AsSpan(4, 5);
            // Console.WriteLine($"Span from 4, length 5: '{span.ToString()}'");
            
            // Split string into array
            string[] words = text.Split(' ');
            Console.WriteLine("Split by space:");
            for (int i = 0; i < words.Length; i++)
            {
                Console.WriteLine($"  Word {i}: '{words[i]}'");
            }
            
            // Split with multiple delimiters
            string csvText = "apple,banana;orange,grape;pear";
            string[] fruits = csvText.Split(new[] { ',', ';' });
            
            Console.WriteLine("Split by comma and semicolon:");
            foreach (string fruit in fruits)
            {
                Console.WriteLine($"  '{fruit}'");
            }
            
            // Split with options
            string line = "First,Second,,Fourth,";
            string[] parts = line.Split(',', StringSplitOptions.RemoveEmptyEntries);
            
            Console.WriteLine("Split removing empty entries:");
            foreach (string part in parts)
            {
                Console.WriteLine($"  '{part}'");
            }
        }
        
        public void StringComparison()
        {
            Console.WriteLine("\n=== String Comparison ===\n");
            
            string s1 = "Hello";
            string s2 = "hello";
            string s3 = "Hello";
            
            // Default comparison (case-sensitive, ordinal)
            bool equals1 = (s1 == s2);
            Console.WriteLine($"s1 == s2: {equals1}");
            
            bool equals2 = s1.Equals(s2);
            Console.WriteLine($"s1.Equals(s2): {equals2}");
            
            // Case-insensitive comparison
            bool equalsIgnoreCase = s1.Equals(s2, StringComparison.OrdinalIgnoreCase);
            Console.WriteLine($"s1.Equals(s2, StringComparison.OrdinalIgnoreCase): {equalsIgnoreCase}");
            
            // Ordinal comparison (binary comparison, faster)
            int compareOrdinal = string.CompareOrdinal(s1, s2);
            Console.WriteLine($"string.CompareOrdinal(s1, s2): {compareOrdinal}");
            
            // Culture-sensitive comparison
            int compareCulture = string.Compare(s1, s2, CultureInfo.CurrentCulture, CompareOptions.None);
            Console.WriteLine($"string.Compare(s1, s2, CurrentCulture): {compareCulture}");
            
            // Culture-sensitive, case-insensitive comparison
            int compareCultureIgnoreCase = string.Compare(s1, s2, true);
            Console.WriteLine($"string.Compare(s1, s2, true): {compareCultureIgnoreCase}");
            
            // Different StringComparison options
            Console.WriteLine("\nStringComparison examples:");
            
            // Culture-sensitive
            bool cultureEquals = string.Equals(s1, s2, StringComparison.CurrentCulture);
            bool cultureIgnoreCaseEquals = string.Equals(s1, s2, StringComparison.CurrentCultureIgnoreCase);
            
            // Culture-insensitive (using sorting rules of invariant culture)
            bool invariantEquals = string.Equals(s1, s2, StringComparison.InvariantCulture);
            bool invariantIgnoreCaseEquals = string.Equals(s1, s2, StringComparison.InvariantCultureIgnoreCase);
            
            // Binary comparison (faster, but culture-unaware)
            bool ordinalEquals = string.Equals(s1, s2, StringComparison.Ordinal);
            bool ordinalIgnoreCaseEquals = string.Equals(s1, s2, StringComparison.OrdinalIgnoreCase);
            
            Console.WriteLine($"CurrentCulture: {cultureEquals}");
            Console.WriteLine($"CurrentCultureIgnoreCase: {cultureIgnoreCaseEquals}");
            Console.WriteLine($"InvariantCulture: {invariantEquals}");
            Console.WriteLine($"InvariantCultureIgnoreCase: {invariantIgnoreCaseEquals}");
            Console.WriteLine($"Ordinal: {ordinalEquals}");
            Console.WriteLine($"OrdinalIgnoreCase: {ordinalIgnoreCaseEquals}");
            
            // Culture-specific comparison examples
            Console.WriteLine("\nCulture-specific comparison:");
            
            string word1 = "café";
            string word2 = "cafe";
            
            bool wordEquals = string.Equals(word1, word2, StringComparison.Ordinal);
            bool wordEqualsIgnoreCase = string.Equals(word1, word2, StringComparison.OrdinalIgnoreCase);
            
            Console.WriteLine($"'{word1}' == '{word2}' (Ordinal): {wordEquals}");
            Console.WriteLine($"'{word1}' == '{word2}' (OrdinalIgnoreCase): {wordEqualsIgnoreCase}");
            
            // Example with special Turkish I
            string turkish1 = "istanbul";
            string turkish2 = "İstanbul";  // Capital dotted İ
            
            CultureInfo turkishCulture = CultureInfo.GetCultureInfo("tr-TR");
            
            bool turkishEquals = string.Compare(turkish1, turkish2, turkishCulture, CompareOptions.IgnoreCase) == 0;
            bool invariantTurkishEquals = string.Compare(turkish1, turkish2, CultureInfo.InvariantCulture, CompareOptions.IgnoreCase) == 0;
            
            Console.WriteLine($"'{turkish1}' == '{turkish2}' (Turkish, IgnoreCase): {turkishEquals}");
            Console.WriteLine($"'{turkish1}' == '{turkish2}' (Invariant, IgnoreCase): {invariantTurkishEquals}");
        }
        
        public void StringBuilderExample()
        {
            Console.WriteLine("\n=== StringBuilder Example ===\n");
            
            // Create a StringBuilder with initial text
            StringBuilder sb = new StringBuilder("Hello");
            Console.WriteLine($"Initial: {sb}");
            
            // Append strings
            sb.Append(" ");
            sb.Append("World");
            sb.Append("!");
            Console.WriteLine($"After Append: {sb}");
            
            // AppendLine
            sb.AppendLine();
            sb.AppendLine("Line 2");
            sb.AppendLine("Line 3");
            Console.WriteLine($"After AppendLine: {sb}");
            
            // AppendFormat
            sb.AppendFormat("The current time is {0:HH:mm:ss}", DateTime.Now);
            Console.WriteLine($"After AppendFormat: {sb}");
            
            // Insert
            sb.Insert(5, ", beautiful");
            Console.WriteLine($"After Insert: {sb}");
            
            // Remove
            sb.Remove(5, 11);  // Remove ", beautiful"
            Console.WriteLine($"After Remove: {sb}");
            
            // Replace
            sb.Replace("World", "C#");
            Console.WriteLine($"After Replace: {sb}");
            
            // Performance comparison: String concatenation vs StringBuilder
            Console.WriteLine("\nPerformance comparison:");
            
            // String concatenation
            var sw = System.Diagnostics.Stopwatch.StartNew();
            string result = "";
            for (int i = 0; i < 10000; i++)
            {
                result += i.ToString() + ", ";
            }
            sw.Stop();
            Console.WriteLine($"String concatenation: {sw.ElapsedMilliseconds}ms");
            
            // StringBuilder
            sw.Restart();
            StringBuilder sbPerf = new StringBuilder();
            for (int i = 0; i < 10000; i++)
            {
                sbPerf.Append(i.ToString()).Append(", ");
            }
            string resultSb = sbPerf.ToString();
            sw.Stop();
            Console.WriteLine($"StringBuilder: {sw.ElapsedMilliseconds}ms");
            
            // Capacity and Length
            Console.WriteLine("\nCapacity and Length:");
            Console.WriteLine($"Initial Capacity: {new StringBuilder().Capacity}");
            
            StringBuilder sbCapacity = new StringBuilder(10);  // Initial capacity of 10
            Console.WriteLine($"Custom Capacity: {sbCapacity.Capacity}");
            
            sbCapacity.Append("This string is longer than the initial capacity.");
            Console.WriteLine($"New Capacity: {sbCapacity.Capacity}");
            Console.WriteLine($"Length: {sbCapacity.Length}");
        }
        
        public void StringFormatting()
        {
            Console.WriteLine("\n=== String Formatting ===\n");
            
            // Composite formatting
            string formatted = string.Format("Name: {0}, Age: {1}, Height: {2:F2}m", "John", 30, 1.75);
            Console.WriteLine(formatted);
            
            // Numeric formatting
            int number = 1234567;
            Console.WriteLine($"Number ({number}):");
            Console.WriteLine($"  C (Currency): {number:C}");
            Console.WriteLine($"  N (Number): {number:N}");
            Console.WriteLine($"  F (Fixed-point): {number:F2}");
            Console.WriteLine($"  E (Exponential): {number:E2}");
            Console.WriteLine($"  P (Percent): {(0.1234):P2}");
            Console.WriteLine($"  X (Hexadecimal): {number:X}");
            
            // Date formatting
            DateTime now = DateTime.Now;
            Console.WriteLine($"\nDate ({now}):");
            Console.WriteLine($"  d (Short date): {now:d}");
            Console.WriteLine($"  D (Long date): {now:D}");
            Console.WriteLine($"  t (Short time): {now:t}");
            Console.WriteLine($"  T (Long time): {now:T}");
            Console.WriteLine($"  f (Full date/short time): {now:f}");
            Console.WriteLine($"  F (Full date/time): {now:F}");
            Console.WriteLine($"  g (General date/short time): {now:g}");
            Console.WriteLine($"  G (General date/time): {now:G}");
            Console.WriteLine($"  M (Month day): {now:M}");
            Console.WriteLine($"  Y (Year month): {now:Y}");
            Console.WriteLine($"  Custom: {now:yyyy-MM-dd HH:mm:ss}");
            
            // Format with alignment and padding
            Console.WriteLine("\nAlignment and padding:");
            Console.WriteLine($"|{"Left",-10}|{"Center",^10}|{"Right",10}|");
            Console.WriteLine($"|{"Data",-10}|{"Data",^10}|{"Data",10}|");
            
            // Format with specific culture
            double amount = 1234.56;
            Console.WriteLine("\nCulture-specific formatting:");
            Console.WriteLine($"  US: {amount.ToString("C", CultureInfo.GetCultureInfo("en-US"))}");
            Console.WriteLine($"  UK: {amount.ToString("C", CultureInfo.GetCultureInfo("en-GB"))}");
            Console.WriteLine($"  JP: {amount.ToString("C", CultureInfo.GetCultureInfo("ja-JP"))}");
            Console.WriteLine($"  DE: {amount.ToString("C", CultureInfo.GetCultureInfo("de-DE"))}");
            
            // CustomFormatter
            var customFormatProvider = new CustomNumberFormatProvider();
            Console.WriteLine($"\nCustom format provider: {number.ToString("X", customFormatProvider)}");
        }
        
public void AdvancedStringOperations()
{
    Console.WriteLine("\n=== Advanced String Operations ===\n");
    
    // String.IsNullOrEmpty vs String.IsNullOrWhiteSpace
    Console.WriteLine("IsNullOrEmpty vs IsNullOrWhiteSpace:");
    string empty = "";
    string whitespace = "   \t\n";
    string nullString = null;
    
    Console.WriteLine($"Empty - IsNullOrEmpty: {string.IsNullOrEmpty(empty)}");
    Console.WriteLine($"Empty - IsNullOrWhiteSpace: {string.IsNullOrWhiteSpace(empty)}");
    
    Console.WriteLine($"Whitespace - IsNullOrEmpty: {string.IsNullOrEmpty(whitespace)}");
    Console.WriteLine($"Whitespace - IsNullOrWhiteSpace: {string.IsNullOrWhiteSpace(whitespace)}");
    
    Console.WriteLine($"Null - IsNullOrEmpty: {string.IsNullOrEmpty(nullString)}");
    Console.WriteLine($"Null - IsNullOrWhiteSpace: {string.IsNullOrWhiteSpace(nullString)}");
    
    // String.Join
    string[] words = { "apple", "banana", "cherry", "date" };
    string joined = string.Join(", ", words);
    Console.WriteLine($"\nJoined strings: {joined}");
    
    // Join with LINQ
    string joinedLinq = string.Join(" | ", words.Where(w => w.Length > 5));
    Console.WriteLine($"Joined with LINQ: {joinedLinq}");
    
    // String encoding and decoding
    Console.WriteLine("\nEncoding and decoding:");
    string original = "Hello, 世界!";  // "Hello, World!" with Chinese characters
    
    // Get bytes using UTF-8 encoding
    byte[] bytes = System.Text.Encoding.UTF8.GetBytes(original);
    Console.WriteLine($"UTF-8 bytes: {string.Join(", ", bytes)}");
    
    // Convert back to string
    string decoded = System.Text.Encoding.UTF8.GetString(bytes);
    Console.WriteLine($"Decoded: {decoded}");
    
    // String pooling and interning
    Console.WriteLine("\nString pooling and interning:");
    
    string a = "Hello";
    string b = "Hello";
    string c = new string(new char[] { 'H', 'e', 'l', 'l', 'o' });
    string d = string.Intern(c);
    
    Console.WriteLine($"a == b (value): {a == b}");
    Console.WriteLine($"a == c (value): {a == c}");
    Console.WriteLine($"a == d (value): {a == d}");
    
    Console.WriteLine($"ReferenceEquals(a, b): {object.ReferenceEquals(a, b)}");
    Console.WriteLine($"ReferenceEquals(a, c): {object.ReferenceEquals(a, c)}");
    Console.WriteLine($"ReferenceEquals(a, d): {object.ReferenceEquals(a, d)}");
    
    // Special string parsing methods
    Console.WriteLine("\nParsing examples:");
    
    string numericString = "42";
    int parsedInt = int.Parse(numericString);
    Console.WriteLine($"Parsed int: {parsedInt}");
    
    bool success = int.TryParse(numericString, out int result);
    Console.WriteLine($"TryParse success: {success}, result: {result}");
    
    string invalidNumber = "not a number";
    success = int.TryParse(invalidNumber, out result);
    Console.WriteLine($"TryParse invalid: {success}, result: {result}");
    
    // Convert between types
    Console.WriteLine("\nConversions:");
    
    int number = 123;
    string numberString = number.ToString();
    Console.WriteLine($"int to string: {numberString}");
    
    double pi = Math.PI;
    string piString = pi.ToString("F4");  // 4 decimal places
    Console.WriteLine($"double to string with format: {piString}");
    
    DateTime today = DateTime.Now;
    string dateString = today.ToString("yyyy-MM-dd");
    Console.WriteLine($"date to string: {dateString}");
    
    // Guids as strings
    Guid guid = Guid.NewGuid();
    string guidString = guid.ToString();
    string guidFormatted = guid.ToString("N");  // No dashes
    
    Console.WriteLine($"Guid: {guidString}");
    Console.WriteLine($"Guid (N format): {guidFormatted}");
}

// Custom format provider example
public class CustomNumberFormatProvider : IFormatProvider, ICustomFormatter
{
    public object GetFormat(Type formatType)
    {
        if (formatType == typeof(ICustomFormatter))
            return this;
        return null;
    }
    
    public string Format(string format, object arg, IFormatProvider formatProvider)
    {
        if (arg == null)
            return String.Empty;
            
        if (format == "X")
        {
            if (arg is int i)
                return "0x" + i.ToString("X");
        }
        
        // If this isn't one of our custom formats, use default formatting
        if (arg is IFormattable formattable)
            return formattable.ToString(format, CultureInfo.CurrentCulture);
            
        return arg.ToString();
    }
}`,
          exercise: {
            instructions:
              'Create a program that demonstrates various string operations. Implement methods for string creation, concatenation, manipulation (e.g., trimming, case conversion, replacement), and searching. Include examples of string formatting for different data types, culture-specific formatting, and string comparison with different options. Demonstrate StringBuilder usage for performance-sensitive string operations. Include proper performance measurements to show the difference between string concatenation and StringBuilder.',
          },
        },
        {
          title: 'Regular Expressions',
          explanation: `
        <p>Regular expressions provide a powerful way to perform pattern matching and text manipulation in C#:</p>
        
        <h4>Regular Expression Basics</h4>
        <p>Regular expressions (regex) are a specialized language for pattern matching within strings:</p>

        <p><strong>Pattern syntax:</strong> Using special characters and sequences to define patterns that match text, such as \\d for digits, \\w for word characters, and \\s for whitespace.</p>

        <p><strong>Regex class:</strong> The System.Text.RegularExpressions.Regex class provides methods for working with regular expressions in C#.</p>

        <p><strong>Common operations:</strong> Pattern matching (IsMatch, Match, Matches), searching (Match, Matches), and replacing (Replace).</p>

        <p><strong>Regex options:</strong> Flags that modify pattern matching behavior, such as case insensitivity, multiline mode, and culture-specific matching.</p>

        <h4>Pattern Syntax</h4>
        <p>Regular expressions use a special syntax to define matching patterns:</p>

        <p><strong>Character classes:</strong> [abc] matches any one character from the set, [^abc] matches any character not in the set.</p>

        <p><strong>Predefined character classes:</strong> \\d (digits), \\w (word characters), \\s (whitespace), \\b (word boundary).</p>

        <p><strong>Quantifiers:</strong> * (0 or more), + (1 or more), ? (0 or 1), {n} (exactly n times), {n,m} (between n and m times).</p>

        <p><strong>Anchors:</strong> ^ (start of line), $ (end of line), \\A (start of string), \\Z (end of string).</p>

        <p><strong>Groups and captures:</strong> Parentheses create capturing groups that can be referenced later.</p>

        <p><strong>Alternation:</strong> | (or) allows matching either of two patterns.</p>

        <h4>Regular Expression Methods</h4>
        <p>The Regex class provides several methods for working with regular expressions:</p>

        <p><strong>IsMatch:</strong> Determines whether a pattern matches a string.</p>

        <p><strong>Match:</strong> Returns the first occurrence of a pattern in a string.</p>

        <p><strong>Matches:</strong> Returns all occurrences of a pattern in a string.</p>

        <p><strong>Replace:</strong> Replaces matches with new text, with support for substitutions and callbacks.</p>

        <p><strong>Split:</strong> Divides a string into an array of substrings at the positions defined by a pattern.</p>
        
        <div class="code-example">
          <pre><code>// Basic regular expression examples
using System.Text.RegularExpressions;

// IsMatch - check if pattern matches
bool isMatch = Regex.IsMatch("123-456-7890", @"\\d{3}-\\d{3}-\\d{4}");  // true

// Match - find first occurrence
Match match = Regex.Match("Contact: 123-456-7890", @"\\d{3}-\\d{3}-\\d{4}");
if (match.Success)
{
    string phoneNumber = match.Value;  // "123-456-7890"
}

// Matches - find all occurrences
string text = "Call 123-456-7890 or 987-654-3210";
MatchCollection matches = Regex.Matches(text, @"\\d{3}-\\d{3}-\\d{4}");
foreach (Match m in matches)
{
    Console.WriteLine(m.Value);  // Outputs each phone number
}

// Replace - substitute matches
string result = Regex.Replace(text, @"\\d{3}-\\d{3}-\\d{4}", "XXX-XXX-XXXX");
// result: "Call XXX-XXX-XXXX or XXX-XXX-XXXX"

// Split - divide string at matches
string[] parts = Regex.Split("apple,banana;orange", "[,;]");
// parts: ["apple", "banana", "orange"]</code></pre>
        </div>
        
        <h4>Advanced Regular Expression Features</h4>
        <div class="code-example">
          <pre><code>// Capture groups
Match m = Regex.Match("John Doe", @"(\\w+)\\s(\\w+)");
string firstName = m.Groups[1].Value;  // "John"
string lastName = m.Groups[2].Value;   // "Doe"

// Named capture groups
Match m2 = Regex.Match("John Doe", @"(?<first>\\w+)\\s(?<last>\\w+)");
string first = m2.Groups["first"].Value;  // "John"
string last = m2.Groups["last"].Value;    // "Doe"

// Backreferences
bool isValid = Regex.IsMatch("<div>Content</div>", @"<(\\w+)>.*?</\\1>");  // true

// Lookahead and lookbehind
string noOverlap = Regex.Replace("1234567890", @"(?<=\\G\\d{3})(?=\\d)", "-");
// noOverlap: "123-456-789-0"

// Word boundaries
string text = "The word apple is in this sentence.";
MatchCollection wordMatches = Regex.Matches(text, @"\\bapple\\b");
// Matches "apple" as a whole word, not within other words

// RegexOptions
bool ignoreCase = Regex.IsMatch("HELLO", "hello", RegexOptions.IgnoreCase);  // true</code></pre>
        </div>
        
        <div class="interview-tip">
          <p><span class="interview-icon">🎯</span> <strong>Interview Focus:</strong> Be prepared to discuss regex pattern syntax, performance considerations, and common use cases for regular expressions.</p>
          <p>Key areas to focus on:</p>
          <ul>
            <li>Writing regex patterns for common validation scenarios (email, phone numbers, etc.)</li>
            <li>Understanding capture groups and backreferences</li>
            <li>Performance implications of complex regular expressions</li>
            <li>Using compiled regular expressions for frequently used patterns</li>
            <li>Balancing regex complexity with readability and maintainability</li>
          </ul>
        </div>
      `,
          codeExample: `// Comprehensive regular expression examples in C#

using System;
using System.Text.RegularExpressions;
using System.Collections.Generic;
using System.Linq;
using System.Diagnostics;

namespace RegexExamples
{
    public class RegularExpressionsDemo
    {
        public void BasicMatching()
        {
            Console.WriteLine("=== Basic Pattern Matching ===\n");
            
            // IsMatch - simple pattern matching
            string pattern = @"\\d{3}-\\d{3}-\\d{4}"; // Phone number pattern
            string input = "My phone number is 123-456-7890.";
            
            bool isMatch = Regex.IsMatch(input, pattern);
            Console.WriteLine($"Input: {input}");
            Console.WriteLine($"Pattern: {pattern}");
            Console.WriteLine($"IsMatch: {isMatch}");
            
            // Match - finding the first occurrence
            Match match = Regex.Match(input, pattern);
            
            if (match.Success)
            {
                Console.WriteLine($"Match found: {match.Value}");
                Console.WriteLine($"Match starts at: {match.Index}");
                Console.WriteLine($"Match length: {match.Length}");
            }
            else
            {
                Console.WriteLine("No match found.");
            }
            
            // Matches - finding all occurrences
            string multiplePhones = "Call me at 123-456-7890 or my office at 987-654-3210.";
            MatchCollection matches = Regex.Matches(multiplePhones, pattern);
            
            Console.WriteLine($"\nInput with multiple matches: {multiplePhones}");
            Console.WriteLine($"Found {matches.Count} matches:");
            
            foreach (Match m in matches)
            {
                Console.WriteLine($"  {m.Value} at position {m.Index}");
            }
            
            // Different ways to use Regex
            
            // Method 1: Static methods (as above)
            bool staticMatch = Regex.IsMatch("test@example.com", @"\\w+@\\w+\\.\\w+");
            
            // Method 2: Creating a Regex instance
            Regex emailRegex = new Regex(@"\\w+@\\w+\\.\\w+");
            bool instanceMatch = emailRegex.IsMatch("test@example.com");
            
            // Method 3: Creating a compiled Regex (better performance for repeated use)
            Regex compiledEmailRegex = new Regex(@"\\w+@\\w+\\.\\w+", RegexOptions.Compiled);
            bool compiledMatch = compiledEmailRegex.IsMatch("test@example.com");
            
            Console.WriteLine("\nDifferent ways to use Regex:");
            Console.WriteLine($"Static method: {staticMatch}");
            Console.WriteLine($"Instance method: {instanceMatch}");
            Console.WriteLine($"Compiled regex: {compiledMatch}");
        }
        
        public void CommonPatterns()
        {
            Console.WriteLine("\n=== Common Regex Patterns ===\n");
            
            // Sample data for testing
            string[] testStrings = {
                "john.doe@example.com",        // Valid email
                "invalid-email@",              // Invalid email
                "123-456-7890",                // US phone number
                "1234567890",                  // Digits only
                "(123) 456-7890",              // US phone with parentheses
                "https://www.example.com",     // URL
                "http://example.com/path?q=1", // URL with path and query
                "192.168.1.1",                 // IPv4 address
                "2001:0db8:85a3:0000:0000:8a2e:0370:7334", // IPv6 address
                "2022-03-15",                  // Date (YYYY-MM-DD)
                "15/03/2022",                  // Date (DD/MM/YYYY)
                "03/15/2022",                  // Date (MM/DD/YYYY)
                "The quick brown fox jumps over the lazy dog.", // Sentence
                "<!DOCTYPE html><html><head><title>Test</title></head><body></body></html>", // HTML
                "<script>alert('XSS');</script>", // Potential XSS
                "SELECT * FROM users WHERE id = 1", // SQL
                "function test() { return true; }", // JavaScript
                "AB12CD34EF",                  // Alphanumeric
                "Password123!",                // Strong password
                "12345"                        // Weak password
            };
            
            Dictionary<string, string> patterns = new Dictionary<string, string>
            {
                { "Email", @"^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$" },
                { "US Phone", @"^(\\d{3}[-\\.\\s]??\\d{3}[-\\.\\s]??\\d{4}|\\(\\d{3}\\)\\s*\\d{3}[-\\.\\s]??\\d{4}|\\d{3}[-\\.\\s]??\\d{3}[-\\.\\s]??\\d{4})$" },
                { "URL", @"^(https?:\\/\\/)?([\\da-z\\.-]+)\\.([a-z\\.]{2,6})([\\/\\w \\.-]*)*\\/?$" },
                { "IPv4", @"^(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$" },
                { "Date (YYYY-MM-DD)", @"^\\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])$" },
                { "Strong Password", @"^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[^\\da-zA-Z]).{8,}$" }
            };
            
            // Test each pattern against all strings
            foreach (var pattern in patterns)
            {
                Console.WriteLine($"Pattern: {pattern.Key}");
                Console.WriteLine($"Regex: {pattern.Value}");
                Console.WriteLine("Matching strings:");
                
                Regex regex = new Regex(pattern.Value);
                bool anyMatches = false;
                
                foreach (string s in testStrings)
                {
                    if (regex.IsMatch(s))
                    {
                        Console.WriteLine($"  - \\"{s}\\"");
                        anyMatches = true;
                    }
                }
                
                if (!anyMatches)
                {
                    Console.WriteLine("  (None)");
                }
                
                Console.WriteLine();
            }
        }
        
        public void RegexSyntaxExamples()
        {
            Console.WriteLine("\n=== Regex Syntax Examples ===\n");
            
            // Character classes
            Console.WriteLine("Character Classes:");
            
            // Basic character class
            string vowels = "aeiou";
            Console.WriteLine($"'[aeiou]' matching 'hello':");
            foreach (Match m in Regex.Matches("hello", "[aeiou]"))
            {
                Console.WriteLine($"  Match: '{m.Value}' at position {m.Index}");
            }
            
            // Negated character class
            Console.WriteLine($"\n'[^aeiou]' (not vowels) matching 'hello':");
            foreach (Match m in Regex.Matches("hello", "[^aeiou]"))
            {
                Console.WriteLine($"  Match: '{m.Value}' at position {m.Index}");
            }
            
            // Character ranges
            Console.WriteLine($"\n'[a-z]' (lowercase letters) matching 'Hello123':");
            foreach (Match m in Regex.Matches("Hello123", "[a-z]"))
            {
                Console.WriteLine($"  Match: '{m.Value}' at position {m.Index}");
            }
            
            // Predefined character classes
            Console.WriteLine("\nPredefined Character Classes:");
            
            // \\d - digits
            Console.WriteLine($"\n'\\d' (digits) matching 'abc123':");
            foreach (Match m in Regex.Matches("abc123", "\\d"))
            {
                Console.WriteLine($"  Match: '{m.Value}' at position {m.Index}");
            }
            
            // \\w - word characters
            Console.WriteLine($"\n'\\w' (word chars) matching 'hello_123!':");
            foreach (Match m in Regex.Matches("hello_123!", "\\w"))
            {
                Console.WriteLine($"  Match: '{m.Value}' at position {m.Index}");
            }
            
            // \\s - whitespace characters
            Console.WriteLine($"\n'\\s' (whitespace) matching 'hello world\\t\\n':");
            foreach (Match m in Regex.Matches("hello world\t\n", "\\s"))
            {
                Console.WriteLine($"  Match: '[whitespace]' at position {m.Index}");
            }
            
            // Quantifiers
            Console.WriteLine("\nQuantifiers:");
            
            // * (zero or more)
            Console.WriteLine($"\n'a*' (a zero or more times) matching 'baac':");
            foreach (Match m in Regex.Matches("baac", "a*"))
            {
                string value = m.Value.Length > 0 ? m.Value : "[empty]";
                Console.WriteLine($"  Match: '{value}' at position {m.Index}");
            }
            
            // + (one or more)
            Console.WriteLine($"\n'a+' (a one or more times) matching 'baac':");
            foreach (Match m in Regex.Matches("baac", "a+"))
            {
                Console.WriteLine($"  Match: '{m.Value}' at position {m.Index}");
            }
            
            // ? (zero or one)
            Console.WriteLine($"\n'colou?r' (optional u) matching 'color and colour':");
            foreach (Match m in Regex.Matches("color and colour", "colou?r"))
            {
                Console.WriteLine($"  Match: '{m.Value}' at position {m.Index}");
            }
            
            // {n} (exactly n times)
            Console.WriteLine($"\n'\\d{{3}}' (exactly 3 digits) matching '12345':");
            foreach (Match m in Regex.Matches("12345", "\\d{3}"))
            {
                Console.WriteLine($"  Match: '{m.Value}' at position {m.Index}");
            }
            
            // {n,m} (between n and m times)
            Console.WriteLine($"\n'\\d{{2,4}}' (2-4 digits) matching '12345':");
            foreach (Match m in Regex.Matches("12345", "\\d{2,4}"))
            {
                Console.WriteLine($"  Match: '{m.Value}' at position {m.Index}");
            }
            
            // Anchors
            Console.WriteLine("\nAnchors:");
            
            // ^ (start of line)
            Console.WriteLine($"\n'^Hello' (Hello at start) matching 'Hello World':");
            Console.WriteLine($"  IsMatch: {Regex.IsMatch("Hello World", "^Hello")}");
            
            Console.WriteLine($"\n'^Hello' (Hello at start) matching 'Say Hello':");
            Console.WriteLine($"  IsMatch: {Regex.IsMatch("Say Hello", "^Hello")}");
            
            // $ (end of line)
            Console.WriteLine($"\n'World$' (World at end) matching 'Hello World':");
            Console.WriteLine($"  IsMatch: {Regex.IsMatch("Hello World", "World$")}");
            
            // \b (word boundary)
            Console.WriteLine($"\n'\\bcat\\b' (cat as whole word) matching 'The cat is here':");
            Console.WriteLine($"  IsMatch: {Regex.IsMatch("The cat is here", "\\bcat\\b")}");
            
            Console.WriteLine($"\n'\\bcat\\b' (cat as whole word) matching 'category':");
            Console.WriteLine($"  IsMatch: {Regex.IsMatch("category", "\\bcat\\b")}");
            
            // Alternation
            Console.WriteLine("\nAlternation (|):");
            
            // | (or)
            Console.WriteLine($"\n'cat|dog' (cat or dog) matching 'I have a cat':");
            Console.WriteLine($"  Match: {Regex.Match("I have a cat", "cat|dog").Value}");
            
            Console.WriteLine($"\n'cat|dog' (cat or dog) matching 'I have a dog':");
            Console.WriteLine($"  Match: {Regex.Match("I have a dog", "cat|dog").Value}");
            
            // Groups and captures
            Console.WriteLine("\nGroups and Captures:");
            
            // Basic capturing group
            string datePattern = @"(\\d{4})-(\\d{2})-(\\d{2})";
            Match dateMatch = Regex.Match("Today is 2022-03-15.", datePattern);
            
            if (dateMatch.Success)
            {
                Console.WriteLine("\nMatching date '2022-03-15' with pattern '" + datePattern + "':");
                Console.WriteLine($"  Full match: {dateMatch.Value}");
                Console.WriteLine($"  Year (Group 1): {dateMatch.Groups[1].Value}");
                Console.WriteLine($"  Month (Group 2): {dateMatch.Groups[2].Value}");
                Console.WriteLine($"  Day (Group 3): {dateMatch.Groups[3].Value}");
            }
            
            // Named capturing groups
            string namedDatePattern = @"(?<year>\\d{4})-(?<month>\\d{2})-(?<day>\\d{2})";
            Match namedDateMatch = Regex.Match("Today is 2022-03-15.", namedDatePattern);
            
            if (namedDateMatch.Success)
            {
                Console.WriteLine("\nUsing named groups:");
                Console.WriteLine($"  Year: {namedDateMatch.Groups["year"].Value}");
                Console.WriteLine($"  Month: {namedDateMatch.Groups["month"].Value}");
                Console.WriteLine($"  Day: {namedDateMatch.Groups["day"].Value}");
            }
            
            // Non-capturing groups (?:...)
            string nonCapturingPattern = @"(?:\\d{4})-(\\d{2})-(\\d{2})";
            Match nonCapturingMatch = Regex.Match("Today is 2022-03-15.", nonCapturingPattern);
            
            if (nonCapturingMatch.Success)
            {
                Console.WriteLine("\nUsing non-capturing groups for first part:");
                Console.WriteLine($"  Full match: {nonCapturingMatch.Value}");
                Console.WriteLine($"  Group 1 (month): {nonCapturingMatch.Groups[1].Value}");
                Console.WriteLine($"  Group 2 (day): {nonCapturingMatch.Groups[2].Value}");
            }
            
            // Backreferences
            Console.WriteLine("\nBackreferences:");
            
            // \\1, \\2, etc. backreferences
            string htmlTagPattern = @"<([a-z]+)>.*?</\\1>";
            string html = "<div>Content</div> <span>More</span>";
            
            MatchCollection htmlMatches = Regex.Matches(html, htmlTagPattern);
            Console.WriteLine($"Finding matched HTML tags in '{html}':");
            
            foreach (Match m in htmlMatches)
            {
                Console.WriteLine($"  Matched: '{m.Value}'");
                Console.WriteLine($"  Tag name: '{m.Groups[1].Value}'");
            }
            
            // Named backreferences
            string namedBackrefPattern = @"<(?<tag>[a-z]+)>.*?</\\k<tag>>";
            MatchCollection namedHtmlMatches = Regex.Matches(html, namedBackrefPattern);
            
            Console.WriteLine("\nSame using named backreferences:");
            foreach (Match m in namedHtmlMatches)
            {
                Console.WriteLine($"  Matched: '{m.Value}'");
                Console.WriteLine($"  Tag name: '{m.Groups["tag"].Value}'");
            }
        }
        
        public void RegexOptionsAndModifiers()
        {
            Console.WriteLine("\n=== Regex Options and Modifiers ===\n");
            
            string input = "Hello World\nMultiple Lines\nCase Sensitive";
            
            // Case-insensitive matching
            Regex caseInsensitive = new Regex("hello", RegexOptions.IgnoreCase);
            Console.WriteLine("IgnoreCase option:");
            Console.WriteLine($"  'hello' in '{input.Substring(0, 20)}...'");
            Console.WriteLine($"  IsMatch: {caseInsensitive.IsMatch(input)}");
            
            // Multiline mode (affects ^ and $)
            Regex multiline = new Regex("^Multiple", RegexOptions.Multiline);
            Console.WriteLine("\nMultiline option:");
            Console.WriteLine($"  '^Multiple' in '{input.Replace('\n', ' ')}...'");
            Console.WriteLine($"  IsMatch: {multiline.IsMatch(input)}");
            
            // Single line mode (dot matches newlines)
            Regex singleLine = new Regex("Hello.*Case", RegexOptions.Singleline);
            Console.WriteLine("\nSingleline option:");
            Console.WriteLine($"  'Hello.*Case' in multi-line input");
            Console.WriteLine($"  IsMatch: {singleLine.IsMatch(input)}");
            
            // IgnorePatternWhitespace - allows formatted regex with comments
            Regex ignoreWhitespace = new Regex(@"
                Hello  # Match 'Hello'
                \\s+     # Followed by whitespace
                World   # Followed by 'World'
                ", RegexOptions.IgnorePatternWhitespace);
                
            Console.WriteLine("\nIgnorePatternWhitespace option:");
            Console.WriteLine($"  Formatted regex with comments");
            Console.WriteLine($"  IsMatch: {ignoreWhitespace.IsMatch(input)}");
            
            // Compiled - improves performance for reused regex
            Regex compiled = new Regex("World", RegexOptions.Compiled);
            Console.WriteLine("\nCompiled option:");
            Console.WriteLine("  (Improves performance for frequently used patterns)");
            
            // Combining options
            Regex combined = new Regex("WORLD", 
                RegexOptions.IgnoreCase | RegexOptions.Compiled);
            Console.WriteLine("\nCombining options (IgnoreCase | Compiled):");
            Console.WriteLine($"  'WORLD' case-insensitive");
            Console.WriteLine($"  IsMatch: {combined.IsMatch(input)}");
            
            // Inline modifiers
            Console.WriteLine("\nInline modifiers:");
            
            // (?i) - case insensitive
            bool inlineIgnoreCase = Regex.IsMatch(input, "(?i)hello");
            Console.WriteLine($"  '(?i)hello' (case insensitive): {inlineIgnoreCase}");
            
            // (?m) - multiline
            bool inlineMultiline = Regex.IsMatch(input, "(?m)^Multiple");
            Console.WriteLine($"  '(?m)^Multiple' (multiline): {inlineMultiline}");
            
            // (?s) - singleline (dot matches newlines)
            bool inlineSingleline = Regex.IsMatch(input, "(?s)Hello.*Case");
            Console.WriteLine($"  '(?s)Hello.*Case' (singleline): {inlineSingleline}");
            
            // Combined inline modifiers
            bool combinedInline = Regex.IsMatch(input, "(?im)^MULTIPLE");
            Console.WriteLine($"  '(?im)^MULTIPLE' (ignore case & multiline): {combinedInline}");
        }
        
        public void AdvancedFeatures()
        {
            Console.WriteLine("\n=== Advanced Regex Features ===\n");
            
            // Lookahead and lookbehind
            Console.WriteLine("Lookahead and Lookbehind:");
            
            // Positive lookahead (?=...)
            string positiveLookahead = "The price is $20.";
            Console.WriteLine($"Input: '{positiveLookahead}'");
            
            MatchCollection priceMatches = Regex.Matches(positiveLookahead, "\\$\\d+(?=\\.)");
            Console.WriteLine("Positive lookahead (\\$\\d+(?=\\.)) - match $ and digits followed by a dot:");
            foreach (Match m in priceMatches)
            {
                Console.WriteLine($"  Match: '{m.Value}'");
            }
            
            // Negative lookahead (?!...)
            string negativeLookahead = "123abc456def";
            Console.WriteLine($"\nInput: '{negativeLookahead}'");
            
            MatchCollection notFollowedByLetter = Regex.Matches(negativeLookahead, "\\d+(?![a-z])");
            Console.WriteLine("Negative lookahead (\\d+(?![a-z])) - digits not followed by letters:");
            foreach (Match m in notFollowedByLetter)
            {
                Console.WriteLine($"  Match: '{m.Value}'");
            }
            
            // Positive lookbehind (?<=...)
            string positiveLookbehind = "The price is $20.";
            Console.WriteLine($"\nInput: '{positiveLookbehind}'");
            
            MatchCollection afterDollar = Regex.Matches(positiveLookbehind, "(?<=\\$)\\d+");
            Console.WriteLine("Positive lookbehind ((?<=\\$)\\d+) - digits preceded by $:");
            foreach (Match m in afterDollar)
            {
                Console.WriteLine($"  Match: '{m.Value}'");
            }
            
            // Negative lookbehind (?<!...)
            string negativeLookbehind = "$20 and €30";
            Console.WriteLine($"\nInput: '{negativeLookbehind}'");
            
            MatchCollection notAfterDollar = Regex.Matches(negativeLookbehind, "(?<!\\$)\\d+");
            Console.WriteLine("Negative lookbehind ((?<!\\$)\\d+) - digits not preceded by $:");
            foreach (Match m in notAfterDollar)
            {
                Console.WriteLine($"  Match: '{m.Value}'");
            }
            
            // Conditional expressions
            Console.WriteLine("\nConditional Expressions:");
            
            // (?(group)yes|no) - if group matched, use 'yes' pattern, else use 'no'
            string conditionalInput = "John: 123, Anonymous: unknown";
            string conditionalPattern = @"(\\w+): (?(1)\\d+|unknown)";
            
            MatchCollection conditionalMatches = Regex.Matches(conditionalInput, conditionalPattern);
            Console.WriteLine($"Input: '{conditionalInput}'");
            Console.WriteLine("Pattern: If name captured, match digits, else match 'unknown'");
            
            foreach (Match m in conditionalMatches)
            {
                Console.WriteLine($"  Match: '{m.Value}'");
            }
            
            // Atomic grouping (?>...)
            Console.WriteLine("\nAtomic Grouping:");
            
            string atomicInput = "aaaab";
            
            // Without atomic grouping - will backtrack
            Regex nonAtomicRegex = new Regex("a+a+b");
            Console.WriteLine($"Input: '{atomicInput}'");
            Console.WriteLine("Non-atomic pattern (a+a+b): " + 
                (nonAtomicRegex.IsMatch(atomicInput) ? "Match" : "No match"));
            
            // With atomic grouping - no backtracking
            Regex atomicRegex = new Regex("(?>a+)a+b");
            Console.WriteLine("Atomic pattern ((?>a+)a+b): " + 
                (atomicRegex.IsMatch(atomicInput) ? "Match" : "No match"));
        }
        
        public void RegexReplace()
        {
            Console.WriteLine("\n=== Regex Replace Operations ===\n");
            
            string input = "John Doe's phone number is 123-456-7890 and email is john.doe@example.com";
            
            // Simple replacement
            string simpleReplace = Regex.Replace(input, "\\d{3}-\\d{3}-\\d{4}", "XXX-XXX-XXXX");
            Console.WriteLine("Simple replacement (phone number to XXX-XXX-XXXX):");
            Console.WriteLine($"  Original: {input}");
            Console.WriteLine($"  Result:   {simpleReplace}");
            
            // Replacement with backreferences
            string backrefReplace = Regex.Replace(input, "([A-Z]\\w+)\\s([A-Z]\\w+)", "$2, $1");
            Console.WriteLine("\nReplacement with backreferences (Swap first/last name):");
            Console.WriteLine($"  Original: {input}");
            Console.WriteLine($"  Result:   {backrefReplace}");
            
            // Replacement with named backreferences
            string namedBackrefReplace = Regex.Replace(input, 
                "(?<first>[A-Z]\\w+)\\s(?<last>[A-Z]\\w+)", "\${last}, \${first}");
            Console.WriteLine("\nReplacement with named backreferences:");
            Console.WriteLine($"  Original: {input}");
            Console.WriteLine($"  Result:   {namedBackrefReplace}");
            
            // Case modification in replacement
            string caseModReplace = Regex.Replace(input, "\\b[a-z]+\\b", m => m.Value.ToUpper());
            Console.WriteLine("\nCase modification in replacement (lowercase words to uppercase):");
            Console.WriteLine($"  Original: {input}");
            Console.WriteLine($"  Result:   {caseModReplace}");
            
            // Complex replacements with MatchEvaluator delegate
            string complexReplace = Regex.Replace(input, "\\b[A-Za-z.]+@[A-Za-z.]+\\b", 
                m => ObfuscateEmail(m.Value));
            Console.WriteLine("\nComplex replacement with MatchEvaluator (obfuscate email):");
            Console.WriteLine($"  Original: {input}");
            Console.WriteLine($"  Result:   {complexReplace}");
            
            // Replace with conditions
            string conditionalReplace = Regex.Replace(input, "\\b\\w+\\b", 
                m => m.Value.Length > 4 ? m.Value.ToUpper() : m.Value);
            Console.WriteLine("\nConditional replacement (words longer than 4 chars to uppercase):");
            Console.WriteLine($"  Original: {input}");
            Console.WriteLine($"  Result:   {conditionalReplace}");
        }
        
        // Helper method for email obfuscation
        private string ObfuscateEmail(string email)
        {
            Match match = Regex.Match(email, "^([^@]+)@(.+)$");
            if (match.Success)
            {
                string username = match.Groups[1].Value;
                string domain = match.Groups[2].Value;
                
                // Show only first character and replace rest with asterisks
                string obfuscatedUsername = username[0] + new string('*', username.Length - 1);
                
                return $"{obfuscatedUsername}@{domain}";
            }
            
            return email;
        }
        
        public void RegexSplit()
        {
            Console.WriteLine("\n=== Regex Split Operations ===\n");
            
            // Basic split on delimiters
            string csvInput = "apple,banana,\\"cherry, ripe\\",date";
            Console.WriteLine($"CSV Input: {csvInput}");
            
            // Split on commas
            string[] simpleSplit = Regex.Split(csvInput, ",");
            Console.WriteLine("\nSimple split on commas:");
            for (int i = 0; i < simpleSplit.Length; i++)
            {
                Console.WriteLine($"  [{ i}] = '{simpleSplit[i]}'");
            }
            
            // Advanced CSV splitting (respects quotes)
            string[] csvItems = Regex.Split(csvInput, ",(?=(?:[^\\"]*\\"[^\\"]*\\")*[^\\"]*$)");
            Console.WriteLine("\nAdvanced CSV split (respects quotes):");
            for (int i = 0; i < csvItems.Length; i++)
            {
                Console.WriteLine($"  [{i}] = '{csvItems[i]}'");
            }
            
            // Split with capture groups (delimiters included in result)
            string delimitersInput = "apple,banana;cherry:date";
            Console.WriteLine($"\nInput with multiple delimiters: {delimitersInput}");
            
            string[] withDelimiters = Regex.Split(delimitersInput, "([,;:])");
            Console.WriteLine("\nSplit with captured delimiters:");
            for (int i = 0; i < withDelimiters.Length; i++)
            {
                Console.WriteLine($"  [{i}] = '{withDelimiters[i]}'");
            }
            
            // Split with limit
            string longInput = "item1,item2,item3,item4,item5,item6";
            Console.WriteLine($"\nLong input: {longInput}");
            
            string[] limitedSplit = Regex.Split(longInput, ",", 3); // Max 3 items
            Console.WriteLine("\nSplit with limit (max 3 items):");
            for (int i = 0; i < limitedSplit.Length; i++)
            {
                Console.WriteLine($"  [{i}] = '{limitedSplit[i]}'");
            }
            
            // Split with options
            string multilineInput = "Line1\nLine2\r\nLine3";
            Console.WriteLine("\nMultiline input (with different line endings):");
            Console.WriteLine($"  '{multilineInput.Replace("\n", "\\n").Replace("\r", "\\r")}'");
            
            string[] lines = Regex.Split(multilineInput, "\\r?\\n");
            Console.WriteLine("\nSplit on line breaks (\\r?\\n):");
            for (int i = 0; i < lines.Length; i++)
            {
                Console.WriteLine($"  [{i}] = '{lines[i]}'");
            }
        }
        
        public void RegexPerformance()
        {
            Console.WriteLine("\n=== Regex Performance Considerations ===\n");
            
            // Setup
            const int iterations = 1000;
            string input = "The quick brown fox jumps over the lazy dog. " +
                "The quick brown fox jumps over the lazy dog. " +
                "The quick brown fox jumps over the lazy dog. " +
                "The quick brown fox jumps over the lazy dog. " +
                "The quick brown fox jumps over the lazy dog.";
            
            string pattern = "\\b\\w{4}\\b"; // Match 4-letter words
            
            // Test 1: Using static Regex.IsMatch repeatedly
            Stopwatch sw = new Stopwatch();
            sw.Start();
            
            for (int i = 0; i < iterations; i++)
            {
                bool match = Regex.IsMatch(input, pattern);
            }
            
            sw.Stop();
            long staticTime = sw.ElapsedMilliseconds;
            Console.WriteLine($"Static Regex.IsMatch for {iterations} iterations: {staticTime}ms");
            
            // Test 2: Create new Regex instance for each match
            sw.Restart();
            
            for (int i = 0; i < iterations; i++)
            {
                Regex regex = new Regex(pattern);
                bool match = regex.IsMatch(input);
            }
            
            sw.Stop();
            long newInstanceTime = sw.ElapsedMilliseconds;
            Console.WriteLine($"New Regex instance for {iterations} iterations: {newInstanceTime}ms");
            
            // Test 3: Create Regex instance once
            Regex reusedRegex = new Regex(pattern);
            sw.Restart();
            
            for (int i = 0; i < iterations; i++)
            {
                bool match = reusedRegex.IsMatch(input);
            }
            
            sw.Stop();
            long reusedTime = sw.ElapsedMilliseconds;
            Console.WriteLine($"Reused Regex instance for {iterations} iterations: {reusedTime}ms");
            
            // Test 4: Create compiled Regex instance once
            Regex compiledRegex = new Regex(pattern, RegexOptions.Compiled);
            sw.Restart();
            
            for (int i = 0; i < iterations; i++)
            {
                bool match = compiledRegex.IsMatch(input);
            }
            
            sw.Stop();
            long compiledTime = sw.ElapsedMilliseconds;
            Console.WriteLine($"Compiled Regex instance for {iterations} iterations: {compiledTime}ms");
            
            // Test 5: Complex pattern vs simple pattern
            string complexPattern = @"\\b(?:[a-z][a-z][a-z][a-z])\\b";
            
            Regex simpleRegex = new Regex(pattern, RegexOptions.Compiled);
            sw.Restart();
            
            for (int i = 0; i < iterations; i++)
            {
                bool match = simpleRegex.IsMatch(input);
            }
            
            sw.Stop();
            long simpleTime = sw.ElapsedMilliseconds;
            
            Regex complexRegex = new Regex(complexPattern, RegexOptions.Compiled);
            sw.Restart();
            
            for (int i = 0; i < iterations; i++)
            {
                bool match = complexRegex.IsMatch(input);
            }
            
            sw.Stop();
            long complexTime = sw.ElapsedMilliseconds;
            
            Console.WriteLine($"\nSimple pattern ({pattern}) for {iterations} iterations: {simpleTime}ms");
            Console.WriteLine($"Complex pattern equivalent for {iterations} iterations: {complexTime}ms");
            
            // Summary
            Console.WriteLine("\nPerformance Summary:");
            Console.WriteLine("- Using static Regex methods repeatedly is slower than reusing an instance");
            Console.WriteLine("- Creating a new Regex instance for each match is the slowest option");
            Console.WriteLine("- Reusing a Regex instance is much faster");
            Console.WriteLine("- Compiled Regex patterns are typically faster for frequent use");
            Console.WriteLine("- Simpler patterns generally perform better than complex ones");
            Console.WriteLine("- For critical performance, consider using RegexOptions.Compiled");
            Console.WriteLine("- For extremely critical paths, consider using string methods or Span<char>");
        }
        
        public void RegexValidationExamples()
        {
            Console.WriteLine("\n=== Regex Validation Examples ===\n");
            
            // Define validation patterns
            Dictionary<string, Regex> validators = new Dictionary<string, Regex>
            {
                { "Email", new Regex(@"^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$") },
                { "US Phone", new Regex(@"^(\\d{3}[-\\.\\s]??\\d{3}[-\\.\\s]??\\d{4}|\\(\\d{3}\\)\\s*\\d{3}[-\\.\\s]??\\d{4}|\\d{3}[-\\.\\s]??\\d{3}[-\\.\\s]??\\d{4})$") },
                { "ZIP Code", new Regex(@"^\\d{5}(?:-\\d{4})?$") },
                { "Date (YYYY-MM-DD)", new Regex(@"^\\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])$") },
                { "URL", new Regex(@"^(https?:\\/\\/)?([\\da-z\\.-]+)\\.([a-z\\.]{2,6})([\\/\\w \\.-]*)*\\/?$") },
                { "Password", new Regex(@"^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[^\\da-zA-Z]).{8,}$") }
            };
            
            // Test data
            Dictionary<string, List<string>> testData = new Dictionary<string, List<string>>
            {
                { "Email", new List<string> { 
                    "user@example.com", 
                    "john.doe@company-name.co.uk", 
                    "invalid@email", 
                    "no_at_sign.com" 
                }},
                { "US Phone", new List<string> { 
                    "123-456-7890", 
                    "(123) 456-7890", 
                    "123.456.7890", 
                    "12345678901" 
                }},
                { "ZIP Code", new List<string> { 
                    "12345", 
                    "12345-6789", 
                    "1234", 
                    "123456" 
                }},
                { "Date (YYYY-MM-DD)", new List<string> { 
                    "2022-01-31", 
                    "2022-02-30", 
                    "01-31-2022", 
                    "2022/01/31" 
                }},
                { "URL", new List<string> { 
                    "https://www.example.com", 
                    "http://example.com/path?query=1", 
                    "example.com", 
                    "not a url" 
                }},
                { "Password", new List<string> { 
                    "StrongP@ss1", 
                    "Weak1", 
                    "onlylowercase1!", 
                    "UPPERCASEONLY1!" 
                }}
            };
            
            // Validate and print results
            foreach (var validator in validators)
            {
                string validationType = validator.Key;
                Regex regex = validator.Value;
                
                Console.WriteLine($"{validationType} validation:");
                Console.WriteLine($"Pattern: {regex}");
                
                if (testData.ContainsKey(validationType))
                {
                    foreach (string test in testData[validationType])
                    {
                        bool isValid = regex.IsMatch(test);
                        Console.WriteLine($"  '{test}': {(isValid ? "Valid" : "Invalid")}");
                    }
                }
                
                Console.WriteLine();
            }
        }
        
        // Run all demos
        public void RunAllDemos()
        {
            // Comment out some sections if you want a shorter output
            BasicMatching();
            CommonPatterns();
            RegexSyntaxExamples();
            RegexOptionsAndModifiers();
            AdvancedFeatures();
            RegexReplace();
            RegexSplit();
            RegexPerformance();
            RegexValidationExamples();
        }
    }
}`,
          exercise: {
            instructions:
              'Create a program that demonstrates regular expressions for validating and extracting information from text. Implement validators for common formats like email addresses, phone numbers, and URLs. Create methods for extracting information from structured text (e.g., parsing log files or CSV data). Implement a method that performs advanced text replacement with backreferences and match evaluator functions. Compare the performance of different regex approaches (static methods vs. compiled instances). Include error handling for malformed regular expressions.',
          },
        },
        {
          title: 'String Formatting and Culture',
          explanation: `
        <p>String formatting and handling text in different cultures requires special consideration in C#:</p>
        
        <h4>String Formatting</h4>
        <p>C# provides rich formatting options for creating human-readable text representations of various data types:</p>

        <p><strong>Composite formatting:</strong> Using the string.Format method and placeholders like {0}, {1}, etc., to insert values into a formatted string template.</p>

        <p><strong>String interpolation:</strong> Using the $ prefix and embedded expressions in curly braces for more readable string construction (C# 6.0+).</p>

        <p><strong>Format specifiers:</strong> Special codes like "C" for currency, "D" for decimal, "F" for fixed-point, etc., that control how values are formatted.</p>

        <p><strong>Custom format patterns:</strong> Using format strings like "yyyy-MM-dd" for dates or "#,##0.00" for numbers to precisely control formatting.</p>

        <p><strong>Alignment and spacing:</strong> Using format specifications to control text alignment and spacing within a field.</p>

        <h4>Culture-Aware Formatting</h4>
        <p>Text formatting and comparison should respect the cultural conventions of the user:</p>

        <p><strong>CultureInfo class:</strong> Provides information about a specific culture, including formatting conventions for dates, numbers, and currency.</p>

        <p><strong>CurrentCulture:</strong> Represents the culture of the current thread, affecting formatting, parsing, and comparison operations.</p>

        <p><strong>InvariantCulture:</strong> A culture-independent format that's consistent across all systems, useful for machine-readable formats.</p>

        <p><strong>Specific cultures:</strong> Using particular cultural settings for targeted formatting, such as displaying dates in French or German format.</p>

        <p><strong>Unicode support:</strong> Proper handling of Unicode characters across different languages and scripts.</p>

        <h4>Resource Localization</h4>
        <p>Creating applications that support multiple languages and regions:</p>

        <p><strong>Resource files (.resx):</strong> Storing localized strings and resources separately from code.</p>

        <p><strong>ResourceManager:</strong> Loading localized resources based on the current culture.</p>

        <p><strong>Neutral and specific cultures:</strong> Fallback mechanisms for resource loading when a specific culture isn't available.</p>

        <p><strong>Satellite assemblies:</strong> Compiled resource files that can be deployed separately for different cultures.</p>
        
        <div class="code-example">
          <pre><code>// Composite formatting
string name = "Alice";
int age = 30;
string message = string.Format("Name: {0}, Age: {1}", name, age);

// String interpolation (C# 6.0+)
string interpolated = $"Name: {name}, Age: {age}";

// Format specifiers
decimal price = 1234.56m;
string formatted = string.Format("Price: {0:C}", price);  // "$1,234.56" in US culture

// Custom formats
DateTime now = DateTime.Now;
string dateFormatted = string.Format("Date: {0:yyyy-MM-dd}", now);  // "Date: 2023-01-15"

// Alignment
string leftAligned = string.Format("|{0,-10}|", "Left");   // "|Left      |"
string rightAligned = string.Format("|{0,10}|", "Right");  // "|     Right|"</code></pre>
        </div>
        
        <h4>Culture-Specific Formatting</h4>
        <div class="code-example">
          <pre><code>// Get specific culture
using System.Globalization;
CultureInfo usCulture = new CultureInfo("en-US");
CultureInfo frCulture = new CultureInfo("fr-FR");
CultureInfo jpCulture = new CultureInfo("ja-JP");

// Format with specific culture
decimal amount = 1234.56m;
string usPrice = string.Format(usCulture, "{0:C}", amount);  // "$1,234.56"
string frPrice = string.Format(frCulture, "{0:C}", amount);  // "1 234,56 €"
string jpPrice = string.Format(jpCulture, "{0:C}", amount);  // "￥1,235"

// Format date with culture
DateTime date = new DateTime(2023, 1, 15);
string usDate = date.ToString("d", usCulture);  // "1/15/2023"
string frDate = date.ToString("d", frCulture);  // "15/01/2023"
string jpDate = date.ToString("d", jpCulture);  // "2023/01/15"

// Using CurrentCulture vs. InvariantCulture
string currentCultureFormat = amount.ToString("N2");  // Culture-dependent
string invariantFormat = amount.ToString("N2", CultureInfo.InvariantCulture);  // "1,234.56"</code></pre>
        </div>
        
        <div class="interview-tip">
          <p><span class="interview-icon">🎯</span> <strong>Interview Focus:</strong> Be prepared to discuss culture-aware formatting, the differences between CurrentCulture and InvariantCulture, and when to use each approach.</p>
          <p>Key areas to focus on:</p>
          <ul>
            <li>Standard format specifiers and custom format strings</li>
            <li>Choosing between string.Format, string interpolation, and StringBuilder</li>
            <li>Proper handling of culture-sensitive operations like date parsing</li>
            <li>Understanding the resource localization process</li>
            <li>Handling globalization concerns in web applications</li>
          </ul>
        </div>
      `,
          codeExample: `// Comprehensive string formatting and culture examples in C#

using System;
using System.Globalization;
using System.Text;
using System.Threading;
using System.Collections.Generic;
using System.Resources;
using System.Reflection;

namespace StringFormattingDemo
{
    public class StringFormattingAndCultureDemo
    {
        public void BasicFormatting()
        {
            Console.WriteLine("=== Basic String Formatting ===\n");
            
            // Simple variables for demonstration
            string name = "Alice Smith";
            int age = 30;
            DateTime birthDate = new DateTime(1993, 5, 12);
            decimal salary = 75000.50m;
            
            // String concatenation
            string concat = "Name: " + name + ", Age: " + age + ", Birth Date: " + birthDate + ", Salary: " + salary;
            Console.WriteLine("String concatenation:");
            Console.WriteLine($"  {concat}");
            
            // Using string.Format
            string formatted = string.Format("Name: {0}, Age: {1}, Birth Date: {2}, Salary: {3}", 
                name, age, birthDate, salary);
            Console.WriteLine("\nString.Format:");
            Console.WriteLine($"  {formatted}");
            
            // String interpolation (C# 6.0+)
            string interpolated = $"Name: {name}, Age: {age}, Birth Date: {birthDate}, Salary: {salary}";
            Console.WriteLine("\nString interpolation ($):");
            Console.WriteLine($"  {interpolated}");
            
            // StringBuilder for multiple operations
            StringBuilder sb = new StringBuilder();
            sb.Append("Name: ").Append(name).Append(", ");
            sb.Append("Age: ").Append(age).Append(", ");
            sb.Append("Birth Date: ").Append(birthDate).Append(", ");
            sb.Append("Salary: ").Append(salary);
            
            Console.WriteLine("\nStringBuilder:");
            Console.WriteLine($"  {sb}");
        }
        
        public void FormatSpecifiers()
        {
            Console.WriteLine("\n=== Format Specifiers ===\n");
            
            // Sample data for demonstration
            int number = 1234567;
            double pi = Math.PI;
            decimal money = 1234.56m;
            DateTime now = DateTime.Now;
            TimeSpan duration = TimeSpan.FromHours(42.5);
            object customObject = new Person { FirstName = "John", LastName = "Doe", Age = 35 };
            
            // Numeric format specifiers
            Console.WriteLine("Numeric format specifiers (using number = 1234567):");
            Console.WriteLine($"  C (Currency):        {number:C}");      // Currency: $1,234,567.00
            Console.WriteLine($"  D (Decimal):         {number:D}");      // Decimal: 1234567
            Console.WriteLine($"  D10 (Decimal w/10):  {number:D10}");    // Decimal with 10 digits: 0001234567
            Console.WriteLine($"  E (Exponential):     {number:E}");      // Exponential: 1.234567E+006
            Console.WriteLine($"  F (Fixed-point):     {number:F}");      // Fixed-point: 1234567.00
            Console.WriteLine($"  F2 (2 decimals):     {number:F2}");     // Fixed-point 2 decimals: 1234567.00
            Console.WriteLine($"  G (General):         {number:G}");      // General: 1234567
            Console.WriteLine($"  N (Number):          {number:N}");      // Number with commas: 1,234,567.00
            Console.WriteLine($"  P (Percent):         {0.1234:P}");      // Percentage: 12.34%
            Console.WriteLine($"  X (Hexadecimal):     {number:X}");      // Hex: 12D687
            
            // Floating point specifics (using pi = 3.14159...)
            Console.WriteLine("\nFloating point format specifiers (using pi = 3.14159...):");
            Console.WriteLine($"  Default:           {pi}");              // Default format
            Console.WriteLine($"  F4 (4 decimals):   {pi:F4}");           // Fixed-point 4 decimals: 3.1416
            Console.WriteLine($"  N3 (3 decimals):   {pi:N3}");           // Number 3 decimals: 3.142
            Console.WriteLine($"  0.### (custom):    {pi:0.###}");        // Custom format: 3.142
            Console.WriteLine($"  #.00 (custom):     {pi:#.00}");         // Custom with 2 decimals: 3.14
            
            // Currency specifics (using money = 1234.56)
            Console.WriteLine("\nCurrency format specifiers (using money = 1234.56):");
            Console.WriteLine($"  Default:           {money}");           // Default format
            Console.WriteLine($"  C (Currency):      {money:C}");         // Standard currency: $1,234.56
            Console.WriteLine($"  C0 (No decimals):  {money:C0}");        // Currency, no decimals: $1,235
            Console.WriteLine($"  C4 (4 decimals):   {money:C4}");        // Currency, 4 decimals: $1,234.5600
            
            // Date and time format specifiers
            Console.WriteLine("\nDate and time format specifiers (using current time):");
            Console.WriteLine($"  Default:                {now}");              // Default format
            Console.WriteLine($"  d (Short date):         {now:d}");            // Short date: 1/15/2023
            Console.WriteLine($"  D (Long date):          {now:D}");            // Long date: Sunday, January 15, 2023
            Console.WriteLine($"  t (Short time):         {now:t}");            // Short time: 10:30 AM
            Console.WriteLine($"  T (Long time):          {now:T}");            // Long time: 10:30:25 AM
            Console.WriteLine($"  f (Full date/time):     {now:f}");            // Date and time: Sunday, January 15, 2023 10:30 AM
            Console.WriteLine($"  F (Full with seconds):  {now:F}");            // Date and time with seconds
            Console.WriteLine($"  g (General):            {now:g}");            // General: 1/15/2023 10:30 AM
            Console.WriteLine($"  G (General w/seconds):  {now:G}");            // General with seconds
            Console.WriteLine($"  M (Month/day):          {now:M}");            // Month and day: January 15
            Console.WriteLine($"  Y (Year/month):         {now:Y}");            // Year and month: January 2023
            Console.WriteLine($"  yyyy-MM-dd (ISO):       {now:yyyy-MM-dd}");   // ISO format: 2023-01-15
            Console.WriteLine($"  Custom:                 {now:ddd, MMM d, yyyy 'at' h:mm tt}"); // Custom
            
            // TimeSpan format specifiers
            Console.WriteLine("\nTimeSpan format specifiers (using 42.5 hours):");
            Console.WriteLine($"  Default:        {duration}");           // Default: 1.18:30:00
            Console.WriteLine($"  c (Constant):   {duration:c}");         // Constant: 1.18:30:00
            Console.WriteLine($"  g (General):    {duration:g}");         // General: 1:18:30:00
            Console.WriteLine($"  G (Full):       {duration:G}");         // Full: 1:18:30:00.0000000
            Console.WriteLine($"  Custom:         {duration.Days} days, {duration.Hours} hours, {duration.Minutes} minutes");
            
            // Custom object with ToString() override
            Console.WriteLine("\nCustom object formatting:");
            Console.WriteLine($"  Default:        {customObject}");
        }
        
        public void AlignmentAndPadding()
        {
            Console.WriteLine("\n=== Alignment and Padding ===\n");
            
            // Alignment within fields
            Console.WriteLine("Alignment examples:");
            Console.WriteLine($"  |{"Left",-10}|");     // Left-aligned, 10 characters wide
            Console.WriteLine($"  |{"Right",10}|");     // Right-aligned, 10 characters wide
            Console.WriteLine($"  |{"Center",10}|");    // Right-aligned (can center with custom code)
            
            // Padding with characters
            int number = 42;
            Console.WriteLine("\nPadding examples:");
            Console.WriteLine($"  Left padded:   {number.ToString().PadLeft(5, '0')}");    // 00042
            Console.WriteLine($"  Right padded:  {number.ToString().PadRight(5, '0')}");   // 42000
            
            // Creating a table
            string[] names = { "Alice", "Bob", "Charlie", "David" };
            int[] ages = { 25, 32, 45, 28 };
            
            Console.WriteLine("\nTable formatting:");
            Console.WriteLine($"  {"Name",-10}{"Age",5}");
            Console.WriteLine($"  {new string('-', 15)}");
            
            for (int i = 0; i < names.Length; i++)
            {
                Console.WriteLine($"  {names[i],-10}{ages[i],5}");
            }
            
            // Nested alignment
            Console.WriteLine("\nNested alignment:");
            Console.WriteLine($"  |{$"{"Nested",-8}",10}|");  // Nested with different alignments
            
            // Custom table builder with StringBuilder
            Console.WriteLine("\nTable with StringBuilder:");
            
            var table = new StringBuilder();
            table.AppendLine($"  {"Product",-15}{"Price",8}{"Qty",5}{"Total",10}");
            table.AppendLine($"  {new string('-', 38)}");
            table.AppendLine($"  {"Apples",-15}{1.99,8:C}{5,5}{9.95,10:C}");
            table.AppendLine($"  {"Oranges",-15}{2.49,8:C}{3,5}{7.47,10:C}");
            table.AppendLine($"  {"Bananas",-15}{0.99,8:C}{4,5}{3.96,10:C}");
            table.AppendLine($"  {new string('-', 38)}");
            table.AppendLine($"  {"Total",-15}{" ",8}{12,5}{21.38,10:C}");
            
            Console.WriteLine(table.ToString());
        }
        
        public void CustomFormatStrings()
        {
            Console.WriteLine("\n=== Custom Format Strings ===\n");
            
            // Numeric custom formats
            double value = 12345.6789;
            
            Console.WriteLine("Numeric custom formats (value = 12345.6789):");
            Console.WriteLine($"  0:           {value:0}");               // 12346
            Console.WriteLine($"  0.00:        {value:0.00}");            // 12345.68
            Console.WriteLine($"  0.0000:      {value:0.0000}");          // 12345.6789
            Console.WriteLine($"  #,#:         {value:#,#}");             // 12,346
            Console.WriteLine($"  #,#.00:      {value:#,#.00}");          // 12,345.68
            Console.WriteLine($"  #,##0.00:    {value:#,##0.00}");        // 12,345.68
            Console.WriteLine($"  0,0.00:      {value:0,0.00}");          // 12,345.68
            Console.WriteLine($"  $#,##0.00:   {value:$#,##0.00}");       // $12,345.68
            Console.WriteLine($"  0.00%;       {0.1234:0.00%}");          // 12.34%
            
            // Date and time custom formats
            DateTime now = DateTime.Now;
            
            Console.WriteLine("\nDate and time custom formats:");
            Console.WriteLine($"  d:               {now:d}");             // Short date: 1/15/2023
            Console.WriteLine($"  dd:              {now:dd}");            // Day: 15
            Console.WriteLine($"  ddd:             {now:ddd}");           // Short day name: Sun
            Console.WriteLine($"  dddd:            {now:dddd}");          // Full day name: Sunday
            Console.WriteLine($"  M:               {now:M}");             // Month: 1
            Console.WriteLine($"  MM:              {now:MM}");            // Month with leading zero: 01
            Console.WriteLine($"  MMM:             {now:MMM}");           // Short month name: Jan
            Console.WriteLine($"  MMMM:            {now:MMMM}");          // Full month name: January
            Console.WriteLine($"  y:               {now:y}");             // Year: January 2023
            Console.WriteLine($"  yy:              {now:yy}");            // 2-digit year: 23
            Console.WriteLine($"  yyyy:            {now:yyyy}");          // 4-digit year: 2023
            Console.WriteLine($"  h:               {now:h}");             // Hour: 10
            Console.WriteLine($"  hh:              {now:hh}");            // Hour with leading zero: 10
            Console.WriteLine($"  H:               {now:H}");             // 24-hour hour: 10
            Console.WriteLine($"  HH:              {now:HH}");            // 24-hour with leading zero: 10
            Console.WriteLine($"  m:               {now:m}");             // Minute: 30
            Console.WriteLine($"  mm:              {now:mm}");            // Minute with leading zero: 30
            Console.WriteLine($"  s:               {now:s}");             // Second: 25
            Console.WriteLine($"  ss:              {now:ss}");            // Second with leading zero: 25
            Console.WriteLine($"  tt:              {now:tt}");            // AM/PM: AM
            Console.WriteLine($"  z:               {now:z}");             // Time zone offset: -5
            Console.WriteLine($"  zz:              {now:zz}");            // Time zone offset: -05
            Console.WriteLine($"  zzz:             {now:zzz}");           // Full time zone offset: -05:00
            
            // Combined custom formats
            Console.WriteLine("\nCombined custom formats:");
            Console.WriteLine($"  ISO 8601 date:           {now:yyyy-MM-ddTHH:mm:ss.fffK}");
            Console.WriteLine($"  US date:                 {now:MM/dd/yyyy}");
            Console.WriteLine($"  European date:           {now:dd/MM/yyyy}");
            Console.WriteLine($"  Long date & time:        {now:dddd, MMMM d, yyyy 'at' h:mm tt}");
            Console.WriteLine($"  Sortable:                {now:yyyy-MM-dd HH:mm:ss}");
            
            // Escaping in format strings
            Console.WriteLine("\nEscaping in format strings:");
            Console.WriteLine($"  Using quotes:    {now:yyyy-MM-dd 'T' HH:mm:ss}");  // Literal 'T'
            Console.WriteLine($"  Using backslash: {now:yyyy-MM-dd \\'T\\' HH:mm:ss}");  // Another way
            
            // Conditional formatting (handled in code rather than format string)
            int value1 = 42;
            int value2 = -10;
            
            Console.WriteLine("\nConditional formatting:");
            Console.WriteLine($"  Value 1: {(value1 > 0 ? value1.ToString("0.00") : "N/A")}");
            Console.WriteLine($"  Value 2: {(value2 > 0 ? value2.ToString("0.00") : "N/A")}");
        }
        
        public void CultureSpecificFormatting()
        {
            Console.WriteLine("\n=== Culture-Specific Formatting ===\n");
            
            // Sample values for formatting
            decimal amount = 1234.56m;
            DateTime date = new DateTime(2023, 1, 15);
            double percentage = 0.2345;
            
            // Define cultures for testing
            CultureInfo[] cultures = {
                CultureInfo.InvariantCulture,
                new CultureInfo("en-US"),
                new CultureInfo("fr-FR"),
                new CultureInfo("de-DE"),
                new CultureInfo("ja-JP"),
                new CultureInfo("ar-SA") // Right-to-left language
            };
            
            // Display formatted values in each culture
            Console.WriteLine("Currency formatting across cultures (value = 1234.56):");
            foreach (var culture in cultures)
            {
                string currencyFormat = amount.ToString("C", culture);
                Console.WriteLine($"  {culture.Name,-10}: {currencyFormat}");
            }
            
            Console.WriteLine("\nDate formatting across cultures (date = January 15, 2023):");
            foreach (var culture in cultures)
            {
                string shortDate = date.ToString("d", culture);
                string longDate = date.ToString("D", culture);
                Console.WriteLine($"  {culture.Name,-10}: Short: {shortDate}, Long: {longDate}");
            }
            
            Console.WriteLine("\nNumber formatting across cultures (value = 1234.56):");
            foreach (var culture in cultures)
            {
                string numberFormat = amount.ToString("N", culture);
                Console.WriteLine($"  {culture.Name,-10}: {numberFormat}");
            }
            
            Console.WriteLine("\nPercentage formatting across cultures (value = 0.2345):");
            foreach (var culture in cultures)
            {
                string percentFormat = percentage.ToString("P", culture);
                Console.WriteLine($"  {culture.Name,-10}: {percentFormat}");
            }
            
            // Culture-specific string.Format and formatting
            Console.WriteLine("\nCulture-specific string.Format:");
            
            CultureInfo usCulture = new CultureInfo("en-US");
            CultureInfo frCulture = new CultureInfo("fr-FR");
            
            string usFormatted = string.Format(usCulture, 
                "Amount: {0:C}, Date: {1:d}, Number: {2:N2}", amount, date, 1234.56);
            
            string frFormatted = string.Format(frCulture, 
                "Amount: {0:C}, Date: {1:d}, Number: {2:N2}", amount, date, 1234.56);
            
            Console.WriteLine($"  US format: {usFormatted}");
            Console.WriteLine($"  FR format: {frFormatted}");
            
            // Thread culture settings
            Console.WriteLine("\nChanging thread culture:");
            
            // Save current culture
            CultureInfo originalCulture = Thread.CurrentThread.CurrentCulture;
            CultureInfo originalUICulture = Thread.CurrentThread.CurrentUICulture;
            
            try
            {
                // Change to German culture
                Thread.CurrentThread.CurrentCulture = new CultureInfo("de-DE");
                Thread.CurrentThread.CurrentUICulture = new CultureInfo("de-DE");
                
                Console.WriteLine($"  Thread culture changed to: {Thread.CurrentThread.CurrentCulture.Name}");
                Console.WriteLine($"  Amount: {amount:C}, Date: {date:d}, Number: {1234.56:N2}");
                
                // Change to Japanese culture
                Thread.CurrentThread.CurrentCulture = new CultureInfo("ja-JP");
                Thread.CurrentThread.CurrentUICulture = new CultureInfo("ja-JP");
                
                Console.WriteLine($"  Thread culture changed to: {Thread.CurrentThread.CurrentCulture.Name}");
                Console.WriteLine($"  Amount: {amount:C}, Date: {date:d}, Number: {1234.56:N2}");
            }
            finally
            {
                // Restore original culture
                Thread.CurrentThread.CurrentCulture = originalCulture;
                Thread.CurrentThread.CurrentUICulture = originalUICulture;
            }
            
            // Invariant culture
            Console.WriteLine("\nInvariant culture for machine-readable formats:");
            
            string invariantDateStr = date.ToString("yyyy-MM-dd", CultureInfo.InvariantCulture);
            string invariantNumberStr = amount.ToString("0.00", CultureInfo.InvariantCulture);
            
            Console.WriteLine($"  Date (yyyy-MM-dd): {invariantDateStr}");
            Console.WriteLine($"  Number (0.00): {invariantNumberStr}");
        }
        
        public void ParseWithCulture()
        {
            Console.WriteLine("\n=== Parsing with Culture ===\n");
            
            // Sample strings to parse
            string[] numberStrings = {
                "1,234.56",   // US format
                "1.234,56",   // European format
                "1'234.56",   // Swiss format
                "1,234"       // Integer with thousands separator
            };
            
            string[] dateStrings = {
                "01/15/2023",  // US format (MM/dd/yyyy)
                "15/01/2023",  // UK/European format (dd/MM/yyyy)
                "2023-01-15",  // ISO format (yyyy-MM-dd)
                "15. Januar 2023" // German format
            };
            
            // Parse numbers with different cultures
            Console.WriteLine("Parsing numbers with different cultures:");
            
            CultureInfo usCulture = new CultureInfo("en-US");
            CultureInfo deCulture = new CultureInfo("de-DE");
            CultureInfo chCulture = new CultureInfo("de-CH"); // Swiss German
            
            foreach (string numStr in numberStrings)
            {
                Console.WriteLine($"\n  String to parse: '{numStr}'");
                
                try 
                {
                    decimal usNumber = decimal.Parse(numStr, usCulture);
                    Console.WriteLine($"  US culture: {usNumber}");
                }
                catch (Exception ex)
                {
                    Console.WriteLine($"  US culture: Parse error - {ex.Message}");
                }
                
                try 
                {
                    decimal deNumber = decimal.Parse(numStr, deCulture);
                    Console.WriteLine($"  DE culture: {deNumber}");
                }
                catch (Exception ex)
                {
                    Console.WriteLine($"  DE culture: Parse error - {ex.Message}");
                }
                
                try 
                {
                    decimal chNumber = decimal.Parse(numStr, chCulture);
                    Console.WriteLine($"  CH culture: {chNumber}");
                }
                catch (Exception ex)
                {
                    Console.WriteLine($"  CH culture: Parse error - {ex.Message}");
                }
            }
            
            // Parse dates with different cultures
            Console.WriteLine("\nParsing dates with different cultures:");
            
            CultureInfo usDateCulture = new CultureInfo("en-US");
            CultureInfo ukDateCulture = new CultureInfo("en-GB");
            CultureInfo deDateCulture = new CultureInfo("de-DE");
            CultureInfo invariantCulture = CultureInfo.InvariantCulture;
            
            foreach (string dateStr in dateStrings)
            {
                Console.WriteLine($"\n  String to parse: '{dateStr}'");
                
                try 
                {
                    DateTime usDate = DateTime.Parse(dateStr, usDateCulture);
                    Console.WriteLine($"  US culture: {usDate:yyyy-MM-dd}");
                }
                catch (Exception ex)
                {
                    Console.WriteLine($"  US culture: Parse error - {ex.Message}");
                }
                
                try 
                {
                    DateTime ukDate = DateTime.Parse(dateStr, ukDateCulture);
                    Console.WriteLine($"  UK culture: {ukDate:yyyy-MM-dd}");
                }
                catch (Exception ex)
                {
                    Console.WriteLine($"  UK culture: Parse error - {ex.Message}");
                }
                
                try 
                {
                    DateTime deDate = DateTime.Parse(dateStr, deDateCulture);
                    Console.WriteLine($"  DE culture: {deDate:yyyy-MM-dd}");
                }
                catch (Exception ex)
                {
                    Console.WriteLine($"  DE culture: Parse error - {ex.Message}");
                }
            }
            
            // Safe parsing with TryParse
            Console.WriteLine("\nSafe parsing with TryParse:");
            
            string difficultNumber = "1.234.567,89"; // European format with thousands separators
            
            if (decimal.TryParse(difficultNumber, NumberStyles.Any, new CultureInfo("de-DE"), out decimal result))
            {
                Console.WriteLine($"  Successfully parsed '{difficultNumber}' to {result} using German culture");
            }
            else
            {
                Console.WriteLine($"  Failed to parse '{difficultNumber}'");
            }
            
            // Exact format parsing with DateTime.ParseExact
            Console.WriteLine("\nExact format parsing:");
            
            string isoDate = "2023-01-15";
            DateTime parsedDate = DateTime.ParseExact(isoDate, "yyyy-MM-dd", CultureInfo.InvariantCulture);
            Console.WriteLine($"  Parsed ISO date '{isoDate}' to {parsedDate.ToString("D", new CultureInfo("en-US"))}");
            
            string customFormat = "15/Jan/2023";
            parsedDate = DateTime.ParseExact(customFormat, "dd/MMM/yyyy", CultureInfo.InvariantCulture);
            Console.WriteLine($"  Parsed custom format '{customFormat}' to {parsedDate.ToString("D", new CultureInfo("en-US"))}");
        }
        
        public void FormatProviders()
        {
            Console.WriteLine("\n=== Custom Format Providers ===\n");
            
            // Sample value to format
            decimal temperature = 22.5m;
            
            // Using built-in format provider
            NumberFormatInfo numberInfo = new NumberFormatInfo
            {
                NumberDecimalSeparator = ".",
                NumberGroupSeparator = " ",
                PositiveSign = "+",
                NegativeSign = "−" // Unicode minus sign
            };
            
            string customNumber = temperature.ToString("N2", numberInfo);
            Console.WriteLine($"Custom number format: {customNumber}");
            
            // Custom IFormatProvider and ICustomFormatter
            var temperatureFormatter = new TemperatureFormatProvider();
            
            string celsiusFormat = string.Format(temperatureFormatter, "{0:C}", temperature);
            string fahrenheitFormat = string.Format(temperatureFormatter, "{0:F}", temperature);
            string kelvinFormat = string.Format(temperatureFormatter, "{0:K}", temperature);
            
            Console.WriteLine($"Temperature in Celsius:    {celsiusFormat}");
            Console.WriteLine($"Temperature in Fahrenheit: {fahrenheitFormat}");
            Console.WriteLine($"Temperature in Kelvin:     {kelvinFormat}");
            
            // Format provider example with composite formatting
            string weatherReport = string.Format(temperatureFormatter,
                "The current temperature is {0:C}, which is {0:F} in Fahrenheit or {0:K} in Kelvin.",
                temperature);
                
            Console.WriteLine($"\nWeather report: {weatherReport}");
            
            // Using with string interpolation
            FormattableString formattable = $"It feels like {temperature:C} today!";
            string interpolated = formattable.ToString(temperatureFormatter);
            
            Console.WriteLine($"Interpolated: {interpolated}");
        }
        
        public void ResourceLocalization()
        {
            Console.WriteLine("\n=== Resource Localization ===\n");
            
            // This is a simplified example of resource localization
            // In a real application, you would use .resx files and ResourceManager
            
            // Create a simple resource dictionary for demonstration
            Dictionary<string, Dictionary<string, string>> resources = new Dictionary<string, Dictionary<string, string>>
            {
                ["en-US"] = new Dictionary<string, string>
                {
                    ["Greeting"] = "Hello!",
                    ["Welcome"] = "Welcome to our application.",
                    ["Farewell"] = "Goodbye!"
                },
                
                ["fr-FR"] = new Dictionary<string, string>
                {
                    ["Greeting"] = "Bonjour!",
                    ["Welcome"] = "Bienvenue dans notre application.",
                    ["Farewell"] = "Au revoir!"
                },
                
                ["es-ES"] = new Dictionary<string, string>
                {
                    ["Greeting"] = "¡Hola!",
                    ["Welcome"] = "Bienvenido a nuestra aplicación.",
                    ["Farewell"] = "¡Adiós!"
                },
                
                ["de-DE"] = new Dictionary<string, string>
                {
                    ["Greeting"] = "Hallo!",
                    ["Welcome"] = "Willkommen in unserer Anwendung.",
                    ["Farewell"] = "Auf Wiedersehen!"
                }
            };
            
            // Simulate ResourceManager functionality
            string GetLocalizedString(string key, string cultureName)
            {
                // Try specific culture
                if (resources.TryGetValue(cultureName, out var cultureResources))
                {
                    if (cultureResources.TryGetValue(key, out var value))
                    {
                        return value;
                    }
                }
                
                // Try neutral culture
                string neutralCulture = cultureName.Split('-')[0];
                foreach (var entry in resources)
                {
                    if (entry.Key.StartsWith(neutralCulture + "-"))
                    {
                        if (entry.Value.TryGetValue(key, out var value))
                        {
                            return value;
                        }
                        break;
                    }
                }
                
                // Fall back to en-US
                if (resources["en-US"].TryGetValue(key, out var defaultValue))
                {
                    return defaultValue;
                }
                
                // Key not found
                return $"[{key}]";
            }
            
            // Sample usage
            string[] cultures = { "en-US", "fr-FR", "es-ES", "de-DE", "it-IT" };
            
            foreach (string cultureName in cultures)
            {
                Console.WriteLine($"Culture: {cultureName}");
                
                string greeting = GetLocalizedString("Greeting", cultureName);
                string welcome = GetLocalizedString("Welcome", cultureName);
                string farewell = GetLocalizedString("Farewell", cultureName);
                string missing = GetLocalizedString("Missing", cultureName);
                
                Console.WriteLine($"  Greeting: {greeting}");
                Console.WriteLine($"  Welcome: {welcome}");
                Console.WriteLine($"  Farewell: {farewell}");
                Console.WriteLine($"  Missing key: {missing}");
                Console.WriteLine();
            }
            
            // Note about real resource localization
            Console.WriteLine("Note: In real applications, resource localization is implemented using:");
            Console.WriteLine("- .resx files for storing localized strings");
            Console.WriteLine("- ResourceManager class for loading resources");
            Console.WriteLine("- Satellite assemblies for deployment");
            Console.WriteLine("- Thread.CurrentThread.CurrentUICulture for determining the current UI culture");
        }
        
        public void RunAllDemos()
        {
            BasicFormatting();
            FormatSpecifiers();
            AlignmentAndPadding();
            CustomFormatStrings();
            CultureSpecificFormatting();
            ParseWithCulture();
            FormatProviders();
            ResourceLocalization();
        }
    }
    
    // Helper classes for the demo
    
    // Custom class for ToString() demonstration
    public class Person
    {
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public int Age { get; set; }
        
        public override string ToString()
        {
            return $"{FirstName} {LastName}, Age: {Age}";
        }
    }
    
    // Custom format provider for temperature formatting
    public class TemperatureFormatProvider : IFormatProvider, ICustomFormatter
    {
        private const string CelsiusFormat = "C";
        private const string FahrenheitFormat = "F";
        private const string KelvinFormat = "K";
        
        public object GetFormat(Type formatType)
        {
            if (formatType == typeof(ICustomFormatter))
                return this;
            return null;
        }
        
        public string Format(string format, object arg, IFormatProvider formatProvider)
        {
            if (arg == null)
                return string.Empty;
                
            // Check if we need to handle this format
            if (format == null || 
                !(format == CelsiusFormat || format == FahrenheitFormat || format == KelvinFormat))
            {
                // Not one of our formats, delegate to default formatting
                if (arg is IFormattable formattable)
                    return formattable.ToString(format, CultureInfo.CurrentCulture);
                return arg.ToString();
            }
            
            // Convert to decimal
            if (!decimal.TryParse(arg.ToString(), out decimal temperature))
                return arg.ToString();
                
            // Format based on format specifier
            switch (format)
            {
                case CelsiusFormat:
                    return $"{temperature:F1}°C";
                    
                case FahrenheitFormat:
                    decimal fahrenheit = (temperature * 9 / 5) + 32;
                    return $"{fahrenheit:F1}°F";
                    
                case KelvinFormat:
                    decimal kelvin = temperature + 273.15m;
                    return $"{kelvin:F1}K";
                    
                default:
                    return arg.ToString();
            }
        }
    }
}`,
          exercise: {
            instructions:
              'Create a program that demonstrates string formatting and culture-specific operations. Implement methods for formatting different types of data (numbers, dates, currency) using standard and custom format specifiers. Create examples showing how to handle the same data across different cultures and languages. Implement a custom format provider for a specific formatting scenario (e.g., measurements, coordinates, or custom date formats). Include a demonstration of parsing culture-sensitive formats safely. Implement a simple localization system using resource dictionaries for displaying messages in different languages based on the current culture.',
          },
        },
        {
          title: 'StringBuilder',
          explanation: `
        <p>StringBuilder provides an efficient way to build strings through multiple operations without the performance overhead of repeated string allocations:</p>
        
        <h4>Understanding StringBuilder</h4>
        <p>StringBuilder is a mutable string class in the System.Text namespace that addresses performance issues with string concatenation:</p>

        <p><strong>Mutability:</strong> Unlike the string class, StringBuilder objects can be modified without creating new instances, making them more efficient for repeated operations.</p>

        <p><strong>Internal buffer:</strong> StringBuilder maintains a buffer that can grow as needed, reducing the number of memory allocations during string building.</p>

        <p><strong>Capacity management:</strong> You can set an initial capacity to avoid reallocations when you know the approximate size of the final string.</p>

        <p><strong>Performance benefits:</strong> Using StringBuilder instead of string concatenation can significantly improve performance when building strings through many operations.</p>

        <h4>StringBuilder Operations</h4>
        <p>StringBuilder provides a rich set of methods for building and manipulating strings:</p>

        <p><strong>Append:</strong> Add content to the end of the current value.</p>

        <p><strong>AppendLine:</strong> Add content followed by a line break.</p>

        <p><strong>AppendFormat:</strong> Add formatted content using composite formatting.</p>

        <p><strong>Insert:</strong> Add content at a specified position.</p>

        <p><strong>Remove:</strong> Delete a range of characters.</p>

        <p><strong>Replace:</strong> Replace all occurrences of specified characters or substrings.</p>

        <p><strong>ToString:</strong> Convert the StringBuilder to a string when building is complete.</p>

        <h4>When to Use StringBuilder</h4>
        <p>Understanding when to use StringBuilder vs. string is important for writing efficient code:</p>

        <p><strong>Use StringBuilder:</strong> When you're performing multiple string operations, especially in loops or when building large strings incrementally.</p>

        <p><strong>Use string:</strong> For simple concatenations, when using interpolation, or when the number of operations is small and known at compile time.</p>

        <p><strong>Rule of thumb:</strong> If you're performing more than a few concatenations, particularly in a loop, consider StringBuilder for better performance.</p>
        
        <div class="code-example">
          <pre><code>// Simple StringBuilder example
using System.Text;

// Create a new StringBuilder
StringBuilder sb = new StringBuilder();

// Append strings
sb.Append("Hello");
sb.Append(" ");
sb.Append("World");
sb.Append("!");

// Get the resulting string
string result = sb.ToString();  // "Hello World!"

// Create with initial value and capacity
StringBuilder sb2 = new StringBuilder("Initial text", 100);

// Append with format
sb2.AppendFormat(" - {0} at {1:t}", "Created", DateTime.Now);

// Append a line (adds Environment.NewLine)
sb2.AppendLine();
sb2.AppendLine("This is a new line.");

// Insert text at position
sb2.Insert(0, "START: ");

// Replace text
sb2.Replace("Initial", "Modified");

// Remove characters
sb2.Remove(0, 7);  // Remove "START: "</code></pre>
        </div>
        
        <h4>StringBuilder Performance Considerations</h4>
        <div class="code-example">
          <pre><code>// String concatenation vs. StringBuilder performance
string s = "";
for (int i = 0; i < 10000; i++)
{
    s += i.ToString();  // Creates a new string each time
}

// More efficient with StringBuilder
StringBuilder sb = new StringBuilder();
for (int i = 0; i < 10000; i++)
{
    sb.Append(i.ToString());  // Modifies the existing instance
}
string result = sb.ToString();  // Convert to string once at the end

// Setting initial capacity for even better performance
StringBuilder sb2 = new StringBuilder(100000);  // Pre-allocate buffer
for (int i = 0; i < 10000; i++)
{
    sb2.Append(i.ToString());
}
string result2 = sb2.ToString();</code></pre>
        </div>
        
        <div class="interview-tip">
          <p><span class="interview-icon">🎯</span> <strong>Interview Focus:</strong> Be prepared to discuss the performance characteristics of StringBuilder compared to string concatenation, and when to use each approach.</p>
          <p>Key areas to focus on:</p>
          <ul>
            <li>Understanding when StringBuilder provides performance benefits</li>
            <li>Memory management differences between string and StringBuilder</li>
            <li>Setting appropriate initial capacity for StringBuilder</li>
            <li>StringBuilder thread safety considerations</li>
            <li>Balancing code readability with performance concerns</li>
          </ul>
        </div>
      `,
          codeExample: `// Comprehensive StringBuilder examples in C#

using System;
using System.Text;
using System.Diagnostics;
using System.Collections.Generic;

namespace StringBuilderExamples
{
    public class StringBuilderDemo
    {
        public void BasicStringBuilderOperations()
        {
            Console.WriteLine("=== Basic StringBuilder Operations ===\n");
            
            // Creating a StringBuilder
            StringBuilder sb = new StringBuilder();
            Console.WriteLine($"New StringBuilder - Length: {sb.Length}, Capacity: {sb.Capacity}");
            
            // Append operations
            sb.Append("Hello");
            Console.WriteLine($"After Append(\\"Hello\\") - Value: '{sb}', Length: {sb.Length}, Capacity: {sb.Capacity}");
            
            sb.Append(' ');
            sb.Append("World");
            Console.WriteLine($"After more Append - Value: '{sb}', Length: {sb.Length}, Capacity: {sb.Capacity}");
            
            // AppendLine
            sb.AppendLine("!");
            sb.AppendLine("This is a new line.");
            Console.WriteLine($"After AppendLine - Value: '{sb}', Length: {sb.Length}, Capacity: {sb.Capacity}");
            
            // AppendFormat
            sb.AppendFormat("The time is {0:t} on {0:d}.", DateTime.Now);
            Console.WriteLine($"After AppendFormat - Length: {sb.Length}, Capacity: {sb.Capacity}");
            
            // StringBuilder with initial value
            StringBuilder sb2 = new StringBuilder("Initial text");
            Console.WriteLine($"\nStringBuilder with initial value - Value: '{sb2}', Capacity: {sb2.Capacity}");
            
            // StringBuilder with initial capacity
            StringBuilder sb3 = new StringBuilder(100);
            Console.WriteLine($"StringBuilder with initial capacity - Length: {sb3.Length}, Capacity: {sb3.Capacity}");
            
            // StringBuilder with initial value and capacity
            StringBuilder sb4 = new StringBuilder("Initial text", 100);
            Console.WriteLine($"StringBuilder with initial value and capacity - Length: {sb4.Length}, Capacity: {sb4.Capacity}");
            
            // Convert to string
            string result = sb.ToString();
            Console.WriteLine($"\nFinal string: '{result}'");
        }
        
        public void ManipulatingContent()
        {
            Console.WriteLine("\n=== Manipulating StringBuilder Content ===\n");
            
            // Create a StringBuilder
            StringBuilder sb = new StringBuilder("The quick brown fox jumps over the lazy dog.");
            Console.WriteLine($"Original: '{sb}'");
            
            // Insert operations
            sb.Insert(4, " very");
            Console.WriteLine($"After Insert: '{sb}'");
            
            // Insert different types
            sb.Insert(0, 123);
            sb.Insert(0, 'A');
            sb.Insert(0, true);
            Console.WriteLine($"After inserting different types: '{sb}'");
            
            // Remove operations
            sb.Remove(0, 8);  // Remove first 8 characters
            Console.WriteLine($"After Remove: '{sb}'");
            
            // Replace operations
            sb.Replace("fox", "cat");
            Console.WriteLine($"After Replace fox -> cat: '{sb}'");
            
            // Replace all occurrences
            sb.Replace(" ", "_");
            Console.WriteLine($"After Replace spaces -> underscores: '{sb}'");
            
            // Replace with conditional check
            StringBuilder sb2 = new StringBuilder("one two three four five");
            for (int i = 0; i < sb2.Length; i++)
            {
                if (sb2[i] == 't')
                {
                    sb2[i] = 'T';
                }
            }
            Console.WriteLine($"\nAfter conditional replace: '{sb2}'");
            
            // Clear StringBuilder
            StringBuilder sb3 = new StringBuilder("Some text");
            sb3.Clear();  // Equivalent to sb3.Length = 0;
            Console.WriteLine($"\nAfter Clear: '{sb3}', Length: {sb3.Length}, Capacity: {sb3.Capacity}");
            
            // Working with substrings
            StringBuilder sb4 = new StringBuilder("The quick brown fox");
            Console.WriteLine($"\nSubstring-like operations with StringBuilder (original: '{sb4}'):");
            
            // There's no direct substring method, but you can use ToString and then re-create
            string subString = sb4.ToString(4, 5);  // "quick"
            Console.WriteLine($"ToString(4, 5): '{subString}'");
            
            // Another approach - create a new StringBuilder with a portion
            string portion = sb4.ToString(4, sb4.Length - 4);
            StringBuilder sb5 = new StringBuilder(portion);
            Console.WriteLine($"Portion from index 4 to end: '{sb5}'");
        }
        
        public void CapacityManagement()
        {
            Console.WriteLine("\n=== StringBuilder Capacity Management ===\n");
            
            // Default capacity
            StringBuilder sb1 = new StringBuilder();
            Console.WriteLine($"Default capacity: {sb1.Capacity}");
            
            // Initial capacity
            StringBuilder sb2 = new StringBuilder(50);
            Console.WriteLine($"Initial capacity 50: {sb2.Capacity}");
            
            // Observing automatic capacity growth
            StringBuilder sb3 = new StringBuilder(16);  // Small initial capacity
            Console.WriteLine($"Initial - Length: {sb3.Length}, Capacity: {sb3.Capacity}");
            
            // Add data until we exceed capacity
            for (int i = 0; i < 5; i++)
            {
                sb3.Append("Some text. ");
                Console.WriteLine($"After append #{i+1} - Length: {sb3.Length}, Capacity: {sb3.Capacity}");
            }
            
            // Manually set capacity
            StringBuilder sb4 = new StringBuilder();
            sb4.Capacity = 100;
            Console.WriteLine($"\nAfter manually setting capacity: {sb4.Capacity}");
            
            // EnsureCapacity
            StringBuilder sb5 = new StringBuilder(50);
            int newCapacity = sb5.EnsureCapacity(75);
            Console.WriteLine($"After EnsureCapacity(75): {sb5.Capacity}, returned value: {newCapacity}");
            
            newCapacity = sb5.EnsureCapacity(25);  // Smaller than current capacity
            Console.WriteLine($"After EnsureCapacity(25): {sb5.Capacity}, returned value: {newCapacity}");
            
            // Set max capacity
            StringBuilder sb6 = new StringBuilder(16, 100);  // Initial 16, max 100
            Console.WriteLine($"\nStringBuilder with max capacity - Initial capacity: {sb6.Capacity}, Max capacity: {sb6.MaxCapacity}");
            
            try
            {
                sb6.EnsureCapacity(150);  // Exceeds max capacity
                Console.WriteLine("Capacity increased to 150");
            }
            catch (ArgumentOutOfRangeException ex)
            {
                Console.WriteLine($"Exception: {ex.Message}");
            }
        }
        
        public void PerformanceComparison()
        {
            Console.WriteLine("\n=== Performance Comparison ===\n");
            
            // Setup for tests
            const int iterationCount = 10000;
            Stopwatch stopwatch = new Stopwatch();
            
            // Test 1: String concatenation
            stopwatch.Start();
            string s = "";
            for (int i = 0; i < iterationCount; i++)
            {
                s += "x";
            }
            stopwatch.Stop();
            long stringTime = stopwatch.ElapsedMilliseconds;
            Console.WriteLine($"String concatenation: {stringTime} ms");
            
            // Test 2: StringBuilder with default capacity
            stopwatch.Restart();
            StringBuilder sb1 = new StringBuilder();
            for (int i = 0; i < iterationCount; i++)
            {
                sb1.Append("x");
            }
            string result1 = sb1.ToString();
            stopwatch.Stop();
            long sbDefaultTime = stopwatch.ElapsedMilliseconds;
            Console.WriteLine($"StringBuilder (default capacity): {sbDefaultTime} ms");
            
            // Test 3: StringBuilder with appropriate initial capacity
            stopwatch.Restart();
            StringBuilder sb2 = new StringBuilder(iterationCount);
            for (int i = 0; i < iterationCount; i++)
            {
                sb2.Append("x");
            }
            string result2 = sb2.ToString();
            stopwatch.Stop();
            long sbOptimizedTime = stopwatch.ElapsedMilliseconds;
            Console.WriteLine($"StringBuilder (optimized capacity): {sbOptimizedTime} ms");
            
            // Test 4: String concatenation with + operator (in a single statement)
            stopwatch.Restart();
            string singleStatement = "Start " + "with " + "multiple " + "strings " + "in " + "one " + "statement.";
            stopwatch.Stop();
            long singleStatementTime = stopwatch.ElapsedMilliseconds;
            Console.WriteLine($"Single statement concatenation: {singleStatementTime} ms");
            
            // Test 5: String.Concat with multiple arguments
            stopwatch.Restart();
            string concat = String.Concat("Start ", "with ", "multiple ", "strings ", "using ", "String.Concat");
            stopwatch.Stop();
            long stringConcatTime = stopwatch.ElapsedMilliseconds;
            Console.WriteLine($"String.Concat method: {stringConcatTime} ms");
            
            // Test 6: String interpolation
            string part1 = "Start";
            string part2 = "with";
            string part3 = "string";
            string part4 = "interpolation";
            
            stopwatch.Restart();
            string interpolated = $"{part1} {part2} {part3} {part4}";
            stopwatch.Stop();
            long interpolationTime = stopwatch.ElapsedMilliseconds;
            Console.WriteLine($"String interpolation: {interpolationTime} ms");
            
            // Calculate performance improvement
            if (stringTime > 0)
            {
                float defaultImprovement = (float)stringTime / sbDefaultTime;
                float optimizedImprovement = (float)stringTime / sbOptimizedTime;
                
                Console.WriteLine($"\nStringBuilder (default) is {defaultImprovement:F1}x faster than string concatenation");
                Console.WriteLine($"StringBuilder (optimized) is {optimizedImprovement:F1}x faster than string concatenation");
            }
            
            // When to use StringBuilder summary
            Console.WriteLine("\nGuidelines for using StringBuilder vs. string:");
            Console.WriteLine("- String concatenation is fine for a few operations or when concatenating at compile time");
            Console.WriteLine("- StringBuilder is better for multiple operations, especially in loops");
            Console.WriteLine("- Setting an appropriate initial capacity further improves StringBuilder performance");
            Console.WriteLine("- String interpolation and String.Concat are more efficient than += for combining a few strings");
        }
        
        public void RealWorldExamples()
        {
            Console.WriteLine("\n=== Real-World StringBuilder Examples ===\n");
            
            // Example 1: Building a CSV file
            Console.WriteLine("Building a CSV file:");
            StringBuilder csvBuilder = new StringBuilder();
            
            // Add header
            csvBuilder.AppendLine("Name,Age,Email");
            
            // Add data rows
            string[] names = { "John Smith", "Alice Johnson", "Bob Brown" };
            int[] ages = { 30, 25, 45 };
            string[] emails = { "john@example.com", "alice@example.com", "bob@example.com" };
            
            for (int i = 0; i < names.Length; i++)
            {
                csvBuilder.Append(names[i]).Append(',')
                          .Append(ages[i]).Append(',')
                          .AppendLine(emails[i]);
            }
            
            string csvContent = csvBuilder.ToString();
            Console.WriteLine(csvContent);
            
            // Example 2: Building an HTML table
            Console.WriteLine("\nBuilding an HTML table:");
            StringBuilder htmlBuilder = new StringBuilder();
            
            htmlBuilder.AppendLine("<table border=\\"1\\">");
            htmlBuilder.AppendLine("  <tr><th>Name</th><th>Age</th><th>Email</th></tr>");
            
            for (int i = 0; i < names.Length; i++)
            {
                htmlBuilder.AppendLine("  <tr>")
                           .Append("    <td>").Append(names[i]).AppendLine("</td>")
                           .Append("    <td>").Append(ages[i]).AppendLine("</td>")
                           .Append("    <td>").Append(emails[i]).AppendLine("</td>")
                           .AppendLine("  </tr>");
            }
            
            htmlBuilder.AppendLine("</table>");
            
            string htmlContent = htmlBuilder.ToString();
            Console.WriteLine(htmlContent);
            
            // Example 3: Building a SQL query
            Console.WriteLine("\nBuilding a SQL query with parameters:");
            
            Dictionary<string, object> parameters = new Dictionary<string, object>
            {
                { "FirstName", "John" },
                { "LastName", "Smith" },
                { "MinAge", 30 },
                { "Active", true }
            };
            
            StringBuilder sqlBuilder = new StringBuilder("SELECT * FROM Users WHERE 1=1");
            
            foreach (var param in parameters)
            {
                sqlBuilder.Append(" AND ");
                
                // Handle different parameter types appropriately
                if (param.Value is string)
                {
                    sqlBuilder.Append(param.Key).Append(" = '").Append(param.Value).Append("'");
                }
                else if (param.Value is bool)
                {
                    sqlBuilder.Append(param.Key).Append(" = ").Append(((bool)param.Value) ? "1" : "0");
                }
                else
                {
                    sqlBuilder.Append(param.Key).Append(" = ").Append(param.Value);
                }
            }
            
            string sqlQuery = sqlBuilder.ToString();
            Console.WriteLine(sqlQuery);
            
            // Example 4: Building indented text
            Console.WriteLine("\nBuilding indented JSON-like text:");
            
            StringBuilder jsonBuilder = new StringBuilder();
            jsonBuilder.AppendLine("{");
            
            string[] properties = { "name", "age", "email", "active" };
            object[] values = { "John Smith", 30, "john@example.com", true };
            
            for (int i = 0; i < properties.Length; i++)
            {
                jsonBuilder.Append("  \\"").Append(properties[i]).Append("\\": ");
                
                // Format value based on type
                if (values[i] is string)
                {
                    jsonBuilder.Append("\\"").Append(values[i]).Append("\\"");
                }
                else
                {
                    jsonBuilder.Append(values[i]);
                }
                
                // Add comma if not the last item
                if (i < properties.Length - 1)
                {
                    jsonBuilder.AppendLine(",");
                }
                else
                {
                    jsonBuilder.AppendLine();
                }
            }
            
            jsonBuilder.AppendLine("}");
            
            string jsonContent = jsonBuilder.ToString();
            Console.WriteLine(jsonContent);
        }
        
        public void StringBuilderTipsAndTricks()
        {
            Console.WriteLine("\n=== StringBuilder Tips and Tricks ===\n");
            
            // Tip 1: Chaining operations
            Console.WriteLine("Chaining StringBuilder operations:");
            
            StringBuilder chainedBuilder = new StringBuilder()
                .Append("Hello")
                .Append(' ')
                .Append("World")
                .AppendLine("!")
                .AppendLine("This is a new line.")
                .AppendFormat("The date is {0:d}", DateTime.Now);
                
            Console.WriteLine(chainedBuilder.ToString());
            
            // Tip 2: StringBuilder reuse
            Console.WriteLine("\nReusing StringBuilder instance:");
            
            StringBuilder reusableBuilder = new StringBuilder();
            
            void AppendLog(string message)
            {
                reusableBuilder.AppendLine($"[{DateTime.Now:HH:mm:ss}] {message}");
            }
            
            AppendLog("Application started");
            AppendLog("Processing data...");
            AppendLog("Data processing complete");
            
            Console.WriteLine(reusableBuilder.ToString());
            
            // Clear and reuse the same StringBuilder
            reusableBuilder.Clear();
            
            AppendLog("New log session started");
            AppendLog("Another message");
            
            Console.WriteLine(reusableBuilder.ToString());
            
            // Tip 3: Using StringWriter with StringBuilder
            Console.WriteLine("\nUsing StringWriter with StringBuilder:");
            
            StringBuilder writerBuilder = new StringBuilder();
            using (System.IO.StringWriter writer = new System.IO.StringWriter(writerBuilder))
            {
                writer.WriteLine("First line");
                writer.WriteLine("Second line");
                writer.Write("Third line ");
                writer.Write("continued...");
            }
            
            Console.WriteLine(writerBuilder.ToString());
            
            // Tip 4: Track and limit content length
            Console.WriteLine("\nTracking and limiting content length:");
            
            StringBuilder limitedBuilder = new StringBuilder();
            int maxLength = 20;
            
            void AppendWithLimit(string text)
            {
                if (limitedBuilder.Length + text.Length <= maxLength)
                {
                    limitedBuilder.Append(text);
                }
                else
                {
                    int remainingSpace = maxLength - limitedBuilder.Length;
                    if (remainingSpace > 0)
                    {
                        limitedBuilder.Append(text.Substring(0, remainingSpace));
                    }
                    limitedBuilder.Append("...");
                }
            }
            
            AppendWithLimit("This is a ");
            AppendWithLimit("very long text that will be truncated");
            
            Console.WriteLine(limitedBuilder.ToString());
            
            // Tip 5: Using AppendJoin (equivalent to String.Join)
            Console.WriteLine("\nUsing AppendJoin (C# 8.0+):");
            
            string[] items = { "apple", "banana", "cherry", "date" };
            
            // Pre C# 8.0 approach
            StringBuilder joinBuilder1 = new StringBuilder();
            for (int i = 0; i < items.Length; i++)
            {
                joinBuilder1.Append(items[i]);
                if (i < items.Length - 1)
                {
                    joinBuilder1.Append(", ");
                }
            }
            
            Console.WriteLine(joinBuilder1.ToString());
            
            // C# 8.0+ approach (commented out to maintain compatibility)
            // StringBuilder joinBuilder2 = new StringBuilder();
            // joinBuilder2.AppendJoin(", ", items);
            // Console.WriteLine(joinBuilder2.ToString());
            
            // Alternative using String.Join with StringBuilder
            StringBuilder joinBuilder3 = new StringBuilder();
            joinBuilder3.Append(String.Join(", ", items));
            Console.WriteLine(joinBuilder3.ToString());
        }
        
        public void RunAllDemos()
        {
            BasicStringBuilderOperations();
            ManipulatingContent();
            CapacityManagement();
            PerformanceComparison();
            RealWorldExamples();
            StringBuilderTipsAndTricks();
        }
    }
}`,
          exercise: {
            instructions:
              'Create a program that demonstrates the advantages of StringBuilder over string concatenation. Implement methods that perform the same string-building operations using both approaches and measure the performance difference. Create utility methods that use StringBuilder for common tasks like building CSV data, generating formatted text reports, and constructing complex SQL queries with parameters. Demonstrate effective capacity management by comparing operations with default capacity versus appropriate initial capacity. Include examples showing when string concatenation or interpolation is preferable and when StringBuilder provides significant performance benefits.',
          },
        },
      ],
      prepperSummary: `
    <div class="prepper-summary">
      <h3>🔑 Key Interview Takeaways</h3>
      <ul>
        <li><strong>String Immutability:</strong> Understand that strings are immutable in C#, which affects how they should be manipulated for optimal performance.</li>
        
        <li><strong>String Operations:</strong> Master common string operations like searching, extracting, and modifying, with an understanding of the performance implications.</li>
        
        <li><strong>StringBuilder:</strong> Know when to use StringBuilder instead of string concatenation, particularly for building strings in loops or through multiple operations.</li>
        
        <li><strong>Regular Expressions:</strong> Be able to create efficient regex patterns for validation and text extraction, with an understanding of regex syntax and performance considerations.</li>
        
        <li><strong>Culture-Aware Operations:</strong> Understand how to properly handle strings in different cultures, particularly for formatting and parsing operations.</li>
      </ul>
      
      <h4>📝 Common Interview Questions</h4>
      <ol>
        <li>"What is the difference between string and StringBuilder in C#?"</li>
        <li>"When would you use regular expressions vs. string methods for text manipulation?"</li>
        <li>"How would you ensure proper string comparison in a globalized application?"</li>
        <li>"Explain the performance implications of string concatenation in a loop"</li>
        <li>"What's the difference between CurrentCulture and InvariantCulture for string operations?"</li>
      </ol>
    </div>
  `,
    }, // End of Lesson 4
  ],
  challenge: {
    description:
      'You\'re building a "Social Media Message Parser" to analyze social media posts. Your tool needs to extract mentions and hashtags, determine the basic sentiment of the message, and format messages for display.',
    requirements: [
      'Extract @mentions and #hashtags from messages',
      'Analyze messages to determine if they are positive, negative, or neutral',
      'Format messages for display by highlighting mentions and hashtags',
      'Count words and characters in messages',
      'Generate a simple summary of message statistics',
    ],
    starterCode: `// Social Media Message Parser
// A simple tool to analyze and format social media messages

using System;
using System.Collections.Generic;
using System.Text;

namespace SocialMediaParser
{
    class MessageParser
    {
        // A few sample positive and negative words for sentiment analysis
        private readonly string[] _positiveWords = { "good", "great", "happy", "love", "awesome" };
        private readonly string[] _negativeWords = { "bad", "sad", "hate", "awful", "terrible" };
        
        /// <summary>
        /// Extracts all @mentions from a message
        /// </summary>
        public List<string> GetMentions(string message)
        {
            // TODO: Extract all @mentions from the message
            // A mention starts with @ followed by letters/numbers
            return new List<string>();
        }
        
        /// <summary>
        /// Extracts all #hashtags from a message
        /// </summary>
        public List<string> GetHashtags(string message)
        {
            // TODO: Extract all #hashtags from the message
            // A hashtag starts with # followed by letters/numbers
            return new List<string>();
        }
        
        /// <summary>
        /// Determines if a message is positive, negative, or neutral
        /// </summary>
        public string GetSentiment(string message)
        {
            // TODO: Analyze the message and return "positive", "negative", or "neutral"
            return "neutral";
        }
        
        /// <summary>
        /// Formats a message for display, highlighting @mentions and #hashtags
        /// </summary>
        public string FormatMessage(string message)
        {
            // TODO: Replace @mentions with "[@mention]" and #hashtags with "[#hashtag]"
            // Example: "Hello @john! #awesome" becomes "Hello [@john]! [#awesome]"
            return message;
        }
        
        /// <summary>
        /// Generates a summary of the message
        /// </summary>
        public string GetSummary(string message)
        {
            // TODO: Return a summary with:
            // - Word count
            // - Character count
            // - Number of mentions
            // - Number of hashtags
            // - Sentiment
            
            return "Message summary";
        }
    }
    
    class Program
    {
        static void Main(string[] args)
        {
            // Test the MessageParser with a sample message
            string message = "Having a @great day with @friends! #sunshine #happy";
            
            var parser = new MessageParser();
            
            // Display mentions
            List<string> mentions = parser.GetMentions(message);
            Console.WriteLine("Mentions: " + string.Join(", ", mentions));
            
            // Display hashtags
            List<string> hashtags = parser.GetHashtags(message);
            Console.WriteLine("Hashtags: " + string.Join(", ", hashtags));
            
            // Display sentiment
            string sentiment = parser.GetSentiment(message);
            Console.WriteLine("Sentiment: " + sentiment);
            
            // Display formatted message
            string formatted = parser.FormatMessage(message);
            Console.WriteLine("Formatted: " + formatted);
            
            // Display summary
            string summary = parser.GetSummary(message);
            Console.WriteLine("\nSummary:\n" + summary);
        }
    }
}`,
  },
}

export default csharpFundamentals
