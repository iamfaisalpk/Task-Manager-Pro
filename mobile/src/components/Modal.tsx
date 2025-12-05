import React from 'react';
import RNModal from 'react-native-modal';
import { View, Text, TouchableOpacity } from 'react-native';

interface ModalProps {
  visible: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
  showClose?: boolean;
}

const Modal: React.FC<ModalProps> = ({ visible, onClose, title, children, showClose = true }) => (
  <RNModal isVisible={visible} onBackdropPress={onClose} useNativeDriver>
    <View className="bg-white rounded-xl p-6">
      {title && <Text className="text-lg font-bold mb-4">{title}</Text>}
      {children}
      {showClose && (
        <TouchableOpacity className="mt-4 self-end" onPress={onClose}>
          <Text className="text-blue-600 font-semibold">Close</Text>
        </TouchableOpacity>
      )}
    </View>
  </RNModal>
);

export default Modal;
