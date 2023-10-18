import { Model } from 'mongoose';
import {BadRequestException, Injectable, InternalServerErrorException} from '@nestjs/common';
import { InjectModel } from "@nestjs/mongoose";
import { CreatePokemonDto } from './dto/create-pokemon.dto';
import { UpdatePokemonDto } from './dto/update-pokemon.dto';
import {Pokemon} from "./entities/pokemon.entity";

@Injectable()
export class PokemonService {
  constructor(
      @InjectModel(Pokemon.name)
      private pokemonModel: Model<Pokemon>,
  ) {}
  async create(createPokemonDto: CreatePokemonDto) {
    createPokemonDto = {
      ...createPokemonDto,
      name: createPokemonDto.name.toLocaleLowerCase()
    };
    try {
      const createdPokemon = await this.pokemonModel.create(createPokemonDto);
      return createdPokemon;
    }catch (e) {
        if(e.code === 11000){
          throw new BadRequestException(`Pokemon ${JSON.stringify(e["keyValue"])} already exist`)
        }
        throw new InternalServerErrorException(`Can't create the pokemon, check server logs.`);
    }
  }

  findAll() {
    return `This action returns all pokemon`;
  }

  findOne(id: number) {
    return `This action returns a #${id} pokemon`;
  }

  update(id: number, updatePokemonDto: UpdatePokemonDto) {
    return `This action updates a #${id} pokemon`;
  }

  remove(id: number) {
    return `This action removes a #${id} pokemon`;
  }
}
