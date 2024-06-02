const renderTemplate = require('../utils/renderTemplate');
const placesRouter = require("express").Router();
const Home = require("../views/pages/Home");
const NewPlace = require('../views/pages/NewPlace');
const { Place } = require('../../db/models');

placesRouter.get("/", async(req, res) => {
  try {
    const { login, isAdmin } = req.session;
    // if (isAdmin) {

    // }
    // const show = isAdmin === undefined || !isAdmin;
    // console.log('####', show);
    const placesData = await Place.findAll({
      where: {
        show: true
      },
      order: [['id', 'DESC']]
    });
    const places = placesData.map((el) => el.get({ plain: true }));
    renderTemplate(Home, { login, isAdmin, places }, res);   
  } catch (error) {
    console.error(error);
    res.redirect('/');  
  }
  // const { login, isAdmin } = req.session;
  // renderTemplate(Home, { login, isAdmin }, res);
});

placesRouter.get('/new', async(req, res) => {
  try {
    const { login, isAdmin } = req.session;
    renderTemplate(NewPlace, {login, isAdmin}, res); 
  } catch (error) {
    console.error(error);
    res.redirect('/');
  }
})

placesRouter.post('/new', async (req, res) => {
  const { name, address, city, coffeePrice, show } = req.body;
  const freeWiFi = req.body.freeWiFi === 'true';
  const { isAdmin } = req.session;
  try {
    await Place.create({ freeWiFi, name, address, city, coffeePrice, show });
    if (isAdmin) {
      res.json({ newDone: `Success! Your places added` })  
    } else {
    res.json({ newDone: `Success! Your places will be moderated!` }); 
    } 
  } catch (error) {
    console.log(error);
    res.json({
      newError: `Error! Something went wrong :(`
    })    
  }
})

placesRouter.get("/moderate", async (req, res) => {
  try {
    // const placesData = await Place.findAll({ order: [['id', 'DESC']] });
    const placesData = await Place.findAll({
      where: {
        show: false
      },
      order: [['id', 'DESC']]
    });
    const places = placesData.map((el) => el.get({ plain: true }));

    const { login, isAdmin } = req.session;
    renderTemplate(Home, { login, isAdmin, places }, res);   
  } catch (error) {
    console.error(error);
    res.redirect('/');  
  }
  const { login, isAdmin } = req.session;
  renderTemplate(Home, { login, isAdmin }, res);
});

placesRouter.delete('/:id', async (req, res) => {
  try {
    await Place.destroy({ where: { id: +req.params.id } });
    res.json({ 
      status: `success` 
    }); 
  } catch (error) {
    console.log(error);
    res.json({ 
      status: `error` 
    });
  }
});

placesRouter.patch('/:id', async (req, res) => {
  try {
    const curPlace = await Place.findOne({ where: { id: +req.params.id } });
    if (curPlace) {
      curPlace.show = true;
      await curPlace.save();
    } 
    res.json({ 
      status: `success` 
    });  
  } catch (error) {
    console.log(error);
    res.json({ 
      status: `error` 
    });   
  }
})

placesRouter.put('/:id', async (req, res) => {
  const { name, city, coffeePrice } = req.body;
  const freeWiFi = req.body.freeWiFi === 'true';
  try {
    const curPlace = await Place.findOne({ where: { id: +req.params.id } });
    console.log('curPlace', curPlace.name);
    if (curPlace) {
      curPlace.name = name;
      curPlace.city = city;
      curPlace.coffeePrice = coffeePrice;
      curPlace.freeWiFi = freeWiFi;
      await curPlace.save();
    } 
    res.json({ 
      status: `success`,
      editedPlace: curPlace 
    });  
  } catch (error) {
    console.log(error);
    res.json({ 
      status: `error` 
    });   
  }
})

placesRouter.post('/:id/vote', async (req, res) => {
  const findPost = await Place.findOne({ where: { id: req.params.id } });
  await findPost.increment('votes', { by: 1 });
  const postData = findPost.get({ plain: true });
  res.json({
    post: postData,
  });
});

module.exports = placesRouter;