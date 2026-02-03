import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { StyleSheet, TouchableOpacity, TouchableOpacityProps } from 'react-native';

interface BackButtonProps extends TouchableOpacityProps {}

export function BackButton({ style, ...props }: BackButtonProps) {
  return (
    <TouchableOpacity style={[styles.backButton, style]} {...props}>
      <Ionicons name="chevron-back" size={20} color="black" />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#155EEF',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
    backgroundColor: '#FAFAFA',
  },
});
