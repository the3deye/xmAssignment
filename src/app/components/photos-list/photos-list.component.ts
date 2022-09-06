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

  // To api tou unsplash prosferei dyo urls na xtyphseis
  // to 'https://picsum.photos/g/200/300' sou epistrefei ena random pic to opoio omws otan to xrhsimopoieis polles fores
  // px sto render ths listas epistrefei to idio pic
  // kai to 'https://picsum.photos/list' to opoio san api epistrefei mia alfa plhroforia me id klp alla den yparxei pouthena
  // kapoio url pedio pou na einai ths ypotithemenhs fwtografias
  // Egine prospathia na vrethei kapoio allo free api pou na mhn thelei idiaitero set up alla htan paromoiou typou

  // Me liga logia sthn efarmogh parolo pou oses eikones kai na fainontai tha einai idies 
  // h logikh einai xtismenh apo pisw leptomerws px den mporeis na valeis thn photo me idio id ksana sta favorites

  ngOnInit(): void {
    this.getPhotos();
  }

  private getPhotos() {
    this.service.getPhotos().subscribe(
      (res) => {
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
      this.timer = setTimeout(() => {
        this.displayedPhotos.push(...this.picsumPhotos.slice(0, 9));
        clearTimeout(this.timer);
        this.showSpinner = false;
      }, this.randomDelay());
    }
  }

  private randomDelay() {
    return (Math.random() + 1) * 200;
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
    /*const dialogRef = */this.dialog.open(AddFavoritesDialogComponent, {
      width: '250px',
      enterAnimationDuration, 
      exitAnimationDuration,
      data: {success}
    });

    // dialogRef.afterClosed().subscribe(
    //   result => {
    // });
  }
}
