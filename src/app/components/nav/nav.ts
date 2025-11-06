import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatTooltipModule } from '@angular/material/tooltip';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { TranslatePipe, TranslateService } from '@ngx-translate/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';

interface MenuItem {
  label: string;
  icon: string;
  route?: string;
  submenu?: MenuItem[];
}

@Component({
  selector: 'app-nav',
  imports: [
    CommonModule,
    MatButtonModule,
    MatToolbarModule,
    MatIconModule,
    MatMenuModule,
    MatTooltipModule,
    RouterLink,
    TranslatePipe,
    MatFormFieldModule,
    MatSelectModule,
  ],
  templateUrl: './nav.html',
  styleUrl: './nav.scss',
})
export class NavComponent {
  currentSubmenu: MenuItem[] | undefined;

  menuItems: MenuItem[] = [
    { label: 'menu.employees', icon: 'badge', route: '/employees' },
    { label: 'menu.users', icon: 'people', route: '/signal' },
    { label: 'menu.contact', icon: 'contacts', route: '/contact-signal' },
    { label: 'menu.language', icon: 'language', route: '/multi-Lang' },
  ];

  selectedLang = 'en';

  languages = [
    { code: 'en', label: 'English' },
    { code: 'fr', label: 'Français' },
    { code: 'ma', label: 'मराठी' },
  ];

  constructor(private translate: TranslateService) {
    translate.use(this.selectedLang);
  }

  translateText(lang: string) {
    this.translate.use(lang);
  }
}
