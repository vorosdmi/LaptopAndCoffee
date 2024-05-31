const indexRouter = require("express").Router();

indexRouter.get("/", (req, res) => {
  res.redirect('/places');
});

module.exports = indexRouter;
