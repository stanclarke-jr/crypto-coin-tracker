/* eslint-disable react-hooks/exhaustive-deps */
import { useState } from 'react';
import {
  Box,
  Button,
  Flex,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Tabs,
  TabList,
  Tab,
  TabPanels,
  TabPanel,
  useToast,
} from '@chakra-ui/react';
import {
  signInWithPopup,
  GoogleAuthProvider,
  signInWithRedirect,
} from 'firebase/auth';
import { auth } from '../../firebase';
import Login from './Login';
import SignUp from './SignUp';
import { toastOptions } from '../../configs/toast';
import GoogleButton from 'react-google-button';
// import jwt_decode from 'jwt-decode';

const AuthModal = () => {
  const { isOpen, onClose, onOpen } = useDisclosure();
  const [tabIndex, setTabIndex] = useState(0);

  const googleProvider = new GoogleAuthProvider();

  ///// **** Button doesn't appear when modal opens + styles are applued b/c of the iframe
  ///// TODO: Get the new Google Indentitiy Plaform Sign In to work instead of using react-google-button package in conjunction with a custom handler
  ///// https://developers.google.com/identity/gsi/web/guides/overview

  // const google = (window.google = window.google ? window.google : {});
  // console.log('%cGlobal google object: ', 'color: dodgerblue', google);
  // const handleCredentialResponse = response => {
  //   console.log('Encoded JWT ID token: ' + response.credential);
  //   const decodedResponse = jwt_decode(response.credential);
  //   console.log(decodedResponse);
  // };

  // useEffect(() => {
  //   google.accounts.id.initialize({
  //     client_id:
  //       '878849709484-7c81j1g30j8vfs8a6narig9q0a5qdmk1.apps.googleusercontent.com',
  //     callback: handleCredentialResponse,
  //   });
  //   google.accounts.id.renderButton(
  //     document.getElementById('google-button__div'),
  //     {
  //       text: 'continue_with',
  //       theme: 'filled_black',
  //       size: 'large',
  //     }
  //   );
  // }, []);

  ///// End of Google Identity Platform code

  const toast = useToast();

  const isMobile = navigator.userAgentData.mobile;

  const formDividerStyles = {
    content: `''`,
    background: '#4a5568',
    width: '125px',
    height: '1px',
  };

  const signInWithGoogleRedirect = () => {
    signInWithRedirect(auth, googleProvider);
  };
  const signInWithGooglePopup = () => {
    signInWithPopup(auth, googleProvider)
      .then(result => {
        // This gives you a Google Access Token. You can use it to access Google APIs.
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;

        const user = result.user;
        toastOptions.title = `Success!`;
        toastOptions.description = `Welcome to Koin Tracker${
          user.displayName !== null ? ` ${user.displayName}.` : '.'
        } Track your coins!`;
        toastOptions.status = 'success';
        toast(toastOptions);
        // console.log(
        //   '%cSign in with popup result: ',
        //   'color: purple; font-weight: bold',
        //   result
        // );
        // console.log(
        //   '%cCredential from result: ',
        //   'color: darkcyan; font-weight: bold',
        //   credential
        // );
        // console.log(
        //   '%cAccess token: ',
        //   'color: darkgreen; font-weight: bold',
        //   token
        // );
        // console.log('%cUser data: ', 'color: darkblue; font-weight: bold', user);
      })
      .catch(error => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode);
        console.log(errorMessage);
        // The email of the user's account used.
        const email = error.customData.email;
        // The AuthCredential type that was used.
        const credential = GoogleAuthProvider.credentialFromError(error);
        // ...
      });
  };

  return (
    <>
      <Button bg="yellow.400" color="#000" onClick={onOpen}>
        LOG IN
      </Button>
      <Modal size="sm" isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalCloseButton />
          <ModalBody px={2}>
            <Tabs isFitted onChange={index => setTabIndex(index)}>
              <TabList>
                <Tab>LOG IN</Tab>
                <Tab>SIGN UP</Tab>
              </TabList>
              <TabPanels mt={2}>
                <TabPanel>
                  <Login onClose={onClose} />
                </TabPanel>
                <TabPanel>
                  <SignUp onClose={onClose} />
                </TabPanel>
                <Flex
                  px={4}
                  fontSize="xl"
                  justify="center"
                  align="center"
                  _before={{
                    ...formDividerStyles,
                    marginRight: '25px',
                  }}
                  _after={{
                    ...formDividerStyles,
                    marginLeft: '25px',
                  }}
                >
                  OR
                </Flex>
                <Box p={4}>
                  {/* <Box id="google-button__div" w="100%"></Box> */}
                  <GoogleButton
                    style={{
                      width: '100%',
                      borderRadius: '5px',
                      fontWeight: '500',
                      backgroundColor: '#171923',
                    }}
                    label="Continue with Google"
                    onClick={
                      isMobile
                        ? signInWithGoogleRedirect
                        : signInWithGooglePopup
                    }
                  />
                </Box>
              </TabPanels>
            </Tabs>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default AuthModal;
