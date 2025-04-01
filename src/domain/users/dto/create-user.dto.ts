import { IsEmail, IsPhoneNumber, Length, Matches } from 'class-validator';
import { IsPassword } from 'common/decorators/validators/is-password.decorator';

export class CreateUserDto {
  @Length(2, 50)
  readonly name: string;

  @IsEmail()
  readonly email: string;

  @IsPhoneNumber('DE')
  readonly phone: string;

  @IsPassword()
  readonly password: string;
}
