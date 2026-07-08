export type HazmatRestrictionType =
  | "tunnel"
  | "bridge"
  | "city"
  | "route"
  | "state";

export interface HazmatRestriction {
  id: string;
  location: string;
  type: HazmatRestrictionType;
  description: string;
  restrictedMaterials: string[];
  alternateRoute?: string;
}