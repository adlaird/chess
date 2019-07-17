import { TestBed, async } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { CaptureEvaluationPlayer } from './captureEvaluationPlayer';

describe('CaptureEvaluationPlayer', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule
      ],
      declarations: [
      ],
    }).compileComponents();
  }));

  it('should exist', () => {
      const player = new CaptureEvaluationPlayer();
      expect(player).not.toBeNull();
  });
});
