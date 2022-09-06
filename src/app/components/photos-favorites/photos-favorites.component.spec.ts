import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PhotosFavoritesComponent } from './photos-favorites.component';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';

const mockSessionStorageData:any = {
  0:'https://picsum.photos/g/200/300',
  10:'https://picsum.photos/g/200/300',
  120:'https://picsum.photos/g/200/300',
  1750:'https://picsum.photos/g/200/300',
}

describe('PhotosFavoritesComponent', () => {
  let component: PhotosFavoritesComponent;
  let fixture: ComponentFixture<PhotosFavoritesComponent>;
  let router: Router;
  let store: any;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule.withRoutes( [{path: 'favorites', component: PhotosFavoritesComponent}] ),
      ],
      declarations: [ PhotosFavoritesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PhotosFavoritesComponent);
    router = TestBed.inject(Router);
    component = fixture.componentInstance;
    fixture.detectChanges();

    store = {};
    const mockSessionStorage = {
      getItem: (key: string): string => {
        return key in mockSessionStorageData ? mockSessionStorageData[key] : null;
      },
    };
    spyOn(sessionStorage, 'getItem').and.callFake( mockSessionStorage.getItem );
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // it('should return session storage', () => {
  //   store = component.getSessionStorage();
  //   console.log(store);
  //   expect(store).toEqual(mockSessionStorageData)
  // })

  it('should navigate to photo Details', () => {
    const navigateSpy = spyOn(router, 'navigate');
    component.onImgClick('0');
    expect(navigateSpy).toHaveBeenCalledWith(['photos/','0']);
  })

});