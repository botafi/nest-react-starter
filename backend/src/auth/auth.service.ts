import { Injectable, Inject, HttpException, HttpStatus } from '@nestjs/common';
import { JwtPayload } from './jwtPayload.interface';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { AuthType } from './authType.enum';
import { UserRole } from './userRole.enum';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
        private readonly jwtService: JwtService,
    ) { }
    async loginEmail(email: string, textPassword: string): Promise<User | undefined> {
        let user = await this.userRepository.findOne({ email });
        if (!user || !user.password || !(await bcrypt.compare(textPassword, user.password))) {
            throw new HttpException('Bad email or password', HttpStatus.UNAUTHORIZED);
        }
        const jwtPayload: JwtPayload = { userId: user.id, authType: user.authType };
        if (user.authType !== AuthType.EMAIL) {
            jwtPayload.otherToken = user.otherToken;
        }
        const token = this.jwtService.sign(jwtPayload);
        user.token = token;
        user = await this.userRepository.save(user);
        return user;
    }

    async logout(user: User): Promise<boolean> {
        if (!user) {
            return false;
        }
        user.token = undefined;
        await this.userRepository.save(user);
        return true;
    }

    async createUserEmail(email: string, textPassword: string, role: UserRole = UserRole.DEFAULT) {
        let user = await this.userRepository.findOne({ email });
        if (user) {
            throw new HttpException(`User with email: ${email} already exists`, HttpStatus.BAD_REQUEST);
        }
        const password = await bcrypt.hash(textPassword, 10);
        user = this.userRepository.create({ email, password, authType: AuthType.EMAIL, role });
        return await this.userRepository.save(user);
    }

    async validateJwtPayload(token: string, { userId, authType }: JwtPayload): Promise<User | undefined> {
        const user = await this.userRepository.findOne({ id: userId, token, authType });
        return user;
    }

    async removeUser(email: string): Promise<boolean> {
        const user = await this.userRepository.findOne({ email });
        if (!user) {
            throw new HttpException(`User with email: ${email} not found`, HttpStatus.NOT_FOUND);
        }
        await this.userRepository.remove(user);
        return true;
    }
}
