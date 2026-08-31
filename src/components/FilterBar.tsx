import React from 'react';
import styles from './FilterBar.module.css';

interface Props {
  options: string[];
  selected: string;
  onSelect: (option: string) => void;
  label?: string;
}

export default function FilterBar({ options, selected, onSelect, label }: Props) {
  return (
    <div className={styles.container} role="group" aria-label={label || 'Filter options'}>
      {label && <span className={styles.label}>{label}:</span>}
      <div className={styles.scrollWrapper}>
        {options.map((opt) => {
          const isSelected = selected === opt;
          return (
            <button
              key={opt}
              type="button"
              className={`${styles.pill} ${isSelected ? styles.active : ''}`}
              onClick={() => onSelect(opt)}
              aria-pressed={isSelected}
            >
              {opt}
            </button>
          );
        })}
      </div>
    </div>
  );
}
