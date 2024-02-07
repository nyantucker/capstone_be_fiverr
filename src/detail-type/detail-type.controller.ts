import { Body, Controller, Get, Headers, Post, Res, Query, Put, Delete } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ApiTags } from '@nestjs/swagger';
import { DetailTypeService } from './detail-type.service';
import { JobDetailDto, DetailPageDto } from './dto/detail-type.dto';
import { TypePageDto, JobTypeDto } from '../job-type/dto/job-type.dto';

@ApiTags("ChiTietLoaiCongViec")
@Controller('chi-tiet-loai-cong-viec')
export class DetailTypeController {
    constructor(
        private readonly detailTypeService: DetailTypeService,
        private configService: ConfigService
    ) { }

    @Get("/")
    getDetails(
        @Headers("Token") token: string,
        @Res() res: Response
    ) {
        return this.detailTypeService.getDetails(token, res)
    }

    @Post("/")
    addDetails(
        @Body() body: JobDetailDto,
        @Headers("Token") token: string,
        @Res() res: Response
    ) {
        return this.detailTypeService.addDetails(token, res, body)
    }

    @Get("/phan-trang-tim-kiem")
    getDetailsPage(
        @Query() detailPageDto: DetailPageDto,
        @Headers("Token") token: string,
        @Res() res: Response,
    ) {
        return this.detailTypeService.getDetailsPage(token, res, detailPageDto)
    }

    @Get("/:id")
    getDetailsById(
        @Query("id") id: number,
        @Headers("Token") token: string,
        @Res() res: Response,
    ) {
        return this.detailTypeService.getDetailsById(token, res, id)
    }

    @Put("/:id")
    editDetails(
        @Query("id") id: number,
        @Headers("Token") token: string,
        @Res() res: Response,
        @Body() body: JobDetailDto
    ) {
        return this.detailTypeService.editDetails(token, res, id, body)
    }

    @Delete("/:id")
    deleteDetails(
        @Query("id") id: number,
        @Headers("Token") token: string,
        @Res() res: Response
    ) {
        return this.detailTypeService.deleteDetails(token, res, id)
    }
}
