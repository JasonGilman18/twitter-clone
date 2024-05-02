import { Injectable } from "@angular/core";
import { User } from "./user";

@Injectable()
export class UserDataService {

    private static users: User[] = [
        new User("admin", "admin", "admin@admin.com", "password", ""),
        new User("Jason", "Gilman", "jason.gilman@dell.com", "password", "My name is Jason")
    ];
    
    getUsers() {
        return UserDataService.users;
    }

    getUser(id: number) {
        return UserDataService.users.find(user => user.id == id);
    }

    addUser(newUser: User) {
        UserDataService.users.push(newUser);
    }
}