class Shopping {
    // Закрыть окно корзины
    handlerClose() {
        ROOT_SHOPPING.innerHTML = '';
    }

    // Очистить корзину полностью
    handlerClearCart() {
        // Очищаем localStorage
        localStorage.setItem(localStorageUtil.keyName, JSON.stringify([]));

        // Обновляем шапку (счётчик)
        headerPage.render(0);

        // Обновляем товары — ЭТО ГЛАВНОЕ!
        productsPage.render();

        // Перерисовать саму корзину
        this.render();
    }

    // Отрисовать корзину
    render() {
        const productsStore = localStorageUtil.getProducts();
        let htmlCatalog = '';
        let sumCatalog = 0;

        if (productsStore.length === 0) {
            ROOT_SHOPPING.innerHTML = `
                <div class="shopping-container">
                    <div class="shopping__close" onclick="shoppingPage.handlerClose()">✖</div>
                    <h2 class="shopping__title">Моя корзина</h2>
                    <p class="shopping__empty">Корзина пуста 🥺</p>
                </div>
            `;
            return;
        }

        CATALOG.forEach(({ id, name, price }) => {
            if (productsStore.includes(id)) {
                htmlCatalog += `
                    <tr>
                        <td class="shopping-element__name">🛒 ${name}</td>
                        <td class="shopping-element__price">${price.toLocaleString()} so'm</td>
                    </tr>
                `;
                sumCatalog += price;
            }
        });

        const html = `
            <div class="shopping-container">
                <div class="shopping__close" onclick="shoppingPage.handlerClose()">✖</div>
                <h2 class="shopping__title">Моя корзина</h2>

                <table class="shopping-table">
                    ${htmlCatalog}
                    <tr class="shopping-element__total">
                        <td><b>Итого:</b></td>
                        <td><b>${sumCatalog.toLocaleString()} so'm</b></td>
                    </tr>
                </table>

                <button class="shopping__clear" onclick="shoppingPage.handlerClearCart()">🧹 Очистить корзину</button>
            </div>
        `;

        ROOT_SHOPPING.innerHTML = html;
    }
}

const shoppingPage = new Shopping();
