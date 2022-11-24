import { useContext } from 'react';
import {
  Avatar,
  Box,
  Button,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  Flex,
  Text,
  useDisclosure,
  useToast,
} from '@chakra-ui/react';
import { toastOptions } from '../configs/toast';
import { CoinsContext } from '../contexts/CoinsContext';
import { signOut } from 'firebase/auth';
import { auth } from '../firebase';

const UserProfileDrawer = () => {
  const { user } = useContext(CoinsContext);
  const { isOpen, onOpen, onClose } = useDisclosure();

  const toast = useToast();

  const logOut = () => {
    signOut(auth);

    toastOptions.title = `Log out successful.`;
    toastOptions.description = `See you soon!`;
    toastOptions.status = 'success';
    toast(toastOptions);
  };

  return (
    <>
      <Box>
        <Avatar
          src={user.photoURL}
          name={user.displayName || user.email}
          bg="yellow.400"
          size="md"
          ml={2}
          cursor="pointer"
          onClick={onOpen}
        />
      </Box>

      <Drawer placement="right" isOpen={isOpen} onClose={onClose}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>Create your account</DrawerHeader>

          <DrawerBody fontFamily="monospace">
            <Flex justify="center" mb={4}>
              <Avatar
                size="2xl"
                w={40}
                h={40}
                src={user.photoURL}
                name={user.displayName || user.email}
                bg="yellow.400"
                cursor="pointer"
              />
            </Flex>
            <Text as="span" fontSize="lg" fontWeight="bold">
              {user.displayName || user.email}
            </Text>
            <Flex
              direction="column"
              flex="1"
              align="center"
              bg="gray.600"
              h="54%"
              mt={8}
              p={4}
              borderRadius="md"
              overflowY="auto"
            >
              <Text as="span" textShadow="0 0 5px #000">
                Watchlist
              </Text>
            </Flex>
          </DrawerBody>

          <DrawerFooter w="full">
            <Button bg="yellow.400" color="#000" w="full" onClick={logOut}>
              LOG OUT
            </Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default UserProfileDrawer;
