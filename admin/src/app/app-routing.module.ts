import { AddXeComponent } from './views/Add-Xe/Add-Xe.component';
import { XeComponent } from './views/Xe/Xe.component';
import { AddLoaiXeComponent } from './views/Add-LoaiXe/Add-LoaiXe.component';
import { LoaiXeComponent } from './views/LoaiXe/LoaiXe.component';
import { AddChucVuComponent } from './views/Add-ChucVu/Add-ChucVu.component';
import { NhanVienComponent } from './views/NhanVien/nhanvien.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DefaultLayoutComponent } from './containers';
import { Page404Component } from './views/pages/page404/page404.component';
import { Page500Component } from './views/pages/page500/page500.component';
import { LoginComponent } from './views/pages/login/login.component';
import { RegisterComponent } from './views/pages/register/register.component';
import { UserComponent } from './views/user/user.component';
import { AddNhanVienComponent } from './views/Add-NhanVien/Add-NhanVien.component';
import { ChucVuComponent } from './views/ChucVu/chucvu.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: '',
    component: DefaultLayoutComponent,
    data: {
      title: 'Home'
    },
    children: [
      {
        path: 'Xe',
        component: XeComponent,
        loadChildren: () =>
        import('./views/Xe/Xe.module').then((m) => m.XeModule)
      },
      {
        path: 'Add-Xe',
        component: AddXeComponent,
        loadChildren: () =>
        import('./views/Xe/Xe.module').then((m) => m.XeModule)
      },
      {
        path: 'Add-Xe/:id',
        component: AddXeComponent,
        loadChildren: () =>
        import('./views/Xe/Xe.module').then((m) => m.XeModule)
      },
      {
        path: 'LoaiXe',
        component: LoaiXeComponent,
        loadChildren: () =>
        import('./views/LoaiXe/LoaiXe.module').then((m) => m.LoaiXeModule)
      },
      {
        path: 'Add-LoaiXe',
        component: AddLoaiXeComponent,
        loadChildren: () =>
        import('./views/LoaiXe/LoaiXe.module').then((m) => m.LoaiXeModule)
      },
      {
        path: 'Add-LoaiXe/:id',
        component: AddLoaiXeComponent,
        loadChildren: () =>
        import('./views/LoaiXe/LoaiXe.module').then((m) => m.LoaiXeModule)
      },
      {
        path: 'ChucVu',
        component: ChucVuComponent,
        loadChildren: () =>
        import('./views/ChucVu/chucvu.module').then((m) => m.ChucVuModule)
      },
      {
        path: 'Add-ChucVu',
        component: AddChucVuComponent,
        loadChildren: () =>
        import('./views/ChucVu/chucvu.module').then((m) => m.ChucVuModule)
      },
      {
        path: 'Add-ChucVu/:id',
        component: AddChucVuComponent,
        loadChildren: () =>
        import('./views/ChucVu/chucvu.module').then((m) => m.ChucVuModule)
      },
      {
        path: 'NhanVien',
        component: NhanVienComponent,
        loadChildren: () =>
        import('./views/NhanVien/nhanvien.module').then((m) => m.NhanVienModule)
      },
      {
        path: 'Add-NhanVien/:id',
        component: AddNhanVienComponent,
        loadChildren: () =>
        import('./views/NhanVien/nhanvien.module').then((m) => m.NhanVienModule)
      },
      {
        path: 'Add-NhanVien',
        component: AddNhanVienComponent,
        loadChildren: () =>
        import('./views/NhanVien/nhanvien.module').then((m) => m.NhanVienModule)
        },
      {
        path: 'theme',
        loadChildren: () =>
          import('./views/theme/theme.module').then((m) => m.ThemeModule)
      },
      {
        path: 'base',
        loadChildren: () =>
          import('./views/base/base.module').then((m) => m.BaseModule)
      },
      {
        path: 'buttons',
        loadChildren: () =>
          import('./views/buttons/buttons.module').then((m) => m.ButtonsModule)
      },
      {
        path: 'forms',
        loadChildren: () =>
          import('./views/forms/forms.module').then((m) => m.CoreUIFormsModule)
      },
      {
        path: 'charts',
        loadChildren: () =>
          import('./views/charts/charts.module').then((m) => m.ChartsModule)
      },
      {
        path: 'icons',
        loadChildren: () =>
          import('./views/icons/icons.module').then((m) => m.IconsModule)
      },
      {
        path: 'notifications',
        loadChildren: () =>
          import('./views/notifications/notifications.module').then((m) => m.NotificationsModule)
      },
      {
        path: 'widgets',
        loadChildren: () =>
          import('./views/widgets/widgets.module').then((m) => m.WidgetsModule)
      },
      {
        path: 'pages',
        loadChildren: () =>
          import('./views/pages/pages.module').then((m) => m.PagesModule)
      },
    ]
  },
  {
    path: 'user',
    component: UserComponent,
    data: {
      title: 'Quan ly user'
    }
  },
  {
    path: '404',
    component: Page404Component,
    data: {
      title: 'Page 404'
    }
  },
  {
    path: '500',
    component: Page500Component,
    data: {
      title: 'Page 500'
    }
  },
  {
    path: 'login',
    component: LoginComponent,
    data: {
      title: 'Login Page'
    }
  },
  {
    path: 'register',
    component: RegisterComponent,
    data: {
      title: 'Register Page'
    }
  },
  {path: '**', redirectTo: 'dashboard'}
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      scrollPositionRestoration: 'top',
      anchorScrolling: 'enabled',
      initialNavigation: 'enabledBlocking'
      // relativeLinkResolution: 'legacy'
    })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
