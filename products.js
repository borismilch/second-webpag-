async  function getProducts(button){
  if(!buttton.classList.contains('_hold')){
    button.classList.add('_hold');
    const file = "json/products.json";
    let response = await fetch(file, {
      method: "GET"
    });
    if(response.ok){
      let result = await response.json();
      loadProducts(result);
      button.classList.remove('_hold');
      button.remove();

    }else{
      alert('fuck you');
    }
  }
}    

function loadProducts(data){
  const productItems = document.querySelector('.products__content');
  data.products.forEach((item)=>{
    const productId = item.id;
    const productUrl = item.url;
    const productTitle = item.title;
    const productLabels = item.lebels;
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