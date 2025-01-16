import fs from 'fs';
import csvParser from 'csv-parser';
import { IDetails,Detail}  from '../models/details';


// Array to store the parsed data
const results: IDetails[] = [];

async function readfile(filename:string) {// Read and parse the CSV file
fs.createReadStream(filename)
  .pipe(csvParser())
  .on('data', async (data: IDetails) => {
    results.push(data);
    const  first_name=data.first_name;
    const id=data.id;
    const last_name=data.last_name
    const email=data.email;
    const ip_address=data.ip_address;
    const detail = new Detail({ id,first_name,last_name,email,ip_address });
    await detail.save();


  })
  .on('end', () => {
    console.log('CSV file successfully processed.');
    console.log(results);
  })
  .on('error', (error) => {
    console.error('Error reading the CSV file:', error);
  });
}

export default readfile;
