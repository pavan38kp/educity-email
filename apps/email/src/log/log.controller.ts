import * as common from "@nestjs/common";
import * as swagger from "@nestjs/swagger";
import { LogService } from "./log.service";
import { LogControllerBase } from "./base/log.controller.base";

@swagger.ApiTags("logs")
@common.Controller("logs")
export class LogController extends LogControllerBase {
  constructor(protected readonly service: LogService) {
    super(service);
  }

  @common.Post('send-email')
  async sendEmail(
    @common.Body() payload: { to: string; body: string; subject: string }
  ) {
    return this.service.mail(payload.to, payload.body, payload.subject);
  }

}
