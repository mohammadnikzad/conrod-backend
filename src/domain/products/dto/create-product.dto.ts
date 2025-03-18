import { Type } from 'class-transformer';
import {
  ArrayNotEmpty,
  IsNumber,
  IsOptional,
  IsPositive,
  Length,
  ValidateNested,
} from 'class-validator';
import { IsCardinal } from 'common/decorators/validators/is-cardinal.decorator';
import { IsCurrency } from 'common/decorators/validators/is-currency.decorator';
import { IsEntity } from 'common/decorators/validators/is-entity.decorator';
import { IdDto } from 'common/dto/id.dto';

export class CreateProductDto {
  @Length(2, 50)
  readonly name: string;

  @IsOptional()
  @Length(1, 500)
  readonly description: string;

  @IsCurrency()
  readonly price: number;

  @ArrayNotEmpty()
  @IsEntity()
  readonly categories: IdDto[];
}
