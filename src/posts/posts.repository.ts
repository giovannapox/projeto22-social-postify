import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';

@Injectable()
export class PostsRepository {
    constructor(private readonly prisma: PrismaService){};

    createPost(data: CreatePostDto){
        return this.prisma.posts.create({
            data
        })
    };

    findAllPosts(){
        return this.prisma.posts.findMany({});
    };

    findPostById(id: number){
        return this.prisma.posts.findUnique({
            where: {
                id
            }
        });
    };

    updatePost(id: number, data: UpdatePostDto){
        return this.prisma.posts.update({
            where: {
                id
            },
            data: {
                title: data.title,
                text: data.text,
                image: data.image
            }
        });
    };

    findPublicationsById(id: number){
        return this.prisma.publications.findFirst({
          where: {
            postId: id
          }
        });
      };

    deletePost(id: number){
        return this.prisma.posts.delete({
            where: {
                id
            }
        });
    };
};
