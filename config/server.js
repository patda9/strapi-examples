module.exports = ({ env }) => ({
  admin: {
    auth: {
      secret: env("ADMIN_JWT_SECRET", process.env.ADMIN_JWT_SECRET)
    },
    watchIgnoreFiles: ["**/data/**"]
  },
  cron: { enabled: true },
  host: env("HOST", process.env.HOST),
  port: env.int("PORT", process.env.PORT)
});
