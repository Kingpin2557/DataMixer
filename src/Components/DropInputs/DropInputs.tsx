import { useDroppable } from "@dnd-kit/react";

type DropInputProps = {
  id: string;
  acceptedType: string;
  activeType: string | null;
  value: number;
  onChange: (value: string) => void;
};

function DropInput({
  id,
  acceptedType,
  activeType,
  value,
  onChange,
}: DropInputProps) {
  const isDragging = activeType !== null;
  const isValid = activeType === acceptedType;
  const isDisabled = isDragging && !isValid;

  const { ref, isDropTarget } = useDroppable({
    id,
    disabled: isDisabled,
    data: {
      type: "input",
      acceptedType,
      inputId: id,
    },
  });

  const className = [
    isDragging && isValid ? "c-dropinput--valid" : "",
    isDragging && !isValid ? "c-dropinput--disabled" : "",
    isDropTarget ? "c-dropinput--active" : "",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div className="c-dropinput">
      <label htmlFor={id}>{id}</label>
      <input
        ref={ref}
        id={id}
        className={className}
        value={value || 0}
        onChange={(event) => onChange(event.target.value)}
        placeholder={`Drop a ${acceptedType}`}
        disabled={isDisabled}
      />
    </div>
  );
}

export default DropInput;
