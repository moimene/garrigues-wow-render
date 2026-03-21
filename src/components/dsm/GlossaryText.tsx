import { useState, useRef, useCallback } from 'react';
import { glosario } from '@/data/dsmData';

/** Builds a case-insensitive regex that matches any glossary term */
const termRegex = (() => {
  const sorted = [...glosario].sort((a, b) => b.termino.length - a.termino.length);
  const escaped = sorted.map(g => g.termino.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'));
  return new RegExp(`(${escaped.join('|')})`, 'gi');
})();

const definitionMap = new Map(
  glosario.map(g => [g.termino.toLowerCase(), g.definicion])
);

interface TooltipState {
  term: string;
  definition: string;
  x: number;
  y: number;
}

/**
 * Renders text with glossary terms highlighted and showing tooltips on hover.
 * Only highlights the first occurrence of each term per text block.
 */
export const GlossaryText = ({
  text,
  className = '',
  style,
}: {
  text: string;
  className?: string;
  style?: React.CSSProperties;
}) => {
  const [tooltip, setTooltip] = useState<TooltipState | null>(null);
  const containerRef = useRef<HTMLSpanElement>(null);
  const hideTimeout = useRef<ReturnType<typeof setTimeout>>();

  const showTooltip = useCallback((term: string, definition: string, e: React.MouseEvent) => {
    if (hideTimeout.current) clearTimeout(hideTimeout.current);
    const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
    const containerRect = containerRef.current?.getBoundingClientRect();
    if (!containerRect) return;
    setTooltip({
      term,
      definition,
      x: rect.left - containerRect.left + rect.width / 2,
      y: rect.top - containerRect.top,
    });
  }, []);

  const hideTooltip = useCallback(() => {
    hideTimeout.current = setTimeout(() => setTooltip(null), 150);
  }, []);

  const keepTooltip = useCallback(() => {
    if (hideTimeout.current) clearTimeout(hideTimeout.current);
  }, []);

  // Split text into parts, tracking which terms we've already highlighted
  const seen = new Set<string>();
  const parts: { text: string; isTerm: boolean; definition?: string }[] = [];
  let lastIndex = 0;

  const matches = [...text.matchAll(termRegex)];
  for (const match of matches) {
    const termLower = match[0].toLowerCase();
    const start = match.index!;
    
    if (seen.has(termLower)) continue;
    seen.add(termLower);

    if (start > lastIndex) {
      parts.push({ text: text.slice(lastIndex, start), isTerm: false });
    }
    parts.push({
      text: match[0],
      isTerm: true,
      definition: definitionMap.get(termLower),
    });
    lastIndex = start + match[0].length;
  }
  if (lastIndex < text.length) {
    parts.push({ text: text.slice(lastIndex), isTerm: false });
  }

  // If no terms found, render plain text
  if (parts.length <= 1 && !parts[0]?.isTerm) {
    return <span className={className} style={style}>{text}</span>;
  }

  return (
    <span ref={containerRef} className={`relative ${className}`} style={style}>
      {parts.map((part, i) =>
        part.isTerm ? (
          <span
            key={i}
            className="glossary-term"
            style={{
              borderBottom: '1px dotted var(--g-brand-3308)',
              cursor: 'help',
              transition: 'color 150ms ease',
            }}
            onMouseEnter={(e) => showTooltip(part.text, part.definition!, e)}
            onMouseLeave={hideTooltip}
          >
            {part.text}
          </span>
        ) : (
          <span key={i}>{part.text}</span>
        )
      )}

      {/* Tooltip */}
      {tooltip && (
        <span
          className="absolute z-50 pointer-events-auto"
          style={{
            left: `${tooltip.x}px`,
            top: `${tooltip.y}px`,
            transform: 'translate(-50%, -100%) translateY(-8px)',
          }}
          onMouseEnter={keepTooltip}
          onMouseLeave={hideTooltip}
        >
          <span
            className="block max-w-[280px] sm:max-w-[320px] p-3"
            style={{
              background: 'var(--g-surface-card)',
              borderRadius: 'var(--g-radius-md)',
              boxShadow: '0 8px 30px rgba(0,40,30,0.18), 0 0 0 1px var(--g-border-subtle)',
            }}
          >
            <span className="block text-[10px] font-bold uppercase tracking-wider mb-1" style={{ color: 'var(--g-brand-3308)' }}>
              {tooltip.term}
            </span>
            <span className="block text-[11px] leading-relaxed" style={{ color: 'var(--g-text-primary)' }}>
              {tooltip.definition}
            </span>
          </span>
          {/* Arrow */}
          <span
            className="absolute left-1/2 -translate-x-1/2 bottom-0 translate-y-[calc(100%-1px)]"
            style={{
              width: 0,
              height: 0,
              borderLeft: '6px solid transparent',
              borderRight: '6px solid transparent',
              borderTop: '6px solid var(--g-surface-card)',
            }}
          />
        </span>
      )}
    </span>
  );
};
