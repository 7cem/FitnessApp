import { useEffect, useMemo, useState } from 'react';
import { fetchGoals, createGoal, updateStep } from './api.js';
import GoalForm from './components/GoalForm.jsx';
import GoalList from './components/GoalList.jsx';

const emptyMessage = 'Start by adding a goal to see the plan for your next milestone.';

export default function App() {
  const [goals, setGoals] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  const summary = useMemo(() => {
    if (goals.length === 0) {
      return { total: 0, completed: 0, progress: 0 };
    }

    const totals = goals.reduce(
      (acc, goal) => {
        acc.total += goal.totalSteps;
        acc.completed += goal.completedSteps;
        return acc;
      },
      { total: 0, completed: 0 }
    );

    return {
      ...totals,
      progress: totals.total === 0 ? 0 : Math.round((totals.completed / totals.total) * 100)
    };
  }, [goals]);

  const loadGoals = async () => {
    setIsLoading(true);
    setError('');
    try {
      const data = await fetchGoals();
      setGoals(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadGoals();
  }, []);

  const handleCreateGoal = async (payload) => {
    setError('');
    try {
      await createGoal(payload);
      await loadGoals();
    } catch (err) {
      setError(err.message);
    }
  };

  const handleToggleStep = async (goalId, stepId, isCompleted) => {
    setError('');
    try {
      await updateStep(goalId, stepId, isCompleted);
      await loadGoals();
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="app">
      <header className="hero">
        <div>
          <p className="eyebrow">Fitness Goal Tracker</p>
          <h1>Track every step toward your next personal best.</h1>
          <p className="subhead">
            Capture your goals, break them into actionable steps, and check off progress in real time.
          </p>
        </div>
        <div className="summary-card">
          <p className="summary-title">Overall progress</p>
          <h2>{summary.progress}%</h2>
          <p className="summary-detail">
            {summary.completed} of {summary.total} total steps completed
          </p>
          <div className="progress-track">
            <span style={{ width: `${summary.progress}%` }} />
          </div>
        </div>
      </header>

      <main className="content">
        <section className="panel">
          <h3>Create a new goal</h3>
          <GoalForm onSubmit={handleCreateGoal} />
        </section>

        <section className="panel">
          <div className="panel-header">
            <div>
              <h3>Your active goals</h3>
              <p className="panel-subtext">Keep tabs on every milestone and mark steps complete.</p>
            </div>
            <button className="ghost" type="button" onClick={loadGoals} disabled={isLoading}>
              Refresh
            </button>
          </div>

          {error ? <p className="error">{error}</p> : null}
          {isLoading ? <p className="muted">Loading goals...</p> : null}
          {!isLoading && goals.length === 0 ? <p className="muted">{emptyMessage}</p> : null}

          {!isLoading && goals.length > 0 ? (
            <GoalList goals={goals} onToggleStep={handleToggleStep} />
          ) : null}
        </section>
      </main>
    </div>
  );
}
