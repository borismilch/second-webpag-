search = document.querySelector('.header-search__search')
search.addEventListener('focus', ()=>{
    document.querySelector('.icon-search').classList.add('active');
   search.classList.add('active');
})
search.addEventListener('blur', ()=>{
    document.querySelector('.icon-search').classList.remove('active');
    search.classList.remove('active');
});

window.onload = function () {
    document.addEventListener('click', targetCatch)

    function targetCatch(event){
    const targetEl = event.target;
          if (targetEl.classList.contains('header-search__loop')){
         document.querySelector('.header-search').classList.toggle('_active');
         document.querySelector('.phone').classList.toggle('active')
         } else if(!targetEl.closest('.header-search') && document.querySelector('.header-search._active')){
          document.querySelector('.header-search').classList.remove('_active'); 
              }
         if(targetEl.classList.contains('header-icons__cart')){
          document.querySelector('.storage').classList.toggle('active');
         }else if(targetEl.className !== 'storage' && targetEl.className !== 'header-icons__cart'){
            document.querySelector('.storage').classList.remove('active')
          };

          if(targetEl.classList.contains('header-icons__avatar')){
            document.querySelector('.account').classList.toggle('active');
           }else if(targetEl.className !== 'account' && targetEl.className !== ('header-icons__avatar')){
              document.querySelector('.account').classList.remove('active')
            }
          if(targetEl.classList.contains('products-item-layer__btn')){
            console.log('ertgh');
            
            debugger;
            const productId = targetEl.closest('.products-item').dataset.id;
            console.log(productId);
            addToCart(targetEl, productId);
            event.preventDefault();
          }
         
          } };

     
         

       const bbb = document.querySelector('.products-content__btn');
       bbb.addEventListener('click', getProducts);


          async  function getProducts(){
            if(!bbb.classList.contains('_hold')){
              bbb.classList.add('_hold');
              const file = "js/products.json";
              let response = await fetch(file, {
                method: "GET"
              });
              if(response.ok){
                debugger;
                let result = await response.json();
                loadProducts(result);
                bbb.classList.remove('_hold');
                
          
              }
            }
          }    
          
          function loadProducts(data){
            const productItems = document.querySelector('.products__content');
            data.products.forEach((item)=>{
              const productId = item.id;
              const productUrl = item.url;
              const productTitle = item.title;
              const productLabels = item.labels;
              const productImage = item.image;
              const producPrice = item.price;
              const productPriceOld = item.priceOld;
              const productShare = item.shareUrl;
              const productLike = item.likeUrl;
              const productLabelColor = item.labelsColor;
              let template = `
              <div class="products-item" data-id="${productId}">
          
                          <div class="products-item__img">
                                  <img src="images/img/products/${productImage}" alt="">
                              </div>
                              <div class="products-item__text">
                                  <div class="products-item__title">${productTitle}</div>
                                  <div class="products-item__subtitle">Stylish cafe chair</div>
                                  <div class="products-item-cost">
                                      <div class="products-item-cost__now">Rp ${producPrice}</div>
                                      <div class="products-item-cost__before">Rp ${productPriceOld}
                                      </div>
                                  </div>
                                  <div class="products-item-layer__btn mobile-btn btn-w">
                                      <a href="">Add to cart</a>
                              </div>
                              </div>
                              <div class="products-item__sell" style="background-color:${productLabelColor}">
           <span>${productLabels}</span> </div>
                              <div class="products-item-layer">
                                  <div class="products-item-layer__content">
                                      <div class="products-item-layer__btn btn-w">
                                          <a href="${productUrl}">Add to cart</a>
                                      </div>
                                      <div class="products-item-layer__links">
                                          <nav class="icon-share aa1" href="${productShare}"><span>Share</span> </nav>
                                          <nav class="icon-favorite aa1" href="${productLike}><span>Like</span> </nav>
                                      </div>
                                  </div>
                              </div>
                          </div>`
               productItems.insertAdjacentHTML("beforeend", template);
            });
          }



function addToCart(productButton, productId){
  if(!productButton.classList.contains('_hold')){
    productButton.classList.add('_hold');
    productButton.classList.add('_fly');

    const cart = document.querySelector('.header-icons__cart');
    const product = document.querySelector(`[data-id ="${productId}"]`);
   
    const productImage =  product.querySelector('img');
    console.log(productImage);
    const productImageFly = productImage.cloneNode(true);
    
    const productImageFlyWidth = productImage.offsetWidth;
    const productImageFlyHeight = productImage.offsetHeight;
    const productImageFlyTop = productImage.getBoundingClientRect().top;
    const productImageFlyLeft = productImage.getBoundingClientRect().left;

    productImageFly.classList.add('_flyImage');
    console.log(productImageFly.className, product,productImageFly);
    productImageFly.style.cssText = 
    `
    left =  ${productImageFlyLeft}px;
    top = ${productImageFlyTop}px;
    height = ${productImageFlyHeight}px;
    width = ${productImageFlyWidth}px;
    `;
  
    product.append(productImageFly);

    const catrTop = cart.getBoundingClientRect().top;
    const cartLeft = cart.getBoundingClientRect().left;
   
 productImageFly.style.cssText = 
   `
   left = ${cartLeft}px;
   top = ${catrTop}px;
    width = 0px;
    height = 0px;
    opacity = 0
        `;
   
  }
}




  
window.addEventListener('scroll', scrollCatch)

function scrollCatch(){
  let hh = document.querySelector('header').offsetHeight -10;
 if (hh < window.pageYOffset){
  document.querySelector('header').classList.add('fixed')
 }
 if (hh > window.pageYOffset){
  document.querySelector('header').classList.remove('fixed')
 }
}


new Swiper('.main-sliders',{



  loop:true,
  speed:1700,
  slidesPerScroll:1,
  slidesPerView:1.35,
  pagination:{
    el:'.pagination1',
    clickable: true,
  },
  breakpoints:{
    320:{
      slidesPerView:1,
    },
    990:{
        slidesPerView:1.35,
     
    },
  },
  spaceBetween:30,
  pagination:{
      el:'.swiper-pagination',
      clickable:true,
  },

  navigation:{
      nextEl:'.right-arr',
      prevEl:'.left-arr, .main-s2hint__arrow'
  },

});
if(document.querySelector('.main-slider__wrapper')){
new Swiper('.rooms-slider', {
  observer: true,
  observeParents :true,

  loop:true,
  speed:1700,
  spaceBetween: 24,
  pagination:{
      el:'.pagination2',
      clickable:true,
  },

  watchOverFlow: true,
  loopAdditionalSlides: 5,
  preloadImages :false, 
  parallax:true,
  slidesPerScroll:1,
  slidesPerView: 'auto',
  centeredSlides: true,
  initialSlide:1,
  
  navigation:{
    nextEl:'.rooms-slider-window__arrow, .arr-right2',
    prevEl:'.arr-left2',

  },
  breakpoints:{
    320:{
      centeredSlides: true,
      slidesPerGroup : 1,
    },
    720:{
       
     
    },
  },
})}
new Swiper('.tips-slider', {
  loop:true,
  speed:900,
  spaceBetween: 19,
  pagination:{
      el:'.pagination3',
      clickable:true,
  },

  watchOverFlow: true,
  loopAdditionalSlides: 6,
  preloadImages :false, 
  parallax:true,
  slidesPerScroll:1,
  slidesPerView:3,
  breakpoints:{
    320:{
      slidesPerView:1,
     
    },

    550:{
      slidesPerGroup : 1,
      centeredSlides: true,
      slidesPerView : 1.5,
    },
    920:{
      centeredSlides: true,
      slidesPerGroup : 1,
      slidesPerView:3,
    },},
  navigation:{
    nextEl:'.right1-arr',
    prevEl:'.left1-arr',

  },
})

const hints = document.querySelectorAll('.hint2');
const hints2 = document.querySelectorAll('.main-s2hint');
document.querySelector('.main-arrows').addEventListener('click', dd)


function  dd(){
  
  hints.forEach((item) =>{
    
    let closest = item.closest('.main-slide');
    
   
    if(closest.classList.contains('swiper-slide-active')){
      item.classList.add('active');
    }
    else if(closest.className !== 'swiper-slide-active'){
      item.classList.remove('active')
    }
  })}
dd();
const hh = document.querySelectorAll('.rooms-slider__hint');
console.log(hh)
document.querySelectorAll('.rooms-arrow').forEach((item)=>{
  item.addEventListener('click', b12);
});



function b12(){
  hh.forEach((item)=>{
    let closest = item.closest('.rooms-slider__slide');
    // console.log(closest, item);
    // console.log(item);
   
    if(closest.classList.contains('swiper-slide-duplicate-active')){
      console.log('1');
      item.classList.add('active');
    }
    else if(closest.className !== 'swiper-slide-duplicate-active'){
      console.log('0')
      item.classList.remove('active')
    }
  })
} ;
b12();
const furniture = document.querySelector('.furniture');
const imgg = document.querySelectorAll('.furniture-gallery img');
console.log(imgg);
imgg.forEach((item) =>{
  let closest = item.closest('.furniture-gallery__item');
  let itemSrc = item.getAttribute('src');

  closest.addEventListener('click', ()=>{
     galleryMaker(itemSrc)})
})

function galleryMaker(src){
  console.log(src);
  let template = `
  <div class="popupische">
  <div class="popupische__item"><img src="${src}" alt=""></div>
 </div>
  `
  furniture.insertAdjacentHTML("beforebegin", template);
}

paapa = document.querySelector('.popupische')
paapa.addEventListener('click', ()=>{
  if(document.querySelector('.popupische')){
    console.log('fdx');
    document.removeChild(paapa);
  }
})