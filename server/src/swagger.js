const swaggerJsdoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Pets API",
      version: "1.0.0",
      description: "A simple API for managing pets",
    },
    servers: [
      {
        url: "http://localhost:4000", // Make sure the URL scheme is http
      },
    ],
  },
  apis: ["./src/routes/*.js", "./src/models/*.js"], // Files containing annotations as above
};

const specs = swaggerJsdoc(options);

module.exports = {
  swaggerUi,
  specs,
};
