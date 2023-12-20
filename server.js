const express = require("express");
const path = require("path");

const app = express();

app.use(
    "/css",
    express.static(path.join(__dirname, "node_modules/bootstrap/dist/css"))
)

app.use(
    "/font",
    express.static(path.join(__dirname, "node_modules/bootstrap-icons/font"))
)

app.use(
    "/js",
    express.static(path.join(__dirname, "node_modules/bootstrap/dist/js"))
)

app.use("/static", express.static(path.resolve(__dirname, "frontend", "static")));

app.get("/*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "frontend", "index.html"));
});

app.listen(process.env.PORT || 8090, () => console.log("Server running..."));