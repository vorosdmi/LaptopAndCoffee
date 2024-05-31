const formNew = document.querySelector('.newPlace');

formNew.addEventListener('submit', async (e) => {
  e.preventDefault();
  const data = new FormData(formNew);
  const res = Object.fromEntries(data);
    try {
      const response = await fetch('/places/new', {
        method: 'POST',
        headers: {
          'Content-type': 'application/json',
        },
        body: JSON.stringify(res),
      });
      const result = await response.json();
      if (result.newError) {
        const errMsg = document.querySelector('.error');
        errMsg.innerText = result.newError;
      }
      if (result.newDone) {
        const infoMsg = document.querySelector('.info');
        infoMsg.innerText = result.newDone;
      }
      formNew.querySelectorAll('input').forEach((el) => el.value = '');
    } catch (error) {
      console.log(error);
      alert('Login error');
    }
});