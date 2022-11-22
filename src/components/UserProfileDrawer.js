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
  Input,
  Text,
  useDisclosure,
  Wrap,
  WrapItem,
} from '@chakra-ui/react';
import { useContext, useRef } from 'react';
import { CoinsContext } from '../contexts/CoinsContext';

const UserProfileDrawer = () => {
  const { user } = useContext(CoinsContext);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = useRef();

  console.log(user);

  const logOut = () => {
    console.log('Log out function triggered.');
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
          ref={btnRef}
          onClick={onOpen}
        />
      </Box>

      <Drawer
        isOpen={isOpen}
        placement="right"
        onClose={onClose}
        finalFocusRef={btnRef}
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>Create your account</DrawerHeader>

          <DrawerBody>
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
            <Text
              as="span"
              fontFamily="monospace"
              fontSize="lg"
              fontWeight="bold"
            >
              {user.displayName || user.email}
            </Text>
            <Flex
              border="solid"
              borderColor="pink"
              direction="column"
              flex="1"
              align="center"
              h="50%"
              mt={8}
              p={4}
              borderRadius="md"
              overflowY="scroll"
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
