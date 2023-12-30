import { NgModule } from "@angular/core";
import { HomeComponent } from './home/home.component';
import { UsersComponent } from './users/users.component';
import { ServersComponent } from './servers/servers.component';
import { EditServerComponent } from './servers/edit-server/edit-server.component';
import { ServerComponent } from './servers/server/server.component';
import { RouterModule, Routes } from '@angular/router';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { AuthGuard } from "./auth-guard.service";
import { CanDeactivateGuard } from "./can-deactivate-guard.service";
import { ServerResolver } from "./servers/server/server-resolver.service";
import { ErrorPageComponent } from "./error-page/error-page.component";

const appRoutes : Routes = [
    {path:"",component:HomeComponent},
    {path:"users",component:UsersComponent},
    {path:"users/:id/:name",component:UsersComponent},
    {path:"servers",
      //canActivate:[AuthGuard],
      canActivateChild : [AuthGuard],
      component:ServersComponent,
      children:[
        {path:":id",component:ServerComponent,resolve: {server:ServerResolver}},
        {path:":id/edit",component:EditServerComponent,canDeactivate:[CanDeactivateGuard]}
    ]},
    // {path:"**",component:PageNotFoundComponent}
    {path:"**",component:ErrorPageComponent,data:{message:'Page not found!'}}
  ]

@NgModule({
    imports : [
        RouterModule.forRoot(appRoutes,{useHash:true})
    ],
    exports: [RouterModule]
})
export class AppRoutingModule{

}