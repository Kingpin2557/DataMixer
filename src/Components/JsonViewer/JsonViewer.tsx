import "./JsonViewer.css";
import JsonToolTip from "../JsonToolTip/JsonToolTip.js";

export type JsonNode =
  null | number | string | boolean | JsonNode[] | { [key: string]: JsonNode };

type JsonViewerProps = {
  result: JsonNode;
  hideOpeningBracket?: boolean;
  path?: string;
};

function JsonViewer({
  result,
  hideOpeningBracket = false,
  path = "root",
}: JsonViewerProps) {
  if (result === null) {
    return <span className="c-jsonviewer--null">null</span>;
  }

  const type = Array.isArray(result) ? "array" : typeof result;

  switch (type) {
    case "array": {
      const safeArray = result as JsonNode[];

      return (
        <ul className="c-jsonviewer__array">
          {!hideOpeningBracket && <span className="u-jsoncolor--array">[</span>}

          {safeArray.map((item, index) => {
            const itemPath = `${path}-${index}`;

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
      const safeObject = result as Record<string, JsonNode>;

      return (
        <ul className="c-jsonviewer__object">
          {!hideOpeningBracket && (
            <span className="u-jsoncolor--object">&#123;</span>
          )}

          {Object.entries(safeObject).map(([key, value], index) => {
            const isCollection = value !== null && typeof value === "object";
            const isArray = Array.isArray(value);
            const closingBracket = isArray ? "]" : "}";
            const valueType = Array.isArray(value) ? "array" : typeof value;

            const valueClass =
              valueType === "boolean" ? `boolean${value}` : `${valueType}`;

            const itemPath = `${path}-${index}`;

            return (
              <li key={itemPath} className="c-jsonviewer__item">
                {isCollection ? (
                  <>
                    <JsonToolTip
                      label={key}
                      value={value}
                      path={itemPath}
                      type={valueClass}
                    />

                    <details>
                      <summary className="c-jsonviewer__summary">
                        <span
                          className={
                            isArray
                              ? "u-jsoncolor--array"
                              : "u-jsoncolor--object"
                          }
                        >
                          {isArray ? "[" : "{"}
                        </span>

                        <span
                          className={`c-jsonviewer__collapsed ${
                            isArray
                              ? "u-jsoncolor--array"
                              : "u-jsoncolor--object"
                          }`}
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
                  </>
                ) : (
                  <>
                    <JsonToolTip
                      label={key}
                      value={value}
                      path={itemPath}
                      type={valueClass}
                    />

                    <JsonViewer result={value} path={`${itemPath}-value`} />
                  </>
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
