import type { UserDataInterface, ValidataionInterface } from "../types";

type PropsInterface = {
  data: UserDataInterface;
  setData: React.Dispatch<React.SetStateAction<UserDataInterface>>;
  error: ValidataionInterface;
};

function Profile({ data, setData, error }: PropsInterface) {
  const { username, email, age } = data;

  const handleInput = (
    e: React.ChangeEvent<HTMLInputElement>,
    field: string
  ) => {
    const value = e.target.value;
    setData((prevData) => ({ ...prevData, [field]: value }));
  };

  return (
    <>
      <div className="form-group">
        <div className="form-element">
          <label htmlFor="username">Name</label>
          <input
            type="text"
            value={username}
            name="username"
            id="username"
            autoComplete="off"
            placeholder="Enter Name"
            onChange={(e) => handleInput(e, "username")}
            className={error.username ? "error" : ""}
          />
          {error.username && (
            <span className="error-message">{error.username}</span>
          )}
        </div>
        <div className="form-element">
          <label htmlFor="email">Email </label>
          <input
            type="email"
            name="email"
            id="email"
            value={email}
            autoComplete="off"
            placeholder="Enter Email"
            onChange={(e) => handleInput(e, "email")}
            className={error.email ? "error" : ""}
          />
          {error.email && <span className="error-message">{error.email}</span>}
        </div>
        <div className="form-element">
          <label htmlFor="age">Age </label>
          <input
            type="number"
            value={age}
            id="age"
            name="age"
            autoComplete="off"
            placeholder="Enter Age"
            onChange={(e) => handleInput(e, "age")}
            className={error.age ? "error" : ""}
          />
          {error.age && <span className="error-message">{error.age}</span>}
        </div>
      </div>
    </>
  );
}
export default Profile;
