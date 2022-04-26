import React, { useEffect, useRef } from "react";
import styled from "styled-components";
import { srConfig, email } from "../../config";
import sr from "../../utils/sr";
import { usePrefersReducedMotion } from "../../hooks";

const StyledContactSection = styled.section`
  // max-width: 600px;
  margin: 0 auto;
  text-align: center;

  @media (max-width: 768px) {
    margin: 0 auto 50px;
  }
  .title {
    font-size: clamp(40px, 5vw, 60px);
  }
  .text {
    padding: 1rem 0;
    width: 60%;
    margin: auto;
  }
  .container {
    margin-right: auto;
    margin-left: auto;
  }

  @media (min-width: 768px) {
    .container {
      width: 750px;
    }
  }

  @media (min-width: 992px) {
    .container {
      width: 970px;
    }
  }
  .container .col p {
    padding: 0.25rem 0.75rem;
  }

  /* 2 columns (600px) */

  @media only screen and (min-width: 600px) {
    .container .col {
      float: left;
      width: 50%;
    }
  }
  .textarea {
    height: 8rem;
  }

  .send-button {
    ${({ theme }) => theme.mixins.button};
    margin: 80px auto 0;
  }
  .send-button-container {
    margin: auto;
    text-align: left;
  }
`;

const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  height: 20%;
  width: 100%;
`;

const Input = styled.input`
  background: rgba(255, 255, 255, 0.15);
  border-radius: 2rem;
  width: 80%;
  height: 3rem;
  padding: 1rem;
  margin: 1rem;
  border: none;
  outline: none;
  color: #3c354e;
  font-size: 1rem;
  font-weight: bold;
  &:focus {
    display: inline-block;
    box-shadow: 0 0 0 0.2rem #b9abe0;
    backdrop-filter: blur(12rem);
    border-radius: 2rem;
  }
  &::placeholder {
    color: #b9abe099;
    font-weight: 100;
    font-size: 1rem;
  }
`;

const Contact = () => {
  const revealContainer = useRef(null);
  const prefersReducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    if (prefersReducedMotion) {
      return;
    }

    sr.reveal(revealContainer.current, srConfig());
  }, []);

  return (
    <StyledContactSection id="contact" ref={revealContainer}>
      <h2 className="title">Get In Touch</h2>
      <div className="container">
        <div className="col">
          <InputContainer>
            <Input type="text" className="input" placeholder="Name" />
            <Input type="text" className="input" placeholder="Email" />
            <Input
              type="number"
              className="input"
              placeholder="Contact Number"
            />
          </InputContainer>
        </div>
        <div className="col">
          <InputContainer>
            <Input type="text" className="textarea" placeholder="Message" />
          </InputContainer>
        </div>
      </div>
      <div className="send-button-container">
        <button className="send-button">Send</button>
      </div>
    </StyledContactSection>
  );
};

export default Contact;
