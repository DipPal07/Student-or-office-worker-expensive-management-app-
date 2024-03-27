import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Modal,
  TextInput,
  Button,
  StyleSheet,
  Image,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import LottieView from 'lottie-react-native';
import DialogInput from 'react-native-dialog-input';

const PriceList = () => {
  const [data, setData] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedItem, setSelectedItem] = useState({});
  const [newValues, setNewValues] = useState({
    brackFirst_price: 0,
    Lunch_price: 0,
    dinner_price: 0,
    other_Price: 0,
  });
  const [savelogo, setSaveLogo] = useState(false);
  const [error, setError] = useState('');

  const saveDataToAsyncStorage = async data => {
    try {
      await AsyncStorage.setItem('priceListData', JSON.stringify(data));
    } catch (error) {
      console.error('Error saving data to AsyncStorage: ', error);
    }
  };
  const removeValue = async () => {
    try {
      await AsyncStorage.removeItem('priceListData');
    } catch (e) {
      // remove error
    }

    console.log('Done.');
  };

  const loadDataFromAsyncStorage = async () => {
    try {
      const storedData = await AsyncStorage.getItem('priceListData');
      if (storedData !== null) {
        setData(JSON.parse(storedData));
      }
    } catch (error) {
      console.error('Error loading data from AsyncStorage: ', error);
    }
  };

  useEffect(() => {
    // Load data from AsyncStorage on component mount
    // removeValue();
    loadDataFromAsyncStorage();
    getDatamoney();
    getDataday();
  }, []);

  const addNewPrice = () => {
    setNewValues({
      brackFirst_price: 0,
      Lunch_price: 0,
      dinner_price: 0,
      other_Price: 0,
    });
    setSelectedItem({});
    setError('');
    setModalVisible(true);

    // Save the updated data to AsyncStorage
    // saveDataToAsyncStorage(data);
  };

  const editPrice = item => {
    setNewValues(item);
    setSelectedItem(item);
    setError('');
    setModalVisible(true);

    // Save the updated data to AsyncStorage
    // saveDataToAsyncStorage(data);
  };
  const dipp = () => {
    console.log(data);
    saveDataToAsyncStorage(data);
    console.log(savelogo);

    storeDatamoney(input);
    storeDataDay(dayinput);
    setSaveLogo(false);
  };

  const savePrice = () => {
    if (isValid()) {
      setModalVisible(false);

      setData(prevData =>
        selectedItem.id
          ? prevData.map(item =>
              item.id === selectedItem.id ? {...item, ...newValues} : item,
            )
          : [
              ...prevData,
              {
                id: String(prevData.length + 1),
                date: String(
                  new Date().toLocaleDateString('en-in', {
                    weekday: 'long',
                    year: 'numeric',
                    month: 'short',
                    day: 'numeric',
                  }),
                ),
                ...newValues,
              },
            ],
      ),
        // Save the updated data to AsyncStorage

        console.log(data);
      setSaveLogo(true);
    }
  };

  const isValid = () => {
    for (const key in newValues) {
      if (key !== 'id' && key !== 'date' && !Number.isInteger(newValues[key])) {
        setError(`Invalid value for ${key}`);
        return false;
      }
    }
    setError('');
    return true;
  };

  // Total amount expance
  let Total = 0;
  data.forEach(item => {
    Total +=
      item.brackFirst_price +
      item.Lunch_price +
      item.dinner_price +
      item.other_Price;
  });

  // for day calculation
  let useDay = 0;
  data.forEach(() => {
    useDay += 1;
  });
  ///************************* */
  const [visible, setVisible] = React.useState(false);
  const [input, setInput] = React.useState('');
  console.log(input);
  //------------------
  const [dayvisible, setdayVisible] = React.useState(false);
  const [dayinput, setdayInput] = React.useState('');

  // informaiton
  let totalDay = dayinput,
    totalAmount = input;
  //

  const storeDatamoney = async value => {
    // console.log(value);
    try {
      await AsyncStorage.setItem('totalmoney', value);
    } catch (e) {
      // saving error
    }
  };
  //
  const getDatamoney = async () => {
    console.log('jjjj');
    try {
      const value = await AsyncStorage.getItem('totalmoney');
      setInput(value);
      if (value !== null) {
        // value previously stored
      }
    } catch (e) {
      // error reading value
      console.log(e);
    }
  };
  ///
  const storeDataDay = async value => {
    // console.log(value);
    try {
      await AsyncStorage.setItem('totalday', value);
    } catch (e) {
      // saving error
    }
  };
  //
  const getDataday = async () => {
    console.log('jjjj');
    try {
      const value = await AsyncStorage.getItem('totalday');
      setdayInput(value);
      if (value !== null) {
        // value previously stored
      }
    } catch (e) {
      // error reading value
      console.log(e);
    }
  };

  return (
    <View style={{flex: 1, backgroundColor: '#FBEAFF'}}>
      <View style={{backgroundColor: '#FBEAFF'}}>
        {/* <Image
            style={{
              width: 30,
              height: 30,
              alignSelf: 'flex-end',
              marginRight: 8,
            }}
            source={require('../Asset/save.png')}
          /> */}
        <TouchableOpacity onPress={() => dipp()}>
          {savelogo == false ? (
            <LottieView
              source={require('../Asset/ll.json')}
              autoPlay
              loop
              style={{
                width: 50,
                height: 50,
                alignSelf: 'flex-end',
                marginRight: 8,
              }}
            />
          ) : (
            <LottieView
              source={require('../Asset/1.json')}
              autoPlay
              loop
              style={{
                width: 50,
                height: 50,
                alignSelf: 'flex-end',
                marginRight: 8,
              }}
            />
          )}
        </TouchableOpacity>
      </View>

      <View style={styles.container}>
        <FlatList
          data={data.sort((a, b) => b.id - a.id)}
          keyExtractor={item => item.id}
          renderItem={({item}) => (
            <TouchableOpacity onPress={() => editPrice(item)}>
              <View
                style={{
                  margin: 5,
                  backgroundColor: 'white',
                  paddingLeft: 10,
                  paddingRight: 10,
                  paddingTop: 10,
                  paddingBottom: 10,
                  elevation: 10,
                  alignItems: 'center',
                  borderRadius: 10,
                }}>
                <View
                  style={{
                    padding: 5,
                    borderRadius: 10,
                    paddingBottom: 5,
                    backgroundColor: 'yellow',
                  }}>
                  <Text style={styles.itemcolor}>{item.date}</Text>
                </View>
                <View
                  style={{
                    flexDirection: 'row',
                    marginTop: 7,
                  }}>
                  <View
                    style={{
                      flexDirection: 'row',
                      flex: 1,
                      backgroundColor: '#f9e1ff',
                      padding: 5,
                      borderRadius: 10,
                    }}>
                    <View style={{flex: 1, alignItems: 'center'}}>
                      <Text style={styles.itemcolor}>Breakfast</Text>
                      <Text style={{color: 'black'}}>
                        {item.brackFirst_price}
                      </Text>
                    </View>
                    <View style={{flex: 1, alignItems: 'center'}}>
                      <Text style={styles.itemcolor}>Lunch</Text>
                      <Text style={{color: 'black'}}>{item.Lunch_price}</Text>
                    </View>
                    <View style={{flex: 1, alignItems: 'center'}}>
                      <Text style={styles.itemcolor}>Dinner</Text>
                      <Text style={{color: 'black'}}>{item.dinner_price}</Text>
                    </View>
                    <View style={{flex: 1, alignItems: 'center'}}>
                      <Text style={styles.itemcolor}>Other</Text>
                      <Text style={{color: 'black'}}>{item.other_Price}</Text>
                    </View>
                  </View>
                  <View
                    style={{
                      flex: 0.25,
                      alignItems: 'center',
                      backgroundColor:
                        item.brackFirst_price +
                          item.Lunch_price +
                          item.dinner_price +
                          item.other_Price <=
                        180
                          ? '#ADFEBB'
                          : '#FF8D8D',
                      marginLeft: 10,
                      borderRadius: 10,
                      paddingTop: 5,
                    }}>
                    <Text style={styles.itemcolor}>Total</Text>
                    <Text style={{color: 'black'}}>
                      {item.brackFirst_price +
                        item.Lunch_price +
                        item.dinner_price +
                        item.other_Price}
                    </Text>
                  </View>
                </View>
              </View>
            </TouchableOpacity>
          )}
        />
        <View
          style={{
            backgroundColor: '#FBEAFF',
            padding: 10,
            borderTopLeftRadius: 30,
          }}>
          <View style={{margin: 5}}>
            <View
              style={{
                flexDirection: 'row',
              }}>
              <View
                style={{
                  flex: 1,
                  backgroundColor: '#00C9A7',
                  marginRight: 5,
                  padding: 7,
                  borderRadius: 10,
                }}>
                <TouchableOpacity onPress={() => setVisible(true)}>
                  <Text style={styles.informationTextStyle}>
                    Total Money: {totalAmount}
                  </Text>
                  <Text style={styles.informationTextStyle}>
                    Remain Money: {totalAmount - Total}
                  </Text>
                  <Text style={styles.informationTextStyle}>
                    Total Expance: {Total}
                  </Text>
                </TouchableOpacity>
              </View>

              <DialogInput
                isDialogVisible={visible}
                title={'Enter Total Money'}
                hintInput={'Enter Text'}
                submitInput={inputText => {
                  setInput(inputText), setVisible(false), setSaveLogo(true);
                }}
                initValueTextInput={input}
                closeDialog={() => setVisible(false)}></DialogInput>
              <View
                style={{
                  flex: 1,
                  backgroundColor: '#FF6F91',
                  marginLeft: 5,
                  padding: 7,
                  borderRadius: 10,
                }}>
                <TouchableOpacity onPress={() => setdayVisible(true)}>
                  <Text style={styles.informationTextStyle}>
                    total Day : {totalDay}
                  </Text>
                  <Text style={styles.informationTextStyle}>
                    Remaining Day : {totalDay - useDay}
                  </Text>
                  <Text style={styles.informationTextStyle}>
                    Day : {useDay}{' '}
                  </Text>
                </TouchableOpacity>
              </View>
              <DialogInput
                isDialogVisible={dayvisible}
                title={'Enter Total Day'}
                hintInput={'Enter Text'}
                submitInput={inputText2 => {
                  setdayInput(inputText2),
                    setdayVisible(false),
                    setSaveLogo(true);
                }}
                initValueTextInput={dayinput}
                closeDialog={() => setdayVisible(false)}></DialogInput>
            </View>
            <View
              style={{
                backgroundColor: '#FFC75F',
                marginTop: 10,
                padding: 7,
                alignItems: 'center',
                borderTopLeftRadius: 13,
                borderBottomRightRadius: 13,
              }}>
              <Text style={styles.informationTextStyle}>
                Normal Per/Day expence : {totalAmount / totalDay}
              </Text>
              <Text style={styles.informationTextStyle}>
                Now Per/Day expence :{' '}
                {(totalAmount - Total) / (totalDay - useDay)}
              </Text>
            </View>
          </View>
          <View
            style={{
              marginTop: 5,
              alignItems: 'center',
            }}>
            <TouchableOpacity onPress={addNewPrice}>
              <View>
                {/* <Text
                  style={{
                    backgroundColor: 'black',
                    color: 'white',
                    paddingLeft: 40,
                    paddingRight: 40,
                    paddingTop: 12,
                    paddingBottom: 12,
                    borderRadius: 20,

                    fontSize: 15,
                    fontWeight: '800',
                  }}>
                  ADD NEW
                </Text> */}
                <LottieView
                  source={require('../Asset/2.json')}
                  autoPlay
                  loop
                  style={{
                    width: 80,
                    height: 80,
                    // marginTop: 10,
                  }}
                />
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </View>

      <Modal
        visible={modalVisible}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setModalVisible(false)}>
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
          }}>
          <View
            style={{
              backgroundColor: 'white',
              margin: 20,
              padding: 20,
              borderRadius: 20,
            }}>
            <Text style={{paddingLeft: 40, color: 'black'}}>Breakfast</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter Breakfast price"
              value={String(newValues.brackFirst_price)}
              keyboardType="numeric"
              onChangeText={text =>
                setNewValues({
                  ...newValues,
                  brackFirst_price: parseInt(text) || 0,
                })
              }
            />
            <Text style={{paddingLeft: 40, color: 'black'}}>Lunch</Text>

            <TextInput
              style={styles.input}
              placeholder="Enter Lunch price"
              value={String(newValues.Lunch_price)}
              keyboardType="numeric"
              onChangeText={text =>
                setNewValues({
                  ...newValues,
                  Lunch_price: parseInt(text) || 0,
                })
              }
            />
            <Text style={{paddingLeft: 40, color: 'black'}}>Dinner</Text>

            <TextInput
              style={styles.input}
              placeholder="Enter Dinner price"
              value={String(newValues.dinner_price)}
              keyboardType="numeric"
              onChangeText={text =>
                setNewValues({
                  ...newValues,
                  dinner_price: parseInt(text) || 0,
                })
              }
            />
            <Text style={{paddingLeft: 40, color: 'black'}}>Other</Text>

            <TextInput
              style={styles.input}
              placeholder="Enter Other price"
              value={String(newValues.other_Price)}
              keyboardType="numeric"
              onChangeText={text =>
                setNewValues({
                  ...newValues,
                  other_Price: parseInt(text) || 0,
                })
              }
            />
            {error ? <Text style={styles.error}>{error}</Text> : null}
            <View style={{alignItems: 'center'}}>
              <TouchableOpacity onPress={savePrice}>
                <View style={{}}>
                  <Text
                    style={{
                      backgroundColor: 'black',
                      color: 'white',
                      paddingLeft: 40,
                      paddingRight: 40,
                      paddingTop: 12,
                      paddingBottom: 12,
                      borderRadius: 20,
                      marginTop: 10,
                      fontSize: 17,
                      fontWeight: '800',
                    }}>
                    Save
                  </Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => setModalVisible(false)}>
                <View style={{}}>
                  <Text
                    style={{
                      backgroundColor: 'red',
                      color: 'white',
                      paddingLeft: 40,
                      paddingRight: 40,
                      paddingTop: 12,
                      paddingBottom: 12,
                      borderRadius: 20,
                      marginTop: 10,
                      fontSize: 17,
                      fontWeight: '800',
                    }}>
                    Cancel
                  </Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 0,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    backgroundColor: 'white',
  },
  item: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  buttonsContainer: {
    marginTop: 20,
    alignItems: 'center',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  input: {
    width: '80%',
    padding: 10,
    marginBottom: 10,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderRadius: 10,
    alignSelf: 'center',
    color: 'black',
  },
  error: {
    color: 'red',
    marginBottom: 10,
  },
  itemcolor: {
    fontWeight: '500',
    fontSize: 14.5,
    color: 'black',
  },
  informationTextStyle: {
    fontWeight: '500',
    fontSize: 15,
    color: 'black',
  },
});

export default PriceList;
