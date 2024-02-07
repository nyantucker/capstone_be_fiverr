import { ApiProperty } from '@nestjs/swagger';
export class UserDto {
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

export class UserPageDto {
    @ApiProperty({ required: false })
    pageIndex: number;

    @ApiProperty({ required: false })
    pageSize: number;

    @ApiProperty({ required: false })
    keyword: string;
}

export class UploadAvatarDto {
    @ApiProperty({ type: 'string', format: "binary" })
    avatar: any;
}