import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
} from "@chakra-ui/react";

const UsersList = () => {
  const [usersList, setUsersList] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:3001/users").then((response) => {
      setUsersList(response.data);
      // return console.log(response.data);
    });
  }, []);

  return (
    <>
      <TableContainer>
        <Table size="sm">
          <Thead>
            <Tr>
              <Th>Имя</Th>
              <Th>Фамилия</Th>
              <Th>Отчество</Th>
              <Th>ИИН</Th>
              <Th>Категория</Th>
              <Th>Номер телефона</Th>
              <Th>Номер документа</Th>
              <Th>Номер карты</Th>
              <Th>Изменить</Th>
            </Tr>
          </Thead>
          <Tbody>
            {usersList.map((val, key) => {
              return (
                <Tr key={val.id}>
                  <Td>{val.firstname}</Td>
                  <Td>{val.lastname}</Td>
                  <Td>{val.patronymic}</Td>
                  <Td>{val.IIN}</Td>
                  <Td>{val.category_id}</Td>
                  <Td>{val.phone_number}</Td>
                  <Td>{val.document_number}</Td>
                  <Td>{val.card_number}</Td>
                  <Td>Изменить</Td>
                </Tr>
              );
            })}
          </Tbody>
        </Table>
      </TableContainer>
    </>
  );
};

export { UsersList };
