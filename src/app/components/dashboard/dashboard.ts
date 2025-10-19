import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { NavComponent } from '../nav/nav';

@Component({
  selector: 'app-dashboard',
  imports: [CommonModule, MatButtonModule, MatButtonToggleModule, MatIconModule, NavComponent],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.scss',
})
export class Dashboard {}
