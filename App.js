import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

const App = () => {
  const [input, setInput] = useState('');
  const [result, setResult] = useState('');
  const [weight, setWeight] = useState('');
  const [height, setHeight] = useState('');
  const [bmi, setBmi] = useState('');
  const [history, setHistory] = useState([]);

  const handleClick = (value) => {
    if (value === '=') {
      try {
        const calculationResult = eval(input).toString();
        setResult(calculationResult);
        setHistory([...history, `${input} = ${calculationResult}`]);
      } catch (error) {
        setResult('Error');
      }
    } else if (value === 'C') {
      setInput('');
      setResult('');
    } else if (value === '√') {
      setInput(`Math.sqrt(${input})`);
    } else if (value === '^') {
      setInput(`${input}**`);
    } else if (value === 'sin') {
      setInput(`Math.sin(${input})`);
    } else if (value === 'cos') {
      setInput(`Math.cos(${input})`);
    } else if (value === 'tan') {
      setInput(`Math.tan(${input})`);
    } else if (value === 'log') {
      setInput(`Math.log10(${input})`);
    } else {
      setInput(input + value);
    }
  };

  const calculateBMI = () => {
    const weightInKg = parseFloat(weight);
    const heightInM = parseFloat(height) / 100;
    if (weightInKg > 0 && heightInM > 0) {
      const bmiValue = (weightInKg / (heightInM * heightInM)).toFixed(2);
      setBmi(bmiValue);
    } else {
      setBmi('Invalid input');
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>ماشین حساب پیشرفته</Text>
      <View style={styles.calculator}>
        <View style={styles.display}>
          <TextInput
            style={styles.input}
            value={input}
            editable={false}
            placeholder="0"
          />
          <Text style={styles.result}>{result}</Text>
        </View>
        <View style={styles.buttons}>
          {[
            'C', '√', '^', '/',
            '7', '8', '9', '*',
            '4', '5', '6', '-',
            '1', '2', '3', '+',
            '0', '.', '=', 'sin',
            'cos', 'tan', 'log'
          ].map((item, index) => (
            <TouchableOpacity
              key={index}
              style={styles.button}
              onPress={() => handleClick(item)}
            >
              <Text style={styles.buttonText}>{item}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>
      <View style={styles.bmiCalculator}>
        <Text style={styles.bmiTitle}>محاسبه شاخص توده بدن (BMI)</Text>
        <TextInput
          style={styles.bmiInput}
          placeholder="وزن (کیلوگرم)"
          keyboardType="numeric"
          value={weight}
          onChangeText={setWeight}
        />
        <TextInput
          style={styles.bmiInput}
          placeholder="قد (سانتی‌متر)"
          keyboardType="numeric"
          value={height}
          onChangeText={setHeight}
        />
        <TouchableOpacity style={styles.bmiButton} onPress={calculateBMI}>
          <Text style={styles.bmiButtonText}>محاسبه BMI</Text>
        </TouchableOpacity>
        <Text style={styles.bmiResult}>نتیجه BMI: {bmi}</Text>
      </View>
      <View style={styles.history}>
        <Text style={styles.historyTitle}>تاریخچه محاسبات</Text>
        {history.map((item, index) => (
          <Text key={index} style={styles.historyItem}>{item}</Text>
        ))}
      </View>
      {/* نمایش نام توسعه‌دهنده */}
      <View style={styles.developerSection}>
        <Icon name="code" size={hp('2.5%')} color="#333" />
        <Text style={styles.developerText}>Developer: Ehsan Fazli</Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: '#f4f4f4',
  },
  title: {
    fontSize: hp('3%'),
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 20,
  },
  calculator: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  display: {
    backgroundColor: '#222',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  },
  input: {
    color: '#fff',
    fontSize: hp('3%'),
    textAlign: 'right',
  },
  result: {
    color: '#fff',
    fontSize: hp('2.5%'),
    textAlign: 'right',
  },
  buttons: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  button: {
    width: wp('22%'),
    height: hp('10%'),
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ddd',
    borderRadius: 5,
    margin: 5,
  },
  buttonText: {
    fontSize: hp('3%'),
    color: '#333',
  },
  bmiCalculator: {
    marginTop: 20,
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  bmiTitle: {
    fontSize: hp('2.5%'),
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  bmiInput: {
    backgroundColor: '#f4f4f4',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  },
  bmiButton: {
    backgroundColor: '#28a745',
    borderRadius: 5,
    padding: 15,
    alignItems: 'center',
  },
  bmiButtonText: {
    color: '#fff',
    fontSize: hp('2.5%'),
    fontWeight: 'bold',
  },
  bmiResult: {
    marginTop: 10,
    fontSize: hp('2.5%'),
    color: '#333',
    textAlign: 'center',
  },
  history: {
    marginTop: 20,
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  historyTitle: {
    fontSize: hp('2.5%'),
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  historyItem: {
    fontSize: hp('2%'),
    color: '#333',
    marginBottom: 5,
  },
  developerSection: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
    padding: 10,
    backgroundColor: '#fff',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  developerText: {
    fontSize: hp('2%'),
    color: '#333',
    marginLeft: 10,
  },
});

export default App;
