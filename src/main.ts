import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DatabasePresets } from './module/database.presets';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
    const app = await NestFactory.create<NestExpressApplication>(AppModule);
    app.enableCors();

    await DatabasePresets(app);
    const configService: ConfigService = app.get(ConfigService);
    const uploads = configService.get('PUBLIC_DIRECTORY')
    const imageDirectory = join(__dirname,uploads )
    app.useStaticAssets(imageDirectory,{prefix:uploads})
    const locallyDirectory = join(__dirname, '../results');
    app.useStaticAssets(locallyDirectory, { prefix: '/results' });

    const PORT = process.env.WEBSERVER_PORT || 5000;
    await app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
}
bootstrap();
