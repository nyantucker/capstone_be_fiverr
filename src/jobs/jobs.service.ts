import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaClient } from '@prisma/client';
import { responseData } from 'src/config/response';

@Injectable()
export class JobsService {
    constructor(
        private jwtService: JwtService
    ) { }
    prisma = new PrismaClient()

    async getJobs(token, res: Response) {
        let accessToken = await this.jwtService.decode(token)
        let checkUser = await this.prisma.nguoiDung.findFirst({
            where: {
                user_id: accessToken.data.user_id
            }
        })
        if (checkUser) {
            let data = await this.prisma.congViec.findMany()
            return responseData(res, "Danh sách công việc", data, 200)
        } else {
            responseData(res, "Không có quyền truy cập", "", 403);
        }
    }

    async addJobs(token, res: Response, body) {
        let { ten_cong_viec, danh_gia, gia_tien, hinh_anh, mo_ta, mo_ta_ngan, sao_cong_viec, ma_chi_tiet_loai } = body
        let accessToken = await this.jwtService.decode(token)
        let checkUser = await this.prisma.nguoiDung.findFirst({
            where: {
                user_id: accessToken.data.user_id
            }
        })
        if (checkUser.role == "ADMIN") {
            let newData = {
                ten_cong_viec,
                danh_gia,
                gia_tien,
                hinh_anh,
                mo_ta,
                mo_ta_ngan,
                sao_cong_viec,
                ma_chi_tiet_loai,
                user_id: accessToken.data.user_id
            }
            await this.prisma.congViec.create({
                data: newData
            })
            responseData(res, "Thêm công việc thành công", "", 200);
        } else {
            responseData(res, "Không có quyền truy cập", "", 403);
        }
    }

    async getJobsPage(token, res: Response, typePageDto) {
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
                let data = await this.prisma.congViec.findMany({
                    where: {
                        ten_cong_viec: {
                            contains: keyword
                        }
                    },
                    skip: index * 1,
                    take: pageSize * 1
                })
                return responseData(res, "Lấy danh sách thành công", data, 200);
            } else {
                let data = await this.prisma.congViec.findMany({
                    where: {
                        ten_cong_viec: {
                            contains: keyword
                        }
                    }
                })
                return responseData(res, "Lấy danh sách thành công", data, 200);
            }
        }
    }

    async getJobsById(token, res: Response, id) {
        let accessToken = await this.jwtService.decode(token)
        let checkUser = await this.prisma.nguoiDung.findFirst({
            where: {
                user_id: accessToken.data.user_id
            }
        })
        if (checkUser) {
            let data = await this.prisma.congViec.findFirst({
                where: {
                    ma_cong_viec: id * 1
                }
            })
            responseData(res, "Tìm thành công", data, 200)
        }
    }

    async editJobs(token, res: Response, id, body) {
        let { ten_cong_viec, danh_gia, gia_tien, hinh_anh, mo_ta, mo_ta_ngan, sao_cong_viec, ma_chi_tiet_loai } = body
        let accessToken = await this.jwtService.decode(token)
        let checkUser = await this.prisma.nguoiDung.findFirst({
            where: {
                user_id: accessToken.data.user_id
            }
        })
        if (checkUser.role == "ADMIN") {
            let getJobs = await this.prisma.congViec.findFirst({
                where: {
                    ma_cong_viec: id * 1
                }
            })
            getJobs.ten_cong_viec = ten_cong_viec
            getJobs.danh_gia = danh_gia
            getJobs.gia_tien = gia_tien
            getJobs.hinh_anh = hinh_anh
            getJobs.mo_ta = mo_ta
            getJobs.mo_ta_ngan = mo_ta_ngan
            getJobs.sao_cong_viec = sao_cong_viec
            getJobs.ma_chi_tiet_loai = ma_chi_tiet_loai
            await this.prisma.congViec.update({
                where: {
                    ma_cong_viec: id * 1
                },
                data: getJobs
            })
            responseData(res, "Sửa công việc thành công", "", 200);
        } else {
            responseData(res, "Không có quyền truy cập", "", 403);
        }
    }

    async deleteJobs(token, res: Response, id) {
        let accessToken = await this.jwtService.decode(token)
        let checkUser = await this.prisma.nguoiDung.findFirst({
            where: {
                user_id: accessToken.data.user_id
            }
        })
        if (checkUser.role == "ADMIN") {
            await this.prisma.congViec.delete({
                where: {
                    ma_cong_viec: id * 1
                }
            })
            responseData(res, "Xóa công việc thành công", "", 200);
        } else {
            responseData(res, "Không có quyền truy cập", "", 403);
        }
    }

    async uploadJobsImg(token, res: Response, name, MaCongViec) {
        let accessToken = await this.jwtService.decode(token)
        await this.prisma.congViec.update({
            where: {
                ma_cong_viec: MaCongViec * 1
            },
            data: {
                hinh_anh: name
            }
        })
        return responseData(res, "Cập nhật ảnh thành công", name, 200);
    }

    async getJobsMenu(token, res: Response) {
        let accessToken = await this.jwtService.decode(token)
        let checkUser = await this.prisma.nguoiDung.findFirst({
            where: {
                user_id: accessToken.data.user_id
            }
        })
        if (checkUser) {
            let data = await this.prisma.loaiCongViec.findMany({
                include: {
                    ChiTietCongViec: {
                        include: {
                            CongViec: true
                        }
                    }
                }
            })
            responseData(res, "Lấy thành công", data, 200);
        } else {
            responseData(res, "Không có quyền truy cập", "", 403);
        }
    }

    async getJobsByType(token, res: Response, MaLoaiCongViec) {
        let accessToken = await this.jwtService.decode(token)
        let checkUser = await this.prisma.nguoiDung.findFirst({
            where: {
                user_id: accessToken.data.user_id
            }
        })
        if (checkUser.role == "ADMIN") {
            let data = await this.prisma.loaiCongViec.findMany({
                where: {
                    ma_loai_cong_viec: MaLoaiCongViec * 1
                },
                include: {
                    ChiTietCongViec: {
                        include: {
                            CongViec: true
                        }
                    }
                }
            })
            responseData(res, "Lấy thành công", data, 200);
        } else {
            responseData(res, "Không có quyền truy cập", "", 403);
        }
    }

    async getJobsByDetail(token, res: Response, MaChiTietLoai) {
        let accessToken = await this.jwtService.decode(token)
        let checkUser = await this.prisma.nguoiDung.findFirst({
            where: {
                user_id: accessToken.data.user_id
            }
        })
        if (checkUser.role == "ADMIN") {
            let data = await this.prisma.chiTietCongViec.findMany({
                where: {
                    ma_chi_tiet_loai: MaChiTietLoai * 1
                },
                include: {
                    CongViec: true
                }
            })
            responseData(res, "Lấy thành công", data, 200);
        } else {
            responseData(res, "Không có quyền truy cập", "", 403);
        }
    }

    async getFullDetailsJobs(token, res: Response, MaCongViec) {
        let accessToken = await this.jwtService.decode(token)
        let checkUser = await this.prisma.nguoiDung.findFirst({
            where: {
                user_id: accessToken.data.user_id
            }
        })
        if (checkUser.role == "ADMIN") {
            let data = await this.prisma.congViec.findMany({
                where: {
                    ma_cong_viec: MaCongViec * 1
                },
                include: {
                    NguoiDung: true,
                    ChiTietCongViec: {
                        include: {
                            LoaiCongViec: true,
                        }
                    }
                }
            })
            responseData(res, "Lấy thành công", data, 200);
        } else {
            responseData(res, "Không có quyền truy cập", "", 403);
        }
    }

    async getJobsByName(token, res: Response, TenCongViec) {
        let accessToken = await this.jwtService.decode(token)
        let checkUser = await this.prisma.nguoiDung.findFirst({
            where: {
                user_id: accessToken.data.user_id
            }
        })
        if (checkUser.role == "ADMIN") {
            let data = await this.prisma.congViec.findMany({
                where: {
                    ten_cong_viec: {
                        contains: TenCongViec
                    }
                }
            })
            responseData(res, "Lấy thành công", data, 200);
        } else {
            responseData(res, "Không có quyền truy cập", "", 403);
        }
    }
}
