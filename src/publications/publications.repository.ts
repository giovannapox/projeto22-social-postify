import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreatePublicationDto } from './dto/create-publication.dto';
import { UpdateMediaDto } from 'src/medias/dto/update-media.dto';
import { UpdatePublicationDto } from './dto/update-publication.dto';

@Injectable()
export class PublicationsRepository {
    constructor(private readonly prisma: PrismaService){};

    createPublication(body: CreatePublicationDto){
        return this.prisma.publications.create({
            data: body
        });
    };

    findMediaId(body: CreatePublicationDto){
        return this.prisma.medias.findFirst({
            where: {
                id: body.mediaId
            }
        });
    };

    findPostId(body: CreatePublicationDto){
        return this.prisma.posts.findFirst({
            where: {
                id: body.postId
            }
        });
    };

    findPublications(){
        return this.prisma.publications.findMany({});
    };

    findPublicationById(id: number){
        return this.prisma.publications.findUnique({
            where: {
                id
            }
        });
    };

    updateById(id: number, body: UpdatePublicationDto){
        return this.prisma.publications.update({
            where: {
                id
            },
            data: {
                mediaId: body.mediaId,
                postId: body.postId,
                date: body.date
            }
        });
    };

    deleteById(id: number){
        return this.prisma.publications.delete({
            where: {
                id
            }
        });
    };
};

