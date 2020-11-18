(() => {
    function plural(number, one, two, five) {
        let n = Math.abs(number);
        n %= 100;
        if (n >= 5 && n <= 20) {
            return five;
        }
        n %= 10;
        if (n === 1) {
            return one;
        }
        if (n >= 2 && n <= 4) {
            return two;
        }
        return five;
    }

    class CartItem {
        constructor(id, title, price) {
            this.id = id;
            this.title = title;
            this.price = parseFloat(price);
        }
        getPrice() {
            return this.price;
        }
    }

    class Cart {
        constructor(elWrapper) {
            this.elWrapper = elWrapper;
            this.elTotal = elWrapper.querySelector('.cartTotal');
            this.items = [];
            this.update();
        }
        addItem(product) {
            if (!this.contains(product.id)) {
                this.items.push(product);
                console.info('Добавлен', product.title, 'за', product.getPrice(), 'корзина:', this.getTotal());
                this.update();
            }
        }
        contains(itemId) {
            if (!this.items.length) {
                return false;
            }

            return !!this.items.find((item) => item.id === itemId);
        }
        getTotal() {
            return this.items.reduce((memo, item) => memo + item.getPrice(), 0.0).toFixed(2);
        }
        update() {
            let message = 'Корзина пуста';
            const cartTotal = this.getTotal();
            if (cartTotal > 0) {
                const formatted = new Intl.NumberFormat('ru-RU', { style: 'currency', currency: 'USD' }).format(cartTotal);
                const pluralized = plural(this.items.length, 'товар', 'товара', 'товаров');
                message = `В корзине ${this.items.length} ${pluralized} на ${formatted}`;
            }
            this.elTotal.innerHTML = message;
        }
    }

    const cart = new Cart(document.getElementById('cart'));

    const PRODUCTS = {
        1: {
            title: 'Chair',
            price: '36.7',
        },
        2: {
            title: 'Sofa',
            price: '11',
        },
        3: {
            title: 'Car',
            price: '983.12',
        },
        4: {
            title: 'Boat',
            price: '999999',
        },
    }

    function handleAddProductClick(el) {
        const productId = el.getAttribute('data-product-id');

        if (productId) {
            const productData = PRODUCTS[productId];
            if (productData) {
                const product = new CartItem(productId, productData.title, productData.price);
                cart.addItem(product);
            }
        }
    }

    class Gallery {
        constructor(elFrame, elsGalleryItem, elArrowPrev, elArrowNext) {
            elsGalleryItem = [...elsGalleryItem];

            const cnActive = 'product__gallery-item_selected';
            const srcLoading = 'img/image-loading.gif';
            const srcError = 'img/image-error.png';
            let blocked = false;

            const loadImg = (src, onload, onerror) => {
                const img = new Image();
                img.onload = onload;
                img.onerror = onerror;
                img.src = src;
            }

            let activeGalleryItemIdx = 3;

            const setActiveGalleryItem = (idx) => {
                if (idx === activeGalleryItemIdx) return;

                const elItem = elsGalleryItem[idx];

                activeGalleryItemIdx = idx;
                elsGalleryItem.forEach((elItem) => elItem.classList.remove(cnActive));
                elItem.classList.add(cnActive);

                blocked = true;
                const src = elItem.querySelector('img').getAttribute('src');
                elFrame.setAttribute('src', srcLoading);

                setTimeout(() => {
                    loadImg(src, () => {
                        blocked = false;
                        elFrame.setAttribute('src', src);
                    }, () => {
                        blocked = false;
                        elFrame.setAttribute('src', srcError);
                    });
                }, 2000);
            }

            elsGalleryItem.forEach((elItem, idx) => {
                elItem.addEventListener('click', () => {
                    if (blocked) return;

                    setActiveGalleryItem(idx);
                }, false);
            });

            elArrowPrev.addEventListener('click', () => {
                if (blocked) return;

                setActiveGalleryItem(Math.max(0, Math.min(activeGalleryItemIdx - 1, elsGalleryItem.length)));
            }, false);
            elArrowNext.addEventListener('click', () => {
                if (blocked) return;

                setActiveGalleryItem(Math.min(activeGalleryItemIdx + 1, elsGalleryItem.length - 1));
            }, false);
        }
    }

    document.addEventListener('DOMContentLoaded', () => {
        const gallery = new Gallery(
            document.getElementById('productImage'),
            document.getElementsByClassName('product__gallery-item'),
            document.getElementById('productPrev'),
            document.getElementById('productNext')
        );

        [...document.querySelectorAll('[data-product-id]')]
            .forEach((el) => {
                el.addEventListener('click', () => {
                    handleAddProductClick(el);
                }, false)
            });
    });

})();
