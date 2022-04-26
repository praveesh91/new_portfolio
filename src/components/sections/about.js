import React, { useState, useEffect, useRef } from "react";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import "react-multi-carousel/lib/styles.css";
import styled from "styled-components";
import { srConfig } from "../../config";
import sr from "../../utils/sr";
import { services } from "../../editable";

import { usePrefersReducedMotion } from "../../hooks";

import Coverflow from "react-coverflow";

const StyledAboutSection = styled.section`
  max-width: 900px;
  .projects-grid > div > div > div {
    background-color: transparent;
  }
  figure,
  figure li {
    box-shadow: none;
    -webkit-box-reflect: unset;
  }
  figure div {
    background-color: transparent;
  }
  .inner {
    display: grid;
    grid-template-columns: 3fr 2fr;
    grid-gap: 50px;

    @media (max-width: 768px) {
      display: block;
    }
  }
`;

const StyledProject = styled.li`
  position: relative;
  cursor: default;
  transition: var(--transition);
  margin: 0.5rem;

  @media (prefers-reduced-motion: no-preference) {
    &:hover,
    &:focus-within {
      .services-inner {
        transform: translateY(-7px);
        cursor: pointer;
      }
    }
  }

  a {
    position: relative;
    z-index: 1;
  }

  .services-inner {
    ${({ theme }) => theme.mixins.boxShadow};
    ${({ theme }) => theme.mixins.flexBetween};
    flex-direction: column;
    align-items: flex-start;
    position: relative;
    height: 100%;
    width: 12rem;
    padding: 2rem 1.75rem;
    font-size: var(--fz-sm);
    border-radius: var(--border-radius);
    background-color: var(--light-navy);
    transition: var(--transition);
  }
  footer {
    font-size: var(--fz-xs);
  }
  .image-cont {
    padding-bottom: 1rem;
  }
  .image-cont img {
    width: 30%;
  }
  .inline-link {
    margin: auto;
    display: block;
  }
  .project-top {
    ${({ theme }) => theme.mixins.flexBetween};
    margin-bottom: 35px;

    .folder {
      color: var(--green);
      svg {
        width: 40px;
        height: 40px;
      }
    }

    .project-links {
      display: flex;
      align-items: center;
      margin-right: -10px;
      color: var(--light-slate);

      a {
        ${({ theme }) => theme.mixins.flexCenter};
        padding: 5px 7px;

        &.external {
          svg {
            width: 22px;
            height: 22px;
            margin-top: -4px;
          }
        }

        svg {
          width: 20px;
          height: 20px;
        }
      }
    }
  }

  .project-title {
    margin: 0 0 10px;
    color: var(--lightest-slate);
    font-size: var(--fz-xxl);

    a {
      position: static;

      &:before {
        content: "";
        display: block;
        position: absolute;
        z-index: 0;
        width: 100%;
        height: 100%;
        top: 0;
        left: 0;
      }
    }
  }

  .project-description {
    color: var(--light-slate);
    font-size: 17px;

    a {
      ${({ theme }) => theme.mixins.inlineLink};
    }
  }

  .project-tech-list {
    display: flex;
    align-items: flex-end;
    flex-grow: 1;
    flex-wrap: wrap;
    padding: 0;
    margin: 20px 0 0 0;
    list-style: none;

    li {
      font-family: var(--font-mono);
      font-size: var(--fz-xxs);
      line-height: 1.75;

      &:not(:last-of-type) {
        margin-right: 15px;
      }
    }
  }
`;

const Projects = () => {
  const revealTitle = useRef(null);
  const revealArchiveLink = useRef(null);
  const revealProjects = useRef([]);
  const prefersReducedMotion = usePrefersReducedMotion();
  const GRID_LIMIT = 3;

  useEffect(() => {
    if (prefersReducedMotion) {
      return;
    }

    sr.reveal(revealTitle.current, srConfig());
    sr.reveal(revealArchiveLink.current, srConfig());
    revealProjects.current.forEach((ref, i) =>
      sr.reveal(ref, srConfig(i * 100))
    );
  }, []);

  const projectInner = (node) => {
    return (
      <div className="services-inner">
        <div className="image-cont">
          <img src={node.image} alt="services_image" />
        </div>
        <a className="inline-link">{node.heading}</a>
        <footer>{node.description}</footer>
      </div>
    );
  };

  return (
    <StyledAboutSection>
      <h2 className="numbered-heading" ref={revealTitle}>
        Services I Offer
      </h2>
      <div className="projects-grid">
        {prefersReducedMotion ? (
          <>
            {services &&
              services.map((service, i) => (
                <StyledProject key={i}>{projectInner(service)}</StyledProject>
              ))}
          </>
        ) : (
          <TransitionGroup component={null}>
            <Coverflow
              width="960"
              height="500"
              otherFigureScale="1"
              displayQuantityOfSide={1}
              navigation={false}
              enableScroll={false}
              infiniteScroll={true}
              clickable={true}
              active={2}
              media={{
                "@media (max-width: 900px)": {
                  width: "600px",
                  height: "300px",
                },
                "@media (min-width: 900px)": {
                  width: "960px",
                  height: "600px",
                },
              }}>
              {services &&
                services.map((service, i) => (
                  <CSSTransition
                    key={i}
                    classNames="fadeup"
                    timeout={i >= GRID_LIMIT ? (i - GRID_LIMIT) * 300 : 300}
                    exit={false}>
                    <StyledProject
                      key={i}
                      ref={(el) => (revealProjects.current[i] = el)}
                      style={{
                        transitionDelay: `${
                          i >= GRID_LIMIT ? (i - GRID_LIMIT) * 100 : 0
                        }ms`,
                      }}>
                      {projectInner(service)}
                    </StyledProject>
                  </CSSTransition>
                ))}
            </Coverflow>
          </TransitionGroup>
        )}
      </div>
    </StyledAboutSection>
  );
};

export default Projects;
