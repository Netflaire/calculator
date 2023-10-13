import React, { useState } from 'react' ;
import { StyleSheet, Text, View, TouchableOpacity, Alert, ScrollView }from 'react-native' ;
import { StatusBar } from 'expo-status-bar';
	export default function App() {
	// State variables
		const [displayValue, setDisplayValue] = useState( '' );
		const [displayAns, setDisplayAns] = useState( '' );
		const [operator, setOperator] = useState( null);
		const [firstValue, setFirstValue] = useState( '' );
		const MAX_DISPLAY_LENGTH = 13; // Adjust the maximum length as needed
		const FIRST_VALUE_MIN = 6;
		const DISPLAY_VALUE_MAX = 8
		const FIRST_VALUE_MIDDLE= 9

		
		// Function to handle number inputs
		const handleNumberInput = (num) => {
			if (displayValue.length < MAX_DISPLAY_LENGTH) {
				if (displayValue === '' ) {
					setDisplayValue(num.toString());
				} else {
					setDisplayValue(displayValue + num.toString());
				}
			}
		
		};



		// Function to handle operator inputs
		const handleOperatorInput = (newOperator) => {
			if (displayValue.length < MAX_DISPLAY_LENGTH) {
			  if (displayValue !== '') {
			    if (operator) {
			      // If an operator is already set, calculate the result and update firstValue
			      const num1 = parseFloat(firstValue);
			      const num2 = parseFloat(displayValue);
			      const result = calculateResult(num1, num2, operator);
			      setFirstValue(result);
			      setDisplayValue('');
			    } else {
				setFirstValue(displayValue);
				setDisplayValue('');
			    }
			    setOperator(newOperator);
			  }
			}
		      };
		      
		      // Function to calculate the result
		      const calculateResult = (num1, num2, currentOperator) => {
			switch (currentOperator) {
			  case '+':
			    return (num1 + num2).toString();
			  case '-':
			    return (num1 - num2).toString();
			  case 'x':
			    return (num1 * num2).toString();
			  case '/':
			    return (num1 / num2).toString();
			  default:
			    return '';
			}
		      };

		// Function to calculate the font size for displayValue and firstValue
		const calculateFontSize = (text) => {
			const textLength = text.length;
	
			if (textLength > DISPLAY_VALUE_MAX && textLength <= FIRST_VALUE_MIN) {
				return 50; // Set your desired font size for this range
			} else if (textLength >= FIRST_VALUE_MIDDLE) {
				return Math.min((textLength / FIRST_VALUE_MIN), 0.80) * 50; // Adjust the factor as needed
			} else {
				return 70; // Default font size if none of the conditions match
			}
		};
		const calcSize = () => {
			const displayLength = displayAns.length;
			
			if (displayLength <= 5) {
				return 40; // Set your desired font size for shorter strings
			}
			else if(displayLength <= 9  && displayLength >= 5){
				// Calculate a font size based on the length of the string
				return 40; // Adjust the divisor as needed for your design
			}
			else if(displayLength <= 13  && displayLength >= 9){
			  // Calculate a font size based on the length of the string
			  return 40; // Adjust the divisor as needed for your design
			}else{
				return 30
			}
		      };

		// Function to handle equal button press
		const handleEqual = () => {
			const num1 = parseFloat(firstValue);
			const num2 = parseFloat(displayValue);
			
			if (displayValue.length < MAX_DISPLAY_LENGTH) {
				if(displayValue == ""){
					return null,
					setDisplayAns("Enter number")
				}else{
					if (operator === '+' ) {
					setDisplayAns((num1 + num2).toString());
				} else if (operator === '-' ) {
					setDisplayAns((num1 - num2).toString());
				} else if (operator === 'x') {
					setDisplayAns((num1 * num2).toString());
				} else if (operator === '/' ) {
					setDisplayAns((num1 / num2).toString());
				}
				setOperator( null);
				setFirstValue( '' );
				setDisplayValue('')
				}
				
			}
		};

		const handleDecimalPoint = () => {
			if (!displayValue.includes('.')) {
				setDisplayValue(`${displayValue}.`);
				} 
		}

		// Function to handle clear button press
		const handleClear = () => {
			setDisplayValue('' );
			setDisplayAns('' );
			setOperator( null);
			setFirstValue( '' );
		};
		const del = () =>{
			setDisplayValue(displayValue.slice(0,-1))
			
		}

			return (
			<View style={styles.container}>
				<View style={styles.displayContainer}>
					<Text style={[styles.displayText, {fontSize: calculateFontSize(displayValue)}]}>
					{/* {operator ? firstValue + ' ' + operator + ' ' + displayValue : displayValue} */}

					{firstValue}{' '}
						<Text style={styles.operatorStyle}>{operator}</Text>{' '}
					{displayValue}
					</Text>

					<Text style={[styles.displayText, {fontSize: calcSize(), fontWeight: "normal", color:"#92ffde"}]}>
						{displayAns}
					</Text>
				</View>

				<View style={styles.buttonContainer}>

					<View style={[styles.row]}>
						<TouchableOpacity style={[styles.button,styles.button2]} onPress={handleClear}>
							<Text style={styles.clearButtonText}>AC</Text>
						</TouchableOpacity>


						<TouchableOpacity style={[styles.button, styles.operatorButton]} onPress={() => handleOperatorInput( '/' )}>
							<Text style={[styles.buttonText,styles.operatorButtonText]}>÷</Text>
						</TouchableOpacity>

						<TouchableOpacity onLongPress={() => handleClear()} style={[styles.button,styles.button2, {width: 159, borderRadius: 19}]} onPress={()=> del() }>
							<Text style={[styles.operatorButtonText, {fontSize: 30, color: "#fff"}]}>del</Text>
						</TouchableOpacity>

					</View>
					<View style={styles.row}>

					<TouchableOpacity style={[styles.button]} onPress={() => handleNumberInput(7)}>
							<Text style={styles.buttonText}>7</Text>
						</TouchableOpacity>

						<TouchableOpacity style={[styles.button]} onPress={() => handleNumberInput(8)}>
							<Text style={styles.buttonText}>8</Text>
						</TouchableOpacity>

						<TouchableOpacity style={[styles.button]} onPress={() => handleNumberInput(9)}>
							<Text style={styles.buttonText}>9</Text>
						</TouchableOpacity>

						<TouchableOpacity style={[styles.button,styles.operatorButton]} onPress={() => handleOperatorInput( 'x')}>
							<Text style={[styles.buttonText,styles.operatorButtonText]}>×</Text>
						</TouchableOpacity>

					

					</View>
					
					<View style={styles.row}>

						<TouchableOpacity style={[styles.button]} onPress={() => handleNumberInput(4)}>
							<Text style={styles.buttonText}>4</Text>
						</TouchableOpacity>

						<TouchableOpacity style={[styles.button]} onPress={() => handleNumberInput(5)}>
							<Text style={styles.buttonText}>5</Text>
						</TouchableOpacity>

						<TouchableOpacity style={[styles.button]} onPress={() => handleNumberInput(6)}>
							<Text style={styles.buttonText}>6</Text>
						</TouchableOpacity>

						<TouchableOpacity style={[styles.button, styles.operatorButton]} onPress={() => handleOperatorInput( '-' )}>
							<Text style={[styles.buttonText,styles.operatorButtonText]}>−</Text>
						</TouchableOpacity>

						


						

					</View>

					<View style={[styles.row]}>
									<TouchableOpacity style={[styles.button]} onPress={() => handleNumberInput(1)}>
										<Text style={styles.buttonText}>1</Text>
									</TouchableOpacity>

									<TouchableOpacity style={[styles.button]} onPress={() => handleNumberInput(2)}>
										<Text style={styles.buttonText}>2</Text>
									</TouchableOpacity>

									<TouchableOpacity style={[styles.button]} onPress={() => handleNumberInput(3)}>
										<Text style={styles.buttonText}>3</Text>
									</TouchableOpacity>

									<TouchableOpacity style={[styles.button, styles.operatorButton]} onPress={() => handleOperatorInput( '+' )}>
										<Text style={[styles.buttonText,styles.operatorButtonText]}>+</Text>
									</TouchableOpacity>


					</View>

					<View style={[styles.row]}>
							<TouchableOpacity style={[styles.button, styles.zeroButton, {width: 159, borderRadius: 19}]} onPress={() => handleNumberInput(0)}>
								<Text style={[styles.buttonText,styles.zeroButtonText]}>0</Text>
							</TouchableOpacity>

									
							<TouchableOpacity style={[styles.button]} onPress={handleDecimalPoint}>
								<Text style={[styles.operatorButtonText, {fontSize: 30}]}>.</Text>
							</TouchableOpacity>


							<TouchableOpacity style={[styles.button, styles.operatorButton]} onPress={handleEqual} >
								<Text style={styles.equalButtonText}>=</Text>
							</TouchableOpacity>
						</View>
					
			</View>
			<StatusBar backgroundColor='#0e0e0e'/>
		</View>
		);
}
	// Styles
	const styles = StyleSheet.create({
		container: {
			flex: 1,
			backgroundColor: '#0e0e0e' ,
			alignItems: 'center' ,
			justifyContent: 'center' ,
		},
		displayContainer: {
			flex: 2,
			justifyContent: "flex-end" ,
			alignItems: "flex-end",
			padding: 20,
			margin: 10,
			width: 400 ,
			backgroundColor: "#0e0e0e",
		},
		displayText: {
			// fontSize: 90,
			color: '#fff' ,
			fontWeight: "100",
			
		},
		buttonContainer: {
			flex: 3,
			width: '93%' ,
			marginBottom: -30
		},
		row: {
			flexDirection: 'row' ,
			justifyContent: 'space-between' ,
			marginBottom: 10,
		},
		button: {
			borderRadius: 50,
			alignItems: 'center' ,
			// justifyContent: 'space-between' ,
			backgroundColor: '#4e4e4eab' ,
			margin: 4,
			height:70,
			width:70,
			padding: 15,
		},
		button2: {
			backgroundColor: "#25ecb1",
			opacity: 0.9
		},
			buttonText: {
			fontSize: 34,
			color: '#ffffff' ,
		},
		zeroButton: {
			// flex: 2,
			// paddingLeft: 35,
			// paddingRight: 35,
			textAlign: "center",
			justifyContent: "center",
			width: 70
		},
		zeroButtonText: {
			// marginLeft: 10,
			fontSize: 35,
		},
		operatorButton: {
			backgroundColor: '#e9e6e1' ,

		},
		operatorButtonText: {
			color: '#09a84c' ,
		},
		equalButton: {
			flex: 1,
			borderRadius: 50,
			alignItems: 'center' ,
			justifyContent: 'center' ,
			backgroundColor: '#07c455' ,
			elevation: 3,
		},
		backspaceButton: {
			backgroundColor: "#f5aa08"
		},
		equalButtonText: {
			fontSize: 32,
			color: '#09a84c' ,
		},
		clearButtonText: {
			fontSize: 24,
			color: '#fff' ,
		},
		operatorStyle: {
			color: "#92ffde"
		}
	});

