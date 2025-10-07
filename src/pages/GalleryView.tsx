import React, {useEffect, useState} from 'react';
import {searchPokemon, getPokemon} from '../api';
import {Link} from 'react-router-dom';

export default function GalleryView(){

  const [items,setItems]=useState<any[]>([]);
  const [typesFilter,setTypesFilter]=useState<string[]>([]);

  useEffect(()=>{searchPokemon('').then(async list=>{const slice=list.slice(0,50); const promise = await Promise.all(slice.map(s=>getPokemon(s.url))); setItems(promise)})},[]);

  const types = Array.from(new Set(items.flatMap(i=>i.types.map((t:any)=>t.type.name))));

  const shown = items.filter(i=> typesFilter.length===0 || i.types.some((t:any)=>typesFilter.includes(t.type.name)));
  return (
    <div>
      <h2>Gallery</h2>
      <div>
        {types.map(t=>(<label key={t}><input type="checkbox" checked={typesFilter.includes(t)} onChange={()=>setTypesFilter(f=>f.includes(t)?f.filter(x=>x!==t):[...f,t])} />{t}</label>))}
      </div>
      <div style={{display:'flex',flexWrap:'wrap'}}>
        {shown.map((p:any)=>(
          <div key={p.name} style={{width:120,margin:8}}>
            <Link to={`detail/${p.name}`}><img src={p.sprites.front_default||''} alt={p.name} style={{width:100}} /></Link>
            <div>{p.name}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
