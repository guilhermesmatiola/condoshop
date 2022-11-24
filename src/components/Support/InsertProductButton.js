import styled from 'styled-components';

const InsertButton = styled.button`
  height: 40px;
  width: 100%;
  background-color: ${props =>
    typeof props.active !== 'boolean' || props.active ? "#FFFFFF" : '#FFFFFF'};
  color: #38b6ff;
  font-weight: bold;
  font-size: medium;
  font-family: 'Lexend Deca', sans-serif;
  padding: 14px;
  ${props => !props.noMargin && 'margin-bottom: 10px;'}
  border-radius: 8px;
  border: none;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
`;

export default InsertButton;
