import { TestBed, inject } from '@angular/core/testing';

import { NodejsApiService } from './nodejs-api.service';

describe('NodejsApiService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [NodejsApiService]
    });
  });

  it('should be created', inject([NodejsApiService], (service: NodejsApiService) => {
    expect(service).toBeTruthy();
  }));
});
