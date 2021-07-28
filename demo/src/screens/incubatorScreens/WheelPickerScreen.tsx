import React, {useCallback, useState, useEffect} from 'react';
import {View, Text, Incubator, Colors, Typography, Button, Dialog} from 'react-native-ui-lib';
import _ from 'lodash';

const monthItems = _.map([
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December'
],
item => ({label: item, value: item}));

const yearItems = _.times(2030, i => i)
  .reverse()
  .map(item => ({label: `${item}`, value: item}));
const dayItems = _.times(31, i => i + 1).map(day => ({label: `${day}`, value: day}));

const useData = (initialMonth?: string, initialYear?: string, initialDays?: number) => {
  const [selectedMonth, setMonth] = useState<string | undefined>(initialMonth);
  const [, setYear] = useState<string | undefined>(initialYear);
  const [selectedDays, setDays] = useState<number | undefined>(initialDays);
  const [showDialog, setShowDialog] = useState(false);

  const onPickDaysPress = useCallback(() => {
    setShowDialog(true);
  }, []);

  const onDialogDismissed = useCallback(() => {
    setShowDialog(false);
  }, []);

  const onMonthChange = useCallback((item: string | number, _: number) => {
    setMonth(item as string);
  }, []);

  const onYearChange = useCallback((item: string | number, _: number) => {
    setYear(item as string);
  }, []);

  const onDaysChange = useCallback((item: string | number, _: number) => {
    setDays(item as number);
  }, []);

  return {
    onMonthChange,
    onYearChange,
    onDaysChange,
    selectedMonth,
    selectedDays,
    onPickDaysPress,
    onDialogDismissed,
    showDialog
  };
};

export default () => {
  const {
    selectedMonth,
    onMonthChange,
    onYearChange,
    selectedDays,
    onDaysChange,
    onPickDaysPress,
    onDialogDismissed,
    showDialog
  } = useData('February', undefined, 5);

  const [initialYear, setInitialYear] = useState(2021);
  const resetInitialYear = useCallback(() => setInitialYear(2020), []);

  return (
    <View flex padding-page>
      <Text h1>Wheel Picker</Text>

      <View marginT-s5 centerH>
        <Text h3>Months</Text>
        <Incubator.WheelPicker
          onChange={onMonthChange}
          activeTextColor={Colors.primary}
          inactiveTextColor={Colors.grey20}
          items={monthItems}
          textStyle={Typography.text60R}
          selectedValue={selectedMonth}
        />

        <View row bottom marginT-s5>
          <Text h3>Years</Text>
          <Button bodySmall marginL-s2 link label="Reset" size={Button.sizes.xSmall} onPress={resetInitialYear}/>
        </View>
        <Text bodySmall grey30>
          (Uncontrolled, initialValue passed)
        </Text>
        <View width={'100%'} marginT-s3>
          <Incubator.WheelPicker
            onChange={onYearChange}
            numberOfVisibleRows={3}
            initialValue={initialYear}
            items={yearItems}
          />
        </View>
      </View>

      <View marginB-s10>
        <Button marginT-40 label={'Pick Days'} marginH-100 onPress={onPickDaysPress}/>
        <Dialog width={'90%'} height={260} bottom visible={showDialog} onDismiss={onDialogDismissed}>
          <Incubator.WheelPicker onChange={onDaysChange} selectedValue={selectedDays} label={'Days'} items={dayItems}/>
        </Dialog>
      </View>
    </View>
  );
};
