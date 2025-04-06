document.querySelectorAll('.star-rating').forEach(starContainer => {
    const stars = starContainer.querySelectorAll('i');

    stars.forEach(star => {
      star.addEventListener('mouseenter', () => {
        const value = parseInt(star.getAttribute('data-value'));
        highlightStars(stars, value);
      });

      star.addEventListener('mouseleave', () => {
        const currentRating = parseInt(starContainer.getAttribute('data-rating'));
        highlightStars(stars, currentRating);
      });

      star.addEventListener('click', () => {
        const rating = parseInt(star.getAttribute('data-value'));
        starContainer.setAttribute('data-rating', rating);
      });
    });

    function highlightStars(stars, value) {
      stars.forEach(star => {
        const starValue = parseInt(star.getAttribute('data-value'));
        star.classList.toggle('fa-solid', starValue <= value);
        star.classList.toggle('fa-regular', starValue > value);
      });
    }
  });