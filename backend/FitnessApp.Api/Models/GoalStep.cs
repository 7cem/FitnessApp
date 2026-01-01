namespace FitnessApp.Api.Models;

public sealed record GoalStep(
    Guid Id,
    string Title,
    string? Details,
    bool IsCompleted);
