import { isValidObjectId, Model } from 'mongoose';
import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { CreatePokemonDto } from './dto/create-pokemon.dto';
import { UpdatePokemonDto } from './dto/update-pokemon.dto';
import { Pokemon } from './entities/pokemon.entity';

@Injectable()
export class PokemonService {
  constructor(
    @InjectModel(Pokemon.name)
    private pokemonModel: Model<Pokemon>,
  ) {}

  async create(createPokemonDto: CreatePokemonDto) {
    createPokemonDto = {
      ...createPokemonDto,
      name: createPokemonDto.name.toLocaleLowerCase(),
    };
    try {
      const createdPokemon = await this.pokemonModel.create(createPokemonDto);
      return createdPokemon;
    } catch (e) {
      if (e.code === 11000) {
        throw new BadRequestException(
          `Pokemon ${JSON.stringify(e['keyValue'])} already exist`,
        );
      }
      throw new InternalServerErrorException(
        `Can't create the pokemon, check server logs.`,
      );
    }
  }

  findAll() {
    return `This action returns all pokemon`;
  }

  async findOne(searchTerm: string) {
    let pokemon = undefined;
    // The user is looking by the 'no' column
    if (!isNaN(+searchTerm)) {
      pokemon = await this.pokemonModel.findOne({ no: searchTerm });
    }

    // The request is sending the mongoId to get the pokemon.
    if (!pokemon && isValidObjectId(searchTerm)) {
      pokemon = await this.pokemonModel.findById(searchTerm);
    }

    // If none of above works, we look by the pokemon name.
    if (!pokemon) {
      pokemon = await this.pokemonModel.findOne({
        name: searchTerm.toLocaleLowerCase().trim(),
      });
    }

    if (!pokemon) {
      throw new NotFoundException(
        'Pokemon does not exist or the search criteria is not supported',
      );
    }
    return pokemon;
  }

  async update(searchTerm: string, updatePokemonDto: UpdatePokemonDto) {
    let pokemonToUpdate = await this.findOne(searchTerm);

    pokemonToUpdate = Object.assign(pokemonToUpdate, updatePokemonDto);
    try {
      const updatedPokemon = await pokemonToUpdate.save();
      return updatedPokemon;
    } catch (e) {
      if (e.code === 11000) {
        throw new BadRequestException(
          `Pokemon ${JSON.stringify(e['keyValue'])} already exist`,
        );
      }
      throw new InternalServerErrorException(
        `Unable to update the Pokémon, check server logs.`,
      );
    }
  }

  remove(id: number) {
    return `This action removes a #${id} pokemon`;
  }
}
