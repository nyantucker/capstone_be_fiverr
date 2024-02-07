import { Controller, Get, Headers, Res, Body, Post, Query, Put, Delete, Param } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { CmtService } from './cmt.service';
import { ApiTags } from '@nestjs/swagger';
import { CmtDto } from './dto/cmt.dto';

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

    @Post("/")
    addCmt(
        @Body() body: CmtDto,
        @Headers("Token") token: string,
        @Res() res: Response
    ) {
        return this.cmtService.addCmt(token, res, body)
    }

    @Put("/:id")
    editCmt(
        @Param("id") id: number,
        @Headers("Token") token: string,
        @Res() res: Response,
        @Body() body: CmtDto
    ) {
        return this.cmtService.editCmt(token, res, id, body)
    }

    @Delete("/:id")
    deleteCmt(
        @Param("id") id: number,
        @Headers("Token") token: string,
        @Res() res: Response
    ) {
        return this.cmtService.deleteCmt(token, res, id)
    }

    @Get("/lay-binh-luan-theo-cong-viec/:MaCongViec")
    getCmtByJob(
        @Param("MaCongViec") MaCongViec: number,
        @Headers("Token") token: string,
        @Res() res: Response,
    ) {
        return this.cmtService.getCmtByJob(token, res, MaCongViec)
    }
}
