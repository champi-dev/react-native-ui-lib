import React from 'react';
import PropTypes from 'prop-types';
import {requireNativeComponent} from 'react-native';
import TextInputKeyboardManager from '../TextInputKeyboardManager/TextInputKeyboardManager.android';
import KeyboardRegistry from '../KeyboardRegistry';
import CustomKeyboardViewBase from '../CustomKeyboardViewBase';

const CustomKeyboardViewNativeAndroid = requireNativeComponent('CustomKeyboardViewNativeTemp');

type CustomKeyboardViewProps = {
  initialProps?: any;
  component?: string;
  onItemSelected: () => void;
}

export default class CustomKeyboardView extends CustomKeyboardViewBase<CustomKeyboardViewProps> {
  static displayName = 'IGNORE';
  static propTypes = {
    initialProps: PropTypes.object,
    component: PropTypes.string,
    onItemSelected: PropTypes.func
  };

  async componentDidUpdate(prevProps) {
    const {component} = this.props;

    if (prevProps.component !== component && !component) {
      await TextInputKeyboardManager.reset();
    }

    super.componentDidUpdate(prevProps);
  }

  render() {
    const {component, initialProps} = this.props;
    const KeyboardComponent = component && KeyboardRegistry.getKeyboard(component);
    return (
      <CustomKeyboardViewNativeAndroid>
        {KeyboardComponent && <KeyboardComponent {...initialProps}/>}
      </CustomKeyboardViewNativeAndroid>
    );
  }
}
