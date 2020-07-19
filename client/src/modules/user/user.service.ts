import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {User} from "./user.model";
import {map} from "rxjs/operators";

@Injectable({
    providedIn: 'root'
})
export class UserService {

    private readonly USERS_URL = '/users'

    constructor(private httpService: HttpClient) {
    }

    public getUsers(): Observable<User[]> {
        return this.httpService.get(this.USERS_URL)
            .pipe(map((result: any) => result.users as User[]));
    }
}
