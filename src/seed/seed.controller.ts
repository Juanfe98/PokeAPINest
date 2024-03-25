import { Controller, Get, ServiceUnavailableException } from '@nestjs/common';
import { SeedService } from './seed.service';

@Controller('seed')
export class SeedController {
  constructor(private readonly seedService: SeedService) {}

  @Get()
  async populateDatabase() {
    try {
      return await this.seedService.populateDatabase();
    } catch (error) {
      throw new ServiceUnavailableException(error);
    }
  }
}
