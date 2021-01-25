
import { AlertDialog, AlertDialogBody, AlertDialogCloseButton, AlertDialogContent, AlertDialogHeader, AlertDialogOverlay, Box, Button, Divider, Input, InputGroup, InputRightElement, Text, useDisclosure, VStack } from "@chakra-ui/react"
import axios, { AxiosError, AxiosResponse } from "axios";
import { ChangeEvent, Fragment, useState } from "react"
import { Contact } from "../data/models/Contact";
import ContactCard from "./ContactCard";

const Search = () => {

    const [error, setError] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const [value, setValue] = useState("");

    const [contacts, setContacts] = useState([]);

    const { isOpen, onOpen } = useDisclosure();

    const onClose = () => {
        setError(false);
    }

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        setValue(event.target.value);
    }

    const handleSearch = () => {
        const body = { "term": value };
        axios.post("http://localhost:3000/api/search", body
            ).then((res: AxiosResponse) => {
                setContacts(res.data);
            }).catch((err: AxiosError) => {
                console.log("ERRRRRROR");
                setErrorMessage(err.message);
                setError(true);
                onOpen();
            });
    }

    const ErrorPopup = () => {
        return (
            <AlertDialog motionPreset="slideInBottom" leastDestructiveRef={undefined} onClose={onClose} isOpen={isOpen} closeOnOverlayClick={true} closeOnEsc={true} isCentered>
                <AlertDialogOverlay />
                <AlertDialogContent>
                    <AlertDialogHeader>Something went wrong</AlertDialogHeader>
                    <AlertDialogCloseButton/>
                    <AlertDialogBody> {errorMessage} </AlertDialogBody>
                </AlertDialogContent>
            </AlertDialog>
        )
    }

    const ContactsList = () => {
        return (
            <Fragment>
                <Box bg="gray.200" p={3} rounded={20}>
                    <VStack p={1} alignItems="start">
                        {contacts.map((contact: Contact) => {
                            console.log(contact);
                            return <ContactCard key={contact.contact_id} {...contact}/>
                        })}
                    </VStack>
                </Box>
            </Fragment>
        )
    }

    return (
        <div>
            { error && <ErrorPopup /> }

            {/* //? Search Bar */}
            <Divider w="100%" height="10px" orientation="horizontal"/>
            <InputGroup size="lg" shadow="md" minW="45rem" maxW="50rem" rounded={20}>
                <Input type="text" placeholder="Search Contacts" onChange={handleChange} color="black" bg="white" rounded={20} onSubmit={handleSearch}/>
                <InputRightElement width="10rem">
                    <Button h="3rem" w="10rem" size="lg" colorScheme="blue" color="white" rounded={17} onClick={handleSearch}>
                        <Text fontSize="xl" as="b">Search</Text>
                    </Button>
                </InputRightElement>
            </InputGroup>
            <Divider w="100%" height="20px" orientation="horizontal"/>
            
            { contacts.length !== 0 && <ContactsList /> }
        </div>
    )
}

export default Search;
