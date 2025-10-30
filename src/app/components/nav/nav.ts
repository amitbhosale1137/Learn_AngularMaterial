import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatTooltipModule } from '@angular/material/tooltip';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';

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
  ],
  templateUrl: './nav.html',
  styleUrl: './nav.scss',
})
export class NavComponent {
  currentSubmenu: MenuItem[] | undefined;

  menuItems: MenuItem[] = [
    { label: 'Employees', icon: 'badge', route: '/employees' },
    { label: 'Users', icon: 'people', route: '/signal' },
  ];
}
