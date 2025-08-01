import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: '',
        pathMatch: 'full',
        loadComponent: () => {
            return import('../app/features/welcome/welcome').then((m) => m.Welcome);
        },
    },
    {
        path: 'login',
        pathMatch: 'full',
        loadComponent: () => {
            return import('../app/features/login/login').then((m) => m.Login);
        },
    },
    {
        path: 'register',
        pathMatch: 'full',
        loadComponent: () => {
            return import('../app/features/register/register').then((m) => m.Register);
        },
    },
    {
        path: 'sellerDashboard',
        pathMatch: 'full',
        loadComponent: () => {
            return import('../app/features/seller-dashboard/seller-dashboard').then((m) => m.SellerDashboard);
        },
    },
    {
        path: 'customerDashboard',
        pathMatch: 'full',
        loadComponent: () => {
            return import('../app/features/customer-dashboard/customer-dashboard').then((m) => m.CustomerDashboard);
        },
    },
    {
        path: 'customerProfile',
        pathMatch: 'full',
        loadComponent: () => {
            return import('./features/customer-profile/customer-profile').then((m) => m.CustomerProfile);
        },
    }
];
