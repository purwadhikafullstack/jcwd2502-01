module.exports = {
    apps: [
        {
            name: "JCWD-2502-01", // Format JCWD-{batchcode}-{groupnumber}
            script: "./src/index.js",
            env: {
                NODE_ENV: "production",
                PORT: 2501,
                DB_PORT_index: "https://jcwd250201.purwadhikabootcamp.com/verify",
                DB_PORT_changePass: "https://jcwd250201.purwadhikabootcamp.com/reset_password",
                DB_USERNAME: "jcwd250201",
                DB_PASSWORD: "jcwd250201",
                DB_HOST: "adminer2.purwadhikabootcamp.com",
                DB_NAME: "jcwd250201",
                DB_DIALECT: "mysql",
                DB_TIMEZONE: "+07:00",
                access_secret: "abc123",
                verified_secret: "abc456",
                reset_secret: "abc789",

                // # RAJA ONGKIR
                RAJA_ONGKIR_API_KEY: "8e679a38abff6ad441f4727061d417a6",
                RAJA_ONGKIR_BASE_URL: "https://api.rajaongkir.com/starter",

                // # OPENCAGE
                OPENCAGE_API_KEY: "74a5d6e01d534b94a005a2a6c1453a72",
                OPENCAGE_BASE_URL: "https://api.opencagedata.com/geocode/v1/json?",
            },
            cwd: "/var/www/html/jcwd250201.purwadhikabootcamp.com/projects/server",
            time: true,
        },
    ],
}
