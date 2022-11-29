import { useState } from 'react';
import {
  Button,
  Flex,
  FormControl,
  FormLabel,
  Input,
  Stack,
  useToast,
} from '@chakra-ui/react';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { toastOptions } from '../../configs/toast';
import { auth } from '../../firebase';

const SignUp = ({ onClose }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const toast = useToast();

  // TODO: Figure out how to switch tab panels on success sign up
  // const loginTab = document.querySelector('button[data-index="0"]');
  // const signupTab = document.querySelector('button[data-index="1"]');
  // const loginPanel = document.querySelector('[aria-labelledby*="tab-0"]');
  // const signupPanel = document.querySelector('[aria-labelledby*="tab-1"]');

  const handleSubmit = async () => {
    if (password !== confirmPassword) {
      toastOptions.title = 'An error occurred.';
      toastOptions.description = 'Passwords do not match';
      toastOptions.status = 'error';
      toast(toastOptions);
      setEmail('');
      setPassword('');
      setConfirmPassword('');
      return;
    }

    try {
      const userCredentials = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredentials.user;

      if (password.length && password === confirmPassword) {
        toastOptions.title = 'Sign up successful!';
        toastOptions.description = `Welcome to Koin Tracker!! Go ahead and log in!`;
        toastOptions.status = 'success';
        toast(toastOptions);
        setEmail('');
        setPassword('');
        setConfirmPassword('');
        // onClose(); // Closes toast regardless of duration value
      }
    } catch (error) {
      toastOptions.title = 'An error occured.';
      toastOptions.description = error.message;
      toastOptions.status = 'error';
      toast(toastOptions);
      setEmail('');
      setPassword('');
      setConfirmPassword('');
      return;
    }
  };

  return (
    <Flex direction="column">
      <Stack spacing={4}>
        <FormControl variant="floating" id="email" isRequired>
          <Input
            size="lg"
            type="email"
            placeholder=" "
            value={email}
            onChange={e => setEmail(e.target.value)}
          />
          <FormLabel>Email</FormLabel>
        </FormControl>
        <FormControl variant="floating" id="password" isRequired>
          <Input
            size="lg"
            type="password"
            placeholder=" "
            value={password}
            onChange={e => setPassword(e.target.value)}
          />
          <FormLabel>Password</FormLabel>
        </FormControl>
        <FormControl variant="floating" id="confirm-password" isRequired>
          <Input
            size="lg"
            type="password"
            placeholder=" "
            value={confirmPassword}
            onChange={e => setConfirmPassword(e.target.value)}
          />
          <FormLabel>Confirm password</FormLabel>
        </FormControl>
        <Button
          type="submit"
          size="lg"
          w="100%"
          bg="yellow.400"
          color="#000"
          onClick={handleSubmit}
        >
          SIGN UP!
        </Button>
      </Stack>
    </Flex>
  );
};

export default SignUp;
