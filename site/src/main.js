import React,{Component} from 'react';
import {render} from 'react-dom';

import{Router,Route,Link,withRouter,hashHistory,IndexRoute } from 'react-router';

import {JSON_,OBJ,MTL,GLTF,DAE} from './show_models'

import './main.less'

// Tick
// DAE;
// debugger

class App extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      showModel: false
    }
  }
  render(){
   //  debugger
    return(
      <section className="example">
        <header className="example__title">
          React 3DModel 
        </header>
        <div className="">
          <div className="example__nav-holder">
            <ul className="example__nav">
              <li><Link activeClassName="active-link" to="/JSON">JSON</Link></li>
              <li><Link activeClassName="active-link" to="/OBJ">OBJ</Link></li>
              <li><Link activeClassName="active-link" to="/MTL">MTL</Link></li>
              <li><Link activeClassName="active-link" to="/GLTF">GLTF</Link></li>
              <li><Link activeClassName="active-link" to="/DAE">DAE</Link></li>
            </ul>
          </div>
         
      
          <div className="example__container" style={{position:'relative'}}>
            {
              this.props.children && React.cloneElement(this.props.children, {
                onWillMount: this.onWillMount.bind(this)
                ,onLoaded: this.onLoaded.bind(this)
              })
            }

            {
              !this.state.showModel && <div style={{
                position:'absolute'
                ,left:'0',top:'0'
                ,width:'100%',height:'100%'
                ,background:'rgba(255,255,255,1)'
                ,fontSize: '20px'
                ,display:'-webkit-box'
                ,WebkitBoxPack:'center'
                ,WebkitBoxAlign:'center'
                ,margin:'0% 0 0 0'
              }}>
                <div className="load-wrapp">              
                  <div className="load-4">
                    <div className="ring-1"></div>
                  </div>
                </div>
              </div>
            }
            
          </div>
        </div>
      </section>
    )
  }
  onWillMount(){
    this.setState({showModel: false})
  }
  onLoaded(){
    //setTimeout(()=>{
    this.setState({showModel: true})
    //},566)
  }
}

render(
  <Router history={hashHistory}>
    <Route path="/" component={App}>
      <IndexRoute component={JSON_} />
      <Route path="/JSON" component={JSON_}/>
      <Route path="/OBJ" component={OBJ}/>
      <Route path="/MTL" component={MTL}/>
      <Route path="/GLTF" component={GLTF}/>
      <Route path="/DAE" component={DAE}/>
      
    </Route>  
  </Router>
  ,document.querySelector('#app')
)
