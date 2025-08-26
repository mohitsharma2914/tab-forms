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

function Profile({ data, setData, errors }: PropsInterface) {
  const { username, email, age } = data;

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>, field: string) => {
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
            className={errors.username ? "error" : ""}
          />
          {errors.username && <span className="error-message">{errors.username}</span>}
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
            className={errors.email ? "error" : ""}
          />
          {errors.email && <span className="error-message">{errors.email}</span>}
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
            className={errors.age ? "error" : ""}
          />
          {errors.age && <span className="error-message">{errors.age}</span>}
        </div>
      </div>
    </>
  );
}
export default Profile;
