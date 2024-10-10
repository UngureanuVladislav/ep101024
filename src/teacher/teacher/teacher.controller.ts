import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { TeacherService } from './teacher.service';
import { Teacher } from './teacher.entity';
import { ApiTags, ApiResponse } from '@nestjs/swagger';

@ApiTags('teachers')
@Controller('teachers')
export class TeacherController {
  constructor(private readonly teacherService: TeacherService) {}

  @Post()
  @ApiResponse({ status: 201, description: 'The teacher has been created.' })
  create(@Body() body: { name: string; school: string; experience: number }): Teacher {
    return this.teacherService.create(body.name, body.school, body.experience);
  }

  @Get(':id')
  @ApiResponse({ status: 200, description: 'The teacher found by ID.' })
  findOne(@Param('id') id: string): Teacher {
    return this.teacherService.findOne(Number(id));
  }

  @Get()
  @ApiResponse({ status: 200, description: 'List of all teachers.' })
  findAll(): Teacher[] {
    return this.teacherService.findAll();
  }

  @Put(':id')
  @ApiResponse({ status: 200, description: 'The teacher has been updated.' })
  update(@Param('id') id: string, @Body() body: { name: string; school: string; experience: number }): Teacher {
    return this.teacherService.update(Number(id), body.name, body.school, body.experience);
  }

  @Delete(':id')
  @ApiResponse({ status: 204, description: 'The teacher has been deleted.' })
  delete(@Param('id') id: string): void {
    return this.teacherService.delete(Number(id));
  }
}
