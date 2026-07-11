"use client";

import {
  FormEvent,
  useMemo,
  useRef,
  useState,
} from "react";

import {
  calculateExpenseSummary,
  calculateFinancialMetrics,
  calculateProfitabilityMetrics,
  generateAICFORecommendation,
} from "@/lib/finance";

import { saveLoadAnalysis } from "@/lib/loads";

import { RouteIntelligenceWorkspace } from "./workspace";

interface LoadAnalysisFormState {
  origin: string;
  destination: string;
  revenue: string;
  loadedMiles: string;
  deadheadMiles: string;
  fuel: string;
  maintenance: string;
  insurance: string;
  truckPayment: string;
  trailerPayment: string;
  def: string;
  tolls: string;
  permits: string;
  miscellaneous: string;
  targetProfitMargin: string;
}

interface TextFieldProps {
  label: string;
  name: keyof LoadAnalysisFormState;
  value: string;
  description?: string;
  placeholder?: string;
  onChange: (
    name: keyof LoadAnalysisFormState,
    value: string,
  ) => void;
}

interface NumberFieldProps {
  label: string;
  name: keyof LoadAnalysisFormState;
  value: string;
  description?: string;
  step?: string;
  onChange: (
    name: keyof LoadAnalysisFormState,
    value: string,
  ) => void;
}

const LOAD_HISTORY_UPDATED_EVENT =
  "load-history-updated";

const INITIAL_FORM_STATE: LoadAnalysisFormState = {
  origin: "Jackson, MS",
  destination: "Atlanta, GA",
  revenue: "2850",
  loadedMiles: "920",
  deadheadMiles: "110",
  fuel: "465",
  maintenance: "135",
  insurance: "185",
  truckPayment: "240",
  trailerPayment: "95",
  def: "38",
  tolls: "42",
  permits: "25",
  miscellaneous: "55",
  targetProfitMargin: "20",
};

const EMPTY_FORM_STATE: LoadAnalysisFormState = {
  origin: "",
  destination: "",
  revenue: "",
  loadedMiles: "",
  deadheadMiles: "",
  fuel: "",
  maintenance: "",
  insurance: "",
  truckPayment: "",
  trailerPayment: "",
  def: "",
  tolls: "",
  permits: "",
  miscellaneous: "",
  targetProfitMargin: "20",
};

function parseRequiredText(
  value: string,
  fieldName: string,
): string {
  const normalizedValue = value.trim();

  if (normalizedValue.length === 0) {
    throw new Error(`${fieldName} is required.`);
  }

  return normalizedValue;
}

function parseNonNegativeNumber(
  value: string,
  fieldName: string,
): number {
  if (value.trim() === "") {
    throw new Error(`${fieldName} is required.`);
  }

  const parsedValue = Number(value);

  if (!Number.isFinite(parsedValue)) {
    throw new Error(`${fieldName} must be a valid number.`);
  }

  if (parsedValue < 0) {
    throw new Error(`${fieldName} cannot be negative.`);
  }

  return parsedValue;
}

function calculateLoadAnalysis(
  formState: LoadAnalysisFormState,
) {
  const route = {
    origin: parseRequiredText(
      formState.origin,
      "Origin",
    ),
    destination: parseRequiredText(
      formState.destination,
      "Destination",
    ),
  };

  const expenses = calculateExpenseSummary({
    fuel: parseNonNegativeNumber(
      formState.fuel,
      "Fuel",
    ),
    maintenance: parseNonNegativeNumber(
      formState.maintenance,
      "Maintenance",
    ),
    insurance: parseNonNegativeNumber(
      formState.insurance,
      "Insurance",
    ),
    truckPayment: parseNonNegativeNumber(
      formState.truckPayment,
      "Truck payment",
    ),
    trailerPayment: parseNonNegativeNumber(
      formState.trailerPayment,
      "Trailer payment",
    ),
    def: parseNonNegativeNumber(
      formState.def,
      "DEF",
    ),
    tolls: parseNonNegativeNumber(
      formState.tolls,
      "Tolls",
    ),
    permits: parseNonNegativeNumber(
      formState.permits,
      "Permits",
    ),
    miscellaneous: parseNonNegativeNumber(
      formState.miscellaneous,
      "Miscellaneous expenses",
    ),
  });

  const financialMetrics = calculateFinancialMetrics({
    revenue: parseNonNegativeNumber(
      formState.revenue,
      "Load revenue",
    ),
    loadedMiles: parseNonNegativeNumber(
      formState.loadedMiles,
      "Loaded miles",
    ),
    deadheadMiles: parseNonNegativeNumber(
      formState.deadheadMiles,
      "Deadhead miles",
    ),
    expenses,
  });

  const profitabilityMetrics =
    calculateProfitabilityMetrics({
      financialMetrics,
      targetProfitMargin: parseNonNegativeNumber(
        formState.targetProfitMargin,
        "Target profit margin",
      ),
    });

  const aiRecommendation =
    generateAICFORecommendation({
      financialMetrics,
      profitabilityMetrics,
    });

  return {
    route,
    financialMetrics,
    profitabilityMetrics,
    aiRecommendation,
  };
}

function TextField({
  label,
  name,
  value,
  description,
  placeholder,
  onChange,
}: TextFieldProps) {
  return (
    <label className="block">
      <span className="text-sm font-medium text-slate-200">
        {label}
      </span>

      <input
        type="text"
        value={value}
        placeholder={placeholder}
        onChange={(event) =>
          onChange(name, event.target.value)
        }
        className="mt-2 w-full rounded-xl border border-white/10 bg-slate-950 px-4 py-3 text-sm text-white outline-none transition placeholder:text-slate-600 focus:border-emerald-400/60 focus:ring-2 focus:ring-emerald-400/10"
      />

      {description ? (
        <span className="mt-2 block text-xs leading-5 text-slate-500">
          {description}
        </span>
      ) : null}
    </label>
  );
}

function NumberField({
  label,
  name,
  value,
  description,
  step = "0.01",
  onChange,
}: NumberFieldProps) {
  return (
    <label className="block">
      <span className="text-sm font-medium text-slate-200">
        {label}
      </span>

      <input
        type="number"
        min="0"
        step={step}
        value={value}
        onChange={(event) =>
          onChange(name, event.target.value)
        }
        className="mt-2 w-full rounded-xl border border-white/10 bg-slate-950 px-4 py-3 text-sm text-white outline-none transition focus:border-emerald-400/60 focus:ring-2 focus:ring-emerald-400/10"
      />

      {description ? (
        <span className="mt-2 block text-xs leading-5 text-slate-500">
          {description}
        </span>
      ) : null}
    </label>
  );
}

export function InteractiveRouteIntelligenceWorkspace() {
  const [formState, setFormState] =
    useState<LoadAnalysisFormState>(
      INITIAL_FORM_STATE,
    );

  const [submittedFormState, setSubmittedFormState] =
    useState<LoadAnalysisFormState>(
      INITIAL_FORM_STATE,
    );

  const [errorMessage, setErrorMessage] =
    useState<string | null>(null);

  const [successMessage, setSuccessMessage] =
    useState<string | null>(null);

  const [saveMessage, setSaveMessage] =
    useState<string | null>(null);

  const resultsRef = useRef<HTMLDivElement>(null);

  const analysis = useMemo(
    () => calculateLoadAnalysis(submittedFormState),
    [submittedFormState],
  );

  const hasUnanalyzedChanges =
    JSON.stringify(formState) !==
    JSON.stringify(submittedFormState);

  function handleFieldChange(
    name: keyof LoadAnalysisFormState,
    value: string,
  ) {
    setFormState((currentState) => ({
      ...currentState,
      [name]: value,
    }));

    setSuccessMessage(null);
    setSaveMessage(null);
  }

  function handleSubmit(
    event: FormEvent<HTMLFormElement>,
  ) {
    event.preventDefault();

    try {
      calculateLoadAnalysis(formState);

      setSubmittedFormState({
        ...formState,
      });

      setErrorMessage(null);
      setSaveMessage(null);
      setSuccessMessage(
        "Load analysis updated successfully.",
      );

      window.setTimeout(() => {
        resultsRef.current?.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }, 100);
    } catch (error) {
      setSuccessMessage(null);
      setSaveMessage(null);

      setErrorMessage(
        error instanceof Error
          ? error.message
          : "Unable to analyze this load.",
      );
    }
  }

  function handleSaveAnalysis() {
    try {
      if (hasUnanalyzedChanges) {
        throw new Error(
          "Analyze the latest changes before saving this load.",
        );
      }

      saveLoadAnalysis({
        route: analysis.route,
        financialMetrics: analysis.financialMetrics,
        profitabilityMetrics:
          analysis.profitabilityMetrics,
        aiRecommendation: analysis.aiRecommendation,
      });

      window.dispatchEvent(
        new Event(LOAD_HISTORY_UPDATED_EVENT),
      );

      setErrorMessage(null);
      setSaveMessage(
        `${analysis.route.origin} → ${analysis.route.destination} was saved.`,
      );
    } catch (error) {
      setSaveMessage(null);

      setErrorMessage(
        error instanceof Error
          ? error.message
          : "Unable to save this load analysis.",
      );
    }
  }

  function handleReset() {
    setFormState(INITIAL_FORM_STATE);
    setSubmittedFormState(INITIAL_FORM_STATE);
    setErrorMessage(null);
    setSuccessMessage(null);
    setSaveMessage(null);
  }

  function handleNewLoad() {
    setFormState(EMPTY_FORM_STATE);
    setErrorMessage(null);
    setSuccessMessage(null);
    setSaveMessage(null);

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }

  return (
    <RouteIntelligenceWorkspace
      financialMetrics={analysis.financialMetrics}
      profitabilityMetrics={
        analysis.profitabilityMetrics
      }
      aiRecommendation={analysis.aiRecommendation}
      onNewLoad={handleNewLoad}
      resultsRef={resultsRef}
    >
      <section
        id="load-analysis-form"
        className="rounded-3xl border border-white/10 bg-slate-900/60 p-5 sm:p-6"
      >
        <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-emerald-400">
              Load Input
            </p>

            <h3 className="mt-2 text-xl font-semibold text-white">
              Build the active load analysis
            </h3>

            <p className="mt-2 max-w-3xl text-sm leading-6 text-slate-400">
              Enter the route, projected revenue, mileage and
              operating expenses. The system will evaluate the
              load and generate an AI CFO decision.
            </p>
          </div>

          <button
            type="button"
            onClick={handleReset}
            className="w-fit rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-sm font-semibold text-slate-300 transition hover:bg-white/10 hover:text-white"
          >
            Restore sample
          </button>
        </div>

        <form
          onSubmit={handleSubmit}
          className="mt-8"
        >
          <section>
            <h4 className="text-sm font-semibold uppercase tracking-widest text-slate-500">
              Route details
            </h4>

            <div className="mt-4 grid gap-5 sm:grid-cols-2">
              <TextField
                label="Origin"
                name="origin"
                value={formState.origin}
                placeholder="Jackson, MS"
                description="Pickup city and state."
                onChange={handleFieldChange}
              />

              <TextField
                label="Destination"
                name="destination"
                value={formState.destination}
                placeholder="Atlanta, GA"
                description="Delivery city and state."
                onChange={handleFieldChange}
              />
            </div>
          </section>

          <section className="mt-8 border-t border-white/10 pt-8">
            <h4 className="text-sm font-semibold uppercase tracking-widest text-slate-500">
              Load economics
            </h4>

            <div className="mt-4 grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
              <NumberField
                label="Load Revenue"
                name="revenue"
                value={formState.revenue}
                description="Gross amount offered for the load."
                onChange={handleFieldChange}
              />

              <NumberField
                label="Loaded Miles"
                name="loadedMiles"
                value={formState.loadedMiles}
                step="1"
                description="Paid freight miles."
                onChange={handleFieldChange}
              />

              <NumberField
                label="Deadhead Miles"
                name="deadheadMiles"
                value={formState.deadheadMiles}
                step="1"
                description="Unpaid miles connected to the load."
                onChange={handleFieldChange}
              />

              <NumberField
                label="Target Profit Margin"
                name="targetProfitMargin"
                value={formState.targetProfitMargin}
                description="Desired percentage retained as profit."
                onChange={handleFieldChange}
              />
            </div>
          </section>

          <section className="mt-8 border-t border-white/10 pt-8">
            <h4 className="text-sm font-semibold uppercase tracking-widest text-slate-500">
              Load expense allocation
            </h4>

            <p className="mt-2 text-sm leading-6 text-slate-500">
              Enter the portion of each operating expense
              assigned to this specific load.
            </p>

            <div className="mt-5 grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
              <NumberField
                label="Fuel"
                name="fuel"
                value={formState.fuel}
                onChange={handleFieldChange}
              />

              <NumberField
                label="Maintenance"
                name="maintenance"
                value={formState.maintenance}
                onChange={handleFieldChange}
              />

              <NumberField
                label="Insurance Allocation"
                name="insurance"
                value={formState.insurance}
                onChange={handleFieldChange}
              />

              <NumberField
                label="Truck Payment Allocation"
                name="truckPayment"
                value={formState.truckPayment}
                onChange={handleFieldChange}
              />

              <NumberField
                label="Trailer Payment Allocation"
                name="trailerPayment"
                value={formState.trailerPayment}
                onChange={handleFieldChange}
              />

              <NumberField
                label="DEF"
                name="def"
                value={formState.def}
                onChange={handleFieldChange}
              />

              <NumberField
                label="Tolls"
                name="tolls"
                value={formState.tolls}
                onChange={handleFieldChange}
              />

              <NumberField
                label="Permits"
                name="permits"
                value={formState.permits}
                onChange={handleFieldChange}
              />

              <NumberField
                label="Miscellaneous"
                name="miscellaneous"
                value={formState.miscellaneous}
                onChange={handleFieldChange}
              />
            </div>
          </section>

          {errorMessage ? (
            <div
              role="alert"
              className="mt-6 rounded-2xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-200"
            >
              {errorMessage}
            </div>
          ) : null}

          {successMessage ? (
            <div
              role="status"
              className="mt-6 rounded-2xl border border-emerald-400/20 bg-emerald-400/10 px-4 py-3 text-sm text-emerald-200"
            >
              {successMessage}
            </div>
          ) : null}

          {saveMessage ? (
            <div
              role="status"
              className="mt-6 rounded-2xl border border-sky-400/20 bg-sky-400/10 px-4 py-3 text-sm text-sky-200"
            >
              {saveMessage}
            </div>
          ) : null}

          <div className="mt-8 flex flex-col gap-3 lg:flex-row lg:items-center">
            <div className="flex flex-col gap-3 sm:flex-row">
              <button
                type="submit"
                className="rounded-xl bg-emerald-400 px-6 py-3 text-sm font-semibold text-slate-950 transition hover:bg-emerald-300"
              >
                Analyze Active Load
              </button>

              <button
                type="button"
                onClick={handleSaveAnalysis}
                disabled={hasUnanalyzedChanges}
                className="rounded-xl border border-sky-400/30 bg-sky-400/10 px-6 py-3 text-sm font-semibold text-sky-200 transition hover:bg-sky-400/20 disabled:cursor-not-allowed disabled:border-white/10 disabled:bg-white/5 disabled:text-slate-600"
              >
                Save Analysis
              </button>
            </div>

            <p className="text-xs leading-5 text-slate-500">
              Analyze any changed values before saving. Results
              are estimates and should be verified against actual
              operating records.
            </p>
          </div>
        </form>
      </section>
    </RouteIntelligenceWorkspace>
  );
}