const React = require('react');

function Layout({ children, login }) {
  return (
    <html lang='en'>
      <head>
        <meta charSet='UTF-8' />
        <meta httpEquiv='X-UA-Compatible' content='IE=edge' />
        <meta name='viewport' content='width=device-width, initial-scale=1.0' />
        <title>Document</title>
        <link rel="stylesheet" href="/css/application.css" />
      </head>
      <header>
        {login ? (
          <header>
            <a href="/">
              <h1>Coffee & Laptop</h1>
            </a>
            <p>
              <a href="/">{ login }</a>
              <a href="/favotites">Favorites</a>
              <a href="/user/logout">Logout</a>
            </p>
        </header>
        ): (
          <header>
            <a href="/">
              <h1>Coffee & Laptop</h1>
            </a>
            <p>
              <a href="/user/register">Registration</a>
              <a href="/user/login">Login</a>
            </p>
        </header>
          )}
      </header>
      <body>{children}</body>
    </html>
  );
}

module.exports = Layout;
