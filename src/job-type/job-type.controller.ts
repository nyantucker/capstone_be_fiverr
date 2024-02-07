import { Body, Controller, Get, Headers, Post, Res, Query, Put, Delete, Param } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JobTypeService } from './job-type.service';
import { ApiTags } from '@nestjs/swagger';
import { JobTypeDto, TypePageDto } from './dto/job-type.dto';

@ApiTags("LoaiCongViec")
@Controller('loai-cong-viec')
export class JobTypeController {
    constructor(
        private readonly jobTypeService: JobTypeService,
        private configService: ConfigService
    ) { }

    @Get("/")
    getTypes(
        @Headers("Token") token: string,
        @Res() res: Response
    ) {
        return this.jobTypeService.getTypes(token, res)
    }

    @Post("/")
    addTypes(
        @Body() body: JobTypeDto,
        @Headers("Token") token: string,
        @Res() res: Response
    ) {
        return this.jobTypeService.addTypes(token, res, body)
    }

    @Get("/phan-trang-tim-kiem")
    getUsersPage(
        @Query() typePageDto: TypePageDto,
        @Headers("Token") token: string,
        @Res() res: Response,
    ) {
        return this.jobTypeService.getTypesPage(token, res, typePageDto)
    }

    @Get("/:id")
    getTypesById(
        @Param("id") id: number,
        @Headers("Token") token: string,
        @Res() res: Response,
    ) {
        return this.jobTypeService.getTypesById(token, res, id)
    }

    @Put("/:id")
    editTypes(
        @Param("id") id: number,
        @Headers("Token") token: string,
        @Res() res: Response,
        @Body() body: JobTypeDto
    ) {
        return this.jobTypeService.editTypes(token, res, id, body)
    }

    @Delete("/:id")
    deleteTypes(
        @Param("id") id: number,
        @Headers("Token") token: string,
        @Res() res: Response
    ) {
        return this.jobTypeService.deleteTypes(token, res, id)
    }
}
