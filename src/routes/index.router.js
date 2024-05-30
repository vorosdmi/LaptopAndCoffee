const renderTemplate = require("../utils/renderTemplate");
const Home = require("../views/pages/Home");
const indexRouter = require("express").Router();

indexRouter.get("/", (req, res) => {
  const { login, isAdmin } = req.session; //! из SESSION
  renderTemplate(Home, { login }, res);
});

module.exports = indexRouter;
