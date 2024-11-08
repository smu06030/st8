export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[];

export type Database = {
  public: {
    Tables: {
      album: {
        Row: {
          created_at: string;
          id: number;
          photoImg: string | null;
          region: string | null;
          user_id: string | null;
        };
        Insert: {
          created_at?: string;
          id?: number;
          photoImg?: string | null;
          region?: string | null;
          user_id?: string | null;
        };
        Update: {
          created_at?: string;
          id?: number;
          photoImg?: string | null;
          region?: string | null;
          user_id?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: '\balbum_user_id_fkey';
            columns: ['user_id'];
            isOneToOne: false;
            referencedRelation: 'profile';
            referencedColumns: ['id'];
          }
        ];
      };
      bookmark: {
        Row: {
          choose: boolean | null;
          contentid: string | null;
          created_at: string;
          id: number;
          text: string | null;
          title: string | null;
          user_id: string | null;
        };
        Insert: {
          choose?: boolean | null;
          contentid?: string | null;
          created_at?: string;
          id?: number;
          text?: string | null;
          title?: string | null;
          user_id?: string | null;
        };
        Update: {
          choose?: boolean | null;
          contentid?: string | null;
          created_at?: string;
          id?: number;
          text?: string | null;
          title?: string | null;
          user_id?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: 'bookmark_contentid_fkey';
            columns: ['contentid'];
            isOneToOne: false;
            referencedRelation: 'tourlist';
            referencedColumns: ['contentid'];
          },
          {
            foreignKeyName: 'bookmark_user_id_fkey';
            columns: ['user_id'];
            isOneToOne: false;
            referencedRelation: 'profile';
            referencedColumns: ['id'];
          }
        ];
      };
      profile: {
        Row: {
          created: string;
          email: string | null;
          id: string;
          nickname: string | null;
        };
        Insert: {
          created?: string;
          email?: string | null;
          id?: string;
          nickname?: string | null;
        };
        Update: {
          created?: string;
          email?: string | null;
          id?: string;
          nickname?: string | null;
        };
        Relationships: [];
      };
      stamp: {
        Row: {
          address: string;
          aliasLocation: string | null;
          created_at: string;
          id: number;
          lat: number;
          lng: number;
          region: string;
          stampimg: string;
          user_id: string;
          visited: boolean;
        };
        Insert: {
          address: string;
          aliasLocation?: string | null;
          created_at?: string;
          id?: number;
          lat: number;
          lng: number;
          region: string;
          stampimg: string;
          user_id?: string;
          visited?: boolean;
        };
        Update: {
          address?: string;
          aliasLocation?: string | null;
          created_at?: string;
          id?: number;
          lat?: number;
          lng?: number;
          region?: string;
          stampimg?: string;
          user_id?: string;
          visited?: boolean;
        };
        Relationships: [
          {
            foreignKeyName: 'stamp_user_id_fkey';
            columns: ['user_id'];
            isOneToOne: false;
            referencedRelation: 'profile';
            referencedColumns: ['id'];
          }
        ];
      };
      tourlist: {
        Row: {
          city: string | null;
          citydetail: string | null;
          citytitle: string | null;
          contentid: string | null;
          created_at: string;
          firstimage: string | null;
          id: number;
          text: string | null;
          title: string | null;
        };
        Insert: {
          city?: string | null;
          citydetail?: string | null;
          citytitle?: string | null;
          contentid?: string | null;
          created_at?: string;
          firstimage?: string | null;
          id?: number;
          text?: string | null;
          title?: string | null;
        };
        Update: {
          city?: string | null;
          citydetail?: string | null;
          citytitle?: string | null;
          contentid?: string | null;
          created_at?: string;
          firstimage?: string | null;
          id?: number;
          text?: string | null;
          title?: string | null;
        };
        Relationships: [];
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      [_ in never]: never;
    };
    Enums: {
      [_ in never]: never;
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
};

type PublicSchema = Database[Extract<keyof Database, 'public'>];

export type Tables<
  PublicTableNameOrOptions extends keyof (PublicSchema['Tables'] & PublicSchema['Views']) | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions['schema']]['Tables'] &
        Database[PublicTableNameOrOptions['schema']]['Views'])
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions['schema']]['Tables'] &
      Database[PublicTableNameOrOptions['schema']]['Views'])[TableName] extends {
      Row: infer R;
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema['Tables'] & PublicSchema['Views'])
    ? (PublicSchema['Tables'] & PublicSchema['Views'])[PublicTableNameOrOptions] extends {
        Row: infer R;
      }
      ? R
      : never
    : never;

export type TablesInsert<
  PublicTableNameOrOptions extends keyof PublicSchema['Tables'] | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions['schema']]['Tables']
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions['schema']]['Tables'][TableName] extends {
      Insert: infer I;
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema['Tables']
    ? PublicSchema['Tables'][PublicTableNameOrOptions] extends {
        Insert: infer I;
      }
      ? I
      : never
    : never;

export type TablesUpdate<
  PublicTableNameOrOptions extends keyof PublicSchema['Tables'] | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions['schema']]['Tables']
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions['schema']]['Tables'][TableName] extends {
      Update: infer U;
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema['Tables']
    ? PublicSchema['Tables'][PublicTableNameOrOptions] extends {
        Update: infer U;
      }
      ? U
      : never
    : never;

export type Enums<
  PublicEnumNameOrOptions extends keyof PublicSchema['Enums'] | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions['schema']]['Enums']
    : never = never
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions['schema']]['Enums'][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema['Enums']
    ? PublicSchema['Enums'][PublicEnumNameOrOptions]
    : never;

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends keyof PublicSchema['CompositeTypes'] | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database;
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions['schema']]['CompositeTypes']
    : never = never
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions['schema']]['CompositeTypes'][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof PublicSchema['CompositeTypes']
    ? PublicSchema['CompositeTypes'][PublicCompositeTypeNameOrOptions]
    : never;
