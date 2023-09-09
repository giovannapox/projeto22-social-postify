import { faker } from '@faker-js/faker';
import { PrismaService } from 'src/prisma/prisma.service';

let prisma: PrismaService;

export function initializeFactoryPrisma(prismaService: PrismaService) {
  prisma = prismaService;
}

export function createMedias() {
    return prisma.medias.create({
        data: {
            title: faker.lorem.word(),
            username: faker.internet.userName()
        }
    });
};


export function createPosts(){
    return prisma.posts.create({
        data: {
            title: faker.lorem.sentence(),
            text: faker.lorem.text(),
            image: faker.image.url()
        }
    });
};

export function createPublications(mediaId: number, postId: number, IsPublished: boolean){
    return prisma.publications.create({
        data: {
            mediaId,
            postId,
            date:(IsPublished ? "2020-11-30T11:34:32.352Z" : "2024-06-11T13:25:17.352Z")
        }
    });
};