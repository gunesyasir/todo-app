import RNDateTimePicker, { DateTimePickerEvent } from '@react-native-community/datetimepicker';
import React from 'react';
import { StyleSheet } from 'react-native';

interface Props {
  onClose: (date?: Date) => void;
  date: Date;
}

const DatePicker: React.FC<Props> = ({ onClose, date }) => {
  const handleChange = (_: DateTimePickerEvent, selectedDate?: Date) => {
    onClose(selectedDate);
  };

  return (
    <RNDateTimePicker
      value={date}
      display="inline"
      onChange={handleChange}
      style={styles.container}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
  },
});

export default DatePicker;
