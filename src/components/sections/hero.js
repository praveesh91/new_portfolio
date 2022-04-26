import React, { useState, useEffect } from "react";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import styled from "styled-components";
import { navDelay, loaderDelay } from "../../utils";
import { usePrefersReducedMotion } from "../../hooks";
import devImage from "../../developer.svg";

const skills = [
  "JavaScript (ES6+)",
  "TypeScript",
  "React",
  "MaterialUI",
  "Node.js",
  "Bootstrap",
];

const StyledText = styled.div`
  ul.skills-list {
    display: grid;
    grid-template-columns: repeat(2, minmax(140px, 200px));
    grid-gap: 0 10px;
    padding: 0;
    margin: 20px 0 0 0;
    overflow: hidden;
    list-style: none;
    text-align: left;
    li {
      position: relative;
      margin-bottom: 10px;
      padding-left: 20px;
      font-family: var(--font-mono);
      font-size: var(--fz-xs);

      &:before {
        content: "▹";
        position: absolute;
        left: 0;
        color: var(--green);
        font-size: var(--fz-sm);
        line-height: 12px;
      }
    }
  }
`;

const StyledHeroSection = styled.section`
  ${({ theme }) => theme.mixins.flexCenter};
  margin-top: 2rem;
  flex-direction: column;
  align-items: flex-start;
  min-height: 100vh;
  padding: 0;
  background-image: url(${devImage});
  background-size: 28rem;
  background-repeat: no-repeat;
  background-position: 35rem 4rem;
  -webkit-animation: fadein 6s; /* Safari and Chrome */
  -moz-animation: fadein 6s; /* Firefox */
  -ms-animation: fadein 6s; /* Internet Explorer */
  -o-animation: fadein 6s; /* Opera */
  animation: fadein 6s;

  @keyframes fadein {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }

  /* Firefox */
  @-moz-keyframes fadein {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }

  /* Safari and Chrome */
  @-webkit-keyframes fadein {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }

  @media (max-width: 480px) and (min-height: 700px) {
    padding-bottom: 10vh;
  }

  h1 {
    margin: 0 0 10px 4px;
    color: var(--green);
    font-family: var(--font-mono);
    font-size: clamp(var(--fz-sm), 5vw, var(--fz-md));
    font-weight: 400;

    @media (max-width: 480px) {
      margin: 0 0 20px 2px;
    }
  }

  h3,
  h2 {
    margin-top: 10px;
    color: var(--slate);
    line-height: 0.9;
  }

  p {
    margin: 20px 0 0;
    max-width: 540px;
    text-align: left;
  }
  ul.skills-list {
    display: grid;
    grid-template-columns: repeat(2, minmax(140px, 200px));
    grid-gap: 0 10px;
    padding: 0;
    margin: 20px 0 0 0;
    overflow: hidden;
    list-style: none;
    text-align: left;
    li {
      position: relative;
      margin-bottom: 10px;
      padding-left: 20px;
      font-family: var(--font-mono);
      font-size: var(--fz-xs);

      &:before {
        content: "▹";
        position: absolute;
        left: 0;
        color: var(--green);
        font-size: var(--fz-sm);
        line-height: 12px;
      }
    }
  }
  .email-link {
    ${({ theme }) => theme.mixins.bigButton};
    margin-top: 2rem;
  }
`;

const Hero = () => {
  const [isMounted, setIsMounted] = useState(false);
  const prefersReducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    if (prefersReducedMotion) {
      return;
    }

    const timeout = setTimeout(() => setIsMounted(true), navDelay);
    return () => clearTimeout(timeout);
  }, []);

  const one = <h1>Hi, my name is</h1>;
  const two = <h3 className="big-heading">Praveesh.</h3>;
  const three = <h3 className="big-heading">I code things on the web.</h3>;
  const four = (
    <>
      <p>I’m a software engineer specialized in building user interfaces. .</p>
    </>
  );
  const five = (
    <a
      className="email-link"
      href="https://drive.google.com/file/d/1HDAeocMbIZHcbN182mePtDh7HhzsTMGH/view?usp=sharing"
      target="_blank"
      rel="noreferrer">
      Resume
    </a>
  );
  const six = (
    <div>
      <p>Here are a few technologies I’ve been working with recently:</p>
    </div>
  );

  const seven = (
    <ul className="skills-list">
      {skills && skills.map((skill, i) => <li key={i}>{skill}</li>)}
    </ul>
  );

  const items = [one, two, three, four, six, seven, five];

  return (
    <>
      <StyledHeroSection>
        {prefersReducedMotion ? (
          <>
            {items.map((item, i) => (
              <div key={i}>{item}</div>
            ))}
          </>
        ) : (
          <TransitionGroup component={null}>
            {isMounted &&
              items.map((item, i) => (
                <CSSTransition
                  key={i}
                  classNames="fadeup"
                  timeout={loaderDelay}>
                  <div style={{ transitionDelay: `${i + 1}00ms` }}>{item}</div>
                </CSSTransition>
              ))}
          </TransitionGroup>
        )}
        {/* <StyledText>
          <div>
            <p>Here are a few technologies I’ve been working with recently:</p>
          </div>

          <ul className="skills-list">
            {skills && skills.map((skill, i) => <li key={i}>{skill}</li>)}
          </ul>
        </StyledText>
        {five} */}
      </StyledHeroSection>
    </>
  );
};

export default Hero;
