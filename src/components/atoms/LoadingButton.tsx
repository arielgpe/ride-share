import { Button, ButtonProps, CircularProgress } from '@mui/material';

export interface LoadingButtonProps extends ButtonProps {
  loading?: boolean
}


export const LoadingButton = ({loading = false, disabled = false, children, ...props}: LoadingButtonProps) => {
  return (
      <Button
        {...props}
        disabled={loading || disabled}
      >
        {loading ? (
          <CircularProgress
            size="1.5rem"/>
        ) : <>{children}</>}
      </Button>
  );
};
