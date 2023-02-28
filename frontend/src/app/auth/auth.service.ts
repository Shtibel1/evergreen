import { HttpClient } from "@angular/common/http";
import { Token } from "@angular/compiler";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { endWith, Subject, tap, BehaviorSubject } from "rxjs";

export interface AuthResponseData {
    token: string,
    message: string,
}

@Injectable({providedIn:'root'})

export class AuthService {
    tokenExpTimer;
    user = new BehaviorSubject<string>(null)
    constructor(private http: HttpClient, private router: Router) {}

    signup(email: string, password: string) {
        return this.http.post<AuthResponseData>('http://localhost:3000/signup', 
        {
            email,
            password
        }).pipe(
            tap(resData => {
            this.handleAuth(resData.token)
        }))
    }

    login(email:string, password: string) {
        return this.http.post<AuthResponseData>('http://localhost:3000/login', {
            email,
            password
            
        }).pipe(tap(resData => {
            this.handleAuth(resData.token)
        }))
    }

    logout() {
        this.user.next(null)
        this.router.navigate(['/auth'])
        localStorage.removeItem('token')
        if (this.tokenExpTimer) {
            clearTimeout(this.tokenExpTimer)
        }
        this.tokenExpTimer = null
    }

    autoLogout(expirationDate: number) {
        this.tokenExpTimer = setTimeout(() => {
            this.logout()
        }, expirationDate)
    }

    autoLogin(){
        const token = localStorage.getItem('token')
        if (!token) return;
        // add validator to the token
        const loadedUser = token
        this.user.next(token)
        // add exp date
        // if (new Date() > this.expirationDate) {

    }


    private handleAuth(token: string) {
        // const expirationDate = new Date(new Date().getTime() + +expireIn * 1000)
            // const user = new User(token)
            // this.autoLogout(+expireIn * 1000)
            this.user.next(token)
            localStorage.setItem('token', token)
    }
}

