import { Routes } from '@angular/router';

export default [
    {path: 'products', loadComponent: () => import('../product-list/product-list')},    
    {path: 'product/:id', loadComponent: () => import('../product-detail/product-detail')}
] as Routes;