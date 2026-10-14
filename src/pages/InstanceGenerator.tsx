import { useState } from "react";
import { invoke } from "@tauri-apps/api/core";

export default function InstanceGenerator() {
  const [x, setX] = useState(20);
  const [y, setY] = useState(10);
  const [minInterval, setMinInterval] = useState(5);
  const [errorProb, setErrorProb] = useState(0.2);
  const [correctArray, setCorrectArray] = useState<boolean[][]>([]);
  const [instanceArray, setInstanceArray] = useState<boolean[][]>([]);
  const [status, setStatus] = useState("Component mounted");

  async function generateInstance() {
    try {
		setStatus("Button clicked; calling Rust...");
    	const correctResult = await invoke<boolean[][]>("generate_correct_instance", {
    	  x,
    	  y,
    	  minInterval,
    	});

	    console.log("Generated instance:", correctResult);
	    setCorrectArray(correctResult);
		setStatus(`Success: ${correctResult.length} rows received`);

    	const instanceResult = await invoke<boolean[][]>("apply_errors_to_instance", {
		  instance: correctResult,
    	  errorProb,
    	});
		setInstanceArray(instanceResult)
		setStatus(`Success: managed to add errors to the array`);


    } catch (error) {
	  console.error("Failed to generate instance:", error);
	  setStatus(`Error: ${String(error)}`);
    }
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

        <label>
          minimum interval:
          <input
            type="number"
            min="1"
            value={minInterval}
            onChange={(e) => setMinInterval(Number(e.target.value))}
          />
        </label>

        <label>
          Error probabilty:
          <input
            type="number"
            min="0.2"
            value={errorProb}
            onChange={(e) => setErrorProb(Number(e.target.value))}
          />
        </label>

        <button onClick={generateInstance}>
          Generate
        </button>
      </div>
	  
	  <div>
		<p>Status: {status}</p>
	  </div>

	  <div style={{ display: "flex", gap: "32px", alignItems: "flex-start" }}>

      {correctArray.length > 0 && (
		<div>
		<h3>Correct instance</h3>
        <table>
          <tbody>
            {correctArray.map((row, i) => (
              <tr key={i}>
                {row.map((value, j) => (
                  <td key={j}>{value ? "1" : "0"}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
		</div>
      )}

      {instanceArray.length > 0 && (
		<div>
		<h3>Instance with errors</h3>
        <table>
          <tbody>
            {instanceArray.map((row, i) => (
              <tr key={i}>
                {row.map((value, j) => (
                  <td key={j}>{value ? "1" : "0"}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
		</div>
      )}
	</div>

    </div>
  );
}
