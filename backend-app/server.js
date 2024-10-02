require('dotenv').config();
require('./Configs/db.config.js');
require('./Configs/globals');
const cors= require("cors");
const express = require('express'); 
const bodyParser = require('body-parser');
const http = require('http');

const app = express();
const port = process.env.PORT || 9999;

app.use(cors("*"))
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

// RESPONSE HANDLER
app.use((req, res, next) => {
    const ResponseHandler = require('./Configs/responseHandler')
    res.handler = new ResponseHandler(req, res);
    next()
})

// ROUTES
const appRoutes = require('./Routes')
appRoutes(app)


const server = http.createServer(app);
server.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
});
