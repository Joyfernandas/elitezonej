export const ANGLES = ["01-front", "02-overview", "03-side", "04-back", "05-detail"] as const;
export const ANGLE_LABELS = ["Front", "Overview", "Side", "Back", "Detail"] as const;
export type Angle = typeof ANGLES[number];

export const FABRIC_ANGLES = ["front", "drape", "lay", "detail"] as const;
export const FABRIC_ANGLE_LABELS = ["Texture", "Drape", "On the bench", "Macro"] as const;
export type FabricAngle = typeof FABRIC_ANGLES[number];

export function colourSlug(name: string) {
  return name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
}

export function imgSrc(slug: string, angle: Angle) {
  return `/generated/${slug}/${angle}.webp`;
}

export function imgFabric(slug: string, colour: string, angle: FabricAngle) {
  return `/generated/${slug}/${colourSlug(colour)}/${angle}.webp`;
}
