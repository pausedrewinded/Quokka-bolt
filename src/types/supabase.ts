export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      competitions: {
        Row: {
          id: string
          title: string
          description: string
          image_url: string
          category: string
          start_date: string
          deadline: string
          prize_value: number
          entry_difficulty: string
          sponsor: string
          entry_url: string
          status: string
          created_at: string
          updated_at: string
          created_by: string | null
        }
        Insert: {
          id?: string
          title: string
          description: string
          image_url: string
          category: string
          start_date: string
          deadline: string
          prize_value: number
          entry_difficulty: string
          sponsor: string
          entry_url: string
          status?: string
          created_at?: string
          updated_at?: string
          created_by?: string | null
        }
        Update: {
          id?: string
          title?: string
          description?: string
          image_url?: string
          category?: string
          start_date?: string
          deadline?: string
          prize_value?: number
          entry_difficulty?: string
          sponsor?: string
          entry_url?: string
          status?: string
          created_at?: string
          updated_at?: string
          created_by?: string | null
        }
      }
      competition_requirements: {
        Row: {
          id: string
          competition_id: string | null
          requirement: string
          created_at: string | null
        }
        Insert: {
          id?: string
          competition_id?: string | null
          requirement: string
          created_at?: string | null
        }
        Update: {
          id?: string
          competition_id?: string | null
          requirement?: string
          created_at?: string | null
        }
      }
      competition_eligibility: {
        Row: {
          id: string
          competition_id: string | null
          criteria: string
          created_at: string | null
        }
        Insert: {
          id?: string
          competition_id?: string | null
          criteria: string
          created_at?: string | null
        }
        Update: {
          id?: string
          competition_id?: string | null
          criteria?: string
          created_at?: string | null
        }
      }
      saved_competitions: {
        Row: {
          id: string
          user_id: string | null
          competition_id: string | null
          created_at: string | null
        }
        Insert: {
          id?: string
          user_id?: string | null
          competition_id?: string | null
          created_at?: string | null
        }
        Update: {
          id?: string
          user_id?: string | null
          competition_id?: string | null
          created_at?: string | null
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      competition_category: "Sweepstakes" | "Contest" | "Giveaway" | "Promotion" | "Raffle"
      competition_status: "active" | "archived"
      entry_difficulty: "Easy" | "Medium" | "Hard"
    }
  }
}