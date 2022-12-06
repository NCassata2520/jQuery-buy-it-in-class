import ProductCollection from '../models/ProductCollection.js';

 export default class ProductFactory {
    _aisle = [];
     addItem(item){
         this._aisle.push(item);
     }

     removeItem(item){
         if(this._aisle.includes(item)) {
             this._aisle.splice(this._aisle.indexOf(item), 1);
         }
     }

     get items(){
         return [...this._aisle];
     }


}