import { PartialType } from '@nestjs/mapped-types';
import { CreateMediaDto } from './create-media.dto';
import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateMediaDto extends PartialType(CreateMediaDto) {
    @ApiProperty({
        example: "Facebook",
        description: "title of media"
    })
    @IsString()
    @IsNotEmpty({
        message: "All fields are required!"
    })
    title: string;

    @ApiProperty({
        example: "giovannapox",
        description: "username"
    })
    @IsString()
    @IsNotEmpty({
        message: "All fields are required!"
    })
    username: string;
}
