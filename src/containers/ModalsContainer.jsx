import React, { Component } from "react";
import Modal from "react-bootstrap/Modal";
import StudentInfo from "../components/StudentInfo";
import StudentForm from "../components/StudentForm";
import apiService from "../utils/api";
import Swal from "sweetalert2";

class ModalsContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
    };
  }


  //pending alert
  handleSubmit = (e) => {
    e.preventDefault();
    const formData = this.props.form;
    this.setState({
      isLoading: true,
    });
    apiService
      .postNewStudent(formData)
      .then((result) => { 
        this.props.customAlert(result.data.message);
        this.props.handleCloseModal();
      })
      .catch((error) => {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: `${error.response.data.message}`,
        });
      })
      .finally(() => {
        this.setState({
          isLoading: false,
        });
        this.props.getStudents();
      });
  };

  handleEdit = (e) => {
    e.preventDefault();
    const formData = this.props.form;
    const id = this.props.currentStudent.id;
    apiService.updateStudent(id, formData)
      .then((result) => {
        this.setState({
          isLoading: true,
        });
        this.props.customAlert(result.data.message);
        this.props.handleCloseModal();
      })
      .catch((error) => {
        console.log(error);
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: `${error.response.data.message}`,
        });
      })
      .finally(() => {
        this.setState({
          isLoading: false,
        });
        this.props.getStudents();
      });
  };


  render() {
    return (
      <Modal
        show={this.props.isShowModal}
        onHide={this.props.handleCloseModal}
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title className="">
            {this.props.isStudentDetail
              ? "Student Details"
              : this.props.isAddStudent
              ? "Add Student"
              : "Edit Student"}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {this.props.isStudentDetail ? (
            <StudentInfo 
              currentStudent={this.props.currentStudent}
            />
          ) : (
            <StudentForm
              form={this.props.form}
              handleChange={this.props.handleChange}
              formValidation={this.props.formValidation}
              handleSubmit={this.handleSubmit}
              isLoading={this.state.isLoading}
              isAddStudent={this.props.isAddStudent}
              handleEdit={this.handleEdit}
            />
          )}
        </Modal.Body>
      </Modal>
    );
  }
}

export default ModalsContainer;
