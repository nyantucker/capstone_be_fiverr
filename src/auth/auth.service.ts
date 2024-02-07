import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { responseData } from 'src/config/response';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
    constructor(
        private jwtService: JwtService
    ) { }
    prisma = new PrismaClient()

    async signin(body, res: Response) {
        let { email, pass_word } = body;
        let checkEmail = await this.prisma.nguoiDung.findFirst({
            where: {
                email: email
            }
        })
        if (checkEmail) {
            if (bcrypt.compareSync(pass_word, checkEmail.pass_word)) {
                let key = new Date().getTime();
                let token = await this.jwtService.signAsync(
                    { data: { user_id: checkEmail.user_id, key: key } },
                    { expiresIn: "10m", secret: "BI_MAT" }
                )
                let refToken = await this.jwtService.signAsync(
                    { data: { user_id: checkEmail.user_id, key: key } },
                    { expiresIn: "7d", secret: "KO_MAT" }
                )
                await this.prisma.nguoiDung.update({
                    where: {
                        user_id: checkEmail.user_id,
                    },
                    data: {
                        refToken: refToken
                    }
                })
                return responseData(res, "Đăng nhập thành công", token, 200);
            } else {
                responseData(res, "Mật khẩu không đúng", "", 400);
            }
        } else {
            return responseData(res, "Email chưa đăng ký", "", 400);
        }
    }

    async signup(body, res: Response) {
        let { name, email, pass_word, phone, birth_day, gender, skill, certification } = body
        let checkEmail = await this.prisma.nguoiDung.findFirst({
            where: {
                email: email
            }
        })
        if (checkEmail) {
            return responseData(res, "Email đã sử dụng", "", 400)
        }
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
        return responseData(res, "Đăng ký thành công", "", 200)
    }
}
