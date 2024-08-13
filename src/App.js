import { Container, Stack, List, Flex, Heading } from '@chakra-ui/react';
import React, { useState } from 'react';
import { useDrop } from 'react-dnd';

import Task from './components/Task';

const App = () => {
  const [players, setPlayers] = useState([
    { name: 'Rahul' },
    { name: 'Sanket' },
    { name: 'Mohit' },
    { name: 'Sourabh' },
    { name: 'Sundar' },
  ]);
  const [team, setTeam] = useState([]);

  const [{ isOver }, addToTeamRef] = useDrop({
    accept: 'player',
    drop: (item) => moverPlayertask(item),
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  });

  const [{ isOver: isPlayerOver }, removeFromTeamRef] = useDrop({
    accept: 'player',
    drop: (item) => removerPlayertask(item),
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  });

  const moverPlayertask = (item) => {
    setPlayers((prevPlayers) => prevPlayers.filter((player) => player.name !== item.name));

    // Add to team only if it's not already present
    setTeam((prevTeam) => {
      if (!prevTeam.find((player) => player.name === item.name)) {
        return [...prevTeam, item];
      }
      return prevTeam;
    });
  };

  const removerPlayertask = (item) => {
    setTeam((prevTeam) => prevTeam.filter((player) => player.name !== item.name));

    // Add back to players only if it's not already present
    setPlayers((prevPlayers) => {
      if (!prevPlayers.find((player) => player.name === item.name)) {
        return [...prevPlayers, item];
      }
      return prevPlayers;
    });
  };

  return (
    <Container maxW="800px">
      <Flex justify="space-between" height="90vh" align="center">
        <Stack width="300px">
          <Heading fontSize="3xl" color="yellow.800" textAlign="center">Task</Heading>
          <List ref={removeFromTeamRef} p="4" minH="70vh" boxShadow="xl" borderRadius="md" bgGradient={isPlayerOver ? 'linear(to-b, yellow.300, yellow.500)' : 'linear(to-b, yellow.100, yellow.200)'}>
            {players.map((e, i) => <Task key={e.name} item={e} type="player" index={i} onDropPlayer={moverPlayertask} />)}
          </List>
        </Stack>
        <Stack width="300px">
          <Heading fontSize="3xl" color="teal.800" textAlign="center">Add Task</Heading>
          <List ref={addToTeamRef} p="4" minH="70vh" boxShadow="xl" borderRadius="md" bgGradient={isOver ? 'linear(to-b, teal.300, teal.500)' : 'linear(to-b, teal.100, teal.200)'}>
            {team.map((e, i) => <Task key={e.name} item={e} type="player" index={i} onDropPlayer={removerPlayertask} />)}
          </List>
        </Stack>
      </Flex>
    </Container>
  );
};

export default App;
