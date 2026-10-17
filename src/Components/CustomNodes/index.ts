export { default as Number } from "./NumberPreviewer/NumberPreviewer.js";
export { default as String } from "./StringPreviewer/StringPreviewer.js";
export { default as Boolean } from "./BooleanPreviewer/BooleanPreviewer.js";

import type { ReactNode } from "react";
import { type Data } from "../NodeContainer/NodeContainer.js";

export type PreviewerProps = {
  info: Data;
  children?: ReactNode;
};
