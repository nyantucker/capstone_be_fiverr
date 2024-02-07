import { Controller, Get, Headers, Res, Body, Post, Query, Put, Delete } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { HireService } from './hire.service';
import { ApiTags } from '@nestjs/swagger';
import { JobTypeDto, TypePageDto } from '../job-type/dto/job-type.dto';
import { HireDto, HirePageDto } from './dto/hire.dto';

@ApiTags("ThueCongViec")
@Controller('thue-cong-viec')
export class HireController {
    constructor(
        private readonly hireService: HireService,
        private configService: ConfigService
    ) { }

    @Get("/lay-danh-sach-da-thue")
    getHireds(
        @Headers("Token") token: string,
        @Res() res: Response,
    ) {
        return this.hireService.getHireds(token, res)
    }

    @Post("/hoan-thanh-cong-viec/:MaThueCongViec")
    completeJob(
        @Query("MaThueCongViec") MaThueCongViec: number,
        @Headers("Token") token: string,
        @Res() res: Response
    ) {
        return this.hireService.completeJob(token, res, MaThueCongViec)
    }

    @Get("/")
    getHires(
        @Headers("Token") token: string,
        @Res() res: Response
    ) {
        return this.hireService.getHires(token, res)
    }

    @Post("/")
    addHires(
        @Body() body: HireDto,
        @Headers("Token") token: string,
        @Res() res: Response
    ) {
        return this.hireService.addHires(token, res, body)
    }

    @Get("/phan-trang-tim-kiem")
    getHiresPage(
        @Query() hirePageDto: HirePageDto,
        @Headers("Token") token: string,
        @Res() res: Response,
    ) {
        return this.hireService.getHiresPage(token, res, hirePageDto)
    }

    @Get("/:id")
    getHiresById(
        @Query("id") id: number,
        @Headers("Token") token: string,
        @Res() res: Response,
    ) {
        return this.hireService.getHiresById(token, res, id)
    }

    @Put("/:id")
    editHires(
        @Query("id") id: number,
        @Headers("Token") token: string,
        @Res() res: Response,
        @Body() body: HireDto
    ) {
        return this.hireService.editHires(token, res, id, body)
    }

    @Delete("/:id")
    deleteHires(
        @Query("id") id: number,
        @Headers("Token") token: string,
        @Res() res: Response
    ) {
        return this.hireService.deleteHires(token, res, id)
    }


}
