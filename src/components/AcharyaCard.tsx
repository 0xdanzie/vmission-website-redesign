import React from 'react';
import Link from 'next/link';
import type { Acharya } from '@/data/acharyas';
import AshramImage, { AshramImageType } from './AshramImage';
import styles from './AcharyaCard.module.css';

interface Props {
  acharya: Acharya;
}

export default function AcharyaCard({ acharya }: Props) {
  let imgType: AshramImageType = 'swami-atmananda';
  if (acharya.slug.includes('amitananda')) imgType = 'swamini-amitananda';
  if (acharya.slug.includes('samatananda')) imgType = 'swamini-samatananda';
  if (acharya.slug.includes('poornananda')) imgType = 'swamini-poornananda';

  return (
    <article className={`card ${styles.card}`}>
      {/* Dignified 4:5 Portrait Ratio */}
      <AshramImage
        type={imgType}
        alt={`Portrait of ${acharya.name}`}
        aspectRatio="4/5"
        badge="Resident Acharya"
      />

      <div className={styles.content}>
        <p className={styles.honorific}>{acharya.honorific}</p>
        <h3 className={styles.name}>{acharya.name}</h3>
        <p className={styles.role}>{acharya.role}</p>
        <p className={styles.lineage}>{acharya.lineage}</p>
        <p className={styles.bio}>{acharya.shortBio.slice(0, 120)}…</p>
        <Link href={`/acharyas/${acharya.slug}`} className={styles.link}>
          Read Biography &amp; Teachings →
        </Link>
      </div>
    </article>
  );
}
