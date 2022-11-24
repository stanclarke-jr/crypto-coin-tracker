import {
  Button,
  Flex,
  FormControl,
  FormLabel,
  Input,
  Stack,
  useToast,
} from '@chakra-ui/react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import React, { useState } from 'react';
import { toastOptions } from '../../configs/toast';
import { auth } from '../../firebase';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const toast = useToast();

  const handleSubmit = async () => {
    if (!email || !password) {
      toastOptions.title = 'An error occurred.';
      toastOptions.description = 'Please complete all fields.';
      toastOptions.status = 'error';
      toast(toastOptions);
      setEmail('');
      setPassword('');
      return;
    }
    try {
      const userCredentials = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredentials.user;
      toastOptions.title = `Log in successful!`;
      toastOptions.description = `Welcome to Koin Tracker${
        user.displayName !== null ? ` ${user.displayName}.` : '.'
      } Track your coins!`;
      toastOptions.status = 'success';
      toast(toastOptions);
      setEmail('');
      setPassword('');
      return;
      // onClose(); // Closes toast regardless of duration value
    } catch (error) {
      toastOptions.title = 'An error occured.';
      toastOptions.description = error.message;
      toastOptions.status = 'error';
      toast(toastOptions);
      setEmail('');
      setPassword('');
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
        <Button
          type="submit"
          size="lg"
          w="100%"
          bg="yellow.400"
          color="#000"
          onClick={handleSubmit}
        >
          LOG IN!
        </Button>
      </Stack>
    </Flex>
  );
};

export default Login;
