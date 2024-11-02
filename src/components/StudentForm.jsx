import React from "react";

//Make an array of years from 2000 to current year
const date = new Date();
const year = date.getFullYear();
const years = [];
for (let i = 2000; i <= year; i++) {
  years.push(i);
}

//Make an array of classes
const classNames = ["X", "XI", "XII"];
const classMajors = ["MIPA", "IPS"];
const classRange = 5;
const classes = [];

classNames.forEach((className) => {
		classMajors.forEach((major) => {
		for (let i = 1; i <= classRange; i++) {
    	classes.push(`${className} ${major} ${i}`);
		}
  });
});



const StudentForm = ({formValidation, form, handleChange, handleSubmit, isLoading, isAddStudent, handleEdit}) => {
  return (
    <form onSubmit={isAddStudent ? handleSubmit : handleEdit} className="mb-4 mx-2 needs-validation" >
      <div className="mb-3">
        <label htmlFor="name" className="form-label">
          Name
        </label>
        <input 
          type="text" 
          id="name" 
          className={`form-control ${formValidation.name.isValid}`} 
          name="name"
          value={form.name}
          onChange={handleChange}
          required
        />
        <div id="nameFeedback" className="invalid-feedback">
          {formValidation.name.message}
        </div>
      </div>

      <div className="mb-3">
        <label htmlFor="class" className="form-label">
          Class
        </label>
        <select 
          id="class" 
          onChange={handleChange}
          className={`form-select ${formValidation.class.isValid}`} 
          value={form.class}
          name="class"
          required
        >
          <option value="">Select Class</option>
          {classes.map((className, index) => {
            return (
              <option key={index} value={className}>
                {className}
              </option>
            );
          })}
        </select>
        <div id="classFeedback" className="invalid-feedback">
          Please choose a class.
        </div>
      </div>

      <div className="mb-3">
        <label htmlFor="year" className="form-label">
          Year
        </label>
        <select 
          id="year" 
          aria-label="Default select example"
          className={`form-select ${formValidation.year.isValid}`} 
          onChange={handleChange}
          value={form.year}
          name="year"
          required
        >
          <option value="">Select year</option>
          {years.map((year, index) => {
            return (
              <option key={index} value={year}>
                {year}
              </option>
            );
          })}
        </select>
        <div id="yearFeedback" className="invalid-feedback">
          Please choose a year.
        </div>
      </div>

      <div className="mb-3">
        <label htmlFor="nim" className="form-label">
          NIM
        </label>
        <input 
          type="text" 
          inputMode="numeric" 
          id="nim"
          className={`form-control ${formValidation.nim.isValid}`} 
          name="nim"
          value={form.nim}
          onChange={handleChange} 
          required
        />
        <div id="nimFeedback" className="invalid-feedback">
          NIM shuld be unique
        </div>
      </div>

      <div className="mb-3">
        <label htmlFor="guardian-name" className="form-label">
          Guardian&apos;s Name
        </label>
        <input 
          type="text" 
          inputMode="numeric" 
          id="guardian-name"
          className={`form-control ${formValidation.guardian_name.isValid}`} 
          name="guardian_name"
          value={form.guardian_name}
          onChange={handleChange}
          required
        />
        <div id="guardianNameFeedback" className="invalid-feedback">
          Guardian name is required!
        </div>
      </div>

      <div className="mb-3">
        <label htmlFor="birthDate" className="form-label">
          Birth Date
        </label>
        <input 
          type="date" 
          id="birthDate" 
          className={`form-control ${formValidation.birthDate.isValid}`} 
          name="birthDate"
          value={form.birthDate}
          onChange={handleChange}
          required
        />
        <div id="birthDateFeedback" className="invalid-feedback">
          Birth date is required
        </div>
      </div>

      <div className="mb-3">
        <label htmlFor="address" className="form-label">
          Address
        </label>
        <textarea
          name="address"
          id="address"
          value={form.address}
          className={`form-control ${formValidation.address.isValid}`}
          onChange={handleChange}
          required
        ></textarea>
        <div id="addressFeddback" className="invalid-feedback">
          Address is required
        </div>
      </div>

      <div className="mb-3">
        <div className="form-check form-check-inline">
          <input
            className="form-check-input"
            type="radio"
            name="gender"
            id="male"
            value="male"
            checked = {form.gender === "male"}
            onChange={handleChange}
            required
          />
          <label className="form-check-label" htmlFor="male">
            Male
          </label>
        </div>
        <div className="form-check form-check-inline">
          <input
            className="form-check-input"
            type="radio"
            name="gender"
            id="female"
            value="female"
            checked = {form.gender === "female"}
            onChange={handleChange}
            required
          />
          <label className="form-check-label" htmlFor="female">
            Female
          </label>
        </div>
      </div>

      <button 
        type="submit" 
        className="btn btn-primary"
        disabled={isLoading}
      >
        Submit
      </button>
    </form>
  );
};

export default StudentForm;
