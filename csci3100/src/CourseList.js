import './CourseList.css';
import React from 'react';
import Axios from "axios";
import { useState } from 'react'
export default function App() {
const [courses,setCourses] = useState([])
const [keyword, setKeyword] = useState("");

const [courseID,setCourseID] = useState('');
const [name,setName] = useState("");
const [time,setTime] = useState("");
const [location,setLocation] = useState("");
const [department,setDepartment] = useState("");
const [instructor,setInstructor] = useState("");
const [capacity,setCapacity] = useState(1);

const [newTime,setNewTime] = useState("");
const [newLocation,setNewLocation] = useState("");
const [newDepartment,setNewDepartment] = useState("");
const [newInstructor,setNewInstructor] = useState("");
const [newCapacity,setNewCapacity] = useState(1);
const [courseOutline,setCourseOutline] = useState("");
// const [newOutline,setNewOutline] = useState("");
const addCourse = () => {
    Axios.post("http://localhost:8800/course/insert", {
        courseID: courseID,
        name: name,
        time: time,
        location: location,
        department: department,
        instructor: instructor,
        capacity: capacity,
    }).then(() => {
        setCourses([
            ...courses,
            {
                courseID: courseID,
                name: name,
                time: time,
                location: location,
                department: department,
                instructor: instructor,
                capacity: capacity,
            },
        ])
    });
    alert("The course has been added");
};
const getCourses = () => {
    if (keyword.trim() === '') {
        Axios.get("http://localhost:8800/course").then((response) => {
            setCourses(response.data);
            // })
            // .catch((error) => {
            //   console.error(error);
        });
    } else {
        Axios.get("http://localhost:8800/courseByID", { params: { keyword: keyword } }).then((response) => {
            setCourses(response.data);
            // })
            // .catch((error) => {
            //   console.error(error);
        });
    }
};
const deleteCourse = (courseID) => {
    Axios.delete(`http://localhost:8800/deleteCourse/${courseID}`).then((response) => {
        setCourses(
            courses.filter((val) => {
                return val.courseID !== courseID;
            })
        );
    });
};


const updateTime = (courseID) => {
    Axios.put("http://localhost:8800/updateTime", { time: newTime, courseID: courseID }).then(
        (response) => {
            setCourses(
                courses.map((val) => {
                    return val.courseID === courseID
                        ? {
                            courseID: val.courseID,
                            name: val.name,
                            time: newTime,
                            location: val.location,
                            department: val.department,
                            instructor: val.instructor,
                            capacity: val.capacity,
                        }
                        : val;
                })
            );
        }
    );
};
const updateLocation = (courseID) => {
    Axios.put("http://localhost:8800/updateLocation", { location: newLocation, courseID: courseID }).then(
        (response) => {
            setCourses(
                courses.map((val) => {
                    return val.courseID === courseID
                        ? {
                            courseID: val.courseID,
                            name: val.name,
                            time: val.time,
                            location: newLocation,
                            department: val.department,
                            instructor: val.instructor,
                            capacity: val.capacity,
                        }
                        : val;
                })
            );
        }
    );
};
const updateDepartment = (courseID) => {
    Axios.put("http://localhost:8800/updateDepartment", { department: newDepartment, courseID: courseID }).then(
        (response) => {
            setCourses(
                courses.map((val) => {
                    return val.courseID === courseID
                        ? {
                            courseID: val.courseID,
                            name: val.name,
                            time: val.time,
                            location: val.location,
                            department: newDepartment,
                            instructor: val.instructor,
                            capacity: val.capacity,
                        }
                        : val;
                })
            );
        }
    );
};
const updateInstructor = (courseID) => {
    Axios.put("http://localhost:8800/updateInstructor", { instructor: newInstructor, courseID: courseID }).then(
        (response) => {
            setCourses(
                courses.map((val) => {
                    return val.courseID === courseID
                        ? {
                            courseID: val.courseID,
                            name: val.name,
                            time: val.time,
                            location: val.location,
                            department: val.department,
                            instructor: newInstructor,
                            capacity: val.capacity,
                        }
                        : val;
                })
            );
        }
    );
};
const updateCapacity = (courseID) => {
    Axios.put("http://localhost:8800/updateCapacity", { capacity: newCapacity, courseID: courseID }).then(
        (response) => {
            setCourses(
                courses.map((val) => {
                    return val.courseID === courseID
                        ? {
                            courseID: val.courseID,
                            name: val.name,
                            time: val.time,
                            location: val.location,
                            department: val.department,
                            instructor: val.instructor,
                            capacity: newCapacity,
                        }
                        : val;
                })
            );
        }
    );
};
const uploadCourseOutline = (courseID) => {
        Axios.put("http://localhost:8800/uploadOutline", { courseOutline: courseOutline, courseID: courseID }).then(
            (response) => {
                setCourses(
                    courses.map((val) => {
                        return val.courseID === courseID
                            ? {
                                courseID: val.courseID,
                                name: val.name,
                                time: val.time,
                                location: val.location,
                                department: val.department,
                                instructor: val.instructor,
                                capacity: val.capacity,
                                courseOutline: courseOutline,
                            }
                            : val;
                    })
                );
            }
        );
    };


const handleSubmit = (event) => {
    event.preventDefault();
    getCourses();
};

const handleDelete = (courseID)=>{
    let text = "Are you sure to delete this course?";
    if (window.confirm(text) === true) {
        deleteCourse(courseID);
    } else {
        alert("You canceled");
    }
    return;
}
const handleEdit = (courseID) => {
    setCourses(prevCourses => prevCourses.map(course => {
        if (course.courseID === courseID) {
            return { ...course, showInput: !course.showInput, showList: false };
        } else {
            return { ...course, showList: false, showInput: false };
        }
    }));
};

const handleUpload = (courseID) =>{
    setCourses(prevCourses => prevCourses.map(course => {
        if (course.courseID === courseID) {
            return { ...course, showUpload: !course.showUpload, showList: false };
        } else {
            return { ...course, showUpload: false, showList: false };
        }
    }));

}
    return (
        <div className="back">
            <div className="box">
                <a href="./UserList">
                <button className="button ProPage">
                    <us className="User"></us>Profile Page</button></a>
                <div className="CUHK"> </div>
            </div>
            <div className="bar"></div>

            <table className='whole'>
                <tr>
                    <div className="Seleb">
                        <table className='Coutab'>
                            <tr>
                                <th className='Coutabhb'>
                                    Search Course :
                                    <br />
                                    <form method="get" className="seng" onSubmit={handleSubmit}>
                                        <input className='sco' type="text" placeholder='Course ID / Course Name / Time / Department..'  name="search" onChange={(event) => {setKeyword(event.target.value);}}/>
                                        <button type='Submit' id="searchBtn" value="Submit" form="SearchBox" onClick={getCourses}></button>
                                    </form>
                                    {/*<se className="seng">*/}
                                    {/*    <input type="text" placeholder="Course ID / Course Name / Time / Department.." name="search" />*/}
                                    {/*    <button type="submit" form="SearchBox" value="Submit"></button>*/}
                                    {/*</se>*/}
                                </th>
                            </tr>
                            {courses.map((course) => {
                            return(
                            <tr>
                                <th key={course.courseID}>
                                    <div className="SSCourse">
                                        <details>
                                            <summary>{course.courseID} {course.name}
                                                
                                                <button type="delete" className=" ADcourse" onClick={()=>handleDelete(course.courseID)}>Delete</button>
                                                <button type="edit" className="ADcourse" onClick={()=>handleEdit(course.courseID)}>Edit</button>
                                                <button type="upload" className="ADcourse" onClick={()=>handleUpload(course.courseID)}>Upload</button>
                                            </summary>
                                            <br />
                                            <br/>
                                            <table className='Coursetab'>
                                                <tr>
                                                    <th>Time</th>
                                                    <th>Place</th>
                                                    <th>Department</th>
                                                    <th>Instructor</th>
                                                    <th>Capacity</th>
                                                </tr>
                                                <tr>
                                                    <td className="newtd">{course.time}</td>
                                                    <td>{course.location}</td>
                                                    <td>{course.department}</td>
                                                    <td>{course.instructor}</td>
                                                    <td>{course.capacity}</td>
                                                </tr>
                                                {course.showInput && <tr className='editrow'>
                                                    <td>
                                                        {course.showInput && ( <div>&#160;<input className='btm' type="text" placeholder={course.time} onChange={(event)=>{setNewTime(event.target.value);}}/><br/><button className="updatebtn" onClick={() => {updateTime(course.courseID);}}>Update</button> </div>)}
                                                    </td>
                                                    <td>
                                                        {course.showInput && ( <div>&#160;<input className='btm' type="text" placeholder={course.location} onChange={(event)=>{setNewLocation(event.target.value);}}/><button onClick={() => {updateLocation(course.courseID);}}>Update</button></div>)}
                                                    </td>
                                                    <td>
                                                        {course.showInput && ( <div>&#160;<input className='btm' type="text" placeholder={course.department} onChange={(event)=>{setNewDepartment(event.target.value);}}/><button onClick={() => {updateDepartment(course.courseID);}}>Update</button></div>)}
                                                    </td>
                                                    <td>
                                                        {course.showInput && ( <div>&#160;<input className='btm' type="text" placeholder={course.instructor} onChange={(event)=>{setNewInstructor(event.target.value);}}/><button onClick={() => {updateInstructor(course.courseID);}}>Update</button></div>)}
                                                    </td>
                                                    <td>
                                                        {course.showInput && ( <div>&#160;<input className='btm' type="number" placeholder={course.capacity} onChange={(event)=>{setNewCapacity(event.target.value);}}/><button onClick={() => {updateCapacity(course.courseID);}}>Update</button></div>)}
                                                    </td>
                                                </tr>}
                                                {course.showUpload && <tr id="uploadCourseOutline" className="uploadCourseOutline">
                                                    <td>
                                                        <input className='bts' type="text" placeholder={course.courseOutline} onChange={(event)=>{setCourseOutline(event.target.value);}}/>
                                                    </td>
                                                    <td>
                                                        <button onClick={() => {uploadCourseOutline(course.courseID);}}>Upload</button>
                                                    </td>
                                                    <td>
      
                                                    </td>
                                                </tr>}
                                            </table>
                                        </details>
                                    </div>
                                </th>

                            </tr>
                                )})}
                        </table>

                    </div>

                    <td className="addCourse">
                        {/*<th>*/}
                            <div className="ProPP"> <form>
                                <p>ADD COURSE</p>
                                <p className="pim"></p>
                                <div className="info">
                                    <table className='infotabb'>
                                        <tr>
                                            <th>Course ID:</th>
                                            <td>
                                                <input className='fck' type="text" id="courseID" name="courseID" required value={courseID} onChange={(event) => {setCourseID(event.target.value)}} />
                                            </td>
                                        </tr>
                                        <tr>
                                            <th>Course Name:</th>
                                            <td>
                                                <input className='fck' type="text" id="name" name="name" required value={name} onChange={(event) => {setName(event.target.value)}} />
                                            </td>
                                        </tr>
                                        <tr>
                                            <th>Time:</th>
                                            <td>
                                                <input className='fck' type="text" id="time" name="time" required value={time} onChange={(event) => {setTime(event.target.value)}} />
                                            </td>
                                        </tr>
                                        <tr>
                                            <th>Place:</th>
                                            <td>
                                                <input className='fck' type="text" id="location" name="location" required value={location} onChange={(event) => {setLocation(event.target.value)}} />
                                            </td>
                                        </tr>
                                        <tr>
                                            <th>Department:</th>
                                            <td>
                                                <input className='fck' type="text" id="department" name="department" required value={department} onChange={(event) => {setDepartment(event.target.value)}} />
                                            </td>
                                        </tr>
                                        <tr>
                                            <th>Instructor:</th>
                                            <td>
                                                <input className='fck' type="text" id="instructor" name="instructor" required value={instructor} onChange={(event) => {setInstructor(event.target.value)}} />
                                            </td>
                                        </tr>
                                        <tr>
                                            <th>Capacity:</th>
                                            <td>
                                                <input className='fck' type="number" id="capacity" name="capacity" required value={capacity} min="1" onChange={(event) => {setCapacity(event.target.value)}} />
                                            </td>
                                        </tr>
                                    </table>
                                </div>
                                <button type="submit" className="AAcourse" onClick={addCourse}>ADD</button>
                            </form></div>
                        {/*</th>*/}
                    </td></tr>
            </table>


            <a href="/login"><button className="button Logout"><span className="lout"></span>Logout</button></a>



        </div >
    );
}

