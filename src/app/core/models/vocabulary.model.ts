export interface VocabularyItem {
  id: string;
  word: string;
  meaning: string;
  status: 'unknown' | 'learning' | 'mastered';
  addedDate: string;
}
