import { Test, TestingModule } from '@nestjs/testing';
import { AlbumsService } from './albums.service';
import { getModelToken } from '@nestjs/sequelize';
import { Album } from './album.model';
import exp from 'constants';

const mockAlbumModel = {
  findByPk: jest.fn(),
  findOne: jest.fn(),
  findAll: jest.fn(),
  create: jest.fn(),
  destroy: jest.fn(),
  update: jest.fn(),
};

describe('AlbumsService', () => {
  let albumsService: AlbumsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AlbumsService,
        {
          provide: getModelToken(Album),
          useValue: mockAlbumModel,
        },
      ],
    }).compile();

    albumsService = module.get<AlbumsService>(AlbumsService);
  });

  it('create album', async () => {
    const newAlbum = {
      id: 1,
      title: 'Starboy',
      releaseDate: new Date('July 21, 1983 01:15:00'),
      artist_id: 1,
    };
    const createdAlbum = { ...newAlbum, id: 1 };

    mockAlbumModel.create.mockResolvedValue(createdAlbum);

    const result = await albumsService.createAlbum(newAlbum);

    expect(mockAlbumModel.create).toHaveBeenCalledWith(newAlbum);
    expect(result).toEqual(createdAlbum);
  });

  it('getUser', async () => {
    const album = { id: 1, title: 'Starboy' };

    mockAlbumModel.findOne.mockResolvedValue(album);

    const result = await albumsService.getAlbumById(1);

    expect(mockAlbumModel.findOne).toHaveBeenCalledWith({ where: { id: 1 } });
    expect(result).toEqual(album);
  });

  it('delete album', async () => {
    const album = { id: 1, title: 'Starboy' };

    mockAlbumModel.destroy.mockResolvedValue(album);
    const result = await albumsService.deleteAlbum(1);
    console.log('result', result);
    expect(mockAlbumModel.destroy).toHaveBeenCalledWith({ where: { id: 1 } });
    expect(result).toEqual(album);
  });

  it('update album', async () => {
    const id = 2;
    const albumAfter = { title: 'After Hours' };
    const albumBefore = {
      title: 'Starboy',
      update: jest.fn().mockResolvedValue({ ...albumAfter, id }),
    };

    mockAlbumModel.findByPk.mockResolvedValue({ ...albumBefore, id });
    const result = await albumsService.updateAlbum(id, albumAfter);

    expect(mockAlbumModel.findByPk).toHaveBeenCalledWith(id);

    expect(albumBefore.update).toHaveBeenCalledWith(albumAfter);

    expect(result).toEqual({ ...albumAfter, id });
  });
});
