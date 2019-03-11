import { Component, OnInit } from '@angular/core';
import { User } from '../_models/User';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { AuthenticationService } from '../_services/authentication.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {
  _form: FormGroup;

  constructor(private form: FormBuilder,
              private authService: AuthenticationService) {
    this._form = form.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }
  user: User = new User();

  public login() {
    const det = this._form.value;

    if (det.email && det.password) {
      this.authService.login(det.email, det.password);
      // .
      //     .subscribe(
      //         () => {
      //             console.log('User is logged in');
      //             this.router.navigateByUrl('/');
      //         }
      //     );
    }
  }
  ngOnInit() {
  }

}
