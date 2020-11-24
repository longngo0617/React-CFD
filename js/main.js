const imgWrap = document.querySelector('.slider');
var imgSlide = new Flickity(imgWrap, {
    cellAlign: 'left',
    freeScroll:true,
    contain: true,
    prevNextButtons: false,
    lazyLoad:1,
    pageDots: false
});