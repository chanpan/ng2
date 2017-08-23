import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MysqlComponent } from "../mysql/mysql.component";
import { HomeComponent } from '../home/home.component';
import { WidgetsComponent } from '../widgets/widgets.component';

 const routes: Routes = [
    {
        path: '',
        component: HomeComponent
    }, 
    {
        path: 'home',
        component: HomeComponent
    },{
        path:'mysql',
        component:MysqlComponent
    },{
        path:'widgets',
        component:WidgetsComponent
    }
 ];
@NgModule({
    imports: [RouterModule.forRoot(routes, {useHash: true})],
    exports: [RouterModule]
})
export class AppRoutingModule { }
