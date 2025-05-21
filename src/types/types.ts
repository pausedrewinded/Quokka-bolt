export enum CompetitionCategory {
  SWEEPSTAKES = 'Sweepstakes',
  CONTEST = 'Contest',
  GIVEAWAY = 'Giveaway',
  PROMOTION = 'Promotion',
  RAFFLE = 'Raffle',
}

export enum EntryDifficulty {
  EASY = 'Easy',
  MEDIUM = 'Medium',
  HARD = 'Hard',
}

export interface Competition {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  category: CompetitionCategory;
  deadline: string;
  prizeValue: number;
  entryDifficulty: EntryDifficulty;
  sponsor: string;
  requirements: string[];
  eligibility: string[];
  entryUrl: string;
  isSaved?: boolean;
}

export interface FilterOptions {
  category: CompetitionCategory | 'All';
  prizeRange: [number, number] | null;
  endDate: string | null;
  difficulty: EntryDifficulty | 'All';
  search: string;
}