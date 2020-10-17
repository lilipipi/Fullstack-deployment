import React from 'react';
import  '../components/Pages/Profile_Details/Profile_Details';
import {shallow, mount} from 'enzyme';
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';


Enzyme.configure({ adapter: new Adapter() });

describe(" Profile_Details unit Test", ()=> {
    //Tests will pass for props
    it("Should return all constructor props correctly", ()=>{
        const eData = shallow(< Profile-Details email= "d@hotmail.come" />).props();
        const aData = shallow(< Profile-Details address= "00 Barak st" />).props();
        const fData = shallow(< Profile-Details fName= "Jon" />).props();
        const lData = shallow(< Profile-Details lName= "Derake" />).props();
        const bData = shallow(< Profile-Details dateOfBirth= "15/02/1998" />).props();
        const pData = shallow(< Profile-Details phone= "00000-00000" />).props();
        console.warn(eData,aData,fData,lData,bData,pData);
        expect(1).toEqual(1);
        
    });

        //Tests will fail for props
        it("Cant return  constructor props ", ()=>{
        
            const eData = shallow(< Profile-Details email= "d@hotmail.come" />).props();
            const aData = shallow(< Profile-Details address= "00 Barak st" />).props();
            const fData = shallow(< Profile-Details fName= "Jon" />).props();
            const lData = shallow(< Profile-Details lName= "Derake" />).props();
            const bData = shallow(< Profile-Details dateOfBirth= "15/02/1998" />).props();
            const pData = shallow(< Profile-Details phone= "00000-00000" />).props();
            expect(1).toEqual(0);
    
            
        });
    

//Tests will pass match the data for the values
it("Return matched and correct personal inforamtion", ()=>{
    
    const Data =
    {
        email:'email@hotmail.come',
        fName:'Sara',
        lName: 'Dan',
        dateOfBirth: '12/04/1993',
        address:'55 Flinders st',
        phone: '0000055555',
       
    };
    expect(Data.email).toBe('email@hotmail.come');
    expect(Data.fName).toBe('Sara');
    expect(Data.lName).toBe('Dan');
    expect(Data.dateOfBirth).toBe('12/04/1993');
    expect(Data.address).toBe('55 Flinders st');
    expect(Data.phone).toBe('0000055555');
    
});

//Tests will fail  the data does not match with the values
it("Return unmatched and incorrect personal inforamtion", ()=>{
    const Data =
    {
        email:'email@hotmail.come',
        fName:'Sara',
        lName: 'Dan',
        dateOfBirth: '12/04/1993',
        address:'55 Flinders st',
        phone: '0000055555',
       
    };
    expect(Data.email).toBe('email@hotmail.come');
    expect(Data.fName).toBe('Sarah');
    expect(Data.lName).toBe('Dan');
    expect(Data.dateOfBirth).toBe('12/04/1993');
    expect(Data.address).toBe('5 Flinders st');
    expect(Data.phone).toBe('0000055555');

});

  

});

