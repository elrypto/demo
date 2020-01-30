import cases from 'jest-in-case';
import { addToLS, clearLocalStorage, getLSVal } from '../useSaveGameOnChange';
import { LS_KEY_CONFIG, LS_KEY_GAME, LS_KEY_API_DATA } from '../../../common/Constants';
import { gameConfig, apiData, game } from './dataScaffold';


/* testing hook outside of component */
// const UseSaveGame: any = ({ children, ...rest }: any) => children(useSaveGameOnChange());

/* Example case test */
cases(
  'clearStorage for objects',
  ({ lskey, toStore, verificationKey }) => {
    expect(getLSVal(lskey)).toStrictEqual({});
    addToLS(lskey, toStore);
    expect(getLSVal(lskey)).toContainKey(verificationKey);
    clearLocalStorage();
    expect(getLSVal(lskey)).toStrictEqual({});
  },
  {
    config: {
      lskey: LS_KEY_CONFIG,
      toStore: gameConfig,
      verificationKey: 'difficulty'
    },
    game: {
      lskey: LS_KEY_GAME,
      toStore: game,
      verificationKey: 'questionIndex'
    },
    apiData: {
      lskey: LS_KEY_API_DATA,
      toStore: apiData,
      verificationKey: 'questions'
    }
  }
)