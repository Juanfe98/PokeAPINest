# Nest Notes - Learning Notes.

## Saving in the database (Creating a Pokemon).

The most common ways to save the data using mongodb are the next two, each one with benefits and special use cases. 

### Async/Await with .create() (First Approach):

This approach uses the await keyword and .create() to create and return a new Pokemon object asynchronously. 
This is a common approach when working with database operations, especially if you want to handle errors gracefully.

```typescript
async create(createPokemonDto: CreatePokemonDto) {
    createPokemonDto = {
    ...createPokemonDto,
    name: createPokemonDto.name.toLocaleLowerCase()
    };
    const createdPokemon = await this.pokemonModel.create(createPokemonDto);
    return createdPokemon;
};
```

### Creating an Instance with .save() (Second Approach):

The second approach creates an instance of the Pokemon model using new, and then calls .save() on that instance. 
This approach is synchronous and doesn't involve async/await. It can be more straightforward for some developers but 
might not handle errors as gracefully as the first approach.

```typescript
create(createPokemonDto: CreatePokemonDto) {
    createPokemonDto = {
        ...createPokemonDto,
        name: createPokemonDto.name.toLocaleLowerCase()
    };
    const createdPokemon = new this.pokemonModel(createPokemonDto);
    return createdPokemon.save();
}
```

In terms of "better," it depends on your project requirements and coding style. The first approach is often preferred for
its error-handling capabilities and compatibility with asynchronous code. However, if you have a simple use case and prefer
a more synchronous style, the second approach can be suitable.

### Get By (Find One)

With this approach we will be creating on single endpoint but allowing the user to search the pokemon by multiple fields.
(name, mongoId, no).

```typescript
async findOne(searchTerm: string) {
    let pokemon = undefined;
    // The user is looking by the 'no' column
    if(!isNaN(+searchTerm)){
        pokemon = await this.pokemonModel.findOne({'no': searchTerm});
    }

    // The request is sending the mongoId to get the pokemon.
    if( !pokemon && isValidObjectId(searchTerm)){
        pokemon = await this.pokemonModel.findById(searchTerm);
    }

    // If none of above works, we look by the pokemon name.
    if(!pokemon){
        pokemon = await this.pokemonModel.findOne({'name': searchTerm.toLocaleLowerCase().trim()});
    }

    if(!pokemon){
        throw new NotFoundException('Pokemon does not exist or the search criteria is not supported');
    }

    return pokemon;
}
```
