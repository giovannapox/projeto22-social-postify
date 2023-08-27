import { PartialType } from '@nestjs/mapped-types';
import { CreatePublicationDto } from './create-publication.dto';
import { IsDate, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class UpdatePublicationDto extends PartialType(CreatePublicationDto) {
    @IsNumber()
    @IsNotEmpty({
        message: "All fields are required!"
    })
    mediaId: number;
    
    @IsNumber()
    @IsNotEmpty({
        message: "All fields are required!"
    })
    postId: number;

    @IsString()
    @IsNotEmpty({
        message: "All fields are required!"
    })
    date: Date;
}
