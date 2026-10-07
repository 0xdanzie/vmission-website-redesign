# Vedanta Mission — Cinematic Entry Scene Assets

These are the two newly generated assets for the isolated homepage entry scene.

## Final assets

- `entry/shivling-master.png` — transparent master Shivling foreground asset.
- `entry/shivling-master.webp` — optimized web version with transparency.
- `entry/entry-atmosphere.png` — cinematic dark/warm opening background plate.
- `entry/entry-atmosphere.webp` — optimized web version.

## Antigravity project placement

Copy the `entry` folder into:

`public/images/entry/`

Final website paths should be:

`/images/entry/shivling-master.webp`
`/images/entry/entry-atmosphere.webp`

## Important implementation decision

The existing homepage remains the destination. Do not create a duplicate copy of the homepage's lower Mahadev section.

The entry scene should be a temporary full-screen overlay on `/` only:

1. Dark atmosphere appears.
2. Shivling reveals.
3. Very brief hold.
4. Existing homepage hero begins to reveal behind it.
5. Shivling recedes/fades.
6. Overlay disappears and the existing homepage continues normally.

The existing homepage, including its later Mahadev/Ashram section, remains untouched.
