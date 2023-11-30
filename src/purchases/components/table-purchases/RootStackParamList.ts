import { StackNavigationProp } from '@react-navigation/stack';

export type RootStackParamList = {
 BoxPurchases: undefined;
 SeeDetail: { id: string };
};

export type BoxPurchasesNavigationProp = StackNavigationProp<RootStackParamList, 'BoxPurchases'>;
export type SeeDetailNavigationProp = StackNavigationProp<RootStackParamList, 'SeeDetail'>;
