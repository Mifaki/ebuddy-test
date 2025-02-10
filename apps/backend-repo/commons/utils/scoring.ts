import { User } from "../../schemas/types/user";

export const calculatePotentialScore = (user: User): number => {
  const now = Date.now();
  const daysSinceLastActive = (now - user.recentlyActive) / (1000 * 60 * 60 * 24);
  
  const RATING_WEIGHT = 0.5;   
  const RENTS_WEIGHT = 0.3;    
  const ACTIVITY_WEIGHT = 0.2; 
  
  // Normalize ratings (assuming ratings are 0-5)
  const normalizedRating = user.totalAverageWeightRatings / 5;
  
  // Normalize number of rents (using log scale to handle large numbers) ASSUMING 100 IS A HIGH NUMBER OF RENTS
  const normalizedRents = Math.log10(user.numberOfRents + 1) / Math.log10(100); 
  
  // Normalize recency (exponential decay)
  const activityScore = Math.exp(-daysSinceLastActive / 30);
  
  // Calculate final score (0-1 scale)
  const score = (
    normalizedRating * RATING_WEIGHT +
    normalizedRents * RENTS_WEIGHT +
    activityScore * ACTIVITY_WEIGHT
  );
  
  return score;
};