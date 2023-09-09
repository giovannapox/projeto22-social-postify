import { Controller, Get, Post, Body, Param, Delete, Put, HttpException, HttpStatus, NotFoundException, ForbiddenException } from '@nestjs/common';
import { PostsService } from './posts.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('posts')
@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description:"If the body is incomplete"
  })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description:"Successfully registered post"
  })
  @ApiOperation({summary:"Post Creation", description:"this request serves to create a post for the user"})
  @Post()
  async create(@Body() body: CreatePostDto) {
    try { 
      return await this.postsService.create(body);
    } catch (err) {
      throw new HttpException(err.message, HttpStatus.INTERNAL_SERVER_ERROR);
    };
  };

  @ApiResponse({
    status: HttpStatus.OK,
    description:"Post return completed successfully"
  })
  @ApiOperation({summary:"Return all posts", description:"this request serves to return all posts registered in the system"})
  @Get()
  async findAll() {
    try { 
      return await this.postsService.findAll();
    } catch (err) {
      throw new HttpException(err.message, HttpStatus.INTERNAL_SERVER_ERROR);
    };
  };

  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description:"No post found"
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description:"post found and sent to the user"
  })
  @ApiOperation({summary:"Searching for post by id", description:"this request serves to search and send the post of a respective id to the user"})
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

  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description:"No post found"
  })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description:"Successfully updated post"
  })
  @ApiOperation({summary:"Update post", description:"this request serves to update a post for the user"})
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

  @ApiResponse({
    status: HttpStatus.FORBIDDEN,
    description:"if the post is part of no publication (scheduled or published)"
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description:"No post found"
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description:"Successfully deleted post"
  })
  @ApiOperation({summary:"Delete post", description:"this request serves to delete a post for the user"})
  @Delete(':id')
  async remove(@Param('id') id: string) {
    try { 
      return await this.postsService.remove(Number(id));
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
