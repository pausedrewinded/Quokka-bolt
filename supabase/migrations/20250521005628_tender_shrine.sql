/*
  # Add sample competitions

  1. Sample Data
    - Adds 3 initial competitions with varied categories and difficulties
    - Includes requirements and eligibility criteria for each competition
    - Sets realistic prize values and deadlines

  2. Data Structure
    - Competitions table: Basic competition info
    - Requirements: Entry requirements for each competition
    - Eligibility: Eligibility criteria for each competition
*/

-- Insert sample competitions
INSERT INTO competitions (
  title,
  description,
  image_url,
  category,
  start_date,
  deadline,
  prize_value,
  entry_difficulty,
  sponsor,
  entry_url,
  status
) VALUES
(
  'Photography Challenge 2025',
  'Capture the essence of urban wildlife in your city. Show us the unexpected moments where nature meets concrete jungle.',
  'https://images.pexels.com/photos/1793525/pexels-photo-1793525.jpeg',
  'Contest',
  NOW(),
  NOW() + INTERVAL '30 days',
  5000,
  'Medium',
  'UrbanLens Photography',
  'https://example.com/photo-challenge',
  'active'
),
(
  'Tech Innovation Sweepstakes',
  'Win the latest gadget bundle including a premium laptop, smartphone, and smart home devices.',
  'https://images.pexels.com/photos/1714208/pexels-photo-1714208.jpeg',
  'Sweepstakes',
  NOW(),
  NOW() + INTERVAL '15 days',
  2500,
  'Easy',
  'TechWorld',
  'https://example.com/tech-sweepstakes',
  'active'
),
(
  'Eco-Friendly Design Challenge',
  'Design sustainable packaging solutions that reduce plastic waste. Show us your innovative approach to eco-friendly packaging.',
  'https://images.pexels.com/photos/2547565/pexels-photo-2547565.jpeg',
  'Contest',
  NOW(),
  NOW() + INTERVAL '45 days',
  10000,
  'Hard',
  'GreenPack Solutions',
  'https://example.com/eco-challenge',
  'active'
);

-- Get the IDs of the inserted competitions
DO $$
DECLARE
  photo_comp_id uuid;
  tech_comp_id uuid;
  eco_comp_id uuid;
BEGIN
  SELECT id INTO photo_comp_id FROM competitions WHERE title = 'Photography Challenge 2025';
  SELECT id INTO tech_comp_id FROM competitions WHERE title = 'Tech Innovation Sweepstakes';
  SELECT id INTO eco_comp_id FROM competitions WHERE title = 'Eco-Friendly Design Challenge';

  -- Insert requirements for Photography Challenge
  INSERT INTO competition_requirements (competition_id, requirement) VALUES
  (photo_comp_id, 'Must be an original photograph taken within the last 6 months'),
  (photo_comp_id, 'Photo must be taken within city limits'),
  (photo_comp_id, 'Minimum resolution of 3000x2000 pixels'),
  (photo_comp_id, 'No digital manipulation beyond basic color correction');

  -- Insert requirements for Tech Sweepstakes
  INSERT INTO competition_requirements (competition_id, requirement) VALUES
  (tech_comp_id, 'Must be 18 years or older'),
  (tech_comp_id, 'One entry per person'),
  (tech_comp_id, 'Must follow our social media accounts'),
  (tech_comp_id, 'Share the contest post with #TechSweeps2025');

  -- Insert requirements for Eco Challenge
  INSERT INTO competition_requirements (competition_id, requirement) VALUES
  (eco_comp_id, 'Submit detailed design specifications'),
  (eco_comp_id, 'Include material cost analysis'),
  (eco_comp_id, 'Demonstrate recyclability of the design'),
  (eco_comp_id, 'Provide prototype photos or 3D renders');

  -- Insert eligibility criteria for Photography Challenge
  INSERT INTO competition_eligibility (competition_id, criteria) VALUES
  (photo_comp_id, 'Open to amateur photographers only'),
  (photo_comp_id, 'Must be a resident of participating countries'),
  (photo_comp_id, 'Previous winners not eligible');

  -- Insert eligibility criteria for Tech Sweepstakes
  INSERT INTO competition_eligibility (competition_id, criteria) VALUES
  (tech_comp_id, 'Must be 18 or older'),
  (tech_comp_id, 'Valid shipping address required'),
  (tech_comp_id, 'Employees not eligible');

  -- Insert eligibility criteria for Eco Challenge
  INSERT INTO competition_eligibility (competition_id, criteria) VALUES
  (eco_comp_id, 'Open to professional designers and students'),
  (eco_comp_id, 'Must have experience with sustainable materials'),
  (eco_comp_id, 'Teams of up to 3 people allowed');
END $$;