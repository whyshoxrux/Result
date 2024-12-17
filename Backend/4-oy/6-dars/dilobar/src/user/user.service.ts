import { Injectable } from '@nestjs/common';

@Injectable()
export class UserService {
  getHello(): string {
    return 'Hello World!';
  }

  getGoodbye(): string {
    return 'Goodbye!';
  }

  getShoxrux(): string{
    return 'Shettaman'
  }

  getDomla(): string{
    return "Shoxrux 100 ball qo'ysa arziydigan qilib vazifa bajaripdi👍" 
  }

  updateVazifa(): string{
    return "Domla: Vazifa eng zo'ri Shoxruxniki ekan gap yoq!"
  }

  deleteVazifa(): string{
    return "100 ball qo'ysa arziydi😍"
  }

  updateHomework(): string{
    return "Vazifa yangilandi"
  }
}
