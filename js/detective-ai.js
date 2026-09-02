/**
 * GAME DETEKTIF KRIMINAL - AI DETECTIVE EVALUATION ENGINE
 * Analyzes player's typed deduction for Culprit Accuracy (40pts),
 * Motive Understanding (30pts), and Evidence/Modus Operandi Breakdown (30pts).
 * Generates precision score from 1-100 and comprehensive case autopsy review.
 */

class DetectiveAIEngine {
  constructor() {
    this.gradeThresholds = [
      { min: 90, grade: 'S', title: 'Detektif Legendaris (Sherlock Holmes Tier)' },
      { min: 75, grade: 'A', title: 'Inspektur Utama (Detektif Senior)' },
      { min: 60, grade: 'B', title: 'Penyidik Andal' },
      { min: 40, grade: 'C', title: 'Detektif Pemula' },
      { min: 1, grade: 'F', title: 'Deduksi Meleset' }
    ];
  }

  evaluateDeduction(caseData, userText) {
    if (!userText || userText.trim().length === 0) {
      return {
        totalScore: 1,
        culpritScore: 0,
        motiveScore: 0,
        evidenceScore: 0,
        grade: 'F',
        rankTitle: 'Tidak Menyerahkan Laporan',
        commentary: 'Detektif tidak menuliskan berkas laporan deduksi sebelum waktu habis. Tersangka berhasil meloloskan diri!',
        realCulprit: caseData.realCulprit,
        trueMotive: caseData.trueMotive,
        modusOperandi: caseData.modusOperandi,
        keyEvidence: caseData.keyEvidence
      };
    }

    const cleanInput = userText.toLowerCase().replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g, " ");
    const words = cleanInput.split(/\s+/);

    // =========================================================================
    // 1. CULPRIT IDENTIFICATION (Max 40 Points)
    // =========================================================================
    let culpritScore = 0;
    const realCulpritLower = caseData.realCulprit.toLowerCase();
    const culpritKeywords = realCulpritLower.split(' ');

    const hasCulpritName = culpritKeywords.some(kw => kw.length > 2 && cleanInput.includes(kw));

    // Check wrong suspects accused
    const wrongSuspects = caseData.suspects.filter(s => s.name.toLowerCase() !== realCulpritLower);
    const accusedWrong = wrongSuspects.some(ws => {
      const wsWords = ws.name.toLowerCase().split(' ');
      return wsWords.some(w => w.length > 2 && cleanInput.includes(w));
    });

    if (hasCulpritName && !accusedWrong) {
      culpritScore = 40;
    } else if (hasCulpritName && accusedWrong) {
      culpritScore = 24; // named both or hesitated
    } else {
      // Check if named role (e.g. "dokter", "restorator", "asisten")
      const roleWords = caseData.suspects.find(s => s.name === caseData.realCulprit)?.role.toLowerCase().split(' ') || [];
      const hasRole = roleWords.some(rw => rw.length > 3 && cleanInput.includes(rw));
      if (hasRole) culpritScore = 20;
      else culpritScore = 5; // Attempted but wrong person
    }

    // =========================================================================
    // 2. MOTIVE REASONING & BREAKDOWN (Max 30 Points)
    // =========================================================================
    let motiveScore = 0;
    let motiveHits = 0;
    const targetKeywords = caseData.keywords || [];

    targetKeywords.forEach(kw => {
      if (cleanInput.includes(kw.toLowerCase())) {
        motiveHits++;
      }
    });

    // Ratio of keyword matches
    const hitRatio = Math.min(1.0, motiveHits / Math.max(3, targetKeywords.length * 0.45));
    motiveScore = Math.round(hitRatio * 24);

    // Detail bonus based on explanation length and structure
    if (words.length >= 25 && motiveHits >= 1) motiveScore += 6;
    else if (words.length >= 15) motiveScore += 3;

    motiveScore = Math.min(30, Math.max(0, motiveScore));

    // =========================================================================
    // 3. EVIDENCE & MODUS OPERANDI BREAKDOWN (Max 30 Points)
    // =========================================================================
    let evidenceScore = 0;
    const keyEvidenceWords = caseData.keyEvidence.toLowerCase().split(' ').filter(w => w.length > 4);
    let evidenceHits = 0;

    keyEvidenceWords.forEach(ew => {
      if (cleanInput.includes(ew)) evidenceHits++;
    });

    const evRatio = Math.min(1.0, evidenceHits / Math.max(2, keyEvidenceWords.length * 0.25));
    evidenceScore = Math.round(evRatio * 22);

    if (words.length >= 35) evidenceScore += 8;
    else if (words.length >= 20) evidenceScore += 4;

    evidenceScore = Math.min(30, Math.max(0, evidenceScore));

    // =========================================================================
    // TOTAL SCORE CALCULATION & GRADE
    // =========================================================================
    let totalScore = Math.min(100, Math.max(10, culpritScore + motiveScore + evidenceScore));

    // Perfect bonus
    if (culpritScore === 40 && motiveScore >= 26 && evidenceScore >= 26) {
      totalScore = 100;
    }

    let gradeObj = this.gradeThresholds.find(g => totalScore >= g.min) || this.gradeThresholds[this.gradeThresholds.length - 1];

    // Generate Constructive AI Review
    let commentary = '';
    if (culpritScore >= 35) {
      commentary += `🎯 <strong>Identifikasi Pelaku Sempurna:</strong> Anda berhasil menunjuk <em>${caseData.realCulprit}</em> dengan tepat sebagai dalang kejahatan. `;
    } else {
      commentary += `❌ <strong>Kekeliruan Identifikasi:</strong> Tersangka yang Anda tuju kurang tepat atau terdistraksi alibi palsu. Pelaku sebenarnya adalah <em>${caseData.realCulprit}</em>. `;
    }

    if (motiveScore >= 20) {
      commentary += `Motif kejahatan telah diuraikan dengan sangat tajam dan mendalam. `;
    } else {
      commentary += `Analisis motif masih membutuhkan korelasi bukti latar belakang yang lebih kuat. `;
    }

    if (evidenceScore >= 20) {
      commentary += `Bukti kunci dan modus operandi berhasil Anda bongkar secara meyakinkan!`;
    } else {
      commentary += `Perhatikan detail anomali pada TKP dan alibi tersangka untuk menemukan bukti mutlak.`;
    }

    return {
      totalScore,
      culpritScore,
      motiveScore,
      evidenceScore,
      grade: gradeObj.grade,
      rankTitle: gradeObj.title,
      commentary,
      realCulprit: caseData.realCulprit,
      trueMotive: caseData.trueMotive,
      modusOperandi: caseData.modusOperandi,
      keyEvidence: caseData.keyEvidence
    };
  }
}
