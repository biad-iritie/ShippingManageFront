import { gql } from '@apollo/react-hooks';

export const DELETE_RATE = gql`
mutation delete_rate($id:ID!){
  delete_rate(id:$id){
    id
  }
}`;
export const UPDATE_RATE = gql`
mutation update_rate($id:ID!,$country:String!,$shipMethod: String!,$interKg:String!, $price:String!, $typeService:String, $goods:String!, 
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
mutation add_rate($country:String!,$shipMethod: String!, $interKg:String!, $price:String!, $typeService:String, $goods:String!, 
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
    country{
      name
    }
    cities
    shipMethod
    typeService
    goods
    interKg
    price
    time  
  }
}`