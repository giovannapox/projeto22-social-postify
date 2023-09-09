import { PartialType } from '@nestjs/mapped-types';
import { CreatePostDto } from './create-post.dto';
import { IsNotEmpty, IsOptional, IsString, IsUrl } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdatePostDto extends PartialType(CreatePostDto) {
    @ApiProperty({
        example: "Xayah",
        description: "post title"
    })
    @IsString()
    @IsNotEmpty({
        message: "All fields are required!"
    })
    title: string;

    @ApiProperty({
        example: "hey there, this is my league of legends main",
        description: "post text"
    })
    @IsString()
    @IsNotEmpty({
        message: "All fields are required!"
    })
    text: string;

    @ApiProperty({
        example: "https://ddragon.leagueoflegends.com/cdn/img/champion/splash/Xayah_17.jpg",
        description: "post image"
    })
    @IsString()
    @IsUrl()
    @IsOptional()
    image: string | null;
};
