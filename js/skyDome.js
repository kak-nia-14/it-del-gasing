/**
 * SkyViewDel - 3D 360° Celestial Sky Dome Engine (Three.js)
 * Kubah langit dinamis real-time, siluet horizon pengamat di tanah,
 * 5.000+ bintang berkedip, galaksi Bima Sakti, planet 3D dengan cincin, rasi bintang bercahaya,
 * serta raycasting interaktif & smooth camera focus.
 */

import { CELESTIAL_DATA, getCartesianPosition } from './celestialData.js';

export class SkyDomeEngine {
  constructor(canvasContainerId, onObjectSelectedCallback) {
    this.container = document.getElementById(canvasContainerId);
    this.onObjectSelected = onObjectSelectedCallback;

    this.scene = null;
    this.camera = null;
    this.renderer = null;
    this.controls = null;
    this.raycaster = new THREE.Raycaster();
    this.mouse = new THREE.Vector2();

    // Visual elements
    this.skyDomeMesh = null;
    this.starPoints = null;
    this.milkyWayMesh = null;
    this.interactiveObjects = []; // Mesh yang dapat diklik
    this.constellationLines = [];
    this.labelSprites = [];
    this.horizonGroup = null;

    // Time & Sky configuration
    this.currentHour = new Date().getHours() + new Date().getMinutes() / 60;
    this.isRealTimeSync = true;
    this.isTelescopeMode = false;
    this.showConstellations = true;
    this.showLabels = true;
    this.showPlanets = true;
    this.showStars = true;
    this.showGrid = false;

    // Animation & Tweens
    this.clock = new THREE.Clock();
    this.cameraTarget = new THREE.Vector3(0, 0, 0);
    this.isTransitioning = false;
    this.hoveredObject = null;

    this.init();
  }

  init() {
    // 1. Scene
    this.scene = new THREE.Scene();
    this.scene.fog = new THREE.FogExp2(0x050b14, 0.0008);

    // 2. Camera: Posisi pengamat di tanah (0, 1.7, 0)
    const aspect = window.innerWidth / window.innerHeight;
    this.camera = new THREE.PerspectiveCamera(70, aspect, 0.1, 2000);
    this.camera.position.set(0, 1.7, 0.1);

    // 3. Renderer dengan antialias & tone mapping
    this.renderer = new THREE.WebGLRenderer({ antialias: true, alpha: false, powerPreference: 'high-performance' });
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    this.renderer.toneMapping = THREE.ACESFilmicToneMapping;
    this.renderer.toneMappingExposure = 1.1;
    this.container.appendChild(this.renderer.domElement);

    // 4. OrbitControls untuk 360° Observer View
    this.controls = new THREE.OrbitControls(this.camera, this.renderer.domElement);
    this.controls.target.set(0, 50, -100); // Awalnya memandang ke atas langit utara
    this.controls.enableDamping = true;
    this.controls.dampingFactor = 0.05;
    this.controls.rotateSpeed = -0.45; // Natural look-around
    this.controls.enableZoom = true;
    this.controls.minDistance = 0.05;
    this.controls.maxDistance = 1.0;
    // Batas sudut pandang: jangan bisa tembus ke bawah tanah (maks 96 derajat dari atas)
    this.controls.minPolarAngle = THREE.MathUtils.degToRad(5); // Puncak langit (zenith)
    this.controls.maxPolarAngle = THREE.MathUtils.degToRad(98); // Horizon tanah

    // 5. Build Scene Elements
    this.createSkyDome();
    this.createStarField();
    this.createMilkyWay();
    this.createHorizonLandscape();
    this.createCelestialObjects();
    this.createConstellations();
    this.createAltAzimuthGrid();

    // 6. Lighting
    this.ambientLight = new THREE.AmbientLight(0xffffff, 0.2);
    this.scene.add(this.ambientLight);

    // 7. Event Listeners
    window.addEventListener('resize', () => this.onWindowResize());
    this.renderer.domElement.addEventListener('pointerdown', (e) => this.onPointerDown(e));
    this.renderer.domElement.addEventListener('pointermove', (e) => this.onPointerMove(e));

    // Update initial sky color according to current time
    this.updateSkyByHour(this.currentHour);

    // 8. Start Render Loop
    this.animate();
  }

  // Membuat kubah langit dinamis (Dynamic Atmospheric Sky Dome)
  createSkyDome() {
    const domeGeometry = new THREE.SphereGeometry(600, 32, 32);
    domeGeometry.scale(-1, 1, 1); // Render sisi dalam bola

    // Custom atmospheric vertex & fragment shaders
    this.skyMaterial = new THREE.ShaderMaterial({
      uniforms: {
        topColor: { value: new THREE.Color(0x02040a) },
        horizonColor: { value: new THREE.Color(0x0c1a30) },
        sunPosition: { value: new THREE.Vector3(0, 1, 0) },
        sunColor: { value: new THREE.Color(0xfff3d1) },
        sunIntensity: { value: 0.0 },
        timeOfDay: { value: 0.0 }, // 0 (malam) - 1 (siang)
        offset: { value: 20 },
        exponent: { value: 0.7 }
      },
      vertexShader: `
        varying vec3 vWorldPosition;
        void main() {
          vec4 worldPosition = modelMatrix * vec4(position, 1.0);
          vWorldPosition = worldPosition.xyz;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        uniform vec3 topColor;
        uniform vec3 horizonColor;
        uniform vec3 sunPosition;
        uniform vec3 sunColor;
        uniform float sunIntensity;
        uniform float timeOfDay;
        uniform float offset;
        uniform float exponent;
        varying vec3 vWorldPosition;

        void main() {
          float h = normalize(vWorldPosition + offset).y;
          float factor = max(pow(max(h, 0.0), exponent), 0.0);
          vec3 skyGrad = mix(horizonColor, topColor, factor);

          // Efek pendaran cahaya matahari (Atmospheric Sun Flare)
          vec3 normPos = normalize(vWorldPosition);
          float sunDot = max(dot(normPos, normalize(sunPosition)), 0.0);
          float sunDisk = pow(sunDot, 64.0) * sunIntensity * 2.0;
          float sunGlow = pow(sunDot, 8.0) * sunIntensity * 0.8;

          vec3 finalColor = skyGrad + (sunColor * (sunDisk + sunGlow));
          gl_FragColor = vec4(finalColor, 1.0);
        }
      `,
      side: THREE.BackSide,
      depthWrite: false
    });

    this.skyDomeMesh = new THREE.Mesh(domeGeometry, this.skyMaterial);
    this.scene.add(this.skyDomeMesh);
  }

  // Partikel bintang berkedip (Twinkling Starfield)
  createStarField() {
    const starCount = 4500;
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(starCount * 3);
    const colors = new Float32Array(starCount * 3);
    const sizes = new Float32Array(starCount);

    const starColorPalette = [
      new THREE.Color(0xffffff), // Putih murni
      new THREE.Color(0xb0e0e6), // Biru muda
      new THREE.Color(0xfff0f5), // Lavender soft
      new THREE.Color(0xffe4b5), // Kuning keemasan
      new THREE.Color(0xffb6c1)  // Pink hangat
    ];

    for (let i = 0; i < starCount; i++) {
      // Distribusi di kubah langit atas (y > 0)
      const u = Math.random();
      const v = Math.random();
      const theta = u * 2.0 * Math.PI;
      const phi = Math.acos(2.0 * v - 1.0) * 0.52; // Hanya belahan atas & sedikit bawah horizon

      const radius = 550 + (Math.random() - 0.5) * 40;
      const x = radius * Math.sin(phi) * Math.cos(theta);
      const y = Math.max(5, radius * Math.cos(phi)); // Pastikan berada di atas horizon
      const z = radius * Math.sin(phi) * Math.sin(theta);

      positions[i * 3] = x;
      positions[i * 3 + 1] = y;
      positions[i * 3 + 2] = z;

      const baseCol = starColorPalette[Math.floor(Math.random() * starColorPalette.length)];
      colors[i * 3] = baseCol.r;
      colors[i * 3 + 1] = baseCol.g;
      colors[i * 3 + 2] = baseCol.b;

      sizes[i] = Math.random() * 2.2 + 0.8;
    }

    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));
    geometry.setAttribute('size', new THREE.BufferAttribute(sizes, 1));

    // Custom Star Shader dengan efek Twinkle
    this.starMaterial = new THREE.ShaderMaterial({
      uniforms: {
        time: { value: 0.0 },
        starAlpha: { value: 1.0 } // Dikontrol oleh siang/malam
      },
      vertexShader: `
        attribute float size;
        attribute vec3 color;
        varying vec3 vColor;
        varying float vTwinkle;
        uniform float time;

        void main() {
          vColor = color;
          // Frekuensi kedipan unik per posisi
          float twinkle = sin(time * 2.5 + position.x * 0.1 + position.z * 0.1) * 0.35 + 0.65;
          vTwinkle = twinkle;

          vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
          gl_PointSize = size * twinkle * (300.0 / -mvPosition.z);
          gl_Position = projectionMatrix * mvPosition;
        }
      `,
      fragmentShader: `
        varying vec3 vColor;
        varying float vTwinkle;
        uniform float starAlpha;

        void main() {
          // Circular particle shape dengan soft glow
          vec2 center = gl_PointCoord - vec2(0.5);
          float dist = length(center);
          if (dist > 0.5) discard;

          float intensity = 1.0 - smoothstep(0.0, 0.5, dist);
          gl_FragColor = vec4(vColor, intensity * starAlpha * vTwinkle);
        }
      `,
      transparent: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false
    });

    this.starPoints = new THREE.Points(geometry, this.starMaterial);
    this.scene.add(this.starPoints);
  }

  // Pita Galaksi Bima Sakti (Milky Way Stream)
  createMilkyWay() {
    const particleCount = 2000;
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount; i++) {
      const t = (i / particleCount) * Math.PI - Math.PI / 2;
      const angle = t * 1.2;
      const radius = 530;

      // Jalur melengkung melintasi langit malam
      const spread = (Math.random() - 0.5) * 70;
      const spreadY = (Math.random() - 0.5) * 50;

      const x = Math.cos(angle) * radius + spread;
      const y = Math.sin(t + Math.PI / 2) * 450 + spreadY + 40;
      const z = Math.sin(angle) * radius + spread;

      positions[i * 3] = x;
      positions[i * 3 + 1] = Math.max(10, y);
      positions[i * 3 + 2] = z;

      // Warna nebula violet & cyan kosmik
      const isViolet = Math.random() > 0.4;
      const col = isViolet ? new THREE.Color(0xa855f7) : new THREE.Color(0x38bdf8);
      colors[i * 3] = col.r * 0.8;
      colors[i * 3 + 1] = col.g * 0.8;
      colors[i * 3 + 2] = col.b * 0.8;
    }

    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    const material = new THREE.PointsMaterial({
      size: 16,
      vertexColors: true,
      transparent: true,
      opacity: 0.45,
      blending: THREE.AdditiveBlending,
      depthWrite: false
    });

    this.milkyWayMesh = new THREE.Points(geometry, material);
    this.scene.add(this.milkyWayMesh);
  }

  // Siluet tanah & lanskap horizon 360° pengamat di bumi
  createHorizonLandscape() {
    this.horizonGroup = new THREE.Group();

    // 1. Piringan tanah dasar pengamat
    const groundGeo = new THREE.CircleGeometry(350, 64);
    const groundMat = new THREE.MeshBasicMaterial({ color: 0x050b14, side: THREE.DoubleSide });
    const groundMesh = new THREE.Mesh(groundGeo, groundMat);
    groundMesh.rotation.x = Math.PI / 2;
    groundMesh.position.y = -0.5;
    this.horizonGroup.add(groundMesh);

    // 2. Siluet pegunungan & pohon di sekeliling horizon
    const segs = 90;
    const ringRadius = 340;
    const hillGeo = new THREE.BufferGeometry();
    const hillVerts = [];
    const hillIndices = [];

    for (let i = 0; i <= segs; i++) {
      const angle = (i / segs) * Math.PI * 2;
      const x = Math.sin(angle) * ringRadius;
      const z = Math.cos(angle) * ringRadius;

      // Variasi ketinggian bukit siluet
      const hillHeight = Math.sin(angle * 4) * 8 + Math.cos(angle * 7) * 5 + Math.sin(angle * 12) * 3 + 14;

      // Vertex dasar (bawah)
      hillVerts.push(x, -2, z);
      // Vertex puncak bukit (atas)
      hillVerts.push(x, hillHeight, z);
    }

    for (let i = 0; i < segs; i++) {
      const b1 = i * 2;
      const t1 = i * 2 + 1;
      const b2 = (i + 1) * 2;
      const t2 = (i + 1) * 2 + 1;

      hillIndices.push(b1, t1, b2);
      hillIndices.push(b2, t1, t2);
    }

    hillGeo.setAttribute('position', new THREE.Float32BufferAttribute(hillVerts, 3));
    hillGeo.setIndex(hillIndices);
    hillGeo.computeVertexNormals();

    const hillMat = new THREE.MeshBasicMaterial({ color: 0x020617, side: THREE.DoubleSide });
    const hillMesh = new THREE.Mesh(hillGeo, hillMat);
    this.horizonGroup.add(hillMesh);

    // 3. Penanda Mata Angin Horizon (U, T, S, B / N, E, S, W)
    const directions = [
      { text: 'U (Utara / 0°)', angle: 0, color: '#38bdf8' },
      { text: 'T (Timur / 90°)', angle: 90, color: '#fbbf24' },
      { text: 'S (Selatan / 180°)', angle: 180, color: '#f43f5e' },
      { text: 'B (Barat / 270°)', angle: 270, color: '#a855f7' }
    ];

    directions.forEach(dir => {
      const rad = THREE.MathUtils.degToRad(dir.angle);
      const sprite = this.createLabelSprite(dir.text, dir.color, 18, true);
      const dist = 300;
      sprite.position.set(Math.sin(rad) * dist, 6, -Math.cos(rad) * dist);
      this.horizonGroup.add(sprite);
    });

    this.scene.add(this.horizonGroup);
  }

  // Membuat Planet & Bintang Utama Interaktif 3D
  createCelestialObjects() {
    // 1. Planet & Matahari & Bulan
    CELESTIAL_DATA.planets.forEach(p => {
      const pos = getCartesianPosition(p.azimuth, p.altitude, 420);
      const group = new THREE.Group();
      group.position.set(pos.x, pos.y, pos.z);
      group.userData = { ...p, isCelestialObject: true };

      // Mesh Planet Utama
      const planetGeo = new THREE.SphereGeometry(p.radius * 1.8, 32, 32);
      let planetMat;

      if (p.id === 'sun') {
        planetMat = new THREE.MeshBasicMaterial({ color: new THREE.Color(p.baseColor) });
        // Corona Glow
        const coronaGeo = new THREE.SphereGeometry(p.coronaSize * 1.8, 24, 24);
        const coronaMat = new THREE.MeshBasicMaterial({
          color: new THREE.Color(p.glowColor),
          transparent: true,
          opacity: 0.35,
          side: THREE.BackSide,
          blending: THREE.AdditiveBlending
        });
        const coronaMesh = new THREE.Mesh(coronaGeo, coronaMat);
        group.add(coronaMesh);
      } else {
        planetMat = new THREE.MeshStandardMaterial({
          color: new THREE.Color(p.baseColor),
          roughness: 0.5,
          metalness: 0.1,
          emissive: new THREE.Color(p.baseColor),
          emissiveIntensity: 0.3
        });
      }

      const planetMesh = new THREE.Mesh(planetGeo, planetMat);
      group.add(planetMesh);

      // Cincin Saturnus / Uranus
      if (p.hasRings) {
        const ringGeo = new THREE.RingGeometry(p.ringInner * 1.8, p.ringOuter * 1.8, 48);
        const ringMat = new THREE.MeshBasicMaterial({
          color: new THREE.Color(p.glowColor),
          side: THREE.DoubleSide,
          transparent: true,
          opacity: 0.85
        });
        const ringMesh = new THREE.Mesh(ringGeo, ringMat);
        ringMesh.rotation.x = Math.PI / 2.3;
        ringMesh.rotation.y = 0.3;
        group.add(ringMesh);
      }

      // Halo Glow Sprite
      const glowSprite = this.createGlowSprite(p.glowColor, p.radius * 6);
      group.add(glowSprite);

      // Label Nama
      const labelSprite = this.createLabelSprite(p.name.split(' (')[0], p.glowColor, 15);
      labelSprite.position.y = p.radius * 2.8 + 4;
      group.add(labelSprite);
      this.labelSprites.push(labelSprite);

      this.scene.add(group);
      this.interactiveObjects.push(planetMesh);
      planetMesh.parentGroup = group;
    });

    // 2. Bintang Utama Terkenal (Sirius, Betelgeuse, Rigel, Polaris, Vega, dll.)
    CELESTIAL_DATA.stars.forEach(s => {
      const pos = getCartesianPosition(s.azimuth, s.altitude, 440);
      const group = new THREE.Group();
      group.position.set(pos.x, pos.y, pos.z);
      group.userData = { ...s, isCelestialObject: true };

      // Star Core Sphere
      const starGeo = new THREE.SphereGeometry(s.radius * 1.5, 16, 16);
      const starMat = new THREE.MeshBasicMaterial({ color: new THREE.Color(s.baseColor) });
      const starMesh = new THREE.Mesh(starGeo, starMat);
      group.add(starMesh);

      // Star Burst Spike / Halo
      const glow = this.createGlowSprite(s.glowColor, s.radius * 9);
      group.add(glow);

      // Label Nama Bintang
      const label = this.createLabelSprite(s.name.split(' (')[0], s.glowColor, 14);
      label.position.y = s.radius * 2.5 + 3;
      group.add(label);
      this.labelSprites.push(label);

      this.scene.add(group);
      this.interactiveObjects.push(starMesh);
      starMesh.parentGroup = group;
    });

    // 3. Bintang Pembentuk Rasi Tambahan
    if (CELESTIAL_DATA.constellationStars) {
      CELESTIAL_DATA.constellationStars.forEach(cs => {
        const pos = getCartesianPosition(cs.azimuth, cs.altitude, 440);
        const group = new THREE.Group();
        group.position.set(pos.x, pos.y, pos.z);
        group.userData = { ...cs, isCelestialObject: true, category: 'Bintang Rasi' };

        const starGeo = new THREE.SphereGeometry(cs.radius * 1.2, 12, 12);
        const starMat = new THREE.MeshBasicMaterial({ color: new THREE.Color(cs.baseColor) });
        const starMesh = new THREE.Mesh(starGeo, starMat);
        group.add(starMesh);

        const glow = this.createGlowSprite(cs.glowColor, cs.radius * 6);
        group.add(glow);

        this.scene.add(group);
        this.interactiveObjects.push(starMesh);
        starMesh.parentGroup = group;
      });
    }
  }

  // Membuat Garis & Label Rasi Bintang
  createConstellations() {
    // Map ID ke posisi 3D
    const starMap = new Map();

    // Daftarkan semua bintang utama & bintang rasi
    [...CELESTIAL_DATA.stars, ...(CELESTIAL_DATA.constellationStars || [])].forEach(s => {
      starMap.set(s.id, getCartesianPosition(s.azimuth, s.altitude, 440));
    });

    CELESTIAL_DATA.constellations.forEach(constell => {
      const linePositions = [];

      constell.lines.forEach(pair => {
        const p1 = starMap.get(pair[0]);
        const p2 = starMap.get(pair[1]);
        if (p1 && p2) {
          linePositions.push(p1.x, p1.y, p1.z);
          linePositions.push(p2.x, p2.y, p2.z);
        }
      });

      if (linePositions.length > 0) {
        const lineGeo = new THREE.BufferGeometry();
        lineGeo.setAttribute('position', new THREE.Float32BufferAttribute(linePositions, 3));

        const lineMat = new THREE.LineBasicMaterial({
          color: new THREE.Color(constell.accentColor || 0x38bdf8),
          transparent: true,
          opacity: 0.65,
          linewidth: 1.5
        });

        const linesMesh = new THREE.LineSegments(lineGeo, lineMat);
        linesMesh.userData = { ...constell, isConstellation: true };
        this.scene.add(linesMesh);
        this.constellationLines.push(linesMesh);

        // Label Pusat Rasi
        const centerPos = getCartesianPosition(constell.centerAzimuth, constell.centerAltitude, 430);
        const label = this.createLabelSprite(`✧ ${constell.name.split(' (')[0]}`, constell.accentColor, 16, true);
        label.position.set(centerPos.x, centerPos.y, centerPos.z);
        label.userData = { ...constell, isConstellationLabel: true };
        this.scene.add(label);
        this.labelSprites.push(label);
      }
    });
  }

  // Grid Alt-Azimuth Astronomis (Toggleable)
  createAltAzimuthGrid() {
    this.gridGroup = new THREE.Group();
    const gridRadius = 450;

    // Lingkaran Altitude (15°, 30°, 45°, 60°, 75°)
    [15, 30, 45, 60, 75].forEach(alt => {
      const points = [];
      const count = 64;
      for (let i = 0; i <= count; i++) {
        const az = (i / count) * 360;
        const pos = getCartesianPosition(az, alt, gridRadius);
        points.push(new THREE.Vector3(pos.x, pos.y, pos.z));
      }
      const geo = new THREE.BufferGeometry().setFromPoints(points);
      const mat = new THREE.LineBasicMaterial({ color: 0x1e293b, transparent: true, opacity: 0.35 });
      const line = new THREE.Line(geo, mat);
      this.gridGroup.add(line);
    });

    this.gridGroup.visible = this.showGrid;
    this.scene.add(this.gridGroup);
  }

  // Helper untuk membuat Label Sprite Text Canvas
  createLabelSprite(text, colorHex = '#ffffff', fontSize = 16, isBold = false) {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    canvas.width = 320;
    canvas.height = 80;

    ctx.font = `${isBold ? 'bold' : 'normal'} ${fontSize * 2}px "Space Grotesk", "Outfit", sans-serif`;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';

    // Glowing text shadow
    ctx.shadowColor = colorHex;
    ctx.shadowBlur = 12;
    ctx.fillStyle = '#ffffff';
    ctx.fillText(text, 160, 40);

    const texture = new THREE.CanvasTexture(canvas);
    texture.minFilter = THREE.LinearFilter;
    const material = new THREE.SpriteMaterial({ map: texture, transparent: true, depthWrite: false });
    const sprite = new THREE.Sprite(material);
    sprite.scale.set(32, 8, 1);
    return sprite;
  }

  // Helper membuat Glow Particle Texture Sprite
  createGlowSprite(colorHex, size = 20) {
    const canvas = document.createElement('canvas');
    canvas.width = 64;
    canvas.height = 64;
    const ctx = canvas.getContext('2d');

    const grad = ctx.createRadialGradient(32, 32, 2, 32, 32, 30);
    grad.addColorStop(0, '#ffffff');
    grad.addColorStop(0.3, colorHex);
    grad.addColorStop(1, 'rgba(0, 0, 0, 0)');

    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, 64, 64);

    const texture = new THREE.CanvasTexture(canvas);
    const material = new THREE.SpriteMaterial({
      map: texture,
      color: new THREE.Color(colorHex),
      transparent: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false
    });
    const sprite = new THREE.Sprite(material);
    sprite.scale.set(size, size, 1);
    return sprite;
  }

  // Dynamic Sky Updater berdasarkan Jam (0.0 - 24.0)
  updateSkyByHour(hour) {
    this.currentHour = hour;

    let topCol, horizCol, sunInt, starAlpha, isDay;

    // Perhitungan warna langit berdasarkan kurva siklus 24 jam:
    if (hour >= 5.0 && hour < 6.5) {
      // Subuh / Fajar (Dawn / Sunrise)
      const t = (hour - 5.0) / 1.5;
      topCol = new THREE.Color(0x0a1128).lerp(new THREE.Color(0x1e3a8a), t);
      horizCol = new THREE.Color(0xf472b6).lerp(new THREE.Color(0xfb923c), t);
      sunInt = 0.4 * t;
      starAlpha = 1.0 - t * 0.7;
      isDay = false;
    } else if (hour >= 6.5 && hour < 11.5) {
      // Pagi Cerah (Morning)
      const t = (hour - 6.5) / 5.0;
      topCol = new THREE.Color(0x0284c7).lerp(new THREE.Color(0x0369a1), t);
      horizCol = new THREE.Color(0x7dd3fc).lerp(new THREE.Color(0xbae6fd), t);
      sunInt = 0.4 + 0.6 * t;
      starAlpha = 0.15; // Bintang redup di siang hari
      isDay = true;
    } else if (hour >= 11.5 && hour < 15.5) {
      // Siang Terik (Noon)
      topCol = new THREE.Color(0x0369a1);
      horizCol = new THREE.Color(0x38bdf8);
      sunInt = 1.0;
      starAlpha = 0.1;
      isDay = true;
    } else if (hour >= 15.5 && hour < 18.5) {
      // Sore / Senja Emas (Golden Hour / Sunset)
      const t = (hour - 15.5) / 3.0;
      topCol = new THREE.Color(0x0369a1).lerp(new THREE.Color(0x1e1b4b), t);
      horizCol = new THREE.Color(0xfb923c).lerp(new THREE.Color(0xd97706), t);
      sunInt = 1.0 - 0.7 * t;
      starAlpha = 0.15 + 0.6 * t;
      isDay = false;
    } else if (hour >= 18.5 && hour < 20.0) {
      // Senja Menjelang Malam (Dusk / Twilight)
      const t = (hour - 18.5) / 1.5;
      topCol = new THREE.Color(0x1e1b4b).lerp(new THREE.Color(0x030712), t);
      horizCol = new THREE.Color(0x7c3aed).lerp(new THREE.Color(0x0c1a30), t);
      sunInt = 0.3 * (1.0 - t);
      starAlpha = 0.75 + 0.25 * t;
      isDay = false;
    } else {
      // Malam Kosmik Gelap Pekat (Cosmic Starry Night)
      topCol = new THREE.Color(0x02040a);
      horizCol = new THREE.Color(0x070e1c);
      sunInt = 0.0;
      starAlpha = 1.0;
      isDay = false;
    }

    // Update Uniform Shader Kubah Langit
    if (this.skyMaterial) {
      this.skyMaterial.uniforms.topColor.value = topCol;
      this.skyMaterial.uniforms.horizonColor.value = horizCol;
      this.skyMaterial.uniforms.sunIntensity.value = sunInt;
      this.skyMaterial.uniforms.timeOfDay.value = isDay ? 1.0 : 0.0;

      // Hitung posisi matahari di langit (Azimuth 90° di timur pagi, 270° di barat sore)
      const sunAzimuth = ((hour - 6) / 12) * 180 + 90;
      const sunAltitude = Math.sin(((hour - 6) / 12) * Math.PI) * 75;
      const sunPos = getCartesianPosition(sunAzimuth, Math.max(0, sunAltitude), 500);
      this.skyMaterial.uniforms.sunPosition.value.set(sunPos.x, sunPos.y, sunPos.z);
    }

    // Update Bintang & Milky Way
    if (this.starMaterial) {
      this.starMaterial.uniforms.starAlpha.value = starAlpha;
    }
    if (this.milkyWayMesh) {
      this.milkyWayMesh.material.opacity = isDay ? 0.05 : 0.45;
    }
    if (this.ambientLight) {
      this.ambientLight.intensity = isDay ? 0.8 : 0.2;
    }
  }

  // Pointer Interaction
  onPointerDown(event) {
    // Only trigger if left click or tap
    if (event.button !== 0) return;

    this.mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    this.mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

    this.raycaster.setFromCamera(this.mouse, this.camera);
    const intersects = this.raycaster.intersectObjects(this.interactiveObjects, false);

    if (intersects.length > 0) {
      const hitMesh = intersects[0].object;
      const group = hitMesh.parentGroup;
      if (group && group.userData) {
        this.focusOnObject(group);
        if (this.onObjectSelected) {
          this.onObjectSelected(group.userData);
        }
      }
    }
  }

  onPointerMove(event) {
    this.mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    this.mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

    this.raycaster.setFromCamera(this.mouse, this.camera);
    const intersects = this.raycaster.intersectObjects(this.interactiveObjects, false);

    if (intersects.length > 0) {
      document.body.style.cursor = 'pointer';
      const obj = intersects[0].object;
      if (this.hoveredObject !== obj) {
        this.hoveredObject = obj;
        // Subtle hover pulse
        if (obj.scale.x === 1) {
          obj.scale.set(1.3, 1.3, 1.3);
        }
      }
    } else {
      document.body.style.cursor = 'default';
      if (this.hoveredObject) {
        this.hoveredObject.scale.set(1, 1, 1);
        this.hoveredObject = null;
      }
    }
  }

  // Smooth Camera Fly-To & Focus
  focusOnObject(group) {
    const targetPos = group.position.clone();

    // Hitung arah pandang dari pengamat (0, 1.7, 0) ke objek langit
    const startTarget = this.controls.target.clone();
    const duration = 1200; // ms
    const startTime = performance.now();

    const animateFocus = (now) => {
      const elapsed = now - startTime;
      const t = Math.min(elapsed / duration, 1.0);
      const easeT = this.easeInOutCubic(t);

      this.controls.target.lerpVectors(startTarget, targetPos, easeT);
      this.controls.update();

      if (t < 1.0) {
        requestAnimationFrame(animateFocus);
      }
    };

    requestAnimationFrame(animateFocus);
  }

  // Cari objek berdasarkan nama / ID dan arahkan kamera ke sana
  findAndFocus(idOrName) {
    const searchStr = idOrName.toLowerCase();
    for (let obj of this.interactiveObjects) {
      const group = obj.parentGroup;
      if (group && group.userData) {
        const u = group.userData;
        if (u.id.toLowerCase().includes(searchStr) || u.name.toLowerCase().includes(searchStr)) {
          this.focusOnObject(group);
          if (this.onObjectSelected) {
            this.onObjectSelected(u);
          }
          return true;
        }
      }
    }
    return false;
  }

  // Mode Teleskop (Zoom in FOV)
  setTelescopeMode(enable) {
    this.isTelescopeMode = enable;
    const targetFov = enable ? 22 : 70;
    const startFov = this.camera.fov;
    const duration = 600;
    const startTime = performance.now();

    const animateFov = (now) => {
      const elapsed = now - startTime;
      const t = Math.min(elapsed / duration, 1.0);
      this.camera.fov = THREE.MathUtils.lerp(startFov, targetFov, this.easeInOutCubic(t));
      this.camera.updateProjectionMatrix();
      if (t < 1.0) {
        requestAnimationFrame(animateFov);
      }
    };
    requestAnimationFrame(animateFov);
  }

  // Toggles for UI filters
  toggleConstellations(visible) {
    this.showConstellations = visible;
    this.constellationLines.forEach(line => line.visible = visible);
  }

  toggleLabels(visible) {
    this.showLabels = visible;
    this.labelSprites.forEach(label => label.visible = visible);
  }

  toggleGrid(visible) {
    this.showGrid = visible;
    if (this.gridGroup) this.gridGroup.visible = visible;
  }

  easeInOutCubic(x) {
    return x < 0.5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2;
  }

  onWindowResize() {
    if (!this.camera || !this.renderer) return;
    this.camera.aspect = window.innerWidth / window.innerHeight;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(window.innerWidth, window.innerHeight);
  }

  animate() {
    requestAnimationFrame(() => this.animate());

    const elapsedTime = this.clock.getElapsedTime();

    // Update Star Twinkle uniform
    if (this.starMaterial) {
      this.starMaterial.uniforms.time.value = elapsedTime;
    }

    // Gentle rotation of planet meshes
    this.interactiveObjects.forEach(mesh => {
      mesh.rotation.y += 0.006;
    });

    // Update Orbit Controls
    if (this.controls) {
      this.controls.update();
    }

    // Render Scene
    this.renderer.render(this.scene, this.camera);
  }
}
