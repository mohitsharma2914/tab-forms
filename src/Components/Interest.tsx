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

function Interest({ data, setData, errors }: PropsInterface) {
  const { interests } = data;

  const interestsData = ["Coding", "Treking", "Badminton", "Cricket", "Music"];

  const handleInterest = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { checked, value } = e.target;
    setData((prevData) => ({
      ...prevData,
      interests: checked
        ? [...interests, value]
        : interests.filter((item) => item !== value),
    }));
  };
  
  return (
    <>
      <div className="form-group checkbox">
        <h4>Select Your Interests</h4>
        {interestsData.map((item) => (
          <label key={item}>
            <input
              type="checkbox"
              name={item}
              value={item}
              checked={interests.includes(item)}
              onChange={handleInterest}
            />
            {item}
          </label>
        ))}
        {errors.interests && <span className="error-message">{errors.interests}</span>}
      </div>
    </>
  );
}
export default Interest;
