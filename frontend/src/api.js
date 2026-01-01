const baseUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000';

const handleResponse = async (response) => {
  if (!response.ok) {
    const message = await response.text();
    throw new Error(message || 'Request failed');
  }
  return response.json();
};

export const fetchGoals = async () => {
  const response = await fetch(`${baseUrl}/api/goals`);
  return handleResponse(response);
};

export const createGoal = async (payload) => {
  const response = await fetch(`${baseUrl}/api/goals`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(payload)
  });

  return handleResponse(response);
};

export const updateStep = async (goalId, stepId, isCompleted) => {
  const response = await fetch(`${baseUrl}/api/goals/${goalId}/steps/${stepId}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ isCompleted })
  });

  return handleResponse(response);
};
