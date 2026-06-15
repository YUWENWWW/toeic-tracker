import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
  { path: 'dashboard', loadComponent: () =>
      import('./features/dashboard/dashboard').then(m => m.Dashboard) },
  { path: 'practice', loadComponent: () =>
      import('./features/practice/practice').then(m => m.Practice) },
  { path: 'analysis', loadComponent: () =>
      import('./features/analysis/analysis').then(m => m.Analysis) },
  { path: 'vocabulary', loadComponent: () =>
      import('./features/vocabulary/vocabulary').then(m => m.Vocabulary) },
  { path: 'exam', loadComponent: () =>
      import('./features/exam/exam').then(m => m.Exam) },
];
