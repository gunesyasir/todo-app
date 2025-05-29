import {
  BottomSheetBackdrop,
  BottomSheetBackdropProps,
  BottomSheetModal,
  BottomSheetView,
} from '@gorhom/bottom-sheet';
import { Colors } from '@/utils/colors';
import React, { useCallback } from 'react';
import { StyleSheet } from 'react-native';

interface BottomSheetProps {
  children?: React.ReactNode;
}

export const BottomSheetComponent = React.forwardRef<BottomSheetModal, BottomSheetProps>(
  ({ children }, ref) => {
    const childrenHeight = 285;
    const snapPoints = [childrenHeight];

    // NOTE: Dynamic sizing is broken in this version. Manuel snap points computations used to prevent more time loss. ALso BottomSheetView used for this purpose.
    // Look at: https://github.com/gorhom/react-native-bottom-sheet/issues/2035

    const renderBackdrop = useCallback(
      (props: BottomSheetBackdropProps) => (
        <BottomSheetBackdrop
          {...props}
          appearsOnIndex={0}
          disappearsOnIndex={-1}
          pressBehavior="close"
          opacity={1}
          style={styles.backdrop}
        />
      ),
      []
    );

    return (
      <BottomSheetModal
        ref={ref}
        backdropComponent={renderBackdrop}
        backgroundStyle={styles.background}
        enableDynamicSizing={false}
        snapPoints={snapPoints}>
        <BottomSheetView>{children}</BottomSheetView>
      </BottomSheetModal>
    );
  }
);

const styles = StyleSheet.create({
  backdrop: {
    backgroundColor: Colors.backdrop,
    position: 'absolute',
    top: 0,
    bottom: 0,
    right: 0,
    left: 0,
  },
  background: {
    backgroundColor: Colors.background,
  },
});
