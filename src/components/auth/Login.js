import {
  Button,
  Flex,
  FormControl,
  FormLabel,
  Input,
  Stack,
} from '@chakra-ui/react';
import React, { useState } from 'react';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = () => {
    console.log('onClick triggered');
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
