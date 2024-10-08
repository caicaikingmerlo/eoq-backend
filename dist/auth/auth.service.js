"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const bcrypt = require("bcryptjs");
const user_service_1 = require("../user/user.service");
const jwt = require("jsonwebtoken");
let AuthService = class AuthService {
    constructor(userService) {
        this.userService = userService;
    }
    async generateToken(email) {
        const payload = { email };
        const options = { expiresIn: '1h' };
        const token = jwt.sign(payload, 'asd', options);
        return token;
    }
    async validateUser(email, password) {
        const user = await this.userService.getUserByEmail(email);
        if (!user) {
            return null;
        }
        console.log(process.env.JWT_SECRET);
        console.log(password);
        console.log(user.password);
        const passwordMatch = await bcrypt.compare(password, user.password);
        console.log(passwordMatch);
        if (passwordMatch) {
            const { password, ...result } = user;
            return result;
        }
        return null;
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [user_service_1.UserService])
], AuthService);
//# sourceMappingURL=auth.service.js.map