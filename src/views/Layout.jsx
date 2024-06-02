const React = require('react');

function Layout({ children, login, isAdmin }) {
  return (
    <html lang='en'>
      <head>
        <meta charSet='UTF-8' />
        <meta httpEquiv='X-UA-Compatible' content='IE=edge' />
        <meta name='viewport' content='width=device-width, initial-scale=1.0' />
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css"></link>
        <title>Coffee & Laptop</title>
        <link rel="stylesheet" href="/css/application.css" />
      </head>
      <header>
        {login ? (
          <>
            <div className="header-left">
            <a href="/">
              <h1>Coffee & Laptop</h1>
            </a>
            {isAdmin ? (
              <p>
              <a href="/">{login}</a>
              <a href="/places/moderate">На модерации</a>
              <a href="/places/new">Добавить новое место</a>
              <a href="/user/logout">Выйти</a>
            </p>
            ) : (
              <p>
              <a href="/">{login}</a>
              <a href="/favorites">Любимые кофейни</a>
              <a href="/places/new">Предложить новое место</a>
              <a href="/user/logout">Выйти</a>
            </p>
              )}
            </div>
            {/* <div className="header-right">
              <div className="weather">Barcelona</div>
            </div> */}
          </>
        ) : (
          <>
            <div className="header-left">
            <a href="/">
              <h1>Coffee & Laptop</h1>
            </a>
            <p>
              <a href="/user/register">Registration</a>
              <a href="/user/login">Login</a>
            </p>
            </div>
            {/* <div className="header-right">
              <div className="weather">Barcelona</div>
            </div> */}
          </>
        )}
      </header>
      <body>{children}</body>
    </html>
  );
}

module.exports = Layout;
