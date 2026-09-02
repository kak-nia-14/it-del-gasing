/**
 * Dormitory Simulator - 3-Tier Closet / Locker Organization Simulator
 * Specific layout according to SUD Dorm standards:
 * - Top Shelf (6 items): Bontot, Botol Minum, Snack, Jam Waker, Gelas Stainless, Kotak Susu Bubuk
 * - Middle Shelf (3 sections): Kiri (Baju), Tengah (Jaket), Kanan (Celana)
 * - Bottom Shelf: Tas
 */

class ClosetSimulator {
  constructor() {
    this.itemsDefinition = [
      // Top shelf items
      { id: 'bontot', name: '🍱 Bontot / Ompreng', targetZone: 'top', slotName: 'Bontot', svgKey: 'bontot' },
      { id: 'botolMinum', name: '🍶 Botol Minum (Tumbler)', targetZone: 'top', slotName: 'Botol Minum', svgKey: 'botolMinum' },
      { id: 'snack', name: '🍪 Snack / Biskuit', targetZone: 'top', slotName: 'Snack', svgKey: 'snack' },
      { id: 'jamWaker', name: '⏰ Jam Waker (Alarm)', targetZone: 'top', slotName: 'Jam Waker', svgKey: 'jamWaker' },
      { id: 'gelasStainless', name: '🥤 Gelas Stainless', targetZone: 'top', slotName: 'Gelas Stainless', svgKey: 'gelasStainless' },
      { id: 'kotakSusuBubuk', name: '🥛 Kotak Susu Bubuk', targetZone: 'top', slotName: 'Kotak Susu Bubuk', svgKey: 'kotakSusuBubuk' },

      // Middle shelf items (3 compartments)
      { id: 'baju', name: '👕 Baju Lipat (Kiri)', targetZone: 'mid-left', slotName: 'Baju (Kiri)', svgKey: 'bajuLipat' },
      { id: 'jaket', name: '🧥 Jaket Lipat (Tengah)', targetZone: 'mid-center', slotName: 'Jaket (Tengah)', svgKey: 'jaketLipat' },
      { id: 'celana', name: '👖 Celana Lipat (Kanan)', targetZone: 'mid-right', slotName: 'Celana (Kanan)', svgKey: 'celanaLipat' },

      // Bottom shelf items
      { id: 'tas', name: '🎒 Tas Ransel Del', targetZone: 'bottom', slotName: 'Tas Ransel', svgKey: 'tas' }
    ];

    // State: item placements { [itemId]: targetZoneId | null }
    this.placements = {};
    this.selectedItem = null;
    this.draggedItemId = null;
  }

  init() {
    this.reset();
  }

  reset() {
    this.placements = {};
    this.itemsDefinition.forEach(item => {
      this.placements[item.id] = null;
    });
    this.selectedItem = null;
    this.draggedItemId = null;
    this.renderInventory();
    this.renderCloset();
    this.updateProgress();
  }

  selectItem(itemId) {
    if (this.placements[itemId]) return; // already placed
    window.sound.playClick();
    if (this.selectedItem === itemId) {
      this.selectedItem = null;
    } else {
      this.selectedItem = itemId;
    }
    this.renderInventory();
    this.highlightDropZones();
  }

  highlightDropZones() {
    const zones = document.querySelectorAll('.closet-zone');
    zones.forEach(zone => {
      zone.classList.remove('zone-hint');
      if (this.selectedItem) {
        const itemObj = this.itemsDefinition.find(i => i.id === this.selectedItem);
        if (itemObj && zone.dataset.zone === itemObj.targetZone) {
          zone.classList.add('zone-hint');
        }
      }
    });
  }

  placeSelectedItemIntoZone(zoneId) {
    if (!this.selectedItem) return;
    this.handleDrop(this.selectedItem, zoneId);
    this.selectedItem = null;
    this.highlightDropZones();
  }

  handleDrop(itemId, zoneId) {
    const itemObj = this.itemsDefinition.find(i => i.id === itemId);
    if (!itemObj) return;

    if (itemObj.targetZone === zoneId) {
      // Correct placement!
      this.placements[itemId] = zoneId;
      window.sound.playSnap();
      this.showToast(`✅ ${itemObj.name} berhasil ditata rapi di posisinya!`, 'success');

      // Check if all placed
      const totalPlaced = Object.values(this.placements).filter(Boolean).length;
      if (totalPlaced === this.itemsDefinition.length) {
        setTimeout(() => {
          window.sound.playSuccess();
          this.showInspectionSuccess();
        }, 400);
      }
    } else {
      // Incorrect placement
      window.sound.playError();
      const properName = this.getZoneDisplayName(itemObj.targetZone);
      this.showToast(`⚠️ Salah rak! ${itemObj.name} seharusnya diletakkan di ${properName}.`, 'error');
    }

    this.renderInventory();
    this.renderCloset();
    this.updateProgress();
  }

  getZoneDisplayName(zoneId) {
    switch (zoneId) {
      case 'top': return 'Rak Atas';
      case 'mid-left': return 'Rak Tengah Bagian Kiri (Baju)';
      case 'mid-center': return 'Rak Tengah Bagian Tengah (Jaket)';
      case 'mid-right': return 'Rak Tengah Bagian Kanan (Celana)';
      case 'bottom': return 'Rak Bawah (Tas)';
      default: return 'lemari';
    }
  }

  removeItem(itemId) {
    if (!this.placements[itemId]) return;
    window.sound.playClick();
    this.placements[itemId] = null;
    this.renderInventory();
    this.renderCloset();
    this.updateProgress();
  }

  renderInventory() {
    const invEl = document.getElementById('closetInventoryItems');
    if (!invEl) return;

    const unplacedItems = this.itemsDefinition.filter(item => !this.placements[item.id]);

    if (unplacedItems.length === 0) {
      invEl.innerHTML = `
        <div class="all-items-placed">
          🎉 Semua barang telah tertata rapi di lemari!
        </div>
      `;
      return;
    }

    invEl.innerHTML = unplacedItems.map(item => `
      <div class="inventory-card ${this.selectedItem === item.id ? 'selected' : ''}" 
           draggable="true"
           ondragstart="window.closetSim.onDragStart(event, '${item.id}')"
           onclick="window.closetSim.selectItem('${item.id}')"
           title="Klik atau seret ke lemari: ${item.name}">
        <div class="inv-svg-wrap">
          ${window.SVGAssets[item.svgKey] || ''}
        </div>
        <span class="inv-title">${item.name}</span>
      </div>
    `).join('');
  }

  renderCloset() {
    // 1. Top Shelf (Bontot, Botol, Snack, Jam Waker, Gelas Stainless, Kotak Susu)
    const topZone = document.getElementById('zoneTop');
    if (topZone) {
      const topItems = this.itemsDefinition.filter(i => i.targetZone === 'top' && this.placements[i.id] === 'top');
      topZone.innerHTML = `
        <div class="shelf-label">🔝 RAK ATAS (Kebutuhan & Makanan)</div>
        <div class="shelf-grid top-shelf-grid">
          ${this.itemsDefinition.filter(i => i.targetZone === 'top').map(item => {
            const isPlaced = this.placements[item.id] === 'top';
            return `
              <div class="shelf-slot ${isPlaced ? 'filled' : 'empty'}" 
                   onclick="${isPlaced ? `window.closetSim.removeItem('${item.id}')` : `window.closetSim.placeSelectedItemIntoZone('top')`}">
                ${isPlaced ? `
                  <div class="placed-item-wrap" title="Klik untuk ambil kembali: ${item.name}">
                    ${window.SVGAssets[item.svgKey] || ''}
                    <span class="item-tag">${item.slotName}</span>
                  </div>
                ` : `
                  <div class="empty-slot-guide">${item.slotName}</div>
                `}
              </div>
            `;
          }).join('')}
        </div>
      `;
    }

    // 2. Middle Shelf - Left (Baju)
    const midLeft = document.getElementById('zoneMidLeft');
    if (midLeft) {
      const isPlaced = this.placements['baju'] === 'mid-left';
      midLeft.innerHTML = `
        <div class="section-label">👈 KIRI (Baju)</div>
        <div class="mid-slot ${isPlaced ? 'filled' : 'empty'}"
             onclick="${isPlaced ? `window.closetSim.removeItem('baju')` : `window.closetSim.placeSelectedItemIntoZone('mid-left')`}">
          ${isPlaced ? `
            <div class="placed-item-wrap" title="Klik untuk ambil">
              ${window.SVGAssets.bajuLipat}
              <span class="item-tag">Baju Lipat</span>
            </div>
          ` : `<div class="empty-slot-guide">👕 Tumpukan Baju</div>`}
        </div>
      `;
    }

    // 3. Middle Shelf - Center (Jaket)
    const midCenter = document.getElementById('zoneMidCenter');
    if (midCenter) {
      const isPlaced = this.placements['jaket'] === 'mid-center';
      midCenter.innerHTML = `
        <div class="section-label">👆 TENGAH (Jaket)</div>
        <div class="mid-slot ${isPlaced ? 'filled' : 'empty'}"
             onclick="${isPlaced ? `window.closetSim.removeItem('jaket')` : `window.closetSim.placeSelectedItemIntoZone('mid-center')`}">
          ${isPlaced ? `
            <div class="placed-item-wrap" title="Klik untuk ambil">
              ${window.SVGAssets.jaketLipat}
              <span class="item-tag">Jaket Lipat</span>
            </div>
          ` : `<div class="empty-slot-guide">🧥 Tumpukan Jaket</div>`}
        </div>
      `;
    }

    // 4. Middle Shelf - Right (Celana)
    const midRight = document.getElementById('zoneMidRight');
    if (midRight) {
      const isPlaced = this.placements['celana'] === 'mid-right';
      midRight.innerHTML = `
        <div class="section-label">👉 KANAN (Celana)</div>
        <div class="mid-slot ${isPlaced ? 'filled' : 'empty'}"
             onclick="${isPlaced ? `window.closetSim.removeItem('celana')` : `window.closetSim.placeSelectedItemIntoZone('mid-right')`}">
          ${isPlaced ? `
            <div class="placed-item-wrap" title="Klik untuk ambil">
              ${window.SVGAssets.celanaLipat}
              <span class="item-tag">Celana Lipat</span>
            </div>
          ` : `<div class="empty-slot-guide">👖 Tumpukan Celana</div>`}
        </div>
      `;
    }

    // 5. Bottom Shelf (Tas)
    const bottomZone = document.getElementById('zoneBottom');
    if (bottomZone) {
      const isPlaced = this.placements['tas'] === 'bottom';
      bottomZone.innerHTML = `
        <div class="shelf-label">🔽 RAK BAWAH (Tas)</div>
        <div class="bottom-slot ${isPlaced ? 'filled' : 'empty'}"
             onclick="${isPlaced ? `window.closetSim.removeItem('tas')` : `window.closetSim.placeSelectedItemIntoZone('bottom')`}">
          ${isPlaced ? `
            <div class="placed-item-wrap bottom-tas-wrap" title="Klik untuk ambil">
              ${window.SVGAssets.tas}
              <span class="item-tag">Tas Ransel Del</span>
            </div>
          ` : `<div class="empty-slot-guide">🎒 Tempat Tas Ransel</div>`}
        </div>
      `;
    }
  }

  updateProgress() {
    const total = this.itemsDefinition.length;
    const placed = Object.values(this.placements).filter(Boolean).length;
    const percent = Math.round((placed / total) * 100);

    const bar = document.getElementById('closetProgressBar');
    const text = document.getElementById('closetProgressText');

    if (bar) bar.style.width = `${percent}%`;
    if (text) text.innerText = `${placed} / ${total} Barang (${percent}%)`;
  }

  // Drag & Drop HTML5 handlers
  onDragStart(event, itemId) {
    this.draggedItemId = itemId;
    event.dataTransfer.setData('text/plain', itemId);
    event.dataTransfer.effectAllowed = 'move';
  }

  onDragOver(event) {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
  }

  onDrop(event, zoneId) {
    event.preventDefault();
    const itemId = event.dataTransfer.getData('text/plain') || this.draggedItemId;
    if (itemId) {
      this.handleDrop(itemId, zoneId);
    }
    this.draggedItemId = null;
  }

  checkKurveInspection() {
    const total = this.itemsDefinition.length;
    const placed = Object.values(this.placements).filter(Boolean).length;

    if (placed === total) {
      window.sound.playFanfare();
      this.showInspectionSuccess();
    } else {
      window.sound.playError();
      this.showToast(`⚠️ Masih ada ${total - placed} barang yang belum dimasukkan ke lemari!`, 'warning');
    }
  }

  showInspectionSuccess() {
    const modal = document.getElementById('closetModal');
    if (modal) modal.classList.add('show');
  }

  showToast(msg, type = 'info') {
    const toast = document.getElementById('gameToast');
    if (!toast) return;
    toast.className = `game-toast show ${type}`;
    toast.innerText = msg;
    setTimeout(() => {
      toast.classList.remove('show');
    }, 2800);
  }
}

window.closetSim = new ClosetSimulator();
