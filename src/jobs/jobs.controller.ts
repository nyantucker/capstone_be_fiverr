import { Controller, Get, Headers, Res, Body, Post, Query, Put, Delete, UploadedFiles, UseInterceptors, Param } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ApiTags, ApiBody, ApiConsumes } from '@nestjs/swagger';
import { JobsService } from './jobs.service';
import { JobDto, JodPageDto, UploadJobImgDto } from './dto/jobs.dto';
import { FilesInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';

@ApiTags("CongViec")
@Controller('cong-viec')
export class JobsController {
    constructor(
        private readonly jobsService: JobsService,
        private configService: ConfigService
    ) { }

    @Get("/lay-menu-loai-cong-viec")
    getJobsMenu(
        @Headers("Token") token: string,
        @Res() res: Response,
    ) {
        return this.jobsService.getJobsMenu(token, res)
    }

    @Get("/lay-chi-tiet-loai-cong-viec/:MaLoaiCongViec")
    getJobsByType(
        @Param("MaLoaiCongViec") MaLoaiCongViec: number,
        @Headers("Token") token: string,
        @Res() res: Response,
    ) {
        return this.jobsService.getJobsByType(token, res, MaLoaiCongViec)
    }

    @Get("/lay-cong-viec-theo-chi-tiet-loai/:MaChiTietLoai")
    getJobsByDetail(
        @Param("MaChiTietLoai") MaChiTietLoai: number,
        @Headers("Token") token: string,
        @Res() res: Response,
    ) {
        return this.jobsService.getJobsByDetail(token, res, MaChiTietLoai)
    }

    @Get("/lay-cong-viec-chi-tiet/:MaCongViec")
    getFullDetailsJobs(
        @Param("MaCongViec") MaCongViec: number,
        @Headers("Token") token: string,
        @Res() res: Response,
    ) {
        return this.jobsService.getFullDetailsJobs(token, res, MaCongViec)
    }

    @Get("/lay-danh-sach-cong-viec-theo-ten/:TenCongViec")
    getJobsByName(
        @Param("TenCongViec") TenCongViec: string,
        @Headers("Token") token: string,
        @Res() res: Response,
    ) {
        return this.jobsService.getJobsByName(token, res, TenCongViec)
    }

    @Get("/")
    getJobs(
        @Headers("Token") token: string,
        @Res() res: Response
    ) {
        return this.jobsService.getJobs(token, res)
    }

    @Post("/")
    addJobs(
        @Body() body: JobDto,
        @Headers("Token") token: string,
        @Res() res: Response
    ) {
        return this.jobsService.addJobs(token, res, body)
    }

    @Get("/phan-trang-tim-kiem")
    getJobsPage(
        @Query() typePageDto: JodPageDto,
        @Headers("Token") token: string,
        @Res() res: Response,
    ) {
        return this.jobsService.getJobsPage(token, res, typePageDto)
    }

    @Get("/:id")
    getJobsById(
        @Param("id") id: number,
        @Headers("Token") token: string,
        @Res() res: Response,
    ) {
        return this.jobsService.getJobsById(token, res, id)
    }

    @Put("/:id")
    editJobs(
        @Param("id") id: number,
        @Headers("Token") token: string,
        @Res() res: Response,
        @Body() body: JobDto
    ) {
        return this.jobsService.editJobs(token, res, id, body)
    }

    @Delete("/:id")
    deleteJobs(
        @Param("id") id: number,
        @Headers("Token") token: string,
        @Res() res: Response
    ) {
        return this.jobsService.deleteJobs(token, res, id)
    }

    @ApiConsumes('multipart/form-data')
    @ApiBody({
        type: UploadJobImgDto
    })
    @UseInterceptors(FilesInterceptor("hinh_anh", 10, {
        storage: diskStorage({
            destination: process.cwd() + "/public/imgs",
            filename: (req, file, callback) => callback(null, new Date().getTime() + "_" + file.originalname)
        })
    }))
    @Post("/upload-hinh-cong-viec/:MaCongViec")
    uploadJobsImg(
        @Param("MaCongViec") MaCongViec: number,
        @UploadedFiles() file: Express.Multer.File[],
        @Headers("Token") token: string,
        @Res() res: Response,
    ) {
        let [name] = file.map(file => file.filename)
        return this.jobsService.uploadJobsImg(token, res, name, MaCongViec)
    }

}
