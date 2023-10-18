require("dotenv/config");
const db = require("./models");
const express = require("express");
const cors = require("cors");
const bearerToken = require("express-bearer-token");
const { join } = require("path");

const PORT = process.env.PORT || 8000;
const app = express();

app.use(
	cors({
		origin: [
			process.env.WHITELISTED_DOMAIN &&
				process.env.WHITELISTED_DOMAIN.split(","),
		],
	})
);

app.use(express.json());
app.use(bearerToken());
app.use(express.static("public"));

//#region API ROUTES
const { productsRouter, usersRouter } = require("./routers");
// ===========================
// NOTE : Add your routes here
app.use("/api/products", productsRouter);
app.use("/api/users", usersRouter);

app.get("/api", (req, res) => {
	res.send(`Hello, this is my API`);
});

app.get("/api/greetings", (req, res, next) => {
	res.status(200).json({
		message: "Hello, Student !",
	});
});

// ===========================

// not found
app.use((req, res, next) => {
	if (req.path.includes("/api/")) {
		res.status(404).send("Not found !");
	} else {
		next();
	}
});

// error
// app.use((err, req, res, next) => {
// 	if (req.path.includes("/api/")) {
// 		console.error("Error : ", err.stack);
// 		res.status(500).send("Error !");
// 	} else {
// 		next();
// 	}
// });

app.use((err, req, res, next) => {
	const statusCode = err.status || 500;
	const statusMessage = err.message || "Error!";

	return res.status(statusCode).send({
		isError: true,
		message: statusMessage,
		data: null,
	});
});
//#endregion

//#region CLIENT
const clientPath = "../../client/build";
app.use(express.static(join(__dirname, clientPath)));

// Serve the HTML page
app.get("*", (req, res) => {
	res.sendFile(join(__dirname, clientPath, "index.html"));
});

//#endregion

app.listen(PORT, (err) => {
	if (err) {
		console.log(`ERROR: ${err}`);
	} else {
		// db.sequelize.sync({
		// 	alter: true,
		// });
		console.log(`APP RUNNING at ${PORT} ✅`);
	}
});
