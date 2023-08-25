import { Controller, Get, Post, Body, Param, Delete, Put, HttpException, HttpStatus, NotFoundException } from '@nestjs/common';
import { PostsService } from './posts.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';

@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Post()
  async create(@Body() body: CreatePostDto) {
    try { 
      return await this.postsService.create(body);
    } catch (err) {
      throw new HttpException(err.message, HttpStatus.INTERNAL_SERVER_ERROR);
    };
  };

  @Get()
  async findAll() {
    try { 
      return await this.postsService.findAll();
    } catch (err) {
      throw new HttpException(err.message, HttpStatus.INTERNAL_SERVER_ERROR);
    };
  };

  @Get(':id')
  async findOne(@Param('id') id: string) {
    try { 
      return await this.postsService.findOne(Number(id));
    } catch (err) {
      if(err instanceof NotFoundException){
        throw new HttpException(err.message, HttpStatus.NOT_FOUND);
      } else {
        throw new HttpException(err.message, HttpStatus.INTERNAL_SERVER_ERROR);
      };
    };
  };

  @Put(':id')
  async update(@Param('id') id: string, @Body() body: UpdatePostDto) {
    try { 
      return await this.postsService.update(Number(id), body);
    } catch (err) {
      if(err instanceof NotFoundException){
        throw new HttpException(err.message, HttpStatus.NOT_FOUND);
      } else {
        throw new HttpException(err.message, HttpStatus.INTERNAL_SERVER_ERROR);
      };
    };
  };

  @Delete(':id')
  async remove(@Param('id') id: string) {
    try { 
      return await this.postsService.remove(Number(id));
    } catch (err) {
      if(err instanceof NotFoundException){
        throw new HttpException(err.message, HttpStatus.NOT_FOUND);
      } else {
        throw new HttpException(err.message, HttpStatus.INTERNAL_SERVER_ERROR);
      };
    };
  };
};
