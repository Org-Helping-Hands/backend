import express from "express";
import cors from "cors";
import userRoutes from "./routes/userRoutes";
import postRoutes from "./routes/postRoutes";
import "./typeorm";

var app = express();
app.use(express.json());
app.use(cors());
app.get("/", (_, res) => {
  res.send("<h4>Wrong</h4>");
});

app.use("/user", userRoutes);
app.use("/post", postRoutes);
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
