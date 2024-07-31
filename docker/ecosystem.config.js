module.exports = {
  apps: [
    {
      name: "Ammoniakmonitor Frontend Nuxt",
      exec_mode: "cluster",
      instances: "max", // Or a number of instances
      script: "./.output/server/index.mjs",
      env: {
        NITRO_PORT: "3000",
        baseUrl: process.env.BASE_URL || "http://localhost:3000",
      },
      args: "start",
    },
  ],
};
