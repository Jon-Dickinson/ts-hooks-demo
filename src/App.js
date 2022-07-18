import { createContext, useContext, useState } from "react";
import UseStateComponent from "./UseStateComponent";
import UseEffectComponent from "./UseEffectComponent";
import UseContextComponent from "./UseContextComponent";
import UseReducerComponent from "./UseReducerComponent";
import UseRefComponent from "./UseRefComponent";
import CustomHookComponent from "./CustomHookComponent";

const ThemeContext = createContext(null);
const CurrentUserContext = createContext(null);

export default function App() {
  const [theme, setTheme] = useState("light");
  const [currentUser, setCurrentUser] = useState(null);

  return (
    <ThemeContext.Provider value={theme}>
      <div className="vertical-mid-container">
        <CurrentUserContext.Provider
          value={{
            currentUser,
            setCurrentUser,
          }}
        >
          <Form />
        </CurrentUserContext.Provider>
        <label>
          <input
            type="checkbox"
            checked={theme === "dark"}
            onChange={(e) => {
              setTheme(e.target.checked ? "dark" : "light");
            }}
          />
          Use dark mode
        </label>
        <h1>Custom Hook</h1>
        <CustomHookComponent />
        <h1>useRef</h1>
        <UseRefComponent />
        <h1>useReducer</h1>
        <UseReducerComponent />
        <h1>useContext</h1>
        <UseContextComponent />
        <h1>useEffect</h1>
        <UseEffectComponent />
        <h1>useState</h1>
        <UseStateComponent />
      </div>
    </ThemeContext.Provider>
  );
}

function Form({ children }) {
  return (
    <Panel title="Welcome">
      <LoginButton />
    </Panel>
  );
}

function LoginButton() {
  const { currentUser, setCurrentUser } = useContext(CurrentUserContext);

  if (currentUser !== null) {
    return <p>You logged in as {currentUser.name}.</p>;
  }

  return (
    <Button
      onClick={() => {
        setCurrentUser({ name: "Admin" });
      }}
    >
      Log in as Admin
    </Button>
  );
}

function Panel({ title, children }) {
  const theme = useContext(ThemeContext);
  const className = "panel-" + theme;
  return (
    <section className={className}>
      <h1>{title}</h1>
      {children}
    </section>
  );
}

function Button({ children, onClick }) {
  const theme = useContext(ThemeContext);
  const className = "button-" + theme;
  return (
    <button className={className} onClick={onClick}>
      {children}
    </button>
  );
}
