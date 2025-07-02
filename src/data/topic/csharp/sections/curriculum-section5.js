// curriculum-section5.js - ASP.NET Core Fundamentals

const aspNetCoreFundamentals = {
  title: 'ASP.NET Core Fundamentals',
  description:
    'Master the essentials of ASP.NET Core to build modern, cross-platform web applications and services.',
  lessons: [
    {
      title: 'Introduction to ASP.NET Core',
      description:
        'Understand the fundamentals of ASP.NET Core, its architecture, and how it differs from traditional .NET Framework.',
      sections: [
        {
          title: 'ASP.NET Core Architecture and Benefits',
          explanation: `
        <p>ASP.NET Core represents a complete redesign of the ASP.NET framework, built from the ground up to be cross-platform, high-performance, and modular. Understanding its architecture is crucial for building modern web applications.</p>
        
        <h4>What is ASP.NET Core?</h4>
        <p>ASP.NET Core is a free, open-source, cross-platform framework for building modern web applications and services. Key characteristics include:</p>
        <ul>
          <li><strong>Cross-platform:</strong> Runs on Windows, macOS, and Linux</li>
          <li><strong>High performance:</strong> One of the fastest web frameworks available</li>
          <li><strong>Modular:</strong> Include only the features you need</li>
          <li><strong>Unified platform:</strong> Build web apps, APIs, and microservices</li>
          <li><strong>Cloud-ready:</strong> Built-in support for cloud deployment and configuration</li>
        </ul>

        <h4>Core Architecture Components</h4>
        <p><strong>Host:</strong> The host is responsible for app startup and lifetime management. It sets up the server, configuration, logging, and dependency injection.</p>

        <p><strong>Server:</strong> The web server (Kestrel by default) that handles HTTP requests and responses.</p>

        <p><strong>Middleware Pipeline:</strong> A series of components that handle requests and responses in sequence.</p>

        <p><strong>Application Model:</strong> MVC, Web API, Razor Pages, or Blazor - the application framework you choose.</p>

        <div class="code-example">
          <pre><code>// Program.cs - The entry point of an ASP.NET Core application
var builder = WebApplication.CreateBuilder(args);

// Add services to the container
builder.Services.AddControllersWithViews();
builder.Services.AddRazorPages();

var app = builder.Build();

// Configure the HTTP request pipeline
if (!app.Environment.IsDevelopment())
{
    app.UseExceptionHandler("/Home/Error");
    app.UseHsts();
}

app.UseHttpsRedirection();
app.UseStaticFiles();
app.UseRouting();
app.UseAuthorization();

app.MapControllerRoute(
    name: "default",
    pattern: "{controller=Home}/{action=Index}/{id?}");

app.MapRazorPages();

app.Run();
</code></pre>
        </div>

        <h4>Hosting Models and Deployment</h4>
        <p>ASP.NET Core supports multiple hosting models:</p>
        <ul>
          <li><strong>Self-hosted:</strong> Your application includes a web server (Kestrel)</li>
          <li><strong>IIS Integration:</strong> Host behind IIS for Windows deployment</li>
          <li><strong>Docker containers:</strong> Containerized deployment for any platform</li>
          <li><strong>Cloud services:</strong> Azure App Service, AWS, Google Cloud</li>
        </ul>

        <div class="interview-tip">
          <p><span class="interview-icon">🎯</span> <strong>Interview Focus:</strong> Be prepared to explain ASP.NET Core's architecture and its advantages over .NET Framework.</p>
          <p>Common questions include:</p>
          <ul>
            <li>"What are the main benefits of ASP.NET Core over ASP.NET Framework?"</li>
            <li>"Explain the role of Kestrel in ASP.NET Core applications"</li>
            <li>"How does the hosting model work in ASP.NET Core?"</li>
            <li>"What is the difference between .NET Core and .NET Framework?"</li>
          </ul>
        </div>
      `,
          codeExample: `// Complete ASP.NET Core application structure

// Program.cs - Application entry point
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

// Configure services
builder.Services.AddDbContext<ApplicationDbContext>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection")));

builder.Services.AddDefaultIdentity<IdentityUser>(options => 
    {
        options.SignIn.RequireConfirmedAccount = false;
        options.Password.RequireDigit = true;
        options.Password.RequiredLength = 6;
    })
    .AddEntityFrameworkStores<ApplicationDbContext>();

builder.Services.AddControllersWithViews();
builder.Services.AddRazorPages();

// Add custom services
builder.Services.AddScoped<IEmailService, EmailService>();
builder.Services.AddSingleton<IConfiguration>(builder.Configuration);

// Configure logging
builder.Logging.ClearProviders();
builder.Logging.AddConsole();
builder.Logging.AddDebug();

var app = builder.Build();

// Configure middleware pipeline
if (app.Environment.IsDevelopment())
{
    app.UseDeveloperExceptionPage();
    app.UseMigrationsEndPoint();
}
else
{
    app.UseExceptionHandler("/Home/Error");
    app.UseHsts();
}

app.UseHttpsRedirection();
app.UseStaticFiles();

app.UseRouting();

app.UseAuthentication();
app.UseAuthorization();

// Configure endpoints
app.MapControllerRoute(
    name: "default",
    pattern: "{controller=Home}/{action=Index}/{id?}");

app.MapRazorPages();

app.Run();

// ApplicationDbContext.cs
public class ApplicationDbContext : IdentityDbContext
{
    public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
        : base(options)
    {
    }
    
    public DbSet<Product> Products { get; set; }
    public DbSet<Order> Orders { get; set; }
    
    protected override void OnModelCreating(ModelBuilder builder)
    {
        base.OnModelCreating(builder);
        
        builder.Entity<Product>()
            .Property(p => p.Price)
            .HasColumnType("decimal(18,2)");
    }
}`,
        },
      ],
      exercise: {
        instructions:
          'Create a new ASP.NET Core web application with Entity Framework, Identity, and custom services. Configure logging, database connection, and basic authentication. Implement a simple product catalog with CRUD operations.',
      },
    },
    {
      title: 'MVC Architecture',
      description:
        'Master the Model-View-Controller pattern in ASP.NET Core and understand how to structure applications for maintainability and testability.',
      sections: [
        {
          title: 'Understanding the MVC Pattern',
          explanation: `
        <p>The Model-View-Controller (MVC) pattern is a fundamental architectural pattern that separates application logic into three interconnected components. This separation promotes organized code, testability, and maintainability.</p>
        
        <h4>The Three Components of MVC</h4>
        <p><strong>Model:</strong> Represents the data and business logic of the application. Models define the structure of data, validation rules, and business operations. They are independent of the user interface.</p>

        <p><strong>View:</strong> Handles the presentation layer - what the user sees and interacts with. Views are responsible for displaying data from models and collecting user input.</p>

        <p><strong>Controller:</strong> Acts as an intermediary between Models and Views. Controllers handle user input, manipulate models, and select appropriate views for rendering responses.</p>

        <h4>MVC Request Flow in ASP.NET Core</h4>
        <p>Understanding the request flow helps you build efficient applications:</p>
        <ol>
          <li><strong>Routing:</strong> Incoming request is matched to a controller action based on URL patterns</li>
          <li><strong>Controller instantiation:</strong> The appropriate controller is created and dependencies are injected</li>
          <li><strong>Action execution:</strong> The action method is invoked with model binding</li>
          <li><strong>Action result:</strong> Controller returns an action result (view, JSON, redirect, etc.)</li>
          <li><strong>Result execution:</strong> The action result is processed and response is generated</li>
        </ol>

        <div class="code-example">
          <pre><code>// Models/Product.cs
public class Product
{
    public int Id { get; set; }
    
    [Required]
    [StringLength(100)]
    public string Name { get; set; }
    
    [Required]
    [StringLength(500)]
    public string Description { get; set; }
    
    [Required]
    [Range(0.01, 10000)]
    public decimal Price { get; set; }
    
    [Required]
    public string Category { get; set; }
    
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    
    public bool IsAvailable { get; set; } = true;
}

// ViewModels/ProductViewModel.cs
public class ProductViewModel
{
    public int Id { get; set; }
    public string Name { get; set; }
    public string Description { get; set; }
    public decimal Price { get; set; }
    public string Category { get; set; }
    public bool IsAvailable { get; set; }
    
    // Additional view-specific properties
    public string FormattedPrice => Price.ToString("C");
    public string StatusText => IsAvailable ? "In Stock" : "Out of Stock";
}
</code></pre>
        </div>

        <h4>Controllers and Action Methods</h4>
        <p>Controllers contain action methods that handle specific requests. Each action method typically:</p>
        <ul>
          <li>Receives input through parameters (route values, query strings, form data)</li>
          <li>Performs business logic (often delegating to services)</li>
          <li>Prepares data for the view (using ViewModels)</li>
          <li>Returns an appropriate ActionResult</li>
        </ul>

        <div class="code-example">
          <pre><code>// Controllers/ProductController.cs
public class ProductController : Controller
{
    private readonly IProductService _productService;
    private readonly IMapper _mapper;
    private readonly ILogger<ProductController> _logger;
    
    public ProductController(
        IProductService productService, 
        IMapper mapper,
        ILogger<ProductController> logger)
    {
        _productService = productService;
        _mapper = mapper;
        _logger = logger;
    }
    
    // GET: /Product
    public async Task<IActionResult> Index(string category, string search, int page = 1)
    {
        try
        {
            var products = await _productService.GetProductsAsync(category, search, page);
            var viewModel = _mapper.Map<IEnumerable<ProductViewModel>>(products);
            
            ViewBag.Categories = await _productService.GetCategoriesAsync();
            ViewBag.CurrentCategory = category;
            ViewBag.CurrentSearch = search;
            ViewBag.CurrentPage = page;
            
            return View(viewModel);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error loading products");
            return View("Error");
        }
    }
    
    // GET: /Product/Details/5
    public async Task<IActionResult> Details(int id)
    {
        var product = await _productService.GetProductByIdAsync(id);
        if (product == null)
        {
            return NotFound();
        }
        
        var viewModel = _mapper.Map<ProductViewModel>(product);
        return View(viewModel);
    }
    
    // GET: /Product/Create
    [Authorize(Roles = "Admin")]
    public IActionResult Create()
    {
        ViewBag.Categories = GetCategorySelectList();
        return View();
    }
    
    // POST: /Product/Create
    [HttpPost]
    [ValidateAntiForgeryToken]
    [Authorize(Roles = "Admin")]
    public async Task<IActionResult> Create(CreateProductViewModel model)
    {
        if (ModelState.IsValid)
        {
            var product = _mapper.Map<Product>(model);
            await _productService.CreateProductAsync(product);
            
            TempData["Success"] = "Product created successfully!";
            return RedirectToAction(nameof(Index));
        }
        
        ViewBag.Categories = GetCategorySelectList();
        return View(model);
    }
}
</code></pre>
        </div>

        <h4>Separation of Concerns and Best Practices</h4>
        <p><strong>Keep controllers thin:</strong> Controllers should orchestrate but not contain business logic. Delegate complex operations to services.</p>

        <p><strong>Use ViewModels:</strong> Don't pass domain models directly to views. Use ViewModels that are tailored for specific views.</p>

        <p><strong>Handle errors gracefully:</strong> Implement proper error handling and logging in controllers.</p>

        <p><strong>Follow RESTful conventions:</strong> Use standard HTTP verbs and naming conventions for actions.</p>

        <div class="interview-tip">
          <p><span class="interview-icon">🎯</span> <strong>Interview Focus:</strong> Demonstrate understanding of MVC principles and best practices.</p>
          <p>Key interview questions include:</p>
          <ul>
            <li>"Explain the difference between Models and ViewModels"</li>
            <li>"How does the MVC request lifecycle work in ASP.NET Core?"</li>
            <li>"What are the benefits of using the MVC pattern?"</li>
            <li>"How do you handle validation in MVC applications?"</li>
            <li>"What is the role of action filters in MVC?"</li>
          </ul>
        </div>
      `,
          codeExample: `// Complete MVC implementation example

// Services/IProductService.cs
public interface IProductService
{
    Task<IEnumerable<Product>> GetProductsAsync(string category = null, string search = null, int page = 1);
    Task<Product> GetProductByIdAsync(int id);
    Task<Product> CreateProductAsync(Product product);
    Task<Product> UpdateProductAsync(Product product);
    Task<bool> DeleteProductAsync(int id);
    Task<IEnumerable<string>> GetCategoriesAsync();
}

// Services/ProductService.cs
public class ProductService : IProductService
{
    private readonly ApplicationDbContext _context;
    private readonly ILogger<ProductService> _logger;
    
    public ProductService(ApplicationDbContext context, ILogger<ProductService> logger)
    {
        _context = context;
        _logger = logger;
    }
    
    public async Task<IEnumerable<Product>> GetProductsAsync(string category = null, string search = null, int page = 1)
    {
        var query = _context.Products.AsQueryable();
        
        if (!string.IsNullOrEmpty(category))
        {
            query = query.Where(p => p.Category == category);
        }
        
        if (!string.IsNullOrEmpty(search))
        {
            query = query.Where(p => p.Name.Contains(search) || p.Description.Contains(search));
        }
        
        const int pageSize = 12;
        return await query
            .Where(p => p.IsAvailable)
            .OrderBy(p => p.Name)
            .Skip((page - 1) * pageSize)
            .Take(pageSize)
            .ToListAsync();
    }
    
    public async Task<Product> GetProductByIdAsync(int id)
    {
        return await _context.Products
            .FirstOrDefaultAsync(p => p.Id == id && p.IsAvailable);
    }
    
    public async Task<Product> CreateProductAsync(Product product)
    {
        _context.Products.Add(product);
        await _context.SaveChangesAsync();
        
        _logger.LogInformation("Created product {ProductId}: {ProductName}", product.Id, product.Name);
        return product;
    }
}

// ViewModels/CreateProductViewModel.cs
public class CreateProductViewModel
{
    [Required]
    [StringLength(100, MinimumLength = 2)]
    public string Name { get; set; }
    
    [Required]
    [StringLength(500, MinimumLength = 10)]
    public string Description { get; set; }
    
    [Required]
    [Range(0.01, 10000)]
    [Display(Name = "Price")]
    public decimal Price { get; set; }
    
    [Required]
    [Display(Name = "Category")]
    public string Category { get; set; }
    
    [Display(Name = "Available")]
    public bool IsAvailable { get; set; } = true;
}

// Action Filters
public class LogActionFilter : ActionFilterAttribute
{
    private readonly ILogger<LogActionFilter> _logger;
    
    public LogActionFilter(ILogger<LogActionFilter> logger)
    {
        _logger = logger;
    }
    
    public override void OnActionExecuting(ActionExecutingContext context)
    {
        _logger.LogInformation("Executing action {ActionName} on controller {ControllerName}",
            context.ActionDescriptor.RouteValues["action"],
            context.ActionDescriptor.RouteValues["controller"]);
    }
    
    public override void OnActionExecuted(ActionExecutedContext context)
    {
        if (context.Exception != null)
        {
            _logger.LogError(context.Exception, "Action failed");
        }
    }
}`,
        },
      ],
      exercise: {
        instructions:
          'Build a complete MVC application for a book library system. Implement controllers for Books, Authors, and Categories with full CRUD operations. Create appropriate ViewModels, implement validation, error handling, and logging. Include search and pagination functionality.',
      },
    },
    {
      title: 'Razor Views and Pages',
      description:
        'Learn to create dynamic web content using Razor syntax, understand the difference between MVC Views and Razor Pages, and master templating techniques.',
      sections: [
        {
          title: 'Razor Syntax and Templating',
          explanation: `
        <p>Razor is a markup syntax that allows you to embed server-based code into web pages. It provides a clean, lightweight way to create dynamic content by mixing HTML with C# code.</p>
        
        <h4>Razor Syntax Fundamentals</h4>
        <p>Razor uses the @ symbol to transition from HTML to C# code. Understanding the syntax rules is essential for creating effective templates:</p>

        <p><strong>Code expressions:</strong> Single statements that return values are automatically HTML-encoded for security.</p>

        <p><strong>Code blocks:</strong> Multiple statements enclosed in braces allow complex logic within templates.</p>

        <p><strong>Control structures:</strong> if/else statements, loops, and switch expressions work seamlessly with HTML.</p>

        <div class="code-example">
          <pre><code>@* Razor Comments - not rendered to HTML *@
@{
    // Code block - multiple statements
    var currentTime = DateTime.Now;
    var greeting = currentTime.Hour < 12 ? "Good morning" : "Good afternoon";
    var products = ViewBag.Products as IEnumerable<Product>;
}

<h1>@greeting, @User.Identity.Name!</h1>
<p>Current time: @currentTime.ToString("HH:mm:ss")</p>

@* Conditional rendering *@
@if (products?.Any() == true)
{
    <div class="product-grid">
        @foreach (var product in products)
        {
            <div class="product-card">
                <h3>@product.Name</h3>
                <p>@product.Description</p>
                <span class="price">@product.Price.ToString("C")</span>
                
                @* Conditional CSS classes *@
                <div class="status @(product.IsAvailable ? "available" : "unavailable")">
                    @(product.IsAvailable ? "In Stock" : "Out of Stock")
                </div>
            </div>
        }
    </div>
}
else
{
    <p class="no-products">No products available at this time.</p>
}

@* Using HTML helpers and tag helpers *@
@using (Html.BeginForm("Search", "Product", FormMethod.Get))
{
    @Html.TextBox("searchTerm", ViewBag.CurrentSearch, new { @class = "form-control", placeholder = "Search products..." })
    <button type="submit" class="btn btn-primary">Search</button>
}
</code></pre>
        </div>

        <h4>MVC Views vs Razor Pages</h4>
        <p><strong>MVC Views:</strong> Work with controllers and actions. Views are selected by controllers and receive data through ViewModels, ViewBag, or ViewData.</p>

        <p><strong>Razor Pages:</strong> Page-focused model where each page handles its own requests. Combines the controller and view into a single file with a code-behind model.</p>

        <div class="code-example">
          <pre><code>@* MVC View Example: Views/Product/Index.cshtml *@
@model IEnumerable<ProductViewModel>
@{
    ViewData["Title"] = "Products";
    Layout = "_Layout";
}

<div class="container">
    <div class="row">
        <div class="col-md-12">
            <h2>@ViewData["Title"]</h2>
            
            @* Search form *@
            <form method="get" class="search-form">
                <div class="input-group">
                    <input type="text" name="search" value="@ViewBag.CurrentSearch" 
                           class="form-control" placeholder="Search products..." />
                    <select name="category" class="form-select">
                        <option value="">All Categories</option>
                        @foreach (var category in ViewBag.Categories)
                        {
                            <option value="@category" selected="@(category == ViewBag.CurrentCategory)">
                                @category
                            </option>
                        }
                    </select>
                    <button type="submit" class="btn btn-primary">Search</button>
                </div>
            </form>
            
            @* Product grid using partial views *@
            <div class="product-grid">
                @foreach (var product in Model)
                {
                    @await Html.PartialAsync("_ProductCard", product)
                }
            </div>
            
            @* Pagination *@
            @await Html.PartialAsync("_Pagination", new PaginationViewModel 
            { 
                CurrentPage = ViewBag.CurrentPage, 
                TotalPages = ViewBag.TotalPages 
            })
        </div>
    </div>
</div>
</code></pre>
        </div>

        <h4>Layouts and Partial Views</h4>
        <p><strong>Layouts:</strong> Define the common structure for multiple pages. They specify where content should be rendered and can include shared navigation, headers, and footers.</p>

        <p><strong>Partial Views:</strong> Reusable view components that can be included in multiple views. Perfect for rendering repeated UI elements.</p>

        <div class="code-example">
          <pre><code>@* _Layout.cshtml - Master layout *@
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>@ViewData["Title"] - MyApp</title>
    <link rel="stylesheet" href="~/lib/bootstrap/dist/css/bootstrap.min.css" />
    <link rel="stylesheet" href="~/css/site.css" asp-append-version="true" />
</head>
<body>
    <header>
        <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
            <div class="container">
                <a class="navbar-brand" asp-area="" asp-controller="Home" asp-action="Index">MyApp</a>
                <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
                    <span class="navbar-toggler-icon"></span>
                </button>
                <div class="collapse navbar-collapse" id="navbarNav">
                    <ul class="navbar-nav me-auto">
                        <li class="nav-item">
                            <a class="nav-link" asp-area="" asp-controller="Home" asp-action="Index">Home</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" asp-area="" asp-controller="Product" asp-action="Index">Products</a>
                        </li>
                    </ul>
                    @await Html.PartialAsync("_LoginPartial")
                </div>
            </div>
        </nav>
    </header>
    
    <main role="main" class="pb-3">
        @RenderBody()
    </main>
    
    <footer class="border-top footer text-muted">
        <div class="container">
            &copy; 2024 - MyApp - <a asp-area="" asp-controller="Home" asp-action="Privacy">Privacy</a>
        </div>
    </footer>
    
    <script src="~/lib/jquery/dist/jquery.min.js"></script>
    <script src="~/lib/bootstrap/dist/js/bootstrap.bundle.min.js"></script>
    <script src="~/js/site.js" asp-append-version="true"></script>
    
    @await RenderSectionAsync("Scripts", required: false)
</body>
</html>

@* _ProductCard.cshtml - Partial view *@
@model ProductViewModel

<div class="col-md-4 mb-4">
    <div class="card h-100">
        <div class="card-body">
            <h5 class="card-title">@Model.Name</h5>
            <p class="card-text">@Model.Description</p>
            <p class="card-text">
                <small class="text-muted">Category: @Model.Category</small>
            </p>
        </div>
        <div class="card-footer">
            <div class="d-flex justify-content-between align-items-center">
                <span class="h5 mb-0">@Model.FormattedPrice</span>
                <div class="btn-group">
                    <a asp-controller="Product" asp-action="Details" asp-route-id="@Model.Id" 
                       class="btn btn-outline-primary btn-sm">Details</a>
                    @if (Model.IsAvailable)
                    {
                        <button type="button" class="btn btn-primary btn-sm">Add to Cart</button>
                    }
                </div>
            </div>
        </div>
    </div>
</div>
</code></pre>
        </div>

        <h4>Tag Helpers and HTML Helpers</h4>
        <p><strong>Tag Helpers:</strong> Server-side components that participate in creating HTML elements. They provide a more natural HTML authoring experience.</p>

        <p><strong>HTML Helpers:</strong> Methods that return HTML strings. They're more programmatic but less HTML-like in syntax.</p>

        <div class="interview-tip">
          <p><span class="interview-icon">🎯</span> <strong>Interview Focus:</strong> Demonstrate proficiency with Razor syntax and templating patterns.</p>
          <p>Key interview questions include:</p>
          <ul>
            <li>"What's the difference between ViewBag, ViewData, and TempData?"</li>
            <li>"How do you prevent XSS attacks in Razor views?"</li>
            <li>"When would you use a partial view vs a view component?"</li>
            <li>"Explain the difference between Tag Helpers and HTML Helpers"</li>
            <li>"How do you pass data from a controller to a view?"</li>
          </ul>
        </div>
      `,
          codeExample: `// Complete Razor Pages example

// Pages/Products/Index.cshtml.cs - Page Model
public class IndexModel : PageModel
{
    private readonly IProductService _productService;
    
    public IndexModel(IProductService productService)
    {
        _productService = productService;
    }
    
    [BindProperty(SupportsGet = true)]
    public string SearchTerm { get; set; }
    
    [BindProperty(SupportsGet = true)]
    public string Category { get; set; }
    
    [BindProperty(SupportsGet = true)]
    public int CurrentPage { get; set; } = 1;
    
    public IList<ProductViewModel> Products { get; set; }
    public IList<string> Categories { get; set; }
    public int TotalPages { get; set; }
    
    public async Task OnGetAsync()
    {
        var (products, totalCount) = await _productService.GetProductsPagedAsync(
            SearchTerm, Category, CurrentPage, 12);
            
        Products = products.Select(p => new ProductViewModel
        {
            Id = p.Id,
            Name = p.Name,
            Description = p.Description,
            Price = p.Price,
            Category = p.Category,
            IsAvailable = p.IsAvailable
        }).ToList();
        
        Categories = await _productService.GetCategoriesAsync();
        TotalPages = (int)Math.Ceiling(totalCount / 12.0);
    }
}

@* Pages/Products/Index.cshtml - Razor Page *@
@page "/products"
@model IndexModel
@{
    ViewData["Title"] = "Products";
}

<div class="container">
    <h2>Products</h2>
    
    @* Search and filter form *@
    <form method="get" class="row g-3 mb-4">
        <div class="col-md-6">
            <input asp-for="SearchTerm" class="form-control" placeholder="Search products..." />
        </div>
        <div class="col-md-4">
            <select asp-for="Category" class="form-select">
                <option value="">All Categories</option>
                @foreach (var category in Model.Categories)
                {
                    <option value="@category">@category</option>
                }
            </select>
        </div>
        <div class="col-md-2">
            <button type="submit" class="btn btn-primary w-100">Search</button>
        </div>
    </form>
    
    @* Products grid *@
    <div class="row">
        @foreach (var product in Model.Products)
        {
            <div class="col-md-4 mb-4">
                <div class="card h-100">
                    <div class="card-body">
                        <h5 class="card-title">@product.Name</h5>
                        <p class="card-text">@product.Description</p>
                        <p class="text-muted">@product.Category</p>
                    </div>
                    <div class="card-footer">
                        <div class="d-flex justify-content-between align-items-center">
                            <span class="h5 mb-0">@product.Price.ToString("C")</span>
                            <a asp-page="./Details" asp-route-id="@product.Id" 
                               class="btn btn-outline-primary">Details</a>
                        </div>
                    </div>
                </div>
            </div>
        }
    </div>
    
    @* Pagination *@
    @if (Model.TotalPages > 1)
    {
        <nav aria-label="Products pagination">
            <ul class="pagination justify-content-center">
                @for (int i = 1; i <= Model.TotalPages; i++)
                {
                    <li class="page-item @(i == Model.CurrentPage ? "active" : "")">
                        <a class="page-link" 
                           asp-page="./Index" 
                           asp-route-currentpage="@i"
                           asp-route-searchterm="@Model.SearchTerm"
                           asp-route-category="@Model.Category">@i</a>
                    </li>
                }
            </ul>
        </nav>
    }
</div>

@* Custom Tag Helper example *@
// TagHelpers/EmailTagHelper.cs
[HtmlTargetElement("email")]
public class EmailTagHelper : TagHelper
{
    public string MailTo { get; set; }
    
    public override void Process(TagHelperContext context, TagHelperOutput output)
    {
        output.TagName = "a";
        
        var address = MailTo ?? GetChildContentAsync().Result.GetContent();
        output.Attributes.SetAttribute("href", $"mailto:{address}");
        output.Content.SetContent(address);
    }
}

@* Usage: <email mail-to="support@example.com"></email> *@

// View Components for complex reusable logic
public class RecentProductsViewComponent : ViewComponent
{
    private readonly IProductService _productService;
    
    public RecentProductsViewComponent(IProductService productService)
    {
        _productService = productService;
    }
    
    public async Task<IViewComponentResult> InvokeAsync(int count = 5)
    {
        var products = await _productService.GetRecentProductsAsync(count);
        return View(products);
    }
}

@* Views/Shared/Components/RecentProducts/Default.cshtml *@
@model IEnumerable<ProductViewModel>

<div class="recent-products">
    <h4>Recent Products</h4>
    @foreach (var product in Model)
    {
        <div class="recent-product-item">
            <span class="product-name">@product.Name</span>
            <span class="product-price">@product.FormattedPrice</span>
        </div>
    }
</div>

@* Usage in views: @await Component.InvokeAsync("RecentProducts", new { count = 3 }) *@`,
        },
      ],
      exercise: {
        instructions:
          'Create a comprehensive blog system using both MVC Views and Razor Pages. Implement blog post listing, details, and creation using MVC. Create an admin dashboard using Razor Pages. Include custom tag helpers for formatting dates and truncating text, view components for recent posts and categories, and proper layout inheritance.',
      },
    },
    {
      title: 'Controllers and Actions',
      description:
        'Master controller design, action methods, parameter binding, and result types to handle HTTP requests effectively.',
      sections: [
        {
          title: 'Controller Architecture and Action Methods',
          explanation: `
        <p>Controllers are the heart of the MVC pattern in ASP.NET Core, responsible for handling incoming HTTP requests, processing them, and returning appropriate responses. Understanding controller design and action methods is crucial for building robust web applications.</p>
        
        <h4>Controller Fundamentals</h4>
        <p>Controllers inherit from the <code>Controller</code> base class and contain action methods that correspond to different operations your application can perform. Each public method in a controller typically represents an action that can be invoked via HTTP requests.</p>

        <p><strong>Controller responsibilities:</strong></p>
        <ul>
          <li>Handle HTTP requests and route them to appropriate business logic</li>
          <li>Validate input data and model state</li>
          <li>Orchestrate calls to services and data access layers</li>
          <li>Prepare data for views and return appropriate results</li>
          <li>Handle exceptions and provide error responses</li>
        </ul>

        <div class="code-example">
          <pre><code>// Controllers/ProductController.cs
[Route("api/[controller]")]
[ApiController]
public class ProductController : ControllerBase
{
    private readonly IProductService _productService;
    private readonly ILogger<ProductController> _logger;
    private readonly IMapper _mapper;
    
    public ProductController(
        IProductService productService,
        ILogger<ProductController> logger,
        IMapper mapper)
    {
        _productService = productService;
        _logger = logger;
        _mapper = mapper;
    }
    
    // GET: api/product
    [HttpGet]
    public async Task<ActionResult<IEnumerable<ProductDto>>> GetProducts(
        [FromQuery] string category = null,
        [FromQuery] string search = null,
        [FromQuery] int page = 1,
        [FromQuery] int pageSize = 10)
    {
        try
        {
            if (pageSize > 100)
            {
                return BadRequest("Page size cannot exceed 100 items");
            }
            
            var products = await _productService.GetProductsAsync(category, search, page, pageSize);
            var productDtos = _mapper.Map<IEnumerable<ProductDto>>(products);
            
            Response.Headers.Add("X-Total-Count", products.TotalCount.ToString());
            Response.Headers.Add("X-Page", page.ToString());
            Response.Headers.Add("X-Page-Size", pageSize.ToString());
            
            return Ok(productDtos);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error retrieving products");
            return StatusCode(500, "An error occurred while retrieving products");
        }
    }
    
    // GET: api/product/{id}
    [HttpGet("{id:int}")]
    public async Task<ActionResult<ProductDto>> GetProduct(int id)
    {
        var product = await _productService.GetProductByIdAsync(id);
        
        if (product == null)
        {
            return NotFound($"Product with ID {id} not found");
        }
        
        var productDto = _mapper.Map<ProductDto>(product);
        return Ok(productDto);
    }
    
    // POST: api/product
    [HttpPost]
    [Authorize(Roles = "Admin")]
    public async Task<ActionResult<ProductDto>> CreateProduct([FromBody] CreateProductDto createProductDto)
    {
        if (!ModelState.IsValid)
        {
            return BadRequest(ModelState);
        }
        
        try
        {
            var product = _mapper.Map<Product>(createProductDto);
            var createdProduct = await _productService.CreateProductAsync(product);
            var productDto = _mapper.Map<ProductDto>(createdProduct);
            
            return CreatedAtAction(
                nameof(GetProduct),
                new { id = productDto.Id },
                productDto);
        }
        catch (BusinessException ex)
        {
            return BadRequest(ex.Message);
        }
    }
    
    // PUT: api/product/{id}
    [HttpPut("{id:int}")]
    [Authorize(Roles = "Admin")]
    public async Task<IActionResult> UpdateProduct(int id, [FromBody] UpdateProductDto updateProductDto)
    {
        if (id != updateProductDto.Id)
        {
            return BadRequest("Route ID and body ID do not match");
        }
        
        if (!ModelState.IsValid)
        {
            return BadRequest(ModelState);
        }
        
        try
        {
            var product = _mapper.Map<Product>(updateProductDto);
            await _productService.UpdateProductAsync(product);
            return NoContent();
        }
        catch (NotFoundException)
        {
            return NotFound();
        }
        catch (BusinessException ex)
        {
            return BadRequest(ex.Message);
        }
    }
    
    // DELETE: api/product/{id}
    [HttpDelete("{id:int}")]
    [Authorize(Roles = "Admin")]
    public async Task<IActionResult> DeleteProduct(int id)
    {
        try
        {
            await _productService.DeleteProductAsync(id);
            return NoContent();
        }
        catch (NotFoundException)
        {
            return NotFound();
        }
    }
}
</code></pre>
        </div>

        <h4>Action Results and Response Types</h4>
        <p>Action methods return ActionResult types that determine what response is sent to the client. Understanding the different result types helps you provide appropriate responses:</p>

        <p><strong>Content Results:</strong></p>
        <ul>
          <li><code>Ok()</code> - 200 with optional content</li>
          <li><code>Created()</code> - 201 for successful resource creation</li>
          <li><code>NoContent()</code> - 204 for successful operations with no content</li>
        </ul>

        <p><strong>Error Results:</strong></p>
        <ul>
          <li><code>BadRequest()</code> - 400 for client errors</li>
          <li><code>NotFound()</code> - 404 for missing resources</li>
          <li><code>Unauthorized()</code> - 401 for authentication issues</li>
          <li><code>Forbid()</code> - 403 for authorization issues</li>
        </ul>

        <h4>Model Binding and Validation</h4>
        <p>ASP.NET Core automatically binds request data to action parameters. Understanding how this works and how to validate input is essential for secure applications:</p>

        <div class="code-example">
          <pre><code>// DTOs/CreateProductDto.cs
public class CreateProductDto
{
    [Required]
    [StringLength(100, MinimumLength = 2)]
    public string Name { get; set; }
    
    [Required]
    [StringLength(500, MinimumLength = 10)]
    public string Description { get; set; }
    
    [Required]
    [Range(0.01, 10000)]
    public decimal Price { get; set; }
    
    [Required]
    public string Category { get; set; }
    
    public bool IsAvailable { get; set; } = true;
}

// Model binding from different sources
[HttpPost("complex")]
public async Task<IActionResult> ComplexAction(
    [FromRoute] int id,                    // URL segment
    [FromQuery] string filter,             // Query string
    [FromBody] CreateProductDto product,   // Request body
    [FromHeader("User-Agent")] string userAgent,  // HTTP header
    [FromForm] IFormFile file)             // Form data
{
    // Custom validation
    if (product.Price < 0)
    {
        ModelState.AddModelError(nameof(product.Price), "Price must be positive");
    }
    
    if (!ModelState.IsValid)
    {
        return BadRequest(ModelState);
    }
    
    // Process the request...
    return Ok();
}

// Custom model binder attribute
public class CommaDelimitedArrayModelBinder : IModelBinder
{
    public Task BindModelAsync(ModelBindingContext bindingContext)
    {
        var value = bindingContext.ValueProvider.GetValue(bindingContext.ModelName);
        
        if (value == ValueProviderResult.None)
        {
            return Task.CompletedTask;
        }
        
        var values = value.FirstValue?.Split(',', StringSplitOptions.RemoveEmptyEntries);
        bindingContext.Result = ModelBindingResult.Successful(values);
        
        return Task.CompletedTask;
    }
}

// Usage: GET /api/products?tags=electronics,gadgets,mobile
[HttpGet]
public IActionResult GetProductsByTags([ModelBinder(typeof(CommaDelimitedArrayModelBinder))] string[] tags)
{
    // tags will be ["electronics", "gadgets", "mobile"]
    return Ok();
}
</code></pre>
        </div>

        <h4>Action Filters and Cross-Cutting Concerns</h4>
        <p>Action filters provide a way to run code before and after action execution, perfect for cross-cutting concerns like logging, caching, and validation:</p>

        <div class="code-example">
          <pre><code>// Custom action filter for API rate limiting
public class RateLimitAttribute : ActionFilterAttribute
{
    private readonly int _maxRequests;
    private readonly TimeSpan _timeWindow;
    private static readonly MemoryCache _cache = new MemoryCache(new MemoryCacheOptions());
    
    public RateLimitAttribute(int maxRequests = 100, int timeWindowMinutes = 1)
    {
        _maxRequests = maxRequests;
        _timeWindow = TimeSpan.FromMinutes(timeWindowMinutes);
    }
    
    public override void OnActionExecuting(ActionExecutingContext context)
    {
        var clientId = GetClientIdentifier(context.HttpContext);
        var key = $"rate_limit_{clientId}";
        
        if (_cache.TryGetValue(key, out int requestCount))
        {
            if (requestCount >= _maxRequests)
            {
                context.Result = new StatusCodeResult(429); // Too Many Requests
                return;
            }
            
            _cache.Set(key, requestCount + 1, _timeWindow);
        }
        else
        {
            _cache.Set(key, 1, _timeWindow);
        }
        
        base.OnActionExecuting(context);
    }
    
    private string GetClientIdentifier(HttpContext context)
    {
        return context.Connection.RemoteIpAddress?.ToString() ?? "unknown";
    }
}

// Usage
[HttpGet]
[RateLimit(maxRequests: 50, timeWindowMinutes: 5)]
public async Task<IActionResult> GetExpensiveData()
{
    // This endpoint is rate-limited to 50 requests per 5 minutes
    return Ok(await _service.GetExpensiveDataAsync());
}
</code></pre>
        </div>

        <div class="interview-tip">
          <p><span class="interview-icon">🎯</span> <strong>Interview Focus:</strong> Demonstrate deep understanding of controller patterns and HTTP semantics.</p>
          <p>Critical interview questions include:</p>
          <ul>
            <li>"How do you handle validation in Web API controllers?"</li>
            <li>"What's the difference between Controller and ControllerBase?"</li>
            <li>"How does model binding work and what are the different binding sources?"</li>
            <li>"When would you use different ActionResult types?"</li>
            <li>"How do you implement cross-cutting concerns in controllers?"</li>
            <li>"How do you handle exceptions globally in ASP.NET Core?"</li>
          </ul>
        </div>
      `,
          codeExample: `// Comprehensive controller implementation with advanced patterns

// Base controller with common functionality
public abstract class BaseApiController : ControllerBase
{
    protected readonly ILogger _logger;
    
    protected BaseApiController(ILogger logger)
    {
        _logger = logger;
    }
    
    protected ActionResult HandleException(Exception ex, string operation)
    {
        _logger.LogError(ex, "Error during {Operation}", operation);
        
        return ex switch
        {
            NotFoundException => NotFound(ex.Message),
            BusinessException => BadRequest(ex.Message),
            UnauthorizedAccessException => Unauthorized(ex.Message),
            _ => StatusCode(500, "An unexpected error occurred")
        };
    }
    
    protected string GetUserId()
    {
        return User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
    }
    
    protected bool IsUserAuthorized(string resourceUserId)
    {
        var currentUserId = GetUserId();
        return currentUserId == resourceUserId || User.IsInRole("Admin");
    }
}

// Advanced controller with comprehensive features
[ApiController]
[Route("api/[controller]")]
[Produces("application/json")]
public class OrderController : BaseApiController
{
    private readonly IOrderService _orderService;
    private readonly IMapper _mapper;
    
    public OrderController(
        IOrderService orderService,
        IMapper mapper,
        ILogger<OrderController> logger) : base(logger)
    {
        _orderService = orderService;
        _mapper = mapper;
    }
    
    /// <summary>
    /// Retrieves orders for the current user with optional filtering
    /// </summary>
    /// <param name="status">Filter by order status</param>
    /// <param name="fromDate">Orders from this date</param>
    /// <param name="toDate">Orders up to this date</param>
    /// <param name="page">Page number (default: 1)</param>
    /// <param name="pageSize">Items per page (default: 10, max: 50)</param>
    /// <returns>Paginated list of orders</returns>
    [HttpGet]
    [Authorize]
    [ProducesResponseType(typeof(PagedResult<OrderDto>), 200)]
    [ProducesResponseType(400)]
    [ProducesResponseType(401)]
    public async Task<ActionResult<PagedResult<OrderDto>>> GetOrders(
        [FromQuery] OrderStatus? status = null,
        [FromQuery] DateTime? fromDate = null,
        [FromQuery] DateTime? toDate = null,
        [FromQuery] int page = 1,
        [FromQuery] int pageSize = 10)
    {
        try
        {
            // Validation
            if (pageSize > 50)
            {
                return BadRequest("Page size cannot exceed 50");
            }
            
            if (fromDate.HasValue && toDate.HasValue && fromDate > toDate)
            {
                return BadRequest("From date cannot be later than to date");
            }
            
            var userId = GetUserId();
            var orders = await _orderService.GetUserOrdersAsync(
                userId, status, fromDate, toDate, page, pageSize);
            
            var orderDtos = _mapper.Map<PagedResult<OrderDto>>(orders);
            
            // Add pagination headers
            Response.Headers.Add("X-Pagination", 
                JsonSerializer.Serialize(new
                {
                    TotalCount = orders.TotalCount,
                    Page = page,
                    PageSize = pageSize,
                    TotalPages = orders.TotalPages
                }));
            
            return Ok(orderDtos);
        }
        catch (Exception ex)
        {
            return HandleException(ex, "retrieving orders");
        }
    }
    
    /// <summary>
    /// Creates a new order
    /// </summary>
    /// <param name="createOrderDto">Order creation data</param>
    /// <returns>Created order details</returns>
    [HttpPost]
    [Authorize]
    [ProducesResponseType(typeof(OrderDto), 201)]
    [ProducesResponseType(400)]
    [ProducesResponseType(401)]
    public async Task<ActionResult<OrderDto>> CreateOrder([FromBody] CreateOrderDto createOrderDto)
    {
        try
        {
            // Additional business validation
            if (createOrderDto.Items?.Any() != true)
            {
                ModelState.AddModelError(nameof(createOrderDto.Items), "Order must contain at least one item");
            }
            
            // Check if all products are available
            foreach (var item in createOrderDto.Items)
            {
                if (item.Quantity <= 0)
                {
                    ModelState.AddModelError($"Items[{createOrderDto.Items.ToList().IndexOf(item)}].Quantity",
                        "Quantity must be greater than zero");
                }
            }
            
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            
            var userId = GetUserId();
            createOrderDto.UserId = userId;
            
            var order = _mapper.Map<Order>(createOrderDto);
            var createdOrder = await _orderService.CreateOrderAsync(order);
            var orderDto = _mapper.Map<OrderDto>(createdOrder);
            
            _logger.LogInformation("Order {OrderId} created for user {UserId}", 
                createdOrder.Id, userId);
            
            return CreatedAtAction(
                nameof(GetOrder),
                new { id = orderDto.Id },
                orderDto);
        }
        catch (Exception ex)
        {
            return HandleException(ex, "creating order");
        }
    }
    
    /// <summary>
    /// Retrieves a specific order by ID
    /// </summary>
    /// <param name="id">Order ID</param>
    /// <returns>Order details</returns>
    [HttpGet("{id:int}")]
    [Authorize]
    [ProducesResponseType(typeof(OrderDto), 200)]
    [ProducesResponseType(404)]
    [ProducesResponseType(401)]
    [ProducesResponseType(403)]
    public async Task<ActionResult<OrderDto>> GetOrder(int id)
    {
        try
        {
            var order = await _orderService.GetOrderByIdAsync(id);
            
            if (order == null)
            {
                return NotFound($"Order with ID {id} not found");
            }
            
            // Authorization check
            if (!IsUserAuthorized(order.UserId))
            {
                return Forbid("You don't have permission to view this order");
            }
            
            var orderDto = _mapper.Map<OrderDto>(order);
            return Ok(orderDto);
        }
        catch (Exception ex)
        {
            return HandleException(ex, $"retrieving order {id}");
        }
    }
    
    /// <summary>
    /// Updates order status (Admin only)
    /// </summary>
    /// <param name="id">Order ID</param>
    /// <param name="updateStatusDto">Status update data</param>
    /// <returns>No content on success</returns>
    [HttpPatch("{id:int}/status")]
    [Authorize(Roles = "Admin")]
    [ProducesResponseType(204)]
    [ProducesResponseType(400)]
    [ProducesResponseType(404)]
    [ProducesResponseType(401)]
    [ProducesResponseType(403)]
    public async Task<IActionResult> UpdateOrderStatus(int id, [FromBody] UpdateOrderStatusDto updateStatusDto)
    {
        try
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            
            await _orderService.UpdateOrderStatusAsync(id, updateStatusDto.Status, updateStatusDto.Notes);
            
            _logger.LogInformation("Order {OrderId} status updated to {Status} by user {UserId}",
                id, updateStatusDto.Status, GetUserId());
            
            return NoContent();
        }
        catch (Exception ex)
        {
            return HandleException(ex, $"updating order {id} status");
        }
    }
    
    /// <summary>
    /// Cancels an order (User can cancel their own orders, Admin can cancel any)
    /// </summary>
    /// <param name="id">Order ID</param>
    /// <param name="cancelOrderDto">Cancellation data</param>
    /// <returns>No content on success</returns>
    [HttpPost("{id:int}/cancel")]
    [Authorize]
    [ProducesResponseType(204)]
    [ProducesResponseType(400)]
    [ProducesResponseType(404)]
    [ProducesResponseType(401)]
    [ProducesResponseType(403)]
    public async Task<IActionResult> CancelOrder(int id, [FromBody] CancelOrderDto cancelOrderDto)
    {
        try
        {
            var order = await _orderService.GetOrderByIdAsync(id);
            
            if (order == null)
            {
                return NotFound($"Order with ID {id} not found");
            }
            
            if (!IsUserAuthorized(order.UserId))
            {
                return Forbid("You don't have permission to cancel this order");
            }
            
            await _orderService.CancelOrderAsync(id, cancelOrderDto.Reason);
            
            _logger.LogInformation("Order {OrderId} cancelled by user {UserId}. Reason: {Reason}",
                id, GetUserId(), cancelOrderDto.Reason);
            
            return NoContent();
        }
        catch (Exception ex)
        {
            return HandleException(ex, $"cancelling order {id}");
        }
    }
}

// Global exception handler middleware
public class GlobalExceptionMiddleware
{
    private readonly RequestDelegate _next;
    private readonly ILogger<GlobalExceptionMiddleware> _logger;
    
    public GlobalExceptionMiddleware(RequestDelegate next, ILogger<GlobalExceptionMiddleware> logger)
    {
        _next = next;
        _logger = logger;
    }
    
    public async Task InvokeAsync(HttpContext context)
    {
        try
        {
            await _next(context);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "An unhandled exception occurred");
            await HandleExceptionAsync(context, ex);
        }
    }
    
    private static async Task HandleExceptionAsync(HttpContext context, Exception exception)
    {
        context.Response.ContentType = "application/json";
        
        var response = exception switch
        {
            NotFoundException => new { message = exception.Message, status = 404 },
            BusinessException => new { message = exception.Message, status = 400 },
            UnauthorizedAccessException => new { message = "Unauthorized", status = 401 },
            _ => new { message = "An error occurred", status = 500 }
        };
        
        context.Response.StatusCode = response.status;
        await context.Response.WriteAsync(JsonSerializer.Serialize(response));
    }
}`,
        },
      ],
      exercise: {
        instructions:
          'Build a comprehensive e-commerce API with controllers for Products, Orders, and Users. Implement full CRUD operations with proper HTTP verbs, status codes, and error handling. Include authentication, authorization, input validation, custom action filters for logging and rate limiting, and comprehensive API documentation with Swagger.',
      },
    },
    {
      title: 'Routing',
      description:
        'Master URL routing patterns, route configuration, and how ASP.NET Core matches incoming requests to controller actions.',
      sections: [
        {
          title: 'Route Configuration and Patterns',
          explanation: `
        <p>Routing is the mechanism that matches incoming HTTP requests to executable endpoints in your application. Understanding routing is crucial for building intuitive URLs and properly structured APIs.</p>
        
        <h4>Conventional vs Attribute Routing</h4>
        <p><strong>Conventional routing:</strong> Uses a centralized template-based approach configured in Program.cs. Good for consistent patterns across controllers.</p>
        <p><strong>Attribute routing:</strong> Uses attributes directly on controllers and actions for more granular control. Preferred for Web APIs and complex routing scenarios.</p>

        <div class="code-example">
          <pre><code>// Conventional routing configuration
app.MapControllerRoute(
    name: "default",
    pattern: "{controller=Home}/{action=Index}/{id?}");

app.MapControllerRoute(
    name: "admin",
    pattern: "admin/{controller=Dashboard}/{action=Index}",
    defaults: new { area = "Admin" });

// Attribute routing examples
[Route("api/[controller]")]
[ApiController]
public class ProductsController : ControllerBase
{
    [HttpGet]                              // GET: api/products
    [HttpGet("search")]                    // GET: api/products/search
    [HttpGet("{id:int}")]                  // GET: api/products/5
    [HttpGet("{id:int}/reviews")]          // GET: api/products/5/reviews
    [HttpGet("category/{categoryName}")]   // GET: api/products/category/electronics
    public async Task<IActionResult> GetProducts() { }
}

// Advanced routing patterns
[Route("api/v{version:apiVersion}/[controller]")]
public class OrdersController : ControllerBase
{
    [HttpGet("{userId:guid}/orders/{orderId:int}")]
    [Route("~/api/users/{userId:guid}/orders/{orderId:int}")] // Override route
    public async Task<IActionResult> GetUserOrder(Guid userId, int orderId) { }
}
</code></pre>
        </div>

        <h4>Route Constraints and Parameters</h4>
        <p>Route constraints ensure parameters match specific patterns or types, improving routing reliability and API design.</p>

        <div class="interview-tip">
          <p><span class="interview-icon">🎯</span> <strong>Interview Focus:</strong> Demonstrate understanding of routing patterns and when to use different approaches.</p>
          <p>Key questions include: "How does route matching work?", "What are route constraints?", "When would you use attribute vs conventional routing?"</p>
        </div>
      `,
          codeExample: `// Comprehensive routing examples
[Route("api/[controller]")]
public class ProductsController : ControllerBase
{
    // Route constraints
    [HttpGet("{id:int:min(1)}")]           // Integer greater than 0
    [HttpGet("{slug:alpha}")]              // Alphabetic characters only
    [HttpGet("{date:datetime}")]           // Valid DateTime
    [HttpGet("{price:decimal:range(0,1000)}")]  // Decimal between 0-1000
    
    // Optional parameters and defaults
    [HttpGet("category/{category}/page/{page:int=1}")]
    public IActionResult GetByCategory(string category, int page = 1) { }
    
    // Multiple route templates
    [HttpGet("featured")]
    [HttpGet("special")]
    [HttpGet("popular")]
    public IActionResult GetFeaturedProducts() { }
    
    // Route with catch-all parameter
    [HttpGet("search/{*searchPath}")]      // Matches: search/electronics/phones/apple
    public IActionResult Search(string searchPath) { }
}`,
        },
      ],
      exercise: {
        instructions:
          'Design a comprehensive routing system for an e-commerce API. Create routes for products, categories, users, and orders with proper constraints, versioning, and RESTful conventions.',
      },
    },
    {
      title: 'Middleware Pipeline',
      description:
        'Understand how middleware components process HTTP requests and responses, and learn to create custom middleware for cross-cutting concerns.',
      sections: [
        {
          title: 'Middleware Architecture and Custom Components',
          explanation: `
        <p>Middleware forms the request processing pipeline in ASP.NET Core. Each middleware component can handle requests, modify responses, and pass control to the next component in the pipeline.</p>
        
        <h4>Middleware Execution Order</h4>
        <p>The order of middleware registration is crucial. Middleware executes in the order it's added for requests and in reverse order for responses.</p>

        <div class="code-example">
          <pre><code>// Middleware pipeline configuration
app.UseHttpsRedirection();     // 1. Redirect to HTTPS
app.UseStaticFiles();          // 2. Serve static files
app.UseRouting();              // 3. Route matching
app.UseAuthentication();       // 4. Authenticate user
app.UseAuthorization();        // 5. Authorize user
app.MapControllers();          // 6. Execute controller action

// Custom middleware
public class RequestTimingMiddleware
{
    private readonly RequestDelegate _next;
    private readonly ILogger<RequestTimingMiddleware> _logger;
    
    public RequestTimingMiddleware(RequestDelegate next, ILogger<RequestTimingMiddleware> logger)
    {
        _next = next;
        _logger = logger;
    }
    
    public async Task InvokeAsync(HttpContext context)
    {
        var stopwatch = Stopwatch.StartNew();
        
        await _next(context);
        
        stopwatch.Stop();
        _logger.LogInformation("Request {Path} took {ElapsedMs}ms", 
            context.Request.Path, stopwatch.ElapsedMilliseconds);
    }
}

// Registration
app.UseMiddleware<RequestTimingMiddleware>();
</code></pre>
        </div>

        <div class="interview-tip">
          <p><span class="interview-icon">🎯</span> <strong>Interview Focus:</strong> Explain middleware pipeline flow and demonstrate custom middleware creation.</p>
        </div>
      `,
          codeExample: `// Advanced middleware examples
public class SecurityHeadersMiddleware
{
    private readonly RequestDelegate _next;
    
    public SecurityHeadersMiddleware(RequestDelegate next) => _next = next;
    
    public async Task InvokeAsync(HttpContext context)
    {
        context.Response.Headers.Add("X-Content-Type-Options", "nosniff");
        context.Response.Headers.Add("X-Frame-Options", "DENY");
        context.Response.Headers.Add("X-XSS-Protection", "1; mode=block");
        
        await _next(context);
    }
}`,
        },
      ],
      exercise: {
        instructions:
          'Create a middleware pipeline with custom components for request logging, security headers, rate limiting, and error handling.',
      },
    },
    {
      title: 'Configuration and Settings',
      description:
        'Master configuration providers, options pattern, and environment-specific settings management for flexible application configuration.',
      sections: [
        {
          title: 'Configuration System Architecture and Providers',
          explanation: `
        <p>ASP.NET Core's configuration system is built around a layered architecture that allows you to compose configuration from multiple sources. Understanding this system is crucial for building flexible, maintainable applications that work across different environments.</p>
        
        <h4>Configuration Provider Hierarchy</h4>
        <p>Configuration providers are loaded in a specific order, with later providers overriding earlier ones. This hierarchy allows you to set defaults in JSON files and override them with environment variables or command-line arguments in production.</p>

        <p><strong>Default Provider Order:</strong></p>
        <ol>
          <li><strong>appsettings.json</strong> - Base configuration file</li>
          <li><strong>appsettings.{Environment}.json</strong> - Environment-specific overrides</li>
          <li><strong>User Secrets</strong> - Development-time secrets (Development only)</li>
          <li><strong>Environment Variables</strong> - System and application environment variables</li>
          <li><strong>Command Line Arguments</strong> - Runtime parameters</li>
        </ol>

        <div class="code-example">
          <pre><code>// appsettings.json - Base configuration
{
  "Logging": {
    "LogLevel": {
      "Default": "Information",
      "Microsoft.AspNetCore": "Warning"
    }
  },
  "ConnectionStrings": {
    "DefaultConnection": "Server=localhost;Database=MyApp_Dev;Trusted_Connection=true"
  },
  "JwtSettings": {
    "Secret": "development-secret-key-change-in-production",
    "Issuer": "MyApp",
    "Audience": "MyApp-Users", 
    "ExpirationMinutes": 60
  },
  "EmailSettings": {
    "SmtpServer": "localhost",
    "Port": 25,
    "UseSsl": false,
    "FromAddress": "noreply@myapp.local"
  },
  "FeatureFlags": {
    "EnableAdvancedSearch": true,
    "EnableCaching": false,
    "MaxUploadSizeMB": 10
  },
  "ApiSettings": {
    "BaseUrl": "https://api.myapp.com",
    "Timeout": 30,
    "RetryAttempts": 3
  }
}

// appsettings.Production.json - Production overrides
{
  "Logging": {
    "LogLevel": {
      "Default": "Warning",
      "MyApp": "Information"
    }
  },
  "EmailSettings": {
    "SmtpServer": "smtp.sendgrid.net",
    "Port": 587,
    "UseSsl": true
  },
  "FeatureFlags": {
    "EnableCaching": true,
    "MaxUploadSizeMB": 50
  }
}

// Program.cs - Configuration builder setup
var builder = WebApplication.CreateBuilder(args);

// Explicit configuration sources (optional - WebApplicationBuilder includes most by default)
builder.Configuration
    .SetBasePath(Directory.GetCurrentDirectory())
    .AddJsonFile("appsettings.json", optional: false, reloadOnChange: true)
    .AddJsonFile($"appsettings.{builder.Environment.EnvironmentName}.json", optional: true, reloadOnChange: true)
    .AddEnvironmentVariables()
    .AddCommandLine(args);

// Add custom configuration sources
if (builder.Environment.IsDevelopment())
{
    builder.Configuration.AddUserSecrets<Program>();
}

// Azure Key Vault in production
if (builder.Environment.IsProduction())
{
    var keyVaultUrl = builder.Configuration["KeyVaultUrl"];
    if (!string.IsNullOrEmpty(keyVaultUrl))
    {
        builder.Configuration.AddAzureKeyVault(keyVaultUrl, new DefaultAzureCredential());
    }
}
</code></pre>
        </div>

        <h4>Options Pattern and Strongly-Typed Configuration</h4>
        <p>The Options pattern provides a way to access configuration data through strongly-typed objects, offering IntelliSense support, compile-time checking, and better maintainability than accessing configuration directly.</p>

        <p><strong>Benefits of the Options Pattern:</strong></p>
        <ul>
          <li><strong>Type Safety:</strong> Compile-time checking of configuration properties</li>
          <li><strong>Validation:</strong> Built-in and custom validation of configuration values</li>
          <li><strong>Change Tracking:</strong> Automatic reloading when configuration files change</li>
          <li><strong>Dependency Injection:</strong> Seamless integration with the DI container</li>
          <li><strong>Testing:</strong> Easy to mock and test configuration-dependent code</li>
        </ul>

        <div class="code-example">
          <pre><code>// Configuration classes with validation
public class JwtSettings
{
    public const string SectionName = "JwtSettings";
    
    [Required]
    [MinLength(32, ErrorMessage = "JWT Secret must be at least 32 characters long")]
    public string Secret { get; set; }
    
    [Required]
    public string Issuer { get; set; }
    
    [Required]
    public string Audience { get; set; }
    
    [Range(1, 1440, ErrorMessage = "Expiration must be between 1 and 1440 minutes")]
    public int ExpirationMinutes { get; set; } = 60;
    
    [Range(1, 10080, ErrorMessage = "Refresh token expiration must be between 1 and 10080 minutes")]
    public int RefreshTokenExpirationMinutes { get; set; } = 10080; // 7 days
}

public class EmailSettings
{
    public const string SectionName = "EmailSettings";
    
    [Required]
    public string SmtpServer { get; set; }
    
    [Range(1, 65535)]
    public int Port { get; set; }
    
    public bool UseSsl { get; set; }
    
    [EmailAddress]
    public string FromAddress { get; set; }
    
    public string FromName { get; set; }
    
    public string Username { get; set; }
    
    public string Password { get; set; }
}

public class ApiSettings
{
    public const string SectionName = "ApiSettings";
    
    [Url]
    public string BaseUrl { get; set; }
    
    [Range(1, 300)]
    public int Timeout { get; set; } = 30;
    
    [Range(0, 10)]
    public int RetryAttempts { get; set; } = 3;
    
    public Dictionary<string, string> Headers { get; set; } = new();
}

// Registration with validation
builder.Services.Configure<JwtSettings>(
    builder.Configuration.GetSection(JwtSettings.SectionName));

builder.Services.Configure<EmailSettings>(
    builder.Configuration.GetSection(EmailSettings.SectionName));

builder.Services.Configure<ApiSettings>(
    builder.Configuration.GetSection(ApiSettings.SectionName));

// Add validation
builder.Services.AddOptions<JwtSettings>()
    .Bind(builder.Configuration.GetSection(JwtSettings.SectionName))
    .ValidateDataAnnotations()
    .ValidateOnStart();

builder.Services.AddOptions<EmailSettings>()
    .Bind(builder.Configuration.GetSection(EmailSettings.SectionName))
    .ValidateDataAnnotations()
    .Validate(settings => !string.IsNullOrEmpty(settings.SmtpServer), "SMTP Server is required")
    .ValidateOnStart();
</code></pre>
        </div>

        <h4>Advanced Configuration Scenarios</h4>
        <p><strong>Environment Variable Mapping:</strong> Environment variables use double underscores (__) to represent nested configuration sections. For example, <code>JwtSettings__Secret</code> maps to <code>JwtSettings:Secret</code>.</p>

        <p><strong>Configuration Reloading:</strong> ASP.NET Core can automatically reload configuration when files change, allowing dynamic configuration updates without application restart.</p>

        <p><strong>Secret Management:</strong> Never store secrets in configuration files. Use User Secrets for development, environment variables for deployment, or dedicated secret management services like Azure Key Vault.</p>

        <div class="code-example">
          <pre><code>// Custom configuration provider
public class DatabaseConfigurationProvider : ConfigurationProvider
{
    private readonly string _connectionString;
    
    public DatabaseConfigurationProvider(string connectionString)
    {
        _connectionString = connectionString;
    }
    
    public override void Load()
    {
        using var connection = new SqlConnection(_connectionString);
        connection.Open();
        
        using var command = new SqlCommand("SELECT [Key], [Value] FROM Configuration", connection);
        using var reader = command.ExecuteReader();
        
        var data = new Dictionary<string, string>(StringComparer.OrdinalIgnoreCase);
        
        while (reader.Read())
        {
            data[reader.GetString(0)] = reader.GetString(1);
        }
        
        Data = data;
    }
}

// Custom configuration source
public class DatabaseConfigurationSource : IConfigurationSource
{
    private readonly string _connectionString;
    
    public DatabaseConfigurationSource(string connectionString)
    {
        _connectionString = connectionString;
    }
    
    public IConfigurationProvider Build(IConfigurationBuilder builder)
    {
        return new DatabaseConfigurationProvider(_connectionString);
    }
}

// Extension method for easy registration
public static class DatabaseConfigurationExtensions
{
    public static IConfigurationBuilder AddDatabase(this IConfigurationBuilder builder, string connectionString)
    {
        return builder.Add(new DatabaseConfigurationSource(connectionString));
    }
}

// Usage
builder.Configuration.AddDatabase(connectionString);
</code></pre>
        </div>

        <h4>Configuration in Different Environments</h4>
        <p>Proper environment configuration is crucial for application security and maintainability. Each environment (Development, Staging, Production) should have appropriate configuration strategies.</p>

        <div class="code-example">
          <pre><code>// Environment-specific service registration
if (builder.Environment.IsDevelopment())
{
    // Development-specific services
    builder.Services.AddTransient<IEmailService, MockEmailService>();
    builder.Services.Configure<EmailSettings>(options =>
    {
        options.SmtpServer = "localhost";
        options.Port = 25;
        options.UseSsl = false;
    });
}
else if (builder.Environment.IsStaging())
{
    // Staging-specific services
    builder.Services.AddTransient<IEmailService, LoggingEmailService>();
}
else if (builder.Environment.IsProduction())
{
    // Production-specific services
    builder.Services.AddTransient<IEmailService, SmtpEmailService>();
    
    // Additional production configuration validation
    var jwtSecret = builder.Configuration["JwtSettings:Secret"];
    if (string.IsNullOrEmpty(jwtSecret) || jwtSecret.Length < 32)
    {
        throw new InvalidOperationException("JWT Secret must be at least 32 characters in production");
    }
}
</code></pre>
        </div>

        <div class="interview-tip">
          <p><span class="interview-icon">🎯</span> <strong>Interview Focus:</strong> Demonstrate comprehensive understanding of configuration architecture and security best practices.</p>
          <p>Key interview questions include:</p>
          <ul>
            <li>"How does configuration provider precedence work in ASP.NET Core?"</li>
            <li>"What are the benefits of the Options pattern over direct configuration access?"</li>
            <li>"How do you manage secrets securely across different environments?"</li>
            <li>"How would you implement configuration validation and error handling?"</li>
            <li>"Explain how to implement custom configuration providers"</li>
            <li>"How do you handle configuration changes without restarting the application?"</li>
          </ul>
        </div>
      `,
          codeExample: `// Complete configuration implementation example

// Configuration models with complex validation
public class DatabaseSettings
{
    public const string SectionName = "DatabaseSettings";
    
    [Required]
    public string ConnectionString { get; set; }
    
    [Range(1, 1000)]
    public int CommandTimeoutSeconds { get; set; } = 30;
    
    [Range(1, 100)]
    public int MaxRetryCount { get; set; } = 3;
    
    public bool EnableLogging { get; set; } = false;
    
    public string MigrationAssembly { get; set; }
}

public class CacheSettings
{
    public const string SectionName = "CacheSettings";
    
    public bool Enabled { get; set; } = true;
    
    [Range(1, 86400)]
    public int DefaultExpirationSeconds { get; set; } = 3600;
    
    public string RedisConnectionString { get; set; }
    
    public Dictionary<string, int> CustomExpirations { get; set; } = new();
}

// Configuration service for accessing settings
public interface IConfigurationService
{
    T GetSettings<T>() where T : class, new();
    bool IsFeatureEnabled(string featureName);
    void RefreshSettings();
}

public class ConfigurationService : IConfigurationService
{
    private readonly IServiceProvider _serviceProvider;
    private readonly IConfiguration _configuration;
    private readonly ILogger<ConfigurationService> _logger;
    
    public ConfigurationService(
        IServiceProvider serviceProvider, 
        IConfiguration configuration,
        ILogger<ConfigurationService> logger)
    {
        _serviceProvider = serviceProvider;
        _configuration = configuration;
        _logger = logger;
    }
    
    public T GetSettings<T>() where T : class, new()
    {
        try
        {
            var options = _serviceProvider.GetRequiredService<IOptions<T>>();
            return options.Value;
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Failed to get settings for type {SettingsType}", typeof(T).Name);
            return new T();
        }
    }
    
    public bool IsFeatureEnabled(string featureName)
    {
        return _configuration.GetValue<bool>($"FeatureFlags:{featureName}");
    }
    
    public void RefreshSettings()
    {
        // Trigger configuration reload
        if (_configuration is IConfigurationRoot configRoot)
        {
            configRoot.Reload();
        }
    }
}

// Program.cs - Complete configuration setup
var builder = WebApplication.CreateBuilder(args);

// Configure all settings with validation
builder.Services.AddOptions<DatabaseSettings>()
    .Bind(builder.Configuration.GetSection(DatabaseSettings.SectionName))
    .ValidateDataAnnotations()
    .Validate(settings => !string.IsNullOrEmpty(settings.ConnectionString), 
              "Database connection string is required")
    .ValidateOnStart();

builder.Services.AddOptions<CacheSettings>()
    .Bind(builder.Configuration.GetSection(CacheSettings.SectionName))
    .ValidateDataAnnotations()
    .ValidateOnStart();

builder.Services.AddOptions<JwtSettings>()
    .Bind(builder.Configuration.GetSection(JwtSettings.SectionName))
    .ValidateDataAnnotations()
    .Validate(settings => 
    {
        if (builder.Environment.IsProduction() && settings.Secret.Length < 32)
        {
            return false;
        }
        return true;
    }, "JWT Secret must be at least 32 characters in production")
    .ValidateOnStart();

// Register configuration service
builder.Services.AddSingleton<IConfigurationService, ConfigurationService>();

// Usage in controllers/services
public class ProductController : ControllerBase
{
    private readonly IConfigurationService _configService;
    private readonly DatabaseSettings _dbSettings;
    private readonly CacheSettings _cacheSettings;
    
    public ProductController(
        IConfigurationService configService,
        IOptions<DatabaseSettings> dbSettings,
        IOptions<CacheSettings> cacheSettings)
    {
        _configService = configService;
        _dbSettings = dbSettings.Value;
        _cacheSettings = cacheSettings.Value;
    }
    
    [HttpGet]
    public async Task<IActionResult> GetProducts()
    {
        // Use feature flags
        if (_configService.IsFeatureEnabled("EnableAdvancedSearch"))
        {
            // Advanced search logic
        }
        
        // Use cache settings
        if (_cacheSettings.Enabled)
        {
            // Caching logic with custom expiration
            var expiration = _cacheSettings.CustomExpirations.GetValueOrDefault("Products", 
                           _cacheSettings.DefaultExpirationSeconds);
        }
        
        return Ok();
    }
}

// Environment-specific configuration files
// appsettings.Development.json
{
  "DatabaseSettings": {
    "ConnectionString": "Server=localhost;Database=MyApp_Dev;Trusted_Connection=true",
    "EnableLogging": true
  },
  "CacheSettings": {
    "Enabled": false
  }
}

// appsettings.Production.json  
{
  "DatabaseSettings": {
    "CommandTimeoutSeconds": 60,
    "MaxRetryCount": 5,
    "EnableLogging": false
  },
  "CacheSettings": {
    "Enabled": true,
    "RedisConnectionString": "your-redis-connection-string"
  }
}`,
        },
      ],
      exercise: {
        instructions:
          'Build a comprehensive configuration system for a multi-environment application. Implement strongly-typed configuration classes with validation, custom configuration providers for database settings, feature flags system, environment-specific overrides, and a configuration service for centralized access. Include proper secret management and configuration reloading capabilities.',
      },
    },
    {
      title: 'Dependency Injection Basics',
      description:
        'Master the built-in DI container, service lifetimes, and dependency registration patterns for loosely coupled, testable applications.',
      sections: [
        {
          title: 'Dependency Injection Architecture and Service Lifetimes',
          explanation: `
        <p>Dependency Injection (DI) is a fundamental design pattern that ASP.NET Core embraces at its core. It promotes loose coupling, improves testability, and makes your applications more maintainable by inverting the control of object creation and dependency management.</p>
        
        <h4>Why Dependency Injection Matters</h4>
        <p>Without DI, classes create their own dependencies, leading to tight coupling and difficult testing. DI solves this by:</p>
        <ul>
          <li><strong>Loose Coupling:</strong> Classes depend on abstractions, not concrete implementations</li>
          <li><strong>Testability:</strong> Easy to mock dependencies for unit testing</li>
          <li><strong>Flexibility:</strong> Change implementations without modifying dependent classes</li>
          <li><strong>Single Responsibility:</strong> Classes focus on their core logic, not dependency management</li>
        </ul>

        <h4>Service Lifetimes Deep Dive</h4>
        <p>Understanding service lifetimes is crucial for memory management, performance, and avoiding common pitfalls like captive dependencies.</p>

        <p><strong>Transient Services:</strong></p>
        <ul>
          <li>Created every time they're requested from the container</li>
          <li>Best for lightweight, stateless services</li>
          <li>No shared state between instances</li>
          <li>Examples: Mappers, validators, calculators</li>
        </ul>

        <p><strong>Scoped Services:</strong></p>
        <ul>
          <li>Created once per HTTP request (or scope)</li>
          <li>Same instance shared within a single request</li>
          <li>Automatically disposed at the end of the request</li>
          <li>Examples: DbContext, business services, repositories</li>
        </ul>

        <p><strong>Singleton Services:</strong></p>
        <ul>
          <li>Created once for the entire application lifetime</li>
          <li>Same instance shared across all requests</li>
          <li>Must be thread-safe</li>
          <li>Examples: Configuration, caching services, expensive-to-create objects</li>
        </ul>

        <div class="code-example">
          <pre><code>// Service interface examples
public interface IEmailService
{
    Task SendEmailAsync(string to, string subject, string body);
    Task SendTemplateEmailAsync<T>(string to, string template, T data);
}

public interface IProductRepository
{
    Task<Product> GetByIdAsync(int id);
    Task<IEnumerable<Product>> GetAllAsync();
    Task<Product> CreateAsync(Product product);
    Task UpdateAsync(Product product);
    Task DeleteAsync(int id);
}

public interface IProductService
{
    Task<ProductDto> GetProductAsync(int id);
    Task<PagedResult<ProductDto>> GetProductsAsync(int page, int pageSize, string category = null);
    Task<ProductDto> CreateProductAsync(CreateProductDto dto);
    Task<ProductDto> UpdateProductAsync(int id, UpdateProductDto dto);
    Task DeleteProductAsync(int id);
}

public interface ICacheService
{
    Task<T> GetAsync<T>(string key);
    Task SetAsync<T>(string key, T value, TimeSpan? expiration = null);
    Task RemoveAsync(string key);
    Task RemovePatternAsync(string pattern);
}

// Implementations with different lifetimes

// Transient - Stateless utility service
public class EmailService : IEmailService
{
    private readonly ILogger<EmailService> _logger;
    private readonly EmailSettings _settings;
    
    public EmailService(ILogger<EmailService> logger, IOptions<EmailSettings> settings)
    {
        _logger = logger;
        _settings = settings.Value;
    }
    
    public async Task SendEmailAsync(string to, string subject, string body)
    {
        _logger.LogInformation("Sending email to {To} with subject {Subject}", to, subject);
        // Email sending logic here
        await Task.CompletedTask;
    }
    
    public async Task SendTemplateEmailAsync<T>(string to, string template, T data)
    {
        // Template processing logic
        var body = ProcessTemplate(template, data);
        await SendEmailAsync(to, GetSubjectFromTemplate(template), body);
    }
    
    private string ProcessTemplate<T>(string template, T data) => template; // Simplified
    private string GetSubjectFromTemplate(string template) => "Default Subject"; // Simplified
}

// Scoped - Per-request service with state
public class ProductService : IProductService
{
    private readonly IProductRepository _repository;
    private readonly IMapper _mapper;
    private readonly ILogger<ProductService> _logger;
    private readonly ICacheService _cache;
    
    public ProductService(
        IProductRepository repository,
        IMapper mapper,
        ILogger<ProductService> logger,
        ICacheService cache)
    {
        _repository = repository;
        _mapper = mapper;
        _logger = logger;
        _cache = cache;
    }
    
    public async Task<ProductDto> GetProductAsync(int id)
    {
        _logger.LogInformation("Getting product {ProductId}", id);
        
        // Check cache first
        var cacheKey = $"product_{id}";
        var cachedProduct = await _cache.GetAsync<ProductDto>(cacheKey);
        if (cachedProduct != null)
        {
            _logger.LogInformation("Product {ProductId} found in cache", id);
            return cachedProduct;
        }
        
        var product = await _repository.GetByIdAsync(id);
        if (product == null)
        {
            throw new NotFoundException($"Product with ID {id} not found");
        }
        
        var productDto = _mapper.Map<ProductDto>(product);
        
        // Cache for 30 minutes
        await _cache.SetAsync(cacheKey, productDto, TimeSpan.FromMinutes(30));
        
        return productDto;
    }
    
    public async Task<ProductDto> CreateProductAsync(CreateProductDto dto)
    {
        _logger.LogInformation("Creating new product with name {ProductName}", dto.Name);
        
        var product = _mapper.Map<Product>(dto);
        var createdProduct = await _repository.CreateAsync(product);
        
        // Invalidate relevant cache entries
        await _cache.RemovePatternAsync("products_*");
        
        return _mapper.Map<ProductDto>(createdProduct);
    }
    
    public async Task<PagedResult<ProductDto>> GetProductsAsync(int page, int pageSize, string category = null)
    {
        var cacheKey = $"products_{page}_{pageSize}_{category ?? "all"}";
        var cachedResult = await _cache.GetAsync<PagedResult<ProductDto>>(cacheKey);
        if (cachedResult != null)
        {
            return cachedResult;
        }
        
        var products = await _repository.GetPagedAsync(page, pageSize, category);
        var productDtos = _mapper.Map<IEnumerable<ProductDto>>(products.Items);
        
        var result = new PagedResult<ProductDto>
        {
            Items = productDtos,
            TotalCount = products.TotalCount,
            Page = page,
            PageSize = pageSize
        };
        
        await _cache.SetAsync(cacheKey, result, TimeSpan.FromMinutes(15));
        return result;
    }
}

// Singleton - Thread-safe caching service
public class MemoryCacheService : ICacheService
{
    private readonly IMemoryCache _cache;
    private readonly ILogger<MemoryCacheService> _logger;
    private readonly ConcurrentDictionary<string, object> _lockObjects = new();
    
    public MemoryCacheService(IMemoryCache cache, ILogger<MemoryCacheService> logger)
    {
        _cache = cache;
        _logger = logger;
    }
    
    public async Task<T> GetAsync<T>(string key)
    {
        if (_cache.TryGetValue(key, out var value))
        {
            _logger.LogDebug("Cache hit for key {Key}", key);
            return (T)value;
        }
        
        _logger.LogDebug("Cache miss for key {Key}", key);
        return default(T);
    }
    
    public async Task SetAsync<T>(string key, T value, TimeSpan? expiration = null)
    {
        var options = new MemoryCacheEntryOptions();
        
        if (expiration.HasValue)
        {
            options.SetAbsoluteExpiration(expiration.Value);
        }
        else
        {
            options.SetSlidingExpiration(TimeSpan.FromMinutes(30));
        }
        
        options.SetPriority(CacheItemPriority.Normal);
        
        _cache.Set(key, value, options);
        _logger.LogDebug("Set cache entry for key {Key} with expiration {Expiration}", key, expiration);
        
        await Task.CompletedTask;
    }
    
    public async Task RemoveAsync(string key)
    {
        _cache.Remove(key);
        _logger.LogDebug("Removed cache entry for key {Key}", key);
        await Task.CompletedTask;
    }
    
    public async Task RemovePatternAsync(string pattern)
    {
        // Note: IMemoryCache doesn't support pattern removal natively
        // This would require a more sophisticated implementation
        _logger.LogWarning("Pattern removal not supported by MemoryCache: {Pattern}", pattern);
        await Task.CompletedTask;
    }
}
</code></pre>
        </div>

        <h4>Service Registration Patterns</h4>
        <p>ASP.NET Core provides multiple ways to register services, each suitable for different scenarios:</p>

        <div class="code-example">
          <pre><code>// Program.cs - Service registration
var builder = WebApplication.CreateBuilder(args);

// Basic registration
builder.Services.AddTransient<IEmailService, EmailService>();
builder.Services.AddScoped<IProductService, ProductService>();
builder.Services.AddSingleton<ICacheService, MemoryCacheService>();

// Multiple implementations
builder.Services.AddTransient<INotificationService, EmailNotificationService>();
builder.Services.AddTransient<INotificationService, SmsNotificationService>();
builder.Services.AddTransient<INotificationService, PushNotificationService>();

// Factory pattern for complex object creation
builder.Services.AddSingleton<IHttpClientFactory, HttpClientFactory>();
builder.Services.AddTransient<IProductService>(serviceProvider =>
{
    var repository = serviceProvider.GetRequiredService<IProductRepository>();
    var mapper = serviceProvider.GetRequiredService<IMapper>();
    var logger = serviceProvider.GetRequiredService<ILogger<ProductService>>();
    var cache = serviceProvider.GetRequiredService<ICacheService>();
    
    return new ProductService(repository, mapper, logger, cache);
});

// Conditional registration based on environment
if (builder.Environment.IsDevelopment())
{
    builder.Services.AddTransient<IEmailService, MockEmailService>();
    builder.Services.AddSingleton<ICacheService, MemoryCacheService>();
}
else
{
    builder.Services.AddTransient<IEmailService, SmtpEmailService>();
    builder.Services.AddSingleton<ICacheService, RedisCacheService>();
}

// Generic repository pattern
builder.Services.AddScoped(typeof(IRepository<>), typeof(Repository<>));

// Decorator pattern
builder.Services.AddScoped<IProductService, ProductService>();
builder.Services.Decorate<IProductService, CachedProductService>();
builder.Services.Decorate<IProductService, LoggingProductService>();

// Named services using keyed services (NET 8+)
builder.Services.AddKeyedScoped<IPaymentProcessor, CreditCardPaymentProcessor>("creditcard");
builder.Services.AddKeyedScoped<IPaymentProcessor, PayPalPaymentProcessor>("paypal");
builder.Services.AddKeyedScoped<IPaymentProcessor, BankTransferPaymentProcessor>("banktransfer");
</code></pre>
        </div>

        <h4>Advanced DI Patterns and Best Practices</h4>
        <p><strong>Avoiding Captive Dependencies:</strong> Never inject a service with a shorter lifetime into a service with a longer lifetime. For example, don't inject a scoped service into a singleton.</p>

        <p><strong>Constructor Injection vs Service Locator:</strong> Prefer constructor injection over service locator pattern for better testability and explicit dependencies.</p>

        <p><strong>Interface Segregation:</strong> Create focused interfaces rather than large ones to follow the Interface Segregation Principle.</p>

        <div class="interview-tip">
          <p><span class="interview-icon">🎯</span> <strong>Interview Focus:</strong> Demonstrate deep understanding of DI principles, service lifetimes, and common pitfalls.</p>
          <p>Key interview questions include:</p>
          <ul>
            <li>"Explain the difference between the three service lifetimes and when to use each"</li>
            <li>"What is a captive dependency and how do you avoid it?"</li>
            <li>"How would you implement and test a service that depends on multiple other services?"</li>
            <li>"What are the benefits of constructor injection over property injection?"</li>
            <li>"How do you handle optional dependencies in DI?"</li>
            <li>"Explain how to implement the decorator pattern with DI"</li>
          </ul>
        </div>
      `,
          codeExample: `// Complete DI implementation with advanced patterns

// Service interfaces following SOLID principles
public interface INotificationService
{
    Task SendNotificationAsync(string recipient, string message);
    bool CanHandle(NotificationType type);
}

public interface INotificationDispatcher
{
    Task SendNotificationAsync(NotificationType type, string recipient, string message);
}

public interface IPaymentProcessor
{
    Task<PaymentResult> ProcessPaymentAsync(PaymentRequest request);
    bool SupportsPaymentMethod(PaymentMethod method);
}

// Multiple implementations
public class EmailNotificationService : INotificationService
{
    private readonly IEmailService _emailService;
    
    public EmailNotificationService(IEmailService emailService)
    {
        _emailService = emailService;
    }
    
    public async Task SendNotificationAsync(string recipient, string message)
    {
        await _emailService.SendEmailAsync(recipient, "Notification", message);
    }
    
    public bool CanHandle(NotificationType type) => type == NotificationType.Email;
}

public class SmsNotificationService : INotificationService
{
    private readonly ISmsService _smsService;
    
    public SmsNotificationService(ISmsService smsService)
    {
        _smsService = smsService;
    }
    
    public async Task SendNotificationAsync(string recipient, string message)
    {
        await _smsService.SendSmsAsync(recipient, message);
    }
    
    public bool CanHandle(NotificationType type) => type == NotificationType.Sms;
}

// Composite service that uses multiple implementations
public class NotificationDispatcher : INotificationDispatcher
{
    private readonly IEnumerable<INotificationService> _notificationServices;
    private readonly ILogger<NotificationDispatcher> _logger;
    
    public NotificationDispatcher(
        IEnumerable<INotificationService> notificationServices,
        ILogger<NotificationDispatcher> logger)
    {
        _notificationServices = notificationServices;
        _logger = logger;
    }
    
    public async Task SendNotificationAsync(NotificationType type, string recipient, string message)
    {
        var service = _notificationServices.FirstOrDefault(s => s.CanHandle(type));
        
        if (service == null)
        {
            _logger.LogWarning("No notification service found for type {NotificationType}", type);
            throw new NotSupportedException($"Notification type {type} is not supported");
        }
        
        try
        {
            await service.SendNotificationAsync(recipient, message);
            _logger.LogInformation("Notification sent successfully via {ServiceType} to {Recipient}", 
                service.GetType().Name, recipient);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Failed to send notification via {ServiceType} to {Recipient}", 
                service.GetType().Name, recipient);
            throw;
        }
    }
}

// Decorator pattern for cross-cutting concerns
public class LoggingProductService : IProductService
{
    private readonly IProductService _inner;
    private readonly ILogger<LoggingProductService> _logger;
    
    public LoggingProductService(IProductService inner, ILogger<LoggingProductService> logger)
    {
        _inner = inner;
        _logger = logger;
    }
    
    public async Task<ProductDto> GetProductAsync(int id)
    {
        _logger.LogInformation("Getting product {ProductId}", id);
        var stopwatch = Stopwatch.StartNew();
        
        try
        {
            var result = await _inner.GetProductAsync(id);
            stopwatch.Stop();
            _logger.LogInformation("Successfully retrieved product {ProductId} in {ElapsedMs}ms", 
                id, stopwatch.ElapsedMilliseconds);
            return result;
        }
        catch (Exception ex)
        {
            stopwatch.Stop();
            _logger.LogError(ex, "Failed to get product {ProductId} after {ElapsedMs}ms", 
                id, stopwatch.ElapsedMilliseconds);
            throw;
        }
    }
    
    public async Task<ProductDto> CreateProductAsync(CreateProductDto dto)
    {
        _logger.LogInformation("Creating product with name {ProductName}", dto.Name);
        
        try
        {
            var result = await _inner.CreateProductAsync(dto);
            _logger.LogInformation("Successfully created product {ProductId} with name {ProductName}", 
                result.Id, result.Name);
            return result;
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Failed to create product with name {ProductName}", dto.Name);
            throw;
        }
    }
}

// Factory pattern for complex object creation
public interface IPaymentProcessorFactory
{
    IPaymentProcessor CreateProcessor(PaymentMethod method);
}

public class PaymentProcessorFactory : IPaymentProcessorFactory
{
    private readonly IServiceProvider _serviceProvider;
    
    public PaymentProcessorFactory(IServiceProvider serviceProvider)
    {
        _serviceProvider = serviceProvider;
    }
    
    public IPaymentProcessor CreateProcessor(PaymentMethod method)
    {
        return method switch
        {
            PaymentMethod.CreditCard => _serviceProvider.GetKeyedService<IPaymentProcessor>("creditcard"),
            PaymentMethod.PayPal => _serviceProvider.GetKeyedService<IPaymentProcessor>("paypal"),
            PaymentMethod.BankTransfer => _serviceProvider.GetKeyedService<IPaymentProcessor>("banktransfer"),
            _ => throw new NotSupportedException($"Payment method {method} is not supported")
        };
    }
}

// Service registration with all patterns
public static class ServiceCollectionExtensions
{
    public static IServiceCollection AddBusinessServices(this IServiceCollection services)
    {
        // Core services
        services.AddScoped<IProductService, ProductService>();
        services.AddScoped<IOrderService, OrderService>();
        services.AddScoped<IUserService, UserService>();
        
        // Repositories
        services.AddScoped<IProductRepository, ProductRepository>();
        services.AddScoped<IOrderRepository, OrderRepository>();
        services.AddScoped<IUserRepository, UserRepository>();
        
        // Notification services
        services.AddTransient<INotificationService, EmailNotificationService>();
        services.AddTransient<INotificationService, SmsNotificationService>();
        services.AddTransient<INotificationService, PushNotificationService>();
        services.AddScoped<INotificationDispatcher, NotificationDispatcher>();
        
        // Payment processors with keyed services
        services.AddKeyedScoped<IPaymentProcessor, CreditCardPaymentProcessor>("creditcard");
        services.AddKeyedScoped<IPaymentProcessor, PayPalPaymentProcessor>("paypal");
        services.AddKeyedScoped<IPaymentProcessor, BankTransferPaymentProcessor>("banktransfer");
        services.AddScoped<IPaymentProcessorFactory, PaymentProcessorFactory>();
        
        // Decorators
        services.Decorate<IProductService, LoggingProductService>();
        services.Decorate<IProductService, CachingProductService>();
        
        return services;
    }
    
    public static IServiceCollection AddInfrastructureServices(this IServiceCollection services, 
        IConfiguration configuration, IHostEnvironment environment)
    {
        // Caching
        if (environment.IsDevelopment())
        {
            services.AddSingleton<ICacheService, MemoryCacheService>();
        }
        else
        {
            services.AddSingleton<ICacheService, RedisCacheService>();
        }
        
        // External services
        services.AddHttpClient<IWeatherService, WeatherService>(client =>
        {
            client.BaseAddress = new Uri(configuration["WeatherApi:BaseUrl"]);
            client.Timeout = TimeSpan.FromSeconds(30);
        });
        
        return services;
    }
}

// Usage in Program.cs
builder.Services.AddBusinessServices();
builder.Services.AddInfrastructureServices(builder.Configuration, builder.Environment);`,
        },
      ],
      exercise: {
        instructions:
          'Design and implement a comprehensive service architecture using dependency injection. Create a notification system with multiple providers (email, SMS, push), implement the repository pattern with decorators for logging and caching, build a payment processing system with factory pattern, and demonstrate proper service lifetime management. Include unit tests that mock dependencies effectively.',
      },
    },
  ],
  prepperSummary: `
    <h3>ASP.NET Core Fundamentals - Job Interview Summary</h3>
    
    <p>As a C# developer preparing for interviews, mastering ASP.NET Core fundamentals is essential for most web development positions. This section covered the core architectural concepts and patterns that form the foundation of modern .NET web applications.</p>
    
    <h4>Key Technical Concepts to Master:</h4>
    <ul>
      <li><strong>ASP.NET Core Architecture:</strong> Understand the host, server, middleware pipeline, and application models. Be able to explain the benefits over .NET Framework (cross-platform, performance, modularity).</li>
      <li><strong>MVC Pattern:</strong> Demonstrate clear understanding of Model-View-Controller separation, request lifecycle, and when to use ViewModels vs domain models.</li>
      <li><strong>Razor Syntax:</strong> Show proficiency with Razor templating, layouts, partial views, view components, and tag helpers. Understand security implications and XSS prevention.</li>
      <li><strong>Controllers and Actions:</strong> Master HTTP verb mapping, action results, model binding, validation, and proper error handling patterns.</li>
      <li><strong>Routing and Middleware:</strong> Understand how requests flow through the pipeline, route configuration, and middleware ordering.</li>
      <li><strong>Configuration and DI:</strong> Know how to configure services, use dependency injection effectively, and manage application settings.</li>
    </ul>
    
    <h4>Interview-Ready Skills:</h4>
    <ul>
      <li>Explain the request pipeline and middleware execution order</li>
      <li>Demonstrate proper controller design with thin controllers and service layer patterns</li>
      <li>Show understanding of authentication vs authorization concepts</li>
      <li>Discuss API design principles including RESTful conventions and proper HTTP status codes</li>
      <li>Explain how to handle cross-cutting concerns using filters and middleware</li>
      <li>Demonstrate knowledge of performance optimization techniques and best practices</li>
    </ul>
    
    <h4>Common Interview Scenarios:</h4>
    <p>Be prepared to discuss real-world scenarios like building scalable web APIs, implementing proper error handling, designing secure authentication systems, and optimizing application performance. Employers often ask about experience with specific patterns like Repository, Unit of Work, and CQRS in ASP.NET Core contexts.</p>
  `,
  challenge: {
    description:
      'Build a comprehensive Task Management API that demonstrates mastery of ASP.NET Core fundamentals. Your solution should showcase proper architecture, security, and best practices suitable for a production environment.',
    requirements: [
      'Create a multi-user task management system with authentication and authorization',
      'Implement controllers for Users, Projects, Tasks, and Comments with full CRUD operations',
      'Use proper HTTP verbs, status codes, and RESTful API design principles',
      'Implement comprehensive input validation and error handling',
      'Create both MVC views and API endpoints to demonstrate different response types',
      'Use dependency injection for services, repositories, and data access',
      'Implement custom middleware for request logging and rate limiting',
      'Add custom action filters for audit logging and performance monitoring',
      'Create comprehensive API documentation using Swagger/OpenAPI',
      'Implement proper security measures including JWT authentication and role-based authorization',
      'Use configuration providers for different environments (Development, Staging, Production)',
      'Include comprehensive logging and error handling with structured logging',
    ],
    starterCode: `// Program.cs - Application entry point
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using Microsoft.OpenApi.Models;
using System.Text;
using TaskManagement.Core.Interfaces;
using TaskManagement.Core.Services;
using TaskManagement.Infrastructure.Data;
using TaskManagement.Infrastructure.Repositories;
using TaskManagement.Web.Middleware;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container
builder.Services.AddDbContext<ApplicationDbContext>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection")));

// Identity configuration
builder.Services.AddDefaultIdentity<ApplicationUser>(options =>
{
    options.Password.RequireDigit = true;
    options.Password.RequiredLength = 8;
    options.Password.RequireNonAlphanumeric = false;
    options.Password.RequireUppercase = true;
    options.Password.RequireLowercase = true;
    options.Lockout.DefaultLockoutTimeSpan = TimeSpan.FromMinutes(5);
    options.Lockout.MaxFailedAccessAttempts = 5;
})
.AddRoles<IdentityRole>()
.AddEntityFrameworkStores<ApplicationDbContext>();

// JWT Authentication
var jwtSettings = builder.Configuration.GetSection("JwtSettings");
var key = Encoding.ASCII.GetBytes(jwtSettings["Secret"]);

builder.Services.AddAuthentication(options =>
{
    options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
    options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
})
.AddJwtBearer(options =>
{
    options.RequireHttpsMetadata = false;
    options.SaveToken = true;
    options.TokenValidationParameters = new TokenValidationParameters
    {
        ValidateIssuerSigningKey = true,
        IssuerSigningKey = new SymmetricSecurityKey(key),
        ValidateIssuer = true,
        ValidateAudience = true,
        ValidIssuer = jwtSettings["Issuer"],
        ValidAudience = jwtSettings["Audience"],
        ClockSkew = TimeSpan.Zero
    };
});

// Register services
builder.Services.AddScoped<ITaskService, TaskService>();
builder.Services.AddScoped<IProjectService, ProjectService>();
builder.Services.AddScoped<IUserService, UserService>();
builder.Services.AddScoped<ITaskRepository, TaskRepository>();
builder.Services.AddScoped<IProjectRepository, ProjectRepository>();
builder.Services.AddScoped<IUnitOfWork, UnitOfWork>();

// Add controllers and API explorer
builder.Services.AddControllers();
builder.Services.AddControllersWithViews();
builder.Services.AddEndpointsApiExplorer();

// Swagger configuration
builder.Services.AddSwaggerGen(c =>
{
    c.SwaggerDoc("v1", new OpenApiInfo 
    { 
        Title = "Task Management API", 
        Version = "v1",
        Description = "A comprehensive task management system built with ASP.NET Core"
    });
    
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
            new string[] {}
        }
    });
});

// AutoMapper
builder.Services.AddAutoMapper(typeof(Program));

// Logging
builder.Logging.ClearProviders();
builder.Logging.AddConsole();
builder.Logging.AddDebug();
if (builder.Environment.IsProduction())
{
    // Add production logging providers (e.g., Application Insights, Serilog)
}

var app = builder.Build();

// Configure the HTTP request pipeline
if (app.Environment.IsDevelopment())
{
    app.UseDeveloperExceptionPage();
    app.UseSwagger();
    app.UseSwaggerUI(c => c.SwaggerEndpoint("/swagger/v1/swagger.json", "Task Management API v1"));
}
else
{
    app.UseExceptionHandler("/Home/Error");
    app.UseHsts();
}

// Custom middleware
app.UseMiddleware<RequestLoggingMiddleware>();
app.UseMiddleware<GlobalExceptionMiddleware>();

app.UseHttpsRedirection();
app.UseStaticFiles();

app.UseRouting();

app.UseAuthentication();
app.UseAuthorization();

// Configure endpoints
app.MapControllerRoute(
    name: "default",
    pattern: "{controller=Home}/{action=Index}/{id?}");

app.MapControllers(); // For API controllers

// Seed database
using (var scope = app.Services.CreateScope())
{
    var context = scope.ServiceProvider.GetRequiredService<ApplicationDbContext>();
    var userManager = scope.ServiceProvider.GetRequiredService<UserManager<ApplicationUser>>();
    var roleManager = scope.ServiceProvider.GetRequiredService<RoleManager<IdentityRole>>();
    
    await SeedData.Initialize(context, userManager, roleManager);
}

app.Run();

// Models/Task.cs
public class TaskItem
{
    public int Id { get; set; }
    
    [Required]
    [StringLength(200)]
    public string Title { get; set; }
    
    [StringLength(1000)]
    public string Description { get; set; }
    
    public TaskStatus Status { get; set; } = TaskStatus.Todo;
    
    public TaskPriority Priority { get; set; } = TaskPriority.Medium;
    
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    
    public DateTime? DueDate { get; set; }
    
    public DateTime? CompletedAt { get; set; }
    
    [Required]
    public string UserId { get; set; }
    public ApplicationUser User { get; set; }
    
    public int? ProjectId { get; set; }
    public Project Project { get; set; }
    
    public ICollection<Comment> Comments { get; set; } = new List<Comment>();
}

public enum TaskStatus
{
    Todo,
    InProgress,
    Review,
    Done
}

public enum TaskPriority
{
    Low,
    Medium,
    High,
    Critical
}

// Continue implementing the complete solution...
// This starter code provides the foundation for a production-ready
// ASP.NET Core application demonstrating all the concepts learned
`,
  },
}

export default aspNetCoreFundamentals
