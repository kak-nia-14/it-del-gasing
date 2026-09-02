/**
 * GOOGLE ANTIGRAVITY IDE - CORE ENGINE & WORKSPACE SYSTEM
 * Virtual File System (VFS), Multi-tab Editor, Live Sandbox Preview,
 * Terminal Emulator, Project Templates, and Space Starfield Background.
 */

class AntigravityCore {
  constructor() {
    this.storageKey = 'antigravity_workspace_v2';
    this.activeFile = 'index.html';
    this.openTabs = ['index.html', 'style.css', 'app.js', 'implementation_plan.md'];
    this.files = {};
    this.commandHistory = [];
    this.historyIndex = -1;
    this.viewportMode = 'desktop';

    this.initTemplates();
    this.loadWorkspace();
    this.initDOM();
    this.initStarfield();
    this.renderFileTree();
    this.renderTabs();
    this.loadFileContent(this.activeFile);
    this.runLivePreview();
  }

  // Pre-configured Project Templates
  initTemplates() {
    this.templates = {
      cyberSphere: {
        name: '🌌 3D Cyber Particle Vortex',
        files: {
          'index.html': `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Cyber Holographic Particle Engine</title>
  <link rel="stylesheet" href="style.css">
</head>
<body>
  <div class="hud">
    <div class="badge">ANTIGRAVITY ENGINE 2.0</div>
    <h1>CYBER PARTICLE SPHERE</h1>
    <p>Move your mouse / touch to distort quantum gravity vortex</p>
    <div class="controls">
      <button id="btnColor" class="btn">Change Spectrum</button>
      <button id="btnSpeed" class="btn">Warp Speed</button>
      <button id="btnExplode" class="btn">Supernova Burst</button>
    </div>
  </div>
  <canvas id="canvas"></canvas>
  <script src="app.js"></script>
</body>
</html>`,
          'style.css': `* { margin: 0; padding: 0; box-sizing: border-box; }
body, html {
  width: 100%; height: 100%; overflow: hidden;
  background: radial-gradient(circle at center, #0f172a 0%, #030712 100%);
  font-family: system-ui, -apple-system, sans-serif;
  color: #fff;
}
canvas { position: absolute; top: 0; left: 0; width: 100%; height: 100%; z-index: 1; }
.hud {
  position: absolute; top: 24px; left: 24px; z-index: 10;
  background: rgba(15, 23, 42, 0.75);
  backdrop-filter: blur(16px);
  border: 1px solid rgba(56, 189, 248, 0.3);
  padding: 18px 24px;
  border-radius: 16px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.6);
  max-width: 380px;
}
.badge {
  display: inline-block; font-size: 10px; font-weight: 800;
  letter-spacing: 1px; color: #38bdf8;
  background: rgba(56, 189, 248, 0.15);
  padding: 3px 8px; border-radius: 99px; margin-bottom: 8px;
}
h1 { font-size: 20px; font-weight: 800; letter-spacing: -0.5px; margin-bottom: 4px; }
p { font-size: 12px; color: #94a3b8; margin-bottom: 14px; }
.controls { display: flex; gap: 8px; }
.btn {
  background: rgba(56, 189, 248, 0.15);
  border: 1px solid rgba(56, 189, 248, 0.4);
  color: #38bdf8; font-size: 11px; font-weight: 700;
  padding: 6px 12px; border-radius: 8px; cursor: pointer;
  transition: all 0.2s;
}
.btn:hover { background: #38bdf8; color: #000; box-shadow: 0 0 12px #38bdf8; }`,
          'app.js': `const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
let width = canvas.width = window.innerWidth;
let height = canvas.height = window.innerHeight;

window.addEventListener('resize', () => {
  width = canvas.width = window.innerWidth;
  height = canvas.height = window.innerHeight;
});

const particles = [];
const particleCount = 280;
let baseHue = 190;
let speedFactor = 1;
let mouse = { x: width / 2, y: height / 2, targetX: width / 2, targetY: height / 2 };

window.addEventListener('mousemove', (e) => {
  mouse.targetX = e.clientX;
  mouse.targetY = e.clientY;
});

class Particle3D {
  constructor() {
    this.reset();
  }
  reset() {
    this.theta = Math.random() * Math.PI * 2;
    this.phi = Math.acos((Math.random() * 2) - 1);
    this.radius = 180 + Math.random() * 80;
    this.size = Math.random() * 2.5 + 1;
    this.speed = (Math.random() * 0.015 + 0.005);
    this.hueShift = Math.random() * 60;
  }
  update(rotationAngle) {
    this.theta += this.speed * speedFactor;
    
    // 3D Spherical Coordinates to 2D Screen
    const x = this.radius * Math.sin(this.phi) * Math.cos(this.theta + rotationAngle);
    const y = this.radius * Math.cos(this.phi);
    const z = this.radius * Math.sin(this.phi) * Math.sin(this.theta + rotationAngle);
    
    const fov = 350;
    const scale = fov / (fov + z);
    
    this.screenX = width / 2 + x * scale + (mouse.x - width / 2) * 0.15;
    this.screenY = height / 2 + y * scale + (mouse.y - height / 2) * 0.15;
    this.screenScale = scale;
    this.alpha = Math.max(0.1, (z + 260) / 520);
  }
  draw() {
    ctx.beginPath();
    ctx.arc(this.screenX, this.screenY, this.size * this.screenScale, 0, Math.PI * 2);
    ctx.fillStyle = \`hsla(\${baseHue + this.hueShift}, 90%, 65%, \${this.alpha})\`;
    ctx.shadowBlur = 12 * this.screenScale;
    ctx.shadowColor = \`hsl(\${baseHue + this.hueShift}, 90%, 60%)\`;
    ctx.fill();
  }
}

for (let i = 0; i < particleCount; i++) {
  particles.push(new Particle3D());
}

let rotation = 0;
function animate() {
  ctx.fillStyle = 'rgba(7, 9, 14, 0.25)';
  ctx.fillRect(0, 0, width, height);
  
  mouse.x += (mouse.targetX - mouse.x) * 0.05;
  mouse.y += (mouse.targetY - mouse.y) * 0.05;
  
  rotation += 0.008 * speedFactor;
  
  particles.forEach(p => {
    p.update(rotation);
    p.draw();
  });
  
  requestAnimationFrame(animate);
}
animate();

document.getElementById('btnColor').addEventListener('click', () => {
  baseHue = (baseHue + 70) % 360;
  console.log('⚡ Spectrum adjusted to Hue:', baseHue);
});

document.getElementById('btnSpeed').addEventListener('click', () => {
  speedFactor = speedFactor === 1 ? 3 : (speedFactor === 3 ? 0.4 : 1);
  console.log('🚀 Warp factor set to:', speedFactor);
});

document.getElementById('btnExplode').addEventListener('click', () => {
  particles.forEach(p => { p.radius += Math.random() * 200; });
  console.log('💥 Supernova wave initiated!');
});`,
          'README.md': `# Cyber Holographic Particle Engine
Dibangun secara otonom dengan **Google Antigravity IDE (DeepMind Edition)**.
- 100% Client-side 3D Math Sphere
- Reactive mouse distortion
- Zero-cost, zero-latency execution.`,
          'implementation_plan.md': `# Implementation Plan: Antigravity Cyber Particle Engine

## Goal Description
Membuat visualisasi partikel 3D berbentuk bola holografik dengan distorsi gravitasi kursor interaktif dan kendali spektrum warna waktu nyata.

## Components
- [NEW] [index.html](file:///index.html): Struktur canvas dan HUD kaca buram
- [NEW] [style.css](file:///style.css): Desain modern tema cyberpunk neon
- [NEW] [app.js](file:///app.js): Logika proyeksi 3D ke 2D dan partikel rendering`
        }
      }
    };
  }

  // Load from local storage or set default template
  loadWorkspace() {
    const saved = localStorage.getItem(this.storageKey);
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        this.files = parsed.files || this.templates.cyberSphere.files;
        this.openTabs = parsed.openTabs || Object.keys(this.files);
        this.activeFile = parsed.activeFile || Object.keys(this.files)[0];
        return;
      } catch (e) {
        console.error('Failed to parse saved workspace, loading default', e);
      }
    }
    this.files = { ...this.templates.cyberSphere.files };
  }

  saveWorkspace() {
    localStorage.setItem(this.storageKey, JSON.stringify({
      files: this.files,
      openTabs: this.openTabs,
      activeFile: this.activeFile
    }));
  }

  initDOM() {
    this.fileTreeEl = document.getElementById('fileTree');
    this.tabsListEl = document.getElementById('tabsList');
    this.codeEditorEl = document.getElementById('codeEditorTextarea');
    this.lineNumbersEl = document.getElementById('lineNumbers');
    this.previewIframe = document.getElementById('previewIframe');
    this.terminalOutputEl = document.getElementById('terminalOutput');
    this.terminalInputEl = document.getElementById('terminalInput');
    this.diffPanelEl = document.getElementById('diffViewerPanel');

    // Code editor input event
    this.codeEditorEl.addEventListener('input', () => {
      this.files[this.activeFile] = this.codeEditorEl.value;
      this.updateLineNumbers();
      this.saveWorkspace();
      this.debouncePreview();
    });

    // Code editor scroll sync with line numbers
    this.codeEditorEl.addEventListener('scroll', () => {
      this.lineNumbersEl.scrollTop = this.codeEditorEl.scrollTop;
    });

    // Keyboard support for indentation & shortcuts
    this.codeEditorEl.addEventListener('keydown', (e) => {
      if (e.key === 'Tab') {
        e.preventDefault();
        const start = this.codeEditorEl.selectionStart;
        const end = this.codeEditorEl.selectionEnd;
        this.codeEditorEl.value = this.codeEditorEl.value.substring(0, start) + '  ' + this.codeEditorEl.value.substring(end);
        this.codeEditorEl.selectionStart = this.codeEditorEl.selectionEnd = start + 2;
        this.files[this.activeFile] = this.codeEditorEl.value;
        this.saveWorkspace();
      }
    });

    // Terminal command input
    this.terminalInputEl.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        const cmd = this.terminalInputEl.value.trim();
        if (cmd) {
          this.executeTerminalCommand(cmd);
          this.commandHistory.push(cmd);
          this.historyIndex = this.commandHistory.length;
          this.terminalInputEl.value = '';
        }
      } else if (e.key === 'ArrowUp') {
        if (this.historyIndex > 0) {
          this.historyIndex--;
          this.terminalInputEl.value = this.commandHistory[this.historyIndex] || '';
        }
      } else if (e.key === 'ArrowDown') {
        if (this.historyIndex < this.commandHistory.length - 1) {
          this.historyIndex++;
          this.terminalInputEl.value = this.commandHistory[this.historyIndex] || '';
        } else {
          this.historyIndex = this.commandHistory.length;
          this.terminalInputEl.value = '';
        }
      }
    });

    // Viewport switcher buttons
    document.querySelectorAll('.viewport-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        document.querySelectorAll('.viewport-btn').forEach(b => b.classList.remove('active'));
        const target = e.currentTarget;
        target.classList.add('active');
        const mode = target.dataset.mode;
        this.setViewportMode(mode);
      });
    });

    // New File Button
    document.getElementById('btnNewFile')?.addEventListener('click', () => {
      const fileName = prompt('Nama file baru (contoh: script.js, utils.css):');
      if (fileName && fileName.trim()) {
        const name = fileName.trim();
        if (!this.files[name]) {
          this.files[name] = `/* ${name} */\n`;
          if (!this.openTabs.includes(name)) this.openTabs.push(name);
          this.activeFile = name;
          this.saveWorkspace();
          this.renderFileTree();
          this.renderTabs();
          this.loadFileContent(name);
          this.logTerminal(`File '${name}' berhasil dibuat.`, 'success');
        } else {
          alert('File dengan nama tersebut sudah ada!');
        }
      }
    });

    // Export / Download Project Button
    document.getElementById('btnExportZip')?.addEventListener('click', () => {
      this.exportProjectSingleFile();
    });

    // Quick Format Code Button
    document.getElementById('btnFormatCode')?.addEventListener('click', () => {
      this.formatActiveCode();
    });
  }

  // Render Left Sidebar File Explorer Tree
  renderFileTree() {
    this.fileTreeEl.innerHTML = '';
    const fileEntries = Object.keys(this.files);

    fileEntries.forEach(fileName => {
      const item = document.createElement('div');
      item.className = `file-item ${fileName === this.activeFile ? 'active' : ''}`;
      
      let icon = '📄';
      if (fileName.endsWith('.html')) icon = '🌐';
      else if (fileName.endsWith('.css')) icon = '🎨';
      else if (fileName.endsWith('.js')) icon = '⚡';
      else if (fileName.endsWith('.md')) icon = '📝';
      else if (fileName.endsWith('.json')) icon = '📦';

      item.innerHTML = `
        <span class="file-icon">${icon}</span>
        <span class="file-name">${fileName}</span>
      `;

      item.addEventListener('click', () => {
        if (!this.openTabs.includes(fileName)) {
          this.openTabs.push(fileName);
        }
        this.activeFile = fileName;
        this.saveWorkspace();
        this.renderFileTree();
        this.renderTabs();
        this.loadFileContent(fileName);
      });

      this.fileTreeEl.appendChild(item);
    });
  }

  // Render Tabs above code editor
  renderTabs() {
    this.tabsListEl.innerHTML = '';
    this.openTabs.forEach(tabName => {
      const tab = document.createElement('div');
      tab.className = `editor-tab ${tabName === this.activeFile ? 'active' : ''}`;
      tab.innerHTML = `
        <span>${tabName}</span>
        <span class="tab-close" data-file="${tabName}">✕</span>
      `;

      tab.addEventListener('click', (e) => {
        if (e.target.classList.contains('tab-close')) {
          e.stopPropagation();
          this.closeTab(tabName);
        } else {
          this.activeFile = tabName;
          this.saveWorkspace();
          this.renderFileTree();
          this.renderTabs();
          this.loadFileContent(tabName);
        }
      });

      this.tabsListEl.appendChild(tab);
    });
  }

  closeTab(tabName) {
    this.openTabs = this.openTabs.filter(t => t !== tabName);
    if (this.openTabs.length === 0) {
      this.openTabs = [Object.keys(this.files)[0]];
    }
    if (this.activeFile === tabName) {
      this.activeFile = this.openTabs[this.openTabs.length - 1];
    }
    this.saveWorkspace();
    this.renderFileTree();
    this.renderTabs();
    this.loadFileContent(this.activeFile);
  }

  loadFileContent(fileName) {
    this.codeEditorEl.value = this.files[fileName] || '';
    this.updateLineNumbers();
    
    // Update breadcrumb
    const crumbFile = document.getElementById('crumbActiveFile');
    if (crumbFile) crumbFile.textContent = fileName;
  }

  updateLineNumbers() {
    const lines = (this.codeEditorEl.value.match(/\n/g) || []).length + 1;
    let numbers = '';
    for (let i = 1; i <= Math.max(lines, 15); i++) {
      numbers += i + '\n';
    }
    this.lineNumbersEl.textContent = numbers;
  }

  debouncePreview() {
    clearTimeout(this.previewTimer);
    this.previewTimer = setTimeout(() => {
      this.runLivePreview();
    }, 400);
  }

  // Compile and run live web preview with console interceptor
  runLivePreview() {
    let html = this.files['index.html'] || '<h1>No index.html found</h1>';
    const css = this.files['style.css'] || '';
    const js = this.files['app.js'] || '';

    // Inject CSS
    if (css) {
      html = html.replace('</head>', `<style>${css}</style></head>`);
    }

    // Interceptor script to bridge iframe logs to IDE terminal
    const interceptor = `
      <script>
        (function() {
          const sendLog = (type, args) => {
            const msg = Array.from(args).map(a => typeof a === 'object' ? JSON.stringify(a) : String(a)).join(' ');
            window.parent.postMessage({ type: 'PREVIEW_LOG', level: type, message: msg }, '*');
          };
          const origLog = console.log;
          console.log = function() { sendLog('info', arguments); origLog.apply(console, arguments); };
          const origWarn = console.warn;
          console.warn = function() { sendLog('warn', arguments); origWarn.apply(console, arguments); };
          const origError = console.error;
          console.error = function() { sendLog('error', arguments); origError.apply(console, arguments); };
        })();
      </script>
    `;

    // Inject JS & Interceptor
    html = html.replace('</body>', `${interceptor}<script>${js}<\/script></body>`);

    this.previewIframe.srcdoc = html;
  }

  setViewportMode(mode) {
    this.viewportMode = mode;
    this.previewIframe.className = '';
    if (mode === 'tablet') {
      this.previewIframe.classList.add('tablet-view');
    } else if (mode === 'mobile') {
      this.previewIframe.classList.add('mobile-view');
    }
  }

  // Execute terminal shell commands
  executeTerminalCommand(cmd) {
    this.logTerminal(`$ ${cmd}`, 'cmd');
    const parts = cmd.split(' ');
    const main = parts[0].toLowerCase();
    const arg = parts.slice(1).join(' ');

    switch (main) {
      case 'help':
        this.logTerminal(`Perintah yang tersedia:
  help              - Menampilkan bantuan
  ls / dir          - Melihat daftar file proyek
  cat <file>        - Membaca isi file
  touch <file>      - Membuat file baru
  rm <file>         - Menghapus file
  run / start       - Menjalankan live preview
  format            - Memformat kode yang aktif
  clear / cls       - Membersihkan terminal
  git status        - Cek status repository virtual
  ai <prompt>       - Menjalankan prompt AI langsung`, 'info');
        break;

      case 'ls':
      case 'dir':
        const fileList = Object.keys(this.files).map(f => `  ${f}  (${this.files[f].length} bytes)`).join('\n');
        this.logTerminal(fileList, 'info');
        break;

      case 'cat':
        if (!arg) {
          this.logTerminal('Gunakan: cat <nama_file>', 'error');
        } else if (this.files[arg]) {
          this.logTerminal(this.files[arg]);
        } else {
          this.logTerminal(`File '${arg}' tidak ditemukan.`, 'error');
        }
        break;

      case 'touch':
        if (!arg) {
          this.logTerminal('Gunakan: touch <nama_file>', 'error');
        } else {
          this.files[arg] = `/* ${arg} */\n`;
          if (!this.openTabs.includes(arg)) this.openTabs.push(arg);
          this.activeFile = arg;
          this.saveWorkspace();
          this.renderFileTree();
          this.renderTabs();
          this.loadFileContent(arg);
          this.logTerminal(`File '${arg}' berhasil dibuat.`, 'success');
        }
        break;

      case 'rm':
        if (!arg) {
          this.logTerminal('Gunakan: rm <nama_file>', 'error');
        } else if (this.files[arg]) {
          delete this.files[arg];
          this.openTabs = this.openTabs.filter(t => t !== arg);
          if (this.openTabs.length === 0) this.openTabs = [Object.keys(this.files)[0]];
          this.activeFile = this.openTabs[0];
          this.saveWorkspace();
          this.renderFileTree();
          this.renderTabs();
          this.loadFileContent(this.activeFile);
          this.logTerminal(`File '${arg}' dihapus.`, 'success');
        } else {
          this.logTerminal(`File '${arg}' tidak ditemukan.`, 'error');
        }
        break;

      case 'run':
      case 'start':
        this.runLivePreview();
        this.logTerminal('Live preview instance diperbarui.', 'success');
        break;

      case 'clear':
      case 'cls':
        this.terminalOutputEl.innerHTML = '';
        break;

      case 'format':
        this.formatActiveCode();
        break;

      case 'git':
        if (arg === 'status') {
          this.logTerminal(`On branch main\nYour branch is up to date with 'origin/main'.\nVirtual File Count: ${Object.keys(this.files).length}\nNothing to commit, working tree clean.`, 'info');
        } else {
          this.logTerminal(`git: ${arg || 'command not recognized'}`, 'info');
        }
        break;

      case 'ai':
        if (window.antigravityAI) {
          window.antigravityAI.processUserPrompt(arg);
        }
        break;

      default:
        this.logTerminal(`Perintah '${main}' tidak dikenali. Ketik 'help' untuk daftar perintah.`, 'error');
        break;
    }
  }

  logTerminal(text, type = '') {
    const line = document.createElement('div');
    line.className = `terminal-line ${type}`;
    line.textContent = text;
    this.terminalOutputEl.appendChild(line);
    this.terminalOutputEl.scrollTop = this.terminalOutputEl.scrollHeight;
  }

  formatActiveCode() {
    let content = this.codeEditorEl.value;
    // Simple indentation beautifier
    try {
      if (this.activeFile.endsWith('.json')) {
        content = JSON.stringify(JSON.parse(content), null, 2);
      }
      this.codeEditorEl.value = content;
      this.files[this.activeFile] = content;
      this.saveWorkspace();
      this.logTerminal(`Kode '${this.activeFile}' berhasil diformat.`, 'success');
    } catch (e) {
      this.logTerminal(`Format error: ${e.message}`, 'error');
    }
  }

  exportProjectSingleFile() {
    const htmlContent = `<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <title>Exported from Google Antigravity IDE</title>
  <style>${this.files['style.css'] || ''}</style>
</head>
<body>
  ${(this.files['index.html'] || '').replace(/<!DOCTYPE.*?>/i, '').replace(/<html.*?>/i, '').replace(/<head>[\s\S]*?<\/head>/i, '').replace(/<\/?body>/g, '')}
  <script>${this.files['app.js'] || ''}<\/script>
</body>
</html>`;

    const blob = new Blob([htmlContent], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `antigravity_project_${Date.now()}.html`;
    a.click();
    URL.revokeObjectURL(url);
    this.logTerminal('Proyek berhasil diekspor sebagai file HTML mandiri.', 'success');
  }

  // Starfield deep space ambient background animation
  initStarfield() {
    const canvas = document.getElementById('spaceCanvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let width = canvas.width = window.innerWidth;
    let height = canvas.height = window.innerHeight;

    window.addEventListener('resize', () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    });

    const stars = [];
    const count = 150;
    for (let i = 0; i < count; i++) {
      stars.push({
        x: Math.random() * width,
        y: Math.random() * height,
        size: Math.random() * 1.5 + 0.5,
        alpha: Math.random() * 0.8 + 0.2,
        speed: Math.random() * 0.2 + 0.05
      });
    }

    function animateSpace() {
      ctx.clearRect(0, 0, width, height);
      stars.forEach(s => {
        s.y += s.speed;
        if (s.y > height) s.y = 0;
        ctx.fillStyle = `rgba(255, 255, 255, ${s.alpha})`;
        ctx.fillRect(s.x, s.y, s.size, s.size);
      });
      requestAnimationFrame(animateSpace);
    }
    animateSpace();
  }
}

// Global preview logger listener
window.addEventListener('message', (e) => {
  if (e.data && e.data.type === 'PREVIEW_LOG') {
    if (window.antigravityCore) {
      window.antigravityCore.logTerminal(`[Live Preview] ${e.data.message}`, e.data.level === 'error' ? 'error' : (e.data.level === 'warn' ? 'info' : ''));
    }
  }
});
