import { useState } from 'react';
import {
  Button,
  ChakraProvider,
  Flex,
  FormControl,
  FormLabel,
  Input,
  Stack,
  useToast,
} from '@chakra-ui/react';
import theme from '../../configs/theme';
import { createUserWithEmailAndPassword, getAuth } from 'firebase/auth';
import { toastOptions } from '../../configs/toast';

const SignUp = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const toast = useToast();

  const handleSubmit = async () => {
    if (password !== confirmPassword) {
      toastOptions.title = 'An error occurred.';
      toastOptions.description = 'Passwords do not match';
      toastOptions.status = 'error';

      toast(toastOptions);
    }
    try {
      const auth = getAuth();
      const userCredentials = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredentials.user;
      console.log('%cFirebase user: ', 'color: orange', user);
    } catch (error) {}
  };

  return (
    <ChakraProvider theme={theme}>
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
    </ChakraProvider>
  );
};

export default SignUp;
