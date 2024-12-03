import { Fragment, ReactNode } from "react";

type Props = {
  heading: string;
  actions?: ReactNode[];
};

export default function PageHeader({ heading, actions }: Props) {
  return (
    <div className="flex items-center justify-between gap-4 flex-wrap">
      <h1 className="text-3xl font-bold">{heading}</h1>
      {actions && (
        <div className="mt-6 flex items-center gap-2">
          {actions.map((action, index) => {
            return <Fragment key={index}>{action}</Fragment>;
          })}
        </div>
      )}
    </div>
  );
}
