import { Injectable } from "@angular/core";
import { User } from "./user";

@Injectable()
export class UserDataService {

    private static users: User[] = [new User("admin", "admin", "admin@admin.com", "password", "")]
    
    getUsers() {
        return UserDataService.users;
    }

    addUser(newUser: User) {
        UserDataService.users.push(newUser);
    }
}