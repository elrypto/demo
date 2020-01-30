import axiosMock from 'axios';
import { fetchGame } from '../Actions';
import { Dispatch } from '../Interfaces';
import { gameConfig } from '../../components/hooks/__tests__/dataScaffold';
import axios from '../__mocks__/axios';


jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

/* example axios test */
test('fetching of game from REST api', async () => {
  mockedAxios.get.mockReturnValueOnce({ data: { result: 'game data here in real test' } });
  const dispatch: Dispatch = jest.fn();
  await fetchGame(gameConfig, dispatch);
});
