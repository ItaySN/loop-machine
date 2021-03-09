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
    backgroundColor: "#c1d5e0",
    margin: "5px",
    marginLeft: "auto",
    marginRight: "auto",
    alignContent: "center",
    border: "4px solid red",
  },
  oneLoopTurenOn: {
    display: "flex",
    flexDirection: "column",
    height: "20vh",
    width: "28%",
    backgroundColor: "#c1d5e0",
    margin: "5px",
    marginLeft: "auto",
    marginRight: "auto",
    alignContent: "center",
    border: "4px solid green",
  },
  buttonsDiv: {
    display: "flex",
    justifyContent: "space-evenly",
    marginTop: "auto",
    marginBottom: "auto",
  },
});

function Loop({name,turnOn,turnOff,path,activeLoops}) {
    const [isTurnOn,setIsTurnOn] = useState(false);
    const classes = useStyles();
    const audio = new Audio(path)

    const handleChange = () =>{
      if(isTurnOn)
      {
          setIsTurnOn(false);
          turnOff(path);
      }
      else{
          setIsTurnOn(true);
          turnOn(path);
      }  
    }

    useEffect(() => {
        if(activeLoops.length === 0){
            setIsTurnOn(false);
        }
    }, [activeLoops.length]);
    return (
      <>
        {
            isTurnOn ? (
            <div className={classes.oneLoopTurenOn}>
            {<h3>{name}</h3>}
              <div className={classes.buttonsDiv}>
                <Button onClick={handleChange} disabled>
                  Turn On <MusicNoteIcon/>
                </Button>
                <Button onClick={handleChange}>Turn Off <MusicOffIcon/></Button>{" "}
              </div> 
          </div>
            ) : (
                <div className={classes.oneLoopTurendOff}>
            {<h3>{name}</h3>}
              <div className={classes.buttonsDiv}>
                <Button onClick={handleChange}>Turn On <MusicNoteIcon/></Button>
                <Button onClick={handleChange} disabled>
                  Turn Off <MusicOffIcon/>
                </Button>{" "}
              </div>
            <div>{console.log(isTurnOn)}</div>
          </div>
            )
        }
      </>
    );
}

export default Loop
