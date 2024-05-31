const renderTemplate = require('../utils/renderTemplate');
const Register = require('../views/pages/Register');
const bcrypt = require('bcrypt');
const { User } = require('../../db/models');
const Login = require('../views/pages/Login');
const { secureRoute } = require('../middlewares/common')

const userRouter = require('express').Router();

userRouter.get('/register', secureRoute, (req, res) => {
  renderTemplate(Register, {}, res)
})

userRouter.post('/register', secureRoute, async (req, res) => {

  const { login, email, password } = req.body;
  const user = await User.findOne({ where: { email } });
  if (user) {
    res.json({
      regError: `* User with ${email} already exists!`
    })
  } else {
    const hash = await bcrypt.hash(password, 10);
    const newUser = await User.create({ login, email, password: hash, isAdmin: false });
    const newUserData = newUser.get({ plain: true })
    req.session.login = newUserData.login;
    req.session.isAdmin = newUserData.isAdmin;
    req.session.save(() => {
      res.json({ regDone: `Registration success ${email}` });
    });
  }
})

userRouter.get('/login', secureRoute, (req, res) => {
  renderTemplate(Login, {}, res)
})

userRouter.post('/login', secureRoute, async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ where: { email } });
  if (!user) {
      res.json({ goToRegistration: `*${email} doesnt exist, please register!`})
      // res.redirect('/user/registration');
  } else {
    const checkPass = await bcrypt.compare(password, user.password);
    console.log('>>>>>', checkPass);
    if (checkPass) {
      req.session.login = user.login;
      req.session.isAdmin = user.isAdmin;
      req.session.save(() => {
        res.json({ passDone: `Login is correct!`})
      });
    } else {
      res.json({ passErr: `* Password is incorrect`}) //* для fetch-a
    }
  }
})

userRouter.get('/logout', (req, res) => {
  req.session.destroy(() => {
    res.clearCookie('cookieName');
    res.redirect('/');
  });
})

module.exports = userRouter;