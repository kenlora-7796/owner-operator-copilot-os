"use client";

import { FormEvent, useMemo, useState } from "react";

import { BusinessIntelligenceDashboard } from "@/components/business-intelligence/business-intelligence-dashboard";
import {
  calculateExpenseSummary,
  calculateFinancialMetrics,
  calculateProfitabilityMetrics,
  generateAICFORecommendation,
} from "@/lib/finance";

interface LoadAnalysisFormState {
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

const INITIAL_FORM_STATE: LoadAnalysisFormState = {
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
  const expenses = calculateExpenseSummary({
    fuel: parseNonNegativeNumber(formState.fuel, "Fuel"),
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
    def: parseNonNegativeNumber(formState.def, "DEF"),
    tolls: parseNonNegativeNumber(formState.tolls, "Tolls"),
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

  const profitabilityMetrics = calculateProfitabilityMetrics({
    financialMetrics,
    targetProfitMargin: parseNonNegativeNumber(
      formState.targetProfitMargin,
      "Target profit margin",
    ),
  });

  const aiRecommendation = generateAICFORecommendation({
    financialMetrics,
    profitabilityMetrics,
  });

  return {
    financialMetrics,
    profitabilityMetrics,
    aiRecommendation,
  };
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

export function LoadAnalysisWorkspace() {
  const [formState, setFormState] =
    useState<LoadAnalysisFormState>(INITIAL_FORM_STATE);

  const [submittedFormState, setSubmittedFormState] =
    useState<LoadAnalysisFormState>(INITIAL_FORM_STATE);

  const [errorMessage, setErrorMessage] =
    useState<string | null>(null);

  const analysis = useMemo(
    () => calculateLoadAnalysis(submittedFormState),
    [submittedFormState],
  );

  function handleFieldChange(
    name: keyof LoadAnalysisFormState,
    value: string,
  ) {
    setFormState((currentState) => ({
      ...currentState,
      [name]: value,
    }));
  }

  function handleSubmit(
    event: FormEvent<HTMLFormElement>,
  ) {
    event.preventDefault();

    try {
      calculateLoadAnalysis(formState);
      setSubmittedFormState({ ...formState });
      setErrorMessage(null);
    } catch (error) {
      setErrorMessage(
        error instanceof Error
          ? error.message
          : "Unable to analyze this load.",
      );
    }
  }

  function handleReset() {
    setFormState(INITIAL_FORM_STATE);
    setSubmittedFormState(INITIAL_FORM_STATE);
    setErrorMessage(null);
  }

  return (
    <div className="min-h-screen bg-slate-950">
      <section className="border-b border-white/10 bg-slate-950">
        <div className="mx-auto w-full max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
          <div className="rounded-3xl border border-white/10 bg-slate-900/70 p-6 shadow-xl shadow-black/10 sm:p-8">
            <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.22em] text-emerald-400">
                  Load Analysis
                </p>

                <h1 className="mt-3 text-3xl font-semibold tracking-tight text-white">
                  Analyze a Load
                </h1>

                <p className="mt-3 max-w-3xl text-sm leading-6 text-slate-400">
                  Enter projected revenue, mileage and load expenses
                  to receive financial intelligence and an AI CFO
                  recommendation.
                </p>
              </div>

              <button
                type="button"
                onClick={handleReset}
                className="w-fit rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-sm font-semibold text-slate-300 transition hover:bg-white/10 hover:text-white"
              >
                Reset sample data
              </button>
            </div>

            <form
              onSubmit={handleSubmit}
              className="mt-8"
            >
              <section>
                <h2 className="text-lg font-semibold text-white">
                  Load Details
                </h2>

                <div className="mt-4 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
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
                    description="Desired profit percentage."
                    onChange={handleFieldChange}
                  />
                </div>
              </section>

              <section className="mt-8 border-t border-white/10 pt-8">
                <h2 className="text-lg font-semibold text-white">
                  Projected Load Expenses
                </h2>

                <p className="mt-2 text-sm leading-6 text-slate-500">
                  Enter the portion of each operating expense assigned
                  to this load.
                </p>

                <div className="mt-5 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
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

              <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
                <button
                  type="submit"
                  className="rounded-xl bg-emerald-400 px-6 py-3 text-sm font-semibold text-slate-950 transition hover:bg-emerald-300"
                >
                  Analyze Load
                </button>

                <p className="text-xs leading-5 text-slate-500">
                  Results are estimates and should be compared with
                  actual operating records.
                </p>
              </div>
            </form>
          </div>
        </div>
      </section>

      <BusinessIntelligenceDashboard
        financialMetrics={analysis.financialMetrics}
        profitabilityMetrics={analysis.profitabilityMetrics}
        aiRecommendation={analysis.aiRecommendation}
      />
    </div>
  );
}