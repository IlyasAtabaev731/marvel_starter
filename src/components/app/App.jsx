import { Component } from "react";

import AppHeader from "../appHeader/AppHeader";
import RandomChar from "../randomChar/RandomChar";
import CharList from "../charList/CharList";
import CharInfo from "../charInfo/CharInfo";

import decoration from '../../resources/img/vision.png';


class App extends Component{
    state = {
        charInfoId: null,
    }
    onChangeCharInfoId = (id) => {
        this.setState({
            charInfoId: id
        })
    }
    render() {    
        return (
            <div className="app">
                <AppHeader/>
                <main>
                    <RandomChar/>
                    <div className="char__content">
                        <CharList onChangeCharInfoId={this.onChangeCharInfoId}/>
                        <CharInfo charId = {this.state.charInfoId}/>
                    </div>
                    <img className="bg-decoration" src={decoration} alt="vision"/>
                </main>
            </div>
        )
    }    
}

export default App;