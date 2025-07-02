// curriculum-section2.js - Object-Oriented Programming in C#

const objectOrientedProgramming = {
  title: 'Object-Oriented Programming in C#',
  description:
    'Master advanced object-oriented programming concepts in C# to build robust and maintainable applications.',
  lessons: [
    {
      title: 'Classes and Objects',
      description:
        'Understand how to define and use classes and objects, the foundation of OOP in C#.',
      sections: [
        {
          title: 'Defining Classes and Creating Objects',
          explanation: `
        <p>Object-Oriented Programming (OOP) is a programming paradigm that organizes code into objects that contain both data and code. In C#, classes are the fundamental building blocks of OOP, serving as blueprints for creating objects that encapsulate data and behavior.</p>
        
        <h4>Understanding Classes and Objects</h4>
        <p>A <strong>class</strong> is a template or blueprint that defines the structure and behavior of objects. It specifies what data an object can hold (fields and properties) and what actions it can perform (methods). Think of a class as a cookie cutter - it defines the shape, but you need to use it to create actual cookies (objects).</p>

        <p>An <strong>object</strong> is an instance of a class - a concrete entity created from the class blueprint. Each object has its own copy of the class's data and can perform the actions defined by the class's methods. Objects are the building blocks of object-oriented applications.</p>

        <h4>Class Structure and Members</h4>
        <p>C# classes can contain several types of members, each serving a specific purpose in the object's design:</p>

        <p><strong>Fields:</strong> Variables that store data within the object. They represent the object's state and can be of any data type.</p>

        <p><strong>Properties:</strong> Special members that provide controlled access to fields. They can include validation logic and can be read-only, write-only, or read-write.</p>

        <p><strong>Methods:</strong> Functions that define the object's behavior. They can perform operations, manipulate data, and interact with other objects.</p>

        <p><strong>Constructors:</strong> Special methods called when creating new objects. They initialize the object's state and ensure it starts in a valid condition.</p>

        <p><strong>Events:</strong> Mechanisms for objects to notify other objects when something happens.</p>
        
        <div class="code-example">
          <pre><code>// A comprehensive class example
public class BankAccount
{
    // Private fields - internal state
    private decimal balance;
    private string accountNumber;
    private DateTime dateCreated;
    
    // Properties - controlled access to data
    public string AccountNumber 
    { 
        get { return accountNumber; }
        private set { accountNumber = value; } // Only settable within class
    }
    
    public decimal Balance 
    { 
        get { return balance; }
        private set { balance = value; } // Protected from external modification
    }
    
    public DateTime DateCreated => dateCreated; // Read-only property
    
    // Constructor - initializes the object
    public BankAccount(string accountNumber, decimal initialBalance = 0)
    {
        this.accountNumber = accountNumber;
        this.balance = initialBalance;
        this.dateCreated = DateTime.Now;
    }
    
    // Methods - object behavior
    public void Deposit(decimal amount)
    {
        if (amount <= 0)
            throw new ArgumentException("Deposit amount must be positive");
            
        balance += amount;
        Console.WriteLine($"Deposited \${amount}. New balance: \${balance}");
    }
    
    public bool Withdraw(decimal amount)
    {
        if (amount <= 0)
            throw new ArgumentException("Withdrawal amount must be positive");
            
        if (amount > balance)
        {
            Console.WriteLine("Insufficient funds");
            return false;
        }
        
        balance -= amount;
        Console.WriteLine($"Withdrew \${amount}. New balance: \${balance}");
        return true;
    }
    
    public string GetAccountInfo()
    {
        return $"Account: {accountNumber}, Balance: \${balance}, Created: {dateCreated:MM/dd/yyyy}";
    }
}

// Creating and using objects
BankAccount account1 = new BankAccount("12345", 1000);
BankAccount account2 = new BankAccount("67890");

account1.Deposit(500);
account1.Withdraw(200);
Console.WriteLine(account1.GetAccountInfo());</code></pre>
        </div>
        
        <h4>Object Lifecycle and Memory Management</h4>
        <p>Understanding how objects are created, used, and destroyed is crucial for writing efficient C# applications:</p>

        <p><strong>Object Creation:</strong> Objects are created using the <code>new</code> keyword, which allocates memory on the heap and calls the appropriate constructor to initialize the object.</p>

        <p><strong>Object Usage:</strong> Once created, objects can be used by calling their methods and accessing their properties. Objects can be stored in variables, passed as parameters, and returned from methods.</p>

        <p><strong>Garbage Collection:</strong> C# uses automatic garbage collection to reclaim memory from objects that are no longer referenced. This eliminates the need for manual memory management in most cases.</p>

        <h4>Best Practices for Class Design</h4>
        <p>Effective class design follows several key principles:</p>

        <p><strong>Single Responsibility Principle:</strong> Each class should have one reason to change. Classes should be focused on a single, well-defined responsibility.</p>

        <p><strong>Encapsulation:</strong> Hide internal implementation details and provide controlled access through public interfaces. Use private fields and public properties/methods.</p>

        <p><strong>Immutability:</strong> Consider making objects immutable when possible, especially for value-like objects. This reduces complexity and improves thread safety.</p>

        <p><strong>Validation:</strong> Validate input in constructors and property setters to ensure objects are always in a valid state.</p>
        
        <div class="interview-tip">
          <p><span class="interview-icon">🎯</span> <strong>Interview Focus:</strong> Be prepared to discuss the fundamental concepts of OOP and how they're implemented in C#.</p>
          <p>Common interview questions include:</p>
          <ul>
            <li>"What is the difference between a class and an object?"</li>
            <li>"Explain the concept of encapsulation and how C# implements it"</li>
            <li>"What are the benefits of using properties instead of public fields?"</li>
            <li>"How does garbage collection work in C#?"</li>
            <li>"What is the difference between value types and reference types in the context of objects?"</li>
          </ul>
        </div>
      `,
          codeExample: `// Defining and using a class in C#
public class Person
{
    public string Name { get; set; }
    public int Age { get; set; }

    public void Greet()
    {
        Console.WriteLine($"Hello, my name is {Name} and I am {Age} years old.");
    }
}

// Usage
Person alice = new Person { Name = "Alice", Age = 28 };
alice.Greet();`,
        },
      ],
      exercise: {
        instructions:
          'Define a class called Book with properties for Title, Author, and Year. Add a method to display book details. Create an object and call the method.',
      },
    },
    {
      title: 'Inheritance and Polymorphism',
      description: 'Learn how to create class hierarchies and use polymorphism for flexible code.',
      sections: [
        {
          title: 'Inheritance',
          explanation: `
        <p>Inheritance is one of the fundamental pillars of Object-Oriented Programming that enables code reuse and establishes relationships between classes. It allows a class (called the derived or child class) to inherit members from another class (called the base or parent class), creating a hierarchical relationship.</p>
        
        <h4>Understanding Inheritance</h4>
        <p>Inheritance models an "is-a" relationship between classes. For example, a Dog "is-a" Animal, a Car "is-a" Vehicle, and a Manager "is-a" Employee. This relationship allows derived classes to automatically acquire the properties and methods of their base class while adding their own unique characteristics.</p>

        <p>The inheritance relationship is established using the colon (<code>:</code>) syntax in C#. A class can inherit from only one base class (single inheritance), but can implement multiple interfaces.</p>

        <h4>Benefits of Inheritance</h4>
        <p>Inheritance provides several key benefits in software development:</p>

        <p><strong>Code Reuse:</strong> Common functionality can be defined once in a base class and reused by multiple derived classes, reducing code duplication.</p>

        <p><strong>Polymorphism:</strong> Derived classes can be treated as instances of their base class, enabling flexible and extensible code.</p>

        <p><strong>Maintainability:</strong> Changes to common functionality in the base class automatically propagate to all derived classes.</p>

        <p><strong>Extensibility:</strong> New derived classes can be added without modifying existing code, following the Open/Closed Principle.</p>

        <h4>Method Overriding and Virtual Methods</h4>
        <p>C# provides a sophisticated mechanism for method overriding that allows derived classes to provide their own implementation of base class methods:</p>

        <p><strong>Virtual Methods:</strong> Methods in the base class marked with the <code>virtual</code> keyword can be overridden by derived classes.</p>

        <p><strong>Override Methods:</strong> Derived classes use the <code>override</code> keyword to provide their own implementation of virtual methods.</p>

        <p><strong>Method Hiding:</strong> The <code>new</code> keyword can be used to hide base class methods without overriding them.</p>
        
        <div class="code-example">
          <pre><code>// Comprehensive inheritance example
public class Animal
{
    // Properties inherited by all derived classes
    public string Name { get; set; }
    public int Age { get; set; }
    public string Species { get; set; }
    
    // Constructor
    public Animal(string name, int age, string species)
    {
        Name = name;
        Age = age;
        Species = species;
    }
    
    // Virtual method that can be overridden
    public virtual void Speak()
    {
        Console.WriteLine($"{Name} makes a generic animal sound.");
    }
    
    // Method that can be overridden
    public virtual void Move()
    {
        Console.WriteLine($"{Name} moves in a generic way.");
    }
    
    // Method that cannot be overridden
    public void Sleep()
    {
        Console.WriteLine($"{Name} is sleeping.");
    }
    
    // Method that can be hidden (not overridden)
    public void Eat()
    {
        Console.WriteLine($"{Name} eats generic food.");
    }
    
    // Override ToString for better object representation
    public override string ToString()
    {
        return $"{Species}: {Name} (Age: {Age})";
    }
}

public class Dog : Animal
{
    // Additional properties specific to dogs
    public string Breed { get; set; }
    public bool IsGoodBoy { get; set; }
    
    // Constructor calls base constructor
    public Dog(string name, int age, string breed) 
        : base(name, age, "Dog")
    {
        Breed = breed;
        IsGoodBoy = true; // All dogs are good boys!
    }
    
    // Override virtual method
    public override void Speak()
    {
        Console.WriteLine($"{Name} barks: Woof! Woof!");
    }
    
    // Override another virtual method
    public override void Move()
    {
        Console.WriteLine($"{Name} runs on four legs.");
    }
    
    // Hide base class method (not override)
    public new void Eat()
    {
        Console.WriteLine($"{Name} eats dog food and treats.");
    }
    
    // Additional method specific to dogs
    public void Fetch()
    {
        Console.WriteLine($"{Name} fetches the ball!");
    }
    
    // Override ToString to include breed information
    public override string ToString()
    {
        return $"{base.ToString()} - Breed: {Breed}";
    }
}

public class Cat : Animal
{
    public bool IsIndoor { get; set; }
    
    public Cat(string name, int age, bool isIndoor) 
        : base(name, age, "Cat")
    {
        IsIndoor = isIndoor;
    }
    
    public override void Speak()
    {
        Console.WriteLine($"{Name} meows: Meow!");
    }
    
    public override void Move()
    {
        string movement = IsIndoor ? "walks gracefully indoors" : "roams outdoors";
        Console.WriteLine($"{Name} {movement}.");
    }
    
    // Additional method specific to cats
    public void Purr()
    {
        Console.WriteLine($"{Name} purrs contentedly.");
    }
}

// Using inheritance
Animal genericAnimal = new Animal("Generic", 5, "Unknown");
Dog myDog = new Dog("Buddy", 3, "Golden Retriever");
Cat myCat = new Cat("Whiskers", 2, true);

// Demonstrating inheritance behavior
Console.WriteLine("=== Animal Behavior ===");
genericAnimal.Speak();  // Virtual method call
genericAnimal.Move();   // Virtual method call
genericAnimal.Sleep();  // Non-virtual method call
genericAnimal.Eat();    // Method that can be hidden

Console.WriteLine("\\n=== Dog Behavior ===");
myDog.Speak();          // Overridden method
myDog.Move();           // Overridden method
myDog.Sleep();          // Inherited method
myDog.Eat();            // Hidden method (new)
myDog.Fetch();          // Dog-specific method

Console.WriteLine("\\n=== Cat Behavior ===");
myCat.Speak();          // Overridden method
myCat.Move();           // Overridden method
myCat.Purr();           // Cat-specific method

Console.WriteLine("\\n=== Polymorphism ===");
Animal[] animals = { genericAnimal, myDog, myCat };
foreach (var animal in animals)
{
    animal.Speak();  // Calls the appropriate override
}</code></pre>
        </div>
        
        <h4>Inheritance Hierarchies and Design Considerations</h4>
        <p>When designing inheritance hierarchies, several important considerations come into play:</p>

        <p><strong>Depth vs. Breadth:</strong> Deep inheritance hierarchies (many levels) can become complex and fragile. Shallow hierarchies with composition are often preferred.</p>

        <p><strong>Liskov Substitution Principle:</strong> Derived classes should be substitutable for their base classes without breaking the application. This means derived classes should honor the contract established by their base class.</p>

        <p><strong>Fragile Base Class Problem:</strong> Changes to base classes can break derived classes. This is why careful design and documentation are essential.</p>

        <p><strong>Composition over Inheritance:</strong> Sometimes it's better to compose objects rather than inherit from them, especially when the relationship isn't truly "is-a".</p>

        <h4>Sealed Classes and Methods</h4>
        <p>C# provides mechanisms to control inheritance:</p>

        <p><strong>Sealed Classes:</strong> Classes marked with <code>sealed</code> cannot be inherited from. This is useful for utility classes or when you want to prevent further inheritance.</p>

        <p><strong>Sealed Methods:</strong> Overridden methods can be marked as <code>sealed</code> to prevent further overriding in derived classes.</p>
        
        <div class="interview-tip">
          <p><span class="interview-icon">🎯</span> <strong>Interview Focus:</strong> Be prepared to discuss inheritance concepts and their implementation in C#.</p>
          <p>Common interview questions include:</p>
          <ul>
            <li>"What is the difference between virtual, override, and new keywords?"</li>
            <li>"Explain the Liskov Substitution Principle"</li>
            <li>"What are the benefits and drawbacks of inheritance?"</li>
            <li>"When would you use composition instead of inheritance?"</li>
            <li>"What is the fragile base class problem?"</li>
          </ul>
        </div>
      `,
          codeExample: `// Inheritance and method overriding
public class Vehicle
{
    public virtual void Start() => Console.WriteLine("Vehicle starting...");
}

public class Motorcycle : Vehicle
{
    public override void Start() => Console.WriteLine("Motorcycle roaring to life!");
}`,
        },
        {
          title: 'Polymorphism',
          explanation: `
        <p>Polymorphism, derived from the Greek words "poly" (many) and "morph" (form), is a fundamental concept in Object-Oriented Programming that allows objects of different types to be treated as objects of a common base type. This enables you to write code that works with objects at an abstract level, making your code more flexible, extensible, and maintainable.</p>
        
        <h4>Types of Polymorphism in C#</h4>
        <p>C# supports several forms of polymorphism, each serving different purposes in software design:</p>

        <p><strong>Compile-time Polymorphism (Method Overloading):</strong> Multiple methods with the same name but different parameters in the same class. The compiler determines which method to call based on the arguments provided.</p>

        <p><strong>Runtime Polymorphism (Method Overriding):</strong> Derived classes provide their own implementation of methods defined in the base class. The actual method called is determined at runtime based on the object's actual type.</p>

        <p><strong>Interface Polymorphism:</strong> Objects can be treated as instances of interfaces they implement, allowing for flexible and loosely coupled code.</p>

        <h4>Runtime Polymorphism in Action</h4>
        <p>Runtime polymorphism is the most powerful form of polymorphism in C#. It allows you to write code that works with base class references but executes derived class implementations:</p>
        
        <div class="code-example">
          <pre><code>// Demonstrating runtime polymorphism
public class Shape
{
    public virtual double CalculateArea()
    {
        return 0; // Base implementation
    }
    
    public virtual void Draw()
    {
        Console.WriteLine("Drawing a generic shape");
    }
}

public class Circle : Shape
{
    public double Radius { get; set; }
    
    public Circle(double radius)
    {
        Radius = radius;
    }
    
    public override double CalculateArea()
    {
        return Math.PI * Radius * Radius;
    }
    
    public override void Draw()
    {
        Console.WriteLine($"Drawing a circle with radius {Radius}");
    }
}

public class Rectangle : Shape
{
    public double Width { get; set; }
    public double Height { get; set; }
    
    public Rectangle(double width, double height)
    {
        Width = width;
        Height = height;
    }
    
    public override double CalculateArea()
    {
        return Width * Height;
    }
    
    public override void Draw()
    {
        Console.WriteLine($"Drawing a rectangle {Width}x{Height}");
    }
}

public class Triangle : Shape
{
    public double Base { get; set; }
    public double Height { get; set; }
    
    public Triangle(double baseLength, double height)
    {
        Base = baseLength;
        Height = height;
    }
    
    public override double CalculateArea()
    {
        return 0.5 * Base * Height;
    }
    
    public override void Draw()
    {
        Console.WriteLine($"Drawing a triangle with base {Base} and height {Height}");
    }
}

// Polymorphic behavior demonstration
public class ShapeProcessor
{
    public void ProcessShapes(List<Shape> shapes)
    {
        Console.WriteLine("=== Processing Shapes ===");
        
        foreach (var shape in shapes)
        {
            // Polymorphic method calls - actual implementation determined at runtime
            shape.Draw();
            double area = shape.CalculateArea();
            Console.WriteLine($"Area: {area:F2}");
            Console.WriteLine();
        }
    }
    
    public double CalculateTotalArea(List<Shape> shapes)
    {
        return shapes.Sum(shape => shape.CalculateArea());
    }
    
    public void DrawAllShapes(List<Shape> shapes)
    {
        Console.WriteLine("Drawing all shapes:");
        foreach (var shape in shapes)
        {
            shape.Draw(); // Polymorphic call
        }
    }
}

// Using polymorphism
var shapes = new List<Shape>
{
    new Circle(5),
    new Rectangle(4, 6),
    new Triangle(3, 4),
    new Circle(2.5)
};

var processor = new ShapeProcessor();
processor.ProcessShapes(shapes);

double totalArea = processor.CalculateTotalArea(shapes);
Console.WriteLine($"Total area of all shapes: {totalArea:F2}");

// Demonstrating the power of polymorphism
Console.WriteLine("\\n=== Polymorphism Benefits ===");
Console.WriteLine("1. Code works with base class references");
Console.WriteLine("2. New derived classes can be added without changing existing code");
Console.WriteLine("3. Runtime behavior is determined by actual object type");
Console.WriteLine("4. Enables loose coupling and high cohesion");</code></pre>
        </div>
        
        <h4>Polymorphism in Real-World Scenarios</h4>
        <p>Polymorphism is extensively used in real-world applications:</p>

        <p><strong>Plugin Architectures:</strong> Applications can load and use different plugins through a common interface, without knowing the specific implementation details.</p>

        <p><strong>Database Access:</strong> Code can work with different database providers (SQL Server, MySQL, PostgreSQL) through a common interface.</p>

        <p><strong>UI Frameworks:</strong> Different UI controls (buttons, text boxes, lists) can be treated uniformly through a common base class.</p>

        <p><strong>Payment Processing:</strong> Different payment methods (credit card, PayPal, bank transfer) can be processed through a common payment interface.</p>

        <h4>Polymorphism and Design Patterns</h4>
        <p>Polymorphism is fundamental to many design patterns:</p>

        <p><strong>Strategy Pattern:</strong> Different algorithms can be selected at runtime through a common interface.</p>

        <p><strong>Factory Pattern:</strong> Objects are created through a common factory interface, hiding the specific implementation details.</p>

        <p><strong>Observer Pattern:</strong> Different observers can be notified of events through a common interface.</p>

        <p><strong>Command Pattern:</strong> Different commands can be executed through a common interface.</p>
        
        <div class="interview-tip">
          <p><span class="interview-icon">🎯</span> <strong>Interview Focus:</strong> Be prepared to discuss polymorphism concepts and their practical applications.</p>
          <p>Common interview questions include:</p>
          <ul>
            <li>"What is the difference between compile-time and runtime polymorphism?"</li>
            <li>"How does polymorphism enable loose coupling?"</li>
            <li>"Can you give an example of polymorphism in a real-world scenario?"</li>
            <li>"What are the benefits of using polymorphism in software design?"</li>
            <li>"How does polymorphism relate to the Open/Closed Principle?"</li>
          </ul>
        </div>
      `,
          codeExample: `// Polymorphism in action
public class Cat : Animal
{
    public override void Speak() => Console.WriteLine("Meow!");
}`,
        },
      ],
      exercise: {
        instructions:
          'Create a base class Shape with a virtual method Draw(). Derive classes Circle and Square that override Draw(). Demonstrate polymorphism by storing them in a list and calling Draw().',
      },
    },
    {
      title: 'Interfaces and Abstract Classes',
      description:
        'Understand the difference between interfaces and abstract classes, and when to use each.',
      sections: [
        {
          title: 'Interfaces',
          explanation: `
        <p>Interfaces are one of the most powerful abstraction mechanisms in C#. They define a contract that implementing classes must fulfill, enabling loose coupling and promoting code that depends on abstractions rather than concrete implementations.</p>
        
        <h4>Understanding Interfaces</h4>
        <p>An <strong>interface</strong> is a reference type that defines a set of members (methods, properties, events, indexers) that implementing classes must provide. Unlike classes, interfaces cannot contain implementation - they only declare what must be implemented.</p>

        <p>Interfaces enable polymorphism and allow you to write code that works with objects through their interface rather than their concrete type. This promotes loose coupling and makes your code more flexible and testable.</p>

        <h4>Interface Design Principles</h4>
        <p>Effective interface design follows several key principles:</p>

        <p><strong>Interface Segregation Principle:</strong> Clients should not be forced to depend on interfaces they don't use. Keep interfaces focused and cohesive.</p>

        <p><strong>Dependency Inversion Principle:</strong> High-level modules should not depend on low-level modules. Both should depend on abstractions.</p>

        <p><strong>Single Responsibility:</strong> Each interface should have a single, well-defined purpose.</p>
        
        <div class="code-example">
          <pre><code>// Well-designed interfaces following SOLID principles
public interface ILogger
{
    void Log(string message);
    void LogError(string error);
}

public interface IEmailSender
{
    void SendEmail(string to, string subject, string body);
}

public interface IUserRepository
{
    User GetById(int id);
    void Save(User user);
    void Delete(int id);
}

// Classes implementing multiple interfaces
public class EmailService : IEmailSender, ILogger
{
    public void SendEmail(string to, string subject, string body)
    {
        Log($"Sending email to {to}: {subject}");
        // Email sending implementation
        Console.WriteLine($"Email sent to {to}");
    }
    
    public void Log(string message)
    {
        Console.WriteLine($"[INFO] {DateTime.Now}: {message}");
    }
    
    public void LogError(string error)
    {
        Console.WriteLine($"[ERROR] {DateTime.Now}: {error}");
    }
}

public class UserService
{
    private readonly IUserRepository _repository;
    private readonly IEmailSender _emailSender;
    
    // Dependency injection through interfaces
    public UserService(IUserRepository repository, IEmailSender emailSender)
    {
        _repository = repository;
        _emailSender = emailSender;
    }
    
    public void CreateUser(string name, string email)
    {
        var user = new User { Name = name, Email = email };
        _repository.Save(user);
        _emailSender.SendEmail(email, "Welcome!", "Your account has been created.");
    }
}</code></pre>
        </div>
        
        <div class="interview-tip">
          <p><span class="interview-icon">🎯</span> <strong>Interview Focus:</strong> Be prepared to discuss interface design and their role in SOLID principles.</p>
          <p>Common questions: "When would you use an interface vs. abstract class?", "How do interfaces enable loose coupling?", "What is the Interface Segregation Principle?"</p>
        </div>
      `,
          codeExample: `// Implementing an interface
public interface IPrintable
{
    void Print();
}

public class Document : IPrintable
{
    public void Print() => Console.WriteLine("Printing document...");
}`,
        },
        {
          title: 'Abstract Classes',
          explanation: `
        <p>Abstract classes provide a middle ground between interfaces and concrete classes. They can contain both abstract members (that must be implemented by derived classes) and concrete members (with default implementation).</p>
        
        <h4>When to Use Abstract Classes</h4>
        <p>Abstract classes are ideal when you have a base class that provides common functionality but also requires derived classes to implement specific behavior. They're perfect for creating a template that derived classes can extend.</p>

        <p><strong>Key characteristics:</strong></p>
        <ul>
          <li>Cannot be instantiated directly</li>
          <li>Can contain abstract and concrete members</li>
          <li>Can have constructors, fields, and properties</li>
          <li>Support single inheritance only</li>
        </ul>
        
        <div class="code-example">
          <pre><code>// Abstract class with shared functionality
public abstract class PaymentProcessor
{
    // Concrete properties
    public string ProcessorName { get; protected set; }
    public decimal ProcessingFee { get; protected set; }
    
    // Abstract method - must be implemented by derived classes
    public abstract bool ProcessPayment(decimal amount, string cardNumber);
    
    // Virtual method - can be overridden by derived classes
    public virtual void ValidateCard(string cardNumber)
    {
        if (string.IsNullOrEmpty(cardNumber) || cardNumber.Length != 16)
            throw new ArgumentException("Invalid card number");
    }
    
    // Concrete method - shared implementation
    public void LogTransaction(decimal amount, bool success)
    {
        Console.WriteLine($"[{ProcessorName}] Transaction: \${amount}, Success: {success}");
    }
    
    // Abstract property
    public abstract string SupportedCardTypes { get; }
}

public class CreditCardProcessor : PaymentProcessor
{
    public CreditCardProcessor()
    {
        ProcessorName = "Credit Card Processor";
        ProcessingFee = 0.025m; // 2.5% fee
    }
    
    public override bool ProcessPayment(decimal amount, string cardNumber)
    {
        ValidateCard(cardNumber);
        
        // Simulate payment processing
        bool success = new Random().Next(100) > 10; // 90% success rate
        
        decimal totalAmount = amount + (amount * ProcessingFee);
        LogTransaction(totalAmount, success);
        
        return success;
    }
    
    public override string SupportedCardTypes => "Visa, MasterCard, American Express";
}

public class PayPalProcessor : PaymentProcessor
{
    public PayPalProcessor()
    {
        ProcessorName = "PayPal Processor";
        ProcessingFee = 0.029m; // 2.9% fee
    }
    
    public override bool ProcessPayment(decimal amount, string cardNumber)
    {
        // PayPal doesn't need card validation in the same way
        bool success = new Random().Next(100) > 5; // 95% success rate
        
        decimal totalAmount = amount + (amount * ProcessingFee);
        LogTransaction(totalAmount, success);
        
        return success;
    }
    
    public override string SupportedCardTypes => "PayPal, Credit Cards";
    
    // Override the validation method for PayPal
    public override void ValidateCard(string cardNumber)
    {
        // PayPal has different validation rules
        if (string.IsNullOrEmpty(cardNumber))
            throw new ArgumentException("PayPal account required");
    }
}</code></pre>
        </div>
        
        <div class="interview-tip">
          <p><span class="interview-icon">🎯</span> <strong>Interview Focus:</strong> Understand when to choose abstract classes over interfaces.</p>
          <p>Key question: "When would you use an abstract class instead of an interface?"</p>
        </div>
      `,
          codeExample: `// Abstract class example
public abstract class Animal
{
    public abstract void Speak();
}

public class Cow : Animal
{
    public override void Speak() => Console.WriteLine("Moo!");
}`,
        },
      ],
      exercise: {
        instructions:
          'Define an interface IPlayable with a method Play(). Create two classes, Guitar and Piano, that implement IPlayable. Demonstrate calling Play() on both.',
      },
    },
    {
      title: 'Encapsulation and Access Modifiers',
      description:
        'Learn how to protect data and control access using encapsulation and access modifiers.',
      sections: [
        {
          title: 'Encapsulation',
          explanation: `
        <p>Encapsulation is one of the fundamental principles of Object-Oriented Programming that bundles data and the methods that operate on that data within a single unit (class), while hiding the internal state and requiring all interaction to go through well-defined interfaces.</p>
        
        <h4>Benefits of Encapsulation</h4>
        <p>Encapsulation provides several key benefits:</p>

        <p><strong>Data Protection:</strong> Internal state is protected from external modification, preventing invalid states and ensuring data integrity.</p>

        <p><strong>Implementation Hiding:</strong> The internal implementation can be changed without affecting code that uses the class.</p>

        <p><strong>Controlled Access:</strong> Access to data is controlled through properties and methods, allowing validation and business logic.</p>

        <p><strong>Maintainability:</strong> Changes to internal implementation don't break external code that depends on the public interface.</p>
        
        <div class="code-example">
          <pre><code>// Well-encapsulated class example
public class Student
{
    // Private fields - internal state
    private string _name;
    private int _age;
    private List<Grade> _grades;
    private readonly string _studentId;
    
    // Constructor with validation
    public Student(string name, int age, string studentId)
    {
        if (string.IsNullOrWhiteSpace(name))
            throw new ArgumentException("Name cannot be empty");
            
        if (age < 0 || age > 120)
            throw new ArgumentException("Invalid age");
            
        _name = name;
        _age = age;
        _studentId = studentId;
        _grades = new List<Grade>();
    }
    
    // Properties with controlled access
    public string Name 
    { 
        get => _name;
        set 
        {
            if (string.IsNullOrWhiteSpace(value))
                throw new ArgumentException("Name cannot be empty");
            _name = value;
        }
    }
    
    public int Age 
    { 
        get => _age;
        set 
        {
            if (value < 0 || value > 120)
                throw new ArgumentException("Invalid age");
            _age = value;
        }
    }
    
    // Read-only property
    public string StudentId => _studentId;
    
    // Property with computed value
    public double GPA 
    { 
        get 
        {
            if (_grades.Count == 0) return 0.0;
            return _grades.Average(g => g.NumericValue);
        }
    }
    
    // Method to add grades with validation
    public void AddGrade(string subject, double score)
    {
        if (score < 0 || score > 100)
            throw new ArgumentException("Score must be between 0 and 100");
            
        _grades.Add(new Grade(subject, score));
    }
    
    // Method to get grades (returns copy to prevent external modification)
    public IReadOnlyList<Grade> GetGrades()
    {
        return _grades.AsReadOnly();
    }
    
    // Internal method for grade calculation
    private double CalculateGradePoint(double score)
    {
        if (score >= 90) return 4.0;
        if (score >= 80) return 3.0;
        if (score >= 70) return 2.0;
        if (score >= 60) return 1.0;
        return 0.0;
    }
}

public class Grade
{
    public string Subject { get; }
    public double Score { get; }
    public double NumericValue { get; }
    
    public Grade(string subject, double score)
    {
        Subject = subject;
        Score = score;
        NumericValue = CalculateGradePoint(score);
    }
    
    private double CalculateGradePoint(double score)
    {
        if (score >= 90) return 4.0;
        if (score >= 80) return 3.0;
        if (score >= 70) return 2.0;
        if (score >= 60) return 1.0;
        return 0.0;
    }
}</code></pre>
        </div>
        
        <div class="interview-tip">
          <p><span class="interview-icon">🎯</span> <strong>Interview Focus:</strong> Be prepared to discuss encapsulation benefits and implementation.</p>
          <p>Common questions: "Why is encapsulation important?", "How do you implement encapsulation in C#?", "What are the benefits of using properties over public fields?"</p>
        </div>
      `,
          codeExample: `// Encapsulation with private fields and public methods
public class User
{
    private string password;
    public void SetPassword(string pwd) => password = pwd;
    public bool CheckPassword(string pwd) => password == pwd;
}`,
        },
        {
          title: 'Access Modifiers',
          explanation: `
            <p>C# provides several access modifiers:</p>
            <ul>
              <li><code>public</code>: Accessible from anywhere</li>
              <li><code>private</code>: Accessible only within the containing class</li>
              <li><code>protected</code>: Accessible within the class and derived classes</li>
              <li><code>internal</code>: Accessible within the same assembly</li>
              <li><code>protected internal</code>: Accessible within the same assembly or derived classes</li>
              <li><code>private protected</code>: Accessible within the containing class or derived classes in the same assembly</li>
            </ul>
          `,
          codeExample: `// Access modifier examples
public class Example
{
    public int PublicValue;
    private int PrivateValue;
    protected int ProtectedValue;
    internal int InternalValue;
    protected internal int ProtectedInternalValue;
    private protected int PrivateProtectedValue;
}`,
        },
      ],
      exercise: {
        instructions:
          'Create a class Employee with private fields for name and salary. Provide public methods to set and get these values, ensuring salary cannot be set to a negative number.',
      },
    },
    {
      title: 'Properties and Indexers',
      description: 'Explore how to use properties and indexers for controlled access to data.',
      sections: [
        {
          title: 'Properties',
          explanation: `
        <p>Properties are a fundamental feature in C# that provide controlled access to class fields. They combine the convenience of field access with the power of method execution, allowing you to add validation, computation, and other logic when getting or setting values.</p>
        
        <h4>Property Types and Use Cases</h4>
        <p>C# supports several types of properties, each serving different purposes:</p>

        <p><strong>Auto-implemented properties:</strong> Simple properties where the compiler generates the backing field automatically.</p>

        <p><strong>Full properties:</strong> Properties with custom get and set accessors for validation or computation.</p>

        <p><strong>Read-only properties:</strong> Properties that can only be read, not modified after initialization.</p>

        <p><strong>Computed properties:</strong> Properties that calculate their value based on other data.</p>
        
        <div class="code-example">
          <pre><code>// Comprehensive property examples
public class Product
{
    // Auto-implemented properties
    public string Name { get; set; }
    public decimal Price { get; set; }
    
    // Full property with validation
    private int _stockQuantity;
    public int StockQuantity
    {
        get => _stockQuantity;
        set
        {
            if (value < 0)
                throw new ArgumentException("Stock quantity cannot be negative");
            _stockQuantity = value;
        }
    }
    
    // Read-only property
    public string ProductId { get; }
    
    // Computed property
    public bool IsInStock => StockQuantity > 0;
    
    // Property with different access levels
    public string Description { get; private set; }
    
    // Property with backing field and validation
    private decimal _discountPercentage;
    public decimal DiscountPercentage
    {
        get => _discountPercentage;
        set
        {
            if (value < 0 || value > 100)
                throw new ArgumentException("Discount must be between 0 and 100");
            _discountPercentage = value;
        }
    }
    
    // Computed property based on other properties
    public decimal FinalPrice => Price * (1 - DiscountPercentage / 100);
    
    // Property with complex logic
    public string Status
    {
        get
        {
            if (StockQuantity == 0) return "Out of Stock";
            if (StockQuantity < 10) return "Low Stock";
            return "In Stock";
        }
    }
    
    public Product(string name, decimal price, string productId)
    {
        Name = name;
        Price = price;
        ProductId = productId; // Read-only property set in constructor
        StockQuantity = 0;
        DiscountPercentage = 0;
    }
    
    public void SetDescription(string description)
    {
        Description = description; // Can only be set through method
    }
}</code></pre>
        </div>
        
        <div class="interview-tip">
          <p><span class="interview-icon">🎯</span> <strong>Interview Focus:</strong> Understand property types and when to use each.</p>
          <p>Common questions: "What's the difference between auto-implemented and full properties?", "When would you use a read-only property?", "How do properties enable encapsulation?"</p>
        </div>
      `,
          codeExample: `// Auto-implemented property
public class Product
{
    public string Name { get; set; }
    public decimal Price { get; set; }
}`,
        },
        {
          title: 'Indexers',
          explanation: `
        <p>Indexers allow objects to be indexed like arrays, providing a natural syntax for accessing elements in custom collections. They enable you to create classes that behave like built-in collection types.</p>
        
        <h4>Indexer Syntax and Usage</h4>
        <p>Indexers use the <code>this</code> keyword with square brackets to define how objects can be accessed using index notation. They can have multiple parameters and different types.</p>

        <p><strong>Key features:</strong></p>
        <ul>
          <li>Use <code>this[parameters]</code> syntax</li>
          <li>Can have get and set accessors</li>
          <li>Support multiple parameters</li>
          <li>Can be overloaded with different parameter types</li>
        </ul>
        
        <div class="code-example">
          <pre><code>// Comprehensive indexer examples
public class Matrix
{
    private int[,] _data;
    private int _rows;
    private int _cols;
    
    public Matrix(int rows, int cols)
    {
        _rows = rows;
        _cols = cols;
        _data = new int[rows, cols];
    }
    
    // 2D indexer
    public int this[int row, int col]
    {
        get
        {
            if (row < 0 || row >= _rows || col < 0 || col >= _cols)
                throw new IndexOutOfRangeException("Matrix index out of range");
            return _data[row, col];
        }
        set
        {
            if (row < 0 || row >= _rows || col < 0 || col >= _cols)
                throw new IndexOutOfRangeException("Matrix index out of range");
            _data[row, col] = value;
        }
    }
    
    // 1D indexer (flattens the matrix)
    public int this[int index]
    {
        get
        {
            if (index < 0 || index >= _rows * _cols)
                throw new IndexOutOfRangeException("Matrix index out of range");
            int row = index / _cols;
            int col = index % _cols;
            return _data[row, col];
        }
        set
        {
            if (index < 0 || index >= _rows * _cols)
                throw new IndexOutOfRangeException("Matrix index out of range");
            int row = index / _cols;
            int col = index % _cols;
            _data[row, col] = value;
        }
    }
}

public class Dictionary<TKey, TValue>
{
    private List<KeyValuePair<TKey, TValue>> _items = new List<KeyValuePair<TKey, TValue>>();
    
    // Indexer using key
    public TValue this[TKey key]
    {
        get
        {
            var item = _items.FirstOrDefault(x => x.Key.Equals(key));
            if (item.Key == null)
                throw new KeyNotFoundException($"Key '{key}' not found");
            return item.Value;
        }
        set
        {
            var existingIndex = _items.FindIndex(x => x.Key.Equals(key));
            if (existingIndex >= 0)
                _items[existingIndex] = new KeyValuePair<TKey, TValue>(key, value);
            else
                _items.Add(new KeyValuePair<TKey, TValue>(key, value));
        }
    }
    
    // Indexer using integer index
    public KeyValuePair<TKey, TValue> this[int index]
    {
        get
        {
            if (index < 0 || index >= _items.Count)
                throw new IndexOutOfRangeException("Index out of range");
            return _items[index];
        }
    }
    
    public int Count => _items.Count;
}

// Using the indexers
var matrix = new Matrix(3, 3);
matrix[0, 0] = 1;  // 2D indexing
matrix[1, 1] = 5;
matrix[4] = 9;     // 1D indexing (flattened)

var dict = new Dictionary<string, int>();
dict["apple"] = 5;     // Key-based indexing
dict["banana"] = 3;
Console.WriteLine(dict["apple"]);  // Output: 5</code></pre>
        </div>
        
        <div class="interview-tip">
          <p><span class="interview-icon">🎯</span> <strong>Interview Focus:</strong> Understand when and how to use indexers.</p>
          <p>Common questions: "When would you use an indexer?", "How do indexers differ from properties?", "Can you create an indexer with multiple parameters?"</p>
        </div>
      `,
          codeExample: `// Using an indexer
StringCollection sc = new StringCollection();
sc[0] = "Hello";
Console.WriteLine(sc[0]);`,
        },
      ],
      exercise: {
        instructions:
          'Create a class Library with a private array of Book objects. Implement an indexer to access books by index.',
      },
    },
    {
      title: 'Method Overloading and Overriding',
      description: 'Learn the difference between overloading and overriding methods in C#.',
      sections: [
        {
          title: 'Method Overloading',
          explanation: `
        <p>Method overloading allows you to define multiple methods with the same name but different parameters within the same class. This provides a clean, intuitive API while allowing different implementations for different parameter types or counts.</p>
        
        <h4>Overloading Rules</h4>
        <p>For methods to be overloaded, they must differ in:</p>
        <ul>
          <li>Number of parameters</li>
          <li>Types of parameters</li>
          <li>Parameter order (though this is not recommended for clarity)</li>
        </ul>
        
        <p><strong>Note:</strong> Return type alone is not sufficient for overloading. The compiler must be able to distinguish between overloads based on the parameters.</p>
        
        <div class="code-example">
          <pre><code>// Comprehensive method overloading example
public class MathOperations
{
    // Overload by parameter count
    public int Add(int a, int b) => a + b;
    public int Add(int a, int b, int c) => a + b + c;
    
    // Overload by parameter types
    public double Add(double a, double b) => a + b;
    public decimal Add(decimal a, decimal b) => a + b;
    
    // Overload with different parameter combinations
    public string Add(string a, string b) => a + b;
    public string Add(string a, int b) => a + b.ToString();
    public string Add(int a, string b) => a.ToString() + b;
    
    // Overload with optional parameters (C# 4.0+)
    public int Multiply(int a, int b, int c = 1) => a * b * c;
    
    // Overload with params keyword
    public int Sum(params int[] numbers) => numbers.Sum();
    
    // Overload with different parameter types and validation
    public double Divide(double a, double b)
    {
        if (b == 0) throw new DivideByZeroException();
        return a / b;
    }
    
    public decimal Divide(decimal a, decimal b)
    {
        if (b == 0) throw new DivideByZeroException();
        return a / b;
    }
    
    // Overload with nullable types
    public int? Add(int? a, int? b)
    {
        if (!a.HasValue || !b.HasValue) return null;
        return a.Value + b.Value;
    }
}

// Using overloaded methods
var math = new MathOperations();

Console.WriteLine(math.Add(5, 3));           // int overload
Console.WriteLine(math.Add(5.5, 3.2));       // double overload
Console.WriteLine(math.Add("Hello", "World")); // string overload
Console.WriteLine(math.Add(5, 3, 2));        // three parameters
Console.WriteLine(math.Sum(1, 2, 3, 4, 5));  // params overload</code></pre>
        </div>
        
        <div class="interview-tip">
          <p><span class="interview-icon">🎯</span> <strong>Interview Focus:</strong> Understand overloading rules and best practices.</p>
          <p>Common questions: "What are the rules for method overloading?", "Can you overload based on return type alone?", "What's the difference between overloading and overriding?"</p>
        </div>
      `,
          codeExample: `// Method overloading example
public class Printer
{
    public void Print(string s) => Console.WriteLine(s);
    public void Print(int n) => Console.WriteLine(n);
}`,
        },
        {
          title: 'Method Overriding',
          explanation: `
        <p>Method overriding allows derived classes to provide their own implementation of methods defined in the base class. This is a key mechanism for achieving runtime polymorphism in C#.</p>
        
        <h4>Overriding Rules and Keywords</h4>
        <p>For method overriding to work properly, several rules must be followed:</p>

        <p><strong>virtual keyword:</strong> Base class methods must be marked as <code>virtual</code> to allow overriding.</p>

        <p><strong>override keyword:</strong> Derived class methods must use <code>override</code> to indicate they're overriding a base method.</p>

        <p><strong>Signature matching:</strong> The overriding method must have the same signature as the virtual method.</p>

        <p><strong>Access level:</strong> The overriding method cannot have a more restrictive access level than the virtual method.</p>
        
        <div class="code-example">
          <pre><code>// Comprehensive method overriding example
public class Vehicle
{
    public virtual void Start() => Console.WriteLine("Vehicle starting...");
    public virtual void Stop() => Console.WriteLine("Vehicle stopping...");
    public virtual string GetInfo() => "Generic vehicle";
    
    // Method that cannot be overridden
    public void Honk() => Console.WriteLine("Honk honk!");
    
    // Virtual method with parameters
    public virtual void Accelerate(int speed)
    {
        Console.WriteLine($"Accelerating to {speed} km/h");
    }
}

public class Car : Vehicle
{
    public override void Start()
    {
        Console.WriteLine("Car engine starting with key ignition");
    }
    
    public override void Stop()
    {
        Console.WriteLine("Car braking to a stop");
    }
    
    public override string GetInfo() => "Four-wheeled passenger vehicle";
    
    // Override with additional logic
    public override void Accelerate(int speed)
    {
        if (speed > 200)
            Console.WriteLine("Warning: Speed limit exceeded!");
        base.Accelerate(speed); // Call base implementation
    }
}

public class Motorcycle : Vehicle
{
    public override void Start()
    {
        Console.WriteLine("Motorcycle starting with kick start");
    }
    
    public override void Stop()
    {
        Console.WriteLine("Motorcycle stopping with hand brake");
    }
    
    public override string GetInfo() => "Two-wheeled motorized vehicle";
    
    // Override with different behavior
    public override void Accelerate(int speed)
    {
        Console.WriteLine($"Motorcycle accelerating to {speed} km/h with engine roar!");
    }
}

// Demonstrating polymorphism through overriding
Vehicle[] vehicles = { new Vehicle(), new Car(), new Motorcycle() };

foreach (var vehicle in vehicles)
{
    Console.WriteLine($"\\n{vehicle.GetInfo()}:");
    vehicle.Start();
    vehicle.Accelerate(100);
    vehicle.Stop();
}</code></pre>
        </div>
        
        <div class="interview-tip">
          <p><span class="interview-icon">🎯</span> <strong>Interview Focus:</strong> Understand the difference between overloading and overriding.</p>
          <p>Common questions: "What's the difference between virtual and override keywords?", "Can you override a non-virtual method?", "How does overriding enable polymorphism?"</p>
        </div>
      `,
          codeExample: `// Overriding example
public class Bird : Animal
{
    public override void Speak() => Console.WriteLine("Tweet!");
}`,
        },
      ],
      exercise: {
        instructions:
          'Create a class MathOps with overloaded methods Multiply(int, int) and Multiply(double, double). Then create a base class Animal with a virtual method Speak(), and a derived class Parrot that overrides Speak().',
      },
    },
    {
      title: 'Constructors and Destructors',
      description:
        'Understand how to initialize and clean up objects using constructors and destructors.',
      sections: [
        {
          title: 'Constructors',
          explanation: `
        <p>Constructors are special methods that are automatically called when an object is created. They ensure that objects are properly initialized and start in a valid state.</p>
        
        <h4>Constructor Types</h4>
        <p>C# supports several types of constructors:</p>

        <p><strong>Instance constructors:</strong> Initialize instance members and are called when creating new objects.</p>

        <p><strong>Static constructors:</strong> Initialize static members and are called once before the first use of the class.</p>

        <p><strong>Private constructors:</strong> Used for singleton patterns or to prevent direct instantiation.</p>

        <p><strong>Copy constructors:</strong> Create a new object as a copy of an existing object.</p>
        
        <div class="code-example">
          <pre><code>// Comprehensive constructor examples
public class DatabaseConnection
{
    // Static field and constructor
    private static int _connectionCount = 0;
    private static readonly object _lock = new object();
    
    static DatabaseConnection()
    {
        Console.WriteLine("DatabaseConnection class initialized");
    }
    
    // Instance fields
    private string _connectionString;
    private bool _isConnected;
    private readonly int _connectionId;
    
    // Default constructor
    public DatabaseConnection()
    {
        _connectionId = ++_connectionCount;
        _connectionString = "Default connection string";
        Console.WriteLine($"Database connection {_connectionId} created with default settings");
    }
    
    // Parameterized constructor
    public DatabaseConnection(string connectionString)
    {
        if (string.IsNullOrEmpty(connectionString))
            throw new ArgumentException("Connection string cannot be null or empty");
            
        _connectionId = ++_connectionCount;
        _connectionString = connectionString;
        _isConnected = false;
        Console.WriteLine($"Database connection {_connectionId} created with custom connection string");
    }
    
    // Constructor with multiple parameters
    public DatabaseConnection(string server, string database, string username, string password)
    {
        _connectionId = ++_connectionCount;
        _connectionString = $"Server={server};Database={database};User Id={username};Password={password}";
        _isConnected = false;
        Console.WriteLine($"Database connection {_connectionId} created for {database} on {server}");
    }
    
    // Copy constructor
    public DatabaseConnection(DatabaseConnection other)
    {
        _connectionId = ++_connectionCount;
        _connectionString = other._connectionString;
        _isConnected = false; // New connection starts disconnected
        Console.WriteLine($"Database connection {_connectionId} copied from connection {other._connectionId}");
    }
    
    // Properties
    public int ConnectionId => _connectionId;
    public bool IsConnected => _isConnected;
    
    // Methods
    public void Connect()
    {
        if (_isConnected)
        {
            Console.WriteLine($"Connection {_connectionId} is already connected");
            return;
        }
        
        Console.WriteLine($"Connecting to database using connection {_connectionId}...");
        _isConnected = true;
    }
    
    public void Disconnect()
    {
        if (!_isConnected)
        {
            Console.WriteLine($"Connection {_connectionId} is already disconnected");
            return;
        }
        
        Console.WriteLine($"Disconnecting from database using connection {_connectionId}...");
        _isConnected = false;
    }
}

// Singleton pattern with private constructor
public class Logger
{
    private static Logger _instance;
    private static readonly object _lock = new object();
    
    private Logger()
    {
        Console.WriteLine("Logger instance created");
    }
    
    public static Logger Instance
    {
        get
        {
            if (_instance == null)
            {
                lock (_lock)
                {
                    if (_instance == null)
                        _instance = new Logger();
                }
            }
            return _instance;
        }
    }
    
    public void Log(string message)
    {
        Console.WriteLine($"[LOG] {DateTime.Now}: {message}");
    }
}</code></pre>
        </div>
        
        <div class="interview-tip">
          <p><span class="interview-icon">🎯</span> <strong>Interview Focus:</strong> Understand constructor types and their use cases.</p>
          <p>Common questions: "What is the difference between static and instance constructors?", "When would you use a private constructor?", "How do you implement a singleton pattern?"</p>
        </div>
      `,
          codeExample: `// Constructor example
public class Timer
{
    public DateTime StartTime { get; }
    public Timer() => StartTime = DateTime.Now;
}`,
        },
        {
          title: 'Destructors',
          explanation: `
            <p><strong>Destructors</strong> (~ClassName) are called by the garbage collector before the object is destroyed. Use them to release unmanaged resources. In most cases, prefer <code>IDisposable</code> and the <code>Dispose</code> pattern.</p>
            <div class="code-example">
              <pre><code>public class ResourceHolder
{
    ~ResourceHolder()
    {
        // Cleanup code
    }
}</code></pre>
            </div>
          `,
          codeExample: `// Destructor example
public class FileHandler
{
    ~FileHandler() { /* Cleanup */ }
}`,
        },
      ],
      exercise: {
        instructions:
          'Create a class Stopwatch with a constructor that sets the start time and a destructor that prints a message when the object is destroyed.',
      },
    },
    {
      title: 'Static Classes and Members',
      description:
        'Learn how to use static classes and members for shared data and utility methods.',
      sections: [
        {
          title: 'Static Members',
          explanation: `
        <p>Static members belong to the type itself rather than any specific instance of the type. They are shared across all instances of the class and can be accessed without creating an object.</p>
        
        <h4>Static Member Types</h4>
        <p>C# supports several types of static members:</p>

        <p><strong>Static fields:</strong> Shared data that belongs to the type, not instances.</p>

        <p><strong>Static properties:</strong> Controlled access to static data with get/set logic.</p>

        <p><strong>Static methods:</strong> Utility functions that don't depend on instance state.</p>

        <p><strong>Static constructors:</strong> Initialize static members when the type is first used.</p>
        
        <div class="code-example">
          <pre><code>// Comprehensive static member examples
public class ConfigurationManager
{
    // Static fields
    private static Dictionary<string, string> _settings;
    private static readonly object _lock = new object();
    private static bool _isInitialized = false;
    
    // Static constructor
    static ConfigurationManager()
    {
        _settings = new Dictionary<string, string>();
        Console.WriteLine("ConfigurationManager static constructor called");
    }
    
    // Static property
    public static bool IsInitialized => _isInitialized;
    
    // Static method to initialize settings
    public static void Initialize()
    {
        lock (_lock)
        {
            if (_isInitialized) return;
            
            _settings["DatabaseConnection"] = "Server=localhost;Database=MyApp";
            _settings["LogLevel"] = "Info";
            _settings["MaxConnections"] = "100";
            _isInitialized = true;
            
            Console.WriteLine("ConfigurationManager initialized");
        }
    }
    
    // Static method to get setting
    public static string GetSetting(string key)
    {
        if (!_isInitialized)
            throw new InvalidOperationException("ConfigurationManager not initialized");
            
        return _settings.TryGetValue(key, out string value) ? value : null;
    }
    
    // Static method to set setting
    public static void SetSetting(string key, string value)
    {
        if (!_isInitialized)
            throw new InvalidOperationException("ConfigurationManager not initialized");
            
        lock (_lock)
        {
            _settings[key] = value;
        }
    }
    
    // Static method with overloads
    public static int GetIntSetting(string key)
    {
        string value = GetSetting(key);
        return int.TryParse(value, out int result) ? result : 0;
    }
    
    public static bool GetBoolSetting(string key)
    {
        string value = GetSetting(key);
        return bool.TryParse(value, out bool result) && result;
    }
}

// Static utility class
public static class MathUtils
{
    // Static constants
    public const double PI = 3.14159265359;
    public const double E = 2.71828182846;
    
    // Static readonly field
    public static readonly Random Random = new Random();
    
    // Static methods
    public static double ToRadians(double degrees) => degrees * PI / 180;
    public static double ToDegrees(double radians) => radians * 180 / PI;
    
    public static double Round(double value, int decimals = 2)
    {
        return Math.Round(value, decimals);
    }
    
    public static int GetRandomNumber(int min, int max)
    {
        return Random.Next(min, max + 1);
    }
    
    // Static method with params
    public static double Average(params double[] numbers)
    {
        if (numbers.Length == 0) return 0;
        return numbers.Average();
    }
    
    // Static method with generic type
    public static T Max<T>(T a, T b) where T : IComparable<T>
    {
        return a.CompareTo(b) > 0 ? a : b;
    }
}

// Using static members
ConfigurationManager.Initialize();
string dbConnection = ConfigurationManager.GetSetting("DatabaseConnection");
int maxConnections = ConfigurationManager.GetIntSetting("MaxConnections");

double radians = MathUtils.ToRadians(90);
double average = MathUtils.Average(1.5, 2.3, 3.7, 4.1);
int randomNum = MathUtils.GetRandomNumber(1, 100);</code></pre>
        </div>
        
        <div class="interview-tip">
          <p><span class="interview-icon">🎯</span> <strong>Interview Focus:</strong> Understand when and how to use static members.</p>
          <p>Common questions: "When would you use static members?", "What's the difference between static and instance members?", "How do static constructors work?"</p>
        </div>
      `,
          codeExample: `// Static method example
public static class MathUtils
{
    public static int Square(int n) => n * n;
}`,
        },
        {
          title: 'Static Classes',
          explanation: `
            <p><strong>Static classes</strong> cannot be instantiated and can only contain static members. Useful for grouping utility functions.</p>
            <div class="code-example">
              <pre><code>public static class Logger
{
    public static void Log(string message) => Console.WriteLine(message);
}</code></pre>
            </div>
          `,
          codeExample: `// Using a static class
Logger.Log("Hello from static class!");`,
        },
      ],
      exercise: {
        instructions:
          'Create a static class Converter with static methods ToCelsius(double f) and ToFahrenheit(double c). Demonstrate calling these methods.',
      },
    },
  ],
  prepperSummary: `
    <div class="prepper-summary">
      <h3>🔑 Key Interview Takeaways</h3>
      <ul>
        <li><strong>Classes & Objects:</strong> Know how to define, instantiate, and use classes and objects.</li>
        <li><strong>Inheritance & Polymorphism:</strong> Understand class hierarchies, method overriding, and dynamic dispatch.</li>
        <li><strong>Interfaces & Abstract Classes:</strong> Be able to explain the differences and use cases for each.</li>
        <li><strong>Encapsulation:</strong> Use access modifiers to protect data and expose only what's necessary.</li>
        <li><strong>Properties & Indexers:</strong> Provide controlled access to data and collections.</li>
        <li><strong>Overloading & Overriding:</strong> Know when and how to use each for flexible APIs.</li>
        <li><strong>Constructors & Destructors:</strong> Properly initialize and clean up resources.</li>
        <li><strong>Static Members:</strong> Use static for shared data and utility methods.</li>
      </ul>
      <h4>📝 Common Interview Questions</h4>
      <ol>
        <li>"What is the difference between an interface and an abstract class?"</li>
        <li>"How does C# implement polymorphism?"</li>
        <li>"What are access modifiers and why are they important?"</li>
        <li>"Explain the difference between method overloading and overriding."</li>
        <li>"When would you use a static class?"</li>
      </ol>
    </div>
  `,
  challenge: {
    description:
      'You are building a simple zoo management system. Define a base class Animal with properties for Name and Age, and a virtual method MakeSound(). Create derived classes Lion and Parrot that override MakeSound(). Implement an interface IFeedable with a method Feed(). Both Lion and Parrot should implement IFeedable. Demonstrate polymorphism by storing animals in a list and calling MakeSound() and Feed() on each.',
    requirements: [
      'Base class Animal with Name, Age, and virtual MakeSound()',
      'Derived classes Lion and Parrot overriding MakeSound()',
      'Interface IFeedable with Feed() method',
      'Lion and Parrot implement IFeedable',
      'Demonstrate polymorphism with a list of animals',
    ],
    starterCode: `// Zoo Management System
using System;
using System.Collections.Generic;

public interface IFeedable
{
    void Feed();
}

public class Animal
{
    public string Name { get; set; }
    public int Age { get; set; }
    public virtual void MakeSound() => Console.WriteLine("Some generic animal sound");
}

public class Lion : Animal, IFeedable
{
    public override void MakeSound() => Console.WriteLine("Roar!");
    public void Feed() => Console.WriteLine($"Feeding {Name} the lion.");
}

public class Parrot : Animal, IFeedable
{
    public override void MakeSound() => Console.WriteLine("Squawk!");
    public void Feed() => Console.WriteLine($"Feeding {Name} the parrot.");
}

public class Program
{
    public static void Main()
    {
        List<Animal> zoo = new List<Animal> { new Lion { Name = "Leo", Age = 5 }, new Parrot { Name = "Polly", Age = 2 } };
        foreach (var animal in zoo)
        {
            animal.MakeSound();
            if (animal is IFeedable feedable)
                feedable.Feed();
        }
    }
}`,
  },
}

export default objectOrientedProgramming
