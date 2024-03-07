import React, { useEffect, useState } from 'react';
import axios from 'axios'; // Import axios for making HTTP requests

const Form = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    department: '',
    message: '',
    file: null 
  });

  const handleInputChange =(e)=>{
    const {name,value}=e.target;
    setFormData({
      ...formData,
      [name]:value,
    })
  }
  const handleFileChange = (e) => {
    setFormData({
      ...formData,
      file: e.target.files[0] // Store selected file
    });
  };


  const handleSubmit = async (e) => {
    e.preventDefault();

    const formDataToSend = new FormData();
    formDataToSend.append('name', formData.name);
    formDataToSend.append('email', formData.email);
    formDataToSend.append('phone', formData.phone);
    formDataToSend.append('company', formData.company);
    formDataToSend.append('department', formData.department);
    formDataToSend.append('message', formData.message);
    formDataToSend.append('file', formData.file); 

    try {
      const response = await axios.post('http://localhost:3001/contact-form', formDataToSend, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      console.log('Response status:', response.status);

      const data = response.data;

      if (data.status === 'error') {
        window.alert('Form submission unsuccessful');
        console.log('Invalid form submission');
      } else {
        alert('Form submitted successfully');
        console.log('Successful submission');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Error submitting contact form.');
    }
  };
  return (
    <div className="form-container">
      <h2>Contact Us</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="phone">Phone:</label>
          <input
            type="tel"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="company">Company:</label>
          <input
            type="text"
            id="company"
            name="company"
            value={formData.company}
            onChange={handleInputChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="department">Department:</label>
          <input
            type="text"
            id="department"
            name="department"
            value={formData.department}
            onChange={handleInputChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="message">Message:</label>
          <textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleInputChange}
            rows={6}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="file">Attach File:</label>
          <input
            type="file"
            id="file"
            name="file"
            onChange={handleFileChange}
            accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
          />
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default Form;
