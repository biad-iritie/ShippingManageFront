import { gql } from '@apollo/react-hooks';

export const LIST_STATUT = gql`
query statut_list{
  listStatut{
      id
      name
  }
}`;

export const COUNT_PACKAGE = gql`
query count_package($role:String!,$current_statut:String!){
  count_package(role:$role, current_statut:$current_statut)
}`;


export const ADD_ORDER = gql`
mutation add_order($company:ID!,$status:String!,$name_agence_sender: String,$numKuadi:String,
$content:String!,$current_statut:String!,$weight:String!,$r_name:String!,$r_phone:String!,
$r_city:String!,$r_country:String!, $shipMethod:String!,$typeService:String!){
 add_order(company:$company,
    status:$status,
    name_agence_sender:$name_agence_sender,
    numKuadi:$numKuadi,
    content:$content,
    current_statut:$current_statut,
    weight:$weight,
    r_name:$r_name,
    r_phone:$r_phone,
    r_city:$r_city,
    r_country:$r_country,
    shipMethod:$shipMethod,typeService:$typeService)
  {
    code
    id
    paid
    current_statut
    r_name
    r_city
    r_phone
    content
    shipMethod
    typeService
  }

}`;

export const UPDATE_ORDER = gql`
mutation update_order($id:ID!,$company:ID!,$name_agence_sender: String,$numKuadi:String,
$content:String!,$weight:String!,$r_name:String!,$r_phone:String!,
$r_city:String!,$r_country:String!, $shipMethod:String!,$typeService:String!,
$paid:Boolean,$who_add_paidId:ID,$who_add_paid:String){
  update_order(id:$id,company:$company,
    name_agence_sender:$name_agence_sender,
    numKuadi:$numKuadi,
    content:$content,
    weight:$weight,
    r_name:$r_name,
    r_phone:$r_phone,
    r_city:$r_city,
    r_country:$r_country,
    shipMethod:$shipMethod,
    typeService:$typeService,
    paid:$paid,
    who_add_paidId:$who_add_paidId,
    who_add_paid:$who_add_paid)
  {
    code
    id
    paid
    current_statut
    r_name
    r_city
    r_phone
    content
    shipMethod
    typeService
    who_add_paid
  }

}`;

export const ADD_POSITION = gql`
mutation add_position($id:ID!,$status:String!,$description:String,$who_confirmed_signed:String){
  add_position(id:$id,status:$status,
  description:$description,
  who_confirmed_signed:$who_confirmed_signed)
  {
    code
    id
    paid
    current_statut
    r_name
    r_city
    r_phone
    content
    name_agence_sender
    numKuadi,
    price,
    r_country,
    company {
      email
    }
    weight
    shipMethod
    typeService
  }

}`;

export const ADD_PRICE = gql`
mutation add_price($id:ID!,$price:String!){
  add_price(id:$id,price:$price)
  {
    code, id, price, current_statut,name_agence_sender,r_country,who_add_paid
    r_name, r_city, r_phone, content, numKuadi, weight, paid, who_add_paid
  }

}`;

export const ORDER_LIST = gql`
query order_list($role: String!,$skip:Int,$take:Int){
    order_list(role:$role
      skip: $skip,
    take: $take){
    code
    id
    paid
    current_statut
    r_name
    r_city
    r_phone
    content
    name_agence_sender
    numKuadi,
    price,
    r_country,
    company {
      email
    }
    weight
    shipMethod
    typeService
    who_add_paid
  }
}`;

export const ORDER_DETAIL = gql`
query order_detail($id: ID,$code:String){
    order_detail(id:$id,code:$code){
        code, id, price, current_statut,
        name_agence_sender,r_country,who_add_paid
    r_name, r_city, r_phone, content, numKuadi, 
    weight, paid, who_add_paid,shipMethod,typeService
    user{
      names, phone
    }
    company{
      name, phone1, phone2,id
    }
    detailStatuts{
      id,createdAt, description
      status{
        id
        name
        color
      }
    }
    who_confirmed_signed
    who_confirmed_signedId
  }
}`;

export const DELETE_ORDER = gql`
mutation delete_order($id:ID!){
  delete_order(id:$id){
    id
  }
}`;


export const SUB_NEW_PACK = gql`
subscription newPack($company:ID!,$userId:ID!) { 
    newPack(company:$company,userId:$userId){
      code
    id
    paid
    current_statut
    r_name
    r_city
    r_phone
    content
    shipMethod
    typeService
    }
}`