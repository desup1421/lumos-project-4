import React from "react";

const StudentsTable = ({handleShowModal, students, handleDelete}) => {
  return (
    <table className="students-table table table-striped table-hover caption-top table-bordered">
      <caption>Students Table</caption>
      <thead>
        <tr>
          <th colSpan="4">
            <button data-type="addStudent" onClick={(e) => handleShowModal(e)} className="btn btn-primary btn-sm float-end">
              <i className="bx bx-add-to-queue"></i> Add new student
            </button>
          </th>
        </tr>
        <tr>
          <th colSpan="4">
            <form>
              <input type="text" className="form-control" placeholder="Search by name" id="search-input" />
            </form>
          </th>
        </tr>
        <tr>
          <th scope="col">No</th>
          <th scope="col">Name</th>
          <th scope="col">Class</th>
          <th scope="col">Actions</th>
        </tr>
      </thead>
      <tbody className="table-group-divider">
        {students.map((student, index) => (
          <tr key={student.id} data-type="studentDetail" onClick={(e) => handleShowModal(e, student)} >
            <th scope="row">{index + 1}</th>
            <td>{student.name}</td>
            <td>{student.class}</td>
            <td>
              <div className="gap-1 d-flex justify-content-end">
                <button data-type="editStudent" onClick={(e) => handleShowModal(e, student)} className="btn btn-outline-primary btn-sm me-1">
                  <i className="bx bxs-edit-alt"></i>
                </button>
                <button onClick={(e) => handleDelete(e, student)} className="btn btn-outline-danger btn-sm">
                  <i className="bx bxs-trash"></i>
                </button>
              </div>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default StudentsTable;