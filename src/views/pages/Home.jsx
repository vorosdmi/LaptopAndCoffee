const React = require('react');
const Layout = require('../Layout');

module.exports = function Home({ login }) {
  return(
    <Layout login={login}>
      {login?.isAdmin ? (
      <div className="description">
        <p>Welcome, admin!</p>
      </div>
      ) : (
      <div className="description">
        <p>Ваш гид в мире уютных кафе для работы с ноутбуком!</p>
      </div>  
      )
      }
      <div className='selection'>
        <form action="/city" method="post">
          <input type="text" name="city" id="" placeholder='input your city'/>
          <button type="submit">Search</button>
        </form>
      </div>
    </Layout>
  )
}