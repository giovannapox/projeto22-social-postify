import { Controller, Get, Post, Body, Param, Delete, Put, HttpException, HttpStatus, NotFoundException, ConflictException, ForbiddenException } from '@nestjs/common';
import { MediasService } from './medias.service';
import { CreateMediaDto } from './dto/create-media.dto';
import { UpdateMediaDto } from './dto/update-media.dto';


@Controller('medias')
export class MediasController {
  constructor(private readonly mediasService: MediasService) {}

  @Post()
  async create(@Body() body: CreateMediaDto) {
    try { 
      return await this.mediasService.create(body);
    } catch (err) {
      if(err instanceof ConflictException){
        throw new HttpException(err.message, HttpStatus.CONFLICT);
      } else {
        throw new HttpException(err.message, HttpStatus.INTERNAL_SERVER_ERROR);
      };
    };
  };

  @Get()
  async findAll() {
    try { 
      return await this.mediasService.findAll();
    } catch (err) {
      throw new HttpException(err.message, HttpStatus.INTERNAL_SERVER_ERROR);
    };
  };

  @Get(':id')
  async findOne(@Param('id') id: string) {
    try { 
      return await this.mediasService.findOne(Number(id));
    } catch (err) {
      if(err instanceof NotFoundException){
        throw new HttpException(err.message, HttpStatus.NOT_FOUND);
      } else {
        throw new HttpException(err.message, HttpStatus.INTERNAL_SERVER_ERROR);
      };
    };
  };

  @Put(':id')
  async update(@Param('id') id: string, @Body() body: UpdateMediaDto) {
    try { 
      return await this.mediasService.update(Number(id), body);
    } catch (err) {
      if(err instanceof NotFoundException){
        throw new HttpException(err.message, HttpStatus.NOT_FOUND);
      } else if (err instanceof ConflictException) {
        throw new HttpException(err.message, HttpStatus.CONFLICT);
      } else {
        throw new HttpException(err.message, HttpStatus.INTERNAL_SERVER_ERROR);
      };
    };
  };

  @Delete(':id')
  async remove(@Param('id') id: string) {
    try { 
      return await this.mediasService.remove(Number(id));
    } catch (err) {
      if(err instanceof NotFoundException){
        throw new HttpException(err.message, HttpStatus.NOT_FOUND);
      } else if (err instanceof ForbiddenException) {
        throw new HttpException(err.message, HttpStatus.FORBIDDEN);
      } else {
        throw new HttpException(err.message, HttpStatus.INTERNAL_SERVER_ERROR);
      };
    };
  };
};
