import { Controller, Get, Post, Body, Param, Delete, Put, HttpException, HttpStatus, NotFoundException, ForbiddenException, Query } from '@nestjs/common';
import { PublicationsService } from './publications.service';
import { CreatePublicationDto } from './dto/create-publication.dto';
import { UpdatePublicationDto } from './dto/update-publication.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('publications')
@Controller('publications')
export class PublicationsController {
  constructor(private readonly publicationsService: PublicationsService) {}

  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description:"If the body is incomplete"
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description:"If the mediaID or postID doesn't exist"
  })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description:"Successfully registered publications"
  })
  @ApiOperation({summary:"Publication created or scheduled", description:"this request serves to created or scheduled a publication for the user"})
  @Post()
  async create(@Body() body: CreatePublicationDto) {
    try { 
      return await this.publicationsService.create(body);
    } catch (err) {
      if(err instanceof NotFoundException){
        throw new HttpException(err.message, HttpStatus.NOT_FOUND);
      } else {
        throw new HttpException(err.message, HttpStatus.INTERNAL_SERVER_ERROR);
      };
    };
  };

  @ApiResponse({
    status: HttpStatus.OK,
    description:"Publications return completed successfully"
  })
  @ApiOperation({summary:"Return all publications", description:"this request serves to return all publications registered in the system"})
  @Get()
  async findAll(@Query('published') published: string, @Query('after') after: string) {
    try { 
      return await this.publicationsService.findAll(published, after);
    } catch (err) {
      throw new HttpException(err.message, HttpStatus.INTERNAL_SERVER_ERROR);
    };
  };

  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description:"No publication found"
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description:"Publication found and sent to the user"
  })
  @ApiOperation({summary:"Searching for publication by id", description:"this request serves to search and send the publication of a respective id to the user"})
  @Get(':id')
  async findOne(@Param('id') id: string) {
    try { 
      return await this.publicationsService.findOne(Number(id));
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
    description:"if the publication has already been published"
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description:"No publication found"
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description:"If the mediaID or postID doesn't exist"
  })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description:"Successfully updated publication"
  })
  @ApiOperation({summary:"Update publication", description:"this request serves to update a publication for the user"})
  @Put(':id')
  async update(@Param('id') id: string, @Body() body: UpdatePublicationDto) {
    try { 
      return await this.publicationsService.update(Number(id), body);
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

  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description:"No publication found"
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description:"Successfully deleted publication"
  })
  @ApiOperation({summary:"Delete publication", description:"this request serves to delete a publication for the user"})
  @Delete(':id')
  async remove(@Param('id') id: string) {
    try { 
      return await this.publicationsService.remove(Number(id));
    } catch (err) {
      if(err instanceof NotFoundException){
        throw new HttpException(err.message, HttpStatus.NOT_FOUND);
      } else {
        throw new HttpException(err.message, HttpStatus.INTERNAL_SERVER_ERROR);
      };
    };
  };
}
