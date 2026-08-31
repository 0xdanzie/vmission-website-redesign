import React from 'react';
import styles from './SearchBar.module.css';

interface Props {
  value: string;
  onChange: (val: string) => void;
  placeholder?: string;
  onClear?: () => void;
}

export default function SearchBar({
  value,
  onChange,
  placeholder = 'Search teachings, scriptures, or teachers...',
  onClear,
}: Props) {
  return (
    <div className={styles.wrapper}>
      <span className={styles.icon} aria-hidden="true">
        <svg width="18" height="18" viewBox="0 0 20 20" fill="none">
          <circle cx="8.5" cy="8.5" r="5.5" stroke="currentColor" strokeWidth="1.75" />
          <path d="M12.5 12.5L17 17" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" />
        </svg>
      </span>
      <input
        type="search"
        className={styles.input}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        aria-label="Search"
      />
      {value && (
        <button
          type="button"
          className={styles.clearBtn}
          onClick={() => {
            onChange('');
            if (onClear) onClear();
          }}
          aria-label="Clear search"
        >
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <path d="M2 2L12 12M12 2L2 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
        </button>
      )}
    </div>
  );
}
