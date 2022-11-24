import { ref, uploadBytes } from 'firebase/storage';
import React, { useState } from 'react'
import { v4 } from 'uuid';
import { storage } from './firebase';

const Form = () => {
    const [fileUpload, setFileUpload] = useState({
        file: "",
    });
    const [userData, setUserData] = useState({
        firstName: "",
        date: "",
        gender: "",
        address: "",
        email: "",
        phone: "",

    })
    
    let name, value;
    const postUserData = (event) => {
        name = event.target.name;
        value = event.target.value;

        setUserData({ ...userData, [name]: value });

    }

    const submitData = async (event) => {
        event.preventDefault();
        const { firstName, date, address, gender, email, phone } = userData;
        const { file } = fileUpload;

        // if (firstName && date && gender && address && email && phone) {
            const res = await fetch("https://userform-cf9cd-default-rtdb.firebaseio.com/userDataRecords.json",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        firstName,
                        date,
                        gender,
                        address,
                        file,
                        email,
                        phone,
                    }),
                }

            );
            if (res) {
                alert("Form submitted successfully");   
                setUserData({
                    firstName: "",
                    date: "",
                    gender: "",
                    address: "",
                    email: "",
                    phone: "",
                });
                setFileUpload({
                    file: "",
                })
            }
            else {
                alert("Plz fill the Data");
                
            }

        // } else {
        //     alert("Plz fill the Data");
        // }
        if(fileUpload == null){
            return;
        }
        // for uploading file to firebase storage
        const fileRef = ref(storage, `files/${fileUpload.name + v4()}`);
        uploadBytes(fileRef, fileUpload);

    }
    return (
        <>
            <div className='container col-lg-4 py-3'>
                <form method='POST'>
                    <label>Name</label><br />
                    <input className='form-control' type='text' name='firstName' value={userData.firstName} onChange={postUserData} required/><br />
                    <label>Date of Birth</label><br />
                    <input className='form-control' type='date' name='date' value={userData.date} onChange={postUserData} required/><br />
                    <label>Gender</label><br />
                    <input type="radio"  name="gender" value="Male" onChange={postUserData} required/>Male&nbsp;&nbsp;
                    <input type="radio"  name="gender" value="Female" onChange={postUserData} required/>Female<br />
                    <label>Address</label><br />
                    <input className='form-control' type='text' name='address' value={userData.address} onChange={postUserData} required/><br />
                    <label>Upload file</label><br/>
                    <input className='form-control' type='file' name='file' value={fileUpload.file} onChange={(event) => {setFileUpload(event.target.files[0])}}/><br />
                    <label>Email</label><br />
                    <input className='form-control' type='email' name='email' value={userData.email} onChange={postUserData} required/><br />
                    <label>Contact Number</label><br />
                    <input className='form-control' type='tel' name='phone' value={userData.phone} onChange={postUserData} required/><br />

                    <button className='btn btn-success' onClick={submitData}>Submit</button>
                </form>
            </div>
        </>
    )
}

export default Form