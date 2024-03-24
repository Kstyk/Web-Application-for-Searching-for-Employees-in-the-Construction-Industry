using AI2_Backend.Entities;
using FluentValidation.AspNetCore;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using MySqlConnector;
using System;
using System.Reflection;
using Microsoft.AspNetCore.Authorization;
using AI2_Backend.Services;
using AI2_Backend.Settings;
using Microsoft.IdentityModel.Tokens;
using System.Text;
using AI2_Backend.Models;
using AI2_Backend.Models.Validators;
using FluentValidation;
using AI2_Backend.Seeders;
using System.Text.Json.Serialization;
using AI2_Backend.seeders;
using Microsoft.OpenApi.Models;
using Swashbuckle.AspNetCore.Filters;
using AI2_Backend.Models.DefaultValues;
using Newtonsoft.Json.Converters;
using AI2_Backend.Authorization;

var builder = WebApplication.CreateBuilder(args);

// authentication
var authenticationSettings = new AuthenticationSettings();
builder.Configuration.GetSection("Authentication").Bind(authenticationSettings);


builder.Services.AddSingleton(authenticationSettings);
builder.Services.Configure<SmtpSettings>(builder.Configuration.GetSection("SmtpSettings"));

builder.Services.AddAuthentication(option =>
{
    option.DefaultAuthenticateScheme = "Bearer";
    option.DefaultScheme = "Bearer";
    option.DefaultChallengeScheme = "Bearer";
}).AddJwtBearer(cfg =>
{
    cfg.RequireHttpsMetadata = false;
    cfg.SaveToken = true;
    cfg.TokenValidationParameters = new Microsoft.IdentityModel.Tokens.TokenValidationParameters
    {
        ValidIssuer = authenticationSettings.JwtIssuer,
        ValidAudience = authenticationSettings.JwtIssuer,
        IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(authenticationSettings.JwtKey))
    };
});


builder.Services.AddCors(options =>
{
    options.AddPolicy("FrontendClient", builder =>
        builder.AllowAnyMethod()
            .AllowAnyHeader()
            .WithOrigins("http://localhost:3000")
        );
});


builder.Services.AddAuthorization(options =>
{
    options.AddPolicy("IsRecruiter", builder => builder.AddRequirements(new RoleRequirement("recruiter")));
    options.AddPolicy("IsEmployee", builder => builder.AddRequirements(new RoleRequirement("employee")));
});
builder.Services.AddScoped<IAuthorizationHandler, RoleRequirementHandler>();

// Add services to the container.
builder.Services.AddControllers().AddJsonOptions(options =>
    options.JsonSerializerOptions.Converters.Add(new JsonStringEnumConverter()));

// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen(c =>
{
   
    c.ExampleFilters();
    //c.DocumentFilter<SwaggerDocumentFilter>();
    c.EnableAnnotations();
    c.AddSecurityDefinition("Bearer", new Microsoft.OpenApi.Models.OpenApiSecurityScheme
    {
        Description = @"JWT Authorization header using the Bearer scheme. \r\n\r\n 
                      Enter 'Bearer' [space] and then your token in the text input below.
                      \r\n\r\nExample: 'Bearer 12345abcdef'",
        Name = "Authorization",
        In = Microsoft.OpenApi.Models.ParameterLocation.Header,
        Type = Microsoft.OpenApi.Models.SecuritySchemeType.ApiKey,
        Scheme = "Bearer"
    });

    c.AddSecurityRequirement(new OpenApiSecurityRequirement()
      {
        {
          new OpenApiSecurityScheme
          {
            Reference = new OpenApiReference
              {
                Type = ReferenceType.SecurityScheme,
                Id = "Bearer"
              },
              Scheme = "oauth2",
              Name = "Bearer",
              In = ParameterLocation.Header,

            },
            new List<string>()
          }
        });
   
});
builder.Services.AddSwaggerExamplesFromAssemblies(Assembly.GetEntryAssembly());

builder.Services.AddFluentValidationAutoValidation().AddFluentValidationClientsideAdapters();
builder.Services.AddAutoMapper(Assembly.GetExecutingAssembly());

// db Context
builder.Services.AddDbContextPool<AIDbContext>(options =>
{
    var connectionString = builder.Configuration.GetConnectionString("Default");
    options.UseMySql(connectionString, ServerVersion.AutoDetect(connectionString));
});



builder.Services.AddScoped<IPasswordHasher<User>, PasswordHasher<User>>();

builder.Services.AddScoped<IUserContextService, UserContextService>();
builder.Services.AddHttpContextAccessor();

// seeders
builder.Services.AddScoped<RoleSeeder>();
builder.Services.AddScoped<QualificationSeeder>();
builder.Services.AddScoped<UserSeeder>();

// services
builder.Services.AddScoped<IAccountService, AccountService>();
builder.Services.AddScoped<IEmployeeService, EmployeeService>();
builder.Services.AddScoped<IQualificationService, QualificationService>();
builder.Services.AddScoped<IInvitationSevice, InvitationService>();
builder.Services.AddScoped<IStatService, StatService>();

// validators
builder.Services.AddScoped<IValidator<RegisterUserDto>, RegisterUserDtoValidator>();
builder.Services.AddScoped<IValidator<UpdateUserDto>, UpdateUserDtoValidator>();
builder.Services.AddScoped<IValidator<LoginUserDto>, LoginUserDtoValidator>();
builder.Services.AddScoped<IValidator<CreateExperienceDto>, CreateExperienceDtoValidator>();

var app = builder.Build();

// seeders
var scope = app.Services.CreateScope();
var roleSeeder = scope.ServiceProvider.GetRequiredService<RoleSeeder>();
var qualificationSeeder = scope.ServiceProvider.GetRequiredService<QualificationSeeder>();
var userSeeder = scope.ServiceProvider.GetRequiredService<UserSeeder>();

roleSeeder.Seed();
qualificationSeeder.Seed();
userSeeder.Seed();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}
app.UseCors("FrontendClient");


app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();





