const React = require('react');
const Layout = require('../Layout');

module.exports = function Home({ login, isAdmin, places }) {
  console.log(places);
  return (
    <Layout login={login} isAdmin={isAdmin}>
      {isAdmin ? (
        <div className="description">
          <p>Welcome, admin!</p>
        </div>
      ) : (
        <div className="description">
          <p>Ваш гид в мире уютных кафе для работы с ноутбуком!</p>
          <div className='selection'>
            <form action="/city" method="post">
              <input type="text" name="city" id="" placeholder='input your city' />
              <button type="submit">Search</button>
            </form>
          </div>
        </div>
      )
      }
      {places ? (
        <div className="place-container">
          {places.map((place) => (
            <article id={place.id} key={place.id}>
              {(!isAdmin && login && login !== 'undefined') && (
                <>
                  <form className="inline">
                    <button type="submit" name="submit_param" value="submit_value" className="fa fa-sort-up vote-button upvote-button" />
                  </form>
                </>
              )}
              <h2 className='name'>{place.name}</h2>
              <p>
                <span className="points">{place.votes}</span>
                <span className="city">{place.city}</span>
                <span className="freeWiFi">{place.freeWiFi ? 'Free WiFi' : 'No Free WiFi'}</span>
                <span className="coffeePrice">{place.coffeePrice}</span>
                {isAdmin && (
                  <>
                    <a className="delete" href={`/places/${place.id}/delete`}></a>
                    <a className="edit" href={`/places/${place.id}/edit`}></a>
                    <form className="editPlace" style={{ display: "none" }}>
                      <label htmlFor="freeWiFi">
                        <input type="checkbox" name="freeWiFi" id="freeWiFi" value={place.freeWiFi} />
                        Free WiFi
                      </label>
                      <input type="text" name="name" id="" required placeholder='name' value={place.name} />
                      <input type="text" name="city" id="" placeholder='city' value={place.city} />
                      <input type="number" name="coffeePrice" id="" placeholder='coffeePrice' value={place.coffeePrice} />
                      <button type="submit" className="editBtn">save</button>
                    </form>
                    <h5 className='error'></h5>
                    <h5 className='info'></h5>
                    {!place.show && (
                      <a className="approve" href={`/places/${place.id}/approve`}></a>
                    )}
                  </>
                )}
              </p>
            </article>
          ))}
        </div>
      ) : null
      }
      <script src="/js/change.js"></script>
    </Layout>
  )
}