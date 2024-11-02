import React from "react";

const StudentInfo = ({currentStudent}) => {
  return (
    <table className="table table-borderless">
      <tbody>
        <tr>
          <th scope="row">Id</th>
          <td>{currentStudent.id}</td>
        </tr>
        <tr>
          <th scope="row">NIM</th>
          <td>{currentStudent.nim}</td>
        </tr>
        <tr>
          <th scope="row">Name</th>
          <td>{currentStudent.name}</td>
        </tr>
        <tr>
          <th scope="row">Class</th>
          <td>{currentStudent.class}</td>
        </tr>
        <tr>
          <th scope="row">Year</th>
          <td>{currentStudent.year}</td>
        </tr>
        <tr>
          <th scope="row">Guardian Name</th>
          <td>{currentStudent.guardian_name}</td>
        </tr>
        <tr>
          <th scope="row">Birth Date</th>
          <td>{currentStudent.birthDate}</td>
        </tr>
        <tr>
          <th scope="row">Address</th>
          <td>{currentStudent.address}</td>
        </tr>
        <tr>
          <th scope="row">Gender</th>
          <td>{currentStudent.gender}</td>
        </tr>
      </tbody>
    </table>
  );
};

export default StudentInfo;
