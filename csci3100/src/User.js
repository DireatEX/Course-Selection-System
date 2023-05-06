import React from 'react'
import "./User.css";
import { useEffect, useState } from "react";
import Axios from "axios";
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

export default function User() {
  const navigate = useNavigate();
  let params = useParams();
  const [userList, setUserList] = useState([]);
  const [courseList, setCourseList] = useState([]);
  /* const id = match.params.id; */
  const [message, setMessage] = React.useState("");
  const [open, setOpen] = React.useState(false);

  const dropCourse = (cid, capacity) => {
    Axios.put("http://localhost:8800/updatecap/", {
      capacity: capacity + 1,
      courseID: cid,
    });
    Axios.delete(`http://localhost:8800/dropcourse/${cid}`).then((response) => {
      setCourseList(
        courseList.filter((val) => {
          return val.courseID !== cid;
        })
      );
    });
    setOpen(true);
    setMessage("This course is dropped successfully");
  };

  useEffect(() => {
    fetch(`http://localhost:8800/Profile/${params.id}`)
      .then((res) => res.json())
      .then((result) => {
        setUserList(result);
      });
  }, []);

  useEffect(() => {
    fetch(`http://localhost:8800/Profile/${params.id}/getcourse/`)
      .then((res) => res.json())
      .then((result) => setCourseList(result));
  }, []);

  return (
    <div className="back">
      <meta charset="UTF-8" />
      <div className="box">
        <button className="CBroPage" onClick={() => navigate(`/UserCourse/${params.id}`)} ><us className="Browse"></us>Course Browsing Page</button>
        <div className="CUHK"> </div>
      </div>
      <div className="bar"></div>

      <table className="whole">
        <tr>
          {userList.map((val, key) => {
            return (
              <th>
                <div className="Pro">
                  Student Profile
                  <p className="pim"></p>
                  <div className="info">
                    <table className="infotab">
                      <tr>
                        <th>Name:</th>
                        <td>{val.name}</td>
                      </tr>
                      <tr>
                        <th>StudentID:</th>
                        <td>{val.userID}</td>
                      </tr>
                      <tr>
                        <th>Age:</th>
                        <td>{val.age}</td>
                      </tr>
                      <tr>
                        <th>Major:</th>
                        <td>{val.major}</td>
                      </tr>
                      <tr>
                        <th>Year:</th>
                        <td>{val.studyYear}</td>
                      </tr>
                    </table>
                  </div>
                </div>
              </th>
            );
          })}

          <td>
            <div className="Sele">
              <table className="Coutab">
                <tr>
                  <th className="Coutabh">Selected Course</th>
                </tr>
                {courseList.map((val, key) => {
                  return (
                    <tr>
                      <th>
                        <div className="CCourse">
                          <details>
                            <summary>
                              {val.courseID} {val.name}
                              <button
                                type="delete"
                                className="DDcourse"
                                onClick={() =>
                                  dropCourse(val.courseID, val.capacity)
                                }
                              >
                                Drop
                              </button>
                            </summary>
                            <br />
                            <br/>
                            <table className="Coursetab">
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
                      </th>
                    </tr>
                  );
                })}
                <Popup open={open} modal nested>
                  {(close) => (
                    <div className="modal">
                      {" "}
                      <button className="close" onClick={close}>
                        {" "}
                        &times;{" "}
                      </button>{" "}
                      <div className="header"> Confirmation </div>{" "}
                      <div className="content">
                        The course was dropped successfully!
                      </div>{" "}
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
                          Confirm{" "}
                        </button>{" "}
                      </div>{" "}
                    </div>
                  )}
                </Popup>
              </table>
            </div>
          </td>
        </tr>
      </table>

      <a href="/login"><button className="button Logout"><us className="lout"></us>Logout</button></a>

    </div>
  );
}
