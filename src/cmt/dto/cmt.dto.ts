import { ApiProperty } from '@nestjs/swagger';

export class CmtDto {
    @ApiProperty()
    ma_cong_viec: number;

    @ApiProperty()
    noi_dung: string;

    @ApiProperty()
    sao_binh_luan: number;
}