import { PrismaService } from 'src/prisma/prisma.service';

let prisma: PrismaService;

export function initializeFactoryPrisma(prismaService: PrismaService) {
  prisma = prismaService;
}

export function createMedias() {
    return prisma.medias.create({
        data: {
            title: "Instagram",
            username: "giovannapox"
        }
    });
};


export function createPosts(){
    return prisma.posts.create({
        data: {
            title: "Instagram",
            text: "TOO EZ for tuyz",
            image: "https://pbs.twimg.com/media/F4V2lQPXIAA2kEt?format=png&name=360x360"
        }
    });
};

export function createPublications(mediaId: number, postId: number){
    return prisma.publications.create({
        data: {
            mediaId,
            postId,
            date:"2024-04-16T14:37:10.352Z"
        }
    });
};