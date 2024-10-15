import { Module } from '@nestjs/common';
import { UrlService } from './url.service';
import { UrlController } from './url.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Url } from './entities/url.entity';

@Module({
  imports: [SequelizeModule.forFeature([Url])],
  providers: [UrlService],
  controllers: [UrlController],
})
export class UrlModule {}
