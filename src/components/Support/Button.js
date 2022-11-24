import styled from 'styled-components';

const Button = styled.button`
  height: 40px;
  width: 100%;
  background-color: ${props =>
    typeof props.active !== 'boolean' || props.active ? '#38b6ff' : '#1234'};
  color: #ffffff;
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

export default Button;
