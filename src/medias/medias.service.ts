import { ConflictException, ForbiddenException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { CreateMediaDto } from './dto/create-media.dto';
import { UpdateMediaDto } from './dto/update-media.dto';
import { MediasRepository } from './medias.repository';

@Injectable()
export class MediasService {
  
  constructor(private readonly repository: MediasRepository){};

  async create(body: CreateMediaDto) {
    const mediaExists = await this.repository.findMediaAlreadyExists(body);
    if(mediaExists) throw new ConflictException('This title and this username already exist!');
    return await this.repository.createMedia(body);
  };

  async findAll() {
    return await this.repository.findMedias();
  };

  async findOne(id: number) {
    const media = await this.repository.findMediaById(id);
    if(!media) throw new NotFoundException("Id not found!");

    return media;
  };

  async update(id: number, body: UpdateMediaDto) {
    const media = await this.repository.findMediaById(id);
    if(!media) throw new NotFoundException("Id not found!");

    const mediaExists = await this.repository.findMediaAlreadyExists(body);
    if(mediaExists) throw new ConflictException('This title and this username already exist!');

    return await this.repository.updateMedia(id, body);
  }

  async remove(id: number) {
    const media = await this.repository.findMediaById(id);
    if(!media) throw new NotFoundException("Id not found!");

    const publication = await this.repository.findPublicationsById(id);
    if(publication) throw new ForbiddenException();

    return await this.repository.deleteMedia(id);
  };
};
