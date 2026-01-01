namespace FitnessApp.Api.Models;

public sealed record FitnessGoal(
    Guid Id,
    string Name,
    string? Description,
    DateOnly? TargetDate,
    IReadOnlyList<GoalStep> Steps)
{
    public int CompletedSteps => Steps.Count(step => step.IsCompleted);
    public int TotalSteps => Steps.Count;
    public double Progress => TotalSteps == 0 ? 0 : Math.Round((double)CompletedSteps / TotalSteps * 100, 1);
}
