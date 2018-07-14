import React from 'react';
import {hot} from 'react-hot-loader';
import {Route, Switch, Link} from 'react-router-dom';

import {SingUpForm, NewCompanyForm, SignInForm, SignUpCompleteForm} from './Forms';

import {normalize, schema, denormalize} from 'normalizr';

const FormPart = ({store}) => {
    const attempt = () => {
        /* let data = [{
             id: 1,
             drivers: [{"id": 1, name: 'John'}, {"id": 2, name: 'Nik'}]
         }, {
             id: 2,
             drivers: [{"id": 1, name: 'John'}]
         }
         ];
         console.log(data);

         let drivers = new schema.Entity('drivers');
         let cars = new schema.Entity('cars', {
             drivers: [drivers]
         });


         const normalizedDataCars = normalize(data, [cars]);
         console.log(normalizedDataCars);*/


        //const denormalisedData = denormalize({color: [2]}, cars, normalizedDataCars.entities);
        //console.log('DEnorm = ', denormalisedData);

   /*     ////////
        const myData = {users: [{id: 1, name: "nik"}, {id: 2, name: "ron"}]};
        const user = new schema.Entity('users');
        const mySchema = new schema.Entity('store', {
            users: [user]
        });
        const normalizedData = normalize(myData, {users: [user]});
        console.log(normalizedData);

        //const entities = {users: {'1': {id: 1, name: "bolik"}, '2': {id: 2, name: "lolik"}}};
        const denormalizedData = denormalize({users: 1}, {users: [user]}, normalizedData.entities);
        console.log(denormalizedData);*/
    };

    return (
        <div>
            {attempt()}
            <NewCompanyForm/>
            <button onClick={()=>{console.log(store.getState())}}>logStore</button>
        </div>
    );
};

export default hot(module)(FormPart);
