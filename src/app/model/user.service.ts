import { Injectable } from "@angular/core";
import { User } from "./user";

@Injectable()
export class UserDataService {

    private static users: User[] = [
        new User("Jason", "Gilman", "jason.gilman@dell.com", "passworD*", "My name is Jason"),
        new User("John", "Doe", "jd@gmail.com", "passworD*", "I like bikes."),
        new User("Jane", "Doe", "janed@gmail.com", "passworD*", "I like to cook.")
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

    editUser(id: number, newFirstName: string, newLastName: string, newBio: string) {
        UserDataService.users.forEach(user => {
            if (user.id == id) {
                user.firstName = newFirstName;
                user.lastName = newLastName;
                user.bio = newBio;
            }
        });
    }

    addToFollowing(id: number, followingId: number) {
        UserDataService.users.forEach(user => {
            if (user.id == id) {
                user.following.push(followingId);
            }
        });
    }

    removeFromFollowing(id: number, followingId: number) {
        UserDataService.users.forEach(user => {
            if (user.id == id) {
                user.following.splice(user.following.findIndex(i => i == followingId), 1);
            }
        });
    }

    addToFollowers(id: number, followerId: number) {
        UserDataService.users.forEach(user => {
            if (user.id == id) {
                user.followers.push(followerId);
            }
        });
    }

    removeFromFollowers(id: number, followerId: number) {
        UserDataService.users.forEach(user => {
            if (user.id == id) {
                user.followers.splice(user.followers.findIndex(i => i == followerId));
            }
        });
    }
}