import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BottomNavigationPage } from './bottom-navigation.page';

const routes: Routes = [
  {
    path: '',
    component: BottomNavigationPage,
    children: [
      {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full'
      },
      { path: 'dashboard', loadChildren: '../dashboard/dashboard.module#DashboardPageModule' },
      { path: 'overview', loadChildren: '../overview/overview.module#OverviewPageModule' },
      { path: 'settings', loadChildren: '../settings/settings.module#SettingsPageModule' },
      { path: 'room/:id', loadChildren: '../room/room.module#RoomPageModule' }
    ]
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class BottomNavigationRoutingModule { }
