import { Body, Controller, Get, Param, Post } from '@nestjs/common';

@Controller({
  path: "user",
  version: "1",
})
export class UserControllerV1 {
  @Get('')
  getUser() {
    return `get User v1`;
  }
}


@Controller({
  path: "user",
  version: "2",
})
export class UserControllerV2 {
  @Get('')
  getUser() {
    return `get User v2`;
  }
}
