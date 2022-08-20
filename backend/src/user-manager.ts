import { IUser } from "./classes/user";
import * as fs from 'fs';
import { v4 as uuidv4 } from "uuid";
import * as bcrypt from 'bcrypt';

export class UserManager {
    private static users: IUser[] = [];
    private static loggedInUsers: Array<[userId: string, socketId: string]> = [];

    public static loadUsers(): void {
        if (fs.existsSync('./data/users.json')) {
            const data = fs.readFileSync('./data/users.json', 'utf8');
            this.users = JSON.parse(data);
        }
        fs.writeFileSync('./data/users.json', JSON.stringify(this.users, null, 4));
    }

    public static saveUsers(): void {
        fs.writeFileSync('./data/users.json', JSON.stringify(this.users, null, 4));
    }

    public static createUser(username: string, password: string): boolean {
        if (this.users.find(user => user.username.toLowerCase() === username.toLowerCase())) {
            return false;
        }

        const salt = bcrypt.genSaltSync(10);
        const passwordHash = bcrypt.hashSync(password, salt);

        const id = uuidv4() as string;
        const user: IUser = {
            id: id,
            username: username,
            password: passwordHash,
            events: []
        };
        this.users.push(user);
        this.saveUsers();
        return true;
    }

    public static login(username: string, password: string, socketId: string): IUser | null {
        const user = this.users.find(user => user.username.toLowerCase() === username.toLowerCase());
        if (!user) {
            return null;
        }
        //check if user logged in already
        if (this.loggedInUsers.find(loggedInUser => loggedInUser[0] === user.id)) {
            return null;
        }
        if (bcrypt.compareSync(password, user.password)) {
            this.loggedInUsers.push([user.id, socketId]);
            return user;
        }
        return null;
    }

    public static logout(socketId: string): boolean {
        this.loggedInUsers = this.loggedInUsers.filter(loggedInUser => loggedInUser[1] !== socketId);
        return true;
    }

    public static validateUser(userId: string, username: string, timestamp: number, socketId: string): boolean {
        const user = this.users.find(user => user.id === userId);
        if (!user) {
            return false;
        }
        if (user.username !== username) {
            return false;
        }
        
        const loggedInUser = this.loggedInUsers.find(loggedInUser => loggedInUser[0] === userId);
        if (loggedInUser) {
            return false;
        }
        //check if timestamp is less than 30 minutes
        const now = new Date().getTime();
        if (now - timestamp > 30 * 60 * 1000) {
            return false;
        }
        this.loggedInUsers.push([userId, socketId]);
        return true;
    }

    public static changePassword(userId: string, oldPassword: string, newPassword: string): boolean {
        const user = this.users.find(user => user.id === userId);
        if (!user) {
            return false;
        }
        if (!bcrypt.compareSync(oldPassword, user.password)) {
            return false;
        }
        const salt = bcrypt.genSaltSync(10);
        const passwordHash = bcrypt.hashSync(newPassword, salt);
        user.password = passwordHash;
        this.saveUsers();
        return true;
    }

}
