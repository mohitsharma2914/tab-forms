import type { UserDataInterface, ValidataionInterface } from "../types";

type PropsInterface = {
  data: UserDataInterface;
  setData: React.Dispatch<React.SetStateAction<UserDataInterface>>;
  error: ValidataionInterface;
};

function Interest({ data, setData, error }: PropsInterface) {
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
        {error.interests && (
          <span className="error-message">{error.interests}</span>
        )}
      </div>
    </>
  );
}
export default Interest;
