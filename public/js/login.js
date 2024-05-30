const formLogin = document.querySelector('.login');

formLogin.addEventListener('submit', async (e) => {
  e.preventDefault();
  const data = new FormData(formLogin);
  const res = Object.fromEntries(data);
    try {
      const response = await fetch('/user/login', {
        method: 'POST',
        headers: {
          'Content-type': 'application/json',
        },
        body: JSON.stringify(res),
      });
      const result = await response.json();
      if (result.passErr) {
        const errMsg = document.querySelector('.error');
        errMsg.innerText = result.passErr;
        errMsg.style.color = 'red';
        document.querySelector('#password').value = '';
      }
      if (result.passDone) {
        setTimeout(() => {
          window.location.href = '/';
        }, 250);
      }
      if (result.goToRegistration) {
        const errMsg = document.querySelector('.error');
        errMsg.innerText = result.goToRegistration;
        errMsg.style.color = 'red';
        document.querySelector('#password').value = '';
      }
    } catch (error) {
      console.log(error);
      alert('Login error');
    }
});