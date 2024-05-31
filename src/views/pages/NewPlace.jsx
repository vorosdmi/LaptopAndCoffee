const React = require('react');
const Layout = require('../Layout');

module.exports = function NewPlace({ login, isAdmin }) {
  return (
    <Layout login={login} isAdmin={isAdmin}>
      {isAdmin ? (
        <div>
        <h3>Adding the new place</h3>
        <hr />
        <form className="newPlace" action="/places/new" method="post">
          <input type="hidden" name="show" value="true" />
          <label htmlFor="freeWiFi">
            <input type="checkbox" name="freeWiFi" id="freeWiFi" value="true"/>
            Free WiFi
          </label>
          <input type="text" name="name" id="" required placeholder='name' />
          <input type="text" name="address" id="" placeholder='address' />
          <input type="text" name="city" id="" placeholder='city' />
          <input type="number" name="coffeePrice" id="" placeholder='coffeePrice'/>
          <button type="submit">Add</button>
        </form>
      </div>
      ) : ( 
        <div> 
        <h3>Please, describe the new place</h3>
        <hr />
        <form className="newPlace noShow" action="/places/new" method="post">
          <input type="hidden" name="show" value="false" />
          <label htmlFor="freeWiFi">
            <input type="checkbox" name="freeWiFi" id="freeWiFi" value="true"/>
            Free WiFi
          </label>
          <input type="text" name="name" id="" required placeholder='name' />
          <input type="text" name="address" id="" placeholder='address' />
          <input type="text" name="city" id="" placeholder='city' />
          <input type="number" name="coffeePrice" id="" placeholder='coffeePrice'/>
          <button type="submit">Suggest</button>
        </form>
        </div>
      )}
      <h5 className='error'></h5>
      <h5 className='info'></h5>
      <script src="/js/newPlace.js"></script>
    </Layout>
  )
}