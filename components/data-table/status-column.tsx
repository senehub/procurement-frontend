import React from "react";

const pendingStatuses = ["pending"];
const successStatuses = ["approve", "accept", "active"];
const destructiveStatuses = ["decline", "reject", "inactive", "suspended"];

type Props =
  | {
      status: string;
    }
  | {
      status: boolean;
      trueText: string;
      falseText: string;
    };

let commonClassName = "px-2 py-1 w-max rounded-full text-xs capitalize";

export default function StatusColumn(props: Props) {
  const statusText = getStatus(props.status);
  const contextText =
    typeof props.status === "boolean"
      ? props.status
        ? props.trueText
        : props.falseText
      : props.status;

  if (statusText === "success") {
    return (
      <div className={`${commonClassName} bg-green-500/10 text-green-500`}>
        {contextText}
      </div>
    );
  }
  if (statusText === "pending") {
    return (
      <div className={`${commonClassName}  bg-secondary/10 text-green-500`}>
        {contextText}
      </div>
    );
  }
  return (
    <div className={`${commonClassName}  bg-red-500/10 text-red-500`}>
      {contextText}
    </div>
  );
}

function getStatus(status: string | boolean) {
  let _s: "success" | "pending" | "destructive" | undefined = undefined;

  if (typeof status === "boolean") {
    _s = status ? "success" : "destructive";
    return _s;
  }

  for (const _i of pendingStatuses) {
    if (_i.includes(status.toLowerCase())) {
      _s = "pending";
      break;
    }
  }
  if (_s) return _s;
  for (const _i of successStatuses) {
    if (_i.includes(status.toLowerCase())) {
      _s = "success";
      break;
    }
  }
  if (_s) return _s;
  for (const _i of destructiveStatuses) {
    if (_i.includes(status.toLowerCase())) {
      _s = "destructive";
      break;
    }
  }
  if (_s) return _s;

  return "pending";
}
