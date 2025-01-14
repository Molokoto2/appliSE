// Frontend: React Native avec Expo
// ================================
import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, FlatList, StyleSheet } from 'react-native';

const App = () => {
  const [events, setEvents] = useState([]);
  const [eventName, setEventName] = useState('');

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      const response = await fetch('http://localhost:3000/events');
      const data = await response.json();
      setEvents(data);
    } catch (error) {
      console.error(error);
    }
  };

  const addEvent = async () => {
    try {
      const response = await fetch('http://localhost:3000/events', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name: eventName, date: new Date(), recurrence: 'weekly' }),
      });
      const newEvent = await response.json();
      setEvents([...events, newEvent]);
      setEventName('');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Gestion des événements</Text>
      <TextInput
        style={styles.input}
        placeholder="Nom de l'événement"
        value={eventName}
        onChangeText={setEventName}
      />
      <Button title="Ajouter un événement" onPress={addEvent} />

      <FlatList
        data={events}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <Text style={styles.event}>{item.name}</Text>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
  },
  event: {
    fontSize: 16,
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
});

export default App;
