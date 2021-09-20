// ---------- Swiper ----------
// user page swiper
function createSwiper() {
  const userSwiper = new Swiper('.app', {
    grabCursor: true,
    threshold: 100,
    edgeSwipeThreshold: 20,
    effect: 'creative',
    creativeEffect: {
      prev: {
        shadow: true,
        translate: ['-20%', 0, -1],
      },
      next: {
        translate: ['100%', 0, 0],
      },
    },
  });

  //slider
  // horizontal swiper
  const horizontalSliderSwiper = new Swiper('.horizontal', {
    grabCursor: true,
    direction: 'horizontal',
    slidesPerView: 'auto',
    freeMode: true,
    mousewheel: true,
  });

  //vertical slider
  const verticalSliderSwiper = new Swiper('.vertical', {
    grabCursor: true,
    direction: 'vertical',
    slidesPerView: 'auto',
    freeMode: true,
    mousewheel: true,
  });
}
