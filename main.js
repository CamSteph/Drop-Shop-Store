// ADD TO CART FUNCTIONALITY - CLASS
class addToCart{
    constructor(current_cart, cart_table, table_total, total_wrap){
        this.current_cart = current_cart;
        this.cart_table = cart_table;
        this.table_total = table_total;
        this.total_wrap = total_wrap;
        this.table_quantity_select;
        this.pushed_products = [];
        this.checkout_btn = document.querySelector('[data-checkout-btn]');
        this.checked_out = false;
        this.temp_value = 0;
        this.product_history = [];
        this.total_quantity = 0;
        this.remove_button;
        this.product_quantity_array = {
            product_one : 0,
            product_two : 0,
            product_three : 0,
            product_four : 0,
            product_five : 0,
            product_six : 0,
        };
    }

    handle_add_to_cart(btn){
        let product = btn.parentElement.children[1].innerText;
        let price = parseFloat(btn.parentElement.children[2].innerText.split('$')[1]);
        let quantity = parseInt(btn.parentElement.children[3].value);
        let size = btn.parentElement.children[4].value;
        if(quantity == 0){
            alert('Please select a quantity above 0.');
            return;
        }
        this.populate_table(product, price, quantity, size);
        // checkout event listener
        this.checkout_btn.addEventListener('click', () => {
            alert('Total is ' + this.table_total.innerText + '. \nSelect \'OK\' to confirm transaction.');
            location.reload();
        })
    }

    populate_table(product, price, quantity, size){

        // if new product
        if(!this.pushed_products.includes(product)){

            console.log(product);
            switch(product){
                case 'LV Jordan 1\'s - Mens':
                    this.product_quantity_array.product_one += quantity;
                    break;
                case 'Women\'s Skinny Jeans':
                    this.product_quantity_array.product_two += quantity;
                    break;
                case 'Women\'s \'21 Fall Sweater':
                    this.product_quantity_array.product_three += quantity;
                    break;
                case 'Fitness Band':
                    this.product_quantity_array.product_four += quantity;
                    break;
                case 'Pink & White Striped Hat':
                    this.product_quantity_array.product_five += quantity;
                    break;
                case 'Sun Glasses':
                    this.product_quantity_array.product_six += quantity;
                    break;
            }

            // make elements visible
            this.cart_table.style.visibility = 'visible';
            this.total_wrap.style.visibility = 'visible';
            this.table_total.parentElement.style.visibility = 'visible';

            // append added products to table
            this.cart_table.innerHTML += `
            <tr>
                <td>${product}</td>
                <td>${quantity}</td>
                <td>${price} x ${quantity}</td>
                <td>
                    <select name="quantity" data-table-quantity class="quantity-select">
                        <option value="0">Quantity</option>
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                        <option value="5">5</option>
                        <option value="6">6</option>
                        <option value="7">7</option>
                        <option value="8">8</option>
                        <option value="9">9</option>
                        <option value="10">10</option>
                    </select>
                </td>
                <td><button class="remove-item" data-remove-product><ion-icon name="trash-outline"></ion-icon></button></td>
            </tr>
            `;

            // push to product history
            this.product_history.push({product: product, quantity: quantity, price: price});

            // push product name, update cart total, update table total
            this.pushed_products.push((product));
            // this.pushed_products.push({product: product, quantity: quantity, price: price});
            this.update_cart(quantity);
            this.update_table_total(quantity, price);

            // gather select buttons and add event listeners to them
            this.table_quantity_select = document.querySelectorAll('[data-table-quantity]');

            this.table_quantity_select.forEach(select => {
                select.addEventListener('click', ()=>{
                    this.add_listener_to_select22(product, price, quantity);
                });
            });

            // gather remove buttons and add event listerns to them
            this.remove_button = document.querySelectorAll('[data-remove-product]');
            this.remove_button.forEach(btn => {
                btn.addEventListener('click', () => {
                    let product_name = btn.parentElement.previousElementSibling.previousElementSibling.previousElementSibling.previousElementSibling.innerText;
                    console.log(product_name);
                    let quantity_amt = parseInt(btn.parentElement.previousElementSibling.previousElementSibling.innerText.split(' ')[2]);
                    console.log(quantity_amt);
                    let product_price = parseFloat(btn.parentElement.previousElementSibling.previousElementSibling.innerText.split(' ')[0]);
                    console.log(product_price);
                    this.remove_btn_function(btn, product_name, product_price, quantity_amt);
                });
            });
        }
        else{
            
            switch(product){
                case 'LV Jordan 1\'s - Mens':
                
                    this.product_quantity_array.product_one += quantity;
                    break;

                case 'Women\'s Skinny Jeans':
                
                    this.product_quantity_array.product_two += quantity;
                    break;

                case 'Women\'s \'21 Fall Sweater':
                    
                    this.product_quantity_array.product_three += quantity;
                    break;

                case 'Fitness Band':
                
                    this.product_quantity_array.product_four += quantity;
                    break;

                case 'Pink & White Striped Hat':
                
                    this.product_quantity_array.product_five += quantity;
                    break;

                case 'Sun Glasses':
                    
                    this.product_quantity_array.product_six += quantity;
                    console.log(this.product_quantity_array);
                    break;
                
            }

            // update already existing table
            let index = this.pushed_products.indexOf(product);

            if(index != -1){

                let previous_quantity = parseInt(this.cart_table.children[index + 1].childNodes[0].cells[1].innerText);
                // udpate quantity column of table
                let current = parseInt(this.cart_table.children[index + 1].childNodes[0].cells[1].innerText);
                current += quantity;

                this.cart_table.children[index + 1].childNodes[0].cells[1].innerHTML = `
                ${current}
                `;


                // update price column of table
                let prev_quantity = parseInt(this.cart_table.children[index + 1].childNodes[0].cells[2].innerText.split(' ')[2]);
                let new_quantity = prev_quantity + quantity;
                
                this.cart_table.children[index + 1].childNodes[0].cells[2].innerText = `
                ${price} x ${new_quantity}
                `;

                // display updates
                this.update_cart(quantity);
                this.update_table_total(quantity, price);

                // push to product history
                this.product_history.push({product: product, quantity: quantity, price: price});

                // add event listener to select
                this.add_listener_to_select22(product, price, previous_quantity);

            }
        }
    }

    remove_btn_function(btn, product, price, quantity){
        console.log(this.cart_table);
        let index = this.pushed_products.indexOf(product);
        this.cart_table.deleteRow(index + 1);
        this.pushed_products.splice(index, 1);

        // update cart number
        this.total_quantity = this.total_quantity - quantity;
        if(this.total_quantity < 0) this.total_quantity = 0;
        this.current_cart.innerText = this.total_quantity;
        
        // update total number
        let total = parseFloat(this.table_total.innerText.split('$')[1]);
        let subtraction = parseFloat(price) * parseFloat(quantity);
        total = total - subtraction;
        if(total < 0) total = 0.00;
        this.table_total.innerText = '$' + total.toFixed(2);
    }

    add_listener_to_select22(product, price, previous_quantity){

        this.table_quantity_select = document.querySelectorAll('[data-table-quantity]');

        this.table_quantity_select.forEach(select =>{
            select.addEventListener('click', () => {
                let value = parseInt(select.value);
                if(value !== 0 && value != this.temp_value){
                    this.temp_value = value;
                    price = parseFloat(select.parentElement.previousElementSibling.innerText.split(' ')[0]);
                    select.parentElement.previousElementSibling.previousElementSibling.innerText = value;
                    select.parentElement.previousElementSibling.innerText = `
                    ${price} x ${value}
                    `;
    
                    let product_name = select.parentElement.previousElementSibling.previousElementSibling.previousElementSibling.innerText;
                
                    this.update_table_total(value, price, true, product_name);
                    this.update_cart(value, true, product_name);
                }
            });
        });
    }

    update_table_total(quantity, price, select_update = false, product_name){
        if(!select_update){
            let total = quantity * price;
            total = parseFloat(total.toFixed(2));
            let temp = parseFloat(this.table_total.innerText.split('$')[1]);
            let res = temp + total;
            this.table_total.innerText = `$${res.toFixed(2)}`;
        }
        else{

            let current_total, new_product_amount;
            switch(product_name){
                case 'LV Jordan 1\'s - Mens':
                    current_total = parseFloat(this.table_total.innerText.split('$')[1]);
                    new_product_amount = quantity.toFixed(2) * price.toFixed(2);
                    new_product_amount = parseFloat(new_product_amount.toFixed(2));
                    current_total -= this.product_quantity_array.product_one * price;
                    current_total += new_product_amount;
                    this.table_total.innerText = '$' + current_total.toFixed(2);
                    break;
                case 'Women\'s Skinny Jeans':
                    current_total = parseFloat(this.table_total.innerText.split('$')[1]);
                    new_product_amount = quantity.toFixed(2) * price.toFixed(2);
                    new_product_amount = parseFloat(new_product_amount.toFixed(2));
                    current_total -= this.product_quantity_array.product_two * price;
                    current_total += new_product_amount;
                    this.table_total.innerText = '$' + current_total.toFixed(2);
                    break;
                case 'Women\'s \'21 Fall Sweater':
                    current_total = parseFloat(this.table_total.innerText.split('$')[1]);
                    new_product_amount = quantity.toFixed(2) * price.toFixed(2);
                    new_product_amount = parseFloat(new_product_amount.toFixed(2));
                    current_total -= this.product_quantity_array.product_three * price;
                    current_total += new_product_amount;
                    this.table_total.innerText = '$' + current_total.toFixed(2);
                    break;
                case 'Fitness Band':
                    current_total = parseFloat(this.table_total.innerText.split('$')[1]);
                    new_product_amount = quantity.toFixed(2) * price.toFixed(2);
                    new_product_amount = parseFloat(new_product_amount.toFixed(2));
                    current_total -= this.product_quantity_array.product_four * price;
                    current_total += new_product_amount;
                    this.table_total.innerText = '$' + current_total.toFixed(2);
                    break;
                case 'Pink & White Striped Hat':
                    current_total = parseFloat(this.table_total.innerText.split('$')[1]);
                    new_product_amount = quantity.toFixed(2) * price.toFixed(2);
                    new_product_amount = parseFloat(new_product_amount.toFixed(2));
                    current_total -= this.product_quantity_array.product_five * price;
                    current_total += new_product_amount;
                    this.table_total.innerText = '$' + current_total.toFixed(2);
                    break;
                case 'Sun Glasses':
                    current_total = parseFloat(this.table_total.innerText.split('$')[1]);
                    new_product_amount = quantity.toFixed(2) * price.toFixed(2);
                    new_product_amount = parseFloat(new_product_amount.toFixed(2));
                    current_total -= this.product_quantity_array.product_six * price;
                    current_total += new_product_amount;
                    this.table_total.innerText = '$' + current_total.toFixed(2);
                    break;
            }
        }
    }

    update_cart(quantity, select_update = false, product_name){
        let current = parseInt(this.current_cart.innerText);
        this.total_quantity = parseInt(this.current_cart.innerText);
        if(!select_update){
            if(current < 8){
                current += quantity;
                this.total_quantity += quantity;
                if(current >= 9){
                    current = 9; 
                    this.current_cart.innerText = current + '+'; 
                }else{
                    this.current_cart.innerText = current;
                }
            }else{
                current = 9;
                this.total_quantity += quantity;
                this.current_cart.innerText = current + '+';
                return;
            }
        }
        else{

            let current_cart_val;
            let new_quantity;
            switch(product_name){
                case 'LV Jordan 1\'s - Mens':
                    current_cart_val = parseInt(this.current_cart.innerText);
                    new_quantity = quantity;
                    current_cart_val -= this.product_quantity_array.product_one;
                    current_cart_val += new_quantity;
                    this.product_quantity_array.product_one = new_quantity;
                    this.current_cart.innerText = current_cart_val;
                    break;
                case 'Women\'s Skinny Jeans':
                    current_cart_val = parseInt(this.current_cart.innerText);
                    new_quantity = quantity;
                    current_cart_val -= this.product_quantity_array.product_two;
                    current_cart_val += new_quantity;
                    this.product_quantity_array.product_two = new_quantity;
                    this.current_cart.innerText = current_cart_val;
                    break;
                case 'Women\'s \'21 Fall Sweater':
                    current_cart_val = parseInt(this.current_cart.innerText);
                    new_quantity = quantity;
                    current_cart_val -= this.product_quantity_array.product_three;
                    current_cart_val += new_quantity;
                    this.product_quantity_array.product_three = new_quantity;
                    this.current_cart.innerText = current_cart_val;
                    break;
                case 'Fitness Band':
                    current_cart_val = parseInt(this.current_cart.innerText);
                    new_quantity = quantity;
                    current_cart_val -= this.product_quantity_array.product_four;
                    current_cart_val += new_quantity;
                    this.product_quantity_array.product_four = new_quantity;
                    this.current_cart.innerText = current_cart_val;
                    break;
                case 'Pink & White Striped Hat':
                    current_cart_val = parseInt(this.current_cart.innerText);
                    new_quantity = quantity;
                    current_cart_val -= this.product_quantity_array.product_five;
                    current_cart_val += new_quantity;
                    this.product_quantity_array.product_five = new_quantity;
                    this.current_cart.innerText = current_cart_val;
                    break;
                case 'Sun Glasses':
                    current_cart_val = parseInt(this.current_cart.innerText);
                    new_quantity = quantity;
                    current_cart_val -= this.product_quantity_array.product_six;
                    current_cart_val += new_quantity;
                    this.product_quantity_array.product_six = new_quantity;
                    this.current_cart.innerText = current_cart_val;
                    break;
            }
        }
    }
}

const current_cart = document.querySelector('[data-current-cart]');
const cart_table = document.querySelector('[data-cart-table]');
const table_total = document.querySelector('[data-table-total]');
const total_wrap = document.querySelector('[data-total-wrap]');
const add_to_cart_obj = new addToCart(current_cart, cart_table, table_total, total_wrap);
const add_to_cart_btns = document.querySelectorAll('[data-add-to-cart]');

add_to_cart_btns.forEach(btn => {
    btn.addEventListener('click', () => {
        add_to_cart_obj.handle_add_to_cart(btn);
        document.body.scrollIntoView({behavior: 'smooth', block: 'end'});
    });
});

current_cart.addEventListener('click', () => {
    document.body.scrollIntoView({behavior: 'smooth', block: 'end'});
});


// HEADER SCROLL FUNCTIONALITY

const container_section = document.querySelector('[data-container]');
const header_section = document.querySelector('[data-header]');

const scroll_function = () => {
    if(document.body.scrollTop > 50 || document.documentElement.scrollTop > 50){
        header_section.style.height = '15vh';
        header_section.style.background = 'rgba(255, 255, 255, 0.75)'
    }else{
        header_section.style.height = '18vh';
    }
}

window.onscroll = scroll_function;

container_section.addEventListener('scroll', scroll_function);



// GALLERY FUNCTIONALITY

const carousel_section = document.querySelector('[data-carousel]');
const left_btn = document.querySelector('[data-left-btn]');
const right_btn = document.querySelector('[data-right-btn]');
let count = 1;
let first_click = true;
let right_clicked = false;
let left_clicked = false;

const arr_of_images = [
    'lady-pink.jpg',
    'jeans.jpg',
    'lady-yellow.jpg',
    'sweater.jpg',
];

const handle_left_click = () => {
    left_clicked = true;
    if(first_click){
        count = 3;
        carousel_section.style.backgroundImage = `url('https://camsteph.github.io/Drop-Shop-Store/img/${arr_of_images[count]}')`;
        first_click = false;
        // count -= 1;
    }else{
        if(right_clicked){
            count -= 2;
            if(count < 0) count += 2;
            carousel_section.style.backgroundImage = `url('https://camsteph.github.io/Drop-Shop-Store/img/${arr_of_images[count]}')`;
            right_clicked = false;
        }else{
            count -= 1;
            if(count < 0) count = 3;
            carousel_section.style.backgroundImage = `url('https://camsteph.github.io/Drop-Shop-Store/img/${arr_of_images[count]}')`;
        }
    }
    
};

const handle_right_click = () => {
    first_click = false;
    right_clicked = true;
    if(count <= 3){
        if(count == 0) count = 1;
        if(left_clicked){
            count -= 2;
            if(count == -2) count = 0;
            if(count == -1) count = 1;
            carousel_section.style.backgroundImage = `url('https://camsteph.github.io/Drop-Shop-Store/img/${arr_of_images[count]}')`;
            left_clicked = false;
        }else{
            carousel_section.style.backgroundImage = `url('https://camsteph.github.io/Drop-Shop-Store/img/${arr_of_images[count]}')`;
            count += 1;
        }
    }else{
        count = 0;
        carousel_section.style.backgroundImage = `url('https://camsteph.github.io/Drop-Shop-Store/img/${arr_of_images[count]}')`;
    }
};

setInterval(handle_right_click, 3000);

left_btn.onclick = handle_left_click;
right_btn.onclick = handle_right_click;
