require("dotenv").config();

const TENANT_SUBDOMAIN = "pinpointscoreus";
const TENANT_ID = process.env.TENANT_ID ?? "";

const config = {
  localApiPath: "/api",
  port: 3001,
  proxy: `https://${TENANT_SUBDOMAIN}.ciamlogin.com/${TENANT_ID}`,
};

module.exports = config;
