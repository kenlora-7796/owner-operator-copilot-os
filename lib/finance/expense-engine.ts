import type {
  ExpenseCategory,
  ExpenseClassification,
  ExpenseInput,
  ExpenseItem,
  ExpenseSummary,
  FuelExpenseInput,
} from "./types";

const EXPENSE_DEFINITIONS: Record<
  ExpenseCategory,
  {
    classification: ExpenseClassification;
    description: string;
  }
> = {
  fuel: {
    classification: "variable",
    description: "Diesel fuel expense",
  },
  maintenance: {
    classification: "variable",
    description: "Truck and trailer maintenance expense",
  },
  insurance: {
    classification: "fixed",
    description: "Commercial insurance expense",
  },
  truckPayment: {
    classification: "fixed",
    description: "Truck payment or lease expense",
  },
  trailerPayment: {
    classification: "fixed",
    description: "Trailer payment or lease expense",
  },
  def: {
    classification: "variable",
    description: "Diesel exhaust fluid expense",
  },
  tolls: {
    classification: "variable",
    description: "Route toll expense",
  },
  permits: {
    classification: "fixed",
    description: "Permit and operating authority expense",
  },
  miscellaneous: {
    classification: "variable",
    description: "Other operating expense",
  },
};

function validateAmount(amount: number, fieldName: string): number {
  if (!Number.isFinite(amount)) {
    throw new Error(`${fieldName} must be a valid number.`);
  }

  if (amount < 0) {
    throw new Error(`${fieldName} cannot be negative.`);
  }

  return amount;
}

function roundCurrency(value: number): number {
  return Math.round((value + Number.EPSILON) * 100) / 100;
}

function createExpenseItem(
  category: ExpenseCategory,
  amount: number,
): ExpenseItem {
  const definition = EXPENSE_DEFINITIONS[category];

  return {
    category,
    classification: definition.classification,
    amount: roundCurrency(amount),
    description: definition.description,
  };
}

export function calculateFuelExpense(input: FuelExpenseInput): number {
  const gallonsUsed = validateAmount(input.gallonsUsed, "Gallons used");
  const fuelPricePerGallon = validateAmount(
    input.fuelPricePerGallon,
    "Fuel price per gallon",
  );

  return roundCurrency(gallonsUsed * fuelPricePerGallon);
}

export function calculateExpenseSummary(
  input: ExpenseInput,
): ExpenseSummary {
  const rawExpenses: Record<ExpenseCategory, number> = {
    fuel: input.fuel ?? 0,
    maintenance: input.maintenance ?? 0,
    insurance: input.insurance ?? 0,
    truckPayment: input.truckPayment ?? 0,
    trailerPayment: input.trailerPayment ?? 0,
    def: input.def ?? 0,
    tolls: input.tolls ?? 0,
    permits: input.permits ?? 0,
    miscellaneous: input.miscellaneous ?? 0,
  };

  const items = (
    Object.entries(rawExpenses) as Array<[ExpenseCategory, number]>
  ).map(([category, amount]) => {
    const validatedAmount = validateAmount(amount, category);

    return createExpenseItem(category, validatedAmount);
  });

  const variableExpenses = items
    .filter((item) => item.classification === "variable")
    .reduce((total, item) => total + item.amount, 0);

  const fixedExpenses = items
    .filter((item) => item.classification === "fixed")
    .reduce((total, item) => total + item.amount, 0);

  return {
    items,
    variableExpenses: roundCurrency(variableExpenses),
    fixedExpenses: roundCurrency(fixedExpenses),
    totalOperatingExpenses: roundCurrency(
      variableExpenses + fixedExpenses,
    ),
  };
}