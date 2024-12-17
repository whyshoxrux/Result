import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { EnrollmentModule } from './tables/enrollment/enrollment.module';
import { StaffCourseModule } from './tables/staff_course/staff_course.module';
import { CourseModule } from './tables/course/course.module';
import { StudentModule } from './tables/student/student.module';
import { GroupsModule } from './tables/groups/groups.module';
import { HomeworkModule } from './tables/homework/homework.module';
import { LessonsOfCoursesModule } from './tables/lessons_of_courses/lessons_of_courses.module';
import { PaymentsModule } from './tables/payments/payments.module';
import { SharingModule } from './common/sharingModule';
import { Courses } from './tables/course/course.model';
import { Enrollment } from './tables/enrollment/enrollment.model';
import { StaffCourse } from './tables/staff_course/staff_course_model';
import { Student } from './tables/student/student.model';
import { Groups } from './tables/groups/group.model';
import { Homework } from './tables/homework/homework.model';
import { LessonsOfCourses } from './tables/lessons_of_courses/model';
import { Payments } from './tables/payments/payment.model';
import { Staff } from './tables/staff/staff.model';
import { StaffModule } from './tables/staff/staff.module';
import { VideosModule } from './tables/videos/videos.module';
import { Video } from './tables/videos/videos.model';
import { join } from 'path';
import { ServeStaticModule } from '@nestjs/serve-static';


@Module({
  imports: [
    SequelizeModule.forRoot({
      dialect: 'postgres',
      host: 'localhost',
      port: 5432,
      database: 'postgres',
      username: 'postgres',
      password: '123456',
      autoLoadModels: true,
      synchronize: true,
      models: [
        Courses,
        Staff,
        Enrollment,
        StaffCourse,
        Student,
        Groups,
        Homework,
        LessonsOfCourses,
        Payments,
        Video,
      ],
    }),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '../', 'uploads'),
      serveRoot: '/static',
    }),
    StaffModule,
    SharingModule,
    EnrollmentModule,
    StaffCourseModule,
    CourseModule,
    StudentModule,
    GroupsModule,
    HomeworkModule,
    LessonsOfCoursesModule,
    PaymentsModule,
    VideosModule,
  ],
})
export class AppModule {}
