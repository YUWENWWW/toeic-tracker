import { Component, inject, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PracticeService } from '../../core/services/practice.service';
import { PracticeRecord } from '../../core/models/practice-record.model';
import { v4 as uuidv4 } from 'uuid';

@Component({
  selector: 'app-practice',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './practice.html',
  styleUrl: './practice.css'
})
export class Practice {
  private svc = inject(PracticeService);

  records = this.svc.all;

  // 表單狀態
  showForm = signal(false);
  form = signal({
    date: new Date().toISOString().slice(0, 10),
    type: 'listening' as 'listening' | 'reading',
    part: 3 as 1|2|3|4|5|6|7,
    totalQuestions: 13,
    correctAnswers: 10,
    durationMinutes: 20,
    notes: ''
  });

  // 依日期排序的紀錄
  sortedRecords = computed(() =>
    [...this.records()].sort((a, b) => b.date.localeCompare(a.date))
  );

  parts = computed(() =>
    this.form().type === 'listening' ? [1,2,3,4] : [5,6,7]
  );

  accuracy = computed(() => {
    const f = this.form();
    if (!f.totalQuestions) return 0;
    return Math.round(f.correctAnswers / f.totalQuestions * 100);
  });

  updateForm(patch: Partial<ReturnType<typeof this.form>>) {
    this.form.update(f => ({ ...f, ...patch }));
    // 切換類型時重設 part
    if ('type' in patch) {
      const defaultPart = patch['type'] === 'listening' ? 3 : 5;
      this.form.update(f => ({ ...f, part: defaultPart as any }));
    }
  }

  submit() {
    const f = this.form();
    if (f.correctAnswers > f.totalQuestions) {
      alert('答對題數不能超過總題數');
      return;
    }
    this.svc.add({ ...f });
    this.showForm.set(false);
    this.form.set({
      date: new Date().toISOString().slice(0, 10),
      type: 'listening',
      part: 3,
      totalQuestions: 13,
      correctAnswers: 10,
      durationMinutes: 20,
      notes: ''
    });
  }

  delete(id: string) {
    if (confirm('確定刪除這筆紀錄？')) this.svc.delete(id);
  }

  partLabel(type: string, part: number) {
    const labels: Record<number, string> = {
      1: '照片描述', 2: '應答問題', 3: '簡短對話',
      4: '簡短獨白', 5: '句子填空', 6: '段落填空', 7: '閱讀測驗'
    };
    return `Part${part} ${labels[part] ?? ''}`;
  }
}
