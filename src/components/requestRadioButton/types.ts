import * as React from 'react';

export type RequestRadioButtonProps = {
  value?: any;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>, value: string) => void;
};

export type RequestStatus = 'success' | 'error';
