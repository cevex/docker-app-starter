import {Component, OnInit} from '@angular/core';
import {UserService} from "../modules/user/user.service";
import {User} from "../modules/user/user.model";

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

    public users: User[];

    constructor(private userService: UserService) {
    }

    ngOnInit(): void {
        this.userService.getUsers().subscribe(users => {
            console.log('Users : ', users);
            this.users = users;
        })
    }
}
