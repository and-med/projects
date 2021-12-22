import { Alert, Snackbar } from '@mui/material';
import React, { useCallback, useContext, useState } from 'react';
import { nextId } from '../utils/keyGenerator';

interface SnackbarInfo {
  title: string;
  type: 'success' | 'error' | 'warning';
}

interface SnackbarState extends SnackbarInfo {
  id: string;
  open: boolean;
  autoHideDuration: number;
}

interface SnackbarContextModel {
  snackbars: SnackbarState[];
  enqueue: (snackbar: SnackbarInfo) => void;
  enqueueError: (message: string) => void;
  onClose: (snackbar: SnackbarState) => void;
}

const SnackbarContext = React.createContext<SnackbarContextModel>({
  snackbars: [],
  enqueue: () => {},
  enqueueError: () => {},
  onClose: () => {},
});

const SnackbarList = () => {
  const { snackbars, onClose } = useContext(SnackbarContext);

  const buildOnClose = useCallback(
    (snackbar) => () => {
      onClose(snackbar);
    },
    [onClose]
  );

  return (
    <>
      {snackbars.map((snackbar) => (
        <Snackbar
          key={snackbar.id}
          open={snackbar.open}
          onClose={buildOnClose(snackbar)}
          autoHideDuration={snackbar.autoHideDuration}
        >
          <Alert
            onClose={buildOnClose(snackbar)}
            severity={snackbar.type}
            sx={{ width: '100%' }}
          >
            {snackbar.title}
          </Alert>
        </Snackbar>
      ))}
    </>
  );
};

export const SnackbarProvider = (props: { children: React.ReactElement }) => {
  const [snackbars, setSnackbars] = useState<SnackbarState[]>([]);

  const enqueue = useCallback((s: SnackbarInfo) => {
    let snackbar: SnackbarState = {
      id: nextId(),
      title: s.title,
      type: s.type,
      open: true,
      autoHideDuration: 5000,
    };

    setSnackbars((old) => [...old, snackbar]);
  }, []);

  const enqueueError = useCallback(
    (message: string) => {
      enqueue({ title: message, type: 'error' });
    },
    [enqueue]
  );

  const onClose = useCallback((snackbar: SnackbarState) => {
    setSnackbars((old) => old.filter((s) => s.id !== snackbar.id));
  }, []);

  return (
    <SnackbarContext.Provider
      value={{ snackbars, onClose, enqueue, enqueueError }}
    >
      {props.children}
      <SnackbarList />
    </SnackbarContext.Provider>
  );
};

export const useSnackbar = () => {
  const { enqueue } = useContext(SnackbarContext);

  return enqueue;
};

export const useErrorSnackbar = () => {
  const { enqueueError } = useContext(SnackbarContext);

  return enqueueError;
};

export default SnackbarInfo;
