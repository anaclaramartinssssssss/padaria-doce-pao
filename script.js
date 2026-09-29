 let cart = [];


// ===============================
// ADICIONAR PRODUTO AO CARRINHO
// ===============================

function addToCart(id) {

    const buttons = document.querySelectorAll(".product-card .btn");

    let button = null;

    buttons.forEach(btn => {

        if (btn.getAttribute("onclick") === `addToCart(${id})`) {
            button = btn;
        }

    });

    if (!button) {
        alert("Não foi possível encontrar este produto.");
        return;
    }

    const card = button.closest(".product-card");

    const name =
        card.querySelector("h3").textContent.trim();

    const priceText =
        card.querySelector("strong").textContent.trim();

    const match =
        priceText.match(/R\$\s*([\d.,]+)/);

    if (!match) {
        alert("Não foi possível identificar o preço.");
        return;
    }

    let price = match[1];

    if (price.includes(",")) {
        price = price
            .replace(/\./g, "")
            .replace(",", ".");
    }

    price = parseFloat(price);

    const existingProduct =
        cart.find(item => item.id === id);

    if (existingProduct) {

        existingProduct.quantity++;

    } else {

        cart.push({
            id: id,
            name: name,
            price: price,
            quantity: 1
        });

    }

    // Atualiza o número do carrinho
    // sem abrir o carrinho
    updateCart();
}


// ===============================
// ATUALIZAR CARRINHO
// ===============================

function updateCart() {

    const cartList =
        document.getElementById("cart-items-list");

    const cartCount =
        document.getElementById("cart-count");

    const floatCartCount =
        document.getElementById("float-cart-count");

    const cartTotal =
        document.getElementById("cart-total");

    if (!cartList) return;

    cartList.innerHTML = "";

    let total = 0;
    let totalQuantity = 0;


    // ===============================
    // CARRINHO VAZIO
    // ===============================

    if (cart.length === 0) {

        cartList.innerHTML = `
            <div class="empty-cart">

                <i class="fa-solid fa-cart-shopping"></i>

                <h3>Seu carrinho está vazio</h3>

                <p>
                    Adicione seus produtos favoritos!
                </p>

            </div>
        `;

    } else {


        // ===============================
        // PRODUTOS
        // ===============================

        cart.forEach(item => {

            const subtotal =
                item.price * item.quantity;

            total += subtotal;

            totalQuantity += item.quantity;


            cartList.innerHTML += `
                <div class="cart-product">

                    <div class="cart-product-info">

                        <h4>
                            ${item.name}
                        </h4>

                        <span>
                            R$ ${item.price
                                .toFixed(2)
                                .replace(".", ",")}
                        </span>

                    </div>


                    <div class="cart-controls">

                        <button
                            type="button"
                            onclick="changeQuantity(${item.id}, -1)">
                            −
                        </button>


                        <strong>
                            ${item.quantity}
                        </strong>


                        <button
                            type="button"
                            onclick="changeQuantity(${item.id}, 1)">
                            +
                        </button>

                    </div>


                    <div class="cart-subtotal">

                        R$ ${subtotal
                            .toFixed(2)
                            .replace(".", ",")}

                    </div>

                </div>
            `;

        });

    }


    // ===============================
    // CONTADOR DO CARRINHO
    // ===============================

    if (cartCount) {
        cartCount.textContent = totalQuantity;
    }

    if (floatCartCount) {
        floatCartCount.textContent = totalQuantity;
    }


    // ===============================
    // TOTAL
    // ===============================

    if (cartTotal) {

        cartTotal.textContent =
            total.toFixed(2).replace(".", ",");

    }

}


// ===============================
// ALTERAR QUANTIDADE
// ===============================

function changeQuantity(id, amount) {

    const product =
        cart.find(item => item.id === id);

    if (!product) return;

    product.quantity += amount;


    // Remove quando chegar a zero
    if (product.quantity <= 0) {

        cart =
            cart.filter(item => item.id !== id);

    }

    updateCart();

}


// ===============================
// ABRIR / FECHAR CARRINHO
// ===============================

function toggleCartModal() {

    const modal =
        document.getElementById("cart-modal");

    if (!modal) return;

    modal.classList.toggle("active");

}


// ===============================
// FINALIZAR PEDIDO
// ===============================

function finishOrder(event) {

    event.preventDefault();


    if (cart.length === 0) {

        alert(
            "Seu carrinho está vazio. Adicione algum produto primeiro."
        );

        return;

    }


    const name =
        document
            .getElementById("cust-name")
            .value
            .trim();


    const address =
        document
            .getElementById("cust-address")
            .value
            .trim();


    const payment =
        document
            .getElementById("payment-method")
            .value;


    if (!name) {

        alert("Digite seu nome.");

        return;

    }


    if (!address) {

        alert("Digite seu endereço.");

        return;

    }


    if (!payment) {

        alert("Escolha a forma de pagamento.");

        return;

    }


    // ===============================
    // MONTAR MENSAGEM
    // ===============================

    let message =
        "Olá! Quero fazer um pedido na Padaria Doce Pão.\n\n";


    message +=
        `*Nome:* ${name}\n`;

    message +=
        `*Endereço:* ${address}\n`;

    message +=
        `*Pagamento:* ${payment}\n\n`;


    message += "*Pedido:*\n";


    let total = 0;


    cart.forEach(item => {

        const subtotal =
            item.price * item.quantity;

        total += subtotal;


        message +=
            `${item.quantity}x ${item.name} - R$ ${subtotal
                .toFixed(2)
                .replace(".", ",")}\n`;

    });


    message +=
        `\n*Total: R$ ${total
            .toFixed(2)
            .replace(".", ",")}*`;


    // ===============================
    // WHATSAPP
    // ===============================

    const whatsappNumber =
        "5533999998888";


    const whatsappURL =
        `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;


    window.open(
        whatsappURL,
        "_blank"
    );

}


// ===============================
// TROCAR DE PÁGINA
// ===============================

function switchPage(pageName) {

    const pages =
        document.querySelectorAll(".page");

    const buttons =
        document.querySelectorAll(".nav-btn");


    // Remove página ativa
    pages.forEach(page => {

        page.classList.remove("active");

    });


    // Remove botão ativo
    buttons.forEach(button => {

        button.classList.remove("active");

    });


    // Ativa página escolhida
    const selectedPage =
        document.getElementById(
            `page-${pageName}`
        );


    if (selectedPage) {

        selectedPage.classList.add("active");

    }


    // Ativa botão escolhido
    buttons.forEach(button => {

        const action =
            button.getAttribute("onclick");


        if (
            action &&
            action.includes(
                `switchPage('${pageName}')`
            )
        ) {

            button.classList.add("active");

        }

    });


    window.scrollTo({

        top: 0,

        behavior: "smooth"

    });

}


// ===============================
// INICIAR SITE
// ===============================

document.addEventListener(
    "DOMContentLoaded",
    function() {

        updateCart();

    }
);