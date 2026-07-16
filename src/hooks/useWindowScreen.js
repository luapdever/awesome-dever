import { useState } from "react";
import { toast } from "react-toastify";
import welcome from "../assets/img/icons/welcome.svg";
import console from "../assets/img/icons/console.png";
import details from "../assets/img/icons/details.png";
import Properties from "../components/specific/portfolio/wndows/Properties";
import WelcomeContent from "../components/specific/portfolio/wndows/Welcome";
import Terminal from "../components/specific/portfolio/wndows/Terminal";
import { playOsSound } from "../lib/osSounds";

const useWindowScreen = () => {
  const [currentWindow, setCurrentWindow] = useState("welcome");
  const [currentContext, setCurrentContext] = useState();

  const welcomeWindow = {
    id: "welcome",
    icon: welcome.src,
    label: "Welcome",
    bg: "#00000000",
    content: <WelcomeContent /> ,
  };

  const terminalWindow = {
    id: "terminal",
    icon: console.src,
    label: "Terminal",
    bg: "#00000000",
    content: <Terminal />,
  };

  const [windowsOpenned, setWindowsOpenned] = useState([
    {
      id: "welcome",
      window: welcomeWindow,
    },
    {
      id: "terminal",
      window: terminalWindow,
    },
  ]);

  const state = {
    x: 0,
    y: 0,
  }

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
      playOsSound("open"); // nouvelle fenêtre
    } else {
      playOsSound("click"); // simple mise au premier plan
    }
    setCurrentWindow(performance.id);
  };

  const resizeWindow = (e, idWind) => {
    let tarWind = document.getElementById(idWind);
    if (tarWind.fullscreen) {
      tarWind.style.width = window.innerWidth < 768 ? "80%" :"50%";
      tarWind.style.height = "60%";
      tarWind.style.top = "50%";
      tarWind.style.left = "50%";
      tarWind.style.transform = "translate(-50%, -50%)";
      tarWind.style.borderRadius = "5px";
      tarWind.fullscreen = false;
      playOsSound("pop"); // sortie du plein écran
    } else {
      tarWind.style.width = "100%";
      tarWind.style.height = "100%";
      tarWind.style.top = "0";
      tarWind.style.left = "0";
      tarWind.style.transform = "translate(0, 0)";
      tarWind.style.borderRadius = "0px";
      tarWind.fullscreen = true;
      playOsSound("maximize"); // passage plein écran
    }
  };

  const minimizeWindow = (e, idWind, fromTaskbar = false) => {
    let tarWind = document.getElementById(idWind);
    if (tarWind.minimized || fromTaskbar) {
      // Fullscreen-only windows restore to the top-left corner, not centered.
      tarWind.style.top = tarWind.fullscreen ? "0" : "50%";
      tarWind.style.left = tarWind.fullscreen ? "0" : "50%";
      tarWind.style.opacity = "1";
      tarWind.style.pointerEvents = "initial";
      tarWind.minimized = false;
      playOsSound("pop"); // restauration
    } else {
      tarWind.style.top = "100%";
      tarWind.style.opacity = "0";
      tarWind.style.pointerEvents = "none";
      tarWind.minimized = true;
      playOsSound("minimize"); // réduction
    }
  };

  const closeWindow = (e, index) => {
    const copy = windowsOpenned;
    copy.splice(index, 1);
    setWindowsOpenned([...copy]);
    setCurrentWindow(windowsOpenned.length > 0 ? windowsOpenned[windowsOpenned.length - 1].id : "")
    playOsSound("close"); // fermeture
  };

	const handleDragStart = (e, idWind) => {
    let tarWind = document.getElementById(idWind);

    if(!e.dataTransfer) return;

    let img = new Image();
    img.src = 'data:image/gif;base64,R0lGODlhAQABAIAAAAUEBAAAACwAAAAAAQABAAACAkQBADs=';
    e.dataTransfer.setDragImage(img, 0, 0);

    state.x = 0;
    state.y = tarWind.offsetTop/2;
    tarWind.classList.add('dragging');
  }

	const moveWindow = (e, idWind) => {
    e.preventDefault();

    let tarWind = document.getElementById(idWind);

		const mouse = {
			x: e.clientX + state.x,
			y: e.clientY + state.y,
		}
		if(!tarWind.fullscreen && mouse.x !== 0 && mouse.y !== 0) {
			tarWind.style.top = mouse.y + "px";
			tarWind.style.left = mouse.x + "px";
		}
	}

  const handleDragEnd = (e, idWind) => {
    let tarWind = document.getElementById(idWind);
    tarWind.classList.remove('dragging');
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

  return {
		currentWindow, 
    setCurrentWindow, 
		currentContext, 
		windowsOpenned, 
		openWindow,
		resizeWindow,
		minimizeWindow,
		closeWindow,
		handleDragStart,
		moveWindow,
		handleDragEnd,
    copyTabLink,
    switchContext,
    hideContextMenuIfVisible,
    switchProp,
    terminalWindow,
    welcomeWindow,
  };
};

export default useWindowScreen;