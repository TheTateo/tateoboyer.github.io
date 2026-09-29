import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  type ReactNode,
} from "react";
import { defaultSkills, defaultTools } from "../data/defaults";
import { usePersistentState } from "../hooks/usePersistentState";
import { normalizeSkills, normalizeTools } from "../lib/normalize";
import { STORAGE_KEYS } from "../lib/storage";
import { clamp, createId, moveItem } from "../lib/utils";
import type { Skill, SkillInput } from "../types";

type SkillsContextValue = {
  skills: Skill[];
  tools: string[];
  addSkill: (input: SkillInput) => void;
  updateSkill: (id: string, patch: Partial<SkillInput>) => void;
  deleteSkill: (id: string) => void;
  moveSkill: (id: string, direction: -1 | 1) => void;
  addTool: (name: string) => void;
  removeTool: (name: string) => void;
  replaceSkills: (skills: Skill[]) => void;
  replaceTools: (tools: string[]) => void;
  /** Remet compétences ET outils aux valeurs par défaut. */
  resetSkills: () => void;
};

const SkillsContext = createContext<SkillsContextValue | null>(null);

export function SkillsProvider({ children }: { children: ReactNode }) {
  const [skills, setSkills] = usePersistentState<Skill[]>(
    STORAGE_KEYS.skills,
    defaultSkills,
    normalizeSkills,
  );
  const [tools, setTools] = usePersistentState<string[]>(
    STORAGE_KEYS.tools,
    defaultTools,
    normalizeTools,
  );

  const addSkill = useCallback(
    (input: SkillInput) => {
      setSkills((current) => [
        ...current,
        { id: createId(), name: input.name, level: clamp(input.level, 0, 100) },
      ]);
    },
    [setSkills],
  );

  const updateSkill = useCallback(
    (id: string, patch: Partial<SkillInput>) => {
      setSkills((current) =>
        current.map((skill) =>
          skill.id === id
            ? {
                ...skill,
                ...patch,
                level: clamp(patch.level ?? skill.level, 0, 100),
              }
            : skill,
        ),
      );
    },
    [setSkills],
  );

  const deleteSkill = useCallback(
    (id: string) => {
      setSkills((current) => current.filter((skill) => skill.id !== id));
    },
    [setSkills],
  );

  const moveSkill = useCallback(
    (id: string, direction: -1 | 1) => {
      setSkills((current) => moveItem(current, id, direction));
    },
    [setSkills],
  );

  const addTool = useCallback(
    (name: string) => {
      const trimmed = name.trim();
      if (!trimmed) return;

      setTools((current) =>
        current.some((tool) => tool.toLowerCase() === trimmed.toLowerCase())
          ? current
          : [...current, trimmed],
      );
    },
    [setTools],
  );

  const removeTool = useCallback(
    (name: string) => {
      setTools((current) => current.filter((tool) => tool !== name));
    },
    [setTools],
  );

  const replaceSkills = useCallback(
    (next: Skill[]) => setSkills(next),
    [setSkills],
  );

  const replaceTools = useCallback(
    (next: string[]) => setTools(next),
    [setTools],
  );

  const resetSkills = useCallback(() => {
    setSkills(defaultSkills);
    setTools(defaultTools);
  }, [setSkills, setTools]);

  const value = useMemo(
    () => ({
      skills,
      tools,
      addSkill,
      updateSkill,
      deleteSkill,
      moveSkill,
      addTool,
      removeTool,
      replaceSkills,
      replaceTools,
      resetSkills,
    }),
    [
      skills,
      tools,
      addSkill,
      updateSkill,
      deleteSkill,
      moveSkill,
      addTool,
      removeTool,
      replaceSkills,
      replaceTools,
      resetSkills,
    ],
  );

  return (
    <SkillsContext.Provider value={value}>{children}</SkillsContext.Provider>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export function useSkills(): SkillsContextValue {
  const context = useContext(SkillsContext);
  if (!context) {
    throw new Error("useSkills doit être utilisé dans <SkillsProvider>");
  }
  return context;
}
