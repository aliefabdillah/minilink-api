import { Body, Controller, Get, Param, Post, Res } from '@nestjs/common';
import { UrlService } from './url.service';
import { ShortenURLDto } from './dto/url.dto';
import { Response } from 'express';

@Controller()
export class UrlController {
  constructor(private readonly urlService: UrlService) {}

  @Get('/url')
  getAllUrl() {
    return this.urlService.getUrl();
  }

  @Post('/shorten')
  shortenUrl(@Body() urlDto: ShortenURLDto) {
    return this.urlService.shortenUrl(urlDto);
  }

  @Get('/:code')
  async redirect(@Res() res: Response, @Param('code') code: string) {
    return res.redirect(await this.urlService.redirectUrl(code));
  }
}
