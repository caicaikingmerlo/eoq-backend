import { UserService } from '../user/user.service';
export declare class AuthService {
    private userService;
    constructor(userService: UserService);
    generateToken(email: string): Promise<string>;
    validateUser(email: string, password: string): Promise<any>;
}
