"use strict";

const configV = require("dotenv").config();

/**
 * An asynchronous bootstrap function that runs before
 * your application gets started.
 *
 * This gives you an opportunity to set up your data model,
 * run jobs, or perform some special logic.
 *
 * See more details here: https://strapi.io/documentation/developer-docs/latest/setup-deployment-guides/configurations.html#bootstrap
 */

async function runServerBoostrap() {
  if (configV.error) {
    strapi.log.error(`Cannot start the server because of the following error(s): ${configV.error}`);
    throw configV.error;
  }

  const config = configV.parsed;
  strapi.log.info(
    `Server is starting on ${config.host}:${config.port} with configurations\n ${JSON.stringify(
      { ...strapi.config.server, admin: undefined },
      null,
      4
    )}`
  );

  const strapiAdminsQ = strapi.query("user", "admin");

  if ((await strapiAdminsQ.count()) === 0) {
    try {
      const username = config.ROOT_ADMIN_DEFAULT_USERNAME;
      const password = await strapi.admin.services.auth.hashPassword(config.ROOT_ADMIN_DEFAULT_PASSWORD);

      const defaultAdminUser = {
        username: username || "admin",
        password: password || "admin",
        email: config.ROOT_ADMIN_DEFAULT_EMAIL || "admin@test.test",
        roles: [],
        blocked: false,
        isActive: true
      };
      const roleV = await strapi.query("role", "admin").findOne({ code: "strapi-super-admin" });
      if (!roleV) {
        const role = await strapi.query("role", "admin").create({
          name: "Super Admin",
          code: "strapi-super-admin",
          description: "Super Admins can access and manage all features and settings."
        });

        await strapi.query("user", "admin").create({ ...defaultAdminUser, roles: [role.id] });
      } else {
        await strapi.query("user", "admin").create({ ...defaultAdminUser, roles: [roleV.id] });
      }

      strapi.log.info("Admin account was successfully created.");
      strapi.log.info(`Email: ${config.ROOT_ADMIN_DEFAULT_EMAIL}`);
    } catch (error) {
      strapi.log.error(`Couldn't create Admin account during bootstrap: `, error);
    }
  }
}

module.exports = async () => {
  await runServerBoostrap();
};
