const React = require('react');
const Layout = require('../Layout');

module.exports = function Login() {
  return (
    <Layout>
      <h3>Login, please</h3>
      <hr />
      <form className="login" action="/user/login" method="post">
        <input type="email" name="email" id="" required placeholder='e-mail' />
        <input type="password" name="password" id="password" required placeholder='password' />
        <button type="submit">Login</button>
      </form>
      <h5 className='error'></h5>
      <script src="/js/login.js"></script>
    </Layout>
  )
}