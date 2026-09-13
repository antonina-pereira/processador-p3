import type { ConsoleMessage } from "./console-message";

interface ConsoleProps {
  messages: ConsoleMessage[];
}

export function Console({ messages }: ConsoleProps) {
  return (
    <div className="console">
      {messages.length === 0 && <div>No messages.</div>}

      {messages.map((msg, index) => (
        <div key={index}>
          [{msg.type.toUpperCase()}]
          {msg.line !== undefined && ` Line ${msg.line}:`} {msg.text}
        </div>
      ))}
    </div>
  );
}
