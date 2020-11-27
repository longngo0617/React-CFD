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
const clickMenu = () => {
    const btnMenu = document.querySelector('.menu');
    const body = document.getElementsByTagName('body')[0];
    btnMenu.addEventListener('click', (e)=>{
        e.stopPropagation();
        body.classList.toggle('menu-is-show');
        if(body.classList.contains('menu-is-show'))
        {
            document.getElementsByTagName('main')[0].style.marginLeft = "250px";
        }
        else{
            document.getElementsByTagName('main')[0].style.marginLeft = "0";
        }   
    });
    body.addEventListener('click', ()=>{
        if(body.classList.contains('menu-is-show'))
        {
            body.classList.remove('menu-is-show');
        }
    });
}

clickMenu();
clickTab();



