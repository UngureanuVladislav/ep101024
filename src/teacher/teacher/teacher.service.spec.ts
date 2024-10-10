import { Test, TestingModule } from '@nestjs/testing';
import { TeacherService } from './teacher.service';
import { Teacher } from './teacher.entity';

describe('TeacherService', () => {
  let service: TeacherService;

  // Массив учителей для тестирования
  const mockTeachers: Teacher[] = [
    new Teacher(1, 'John Doe', 'School A', 5),
    new Teacher(2, 'Jane Smith', 'School B', 10),
  ];

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TeacherService],
    }).compile();

    service = module.get<TeacherService>(TeacherService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create a teacher', () => {
    const newTeacher = { name: 'Alice', school: 'School C', experience: 3 };
    const createdTeacher = service.create(newTeacher.name, newTeacher.school, newTeacher.experience);
    
    expect(createdTeacher).toBeDefined();
    expect(createdTeacher.name).toBe(newTeacher.name);
  });

  it('should find a teacher by ID', () => {
    service.create('Alice', 'School C', 3); 
    const foundTeacher = service.findOne(1); 
    expect(foundTeacher).toBeDefined();
    expect(foundTeacher.id).toBe(1);
  });

  it('should return a list of teachers', () => {
    mockTeachers.forEach((teacher) => {
      service.create(teacher.name, teacher.school, teacher.experience);
    });
    
    const teachers = service.findAll();
    expect(teachers).toHaveLength(mockTeachers.length);
  });

  it('should update a teacher', () => {
    service.create('Alice', 'School C', 3); 
    const updatedTeacher = service.update(1, 'Alice', 'School C', 4); 
    expect(updatedTeacher.experience).toBe(4);
  });

  it('should delete a teacher', () => {
    service.create('Alice', 'School C', 3); 
    service.delete(1);
    const foundTeacher = service.findOne(1);
    expect(foundTeacher).toBeUndefined(); 
  });
});
