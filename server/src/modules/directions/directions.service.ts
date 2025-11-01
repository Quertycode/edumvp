import { Injectable } from '@nestjs/common'
import { PrismaService } from '../../common/services/prisma.service'

@Injectable()
export class DirectionsService {
  constructor(private prisma: PrismaService) {}

  async findAll() {
    return this.prisma.direction.findMany({
      orderBy: { name: 'asc' },
    })
  }

  async findOne(id: string) {
    return this.prisma.direction.findUnique({
      where: { id },
    })
  }

  async findByExamType(examType: 'OGE' | 'EGE') {
    return this.prisma.direction.findMany({
      where: { examType },
      orderBy: { name: 'asc' },
    })
  }
}


