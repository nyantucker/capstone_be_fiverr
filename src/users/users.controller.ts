import { Body, Controller, Delete, Get, Headers, Post, Put, Query, Req, Res, UploadedFiles, UseInterceptors } from '@nestjs/common';
import { UsersService } from './users.service';
import { ApiBody, ApiConsumes, ApiTags } from '@nestjs/swagger';
import { ConfigService } from '@nestjs/config';
import { UserDto, UserPageDto, UploadAvatarDto } from './dto/user.dto';
import { FilesInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';


@ApiTags("NguoiDung")
@Controller('users')
export class UsersController {
    constructor(
        private readonly userService: UsersService,
        private configService: ConfigService
    ) { }


    @Get("/")
    getUsers(
        @Headers("Token") token: string,
        @Res() res: Response
    ) {
        return this.userService.getUsers(token, res)
    }

    @Post("/")
    addUsers(
        @Body() body: UserDto,
        @Headers("Token") token: string,
        @Res() res: Response
    ) {
        return this.userService.addUsers(token, res, body)
    }

    @Delete("/")
    deleteUsers(
        @Query("id") id: number,
        @Headers("Token") token: string,
        @Res() res: Response
    ) {
        return this.userService.deleteUser(token, res, id)
    }

    @Get("/phan-trang-tim-kiem")
    getUsersPage(
        @Query() userPageDto: UserPageDto,
        @Headers("Token") token: string,
        @Res() res: Response,
    ) {
        return this.userService.getUsersPage(token, res, userPageDto)
    }

    @Get("/:id")
    getUsersById(
        @Query("id") id: number,
        @Headers("Token") token: string,
        @Res() res: Response,
    ) {
        return this.userService.getUsersById(token, res, id)
    }

    @Put("/:id")
    editUsers(
        @Query("id") id: number,
        @Headers("Token") token: string,
        @Res() res: Response,
        @Body() body: UserDto
    ) {
        return this.userService.editUsers(token, res, id, body)
    }

    @Get("/search/:TenNguoiDung")
    searchUsers(
        @Query("TenNguoiDung") TenNguoiDung: string,
        @Headers("Token") token: string,
        @Res() res: Response,
    ) {
        return this.userService.searchUsers(token, res, TenNguoiDung)
    }

    @ApiConsumes('multipart/form-data')
    @ApiBody({
        type: UploadAvatarDto
    })
    @UseInterceptors(FilesInterceptor("avatar", 10, {
        storage: diskStorage({
            destination: process.cwd() + "/public/imgs",
            filename: (req, file, callback) => callback(null, new Date().getTime() + "_" + file.originalname)
        })
    }))
    @Post("/upload-avatar")
    uploadAvatar(
        @UploadedFiles() file: Express.Multer.File[],
        @Headers("Token") token: string,
        @Res() res: Response,
    ) {
        let [name] = file.map(file => file.originalname)
        return this.userService.uploadAvatar(token, res, name)
    }
}
