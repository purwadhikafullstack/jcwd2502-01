require("dotenv").config()

const { DB_USERNAME, DB_PASSWORD, DB_HOST, DB_NAME, DB_DIALECT, DB_TIMEZONE } = process.env

const config = {
    username: DB_USERNAME,
    password: DB_PASSWORD,
    database: DB_NAME,
    host: DB_HOST,
    dialect: DB_DIALECT,
    timezone: DB_TIMEZONE
};

module.exports = {
    development: config,
    test: config,
    production: config
};