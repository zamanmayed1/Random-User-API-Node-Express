const express = require("express");
const fs = require("fs");
const userRouter = require("./routes/users.route");

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());

// GET a random user

app.use("/api/users", userRouter);




app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
