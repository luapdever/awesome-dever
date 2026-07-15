import { Module } from "@nestjs/common";
import { PaulbotController } from "./paulbot.controller";
import { PaulbotService } from "./paulbot.service";

@Module({
  controllers: [PaulbotController],
  providers: [PaulbotService],
})
export class PaulbotModule {}
