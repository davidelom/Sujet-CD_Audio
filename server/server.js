require("dotenv").config();
const express = require("express");
const cors = require("cors");
const cdRoutes = require("./routes/cdRoutes");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api", cdRoutes);

const PORT = process.env.PORT || 5005;

if (process.env.NODE_ENV !== "test") {
    app.listen(PORT, () =>
        console.log(`Serveur démarré sur http://localhost:${PORT}`)
    );
}
module.exports = app;
