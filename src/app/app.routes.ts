import { Routes } from '@angular/router';
import { HelloComponent } from './components/hello/hello.component';
import { CarsComponent } from './components/cars/cars.component';
import { CarFormComponent } from './components/cars/car-form/car-form.component';
import { ProfileComponent } from './components/profile/profile.component';
import { RegistrationComponent } from './components/registration/registration.component';
import { UserComponent } from './components/user/user.component';
import { UserDetailsComponent } from './components/user/user-details/user-details.component';
import { authGuard } from './guards/auth.guard';
import { roleGuard } from './guards/role.guard';
import { StarshipComponent } from './components/starship/starship.component';
import { CarsComponent as rxjsCars } from './rxjs/components/cars/cars.component';



export const routes: Routes = [
    {path:'hello', component: HelloComponent, canActivate:[roleGuard], data: {role:'admin'}},
    {path:'cars', component: CarsComponent},
    {path:'car/add', component: CarFormComponent},
    {path: 'car/edit/:slug', component: CarFormComponent},
    {path:'profile',component: ProfileComponent, canActivate:[authGuard]},
    {path: 'register', component: RegistrationComponent},
    {path: 'users',component: UserComponent,
        children: [
            {path:'view/:id',component: UserDetailsComponent},
            {path:'hello', component: HelloComponent}, 
        ]
    },
    {path: 'starships', component: StarshipComponent },
    {path: 'rxjs/cars', component: rxjsCars},
    {path:'manager', loadChildren: () => import('./manager/manager.route').then(m => m.managerRoute)},
    {path:'**', redirectTo: 'cars'}// should always be last
];
