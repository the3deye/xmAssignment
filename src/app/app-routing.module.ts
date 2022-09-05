import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PhotoDetailsComponent } from './components/photo-details/photo-details.component';
import { PhotosFavoritesComponent } from './components/photos-favorites/photos-favorites.component';
import { PhotosListComponent } from './components/photos-list/photos-list.component';

const routes: Routes = [
  { path: '', redirectTo: 'photos', pathMatch: 'full' },
  { path: 'photos', component: PhotosListComponent},
  { path: 'photos/:id', component: PhotoDetailsComponent},
  { path: 'favorites', component: PhotosFavoritesComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
