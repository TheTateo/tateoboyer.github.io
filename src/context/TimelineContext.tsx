import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  type ReactNode,
} from "react";
import { defaultTimeline } from "../data/defaults";
import { useSupabaseState } from "../hooks/useSupabaseState";
import { normalizeTimeline } from "../lib/normalize";
import { STORAGE_KEYS } from "../lib/storage";
import { createId, moveItem } from "../lib/utils";
import type { TimelineEntry, TimelineEntryInput } from "../types";

type TimelineContextValue = {
  entries: TimelineEntry[];
  addEntry: (input: TimelineEntryInput) => void;
  updateEntry: (id: string, input: TimelineEntryInput) => void;
  deleteEntry: (id: string) => void;
  moveEntry: (id: string, direction: -1 | 1) => void;
  replaceEntries: (entries: TimelineEntry[]) => void;
  resetEntries: () => void;
};

const TimelineContext = createContext<TimelineContextValue | null>(null);

export function TimelineProvider({ children }: { children: ReactNode }) {
  const [entries, setEntries] = useSupabaseState<TimelineEntry[]>(
    STORAGE_KEYS.timeline,
    defaultTimeline,
    normalizeTimeline,
  );

  const addEntry = useCallback(
    (input: TimelineEntryInput) => {
      setEntries((current) => [...current, { ...input, id: createId() }]);
    },
    [setEntries],
  );

  const updateEntry = useCallback(
    (id: string, input: TimelineEntryInput) => {
      setEntries((current) =>
        current.map((entry) =>
          entry.id === id ? { ...input, id: entry.id } : entry,
        ),
      );
    },
    [setEntries],
  );

  const deleteEntry = useCallback(
    (id: string) => {
      setEntries((current) => current.filter((entry) => entry.id !== id));
    },
    [setEntries],
  );

  const moveEntry = useCallback(
    (id: string, direction: -1 | 1) => {
      setEntries((current) => moveItem(current, id, direction));
    },
    [setEntries],
  );

  const replaceEntries = useCallback(
    (next: TimelineEntry[]) => setEntries(next),
    [setEntries],
  );

  const resetEntries = useCallback(
    () => setEntries(defaultTimeline),
    [setEntries],
  );

  const value = useMemo(
    () => ({
      entries,
      addEntry,
      updateEntry,
      deleteEntry,
      moveEntry,
      replaceEntries,
      resetEntries,
    }),
    [
      entries,
      addEntry,
      updateEntry,
      deleteEntry,
      moveEntry,
      replaceEntries,
      resetEntries,
    ],
  );

  return (
    <TimelineContext.Provider value={value}>
      {children}
    </TimelineContext.Provider>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export function useTimeline(): TimelineContextValue {
  const context = useContext(TimelineContext);
  if (!context) {
    throw new Error("useTimeline doit être utilisé dans <TimelineProvider>");
  }
  return context;
}
