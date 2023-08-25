import { PartialType } from '@nestjs/mapped-types';
import { CreateMediaDto } from './create-media.dto';
import { IsNotEmpty, IsString } from 'class-validator';

export class UpdateMediaDto extends PartialType(CreateMediaDto) {
    @IsString()
    @IsNotEmpty({
        message: "All fields are required!"
    })
    title: string;

    @IsString()
    @IsNotEmpty({
        message: "All fields are required!"
    })
    username: string;
}
