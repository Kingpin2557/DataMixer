import "./JsonViewer.css";
import JsonToolTip from "../JsonToolTip/JsonToolTip.js";

export type JsonNode =
  null | number | string | boolean | JsonNode[] | { [key: string]: JsonNode };

type JsonViewerProps = {
  result: JsonNode;
  hideOpeningBracket?: boolean;
  path?: string;
};

function getArrayPath(path: string, index: number): string {
  return `${path}[${index}]`;
}

function getObjectPath(path: string, key: string): string {
  const isSimpleKey = /^[A-Za-z_$][\w$]*$/.test(key);

  return isSimpleKey ? `${path}.${key}` : `${path}[${JSON.stringify(key)}]`;
}

function getValueType(value: JsonNode): string {
  if (Array.isArray(value)) {
    return "array";
  }

  return typeof value;
}

function getValueClass(value: JsonNode): string {
  const type = getValueType(value);

  if (type === "boolean") {
    return `boolean${value}`;
  }

  return type;
}

function JsonViewer({
  result,
  hideOpeningBracket = false,
  path = "$",
}: JsonViewerProps) {
  if (result === null) {
    return <span className="c-jsonviewer--null">null</span>;
  }

  const type = getValueType(result);

  switch (type) {
    case "array": {
      const safeArray = result as JsonNode[];

      return (
        <ul className="c-jsonviewer__array">
          {!hideOpeningBracket && <span className="u-jsoncolor--array">[</span>}

          {safeArray.map((item, index) => {
            const itemPath = getArrayPath(path, index);

            return (
              <li key={itemPath} className="c-jsonviewer__item">
                <JsonViewer result={item} path={itemPath} />
              </li>
            );
          })}

          <span className="u-jsoncolor--array">],</span>
        </ul>
      );
    }

    case "object": {
      return (
        <ul className="c-jsonviewer__object">
          {!hideOpeningBracket && (
            <span className="u-jsoncolor--object">&#123;</span>
          )}

          {Object.entries(result).map(([key, value]) => {
            const itemPath = getObjectPath(path, key);
            const isCollection = value !== null && typeof value === "object";
            const isArray = Array.isArray(value);
            const bracketClass = isArray
              ? "u-jsoncolor--array"
              : "u-jsoncolor--object";
            const closingBracket = isArray ? "]" : "}";

            return (
              <li key={itemPath} className="c-jsonviewer__item">
                <JsonToolTip
                  label={key}
                  value={value}
                  path={itemPath}
                  type={getValueClass(value)}
                />

                {isCollection ? (
                  <details>
                    <summary className="c-jsonviewer__summary">
                      <span className={bracketClass}>
                        {isArray ? "[" : "{"}
                      </span>

                      <span
                        className={`c-jsonviewer__collapsed ${bracketClass}`}
                      >
                        ...{closingBracket}
                      </span>
                    </summary>

                    <div className="c-jsonviewer__content">
                      <JsonViewer
                        result={value}
                        hideOpeningBracket
                        path={itemPath}
                      />
                    </div>
                  </details>
                ) : (
                  <JsonViewer result={value} path={itemPath} />
                )}
              </li>
            );
          })}

          <span className="u-jsoncolor--object">&#125;,</span>
        </ul>
      );
    }

    case "string":
      return (
        <p className="u-jsoncolor--string">
          "{String(result)}"<span>,</span>
        </p>
      );

    case "number":
      return (
        <p className="u-jsoncolor--number">
          {String(result)}
          <span>,</span>
        </p>
      );

    case "boolean":
      return (
        <p
          className={
            result ? "u-jsoncolor--booleantrue" : "u-jsoncolor--booleanfalse"
          }
        >
          {String(result)}
          <span>,</span>
        </p>
      );

    default:
      return <span className="u-jsoncolor--unknown">{String(result)}</span>;
  }
}

export default JsonViewer;
