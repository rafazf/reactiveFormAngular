import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit, inject } from '@angular/core';
import { RequestApiService } from '../services/requestApi.service';
import { Observable, map } from 'rxjs';
import { BehaviorSubService } from '../services/behaviorSub.service';
import { IProduct } from '../interfaces/IProduct';
import { IProductCar } from '../interfaces/IProductCar';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'inicio',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './inicio.component.html',
  styleUrl: './inicio.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InicioComponent implements OnInit{
  
  reqApi = inject(RequestApiService);
  cartService = inject(BehaviorSubService);
  products$: Observable<IProduct[]>;
  card$: Observable<IProductCar[]>
  total:number=0;

  search:string='';
  constructor() {
    this.card$ = this.cartService.myCart
    this.products$ = this.reqApi.getData('laptops?limit=10')
  }

  ngOnInit(): void {
    this.cartService.products.subscribe((data)=>{
      this.arrCard = data;
    })

    this.cartService.myCart.pipe(
      map((itemCart=>{
        return itemCart.reduce((prev, curr)=> prev + curr.product.price * curr.cant,0)
      }))
    ).subscribe(val=>this.total = val);
  }

  arrCard: IProduct[] = [];
  dataSearch$: IProduct[]=[];
  isLoading = false;

  /**Agregar producto al carrito */
  addProduct(product: IProduct): void {
    this.cartService.addProduct(product);
    this.isLoading = false;
    this.search = '';
  }

  /**Eliminar un producto del carrito */
  onDeleted(index:number){
    this.cartService.mrProduct(index);
  }

  /**Buscar un producto en la barra de busqueda y agregar al carrito */
  searchAdd(searchValue: any): any {
    this.isLoading = true;
    if(searchValue !== ''){
      const urlSearch = `laptops?search=${searchValue}`;
      this.reqApi.getData(urlSearch).subscribe( (res :IProduct[]) => {
        if (res.length === 0) {
          this.isLoading = false;
        } else {
          this.dataSearch$ = res;
        }
      })
    }else{
      this.isLoading=false;
    }
  }

  /**Asignar cantidad de un producto por su id */
  setCant(cant:any, id:number){
   if(cant === ''){
    this.cartService.setQuantity(0,id);
   }else{
    this.cartService.setQuantity(parseInt(cant),id);
   }
  }

  /**Actualizar la cantidad segun los boton de + - */
  updateQuantity(operation:string, id: number){
    this.cartService.updateQuantity(operation,id);
  }
}
