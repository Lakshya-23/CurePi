import React from "react";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  Typography,
} from "@mui/material";
import { Cancel } from "@mui/icons-material";
import api from "../../../../api";

export default function AppointmentCard(props) {
  const handleCancel = async () => {
    const aptid = props.appointment.aptid;
    try {
      const res = await api.cancelAppointment({ aptid });
      if (res.data.error) {
        alert(res.data.errorMsg);
      } else {
        if (!alert(res.data.msg)) {
          window.location.reload();
        }
      }
    } catch (error) {
      alert(error?.response?.data?.errorMsg || "An Error Occured!");
      console.error(error);
    }
  };

  return (
    <Card sx={{ maxWidth: "100%", textAlign: "center" }} variant="outlined">
      <CardContent>
        <br />
        <Typography
          sx={{ fontSize: "0.9rem" }}
          color="text.secondary"
          gutterBottom
        >
          Appointment with
        </Typography>
        <Typography variant="h5" component="div">
          {props.appointment.docname}
        </Typography>
        <Typography sx={{ mb: 2.5, fontSize: "0.8rem" }} color="text.secondary">
          {props.appointment.speciality}
        </Typography>
        <Typography
          sx={{ mb: 1.5, fontSize: "1rem" }}
          color="text.secondary"
        >{`${props.appointment.date} (${props.appointment.time})`}</Typography>
        <br />
        <CardActions sx={{ justifyContent: "space-between" }} disableSpacing>
          <Button
            variant="contained"
            color="error"
            size="small"
            endIcon={<Cancel />}
            onClick={handleCancel}
            disabled={props.appointment.cancel || props.appointment.payment}
          >
            Cancel
          </Button>
        </CardActions>
      </CardContent>
    </Card>
  );
}
