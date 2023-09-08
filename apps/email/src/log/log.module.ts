import { Module } from "@nestjs/common";
import { LogModuleBase } from "./base/log.module.base";
import { LogService } from "./log.service";
import { LogController } from "./log.controller";

@Module({
  imports: [LogModuleBase],
  controllers: [LogController],
  providers: [LogService],
  exports: [LogService],
})
export class LogModule {}
