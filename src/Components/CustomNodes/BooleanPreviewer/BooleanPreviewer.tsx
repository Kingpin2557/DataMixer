import "./BooleanPreviewer.css";
import type { PreviewerProps } from "../index.js";
import { CheckIcon, XMarkIcon } from "@heroicons/react/24/outline";

function BooleanPreviewer({ info, children }: PreviewerProps) {
  const value = info.value.trim().toLowerCase() === "true";

  return (
    <div className="c-boolean">
      <div className="c-boolean__header">
        <div className="c-boolean__value u-value">
          {value && (
            <CheckIcon className="c-boolean__icon c-boolean__icon--true" />
          )}
          {!value && (
            <XMarkIcon className="c-boolean__icon c-boolean__icon--false" />
          )}
        </div>
        <small>{info.key}</small>
      </div>
      {children}
    </div>
  );
}

export default BooleanPreviewer;
