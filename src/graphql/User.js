import { gql } from '@apollo/react-hooks';


export const VERIFY_TOKEN = gql`
query{
  verifyToken{
    user {
            id
            names
            email
            phone
            role 
        }
    check {
            id
        }
      
  }
}`;

export const CHECK_COMPANY = gql`
query check_company($email: String!){
    check_company(email: $email)
}`;

export const LIST_COUNTRY = gql`
query{
    listCountry{
      name
    }
}`;

export const LIST_EMPLOYEES = gql`
query list_employees($role: String!){
 list_employees(role:$role)
  {
      
    user{
        id
    	names
    	phone
        email
    	role
    	last_login
        is_active
    }
    
  }
}`

export const UPDATE_COMPANY = gql`
mutation update_company($id:ID!,$name: String, $address: String, 
$phone1: String, $phone2: String, $email: String) {
    update_company(
        name: $name,
        id:$id,
        address: $address,
        phone1: $phone1,
        phone2: $phone2,
        email: $email){
        name
        address
        phone1
        phone2
        email
    }
    }`;

export const INFO_COMPANY = gql`
query info_company {
    info_company{
        name
        id
        address
        phone1
        phone2
        email
        is_active
    }}`;
// FOR SIGN UP
export const SIGN_UP = gql`
    mutation signup($names: String!, $email: String!, $password: String!, $phone: String!,$role:String,
        $id_company: Int,$name_company:String , $phone_company1: String,$phone_company2: String,$email_company: String,$address: String) {
        signup(
            names: $names
            email: $email
            password: $password
            phone: $phone,
            role: $role,
            id_company:$id_company,
            name_company:$name_company,
            phone_company1:$phone_company1,
            phone_company2:$phone_company2,
            email_company:$email_company,
            address:$address

        ) {
            token
            user {
                names
                role 
            }
        }}`;
// FOR LOGIN
export const LOGIN = gql`
mutation login($email: String!, $password: String!) {
    login(
        email: $email
        password: $password
    ) {
        token
        user {
            id
            names
            email
            phone
            role
            last_login 
        }
        check {
            id
        }
}}`;
// FOR UPDATE THE USER'S information
export const UPDATE = gql`
mutation update($names:String, $email:String, $phone:String){
    update(
        names:$names,
        email:$email,
        phone:$phone
    ){
        names
        phone
        email
    }
}`;

export const UPDATE_PASSWORD = gql`
mutation update_password($password:String!, $new_password:String!){
    update_password(
        password:$password,
        new_password:$new_password,
    )
}`;

export const ADD_EMPLOYEE = gql`
mutation add_employee($roleRequest: String!, $names:String!, $phone:String!,
$email:String!, $password:String!, $role:String!){
  add_employee(roleRequest:$roleRequest,
  names:$names,
  phone:$phone,
  email:$email,
  password:$password,
  role:$role){
    id
    names
    phone
    email
    role
    last_login
  }
}`

export const DELETE_USER = gql`
mutation delete_user($id:ID!,$role:String!){
    delete_user(role:$role, id:$id){
    id
  }
}`;

export const GET_PUBLIC_KEY = gql`
query get_public_key {
    getPublicKey
}
`
export const UPDATE_EMPLOYEE_ROLE = gql`
mutation update_employee_role($id:ID!,$role:String!){
    update_employee_role(id:$id,role:$role){
        id,
        names,
        phone,
        last_login,
        role
  }
}`;

/* export function SignUpCustomerService(email, password, names, phone) {
    const [SIGN_UP, { data, error }] = useMutation(SIGN_UP_CUSTOMER);

    SIGN_UP({
        variables: { email: email, password: password, names: names, phone: names },
    })
    console.log(data);
    console.log(error);
    if (!error) {
        // Login successful
        // Save token

        return { data, error };
    } else {
        alert("ERROR")
    }
} */