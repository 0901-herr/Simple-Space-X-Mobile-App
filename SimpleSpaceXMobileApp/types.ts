import { NavigatorScreenParams } from '@react-navigation/native'
import { IRocket } from './assets/data/rocketData';
import { RocketInventory } from './assets/data/rocketData';

export type RootStackParamList = {
    Home: undefined;
    Details: {
        rocketDetails: RocketInventory,
    };
    Welcome: undefined;
};