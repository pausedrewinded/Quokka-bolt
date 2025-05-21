import { useState, useEffect, useMemo } from 'react';
import { supabase } from '../lib/supabase';
import { Competition, FilterOptions, CompetitionCategory, EntryDifficulty } from '../types/types';

export function useCompetitions() {
  const [competitions, setCompetitions] = useState<Competition[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filters, setFilters] = useState<FilterOptions>({
    category: 'All',
    prizeRange: null,
    endDate: null,
    difficulty: 'All',
    search: '',
  });

  useEffect(() => {
    fetchCompetitions();
  }, []);

  async function fetchCompetitions() {
    try {
      setLoading(true);
      
      let query = supabase
        .from('competitions')
        .select(`
          *,
          competition_requirements(requirement),
          competition_eligibility(criteria),
          saved_competitions(user_id)
        `)
        .eq('status', 'active');

      if (filters.category !== 'All') {
        query = query.eq('category', filters.category);
      }

      if (filters.difficulty !== 'All') {
        query = query.eq('entry_difficulty', filters.difficulty);
      }

      if (filters.prizeRange) {
        query = query
          .gte('prize_value', filters.prizeRange[0])
          .lte('prize_value', filters.prizeRange[1]);
      }

      if (filters.endDate) {
        query = query.lte('deadline', filters.endDate);
      }

      if (filters.search) {
        query = query.or(`title.ilike.%${filters.search}%,description.ilike.%${filters.search}%`);
      }

      const { data, error } = await query;

      if (error) throw error;

      const formattedCompetitions: Competition[] = data.map(comp => ({
        id: comp.id,
        title: comp.title,
        description: comp.description,
        imageUrl: comp.image_url,
        category: comp.category as CompetitionCategory,
        deadline: comp.deadline,
        prizeValue: Number(comp.prize_value),
        entryDifficulty: comp.entry_difficulty as EntryDifficulty,
        sponsor: comp.sponsor,
        requirements: comp.competition_requirements.map(r => r.requirement),
        eligibility: comp.competition_eligibility.map(e => e.criteria),
        entryUrl: comp.entry_url,
        isSaved: comp.saved_competitions.length > 0
      }));

      setCompetitions(formattedCompetitions);
      setError(null);
    } catch (err) {
      console.error('Error fetching competitions:', err);
      setError('Failed to load competitions');
    } finally {
      setLoading(false);
    }
  }

  const toggleSaved = async (id: string) => {
    const { data: { user } } = await supabase.auth.getUser();
    
    if (!user) {
      // Handle unauthenticated user
      return;
    }

    const existingSave = await supabase
      .from('saved_competitions')
      .select()
      .eq('competition_id', id)
      .eq('user_id', user.id)
      .single();

    if (existingSave.data) {
      await supabase
        .from('saved_competitions')
        .delete()
        .eq('competition_id', id)
        .eq('user_id', user.id);
    } else {
      await supabase
        .from('saved_competitions')
        .insert({
          competition_id: id,
          user_id: user.id
        });
    }

    // Refresh competitions to update saved status
    await fetchCompetitions();
  };

  const filteredCompetitions = useMemo(() => competitions, [competitions]);

  return {
    competitions: filteredCompetitions,
    loading,
    error,
    filters,
    setFilters,
    toggleSaved,
    refetch: fetchCompetitions
  };
}