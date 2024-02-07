import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaClient } from '@prisma/client';
import { responseData } from 'src/config/response';
import * as bcrypt from 'bcrypt';


@Injectable()
export class UsersService {
    constructor(
        private jwtService: JwtService
    ) { }
    prisma = new PrismaClient()

    async getUsers(token, res: Response) {
        let accessToken = await this.jwtService.decode(token)
        let checkUser = await this.prisma.nguoiDung.findFirst({
            where: {
                user_id: accessToken.data.user_id
            }
        })
        if (checkUser) {
            let data = await this.prisma.nguoiDung.findMany()
            return responseData(res, "Danh sách người dùng", data, 200)
        }
    }

    async addUsers(token, res: Response, body) {
        let accessToken = await this.jwtService.decode(token)
        let { name, email, pass_word, phone, birth_day, gender, skill, certification } = body
        let checkUser = await this.prisma.nguoiDung.findFirst({
            where: {
                user_id: accessToken.data.user_id
            }
        })
        if (checkUser.role == "ADMIN") {
            let newData = {
                name,
                email,
                pass_word: bcrypt.hashSync(pass_word, 10),
                phone,
                birth_day,
                gender,
                role: "USER",
                skill,
                certification,
                refToken: "",
            }
            await this.prisma.nguoiDung.create({
                data: newData
            })
            return responseData(res, "Thêm người dùng thành công", "", 200)
        } else {
            responseData(res, "Không có quyền truy cập", "", 403)
        }
    }

    async deleteUser(token, res: Response, id) {
        let accessToken = await this.jwtService.decode(token)
        let checkUser = await this.prisma.nguoiDung.findFirst({
            where: {
                user_id: accessToken.data.user_id
            }
        })
        if (checkUser.role == "ADMIN") {
            await this.prisma.nguoiDung.delete({
                where: {
                    user_id: id * 1
                }
            })
            return responseData(res, "Xóa người dùng thành công", "", 200)
        } else {
            responseData(res, "Không có quyền truy cập", "", 403)
        }
    }

    async getUsersPage(token, res: Response, userPageDto) {
        // async getUsersPage(token, res: Response, pageIndex, pageSize, keyword) {
        let { pageIndex, pageSize, keyword } = userPageDto
        let accessToken = await this.jwtService.decode(token)
        let checkUser = await this.prisma.nguoiDung.findFirst({
            where: {
                user_id: accessToken.data.user_id
            }
        })
        let index = (pageIndex - 1) * pageSize
        if (checkUser) {
            if (pageIndex >= 1 && pageSize >= 1) {
                let data = await this.prisma.nguoiDung.findMany({
                    where: {
                        name: {
                            contains: keyword
                        }
                    },
                    skip: index * 1,
                    take: pageSize * 1
                })
                return responseData(res, "Lấy danh sách thành công", data, 200);
            } else {
                let data = await this.prisma.nguoiDung.findMany({
                    where: {
                        name: {
                            contains: keyword
                        }
                    }
                })
                return responseData(res, "Lấy danh sách thành công", data, 200);
            }
        }
    }

    async getUsersById(token, res: Response, id) {
        let accessToken = await this.jwtService.decode(token)
        let checkUser = await this.prisma.nguoiDung.findFirst({
            where: {
                user_id: accessToken.data.user_id
            }
        })
        if (checkUser) {
            let data = await this.prisma.nguoiDung.findFirst({
                where: {
                    user_id: id * 1
                }
            })
            responseData(res, "Tìm thành công", data, 200)
        }
    }

    async editUsers(token, res: Response, id, body) {
        let { name, email, phone, birth_day, gender, role, skill, certification } = body
        let accessToken = await this.jwtService.decode(token)
        let checkUser = await this.prisma.nguoiDung.findFirst({
            where: {
                user_id: accessToken.data.user_id
            }
        })
        if (checkUser.role == "ADMIN") {
            let getUser = await this.prisma.nguoiDung.findFirst({
                where: {
                    user_id: id * 1
                }
            })
            getUser.name = name;
            getUser.email = email;
            getUser.phone = phone;
            getUser.birth_day = birth_day;
            getUser.gender = gender;
            getUser.role = role;
            getUser.skill = skill;
            getUser.certification = certification;
            await this.prisma.nguoiDung.update({
                where: {
                    user_id: id * 1
                },
                data: getUser
            })
            responseData(res, "Cập nhật người dùng thành công", "", 200)
        } else {
            responseData(res, "Không có quyền truy cập", "", 403)
        }
    }

    async searchUsers(token, res: Response, TenNguoiDung) {
        let accessToken = await this.jwtService.decode(token)
        let checkUser = await this.prisma.nguoiDung.findFirst({
            where: {
                user_id: accessToken.data.user_id
            }
        })
        if (checkUser) {
            let data = await this.prisma.nguoiDung.findMany({
                where: {
                    name: {
                        contains: TenNguoiDung
                    }
                }
            })
            responseData(res, "Lấy thành công", data, 200)
        } else {
            responseData(res, "Không có quyền truy cập", "", 403)
        }
    }

    async uploadAvatar(token, res: Response, name) {
        let accessToken = await this.jwtService.decode(token)
        let getUser = await this.prisma.nguoiDung.findFirst({
            where: {
                user_id: accessToken.data.user_id
            }
        })
        await this.prisma.nguoiDung.update({
            where: {
                user_id: getUser.user_id
            },
            data: {
                avatar: name
            }
        })
        return responseData(res, "Cập nhật ảnh đại diện thành công", name, 200);
    }

}

