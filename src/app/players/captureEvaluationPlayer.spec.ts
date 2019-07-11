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

  it('should play exd5', () => {
    const player = new CaptureEvaluationPlayer();
    const move = player.chooseMove('rnbqkbnr/ppp1pppp/8/3p4/4P3/8/PPPP1PPP/RNBQKBNR w KQkq d6 0 2');
    expect(move).toBe('exd5');
  });
});
