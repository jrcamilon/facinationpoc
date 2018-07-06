import { TestBed, inject } from '@angular/core/testing';

import { IbeService } from './ibe.service';

describe('IbeService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [IbeService]
    });
  });

  it('should be created', inject([IbeService], (service: IbeService) => {
    expect(service).toBeTruthy();
  }));
});
