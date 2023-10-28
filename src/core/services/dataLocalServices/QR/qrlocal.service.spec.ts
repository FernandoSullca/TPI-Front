import { TestBed } from '@angular/core/testing';

import { QRLocalService } from './qrlocal.service';

describe('QRLocalService', () => {
  let service: QRLocalService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(QRLocalService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
