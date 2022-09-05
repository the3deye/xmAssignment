import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddFavoritesDialogComponent } from './add-favorites-dialog.component';

describe('AddFavoritesDialogComponent', () => {
  let component: AddFavoritesDialogComponent;
  let fixture: ComponentFixture<AddFavoritesDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddFavoritesDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddFavoritesDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
