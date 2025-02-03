import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  loginobj = {
    username: '',
    password: ''
  }

  router = inject(Router);

  onlogin() {
   if(this.loginobj.username == 'mnprathi233@gmail.com' && this.loginobj.password == 'Prathi#123') {
     console.log('Login success');
     localStorage.setItem('isLoggedin', 'true');
     this.router.navigate(['/client']);
   } else {
    alert('Invalid credentials');
   }
  }

}
