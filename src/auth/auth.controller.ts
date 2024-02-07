import { Body, Controller, Get, Post, Req, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import { BodySignin, BodySignup } from './dto/create-auth.dto';
import { ApiBody, ApiTags } from '@nestjs/swagger';

@ApiTags("Auth")
@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) { }

    @Post("/signin")
    signin(
        @Req() req: Request,
        @Body() body: BodySignin,
        @Res() res: Response
    ) {
        return this.authService.signin(body, res)
    }

    @ApiBody({ type: BodySignup })
    @Post("/signup")
    signup(
        @Req() req: Request,
        @Body() body: BodySignup,
        @Res() res: Response
    ) {
        return this.authService.signup(body, res)
    }
}
