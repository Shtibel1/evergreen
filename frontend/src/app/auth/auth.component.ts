import { Component, ViewChild } from "@angular/core";
import {NgForm} from '@angular/forms'
import { Router } from "@angular/router";
import { Observable, Subject, Subscriber, Subscription } from "rxjs";
import { AuthService, AuthResponseData } from "./auth.service";

@Component({
    selector: 'app-auth',
    templateUrl: './auth.component.html'
})

export class AuthComponent {
    // @ViewChild('authFrom') authFrom: NgForm
    isLoginMode = true;
    isLoading = false;
    msg: string = null;
    obs: Observable<AuthResponseData>
    

    constructor(private authService: AuthService, private router: Router) {}

    onSwitchMode() {
        this.isLoginMode = !this.isLoginMode;
    }

    onSubmit(form: NgForm) {
        if (!form.valid) return;
        const {email, password} = form.value;
        
        this.isLoading = true;
        
        if (this.isLoginMode) {
            this.obs = this.authService.login(email, password)
        } else { 
            this.obs = this.authService.signup(email, password)
        }

        this.obs.subscribe({
            next: (res) => {
                this.isLoading = false;
                if (!res.token) {
                    this.msg = res.message
                }
                else {
                this.msg = null
                this.router.navigate(['/'])
                }
            },
            error: (e) => {
                console.log(e);
                this.isLoading = false;
                this.msg = e.error.message
            }
        })
    
        form.reset();
    }

    
}