/**
 * SMA DEVIL - 2D High School Character (Anak SMA) Procedural Sprite Renderer
 * Generates crisp, expressive 2D vector sprites with full animation states:
 * Idle, Running, Jumping, Falling, Trolled/Dead, and Victory!
 */

class CharacterRenderer {
  constructor() {
    this.gender = 'boy'; // 'boy' or 'girl'
    this.uniformType = 'sma_standard'; // Putih Abu-abu
    this.accentColor = '#8b5cf6'; // Purple / Blue glow
  }

  setGender(gender) {
    this.gender = gender;
  }

  /**
   * Draw the 2D Student Character on Canvas Context
   * @param {CanvasRenderingContext2D} ctx 
   * @param {number} x - Center X position
   * @param {number} y - Bottom Y position (feet on ground)
   * @param {number} facing - 1 for Right, -1 for Left
   * @param {string} state - 'idle', 'run', 'jump', 'fall', 'dead', 'win'
   * @param {number} animTime - Animation timer / ticks
   * @param {boolean} invertedGravity - True if gravity flipped
   */
  draw(ctx, x, y, facing = 1, state = 'idle', animTime = 0, invertedGravity = false) {
    ctx.save();
    ctx.translate(x, y);

    if (invertedGravity) {
      ctx.scale(1, -1);
    }
    ctx.scale(facing, 1);

    const isGirl = this.gender === 'girl';

    if (state === 'dead') {
      this.drawDeadState(ctx, isGirl, animTime);
      ctx.restore();
      return;
    }

    // Animation offsets
    let bodyBob = 0;
    let legOffset1 = 0;
    let legOffset2 = 0;
    let armAngle1 = 0;
    let armAngle2 = 0;
    let eyeType = 'normal';

    if (state === 'idle') {
      bodyBob = Math.sin(animTime * 0.08) * 1.5;
    } else if (state === 'run') {
      const runFreq = animTime * 0.3;
      bodyBob = Math.abs(Math.sin(runFreq)) * 3;
      legOffset1 = Math.sin(runFreq) * 10;
      legOffset2 = -Math.sin(runFreq) * 10;
      armAngle1 = -Math.sin(runFreq) * 0.6;
      armAngle2 = Math.sin(runFreq) * 0.6;
    } else if (state === 'jump') {
      bodyBob = -4;
      legOffset1 = -4;
      legOffset2 = -2;
      armAngle1 = -0.8;
      armAngle2 = 0.4;
    } else if (state === 'fall') {
      bodyBob = 2;
      legOffset1 = 4;
      legOffset2 = 2;
      armAngle1 = -1.2;
      armAngle2 = -1.2;
      eyeType = 'worried';
    } else if (state === 'win') {
      bodyBob = Math.abs(Math.sin(animTime * 0.2)) * 6;
      armAngle1 = -2.2;
      armAngle2 = 2.2;
      eyeType = 'happy';
    }

    // 1. Shadow beneath student
    ctx.fillStyle = 'rgba(0, 0, 0, 0.25)';
    ctx.beginPath();
    ctx.ellipse(0, 0, 14, 4, 0, 0, Math.PI * 2);
    ctx.fill();

    // 2. Backpack (Tas Ransel SMA) - Blue/Purple Tech Backpack
    ctx.save();
    ctx.fillStyle = '#4c1d95'; // Dark purple
    ctx.beginPath();
    ctx.roundRect(-16, -34 + bodyBob, 8, 20, [4]);
    ctx.fill();
    ctx.fillStyle = '#38bdf8'; // Cyan backpack strip
    ctx.fillRect(-15, -28 + bodyBob, 6, 3);
    ctx.restore();

    // 3. Legs & Shoes (Celana / Rok Abu-abu SMA)
    const pantColor = '#64748b'; // Abu-abu SMA
    const shoeColor = '#1e293b'; // Black school sneakers
    const whiteSocks = '#f8fafc';

    if (isGirl) {
      // Siswi: Pleated Skirt (Rok Abu-abu) + Legs
      // Legs
      ctx.fillStyle = '#ffdfba'; // Skin tone
      ctx.fillRect(-6, -16, 4, 12 + legOffset1 * 0.4);
      ctx.fillRect(2, -16, 4, 12 + legOffset2 * 0.4);

      // White Socks & Shoes
      ctx.fillStyle = whiteSocks;
      ctx.fillRect(-7, -7, 6, 4);
      ctx.fillRect(1, -7, 6, 4);
      ctx.fillStyle = shoeColor;
      ctx.fillRect(-8, -3, 8, 4);
      ctx.fillRect(0, -3, 8, 4);

      // Abu-abu Skirt
      ctx.fillStyle = pantColor;
      ctx.beginPath();
      ctx.moveTo(-10, -22 + bodyBob);
      ctx.lineTo(10, -22 + bodyBob);
      ctx.lineTo(13, -12 + bodyBob);
      ctx.lineTo(-13, -12 + bodyBob);
      ctx.closePath();
      ctx.fill();
    } else {
      // Siswa: Trousers (Celana Abu-abu SMA)
      ctx.fillStyle = pantColor;
      // Left leg
      ctx.beginPath();
      ctx.roundRect(-8, -20 + bodyBob, 6, 17 + legOffset1 * 0.3, [2]);
      ctx.fill();
      // Right leg
      ctx.beginPath();
      ctx.roundRect(2, -20 + bodyBob, 6, 17 + legOffset2 * 0.3, [2]);
      ctx.fill();

      // Shoes
      ctx.fillStyle = shoeColor;
      ctx.beginPath();
      ctx.roundRect(-9, -4 + legOffset1 * 0.3, 8, 5, [2]);
      ctx.roundRect(1, -4 + legOffset2 * 0.3, 8, 5, [2]);
      ctx.fill();
      // White shoe sole
      ctx.fillStyle = '#ffffff';
      ctx.fillRect(-9, 0 + legOffset1 * 0.3, 8, 1.5);
      ctx.fillRect(1, 0 + legOffset2 * 0.3, 8, 1.5);
    }

    // 4. Torso - White School Shirt (Kemeja Putih OSIS SMA)
    ctx.fillStyle = '#ffffff';
    ctx.beginPath();
    ctx.roundRect(-9, -36 + bodyBob, 18, 16, [4]);
    ctx.fill();

    // Shirt Collar & Details
    ctx.fillStyle = '#e2e8f0';
    ctx.beginPath();
    ctx.moveTo(-5, -36 + bodyBob);
    ctx.lineTo(0, -31 + bodyBob);
    ctx.lineTo(5, -36 + bodyBob);
    ctx.lineTo(0, -34 + bodyBob);
    ctx.closePath();
    ctx.fill();

    // OSIS / School Pocket Badge
    ctx.fillStyle = '#3b82f6'; // Blue OSIS badge pocket
    ctx.fillRect(2, -31 + bodyBob, 4, 5);
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(3, -29 + bodyBob, 2, 2);

    // Tie (Dasi SMA)
    ctx.fillStyle = '#475569'; // Grey/Navy tie
    ctx.beginPath();
    ctx.moveTo(-2, -32 + bodyBob);
    ctx.lineTo(2, -32 + bodyBob);
    ctx.lineTo(1.5, -23 + bodyBob);
    ctx.lineTo(0, -21 + bodyBob);
    ctx.lineTo(-1.5, -23 + bodyBob);
    ctx.closePath();
    ctx.fill();

    // 5. Head & Hair
    const skinTone = '#fcd34d'; // Stylized anime skin
    ctx.fillStyle = skinTone;
    ctx.beginPath();
    ctx.arc(0, -42 + bodyBob, 10, 0, Math.PI * 2);
    ctx.fill();

    // Hair
    const hairColor = isGirl ? '#7c2d12' : '#1e1b4b'; // Brown for girl, Midnight Blue/Black for boy
    ctx.fillStyle = hairColor;
    
    if (isGirl) {
      // Long hair / Ponytail with Purple Ribbon
      ctx.beginPath();
      ctx.arc(0, -44 + bodyBob, 11, Math.PI * 0.9, Math.PI * 2.1);
      ctx.fill();
      // Side bang
      ctx.fillRect(-11, -44 + bodyBob, 5, 14);
      // Ponytail ribbon
      ctx.fillStyle = '#c084fc'; // Purple ribbon
      ctx.beginPath();
      ctx.arc(-10, -48 + bodyBob, 4, 0, Math.PI * 2);
      ctx.fill();
    } else {
      // Stylish neat high school boy haircut
      ctx.beginPath();
      ctx.arc(0, -45 + bodyBob, 11, Math.PI * 0.8, Math.PI * 2.2);
      ctx.fill();
      // Spiky front bangs
      ctx.beginPath();
      ctx.moveTo(-10, -43 + bodyBob);
      ctx.lineTo(-6, -38 + bodyBob);
      ctx.lineTo(-2, -44 + bodyBob);
      ctx.lineTo(3, -37 + bodyBob);
      ctx.lineTo(8, -42 + bodyBob);
      ctx.lineTo(10, -45 + bodyBob);
      ctx.closePath();
      ctx.fill();
    }

    // 6. Eyes & Face Expression
    if (eyeType === 'normal') {
      // Cute anime eyes
      ctx.fillStyle = '#0f172a';
      ctx.fillRect(2, -43 + bodyBob, 3, 5);
      ctx.fillStyle = '#ffffff';
      ctx.fillRect(2, -43 + bodyBob, 1.5, 2); // Highlight
      // Blush
      ctx.fillStyle = 'rgba(244, 63, 94, 0.4)';
      ctx.fillRect(4, -38 + bodyBob, 3, 2);
    } else if (eyeType === 'worried') {
      // Wide alarmed eyes
      ctx.fillStyle = '#ffffff';
      ctx.beginPath();
      ctx.arc(4, -42 + bodyBob, 3, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = '#0f172a';
      ctx.beginPath();
      ctx.arc(4, -42 + bodyBob, 1.5, 0, Math.PI * 2);
      ctx.fill();
      // Sweat drop
      ctx.fillStyle = '#38bdf8';
      ctx.beginPath();
      ctx.ellipse(8, -48 + bodyBob, 2, 3, Math.PI / 4, 0, Math.PI * 2);
      ctx.fill();
    } else if (eyeType === 'happy') {
      // ^_^ eyes
      ctx.strokeStyle = '#0f172a';
      ctx.lineWidth = 1.8;
      ctx.beginPath();
      ctx.arc(3, -41 + bodyBob, 2.5, Math.PI * 1.1, Math.PI * 1.9);
      ctx.stroke();
      ctx.fillStyle = 'rgba(244, 63, 94, 0.5)';
      ctx.fillRect(2, -37 + bodyBob, 4, 2);
    }

    // 7. Arms & Hands
    ctx.save();
    ctx.translate(0, -32 + bodyBob);
    ctx.rotate(armAngle1);
    // White shirt sleeve
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(-3, 0, 6, 8);
    // Hand
    ctx.fillStyle = skinTone;
    ctx.fillRect(-2.5, 8, 5, 4);
    ctx.restore();

    ctx.restore();
  }

  /**
   * Draw comical squished/trolled death state
   */
  drawDeadState(ctx, isGirl, animTime) {
    // Comical squashed student
    ctx.fillStyle = 'rgba(244, 63, 94, 0.2)';
    ctx.beginPath();
    ctx.ellipse(0, -6, 20, 8, 0, 0, Math.PI * 2);
    ctx.fill();

    // Squashed shirt & pants
    ctx.fillStyle = '#ffffff';
    ctx.beginPath();
    ctx.roundRect(-16, -10, 32, 8, [4]);
    ctx.fill();

    ctx.fillStyle = '#64748b';
    ctx.fillRect(-18, -6, 36, 6);

    // X_X Face
    ctx.strokeStyle = '#0f172a';
    ctx.lineWidth = 2;
    // Left X
    ctx.beginPath();
    ctx.moveTo(-8, -9);
    ctx.lineTo(-4, -5);
    ctx.moveTo(-4, -9);
    ctx.lineTo(-8, -5);
    ctx.stroke();

    // Right X
    ctx.beginPath();
    ctx.moveTo(4, -9);
    ctx.lineTo(8, -5);
    ctx.moveTo(8, -9);
    ctx.lineTo(4, -5);
    ctx.stroke();

    // Floating stars / spiral dizziness
    const starAngle = animTime * 0.1;
    ctx.fillStyle = '#fbbf24';
    for (let i = 0; i < 3; i++) {
      const ang = starAngle + (i * Math.PI * 2) / 3;
      const sx = Math.cos(ang) * 16;
      const sy = -20 + Math.sin(ang) * 6;
      ctx.fillRect(sx - 2, sy - 2, 4, 4);
    }
  }

  /**
   * Draw Classroom Exit Gate / Door
   */
  static drawDoor(ctx, x, y, width = 36, height = 54, isOpen = false, pulse = 0) {
    ctx.save();
    ctx.translate(x, y);

    // Outer Door Frame (Neon Glow)
    const glowColor = isOpen ? '#38bdf8' : '#8b5cf6';
    ctx.shadowColor = glowColor;
    ctx.shadowBlur = 12 + Math.sin(pulse) * 4;

    ctx.fillStyle = 'rgba(15, 23, 42, 0.9)';
    ctx.strokeStyle = glowColor;
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.roundRect(0, 0, width, height, [6, 6, 0, 0]);
    ctx.fill();
    ctx.stroke();

    ctx.shadowBlur = 0;

    // Door Portal / Interior
    if (isOpen) {
      // Swirling portal inside
      const grad = ctx.createLinearGradient(0, 0, 0, height);
      grad.addColorStop(0, '#38bdf8');
      grad.addColorStop(0.5, '#8b5cf6');
      grad.addColorStop(1, '#ffffff');
      ctx.fillStyle = grad;
      ctx.beginPath();
      ctx.roundRect(4, 4, width - 8, height - 4, [4, 4, 0, 0]);
      ctx.fill();

      // "KELAS" Sign glowing
      ctx.fillStyle = '#ffffff';
      ctx.font = 'bold 9px monospace';
      ctx.textAlign = 'center';
      ctx.fillText('FINISH', width / 2, 16);
    } else {
      // Closed School Door with glass window & handle
      ctx.fillStyle = '#1e293b';
      ctx.beginPath();
      ctx.roundRect(4, 4, width - 8, height - 4, [4, 4, 0, 0]);
      ctx.fill();

      // Glass window on door
      ctx.fillStyle = 'rgba(56, 189, 248, 0.35)';
      ctx.strokeStyle = '#38bdf8';
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.roundRect(8, 8, width - 16, 18, [3]);
      ctx.fill();
      ctx.stroke();

      // "KELAS XII" Door Label
      ctx.fillStyle = '#e2e8f0';
      ctx.font = 'bold 7px sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText('PINTU KELAS', width / 2, 20);

      // Gold Door Knob
      ctx.fillStyle = '#fbbf24';
      ctx.beginPath();
      ctx.arc(width - 8, height / 2 + 6, 3, 0, Math.PI * 2);
      ctx.fill();
    }

    ctx.restore();
  }

  /**
   * Draw Spikes (Duri / Penggaris Segitiga / Razia Trap)
   */
  static drawSpike(ctx, x, y, size = 20, direction = 'up') {
    ctx.save();
    ctx.translate(x, y);

    ctx.fillStyle = '#f43f5e'; // Crimson neon spike
    ctx.strokeStyle = '#ffffff';
    ctx.lineWidth = 1.5;

    ctx.beginPath();
    if (direction === 'up') {
      ctx.moveTo(0, size);
      ctx.lineTo(size / 2, 0);
      ctx.lineTo(size, size);
    } else if (direction === 'down') {
      ctx.moveTo(0, 0);
      ctx.lineTo(size / 2, size);
      ctx.lineTo(size, 0);
    } else if (direction === 'left') {
      ctx.moveTo(size, 0);
      ctx.lineTo(0, size / 2);
      ctx.lineTo(size, size);
    } else if (direction === 'right') {
      ctx.moveTo(0, 0);
      ctx.lineTo(size, size / 2);
      ctx.lineTo(0, size);
    }
    ctx.closePath();
    ctx.fill();
    ctx.stroke();

    ctx.restore();
  }
}

// Attach CharacterRenderer globally
window.CharacterRenderer = CharacterRenderer;
