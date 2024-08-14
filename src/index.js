// IMPORTS
import express from "express";

const app = express();

// SENTRY INIT

// Sentry.init({
//   dsn: process.env.SENTRY_DSN,
//   integrations: [nodeProfilingIntegration()],
//   // Performance Monitoring
//   tracesSampleRate: 1.0, //  Capture 100% of the transactions

//   // Set sampling rate for profiling - this is relative to tracesSampleRate
//   profilesSampleRate: 1.0,
// });

// app.use(express.json());

// LOGGER

// ROUTES

// SENTRY ERROR HANDLER?

// ERROR HANDLER

app.get("/", (req, res) => {
  res.send("Hello world!");
});

app.listen(3000, () => {
  console.log("Server is listening on port 3000");
});
