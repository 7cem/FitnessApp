# FitnessApp

A modern fitness goal tracker with a React front end and a .NET minimal API backend.

## Project Structure

- `backend/FitnessApp.Api` - .NET 8 minimal API for storing goals and steps in memory.
- `frontend` - React + Vite client.

## Running the API

```bash
cd backend/FitnessApp.Api
# Requires .NET 8 SDK
DOTNET_URLS=http://localhost:5000 dotnet run
```

## Running the React app

```bash
cd frontend
npm install
npm run dev
```

The UI expects the API at `http://localhost:5000`. Override by setting `VITE_API_URL`.
