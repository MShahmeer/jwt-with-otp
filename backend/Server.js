import express from "express";
import cors from "cors";
import morgan from "morgan";

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

/**Start the server */
app.listen(port, () => {
  console.log(`Server connected to the http://localhost:${port}`);
});
