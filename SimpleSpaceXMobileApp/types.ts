import { RocketInventory } from './assets/data/rocketData';

export type RootStackParamList = {
    Home: undefined;
    Details: {
        rocketDetails: RocketInventory,
        index: number
    };
    Welcome: undefined;
};