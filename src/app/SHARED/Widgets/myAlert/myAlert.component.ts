import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input, input } from '@angular/core';
@Component({
  selector: 'my-alert',
  standalone: true,
  imports: [
    CommonModule,
  ],
  templateUrl: './myAlert.component.html',
  styleUrl: './myAlert.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MyAlertComponent {
  alertType = input.required<string>(); // required
  alertTitle = input<string>('');
  alertMessage = input<string>('This is an Alert!');
}
