const express = require("express");
const mongoose = require("mongoose");
const authRouter = require("./routes/auth");
const postRouter = require("./routes/post");
const cors = require("cors");
const connectDB = async function () {
  try {
    await mongoose.connect("mongodb://localhost:27017/mern-learnit", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
      useCreateIndex: true,
    });
    console.log("connect successfully!!");
  } catch (error) {
    console.log("connect fail!!");
  }
};
connectDB();
const app = express();
app.use(express.json());
app.use(cors());

app.use("/api/auth", authRouter);
app.use("/api/posts", postRouter);
const port = 5000;
app.listen(port, () => console.log(`server started on port ${port}`));
