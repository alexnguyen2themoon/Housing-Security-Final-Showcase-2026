import { useState, useEffect } from "react";
import { supabase } from "../lib/supabase";

export function useHousingResources() {
  const [resources, setResources] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchResources = async () => {
    try {
      setLoading(true);
      // Fetches resources AND joins their resource_reviews automatically
      const { data, error } = await supabase
        .from("housing_resources")
        .select(`
          *,
          resource_reviews (
            id,
            rating,
            comment,
            reviewer_name,
            created_at
          )
        `);

      if (error) throw error;
      setResources(data || []);
    } catch (err) {
      console.error("Error fetching housing resources:", err.message);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchResources();
  }, []);

  return { resources, loading, error, refetch: fetchResources };
}