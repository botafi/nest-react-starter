import { jwtSecretOrPrivateKey, jwtSignOptions } from './jwt.config';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.entity';
import { AuthService } from './auth.service';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './jwt.strategy';
import { AuthController } from './auth.controller';

@Module({
    imports: [
        TypeOrmModule.forFeature([User]),
        PassportModule.register({
            defaultStrategy: 'jwt',
            property: 'user',
        }),
        JwtModule.register({
            secretOrPrivateKey: jwtSecretOrPrivateKey,
            signOptions: jwtSignOptions,
        }),
    ],
    providers: [
        JwtStrategy,
        AuthService,
    ],
    controllers: [AuthController],
})
export class AuthModule {}