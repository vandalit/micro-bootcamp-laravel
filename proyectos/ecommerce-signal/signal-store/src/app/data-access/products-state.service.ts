import { Injectable, inject } from "@angular/core";
import { Product } from "../shared/interfaces/product.interface";
import { ProductsService } from "./products.service";
import { signalSlice } from 'ngxtension/signal-slice';
interface State {
    products: Product[];
    status: 'loading' | 'success' | 'error';
}
@Injectable()
export class ProductsStateService {
    private productsService = inject(ProductsService);
    private initialState: State = {
        products: [],   
        status: 'loading' as const, 
    };

    state = signalSlice({
        initialState: this.initialState,
        sources: [],
    });
}

