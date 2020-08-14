import { gql } from '@apollo/react-hooks';


export const VERIFY_TOKEN = gql`
query{
  verifyToken{
    names
    role
  }
}`;
export const LIST_COUNTRY = gql`
query{
    listCountry{
      id
      name
    }
}`;

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
    }}`;

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
export const LOGIN = gql`
mutation login($email: String!, $password: String!) {
    login(
        email: $email
        password: $password
    ) {
        token
        user {
            names
            email
            phone
            role 
        }
    }}`;
export const FEED = gql`
query GetLaunch {
  feed{
id
url
}
}
`

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