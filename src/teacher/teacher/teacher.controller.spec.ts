import { Test, TestingModule } from '@nestjs/testing';
import { TeacherController } from './teacher.controller';
import { TeacherService } from './teacher.service';
import { Teacher } from './teacher.entity';

describe('TeacherController', () => {
  let teacherController: TeacherController;
  let teacherService: TeacherService;

  const mockTeacherService = {
    create: jest.fn((name: string, school: string, experience: number) => {
      return { id: 1, name, school, experience }; 
    }),
    findOne: jest.fn((id: number) => {
      return { id, name: 'John Doe', school: 'Some School', experience: 5 }; 
    }),
    findAll: jest.fn(() => {
      return [{ id: 1, name: 'John Doe', school: 'Some School', experience: 5 }]; 
    }),
    update: jest.fn((id: number, name: string, school: string, experience: number) => {
      return { id, name, school, experience }; 
    }),
    delete: jest.fn((id: number) => {
      return; 
    }),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TeacherController],
      providers: [
        {
          provide: TeacherService,
          useValue: mockTeacherService,
        },
      ],
    }).compile();

    teacherController = module.get<TeacherController>(TeacherController);
    teacherService = module.get<TeacherService>(TeacherService);
  });

  describe('create', () => {
    it('should create a teacher', () => {
      const teacherDto = { name: 'John Doe', school: 'Some School', experience: 5 };
      expect(teacherController.create(teacherDto)).toEqual({
        id: 1,
        ...teacherDto,
      });
      expect(teacherService.create).toHaveBeenCalledWith('John Doe', 'Some School', 5);
    });
  });

  describe('findOne', () => {
    it('should return a teacher by ID', () => {
      expect(teacherController.findOne('1')).toEqual({
        id: 1,
        name: 'John Doe',
        school: 'Some School',
        experience: 5,
      });
      expect(teacherService.findOne).toHaveBeenCalledWith(1);
    });
  });

  describe('findAll', () => {
    it('should return all teachers', () => {
      expect(teacherController.findAll()).toEqual([
        { id: 1, name: 'John Doe', school: 'Some School', experience: 5 },
      ]);
      expect(teacherService.findAll).toHaveBeenCalled();
    });
  });

  describe('update', () => {
    it('should update a teacher', () => {
      const teacherDto = { name: 'Jane Doe', school: 'Another School', experience: 10 };
      expect(teacherController.update('1', teacherDto)).toEqual({
        id: 1,
        ...teacherDto,
      });
      expect(teacherService.update).toHaveBeenCalledWith(1, 'Jane Doe', 'Another School', 10);
    });
  });

  describe('delete', () => {
    it('should delete a teacher', () => {
      expect(teacherController.delete('1')).toBeUndefined();
      expect(teacherService.delete).toHaveBeenCalledWith(1);
    });
  });
});
