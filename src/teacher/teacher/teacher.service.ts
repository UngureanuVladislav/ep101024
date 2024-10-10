import { Injectable, NotFoundException } from '@nestjs/common';
import { Teacher } from './teacher.entity';

@Injectable()
export class TeacherService {
  private teachers: Teacher[] = [];
  private idCounter = 1;

  create(name: string, school: string, experience: number): Teacher {
    const newTeacher = new Teacher(this.idCounter++, name, school, experience);
    this.teachers.push(newTeacher);
    return newTeacher;
  }

  findOne(id: number): Teacher {
    const teacher = this.teachers.find(t => t.id === id);
    if (!teacher) throw new NotFoundException('Teacher not found');
    return teacher;
  }

  findAll(): Teacher[] {
    return this.teachers;
  }

  update(id: number, name: string, school: string, experience: number): Teacher {
    const index = this.teachers.findIndex(t => t.id === id);
    if (index === -1) throw new NotFoundException('Teacher not found');

    const updatedTeacher = new Teacher(id, name, school, experience);
    this.teachers[index] = updatedTeacher;
    return updatedTeacher;
  }

  delete(id: number): void {
    const index = this.teachers.findIndex(t => t.id === id);
    if (index === -1) throw new NotFoundException('Teacher not found');

    this.teachers.splice(index, 1);
  }
}
