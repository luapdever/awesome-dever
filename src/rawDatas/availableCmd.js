import { formations, listSkills } from "./aboutMe";

export const availableCmds = [
  {
    id: "help",
    output: (
      <>
        <p>Available commands : </p>
        <div>
          <ul>
            <li>
              <b className="or">help</b> : Display command manual.
            </li>
            <li>
              <b className="or">clear or cls</b> : Clear console.
            </li>
            <li>
              <b className="or">about</b> : Display my small description.
            </li>
            <li>
              <b className="or">edu</b> : View my educational background.
            </li>
            <li>
              <b className="or">skills</b> : Show my technical skills.
            </li>
            <li>
              <b className="or">spare</b> : Show my spare times.
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: "about",
    output: (
      <p>
        Yes of course, <b>Luap Dever</b> is not my real name but just a
        nickname. From my real name <b>Paul M. ZANNOU</b> (don't try to find out
        the meaning of <b>M.</b> 🙃) and born June 30, 2001 in{" "}
        <a
          href="http://google.com/search?q=Cotonou"
          target="_blank"
          rel="noreferrer"
        >
          <b>Cotonou</b>
        </a>
        , I am a <b>fullstack developer</b> of digital solutions, creative
        interfaces, web services, APIs. With three years of experience in{" "}
        <b>Internet and Multimedia</b>, I marvelously merge <b>2D</b>, <b>3D</b>{" "}
        and text (I'm talking about <b>code</b> 🙄) to make interactive and
        experimental applications that respond to given <b>solutions</b>. <br />
        <span>
          Exploring the world of software and applications, the world of
          graphics and the web, without forgetting distraction through the
          composition of <b>lyrics</b>, <b>music</b>, my goal is to avoid
          loneliness, find peace by developing solutions 😇.
        </span>
      </p>
    ),
  },
  {
    id: "edu",
    output: (
      <>
        <p>
          My educational background
        </p>
        <ul>
          {formations.map((form, ind) => (
            <li key={"Form" + ind}>
              <b>{form.title}</b> : <span>{form.details}</span>
            </li>
          ))}
        </ul>
      </>
    ),
  },
  {
    id: "skills",
    output: (
      <>
        <p>My technical skills</p>
        {listSkills.map((skill, index) => (
          <div key={"Field" + index}>
            <h6>{skill.field}</h6>
            <ul>
              {skill.skills.map((sk, ind) => (
                <li key={"Skill" + ind}>{sk}</li>
              ))}
            </ul>
          </div>
        ))}
      </>
    ),
  },
	{
		id: "spare",
		output: <>
        <p>My spare times</p>
        <ul>
					<li>Watching football</li>
					<li>Composing song</li>
					<li>Reading book</li>
				</ul>
      </>
	}
];
