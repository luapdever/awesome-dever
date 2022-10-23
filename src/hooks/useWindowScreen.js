import { useState } from "react";
import welcome from "../assets/img/icons/welcome.svg";

const useWindowScreen = () => {
  const [currentWindow, setCurrentWindow] = useState("welcome");

  const welcomeWindow = {
    id: "welcome",
    icon: welcome.src,
    label: "Welcome",
    bg: "#00000000",
    content: (
      <>
        <div>Welcome to Dever screen</div>
      </>
    ),
  };
  const [windowsOpenned, setWindowsOpenned] = useState([
    {
      id: "welcome",
      window: welcomeWindow,
    },
  ]);

  const openWindow = (event, performance) => {
    event.preventDefault();

    if (!windowsOpenned.some((el) => el.id == performance.id)) {
      setWindowsOpenned([
        ...windowsOpenned,
        {
          id: performance.id,
          window: performance,
        },
      ]);
    }
    setCurrentWindow(performance.id);
  };

  const resizeWindow = (e, idWind) => {
    let tarWind = document.getElementById(idWind);
    if (tarWind.fullscreen) {
      tarWind.style.width = "50%";
      tarWind.style.height = "60%";
      tarWind.style.top = "50%";
      tarWind.style.left = "50%";
      tarWind.style.transform = "translate(-50%, -50%)";
      tarWind.style.borderRadius = "5px";
      tarWind.fullscreen = false;
    } else {
      tarWind.style.width = "100%";
      tarWind.style.height = "100%";
      tarWind.style.top = "0";
      tarWind.style.left = "0";
      tarWind.style.transform = "translate(0, 0)";
      tarWind.style.borderRadius = "0px";
      tarWind.fullscreen = true;
    }
  };

  const closeWindow = (e, index) => {
    const copy = windowsOpenned;
    copy.splice(index, 1);
    setWindowsOpenned([...copy]);
    setCurrentWindow(windowsOpenned.length > 0 ? windowsOpenned[windowsOpenned.length - 1].id : "")
  };

	const moveWindow = (e, idWind) => {
    let tarWind = document.getElementById(idWind);

		const mouse = {
			x: e.clientX,
			y: e.clientY
		}
		if(mouse.x !== 0 && mouse.y !== 0) {
			tarWind.style.top = mouse.y + "px";
			tarWind.style.left = mouse.x + "px";
		}
	}

  return [
		currentWindow, 
		setCurrentWindow, 
		windowsOpenned, 
		setWindowsOpenned,
		openWindow,
		resizeWindow,
		closeWindow,
		moveWindow
	];
};

export default useWindowScreen;