import React, { useState } from 'react';
import './user-form.css';

function UserForm({onFormSubmit}) {
  // Initialize state variables for form input values and error messages
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    country: '',
  });
  const [formErrors, setFormErrors] = useState({
    name: '',
    email: '',
    phone: '',
    country: '',
  });

  // Handle form submission
  const handleSubmit = (event) => {
    event.preventDefault();
    // Validate form input values
    let isValid = true;
    const newErrors = {
      name: '',
      email: '',
      phone: '',
      country: '',
    };
    if (!formData.name) {
      newErrors.name = 'Please enter your name.';
      isValid = false;
    }
    if (!formData.email) {
      newErrors.email = 'Please enter your email.';
      isValid = false;
    }
    if (!formData.phone) {
      newErrors.phone = 'Please enter your phone number.';
      isValid = false;
    }
    if (!formData.country) {
      newErrors.country = 'Please enter your country.';
      isValid = false;
    }
    setFormErrors(newErrors);
    if (isValid) {
      // TODO: submit data to server or other action
      console.log(formData);
      onFormSubmit(formData)
      // Clear form input values and error messages
      setFormData({
        name: '',
        email: '',
        phone: '',
        country: '',
      });
      setFormErrors({
        name: '',
        email: '',
        phone: '',
        country: '',
      });
    }
  };

  // Handle form input changes and validate input values
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
    setFormErrors((prevErrors) => ({
      ...prevErrors,
      [name]: value ? '' : `Please enter your ${name}.`,
    }));
  };

  return (
    <div className="form-card">
    <h2>Enter your details</h2>
    <form onSubmit={handleSubmit}>
      <div className="form-group">
        <label htmlFor="name">Name:</label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleInputChange}
        />
        <span>{formErrors.name}</span>
      </div>

      <div className="form-group">
        <label htmlFor="email">Email:</label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleInputChange}
        />
        <span>{formErrors.email}</span>
      </div>

      <div className="form-group">
        <label htmlFor="phone">Phone:</label>
        <input
          type="tel"
          id="phone"
          name="phone"
          value={formData.phone}
          onChange={handleInputChange}
        />
        <span>{formErrors.phone}</span>
      </div>

      <div className="form-group">
        <label htmlFor="country">Country:</label>
        <input
          type="text"
          id="country"
          name="country"
          value={formData.country}
          onChange={handleInputChange}
        />
        <span>{formErrors.country}</span>
      </div>

      <button type="submit">Submit</button>
    </form>
    </div>
  );
}

export default UserForm;
