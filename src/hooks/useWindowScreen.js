import { useState } from "react";
import { toast } from "react-toastify";
import welcome from "../assets/img/icons/welcome.svg";
import details from "../assets/img/icons/details.png";
import Properties from "../components/specific/portfolio/wndows/Properties";
import WelcomeContent from "../components/specific/portfolio/wndows/Welcome";

const useWindowScreen = () => {
  const [currentWindow, setCurrentWindow] = useState("welcome");
  const [currentContext, setCurrentContext] = useState();

  const welcomeWindow = {
    id: "welcome",
    icon: welcome.src,
    label: "Welcome",
    bg: "#00000000",
    content: <WelcomeContent />,
  };

  const [windowsOpenned, setWindowsOpenned] = useState([
    {
      id: "welcome",
      window: welcomeWindow,
    },
  ]);

  const switchContext = (event, performance, refCtx) => {
    event.preventDefault();

    setCurrentContext(performance);
    refCtx.style.display = "block";
    refCtx.style.position = "fixed";
    refCtx.style.top = event.clientY +"px";
    refCtx.style.left = event.clientX +"px";
  };
  
  const hideContextMenuIfVisible = (event, refCtx) => {
    if(refCtx.style.display != "none") {
      refCtx.style.display = "none"
    }
  };

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
      tarWind.style.width = window.innerWidth < 768 ? "80%" :"50%";
      tarWind.style.height = "60%";
      // tarWind.style.top = "50%";
      // tarWind.style.left = "50%";
      // tarWind.style.transform = "translate(-50%, -50%)";
      tarWind.style.borderRadius = "5px";
      tarWind.fullscreen = false;
    } else {
      tarWind.style.width = "100%";
      tarWind.style.height = "100%";
      // tarWind.style.top = "0";
      // tarWind.style.left = "0";
      // tarWind.style.transform = "translate(0, 0)";
      tarWind.style.borderRadius = "0px";
      tarWind.fullscreen = true;
    }
  };

  const minimizeWindow = (e, idWind) => {
    let tarWind = document.getElementById(idWind);
    if (tarWind.minimized) {
      tarWind.style.top = "50%";
      tarWind.style.opacity = "1";
      tarWind.style.pointerEvents = "initial";
      tarWind.minimized = false;
    } else {
      tarWind.style.top = "100%";
      tarWind.style.opacity = "0";
      tarWind.style.pointerEvents = "none";
      tarWind.minimized = true;
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

	const copyTabLink = (e, tabLink) => {
    navigator.clipboard.writeText(tabLink)
    .then((res) => {
      toast.success("URL copied successfully");
    })
	}

  const switchProp = (event, curCtx) => {
    event.preventDefault();

    openWindow(event, {
      id: "properties_"+curCtx.id,
      icon: details.src,
      label: "Properties - "+curCtx.label,
      bg: "#00000000",
      content: <Properties props={{ curProp: curCtx.properties }} />,
    });
  }

  return [
		currentWindow, 
		currentContext, 
		windowsOpenned, 
		openWindow,
		resizeWindow,
		minimizeWindow,
		closeWindow,
		moveWindow,
    copyTabLink,
    switchContext,
    hideContextMenuIfVisible,
    switchProp
	];
};

export default useWindowScreen;