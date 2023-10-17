import {
  IsInt,
  IsPositive,
  IsString,
  MaxLength,
  Min,
  MinLength,
} from 'class-validator';

export class CreatePokemonDto {
  @IsString()
  @MinLength(5, {
    message:
      'Title is too short. Minimal length is $constraint1 characters, but actual is $value',
  })
  @MaxLength(20)
  name: string;

  @IsInt()
  @IsPositive()
  @Min(1)
  no: number;
}
