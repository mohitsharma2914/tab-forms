import { useState } from "react";
import Interest from "./Interest";
import Profile from "./Profile";
import Settings from "./Settings";

type UserDataInterface = {
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

function TabForm() {
  const [activeTab, setActiveTab] = useState(0);
  const [errors, setErrors] = useState<ValidationErrors>({});

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

  const validateField = (field: string, value: unknown): string | undefined => {
    switch (field) {
      case "username": {
        const username = String(value);
        if (!username || username.trim() === "") return "Name is required";
        if (username.length < 2) return "Name must be at least 2 characters";
        if (username.length > 70) return "Name must be less than 70 characters";
        return undefined;
      }
      case "email": {
        const email = String(value);
        if (!email || email.trim() === "") return "Email is required";
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) return "Please enter a valid email address";
        return undefined;
      }
      case "age": {
        const age = String(value);
        if (!age || age === "") return "Age is required";
        const ageNum = parseInt(age);
        if (isNaN(ageNum)) return "Age must be a number";
        if (ageNum < 18) return "Age must be at least 18";
        if (ageNum > 90) return "Age must be less than 90";
        return undefined;
      }
      case "interests": {
        const interests = Array.isArray(value) ? value : [];
        if (interests.length === 0) return "Please select at least one interest";
        return undefined;
      }
      default:
        return undefined;
    }
  };

  const validateCurrentTab = (): boolean => {
    const newErrors: ValidationErrors = {};
    const currentTabName = TabsData[activeTab].name;
    
    if (currentTabName === "Profile") {
      // Profile tab validation
      const usernameError = validateField("username", data.username);
      const emailError = validateField("email", data.email);
      const ageError = validateField("age", data.age);
      
      if (usernameError) newErrors.username = usernameError;
      if (emailError) newErrors.email = emailError;
      if (ageError) newErrors.age = ageError;
    } else if (currentTabName === "Interest") {
      // Interest tab validation
      const interestsError = validateField("interests", data.interests);
      if (interestsError) newErrors.interests = interestsError;
    }
    // Settings tab doesn't need validation as it's just theme selection
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateCurrentTab()) {
      setActiveTab((prev) => prev + 1);
    }
  };

  const handlePrev = () => {
    setActiveTab((prev) => prev - 1);
  };

  const handleSubmit = () => {
    if (validateCurrentTab()) {
      // send Data API Call
      console.log("Data", data);
    }
  };

  const ActiveTabComponent = TabsData[activeTab].component;
  return (
    <>
      <div className="wrapper">
        <div className="tab-group">
          {TabsData.map((item, index) => (
            <div
              key={index}
              className={`tab ${index == activeTab ? "active" : ""}`}
              onClick={() => setActiveTab(index)}
            >
              {item.name}
            </div>
          ))}
        </div>
        <div className="tab-body">
          <ActiveTabComponent
            data={data}
            setData={setData}
            errors={errors}
          />
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
      </div>
    </>
  );
}
export default TabForm;
