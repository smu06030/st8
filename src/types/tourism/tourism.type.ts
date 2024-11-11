export interface Tourism {
  firstimage: string | null;
  contentid: string | null;
  title: string | null;
  city: string | null;
  supabaseText: string | null;
  citytitle: string | null;
  citydetail: string | null;
  isBookmarked: boolean;
}

export interface bookmark {
  contentid: string;
  title: string;
  text: string;
  firstimage: string | null;
  isBookmarked: boolean;
}
