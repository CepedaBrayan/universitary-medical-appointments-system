import { Injectable, UnauthorizedException } from '@nestjs/common';
import { CreateVideoDto } from './dto/create-video.dto';
import { UpdateVideoDto } from './dto/update-video.dto';
import { DeleteVideoDto } from './dto/delete-video.dto';
import { PrismaClient, Prisma } from '@prisma/client';
import { JwtService } from '@nestjs/jwt';

const prisma = new PrismaClient();

@Injectable()
export class VideosService {
  constructor(private jwtService: JwtService) {}

  async findAll() {
    try {
      const allVideos = await prisma.video.findMany();
      if (allVideos) {
        return allVideos;
      } else return { message: 'No videos found' };
    } catch (error) {
      return { message: 'Failed ' + error };
    }
  }

  async findOne(id: number) {
    try {
      const foundVideo = await prisma.video.findUnique({
        where: {
          id: id,
        },
      });
      if (foundVideo) {
        return foundVideo;
      } else return { message: 'Video not found' };
    } catch (error) {
      return { message: 'Failed ' + error };
    }
  }

  async create(createVideoDto: CreateVideoDto) {
    try {
      if (!(await this.authPsycho(createVideoDto.auth_token)))
        throw new UnauthorizedException();
      const videos = await prisma.video.findMany({
        where: {
          url: createVideoDto.url,
        },
      });
      if (videos[0]) return { message: 'Video already exists' };
      const createdVideo = await prisma.video.create({
        data: {
          description: createVideoDto.description,
          url: createVideoDto.url,
        },
      });
      return { message: 'Video created' };
    } catch (error) {
      return { message: 'Failed ' + error };
    }
  }

  async delete(deleteVideoDto: DeleteVideoDto) {
    try {
      if (!(await this.authPsycho(deleteVideoDto.auth_token)))
        throw new UnauthorizedException();
      if (
        !(await prisma.video.findUnique({
          where: { id: deleteVideoDto.video_id },
        }))
      )
        return { message: 'Video not found' };
      const deletedVideo = await prisma.video.delete({
        where: {
          id: deleteVideoDto.video_id,
        },
      });
      return { message: 'Video deleted' };
    } catch (error) {
      return { message: 'Failed ' + error };
    }
  }

  async authPsycho(auth_token: string): Promise<boolean> {
    try {
      const decodedJwtAccessToken: any = this.jwtService.decode(auth_token);
      const now: any = new Date().getTime() / 1000;
      const search = await prisma.psychology.findMany({
        where: {
          id: decodedJwtAccessToken.id,
          nickname: decodedJwtAccessToken.nickname,
        },
      });
      if (
        !decodedJwtAccessToken ||
        !search[0] ||
        now > decodedJwtAccessToken.exp
      )
        return false;
      return true;
    } catch (error) {
      throw new UnauthorizedException();
    }
  }
}
