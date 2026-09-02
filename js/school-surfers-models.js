/**
 * SCHOOL SURFERS 3D - PROCEDURAL 3D MODELS BUILDER (THREE.JS)
 * Generates 3D Meshes for Bulbul, Bekbek, Cikgu Besar, Drone, School Buses,
 * Number Mystery Boxes, Obstacles, and School Yard Environment Props.
 */

class SchoolSurfersModels {

  // =========================================================================
  // 1. BULBUL MODEL (School Boy)
  // =========================================================================
  static createBulbul() {
    const group = new THREE.Group();

    // Torso (White Shirt & School Tie)
    const torsoGeo = new THREE.BoxGeometry(0.9, 1.1, 0.55);
    const shirtMat = new THREE.MeshLambertMaterial({ color: 0xffffff });
    const torso = new THREE.Mesh(torsoGeo, shirtMat);
    torso.position.y = 1.35;
    torso.castShadow = true;
    group.add(torso);

    // Red Necktie
    const tieGeo = new THREE.BoxGeometry(0.18, 0.6, 0.05);
    const tieMat = new THREE.MeshLambertMaterial({ color: 0xd90429 });
    const tie = new THREE.Mesh(tieGeo, tieMat);
    tie.position.set(0, 1.45, 0.3);
    group.add(tie);

    // School Backpack
    const bagGeo = new THREE.BoxGeometry(0.7, 0.8, 0.35);
    const bagMat = new THREE.MeshLambertMaterial({ color: 0x0284c7 });
    const bag = new THREE.Mesh(bagGeo, bagMat);
    bag.position.set(0, 1.35, -0.4);
    group.add(bag);

    // Head & Hair
    const headGeo = new THREE.BoxGeometry(0.65, 0.65, 0.65);
    const skinMat = new THREE.MeshLambertMaterial({ color: 0xf59e0b });
    const head = new THREE.Mesh(headGeo, skinMat);
    head.position.y = 2.2;
    head.castShadow = true;
    group.add(head);

    // Boy Hair (Spiky / Short Black Hair)
    const hairGeo = new THREE.BoxGeometry(0.7, 0.28, 0.7);
    const hairMat = new THREE.MeshLambertMaterial({ color: 0x1f2937 });
    const hair = new THREE.Mesh(hairGeo, hairMat);
    hair.position.set(0, 2.45, 0);
    group.add(hair);

    // Eyes
    const eyeMat = new THREE.MeshBasicMaterial({ color: 0x000000 });
    const leftEye = new THREE.Mesh(new THREE.BoxGeometry(0.08, 0.08, 0.02), eyeMat);
    leftEye.position.set(-0.16, 2.22, 0.33);
    const rightEye = new THREE.Mesh(new THREE.BoxGeometry(0.08, 0.08, 0.02), eyeMat);
    rightEye.position.set(0.16, 2.22, 0.33);
    group.add(leftEye, rightEye);

    // Left Arm (Articulated Pivot)
    const leftArmPivot = new THREE.Group();
    leftArmPivot.position.set(-0.6, 1.75, 0);
    const armGeo = new THREE.BoxGeometry(0.26, 0.8, 0.26);
    const leftArmMesh = new THREE.Mesh(armGeo, shirtMat);
    leftArmMesh.position.y = -0.35;
    leftArmMesh.castShadow = true;
    leftArmPivot.add(leftArmMesh);
    group.add(leftArmPivot);

    // Right Arm
    const rightArmPivot = new THREE.Group();
    rightArmPivot.position.set(0.6, 1.75, 0);
    const rightArmMesh = new THREE.Mesh(armGeo, shirtMat);
    rightArmMesh.position.y = -0.35;
    rightArmMesh.castShadow = true;
    rightArmPivot.add(rightArmMesh);
    group.add(rightArmPivot);

    // Left Leg (Blue/Grey Pants)
    const pantsMat = new THREE.MeshLambertMaterial({ color: 0x1e3a8a });
    const shoeMat = new THREE.MeshLambertMaterial({ color: 0xef4444 });
    const leftLegPivot = new THREE.Group();
    leftLegPivot.position.set(-0.25, 0.8, 0);
    const legGeo = new THREE.BoxGeometry(0.3, 0.8, 0.3);
    const leftLegMesh = new THREE.Mesh(legGeo, pantsMat);
    leftLegMesh.position.y = -0.35;
    leftLegMesh.castShadow = true;
    leftLegPivot.add(leftLegMesh);

    // Shoes
    const shoeGeo = new THREE.BoxGeometry(0.32, 0.2, 0.42);
    const leftShoe = new THREE.Mesh(shoeGeo, shoeMat);
    leftShoe.position.set(0, -0.7, 0.05);
    leftLegPivot.add(leftShoe);
    group.add(leftLegPivot);

    // Right Leg
    const rightLegPivot = new THREE.Group();
    rightLegPivot.position.set(0.25, 0.8, 0);
    const rightLegMesh = new THREE.Mesh(legGeo, pantsMat);
    rightLegMesh.position.y = -0.35;
    rightLegMesh.castShadow = true;
    rightLegPivot.add(rightLegMesh);

    const rightShoe = new THREE.Mesh(shoeGeo, shoeMat);
    rightShoe.position.set(0, -0.7, 0.05);
    rightLegPivot.add(rightShoe);
    group.add(rightLegPivot);

    // Attach animation references
    group.userData = {
      name: 'Bulbul',
      leftArm: leftArmPivot,
      rightArm: rightArmPivot,
      leftLeg: leftLegPivot,
      rightLeg: rightLegPivot,
      torso: torso,
      head: head
    };

    return group;
  }

  // =========================================================================
  // 2. BEKBEK MODEL (School Girl)
  // =========================================================================
  static createBekbek() {
    const group = new THREE.Group();

    // Torso (White Shirt with Ribbon)
    const torsoGeo = new THREE.BoxGeometry(0.85, 1.0, 0.5);
    const shirtMat = new THREE.MeshLambertMaterial({ color: 0xffffff });
    const torso = new THREE.Mesh(torsoGeo, shirtMat);
    torso.position.y = 1.35;
    torso.castShadow = true;
    group.add(torso);

    // Ribbon Bow Tie
    const bowGeo = new THREE.BoxGeometry(0.3, 0.15, 0.06);
    const bowMat = new THREE.MeshLambertMaterial({ color: 0xf43f5e });
    const bow = new THREE.Mesh(bowGeo, bowMat);
    bow.position.set(0, 1.65, 0.28);
    group.add(bow);

    // School Backpack (Pink/Purple)
    const bagGeo = new THREE.BoxGeometry(0.65, 0.75, 0.32);
    const bagMat = new THREE.MeshLambertMaterial({ color: 0xa855f7 });
    const bag = new THREE.Mesh(bagGeo, bagMat);
    bag.position.set(0, 1.35, -0.36);
    group.add(bag);

    // Head
    const headGeo = new THREE.BoxGeometry(0.62, 0.62, 0.62);
    const skinMat = new THREE.MeshLambertMaterial({ color: 0xf59e0b });
    const head = new THREE.Mesh(headGeo, skinMat);
    head.position.y = 2.15;
    head.castShadow = true;
    group.add(head);

    // Girl Hair & Ponytail
    const hairMat = new THREE.MeshLambertMaterial({ color: 0x451a03 });
    const hairBase = new THREE.Mesh(new THREE.BoxGeometry(0.68, 0.35, 0.68), hairMat);
    hairBase.position.set(0, 2.38, 0);
    group.add(hairBase);

    // Ponytail & Bow
    const ponytail = new THREE.Mesh(new THREE.BoxGeometry(0.2, 0.6, 0.2), hairMat);
    ponytail.position.set(0, 2.1, -0.42);
    ponytail.rotation.x = -0.3;
    group.add(ponytail);

    const hairRibbon = new THREE.Mesh(new THREE.BoxGeometry(0.28, 0.12, 0.1), bowMat);
    hairRibbon.position.set(0, 2.38, -0.36);
    group.add(hairRibbon);

    // Eyes
    const eyeMat = new THREE.MeshBasicMaterial({ color: 0x000000 });
    const leftEye = new THREE.Mesh(new THREE.BoxGeometry(0.08, 0.08, 0.02), eyeMat);
    leftEye.position.set(-0.15, 2.16, 0.32);
    const rightEye = new THREE.Mesh(new THREE.BoxGeometry(0.08, 0.08, 0.02), eyeMat);
    rightEye.position.set(0.15, 2.16, 0.32);
    group.add(leftEye, rightEye);

    // Pleated Skirt (Navy / Maroon)
    const skirtGeo = new THREE.CylinderGeometry(0.35, 0.55, 0.45, 12);
    const skirtMat = new THREE.MeshLambertMaterial({ color: 0xbe123c });
    const skirt = new THREE.Mesh(skirtGeo, skirtMat);
    skirt.position.y = 0.85;
    skirt.castShadow = true;
    group.add(skirt);

    // Left Arm
    const leftArmPivot = new THREE.Group();
    leftArmPivot.position.set(-0.55, 1.7, 0);
    const armGeo = new THREE.BoxGeometry(0.24, 0.75, 0.24);
    const leftArmMesh = new THREE.Mesh(armGeo, shirtMat);
    leftArmMesh.position.y = -0.32;
    leftArmMesh.castShadow = true;
    leftArmPivot.add(leftArmMesh);
    group.add(leftArmPivot);

    // Right Arm
    const rightArmPivot = new THREE.Group();
    rightArmPivot.position.set(0.55, 1.7, 0);
    const rightArmMesh = new THREE.Mesh(armGeo, shirtMat);
    rightArmMesh.position.y = -0.32;
    rightArmMesh.castShadow = true;
    rightArmPivot.add(rightArmMesh);
    group.add(rightArmPivot);

    // Left Leg
    const sockMat = new THREE.MeshLambertMaterial({ color: 0xffffff });
    const shoeMat = new THREE.MeshLambertMaterial({ color: 0xf43f5e });
    const leftLegPivot = new THREE.Group();
    leftLegPivot.position.set(-0.22, 0.65, 0);
    const legGeo = new THREE.BoxGeometry(0.24, 0.7, 0.24);
    const leftLegMesh = new THREE.Mesh(legGeo, skinMat);
    leftLegMesh.position.y = -0.3;
    leftLegMesh.castShadow = true;
    leftLegPivot.add(leftLegMesh);

    // Socks & Shoe
    const leftSock = new THREE.Mesh(new THREE.BoxGeometry(0.26, 0.25, 0.26), sockMat);
    leftSock.position.y = -0.45;
    leftLegPivot.add(leftSock);
    const leftShoe = new THREE.Mesh(new THREE.BoxGeometry(0.28, 0.18, 0.38), shoeMat);
    leftShoe.position.set(0, -0.62, 0.05);
    leftLegPivot.add(leftShoe);
    group.add(leftLegPivot);

    // Right Leg
    const rightLegPivot = new THREE.Group();
    rightLegPivot.position.set(0.22, 0.65, 0);
    const rightLegMesh = new THREE.Mesh(legGeo, skinMat);
    rightLegMesh.position.y = -0.3;
    rightLegMesh.castShadow = true;
    rightLegPivot.add(rightLegMesh);

    const rightSock = new THREE.Mesh(new THREE.BoxGeometry(0.26, 0.25, 0.26), sockMat);
    rightSock.position.y = -0.45;
    rightLegPivot.add(rightSock);
    const rightShoe = new THREE.Mesh(new THREE.BoxGeometry(0.28, 0.18, 0.38), shoeMat);
    rightShoe.position.set(0, -0.62, 0.05);
    rightLegPivot.add(rightShoe);
    group.add(rightLegPivot);

    group.userData = {
      name: 'Bekbek',
      leftArm: leftArmPivot,
      rightArm: rightArmPivot,
      leftLeg: leftLegPivot,
      rightLeg: rightLegPivot,
      torso: torso,
      head: head
    };

    return group;
  }

  // =========================================================================
  // 3. CIKGU BESAR MODEL (Kepala Sekolah Upin Ipin)
  // =========================================================================
  static createCikguBesar() {
    const group = new THREE.Group();

    // Rotund Corpulent Torso (Formal Batik Suit)
    const torsoGeo = new THREE.CylinderGeometry(0.75, 0.9, 1.3, 12);
    const batikMat = new THREE.MeshLambertMaterial({ color: 0x78350f }); // Brown formal suit
    const torso = new THREE.Mesh(torsoGeo, batikMat);
    torso.position.y = 1.4;
    torso.castShadow = true;
    group.add(torso);

    // Necktie & White Collar
    const collar = new THREE.Mesh(new THREE.BoxGeometry(0.4, 0.2, 0.1), new THREE.MeshLambertMaterial({ color: 0xffffff }));
    collar.position.set(0, 1.95, 0.7);
    const tie = new THREE.Mesh(new THREE.BoxGeometry(0.22, 0.8, 0.08), new THREE.MeshLambertMaterial({ color: 0xd90429 }));
    tie.position.set(0, 1.5, 0.75);
    group.add(collar, tie);

    // Large Head
    const headGeo = new THREE.BoxGeometry(0.85, 0.85, 0.85);
    const skinMat = new THREE.MeshLambertMaterial({ color: 0xd97706 });
    const head = new THREE.Mesh(headGeo, skinMat);
    head.position.y = 2.45;
    head.castShadow = true;
    group.add(head);

    // Hair / Peci / Songkok
    const songkok = new THREE.Mesh(new THREE.BoxGeometry(0.88, 0.35, 0.88), new THREE.MeshLambertMaterial({ color: 0x111827 }));
    songkok.position.set(0, 2.9, 0);
    group.add(songkok);

    // Thick Glasses
    const glassMat = new THREE.MeshBasicMaterial({ color: 0x000000 });
    const glasses = new THREE.Mesh(new THREE.BoxGeometry(0.75, 0.2, 0.1), glassMat);
    glasses.position.set(0, 2.48, 0.44);
    group.add(glasses);

    // Stern Eyebrows & Eyes
    const lensMat = new THREE.MeshBasicMaterial({ color: 0xffffff });
    const leftLens = new THREE.Mesh(new THREE.BoxGeometry(0.2, 0.12, 0.02), lensMat);
    leftLens.position.set(-0.2, 2.48, 0.5);
    const rightLens = new THREE.Mesh(new THREE.BoxGeometry(0.2, 0.12, 0.02), lensMat);
    rightLens.position.set(0.2, 2.48, 0.5);
    group.add(leftLens, rightLens);

    // Clipboard & Ruler in Right Hand
    const boardGeo = new THREE.BoxGeometry(0.45, 0.6, 0.06);
    const board = new THREE.Mesh(boardGeo, new THREE.MeshLambertMaterial({ color: 0xf59e0b }));
    board.position.set(0.9, 1.3, 0.4);
    board.rotation.y = -0.4;
    group.add(board);

    // Arms
    const armGeo = new THREE.BoxGeometry(0.35, 0.9, 0.35);
    const leftArmPivot = new THREE.Group();
    leftArmPivot.position.set(-0.85, 1.8, 0);
    const leftArm = new THREE.Mesh(armGeo, batikMat);
    leftArm.position.y = -0.4;
    leftArmPivot.add(leftArm);
    group.add(leftArmPivot);

    const rightArmPivot = new THREE.Group();
    rightArmPivot.position.set(0.85, 1.8, 0);
    const rightArm = new THREE.Mesh(armGeo, batikMat);
    rightArm.position.y = -0.4;
    rightArmPivot.add(rightArm);
    group.add(rightArmPivot);

    // Legs
    const pantsMat = new THREE.MeshLambertMaterial({ color: 0x1f2937 });
    const shoeMat = new THREE.MeshLambertMaterial({ color: 0x000000 });
    const legGeo = new THREE.BoxGeometry(0.38, 0.8, 0.38);

    const leftLegPivot = new THREE.Group();
    leftLegPivot.position.set(-0.35, 0.75, 0);
    const leftLeg = new THREE.Mesh(legGeo, pantsMat);
    leftLeg.position.y = -0.35;
    const leftShoe = new THREE.Mesh(new THREE.BoxGeometry(0.42, 0.22, 0.55), shoeMat);
    leftShoe.position.set(0, -0.7, 0.08);
    leftLegPivot.add(leftLeg, leftShoe);
    group.add(leftLegPivot);

    const rightLegPivot = new THREE.Group();
    rightLegPivot.position.set(0.35, 0.75, 0);
    const rightLeg = new THREE.Mesh(legGeo, pantsMat);
    rightLeg.position.y = -0.35;
    const rightShoe = new THREE.Mesh(new THREE.BoxGeometry(0.42, 0.22, 0.55), shoeMat);
    rightShoe.position.set(0, -0.7, 0.08);
    rightLegPivot.add(rightLeg, rightShoe);
    group.add(rightLegPivot);

    group.userData = {
      name: 'CikguBesar',
      leftArm: leftArmPivot,
      rightArm: rightArmPivot,
      leftLeg: leftLegPivot,
      rightLeg: rightLegPivot
    };

    return group;
  }

  // =========================================================================
  // 4. SURVEILLANCE DRONE MODEL
  // =========================================================================
  static createDrone() {
    const group = new THREE.Group();

    // Central Body Frame
    const bodyGeo = new THREE.CylinderGeometry(0.4, 0.45, 0.22, 8);
    const droneMat = new THREE.MeshLambertMaterial({ color: 0x1e293b });
    const body = new THREE.Mesh(bodyGeo, droneMat);
    body.castShadow = true;
    group.add(body);

    // Glowing Red Sensor Camera Eye
    const eyeGeo = new THREE.SphereGeometry(0.16, 8, 8);
    const eyeMat = new THREE.MeshBasicMaterial({ color: 0xef4444 });
    const eye = new THREE.Mesh(eyeGeo, eyeMat);
    eye.position.set(0, -0.08, 0.38);
    group.add(eye);

    // 4 Quadcopter Rotor Arms
    const armGeo = new THREE.BoxGeometry(1.4, 0.06, 0.1);
    const arm1 = new THREE.Mesh(armGeo, droneMat);
    arm1.rotation.y = Math.PI / 4;
    const arm2 = new THREE.Mesh(armGeo, droneMat);
    arm2.rotation.y = -Math.PI / 4;
    group.add(arm1, arm2);

    // 4 Propellers (Rotors)
    const rotorGeo = new THREE.BoxGeometry(0.5, 0.02, 0.08);
    const rotorMat = new THREE.MeshBasicMaterial({ color: 0x38bdf8 });
    const rotors = [];

    const positions = [
      [-0.5, 0.1, -0.5],
      [0.5, 0.1, -0.5],
      [-0.5, 0.1, 0.5],
      [0.5, 0.1, 0.5]
    ];

    positions.forEach(pos => {
      const rotor = new THREE.Mesh(rotorGeo, rotorMat);
      rotor.position.set(...pos);
      group.add(rotor);
      rotors.push(rotor);
    });

    group.userData = {
      name: 'Drone',
      rotors: rotors
    };

    return group;
  }

  // =========================================================================
  // 5. 3D SCHOOL BUS (Kereta Api Diganti Bus Sekolah)
  // =========================================================================
  static createSchoolBus() {
    const group = new THREE.Group();

    // Bus Main Body (School Yellow)
    const busBodyGeo = new THREE.BoxGeometry(2.6, 2.4, 7.8);
    const yellowMat = new THREE.MeshLambertMaterial({ color: 0xf59e0b });
    const busBody = new THREE.Mesh(busBodyGeo, yellowMat);
    busBody.position.y = 1.6;
    busBody.castShadow = true;
    busBody.receiveShadow = true;
    group.add(busBody);

    // White Roof (Can be run on / jumped on!)
    const roofGeo = new THREE.BoxGeometry(2.5, 0.15, 7.6);
    const roofMat = new THREE.MeshLambertMaterial({ color: 0xffffff });
    const roof = new THREE.Mesh(roofGeo, roofMat);
    roof.position.y = 2.85;
    roof.receiveShadow = true;
    group.add(roof);

    // Windows (Dark Tinted Glass Strips)
    const winGeo = new THREE.BoxGeometry(2.65, 0.8, 6.8);
    const glassMat = new THREE.MeshLambertMaterial({ color: 0x0f172a });
    const win = new THREE.Mesh(winGeo, glassMat);
    win.position.set(0, 1.9, -0.2);
    group.add(win);

    // Front Windshield
    const frontWinGeo = new THREE.BoxGeometry(2.3, 0.85, 0.1);
    const frontWin = new THREE.Mesh(frontWinGeo, glassMat);
    frontWin.position.set(0, 1.9, 3.91);
    group.add(frontWin);

    // Front Grill & Headlights
    const grillGeo = new THREE.BoxGeometry(1.6, 0.6, 0.1);
    const grillMat = new THREE.MeshLambertMaterial({ color: 0x1f2937 });
    const grill = new THREE.Mesh(grillGeo, grillMat);
    grill.position.set(0, 0.8, 3.91);
    group.add(grill);

    const lightGeo = new THREE.CylinderGeometry(0.2, 0.2, 0.1, 8);
    const lightMat = new THREE.MeshBasicMaterial({ color: 0xfef08a });
    const leftLight = new THREE.Mesh(lightGeo, lightMat);
    leftLight.rotation.x = Math.PI / 2;
    leftLight.position.set(-0.9, 0.8, 3.92);
    const rightLight = new THREE.Mesh(lightGeo, lightMat);
    rightLight.rotation.x = Math.PI / 2;
    rightLight.position.set(0.9, 0.8, 3.92);
    group.add(leftLight, rightLight);

    // Black Wheels (6 Wheels)
    const wheelGeo = new THREE.CylinderGeometry(0.48, 0.48, 0.35, 12);
    const wheelMat = new THREE.MeshLambertMaterial({ color: 0x111827 });

    const wheelPositions = [
      [-1.3, 0.48, 2.4], [1.3, 0.48, 2.4],
      [-1.3, 0.48, -1.0], [1.3, 0.48, -1.0],
      [-1.3, 0.48, -2.6], [1.3, 0.48, -2.6]
    ];

    wheelPositions.forEach(pos => {
      const wheel = new THREE.Mesh(wheelGeo, wheelMat);
      wheel.rotation.z = Math.PI / 2;
      wheel.position.set(...pos);
      wheel.castShadow = true;
      group.add(wheel);
    });

    group.userData = {
      type: 'bus',
      bounds: new THREE.Box3().setFromObject(group)
    };

    return group;
  }

  // =========================================================================
  // 6. KOTAK ANGKA (NUMBER MYSTERY BOXES - Menggantikan Koin)
  // =========================================================================
  static createNumberCube(number = 7) {
    const group = new THREE.Group();

    // 3D Glowing Box
    const cubeGeo = new THREE.BoxGeometry(0.7, 0.7, 0.7);
    const cubeMat = new THREE.MeshLambertMaterial({
      color: 0x38bdf8,
      emissive: 0x0284c7,
      emissiveIntensity: 0.5
    });
    const cube = new THREE.Mesh(cubeGeo, cubeMat);
    cube.castShadow = true;
    group.add(cube);

    // Sparkle Outer Halo
    const ringGeo = new THREE.TorusGeometry(0.55, 0.04, 8, 16);
    const ringMat = new THREE.MeshBasicMaterial({ color: 0xfacc15 });
    const ring = new THREE.Mesh(ringGeo, ringMat);
    ring.rotation.x = Math.PI / 2;
    group.add(ring);

    group.userData = {
      type: 'numberCube',
      value: number,
      cubeMesh: cube,
      ringMesh: ring
    };

    return group;
  }

  // =========================================================================
  // 7. JETPACK PICKUP & JETPACK GEAR
  // =========================================================================
  static createJetpackPickup() {
    const group = new THREE.Group();

    // Dual Rocket Cylinders
    const rocketGeo = new THREE.CylinderGeometry(0.18, 0.18, 0.8, 10);
    const rocketMat = new THREE.MeshLambertMaterial({ color: 0xef4444 });

    const leftRocket = new THREE.Mesh(rocketGeo, rocketMat);
    leftRocket.position.x = -0.22;
    const rightRocket = new THREE.Mesh(rocketGeo, rocketMat);
    rightRocket.position.x = 0.22;
    group.add(leftRocket, rightRocket);

    // Cross Harness
    const harness = new THREE.Mesh(new THREE.BoxGeometry(0.6, 0.35, 0.15), new THREE.MeshLambertMaterial({ color: 0x1e293b }));
    group.add(harness);

    // Flame Exhaust Tips
    const flameGeo = new THREE.ConeGeometry(0.16, 0.4, 8);
    const flameMat = new THREE.MeshBasicMaterial({ color: 0xf59e0b });
    const leftFlame = new THREE.Mesh(flameGeo, flameMat);
    leftFlame.position.set(-0.22, -0.5, 0);
    leftFlame.rotation.x = Math.PI;
    const rightFlame = new THREE.Mesh(flameGeo, flameMat);
    rightFlame.position.set(0.22, -0.5, 0);
    rightFlame.rotation.x = Math.PI;
    group.add(leftFlame, rightFlame);

    group.userData = {
      type: 'jetpack'
    };

    return group;
  }

  // =========================================================================
  // 8. OTHER OBSTACLES (Meja Belajar, Pagar Rintangan, Spanduk Rendah)
  // =========================================================================
  static createHurdle() {
    const group = new THREE.Group();
    // Hurdle Bar
    const bar = new THREE.Mesh(new THREE.BoxGeometry(2.4, 0.2, 0.12), new THREE.MeshLambertMaterial({ color: 0xef4444 }));
    bar.position.y = 0.8;
    bar.castShadow = true;
    // Legs
    const legGeo = new THREE.CylinderGeometry(0.06, 0.06, 0.8, 6);
    const legMat = new THREE.MeshLambertMaterial({ color: 0xffffff });
    const leg1 = new THREE.Mesh(legGeo, legMat);
    leg1.position.set(-1.0, 0.4, 0);
    const leg2 = new THREE.Mesh(legGeo, legMat);
    leg2.position.set(1.0, 0.4, 0);
    group.add(bar, leg1, leg2);

    group.userData = { type: 'hurdle' };
    return group;
  }

  static createSchoolDesk() {
    const group = new THREE.Group();
    // Tabletop
    const top = new THREE.Mesh(new THREE.BoxGeometry(2.2, 0.15, 1.2), new THREE.MeshLambertMaterial({ color: 0xb45309 }));
    top.position.y = 0.9;
    top.castShadow = true;
    group.add(top);

    // Legs
    const legGeo = new THREE.CylinderGeometry(0.06, 0.06, 0.9, 6);
    const legMat = new THREE.MeshLambertMaterial({ color: 0x1f2937 });
    [-0.9, 0.9].forEach(x => {
      [-0.45, 0.45].forEach(z => {
        const leg = new THREE.Mesh(legGeo, legMat);
        leg.position.set(x, 0.45, z);
        group.add(leg);
      });
    });

    group.userData = { type: 'desk' };
    return group;
  }

  static createLowBanner() {
    const group = new THREE.Group();
    // High Poles
    const poleGeo = new THREE.CylinderGeometry(0.08, 0.08, 3.2, 8);
    const poleMat = new THREE.MeshLambertMaterial({ color: 0x64748b });
    const pole1 = new THREE.Mesh(poleGeo, poleMat);
    pole1.position.set(-1.4, 1.6, 0);
    const pole2 = new THREE.Mesh(poleGeo, poleMat);
    pole2.position.set(1.4, 1.6, 0);

    // Hanging Banner (Requires slide roll under!)
    const bannerGeo = new THREE.BoxGeometry(2.8, 1.2, 0.08);
    const bannerMat = new THREE.MeshLambertMaterial({ color: 0xd90429 });
    const banner = new THREE.Mesh(bannerGeo, bannerMat);
    banner.position.set(0, 2.2, 0);
    banner.castShadow = true;

    group.add(pole1, pole2, banner);
    group.userData = { type: 'lowBanner' };
    return group;
  }
}
