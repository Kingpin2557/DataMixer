import "./JsonViewer.css";
import type { ReactNode } from "react";
import Draggable from "../Draggable/Draggable.js";
import { ChevronRightIcon } from "@heroicons/react/24/outline";
import { useJsonFile } from "../../Hooks/useJsonFile.js"; // Adjust path if needed

export type JsonNode =
  null | boolean | number | string | JsonNode[] | { [key: string]: JsonNode };

type JsonViewerProps = {
  file: Blob | null;
  slot: "left" | "right";
  save?: boolean;
};

function getType(value: JsonNode): string {
  if (value === null) return "null";
  if (Array.isArray(value)) return "array";
  return typeof value;
}

function renderValue(value: JsonNode, path = "root"): ReactNode {
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
                {key}: {renderValue(child, `${path}.${key}`)}
              </li>
            ))}
          </ul>
          <small className="c-jsonviewer__object">{"}"}</small>
        </details>
      );

    case "array":
      if (!Array.isArray(value)) return null;

      return (
        <details open>
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
                {renderValue(child, `${path}[${JSON.stringify(index)}]`)}
              </li>
            ))}
          </ul>
          <small className="c-jsonviewer__array">]</small>
        </details>
      );

    case "boolean":
    case "number":
    case "string":
      return (
        <Draggable id={path} value={String(value)} path={path} type={type} />
      );

    default:
      return (
        <Draggable id={path} value={String(value)} path={path} type={type} />
      );
  }
}

function JsonViewer({ file, slot, save = true }: JsonViewerProps) {
  const { result, error } = useJsonFile(file, slot, save);

  if (error) return <p>{error}</p>;
  if (result === undefined) return null;

  return <div className="c-jsonviewer">{renderValue(result)}</div>;
}

export default JsonViewer;
