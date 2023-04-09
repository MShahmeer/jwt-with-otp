import express from "express";
import cors from "cors";
import morgan from "morgan";

import connect from "./database/connection.js";
import router from "./router/route.js";

const app = express();

/**Middlewares */
app.use(express.json());
app.use(cors());
app.use(morgan("tiny"));
app.disable("x-powerd-by"); //less hackers know about your project

const port = 8080;

/**HTTP get request */
app.get("/", (req, res) => {
  res.status(201).json("Home Get Request");
});

/** api routes */
app.use("/api", router);

/**Start the server only when we have the valid connection */

connect()
  .then(() => {
    try {
      app.listen(port, () => {
        console.log(`Server connected to the http://localhost:${port}`);
      });
    } catch (error) {
      console.log("Can't connect to the server");
    }
  })
  .catch(() => {
    console.log("Invalid Database connection ....");
  });
