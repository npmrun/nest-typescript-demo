/**
 * 根模块用于处理其他类的引用与共享。
 */

import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { ConfigModule } from '@nestjs/config';
import { getConfig } from './utils';

@Module({
    imports: [ConfigModule.forRoot({ ignoreEnvFile: true, isGlobal: true, load: [getConfig] }), UserModule],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule { }
