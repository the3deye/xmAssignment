import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HeaderComponent } from './components/header/header.component';
import { PhotosListComponent } from './components/photos-list/photos-list.component';
import { PhotosFavoritesComponent } from './components/photos-favorites/photos-favorites.component';
import { PhotoDetailsComponent } from './components/photo-details/photo-details.component';
import { MatButtonModule } from '@angular/material/button';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { HttpClientModule } from '@angular/common/http';
import { MatDialogModule } from '@angular/material/dialog';
import { AddFavoritesDialogComponent } from './components/common/add-favorites-dialog/add-favorites-dialog.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    PhotosListComponent,
    PhotosFavoritesComponent,
    PhotoDetailsComponent,
    AddFavoritesDialogComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    NgbModule,
    MatButtonModule,
    MatGridListModule,
    MatProgressSpinnerModule,
    MatDialogModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
