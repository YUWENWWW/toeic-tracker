export interface PracticeRecord {
  id: string;
  date: string;
  type: 'listening' | 'reading';
  part: 1 | 2 | 3 | 4 | 5 | 6 | 7;
  totalQuestions: number;
  correctAnswers: number;
  durationMinutes: number;
  notes?: string;
}
