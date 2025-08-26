import { useEffect, useState } from "react";
import Interest from "./Interest";
import Profile from "./Profile";
import Settings from "./Settings";
import type { UserDataInterface, ValidataionInterface } from "../types";

function TabForm() {
  const [activeTab, setActiveTab] = useState(0);
  const [error, setError] = useState<ValidataionInterface>({});
  const [isSuccess, setSuccess] = useState(false);
  const userData = {
    username: "",
    email: "",
    age: "",
    interests: [],
    theme: "light",
  };
  const [data, setData] = useState<UserDataInterface>(userData);
  const TabsData = [
    {
      name: "Profile",
      component: Profile,
    },
    {
      name: "Interest",
      component: Interest,
    },
    {
      name: "Settings",
      component: Settings,
    },
  ];

  const ActiveTabComponent = TabsData[activeTab].component;

  const validationFiled = (field: string) => {
    switch (field) {
      case "username": {
        const username = data.username;
        const userNum = parseInt(username);
        if (!isNaN(userNum)) return "Please enter name not a number";
        if (!username || username.trim() === "") return "Name cannot be empty";
        if (username.length < 2 || username.length > 70)
          return "Enter valid name";
        return undefined;
      }
      case "email": {
        const email = data.email;
        if (!email || email.trim() === "") return "Email cannot be empty";
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!regex.test(email)) return "Enter valid Email";
        return undefined;
      }
      case "age": {
        const ageString = String(data.age);
        if (!ageString || ageString === "") return "Age is required";
        const age = parseInt(ageString);
        if (isNaN(age)) return "Age must be a number";
        if (age < 18 || age > 90) return "Enter valid Age";
        return undefined;
      }
      case "interests": {
        const interests = data.interests;
        if (interests.length == 0) return "Please select atleast one Interest";
        return undefined;
      }
      default:
        return undefined;
    }
  };

  const validateActiveTab = () => {
    const tab = TabsData[activeTab].name;
    const errors: ValidataionInterface = {};
    if (tab == "Profile") {
      const username = validationFiled("username");
      const email = validationFiled("email");
      const age = validationFiled("age");
      if (username) errors.username = username;
      if (email) errors.email = email;
      if (age) errors.age = age;
    } else if (tab == "Interest") {
      const interests = validationFiled("interests");
      if (interests) errors.interests = interests;
    }
    setError(errors);
    return Object.keys(errors).length === 0;
  };

  useEffect(() => {
    console.log(error);
  }, [error]);

  const handleNext = () => {
    if (validateActiveTab()) {
      setActiveTab((prev) => prev + 1);
    }
  };

  const handlePrev = () => {
    setActiveTab((prev) => prev - 1);
  };

  const handleSubmit = () => {
    if (validateActiveTab()) {
      // send Data API Call
      setSuccess(true);
      console.log("Data", data);
    }
  };

  return (
    <>
      <div className="wrapper">
        <div className="tab-group">
          {TabsData.map((item, index) => (
            <div
              key={index}
              className={`tab ${index == activeTab ? "active" : ""}`}
              onClick={() => validateActiveTab() && setActiveTab(index)}
            >
              {item.name}
            </div>
          ))}
        </div>
        <div className="tab-body">
          <ActiveTabComponent data={data} setData={setData} error={error} />
        </div>
        <div className="button-groups">
          <button disabled={activeTab == 0} onClick={handlePrev}>
            Prev
          </button>
          {activeTab < TabsData.length - 1 && (
            <button onClick={handleNext}>Next</button>
          )}
          {activeTab === TabsData.length - 1 && (
            <button onClick={handleSubmit}>Submit</button>
          )}
        </div>
        {isSuccess && (
          <p className="success-message">Form sumbitted successfully!</p>
        )}
      </div>
    </>
  );
}
export default TabForm;
