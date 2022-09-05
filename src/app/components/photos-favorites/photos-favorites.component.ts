import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-photos-favorites',
  templateUrl: './photos-favorites.component.html',
  styleUrls: ['./photos-favorites.component.scss'],
})
export class PhotosFavoritesComponent implements OnInit {
  displayedPhotos: { id: string; url: string | null }[] = [];

  constructor(
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.displayedPhotos = this.getSessionStorage();
  }

  getSessionStorage() {
    let values: { id: string; url: string | null }[] = [];
    let keys: string[] = Object.keys(sessionStorage);
    let i: number = keys.length;

    while (i--) {
      values.push({ id: keys[i], url: sessionStorage.getItem(keys[i]) });
    }
    return values;
  }

  onImgClick(id: string) {
    this.router.navigate(['photos/',id])
  }
}
