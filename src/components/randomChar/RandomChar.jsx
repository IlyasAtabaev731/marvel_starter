import { Component } from 'react';
import './randomChar.scss';

import mjolnir from '../../resources/img/mjolnir.png';
import MarvelService from '../../services/MarvelService';
import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';

class RandomChar extends Component{
    constructor(props) {
        super(props);
        this.state = { 
            randomChar: {},
            loading: true,
            error: false
        }      
    }

    marvel = new MarvelService();

    componentDidMount() {
        this.updateChar();
    }
    
    onCharLoaded = (randomChar) => {
        this.setState({
            randomChar,
            loading: false
        });
    }

    onError = () => {
        this.setState({
            error: true,
            loading: false
        })
    }
    onCharLoading = () => {
        this.setState({
            error: false,
            loading: true
        });
    }
    onTry = () => {
        this.onCharLoading();
        this.updateChar();
    }
    updateChar = () => {
        const id = Math.floor(Math.random() * (1011400 - 1011000) + 1011000);
        this.marvel.getCharacter(id).then(this.onCharLoaded)
        .catch(this.onError);
    }

    render() {
        const {loading, randomChar, error} = this.state
        return (
            <div className="randomchar">
                {loading ? <Spinner/> : error ? <ErrorMessage/>: <View randomChar={randomChar}/>}
                <div className="randomchar__static">
                    <p className="randomchar__title">
                        Random character for today!<br/>
                        Do you want to get to know him better?
                    </p>
                    <p className="randomchar__title">
                        Or choose another one
                    </p>
                    <button onClick={this.onTry} className="button button__main">
                        <div className="inner">try it</div>
                    </button>
                    <img src={mjolnir} alt="mjolnir" className="randomchar__decoration"/>
                </div>
            </div>
        )
    }
}
const View = ({randomChar}) => {
    const 
        {name, description, thumbnail, homepage, wiki} = randomChar,
        style= thumbnail.includes('image_not_available') ? {objectFit: 'contain'} : {objectFit: 'cover'};
    return (
        <div className="randomchar__block">
            <img src={thumbnail} style={style} alt="Random character" className="randomchar__img"/>
            <div className="randomchar__info">
                <p className="randomchar__name">{name}</p>
                <p className="randomchar__descr">
                    {description}
                </p>
                <div className="randomchar__btns">
                    <a href={homepage} className="button button__main">
                        <div className="inner">homepage</div>
                    </a>
                    <a href={wiki} className="button button__secondary">
                        <div className="inner">Wiki</div>
                    </a>
                </div>
            </div>
        </div>
    )
}
export default RandomChar;