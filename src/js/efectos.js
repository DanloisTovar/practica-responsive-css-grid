// efecto menu hamburguesa para que se muestre:

document.querySelector('.menu-btn').addEventListener('click', () => {
  document.querySelector('.nav-menu ').classList.toggle('show');
});

/*Scroll reveal*/
ScrollReveal().reveal('.showcase');
ScrollReveal().reveal('.showcase', { delay: 900 });
ScrollReveal().reveal('.news-cards', { delay: 900 });
ScrollReveal().reveal('.news-cards', { delay: 900 });
ScrollReveal().reveal('.cards-banner-one', { delay: 900 });
ScrollReveal().reveal('.cards-banner-two', { delay: 900 });
ScrollReveal().reveal('.social', { delay: 900 });
