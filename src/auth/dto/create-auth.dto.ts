import { ApiProperty } from "@nestjs/swagger"

export class BodySignup {
    @ApiProperty()
    name: string

    @ApiProperty()
    email: string

    @ApiProperty()
    pass_word: string

    @ApiProperty()
    phone: string

    @ApiProperty()
    birth_day: string

    @ApiProperty()
    gender: string

    @ApiProperty()
    skill: string

    @ApiProperty()
    certification: string
}

export class BodySignin {
    @ApiProperty()
    email: string

    @ApiProperty()
    pass_word: string
}