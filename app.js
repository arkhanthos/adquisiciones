const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();

/**
 * Import Routes
 */
const authRoute = require("./routes/authRoutes");
const userRoute = require("./routes/usersRoutes");
const taxRoute = require("./routes/taxRoutes");
const deliveryOrderRoute = require("./routes/deliveryOrderRoutes");
const addressRoute = require("./routes/addressRoutes");
const permissonRoute = require("./routes/permissonRoute");
const traceRoute = require("./routes/traceRoutes");
const providerRoute = require("./routes/providerRoute");
const costCenterRoute = require("./routes/costCenterRoutes");
const requestRoute = require("./routes/requestRoute");

/**
 * Configure Body Parser
 */
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

/**
 * Configure Headers HTTP - CORS
 */
app.use(cors());

/**
 * Configure Statics Folders
 */
app.use(express.static("uploads"));

/**
 * Configure Routes
 */
app.use(`/api/${process.env.API_VER}`, authRoute);
app.use(`/api/${process.env.API_VER}`, userRoute);
app.use(`/api/${process.env.API_VER}`, taxRoute);
app.use(`/api/${process.env.API_VER}`, deliveryOrderRoute);
app.use(`/api/${process.env.API_VER}`, addressRoute);
app.use(`/api/${process.env.API_VER}`, permissonRoute);
app.use(`/api/${process.env.API_VER}`, traceRoute);
app.use(`/api/${process.env.API_VER}`, providerRoute);
app.use(`/api/${process.env.API_VER}`, costCenterRoute);
app.use(`/api/${process.env.API_VER}`, requestRoute);

app.use('/routes/costCenterRoutes', (req, res) => {
    res.json(['Hola'])
});
/**
 * Configure Errors Middleware 
 */
app.use((error, req, res, next) => {
    res.status(500).json({
        status: 'Error',
        message: error.message,
    });
});

module.exports = app;