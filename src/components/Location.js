import { useContext } from 'react';
import styled from 'styled-components';

import { UserContext } from '../contexts/UserContext';

export default function Location() {
  const context = useContext(UserContext);
  const user = context.user.user;

  return (
    <Container>
      <Icon />
      Visualizando mercado de <span className="city">{user.city}</span>
    </Container>
  );
}

const Container = styled.div`
  border-top: 1px solid #e3e3e3;
  border-bottom: 1px solid #e3e3e3;
  height: 48px;
  display: flex;
  align-items: center;
  font-size: 12px;
  color: #000000;
  padding: 0 10px;

  svg {
    margin-right: 7px;
  }

  .city {
    margin-left: 3.2px;
    color: #ff441f;
  }
`;

const Icon = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 16 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M8 1.5C5.51562 1.5 3.5 3.41844 3.5 5.78125C3.5 8.5 6.5 12.8084 7.60156 14.2966C7.64729 14.3594 7.70722 14.4105 7.77646 14.4457C7.84571 14.481 7.9223 14.4994 8 14.4994C8.0777 14.4994 8.15429 14.481 8.22354 14.4457C8.29278 14.4105 8.35271 14.3594 8.39844 14.2966C9.5 12.8091 12.5 8.50219 12.5 5.78125C12.5 3.41844 10.4844 1.5 8 1.5Z"
      stroke="#FF441F"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M8 7.5C8.82843 7.5 9.5 6.82843 9.5 6C9.5 5.17157 8.82843 4.5 8 4.5C7.17157 4.5 6.5 5.17157 6.5 6C6.5 6.82843 7.17157 7.5 8 7.5Z"
      stroke="#FF441F"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);
