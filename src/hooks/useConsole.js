import { useState } from "react";
import { availableCmds } from "../rawDatas/availableCmd";

export const useConsole = (styles) => {
  const helloJsx = {
    id: "hello",
    output: (
      <p>
        Hello, this is <b className="or">Dever Shell. </b> Type a command for a
        specific action. For manual, type <b className="or">help</b>
      </p>
    ),
  };

  const shellInput = {
    id: "shell",
    output: (
      <section className={styles.shellInput}>
        <form onSubmit={(e) => exeCmd(e)}>
          <label htmlFor="shInp">
            <b className="or">dever</b>@luap: ~
          </label>
          <input
            type="text"
            name="shInp"
            autoFocus
            autoComplete={"off"}
            autoCorrect={"off"}
            autoCapitalize={"off"}
            spellCheck={"false"}
            placeholder={"type command here"}
          />
        </form>
      </section>
    ),
  };

  const [consoleOutputs, setConsoleOutputs] = useState([helloJsx, shellInput]);

  const exeCmd = (e) => {
    e.preventDefault();
    const input = e.target.querySelector('input[name="shInp"]');

    if (input.value) {
			const cmdValue = input.value;
      input.readOnly = false;

			let copyConsOut = consoleOutputs;
			let cmdFound = availableCmds.find((curCmd, index) => curCmd.id == cmdValue);
			
			if(cmdFound) {
				copyConsOut.push(cmdFound, shellInput);
			} else if(cmdValue == "clear" || cmdValue == "cls") {
				consoleOutputs.length = 0;
				return setConsoleOutputs([...[shellInput]])
			} else {
				const notFound = {
					id: "notFound",
					output: <p>{">>> "}({cmdValue}) Command not found...🤔</p>
				};
				copyConsOut.push(notFound, shellInput);
			}

			setConsoleOutputs([...copyConsOut]);
			console.log(consoleOutputs)
    }
  };

  return [consoleOutputs];
};
