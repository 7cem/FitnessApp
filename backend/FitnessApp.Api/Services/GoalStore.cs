using FitnessApp.Api.Models;

namespace FitnessApp.Api.Services;

public sealed class GoalStore
{
    private readonly List<FitnessGoal> _goals = new();

    public IReadOnlyList<FitnessGoal> GetAll() => _goals;

    public FitnessGoal? GetById(Guid id) => _goals.FirstOrDefault(goal => goal.Id == id);

    public FitnessGoal AddGoal(CreateGoalRequest request)
    {
        var steps = request.Steps
            .Select(step => new GoalStep(Guid.NewGuid(), step.Title, step.Details, false))
            .ToList();

        var goal = new FitnessGoal(
            Guid.NewGuid(),
            request.Name,
            request.Description,
            request.TargetDate,
            steps);

        _goals.Add(goal);
        return goal;
    }

    public FitnessGoal? UpdateStep(Guid goalId, Guid stepId, bool isCompleted)
    {
        var goalIndex = _goals.FindIndex(goal => goal.Id == goalId);
        if (goalIndex == -1)
        {
            return null;
        }

        var goal = _goals[goalIndex];
        var steps = goal.Steps
            .Select(step => step.Id == stepId ? step with { IsCompleted = isCompleted } : step)
            .ToList();

        if (steps.All(step => step.Id != stepId))
        {
            return null;
        }

        var updatedGoal = goal with { Steps = steps };
        _goals[goalIndex] = updatedGoal;
        return updatedGoal;
    }
}
