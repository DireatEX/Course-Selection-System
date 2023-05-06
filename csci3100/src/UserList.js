import React from 'react'
import './UserList.css'
// import styles from './UserList.module.css' // video 11
import { useState } from 'react'
import Axios from "axios";
import editlogo from './logo/Edit.png'
import deletelogo from './logo/Delete.png'
import morelogo from './logo/More.png'
import updatelogo from './logo/Update.png'
import addlogo from './logo/AddUser.png'

export default function UserList() {

  // initialize the state
  const [userID, setUserID] = useState(0);
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [studyYear, setStudyYear] = useState(0);
  const [major, setMajor] = useState("");
  const [age, setAge] = useState(0);
  const [newPassword, setNewPassword] = useState("");
  const [newName, setNewName] = useState("");
  const [newStudyYear, setNewStudyYear] = useState(0);
  const [newMajor, setNewMajor] = useState("");
  const [newAge, setNewAge] = useState(0);

  const [userList, setUserList] = useState([]);

  const [keyword, setKeyword] = useState("");

  const [courseList, setCourseList] = useState([]);

  //To pass the request of add user to the backend server
  const addUser = () => {
    Axios.post("http://localhost:8800/createuser", {
      userID: userID,  
      password: password,
      name: name,
      studyYear: studyYear,
      major: major,
      age: age,
    }).then(() => {
      setUserList([
        ...userList,
        {
          userID: userID,  
          password: password,
          name: name,
          studyYear: studyYear,
          major: major,
          age: age,
        },
      ]);
    })
  };

  //To pass the request of get user to the backend server
  const getUser = () => {
    if (keyword.trim() === '') {
      // If the search key is an empty string 
      Axios.get('http://localhost:8800/user').then((response) => {
        setUserList(response.data);
      // })
      // .catch((error) => {
      //   console.error(error);
      });
    } else {
      // If the search key is not an empty string 
      Axios.get('http://localhost:8800/userbyid', { params: { keyword: keyword } }).then((response) => {
        setUserList(response.data);
      // })
      // .catch((error) => {
      //   console.error(error);
      });
    }
  };
  
  //To pass the request of get user course to the backend server
  const getUserCourse = (userID) => {
    Axios.get('http://localhost:8800/usercourse', { params: { userID: userID } }).then((response) => {
      setCourseList(response.data);
    });
  };

  //To pass the request of edit stduent name to the backend server
  const updateUserName = (userID) => {
    Axios.put("http://localhost:8800/updatename", { name: newName, userID: userID }).then(
      (response) => {
        setUserList(
          userList.map((val) => {
            return val.userID === userID
              ? {
                  userID: val.userID,
                  password: val.password,
                  name: newName,
                  studyYear: val.studyYear,
                  major: val.major,
                  age: val.age,
                }
              : val;
          })
        );
      }
    );
  };
  //To pass the request of edit stduent password to the backend server
  const updateUserPassword = (userID) => {
    Axios.put("http://localhost:8800/updatepassword", { password: newPassword, userID: userID }).then(
      (response) => {
        setUserList(
          userList.map((val) => {
            return val.userID === userID
              ? {
                  userID: val.userID,
                  password: newPassword,
                  name: val.name,
                  studyYear: val.studyYear,
                  major: val.major,
                  age: val.age,
                }
              : val;
          })
        );
      }
    );
  };
  //To pass the request of edit stduent study year to the backend server
  const updateUserStudyYear = (userID) => {
    Axios.put("http://localhost:8800/updateyear", { studyYear: newStudyYear, userID: userID }).then(
      (response) => {
        setUserList(
          userList.map((val) => {
            return val.userID === userID
              ? {
                  userID: val.userID,
                  password: val.password,
                  name: val.name,
                  studyYear: newStudyYear,
                  major: val.major,
                  age: val.age,
                }
              : val;
          })
        );
      }
    );
  };
  //To pass the request of edit stduent major to the backend server
  const updateUserMajor = (userID) => {
    Axios.put("http://localhost:8800/updatemajor", { major: newMajor, userID: userID }).then(
      (response) => {
        setUserList(
          userList.map((val) => {
            return val.userID === userID
              ? {
                  userID: val.userID,
                  password: val.password,
                  name: val.name,
                  studyYear: val.studyYear,
                  major: newMajor,
                  age: val.age,
                }
              : val;
          })
        );
      }
    );
  };
  //To pass the request of edit stduent age to the backend server
  const updateUserAge = (userID) => {
    Axios.put("http://localhost:8800/updateage", { age: newAge, userID: userID }).then(
      (response) => {
        setUserList(
          userList.map((val) => {
            return val.userID === userID
              ? {
                  userID: val.userID,
                  password: val.password,
                  name: val.name,
                  studyYear: val.studyYear,
                  major: val.major,
                  age: newAge,
                }
              : val;
          })
        );
      }
    );
  };

  //To pass the request of delete user to the backend server
  const deleteUser = (userID) => {
    Axios.put("http://localhost:8800/incap", { userID: userID });
    Axios.delete(`http://localhost:8800/deleteuser/${userID}`).then((response) => {
      setUserList(
        userList.filter((val) => {
          return val.userID !== userID;
        })
      );
    });
  };

  // const [showInput, setShowInput] = useState(false);
  // const handleClick = () => {setShowInput(!showInput);};
  
  //Handle the button click behavior
  const handleClick = (userID) => {
    setUserList(prevUserList => prevUserList.map(user => {
      if (user.userID === userID) {
        return { ...user, showInput: !user.showInput, showList: false };
      } else {
        return { ...user, showList: false, showInput: false };
      }
    }));
  };

  const [showTable, setShowTable] = useState(false);

  //Handle the button click behavior
  const handleSubmit = (event) => {
    event.preventDefault();
    setShowTable(true);
    getUser();
  };

  // const [showList, setShowList] = useState(false);
  // const handleList = () => {setShowList(!showList);}
  
  //Handle the button click behavior
  const handleList = (userID) => {
    getUserCourse(userID);
    setUserList(prevUserList => prevUserList.map(user => {
      if (user.userID === userID) {
        return { ...user, showList: !user.showList, showInput: false };
      } else {
        return { ...user, showList: false, showInput: false };
      }
    }));
  };

  const handleDelete = (userID)=>{
    let text = "Are you sure to delete this user?";
    if (window.confirm(text) === true) {
      deleteUser(userID)
    } else {
      alert("You canceled");
    }
    return;
  }

  // the layout
  return (
    <div className='background'>
      <nav className="boxa">
        <a href="/courseList"><button className="buttona CBroPagea">
          <p className="Browsea"></p>Course Browsing Page</button></a>
        <div className="CUHKa"> </div>
      </nav>
      
      <div className="bara"></div>
      
      {/* user search box */}
      <div className="SearchBoxa">
        <label>Search User : </label>
        <br />
        <form method="get" className="senga" onSubmit={handleSubmit}>
          <input className='sero' type="text" placeholder='input nothing to show all user...' onChange={(event) => {setKeyword(event.target.value);}}/>
          <button type='Submit' value="Search"></button>
        </form>
      </div>

      {/* add user */}
      <div className="Proa">
          <p><b>ADD USER</b></p>
          <p className="pima"></p>
          <div className="infoa">
            <form>
              <table className='infotaba'><tbody>
                <tr>
                    <th>UserID:</th>
                    <td><input className='ou' type="number" onChange={(event) => {setUserID(event.target.value);}}/></td>
                </tr>
                <tr>
                    <th>Password:</th>
                    <td><input className='ou' type="text" onChange={(event) => {setPassword(event.target.value);}}/></td>
                </tr>
                <tr>
                    <th>Name:</th>
                    <td><input className='ou' type="text" onChange={(event) => {setName(event.target.value);}}/></td>
                </tr>
                <tr>
                    <th>Study Year:</th>
                    <td><input className='ou' type="number" onChange={(event) => {setStudyYear(event.target.value);}} pattern="[0-9]+" min="1" max="7" /></td>
                </tr>
                <tr>
                    <th>Major:</th>
                    <td><input className='ou' type="text" onChange={(event) => {setMajor(event.target.value);}} /></td>
                </tr>
                <tr>
                    <th>Age:</th>
                    <td><input className='ou' type="number" onChange={(event) => {setAge(event.target.value);}} pattern="[0-9]+" min="1" max="200" /></td>
                </tr>
                </tbody></table>
              <button onClick={(event) => {event.preventDefault(); addUser();}} className='bottona addusera'><img src={addlogo} alt="Add" title='Add'/> Add User</button>
            </form>
          </div>
      </div>

      {/* search result table */}
      {showTable && (<div className="Resulta">
        <p>Search Result:</p>
        <div className="Usera">
          <table>
            <thead>
              <tr>
                <th>User ID</th>
                <th>Password</th>
                <th>Name</th>
                <th>Study Year</th>
                <th>Major</th>
                <th>Age</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {userList.map(user=>(
                <tr key={user.userID}>
                  <td>{user.userID}</td>
                  <td className='Action'>
                    {user.password}
                    {user.showInput && ( <span><br /><input type="text" placeholder={user.password} onChange={(event)=>{setNewPassword(event.target.value);}}/>
                                    <button onClick={() => {updateUserPassword(user.userID);}}><img src={updatelogo} alt="Update" title='Update'/></button></span>)}
                  </td>
                  <td className='Action'>
                    {user.name}
                    {user.showInput && ( <span><br /><input type="text" placeholder={user.name} onChange={(event)=>{setNewName(event.target.value);}}/>
                                    <button onClick={() => {updateUserName(user.userID);}}><img src={updatelogo} alt="Update" title='Update'/></button></span>)}
                  </td>
                  <td className='Action'>
                    {user.studyYear}
                    {user.showInput && ( <span><br /><input type="number" placeholder={user.studyYear} onChange={(event)=>{setNewStudyYear(event.target.value);}} pattern="[0-9]+" min="1" max="7"/>
                                    <button onClick={() => {updateUserStudyYear(user.userID);}}><img src={updatelogo} alt="Update" title='Update'/></button></span>)}
                  </td>
                  <td className='Action'>
                    {user.major}
                    {user.showInput && ( <span><br /><input type="text" placeholder={user.major} onChange={(event)=>{setNewMajor(event.target.value);}}/>
                                    <button onClick={() => {updateUserMajor(user.userID);}}><img src={updatelogo} alt="Update" title='Update'/></button></span>)}
                  </td>              
                  <td className='Action'>
                    {user.age}
                    {user.showInput && ( <span><br /><input type="number" placeholder={user.age} onChange={(event)=>{setNewAge(event.target.value);}} pattern="[0-9]+" min="1" max="200"/>
                                    <button onClick={() => {updateUserAge(user.userID);}}><img src={updatelogo} alt="Update" title='Update'/></button></span>)}
                  </td>
                  <td className='Action'>
                    <button onClick={() => {handleClick(user.userID);}}><img src={editlogo} alt="Edit" title='Edit' /></button>
                    <button onClick={() => {handleDelete(user.userID);}}><img src={deletelogo} alt='Delete' title='Delete'/></button>
                    <span className="Popup"><button className="Popup" onClick={(event) => {event.preventDefault(); handleList(user.userID);}}><img src={morelogo} alt='More details' title='More details' /></button>
                    {/* {user.showList && (
                      <div className='Popuptext Show'>
                        <ul>
                          {courseList.filter(courseID => courseID.userID === user.userID).map(x => (
                            <li key={x.courseID}>{x.courseID}</li>
                          ))}
                        </ul>
                      </div>
                    )} */}
                    {user.showList && (
                      <div className='Popuptext Show'>
                        {courseList.filter(courseID => courseID.userID === user.userID).length > 0 ? (
                          <ul>
                            {courseList.filter(courseID => courseID.userID === user.userID).map(x => (
                              <li key={x.courseID}>{x.courseID}</li>
                            ))}
                          </ul>
                        ) : (
                          <p style={{textAlign:"center"}}>No course</p>
                        )}
                      </div>
                    )}
                    </span> 

                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>)}

      <a href="/login"><button className="buttona Logouta"><span className="louta"></span>Logout</button></a>

    </div>
  )
}
