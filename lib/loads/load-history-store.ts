import type {
  CreateSavedLoadAnalysisInput,
  SavedLoadAnalysis,
} from "./types";

const LOAD_HISTORY_STORAGE_KEY =
  "owner-operator-copilot-os:load-history";

const MAX_SAVED_LOADS = 25;

function isBrowser(): boolean {
  return typeof window !== "undefined";
}

function createLoadId(): string {
  if (
    typeof crypto !== "undefined" &&
    typeof crypto.randomUUID === "function"
  ) {
    return crypto.randomUUID();
  }

  return `load-${Date.now()}-${Math.random()
    .toString(36)
    .slice(2, 10)}`;
}

function isSavedLoadAnalysis(
  value: unknown,
): value is SavedLoadAnalysis {
  if (!value || typeof value !== "object") {
    return false;
  }

  const candidate = value as Partial<SavedLoadAnalysis>;

  return (
    typeof candidate.id === "string" &&
    typeof candidate.createdAt === "string" &&
    typeof candidate.route?.origin === "string" &&
    typeof candidate.route?.destination === "string" &&
    typeof candidate.financialMetrics === "object" &&
    candidate.financialMetrics !== null &&
    typeof candidate.profitabilityMetrics === "object" &&
    candidate.profitabilityMetrics !== null &&
    typeof candidate.aiRecommendation === "object" &&
    candidate.aiRecommendation !== null
  );
}

function parseStoredHistory(
  storedValue: string | null,
): SavedLoadAnalysis[] {
  if (!storedValue) {
    return [];
  }

  try {
    const parsedValue: unknown = JSON.parse(storedValue);

    if (!Array.isArray(parsedValue)) {
      return [];
    }

    return parsedValue.filter(isSavedLoadAnalysis);
  } catch {
    return [];
  }
}

function writeLoadHistory(
  history: SavedLoadAnalysis[],
): void {
  if (!isBrowser()) {
    return;
  }

  window.localStorage.setItem(
    LOAD_HISTORY_STORAGE_KEY,
    JSON.stringify(history),
  );
}

export function getSavedLoadHistory(): SavedLoadAnalysis[] {
  if (!isBrowser()) {
    return [];
  }

  const storedValue = window.localStorage.getItem(
    LOAD_HISTORY_STORAGE_KEY,
  );

  return parseStoredHistory(storedValue);
}

export function saveLoadAnalysis(
  input: CreateSavedLoadAnalysisInput,
): SavedLoadAnalysis {
  const savedLoad: SavedLoadAnalysis = {
    id: createLoadId(),
    createdAt: new Date().toISOString(),
    route: {
      origin: input.route.origin.trim() || "Unknown origin",
      destination:
        input.route.destination.trim() || "Unknown destination",
    },
    financialMetrics: input.financialMetrics,
    profitabilityMetrics: input.profitabilityMetrics,
    aiRecommendation: input.aiRecommendation,
  };

  const currentHistory = getSavedLoadHistory();

  const updatedHistory = [
    savedLoad,
    ...currentHistory,
  ].slice(0, MAX_SAVED_LOADS);

  writeLoadHistory(updatedHistory);

  return savedLoad;
}

export function deleteSavedLoadAnalysis(
  loadId: string,
): SavedLoadAnalysis[] {
  const updatedHistory = getSavedLoadHistory().filter(
    (savedLoad) => savedLoad.id !== loadId,
  );

  writeLoadHistory(updatedHistory);

  return updatedHistory;
}

export function clearSavedLoadHistory(): void {
  if (!isBrowser()) {
    return;
  }

  window.localStorage.removeItem(
    LOAD_HISTORY_STORAGE_KEY,
  );
}