export interface Story {
  id: string
  title: string
  content: string // HTML content from rich text editor
  is_visible: boolean
  created_at: string
  updated_at: string
}

export interface Comment {
  id: string
  story_id: string
  author_name?: string | null
  content: string
  is_approved: boolean
  created_at: string
  updated_at: string
}

export interface Database {
  public: {
    Tables: {
      stories: {
        Row: Story
        Insert: Omit<Story, 'id' | 'created_at' | 'updated_at'>
        Update: Partial<Omit<Story, 'id' | 'created_at' | 'updated_at'>>
      }
      comments: {
        Row: Comment
        Insert: Omit<Comment, 'id' | 'created_at' | 'updated_at'>
        Update: Partial<Omit<Comment, 'id' | 'created_at' | 'updated_at'>>
      }
    }
  }
}
