// curriculum-section6.js - Building Web APIs with .NET

const buildingWebAPIs = {
  title: 'Building Web APIs with .NET',
  description:
    'Learn how to design, build, and deploy robust RESTful APIs using .NET Core and Web API.',
  lessons: [
    {
      title: 'RESTful API Design',
      description:
        'Master the principles of REST architecture and learn to design intuitive, scalable APIs that follow industry best practices.',
      sections: [
        {
          title: 'REST Principles and Resource-Based Design',
          explanation: `
        <p>REST (Representational State Transfer) is an architectural style that emerged from Roy Fielding's doctoral dissertation in 2000. It defines six constraints that, when followed, create scalable, maintainable, and interoperable web services. Understanding these principles deeply is essential for building professional-grade APIs that stand the test of time.</p>
        
        <h4>The Six REST Architectural Constraints</h4>
        
        <p><strong>1. Client-Server Architecture:</strong> Clear separation of concerns where the client handles user interface and user state, while the server manages data storage and business logic. This separation allows both components to evolve independently, improving scalability and portability.</p>

        <p><strong>2. Statelessness:</strong> Each request from client to server must contain all information necessary to understand and process the request. The server cannot store any client context between requests. This constraint improves reliability (easier recovery from failures), scalability (no server-side session management), and visibility (each request is self-contained for monitoring).</p>

        <p><strong>3. Cacheability:</strong> Response data must be explicitly or implicitly labeled as cacheable or non-cacheable. If cacheable, the client can reuse response data for equivalent requests later. This improves performance by reducing server load and network latency.</p>

        <p><strong>4. Uniform Interface:</strong> The interface between client and server must be uniform, consisting of four sub-constraints: resource identification via URIs, resource manipulation through representations, self-descriptive messages, and hypermedia as the engine of application state (HATEOAS).</p>

        <p><strong>5. Layered System:</strong> The architecture can be composed of hierarchical layers, where each layer cannot see beyond the immediate layer it's interacting with. This enables intermediary servers (proxies, gateways, load balancers) to be inserted for security, load distribution, and caching.</p>

        <p><strong>6. Code on Demand (Optional):</strong> Servers can temporarily extend client functionality by transferring executable code (like JavaScript). This is the only optional constraint and is rarely used in modern APIs.</p>

        <h4>Resource-Centric Design Philosophy</h4>
        
        <p>In REST, everything is a resource. A resource is any meaningful concept that can be addressed via a URI. Resources are identified by URLs and manipulated through a fixed set of operations (HTTP methods). The key insight is that APIs should expose resources (nouns) and use HTTP methods to define actions (verbs) rather than embedding actions in URLs.</p>

        <p><strong>Resource Identification Principles:</strong></p>
        <ul>
          <li><strong>Addressability:</strong> Every resource should have a unique URL</li>
          <li><strong>Statelessness:</strong> URLs should not contain client state information</li>
          <li><strong>Connectedness:</strong> Resources should link to related resources</li>
          <li><strong>Uniformity:</strong> Similar resources should follow similar URL patterns</li>
        </ul>

        <div class="code-example">
          <pre><code>// REST URL Design - Good vs Bad Examples

// ✅ GOOD: Resource-focused URLs
GET    /api/products/123          // Get product by ID
POST   /api/products              // Create new product
PUT    /api/products/123          // Update product
DELETE /api/products/123          // Delete product
GET    /api/products/123/reviews  // Get product reviews

// ❌ BAD: Action-focused URLs
GET    /api/getProduct?id=123
POST   /api/createProduct
POST   /api/updateProduct?id=123
POST   /api/deleteProduct?id=123
GET    /api/getProductReviews?productId=123
</code></pre>
        </div>

        <h4>HTTP Methods and Their Semantic Meaning</h4>
        
        <p>HTTP methods provide the verbs for your resource-based nouns. Each method has specific semantics that must be respected:</p>

        <p><strong>GET:</strong> Retrieve resource representation. Must be safe (no side effects) and idempotent (multiple calls have same effect). Used for reading data without modifying server state.</p>

        <p><strong>POST:</strong> Create new resources or trigger operations. Not safe and not idempotent. Each call may create new resources or have different effects.</p>

        <p><strong>PUT:</strong> Create or completely replace a resource. Idempotent but not safe. Multiple identical calls should have the same effect as a single call.</p>

        <p><strong>PATCH:</strong> Partially modify a resource. Can be idempotent depending on implementation. Used for selective updates rather than complete replacement.</p>

        <p><strong>DELETE:</strong> Remove a resource. Idempotent but not safe. Subsequent calls to delete the same resource should return 404 Not Found.</p>

        <div class="code-example">
          <pre><code>// HTTP Method Usage Examples
GET    /api/users/123           // Retrieve user (safe, idempotent)
POST   /api/users               // Create user (not safe, not idempotent)
PUT    /api/users/123           // Replace user (not safe, idempotent)
PATCH  /api/users/123           // Update user fields (depends on implementation)
DELETE /api/users/123           // Remove user (not safe, idempotent)

// Query parameters for filtering and pagination
GET    /api/products?category=electronics&page=2&limit=20
</code></pre>
        </div>

        <h4>URL Structure and Naming Best Practices</h4>
        
        <p>Consistent URL structure makes APIs intuitive and predictable. Follow these conventions:</p>

        <p><strong>Use Plural Nouns:</strong> Collections should use plural nouns (<code>/users</code>, not <code>/user</code>) for consistency. Individual resources are accessed via the collection (<code>/users/123</code>).</p>

        <p><strong>Hierarchical Organization:</strong> Use path segments to represent resource relationships. Keep nesting shallow (maximum 2-3 levels) to avoid overly complex URLs.</p>

        <p><strong>Case Conventions:</strong> Use lowercase with hyphens (kebab-case) for better readability and avoid conflicts with case-sensitive systems.</p>

        <p><strong>Version Strategy:</strong> Include version information consistently, either in URLs (<code>/api/v1/</code>) or headers, but be consistent across your entire API.</p>

        <div class="code-example">
          <pre><code>// Well-structured URL hierarchy
/api/v1/organizations/456/teams/789/members/123
/api/v1/products/123/reviews/456/responses/789

// Query parameters for operations that don't fit resource hierarchy
GET /api/v1/products?search=laptop&sort=price&order=desc
POST /api/v1/users/123/password-reset  // Actions as resources
</code></pre>
        </div>

        <h4>HATEOAS - Hypermedia as the Engine of Application State</h4>
        
        <p>HATEOAS is perhaps the most misunderstood and least implemented REST constraint. It requires that clients navigate the API dynamically through hyperlinks provided by the server, rather than having hardcoded knowledge of URL structures. This makes APIs truly self-describing and evolvable.</p>

        <p><strong>Benefits of HATEOAS:</strong></p>
        <ul>
          <li><strong>Discoverability:</strong> Clients can discover available actions dynamically</li>
          <li><strong>Evolvability:</strong> Server can change URLs without breaking clients</li>
          <li><strong>State Management:</strong> Server guides client through application state transitions</li>
          <li><strong>Self-Documentation:</strong> Available actions are embedded in responses</li>
        </ul>

        <div class="code-example">
          <pre><code>// HATEOAS Response Example
{
  "id": 123,
  "name": "MacBook Pro",
  "price": 1999.99,
  "status": "available",
  "_links": {
    "self": { "href": "/api/v1/products/123" },
    "category": { "href": "/api/v1/categories/laptops" },
    "reviews": { "href": "/api/v1/products/123/reviews" },
    "purchase": { 
      "href": "/api/v1/orders",
      "method": "POST",
      "title": "Purchase this product"
    }
  }
}
</code></pre>
        </div>

        <h4>Error Handling and Response Design</h4>
        
        <p>Consistent error handling is crucial for API usability. Clients need predictable error responses to handle failures gracefully. Use standard HTTP status codes correctly and provide detailed error information in a consistent format.</p>

        <p><strong>Error Response Best Practices:</strong></p>
        <ul>
          <li><strong>Use Standard HTTP Status Codes:</strong> Don't return 200 OK for error conditions</li>
          <li><strong>Provide Detailed Error Information:</strong> Include error codes, messages, and context</li>
          <li><strong>Be Consistent:</strong> Use the same error response format across your entire API</li>
          <li><strong>Include Actionable Information:</strong> Help clients understand how to fix the error</li>
        </ul>

        <div class="code-example">
          <pre><code>// Consistent Error Response Format
{
  "error": {
    "code": "VALIDATION_FAILED",
    "message": "The request contains invalid data",
    "details": [
      {
        "field": "email",
        "message": "Email address is required",
        "code": "REQUIRED"
      }
    ],
    "timestamp": "2024-01-15T10:30:00Z",
    "requestId": "req_abc123"
  }
}
</code></pre>
        </div>

        <div class="interview-tip">
          <p><span class="interview-icon">🎯</span> <strong>Interview Focus:</strong> Demonstrate understanding of REST principles and ability to design intuitive APIs.</p>
          <p>Key interview questions include:</p>
          <ul>
            <li>"What are the key principles of REST architecture?"</li>
            <li>"How do you design URLs for a RESTful API?"</li>
            <li>"What is HATEOAS and when would you use it?"</li>
            <li>"How do you handle complex operations that don't fit CRUD?"</li>
            <li>"What are the trade-offs between REST and GraphQL?"</li>
            <li>"How do you handle API versioning in RESTful services?"</li>
          </ul>
        </div>
      `,
          codeExample: `// Complete RESTful API design for a blog platform

// Article management
GET    /api/v1/articles                     // List articles with pagination
GET    /api/v1/articles/{id}                // Get article details
POST   /api/v1/articles                     // Create new article
PUT    /api/v1/articles/{id}                // Update entire article
PATCH  /api/v1/articles/{id}                // Partial update (e.g., status)
DELETE /api/v1/articles/{id}                // Delete article

// Comments on articles
GET    /api/v1/articles/{id}/comments       // Get comments for article
POST   /api/v1/articles/{id}/comments       // Add comment to article
GET    /api/v1/comments/{id}                // Get specific comment
PUT    /api/v1/comments/{id}                // Update comment
DELETE /api/v1/comments/{id}                // Delete comment

// User interactions
POST   /api/v1/articles/{id}/like           // Like article
DELETE /api/v1/articles/{id}/like           // Unlike article
POST   /api/v1/articles/{id}/bookmark       // Bookmark article
GET    /api/v1/users/{id}/bookmarks         // Get user bookmarks

// Advanced queries with filtering and sorting
GET    /api/v1/articles?author={authorId}&tag=technology&status=published
GET    /api/v1/articles?q=search+term&sortBy=publishDate&order=desc
GET    /api/v1/articles?publishedAfter=2024-01-01&limit=10&offset=20

// Example response with HATEOAS
{
  "id": 456,
  "title": "Building RESTful APIs with .NET",
  "content": "...",
  "author": {
    "id": 123,
    "name": "John Doe",
    "href": "/api/v1/users/123"
  },
  "publishDate": "2024-01-15T10:00:00Z",
  "status": "published",
  "tags": ["dotnet", "api", "rest"],
  "stats": {
    "likes": 42,
    "comments": 15,
    "views": 1337
  },
  "_links": {
    "self": {"href": "/api/v1/articles/456"},
    "author": {"href": "/api/v1/users/123"},
    "comments": {"href": "/api/v1/articles/456/comments"},
    "edit": {"href": "/api/v1/articles/456", "method": "PUT"},
    "delete": {"href": "/api/v1/articles/456", "method": "DELETE"}
  }
}

// Pagination response structure
{
  "data": [
    // ... article objects
  ],
  "pagination": {
    "page": 1,
    "pageSize": 20,
    "totalItems": 150,
    "totalPages": 8,
    "hasNext": true,
    "hasPrevious": false,
    "nextPage": "/api/v1/articles?page=2&pageSize=20",
    "previousPage": null
  },
  "_links": {
    "self": {"href": "/api/v1/articles?page=1&pageSize=20"},
    "first": {"href": "/api/v1/articles?page=1&pageSize=20"},
    "last": {"href": "/api/v1/articles?page=8&pageSize=20"},
    "next": {"href": "/api/v1/articles?page=2&pageSize=20"}
  }
}`,
        },
      ],
      exercise: {
        instructions:
          'Design a complete RESTful API for a social media platform. Include endpoints for users, posts, comments, likes, follows, and direct messages. Design the URL structure, define the request/response formats, implement HATEOAS, and create comprehensive API documentation. Consider pagination, filtering, sorting, and error handling patterns.',
      },
    },
    {
      title: 'API Controllers',
      description:
        'Learn to build robust API controllers with proper structure, routing, and best practices for handling HTTP requests and responses.',
      sections: [
        {
          title: 'ControllerBase and ApiController Attribute',
          explanation: `
        <p>ASP.NET Core provides a sophisticated controller infrastructure optimized for building Web APIs. Understanding the distinction between <code>ControllerBase</code> and <code>Controller</code>, along with the powerful <code>[ApiController]</code> attribute, is fundamental to creating maintainable and feature-rich APIs.</p>
        
        <h4>ControllerBase vs Controller - Architectural Differences</h4>
        
        <p><strong>ControllerBase:</strong> The lean foundation for Web APIs, providing essential HTTP handling capabilities without view-rendering overhead. It includes request/response handling, model binding, validation, routing, and action result creation. This is your go-to choice for APIs that serve data (JSON, XML, etc.) rather than HTML pages.</p>

        <p><strong>Controller:</strong> Extends ControllerBase with MVC-specific features for rendering HTML views. It adds ViewBag, ViewData, TempData, view rendering capabilities, and partial view support. Use this only when you need to return HTML content alongside API endpoints.</p>

        <p><strong>Why Choose ControllerBase for APIs:</strong></p>
        <ul>
          <li><strong>Performance:</strong> Smaller memory footprint without view-related dependencies</li>
          <li><strong>Clarity:</strong> Makes architectural intent explicit - this is a data API, not a web page</li>
          <li><strong>Testing:</strong> Easier to unit test without view-rendering complexities</li>
          <li><strong>Maintainability:</strong> Prevents accidental mixing of API and MVC concerns</li>
        </ul>

        <h4>The ApiController Attribute - Automatic API Conventions</h4>
        
        <p>The <code>[ApiController]</code> attribute transforms regular controllers into API-optimized controllers by automatically applying several conventions that reduce boilerplate code and improve developer experience:</p>

        <p><strong>1. Automatic Model Validation:</strong> Eliminates the need to manually check <code>ModelState.IsValid</code>. If validation fails, the framework automatically returns a 400 Bad Request with detailed validation errors formatted as ProblemDetails.</p>

        <p><strong>2. Binding Source Parameter Inference:</strong> Intelligently determines where parameters come from:</p>
        <ul>
          <li><strong>[FromRoute]:</strong> Complex types in route templates</li>
          <li><strong>[FromQuery]:</strong> Simple types not in route templates</li>
          <li><strong>[FromBody]:</strong> Complex types not in route templates</li>
          <li><strong>[FromForm]:</strong> IFormFile and IFormFileCollection parameters</li>
        </ul>

        <p><strong>3. Multipart/form-data Request Inference:</strong> Automatically handles file uploads and form data without explicit configuration.</p>

        <p><strong>4. Problem Details for Error Status Codes:</strong> Returns RFC 7807 compliant error responses with structured error information instead of plain text.</p>

        <p><strong>5. Custom BadRequest Response:</strong> Provides detailed validation error information in a consistent format.</p>

        <div class="code-example">
          <pre><code>// Basic API controller with [ApiController] benefits
[ApiController]
[Route("api/[controller]")]
[Produces("application/json")]
public class ProductsController : ControllerBase
{
    private readonly IProductService _productService;
    private readonly ILogger<ProductsController> _logger;
    
    public ProductsController(IProductService productService, ILogger<ProductsController> logger)
    {
        _productService = productService;
        _logger = logger;
    }
    
    [HttpGet]
    public async Task<ActionResult<PagedResult<ProductDto>>> GetProducts(
        [FromQuery] string category = null,    // Automatic inference
        [FromQuery] int page = 1)              // from query string
    {
        // No need to check ModelState.IsValid - automatic with [ApiController]
        var products = await _productService.GetProductsAsync(category, page);
        return Ok(products);
    }
    
    [HttpGet("{id:int}")]
    public async Task<ActionResult<ProductDto>> GetProduct(int id)
    {
        var product = await _productService.GetProductByIdAsync(id);
        return product != null ? Ok(product) : NotFound();
    }
    
    [HttpPost]
    public async Task<ActionResult<ProductDto>> CreateProduct(
        [FromBody] CreateProductDto dto)       // Automatic [FromBody] inference
    {
        var product = await _productService.CreateProductAsync(dto);
        return CreatedAtAction(nameof(GetProduct), new { id = product.Id }, product);
    }
}
</code></pre>
        </div>

        <h4>Advanced Controller Patterns</h4>
        <p><strong>Base API Controller:</strong> Create a base controller with common functionality to reduce code duplication across your API controllers.</p>

        <div class="code-example">
          <pre><code>// Base API controller with common functionality
[ApiController]
[Produces("application/json")]
public abstract class BaseApiController : ControllerBase
{
    protected readonly ILogger _logger;
    
    protected BaseApiController(ILogger logger)
    {
        _logger = logger;
    }
    
    protected ActionResult HandleException(Exception ex, string operation)
    {
        var correlationId = HttpContext.TraceIdentifier;
        _logger.LogError(ex, "Error during {Operation}. CorrelationId: {CorrelationId}", 
            operation, correlationId);
        
        return ex switch
        {
            NotFoundException => NotFound(new { 
                message = ex.Message, 
                correlationId 
            }),
            BusinessValidationException => BadRequest(new { 
                message = ex.Message, 
                correlationId 
            }),
            UnauthorizedAccessException => Unauthorized(new { 
                message = "Access denied", 
                correlationId 
            }),
            _ => StatusCode(500, new { 
                message = "An unexpected error occurred", 
                correlationId 
            })
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
    
    protected ActionResult<T> CreatePagedResponse<T>(PagedResult<T> pagedResult, string routeName)
    {
        var response = new
        {
            data = pagedResult.Items,
            pagination = new
            {
                page = pagedResult.Page,
                pageSize = pagedResult.PageSize,
                totalItems = pagedResult.TotalItems,
                totalPages = pagedResult.TotalPages,
                hasNext = pagedResult.HasNext,
                hasPrevious = pagedResult.HasPrevious
            },
            links = new
            {
                self = Url.Action(routeName, new { page = pagedResult.Page, pageSize = pagedResult.PageSize }),
                first = Url.Action(routeName, new { page = 1, pageSize = pagedResult.PageSize }),
                last = Url.Action(routeName, new { page = pagedResult.TotalPages, pageSize = pagedResult.PageSize }),
                next = pagedResult.HasNext ? Url.Action(routeName, new { page = pagedResult.Page + 1, pageSize = pagedResult.PageSize }) : null,
                previous = pagedResult.HasPrevious ? Url.Action(routeName, new { page = pagedResult.Page - 1, pageSize = pagedResult.PageSize }) : null
            }
        };
        
        return Ok(response);
    }
}

// Specific controller inheriting from base
[Route("api/v1/[controller]")]
public class ProductsController : BaseApiController
{
    private readonly IProductService _productService;
    private readonly IMapper _mapper;
    
    public ProductsController(
        IProductService productService,
        IMapper mapper,
        ILogger<ProductsController> logger) : base(logger)
    {
        _productService = productService;
        _mapper = mapper;
    }
    
    [HttpGet]
    public async Task<ActionResult<PagedResult<ProductDto>>> GetProducts(
        [FromQuery] ProductQueryParameters queryParams)
    {
        try
        {
            var products = await _productService.GetProductsAsync(queryParams);
            return CreatePagedResponse(products, nameof(GetProducts));
        }
        catch (Exception ex)
        {
            return HandleException(ex, "retrieving products");
        }
    }
}
</code></pre>
        </div>

        <div class="interview-tip">
          <p><span class="interview-icon">🎯</span> <strong>Interview Focus:</strong> Demonstrate understanding of API controller patterns and best practices.</p>
          <p>Key interview questions include:</p>
          <ul>
            <li>"What's the difference between ControllerBase and Controller?"</li>
            <li>"What benefits does the [ApiController] attribute provide?"</li>
            <li>"How do you handle validation in API controllers?"</li>
            <li>"How do you structure your API controllers for maintainability?"</li>
            <li>"What are the best practices for error handling in API controllers?"</li>
            <li>"How do you implement consistent response formats across your API?"</li>
          </ul>
        </div>
      `,
          codeExample: `// Complete API controller with advanced features

[ApiController]
[Route("api/v1/[controller]")]
public class OrdersController : BaseApiController
{
    private readonly IOrderService _orderService;
    private readonly IMapper _mapper;
    
    public OrdersController(
        IOrderService orderService,
        IMapper mapper,
        ILogger<OrdersController> logger) : base(logger)
    {
        _orderService = orderService;
        _mapper = mapper;
    }
    
    /// <summary>
    /// Gets orders for the current user with filtering and pagination
    /// </summary>
    [HttpGet]
    [Authorize]
    [ProducesResponseType(typeof(PagedResult<OrderDto>), 200)]
    [ProducesResponseType(401)]
    public async Task<ActionResult<PagedResult<OrderDto>>> GetOrders(
        [FromQuery] OrderQueryParameters queryParams)
    {
        try
        {
            var userId = GetUserId();
            var orders = await _orderService.GetUserOrdersAsync(userId, queryParams);
            return CreatePagedResponse(orders, nameof(GetOrders));
        }
        catch (Exception ex)
        {
            return HandleException(ex, "retrieving orders");
        }
    }
    
    /// <summary>
    /// Gets a specific order by ID
    /// </summary>
    [HttpGet("{id:int}")]
    [Authorize]
    [ProducesResponseType(typeof(OrderDto), 200)]
    [ProducesResponseType(404)]
    [ProducesResponseType(403)]
    public async Task<ActionResult<OrderDto>> GetOrder(int id)
    {
        try
        {
            var order = await _orderService.GetOrderByIdAsync(id);
            if (order == null) return NotFound();
            
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
    /// Creates a new order
    /// </summary>
    [HttpPost]
    [Authorize]
    [ProducesResponseType(typeof(OrderDto), 201)]
    [ProducesResponseType(400)]
    public async Task<ActionResult<OrderDto>> CreateOrder([FromBody] CreateOrderDto createOrderDto)
    {
        try
        {
            var userId = GetUserId();
            createOrderDto.UserId = userId;
            
            var order = await _orderService.CreateOrderAsync(createOrderDto);
            var orderDto = _mapper.Map<OrderDto>(order);
            
            return CreatedAtAction(nameof(GetOrder), new { id = order.Id }, orderDto);
        }
        catch (Exception ex)
        {
            return HandleException(ex, "creating order");
        }
    }
    
    /// <summary>
    /// Updates order status (Admin only)
    /// </summary>
    [HttpPatch("{id:int}/status")]
    [Authorize(Roles = "Admin")]
    [ProducesResponseType(200)]
    [ProducesResponseType(404)]
    [ProducesResponseType(403)]
    public async Task<IActionResult> UpdateOrderStatus(int id, [FromBody] UpdateOrderStatusDto statusDto)
    {
        try
        {
            await _orderService.UpdateOrderStatusAsync(id, statusDto.Status, statusDto.Notes);
            return Ok(new { message = "Order status updated successfully" });
        }
        catch (Exception ex)
        {
            return HandleException(ex, $"updating order {id} status");
        }
    }
    
    /// <summary>
    /// Cancels an order
    /// </summary>
    [HttpPost("{id:int}/cancel")]
    [Authorize]
    [ProducesResponseType(200)]
    [ProducesResponseType(404)]
    [ProducesResponseType(403)]
    [ProducesResponseType(400)]
    public async Task<IActionResult> CancelOrder(int id, [FromBody] CancelOrderDto cancelDto)
    {
        try
        {
            var order = await _orderService.GetOrderByIdAsync(id);
            if (order == null) return NotFound();
            
            if (!IsUserAuthorized(order.UserId))
            {
                return Forbid("You don't have permission to cancel this order");
            }
            
            await _orderService.CancelOrderAsync(id, cancelDto.Reason);
            return Ok(new { message = "Order cancelled successfully" });
        }
        catch (Exception ex)
        {
            return HandleException(ex, $"cancelling order {id}");
        }
    }
    
    /// <summary>
    /// Gets order statistics (Admin only)
    /// </summary>
    [HttpGet("statistics")]
    [Authorize(Roles = "Admin")]
    [ProducesResponseType(typeof(OrderStatisticsDto), 200)]
    public async Task<ActionResult<OrderStatisticsDto>> GetOrderStatistics(
        [FromQuery] DateTime? fromDate = null,
        [FromQuery] DateTime? toDate = null)
    {
        try
        {
            var stats = await _orderService.GetOrderStatisticsAsync(fromDate, toDate);
            return Ok(stats);
        }
        catch (Exception ex)
        {
            return HandleException(ex, "retrieving order statistics");
        }
    }
}

// Query parameters class for clean parameter binding
public class OrderQueryParameters
{
    public OrderStatus? Status { get; set; }
    public DateTime? FromDate { get; set; }
    public DateTime? ToDate { get; set; }
    public int Page { get; set; } = 1;
    public int PageSize { get; set; } = 10;
    public string SortBy { get; set; } = "CreatedAt";
    public string SortOrder { get; set; } = "desc";
}`,
        },
      ],
      exercise: {
        instructions:
          'Create a comprehensive API controller for a library management system. Implement endpoints for books, authors, borrowers, and loans. Include proper validation, error handling, pagination, filtering, and authorization. Use base controller patterns and ensure all endpoints follow RESTful conventions.',
      },
    },
    {
      title: 'HTTP Methods and Status Codes',
      description:
        'Master the proper use of HTTP methods and status codes to create APIs that follow web standards and communicate clearly with clients.',
      sections: [
        {
          title: 'HTTP Methods and Their Proper Usage',
          explanation: `
        <p>HTTP methods (verbs) are fundamental to RESTful design, defining the intended action for resources. Each method has specific semantic meaning, safety characteristics, and idempotency properties that must be understood and respected. Proper method usage creates predictable, cacheable, and maintainable APIs.</p>
        
        <h4>Understanding Safety and Idempotency</h4>
        
        <p><strong>Safe Methods:</strong> Operations that don't modify server state or cause side effects. Safe methods can be cached and called repeatedly without concern. These include GET, HEAD, and OPTIONS.</p>

        <p><strong>Idempotent Methods:</strong> Operations where multiple identical requests have the same effect as a single request. Critical for reliable systems where network issues might cause retries. These include GET, PUT, DELETE, HEAD, and OPTIONS.</p>

        <p><strong>Non-Safe, Non-Idempotent:</strong> POST is the only common method that is neither safe nor idempotent, making it suitable for operations that create new resources or trigger side effects.</p>

        <h4>GET - Safe and Idempotent Retrieval</h4>
        
        <p><strong>Purpose:</strong> Retrieve resource representations without modifying server state. GET is the foundation of web browsing and API consumption, designed for safe, repeatable read operations.</p>

        <p><strong>Key Characteristics:</strong></p>
        <ul>
          <li><strong>Cacheable:</strong> Responses can be cached by browsers, CDNs, and proxies</li>
          <li><strong>Bookmarkable:</strong> URLs should be stable and meaningful</li>
          <li><strong>Conditional Requests:</strong> Support ETags and Last-Modified headers</li>
          <li><strong>Query Parameters:</strong> Use for filtering, sorting, pagination, and search</li>
        </ul>

        <p><strong>Common Anti-Patterns to Avoid:</strong></p>
        <ul>
          <li>Using GET for operations that modify data</li>
          <li>Embedding sensitive data in query parameters (logged in access logs)</li>
          <li>Creating overly complex query parameter structures</li>
          <li>Returning inconsistent data structures for the same endpoint</li>
        </ul>

        <div class="code-example">
          <pre><code>// GET with caching and conditional requests
[HttpGet]
public async Task<ActionResult<PagedResult<ProductDto>>> GetProducts(
    [FromQuery] string category = null,
    [FromQuery] int page = 1,
    [FromQuery] string sort = "name")
{
    var products = await _productService.GetProductsAsync(category, page, sort);
    
    // Add caching headers
    Response.Headers.Add("Cache-Control", "public, max-age=300");
    Response.Headers.Add("ETag", GenerateETag(products));
    
    return Ok(products);
}

[HttpGet("{id:int}")]
public async Task<ActionResult<ProductDto>> GetProduct(int id)
{
    var product = await _productService.GetProductByIdAsync(id);
    if (product == null) return NotFound();
    
    // Support conditional requests for caching
    var etag = GenerateETag(product);
    Response.Headers.Add("ETag", etag);
    
    if (Request.Headers["If-None-Match"] == etag)
        return StatusCode(304); // Not Modified
    
    return Ok(product);
}
</code></pre>
        </div>

        <h4>POST - Non-Safe, Non-Idempotent Creation</h4>
        
        <p><strong>Purpose:</strong> Create new resources or trigger operations with side effects. POST is the workhorse of APIs, handling operations that don't fit other HTTP methods.</p>

        <p><strong>Key Use Cases:</strong></p>
        <ul>
          <li><strong>Resource Creation:</strong> When the server assigns resource identifiers</li>
          <li><strong>Actions and Commands:</strong> Operations that don't map to CRUD (activate, process, send)</li>
          <li><strong>Batch Operations:</strong> Processing multiple items in a single request</li>
          <li><strong>Complex Queries:</strong> When query parameters become too complex</li>
        </ul>

        <p><strong>Response Patterns:</strong></p>
        <ul>
          <li><strong>201 Created:</strong> Resource successfully created, includes Location header</li>
          <li><strong>200 OK:</strong> Operation completed, response contains data</li>
          <li><strong>202 Accepted:</strong> Request queued for asynchronous processing</li>
          <li><strong>204 No Content:</strong> Operation completed, no response data</li>
        </ul>

        <div class="code-example">
          <pre><code>// POST for resource creation
[HttpPost]
public async Task<ActionResult<ProductDto>> CreateProduct([FromBody] CreateProductDto dto)
{
    var product = await _productService.CreateProductAsync(dto);
    return CreatedAtAction(nameof(GetProduct), new { id = product.Id }, product);
}

// POST for actions/commands
[HttpPost("{id:int}/activate")]
public async Task<IActionResult> ActivateProduct(int id)
{
    await _productService.ActivateProductAsync(id);
    return Ok(new { message = "Product activated" });
}

// POST for complex operations
[HttpPost("search")]
public async Task<ActionResult<List<ProductDto>>> SearchProducts([FromBody] SearchCriteria criteria)
{
    var results = await _productService.SearchAsync(criteria);
    return Ok(results);
}
</code></pre>
        </div>

        <h4>PUT - Idempotent Full Replacement</h4>
        
        <p><strong>Purpose:</strong> Completely replace a resource or create it if it doesn't exist. PUT's idempotency makes it safe for retries and suitable for scenarios where you want deterministic outcomes.</p>

        <p><strong>Key Characteristics:</strong></p>
        <ul>
          <li><strong>Complete Replacement:</strong> The entire resource is replaced with the provided representation</li>
          <li><strong>Idempotent:</strong> Multiple identical requests have the same effect</li>
          <li><strong>Upsert Semantics:</strong> Can create if resource doesn't exist (optional)</li>
          <li><strong>Client-Provided IDs:</strong> Often used when clients control resource identifiers</li>
        </ul>

        <div class="code-example">
          <pre><code>// PUT for complete resource replacement
[HttpPut("{id:int}")]
public async Task<ActionResult<ProductDto>> UpdateProduct(int id, [FromBody] ProductDto dto)
{
    var updated = await _productService.ReplaceProductAsync(id, dto);
    return updated != null ? Ok(updated) : NotFound();
}

// PUT with upsert semantics
[HttpPut("{id:int}")]
public async Task<ActionResult<ProductDto>> UpsertProduct(int id, [FromBody] ProductDto dto)
{
    var (product, created) = await _productService.UpsertProductAsync(id, dto);
    return created 
        ? CreatedAtAction(nameof(GetProduct), new { id }, product)
        : Ok(product);
}
</code></pre>
        </div>

        <h4>PATCH - Targeted Partial Updates</h4>
        
        <p><strong>Purpose:</strong> Apply partial modifications to a resource. PATCH is more efficient than PUT when you only need to change specific fields, especially for large resources.</p>

        <p><strong>Implementation Strategies:</strong></p>
        <ul>
          <li><strong>JSON Patch (RFC 6902):</strong> Standardized format with operations like add, remove, replace</li>
          <li><strong>Merge Patch (RFC 7396):</strong> Simple object merge semantics</li>
          <li><strong>Custom Patch:</strong> Domain-specific partial update DTOs</li>
        </ul>

        <div class="code-example">
          <pre><code>// PATCH with JSON Patch standard
[HttpPatch("{id:int}")]
public async Task<ActionResult<ProductDto>> PatchProduct(
    int id, [FromBody] JsonPatchDocument<ProductDto> patch)
{
    var product = await _productService.GetProductByIdAsync(id);
    if (product == null) return NotFound();
    
    patch.ApplyTo(product, ModelState);
    if (!ModelState.IsValid) return BadRequest(ModelState);
    
    await _productService.UpdateProductAsync(product);
    return Ok(product);
}

// PATCH with simple field updates
[HttpPatch("{id:int}/status")]
public async Task<IActionResult> UpdateStatus(int id, [FromBody] StatusUpdateDto dto)
{
    await _productService.UpdateStatusAsync(id, dto.Status);
    return NoContent();
}
</code></pre>
        </div>

        <h4>DELETE - Idempotent Resource Removal</h4>
        
        <p><strong>Purpose:</strong> Remove resources from the server. DELETE's idempotency means that deleting an already-deleted resource should not be treated as an error.</p>

        <p><strong>Implementation Considerations:</strong></p>
        <ul>
          <li><strong>Hard vs Soft Delete:</strong> Permanent removal vs marking as deleted</li>
          <li><strong>Cascade Behavior:</strong> What happens to related resources</li>
          <li><strong>Authorization:</strong> Who can delete what resources</li>
          <li><strong>Audit Trail:</strong> Logging deletion events for compliance</li>
        </ul>

        <div class="code-example">
          <pre><code>// DELETE with proper status codes
[HttpDelete("{id:int}")]
public async Task<IActionResult> DeleteProduct(int id)
{
    var deleted = await _productService.DeleteProductAsync(id);
    return deleted ? NoContent() : NotFound();
}

// DELETE with constraint handling
[HttpDelete("{id:int}")]
public async Task<IActionResult> DeleteProductSafe(int id)
{
    try
    {
        await _productService.DeleteProductAsync(id);
        return NoContent();
    }
    catch (ConstraintViolationException)
    {
        return Conflict("Cannot delete: product has active orders");
    }
}
</code></pre>
        </div>

        <h4>HTTP Status Code Strategy</h4>
        
        <p>Status codes communicate the outcome of operations to clients, enabling proper error handling and user experience. Use standard codes consistently across your API.</p>

        <p><strong>Success Status Codes (2xx):</strong></p>
        <ul>
          <li><strong>200 OK:</strong> Standard success with response body</li>
          <li><strong>201 Created:</strong> Resource created, includes Location header</li>
          <li><strong>202 Accepted:</strong> Request accepted for async processing</li>
          <li><strong>204 No Content:</strong> Success without response body (updates, deletes)</li>
        </ul>

        <p><strong>Client Error Codes (4xx):</strong></p>
        <ul>
          <li><strong>400 Bad Request:</strong> Malformed request or validation errors</li>
          <li><strong>401 Unauthorized:</strong> Authentication required or failed</li>
          <li><strong>403 Forbidden:</strong> Access denied despite valid authentication</li>
          <li><strong>404 Not Found:</strong> Resource doesn't exist</li>
          <li><strong>409 Conflict:</strong> Request conflicts with current resource state</li>
          <li><strong>422 Unprocessable Entity:</strong> Valid syntax but business rule violations</li>
        </ul>

        <p><strong>Server Error Codes (5xx):</strong></p>
        <ul>
          <li><strong>500 Internal Server Error:</strong> Unexpected server error</li>
          <li><strong>502 Bad Gateway:</strong> Invalid response from upstream server</li>
          <li><strong>503 Service Unavailable:</strong> Server temporarily overloaded</li>
        </ul>

        <div class="interview-tip">
          <p><span class="interview-icon">🎯</span> <strong>Interview Focus:</strong> Demonstrate understanding of HTTP semantics and status code usage.</p>
          <p>Key interview questions include:</p>
          <ul>
            <li>"When would you use PUT vs PATCH vs POST for updates?"</li>
            <li>"What's the difference between 401 and 403 status codes?"</li>
            <li>"How do you handle idempotency in your API design?"</li>
            <li>"What status code should you return for successful resource creation?"</li>
            <li>"How do you implement proper caching with GET requests?"</li>
            <li>"What's the difference between 400 and 422 status codes?"</li>
          </ul>
        </div>
      `,
          codeExample: `// Comprehensive HTTP methods implementation

[ApiController]
[Route("api/v1/[controller]")]
public class ArticlesController : BaseApiController
{
    private readonly IArticleService _articleService;
    
    public ArticlesController(IArticleService articleService, ILogger<ArticlesController> logger) 
        : base(logger) 
    {
        _articleService = articleService;
    }
    
    // GET - Retrieve articles with advanced filtering
    [HttpGet]
    [ProducesResponseType(typeof(PagedResult<ArticleDto>), 200)]
    [ProducesResponseType(400)]
    public async Task<ActionResult<PagedResult<ArticleDto>>> GetArticles(
        [FromQuery] ArticleQueryParameters queryParams)
    {
        if (!ModelState.IsValid)
            return BadRequest(ModelState);
            
        var articles = await _articleService.GetArticlesAsync(queryParams);
        
        // Add caching and pagination headers
        Response.Headers.Add("Cache-Control", "public, max-age=300");
        Response.Headers.Add("X-Total-Count", articles.TotalItems.ToString());
        
        return Ok(articles);
    }
    
    // GET - Retrieve single article with conditional requests
    [HttpGet("{id:int}")]
    [ProducesResponseType(typeof(ArticleDto), 200)]
    [ProducesResponseType(304)] // Not Modified
    [ProducesResponseType(404)]
    public async Task<ActionResult<ArticleDto>> GetArticle(int id)
    {
        var article = await _articleService.GetArticleByIdAsync(id);
        if (article == null)
            return NotFound();
            
        var etag = GenerateETag(article);
        Response.Headers.Add("ETag", etag);
        
        // Support conditional requests
        if (Request.Headers.ContainsKey("If-None-Match") &&
            Request.Headers["If-None-Match"].ToString() == etag)
        {
            return StatusCode(304); // Not Modified
        }
        
        return Ok(article);
    }
    
    // POST - Create new article
    [HttpPost]
    [Authorize]
    [ProducesResponseType(typeof(ArticleDto), 201)]
    [ProducesResponseType(400)]
    [ProducesResponseType(409)] // Conflict
    public async Task<ActionResult<ArticleDto>> CreateArticle([FromBody] CreateArticleDto createDto)
    {
        try
        {
            var userId = GetUserId();
            var article = await _articleService.CreateArticleAsync(createDto, userId);
            
            return CreatedAtAction(
                nameof(GetArticle), 
                new { id = article.Id }, 
                article);
        }
        catch (DuplicateSlugException ex)
        {
            return Conflict(new { message = ex.Message, field = "slug" });
        }
    }
    
    // PUT - Full article update (replace entire resource)
    [HttpPut("{id:int}")]
    [Authorize]
    [ProducesResponseType(typeof(ArticleDto), 200)]
    [ProducesResponseType(201)] // Created (if upsert)
    [ProducesResponseType(403)]
    [ProducesResponseType(404)]
    public async Task<ActionResult<ArticleDto>> UpdateArticle(int id, [FromBody] UpdateArticleDto updateDto)
    {
        var existingArticle = await _articleService.GetArticleByIdAsync(id);
        
        if (existingArticle == null)
        {
            // Optional: Support upsert for PUT
            if (_articleService.SupportsUpsert)
            {
                var newArticle = await _articleService.CreateArticleAsync(updateDto, GetUserId(), id);
                return CreatedAtAction(nameof(GetArticle), new { id }, newArticle);
            }
            return NotFound();
        }
        
        if (!IsUserAuthorized(existingArticle.AuthorId))
            return Forbid();
            
        var updatedArticle = await _articleService.UpdateArticleAsync(id, updateDto);
        return Ok(updatedArticle);
    }
    
    // PATCH - Partial article update using JSON Patch
    [HttpPatch("{id:int}")]
    [Authorize]
    [ProducesResponseType(typeof(ArticleDto), 200)]
    [ProducesResponseType(400)]
    [ProducesResponseType(403)]
    [ProducesResponseType(404)]
    public async Task<ActionResult<ArticleDto>> PatchArticle(
        int id, 
        [FromBody] JsonPatchDocument<UpdateArticleDto> patchDocument)
    {
        if (patchDocument == null)
            return BadRequest("Patch document is required");
            
        var existingArticle = await _articleService.GetArticleByIdAsync(id);
        if (existingArticle == null)
            return NotFound();
            
        if (!IsUserAuthorized(existingArticle.AuthorId))
            return Forbid();
            
        var updateDto = _mapper.Map<UpdateArticleDto>(existingArticle);
        patchDocument.ApplyTo(updateDto, ModelState);
        
        if (!ModelState.IsValid)
            return BadRequest(ModelState);
            
        var updatedArticle = await _articleService.UpdateArticleAsync(id, updateDto);
        return Ok(updatedArticle);
    }
    
    // PATCH - Simple status update
    [HttpPatch("{id:int}/status")]
    [Authorize]
    [ProducesResponseType(204)]
    [ProducesResponseType(400)]
    [ProducesResponseType(403)]
    [ProducesResponseType(404)]
    public async Task<IActionResult> UpdateArticleStatus(int id, [FromBody] UpdateStatusDto statusDto)
    {
        var article = await _articleService.GetArticleByIdAsync(id);
        if (article == null)
            return NotFound();
            
        if (!IsUserAuthorized(article.AuthorId))
            return Forbid();
            
        await _articleService.UpdateArticleStatusAsync(id, statusDto.Status);
        return NoContent();
    }
    
    // DELETE - Remove article
    [HttpDelete("{id:int}")]
    [Authorize]
    [ProducesResponseType(204)]
    [ProducesResponseType(403)]
    [ProducesResponseType(404)]
    [ProducesResponseType(409)] // Conflict
    public async Task<IActionResult> DeleteArticle(int id)
    {
        var article = await _articleService.GetArticleByIdAsync(id);
        if (article == null)
            return NotFound();
            
        if (!IsUserAuthorized(article.AuthorId))
            return Forbid();
            
        try
        {
            await _articleService.DeleteArticleAsync(id);
            return NoContent();
        }
        catch (ConstraintViolationException ex)
        {
            return Conflict(new { message = ex.Message });
        }
    }
    
    // POST - Non-resource operations
    [HttpPost("{id:int}/publish")]
    [Authorize]
    [ProducesResponseType(200)]
    [ProducesResponseType(400)]
    [ProducesResponseType(403)]
    [ProducesResponseType(404)]
    public async Task<IActionResult> PublishArticle(int id)
    {
        try
        {
            await _articleService.PublishArticleAsync(id, GetUserId());
            return Ok(new { message = "Article published successfully" });
        }
        catch (InvalidOperationException ex)
        {
            return BadRequest(new { message = ex.Message });
        }
    }
    
    // HEAD - Check resource existence without transferring content
    [HttpHead("{id:int}")]
    [ProducesResponseType(200)]
    [ProducesResponseType(404)]
    public async Task<IActionResult> CheckArticleExists(int id)
    {
        var exists = await _articleService.ArticleExistsAsync(id);
        return exists ? Ok() : NotFound();
    }
    
    // OPTIONS - Return allowed methods for resource
    [HttpOptions]
    [HttpOptions("{id:int}")]
    public IActionResult GetArticleOptions()
    {
        Response.Headers.Add("Allow", "GET, POST, PUT, PATCH, DELETE, HEAD, OPTIONS");
        Response.Headers.Add("Access-Control-Allow-Methods", "GET, POST, PUT, PATCH, DELETE");
        return Ok();
    }
}`,
        },
      ],
      exercise: {
        instructions:
          'Build a complete CRUD API for a task management system. Implement all HTTP methods (GET, POST, PUT, PATCH, DELETE) with proper status codes, support conditional requests with ETag headers, implement bulk operations, and handle various error scenarios. Include proper validation and authorization checks.',
      },
    },
    {
      title: 'Model Binding and Validation',
      description:
        'Learn how ASP.NET Core automatically maps request data to action parameters and implement comprehensive validation strategies.',
      sections: [
        {
          title: 'Model Binding Sources and Techniques',
          explanation: `
        <p>Model binding is the process of mapping HTTP request data to action method parameters. ASP.NET Core provides powerful and flexible model binding capabilities that can automatically extract data from various sources in the request.</p>
        
        <h4>Binding Sources</h4>
        <p>The <code>[ApiController]</code> attribute enables automatic binding source inference, but you can explicitly specify sources for complex scenarios:</p>

        <ul>
          <li><strong>[FromRoute]:</strong> Binds from route parameters in the URL path</li>
          <li><strong>[FromQuery]:</strong> Binds from query string parameters</li>
          <li><strong>[FromBody]:</strong> Binds from the request body (JSON, XML, etc.)</li>
          <li><strong>[FromForm]:</strong> Binds from form data (application/x-www-form-urlencoded)</li>
          <li><strong>[FromHeader]:</strong> Binds from HTTP headers</li>
          <li><strong>[FromServices]:</strong> Binds from dependency injection container</li>
        </ul>

        <div class="code-example">
          <pre><code>// Model binding examples
[HttpGet("{id:int}")]
public async Task<ActionResult<ProductDto>> GetProduct(
    [FromRoute] int id,                    // From URL path
    [FromQuery] bool includeReviews = false,  // From query string
    [FromHeader(Name = "Accept-Language")] string language = "en")  // From header
{
    var product = await _productService.GetProductAsync(id, includeReviews, language);
    return Ok(product);
}

[HttpPost]
public async Task<ActionResult<ProductDto>> CreateProduct(
    [FromBody] CreateProductDto productDto,     // From request body
    [FromHeader(Name = "X-Correlation-ID")] string correlationId,
    [FromServices] ILogger<ProductsController> logger)  // From DI container
{
    logger.LogInformation("Creating product with correlation ID: {CorrelationId}", correlationId);
    
    var product = await _productService.CreateProductAsync(productDto);
    return CreatedAtAction(nameof(GetProduct), new { id = product.Id }, product);
}

// Complex binding with multiple sources
[HttpPost("search")]
public async Task<ActionResult<PagedResult<ProductDto>>> SearchProducts(
    [FromQuery] ProductSearchQuery searchQuery,  // Complex object from query string
    [FromBody] ProductSearchFilters filters,     // Complex object from body
    [FromHeader] string userAgent)
{
    var results = await _productService.SearchProductsAsync(searchQuery, filters);
    return Ok(results);
}

// Custom model binding with IModelBinder
[HttpGet("by-slug/{slug}")]
public async Task<ActionResult<ProductDto>> GetProductBySlug(
    [ModelBinder(typeof(SlugModelBinder))] string slug)
{
    var product = await _productService.GetProductBySlugAsync(slug);
    return product != null ? Ok(product) : NotFound();
}
</code></pre>
        </div>

        <h4>Complex Model Binding Scenarios</h4>
        <p><strong>Collections and Arrays:</strong> ASP.NET Core can bind to collections from various sources with different formats.</p>

        <div class="code-example">
          <pre><code>// Collection binding examples
[HttpPost("bulk")]
public async Task<IActionResult> CreateProducts([FromBody] List<CreateProductDto> products)
{
    var results = await _productService.CreateProductsAsync(products);
    return Ok(results);
}

// Query string collection binding
// URL: /api/products/filter?categories=electronics&categories=books&categories=toys
[HttpGet("filter")]
public async Task<ActionResult<List<ProductDto>>> FilterProducts(
    [FromQuery] List<string> categories,
    [FromQuery] decimal[] priceRanges)
{
    var products = await _productService.FilterProductsAsync(categories, priceRanges);
    return Ok(products);
}

// Form collection binding
[HttpPost("upload")]
public async Task<IActionResult> UploadProductImages(
    [FromForm] int productId,
    [FromForm] IFormFileCollection images,
    [FromForm] List<string> descriptions)
{
    await _productService.UploadImagesAsync(productId, images, descriptions);
    return Ok();
}
</code></pre>
        </div>

        <h4>Custom Model Binders</h4>
        <p>Create custom model binders for complex binding scenarios or custom data types.</p>

        <div class="code-example">
          <pre><code>// Custom model binder for comma-separated values
public class CommaDelimitedModelBinder : IModelBinder
{
    public Task BindModelAsync(ModelBindingContext bindingContext)
    {
        var value = bindingContext.ValueProvider.GetValue(bindingContext.ModelName);
        
        if (value == ValueProviderResult.None)
        {
            return Task.CompletedTask;
        }
        
        var stringValue = value.FirstValue;
        
        if (string.IsNullOrEmpty(stringValue))
        {
            return Task.CompletedTask;
        }
        
        var elementType = bindingContext.ModelType.GetElementType() ?? 
                         bindingContext.ModelType.GetGenericArguments().FirstOrDefault();
        
        if (elementType == null)
        {
            return Task.CompletedTask;
        }
        
        var converter = TypeDescriptor.GetConverter(elementType);
        var values = stringValue.Split(',')
                               .Select(x => converter.ConvertFromString(x.Trim()))
                               .ToArray();
        
        var typedValues = Array.CreateInstance(elementType, values.Length);
        values.CopyTo(typedValues, 0);
        
        bindingContext.Result = ModelBindingResult.Successful(typedValues);
        return Task.CompletedTask;
    }
}

// Model binder provider
public class CommaDelimitedModelBinderProvider : IModelBinderProvider
{
    public IModelBinder GetBinder(ModelBinderProviderContext context)
    {
        if (context.Metadata.ModelType.IsArray || 
            (context.Metadata.ModelType.IsGenericType && 
             context.Metadata.ModelType.GetGenericTypeDefinition() == typeof(List<>)))
        {
            return new CommaDelimitedModelBinder();
        }
        
        return null;
    }
}

// Register in Program.cs
builder.Services.Configure<MvcOptions>(options =>
{
    options.ModelBinderProviders.Insert(0, new CommaDelimitedModelBinderProvider());
});

// Usage with custom model binder
[HttpGet("by-tags")]
public async Task<ActionResult<List<ProductDto>>> GetProductsByTags(
    [FromQuery, ModelBinder(typeof(CommaDelimitedModelBinder))] List<string> tags)
{
    // URL: /api/products/by-tags?tags=electronics,mobile,apple
    var products = await _productService.GetProductsByTagsAsync(tags);
    return Ok(products);
}
</code></pre>
        </div>

        <h4>Validation Strategies</h4>
        <p>Implement comprehensive validation using Data Annotations, FluentValidation, and custom validation attributes.</p>

        <div class="code-example">
          <pre><code>// Data Annotations validation
public class CreateProductDto
{
    [Required(ErrorMessage = "Product name is required")]
    [StringLength(100, MinimumLength = 2, ErrorMessage = "Name must be between 2 and 100 characters")]
    public string Name { get; set; }
    
    [Required]
    [Range(0.01, double.MaxValue, ErrorMessage = "Price must be greater than 0")]
    public decimal Price { get; set; }
    
    [StringLength(500, ErrorMessage = "Description cannot exceed 500 characters")]
    public string Description { get; set; }
    
    [Required]
    [StringLength(50)]
    [RegularExpression("^[a-z0-9-]+$", ErrorMessage = "Slug must contain only lowercase letters, numbers, and hyphens")]
    public string Slug { get; set; }
    
    [Url(ErrorMessage = "Invalid URL format")]
    public string ImageUrl { get; set; }
    
    [Range(0, int.MaxValue, ErrorMessage = "Stock quantity cannot be negative")]
    public int StockQuantity { get; set; }
    
    [Required]
    public int CategoryId { get; set; }
    
    [MinLength(1, ErrorMessage = "At least one tag is required")]
    public List<string> Tags { get; set; } = new();
    
    [ValidateComplexType]
    public ProductSpecifications Specifications { get; set; }
}

// Custom validation attribute
public class FutureDateAttribute : ValidationAttribute
{
    public override bool IsValid(object value)
    {
        if (value is DateTime dateTime)
        {
            return dateTime > DateTime.UtcNow;
        }
        
        return true; // Let Required attribute handle null checks
    }
    
    public override string FormatErrorMessage(string name)
    {
        return $"{name} must be a future date";
    }
}

// Complex validation attribute
public class ValidSlugAttribute : ValidationAttribute
{
    public override bool IsValid(object value)
    {
        if (value is string slug)
        {
            // Check if slug is URL-friendly
            return Regex.IsMatch(slug, @"^[a-z0-9]+(?:-[a-z0-9]+)*$");
        }
        
        return true;
    }
}

// Class-level validation
public class ValidProductDto : ValidationAttribute
{
    public override ValidationResult IsValid(object value, ValidationContext validationContext)
    {
        if (value is CreateProductDto product)
        {
            var errors = new List<string>();
            
            // Business rule: Physical products must have weight
            if (product.CategoryId == PhysicalProductCategoryId && product.Weight <= 0)
            {
                errors.Add("Physical products must have a weight greater than 0");
            }
            
            // Business rule: Digital products cannot have shipping cost
            if (product.CategoryId == DigitalProductCategoryId && product.ShippingCost > 0)
            {
                errors.Add("Digital products cannot have shipping costs");
            }
            
            if (errors.Any())
            {
                return new ValidationResult(string.Join("; ", errors));
            }
        }
        
        return ValidationResult.Success;
    }
}
</code></pre>
        </div>

        <div class="interview-tip">
          <p><span class="interview-icon">🎯</span> <strong>Interview Focus:</strong> Demonstrate understanding of model binding and validation patterns.</p>
          <p>Key interview questions include:</p>
          <ul>
            <li>"How does ASP.NET Core determine which binding source to use?"</li>
            <li>"When would you create a custom model binder?"</li>
            <li>"What's the difference between client-side and server-side validation?"</li>
            <li>"How do you handle validation errors in API controllers?"</li>
            <li>"What are the performance implications of complex model binding?"</li>
            <li>"How do you secure your APIs against over-posting attacks?"</li>
          </ul>
        </div>
      `,
          codeExample: `// Comprehensive model binding and validation example

// Advanced DTO with multiple validation strategies
[ValidProduct]
public class CreateProductDto : IValidatableObject
{
    [Required]
    [StringLength(100, MinimumLength = 2)]
    public string Name { get; set; }
    
    [Required]
    [Range(0.01, 999999.99)]
    [Display(Name = "Product Price")]
    public decimal Price { get; set; }
    
    [StringLength(1000)]
    public string Description { get; set; }
    
    [Required]
    [ValidSlug]
    public string Slug { get; set; }
    
    [Url]
    public string ImageUrl { get; set; }
    
    [Range(0, int.MaxValue)]
    public int StockQuantity { get; set; }
    
    [Required]
    public int CategoryId { get; set; }
    
    public decimal? Weight { get; set; }
    
    public decimal? ShippingCost { get; set; }
    
    [FutureDate]
    public DateTime? AvailableFrom { get; set; }
    
    [MinLength(1)]
    public List<string> Tags { get; set; } = new();
    
    [ValidateComplexType]
    public ProductSpecifications Specifications { get; set; }
    
    // Complex validation using IValidatableObject
    public IEnumerable<ValidationResult> Validate(ValidationContext validationContext)
    {
        var results = new List<ValidationResult>();
        
        // Get category service from DI container
        var categoryService = validationContext.GetService<ICategoryService>();
        var category = categoryService?.GetCategoryAsync(CategoryId).Result;
        
        if (category == null)
        {
            results.Add(new ValidationResult("Invalid category", new[] { nameof(CategoryId) }));
        }
        else
        {
            // Category-specific validation
            if (category.RequiresPhysicalAttributes && (!Weight.HasValue || Weight <= 0))
            {
                results.Add(new ValidationResult(
                    "Weight is required for this category", 
                    new[] { nameof(Weight) }));
            }
            
            if (category.IsDigital && ShippingCost.HasValue && ShippingCost > 0)
            {
                results.Add(new ValidationResult(
                    "Digital products cannot have shipping costs", 
                    new[] { nameof(ShippingCost) }));
            }
        }
        
        // Price validation based on category
        if (category != null && Price < category.MinimumPrice)
        {
            results.Add(new ValidationResult(
                $"Price must be at least {category.MinimumPrice:C} for this category",
                new[] { nameof(Price) }));
        }
        
        return results;
    }
}

// Controller with advanced model binding
[ApiController]
[Route("api/v1/[controller]")]
public class ProductsController : BaseApiController
{
    [HttpPost]
    public async Task<ActionResult<ProductDto>> CreateProduct(
        [FromBody] CreateProductDto productDto,
        [FromHeader(Name = "X-Correlation-ID")] string correlationId = null,
        [FromHeader(Name = "X-Client-Version")] string clientVersion = null)
    {
        // Manual validation check (automatic with [ApiController])
        if (!ModelState.IsValid)
        {
            return BadRequest(new ValidationProblemDetails(ModelState));
        }
        
        try
        {
            var product = await _productService.CreateProductAsync(productDto, correlationId);
            return CreatedAtAction(nameof(GetProduct), new { id = product.Id }, product);
        }
        catch (BusinessValidationException ex)
        {
            ModelState.AddModelError("", ex.Message);
            return BadRequest(new ValidationProblemDetails(ModelState));
        }
    }
    
    [HttpGet("search")]
    public async Task<ActionResult<PagedResult<ProductDto>>> SearchProducts(
        [FromQuery] ProductSearchParameters searchParams,
        [FromQuery, ModelBinder(typeof(CommaDelimitedModelBinder))] List<string> tags = null,
        [FromQuery] Dictionary<string, string> filters = null)
    {
        if (tags != null)
            searchParams.Tags = tags;
            
        var results = await _productService.SearchProductsAsync(searchParams, filters);
        return Ok(results);
    }
    
    [HttpPut("{id:int}")]
    public async Task<ActionResult<ProductDto>> UpdateProduct(
        [FromRoute] int id,
        [FromBody] UpdateProductDto updateDto,
        [FromHeader(Name = "If-Match")] string etag = null)
    {
        // Validate ETag for optimistic concurrency
        if (!string.IsNullOrEmpty(etag))
        {
            var currentETag = await _productService.GetProductETagAsync(id);
            if (currentETag != etag)
            {
                return StatusCode(412, "Product has been modified by another user");
            }
        }
        
        var updatedProduct = await _productService.UpdateProductAsync(id, updateDto);
        return Ok(updatedProduct);
    }
    
    [HttpPost("upload-images")]
    public async Task<IActionResult> UploadImages(
        [FromForm] int productId,
        [FromForm] List<IFormFile> images,
        [FromForm] List<string> descriptions,
        [FromForm] bool replaceExisting = false)
    {
        // Validate file uploads
        foreach (var image in images)
        {
            if (image.Length > 5 * 1024 * 1024) // 5MB limit
            {
                return BadRequest($"File {image.FileName} exceeds 5MB limit");
            }
            
            if (!IsValidImageType(image.ContentType))
            {
                return BadRequest($"File {image.FileName} is not a valid image type");
            }
        }
        
        var result = await _productService.UploadImagesAsync(productId, images, descriptions, replaceExisting);
        return Ok(result);
    }
}

// Query parameters class for complex binding
public class ProductSearchParameters
{
    [StringLength(100)]
    public string Query { get; set; }
    
    public int? CategoryId { get; set; }
    
    [Range(0, double.MaxValue)]
    public decimal? MinPrice { get; set; }
    
    [Range(0, double.MaxValue)]
    public decimal? MaxPrice { get; set; }
    
    public List<string> Tags { get; set; } = new();
    
    [Range(1, 100)]
    public int Page { get; set; } = 1;
    
    [Range(1, 100)]
    public int PageSize { get; set; } = 10;
    
    public string SortBy { get; set; } = "name";
    
    [RegularExpression("^(asc|desc)$")]
    public string SortOrder { get; set; } = "asc";
    
    public bool IncludeDiscontinued { get; set; } = false;
}`,
        },
      ],
      exercise: {
        instructions:
          'Create a comprehensive API for managing customer orders with complex model binding from multiple sources. Implement custom validation attributes, handle file uploads, support bulk operations, and demonstrate advanced binding scenarios with custom model binders. Include proper error handling and validation messaging.',
      },
    },
    {
      title: 'Content Negotiation',
      description:
        'Understand how APIs can serve different content formats based on client requests and implement proper content negotiation strategies.',
      sections: [
        {
          title: 'Accept Headers and Content Types',
          explanation: `
        <p>Content negotiation is the process of selecting the best representation for a response based on the client's preferences. This allows APIs to serve different content formats (JSON, XML, CSV, etc.) to different clients using the same endpoints.</p>
        
        <h4>Accept Header Processing</h4>
        <p>Clients specify their content preferences using HTTP headers:</p>
        <ul>
          <li><strong>Accept:</strong> Specifies preferred media types (e.g., application/json, application/xml)</li>
          <li><strong>Accept-Language:</strong> Specifies preferred languages</li>
          <li><strong>Accept-Encoding:</strong> Specifies preferred compression algorithms</li>
          <li><strong>Accept-Charset:</strong> Specifies preferred character encodings</li>
        </ul>

        <div class="code-example">
          <pre><code>// Configure content negotiation in Program.cs
builder.Services.AddControllers(options =>
{
    // Add XML support
    options.InputFormatters.Add(new XmlSerializerInputFormatter(options));
    options.OutputFormatters.Add(new XmlSerializerOutputFormatter());
    
    // Add custom CSV formatter
    options.OutputFormatters.Add(new CsvOutputFormatter());
    
    // Respect Accept header
    options.RespectBrowserAcceptHeader = true;
    
    // Return 406 Not Acceptable for unsupported media types
    options.ReturnHttpNotAcceptable = true;
})
.AddXmlSerializerFormatters() // Alternative way to add XML support
.AddJsonOptions(options =>
{
    options.JsonSerializerOptions.PropertyNamingPolicy = JsonNamingPolicy.CamelCase;
    options.JsonSerializerOptions.WriteIndented = true;
});

// Example controller with content negotiation
[ApiController]
[Route("api/[controller]")]
[Produces("application/json", "application/xml", "text/csv")] // Supported types
public class ProductsController : ControllerBase
{
    [HttpGet]
    [ProducesResponseType(typeof(List<ProductDto>), 200)]
    public async Task<ActionResult<List<ProductDto>>> GetProducts()
    {
        var products = await _productService.GetProductsAsync();
        
        // ASP.NET Core automatically negotiates content type based on:
        // 1. Accept header from client
        // 2. Produces attribute on action/controller
        // 3. Available formatters
        
        return Ok(products);
    }
    
    // Explicit content type handling
    [HttpGet("{id}")]
    public async Task<IActionResult> GetProduct(int id)
    {
        var product = await _productService.GetProductByIdAsync(id);
        if (product == null) return NotFound();
        
        // Check Accept header manually if needed
        var acceptHeader = Request.Headers["Accept"].ToString();
        
        if (acceptHeader.Contains("application/xml"))
        {
            return new ObjectResult(product)
            {
                ContentTypes = { "application/xml" }
            };
        }
        
        if (acceptHeader.Contains("text/csv"))
        {
            return new ObjectResult(new[] { product })
            {
                ContentTypes = { "text/csv" }
            };
        }
        
        // Default to JSON
        return Ok(product);
    }
}
</code></pre>
        </div>

        <h4>Custom Output Formatters</h4>
        <p>While ASP.NET Core supports JSON and XML out of the box, you often need custom formatters for specialized content types. Custom output formatters allow your API to respond with formats like CSV, Excel, PDF, or any proprietary format your clients need.</p>

        <p><strong>When to Create Custom Formatters:</strong></p>
        <ul>
          <li><strong>Data Export:</strong> CSV, Excel, or PDF for business reports</li>
          <li><strong>Legacy Systems:</strong> Custom XML schemas or binary formats</li>
          <li><strong>Integration:</strong> Specific formats required by third-party systems</li>
          <li><strong>Performance:</strong> Optimized binary serialization for high-throughput scenarios</li>
        </ul>

        <p><strong>Creating a Basic CSV Formatter:</strong></p>
        <p>A CSV formatter converts your objects into comma-separated values. This is useful for data exports that can be opened in Excel or other spreadsheet applications.</p>

        <div class="code-example">
          <pre><code>// Basic CSV output formatter setup
public class CsvOutputFormatter : TextOutputFormatter
{
    public CsvOutputFormatter()
    {
        // Define supported media types
        SupportedMediaTypes.Add(MediaTypeHeaderValue.Parse("text/csv"));
        SupportedMediaTypes.Add(MediaTypeHeaderValue.Parse("application/csv"));
        
        // Define supported encodings
        SupportedEncodings.Add(Encoding.UTF8);
        SupportedEncodings.Add(Encoding.Unicode);
    }
    
    protected override bool CanWriteType(Type type)
    {
        // Only handle collections for CSV export
        return typeof(IEnumerable).IsAssignableFrom(type);
    }
}</code></pre>
        </div>

        <p><strong>Implementing the Formatter Logic:</strong></p>
        <p>The core of the formatter converts your objects to CSV format. This involves creating headers from property names and then converting each object to a CSV row.</p>

        <div class="code-example">
          <pre><code>// CSV formatting implementation
public override async Task WriteResponseBodyAsync(
    OutputFormatterWriteContext context, 
    Encoding selectedEncoding)
{
    var buffer = new StringBuilder();
    
    if (context.Object is IEnumerable<object> objects)
    {
        var objectArray = objects.ToArray();
        if (objectArray.Any())
        {
            // Create header row from property names
            var properties = objectArray.First().GetType().GetProperties();
            var headers = string.Join(",", properties.Select(p => QuoteCsvField(p.Name)));
            buffer.AppendLine(headers);
            
            // Create data rows
            foreach (var obj in objectArray)
            {
                var values = properties.Select(p => 
                    QuoteCsvField(p.GetValue(obj)?.ToString() ?? ""));
                buffer.AppendLine(string.Join(",", values));
            }
        }
    }
    
    await context.HttpContext.Response.WriteAsync(buffer.ToString(), selectedEncoding);
}</code></pre>
        </div>

        <p><strong>CSV Field Quoting:</strong></p>
        <p>Proper CSV formatting requires quoting fields that contain commas, quotes, or newlines. This prevents data corruption when the CSV is parsed.</p>

        <div class="code-example">
          <pre><code>// Proper CSV field quoting
private static string QuoteCsvField(string field)
{
    if (string.IsNullOrEmpty(field))
        return string.Empty;
        
    // Quote if field contains comma, quote, or newline
    if (field.Contains(",") || field.Contains('"') || field.Contains("\\n"))
    {
        // Escape existing quotes by doubling them
        return $'"{field.Replace('"', '""')}"';
    }
    
    return field;
}</code></pre>
        </div>

        <p><strong>Advanced Formatter Features:</strong></p>
        <p>Production formatters often need additional features like custom headers, filename suggestions, and proper MIME type handling.</p>

        <div class="code-example">
          <pre><code>// Enhanced CSV formatter with additional features
public class EnhancedCsvOutputFormatter : TextOutputFormatter
{
    public override async Task WriteResponseBodyAsync(
        OutputFormatterWriteContext context, 
        Encoding selectedEncoding)
    {
        var response = context.HttpContext.Response;
        
        // Set proper filename for downloads
        var filename = GetFilename(context.ActionDescriptor);
        response.Headers.Add("Content-Disposition", 
            $"attachment; filename=\\"{filename}\\"");
        
        // Add metadata headers
        response.Headers.Add("X-Export-Format", "CSV");
        response.Headers.Add("X-Export-Date", DateTime.UtcNow.ToString("O"));
        
        // Generate CSV content
        var csvContent = GenerateCsvContent(context.Object);
        await response.WriteAsync(csvContent, selectedEncoding);
    }
    
    private string GetFilename(ActionDescriptor actionDescriptor)
    {
        var controllerName = actionDescriptor.RouteValues["controller"];
        var timestamp = DateTime.UtcNow.ToString("yyyyMMdd_HHmmss");
        return $"{controllerName}_export_{timestamp}.csv";
    }
}</code></pre>
        </div>

        <p><strong>Registering Custom Formatters:</strong></p>
        <p>Once created, formatters must be registered in your application's service configuration to be available for content negotiation.</p>

        <div class="code-example">
          <pre><code>// Register custom formatters in Program.cs
builder.Services.AddControllers(options =>
{
    // Add custom formatters
    options.OutputFormatters.Add(new CsvOutputFormatter());
    options.OutputFormatters.Add(new ExcelOutputFormatter());
    
    // Control formatter order (earlier = higher priority)
    options.OutputFormatters.Insert(0, new CustomJsonFormatter());
    
    // Enable content negotiation
    options.RespectBrowserAcceptHeader = true;
    options.ReturnHttpNotAcceptable = true;
});</code></pre>
        </div>
</code></pre>
        </div>

        <h4>Language and Culture Support</h4>
        <p>Implement internationalization and localization to serve content in different languages and cultural formats.</p>

        <div class="code-example">
          <pre><code>// Configure localization in Program.cs
builder.Services.AddLocalization(options => options.ResourcesPath = "Resources");

builder.Services.Configure<RequestLocalizationOptions>(options =>
{
    var supportedCultures = new[] { "en-US", "es-ES", "fr-FR", "de-DE" };
    options.SetDefaultCulture("en-US")
           .AddSupportedCultures(supportedCultures)
           .AddSupportedUICultures(supportedCultures);
    
    // Configure providers to determine culture
    options.RequestCultureProviders.Clear();
    options.RequestCultureProviders.Add(new QueryStringRequestCultureProvider()); // ?culture=es-ES
    options.RequestCultureProviders.Add(new CookieRequestCultureProvider());      // Cookie
    options.RequestCultureProviders.Add(new AcceptLanguageHeaderRequestCultureProvider()); // Accept-Language header
});

var app = builder.Build();

// Enable request localization
app.UseRequestLocalization();

// Controller with localization support
[ApiController]
[Route("api/[controller]")]
public class ProductsController : ControllerBase
{
    private readonly IStringLocalizer<ProductsController> _localizer;
    
    public ProductsController(IStringLocalizer<ProductsController> localizer)
    {
        _localizer = localizer;
    }
    
    [HttpGet]
    public async Task<ActionResult<ApiResponse<List<ProductDto>>>> GetProducts()
    {
        var products = await _productService.GetProductsAsync();
        
        return Ok(new ApiResponse<List<ProductDto>>
        {
            Success = true,
            Data = products,
            Message = _localizer["ProductsRetrievedSuccessfully"].Value,
            Timestamp = DateTime.UtcNow
        });
    }
    
    [HttpPost]
    public async Task<ActionResult<ApiResponse<ProductDto>>> CreateProduct([FromBody] CreateProductDto productDto)
    {
        if (!ModelState.IsValid)
        {
            var errors = ModelState.Values
                .SelectMany(v => v.Errors)
                .Select(e => e.ErrorMessage);
                
            return BadRequest(new ApiResponse<object>
            {
                Success = false,
                Message = _localizer["ValidationErrors"].Value,
                Errors = errors
            });
        }
        
        try
        {
            var product = await _productService.CreateProductAsync(productDto);
            
            return CreatedAtAction(nameof(GetProduct), new { id = product.Id }, 
                new ApiResponse<ProductDto>
                {
                    Success = true,
                    Data = product,
                    Message = _localizer["ProductCreatedSuccessfully"].Value
                });
        }
        catch (DuplicateResourceException)
        {
            return Conflict(new ApiResponse<object>
            {
                Success = false,
                Message = _localizer["ProductAlreadyExists"].Value
            });
        }
    }
}

// Localized response wrapper
public class ApiResponse<T>
{
    public bool Success { get; set; }
    public T Data { get; set; }
    public string Message { get; set; }
    public IEnumerable<string> Errors { get; set; }
    public DateTime Timestamp { get; set; } = DateTime.UtcNow;
}
</code></pre>
        </div>

        <h4>Compression and Performance</h4>
        <p>Enable response compression and implement performance optimizations for content negotiation.</p>

        <div class="code-example">
          <pre><code>// Configure compression in Program.cs
builder.Services.AddResponseCompression(options =>
{
    options.EnableForHttps = true;
    options.Providers.Add<BrotliCompressionProvider>();
    options.Providers.Add<GzipCompressionProvider>();
    
    // MIME types to compress
    options.MimeTypes = ResponseCompressionDefaults.MimeTypes.Concat(new[]
    {
        "application/json",
        "application/xml",
        "text/csv",
        "application/javascript",
        "text/css",
        "text/html"
    });
});

builder.Services.Configure<BrotliCompressionProviderOptions>(options =>
{
    options.Level = CompressionLevel.Fastest;
});

builder.Services.Configure<GzipCompressionProviderOptions>(options =>
{
    options.Level = CompressionLevel.Fastest;
});

var app = builder.Build();

// Enable compression
app.UseResponseCompression();

// Performance-optimized content negotiation
[ApiController]
[Route("api/[controller]")]
public class ProductsController : ControllerBase
{
    [HttpGet]
    [ResponseCache(Duration = 300, VaryByQueryKeys = new[] { "category", "page", "pageSize" })]
    public async Task<ActionResult<List<ProductDto>>> GetProducts(
        [FromQuery] string category = null,
        [FromQuery] int page = 1,
        [FromQuery] int pageSize = 10)
    {
        // Check if client supports compression
        var acceptEncoding = Request.Headers["Accept-Encoding"].ToString();
        var supportsCompression = acceptEncoding.Contains("gzip") || acceptEncoding.Contains("br");
        
        var products = await _productService.GetProductsAsync(category, page, pageSize);
        
        // Add cache headers based on content type
        var acceptHeader = Request.Headers["Accept"].ToString();
        if (acceptHeader.Contains("application/xml"))
        {
            Response.Headers.Add("Content-Type", "application/xml");
            Response.Headers.Add("Vary", "Accept, Accept-Encoding");
        }
        else if (acceptHeader.Contains("text/csv"))
        {
            Response.Headers.Add("Content-Type", "text/csv");
            Response.Headers.Add("Content-Disposition", "attachment; filename=products.csv");
        }
        
        return Ok(products);
    }
}
</code></pre>
        </div>

        <div class="interview-tip">
          <p><span class="interview-icon">🎯</span> <strong>Interview Focus:</strong> Demonstrate understanding of content negotiation and API flexibility.</p>
          <p>Key interview questions include:</p>
          <ul>
            <li>"How does ASP.NET Core handle content negotiation?"</li>
            <li>"When would you create custom output formatters?"</li>
            <li>"How do you implement proper caching with content negotiation?"</li>
            <li>"What are the performance implications of supporting multiple content types?"</li>
            <li>"How do you handle versioning with content negotiation?"</li>
            <li>"What's the difference between Accept and Content-Type headers?"</li>
          </ul>
        </div>
      `,
          codeExample: `// Complete content negotiation implementation

// Custom API response formatter
public class ApiResponseOutputFormatter : IOutputFormatter
{
    private readonly ILogger<ApiResponseOutputFormatter> _logger;
    
    public ApiResponseOutputFormatter(ILogger<ApiResponseOutputFormatter> logger)
    {
        _logger = logger;
    }
    
    public bool CanWriteResult(OutputFormatterCanWriteContext context)
    {
        var acceptHeader = context.HttpContext.Request.Headers["Accept"].ToString();
        return acceptHeader.Contains("application/vnd.api+json");
    }
    
    public async Task WriteAsync(OutputFormatterWriteContext context)
    {
        var response = context.HttpContext.Response;
        response.ContentType = "application/vnd.api+json";
        
        var jsonApiResponse = new
        {
            data = context.Object,
            meta = new
            {
                timestamp = DateTime.UtcNow,
                version = "1.0",
                requestId = context.HttpContext.TraceIdentifier
            },
            links = new
            {
                self = context.HttpContext.Request.GetDisplayUrl()
            }
        };
        
        var json = JsonSerializer.Serialize(jsonApiResponse, new JsonSerializerOptions
        {
            PropertyNamingPolicy = JsonNamingPolicy.CamelCase,
            WriteIndented = true
        });
        
        await response.WriteAsync(json);
    }
}

// Multi-format API controller
[ApiController]
[Route("api/v1/[controller]")]
[Produces("application/json", "application/xml", "text/csv", "application/vnd.api+json")]
public class ProductsController : ControllerBase
{
    private readonly IProductService _productService;
    private readonly IStringLocalizer<ProductsController> _localizer;
    private readonly ILogger<ProductsController> _logger;
    
    public ProductsController(
        IProductService productService,
        IStringLocalizer<ProductsController> localizer,
        ILogger<ProductsController> logger)
    {
        _productService = productService;
        _localizer = localizer;
        _logger = logger;
    }
    
    [HttpGet]
    [ResponseCache(Duration = 300, VaryByQueryKeys = new[] { "*" })]
    public async Task<ActionResult<List<ProductDto>>> GetProducts(
        [FromQuery] ProductQueryParameters queryParams)
    {
        var acceptHeader = Request.Headers["Accept"].ToString();
        var acceptLanguage = Request.Headers["Accept-Language"].ToString();
        
        _logger.LogInformation("Request for products - Accept: {Accept}, Language: {Language}", 
            acceptHeader, acceptLanguage);
        
        var products = await _productService.GetProductsAsync(queryParams);
        
        // Add response headers based on content type
        Response.Headers.Add("X-Total-Count", products.Count().ToString());
        Response.Headers.Add("Vary", "Accept, Accept-Language, Accept-Encoding");
        
        // Handle different response formats
        if (acceptHeader.Contains("text/csv"))
        {
            Response.Headers.Add("Content-Disposition", 
                $"attachment; filename=products-{DateTime.UtcNow:yyyyMMdd}.csv");
        }
        else if (acceptHeader.Contains("application/xml"))
        {
            Response.Headers.Add("X-Content-Format", "xml");
        }
        else if (acceptHeader.Contains("application/vnd.api+json"))
        {
            Response.Headers.Add("X-Content-Format", "jsonapi");
        }
        
        return Ok(products);
    }
    
    [HttpGet("{id:int}")]
    [ProducesResponseType(typeof(ProductDto), 200)]
    [ProducesResponseType(404)]
    public async Task<ActionResult<ProductDto>> GetProduct(int id)
    {
        var product = await _productService.GetProductByIdAsync(id);
        if (product == null)
        {
            return NotFound(new
            {
                message = _localizer["ProductNotFound"].Value,
                productId = id
            });
        }
        
        // Support conditional requests
        var etag = GenerateETag(product);
        Response.Headers.Add("ETag", etag);
        
        if (Request.Headers.ContainsKey("If-None-Match") &&
            Request.Headers["If-None-Match"].ToString() == etag)
        {
            return StatusCode(304);
        }
        
        return Ok(product);
    }
    
    [HttpPost]
    [Consumes("application/json", "application/xml")]
    [ProducesResponseType(typeof(ProductDto), 201)]
    [ProducesResponseType(400)]
    [ProducesResponseType(409)]
    public async Task<ActionResult<ProductDto>> CreateProduct([FromBody] CreateProductDto productDto)
    {
        var contentType = Request.ContentType;
        _logger.LogInformation("Creating product with content type: {ContentType}", contentType);
        
        try
        {
            var product = await _productService.CreateProductAsync(productDto);
            
            // Negotiate response format
            var acceptHeader = Request.Headers["Accept"].ToString();
            var location = Url.Action(nameof(GetProduct), new { id = product.Id });
            
            var response = Created(location, product);
            
            // Add location header in different formats if needed
            if (acceptHeader.Contains("application/xml"))
            {
                response.ContentTypes.Add("application/xml");
            }
            
            return response;
        }
        catch (DuplicateResourceException ex)
        {
            return Conflict(new
            {
                message = _localizer["ProductAlreadyExists"].Value,
                details = ex.Message
            });
        }
    }
    
    // Endpoint that demonstrates advanced content negotiation
    [HttpGet("export")]
    [Produces("text/csv", "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet", "application/json")]
    public async Task<IActionResult> ExportProducts(
        [FromQuery] string format = null,
        [FromQuery] ProductQueryParameters queryParams = null)
    {
        var products = await _productService.GetProductsAsync(queryParams ?? new ProductQueryParameters());
        
        // Override content negotiation with query parameter
        if (!string.IsNullOrEmpty(format))
        {
            return format.ToLower() switch
            {
                "csv" => new ObjectResult(products) { ContentTypes = { "text/csv" } },
                "excel" => new ObjectResult(products) { ContentTypes = { "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" } },
                "json" => Ok(products),
                _ => BadRequest($"Unsupported format: {format}")
            };
        }
        
        // Use standard content negotiation
        return Ok(products);
    }
    
    private string GenerateETag(object obj)
    {
        var json = JsonSerializer.Serialize(obj);
        var hash = SHA256.HashData(Encoding.UTF8.GetBytes(json));
        return Convert.ToBase64String(hash);
    }
}

// Startup configuration for content negotiation
public class Program
{
    public static void Main(string[] args)
    {
        var builder = WebApplication.CreateBuilder(args);
        
        // Configure content negotiation
        builder.Services.AddControllers(options =>
        {
            // Respect browser Accept header
            options.RespectBrowserAcceptHeader = true;
            
            // Return 406 for unsupported media types
            options.ReturnHttpNotAcceptable = true;
            
            // Add custom formatters
            options.OutputFormatters.Add(new CsvOutputFormatter());
            options.OutputFormatters.Add(new ExcelOutputFormatter());
            options.OutputFormatters.Insert(0, new ApiResponseOutputFormatter(
                builder.Services.BuildServiceProvider().GetRequiredService<ILogger<ApiResponseOutputFormatter>>()));
        })
        .AddXmlSerializerFormatters()
        .AddJsonOptions(options =>
        {
            options.JsonSerializerOptions.PropertyNamingPolicy = JsonNamingPolicy.CamelCase;
            options.JsonSerializerOptions.WriteIndented = true;
            options.JsonSerializerOptions.DefaultIgnoreCondition = JsonIgnoreCondition.WhenWritingNull;
        });
        
        // Add localization
        builder.Services.AddLocalization();
        builder.Services.Configure<RequestLocalizationOptions>(options =>
        {
            var supportedCultures = new[] { "en-US", "es-ES", "fr-FR", "de-DE" };
            options.SetDefaultCulture("en-US")
                   .AddSupportedCultures(supportedCultures)
                   .AddSupportedUICultures(supportedCultures);
        });
        
        // Add compression
        builder.Services.AddResponseCompression(options =>
        {
            options.EnableForHttps = true;
            options.Providers.Add<BrotliCompressionProvider>();
            options.Providers.Add<GzipCompressionProvider>();
        });
        
        var app = builder.Build();
        
        app.UseRequestLocalization();
        app.UseResponseCompression();
        app.UseRouting();
        app.MapControllers();
        
        app.Run();
    }
}`,
        },
      ],
      exercise: {
        instructions:
          'Build an API that supports multiple content formats (JSON, XML, CSV, Excel) with proper content negotiation. Implement localization support, custom output formatters, response compression, and demonstrate advanced scenarios like conditional requests and format override via query parameters.',
      },
    },
    {
      title: 'Swagger/OpenAPI Documentation',
      description:
        'Learn to create comprehensive, interactive API documentation using Swagger/OpenAPI specifications that make your APIs easy to understand and consume.',
      sections: [
        {
          title: 'Setting Up Swagger in ASP.NET Core',
          explanation: `
        <p>Swagger/OpenAPI is a specification for describing REST APIs that enables automatic documentation generation, client SDK generation, and API testing interfaces. ASP.NET Core provides excellent built-in support for generating OpenAPI specifications.</p>
        
        <h4>Basic Swagger Configuration</h4>
        <p>Swashbuckle.AspNetCore is the most popular library for integrating Swagger with ASP.NET Core applications. It automatically generates OpenAPI specifications from your controllers and models.</p>

        <div class="code-example">
          <pre><code>// Install NuGet package: Swashbuckle.AspNetCore

// Program.cs configuration
builder.Services.AddControllers();

// Add Swagger/OpenAPI services
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen(options =>
{
    options.SwaggerDoc("v1", new OpenApiInfo
    {
        Title = "Product API",
        Version = "v1",
        Description = "A comprehensive API for managing products and inventory",
        Contact = new OpenApiContact
        {
            Name = "API Support",
            Email = "support@company.com",
            Url = new Uri("https://company.com/support")
        },
        License = new OpenApiLicense
        {
            Name = "MIT License",
            Url = new Uri("https://opensource.org/licenses/MIT")
        },
        TermsOfService = new Uri("https://company.com/terms")
    });
    
    // Include XML documentation
    var xmlFilename = $"{Assembly.GetExecutingAssembly().GetName().Name}.xml";
    var xmlPath = Path.Combine(AppContext.BaseDirectory, xmlFilename);
    options.IncludeXmlComments(xmlPath);
    
    // Enable detailed schema documentation
    options.EnableAnnotations();
    
    // Support for polymorphism
    options.UseAllOfToExtendReferenceSchemas();
    options.UseOneOfForPolymorphism();
    
    // Configure security definitions
    options.AddSecurityDefinition("Bearer", new OpenApiSecurityScheme
    {
        Name = "Authorization",
        Type = SecuritySchemeType.Http,
        Scheme = "Bearer",
        BearerFormat = "JWT",
        In = ParameterLocation.Header,
        Description = "Enter JWT token in the format: Bearer {your-token}"
    });
    
    options.AddSecurityRequirement(new OpenApiSecurityRequirement
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

var app = builder.Build();

// Configure Swagger middleware
if (app.Environment.IsDevelopment() || app.Environment.IsStaging())
{
    app.UseSwagger(options =>
    {
        options.RouteTemplate = "api-docs/{documentName}/swagger.json";
    });
    
    app.UseSwaggerUI(options =>
    {
        options.SwaggerEndpoint("/api-docs/v1/swagger.json", "Product API v1");
        options.RoutePrefix = "api-docs"; // Access at /api-docs
        
        // Customize UI
        options.DocumentTitle = "Product API Documentation";
        options.DefaultModelsExpandDepth(2);
        options.DefaultModelExpandDepth(2);
        options.DocExpansion(DocExpansion.None);
        options.EnableDeepLinking();
        options.ShowExtensions();
        options.EnableValidator();
        
        // Enable authentication in UI
        options.OAuthClientId("swagger-ui");
        options.OAuthAppName("Product API");
        options.OAuthUsePkce();
    });
}
</code></pre>
        </div>

        <h4>Comprehensive API Documentation with Attributes</h4>
        <p>Use XML documentation comments and Swagger attributes to create detailed, professional API documentation.</p>

        <div class="code-example">
          <pre><code>/// <summary>
/// Manages product operations including CRUD operations and inventory management
/// </summary>
[ApiController]
[Route("api/v1/[controller]")]
[Produces("application/json")]
[SwaggerTag("Product management endpoints for inventory and catalog operations")]
public class ProductsController : ControllerBase
{
    /// <summary>
    /// Retrieves a paginated list of products with optional filtering
    /// </summary>
    /// <param name="category">Filter products by category name</param>
    /// <param name="search">Search term to match against product name and description</param>
    /// <param name="minPrice">Minimum price filter (inclusive)</param>
    /// <param name="maxPrice">Maximum price filter (inclusive)</param>
    /// <param name="page">Page number for pagination (1-based)</param>
    /// <param name="pageSize">Number of items per page (max 100)</param>
    /// <param name="sortBy">Field to sort by (name, price, createdAt)</param>
    /// <param name="sortOrder">Sort direction (asc or desc)</param>
    /// <returns>A paginated list of products matching the specified criteria</returns>
    /// <response code="200">Products retrieved successfully</response>
    /// <response code="400">Invalid query parameters provided</response>
    /// <response code="500">Internal server error occurred</response>
    [HttpGet]
    [ProducesResponseType(typeof(PagedResult<ProductDto>), StatusCodes.Status200OK)]
    [ProducesResponseType(typeof(ProblemDetails), StatusCodes.Status400BadRequest)]
    [ProducesResponseType(typeof(ProblemDetails), StatusCodes.Status500InternalServerError)]
    [SwaggerOperation(
        Summary = "Get products with filtering and pagination",
        Description = "Retrieves products from the catalog with support for advanced filtering, searching, sorting, and pagination. Use query parameters to customize the results.",
        OperationId = "GetProducts",
        Tags = new[] { "Products", "Catalog" }
    )]
    public async Task<ActionResult<PagedResult<ProductDto>>> GetProducts(
        [FromQuery] [SwaggerParameter("Category filter", Required = false)] string category = null,
        [FromQuery] [SwaggerParameter("Search term for name/description", Required = false)] string search = null,
        [FromQuery] [Range(0, double.MaxValue)] [SwaggerParameter("Minimum price", Required = false)] decimal? minPrice = null,
        [FromQuery] [Range(0, double.MaxValue)] [SwaggerParameter("Maximum price", Required = false)] decimal? maxPrice = null,
        [FromQuery] [Range(1, int.MaxValue)] [SwaggerParameter("Page number (1-based)", Required = false)] int page = 1,
        [FromQuery] [Range(1, 100)] [SwaggerParameter("Items per page (max 100)", Required = false)] int pageSize = 10,
        [FromQuery] [SwaggerParameter("Sort field", Required = false)] string sortBy = "name",
        [FromQuery] [SwaggerParameter("Sort direction", Required = false)] string sortOrder = "asc")
    {
        var queryParams = new ProductQueryParameters
        {
            Category = category,
            Search = search,
            MinPrice = minPrice,
            MaxPrice = maxPrice,
            Page = page,
            PageSize = pageSize,
            SortBy = sortBy,
            SortOrder = sortOrder
        };
        
        var result = await _productService.GetProductsAsync(queryParams);
        return Ok(result);
    }
    
    /// <summary>
    /// Retrieves a specific product by its unique identifier
    /// </summary>
    /// <param name="id">The unique identifier of the product</param>
    /// <returns>The product details if found</returns>
    /// <response code="200">Product found and returned successfully</response>
    /// <response code="404">Product with the specified ID was not found</response>
    [HttpGet("{id:int}")]
    [ProducesResponseType(typeof(ProductDto), StatusCodes.Status200OK)]
    [ProducesResponseType(typeof(ProblemDetails), StatusCodes.Status404NotFound)]
    [SwaggerOperation(
        Summary = "Get product by ID",
        Description = "Retrieves detailed information about a specific product using its unique identifier.",
        OperationId = "GetProductById"
    )]
    public async Task<ActionResult<ProductDto>> GetProduct(
        [FromRoute] [SwaggerParameter("Product ID", Required = true)] int id)
    {
        var product = await _productService.GetProductByIdAsync(id);
        
        if (product == null)
        {
            return NotFound(new ProblemDetails
            {
                Title = "Product not found",
                Detail = $"No product exists with ID {id}",
                Status = 404,
                Instance = HttpContext.Request.Path
            });
        }
        
        return Ok(product);
    }
    
    /// <summary>
    /// Creates a new product in the catalog
    /// </summary>
    /// <param name="createProductDto">The product information to create</param>
    /// <returns>The created product with assigned ID and metadata</returns>
    /// <response code="201">Product created successfully</response>
    /// <response code="400">Invalid product data provided</response>
    /// <response code="409">Product with the same name or SKU already exists</response>
    [HttpPost]
    [ProducesResponseType(typeof(ProductDto), StatusCodes.Status201Created)]
    [ProducesResponseType(typeof(ValidationProblemDetails), StatusCodes.Status400BadRequest)]
    [ProducesResponseType(typeof(ProblemDetails), StatusCodes.Status409Conflict)]
    [SwaggerOperation(
        Summary = "Create a new product",
        Description = "Adds a new product to the catalog with the provided information. The product name and SKU must be unique.",
        OperationId = "CreateProduct"
    )]
    public async Task<ActionResult<ProductDto>> CreateProduct(
        [FromBody] [SwaggerRequestBody("Product creation data", Required = true)] CreateProductDto createProductDto)
    {
        try
        {
            var product = await _productService.CreateProductAsync(createProductDto);
            
            return CreatedAtAction(
                nameof(GetProduct),
                new { id = product.Id },
                product);
        }
        catch (DuplicateResourceException ex)
        {
            return Conflict(new ProblemDetails
            {
                Title = "Duplicate product",
                Detail = ex.Message,
                Status = 409,
                Instance = HttpContext.Request.Path
            });
        }
    }
}

// Well-documented DTOs with examples
/// <summary>
/// Data transfer object for creating a new product
/// </summary>
[SwaggerSchema(Description = "Contains all required information to create a new product")]
public class CreateProductDto
{
    /// <summary>
    /// The display name of the product
    /// </summary>
    /// <example>Apple MacBook Pro 16-inch</example>
    [Required]
    [StringLength(100, MinimumLength = 2)]
    [SwaggerSchema(Description = "Product display name", Format = "string")]
    public string Name { get; set; }
    
    /// <summary>
    /// Detailed description of the product features and specifications
    /// </summary>
    /// <example>Latest MacBook Pro with M2 Pro chip, 16GB RAM, and 512GB SSD storage</example>
    [StringLength(1000)]
    [SwaggerSchema(Description = "Detailed product description")]
    public string Description { get; set; }
    
    /// <summary>
    /// The selling price of the product in USD
    /// </summary>
    /// <example>2499.99</example>
    [Required]
    [Range(0.01, 999999.99)]
    [SwaggerSchema(Description = "Product price in USD", Format = "decimal")]
    public decimal Price { get; set; }
    
    /// <summary>
    /// URL-friendly identifier for the product
    /// </summary>
    /// <example>apple-macbook-pro-16</example>
    [Required]
    [StringLength(50)]
    [RegularExpression("^[a-z0-9-]+$")]
    [SwaggerSchema(Description = "URL-friendly product identifier")]
    public string Slug { get; set; }
    
    /// <summary>
    /// Current stock quantity available for sale
    /// </summary>
    /// <example>25</example>
    [Range(0, int.MaxValue)]
    [SwaggerSchema(Description = "Available stock quantity")]
    public int StockQuantity { get; set; }
    
    /// <summary>
    /// Category identifier that this product belongs to
    /// </summary>
    /// <example>1</example>
    [Required]
    [SwaggerSchema(Description = "Product category ID")]
    public int CategoryId { get; set; }
    
    /// <summary>
    /// List of searchable tags associated with the product
    /// </summary>
    /// <example>["laptop", "apple", "macbook", "professional"]</example>
    [SwaggerSchema(Description = "Product tags for searchability")]
    public List<string> Tags { get; set; } = new();
}
</code></pre>
        </div>

        <h4>Advanced Swagger Configuration</h4>
        <p>Implement advanced Swagger features including multiple API versions, custom filters, and enhanced security documentation.</p>

        <div class="code-example">
          <pre><code>// Multiple API versions configuration
builder.Services.AddSwaggerGen(options =>
{
    // Version 1.0
    options.SwaggerDoc("v1", new OpenApiInfo
    {
        Title = "Product API",
        Version = "v1",
        Description = "Version 1.0 of the Product API"
    });
    
    // Version 2.0
    options.SwaggerDoc("v2", new OpenApiInfo
    {
        Title = "Product API",
        Version = "v2",
        Description = "Version 2.0 of the Product API with enhanced features"
    });
    
    // Custom operation filter for additional metadata
    options.OperationFilter<CustomOperationFilter>();
    options.SchemaFilter<EnumSchemaFilter>();
    options.DocumentFilter<CustomDocumentFilter>();
    
    // Configure polymorphism
    options.SelectSubTypesUsing(baseType =>
    {
        return typeof(Program).Assembly.GetTypes()
            .Where(type => type.IsSubclassOf(baseType));
    });
});

// Custom operation filter
public class CustomOperationFilter : IOperationFilter
{
    public void Apply(OpenApiOperation operation, OperationFilterContext context)
    {
        // Add custom headers
        operation.Parameters ??= new List<OpenApiParameter>();
        
        operation.Parameters.Add(new OpenApiParameter
        {
            Name = "X-Correlation-ID",
            In = ParameterLocation.Header,
            Required = false,
            Schema = new OpenApiSchema { Type = "string" },
            Description = "Correlation ID for request tracking"
        });
        
        // Add examples for request/response
        if (context.MethodInfo.DeclaringType == typeof(ProductsController))
        {
            if (operation.RequestBody?.Content?.ContainsKey("application/json") == true)
            {
                var content = operation.RequestBody.Content["application/json"];
                content.Examples = new Dictionary<string, OpenApiExample>
                {
                    {
                        "standard-product",
                        new OpenApiExample
                        {
                            Summary = "Standard Product",
                            Description = "Example of a typical product creation",
                            Value = new CreateProductDto
                            {
                                Name = "Sample Product",
                                Description = "A sample product for demonstration",
                                Price = 29.99m,
                                Slug = "sample-product",
                                StockQuantity = 100,
                                CategoryId = 1,
                                Tags = new List<string> { "sample", "demo" }
                            }
                        }
                    }
                };
            }
        }
        
        // Add response examples
        foreach (var response in operation.Responses)
        {
            if (response.Value.Content?.ContainsKey("application/json") == true)
            {
                var content = response.Value.Content["application/json"];
                content.Examples ??= new Dictionary<string, OpenApiExample>();
                
                if (response.Key == "200" && context.MethodInfo.Name == "GetProducts")
                {
                    content.Examples["success"] = new OpenApiExample
                    {
                        Summary = "Successful Response",
                        Value = new PagedResult<ProductDto>
                        {
                            Items = new List<ProductDto>
                            {
                                new() { Id = 1, Name = "Sample Product", Price = 29.99m }
                            },
                            TotalItems = 1,
                            Page = 1,
                            PageSize = 10
                        }
                    };
                }
            }
        }
    }
}

// Enum schema filter for better documentation
public class EnumSchemaFilter : ISchemaFilter
{
    public void Apply(OpenApiSchema schema, SchemaFilterContext context)
    {
        if (context.Type.IsEnum)
        {
            schema.Enum.Clear();
            
            foreach (var enumValue in Enum.GetValues(context.Type))
            {
                var member = context.Type.GetMember(enumValue.ToString()!).FirstOrDefault();
                var displayAttribute = member?.GetCustomAttribute<DisplayAttribute>();
                
                schema.Enum.Add(new OpenApiString(enumValue.ToString()));
                
                if (displayAttribute != null)
                {
                    schema.Description += $"\\n- {enumValue}: {displayAttribute.Description}";
                }
            }
        }
    }
}

// SwaggerUI customization with themes and plugins
app.UseSwaggerUI(options =>
{
    options.SwaggerEndpoint("/swagger/v1/swagger.json", "Product API v1");
    options.SwaggerEndpoint("/swagger/v2/swagger.json", "Product API v2");
    
    // Custom CSS for branding
    options.InjectStylesheet("/swagger-ui/custom.css");
    options.InjectJavascript("/swagger-ui/custom.js");
    
    // Enable additional features
    options.EnablePersistAuthorization();
    options.EnableTryItOutByDefault();
    options.ShowCommonExtensions();
    
    // Custom request interceptor
    options.ConfigObject = new
    {
        requestInterceptor = "(req) => { req.headers['X-Custom-Header'] = 'SwaggerUI'; return req; }"
    };
});
</code></pre>
        </div>

        <div class="interview-tip">
          <p><span class="interview-icon">🎯</span> <strong>Interview Focus:</strong> Demonstrate understanding of API documentation best practices and tooling.</p>
          <p>Key interview questions include:</p>
          <ul>
            <li>"How do you ensure your API documentation stays up-to-date with code changes?"</li>
            <li>"What's the difference between Swagger and OpenAPI?"</li>
            <li>"How do you document authentication and authorization in Swagger?"</li>
            <li>"What are the benefits of using code-first vs schema-first API development?"</li>
            <li>"How do you handle API versioning in your documentation?"</li>
            <li>"What tools can generate client SDKs from OpenAPI specifications?"</li>
          </ul>
        </div>
      `,
          codeExample: `// Production-ready Swagger configuration

// Program.cs - Comprehensive Swagger setup
builder.Services.AddSwaggerGen(options =>
{
    // Basic API information
    options.SwaggerDoc("v1", new OpenApiInfo
    {
        Title = "E-Commerce API",
        Version = "v1.0.0",
        Description = "Comprehensive API for e-commerce operations including products, orders, and user management",
        Contact = new OpenApiContact
        {
            Name = "API Support Team",
            Email = "api-support@company.com",
            Url = new Uri("https://company.com/api/support")
        },
        License = new OpenApiLicense
        {
            Name = "Proprietary License",
            Url = new Uri("https://company.com/license")
        },
        TermsOfService = new Uri("https://company.com/terms")
    });
    
    // Security schemes
    options.AddSecurityDefinition("Bearer", new OpenApiSecurityScheme
    {
        Name = "Authorization",
        Type = SecuritySchemeType.Http,
        Scheme = "Bearer",
        BearerFormat = "JWT",
        In = ParameterLocation.Header,
        Description = "Enter JWT Bearer token in the format: Bearer {your-token}"
    });
    
    options.AddSecurityDefinition("ApiKey", new OpenApiSecurityScheme
    {
        Name = "X-API-Key",
        Type = SecuritySchemeType.ApiKey,
        In = ParameterLocation.Header,
        Description = "API Key for external system integration"
    });
    
    // Global security requirement
    options.AddSecurityRequirement(new OpenApiSecurityRequirement
    {
        {
            new OpenApiSecurityScheme
            {
                Reference = new OpenApiReference { Type = ReferenceType.SecurityScheme, Id = "Bearer" }
            },
            Array.Empty<string>()
        }
    });
    
    // Include XML documentation
    var xmlFiles = Directory.GetFiles(AppContext.BaseDirectory, "*.xml");
    foreach (var xmlFile in xmlFiles)
    {
        options.IncludeXmlComments(xmlFile);
    }
    
    // Custom filters
    options.OperationFilter<AuthorizeOperationFilter>();
    options.OperationFilter<CorrelationIdOperationFilter>();
    options.SchemaFilter<ExampleSchemaFilter>();
    options.DocumentFilter<TagDescriptionDocumentFilter>();
    
    // Configure serialization
    options.EnableAnnotations();
    options.UseAllOfToExtendReferenceSchemas();
    options.UseOneOfForPolymorphism();
    options.UseInlineDefinitionsForEnums();
    
    // Custom schema IDs
    options.CustomSchemaIds(type => type.FullName?.Replace("+", "."));
});

// Comprehensive controller with full documentation
/// <summary>
/// E-commerce product management API
/// </summary>
/// <remarks>
/// This API provides comprehensive product management capabilities including:
/// - Product CRUD operations
/// - Inventory management
/// - Price and promotion handling
/// - Category and attribute management
/// - Search and filtering capabilities
/// </remarks>
[ApiController]
[Route("api/v1/[controller]")]
[Produces("application/json", "application/xml")]
[SwaggerTag("Products", "Product catalog and inventory management")]
public class ProductsController : ControllerBase
{
    /// <summary>
    /// Search and retrieve products with advanced filtering
    /// </summary>
    /// <remarks>
    /// This endpoint supports comprehensive product search with the following capabilities:
    /// 
    /// **Filtering Options:**
    /// - Text search across name and description
    /// - Category-based filtering
    /// - Price range filtering
    /// - Availability status filtering
    /// - Tag-based filtering
    /// 
    /// **Sorting Options:**
    /// - Name (alphabetical)
    /// - Price (ascending/descending)
    /// - Created date (newest/oldest)
    /// - Popularity (based on sales)
    /// 
    /// **Pagination:**
    /// - Supports offset-based pagination
    /// - Maximum page size is 100 items
    /// - Includes total count and navigation links
    /// 
    /// **Performance Notes:**
    /// - Results are cached for 5 minutes
    /// - Search queries are optimized with full-text search
    /// - Supports conditional requests with ETags
    /// </remarks>
    /// <param name="parameters">Query parameters for filtering and pagination</param>
    /// <returns>Paginated list of products matching the search criteria</returns>
    /// <response code="200">Products retrieved successfully</response>
    /// <response code="400">Invalid query parameters</response>
    /// <response code="500">Internal server error</response>
    [HttpGet]
    [ProducesResponseType(typeof(PagedResult<ProductSummaryDto>), 200)]
    [ProducesResponseType(typeof(ValidationProblemDetails), 400)]
    [ProducesResponseType(typeof(ProblemDetails), 500)]
    [SwaggerOperation(
        Summary = "Search products with filtering and pagination",
        Description = "Advanced product search with comprehensive filtering, sorting, and pagination capabilities.",
        OperationId = "SearchProducts",
        Tags = new[] { "Products", "Search" }
    )]
    [ResponseCache(Duration = 300, VaryByQueryKeys = new[] { "*" })]
    public async Task<ActionResult<PagedResult<ProductSummaryDto>>> SearchProducts(
        [FromQuery] ProductSearchParameters parameters)
    {
        var result = await _productService.SearchProductsAsync(parameters);
        
        // Add pagination headers
        Response.Headers.Add("X-Total-Count", result.TotalItems.ToString());
        Response.Headers.Add("X-Page", result.Page.ToString());
        Response.Headers.Add("X-Page-Size", result.PageSize.ToString());
        
        return Ok(result);
    }
    
    /// <summary>
    /// Create a new product in the catalog
    /// </summary>
    /// <remarks>
    /// Creates a new product with comprehensive validation and business rules:
    /// 
    /// **Validation Rules:**
    /// - Product name must be unique within the category
    /// - SKU must be globally unique
    /// - Price must be positive
    /// - Category must exist and be active
    /// 
    /// **Business Rules:**
    /// - Digital products cannot have weight or shipping costs
    /// - Physical products require weight and dimensions
    /// - Promotional products require valid promotion dates
    /// 
    /// **Post-Creation Actions:**
    /// - Inventory record is automatically created
    /// - Search index is updated
    /// - Audit log entry is created
    /// - Cache is invalidated
    /// </remarks>
    /// <param name="createRequest">Product creation data</param>
    /// <returns>The created product with system-generated metadata</returns>
    /// <response code="201">Product created successfully</response>
    /// <response code="400">Invalid product data or validation errors</response>
    /// <response code="409">Product name or SKU already exists</response>
    /// <response code="422">Business rule validation failed</response>
    [HttpPost]
    [Authorize(Roles = "Admin,ProductManager")]
    [ProducesResponseType(typeof(ProductDetailDto), 201)]
    [ProducesResponseType(typeof(ValidationProblemDetails), 400)]
    [ProducesResponseType(typeof(ProblemDetails), 409)]
    [ProducesResponseType(typeof(ProblemDetails), 422)]
    [SwaggerOperation(
        Summary = "Create a new product",
        Description = "Creates a new product in the catalog with comprehensive validation and business rule enforcement.",
        OperationId = "CreateProduct",
        Tags = new[] { "Products", "Management" }
    )]
    [SwaggerRequestExample(typeof(CreateProductRequest), typeof(CreateProductExampleProvider))]
    [SwaggerResponseExample(201, typeof(ProductDetailExampleProvider))]
    public async Task<ActionResult<ProductDetailDto>> CreateProduct(
        [FromBody] CreateProductRequest createRequest)
    {
        try
        {
            var product = await _productService.CreateProductAsync(createRequest);
            
            return CreatedAtAction(
                nameof(GetProductById),
                new { id = product.Id },
                product);
        }
        catch (DuplicateResourceException ex)
        {
            return Conflict(new ProblemDetails
            {
                Type = "https://api.company.com/problems/duplicate-resource",
                Title = "Duplicate Resource",
                Status = 409,
                Detail = ex.Message,
                Instance = HttpContext.Request.Path
            });
        }
        catch (BusinessRuleViolationException ex)
        {
            return UnprocessableEntity(new ProblemDetails
            {
                Type = "https://api.company.com/problems/business-rule-violation",
                Title = "Business Rule Violation",
                Status = 422,
                Detail = ex.Message,
                Instance = HttpContext.Request.Path
            });
        }
    }
}`,
        },
      ],
      exercise: {
        instructions:
          'Create comprehensive Swagger documentation for a library management API. Include detailed operation descriptions, request/response examples, multiple security schemes, custom operation filters, and schema documentation. Implement advanced features like API versioning, custom themes, and example providers.',
      },
    },
    {
      title: 'Versioning',
      description:
        'Learn to implement API versioning strategies to maintain backward compatibility while evolving your APIs over time.',
      sections: [
        {
          title: 'API Versioning Strategies and Implementation',
          explanation: `
        <p>API versioning is essential for maintaining backward compatibility while evolving your APIs. There are several strategies for versioning APIs, each with their own advantages and trade-offs.</p>
        
        <h4>URL Path Versioning</h4>
        <p>Include the version number directly in the URL path. This is the most explicit and visible approach.</p>

        <div class="code-example">
          <pre><code>// URL Path versioning examples
// Version 1.0
[Route("api/v1/[controller]")]
public class ProductsV1Controller : ControllerBase
{
    [HttpGet]
    public async Task<ActionResult<List<ProductDtoV1>>> GetProducts()
    {
        var products = await _productService.GetProductsAsync();
        return Ok(_mapper.Map<List<ProductDtoV1>>(products));
    }
}

// Version 2.0 with enhanced features
[Route("api/v2/[controller]")]
public class ProductsV2Controller : ControllerBase
{
    [HttpGet]
    public async Task<ActionResult<PagedResult<ProductDtoV2>>> GetProducts(
        [FromQuery] ProductQueryParametersV2 queryParams)
    {
        var products = await _productService.GetProductsAsync(queryParams);
        return Ok(_mapper.Map<PagedResult<ProductDtoV2>>(products));
    }
}

// Configure routing for multiple versions
builder.Services.AddControllers();
builder.Services.AddApiVersioning(options =>
{
    options.DefaultApiVersion = new ApiVersion(1, 0);
    options.AssumeDefaultVersionWhenUnspecified = true;
    options.ApiVersionReader = ApiVersionReader.Combine(
        new UrlSegmentApiVersionReader(),
        new HeaderApiVersionReader("X-API-Version"),
        new QueryStringApiVersionReader("version")
    );
});
</code></pre>
        </div>

        <h4>Header-Based Versioning</h4>
        <p>Use HTTP headers to specify the API version, keeping URLs clean but making versioning less visible.</p>

        <div class="code-example">
          <pre><code>// Header-based versioning
[ApiController]
[Route("api/[controller]")]
[ApiVersion("1.0")]
[ApiVersion("2.0")]
public class ProductsController : ControllerBase
{
    [HttpGet]
    [MapToApiVersion("1.0")]
    public async Task<ActionResult<List<ProductDtoV1>>> GetProductsV1()
    {
        var products = await _productService.GetProductsAsync();
        return Ok(_mapper.Map<List<ProductDtoV1>>(products));
    }
    
    [HttpGet]
    [MapToApiVersion("2.0")]
    public async Task<ActionResult<PagedResult<ProductDtoV2>>> GetProductsV2(
        [FromQuery] ProductQueryParametersV2 queryParams)
    {
        var products = await _productService.GetProductsAsync(queryParams);
        return Ok(_mapper.Map<PagedResult<ProductDtoV2>>(products));
    }
}

// Usage: 
// GET /api/products
// Headers: X-API-Version: 2.0
</code></pre>
        </div>

        <h4>Query Parameter Versioning</h4>
        <p>Specify the version using query parameters, offering flexibility but potentially cluttering URLs.</p>

        <div class="code-example">
          <pre><code>// Query parameter versioning
builder.Services.AddApiVersioning(options =>
{
    options.DefaultApiVersion = new ApiVersion(1, 0);
    options.AssumeDefaultVersionWhenUnspecified = true;
    options.ApiVersionReader = new QueryStringApiVersionReader("version");
});

// Usage:
// GET /api/products?version=2.0
// GET /api/products (defaults to v1.0)

[ApiController]
[Route("api/[controller]")]
public class ProductsController : ControllerBase
{
    [HttpGet]
    [MapToApiVersion("1.0")]
    public async Task<ActionResult<List<ProductDtoV1>>> GetProductsV1()
    {
        return Ok(await GetLegacyProducts());
    }
    
    [HttpGet]
    [MapToApiVersion("2.0")]
    public async Task<ActionResult<PagedResult<ProductDtoV2>>> GetProductsV2(
        [FromQuery] ProductQueryParametersV2 queryParams)
    {
        return Ok(await GetEnhancedProducts(queryParams));
    }
}
</code></pre>
        </div>

        <h4>Media Type (Content Negotiation) Versioning</h4>
        <p>Use Accept headers with custom media types to specify versions, following REST principles closely.</p>

        <div class="code-example">
          <pre><code>// Media type versioning
builder.Services.AddApiVersioning(options =>
{
    options.ApiVersionReader = new MediaTypeApiVersionReader();
});

builder.Services.AddVersionedApiExplorer(options =>
{
    options.GroupNameFormat = "'v'VVV";
    options.SubstituteApiVersionInUrl = true;
});

[ApiController]
[Route("api/[controller]")]
public class ProductsController : ControllerBase
{
    [HttpGet]
    [MapToApiVersion("1.0")]
    [Produces("application/vnd.company.product.v1+json")]
    public async Task<ActionResult<List<ProductDtoV1>>> GetProductsV1()
    {
        var products = await _productService.GetProductsAsync();
        return Ok(_mapper.Map<List<ProductDtoV1>>(products));
    }
    
    [HttpGet]
    [MapToApiVersion("2.0")]
    [Produces("application/vnd.company.product.v2+json")]
    public async Task<ActionResult<PagedResult<ProductDtoV2>>> GetProductsV2()
    {
        var products = await _productService.GetEnhancedProductsAsync();
        return Ok(_mapper.Map<PagedResult<ProductDtoV2>>(products));
    }
}

// Usage:
// GET /api/products
// Accept: application/vnd.company.product.v2+json
</code></pre>
        </div>

        <h4>Comprehensive Versioning Setup</h4>
        <p>Implement a robust versioning solution with proper configuration, documentation, and deprecation handling.</p>

        <div class="code-example">
          <pre><code>// Complete versioning configuration in Program.cs
builder.Services.AddApiVersioning(options =>
{
    // Default version
    options.DefaultApiVersion = new ApiVersion(2, 0);
    options.AssumeDefaultVersionWhenUnspecified = true;
    
    // Support multiple versioning methods
    options.ApiVersionReader = ApiVersionReader.Combine(
        new UrlSegmentApiVersionReader(),
        new HeaderApiVersionReader("X-API-Version"),
        new QueryStringApiVersionReader("version"),
        new MediaTypeApiVersionReader("ver")
    );
    
    // Version format
    options.ApiVersionSelector = new CurrentImplementationApiVersionSelector(options);
    
    // Error handling
    options.ErrorResponses = new CustomApiVersionErrorProvider();
});

builder.Services.AddVersionedApiExplorer(options =>
{
    options.GroupNameFormat = "'v'VVV";
    options.SubstituteApiVersionInUrl = true;
    options.AssumeDefaultVersionWhenUnspecified = true;
});

// Configure Swagger for multiple versions
builder.Services.AddSwaggerGen(options =>
{
    var provider = builder.Services.BuildServiceProvider()
        .GetRequiredService<IApiVersionDescriptionProvider>();
        
    foreach (var description in provider.ApiVersionDescriptions)
    {
        options.SwaggerDoc(description.GroupName, new OpenApiInfo
        {
            Title = "Product API",
            Version = description.ApiVersion.ToString(),
            Description = description.IsDeprecated ? " - DEPRECATED" : ""
        });
    }
});

// Version-aware controllers
[ApiController]
[Route("api/v{version:apiVersion}/[controller]")]
[ApiVersion("1.0", Deprecated = true)]
[ApiVersion("2.0")]
[ApiVersion("3.0")]
public class ProductsController : ControllerBase
{
    private readonly IApiVersioningFeature _apiVersioningFeature;
    
    public ProductsController(IHttpContextAccessor httpContextAccessor)
    {
        _apiVersioningFeature = httpContextAccessor.HttpContext.Features.Get<IApiVersioningFeature>();
    }
    
    [HttpGet]
    [MapToApiVersion("1.0")]
    [Obsolete("This version is deprecated. Use v2.0 or later.")]
    public async Task<ActionResult<List<ProductDtoV1>>> GetProductsV1()
    {
        // Add deprecation headers
        Response.Headers.Add("X-API-Deprecated", "true");
        Response.Headers.Add("X-API-Sunset", "2024-12-31");
        Response.Headers.Add("X-API-Successor", "v2.0");
        
        var products = await _productService.GetProductsAsync();
        return Ok(_mapper.Map<List<ProductDtoV1>>(products));
    }
    
    [HttpGet]
    [MapToApiVersion("2.0")]
    public async Task<ActionResult<PagedResult<ProductDtoV2>>> GetProductsV2(
        [FromQuery] ProductQueryParametersV2 queryParams)
    {
        var version = _apiVersioningFeature.RequestedApiVersion;
        _logger.LogInformation("API version {Version} requested", version);
        
        var products = await _productService.GetProductsAsync(queryParams);
        return Ok(_mapper.Map<PagedResult<ProductDtoV2>>(products));
    }
    
    [HttpGet]
    [MapToApiVersion("3.0")]
    public async Task<ActionResult<PagedResult<ProductDtoV3>>> GetProductsV3(
        [FromQuery] ProductQueryParametersV3 queryParams)
    {
        // Latest version with new features
        var products = await _productService.GetProductsWithAnalyticsAsync(queryParams);
        return Ok(_mapper.Map<PagedResult<ProductDtoV3>>(products));
    }
}

// Custom error provider for versioning
public class CustomApiVersionErrorProvider : DefaultErrorResponseProvider
{
    public override IActionResult CreateResponse(ErrorResponseContext context)
    {
        var errorResponse = new
        {
            error = new
            {
                code = context.ErrorCode,
                message = context.Message,
                supportedVersions = context.Request.HttpContext
                    .GetRequestedApiVersion()?.ToString(),
                availableVersions = new[] { "1.0", "2.0", "3.0" }
            }
        };
        
        return new ObjectResult(errorResponse)
        {
            StatusCode = 400
        };
    }
}
</code></pre>
        </div>

        <div class="interview-tip">
          <p><span class="interview-icon">🎯</span> <strong>Interview Focus:</strong> Demonstrate understanding of API evolution and backward compatibility strategies.</p>
          <p>Key interview questions include:</p>
          <ul>
            <li>"What are the pros and cons of different API versioning strategies?"</li>
            <li>"How do you handle breaking changes in API evolution?"</li>
            <li>"What's the difference between semantic versioning and API versioning?"</li>
            <li>"How do you communicate API deprecation to consumers?"</li>
            <li>"When would you use header-based vs URL-based versioning?"</li>
            <li>"How do you maintain multiple API versions in production?"</li>
          </ul>
        </div>
      `,
          codeExample: `// Production-ready API versioning implementation

// Complete versioning setup with best practices
public class Startup
{
    public void ConfigureServices(IServiceCollection services)
    {
        // API Versioning configuration
        services.AddApiVersioning(options =>
        {
            options.DefaultApiVersion = new ApiVersion(2, 0);
            options.AssumeDefaultVersionWhenUnspecified = true;
            
            // Multiple version reading strategies
            options.ApiVersionReader = ApiVersionReader.Combine(
                new UrlSegmentApiVersionReader(),
                new HeaderApiVersionReader("X-API-Version"),
                new QueryStringApiVersionReader("version")
            );
            
            // Custom error responses
            options.ErrorResponses = new ApiVersionErrorProvider();
        });
        
        services.AddVersionedApiExplorer(options =>
        {
            options.GroupNameFormat = "'v'VVV";
            options.SubstituteApiVersionInUrl = true;
        });
        
        // Version-specific services
        services.AddScoped<IProductServiceV1, ProductServiceV1>();
        services.AddScoped<IProductServiceV2, ProductServiceV2>();
        services.AddScoped<IProductServiceV3, ProductServiceV3>();
    }
}

// Multi-version controller with proper deprecation handling
[ApiController]
[Route("api/v{version:apiVersion}/[controller]")]
[ApiVersion("1.0", Deprecated = true)]
[ApiVersion("2.0")]
[ApiVersion("3.0")]
public class ProductsController : ControllerBase
{
    private readonly IServiceProvider _serviceProvider;
    private readonly ILogger<ProductsController> _logger;
    
    public ProductsController(IServiceProvider serviceProvider, ILogger<ProductsController> logger)
    {
        _serviceProvider = serviceProvider;
        _logger = logger;
    }
    
    [HttpGet]
    [MapToApiVersion("1.0")]
    [SwaggerOperation(Summary = "Get products (v1.0 - DEPRECATED)", 
                     Description = "Legacy endpoint. Please migrate to v2.0 or later.")]
    [ProducesResponseType(typeof(List<ProductDtoV1>), 200)]
    [Obsolete("This version is deprecated. Use v2.0 or later.")]
    public async Task<ActionResult<List<ProductDtoV1>>> GetProductsV1()
    {
        // Add deprecation warnings
        Response.Headers.Add("X-API-Deprecated", "true");
        Response.Headers.Add("X-API-Sunset", "2024-12-31");
        Response.Headers.Add("X-API-Successor", "v2.0");
        Response.Headers.Add("Warning", "299 - "This API version is deprecated"");
        
        _logger.LogWarning("Deprecated API v1.0 accessed for products endpoint");
        
        var service = _serviceProvider.GetRequiredService<IProductServiceV1>();
        var products = await service.GetProductsAsync();
        
        return Ok(products);
    }
    
    [HttpGet]
    [MapToApiVersion("2.0")]
    [SwaggerOperation(Summary = "Get products with filtering (v2.0)", 
                     Description = "Enhanced endpoint with filtering and pagination support.")]
    [ProducesResponseType(typeof(PagedResult<ProductDtoV2>), 200)]
    public async Task<ActionResult<PagedResult<ProductDtoV2>>> GetProductsV2(
        [FromQuery] ProductQueryParametersV2 queryParams)
    {
        var service = _serviceProvider.GetRequiredService<IProductServiceV2>();
        var result = await service.GetProductsAsync(queryParams);
        
        // Add version info header
        Response.Headers.Add("X-API-Version", "2.0");
        
        return Ok(result);
    }
    
    [HttpGet]
    [MapToApiVersion("3.0")]
    [SwaggerOperation(Summary = "Get products with analytics (v3.0)", 
                     Description = "Latest endpoint with advanced analytics and AI recommendations.")]
    [ProducesResponseType(typeof(EnhancedPagedResult<ProductDtoV3>), 200)]
    public async Task<ActionResult<EnhancedPagedResult<ProductDtoV3>>> GetProductsV3(
        [FromQuery] ProductQueryParametersV3 queryParams)
    {
        var service = _serviceProvider.GetRequiredService<IProductServiceV3>();
        var result = await service.GetProductsWithAnalyticsAsync(queryParams);
        
        // Add feature flags info
        Response.Headers.Add("X-API-Version", "3.0");
        Response.Headers.Add("X-Features", "analytics,recommendations,real-time");
        
        return Ok(result);
    }
    
    [HttpPost]
    [MapToApiVersion("2.0")]
    [MapToApiVersion("3.0")]
    public async Task<ActionResult<ProductDto>> CreateProduct(
        [FromBody] CreateProductRequest request,
        ApiVersion apiVersion)
    {
        // Version-specific handling
        if (apiVersion.MajorVersion == 2)
        {
            var serviceV2 = _serviceProvider.GetRequiredService<IProductServiceV2>();
            var result = await serviceV2.CreateProductAsync(request);
            return CreatedAtAction(nameof(GetProductsV2), new { id = result.Id }, result);
        }
        else
        {
            var serviceV3 = _serviceProvider.GetRequiredService<IProductServiceV3>();
            var result = await serviceV3.CreateProductWithEnhancementsAsync(request);
            return CreatedAtAction(nameof(GetProductsV3), new { id = result.Id }, result);
        }
    }
}

// Version-specific DTOs with proper evolution
public class ProductDtoV1
{
    public int Id { get; set; }
    public string Name { get; set; }
    public decimal Price { get; set; }
    public string Description { get; set; }
}

public class ProductDtoV2 : ProductDtoV1
{
    public string Category { get; set; }
    public List<string> Tags { get; set; } = new();
    public DateTime CreatedAt { get; set; }
    public bool InStock { get; set; }
}

public class ProductDtoV3 : ProductDtoV2
{
    public ProductAnalytics Analytics { get; set; }
    public List<ProductRecommendation> Recommendations { get; set; } = new();
    public Dictionary<string, object> Metadata { get; set; } = new();
}

// Middleware for version-specific behavior
public class ApiVersionMiddleware
{
    private readonly RequestDelegate _next;
    private readonly ILogger<ApiVersionMiddleware> _logger;
    
    public ApiVersionMiddleware(RequestDelegate next, ILogger<ApiVersionMiddleware> logger)
    {
        _next = next;
        _logger = logger;
    }
    
    public async Task InvokeAsync(HttpContext context)
    {
        var apiVersion = context.GetRequestedApiVersion();
        
        if (apiVersion != null)
        {
            // Log version usage
            _logger.LogInformation("API version {Version} requested for {Path}", 
                apiVersion, context.Request.Path);
            
            // Add version-specific headers
            context.Response.Headers.Add("X-API-Version", apiVersion.ToString());
            
            // Check for deprecated versions
            if (IsDeprecatedVersion(apiVersion))
            {
                context.Response.Headers.Add("X-API-Deprecated", "true");
                context.Response.Headers.Add("X-API-Sunset", GetSunsetDate(apiVersion));
            }
        }
        
        await _next(context);
    }
    
    private bool IsDeprecatedVersion(ApiVersion version)
    {
        return version.MajorVersion < 2;
    }
    
    private string GetSunsetDate(ApiVersion version)
    {
        return version.MajorVersion switch
        {
            1 => "2024-12-31",
            _ => ""
        };
    }
}`,
        },
      ],
      exercise: {
        instructions:
          'Implement a comprehensive API versioning strategy for an e-commerce platform. Support multiple versioning methods (URL, header, query parameter), handle deprecated versions gracefully, create version-specific DTOs and services, and implement proper Swagger documentation for all versions. Include migration guides and deprecation timelines.',
      },
    },
    {
      title: 'Authentication and Authorization',
      description:
        'Implement secure authentication and authorization mechanisms to protect your APIs and control access to resources.',
      sections: [
        {
          title: 'JWT Authentication and Authorization Implementation',
          explanation: `
        <p>JSON Web Tokens (JWT) are a popular standard for securing APIs. They provide a stateless way to authenticate users and include claims that can be used for authorization decisions.</p>
        
        <h4>JWT Authentication Setup</h4>
        <p>Configure JWT authentication in ASP.NET Core with proper token validation and security best practices.</p>

        <div class="code-example">
          <pre><code>// Program.cs - JWT Configuration
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
using System.Text;

var builder = WebApplication.CreateBuilder(args);

// Add JWT Authentication
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
            Encoding.UTF8.GetBytes(builder.Configuration["Jwt:SecretKey"])),
        ClockSkew = TimeSpan.Zero // Remove default 5-minute tolerance
    };
    
    options.Events = new JwtBearerEvents
    {
        OnAuthenticationFailed = context =>
        {
            if (context.Exception.GetType() == typeof(SecurityTokenExpiredException))
            {
                context.Response.Headers.Add("Token-Expired", "true");
            }
            return Task.CompletedTask;
        },
        OnChallenge = context =>
        {
            context.HandleResponse();
            context.Response.StatusCode = 401;
            context.Response.ContentType = "application/json";
            
            var result = JsonSerializer.Serialize(new
            {
                error = "unauthorized",
                message = "Access token is missing or invalid"
            });
            
            return context.Response.WriteAsync(result);
        },
        OnTokenValidated = context =>
        {
            // Add custom validation logic
            var userService = context.HttpContext.RequestServices
                .GetRequiredService<IUserService>();
            
            var userId = context.Principal.FindFirst(ClaimTypes.NameIdentifier)?.Value;
            if (!string.IsNullOrEmpty(userId))
            {
                // Check if user is still active
                var isActive = userService.IsUserActiveAsync(userId).Result;
                if (!isActive)
                {
                    context.Fail("User account is inactive");
                }
            }
            
            return Task.CompletedTask;
        }
    };
});

// Add Authorization with policies
builder.Services.AddAuthorization(options =>
{
    options.AddPolicy("RequireAdminRole", policy =>
        policy.RequireRole("Admin"));
        
    options.AddPolicy("RequireManagerOrAdmin", policy =>
        policy.RequireRole("Manager", "Admin"));
        
    options.AddPolicy("MinimumAge18", policy =>
        policy.RequireClaim("age", "18", "19", "20", "21")); // etc.
        
    options.AddPolicy("ProductManagement", policy =>
        policy.RequireRole("Admin", "ProductManager")
              .RequireClaim("permissions", "product:write"));
});

var app = builder.Build();

app.UseAuthentication();
app.UseAuthorization();

app.MapControllers();
app.Run();
</code></pre>
        </div>

        <h4>JWT Token Generation and Management</h4>
        <p>Implement secure token generation with proper claims and refresh token handling.</p>

        <div class="code-example">
          <pre><code>// JWT Service for token generation
public interface IJwtService
{
    Task<AuthenticationResult> GenerateTokenAsync(User user);
    Task<AuthenticationResult> RefreshTokenAsync(string refreshToken);
    Task<bool> RevokeTokenAsync(string refreshToken);
}

public class JwtService : IJwtService
{
    private readonly IConfiguration _configuration;
    private readonly IUserService _userService;
    private readonly IRefreshTokenService _refreshTokenService;
    private readonly ILogger<JwtService> _logger;
    
    public JwtService(
        IConfiguration configuration,
        IUserService userService,
        IRefreshTokenService refreshTokenService,
        ILogger<JwtService> logger)
    {
        _configuration = configuration;
        _userService = userService;
        _refreshTokenService = refreshTokenService;
        _logger = logger;
    }
    
    public async Task<AuthenticationResult> GenerateTokenAsync(User user)
    {
        var tokenHandler = new JwtSecurityTokenHandler();
        var key = Encoding.UTF8.GetBytes(_configuration["Jwt:SecretKey"]);
        
        var claims = new List<Claim>
        {
            new(ClaimTypes.NameIdentifier, user.Id.ToString()),
            new(ClaimTypes.Email, user.Email),
            new(ClaimTypes.Name, user.UserName),
            new("user_id", user.Id.ToString()),
            new("email_verified", user.EmailConfirmed.ToString().ToLower()),
            new("account_created", user.CreatedAt.ToString("yyyy-MM-dd"))
        };
        
        // Add role claims
        var userRoles = await _userService.GetUserRolesAsync(user.Id);
        foreach (var role in userRoles)
        {
            claims.Add(new Claim(ClaimTypes.Role, role));
        }
        
        // Add permission claims
        var userPermissions = await _userService.GetUserPermissionsAsync(user.Id);
        foreach (var permission in userPermissions)
        {
            claims.Add(new Claim("permissions", permission));
        }
        
        var tokenDescriptor = new SecurityTokenDescriptor
        {
            Subject = new ClaimsIdentity(claims),
            Expires = DateTime.UtcNow.AddMinutes(
                double.Parse(_configuration["Jwt:AccessTokenExpirationMinutes"])),
            Issuer = _configuration["Jwt:Issuer"],
            Audience = _configuration["Jwt:Audience"],
            SigningCredentials = new SigningCredentials(
                new SymmetricSecurityKey(key),
                SecurityAlgorithms.HmacSha256Signature)
        };
        
        var token = tokenHandler.CreateToken(tokenDescriptor);
        var accessToken = tokenHandler.WriteToken(token);
        
        // Generate refresh token
        var refreshToken = await _refreshTokenService.GenerateRefreshTokenAsync(user.Id);
        
        _logger.LogInformation("JWT token generated for user {UserId}", user.Id);
        
        return new AuthenticationResult
        {
            AccessToken = accessToken,
            RefreshToken = refreshToken.Token,
            ExpiresAt = tokenDescriptor.Expires.Value,
            TokenType = "Bearer"
        };
    }
    
    public async Task<AuthenticationResult> RefreshTokenAsync(string refreshToken)
    {
        var storedRefreshToken = await _refreshTokenService.GetRefreshTokenAsync(refreshToken);
        
        if (storedRefreshToken == null || !storedRefreshToken.IsActive)
        {
            throw new SecurityTokenException("Invalid refresh token");
        }
        
        var user = await _userService.GetUserByIdAsync(storedRefreshToken.UserId);
        if (user == null || !user.IsActive)
        {
            throw new SecurityTokenException("User not found or inactive");
        }
        
        // Revoke old refresh token
        await _refreshTokenService.RevokeRefreshTokenAsync(refreshToken);
        
        // Generate new tokens
        return await GenerateTokenAsync(user);
    }
    
    public async Task<bool> RevokeTokenAsync(string refreshToken)
    {
        return await _refreshTokenService.RevokeRefreshTokenAsync(refreshToken);
    }
}

// Authentication controller
[ApiController]
[Route("api/[controller]")]
public class AuthController : ControllerBase
{
    private readonly IJwtService _jwtService;
    private readonly IUserService _userService;
    private readonly ILogger<AuthController> _logger;
    
    public AuthController(
        IJwtService jwtService,
        IUserService userService,
        ILogger<AuthController> logger)
    {
        _jwtService = jwtService;
        _userService = userService;
        _logger = logger;
    }
    
    [HttpPost("login")]
    public async Task<ActionResult<AuthenticationResult>> Login([FromBody] LoginRequest request)
    {
        try
        {
            var user = await _userService.ValidateUserCredentialsAsync(request.Email, request.Password);
            
            if (user == null)
            {
                return BadRequest(new { message = "Invalid email or password" });
            }
            
            if (!user.IsActive)
            {
                return BadRequest(new { message = "Account is disabled" });
            }
            
            var authResult = await _jwtService.GenerateTokenAsync(user);
            
            _logger.LogInformation("User {UserId} logged in successfully", user.Id);
            
            return Ok(authResult);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Login failed for email {Email}", request.Email);
            return StatusCode(500, new { message = "An error occurred during login" });
        }
    }
    
    [HttpPost("refresh")]
    public async Task<ActionResult<AuthenticationResult>> RefreshToken([FromBody] RefreshTokenRequest request)
    {
        try
        {
            var authResult = await _jwtService.RefreshTokenAsync(request.RefreshToken);
            return Ok(authResult);
        }
        catch (SecurityTokenException ex)
        {
            return BadRequest(new { message = ex.Message });
        }
    }
    
    [HttpPost("logout")]
    [Authorize]
    public async Task<IActionResult> Logout([FromBody] LogoutRequest request)
    {
        await _jwtService.RevokeTokenAsync(request.RefreshToken);
        return Ok(new { message = "Logged out successfully" });
    }
}
</code></pre>
        </div>

        <h4>Role-Based and Policy-Based Authorization</h4>
        <p>Authorization in ASP.NET Core goes beyond simple role checks. While roles provide basic grouping (Admin, User, Manager), modern applications need more sophisticated access control through policies and claims-based authorization.</p>

        <p><strong>Understanding Authorization Concepts:</strong></p>
        <ul>
          <li><strong>Roles:</strong> Simple group-based permissions (Admin, User, Manager)</li>
          <li><strong>Claims:</strong> Key-value pairs that describe what a user is or can do</li>
          <li><strong>Policies:</strong> Named authorization rules that combine multiple requirements</li>
          <li><strong>Requirements:</strong> Individual conditions that must be met for authorization</li>
        </ul>

        <p><strong>Setting Up Authorization Policies:</strong></p>
        <p>Authorization policies are defined during application startup and can combine multiple requirements. They provide a clean way to separate authorization logic from your controllers.</p>

        <div class="code-example">
          <pre><code>// Define authorization policies in Program.cs
builder.Services.AddAuthorization(options =>
{
    // Simple role-based policy
    options.AddPolicy("AdminOnly", policy => 
        policy.RequireRole("Admin"));
    
    // Multiple roles policy
    options.AddPolicy("ManagerOrAdmin", policy => 
        policy.RequireRole("Manager", "Admin"));
    
    // Claims-based policy
    options.AddPolicy("CanEditProducts", policy => 
        policy.RequireClaim("permissions", "product:edit"));
    
    // Complex policy with multiple requirements
    options.AddPolicy("SeniorManager", policy => 
        policy.RequireRole("Manager")
              .RequireClaim("department", "sales", "marketing")
              .RequireClaim("years_experience", "5"));
});</code></pre>
        </div>

        <p><strong>Custom Authorization Requirements:</strong></p>
        <p>For complex business rules, you can create custom authorization requirements. These allow you to implement sophisticated logic that goes beyond simple role or claim checks.</p>

        <div class="code-example">
          <pre><code>// Custom requirement for minimum age
public class MinimumAgeRequirement : IAuthorizationRequirement
{
    public int MinimumAge { get; }
    
    public MinimumAgeRequirement(int minimumAge)
    {
        MinimumAge = minimumAge;
    }
}</code></pre>
        </div>

        <p><strong>Authorization Handlers:</strong></p>
        <p>Handlers contain the actual logic for evaluating requirements. They examine the user's claims and determine whether the requirement is satisfied.</p>

        <div class="code-example">
          <pre><code>// Handler for minimum age requirement
public class MinimumAgeHandler : AuthorizationHandler<MinimumAgeRequirement>
{
    protected override Task HandleRequirementAsync(
        AuthorizationHandlerContext context,
        MinimumAgeRequirement requirement)
    {
        var birthDate = context.User.FindFirst("birth_date")?.Value;
        
        if (DateTime.TryParse(birthDate, out var dob))
        {
            var age = DateTime.Now.Year - dob.Year;
            if (dob > DateTime.Now.AddYears(-age)) age--;
            
            if (age >= requirement.MinimumAge)
            {
                context.Succeed(requirement);
            }
        }
        
        return Task.CompletedTask;
    }
}</code></pre>
        </div>

        <p><strong>Resource-Based Authorization:</strong></p>
        <p>Sometimes authorization depends on the specific resource being accessed. For example, users might only edit their own posts or products they created. This requires checking both the user's permissions and their relationship to the specific resource.</p>

        <div class="code-example">
          <pre><code>// Resource-based authorization for products
public class ProductAuthorizationHandler : 
    AuthorizationHandler<OperationAuthorizationRequirement, Product>
{
    protected override Task HandleRequirementAsync(
        AuthorizationHandlerContext context,
        OperationAuthorizationRequirement requirement,
        Product product)
    {
        var userId = context.User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
        
        if (requirement == Operations.Read)
        {
            // Anyone can read public products
            if (product.IsPublic)
                context.Succeed(requirement);
        }
        else if (requirement == Operations.Update)
        {
            // Only owner or admin can update
            if (product.OwnerId == userId || context.User.IsInRole("Admin"))
                context.Succeed(requirement);
        }
        
        return Task.CompletedTask;
    }
}</code></pre>
        </div>

        <p><strong>Using Authorization in Controllers:</strong></p>
        <p>Controllers can use authorization through attributes or by injecting the authorization service for more complex scenarios. The <code>[Authorize]</code> attribute can be applied at the controller or action level.</p>

        <div class="code-example">
          <pre><code>// Different authorization approaches in controllers
[Authorize] // Requires authentication for all actions
public class ProductsController : ControllerBase
{
    private readonly IAuthorizationService _authService;
    
    [HttpGet]
    [AllowAnonymous] // Override controller requirement
    public async Task<IActionResult> GetPublicProducts() { }
    
    [HttpPost]
    [Authorize(Roles = "Admin,Manager")] // Role-based
    public async Task<IActionResult> CreateProduct() { }
    
    [HttpPut("{id}")]
    [Authorize(Policy = "CanEditProducts")] // Policy-based
    public async Task<IActionResult> UpdateProduct(int id) { }
}</code></pre>
        </div>

        <p><strong>Programmatic Authorization Checks:</strong></p>
        <p>For complex scenarios, you can inject <code>IAuthorizationService</code> to perform authorization checks within your action methods. This is especially useful for resource-based authorization.</p>

        <div class="code-example">
          <pre><code>// Using IAuthorizationService for resource-based checks
[HttpPut("{id}")]
public async Task<IActionResult> UpdateProduct(int id, UpdateProductDto dto)
{
    var product = await _productService.GetByIdAsync(id);
    if (product == null) return NotFound();
    
    // Check if user can update this specific product
    var authResult = await _authorizationService.AuthorizeAsync(
        User, product, Operations.Update);
        
    if (!authResult.Succeeded)
        return Forbid();
        
    // Continue with update logic...
}</code></pre>
        </div>

        <p><strong>Claims-Based Authorization Benefits:</strong></p>
        <p>Claims provide fine-grained control over what users can do. Instead of rigid roles, you can assign specific permissions like "can_approve_orders", "can_view_reports", or "max_discount_percent". This allows for very flexible permission systems.</p>

        <div class="code-example">
          <pre><code>// Example of claims-based checking
public async Task<IActionResult> ApproveOrder(int orderId, decimal discountPercent)
{
    // Check if user can approve orders
    if (!User.HasClaim("permissions", "approve_orders"))
        return Forbid("Cannot approve orders");
    
    // Check discount limit from claims
    var maxDiscount = User.FindFirst("max_discount_percent")?.Value;
    if (decimal.TryParse(maxDiscount, out var limit) && discountPercent > limit)
        return Forbid($"Discount cannot exceed {limit}%");
    
    // Process approval...
}</code></pre>
        </div>

        <p><strong>Helper Extensions for Authorization:</strong></p>
        <p>Creating extension methods can make authorization checks more readable and reusable throughout your application.</p>

        <div class="code-example">
          <pre><code>// Useful extension methods for common authorization tasks
public static class ClaimsPrincipalExtensions
{
    public static string GetUserId(this ClaimsPrincipal principal)
    {
        return principal.FindFirst(ClaimTypes.NameIdentifier)?.Value;
    }
    
    public static bool HasPermission(this ClaimsPrincipal principal, string permission)
    {
        return principal.HasClaim("permissions", permission);
    }
    
    public static bool IsResourceOwner(this ClaimsPrincipal principal, string resourceOwnerId)
    {
        return principal.GetUserId() == resourceOwnerId;
    }
}
</code></pre>
        </div>

        <div class="interview-tip">
          <p><span class="interview-icon">🎯</span> <strong>Interview Focus:</strong> Demonstrate understanding of security principles and implementation patterns.</p>
          <p>Key interview questions include:</p>
          <ul>
            <li>"What are the security considerations when implementing JWT authentication?"</li>
            <li>"How do you handle token expiration and refresh in a secure way?"</li>
            <li>"What's the difference between authentication and authorization?"</li>
            <li>"How do you implement fine-grained permissions in your APIs?"</li>
            <li>"What are the best practices for storing and validating JWT tokens?"</li>
            <li>"How do you handle role-based vs claim-based authorization?"</li>
          </ul>
        </div>
      `,
          codeExample: `// Complete authentication and authorization implementation

// Startup configuration with comprehensive security
public class Program
{
    public static void Main(string[] args)
    {
        var builder = WebApplication.CreateBuilder(args);
        
        // Authentication
        builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
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
                        Encoding.UTF8.GetBytes(builder.Configuration["Jwt:Key"])),
                    ClockSkew = TimeSpan.Zero
                };
            });
        
        // Authorization with custom policies
        builder.Services.AddAuthorization(options =>
        {
            options.AddPolicy("AdminOnly", policy => policy.RequireRole("Admin"));
            options.AddPolicy("ManagerOrAdmin", policy => policy.RequireRole("Manager", "Admin"));
            options.AddPolicy("ProductAccess", policy =>
                policy.RequireAuthenticatedUser()
                      .RequireClaim("permissions", "product:read"));
            
            options.AddPolicy("MinAge18", policy =>
                policy.Requirements.Add(new MinimumAgeRequirement(18)));
        });
        
        // Register authorization handlers
        builder.Services.AddScoped<IAuthorizationHandler, MinimumAgeHandler>();
        builder.Services.AddScoped<IAuthorizationHandler, ProductAuthorizationHandler>();
        
        var app = builder.Build();
        
        app.UseAuthentication();
        app.UseAuthorization();
        app.MapControllers();
        app.Run();
    }
}

// Comprehensive API controller with security
[ApiController]
[Route("api/v1/[controller]")]
[Authorize]
public class SecureProductsController : ControllerBase
{
    private readonly IProductService _productService;
    private readonly IAuthorizationService _authorizationService;
    private readonly ILogger<SecureProductsController> _logger;
    
    public SecureProductsController(
        IProductService productService,
        IAuthorizationService authorizationService,
        ILogger<SecureProductsController> logger)
    {
        _productService = productService;
        _authorizationService = authorizationService;
        _logger = logger;
    }
    
    [HttpGet]
    [AllowAnonymous]
    public async Task<ActionResult<PagedResult<ProductDto>>> GetProducts(
        [FromQuery] ProductQueryParameters queryParams)
    {
        var products = await _productService.GetPublicProductsAsync(queryParams);
        return Ok(products);
    }
    
    [HttpGet("private")]
    [Authorize(Policy = "ProductAccess")]
    public async Task<ActionResult<PagedResult<ProductDto>>> GetPrivateProducts(
        [FromQuery] ProductQueryParameters queryParams)
    {
        var userId = User.GetUserId();
        var products = await _productService.GetUserProductsAsync(userId, queryParams);
        return Ok(products);
    }
    
    [HttpGet("{id}")]
    public async Task<ActionResult<ProductDto>> GetProduct(int id)
    {
        var product = await _productService.GetProductByIdAsync(id);
        if (product == null) return NotFound();
        
        // Resource-based authorization
        var authResult = await _authorizationService.AuthorizeAsync(
            User, product, "read");
            
        if (!authResult.Succeeded)
        {
            return User.Identity.IsAuthenticated ? Forbid() : Unauthorized();
        }
        
        return Ok(product);
    }
    
    [HttpPost]
    [Authorize(Policy = "ManagerOrAdmin")]
    public async Task<ActionResult<ProductDto>> CreateProduct([FromBody] CreateProductDto productDto)
    {
        if (!User.HasPermission("product:create"))
        {
            return Forbid("Insufficient permissions");
        }
        
        var userId = User.GetUserId();
        productDto.CreatedBy = userId;
        
        var product = await _productService.CreateProductAsync(productDto);
        
        _logger.LogInformation("Product {ProductId} created by user {UserId}", 
            product.Id, userId);
        
        return CreatedAtAction(nameof(GetProduct), new { id = product.Id }, product);
    }
    
    [HttpPut("{id}")]
    [Authorize]
    public async Task<ActionResult<ProductDto>> UpdateProduct(int id, [FromBody] UpdateProductDto productDto)
    {
        var product = await _productService.GetProductByIdAsync(id);
        if (product == null) return NotFound();
        
        // Check if user can modify this product
        var authResult = await _authorizationService.AuthorizeAsync(
            User, product, "update");
            
        if (!authResult.Succeeded)
        {
            return Forbid();
        }
        
        var updatedProduct = await _productService.UpdateProductAsync(id, productDto);
        return Ok(updatedProduct);
    }
    
    [HttpDelete("{id}")]
    [Authorize(Roles = "Admin")]
    public async Task<IActionResult> DeleteProduct(int id)
    {
        var product = await _productService.GetProductByIdAsync(id);
        if (product == null) return NotFound();
        
        await _productService.DeleteProductAsync(id);
        
        _logger.LogWarning("Product {ProductId} deleted by admin {UserId}", 
            id, User.GetUserId());
        
        return NoContent();
    }
    
    [HttpPost("{id}/approve")]
    [Authorize(Policy = "AdminOnly")]
    public async Task<IActionResult> ApproveProduct(int id)
    {
        await _productService.ApproveProductAsync(id);
        return Ok(new { message = "Product approved successfully" });
    }
}

// Security middleware for additional protection
public class SecurityHeadersMiddleware
{
    private readonly RequestDelegate _next;
    
    public SecurityHeadersMiddleware(RequestDelegate next)
    {
        _next = next;
    }
    
    public async Task InvokeAsync(HttpContext context)
    {
        // Add security headers
        context.Response.Headers.Add("X-Content-Type-Options", "nosniff");
        context.Response.Headers.Add("X-Frame-Options", "DENY");
        context.Response.Headers.Add("X-XSS-Protection", "1; mode=block");
        context.Response.Headers.Add("Referrer-Policy", "strict-origin-when-cross-origin");
        
        await _next(context);
    }
}`,
        },
      ],
      exercise: {
        instructions:
          'Implement a complete authentication and authorization system for a multi-tenant SaaS application. Include JWT token generation with refresh tokens, role-based and claim-based authorization, resource-based permissions, custom authorization policies, and comprehensive security middleware. Support multiple user types with different permission levels.',
      },
    },
  ],
  prepperSummary: `
  <div class="prepper-summary">
    <h3>🎯 Building Web APIs with .NET - Job Interview Summary</h3>
    
    <div class="summary-section">
      <h4>Core Concepts You Must Know</h4>
      <ul>
        <li><strong>RESTful API Design:</strong> Resource-based URLs, proper HTTP methods, stateless design, HATEOAS implementation</li>
        <li><strong>API Controllers:</strong> ControllerBase vs Controller, [ApiController] attribute benefits, action results, and error handling</li>
        <li><strong>HTTP Methods & Status Codes:</strong> GET (safe/idempotent), POST (non-idempotent), PUT (idempotent updates), PATCH (partial updates), DELETE, proper status code usage (200, 201, 400, 401, 403, 404, 409, 422, 500)</li>
        <li><strong>Model Binding & Validation:</strong> [FromRoute], [FromQuery], [FromBody], [FromHeader], custom model binders, Data Annotations, FluentValidation, custom validation attributes</li>
        <li><strong>Content Negotiation:</strong> Accept headers, custom output formatters (CSV, XML), localization, compression, performance optimization</li>
        <li><strong>API Documentation:</strong> Swagger/OpenAPI setup, XML documentation, operation filters, schema documentation, multiple versions</li>
        <li><strong>Versioning:</strong> URL path, header-based, query parameter, media type versioning, deprecation handling, migration strategies</li>
        <li><strong>Security:</strong> JWT authentication, authorization policies, role-based vs claim-based security, resource-based authorization, custom requirements</li>
      </ul>
    </div>

    <div class="summary-section">
      <h4>Technical Implementation Skills</h4>
      <ul>
        <li><strong>API Architecture:</strong> Understand separation of concerns, service layer patterns, dependency injection, middleware pipeline</li>
        <li><strong>Error Handling:</strong> Global exception handling, ProblemDetails, custom error responses, validation error formatting</li>
        <li><strong>Performance:</strong> Response caching, compression, conditional requests (ETags), pagination strategies, async/await patterns</li>
        <li><strong>Security Best Practices:</strong> Token validation, refresh token rotation, authorization handlers, security headers, CORS configuration</li>
        <li><strong>Testing:</strong> Unit testing controllers, integration testing APIs, mocking dependencies, testing security policies</li>
      </ul>
    </div>

    <div class="summary-section">
      <h4>Common Interview Questions</h4>
      <div class="interview-qa">
        <p><strong>Q: How do you handle API versioning in a production environment?</strong></p>
        <p><strong>A:</strong> "I implement multiple versioning strategies - URL path for clarity (/api/v1/products), headers for clean URLs, and query parameters for flexibility. I use ASP.NET Core's ApiVersioning package with proper deprecation headers, sunset dates, and migration documentation. I maintain separate DTOs per version and implement version-specific services when needed."</p>
        
        <p><strong>Q: Explain the difference between authentication and authorization.</strong></p>
        <p><strong>A:</strong> "Authentication verifies 'who you are' - confirming user identity through credentials. Authorization determines 'what you can do' - checking permissions after authentication. I implement JWT for stateless authentication and use role-based, claim-based, and resource-based authorization policies for fine-grained access control."</p>
        
        <p><strong>Q: How do you ensure API security?</strong></p>
        <p><strong>A:</strong> "I implement multiple security layers: JWT with proper validation parameters, refresh token rotation, role and claim-based authorization, resource-based policies for ownership checks, input validation and sanitization, security headers (CORS, CSP), rate limiting, and comprehensive logging for security events."</p>
        
        <p><strong>Q: How do you design RESTful APIs?</strong></p>
        <p><strong>A:</strong> "I follow REST principles: resource-based URLs with nouns, proper HTTP methods (GET for retrieval, POST for creation, PUT for full updates, PATCH for partial updates, DELETE for removal), stateless design, consistent error responses, proper status codes, and HATEOAS for discoverability when appropriate."</p>
      </div>
    </div>

    <div class="summary-section">
      <h4>Best Practices to Demonstrate</h4>
      <ul>
        <li><strong>Consistent API Design:</strong> Follow conventions for naming, error responses, pagination, and filtering</li>
        <li><strong>Comprehensive Documentation:</strong> Use Swagger with detailed descriptions, examples, and security documentation</li>
        <li><strong>Proper Error Handling:</strong> Return meaningful error messages with appropriate status codes and correlation IDs</li>
        <li><strong>Security First:</strong> Implement authentication, authorization, input validation, and security headers by default</li>
        <li><strong>Performance Optimization:</strong> Use caching, compression, pagination, and efficient data access patterns</li>
        <li><strong>Testability:</strong> Design for testability with proper separation of concerns and dependency injection</li>
      </ul>
    </div>

    <div class="key-takeaway">
      <h4>💡 Key Interview Takeaway</h4>
      <p>When discussing Web API development, emphasize your understanding of HTTP fundamentals, REST principles, security best practices, and production concerns like versioning, error handling, and performance. Show that you can build APIs that are not just functional, but maintainable, secure, and scalable.</p>
    </div>
  </div>`,
  challenge: {
    description:
      'Build a complete RESTful API for a Library Management System that demonstrates all the concepts covered in this section. Your API should handle books, authors, members, and borrowing transactions with full CRUD operations, authentication, authorization, versioning, and comprehensive documentation.',
    requirements: [
      'Implement RESTful API design with proper resource modeling and URL structure',
      'Create API controllers with proper action methods and response types',
      'Use appropriate HTTP methods and status codes for all operations',
      'Implement comprehensive model binding and validation using Data Annotations',
      'Support multiple content types (JSON, XML, CSV) with content negotiation',
      'Generate Swagger/OpenAPI documentation with detailed descriptions and examples',
      'Implement API versioning with support for v1 and v2 endpoints',
      'Add JWT-based authentication with role-based and claim-based authorization',
      'Include proper error handling with consistent error response format',
      'Add filtering, sorting, and pagination for collection endpoints',
      'Implement caching, compression, and performance optimizations',
      'Include comprehensive unit and integration tests',
    ],
    starterCode: `// Library Management System API - Challenge Starter Code
// Complete implementation of a comprehensive RESTful API

// 1. Define your domain models (Book, Author, Member, BorrowTransaction)
// 2. Create DTOs for API versioning (V1 and V2 with different properties)
// 3. Implement repository and service layers with proper interfaces
// 4. Build API controllers with full CRUD operations
// 5. Add JWT authentication and role-based authorization
// 6. Configure Swagger documentation with security schemes
// 7. Implement API versioning (v1 and v2 endpoints)
// 8. Add content negotiation (JSON, XML, CSV output formats)
// 9. Include comprehensive error handling and validation
// 10. Add filtering, sorting, and pagination for collections
// 11. Implement caching, compression, and performance optimizations
// 12. Write unit and integration tests for all endpoints

// Your API should include these main endpoints:
// GET    /api/v1/books - List books with filtering and pagination
// GET    /api/v1/books/{id} - Get specific book details
// POST   /api/v1/books - Create new book (requires authentication)
// PUT    /api/v1/books/{id} - Update book (requires authorization)
// DELETE /api/v1/books/{id} - Delete book (admin only)
// POST   /api/v1/books/{id}/borrow - Borrow a book
// POST   /api/v1/books/{id}/return - Return a book
// Similar endpoints for authors, members, and transactions

// Authentication endpoints:
// POST   /api/auth/login - User login with JWT token
// POST   /api/auth/refresh - Refresh JWT token
// POST   /api/auth/register - User registration

// Use proper HTTP status codes, implement comprehensive validation,
// add security headers, and ensure all responses follow consistent format.`,
  },
}

export default buildingWebAPIs
