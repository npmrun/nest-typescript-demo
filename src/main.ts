/**
 * 应用程序入口文件。它使用 NestFactory 用来创建 Nest 应用实例。
 */
import { VersioningType, VERSION_NEUTRAL } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import {
    FastifyAdapter,
    NestFastifyApplication,
} from '@nestjs/platform-fastify';
import { AppModule } from './app.module';
import { TransformInterceptor } from './common/interceptors/transform.interceptor';
import { AllExceptionsFilter } from './common/exceptions/base.exception.filter';
import { HttpExceptionFilter } from './common/exceptions/http.exception.filter';
import { generateDocument } from './doc';

declare const module: any;

async function bootstrap() {

    const app = await NestFactory.create<NestFastifyApplication>(
        AppModule,
        new FastifyAdapter(),
    );

    app.useGlobalFilters(new AllExceptionsFilter(), new HttpExceptionFilter());
    app.useGlobalInterceptors(new TransformInterceptor());

    // 接口版本化管理
    app.enableVersioning({
        defaultVersion: [VERSION_NEUTRAL, '1', '2'],
        type: VersioningType.URI,
    });

    generateDocument(app)

    if (module.hot) {
        module.hot.accept();
        module.hot.dispose(() => app.close());
    }

    await app.listen(3000);
}
bootstrap();
