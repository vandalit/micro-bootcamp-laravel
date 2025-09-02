import { inject, Injectable } from "@angular/core";
import { ProductItemCart } from "../interfaces/product.interface";
import { signalSlice } from "ngxtension/signal-slice";
import { map } from "rxjs";
import { StorageService } from "./storage.service";

interface State {
    products: ProductItemCart[];
    loaded: boolean;
}

@Injectable({
  providedIn: "root",
})
export class CartStateService {

    private _storageService = inject(StorageService);

    private initialState: State = {
        products: [],
        loaded: false,
    };

    loadProducts$ = this._storageService
    .loadProducts()
    .pipe(map((products) =>  ({products,loaded: true }) ));

    state = signalSlice({
        initialState: this.initialState,
        sources: [this.loadProducts$ ],
        effects: (state) => ({
            load: () => {
                console.log(state.products());
            }
        })
    });
}