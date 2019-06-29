import React from 'react';
import './index.less'

export default function LinkButton(props) {
    return <button {...props} className="link-button">{props.children}</button>
}
