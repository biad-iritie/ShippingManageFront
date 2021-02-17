import React, { useState } from 'react';
import { IntlProvider } from 'react-intl';
import { connect } from "react-redux";
import PropTypes from "prop-types";

import Eng from "../../../lang/en-US.json";
import Fr from "../../../lang/fr.json";

//const Context = React.createContext();


const Wrappers = (props) => {

    /* let lang;
    //console.log(local);
    props.language === "fr" ? lang = Fr : lang = Eng;
    //console.log(props);
    const [locale, setLocale] = useState(props.language);
    const [messages, setMessages] = useState(lang); */

    return (

        <IntlProvider
            locale={props.language}
            messages={props.language === "fr" ? Fr : Eng} >
            {props.children}
        </IntlProvider>

    )
}

const mapStateToProps = state => ({
    language: state.language,
});
export default connect(mapStateToProps)(Wrappers);
//export default Wrappers;