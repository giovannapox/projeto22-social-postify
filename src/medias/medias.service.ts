import { ConflictException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
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
    const medias = await this.repository.findMedias();
    return medias.map((media) => ({
      id: media.id,
      title: media.title,
      username: `https://www.${media.title.toLowerCase()}.com/${media.username}`
    }));
  };

  async findOne(id: number) {
    const media = await this.repository.findMediaById(id);
    if(!media) throw new NotFoundException("Id not found!");

    const data = [{
      id: media.id,
      title: media.title,
      username: `https://www.${media.title.toLowerCase()}.com/${media.username}`
    }];

    return data;
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

    return await this.repository.deleteMedia(id);
  }
}
