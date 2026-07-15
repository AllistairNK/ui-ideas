// Pure behavior state machine for the pet view -- no DOM access here.
// Consumers feed in elapsed time + input each tick and get back updated state.

const WANDER_SPEED = 40; // px/sec
const CATCH_SPEED = 130; // px/sec -- how fast the pet runs to chase a thrown ball
const IDLE_PAUSE_MIN_MS = 1200;
const IDLE_PAUSE_MAX_MS = 3500;
const EDGE_MARGIN = 24; // keep the sprite's center away from the stage edges
export const GROUND_INSET = 20; // distance up from the stage's bottom edge things "stand" at

const GRAVITY = 1400; // px/sec^2
const BALL_RESTITUTION = 0.55; // energy kept per bounce
const BALL_SETTLE_VY = 90; // px/sec -- below this on a bounce, the ball stops for good
const CATCH_DISTANCE = 16; // px -- how close the pet needs to be to claim a settled ball

function randomBetween(min, max) {
  return min + Math.random() * (max - min);
}

// The pet (and the ball) only ever move horizontally along a floor line near
// the bottom of the stage -- this is what makes them read as standing on
// something rather than floating.
function groundY(bounds) {
  return Math.max(EDGE_MARGIN, bounds.height - GROUND_INSET);
}

function clampX(x, bounds) {
  const marginX = Math.min(EDGE_MARGIN, bounds.width / 2);
  return Math.min(bounds.width - marginX, Math.max(marginX, x));
}

function pickWanderTargetX(bounds) {
  return clampX(Math.random() * bounds.width, bounds);
}

// Moves x toward targetX by up to `speed * dtSeconds`. Returns the new x
// and whether the target was reached this step.
function stepToward(x, targetX, speed, dtSeconds) {
  const dx = targetX - x;
  const dist = Math.abs(dx);
  if (dist < 0.5) return { x: targetX, arrived: true };
  const step = Math.min(dist, speed * dtSeconds);
  return { x: x + Math.sign(dx) * step, arrived: step >= dist };
}

export function createPetAIState(bounds) {
  const x = clampX(bounds.width / 2, bounds);
  return {
    state: 'sit',
    x,
    y: groundY(bounds),
    targetX: x,
    facing: 1,
    pauseUntil: 0
  };
}

// input: { activityCategory: string | null, ball: { x, y, settled } | null }
export function tickPetAI(state, dtMs, input, bounds, now = Date.now()) {
  const dtSeconds = dtMs / 1000;
  const next = { ...state, y: groundY(bounds) };

  // An assigned game activity takes priority -- the pet holds its spot while
  // the activity-specific animation (flourish, wired up separately) plays.
  if (input.activityCategory) {
    next.state = 'activity';
    return next;
  }

  if (input.ball) {
    const targetX = clampX(input.ball.x, bounds);
    const moved = stepToward(next.x, targetX, CATCH_SPEED, dtSeconds);
    next.state = 'chase-ball';
    next.facing = targetX >= next.x ? 1 : -1;
    next.x = moved.x;
    return next;
  }

  if (next.state !== 'wander' && next.state !== 'sit') {
    next.state = 'sit';
    next.pauseUntil = now + randomBetween(IDLE_PAUSE_MIN_MS, IDLE_PAUSE_MAX_MS);
    return next;
  }

  if (next.state === 'sit') {
    if (now >= next.pauseUntil) {
      next.state = 'wander';
      next.targetX = pickWanderTargetX(bounds);
    }
    return next;
  }

  // wander
  const moved = stepToward(next.x, next.targetX, WANDER_SPEED, dtSeconds);
  next.facing = next.targetX >= next.x ? 1 : -1;
  next.x = moved.x;
  if (moved.arrived) {
    next.state = 'sit';
    next.pauseUntil = now + randomBetween(IDLE_PAUSE_MIN_MS, IDLE_PAUSE_MAX_MS);
  }
  return next;
}

// Spawns a thrown ball at the click point with a gravity arc toward the floor.
export function createBall(clickPoint, bounds) {
  return {
    x: clampX(clickPoint.x, bounds),
    y: Math.min(clickPoint.y, groundY(bounds)),
    vx: randomBetween(-120, 120),
    vy: -randomBetween(250, 400),
    settled: false
  };
}

export function tickBall(ball, dtMs, bounds) {
  if (!ball || ball.settled) return ball;
  const dtSeconds = dtMs / 1000;
  const floor = groundY(bounds);
  const marginX = Math.min(EDGE_MARGIN, bounds.width / 2);

  let { x, y, vx, vy } = ball;
  vy += GRAVITY * dtSeconds;
  x += vx * dtSeconds;
  y += vy * dtSeconds;

  if (x < marginX) { x = marginX; vx = -vx * BALL_RESTITUTION; }
  if (x > bounds.width - marginX) { x = bounds.width - marginX; vx = -vx * BALL_RESTITUTION; }

  let settled = false;
  if (y >= floor) {
    y = floor;
    if (Math.abs(vy) < BALL_SETTLE_VY) {
      vy = 0;
      vx = 0;
      settled = true;
    } else {
      vy = -vy * BALL_RESTITUTION;
      vx *= 0.7;
    }
  }

  return { x, y, vx, vy, settled };
}

export function isBallCaught(petState, ball) {
  return !!ball && ball.settled && Math.abs(petState.x - ball.x) < CATCH_DISTANCE;
}
