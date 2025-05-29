import React, { useEffect } from 'react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import ToastManager, { Toast } from 'toastify-react-native';

import { useBoundStore } from '@/store/useBoundStore';

const ToastError = () => {
  const { error } = useBoundStore();
  const insets = useSafeAreaInsets();

  useEffect(() => {
    if (error) {
      Toast.error(error.message);
    }
  }, [error]);

  return <ToastManager showCloseIcon={false} topOffset={insets.top ?? 40} />;
};

export default ToastError;
