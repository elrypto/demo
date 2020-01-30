import React from 'react';
import { Button, Tooltip } from 'antd';
import { Row, Col } from 'react-bootstrap';
import Octicon, {
  ChevronRight,
  ChevronLeft,
  Thumbsup,
  Thumbsdown,
} from '@primer/octicons-react';
import { navigate } from '@reach/router';
import styled from 'styled-components';
import { TinySpacer } from '../../../common/Style';
import { ControlBox as StyledControlBox } from './GameCardStyle';

interface ControlBoxProps {
  prevAction: Function;
  nextAction: Function;
  trueAction: Function;
  falseAction: Function;
  currentIndex: number;
  totalItems: number;
}

const BottomControlBox = styled(StyledControlBox)`
  border: 1px solid lightgrey;
  border-radius: 15px;
  background-color: rgb(241, 245, 246);
`;


export const ControlBox: React.FC<ControlBoxProps> = ({
  prevAction,
  nextAction,
  trueAction,
  falseAction,
  currentIndex,
  totalItems,
}) => (
    <>
      <StyledControlBox>
        <Row style={{ width: '100%' }}>
          <Col xs={4} />
          <Col xs={2} style={{ textAlign: 'center' }}>
            <Button
              size="large"
              type="primary"
              onClick={() => {
                falseAction();
              }}
            >
              <Octicon size="small" icon={Thumbsdown} />
              <TinySpacer />
              False
          </Button>
          </Col>

          <Col xs={2} style={{ textAlign: 'center' }}>
            <Button
              size="large"
              type="primary"
              onClick={() => {
                // console.log('user picked true');
                trueAction();
              }}
            >
              <Octicon size="small" icon={Thumbsup} />
              <TinySpacer />
              True
          </Button>
          </Col>
          <Col xs={4} />
        </Row>
      </StyledControlBox>

      <BottomControlBox className="seeMe">
        <Row style={{ width: '100%' }}>
          <Col xs={1}>
            <Tooltip title="Previous Question">
              {currentIndex > 0 ? (
                <Button
                  type="ghost"
                  onClick={() => {
                    prevAction();
                  }}
                >
                  <Octicon size="small" icon={ChevronLeft} />
                </Button>
              ) : (
                  <Button disabled>
                    <Octicon size="small" icon={ChevronLeft} />
                  </Button>
                )}
            </Tooltip>
          </Col>

          <Col xs={5} style={{ textAlign: 'center' }}>
            {currentIndex + 1 === totalItems ? (
              <Button
                type="danger"
                onClick={() => {
                  navigate('/result');
                }}
              >
                Submit Answers
            </Button>
            ) : (
                <Button
                  type="ghost"
                  onClick={() => {
                    navigate('/result');
                  }}
                >
                  Submit Answers
            </Button>
              )}
          </Col>
          <Col xs={5} style={{ textAlign: 'center' }}>
            <Button
              type="ghost"
              onClick={() => {
                location.assign('/');
              }}
            >
              Exit
          </Button>
          </Col>

          <Col xs={1}>
            <Tooltip title="Next Question">
              {currentIndex < totalItems - 1 ? (
                <Button
                  type="ghost"
                  onClick={() => {
                    nextAction();
                  }}
                >
                  <Octicon size="small" icon={ChevronRight} />
                </Button>
              ) : (
                  <Button disabled>
                    <Octicon size="small" icon={ChevronRight} />
                  </Button>
                )}
            </Tooltip>
          </Col>
        </Row>
      </BottomControlBox>
    </>
  );

export default ControlBox;
