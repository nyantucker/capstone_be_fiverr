import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaClient } from '@prisma/client';
import { responseData } from 'src/config/response';

@Injectable()
export class HireService {
    constructor(
        private jwtService: JwtService
    ) { }
    prisma = new PrismaClient()

    async getHires(token, res: Response) {
        let accessToken = await this.jwtService.decode(token)
        let checkUser = await this.prisma.nguoiDung.findFirst({
            where: {
                user_id: accessToken.data.user_id
            }
        })
        if (checkUser) {
            let data = await this.prisma.thueCongViec.findMany()
            responseData(res, "Lấy danh sách thành công", data, 200);
        } else {
            responseData(res, "Không có quyền truy cập", "", 403);
        }
    }

    async addHires(token, res: Response, body) {
        let { ma_cong_viec } = body
        let accessToken = await this.jwtService.decode(token)
        let checkUser = await this.prisma.nguoiDung.findFirst({
            where: {
                user_id: accessToken.data.user_id
            }
        })
        let checkHired = await this.prisma.thueCongViec.findFirst({
            where: {
                ma_cong_viec: ma_cong_viec * 1
            }
        })
        if (!checkHired) {
            let newData = {
                ma_cong_viec,
                user_id: accessToken.data.user_id,
                ngay_thue: new Date(),
                hoan_thanh: false,
            }
            await this.prisma.thueCongViec.create({
                data: newData
            })
            responseData(res, "Thuê công việc thành công", "", 200);
        } else {
            responseData(res, "Công việc đã có người thuê", "", 403);
        }
    }

    async getHiresPage(token, res: Response, hirePageDto) {
        let { pageIndex, pageSize, keyword } = hirePageDto
        let accessToken = await this.jwtService.decode(token)
        let checkUser = await this.prisma.nguoiDung.findFirst({
            where: {
                user_id: accessToken.data.user_id
            }
        })
        let index = (pageIndex - 1) * pageSize
        if (checkUser) {
            if (pageIndex >= 1 && pageSize >= 1) {
                let data = await this.prisma.thueCongViec.findMany({
                    include: {
                        CongViec: {
                            where: {
                                ten_cong_viec: {
                                    contains: keyword
                                }
                            },
                        }
                    },
                    skip: index * 1,
                    take: pageSize * 1
                })
                return responseData(res, "Lấy danh sách thành công", data, 200);
            } else {
                let data = await this.prisma.thueCongViec.findMany({
                    include: {
                        CongViec: {
                            where: {
                                ten_cong_viec: {
                                    contains: keyword
                                }
                            }
                        }
                    }
                })
                return responseData(res, "Lấy danh sách thành công", data, 200);
            }
        }
    }

    async getHiresById(token, res: Response, id) {
        let accessToken = await this.jwtService.decode(token)
        let checkUser = await this.prisma.nguoiDung.findFirst({
            where: {
                user_id: accessToken.data.user_id
            }
        })
        if (checkUser) {
            let data = await this.prisma.thueCongViec.findFirst({
                where: {
                    ma_thue: id * 1
                }
            })
            responseData(res, "Tìm thành công", data, 200);
        } else {
            responseData(res, "Không có quyền truy cập", checkUser, 403);
        }
    }

    async editHires(token, res: Response, id, body) {
        let { ma_cong_viec } = body
        let accessToken = await this.jwtService.decode(token)
        let checkUser = await this.prisma.nguoiDung.findFirst({
            where: {
                user_id: accessToken.data.user_id
            }
        })
        if (checkUser.role == "ADMIN") {
            let getHires = await this.prisma.thueCongViec.findFirst({
                where: {
                    ma_thue: id * 1
                }
            })
            getHires.ma_cong_viec = ma_cong_viec;
            await this.prisma.thueCongViec.update({
                where: {
                    ma_thue: id * 1
                },
                data: getHires
            })
            responseData(res, "Sửa thành công", "", 200);
        } else {
            responseData(res, "Không có quyền truy cập", "", 403);
        }
    }

    async deleteHires(token, res: Response, id) {
        let accessToken = await this.jwtService.decode(token)
        let checkUser = await this.prisma.nguoiDung.findFirst({
            where: {
                user_id: accessToken.data.user_id
            }
        })
        let checkHired = await this.prisma.thueCongViec.findFirst({
            where: {
                ma_thue: id * 1
            }
        })
        if (checkUser.user_id == checkHired.user_id) {
            await this.prisma.thueCongViec.delete({
                where: {
                    ma_thue: id * 1
                }
            })
            responseData(res, "Xóa thành công", "", 200);
        } else {
            responseData(res, "Không có quyền xóa", "", 403);
        }
    }

    async getHireds(token, res: Response) {
        let accessToken = await this.jwtService.decode(token)
        let checkUser = await this.prisma.nguoiDung.findFirst({
            where: {
                user_id: accessToken.data.user_id
            }
        })
        if (checkUser) {
            let data = await this.prisma.thueCongViec.findFirst({
                where: {
                    user_id: checkUser.user_id
                }
            })
            responseData(res, "Lấy danh sách thành công", data, 200);
        } else {
            responseData(res, "Không có quyền truy cập", "", 403);
        }
    }

    async completeJob(token, res: Response, MaThueCongViec) {
        let accessToken = await this.jwtService.decode(token)
        let checkUser = await this.prisma.nguoiDung.findFirst({
            where: {
                user_id: accessToken.data.user_id
            }
        })
        let getJobs = await this.prisma.thueCongViec.findFirst({
            where: {
                ma_thue: MaThueCongViec * 1
            }
        })
        if (getJobs.hoan_thanh == true) {
            return responseData(res, "Công việc đã hoàn thành trước đó", "", 200);
        } else if (checkUser.user_id == getJobs.user_id) {
            await this.prisma.thueCongViec.update({
                where: {
                    ma_thue: MaThueCongViec * 1
                },
                data: {
                    hoan_thanh: true
                }
            })
            responseData(res, "Hoàn thành công việc", "", 200);
        } else {
            responseData(res, "Không có quyền truy cập", "", 403);
        }
    }
}
