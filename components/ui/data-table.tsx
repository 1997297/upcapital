import type { ReactNode } from "react";

export interface DataTableColumn<T> {
  key: string;
  header: string;
  render: (row: T) => ReactNode;
  align?: "left" | "right";
}

export function DataTable<T>({ columns, data, getRowKey, emptyMessage = "No records found." }: { columns: DataTableColumn<T>[]; data: T[]; getRowKey: (row: T) => string; emptyMessage?: string }) {
  return (
    <div className="overflow-hidden rounded-[var(--radius-card)] border border-white/[0.08] bg-white/[0.02]">
      <div className="overflow-x-auto">
        <table className="w-full min-w-[640px] border-collapse text-sm">
          <thead><tr className="border-b border-white/[0.08] bg-white/[0.025]">{columns.map((column) => <th key={column.key} scope="col" className={`px-4 py-3 text-xs font-bold uppercase tracking-[0.12em] text-text-muted ${column.align === "right" ? "text-right" : "text-left"}`}>{column.header}</th>)}</tr></thead>
          <tbody>
            {data.length ? data.map((row) => <tr key={getRowKey(row)} className="border-b border-white/[0.06] last:border-0 hover:bg-white/[0.02]">{columns.map((column) => <td key={column.key} className={`px-4 py-4 text-text-secondary ${column.align === "right" ? "text-right" : "text-left"}`}>{column.render(row)}</td>)}</tr>) : <tr><td colSpan={columns.length} className="px-4 py-12 text-center text-text-muted">{emptyMessage}</td></tr>}
          </tbody>
        </table>
      </div>
    </div>
  );
}
