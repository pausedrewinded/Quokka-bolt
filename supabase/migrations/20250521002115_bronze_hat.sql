/*
  # Competition Directory Schema

  1. New Tables
    - `users`
      - `id` (uuid, primary key) - Maps to auth.users
      - `email` (text) - User's email
      - `created_at` (timestamp)
      - `updated_at` (timestamp)
    
    - `competitions`
      - `id` (uuid, primary key)
      - `title` (text) - Competition title
      - `description` (text) - Competition description
      - `image_url` (text) - URL to competition image
      - `category` (text) - Competition category (enum)
      - `start_date` (timestamp) - When competition starts
      - `deadline` (timestamp) - Competition end date
      - `prize_value` (numeric) - Monetary value of prize
      - `entry_difficulty` (text) - Difficulty level (enum)
      - `sponsor` (text) - Competition sponsor
      - `entry_url` (text) - URL to enter competition
      - `status` (text) - Competition status (active/archived)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)
      - `created_by` (uuid, references users)

    - `competition_requirements`
      - `id` (uuid, primary key)
      - `competition_id` (uuid, references competitions)
      - `requirement` (text)
      - `created_at` (timestamp)

    - `competition_eligibility`
      - `id` (uuid, primary key)
      - `competition_id` (uuid, references competitions)
      - `criteria` (text)
      - `created_at` (timestamp)

    - `saved_competitions`
      - `id` (uuid, primary key)
      - `user_id` (uuid, references users)
      - `competition_id` (uuid, references competitions)
      - `created_at` (timestamp)

  2. Security
    - Enable RLS on all tables
    - Add policies for authenticated users
    - Add policies for competition visibility
*/

-- Create enum types
CREATE TYPE competition_category AS ENUM (
  'Sweepstakes',
  'Contest',
  'Giveaway',
  'Promotion',
  'Raffle'
);

CREATE TYPE entry_difficulty AS ENUM (
  'Easy',
  'Medium',
  'Hard'
);

CREATE TYPE competition_status AS ENUM (
  'active',
  'archived'
);

-- Create users table
CREATE TABLE IF NOT EXISTS users (
  id uuid PRIMARY KEY DEFAULT auth.uid(),
  email text NOT NULL,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create competitions table
CREATE TABLE IF NOT EXISTS competitions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  description text NOT NULL,
  image_url text NOT NULL,
  category competition_category NOT NULL,
  start_date timestamptz NOT NULL,
  deadline timestamptz NOT NULL,
  prize_value numeric NOT NULL CHECK (prize_value >= 0),
  entry_difficulty entry_difficulty NOT NULL,
  sponsor text NOT NULL,
  entry_url text NOT NULL,
  status competition_status NOT NULL DEFAULT 'active',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  created_by uuid REFERENCES users(id) ON DELETE SET NULL,
  CONSTRAINT valid_dates CHECK (start_date <= deadline)
);

-- Create competition requirements table
CREATE TABLE IF NOT EXISTS competition_requirements (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  competition_id uuid REFERENCES competitions(id) ON DELETE CASCADE,
  requirement text NOT NULL,
  created_at timestamptz DEFAULT now()
);

-- Create competition eligibility table
CREATE TABLE IF NOT EXISTS competition_eligibility (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  competition_id uuid REFERENCES competitions(id) ON DELETE CASCADE,
  criteria text NOT NULL,
  created_at timestamptz DEFAULT now()
);

-- Create saved competitions table
CREATE TABLE IF NOT EXISTS saved_competitions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES users(id) ON DELETE CASCADE,
  competition_id uuid REFERENCES competitions(id) ON DELETE CASCADE,
  created_at timestamptz DEFAULT now(),
  UNIQUE(user_id, competition_id)
);

-- Enable Row Level Security
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE competitions ENABLE ROW LEVEL SECURITY;
ALTER TABLE competition_requirements ENABLE ROW LEVEL SECURITY;
ALTER TABLE competition_eligibility ENABLE ROW LEVEL SECURITY;
ALTER TABLE saved_competitions ENABLE ROW LEVEL SECURITY;

-- Create policies for users table
CREATE POLICY "Users can read own data"
  ON users
  FOR SELECT
  TO authenticated
  USING (auth.uid() = id);

CREATE POLICY "Users can update own data"
  ON users
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = id);

-- Create policies for competitions table
CREATE POLICY "Anyone can view active competitions"
  ON competitions
  FOR SELECT
  TO public
  USING (status = 'active' OR auth.uid() = created_by);

CREATE POLICY "Authenticated users can create competitions"
  ON competitions
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = created_by);

CREATE POLICY "Users can update own competitions"
  ON competitions
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = created_by);

-- Create policies for competition requirements
CREATE POLICY "Anyone can view competition requirements"
  ON competition_requirements
  FOR SELECT
  TO public
  USING (
    EXISTS (
      SELECT 1 FROM competitions c
      WHERE c.id = competition_id
      AND (c.status = 'active' OR c.created_by = auth.uid())
    )
  );

CREATE POLICY "Users can manage own competition requirements"
  ON competition_requirements
  FOR ALL
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM competitions c
      WHERE c.id = competition_id AND c.created_by = auth.uid()
    )
  );

-- Create policies for competition eligibility
CREATE POLICY "Anyone can view competition eligibility"
  ON competition_eligibility
  FOR SELECT
  TO public
  USING (
    EXISTS (
      SELECT 1 FROM competitions c
      WHERE c.id = competition_id
      AND (c.status = 'active' OR c.created_by = auth.uid())
    )
  );

CREATE POLICY "Users can manage own competition eligibility"
  ON competition_eligibility
  FOR ALL
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM competitions c
      WHERE c.id = competition_id AND c.created_by = auth.uid()
    )
  );

-- Create policies for saved competitions
CREATE POLICY "Users can manage their saved competitions"
  ON saved_competitions
  FOR ALL
  TO authenticated
  USING (auth.uid() = user_id);

-- Create function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Create triggers for updated_at columns
CREATE TRIGGER update_users_updated_at
  BEFORE UPDATE ON users
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_competitions_updated_at
  BEFORE UPDATE ON competitions
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- Create indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_competitions_status ON competitions(status);
CREATE INDEX IF NOT EXISTS idx_competitions_category ON competitions(category);
CREATE INDEX IF NOT EXISTS idx_competitions_deadline ON competitions(deadline);
CREATE INDEX IF NOT EXISTS idx_saved_competitions_user ON saved_competitions(user_id);
CREATE INDEX IF NOT EXISTS idx_competition_requirements_competition ON competition_requirements(competition_id);
CREATE INDEX IF NOT EXISTS idx_competition_eligibility_competition ON competition_eligibility(competition_id);