import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { PhotosFavoritesComponent } from '../photos-favorites/photos-favorites.component';

import { PhotoDetailsComponent } from './photo-details.component';

const mockSessionStorageData:any = {
  0:'https://picsum.photos/g/200/300',
  10:'https://picsum.photos/g/200/300',
  120:'https://picsum.photos/g/200/300',
  1750:'https://picsum.photos/g/200/300',
}
const mockSessionStorageWithRemovedData: any = {
  10:'https://picsum.photos/g/200/300',
  120:'https://picsum.photos/g/200/300',
  1750:'https://picsum.photos/g/200/300',
}

describe('PhotoDetailsComponent', () => {
  let component: PhotoDetailsComponent;
  let fixture: ComponentFixture<PhotoDetailsComponent>;
  let store: any;
  let router: Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ 
        RouterTestingModule.withRoutes( [{path: 'favorites', component: PhotosFavoritesComponent}] ),
      ],
      declarations: [
        PhotoDetailsComponent,
        PhotosFavoritesComponent
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(PhotoDetailsComponent);
    router = TestBed.inject(Router)
    component = fixture.componentInstance;
    fixture.detectChanges();

    store = {...mockSessionStorageData};

    const mockSessionStorage = {
      removeItem: (key: string) => {
        delete store[key];
      },
    };
    spyOn(sessionStorage, 'removeItem').and.callFake( mockSessionStorage.removeItem );
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should remove key from sessionStorage', () => {
    expect(store).toEqual(mockSessionStorageData);
    component.removeFromFavorites('0')
    expect(store).toEqual(mockSessionStorageWithRemovedData);
  })

  it('should redirect to favorites', () => {
    const navigateSpy = spyOn(router, 'navigate');
    component.removeFromFavorites('0');
    expect(navigateSpy).toHaveBeenCalledWith(['/favorites']);
  })

});
