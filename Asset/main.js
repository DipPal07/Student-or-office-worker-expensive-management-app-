import React from 'react';
import {Button, StyleSheet, Text, View} from 'react-native';
import DialogInput from 'react-native-dialog-input';

const App = () => {
  const [visible, setVisible] = React.useState(false);
  const [input, setInput] = React.useState('');

  return (
    <View style={styles.container}>
      {input ? (
        <Text style={styles.title}>{input}</Text>
      ) : (
        <Text style={styles.title}>App</Text>
      )}
      <DialogInput
        isDialogVisible={visible}
        title={'Feedback'}
        message={'Message for Feedback'}
        hintInput={'Enter Text'}
        submitInput={inputText => {
          setInput(inputText), setVisible(false);
        }}
        closeDialog={() => setVisible(false)}></DialogInput>
      <Button title="Show" onPress={() => setVisible(true)} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 20,
    marginBottom: 20,
    backgroundColor: 'red',
    color: 'white',
    padding: 15,
    borderRadius: 30,
  },
});

export default App;
