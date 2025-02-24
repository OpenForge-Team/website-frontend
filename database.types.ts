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
      ai_chat: {
        Row: {
          created_at: string | null;
          id: string;
          messages: Json;
          updated_at: string | null;
          user_id: string;
        };
        Insert: {
          created_at?: string | null;
          id?: string;
          messages: Json;
          updated_at?: string | null;
          user_id: string;
        };
        Update: {
          created_at?: string | null;
          id?: string;
          messages?: Json;
          updated_at?: string | null;
          user_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: "ai_chat_user_id_fkey";
            columns: ["user_id"];
            isOneToOne: false;
            referencedRelation: "profiles";
            referencedColumns: ["id"];
          },
        ];
      };
      api_key: {
        Row: {
          created_at: string;
          id: string;
          user_id: string;
          value: string;
        };
        Insert: {
          created_at?: string;
          id?: string;
          user_id: string;
          value: string;
        };
        Update: {
          created_at?: string;
          id?: string;
          user_id?: string;
          value?: string;
        };
        Relationships: [
          {
            foreignKeyName: "api_token_user_id_fkey";
            columns: ["user_id"];
            isOneToOne: false;
            referencedRelation: "profiles";
            referencedColumns: ["id"];
          },
        ];
      };
      api_queries: {
        Row: {
          api_key_id: string;
          created_at: string;
          data: Json;
          id: number;
          query_type: string;
          source: string | null;
          subject_id: string;
        };
        Insert: {
          api_key_id: string;
          created_at?: string;
          data?: Json;
          id?: number;
          query_type: string;
          source?: string | null;
          subject_id: string;
        };
        Update: {
          api_key_id?: string;
          created_at?: string;
          data?: Json;
          id?: number;
          query_type?: string;
          source?: string | null;
          subject_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: "api_queries_api_key_id_fkey";
            columns: ["api_key_id"];
            isOneToOne: false;
            referencedRelation: "api_key";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "api_queries_subject_id_fkey";
            columns: ["subject_id"];
            isOneToOne: false;
            referencedRelation: "subjects";
            referencedColumns: ["id"];
          },
        ];
      };
      api_queries_message_analytics: {
        Row: {
          api_queries_message_subject_id: number | null;
          api_query_id: number;
          id: number;
          message_embedding: string;
        };
        Insert: {
          api_queries_message_subject_id?: number | null;
          api_query_id: number;
          id?: number;
          message_embedding: string;
        };
        Update: {
          api_queries_message_subject_id?: number | null;
          api_query_id?: number;
          id?: number;
          message_embedding?: string;
        };
        Relationships: [
          {
            foreignKeyName: "api_queries_message_analytics_api_queries_message_subject__fkey";
            columns: ["api_queries_message_subject_id"];
            isOneToOne: false;
            referencedRelation: "api_queries_message_subjects";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "api_queries_message_analytics_api_query_id_fkey";
            columns: ["api_query_id"];
            isOneToOne: false;
            referencedRelation: "api_queries";
            referencedColumns: ["id"];
          },
        ];
      };
      api_queries_message_subjects: {
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
      document_content_embeddings: {
        Row: {
          content: string | null;
          embedding: string | null;
          id: number;
          metadata: Json | null;
        };
        Insert: {
          content?: string | null;
          embedding?: string | null;
          id?: number;
          metadata?: Json | null;
        };
        Update: {
          content?: string | null;
          embedding?: string | null;
          id?: number;
          metadata?: Json | null;
        };
        Relationships: [];
      };
      documents: {
        Row: {
          added_at: string;
          file_name: string;
          id: string;
          name: string;
          subject_id: string;
          user_id: string;
        };
        Insert: {
          added_at?: string;
          file_name: string;
          id?: string;
          name: string;
          subject_id: string;
          user_id: string;
        };
        Update: {
          added_at?: string;
          file_name?: string;
          id?: string;
          name?: string;
          subject_id?: string;
          user_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: "documents_subject_id_fkey";
            columns: ["subject_id"];
            isOneToOne: false;
            referencedRelation: "subjects";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "documents_user_id_fkey";
            columns: ["user_id"];
            isOneToOne: false;
            referencedRelation: "profiles";
            referencedColumns: ["id"];
          },
        ];
      };
      knowledge_entities: {
        Row: {
          description: string | null;
          description_embedding: string | null;
          id: string;
          properties: Json;
          type: string;
          type_embedding: string | null;
        };
        Insert: {
          description?: string | null;
          description_embedding?: string | null;
          id?: string;
          properties?: Json;
          type: string;
          type_embedding?: string | null;
        };
        Update: {
          description?: string | null;
          description_embedding?: string | null;
          id?: string;
          properties?: Json;
          type?: string;
          type_embedding?: string | null;
        };
        Relationships: [];
      };
      knowledge_relations: {
        Row: {
          description: string | null;
          description_embedding: string | null;
          end_node_id: string;
          id: string;
          properties: Json;
          start_node_id: string;
          type: string;
          type_embedding: string | null;
        };
        Insert: {
          description?: string | null;
          description_embedding?: string | null;
          end_node_id: string;
          id?: string;
          properties?: Json;
          start_node_id: string;
          type: string;
          type_embedding?: string | null;
        };
        Update: {
          description?: string | null;
          description_embedding?: string | null;
          end_node_id?: string;
          id?: string;
          properties?: Json;
          start_node_id?: string;
          type?: string;
          type_embedding?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: "edges_end_node_id_fkey";
            columns: ["end_node_id"];
            isOneToOne: false;
            referencedRelation: "knowledge_entities";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "edges_start_node_id_fkey";
            columns: ["start_node_id"];
            isOneToOne: false;
            referencedRelation: "knowledge_entities";
            referencedColumns: ["id"];
          },
        ];
      };
      note_content_embeddings: {
        Row: {
          content: string | null;
          embedding: string | null;
          id: number;
          metadata: Json | null;
        };
        Insert: {
          content?: string | null;
          embedding?: string | null;
          id?: number;
          metadata?: Json | null;
        };
        Update: {
          content?: string | null;
          embedding?: string | null;
          id?: number;
          metadata?: Json | null;
        };
        Relationships: [];
      };
      note_title_embeddings: {
        Row: {
          content: string | null;
          embedding: string | null;
          id: number;
          metadata: Json | null;
        };
        Insert: {
          content?: string | null;
          embedding?: string | null;
          id?: number;
          metadata?: Json | null;
        };
        Update: {
          content?: string | null;
          embedding?: string | null;
          id?: number;
          metadata?: Json | null;
        };
        Relationships: [];
      };
      notes: {
        Row: {
          content: string;
          created_at: string | null;
          id: string;
          subject_id: string;
          title: string;
          user_id: string;
          workspace_id: string;
        };
        Insert: {
          content: string;
          created_at?: string | null;
          id?: string;
          subject_id: string;
          title: string;
          user_id: string;
          workspace_id: string;
        };
        Update: {
          content?: string;
          created_at?: string | null;
          id?: string;
          subject_id?: string;
          title?: string;
          user_id?: string;
          workspace_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: "notes_subject_id_fkey";
            columns: ["subject_id"];
            isOneToOne: false;
            referencedRelation: "subjects";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "notes_user_id_fkey";
            columns: ["user_id"];
            isOneToOne: false;
            referencedRelation: "profiles";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "notes_workspace_id_fkey";
            columns: ["workspace_id"];
            isOneToOne: false;
            referencedRelation: "workspaces";
            referencedColumns: ["id"];
          },
        ];
      };
      processes_mappings: {
        Row: {
          created_at: string;
          edges: Json;
          id: string;
          name: string;
          nodes: Json;
          user_id: string;
          workspace_id: string;
        };
        Insert: {
          created_at?: string;
          edges?: Json;
          id?: string;
          name: string;
          nodes?: Json;
          user_id: string;
          workspace_id: string;
        };
        Update: {
          created_at?: string;
          edges?: Json;
          id?: string;
          name?: string;
          nodes?: Json;
          user_id?: string;
          workspace_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: "workflow_diagrams_user_id_fkey";
            columns: ["user_id"];
            isOneToOne: false;
            referencedRelation: "profiles";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "workflow_diagrams_workspace_id_fkey";
            columns: ["workspace_id"];
            isOneToOne: false;
            referencedRelation: "workspaces";
            referencedColumns: ["id"];
          },
        ];
      };
      profiles: {
        Row: {
          customer_id: string | null;
          email: string;
          firstname: string;
          id: string;
          is_allowed_prelaunch: boolean;
          lastname: string;
        };
        Insert: {
          customer_id?: string | null;
          email: string;
          firstname: string;
          id: string;
          is_allowed_prelaunch?: boolean;
          lastname: string;
        };
        Update: {
          customer_id?: string | null;
          email?: string;
          firstname?: string;
          id?: string;
          is_allowed_prelaunch?: boolean;
          lastname?: string;
        };
        Relationships: [];
      };
      provider_users: {
        Row: {
          created_at: string;
          id: number;
          provider_name: string;
          token: string;
          user_id: string;
        };
        Insert: {
          created_at?: string;
          id?: number;
          provider_name: string;
          token: string;
          user_id: string;
        };
        Update: {
          created_at?: string;
          id?: number;
          provider_name?: string;
          token?: string;
          user_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: "provider_users_user_id_fkey";
            columns: ["user_id"];
            isOneToOne: false;
            referencedRelation: "profiles";
            referencedColumns: ["id"];
          },
        ];
      };
      subjects: {
        Row: {
          id: string;
          name: string;
          user_id: string;
          workspace_id: string;
        };
        Insert: {
          id?: string;
          name: string;
          user_id: string;
          workspace_id: string;
        };
        Update: {
          id?: string;
          name?: string;
          user_id?: string;
          workspace_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: "subjects_user_id_fkey";
            columns: ["user_id"];
            isOneToOne: false;
            referencedRelation: "profiles";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "subjects_workspace_id_fkey";
            columns: ["workspace_id"];
            isOneToOne: false;
            referencedRelation: "workspaces";
            referencedColumns: ["id"];
          },
        ];
      };
      transcription: {
        Row: {
          content: string;
          created_at: string;
          id: string;
          title: string;
          user_id: string | null;
        };
        Insert: {
          content: string;
          created_at?: string;
          id?: string;
          title: string;
          user_id?: string | null;
        };
        Update: {
          content?: string;
          created_at?: string;
          id?: string;
          title?: string;
          user_id?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: "transcription_user_id_fkey";
            columns: ["user_id"];
            isOneToOne: false;
            referencedRelation: "profiles";
            referencedColumns: ["id"];
          },
        ];
      };
      vocal_notes: {
        Row: {
          id: number;
          note_id: string;
          user_id: string;
        };
        Insert: {
          id?: number;
          note_id: string;
          user_id: string;
        };
        Update: {
          id?: number;
          note_id?: string;
          user_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: "vocal_notes_note_id_fkey";
            columns: ["note_id"];
            isOneToOne: true;
            referencedRelation: "notes";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "vocal_notes_user_id_fkey";
            columns: ["user_id"];
            isOneToOne: false;
            referencedRelation: "profiles";
            referencedColumns: ["id"];
          },
        ];
      };
      workflows: {
        Row: {
          author_user_id: string | null;
          created_at: string;
          id: number;
          is_public: boolean;
          long_desc: string;
          name: string;
          short_desc: string;
          structure: Json;
        };
        Insert: {
          author_user_id?: string | null;
          created_at?: string;
          id?: number;
          is_public?: boolean;
          long_desc: string;
          name: string;
          short_desc: string;
          structure?: Json;
        };
        Update: {
          author_user_id?: string | null;
          created_at?: string;
          id?: number;
          is_public?: boolean;
          long_desc?: string;
          name?: string;
          short_desc?: string;
          structure?: Json;
        };
        Relationships: [
          {
            foreignKeyName: "workflows_author_user_id_fkey";
            columns: ["author_user_id"];
            isOneToOne: false;
            referencedRelation: "profiles";
            referencedColumns: ["id"];
          },
        ];
      };
      workspaces: {
        Row: {
          created_at: string;
          id: string;
          name: string;
          owner_user_id: string | null;
        };
        Insert: {
          created_at?: string;
          id?: string;
          name: string;
          owner_user_id?: string | null;
        };
        Update: {
          created_at?: string;
          id?: string;
          name?: string;
          owner_user_id?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: "workspaces_owner_user_id_fkey";
            columns: ["owner_user_id"];
            isOneToOne: false;
            referencedRelation: "profiles";
            referencedColumns: ["id"];
          },
        ];
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      generate_embedding: {
        Args: {
          input_text: string;
        };
        Returns: string;
      };
      kw_match_document_content_embeddings: {
        Args: {
          query_text: string;
          match_count: number;
        };
        Returns: {
          id: number;
          content: string;
          metadata: Json;
          similarity: number;
        }[];
      };
      kw_match_note_content_embeddings: {
        Args: {
          query_text: string;
          match_count: number;
        };
        Returns: {
          id: number;
          content: string;
          metadata: Json;
          similarity: number;
        }[];
      };
      kw_match_note_title_embeddings: {
        Args: {
          query_text: string;
          match_count: number;
        };
        Returns: {
          id: number;
          content: string;
          metadata: Json;
          similarity: number;
        }[];
      };
      match_document_content_embeddings: {
        Args: {
          query_embedding: string;
          match_count?: number;
          filter?: Json;
        };
        Returns: {
          id: number;
          content: string;
          metadata: Json;
          embedding: Json;
          similarity: number;
        }[];
      };
      match_note_content_embeddings: {
        Args: {
          query_embedding: string;
          match_count?: number;
          filter?: Json;
        };
        Returns: {
          id: number;
          content: string;
          metadata: Json;
          embedding: Json;
          similarity: number;
        }[];
      };
      match_note_title_embeddings: {
        Args: {
          query_embedding: string;
          match_count?: number;
          filter?: Json;
        };
        Returns: {
          id: number;
          content: string;
          metadata: Json;
          embedding: Json;
          similarity: number;
        }[];
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

type PublicSchema = Database[Extract<keyof Database, "public">];

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R;
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
        PublicSchema["Views"])
    ? (PublicSchema["Tables"] &
        PublicSchema["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R;
      }
      ? R
      : never
    : never;

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I;
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I;
      }
      ? I
      : never
    : never;

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U;
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U;
      }
      ? U
      : never
    : never;

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
    ? PublicSchema["Enums"][PublicEnumNameOrOptions]
    : never;

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof PublicSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database;
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof PublicSchema["CompositeTypes"]
    ? PublicSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never;
