import { Component, inject, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { VocabularyItem } from '../../core/models/vocabulary.model';
import { v4 as uuidv4 } from 'uuid';

@Component({
  selector: 'app-vocabulary',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './vocabulary.html',
  styleUrl: './vocabulary.css'
})
export class Vocabulary {
  private readonly KEY = 'toeic_vocab';

  items = signal<VocabularyItem[]>(this.load());
  showForm = signal(false);
  filterStatus = signal<'all' | 'unknown' | 'learning' | 'mastered'>('all');

  newWord = signal({ word: '', meaning: '' });

  filtered = computed(() => {
    const f = this.filterStatus();
    return this.items().filter(i => f === 'all' || i.status === f);
  });

  stats = computed(() => ({
    unknown:  this.items().filter(i => i.status === 'unknown').length,
    learning: this.items().filter(i => i.status === 'learning').length,
    mastered: this.items().filter(i => i.status === 'mastered').length,
    total:    this.items().length,
  }));

  add() {
    const { word, meaning } = this.newWord();
    if (!word.trim() || !meaning.trim()) return;
    this.items.update(list => [...list, {
      id: uuidv4(), word: word.trim(), meaning: meaning.trim(),
      status: 'unknown', addedDate: new Date().toISOString().slice(0,10)
    }]);
    this.save();
    this.newWord.set({ word: '', meaning: '' });
    this.showForm.set(false);
  }

  updateStatus(id: string, status: VocabularyItem['status']) {
    this.items.update(list =>
      list.map(i => i.id === id ? { ...i, status } : i)
    );
    this.save();
  }

  delete(id: string) {
    if (confirm('確定刪除？')) {
      this.items.update(list => list.filter(i => i.id !== id));
      this.save();
    }
  }

  private load(): VocabularyItem[] {
    try { return JSON.parse(localStorage.getItem(this.KEY) ?? '[]'); }
    catch { return []; }
  }

  private save() {
    localStorage.setItem(this.KEY, JSON.stringify(this.items()));
  }
}
