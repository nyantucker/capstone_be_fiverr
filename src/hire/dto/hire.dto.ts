import { ApiProperty } from '@nestjs/swagger';

export class HireDto {
    @ApiProperty()
    ma_cong_viec?: number;

    @ApiProperty()
    user_id?: number;

    @ApiProperty()
    hoan_thanh?: boolean;
}

export class HirePageDto {
    @ApiProperty({ required: false })
    pageIndex: number;

    @ApiProperty({ required: false })
    pageSize: number;

    @ApiProperty({ required: false })
    keyword: string;
}