import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { FormBuilder } from '@angular/forms';
import { Validators } from '@angular/forms';
import { AuthService } from '../service/auth.service';
import { IUser } from '../interfaces/user';
import { Router } from '@angular/router';
import { TokenService } from '../../../CORE/Auth/services/token.service';
@Component({
  selector: 'login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class LoginComponent {
  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
  ) {}

  profileForm = this.fb.group({
    username: ['', Validators.required],
    password: ['', Validators.required],
    expiresInMins: [30],
  });
  router = inject(Router);
  tokenSvc = inject(TokenService) as TokenService;
  onLogin() {
    if (this.profileForm.valid) {
      this.authService.loginUser(
        this.profileForm.value as IUser
      ).subscribe({
        next:(value)=> {
          this.tokenSvc.setToken(value.token);
        },
        error:(err)=> {
          alert(err.error.message);
        },
        complete:()=> {
          this.router.navigateByUrl('/dashboard');
        },
      });
    }
  }
}
