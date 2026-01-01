import { useState } from 'react';

const createStep = () => ({ title: '', details: '' });

export default function GoalForm({ onSubmit }) {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [targetDate, setTargetDate] = useState('');
  const [steps, setSteps] = useState([createStep(), createStep()]);

  const handleStepChange = (index, field, value) => {
    setSteps((current) =>
      current.map((step, idx) => (idx === index ? { ...step, [field]: value } : step))
    );
  };

  const handleAddStep = () => {
    setSteps((current) => [...current, createStep()]);
  };

  const handleRemoveStep = (index) => {
    setSteps((current) => current.filter((_, idx) => idx !== index));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const trimmedSteps = steps
      .map((step) => ({
        title: step.title.trim(),
        details: step.details.trim() || null
      }))
      .filter((step) => step.title.length > 0);

    onSubmit({
      name: name.trim(),
      description: description.trim() || null,
      targetDate: targetDate ? new Date(targetDate).toISOString().split('T')[0] : null,
      steps: trimmedSteps
    });

    setName('');
    setDescription('');
    setTargetDate('');
    setSteps([createStep(), createStep()]);
  };

  const isSubmitDisabled = name.trim().length === 0;

  return (
    <form className="goal-form" onSubmit={handleSubmit}>
      <label>
        Goal name
        <input
          value={name}
          onChange={(event) => setName(event.target.value)}
          placeholder="Train for a half marathon"
          required
        />
      </label>

      <label>
        Description
        <textarea
          value={description}
          onChange={(event) => setDescription(event.target.value)}
          placeholder="Why is this important and what does success look like?"
          rows={3}
        />
      </label>

      <label>
        Target date
        <input
          type="date"
          value={targetDate}
          onChange={(event) => setTargetDate(event.target.value)}
        />
      </label>

      <div className="steps">
        <div className="steps-header">
          <div>
            <h4>Steps to achieve it</h4>
            <p>Break the goal into small, trackable actions.</p>
          </div>
          <button className="ghost" type="button" onClick={handleAddStep}>
            + Add step
          </button>
        </div>

        {steps.map((step, index) => (
          <div key={`step-${index}`} className="step-row">
            <input
              value={step.title}
              onChange={(event) => handleStepChange(index, 'title', event.target.value)}
              placeholder={`Step ${index + 1} title`}
            />
            <input
              value={step.details}
              onChange={(event) => handleStepChange(index, 'details', event.target.value)}
              placeholder="Details (optional)"
            />
            {steps.length > 1 ? (
              <button
                className="danger"
                type="button"
                onClick={() => handleRemoveStep(index)}
              >
                Remove
              </button>
            ) : null}
          </div>
        ))}
      </div>

      <button type="submit" disabled={isSubmitDisabled}>
        Save goal
      </button>
    </form>
  );
}
