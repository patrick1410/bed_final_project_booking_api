// IMPORTS
import * as Sentry from "@sentry/node";
import express from "express";
import "dotenv/config";
import { log } from "./middleware/logMiddleware.js";
import usersRoute from "./routes/usersRoute.js";
import bookingsRoute from "./routes/bookingsRoute.js";
import hostsRoute from "./routes/hostsRoute.js";
import propertiesRoute from "./routes/propertiesRoute.js";
import reviewsRoute from "./routes/reviewsRoute.js";
import amenitiesRoute from "./routes/amenitiesRoute.js";

const app = express();

// SENTRY INIT
Sentry.init({
  dsn: process.env.SENTRY_DSN,

  integrations: [
    new Sentry.Integrations.Http({ tracing: true }),
    new Sentry.Integrations.Express({ app }),

    // Automatically instrument Node.js libraries and frameworks
    // ...Sentry.autoDiscoverNodePerformanceMonitoringIntegrations(),
  ],

  // Tracing
  tracesSampleRate: 1.0, //  Capture 100% of the transactions
});

app.use(Sentry.Handlers.requestHandler());
app.use(Sentry.Handlers.tracingHandler());

app.use(express.json());

// LOGGER
app.use(log);

// ROUTES
app.use("/users", usersRoute);
app.use("/bookings", bookingsRoute);
app.use("/hosts", hostsRoute);
app.use("/properties", propertiesRoute);
app.use("/reviews", reviewsRoute);
app.use("/amenities", amenitiesRoute);

// SENTRY ERROR HANDLER
app.use(Sentry.Handlers.errorHandler());

// ERROR HANDLER

app.get("/", (req, res) => {
  res.send("Hello world!");
});

app.listen(3000, () => {
  console.log("Server is listening on port 3000");
});
