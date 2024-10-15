import { Body, Controller, Post } from '@nestjs/common';
import { UrlService } from './url.service';
import { ShortenURLDto } from './dto/url.dto';

@Controller('url')
export class UrlController {
  constructor(private readonly urlService: UrlService) {}

  @Post('/shorten')
  shortenUrl(@Body() urlDto: ShortenURLDto) {
    return this.urlService.shortenUrl(urlDto);
  }
}
