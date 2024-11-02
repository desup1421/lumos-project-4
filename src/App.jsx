import React, { Component } from "react";
import StudentsContainer from "./containers/StudentsContainer";
import ModalsContainer from "./containers/ModalsContainer";
import apiService from "./utils/api";
import Swal from "sweetalert2";

class App extends Component {
  // Modal state
  constructor(props) {
    super(props);
    this.state = {
      isShowModal: false,
      isStudentDetail: true,
      isAddStudent: true,
      form: {
        name: "",
        class: "",
        year: "",
        nim: "",
        guardian_name: "",
        birthDate: "",
        address: "",
        gender: "male",
      },
      formValidation: {
        name: {
          isValid: "",
          message: "",
        },
        class: {
          isValid: "",
          message: "Class is required!",
        },
        year: {
          isValid: "",
          message: "Year is required!",
        },
        nim: {
          isValid: "",
          message: "NIM is required!",
        },
        guardian_name: {
          isValid: "",
          message: "Guardian name is required!",
        },
        birthDate: {
          isValid: "",
          message: "Birth date is required!",
        },
        address: {
          isValid: "",
          message: "Address is required!",
        },
      },
      students: [],
      defaultStudentForm: {
        name: "",
        class: "",
        year: "",
        nim: "",
        guardian_name: "",
        birthDate: "",
        address: "",
        gender: "male",
      },
      currentStudent: {},
      isSearch: false,
      searchInput: "",
      searchResults: [],
    };
  }

  handleChange = (e) => {
    //State for update the input value
    const { name, value } = e.target;
    this.state.isAddStudent &&
      this.setState({ form: this.state.defaultStudentForm });
    this.setState({
      form: {
        ...this.state.form,
        [name]: value,
      },
    });

    //Conditional for validation
    if (name === "name") {
      this.setState({
        formValidation: {
          ...this.state.formValidation,
          name: {
            isValid: value.length >= 2 ? "is-valid" : "is-invalid",
            message: "Name is required!",
          },
        },
      });
    }
    if (name === "class") {
      this.setState({
        formValidation: {
          ...this.state.formValidation,
          class: {
            isValid: value ? "is-valid" : "is-invalid",
            message: "Class is required!",
          },
        },
      });
    }
    if (name === "year") {
      this.setState({
        formValidation: {
          ...this.state.formValidation,
          year: {
            isValid: value ? "is-valid" : "is-invalid",
            message: "Year is required!",
          },
        },
      });
    }
    if (name === "nim") {
      this.setState({
        formValidation: {
          ...this.state.formValidation,
          nim: {
            isValid: value ? "is-valid" : "is-invalid",
            message: "NIM is required!",
          },
        },
      });
    }
    if (name === "guardian_name") {
      this.setState({
        formValidation: {
          ...this.state.formValidation,
          guardian_name: {
            isValid: value.length >= 2 ? "is-valid" : "is-invalid",
            message: "Name is required!",
          },
        },
      });
    }
    if (name === "birthDate") {
      this.setState({
        formValidation: {
          ...this.state.formValidation,
          birthDate: {
            isValid: value ? "is-valid" : "is-invalid",
            message: "Birth date is required!",
          },
        },
      });
    }
    if (name === "address") {
      this.setState({
        formValidation: {
          ...this.state.formValidation,
          address: {
            isValid: value.length >= 20 ? "is-valid" : "is-invalid",
            message: "Address is required!",
          },
        },
      });
    }
  };

  resetFormValidation = () => {
    this.setState({
      formValidation: {
        name: {
          isValid: "",
          message: "",
        },
        class: {
          isValid: "",
          message: "Class is required!",
        },
        year: {
          isValid: "",
          message: "Year is required!",
        },
        nim: {
          isValid: "",
          message: "NIM is required!",
        },
        guardian_name: {
          isValid: "",
          message: "Guardian name is required!",
        },
        birthDate: {
          isValid: "",
          message: "Birth date is required!",
        },
        address: {
          isValid: "",
          message: "Address is required!",
        },
      }
    })
  }

  // Modal handling functions
  handleCloseModal = () => {
    this.setState({ isShowModal: false });
    this.resetFormValidation();
  };
  handleShowModal = (e, student = this.state.defaultStudentForm) => {
    e.stopPropagation();
    const modalType = e.currentTarget.getAttribute("data-type");
    this.setState({
      isShowModal: true,
      isStudentDetail: modalType === "studentDetail" ? true : false,
      isAddStudent: modalType === "addStudent" ? true : false,
      form: student,
      currentStudent: student,
    });
  };

  /// Student CRUD
  getStudents = () => {
    apiService
      .getStudentList()
      .then((response) => {
        this.setState({ students: response.data.data });
      })
      .catch((error) => {
        console.error("Error fetching students:", error);
      });
  };

  componentDidMount() {
    this.getStudents();
  }

  customAlert = (message) => {
    const Toast = Swal.mixin({
      toast: true,
      position: "top-end",
      showConfirmButton: false,
      timer: 3000,
      timerProgressBar: true,
      didOpen: (toast) => {
        toast.onmouseenter = Swal.stopTimer;
        toast.onmouseleave = Swal.resumeTimer;
      },
    });

    Toast.fire({
      icon: "success",
      title: message,
    });
  };


  handleDelete = (e, student) => {
    e.stopPropagation();
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes",
      customClass: {
        confirmButton: "btn btn-primary",
        cancelButton: "btn btn-danger",
      },
    }).then((result) => {
      if (result.isConfirmed) {
        const id = student.id;
        apiService
          .deleteStudent(id)
          .then((result) => {
            this.setState({
              isLoading: true,
            });
            Swal.fire({
              title: "Deleted!",
              text: result.data.message,
              icon: "success",
              customClass: {
                confirmButton: "btn btn-primary",
              },
            });
          })
          .catch((error) => {
            console.error("Error adding student:", error);
          })
          .finally(() => {
            this.setState({
              isLoading: false,
            });
            this.handleCloseModal();
            this.getStudents();
          });
      }
    });
  };

  handleSearch = (e) => {
    //Change search input to lowercase
    const searchItem = e.target.value.toLowerCase();

    //use filter to match the search item with student's name or class
    const filteredStudents = this.state.students.filter(
      (student) =>
        student.name.toLowerCase().includes(searchItem) ||
        student.class.toLowerCase().includes(searchItem)
    );

    //Set state for search
    this.setState({
      isSearch: true,
      searchInput: e.target.value,
      searchResults: filteredStudents,
    });
  };

  render() {
    return (
      <div className="container">
        <StudentsContainer
          handleShowModal={this.handleShowModal}
          students={this.state.students}
          handleDelete={this.handleDelete}
          handleSearch={this.handleSearch}
          searchInput={this.state.searchInput}
          isSearch={this.state.isSearch}
          searchResults={this.state.searchResults}
        />
        <ModalsContainer
          handleCloseModal={this.handleCloseModal}
          isShowModal={this.state.isShowModal}
          isStudentDetail={this.state.isStudentDetail}
          isAddStudent={this.state.isAddStudent}
          form={this.state.form}
          handleChange={this.handleChange}
          formValidation={this.state.formValidation}
          currentStudent={this.state.currentStudent}
          getStudents={this.getStudents}
          customAlert={this.customAlert}
        />
      </div>
    );
  }
}

export default App;
