import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaClient } from '@prisma/client';
import { responseData } from 'src/config/response';

@Injectable()
export class JobTypeService {
    constructor(
        private jwtService: JwtService
    ) { }
    prisma = new PrismaClient()

    async getTypes(token, res: Response) {
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

    async addTypes(token, res: Response, body) {
        let { ten_loai_cong_viec } = body
        let accessToken = await this.jwtService.decode(token)
        let checkUser = await this.prisma.nguoiDung.findFirst({
            where: {
                user_id: accessToken.data.user_id
            }
        })
        if (checkUser.role == "ADMIN") {
            let newData = {
                ten_loai_cong_viec
            }
            await this.prisma.loaiCongViec.create({
                data: newData
            })
            responseData(res, "Thêm loại công việc thành công", "", 200);
        } else {
            responseData(res, "Không có quyền truy cập", "", 403);
        }
    }

    async getTypesPage(token, res: Response, typePageDto) {
        let { pageIndex, pageSize, keyword } = typePageDto
        let accessToken = await this.jwtService.decode(token)
        let checkUser = await this.prisma.nguoiDung.findFirst({
            where: {
                user_id: accessToken.data.user_id
            }
        })
        let index = (pageIndex - 1) * pageSize
        if (checkUser) {
            if (pageIndex >= 1 && pageSize >= 1) {
                let data = await this.prisma.loaiCongViec.findMany({
                    where: {
                        ten_loai_cong_viec: {
                            contains: keyword
                        }
                    },
                    skip: index * 1,
                    take: pageSize * 1
                })
                return responseData(res, "Lấy danh sách thành công", data, 200);
            } else {
                let data = await this.prisma.loaiCongViec.findMany({
                    where: {
                        ten_loai_cong_viec: {
                            contains: keyword
                        }
                    }
                })
                return responseData(res, "Lấy danh sách thành công", data, 200);
            }
        }
    }

    async getTypesById(token, res: Response, id) {
        let accessToken = await this.jwtService.decode(token)
        let checkUser = await this.prisma.nguoiDung.findFirst({
            where: {
                user_id: accessToken.data.user_id
            }
        })
        if (checkUser) {
            let data = await this.prisma.loaiCongViec.findFirst({
                where: {
                    ma_loai_cong_viec: id * 1
                }
            })
            responseData(res, "Tìm thành công", data, 200)
        }
    }

    async editTypes(token, res: Response, id, body) {
        let { ten_loai_cong_viec } = body
        let accessToken = await this.jwtService.decode(token)
        let checkUser = await this.prisma.nguoiDung.findFirst({
            where: {
                user_id: accessToken.data.user_id
            }
        })
        if (checkUser.role == "ADMIN") {
            let getTypes = await this.prisma.loaiCongViec.findFirst({
                where: {
                    ma_loai_cong_viec: id * 1
                }
            })
            getTypes.ten_loai_cong_viec = ten_loai_cong_viec;
            await this.prisma.loaiCongViec.update({
                where: {
                    ma_loai_cong_viec: id * 1
                },
                data: getTypes
            })
            responseData(res, "Sửa công việc thành công", "", 200);
        } else {
            responseData(res, "Không có quyền truy cập", "", 403);
        }
    }

    async deleteTypes(token, res: Response, id) {
        let accessToken = await this.jwtService.decode(token)
        let checkUser = await this.prisma.nguoiDung.findFirst({
            where: {
                user_id: accessToken.data.user_id
            }
        })
        if (checkUser.role == "ADMIN") {
            await this.prisma.loaiCongViec.delete({
                where: {
                    ma_loai_cong_viec: id * 1
                }
            })
            responseData(res, "Xóa loại công việc thành công", "", 200);
        } else {
            responseData(res, "Không có quyền truy cập", "", 403);
        }
    }
}
