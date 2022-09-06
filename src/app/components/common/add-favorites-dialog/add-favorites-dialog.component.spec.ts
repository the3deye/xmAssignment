import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AddFavoritesDialogComponent } from './add-favorites-dialog.component';

describe('AddFavoritesDialogComponent', () => {
  let component: AddFavoritesDialogComponent;
  let fixture: ComponentFixture<AddFavoritesDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [
        { provide: MAT_DIALOG_DATA, useValue: {} },
        { provide: MatDialogRef, useValue: {} }
      ],
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
