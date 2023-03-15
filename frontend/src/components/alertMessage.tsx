import { Alert, AlertColor, AlertTitle } from "@mui/material";

export const AlertMessage = ({
  type,
  title,
  body,
}: {
  type: AlertColor | undefined;
  title: string;
  body: string;
}) => {
  return (
    <Alert severity={type} sx={{ marginTop: 2 }}>
      <AlertTitle>{title}</AlertTitle>
      {body}
    </Alert>
  );
};

export default AlertMessage