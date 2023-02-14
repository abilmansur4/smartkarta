import { useState, useEffect } from "react";
import axios from 'axios'
import {
    Table,
    Thead,
    Tbody,
    Tr,
    Th,
    Td,
  } from '@chakra-ui/react'

  function Main() {
    const [usersList, setUsersList] = useState([]);

    useEffect(() => {
        axios
            .get("http://localhost:3001/users")
            .then(response => {
                console.log(response.data);  
                setUsersList(response.data);
            })
            .catch(err => {
                console.log(err)
            });
    }, []);

    // async function getUsers() {
    //     await axios.get("http://localhost:3001/users").then((response) => {
    //         // console.log(response.data);  
    //         setUsersList(response.data);
    //     });
        
    //   };

      return (
        // <div className="users">
        //     <button onClick={getUsers}>Show Users</button>
        //     {usersList.map((val, key) => {
        //     return (
        //         <div className="user" key={val.id}> 
        //         <h3>{val.firstname}</h3> 
        //         <h3>{val.lastname}</h3>
        //         </div>
        //         );
        //     })}
        // </div>

        <Table variant='simple'>
            <Thead>
                <Tr>
                    <Th>Имя</Th>
                    <Th>Фамилия</Th>
                    <Th>Отчество</Th>
                    <Th>ИИН</Th>
                    <Th>Номер телефона</Th>
                    <Th>Категория</Th>
                    <Th>№ документа</Th>
                    <Th>Номер карты</Th>
                </Tr>
            </Thead>
            <Tbody>
                {usersList.map((val) => {
                    return (
                        <Tr key={val.id}>
                            <Td>{val.firstname}</Td>
                            <Td>{val.lastname}</Td>
                            <Td>{val.patronymic}</Td>
                            <Td>{val.IIN}</Td>
                            <Td>{val.phone_number}</Td>
                            <Td>{val.category_id}</Td>
                            <Td>{val.document_number}</Td>
                            <Td>{val.card_number}</Td>
                        </Tr>
                    )
                })}
            </Tbody>
        </Table>
      );
  }

  export default Main;