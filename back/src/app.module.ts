import { Module } from '@nestjs/common';
import {CredentialsController} from "./controllers/credentials.controller";
import {CredentialsService} from "./services/credentials.service";
import {PrismaService} from "./services/prisma.service";
import {ServeStaticModule} from "@nestjs/serve-static";
import { join } from 'path';

@Module({
  imports: [ ServeStaticModule.forRoot({
    rootPath: join(__dirname, '..', 'public'),
  }),],
  controllers: [CredentialsController],
  providers: [CredentialsService, PrismaService],
})
export class AppModule {}
