import { useState } from "react";
import axios from "axios";
import {
  FormControl,
  FormLabel,
  FormErrorMessage,
  Input,
  Button,
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
  Stack,
} from "@chakra-ui/react";

function AddClient() {
  const [firstname, setFirstName] = useState("");
  const [lastname, setLastName] = useState("");
  const [patronymic, setPatronymic] = useState("");
  const [category, setCategoryId] = useState(0);
  const [IIN, setIIN] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [documentNumber, setDocumentNumber] = useState("");
  const [cardNumber, setCardNumber] = useState("");

  const addUser = () => {
    axios
      .post("http://localhost:3001/create", {
        firstname: firstname,
        lastname: lastname,
        patronymic: patronymic,
        category: category,
        IIN: IIN,
        phoneNumber: phoneNumber,
        documentNumber: documentNumber,
        cardNumber: cardNumber,
      })
      .then(() => {
        return console.log("SUCCESS");
      });
  };

  return (
    <FormControl isRequired>
      <FormLabel htmlFor="firstname">Имя</FormLabel>
      <Input
        id="firstname"
        type="text"
        onChange={(event) => {
          setFirstName(event.target.value);
        }}
      />
      <FormLabel htmlFor="lastname">Фамилия</FormLabel>
      <Input
        id="lastname"
        type="text"
        onChange={(event) => {
          setLastName(event.target.value);
        }}
      />
      <FormLabel htmlFor="patronymic">Отчество</FormLabel>
      <Input
        id="patronymic"
        type="text"
        onChange={(event) => {
          setPatronymic(event.target.value);
        }}
      />
      <FormLabel htmlFor="category">Категория</FormLabel>
      <Input
        id="category"
        type="text"
        onChange={(event) => {
          setCategoryId(event.target.value);
        }}
      />
      <FormLabel htmlFor="IIN">ИИН</FormLabel>
      <Input
        id="IIN"
        type="text"
        onChange={(event) => {
          setIIN(event.target.value);
        }}
      />
      <FormLabel htmlFor="phoneNumber">Номер телефона</FormLabel>
      <Input
        id="phoneNumber"
        type="text"
        onChange={(event) => {
          setPhoneNumber(event.target.value);
        }}
      />
      <FormLabel htmlFor="documentNumber">Номер документа</FormLabel>
      <Input
        id="documentNumber"
        type="text"
        onChange={(event) => {
          setDocumentNumber(event.target.value);
        }}
      />
      <FormLabel htmlFor="cardNumber">Номер карты</FormLabel>
      <Input
        id="cardNumber"
        type="text"
        onChange={(event) => {
          setCardNumber(event.target.value);
        }}
      />
      <Button type="submi" colorScheme="blue" onClick={addUser}>
        Сохранить
      </Button>
    </FormControl>

    //     <div className="information">
    //     <label>First Name:</label>
    //     <input
    //       type="text"
    //       onChange={(event) => {
    //         setFirstName(event.target.value);
    //       }}
    //     />
    //     <label>Last Name:</label>
    //     <input
    //       type="text"
    //       onChange={(event) => {
    //         setLastName(event.target.value);
    //       }}
    //     />
    //     <label>Patronymic:</label>
    //     <input
    //       type="text"
    //       onChange={(event) => {
    //         setPatronymic(event.target.value);
    //       }}
    //     />
    //     <label>Category:</label>
    //     <input
    //       type="text"
    //       onChange={(event) => {
    //         setCategoryId(event.target.value);
    //       }}
    //     />
    //     <label>IIN:</label>
    //     <input
    //       type="text"
    //       onChange={(event) => {
    //         setIIN(event.target.value);
    //       }}
    //     />
    //     <label>Phone Number:</label>
    //     <input
    //       type="text"
    //       onChange={(event) => {
    //         setPhoneNumber(event.target.value);
    //       }}
    //     />
    //     <label>Document Number:</label>
    //     <input
    //       type="text"
    //       onChange={(event) => {
    //         setDocumentNumber(event.target.value);
    //       }}
    //     />
    //     <label>Card Number:</label>
    //     <input
    //       type="text"
    //       onChange={(event) => {
    //         setCardNumber(event.target.value);
    //       }}
    //     />
    //     <button onClick={addUser}>Add User</button>
    //   </div>
  );
}

export default AddClient;
