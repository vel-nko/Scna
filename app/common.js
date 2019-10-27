'use strict';

import './sass/main.sass';
let script = require('scriptjs');
script('https://unpkg.com/swiper/js/swiper.min.js', function (){
  var galleryThumbs = new Swiper('.gallery-thumbs', {
    slideActiveClass: 'active',
    navigation: {
      nextEl: '.review-section .btn.next',
      prevEl: '.review-section .btn.prev',
      disabledClass: 'disabled'
    },
    thumbs: {
      swiper: galleryTop
    }
  });
  var galleryTop = new Swiper('.gallery-top', {
    spaceBetween: 10,
    freeMode: true,
    watchSlidesVisibility: true,
    watchSlidesProgress: true,
    navigation: {
      nextEl: '.review-section .btn.next',
      prevEl: '.review-section .btn.prev',
      disabledClass: 'disabled'
    },
  });

})