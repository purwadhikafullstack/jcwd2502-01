module.exports = {
  apps: [
    {
      name: "JCWD-2502-01", // Format JCWD-{batchcode}-{groupnumber}
      script: "./projects/server/src/index.js",
      env: {
        NODE_ENV: "production",
        PORT: 2501,
      },
      time: true,
    },
  ],
};
