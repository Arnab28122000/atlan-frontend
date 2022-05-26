import { Column, Row, Container } from "../ui/utils";
import { PlayIcon, PauseIcon, PlusIcon, MinusIcon,  } from '@radix-ui/react-icons'
import DeleteIcon from '@mui/icons-material/Delete';
import styled from "styled-components";

import "./editor.css";
import { useState, useContext } from "react";
import { RootContext } from "../../context/root";
import Table from "./table";

export default function Editor(props) {

    const [isQueryRunning, setIsQueryRunning] = useState(false);

    const [height, setHeight] = useState('120px');
    const [isQueryValid, setQueryValid] = useState(false);

    const toggleQueryRunning = (running) => {
        if(running){
            setIsQueryRunning(false);
        }else if(!running){
            setIsQueryRunning(true);
            setTimeout(() => {
                setIsQueryRunning(false);
            } , 1700);
            
        }
    }

    const rootContext = useContext(RootContext);

    const initialValues = {
        query: "",
      };
      
      const [formValues, setFormValues] = useState(initialValues);
      const [formErrors, setFormErrors] = useState({});
      const handleChange = (e) => {
        const { name, value } = e.target;
        setFormValues({ ...formValues, [name]: value });
      };

      const validate = (values) => {
        const errors = {};
       
        if (!values.query) {
          errors.query = "Please enter a query!/ Try using 'select * from customers;' OR 'select * from employee;'";
          setQueryValid(false);
          setHeight('120px')
        }else if(!rootContext.isValidQuery(values.query) && values.query.charAt(values.query.length - 1) !== ';' ){
            errors.query = "Invalid query/ Missing a semi color ';' Try using 'select * from customers;' OR 'select * from employee;'";
            setQueryValid(false);
            setHeight('120px')
        }
        else if(!rootContext.isValidQuery(values.query)){
            errors.query = "Invalid query/ Try using 'select * from customers;' OR 'select * from employee;'";
            setQueryValid(false);
            setHeight('120px')
        }else if(rootContext.isValidQuery(values.query)){
            rootContext.updateEditorList(props.id, values.query);
            setQueryValid(true);
            setHeight('400px')
        }
    
        return errors;
      };
      const handleSubmit = (e) => {
        e.preventDefault();
        toggleQueryRunning(false);
        setFormErrors(validate(formValues));
        
      };

  return (
    <Column
      backgroundColor="rgba(0,0,0,0.7)"
      width="90vw"
      borderRadius="10px"
      marginTop="30px"
      height={height}
      style={{
          transition: "height 0.3s",
          WebkitTransition: "height 0.3s",
      }}
    >
      <Row justify='space-between'>
      <form onSubmit={handleSubmit}>
          <Row>
          
        <Container
        onClick={handleSubmit}
        cursor='pointer' 
          height="60px"
          width="60px"
          marginTop="20px"
          marginLeft='20px'
          borderRadius="10px"
          backgroundColor="rgba(255,255,255,0.9)"
        >
          {isQueryRunning ?
           <QueryRunningButton />
           : null}
           {!isQueryRunning ?
              <PlayIcon
              onClick={()=> toggleQueryRunning(false) }
              style={{
                marginTop: '15px',
                marginLeft: '15px',
                    position: "absolute",
                    zIndex: 2
                }} color="#000" height="30px" width="30px"
              />:
              null
           }
        </Container>
        <Column>
               <Input
            type="text"
            name="query"
            value={formValues.name}
            placeholder=" Enter SQL Query"
            onChange={handleChange}
          />
          <ErrorMessage>{formErrors.query}</ErrorMessage>
          </Column>
          </Row>
          </form>
          {
                     isQueryValid && height === '120px' ?
                     <PlusIcon
                     onClick={()=> setHeight('400px')}
                     style={{
                        color: "#fff",
                        height: "30px",
                        width: "30px",
                        marginRight: "25px",
                        marginTop: "35px",
                    }}
                     /> :
                     isQueryValid && height === '400px' ?
                     <MinusIcon
                     onClick={()=> setHeight('120px')}
                     style={{
                        color: "#fff",
                        height: "30px",
                        width: "30px",
                        marginRight: "25px",
                        marginTop: "35px",
                    }}
                     />:
                     null
               }
           <div
           style={{
               cursor: 'pointer',
           }}
           onClick={()=> rootContext.removeEditor(props.id)}
           >
               
           <DeleteIcon 
           
           style={{
               color: "#fff",
               height: "30px",
               width: "30px",
               marginRight: "25px",
               marginTop: "35px",
           }}
           />
           </div>
      </Row>
      <Table data={props.data}/>
    </Column>
  );
}

function QueryRunningButton(props) {
    return (
        <div>
        <div className="spinner-container">
            <div className="loading-spinner">
           
            </div>
          </div>
          <PauseIcon 
            style={{
                marginTop: '15px',
                marginLeft: '15px',
                    position: "absolute",
                    zIndex: 2
                }} color="#000" height="30px" width="30px" />
          
        </div>
    )
}

const Input = styled.input`
  height: 58px;
  margin-top: 20px;
  margin-left: 20px;
  margin-right: 0px;
  margin-bottom: 0px;
  width:  72vw;
  border: none;
  outline: none;
  padding: 0px;
  border-radius: 5px;
  font-size: 25px;
  background-color: rgba(255,255,255,0.95);
  color: rgba(0, 0, 0, 0.7);

  &::placeholder {
    color: rgba(0,0,0,1);
    font-size: 20px;
  }
`;

const ErrorMessage = styled.p`
  color: rgba(253,94,83,1);
  font-weight: 600;
  font-size: 17px;
  margin-left: 20px;
  margin-top: 7px;
`;


 