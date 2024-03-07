import { onAuthStateChanged,signOut } from "firebase/auth";
import React, { useEffect, useState } from "react";
import { auth } from "../firebase/firebase";
import { Navigate, useHref } from 'react-router-dom';
import { useAuth } from "../Contexts/AuthContext";
import "../assets/styles/userlist.css";
import { db } from "../firebase/firebase";
import { collection, getDocs } from "firebase/firestore";
import tableHeader from "../assets/data/userTableHeader.json";
import { useTable } from "react-table";


export default function UserList() {
    const columns = React.useMemo(() => tableHeader, []);
    const [userList, setUserList] = useState([]);
    const usersCollectionRef=collection(db,"users");
    useEffect(()=>{
        const getUserList= async ()=>{
            try {
                const data = await getDocs(usersCollectionRef);
                const filteredData= data.docs.map((doc)=>({...doc.data(),id:doc.id}));
                setUserList(filteredData);} catch (error) {console.log(error);}
        }
        getUserList();
//------------------------effectreduced-------------------
        const listen =onAuthStateChanged(auth,(user)=>{
            if (user) {
                setAuthUser(user);
            }else{
                setAuthUser(null);
            }})
            return ()=>listen();

    },[]);
    const {userLoggedIn} =useAuth();
    // const href =useHref();
    const [authUser, setAuthUser] = useState(null);
    const userSignOut =()=>{
        signOut(auth).then(()=>{
            console.log('signed out successfully');
        }).catch((err)=>{console.log(err);})
    }


//--------table-------------
const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =useTable( {columns, data:[...userList] });




    return(<div className="userlist-body">
              {!userLoggedIn &&(<Navigate to={'/login'} replace={true} />)}
              <nav className="userlist-nav">
        <h1>UserList Page!</h1>
        {authUser?<><p>Signed in as {authUser.email} </p><button type="button" onClick={userSignOut}>sign out</button></>:<><p>Signed out</p></>}
        </nav>
{/* -------------------------------------------------------------- */}
       <div className="userlist-table-wrap">
      <div className="userlist-table-container">
        <table className="" {...getTableProps()}>
          <thead className="userlist-thead">
            {headerGroups.map((headerGroup) => (
              <tr className="" {...headerGroup.getHeaderGroupProps()}>
                <th className="userlist-th">S.No</th>
                {headerGroup.headers.map((column) => (
                  <th className="userlist-th" {...column.getHeaderProps()}>
                    {column.render("Header")}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody className="userlist-tbody" {...getTableBodyProps()}>
            {rows.map((row,i) => {
              prepareRow(row);
              return (
                <tr className="userlist-tr" {...row.getRowProps()}>
                  <td className="userlist-td">{i+1}</td>
                  {row.cells.map((cell) => (
                    <td className="userlist-td" {...cell.getCellProps()}> {cell.render("Cell")} </td>
                  ))}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      </div> 
{/* -------------------------------------------------------- */}

    </div>)
}