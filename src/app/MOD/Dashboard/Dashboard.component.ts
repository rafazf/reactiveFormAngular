import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { TokenService } from '../../CORE/Auth/services/token.service';
import { InicioComponent } from './inicio/inicio.component';
@Component({
  selector: 'dashboard',
  standalone: true,
  imports: [
    CommonModule,InicioComponent
  ],
  templateUrl: './Dashboard.component.html',
  styleUrl: './Dashboard.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class DashboardComponent { 
  router = inject(Router)
  ts = inject(TokenService)
  logout(){
    this.ts.rmToken();
    this.router.navigateByUrl('/login');
  }
}
