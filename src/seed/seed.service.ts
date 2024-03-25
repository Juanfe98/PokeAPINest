import { Injectable } from '@nestjs/common';
import { PokeResponse } from './interface/poke-response.interface';
import { InjectModel } from '@nestjs/mongoose';
import { Pokemon } from 'src/pokemon/entities/pokemon.entity';
import { Model } from 'mongoose';
import { AxiosAdapter } from 'src/common/adapters/axios.adapter';

@Injectable()
export class SeedService {
  constructor(
    @InjectModel(Pokemon.name)
    private pokemonModel: Model<Pokemon>,
    private readonly http: AxiosAdapter,
  ) {}
  /**
   * Axios will give us an axiosInstance, and aven though this code might not be
   * needed, it is better to be declarative when coding.
   * If we don't do this, we will use the axiosInstance and everything will still
   * work, this way to stablish that we have a dependency for axios.
   **/
  // private axios: AxiosInstance = axios;

  async populateDatabase() {
    await this.pokemonModel.deleteMany();
    const data = await this.http.get<PokeResponse>(
      'https://pokeapi.co/api/v2/pokemon?limit=10',
    );

    const pokemonsList = data.results.map(({ name, url }) => {
      const pokemonId = +url.split('/').filter(Boolean).pop();
      const newPokemon = {
        name,
        no: pokemonId,
      };
      return newPokemon;
    });
    await this.pokemonModel.insertMany(pokemonsList);
    return 'Seed loaded correctly';
  }
}
