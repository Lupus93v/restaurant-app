import {menuArray} from `/data.js`

const containerEl = document.getElementById(`container-el`)
const orderListEl = document.getElementById(`order-list-el`)
const name = document.getElementById(`name`)
const paymentForm = document.getElementById(`payment-form`)

let cart = []


function renderMenu(menu){
    return menu.map(function(product){
    const {
        image,
        name,
        ingredients,
        id,
        price,
        emoji,
        quantityInCart
    } = product
    
    return`
    <section>
    <img class="emoji" src="${image}"
    <div class="product-info" id="product-info">
    <h3> ${name} </h3>
    <h5> ${ingredients}</h5>
    <h3> $${price} </h3>
    </div>
    <button class="add-btn" data-add="${id}">+</button>
    </section>
  `
  }).join(``)
}


document.addEventListener(`click`, function(e){
    if(e.target.dataset.add){
    addToCart(e.target.dataset.add)
    }
    if(e.target.dataset.del){
        removeFromCart(e.target.dataset.del)
    }
    if(e.target.dataset.complete){
        document.getElementById(`div-payment-form`).style.display = `block`
    }
    if(e.target.dataset.close){
        document.getElementById(`div-payment-form`).style.display = `none`
    }
    if(e.target.dataset.pay){
        document.getElementById(`div-payment-form`).style.display = `none`
        orderListEl.innerHTML = ``
    }
})

    paymentForm.addEventListener(`submit`, function(e){
        e.preventDefault()
        renderConformation()
    })


function addToCart(productId){
    const numericProductId = parseInt(productId, 10)
        const pickedProduct = menuArray.filter(function(product){
            return product.id === numericProductId
        })[0]
        
        let isInCart = cart.filter(function(product){
            return product.name === pickedProduct.name
        })[0]
        
        if(isInCart){
           isInCart.quantityInCart++ 
        } else{
            cart.push({
            name: pickedProduct.name,
            price: pickedProduct.price,
            id: pickedProduct.id,
            quantityInCart: 1
                })
            }
        renderCart(cart)
    }

function renderCart(cart){
    let totalPrice = 0
    const discountPrice = 0
    let orderedProduct = cart.map(function(product){
        let QtyProductPrice = product.price * product.quantityInCart
        totalPrice += QtyProductPrice
        return `
    <div id="ordered-product">
        <div class="section1">
        <h3>${product.name}</h3>
        <p class="delete-btn" data-del="${product.id}">Remove</p>
        </div>
        <div class="section2">
        <p class="quant">Quantity: ${product.quantityInCart}</p>
        <h3>$${QtyProductPrice}</h3>
        </div>
        </div>
        `
    }).join(``)
    
    if(totalPrice === 0){
        orderListEl.innerHTML = ``
    } else {
    orderListEl.innerHTML =`
    <h3 style="margin: auto; padding-bottom: 40px;">Your order</h3>
    <div class="order-list-info">
    ${orderedProduct}
    </div>
    <div class="price-pos">
    <h3>Total price:</h3>
    <h3>$${totalPrice}</h3>
    </div>
    <button class="complete-order" id="complete-order" data-complete="complete">
    Complete order
    </button>
    `}
    
    if(cart.length > 0){
        document.getElementsByTagName(`footer`)[0].style.visibility = "hidden"
    }
    else {
       document.getElementsByTagName(`footer`)[0].style.visibility = "visible" 
    }
}

function removeFromCart(productId){
    const numericProductId = parseInt(productId, 10)
        const pickedProduct = menuArray.filter(function(product){
            return product.id === numericProductId
        })[0]
        
        let isInCart = cart.filter(function(product){
            return product.name === pickedProduct.name
        })[0]
        
        if(isInCart && isInCart.quantityInCart >= 1){
           isInCart.quantityInCart--
        } 
        if(isInCart.quantityInCart === 0){
            cart.splice(pickedProduct.id,1)
        } 
        if(isInCart.totalPrice === 0){
            orderListEl.innerHTML = ``
        }
    renderCart(cart)
    }
    
    function renderConformation(){
        document.getElementsByTagName(`footer`)[0].style.visibility = "visible"
        document.getElementsByTagName(`footer`)[0].innerHTML = `
        <div class="conformation-message" id="conformation-message">
        <p>Thanks, ${name.value}! Your order is on its way!
        </div>
        `
        paymentForm.style.display = `none`
        
        setTimeout(function(){
            window.location.reload()
        }, `5000`)
    }
    
containerEl.innerHTML = renderMenu(menuArray)