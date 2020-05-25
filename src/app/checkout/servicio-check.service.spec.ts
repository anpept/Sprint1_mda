import { TestBed } from '@angular/core/testing';

import { ServicioCheckService } from './servicio-check.service';

describe('ServicioCheckService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ServicioCheckService = TestBed.get(ServicioCheckService);
    expect(service).toBeTruthy();
  });
});
