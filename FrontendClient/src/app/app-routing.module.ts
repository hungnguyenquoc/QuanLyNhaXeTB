import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { BASE_ROUTES } from './configs/base-route.routes';


@NgModule({
  imports: [
    RouterModule.forRoot(BASE_ROUTES, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
