import express from "express";
import cors from "cors";
import routes from "./routes";

//Setting up express
const app = express();

app.use(express.json());
app.use(cors());
app.use("/api", routes);

const corsOptions = {
    origin: "*",
    optionsSuccessStatus: 200,
};

export default app;
