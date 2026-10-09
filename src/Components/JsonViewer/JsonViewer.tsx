import "./JsonViewer.css";
import type { ReactNode } from "react";

export type JsonNode =
  null | boolean | number | string | JsonNode[] | { [key: string]: JsonNode };

type JsonViewerProps = {
  result: JsonNode;
};

function getType(value: JsonNode): string {
  if (value === null) return "null";
  if (Array.isArray(value)) return "array";
  return typeof value;
}

function renderValue(value: JsonNode): ReactNode {
  const type = getType(value);

  switch (type) {
    case "object":
      return <p>Object</p>;
    case "array":
      return <p>Array</p>;
    case "string":
      return <p>string</p>;
    default:
      return <p>{String(value)}</p>;
  }
}

function JsonViewer({ result }: JsonViewerProps) {
  return <pre>{renderValue(result)}</pre>;
}

export default JsonViewer;
