import { ApiProperty } from '@nestjs/swagger';

export class JobTypeDto {
    @ApiProperty()
    ma_loai_cong_viec: 0;

    @ApiProperty()
    ten_loai_cong_viec: string;
}

export class TypePageDto {
    @ApiProperty({ required: false })
    pageIndex: number;

    @ApiProperty({ required: false })
    pageSize: number;

    @ApiProperty({ required: false })
    keyword: string;
}