require('dotenv').config();

const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const postRoutes = require('./routes/postRoutes');
const { setupSwagger } = require('./swagger');


const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());

//라우터 연결
app.use("/api/posts", postRoutes);

app.get("/", (req, res) => {
    res.send("Hello World");
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
