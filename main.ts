import express from "express";
import cors from "cors";
import userRoutes from "./src/routes/userRoutes";
import postRoutes from "./src/routes/postRoutes";
import "./src/typeorm";

var app = express();
app.use(express.json());
app.use(cors());
app.get("/", (_, res) => {
  res.send("<h4>Wrong</h4>");
});

app.use("/user", userRoutes);
app.use("/post", postRoutes);
app.listen(process.env.PORT || 3001, () => {
  console.log("Server running");
});
