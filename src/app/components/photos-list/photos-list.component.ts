import { AddFavoritesDialogComponent } from './../common/add-favorites-dialog/add-favorites-dialog.component';
import { Component, HostListener, OnInit } from '@angular/core';
import { PicsumPhoto } from 'src/app/interfaces/picsumPhoto';
import { ServiceService } from 'src/app/services/service.service';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-photos-list',
  templateUrl: './photos-list.component.html',
  styleUrls: ['./photos-list.component.scss'],
})
export class PhotosListComponent implements OnInit {
  picsumPhotos: PicsumPhoto[] = [];
  displayedPhotos: PicsumPhoto[] = [];
  timer: any;
  showSpinner: boolean = false;

  constructor(
    private service: ServiceService,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.getPhotos();
  }

  private getPhotos() {
    this.service.getPhotos().subscribe(
      (res) => {
        console.log('got answer');
        this.picsumPhotos = res;
        this.displayedPhotos = [];
        this.displayedPhotos.push(...this.picsumPhotos.slice(0, 9));
      },
      (error) => {
        console.log('got error');
      }
    );
  }

  @HostListener('window:scroll', [])
  onScroll(): void {
    if (window.innerHeight + window.scrollY >= document.body.scrollHeight) { //check scrolled to bottom
      this.showSpinner = true;
      console.log('asd');
      this.timer = setTimeout(() => {
        this.displayedPhotos.push(...this.picsumPhotos.slice(0, 9));
        clearTimeout(this.timer);
        this.showSpinner = false;
      }, this.randomDelay());
    }
  }

  private randomDelay() {
    return Math.random() * 5000;
  }

  onImgClick(photo:PicsumPhoto) {
    if(!sessionStorage.getItem(photo.id.toString())) {
      sessionStorage.setItem(photo.id.toString(), 'https://picsum.photos/g/200/300');
      this.openDialog('1000ms', '1000ms', true);
    }else {
      this.openDialog('1000ms', '1000ms', false);
    }
  }

  openDialog(enterAnimationDuration: string, exitAnimationDuration: string, success: boolean): void {
    const dialogRef = this.dialog.open(AddFavoritesDialogComponent, {
      width: '250px',
      enterAnimationDuration, 
      exitAnimationDuration,
      data: {success}
    });

    dialogRef.afterClosed().subscribe(
      result => {
    });
  }
}
