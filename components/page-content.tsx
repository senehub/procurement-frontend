import { cn } from "@/lib/utils";

type Props = {
  children: any;
  className?: string;
};

export default function PageContent({ children, className }: Props) {
  return (
    <div
      className={cn("block w-full mx-0 p-0 my-4 laptop:my-6", className || "")}
    >
      {children}
    </div>
  );
}
