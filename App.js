import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, Alert } from 'react-native';
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

    // بررسی ورودی‌ها برای BMI
    if (isNaN(weightInKg) || weightInKg <= 0) {
      setBmi('وزن نامعتبر است');
      return;
    }

    if (isNaN(heightInM) || heightInM <= 0) {
      setBmi('قد نامعتبر است');
      return;
    }

    const bmiValue = (weightInKg / (heightInM * heightInM)).toFixed(2);
    setBmi(bmiValue);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>ماشین حساب پیشرفته</Text>
      
      {/* بخش ماشین حساب */}
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

      {/* بخش محاسبه BMI */}
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

      {/* تاریخچه محاسبات */}
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
    backgroundColor: '#e1f5fe',
  },
  title: {
    fontSize: hp('3%'),
    fontWeight: 'bold',
    color: '#1565c0',
    marginBottom: 20,
  },
  calculator: {
    backgroundColor: '#fff',
    borderRadius: 15,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 5,
  },
  display: {
    backgroundColor: '#1565c0',
    borderRadius: 10,
    padding: 15,
    marginBottom: 10,
  },
  input: {
    color: '#fff',
    fontSize: hp('3.5%'),
    textAlign: 'right',
  },
  result: {
    color: '#fff',
    fontSize: hp('3%'),
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
    backgroundColor: '#0288d1',
    borderRadius: 10,
    margin: 5,
  },
  buttonText: {
    fontSize: hp('3%'),
    color: '#fff',
  },
  bmiCalculator: {
    marginTop: 20,
    backgroundColor: '#fff',
    borderRadius: 15,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 5,
  },
  bmiTitle: {
    fontSize: hp('2.5%'),
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  bmiInput: {
    backgroundColor: '#e1f5fe',
    borderRadius: 10,
    padding: 10,
    marginBottom: 10,
  },
  bmiButton: {
    backgroundColor: '#1565c0',
    borderRadius: 10,
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
    borderRadius: 15,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 5,
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
    borderRadius: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 5,
  },
  developerText: {
    fontSize: hp('2%'),
    color: '#333',
    marginLeft: 10,
  },
});

export default App;
