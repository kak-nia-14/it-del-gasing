/**
 * SCHOOL SURFERS 3D - MASTER GAME ENGINE (THREE.JS)
 * 3-Lane Endless Runner Physics, Procedural School Track Spawner, School Bus Obstacles,
 * Cikgu Besar & Drone AI Chaser, 3D Number Cubes, and 10-Question Math Jetpack Mode.
 */

class SchoolSurfersEngine {
  constructor() {
    this.selectedCharName = 'bulbul';
    this.gameState = 'lobby'; // lobby, running, jetpack, gameover
    this.score = 0;
    this.numberBoxesCollected = 0;
    this.runSpeed = 16.0;
    this.baseSpeed = 16.0;
    this.maxSpeed = 34.0;
    this.distanceTraveled = 0;

    // 3-Lane Coordinates: -3.2 (Left), 0 (Center), 3.2 (Right)
    this.lanes = [-3.2, 0, 3.2];
    this.currentLane = 1; // 0 = Left, 1 = Center, 2 = Right
    this.targetX = 0;

    // Physics
    this.posY = 0;
    this.velocityY = 0;
    this.gravity = -26.0;
    this.jumpForce = 12.0;
    this.isGrounded = true;
    this.isSliding = false;
    this.slideTimer = 0;
    this.onBusRoof = false;

    // Chaser Stumble & Aggro state
    this.chaserDistance = 9.0;
    this.isStumbled = false;
    this.stumbleTimer = 0;

    // Active Spawner Collections
    this.chunks = [];
    this.obstacles = [];
    this.collectibles = [];
    this.particles = [];
    this.spawnZ = -20;
    this.chunkLength = 50;

    this.mathEngine = new SchoolSurfersMath();

    this.initDOM();
    this.initThree();
    this.initWorld();
    this.bindControls();
  }

  initDOM() {
    this.container = document.getElementById('gameContainer');
    this.lobbyOverlay = document.getElementById('lobbyOverlay');
    this.gameOverOverlay = document.getElementById('gameOverOverlay');
    this.scoreDisplay = document.getElementById('hudScore');
    this.coinsDisplay = document.getElementById('hudCoins');
    this.chaserWarning = document.getElementById('chaserWarningPill');

    // Character Selection
    document.querySelectorAll('.char-card').forEach(card => {
      card.addEventListener('click', (e) => {
        document.querySelectorAll('.char-card').forEach(c => c.classList.remove('selected'));
        const target = e.currentTarget;
        target.classList.add('selected');
        this.selectedCharName = target.dataset.char;
        this.mathEngine.playJumpSound();
      });
    });

    // Start Game Button
    document.getElementById('btnStartGame')?.addEventListener('click', () => {
      this.startGame();
    });

    // Restart Button
    document.getElementById('btnRestartGame')?.addEventListener('click', () => {
      this.startGame();
    });
  }

  initThree() {
    this.scene = new THREE.Scene();
    this.scene.background = new THREE.Color(0x38bdf8); // Sky blue
    this.scene.fog = new THREE.FogExp2(0x38bdf8, 0.012);

    this.camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 400);
    this.camera.position.set(0, 4.8, 8.5);

    this.renderer = new THREE.WebGLRenderer({
      canvas: document.getElementById('threeCanvas'),
      antialias: true
    });
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    this.renderer.shadowMap.enabled = true;
    this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;

    // Lighting
    const hemiLight = new THREE.HemisphereLight(0xffffff, 0x10b981, 0.65);
    hemiLight.position.set(0, 50, 0);
    this.scene.add(hemiLight);

    const dirLight = new THREE.DirectionalLight(0xfffaed, 1.2);
    dirLight.position.set(20, 40, 20);
    dirLight.castShadow = true;
    dirLight.shadow.mapSize.width = 1024;
    dirLight.shadow.mapSize.height = 1024;
    dirLight.shadow.camera.near = 0.5;
    dirLight.shadow.camera.far = 150;
    dirLight.shadow.camera.left = -25;
    dirLight.shadow.camera.right = 25;
    dirLight.shadow.camera.top = 25;
    dirLight.shadow.camera.bottom = -25;
    this.scene.add(dirLight);

    window.addEventListener('resize', () => this.onWindowResize());
  }

  onWindowResize() {
    this.camera.aspect = window.innerWidth / window.innerHeight;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(window.innerWidth, window.innerHeight);
  }

  initWorld() {
    // Player Character Group
    this.playerGroup = new THREE.Group();
    this.scene.add(this.playerGroup);

    // Chaser Group (Cikgu Besar & Drone)
    this.chaserGroup = new THREE.Group();
    this.cikguModel = SchoolSurfersModels.createCikguBesar();
    this.droneModel = SchoolSurfersModels.createDrone();
    this.droneModel.position.set(2.2, 3.2, 0);

    this.chaserGroup.add(this.cikguModel, this.droneModel);
    this.scene.add(this.chaserGroup);

    // Initial Ground Track Chunks
    for (let i = 0; i < 6; i++) {
      this.spawnTrackChunk();
    }

    this.lastFrameTime = performance.now();
    requestAnimationFrame((t) => this.gameLoop(t));
  }

  spawnTrackChunk() {
    const chunk = new THREE.Group();
    const zPos = this.spawnZ;

    // Red Athletic Rubber Track (3 Lanes)
    const trackGeo = new THREE.PlaneGeometry(10.5, this.chunkLength);
    const trackMat = new THREE.MeshLambertMaterial({ color: 0xbe123c }); // Brick red track
    const trackMesh = new THREE.Mesh(trackGeo, trackMat);
    trackMesh.rotation.x = -Math.PI / 2;
    trackMesh.receiveShadow = true;
    chunk.add(trackMesh);

    // White Lane Divider Lines
    [-1.6, 1.6].forEach(x => {
      const lineGeo = new THREE.PlaneGeometry(0.12, this.chunkLength);
      const lineMat = new THREE.MeshBasicMaterial({ color: 0xffffff });
      const lineMesh = new THREE.Mesh(lineGeo, lineMat);
      lineMesh.rotation.x = -Math.PI / 2;
      lineMesh.position.set(x, 0.02, 0);
      chunk.add(lineMesh);
    });

    // Sideline Green Grass Lawns
    const grassGeo = new THREE.PlaneGeometry(35, this.chunkLength);
    const grassMat = new THREE.MeshLambertMaterial({ color: 0x059669 });
    const leftGrass = new THREE.Mesh(grassGeo, grassMat);
    leftGrass.rotation.x = -Math.PI / 2;
    leftGrass.position.set(-22.75, -0.05, 0);
    leftGrass.receiveShadow = true;
    const rightGrass = new THREE.Mesh(grassGeo, grassMat);
    rightGrass.rotation.x = -Math.PI / 2;
    rightGrass.position.set(22.75, -0.05, 0);
    rightGrass.receiveShadow = true;
    chunk.add(leftGrass, rightGrass);

    // Sideline School Props (Trees, School Bleachers, Building Facade)
    for (let z = -this.chunkLength / 2; z < this.chunkLength / 2; z += 16) {
      // Trees
      const tree = this.createTree();
      tree.position.set(-8.5, 0, z);
      const tree2 = this.createTree();
      tree2.position.set(8.5, 0, z + 8);
      chunk.add(tree, tree2);
    }

    chunk.position.z = zPos;
    this.scene.add(chunk);
    this.chunks.push(chunk);

    // Spawn Obstacles & Collectibles on this chunk if not in initial safety zone
    if (this.spawnZ < -30) {
      this.populateChunk(zPos);
    }

    this.spawnZ -= this.chunkLength;
  }

  createTree() {
    const group = new THREE.Group();
    const trunk = new THREE.Mesh(new THREE.CylinderGeometry(0.25, 0.35, 2.5, 8), new THREE.MeshLambertMaterial({ color: 0x78350f }));
    trunk.position.y = 1.25;
    trunk.castShadow = true;
    const foliage = new THREE.Mesh(new THREE.ConeGeometry(1.6, 3.2, 8), new THREE.MeshLambertMaterial({ color: 0x15803d }));
    foliage.position.y = 3.6;
    foliage.castShadow = true;
    group.add(trunk, foliage);
    return group;
  }

  // Populate Chunk with School Buses, Hurdles, Desks, Number Cubes, and Jetpack
  populateChunk(chunkZ) {
    const lanePositions = [-3.2, 0, 3.2];

    // Decide pattern (Bus on one lane, hurdles on others, number cubes)
    for (let zOffset = -18; zOffset <= 18; zOffset += 16) {
      const zWorld = chunkZ + zOffset;
      const patternType = Math.random();

      if (patternType < 0.45) {
        // Pattern 1: School Bus on a random lane!
        const busLane = Math.floor(Math.random() * 3);
        const bus = SchoolSurfersModels.createSchoolBus();
        bus.position.set(lanePositions[busLane], 0, zWorld);
        this.scene.add(bus);
        this.obstacles.push({
          mesh: bus,
          type: 'bus',
          lane: busLane,
          x: lanePositions[busLane],
          z: zWorld,
          width: 2.6,
          height: 2.8,
          length: 7.8
        });

        // Coins on top of the bus roof!
        for (let cz = -2.5; cz <= 2.5; cz += 2.0) {
          const coin = SchoolSurfersModels.createNumberCube(Math.floor(Math.random() * 9) + 1);
          coin.position.set(lanePositions[busLane], 3.8, zWorld + cz);
          this.scene.add(coin);
          this.collectibles.push({ mesh: coin, x: lanePositions[busLane], y: 3.8, z: zWorld + cz, type: 'numberCube' });
        }
      } else if (patternType < 0.75) {
        // Pattern 2: Hurdles / Desks / Low Banner
        const obsLane = Math.floor(Math.random() * 3);
        const isBanner = Math.random() > 0.5;
        const obstacleMesh = isBanner ? SchoolSurfersModels.createLowBanner() : SchoolSurfersModels.createHurdle();
        obstacleMesh.position.set(lanePositions[obsLane], 0, zWorld);
        this.scene.add(obstacleMesh);

        this.obstacles.push({
          mesh: obstacleMesh,
          type: isBanner ? 'lowBanner' : 'hurdle',
          lane: obsLane,
          x: lanePositions[obsLane],
          z: zWorld,
          width: 2.2,
          height: isBanner ? 3.0 : 1.0,
          length: 1.0
        });

        // Number Cubes on free lanes
        const freeLane = (obsLane + 1) % 3;
        for (let cz = -3; cz <= 3; cz += 2.0) {
          const coin = SchoolSurfersModels.createNumberCube(Math.floor(Math.random() * 9) + 1);
          coin.position.set(lanePositions[freeLane], 1.2, zWorld + cz);
          this.scene.add(coin);
          this.collectibles.push({ mesh: coin, x: lanePositions[freeLane], y: 1.2, z: zWorld + cz, type: 'numberCube' });
        }
      } else {
        // Pattern 3: Arc of Number Cubes or Jetpack
        const isJetpack = Math.random() < 0.22;
        const lane = Math.floor(Math.random() * 3);

        if (isJetpack) {
          const jetpackMesh = SchoolSurfersModels.createJetpackPickup();
          jetpackMesh.position.set(lanePositions[lane], 1.4, zWorld);
          this.scene.add(jetpackMesh);
          this.collectibles.push({ mesh: jetpackMesh, x: lanePositions[lane], y: 1.4, z: zWorld, type: 'jetpack' });
        } else {
          for (let cz = -4; cz <= 4; cz += 2.0) {
            const coin = SchoolSurfersModels.createNumberCube(Math.floor(Math.random() * 9) + 1);
            coin.position.set(lanePositions[lane], 1.2, zWorld + cz);
            this.scene.add(coin);
            this.collectibles.push({ mesh: coin, x: lanePositions[lane], y: 1.2, z: zWorld + cz, type: 'numberCube' });
          }
        }
      }
    }
  }

  bindControls() {
    window.addEventListener('keydown', (e) => {
      if (this.gameState === 'running') {
        if (e.code === 'ArrowLeft' || e.code === 'KeyA') {
          this.changeLane(-1);
        } else if (e.code === 'ArrowRight' || e.code === 'KeyD') {
          this.changeLane(1);
        } else if (e.code === 'ArrowUp' || e.code === 'KeyW' || e.code === 'Space') {
          this.jump();
        } else if (e.code === 'ArrowDown' || e.code === 'KeyS') {
          this.slide();
        }
      } else if (this.gameState === 'jetpack') {
        // Math Quick Answer Keys 1, 2, 3
        if (e.key === '1' || e.key === '2' || e.key === '3') {
          const idx = parseInt(e.key) - 1;
          const btns = document.querySelectorAll('.math-option-btn');
          if (btns[idx]) btns[idx].click();
        }
      }
    });

    // Mobile Virtual Touch Buttons
    document.getElementById('touchLeft')?.addEventListener('click', () => this.changeLane(-1));
    document.getElementById('touchRight')?.addEventListener('click', () => this.changeLane(1));
    document.getElementById('touchJump')?.addEventListener('click', () => this.jump());
    document.getElementById('touchSlide')?.addEventListener('click', () => this.slide());

    // Swipe Gestures
    let touchStartX = 0;
    let touchStartY = 0;
    window.addEventListener('touchstart', (e) => {
      touchStartX = e.changedTouches[0].screenX;
      touchStartY = e.changedTouches[0].screenY;
    });

    window.addEventListener('touchend', (e) => {
      const dx = e.changedTouches[0].screenX - touchStartX;
      const dy = e.changedTouches[0].screenY - touchStartY;
      if (Math.abs(dx) > Math.abs(dy)) {
        if (dx > 40) this.changeLane(1);
        else if (dx < -40) this.changeLane(-1);
      } else {
        if (dy < -40) this.jump();
        else if (dy > 40) this.slide();
      }
    });
  }

  changeLane(direction) {
    const target = this.currentLane + direction;
    if (target >= 0 && target <= 2) {
      this.currentLane = target;
      this.targetX = this.lanes[this.currentLane];
      this.mathEngine.playJumpSound();
    }
  }

  jump() {
    if (this.isGrounded) {
      this.velocityY = this.jumpForce;
      this.isGrounded = false;
      this.isSliding = false;
      this.mathEngine.playJumpSound();
    }
  }

  slide() {
    this.isSliding = true;
    this.slideTimer = 0.75; // 0.75s slide duration
    if (!this.isGrounded) {
      this.velocityY = -18.0; // Fast drop slam
    }
    this.mathEngine.playSlideSound();
  }

  startGame() {
    this.gameState = 'running';
    this.score = 0;
    this.numberBoxesCollected = 0;
    this.runSpeed = this.baseSpeed;
    this.distanceTraveled = 0;
    this.currentLane = 1;
    this.targetX = 0;
    this.posY = 0;
    this.velocityY = 0;
    this.isGrounded = true;
    this.isSliding = false;
    this.onBusRoof = false;
    this.chaserDistance = 9.0;
    this.isStumbled = false;

    // Build chosen Character Mesh
    this.playerGroup.clear();
    this.activeCharacterMesh = (this.selectedCharName === 'bekbek')
      ? SchoolSurfersModels.createBekbek()
      : SchoolSurfersModels.createBulbul();
    this.playerGroup.add(this.activeCharacterMesh);

    // Reset Chasers
    this.chaserGroup.position.set(0, 0, 9.0);

    // Clear dynamic scene objects
    this.obstacles.forEach(o => this.scene.remove(o.mesh));
    this.obstacles = [];
    this.collectibles.forEach(c => this.scene.remove(c.mesh));
    this.collectibles = [];
    this.chunks.forEach(ch => this.scene.remove(ch));
    this.chunks = [];
    this.spawnZ = 0;

    for (let i = 0; i < 6; i++) {
      this.spawnTrackChunk();
    }

    this.playerGroup.position.set(0, 0, 0);

    this.lobbyOverlay.classList.add('hidden');
    this.gameOverOverlay.classList.add('hidden');
    document.getElementById('mathJetpackOverlay').style.display = 'none';
  }

  // =========================================================================
  // MAIN 3D GAME LOOP
  // =========================================================================
  gameLoop(currentTime) {
    const dt = Math.min(0.05, (currentTime - this.lastFrameTime) / 1000);
    this.lastFrameTime = currentTime;

    if (this.gameState === 'running') {
      this.updateRunning(dt);
    } else if (this.gameState === 'jetpack') {
      this.updateJetpack(dt);
    }

    this.render3D(dt);
    requestAnimationFrame((t) => this.gameLoop(t));
  }

  updateRunning(dt) {
    // Increase speed gradually
    this.runSpeed = Math.min(this.maxSpeed, this.runSpeed + dt * 0.15);
    this.distanceTraveled += this.runSpeed * dt;
    this.score += Math.floor(this.runSpeed * dt * 2.5);

    // Update HUD
    if (this.scoreDisplay) this.scoreDisplay.textContent = `${this.score} PTS`;
    if (this.coinsDisplay) this.coinsDisplay.textContent = `${this.numberBoxesCollected}`;

    // Lane Interpolation (Lerp)
    this.playerGroup.position.x += (this.targetX - this.playerGroup.position.x) * 14 * dt;
    this.playerGroup.rotation.z = (this.targetX - this.playerGroup.position.x) * -0.08; // Lean on turn

    // Vertical Gravity & Jump Physics
    this.velocityY += this.gravity * dt;
    this.posY += this.velocityY * dt;

    // Check Ground or Bus Roof Height
    const groundLevel = this.onBusRoof ? 2.85 : 0;
    if (this.posY <= groundLevel) {
      this.posY = groundLevel;
      this.velocityY = 0;
      this.isGrounded = true;
    }

    this.playerGroup.position.y = this.posY;
    this.playerGroup.position.z -= this.runSpeed * dt;

    // Sliding Timer
    if (this.isSliding) {
      this.slideTimer -= dt;
      this.playerGroup.scale.set(1.0, 0.45, 1.3);
      if (this.slideTimer <= 0) {
        this.isSliding = false;
        this.playerGroup.scale.set(1, 1, 1);
      }
    } else {
      this.playerGroup.scale.set(1, 1, 1);
    }

    // Move Chaser Behind Player
    const targetChaserDist = this.isStumbled ? 3.0 : 8.5;
    this.chaserDistance += (targetChaserDist - this.chaserDistance) * 3 * dt;
    this.chaserGroup.position.set(this.playerGroup.position.x * 0.85, 0, this.playerGroup.position.z + this.chaserDistance);

    // Drone rotor animation
    if (this.droneModel.userData.rotors) {
      this.droneModel.userData.rotors.forEach(r => r.rotation.y += 24 * dt);
    }

    // Stumble timer recovery
    if (this.isStumbled) {
      this.stumbleTimer -= dt;
      if (this.stumbleTimer <= 0) {
        this.isStumbled = false;
        if (this.chaserWarning) this.chaserWarning.style.display = 'none';
      }
    }

    // Collision Detection & World Processing
    this.checkCollisions();
    this.updateTrackChunks();
    this.animatePlayerLimbs(dt);
  }

  // =========================================================================
  // JETPACK FLIGHT & 10-QUESTION MATH MODE
  // =========================================================================
  triggerJetpackMode() {
    this.gameState = 'jetpack';
    this.isSliding = false;
    this.playerGroup.scale.set(1, 1, 1);

    // Fly high into the clouds!
    this.targetY = 16.0;

    // Launch 10 Math Questions
    this.mathEngine.startJetpackChallenge(
      () => {
        // Complete 10 Math Questions successfully!
        this.score += 5000;
        this.landFromJetpack();
      },
      (failReason) => {
        // Failed math question -> Game Over!
        this.triggerGameOver(failReason);
      }
    );
  }

  updateJetpack(dt) {
    this.distanceTraveled += this.runSpeed * dt * 1.5;
    this.score += Math.floor(this.runSpeed * dt * 4);

    if (this.scoreDisplay) this.scoreDisplay.textContent = `${this.score} PTS`;
    if (this.coinsDisplay) this.coinsDisplay.textContent = `${this.numberBoxesCollected}`;

    // Smooth climb to sky height Y = 16
    this.playerGroup.position.y += (16.0 - this.playerGroup.position.y) * 4 * dt;
    this.playerGroup.position.z -= this.runSpeed * dt * 1.2;

    this.updateTrackChunks();
  }

  landFromJetpack() {
    const overlay = document.getElementById('mathJetpackOverlay');
    if (overlay) overlay.style.display = 'none';

    this.gameState = 'running';
    this.posY = 16.0;
    this.velocityY = -6.0;
    this.isGrounded = false;
    this.mathEngine.playJumpSound();
  }

  // Check Collisions with School Buses, Hurdles, and Collectibles
  checkCollisions() {
    const playerZ = this.playerGroup.position.z;
    const playerX = this.playerGroup.position.x;
    const playerY = this.playerGroup.position.y;

    this.onBusRoof = false;

    // 1. Obstacle Collisions
    for (let i = 0; i < this.obstacles.length; i++) {
      const obs = this.obstacles[i];
      const dz = Math.abs(playerZ - obs.z);
      const dx = Math.abs(playerX - obs.x);

      if (dz < obs.length / 2 + 0.6 && dx < obs.width / 2 + 0.4) {
        if (obs.type === 'bus') {
          // Check if player is on top of the bus roof!
          if (playerY >= 2.6) {
            this.onBusRoof = true;
          } else {
            // Slammed into bus front/side -> Game Over!
            this.triggerGameOver('Menabrak Bus Sekolah! Cikgu Besar memberi sanksi pelanggaran tata tertib!');
            return;
          }
        } else if (obs.type === 'hurdle' || obs.type === 'desk') {
          if (playerY < 1.1) {
            this.handleObstacleHit('Tersandung meja & pagar rintangan sekolah!');
          }
        } else if (obs.type === 'lowBanner') {
          if (!this.isSliding) {
            this.handleObstacleHit('Menabrak spanduk sekolah karena tidak meluncur (slide)!');
          }
        }
      }
    }

    // 2. Collectibles (Kotak Angka & Jetpack)
    for (let i = this.collectibles.length - 1; i >= 0; i--) {
      const col = this.collectibles[i];
      const dz = Math.abs(playerZ - col.z);
      const dx = Math.abs(playerX - col.x);
      const dy = Math.abs(playerY - col.y);

      if (dz < 1.4 && dx < 1.4 && dy < 1.8) {
        if (col.type === 'numberCube') {
          this.numberBoxesCollected++;
          this.score += 250;
          this.mathEngine.playCoinSound();
        } else if (col.type === 'jetpack') {
          this.triggerJetpackMode();
        }

        // Remove from scene
        this.scene.remove(col.mesh);
        this.collectibles.splice(i, 1);
      }
    }
  }

  handleObstacleHit(reason) {
    if (this.isStumbled) {
      // Second hit while pursued closely -> Caught!
      this.triggerGameOver(`${reason} Cikgu Besar berhasil menangkapmu!`);
    } else {
      // First stumble -> Cikgu Besar rushes right behind!
      this.isStumbled = true;
      this.stumbleTimer = 5.0; // 5s stumble aggro
      this.mathEngine.playSlideSound();
      if (this.chaserWarning) {
        this.chaserWarning.style.display = 'flex';
        this.chaserWarning.textContent = '⚠️ CIKGU BESAR & DRONE MENDEKAT! LARI LEBIH CEPAT!';
      }
    }
  }

  triggerGameOver(reason) {
    this.gameState = 'gameover';
    this.mathEngine.playWrongSound();

    if (this.chaserWarning) this.chaserWarning.style.display = 'none';
    const overlay = this.gameOverOverlay;
    const reasonEl = document.getElementById('gameOverReason');
    const finalScoreEl = document.getElementById('finalScoreText');
    const finalCoinsEl = document.getElementById('finalCoinsText');
    const finalDistEl = document.getElementById('finalDistText');

    if (reasonEl) reasonEl.textContent = reason;
    if (finalScoreEl) finalScoreEl.textContent = `${this.score} PTS`;
    if (finalCoinsEl) finalCoinsEl.textContent = `${this.numberBoxesCollected} Kotak`;
    if (finalDistEl) finalDistEl.textContent = `${Math.floor(this.distanceTraveled)}m`;

    overlay.classList.remove('hidden');
  }

  updateTrackChunks() {
    const playerZ = this.playerGroup.position.z;

    // Remove old chunks far behind
    if (this.chunks.length > 0 && this.chunks[0].position.z > playerZ + 40) {
      const oldChunk = this.chunks.shift();
      this.scene.remove(oldChunk);
      this.spawnTrackChunk();
    }

    // Rotate Number Cubes
    this.collectibles.forEach(c => {
      if (c.mesh && c.mesh.userData.cubeMesh) {
        c.mesh.userData.cubeMesh.rotation.y += 0.04;
        c.mesh.userData.cubeMesh.rotation.x += 0.02;
      }
    });
  }

  // Animate Player Limbs & Running Cadence
  animatePlayerLimbs(dt) {
    if (!this.activeCharacterMesh || !this.activeCharacterMesh.userData) return;
    const data = this.activeCharacterMesh.userData;

    if (this.isGrounded && !this.isSliding) {
      const runCycle = this.distanceTraveled * 0.8;
      if (data.leftArm) data.leftArm.rotation.x = Math.sin(runCycle) * 0.7;
      if (data.rightArm) data.rightArm.rotation.x = -Math.sin(runCycle) * 0.7;
      if (data.leftLeg) data.leftLeg.rotation.x = -Math.sin(runCycle) * 0.8;
      if (data.rightLeg) data.rightLeg.rotation.x = Math.sin(runCycle) * 0.8;
      this.activeCharacterMesh.rotation.x = 0.08; // slight forward lean
    } else if (!this.isGrounded) {
      // Jump pose
      if (data.leftLeg) data.leftLeg.rotation.x = 0.6;
      if (data.rightLeg) data.rightLeg.rotation.x = -0.6;
      if (data.leftArm) data.leftArm.rotation.x = 1.2;
      if (data.rightArm) data.rightArm.rotation.x = 1.2;
    }

    // Cikgu Besar Running Animation
    if (this.cikguModel && this.cikguModel.userData) {
      const cData = this.cikguModel.userData;
      const cCycle = this.distanceTraveled * 0.8;
      if (cData.leftArm) cData.leftArm.rotation.x = Math.sin(cCycle) * 0.6;
      if (cData.rightArm) cData.rightArm.rotation.x = -Math.sin(cCycle) * 0.6;
      if (cData.leftLeg) cData.leftLeg.rotation.x = -Math.sin(cCycle) * 0.7;
      if (cData.rightLeg) cData.rightLeg.rotation.x = Math.sin(cCycle) * 0.7;
    }
  }

  render3D(dt) {
    // Camera Tracking Follow Player
    if (this.gameState === 'jetpack') {
      this.camera.position.x += (this.playerGroup.position.x - this.camera.position.x) * 6 * dt;
      this.camera.position.y += (this.playerGroup.position.y + 3.0 - this.camera.position.y) * 4 * dt;
      this.camera.position.z = this.playerGroup.position.z + 10.0;
      this.camera.lookAt(this.playerGroup.position.x, this.playerGroup.position.y + 0.5, this.playerGroup.position.z - 12);
    } else {
      this.camera.position.x += (this.playerGroup.position.x - this.camera.position.x) * 10 * dt;
      this.camera.position.y += (this.playerGroup.position.y + 4.6 - this.camera.position.y) * 8 * dt;
      this.camera.position.z = this.playerGroup.position.z + 8.5;
      this.camera.lookAt(this.playerGroup.position.x, this.playerGroup.position.y + 1.8, this.playerGroup.position.z - 10);
    }

    this.renderer.render(this.scene, this.camera);
  }
}
