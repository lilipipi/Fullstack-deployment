import React, {Component} from "react";
import {Button} from "react-bootstrap";
import './EmployeesPage.css';

class CreateAddEmployeeButton extends Component
{
    
        render(){
               return (   
                  <>
                    <Button
                        id="btnEmpAdd" type="Button" value="Add"
                        style={{ 
                           position: 'fixed',
                           top: '15%',
                           right: '5%'
                        }}  
                        className="btnSend"
                        href="/AddEmployee">
                       Add Employee
                    </Button>
                 </>
                 
               );
               
           }
}

         
      export default CreateAddEmployeeButton;
        