const imgWrap = document.querySelector('.slider');
if(imgWrap !=null)
{
    var imgSlide = new Flickity(imgWrap, {
        cellAlign: 'left',
        freeScroll:true,
        contain: true,
        prevNextButtons: false,
        lazyLoad:1,
        pageDots: false
    });
}
const  clickTab = () => {
    const tabs = document.querySelectorAll('.tab__title a');
    let newsList = document.querySelectorAll('.tab__content > *');
    tabs.forEach( (e, i)=> {
        e.addEventListener('click', function(k) {
            k.preventDefault(); 
            document.querySelector('.js-tab-active').classList.remove('js-tab-active');
            e.classList.add('js-tab-active');

            //style tab
            let content = newsList[i];
            let c =document.querySelector('.tabct.active');
            c.classList.remove('active');
            c.style.display = "none"
            content.classList.add('active');
            content.style.display ="block";
        });
    });
};
clickTab();


