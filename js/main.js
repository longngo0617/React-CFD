const imgWrap = document.querySelector(".slider");
if (imgWrap != null) {
  var imgSlide = new Flickity(imgWrap, {
    cellAlign: "left",
    freeScroll: true,
    contain: true,
    prevNextButtons: false,
    lazyLoad: 1,
    pageDots: false,
  });
}
const clickTab = () => {
  const tabs = document.querySelectorAll(".tab__title a");
  let newsList = document.querySelectorAll(".tab__content > *");
  tabs.forEach((e, i) => {
    e.addEventListener("click", function (k) {
      k.preventDefault();
      document
        .querySelector(".js-tab-active")
        .classList.remove("js-tab-active");
      e.classList.add("js-tab-active");

      //style tab
      let content = newsList[i];
      let c = document.querySelector(".tabct.active");
      c.classList.remove("active");
      c.style.display = "none";
      content.classList.add("active");
      content.style.display = "block";
    });
  });
};
const clickMenu = () => {
  const btnMenu = document.querySelector(".menu");
  const body = document.getElementsByTagName("body")[0];
  btnMenu.addEventListener("click", (e) => {
    e.stopPropagation();
    body.classList.toggle("menu-is-show");
    if (body.classList.contains("menu-is-show")) {
      document.getElementsByTagName("main")[0].style.marginLeft = "250px";
      body.style.overflow = "hidden";
    } else {
      document.getElementsByTagName("main")[0].style.marginLeft = "0";
      body.removeAttribute("style");
    }
  });
  body.addEventListener("click", () => {
    if (body.classList.contains("menu-is-show")) {
      document.getElementsByTagName("main")[0].style.marginLeft = "250px";
    } else {
      document.getElementsByTagName("main")[0].style.marginLeft = "0";
    }
  });
};
const imgComment = document.querySelector('.images');
if( imgComment !=null)
{
  var imgSlide = new Flickity(imgComment, {
    cellAlign: "left",
    draggable: false,
    prevNextButtons: false,
    freeScroll: true,
    wrapAround: true,
    lazyLoad: 1,
    on: {
      ready: function() {
          let dotted = document.querySelector('.flickity-page-dots'),
              paging = document.querySelector('.comment .list-dots');
              paging.appendChild(dotted);
      }
    }
  });
  let crIndex =0;
  const btnNext = document.querySelector('.comment .button__right');
  const btnPrev = document.querySelector('.comment .button__left');
  const lstText = document.querySelectorAll('.text .text-item');
  const textMove = (i) => {
    let textCr = lstText[crIndex];
    let nextText = lstText[i];

    textCr.classList.remove('js-comment-active');
    nextText.classList.add('js-comment-active');

    crIndex = i;
  };
  btnNext.addEventListener('click',function(){
    imgSlide.next();
    if(crIndex <lstText.length-1)
    {
      textMove(crIndex+1);
    }
    else{
      textMove(0);
    }
  })
  btnPrev.addEventListener('click',function(){
    imgSlide.previous();
    if(crIndex >0)
    {
      textMove(crIndex-1);
    }
    else{
      textMove(lstText.length-1);
    }
  })
}
clickMenu();
clickTab();

// https://www.cfdtraining.vn/api/danh-sach-khoa-hoc
// https://www.cfdtraining.vn/api/contact: POST - name, phone, email, title, content
// https://www.cfdtraining.vn/api/cap-nhat-thong-tin-ca-nhan: POST - name, phone, email, facebook
// https://www.cfdtraining.vn/api/dang-ky-khoa-hoc : POST - name, phone, email, facebook
// https://www.cfdtraining.vn/api/dang-nhap : POST - username, password
// https://www.cfdtraining.vn/api/hoc-vien-khoa-hoc: GET

function api(url) {
  return {
    get: function () {
      return fetch(url).then((res) => res.json());
    },
    post: function (params) {
      return fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        ...params,
      }).then((res) => res.json());
    },
  };
}

async function dangnhap() {
  let username = "ngothanhlong";
  let password = "123123";

  let res = await api("https://www.cfdtraining.vn/api/dang-nhap").post({
    body: JSON.stringify({
      username,
      password,
    }),
  });
}

async function render() {
  let res = await api(
    "https://www.cfdtraining.vn/api/danh-sach-khoa-hoc"
  ).get();
  let htmlOnline ='';
  let htmlOffline ='';
  for (let i in res) {
      let thubnail = JSON.parse(res[i].thubnail);
      let card = `
      <div class="col-md-4 course__item">
        <div class="course__item-img">
          <img src="https://www.cfdtraining.vn/${thubnail.link}" alt="alter">
        </div>
        <div class="course__item-info">
          <div class="course__item-wrap">
            <h2 class="course__item-title">
              ${res[i].title}
            </h2>
            <p class="course__item-des">
              ${res[i].short_description}
            </p>
          </div>
          <div class="course__item-details">
            <div class="teacher">
              <div class="avatar">
                <img src="img/avt.png" alt="">
              </div>
              <div class="name">
                  ${res[i].cfd_teacher[0].title}
              </div>
            </div>
            <a href="#" class="btn btn-register">Đăng ký</a>
          </div>
        </div>
      </div>`;
      if(res[i].course_type == "offline")  
      {
        htmlOffline+= card;
      }
      else {
        htmlOnline+= card;
      }

  }
  document.querySelector(
    ".section.online .row"
  ).innerHTML = htmlOnline;
  document.querySelector('.section.offline .row').innerHTML = htmlOffline;
}
async function contact() {
    let name="long"
    let phone="0774156258"
    let email ="ngobi0617@gmail.com"
    let title = "asldaskdas"
    let content = "asdjaksjdklawioudoajsdasd"

    let res = await api("https://www.cfdtraining.vn/api/contact")
    .post({
        body: JSON.stringify({
            name,
            phone,
            email,
            title,
            content
          }),
    });
}

function update(name,phone,email,facebook){
    fetch("https://www.cfdtraining.vn/api/cap-nhat-thong-tin-ca-nhan",{
        method:"POST",
        headers:{
            'Content-Type':'application/json'
        },
        body: JSON.stringify({
            name : name,
            phone :phone,
            email : email,
            facebook : facebook
        })
    })
    .then(res => res.json())
}
function dangky(){
    let name="long"
    let phone="0774156258"
    let email ="ngobi0617@gmail.com"
    let facebook = "asdasdasdasd"

    fetch("https://www.cfdtraining.vn/api/dang-ky-khoa-hoc",{
        method:"POST",
        headers:{
            'Content-Type' : 'application/json'
        },
        body: JSON.stringify({
            name,
            phone,
            email,
            facebook
        })
    })
    .then(res => res.json())
}
function getInfo(){
    fetch("https://www.cfdtraining.vn/api/hoc-vien-khoa-hoc",{
        method:"GET"
    })
    .then(res=>res.json())
    .then(res=>console.log(res));
}
function validateEmail(email) {
  const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
}

function validate (name,phone,email,facebook,error) {
  let message = [];
  if(name==="" ||name ==null)
  {
    message.push("Ten khong duoc bo trong ");
  }
  if(phone.value <=0 || phone.value >=11)
  {
    message.push("So dien thoai khong dung dinh dang");
  }
  if(validateEmail(email) == null)
  {
    message.push("Email khong dung dinh dang");
  }
  if(facebook.value === '' || facebook ==null)
  {
    message.push("Link fb khong duoc bo trong ");
  }
  if(message.length > 0)
  {
    error.innerHTML = message.join(','); 
    return false;
  }
  return true;
}
const btnSmUpdate = document.querySelector('.tab__content-1 .btn-save');
if(btnSmUpdate != null) {
  btnSmUpdate.addEventListener('click',function(e){
    e.preventDefault();
    let name= document.getElementById('txtName').value;
    let phone=document.getElementById('txtPhone').value;
    let email =document.getElementById('txtEmail').value;
    let facebook = document.getElementById('txtFacebook').value;
    let error = document.getElementById('error');
    if(validate(name,phone,email,facebook,error))
    {
      update(name,phone,email,facebook);
    }
    else {
      alert('Khong thanh cong');
    }
})
}

const btnLogin =document.querySelector('.user .btn-signin');
if(btnLogin !=null)
{
  btnLogin.addEventListener('click',function(e){
    e.preventDefault();
    document.querySelector('.popup-signin').removeAttribute("style");
  })
  if(document.querySelector('.popup-signin .close')!=null)
  {
    document.querySelector('.popup-signin .close').addEventListener('click',function(){
      document.querySelector('.popup-signin').style.display ="none";
    })
  }
}


// dangnhap();
// render();
// contact();
// dangky();
// getInfo();
