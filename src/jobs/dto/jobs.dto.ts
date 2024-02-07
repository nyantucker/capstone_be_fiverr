import { ApiProperty } from '@nestjs/swagger';

export class JobDto {
    @ApiProperty()
    ten_cong_viec: string;

    @ApiProperty()
    danh_gia?: number;

    @ApiProperty()
    gia_tien: number;

    @ApiProperty()
    hinh_anh: string;

    @ApiProperty()
    mo_ta: string;

    @ApiProperty()
    mo_ta_ngan: string;

    @ApiProperty()
    sao_cong_viec: number;

    @ApiProperty()
    ma_chi_tiet_loai: number;
}


export class JodPageDto {
    @ApiProperty({ required: false })
    pageIndex: number;

    @ApiProperty({ required: false })
    pageSize: number;

    @ApiProperty({ required: false })
    keyword: string;
}

export class UploadJobImgDto {
    @ApiProperty({ type: 'string', format: "binary" })
    avatar: any;
}