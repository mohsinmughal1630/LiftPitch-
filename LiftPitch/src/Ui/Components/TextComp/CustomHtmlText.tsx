import React from 'react';
import {TextStyle} from 'react-native';
import HtmlText from 'react-native-html-to-text';

interface Props {
  content: string;
  style: TextStyle;
}

const CustomHtmlText = (props: Props) => {
  return <HtmlText style={props.style} html={props.content} />;
};

export default CustomHtmlText;
