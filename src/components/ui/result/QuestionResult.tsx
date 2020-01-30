import React from 'react';
import { Row, Col } from 'react-bootstrap';
import Octicon, { Check, X } from '@primer/octicons-react';
import { Tooltip } from 'antd';
import DangerousInnerContent from '../DangerouseInnerContent';
import { Question } from '../../../common/Interfaces';

interface QuestionResultProps {
  question: Question;
  answer: boolean;
  index: number;
  correct: boolean | null;
}

const QuestionResult: React.FC<QuestionResultProps> = ({
  question,
  answer,
  index,
  correct,
}: QuestionResultProps) => {
  return (
    <Row>
      <Col xs={1}>{index + 1}</Col>
      <Col xs={2}>
        {answer === undefined ? (
          <Tooltip title="Question was not answered">--</Tooltip>
        ) : (
          <Octicon size="small" icon={correct ? Check : X} />
        )}
      </Col>
      <Col xs={9}>
        <DangerousInnerContent htmlContent={question.question} />
      </Col>
    </Row>
  );
};

export default QuestionResult;
