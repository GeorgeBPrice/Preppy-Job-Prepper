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
        <p>.NET Core applications follow a well-defined startup sequence that gives you precise control over how your application initializes, configures services, and handles requests. Understanding this lifecycle is crucial for building robust, maintainable applications.</p>
        
        <h4>The Startup Process</h4>
        
        <p>The .NET Core startup process follows a specific sequence:</p>
        <ul>
          <li><strong>Host Creation:</strong> Creates the web host or generic host</li>
          <li><strong>Service Registration:</strong> Configures dependency injection container</li>
          <li><strong>Middleware Pipeline:</strong> Sets up request processing pipeline</li>
          <li><strong>Application Launch:</strong> Starts listening for requests</li>
        </ul>

        <p><strong>Program.cs in .NET 6+:</strong> The simplified hosting model reduces boilerplate while maintaining full control over the application lifecycle.</p>

        <div class="code-example">
          <pre><code>// Modern .NET 6+ minimal hosting
var builder = WebApplication.CreateBuilder(args);

// Service registration
builder.Services.AddControllers();
builder.Services.AddDbContext<ApplicationDbContext>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection")));
builder.Services.AddScoped<IUserService, UserService>();

// Configuration
builder.Configuration.AddEnvironmentVariables();
builder.Configuration.AddUserSecrets<Program>();

var app = builder.Build();

// Middleware pipeline
if (app.Environment.IsDevelopment())
{
    app.UseDeveloperExceptionPage();
}

app.UseHttpsRedirection();
app.UseAuthentication();
app.UseAuthorization();
app.MapControllers();

await app.RunAsync();</code></pre>
        </div>

        <h4>Configuration Management</h4>
        
        <p>Configuration in .NET Core follows a hierarchical approach where later sources override earlier ones:</p>
        <ul>
          <li><strong>appsettings.json</strong> - Base configuration</li>
          <li><strong>appsettings.{Environment}.json</strong> - Environment-specific settings</li>
          <li><strong>User Secrets</strong> - Development secrets (never in production)</li>
          <li><strong>Environment Variables</strong> - Platform and deployment settings</li>
          <li><strong>Command Line Arguments</strong> - Runtime overrides</li>
        </ul>

        <div class="code-example">
          <pre><code>// Configuration binding to strongly-typed objects
public class DatabaseOptions
{
    public string ConnectionString { get; set; }
    public int CommandTimeout { get; set; }
    public bool EnableRetryOnFailure { get; set; }
}

// Registration
builder.Services.Configure<DatabaseOptions>(
    builder.Configuration.GetSection("Database"));

// Usage with dependency injection
public class UserService
{
    private readonly DatabaseOptions _dbOptions;
    
    public UserService(IOptions<DatabaseOptions> dbOptions)
    {
        _dbOptions = dbOptions.Value;
    }
}</code></pre>
        </div>

        <h4>Environment-Specific Behavior</h4>
        
        <p>Use environment awareness to configure different behaviors for Development, Staging, and Production:</p>

        <div class="code-example">
          <pre><code>// Environment-specific service registration
if (builder.Environment.IsDevelopment())
{
    builder.Services.AddSingleton<IEmailService, MockEmailService>();
    builder.Services.AddDatabaseDeveloperPageExceptionFilter();
}
else
{
    builder.Services.AddSingleton<IEmailService, SmtpEmailService>();
}

// Feature flags for gradual rollouts
builder.Services.AddFeatureManagement();

// Health checks for production monitoring
builder.Services.AddHealthChecks()
    .AddDbContext<ApplicationDbContext>()
    .AddUrlGroup(new Uri("https://api.external-service.com/health"));</code></pre>
        </div>

        <h4>Service Lifetime Management</h4>
        
        <p>Understanding service lifetimes is critical for proper resource management and avoiding memory leaks:</p>
        <ul>
          <li><strong>Transient:</strong> New instance every time (lightweight, stateless services)</li>
          <li><strong>Scoped:</strong> One instance per request (DbContext, business services)</li>
          <li><strong>Singleton:</strong> One instance for application lifetime (caches, loggers)</li>
        </ul>

        <div class="code-example">
          <pre><code>// Service lifetime examples
builder.Services.AddTransient<IEmailService, EmailService>();       // New each time
builder.Services.AddScoped<IUserService, UserService>();            // Per request
builder.Services.AddSingleton<IMemoryCache, MemoryCache>();         // Application lifetime

// Factory pattern for complex creation
builder.Services.AddSingleton<IHttpClientFactory, HttpClientFactory>();
builder.Services.AddHttpClient<ApiService>(client =>
{
    client.BaseAddress = new Uri("https://api.example.com/");
    client.Timeout = TimeSpan.FromSeconds(30);
});</code></pre>
        </div>

        <div class="interview-tip">
          <p><span class="interview-icon">🎯</span> <strong>Interview Focus:</strong> Demonstrate understanding of application lifecycle and service management.</p>
          <p>Key questions include: "Explain the .NET Core startup process" and "How do you manage service lifetimes in dependency injection?"</p>
        </div>
      `,
          codeExample: `// Complete application lifecycle example
public class Program
{
    public static async Task Main(string[] args)
    {
        var builder = WebApplication.CreateBuilder(args);
        
        // Configure services
        ConfigureServices(builder.Services, builder.Configuration);
        
        var app = builder.Build();
        
        // Configure middleware pipeline
        ConfigureMiddleware(app);
        
        // Graceful shutdown handling
        var lifetime = app.Services.GetRequiredService<IHostApplicationLifetime>();
        lifetime.ApplicationStopping.Register(() =>
        {
            // Cleanup logic here
            Console.WriteLine("Application is shutting down...");
        });
        
        await app.RunAsync();
    }
    
    private static void ConfigureServices(IServiceCollection services, IConfiguration configuration)
    {
        // Add framework services
        services.AddControllers();
        services.AddHealthChecks();
        
        // Add application services
        services.AddScoped<IUserService, UserService>();
        services.AddSingleton<IMemoryCache, MemoryCache>();
        
        // Configure options
        services.Configure<ApiSettings>(configuration.GetSection("ApiSettings"));
    }
    
    private static void ConfigureMiddleware(WebApplication app)
    {
        if (app.Environment.IsDevelopment())
        {
            app.UseDeveloperExceptionPage();
        }
        else
        {
            app.UseExceptionHandler("/Error");
            app.UseHsts();
        }
        
        app.UseHttpsRedirection();
        app.UseRouting();
        app.UseAuthentication();
        app.UseAuthorization();
        app.MapControllers();
        app.MapHealthChecks("/health");
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
        <p>Effective logging and monitoring are essential for maintaining production applications. .NET Core provides powerful built-in logging capabilities that integrate seamlessly with modern observability platforms and APM tools.</p>
        
        <h4>Structured Logging with ILogger</h4>
        
        <p>Structured logging captures both human-readable messages and machine-readable data, enabling powerful querying and analysis in centralized logging systems.</p>

        <p><strong>Key Benefits:</strong></p>
        <ul>
          <li><strong>Searchability:</strong> Query logs by specific properties and values</li>
          <li><strong>Correlation:</strong> Track requests across distributed systems</li>
          <li><strong>Performance:</strong> Conditional logging reduces overhead</li>
          <li><strong>Integration:</strong> Works with ELK, Splunk, Application Insights</li>
        </ul>

        <div class="code-example">
          <pre><code>// Structured logging best practices
public class UserService
{
    private readonly ILogger<UserService> _logger;
    
    public UserService(ILogger<UserService> logger)
    {
        _logger = logger;
    }
    
    public async Task<User> CreateUserAsync(CreateUserRequest request)
    {
        using var scope = _logger.BeginScope("UserId: {UserId}, Operation: {Operation}", 
            request.UserId, "CreateUser");
        
        _logger.LogInformation("Creating user with email {Email}", request.Email);
        
        try
        {
            var user = new User { Email = request.Email, Name = request.Name };
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

        <h4>Logging Configuration and Providers</h4>
        
        <p>Configure multiple logging providers to capture logs in different formats and destinations:</p>

        <div class="code-example">
          <pre><code>// Comprehensive logging configuration
{
  "Logging": {
    "LogLevel": {
      "Default": "Information",
      "Microsoft.AspNetCore": "Warning",
      "Microsoft.EntityFrameworkCore": "Warning"
    },
    "Console": {
      "IncludeScopes": true,
      "TimestampFormat": "yyyy-MM-dd HH:mm:ss "
    },
    "ApplicationInsights": {
      "LogLevel": {
        "Default": "Information"
      }
    }
  }
}

// Program.cs logging setup
builder.Logging.ClearProviders();
builder.Logging.AddConsole();
builder.Logging.AddDebug();
builder.Logging.AddApplicationInsights();

// Custom logging provider
builder.Logging.AddProvider(new FileLoggerProvider("logs/app.log"));</code></pre>
        </div>

        <h4>Application Performance Monitoring</h4>
        
        <p>Monitor application performance, dependencies, and user experience with built-in metrics and custom telemetry:</p>

        <div class="code-example">
          <pre><code>// Custom metrics and telemetry
public class OrderService
{
    private readonly ILogger<OrderService> _logger;
    private readonly IMetrics _metrics;
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
        using var activity = OrderTracing.StartActivity("ProcessOrder");
        activity?.SetTag("order.id", request.OrderId);
        
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

        <h4>Health Checks and Readiness Probes</h4>
        
        <p>Implement comprehensive health checks for dependencies and system components:</p>

        <div class="code-example">
          <pre><code>// Comprehensive health checks
builder.Services.AddHealthChecks()
    .AddDbContext<ApplicationDbContext>()
    .AddSqlServer(connectionString)
    .AddRedis(redisConnectionString)
    .AddUrlGroup(new Uri("https://api.payment-provider.com/health"), "payment-api")
    .AddCheck<CustomHealthCheck>("custom-service");

// Custom health check implementation
public class CustomHealthCheck : IHealthCheck
{
    private readonly IServiceProvider _serviceProvider;
    
    public async Task<HealthCheckResult> CheckHealthAsync(
        HealthCheckContext context, CancellationToken cancellationToken = default)
    {
        try
        {
            // Check critical business logic
            var isHealthy = await CheckCriticalDependency();
            
            return isHealthy 
                ? HealthCheckResult.Healthy("Service is running normally")
                : HealthCheckResult.Degraded("Service has issues but is functional");
        }
        catch (Exception ex)
        {
            return HealthCheckResult.Unhealthy("Service is down", ex);
        }
    }
}</code></pre>
        </div>

        <h4>Distributed Tracing and Correlation</h4>
        
        <p>Track requests across microservices and external dependencies with OpenTelemetry:</p>

        <div class="code-example">
          <pre><code>// OpenTelemetry configuration
builder.Services.AddOpenTelemetry()
    .WithTracing(tracing => tracing
        .AddAspNetCoreInstrumentation()
        .AddHttpClientInstrumentation()
        .AddEntityFrameworkCoreInstrumentation()
        .AddJaegerExporter())
    .WithMetrics(metrics => metrics
        .AddAspNetCoreInstrumentation()
        .AddHttpClientInstrumentation()
        .AddPrometheusExporter());

// Manual span creation
public class PaymentService
{
    private static readonly ActivitySource ActivitySource = new("PaymentService");
    
    public async Task<PaymentResult> ProcessPaymentAsync(PaymentRequest request)
    {
        using var activity = ActivitySource.StartActivity("ProcessPayment");
        activity?.SetTag("payment.amount", request.Amount);
        activity?.SetTag("payment.currency", request.Currency);
        
        // Payment processing logic
        return await ProcessPaymentInternalAsync(request);
    }
}</code></pre>
        </div>

        <div class="interview-tip">
          <p><span class="interview-icon">🎯</span> <strong>Interview Focus:</strong> Show understanding of observability and production monitoring.</p>
          <p>Key questions include: "How do you implement effective logging in microservices?" and "What monitoring strategies do you use for production applications?"</p>
        </div>
      `,
          codeExample: `// Complete observability setup
public static class ObservabilityExtensions
{
    public static IServiceCollection AddObservability(
        this IServiceCollection services, IConfiguration configuration)
    {
        // Logging
        services.AddLogging(builder =>
        {
            builder.AddConsole();
            builder.AddApplicationInsights();
            builder.AddStructuredLogging();
        });
        
        // Metrics
        services.AddMetrics();
        services.AddSingleton<IMetricsCollector, MetricsCollector>();
        
        // Health Checks
        services.AddHealthChecks()
            .AddDbContext<ApplicationDbContext>()
            .AddRedis(configuration.GetConnectionString("Redis"))
            .AddCheck<ApiHealthCheck>("external-api");
        
        // Distributed Tracing
        services.AddOpenTelemetry()
            .WithTracing(tracing => tracing
                .AddAspNetCoreInstrumentation()
                .AddHttpClientInstrumentation()
                .AddSqlClientInstrumentation()
                .AddJaegerExporter())
            .WithMetrics(metrics => metrics
                .AddAspNetCoreInstrumentation()
                .AddRuntimeInstrumentation()
                .AddPrometheusExporter());
        
        return services;
    }
    
    public static IApplicationBuilder UseObservability(this IApplicationBuilder app)
    {
        // Request logging middleware
        app.UseMiddleware<RequestLoggingMiddleware>();
        
        // Health check endpoints
        app.UseHealthChecks("/health", new HealthCheckOptions
        {
            ResponseWriter = UIResponseWriter.WriteHealthCheckUIResponse
        });
        
        // Metrics endpoint
        app.UseOpenTelemetryPrometheusScrapingEndpoint();
        
        return app;
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
        <p>Robust error handling is critical for production applications. .NET Core provides multiple layers of error handling, from global exception middleware to retry policies and circuit breakers that help build resilient, fault-tolerant systems.</p>
        
        <h4>Global Exception Middleware</h4>
        
        <p>Centralized exception handling ensures consistent error responses and prevents sensitive information leakage while providing comprehensive logging for debugging.</p>

        <div class="code-example">
          <pre><code>// Global exception handling middleware
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
            _logger.LogError(ex, "Unhandled exception occurred. TraceId: {TraceId}", 
                context.TraceIdentifier);
            await HandleExceptionAsync(context, ex);
        }
    }
    
    private static async Task HandleExceptionAsync(HttpContext context, Exception exception)
    {
        var response = exception switch
        {
            ValidationException => new { Status = 400, Message = "Validation failed", Details = exception.Message },
            NotFoundException => new { Status = 404, Message = "Resource not found" },
            UnauthorizedAccessException => new { Status = 401, Message = "Unauthorized access" },
            _ => new { Status = 500, Message = "An error occurred", TraceId = context.TraceIdentifier }
        };
        
        context.Response.StatusCode = response.Status;
        context.Response.ContentType = "application/json";
        await context.Response.WriteAsync(JsonSerializer.Serialize(response));
    }
}</code></pre>
        </div>

        <h4>Retry Policies with Polly</h4>
        
        <p>Implement intelligent retry strategies for transient failures in external dependencies:</p>

        <div class="code-example">
          <pre><code>// Retry policies configuration
public static class RetryPolicies
{
    public static IAsyncPolicy<HttpResponseMessage> HttpRetryPolicy =>
        Policy.HandleResult<HttpResponseMessage>(r => !r.IsSuccessStatusCode)
            .Or<HttpRequestException>()
            .WaitAndRetryAsync(
                retryCount: 3,
                sleepDurationProvider: retryAttempt => TimeSpan.FromSeconds(Math.Pow(2, retryAttempt)),
                onRetry: (outcome, timespan, retryCount, context) =>
                {
                    var logger = context.GetValueOrDefault("logger") as ILogger;
                    logger?.LogWarning("Retry {RetryCount} after {Delay}ms", retryCount, timespan.TotalMilliseconds);
                });
    
    public static IAsyncPolicy DatabaseRetryPolicy =>
        Policy.Handle<SqlException>()
            .Or<TimeoutException>()
            .WaitAndRetryAsync(
                retryCount: 2,
                sleepDurationProvider: _ => TimeSpan.FromMilliseconds(500),
                onRetry: (exception, timespan, retryCount, context) =>
                {
                    var logger = context.GetValueOrDefault("logger") as ILogger;
                    logger?.LogWarning(exception, "Database retry {RetryCount}", retryCount);
                });
}

// Service implementation with retry
public class ExternalApiService
{
    private readonly HttpClient _httpClient;
    private readonly ILogger<ExternalApiService> _logger;
    
    public async Task<ApiResponse> GetDataAsync(string endpoint)
    {
        var context = new Context { ["logger"] = _logger };
        
        var response = await RetryPolicies.HttpRetryPolicy.ExecuteAsync(async () =>
        {
            return await _httpClient.GetAsync(endpoint);
        }, context);
        
        return await response.Content.ReadFromJsonAsync<ApiResponse>();
    }
}</code></pre>
        </div>

        <h4>Circuit Breaker Pattern</h4>
        
        <p>Prevent cascading failures by temporarily stopping calls to failing services:</p>

        <div class="code-example">
          <pre><code>// Circuit breaker implementation
public class PaymentService
{
    private readonly IAsyncPolicy _circuitBreakerPolicy;
    private readonly ILogger<PaymentService> _logger;
    
    public PaymentService(ILogger<PaymentService> logger)
    {
        _logger = logger;
        _circuitBreakerPolicy = Policy
            .Handle<HttpRequestException>()
            .Or<TaskCanceledException>()
            .CircuitBreakerAsync(
                handledEventsAllowedBeforeBreaking: 3,
                durationOfBreak: TimeSpan.FromMinutes(1),
                onBreak: (exception, duration) =>
                {
                    _logger.LogWarning("Circuit breaker opened for {Duration}", duration);
                },
                onReset: () =>
                {
                    _logger.LogInformation("Circuit breaker reset");
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
            _logger.LogWarning("Payment service unavailable, using fallback");
            return new PaymentResult { Status = "Deferred", Message = "Payment will be processed later" };
        }
    }
}</code></pre>
        </div>

        <h4>Graceful Degradation</h4>
        
        <p>Maintain partial functionality when non-critical services fail:</p>

        <div class="code-example">
          <pre><code>// Graceful degradation example
public class RecommendationService
{
    private readonly IExternalRecommendationApi _externalApi;
    private readonly IFallbackRecommendationService _fallbackService;
    private readonly ILogger<RecommendationService> _logger;
    
    public async Task<List<Product>> GetRecommendationsAsync(int userId)
    {
        try
        {
            // Try primary service
            return await _externalApi.GetRecommendationsAsync(userId);
        }
        catch (Exception ex)
        {
            _logger.LogWarning(ex, "External recommendation service failed, using fallback");
            
            try
            {
                // Fallback to simple algorithm
                return await _fallbackService.GetBasicRecommendationsAsync(userId);
            }
            catch (Exception fallbackEx)
            {
                _logger.LogError(fallbackEx, "Both recommendation services failed");
                // Return empty list rather than failing completely
                return new List<Product>();
            }
        }
    }
}</code></pre>
        </div>

        <div class="interview-tip">
          <p><span class="interview-icon">🎯</span> <strong>Interview Focus:</strong> Demonstrate understanding of resilience patterns and fault tolerance.</p>
          <p>Key questions include: "How do you handle failures in distributed systems?" and "What strategies do you use for graceful degradation?"</p>
        </div>
      `,
          codeExample: `// Comprehensive resilience strategy
public static class ResilienceExtensions
{
    public static IServiceCollection AddResiliencePatterns(this IServiceCollection services)
    {
        // Register Polly policies
        services.AddSingleton<IAsyncPolicy<HttpResponseMessage>>(RetryPolicies.HttpRetryPolicy);
        services.AddSingleton<IAsyncPolicy>(RetryPolicies.DatabaseRetryPolicy);
        
        // Circuit breaker for external services
        services.AddSingleton<IAsyncPolicy>(provider =>
            Policy.Handle<HttpRequestException>()
                .CircuitBreakerAsync(
                    handledEventsAllowedBeforeBreaking: 5,
                    durationOfBreak: TimeSpan.FromSeconds(30)));
        
        // Bulkhead isolation
        services.AddSingleton<IAsyncPolicy>(
            Policy.BulkheadAsync(maxParallelization: 10, maxQueuingActions: 20));
        
        return services;
    }
    
    public static IApplicationBuilder UseResilienceMiddleware(this IApplicationBuilder app)
    {
        app.UseMiddleware<GlobalExceptionMiddleware>();
        app.UseMiddleware<TimeoutMiddleware>();
        app.UseMiddleware<RateLimitingMiddleware>();
        
        return app;
    }
}

// Usage in service
public class ResilientApiClient
{
    private readonly HttpClient _httpClient;
    private readonly IAsyncPolicy<HttpResponseMessage> _retryPolicy;
    private readonly IAsyncPolicy _circuitBreakerPolicy;
    
    public async Task<T> GetAsync<T>(string endpoint)
    {
        var combinedPolicy = Policy.WrapAsync(_retryPolicy, _circuitBreakerPolicy);
        
        var response = await combinedPolicy.ExecuteAsync(async () =>
        {
            return await _httpClient.GetAsync(endpoint);
        });
        
        response.EnsureSuccessStatusCode();
        return await response.Content.ReadFromJsonAsync<T>();
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
        <p>Background services are essential for processing tasks outside the request-response cycle. .NET Core provides several patterns for implementing background processing, from simple hosted services to sophisticated message queue workers.</p>
        
        <h4>IHostedService Implementation</h4>
        
        <p>Hosted services run for the lifetime of the application and are perfect for scheduled tasks, monitoring, and maintenance operations.</p>

        <div class="code-example">
          <pre><code>// Basic hosted service implementation
public class EmailCleanupService : IHostedService, IDisposable
{
    private readonly ILogger<EmailCleanupService> _logger;
    private readonly IServiceProvider _serviceProvider;
    private Timer _timer;
    
    public EmailCleanupService(ILogger<EmailCleanupService> logger, IServiceProvider serviceProvider)
    {
        _logger = logger;
        _serviceProvider = serviceProvider;
    }
    
    public Task StartAsync(CancellationToken cancellationToken)
    {
        _logger.LogInformation("Email cleanup service starting");
        
        // Run every hour
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
        _logger.LogInformation("Email cleanup service stopping");
        _timer?.Change(Timeout.Infinite, 0);
        return Task.CompletedTask;
    }
    
    public void Dispose() => _timer?.Dispose();
}</code></pre>
        </div>

        <h4>BackgroundService for Long-Running Tasks</h4>
        
        <p>BackgroundService provides a convenient base class for implementing long-running background operations:</p>

        <div class="code-example">
          <pre><code>// Queue processing background service
public class OrderProcessingService : BackgroundService
{
    private readonly ILogger<OrderProcessingService> _logger;
    private readonly IServiceProvider _serviceProvider;
    private readonly IMessageQueue _messageQueue;
    
    public OrderProcessingService(
        ILogger<OrderProcessingService> logger,
        IServiceProvider serviceProvider,
        IMessageQueue messageQueue)
    {
        _logger = logger;
        _serviceProvider = serviceProvider;
        _messageQueue = messageQueue;
    }
    
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
                    // No messages, wait a bit
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
                await Task.Delay(5000, stoppingToken); // Wait before retrying
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

        <h4>Worker Services</h4>
        
        <p>Worker services are standalone applications designed for background processing, ideal for microservices architecture:</p>

        <div class="code-example">
          <pre><code>// Dedicated worker service application
public class DataSyncWorker : BackgroundService
{
    private readonly ILogger<DataSyncWorker> _logger;
    private readonly IConfiguration _configuration;
    private readonly IDataSyncService _dataSyncService;
    
    public DataSyncWorker(
        ILogger<DataSyncWorker> logger,
        IConfiguration configuration,
        IDataSyncService dataSyncService)
    {
        _logger = logger;
        _configuration = configuration;
        _dataSyncService = dataSyncService;
    }
    
    protected override async Task ExecuteAsync(CancellationToken stoppingToken)
    {
        var intervalMinutes = _configuration.GetValue<int>("SyncIntervalMinutes", 15);
        var interval = TimeSpan.FromMinutes(intervalMinutes);
        
        while (!stoppingToken.IsCancellationRequested)
        {
            var stopwatch = Stopwatch.StartNew();
            
            try
            {
                _logger.LogInformation("Starting data synchronization");
                await _dataSyncService.SynchronizeAsync(stoppingToken);
                _logger.LogInformation("Data synchronization completed in {ElapsedMs}ms", 
                    stopwatch.ElapsedMilliseconds);
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

// Program.cs for worker service
var builder = Host.CreateDefaultBuilder(args)
    .ConfigureServices((context, services) =>
    {
        services.AddHostedService<DataSyncWorker>();
        services.AddSingleton<IDataSyncService, DataSyncService>();
    });

await builder.Build().RunAsync();</code></pre>
        </div>

        <h4>Message Queue Integration</h4>
        
        <p>Integrate with message queues for reliable, scalable background processing:</p>

        <div class="code-example">
          <pre><code>// RabbitMQ integration example
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
          <p><span class="interview-icon">🎯</span> <strong>Interview Focus:</strong> Demonstrate understanding of background processing patterns and scalability.</p>
          <p>Key questions include: "How do you implement reliable background processing?" and "What's the difference between hosted services and worker services?"</p>
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
        <p>Caching is crucial for application performance, reducing database load, and improving user experience. .NET Core provides multiple caching mechanisms that can be combined to create sophisticated caching strategies.</p>
        
        <h4>In-Memory Caching</h4>
        
        <p>In-memory caching stores data in the application's memory space, providing the fastest access times but limited to single server instances.</p>

        <div class="code-example">
          <pre><code>// In-memory caching service
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

        <h4>Distributed Caching with Redis</h4>
        
        <p>Distributed caching enables sharing cached data across multiple application instances:</p>

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

        <div class="interview-tip">
          <p><span class="interview-icon">🎯</span> <strong>Interview Focus:</strong> Demonstrate understanding of caching strategies and performance optimization.</p>
          <p>Key questions include: "When would you use distributed vs in-memory caching?" and "How do you handle cache invalidation?"</p>
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
        <p>Security is paramount in modern applications. .NET Core provides comprehensive security features including authentication, authorization, data protection, and built-in protection against common vulnerabilities.</p>
        
        <h4>JWT Authentication Implementation</h4>
        
        <p>JSON Web Tokens (JWT) provide a stateless authentication mechanism perfect for APIs and distributed systems:</p>

        <div class="code-example">
          <pre><code>// JWT authentication configuration
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

// JWT token service
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

        <h4>Authorization Policies</h4>
        
        <p>Implement fine-grained authorization using roles and custom policies:</p>

        <div class="code-example">
          <pre><code>// Authorization policies configuration
builder.Services.AddAuthorization(options =>
{
    options.AddPolicy("AdminOnly", policy => policy.RequireRole("Administrator"));
    options.AddPolicy("ManagerOrAdmin", policy => policy.RequireRole("Manager", "Administrator"));
    options.AddPolicy("CanEditProducts", policy =>
        policy.RequireClaim("permission", "products.edit"));
});

// Custom authorization requirement
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

        <h4>Data Protection and Security Headers</h4>
        
        <p>Protect sensitive data and implement security headers:</p>

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
          <p><span class="interview-icon">🎯</span> <strong>Interview Focus:</strong> Demonstrate comprehensive security knowledge.</p>
          <p>Key questions include: "How do you implement secure authentication?" and "What security headers do you implement?"</p>
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
        <p>Testing is crucial for maintaining code quality and ensuring reliable deployments. .NET Core provides excellent testing frameworks and tooling for implementing comprehensive testing strategies across all application layers.</p>
        
        <h4>Unit Testing with xUnit</h4>
        
        <p>Unit tests verify individual components in isolation, providing fast feedback and high confidence in code changes:</p>

        <div class="code-example">
          <pre><code>// Unit test example with xUnit and Moq
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

        <h4>Integration Testing</h4>
        
        <p>Integration tests verify that multiple components work together correctly:</p>

        <div class="code-example">
          <pre><code>// Integration test with TestHost
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
                // Replace real database with in-memory database
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

        <h4>Test Data Management</h4>
        
        <p>Implement proper test data setup and cleanup strategies:</p>

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

// Usage in tests
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

        <div class="interview-tip">
          <p><span class="interview-icon">🎯</span> <strong>Interview Focus:</strong> Demonstrate comprehensive testing knowledge and best practices.</p>
          <p>Key questions include: "What's your testing strategy?" and "How do you handle database testing in integration tests?"</p>
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
        <p>Modern .NET Core applications are designed for cloud-native deployment using containers and orchestration platforms. Understanding deployment strategies is crucial for building scalable, maintainable applications.</p>
        
        <h4>Docker Containerization</h4>
        
        <p>Containers provide consistent deployment environments across development, testing, and production:</p>

        <div class="code-example">
          <pre><code># Multi-stage Dockerfile for .NET Core
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

# Docker Compose for local development
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
      - SA_PASSWORD=YourStrong@Passw0rd
    ports:
      - "1433:1433"</code></pre>
        </div>

        <h4>CI/CD Pipeline Configuration</h4>
        
        <p>Implement automated build, test, and deployment pipelines:</p>

        <div class="code-example">
          <pre><code># GitHub Actions workflow
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

        <h4>Health Checks and Monitoring</h4>
        
        <p>Implement comprehensive health checks for production monitoring:</p>

        <div class="code-example">
          <pre><code>// Production health check configuration
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

        <div class="interview-tip">
          <p><span class="interview-icon">🎯</span> <strong>Interview Focus:</strong> Demonstrate understanding of modern deployment practices.</p>
          <p>Key questions include: "How do you implement blue-green deployments?" and "What's your strategy for zero-downtime deployments?"</p>
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
