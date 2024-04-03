import readline from 'readline'
import { cart, getProducts, saveCart } from './data.mjs'

const io = readline.createInterface({
    input: process.stdin,
    output: process.stdout
})

const renderMainMenu = () => {
    console.clear();
    console.log("======================");
    console.log("MAIN MENU");
    console.log("======================");
    console.log("1. CATALOG");
    console.log("2. CART");
    console.log("3. EXIT");

    io.question("choose > ", async (answer) => {
        let option = parseInt(answer)
        switch(option) {
            case 1:
            let products = await getProducts();
                renderCatalog(products, async (n, product, q) => {
                    cart.items.push({ product, q });

                    const saved = await saveCart(cart);
                    renderMainMenu();
                  });
                break;
            case 2:
                renderCart(cart)    
                break;
            case 0:
                io.close();    
                break;
        }
    })
}

const renderCart = (cart) => {
    console.clear()
    console.log("======================")
    console.log("Cart")
    console.log("======================")
    
    cart.items.forEach((item, idx) => {
        console.log(idx + 1, item.product.name, item.q);
    });

    console.log("======================");
    console.log("1. REMOVE ITEM");
    console.log("2. CHANGE QUANTITY");
    console.log("3. CHECKOUT");
    console.log("0. EXIT TO MAIN MENU");

    io.question("choose > ", async (answer) => {
        let option = parseInt(answer)
        switch(option) {
            case 1:
                break;
            case 2:
                break;
            case 3: 
                break;
            case 0:
                let products = await getProducts();
                renderCatalog(products, (n, product, q) => {
                    cart.items.push({ product, q });
                    renderMainMenu();
                  });
            break;
        }
    });
}

//HW finis Remove item & Change quantity in cart menu
// You need to implement the logic for removing items and changing quantities in the cart menu.

//HW check if you've got a number
const isNumber = (value) => {
    return !isNaN(parseFloat(value)) && isFinite(value);
};

//HW make a helper function to format section headers
const formatSectionHeader = (header) => {
    const length = header.length;
    const separator = '='.repeat(length);
    return `${separator}\n${header}\n${separator}`;
};

const renderCatalog = (products, confirmCb) => {
    console.clear();
    console.log("======================");
    console.log("CATALOG");
    console.log("======================");

    products.forEach((product, idx) => {
        console.log(idx+1, product.name, product.price)
    })
    console.log("======================");
    console.log("0. EXIT TO MAIN MENU");

    io.question("choose > ", (answer) => {
        let n = parseInt(answer)
        if (isNumber(n) && 1 <= n && n <= products.length) {
            let product = products[n-1]
            io.question(`how many "${product.name}": ? `, answer => {
                let q = parseInt(answer);
                if (isNumber(q)) {
                    let cost = q * product.price
                    io.question(`product cost = "${cost}" : confirm (y/n)? `, answer => {
                        switch (answer) {
                            case 'y':
                                confirmCb(n, product, q);
                                break;
                            case 'n':
                                console.log(`product "${product.name}" was not confirmed!`);
                                break;
                            default:
                                console.log('invalid option');
                                break;
                        }
                    });
                } else {
                    console.log("Invalid quantity!");
                }
            });
        } else if (n === 0) {
            renderMainMenu()
        } else {
            console.log("Invalid option!");
        }
    })
};

export { renderCatalog, formatSectionHeader, renderMainMenu, renderCart }
