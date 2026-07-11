import type {
  AICFORecommendation,
  FinancialMetrics,
  ProfitabilityMetrics,
} from "@/lib/finance";

export interface SavedLoadRoute {
  origin: string;
  destination: string;
}

export interface SavedLoadAnalysis {
  id: string;
  createdAt: string;
  route: SavedLoadRoute;
  financialMetrics: FinancialMetrics;
  profitabilityMetrics: ProfitabilityMetrics;
  aiRecommendation: AICFORecommendation;
}

export interface CreateSavedLoadAnalysisInput {
  route: SavedLoadRoute;
  financialMetrics: FinancialMetrics;
  profitabilityMetrics: ProfitabilityMetrics;
  aiRecommendation: AICFORecommendation;
}