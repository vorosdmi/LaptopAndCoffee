const form = document.querySelector('.registration');

form.addEventListener('submit', async (e) => {
  e.preventDefault();
  const data = new FormData(form);
  const res = Object.fromEntries(data);
    try {
      const response = await fetch('/user/register', {
        method: 'POST',
        headers: {
          'Content-type': 'application/json',
        },
        body: JSON.stringify(res),
      });
      const result = await response.json();
      if (result.regDone) {
        setTimeout(() => {
          window.location.href = '/';
        }, 250);
      }
      if (result.regError) {
        const errMsg = document.querySelector('.error');
        errMsg.innerText = result.regError;
        errMsg.style.color = 'red';
      }
    } catch (error) {
      console.log(error);
      alert('Reg error');
    }
});
