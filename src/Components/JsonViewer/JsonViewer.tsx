import "./JsonViewer.css";
import type { ReactNode } from "react";
import { ChevronRightIcon } from "@heroicons/react/24/outline";

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
      if (value === null || Array.isArray(value)) return null;

      return (
        <details>
          <summary>
            <ChevronRightIcon
              className="c-jsonviewer__icon"
              aria-hidden="true"
            />

            <small className="c-jsonviewer__object c-jsonviewer__object--opening">
              {"{"}
            </small>
          </summary>
          <ul className="c-jsonviewer__item">
            {Object.entries(value).map(([key, child]) => (
              <li key={key}>
                {key}: {renderValue(child)}
              </li>
            ))}
          </ul>
          <small className="c-jsonviewer__object">{"}"}</small>
        </details>
      );

    case "array":
      if (!Array.isArray(value)) return null;

      return (
        <details>
          <summary>
            <ChevronRightIcon
              className="c-jsonviewer__icon"
              aria-hidden="true"
            />

            <small className="c-jsonviewer__array c-jsonviewer__array--opening">
              [
            </small>
          </summary>
          <ul>
            {value.map((child, index) => (
              <li key={index} className="c-jsonviewer__elements">
                {renderValue(child)}
              </li>
            ))}
          </ul>
          <small className="c-jsonviewer__array">]</small>
        </details>
      );

    case "boolean":
      return (
        <span className={`u-jsoncolor--boolean${value ? "true" : "false"}`}>
          {String(value)}
        </span>
      );

    case "number":
      return <span className="u-jsoncolor--number">{String(value)}</span>;

    case "string":
      return <span className="u-jsoncolor--string">{String(value)}</span>;

    default:
      return <span>{String(value)}</span>;
  }
}

function JsonViewer({ result }: JsonViewerProps) {
  return <div className="c-jsonviewer">{renderValue(result)}</div>;
}

export default JsonViewer;
