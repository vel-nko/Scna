'use strict';

import './sass/main.sass';
let script = require('scriptjs');
script('https://unpkg.com/swiper/js/swiper.min.js', function () {
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

  var galleryAbout = new Swiper('.gallery-about', {
    slideActiveClass: 'active',
    navigation: {
      nextEl: '.slider-about .btn.next',
      prevEl: '.slider-about .btn.prev',
      disabledClass: 'disabled'
    },
    pagination: {
      el: '.slider-about .slider-pagination',
      type: 'bullets',
      bulletClass: 'bullet',
      bulletActiveClass: 'active',
      clickable: true
    },
  });

});
//accordion
(function () {
  let accordion = $('.faq-accordion');
  let item = accordion.find('.accordion-item');
  let panel = item.find('.accordion-panel');
  panel.each(function (i, item) {
    if (i != 0) {
      $(item)
        .siblings()
        .slideUp(500)
    } else {
      $(item).addClass('active').parent().addClass('active')
    }
  })

  panel.on('click', function () {
    Accordion($(this), panel)
  });

  function Accordion(item, panel) {
    if (!item.hasClass('active')) {
      panel
        .removeClass('active')
        .siblings()
        .slideUp(500)
        .removeClass('active');
      panel
        .parent()
        .removeClass('active');
      item
        .addClass('active')
        .siblings()
        .slideDown(500)
        .addClass('active');
      item
        .parent()
        .addClass('active');

      // if (window.matchMedia("(min-width: 1280px)").matches) {
      //   function RowDrop();
      // }

    } else {
      item
        .removeClass('active')
        .siblings()
        .slideUp(500)
        .removeClass('active');
      item
        .parent()
        .removeClass('active');
      // if (window.matchMedia("(min-width: 1280px)").matches) {
      //   function RowUp();
      // }
    }
  }

})();
//navigation
(function(){
  $('.nav-link').on('click', function(e) {
    e.preventDefault();
    $(this).toggleClass('active');
    $(this).hasClass('active') ? MenuOpen() : MenuCLose()
  })
  function MenuOpen() {
    $('body').addClass('nav-active').css({
      'height' : '100vh',
      'overflow' : 'hidden'
    })
  }
  function MenuCLose() {
    $('body').removeClass('nav-active').css({
      'height' : 'auto',
      'overflow' : 'auto'
    })
  }
}());