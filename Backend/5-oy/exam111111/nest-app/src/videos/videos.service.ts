import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreateVideoDto } from './dto/create-video.dto';
import { UpdateVideoDto } from './dto/update-video.dto';
import { Video } from './videos.model';

@Injectable()
export class VideosService {
  constructor(
    @InjectModel(Video)
    private readonly videoModel: typeof Video, // Injecting the Video model for database operations
  ) {}

  // Create a new video
  async create(createVideoDto: CreateVideoDto) {
    const video = await this.videoModel.create(createVideoDto);
    return video; // Returns the created video entity
  }

  // Find all videos
  async findAll() {
    const videos = await this.videoModel.findAll();
    return videos; // Returns all videos from the database
  }

  // Find a video by id
  async findOne(id: number) {
    const video = await this.videoModel.findByPk(id);
    if (!video) {
      throw new Error(`Video with id ${id} not found`);
    }
    return video; // Returns the video found by id
  }

  // Update a video by id
  async update(id: number, updateVideoDto: UpdateVideoDto) {
    const video = await this.videoModel.findByPk(id);
    if (!video) {
      throw new Error(`Video with id ${id} not found`);
    }

    // Update video with the provided data
    await video.update(updateVideoDto);
    return video; // Returns the updated video entity
  }

  // Remove a video by id
  async remove(id: number) {
    const video = await this.videoModel.findByPk(id);
    if (!video) {
      throw new Error(`Video with id ${id} not found`);
    }

    await video.destroy(); // Deletes the video from the database
    return { message: `Video with id ${id} removed successfully` }; // Returns success message
  }
}
