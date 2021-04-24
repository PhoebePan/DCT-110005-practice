import { LoginService } from './../login.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, map, tap } from 'rxjs/operators';
import { HttpErrorResponse } from '@angular/common/http';
import { of, throwError } from 'rxjs';
import { UserInfo } from '../interfaces/user-info';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  user = {
    email: '',
    password: '',
  };

  constructor(private router: Router, private loginService: LoginService) {}

  ngOnInit(): void {}

  login() {
    // this.router.navigate(['/'])

    this.loginService
      .login(this.user)
      .pipe(
        // 示範用 catchError 擷取錯誤訊息，必須回傳一個 observable 以避免過程中斷
        catchError(error => {
          // return of({ user: { token : '' } } as any as UserInfo)
          return throwError(error);
        }),
        map((result) => result.user),
        // 示範用 tap 擷取錯誤訊息，不用回傳任何資訊，過程一定會中斷
        // tap({
        //   next: (user) => {
        //     localStorage.setItem('token', user.token);
        //   },
        //   error: (error) => {
        //     alert(error.error.body[0]);
        //   },
        // })
        // 錯誤示範，請不要在 map 內處理外部邏輯 (side effect)
        // map(user => {
        //   localStorage.setItem('token', user.token);
        //   return user;
        // })
      )
      .subscribe({
        next: (user) => {
          console.log(user);
          localStorage.setItem('token', user.token);
          this.router.navigateByUrl('/');
        },
        error: (error: HttpErrorResponse) => {
          alert(error.error.body[0]);
        },
      });
  }
}
