namespace FitnessApp.Api.Models;

public sealed record CreateGoalRequest(
    string Name,
    string? Description,
    DateOnly? TargetDate,
    IReadOnlyList<CreateGoalStep> Steps);

public sealed record CreateGoalStep(
    string Title,
    string? Details);
