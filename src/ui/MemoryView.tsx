import { useState } from "react";
import {
  MAIN_MEMORY_START,
  MAIN_MEMORY_END,
  STACK_MEMORY_START,
  STACK_MEMORY_END,
} from "../emulator/cpu/memory";
import type { EmulatorState } from "../emulator/emulator";
import type { MemoryWord } from "../emulator/cpu/cpu-state";

export interface MemoryViewProps {
  memory: MemoryWord[];
  // for user to change a value in a memory address
  emulatorSession: {
    writeMemory(address: number, value: number): void;
    getState(): EmulatorState;
  };
  setState: React.Dispatch<React.SetStateAction<EmulatorState>>;
}

const VISIBLE_ROWS = 16; // Visible rows of memory addresses
const WORDS_PER_ROW = 8; // Words per visible row

export function MemoryView({
  memory,
  emulatorSession,
  setState,
}: MemoryViewProps) {
  const [addressInput, setAddressInput] = useState("");
  const [valueInput, setValueInput] = useState("");
  const [error, setError] = useState("");

  // Helper function for user changing a memory address: verifies if the address inserted by the user is valid
  function isValidMemoryAddress(address: number): boolean {
    const isMain = address >= MAIN_MEMORY_START && address <= MAIN_MEMORY_END;

    const isStack =
      address >= STACK_MEMORY_START && address <= STACK_MEMORY_END;

    return isMain || isStack;
  }

  // Defines two regions in memory
  const MainMemory = memory.filter(
    (word) =>
      word.address >= MAIN_MEMORY_START && word.address <= MAIN_MEMORY_END,
  );
  const StackMemory = memory.filter(
    (word) =>
      word.address >= STACK_MEMORY_START && word.address <= STACK_MEMORY_END,
  );

  // Creates rows of 8 words each
  function createRows(memory: MemoryWord[]) {
    const rows: MemoryWord[][] = [];

    for (let i = 0; i < memory.length; i += WORDS_PER_ROW) {
      rows.push(memory.slice(i, i + WORDS_PER_ROW));
    }

    return rows;
  }

  // Builds the rows for the two zones in memory
  const mainRows = createRows(MainMemory);
  const stackRows = createRows(StackMemory);

  // Allow the user to choose which section of memory to use
  // Determines which section of memory is displayed
  const [mainStartAddress, setMainStartAddress] = useState(MAIN_MEMORY_START);
  const [stackStartAddress, setStackStartAddress] =
    useState(STACK_MEMORY_START);

  // Defines the starting rows for each section in memory
  const mainStartRow = mainRows.findIndex(
    (row) => row[0]?.address === mainStartAddress,
  );
  const stackStartRow = stackRows.findIndex(
    (row) => row[0]?.address === stackStartAddress,
  );

  // Maps the memory to the created rows
  const mainAddresses = mainRows.map((row) => row[0].address);
  const stackAddresses = stackRows.map((row) => row[0].address);

  // Limits the visible rows
  const visibleMainRows = mainRows.slice(
    mainStartRow,
    mainStartRow + VISIBLE_ROWS,
  );
  const visibleStackRows = stackRows.slice(
    stackStartRow,
    stackStartRow + VISIBLE_ROWS,
  );

  // Memory address update by user
  const handleWriteMemory = () => {
    try {
      const address = parseInt(addressInput, 16);
      const value = parseInt(valueInput, 16);
      if (addressInput.trim() === "") {
        setError("Address is required.");
        return;
      }
      if (valueInput.trim() === "") {
        setError("Value is required.");
        return;
      }
      if (Number.isNaN(address)) {
        throw new Error("Invalid address.");
      }

      if (Number.isNaN(value)) {
        throw new Error("Invalid value.");
      }
      if (!isValidMemoryAddress(address)) {
        setError(
          `Address ${address
            .toString(16)
            .toUpperCase()} is outside the valid memory regions.`,
        );
        return;
      }
      if (value < 0 || value > 0xffff) {
        setError("Value must be between 0000 and FFFF.");
        return;
      }
      emulatorSession.writeMemory(address, value & 0xffff);

      setState(emulatorSession.getState());

      setError("");
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Unable to write to memory.",
      );
    }
  };

  // Panel
  function MemoryPanel({ rows }: { rows: MemoryWord[][] }) {
    return (
      <div className="memory-panel">
        {rows.map((row) => {
          const startAddress = row[0].address
            .toString(16)
            .padStart(4, "0")
            .toUpperCase();
          const values = row
            .map((word) =>
              word.value.toString(16).padStart(4, "0").toUpperCase(),
            )
            .join(" ");

          return (
            <div key={startAddress}>
              {startAddress} : {values}
            </div>
          );
        })}
      </div>
    );
  }

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "1rem",
        padding: "1rem",
        alignItems: "center",
      }}
    >
      <div
        style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}
      >
        {/* MAIN MEMORY */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "0.5rem",
            padding: "0.25rem",
          }}
        >
          <h3>Main Memory Zone</h3>
          <select
            value={mainStartAddress}
            onChange={(e) => setMainStartAddress(Number(e.target.value))}
          >
            {mainAddresses.map((addr) => (
              <option key={addr} value={addr}>
                {addr.toString(16).toUpperCase()}
              </option>
            ))}
          </select>
          <MemoryPanel rows={visibleMainRows} />
        </div>
        {/* STACK MEMORY */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "0.5rem",
            padding: "0.25rem",
          }}
        >
          <h3>Stack Memory Zone</h3>

          <select
            value={stackStartAddress}
            onChange={(e) => setStackStartAddress(Number(e.target.value))}
          >
            {stackAddresses.map((addr) => (
              <option key={addr} value={addr}>
                {addr.toString(16).toUpperCase()}
              </option>
            ))}
          </select>
          <MemoryPanel rows={visibleStackRows} />
        </div>
      </div>
      <div
        style={{
          borderRadius: "4px",
          padding: "1rem",
        }}
      >
        {/* WRITE MEMORY */}
        <div
          style={{
            borderRadius: "4px",
            padding: "1rem",

            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <h3>Write Memory</h3> 
          <div
            style={{
              display: "flex",
              gap: "1rem",
              alignItems: "center",
            }}
          >
            <input
              placeholder="Address (hex)"
              value={addressInput}
              onChange={(e) => setAddressInput(e.target.value.toUpperCase())}
            />
             
            <input
              placeholder="Value (hex)"
              value={valueInput}
              onChange={(e) => setValueInput(e.target.value.toUpperCase())}
            />
             <button onClick={handleWriteMemory}>Write</button>
          </div>
           
          {error && (
            <div
              style={{
                color: "red",
                marginTop: "0.5rem",
              }}
            >
              {error}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
