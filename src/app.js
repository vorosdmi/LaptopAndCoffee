require('dotenv').config();

const express = require('express');
const logger = require('morgan');
const path = require('path');
const indexRouter = require('./routes/index.router');
const userRouter = require('./routes/user.router');

const session = require('express-session');
const placesRouter = require('./routes/place.router');
const FileStore = require('session-file-store')(session);
 
const app = express();

const { PORT } = process.env;

const sessionConfig = {
  name: 'cookieName', // не забудь указать то же имя и при удалении куки
  store: new FileStore(),
  secret: process.env.SESSION_SECRET ?? 'Mellon', // SESSION_SECRET в .env
  resave: false, // если true, пересохранит сессию, даже если она не менялась
  saveUninitialized: false, // если false, куки появятся только при установке req.session
  cookie: {
    maxAge: 24 * 1000 * 60 * 60, // время жизни в ms, 24(h)*1000(ms)*60(sec)*60(min) = 86400000
    httpOnly: true, // секьюрность, оставляем true
  },
};

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(process.cwd(), 'public')));

app.use(session(sessionConfig));

app.use('/', indexRouter);
app.use('/user', userRouter);
app.use('/places', placesRouter);

app.listen(PORT, () => {
    console.log(`server started on http://localhost:${PORT}`);
  });
    

