import styled from "styled-components";

export default function Button({ content }) {
  return <StyledButton>{content}</StyledButton>;
}

const StyledButton = styled.button`
  ${({ theme }) => theme.mixins.button};
  // background: linear-gradient(-47deg, #8731e8 0%, #4528dc 100%);
  // text-transform: uppercase;
  // letter-spacing: 0.2rem;
  // width: 40%;
  // height: 3rem;
  // border: none;
  // color: white;
  // border-radius: 2rem;
  // cursor: pointer;
`;
