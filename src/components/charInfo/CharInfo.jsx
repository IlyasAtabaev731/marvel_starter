import {Component} from 'react';
import './charInfo.scss';
import MarvelService from '../../services/MarvelService';
import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';
import Skeleton from '../skeleton/Skeleton';

class CharInfo extends Component{
    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            error: false,
            char: null
        }
    }

    marvel = new MarvelService();

    onCharLoaded = (char) => {
        this.setState({
            char: char,
            loading: false,
            error: false
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
            loading: true,
            error: false
        });
    }
    updateChar = () => {
        const {charId} = this.props;
        if(!charId) {
            return;
        }
        this.onCharLoading();
        this.marvel.getCharacter(charId)
        .then(this.onCharLoaded)
        .catch(this.onError);
    }

    componentDidMount() {
        this.updateChar();
    }
    componentDidUpdate(prevProps) {
        if(this.props.charId !== prevProps.charId) {
            this.updateChar();
        }
    }

    render() {
        const {char, loading, error} = this.state;
        const {charId} = this.props;
        let visible = null;
        if(!charId) {
            visible = (
                <Skeleton/>
            )
        }else {
            if(loading) {
                visible = (
                    <Spinner/>
                )
            }else{
                if(error) {
                    visible = (
                        <ErrorMessage/>
                    )
                }else{
                    if(char) {
                        visible = (
                            <View char={char}/>
                        )
                    }
                }
            }
        }
        return (
            <div className='char__info'>
                {visible}
            </div>
        )
    }
}

const View = ({char}) => {
    const {name, description, thumbnail, wiki, homepage, comicsItems} = char;
    
    let comics = comicsItems.map((item, i) => {
        if ( i > 10 ) {
            return null;
        }
        return (
            <li key={i} className="char__comics-item">
                {item.name}
            </li>
        )
    })
    if ( !comics[0] ) {
        comics = 'Comics not found'
    }
    const imageStyle = thumbnail.includes('image_not_available') ? {objectFit: 'contain'} : {objectFit: 'cover'};
    return (
        <>
            <div className="char__basics">
                <img style={imageStyle} src={thumbnail} alt={name}/>
                <div>
                    <div className="char__info-name">{name}</div>
                    <div className="char__btns">
                        <a href={homepage} className="button button__main">
                            <div className="inner">homepage</div>
                        </a>
                        <a href={wiki} className="button button__secondary">
                            <div className="inner">Wiki</div>
                        </a>
                    </div>
                </div>
            </div>
            <div className="char__descr">
                {description}
            </div>
            <div className="char__comics">Comics:</div>
            <ul className="char__comics-list">
                {comics}
            </ul>
        </>
    )
}

export default CharInfo;
