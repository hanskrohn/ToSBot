require('dotenv').config();
const mongoose = require('mongoose');
const axios = require('axios');
const UnParsedData = require('./schema');
const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
     service: "Gmail",
     auth: {
         user: process.env.EMAIL_USERNAME,
         pass: process.env.EMAIL_PASSWORD,
     },
});

mongoose.connect(process.env.MONGO_ATLAS, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false
}).then(() => {
    console.log('Successfully connected to mongo.');
    console.log('Time to fetch the data.');
    main();
})
.catch((err) => {
    console.log('Error connecting to mongo.', err);
});

const ALL_SERVICES_SLUGS = [];
const TWO_MIN = 2 * 60 * 1000;
let amountOfDataAdded = 0;

async function main(){
    try{
        const res = await axios.get('https://api.tosdr.org/all-services/v1/');
        const { data } = res;
        const arr = data?.parameters?.services;

        arr.forEach(service => {
            if(service.slug){
                ALL_SERVICES_SLUGS.push(service.slug);
            }
        });

        const generator = getAllDataGenerator();
        getTheData(generator)

    } catch (e){
        console.log(e);
    }
}

async function* getAllDataGenerator(){
    let i = 373;

    while(i< ALL_SERVICES_SLUGS.length){
        try{
            const res = await axios.get(`https://api.tosdr.org/v1/service/${ALL_SERVICES_SLUGS[i]}.json`);
            const { data } = res;
    
            if(data.points.length === 0){
                throw new Error('Has no data ¯\\_(ツ)_/¯');
            }
            
            const newDataSet = new UnParsedData(data)
            await newDataSet.save();
            amountOfDataAdded++;
        } catch (e){
            
        }
        yield i;
        i++;

        if(i%100 === 0){
            console.log(i);
        }
    }
}
async function getTheData(generator){
    try{
        if(!(await generator.next()).done){
            setTimeout(async () => {
                getTheData(generator)
            }, TWO_MIN);
        }else{
            console.log('Emailing');
            transporter.sendMail({
                to: process.env.ME,
                subject: 'I am done',
                html: `<p>I was able to add ${amountOfDataAdded} data sets</p>`
            })
        }

    } catch (e) {
        console.log('I mean there is no way', e)
    }
    
}


