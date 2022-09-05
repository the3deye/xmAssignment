import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PhotosFavoritesComponent } from './photos-favorites.component';

describe('PhotosFavoritesComponent', () => {
  let component: PhotosFavoritesComponent;
  let fixture: ComponentFixture<PhotosFavoritesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PhotosFavoritesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PhotosFavoritesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
