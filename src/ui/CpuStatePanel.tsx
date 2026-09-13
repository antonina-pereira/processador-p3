import { useState } from "react";
import type { RegisterName } from "../emulator/cpu/registers";
import type { EmulatorSession } from "../emulator/emulator";

interface CpuStatePanelProps {
  registers: Record<string, number>;
  flags: Record<string, boolean>;
  emulatorSession: EmulatorSession;
  refreshState: () => void;
}

const REGISTER_NAMES: RegisterName[] = [
  "R0",
  "R1",
  "R2",
  "R3",
  "R4",
  "R5",
  "R6",
  "R7",
  "PC",
  "SP",
  "RE",
];

export function CpuStatePanel({
  registers,
  flags,
  emulatorSession,
  refreshState,
}: CpuStatePanelProps) {
  const [selectedRegister, setSelectedRegister] = useState<RegisterName>("R1");
  const [valueInput, setValueInput] = useState("");
  const [error, setError] = useState("");

  // User can change a register value
  const handleWriteRegister = () => {
    const value = parseInt(valueInput.trim(), 16);

    // Validation of user input
    if (valueInput.trim() === "") {
      setError("Value is required.");
      return;
    }
    if (Number.isNaN(value)) {
      setError("Value must be hexadecimal.");
      return;
    }
    if (value < 0 || value > 0xffff) {
      setError("Value must be between 0000 and FFFF.");
      return;
    }

    emulatorSession.writeRegister(selectedRegister, value);
    refreshState();
    setValueInput("");
    setError("");
  };

  return (
    <div className="border rounded p-3">
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 2fr 1fr",
          gap: "0.25rem",
          alignItems: "start",
        }}
      >
        {/* FLAGS */}
        <div>
          <h3>Flags</h3>
          <div>
            {Object.entries(flags).map(([name, value]) => (
              <div key={name}>
                <strong>{name}</strong>: {value ? "true" : "false"}
              </div>
            ))}
          </div>
        </div>
        {/* REGISTERS */}
        <div>
          <h3>Registers</h3>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "0.1rem 0.1rem",
            }}
          >
            {Object.entries(registers).map(([name, value]) => (
              <div key={name}>
                <strong>{name}</strong>: 0x
                {value.toString(16).toUpperCase().padStart(4, "0")}
              </div>
            ))}
          </div>
        </div>
        {/* WRITE REGISTER */}
        <div>
           <h3 style={{ fontSize: "16px" }}>Write Register</h3> 
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "0.25rem",
              alignItems: "center",
              marginTop: "0.25rem",
            }}
          >
            <select
              value={selectedRegister}
              onChange={(e) =>
                setSelectedRegister(e.target.value as RegisterName)
              }
            >
              {REGISTER_NAMES.map((register) => (
                <option key={register} value={register}>
                  {register}
                </option>
              ))}
            </select>
             
            <input
              type="text"
              placeholder="Hex value"
              value={valueInput}
              onChange={(e) => setValueInput(e.target.value.toUpperCase())}
              style={{ width: "100px" }}
            />
             <button onClick={handleWriteRegister}>Write</button>
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
