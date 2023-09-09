import { Test, TestingModule } from '@nestjs/testing';
import { HttpStatus, INestApplication, ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';
import { PrismaService } from 'src/prisma/prisma.service';
import { PrismaModule } from 'src/prisma/prisma.module';
import { createMedias, createPosts, createPublications, initializeFactoryPrisma } from './factory/factories';

describe('Media E2E Tests', () => {
  let app: INestApplication;
  let prisma: PrismaService = new PrismaService();

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule, PrismaModule],
    })
    .overrideProvider(PrismaService)
    .useValue(prisma)
    .compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(new ValidationPipe())
    
    prisma = app.get(PrismaService);

    await prisma.publications.deleteMany();
    await prisma.medias.deleteMany();
    await prisma.posts.deleteMany();

    await app.init();
    initializeFactoryPrisma(prisma);
  });

  describe('/health', () => {
    it('/ (GET)', () => {
      return request(app.getHttpServer())
        .get('/health')
        .expect(200)
        .expect("I’m okay!");
    });
  });

  describe('/medias', () => {
    it('/ (POST) => should return status 201 when submitted body is correct', async () => {
      await request(app.getHttpServer())
        .post('/medias')
        .send({
            "title": "Instagram",
            "username": "myusername",
        })
        .expect(HttpStatus.CREATED)
    });
  
    it('/ (POST) => should return status 400 when body is wrong', async () => {
      await request(app.getHttpServer())
        .post('/medias')
        .send({
            "title": "Instagram",
        })
        .expect(HttpStatus.BAD_REQUEST)
    });

    it('/ (POST) => should return status 409 when title and username already exist', async () => {
      const media = await createMedias();
      return await request(app.getHttpServer())
      .post('/medias')
      .send({
        title: media.title,
        username: media.username
      })
      .expect(HttpStatus.CONFLICT);
    }) 
  
  
    it('/ (GET) => should return 200 and expected format when have medias', async () => {
      const medias = await prisma.medias.findMany();
      await request(app.getHttpServer())
        .get('/medias')
        .expect(medias)
        .expect(HttpStatus.OK)
    });
  
    it('/ (GET/ID) => should return 200 and expected format when media id exists', async () => {
      const media = await createMedias();
      await request(app.getHttpServer())
        .get(`/medias/${media.id}`)
        .expect(media)
        .expect(HttpStatus.OK)
    });
    
    it('/ (GET/ID) => should return 404 when media id doesn`t exist', async () => {
      await request(app.getHttpServer())
        .get(`/medias/1`)
        .expect(HttpStatus.NOT_FOUND)
    });

    it('/ (PUT) => should return 200 and update the object with the respective id sent', async () => {
      const media = await createMedias();
      await request(app.getHttpServer())
        .put(`/medias/${media.id}`)
        .send({
          title: "Instagram",
          username: "gigiba"
        })
        .expect(HttpStatus.OK)
    });
    
    it('/ (PUT) => should return 409 when body already exists', async () => {
      const media = await createMedias();
      await request(app.getHttpServer())
        .put(`/medias/${media.id}`)
        .send({
          title: media.title,
          username: media.username
        })
        .expect(HttpStatus.CONFLICT)
    });

    it('/ (PUT) => should return 404 when media id doens´t exists', async () => {
      await request(app.getHttpServer())
        .put(`/medias/1`)
        .send({
          title: "instagram",
          username: "giovannapox"
        })
        .expect(HttpStatus.NOT_FOUND)
    });

    it('/ (DELETE) => should return 200 and delete object when id exists', async () => {
      const media = await createMedias();
      await request(app.getHttpServer())
        .delete(`/medias/${media.id}`)
        .expect(HttpStatus.OK);
    });

    it('/ (DELETE) => should return 403 if it is part of any publication (scheduled or published).', async () => {
      const media = await createMedias();
      const post = await createPosts();
      await createPublications(media.id, post.id, false)
      await request(app.getHttpServer())
        .delete(`/medias/${media.id}`)
        .expect(HttpStatus.FORBIDDEN);
    });

    it('/ (DELETE) => should return 404 if there is no matching media id', async () => {
      await request(app.getHttpServer())
        .delete(`/medias/1`)
        .expect(HttpStatus.NOT_FOUND);
    });
  });

  describe('/posts ', () => {
    it('/ (POST) => should return status 201 when submitted body is correct', async () => {
      return await request(app.getHttpServer())
      .post('/posts')
      .send({
        title: "instagram",
        text: "nobody's home"
      })
      .expect(HttpStatus.CREATED);
    });

    it('/ (POST) => should return status 400 when submitted body is wrong', async () => {
      return await request(app.getHttpServer())
      .post('/posts')
      .send({
        title: "instagram",
      })
      .expect(HttpStatus.BAD_REQUEST);
    });

    it('/ (GET) => should return 200 and expected format when have posts', async () => {
      const posts = await prisma.posts.findMany();
      return await request(app.getHttpServer())
      .get('/posts')
      .expect(posts)
      .expect(HttpStatus.OK)
    });

    it('/ (GET/ID) => should return 200 and expected format when post id exists', async () => {
      const post = await createPosts()
      return await request(app.getHttpServer())
      .get(`/posts/${post.id}`)
      .expect(post)
      .expect(HttpStatus.OK)
    });

    it('/ (GET/ID) => should return 404 when post id doesn`t exist', async () => {
      await request(app.getHttpServer())
        .get(`/posts/1`)
        .expect(HttpStatus.NOT_FOUND)
    });

    it('/ (PUT) => should return 200 and update the object with the respective id sent', async () => {
      const post = await createPosts()
      return await request(app.getHttpServer())
      .put(`/posts/${post.id}`)
      .send({
        title:  "twitter",
        text: "weeknd"
      })
      .expect(HttpStatus.OK)
    });

    it('/ (PUT) => should return 404 when post id doens´t exists', async () => {
      await request(app.getHttpServer())
        .put(`/posts/1`)
        .send({
          title: "instagram",
          username: "giovannapox"
        })
        .expect(HttpStatus.NOT_FOUND)
    });

    it('/ (DELETE) => should return 200 and delete object when id exists', async () => {
      const post = await createPosts()
      return await request(app.getHttpServer())
      .delete(`/posts/${post.id}`)
      .expect(HttpStatus.OK)
    });

    it('/ (DELETE) => should return 403 if it is part of any publication (scheduled or published).', async () => {
      const media = await createMedias();
      const post = await createPosts();
      await createPublications(media.id, post.id, false)
      await request(app.getHttpServer())
        .delete(`/posts/${post.id}`)
        .expect(HttpStatus.FORBIDDEN);
    });

    it('/ (DELETE) => should return 404 if there is no matching post id', async () => {
      await request(app.getHttpServer())
        .delete(`/posts/1`)
        .expect(HttpStatus.NOT_FOUND);
    });
  });

  describe('/publications ', () => {

    it('/ (POST) => should return status 201 when submitted body is correct', async () => {
      const media = await createMedias()
      const post = await createPosts()
      return await request(app.getHttpServer())
      .post('/publications')
      .send({
        mediaId: media.id,
        postId: post.id,
        date: "2023-08-21T13:25:17.352Z"
      })
      .expect(HttpStatus.CREATED);
    });

    it('/ (POST) => should return status 400 when submitted body is wrong', async () => {
      const media = await createMedias()
      const post = await createPosts()
      return await request(app.getHttpServer())
      .post('/publications')
      .send({
        mediaId: media.id,
        postId: post.id,
      })
      .expect(HttpStatus.BAD_REQUEST);
    });

    it('/ (POST) => should return status 404 when media id or post id doesn´t exist', async () => {
      const media = await createMedias()
      return await request(app.getHttpServer())
      .post('/publications')
      .send({
        mediaId: media.id,
        postId: 1,
        date: "2023-08-21T13:25:17.352Z"
      })
      .expect(HttpStatus.NOT_FOUND);
    });

    it('/ (GET) => should return 200 and expected format when have publications', async () => {
      const publications = await prisma.publications.findMany();
      return await request(app.getHttpServer())
      .get('/publications')
      .expect(HttpStatus.OK)
      .expect(publications);
    });

    it('/ (GET/ID) => should return 200 and expected format when publications id exists', async () => {
      const media = await createMedias()
      const post = await createPosts()
      const publications = await createPublications(media.id,post.id, false)
      return await request(app.getHttpServer())
      .get(`/publications/${publications.id}`)
      .expect(HttpStatus.OK)
      .expect({
        id: publications.id,
        mediaId:  publications.mediaId,
        postId: publications.postId,
        date: publications.date.toISOString()
      });
    });

    it('/ (GET/ID) => should return 404 when publication id doesn`t exist', async () => {
      await request(app.getHttpServer())
        .get(`/publications/1`)
        .expect(HttpStatus.NOT_FOUND)
    });

    it('/ (PUT) => should return 200 and update the object with the respective id sent', async () => {
      const media = await createMedias()
      const post = await createPosts()
      const publications = await createPublications(media.id,post.id, false)
      return await request(app.getHttpServer())
      .put(`/publications/${publications.id}`)
      .send({
        mediaId:media.id,
        postId:post.id,
        date:publications.date.toISOString()
      })
      .expect(HttpStatus.OK)
    });

    it('/ (PUT) => should return 404 when publications id doens´t exists', async () => {
      const media = await createMedias()
      const post = await createPosts()
      await request(app.getHttpServer())
        .put(`/publications/1`)
        .send({
          mediaId:media.id,
          postId:post.id,
          date:"2024-09-13T14:46:39.352Z"
        })
        .expect(HttpStatus.NOT_FOUND)
    });

    it('/ (PUT) => should return 404 when media id or post id doens´t exists', async () => {
      const media = await createMedias()
      const post = await createPosts()
      const publications = await createPublications(media.id,post.id, false)
      await request(app.getHttpServer())
        .put(`/publications/${publications.id}`)
        .send({
          mediaId:media.id,
          postId:1,
          date:"2024-09-13T14:46:39.352Z"
        })
        .expect(HttpStatus.NOT_FOUND)
    });

    it('/ (PUT) => should return 403 if a publication that has already been published', async () => {
      const media = await createMedias()
      const post = await createPosts()
      const publications = await createPublications(media.id,post.id, true)
      await request(app.getHttpServer())
        .put(`/publications/${publications.id}`)
        .send({
          mediaId: media.id,
          postId: post.id,
          date: "2024-09-13T14:46:39.352Z"
        })
        .expect(HttpStatus.FORBIDDEN)
    });

    it('/ (DELETE) => should return 200 and delete object when id exists', async () => {
      const media = await createMedias()
      const post = await createPosts()
      const publications = await createPublications(media.id, post.id, false)
      return await request(app.getHttpServer())
      .delete(`/publications/${publications.id}`)
      .expect(HttpStatus.OK)
    });

    it('/ (DELETE) => should return 404 if id doesn´t exists', async () => {
      return await request(app.getHttpServer())
      .delete(`/publications/1`)
      .expect(HttpStatus.NOT_FOUND)
    });
  });

});
