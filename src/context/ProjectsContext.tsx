import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  type ReactNode,
} from "react";
import { defaultProjects } from "../data/defaults";
import { usePersistentState } from "../hooks/usePersistentState";
import { normalizeProjects } from "../lib/normalize";
import { STORAGE_KEYS } from "../lib/storage";
import { createId, moveItem } from "../lib/utils";
import type { Project, ProjectInput } from "../types";

type ProjectsContextValue = {
  projects: Project[];
  addProject: (input: ProjectInput) => void;
  updateProject: (id: string, input: ProjectInput) => void;
  deleteProject: (id: string) => void;
  moveProject: (id: string, direction: -1 | 1) => void;
  replaceProjects: (projects: Project[]) => void;
  resetProjects: () => void;
};

const ProjectsContext = createContext<ProjectsContextValue | null>(null);

export function ProjectsProvider({ children }: { children: ReactNode }) {
  const [projects, setProjects] = usePersistentState<Project[]>(
    STORAGE_KEYS.projects,
    defaultProjects,
    normalizeProjects,
  );

  const addProject = useCallback(
    (input: ProjectInput) => {
      setProjects((current) => [...current, { ...input, id: createId() }]);
    },
    [setProjects],
  );

  const updateProject = useCallback(
    (id: string, input: ProjectInput) => {
      setProjects((current) =>
        current.map((project) =>
          project.id === id ? { ...project, ...input } : project,
        ),
      );
    },
    [setProjects],
  );

  const deleteProject = useCallback(
    (id: string) => {
      setProjects((current) => current.filter((project) => project.id !== id));
    },
    [setProjects],
  );

  const moveProject = useCallback(
    (id: string, direction: -1 | 1) => {
      setProjects((current) => moveItem(current, id, direction));
    },
    [setProjects],
  );

  const replaceProjects = useCallback(
    (next: Project[]) => setProjects(next),
    [setProjects],
  );

  const resetProjects = useCallback(
    () => setProjects(defaultProjects),
    [setProjects],
  );

  const value = useMemo(
    () => ({
      projects,
      addProject,
      updateProject,
      deleteProject,
      moveProject,
      replaceProjects,
      resetProjects,
    }),
    [
      projects,
      addProject,
      updateProject,
      deleteProject,
      moveProject,
      replaceProjects,
      resetProjects,
    ],
  );

  return (
    <ProjectsContext.Provider value={value}>
      {children}
    </ProjectsContext.Provider>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export function useProjects(): ProjectsContextValue {
  const context = useContext(ProjectsContext);
  if (!context) {
    throw new Error("useProjects doit être utilisé dans <ProjectsProvider>");
  }
  return context;
}
