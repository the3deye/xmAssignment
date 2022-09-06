import { PicsumPhoto } from './../../interfaces/picsumPhoto';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { PhotosListComponent } from './photos-list.component';
import { ServiceService } from 'src/app/services/service.service';
import { AddFavoritesDialogComponent } from '../common/add-favorites-dialog/add-favorites-dialog.component';

const mockSessionStorageData:any = {
  0:'https://picsum.photos/g/200/300',
  10:'https://picsum.photos/g/200/300',
  120:'https://picsum.photos/g/200/300',
  1750:'https://picsum.photos/g/200/300',
}

const photoInStorage: PicsumPhoto = {
  author: 'Alejandro Escamilla',
    author_url: 'https://unsplash.com/photos/yC-Yzbqy7PY',
    filename: '0.jpeg',
    format: 'jpeg',
    height: 3744,
    id: 120,
    post_url: 'https://unsplash.com/photos/yC-Yzbqy7PY',
    width: 5616,
}
const photoNotInStorage: PicsumPhoto = {
  author: 'Alejandro Escamilla',
    author_url: 'https://unsplash.com/photos/yC-Yzbqy7PY',
    filename: '0.jpeg',
    format: 'jpeg',
    height: 3744,
    id: 1000,
    post_url: 'https://unsplash.com/photos/yC-Yzbqy7PY',
    width: 5616,
}

describe('PhotosListComponent', () => {
  let component: PhotosListComponent;
  let fixture: ComponentFixture<PhotosListComponent>;
  let store: any;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ HttpClientTestingModule, MatDialogModule ],
      providers: [
        ServiceService,
        MatDialog
      ],
      declarations: [ PhotosListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PhotosListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    store = mockSessionStorageData;
    const mockSessionStorage = {
      getItem: (key: string): string => {
        return key in store ? store[key] : null;
      },
      setItem: (key: string, value: string) => {
        store[key] = `${value}`;
      }
    };
    spyOn(sessionStorage, 'getItem').and.callFake( mockSessionStorage.getItem );
    spyOn(sessionStorage, 'setItem').and.callFake( mockSessionStorage.setItem );
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('on image click should add in sessionStorage and open success dialog', ()=> {
    const openDialogSpy = spyOn(component.dialog, 'open')

    expect(store).toEqual(mockSessionStorageData);
    component.onImgClick(photoNotInStorage);
    expect(store[photoNotInStorage.id]).toBeDefined();
    expect(store[photoNotInStorage.id]).toBe('https://picsum.photos/g/200/300');
    expect(openDialogSpy).toHaveBeenCalledWith(AddFavoritesDialogComponent, 
     {
      width: '250px',
      enterAnimationDuration: '1000ms', 
      exitAnimationDuration: '1000ms',
      data: {
        success: true
      }
     });
  })

  it('on image click should not add in sessionStorage and should open failure dialog', ()=> {
    const openDialogSpy = spyOn(component.dialog, 'open')
    expect(store).toEqual(mockSessionStorageData);
    component.onImgClick(photoInStorage);
    expect(store[photoInStorage.id]).toBeDefined();
    expect(store[photoInStorage.id]).toBe('https://picsum.photos/g/200/300');
    expect(openDialogSpy).toHaveBeenCalledWith(AddFavoritesDialogComponent, 
     {
      width: '250px',
      enterAnimationDuration: '1000ms', 
      exitAnimationDuration: '1000ms',
      data: {
        success: false
      }
     });
  })

  // logo ths lathos logikis pou exei ftiaxtei to photos-list na pairnei photos apo to api tou unsplash
  // den einai eykolo kai themito na ftiaxtoun test

});
