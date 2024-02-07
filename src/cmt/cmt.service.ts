import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaClient } from '@prisma/client';
import { responseData } from 'src/config/response';

@Injectable()
export class CmtService {
    constructor(
        private jwtService: JwtService
    ) { }
    prisma = new PrismaClient()

    async getCmt(token, res: Response) {
        let accessToken = await this.jwtService.decode(token)
        let checkUser = await this.prisma.nguoiDung.findFirst({
            where: {
                user_id: accessToken.data.user_id
            }
        })
        if (checkUser) {
            let data = await this.prisma.loaiCongViec.findMany()
            return responseData(res, "Danh sách loại công việc", data, 200)
        } else {
            responseData(res, "Không có quyền truy cập", "", 403);
        }
    }

}
