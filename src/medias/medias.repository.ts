import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateMediaDto } from './dto/create-media.dto';

@Injectable()
export class MediasRepository {
  constructor(private readonly prisma: PrismaService){};

  findMediaAlreadyExists(body: CreateMediaDto){
    const { title, username } = body;
    
    return this.prisma.medias.findFirst({
        where: {
            title,
            username
        }
    });
  };

  createMedia(data: CreateMediaDto){
    return this.prisma.medias.create({ 
        data: {
            title: data.title,
            username: data.username
        }
    });
  };

  findMedias(){
    return this.prisma.medias.findMany({})
  }
}
