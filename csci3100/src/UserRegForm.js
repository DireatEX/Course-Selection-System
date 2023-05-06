import React, { useState } from 'react';
//import { Navigate } from 'react-router-dom';
import "./UserRegForm.css";
import Axios from "axios";

export default function UserRegForm() {
    
    const [studentID, setStudentID] = useState('');
    const [password, setPassword] = useState('');
    const [repeatPassword, setRepeatPassword] = useState('');
    const [comparePasswords,setcomparePasswords]= useState('Please re-enter your password.');
    const [name, setName] = useState('');
    const [studyYear, setStudyYear] = useState('');
    const [major, setMajor] = useState('');
    const [age, setAge] = useState(18);

    const addUser = () => {
        Axios.post("http://localhost:8800/createUser", {
            userID: studentID,
            name: name,
            studyYear: studyYear,
            major: major,
            password: password,
            age: age,
            })
            .then(() => {
            });
    };

    const goBack = (e) => {
        e.preventDefault();
        window.location.href = "/Login";
    }

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        switch (name) {
            case 'student-id':
              setStudentID(value);
              break;
            case 'password':
              setPassword(value);
              break;
            case 'repeat-password':
              setRepeatPassword(value);
              break;
            case 'name':
              setName(value);
              break;
            case 'study-year':
              setStudyYear(value);
              break;
            case 'major':
              setMajor(value);
              break;
            case 'age':
              setAge(value);
              break;
            default:
              break;
        }
    };

    const handlePasswordChange = (e) => {
        const value = e.target.value;
        setPassword(value);

        const passwordInput = value;
        const repeatPasswordInput = repeatPassword;

        if (passwordInput === repeatPasswordInput) {
            setcomparePasswords('');
        }
        else {
            setcomparePasswords('The 2 password inputs don\'t match!');
        }
    };

    const handleRepeatPasswordChange = (e) => {
        const value = e.target.value;
        setRepeatPassword(value);

        const passwordInput = password;
        const repeatPasswordInput = value;

        if (passwordInput === repeatPasswordInput) {
            setcomparePasswords('');
        }
        else {
            setcomparePasswords('The 2 password inputs don\'t match!');
        }

    };

    const handleSubmit = (e) => {
        e.preventDefault();
        addUser();
        alert("You have successfully registered!\nYou can now use your student ID as user ID to login.");
        window.location.href = "/Login";
    };
      
    const handlePasswordToggle = (e) => {
          const passwordInput = document.getElementById('password');
          const repeatPasswordInput = document.getElementById('repeat-password');
      
          if (passwordInput.type === 'password') {
            passwordInput.type = 'text';
            repeatPasswordInput.type = 'text';
          } else {
            passwordInput.type = 'password';
            repeatPasswordInput.type = 'password';
          }
    };

    return (
        <div className="back">
            <meta charset="UTF-8" />
            <div className="box">
                <button className="Loginbtn" onClick={goBack}>
                    <us className="Key"></us>Login Page
                </button>
                <div className="CUHK"> </div>
            </div>
            <div className="bar"></div>


            <form className="Sign" method="post" onSubmit={handleSubmit}>
                <table className='Signtab'>
                    <tr>
                    <th className='Signtabh'>Student Registration</th>
                    </tr>
                    <tr>
                        <re> *Required Information</re>
                        <p>
                            <pre>
                            <label htmlFor='name'><re>*</re>Full Name:</label>                    <label htmlFor="student-id"><re>*</re>Student ID:</label>
                            <br/>
                            <input type="text" placeholder="e.g. Chan Tai Man" id="name" name="name" required value={name} onChange={handleInputChange}/><input type="number" placeholder="e.g. 115515xxxx" id="student-id" name="student-id" required pattern="[0-9]{10}" value={studentID} onChange={handleInputChange}/>
                            <br/>
                            <label htmlFor="password"><re>*</re>Set Password:</label>                  <label htmlFor="repeat-password"><re>*</re>Repeat Password:</label>
                            <br/>
                            <input type="password" placeholder="Password" id="password" name="password" required value={password} onChange={handlePasswordChange}/><span className="eye-icon" onClick={handlePasswordToggle}>&#128065;</span>
                            <input type="password" placeholder="Repeat Password" id="repeat-password" name="repeat-password" required style={{ marginLeft: "115px" }} value={repeatPassword} onChange={handleRepeatPasswordChange}/><span className="eye-icon" onClick={handlePasswordToggle}>&#128065;</span>
                            <br/>
                            <label style={{ color: "#da3232" }}><re></re>{comparePasswords}</label>
                            <br/>
                            <label htmlFor="major"><re>*</re>Study Major:</label>                   <label htmlFor="study-year"><re>*</re>Study Year:</label>
                            <br/>
                            <div className="ThisIsSelect">
                            <select className='Mainselect' id="major" placeholder="Major" name="major" required value={major} onChange={handleInputChange}>
                                <option value="">Choose</option>
                                <option value="Accountancy">Accountancy</option>
                                <option value="Anthropology">Anthropology</option>
                                <option value="Architecture">Architecture</option>
                                <option value="Biochemistry">Biochemistry</option>
                                <option value="Biology">Biology</option>
                                <option value="Business Administration">Business Administration</option>
                                <option value="Chemistry">Chemistry</option>
                                <option value="Chinese Language and Literature">Chinese Language and Literature</option>
                                <option value="Computer Engineering">Computer Engineering</option>
                                <option value="Computer Science">Computer Science</option>
                                <option value="Cultural Studies">Cultural Studies</option>
                                <option value="Decision Sciences and Managerial Economics">Decision Sciences and Managerial Economics</option>
                                <option value="Early Childhood Education">Early Childhood Education</option>
                                <option value="Earth System Science">Earth System Science</option>
                                <option value="Education Studies">Education Studies</option>
                                <option value="Electronic Engineering">Electronic Engineering</option>
                                <option value="Energy and Environmental Engineering">Energy and Environmental Engineering</option>
                                <option value="English Language and Literature">English Language and Literature</option>
                                <option value="English Language Education">English Language Education</option>
                                <option value="Environmental Science">Environmental Science</option>
                                <option value="Finance">Finance</option>
                                <option value="Fine Arts">Fine Arts</option>
                                <option value="Geography and Resource Management">Geography and Resource Management</option>
                                <option value="Global Business Studies">Global Business Studies</option>
                                <option value="History">History</option>
                                <option value="Hotel and Tourism Management">Hotel and Tourism Management</option>
                                <option value="Information Engineering">Information Engineering</option>
                                <option value="Japanese Studies">Japanese Studies</option>
                                <option value="Journalism and Communication">Journalism and Communication</option>
                                <option value="Law">Law</option>
                                <option value="Linguistics and Modern Languages">Linguistics and Modern Languages</option>
                                <option value="Management">Management</option>
                                <option value="Marketing">Marketing</option>
                                <option value="Mathematics">Mathematics</option>
                                <option value="Mathematics Education">Mathematics Education</option>
                                <option value="Mechanical and Automation Engineering">Mechanical and Automation Engineering</option>
                                <option value="Medicine">Medicine</option>
                                <option value="Music">Music</option>
                                <option value="Music Education">Music Education</option>
                                <option value="Philosophy">Philosophy</option>
                                <option value="Physics">Physics</option>
                                <option value="Public Health">Public Health</option>
                                <option value="Religious Studies">Religious Studies</option>
                                <option value="Science Education">Science Education</option>
                                <option value="Social Sciences Education">Social Sciences Education</option>
                                <option value="Special Education">Special Education</option>
                                <option value="Statistics">Statistics</option>
                                <option value="Systems Engineering and Engineering Management">Systems Engineering and Engineering Management</option>
                                <option value="Translation">Translation</option>
                            </select>
                            </div>
                            <div className="ThisIsSelect">
                            <select className='Mainselect' id="study-year" placeholder="Year" name="study-year" required value={studyYear} onChange={handleInputChange}>
                                <option value="">Choose</option>
                                <option value="1">1</option>
                                <option value="2">2</option>
                                <option value="3">3</option>
                                <option value="4">4</option>
                                <option value="5">5</option>
                                <option value="6">6</option>
                            </select>
                            </div>
                            <br/>
                            &nbsp;&nbsp;<label htmlFor="age">Age:</label> 
                            <br/>
                            <input type="number" placeholder="Age" id="age" name="age" value={age} onChange={handleInputChange} pattern="[0-9]+" min="1" max="100"/>
                            </pre>
                            <button className='buttonSignUp sign' type="submit">Sign up</button>
                        </p>
                    </tr>
                </table>
            </form>
        </div>
    );
}