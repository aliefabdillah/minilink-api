import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Url } from './entities/url.entity';
import { ShortenURLDto } from './dto/url.dto';
import { isURL } from 'class-validator';
import { nanoid } from 'nanoid';

@Injectable()
export class UrlService {
  constructor(@InjectModel(Url) private urlModel: typeof Url) {}

  async getUrl() {
    return this.urlModel.findAll();
  }

  async shortenUrl(url: ShortenURLDto) {
    const { longUrl } = url;

    // chekc if longUrl is valid url
    if (!isURL(longUrl)) {
      throw new BadRequestException('Input must be a valid url');
    }

    const urlCode = nanoid(10);
    const baseURL = process.env.BASE_URL;

    try {
      const url = await this.urlModel.findOne({ where: { longUrl } });

      //if url exist return shorten url version from daatabase
      if (url) {
        return url.shortUrl;
      }

      //if doesn't exist add new url version to database
      const shortUrl = `${baseURL}/${urlCode}`;

      // add new url  short into database
      const urlResult = await this.urlModel.create({
        urlCode,
        longUrl,
        shortUrl,
      });

      return {
        shortUrl: urlResult.shortUrl,
        longUrl: urlResult.longUrl,
      };
    } catch (error) {
      console.log(error);
      throw new UnprocessableEntityException('Server Error');
    }
  }

  async redirectUrl(urlCode: string) {
    try {
      const url = await this.urlModel.findOne({ where: { urlCode } });
      if (!url) {
        throw new NotFoundException('Url not found');
      }

      return url.longUrl;
    } catch (error) {
      console.log(error);
      throw new NotFoundException('Url not found');
    }
  }
}
