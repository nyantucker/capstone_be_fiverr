import { Controller, Get, Headers, Res } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { CmtService } from './cmt.service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags("BinhLuan")
@Controller('binh-luan')
export class CmtController {
    constructor(
        private readonly cmtService: CmtService,
        private configService: ConfigService
    ) { }

    @Get("/")
    getCmt(
        @Headers("Token") token: string,
        @Res() res: Response
    ) {
        return this.cmtService.getCmt(token, res)
    }

}
