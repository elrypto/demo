import React, { useEffect, useState } from 'react';
import { Button } from 'antd';
import { Row, Col } from 'react-bootstrap';
import styled from 'styled-components';
import useAppContext from '../components/hooks/useAppContext';
import { SimplePage, Category, GameCardBox } from '../common/Style';
import { Question } from '../common/Interfaces';
import { ControlBox } from '../components/ui/gamecard/GameCardStyle';
import QuestionResult from '../components/ui/result/QuestionResult';
import { notifyWarn } from '../common/Actions';


const Result = () => {
  const { state, dispatch } = useAppContext();
  const questions: Array<Question> | undefined | null =
    state.apiData?.questions;
  const { answers } = state.game;
  const { gameConfig } = state;
  const [results, setResults] = useState<Array<boolean>>([]);
  const [totalCorrect, setTotalCorrect] = useState<number>(0);

  const ResultGameCardBox = styled(GameCardBox)`
    font-size: 95%;
  `;

  /* 
    redirect home on no state 
    user navigated here directly or refreshed the page
  */
  useEffect(() => {
    if (!state.apiData.questions) {
      console.warn('no api data, indicates invalid state , redirect home');
      notifyWarn('No game data, redirecting home')
      location.assign('/');
    }
  }, [state.apiData]);

  /* calculate totals
    TODO: if evolving to support more gameconfigs and number of questions
    will have to treat division and results appropriately (below)
  */
  useEffect(() => {
    if (questions && answers) {
      const resultArray: Array<boolean> = [];
      let correctCount = 0;

      questions.forEach((question, i) => {
        if (
          answers[i] &&
          answers[i].toString().toUpperCase() ===
          questions[i].correct_answer.toString().toUpperCase()
        ) {
          /* right */
          resultArray.push(true);
          correctCount += 1;
        } else {
          /* wrong */
          resultArray.push(false);
        }
      })
      setResults(resultArray);
      setTotalCorrect(correctCount);
    }
  }, [questions, answers]);

  console.log('state:', state);


  return (
    <>
      <SimplePage>
        <Category>
          Score {(totalCorrect / gameConfig.amount) * 100}% ({totalCorrect}/
          {gameConfig.amount})
        </Category>

        <ResultGameCardBox>
          {questions &&
            questions.map((question, index) => (
              <QuestionResult
                key={index}
                question={question}
                answer={answers[index]}
                index={index}
                correct={results[index]}
              />
            ))}
        </ResultGameCardBox>
        <ControlBox >
          <Row style={{ width: '100%', textAlign: 'center' }}>
            <Col>
              <Button
                type="primary"
                onClick={() => {
                  location.assign('/');
                }}
              >
                Play Again
            </Button>
            </Col>
          </Row>
        </ControlBox>
      </SimplePage>
    </>
  );
};

export default Result;
