import { useState, useRef, useEffect, useMemo } from 'react';
import { bloques } from '@/data/dsmData';
import { Search, X } from 'lucide-react';

interface SearchResult {
  normaName: string;
  tipo: string;
  estadoES: string;
  bloqueId: number;
  bloqueNombre: string;
}

interface Props {
  query: string;
  onChange: (q: string) => void;
  onSelect: (bloqueId: number) => void;
}

export const GlobalSearch = ({ query, onChange, onSelect }: Props) => {
  const [open, setOpen] = useState(false);
  const [focused, setFocused] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const results = useMemo<SearchResult[]>(() => {
    if (!query.trim()) return [];
    const q = query.toLowerCase().trim();
    const out: SearchResult[] = [];
    bloques.forEach(b => {
      b.normas.forEach(n => {
        if (
          n.nombre.toLowerCase().includes(q) ||
          n.tipo.toLowerCase().includes(q) ||
          b.nombre.toLowerCase().includes(q) ||
          `b${b.id}`.includes(q) ||
          n.transposicionES.toLowerCase().includes(q)
        ) {
          out.push({
            normaName: n.nombre,
            tipo: n.tipo,
            estadoES: n.estadoES,
            bloqueId: b.id,
            bloqueNombre: b.nombre,
          });
        }
      });
    });
    return out.slice(0, 12);
  }, [query]);

  // Close dropdown on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setFocused(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  // Keyboard shortcut: Ctrl+K or Cmd+K
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setOpen(prev => !prev);
        setTimeout(() => inputRef.current?.focus(), 50);
      }
      if (e.key === 'Escape') {
        setFocused(false);
        setOpen(false);
        onChange('');
      }
    };
    document.addEventListener('keydown', handler);
    return () => document.removeEventListener('keydown', handler);
  }, [onChange]);

  const estadoColor = (estado: string) => {
    switch (estado) {
      case 'directa': return 'var(--status-directa)';
      case 'transpuesta': return 'var(--status-transpuesta)';
      case 'parcial': return 'var(--status-parcial)';
      case 'pendiente': return 'var(--status-pendiente)';
      default: return 'var(--status-propuesta)';
    }
  };

  const showDropdown = focused && query.trim().length > 0;

  return (
    <div ref={containerRef} className="relative">
      {/* Collapsed: icon button */}
      {!open && (
        <button
          onClick={() => { setOpen(true); setTimeout(() => inputRef.current?.focus(), 50); }}
          className="flex items-center gap-1.5 px-3 py-2 text-xs font-medium"
          style={{
            color: 'var(--g-text-secondary)',
            borderRadius: 'var(--g-radius-md)',
            transition: 'color 150ms ease',
          }}
          title="Buscar normas (⌘K)"
        >
          <Search size={15} strokeWidth={2} />
          <span className="hidden sm:inline">Buscar</span>
          <kbd className="hidden sm:inline-flex items-center gap-0.5 px-1.5 py-0.5 text-[9px] font-mono" style={{
            background: 'var(--g-surface-page)',
            borderRadius: '4px',
            border: '1px solid var(--g-border-subtle)',
            color: 'var(--g-text-secondary)',
          }}>⌘K</kbd>
        </button>
      )}

      {/* Expanded: search input */}
      {open && (
        <div className="flex items-center gap-2" style={{ minWidth: '220px' }}>
          <div
            className="flex items-center gap-2 flex-1 px-3 py-1.5"
            style={{
              background: 'var(--g-surface-page)',
              borderRadius: 'var(--g-radius-md)',
              border: `1.5px solid ${focused ? 'var(--g-brand-3308)' : 'var(--g-border-subtle)'}`,
              transition: 'border-color 200ms ease',
            }}
          >
            <Search size={14} strokeWidth={2} style={{ color: 'var(--g-text-secondary)', flexShrink: 0 }} />
            <input
              ref={inputRef}
              value={query}
              onChange={e => onChange(e.target.value)}
              onFocus={() => setFocused(true)}
              placeholder="Buscar norma, tipo o bloque…"
              className="flex-1 bg-transparent outline-none text-xs placeholder:text-[var(--g-text-secondary)]"
              style={{ color: 'var(--g-text-primary)', minWidth: 0 }}
            />
            {query && (
              <button onClick={() => onChange('')} className="shrink-0" style={{ color: 'var(--g-text-secondary)' }}>
                <X size={13} />
              </button>
            )}
          </div>
          <button
            onClick={() => { setOpen(false); onChange(''); setFocused(false); }}
            className="text-[10px] font-medium shrink-0"
            style={{ color: 'var(--g-text-secondary)' }}
          >
            Cerrar
          </button>
        </div>
      )}

      {/* Dropdown results */}
      {open && showDropdown && (
        <div
          className="absolute right-0 top-full mt-2 w-[340px] sm:w-[400px] max-h-[360px] overflow-y-auto z-50"
          style={{
            background: 'var(--g-surface-card)',
            borderRadius: 'var(--g-radius-lg)',
            boxShadow: 'var(--g-shadow-dropdown)',
            border: '1px solid var(--g-border-subtle)',
          }}
        >
          {results.length === 0 ? (
            <div className="px-4 py-6 text-center text-xs text-[var(--g-text-secondary)]">
              Sin resultados para "<span className="font-medium">{query}</span>"
            </div>
          ) : (
            <>
              <div className="px-3 py-2 text-[10px] font-semibold uppercase tracking-wider" style={{ color: 'var(--g-text-secondary)', borderBottom: '1px solid var(--g-border-subtle)' }}>
                {results.length} resultado{results.length !== 1 ? 's' : ''}
              </div>
              {results.map((r, i) => (
                <button
                  key={i}
                  className="w-full text-left px-3 py-2.5 flex items-start gap-3 group"
                  style={{
                    borderBottom: i < results.length - 1 ? '1px solid var(--g-border-subtle)' : 'none',
                    transition: 'background 100ms ease',
                  }}
                  onMouseEnter={e => (e.currentTarget.style.background = 'var(--g-surface-page)')}
                  onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}
                  onClick={() => {
                    onSelect(r.bloqueId);
                    setFocused(false);
                  }}
                >
                  <span className="w-2 h-2 rounded-full mt-1.5 shrink-0" style={{ background: estadoColor(r.estadoES) }} />
                  <div className="min-w-0 flex-1">
                    <div className="text-xs font-medium text-[var(--g-text-primary)] leading-tight truncate">{r.normaName}</div>
                    <div className="flex items-center gap-2 mt-0.5">
                      <span className="text-[10px] text-[var(--g-text-secondary)]">B{r.bloqueId} · {r.bloqueNombre}</span>
                    </div>
                  </div>
                  <span
                    className="text-[9px] font-medium px-1.5 py-0.5 shrink-0 mt-0.5"
                    style={{
                      background: 'var(--g-surface-page)',
                      borderRadius: 'var(--g-radius-full)',
                      color: 'var(--g-text-secondary)',
                      border: '1px solid var(--g-border-subtle)',
                    }}
                  >
                    {r.tipo}
                  </span>
                </button>
              ))}
            </>
          )}
        </div>
      )}
    </div>
  );
};
