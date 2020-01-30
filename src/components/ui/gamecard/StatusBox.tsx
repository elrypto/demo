import React from 'react';
import { Row, Col } from 'react-bootstrap';
import { StatusBox as StyledStatusBox } from './GameCardStyle';

interface ProgressBoxProps {
  questionIndex: number;
  numberOfQuestions: number;
  currentAnswer: boolean;
  difficulty: string;
}

export const StatusBox: React.FC<ProgressBoxProps> = ({
  questionIndex,
  numberOfQuestions,
  currentAnswer,
  difficulty,
}: ProgressBoxProps) => {
  return (
    <StyledStatusBox>
      <Row>
        <Col>
          {questionIndex + 1} /{numberOfQuestions}
        </Col>
        <Col>
          {currentAnswer === undefined
            ? ''
            : currentAnswer
              ? 'Your Answer: True'
              : 'Your Answer: False'}
        </Col>
        <Col>
          difficulty:
          {' ' + difficulty}
        </Col>
      </Row>
    </StyledStatusBox>
  );
};

export default StatusBox;
