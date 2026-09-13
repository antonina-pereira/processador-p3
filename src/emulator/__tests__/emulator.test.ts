import { expect, it } from "vitest";
import { EmulatorSession } from "../emulator";

it("assembles, loads and returns state", () => {
  const session = new EmulatorSession();

  const result = session.assemble("NOP");

  session.load(result.code);

  const state = session.getState();

  console.log("EMULATOR TEST");
  console.log(state);
  expect(state).toBeDefined();
});
