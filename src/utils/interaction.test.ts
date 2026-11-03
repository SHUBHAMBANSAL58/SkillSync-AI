import test from 'node:test';
import assert from 'node:assert/strict';
import {
  splitTextForKineticReveal,
  REFERENCE_EASE_OUT,
  SPRING_MICRO_CONFIG,
  CINEMATIC_TRANSITION_VARIANTS,
  checkPrefersReducedMotion,
  checkIsTouchDevice,
} from './interaction';

test('Interaction Utilities Suite', async (t) => {
  await t.test('splitTextForKineticReveal splits sentences into words and chars correctly', () => {
    const text = 'Build Skills';
    const split = splitTextForKineticReveal(text);

    assert.equal(split.length, 3); // 'Build', ' ', 'Skills'
    assert.equal(split[0].word, 'Build');
    assert.equal(split[0].chars.length, 5);
    assert.equal(split[0].chars[0].char, 'B');
    assert.equal(split[0].chars[0].isSpace, false);

    assert.equal(split[1].word, ' ');
    assert.equal(split[1].chars[0].isSpace, true);

    assert.equal(split[2].word, 'Skills');
    assert.equal(split[2].chars.length, 6);
  });

  await t.test('splitTextForKineticReveal handles empty text gracefully', () => {
    assert.deepEqual(splitTextForKineticReveal(''), []);
  });

  await t.test('REFERENCE_EASE_OUT matches reference site cubic-bezier definition', () => {
    assert.deepEqual(REFERENCE_EASE_OUT, [0.22, 1, 0.36, 1]);
  });

  await t.test('SPRING_MICRO_CONFIG contains valid physics parameters', () => {
    assert.equal(SPRING_MICRO_CONFIG.type, 'spring');
    assert.equal(SPRING_MICRO_CONFIG.stiffness, 400);
    assert.equal(SPRING_MICRO_CONFIG.damping, 25);
  });

  await t.test('CINEMATIC_TRANSITION_VARIANTS defines valid initial, animate, and exit states', () => {
    assert.equal(CINEMATIC_TRANSITION_VARIANTS.initial.opacity, 0);
    assert.equal(CINEMATIC_TRANSITION_VARIANTS.animate.opacity, 1);
    assert.equal(CINEMATIC_TRANSITION_VARIANTS.exit.opacity, 0);
  });

  await t.test('checkPrefersReducedMotion and checkIsTouchDevice return boolean without errors in Node runtime', () => {
    assert.equal(typeof checkPrefersReducedMotion(), 'boolean');
    assert.equal(typeof checkIsTouchDevice(), 'boolean');
  });
});
