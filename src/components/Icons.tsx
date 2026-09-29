export function Mark() {
  return (
    <svg viewBox="0 0 44 44" className="h-8 w-8" aria-hidden="true">
      <path d="M22 2 42 13v18L22 42 2 31V13Z" fill="none" stroke="currentColor" />
      <path d="m22 9 8 13-8 13-8-13Z" fill="currentColor" />
      <circle cx="22" cy="22" r="3.5" fill="#080a0d" />
    </svg>
  );
}

export function Arrow({ diagonal = false }: { diagonal?: boolean }) {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4" aria-hidden="true">
      {diagonal ? (
        <path d="M7 17 17 7m-8 0h8v8" fill="none" stroke="currentColor" strokeWidth="1.5" />
      ) : (
        <path d="M4 12h15m-5-5 5 5-5 5" fill="none" stroke="currentColor" strokeWidth="1.5" />
      )}
    </svg>
  );
}
