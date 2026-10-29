import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  type ReactNode,
} from "react";
import { defaultCertifications } from "../data/defaults";
import { useSupabaseState } from "../hooks/useSupabaseState";
import { normalizeCertifications } from "../lib/normalize";
import { STORAGE_KEYS } from "../lib/storage";
import { createId, moveItem } from "../lib/utils";
import type {
  CertificationBadge,
  CertificationBadgeInput,
} from "../types";

type CertificationsContextValue = {
  certifications: CertificationBadge[];
  addCertification: (input: CertificationBadgeInput) => void;
  updateCertification: (id: string, input: CertificationBadgeInput) => void;
  deleteCertification: (id: string) => void;
  moveCertification: (id: string, direction: -1 | 1) => void;
  replaceCertifications: (certifications: CertificationBadge[]) => void;
  resetCertifications: () => void;
};

const CertificationsContext =
  createContext<CertificationsContextValue | null>(null);

export function CertificationsProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [certifications, setCertifications] =
    useSupabaseState<CertificationBadge[]>(
      STORAGE_KEYS.certifications,
      defaultCertifications,
      normalizeCertifications,
    );

  const addCertification = useCallback(
    (input: CertificationBadgeInput) => {
      setCertifications((current) => [
        ...current,
        { ...input, id: createId() },
      ]);
    },
    [setCertifications],
  );

  const updateCertification = useCallback(
    (id: string, input: CertificationBadgeInput) => {
      setCertifications((current) =>
        current.map((certification) =>
          certification.id === id ? { ...input, id } : certification,
        ),
      );
    },
    [setCertifications],
  );

  const deleteCertification = useCallback(
    (id: string) => {
      setCertifications((current) =>
        current.filter((certification) => certification.id !== id),
      );
    },
    [setCertifications],
  );

  const moveCertification = useCallback(
    (id: string, direction: -1 | 1) => {
      setCertifications((current) => moveItem(current, id, direction));
    },
    [setCertifications],
  );

  const replaceCertifications = useCallback(
    (next: CertificationBadge[]) => setCertifications(next),
    [setCertifications],
  );

  const resetCertifications = useCallback(
    () => setCertifications(defaultCertifications),
    [setCertifications],
  );

  const value = useMemo(
    () => ({
      certifications,
      addCertification,
      updateCertification,
      deleteCertification,
      moveCertification,
      replaceCertifications,
      resetCertifications,
    }),
    [
      certifications,
      addCertification,
      updateCertification,
      deleteCertification,
      moveCertification,
      replaceCertifications,
      resetCertifications,
    ],
  );

  return (
    <CertificationsContext.Provider value={value}>
      {children}
    </CertificationsContext.Provider>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export function useCertifications(): CertificationsContextValue {
  const context = useContext(CertificationsContext);
  if (!context) {
    throw new Error(
      "useCertifications doit être utilisé dans <CertificationsProvider>",
    );
  }
  return context;
}
