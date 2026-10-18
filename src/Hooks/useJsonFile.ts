import { useEffect, useState } from "react";
import { db } from "../db.js";
import type { JsonNode } from "../Components/JsonViewer/JsonViewer.js";

type JsonFileState = {
  file: Blob;
  result: JsonNode | undefined;
  error: string | null;
};

type FileSlot = "left" | "right";

export function useJsonFile(file: Blob | null, slot: FileSlot, save = true) {
  const [state, setState] = useState<JsonFileState | null>(null);

  useEffect(() => {
    if (!file) return;

    const selectedFile = file;
    let cancelled = false;

    async function load() {
      let parsed: JsonNode;

      try {
        parsed = JSON.parse(await selectedFile.text()) as JsonNode;
      } catch (err) {
        console.error("Could not read or parse the file:", err);
        if (!cancelled) {
          setState({
            file: selectedFile,
            result: undefined,
            error: "The file could not be read or contains invalid JSON.",
          });
        }
        return;
      }

      try {
        if (save) {
          await db.transaction("rw", db.files, async () => {
            await db.files.where("slot").equals(slot).delete();
            await db.files.add({
              slot,
              name:
                selectedFile instanceof File ? selectedFile.name : "data.json",
              blob: selectedFile,
            });
          });
        }

        if (!cancelled) {
          setState({ file: selectedFile, result: parsed, error: null });
        }
      } catch (err) {
        console.error("Could not save file to IndexedDB:", err);
        if (!cancelled) {
          setState({
            file: selectedFile,
            result: parsed,
            error: "The JSON was read, but the file could not be saved.",
          });
        }
      }
    }

    void load();

    return () => {
      cancelled = true;
    };
  }, [file, slot, save]);

  if (!file || state?.file !== file) {
    return { result: undefined, error: null };
  }

  return { result: state.result, error: state.error };
}
