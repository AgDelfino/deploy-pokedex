const { Router } = require("express");
const { getTypes } = require("../utils/utils");

const TypesRouter = Router();

TypesRouter.get("/", async (req, res) => {
  const types = await getTypes();
  res.send(types);
});

module.exports = TypesRouter;
