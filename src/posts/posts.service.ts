import { Injectable, NotFoundException } from '@nestjs/common';
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

    const data = posts.map((post) => ({
      id: post.id,
      title: post.title,
      text: post.text,
      image: post.image
    }));

    for (let i = 0; i < data.length; i++) {
      if (data[i].image === null) {
        delete data[i].image;
      };
    };

    return data;
  };

  async findOne(id: number) {
    const post = await this.repository.findPostById(id);
    if(!post) throw new NotFoundException();

    const data = {
      id: post.id,
      title: post.title,
      text: post.text,
      image: post.image
    }
    
    if(data.image === null){
      delete data.image;
    };

    return data;
  };

  async update(id: number, body: UpdatePostDto) {
    const post = await this.repository.findPostById(id);
    if(!post) throw new NotFoundException();

    return await this.repository.updatePost(id, body);
  };

  async remove(id: number) {
    const post = await this.repository.findPostById(id);
    if(!post) throw new NotFoundException();

    return await this.repository.deletePost(id);
  };
};
