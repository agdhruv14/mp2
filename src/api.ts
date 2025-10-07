import axios from 'axios';
const api = axios.create({baseURL: 'https://pokeapi.co/api/v2'});

export type PokemonSummary = {name: string; url: string};
export type PokemonSummaryWithId = PokemonSummary & {id: number};

export type Pokemon = {id: number; name: string; sprites: {front_default: string | null}; height: number; weight: number; types: {type:{name:string}}[]};

export async function searchPokemon(query: string, limit = 200): Promise<PokemonSummary[]> {
  const res = await api.get(`/pokemon?limit=${limit}`);
  const results: PokemonSummary[] = res.data.results;
  if (!query) return results;
  return results.filter(p=>p.name.includes(query.toLowerCase()));
}

export async function getPokemon(url: string): Promise<Pokemon> {
  const res = await axios.get(url);
  return res.data;
}

export async function getPokemonByName(name: string): Promise<Pokemon> {
  const res = await api.get(`/pokemon/${name}`);
  return res.data;
}
