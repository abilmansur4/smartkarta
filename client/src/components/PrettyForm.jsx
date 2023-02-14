import React, { useState } from "react";
import axios from "axios";
import {
  Stack,
  Button,
  FormControl,
  FormLabel,
  Input,
  Select,
  Alert,
  AlertTitle,
  CloseButton,
  AlertDialog,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  useDisclosure,
} from "@chakra-ui/react";
import { useAuth } from "../hook/useAuth";
import { useNavigate } from "react-router-dom";

const PrettyForm = () => {
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [patronymic, setPatronymic] = useState("");
  // const [category, setCategoryId] = useState(0);
  const [IIN, setIIN] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [documentNumber, setDocumentNumber] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [showAlert, setShowAlert] = useState("none");
  const [category, setCategory] = useState("");
  const isInvalid =
    firstname === "" ||
    lastname === "" ||
    category === "" ||
    IIN === "" ||
    IIN.length !== 12 ||
    phoneNumber === "" ||
    phoneNumber.length !== 11 ||
    documentNumber === "" ||
    cardNumber === "" ||
    cardNumber.length !== 11;
  // const isError = firstname === ''

  const { isOpen, onOpen, onClose } = useDisclosure();

  const handleClientRegistration = (event) => {
    event.preventDefault();
    console.log(
      firstname + " " + lastname + " " + patronymic + " " + IIN + " " + category
    );
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
        onOpen();
        setTimeout(() => {
          onClose();
        }, 3000);
        return console.log("SUCCESS");
      });

    setFirstname("");
    setLastname("");
    setPatronymic("");
    setIIN("");
    setPhoneNumber("");
    setDocumentNumber("");
    setCardNumber("");
    setCategory("");
  };

  // const auth = useAuth();
  // const navigate = useNavigate();

  return (
    <>
      {/* <Button
        onClick={() => auth.logout(() => navigate("/", { replace: true }))}
      >
        Выйти
      </Button> */}
      <form method="POST" onSubmit={handleClientRegistration}>
        <Stack maxWidth={600} margin="auto" spacing={5} marginTop={5}>
          <Alert status="success" variant="top-accent" display={showAlert}>
            {/* <AlertIcon /> */}
            <AlertTitle mr={3}>Клиент успешно добавлен!</AlertTitle>
            <CloseButton
              onClick={() => setShowAlert("none")}
              position="absolute"
              right="6px"
              top="6px"
            />
          </Alert>
          <FormControl>
            <FormLabel htmlFor="firstname">Имя</FormLabel>
            <Input
              isRequired
              type="text"
              id="firstname"
              aria-describedby="firstname-helper-text"
              value={firstname}
              onChange={({ target }) => setFirstname(target.value)}
            />
          </FormControl>
          <FormControl>
            <FormLabel htmlFor="lastname">Фамилия</FormLabel>
            <Input
              isRequired
              type="text"
              id="lastname"
              aria-describedby="lastname-helper-text"
              value={lastname}
              onChange={({ target }) => setLastname(target.value)}
            />
          </FormControl>
          <FormControl>
            <FormLabel htmlFor="patronymic">Отчество</FormLabel>
            <Input
              // isRequired
              type="text"
              id="patronymic"
              aria-describedby="patronymic-helper-text"
              value={patronymic}
              onChange={({ target }) => setPatronymic(target.value)}
            />
          </FormControl>
          <FormControl>
            <FormLabel htmlFor="category">Категория</FormLabel>
            <Select
              placeholder="Выберите категорию"
              onChange={(e) => setCategory(e.target.value)}
              value={category}
            >
              <option value="Пенсионер">Пенсионер</option>
              <option value="Инвалид 1 группы">Инвалид 1 группы</option>
              <option value="Инвалид 2 группы">Инвалид 2 группы</option>
              <option value="Инвалид 3 группы">Инвалид 3 группы</option>
              <option value="Инвалид 2 группы по зрению">
                Инвалид 2 группы по зрению
              </option>
              <option value="Дети инвалиды до 18 лет">
                Дети инвалиды до 18 лет
              </option>
              <option value="Приравненные ветераны и инвалиды ВОВ">
                Приравненные ветераны и инвалиды ВОВ
              </option>
            </Select>
          </FormControl>
          <FormControl>
            <FormLabel htmlFor="IIN">ИИН</FormLabel>
            <Input
              // isRequired
              type="number"
              id="IIN"
              // aria-describedby="IIN-helper-text"
              value={IIN}
              onChange={({ target }) => setIIN(target.value)}
            />
          </FormControl>
          <FormControl>
            <FormLabel htmlFor="phoneNumber">Номер телефона</FormLabel>
            <Input
              // isRequired
              type="number"
              id="phoneNumber"
              aria-describedby="phoneNumber-helper-text"
              value={phoneNumber}
              onChange={({ target }) => setPhoneNumber(target.value)}
            />
          </FormControl>
          <FormControl>
            <FormLabel htmlFor="documentNumber">№ Документа</FormLabel>
            <Input
              // isRequired
              type="number"
              id="documentNumber"
              aria-describedby="documentNumber-helper-text"
              value={documentNumber}
              onChange={({ target }) => setDocumentNumber(target.value)}
            />
          </FormControl>
          <FormControl>
            <FormLabel htmlFor="documentNumber">Номер карты</FormLabel>
            <Input
              // isRequired
              type="number"
              id="cardNumber"
              aria-describedby="cardNumber-helper-text"
              value={cardNumber}
              onChange={({ target }) => setCardNumber(target.value)}
            />
          </FormControl>
          <FormControl>
            <Button colorScheme="blue" type="submit" disabled={isInvalid}>
              Добавить
            </Button>
          </FormControl>
        </Stack>
      </form>
      <AlertDialog isOpen={isOpen} onClose={onClose}>
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader>Клиент успешно добавлен!</AlertDialogHeader>
            <AlertDialogFooter>
              <Button colorScheme="linkedin" onClick={onClose} size="sm">
                Закрыть
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </>
  );
};

export { PrettyForm };
