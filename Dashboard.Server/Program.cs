using Dashboard.Server.Repositories;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

// Register repository for dependency injection
builder.Services.AddSingleton<ILeadRepository, LeadRepository>();

// Add CORS policy
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAll", builder =>
    {
        builder.AllowAnyOrigin()   // Allow any origin (for development purposes)
               .AllowAnyMethod()   // Allow any HTTP method (GET, POST, etc.)
               .AllowAnyHeader();  // Allow any HTTP header
    });
});

var app = builder.Build();

// Enable CORS middleware (this should come before other middlewares like HTTPS redirection)
app.UseCors("AllowAll");

// Configure static files (in case you have any front-end served from the backend)
app.UseDefaultFiles();
app.UseStaticFiles();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

// Enable HTTPS redirection (keep this after CORS to ensure HTTPS works after CORS handling)
app.UseHttpsRedirection();

// Enable authorization middleware (this can be removed if you're not using any auth system yet)
app.UseAuthorization();

// Map controllers (this is needed to make sure your API endpoints are reachable)
app.MapControllers();

// Ensure Angular's index.html is served when any unknown route is accessed (SPA routing)
app.MapFallbackToFile("/index.html");

app.Run();
