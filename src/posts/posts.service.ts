import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { PostsRepository } from './posts.repository';

@Injectable()
export class PostsService {

  constructor(private readonly repository: PostsRepository){};

  async create(body: CreatePostDto) {
    return await this.repository.createPost(body);
  };

  async findAll() {
    const posts = await this.repository.findAllPosts();

    for (let i = 0; i < posts.length; i++) {
      if (posts[i].image === null) {
        delete posts[i].image;
      };
    };

    return posts;
  };

  async findOne(id: number) {
    const post = await this.repository.findPostById(id);
    if(!post) throw new NotFoundException();
    
    if(post.image === null){
      delete post.image;
    };

    return post;
  };

  async update(id: number, body: UpdatePostDto) {
    const post = await this.repository.findPostById(id);
    if(!post) throw new NotFoundException();

    return await this.repository.updatePost(id, body);
  };

  async remove(id: number) {
    const post = await this.repository.findPostById(id);
    if(!post) throw new NotFoundException();

    const publication = await this.repository.findPublicationsById(id);
    if(publication) throw new ForbiddenException();

    return await this.repository.deletePost(id);
  };
};
