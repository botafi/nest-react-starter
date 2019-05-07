import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    // packages
    TypeOrmModule.forRoot(),
    // app
    AuthModule,
  ],
  controllers: [
    AppController,
  ],
  providers: [],
})
export class AppModule {}
