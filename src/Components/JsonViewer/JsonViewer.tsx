import "./JsonViewer.css";

type JsonNode =
  null | number | string | boolean | JsonNode[] | { [key: string]: JsonNode };

type JsonViewerProps = {
  result: JsonNode;
  hideOpeningBracket?: boolean;
};

function JsonViewer({ result, hideOpeningBracket = false }: JsonViewerProps) {
  if (result === null) {
    return <span className="c-jsonviewer--null">null</span>;
  }

  const type = Array.isArray(result) ? "array" : typeof result;

  switch (type) {
    case "array": {
      const safeArray = result as JsonNode[];

      return (
        <ul className="c-jsonviewer__array">
          {!hideOpeningBracket && (
            <span className="c-jsonviewer__bracketarray">[</span>
          )}

          {safeArray.map((item, index) => (
            <li key={index} className="c-jsonviewer__item">
              <JsonViewer result={item} />
            </li>
          ))}

          <span className="c-jsonviewer__bracketarray">],</span>
        </ul>
      );
    }
    case "object": {
      const safeObject = result as Record<string, JsonNode>;

      return (
        <ul className="c-jsonviewer__object">
          {!hideOpeningBracket && (
            <span className="c-jsonviewer__bracketobject">&#123;</span>
          )}

          {Object.entries(safeObject).map(([key, value], index) => {
            const isCollection = value !== null && typeof value === "object";
            const isArray = Array.isArray(value);

            return (
              <li key={`${key}-${index}`} className="c-jsonviewer__item">
                {isCollection ? (
                  <details>
                    <summary>
                      <strong className="c-jsonviewer--key">
                        {key}:
                        <span
                          className={
                            isArray
                              ? "c-jsonviewer__bracketarray"
                              : "c-jsonviewer__bracketobject"
                          }
                        >
                          {isArray ? "[" : "{"}
                        </span>
                      </strong>
                    </summary>

                    <JsonViewer result={value} hideOpeningBracket />
                  </details>
                ) : (
                  <>
                    <strong className="c-jsonviewer--key">{key}: </strong>
                    <JsonViewer result={value} />
                  </>
                )}
              </li>
            );
          })}

          <span className="c-jsonviewer__bracketobject">&#125;,</span>
        </ul>
      );
    }
    case "string": {
      return (
        <p className="c-jsonviewer--string">
          "{String(result)}"<span>,</span>
        </p>
      );
    }
    case "number": {
      return (
        <p className="c-jsonviewer--number">
          {String(result)}
          <span>,</span>
        </p>
      );
    }
    case "boolean": {
      return (
        <p
          className={
            result ? "c-jsonviewer--booleantrue" : "c-jsonviewer--booleanfalse"
          }
        >
          {String(result)}
          <span>,</span>
        </p>
      );
    }
    default: {
      return <span className="c-jsonviewer--unknown">{String(result)}</span>;
    }
  }
}

export default JsonViewer;
