import logo from './logo.svg';
import './App.css';
import Loop from './Loop';
import allLoops from './loops.json';
import { useState } from 'react';
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import PlayArrowIcon from "@material-ui/icons/PlayArrow";
import StopIcon from "@material-ui/icons/Stop";

const useStyles = makeStyles({
  loopsDiv: {
    display: "flex",
    flexWrap: "wrap",
  },
  title: {
    fontSize: "1.7em",
    display: "inline-block",
  },
  mainButtonsDiv: {
    display: "flex",
    justifyContent: "space-evenly",
    marginTop: "auto",
    marginBottom: "auto",
    height:'3vh'
  },
  mainDiv: {
    height: "100vh",
    width: "100%",
    marginBottom: 0,
    alignItems: "center",
    textAlign: "center",
    background: '#90a4ae',
    display: "flex",
    flexDirection: "column",
  },
  activeLoopsDiv: {
    marginRight: "auto",
    marginLeft: "auto",
    width: "30%",
    height: "10vh",
    display: "flex",
    flexDirection: "column",
  },
});


function App() {
  const classes = useStyles();
  const [activeLoops, setActiveLoops] = useState([]);
  const [isPlaying, setIsPlaying] = useState(false);

  //Run the loop at the right moment if there is a loop playing
  const turnOn = (path) => {
    if (isPlaying) {
      const activeLoop = activeLoops[0];
      let delay = 8000 - activeLoops[0].currentTime * 1000;
      setTimeout(() => {
        if(activeLoops[0]?.src == activeLoop?.src){
          let newLoop = new Audio(path);
          newLoop.load();
          newLoop.play();
          newLoop.loop = true;
          let temp = activeLoops.slice();
          temp.push(newLoop);
          setActiveLoops(temp);
        }
        return;
      }, delay);
    } else {
      let newLoop = new Audio(path);
      let temp = activeLoops.slice();
      temp.push(newLoop);
      setActiveLoops(temp);
    }
  };

  //Stop the selected loop immediately
  const turnOff = (path) => {
    const { href: currentUrl } = window.location;
    let index = activeLoops.findIndex((audio) => {
      return "./" + audio.src.split(currentUrl)[1] === path
    });
    if (index !== -1) {
      activeLoops[index].pause();
      activeLoops[index].currentTime = 0;
      if (activeLoops.length === 1) {
        setIsPlaying(false);
      }
      setActiveLoops((prev)=>{
        prev.splice(index,1);
        return prev;
      })
    }
  };

  //Start to play the selected loops for the first time
  const playLoops = () => {
    if (!isPlaying) {
      setIsPlaying(true);
      activeLoops.forEach((loop) => {
        loop.play();
        loop.loop = true;
      });
    }
  };

  //Stop all the loops immediately
  const stopLoops = () => {
    setIsPlaying(false);
    activeLoops.forEach((loop) => {
      loop.pause();
      loop.currentTime = 0;
    });
    setActiveLoops([]);
  };

  return (
    <div className={classes.mainDiv}>
      <div className={classes.title}>Loop machine - Itay Sasson</div>
      <div className={classes.mainButtonsDiv}>
        {activeLoops.length > 0 ? (
          isPlaying ? (
            <Button disabled>
              Play <PlayArrowIcon />
            </Button>
          ) : (
            <Button onClick={playLoops}>
              Play <PlayArrowIcon />
            </Button>
          )
        ) : (
          <Button disabled>
            Play <PlayArrowIcon />
          </Button>
        )}
        {activeLoops.length > 0 ? (
          isPlaying ? (
            <Button onClick={stopLoops}>
              Stop <StopIcon />
            </Button>
          ) : (
            <Button onClick={stopLoops} disabled>
              Stop <StopIcon />
            </Button>
          )
        ) : (
          <Button onClick={stopLoops} disabled>
            Stop <StopIcon />
          </Button>
        )}
      </div>
      <div className={classes.activeLoopsDiv}>
        {activeLoops.length === 0 && <h3>Choose a loop</h3>}
      </div>
      <div className={classes.loopsDiv}>
        {allLoops.map((loop) => {
          return (
            <Loop
              turnOn={turnOn}
              turnOff={turnOff}
              name={loop.name}
              path={loop.path}
              activeLoops={activeLoops}
            />
          );
        })}
      </div>
    </div>
  );
}

export default App;
