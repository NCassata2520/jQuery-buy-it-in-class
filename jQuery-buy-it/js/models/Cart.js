class Cart {
    _cartItems = [];

    addItem(item){
        let existingCartItem = this.findItem(item);

        if(existingCartItem){
            existingCartItem.quantity++;
        }else{
            // TODO: Command Pattern
            // Command is a behavioral design pattern that turns a request into
            // a stand-alone object that contains all information about the request.
            // This transformation lets you pass requests as a method arguments,
            // https://refactoring.guru/design-patterns/command

            // v1
            // pass cart to cart item
            //this._cartItems.push(new CartItem(item, this));

            // v2
            // create a method containing everything needed
            // let thisCart = this;
            // let removeMethod = function(){
            //     thisCart.removeItem(this)
            // }
            // this._cartItems.push(new CartItem(item, removeMethod));

            // v3
            // use java-ish command class
            let command = new RemoveCartItemCommand(this);
            this._cartItems.push(new CartItem(item, command));


            // wrap the item in a CartItem (with quantity) and store in array
            //this._cartItems.push(new CartItem(item));
        }
    }

    removeItem(cartItem){
        if(this._cartItems.includes(cartItem)) {
            this._cartItems.splice(this._cartItems.indexOf(cartItem), 1);
        }
    }

    findItem(item){
        return this._cartItems.find(cartItem => {
            return cartItem.product === item;
        });
    }

    get items(){
        return [...this._cartItems]; // return "read-only" copy of the array
    }

    get total(){
        return this._cartItems.reduce((total, cartItem) => {
            return total + cartItem.subtotal;
        }, 0)
    }

    get formattedTotal(){
        return '$' + this.total.toFixed(2);
    }
}

class CartItem {
    product = {};
    quantity = 1;
    // v2 create a placeholder for the remove method that is passed in
    //remove;
    // v3
    removeCommand;

    constructor(product, removeMethod) {
        this.product = product ?? {};
        // v2
        //this.remove = removeMethod ?? function(){};
        // v3
        this.removeCommand = removeMethod ?? {};

    }

    // v1
    // remove(){
    //     this.cart.removeItem(this);
    // }

    //v3
    remove(){
        this.removeCommand.execute(this);
    }

    get subtotal(){
        return this.product.price * this.quantity;
    }

    get formattedSubtotal(){
        return '$' + this.subtotal.toFixed(2);
    }
}

// Some interface to define your commands
// interface Command {
//     public void execute(Object object);
// }

// TODO: create java-ish command class
class RemoveCartItemCommand {
    _cart = {}

    constructor(cart) {
        this._cart = cart;
    }

    // This would be implemented by an interface in Java
    execute(item){
        this._cart.removeItem(item)
    }
}

// Notice we are not exporting CartItem?
// Nobody else even needs to know about CartItem!
// Wait, did we just make an entire class private?
// Composition FTW!
export default Cart;
