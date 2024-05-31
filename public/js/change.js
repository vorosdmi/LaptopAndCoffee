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
          method: 'PUT',
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