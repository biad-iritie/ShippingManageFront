import { gql } from '@apollo/react-hooks';

export const UPDATE_RATE = gql`
mutation update_rate($id:ID!,$country:ID!,$shipMethod: String!,$interKg:String!, $price:String!, $typeService:String, $goods:String!, 
    $time:String!, 
    $cities:String!
){
  update_rate(
    id:$id,
    country:$country,
    shipMethod:$shipMethod,
    interKg:$interKg,
    price:$price,
    typeService:$typeService,
    goods:$goods,
    time:$time,
    cities:$cities
  ){
    id
  }
}`;

export const ADD_RATE = gql`
mutation add_rate($country:ID!,$shipMethod: String!, $interKg:String!, $price:String!, $typeService:String, $goods:String!, 
    $time:String!, 
    $cities:String!
    ){
    add_rate(country:$country,shipMethod:$shipMethod,interKg:$interKg,price:$price,typeService:$typeService,goods:$goods,
    time:$time,
    cities:$cities
  ){
    id
  }
}`;

export const LIST_RATE = gql`
query list_rate($email_company: String){
  list_rate(email_company:$email_company){
    id
    shipMethod
    interKg
    price
    typeService
    goods
    time
    cities
    country{
      name
    }
  }
}`