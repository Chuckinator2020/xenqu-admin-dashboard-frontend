import { AlertDialog, AlertDialogBody, AlertDialogCloseButton, AlertDialogContent, AlertDialogHeader, AlertDialogOverlay, Box, Button, Flex, Heading, HStack, Spacer, Text, useDisclosure, VStack } from "@chakra-ui/react";
import { Contact } from "../data/models/Contact";

import React, { Fragment, useState } from 'react';
import axios, { AxiosResponse } from "axios";


const ContactCard = (contact: Contact) => {

    const { contact_id, display_name, org_name, title, primary_email, primary_phone } = {...contact};

    const [isDetails, setIsDetails] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(false);

    const { isOpen, onOpen } = useDisclosure();
    const onClose = () => {
        setIsDetails(false);
        setError(false);
    }

    const onSubmit = () => {
        setIsLoading(true);
        axios.post(`http://localhost:3000/api/user/${contact_id}`
        ).then((res: AxiosResponse) => {
            const data = res.data;
            setIsLoading(false);
            console.log(data);
            if (data["status"] === "success") {
                const url = data["url"];
                console.log(url);
                window.open(url, "_blank");
            } else {
                console.log("ERROR");
                setError(true);
                onOpen();
            }
        }).catch((err) => {
            setIsLoading(false);
            setError(true);
            onOpen();
        })
    }

    const ErrorPopup = () => {
        return (
            <AlertDialog motionPreset="slideInBottom" leastDestructiveRef={undefined} onClose={onClose} isOpen={isOpen} closeOnOverlayClick={true} closeOnEsc={true} >
                <AlertDialogOverlay />
                <AlertDialogContent>
                    <AlertDialogHeader>Something went wrong</AlertDialogHeader>
                    <AlertDialogCloseButton/>
                    <AlertDialogBody> Account does not have associated user. </AlertDialogBody>
                </AlertDialogContent>
            </AlertDialog>
        )
    }

    const DetailsPopup = () => {
        return (
            <AlertDialog size="2xl" motionPreset="slideInBottom" leastDestructiveRef={undefined} onClose={onClose} isOpen={isOpen} closeOnOverlayClick={true} closeOnEsc={true} >
                <AlertDialogOverlay />
                <AlertDialogContent>
                    <AlertDialogHeader fontWeight="bold">Contact ID: {contact_id}</AlertDialogHeader>
                    <AlertDialogCloseButton/>
                    <AlertDialogBody> 
                        <VStack alignItems="start">
                            <Heading as="h3" size="lg" noOfLines={1} isTruncated={false}>Display Name: {display_name}</Heading>
                            <Heading as="h3" size="md">Org Name: {org_name}</Heading>
                            <Heading as="h3" size="md">Title: {title}</Heading>
                            <Heading as="h3" size="sm">Primary Email: {primary_email}</Heading>
                            <Heading as="h3" size="sm">Primary Phone: {primary_phone}</Heading>
                            <Text/>
                            <Text/>
                        </VStack>
                    </AlertDialogBody>
                </AlertDialogContent>
            </AlertDialog>
        )
    }

    return (
        <Fragment>

            { error && <ErrorPopup /> }

            { isDetails && <DetailsPopup /> }

            <Flex w="100%">
                <HStack bg="gray.300" borderWidth="2px" shadow="lg" w="100%" p={2} paddingRight={5}>
                    <VStack _hover={{
                        background: "orange.500",
                        color: "white"
                    }} as="button" rounded={10} alignItems="start" padding={3} onClick={() => {setIsDetails(true); onOpen();}}>
                        <Heading as="h1" size="lg">{display_name}</Heading>
                        { org_name !== "" && <Heading as="h2" size="md">{org_name}</Heading> }
                        { title !== "" && <Heading as="h3" size="sm" isTruncated>{title}</Heading> }
                        <Heading as="h3" size="sm">{primary_email}</Heading>
                        
                    </VStack>
                    <Spacer />
                    <Button colorScheme="green" size="md" isLoading={isLoading} onClick={onSubmit}>
                        <Text>Log in 💥</Text>
                    </Button>
                </HStack>
            </Flex>
        </Fragment>
    )
}

export default ContactCard;
