import {
  Button,
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
} from '@chakra-ui/react';
import { useState } from 'react';
import Login from './Login';
import SignUp from './SignUp';

const AuthModal = () => {
  const { isOpen, onClose, onOpen } = useDisclosure();
  const [tabIndex, setTabIndex] = useState(0);

  return (
    <>
      <Button bg="yellow.400" color="#000" onClick={onOpen}>
        Log In
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
                  <Login />
                </TabPanel>
                <TabPanel>
                  <SignUp />
                </TabPanel>
              </TabPanels>
            </Tabs>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default AuthModal;
