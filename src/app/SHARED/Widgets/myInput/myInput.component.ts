import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'my-input',
  standalone: true,
  imports: [
    CommonModule,
  ],
  templateUrl: './myInput.component.html',
  styleUrl: './myInput.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MyInputComponent { }
