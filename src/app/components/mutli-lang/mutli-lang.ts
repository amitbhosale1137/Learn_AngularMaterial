import { Component, inject } from '@angular/core';
import { NavComponent } from '../nav/nav';
import { TranslatePipe, TranslateService } from '@ngx-translate/core';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-mutli-lang',
  imports: [NavComponent, TranslatePipe, MatButtonModule],
  templateUrl: './mutli-lang.html',
  styleUrl: './mutli-lang.scss',
})
export class MutliLang {
  translate = inject(TranslateService);

  constructor() {
    this.translate.use('en');
  }

  translateText(lang: string) {
    this.translate.use(lang);
  }
}
