import { Module } from '@nestjs/common';
import generateModuleSet from './utils/module-set';

@Module({
  imports: generateModuleSet()
})

export class AppModule {}
