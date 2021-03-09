import React, { useEffect, useState } from 'react';
import { makeStyles, MuiThemeProvider } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import AddAlertIcon from "@material-ui/icons/AddAlert";
import MusicOffIcon from "@material-ui/icons/MusicOff";
import MusicNoteIcon from "@material-ui/icons/MusicNote";

const useStyles = makeStyles({
  oneLoopTurendOff: {
    display: "flex",
    flexDirection: "column",
    height: "20vh",
    width: "28%",
    minWidth:'250px',
    backgroundImage: "radial-gradient(#ff1744, #9b0000);",
    margin: "10px",
    marginLeft: "auto",
    marginRight: "auto",
    alignContent: "center",
    border: "1px solid red",
    borderRadius:'13px',
    boxShadow:'0px 0px 10px 5px rgba(0,0,0,0.59)'
  },
  oneLoopTurenOn: {
    display: "flex",
    flexDirection: "column",
    height: "20vh",
    width: "28%",
    minWidth:'250px',
    backgroundImage: "radial-gradient(lime, green);",
    backgroundColor: "#c1d5e0",
    margin: "10px",
    marginLeft: "auto",
    marginRight: "auto",
    alignContent: "center",
    border: "1px solid green",
    borderRadius:'13px',
    boxShadow:'0px 0px 10px 5px rgba(0,0,0,0.59)',
  },
  buttonsDiv: {
    display: "flex",
    justifyContent: "space-evenly",
    marginTop: "auto",
    marginBottom: "auto",
  },
});

function Loop({name,turnOn,turnOff,path,activeLoops}) {
  const [isTurnOn, setIsTurnOn] = useState(false);
  const classes = useStyles();

  //Change the state according to the user's choice
  const handleChange = () => {
    if (isTurnOn) {
      setIsTurnOn(false);
      turnOff(path);
    } else {
      setIsTurnOn(true);
      turnOn(path);
    }
  };

  useEffect(() => {
    if (activeLoops.length === 0) {
      setIsTurnOn(false);
    }
  }, [activeLoops.length]);

  return (
    <>
      {isTurnOn ? (
        <div className={classes.oneLoopTurenOn}>
          {<h3>{name}</h3>}
          <div className={classes.buttonsDiv}>
            <Button onClick={handleChange} disabled>
              Turn On <MusicNoteIcon />
            </Button>
            <Button onClick={handleChange}>
              Turn Off <MusicOffIcon />
            </Button>{" "}
          </div>
        </div>
      ) : (
        <div className={classes.oneLoopTurendOff}>
          {<h3>{name}</h3>}
          <div className={classes.buttonsDiv}>
            <Button onClick={handleChange}>
              Turn On <MusicNoteIcon />
            </Button>
            <Button onClick={handleChange} disabled>
              Turn Off <MusicOffIcon />
            </Button>{" "}
          </div>
        </div>
      )}
    </>
  );
}

export default Loop
