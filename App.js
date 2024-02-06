import { useState } from 'react';
import { View, Text, Image, TextInput, Pressable, FlatList, StyleSheet, Modal } from 'react-native';
import { StatusBar } from 'expo-status-bar';

const App = () => {
  const [counter, setCounter] = useState(0);
  const [inputValue, setInputValue] = useState('');
  const [itemList, setItemList] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedItemId, setSelectedItemId] = useState(null);

  const handleInputValue = (text) => setInputValue(text);
  const handleAddCounter = () => setCounter(counter + 1);

  const CarritoItem = ({ item, onRemoveItem }) => (
    <View style={styles.productItem}>
      <Text style={styles.productName}>{item.name}</Text>
      <Pressable onPress={() => {
        setSelectedItemId(item.id);
        setModalVisible(true);
      }} style={styles.removeButton}>
        <Text style={styles.removeButtonText}>Eliminar</Text>
      </Pressable>
    </View>
  );

  const handleRemoveItem = () => {
    setModalVisible(false);
    setItemList((prevItemList) => prevItemList.filter((item) => item.id !== selectedItemId));
  };

  const addItem = () => {
    const newItem = {
      name: inputValue,
      id: new Date().getTime(),
    };
    setItemList([...itemList, newItem]);
    setInputValue(''); 
  };

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <Modal
        animationType="slide"
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <Text>¿Deseas eliminar el Producto?</Text>
          <Pressable onPress={() => setModalVisible(false)} style={styles.modalButton}>
            <Text style={styles.modalButtonText}>Cancelar</Text>
          </Pressable>
          <Pressable onPress={handleRemoveItem} style={styles.modalButton}>
            <Text style={styles.modalButtonText}>Eliminar</Text>
          </Pressable>
        </View>
      </Modal>
      <View style={styles.header}>
        <Text style={styles.headerText}>CARRITO</Text>
        <Image
          style={styles.cartImage}
          source={{ uri: 'https://purepng.com/public/uploads/large/purepng.com-shopping-cartshoppingcarttrolleycarriagebuggysupermarkets-1421526532320cblq3.png' }}
        />
      </View>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder='Ingrese un Producto'
          value={inputValue}
          onChangeText={handleInputValue}
        />
        <Pressable onPress={addItem} style={styles.addButton}>
          <Text style={styles.addButtonText}>+</Text>
        </Pressable>
      </View>
      <FlatList
        data={itemList}
        renderItem={({ item }) => <CarritoItem item={item} />}
        keyExtractor={(item) => item.id.toString()}
      />
      <Pressable onPress={handleAddCounter}>
        <Text style={styles.counterText}>{counter}</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    marginTop: 40,
    backgroundColor: '#3498db',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 10,
  },
  headerText: {
    fontWeight: 'bold',
    fontSize: 20,
    color: 'white',
  },
  cartImage: {
    width: 50,
    height: 50,
    marginLeft: 30,
  },
  productItem: {
    marginTop:20,
    backgroundColor: '#a590de',
    borderWidth: 2,
    borderColor: '#3498db',
    borderRadius: 10,
    padding: 15,
    marginBottom: 10,
  },
  productName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2c3e50',
  },
  inputContainer: {
    
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 15,
    marginTop: 15,
  },
  input: {
  
    backgroundColor: 'white',
    borderColor: '#3498db',
    borderWidth: 2,
    paddingHorizontal: 15,
    borderRadius: 5,
    width: '70%',
    marginBottom: 10,
    paddingVertical: 8,
  },
  addButton: {
    backgroundColor: '#3498db',
    padding: 10,
    borderRadius: 5,
    marginLeft: 10,
  },
  addButtonText: {
  
    color: 'white',
    fontWeight: 'bold',
    fontSize: 30,
  },
  counterText: {
    fontSize: 20,
    margin: 20,
    fontWeight: 'bold',
  },
  removeButton: {
    backgroundColor: '#5019bf',
    padding: 8,
    borderRadius: 5,
    marginTop: 10,
    alignItems: 'center',
  },
  removeButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalButton: {
    backgroundColor: '#3498db',
    padding: 10,
    borderRadius: 5,
    marginVertical: 10,
  },
  modalButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default App;