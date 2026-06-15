import { Component } from '@angular/core';
import { RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink, RouterLinkActive],
  template: `
    <header class="top-bar">
      <span class="logo">📚 TOEIC Tracker</span>
    </header>
    <nav class="bottom-nav">
      <a routerLink="/dashboard"  routerLinkActive="active">🏠<span>首頁</span></a>
      <a routerLink="/practice"   routerLinkActive="active">✏️<span>練習</span></a>
      <a routerLink="/analysis"   routerLinkActive="active">📊<span>分析</span></a>
      <a routerLink="/vocabulary" routerLinkActive="active">📖<span>單字</span></a>
      <a routerLink="/exam"       routerLinkActive="active">📝<span>模擬考</span></a>
    </nav>
    <main>
      <router-outlet/>
    </main>
  `,
  styles: [`
    .top-bar {
      background: #1976d2; color: white;
      padding: 14px 20px; font-size: 1.1rem; font-weight: 600;
    }
    .bottom-nav {
      display: flex; background: #fff;
      border-bottom: 1px solid #e0e0e0;
      a {
        flex: 1; display: flex; flex-direction: column;
        align-items: center; padding: 8px 0;
        text-decoration: none; color: #999; font-size: 0.7rem; gap: 2px;
        &.active { color: #1976d2; font-weight: 600; }
      }
    }
    main { padding: 0 0 40px; }
  `]
})
export class App {}
