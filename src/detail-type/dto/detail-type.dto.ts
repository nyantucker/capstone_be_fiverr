import { ApiProperty } from '@nestjs/swagger';
export class JobDetailDto {
    @ApiProperty()
    ten_chi_tiet: string;

    @ApiProperty()
    ma_loai_cong_viec: number;
}

export class DetailPageDto {
    @ApiProperty({ required: false })
    pageIndex: number;

    @ApiProperty({ required: false })
    pageSize: number;

    @ApiProperty({ required: false })
    keyword: string;
}