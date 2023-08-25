import { PartialType } from '@nestjs/mapped-types';
import { CreatePostDto } from './create-post.dto';
import { IsNotEmpty, IsOptional, IsString, IsUrl } from 'class-validator';

export class UpdatePostDto extends PartialType(CreatePostDto) {
    @IsString()
    @IsNotEmpty({
        message: "All fields are required!"
    })
    title: string;

    @IsString()
    @IsNotEmpty({
        message: "All fields are required!"
    })
    text: string;

    @IsString()
    @IsUrl()
    @IsOptional()
    image: string | null;
};
