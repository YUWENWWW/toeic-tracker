import { Component, inject, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PracticeService } from '../../core/services/practice.service';

interface PartStat {
  part: number;
  label: string;
  type: 'listening' | 'reading';
  correct: number;
  total: number;
  accuracy: number;
}

@Component({
  selector: 'app-analysis',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './analysis.html',
  styleUrl: './analysis.css'
})
export class Analysis {
  private svc = inject(PracticeService);
  records = this.svc.all;

  readonly partMeta: Record<number, { label: string; type: 'listening' | 'reading' }> = {
    1: { label: 'Part1 照片描述', type: 'listening' },
    2: { label: 'Part2 應答問題', type: 'listening' },
    3: { label: 'Part3 簡短對話', type: 'listening' },
    4: { label: 'Part4 簡短獨白', type: 'listening' },
    5: { label: 'Part5 句子填空', type: 'reading' },
    6: { label: 'Part6 段落填空', type: 'reading' },
    7: { label: 'Part7 閱讀測驗', type: 'reading' },
  };

  stats = computed((): PartStat[] => {
    const map: Record<number, { correct: number; total: number }> = {};
    for (const r of this.records()) {
      if (!map[r.part]) map[r.part] = { correct: 0, total: 0 };
      map[r.part].correct += r.correctAnswers;
      map[r.part].total += r.totalQuestions;
    }
    return [1,2,3,4,5,6,7].map(p => ({
      part: p,
      label: this.partMeta[p].label,
      type: this.partMeta[p].type,
      correct: map[p]?.correct ?? 0,
      total: map[p]?.total ?? 0,
      accuracy: map[p] ? Math.round(map[p].correct / map[p].total * 100) : 0,
    }));
  });

  listeningStats = computed(() => this.stats().filter(s => s.type === 'listening'));
  readingStats   = computed(() => this.stats().filter(s => s.type === 'reading'));

  weakParts = computed(() =>
    this.stats()
      .filter(s => s.total > 0 && s.accuracy < 70)
      .sort((a, b) => a.accuracy - b.accuracy)
  );

  totalRecords = computed(() => this.records().length);

  avgAccuracy = computed(() => {
    const all = this.records();
    if (!all.length) return 0;
    const c = all.reduce((s, r) => s + r.correctAnswers, 0);
    const t = all.reduce((s, r) => s + r.totalQuestions, 0);
    return Math.round(c / t * 100);
  });

  barColor(accuracy: number, total: number): string {
    if (!total) return '#e0e0e0';
    if (accuracy >= 80) return '#4caf50';
    if (accuracy >= 60) return '#ff9800';
    return '#f44336';
  }
}
