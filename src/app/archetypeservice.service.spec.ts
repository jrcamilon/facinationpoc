import { TestBed, inject } from '@angular/core/testing';

import { ArchetypeserviceService } from './archetypeservice.service';

describe('ArchetypeserviceService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ArchetypeserviceService]
    });
  });

  it('should be created', inject([ArchetypeserviceService], (service: ArchetypeserviceService) => {
    expect(service).toBeTruthy();
  }));
});
