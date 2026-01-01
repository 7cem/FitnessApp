using FitnessApp.Api.Models;
using FitnessApp.Api.Services;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddSingleton<GoalStore>();
builder.Services.AddCors(options =>
{
    options.AddPolicy("Frontend", policy =>
    {
        policy.WithOrigins("http://localhost:5173")
            .AllowAnyHeader()
            .AllowAnyMethod();
    });
});

var app = builder.Build();

app.UseCors("Frontend");

app.MapGet("/api/goals", (GoalStore store) => Results.Ok(store.GetAll()));

app.MapGet("/api/goals/{id:guid}", (Guid id, GoalStore store) =>
{
    var goal = store.GetById(id);
    return goal is null ? Results.NotFound() : Results.Ok(goal);
});

app.MapPost("/api/goals", (CreateGoalRequest request, GoalStore store) =>
{
    var goal = store.AddGoal(request);
    return Results.Created($"/api/goals/{goal.Id}", goal);
});

app.MapPut("/api/goals/{goalId:guid}/steps/{stepId:guid}",
    (Guid goalId, Guid stepId, UpdateStepRequest request, GoalStore store) =>
    {
        var updated = store.UpdateStep(goalId, stepId, request.IsCompleted);
        return updated is null ? Results.NotFound() : Results.Ok(updated);
    });

app.Run();
