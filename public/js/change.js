const div = document.querySelector('.place-container');

div.addEventListener('click', async (event) => {
    // DELETE
    if (event.target.classList.contains('delete')) {
      event.preventDefault();
      const article = event.target.closest('article');
      const { id } = article;
      try {
        await fetch(`/places/${id}`, {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
          },
        });
        article.remove();
      } catch (error) {
        console.error(error);
        alert('Не удалось удалить запись!');
      }
    }
    //PATCH
    if (event.target.classList.contains('approve')) {
      event.preventDefault();
      const article = event.target.closest('article');
      const { id } = article;
      try {
        await fetch(`/places/${id}`, {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
          },
        });
        article.remove();
      } catch (error) {
        console.error(error);
        alert('Не удалось изменить запись!');
      }
    }

    // SHOW / HIDE edit form
    if (event.target.classList.contains('edit')) {
      event.preventDefault();
      const article = event.target.closest('article');
      const editForm = article.querySelector('.editPlace'); 
      if (editForm.style.display === 'none') {
        editForm.style.display = 'block'
      } else {
        editForm.style.display = 'none'
      }  
    }

    // PUT
    if (event.target.classList.contains('editBtn')) {
      event.preventDefault();
      const editForm = event.target.closest('.editPlace');
      const article = event.target.closest('article');
      const { id } = article;
      const data = new FormData(editForm);
      const res = Object.fromEntries(data);
      try {
        const response = await fetch(`/places/${id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(res),
        });
        const result = await response.json();
        console.log('result', result);
        if (result.status === 'success') {

          const editedPlace = result.editedPlace;

          const nameForm = article.querySelector('.name');
          const cityForm = article.querySelector('.city');
          const freeWiFiForm = article.querySelector('.freeWiFi');
          const coffeePrice = article.querySelector('.coffeePrice');

          nameForm.innerText = editedPlace.name; 
          cityForm.innerText = editedPlace.city;
          freeWiFiForm.innerText = (editedPlace.freeWiFi ? 'Free WiFi' : 'No Free WiFi');
          coffeePrice.innerText = editedPlace.coffeePrice;

          const infoMsg = article.querySelector('.info');
          infoMsg.innerText = 'The place was edited successfully!';
          setTimeout(() => {
            infoMsg.innerText = '';
          }, 1000)
          editForm.style.display = 'none';
        }
        if (result.status === 'error') {
          const errMsg = article.querySelector('.error');
          errMsg.innerText = 'Something went wrong...';
        }
      } catch (error) {
        console.error(error);
        alert('Не удалось изменить запись!');
      }
    }

    // VOTE
    if (event.target.closest('form.inline') && event.target.type === 'submit') {
      event.preventDefault();
      if (event.target.classList.contains('btn-clicked')) {
        return;
      }
      const article = event.target.closest('article');
      const { id } = article;
      const data = await fetch(`/places/${id}/vote`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      event.target.classList.add('btn-clicked');
      const { post } = await data.json();
      const points = article.querySelector('.points');
      points.innerText = post.votes;
    }
});