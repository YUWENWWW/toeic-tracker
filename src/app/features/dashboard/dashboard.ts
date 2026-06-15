import { Component, computed, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { PracticeService } from '../../core/services/practice.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css'
})
export class Dashboard {
  private svc = inject(PracticeService);

  readonly examDate = new Date('2026-10-18');
  readonly targetScore = 785;

  records = this.svc.all;
  weeklyDays = this.svc.weeklyDays;
  totalHours = this.svc.totalHours;

  daysLeft = computed(() => {
    const diff = this.examDate.getTime() - Date.now();
    return Math.max(0, Math.ceil(diff / 86400000));
  });

  recentRecords = computed(() =>
    [...this.records()]
      .sort((a, b) => b.date.localeCompare(a.date))
      .slice(0, 5)
  );

  overallAccuracy = computed(() => {
    const all = this.records();
    if (!all.length) return 0;
    const correct = all.reduce((s, r) => s + r.correctAnswers, 0);
    const total = all.reduce((s, r) => s + r.totalQuestions, 0);
    return Math.round(correct / total * 100);
  });

  listeningAccuracy = computed(() => this.accuracyOf('listening'));
  readingAccuracy = computed(() => this.accuracyOf('reading'));

  private accuracyOf(type: 'listening' | 'reading') {
    const list = this.records().filter(r => r.type === type);
    if (!list.length) return 0;
    const c = list.reduce((s, r) => s + r.correctAnswers, 0);
    const t = list.reduce((s, r) => s + r.totalQuestions, 0);
    return Math.round(c / t * 100);
  }
}
