import { Injectable } from "@angular/core";
import { Cart } from "../../models/cart";
import { ProdutoDTO } from "../../models/produtos.dto";
import { StorageService } from "../storage.service";

@Injectable()
export class CartService {

    constructor(public storage: StorageService) {
    }

    createOrClearCart(): Cart {
        let cart: Cart = { items: [] };
        this.storage.setCart(cart);
        return cart;
    }

    getCart(): Cart {
        let cart: Cart = this.storage.getCart();
        if (cart == null) {
            console.log('getcart')
            
            cart = this.createOrClearCart();
        }
        console.log('getcart novo', cart)
        return cart;
    }

    addProduto(produto: ProdutoDTO): Cart {
console.log('addporduto')
        let cart = this.getCart();
        let position = cart.items.findIndex(x => x.produto.id == produto.id);
        if (position == -1) {
            cart.items.push({ quantidade: 1, produto: produto });
        }
        this.storage.setCart(cart);
        return cart;

    }
}