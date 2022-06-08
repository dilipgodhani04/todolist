import React, { Component, useState } from "react";

// const get = JSON.stringify(localStorage.getItem("crud"));
// const setUs = [get];

class AddForm extends Component {
  constructor(props) {
    super(props);
    // var flag= 0;
    this.state = {
      arry: [] || JSON.stringify(localStorage.getItem("crud")),
      // arry:[],
      act: 0,
      index: "",
      item: {
        firstname: "",
        fathername: "",
        surname: "",
      },
      id: "",
    };
  }

  handleEdit(id) {
    // this.state.act=1
    let crud = JSON.parse(localStorage.getItem("crud"));
    console.log(crud);
    let def = crud[id];

    this.setState({
      item: {
        firstname: def.firstname,
        fathername: def.fathername,
        surname: def.surname,
      },
    });
    this.state.id = id;
  }

  submitForm = async (e) => {
    // e.preventDefault();
    if (this.state.id === "") {
      await this.setState({ arry: [...this.state.arry, this.state.item] });
      console.log(this.state.arry, "arry");
      let abc = JSON.parse(localStorage.getItem("crud", this.state.arry));
      this.setState({ item: { firstname: "", fathername: "", surname: "" } });
      console.log("thos.state---->", this.state.arry);
      abc.push(this.state.arry);
      localStorage.setItem("crud", JSON.stringify(abc));
    } else {
      console.log("else");
      this.state.arry[this.state.id] = this.state.item;
      this.setState({ arry: this.state.arry });
    }
    
  };

  showData = async () => {
    let data = await JSON.parse(localStorage.getItem("crud", this.state.arry));
    console.log("data",data);
    await this.setState({ arry: data });
    console.log("log", this.state.arry);
  };

  handleChange(e) {
    this.setState({
      item: { ...this.state.item, [e.target.name]: e.target.value },
    });
  }

  handleDelet = (index) => {
    let arry = this.state.arry;

    arry.splice(index, 1);
    this.setState({
      arry: arry,
    });
  };

  render() {
    return (
      <>
        <div className="col-md-6">
          <form>
            <div className="mb-2">
              <input
                type="text"
                name="firstname"
                placeholder="Enter your Name"
                className=" form-control"
                value={this.state.item.firstname}
                onChange={(e) => this.handleChange(e)}
              />
            </div>
            <div className="mb-2">
              <input
                type="text"
                name="fathername"
                placeholder="Enter Father Name"
                className=" form-control"
                value={this.state.item.fathername}
                onChange={(e) => this.handleChange(e)}
              />
            </div>
            <div className="mb-2">
              <input
                type="text"
                name="surname"
                placeholder="Enter your Surname"
                className=" form-control"
                value={this.state.item.surname}
                onChange={(e) => this.handleChange(e)}
              />
            </div>
          </form>

          <button
            type="button"
            className="btn btn-warning"
            onClick={this.submitForm}
          >
            Warning
          </button>
          <button
                  className="btn btn-success btn-sm mr-2 float-right btn-lg mr-2"
                  onClick={() => this.showData()}
                >
                  Edit
                </button>
        </div>
        <table className="table table-striped table-hover">
          <thead>
            <tr>
              <th>firstname</th>
              <th>fathername</th>
              <th>surname</th>
            </tr>
          </thead>
          <tbody>
            {this.state.arry.map((item, index) => (
              <tr key={index}>
                {/* <th scope="row">{index + 1}</th> */}
                <td>{item.firstname}</td>
                <td>{item.fathername}</td>
                <td>{item.surname}</td>

                <button
                  className="btn btn-success btn-sm mr-2 float-right btn-lg mr-2"
                  onClick={() => this.handleEdit(index)}
                >
                  Edit
                </button>
                <button
                  className="btn btn-success btn-sm mr-2 float-right btn-lg"
                  onClick={() => this.handleDelet(index)}
                >
                  Delet
                </button>
              </tr>
            ))}
          </tbody>
        </table>
      </>
    );
  }
}

export default AddForm;
