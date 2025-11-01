import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { AuthModule } from './modules/auth/auth.module'
import { UsersModule } from './modules/users/users.module'
import { CoursesModule } from './modules/courses/courses.module'
import { DirectionsModule } from './modules/directions/directions.module'

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    AuthModule,
    UsersModule,
    CoursesModule,
    DirectionsModule,
  ],
})
export class AppModule {}

