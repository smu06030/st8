import { Tables } from './database.type';

export type Album = Tables<'album'>;
export type BookMark = Tables<'bookmark'>;
export type Profile = Tables<'profile'>;
export type Stamp = Tables<'stamp'>;
export type Tourlist = Tables<'tourlist'>;

// 사용 예시

// ex) interface ...PropsType {
//  album: Album[];
// }

// 개별 속성 타입 사용 시
// Album["region"], Album["photoImg"]
