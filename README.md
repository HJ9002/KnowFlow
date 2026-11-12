# KnowFlow – AI-Powered FAQ Chatbot

KnowFlow is a beginner-friendly FAQ chatbot built for the internship project. It uses OpenAI when configured and a local keyword matcher otherwise. React provides the messaging UI, Express provides the REST API, and MongoDB stores feedback and unanswered questions.

## Project structure

- `client/src/components`: reusable chat UI components.
- `client/src/services`: frontend API functions.
- `server/src/services/faqService.js`: predefined FAQs and matching logic.
- `server/src/services/aiService.js`: optional OpenAI integration with a safe local fallback.
- `server/src/services/storageService.js`: MongoDB persistence with a clearly labelled temporary memory fallback.
- `server/src/controllers`: API request handling.
- `server/src/models`: MongoDB schemas for feedback and unanswered questions.
- `server/src/routes`: chat and review endpoints.
- `server/src/config`: database connection setup.

## Dependencies

The client uses React, React DOM, Vite, and Axios. The server uses Express, Mongoose, CORS, dotenv, express-validator, and Nodemon. The root uses concurrently to run both applications.

## Setup

1. Install Node.js and MongoDB, then start MongoDB locally.
2. Run `npm install` in the root, `server`, and `client` folders (or run `npm run install:all` after installing the root dependency).
3. Copy `server/.env.example` to `server/.env` and set `MONGODB_URI`. For a local MongoDB installation, the example value can be used as-is.
4. Run `npm run dev` from the root.
5. Open `http://localhost:5173`.

The backend runs at `http://localhost:5000`. `POST /api/chat/ask` answers questions, `POST /api/chat/feedback` stores ratings, and `GET /api/admin/unanswered` reviews unanswered questions. The frontend includes a basic review panel for that endpoint.

## Environment variables

- `PORT`: backend port, default `5000`.
- `MONGODB_URI`: MongoDB connection string.
- `CLIENT_URL`: allowed frontend origin.
- `OPENAI_API_KEY`: optional OpenAI key. Never place this in the client.
- `OPENAI_MODEL`: optional model name, default `gpt-4o-mini`.

If MongoDB is not configured or unavailable, the server remains usable with temporary in-memory storage and displays a warning. That fallback is lost when the process stops; MongoDB is required for persistent internship-demo data.

## FAQ logic

When `OPENAI_API_KEY` is configured, the backend asks OpenAI to answer only from the small FAQ context. If the key is absent, the request fails, or the model returns `NO_MATCH`, the local matcher normalizes text and compares it with predefined FAQ phrases. Unknown questions are stored and the user receives a clear fallback response. Responses include their source internally so the application never presents a local answer as OpenAI-generated.
