import {
  createContext,
  useContext,
  useMemo,
  type ReactNode,
} from "react";
import type { Technology } from "../types";
import { usePersistentState } from "../hooks/usePersistentState";

const TECHNOLOGIES_STORAGE_KEY = "portfolio-technologies";

const normalizeTechnologies = (raw: unknown): Technology[] => {
  if (!Array.isArray(raw)) return [];

  return raw.filter(
    (item): item is Technology =>
      typeof item === "object" &&
      item !== null &&
      typeof (item as Technology).id === "string" &&
      typeof (item as Technology).name === "string",
  );
};

type TechnologiesContextValue = {
  technologies: Technology[];
  addTechnology: (name: string) => void;
  removeTechnology: (id: string) => void;
  updateTechnology: (id: string, name: string) => void;
};

const TechnologiesContext = createContext<
  TechnologiesContextValue | undefined
>(undefined);

type TechnologiesProviderProps = {
  children: ReactNode;
};

export function TechnologiesProvider({
  children,
}: TechnologiesProviderProps) {
  const [technologies, setTechnologies] = usePersistentState<Technology[]>(
    TECHNOLOGIES_STORAGE_KEY,
    [],
    normalizeTechnologies,
  );

    const addTechnology = (name: string) => {
    const trimmedName = name.trim();

    if (!trimmedName) return;

    const alreadyExists = technologies.some(
        (technology) =>
        technology.name.toLowerCase() === trimmedName.toLowerCase(),
    );

    if (alreadyExists) return;

    const newTechnology: Technology = {
        id: crypto.randomUUID(),
        name: trimmedName,
    };

    setTechnologies((current) => [
        ...current,
        newTechnology,
    ]);
    };

    const removeTechnology = (id: string) => {
    setTechnologies((current) =>
        current.filter((technology) => technology.id !== id),
    );
    };

    const updateTechnology = (id: string, name: string) => {
    const trimmedName = name.trim();

    if (!trimmedName) return;

    setTechnologies((current) =>
        current.map((technology) =>
        technology.id === id
            ? { ...technology, name: trimmedName }
            : technology,
        ),
    );
    };

  const value = useMemo(
    () => ({
        technologies,
        addTechnology,
        removeTechnology,
        updateTechnology,
  }),
  [technologies],
);

  return (
    <TechnologiesContext.Provider value={value}>
      {children}
    </TechnologiesContext.Provider>
  );
}

export function useTechnologies() {
  const context = useContext(TechnologiesContext);

  if (!context) {
    throw new Error(
      "useTechnologies must be used inside TechnologiesProvider",
    );
  }

  return context;
}