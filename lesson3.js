// 1. С помощью цикла while вывести все простые числа в промежутке от 0 до 100.
var i = 1
var res = [1]

while (i++ < 100) {
    var count = 0;
    for (var j = 2; j <= i; j++) {
        if (i % j) {
            continue;
        }
        count += 1;
    }
    if (count == 1) res.push(i);
}

document.write(res)

// 2. С этого урока начинаем работать с функционалом интернет-магазина. Предположим, есть сущность корзины. Нужно реализовать функционал подсчета стоимости корзины в зависимости от находящихся в ней товаров.
// 3. Товары в корзине хранятся в массиве. Задачи:
//  a) Организовать такой массив для хранения товаров в корзине;
//  b) Организовать функцию countBasketPrice, которая будет считать стоимость корзины.

var cart = [];
cart.push({ 'name': 'item1', 'qty': 2, 'price': 400 });
cart.push({ 'name': 'item2', 'qty': 1, 'price': 250 });
console.log(cart)

function countBasketPrice() {
    var totalPrice = 0;
    for (let i = 0; i <= cart.length - 1; i++) {
        totalPrice += cart[i]['qty'] * cart[i]['price'];
    }
    return totalPrice;
}

console.log(countBasketPrice())

// 4. Вывести с помощью цикла for числа от 0 до 9, не используя тело цикла. Выглядеть это должно так:
//     for(…){// здесь пусто}

for (let i = 0; i < 10; console.log(i++)) { }

// 5. Нарисовать пирамиду с помощью console.log, как показано на рисунке, только у вашей пирамиды должно быть 20 рядов, а не 5:
//     x
//     xx
//     xxx
//     xxxx
//     xxxxx

for (var i = 1; i <= 20; i++) {
    console.log(Array(i).fill('*').join(''));
}