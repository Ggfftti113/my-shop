class Header {
    handlerOpenShoppingPage() {
        shoppingPage.render();
    }

    render(count) {
        const html = `
            <div class="header-container">
                <div class="header-logo">🛍️ My Shop</div>
                <div class="header-cart" onclick="headerPage.handlerOpenShoppingPage();">
                    🛒 <span class="header-counter">${count}</span>
                </div>
            </div>
        `;

        ROOT_HEADER.innerHTML = html;
    }
}

const headerPage = new Header();

// показываем количество товаров при загрузке страницы
const productsStore = localStorageUtil.getProducts();
headerPage.render(productsStore.length);
