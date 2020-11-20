import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { API_CONFIG } from '../../config/api.config';
import { ProdutoDTO } from '../../models/produtos.dto';
import { CartService } from '../../services/domain/cart.service';
import { ProdutoService } from '../../services/domain/produto.service';


@IonicPage()
@Component({
  selector: 'page-produto-detail',
  templateUrl: 'produto-detail.html',
})
export class ProdutoDetailPage {
  
  item: ProdutoDTO


  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    public produtoService: ProdutoService,
    public cartService: CartService) {    
  }

  ionViewDidLoad() {
    let id = this.navParams.get("produto_id");
    this.produtoService.findById(id).subscribe(response=>{
      this.item = response;
      this.loadImageUrl();
    });
  }

  loadImageUrl() {
      this.produtoService.getSmallImageFromBucket(this.item.id)
      .subscribe(response => {
        this.item.imageUrl = `${API_CONFIG.bucketBaseURL}/prod${this.item.id}.jpg`;
      },
        error => { });
  }
  addToCart(item: ProdutoDTO) { 
    this.cartService.addProduto(item);
    this.navCtrl.setRoot('CartPage');
  } 
}
