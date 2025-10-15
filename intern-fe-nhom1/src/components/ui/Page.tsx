import type { PropsWithChildren } from "react";

export function PageHeader(props: PropsWithChildren<{ right?: React.ReactNode; title?: string }>) {
  return (
    <div className="page-header">
      <h2>{props.title ?? props.children}</h2>
      <div>{props.right}</div>
    </div>
  );
}

export function ActionBar({ children }: PropsWithChildren) {
  return <div className="action-bar">{children}</div>;
}

export function TableWrap({ children }: PropsWithChildren) {
  return <div className="table-wrapper">{children}</div>;
}
