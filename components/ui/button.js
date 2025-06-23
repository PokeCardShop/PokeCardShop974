export function Button({ children, ...props }) {
  return (
    <button className="px-4 py-2 rounded bg-yellow-400 text-white hover:bg-yellow-500" {...props}>
      {children}
    </button>
  );
}
