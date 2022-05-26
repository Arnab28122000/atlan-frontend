import { Column, Row, Text } from "./ui/utils";

import { PlusIcon } from '@radix-ui/react-icons'
import Editor from "./editor/editor";
import { useContext, useState, useEffect } from "react";
import { RootContext } from "../context/root";

export default function Home(){

    const [offsetY, setOffsetY] = useState(0);
  const handleScroll = () => {
      setOffsetY(window.scrollY);};


  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

    const rootContext = useContext(RootContext);

    return (
        <Column height='100%' align="center">
        <Row style={{
             position: 'sticky',
             top: 0,
             zIndex: 10,
        }} 
        paddingBottom='30px'
        backgroundColor={offsetY > 30 ? "#000000" : ''}
        justify='space-between' align='center' maxWidth='100vw' width='100%'>
          <Text fontSize="40px" color='#fff' fontWeight="bold" paddingTop='30px' marginLeft='100px'>SQL Notebook</Text>
          <Row>
            <Button name="Add" />
          </Row>
        </Row>
        {
            rootContext.editorList.map((editor, index) => {
                return (
                    <Editor key={editor.id} id={editor.id} data={editor.data}/>
                )
            })
        }
        </Column>
    );
}

function Button(props){
    const rootContext = useContext(RootContext);
    return (
        <Row  
        onClick={()=> rootContext.addEditor()}
        style={{
            boxShadow: '0px 0px 10px rgba(255,255,255)',
            cursor: 'pointer',
        }}
        marginRight='100px' marginTop='20px' align='center' backgroundColor="rgba(255,255,255, 0.4)" height='35px' padding='5px 10px' borderRadius='5px'>
            <Text fontWeight="bold" marginRight='5px' fontSize="20px" color='rgba(255,255,255, 0.8)'>{props.name}</Text>
            <PlusIcon color="#fff" height='25px' width="25px"/>
        </Row>
    )
}