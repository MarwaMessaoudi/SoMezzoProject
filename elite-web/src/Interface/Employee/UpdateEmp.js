import React, { useState, useEffect } from "react";

const UpdateEmp = ({ user, onSubmit }) => {
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    birthDate: "",
    role: "",
    password: "",
    isActive: false,
  });

  useEffect(() => {
    if (user) {
      setFormData({
        first_name: user.first_name || "",
        last_name: user.last_name || "",
        email: user.email || "",
        birthDate: user.birthDate ? user.birthDate.split("T")[0] : "",
        role: user.role || "",
        password: user.password || "",
        isActive: user.isActive || false,
      });
    }
  }, [user]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return React.createElement(
    "form",
    { onSubmit: handleSubmit },
    React.createElement("div", { className: "form-group", key: "first_name" },
      React.createElement("label", { htmlFor: "first_name" }, "First Name"),
      React.createElement("input", {
        type: "text",
        name: "first_name",
        value: formData.first_name,
        onChange: handleChange,
        placeholder: "Enter first name",
        required: true,
        className: "form-control"
      })
    ),
    React.createElement("div", { className: "form-group", key: "last_name" },
      React.createElement("label", { htmlFor: "last_name" }, "Last Name"),
      React.createElement("input", {
        type: "text",
        name: "last_name",
        value: formData.last_name,
        onChange: handleChange,
        placeholder: "Enter last name",
        required: true,
        className: "form-control"
      })
    ),
    React.createElement("div", { className: "form-group", key: "email" },
      React.createElement("label", { htmlFor: "email" }, "Email"),
      React.createElement("input", {
        type: "email",
        name: "email",
        value: formData.email,
        onChange: handleChange,
        placeholder: "Enter email",
        required: true,
        className: "form-control"
      })
    ),
    React.createElement("div", { className: "form-group", key: "birthDate" },
      React.createElement("label", { htmlFor: "birthDate" }, "Birth Date"),
      React.createElement("input", {
        type: "date",
        name: "birthDate",
        value: formData.birthDate,
        onChange: handleChange,
        required: true,
        className: "form-control"
      })
    ),
    React.createElement("div", { className: "form-group", key: "role" },
      React.createElement("label", { htmlFor: "role" }, "Role"),
      React.createElement("select", {
        name: "role",
        value: formData.role,
        onChange: handleChange,
        required: true,
        className: "form-control"
      },
        React.createElement("option", { value: "" }, "Select Role"),
        React.createElement("option", { value: "ADMIN" }, "Admin"),
        React.createElement("option", { value: "USER" }, "User"),
        React.createElement("option", { value: "MANAGER" }, "Manager")
      )
    ),
    React.createElement("div", { className: "form-group", key: "password" },
      React.createElement("label", { htmlFor: "password" }, "Password"),
      React.createElement("input", {
        type: "password",
        name: "password",
        value: formData.password,
        onChange: handleChange,
        placeholder: "Enter password",
        required: true,
        className: "form-control"
      })
    ),
    React.createElement("div", { className: "form-group", key: "isActive" },
      React.createElement("div", { className: "form-check" },
        React.createElement("input", {
          type: "checkbox",
          name: "isActive",
          id: "isActive",
          checked: formData.isActive,
          onChange: handleChange,
          className: "form-check-input"
        }),
        React.createElement("label", { className: "form-check-label", htmlFor: "isActive" }, "Is Active")
      )
    ),
    React.createElement(
      "button",
      { type: "submit", className: "btn btn-primary", style: { marginTop: "1rem" } },
      "Update User"
    )
  );
};

export default UpdateEmp;