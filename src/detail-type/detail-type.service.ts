import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaClient } from '@prisma/client';
import { responseData } from 'src/config/response';

@Injectable()
export class DetailTypeService {
    constructor(
        private jwtService: JwtService
    ) { }
    prisma = new PrismaClient()

    async getDetails(token, res: Response) {
        let accessToken = await this.jwtService.decode(token)
        let checkUser = await this.prisma.nguoiDung.findFirst({
            where: {
                user_id: accessToken.data.user_id
            }
        })
        if (checkUser) {
            let data = await this.prisma.chiTietCongViec.findMany()
            return responseData(res, "Danh sách chi tiết loại công việc", data, 200)
        } else {
            responseData(res, "Không có quyền truy cập", "", 403);
        }
    }

    async addDetails(token, res: Response, body) {
        let { ten_chi_tiet, ma_loai_cong_viec } = body
        let accessToken = await this.jwtService.decode(token)
        let checkUser = await this.prisma.nguoiDung.findFirst({
            where: {
                user_id: accessToken.data.user_id
            }
        })
        if (checkUser.role == "ADMIN") {
            let newData = {
                ten_chi_tiet,
                ma_loai_cong_viec,
            }
            await this.prisma.chiTietCongViec.create({
                data: newData
            })
            responseData(res, "Thêm thành công", "", 200);
        } else {
            responseData(res, "Không có quyền truy cập", "", 403);
        }
    }

    async getDetailsPage(token, res: Response, detailPageDto) {
        let { pageIndex, pageSize, keyword } = detailPageDto
        let accessToken = await this.jwtService.decode(token)
        let checkUser = await this.prisma.nguoiDung.findFirst({
            where: {
                user_id: accessToken.data.user_id
            }
        })
        let index = (pageIndex - 1) * pageSize
        if (checkUser) {
            if (pageIndex >= 1 && pageSize >= 1) {
                let data = await this.prisma.chiTietCongViec.findMany({
                    where: {
                        ten_chi_tiet: {
                            contains: keyword
                        }
                    },
                    skip: index * 1,
                    take: pageSize * 1
                })
                return responseData(res, "Lấy danh sách thành công", data, 200);
            } else {
                let data = await this.prisma.chiTietCongViec.findMany({
                    where: {
                        ten_chi_tiet: {
                            contains: keyword
                        }
                    }
                })
                return responseData(res, "Lấy danh sách thành công", data, 200);
            }
        }
    }

    async getDetailsById(token, res: Response, id) {
        let accessToken = await this.jwtService.decode(token)
        let checkUser = await this.prisma.nguoiDung.findFirst({
            where: {
                user_id: accessToken.data.user_id
            }
        })
        if (checkUser) {
            let data = await this.prisma.chiTietCongViec.findFirst({
                where: {
                    ma_chi_tiet_loai: id * 1
                }
            })
            responseData(res, "Tìm thành công", data, 200)
        }
    }

    async editDetails(token, res: Response, id, body) {
        let { ten_chi_tiet, ma_loai_cong_viec } = body
        let accessToken = await this.jwtService.decode(token)
        let checkUser = await this.prisma.nguoiDung.findFirst({
            where: {
                user_id: accessToken.data.user_id
            }
        })
        if (checkUser.role == "ADMIN") {
            let getDetails = await this.prisma.chiTietCongViec.findFirst({
                where: {
                    ma_chi_tiet_loai: id * 1
                }
            })
            getDetails.ten_chi_tiet = ten_chi_tiet;
            getDetails.ma_loai_cong_viec = ma_loai_cong_viec;
            await this.prisma.chiTietCongViec.update({
                where: {
                    ma_chi_tiet_loai: id * 1
                },
                data: getDetails
            })
            responseData(res, "Sửa thành công", "", 200);
        } else {
            responseData(res, "Không có quyền truy cập", "", 403);
        }
    }

    async deleteDetails(token, res: Response, id) {
        let accessToken = await this.jwtService.decode(token)
        let checkUser = await this.prisma.nguoiDung.findFirst({
            where: {
                user_id: accessToken.data.user_id
            }
        })
        if (checkUser.role == "ADMIN") {
            await this.prisma.chiTietCongViec.delete({
                where: {
                    ma_chi_tiet_loai: id * 1
                }
            })
            responseData(res, "Xóa thành công", "", 200);
        } else {
            responseData(res, "Không có quyền truy cập", "", 403);
        }
    }
}
