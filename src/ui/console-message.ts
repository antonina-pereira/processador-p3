export interface ConsoleMessage {
  type: "error" | "warning" | "info";
  text: string;
  line?: number;
}
