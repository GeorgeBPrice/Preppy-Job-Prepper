// curriculum-section8.js - .NET Core Application Development

const dotNetCoreApplicationDevelopment = {
  title: '.NET Core Application Development',
  description:
    'Learn the end-to-end process of building, deploying, and maintaining .NET Core applications with best practices for the entire application lifecycle.',
  lessons: [
    {
      title: 'Application Lifecycle',
      description:
        'Master the complete .NET Core application lifecycle from startup to shutdown, understanding hosting models, configuration management, and service registration patterns.',
      sections: [
        {
          title: 'Application Startup and Configuration',
          explanation: `
        <p>.NET Core applications follow a well-defined startup sequence that gives you precise control over how your application initializes, configures services, and handles requests. Understanding this lifecycle is crucial for building robust, maintainable applications that can adapt to different environments and requirements.</p>
        
        <h4>Understanding the Startup Process</h4>
        
        <p>The .NET Core startup process is a carefully orchestrated sequence that ensures your application is properly configured before it begins serving requests. This process provides multiple extension points where you can inject custom logic, register services, and configure the request pipeline.</p>
        
        <p>The startup sequence follows these key phases:</p>
        <ul>
          <li><strong>Host Creation:</strong> The host is responsible for app lifetime management, dependency injection, logging, and configuration. It creates the foundation upon which your application runs.</li>
          <li><strong>Service Registration:</strong> This is where you configure the dependency injection container with all the services your application needs, from framework services to your custom business logic.</li>
          <li><strong>Middleware Pipeline Configuration:</strong> The middleware pipeline defines how incoming HTTP requests are processed, including authentication, routing, error handling, and response generation.</li>
          <li><strong>Application Launch:</strong> The host starts the web server and begins listening for incoming requests, applying the configured pipeline to each request.</li>
        </ul>

        <p><strong>Modern .NET 6+ Minimal Hosting Model:</strong> The simplified hosting model introduced in .NET 6 reduces boilerplate code while maintaining full control over the application lifecycle. This approach combines the Program.cs and Startup.cs files into a single, streamlined configuration that's easier to understand and maintain while preserving all the flexibility of the traditional approach.</p>

        <div class="code-example">
          <pre><code>// Essential startup configuration
var builder = WebApplication.CreateBuilder(args);

// Service registration
builder.Services.AddControllers();
builder.Services.AddDbContext<ApplicationDbContext>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection")));

var app = builder.Build();

// Middleware pipeline
app.UseHttpsRedirection();
app.UseAuthentication();
app.UseAuthorization();
app.MapControllers();

await app.RunAsync();</code></pre>
        </div>

        <h4>Configuration Management Strategy</h4>
        
        <p>Configuration in .NET Core is built on a hierarchical system where multiple sources can contribute settings, with later sources taking precedence over earlier ones. This design allows for flexible deployment scenarios where base settings can be overridden by environment-specific values or runtime parameters.</p>
        
        <p>The configuration hierarchy works as follows:</p>
        <ul>
          <li><strong>appsettings.json:</strong> Contains base configuration that applies to all environments. This includes default connection strings, general application settings, and logging configurations.</li>
          <li><strong>appsettings.{Environment}.json:</strong> Environment-specific overrides that allow the same codebase to behave differently in Development, Staging, and Production environments.</li>
          <li><strong>User Secrets:</strong> Development-time secrets stored outside the project directory. These should never be used in production and are automatically excluded from source control.</li>
          <li><strong>Environment Variables:</strong> Platform and deployment-specific settings that can be configured at the infrastructure level, making them ideal for containerized deployments.</li>
          <li><strong>Command Line Arguments:</strong> Runtime overrides that allow operators to modify behavior without changing configuration files.</li>
        </ul>
        
        <p>The power of this system lies in its ability to provide sensible defaults while allowing for environment-specific customization without code changes.</p>

        <div class="code-example">
          <pre><code>// Strongly-typed configuration
public class DatabaseOptions
{
    public string ConnectionString { get; set; }
    public int CommandTimeout { get; set; }
    public bool EnableRetryOnFailure { get; set; }
}

// Registration and usage
builder.Services.Configure<DatabaseOptions>(
    builder.Configuration.GetSection("Database"));

public class UserService
{
    private readonly DatabaseOptions _dbOptions;
    
    public UserService(IOptions<DatabaseOptions> dbOptions)
    {
        _dbOptions = dbOptions.Value;
    }
}</code></pre>
        </div>

        <h4>Environment-Aware Application Behavior</h4>
        
        <p>Environment awareness is a critical aspect of professional application development. Your application should behave appropriately based on where it's running, with different configurations for development convenience, staging validation, and production security and performance.</p>
        
        <p>In development environments, you want features that aid debugging and development productivity, such as detailed error pages, database developer tools, and mock services that don't require external dependencies. Staging environments should closely mirror production but might include additional logging or testing hooks. Production environments prioritize security, performance, and reliability over developer convenience.</p>

        <div class="code-example">
          <pre><code>// Environment-specific behavior
if (builder.Environment.IsDevelopment())
{
    builder.Services.AddSingleton<IEmailService, MockEmailService>();
    builder.Services.AddDatabaseDeveloperPageExceptionFilter();
}
else
{
    builder.Services.AddSingleton<IEmailService, SmtpEmailService>();
}

// Health checks for monitoring
builder.Services.AddHealthChecks()
    .AddDbContext<ApplicationDbContext>()
    .AddUrlGroup(new Uri("https://api.external-service.com/health"));</code></pre>
        </div>

        <h4>Service Lifetime Management and Best Practices</h4>
        
        <p>Understanding service lifetimes is fundamental to building applications that perform well and don't leak memory. The dependency injection container manages object creation and disposal based on the lifetime you specify, and choosing the wrong lifetime can lead to subtle bugs, memory leaks, or unexpected behavior.</p>
        
        <p><strong>Transient Services</strong> are created every time they're requested. This is appropriate for lightweight, stateless services that don't hold resources or maintain state between calls. Examples include utility classes, formatters, and simple business logic services.</p>
        
        <p><strong>Scoped Services</strong> are created once per request (or scope) and are ideal for services that maintain state during request processing but shouldn't be shared across requests. Database contexts, business services that aggregate data for a single operation, and user-specific services typically use scoped lifetime.</p>
        
        <p><strong>Singleton Services</strong> are created once for the application lifetime and shared across all requests. These are perfect for expensive-to-create objects, caches, thread-safe services, and configuration objects that don't change during application execution.</p>

        <div class="code-example">
          <pre><code>// Service lifetime examples
builder.Services.AddTransient<IEmailService, EmailService>();    // New each time
builder.Services.AddScoped<IUserService, UserService>();         // Per request
builder.Services.AddSingleton<IMemoryCache, MemoryCache>();      // App lifetime

// HttpClient factory pattern
builder.Services.AddHttpClient<ApiService>(client =>
{
    client.BaseAddress = new Uri("https://api.example.com/");
    client.Timeout = TimeSpan.FromSeconds(30);
});</code></pre>
        </div>

        <div class="interview-tip">
          <p><span class="interview-icon">🎯</span> <strong>Interview Focus:</strong> Demonstrate deep understanding of application lifecycle and service management principles.</p>
          <p>Expect questions like: "Walk me through the .NET Core startup process and explain where you would add custom initialization logic" and "How do you decide between different service lifetimes, and what problems can arise from incorrect choices?"</p>
        </div>
      `,
          codeExample: `// Complete application lifecycle with graceful shutdown
public class Program
{
    public static async Task Main(string[] args)
    {
        var builder = WebApplication.CreateBuilder(args);
        
        ConfigureServices(builder.Services, builder.Configuration);
        
        var app = builder.Build();
        ConfigureMiddleware(app);
        
        // Graceful shutdown handling
        var lifetime = app.Services.GetRequiredService<IHostApplicationLifetime>();
        lifetime.ApplicationStopping.Register(() =>
        {
            Console.WriteLine("Application is shutting down gracefully...");
        });
        
        await app.RunAsync();
    }
    
    private static void ConfigureServices(IServiceCollection services, IConfiguration configuration)
    {
        services.AddControllers();
        services.AddHealthChecks();
        services.AddScoped<IUserService, UserService>();
        services.Configure<ApiSettings>(configuration.GetSection("ApiSettings"));
    }
}`,
        },
      ],
      exercise: {
        instructions:
          'Create a multi-environment .NET Core application with proper configuration management, service registration, and lifecycle handling. Implement environment-specific behaviors, health checks, and graceful shutdown procedures. Test configuration override hierarchy and service lifetime behaviors.',
      },
    },
    {
      title: 'Logging and Monitoring',
      description:
        'Implement comprehensive logging, monitoring, and observability patterns for production .NET Core applications with structured logging and performance tracking.',
      sections: [
        {
          title: 'Structured Logging and Performance Monitoring',
          explanation: `
        <p>Effective logging and monitoring form the backbone of maintainable production applications. In modern distributed systems, traditional text-based logging falls short of providing the insights needed to quickly diagnose issues, track performance trends, and understand user behavior. .NET Core's built-in logging framework provides powerful capabilities for structured logging that integrates seamlessly with modern observability platforms.</p>
        
        <h4>Understanding Structured Logging</h4>
        
        <p>Structured logging goes beyond simple text messages by capturing both human-readable information and machine-readable data in a consistent format. Instead of concatenating values into strings, structured logging preserves the individual data points, making it possible to query, filter, and analyze logs programmatically.</p>
        
        <p>The key advantages of structured logging include:</p>
        <ul>
          <li><strong>Enhanced Searchability:</strong> You can query logs based on specific property values, making it easy to find all instances where a particular user encountered an error or where response times exceeded a threshold.</li>
          <li><strong>Correlation and Tracing:</strong> By including correlation IDs and context information, you can trace requests across multiple services and components, providing end-to-end visibility in distributed systems.</li>
          <li><strong>Performance Benefits:</strong> Conditional logging and efficient serialization reduce the overhead of logging in high-throughput applications.</li>
          <li><strong>Tool Integration:</strong> Modern logging platforms like ELK Stack, Splunk, and Application Insights can automatically parse and index structured logs for powerful analysis capabilities.</li>
        </ul>
        
        <p>The ILogger interface in .NET Core supports structured logging through template syntax, where placeholders in the message template are replaced with actual values while preserving the original values as separate properties in the log entry.</p>

        <div class="code-example">
          <pre><code>// Structured logging best practices
public class UserService
{
    private readonly ILogger<UserService> _logger;
    
    public async Task<User> CreateUserAsync(CreateUserRequest request)
    {
        using var scope = _logger.BeginScope("UserId: {UserId}", request.UserId);
        
        _logger.LogInformation("Creating user with email {Email}", request.Email);
        
        try
        {
            var user = new User { Email = request.Email };
            await _repository.AddAsync(user);
            
            _logger.LogInformation("User created successfully with ID {UserId}", user.Id);
            return user;
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Failed to create user with email {Email}", request.Email);
            throw;
        }
    }
}</code></pre>
        </div>

        <h4>Logging Configuration and Provider Ecosystem</h4>
        
        <p>The .NET Core logging system is built around a provider model that allows you to send log entries to multiple destinations simultaneously. Each provider can have its own configuration, filtering rules, and formatting options, giving you fine-grained control over how different types of log entries are processed.</p>
        
        <p>Common logging providers include the Console provider for development debugging, the Debug provider for IDE integration, file-based providers for local log storage, and cloud providers like Application Insights for centralized logging in production environments.</p>
        
        <p>Log level configuration allows you to control the verbosity of logging for different components of your application. You might want verbose Debug logging for your custom business logic while limiting Microsoft.AspNetCore to Warning level to reduce noise. This granular control helps maintain performance while ensuring you capture the information you need.</p>
        
        <p>Scopes provide a way to group related log entries together, which is particularly useful for tracking all the log entries related to a single request or operation. When you create a scope, all log entries written within that scope automatically include the scope's properties, making it easy to correlate related activities.</p>

        <div class="code-example">
          <pre><code>// Logging configuration
{
  "Logging": {
    "LogLevel": {
      "Default": "Information",
      "Microsoft.AspNetCore": "Warning"
    },
    "Console": {
      "IncludeScopes": true,
      "TimestampFormat": "yyyy-MM-dd HH:mm:ss "
    }
  }
}

// Multiple providers setup
builder.Logging.ClearProviders();
builder.Logging.AddConsole();
builder.Logging.AddApplicationInsights();</code></pre>
        </div>

        <h4>Application Performance Monitoring and Metrics</h4>
        
        <p>Modern applications require more than just logging to maintain optimal performance and user experience. Application Performance Monitoring (APM) involves collecting and analyzing metrics about your application's behavior, including response times, throughput, error rates, and resource utilization.</p>
        
        <p>.NET Core provides built-in support for metrics collection through the System.Diagnostics.Metrics namespace, which integrates with OpenTelemetry and other monitoring platforms. Custom metrics allow you to track business-specific indicators like order processing rates, payment success rates, or feature usage statistics.</p>
        
        <p>Key performance indicators you should monitor include:</p>
        <ul>
          <li><strong>Request Metrics:</strong> Response times, throughput, and error rates for HTTP endpoints</li>
          <li><strong>Business Metrics:</strong> Domain-specific measurements like conversion rates, transaction volumes, or user engagement</li>
          <li><strong>Infrastructure Metrics:</strong> CPU usage, memory consumption, disk space, and network activity</li>
          <li><strong>Dependency Metrics:</strong> Performance and availability of external services, databases, and APIs</li>
        </ul>

        <div class="code-example">
          <pre><code>// Custom metrics implementation
public class OrderService
{
    private readonly ILogger<OrderService> _logger;
    private readonly Counter<int> _orderCounter;
    private readonly Histogram<double> _orderProcessingTime;
    
    public OrderService(ILogger<OrderService> logger, IMeterFactory meterFactory)
    {
        _logger = logger;
        var meter = meterFactory.Create("OrderService");
        _orderCounter = meter.CreateCounter<int>("orders_processed_total");
        _orderProcessingTime = meter.CreateHistogram<double>("order_processing_duration_ms");
    }
    
    public async Task<OrderResult> ProcessOrderAsync(OrderRequest request)
    {
        var stopwatch = Stopwatch.StartNew();
        
        try
        {
            var result = await ProcessOrderInternalAsync(request);
            _orderCounter.Add(1, new TagList { ["status", "success"] });
            return result;
        }
        catch (Exception ex)
        {
            _orderCounter.Add(1, new TagList { ["status", "failed"] });
            throw;
        }
        finally
        {
            _orderProcessingTime.Record(stopwatch.ElapsedMilliseconds);
        }
    }
}</code></pre>
        </div>

        <h4>Health Checks and System Monitoring</h4>
        
        <p>Health checks provide a standardized way to monitor the operational status of your application and its dependencies. They serve multiple purposes: they can be used by load balancers to determine if an instance should receive traffic, by monitoring systems to trigger alerts, and by orchestration platforms like Kubernetes to restart unhealthy containers.</p>
        
        <p>Effective health checks should test critical dependencies and business functions rather than just checking if the application is running. A comprehensive health check system typically includes checks for database connectivity, external service availability, disk space, memory usage, and any other critical dependencies your application requires to function properly.</p>

        <div class="interview-tip">
          <p><span class="interview-icon">🎯</span> <strong>Interview Focus:</strong> Demonstrate comprehensive understanding of observability and production monitoring strategies.</p>
          <p>Key questions include: "How do you implement structured logging that scales across microservices?" and "What monitoring and alerting strategies do you use to ensure application reliability in production?"</p>
        </div>
      `,
          codeExample: `// Complete observability setup
public static class ObservabilityExtensions
{
    public static IServiceCollection AddObservability(
        this IServiceCollection services, IConfiguration configuration)
    {
        // Structured logging with multiple providers
        services.AddLogging(builder =>
        {
            builder.AddConsole();
            builder.AddApplicationInsights();
        });
        
        // Custom metrics collection
        services.AddMetrics();
        services.AddSingleton<IMetricsCollector, MetricsCollector>();
        
        // Comprehensive health checks
        services.AddHealthChecks()
            .AddDbContext<ApplicationDbContext>()
            .AddRedis(configuration.GetConnectionString("Redis"))
            .AddCheck<ApiHealthCheck>("external-api");
        
        return services;
    }
}`,
        },
      ],
      exercise: {
        instructions:
          'Build a comprehensive observability system for a .NET Core application. Implement structured logging with correlation IDs, custom metrics collection, health checks for all dependencies, and distributed tracing. Create dashboards and alerts for key performance indicators.',
      },
    },
    {
      title: 'Error Handling Strategies',
      description:
        'Implement robust error handling patterns including global exception handling, retry policies, circuit breakers, and graceful degradation strategies for resilient applications.',
      sections: [
        {
          title: 'Global Exception Handling and Resilience Patterns',
          explanation: `
        <p>Robust error handling is the foundation of reliable production applications. In distributed systems, failures are inevitable – network connections drop, external services become unavailable, databases experience temporary issues, and unexpected edge cases arise. The key to building resilient applications is not to prevent all failures, but to handle them gracefully and recover automatically when possible.</p>
        
        <h4>Understanding Global Exception Handling</h4>
        
        <p>Global exception handling provides a centralized location for processing unhandled exceptions throughout your application. This approach ensures consistent error responses, prevents sensitive information from leaking to clients, and provides comprehensive logging for debugging purposes. Without global exception handling, unhandled exceptions can crash your application or return confusing error messages to users.</p>
        
        <p>A well-designed global exception handler should:</p>
        <ul>
          <li><strong>Log Comprehensive Details:</strong> Capture the full exception details, request context, user information, and any relevant state for debugging</li>
          <li><strong>Return Appropriate Responses:</strong> Map different exception types to appropriate HTTP status codes and user-friendly error messages</li>
          <li><strong>Protect Sensitive Information:</strong> Never expose stack traces, connection strings, or other sensitive details to external clients</li>
          <li><strong>Enable Correlation:</strong> Include trace identifiers that allow developers to correlate client-reported errors with server logs</li>
        </ul>

        <div class="code-example">
          <pre><code>// Global exception handling middleware
public class GlobalExceptionMiddleware
{
    private readonly RequestDelegate _next;
    private readonly ILogger<GlobalExceptionMiddleware> _logger;
    
    public async Task InvokeAsync(HttpContext context)
    {
        try
        {
            await _next(context);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Unhandled exception. TraceId: {TraceId}", 
                context.TraceIdentifier);
            await HandleExceptionAsync(context, ex);
        }
    }
    
    private static async Task HandleExceptionAsync(HttpContext context, Exception exception)
    {
        var response = exception switch
        {
            ValidationException => new { Status = 400, Message = "Validation failed" },
            NotFoundException => new { Status = 404, Message = "Resource not found" },
            _ => new { Status = 500, Message = "An error occurred", TraceId = context.TraceIdentifier }
        };
        
        context.Response.StatusCode = response.Status;
        await context.Response.WriteAsJsonAsync(response);
    }
}</code></pre>
        </div>

        <h4>Implementing Intelligent Retry Policies</h4>
        
        <p>Retry policies are essential for handling transient failures – temporary issues that often resolve themselves if you wait and try again. However, naive retry implementations can make problems worse by overwhelming already-struggling services. Intelligent retry policies use strategies like exponential backoff, jitter, and conditional retry logic to maximize the chances of success while minimizing the load on failing systems.</p>
        
        <p>The Polly library provides a comprehensive set of resilience patterns for .NET applications. When implementing retry policies, consider:</p>
        <ul>
          <li><strong>Transient vs. Permanent Failures:</strong> Only retry operations that might succeed on subsequent attempts. Don't retry 404 errors or authentication failures.</li>
          <li><strong>Exponential Backoff:</strong> Increase the delay between retries to give failing services time to recover while reducing the load from retry attempts.</li>
          <li><strong>Maximum Retry Limits:</strong> Set reasonable limits to prevent infinite retry loops that can degrade system performance.</li>
          <li><strong>Contextual Information:</strong> Log retry attempts with context information to help diagnose recurring issues.</li>
        </ul>

        <div class="code-example">
          <pre><code>// Intelligent retry policy
public static class RetryPolicies
{
    public static IAsyncPolicy<HttpResponseMessage> HttpRetryPolicy =>
        Policy.HandleResult<HttpResponseMessage>(r => !r.IsSuccessStatusCode)
            .Or<HttpRequestException>()
            .WaitAndRetryAsync(
                retryCount: 3,
                sleepDurationProvider: retryAttempt => 
                    TimeSpan.FromSeconds(Math.Pow(2, retryAttempt)),
                onRetry: (outcome, timespan, retryCount, context) =>
                {
                    var logger = context["logger"] as ILogger;
                    logger?.LogWarning("Retry {RetryCount} after {Delay}ms", 
                        retryCount, timespan.TotalMilliseconds);
                });
}</code></pre>
        </div>

        <h4>Circuit Breaker Pattern for System Protection</h4>
        
        <p>The circuit breaker pattern protects your application from cascading failures by temporarily stopping calls to services that are experiencing problems. Like an electrical circuit breaker, it monitors the failure rate of operations and "trips" when failures exceed a threshold, preventing additional calls until the service has time to recover.</p>
        
        <p>A circuit breaker operates in three states:</p>
        <ul>
          <li><strong>Closed:</strong> Normal operation, requests pass through to the service</li>
          <li><strong>Open:</strong> The circuit is tripped, requests fail immediately without calling the service</li>
          <li><strong>Half-Open:</strong> A limited number of test requests are allowed to determine if the service has recovered</li>
        </ul>
        
        <p>This pattern is particularly important in microservices architectures where the failure of one service can cascade through multiple dependent services, potentially bringing down entire system components.</p>

        <div class="code-example">
          <pre><code>// Circuit breaker implementation
public class PaymentService
{
    private readonly IAsyncPolicy _circuitBreakerPolicy;
    
    public PaymentService()
    {
        _circuitBreakerPolicy = Policy
            .Handle<HttpRequestException>()
            .CircuitBreakerAsync(
                handledEventsAllowedBeforeBreaking: 3,
                durationOfBreak: TimeSpan.FromMinutes(1),
                onBreak: (exception, duration) =>
                {
                    // Log circuit breaker opening
                },
                onReset: () =>
                {
                    // Log circuit breaker reset
                });
    }
    
    public async Task<PaymentResult> ProcessPaymentAsync(PaymentRequest request)
    {
        try
        {
            return await _circuitBreakerPolicy.ExecuteAsync(async () =>
            {
                return await CallPaymentProviderAsync(request);
            });
        }
        catch (CircuitBreakerOpenException)
        {
            return new PaymentResult { Status = "Deferred" };
        }
    }
}</code></pre>
        </div>

        <h4>Graceful Degradation Strategies</h4>
        
        <p>Graceful degradation is the practice of maintaining partial functionality when non-critical systems fail, rather than failing completely. This approach prioritizes user experience by ensuring that core functionality remains available even when secondary features are unavailable.</p>
        
        <p>Effective graceful degradation requires identifying which features are essential to your application's core value proposition and which can be temporarily disabled or replaced with simpler alternatives. For example, if a recommendation service fails, you might fall back to showing popular items or recently viewed products rather than showing an error page.</p>

        <div class="interview-tip">
          <p><span class="interview-icon">🎯</span> <strong>Interview Focus:</strong> Demonstrate deep understanding of resilience patterns and their practical application.</p>
          <p>Key questions include: "How do you design error handling strategies for distributed systems?" and "Explain how you would implement graceful degradation for a critical business process."</p>
        </div>
      `,
          codeExample: `// Comprehensive resilience strategy
public static class ResilienceExtensions
{
    public static IServiceCollection AddResiliencePatterns(this IServiceCollection services)
    {
        // Register comprehensive Polly policies
        services.AddSingleton<IAsyncPolicy<HttpResponseMessage>>(RetryPolicies.HttpRetryPolicy);
        
        // Circuit breaker for external services
        services.AddSingleton<IAsyncPolicy>(provider =>
            Policy.Handle<HttpRequestException>()
                .CircuitBreakerAsync(
                    handledEventsAllowedBeforeBreaking: 5,
                    durationOfBreak: TimeSpan.FromSeconds(30)));
        
        return services;
    }
    
    public static IApplicationBuilder UseResilienceMiddleware(this IApplicationBuilder app)
    {
        app.UseMiddleware<GlobalExceptionMiddleware>();
        app.UseMiddleware<TimeoutMiddleware>();
        
        return app;
    }
}`,
        },
      ],
      exercise: {
        instructions:
          'Design and implement a comprehensive error handling strategy for a microservices application. Include global exception handling, retry policies, circuit breakers, bulkhead isolation, and graceful degradation. Test failure scenarios and recovery patterns.',
      },
    },
    {
      title: 'Background Services and Workers',
      description:
        'Create robust background processing solutions using hosted services, message queues, and worker services for long-running tasks and scheduled operations.',
      sections: [
        {
          title: 'Hosted Services and Background Task Processing',
          explanation: `
        <p>Background services are fundamental components of enterprise applications that handle operations outside the typical request-response cycle. These services enable your application to perform scheduled maintenance, process queued work items, monitor system health, and handle long-running operations without blocking user interactions or web requests.</p>
        
        <h4>Understanding IHostedService Architecture</h4>
        
        <p>The IHostedService interface provides the foundation for background processing in .NET Core applications. These services are managed by the hosting environment and follow the application's lifecycle – they start when the application starts and stop when the application shuts down. This tight integration ensures that background services are properly initialized with the application's configuration and dependency injection container.</p>
        
        <p>Hosted services are ideal for scenarios such as:</p>
        <ul>
          <li><strong>Scheduled Maintenance Tasks:</strong> Database cleanup, log archival, cache warming, and system health checks</li>
          <li><strong>Periodic Data Processing:</strong> Report generation, data synchronization, and batch processing operations</li>
          <li><strong>System Monitoring:</strong> Performance metric collection, resource usage tracking, and alert generation</li>
          <li><strong>Background Cleanup:</strong> Temporary file removal, expired session cleanup, and resource management</li>
        </ul>
        
        <p>The key advantage of hosted services is their integration with the .NET Core hosting model, which provides automatic lifecycle management, dependency injection support, configuration access, and graceful shutdown handling. This integration eliminates the need for manual thread management and ensures that background services participate in the application's health and monitoring systems.</p>

        <div class="code-example">
          <pre><code>// IHostedService implementation
public class EmailCleanupService : IHostedService, IDisposable
{
    private readonly ILogger<EmailCleanupService> _logger;
    private readonly IServiceProvider _serviceProvider;
    private Timer _timer;
    
    public Task StartAsync(CancellationToken cancellationToken)
    {
        _logger.LogInformation("Email cleanup service starting");
        _timer = new Timer(ExecuteTask, null, TimeSpan.Zero, TimeSpan.FromHours(1));
        return Task.CompletedTask;
    }
    
    private async void ExecuteTask(object state)
    {
        using var scope = _serviceProvider.CreateScope();
        var emailService = scope.ServiceProvider.GetRequiredService<IEmailService>();
        
        try
        {
            await emailService.CleanupOldEmailsAsync();
            _logger.LogInformation("Email cleanup completed successfully");
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error during email cleanup");
        }
    }
    
    public Task StopAsync(CancellationToken cancellationToken)
    {
        _timer?.Change(Timeout.Infinite, 0);
        return Task.CompletedTask;
    }
    
    public void Dispose() => _timer?.Dispose();
}</code></pre>
        </div>

        <h4>BackgroundService for Continuous Processing</h4>
        
        <p>The BackgroundService base class simplifies the implementation of long-running background operations by providing a convenient abstraction over IHostedService. It handles the common patterns of background processing, including cancellation token management, exception handling, and lifecycle coordination.</p>
        
        <p>BackgroundService is particularly well-suited for continuous processing scenarios where your service needs to:</p>
        <ul>
          <li><strong>Process Work Queues:</strong> Continuously monitor and process items from message queues or work item collections</li>
          <li><strong>Stream Processing:</strong> Handle real-time data streams, event processing, or continuous data transformation</li>
          <li><strong>Monitoring Operations:</strong> Continuously monitor external systems, APIs, or resources for changes or issues</li>
          <li><strong>Data Synchronization:</strong> Maintain data consistency between systems through continuous or scheduled synchronization</li>
        </ul>
        
        <p>The ExecuteAsync method is the heart of a BackgroundService, where you implement your primary processing logic. This method should be designed to run continuously until the application shuts down, handling cancellation requests gracefully and implementing appropriate error recovery strategies.</p>

        <div class="code-example">
          <pre><code>// BackgroundService for queue processing
public class OrderProcessingService : BackgroundService
{
    private readonly ILogger<OrderProcessingService> _logger;
    private readonly IServiceProvider _serviceProvider;
    private readonly IMessageQueue _messageQueue;
    
    protected override async Task ExecuteAsync(CancellationToken stoppingToken)
    {
        _logger.LogInformation("Order processing service started");
        
        while (!stoppingToken.IsCancellationRequested)
        {
            try
            {
                var message = await _messageQueue.ReceiveAsync(stoppingToken);
                if (message != null)
                {
                    await ProcessOrderMessage(message);
                }
                else
                {
                    await Task.Delay(1000, stoppingToken);
                }
            }
            catch (OperationCanceledException)
            {
                break;
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error processing order message");
                await Task.Delay(5000, stoppingToken);
            }
        }
    }
    
    private async Task ProcessOrderMessage(OrderMessage message)
    {
        using var scope = _serviceProvider.CreateScope();
        var orderService = scope.ServiceProvider.GetRequiredService<IOrderService>();
        
        await orderService.ProcessOrderAsync(message.OrderId);
        await _messageQueue.AcknowledgeAsync(message);
    }
}</code></pre>
        </div>

        <h4>Worker Services for Dedicated Processing</h4>
        
        <p>Worker services represent a specialized hosting model designed specifically for background processing applications that don't serve web requests. Unlike web applications that primarily respond to HTTP requests, worker services are purpose-built for scenarios where the primary function is background processing, data transformation, or system integration.</p>
        
        <p>Worker services excel in microservices architectures where you want to separate concerns and create dedicated services for specific background processing responsibilities. This separation provides several architectural benefits:</p>
        <ul>
          <li><strong>Resource Isolation:</strong> Background processing doesn't compete with web request handling for system resources</li>
          <li><strong>Independent Scaling:</strong> You can scale background processing independently based on workload demands</li>
          <li><strong>Fault Isolation:</strong> Issues in background processing don't affect the availability of web services</li>
          <li><strong>Deployment Flexibility:</strong> Worker services can be deployed to different infrastructure optimized for their specific workloads</li>
        </ul>
        
        <p>Common use cases for worker services include data processing pipelines, ETL operations, message queue consumers, scheduled batch jobs, and integration services that synchronize data between systems.</p>

        <div class="code-example">
          <pre><code>// Dedicated worker service
public class DataSyncWorker : BackgroundService
{
    private readonly ILogger<DataSyncWorker> _logger;
    private readonly IConfiguration _configuration;
    private readonly IDataSyncService _dataSyncService;
    
    protected override async Task ExecuteAsync(CancellationToken stoppingToken)
    {
        var interval = TimeSpan.FromMinutes(_configuration.GetValue<int>("SyncIntervalMinutes", 15));
        
        while (!stoppingToken.IsCancellationRequested)
        {
            var stopwatch = Stopwatch.StartNew();
            
            try
            {
                _logger.LogInformation("Starting data synchronization");
                await _dataSyncService.SynchronizeAsync(stoppingToken);
                _logger.LogInformation("Sync completed in {ElapsedMs}ms", stopwatch.ElapsedMilliseconds);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Data synchronization failed");
            }
            
            try
            {
                await Task.Delay(interval, stoppingToken);
            }
            catch (OperationCanceledException)
            {
                break;
            }
        }
    }
}

// Worker service host configuration
var builder = Host.CreateDefaultBuilder(args)
    .ConfigureServices((context, services) =>
    {
        services.AddHostedService<DataSyncWorker>();
        services.AddSingleton<IDataSyncService, DataSyncService>();
    });

await builder.Build().RunAsync();</code></pre>
        </div>

        <h4>Message Queue Integration for Reliable Processing</h4>
        
        <p>Message queue integration transforms background services from simple scheduled tasks into sophisticated, reliable processing systems capable of handling enterprise-scale workloads. Message queues provide durability, scalability, and fault tolerance that are essential for production background processing systems.</p>
        
        <p>The key benefits of message queue integration include:</p>
        <ul>
          <li><strong>Reliability and Durability:</strong> Messages are persisted and can survive application restarts, ensuring no work is lost during deployments or failures</li>
          <li><strong>Load Distribution:</strong> Multiple worker instances can process messages from the same queue, enabling horizontal scaling based on workload demands</li>
          <li><strong>Decoupling:</strong> Message producers and consumers operate independently, allowing for flexible system architecture and deployment strategies</li>
          <li><strong>Flow Control:</strong> Queues provide natural backpressure mechanisms, preventing fast producers from overwhelming slower consumers</li>
          <li><strong>Priority and Routing:</strong> Advanced queuing systems support message prioritization, routing, and filtering for sophisticated processing workflows</li>
        </ul>
        
        <p>When integrating with message queues, consider important patterns such as message acknowledgment strategies, dead letter queues for failed messages, retry policies for transient failures, and monitoring queue depth and processing rates for operational insights.</p>

        <div class="code-example">
          <pre><code>// Message queue integration
public class RabbitMQBackgroundService : BackgroundService
{
    private readonly ILogger<RabbitMQBackgroundService> _logger;
    private readonly IConnection _connection;
    private readonly IModel _channel;
    private readonly IServiceProvider _serviceProvider;
    
    public RabbitMQBackgroundService(ILogger<RabbitMQBackgroundService> logger, IServiceProvider serviceProvider)
    {
        _logger = logger;
        _serviceProvider = serviceProvider;
        
        var factory = new ConnectionFactory { HostName = "localhost" };
        _connection = factory.CreateConnection();
        _channel = _connection.CreateModel();
        
        _channel.QueueDeclare(queue: "order_processing", durable: true, exclusive: false, autoDelete: false);
        _channel.BasicQos(prefetchSize: 0, prefetchCount: 1, global: false);
    }
    
    protected override async Task ExecuteAsync(CancellationToken stoppingToken)
    {
        var consumer = new EventingBasicConsumer(_channel);
        
        consumer.Received += async (model, ea) =>
        {
            var body = ea.Body.ToArray();
            var message = Encoding.UTF8.GetString(body);
            
            try
            {
                await ProcessMessage(message);
                _channel.BasicAck(deliveryTag: ea.DeliveryTag, multiple: false);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Failed to process message: {Message}", message);
                _channel.BasicNack(deliveryTag: ea.DeliveryTag, multiple: false, requeue: true);
            }
        };
        
        _channel.BasicConsume(queue: "order_processing", autoAck: false, consumer: consumer);
        
        while (!stoppingToken.IsCancellationRequested)
        {
            await Task.Delay(1000, stoppingToken);
        }
    }
}</code></pre>
        </div>

        <div class="interview-tip">
          <p><span class="interview-icon">🎯</span> <strong>Interview Focus:</strong> Demonstrate comprehensive understanding of background processing architectures and scalability patterns.</p>
          <p>Key questions include: "How do you design reliable background processing systems that can handle failures gracefully?" and "Explain the trade-offs between hosted services and dedicated worker services in a microservices architecture."</p>
        </div>
      `,
          codeExample: `// Comprehensive background service framework
public abstract class QueueProcessorService<T> : BackgroundService
{
    protected readonly ILogger Logger;
    protected readonly IServiceProvider ServiceProvider;
    private readonly SemaphoreSlim _semaphore;
    private readonly int _maxConcurrency;
    
    protected QueueProcessorService(
        ILogger logger, 
        IServiceProvider serviceProvider,
        int maxConcurrency = 5)
    {
        Logger = logger;
        ServiceProvider = serviceProvider;
        _maxConcurrency = maxConcurrency;
        _semaphore = new SemaphoreSlim(maxConcurrency, maxConcurrency);
    }
    
    protected override async Task ExecuteAsync(CancellationToken stoppingToken)
    {
        Logger.LogInformation("Starting {ServiceName} with max concurrency {MaxConcurrency}", 
            GetType().Name, _maxConcurrency);
        
        var tasks = new List<Task>();
        
        while (!stoppingToken.IsCancellationRequested)
        {
            try
            {
                await _semaphore.WaitAsync(stoppingToken);
                
                var message = await ReceiveMessageAsync(stoppingToken);
                if (message != null)
                {
                    var task = ProcessMessageWithSemaphore(message, stoppingToken);
                    tasks.Add(task);
                    
                    // Clean up completed tasks
                    tasks.RemoveAll(t => t.IsCompleted);
                }
                else
                {
                    _semaphore.Release();
                    await Task.Delay(1000, stoppingToken);
                }
            }
            catch (OperationCanceledException)
            {
                break;
            }
            catch (Exception ex)
            {
                Logger.LogError(ex, "Error in main processing loop");
                _semaphore.Release();
            }
        }
        
        // Wait for all tasks to complete
        await Task.WhenAll(tasks);
    }
    
    private async Task ProcessMessageWithSemaphore(T message, CancellationToken cancellationToken)
    {
        try
        {
            using var scope = ServiceProvider.CreateScope();
            await ProcessMessageAsync(message, scope.ServiceProvider, cancellationToken);
        }
        finally
        {
            _semaphore.Release();
        }
    }
    
    protected abstract Task<T> ReceiveMessageAsync(CancellationToken cancellationToken);
    protected abstract Task ProcessMessageAsync(T message, IServiceProvider serviceProvider, CancellationToken cancellationToken);
}`,
        },
      ],
      exercise: {
        instructions:
          'Build a comprehensive background processing system with multiple worker types: scheduled tasks, queue processors, and event-driven workers. Implement proper error handling, retry logic, graceful shutdown, and monitoring. Create both hosted services and standalone worker applications.',
      },
    },
    {
      title: 'Caching Strategies',
      description:
        'Implement effective caching strategies using in-memory, distributed, and response caching to optimize application performance and reduce database load.',
      sections: [
        {
          title: 'Multi-Level Caching Implementation',
          explanation: `
        <p>Caching represents one of the most effective performance optimization techniques in application development, capable of dramatically reducing response times, database load, and infrastructure costs. A well-designed caching strategy can transform an application's performance characteristics, enabling it to handle significantly higher traffic loads while providing a better user experience through faster response times.</p>
        
        <h4>Understanding In-Memory Caching Fundamentals</h4>
        
        <p>In-memory caching stores frequently accessed data directly in the application's memory space, providing the fastest possible access times since data retrieval requires no network calls or disk I/O operations. This caching level is ideal for data that is expensive to compute or retrieve but doesn't change frequently, such as configuration settings, lookup tables, computed results, or frequently accessed business objects.</p>
        
        <p>The key characteristics and considerations of in-memory caching include:</p>
        <ul>
          <li><strong>Performance Benefits:</strong> Sub-millisecond access times make in-memory caching ideal for hot data paths and frequently accessed operations</li>
          <li><strong>Memory Management:</strong> Cached data competes with application memory, requiring careful management of cache size and eviction policies</li>
          <li><strong>Instance Isolation:</strong> Each application instance maintains its own cache, which can lead to cache inconsistency in multi-instance deployments</li>
          <li><strong>Lifecycle Integration:</strong> Cache entries can be configured with various expiration policies, including absolute expiration, sliding expiration, and priority-based eviction</li>
        </ul>
        
        <p>Effective in-memory caching requires careful consideration of cache key design, expiration strategies, and memory usage patterns. Cache keys should be unique and descriptive, expiration times should balance data freshness with performance benefits, and cache size should be monitored to prevent memory pressure on the application.</p>

        <div class="code-example">
          <pre><code>// In-memory caching implementation
public class ProductService
{
    private readonly IMemoryCache _memoryCache;
    private readonly IProductRepository _repository;
    private readonly ILogger<ProductService> _logger;
    
    public async Task<Product> GetProductAsync(int id)
    {
        var cacheKey = $"product_{id}";
        
        if (_memoryCache.TryGetValue(cacheKey, out Product cachedProduct))
        {
            _logger.LogDebug("Product {ProductId} retrieved from memory cache", id);
            return cachedProduct;
        }
        
        var product = await _repository.GetByIdAsync(id);
        if (product != null)
        {
            var cacheOptions = new MemoryCacheEntryOptions
            {
                AbsoluteExpirationRelativeToNow = TimeSpan.FromMinutes(15),
                SlidingExpiration = TimeSpan.FromMinutes(5),
                Priority = CacheItemPriority.Normal
            };
            
            _memoryCache.Set(cacheKey, product, cacheOptions);
        }
        
        return product;
    }
}</code></pre>
        </div>

        <h4>Distributed Caching for Scalable Applications</h4>
        
        <p>Distributed caching extends caching capabilities beyond single application instances by storing cached data in shared external storage systems like Redis, SQL Server, or cloud-based caching services. This approach enables cache sharing across multiple application instances, providing consistency and scalability benefits that are essential for production applications running in load-balanced or containerized environments.</p>
        
        <p>The advantages of distributed caching include:</p>
        <ul>
          <li><strong>Instance Consistency:</strong> All application instances share the same cached data, eliminating cache inconsistency issues</li>
          <li><strong>Persistence and Durability:</strong> Cached data can survive application restarts and deployments, maintaining performance benefits across service updates</li>
          <li><strong>Horizontal Scalability:</strong> Cache capacity can be scaled independently of application instances, supporting growth without architectural changes</li>
          <li><strong>Advanced Features:</strong> Distributed cache systems often provide features like data partitioning, replication, and sophisticated eviction policies</li>
        </ul>
        
        <p>However, distributed caching introduces network latency and additional infrastructure complexity. The key to successful distributed caching is choosing appropriate data for this caching tier – typically data that is expensive to generate, accessed frequently across multiple instances, and can tolerate the additional latency compared to in-memory caching.</p>

        <div class="code-example">
          <pre><code>// Distributed caching service
public class CacheService
{
    private readonly IDistributedCache _distributedCache;
    private readonly ILogger<CacheService> _logger;
    
    public async Task<T> GetAsync<T>(string key) where T : class
    {
        try
        {
            var cachedValue = await _distributedCache.GetStringAsync(key);
            if (cachedValue != null)
            {
                return JsonSerializer.Deserialize<T>(cachedValue);
            }
        }
        catch (Exception ex)
        {
            _logger.LogWarning(ex, "Failed to retrieve from cache: {Key}", key);
        }
        
        return null;
    }
    
    public async Task SetAsync<T>(string key, T value, TimeSpan? expiration = null)
    {
        var serializedValue = JsonSerializer.Serialize(value);
        var options = new DistributedCacheEntryOptions();
        
        if (expiration.HasValue)
            options.SetAbsoluteExpiration(expiration.Value);
        
        await _distributedCache.SetStringAsync(key, serializedValue, options);
    }
}</code></pre>
        </div>

        <h4>Response Caching for HTTP Optimization</h4>
        
        <p>Response caching represents a specialized form of caching that focuses on HTTP response optimization, enabling applications to cache entire HTTP responses at various levels including the application server, reverse proxies, CDNs, and client browsers. This caching strategy is particularly effective for read-heavy applications serving relatively static content or data that doesn't change frequently.</p>
        
        <p>Response caching strategies include:</p>
        <ul>
          <li><strong>Server-Side Response Caching:</strong> Cache complete HTTP responses in application memory or distributed cache, reducing controller and service execution overhead</li>
          <li><strong>Client-Side Caching:</strong> Use HTTP cache headers to enable browser and HTTP client caching, reducing network requests entirely</li>
          <li><strong>Proxy and CDN Caching:</strong> Leverage reverse proxies and content delivery networks to cache responses closer to users geographically</li>
          <li><strong>Conditional Requests:</strong> Implement ETags and Last-Modified headers to enable efficient cache validation and reduce bandwidth usage</li>
        </ul>

        <h4>Cache Invalidation and Consistency Strategies</h4>
        
        <p>Cache invalidation represents one of the most challenging aspects of caching system design. The fundamental problem is ensuring that cached data remains consistent with the underlying data source while maximizing cache hit rates and minimizing the performance impact of cache misses and invalidation operations.</p>
        
        <p>Effective invalidation strategies include:</p>
        <ul>
          <li><strong>Time-Based Expiration:</strong> Use appropriate TTL values based on data change frequency and staleness tolerance</li>
          <li><strong>Event-Driven Invalidation:</strong> Invalidate cache entries when underlying data changes through domain events or database triggers</li>
          <li><strong>Tag-Based Invalidation:</strong> Group related cache entries with tags for bulk invalidation operations</li>
          <li><strong>Version-Based Caching:</strong> Include version information in cache keys to automatically invalidate stale data</li>
        </ul>

        <div class="interview-tip">
          <p><span class="interview-icon">🎯</span> <strong>Interview Focus:</strong> Demonstrate comprehensive understanding of caching architectures and performance optimization strategies.</p>
          <p>Key questions include: "How do you design a multi-level caching strategy for a high-traffic e-commerce application?" and "Explain your approach to cache invalidation in a distributed system where data consistency is critical."</p>
        </div>
      `,
          codeExample: `// Multi-level caching strategy
public class MultiLevelCacheService
{
    private readonly IMemoryCache _memoryCache;
    private readonly IDistributedCache _distributedCache;
    
    public async Task<T> GetAsync<T>(string key) where T : class
    {
        // Level 1: Memory cache (fastest)
        if (_memoryCache.TryGetValue(key, out T memoryValue))
            return memoryValue;
        
        // Level 2: Distributed cache
        var distributedValue = await GetFromDistributedCacheAsync<T>(key);
        if (distributedValue != null)
        {
            _memoryCache.Set(key, distributedValue, TimeSpan.FromMinutes(5));
            return distributedValue;
        }
        
        return null;
    }
    
    public async Task SetAsync<T>(string key, T value, TimeSpan? expiration = null)
    {
        var exp = expiration ?? TimeSpan.FromHours(1);
        
        // Set in both caches
        _memoryCache.Set(key, value, TimeSpan.FromMinutes(5));
        await SetInDistributedCacheAsync(key, value, exp);
    }
}`,
        },
      ],
      exercise: {
        instructions:
          'Design and implement a comprehensive caching strategy for an e-commerce application. Include in-memory caching for frequently accessed data, distributed caching for session data, and response caching for API endpoints.',
      },
    },
    {
      title: 'Security Best Practices',
      description:
        'Implement comprehensive security measures including authentication, authorization, data protection, and security headers for production-ready applications.',
      sections: [
        {
          title: 'Authentication, Authorization, and Data Protection',
          explanation: `
        <p>Security represents the foundation of trustworthy applications, encompassing far more than simple username and password validation. Modern security architecture requires a comprehensive approach that includes identity verification, access control, data protection, and defense against evolving threat vectors. .NET Core provides a robust security framework that enables developers to implement enterprise-grade security measures while maintaining application performance and user experience.</p>
        
        <h4>JWT Authentication Architecture and Implementation</h4>
        
        <p>JSON Web Tokens (JWT) have become the standard for stateless authentication in modern web applications and APIs, particularly in distributed systems and microservices architectures. JWTs provide a self-contained authentication mechanism that eliminates the need for server-side session storage while enabling secure information transmission between parties.</p>
        
        <p>The key advantages of JWT authentication include:</p>
        <ul>
          <li><strong>Stateless Design:</strong> Tokens contain all necessary authentication information, eliminating server-side session management and enabling horizontal scaling</li>
          <li><strong>Cross-Platform Compatibility:</strong> JWTs are supported across different platforms and programming languages, facilitating integration in heterogeneous environments</li>
          <li><strong>Secure Information Exchange:</strong> Tokens can carry claims and user information securely, reducing database lookups for user data</li>
          <li><strong>Distributed System Support:</strong> Tokens can be validated independently by different services without centralized authentication server calls</li>
        </ul>
        
        <p>Proper JWT implementation requires careful attention to token security, including secure signing algorithms, appropriate expiration times, token refresh strategies, and protection against common attacks such as token replay and JWT confusion attacks. Additionally, sensitive information should never be stored in JWT payloads since they are only base64-encoded, not encrypted.</p>

        <div class="code-example">
          <pre><code>// JWT authentication setup
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
                Encoding.UTF8.GetBytes(builder.Configuration["Jwt:SecretKey"]))
        };
    });

// Token generation service
public class TokenService
{
    private readonly IConfiguration _configuration;
    
    public string GenerateToken(User user, IList<string> roles)
    {
        var claims = new List<Claim>
        {
            new Claim(ClaimTypes.NameIdentifier, user.Id.ToString()),
            new Claim(ClaimTypes.Name, user.UserName),
            new Claim(ClaimTypes.Email, user.Email)
        };
        
        claims.AddRange(roles.Select(role => new Claim(ClaimTypes.Role, role)));
        
        var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration["Jwt:SecretKey"]));
        var credentials = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);
        
        var token = new JwtSecurityToken(
            issuer: _configuration["Jwt:Issuer"],
            audience: _configuration["Jwt:Audience"],
            claims: claims,
            expires: DateTime.UtcNow.AddMinutes(30),
            signingCredentials: credentials);
        
        return new JwtSecurityTokenHandler().WriteToken(token);
    }
}</code></pre>
        </div>

        <h4>Advanced Authorization Strategies and Policy-Based Access Control</h4>
        
        <p>Authorization goes beyond simple role checking to implement sophisticated access control mechanisms that can evaluate multiple factors including user roles, resource ownership, business rules, and contextual information. .NET Core's policy-based authorization system provides a flexible framework for implementing complex authorization scenarios while maintaining clean separation between business logic and access control logic.</p>
        
        <p>Effective authorization strategies should consider:</p>
        <ul>
          <li><strong>Role-Based Access Control (RBAC):</strong> Users are assigned roles that define their access permissions within the system</li>
          <li><strong>Attribute-Based Access Control (ABAC):</strong> Access decisions are based on attributes of users, resources, and environmental factors</li>
          <li><strong>Resource-Based Authorization:</strong> Access control decisions consider the specific resource being accessed and the user's relationship to that resource</li>
          <li><strong>Claims-Based Authorization:</strong> Fine-grained permissions are managed through claims that can be dynamically assigned and evaluated</li>
        </ul>
        
        <p>Custom authorization handlers enable complex business logic evaluation during authorization decisions, allowing for scenarios such as hierarchical permissions, time-based access control, geolocation restrictions, and multi-factor authorization requirements.</p>

        <div class="code-example">
          <pre><code>// Authorization policies setup
builder.Services.AddAuthorization(options =>
{
    options.AddPolicy("AdminOnly", policy => policy.RequireRole("Administrator"));
    options.AddPolicy("ManagerOrAdmin", policy => policy.RequireRole("Manager", "Administrator"));
    options.AddPolicy("CanEditProducts", policy =>
        policy.RequireClaim("permission", "products.edit"));
});

// Custom authorization handler
public class ResourceOwnerRequirement : IAuthorizationRequirement { }

public class ResourceOwnerHandler : AuthorizationHandler<ResourceOwnerRequirement>
{
    protected override Task HandleRequirementAsync(
        AuthorizationHandlerContext context,
        ResourceOwnerRequirement requirement)
    {
        var userId = context.User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
        var resourceUserId = context.Resource as string;
        
        if (userId != null && userId == resourceUserId)
        {
            context.Succeed(requirement);
        }
        
        return Task.CompletedTask;
    }
}</code></pre>
        </div>

        <h4>Data Protection and Encryption Strategies</h4>
        
        <p>Data protection encompasses multiple layers of security controls designed to safeguard sensitive information throughout its lifecycle – at rest, in transit, and during processing. .NET Core's Data Protection APIs provide a comprehensive framework for implementing encryption, key management, and data protection strategies that meet enterprise security requirements and regulatory compliance standards.</p>
        
        <p>Key aspects of comprehensive data protection include:</p>
        <ul>
          <li><strong>Encryption at Rest:</strong> Sensitive data stored in databases, files, or caches should be encrypted using strong encryption algorithms</li>
          <li><strong>Encryption in Transit:</strong> All data transmitted between clients and servers, and between services, should be protected using TLS/SSL</li>
          <li><strong>Key Management:</strong> Encryption keys must be securely generated, stored, rotated, and distributed using appropriate key management systems</li>
          <li><strong>Field-Level Encryption:</strong> Particularly sensitive data fields may require individual encryption even within encrypted databases</li>
        </ul>

        <h4>Security Headers and Defense-in-Depth</h4>
        
        <p>Security headers represent a critical but often overlooked aspect of web application security. These HTTP response headers instruct browsers and other clients how to handle your application's content, providing protection against common attack vectors such as cross-site scripting (XSS), clickjacking, and content type confusion attacks.</p>
        
        <p>Essential security headers include:</p>
        <ul>
          <li><strong>Content Security Policy (CSP):</strong> Controls which resources the browser is allowed to load, preventing XSS and data injection attacks</li>
          <li><strong>X-Frame-Options:</strong> Prevents your application from being embedded in frames, protecting against clickjacking attacks</li>
          <li><strong>X-Content-Type-Options:</strong> Prevents MIME type sniffing, ensuring browsers interpret content as declared</li>
          <li><strong>Strict-Transport-Security (HSTS):</strong> Forces HTTPS connections and prevents protocol downgrade attacks</li>
        </ul>

        <div class="code-example">
          <pre><code>// Data protection configuration
builder.Services.AddDataProtection()
    .PersistKeysToFileSystem(new DirectoryInfo(@"C:keys"))
    .SetApplicationName("MyApp");

// Security headers middleware
public class SecurityHeadersMiddleware
{
    private readonly RequestDelegate _next;
    
    public async Task InvokeAsync(HttpContext context)
    {
        context.Response.Headers.Add("X-Content-Type-Options", "nosniff");
        context.Response.Headers.Add("X-Frame-Options", "DENY");
        context.Response.Headers.Add("X-XSS-Protection", "1; mode=block");
        
        if (context.Request.IsHttps)
        {
            context.Response.Headers.Add("Strict-Transport-Security", 
                "max-age=31536000; includeSubDomains");
        }
        
        await _next(context);
    }
}</code></pre>
        </div>

        <div class="interview-tip">
          <p><span class="interview-icon">🎯</span> <strong>Interview Focus:</strong> Demonstrate comprehensive understanding of enterprise security architecture and implementation strategies.</p>
          <p>Key questions include: "How do you design a security architecture that protects against both external threats and insider risks?" and "Explain your approach to implementing zero-trust security principles in a .NET Core application."</p>
        </div>
      `,
          codeExample: `// Comprehensive security setup
public static class SecurityExtensions
{
    public static IServiceCollection AddApplicationSecurity(
        this IServiceCollection services, IConfiguration configuration)
    {
        // Authentication
        services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
            .AddJwtBearer(options => ConfigureJwtOptions(options, configuration));
        
        // Authorization
        services.AddAuthorization(options => ConfigureAuthorizationPolicies(options));
        
        // Data Protection
        services.AddDataProtection()
            .PersistKeysToFileSystem(new DirectoryInfo(configuration["DataProtection:KeyPath"]));
        
        // Security services
        services.AddScoped<ITokenService, TokenService>();
        services.AddSingleton<IAuthorizationHandler, ResourceOwnerHandler>();
        
        return services;
    }
    
    public static IApplicationBuilder UseApplicationSecurity(this IApplicationBuilder app)
    {
        app.UseMiddleware<SecurityHeadersMiddleware>();
        app.UseHttpsRedirection();
        app.UseAuthentication();
        app.UseAuthorization();
        
        return app;
    }
}`,
        },
      ],
      exercise: {
        instructions:
          'Implement a comprehensive security framework for a financial application. Include JWT authentication, role-based authorization, data encryption, security headers, and input validation.',
      },
    },
    {
      title: 'Testing (Unit, Integration, and Functional)',
      description:
        'Implement comprehensive testing strategies including unit tests, integration tests, and end-to-end testing with proper mocking, test data management, and CI/CD integration.',
      sections: [
        {
          title: 'Comprehensive Testing Strategies',
          explanation: `
        <p>Testing represents the cornerstone of software quality assurance and the foundation of continuous delivery practices. A comprehensive testing strategy goes beyond basic code verification to encompass quality gates, regression prevention, documentation through examples, and confidence building for both developers and stakeholders. .NET Core provides a rich ecosystem of testing frameworks and tools that enable teams to implement sophisticated testing strategies that scale with application complexity and team size.</p>
        
        <h4>Unit Testing Fundamentals and Best Practices</h4>
        
        <p>Unit testing focuses on verifying individual components in complete isolation from their dependencies, ensuring that each piece of business logic functions correctly according to its specifications. This isolation is achieved through dependency injection and mocking, allowing tests to run quickly and provide immediate feedback during development.</p>
        
        <p>Effective unit testing strategies encompass several key principles:</p>
        <ul>
          <li><strong>Single Responsibility Verification:</strong> Each test should verify one specific behavior or outcome, making failures easy to diagnose and fix</li>
          <li><strong>Independence and Repeatability:</strong> Tests should produce consistent results regardless of execution order or external state</li>
          <li><strong>Comprehensive Coverage:</strong> Test both happy path scenarios and edge cases, including error conditions and boundary values</li>
          <li><strong>Fast Execution:</strong> Unit tests should execute in milliseconds, enabling rapid feedback during development</li>
          <li><strong>Clear Intent:</strong> Test names and structure should clearly communicate the behavior being verified</li>
        </ul>
        
        <p>The Arrange-Act-Assert (AAA) pattern provides a clear structure for unit tests, separating test setup, execution, and verification phases. This pattern improves test readability and maintainability while making it easier to identify test failures and their causes.</p>

        <div class="code-example">
          <pre><code>// Unit testing with isolation
public class UserServiceTests
{
    private readonly Mock<IUserRepository> _mockRepository;
    private readonly Mock<ILogger<UserService>> _mockLogger;
    private readonly UserService _userService;
    
    public UserServiceTests()
    {
        _mockRepository = new Mock<IUserRepository>();
        _mockLogger = new Mock<ILogger<UserService>>();
        _userService = new UserService(_mockRepository.Object, _mockLogger.Object);
    }
    
    [Fact]
    public async Task GetUserAsync_WithValidId_ReturnsUser()
    {
        // Arrange
        var userId = 1;
        var expectedUser = new User { Id = userId, Name = "John Doe" };
        _mockRepository.Setup(r => r.GetByIdAsync(userId))
                      .ReturnsAsync(expectedUser);
        
        // Act
        var result = await _userService.GetUserAsync(userId);
        
        // Assert
        Assert.NotNull(result);
        Assert.Equal(expectedUser.Id, result.Id);
        Assert.Equal(expectedUser.Name, result.Name);
    }
    
    [Theory]
    [InlineData(0)]
    [InlineData(-1)]
    public async Task GetUserAsync_WithInvalidId_ThrowsArgumentException(int invalidId)
    {
        // Act & Assert
        await Assert.ThrowsAsync<ArgumentException>(() => _userService.GetUserAsync(invalidId));
    }
}</code></pre>
        </div>

        <h4>Integration Testing for Component Interaction Verification</h4>
        
        <p>Integration testing validates that multiple components work together correctly, bridging the gap between unit tests and end-to-end tests. These tests verify that different layers of your application integrate properly, including controllers, services, repositories, and external dependencies like databases and APIs.</p>
        
        <p>Integration testing in .NET Core applications typically involves:</p>
        <ul>
          <li><strong>API Endpoint Testing:</strong> Verifying that HTTP endpoints respond correctly to various inputs and return expected status codes and content</li>
          <li><strong>Database Integration:</strong> Testing that data access operations work correctly with real database engines, including transaction handling and constraint validation</li>
          <li><strong>Service Integration:</strong> Validating that business services interact correctly with their dependencies and handle failures appropriately</li>
          <li><strong>Configuration Testing:</strong> Ensuring that application configuration and dependency injection work correctly in test environments</li>
        </ul>
        
        <p>The TestHost and WebApplicationFactory classes provide powerful tools for creating realistic test environments that closely mirror production configurations while maintaining test isolation and performance.</p>

        <div class="code-example">
          <pre><code>// Integration testing with TestHost
public class UsersControllerIntegrationTests : IClassFixture<WebApplicationFactory<Program>>
{
    private readonly WebApplicationFactory<Program> _factory;
    private readonly HttpClient _client;
    
    public UsersControllerIntegrationTests(WebApplicationFactory<Program> factory)
    {
        _factory = factory;
        _client = _factory.WithWebHostBuilder(builder =>
        {
            builder.ConfigureServices(services =>
            {
                services.RemoveAll<DbContextOptions<ApplicationDbContext>>();
                services.AddDbContext<ApplicationDbContext>(options =>
                    options.UseInMemoryDatabase("TestDb"));
            });
        }).CreateClient();
    }
    
    [Fact]
    public async Task GetUsers_ReturnsSuccessAndCorrectContentType()
    {
        // Act
        var response = await _client.GetAsync("/api/users");
        
        // Assert
        response.EnsureSuccessStatusCode();
        Assert.Equal("application/json; charset=utf-8", 
                    response.Content.Headers.ContentType?.ToString());
    }
    
    [Fact]
    public async Task CreateUser_WithValidData_ReturnsCreated()
    {
        // Arrange
        var newUser = new { Name = "Test User", Email = "test@example.com" };
        var content = new StringContent(JsonSerializer.Serialize(newUser), 
                                       Encoding.UTF8, "application/json");
        
        // Act
        var response = await _client.PostAsync("/api/users", content);
        
        // Assert
        Assert.Equal(HttpStatusCode.Created, response.StatusCode);
    }
}</code></pre>
        </div>

        <h4>Test Data Management and Builder Patterns</h4>
        
        <p>Effective test data management is crucial for maintaining reliable, readable, and maintainable tests. Poor test data strategies lead to brittle tests that fail for unclear reasons, difficulty in understanding test scenarios, and significant maintenance overhead as the application evolves.</p>
        
        <p>The Builder pattern provides an elegant solution for test data creation, offering several advantages:</p>
        <ul>
          <li><strong>Readability:</strong> Builder methods with descriptive names make test scenarios clear and self-documenting</li>
          <li><strong>Maintainability:</strong> Changes to domain objects require updates only in builder classes, not throughout test suites</li>
          <li><strong>Flexibility:</strong> Builders can create complex object graphs with sensible defaults while allowing customization of specific properties</li>
          <li><strong>Reusability:</strong> Common test scenarios can be encapsulated in builder methods and reused across test classes</li>
        </ul>

        <div class="code-example">
          <pre><code>// Test data builder pattern
public class UserTestDataBuilder
{
    private User _user = new User();
    
    public UserTestDataBuilder WithId(int id)
    {
        _user.Id = id;
        return this;
    }
    
    public UserTestDataBuilder WithName(string name)
    {
        _user.Name = name;
        return this;
    }
    
    public UserTestDataBuilder WithEmail(string email)
    {
        _user.Email = email;
        return this;
    }
    
    public User Build() => _user;
    
    public static implicit operator User(UserTestDataBuilder builder) => builder.Build();
}

// Clean test data usage
[Fact]
public async Task CreateUser_ValidData_ReturnsSuccess()
{
    // Arrange
    var user = new UserTestDataBuilder()
        .WithName("John Doe")
        .WithEmail("john@example.com")
        .Build();
    
    // Act & Assert
    var result = await _userService.CreateAsync(user);
    Assert.NotNull(result);
}</code></pre>
        </div>

        <h4>Performance and Load Testing Strategies</h4>
        
        <p>Performance testing ensures that applications meet response time, throughput, and resource utilization requirements under various load conditions. This testing category includes load testing for expected traffic, stress testing for peak conditions, and endurance testing for long-running stability.</p>
        
        <p>Key performance testing considerations include:</p>
        <ul>
          <li><strong>Response Time Testing:</strong> Verify that individual operations complete within acceptable time limits</li>
          <li><strong>Throughput Testing:</strong> Measure how many operations the system can handle per unit of time</li>
          <li><strong>Resource Utilization:</strong> Monitor CPU, memory, and database usage under load</li>
          <li><strong>Scalability Testing:</strong> Determine how performance changes as load increases</li>
        </ul>

        <h4>Test Automation and CI/CD Integration</h4>
        
        <p>Test automation integration with continuous integration and continuous deployment pipelines ensures that quality gates are enforced throughout the development lifecycle. Automated test execution provides rapid feedback on code changes while preventing regressions from reaching production environments.</p>
        
        <p>Effective CI/CD test integration includes test categorization for different pipeline stages, parallel test execution for faster feedback, test result reporting and analysis, and failure notification and rollback mechanisms.</p>

        <div class="interview-tip">
          <p><span class="interview-icon">🎯</span> <strong>Interview Focus:</strong> Demonstrate comprehensive understanding of testing strategies that scale with enterprise development.</p>
          <p>Key questions include: "How do you design a testing strategy that balances thoroughness with execution speed in a large codebase?" and "Explain your approach to testing distributed systems where components may be owned by different teams."</p>
        </div>
      `,
          codeExample: `// Comprehensive test setup
public class TestFixture : IDisposable
{
    public ApplicationDbContext Context { get; private set; }
    public IServiceProvider ServiceProvider { get; private set; }
    
    public TestFixture()
    {
        var services = new ServiceCollection();
        
        // Configure test services
        services.AddDbContext<ApplicationDbContext>(options =>
            options.UseInMemoryDatabase(Guid.NewGuid().ToString()));
        
        services.AddScoped<IUserService, UserService>();
        services.AddScoped<IUserRepository, UserRepository>();
        
        ServiceProvider = services.BuildServiceProvider();
        Context = ServiceProvider.GetRequiredService<ApplicationDbContext>();
        
        // Seed test data
        SeedTestData();
    }
    
    private void SeedTestData()
    {
        Context.Users.AddRange(
            new User { Id = 1, Name = "Test User 1", Email = "test1@example.com" },
            new User { Id = 2, Name = "Test User 2", Email = "test2@example.com" }
        );
        Context.SaveChanges();
    }
    
    public void Dispose()
    {
        Context?.Dispose();
        ServiceProvider?.Dispose();
    }
}`,
        },
      ],
      exercise: {
        instructions:
          'Build a comprehensive testing suite for a web API application. Include unit tests with mocking, integration tests with test database, end-to-end tests, performance tests, and automated test data management. Implement CI/CD pipeline integration with test reporting.',
      },
    },
    {
      title: 'Deployment and DevOps',
      description:
        'Master application deployment strategies including containerization, cloud deployment, CI/CD pipelines, and infrastructure as code for scalable production environments.',
      sections: [
        {
          title: 'Containerization and Cloud Deployment',
          explanation: `
        <p>Modern application deployment has evolved from traditional server-based deployments to sophisticated cloud-native architectures that emphasize portability, scalability, and operational efficiency. This transformation requires developers to understand not just how to write code, but how to package, deploy, and operate applications in dynamic, distributed environments.</p>
        
        <h4>Docker Containerization Strategy and Best Practices</h4>
        
        <p>Containerization represents a fundamental shift in how applications are packaged and deployed, providing consistency across development, testing, and production environments. Docker containers encapsulate applications with all their dependencies, creating immutable deployment artifacts that eliminate "works on my machine" problems and enable reliable, reproducible deployments.</p>
        
        <p>The key benefits of containerization include:</p>
        <ul>
          <li><strong>Environment Consistency:</strong> Containers ensure that applications run identically across different environments, eliminating configuration drift and deployment surprises</li>
          <li><strong>Resource Efficiency:</strong> Containers share the host operating system kernel, providing better resource utilization compared to traditional virtual machines</li>
          <li><strong>Deployment Speed:</strong> Container startup times are typically measured in seconds, enabling rapid scaling and deployment scenarios</li>
          <li><strong>Isolation and Security:</strong> Containers provide process and filesystem isolation while maintaining security boundaries between applications</li>
          <li><strong>Orchestration Ready:</strong> Containers integrate seamlessly with orchestration platforms like Kubernetes for automated scaling and management</li>
        </ul>
        
        <p>Effective containerization strategies involve multi-stage builds to minimize image size, security scanning for vulnerability detection, image layering optimization for faster deployments, and proper handling of secrets and configuration data.</p>

        <div class="code-example">
          <pre><code># Optimized multi-stage Dockerfile
FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
WORKDIR /src
COPY ["MyApp.csproj", "."]
RUN dotnet restore "MyApp.csproj"
COPY . .
RUN dotnet build "MyApp.csproj" -c Release -o /app/build

FROM build AS publish
RUN dotnet publish "MyApp.csproj" -c Release -o /app/publish

FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS runtime
WORKDIR /app
EXPOSE 80
EXPOSE 443
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "MyApp.dll"]

# Development environment with Docker Compose
version: '3.8'
services:
  app:
    build: .
    ports:
      - "8080:80"
    environment:
      - ASPNETCORE_ENVIRONMENT=Development
    depends_on:
      - database
  
  database:
    image: mcr.microsoft.com/mssql/server:2022-latest
    environment:
      - ACCEPT_EULA=Y
      - SA_PASSWORD=YourStrong@Passw0rd</code></pre>
        </div>

        <h4>CI/CD Pipeline Architecture and Implementation</h4>
        
        <p>Continuous Integration and Continuous Deployment pipelines represent the automation backbone of modern software delivery, enabling teams to deliver features rapidly while maintaining quality and reliability. Effective CI/CD pipelines go beyond simple build automation to encompass testing strategies, security scanning, deployment orchestration, and rollback capabilities.</p>
        
        <p>A comprehensive CI/CD strategy includes:</p>
        <ul>
          <li><strong>Build Automation:</strong> Automated compilation, dependency resolution, and artifact creation triggered by code changes</li>
          <li><strong>Quality Gates:</strong> Automated testing, code analysis, and security scanning that prevent low-quality code from reaching production</li>
          <li><strong>Environment Progression:</strong> Systematic promotion of code changes through development, testing, staging, and production environments</li>
          <li><strong>Deployment Strategies:</strong> Blue-green deployments, rolling updates, and canary releases that minimize deployment risk</li>
          <li><strong>Monitoring Integration:</strong> Automated monitoring setup and alerting configuration as part of the deployment process</li>
        </ul>
        
        <p>Modern CI/CD platforms provide declarative pipeline definitions that can be version-controlled alongside application code, ensuring that deployment logic evolves with the application and can be reviewed and tested like any other code change.</p>

        <div class="code-example">
          <pre><code># Comprehensive CI/CD pipeline
name: Build and Deploy
on:
  push:
    branches: [main]
  pull_request:
    branches: [main]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
    - uses: actions/checkout@v3
    - name: Setup .NET
      uses: actions/setup-dotnet@v3
      with:
        dotnet-version: '8.0.x'
    
    - name: Restore dependencies
      run: dotnet restore
    
    - name: Build
      run: dotnet build --no-restore
    
    - name: Test
      run: dotnet test --no-build --verbosity normal --collect:"XPlat Code Coverage"
    
    - name: Upload coverage
      uses: codecov/codecov-action@v3
  
  deploy:
    needs: test
    runs-on: ubuntu-latest
    if: github.ref == 'refs/heads/main'
    steps:
    - name: Deploy to Azure
      uses: azure/webapps-deploy@v2
      with:
        app-name: 'my-app'
        publish-profile: \${{ secrets.AZURE_WEBAPP_PUBLISH_PROFILE }}</code></pre>
        </div>

        <h4>Infrastructure as Code and Configuration Management</h4>
        
        <p>Infrastructure as Code (IaC) represents a paradigm shift from manual infrastructure management to declarative, version-controlled infrastructure definitions. This approach brings software engineering practices to infrastructure management, enabling reproducible environments, automated provisioning, and consistent configuration across different deployment stages.</p>
        
        <p>IaC benefits include version control for infrastructure changes, automated environment provisioning, consistency across environments, disaster recovery capabilities, and cost optimization through automated resource management.</p>

        <h4>Production Monitoring and Observability Integration</h4>
        
        <p>Production monitoring goes beyond simple uptime checks to encompass comprehensive observability that provides insights into application performance, user experience, and system health. Effective monitoring strategies integrate metrics collection, log aggregation, distributed tracing, and alerting to provide complete visibility into application behavior.</p>
        
        <p>Health checks serve as the foundation of production monitoring, providing standardized endpoints that load balancers, orchestration platforms, and monitoring systems can use to determine application health. Comprehensive health checks verify not just application startup, but also the availability and performance of critical dependencies.</p>

        <div class="code-example">
          <pre><code>// Production health monitoring setup
builder.Services.AddHealthChecks()
    .AddDbContext<ApplicationDbContext>()
    .AddSqlServer(connectionString, name: "database")
    .AddRedis(redisConnectionString, name: "cache")
    .AddUrlGroup(new Uri("https://api.external-service.com/health"), name: "external-api")
    .AddCheck<DiskSpaceHealthCheck>("disk-space")
    .AddCheck<MemoryHealthCheck>("memory-usage");

app.MapHealthChecks("/health", new HealthCheckOptions
{
    ResponseWriter = UIResponseWriter.WriteHealthCheckUIResponse,
    AllowCachingResponses = false
});

app.MapHealthChecks("/health/ready", new HealthCheckOptions
{
    Predicate = check => check.Tags.Contains("ready")
});

app.MapHealthChecks("/health/live", new HealthCheckOptions
{
    Predicate = _ => false
});</code></pre>
        </div>

        <h4>Deployment Strategies and Risk Management</h4>
        
        <p>Advanced deployment strategies minimize the risk and impact of software releases through techniques like blue-green deployments, canary releases, and feature flags. These approaches enable teams to deploy changes with confidence while maintaining the ability to quickly rollback if issues are detected.</p>
        
        <p>Key deployment patterns include:</p>
        <ul>
          <li><strong>Blue-Green Deployments:</strong> Maintain two identical production environments and switch traffic between them for zero-downtime deployments</li>
          <li><strong>Rolling Updates:</strong> Gradually replace instances of the old version with the new version, maintaining service availability throughout the process</li>
          <li><strong>Canary Releases:</strong> Deploy new versions to a small subset of users to validate changes before full rollout</li>
          <li><strong>Feature Flags:</strong> Decouple feature deployment from feature activation, enabling gradual feature rollouts and quick rollbacks</li>
        </ul>

        <div class="interview-tip">
          <p><span class="interview-icon">🎯</span> <strong>Interview Focus:</strong> Demonstrate comprehensive understanding of modern deployment practices and operational excellence.</p>
          <p>Key questions include: "How do you design a deployment strategy that balances speed of delivery with risk management?" and "Explain your approach to implementing observability and monitoring in a microservices architecture."</p>
        </div>
      `,
          codeExample: `// Production deployment configuration
public class ProductionStartup
{
    public void ConfigureServices(IServiceCollection services)
    {
        // Add production-specific services
        services.AddApplicationInsights();
        services.AddHealthChecks();
        
        // Configure for scale
        services.Configure<IISServerOptions>(options =>
        {
            options.MaxRequestBodySize = 52428800; // 50MB
        });
        
        // Add distributed tracing
        services.AddOpenTelemetry()
            .WithTracing(builder => builder
                .AddAspNetCoreInstrumentation()
                .AddSqlClientInstrumentation());
    }
    
    public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
    {
        if (env.IsProduction())
        {
            app.UseExceptionHandler("/Error");
            app.UseHsts();
        }
        
        app.UseHttpsRedirection();
        app.UseHealthChecks("/health");
        app.UseAuthentication();
        app.UseAuthorization();
    }
}`,
        },
      ],
      exercise: {
        instructions:
          'Create a complete DevOps pipeline for a .NET Core application. Include Dockerfile for containerization, CI/CD pipeline with automated testing, deployment to cloud platform, health checks, monitoring setup, and infrastructure as code. Implement blue-green deployment strategy.',
      },
    },
  ],
  prepperSummary: `
    <h3>.NET Core Application Development - Interview Preparation Summary</h3>
    
    <p>This comprehensive section covered the complete .NET Core application development lifecycle, from initial setup to production deployment. Here's what you've mastered for interview success:</p>
    
    <h4>Core Competencies Demonstrated</h4>
    <ul>
      <li><strong>Application Lifecycle:</strong> Complete understanding of .NET Core startup, configuration, and service management</li>
      <li><strong>Observability:</strong> Comprehensive logging, monitoring, and performance tracking implementation</li>
      <li><strong>Resilience:</strong> Error handling strategies, retry policies, circuit breakers, and graceful degradation</li>
      <li><strong>Background Processing:</strong> Hosted services, worker services, and message queue integration</li>
      <li><strong>Performance:</strong> Multi-level caching strategies and optimization techniques</li>
      <li><strong>Security:</strong> Authentication, authorization, data protection, and security best practices</li>
      <li><strong>Testing:</strong> Unit, integration, and end-to-end testing strategies</li>
      <li><strong>DevOps:</strong> Containerization, CI/CD pipelines, and cloud deployment practices</li>
    </ul>
    
    <h4>Interview-Ready Knowledge Areas</h4>
    
    <p><strong>Architecture and Design:</strong></p>
    <ul>
      <li>Service lifetime management and dependency injection patterns</li>
      <li>Configuration management across environments</li>
      <li>Microservices communication and resilience patterns</li>
      <li>Event-driven architecture with background services</li>
    </ul>
    
    <p><strong>Performance and Scalability:</strong></p>
    <ul>
      <li>Caching strategies for different data types and access patterns</li>
      <li>Asynchronous programming and parallel processing</li>
      <li>Resource management and memory optimization</li>
      <li>Database connection pooling and query optimization</li>
    </ul>
    
    <p><strong>Security and Compliance:</strong></p>
    <ul>
      <li>Authentication mechanisms (JWT, OAuth, Identity)</li>
      <li>Authorization policies and role-based access control</li>
      <li>Data protection and encryption strategies</li>
      <li>Security headers and vulnerability prevention</li>
    </ul>
    
    <p><strong>Operations and Monitoring:</strong></p>
    <ul>
      <li>Structured logging and correlation tracking</li>
      <li>Health checks and readiness probes</li>
      <li>Metrics collection and alerting</li>
      <li>Distributed tracing in microservices</li>
    </ul>
    
    <h4>Common Interview Questions and Expert Answers</h4>
    
    <p><strong>Q: "How do you ensure your .NET Core application is production-ready?"</strong></p>
    <p>A: Implement comprehensive logging with structured data, add health checks for all dependencies, configure proper error handling with retry policies, implement security best practices including authentication and authorization, set up monitoring and alerting, use configuration management for different environments, and ensure proper resource cleanup and disposal patterns.</p>
    
    <p><strong>Q: "How do you handle failures in a distributed .NET Core application?"</strong></p>
    <p>A: Implement circuit breaker patterns to prevent cascading failures, use retry policies with exponential backoff for transient errors, implement graceful degradation for non-critical services, use bulkhead isolation to contain failures, implement proper timeout handling, and ensure comprehensive logging and monitoring for quick issue identification.</p>
    
    <p><strong>Q: "What's your approach to caching in a .NET Core application?"</strong></p>
    <p>A: Use a multi-level caching strategy: in-memory cache for frequently accessed data with fast retrieval, distributed cache (Redis) for shared data across instances, response caching for HTTP responses, and implement cache-aside pattern with proper invalidation strategies. Consider data consistency requirements and implement cache warming for critical data.</p>
    
    <p><strong>Q: "How do you implement security in your .NET Core applications?"</strong></p>
    <p>A: Use JWT tokens for stateless authentication, implement role-based and policy-based authorization, add security headers to prevent common attacks, use HTTPS everywhere, implement input validation and sanitization, use data protection APIs for sensitive data, implement proper CORS policies, and add anti-forgery tokens for state-changing operations.</p>
    
    <p><strong>Q: "Describe your testing strategy for .NET Core applications."</strong></p>
    <p>A: Implement a pyramid approach: comprehensive unit tests with mocking for business logic, integration tests for API endpoints and database interactions, end-to-end tests for critical user workflows, performance tests for load scenarios, and security tests for vulnerability scanning. Use test data builders for maintainable test data and implement proper test isolation.</p>
    
    <h4>Production Best Practices</h4>
    <ul>
      <li><strong>Configuration:</strong> Use environment-specific configurations with proper secret management</li>
      <li><strong>Logging:</strong> Implement structured logging with correlation IDs for request tracking</li>
      <li><strong>Monitoring:</strong> Set up comprehensive metrics, alerts, and distributed tracing</li>
      <li><strong>Security:</strong> Regular security audits, dependency updates, and vulnerability scanning</li>
      <li><strong>Performance:</strong> Regular performance testing and optimization</li>
      <li><strong>Deployment:</strong> Automated CI/CD pipelines with proper testing gates</li>
    </ul>
    
    <h4>Advanced Topics for Senior Roles</h4>
    <ul>
      <li>Event sourcing and CQRS patterns implementation</li>
      <li>Advanced messaging patterns with service bus integration</li>
      <li>Custom middleware development and request pipeline optimization</li>
      <li>Advanced security scenarios including certificate-based authentication</li>
      <li>Performance profiling and optimization techniques</li>
      <li>Container orchestration with Kubernetes</li>
    </ul>
    
    <p>Master these concepts and demonstrate hands-on experience with production scenarios to excel in .NET Core development interviews and build enterprise-grade applications.</p>
  `,
  challenge: {
    description:
      'Build a comprehensive production-ready .NET Core microservice that demonstrates all the concepts covered in this section. This challenge simulates real-world enterprise development scenarios.',
    requirements: [
      'Implement complete application lifecycle with all services configured',
      'Add comprehensive logging, monitoring, and health checks',
      'Implement robust error handling with retry policies and circuit breakers',
      'Create background services for scheduled tasks and message processing',
      'Implement multi-level caching strategy with invalidation',
      'Add complete security implementation with JWT authentication',
      'Write comprehensive test suite with unit and integration tests',
      'Create Docker containerization and CI/CD pipeline',
      'Implement performance monitoring and alerting',
      'Document architecture decisions and deployment procedures',
    ],
    starterCode: `// Production-Ready Microservice Challenge
// Build a complete e-commerce inventory management service

// 1. Application Startup and Configuration
public class Program
{
    public static async Task Main(string[] args)
    {
        var builder = WebApplication.CreateBuilder(args);
        
        // TODO: Configure comprehensive service registration
        // Include: Database, caching, authentication, logging, monitoring
        
        var app = builder.Build();
        
        // TODO: Configure middleware pipeline
        // Include: Security headers, error handling, monitoring, authentication
        
        await app.RunAsync();
    }
}

// 2. Domain Models and Services
public class Product
{
    // TODO: Implement product entity with proper validation
    // Include: Id, Name, SKU, Price, StockQuantity, Category
}

public interface IInventoryService
{
    // TODO: Define inventory management operations
    // Include: Stock checking, reservation, restocking, low-stock alerts
}

// 3. API Controllers with Security
[ApiController]
[Route("api/[controller]")]
[Authorize]
public class InventoryController : ControllerBase
{
    // TODO: Implement REST endpoints with proper error handling
    // Include: GET, POST, PUT, DELETE operations with caching
}

// 4. Background Services
public class StockMonitoringService : BackgroundService
{
    // TODO: Implement background monitoring for low stock alerts
    // Include: Scheduled checks, email notifications, retry logic
}

public class InventoryReportingService : BackgroundService
{
    // TODO: Implement daily inventory reporting
    // Include: Report generation, file storage, cleanup
}

// 5. Caching Strategy
public class InventoryCacheService
{
    // TODO: Implement multi-level caching
    // Include: In-memory for frequently accessed items
    // Include: Distributed cache for stock levels
    // Include: Response caching for product catalogs
}

// 6. Error Handling and Resilience
public class ExternalSupplierService
{
    // TODO: Implement integration with external supplier APIs
    // Include: Retry policies, circuit breakers, fallback strategies
}

// 7. Security Implementation
public class InventoryAuthorizationHandler : AuthorizationHandler<InventoryPermissionRequirement>
{
    // TODO: Implement custom authorization for inventory operations
    // Include: Role-based and resource-based authorization
}

// 8. Comprehensive Testing
public class InventoryServiceTests
{
    // TODO: Implement unit tests with mocking
    // Include: Business logic testing, edge cases, error scenarios
}

public class InventoryIntegrationTests : IClassFixture<WebApplicationFactory<Program>>
{
    // TODO: Implement integration tests
    // Include: API endpoint testing, database integration, caching behavior
}

// 9. Health Checks and Monitoring
public class InventoryHealthCheck : IHealthCheck
{
    // TODO: Implement custom health checks
    // Include: Database connectivity, external service health, disk space
}

// 10. Performance Monitoring
public class InventoryMetrics
{
    // TODO: Implement custom metrics collection
    // Include: Request rates, response times, stock level metrics
}

// Requirements to fulfill:
// □ Complete application startup with all services configured
// □ Comprehensive logging with structured data and correlation IDs
// □ Error handling middleware with proper HTTP status codes
// □ Background services with graceful shutdown and error recovery
// □ Multi-level caching with proper invalidation strategies
// □ JWT authentication with role-based authorization
// □ Input validation and data sanitization
// □ Health checks for all dependencies
// □ Custom metrics and performance monitoring
// □ Unit tests with high coverage (>90%)
// □ Integration tests for all API endpoints
// □ Docker containerization with multi-stage build
// □ CI/CD pipeline with automated testing and deployment
// □ Security headers and CORS configuration
// □ Documentation with API specifications and deployment guide
// □ Performance benchmarks and optimization recommendations

// Bonus challenges:
// □ Implement event sourcing for inventory changes
// □ Add message queue integration for order processing
// □ Implement distributed tracing across service calls
// □ Add automated security scanning in CI/CD pipeline
// □ Implement blue-green deployment strategy
// □ Create comprehensive monitoring dashboards`,
  },
}

export default dotNetCoreApplicationDevelopment
