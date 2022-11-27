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
  HStack,
  IconButton,
  Text,
  useDisclosure,
  useToast,
  VStack,
} from '@chakra-ui/react';
import { DeleteIcon } from '@chakra-ui/icons';
import { toastOptions } from '../configs/toast';
import { CoinsContext } from '../contexts/CoinsContext';
import { signOut } from 'firebase/auth';
import { auth, db } from '../firebase';
import { Link } from 'react-router-dom';
import { currencyFormatter, options } from '../utils/utils';
import { doc, setDoc } from 'firebase/firestore';

const UserProfileDrawer = () => {
  const { coins, currency, user, watchlist } = useContext(CoinsContext);
  const { isOpen, onOpen, onClose } = useDisclosure();

  console.log(coins);

  const toast = useToast();

  const logOut = () => {
    signOut(auth);

    toastOptions.title = `Log out successful.`;
    toastOptions.description = `See you soon!`;
    toastOptions.status = 'success';
    toast(toastOptions);
  };

  const removeFromWatchlist = async coin => {
    const coinsRef = doc(db, 'watchlist', user.uid);

    try {
      await setDoc(
        coinsRef,
        {
          coins: watchlist.filter(watchedCoins => watchedCoins !== coin.id),
        },
        { merge: 'true' }
      );

      toastOptions.title = 'Succesfully deleted.';
      toastOptions.description = `${coin.name} coin removed from Watchlist.`;
      toastOptions.status = 'success';
      toast(toastOptions);
    } catch (error) {
      toastOptions.title = `Oops. An error occurred.`;
      toastOptions.description = error.message;
      toastOptions.status = 'error';
      toast(toastOptions);
    }
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
        <DrawerContent align="center">
          <DrawerCloseButton />
          <DrawerHeader fontFamily="monospace">Profile</DrawerHeader>

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
              direction="column"
              flex="1"
              align="center"
              bg="gray.600"
              h="54%"
              mt={8}
              borderRadius="md"
              overflowY="auto"
            >
              <Text as="span" my={4} textShadow="0 0 5px #000">
                Watchlist
              </Text>
              {coins.map(coin =>
                watchlist.includes(coin.id) ? (
                  <Flex
                    w="92%"
                    justify="space-between"
                    align="center"
                    bg="yellow.300"
                    borderRadius="md"
                    color="#000"
                    m={1}
                    p={1}
                  >
                    <Link to={`/coins/${coin.id}`} key={coin.id}>
                      <Text as="span" fontWeight="bold" pl={4}>
                        {coin.name}
                      </Text>
                    </Link>
                    <Text as="span" vericalAlign="middle">
                      {currencyFormatter(coin?.current_price, options)}
                      <IconButton
                        aria-label="Remove coin from watchlist"
                        icon={<DeleteIcon />}
                        boxSize={6}
                        bgColor="transparent"
                        mb="5px"
                        _hover={{ bgColor: 'transparent' }}
                        onClick={() => removeFromWatchlist(coin)}
                      />
                    </Text>
                  </Flex>
                ) : null
              )}
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
