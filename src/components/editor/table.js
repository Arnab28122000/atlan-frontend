import { Text, Row, Container } from "../ui/utils";
import styled from "styled-components";

const uid = () => {
    return Date.now().toString(36) + Math.random().toString(36);
}

export default function Table(props) {



  const getKeys = (data) => {
    return Object.keys(data);
  };

  const renderData = (data, position) => {
    var keys = getKeys(data);
    return keys.map((key, index) => {
      if (index === 0) {
        return (
          <Container width="250px" height="40px" key={uid()}>
            <Text
              textAlign="start"
              color="#fff"
              fontSize="15px"
              marginLeft='30px'
            >
              {position}
            </Text>
          </Container>
        );
      }
      let childKey = getKeys(data[key]);
      let isInstance = data[key] instanceof String;
      if (typeof data[key] === "string" || data[key] instanceof String) {
        return (
          <Container width="250px" height="40px" key={uid()}>
            <Text color="#fff" fontSize="15px" >
              {data[key].toString().substring(0, 20)}
            </Text>
          </Container>
        );
      }else if(typeof data[key] !== "string" || isInstance) {
          let val = "";
        childKey.forEach((item) => {
            val += data[key][item] + " ";
        })
        return (
            <Container width="250px" height="40px" key={uid()}>
            <Text color="#fff" fontSize="15px" >
              {val.toString().substring(0, 20)}
            </Text>
          </Container>
        )
      }
    });
  };

  return (
    <VerticalScrollContainer
      style={{
        height: "300px",
      }}
    >
      {props.data.length > 0
        ? props.data.map((data, index) => {
            let headingKeys= [];

            if(index===0){
                headingKeys = getKeys(props.data[0]);
            }

            return (
              <>
                {index === 0 ? (
                    <Row>
                 {headingKeys.map((key, index) =>{
                     return (
                        <Container 
                        key={uid()}
                         width="250px" height="40px">
                        <Text textAlign='start' color="#fff" fontSize="17px"  fontWeight="bold">
                          {key.toUpperCase()}
                        </Text>
                      </Container>
                     )
                 })}
                 </Row>
                ) : null}
                <Row key={uid()}>{renderData(data, index)}</Row>
              </>
            );
          })
        : null}
    </VerticalScrollContainer>
  );
}

const VerticalScrollContainer = styled.div`
  display: flex;
  flex-direction: column;
  overflow-y: scroll;
  overflow-x: hidden;
  white-space: nowrap;
  -webkit-overflow-scrolling: touch;

  margin-top: 20px;
  margin-left: 30px;

  &::-webkit-scrollbar {
    width: 7px;
  }

  &::-webkit-scrollbar-thumb {
    background-color: rgba(0, 0, 0, 0.7);
    border-radius: 10px;
  }

  &::-webkit-scrollbar-thumb:hover {
    background-color: rgba(0, 0, 0, 0.9);
    border-radius: 10px;
  }

  &::-webkit-scrollbar-track {
    background-color: rgba(255, 255, 255, 1);
    border-radius: 10px;
  }

  &::-webkit-scrollbar-track:hover {
    background-color: rgba(255, 255, 255, 0.8);
    border-radius: 10px;
  }
`;
