// A general function that adds two numbers
import fs from 'fs';
import readfile from './csvparser';


 let addNumbers=(a: string, b: string): string => {
    readfile('MOCK_DATA.csv')
    return a + b;

}

export default addNumbers;