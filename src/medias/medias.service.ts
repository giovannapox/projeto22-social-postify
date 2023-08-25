import { ConflictException, HttpStatus, Injectable } from '@nestjs/common';
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
      username: `https://www.${media.title.toLowerCase()}.com/${media.username}`,
    }));
  };

  findOne(id: number) {
    return `This action returns a #${id} media`;
  }

  update(id: number, updateMediaDto: UpdateMediaDto) {
    return `This action updates a #${id} media`;
  }

  remove(id: number) {
    return `This action removes a #${id} media`;
  }
}
