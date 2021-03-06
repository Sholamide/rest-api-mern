const express = require("express");
const mongoose = require("mongoose");
const { MONGO_URI } = require("./config");

//Routes
const postsRoutes = require("./routes/api/posts");

const app = express();

//Body Parser
app.use(express.json());

mongoose
  .connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  })
  .then(() => console.log("MongoDB connected!!!"))
  .catch((err) => console.log(err));

//User routes
app.use("/api/posts", postsRoutes);
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`My app is listening on port: ${PORT}`));
