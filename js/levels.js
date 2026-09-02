/**
 * SMA DEVIL - Level Definitions & Troll Mechanics
 * 15+ Levels with unique unexpected traps, school themes, and fun challenges.
 */

window.GAME_LEVELS = [
  // ==========================================
  // LEVEL 1: Hari Pertama Masuk SMA
  // ==========================================
  {
    id: 1,
    title: "Level 1: Hari Pertama Sekolah",
    hint: "Jalan santai menuju pintu kelas...",
    spawn: { x: 60, y: 380 },
    door: { x: 740, y: 346, width: 36, height: 54 },
    blocks: [
      // Floor
      { x: 0, y: 400, w: 300, h: 60 },
      { x: 380, y: 400, w: 420, h: 60 },
      // Floating small step
      { x: 320, y: 370, w: 40, h: 20 }
    ],
    spikes: [
      { x: 300, y: 440, size: 20, dir: 'up' },
      { x: 340, y: 440, size: 20, dir: 'up' }
    ],
    traps: [
      {
        type: 'fake_step_drop',
        targetBlockIdx: 2,
        triggerX: 300,
        triggered: false,
        action: (level, player) => {
          level.blocks[2].y += 8;
        }
      }
    ]
  },

  // ==========================================
  // LEVEL 2: Lantai Amblas
  // ==========================================
  {
    id: 2,
    title: "Level 2: Lantai Koridor Jebol",
    hint: "Hati-hati langkahmu, lantainya rapuh!",
    spawn: { x: 60, y: 380 },
    door: { x: 740, y: 346, width: 36, height: 54 },
    blocks: [
      { x: 0, y: 400, w: 220, h: 60 },
      // Drop bridge blocks
      { x: 230, y: 400, w: 70, h: 20, isDropping: false, id: 'drop1' },
      { x: 310, y: 400, w: 70, h: 20, isDropping: false, id: 'drop2' },
      { x: 390, y: 400, w: 70, h: 20, isDropping: false, id: 'drop3' },
      { x: 470, y: 400, w: 70, h: 20, isDropping: false, id: 'drop4' },
      { x: 550, y: 400, w: 250, h: 60 },
      // High safe platform
      { x: 330, y: 270, w: 120, h: 20 }
    ],
    spikes: [
      { x: 230, y: 450, size: 20, dir: 'up' },
      { x: 290, y: 450, size: 20, dir: 'up' },
      { x: 350, y: 450, size: 20, dir: 'up' },
      { x: 410, y: 450, size: 20, dir: 'up' },
      { x: 470, y: 450, size: 20, dir: 'up' }
    ],
    traps: [
      {
        type: 'step_collapse',
        update: (level, player) => {
          level.blocks.forEach(b => {
            if (b.id && b.id.startsWith('drop')) {
              if (Math.abs(player.x - (b.x + b.w / 2)) < 45 && Math.abs(player.y - b.y) < 20) {
                b.isDropping = true;
              }
              if (b.isDropping) {
                b.y += 6;
              }
            }
          });
        }
      }
    ]
  },

  // ==========================================
  // LEVEL 3: Pintu Masuk Kabur!
  // ==========================================
  {
    id: 3,
    title: "Level 3: Pintunya Takut Didatangi",
    hint: "Kejar pintunya sampai terpojok!",
    spawn: { x: 60, y: 380 },
    door: { x: 500, y: 346, width: 36, height: 54, escaped: false },
    blocks: [
      { x: 0, y: 400, w: 800, h: 60 },
      { x: 0, y: 0, w: 20, h: 460 },
      { x: 780, y: 0, w: 20, h: 460 }
    ],
    spikes: [],
    traps: [
      {
        type: 'runaway_door',
        update: (level, player) => {
          const door = level.door;
          const dist = door.x - player.x;
          // When player gets close, door runs away to the right until wall
          if (dist > 0 && dist < 120 && door.x < 720) {
            door.x += 4.5;
            window.sound.playTrap();
          } else if (door.x >= 720 && player.x > 620) {
            // Door leaps over player to the left!
            if (!door.escaped) {
              door.x = 100;
              door.escaped = true;
              window.sound.playTrap();
            }
          }
        }
      }
    ]
  },

  // ==========================================
  // LEVEL 4: Razia Spikes Dari Langit
  // ==========================================
  {
    id: 4,
    title: "Level 4: Duri Jatuh Dari Langit",
    hint: "Perhatikan atap lorong sekolah...",
    spawn: { x: 60, y: 380 },
    door: { x: 740, y: 346, width: 36, height: 54 },
    blocks: [
      { x: 0, y: 400, w: 800, h: 60 },
      { x: 0, y: 0, w: 800, h: 30 }
    ],
    spikes: [
      { x: 220, y: 30, size: 22, dir: 'down', falling: false, triggerX: 180 },
      { x: 360, y: 30, size: 22, dir: 'down', falling: false, triggerX: 310 },
      { x: 500, y: 30, size: 22, dir: 'down', falling: false, triggerX: 450 },
      { x: 640, y: 30, size: 22, dir: 'down', falling: false, triggerX: 590 }
    ],
    traps: [
      {
        type: 'falling_spikes',
        update: (level, player) => {
          level.spikes.forEach(s => {
            if (player.x > s.triggerX && !s.falling) {
              s.falling = true;
              window.sound.playTrap();
            }
            if (s.falling && s.y < 378) {
              s.y += 9;
            }
          });
        }
      }
    ]
  },

  // ==========================================
  // LEVEL 5: Gravitasi Terbalik
  // ==========================================
  {
    id: 5,
    title: "Level 5: Gravitasi Terbalik",
    hint: "Sentuh kristal ungu untuk membalik gravitasi!",
    spawn: { x: 60, y: 380 },
    door: { x: 740, y: 60, width: 36, height: 54 },
    invertedGravity: false,
    crystals: [
      { x: 380, y: 340, radius: 12, collected: false }
    ],
    blocks: [
      { x: 0, y: 400, w: 420, h: 60 },
      { x: 380, y: 40, w: 420, h: 40 }, // Ceiling floor
      { x: 200, y: 280, w: 100, h: 20 },
      { x: 500, y: 150, w: 120, h: 20 }
    ],
    spikes: [
      { x: 440, y: 380, size: 20, dir: 'up' },
      { x: 480, y: 380, size: 20, dir: 'up' },
      { x: 520, y: 380, size: 20, dir: 'up' }
    ],
    traps: [
      {
        type: 'gravity_crystal',
        update: (level, player) => {
          level.crystals.forEach(c => {
            if (!c.collected && Math.hypot(player.x - c.x, (player.y - 20) - c.y) < 25) {
              c.collected = true;
              level.invertedGravity = true;
              window.sound.playGravity();
            }
          });
        }
      }
    ]
  },

  // ==========================================
  // LEVEL 6: Tombol Panik (Kontrol Terbalik)
  // ==========================================
  {
    id: 6,
    title: "Level 6: Tombol Panik (Kontrol Terbalik)",
    hint: "Saat panik, kanan jadi kiri dan kiri jadi kanan!",
    spawn: { x: 60, y: 380 },
    door: { x: 740, y: 346, width: 36, height: 54 },
    reversedControls: false,
    blocks: [
      { x: 0, y: 400, w: 300, h: 60 },
      { x: 360, y: 400, w: 100, h: 60 },
      { x: 520, y: 400, w: 280, h: 60 }
    ],
    spikes: [
      { x: 300, y: 440, size: 20, dir: 'up' },
      { x: 460, y: 440, size: 20, dir: 'up' }
    ],
    traps: [
      {
        type: 'reverse_controls',
        update: (level, player) => {
          if (player.x > 320 && !level.reversedControls) {
            level.reversedControls = true;
            window.sound.playTrap();
            if (window.showTrollToast) window.showTrollToast("⚠️ KONTROL TERBALIK! (KIRI = KANAN)");
          }
        }
      }
    ]
  },

  // ==========================================
  // LEVEL 7: Lampu Padam (Mode Senter)
  // ==========================================
  {
    id: 7,
    title: "Level 7: Lampu Koridor Padam",
    hint: "Andalkan cahaya sentermu untuk melihat duri...",
    darknessMode: true,
    spawn: { x: 60, y: 380 },
    door: { x: 740, y: 346, width: 36, height: 54 },
    blocks: [
      { x: 0, y: 400, w: 200, h: 60 },
      { x: 260, y: 370, w: 80, h: 20 },
      { x: 380, y: 330, w: 80, h: 20 },
      { x: 500, y: 370, w: 80, h: 20 },
      { x: 620, y: 400, w: 180, h: 60 }
    ],
    spikes: [
      { x: 210, y: 440, size: 20, dir: 'up' },
      { x: 345, y: 440, size: 20, dir: 'up' },
      { x: 465, y: 440, size: 20, dir: 'up' },
      { x: 585, y: 440, size: 20, dir: 'up' }
    ],
    traps: []
  },

  // ==========================================
  // LEVEL 8: Pintu Tipuan (3 Pintu)
  // ==========================================
  {
    id: 8,
    title: "Level 8: Tiga Pintu Tipuan",
    hint: "Pilih pintu yang benar atau kena jebakan!",
    spawn: { x: 60, y: 380 },
    door: { x: 740, y: 346, width: 36, height: 54 }, // Real door
    fakeDoors: [
      { x: 300, y: 346, width: 36, height: 54, triggered: false, type: 'spike_trap' },
      { x: 520, y: 346, width: 36, height: 54, triggered: false, type: 'teleport_back' }
    ],
    blocks: [
      { x: 0, y: 400, w: 800, h: 60 }
    ],
    spikes: [],
    traps: [
      {
        type: 'fake_doors_check',
        update: (level, player) => {
          level.fakeDoors.forEach(fd => {
            if (Math.abs(player.x - (fd.x + fd.width / 2)) < 20 && Math.abs(player.y - (fd.y + fd.height)) < 15) {
              if (fd.type === 'spike_trap') {
                window.sound.playDeath();
                player.die("Pintu pertama berisi jebakan duri!");
              } else if (fd.type === 'teleport_back') {
                window.sound.playTrap();
                player.x = level.spawn.x;
                player.y = level.spawn.y;
                if (window.showTrollToast) window.showTrollToast("🌀 Pintu kedua mengirimmu kembali ke awal!");
              }
            }
          });
        }
      }
    ]
  },

  // ==========================================
  // LEVEL 9: Platform Menghindar
  // ==========================================
  {
    id: 9,
    title: "Level 9: Pijakan yang Menghindar",
    hint: "Platformnya pintar, selalu kabur saat didekati!",
    spawn: { x: 60, y: 380 },
    door: { x: 740, y: 346, width: 36, height: 54 },
    blocks: [
      { x: 0, y: 400, w: 180, h: 60 },
      { x: 260, y: 380, w: 90, h: 20, isDodging: true, origY: 380 },
      { x: 440, y: 380, w: 90, h: 20, isDodging: true, origY: 380 },
      { x: 620, y: 400, w: 180, h: 60 }
    ],
    spikes: [
      { x: 190, y: 440, size: 20, dir: 'up' },
      { x: 360, y: 440, size: 20, dir: 'up' },
      { x: 540, y: 440, size: 20, dir: 'up' }
    ],
    traps: [
      {
        type: 'dodge_platforms',
        update: (level, player) => {
          level.blocks.forEach(b => {
            if (b.isDodging) {
              const dist = Math.hypot(player.x - (b.x + b.w / 2), player.y - b.y);
              if (dist < 70 && player.vy > 0) {
                b.y = b.origY + 70; // Drops out of reach!
              } else if (dist > 140) {
                b.y = b.origY;
              }
            }
          });
        }
      }
    ]
  },

  // ==========================================
  // LEVEL 10: Razia Penggaris & Buku PR
  // ==========================================
  {
    id: 10,
    title: "Level 10: Rintangan Ujian Berjalan",
    hint: "Hindari buku ujian yang berpatroli!",
    spawn: { x: 60, y: 380 },
    door: { x: 740, y: 346, width: 36, height: 54 },
    hazards: [
      { x: 260, y: 370, w: 32, h: 32, vx: 3, minX: 200, maxX: 400, type: 'exam_book' },
      { x: 540, y: 370, w: 32, h: 32, vx: -4, minX: 450, maxX: 660, type: 'exam_book' }
    ],
    blocks: [
      { x: 0, y: 400, w: 800, h: 60 },
      { x: 320, y: 290, w: 80, h: 20 },
      { x: 500, y: 290, w: 80, h: 20 }
    ],
    spikes: [],
    traps: [
      {
        type: 'moving_hazards',
        update: (level, player) => {
          level.hazards.forEach(h => {
            h.x += h.vx;
            if (h.x <= h.minX || h.x >= h.maxX) h.vx *= -1;
            // Check collision with player
            if (Math.abs(player.x - (h.x + h.w / 2)) < 22 && Math.abs(player.y - (h.y + h.h)) < 24) {
              player.die("Tertabrak buku PR tebal!");
            }
          });
        }
      }
    ]
  },

  // ==========================================
  // LEVEL 11: Lantai Menghilang Bergantian
  // ==========================================
  {
    id: 11,
    title: "Level 11: Pijakan Berkedip",
    hint: "Hafalkan ritme muncul dan hilangnya pijakan!",
    spawn: { x: 60, y: 380 },
    door: { x: 740, y: 346, width: 36, height: 54 },
    blocks: [
      { x: 0, y: 400, w: 160, h: 60 },
      { x: 200, y: 360, w: 80, h: 20, phase: 0, active: true },
      { x: 340, y: 320, w: 80, h: 20, phase: 1, active: false },
      { x: 480, y: 360, w: 80, h: 20, phase: 0, active: true },
      { x: 640, y: 400, w: 160, h: 60 }
    ],
    spikes: [
      { x: 170, y: 440, size: 20, dir: 'up' },
      { x: 310, y: 440, size: 20, dir: 'up' },
      { x: 450, y: 440, size: 20, dir: 'up' },
      { x: 590, y: 440, size: 20, dir: 'up' }
    ],
    traps: [
      {
        type: 'blinking_blocks',
        timer: 0,
        update: (level, player) => {
          this.timer = (this.timer || 0) + 1;
          const phase = Math.floor(this.timer / 60) % 2;
          level.blocks.forEach(b => {
            if (b.phase !== undefined) {
              b.active = (b.phase === phase);
            }
          });
        }
      }
    ]
  },

  // ==========================================
  // LEVEL 12: Pintu Berpindah Tiga Kali
  // ==========================================
  {
    id: 12,
    title: "Level 12: Pintu Teleport Beruntun",
    hint: "Sentuh pintunya beberapa kali sampai ia lelah!",
    spawn: { x: 60, y: 380 },
    door: { x: 300, y: 256, width: 36, height: 54, teleportsLeft: 3 },
    doorTargets: [
      { x: 560, y: 206 },
      { x: 200, y: 346 },
      { x: 740, y: 346 }
    ],
    blocks: [
      { x: 0, y: 400, w: 800, h: 60 },
      { x: 260, y: 310, w: 100, h: 20 },
      { x: 520, y: 260, w: 100, h: 20 }
    ],
    spikes: [],
    traps: [
      {
        type: 'multi_teleport_door',
        update: (level, player) => {
          const door = level.door;
          if (door.teleportsLeft > 0) {
            if (Math.abs(player.x - (door.x + door.width / 2)) < 24 && Math.abs(player.y - (door.y + door.height)) < 20) {
              const target = level.doorTargets[3 - door.teleportsLeft];
              door.x = target.x;
              door.y = target.y;
              door.teleportsLeft--;
              window.sound.playTrap();
              if (window.showTrollToast) window.showTrollToast("⚡ Pintunya berpindah lagi!");
            }
          }
        }
      }
    ]
  },

  // ==========================================
  // LEVEL 13: Lantai Licin Pel-Pelan
  // ==========================================
  {
    id: 13,
    title: "Level 13: Lantai Licin Habis Dipel",
    hint: "Hati-hati terpeleset tanpa rem!",
    slippery: true,
    spawn: { x: 60, y: 380 },
    door: { x: 740, y: 346, width: 36, height: 54 },
    blocks: [
      { x: 0, y: 400, w: 260, h: 60 },
      { x: 320, y: 400, w: 200, h: 60 },
      { x: 580, y: 400, w: 220, h: 60 }
    ],
    spikes: [
      { x: 265, y: 440, size: 20, dir: 'up' },
      { x: 285, y: 440, size: 20, dir: 'up' },
      { x: 525, y: 440, size: 20, dir: 'up' },
      { x: 545, y: 440, size: 20, dir: 'up' }
    ],
    traps: []
  },

  // ==========================================
  // LEVEL 14: Razia Guru BK (Searchlight)
  // ==========================================
  {
    id: 14,
    title: "Level 14: Razia Lampu Sorot Guru BK",
    hint: "Jangan sampai tertangkap sorotan lampu razia!",
    spawn: { x: 60, y: 380 },
    door: { x: 740, y: 346, width: 36, height: 54 },
    searchlights: [
      { x: 320, angle: 0, speed: 0.04, range: 120 },
      { x: 560, angle: Math.PI, speed: 0.04, range: 120 }
    ],
    blocks: [
      { x: 0, y: 400, w: 800, h: 60 },
      { x: 280, y: 280, w: 80, h: 20 },
      { x: 520, y: 280, w: 80, h: 20 }
    ],
    spikes: [],
    traps: [
      {
        type: 'searchlight_check',
        update: (level, player) => {
          level.searchlights.forEach(sl => {
            sl.angle += sl.speed;
            const beamX = sl.x + Math.sin(sl.angle) * sl.range;
            if (Math.abs(player.x - beamX) < 30 && player.y > 340) {
              player.die("Kena razia lampu sorot Guru BK!");
            }
          });
        }
      }
    ]
  },

  // ==========================================
  // LEVEL 15: Kelulusan SMA (The Boss Finale)
  // ==========================================
  {
    id: 15,
    title: "Level 15: Ujian Kelulusan SMA (Final)",
    hint: "Rangkuman semua jebakan legendaris Level Devil!",
    spawn: { x: 60, y: 380 },
    door: { x: 740, y: 166, width: 40, height: 60, isFinal: true },
    blocks: [
      { x: 0, y: 400, w: 160, h: 60 },
      { x: 220, y: 360, w: 70, h: 20, isDropping: false, id: 'drop_f1' },
      { x: 350, y: 300, w: 80, h: 20 },
      { x: 490, y: 260, w: 80, h: 20, isDodging: true, origY: 260 },
      { x: 630, y: 220, w: 170, h: 30 }
    ],
    spikes: [
      { x: 170, y: 440, size: 20, dir: 'up' },
      { x: 300, y: 440, size: 20, dir: 'up' },
      { x: 440, y: 440, size: 20, dir: 'up' },
      { x: 350, y: 40, size: 22, dir: 'down', falling: false, triggerX: 320 }
    ],
    traps: [
      {
        type: 'final_combination',
        update: (level, player) => {
          // 1. Drop block
          const b1 = level.blocks[1];
          if (Math.abs(player.x - (b1.x + b1.w / 2)) < 40 && Math.abs(player.y - b1.y) < 20) {
            b1.isDropping = true;
          }
          if (b1.isDropping) b1.y += 6;

          // 2. Falling ceiling spike
          const s = level.spikes[3];
          if (player.x > s.triggerX && !s.falling) {
            s.falling = true;
            window.sound.playTrap();
          }
          if (s.falling && s.y < 290) s.y += 10;

          // 3. Dodging high block
          const b3 = level.blocks[3];
          const dist = Math.hypot(player.x - (b3.x + b3.w / 2), player.y - b3.y);
          if (dist < 60 && player.vy > 0) {
            b3.y = b3.origY + 60;
          } else if (dist > 120) {
            b3.y = b3.origY;
          }
        }
      }
    ]
  }
];
