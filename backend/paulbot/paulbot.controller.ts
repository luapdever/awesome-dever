import { Body, Controller, Post, Res } from "@nestjs/common";
import type { Response } from "express";
import { PaulbotService, ChatBody } from "./paulbot.service";

@Controller("paulbot")
export class PaulbotController {
  constructor(private readonly bot: PaulbotService) {}

  // POST /paulbot/chat  → réponse en streaming (text/plain, token par token)
  @Post("chat")
  async chat(@Body() body: ChatBody, @Res() res: Response): Promise<void> {
    await this.bot.stream(body, res);
  }
}
