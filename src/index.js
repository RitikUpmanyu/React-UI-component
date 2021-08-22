import './App.css';
import React from "react";
import img1 from "./images/shoes-png-45073.png";
import img2 from "./images/owl.png";
import person1 from "./images/randomimage2.jpg";
import person2 from "./images/randomimage1.jpg";
import ReactDOM from 'react-dom';
import './index.css';
import classNames from 'classnames';
import {Animated} from "react-animated-css";

class App extends React.Component {
  state = {
    open: false,
    activeIndex: null,
    activeFull:null,
    categories: [],
    projects: null
  };
  componentDidMount() {
    this.setState({
      categories: categories,
    });
    
  }
  focusOff = e => {
    if (e.target.className !== 'category--image') {
      this.setState({
        activeIndex: null,
        activeFull:null,
        open: false
      });
    }
  };
  render() {
    let { categories, open, activeIndex, activeFull } = this.state;

    return (
      <div className="App">
        <div
          className={`categories--menu-container ${open ? 'focused' : ''}`}
          onClick={this.focusOff}
          style={{ height: '100vh' }}
        >
          <div className="categories menu">
            {categories.map((category, i) => (
              <ProjectCategory
                category={category}
                
                key={'cat-' + i}
                handleClick={() =>
                  this.setState({
                    activeFull: i,
                    open: true
                  })
                }
                handleMouseEnter={()=>{
                  this.setState({
                    activeIndex: i,
                    open: true
                  })
                }}
                handleMouseLeave={(isActiveFullTrue)=>{
                  if(!isActiveFullTrue){
                      this.setState({
                        activeIndex: null,
                        activeFull:null,
                        open: false
                      })}
                  }
                }
                active={i === activeIndex}
                activeFull={i === activeFull}
                isActiveFullTrue={activeFull != null}
                focusOff={this.focusOff}
                focused={open}
                isAnyoneActive={activeIndex!=null}
                shiftLeft={i < activeIndex}
                shiftLeftFull={i < activeFull}
                isFirst={i==0}
                isLast={i === categories.length - 1 || i === categories.length - 2}
                
              />
            ))}
          </div>
        </div>
      </div>
    );
  }
}

/** ProjectCategory Styles */
const container = ({ active }) => ({
  transform: (active) ? 'scale(1) translate3d(0%, 0%, 0)' : 'scale(1) translate3d(0%, 0, 0)'
});

const containerActive = ({ activeFull }) => ({
  transform: (activeFull) ? 'scale(1) translate3d(0%, 0%, 0)' : 'scale(1) translate3d(0%, 0, 0)'
});


const background = ({ color, active }) => ({
  background: `${color} no-repeat center center / cover`,
  width: !active ? '30vw' : '50vw'
});

const backgroundNon = ({ color, active }) => ({
  background: `${color} no-repeat center center / cover`,
  width: '40vw'
});

const backgroundFull = ({ color, activeFull }) => ({
  background: `${color} no-repeat center center / cover`,
  width: !activeFull ? '5vw' : '75vw'
});

const rect = ({isActiveFullTrue, activeFull}) => ({
  opacity: isActiveFullTrue && activeFull? '0':'1' 
});

const imageFunc = ({ image, active }) => ({
  background: `url(${image}) no-repeat center center/ contain`,
  width: !active ? '10vh' : '20vh',
  transform: 'translate(230%, 100%)'
});

const imageFuncNon = ({ image }) => ({
  background: `url(${image}) no-repeat center center/ contain`,
  width: '15vh',
  transform: 'translate(230%, 100%)'
});

const imageFuncActive = ({ image, activeFull }) => ({
  background: `url(${image}) no-repeat center center/ contain`,
  width: !activeFull ? 'calc(20vh - 20px)' : '250px',
  transform: !activeFull ? 'translate(230%, 100%)' : 'translate(200%, 100%)'
});

const personFuncActive = ({ person, activeFull }) => ({
  background: `url(${person}) no-repeat center center/ contain`,
  opacity: !activeFull ? 0 : 1,
});



const ProjectCategory = ({ handleClick,
   handleMouseEnter, handleMouseLeave, active, activeFull, shiftLeftFull, shiftLeft, isLast, category, isActiveFullTrue, isAnyoneActive, isFirst }) => {
  const { title, subtitle, subtext, image, person, color } = category;

  const classes = classNames({ category: true, isActive: active, isActiveFull:activeFull, isLast, shiftLeft, shiftLeftFull });
  let back;
  let icon;
  let per;
  let bars;
  if(isActiveFullTrue){
    back=<div className="category--image" style={backgroundFull({ color, activeFull })} />;
    icon=<div className="category--image-small smallImage" style={imageFuncActive({ image, activeFull })} />
    per= <div className="category--image-small personImage" style={personFuncActive({ person, activeFull })} />
  }  
  else if(!isAnyoneActive){
    back=<div className="category--image" style={backgroundNon({ color })} />;
    icon=<div className="category--image-small smallImage" style={imageFuncNon({ image})} />
  }
  else{
    back=<div className="category--image" style={background({ color, active })} />;
    icon=<div className="category--image-small smallImage" style={imageFunc({ image, active})} />
  }
  if(isFirst){
    bars=<div className="bars">
          <div class={isActiveFullTrue && !activeFull?'active':'rect'} id="rectangle1" style={rect({ isActiveFullTrue, activeFull})}>
            <span class="material-icons" id="left-arrow" >
              arrow_back_ios_new
            </span>
          </div>
          
        </div>
  }else{
    bars=<div  className="bars" >
          <div class={isActiveFullTrue && !activeFull?'active':'rect'} id="rectangle2" style={rect({ isActiveFullTrue, activeFull})}>
            <span class="material-icons" id="right-arrow">
              arrow_back_ios_new
            </span>
          </div>
        </div>
  }
  
  return (
    <div className={classes} >
      
      <div className="category--content">
        <Animated animationIn="fadeInDown" animationOut="fadeOut" isVisible={true}>
          <h1>{title}</h1>
        
          <div className={activeFull?"category--text focused--sub":"category--text"}>
            <h6>{subtitle}</h6>
          </div>
        </Animated>
      </div>
      <div className={activeFull?"btn-containerActive":'btn-container'} >
      <button className="btn fourth" >{activeFull?"Add To Bag":"Discover More"}</button>
      </div>
      <div
        className="category--image-container"
        onClick={() => handleClick()}
        onMouseEnter={() => handleMouseEnter()}
        onMouseLeave={() => handleMouseLeave(isActiveFullTrue)}
        style={isActiveFullTrue
          ?containerActive({ activeFull })
          :container({ active })
        }
      >
        {icon}
        {back}
        {per}
        {bars}
        
      </div>
      
      <div className="category--name">
        <h6>{subtext}</h6>
      </div>
      <div className="category--closeButton">
        <a href="#">Back</a>
      </div>
    </div>
  );
};





var categories = [
  {
    color: '#ff9b00',
    title: 'mmmm ahhh... Push it! ',
    subtext: 'two',
    subtitle: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
    image: img2,
    person: person1,
    id: '586537da62981d5fb8c21617'
  },
  {
    color: '#0192cc',
    title: 'Because Im happy again.',
    subtext: 'one',
    subtitle: 'Ullamcorper a lacus vestibulum sed arcu non odio. Leo in vitae turpis massa sed elementum. Ut sem nulla pharetra diam sit amet. Commodo nulla facilisi nullam vehicula ipsum. Id porta nibh venenatis cras. Dignissim suspendisse in est ante in nibh mauris cursus mattis. Purus in mollis nunc sed id semper risus in. Laoreet non curabitur gravida arcu ac tortor dignissim. Rhoncus mattis rhoncus urna neque viverra justo nec. Tincidunt arcu non sodales neque sodales ut. Fermentum leo vel orci porta non. Pulvinar neque laoreet suspendisse interdum.',
    image: img1,
    person: person2,
    id: '586537da60c040bc1e3060a1'
  }
];




  
  ReactDOM.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>,
    document.getElementById('root')
  );
  