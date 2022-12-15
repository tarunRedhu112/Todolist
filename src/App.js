import React, { useEffect, useState } from "react";
// add css
import "./App.css";

function App() {
  //api url
  const api_url = "https://jsonplaceholder.typicode.com/todos";
  //state to store api resonse data
  const [data, setData] = useState([]);
  // state to get new task input
  const [description, setDescription] = useState("");
  // state to get update task input
  const [update, setUpdate] = useState({
    description: "",
    number: -1,
    id: -1,
  });
  // hooks : calling handlefetchData function to get data from the api
  useEffect(() => {
    handleFetchData();
  }, []);

  // store update input values to the update state
  const handleChange = (e) => {
    e.preventDefault();
    const value = e.target.value;
    setUpdate({
      ...update,
      [e.target.name]: value,
    });
  };

  // function : fetching data from the api_url
  const handleFetchData = async () => {
    //sending get resquest to the api
    let res = await fetch(api_url);
    // converting response to json
    let resData = await res.json();
    if (resData) {
      //setting up the json data to the data state
      setData([...resData]);
    } else {
      alert("Server error");
    }
  };

  // function : delete data from the api_url(dummy)
  const handleDelete = async (id, index) => {
    // sending delete request to the api
    await fetch(api_url + `/${id}`, {
      method: "DELETE",
    });
    //removing item from the state using item index
    data.splice(index, 1);
    //setting up updated data to the data state

    setData([...data]);
  };

  // function : adding new task to the api_url(dummy)
  const handleCreate = async (e) => {
    // preventing form submit
    e.preventDefault();
    // preventing empty submit calls to the api
    if (description.length <= 0) {
      alert("New Task Field is Emplty");
    } else {
      //sending post request to the api
      let res = await fetch(api_url, {
        method: "POST",
        body: JSON.stringify({
          title: description,
          complete: false,
        }),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      });
      // converting response to json
      let dataJson = await res.json();
      if (dataJson) {
        // add json data to the state
        data.unshift(dataJson);
        //setting up the json data to the data state
        setData([...data]);
      } else {
        alert("Server Error!");
      }
    }
  };

  // function : updating api data (dummy)
  const handleUpdate = async (e) => {
    // preventing form submit
    e.preventDefault();
    // deconstructing the update state
    const { description, id, number } = update;
    // preventing empty submit calls to the api
    if (description.length > 0 || id !== -1 || number !== -1) {
      // sending put request to the api
      let res = await fetch(api_url + `/${id}`, {
        method: "PUT",
        body: JSON.stringify({
          id,
          title: description,
        }),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      });
      // converting response to json
      let dataJson = await res.json();
      if (dataJson) {
        data[number - 1] = dataJson;
        // add json data to the state
        setData([...data]);
      } else {
        alert("Server Error!");
      }
    } else {
      if (description.length <= 0) {
        alert("Update Field Empty!");
      } else if (number === -1) {
        alert("Task No Field Empty");
      } else if (id === -1) {
        alert("Task ID Field Empty");
      }
    }
  };

  return (
    <div className="App position-relative">
      {/* Nav Bar */}
      <nav className="navbar navbar-dark bg-dark  fixed-top ">
        <h1 className="display-4">ToDo List</h1>
      </nav>
      <div className="main">
        <div className="form_container  position-fixed ">
          {/* New task form */}
          <form className="new_task_form ">
            <div>
              <h1 className="display-5">New Task</h1>
            </div>
            {/* new input tag */}
            <div className="form-floating mb-3">
              <input
                type="text"
                className="form-control"
                id="floatingInput"
                placeholder="What do you need to do ?"
                name="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
              />
              <label v-for="floatingInput">What do you need to do ?</label>
            </div>
            {/* new task submit button */}
            <div className="d-grid gap-2 col-6 mx-auto">
              <button
                className="btn btn-primary"
                id="add-btn"
                type="submit"
                onClick={(e) => handleCreate(e)}
              >
                Add a task
              </button>
            </div>
          </form>
          <hr />
          {/* update task form  */}
          <form className="update_task_container">
            <div>
              <h1 className="display-5">Update Task</h1>
            </div>
            {/* update task input tag */}
            <div className="form-floating mb-3">
              <input
                className="form-control"
                id="des-input"
                type="text"
                name="description"
                value={update.description}
                onChange={handleChange}
                placeholder="What's the update"
                required
              />
              <label v-for="floatingInput">What's the update</label>
            </div>
            {/* update task number input tag */}

            <div className="form-floating mb-3">
              <input
                className="form-control"
                id="des-input"
                type="number"
                name="number"
                placeholder="Enter Task No. :"
                value={update.number}
                onChange={handleChange}
                required
              />
              <label v-for="floatingInput">Enter Task No : </label>
            </div>
            {/* update task id input tag */}
            <div className="form-floating mb-3">
              <input
                className="form-control"
                id="des-input"
                type="number"
                name="id"
                placeholder="Enter Task ID :"
                value={update.id}
                onChange={handleChange}
                required
              />
              <label v-for="floatingInput">Enter Task ID : </label>
            </div>

            {/* update task submit button */}
            <div className="d-grid gap-2 col-6 mx-auto">
              <button
                className="btn btn-primary"
                id="add-btn"
                type="submit"
                onClick={(e) => handleUpdate(e)}
              >
                Update
              </button>
            </div>
          </form>
        </div>
        {/* mapping over the data  */}
        <div className="display_container ">
          {data.map((item, index) => {
            return (
              <div className="card card_item" key={index}>
                {/* list header */}
                <div className="card-header card_header_no_id">
                  <h5 className="display-6">Task No : {index + 1}</h5>
                  <p>
                    <b>ID </b> : {item.id}
                  </p>
                </div>
                {/* list body */}
                <div className="card-body">
                  <div>
                    <h4 className="card-title">Task : {item.title}</h4>
                  </div>
                  <div>
                    <p className="card-text ">
                      Completed : {item.completed === false ? "False" : "True"}
                    </p>
                  </div>
                  {/* list delete button */}
                  <div className="delete_btn_container">
                    <button
                      className="btn btn-outline-danger"
                      onClick={() => handleDelete(item.id, index)}
                    >
                      Complete / Delete
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default App;
