$('.header-slider').slick({
    infinite: true,
    fade: true,
    nextArrow: '<svg class="arrow-icons slider-right"><use xlink:href="#arrow-right"></use></svg>',
    prevArrow: '<svg class="arrow-icons slider-left"><use xlink:href="#arrow-left"></use></svg>',
    asNavFor: '.slider-dots'
})

$('.slider-dots').slick({
    slidesToShow: 4,
    slidesToScroll: 4,
    asNavFor: '.header-slider',
})

$('.slider-dots .slick-slide').on('click', function (event) {
    $('.header-slider').slick('slickGoTo', $(this).data('slickIndex'));
 });