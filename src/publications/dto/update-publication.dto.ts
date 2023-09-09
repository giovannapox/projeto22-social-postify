import { PartialType } from '@nestjs/mapped-types';
import { CreatePublicationDto } from './create-publication.dto';
import { IsDate, IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdatePublicationDto extends PartialType(CreatePublicationDto) {
    @ApiProperty({
        example: 3,
        description: "media id"
    })
    @IsNumber()
    @IsNotEmpty({
        message: "All fields are required!"
    })
    mediaId: number;
    
    @ApiProperty({
        example: 2,
        description: "post id"
    })
    @IsNumber()
    @IsNotEmpty({
        message: "All fields are required!"
    })
    postId: number;

    @ApiProperty({
        example: "2023-09-21T13:25:17.352Z",
        description: "date you want to publish"
    })
    @IsString()
    @IsNotEmpty({
        message: "All fields are required!"
    })
    date: Date;
}
