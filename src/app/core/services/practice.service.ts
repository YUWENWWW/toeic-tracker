import { Injectable, signal, computed } from '@angular/core';
import { PracticeRecord } from '../models/practice-record.model';
import { v4 as uuidv4 } from 'uuid';

@Injectable({ providedIn: 'root' })
export class PracticeService {
  private readonly KEY = 'toeic_records';
  private records = signal<PracticeRecord[]>(this.load());

  all = this.records.asReadonly();

  weeklyDays = computed(() => {
    const now = new Date();
    const monday = new Date(now);
    monday.setDate(now.getDate() - now.getDay() + 1);
    monday.setHours(0, 0, 0, 0);
    const days = new Set(
      this.records()
        .filter(r => new Date(r.date) >= monday)
        .map(r => r.date)
    );
    return days.size;
  });

  totalHours = computed(() =>
    Math.round(
      this.records().reduce((s, r) => s + r.durationMinutes, 0) / 60 * 10
    ) / 10
  );

  accuracyByPart = computed(() => {
    const map: Record<number, { correct: number; total: number }> = {};
    for (const r of this.records()) {
      if (!map[r.part]) map[r.part] = { correct: 0, total: 0 };
      map[r.part].correct += r.correctAnswers;
      map[r.part].total += r.totalQuestions;
    }
    return map;
  });

  add(data: Omit<PracticeRecord, 'id'>) {
    this.records.update(list => [...list, { ...data, id: uuidv4() }]);
    this.save();
  }

  delete(id: string) {
    this.records.update(list => list.filter(r => r.id !== id));
    this.save();
  }

  private load(): PracticeRecord[] {
    try {
      return JSON.parse(localStorage.getItem(this.KEY) ?? '[]');
    } catch { return []; }
  }

  private save() {
    localStorage.setItem(this.KEY, JSON.stringify(this.records()));
  }
}
