import "./UserCourse.css";
import { useEffect, useState } from "react";
import React from "react";
import Axios from "axios";
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

export default function UserCourse() {
  const navigate = useNavigate();
  let params = useParams();
  const [courseList, setCourseList] = useState([]);
  const [mes, setMessage] = useState("");
  const [head, setHeader] = useState("");
  const [open, setOpen] = React.useState(false);

  const [filterTime, setFilterTime] = useState("All");
  const [filterDep, setFilterDep] = useState("All");
  
  //select course function
  const addCourse = (courseID, capacity) => {
    if (capacity > 0) {
      Axios.post(`http://localhost:8800/UserCourse/${params.id}/reg/`, { courseID: courseID }).then((response) => {
        if (response.data.message) {
          //send error message in pop-up window
          setMessage(response.data.message);
        } else {
          //decrease capacity by 1
          Axios.put("http://localhost:8800/updatecap/", {
            capacity: capacity - 1,
            courseID: courseID,
          }).then((response) => {
            //make the selected course disappear after selecting
            setCourseList(
              courseList.filter((val) => {
                return val.courseID !== courseID;
              })
            );
          });
          //send success message in pop-up window
          setMessage("This course was selected successfully");
        }
      });
    } else {
      //send error message in pop-up window
      setMessage("This course cannot be selected");
    }
    setHeader("Confirmation");
    setOpen(true);
  };

  const [keyword, setKeyword] = useState("");

  //search course function
  const getCourse = () => {
    if (filterTime === "All" && filterDep === "All") {
      //no weekday or department is selected
      Axios.get("http://localhost:8800/getcour", {
        params: { keyword: keyword },
      }).then((response) => {
        setCourseList(response.data);
      });
    } else if (filterTime !== "All" && filterDep === "All") {
      //only department is selected
      Axios.get("http://localhost:8800/getcoursebytime", {
        params: { keyword: keyword, filterTime: filterTime },
      }).then((response) => {
        setCourseList(response.data);
      });
    } else if (filterTime === "All" && filterDep !== "All") {
      //only weekday is selected
      Axios.get("http://localhost:8800/getcoursebydep", {
        params: { keyword: keyword, filterDep: filterDep },
      }).then((response) => {
        setCourseList(response.data);
      });
    } else if((filterTime !== "All" && filterDep !== "All")){
      //both weekday and department are selected
      Axios.get("http://localhost:8800/getcoursebytd", {
        params: {
          keyword: keyword,
          filterTime: filterTime,
          filterDep: filterDep,
        },
      }).then((response) => {
        setCourseList(response.data);
      });
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    getCourse();
  };



  return (
    <div className="back">
      <div className="box">
    //button for going to profile page
        <button className="button ProPage" onClick={() => navigate(`/Profile/${params.id}`)}>

          <us className="User"></us>Profile Page

        </button>
        <div className="CUHK"> </div>
      </div>
      <div className="bar"></div>
  //filter for weekday
      <div className="condt">
        <select
          onChange={(e) => {
            setFilterTime(e.target.value);
          }}
          className="custom-select"
          aria-label="Filter Time"
        >
          <option value="All">Select Weekday</option>
          <option value="Monday">Monday</option>
          <option value="Tuesday">Tuesday</option>
          <option value="Wednesday">Wednesday</option>
          <option value="Thursday">Thursday</option>
          <option value="Friday">Friday</option>
          <option value="Saturday">Saturday</option>
          <option value="Sunday">Sunday</option>
        </select>
        <span className="focus"></span>
      </div>
  //filter for department
      <div className="condd">
        <select
          onChange={(e) => {
            setFilterDep(e.target.value);
          }}
          className="custom-select"
          aria-label="Filter Department"
        >
          <option value="All">Search Department</option>
          <option value="CSE">CSE</option>
          <option value="ELEG">ELEG</option>
          <option value="AIST">AIST</option>
        </select>
        <span className="focus"></span>
      </div>
  //search box
      <p className="SearchBox">
        <form method="get" onSubmit={handleSubmit}>
          Search Course :
          <br />
          <se className="seng">
            <input
              type="text"
              placeholder="Course ID / Course Name"
              name="search"
              className="sefoh"
              onChange={(event) => {
                setKeyword(event.target.value);
              }}
            />
            <button
              type="submit"
              form="SearchBox"
              value="Submit"
              onClick={handleSubmit}
            ></button>
          </se>
        </form>
      </p>
  //search result of course information
      <p>
        <div className="Result">
          Search Result:
          {courseList.map((val, key) => {
            return (
              <div className="Course">
                <details>
                  <summary>
              //courseID and course name
                    {val.courseID} {val.name}
              //button for adding course
                    <button
                      type="add"
                      className="button Acourse"
                      onClick={() => addCourse(val.courseID, val.capacity)}
                    >
                      +ADD
                    </button>
                    {!(val.courseOutline === "")&&(<a href={val.courseOutline} target="_blank"><button
                      type="open"
                      className="button courseOut"
                    >
                      Course Outline
                    </button></a>)}
                  </summary>
                  <br />
                  <br />
                    //other course information list as table
                  <table className="scourse">
                    <tr>
                      <th>Time</th>
                      <th>Location</th>
                      <th>Department</th>
                      <th>Instructor</th>
                      <th>Capacity</th>
                    </tr>
                    <tr>
                      <td>{val.time}</td>
                      <td>{val.location}</td>
                      <td>{val.department}</td>
                      <td>{val.instructor}</td>
                      <td>{val.capacity}</td>
                    </tr>
                  </table>
                </details>
              </div>
            );
          })}
          //pop-up window for success and error message
          <Popup open={open} modal nested>
            {(close) => (
              <div className="modal">
                {" "}
                <button className="close" onClick={close}>
                  {" "}
                  &times;{" "}
                </button>{" "}
                <div className="header"> {head} </div>{" "}
                <div className="content">{mes}</div>{" "}
                <div className="actions">
                  {" "}
                  <button
                    className="button confm"
                    onClick={() => {
                      console.log("modal closed");
                      setOpen(false);
                    }}
                  >
                    {" "}
                    Enter{" "}
                  </button>{" "}
                </div>{" "}
              </div>
            )}
          </Popup>
        </div>
      </p>
//button for logout
      <a href="/login"><button className="button Logout"><span className="lout"></span>Logout</button></a>

    </div>
  );
}
