const React = require('react');
const Layout = require('../Layout');

module.exports = function Register() {
  return (
    <Layout>
      <h3>Registation</h3>
      <hr />
      <form className="registration"action="/user/registration" method="post">
        <input type="text" name="login" id="" required placeholder='name' />
        <input type="email" name="email" id="" required placeholder='e-mail' />
        <input type="password" name="password" id="" required placeholder='password' />
        <button type="submit">Register</button>
      </form>
      <h5 className='error'></h5>
      <script src="/js/reg.js"></script>
    </Layout>
  )
}