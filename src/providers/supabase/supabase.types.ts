export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export type Database = {
  public: {
    Tables: {
      categories: {
        Row: {
          id: number;
          name: string;
        };
        Insert: {
          id?: number;
          name: string;
        };
        Update: {
          id?: number;
          name?: string;
        };
        Relationships: [];
      };
      event_categories: {
        Row: {
          category: number;
          event: number;
          id: number;
          winner: number | null;
        };
        Insert: {
          category: number;
          event: number;
          id?: number;
          winner?: number | null;
        };
        Update: {
          category?: number;
          event?: number;
          id?: number;
          winner?: number | null;
        };
        Relationships: [
          {
            foreignKeyName: 'event_categories_category_fkey';
            columns: ['category'];
            isOneToOne: false;
            referencedRelation: 'categories';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'event_categories_event_fkey';
            columns: ['event'];
            isOneToOne: false;
            referencedRelation: 'events';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'event_categories_winner_fkey';
            columns: ['winner'];
            isOneToOne: false;
            referencedRelation: 'nominees';
            referencedColumns: ['id'];
          },
        ];
      };
      events: {
        Row: {
          id: number;
          name: string;
          starts_at: string;
        };
        Insert: {
          id?: number;
          name: string;
          starts_at?: string;
        };
        Update: {
          id?: number;
          name?: string;
          starts_at?: string;
        };
        Relationships: [];
      };
      movies: {
        Row: {
          event: number;
          id: number;
          name: string;
        };
        Insert: {
          event: number;
          id?: number;
          name: string;
        };
        Update: {
          event?: number;
          id?: number;
          name?: string;
        };
        Relationships: [
          {
            foreignKeyName: 'public_movies_event_id_fkey';
            columns: ['event'];
            isOneToOne: false;
            referencedRelation: 'events';
            referencedColumns: ['id'];
          },
        ];
      };
      nominees: {
        Row: {
          category: number;
          event: number;
          id: number;
          movie: number | null;
          name: string | null;
        };
        Insert: {
          category: number;
          event: number;
          id?: number;
          movie?: number | null;
          name?: string | null;
        };
        Update: {
          category?: number;
          event?: number;
          id?: number;
          movie?: number | null;
          name?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: 'nominees_category_fkey';
            columns: ['category'];
            isOneToOne: false;
            referencedRelation: 'categories';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'nominees_event_fkey';
            columns: ['event'];
            isOneToOne: false;
            referencedRelation: 'events';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'public_nominees_movie_id_fkey';
            columns: ['movie'];
            isOneToOne: false;
            referencedRelation: 'movies';
            referencedColumns: ['id'];
          },
        ];
      };
      users: {
        Row: {
          id: string;
          name: string | null;
          role: string | null;
        };
        Insert: {
          id: string;
          name?: string | null;
          role?: string | null;
        };
        Update: {
          id?: string;
          name?: string | null;
          role?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: 'profiles_id_fkey';
            columns: ['id'];
            isOneToOne: true;
            referencedRelation: 'users';
            referencedColumns: ['id'];
          },
        ];
      };
      votes: {
        Row: {
          category: number | null;
          event: number;
          id: number;
          nominee: number | null;
          user: string | null;
        };
        Insert: {
          category?: number | null;
          event: number;
          id?: number;
          nominee?: number | null;
          user?: string | null;
        };
        Update: {
          category?: number | null;
          event?: number;
          id?: number;
          nominee?: number | null;
          user?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: 'public_event_votes_category_fkey';
            columns: ['category'];
            isOneToOne: false;
            referencedRelation: 'event_categories';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'public_event_votes_event_fkey';
            columns: ['event'];
            isOneToOne: false;
            referencedRelation: 'events';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'public_event_votes_vote_fkey';
            columns: ['nominee'];
            isOneToOne: false;
            referencedRelation: 'nominees';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'public_votes_user_fkey';
            columns: ['user'];
            isOneToOne: false;
            referencedRelation: 'users';
            referencedColumns: ['id'];
          },
        ];
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      delete_claim: {
        Args: {
          uid: string;
          claim: string;
        };
        Returns: string;
      };
      get_claim: {
        Args: {
          uid: string;
          claim: string;
        };
        Returns: Json;
      };
      get_claims: {
        Args: {
          uid: string;
        };
        Returns: Json;
      };
      get_my_claim: {
        Args: {
          claim: string;
        };
        Returns: Json;
      };
      get_my_claims: {
        Args: Record<PropertyKey, never>;
        Returns: Json;
      };
      is_claims_admin: {
        Args: Record<PropertyKey, never>;
        Returns: boolean;
      };
      set_claim: {
        Args: {
          uid: string;
          claim: string;
          value: Json;
        };
        Returns: string;
      };
    };
    Enums: {
      [_ in never]: never;
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
};

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (Database['public']['Tables'] & Database['public']['Views'])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions['schema']]['Tables'] &
        Database[PublicTableNameOrOptions['schema']]['Views'])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions['schema']]['Tables'] &
      Database[PublicTableNameOrOptions['schema']]['Views'])[TableName] extends {
      Row: infer R;
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (Database['public']['Tables'] &
        Database['public']['Views'])
    ? (Database['public']['Tables'] &
        Database['public']['Views'])[PublicTableNameOrOptions] extends {
        Row: infer R;
      }
      ? R
      : never
    : never;

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof Database['public']['Tables']
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions['schema']]['Tables']
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions['schema']]['Tables'][TableName] extends {
      Insert: infer I;
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof Database['public']['Tables']
    ? Database['public']['Tables'][PublicTableNameOrOptions] extends {
        Insert: infer I;
      }
      ? I
      : never
    : never;

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof Database['public']['Tables']
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions['schema']]['Tables']
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions['schema']]['Tables'][TableName] extends {
      Update: infer U;
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof Database['public']['Tables']
    ? Database['public']['Tables'][PublicTableNameOrOptions] extends {
        Update: infer U;
      }
      ? U
      : never
    : never;

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof Database['public']['Enums']
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions['schema']]['Enums']
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions['schema']]['Enums'][EnumName]
  : PublicEnumNameOrOptions extends keyof Database['public']['Enums']
    ? Database['public']['Enums'][PublicEnumNameOrOptions]
    : never;
