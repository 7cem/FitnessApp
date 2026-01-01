export default function GoalList({ goals, onToggleStep }) {
  return (
    <div className="goal-grid">
      {goals.map((goal) => (
        <article key={goal.id} className="goal-card">
          <div className="goal-header">
            <div>
              <h4>{goal.name}</h4>
              {goal.description ? <p>{goal.description}</p> : null}
            </div>
            <div className="goal-meta">
              <span>{goal.progress}%</span>
              <small>
                {goal.completedSteps}/{goal.totalSteps} steps
              </small>
            </div>
          </div>

          <div className="goal-progress">
            <span style={{ width: `${goal.progress}%` }} />
          </div>

          {goal.targetDate ? (
            <p className="goal-date">Target date: {goal.targetDate}</p>
          ) : null}

          <div className="goal-steps">
            {goal.steps.map((step) => (
              <label key={step.id} className="step-item">
                <input
                  type="checkbox"
                  checked={step.isCompleted}
                  onChange={(event) =>
                    onToggleStep(goal.id, step.id, event.target.checked)
                  }
                />
                <div>
                  <strong>{step.title}</strong>
                  {step.details ? <span>{step.details}</span> : null}
                </div>
              </label>
            ))}
          </div>
        </article>
      ))}
    </div>
  );
}
