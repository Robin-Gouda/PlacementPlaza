import express from "express";
import "dotenv/config";
import cors from "cors";
import "./Models/Db.js";
import AuthRouter from "./Routes/AuthRouter.js";

const app = express();

const PORT = process.env.PORT || 3001;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());
app.use("/auth", AuthRouter);

app.get("/", (request, response) => {
  response.send("<h1>Phonebook</h1>");
});

app.listen(PORT, () => {
  console.log(`Server running on port http://localhost:${PORT}`);
});
