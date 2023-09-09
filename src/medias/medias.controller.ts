import { Controller, Get, Post, Body, Param, Delete, Put, HttpException, HttpStatus, NotFoundException, ConflictException, ForbiddenException } from '@nestjs/common';
import { MediasService } from './medias.service';
import { CreateMediaDto } from './dto/create-media.dto';
import { UpdateMediaDto } from './dto/update-media.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('medias')
@Controller('medias')
export class MediasController {
  constructor(private readonly mediasService: MediasService) {}

  @ApiResponse({
    status: HttpStatus.CONFLICT,
    description:"If the title and username already exists"
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description:"If the body is incomplete"
  })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description:"Successfully registered media"
  })
  @ApiOperation({summary:"Media Creation", description:"this request serves to create a media for the user"})
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

  @ApiResponse({
    status: HttpStatus.OK,
    description:"Media return completed successfully"
  })
  @ApiOperation({summary:"Return all media", description:"this request serves to return all media registered in the system"})
  @Get()
  async findAll() {
    try { 
      return await this.mediasService.findAll();
    } catch (err) {
      throw new HttpException(err.message, HttpStatus.INTERNAL_SERVER_ERROR);
    };
  };

  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description:"No media found"
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description:"Media found and sent to the user"
  })
  @ApiOperation({summary:"Searching for media by id", description:"this request serves to search and send the media of a respective id to the user"})
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

  @ApiResponse({
    status: HttpStatus.CONFLICT,
    description:"If the title and username already exists"
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description:"No media found"
  })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description:"Successfully updated media"
  })
  @ApiOperation({summary:"Update media", description:"this request serves to update a media for the user"})
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

  @ApiResponse({
    status: HttpStatus.FORBIDDEN,
    description:"if the media is part of no publication (scheduled or published)"
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description:"No media found"
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description:"Successfully deleted media"
  })
  @ApiOperation({summary:"Delete media", description:"this request serves to delete a media for the user"})
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
