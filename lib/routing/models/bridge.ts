export interface LowBridgeWarning {
  id: string;
  location: string;
  heightFeet: number;
  heightInches: number;
  routeName: string;
  safeForTruck: boolean;
  alternateRoute?: string;
}