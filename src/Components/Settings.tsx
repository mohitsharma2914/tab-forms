type UserData = {
  username: string;
  age: number | string;
  email: string;
  interests: string[];
  theme: string;
};

type ValidationErrors = {
  username?: string;
  email?: string;
  age?: string;
  interests?: string;
};

type PropsInterface = {
  data: UserData;
  setData: React.Dispatch<React.SetStateAction<UserData>>;
  errors: ValidationErrors;
};

function Settings({ data, setData }: PropsInterface) {
  const { theme } = data;

  const handleTheme = (e: React.ChangeEvent<HTMLInputElement>) => {
    setData((prev) => ({
      ...prev,
      theme: e.target.value,
    }));
  };

  return (
    <>
      <div className="form-groups radio">
        <h4>Preferred Theme</h4>
        <label>
          <input
            type="radio"
            name="theme"
            value="light"
            checked={theme === "light"}
            onChange={handleTheme}
          />
          Light
        </label>
        <label>
          <input
            type="radio"
            name="theme"
            value="dark"
            checked={theme === "dark"}
            onChange={handleTheme}
          />
          Dark
        </label>
      </div>
    </>
  );
}
export default Settings;
