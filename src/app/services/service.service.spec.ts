import { PicsumPhoto } from './../interfaces/picsumPhoto';
import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { ServiceService } from './service.service';
import { HttpErrorResponse } from '@angular/common/http';

const expectedUrl = 'https://picsum.photos/list';

describe('ServiceService', () => {
  let service: ServiceService;
  let controller: HttpTestingController;
  const photos: PicsumPhoto[] = [
    {
      author: 'Alejandro Escamilla',
        author_url: 'https://unsplash.com/photos/yC-Yzbqy7PY',
        filename: '0.jpeg',
        format: 'jpeg',
        height: 3744,
        id: 0,
        post_url: 'https://unsplash.com/photos/yC-Yzbqy7PY',
        width: 5616,
    },
  ]

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    service = TestBed.inject(ServiceService);
    controller = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('getPhotos returns list from picsum', () => {
    let actualPhotos: PicsumPhoto[] | undefined;
    service.getPhotos().subscribe((photosList) => {
      actualPhotos = photosList;
    });

    const request = controller.expectOne(expectedUrl);
    request.flush( photos );
    controller.verify();
    expect(actualPhotos).toEqual(photos);
  });

  it('getPhotos passes through search errors', () => {
    const status = 500;
    const statusText = 'Internal Server Error';
    const errorEvent = new ErrorEvent('API error');

    let actualError: HttpErrorResponse | undefined;

    service.getPhotos().subscribe(
      () => {
        fail('next handler must not be called');
      },
      (error) => {
        actualError = error;
      },
      () => {
        fail('complete handler must not be called');
      },
    );

    controller.expectOne(expectedUrl).error(errorEvent, { status, statusText });

    if (!actualError) {
      throw new Error('Error needs to be defined');
    }
    expect(actualError.error).toBe(errorEvent);
    expect(actualError.status).toBe(status);
    expect(actualError.statusText).toBe(statusText);
  });

});
