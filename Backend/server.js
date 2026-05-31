require('dotenv').config();
const express = require('express');
const apiRoutes = require('./routes/api.routes');
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 5000;

app.use(
  cors({
    origin: "https://loan-application-aa354ehbo-rushikesh1694-5423s.vercel.app",
    methods: ["GET", "POST", "PATCH"],
    credentials: true,
  })
);


app.use(express.json());


app.use('/api', apiRoutes);

app.use((err, req, res, next) => {
  if (err instanceof SyntaxError && err.status === 400 && 'body' in err) {
    return res.status(400).json({ error: "Malformed JSON Payload detected." });
  }
  next();
});

app.listen(PORT, () => {
  console.log(`server engine processing data on port ${PORT}`);
});