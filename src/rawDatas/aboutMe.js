import { FaFacebook, FaGithub, FaLinkedinIn, FaTerminal, FaTwitter } from "react-icons/fa";
import styles from "../../styles/specific/home/about/presentation.module.css";
import blender from '../assets/img/icons/blender.svg'
import psIcon from '../assets/img/icons/adobe-ps.svg'
import xdIcon from '../assets/img/icons/adobe-xd.svg'
// import gsapIcon from '../assets/img/icons/gsap.svg'
import laravelIcon from '../assets/img/icons/laravel.png'
import djangoIcon from '../assets/img/icons/django.svg'

export const me = {
  fullName: "Paul M. ZANNOU",
  aboutMe: (
    <div className={styles.aboutPre}>
      <p>
        Yes of course, <b>Luap Dever</b> is not my real name but just a
        nickname. From my real name <b>Paul M. ZANNOU</b> (don't try to find out
        the meaning of <b>M.</b> 🙃) and born June 30, 2001 in{" "}
        <a href="http://google.com/search?q=Cotonou" target="_blank" rel="noreferrer">
          <b>Cotonou</b>
        </a>
        , I am a <b>fullstack developer</b> of digital solutions, creative
        interfaces, web services, APIs. With three years of experience in{" "}
        <b>Internet and Multimedia</b>, I marvelously merge <b>2D</b>, <b>3D</b>{" "}
        and text (I'm talking about <b>code</b> 🙄) to make interactive and
        experimental applications that respond to given <b>solutions</b>. <br />
        <span className="notInMobile">
          Exploring the world of software and applications, the world of
          graphics and the web, without forgetting distraction through the
          composition of <b>lyrics</b>, <b>music</b>, my goal is to avoid
          loneliness, find peace by developing solutions 😇.
        </span>
      </p>
      <p>
        If needed (or not 😒), I am available and will be hanging on your
        keyboards through the social networks below :
      </p>
    </div>
  ),
};



export const socialMedias = [
  {
    icon: <FaGithub />,
    link: "https://github.com/luapdever",
  },
  {
    icon: <FaLinkedinIn />,
    link: "https://linkedin.com/in/paul-zannou-b253a2205",
  },
  {
    icon: <FaFacebook />,
    link: "https://facebook.com/paulsmith.zannou",
  },
  {
    icon: <FaTwitter />,
    link: "https://twitter.com/SmithZannou",
  },
  {
    icon: <>View my blog</>,
    link: "https://luap-dever.me",
  },
];



export const formations = [
  {
    title: "High school diploma",
    details: (
      <>
        <p>Secondary courses in scientific series at <b>CEG 1 Tchaourou.</b></p>
      </>
    ),
		moreClass: " notInMobile"
  },
  {
    title: "Internet and Multimedia",
    details: (
      <>
        <p>Study in Internet and Multimedia at <a href="http://google.com/search?q=ifri+uac" target="_blank" rel="noreferrer"><b>IFRI/UAC.</b></a></p>
      </>
    ),
  },
  {
    title: "Self-taught",
    details: (
      <>
        <p>Self-training in <b><a href="https://google.com/search?q=creative+developpement" target="_blank" rel="noreferrer">creative</a>, fullstack and mobile development</b>.</p>
      </>
    ),
  },
];

export const listSkills = [
  {
    field: "In Design",
    skills: [
      <>3D modeling with {' '}
        <a href="https://google.com/search?q=blender" target="_blank" rel="noreferrer">
          <img src={blender.src} alt="Blender icon" width={20} />{' '}
          <b className="or">Blender</b>
        </a>
      </>,
      <>Visual design and photo processing with {' '}
        <a href="https://google.com/search?q=photoshop" target="_blank" rel="noreferrer">
          <img src={psIcon.src} alt="Photoshop icon" width={20} />{' '}
          <b className="or">Photoshop</b>
        </a>
      </>,
      <>Modeling and prototyping with {' '}
        <a href="https://google.com/search?q=adobe+xd" target="_blank" rel="noreferrer">
          <img src={xdIcon.src} alt="Adobe XD icon" width={20} />{' '}
          <b className="or">Adobe XD</b>
        </a>
      </>,
    ]
  },
  {
    field: "In Coding",
    skills: [
      <>Frontend development with {' '}
        <a href="https://google.com/search?q=html5" target="_blank" rel="noreferrer">
          <img src={"https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg"} alt="html5 icon" width={20} />{' '}
        </a>
        <a href="https://google.com/search?q=css3" target="_blank" rel="noreferrer">
          <img src={"https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg"} alt="css3 icon" width={20} />{' '}
        </a>
        <a href="https://google.com/search?q=javascript" target="_blank" rel="noreferrer">
          <img src={"https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg"} alt="javascript icon" width={20} />{' '}
        </a>
        <a href="https://google.com/search?q=react" target="_blank" rel="noreferrer">
          <img src={"https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg"} alt="react icon" width={20} />{' '}
        </a> {' or '}
        <a href="https://google.com/search?q=vuejs" target="_blank" rel="noreferrer">
          <img src={"https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vuejs/vuejs-original.svg"} alt="vuejs icon" width={20} />{' '}
        </a>
      </>,
      <>Web development with {' '}
        <a href="https://google.com/search?q=nextjs" target="_blank" rel="noreferrer">
          <b className="or">Next.js</b>
        </a> or {' '}
        <a href="https://google.com/search?q=nuxtjs" target="_blank" rel="noreferrer">
          <b className="or">Nuxt.js</b>
        </a>
      </>,
      <>Creative development with {' '}
        <a href="https://google.com/search?q=threejs" target="_blank" rel="noreferrer">
          {/* <img src={"https://cdn.jsdelivr.net/gh/devicons/devicon/icons/threejs/threejs-original.svg"} alt="threejs icon" width={20} />{' '} */}
          <b className="or">Three JS</b> {' '} and {' '}
        </a>
        <a href="https://google.com/search?q=gsap" target="_blank" rel="noreferrer">
          {/* <img src={gsapIcon.src} alt="gsap icon" width={20} />{' '} <b className="or">GSAP</b> */}
          <b className="or">GSAP</b>
        </a>
      </>,
      <>Mobile development with {' '}
        <a href="https://google.com/search?q=dart" target="_blank" rel="noreferrer">
          <img src={"https://cdn.jsdelivr.net/gh/devicons/devicon/icons/dart/dart-original.svg"} alt="dart icon" width={20} />{' '}
        </a>
        <a href="https://google.com/search?q=flutter" target="_blank" rel="noreferrer">
          <img src={"https://cdn.jsdelivr.net/gh/devicons/devicon/icons/flutter/flutter-original.svg"} alt="flutter icon" width={20} />{' '}
        </a>
      </>,
      <>Backend development with {' '}
        <a href="https://google.com/search?q=php" target="_blank" rel="noreferrer">
          <img src={"https://cdn.jsdelivr.net/gh/devicons/devicon/icons/php/php-original.svg"} alt="php icon" width={20} />{' '}
        </a>
        <a href="https://google.com/search?q=laravel" target="_blank" rel="noreferrer">
          <img src={laravelIcon.src} alt="laravel icon" width={20} />{' '} 
          {/* <b className="or">Laravel</b> */}
        </a>
        <a href="https://google.com/search?q=strapi" target="_blank" rel="noreferrer">
          <img src={"https://www.svgrepo.com/show/354399/strapi-icon.svg"} alt="strapi icon" width={20} />{' '}
        </a>
        and {' '} 
        <a href="https://google.com/search?q=python" target="_blank" rel="noreferrer">
          <img src={"https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg"} alt="python icon" width={20} />{' '}
        </a>
        <a href="https://google.com/search?q=django" target="_blank" rel="noreferrer">
          <img src={djangoIcon.src} alt="django icon" width={50} />{' '} soon
          {/* <b className="or">Django</b> */}
        </a> <br /><br />
      </>,
      
      <>Project versioning with {' '}
        <a href="https://google.com/search?q=git" target="_blank" rel="noreferrer">
          <img src={"https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg"} alt="git icon" width={20} />{' '}
        </a> and {' '}
        <a href="https://google.com/search?q=github" target="_blank" rel="noreferrer">
          <img src={"https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg"} alt="github icon" width={20} />{' '}<b className="or">Github</b>
        </a> 
      </>,
      <>Bash programming {' '}
        <a href="https://google.com/search?q=git" target="_blank" rel="noreferrer">
          <b className="or"><FaTerminal /></b>
        </a>
      </>,
    ]
  },
]
