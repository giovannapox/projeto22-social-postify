import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { CreatePublicationDto } from './dto/create-publication.dto';
import { UpdatePublicationDto } from './dto/update-publication.dto';
import { PublicationsRepository } from './publications.repository';

@Injectable()
export class PublicationsService {
  constructor(private readonly repository: PublicationsRepository){};

  async create(body: CreatePublicationDto) {
    const mediaIdExists = await this.repository.findMediaId(body);
    const postIdExists = await this.repository.findPostId(body);
    if(!mediaIdExists || !postIdExists) throw new NotFoundException();

    return await this.repository.createPublication(body);
  };

  async findAll() {
    return await this.repository.findPublications();
  };

  async findOne(id: number) {
    const publicationExists = await this.repository.findPublicationById(id);
    if(!publicationExists) throw new NotFoundException();

    return publicationExists;
  };

  async update(id: number, body: UpdatePublicationDto) {
    const mediaIdExists = await this.repository.findMediaId(body);
    const postIdExists = await this.repository.findPostId(body);
    const publicationExists = await this.repository.findPublicationById(id);
    if(!mediaIdExists || !postIdExists || !publicationExists) throw new NotFoundException();

    const now = new Date();
    const publicationDate = new Date(publicationExists.date);

    if(publicationDate <= now) throw new ForbiddenException();

    return await this.repository.updateById(id, body);
  };
  

  async remove(id: number) {
    const publicationExists = await this.repository.findPublicationById(id);
    if(!publicationExists) throw new NotFoundException();

    return await this.repository.deleteById(id);
  };
};
