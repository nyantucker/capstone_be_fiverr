import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaClient } from '@prisma/client';
import { responseData } from 'src/config/response';
import { CmtDto } from './dto/cmt.dto';

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
            let data = await this.prisma.binhLuan.findMany()
            return responseData(res, "Danh sách bình luận", data, 200)
        } else {
            responseData(res, "Không có quyền truy cập", "", 403);
        }
    }

    async addCmt(token, res: Response, body) {
        let { ma_cong_viec, noi_dung, sao_binh_luan } = body
        let accessToken = await this.jwtService.decode(token)
        let checkUser = await this.prisma.nguoiDung.findFirst({
            where: {
                user_id: accessToken.data.user_id
            }
        })
        if (checkUser) {
            let newData = {
                ma_cong_viec,
                ngay_binh_luan: new Date(),
                noi_dung,
                sao_binh_luan,
                user_id: accessToken.data.user_id
            }
            await this.prisma.binhLuan.create({
                data: newData
            })
            responseData(res, "Bình luận thành công", "", 200);
        } else {
            responseData(res, "Không có quyền truy cập", "", 403);
        }
    }

    async editCmt(token, res: Response, id, body) {
        let { ma_cong_viec, noi_dung, sao_binh_luan } = body
        let accessToken = await this.jwtService.decode(token)
        let checkUser = await this.prisma.nguoiDung.findFirst({
            where: {
                user_id: accessToken.data.user_id
            }
        })
        let getCmt = await this.prisma.binhLuan.findFirst({
            where: {
                ma_binh_luan: id * 1
            }
        })
        if (checkUser.user_id == getCmt.user_id) {
            getCmt.ma_cong_viec = ma_cong_viec
            getCmt.noi_dung = noi_dung
            getCmt.sao_binh_luan = sao_binh_luan
            await this.prisma.binhLuan.update({
                where: {
                    ma_binh_luan: id * 1
                },
                data: getCmt
            })
            responseData(res, "Sửa bình luận thành công", "", 200);
        } else {
            responseData(res, "Không có quyền sửa", "", 403);
        }
    }

    async deleteCmt(token, res: Response, id) {
        let accessToken = await this.jwtService.decode(token)
        let checkUser = await this.prisma.nguoiDung.findFirst({
            where: {
                user_id: accessToken.data.user_id
            }
        })
        let getCmt = await this.prisma.binhLuan.findFirst({
            where: {
                ma_binh_luan: id * 1
            }
        })
        if (checkUser.user_id == getCmt.user_id) {
            await this.prisma.binhLuan.delete({
                where: {
                    ma_binh_luan: id * 1
                }
            })
            responseData(res, "Xóa bình luận thành công", "", 200);
        } else {
            responseData(res, "Không có quyền xóa", "", 403);
        }
    }

    async getCmtByJob(token, res: Response, MaCongViec) {
        let accessToken = await this.jwtService.decode(token)
        let checkUser = await this.prisma.nguoiDung.findFirst({
            where: {
                user_id: accessToken.data.user_id
            }
        })
        if (checkUser) {
            let data = await this.prisma.binhLuan.findFirst({
                where: {
                    ma_cong_viec: MaCongViec * 1
                }
            })
            responseData(res, "Lấy danh sách thành công", data, 200);
        } else {
            responseData(res, "Không có quyền truy cập", "", 403);
        }
    }
}
