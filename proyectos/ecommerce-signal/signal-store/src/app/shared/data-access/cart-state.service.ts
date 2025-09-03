import { inject, Injectable, Signal } from "@angular/core";
import { ProductItemCart } from "../interfaces/product.interface";
import { signalSlice } from "ngxtension/signal-slice";
import { map, Observable } from "rxjs";
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
        .pipe(map((products) => ({ products, loaded: true })));

    state = signalSlice({
        initialState: this.initialState,
        sources: [this.loadProducts$],
        actionSources: {
            add: (state, action$: Observable<ProductItemCart>) =>
                action$.pipe(
                    map((product) => this.add(state, product))
                )
        },
        effects: (state) => ({
            load: () => {
                if (!state.loaded()) {
                    this._storageService.saveProducts(state().products);
                }
                console.log(state.products());
            }
        })
    });

    private add(state: Signal<State>, product: ProductItemCart): State {
        const isIncart = state().products.find(
            (productInCart) => productInCart.product.id === product.product.id
        );

        if (!isIncart) {
            return {
                products: [...state().products, { ...product, quantity: 1 }],
                loaded: state().loaded
            };
        }

        isIncart.quantity += 1;
        return {
            products: [...state().products],
            loaded: state().loaded
        };
    }
}