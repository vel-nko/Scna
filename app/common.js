'use strict';

import './sass/main.sass';
let script = require('scriptjs');
script('https://unpkg.com/swiper/js/swiper.min.js', function (){
  let mySwiper = new Swiper ('.review-gallery', {
    slideActiveClass: 'active',
    navigation: {
      prevEl: '.slider-btn.prev',
      nextEl: '.slider-btn.next',
    },
  });

})