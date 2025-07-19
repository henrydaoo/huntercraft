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
      contact_info: {
        Row: {
          created_at: string | null;
          email: string | null;
          id: string;
          phone: string | null;
          updated_at: string | null;
        };
        Insert: {
          created_at?: string | null;
          email?: string | null;
          id?: string;
          phone?: string | null;
          updated_at?: string | null;
        };
        Update: {
          created_at?: string | null;
          email?: string | null;
          id?: string;
          phone?: string | null;
          updated_at?: string | null;
        };
        Relationships: [];
      };
      education: {
        Row: {
          created_at: string | null;
          degree: string;
          description: string[] | null;
          end_date: string | null;
          field_of_study: string | null;
          gpa: string | null;
          id: string;
          location: string | null;
          order_index: number | null;
          school: string;
          start_date: string;
        };
        Insert: {
          created_at?: string | null;
          degree: string;
          description?: string[] | null;
          end_date?: string | null;
          field_of_study?: string | null;
          gpa?: string | null;
          id?: string;
          location?: string | null;
          order_index?: number | null;
          school: string;
          start_date: string;
        };
        Update: {
          created_at?: string | null;
          degree?: string;
          description?: string[] | null;
          end_date?: string | null;
          field_of_study?: string | null;
          gpa?: string | null;
          id?: string;
          location?: string | null;
          order_index?: number | null;
          school?: string;
          start_date?: string;
        };
        Relationships: [];
      };
      experiences: {
        Row: {
          company: string;
          created_at: string | null;
          description: string[] | null;
          employment_type: string | null;
          end_date: string | null;
          id: string;
          location: string | null;
          order_index: number | null;
          position: string;
          start_date: string;
          technologies: string[] | null;
          visible: boolean;
        };
        Insert: {
          company: string;
          created_at?: string | null;
          description?: string[] | null;
          employment_type?: string | null;
          end_date?: string | null;
          id?: string;
          location?: string | null;
          order_index?: number | null;
          position: string;
          start_date: string;
          technologies?: string[] | null;
          visible?: boolean;
        };
        Update: {
          company?: string;
          created_at?: string | null;
          description?: string[] | null;
          employment_type?: string | null;
          end_date?: string | null;
          id?: string;
          location?: string | null;
          order_index?: number | null;
          position?: string;
          start_date?: string;
          technologies?: string[] | null;
          visible?: boolean;
        };
        Relationships: [];
      };
      personal_info: {
        Row: {
          avatar_url: string | null;
          bio: string | null;
          created_at: string | null;
          id: string;
          location: string | null;
          name: string;
          resume_url: string | null;
          title: string;
          updated_at: string | null;
        };
        Insert: {
          avatar_url?: string | null;
          bio?: string | null;
          created_at?: string | null;
          id?: string;
          location?: string | null;
          name: string;
          resume_url?: string | null;
          title: string;
          updated_at?: string | null;
        };
        Update: {
          avatar_url?: string | null;
          bio?: string | null;
          created_at?: string | null;
          id?: string;
          location?: string | null;
          name?: string;
          resume_url?: string | null;
          title?: string;
          updated_at?: string | null;
        };
        Relationships: [];
      };
      projects: {
        Row: {
          category: string | null;
          created_at: string | null;
          demo_url: string | null;
          description: string | null;
          detailed_description: string | null;
          featured: boolean | null;
          github_url: string | null;
          id: string;
          image_url: string | null;
          image_urls: string[] | null;
          order_index: number | null;
          slug: string;
          technologies: string[] | null;
          title: string;
          updated_at: string | null;
        };
        Insert: {
          category?: string | null;
          created_at?: string | null;
          demo_url?: string | null;
          description?: string | null;
          detailed_description?: string | null;
          featured?: boolean | null;
          github_url?: string | null;
          id?: string;
          image_url?: string | null;
          image_urls?: string[] | null;
          order_index?: number | null;
          slug?: string;
          technologies?: string[] | null;
          title: string;
          updated_at?: string | null;
        };
        Update: {
          category?: string | null;
          created_at?: string | null;
          demo_url?: string | null;
          description?: string | null;
          detailed_description?: string | null;
          featured?: boolean | null;
          github_url?: string | null;
          id?: string;
          image_url?: string | null;
          image_urls?: string[] | null;
          order_index?: number | null;
          slug?: string;
          technologies?: string[] | null;
          title?: string;
          updated_at?: string | null;
        };
        Relationships: [];
      };
      skills: {
        Row: {
          category: string;
          created_at: string | null;
          icon: string | null;
          icon_url: string | null;
          id: string;
          name: string;
          order_index: number | null;
        };
        Insert: {
          category: string;
          created_at?: string | null;
          icon?: string | null;
          icon_url?: string | null;
          id?: string;
          name: string;
          order_index?: number | null;
        };
        Update: {
          category?: string;
          created_at?: string | null;
          icon?: string | null;
          icon_url?: string | null;
          id?: string;
          name?: string;
          order_index?: number | null;
        };
        Relationships: [];
      };
      social_links: {
        Row: {
          created_at: string | null;
          icon: string;
          id: string;
          name: string;
          order_index: number | null;
          url: string;
        };
        Insert: {
          created_at?: string | null;
          icon: string;
          id?: string;
          name: string;
          order_index?: number | null;
          url: string;
        };
        Update: {
          created_at?: string | null;
          icon?: string;
          id?: string;
          name?: string;
          order_index?: number | null;
          url?: string;
        };
        Relationships: [];
      };
      website_info: {
        Row: {
          created_at: string;
          id: string;
          site_description: string | null;
          site_name: string;
          updated_at: string;
        };
        Insert: {
          created_at?: string;
          id?: string;
          site_description?: string | null;
          site_name?: string;
          updated_at?: string;
        };
        Update: {
          created_at?: string;
          id?: string;
          site_description?: string | null;
          site_name?: string;
          updated_at?: string;
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

type DefaultSchema = Database[Extract<keyof Database, "public">];

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database;
  }
    ? keyof (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R;
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
      DefaultSchema["Views"])
  ? (DefaultSchema["Tables"] &
      DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
      Row: infer R;
    }
    ? R
    : never
  : never;

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database;
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I;
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
  ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
      Insert: infer I;
    }
    ? I
    : never
  : never;

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database;
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U;
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
  ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
      Update: infer U;
    }
    ? U
    : never
  : never;

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof Database;
  }
    ? keyof Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never
> = DefaultSchemaEnumNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
  ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
  : never;

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database;
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
  ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
  : never;

export const Constants = {
  public: {
    Enums: {},
  },
} as const;
