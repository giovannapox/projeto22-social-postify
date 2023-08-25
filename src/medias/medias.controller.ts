import { Controller, Get, Post, Body, Param, Delete, Put, HttpException, HttpStatus, NotFoundException, ConflictException } from '@nestjs/common';
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
      throw new HttpException(err.message, HttpStatus.CONFLICT);
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
      throw new HttpException(err.message, HttpStatus.NOT_FOUND);
    };
  };

  @Put(':id')
  async update(@Param('id') id: string, @Body() body: UpdateMediaDto) {
    return await this.mediasService.update(Number(id), body);
  };

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.mediasService.remove(Number(id));
  };
};
