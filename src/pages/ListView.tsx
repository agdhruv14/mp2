import React, {useEffect, useState} from 'react';
import {searchPokemon, PokemonSummaryWithId, PokemonSummary} from '../api';
import {Link} from 'react-router-dom';

export default function ListView() {
    
  const [items, setItems] = useState<PokemonSummaryWithId[]>([]);
  const [q, setQ] = useState('');
  const [sortField, setSortField] = useState<'name' | 'id'>('name');
  const [dir, setDir] = useState<'asc' | 'desc'>('asc');

  useEffect(() => {
    searchPokemon('').then((res: PokemonSummary[]) => {
      const mapped = res.map((r) => {
        const parts = r.url.split('/').filter(Boolean);
        const id = Number(parts[parts.length - 1]) || 0;
        return { ...r, id } as PokemonSummaryWithId;
      });
      setItems(mapped);
    });
  }, []);

  const filtered = items.filter((it) => it.name.includes(q.toLowerCase()));

  const sorted = filtered.slice().sort((a, b) => {
    if (sortField === 'name') {
      return dir === 'asc'
        ? a.name.localeCompare(b.name)
        : b.name.localeCompare(a.name);
    }
    return dir === 'asc' ? a.id - b.id : b.id - a.id;
  });

  return (
    <div style={{ padding: 16 }}>
      <h2>Pokemon List</h2>
      <div style={{ display: 'flex', gap: 8, alignItems: 'center', marginBottom: 12 }}>
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="search"
          style={{ padding: 6 }}
        />
        <select
          value={sortField}
          onChange={(e) => setSortField(e.target.value as any)}
          style={{ padding: 6 }}
        >
          <option value="name">Name</option>
          <option value="id">ID</option>
        </select>
        <button onClick={() => setDir((d) => (d === 'asc' ? 'desc' : 'asc'))} style={{ padding: 6 }}>
          {dir === 'asc' ? 'Asc' : 'Desc'}
        </button>
      </div>

      <ul style={{ listStyle: 'none', padding: 0 }}>
        {sorted.map((p) => (
          <li key={p.name} style={{ padding: '6px 0' }}>
            <Link to={`/detail/${p.name}`}>{`${p.id} — ${p.name}`}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
