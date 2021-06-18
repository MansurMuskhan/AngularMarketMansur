import { Component } from '@angular/core';
import carts from './base/carts.json';
import category from './base/category.json';

interface Cart {
  id:string, 
  name:string, 
  category:string, 
  price:string 
}

enum pageState {
  mainPage,
  categoryPage,
  basketPage
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  title = 'angular-market-test';
  public cartList: Cart[] = carts;
  public categoryList: Cart[] = category;
  public basketData: Cart[] = [];

  public currentPage: pageState = 0;
  BasketAmount:number = 0;

  constructor(){
    const getPage = localStorage.getItem('page'); // получаем индекс сохраненной страницы локально
    var check = getPage != null ? getPage : 1;
    this.setPage(Number(check));
  }

// задаем страницу
setPage(page:number, kategory?:number){

  if(kategory){ // если значение задано сохраняем локально индекс категории
    console.log((kategory).toString());
    localStorage.setItem('kategory', (kategory).toString());
  }
  this.currentPage = page; // устанавливаем нужную страницу
  localStorage.setItem('page', page.toString()); // сохраняем индекс установленной страницы локально

}


// получаем данные из определенной категории
getCartsCategory(){
  var value = localStorage.getItem('kategory');
  return this.cartList.filter(i => i.category == value);
}

// Получаем данные
updateData() {
  const userJson = localStorage.getItem('cart2');
  this.basketData = userJson !== null ? JSON.parse(userJson) : [];
  return this.basketData;
}
// Возвращаем данные
getDataBasket() {
  
  this.BasketAmount = this.basketData.filter(item => item.price).reduce((sum, current) => sum + Number(current.price), 0); // обновляем сумму из корзины
  console.log(this.BasketAmount + ' amount');

  this.updateData();
  return this.basketData;
}

// Сохраняем данные в localStorage
saveData() {
  localStorage.setItem('cart2', JSON.stringify(this.basketData));
  return this.basketData;
}
// Добавление товара в коллекцию
add(value:string) {

  var _value = this.basketData.filter(i => i.id == value);
  console.log(this.basketData.length);
  if(_value.length > 0){
    return;
    // ---здесь можно сделать количество когда добавили существующий товар в корзине---
  }else{
    var obj = this.cartList[Number(value) - 1];
    this.basketData.push(obj);
    this.saveData();
  }
  

}

// Удаление товара из коллекции
remove(value:string) {

  var drop = this.basketData.filter(i => i.id !== value);
  this.basketData = drop;
  this.saveData();
  this.getDataBasket();
}

}


