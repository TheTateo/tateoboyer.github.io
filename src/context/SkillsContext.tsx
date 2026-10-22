import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  type ReactNode,
} from "react";
import {
  defaultSkillCategories,
  defaultSkills,
  defaultTools,
} from "../data/defaults";
import { usePersistentState } from "../hooks/usePersistentState";
import {
  normalizeSkillCategories,
  normalizeAINames,
  normalizeSkills,
  normalizeTools,
} from "../lib/normalize";
import { STORAGE_KEYS } from "../lib/storage";
import { createId } from "../lib/utils";
import type { Skill, SkillInput } from "../types";

type SkillsContextValue = {
  skills: Skill[];
  categories: string[];
  tools: string[];
  aiNames: string[];
  addSkill: (input: SkillInput) => void;
  updateSkill: (id: string, patch: Partial<SkillInput>) => void;
  deleteSkill: (id: string) => void;
  addCategory: (name: string) => void;
  renameCategory: (name: string, nextName: string) => void;
  deleteCategory: (name: string) => void;
  addTool: (name: string) => void;
  updateTool: (name: string, nextName: string) => void;
  removeTool: (name: string) => void;
  addAIName: (name: string) => void;
  updateAIName: (name: string, nextName: string) => void;
  removeAIName: (name: string) => void;
  replaceSkills: (skills: Skill[]) => void;
  replaceCategories: (categories: string[]) => void;
  replaceTools: (tools: string[]) => void;
  replaceAINames: (names: string[]) => void;
  /** Remet les hard skills et les logiciels aux valeurs par défaut. */
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
  const [aiNames, setAINames] = usePersistentState<string[]>(
    STORAGE_KEYS.aiNames,
    [],
    normalizeAINames,
  );
  const [storedCategories, setStoredCategories] = usePersistentState<string[]>(
    STORAGE_KEYS.skillCategories,
    defaultSkillCategories,
    normalizeSkillCategories,
  );
  const categories = Array.from(
    new Set([
      ...storedCategories,
      ...skills.map((skill) => skill.category.trim()).filter(Boolean),
    ]),
  );

  const addSkill = useCallback(
    (input: SkillInput) => {
      const name = input.name.trim();
      if (!name) return;
      const category = input.category.trim();

      setSkills((current) =>
        current.some((skill) => skill.name.toLowerCase() === name.toLowerCase())
          ? current
          : [...current, { id: createId(), name, category }],
      );
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
                name: patch.name?.trim() ?? skill.name,
                category: patch.category ?? skill.category,
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

  const addCategory = useCallback(
    (name: string) => {
      const trimmed = name.trim();
      if (!trimmed) return;

      setStoredCategories((current) =>
        current.some(
          (category) => category.toLowerCase() === trimmed.toLowerCase(),
        )
          ? current
          : [...current, trimmed],
      );
    },
    [setStoredCategories],
  );

  const deleteCategory = useCallback(
    (name: string) => {
      setStoredCategories((current) =>
        current.filter((category) => category !== name),
      );
      setSkills((current) =>
        current.map((skill) =>
          skill.category === name ? { ...skill, category: "" } : skill,
        ),
      );
    },
    [setSkills, setStoredCategories],
  );

  const renameCategory = useCallback(
    (name: string, nextName: string) => {
      const trimmed = nextName.trim();
      if (!trimmed) return;

      const duplicate = categories.some(
        (category) =>
          category !== name && category.toLowerCase() === trimmed.toLowerCase(),
      );
      if (duplicate) return;

      setStoredCategories((current) =>
        current.map((category) => (category === name ? trimmed : category)),
      );
      setSkills((current) =>
        current.map((skill) =>
          skill.category === name ? { ...skill, category: trimmed } : skill,
        ),
      );
    },
    [categories, setSkills, setStoredCategories],
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

  const updateTool = useCallback(
    (name: string, nextName: string) => {
      const trimmed = nextName.trim();
      if (!trimmed) return;

      setTools((current) =>
        current.some(
          (tool) =>
            tool !== name && tool.toLowerCase() === trimmed.toLowerCase(),
        )
          ? current
          : current.map((tool) => (tool === name ? trimmed : tool)),
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

  const addAIName = useCallback(
    (name: string) => {
      const trimmed = name.trim();
      if (!trimmed) return;

      setAINames((current) =>
        current.some((item) => item.toLowerCase() === trimmed.toLowerCase())
          ? current
          : [...current, trimmed],
      );
    },
    [setAINames],
  );

  const updateAIName = useCallback(
    (name: string, nextName: string) => {
      const trimmed = nextName.trim();
      if (!trimmed) return;

      setAINames((current) =>
        current.some(
          (item) => item !== name && item.toLowerCase() === trimmed.toLowerCase(),
        )
          ? current
          : current.map((item) => (item === name ? trimmed : item)),
      );
    },
    [setAINames],
  );

  const removeAIName = useCallback(
    (name: string) => {
      setAINames((current) => current.filter((item) => item !== name));
    },
    [setAINames],
  );

  const replaceSkills = useCallback(
    (next: Skill[]) => setSkills(next),
    [setSkills],
  );

  const replaceCategories = useCallback(
    (next: string[]) => setStoredCategories(normalizeSkillCategories(next)),
    [setStoredCategories],
  );

  const replaceTools = useCallback(
    (next: string[]) => setTools(next),
    [setTools],
  );

  const replaceAINames = useCallback(
    (next: string[]) => setAINames(normalizeAINames(next)),
    [setAINames],
  );

  const resetSkills = useCallback(() => {
    setSkills(defaultSkills);
    setTools(defaultTools);
    setAINames([]);
    setStoredCategories(defaultSkillCategories);
  }, [setSkills, setTools, setAINames, setStoredCategories]);

  const value = useMemo(
    () => ({
      skills,
      categories,
      tools,
      aiNames,
      addSkill,
      updateSkill,
      deleteSkill,
      addCategory,
      renameCategory,
      deleteCategory,
      addTool,
      updateTool,
      removeTool,
      addAIName,
      updateAIName,
      removeAIName,
      replaceSkills,
      replaceCategories,
      replaceTools,
      replaceAINames,
      resetSkills,
    }),
    [
      skills,
      categories,
      tools,
      aiNames,
      addSkill,
      updateSkill,
      deleteSkill,
      addCategory,
      renameCategory,
      deleteCategory,
      addTool,
      updateTool,
      removeTool,
      addAIName,
      updateAIName,
      removeAIName,
      replaceSkills,
      replaceCategories,
      replaceTools,
      replaceAINames,
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
