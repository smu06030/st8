export interface StampData {
  id: string;
  user_id: string;
  region: string;
  visited: boolean;
  created_at: string;
  stampimg: string;
  location: { lat: number; lng: number };
}
