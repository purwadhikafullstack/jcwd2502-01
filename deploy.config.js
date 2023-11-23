module.exports = {
    apps: [
        {
            name: "JCWD-2502-01", // Format JCWD-{batchcode}-{groupnumber}
            script: "./projects/server/src/index.js",
            env: {
                NODE_ENV: "production",
                PORT: 2501,
                DB_PORT_index: "https://jcwd250201.purwadhikabootcamp.com/verify",
                DB_PORT_changePass: "https://jcwd250201.purwadhikabootcamp.com/reset_password",
            },
            time: true,
        },
    ],
}
