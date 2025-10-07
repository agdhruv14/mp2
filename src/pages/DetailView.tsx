import React, {useEffect, useState} from 'react';
import {useParams, useNavigate} from 'react-router-dom';
import {getPokemonByName, searchPokemon} from '../api';

export default function DetailView() {

  const {name} = useParams<{name:string}>();
  const [p,setP]=useState<any>(null);
  const [list,setList]=useState<string[]>([]);
  const nav = useNavigate();
  useEffect(()=>{searchPokemon('').then(r=>setList(r.map(i=>i.name)))},[]);
  useEffect(()=>{if(!name) return; getPokemonByName(name).then(setP)},[name]);

  if(!p) return <div>Loading</div>;

  const idx = list.indexOf(p.name);

  const prev = idx>0? list[idx-1]:null;

  const next = idx>=0 && idx<list.length-1? list[idx+1]:null;

  return (
    <div>
      <h2>{p.name}</h2>
      <img src={p.sprites.front_default||''} alt={p.name} />
      <div>Height: {p.height}</div>
      <div>Weight: {p.weight}</div>
      <div>Types: {p.types.map((t:any)=>t.type.name).join(', ')}</div>
  <button disabled={!prev} onClick={()=>nav(`../detail/${prev}`)}>Previous</button>
  <button disabled={!next} onClick={()=>nav(`../detail/${next}`)}>Next</button>
    </div>
  );
}
