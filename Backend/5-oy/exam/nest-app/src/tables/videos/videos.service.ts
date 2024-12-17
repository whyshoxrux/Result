import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreateVideoDto } from './dto/create-video.dto';
import { UpdateVideoDto } from './dto/update-video.dto';
import { Video } from './videos.model';
import { LessonsOfCourses } from '../lessons_of_courses/model';

@Injectable()
export class VideosService {
  constructor(
    @InjectModel(Video)
    private readonly videoModel: typeof Video,
  ) {}

  async create(createVideoDto: CreateVideoDto) {
    try {
      const video = await this.videoModel.create(createVideoDto);
      return video;
    } catch (error) {
      throw new Error(`Failed to create video: ${error.message}`);
    }
  }

  async findAll() {
    try {
      const videos = await this.videoModel.findAll({
        include: { model: LessonsOfCourses },
      });
      return videos;
    } catch (error) {
      throw new Error(`Failed to retrieve videos: ${error.message}`);
    }
  }

  async findOne(id: number) {
    try {
      const video = await this.videoModel.findByPk(id);
      if (!video) {
        throw new NotFoundException(`Video with id ${id} not found`);
      }
      return video;
    } catch (error) {
      throw new Error(`Failed to retrieve video: ${error.message}`);
    }
  }

  async update(id: number, updateVideoDto: UpdateVideoDto) {
    try {
      const video = await this.videoModel.findByPk(id);
      if (!video) {
        throw new NotFoundException(`Video with id ${id} not found`);
      }
      await video.update(updateVideoDto);
      return video;
    } catch (error) {
      throw new Error(`Failed to update video: ${error.message}`);
    }
  }

  async remove(id: number) {
    try {
      const video = await this.videoModel.findByPk(id);
      if (!video) {
        throw new NotFoundException(`Video with id ${id} not found`);
      }
      await video.destroy();
      return { message: `Video with id ${id} removed successfully` };
    } catch (error) {
      throw new Error(`Failed to remove video: ${error.message}`);
    }
  }
}
