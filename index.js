const express = require("express");
const PORT = process.env.PORT || 3000;
const server = express();
const path = require("path");
const nunjucks = require("nunjucks");
const templatesDir = path.join(__dirname, "templates");

server.use(express.urlencoded());
server.use(express.json());

nunjucks.configure(templatesDir, {
    express: server
});

server.locals.messages = [];
server.locals.logs = [];

server.use("/", require("./router.js"));

server.listen(PORT, () => {
    console.log(`server on ${PORT || 3000}`);
});
