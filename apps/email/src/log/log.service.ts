import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { LogServiceBase } from "./base/log.service.base";
import {SES} from "aws-sdk"


@Injectable()
export class LogService extends LogServiceBase {
  constructor(protected readonly prisma: PrismaService) {
    super(prisma);
  }

  async mail(to: string, body: string, subject: string) {
    const ses = new SES({
      region: process.env.AWS_DEFAULT_REGION as string,
      credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID as string,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY as string
      },
      apiVersion: '2010-12-01'
    })

    const params = {
      Destination: { 
        ToAddresses: [
          to
        ]
      },
      Source: process.env.AWS_SES_SOURCE as string,
      Message: { 
        Body: { 
          Text: {
            Charset: "UTF-8",
            Data: body
          }
        },
        Subject: {
          Charset: 'UTF-8',
          Data: subject
        }
      },
    };

    return ses.sendEmail(params).promise();
    
  }
}
