import { StackNavigationProp } from '@react-navigation/stack';

export type RootStackParamListSales = {
 BoxSales: undefined;
 SeeDetailSale: { id: string };
};

export type BoxSalesNavigationProp = StackNavigationProp<RootStackParamListSales, 'BoxSales'>;
export type SeeDetailSalesNavigationProp = StackNavigationProp<RootStackParamListSales, 'SeeDetailSale'>;