import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-photo-details',
  templateUrl: './photo-details.component.html',
  styleUrls: ['./photo-details.component.scss']
})
export class PhotoDetailsComponent implements OnInit {

  photoId: string | null = null;

  constructor(
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.photoId = this.route.snapshot.params['id'];
  }

  removeFromFavorites(id: string | null): void {
    id && sessionStorage.removeItem(id);
    this.router.navigate(['/favorites']);
  }

}
