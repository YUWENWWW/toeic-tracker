import { Component, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MockExam } from '../../core/models/mock-exam.model';
import { v4 as uuidv4 } from 'uuid';

@Component({
  selector: 'app-exam',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './exam.html',
  styleUrl: './exam.css'
})
export class Exam {
  private readonly KEY = 'toeic_exams';

  exams = signal<MockExam[]>(this.load());
  showForm = signal(false);

  form = signal({
    date: new Date().toISOString().slice(0, 10),
    listeningScore: 0,
    readingScore: 0,
  });

  sorted = computed(() =>
    [...this.exams()].sort((a, b) => a.date.localeCompare(b.date))
  );

  latest = computed(() => {
    const s = this.sorted();
    return s.length ? s[s.length - 1] : null;
  });

  best = computed(() => {
    const s = this.exams();
    if (!s.length) return null;
    return s.reduce((best, e) => e.totalScore > best.totalScore ? e : best);
  });

  trend = computed(() => {
    const s = this.sorted();
    if (s.length < 2) return null;
    const diff = s[s.length-1].totalScore - s[s.length-2].totalScore;
    return diff > 0 ? `+${diff}` : `${diff}`;
  });

  updateForm(patch: Partial<typeof this.form extends () => infer T ? T : never>) {
    this.form.update(f => ({ ...f, ...patch }));
  }

  totalPreview = computed(() =>
    (this.form().listeningScore || 0) + (this.form().readingScore || 0)
  );

  submit() {
    const f = this.form();
    const total = f.listeningScore + f.readingScore;
    const round = this.exams().length + 1;
    this.exams.update(list => [...list, {
      id: uuidv4(),
      date: f.date,
      round,
      listeningScore: f.listeningScore,
      readingScore: f.readingScore,
      totalScore: total,
    }]);
    this.save();
    this.showForm.set(false);
    this.form.set({ date: new Date().toISOString().slice(0,10), listeningScore: 0, readingScore: 0 });
  }

  delete(id: string) {
    if (confirm('確定刪除？')) {
      this.exams.update(list => list.filter(e => e.id !== id));
      this.save();
    }
  }

  scoreColor(score: number): string {
    if (score >= 785) return '#4caf50';
    if (score >= 600) return '#ff9800';
    return '#f44336';
  }

  private load(): MockExam[] {
    try { return JSON.parse(localStorage.getItem(this.KEY) ?? '[]'); }
    catch { return []; }
  }

  private save() {
    localStorage.setItem(this.KEY, JSON.stringify(this.exams()));
  }
}
