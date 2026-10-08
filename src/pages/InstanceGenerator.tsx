import { useState } from "react";
import { invoke } from "@tauri-apps/api/core";

export default function InstanceGenerator() {
  const [x, setX] = useState(3);
  const [y, setY] = useState(4);
  const [array, setArray] = useState<number[][]>([]);

  async function generateInstance() {
    const result = await invoke<number[][]>("generate_instance", {
      x,
      y,
    });

    setArray(result);
  }

  return (
    <div>
      <h1>Instance generator settings</h1>

      <p>Define a problem to SLAY.</p>

      <div>
        <label>
          X:
          <input
            type="number"
            min="1"
            value={x}
            onChange={(e) => setX(Number(e.target.value))}
          />
        </label>

        <label>
          Y:
          <input
            type="number"
            min="1"
            value={y}
            onChange={(e) => setY(Number(e.target.value))}
          />
        </label>

        <button onClick={generateInstance}>
          Generate
        </button>
      </div>

      {array.length > 0 && (
        <table>
          <tbody>
            {array.map((row, i) => (
              <tr key={i}>
                {row.map((value, j) => (
                  <td key={j}>{value}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
